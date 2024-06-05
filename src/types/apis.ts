export type HTTPMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface FetchOptions {
  url: string;
  method: HTTPMethod;
  body?: object;
  token?: string;
}
