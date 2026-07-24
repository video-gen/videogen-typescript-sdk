import type { VideoGen } from "../client.js";
import { pollAssistantMessage } from "../helpers/pollAssistantMessage.js";
import { fillPath, omitFields } from "../request.js";
import type {
  ActOnAssistantActionRequest,
  ActOnAssistantActionResponse,
  AssistantMessage,
  GetAssistantResponse,
  PollOptions,
  RequestOptions,
  SendAssistantMessageRequest,
  SendAssistantMessageResponse,
  StartAssistantChatRequest,
  StartAssistantChatResponse,
} from "../types.js";

type AssistantIdRequest = {
  assistantId: string;
};

type MessageIdRequest = {
  messageId: string;
};

type SendAssistantMessageMergedRequest = {
  assistantId: string;
} & SendAssistantMessageRequest;

type ActOnAssistantActionMergedRequest = {
  assistantId: string;
  actionId: string;
} & ActOnAssistantActionRequest;

export class AssistantResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation startAssistantChat
  async startAssistantChat(
    request: StartAssistantChatRequest,
    options?: RequestOptions,
  ): Promise<StartAssistantChatResponse> {
    return this.client.request<StartAssistantChatResponse>({
      method: "POST",
      path: "/v1/assistants",
      body: request,
      signal: options?.signal,
    });
  }

  async startAssistantChatAndWait(
    request: StartAssistantChatRequest,
    options?: PollOptions,
  ): Promise<AssistantMessage> {
    const started = await this.startAssistantChat(request, { signal: options?.signal });
    return pollAssistantMessage({
      client: this.client,
      messageId: started.messageId,
      ...options,
    });
  }

  // @sdk-operation getAssistant
  async getAssistant(
    request: AssistantIdRequest,
    options?: RequestOptions,
  ): Promise<GetAssistantResponse> {
    return this.client.request<GetAssistantResponse>({
      method: "GET",
      path: fillPath("/v1/assistants/{assistantId}", {
        assistantId: request.assistantId,
      }),
      signal: options?.signal,
    });
  }

  // @sdk-operation sendAssistantMessage
  async sendAssistantMessage(
    request: SendAssistantMessageMergedRequest,
    options?: RequestOptions,
  ): Promise<SendAssistantMessageResponse> {
    return this.client.request<SendAssistantMessageResponse>({
      method: "POST",
      path: fillPath("/v1/assistants/{assistantId}/messages", {
        assistantId: request.assistantId,
      }),
      body: omitFields(request, ["assistantId"]),
      signal: options?.signal,
    });
  }

  async sendAssistantMessageAndWait(
    request: SendAssistantMessageMergedRequest,
    options?: PollOptions,
  ): Promise<AssistantMessage> {
    const started = await this.sendAssistantMessage(request, { signal: options?.signal });
    return pollAssistantMessage({
      client: this.client,
      messageId: started.messageId,
      ...options,
    });
  }

  // @sdk-operation actOnAssistantAction
  async actOnAssistantAction(
    request: ActOnAssistantActionMergedRequest,
    options?: RequestOptions,
  ): Promise<ActOnAssistantActionResponse> {
    const body = omitFields(request, ["assistantId", "actionId"]);
    return this.client.request<ActOnAssistantActionResponse>({
      method: "POST",
      path: fillPath("/v1/assistants/{assistantId}/actions/{actionId}", {
        assistantId: request.assistantId,
        actionId: request.actionId,
      }),
      body: Object.keys(body).length > 0 ? body : undefined,
      signal: options?.signal,
    });
  }

  async actOnAssistantActionAndWait(
    request: ActOnAssistantActionMergedRequest,
    options?: PollOptions,
  ): Promise<AssistantMessage> {
    const started = await this.actOnAssistantAction(request, { signal: options?.signal });
    return pollAssistantMessage({
      client: this.client,
      messageId: started.messageId,
      ...options,
    });
  }

  // @sdk-operation getAssistantMessage
  async getAssistantMessage(
    request: MessageIdRequest,
    options?: RequestOptions,
  ): Promise<AssistantMessage> {
    return this.client.request<AssistantMessage>({
      method: "GET",
      path: fillPath("/v1/assistant-messages/{messageId}", {
        messageId: request.messageId,
      }),
      signal: options?.signal,
    });
  }
}
