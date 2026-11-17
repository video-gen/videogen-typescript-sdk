import type { VideoGen } from "../client.js";
import { fillPath } from "../request.js";
import type {
  StartModel1GenerationRequest,
  StartModel1GenerationResponse,
  Model1Generation,
  Model1Quota,
  GetModel1GenerationRequest,
  Model1GenerationOptions,
  RequestOptions,
} from "../types.js";

export class ModelsResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation startModel1Generation
  async startModel1Generation(
    request: StartModel1GenerationRequest,
    options: Model1GenerationOptions,
  ): Promise<StartModel1GenerationResponse> {
    return this.client.request<StartModel1GenerationResponse>({
      method: "POST",
      path: "/v1/models/model-1/generations",
      body: request,
      idempotencyKey: options.idempotencyKey,
      signal: options.signal,
    });
  }

  // @sdk-operation getModel1Generation
  async getModel1Generation(
    request: GetModel1GenerationRequest,
    options?: RequestOptions,
  ): Promise<Model1Generation> {
    return this.client.request<Model1Generation>({
      method: "GET",
      path: fillPath("/v1/models/model-1/generations/{generationId}", request),
      signal: options?.signal,
    });
  }

  // @sdk-operation getModel1Quota
  async getModel1Quota(options?: RequestOptions): Promise<Model1Quota> {
    return this.client.request<Model1Quota>({
      method: "GET",
      path: "/v1/models/model-1/quota",
      signal: options?.signal,
    });
  }
}
