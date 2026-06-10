"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaChevronDown,
  FaExchangeAlt,
  FaPlane,
} from "react-icons/fa";
import { DateRange } from "react-date-range";
import { format, addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Search } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter, useSearchParams } from "next/navigation";
import { useFlight } from "@/context/FlightContext";
import { encryptSearchParams } from "@/lib/encryption";

export default function FlightSearchForm({
  initialValues = {},
  isResultsPage = false,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSearchData, setResults, loading, setLoading, error, setError } =
    useFlight();

  const [isMounted, setIsMounted] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [airportLoading, setAirportLoading] = useState(false);
  const [airportError, setAirportError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const airportAbortRef = useRef(null);
  const debounceFromRef = useRef(null);
  const debounceToRef = useRef(null);

  const initialValuesProcessed = useRef(false);
  const dateRangeInitialized = useRef(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLargeScreen(window.innerWidth >= 1024);
      const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Form states
  const [tripType, setTripType] = useState(
    () =>
      initialValues.tripType || searchParams?.get("tripType") || "Roundtrip",
  );
  const [fromLocation, setFromLocation] = useState(
    () => searchParams?.get("from") || "",
  );
  const [fromDisplayValue, setFromDisplayValue] = useState(
    () => searchParams?.get("from") || "",
  );
  const [toLocation, setToLocation] = useState(
    () => searchParams?.get("to") || "",
  );
  const [toDisplayValue, setToDisplayValue] = useState(
    () => searchParams?.get("to") || "",
  );
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [activeFromIndex, setActiveFromIndex] = useState(-1);
  const [activeToIndex, setActiveToIndex] = useState(-1);

  const [selectedClass, setSelectedClass] = useState(
    () => initialValues.travelClass || searchParams?.get("class") || "Economy",
  );

  const getInitialPassengerCount = () => {
    if (searchParams?.get("passengers")) {
      try {
        return JSON.parse(searchParams.get("passengers"));
      } catch {
        return { adults: 1, children: 0, infants: 0 };
      }
    }
    return initialValues.passengers || { adults: 1, children: 0, infants: 0 };
  };

  const [passengerCount, setPassengerCount] = useState(
    getInitialPassengerCount(),
  );

  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [monthsToShow, setMonthsToShow] = useState(2);

  const [dateRange, setDateRange] = useState(null);

  // Initialize from initialValues for modify search
  useEffect(() => {
    if (initialValuesProcessed.current) return;

    if (Object.keys(initialValues).length > 0) {
      if (initialValues.from) {
        setFromDisplayValue(initialValues.from);
        const codeMatch = initialValues.from.match(/^([A-Z]{3})/);
        const code = codeMatch ? codeMatch[1] : initialValues.from;
        setFromLocation(code);
      }

      if (initialValues.to) {
        setToDisplayValue(initialValues.to);
        const codeMatch = initialValues.to.match(/^([A-Z]{3})/);
        const code = codeMatch ? codeMatch[1] : initialValues.to;
        setToLocation(code);
      }

      if (initialValues.tripType) {
        setTripType(initialValues.tripType);
      }

      if (initialValues.travelClass) {
        setSelectedClass(initialValues.travelClass);
      }

      if (initialValues.passengers) {
        setPassengerCount(initialValues.passengers);
      }

      initialValuesProcessed.current = true;
    }
  }, [initialValues]);

  // Initialize dateRange
  useEffect(() => {
    if (dateRangeInitialized.current) return;

    let startDate = new Date();
    let endDate = addDays(new Date(), 3);

    if (initialValues?.startDate) {
      startDate = new Date(initialValues.startDate);
    } else {
      const startDateParam = searchParams?.get("departureDate");
      if (startDateParam) startDate = new Date(startDateParam);
    }

    if (initialValues?.endDate) {
      endDate = new Date(initialValues.endDate);
    } else {
      const endDateParam = searchParams?.get("returnDate");
      if (endDateParam) endDate = new Date(endDateParam);
    }

    setDateRange([
      {
        startDate,
        endDate,
        key: "selection",
      },
    ]);

    dateRangeInitialized.current = true;
  }, [initialValues, searchParams]);

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const totalPassengers =
    passengerCount.adults + passengerCount.children + passengerCount.infants;
  const MAX_PASSENGERS = 9;

  useEffect(() => {
    const handleResize = () => setMonthsToShow(window.innerWidth < 768 ? 1 : 2);
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const togglePassengerDropdown = () => {
    setShowClassDropdown(false);
    setShowDateRangePicker(false);
    setShowPassengerDropdown((prev) => !prev);
  };

  const closeOtherDropdowns = (currentDropdown) => {
    if (currentDropdown !== "class") setShowClassDropdown(false);
    if (currentDropdown !== "passenger") setShowPassengerDropdown(false);
    if (currentDropdown !== "date") setShowDateRangePicker(false);
    if (currentDropdown !== "from") {
      setShowFromSuggestions(false);
      setActiveFromIndex(-1);
    }
    if (currentDropdown !== "to") {
      setShowToSuggestions(false);
      setActiveToIndex(-1);
    }
  };

  const updatePassengerCount = (type, operation) => {
    setPassengerCount((prev) => {
      const total = prev.adults + prev.children + prev.infants;

      if (operation === "increment") {
        if (total >= MAX_PASSENGERS) return prev;
        return { ...prev, [type]: prev[type] + 1 };
      }

      if (operation === "decrement") {
        const min = type === "adults" ? 1 : 0;
        if (prev[type] <= min) return prev;
        return { ...prev, [type]: prev[type] - 1 };
      }

      return prev;
    });
  };

  const handleDateChange = (ranges) => setDateRange([ranges.selection]);

  const handleAirportSearch = async (query, type) => {
    if (!query || query.trim().length < 2) {
      if (type === "from") setFromSuggestions([]);
      else setToSuggestions([]);
      return;
    }

    if (airportAbortRef.current) {
      airportAbortRef.current.abort();
    }

    airportAbortRef.current = new AbortController();

    try {
      setAirportLoading(true);
      setAirportError("");

      const response = await axiosInstance.get(
        `/airports/search?q=${encodeURIComponent(query)}`,
        { signal: airportAbortRef.current.signal },
      );

      const airports = response?.data?.data || [];

      if (type === "from") {
        setFromSuggestions(airports);
        setActiveFromIndex(-1);
      } else {
        setToSuggestions(airports);
        setActiveToIndex(-1);
      }
    } catch (error) {
      if (error.name !== "CanceledError" && error.name !== "AbortError") {
        setAirportError("Failed to load airports.");
      }
    } finally {
      setAirportLoading(false);
    }
  };

  const selectAirport = (airport, type) => {
    if (!airport) return;

    const airportCode = airport.iata_code;
    const displayValue = airport.name
      ? `${airport.iata_code} - ${airport.name}`
      : airport.display || airport.iata_code;

    if (type === "from") {
      if (airportCode === toLocation) {
        setError("Origin and destination cannot be the same.");
        return;
      }
      setFromLocation(airportCode);
      setFromDisplayValue(displayValue);
      setShowFromSuggestions(false);
      setActiveFromIndex(-1);
      setTimeout(() => toInputRef.current?.focus(), 100);
    } else {
      if (airportCode === fromLocation) {
        setError("Origin and destination cannot be the same.");
        return;
      }
      setToLocation(airportCode);
      setToDisplayValue(displayValue);
      setShowToSuggestions(false);
      setActiveToIndex(-1);
    }
  };

  const swapLocations = () => {
    const tempLocation = fromLocation;
    const tempDisplay = fromDisplayValue;
    setFromLocation(toLocation);
    setFromDisplayValue(toDisplayValue);
    setToLocation(tempLocation);
    setToDisplayValue(tempDisplay);
  };

  const handleFromKeyDown = (e) => {
    if (!fromSuggestions.length) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveFromIndex((prev) =>
          prev < fromSuggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveFromIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeFromIndex >= 0) {
          selectAirport(fromSuggestions[activeFromIndex], "from");
        }
        break;
      case "Escape":
        setShowFromSuggestions(false);
        setActiveFromIndex(-1);
        break;
    }
  };

  const handleToKeyDown = (e) => {
    if (!toSuggestions.length) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveToIndex((prev) =>
          prev < toSuggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveToIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeToIndex >= 0) {
          selectAirport(toSuggestions[activeToIndex], "to");
        }
        break;
      case "Escape":
        setShowToSuggestions(false);
        setActiveToIndex(-1);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError("");

    if (!fromLocation || !toLocation) {
      return setError("Please select valid airports from suggestions.");
    }

    if (fromLocation === toLocation) {
      return setError("Origin and destination cannot be the same.");
    }

    if (!dateRange?.[0]?.startDate) {
      return setError("Please select departure date.");
    }

    const payload = {
      origin: fromLocation,
      destination: toLocation,
      departureDate: format(dateRange[0].startDate, "yyyy-MM-dd"),
      tripType: tripType === "Roundtrip" ? "roundtrip" : "oneway",
      returnDate:
        tripType === "Roundtrip"
          ? format(dateRange[0].endDate, "yyyy-MM-dd")
          : null,
      passengers: {
        adults: passengerCount.adults,
        children: passengerCount.children,
        infants: passengerCount.infants,
      },
      cabinClass: selectedClass.toLowerCase().replace(" ", "_"),
    };

    try {
      setIsSubmitting(true);
      setLoading(true);

      const response = await axiosInstance.post("/flights/search", payload);

      let flightOffers = [];
      if (response?.data?.data) {
        if (Array.isArray(response.data.data)) {
          flightOffers = response.data.data;
        } else if (
          response.data.data.offers &&
          Array.isArray(response.data.data.offers)
        ) {
          flightOffers = response.data.data.offers;
        } else if (response.data.data.id) {
          flightOffers = [response.data.data];
        }
      } else if (
        response?.data?.offers &&
        Array.isArray(response.data.offers)
      ) {
        flightOffers = response.data.offers;
      } else if (Array.isArray(response?.data)) {
        flightOffers = response.data;
      } else if (response?.data?.id) {
        flightOffers = [response.data];
      }

      setResults(flightOffers);
      setSearchData({
        ...payload,
        fromDisplay: fromDisplayValue,
        toDisplay: toDisplayValue,
      });

      const encryptedQuery = encryptSearchParams({
        ...payload,
        fromDisplay: fromDisplayValue,
        toDisplay: toDisplayValue,
      });

      router.push(`/flights/search?q=${encryptedQuery}`);
    } catch (err) {
      console.error("Search error:", err);
      if (err.response) {
        setError(
          err.response.data?.message || `Server error: ${err.response.status}`,
        );
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError(err.message || "Search failed. Please try again.");
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleModifySearch = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  if (!isMounted || !dateRange) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-theme border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-3 text-body">Loading search form...</p>
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="relative z-10 w-full container-custom">
        <form
          onSubmit={isResultsPage ? handleModifySearch : handleSubmit}
          className="bg-white p-4 "
        >
          {error && (
            <p className="text-center text-accent bg-accent/10 py-2 rounded-md font-semibold mb-4">
              {error}
            </p>
          )}

          {isResultsPage && (
            <div className="pb-4 mb-4">
              <h2 className="text-xl font-bold text-dark">
                Modify Your Search
              </h2>
            </div>
          )}

          {/* Trip Type Row - Radio Buttons */}
          <div className="flex items-center gap-6 mb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                value="Roundtrip"
                checked={tripType === "Roundtrip"}
                onChange={() => setTripType("Roundtrip")}
                className="w-4 h-4 text-theme focus:ring-theme focus:ring-offset-0 focus:ring-1 border-gray-300"
              />
              <span
                className={`font-medium text-base transition-all ${
                  tripType === "Roundtrip" ? "text-theme" : "text-light"
                }`}
              >
                ROUNDTRIP
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                value="One Way"
                checked={tripType === "One Way"}
                onChange={() => setTripType("One Way")}
                className="w-4 h-4 text-theme focus:ring-theme focus:ring-offset-0 focus:ring-1 border-gray-300"
              />
              <span
                className={`font-medium text-base transition-all ${
                  tripType === "One Way" ? "text-theme" : "text-light"
                }`}
              >
                ONE WAY
              </span>
            </label>
          </div>

          {/* Main Search Fields - All in One Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            {/* From Field */}
            <div className="md:col-span-3 relative" ref={fromRef}>
              <label className="block text-sm font-medium text-dark mb-1">
                <FaPlaneDeparture className="inline mr-1 text-theme" /> Leaving
                From
              </label>
              <input
                ref={fromInputRef}
                type="text"
                placeholder="Enter city or airport"
                value={fromDisplayValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setFromDisplayValue(value);
                  setFromLocation("");
                  if (debounceFromRef.current)
                    clearTimeout(debounceFromRef.current);
                  debounceFromRef.current = setTimeout(() => {
                    handleAirportSearch(value, "from");
                  }, 400);
                  setShowFromSuggestions(true);
                }}
                onFocus={() => {
                  closeOtherDropdowns("from");
                  setShowFromSuggestions(true);
                  if (fromDisplayValue)
                    handleAirportSearch(fromDisplayValue, "from");
                }}
                onKeyDown={handleFromKeyDown}
                className="w-full px-3 py-2.5 border border-gray-300 text-dark text-sm rounded-none! focus:border-theme outline-none transition-all"
                autoComplete="off"
              />
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <div className="absolute w-full bg-white border border-gray-200 mt-1 overflow-hidden z-50 max-h-60 overflow-y-auto">
                  {fromSuggestions.map((item, index) => (
                    <div
                      key={`from-${item.iata_code}-${index}`}
                      onClick={() => selectAirport(item, "from")}
                      className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${
                        index === activeFromIndex ? "bg-gray-50" : ""
                      }`}
                    >
                      <span className="font-bold">{item.iata_code}</span> -{" "}
                      {item.name || item.city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* To Field */}
            <div className="md:col-span-3 relative" ref={toRef}>
              <label className="block text-sm font-medium text-dark mb-1">
                <FaPlaneArrival className="inline mr-1 text-theme" /> Going To
              </label>
              <input
                ref={toInputRef}
                type="text"
                placeholder="Enter city or airport"
                value={toDisplayValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setToDisplayValue(value);
                  setToLocation("");
                  if (debounceToRef.current)
                    clearTimeout(debounceToRef.current);
                  debounceToRef.current = setTimeout(() => {
                    handleAirportSearch(value, "to");
                  }, 400);
                  setShowToSuggestions(true);
                }}
                onFocus={() => {
                  closeOtherDropdowns("to");
                  setShowToSuggestions(true);
                  if (toDisplayValue) handleAirportSearch(toDisplayValue, "to");
                }}
                onKeyDown={handleToKeyDown}
                className="w-full px-3 py-2.5 border border-gray-300 text-dark text-sm rounded-none! focus:border-theme outline-none transition-all"
                autoComplete="off"
              />
              {showToSuggestions && toSuggestions.length > 0 && (
                <div className="absolute w-full bg-white border border-gray-200 mt-1 overflow-hidden z-50 max-h-60 overflow-y-auto">
                  {toSuggestions.map((item, index) => (
                    <div
                      key={`to-${item.iata_code}-${index}`}
                      onClick={() => selectAirport(item, "to")}
                      className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${
                        index === activeToIndex ? "bg-gray-50" : ""
                      }`}
                    >
                      <span className="font-bold">{item.iata_code}</span> -{" "}
                      {item.name || item.city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date Field */}
            <div className="md:col-span-3 relative text-left">
              <label className="block text-sm font-medium text-dark mb-1">
                <FaCalendarAlt className="inline mr-1 text-theme" /> Dates
              </label>
              <button
                type="button"
                className="w-full px-3 py-2.5 border border-gray-300 flex justify-between items-center text-dark text-sm hover:border-theme transition-all"
                onClick={() => {
                  setShowPassengerDropdown(false);
                  setShowClassDropdown(false);
                  setShowDateRangePicker((prev) => !prev);
                }}
              >
                <span>
                  {tripType === "One Way"
                    ? format(dateRange[0].startDate, "MMM d, yyyy")
                    : `${format(dateRange[0].startDate, "MMM d")} - ${format(
                        dateRange[0].endDate,
                        "MMM d, yyyy",
                      )}`}
                </span>
                <FaChevronDown
                  className={`text-theme text-xs transition-transform duration-300 ${
                    showDateRangePicker ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showDateRangePicker && (
                <div
                  className={`absolute z-[9999] mt-2 bg-white border border-gray-200 p-4 
                  w-[90vw] sm:w-[450px] md:w-[700px]
                  ${isLargeScreen ? "right-0" : "-left-4 sm:left-0"}`}
                >
                  <DateRange
                    editableDateInputs
                    onChange={handleDateChange}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    minDate={new Date()}
                    months={monthsToShow}
                    direction="horizontal"
                    rangeColors={["#e87a6b"]}
                    showDateDisplay={false}
                  />
                </div>
              )}
            </div>

            {/* Travelers & Class Combined Field */}
            <div className="md:col-span-3 relative">
              <label className="block text-sm font-medium text-dark mb-1">
                <FaUser className="inline mr-1 text-theme" /> Travelers & Class
              </label>
              <button
                type="button"
                onClick={togglePassengerDropdown}
                className="w-full px-3 py-2.5 border border-gray-300 flex justify-between items-center text-dark text-sm hover:border-theme transition-all"
              >
                <span>
                  {totalPassengers} Traveler{totalPassengers > 1 ? "s" : ""} •{" "}
                  {selectedClass}
                </span>
                <FaChevronDown
                  className={`text-theme text-xs transition-transform duration-300 ${
                    showPassengerDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showPassengerDropdown && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 p-4 z-[999] shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Passenger Count Section */}
                  <div className="space-y-4">
                    {[
                      {
                        type: "adults",
                        label: "Adults",
                        age: "12+ years",
                        min: 1,
                      },
                      {
                        type: "children",
                        label: "Children",
                        age: "2-11 years",
                        min: 0,
                      },
                      {
                        type: "infants",
                        label: "Infants",
                        age: "Under 2",
                        min: 0,
                      },
                    ].map(({ type, label, age, min }) => (
                      <div
                        key={type}
                        className="flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-dark">{label}</div>
                          <div className="text-xs text-light">{age}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-theme-light hover:border-theme transition-all disabled:opacity-30"
                            onClick={() =>
                              updatePassengerCount(type, "decrement")
                            }
                            disabled={passengerCount[type] <= min}
                          >
                            <span className="text-lg font-semibold">−</span>
                          </button>
                          <span className="w-8 text-center font-semibold text-dark">
                            {passengerCount[type]}
                          </span>
                          <button
                            type="button"
                            className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-theme-light hover:border-theme transition-all disabled:opacity-30"
                            onClick={() =>
                              updatePassengerCount(type, "increment")
                            }
                            disabled={totalPassengers >= MAX_PASSENGERS}
                          >
                            <span className="text-lg font-semibold">+</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Class Selection */}
                  <div className=" pb-4 mt-4">
                    <div className="flex items-start flex-col mb-2">
                      <p className="font-medium text-dark">Class Selection</p>
                      <div className="relative w-full">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowClassDropdown(!showClassDropdown);
                          }}
                          className="flex items-center justify-between gap-2 w-full  px-3 py-1.5 border border-gray-300 text-sm text-dark hover:border-theme transition-all"
                        >
                          <span>{selectedClass}</span>
                          <FaChevronDown className="text-theme text-xs" />
                        </button>

                        {showClassDropdown && (
                          <div
                            className="absolute right-0 mt-1 w-full bg-white border border-gray-200 shadow-lg p-1 z-[1000]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {[
                              "Economy",
                              "Premium Economy",
                              "Business",
                              "First Class",
                            ].map((item) => (
                              <div
                                key={item}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedClass(item);
                                  setShowClassDropdown(false);
                                }}
                                className={`px-4 py-2.5 text-sm font-medium cursor-pointer transition-all ${
                                  selectedClass === item
                                    ? "bg-theme-light text-theme"
                                    : "hover:bg-gray-50 text-body"
                                }`}
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {totalPassengers >= MAX_PASSENGERS && (
                    <div className="mt-4 p-2 bg-amber-50 border border-amber-200">
                      <p className="text-xs text-amber-700 text-center">
                        Maximum {MAX_PASSENGERS} passengers allowed
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    className="w-full  py-2.5 bg-theme text-white font-medium hover:bg-hover-dark transition-all"
                    onClick={() => setShowPassengerDropdown(false)}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search Button - Full Width on Mobile, Auto on Desktop */}
          <div className="mt-2 w-full flex items-center justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto md:min-w-[200px] ${
                isResultsPage
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-theme hover:bg-hover-dark"
              } text-white font-semibold py-3 px-8 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>
                    {isResultsPage ? "UPDATE SEARCH" : "SEARCH FLIGHTS"}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
