export const sleep = async ({
  ms,
  signal,
}: {
  ms: number;
  signal?: AbortSignal;
}): Promise<void> => {
  if (signal?.aborted) {
    throw signal.reason instanceof Error
      ? signal.reason
      : new DOMException("The operation was aborted.", "AbortError");
  }

  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    const onAbort = () => {
      clearTimeout(timer);
      const reason = signal?.reason;
      reject(
        reason instanceof Error
          ? reason
          : new DOMException("The operation was aborted.", "AbortError"),
      );
    };

    signal?.addEventListener("abort", onAbort, { once: true });
  });
};
