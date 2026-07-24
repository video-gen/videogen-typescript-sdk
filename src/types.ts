import type { components } from "./types/openapi.js";

export type { components, paths, operations, webhooks } from "./types/openapi.js";

export type Schemas = components["schemas"];

export type ScriptToVideoRequest = Schemas["ScriptToVideoRequest"];
export type VoiceoverToVideoRequest = Schemas["VoiceoverToVideoRequest"];
export type SlideshowToVideoRequest = Schemas["SlideshowToVideoRequest"];
export type PromptToVideoClipRequest = Schemas["PromptToVideoClipRequest"];
export type ContentOutlineToVideoRequest = Schemas["ContentOutlineToVideoRequest"];
export type StartWorkflowRunResponse = Schemas["StartWorkflowRunResponse"];
export type WorkflowRun = Schemas["WorkflowRun"];
export type WorkflowRunListResponse = Schemas["WorkflowRunListResponse"];

export type ListProjectsResponse = Schemas["ListProjectsResponse"];
export type ProjectResponse = Schemas["ProjectResponse"];
export type ExportProjectRequest = Schemas["ExportProjectRequest"];
export type ExportProjectResponse = Schemas["ExportProjectResponse"];
export type ListProjectExportsResponse = Schemas["ListProjectExportsResponse"];
export type ProjectExport = Schemas["ProjectExport"];
export type CreateTimelineInterchangeRequest =
  Schemas["CreateTimelineInterchangeRequest"];
export type CreateTimelineInterchangeResponse =
  Schemas["CreateTimelineInterchangeResponse"];
export type TimelineInterchange = Schemas["TimelineInterchange"];
export type TimelineInterchangeFormat = Schemas["TimelineInterchangeFormat"];
export type TimelineInterchangeMediaDelivery =
  Schemas["TimelineInterchangeMediaDelivery"];
export type RemixProjectRequest = Schemas["RemixProjectRequest"];
export type RemixProjectResponse = Schemas["RemixProjectResponse"];
export type ListRemixActionsResponse = Schemas["ListRemixActionsResponse"];
export type RemixActionRun = Schemas["RemixActionRun"];

export type GenerateImageRequest = Schemas["GenerateImageRequest"];
export type GenerateVideoClipRequest = Schemas["GenerateVideoClipRequest"];
export type GenerateMotionGraphicRequest = Schemas["GenerateMotionGraphicRequest"];
export type TextToSpeechRequest = Schemas["TextToSpeechRequest"];
export type GenerateSoundEffectRequest = Schemas["GenerateSoundEffectRequest"];
export type GenerateMusicRequest = Schemas["GenerateMusicRequest"];
export type GenerateAvatarRequest = Schemas["GenerateAvatarRequest"];
export type ImageAssetRequest = Schemas["ImageAssetRequest"];
export type VideoAssetRequest = Schemas["VideoAssetRequest"];
export type StartToolExecutionResponse = Schemas["StartToolExecutionResponse"];
export type ToolExecutionListResponse = Schemas["ToolExecutionListResponse"];
export type ExecutedTool = Schemas["ExecutedTool"];

export type GetFilesResponse = Schemas["GetFilesResponse"];
export type SearchFilesRequest = Schemas["SearchFilesRequest"];
export type SearchFilesResponse = Schemas["SearchFilesResponse"];
export type StorageFile = Schemas["StorageFile"];
export type CreateFileUploadRequest = Schemas["CreateFileUploadRequest"];
export type FileUploadResponse = Schemas["FileUploadResponse"];

export type StartAssistantChatRequest = Schemas["StartAssistantChatRequest"];
export type SendAssistantMessageRequest = Schemas["SendAssistantMessageRequest"];
export type ActOnAssistantActionRequest = Schemas["ActOnAssistantActionRequest"];
export type AssistantTurnResponse = Schemas["AssistantTurnResponse"];

export type GenerateTextRequest = Schemas["GenerateTextRequest"];
export type GenerateTextResponse = Schemas["GenerateTextResponse"];

export type AvatarPresenterListResponse = Schemas["AvatarPresenterListResponse"];
export type TtsVoiceListResponse = Schemas["TtsVoiceListResponse"];
export type LanguageListResponse = Schemas["LanguageListResponse"];

export type CreateWebhookEndpointRequest = Schemas["CreateWebhookEndpointRequest"];
export type WebhookEndpoint = Schemas["WebhookEndpoint"];
export type WebhookEndpointListResponse = Schemas["WebhookEndpointListResponse"];

export type MeResponse = Schemas["MeResponse"];
export type ApiError = Schemas["ApiError"];

export type RequestOptions = {
  signal?: AbortSignal;
};

export type PollOptions = {
  pollIntervalMs?: number;
  timeoutMs?: number;
  signal?: AbortSignal;
  throwOnFailure?: boolean;
  onProgress?: (progressPercentage: number) => void;
};
