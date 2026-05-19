// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { API_BASE_URL } from '@/config/api';

const REQUEST_TIMEOUT_MS = 10000;

type RequestBody = Record<string, unknown> | unknown[] | null;

type ApiErrorResponse = {
  mensaje?: string;
  message?: string;
  error?: string;
};

async function solicitar<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('Timeout al llamar a la API:', url);
      throw new Error(
        `La API no respondió en ${REQUEST_TIMEOUT_MS / 1000}s. Verifica que el servidor esté activo en ${API_BASE_URL}`
      );
    }

    console.warn('Error de red al llamar a la API:', url, error);
    throw new Error(`No se ha podido conectar con la API en ${url}`);
  } finally {
    clearTimeout(timeout);
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const errorData = data as ApiErrorResponse | null;
    const message =
      errorData?.mensaje ??
      errorData?.message ??
      errorData?.error ??
      'No se ha podido completar la peticion.';

    throw new Error(message);
  }

  return data as T;
}

function conCuerpoJson(method: string, body?: RequestBody): RequestInit {
  return {
    method,
    body: body === undefined ? undefined : JSON.stringify(body),
  };
}

// Constante publica usada por otras partes de la app.
export const apiClient = {
  get: <T>(path: string) => solicitar<T>(path),
  post: <T>(path: string, body?: RequestBody) => solicitar<T>(path, conCuerpoJson('POST', body)),
  put: <T>(path: string, body?: RequestBody) => solicitar<T>(path, conCuerpoJson('PUT', body)),
  delete: <T>(path: string) => solicitar<T>(path, { method: 'DELETE' }),
};
