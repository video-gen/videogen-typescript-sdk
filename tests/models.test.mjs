import assert from "node:assert/strict";
import { test } from "node:test";
import { VideoGen, VideoGenError } from "../dist/index.js";

test("Model 1 client sends idempotency exclusively in the header and preserves retry guidance", async (t) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls.push({ url, init });
    return new Response(JSON.stringify({ message: "Retry in 120 seconds.", code: "model_1_hourly_quota_exceeded" }), { status: 429, headers: { "Retry-After": "120" } });
  });
  const client = new VideoGen({ apiKey: "test-key", baseUrl: "https://api.example.test" });
  await assert.rejects(client.models.startModel1Generation({ prompt: "A product" }, { idempotencyKey: "identical-retry-key" }), (error) => {
    assert.ok(error instanceof VideoGenError); assert.equal(error.status, 429); assert.equal(error.retryAfter, "120");
    assert.deepEqual(error.body, { message: "Retry in 120 seconds.", code: "model_1_hourly_quota_exceeded" });
    return true;
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.example.test/v1/models/model-1/generations");
  assert.equal(new Headers(calls[0].init.headers).get("Idempotency-Key"), "identical-retry-key");
  assert.deepEqual(JSON.parse(calls[0].init.body), { prompt: "A product" });
});
test("polling and quota reads encode paths and do not send submission headers", async (t) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls.push({ url, init });
    return new Response(JSON.stringify({ result: null, error: null }), { status: 200 });
  });
  const client = new VideoGen({ apiKey: "test-key", baseUrl: "https://api.example.test" });
  await client.models.getModel1Generation({ generationId: "id/with?reserved" });
  await client.models.getModel1Quota();
  assert.equal(calls[0].url, "https://api.example.test/v1/models/model-1/generations/id%2Fwith%3Freserved");
  assert.equal(calls[1].url, "https://api.example.test/v1/models/model-1/quota");
  for (const { init } of calls) { assert.equal(init.method, "GET"); assert.equal(new Headers(init.headers).has("Idempotency-Key"), false); }
});
