import { VideoGenError } from "./errors.js";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type QueryValue = string | number | boolean | null | undefined;

export type ClientRequestArgs = {
  method: HttpMethod;
  path: string;
  query?: Record<string, QueryValue>;
  body?: unknown;
  signal?: AbortSignal;
};

const buildUrl = ({
  baseUrl,
  path,
  query,
}: {
  baseUrl: string;
  path: string;
  query?: Record<string, QueryValue>;
}): string => {
  const url = new URL(path, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);
  if (query != null) {
    for (const [key, value] of Object.entries(query)) {
      if (value == null) {
        continue;
      }
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
};

const parseBody = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (text.length === 0) {
    return null;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

const getErrorMessage = ({ status, body }: { status: number; body: unknown }): string => {
  if (body != null && typeof body === "object" && "message" in body) {
    const message = (body as { message?: unknown }).message;
    if (typeof message === "string" && message.length > 0) {
      return message;
    }
  }
  return `Request failed with status ${status}`;
};

export const performRequest = async ({
  apiKey,
  baseUrl,
  clientId,
  method,
  path,
  query,
  body,
  signal,
}: {
  apiKey: string;
  baseUrl: string;
  clientId?: string;
} & ClientRequestArgs): Promise<unknown> => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/json",
  };

  if (clientId != null && clientId.length > 0) {
    // Identifies which first-party client made the call (SDK, CLI, MCP, or an
    // automation-tool / agent-plugin app). The backend uses this to record which
    // integration a team is calling from.
    headers["X-VideoGen-Client"] = clientId;
  }

  let requestBody: string | undefined;
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(buildUrl({ baseUrl, path, query }), {
    method,
    headers,
    body: requestBody,
    signal,
  });

  const requestId = response.headers.get("x-request-id");
  const parsed = await parseBody(response);

  if (!response.ok) {
    throw new VideoGenError({
      message: getErrorMessage({ status: response.status, body: parsed }),
      status: response.status,
      body: parsed,
      requestId,
    });
  }

  return parsed;
};

export const fillPath = (
  template: string,
  params: Record<string, string>,
): string => {
  return template.replace(/\{([^}]+)\}/g, (_match, name: string) => {
    const value = params[name];
    if (value == null || value.length === 0) {
      throw new VideoGenError({
        message: `Missing required path parameter "${name}"`,
        status: 0,
        body: { message: `Missing required path parameter "${name}"` },
        requestId: null,
      });
    }
    return encodeURIComponent(value);
  });
};

export const pickFields = (
  source: object | undefined,
  keys: readonly string[],
): Record<string, QueryValue> => {
  const out: Record<string, QueryValue> = {};
  if (source == null) {
    return out;
  }
  const record = source as Record<string, QueryValue>;
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined) {
      out[key] = value;
    }
  }
  return out;
};

export const omitFields = (
  source: object,
  keys: readonly string[],
): Record<string, unknown> => {
  const omit = new Set(keys);
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(source)) {
    if (!omit.has(key) && value !== undefined) {
      out[key] = value;
    }
  }
  return out;
};
