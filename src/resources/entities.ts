import type { VideoGen } from "../client.js";
import { fillPath, omitFields, pickFields } from "../request.js";
import type {
  AddEntityReferenceRequest,
  CreateEntityRequest,
  Entity,
  EntityArchiveResponse,
  ListEntitiesResponse,
  RemoveEntityReferenceRequest,
  RequestOptions,
  UpdateEntityRequest,
} from "../types.js";

type ListEntitiesRequest = {
  entityType?: "ACTOR" | "PRODUCT" | "VISUAL_STYLE";
  limit?: number;
  cursor?: string;
};

type EntityIdRequest = {
  entityId: string;
};

type UpdateEntityMergedRequest = EntityIdRequest & UpdateEntityRequest;

type AddEntityReferenceMergedRequest = EntityIdRequest & AddEntityReferenceRequest;

type RemoveEntityReferenceMergedRequest = EntityIdRequest &
  RemoveEntityReferenceRequest;

export class EntitiesResource {
  constructor(private readonly client: VideoGen) {}

  // @sdk-operation listEntities
  async listEntities(
    request?: ListEntitiesRequest,
    options?: RequestOptions,
  ): Promise<ListEntitiesResponse> {
    return this.client.request<ListEntitiesResponse>({
      method: "GET",
      path: "/v1/entities",
      query: pickFields(request ?? {}, ["entityType", "limit", "cursor"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation createEntity
  async createEntity(
    request: CreateEntityRequest,
    options?: RequestOptions,
  ): Promise<Entity> {
    return this.client.request<Entity>({
      method: "POST",
      path: "/v1/entities",
      body: request,
      signal: options?.signal,
    });
  }

  // @sdk-operation getEntity
  async getEntity(
    request: EntityIdRequest,
    options?: RequestOptions,
  ): Promise<Entity> {
    return this.client.request<Entity>({
      method: "GET",
      path: fillPath("/v1/entities/{entityId}", { entityId: request.entityId }),
      signal: options?.signal,
    });
  }

  // @sdk-operation updateEntity
  async updateEntity(
    request: UpdateEntityMergedRequest,
    options?: RequestOptions,
  ): Promise<Entity> {
    return this.client.request<Entity>({
      method: "POST",
      path: fillPath("/v1/entities/{entityId}/update", {
        entityId: request.entityId,
      }),
      body: omitFields(request, ["entityId"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation archiveEntity
  async archiveEntity(
    request: EntityIdRequest,
    options?: RequestOptions,
  ): Promise<EntityArchiveResponse> {
    return this.client.request<EntityArchiveResponse>({
      method: "POST",
      path: fillPath("/v1/entities/{entityId}/archive", {
        entityId: request.entityId,
      }),
      signal: options?.signal,
    });
  }

  // @sdk-operation addEntityReference
  async addEntityReference(
    request: AddEntityReferenceMergedRequest,
    options?: RequestOptions,
  ): Promise<Entity> {
    return this.client.request<Entity>({
      method: "POST",
      path: fillPath("/v1/entities/{entityId}/references", {
        entityId: request.entityId,
      }),
      body: omitFields(request, ["entityId"]),
      signal: options?.signal,
    });
  }

  // @sdk-operation removeEntityReference
  async removeEntityReference(
    request: RemoveEntityReferenceMergedRequest,
    options?: RequestOptions,
  ): Promise<Entity> {
    return this.client.request<Entity>({
      method: "POST",
      path: fillPath("/v1/entities/{entityId}/references/remove", {
        entityId: request.entityId,
      }),
      body: omitFields(request, ["entityId"]),
      signal: options?.signal,
    });
  }
}
