"use client";

import { useFlight } from "@/context/FlightContext";
import Navbar from "@/components/Headers/Navbar";
import Footer from "@/components/Footer";
import FlightList from "@/components/ResultComponent/FlightList";
import ResultBanner from "@/components/ResultBanner";
import { Suspense, useEffect, useRef, useState } from "react";
import NoFlightsFound from "@/components/ResultComponent/NoResult";
import { useRouter } from "next/navigation";
import { getPhoneByLanguage, getPhoneHref } from "@/config/ContactInfo";
import { decryptSearchParams } from "@/lib/encryption";
import axiosInstance from "@/lib/axiosInstance";

export default function ResultPage() {
  const { results, loading, setResults, setSearchData, setLoading, setError } =
    useFlight();
  const router = useRouter();
  const restoredSearchRef = useRef(false);

  const currentPhone = getPhoneByLanguage();
  const phoneNumber = currentPhone.displayNumber || currentPhone.number;
  const phoneHref = getPhoneHref();

  const [showExpiryModal, setShowExpiryModal] = useState(false);
  const [restoringResults, setRestoringResults] = useState(false);

  const t = {
      modalTitle: "Flight Prices May Have Changed",
      modalDesc:
        "Airline fares are dynamic and may change frequently. Please refresh your search to see the latest available flights and prices.",
      continueBtn: "Continue Browsing",
      refreshBtn: "Refresh Results",
  };

  /* ================= EXPIRE RESULTS TIMER ================= */
  useEffect(() => {
    if (!results || results.length === 0) return;

    const timer = setTimeout(
      () => {
        setShowExpiryModal(true);
      },
      1 * 60 * 1000,
    );

    return () => clearTimeout(timer);
  }, [results]);

  /* ================= RESTORE RESULTS FROM URL QUERY ================= */
  useEffect(() => {
    if (restoredSearchRef.current || (results && results.length > 0)) return;

    const searchParams = new URLSearchParams(window.location.search);
    const encryptedQuery = searchParams.get("q");
    if (!encryptedQuery) return;

    const restoredSearchData = decryptSearchParams(encryptedQuery);
    if (!restoredSearchData) return;

    restoredSearchRef.current = true;

    const fetchRestoredResults = async () => {
      try {
        setRestoringResults(true);
        setLoading(true);
        setError("");
        setSearchData(restoredSearchData);

        const payload = {
          origin: restoredSearchData.origin,
          destination: restoredSearchData.destination,
          departureDate: restoredSearchData.departureDate,
          returnDate: restoredSearchData.returnDate,
          tripType: restoredSearchData.tripType,
          passengers: restoredSearchData.passengers,
          cabinClass: restoredSearchData.cabinClass,
        };

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
      } catch (err) {
        console.error("Restored search error:", err);
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Search failed. Please try again.",
        );
      } finally {
        setLoading(false);
        setRestoringResults(false);
      }
    };

    fetchRestoredResults();
  }, [results, setError, setLoading, setResults, setSearchData]);

  /* ================= NO RESULTS ================= */
  if ((loading || restoringResults) && (!results || results.length === 0)) {
    return (
      <>
        <Navbar />
        <Suspense fallback={null}>
          <ResultBanner />
        </Suspense>
        <div className="flex min-h-[45vh] items-center justify-center bg-theme-light/30 px-4 text-center">
          <div className="rounded-2xl bg-white p-6 shadow-theme">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-theme"></div>
            <h2 className="text-xl font-bold text-dark">Loading Flights</h2>
            <p className="mt-2 text-sm text-gray-500">
              Finding the best matching fares for your deal...
            </p>
            <a
              href={phoneHref}
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-theme px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-hover-dark"
            >
              Call {phoneNumber}
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!results || results.length === 0) {
    return (
      <>
        <Navbar />
        <Suspense fallback={null}>
          <ResultBanner />
        </Suspense>
        <NoFlightsFound />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Suspense fallback={null}>
        <ResultBanner />
      </Suspense>

      <FlightList />

      <Footer />

      {/* ================= EXPIRY MODAL ================= */}
      {showExpiryModal && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-xl shadow-2xl p-6 text-center space-y-4 animate-fadeIn">
            <h2 className="text-lg font-bold text-primary">{t.modalTitle}</h2>

            <p className="text-sm text-gray-600">{t.modalDesc}</p>

            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setShowExpiryModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-all"
              >
                {t.continueBtn}
              </button>

              <button
                onClick={() => router.refresh()}
                className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-all"
              >
                {t.refreshBtn}
              </button>
            </div>

            {/* Optional: Phone number display for assistance */}
            <div className="pt-3 border-t border-gray-100 mt-3">
              <p className="text-xs text-gray-400">
                Need help? Call us at{" "}
                <a
                  href={phoneHref}
                  className="text-primary hover:underline"
                >
                  {phoneNumber}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
