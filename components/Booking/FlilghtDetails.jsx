"use client";

import Image from "next/image";
import { Plane, Clock, Briefcase, Ticket, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

const FlightDetails = ({ booking }) => {
  // ✅ ALL HOOKS MUST BE AT THE TOP LEVEL - before any conditional returns
  const [airports, setAirports] = useState({});

  const snapshot = booking?.offerSnapshot;

  // ✅ useEffect moved BEFORE the conditional return
  useEffect(() => {
    const fetchAirports = async () => {
      if (!snapshot?.slices) return; // Guard clause inside the effect

      const codes = [];
      snapshot.slices.forEach((slice) => {
        codes.push(slice.origin);
        codes.push(slice.destination);
      });

      const uniqueCodes = [...new Set(codes)];
      const airportMap = {};

      await Promise.all(
        uniqueCodes.map(async (code) => {
          try {
            const res = await axiosInstance.get(`/airports/iata/${code}`);
            airportMap[code] = res.data.data;
          } catch (err) {
            console.error("Airport fetch failed:", code);
          }
        }),
      );

      setAirports(airportMap);
    };

    fetchAirports();
  }, [snapshot?.slices]); // Depend on snapshot.slices

  // ✅ Early return AFTER all hooks
  if (!snapshot) {
    return (
      <section className="space-y-6">
        <div className="border border-gray-100 rounded-xl flex items-center justify-center shadow-theme bg-white overflow-hidden p-8 text-center text-body">
          Loading flight details...
        </div>
      </section>
    );
  }

  const { airline, slices, cabinClass, fareBrandName, baggageIncluded } =
    snapshot;

  /* ================= HELPERS ================= */

  const formatDuration = (duration) => {
    if (!duration) return "";
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    const h = match?.[1] || 0;
    const m = match?.[2] || 0;
    return `${h}h ${m}m`;
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDate = (date) =>
    new Date(date).toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  const getAirportName = (code) => {
    const airport = airports[code];
    if (!airport) return code;
    return `${airport.name}`;
  };

  const getAirportCity = (code) => {
    const airport = airports[code];
    if (!airport) return "";
    return `${airport.city}, ${airport.country}`;
  };

  const checked =
    baggageIncluded?.find((b) => b.type === "checked")?.quantity || 0;

  const cabin =
    baggageIncluded?.find((b) => b.type === "carry_on")?.quantity || 1;

  return (
    <section className="space-y-6">
      <div className="border border-gray-100 rounded-xl shadow-theme bg-white overflow-hidden">
        {/* HEADER */}
        <div className="bg-theme text-white font-semibold px-4 py-3 flex items-center justify-between">
          <span>Flight Summary</span>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
            {fareBrandName}
          </span>
        </div>

        <div className="p-5 md:p-6 space-y-6">
          {/* AIRLINE */}
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 bg-theme-light rounded-lg flex items-center justify-center p-2">
              <Image
                src={`https://images.kiwi.com/airlines/64/${airline?.code}.png`}
                alt={airline?.name}
                width={36}
                height={36}
                className="object-contain"
                onError={(e) => {
                  e.target.src = "https://images.kiwi.com/airlines/64/XX.png";
                }}
              />
            </div>

            <div>
              <p className="font-semibold text-dark">{airline?.name}</p>
              <p className="text-xs text-light uppercase">
                Cabin: {cabinClass}
              </p>
            </div>
          </div>

          {/* ================= SLICES ================= */}
          {slices?.map((slice, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-lg p-5 space-y-4"
            >
              {/* TITLE */}
              <div className="flex flex-wrap justify-between items-center border-b border-gray-100 pb-3 text-sm">
                <span className="font-semibold text-dark">
                  {i === 0 ? "Departure Flight" : "Return Flight"}
                </span>

                <span className="flex items-center gap-1 text-light">
                  <Clock className="w-4 h-4 text-theme" />
                  {formatDuration(slice.duration)}
                </span>
              </div>

              {/* ROUTE */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* DEPARTURE */}
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold text-dark">{slice.origin}</p>
                  <p className="text-xs text-body mt-1">
                    {getAirportName(slice.origin)}
                  </p>
                  <p className="text-[10px] text-light">
                    {getAirportCity(slice.origin)}
                  </p>
                  <p className="text-sm font-semibold text-dark mt-2">
                    {formatTime(slice.departureTime)}
                  </p>
                  <p className="text-xs text-light">
                    {formatDate(slice.departureTime)}
                  </p>
                </div>

                {/* FLIGHT PATH */}
                <div className="flex flex-col items-center px-4">
                  <Plane className="text-theme w-6 h-6 transform rotate-90" />
                  <div className="h-[2px] w-20 bg-gray-200 my-1"></div>
                  <span className="text-xs text-light">
                    Flight {slice.flightNumber}
                  </span>
                </div>

                {/* ARRIVAL */}
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold text-dark">
                    {slice.destination}
                  </p>
                  <p className="text-xs text-body mt-1">
                    {getAirportName(slice.destination)}
                  </p>
                  <p className="text-[10px] text-light">
                    {getAirportCity(slice.destination)}
                  </p>
                  <p className="text-sm font-semibold text-dark mt-2">
                    {formatTime(slice.arrivalTime)}
                  </p>
                  <p className="text-xs text-light">
                    {formatDate(slice.arrivalTime)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* ================= BAGGAGE ================= */}
          <div className="border border-gray-100 rounded-lg p-5 bg-theme-light space-y-3">
            <p className="font-semibold text-dark flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-theme" />
              Baggage Allowance
            </p>

            <div className="text-sm text-body space-y-1">
              <p>
                Cabin Bag:{" "}
                <span className="font-medium text-dark">
                  {cabin} piece per passenger
                </span>
              </p>
              <p>
                Checked Bag:{" "}
                <span className="font-medium text-dark">
                  {checked > 0
                    ? `${checked} bag included`
                    : "Not included in this fare"}
                </span>
              </p>
            </div>
          </div>

          {/* ================= WARNING ================= */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700">
              This flight offer is time-limited and may expire soon. Complete
              your booking to secure this price.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightDetails;
