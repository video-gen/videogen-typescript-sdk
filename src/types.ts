import type { components } from "./types/openapi.js";

export type {
  components,
  paths,
  operations,
  webhooks,
} from "./types/openapi.js";

export type Schemas = components["schemas"];

type LegacyWorkflowEdits = {
  /** @deprecated Use videoEdits. */
  remixActions?: Schemas["VideoEditOperation"][];
};

export type ScriptToVideoRequest = Schemas["ScriptToVideoRequest"] &
  LegacyWorkflowEdits;
export type VoiceoverToVideoRequest = Schemas["VoiceoverToVideoRequest"] &
  LegacyWorkflowEdits;
export type SlideshowToVideoRequest = Schemas["SlideshowToVideoRequest"] &
  LegacyWorkflowEdits;
export type PromptToVideoClipRequest = Schemas["PromptToVideoClipRequest"];
export type StoryboardToVideoRequest = Schemas["StoryboardToVideoRequest"] &
  LegacyWorkflowEdits;
export type VideoToVideoRequest = Schemas["VideoToVideoRequest"] &
  LegacyWorkflowEdits;
export type TranslateVideoRequest = Schemas["TranslateVideoRequest"] &
  LegacyWorkflowEdits;
export type StartWorkflowRunResponse = Schemas["StartWorkflowRunResponse"] & {
  /** @deprecated Use videoEditIds. */
  remixActionIds?: string[];
};
export type WorkflowRun = Schemas["WorkflowRun"];
export type WorkflowRunOutput = Schemas["WorkflowRunOutput"];
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
export type VideoEditOperation = Schemas["VideoEditOperation"];
export type StartVideoEditsRequest = Schemas["StartVideoEditsRequest"];
export type StartVideoEditsResponse = Schemas["StartVideoEditsResponse"];
export type ListVideoEditsResponse = Schemas["ListVideoEditsResponse"];
export type VideoEditRun = Schemas["VideoEditRun"];
export type RemixProjectRequest = Schemas["RemixProjectRequest"];
export type RemixProjectResponse = Schemas["RemixProjectResponse"];
export type ListRemixActionsResponse = Schemas["ListRemixActionsResponse"];
export type RemixActionRun = Schemas["RemixActionRun"];

export type GenerateImageRequest = Schemas["GenerateImageRequest"];
export type GenerateVideoClipRequest = Schemas["GenerateVideoClipRequest"];
export type GenerateMotionGraphicRequest =
  Schemas["GenerateMotionGraphicRequest"];
export type TextToSpeechRequest = Schemas["TextToSpeechRequest"];
export type GenerateSoundEffectRequest = Schemas["GenerateSoundEffectRequest"];
export type GenerateMusicRequest = Schemas["GenerateMusicRequest"];
export type GenerateAvatarRequest = Schemas["GenerateAvatarRequest"];
export type ImageAssetRequest = Schemas["ImageAssetRequest"];
export type VideoAssetRequest = Schemas["VideoAssetRequest"];
export type DubVideoRequest = Schemas["DubVideoRequest"];
export type StartToolExecutionResponse = Schemas["StartToolExecutionResponse"];
export type ToolExecutionListResponse = Schemas["ToolExecutionListResponse"];
export type ExecutedTool = Schemas["ExecutedTool"];

export type GetFilesResponse = Schemas["GetFilesResponse"];
export type SearchFilesRequest = Schemas["SearchFilesRequest"];
export type SearchFilesResponse = Schemas["SearchFilesResponse"];
export type FileInfo = Schemas["FileInfo"];
export type CreateFileUploadRequest = Schemas["CreateFileUploadRequest"];
export type FileUploadResponse = Schemas["FileUploadResponse"];
export type CreateFileUrlImportRequest = Schemas["CreateFileUrlImportRequest"];
export type CreateFileUrlImportResponse =
  Schemas["CreateFileUrlImportResponse"];
export type FileUrlImport = Schemas["FileUrlImport"];

export type Entity = Schemas["Entity"];
export type EntityBrandConfig = Schemas["EntityBrandConfig"];
export type ListEntitiesResponse = Schemas["ListEntitiesResponse"];
export type CreateEntityRequest = Schemas["CreateEntityRequest"];
export type UpdateEntityRequest = Schemas["UpdateEntityRequest"];
export type EntityArchiveResponse = Schemas["EntityArchiveResponse"];
export type AddEntityReferenceRequest = Schemas["AddEntityReferenceRequest"];
export type RemoveEntityReferenceRequest =
  Schemas["RemoveEntityReferenceRequest"];

export type StartAssistantChatRequest = Schemas["StartAssistantChatRequest"];
export type StartAssistantChatResponse = Schemas["StartAssistantChatResponse"];
export type SendAssistantMessageRequest =
  Schemas["SendAssistantMessageRequest"];
export type SendAssistantMessageResponse =
  Schemas["SendAssistantMessageResponse"];
export type ActOnAssistantActionRequest =
  Schemas["ActOnAssistantActionRequest"];
export type ActOnAssistantActionResponse =
  Schemas["ActOnAssistantActionResponse"];
export type GetAssistantResponse = Schemas["GetAssistantResponse"];
export type AssistantMessage = Schemas["AssistantMessage"];
export type AssistantInputMessage = Schemas["AssistantInputMessage"];
export type AssistantOutputMessage = Schemas["AssistantOutputMessage"];
export type AssistantMessageStatus = Schemas["AssistantMessageStatus"];
export type AssistantAction = Schemas["AssistantAction"];
export type AssistantActionKind = Schemas["AssistantActionKind"];
export type AssistantActionDetail = Schemas["AssistantActionDetail"];
export type AssistantWorkflowSuggestion =
  Schemas["AssistantWorkflowSuggestion"];
export type AssistantMessageAttachment = Schemas["AssistantMessageAttachment"];
export type AssistantMessageWebhookPayload =
  Schemas["AssistantMessageWebhookPayload"];
export type AssistantMessageWebhookEventName =
  Schemas["AssistantMessageWebhookEventName"];

export type GenerateTextRequest = Schemas["GenerateTextRequest"];
export type GenerateTextResponse = Schemas["GenerateTextResponse"];

export type TtsVoiceListResponse = Schemas["TtsVoiceListResponse"];
export type LanguageListResponse = Schemas["LanguageListResponse"];

export type CreateWebhookEndpointRequest =
  Schemas["CreateWebhookEndpointRequest"];
export type WebhookEndpoint = Schemas["WebhookEndpoint"];
export type WebhookEndpointListResponse =
  Schemas["WebhookEndpointListResponse"];

export type MeResponse = Schemas["MeResponse"];
export type BillingAccountResponse = Schemas["BillingAccountResponse"];
export type BillingOrder = Schemas["BillingOrder"];
export type CreateBillingOrderRequest = Schemas["CreateBillingOrderRequest"];
export type CompleteBillingOrderRequest =
  Schemas["CompleteBillingOrderRequest"] & {
    orderId: string;
  };
export type GetBillingOrderRequest = {
  orderId: string;
};
export type CancelBillingOrderRequest = GetBillingOrderRequest;
export type RequestBillingRefundRequest = Schemas["BillingRefundRequest"] & {
  orderId: string;
};
export type ApiError = Schemas["ApiError"];

export type RequestOptions = {
  signal?: AbortSignal;
};

/** Pass the user-approved token out of band. Never include it in tool content. */
export type BillingPaymentOptions = RequestOptions & {
  paymentToken: string;
};

export type PollOptions = {
  pollIntervalMs?: number;
  timeoutMs?: number;
  signal?: AbortSignal;
  throwOnFailure?: boolean;
  onProgress?: (progressPercentage: number) => void;
};

export type StartModel1GenerationRequest =
  Schemas["StartModel1GenerationRequest"];
export type StartModel1GenerationResponse =
  Schemas["StartModel1GenerationResponse"];
export type Model1Generation = Schemas["Model1Generation"];
export type Model1Quota = Schemas["Model1Quota"];
export type GetModel1GenerationRequest = { generationId: string };
export type Model1GenerationOptions = RequestOptions & {
  idempotencyKey: string;
};

// JSON serialization omits undefined object properties. Accept that same input
// shape from schema clients, including under exactOptionalPropertyTypes.
type JsonRequest<T> = T extends (infer Item)[]
  ? JsonRequest<Item>[]
  : T extends object
    ? {
        [Key in keyof T]: undefined extends T[Key]
          ? JsonRequest<Exclude<T[Key], undefined>> | undefined
          : JsonRequest<T[Key]>;
      }
    : T;
export type VideoEditCommand = JsonRequest<Schemas["VideoEditCommand"]>;
export type EditVideoCommandsRequest = JsonRequest<
  Schemas["EditVideoCommandsRequest"]
>;
export type ProjectEditReceipt = Schemas["ProjectEditReceipt"] & {
  /** @deprecated Use videoEditId. */
  remixActionId?: string;
};
export type ProjectArtifactProjection = Schemas["ProjectArtifactProjection"];
export type ListProjectArtifactsResponse =
  Schemas["ListProjectArtifactsResponse"];
export type ProjectEditingCapabilities = Schemas["ProjectEditingCapabilities"];
export type EditableVideoInspection = Schemas["EditableVideoInspection"];
export type UndoProjectEditRequest = Schemas["UndoProjectEditRequest"];

export type ProjectEditCommand = Schemas["ProjectEditCommand"];
export type ProjectEditExpectedDocument =
  Schemas["ProjectEditExpectedDocument"];
export type ApplyProjectEditsRequest = JsonRequest<
  Schemas["ApplyProjectEditsRequest"]
>;
export type GetProjectArtifactResponse = Schemas["GetProjectArtifactResponse"];
