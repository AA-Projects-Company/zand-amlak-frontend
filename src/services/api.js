
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export function getAccessToken() {
  return sessionStorage.getItem('zand_access');
}

export function saveTokens(data) {
  if (data.access) {
    sessionStorage.setItem('zand_access', data.access);
  }

  if (data.refresh) {
    sessionStorage.setItem('zand_refresh', data.refresh);
  }
}

export function clearTokens() {
  sessionStorage.removeItem('zand_access');
  sessionStorage.removeItem('zand_refresh');
}

async function readResponse(response) {
  if (response.status === 204) return null;

  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function login(username, password) {
  const response = await fetch(`${API_URL}/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await readResponse(response);

  if (!response.ok) {
    throw new Error(
      data?.detail || 'نام کاربری یا رمز عبور صحیح نیست.'
    );
  }

  saveTokens(data);
  return data;
}

async function refreshAccessToken() {
  const refresh = sessionStorage.getItem('zand_refresh');
  if (!refresh) return false;

  const response = await fetch(`${API_URL}/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  const data = await readResponse(response);

  if (!response.ok || !data?.access) {
    clearTokens();
    return false;
  }

  saveTokens(data);
  return true;
}

export async function apiRequest(path, options = {}) {
  const url = `${API_URL}/${path.replace(/^\/+/, '')}`;

  const send = () => {
    const headers = { ...options.headers };
    const token = getAccessToken();

    if (!(options.body instanceof FormData) && options.body != null) {
      headers['Content-Type'] ??= 'application/json';
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, { ...options, headers });
  };

  let response = await send();

  if (response.status === 401 && getAccessToken()) {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      response = await send();
    }
  }

  const data = await readResponse(response);

  if (!response.ok) {
    if (response.status === 401) {
      clearTokens();
    }

const message =
  typeof data === 'object' && data !== null
    ? data?.detail ||
      data?.errors?.number?.[0] ||
      data?.message ||
      JSON.stringify(data)
    : data;

throw new Error(message || `خطای API: ${response.status}`);
  }

  return data;
}
