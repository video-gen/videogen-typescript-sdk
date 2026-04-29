import type { VideoGenApi, VideoGenClient } from "./index.js";

/** Fetches a file and hydrates it if source URLs are missing or expired. */
export async function getHydratedFile(
  client: Pick<VideoGenClient, "files">,
  fileId: string,
): Promise<VideoGenApi.StorageFile> {
  const file = await client.files.getFile({ fileId });

  const needsHydration =
    file.downloadSource == null ||
    file.downloadSource.status === "pending" ||
    (file.downloadSource.status === "ready" && file.downloadSource.url == null) ||
    (file.downloadSource.expiresAt != null &&
      file.downloadSource.expiresAt < Math.floor(Date.now() / 1000));

  if (!needsHydration) {
    return file;
  }

  return await client.files.hydrateFile({ fileId });
}
