import axios from "axios";

// Function to get the backend API base URL
const getApiBaseUrl = async () => {
  try {
    // Try to fetch the port information from the server
    const response = await fetch('/server/port-info.json');
    if (response.ok) {
      const portInfo = await response.json();
      return `http://localhost:${portInfo.port}/api`;
    }
  } catch (error) {
    console.warn('Could not load port-info.json, using fallback ports');
  }

  // Fallback: Try common ports in sequence
  const ports = [3000, 3001, 3002, 3003, 3004, 3005];
  
  // Function to check if a server is responding on a given port
  const checkPort = async (port) => {
    try {
      const response = await fetch(`http://localhost:${port}/api/health`, { 
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(300) // Abort after 300ms
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  // Try each port in sequence
  for (const port of ports) {
    if (await checkPort(port)) {
      console.log(`Backend found on port ${port}`);
      return `http://localhost:${port}/api`;
    }
  }

  // Default fallback
  console.warn('Could not detect backend port, using default port 3000');
  return 'http://localhost:3000/api';
};

// Create API instance factory
const createApiInstance = async () => {
  const baseURL = await getApiBaseUrl();
  
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

// Initialize API with default and update it when the real baseURL is determined
let api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Update the API instance as soon as possible
(async () => {
  api = await createApiInstance();
})();

// API functions for regions
export const regionsAPI = {
  getAll: async () => (await api).get('/regions'),
  getById: async (id) => (await api).get(`/regions/${id}`),
  create: async (regionData) => (await api).post('/regions', regionData),
  update: async (id, regionData) => (await api).put(`/regions/${id}`, regionData),
  delete: async (id) => (await api).delete(`/regions/${id}`)
};

// API functions for statistics
export const statisticsAPI = {
  getCategories: async () => (await api).get('/statistics/categories'),
  getByRegion: async (regionId) => (await api).get(`/statistics/region/${regionId}`),
  getByRegionAndCategory: async (regionId, categoryId) => (await api).get(`/statistics/region/${regionId}/category/${categoryId}`),
  create: async (statData) => (await api).post('/statistics', statData),
  update: async (id, statData) => (await api).put(`/statistics/${id}`, statData),
  delete: async (id) => (await api).delete(`/statistics/${id}`),
  compareRegions: async (regionIds, categoryId, year) => {
    let url = `/statistics/compare?regionIds=${regionIds}&categoryId=${categoryId}`;
    if (year) url += `&year=${year}`;
    return (await api).get(url);
  },
  getTimeSeries: async (statName, regionId) => (await api).get(`/statistics/timeseries/${statName}/${regionId}`)
};

// API function for file uploads
export const uploadsAPI = {
  uploadFile: async (formData) => {
    const currentApi = await api;
    return currentApi.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

// Health check
export const healthCheck = async () => (await api).get('/health');

export default api;