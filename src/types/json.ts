/**
 * Generic JSON value types. Used for loosely-typed request fields (e.g. caption
 * style overrides, per-scene generation settings) that are validated by the API
 * rather than modeled field-by-field in the SDK.
 */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type JsonArray = JsonValue[];

export type JsonObject = { [key: string]: JsonValue };
