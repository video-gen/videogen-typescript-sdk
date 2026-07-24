export class VideoGenError extends Error {
  readonly status: number;
  readonly body: unknown;
  readonly requestId: string | null;

  constructor({
    message,
    status,
    body,
    requestId,
  }: {
    message: string;
    status: number;
    body: unknown;
    requestId: string | null;
  }) {
    super(message);
    this.name = "VideoGenError";
    this.status = status;
    this.body = body;
    this.requestId = requestId;
  }
}
