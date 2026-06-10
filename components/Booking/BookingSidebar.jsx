"use client";

import { ShieldCheck } from "lucide-react";

export default function BookingSidebar({ booking }) {
  if (!booking) {
    return (
      <aside className="border border-gray-100 rounded-xl shadow-theme bg-white p-6">
        <p className="text-sm text-body text-center">
          Loading price details...
        </p>
      </aside>
    );
  }

  const snapshot = booking.offerSnapshot;

  const currency = snapshot?.currency || "USD";
  const baseFare = snapshot?.baseAmount || 0;
  const tax = snapshot?.taxAmount || 0;
  const fareAmount = booking?.fareAmount || 0;
  const fareType = booking?.fareType || "standard";
  const addons = booking?.internalAddonsAmount || 0;
  const total = booking?.totalAmount || snapshot?.totalAmount || 0;

  // Calculate per-person breakdown if needed
  const passengerCount = booking.passengers?.length || 1;

  return (
    <aside className="space-y-6">
      {/* PRICE DETAILS */}
      <div className="border border-gray-100 rounded-xl shadow-theme bg-white overflow-hidden">
        <div className="bg-theme text-white font-semibold text-base px-5 py-3">
          Price Details
        </div>

        <div className="p-5 space-y-3 text-dark text-sm">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-body">
              Flight Base Fare ({passengerCount} passenger
              {passengerCount > 1 ? "s" : ""})
            </span>
            <span className="font-semibold text-dark">
              {currency} {baseFare.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-body">Taxes & Fees</span>
            <span className="font-semibold text-dark">
              {currency} {tax.toFixed(2)}
            </span>
          </div>

          {fareAmount > 0 && (
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-body">
                {fareType === "flexi" ? "FlexiFly Service" : "Fare Upgrade"}
              </span>
              <span className="font-semibold text-dark">
                {currency} {fareAmount.toFixed(2)}
              </span>
            </div>
          )}

          {addons > 0 && (
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-body">Additional Services</span>
              <span className="font-semibold text-dark">
                {currency} {addons.toFixed(2)}
              </span>
            </div>
          )}

          {/* Show addon breakdown if needed */}
          {booking.internalAddons && (
            <div className="pt-1 pb-1 text-xs text-light space-y-1">
              {booking.internalAddons.extraBaggage?.price > 0 && (
                <div className="flex justify-between">
                  <span>Extra baggage</span>
                  <span>
                    {currency}{" "}
                    {booking.internalAddons.extraBaggage.price.toFixed(2)}
                  </span>
                </div>
              )}
              {booking.internalAddons.travelInsurance?.selected && (
                <div className="flex justify-between">
                  <span>Travel insurance</span>
                  <span>
                    {currency}{" "}
                    {booking.internalAddons.travelInsurance.price.toFixed(2)}
                  </span>
                </div>
              )}
              {booking.internalAddons.tripProtection?.selected && (
                <div className="flex justify-between">
                  <span>Trip protection</span>
                  <span>
                    {currency}{" "}
                    {booking.internalAddons.tripProtection.price.toFixed(2)}
                  </span>
                </div>
              )}
              {booking.internalAddons.priceDropProtection?.selected && (
                <div className="flex justify-between">
                  <span>Price drop protection</span>
                  <span>
                    {currency}{" "}
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
                    {currency}{" "}
                    {booking.internalAddons.autoCheckIn.price.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-3 mt-2">
            <span className="text-dark">Total Price</span>
            <span className="text-theme">
              {currency} {total.toFixed(2)}
            </span>
          </div>

          <p className="text-xs text-light mt-3 border-t border-gray-100 pt-3">
            * All taxes and fees included
          </p>
        </div>
      </div>

      {/* SECURITY */}
      <div className="border border-gray-100 rounded-xl shadow-theme bg-white overflow-hidden">
        <div className="bg-theme text-white font-semibold text-base px-5 py-3">
          Secure SSL Booking
        </div>

        <div className="p-6 text-center space-y-3">
          <ShieldCheck className="w-12 h-12 text-green-600 mx-auto" />
          <p className="text-body text-sm font-medium">
            Your transaction is protected by 256-bit SSL encryption for a safe
            and secure booking experience.
          </p>
        </div>
      </div>
    </aside>
  );
}
