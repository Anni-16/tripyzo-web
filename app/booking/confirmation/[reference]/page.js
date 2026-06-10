"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";
import Navbar from "@/components/Headers/Navbar";
import Footer from "@/components/Footer";
import {
  CheckCircle,
  Download,
  Mail,
  Printer,
  Plane,
  Clock,
  Calendar,
  User,
  CreditCard,
  Luggage,
  Shield,
  MapPin,
  Phone,
  Mail as MailIcon,
  ArrowRight,
  Loader2,
  XCircle,
} from "lucide-react";

export default function BookingConfirmationPage() {
  const { reference } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/bookings/reference/${reference}`);
        setBooking(res.data.data);
        setError(null);
        console.log("Booking data:", res.data.data);
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError("Failed to load booking details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (reference) {
      fetchBooking();
    }
  }, [reference]);

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (duration) => {
    if (!duration) return "N/A";
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    const hours = match?.[1] || "0";
    const minutes = match?.[2] || "0";
    return `${hours}h ${minutes}m`;
  };

  // Loading State
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-theme animate-spin mx-auto mb-4" />
            <p className="text-body font-medium">
              Loading your booking confirmation...
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
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-dark mb-2">
                Booking Not Found
              </h2>
              <p className="text-sm text-body mb-4">
                {error ||
                  `We couldn't find a booking with reference "${reference}"`}
              </p>
              <Link
                href="/"
                className="inline-block bg-theme hover:bg-hover-dark text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const snapshot = booking.offerSnapshot;
  const airline = snapshot?.airline;
  const slices = snapshot?.slices || [];
  const passengers = booking.passengers || [];
  const paymentDetails = booking.paymentDetails;

  return (
    <>
      <Navbar />

      <main className="bg-theme-light/30 min-h-screen py-8 md:py-10 lg:py-12">
        <div className="container-custom">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-body max-w-2xl mx-auto">
              Your booking has been successfully completed. A confirmation email
              has been sent to {booking.contactInfo?.email || "your email"}.
            </p>
          </div>

          {/* Booking Reference Card */}
          <div className="bg-theme  rounded-xl p-6 mb-8 text-white shadow-theme">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-white/80 text-sm mb-1">Booking Reference</p>
                <p className="text-3xl font-bold font-mono tracking-wider">
                  {booking.bookingReference}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition">
                  <Download className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Flight Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Flight Details Card */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-theme overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-lg text-dark flex items-center gap-2">
                    <Plane className="w-5 h-5 text-theme" />
                    Flight Details
                  </h2>
                </div>

                <div className="p-6">
                  {/* Airline Info */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-12 h-12 bg-theme-light rounded-lg flex items-center justify-center p-2">
                      <img
                        src={`https://images.kiwi.com/airlines/64/${airline?.code}.png`}
                        alt={airline?.name}
                        className="w-8 h-8 object-contain"
                        onError={(e) =>
                          (e.target.src =
                            "https://images.kiwi.com/airlines/64/XX.png")
                        }
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-dark">{airline?.name}</p>
                      <p className="text-sm text-light">
                        Flight {slices[0]?.flightNumber}
                      </p>
                    </div>
                  </div>

                  {/* Flight Segments */}
                  {slices.map((slice, index) => (
                    <div
                      key={index}
                      className={
                        index > 0 ? "mt-6 pt-6 border-t border-gray-100" : ""
                      }
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-theme bg-theme-light px-3 py-1 rounded-full">
                          {index === 0 ? "Outbound Flight" : "Return Flight"}
                        </span>
                        <span className="text-sm text-light flex items-center gap-1">
                          <Clock className="w-4 h-4 text-theme" />
                          {formatDuration(slice.duration)}
                        </span>
                      </div>

                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Departure */}
                        <div className="text-center flex-1">
                          <p className="text-2xl font-bold text-dark">
                            {slice.origin}
                          </p>
                          <p className="text-sm font-medium text-body mt-1">
                            {formatTime(slice.departureTime)}
                          </p>
                          <p className="text-xs text-light mt-1">
                            {formatDate(slice.departureTime)}
                          </p>
                        </div>

                        {/* Flight Path */}
                        <div className="flex-1 mx-4">
                          <div className="relative">
                            <div className="h-0.5 bg-gray-200 w-full"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-lg text-xs text-body border border-gray-100 shadow-sm">
                              {formatDuration(slice.duration)}
                            </div>
                          </div>
                          <p className="text-xs text-center text-light mt-2">
                            Flight {slice.flightNumber}
                          </p>
                        </div>

                        {/* Arrival */}
                        <div className="text-center flex-1">
                          <p className="text-2xl font-bold text-dark">
                            {slice.destination}
                          </p>
                          <p className="text-sm font-medium text-body mt-1">
                            {formatTime(slice.arrivalTime)}
                          </p>
                          <p className="text-xs text-light mt-1">
                            {formatDate(slice.arrivalTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Passenger Details Card */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-theme overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-lg text-dark flex items-center gap-2">
                    <User className="w-5 h-5 text-theme" />
                    Passenger Details
                  </h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {passengers.map((passenger, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-start justify-between py-3 border-b border-gray-100 last:border-0"
                      >
                        <div>
                          <p className="font-medium text-dark">
                            {passenger.title} {passenger.firstName}{" "}
                            {passenger.lastName}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-light">
                            <span className="capitalize">{passenger.type}</span>
                            <span className="w-1 h-1 bg-light rounded-full"></span>
                            <span>
                              DOB:{" "}
                              {new Date(
                                passenger.dateOfBirth,
                              ).toLocaleDateString()}
                            </span>
                            <span className="w-1 h-1 bg-light rounded-full"></span>
                            <span>
                              Nationality:{" "}
                              {passenger.nationality?.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-body mt-1 sm:mt-0">
                          {passenger.gender === "male"
                            ? "Male"
                            : passenger.gender === "female"
                              ? "Female"
                              : ""}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Contact Info */}
                  {booking.contactInfo && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h3 className="font-medium text-dark mb-2">
                        Contact Information
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-3 text-sm text-body">
                        <div className="flex items-center gap-2">
                          <MailIcon className="w-4 h-4 text-theme" />
                          <span>{booking.contactInfo.email || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-theme" />
                          <span>{booking.contactInfo.phone}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Payment & Summary */}
            <div className="space-y-6">
              {/* Price Summary Card */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-theme overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-lg text-dark">
                    Payment Summary
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-body">Base Fare</span>
                      <span className="font-medium text-dark">
                        ${snapshot?.baseAmount?.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-body">Taxes & Fees</span>
                      <span className="font-medium text-dark">
                        ${snapshot?.taxAmount?.toFixed(2)}
                      </span>
                    </div>

                    {booking.fareAmount > 0 && (
                      <div className="flex justify-between text-theme">
                        <span>
                          Fare Upgrade (
                          {booking.fareType === "flexi"
                            ? "FlexiFly"
                            : "Standard"}
                          )
                        </span>
                        <span className="font-medium">
                          +${booking.fareAmount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/* Addons Breakdown */}
                    {booking.internalAddonsAmount > 0 && (
                      <>
                        <div className="border-t border-gray-100 pt-2 mt-2"></div>
                        <div className="space-y-1 text-xs">
                          {booking.internalAddons?.extraBaggage?.price > 0 && (
                            <div className="flex justify-between text-body">
                              <span>
                                Extra Baggage (
                                {booking.internalAddons.extraBaggage.outbound +
                                  booking.internalAddons.extraBaggage
                                    .return}{" "}
                                bags)
                              </span>
                              <span>
                                $
                                {booking.internalAddons.extraBaggage.price.toFixed(
                                  2,
                                )}
                              </span>
                            </div>
                          )}
                          {booking.internalAddons?.travelInsurance
                            ?.selected && (
                            <div className="flex justify-between text-body">
                              <span>Travel Insurance</span>
                              <span>
                                $
                                {booking.internalAddons.travelInsurance.price.toFixed(
                                  2,
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-dark">Total Paid</span>
                        <span className="text-theme">
                          ${booking.totalAmount?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  {paymentDetails && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-dark mb-2 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-theme" />
                        Payment Method
                      </h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-light">Card Holder</span>
                          <span className="font-medium text-dark">
                            {paymentDetails.cardHolder}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-light">Card Number</span>
                          <span className="font-mono text-dark">
                            {paymentDetails.maskedCardNumber}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-light">Expires</span>
                          <span className="text-dark">
                            {paymentDetails.expiryMonth}/
                            {paymentDetails.expiryYear}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Baggage Info Card */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-theme overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-lg text-dark flex items-center gap-2">
                    <Luggage className="w-5 h-5 text-theme" />
                    Baggage Allowance
                  </h2>
                </div>

                <div className="p-6 space-y-3">
                  {snapshot?.baggageIncluded?.map((bag, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-body capitalize">
                        {bag.type} Baggage
                      </span>
                      <span className="font-medium text-dark">
                        {bag.quantity > 0
                          ? `${bag.quantity} piece${bag.quantity > 1 ? "s" : ""} included`
                          : "Not included"}
                      </span>
                    </div>
                  ))}

                  {booking.internalAddons?.extraBaggage?.price > 0 && (
                    <div className="border-t border-gray-100 pt-3 mt-3">
                      <p className="text-sm text-theme font-medium">
                        +{" "}
                        {booking.internalAddons.extraBaggage.outbound +
                          booking.internalAddons.extraBaggage.return}{" "}
                        additional bag(s) purchased
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button className="w-full flex items-center justify-center gap-2 bg-theme hover:bg-hover-dark text-white font-semibold py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg">
                  <Download className="w-4 h-4" />
                  Download E-Ticket
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg">
                  <Mail className="w-4 h-4" />
                  Email Confirmation
                </button>
                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg"
                >
                  Book Another Flight
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Security Badge */}
              <div className="text-center text-xs text-light pt-4">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-theme" />
                  <span>Your booking is confirmed and secured</span>
                </div>
                <p className="mt-1 font-mono text-dark">
                  Ref: {booking.bookingReference}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
