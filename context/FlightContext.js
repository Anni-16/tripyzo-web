"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(null);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFlight, setSelectedFlight] = useState(null);

  /* ================= LOAD ONLY SAFE DATA ================= */

  useEffect(() => {
    try {
      const savedSearch = sessionStorage.getItem("searchData");
      const savedSelected = sessionStorage.getItem("selectedFlight");

      if (savedSearch) setSearchData(JSON.parse(savedSearch));
      if (savedSelected) setSelectedFlight(JSON.parse(savedSelected));
    } catch (err) {
      console.error("⚠️ Error loading flight data:", err);
    }
  }, []);

  /* ================= PERSIST ONLY LIGHT DATA ================= */

  useEffect(() => {
    if (searchData) {
      sessionStorage.setItem("searchData", JSON.stringify(searchData));
    }
  }, [searchData]);

  useEffect(() => {
    if (selectedFlight) {
      // ⚠️ Store only minimal flight info
      const minimalFlight = {
        id: selectedFlight.id,
        total_amount: selectedFlight.total_amount,
        total_currency: selectedFlight.total_currency,
      };

      sessionStorage.setItem("selectedFlight", JSON.stringify(minimalFlight));
    }
  }, [selectedFlight]);

  /* ================= CLEAR DATA ================= */

  const clearFlightData = () => {
    sessionStorage.removeItem("searchData");
    sessionStorage.removeItem("selectedFlight");

    setSearchData(null);
    setResults([]);
    setFilteredResults([]);
    setSelectedFlight(null);
    setError("");
  };

  return (
    <FlightContext.Provider
      value={{
        searchData,
        setSearchData,
        results,
        setResults,
        filteredResults,
        setFilteredResults,
        loading,
        setLoading,
        error,
        setError,
        selectedFlight,
        setSelectedFlight,
        clearFlightData,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => useContext(FlightContext);
