import type { VideoGen } from "../client.js";
import { VideoGenError } from "../errors.js";
import type { PollOptions, TimelineInterchange } from "../types.js";
import { sleep } from "./sleep.js";

const TERMINAL = new Set(["succeeded", "failed", "cancelled"]);

export type PollTimelineInterchangeParams = {
  client: VideoGen;
  interchangeJobId: string;
} & PollOptions;

export const pollTimelineInterchange = async ({
  client,
  interchangeJobId,
  pollIntervalMs = 1500,
  timeoutMs = 3_600_000,
  throwOnFailure = true,
  onProgress,
  signal,
}: PollTimelineInterchangeParams): Promise<TimelineInterchange> => {
  const startedAt = Date.now();

  for (;;) {
    if (signal?.aborted) {
      throw signal.reason instanceof Error
        ? signal.reason
        : new DOMException("The operation was aborted.", "AbortError");
    }

    const interchange = await client.projects.getTimelineInterchange(
      { interchangeJobId },
      { signal },
    );

    onProgress?.(interchange.progressPercentage);

    if (TERMINAL.has(interchange.status)) {
      if (
        throwOnFailure &&
        (interchange.status === "failed" || interchange.status === "cancelled")
      ) {
        const message =
          interchange.error != null &&
          typeof interchange.error === "object" &&
          "message" in interchange.error &&
          typeof interchange.error.message === "string"
            ? interchange.error.message
            : `Timeline interchange ${interchange.status}`;
        throw new VideoGenError({
          message,
          status: 0,
          body: interchange,
          requestId: null,
        });
      }
      return interchange;
    }

    if (Date.now() - startedAt > timeoutMs) {
      throw new VideoGenError({
        message: "Timed out waiting for timeline interchange",
        status: 0,
        body: interchange,
        requestId: null,
      });
    }

    await sleep({ ms: pollIntervalMs, signal });
  }
};
