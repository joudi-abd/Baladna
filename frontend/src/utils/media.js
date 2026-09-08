const API_BASE =
  process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=60";

export function mediaUrl(image) {
  if (!image) {
    return PLACEHOLDER;
  }

  let path = image;

  if (typeof image === "object") {
    path = image.url || image.path || image.file_path || image.image || "";
  }

  if (!path) {
    return PLACEHOLDER;
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  const clean = String(path).replace(/^\/+/, "");

  if (clean.startsWith("storage/")) {
    return `${API_BASE}/${clean}`;
  }

  return `${API_BASE}/storage/${clean}`;
}

export function listFromResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.data)) {
    return payload.data.data;
  }

  return [];
}

export { PLACEHOLDER };
