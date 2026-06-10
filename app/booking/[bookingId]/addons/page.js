"use client";

import BookingSidebar from "@/components/Booking/BookingSidebar";
import FlightDetails from "@/components/Booking/FlilghtDetails";
import ServicesAddons from "@/components/Booking/ServicesAddons";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import axiosInstance from "@/lib/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2, Shield, Lock } from "lucide-react";

const ServicesAddOnsPage = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bookingId } = useParams();
  const router = useRouter();

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

  // Calculate all prices based on booking data
  const calculateTotals = () => {
    if (!booking) return { subtotal: 0, addons: 0, fare: 0, total: 0 };

    const offerTotal = booking.offerSnapshot?.totalAmount || 0;
    const addonsTotal = booking.internalAddonsAmount || 0;
    const fareTotal = booking.fareAmount || 0;

    // Calculate passenger count
    const passengerCount = booking.passengers?.length || 1;

    // Base fare per passenger
    const baseFare = booking.offerSnapshot?.baseAmount || 0;
    const tax = booking.offerSnapshot?.taxAmount || 0;
    const baseTotal = (baseFare + tax) * passengerCount;

    return {
      subtotal: baseTotal,
      addons: addonsTotal,
      fare: fareTotal,
      total: baseTotal + addonsTotal + fareTotal,
    };
  };

  const handleContinueToPayment = async () => {
    try {
      setLoading(true);
      router.push(`/booking/${bookingId}/payment`);
    } catch (err) {
      console.error("Error proceeding to payment:", err);
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

  const totals = calculateTotals();

  return (
    <>
      <Navbar />

      <main className="bg-theme-light/30 min-h-screen py-6 md:py-8 lg:py-10">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-4 text-sm text-light">
            <span>Booking</span>
            <span className="mx-2">/</span>
            <span className="text-dark font-medium">Add-on Services</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
              <FlightDetails booking={booking} />

              {/* PASS STATE */}
              <ServicesAddons booking={booking} setBooking={setBooking} />

              {/* Price Summary Card */}
              <div className="bg-theme-light/50 p-6 rounded-xl border border-gray-100 shadow-theme">
                <h3 className="font-bold text-lg text-dark mb-4">
                  Price Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-body">
                    <span>
                      Base Fare ({booking.passengers?.length || 1} passenger
                      {(booking.passengers?.length || 1) > 1 ? "s" : ""})
                    </span>
                    <span className="font-medium text-dark">
                      ${(booking.offerSnapshot?.baseAmount || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-body">
                    <span>Taxes & Fees</span>
                    <span className="font-medium text-dark">
                      ${(booking.offerSnapshot?.taxAmount || 0).toFixed(2)}
                    </span>
                  </div>
                  {booking.fareAmount > 0 && (
                    <div className="flex justify-between text-body">
                      <span>
                        Fare Upgrade (
                        {booking.fareType === "flexi" ? "FlexiFly" : "Standard"}
                        )
                      </span>
                      <span className="font-medium text-theme">
                        +${booking.fareAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {booking.internalAddonsAmount > 0 && (
                    <div className="flex justify-between text-body">
                      <span>Additional Services</span>
                      <span className="font-medium text-green-600">
                        +${booking.internalAddonsAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-bold text-lg">
                    <span className="text-dark">Total Amount</span>
                    <span className="text-theme">
                      ${totals.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleContinueToPayment}
                  disabled={loading}
                  className="flex items-center gap-3 bg-theme hover:bg-hover-dark text-white font-bold py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to Payment
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {/* Secure Checkout Notice */}
              <div className="flex items-center justify-center gap-2 text-sm text-light">
                <Shield className="w-4 h-4 text-theme" />
                <span>Secure checkout powered by SSL encryption</span>
                <Lock className="w-4 h-4 text-theme" />
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
};

export default ServicesAddOnsPage;
