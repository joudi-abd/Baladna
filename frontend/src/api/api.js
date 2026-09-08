const API_URL =
  process.env.REACT_APP_API_BASE || "http://localhost:8000/api";

export { API_URL };

export function getToken() {
  return localStorage.getItem("token");
}

export async function apiRequest(path, options = {}) {
  const token = getToken();

  const headers = {
    Accept: "application/json",

    ...(options.body && !(options.body instanceof FormData)
      ? {
          "Content-Type": "application/json",
        }
      : {}),

    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),

    ...options.headers,
    'ngrok-skip-browser-warning': 'true'
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

const api = {
  API_URL,
  apiRequest,
  getToken,
};

export default api;