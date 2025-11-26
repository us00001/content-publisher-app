const API_BASE = "http://localhost:3000"; // Rails server

export async function apiFetch(url: string, options: any = {}) {
  const token = localStorage.getItem("auth_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const res = await fetch(API_BASE + url, {
    ...options,
    headers
  });

  let data = null;
  try {
    data = await res.json();
  } catch (_) {}

  if (!res.ok) {
    const error: any = new Error("Request failed");
    error.data = data;
    throw error;
  }

  return data;
}
