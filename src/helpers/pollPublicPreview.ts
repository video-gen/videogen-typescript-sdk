import type { VideoGen } from "../client.js";
import { VideoGenError } from "../errors.js";
import type { PollOptions, StorageFile } from "../types.js";
import { sleep } from "./sleep.js";

export type PollPublicPreviewOptions = PollOptions & {
  waitForEmbedPlaybackId?: boolean;
};

export type PollPublicPreviewParams = {
  client: VideoGen;
  fileId: string;
} & PollPublicPreviewOptions;

const getIsStaticPreviewReady = (file: StorageFile): boolean => {
  const source = file.staticPublicPreviewSource;
  return source != null && source.status === "ready" && source.url != null;
};

export const pollPublicPreview = async ({
  client,
  fileId,
  pollIntervalMs = 1500,
  timeoutMs = 3_600_000,
  waitForEmbedPlaybackId = true,
  signal,
}: PollPublicPreviewParams): Promise<StorageFile> => {
  const startedAt = Date.now();

  for (;;) {
    if (signal?.aborted) {
      throw signal.reason instanceof Error
        ? signal.reason
        : new DOMException("The operation was aborted.", "AbortError");
    }

    const file = await client.files.getFile({ fileId }, { signal });

    if (!file.isPublicPreviewEnabled) {
      throw new VideoGenError({
        message: "Public preview is not enabled for this file",
        status: 0,
        body: file,
        requestId: null,
      });
    }

    const staticReady = getIsStaticPreviewReady(file);
    const needsPlaybackId =
      waitForEmbedPlaybackId && (file.type === "VIDEO" || file.type === "AUDIO");
    const playbackReady = !needsPlaybackId || file.publicPlaybackId != null;

    if (staticReady && playbackReady) {
      return file;
    }

    if (Date.now() - startedAt > timeoutMs) {
      throw new VideoGenError({
        message: "Timed out waiting for public preview",
        status: 0,
        body: file,
        requestId: null,
      });
    }

    await sleep({ ms: pollIntervalMs, signal });
  }
};
