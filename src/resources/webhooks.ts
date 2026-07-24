import type { VideoGen } from "../client.js";
import { fillPath, pickFields } from "../request.js";
import type {
  CreateWebhookEndpointRequest,
  RequestOptions,
  WebhookEndpoint,
  WebhookEndpointListResponse,
} from "../types.js";

type ListWebhookEndpointsRequest = {
  limit?: number;
  cursor?: string;
};

type DeleteWebhookEndpointRequest = {
  endpointId: string;
};

export class WebhooksResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation listWebhookEndpoints
  async listWebhookEndpoints(
    request?: ListWebhookEndpointsRequest,
    options?: RequestOptions,
  ): Promise<WebhookEndpointListResponse> {
    return this.client.request<WebhookEndpointListResponse>({
      method: "GET",
      path: "/v1/webhooks/endpoints",
      query: pickFields(request ?? {}, ["limit", "cursor"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation createWebhookEndpoint
  async createWebhookEndpoint(
    request: CreateWebhookEndpointRequest,
    options?: RequestOptions,
  ): Promise<WebhookEndpoint> {
    return this.client.request<WebhookEndpoint>({
      method: "POST",
      path: "/v1/webhooks/endpoints",
      body: request,
      signal: options?.signal,
    });
  }

  // @sdk-operation deleteWebhookEndpoint
  async deleteWebhookEndpoint(
    request: DeleteWebhookEndpointRequest,
    options?: RequestOptions,
  ): Promise<void> {
    await this.client.request<null>({
      method: "DELETE",
      path: fillPath("/v1/webhooks/endpoints/{endpointId}", {
        endpointId: request.endpointId,
      }),
      signal: options?.signal,
    });
  }
}
