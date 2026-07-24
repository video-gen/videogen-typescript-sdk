import type { VideoGen } from "../client.js";
import { VideoGenError } from "../errors.js";
import type { ExecutedTool, PollOptions } from "../types.js";
import { sleep } from "./sleep.js";

const TERMINAL = new Set(["succeeded", "failed", "cancelled"]);

export type PollExecutedToolParams = {
  client: VideoGen;
  toolExecutionId: string;
} & PollOptions;

export const pollExecutedTool = async ({
  client,
  toolExecutionId,
  pollIntervalMs = 1500,
  timeoutMs = 3_600_000,
  throwOnFailure = true,
  onProgress,
  signal,
}: PollExecutedToolParams): Promise<ExecutedTool> => {
  const startedAt = Date.now();

  for (;;) {
    if (signal?.aborted) {
      throw signal.reason instanceof Error
        ? signal.reason
        : new DOMException("The operation was aborted.", "AbortError");
    }

    const execution = await client.tools.getToolExecutionInfo(
      { toolExecutionId },
      { signal },
    );

    onProgress?.(execution.progressPercentage);

    if (TERMINAL.has(execution.status)) {
      if (
        throwOnFailure &&
        (execution.status === "failed" || execution.status === "cancelled")
      ) {
        const message =
          execution.error != null &&
          typeof execution.error === "object" &&
          "message" in execution.error &&
          typeof execution.error.message === "string"
            ? execution.error.message
            : `Tool execution ${execution.status}`;
        throw new VideoGenError({
          message,
          status: 0,
          body: execution,
          requestId: null,
        });
      }
      return execution;
    }

    if (Date.now() - startedAt > timeoutMs) {
      throw new VideoGenError({
        message: "Timed out waiting for tool execution",
        status: 0,
        body: execution,
        requestId: null,
      });
    }

    await sleep({ ms: pollIntervalMs, signal });
  }
};
