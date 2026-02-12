import axios from 'axios';

/**
 * Get API base URL from environment variables.
 * 
 * Priority:
 * 1. VITE_API_BASE_URL (explicit override)
 * 2. VITE_BACKEND_URL + /api (if VITE_USE_PROXY=false)
 * 3. Auto-generated from backend config components (if VITE_USE_PROXY=false)
 * 4. Relative path '/api' (uses Vite proxy)
 */
function getApiBaseUrl(): string {
  // Explicit override
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Check if proxy is disabled
  const useProxy = import.meta.env.VITE_USE_PROXY !== 'false';
  
  if (!useProxy) {
    // Use VITE_BACKEND_URL if available
    if (import.meta.env.VITE_BACKEND_URL) {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      // Ensure it ends with /api
      return backendUrl.endsWith('/api') ? backendUrl : `${backendUrl}/api`;
    }
    
    // Build URL from backend configuration components
    const protocol = import.meta.env.VITE_BACKEND_PROTOCOL || 'http';
    const host = import.meta.env.VITE_BACKEND_HOST || 'localhost';
    const port = import.meta.env.VITE_BACKEND_PORT || '8210';
    return `${protocol}://${host}:${port}/api`;
  }

  // Default: use relative path with proxy
  return '/api';
}

const API_BASE_URL = getApiBaseUrl();

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to requests if available
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('b2bmarket_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      const refreshToken = localStorage.getItem('b2bmarket_refresh_token');
      if (refreshToken) {
        try {
          // You can implement refresh logic here or redirect to login
          localStorage.removeItem('b2bmarket_access_token');
          localStorage.removeItem('b2bmarket_refresh_token');
          localStorage.removeItem('b2bmarket_user');
          window.location.href = '/login';
        } catch (refreshError) {
          // Refresh failed, redirect to login
          window.location.href = '/login';
        }
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default client;
