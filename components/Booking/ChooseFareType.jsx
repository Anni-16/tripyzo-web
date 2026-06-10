"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

const ChooseFareType = ({ booking, setBooking }) => {
  const router = useRouter();
  const bookingId = booking?._id;

  const [selected, setSelected] = useState(booking?.fareType || "standard");
  const [loading, setLoading] = useState(false);

  const fares = {
    standard: {
      name: "Standard Service",
      price: 0,
      features: [
        { text: "Full airline change fees apply", allowed: false },
        { text: "Standard cancellation penalties", allowed: false },
        { text: "Seat selection at check-in", allowed: false },
        { text: "Standard baggage included", allowed: true },
      ],
    },
    flexi: {
      name: "FlexiFly Service",
      price: 49.99,
      features: [
        { text: "No change fees", allowed: true },
        { text: "Reduced cancellation fees", allowed: true },
        { text: "Free seat selection", allowed: true },
        { text: "Priority customer support", allowed: true },
      ],
    },
  };

  const handleFareSelect = async (fareId) => {
    setSelected(fareId);

    try {
      // Update backend
      const res = await axiosInstance.put(`/bookings/${bookingId}/fare`, {
        fareType: fareId,
      });

      // Update local booking state immediately
      if (setBooking) {
        setBooking(res.data.data);
      }
    } catch (err) {
      console.error("Fare update error:", err);
    }
  };

  const handleContinue = async () => {
    router.push(`/booking/${bookingId}/travellers`);
  };

  const FareCard = ({ id, fare, badge }) => (
    <div
      onClick={() => handleFareSelect(id)}
      className={`border rounded-xl p-6 cursor-pointer relative transition-all duration-300 hover:shadow-theme
      ${selected === id ? "border-theme shadow-theme" : "border-gray-200 hover:border-theme/30"}`}
    >
      {badge && (
        <span className="absolute -top-3 left-4 bg-theme text-white text-xs px-3 py-1 rounded-full font-medium">
          Most Popular
        </span>
      )}

      <div className="flex justify-between mb-3">
        <h3 className="font-semibold text-dark">{fare.name}</h3>
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${selected === id ? "border-theme" : "border-gray-300"}`}
        >
          {selected === id && (
            <div className="w-2.5 h-2.5 bg-theme rounded-full"></div>
          )}
        </div>
      </div>

      <p className="text-2xl font-bold text-theme mb-4">
        ${fare.price.toFixed(2)}
      </p>

      <ul className="space-y-3 text-sm">
        {fare.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-body">
            {f.allowed ? (
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-light flex-shrink-0 mt-0.5" />
            )}
            <span className={f.allowed ? "text-dark" : "text-light"}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="bg-white border border-gray-100 rounded-xl p-6 shadow-theme">
      <h2 className="text-lg font-heading font-semibold text-dark mb-6">
        Choose Your Fare Type
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <FareCard id="standard" fare={fares.standard} />
        <FareCard id="flexi" fare={fares.flexi} badge />
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleContinue}
          disabled={loading}
          className="bg-theme hover:bg-hover-dark text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          Continue to Traveller Info
          <span className="text-lg">→</span>
        </button>
      </div>
    </section>
  );
};

export default ChooseFareType;
