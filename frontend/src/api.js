import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000"
});

// Add request interceptor to include user data for admin routes
API.interceptors.request.use((config) => {
  // Check if this is an admin route
  if (config.url.includes('/auth/users')) {
    const userData = localStorage.getItem("user");
    if (userData) {
      config.headers.Authorization = userData;
    }
  }
  return config;
});

export default API;