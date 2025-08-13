/**
 * Client API minimal pour Nexus AR Connect
 * Utilise les endpoints mock fournis par Vite (voir vite.config.js)
 */

const DEFAULT_BASE_URL = (typeof window !== 'undefined' && window.location)
  ? `${window.location.origin}`
  : (process.env.BASE_URL || 'http://localhost:3000');

const API_BASE = `${DEFAULT_BASE_URL}/api`;

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const { method = 'GET', headers = {}, body } = options;

  const res = await fetch(url, {
    method,
    headers: { ...defaultHeaders, ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const err = new Error(`API ${method} ${url} failed: ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  health: () => request('/health'),
  reportError: (payload) => request('/error-report', { method: 'POST', body: payload }),
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};

export default api;
