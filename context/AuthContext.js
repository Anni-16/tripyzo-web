// context/AuthContext.js
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  // ================= FETCH CURRENT USER =================
  const fetchUser = useCallback(async (silent = false) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const res = await axiosInstance.get("/auth/me");
      const userData = res.data.data;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "Error fetching user:",
          err.response?.status || err.message,
        );
      }

      // Clear invalid auth data
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    } finally {
      if (!silent) {
        setLoading(false);
        setInitialized(true);
      }
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      // If we have both token and user data, set the user immediately
      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setLoading(false);

          // Validate token in background
          try {
            const res = await axiosInstance.get("/auth/me");
            const userData = res.data.data;
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
          } catch (validateErr) {
            // Token is invalid, clear everything
            // console.log("Token validation failed, clearing auth data");
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }
        } catch (parseErr) {
          // Stored user data is corrupted
          // console.log("Stored user data corrupted, clearing");
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        } finally {
          setInitialized(true);
        }
      } else {
        // No token or user data
        setInitialized(true);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ================= REGISTER =================
  const register = async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const { token, ...userData } = res.data.data;

      // Store token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return res.data;
    } catch (error) {
      throw error;
    }
  };

  // ================= LOGIN =================
  const login = async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, ...userData } = res.data.data;

      // Store token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // console.log("✅ Login successful, token stored");

      // Check for pending booking
      const pendingBooking = sessionStorage.getItem("pendingBooking");
      if (pendingBooking) {
        try {
          const { flight } = JSON.parse(pendingBooking);
          sessionStorage.removeItem("pendingBooking");

          const bookingRes = await axiosInstance.post("/bookings/draft", {
            offer: flight,
          });

          const bookingId = bookingRes?.data?.data?._id;
          if (bookingId) {
            router.push(`/booking/${bookingId}`);
            return res.data;
          }
        } catch (bookingErr) {
          console.error("Error creating booking after login:", bookingErr);
        }
      }

      // Check for redirect URL
      const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
      if (redirectUrl) {
        sessionStorage.removeItem("redirectAfterLogin");
        router.push(redirectUrl);
      } else {
        router.push("/");
      }

      return res.data;
    } catch (error) {
      throw error;
    }
  };

  // ================= LOGOUT =================
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear all auth data
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/");
    }
  };

  const value = {
    user,
    loading: loading || !initialized,
    login,
    register,
    logout,
    fetchUser,
    isAuthenticated: !!user,
    initialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
