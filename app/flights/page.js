"use client";

import { Suspense } from "react";
import Banner from "@/components/Banner";
import EnglishContent from "@/components/EN/EnglishContent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import PopularDestinations from "@/components/PopularDestinations";
import Services from "@/components/services";
import FlightDeals from "@/components/FlightDeals";

function FlightsPageContent() {
  return (
    <>
      {/* Desktop Navbar - Hidden on mobile */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Main Banner with dynamic page type */}
      <Banner pageType="flights" />

      {/* Other Sections */}
      <Services />
      <FlightDeals />
      <PopularDestinations />
      <EnglishContent />
      <Footer />
    </>
  );
}

export default function FlightsPage() {
  return (
    <Suspense
      fallback={<div className="p-6 text-center">Loading flights page...</div>}
    >
      <FlightsPageContent />
    </Suspense>
  );
}
