import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
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
