export type PollProjectExportOptions = {
  pollIntervalMs?: number;
  /** Maximum time in ms to wait for the export to reach a terminal state. Defaults to 3_600_000 (1 hour). */
  timeoutMs?: number;
  signal?: AbortSignal;
};

export type PolledProjectExport = {
  exportId: string;
  status: string;
  projectId: string;
  downloadUrl?: string | null;
};

export type ProjectExportPollerClient = {
  projects: {
    getProjectExport: (args: {
      projectId: string;
      exportId: string;
    }) => Promise<PolledProjectExport>;
  };
};

const TERMINAL_PROJECT_EXPORT_STATUSES = new Set(["succeeded", "failed"]);

function getIsTerminalStatus(status: string): boolean {
  return TERMINAL_PROJECT_EXPORT_STATUSES.has(status);
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal == null) {
      setTimeout(() => {
        resolve();
      }, ms);
      return;
    }

    let id: ReturnType<typeof setTimeout> | undefined = undefined;
    const onAbort = (): void => {
      if (id != null) {
        clearTimeout(id);
      }
      try {
        signal.throwIfAborted();
      } catch (err) {
        reject(err);
      }
    };

    id = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

/** Polls `getProjectExport` until status is `succeeded` or `failed`. */
export async function pollProjectExport(
  client: ProjectExportPollerClient,
  projectId: string,
  exportId: string,
  options?: PollProjectExportOptions,
): Promise<PolledProjectExport> {
  const pollIntervalMs = options?.pollIntervalMs ?? 1500;
  const timeoutMs = options?.timeoutMs ?? 3_600_000;
  const signal = options?.signal;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    signal?.throwIfAborted();

    const projectExport = await client.projects.getProjectExport({ projectId, exportId });

    if (getIsTerminalStatus(projectExport.status)) {
      return projectExport;
    }

    await sleep(pollIntervalMs, signal);
  }

  throw new Error(
    `Project export ${exportId} for project ${projectId} did not reach a terminal state within ${timeoutMs}ms.`,
  );
}
