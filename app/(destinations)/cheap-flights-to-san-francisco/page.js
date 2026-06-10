"use client";

import Banner from "@/components/Banner";
import SanFrancisco from "@/components/Destination/SanFrancisco";
import FlightDeals from "@/components/FlightDeals";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import PopularDestinations from "@/components/PopularDestinations";
import Services from "@/components/services";

export default function SanFranciscoPage() {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <Banner
        titleLine1="Cheap Flights to San Francisco"
        titleLine2="Book Smart Fares to SFO"
        description="Compare affordable flights to San Francisco and let Tripyzo help you plan a smoother Bay Area trip for business, family, or a California vacation."
      />
      <Services />
      <FlightDeals />
      <PopularDestinations />
      <SanFrancisco />
      <Footer />
    </>
  );
}
