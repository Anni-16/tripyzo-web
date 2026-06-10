"use client";

import Banner from "@/components/Banner";
import NewYork from "@/components/Destination/NewYork";
import FlightDeals from "@/components/FlightDeals";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import PopularDestinations from "@/components/PopularDestinations";
import Services from "@/components/services";

export default function NewYorkPage() {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <Banner
        titleLine1="Cheap Flights to New York"
        titleLine2="Book Smart Fares to JFK"
        description="Compare affordable flights to New York and let Tripyzo help you plan a smooth city break, business trip, family visit, or special-event getaway."
      />
      <Services />
      <FlightDeals />
      <PopularDestinations />
      <NewYork />
      <Footer />
    </>
  );
}
