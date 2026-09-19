import { API_URL } from "./config";

/**
 * Custom fetch wrapper that automatically includes the Bearer JWT token
 * and handles session expiry / 401 unauthorized responses.
 */
export async function authFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (response.status === 401) {
      console.warn("Unauthorized request or session expired. Logging out.");
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userPhone");
      window.dispatchEvent(new Event("auth:logout"));
    }

    return response;
  } catch (err) {
    console.error(`API call failed for ${url}:`, err);
    throw err;
  }
}

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

export function removeToken() {
  localStorage.removeItem("token");
}
