const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (typeof window !== 'undefined') {
    if (token) {
      window.localStorage.setItem('psa_access_token', token);
    } else {
      window.localStorage.removeItem('psa_access_token');
    }
  }
}

export function getAccessToken(): string | null {
  if (accessToken) return accessToken;
  if (typeof window !== 'undefined') {
    accessToken = window.localStorage.getItem('psa_access_token');
  }
  return accessToken;
}

export function setRefreshToken(token: string | null) {
  if (typeof window !== 'undefined') {
    if (token) {
      window.localStorage.setItem('psa_refresh_token', token);
    } else {
      window.localStorage.removeItem('psa_refresh_token');
    }
  }
}

export function getRefreshToken(): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('psa_refresh_token');
  }
  return null;
}

export function clearTokens() {
  setAccessToken(null);
  setRefreshToken(null);
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

async function handleRefresh(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refresh = getRefreshToken();
    if (!refresh) return null;

    try {
      const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refresh }),
      });

      if (!res.ok) {
        clearTokens();
        return null;
      }

      const json = await res.json();
      if (json.success && json.data) {
        const { accessToken: newAccess, refreshToken: newRefresh } = json.data;
        setAccessToken(newAccess);
        setRefreshToken(newRefresh);
        return newAccess;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }

    clearTokens();
    return null;
  })();

  const result = await refreshPromise;
  refreshPromise = null;
  return result;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  let url = `${API_BASE}${endpoint}`;
  
  if (options.params) {
    const searchParams = new URLSearchParams();
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, String(value));
    });
    const queryStr = searchParams.toString();
    if (queryStr) url += `?${queryStr}`;
  }

  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getAccessToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    let response = await fetch(url, config);

    // If 401 Unauthorized, try to refresh tokens
    if (response.status === 401) {
      const newAccessToken = await handleRefresh();
      if (newAccessToken) {
        // Retry request with new token
        const newHeaders = new Headers(config.headers || {});
        newHeaders.set('Authorization', `Bearer ${newAccessToken}`);
        config.headers = newHeaders;
        response = await fetch(url, config);
      } else {
        // Trigger redirect if we are on client side
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        throw new Error('Unauthorized');
      }
    }

    const responseText = await response.text();
    let json: any = {};
    if (responseText) {
      try {
        json = JSON.parse(responseText);
      } catch {
        throw new Error(responseText || 'Failed to parse response JSON');
      }
    }

    if (!response.ok) {
      const errMsg = json.error?.message || json.message || `HTTP error ${response.status}`;
      const err = new Error(errMsg);
      (err as any).status = response.status;
      (err as any).code = json.error?.code;
      throw err;
    }

    return json.success ? json.data : json;
  } catch (error: any) {
    console.error(`API Request Failure [${options.method || 'GET'} ${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  get: <T = any>(endpoint: string, options: RequestOptions = {}) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),
  post: <T = any>(endpoint: string, body?: any, options: RequestOptions = {}) =>
    apiRequest<T>(endpoint, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  patch: <T = any>(endpoint: string, body?: any, options: RequestOptions = {}) =>
    apiRequest<T>(endpoint, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  put: <T = any>(endpoint: string, body?: any, options: RequestOptions = {}) =>
    apiRequest<T>(endpoint, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  delete: <T = any>(endpoint: string, options: RequestOptions = {}) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
  upload: <T = any>(endpoint: string, formData: FormData, options: RequestOptions = {}) => {
    return apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: formData,
    });
  }
};
