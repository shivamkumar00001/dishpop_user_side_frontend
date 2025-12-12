// src/lib/api.js
import axios from "axios";

// Base URL for all API requests
const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE,
  timeout: 15000, // optional timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// No auth tokens needed for the user-side.
// No interceptors required, but we keep one for future error handling.
api.interceptors.request.use(
  (config) => {
    return config; // simply return config untouched
  },
  (error) => Promise.reject(error)
);

export default api;
