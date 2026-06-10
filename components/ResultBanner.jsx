"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaExchangeAlt,
} from "react-icons/fa";
import { format } from "date-fns";
import FlightSearchForm from "./FlightSearchForm";
import { useFlight } from "@/context/FlightContext";

const ResultBanner = () => {
  const { searchData: contextSearchData } = useFlight();
  const [showModifySearch, setShowModifySearch] = useState(false);
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    // First try to get data from context (for deal clicks)
    if (contextSearchData && Object.keys(contextSearchData).length > 0) {
      console.log("Using context search data:", contextSearchData);
      setSearchData(contextSearchData);
      return;
    }

    // If no context data, try URL params (for form searches)
    const searchParams = new URLSearchParams(window.location.search);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const departureDate = searchParams.get("departureDate");
    const returnDate = searchParams.get("returnDate");

    if (from && to && departureDate) {
      setSearchData({
        fromDisplay: from,
        toDisplay: to,
        departureDate: departureDate,
        returnDate: returnDate,
        tripType: returnDate ? "roundtrip" : "oneway",
        cabinClass: "economy",
        passengers: { adults: 1, children: 0, infants: 0 },
      });
    }
  }, [contextSearchData]);

  // If no search data yet, show loading state
  if (!searchData) {
    return (
      <div className="bg-gradient-to-r from-theme to-hover-dark py-8 lg:py-12">
        <div className="container-custom text-center text-white">
          <h1 className="text-2xl font-bold">Flight Search Results</h1>
          <p className="mt-2">Loading search details...</p>
        </div>
      </div>
    );
  }

  const {
    fromDisplay = "JFK - New York",
    toDisplay = "LAX - Los Angeles",
    departureDate = "",
    returnDate = null,
    tripType = "roundtrip",
    cabinClass = "economy",
    passengers = { adults: 1, children: 0, infants: 0 },
  } = searchData;

  // Calculate total passengers
  const passengerCount =
    (passengers.adults || 0) +
    (passengers.children || 0) +
    (passengers.infants || 0);

  // Format trip type for display
  const tripTypeDisplay = tripType === "roundtrip" ? "Round Trip" : "One Way";

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return dateString;
    }
  };

  // Extract airport codes and cities
  const getAirportCode = (display) => {
    if (!display) return "---";
    const match = display.match(/^([A-Z]{3})/);
    return match ? match[1] : display;
  };

  const getCityName = (display) => {
    if (!display) return "";
    const parts = display.split(" - ");
    return parts.length > 1 ? parts[1].split(",")[0] : display;
  };

  const fromCode = getAirportCode(fromDisplay);
  const toCode = getAirportCode(toDisplay);
  const fromCity = getCityName(fromDisplay);
  const toCity = getCityName(toDisplay);

  // Format cabin class
  const cabinClassDisplay = cabinClass
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="bg-theme py-8 lg:py-12 relative">
      <div className="relative z-10 container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-white/40">/</span>
          <Link href="/flights" className="hover:text-white transition-colors">
            Flights
          </Link>
          <span className="text-white/40">/</span>
          <span className="text-white">Search Results</span>
        </div>

        {/* Search Summary Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-white/20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
            {/* Flight Route Summary */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-6 w-full lg:w-auto">
              {/* From */}
              <div className="flex items-center gap-2 lg:gap-3 flex-1 lg:flex-auto">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg lg:rounded-xl flex items-center justify-center shrink-0">
                  <FaPlaneDeparture className="text-lg lg:text-2xl text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-white/70">From</div>
                  <div className="text-base lg:text-xl font-bold text-white truncate">
                    {fromCode}
                  </div>
                  <div className="text-xs text-white/70 truncate max-w-[120px] lg:max-w-[150px]">
                    {fromCity}
                  </div>
                </div>
              </div>

              {/* Flight Path Icon */}
              <div className="hidden lg:block">
                <FaExchangeAlt className="text-white/50 rotate-90" />
              </div>

              {/* To */}
              <div className="flex items-center gap-2 lg:gap-3 flex-1 lg:flex-auto">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg lg:rounded-xl flex items-center justify-center shrink-0">
                  <FaPlaneArrival className="text-lg lg:text-2xl text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-white/70">To</div>
                  <div className="text-base lg:text-xl font-bold text-white truncate">
                    {toCode}
                  </div>
                  <div className="text-xs text-white/70 truncate max-w-[120px] lg:max-w-[150px]">
                    {toCity}
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 lg:gap-3 lg:border-l lg:border-white/20 lg:pl-4 flex-1 lg:flex-auto">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg lg:rounded-xl flex items-center justify-center shrink-0">
                  <FaCalendarAlt className="text-lg lg:text-2xl text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-white/70">{tripTypeDisplay}</div>
                  <div className="text-sm lg:text-base font-semibold text-white truncate">
                    {formatDate(departureDate)}
                  </div>
                  {tripType === "roundtrip" && returnDate && (
                    <div className="text-xs text-white/70 truncate">
                      Return: {formatDate(returnDate)}
                    </div>
                  )}
                </div>
              </div>

              {/* Passengers & Class */}
              <div className="flex items-center gap-2 lg:gap-3 lg:border-l lg:border-white/20 lg:pl-4 flex-1 lg:flex-auto">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg lg:rounded-xl flex items-center justify-center shrink-0">
                  <FaUser className="text-lg lg:text-2xl text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-white/70">Travelers</div>
                  <div className="text-sm lg:text-base font-semibold text-white">
                    {passengerCount}{" "}
                    {passengerCount > 1 ? "Travelers" : "Traveler"}
                  </div>
                  <div className="text-xs text-white/70 truncate">
                    {cabinClassDisplay}
                  </div>
                </div>
              </div>
            </div>

            {/* Modify Search Button */}
            <button
              onClick={() => setShowModifySearch(!showModifySearch)}
              className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 bg-white text-theme rounded-lg font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <FaSearch className="text-sm group-hover:scale-110 transition-transform" />
              <span>Modify Search</span>
              {showModifySearch ? (
                <FaChevronUp className="text-sm" />
              ) : (
                <FaChevronDown className="text-sm" />
              )}
            </button>
          </div>
        </div>

        {/* Modify Search Form - Collapsible */}
        <div
          className={`mt-4 transition-all duration-500 ease-in-out overflow-hidden ${
            showModifySearch
              ? "max-h-[800px] opacity-100 pointer-events-auto"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-2xl p-4 lg:p-6">
            <Suspense
              fallback={
                <div className="text-center py-8">
                  <div className="inline-block w-8 h-8 border-4 border-theme border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-body mt-2">Loading search form...</p>
                </div>
              }
            >
              <FlightSearchForm
                isResultsPage={true}
                initialValues={{
                  from: fromDisplay,
                  to: toDisplay,
                  startDate: departureDate,
                  endDate: returnDate,
                  tripType: tripType === "roundtrip" ? "Roundtrip" : "One Way",
                  travelClass: cabinClassDisplay,
                  passengers: passengers,
                }}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultBanner;
