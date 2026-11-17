export class VideoGenError extends Error {
  readonly status: number;
  readonly body: unknown;
  readonly requestId: string | null;
  readonly retryAfter: string | null;

  constructor({
    message,
    status,
    body,
    requestId,
    retryAfter,
  }: {
    message: string;
    status: number;
    body: unknown;
    requestId: string | null;
    retryAfter?: string | null;
  }) {
    super(message);
    this.name = "VideoGenError";
    this.status = status;
    this.body = body;
    this.requestId = requestId;
    this.retryAfter = retryAfter ?? null;
  }
}
