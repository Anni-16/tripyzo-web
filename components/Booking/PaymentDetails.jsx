"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  CreditCard,
  Calendar,
  User,
  Lock,
} from "lucide-react";

const PaymentDetails = ({ booking }) => {
  const { bookingId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [payment, setPayment] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  // Check if booking is already confirmed and redirect
  useEffect(() => {
    if (booking?.bookingStatus === "confirmed" && booking?.bookingReference) {
      console.log(
        "📋 Booking already confirmed, redirecting to confirmation page...",
      );
      router.push(`/booking/confirmation/${booking.bookingReference}`);
    }
  }, [booking, router]);

  // Show loading if no booking data
  if (!booking) {
    return (
      <section className="border border-gray-100 rounded-xl shadow-theme bg-white overflow-hidden">
        <div className="p-8 text-center">
          <Loader2 className="w-12 h-12 text-theme animate-spin mx-auto mb-4" />
          <p className="text-body">Loading booking details...</p>
        </div>
      </section>
    );
  }

  // Check if booking is already confirmed
  const isBookingConfirmed = booking?.bookingStatus === "confirmed";

  // Calculate totals for modal using the same fields as BookingSidebar
  const calculateTotals = () => {
    if (!booking) return { subtotal: 0, addons: 0, fare: 0, total: 0 };

    const snapshot = booking.offerSnapshot;
    const baseFare = snapshot?.baseAmount || 0;
    const tax = snapshot?.taxAmount || 0;
    const fareAmount = booking?.fareAmount || 0;
    const addons = booking?.internalAddonsAmount || 0;

    // Calculate passenger count
    const passengerCount = booking.passengers?.length || 1;

    // Calculate subtotal (base + tax) per passenger
    const subtotal = (baseFare + tax) * passengerCount;

    return {
      subtotal: subtotal,
      addons: addons,
      fare: fareAmount,
      total: subtotal + addons + fareAmount,
    };
  };

  const totals = calculateTotals();

  const validateForm = () => {
    if (!payment.cardNumber || payment.cardNumber.length < 16) {
      alert("Please enter a valid card number");
      return false;
    }
    if (!payment.cardHolder) {
      alert("Please enter cardholder name");
      return false;
    }
    if (!payment.expiryMonth || !payment.expiryYear) {
      alert("Please select expiry date");
      return false;
    }
    if (!payment.cvv || payment.cvv.length < 3) {
      alert("Please enter a valid CVV");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent payment for already confirmed booking
    if (isBookingConfirmed) {
      alert(
        "This booking is already confirmed. Redirecting to confirmation page...",
      );
      router.push(`/booking/confirmation/${booking.bookingReference}`);
      return;
    }

    if (validateForm()) {
      setShowModal(true);
    }
  };

  // Function to verify booking is confirmed
  const verifyBookingConfirmation = async (bookingId, maxRetries = 5) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        console.log(`🔄 Verification attempt ${i + 1}/${maxRetries}...`);
        const verifyResponse = await axiosInstance.get(
          `/bookings/${bookingId}`,
        );
        const bookingData = verifyResponse.data?.data;

        if (
          bookingData?.bookingStatus === "confirmed" &&
          bookingData?.bookingReference
        ) {
          console.log("✅ Booking confirmed:", bookingData.bookingReference);
          return bookingData;
        }

        // Wait 1 second before next attempt
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.log(`❌ Verification attempt ${i + 1} failed:`, error.message);
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    return null;
  };

  const handleConfirmPayment = async () => {
    try {
      setProcessing(true);

      const payload = {
        ...payment,
        paymentMethod: "credit_card",
      };

      console.log("📤 Sending payment request for booking:", bookingId);

      const response = await axiosInstance.post(
        `/bookings/${bookingId}/payment-details`,
        payload,
      );

      console.log("📥 Payment response:", response.data);

      // Check if the response is successful
      if (response.data && response.data.success) {
        setShowModal(false);

        // Get the booking reference from response or from props
        const bookingReference =
          response.data.data?.bookingReference || booking?.bookingReference;

        console.log("🔑 Booking reference:", bookingReference);

        if (bookingReference) {
          // Show processing message
          setProcessing(true);

          // Verify booking is confirmed before redirecting
          console.log("🔍 Verifying booking confirmation...");
          const confirmedBooking = await verifyBookingConfirmation(
            bookingId,
            5,
          );

          if (confirmedBooking) {
            console.log(
              "✅ Booking verified, redirecting to confirmation page...",
            );
            router.push(
              `/booking/confirmation/${confirmedBooking.bookingReference}`,
            );
          } else {
            // If verification fails but we have a reference, redirect anyway
            console.log(
              "⚠️ Verification timeout, redirecting with existing reference...",
            );
            router.push(`/booking/confirmation/${bookingReference}`);
          }
        } else {
          console.error("❌ No booking reference found in response");

          // Try to fetch the booking to get the reference
          try {
            console.log("🔄 Attempting to fetch booking to get reference...");
            const fetchResponse = await axiosInstance.get(
              `/bookings/${bookingId}`,
            );
            const fetchedReference = fetchResponse.data?.data?.bookingReference;

            if (fetchedReference) {
              console.log(
                "✅ Found booking reference from fetch:",
                fetchedReference,
              );
              router.push(`/booking/confirmation/${fetchedReference}`);
            } else {
              alert(
                "Payment successful but couldn't get booking reference. Please check your email for confirmation.",
              );
            }
          } catch (fetchError) {
            console.error("❌ Error fetching booking:", fetchError);
            alert(
              "Payment successful but couldn't get booking reference. Please check your email for confirmation.",
            );
          }
        }
      } else {
        console.error("❌ Payment failed:", response.data);
        alert(response.data?.message || "Payment failed. Please try again.");
        setShowModal(false);
      }
    } catch (error) {
      console.error("❌ Payment error:", error);

      // Check if error is because booking is already confirmed
      if (
        error.response?.status === 400 &&
        error.response?.data?.message?.includes(
          "Cannot modify confirmed booking",
        )
      ) {
        alert(
          "This booking is already confirmed. Redirecting to confirmation page...",
        );
        // Try to redirect using existing booking reference
        if (booking?.bookingReference) {
          setTimeout(() => {
            router.push(`/booking/confirmation/${booking.bookingReference}`);
          }, 500);
        }
      } else {
        alert(
          error.response?.data?.message || "Failed to save payment details",
        );
      }
      setShowModal(false);
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  // If booking is already confirmed, show message and redirect button
  if (isBookingConfirmed) {
    return (
      <section className="border border-gray-100 rounded-xl shadow-theme bg-white overflow-hidden transition-all duration-300">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-base px-6 py-3">
          Booking Already Confirmed
        </div>
        <div className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-dark mb-2">
            This booking is already confirmed
          </h3>
          <p className="text-body mb-6">
            Your booking has been successfully completed. View your confirmation
            details below.
          </p>
          <button
            onClick={() =>
              router.push(`/booking/confirmation/${booking.bookingReference}`)
            }
            className="bg-theme hover:bg-hover-dark text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            View Confirmation
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border border-gray-100 rounded-xl shadow-theme bg-white overflow-hidden transition-all duration-300">
        {/* ===== Header ===== */}
        <div className="bg-theme text-white font-bold text-base px-6 py-3">
          Payment Info (Secure SSL Encrypted Transaction)
        </div>

        {/* ===== Form Content ===== */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* === Payment Methods Icons === */}
          <div className="flex flex-wrap items-center gap-4">
            <img
              src="/images/visa.png"
              alt="Visa"
              className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/mastercard.png"
              alt="MasterCard"
              className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/amex_card.svg"
              alt="Amex"
              className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/discover.png"
              alt="Discover"
              className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* === Card Details === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Card Number*"
                value={payment.cardNumber}
                onChange={(e) =>
                  setPayment({
                    ...payment,
                    cardNumber: e.target.value.replace(/\D/g, "").slice(0, 16),
                  })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-dark text-sm placeholder:text-light/60 focus:border-theme focus:ring-2 focus:ring-theme/20 transition-all bg-gray-50"
                required
                maxLength={16}
              />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Card Holder's Name*"
                value={payment.cardHolder}
                onChange={(e) =>
                  setPayment({ ...payment, cardHolder: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-dark text-sm placeholder:text-light/60 focus:border-theme focus:ring-2 focus:ring-theme/20 transition-all bg-gray-50"
                required
              />
            </div>
          </div>

          {/* === Expiry + CVV === */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="relative">
              <select
                required
                value={payment.expiryMonth}
                onChange={(e) =>
                  setPayment({ ...payment, expiryMonth: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-dark text-sm focus:border-theme focus:ring-2 focus:ring-theme/20 transition-all bg-gray-50 cursor-pointer appearance-none"
              >
                <option value="">Month*</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                required
                value={payment.expiryYear}
                onChange={(e) =>
                  setPayment({ ...payment, expiryYear: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-dark text-sm focus:border-theme focus:ring-2 focus:ring-theme/20 transition-all bg-gray-50 cursor-pointer appearance-none"
              >
                <option value="">Year*</option>
                {Array.from({ length: 15 }, (_, i) => (
                  <option key={i} value={2025 + i}>
                    {2025 + i}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="CVV*"
                value={payment.cvv}
                onChange={(e) =>
                  setPayment({
                    ...payment,
                    cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                  })
                }
                maxLength={4}
                className="w-full pl-10 pr-24 py-3 border border-gray-200 rounded-lg text-dark text-sm placeholder:text-light/60 focus:border-theme focus:ring-2 focus:ring-theme/20 transition-all bg-gray-50"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-xs text-light">
                <img
                  src="/images/visa-verification.jpg"
                  alt="CVV Hint"
                  className="h-5 w-auto"
                />
              </div>
            </div>
          </div>

          {/* === Policy Links === */}
          <div className="text-sm font-medium flex flex-wrap gap-6 mt-4 pt-4 border-t border-gray-100">
            <a
              href="/privacy-policy"
              target="_blank"
              className="text-theme hover:text-hover-dark hover:underline transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-conditions"
              target="_blank"
              className="text-theme hover:text-hover-dark hover:underline transition-colors"
            >
              Terms & Conditions
            </a>
          </div>

          {/* === Security Badge === */}
          <div className="flex items-center gap-2 text-xs text-light">
            <Lock className="w-4 h-4 text-theme" />
            <span>Your payment information is encrypted and secure</span>
          </div>

          {/* === Submit Button === */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || processing}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading || processing
                ? "Processing..."
                : "Review & Complete Booking"}
            </button>
          </div>
        </form>
      </section>

      {/* ===== CONFIRMATION MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl transform transition-all">
            {/* Modal Header */}
            <div className="bg-theme text-white px-6 py-4 rounded-t-2xl">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <CreditCard className="w-6 h-6" />
                Confirm Your Payment
              </h3>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Processing State */}
              {processing ? (
                <div className="text-center py-8">
                  <Loader2 className="w-16 h-16 text-theme animate-spin mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-dark mb-2">
                    Processing Your Payment
                  </h4>
                  <p className="text-body">
                    Please wait while we securely process your transaction...
                  </p>
                  <p className="text-sm text-light mt-4">
                    Verifying payment confirmation...
                  </p>
                </div>
              ) : (
                <>
                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-dark border-b border-gray-100 pb-2">
                      Payment Summary
                    </h4>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-body">
                          Base Fare + Taxes ({booking?.passengers?.length || 1}{" "}
                          passenger
                          {(booking?.passengers?.length || 1) > 1 ? "s" : ""})
                        </span>
                        <span className="font-medium text-dark">
                          ${totals.subtotal.toFixed(2)}
                        </span>
                      </div>

                      {totals.fare > 0 && (
                        <div className="flex justify-between">
                          <span className="text-body">
                            Fare Upgrade (
                            {booking?.fareType === "flexi"
                              ? "FlexiFly"
                              : "Standard"}
                            )
                          </span>
                          <span className="font-medium text-theme">
                            +${totals.fare.toFixed(2)}
                          </span>
                        </div>
                      )}

                      {totals.addons > 0 && (
                        <div className="flex justify-between">
                          <span className="text-body">Additional Services</span>
                          <span className="font-medium text-green-600">
                            +${totals.addons.toFixed(2)}
                          </span>
                        </div>
                      )}

                      {/* Show addon breakdown if available */}
                      {booking?.internalAddons && (
                        <div className="pt-1 pb-1 text-xs text-light space-y-1 border-t border-gray-100 mt-1">
                          {booking.internalAddons.extraBaggage?.price > 0 && (
                            <div className="flex justify-between">
                              <span>Extra baggage</span>
                              <span>
                                $
                                {booking.internalAddons.extraBaggage.price.toFixed(
                                  2,
                                )}
                              </span>
                            </div>
                          )}
                          {booking.internalAddons.travelInsurance?.selected && (
                            <div className="flex justify-between">
                              <span>Travel insurance</span>
                              <span>
                                $
                                {booking.internalAddons.travelInsurance.price.toFixed(
                                  2,
                                )}
                              </span>
                            </div>
                          )}
                          {booking.internalAddons.tripProtection?.selected && (
                            <div className="flex justify-between">
                              <span>Trip protection</span>
                              <span>
                                $
                                {booking.internalAddons.tripProtection.price.toFixed(
                                  2,
                                )}
                              </span>
                            </div>
                          )}
                          {booking.internalAddons.priceDropProtection
                            ?.selected && (
                            <div className="flex justify-between">
                              <span>Price drop protection</span>
                              <span>
                                $
                                {booking.internalAddons.priceDropProtection.price.toFixed(
                                  2,
                                )}
                              </span>
                            </div>
                          )}
                          {booking.internalAddons.autoCheckIn?.selected && (
                            <div className="flex justify-between">
                              <span>Auto check-in</span>
                              <span>
                                $
                                {booking.internalAddons.autoCheckIn.price.toFixed(
                                  2,
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between font-bold text-lg">
                          <span className="text-dark">Total to Pay</span>
                          <span className="text-theme">
                            ${totals.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold text-dark mb-2">
                      Card Details
                    </h4>
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-light" />
                      <span className="font-mono text-dark">
                        **** **** **** {payment.cardNumber.slice(-4)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-light" />
                      <span className="text-dark">{payment.cardHolder}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-light" />
                      <span className="text-dark">
                        {payment.expiryMonth}/{payment.expiryYear}
                      </span>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p>
                      By confirming, you agree to our terms and conditions and
                      authorize the charge of ${totals.total.toFixed(2)} to your
                      card.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            {!processing && (
              <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-body"
                >
                  <XCircle className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPayment}
                  className="flex items-center gap-2 px-6 py-2 bg-theme hover:bg-hover-dark text-white rounded-lg transition font-medium"
                >
                  <CheckCircle className="w-4 h-4" />
                  Confirm & Pay
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentDetails;
