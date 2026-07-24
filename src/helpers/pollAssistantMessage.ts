import type { VideoGen } from "../client.js";
import { VideoGenError } from "../errors.js";
import type { AssistantMessage, PollOptions } from "../types.js";
import { sleep } from "./sleep.js";

const TERMINAL = new Set(["succeeded", "failed", "cancelled"]);

export type PollAssistantMessageParams = {
  client: VideoGen;
  messageId: string;
} & PollOptions;

export const pollAssistantMessage = async ({
  client,
  messageId,
  pollIntervalMs = 1500,
  timeoutMs = 3_600_000,
  throwOnFailure = true,
  signal,
}: PollAssistantMessageParams): Promise<AssistantMessage> => {
  const startedAt = Date.now();

  for (;;) {
    if (signal?.aborted) {
      throw signal.reason instanceof Error
        ? signal.reason
        : new DOMException("The operation was aborted.", "AbortError");
    }

    const message = await client.assistant.getAssistantMessage(
      { messageId },
      { signal },
    );

    if (TERMINAL.has(message.status)) {
      if (
        throwOnFailure &&
        (message.status === "failed" || message.status === "cancelled")
      ) {
        const errorMessage =
          message.role === "assistant" &&
          message.error != null &&
          typeof message.error === "object" &&
          "message" in message.error &&
          typeof message.error.message === "string"
            ? message.error.message
            : `Assistant message ${message.status}`;
        throw new VideoGenError({
          message: errorMessage,
          status: 0,
          body: message,
          requestId: null,
        });
      }
      return message;
    }

    if (Date.now() - startedAt > timeoutMs) {
      throw new VideoGenError({
        message: "Timed out waiting for assistant message",
        status: 0,
        body: message,
        requestId: null,
      });
    }

    await sleep({ ms: pollIntervalMs, signal });
  }
};
