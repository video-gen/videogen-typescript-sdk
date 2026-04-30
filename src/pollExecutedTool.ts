import { ExecutedToolStatus } from "./api/types/ExecutedToolStatus.js";
import type { VideoGenApi, VideoGenClient } from "./index.js";

export type PollExecutedToolOptions = {
  pollIntervalMs?: number;
  /** Maximum time in ms to wait for the tool to reach a terminal state. Defaults to 3_600_000 (1 hour). */
  timeoutMs?: number;
  signal?: AbortSignal;
};

function getIsTerminalStatus(status: VideoGenApi.ExecutedToolStatus): boolean {
  return (
    status === ExecutedToolStatus.Succeeded ||
    status === ExecutedToolStatus.Failed ||
    status === ExecutedToolStatus.Cancelled
  );
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal == null) {
      setTimeout(() => {
        resolve();
      }, ms);
      return;
    }

    let id: ReturnType<typeof setTimeout> | undefined = undefined;
    const onAbort = (): void => {
      if (id != null) {
        clearTimeout(id);
      }
      try {
        signal.throwIfAborted();
      } catch (err) {
        reject(err);
      }
    };

    id = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

/** Polls `getToolExecutionInfo` until status is `succeeded`, `failed`, or `cancelled`. */
export async function pollExecutedTool(
  client: Pick<VideoGenClient, "tools">,
  toolExecutionId: string,
  options?: PollExecutedToolOptions,
): Promise<VideoGenApi.ExecutedTool> {
  const pollIntervalMs = options?.pollIntervalMs ?? 1500;
  const timeoutMs = options?.timeoutMs ?? 3_600_000;
  const signal = options?.signal;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    signal?.throwIfAborted();

    const executed = await client.tools.getToolExecutionInfo({ toolExecutionId });

    if (getIsTerminalStatus(executed.status)) {
      return executed;
    }

    await sleep(pollIntervalMs, signal);
  }

  throw new Error(
    `Tool execution ${toolExecutionId} did not reach a terminal state within ${timeoutMs}ms.`,
  );
}
