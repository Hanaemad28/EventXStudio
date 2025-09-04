import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // backend
  withCredentials: true, // so cookies/sessions work
});

export default api;

