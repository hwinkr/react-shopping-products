import { ERROR_MESSAGE } from "../constants/apis";
import { HTTPMethod } from "../types/apis";

interface FetchOption {
  url: string;
  method: HTTPMethod;
  errorMessage: string;
  body?: object;
  token?: string;
}

export async function fetchClient<T>({ url, method, errorMessage, body, token }: FetchOption) {
  try {
    const headers = getHeaders(token);
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(errorMessage);
    }

    const isJson = response.headers.get("content-type")?.includes("application/json");
    if (isJson) {
      return (await response.json()) as T;
    }
  } catch (error) {
    throw new Error(createErrorMessage(error));
  }
}

function getHeaders(token?: string): Record<string, string> {
  const headers = { "Content-type": "application/json" };

  if (token) {
    return { ...headers, Authorization: token };
  }

  return headers;
}

function createErrorMessage(error: unknown) {
  if (error instanceof TypeError) {
    return ERROR_MESSAGE.NETWORK_DISCONNECTED;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return ERROR_MESSAGE.UNKNOWN_ERROR;
}
