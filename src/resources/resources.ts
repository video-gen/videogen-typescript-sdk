import type { VideoGen } from "../client.js";
import { pickFields } from "../request.js";
import type {
  LanguageListResponse,
  RequestOptions,
  TtsVoiceListResponse,
} from "../types.js";

type ListTtsVoicesRequest = {
  limit?: number;
  cursor?: string;
  includeDeprecatedVoices?: boolean;
  query?: string;
};

type ListLanguagesRequest = {
  query?: string;
};

export class ResourcesResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation listTtsVoices
  async listTtsVoices(
    request?: ListTtsVoicesRequest,
    options?: RequestOptions,
  ): Promise<TtsVoiceListResponse> {
    return this.client.request<TtsVoiceListResponse>({
      method: "GET",
      path: "/v1/resources/tts-voices",
      query: pickFields(request ?? {}, ["limit", "cursor", "includeDeprecatedVoices", "query"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation listLanguages
  async listLanguages(options?: RequestOptions): Promise<LanguageListResponse>;
  async listLanguages(
    request: ListLanguagesRequest,
    options?: RequestOptions,
  ): Promise<LanguageListResponse>;
  async listLanguages(
    requestOrOptions?: ListLanguagesRequest | RequestOptions,
    options?: RequestOptions,
  ): Promise<LanguageListResponse> {
    return this.client.request<LanguageListResponse>({
      method: "GET",
      path: "/v1/resources/languages",
      query: pickFields(requestOrOptions, ["query"]),
      signal:
        options?.signal ??
        (requestOrOptions != null && "signal" in requestOrOptions
          ? requestOrOptions.signal
          : undefined),
    });
  }
}
