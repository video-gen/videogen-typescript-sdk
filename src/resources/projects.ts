import type { VideoGen } from "../client.js";
import { pollProjectExport } from "../helpers/pollProjectExport.js";
import { pollVideoEdits } from "../helpers/pollVideoEdits.js";
import { pollRemixActions } from "../helpers/pollRemixActions.js";
import { pollTimelineInterchange } from "../helpers/pollTimelineInterchange.js";
import { fillPath, omitFields, pickFields } from "../request.js";
import type {
  ApplyProjectEditsRequest,
  CreateTimelineInterchangeRequest,
  CreateTimelineInterchangeResponse,
  ExportProjectRequest,
  EditVideoCommandsRequest,
  ExportProjectResponse,
  ListProjectExportsResponse,
  ListProjectsResponse,
  ListRemixActionsResponse,
  ListVideoEditsResponse,
  PollOptions,
  ProjectExport,
  ProjectEditReceipt,
  ProjectResponse,
  RemixProjectRequest,
  RemixProjectResponse,
  RequestOptions,
  StartVideoEditsRequest,
  StartVideoEditsResponse,
  Schemas,
  TimelineInterchange,
} from "../types.js";

type ListProjectsRequest = {
  limit?: number | undefined;
  cursor?: string | undefined;
  selfOnly?: boolean;
  /** @deprecated Ignored. The list always includes projects created in the VideoGen app. */
  includeUiProjects?: boolean;
};

type ProjectIdRequest = {
  projectId: string;
};

type ExportProjectMergedRequest = ProjectIdRequest & ExportProjectRequest;

type GetProjectExportRequest = {
  projectId: string;
  exportId: string;
};

type ListProjectExportsRequest = ProjectIdRequest & {
  limit?: number | undefined;
  cursor?: string | undefined;
};

type ListProjectRemixActionsRequest = ProjectIdRequest & {
  limit?: number | undefined;
  cursor?: string | undefined;
};

type CreateTimelineInterchangeMergedRequest = ProjectIdRequest &
  CreateTimelineInterchangeRequest;

type GetTimelineInterchangeRequest = {
  interchangeJobId: string;
};

type ListVideoEditsRequest = ProjectIdRequest & {
  limit?: number | undefined;
  cursor?: string | undefined;
  editableVideoId?: string | undefined;
};

type StartVideoEditsMergedRequest = ProjectIdRequest & StartVideoEditsRequest;

type RemixProjectMergedRequest = ProjectIdRequest & RemixProjectRequest;

export class ProjectsResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation getProjectArtifact
  async getProjectArtifact(
    request: ProjectIdRequest & {
      artifactId: string;
      textOffset?: number | undefined;
      textLimit?: number | undefined;
      itemOffset?: number | undefined;
      itemLimit?: number | undefined;
    },
    options?: RequestOptions,
  ): Promise<Schemas["GetProjectArtifactResponse"]> {
    return this.client.request<Schemas["GetProjectArtifactResponse"]>({
      method: "GET",
      path: fillPath("/v1/projects/{projectId}/artifacts/{artifactId}", {
        projectId: request.projectId,
        artifactId: request.artifactId,
      }),
      query: pickFields(request, [
        "textOffset",
        "textLimit",
        "itemOffset",
        "itemLimit",
      ]),
      signal: options?.signal,
    });
  }
  // @sdk-operation applyProjectEdits
  async applyProjectEdits(
    request: ProjectIdRequest & ApplyProjectEditsRequest,
    options?: RequestOptions,
  ): Promise<ProjectEditReceipt> {
    return this.client.request<ProjectEditReceipt>({
      method: "POST",
      path: fillPath("/v1/projects/{projectId}/mutations", {
        projectId: request.projectId,
      }),
      body: omitFields(request, ["projectId"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation listProjectArtifacts
  async listProjectArtifacts(
    request: ProjectIdRequest & {
      limit?: number | undefined;
      cursor?: string | undefined;
    },
    options?: RequestOptions,
  ): Promise<Schemas["ListProjectArtifactsResponse"]> {
    return this.client.request<Schemas["ListProjectArtifactsResponse"]>({
      method: "GET",
      path: fillPath("/v1/projects/{projectId}/artifacts", {
        projectId: request.projectId,
      }),
      query: pickFields(request, ["limit", "cursor"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation getProjectEditingCapabilities
  async getProjectEditingCapabilities(
    request: ProjectIdRequest,
    options?: RequestOptions,
  ): Promise<Schemas["ProjectEditingCapabilities"]> {
    return this.client.request<Schemas["ProjectEditingCapabilities"]>({
      method: "GET",
      path: fillPath("/v1/projects/{projectId}/editing-capabilities", {
        projectId: request.projectId,
      }),
      signal: options?.signal,
    });
  }

  // @sdk-operation inspectEditableVideo
  async inspectEditableVideo(
    request: ProjectIdRequest & {
      editableVideoId: string;
      limit?: number | undefined;
      offset?: number | undefined;
      sectionId?: string | undefined;
      layerId?: string | undefined;
      assetId?: string | undefined;
      expectedRevision?: number | undefined;
      textOffset?: number | undefined;
    },
    options?: RequestOptions,
  ): Promise<Schemas["EditableVideoInspection"]> {
    return this.client.request<Schemas["EditableVideoInspection"]>({
      method: "GET",
      path: fillPath(
        "/v1/projects/{projectId}/videos/{editableVideoId}/inspection",
        {
          projectId: request.projectId,
          editableVideoId: request.editableVideoId,
        },
      ),
      query: pickFields(request, [
        "limit",
        "offset",
        "sectionId",
        "layerId",
        "assetId",
        "expectedRevision",
        "textOffset",
      ]),
      signal: options?.signal,
    });
  }

  // @sdk-operation editVideo
  async editVideo(
    request: ProjectIdRequest & {
      editableVideoId: string;
    } & EditVideoCommandsRequest,
    options?: RequestOptions,
  ): Promise<ProjectEditReceipt> {
    return this.client.request<ProjectEditReceipt>({
      method: "POST",
      path: fillPath(
        "/v1/projects/{projectId}/videos/{editableVideoId}/edits",
        {
          projectId: request.projectId,
          editableVideoId: request.editableVideoId,
        },
      ),
      body: omitFields(request, ["projectId", "editableVideoId"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation getProjectEdit
  async getProjectEdit(
    request: ProjectIdRequest & { mutationId: string },
    options?: RequestOptions,
  ): Promise<ProjectEditReceipt> {
    return this.client.request<ProjectEditReceipt>({
      method: "GET",
      path: fillPath("/v1/projects/{projectId}/mutations/{mutationId}", {
        projectId: request.projectId,
        mutationId: request.mutationId,
      }),
      signal: options?.signal,
    });
  }

  // @sdk-operation undoProjectEdit
  async undoProjectEdit(
    request: ProjectIdRequest & { mutationId: string; newMutationId: string },
    options?: RequestOptions,
  ): Promise<ProjectEditReceipt> {
    return this.client.request<ProjectEditReceipt>({
      method: "POST",
      path: fillPath("/v1/projects/{projectId}/mutations/{mutationId}/undo", {
        projectId: request.projectId,
        mutationId: request.mutationId,
      }),
      body: { mutationId: request.newMutationId },
      signal: options?.signal,
    });
  }

  // @sdk-operation listProjects
  async listProjects(
    request?: ListProjectsRequest,
    options?: RequestOptions,
  ): Promise<ListProjectsResponse> {
    return this.client.request<ListProjectsResponse>({
      method: "GET",
      path: "/v1/projects",
      query: pickFields(request ?? {}, ["limit", "cursor", "selfOnly"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation getProject
  async getProject(
    request: ProjectIdRequest,
    options?: RequestOptions,
  ): Promise<ProjectResponse> {
    return this.client.request<ProjectResponse>({
      method: "GET",
      path: fillPath("/v1/projects/{projectId}", {
        projectId: request.projectId,
      }),
      signal: options?.signal,
    });
  }

  // @sdk-operation exportProject
  async exportProject(
    request: ExportProjectMergedRequest,
    options?: RequestOptions,
  ): Promise<ExportProjectResponse> {
    const body = omitFields(request, ["projectId"]);
    return this.client.request<ExportProjectResponse>({
      method: "POST",
      path: fillPath("/v1/projects/{projectId}/export", {
        projectId: request.projectId,
      }),
      // Always send a JSON object: the API rejects a missing body with
      // "Request body must be a JSON object." (Python SDK already sends `{}`.)
      body: Object.keys(body).length > 0 ? body : {},
      signal: options?.signal,
    });
  }

  async exportAndWait(
    request: ExportProjectMergedRequest,
    options?: PollOptions,
  ): Promise<ProjectExport> {
    const started = await this.exportProject(request, {
      signal: options?.signal,
    });
    return pollProjectExport({
      client: this.client,
      projectId: request.projectId,
      exportId: started.exportId,
      ...options,
    });
  }

  // @sdk-operation listProjectExports
  async listProjectExports(
    request: ListProjectExportsRequest,
    options?: RequestOptions,
  ): Promise<ListProjectExportsResponse> {
    return this.client.request<ListProjectExportsResponse>({
      method: "GET",
      path: fillPath("/v1/projects/{projectId}/exports", {
        projectId: request.projectId,
      }),
      query: pickFields(request, ["limit", "cursor"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation getProjectExport
  async getProjectExport(
    request: GetProjectExportRequest,
    options?: RequestOptions,
  ): Promise<ProjectExport> {
    return this.client.request<ProjectExport>({
      method: "GET",
      path: fillPath("/v1/projects/{projectId}/exports/{exportId}", {
        projectId: request.projectId,
        exportId: request.exportId,
      }),
      signal: options?.signal,
    });
  }

  // @sdk-operation createTimelineInterchange
  async createTimelineInterchange(
    request: CreateTimelineInterchangeMergedRequest,
    options?: RequestOptions,
  ): Promise<CreateTimelineInterchangeResponse> {
    const body = omitFields(request, ["projectId"]);
    return this.client.request<CreateTimelineInterchangeResponse>({
      method: "POST",
      path: fillPath("/v1/projects/{projectId}/timeline-interchange", {
        projectId: request.projectId,
      }),
      // Always send a JSON object: the API rejects a missing body with
      // "Request body must be a JSON object." (Python SDK already sends `{}`.)
      body: Object.keys(body).length > 0 ? body : {},
      signal: options?.signal,
    });
  }

  async createTimelineInterchangeAndWait(
    request: CreateTimelineInterchangeMergedRequest,
    options?: PollOptions,
  ): Promise<TimelineInterchange> {
    const started = await this.createTimelineInterchange(request, {
      signal: options?.signal,
    });
    return pollTimelineInterchange({
      client: this.client,
      interchangeJobId: started.interchangeJobId,
      ...options,
    });
  }

  // @sdk-operation getTimelineInterchange
  async getTimelineInterchange(
    request: GetTimelineInterchangeRequest,
    options?: RequestOptions,
  ): Promise<TimelineInterchange> {
    return this.client.request<TimelineInterchange>({
      method: "GET",
      path: fillPath("/v1/timeline-interchange/{interchangeJobId}", {
        interchangeJobId: request.interchangeJobId,
      }),
      signal: options?.signal,
    });
  }

  // @sdk-operation startVideoEdits
  async startVideoEdits(
    request: StartVideoEditsMergedRequest,
    options?: RequestOptions,
  ): Promise<StartVideoEditsResponse> {
    return this.client.request<StartVideoEditsResponse>({
      method: "POST",
      path: fillPath("/v1/projects/{projectId}/video-edits", {
        projectId: request.projectId,
      }),
      body: omitFields(request, ["projectId"]),
      signal: options?.signal,
    });
  }

  async startVideoEditsAndWait(
    request: StartVideoEditsMergedRequest,
    options?: PollOptions,
  ): Promise<ListVideoEditsResponse> {
    const started = await this.startVideoEdits(request, {
      signal: options?.signal,
    });
    return pollVideoEdits({
      client: this.client,
      projectId: started.projectId,
      ...options,
      videoEditIds: started.videoEditIds,
    });
  }

  // @sdk-operation listVideoEdits
  async listVideoEdits(
    request: ListVideoEditsRequest,
    options?: RequestOptions,
  ): Promise<ListVideoEditsResponse> {
    return this.client.request<ListVideoEditsResponse>({
      method: "GET",
      path: fillPath("/v1/projects/{projectId}/video-edits", {
        projectId: request.projectId,
      }),
      query: pickFields(request, ["limit", "cursor", "editableVideoId"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation remixProject
  async remixProject(
    request: RemixProjectMergedRequest,
    options?: RequestOptions,
  ): Promise<RemixProjectResponse> {
    return this.client.request<RemixProjectResponse>({
      method: "POST",
      path: fillPath("/v1/projects/{projectId}/remix", {
        projectId: request.projectId,
      }),
      body: omitFields(request, ["projectId"]),
      signal: options?.signal,
    });
  }

  async remixAndWait(
    request: RemixProjectMergedRequest,
    options?: PollOptions,
  ): Promise<ListRemixActionsResponse> {
    const started = await this.remixProject(request, {
      signal: options?.signal,
    });
    return pollRemixActions({
      client: this.client,
      projectId: started.projectId,
      ...options,
      remixActionIds: started.remixActionIds,
    });
  }

  // @sdk-operation listProjectRemixActions
  async listProjectRemixActions(
    request: ListProjectRemixActionsRequest,
    options?: RequestOptions,
  ): Promise<ListRemixActionsResponse> {
    return this.client.request<ListRemixActionsResponse>({
      method: "GET",
      path: fillPath("/v1/projects/{projectId}/remix-actions", {
        projectId: request.projectId,
      }),
      query: pickFields(request, ["limit", "cursor"]),
      signal: options?.signal,
    });
  }
}
