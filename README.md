# `@videogen/sdk`

Official TypeScript SDK for the [VideoGen API](https://docs.videogen.io).

## Install

```bash
npm install @videogen/sdk
```

Requires Node.js 20+.

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

Default base URL: `https://api.videogen.io`.

## Helpers

Named exports and matching methods on the client:

- `pollAssistantMessage` / `pollExecutedTool` / `pollWorkflowRun` / `pollProjectExport` / `pollTimelineInterchange` / `pollRemixActions` / `pollPublicPreview`
- `uploadFile` / `getHydratedFile` / `downloadFile`
- `verifyWebhookSignature` (Standard Webhooks)
- `createPublicPreview`

## Develop

```bash
npm install
npm run generate:types
npm run build
```

OpenAPI source: `../../fern/openapi.yml`. Shared contract: [`../INTERFACE.md`](../INTERFACE.md).
