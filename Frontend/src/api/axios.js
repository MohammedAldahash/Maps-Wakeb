import axios from 'axios';

// Local base URLs for microservices
const API_BASES = {
  user: "http://localhost:8082/api/user",      // ✅ updated
  marker: "http://localhost:8084/api/marker",
  favorite: "http://localhost:8085/api/favorite"
};

const api = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
});

// Automatically attach JWT token from localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api, API_BASES };
