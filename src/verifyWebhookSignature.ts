import { Webhook } from "standardwebhooks";
import type { VideoGenApi } from "./index.js";

export type WebhookEvent =
  | VideoGenApi.ToolExecutionWebhookPayload
  | VideoGenApi.FileUploadWebhookPayload;

export type WebhookHeaders = {
  "webhook-id": string;
  "webhook-timestamp": string;
  "webhook-signature": string;
};

/**
 * Verifies a Standard Webhooks signature and returns the parsed, typed payload.
 *
 * The returned event is a discriminated union — narrow on the `event` field:
 * ```ts
 * const event = verifyWebhookSignature(rawBody, headers, secret);
 * if (event.event === "tool_execution.succeeded") {
 *   console.log(event.results); // ToolExecutionWebhookPayload
 * }
 * ```
 *
 * @param rawBody  — the **raw** request body string (not parsed JSON).
 * @param headers  — an object (or Headers) containing `webhook-id`, `webhook-timestamp`, and `webhook-signature`.
 * @param signingSecret — the `signingSecret` returned when you created the webhook endpoint.
 * @throws if the signature is invalid, the timestamp is too old, or any header is missing.
 */
export function verifyWebhookSignature(
  rawBody: string,
  headers: WebhookHeaders | Record<string, string>,
  signingSecret: string,
): WebhookEvent {
  const wh = new Webhook(signingSecret);
  return wh.verify(rawBody, headers) as WebhookEvent;
}
