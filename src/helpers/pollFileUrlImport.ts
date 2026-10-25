import type { VideoGen } from "../client.js";
import { VideoGenError } from "../errors.js";
import type { FileUrlImport, PollOptions } from "../types.js";
import { sleep } from "./sleep.js";

const TERMINAL = new Set(["succeeded", "failed", "cancelled"]);

export type PollFileUrlImportParams = {
  client: VideoGen;
  fileImportId: string;
} & PollOptions;

export const pollFileUrlImport = async ({
  client,
  fileImportId,
  pollIntervalMs = 1500,
  timeoutMs = 3_600_000,
  throwOnFailure = true,
  onProgress,
  signal,
}: PollFileUrlImportParams): Promise<FileUrlImport> => {
  const startedAt = Date.now();

  for (;;) {
    if (signal?.aborted) {
      throw signal.reason instanceof Error
        ? signal.reason
        : new DOMException("The operation was aborted.", "AbortError");
    }

    const fileUrlImport = await client.files.getFileUrlImport(
      { fileImportId },
      { signal },
    );

    onProgress?.(fileUrlImport.progressPercentage);

    if (TERMINAL.has(fileUrlImport.status)) {
      if (
        throwOnFailure &&
        (fileUrlImport.status === "failed" ||
          fileUrlImport.status === "cancelled")
      ) {
        const message =
          fileUrlImport.error != null &&
          typeof fileUrlImport.error === "object" &&
          "message" in fileUrlImport.error &&
          typeof fileUrlImport.error.message === "string"
            ? fileUrlImport.error.message
            : `File import ${fileUrlImport.status}`;
        throw new VideoGenError({
          message,
          status: 0,
          body: fileUrlImport,
          requestId: null,
        });
      }
      return fileUrlImport;
    }

    if (Date.now() - startedAt > timeoutMs) {
      throw new VideoGenError({
        message: "Timed out waiting for file import",
        status: 0,
        body: fileUrlImport,
        requestId: null,
      });
    }

    await sleep({ ms: pollIntervalMs, signal });
  }
};
