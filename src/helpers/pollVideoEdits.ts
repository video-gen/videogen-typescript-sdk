import type { VideoGen } from "../client.js";
import { VideoGenError } from "../errors.js";
import type {
  ListVideoEditsResponse,
  PollOptions,
  VideoEditRun,
} from "../types.js";
import { sleep } from "./sleep.js";

const TERMINAL = new Set(["succeeded", "failed", "cancelled"]);

export type PollVideoEditsOptions = PollOptions & {
  editableVideoId?: string;
  videoEditIds?: string[];
};

export type PollVideoEditsParams = {
  client: VideoGen;
  projectId: string;
} & PollVideoEditsOptions;

export const pollVideoEdits = async ({
  client,
  projectId,
  editableVideoId,
  videoEditIds,
  pollIntervalMs = 1500,
  timeoutMs = 3_600_000,
  throwOnFailure = true,
  onProgress,
  signal,
}: PollVideoEditsParams): Promise<ListVideoEditsResponse> => {
  const startedAt = Date.now();
  const requestedIds = videoEditIds == null ? null : new Set(videoEditIds);

  for (;;) {
    if (signal?.aborted) {
      throw signal.reason instanceof Error
        ? signal.reason
        : new DOMException("The operation was aborted.", "AbortError");
    }

    const editsById = new Map<string, VideoEditRun>();
    const visitedCursors = new Set<string>();
    let cursor: string | undefined;
    let hasMore = false;
    let nextCursor: string | null = null;

    for (;;) {
      const response = await client.projects.listVideoEdits(
        {
          projectId,
          limit: 200,
          ...(editableVideoId == null ? {} : { editableVideoId }),
          ...(cursor == null ? {} : { cursor }),
        },
        { signal },
      );
      for (const edit of response.videoEdits) {
        if (requestedIds == null || requestedIds.has(edit.videoEditId)) {
          editsById.set(edit.videoEditId, edit);
        }
      }
      hasMore = response.hasMore;
      nextCursor = response.nextCursor ?? null;
      if (
        !hasMore ||
        nextCursor == null ||
        visitedCursors.has(nextCursor) ||
        (requestedIds != null && editsById.size === requestedIds.size)
      ) {
        break;
      }
      visitedCursors.add(nextCursor);
      cursor = nextCursor;
      if (Date.now() - startedAt > timeoutMs) break;
    }

    const edits = [...editsById.values()];
    const response: ListVideoEditsResponse = {
      videoEdits: edits,
      hasMore,
      nextCursor,
    };
    if (edits.length > 0) {
      const totalProgress = edits.reduce(
        (sum, edit) => sum + edit.progressPercentage,
        0,
      );
      onProgress?.(totalProgress / (requestedIds?.size ?? edits.length));
    }

    const allPresent =
      requestedIds == null ? !hasMore : edits.length === requestedIds.size;
    const allTerminal =
      allPresent &&
      (edits.length > 0 || requestedIds?.size === 0) &&
      edits.every((edit) => TERMINAL.has(edit.status));
    if (allTerminal) {
      if (
        throwOnFailure &&
        edits.some(
          (edit) => edit.status === "failed" || edit.status === "cancelled",
        )
      ) {
        throw new VideoGenError({
          message: "One or more video edits failed or were cancelled",
          status: 0,
          body: response,
          requestId: null,
        });
      }
      return response;
    }

    if (Date.now() - startedAt > timeoutMs) {
      throw new VideoGenError({
        message: "Timed out waiting for video edits",
        status: 0,
        body: response,
        requestId: null,
      });
    }
    await sleep({ ms: pollIntervalMs, signal });
  }
};
