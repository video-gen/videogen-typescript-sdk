import type { VideoGen } from "../client.js";
import { fillPath, omitFields } from "../request.js";
import type {
  ActOnAssistantActionRequest,
  AssistantTurnResponse,
  RequestOptions,
  SendAssistantMessageRequest,
  StartAssistantChatRequest,
} from "../types.js";

type SendAssistantMessageMergedRequest = {
  projectId: string;
} & SendAssistantMessageRequest;

type ActOnAssistantActionMergedRequest = {
  projectId: string;
  assistantActionId: string;
} & ActOnAssistantActionRequest;

export class AssistantResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation startAssistantChat
  async startAssistantChat(
    request: StartAssistantChatRequest,
    options?: RequestOptions,
  ): Promise<AssistantTurnResponse> {
    return this.client.request<AssistantTurnResponse>({
      method: "POST",
      path: "/v1/assistant/chats",
      body: request,
      signal: options?.signal,
    });
  }

  // @sdk-operation sendAssistantMessage
  async sendAssistantMessage(
    request: SendAssistantMessageMergedRequest,
    options?: RequestOptions,
  ): Promise<AssistantTurnResponse> {
    return this.client.request<AssistantTurnResponse>({
      method: "POST",
      path: fillPath("/v1/assistant/chats/{projectId}/messages", {
        projectId: request.projectId,
      }),
      body: omitFields(request, ["projectId"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation actOnAssistantAction
  async actOnAssistantAction(
    request: ActOnAssistantActionMergedRequest,
    options?: RequestOptions,
  ): Promise<AssistantTurnResponse> {
    const body = omitFields(request, ["projectId", "assistantActionId"]);
    return this.client.request<AssistantTurnResponse>({
      method: "POST",
      path: fillPath("/v1/assistant/chats/{projectId}/actions/{assistantActionId}", {
        projectId: request.projectId,
        assistantActionId: request.assistantActionId,
      }),
      body: Object.keys(body).length > 0 ? body : undefined,
      signal: options?.signal,
    });
  }
}
