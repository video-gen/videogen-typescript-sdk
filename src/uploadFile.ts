import type { VideoGenApi, VideoGenClient } from "./index.js";

export type UploadFileOptions = {
  type?: "IMAGE" | "VIDEO" | "AUDIO";
  displayName: string;
  temporary?: boolean;
  /** Poll interval in ms while waiting for the upload to be processed. Defaults to 2000. */
  pollIntervalMs?: number;
  /** Maximum time in ms to wait for processing before throwing. Defaults to 3_600_000 (1 hour). */
  timeoutMs?: number;
  signal?: AbortSignal;
};

/**
 * Uploads a file to VideoGen.
 *
 * 1. Creates a pending file via `createFileUpload`
 * 2. PUTs the raw bytes to the returned presigned URL
 * 3. Polls until the file is processed, then returns the hydrated file
 */
export async function uploadFile(
  client: Pick<VideoGenClient, "files">,
  file: ReadableStream | Buffer | Blob,
  options: UploadFileOptions,
): Promise<VideoGenApi.StorageFile> {
  const { fileId, uploadUrl } = await client.files.createFileUpload({
    type: options.type,
    displayName: options.displayName,
    isTemporary: options.temporary,
  });

  const body = file instanceof Buffer ? new Blob([file]) : file;

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    body,
    signal: options.signal,
  });

  if (!uploadResponse.ok) {
    throw new Error(
      `Upload failed with status ${uploadResponse.status}: ${uploadResponse.statusText}`,
    );
  }

  const pollIntervalMs = options.pollIntervalMs ?? 2000;
  const timeoutMs = options.timeoutMs ?? 3_600_000;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    options.signal?.throwIfAborted();

    const current = await client.files.hydrateFile({ fileId });

    const hasReadySource =
      current.downloadSource?.status === "ready" || current.previewSource?.status === "ready";

    if (hasReadySource) {
      return current;
    }

    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
  }

  throw new Error(`File ${fileId} was not processed within ${timeoutMs}ms.`);
}
