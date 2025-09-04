// src/services/api.js
import axios from "axios";

// Point this to your backend API
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Automatically attach token (if present) to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

