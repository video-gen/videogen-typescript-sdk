import type { VideoGen } from "../client.js";
import { pollWorkflowRun } from "../helpers/pollWorkflowRun.js";
import { fillPath, pickFields } from "../request.js";
import type {
  PollOptions,
  PromptToVideoClipRequest,
  RequestOptions,
  ScriptToVideoRequest,
  SlideshowToVideoRequest,
  StartWorkflowRunResponse,
  StoryboardToVideoRequest,
  VoiceoverToVideoRequest,
  WorkflowRun,
  WorkflowRunListResponse,
} from "../types.js";

type ListWorkflowRunsRequest = {
  limit?: number;
  cursor?: string;
  selfOnly?: boolean;
};

type WorkflowRunIdRequest = {
  workflowRunId: string;
};

export class WorkflowsResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation scriptToVideo
  async scriptToVideo(
    request: ScriptToVideoRequest,
    options?: RequestOptions,
  ): Promise<StartWorkflowRunResponse> {
    return this.client.request<StartWorkflowRunResponse>({
      method: "POST",
      path: "/v1/workflows/script-to-video",
      body: request,
      signal: options?.signal,
    });
  }

  async scriptToVideoAndWait(
    request: ScriptToVideoRequest,
    options?: PollOptions,
  ): Promise<WorkflowRun> {
    const started = await this.scriptToVideo(request, { signal: options?.signal });
    return pollWorkflowRun({
      client: this.client,
      workflowRunId: started.workflowRunId,
      ...options,
    });
  }

  // @sdk-operation voiceoverToVideo
  async voiceoverToVideo(
    request: VoiceoverToVideoRequest,
    options?: RequestOptions,
  ): Promise<StartWorkflowRunResponse> {
    return this.client.request<StartWorkflowRunResponse>({
      method: "POST",
      path: "/v1/workflows/voiceover-to-video",
      body: request,
      signal: options?.signal,
    });
  }

  async voiceoverToVideoAndWait(
    request: VoiceoverToVideoRequest,
    options?: PollOptions,
  ): Promise<WorkflowRun> {
    const started = await this.voiceoverToVideo(request, { signal: options?.signal });
    return pollWorkflowRun({
      client: this.client,
      workflowRunId: started.workflowRunId,
      ...options,
    });
  }

  // @sdk-operation slideshowToVideo
  async slideshowToVideo(
    request: SlideshowToVideoRequest,
    options?: RequestOptions,
  ): Promise<StartWorkflowRunResponse> {
    return this.client.request<StartWorkflowRunResponse>({
      method: "POST",
      path: "/v1/workflows/slideshow-to-video",
      body: request,
      signal: options?.signal,
    });
  }

  async slideshowToVideoAndWait(
    request: SlideshowToVideoRequest,
    options?: PollOptions,
  ): Promise<WorkflowRun> {
    const started = await this.slideshowToVideo(request, { signal: options?.signal });
    return pollWorkflowRun({
      client: this.client,
      workflowRunId: started.workflowRunId,
      ...options,
    });
  }

  // @sdk-operation storyboardToVideo
  async storyboardToVideo(
    request: StoryboardToVideoRequest,
    options?: RequestOptions,
  ): Promise<StartWorkflowRunResponse> {
    return this.client.request<StartWorkflowRunResponse>({
      method: "POST",
      path: "/v1/workflows/storyboard-to-video",
      body: request,
      signal: options?.signal,
    });
  }

  async storyboardToVideoAndWait(
    request: StoryboardToVideoRequest,
    options?: PollOptions,
  ): Promise<WorkflowRun> {
    const started = await this.storyboardToVideo(request, { signal: options?.signal });
    return pollWorkflowRun({
      client: this.client,
      workflowRunId: started.workflowRunId,
      ...options,
    });
  }

  // @sdk-operation promptToVideoClip
  async promptToVideoClip(
    request: PromptToVideoClipRequest,
    options?: RequestOptions,
  ): Promise<StartWorkflowRunResponse> {
    return this.client.request<StartWorkflowRunResponse>({
      method: "POST",
      path: "/v1/workflows/prompt-to-video-clip",
      body: request,
      signal: options?.signal,
    });
  }

  async promptToVideoClipAndWait(
    request: PromptToVideoClipRequest,
    options?: PollOptions,
  ): Promise<WorkflowRun> {
    const started = await this.promptToVideoClip(request, { signal: options?.signal });
    return pollWorkflowRun({
      client: this.client,
      workflowRunId: started.workflowRunId,
      ...options,
    });
  }

  // @sdk-operation listWorkflowRuns
  async listWorkflowRuns(
    request?: ListWorkflowRunsRequest,
    options?: RequestOptions,
  ): Promise<WorkflowRunListResponse> {
    return this.client.request<WorkflowRunListResponse>({
      method: "GET",
      path: "/v1/workflows/runs",
      query: pickFields(request ?? {}, ["limit", "cursor", "selfOnly"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation getWorkflowRun
  async getWorkflowRun(
    request: WorkflowRunIdRequest,
    options?: RequestOptions,
  ): Promise<WorkflowRun> {
    return this.client.request<WorkflowRun>({
      method: "GET",
      path: fillPath("/v1/workflows/runs/{workflowRunId}", {
        workflowRunId: request.workflowRunId,
      }),
      signal: options?.signal,
    });
  }

  // @sdk-operation cancelWorkflowRun
  async cancelWorkflowRun(
    request: WorkflowRunIdRequest,
    options?: RequestOptions,
  ): Promise<StartWorkflowRunResponse> {
    return this.client.request<StartWorkflowRunResponse>({
      method: "POST",
      path: fillPath("/v1/workflows/runs/{workflowRunId}/cancel", {
        workflowRunId: request.workflowRunId,
      }),
      signal: options?.signal,
    });
  }
}
