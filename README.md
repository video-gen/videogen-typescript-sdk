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
    aiStyle:
      "Loose watercolor illustration, visible brushstrokes, soft color bleeds, paper texture, muted palette. A clear uncluttered subject centered in the frame, occupying only the middle half of the image, with generous empty margins on all four sides, no background clutter.",
  },
  quality: "HIGH",
  autoExport: true,
  videoEdits: [
    { type: "ENABLE_CAPTIONS" },
    {
      type: "CONVERT_IMAGES_TO_VIDEOS",
      motionPrompt: "slow cinematic push-in",
      muteOutputVideos: true,
      quality: "HIGH",
    },
  ],
});

if (run.status !== "succeeded") {
  throw new Error(`Workflow run ended with status ${run.status}`);
}

console.log(run.downloadUrl);
```

Omit `apiKey` to read `VIDEOGEN_API_KEY` from the environment.

Workflow and tool `*AndWait` wrappers can return `awaiting_approval` without throwing (see [Helpers](#helpers)). Check for `succeeded` before using the outputs.

## What you can do

| Area      | Client surface         | Typical entry points                                                                                                                                     |
| --------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account   | `vg.account`           | `getMe`                                                                                                                                                  |
| Billing   | `vg.billing`           | `getBillingAccount`, `createBillingOrder`, `getBillingOrder`, `completeBillingOrder`, `cancelBillingOrder`, `requestBillingRefund`                       |
| Workflows | `vg.workflows`         | `scriptToVideoAndWait`, `promptToVideoClipAndWait`, `voiceoverToVideoAndWait`, `slideshowToVideoAndWait`, `videoToVideoAndWait`, `translateVideoAndWait` |
| Tools     | `vg.tools`             | `generateImageAndWait`, `generateVideoClipAndWait`, `textToSpeechAndWait`, …                                                                             |
| Files     | `vg.files` + helpers   | `uploadFile`, `downloadFile`, `createPublicPreview`                                                                                                      |
| Projects  | `vg.projects`          | `exportAndWait`, `startVideoEditsAndWait`, `createTimelineInterchangeAndWait`                                                                            |
| Assistant | `vg.assistant`         | `startAssistantChatAndWait`, `sendAssistantMessageAndWait`                                                                                               |
| Entities  | `vg.entities`          | `createEntity`, `listEntities`, `addEntityReference`                                                                                                     |
| Text      | `vg.text`              | `generateText`                                                                                                                                           |
| Catalog   | `vg.resources`         | `listTtsVoices`, `listLanguages`                                                                                                                         |
| Webhooks  | `vg.webhooks` + helper | `createWebhookEndpoint`, `verifyWebhookSignature`                                                                                                        |

Prefer `*AndWait` (or the matching `poll*` helper) for anything asynchronous. Thin REST methods match OpenAPI `operationId`s one-to-one; see the [API docs](https://docs.videogen.io).

## Billing

Billing access requires an explicit grant in VideoGen. Read `vg.billing.getBillingAccount()` before preparing a credit purchase. Quote an order with `createBillingOrder({ orderId, credits })`, using a client-generated UUID that you reuse on an identical retry. Show the returned team, credits, total, expiry, and terms to the user before requesting payment approval.

Complete an approved order with `completeBillingOrder({ orderId, revision, idempotencyKey }, { paymentToken, signal })`. A compatible wallet must supply `paymentToken` securely after approval. The SDK sends it only through its dedicated payment header. Keep the token out of prompts, tool arguments, logs, URLs, and JSON bodies. The SDK does not retry billing operations or start generation automatically.

After an uncertain result, use `getBillingOrder({ orderId })` to check the original order. Payment and credit fulfillment are separate states; wait for `fulfilled` before using the purchased credits. `cancelBillingOrder({ orderId })` cancels an unpaid order. `requestBillingRefund({ orderId, reason })` records a support-reviewed request; `requested` does not mean the refund has completed.

If an order returns `requires_action` with a `verificationUrl`, direct the purchaser to that secure VideoGen verification continuation, signed in on the same team. Use it only to complete the required payment verification, then read the original order again. Keep checkout and payment approval in the compatible wallet.

## Workflows

Script to video (above) is the usual path. Prompt to video clip builds a single clip from a prompt:

```ts
import { VideoGen } from "@videogen/sdk";

const vg = new VideoGen({ apiKey: process.env.VIDEOGEN_API_KEY });

const run = await vg.workflows.promptToVideoClipAndWait({
  prompt:
    "A glass of water catching morning light on a kitchen counter, slow push-in",
  quality: "HIGH",
});

if (run.status !== "succeeded") {
  throw new Error(`Workflow run ended with status ${run.status}`);
}

console.log(run.downloadUrl);
```

Other workflow starters: `voiceoverToVideoAndWait` (uploaded audio `fileId`), `slideshowToVideoAndWait` (deck `fileId`), `videoToVideoAndWait` (restyles an uploaded `videoFileId` or a public `videoUrl` from a `prompt`), `translateVideoAndWait` (translates an uploaded `videoFileId` into each of `outputLanguages`, one editable video per language; read each language's `editableVideoId` from the run's `outputs` and pass it to `exportAndWait`).

## Tools

```ts
import { VideoGen } from "@videogen/sdk";

const vg = new VideoGen({ apiKey: process.env.VIDEOGEN_API_KEY });

const execution = await vg.tools.generateImageAndWait({
  prompt: "A sunset over a calm ocean, cinematic lighting",
  quality: "HIGH",
});

if (execution.status !== "succeeded") {
  throw new Error(`Tool execution ended with status ${execution.status}`);
}

const fileId = execution.results[0]?.fileId;
if (fileId == null) {
  throw new Error("Expected a generated file id");
}

const preview = await vg.createPublicPreview({ fileId });
console.log(execution.status, preview);
```

The same `*AndWait` pattern exists for video clips, motion graphics, TTS, music, sound effects, avatar, upscale, background removal, and more under `vg.tools`.

For avatar video, call `generateAvatarAndWait` with `audioFileId` and an ACTOR entity as `actorEntityId`. You may set `avatarQuality` to `LOW`, `STANDARD`, `HIGH`, or `MAX`. Script-to-video, voiceover-to-video, slideshow-to-video, and `CHANGE_NARRATOR` accept the same optional actor fields.

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

Export a finished workflow project, or apply video edits later:

```ts
import { VideoGen } from "@videogen/sdk";

const vg = new VideoGen({ apiKey: process.env.VIDEOGEN_API_KEY });

const projectId = "vg_proj_...";

const exported = await vg.projects.exportAndWait({
  projectId,
  quality: "HIGH",
});
console.log(exported.status, exported.exportFileId);

const edits = await vg.projects.startVideoEditsAndWait({
  projectId,
  editableVideoId: "vg_video_...",
  videoEdits: [{ type: "ENABLE_CAPTIONS" }, { type: "ADD_TRANSITIONS" }],
});
console.log(edits.videoEdits);
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

- Polling: `pollAssistantMessage`, `pollExecutedTool`, `pollWorkflowRun`, `pollProjectExport`, `pollTimelineInterchange`, `pollVideoEdits`, `pollPublicPreview`
- Files: `uploadFile`, `getHydratedFile`, `downloadFile`, `createPublicPreview`
- Webhooks: `verifyWebhookSignature`

`pollWorkflowRun` and `pollExecutedTool`, including the workflow and tool `*AndWait` wrappers, stop at `succeeded`, `failed`, `cancelled`, or `awaiting_approval`. They return `awaiting_approval` unchanged without throwing, even with the default `throwOnFailure: true`. This status means a retained result needs approval in VideoGen before it changes the project; it is resumable and does not mean the operation succeeded. Check `status === "succeeded"` before consuming successful outputs. Failed and cancelled operations still throw unless you pass `throwOnFailure: false`.

Cancellation: pass `signal: AbortSignal` to poll helpers and `*AndWait` methods.

## Errors

Failed HTTP calls throw `VideoGenError` with `status`, `body`, and `requestId` (from `x-request-id` when present).

## Docs

- [API documentation](https://docs.videogen.io)
- [npm: @videogen/sdk](https://www.npmjs.com/package/@videogen/sdk)
- [GitHub](https://github.com/video-gen/videogen-typescript-sdk)
