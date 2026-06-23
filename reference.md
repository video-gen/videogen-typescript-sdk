# Reference
## Workflows
<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">addVisualsNarrationsAndCaptionsToScript</a>({ ...params }) -> VideoGenApi.StartWorkflowRunResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a project and generates a narrated video from a prompt or script. Returns immediately with a workflow run id; poll or subscribe to webhooks for completion.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.workflows.addVisualsNarrationsAndCaptionsToScript({
    script: "script",
    visualStyle: {
        type: "STOCK"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.AddVisualsNarrationsAndCaptionsToScriptRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `WorkflowsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">addVisualsAndCaptionsToVoiceover</a>({ ...params }) -> VideoGenApi.StartWorkflowRunResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a project from an uploaded voiceover file and generates a video with matching b-roll. Upload the voiceover via the files API first.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.workflows.addVisualsAndCaptionsToVoiceover({
    fileId: "fileId",
    visualStyle: {
        type: "STOCK"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.AddVisualsAndCaptionsToVoiceoverRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `WorkflowsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">addNarrationTransitionsAndCaptionsToSlideshow</a>({ ...params }) -> VideoGenApi.StartWorkflowRunResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a project from an uploaded PDF or PowerPoint file and generates an AI-narrated video walking through each slide. Upload the file via `POST /v1/files/upload` first.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.workflows.addNarrationTransitionsAndCaptionsToSlideshow({
    fileId: "fileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.AddNarrationTransitionsAndCaptionsToSlideshowRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `WorkflowsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">generateScenesFromStoryboard</a>({ ...params }) -> VideoGenApi.StartWorkflowRunResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a project from an ordered list of scenes and generates one section per scene. Each scene is generated from its prompt as either a still image or a video clip; the scenes are then assembled into a single video. Returns immediately with a workflow run id; poll or subscribe to webhooks for completion.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.workflows.generateScenesFromStoryboard({
    scenes: [{
            prompt: "prompt"
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.GenerateScenesFromStoryboardRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `WorkflowsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">getWorkflowRun</a>({ ...params }) -> VideoGenApi.WorkflowRun</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.workflows.getWorkflowRun({
    workflowRunId: "workflowRunId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.GetWorkflowRunRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `WorkflowsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">cancelWorkflowRun</a>({ ...params }) -> VideoGenApi.StartWorkflowRunResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.workflows.cancelWorkflowRun({
    workflowRunId: "workflowRunId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.CancelWorkflowRunRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `WorkflowsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Projects
<details><summary><code>client.projects.<a href="/src/api/resources/projects/client/Client.ts">listProjects</a>({ ...params }) -> VideoGenApi.ListProjectsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns API-created projects, most recently updated first. Dashboard projects are excluded. Use `selfOnly=true` to restrict results to the calling API key's user; otherwise all API-created projects for the team are returned. Paginated; pass `nextCursor` from the previous response as `cursor` to fetch the next page.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projects.listProjects();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.ListProjectsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProjectsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.projects.<a href="/src/api/resources/projects/client/Client.ts">getProject</a>({ ...params }) -> VideoGenApi.ProjectResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns a simplified view of a project including its title, aspect ratio, status, and URL.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projects.getProject({
    projectId: "projectId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.GetProjectRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProjectsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.projects.<a href="/src/api/resources/projects/client/Client.ts">exportProject</a>({ ...params }) -> VideoGenApi.ExportProjectResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Starts an export of a project to MP4. Returns immediately with an export id; the file becomes available when the export task completes.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projects.exportProject({
    projectId: "projectId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.ExportProjectRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProjectsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.projects.<a href="/src/api/resources/projects/client/Client.ts">getProjectExport</a>({ ...params }) -> VideoGenApi.ProjectExport</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns the current status of a project export started via `POST /v1/projects/{projectId}/export`.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projects.getProjectExport({
    projectId: "projectId",
    exportId: "exportId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.GetProjectExportRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProjectsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.projects.<a href="/src/api/resources/projects/client/Client.ts">remixProject</a>({ ...params }) -> VideoGenApi.RemixProjectResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Applies an ordered list of edits (background music, logo overlay, caption visibility/style) to a project. Each action runs asynchronously as its own remix action; the response returns one remix action id per action in order. Set `saveAsNewProject` to apply the edits to a copy and leave the original untouched. Poll `GET /v1/projects/{projectId}/remix-actions` for status.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projects.remixProject({
    projectId: "projectId",
    remixActions: [{
            type: "SET_BACKGROUND_MUSIC"
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.RemixProjectRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProjectsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.projects.<a href="/src/api/resources/projects/client/Client.ts">listProjectRemixActions</a>({ ...params }) -> VideoGenApi.ListRemixActionsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns every remix action applied to a project (via `POST /v1/projects/{projectId}/remix` or as a post-workflow step), most recent first, with each action's status and progress.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projects.listProjectRemixActions({
    projectId: "projectId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.ListProjectRemixActionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProjectsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Tools
<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">generateImage</a>({ ...params }) -> VideoGenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Generate an image from a text prompt, optionally guided by one or more reference images. When reference images are provided, the prompt describes the desired transformation.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.generateImage({
    prompt: "A serene Japanese garden with cherry blossoms at golden hour",
    quality: "LOW"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.GenerateImageRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ToolsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">generateVideoClip</a>({ ...params }) -> VideoGenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Generate a video clip from a text prompt, optionally guided by reference images, videos, and audio. At least one of `prompt`, `imageFileIds`, `videoFileIds`, or `audioFileIds` must be provided.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.generateVideoClip({
    quality: "STANDARD"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.GenerateVideoClipRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ToolsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">textToSpeech</a>({ ...params }) -> VideoGenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Convert text into a spoken audio file. Only voices with `supportsDirectToolExecution` set to true can be used. Optionally choose a voice, language, speed, and pronunciation overrides.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.textToSpeech({
    ttsText: "ttsText"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.TextToSpeechRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ToolsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">generateSoundEffect</a>({ ...params }) -> VideoGenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Generate a sound effect from a text description. Optionally control the duration and prompt influence.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.generateSoundEffect({
    prompt: "prompt"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.GenerateSoundEffectRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ToolsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">generateMusic</a>({ ...params }) -> VideoGenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Generate an instrumental music track from a text description. The returned track is approximately 30 seconds long.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.generateMusic({
    prompt: "prompt"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.GenerateMusicRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ToolsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">generateAvatar</a>({ ...params }) -> VideoGenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Generate a talking-head avatar video by pairing a presenter with an audio file, typically from a prior text-to-speech result.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.generateAvatar({
    avatarPresenterId: "avatarPresenterId",
    audioStorageFileId: "audioStorageFileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.GenerateAvatarRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ToolsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">vectorizeImage</a>({ ...params }) -> VideoGenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Convert any raster image into a scalable vector graphic (SVG). The output traces the shapes and colors of the input image.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.vectorizeImage({
    imageStorageFileId: "imageStorageFileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.ImageAssetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ToolsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">removeImageBackground</a>({ ...params }) -> VideoGenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove the background from an image, returning a transparent-background PNG of the foreground subject.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.removeImageBackground({
    imageStorageFileId: "imageStorageFileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.ImageAssetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ToolsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">removeVideoBackground</a>({ ...params }) -> VideoGenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove the background from a video, producing a transparent-background video of the foreground subject.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.removeVideoBackground({
    videoStorageFileId: "videoStorageFileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.VideoAssetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ToolsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">upscaleImage</a>({ ...params }) -> VideoGenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Increase the resolution of an image while preserving detail and sharpness.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.upscaleImage({
    imageStorageFileId: "imageStorageFileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.ImageAssetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ToolsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">upscaleVideo</a>({ ...params }) -> VideoGenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Increase the resolution of a video while preserving detail and sharpness.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.upscaleVideo({
    videoStorageFileId: "videoStorageFileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.VideoAssetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ToolsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">image3DEffect</a>({ ...params }) -> VideoGenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Turn a still image into a short video clip with a 3D parallax motion effect, simulating camera movement through the scene.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.image3DEffect({
    imageStorageFileId: "imageStorageFileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.ImageAssetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ToolsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">cancelToolExecution</a>({ ...params }) -> VideoGenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Request cancellation of a running tool execution. The execution transitions to `cancelled` if it has not already completed.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.cancelToolExecution({
    toolExecutionId: "toolExecutionId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.CancelToolExecutionRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ToolsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">getToolExecutionInfo</a>({ ...params }) -> VideoGenApi.ExecutedTool</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the current status and result of a tool execution. Poll this endpoint until `status` is `succeeded`, `failed`, or `cancelled`.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.getToolExecutionInfo({
    toolExecutionId: "toolExecutionId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.GetToolExecutionInfoRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ToolsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Files
<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">getFiles</a>({ ...params }) -> VideoGenApi.GetFilesResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List files in your account, including generated assets and uploads. Files are returned most recently updated first. Paginated; pass `nextCursor` from the previous response as `cursor` to fetch the next page.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.getFiles();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.GetFilesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FilesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">searchFiles</a>({ ...params }) -> VideoGenApi.SearchFilesResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Semantic vector search over your files. Embeds the query text and returns the closest matching files ranked by cosine similarity. Only files with indexed descriptions are searchable.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.searchFiles({
    query: "query"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.SearchFilesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FilesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">getFile</a>({ ...params }) -> VideoGenApi.StorageFile</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve metadata for a single file by its id.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.getFile({
    fileId: "fileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.GetFileRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FilesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">createFileUpload</a>({ ...params }) -> VideoGenApi.FileUploadResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new file and receive a pre-signed upload URL. PUT the file bytes to the returned URL, then poll `GET /v1/files/{fileId}` until the file is ready.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.createFileUpload({
    displayName: "displayName"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.CreateFileUploadRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FilesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">hydrateFile</a>({ ...params }) -> VideoGenApi.StorageFile</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Generate fresh signed URLs for all available renditions of a file. Call this when source URLs are missing or expired. Returns the full file object with populated `thumbnailSource`, `previewSource`, and `downloadSource`.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.hydrateFile({
    fileId: "fileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.HydrateFileRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FilesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">archiveFile</a>({ ...params }) -> VideoGenApi.StorageFile</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Archive a file by setting its archived timestamp. Archived files are excluded from list results. Returns the updated file object.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.archiveFile({
    fileId: "fileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.ArchiveFileRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FilesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">enablePublicPreview</a>({ ...params }) -> VideoGenApi.StorageFile</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Enable public preview for a file. Works for any file type. Copies the file to a permanent public URL (`staticPublicPreviewSource`) and, for video and audio, registers a public embed playback id (`publicPlaybackId`) for use with `@videogen/player`. If streaming playback is still processing, the endpoint polls briefly and background processing finishes creating the embed playback id. Returns the updated file.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.enablePublicPreview({
    fileId: "fileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.EnablePublicPreviewRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FilesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">disablePublicPreview</a>({ ...params }) -> VideoGenApi.StorageFile</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Disable public preview for a file. Removes the permanent public URL copy and revokes unauthenticated embed streaming access. Authenticated signed URLs remain functional. Returns the updated file.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.disablePublicPreview({
    fileId: "fileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.DisablePublicPreviewRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FilesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Entities
<details><summary><code>client.entities.<a href="/src/api/resources/entities/client/Client.ts">listEntities</a>({ ...params }) -> VideoGenApi.ListEntitiesResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List the actors and visual styles available to your team, most recently updated first. Paginated; pass `nextCursor` from the previous response as `cursor` to fetch the next page.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.entities.listEntities();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.ListEntitiesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EntitiesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.entities.<a href="/src/api/resources/entities/client/Client.ts">createEntity</a>({ ...params }) -> VideoGenApi.Entity</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new actor or visual style. Attach reference images with `POST /v1/entities/{entityId}/references`.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.entities.createEntity({
    entityType: "ACTOR",
    name: "name"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.CreateEntityRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EntitiesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.entities.<a href="/src/api/resources/entities/client/Client.ts">getEntity</a>({ ...params }) -> VideoGenApi.Entity</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a single entity by its id, including its reference images.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.entities.getEntity({
    entityId: "entityId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.GetEntityRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EntitiesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.entities.<a href="/src/api/resources/entities/client/Client.ts">updateEntity</a>({ ...params }) -> VideoGenApi.Entity</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update an entity's name or description. Provide at least one field.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.entities.updateEntity({
    entityId: "entityId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.UpdateEntityRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EntitiesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.entities.<a href="/src/api/resources/entities/client/Client.ts">archiveEntity</a>({ ...params }) -> VideoGenApi.EntityArchiveResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Archive an entity. Archived entities no longer appear in `GET /v1/entities` and can't be attached to new workflows.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.entities.archiveEntity({
    entityId: "entityId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.ArchiveEntityRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EntitiesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.entities.<a href="/src/api/resources/entities/client/Client.ts">addEntityReference</a>({ ...params }) -> VideoGenApi.Entity</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Attach an image file as a reference for the entity. Upload the image first via `POST /v1/files/upload`. Returns the updated entity.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.entities.addEntityReference({
    entityId: "entityId",
    fileId: "fileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.AddEntityReferenceRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EntitiesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.entities.<a href="/src/api/resources/entities/client/Client.ts">removeEntityReference</a>({ ...params }) -> VideoGenApi.Entity</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Detach a reference image from the entity. Returns the updated entity.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.entities.removeEntityReference({
    entityId: "entityId",
    fileId: "fileId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.RemoveEntityReferenceRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EntitiesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Text
<details><summary><code>client.text.<a href="/src/api/resources/text/client/Client.ts">generateText</a>({ ...params }) -> VideoGenApi.GenerateTextResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Generate text from a prompt using a general-purpose language model. Choose a quality tier with `model` (`LOW`, `STANDARD`, or `HIGH`). Synchronous — the response includes the generated text. Useful for drafting scripts, titles, descriptions, and other short copy before generating a video.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.text.generateText({
    prompt: "Write a 30-second upbeat video script about why the sky is blue."
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.GenerateTextRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TextClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Resources
<details><summary><code>client.resources.<a href="/src/api/resources/resources/client/Client.ts">listAvatarPresenters</a>({ ...params }) -> VideoGenApi.AvatarPresenterListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List available avatar presenters. Pass an `avatarPresenterId` from the response to the avatar video endpoint or to a script/slideshow workflow. Pass a reference `voiceId` to return presenters sorted by best match for that voice. Paginated; pass `nextCursor` from the previous response as `cursor` to fetch the next page.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.resources.listAvatarPresenters();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.ListAvatarPresentersRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ResourcesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.resources.<a href="/src/api/resources/resources/client/Client.ts">listTtsVoices</a>({ ...params }) -> VideoGenApi.TtsVoiceListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List available text-to-speech voices. Pass a `voiceId` from the response to the text-to-speech endpoint. Paginated; pass `nextCursor` from the previous response as `cursor` to fetch the next page.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.resources.listTtsVoices();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.ListTtsVoicesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ResourcesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Webhooks
<details><summary><code>client.webhooks.<a href="/src/api/resources/webhooks/client/Client.ts">listWebhookEndpoints</a>({ ...params }) -> VideoGenApi.WebhookEndpointListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List configured webhook endpoints for your account. Paginated; pass `nextCursor` from the previous response as `cursor` to fetch the next page.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.webhooks.listWebhookEndpoints();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.ListWebhookEndpointsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `WebhooksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.webhooks.<a href="/src/api/resources/webhooks/client/Client.ts">createWebhookEndpoint</a>({ ...params }) -> VideoGenApi.WebhookEndpoint</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Register a new webhook endpoint to receive `tool_execution.*` and `file.*` events. The signing secret is only returned in this response. Store it securely.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.webhooks.createWebhookEndpoint({
    url: "url",
    events: ["tool_execution.succeeded"]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.CreateWebhookEndpointRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `WebhooksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.webhooks.<a href="/src/api/resources/webhooks/client/Client.ts">deleteWebhookEndpoint</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove a webhook endpoint. It will stop receiving events immediately.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.webhooks.deleteWebhookEndpoint({
    endpointId: "endpointId"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `VideoGenApi.DeleteWebhookEndpointRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `WebhooksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

