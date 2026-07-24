import type { VideoGen } from "../client.js";
import type {
  GenerateTextRequest,
  GenerateTextResponse,
  RequestOptions,
} from "../types.js";

export class TextResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation generateText
  async generateText(
    request: GenerateTextRequest,
    options?: RequestOptions,
  ): Promise<GenerateTextResponse> {
    return this.client.request<GenerateTextResponse>({
      method: "POST",
      path: "/v1/text/generate",
      body: request,
      signal: options?.signal,
    });
  }
}
