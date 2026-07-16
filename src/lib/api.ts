const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiFetchOptions = RequestInit & {
  accessToken?: string;
};

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  if (!API_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL");
  }

  const { accessToken, headers, ...fetchOptions } = options;

  const res = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    let message = `API error: ${res.status}`;

    try {
      const errorBody = await res.json();

      if (errorBody?.message) {
        message = Array.isArray(errorBody.message)
          ? errorBody.message.join(", ")
          : errorBody.message;
      }
    } catch {
      // Response body is not JSON.
    }

    throw new Error(message);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}
