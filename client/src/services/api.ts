import { storage } from '../utils/storage';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

interface RequestOptions
  extends RequestInit {
  auth?: boolean;
}

export const api = async <T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  const {
    auth = true,
    headers,
    ...requestOptions
  } = options;

  const requestHeaders = new Headers(
    headers,
  );

  requestHeaders.set(
    'Content-Type',
    'application/json',
  );

  if (auth) {
    const token = storage.getToken();

    if (token) {
      requestHeaders.set(
        'Authorization',
        `Bearer ${token}`,
      );
    }
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...requestOptions,
      headers: requestHeaders,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        'Something went wrong',
    );
  }

  return data as T;
};