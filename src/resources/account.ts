import type { VideoGen } from "../client.js";
import type { MeResponse, RequestOptions } from "../types.js";

export class AccountResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation getMe
  async getMe(options?: RequestOptions): Promise<MeResponse> {
    return this.client.request<MeResponse>({
      method: "GET",
      path: "/v1/me",
      signal: options?.signal,
    });
  }
}
