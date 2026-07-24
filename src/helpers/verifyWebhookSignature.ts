import { createHmac, timingSafeEqual } from "node:crypto";

import { VideoGenError } from "../errors.js";

const DEFAULT_TOLERANCE_SECONDS = 5 * 60;

export type VerifyWebhookSignatureParams = {
  rawBody: string | Buffer;
  headers: Headers | Record<string, string | string[] | undefined>;
  secret: string;
  toleranceSeconds?: number;
};

const getHeader = (
  headers: Headers | Record<string, string | string[] | undefined>,
  name: string,
): string | null => {
  if (typeof (headers as Headers).get === "function") {
    return (headers as Headers).get(name);
  }
  const record = headers as Record<string, string | string[] | undefined>;
  const direct = record[name] ?? record[name.toLowerCase()];
  if (Array.isArray(direct)) {
    return direct[0] ?? null;
  }
  return direct ?? null;
};

const decodeSecret = (secret: string): Buffer => {
  const trimmed = secret.startsWith("whsec_") ? secret.slice("whsec_".length) : secret;
  // Standard Webhooks secrets are base64 after the optional `whsec_` prefix.
  return Buffer.from(trimmed, "base64");
};

/**
 * Verify a Standard Webhooks signature and return the parsed JSON event body.
 */
export const verifyWebhookSignature = ({
  rawBody,
  headers,
  secret,
  toleranceSeconds = DEFAULT_TOLERANCE_SECONDS,
}: VerifyWebhookSignatureParams): unknown => {
  const webhookId = getHeader(headers, "webhook-id");
  const webhookTimestamp = getHeader(headers, "webhook-timestamp");
  const webhookSignature = getHeader(headers, "webhook-signature");

  if (webhookId == null || webhookTimestamp == null || webhookSignature == null) {
    throw new VideoGenError({
      message: "Missing Standard Webhooks signature headers",
      status: 0,
      body: null,
      requestId: null,
    });
  }

  const timestamp = Number(webhookTimestamp);
  if (!Number.isFinite(timestamp)) {
    throw new VideoGenError({
      message: "Invalid webhook-timestamp header",
      status: 0,
      body: null,
      requestId: null,
    });
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSeconds - timestamp) > toleranceSeconds) {
    throw new VideoGenError({
      message: "Webhook timestamp is outside the allowed tolerance",
      status: 0,
      body: null,
      requestId: null,
    });
  }

  const bodyString = typeof rawBody === "string" ? rawBody : rawBody.toString("utf8");
  const signedContent = `${webhookId}.${webhookTimestamp}.${bodyString}`;
  const expected = createHmac("sha256", decodeSecret(secret))
    .update(signedContent)
    .digest();

  const candidates = webhookSignature.split(" ").flatMap((part) => {
    const [version, signature] = part.split(",");
    if (version !== "v1" || signature == null || signature.length === 0) {
      return [];
    }
    return [Buffer.from(signature, "base64")];
  });

  const matched = candidates.some(
    (candidate) =>
      candidate.length === expected.length && timingSafeEqual(candidate, expected),
  );

  if (!matched) {
    throw new VideoGenError({
      message: "Webhook signature verification failed",
      status: 0,
      body: null,
      requestId: null,
    });
  }

  try {
    return JSON.parse(bodyString) as unknown;
  } catch {
    throw new VideoGenError({
      message: "Webhook body is not valid JSON",
      status: 0,
      body: bodyString,
      requestId: null,
    });
  }
};
