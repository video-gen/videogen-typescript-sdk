# Reference
## Files
<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">getFiles</a>() -> VideogenApi.GetFilesResponse</code></summary>
<dl>
<dd>

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

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">getFile</a>({ ...params }) -> VideogenApi.StorageFile</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.getFile({
    storageFileId: "storageFileId"
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

**request:** `VideogenApi.GetFileRequest` 
    
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

## Webhooks
<details><summary><code>client.webhooks.<a href="/src/api/resources/webhooks/client/Client.ts">listWebhookEndpoints</a>() -> VideogenApi.WebhookEndpointListResponse</code></summary>
<dl>
<dd>

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

<details><summary><code>client.webhooks.<a href="/src/api/resources/webhooks/client/Client.ts">createWebhookEndpoint</a>({ ...params }) -> VideogenApi.WebhookEndpoint</code></summary>
<dl>
<dd>

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

**request:** `VideogenApi.CreateWebhookEndpointRequest` 
    
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

**request:** `VideogenApi.DeleteWebhookEndpointRequest` 
    
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

## Resources
<details><summary><code>client.resources.<a href="/src/api/resources/resources/client/Client.ts">listAvatarPresenters</a>() -> VideogenApi.AvatarPresenterListResponse</code></summary>
<dl>
<dd>

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

<details><summary><code>client.resources.<a href="/src/api/resources/resources/client/Client.ts">listTtsVoices</a>() -> VideogenApi.TtsVoiceListResponse</code></summary>
<dl>
<dd>

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

**requestOptions:** `ResourcesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Tools
<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">generateImage</a>({ ...params }) -> VideogenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.generateImage({
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

**request:** `VideogenApi.GenerateImageRequest` 
    
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

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">generateVideoClip</a>({ ...params }) -> VideogenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.generateVideoClip({
    prompt: "prompt",
    generateAudio: true
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

**request:** `VideogenApi.GenerateVideoClipRequest` 
    
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

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">generateVideoFromImage</a>({ ...params }) -> VideogenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.generateVideoFromImage({
    prompt: "prompt",
    generateAudio: true,
    image: {
        storageFileId: "storageFileId",
        type: "IMAGE"
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

**request:** `VideogenApi.GenerateVideoFromImageRequest` 
    
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

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">generateTts</a>({ ...params }) -> VideogenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.generateTts({
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

**request:** `VideogenApi.GenerateTtsRequest` 
    
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

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">generateSoundEffect</a>({ ...params }) -> VideogenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

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

**request:** `VideogenApi.GenerateSoundEffectRequest` 
    
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

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">generateAvatar</a>({ ...params }) -> VideogenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.generateAvatar({
    avatarPresenterId: "avatarPresenterId",
    audio: {
        storageFileId: "storageFileId",
        type: "IMAGE"
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

**request:** `VideogenApi.GenerateAvatarRequest` 
    
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

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">vectorizeImage</a>({ ...params }) -> VideogenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.vectorizeImage({
    image: {
        storageFileId: "storageFileId",
        type: "IMAGE"
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

**request:** `VideogenApi.ImageAssetRequest` 
    
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

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">removeImageBackground</a>({ ...params }) -> VideogenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.removeImageBackground({
    image: {
        storageFileId: "storageFileId",
        type: "IMAGE"
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

**request:** `VideogenApi.ImageAssetRequest` 
    
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

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">removeVideoBackground</a>({ ...params }) -> VideogenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.removeVideoBackground({
    video: {
        storageFileId: "storageFileId",
        type: "IMAGE"
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

**request:** `VideogenApi.VideoAssetRequest` 
    
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

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">upscaleImage</a>({ ...params }) -> VideogenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.upscaleImage({
    image: {
        storageFileId: "storageFileId",
        type: "IMAGE"
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

**request:** `VideogenApi.ImageAssetRequest` 
    
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

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">upscaleVideo</a>({ ...params }) -> VideogenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.upscaleVideo({
    video: {
        storageFileId: "storageFileId",
        type: "IMAGE"
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

**request:** `VideogenApi.VideoAssetRequest` 
    
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

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">cancelToolExecution</a>({ ...params }) -> VideogenApi.StartToolExecutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.cancelToolExecution({
    apiTaskExecutionId: "apiTaskExecutionId"
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

**request:** `VideogenApi.CancelToolExecutionRequest` 
    
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

<details><summary><code>client.tools.<a href="/src/api/resources/tools/client/Client.ts">getExecutedTool</a>({ ...params }) -> VideogenApi.ExecutedTool</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tools.getExecutedTool({
    apiTaskExecutionId: "apiTaskExecutionId"
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

**request:** `VideogenApi.GetExecutedToolRequest` 
    
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

