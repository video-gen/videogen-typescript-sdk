# Reference
## Workflows
<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">scriptToVideo</a>({ ...params }) -> VideoGenApi.StartWorkflowRunResponse</code></summary>
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
await client.workflows.scriptToVideo({
    script: "Staying hydrated keeps your body and mind running at their best. Drinking enough water boosts your energy, focus, and mood. Keep a water bottle nearby and sip throughout the day.",
    visualStyle: {
        type: "AI_IMAGE",
        aiStyle: "loose watercolor illustration with visible brushstrokes and soft color bleeds"
    },
    visualPacing: "MEDIUM",
    quality: "HIGH",
    remixActions: [{
            type: "ENABLE_CAPTIONS"
        }, {
            type: "CONVERT_IMAGES_TO_VIDEOS",
            motionPrompt: "slow cinematic push-in",
            muteOutputVideos: true,
            quality: "HIGH"
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

**request:** `VideoGenApi.ScriptToVideoRequest` 
    
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

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">addVisualsNarrationsAndCaptionsToScript</a>({ ...params }) -> VideoGenApi.StartWorkflowRunResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Legacy alias for `POST /v1/workflows/script-to-video`. Use that endpoint instead.
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

**request:** `VideoGenApi.ScriptToVideoRequest` 
    
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

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">voiceoverToVideo</a>({ ...params }) -> VideoGenApi.StartWorkflowRunResponse</code></summary>
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
await client.workflows.voiceoverToVideo({
    fileId: "vg_file_obLD1OX2eJCrEs0071Z4kA",
    visualStyle: {
        type: "AI_IMAGE",
        aiStyle: "warm cinematic photography with soft natural lighting and shallow depth of field"
    },
    quality: "HIGH",
    remixActions: [{
            type: "CONVERT_IMAGES_TO_VIDEOS",
            motionPrompt: "gentle parallax drift",
            muteOutputVideos: true,
            quality: "HIGH"
        }, {
            type: "EDIT_WITH_AGENT",
            prompt: "Replace the closing title card with \"Book a demo today\""
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

**request:** `VideoGenApi.VoiceoverToVideoRequest` 
    
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

Legacy alias for `POST /v1/workflows/voiceover-to-video`. Use that endpoint instead.
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

**request:** `VideoGenApi.VoiceoverToVideoRequest` 
    
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

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">slideshowToVideo</a>({ ...params }) -> VideoGenApi.StartWorkflowRunResponse</code></summary>
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
await client.workflows.slideshowToVideo({
    fileId: "vg_file_obLD1OX2eJCrEs0071Z4kA",
    remixActions: [{
            type: "ADD_TRANSITIONS",
            sectionTransition: "DYNAMIC",
            assetTransition: "FADE"
        }, {
            type: "CONVERT_IMAGES_TO_VIDEOS",
            motionPrompt: "subtle zoom with soft easing",
            muteOutputVideos: true,
            quality: "HIGH"
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

**request:** `VideoGenApi.SlideshowToVideoRequest` 
    
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

Legacy alias for `POST /v1/workflows/slideshow-to-video`. Use that endpoint instead.
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

**request:** `VideoGenApi.SlideshowToVideoRequest` 
    
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

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">storyboardToVideo</a>({ ...params }) -> VideoGenApi.StartWorkflowRunResponse</code></summary>
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
await client.workflows.storyboardToVideo({
    defaultGeneration: {
        type: "AI_IMAGE",
        aiStyle: "loose watercolor illustration with visible brushstrokes and soft color bleeds"
    },
    defaultDurationSeconds: 5,
    scenes: [{
            prompt: "A sunrise over a calm mountain lake, mist on the water."
        }, {
            prompt: "A hiker reaching the summit, arms raised in triumph.",
            generation: {
                type: "AI_VIDEO",
                aiStyle: "cinematic film look with dramatic lighting and shallow depth of field"
            },
            durationSeconds: 6
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

**request:** `VideoGenApi.StoryboardToVideoRequest` 
    
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

Legacy alias for `POST /v1/workflows/storyboard-to-video`. Use that endpoint instead.
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

**request:** `VideoGenApi.StoryboardToVideoRequest` 
    
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

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">listWorkflowRuns</a>({ ...params }) -> VideoGenApi.WorkflowRunListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List workflow runs started via the API, most recently created first. Use `selfOnly=true` to restrict results to the calling API key's user; otherwise all runs for the team are returned. Cursor-paginated; see the [Pagination](/pagination) guide.
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
await client.workflows.listWorkflowRuns();

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

**request:** `VideoGenApi.ListWorkflowRunsRequest` 
    
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
    workflowRunId: "vg_work_ccm3abc123defcm3xyz789ghi"
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

Returns projects, most recently updated first. By default only API-created projects are included; pass `includeUiProjects=true` to also include dashboard-created projects. Use `selfOnly=true` to restrict results to the calling API key's user; otherwise all matching projects for the team are returned. Cursor-paginated; see the [Pagination](/pagination) guide.
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
    projectId: "vg_proj_9dTk3mQ1rZ7xP4vN2sB6wc"
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
    projectId: "vg_proj_9dTk3mQ1rZ7xP4vN2sB6wc",
    quality: "FULL_HIGH"
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
    projectId: "vg_proj_9dTk3mQ1rZ7xP4vN2sB6wc",
    exportId: "vg_expo_4bHn8pR2sY5xM1vL3tC7wd"
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

Generate an image from a text prompt, optionally guided by one or more reference images. When reference images are provided, the prompt describes the desired transformation. VideoGen automatically routes each request to the most effective state-of-the-art image model for your prompt, reference images, and quality tier, so you don't pick a model.
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
    prompt: "A serene mountain landscape at sunrise with vibrant colors and mist",
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

Generate a single short video clip (up to 15 seconds) from a text prompt, optionally guided by reference images, videos, and audio. At least one of `prompt`, `imageFileIds`, `videoFileIds`, or `audioFileIds` must be provided. VideoGen automatically routes each request to the most effective state-of-the-art video model for your inputs and settings, so you don't pick a model. This endpoint returns one standalone clip. For longer, higher-quality, professionally edited videos with narration, captions, music, and multiple scenes, use a video workflow such as [Script to video](/workflows) (`POST /v1/workflows/script-to-video`) instead.
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
    prompt: "A serene mountain landscape at sunrise with a flowing river and birds flying",
    quality: "STANDARD",
    generateAudio: true,
    durationSeconds: 6
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
    ttsText: "Welcome to VideoGen, your AI-powered video creation assistant.",
    voiceId: "vg_voic_7t1wdka3tmk"
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

Generate a sound effect from a text description. Optionally control the duration and prompt influence. VideoGen automatically routes each request to the most effective state-of-the-art sound effect model for your prompt and settings, so you don't pick a model.
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
    prompt: "Create a short, high-quality thunderclap sound effect with a deep rumble and sharp crack"
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

Generate an instrumental music track from a text description. The returned track is approximately 30 seconds long. VideoGen automatically routes each request to the most effective state-of-the-art music model for your prompt, so you don't pick a model.
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
    prompt: "Calm ambient piano with soft pads for a product demo intro"
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
    avatarPresenterId: "vg_pres_a1ua8slxzfi",
    audioStorageFileId: "vg_file_obLD1OX2eJCrEs0071Z4kA"
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
    imageStorageFileId: "vg_file_obLD1OX2eJCrEs0071Z4kA"
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
    imageStorageFileId: "vg_file_obLD1OX2eJCrEs0071Z4kA"
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
    videoStorageFileId: "vg_file_jzosm31OGi-bPE1eb3qLnA"
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
    imageStorageFileId: "vg_file_obLD1OX2eJCrEs0071Z4kA"
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
    videoStorageFileId: "vg_file_jzosm31OGi-bPE1eb3qLnA"
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
    imageStorageFileId: "vg_file_obLD1OX2eJCrEs0071Z4kA"
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
    toolExecutionId: "vg_tool_ccm3abc123defcm3xyz789ghi"
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

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">listToolExecutions</a>({ ...params }) -> VideoGenApi.ToolExecutionListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List tool executions started via the API, most recently created first. Use `selfOnly=true` to restrict results to the calling API key's user; otherwise all executions for the team are returned. Cursor-paginated; see the [Pagination](/pagination) guide.
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
await client.tools.listToolExecutions();

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

**request:** `VideoGenApi.ListToolExecutionsRequest` 
    
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
    toolExecutionId: "vg_tool_ccm3abc123defcm3xyz789ghi"
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

List files in your account, including generated assets and uploads. Files are returned most recently updated first. Cursor-paginated; see the [Pagination](/pagination) guide.
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
    query: "sunset over mountains"
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
    fileId: "vg_file_obLD1OX2eJCrEs0071Z4kA"
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
    type: "VIDEO",
    displayName: "My Campaign Video"
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
    fileId: "vg_file_obLD1OX2eJCrEs0071Z4kA"
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
    fileId: "vg_file_obLD1OX2eJCrEs0071Z4kA"
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
    fileId: "vg_file_obLD1OX2eJCrEs0071Z4kA"
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

List the actors and visual styles available to your team, most recently updated first. Cursor-paginated; see the [Pagination](/pagination) guide.
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
    entityType: "VISUAL_STYLE",
    name: "Pastel watercolor",
    description: "Soft pastel watercolor look for lifestyle clips."
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
    entityId: "vg_enti_a1b2c3d4e5f6"
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
    entityId: "vg_enti_a1b2c3d4e5f6",
    name: "Maya the presenter",
    description: "Friendly on-camera host for product explainers and demos."
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
    entityId: "vg_enti_a1b2c3d4e5f6"
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
    entityId: "vg_enti_a1b2c3d4e5f6",
    fileId: "vg_file_mot8bV5POiscDeHyo7TF1g",
    description: "Side profile, studio lighting.",
    isDefault: false
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
    entityId: "vg_enti_a1b2c3d4e5f6",
    fileId: "vg_file_mot8bV5POiscDeHyo7TF1g"
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

## Assistant
<details><summary><code>client.assistant.<a href="/src/api/resources/assistant/client/Client.ts">startAssistantChat</a>({ ...params }) -> VideoGenApi.AssistantTurnResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a new project and sends the first message to the VideoGen AI assistant, exactly like typing into the assistant on a new project in the app. Synchronous: the response includes the assistant's reply, any workflow suggestions it offered, and a `projectUrl` to open the project in the app. Continue the conversation with `POST /v1/assistant/chats/{projectId}/messages`.
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
await client.assistant.startAssistantChat({
    message: "A 30-second explainer about our new pricing tiers"
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

**request:** `VideoGenApi.StartAssistantChatRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AssistantClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assistant.<a href="/src/api/resources/assistant/client/Client.ts">sendAssistantMessage</a>({ ...params }) -> VideoGenApi.AssistantTurnResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Sends a follow-up message to the assistant in an existing project chat started with `POST /v1/assistant/chats`. Synchronous: the response includes the assistant's reply and any actions it offered.
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
await client.assistant.sendAssistantMessage({
    projectId: "projectId",
    message: "Make it more upbeat and add captions"
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

**request:** `VideoGenApi.SendAssistantMessageRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AssistantClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assistant.<a href="/src/api/resources/assistant/client/Client.ts">actOnAssistantAction</a>({ ...params }) -> VideoGenApi.AssistantTurnResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Acts on an actionable widget the assistant offered on a prior turn. Reference the action by its `assistantActionId` from a prior `AssistantTurnResponse`. Today this accepts a workflow suggestion: `APPROVE` (the default) applies the suggested workflow and immediately starts generating — the response's `status` is `generating` and `generation` carries the run to poll — while `REJECT` returns the offering turn unchanged. Every other action has `requiresApp` set to true and can only be completed in the web app; open `projectUrl` instead.
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
await client.assistant.actOnAssistantAction({
    projectId: "projectId",
    assistantActionId: "assistantActionId"
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

**request:** `VideoGenApi.ActOnAssistantActionRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AssistantClient.RequestOptions` 
    
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

Generate text from a prompt using a general-purpose language model. Choose a quality tier with `quality` (`LOW`, `STANDARD`, `HIGH`, or `MAX`). Synchronous: the response includes the generated text. Useful for drafting scripts, titles, descriptions, and other short copy before generating a video.
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
    prompt: "Write a concise title for a video about staying hydrated.",
    quality: "STANDARD",
    maxOutputTokens: 32
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

List available avatar presenters. Pass an `avatarPresenterId` from the response to the avatar video endpoint or to a script/slideshow workflow. Pass a reference `voiceId` to return presenters sorted by best match for that voice. Cursor-paginated; see the [Pagination](/pagination) guide.
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

List available text-to-speech voices. Pass a `voiceId` from the response to the text-to-speech endpoint. Cursor-paginated; see the [Pagination](/pagination) guide.
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

<details><summary><code>client.resources.<a href="/src/api/resources/resources/client/Client.ts">listLanguages</a>() -> VideoGenApi.LanguageListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List the languages a project can be translated into. Pass a `languageCode` from the response to the `TRANSLATE_PROJECT` remix action. Returns the full catalogue in a single response (not paginated).
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
await client.resources.listLanguages();

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

List configured webhook endpoints for your account. Cursor-paginated; see the [Pagination](/pagination) guide.
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

Register a new webhook endpoint to receive `tool_execution.*`, `workflow_run.*`, and `file.*` events. The signing secret is only returned in this response. Store it securely.
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
    url: "https://webhooks.myapp.com/videogen",
    events: ["tool_execution.succeeded", "tool_execution.failed"]
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
    endpointId: "ep_28KVX7vT9mQ2sL4nR6pB1cD0fG"
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

## Account
<details><summary><code>client.account.<a href="/src/api/resources/account/client/Client.ts">getMe</a>() -> VideoGenApi.MeResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Return the account and team behind the API key making the request. Takes no parameters. Call it as a connection test to confirm a key is valid and to discover the `teamId` and account `email` a key belongs to.
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
await client.account.getMe();

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

**requestOptions:** `AccountClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

