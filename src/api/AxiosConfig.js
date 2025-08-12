// axios instance + helpers
import axios from 'axios';

// Vite env variable (browser safe)
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

// Axios instance
const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { 'Content-Type': 'application/json' }
});

// Attach token from localStorage to Authorization header
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Global response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        // Token expired or unauthorized → logout
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Helper to extract data from response
const handleResponse = async (promise) => {
  const res = await promise;
  return res.data;
};

// API helper functions
export const login = (email, password) =>
  handleResponse(api.post('/auth/login', { email, password }));

export const createTest = (payload) =>
  handleResponse(api.post('/tests', payload));

export const getTests = () =>
  handleResponse(api.get('/tests'));

export const getTest = (testId) =>
  handleResponse(api.get(`/tests/${testId}`));

export const addQuestion = (testId, payload) =>
  handleResponse(api.post(`/tests/${testId}/questions`, payload));

export const uploadQuestionsCSV = (testId, file) => {
  const form = new FormData();
  form.append('file', file);
  return handleResponse(api.post(`/tests/${testId}/questions/upload`, form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }));
};

export default api;
