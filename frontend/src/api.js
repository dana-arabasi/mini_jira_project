import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000"
});

API.interceptors.request.use((config) => {
  if (config.url.includes('/auth/users')) {
    const userData = localStorage.getItem("user");
    if (userData) {
      config.headers.Authorization = userData;
    }
  }
  return config;
});

export default API;