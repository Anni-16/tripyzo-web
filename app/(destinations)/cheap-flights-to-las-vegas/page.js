"use client";

import Banner from "@/components/Banner";
import LasVegas from "@/components/Destination/LasVegas";
import FlightDeals from "@/components/FlightDeals";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import PopularDestinations from "@/components/PopularDestinations";
import Services from "@/components/services";

export default function LasVegasPage() {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <Banner
        titleLine1="Cheap Flights to Las Vegas"
        titleLine2="Book Smart Fares to LAS"
        description="Compare affordable flights to Las Vegas and let Tripyzo help you book a better-value trip for entertainment, events, nightlife, or desert adventures."
      />
      <Services />
      <FlightDeals />
      <PopularDestinations />
      <LasVegas />
      <Footer />
    </>
  );
}
