import type { VideoGen } from "../client.js";
import { VideoGenError } from "../errors.js";
import type { ListRemixActionsResponse, PollOptions, RemixActionRun } from "../types.js";
import { sleep } from "./sleep.js";

const TERMINAL = new Set(["succeeded", "failed", "cancelled"]);

export type PollRemixActionsOptions = PollOptions & {
  remixActionIds?: string[];
};

export type PollRemixActionsParams = {
  client: VideoGen;
  projectId: string;
} & PollRemixActionsOptions;

export const pollRemixActions = async ({
  client,
  projectId,
  remixActionIds,
  pollIntervalMs = 1500,
  timeoutMs = 3_600_000,
  throwOnFailure = true,
  onProgress,
  signal,
}: PollRemixActionsParams): Promise<ListRemixActionsResponse> => {
  const startedAt = Date.now();

  for (;;) {
    if (signal?.aborted) {
      throw signal.reason instanceof Error
        ? signal.reason
        : new DOMException("The operation was aborted.", "AbortError");
    }

    const response = await client.projects.listProjectRemixActions(
      { projectId, limit: 200 },
      { signal },
    );

    const actions: RemixActionRun[] =
      remixActionIds != null && remixActionIds.length > 0
        ? response.remixActions.filter((action) =>
            remixActionIds.includes(action.remixActionId),
          )
        : response.remixActions;

    if (actions.length > 0) {
      const progresses = actions.map((action) => action.progressPercentage);
      const average =
        progresses.reduce((sum, value) => sum + value, 0) / progresses.length;
      onProgress?.(average);
    }

    const allTerminal =
      actions.length > 0 && actions.every((action) => TERMINAL.has(action.status));

    if (allTerminal) {
      if (
        throwOnFailure &&
        actions.some(
          (action) => action.status === "failed" || action.status === "cancelled",
        )
      ) {
        throw new VideoGenError({
          message: "One or more remix actions failed or were cancelled",
          status: 0,
          body: response,
          requestId: null,
        });
      }
      return response;
    }

    if (Date.now() - startedAt > timeoutMs) {
      throw new VideoGenError({
        message: "Timed out waiting for remix actions",
        status: 0,
        body: response,
        requestId: null,
      });
    }

    await sleep({ ms: pollIntervalMs, signal });
  }
};
