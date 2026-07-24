import type { VideoGen } from "../client.js";
import { VideoGenError } from "../errors.js";
import type { PollOptions, StorageFile } from "../types.js";
import { sleep } from "./sleep.js";

export type UploadFileParams = {
  client: VideoGen;
  data: BodyInit;
  type?: "IMAGE" | "VIDEO" | "AUDIO" | "PDF" | "SLIDESHOW";
  displayName?: string;
  temporary?: boolean;
  contentType?: string;
  pollIntervalMs?: number;
  timeoutMs?: number;
  signal?: AbortSignal;
};

const getIsFileReady = (file: StorageFile): boolean => {
  const sources = [
    file.downloadSource,
    file.previewSource,
    file.thumbnailSource,
    file.hlsSource,
  ];
  return sources.some((source) => source != null && source.status === "ready");
};

export const uploadFile = async (params: UploadFileParams): Promise<StorageFile> => {
  const { client } = params;
  const displayName = params.displayName ?? "upload";
  const pollIntervalMs = params.pollIntervalMs ?? 2000;
  const timeoutMs = params.timeoutMs ?? 3_600_000;
  const startedAt = Date.now();

  const created = await client.files.createFileUpload(
    {
      displayName,
      isTemporary: params.temporary ?? false,
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

    const file = await client.files.getFile(
      { fileId: created.fileId },
      { signal: params.signal },
    );

    if (getIsFileReady(file)) {
      return file;
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
