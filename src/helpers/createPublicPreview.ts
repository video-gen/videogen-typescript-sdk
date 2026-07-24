import type { VideoGen } from "../client.js";
import type { FileInfo } from "../types.js";
import {
  pollPublicPreview,
  type PollPublicPreviewOptions,
} from "./pollPublicPreview.js";

export type CreatePublicPreviewParams = {
  client: VideoGen;
  fileId: string;
} & PollPublicPreviewOptions;

export const createPublicPreview = async ({
  client,
  fileId,
  ...opts
}: CreatePublicPreviewParams): Promise<FileInfo> => {
  await client.files.enablePublicPreview({ fileId }, { signal: opts.signal });
  return pollPublicPreview({ client, fileId, ...opts });
};
