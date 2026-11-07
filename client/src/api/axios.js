import axios from 'axios';

// Create real Axios instance connecting to Express backend API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: Attach JWT Bearer token to all outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('car_service_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle auth expirations gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is missing, expired, or invalid
      const currentPath = window.location.pathname;
      if (currentPath !== '/login') {
        localStorage.removeItem('car_service_token');
        localStorage.removeItem('car_service_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
