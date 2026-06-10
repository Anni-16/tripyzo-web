"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Plane,
  ChevronDown,
  ChevronUp,
  Clock,
  Wifi,
  Utensils,
  Tv,
  ArrowRight,
  MapPin,
  Users,
  Calendar,
  Shield,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Leaf,
  Luggage,
  RefreshCcw,
  Ban,
  Loader2,
  Briefcase,
  Package,
  AlertCircle,
  Info,
  PlaneTakeoff,
} from "lucide-react";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useFlight } from "@/context/FlightContext";
import airportData from "@/data/airports.json";
import NoFlightsFound from "./NoResult";
import axiosInstance from "@/lib/axiosInstance";
import { useAuth } from "@/context/AuthContext";

export default function FlightCard() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingFlightId, setLoadingFlightId] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [isBookingAuthChecking, setIsBookingAuthChecking] = useState(false);
  const pendingBookingProcessed = useRef(false);

  const flightsPerPage = 12;
  const router = useRouter();
  const pathname = usePathname();

  // Get auth state
  const { user, loading: authLoading } = useAuth();

  const {
    results = [],
    filteredResults = [],
    searchData,
    setSelectedFlight,
  } = useFlight();

  // Ensure component only renders after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Determine which results to display
  const displayResults = useMemo(() => {
    const source = filteredResults?.length > 0 ? filteredResults : results;
    return Array.isArray(source) ? source : [];
  }, [filteredResults, results]);

  // Helper function to safely get string value from any input
  const safeString = (value, fallback = "") => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === "string") return value;
    if (typeof value === "number") return value.toString();
    if (typeof value === "object") {
      if (value.name) return value.name;
      if (value.iata_code) return value.iata_code;
      if (value.code) return value.code;
      if (value.id) return value.id;
      return fallback;
    }
    return fallback;
  };

  // Safe airport name lookup
  const findAirportName = useCallback((iata) => {
    if (!iata || typeof iata !== "string") return "Unknown Airport";

    try {
      const airport = airportData.find((a) => {
        if (typeof a === "string") {
          return a.startsWith(iata);
        } else if (a && typeof a === "object") {
          return a.iata_code === iata;
        }
        return false;
      });

      if (!airport) return iata;

      if (typeof airport === "string") {
        const parts = airport.split("-");
        if (parts.length > 1) {
          const namePart = parts[1].split(",")[0].trim();
          return namePart || parts[1].trim();
        }
        return iata;
      }

      if (airport && typeof airport === "object") {
        return airport.name || airport.city_name || airport.city || iata;
      }

      return iata;
    } catch (error) {
      console.error("Error finding airport name:", error);
      return iata;
    }
  }, []);

  // Format duration from PT format
  const formatDuration = useCallback((duffelDuration) => {
    if (!duffelDuration || typeof duffelDuration !== "string") return "N/A";
    const match = duffelDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return duffelDuration;
    const hours = match[1] ? `${match[1]}h ` : "";
    const mins = match[2] ? `${match[2]}m` : "";
    return `${hours}${mins}`.trim() || "0m";
  }, []);

  // Format date time
  const formatDateTime = useCallback((dateTimeStr) => {
    if (!dateTimeStr) return "N/A";
    try {
      const date = new Date(dateTimeStr);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "N/A";
    }
  }, []);

  // Format date
  const formatDate = useCallback((dateTimeStr) => {
    if (!dateTimeStr) return "N/A";
    try {
      const date = new Date(dateTimeStr);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  }, []);

  // Calculate total price
  const calculateTotalPrice = useCallback(
    (flight) => {
      if (!flight) return "0.00";

      const basePrice = parseFloat(
        flight.total_amount || flight.base_amount || 0,
      );
      const totalPassengers = searchData?.passengers
        ? (searchData.passengers.adults || 0) +
          (searchData.passengers.children || 0) +
          (searchData.passengers.infants || 0)
        : 1;

      return (basePrice * totalPassengers).toFixed(2);
    },
    [searchData],
  );

  // Get total stops
  const getTotalStops = useCallback((slices) => {
    if (!Array.isArray(slices)) return 0;
    return slices.reduce((total, slice) => {
      return total + Math.max(0, (slice.segments?.length || 1) - 1);
    }, 0);
  }, []);

  // Get airline info safely
  const getAirlineInfo = useCallback((flight, sliceIndex = 0) => {
    const defaultInfo = {
      name: "Airline",
      code: "XX",
      logo: "https://images.kiwi.com/airlines/64/XX.png",
    };

    if (!flight) return defaultInfo;

    if (flight.owner && typeof flight.owner === "object") {
      const owner = flight.owner;
      return {
        name: safeString(owner.name, "Airline"),
        code: safeString(owner.iata_code, "XX"),
        logo:
          owner.logo_symbol_url ||
          `https://images.kiwi.com/airlines/64/${owner.iata_code || "XX"}.png`,
      };
    }

    const slices = flight.slices || [];
    const slice = slices[sliceIndex];

    if (slice?.segments?.[0]?.operating_carrier) {
      const carrier = slice.segments[0].operating_carrier;
      if (typeof carrier === "object") {
        return {
          name: safeString(carrier.name, "Airline"),
          code: safeString(carrier.iata_code, "XX"),
          logo:
            carrier.logo_symbol_url ||
            `https://images.kiwi.com/airlines/64/${carrier.iata_code || "XX"}.png`,
        };
      }
    }

    if (slice?.segments?.[0]?.marketing_carrier) {
      const carrier = slice.segments[0].marketing_carrier;
      if (typeof carrier === "object") {
        return {
          name: safeString(carrier.name, "Airline"),
          code: safeString(carrier.iata_code, "XX"),
          logo:
            carrier.logo_symbol_url ||
            `https://images.kiwi.com/airlines/64/${carrier.iata_code || "XX"}.png`,
        };
      }
    }

    return defaultInfo;
  }, []);

  // Handle image error
  const handleImageError = useCallback((airlineCode) => {
    setImageErrors((prev) => ({ ...prev, [airlineCode]: true }));
  }, []);

  // Get baggage info
  const getBaggageInfo = useCallback((passenger) => {
    if (!passenger?.baggages) return { cabin: 1, checked: 0 };

    const checked =
      passenger.baggages.find((b) => b.type === "checked")?.quantity || 0;
    const cabin =
      passenger.baggages.find((b) => b.type === "cabin")?.quantity || 1;

    return { cabin, checked };
  }, []);

  // Handle booking - Now with proper auth check
  const handleBookNow = async (flight) => {
    try {
      setIsBookingAuthChecking(true);

      // Set loading state for this flight
      const flightKey = flight.id || flight.offerId || Date.now().toString();
      setLoadingFlightId(flightKey);

      // Check if user is authenticated by checking token
      const token = localStorage.getItem("token");

      if (!token) {
        // console.log("No token found, redirecting to login");
        sessionStorage.setItem(
          "pendingBooking",
          JSON.stringify({
            flight: flight,
            timestamp: Date.now(),
          }),
        );
        sessionStorage.setItem("redirectAfterLogin", pathname);
        router.push("/login");
        return;
      }

      // Verify token is valid by making a quick request
      try {
        await axiosInstance.get("/auth/me", {
          timeout: 3000,
        });
      } catch (authErr) {
        // console.log("Token validation failed:", authErr.response?.status);
        // Clear invalid token
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        sessionStorage.setItem(
          "pendingBooking",
          JSON.stringify({
            flight: flight,
            timestamp: Date.now(),
          }),
        );
        sessionStorage.setItem("redirectAfterLogin", pathname);
        router.push("/login");
        return;
      }

      // Authenticated - proceed with booking
      const res = await axiosInstance.post("/bookings/draft", {
        offer: flight,
      });

      const bookingId = res?.data?.data?._id;
      if (bookingId) {
        router.push(`/booking/${bookingId}`);
      }
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);

      // Handle 401 specifically
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        sessionStorage.setItem(
          "pendingBooking",
          JSON.stringify({
            flight: flight,
            timestamp: Date.now(),
          }),
        );
        router.push("/login");
      }
    } finally {
      setLoadingFlightId(null);
      setIsBookingAuthChecking(false);
    }
  };

  // Update the pending booking useEffect
  useEffect(() => {
    const processPendingBooking = async () => {
      // Check if we have a token
      const token = localStorage.getItem("token");
      if (!token) return;

      const pendingBooking = sessionStorage.getItem("pendingBooking");
      if (!pendingBooking) return;

      try {
        sessionStorage.removeItem("pendingBooking");
        const { flight } = JSON.parse(pendingBooking);

        const res = await axiosInstance.post("/bookings/draft", {
          offer: flight,
        });

        const bookingId = res?.data?.data?._id;
        if (bookingId) {
          router.push(`/booking/${bookingId}`);
        }
      } catch (err) {
        console.error("Error processing pending booking:", err);
      }
    };

    processPendingBooking();
  }, [router]);

  // Pagination
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = displayResults.slice(
    indexOfFirstFlight,
    indexOfLastFlight,
  );
  const totalPages = Math.max(
    1,
    Math.ceil(displayResults.length / flightsPerPage),
  );

  // Get visible pages for pagination
  const getVisiblePages = useCallback(() => {
    const visiblePages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
    } else {
      visiblePages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) end = 4;
      if (currentPage >= totalPages - 2) start = totalPages - 3;

      if (start > 2) visiblePages.push("ellipsis-start");
      for (let i = start; i <= end; i++) visiblePages.push(i);
      if (end < totalPages - 1) visiblePages.push("ellipsis-end");
      visiblePages.push(totalPages);
    }

    return visiblePages;
  }, [currentPage, totalPages]);

  // Amenity Icon Component
  const AmenityIcon = ({ amenity }) => {
    const icons = {
      WiFi: <Wifi className="w-3 h-3" />,
      Meal: <Utensils className="w-3 h-3" />,
      Entertainment: <Tv className="w-3 h-3" />,
    };

    return (
      <div
        className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-100 rounded-lg shadow-xs"
        title={amenity}
      >
        {icons[amenity] || amenity}
        <span className="text-xs font-medium text-light">{amenity}</span>
      </div>
    );
  };

  // ✅ FIXED: Show flights immediately, don't wait for auth
  // Only show loading for hydration
  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center py-24 text-center">
        <Loader2 className="w-6 h-6 text-theme animate-spin" />
        <p className="ml-3 text-body font-semibold">Loading flights...</p>
      </div>
    );
  }

  // No flights state
  if (!displayResults || displayResults.length === 0) {
    return <NoFlightsFound />;
  }

  // Cheapest price among all results
  const cheapestPrice = Math.min(
    ...displayResults.map((f) =>
      parseFloat(f.total_amount || f.base_amount || 0),
    ),
  );

  // Fastest duration (in minutes)
  const fastestDuration = Math.min(
    ...displayResults.map((f) =>
      f.slices?.reduce((total, slice) => {
        const match = slice.duration?.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
        const hours = parseInt(match?.[1] || 0);
        const mins = parseInt(match?.[2] || 0);
        return total + hours * 60 + mins;
      }, 0),
    ),
  );

  const visiblePages = getVisiblePages();

  return (
    <section className="container mx-auto space-y-6  ">
      {currentFlights.map((flight, index) => {
        const flightId = flight.id || `flight-${index}`;
        const isBookingLoading = loadingFlightId === flightId;

        // ================= CALCULATIONS =================
        const price = parseFloat(
          flight.total_amount || flight.base_amount || 0,
        );

        // Total duration of this flight in minutes
        const flightDuration = flight.slices?.reduce((total, slice) => {
          const match = slice.duration?.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
          const hours = parseInt(match?.[1] || 0);
          const mins = parseInt(match?.[2] || 0);
          return total + hours * 60 + mins;
        }, 0);

        // Total stops
        const totalStops = flight.slices?.reduce(
          (t, s) => t + Math.max(0, (s.segments?.length || 1) - 1),
          0,
        );

        // BADGE FLAGS
        const isCheapest = price === cheapestPrice;
        const isFastest = flightDuration === fastestDuration;
        const isBestValue = price <= cheapestPrice * 1.15 && totalStops <= 1;

        // Other data
        const totalPassengers = searchData?.passengers
          ? (searchData.passengers.adults || 0) +
            (searchData.passengers.children || 0) +
            (searchData.passengers.infants || 0)
          : 1;

        const totalPrice = calculateTotalPrice(flight);
        const travelClass = searchData?.cabinClass || "Economy";
        const airlineInfo = getAirlineInfo(flight);
        const slices = flight.slices || [];

        return (
          <Card
            key={flightId}
            className="border border-gray-100 rounded-xl shadow-theme hover:shadow-lg transition-all duration-300 bg-white group p-2"
          >
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
                {/* ================= LEFT SECTION ================= */}
                <div className="space-y-4">
                  {/* ===== TOP BADGES ===== */}
                  <div className="flex flex-wrap gap-1.5">
                    {isCheapest && (
                      <span className="bg-green-600 text-white text-[10px] px-2.5 py-1 rounded-full font-semibold">
                        Cheapest
                      </span>
                    )}
                    {isFastest && (
                      <span className="bg-blue-600 text-white text-[10px] px-2.5 py-1 rounded-full font-semibold">
                        Fastest
                      </span>
                    )}
                    {isBestValue && (
                      <span className="bg-purple-600 text-white text-[10px] px-2.5 py-1 rounded-full font-semibold">
                        Best Value
                      </span>
                    )}
                  </div>

                  {slices.map((slice, sliceIndex) => {
                    const segments = slice.segments || [];
                    const firstSegment = segments[0] || {};
                    const lastSegment = segments[segments.length - 1] || {};

                    return (
                      <div key={sliceIndex} className="space-y-3">
                        <div className="flex items-start gap-4">
                          {/* Airline */}
                          <div className="flex flex-col items-center min-w-[70px]">
                            <img
                              src={
                                imageErrors[airlineInfo.code]
                                  ? "https://images.kiwi.com/airlines/64/XX.png"
                                  : airlineInfo.logo
                              }
                              alt={airlineInfo.name}
                              className="w-10 h-10 object-contain"
                              onError={() => handleImageError(airlineInfo.code)}
                            />
                            <span className="text-[10px] text-light text-center truncate max-w-[70px] mt-1">
                              {airlineInfo.name}
                            </span>
                          </div>

                          {/* ROUTE */}
                          <div className="flex-1 flex items-center justify-between">
                            {/* Departure */}
                            <div className="text-left">
                              <p className="text-lg font-bold text-dark">
                                {safeString(slice.origin?.iata_code)}
                              </p>
                              <p className="text-xs font-medium text-light">
                                {formatDateTime(firstSegment.departing_at)}
                              </p>
                            </div>

                            {/* Middle */}
                            <div className="flex flex-col items-center px-3">
                              <span className="text-[10px] text-light">
                                {formatDuration(slice.duration)}
                              </span>

                              <div className="relative w-32 h-[2px] bg-gray-200 my-1.5">
                                <div className="absolute -top-2 right-0 w-4 h-4 text-theme">
                                  <Plane className="w-4 h-4 transform rotate-90" />
                                </div>
                              </div>

                              <span
                                className={`text-[10px] font-semibold ${
                                  segments.length > 1
                                    ? "text-amber-600"
                                    : "text-green-600"
                                }`}
                              >
                                {segments.length > 1
                                  ? `${segments.length - 1} Stop${segments.length > 2 ? "s" : ""}`
                                  : "Direct"}
                              </span>

                              <div className="flex gap-2 mt-1 text-light">
                                <span
                                  title="In-flight WiFi available"
                                  className="hover:text-theme transition"
                                >
                                  <Wifi className="w-3 h-3 cursor-pointer" />
                                </span>
                                <span
                                  title="Complimentary meals included"
                                  className="hover:text-theme transition"
                                >
                                  <Utensils className="w-3 h-3 cursor-pointer" />
                                </span>
                                <span
                                  title="In-flight entertainment available"
                                  className="hover:text-theme transition"
                                >
                                  <Tv className="w-3 h-3 cursor-pointer" />
                                </span>
                              </div>
                            </div>

                            {/* Arrival */}
                            <div className="text-right">
                              <p className="text-lg font-bold text-dark">
                                {safeString(slice.destination?.iata_code)}
                              </p>
                              <p className="text-xs font-medium text-light">
                                {formatDateTime(lastSegment.arriving_at)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* LAYOVER */}
                        {segments.length > 1 &&
                          segments.map((segment, i) => {
                            if (i === segments.length - 1) return null;

                            const next = segments[i + 1];
                            const arrival = new Date(segment.arriving_at);
                            const departure = new Date(next.departing_at);
                            const diff = departure - arrival;

                            const hours = Math.floor(diff / (1000 * 60 * 60));
                            const mins = Math.floor((diff / (1000 * 60)) % 60);
                            const overnight =
                              departure.getDate() !== arrival.getDate();

                            return (
                              <div
                                key={i}
                                className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-1.5 text-xs flex justify-between items-center"
                              >
                                <span className="text-amber-700">
                                  Layover at {segment.destination?.iata_code}
                                </span>
                                <span className="font-medium text-amber-700">
                                  {hours}h {mins}m
                                  {overnight && (
                                    <span className="text-red-600 ml-1 font-semibold">
                                      Overnight
                                    </span>
                                  )}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}

                  {/* SUMMARY BADGES */}
                  <div className="flex flex-wrap gap-1.5 text-xs pt-1">
                    {(() => {
                      const checkedQty =
                        flight.passengers?.[0]?.baggages?.find(
                          (b) => b.type === "checked",
                        )?.quantity || 0;

                      return (
                        <span className="bg-theme-light text-theme px-3 py-1 rounded-full text-xs font-medium">
                          {checkedQty > 0
                            ? `${checkedQty} Checked Bag${checkedQty > 1 ? "s" : ""} Included`
                            : "No Checked Baggage"}
                        </span>
                      );
                    })()}

                    {(() => {
                      const cabinQty =
                        flight.passengers?.[0]?.baggages?.find(
                          (b) => b.type === "cabin",
                        )?.quantity || 1;

                      return (
                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          {cabinQty > 0
                            ? `${cabinQty} Cabin Bag${cabinQty > 1 ? "s" : ""} Included`
                            : "No Cabin Bag"}
                        </span>
                      );
                    })()}

                    <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      Est. CO₂: {flight.total_emissions_kg || 0} kg
                    </span>
                  </div>
                </div>

                {/* RIGHT PRICE */}
                <div className="flex flex-col items-center justify-center text-center border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6 space-y-3">
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-theme">
                      {flight.total_currency} {totalPrice}
                    </p>
                    <p className="text-xs text-light">
                      Base {flight.base_amount} + Tax {flight.tax_amount}
                    </p>
                    <p className="text-xs text-body">
                      {travelClass} • {totalPassengers} Traveller
                      {totalPassengers > 1 ? "s" : ""} • {totalStops} Stop
                      {totalStops !== 1 ? "s" : ""}
                    </p>
                    <div className="flex flex-wrap justify-center gap-1.5 text-xs mt-2">
                      {flight.conditions?.refund_before_departure?.allowed ? (
                        <span className="text-green-700 bg-green-50 px-3 py-1 rounded-full font-medium">
                          Refundable
                        </span>
                      ) : (
                        <span className="text-red-600 bg-red-50 px-3 py-1 rounded-full font-medium">
                          Non-refundable
                        </span>
                      )}
                      {flight.conditions?.change_before_departure?.allowed ? (
                        <span className="text-green-700 bg-green-50 px-3 py-1 rounded-full font-medium">
                          Changeable
                        </span>
                      ) : (
                        <span className="text-red-600 bg-red-50 px-3 py-1 rounded-full font-medium">
                          Non-changeable
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookNow(flight)}
                    disabled={isBookingLoading || isBookingAuthChecking}
                    className="w-full bg-theme hover:bg-hover-dark text-white font-semibold py-3 px-4 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBookingLoading ? "Processing..." : "Book Now"}
                  </button>
                </div>
              </div>

              {/* Expand Section */}
              <div
                className="border-t border-gray-100 bg-gray-50/50 px-2 py-3 cursor-pointer hover:bg-gray-100 transition-all"
                onClick={() =>
                  setExpandedCard(expandedCard === index ? null : index)
                }
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-body">
                    Flight Details & Itinerary
                  </span>
                  {expandedCard === index ? (
                    <ChevronUp className="w-4 h-4 text-theme" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-theme" />
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {expandedCard === index && (
                <div className="border-t border-gray-100 bg-gray-50/30 px-2 py-4 space-y-4">
                  {/* FARE SUMMARY */}
                  <div className="bg-white border border-gray-100 rounded-lg p-4 text-sm">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <p className="text-light text-xs">Total</p>
                        <p className="font-bold text-dark">
                          {flight.total_currency} {flight.total_amount}
                        </p>
                      </div>
                      <div>
                        <p className="text-light text-xs">Base</p>
                        <p className="text-dark">
                          {flight.total_currency} {flight.base_amount}
                        </p>
                      </div>
                      <div>
                        <p className="text-light text-xs">Tax</p>
                        <p className="text-dark">
                          {flight.total_currency} {flight.tax_amount}
                        </p>
                      </div>
                      <div>
                        <p className="text-light text-xs">CO₂</p>
                        <p className="text-dark">
                          {flight.total_emissions_kg || 0} kg
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SEGMENTS */}
                  {slices.map((slice, sIndex) => {
                    const segments = slice.segments || [];

                    return (
                      <div
                        key={sIndex}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {segments.map((segment, segIndex) => {
                          const carrier =
                            segment.operating_carrier ||
                            segment.marketing_carrier ||
                            {};

                          const nextSegment = segments[segIndex + 1];

                          return (
                            <div key={segIndex} className="space-y-3 relative">
                              <div className="bg-white border border-gray-100 rounded-lg p-4 text-sm space-y-3">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={
                                        carrier.logo_symbol_url ||
                                        `https://images.kiwi.com/airlines/64/${carrier.iata_code || "XX"}.png`
                                      }
                                      className="w-6 h-6 object-contain"
                                      alt={carrier.name}
                                    />
                                    <div>
                                      <p className="font-semibold text-dark">
                                        {carrier.name}
                                      </p>
                                      <p className="text-light text-xs">
                                        Flight{" "}
                                        {
                                          segment.marketing_carrier_flight_number
                                        }
                                      </p>
                                    </div>
                                  </div>
                                  <span className="font-bold text-theme">
                                    {formatDuration(segment.duration)}
                                  </span>
                                </div>

                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-bold text-dark">
                                      {segment.origin?.iata_code}
                                    </p>
                                    <p className="text-light text-xs">
                                      {formatDateTime(segment.departing_at)}
                                    </p>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-theme" />
                                  <div className="text-right">
                                    <p className="font-bold text-dark">
                                      {segment.destination?.iata_code}
                                    </p>
                                    <p className="text-light text-xs">
                                      {formatDateTime(segment.arriving_at)}
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-2 text-xs text-light">
                                  <div className="flex justify-between">
                                    <span>Cabin Class</span>
                                    <span className="font-medium text-dark">
                                      {segment.passengers?.[0]?.cabin
                                        ?.marketing_name || "Economy Class"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Fare Type</span>
                                    <span className="font-medium text-dark">
                                      {flight.conditions
                                        ?.refund_before_departure?.allowed
                                        ? "Flexible Fare"
                                        : "Standard Economy Fare"}
                                    </span>
                                  </div>
                                  {(() => {
                                    const cabinQty =
                                      segment.passengers?.[0]?.baggages?.find(
                                        (b) => b.type === "cabin",
                                      )?.quantity || 1;
                                    const checkedQty =
                                      segment.passengers?.[0]?.baggages?.find(
                                        (b) => b.type === "checked",
                                      )?.quantity || 0;

                                    return (
                                      <>
                                        <div className="flex justify-between">
                                          <span>Cabin Baggage</span>
                                          <span className="font-medium text-dark">
                                            {cabinQty > 0
                                              ? `${cabinQty} cabin bag included`
                                              : "No cabin bag included"}
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Checked Baggage</span>
                                          <span className="font-medium text-dark">
                                            {checkedQty > 0
                                              ? `${checkedQty} checked bag included`
                                              : "No checked baggage included"}
                                          </span>
                                        </div>
                                      </>
                                    );
                                  })()}
                                </div>
                              </div>

                              {nextSegment && (
                                <div className="absolute left-1/2 -bottom-[18px] transform -translate-x-1/2 -translate-y-1/2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-1.5 text-xs whitespace-nowrap">
                                  {(() => {
                                    const arrival = new Date(
                                      segment.arriving_at,
                                    );
                                    const departure = new Date(
                                      nextSegment.departing_at,
                                    );
                                    const diff = departure - arrival;
                                    const hours = Math.floor(
                                      diff / (1000 * 60 * 60),
                                    );
                                    const mins = Math.floor(
                                      (diff / (1000 * 60)) % 60,
                                    );
                                    const overnight =
                                      departure.getDate() !== arrival.getDate();

                                    return (
                                      <>
                                        <span className="font-medium text-amber-700">
                                          Layover: {hours}h {mins}m
                                        </span>
                                        {overnight && (
                                          <span className="text-red-600 ml-1">
                                            Overnight
                                          </span>
                                        )}
                                      </>
                                    );
                                  })()}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}

                  {/* PASSENGER INFO */}
                  <div className="bg-white border border-gray-100 rounded-lg p-4">
                    <h3 className="font-semibold text-dark mb-3">
                      Passenger & Baggage Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                      {(flight.passengers || []).map((passenger, pIndex) => {
                        const baggage = getBaggageInfo(passenger);
                        const passengerLabel =
                          passenger.type === "adult"
                            ? "Adult Passenger"
                            : passenger.type === "child"
                              ? "Child Passenger"
                              : passenger.type === "infant"
                                ? "Infant Passenger"
                                : "Passenger";

                        return (
                          <div
                            key={pIndex}
                            className="border border-gray-100 rounded-lg p-3 bg-gray-50 space-y-2"
                          >
                            <p className="font-semibold text-dark">
                              {passengerLabel}
                            </p>
                            <div className="text-light text-xs">
                              {baggage.cabin > 0 ? (
                                <p className="flex items-center gap-1">
                                  <span className="text-green-600">✓</span>{" "}
                                  {baggage.cabin} cabin bag included
                                </p>
                              ) : (
                                <p className="flex items-center gap-1 text-red-600">
                                  <span>✗</span> No cabin baggage included
                                </p>
                              )}
                            </div>
                            <div className="text-light text-xs">
                              {baggage.checked > 0 ? (
                                <p className="flex items-center gap-1">
                                  <span className="text-green-600">✓</span>{" "}
                                  {baggage.checked} checked bag included
                                </p>
                              ) : (
                                <p className="flex items-center gap-1 text-red-600">
                                  <span>✗</span> No checked baggage included
                                </p>
                              )}
                            </div>
                            <div className="text-xs text-light">
                              Travel Class:{" "}
                              <span className="font-medium text-dark">
                                {passenger.cabin?.marketing_name ||
                                  "Economy Class"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-8">
          <p className="text-light text-sm">
            Showing {indexOfFirstFlight + 1}-
            {Math.min(indexOfLastFlight, displayResults.length)} of{" "}
            {displayResults.length} flights
          </p>
          <div className="flex justify-center items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`flex items-center gap-1 px-4 py-2 border-2 rounded-lg text-sm font-bold transition-all ${
                currentPage === 1
                  ? "text-light border-gray-200 cursor-not-allowed opacity-50"
                  : "text-theme border-theme hover:bg-theme hover:text-white hover:shadow-md"
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <div className="flex items-center gap-1">
              {visiblePages.map((page, i) =>
                typeof page === "number" ? (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 flex items-center justify-center border-2 rounded-lg text-sm font-bold transition-all ${
                      currentPage === page
                        ? "bg-theme text-white border-theme shadow-md"
                        : "text-dark border-gray-200 hover:border-theme hover:text-theme hover:bg-theme-light"
                    }`}
                  >
                    {page}
                  </button>
                ) : (
                  <span
                    key={i}
                    className="w-10 h-10 flex items-center justify-center text-light"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </span>
                ),
              )}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`flex items-center gap-1 px-4 py-2 border-2 rounded-lg text-sm font-bold transition-all ${
                currentPage === totalPages
                  ? "text-light border-gray-200 cursor-not-allowed opacity-50"
                  : "text-theme border-theme hover:bg-theme hover:text-white hover:shadow-md"
              }`}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
