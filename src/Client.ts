import { VideoGenError } from "./errors.js";
import { createPublicPreview } from "./helpers/createPublicPreview.js";
import { downloadFile } from "./helpers/downloadFile.js";
import { getHydratedFile } from "./helpers/getHydratedFile.js";
import { pollAssistantMessage } from "./helpers/pollAssistantMessage.js";
import { pollExecutedTool } from "./helpers/pollExecutedTool.js";
import { pollProjectExport } from "./helpers/pollProjectExport.js";
import { pollPublicPreview } from "./helpers/pollPublicPreview.js";
import { pollRemixActions } from "./helpers/pollRemixActions.js";
import { pollTimelineInterchange } from "./helpers/pollTimelineInterchange.js";
import { pollWorkflowRun } from "./helpers/pollWorkflowRun.js";
import { uploadFile } from "./helpers/uploadFile.js";
import { verifyWebhookSignature } from "./helpers/verifyWebhookSignature.js";
import {
  type ClientRequestArgs,
  performRequest,
} from "./request.js";
import { AccountResource } from "./resources/account.js";
import { AssistantResource } from "./resources/assistant.js";
import { EntitiesResource } from "./resources/entities.js";
import { FilesResource } from "./resources/files.js";
import { ProjectsResource } from "./resources/projects.js";
import { ResourcesResource } from "./resources/resources.js";
import { TextResource } from "./resources/text.js";
import { ToolsResource } from "./resources/tools.js";
import { WebhooksResource } from "./resources/webhooks.js";
import { WorkflowsResource } from "./resources/workflows.js";

const DEFAULT_BASE_URL = "https://api.videogen.io";

const DEFAULT_CLIENT_ID = "sdk-typescript";

export type VideoGenOptions = {
  apiKey?: string;
  baseUrl?: string;
  /**
   * Identifies the calling client in the `X-VideoGen-Client` request header.
   * Defaults to `"sdk-typescript"`. First-party wrappers built on this SDK pass
   * their own id (e.g. the CLI passes `"cli"`, the MCP server passes `"mcp"`) so
   * the backend can tell how a request was made.
   */
  clientId?: string;
};

export class VideoGen {
  readonly apiKey: string;
  readonly baseUrl: string;
  readonly clientId: string;

  readonly workflows: WorkflowsResource;
  readonly projects: ProjectsResource;
  readonly tools: ToolsResource;
  readonly files: FilesResource;
  readonly entities: EntitiesResource;
  readonly assistant: AssistantResource;
  readonly text: TextResource;
  readonly resources: ResourcesResource;
  readonly webhooks: WebhooksResource;
  readonly account: AccountResource;

  readonly pollExecutedTool = (
    params: Omit<Parameters<typeof pollExecutedTool>[0], "client">,
  ) => pollExecutedTool({ client: this, ...params });

  readonly pollAssistantMessage = (
    params: Omit<Parameters<typeof pollAssistantMessage>[0], "client">,
  ) => pollAssistantMessage({ client: this, ...params });

  readonly pollWorkflowRun = (
    params: Omit<Parameters<typeof pollWorkflowRun>[0], "client">,
  ) => pollWorkflowRun({ client: this, ...params });

  readonly pollProjectExport = (
    params: Omit<Parameters<typeof pollProjectExport>[0], "client">,
  ) => pollProjectExport({ client: this, ...params });

  readonly pollTimelineInterchange = (
    params: Omit<Parameters<typeof pollTimelineInterchange>[0], "client">,
  ) => pollTimelineInterchange({ client: this, ...params });

  readonly pollRemixActions = (
    params: Omit<Parameters<typeof pollRemixActions>[0], "client">,
  ) => pollRemixActions({ client: this, ...params });

  readonly pollPublicPreview = (
    params: Omit<Parameters<typeof pollPublicPreview>[0], "client">,
  ) => pollPublicPreview({ client: this, ...params });

  readonly uploadFile = (params: Omit<Parameters<typeof uploadFile>[0], "client">) =>
    uploadFile({ client: this, ...params });

  readonly getHydratedFile = (
    params: Omit<Parameters<typeof getHydratedFile>[0], "client">,
  ) => getHydratedFile({ client: this, ...params });

  readonly downloadFile = (
    params: Omit<Parameters<typeof downloadFile>[0], "client">,
  ) => downloadFile({ client: this, ...params });

  readonly verifyWebhookSignature = verifyWebhookSignature;

  readonly createPublicPreview = (
    params: Omit<Parameters<typeof createPublicPreview>[0], "client">,
  ) => createPublicPreview({ client: this, ...params });

  constructor(options: VideoGenOptions = {}) {
    const apiKey = options.apiKey ?? process.env.VIDEOGEN_API_KEY;
    if (apiKey == null || apiKey.length === 0) {
      throw new VideoGenError({
        message: "Missing apiKey. Pass apiKey or set VIDEOGEN_API_KEY.",
        status: 0,
        body: null,
        requestId: null,
      });
    }
    this.apiKey = apiKey;
    this.baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
    this.clientId = options.clientId ?? DEFAULT_CLIENT_ID;

    this.workflows = new WorkflowsResource(this);
    this.projects = new ProjectsResource(this);
    this.tools = new ToolsResource(this);
    this.files = new FilesResource(this);
    this.entities = new EntitiesResource(this);
    this.assistant = new AssistantResource(this);
    this.text = new TextResource(this);
    this.resources = new ResourcesResource(this);
    this.webhooks = new WebhooksResource(this);
    this.account = new AccountResource(this);
  }

  async request<T = unknown>(args: ClientRequestArgs): Promise<T> {
    const result = await performRequest({
      apiKey: this.apiKey,
      baseUrl: this.baseUrl,
      clientId: this.clientId,
      ...args,
    });
    return result as T;
  }
}
