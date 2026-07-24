import { writeFile } from "node:fs/promises";

import type { VideoGen } from "../client.js";
import { VideoGenError } from "../errors.js";
import type { RequestOptions } from "../types.js";
import { getHydratedFile } from "./getHydratedFile.js";

export type DownloadFileOptions = RequestOptions & {
  outputPath?: string;
};

export type DownloadFileParams = {
  client: VideoGen;
  fileId: string;
} & DownloadFileOptions;

export async function downloadFile(
  params: DownloadFileParams & { outputPath: string },
): Promise<void>;
export async function downloadFile(params: DownloadFileParams): Promise<Response>;
export async function downloadFile(
  params: DownloadFileParams,
): Promise<Response | void> {
  const { client, fileId, outputPath, signal } = params;
  const file = await getHydratedFile({ client, fileId, signal });
  const url = file.downloadSource?.url;
  if (url == null) {
    throw new VideoGenError({
      message: "File does not have a ready download URL",
      status: 0,
      body: file,
      requestId: null,
    });
  }

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new VideoGenError({
      message: `Failed to download file (${response.status})`,
      status: response.status,
      body: null,
      requestId: response.headers.get("x-request-id"),
    });
  }

  if (outputPath != null) {
    const bytes = new Uint8Array(await response.arrayBuffer());
    await writeFile(outputPath, bytes);
    return;
  }

  return response;
}
