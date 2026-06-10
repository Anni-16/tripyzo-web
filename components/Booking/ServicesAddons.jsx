"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import {
  Luggage,
  Shield,
  Clock,
  TrendingDown,
  CheckCircle,
  Plus,
  Minus,
  AlertCircle,
  CreditCard,
  Globe,
  Headphones,
  Wifi,
} from "lucide-react";

export default function ServicesAddons({ booking, setBooking }) {
  const { bookingId } = useParams();

  const passengerCount = booking?.passengers?.length || 1;

  // Initialize from existing booking data if available
  const [addons, setAddons] = useState({
    extraBaggageOutbound: booking?.internalAddons?.extraBaggage?.outbound || 0,
    extraBaggageReturn: booking?.internalAddons?.extraBaggage?.return || 0,
    travelInsurance:
      booking?.internalAddons?.travelInsurance?.selected || false,
    tripProtection: booking?.internalAddons?.tripProtection?.selected || false,
    priceDropProtection:
      booking?.internalAddons?.priceDropProtection?.selected || false,
    autoCheckIn: booking?.internalAddons?.autoCheckIn?.selected || false,
  });

  // Update local state when booking changes
  useEffect(() => {
    if (booking?.internalAddons) {
      setAddons({
        extraBaggageOutbound:
          booking.internalAddons.extraBaggage?.outbound || 0,
        extraBaggageReturn: booking.internalAddons.extraBaggage?.return || 0,
        travelInsurance:
          booking.internalAddons.travelInsurance?.selected || false,
        tripProtection:
          booking.internalAddons.tripProtection?.selected || false,
        priceDropProtection:
          booking.internalAddons.priceDropProtection?.selected || false,
        autoCheckIn: booking.internalAddons.autoCheckIn?.selected || false,
      });
    }
  }, [booking]);

  /* ================= UPDATE ADDONS ================= */

  const updateAddons = async (updated) => {
    try {
      const res = await axiosInstance.post(
        `/bookings/${bookingId}/addons`,
        updated,
      );

      // Update booking state -> sidebar updates instantly
      setBooking(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleAddon = (key, value) => {
    const updated = { ...addons, [key]: value };
    setAddons(updated);
    updateAddons(updated);
  };

  const updateBaggage = (direction, type) => {
    const currentValue = addons[type];
    let newValue = currentValue;

    if (direction === "increase" && currentValue < 3) {
      newValue = currentValue + 1;
    } else if (direction === "decrease" && currentValue > 0) {
      newValue = currentValue - 1;
    }

    if (newValue !== currentValue) {
      toggleAddon(type, newValue);
    }
  };

  const baggagePrice =
    (addons.extraBaggageOutbound + addons.extraBaggageReturn) *
    50 *
    passengerCount;

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="bg-theme-light/50 p-6 rounded-xl border border-gray-100">
        <h2 className="text-2xl font-heading font-bold text-dark mb-2">
          Enhance Your Journey
        </h2>
        <p className="text-body">
          Add premium services to make your trip more comfortable and secure
        </p>
      </div>

      {/* ADDITIONAL BAGGAGE - REDESIGNED WITH ADD/REMOVE BUTTONS */}
      <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-theme hover:shadow-lg transition-all">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-theme-light rounded-full flex items-center justify-center flex-shrink-0">
            <Luggage className="w-6 h-6 text-theme" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-dark mb-1">
              Additional Baggage
            </h3>
            <p className="text-light text-sm mb-4">
              Need more luggage? Add extra checked bags for your journey at $50
              per bag.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Outbound Baggage */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-dark">
                    Outbound Flight
                  </span>
                  <span className="text-sm text-light">DEN → JFK</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateBaggage("decrease", "extraBaggageOutbound")
                      }
                      disabled={addons.extraBaggageOutbound === 0}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="text-xl font-bold w-8 text-center text-dark">
                      {addons.extraBaggageOutbound}
                    </span>

                    <button
                      onClick={() =>
                        updateBaggage("increase", "extraBaggageOutbound")
                      }
                      disabled={addons.extraBaggageOutbound >= 3}
                      className="w-8 h-8 rounded-full bg-theme text-white flex items-center justify-center hover:bg-hover-dark disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="font-semibold text-theme">
                    ${addons.extraBaggageOutbound * 50}
                  </span>
                </div>

                <p className="text-xs text-light mt-2">
                  Max 3 additional bags per passenger
                </p>
              </div>

              {/* Return Baggage */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-dark">Return Flight</span>
                  <span className="text-sm text-light">JFK → DEN</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateBaggage("decrease", "extraBaggageReturn")
                      }
                      disabled={addons.extraBaggageReturn === 0}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="text-xl font-bold w-8 text-center text-dark">
                      {addons.extraBaggageReturn}
                    </span>

                    <button
                      onClick={() =>
                        updateBaggage("increase", "extraBaggageReturn")
                      }
                      disabled={addons.extraBaggageReturn >= 3}
                      className="w-8 h-8 rounded-full bg-theme text-white flex items-center justify-center hover:bg-hover-dark disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="font-semibold text-theme">
                    ${addons.extraBaggageReturn * 50}
                  </span>
                </div>

                <p className="text-xs text-light mt-2">
                  Max 3 additional bags per passenger
                </p>
              </div>
            </div>

            {/* Total Baggage Price */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="font-medium text-body">Total Baggage Cost:</span>
              <span className="text-xl font-bold text-theme">
                ${baggagePrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* TRAVEL INSURANCE */}
      <AddonCard
        icon={<Shield className="w-6 h-6 text-green-600" />}
        title="Travel Insurance"
        description="Comprehensive coverage for trip cancellation, medical emergencies, and lost baggage"
        price={33 * passengerCount}
        value={addons.travelInsurance}
        onAdd={() => toggleAddon("travelInsurance", true)}
        onRemove={() => toggleAddon("travelInsurance", false)}
        features={[
          "Trip cancellation up to $5,000",
          "Emergency medical coverage",
          "Lost baggage protection",
          "24/7 assistance hotline",
        ]}
      />

      {/* TRIP PROTECTION */}
      <AddonCard
        icon={<Clock className="w-6 h-6 text-purple-600" />}
        title="Trip Protection Plan"
        description="Protect your investment with coverage for delays, interruptions, and missed connections"
        price={39 * passengerCount}
        value={addons.tripProtection}
        onAdd={() => toggleAddon("tripProtection", true)}
        onRemove={() => toggleAddon("tripProtection", false)}
        features={[
          "Trip delay reimbursement",
          "Missed connection coverage",
          "Baggage delay coverage",
          "Emergency evacuation",
        ]}
      />

      {/* PRICE DROP PROTECTION */}
      <AddonCard
        icon={<TrendingDown className="w-6 h-6 text-orange-600" />}
        title="Price Drop Protection"
        description="If the fare drops after booking, we'll refund the difference"
        price={21 * passengerCount}
        value={addons.priceDropProtection}
        onAdd={() => toggleAddon("priceDropProtection", true)}
        onRemove={() => toggleAddon("priceDropProtection", false)}
        features={[
          "Automatic price monitoring",
          "Refund up to $200 per ticket",
          "Valid until departure",
          "No claim forms needed",
        ]}
      />

      {/* AUTO CHECK-IN */}
      <AddonCard
        icon={<CheckCircle className="w-6 h-6 text-teal-600" />}
        title="Automatic Check-In"
        description="We'll check you in automatically and deliver your boarding passes"
        price={15 * passengerCount}
        value={addons.autoCheckIn}
        onAdd={() => toggleAddon("autoCheckIn", true)}
        onRemove={() => toggleAddon("autoCheckIn", false)}
        features={[
          "24-hour advance check-in",
          "Best seat selection",
          "Mobile boarding passes",
          "No waiting in lines",
        ]}
      />

      {/* Summary Section */}
      <div className="bg-theme-light/50 border border-gray-200 rounded-xl p-6">
        <h3 className="font-bold text-lg text-dark mb-3">
          Selected Services Summary
        </h3>
        <div className="space-y-2 text-sm">
          {addons.extraBaggageOutbound > 0 && (
            <div className="flex justify-between text-body">
              <span>Outbound baggage ({addons.extraBaggageOutbound} bags)</span>
              <span className="font-medium text-dark">
                ${addons.extraBaggageOutbound * 50 * passengerCount}
              </span>
            </div>
          )}
          {addons.extraBaggageReturn > 0 && (
            <div className="flex justify-between text-body">
              <span>Return baggage ({addons.extraBaggageReturn} bags)</span>
              <span className="font-medium text-dark">
                ${addons.extraBaggageReturn * 50 * passengerCount}
              </span>
            </div>
          )}
          {addons.travelInsurance && (
            <div className="flex justify-between text-body">
              <span>Travel Insurance</span>
              <span className="font-medium text-dark">
                ${33 * passengerCount}
              </span>
            </div>
          )}
          {addons.tripProtection && (
            <div className="flex justify-between text-body">
              <span>Trip Protection</span>
              <span className="font-medium text-dark">
                ${39 * passengerCount}
              </span>
            </div>
          )}
          {addons.priceDropProtection && (
            <div className="flex justify-between text-body">
              <span>Price Drop Protection</span>
              <span className="font-medium text-dark">
                ${21 * passengerCount}
              </span>
            </div>
          )}
          {addons.autoCheckIn && (
            <div className="flex justify-between text-body">
              <span>Automatic Check-In</span>
              <span className="font-medium text-dark">
                ${15 * passengerCount}
              </span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
            <span className="text-dark">Total Add-ons</span>
            <span className="text-theme">
              $
              {(
                (addons.extraBaggageOutbound + addons.extraBaggageReturn) *
                  50 *
                  passengerCount +
                (addons.travelInsurance ? 33 * passengerCount : 0) +
                (addons.tripProtection ? 39 * passengerCount : 0) +
                (addons.priceDropProtection ? 21 * passengerCount : 0) +
                (addons.autoCheckIn ? 15 * passengerCount : 0)
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= UPDATED ADDON CARD ================= */

function AddonCard({
  icon,
  title,
  description,
  price,
  value,
  onAdd,
  onRemove,
  features,
}) {
  return (
    <div
      className={`border rounded-xl p-6 bg-white shadow-theme hover:shadow-lg transition-all ${
        value ? "border-theme/30 bg-theme-light/30" : "border-gray-100"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
            value ? "bg-theme-light" : "bg-gray-100"
          }`}
        >
          {icon}
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
            <div>
              <h3 className="text-xl font-bold text-dark">{title}</h3>
              <p className="text-light text-sm mt-1 mb-3">{description}</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-2xl font-bold text-theme">
                ${price.toFixed(2)}
              </p>
              <p className="text-xs text-light">
                for {price > 0 ? "all passengers" : "free"}
              </p>
            </div>
          </div>

          {/* Features */}
          {features && (
            <div className="grid grid-cols-2 gap-2 mt-3 mb-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 text-xs text-body"
                >
                  <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-2">
            {!value ? (
              <button
                onClick={onAdd}
                className="flex items-center gap-2 bg-theme hover:bg-hover-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all hover:shadow-md"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </button>
            ) : (
              <button
                onClick={onRemove}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all hover:shadow-md"
              >
                <CheckCircle className="w-4 h-4" />
                Added
              </button>
            )}

            <button
              onClick={onRemove}
              className="border border-gray-200 hover:bg-gray-50 text-body px-6 py-2.5 rounded-lg font-medium transition-all"
            >
              No Thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
