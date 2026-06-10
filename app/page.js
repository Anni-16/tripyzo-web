"use client";

import Banner from "@/components/Banner";
import FAQSection from "@/components/FAQSection";
import FlightBookingContent from "@/components/FlightBookingContent";
import FlightDeals from "@/components/FlightDeals";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import PopularDestinations from "@/components/PopularDestinations";
import Services from "@/components/services";

export default function Home() {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <Banner />
      <Services />
      <FlightDeals />
      <PopularDestinations />
      <FlightBookingContent />
      <FAQSection />
      <Footer />
    </>
  );
}
