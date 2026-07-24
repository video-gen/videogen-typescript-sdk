import type { VideoGen } from "../client.js";
import type { FileInfo, RequestOptions } from "../types.js";

const SOURCE_KEYS = [
  "thumbnailSource",
  "previewSource",
  "downloadSource",
  "hlsSource",
] as const;

export type GetHydratedFileParams = {
  client: VideoGen;
  fileId: string;
} & RequestOptions;

const getNeedsHydration = (file: FileInfo): boolean => {
  const nowSeconds = Math.floor(Date.now() / 1000);
  for (const key of SOURCE_KEYS) {
    const source = file[key];
    if (source == null) {
      continue;
    }
    if (source.status === "pending") {
      return true;
    }
    if (source.status === "ready") {
      if (source.url == null) {
        return true;
      }
      if (source.expiresAt != null && source.expiresAt <= nowSeconds + 60) {
        return true;
      }
    }
  }

  const hasAnyReadyUrl = SOURCE_KEYS.some((key) => {
    const source = file[key];
    return source != null && source.status === "ready" && source.url != null;
  });

  return !hasAnyReadyUrl;
};

export const getHydratedFile = async ({
  client,
  fileId,
  signal,
}: GetHydratedFileParams): Promise<FileInfo> => {
  const file = await client.files.getFile({ fileId }, { signal });
  if (!getNeedsHydration(file)) {
    return file;
  }
  return client.files.hydrateFile({ fileId }, { signal });
};
