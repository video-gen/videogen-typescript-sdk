import assert from "node:assert/strict";
import { test } from "node:test";
import { VideoGen, VideoGenError } from "../dist/index.js";

const ORDER_ID = "dd85fc0f-a12f-474c-9c90-8ff451fb38cb";
const PAYMENT_TOKEN = "spt_test_transport_only";

const jsonResponse = ({ body, status = 200 }) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const createClient = ({ t, responses }) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls.push({ url: url.toString(), init: init ?? {} });
    const response = responses.shift();
    assert.ok(response != null, "Unexpected extra fetch call.");
    return response;
  });
  const client = new VideoGen({ apiKey: "test-token", baseUrl: "https://test.videogen.io" });
  return { client, calls };
};

const requestBody = ({ init }) => {
  assert.equal(typeof init.body, "string");
  return JSON.parse(init.body);
};

test("reads billing account without a body or payment credential", async (t) => {
  const account = { teamId: "team_1", creditsRemaining: 2_000 };
  const { client, calls } = createClient({ t, responses: [jsonResponse({ body: account })] });

  assert.deepEqual(await client.billing.getBillingAccount(), account);

  const [{ url, init }] = calls;
  assert.equal(url, "https://test.videogen.io/v1/billing/account");
  assert.equal(init.method, "GET");
  assert.equal(init.body, undefined);
  assert.equal(new Headers(init.headers).has("Stripe-Shared-Payment-Token"), false);
});

test("quotes the supplied order id and credit quantity without paying", async (t) => {
  const { client, calls } = createClient({
    t,
    responses: [jsonResponse({ body: { orderId: ORDER_ID, state: "requires_approval" } })],
  });

  const result = await client.billing.createBillingOrder({ orderId: ORDER_ID, credits: 2_000 });

  assert.equal(calls.length, 1);
  const [{ url, init }] = calls;
  assert.equal(url, "https://test.videogen.io/v1/billing/orders");
  assert.equal(init.method, "POST");
  assert.deepEqual(requestBody({ init }), { orderId: ORDER_ID, credits: 2_000 });
  assert.equal(result.state, "requires_approval");
  assert.equal(new Headers(init.headers).has("Stripe-Shared-Payment-Token"), false);
});

test("reads the original order with an encoded path and cancellation signal", async (t) => {
  const { client, calls } = createClient({
    t,
    responses: [jsonResponse({ body: { state: "processing" } })],
  });
  const controller = new AbortController();

  await client.billing.getBillingOrder(
    { orderId: "order/with?reserved" },
    { signal: controller.signal },
  );

  const [{ url, init }] = calls;
  assert.equal(url, "https://test.videogen.io/v1/billing/orders/order%2Fwith%3Freserved");
  assert.equal(init.method, "GET");
  assert.equal(init.body, undefined);
  assert.equal(init.signal, controller.signal);
});

test("completes only once with the token exclusively in its dedicated header", async (t) => {
  const { client, calls } = createClient({
    t,
    responses: [jsonResponse({ body: { orderId: ORDER_ID, state: "paid_pending_fulfillment" } })],
  });
  const controller = new AbortController();
  // An object from JavaScript can carry extra fields. The wrapper still only
  // serializes the approved request schema, not transport credentials.
  const request = {
    orderId: ORDER_ID,
    revision: 3,
    idempotencyKey: "same-order-completion-key",
    paymentToken: PAYMENT_TOKEN,
    Authorization: "Bearer unexpected",
  };

  const result = await client.billing.completeBillingOrder(request, {
    paymentToken: PAYMENT_TOKEN,
    signal: controller.signal,
  });

  assert.equal(calls.length, 1);
  const [{ url, init }] = calls;
  const headers = new Headers(init.headers);
  assert.equal(url, `https://test.videogen.io/v1/billing/orders/${ORDER_ID}/complete`);
  assert.equal(url.includes(PAYMENT_TOKEN), false);
  assert.equal(init.method, "POST");
  assert.deepEqual(requestBody({ init }), {
    revision: 3,
    idempotencyKey: "same-order-completion-key",
  });
  assert.equal(init.body.includes(PAYMENT_TOKEN), false);
  assert.equal(headers.get("Stripe-Shared-Payment-Token"), PAYMENT_TOKEN);
  assert.equal(headers.get("Authorization"), "Bearer test-token");
  assert.equal(headers.get("X-VideoGen-Client"), "sdk-typescript");
  assert.equal(init.signal, controller.signal);
  assert.equal(result.state, "paid_pending_fulfillment");
});

test("preserves the completion identity and credential on an explicit identical retry", async (t) => {
  // Fresh Response objects per request, as actual fetch returns.
  const { client, calls } = createClient({
    t,
    responses: [
      jsonResponse({ body: { state: "fulfilled" } }),
      jsonResponse({ body: { state: "fulfilled" } }),
    ],
  });
  const request = { orderId: ORDER_ID, revision: 3, idempotencyKey: "same-order-completion-key" };

  await client.billing.completeBillingOrder(request, { paymentToken: PAYMENT_TOKEN });
  await client.billing.completeBillingOrder(request, { paymentToken: PAYMENT_TOKEN });

  assert.equal(calls.length, 2);
  const [first, second] = calls;
  assert.equal(second.url, first.url);
  assert.equal(second.init.body, first.init.body);
  assert.equal(new Headers(second.init.headers).get("Stripe-Shared-Payment-Token"), PAYMENT_TOKEN);
});

test("returns an uncertain completion error without retrying or creating another order", async (t) => {
  const { client, calls } = createClient({
    t,
    responses: [
      jsonResponse({ body: { message: "Read the original order before retrying." }, status: 503 }),
    ],
  });

  await assert.rejects(
    client.billing.completeBillingOrder(
      { orderId: ORDER_ID, revision: 3, idempotencyKey: "same-order-completion-key" },
      { paymentToken: PAYMENT_TOKEN },
    ),
    (error) => error instanceof VideoGenError,
  );

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `https://test.videogen.io/v1/billing/orders/${ORDER_ID}/complete`);
});

test("cancels with an empty body and no payment credential", async (t) => {
  const { client, calls } = createClient({
    t,
    responses: [jsonResponse({ body: { orderId: ORDER_ID, state: "canceled" } })],
  });

  assert.equal((await client.billing.cancelBillingOrder({ orderId: ORDER_ID })).state, "canceled");

  const [{ url, init }] = calls;
  assert.equal(url, `https://test.videogen.io/v1/billing/orders/${ORDER_ID}/cancel`);
  assert.equal(init.method, "POST");
  assert.deepEqual(requestBody({ init }), {});
  assert.equal(new Headers(init.headers).has("Stripe-Shared-Payment-Token"), false);
});

test("requests a refund without treating requested status as a completed refund", async (t) => {
  const { client, calls } = createClient({
    t,
    responses: [
      jsonResponse({ body: { orderId: ORDER_ID, state: "fulfilled", refundStatus: "requested" } }),
    ],
  });

  const result = await client.billing.requestBillingRefund({
    orderId: ORDER_ID,
    reason: "Purchased the wrong quantity.",
  });

  assert.equal(calls.length, 1);
  const [{ url, init }] = calls;
  assert.equal(url, `https://test.videogen.io/v1/billing/orders/${ORDER_ID}/refund`);
  assert.equal(init.method, "POST");
  assert.deepEqual(requestBody({ init }), { reason: "Purchased the wrong quantity." });
  assert.equal(result.refundStatus, "requested");
  assert.equal(new Headers(init.headers).has("Stripe-Shared-Payment-Token"), false);
});
