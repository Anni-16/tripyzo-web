"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock, User } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      setLoading(true);
      await register(form);

      // Show success message
      setSuccess(true);

      // Clear form
      setForm({
        name: "",
        email: "",
        password: "",
      });

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 2000);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-theme border border-gray-100 rounded-xl p-8 space-y-6">
      {/* Heading */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-heading font-bold text-dark">
          Create an Account
        </h1>
        <p className="text-sm text-light">
          Register to book flights and manage your trips
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-lg">
          Registration successful! Redirecting to login...
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-dark">Full Name</label>
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-theme focus-within:ring-2 focus-within:ring-theme/20 transition-all bg-gray-50">
            <User className="w-4 h-4 text-light mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full outline-none text-sm bg-transparent text-dark placeholder:text-light/60"
            />
          </div>
        </div>

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
              placeholder="Create password (min. 6 characters)"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full outline-none text-sm bg-transparent text-dark placeholder:text-light/60"
            />
          </div>
          <p className="text-xs text-light mt-1">
            Password must be at least 6 characters
          </p>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading || success}
          className="w-full bg-theme hover:bg-hover-dark text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {/* Login Link */}
      <p className="text-sm text-center text-light">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-theme font-semibold hover:text-hover-dark hover:underline transition"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
