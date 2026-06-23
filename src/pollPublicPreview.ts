import type { VideoGenApi, VideoGenClient } from "./index.js";

export const PUBLIC_PREVIEW_NOT_ENABLED_ERROR_MESSAGE =
  "Public preview is not enabled for this file. Call enablePublicPreview before polling.";

export class PublicPreviewPollingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PublicPreviewPollingError";
  }
}

export type PollPublicPreviewOptions = {
  pollIntervalMs?: number;
  /** Maximum time in ms to wait. Defaults to 120_000 (2 minutes). */
  timeoutMs?: number;
  signal?: AbortSignal;
  /**
   * When true (default), also waits for `publicPlaybackId` on video and audio files.
   * Ignored for other file types.
   */
  waitForEmbedPlaybackId?: boolean;
};

export type PublicPreviewPollResult = {
  /** Permanent public URL (`staticPublicPreviewSource.url`). */
  publicPreviewUrl: string;
  /** Encoded playback id for embeds; null for non-video/audio files or when not waited for. */
  publicPlaybackId: string | null;
  /** Public HLS URL when embed playback is ready; otherwise null. */
  publicHlsUrl: string | null;
};

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

function assertPublicPreviewEnabled(file: VideoGenApi.StorageFile): void {
  if (!file.isPublicPreviewEnabled) {
    throw new PublicPreviewPollingError(PUBLIC_PREVIEW_NOT_ENABLED_ERROR_MESSAGE);
  }
}

function getIsStaticPublicPreviewReady(file: VideoGenApi.StorageFile): boolean {
  const source = file.staticPublicPreviewSource;
  return source?.status === "ready" && source.url != null && source.url.length > 0;
}

function getShouldWaitForEmbedPlaybackId({
  file,
  waitForEmbedPlaybackId,
}: {
  file: VideoGenApi.StorageFile;
  waitForEmbedPlaybackId: boolean;
}): boolean {
  if (!waitForEmbedPlaybackId) {
    return false;
  }

  return file.type === "VIDEO" || file.type === "AUDIO";
}

function getIsEmbedPlaybackReady(file: VideoGenApi.StorageFile): boolean {
  return file.publicPlaybackId != null && file.publicPlaybackId.length > 0;
}

function buildPollResult({
  file,
  waitForEmbedPlaybackId,
}: {
  file: VideoGenApi.StorageFile;
  waitForEmbedPlaybackId: boolean;
}): PublicPreviewPollResult | null {
  if (!getIsStaticPublicPreviewReady(file)) {
    return null;
  }

  const publicPreviewUrl = file.staticPublicPreviewSource?.url;
  if (publicPreviewUrl == null || publicPreviewUrl.length === 0) {
    return null;
  }

  const shouldWaitForEmbed = getShouldWaitForEmbedPlaybackId({ file, waitForEmbedPlaybackId });
  if (shouldWaitForEmbed && !getIsEmbedPlaybackReady(file)) {
    return null;
  }

  return {
    publicPreviewUrl,
    publicPlaybackId: file.publicPlaybackId ?? null,
    publicHlsUrl: file.publicHlsUrl ?? null,
  };
}

/**
 * Polls `getFile` until the permanent public preview URL is ready.
 * Throws if public preview has not been enabled.
 */
export async function pollPublicPreviewUrl(
  client: Pick<VideoGenClient, "files">,
  fileId: string,
  options?: PollPublicPreviewOptions,
): Promise<string> {
  const result = await pollPublicPreview(client, fileId, {
    ...options,
    waitForEmbedPlaybackId: false,
  });
  return result.publicPreviewUrl;
}

/**
 * Polls `getFile` until the embed playback id is ready (video and audio only).
 * Throws if public preview has not been enabled.
 */
export async function pollPublicEmbedPlaybackId(
  client: Pick<VideoGenClient, "files">,
  fileId: string,
  options?: PollPublicPreviewOptions,
): Promise<{ publicPlaybackId: string; publicHlsUrl: string | null }> {
  const pollIntervalMs = options?.pollIntervalMs ?? 1500;
  const timeoutMs = options?.timeoutMs ?? 120_000;
  const signal = options?.signal;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    signal?.throwIfAborted();

    const file = await client.files.getFile({ fileId });
    assertPublicPreviewEnabled(file);

    if (file.type !== "VIDEO" && file.type !== "AUDIO") {
      throw new PublicPreviewPollingError(
        "Embed playback ids are only available for video and audio files.",
      );
    }

    if (getIsEmbedPlaybackReady(file) && file.publicPlaybackId != null) {
      return {
        publicPlaybackId: file.publicPlaybackId,
        publicHlsUrl: file.publicHlsUrl ?? null,
      };
    }

    await sleep(pollIntervalMs, signal);
  }

  throw new PublicPreviewPollingError(
    `Public embed playback id for file ${fileId} was not ready within ${timeoutMs}ms.`,
  );
}

/**
 * Polls `getFile` until public preview URLs are ready.
 * Requires `enablePublicPreview` to have been called first.
 */
export async function pollPublicPreview(
  client: Pick<VideoGenClient, "files">,
  fileId: string,
  options?: PollPublicPreviewOptions,
): Promise<PublicPreviewPollResult> {
  const pollIntervalMs = options?.pollIntervalMs ?? 1500;
  const timeoutMs = options?.timeoutMs ?? 120_000;
  const signal = options?.signal;
  const waitForEmbedPlaybackId = options?.waitForEmbedPlaybackId ?? true;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    signal?.throwIfAborted();

    const file = await client.files.getFile({ fileId });
    assertPublicPreviewEnabled(file);

    const result = buildPollResult({ file, waitForEmbedPlaybackId });
    if (result != null) {
      return result;
    }

    await sleep(pollIntervalMs, signal);
  }

  throw new PublicPreviewPollingError(
    `Public preview for file ${fileId} was not ready within ${timeoutMs}ms.`,
  );
}
