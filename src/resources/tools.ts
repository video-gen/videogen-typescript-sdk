import type { VideoGen } from "../client.js";
import { pollExecutedTool } from "../helpers/pollExecutedTool.js";
import { fillPath, pickFields } from "../request.js";
import type {
  ExecutedTool,
  GenerateAvatarRequest,
  GenerateImageRequest,
  GenerateMotionGraphicRequest,
  GenerateMusicRequest,
  GenerateSoundEffectRequest,
  GenerateVideoClipRequest,
  ImageAssetRequest,
  PollOptions,
  RequestOptions,
  StartToolExecutionResponse,
  TextToSpeechRequest,
  ToolExecutionListResponse,
  VideoAssetRequest,
} from "../types.js";

type ListToolExecutionsRequest = {
  limit?: number;
  cursor?: string;
  selfOnly?: boolean;
};

type ToolExecutionIdRequest = {
  toolExecutionId: string;
};

export class ToolsResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation generateImage
  async generateImage(
    request: GenerateImageRequest,
    options?: RequestOptions,
  ): Promise<StartToolExecutionResponse> {
    return this.client.request<StartToolExecutionResponse>({
      method: "POST",
      path: "/v1/tools/generate-image",
      body: request,
      signal: options?.signal,
    });
  }

  async generateImageAndWait(
    request: GenerateImageRequest,
    options?: PollOptions,
  ): Promise<ExecutedTool> {
    const started = await this.generateImage(request, { signal: options?.signal });
    return pollExecutedTool({
      client: this.client,
      toolExecutionId: started.toolExecutionId,
      ...options,
    });
  }

  // @sdk-operation generateVideoClip
  async generateVideoClip(
    request: GenerateVideoClipRequest,
    options?: RequestOptions,
  ): Promise<StartToolExecutionResponse> {
    return this.client.request<StartToolExecutionResponse>({
      method: "POST",
      path: "/v1/tools/generate-video-clip",
      body: request,
      signal: options?.signal,
    });
  }

  async generateVideoClipAndWait(
    request: GenerateVideoClipRequest,
    options?: PollOptions,
  ): Promise<ExecutedTool> {
    const started = await this.generateVideoClip(request, { signal: options?.signal });
    return pollExecutedTool({
      client: this.client,
      toolExecutionId: started.toolExecutionId,
      ...options,
    });
  }

  // @sdk-operation generateMotionGraphic
  async generateMotionGraphic(
    request: GenerateMotionGraphicRequest,
    options?: RequestOptions,
  ): Promise<StartToolExecutionResponse> {
    return this.client.request<StartToolExecutionResponse>({
      method: "POST",
      path: "/v1/tools/generate-motion-graphic",
      body: request,
      signal: options?.signal,
    });
  }

  async generateMotionGraphicAndWait(
    request: GenerateMotionGraphicRequest,
    options?: PollOptions,
  ): Promise<ExecutedTool> {
    const started = await this.generateMotionGraphic(request, {
      signal: options?.signal,
    });
    return pollExecutedTool({
      client: this.client,
      toolExecutionId: started.toolExecutionId,
      ...options,
    });
  }

  // @sdk-operation textToSpeech
  async textToSpeech(
    request: TextToSpeechRequest,
    options?: RequestOptions,
  ): Promise<StartToolExecutionResponse> {
    return this.client.request<StartToolExecutionResponse>({
      method: "POST",
      path: "/v1/tools/text-to-speech",
      body: request,
      signal: options?.signal,
    });
  }

  async textToSpeechAndWait(
    request: TextToSpeechRequest,
    options?: PollOptions,
  ): Promise<ExecutedTool> {
    const started = await this.textToSpeech(request, { signal: options?.signal });
    return pollExecutedTool({
      client: this.client,
      toolExecutionId: started.toolExecutionId,
      ...options,
    });
  }

  // @sdk-operation generateSoundEffect
  async generateSoundEffect(
    request: GenerateSoundEffectRequest,
    options?: RequestOptions,
  ): Promise<StartToolExecutionResponse> {
    return this.client.request<StartToolExecutionResponse>({
      method: "POST",
      path: "/v1/tools/generate-sound-effect",
      body: request,
      signal: options?.signal,
    });
  }

  async generateSoundEffectAndWait(
    request: GenerateSoundEffectRequest,
    options?: PollOptions,
  ): Promise<ExecutedTool> {
    const started = await this.generateSoundEffect(request, {
      signal: options?.signal,
    });
    return pollExecutedTool({
      client: this.client,
      toolExecutionId: started.toolExecutionId,
      ...options,
    });
  }

  // @sdk-operation generateMusic
  async generateMusic(
    request: GenerateMusicRequest,
    options?: RequestOptions,
  ): Promise<StartToolExecutionResponse> {
    return this.client.request<StartToolExecutionResponse>({
      method: "POST",
      path: "/v1/tools/generate-music",
      body: request,
      signal: options?.signal,
    });
  }

  async generateMusicAndWait(
    request: GenerateMusicRequest,
    options?: PollOptions,
  ): Promise<ExecutedTool> {
    const started = await this.generateMusic(request, { signal: options?.signal });
    return pollExecutedTool({
      client: this.client,
      toolExecutionId: started.toolExecutionId,
      ...options,
    });
  }

  // @sdk-operation generateAvatar
  async generateAvatar(
    request: GenerateAvatarRequest,
    options?: RequestOptions,
  ): Promise<StartToolExecutionResponse> {
    return this.client.request<StartToolExecutionResponse>({
      method: "POST",
      path: "/v1/tools/generate-avatar",
      body: request,
      signal: options?.signal,
    });
  }

  async generateAvatarAndWait(
    request: GenerateAvatarRequest,
    options?: PollOptions,
  ): Promise<ExecutedTool> {
    const started = await this.generateAvatar(request, { signal: options?.signal });
    return pollExecutedTool({
      client: this.client,
      toolExecutionId: started.toolExecutionId,
      ...options,
    });
  }

  // @sdk-operation vectorizeImage
  async vectorizeImage(
    request: ImageAssetRequest,
    options?: RequestOptions,
  ): Promise<StartToolExecutionResponse> {
    return this.client.request<StartToolExecutionResponse>({
      method: "POST",
      path: "/v1/tools/vectorize-image",
      body: request,
      signal: options?.signal,
    });
  }

  async vectorizeImageAndWait(
    request: ImageAssetRequest,
    options?: PollOptions,
  ): Promise<ExecutedTool> {
    const started = await this.vectorizeImage(request, { signal: options?.signal });
    return pollExecutedTool({
      client: this.client,
      toolExecutionId: started.toolExecutionId,
      ...options,
    });
  }

  // @sdk-operation removeImageBackground
  async removeImageBackground(
    request: ImageAssetRequest,
    options?: RequestOptions,
  ): Promise<StartToolExecutionResponse> {
    return this.client.request<StartToolExecutionResponse>({
      method: "POST",
      path: "/v1/tools/remove-image-background",
      body: request,
      signal: options?.signal,
    });
  }

  async removeImageBackgroundAndWait(
    request: ImageAssetRequest,
    options?: PollOptions,
  ): Promise<ExecutedTool> {
    const started = await this.removeImageBackground(request, {
      signal: options?.signal,
    });
    return pollExecutedTool({
      client: this.client,
      toolExecutionId: started.toolExecutionId,
      ...options,
    });
  }

  // @sdk-operation removeVideoBackground
  async removeVideoBackground(
    request: VideoAssetRequest,
    options?: RequestOptions,
  ): Promise<StartToolExecutionResponse> {
    return this.client.request<StartToolExecutionResponse>({
      method: "POST",
      path: "/v1/tools/remove-video-background",
      body: request,
      signal: options?.signal,
    });
  }

  async removeVideoBackgroundAndWait(
    request: VideoAssetRequest,
    options?: PollOptions,
  ): Promise<ExecutedTool> {
    const started = await this.removeVideoBackground(request, {
      signal: options?.signal,
    });
    return pollExecutedTool({
      client: this.client,
      toolExecutionId: started.toolExecutionId,
      ...options,
    });
  }

  // @sdk-operation upscaleImage
  async upscaleImage(
    request: ImageAssetRequest,
    options?: RequestOptions,
  ): Promise<StartToolExecutionResponse> {
    return this.client.request<StartToolExecutionResponse>({
      method: "POST",
      path: "/v1/tools/upscale-image",
      body: request,
      signal: options?.signal,
    });
  }

  async upscaleImageAndWait(
    request: ImageAssetRequest,
    options?: PollOptions,
  ): Promise<ExecutedTool> {
    const started = await this.upscaleImage(request, { signal: options?.signal });
    return pollExecutedTool({
      client: this.client,
      toolExecutionId: started.toolExecutionId,
      ...options,
    });
  }

  // @sdk-operation upscaleVideo
  async upscaleVideo(
    request: VideoAssetRequest,
    options?: RequestOptions,
  ): Promise<StartToolExecutionResponse> {
    return this.client.request<StartToolExecutionResponse>({
      method: "POST",
      path: "/v1/tools/upscale-video",
      body: request,
      signal: options?.signal,
    });
  }

  async upscaleVideoAndWait(
    request: VideoAssetRequest,
    options?: PollOptions,
  ): Promise<ExecutedTool> {
    const started = await this.upscaleVideo(request, { signal: options?.signal });
    return pollExecutedTool({
      client: this.client,
      toolExecutionId: started.toolExecutionId,
      ...options,
    });
  }

  // @sdk-operation image3dEffect
  async image3dEffect(
    request: ImageAssetRequest,
    options?: RequestOptions,
  ): Promise<StartToolExecutionResponse> {
    return this.client.request<StartToolExecutionResponse>({
      method: "POST",
      path: "/v1/tools/image-3d-effect",
      body: request,
      signal: options?.signal,
    });
  }

  async image3dEffectAndWait(
    request: ImageAssetRequest,
    options?: PollOptions,
  ): Promise<ExecutedTool> {
    const started = await this.image3dEffect(request, { signal: options?.signal });
    return pollExecutedTool({
      client: this.client,
      toolExecutionId: started.toolExecutionId,
      ...options,
    });
  }

  // @sdk-operation listToolExecutions
  async listToolExecutions(
    request?: ListToolExecutionsRequest,
    options?: RequestOptions,
  ): Promise<ToolExecutionListResponse> {
    return this.client.request<ToolExecutionListResponse>({
      method: "GET",
      path: "/v1/tools/executions",
      query: pickFields(request ?? {}, ["limit", "cursor", "selfOnly"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation getToolExecutionInfo
  async getToolExecutionInfo(
    request: ToolExecutionIdRequest,
    options?: RequestOptions,
  ): Promise<ExecutedTool> {
    return this.client.request<ExecutedTool>({
      method: "GET",
      path: fillPath("/v1/tools/executions/{toolExecutionId}", {
        toolExecutionId: request.toolExecutionId,
      }),
      signal: options?.signal,
    });
  }

  // @sdk-operation cancelToolExecution
  async cancelToolExecution(
    request: ToolExecutionIdRequest,
    options?: RequestOptions,
  ): Promise<StartToolExecutionResponse> {
    return this.client.request<StartToolExecutionResponse>({
      method: "POST",
      path: fillPath("/v1/tools/executions/{toolExecutionId}/cancel", {
        toolExecutionId: request.toolExecutionId,
      }),
      signal: options?.signal,
    });
  }
}
