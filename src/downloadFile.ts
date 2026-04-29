import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { getHydratedFile } from "./getHydratedFile.js";
import type { VideoGenClient } from "./index.js";

export type DownloadFileOptions = {
  /** When provided, streams the file to this local path and resolves when complete. */
  outputPath?: string;
};

/**
 * Downloads a file by first hydrating it to get a fresh download URL.
 *
 * - If `outputPath` is provided, streams to disk and resolves with `undefined`.
 * - If `outputPath` is omitted, returns the raw `Response` for custom handling
 *   (e.g. `response.body` for streaming, `response.arrayBuffer()` for bytes).
 */
export async function downloadFile(
  client: Pick<VideoGenClient, "files">,
  fileId: string,
  options?: DownloadFileOptions,
): Promise<Response | undefined> {
  const file = await getHydratedFile(client, fileId);

  if (file.downloadSource?.url == null) {
    throw new Error(
      `File ${fileId} has no download URL available (status: ${file.downloadSource?.status ?? "unknown"}).`,
    );
  }

  const response = await fetch(file.downloadSource.url);

  if (!response.ok) {
    throw new Error(`Download failed with status ${response.status}: ${response.statusText}`);
  }

  if (options?.outputPath == null) {
    return response;
  }

  if (response.body == null) {
    throw new Error("Response body is null — cannot stream to file.");
  }

  // Node's Readable.fromWeb expects import("node:stream/web").ReadableStream but
  // fetch returns the global web ReadableStream — the types are structurally
  // identical at runtime, so the cast is safe.
  const nodeReadable = Readable.fromWeb(response.body as import("node:stream/web").ReadableStream);
  const fileStream = createWriteStream(options.outputPath);
  await pipeline(nodeReadable, fileStream);

  return undefined;
}
