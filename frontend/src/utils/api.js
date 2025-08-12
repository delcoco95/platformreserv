import config from "./config.js";

const API_BASE_URL = config.api.baseUrl;

const api = {
  async get(endpoint) {
    const token = localStorage.getItem("auth_token");

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || response.statusText);
    }

    return result.data;
  },

  async post(endpoint, data) {
    const token = localStorage.getItem("auth_token");

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || response.statusText);
    }

    return result.data;
  },

  async put(endpoint, data) {
    const token = localStorage.getItem("auth_token");

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || response.statusText);
    }

    return result.data;
  },

  async delete(endpoint) {
    const token = localStorage.getItem("auth_token");

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || response.statusText);
    }

    return result.data;
  },
};

export default api;
