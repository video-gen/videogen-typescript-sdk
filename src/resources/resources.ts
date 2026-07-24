import type { VideoGen } from "../client.js";
import { pickFields } from "../request.js";
import type {
  AvatarPresenterListResponse,
  LanguageListResponse,
  RequestOptions,
  TtsVoiceListResponse,
} from "../types.js";

type ListAvatarPresentersRequest = {
  limit?: number;
  cursor?: string;
  voiceId?: string;
};

type ListTtsVoicesRequest = {
  limit?: number;
  cursor?: string;
  includeDeprecatedVoices?: boolean;
};

export class ResourcesResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation listAvatarPresenters
  async listAvatarPresenters(
    request?: ListAvatarPresentersRequest,
    options?: RequestOptions,
  ): Promise<AvatarPresenterListResponse> {
    return this.client.request<AvatarPresenterListResponse>({
      method: "GET",
      path: "/v1/resources/avatar-presenters",
      query: pickFields(request ?? {}, ["limit", "cursor", "voiceId"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation listTtsVoices
  async listTtsVoices(
    request?: ListTtsVoicesRequest,
    options?: RequestOptions,
  ): Promise<TtsVoiceListResponse> {
    return this.client.request<TtsVoiceListResponse>({
      method: "GET",
      path: "/v1/resources/tts-voices",
      query: pickFields(request ?? {}, ["limit", "cursor", "includeDeprecatedVoices"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation listLanguages
  async listLanguages(options?: RequestOptions): Promise<LanguageListResponse> {
    return this.client.request<LanguageListResponse>({
      method: "GET",
      path: "/v1/resources/languages",
      signal: options?.signal,
    });
  }
}
