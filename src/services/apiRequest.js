import { getAuthToken } from "../utils/auth";
import { API_BASE_URL } from "./baseURL";

export async function fetchApi(endpoint, { method = "GET", body, headers = {} } = {}) {
    const token = getAuthToken();
  
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  
    const requestOptions = {
      method,
      headers: { ...defaultHeaders, ...headers },
    };
  
    if (body && method !== "GET" && method !== "HEAD") {
      requestOptions.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
  
      const contentType = response.headers.get("Content-Type");
      const isJson = contentType && contentType.includes("application/json");
      const data = isJson ? await response.json() : null;
  
      if (!response.ok) {
        if (response.status === 401) {
          console.warn("Unauthorized: Invalid credentials or session expired.");
        }
        throw new Error(data?.message || `HTTP Error: ${response.status}`);
      }
  
      return data;
    } catch (error) {
      console.error("Fetch API Error:", {
        endpoint,
        method,
        body,
        headers,
        error: error.message || error,
      });
      throw error;
    }
  }