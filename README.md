# `@videogen/sdk`

Official TypeScript SDK for the [VideoGen API](https://docs.videogen.io).

Generate full videos from scripts, voiceovers, or slideshows, run media tools, manage files and projects, chat with the AI assistant, and verify webhooks.

## Install

```bash
npm install @videogen/sdk
```

Requires Node.js 20+. Default base URL: `https://api.videogen.io`.

## Quick start

```ts
import { VideoGen } from "@videogen/sdk";

const vg = new VideoGen({ apiKey: process.env.VIDEOGEN_API_KEY });

const me = await vg.account.getMe();
console.log(me.email);

const run = await vg.workflows.scriptToVideoAndWait({
  script: "Stay hydrated for better focus and energy.",
  visualStyle: {
    type: "AI_IMAGE",
    aiStyle: "loose watercolor illustration with visible brushstrokes",
  },
  quality: "HIGH",
  remixActions: [
    { type: "ENABLE_CAPTIONS" },
    {
      type: "CONVERT_IMAGES_TO_VIDEOS",
      motionPrompt: "slow cinematic push-in",
      muteOutputVideos: true,
      quality: "HIGH",
    },
  ],
});

console.log(run.status, run.projectId);
```

Omit `apiKey` to read `VIDEOGEN_API_KEY` from the environment.

## What you can do

| Area | Client surface | Typical entry points |
| --- | --- | --- |
| Account | `vg.account` | `getMe` |
| Workflows | `vg.workflows` | `scriptToVideoAndWait`, `promptToVideoClipAndWait`, `voiceoverToVideoAndWait`, `slideshowToVideoAndWait` |
| Tools | `vg.tools` | `generateImageAndWait`, `generateVideoClipAndWait`, `textToSpeechAndWait`, … |
| Files | `vg.files` + helpers | `uploadFile`, `downloadFile`, `createPublicPreview` |
| Projects | `vg.projects` | `exportAndWait`, `remixAndWait`, `createTimelineInterchangeAndWait` |
| Assistant | `vg.assistant` | `startAssistantChatAndWait`, `sendAssistantMessageAndWait` |
| Entities | `vg.entities` | `createEntity`, `listEntities`, `addEntityReference` |
| Text | `vg.text` | `generateText` |
| Catalog | `vg.resources` | `listTtsVoices`, `listAvatarPresenters`, `listLanguages` |
| Webhooks | `vg.webhooks` + helper | `createWebhookEndpoint`, `verifyWebhookSignature` |

Prefer `*AndWait` (or the matching `poll*` helper) for anything asynchronous. Thin REST methods match OpenAPI `operationId`s one-to-one; see the [API docs](https://docs.videogen.io).

## Workflows

Script to video (above) is the usual path. Prompt to video clip builds a single clip from a prompt:

```ts
import { VideoGen } from "@videogen/sdk";

const vg = new VideoGen({ apiKey: process.env.VIDEOGEN_API_KEY });

const run = await vg.workflows.promptToVideoClipAndWait({
  prompt: "A glass of water catching morning light on a kitchen counter, slow push-in",
  quality: "HIGH",
});

console.log(run.status, run.projectId);
```

Other workflow starters: `voiceoverToVideoAndWait` (uploaded audio `fileId`), `slideshowToVideoAndWait` (deck `fileId`).

## Tools

```ts
import { VideoGen } from "@videogen/sdk";

const vg = new VideoGen({ apiKey: process.env.VIDEOGEN_API_KEY });

const execution = await vg.tools.generateImageAndWait({
  prompt: "A sunset over a calm ocean, cinematic lighting",
  quality: "HIGH",
});

const fileId = execution.results[0]?.fileId;
if (fileId == null) {
  throw new Error("Expected a generated file id");
}

const preview = await vg.createPublicPreview({ fileId });
console.log(execution.status, preview);
```

The same `*AndWait` pattern exists for video clips, motion graphics, TTS, music, sound effects, avatar, upscale, background removal, and more under `vg.tools`.

## Files

```ts
import { readFileSync } from "node:fs";
import { VideoGen } from "@videogen/sdk";

const vg = new VideoGen({ apiKey: process.env.VIDEOGEN_API_KEY });

const uploaded = await vg.uploadFile({
  data: readFileSync("input.mp4"),
  displayName: "input.mp4",
  type: "VIDEO",
});

console.log(uploaded.fileId);

await vg.downloadFile({
  fileId: uploaded.fileId,
  outputPath: "output.mp4",
});
```

## Projects

Export a finished workflow project, or apply remix actions later:

```ts
import { VideoGen } from "@videogen/sdk";

const vg = new VideoGen({ apiKey: process.env.VIDEOGEN_API_KEY });

const projectId = "vg_proj_...";

const exported = await vg.projects.exportAndWait({
  projectId,
  quality: "HIGH",
});
console.log(exported.status, exported.exportFileId);

const remix = await vg.projects.remixAndWait({
  projectId,
  remixActions: [{ type: "ENABLE_CAPTIONS" }, { type: "ADD_TRANSITIONS" }],
});
console.log(remix);
```

## Assistant

```ts
import { VideoGen } from "@videogen/sdk";

const vg = new VideoGen({ apiKey: process.env.VIDEOGEN_API_KEY });

const started = await vg.assistant.startAssistantChat({
  message: "Draft a 20-second script about morning hydration.",
});
const message = await vg.pollAssistantMessage({ messageId: started.messageId });

console.log(message.status, started.assistantId, started.projectId);
```

Or use `startAssistantChatAndWait` when you only need the terminal message. Continue with `sendAssistantMessageAndWait` / `actOnAssistantActionAndWait` on the same `assistantId`.

## Entities

Reusable actors, products, and visual styles for consistent generation:

```ts
import { VideoGen } from "@videogen/sdk";

const vg = new VideoGen({ apiKey: process.env.VIDEOGEN_API_KEY });

const entity = await vg.entities.createEntity({
  entityType: "ACTOR",
  name: "Alex",
  description: "Friendly narrator in casual clothes",
});

console.log(entity.entityId);
```

Attach reference images with `addEntityReference`, then pass entity ids into workflows.

## Text

```ts
import { VideoGen } from "@videogen/sdk";

const vg = new VideoGen({ apiKey: process.env.VIDEOGEN_API_KEY });

const result = await vg.text.generateText({
  prompt: "Write a one-sentence hook for a hydration tip video.",
});

console.log(result.text);
```

## Webhooks

```ts
import { verifyWebhookSignature } from "@videogen/sdk";

const event = verifyWebhookSignature({
  rawBody: "...", // raw request body string
  headers: {
    "webhook-id": "...",
    "webhook-timestamp": "...",
    "webhook-signature": "...",
  },
  secret: process.env.VIDEOGEN_WEBHOOK_SECRET ?? "",
});

console.log(event);
```

Register endpoints with `vg.webhooks.createWebhookEndpoint`. Signatures follow the Standard Webhooks scheme.

## Helpers

Named exports and matching methods on the client (object-parameter style):

- Polling: `pollAssistantMessage`, `pollExecutedTool`, `pollWorkflowRun`, `pollProjectExport`, `pollTimelineInterchange`, `pollRemixActions`, `pollPublicPreview`
- Files: `uploadFile`, `getHydratedFile`, `downloadFile`, `createPublicPreview`
- Webhooks: `verifyWebhookSignature`

Cancellation: pass `signal: AbortSignal` to poll helpers and `*AndWait` methods.

## Errors

Failed HTTP calls throw `VideoGenError` with `status`, `body`, and `requestId` (from `x-request-id` when present).

## Docs

- [API documentation](https://docs.videogen.io)
- [npm: @videogen/sdk](https://www.npmjs.com/package/@videogen/sdk)
- [GitHub](https://github.com/video-gen/videogen-typescript-sdk)
