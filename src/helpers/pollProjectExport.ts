import type { VideoGen } from "../client.js";
import { VideoGenError } from "../errors.js";
import type { PollOptions, ProjectExport } from "../types.js";
import { sleep } from "./sleep.js";

const TERMINAL = new Set(["succeeded", "failed"]);

export type PollProjectExportParams = {
  client: VideoGen;
  projectId: string;
  exportId: string;
} & PollOptions;

export const pollProjectExport = async ({
  client,
  projectId,
  exportId,
  pollIntervalMs = 1500,
  timeoutMs = 3_600_000,
  throwOnFailure = true,
  onProgress,
  signal,
}: PollProjectExportParams): Promise<ProjectExport> => {
  const startedAt = Date.now();

  for (;;) {
    if (signal?.aborted) {
      throw signal.reason instanceof Error
        ? signal.reason
        : new DOMException("The operation was aborted.", "AbortError");
    }

    const projectExport = await client.projects.getProjectExport(
      { projectId, exportId },
      { signal },
    );

    onProgress?.(projectExport.progressPercentage);

    if (TERMINAL.has(projectExport.status)) {
      if (throwOnFailure && projectExport.status === "failed") {
        const message =
          projectExport.error != null &&
          typeof projectExport.error === "object" &&
          "message" in projectExport.error &&
          typeof projectExport.error.message === "string"
            ? projectExport.error.message
            : `Project export ${projectExport.status}`;
        throw new VideoGenError({
          message,
          status: 0,
          body: projectExport,
          requestId: null,
        });
      }
      return projectExport;
    }

    if (Date.now() - startedAt > timeoutMs) {
      throw new VideoGenError({
        message: "Timed out waiting for project export",
        status: 0,
        body: projectExport,
        requestId: null,
      });
    }

    await sleep({ ms: pollIntervalMs, signal });
  }
};
