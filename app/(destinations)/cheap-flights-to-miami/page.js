"use client";

import Banner from "@/components/Banner";
import Miami from "@/components/Destination/Miami";
import FlightDeals from "@/components/FlightDeals";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import PopularDestinations from "@/components/PopularDestinations";
import Services from "@/components/services";

export default function MiamiPage() {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <Banner
        titleLine1="Cheap Flights to Miami"
        titleLine2="Book Smart Fares to MIA"
        description="Compare affordable flights to Miami and let Tripyzo help you book a sunny escape for beaches, cruises, nightlife, family trips, or business travel."
      />
      <Services />
      <FlightDeals />
      <PopularDestinations />
      <Miami />
      <Footer />
    </>
  );
}
