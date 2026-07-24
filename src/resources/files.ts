import type { VideoGen } from "../client.js";
import { fillPath, pickFields } from "../request.js";
import type {
  CreateFileUploadRequest,
  FileInfo,
  FileUploadResponse,
  GetFilesResponse,
  RequestOptions,
  SearchFilesRequest,
  SearchFilesResponse,
} from "../types.js";

type ListFilesRequest = {
  limit?: number;
  cursor?: string;
  includeExportFiles?: boolean;
  includeProjectFiles?: boolean;
};

type FileIdRequest = {
  fileId: string;
};

export class FilesResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation getFiles
  async getFiles(
    request?: ListFilesRequest,
    options?: RequestOptions,
  ): Promise<GetFilesResponse> {
    return this.client.request<GetFilesResponse>({
      method: "GET",
      path: "/v1/files",
      query: pickFields(request ?? {}, [
        "limit",
        "cursor",
        "includeExportFiles",
        "includeProjectFiles",
      ]),
      signal: options?.signal,
    });
  }

  // @sdk-operation searchFiles
  async searchFiles(
    request: SearchFilesRequest,
    options?: RequestOptions,
  ): Promise<SearchFilesResponse> {
    return this.client.request<SearchFilesResponse>({
      method: "POST",
      path: "/v1/files/search",
      body: request,
      signal: options?.signal,
    });
  }

  // @sdk-operation getFile
  async getFile(request: FileIdRequest, options?: RequestOptions): Promise<FileInfo> {
    return this.client.request<FileInfo>({
      method: "GET",
      path: fillPath("/v1/files/{fileId}", { fileId: request.fileId }),
      signal: options?.signal,
    });
  }

  // @sdk-operation createFileUpload
  async createFileUpload(
    request: CreateFileUploadRequest,
    options?: RequestOptions,
  ): Promise<FileUploadResponse> {
    return this.client.request<FileUploadResponse>({
      method: "POST",
      path: "/v1/files/upload",
      body: request,
      signal: options?.signal,
    });
  }

  // @sdk-operation hydrateFile
  async hydrateFile(
    request: FileIdRequest,
    options?: RequestOptions,
  ): Promise<FileInfo> {
    return this.client.request<FileInfo>({
      method: "POST",
      path: fillPath("/v1/files/{fileId}/hydrate", { fileId: request.fileId }),
      signal: options?.signal,
    });
  }

  // @sdk-operation archiveFile
  async archiveFile(
    request: FileIdRequest,
    options?: RequestOptions,
  ): Promise<FileInfo> {
    return this.client.request<FileInfo>({
      method: "POST",
      path: fillPath("/v1/files/{fileId}/archive", { fileId: request.fileId }),
      signal: options?.signal,
    });
  }

  // @sdk-operation enablePublicPreview
  async enablePublicPreview(
    request: FileIdRequest,
    options?: RequestOptions,
  ): Promise<FileInfo> {
    return this.client.request<FileInfo>({
      method: "POST",
      path: fillPath("/v1/files/{fileId}/enable-public-preview", {
        fileId: request.fileId,
      }),
      signal: options?.signal,
    });
  }

  // @sdk-operation disablePublicPreview
  async disablePublicPreview(
    request: FileIdRequest,
    options?: RequestOptions,
  ): Promise<FileInfo> {
    return this.client.request<FileInfo>({
      method: "POST",
      path: fillPath("/v1/files/{fileId}/disable-public-preview", {
        fileId: request.fileId,
      }),
      signal: options?.signal,
    });
  }
}
