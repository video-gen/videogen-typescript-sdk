import type { VideoGen } from "../client.js";
import { VideoGenError } from "../errors.js";
import type { FileInfo, PollOptions } from "../types.js";
import { sleep } from "./sleep.js";

export type UploadFileParams = {
  client: VideoGen;
  data: BodyInit;
  type?: "IMAGE" | "VIDEO" | "AUDIO" | "PDF" | "SLIDESHOW";
  displayName?: string;
  temporary?: boolean;
  /** When true, hide the file from the VideoGen Media page. Defaults to false. */
  hideFromUi?: boolean;
  contentType?: string;
  pollIntervalMs?: number;
  timeoutMs?: number;
  signal?: AbortSignal;
};

const SOURCE_KEYS = [
  "downloadSource",
  "previewSource",
  "thumbnailSource",
  "hlsSource",
] as const;

const getIsFileReady = (file: FileInfo): boolean =>
  SOURCE_KEYS.some((key) => {
    const source = file[key];
    return source != null && source.status === "ready";
  });

/**
 * `GET /v1/files/{id}` does not attach signed source URLs. Readiness (and
 * terminal probe failure) is only visible after `POST .../hydrate`, so the
 * post-PUT poll must use hydrate — otherwise the helper waits until timeout
 * even when the file is already usable.
 *
 * A secondary source (hls / thumbnail) can be `failed` after a probe error
 * while `downloadSource` is already `ready` from R2. Any ready source means
 * the upload is usable; only fail when something failed and nothing is ready.
 */
const getHasFailedSource = (file: FileInfo): boolean =>
  SOURCE_KEYS.some((key) => {
    const source = file[key];
    return source != null && source.status === "failed";
  });

export const uploadFile = async (params: UploadFileParams): Promise<FileInfo> => {
  const { client } = params;
  const displayName = params.displayName ?? "upload";
  const pollIntervalMs = params.pollIntervalMs ?? 2000;
  const timeoutMs = params.timeoutMs ?? 3_600_000;
  const startedAt = Date.now();

  const created = await client.files.createFileUpload(
    {
      displayName,
      isTemporary: params.temporary ?? false,
      hideFromUi: params.hideFromUi ?? false,
      ...(params.type != null ? { type: params.type } : {}),
    },
    { signal: params.signal },
  );

  const putHeaders: Record<string, string> = {};
  if (params.contentType != null) {
    putHeaders["Content-Type"] = params.contentType;
  }

  const putResponse = await fetch(created.uploadUrl, {
    method: "PUT",
    headers: putHeaders,
    body: params.data,
    signal: params.signal,
  });

  if (!putResponse.ok) {
    throw new VideoGenError({
      message: `Failed to upload file bytes (${putResponse.status})`,
      status: putResponse.status,
      body: null,
      requestId: putResponse.headers.get("x-request-id"),
    });
  }

  for (;;) {
    if (params.signal?.aborted) {
      throw params.signal.reason instanceof Error
        ? params.signal.reason
        : new DOMException("The operation was aborted.", "AbortError");
    }

    const file = await client.files.hydrateFile(
      { fileId: created.fileId },
      { signal: params.signal },
    );

    if (getIsFileReady(file)) {
      return file;
    }

    if (getHasFailedSource(file)) {
      throw new VideoGenError({
        message: "Uploaded file processing failed",
        status: 0,
        body: file,
        requestId: null,
      });
    }

    if (Date.now() - startedAt > timeoutMs) {
      throw new VideoGenError({
        message: "Timed out waiting for uploaded file to become ready",
        status: 0,
        body: file,
        requestId: null,
      });
    }

    await sleep({ ms: pollIntervalMs, signal: params.signal });
  }
};
