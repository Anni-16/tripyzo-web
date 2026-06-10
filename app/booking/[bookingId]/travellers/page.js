"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Loader2, AlertCircle } from "lucide-react";

import Navbar from "@/components/Headers/Navbar";
import Footer from "@/components/Footer";
import FlightDetails from "@/components/Booking/FlilghtDetails";
import BookingSidebar from "@/components/Booking/BookingSidebar";
import ContactInfo from "@/components/Booking/ContactInfo";
import TravellersDetails from "@/components/Booking/TravellersDetails";

export default function TravllersPage() {
  const { bookingId } = useParams();
  const router = useRouter();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH BOOKING ================= */

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setFetchLoading(true);
        const res = await axiosInstance.get(`/bookings/${bookingId}`);
        setBooking(res.data.data);
        setError(null);
      } catch (err) {
        console.error("Booking fetch error:", err);
        setError("Failed to load booking details. Please try again.");
      } finally {
        setFetchLoading(false);
      }
    };

    if (bookingId) fetchBooking();
  }, [bookingId]);

  /* ================= SAVE TRAVELLERS ================= */

  const handleSaveTravellers = async () => {
    try {
      setLoading(true);

      const passengers = JSON.parse(sessionStorage.getItem("passengers"));
      const contact = JSON.parse(sessionStorage.getItem("contact"));

      if (!passengers || passengers.length === 0) {
        alert("Please add traveller details");
        return;
      }

      if (!contact) {
        alert("Please fill contact information");
        return;
      }

      const payload = {
        contactInfo: {
          email: contact.email,
          phone: contact.phone,
        },
        passengers,
      };

      await axiosInstance.put(`/bookings/${bookingId}/travellers`, payload);

      router.push(`/booking/${bookingId}/addons`);
    } catch (err) {
      console.error(err);
      alert("Failed to save traveller details");
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (fetchLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-theme animate-spin mx-auto" />
            <p className="mt-4 text-body font-medium">
              Loading booking details...
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
            <span className="text-dark font-medium">Traveller Details</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* LEFT SIDE - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <FlightDetails booking={booking} />

              <div className="space-y-6">
                <ContactInfo />
                <TravellersDetails booking={booking} setBooking={setBooking} />
              </div>

              {/* CONTINUE BUTTON */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSaveTravellers}
                  disabled={loading}
                  className="bg-theme hover:bg-hover-dark text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Saving..." : "Continue to Add-ons"}
                  {!loading && <span className="text-lg">→</span>}
                </button>
              </div>
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
}
