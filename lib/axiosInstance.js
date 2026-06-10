// lib/axiosInstance.js
import axios from "axios";

const getBaseURL = () => {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage (client-side only)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Add timestamp to prevent caching
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    if (process.env.NODE_ENV === "development") {
      console.log("🚀 Request:", config.method.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Response:", response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Response Error:", {
        status: error.response?.status,
        url: error.config?.url,
        method: error.config?.method,
        data: error.response?.data,
      });
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Clear all auth data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Store current path for redirect
        const currentPath = window.location.pathname;
        if (currentPath !== "/login" && currentPath !== "/register") {
          sessionStorage.setItem("redirectAfterLogin", currentPath);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
