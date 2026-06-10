"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Check for registration success message
  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccessMessage(
        "Registration successful! Please login with your credentials.",
      );
    }
  }, [searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      setLoading(true);
      await login(form);

      // Check for redirect URL from session storage (set by navbar or other components)
      const redirectUrl = sessionStorage.getItem("redirectAfterLogin");

      if (redirectUrl) {
        sessionStorage.removeItem("redirectAfterLogin");
        router.push(redirectUrl);
      } else {
        // Check for redirect query parameter
        const redirectParam = searchParams.get("redirect");
        if (redirectParam) {
          router.push(decodeURIComponent(redirectParam));
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-theme border border-gray-100 rounded-xl p-8 space-y-6">
      {/* Heading */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-heading font-bold text-dark">
          Welcome Back
        </h1>
        <p className="text-sm text-light">
          Sign in to access your bookings and manage your trips
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-dark">Email Address</label>

          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-theme focus-within:ring-2 focus-within:ring-theme/20 transition-all bg-gray-50">
            <Mail className="w-4 h-4 text-light mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full outline-none text-sm bg-transparent text-dark placeholder:text-light/60"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-dark">Password</label>

          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-theme focus-within:ring-2 focus-within:ring-theme/20 transition-all bg-gray-50">
            <Lock className="w-4 h-4 text-light mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full outline-none text-sm bg-transparent text-dark placeholder:text-light/60"
            />
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-xs text-theme hover:text-hover-dark hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-theme hover:bg-hover-dark text-white font-semibold py-3 rounded-lg transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Register Link */}
      <p className="text-sm text-center text-light">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-theme font-semibold hover:text-hover-dark hover:underline transition"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
