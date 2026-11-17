import assert from "node:assert/strict";
import test from "node:test";
import { VideoGen, VideoGenError, pollVideoEdits } from "../dist/index.js";

const makeClient = () =>
  new VideoGen({ apiKey: "test", baseUrl: "https://editing.example.test" });
const jsonResponse = (body) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
const edit = (videoEditId, status = "succeeded", progressPercentage = 100) => ({
  videoEditId,
  editableVideoId: "video-one",
  projectId: "project-one",
  type: "ENABLE_CAPTIONS",
  status,
  progressPercentage,
});
const page = (videoEdits, nextCursor = null) => ({
  videoEdits,
  hasMore: nextCursor != null,
  nextCursor,
});

test("video edit methods preserve explicit targets, request bodies and signals", async (t) => {
  const calls = [];
  const controller = new AbortController();
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls.push({ url: new URL(String(url)), init });
    return jsonResponse({
      projectId: "project-one",
      videoEditIds: ["edit-one"],
    });
  });
  const client = makeClient();
  const videoEdits = [{ type: "ENABLE_CAPTIONS" }];
  await client.projects.startVideoEdits(
    {
      projectId: "project/one",
      editableVideoId: "video/two",
      videoEdits,
      saveAsNewProject: true,
    },
    { signal: controller.signal },
  );
  await client.projects.listVideoEdits({
    projectId: "project/one",
    editableVideoId: "video/two",
    limit: 5,
    cursor: "next/page",
  });
  assert.equal(calls[0].url.pathname, "/v1/projects/project%2Fone/video-edits");
  assert.equal(calls[0].init.method, "POST");
  assert.deepEqual(JSON.parse(calls[0].init.body), {
    editableVideoId: "video/two",
    videoEdits,
    saveAsNewProject: true,
  });
  assert.equal(calls[0].init.signal, controller.signal);
  assert.equal(calls[1].init.method, "GET");
  assert.deepEqual(Object.fromEntries(calls[1].url.searchParams), {
    limit: "5",
    cursor: "next/page",
    editableVideoId: "video/two",
  });
  assert.equal(calls[1].init.body, undefined);
});

test("the wait helper follows the returned project and waits only for its submitted ids", async (t) => {
  const client = makeClient();
  const calls = [];
  const progress = [];
  t.mock.method(client.projects, "startVideoEdits", async () => ({
    projectId: "copied-project",
    videoEditIds: ["submitted-edit"],
  }));
  t.mock.method(client.projects, "listVideoEdits", async (request) => {
    calls.push(request);
    return page([edit("other-edit", "failed"), edit("submitted-edit")]);
  });
  const result = await client.projects.startVideoEditsAndWait(
    {
      projectId: "original-project",
      editableVideoId: "video-one",
      videoEdits: [{ type: "ENABLE_CAPTIONS" }],
      saveAsNewProject: true,
    },
    { onProgress: (value) => progress.push(value) },
  );
  assert.equal(calls[0].projectId, "copied-project");
  assert.equal(calls[0].editableVideoId, undefined);
  assert.deepEqual(
    result.videoEdits.map((item) => item.videoEditId),
    ["submitted-edit"],
  );
  assert.deepEqual(progress, [100]);
});

test("polling pages through history and cannot complete with a missing submitted id", async (t) => {
  const client = makeClient();
  let calls = 0;
  t.mock.method(client.projects, "listVideoEdits", async ({ cursor }) => {
    calls += 1;
    if (cursor == null) return page([edit("first")], "second-page");
    return page(calls < 4 ? [] : [edit("second")]);
  });
  const result = await pollVideoEdits({
    client,
    projectId: "project-one",
    videoEditIds: ["first", "second"],
    pollIntervalMs: 0,
  });
  assert.equal(calls, 4);
  assert.deepEqual(
    result.videoEdits.map((item) => item.videoEditId),
    ["first", "second"],
  );
});

test("polling throws for failed and cancelled edits unless requested otherwise", async (t) => {
  const client = makeClient();
  for (const status of ["failed", "cancelled"]) {
    const mocked = t.mock.method(client.projects, "listVideoEdits", async () =>
      page([edit("failed-edit", status)]),
    );
    await assert.rejects(
      client.pollVideoEdits({
        projectId: "project-one",
        videoEditIds: ["failed-edit"],
      }),
      VideoGenError,
    );
    const result = await client.pollVideoEdits({
      projectId: "project-one",
      videoEditIds: ["failed-edit"],
      throwOnFailure: false,
    });
    assert.equal(result.videoEdits[0].status, status);
    mocked.mock.restore();
  }
});

test("polling preserves cancellation and times out while a submitted id is absent", async (t) => {
  const client = makeClient();
  let calls = 0;
  t.mock.method(client.projects, "listVideoEdits", async () => {
    calls += 1;
    return page([edit("different-edit")]);
  });
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(
    client.pollVideoEdits({
      projectId: "project-one",
      signal: controller.signal,
    }),
    { name: "AbortError" },
  );
  assert.equal(calls, 0);
  await assert.rejects(
    client.pollVideoEdits({
      projectId: "project-one",
      videoEditIds: ["missing-edit"],
      timeoutMs: -1,
    }),
    /Timed out waiting for video edits/,
  );
});

test("existing client methods keep the original endpoints and wire fields", async (t) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls.push({ url: new URL(String(url)), init });
    return jsonResponse({
      projectId: "project-one",
      remixActionIds: ["old-edit"],
    });
  });
  const client = makeClient();
  await client.projects.remixProject({
    projectId: "project-one",
    remixActions: [{ type: "ENABLE_CAPTIONS" }],
  });
  await client.projects.listProjectRemixActions({
    projectId: "project-one",
    cursor: "next",
  });
  assert.equal(calls[0].url.pathname, "/v1/projects/project-one/remix");
  assert.deepEqual(JSON.parse(calls[0].init.body), {
    remixActions: [{ type: "ENABLE_CAPTIONS" }],
  });
  assert.equal(calls[1].url.pathname, "/v1/projects/project-one/remix-actions");
  assert.equal(calls[1].url.searchParams.get("cursor"), "next");
});
