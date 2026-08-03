import type { VideoGen } from "../client.js";
import { pollProjectExport } from "../helpers/pollProjectExport.js";
import { pollRemixActions } from "../helpers/pollRemixActions.js";
import { pollTimelineInterchange } from "../helpers/pollTimelineInterchange.js";
import { fillPath, omitFields, pickFields } from "../request.js";
import type {
  CreateTimelineInterchangeRequest,
  CreateTimelineInterchangeResponse,
  ExportProjectRequest,
  ExportProjectResponse,
  ListProjectExportsResponse,
  ListProjectsResponse,
  ListRemixActionsResponse,
  PollOptions,
  ProjectExport,
  ProjectResponse,
  RemixProjectRequest,
  RemixProjectResponse,
  RequestOptions,
  TimelineInterchange,
} from "../types.js";

type ListProjectsRequest = {
  limit?: number;
  cursor?: string;
  selfOnly?: boolean;
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
  limit?: number;
  cursor?: string;
};

type ListProjectRemixActionsRequest = ProjectIdRequest & {
  limit?: number;
  cursor?: string;
};

type CreateTimelineInterchangeMergedRequest = ProjectIdRequest &
  CreateTimelineInterchangeRequest;

type GetTimelineInterchangeRequest = {
  interchangeJobId: string;
};

type RemixProjectMergedRequest = ProjectIdRequest & RemixProjectRequest;

export class ProjectsResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation listProjects
  async listProjects(
    request?: ListProjectsRequest,
    options?: RequestOptions,
  ): Promise<ListProjectsResponse> {
    return this.client.request<ListProjectsResponse>({
      method: "GET",
      path: "/v1/projects",
      query: pickFields(request ?? {}, [
        "limit",
        "cursor",
        "selfOnly",
        "includeUiProjects",
      ]),
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
      path: fillPath("/v1/projects/{projectId}", { projectId: request.projectId }),
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
    const started = await this.exportProject(request, { signal: options?.signal });
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
    const started = await this.remixProject(request, { signal: options?.signal });
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
