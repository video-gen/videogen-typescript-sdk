import assert from "node:assert/strict";
import test from "node:test";
import { VideoGen } from "../dist/index.js";

test("video edit, recovery and undo preserve their explicit targets and bodies", async (t) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls.push({
      url: String(url),
      method: init.method,
      body: init.body == null ? null : JSON.parse(init.body),
    });
    return new Response(JSON.stringify({ outcome: "NO_OP" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  });
  const client = new VideoGen({
    apiKey: "test",
    baseUrl: "https://editing.example.test",
  });
  const request = {
    projectId: "project/one",
    editableVideoId: "video/two",
    mode: "COMMANDS",
    mutationId: "original",
    expectedRevision: 9,
    commands: [{ type: "SET_CAPTIONS", enabled: true }],
  };
  await client.projects.editVideo(request);
  await client.projects.getProjectEdit({
    projectId: "project/one",
    mutationId: "original",
  });
  await client.projects.undoProjectEdit({
    projectId: "project/one",
    mutationId: "original",
    newMutationId: "undo",
  });
  assert.equal(
    calls[0].url,
    "https://editing.example.test/v1/projects/project%2Fone/videos/video%2Ftwo/edits",
  );
  assert.deepEqual(calls[0].body, {
    mode: "COMMANDS",
    mutationId: "original",
    expectedRevision: 9,
    commands: request.commands,
  });
  assert.equal(calls[1].method, "GET");
  assert.equal(calls[1].body, null);
  assert.deepEqual(calls[2].body, { mutationId: "undo" });
});

test("inspection pages retain scene, layer and text selectors exclusively in the query", async (t) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls.push({ url: new URL(String(url)), body: init.body });
    return new Response(JSON.stringify({ revision: 9 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  });
  const client = new VideoGen({
    apiKey: "test",
    baseUrl: "https://editing.example.test",
  });
  await client.projects.inspectEditableVideo({
    projectId: "project-one",
    editableVideoId: "video-two",
    sectionId: "section-one",
    layerId: "layer-two",
    assetId: "asset-one",
    expectedRevision: 9,
    offset: 20,
    limit: 10,
    textOffset: 512,
  });
  assert.deepEqual(Object.fromEntries(calls[0].url.searchParams), {
    limit: "10",
    offset: "20",
    sectionId: "section-one",
    layerId: "layer-two",
    assetId: "asset-one",
    expectedRevision: "9",
    textOffset: "512",
  });
  assert.equal(calls[0].body, undefined);
});

test("partial text styles omit undefined fields without changing the provided settings", async (t) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (_url, init) => {
    calls.push(JSON.parse(init.body));
    return new Response(JSON.stringify({ outcome: "APPLIED" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  });
  const client = new VideoGen({
    apiKey: "test",
    baseUrl: "https://editing.example.test",
  });
  await client.projects.editVideo({
    projectId: "project",
    editableVideoId: "video",
    mode: "COMMANDS",
    mutationId: "mutation",
    expectedRevision: 1,
    commands: [
      {
        type: "SET_CAPTION_STYLE",
        style: { fontFamily: undefined, fontSize: 48 },
      },
    ],
  });
  assert.deepEqual(calls[0].commands, [
    { type: "SET_CAPTION_STYLE", style: { fontSize: 48 } },
  ]);
});
