import { WorkflowRunStatus } from "./api/types/WorkflowRunStatus.js";
import type { VideoGenApi, VideoGenClient } from "./index.js";

export type PollWorkflowRunOptions = {
  pollIntervalMs?: number;
  /** Maximum time in ms to wait for the workflow run to reach a terminal state. Defaults to 3_600_000 (1 hour). */
  timeoutMs?: number;
  signal?: AbortSignal;
};

function getIsTerminalStatus(status: VideoGenApi.WorkflowRunStatus): boolean {
  return (
    status === WorkflowRunStatus.Succeeded ||
    status === WorkflowRunStatus.Failed ||
    status === WorkflowRunStatus.Cancelled
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

/** Polls `getWorkflowRun` until status is `succeeded`, `failed`, or `cancelled`. */
export async function pollWorkflowRun(
  client: Pick<VideoGenClient, "workflows">,
  workflowRunId: string,
  options?: PollWorkflowRunOptions,
): Promise<VideoGenApi.WorkflowRun> {
  const pollIntervalMs = options?.pollIntervalMs ?? 1500;
  const timeoutMs = options?.timeoutMs ?? 3_600_000;
  const signal = options?.signal;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    signal?.throwIfAborted();

    const workflowRun = await client.workflows.getWorkflowRun({ workflowRunId });

    if (getIsTerminalStatus(workflowRun.status)) {
      return workflowRun;
    }

    await sleep(pollIntervalMs, signal);
  }

  throw new Error(
    `Workflow run ${workflowRunId} did not reach a terminal state within ${timeoutMs}ms.`,
  );
}
