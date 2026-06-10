"use client";

import Banner from "@/components/Banner";
import Boston from "@/components/Destination/Boston";
import FlightDeals from "@/components/FlightDeals";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import PopularDestinations from "@/components/PopularDestinations";
import Services from "@/components/services";

export default function BostonPage() {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>

      <Banner
        titleLine1="Cheap Flights to Boston"
        titleLine2="Book Smart Fares to BOS"
        description="Compare affordable flights to Boston and let Tripyzo help you book a smooth trip to one of America's most historic, walkable, and culture-rich cities."
      />
      <Services />
      <FlightDeals />
      <PopularDestinations />
      <Boston />
      <Footer />
    </>
  );
}
