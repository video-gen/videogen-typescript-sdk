import type { VideoGen } from "../client.js";
import { VideoGenError } from "../errors.js";
import type { PollOptions, WorkflowRun } from "../types.js";
import { sleep } from "./sleep.js";

const TERMINAL = new Set(["succeeded", "failed", "cancelled"]);

export type PollWorkflowRunParams = {
  client: VideoGen;
  workflowRunId: string;
} & PollOptions;

export const pollWorkflowRun = async ({
  client,
  workflowRunId,
  pollIntervalMs = 1500,
  timeoutMs = 3_600_000,
  throwOnFailure = true,
  onProgress,
  signal,
}: PollWorkflowRunParams): Promise<WorkflowRun> => {
  const startedAt = Date.now();

  for (;;) {
    if (signal?.aborted) {
      throw signal.reason instanceof Error
        ? signal.reason
        : new DOMException("The operation was aborted.", "AbortError");
    }

    const run = await client.workflows.getWorkflowRun(
      { workflowRunId },
      { signal },
    );

    onProgress?.(run.progressPercentage);

    if (TERMINAL.has(run.status)) {
      if (throwOnFailure && (run.status === "failed" || run.status === "cancelled")) {
        throw new VideoGenError({
          message: `Workflow run ${run.status}`,
          status: 0,
          body: run,
          requestId: null,
        });
      }
      return run;
    }

    if (Date.now() - startedAt > timeoutMs) {
      throw new VideoGenError({
        message: "Timed out waiting for workflow run",
        status: 0,
        body: run,
        requestId: null,
      });
    }

    await sleep({ ms: pollIntervalMs, signal });
  }
};
