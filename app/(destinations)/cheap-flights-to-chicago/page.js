"use client";

import Banner from "@/components/Banner";
import Chicago from "@/components/Destination/Chicago";
import FlightDeals from "@/components/FlightDeals";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import PopularDestinations from "@/components/PopularDestinations";
import Services from "@/components/services";

export default function ChicagoPage() {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <Banner
        titleLine1="Cheap Flights to Chicago"
        titleLine2="Book Smart Fares to ORD"
        description="Compare affordable flights to Chicago and let Tripyzo help you plan a smooth trip to the Windy City for business, events, or a lakefront getaway."
      />
      <Services />
      <FlightDeals />
      <PopularDestinations />
      <Chicago />
      <Footer />
    </>
  );
}
