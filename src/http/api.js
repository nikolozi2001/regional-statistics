import axios from "axios";

// Define the fixed API URL from the user's requirement
const FIXED_API_URL = "http://localhost:3001/api";

// Create and export a singleton promise that resolves to the API instance
const apiPromise = (async () => {
  try {
    return axios.create({
      baseURL: FIXED_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });
  } catch (error) {
    console.error("Error creating API client:", error);
    throw error;
  }
})();

// Helper function to make API requests with better error handling
const apiRequest = async (method, url, data = null) => {
  try {
    const api = await apiPromise;
    const config = { method, url };
    if (data) {
      config.data = data;
    }

    console.log(`Making ${method} request to ${url}`);
    const response = await api.request(config);
    return response;
  } catch (error) {
    console.error(`API ${method} request to ${url} failed:`, error);
    console.error("Error details:", error.response?.data || error.message);
    throw error;
  }
};

// API functions for regions
export const regionsAPI = {
  getAll: async () => apiRequest("get", "/regions"),
  getById: async (id) => apiRequest("get", `/regions/${id}`),
  create: async (regionData) => apiRequest("post", "/regions", regionData),
  update: async (id, regionData) =>
    apiRequest("put", `/regions/${id}`, regionData),
  delete: async (id) => apiRequest("delete", `/regions/${id}`),
};

// API function for file uploads
export const uploadsAPI = {
  uploadFile: async (formData) => {
    const api = await apiPromise;
    return api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

// Debug function to directly test API connectivity
export const testApiConnection = async () => {
  try {
    return await apiRequest("get", "/test");
  } catch (error) {
    console.error("API connection test failed:", error);
    throw error;
  }
};

export default apiPromise;
