# Reference
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
    prompt: "A serene Japanese garden with cherry blossoms at golden hour"
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

Generate a video clip from a text prompt, optionally guided by reference images or an input video. At least one of `prompt`, `imageFileIds`, or `videoFileId` must be provided.
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
await client.tools.generateVideoClip();

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
<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">getFiles</a>() -> VideoGenApi.GetFilesResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List all files in your account, including generated assets and uploads.
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

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">enablePublicPreview</a>({ ...params }) -> VideoGenApi.StorageFile</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Enable public preview for a file. Creates a public playback ID on the underlying Mux asset so the file can be streamed without authentication. Returns the updated file with `isPublicPreviewEnabled`, `publicHlsUrl`, and `publicPlaybackId` populated. Only works for video and audio files.
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

Disable public preview for a file. Deletes the public playback ID from the underlying Mux asset. The file's signed URLs remain functional. Returns the updated file.
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

## Resources
<details><summary><code>client.resources.<a href="/src/api/resources/resources/client/Client.ts">listAvatarPresenters</a>() -> VideoGenApi.AvatarPresenterListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List all available avatar presenters. Pass an `avatarPresenterId` from the response to the avatar video endpoint.
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

List all available text-to-speech voices. Pass a `voiceId` from the response to the text-to-speech endpoint.
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
<details><summary><code>client.webhooks.<a href="/src/api/resources/webhooks/client/Client.ts">listWebhookEndpoints</a>() -> VideoGenApi.WebhookEndpointListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List all configured webhook endpoints for your account.
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

