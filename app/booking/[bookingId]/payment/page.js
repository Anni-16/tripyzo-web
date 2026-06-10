"use client";
import BookingSidebar from "@/components/Booking/BookingSidebar";
import FlightDetails from "@/components/Booking/FlilghtDetails";
import PaymentDetails from "@/components/Booking/PaymentDetails";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import axiosInstance from "@/lib/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

const PaymentConfirmations = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bookingId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/bookings/${bookingId}`);
        setBooking(res.data.data);
        setError(null);
      } catch (err) {
        console.error("Booking fetch error:", err);
        setError("Failed to load booking details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchBooking();
  }, [bookingId]);

  // Loading State
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-theme animate-spin mx-auto" />
            <p className="mt-4 text-body font-medium">
              Loading payment details...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error State
  if (error || !booking) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <p className="text-red-600 font-medium mb-2">
                Oops! Something went wrong
              </p>
              <p className="text-sm text-light mb-4">
                {error || "Booking not found"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-theme hover:bg-hover-dark text-white px-6 py-2 rounded-lg text-sm font-semibold transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-theme-light/30 min-h-screen py-6 md:py-8 lg:py-10">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-4 text-sm text-light">
            <span>Booking</span>
            <span className="mx-2">/</span>
            <span className="text-dark font-medium">
              Payment & Confirmation
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
              <FlightDetails booking={booking} />
              <PaymentDetails booking={booking} />
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                <BookingSidebar booking={booking} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PaymentConfirmations;
