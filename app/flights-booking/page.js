import Banner from "@/components/Flightbooking/Banner";
import BenefitsSection from "@/components/Flightbooking/BenefitsSection";
import LimitedOffer from "@/components/Flightbooking/LimitedOffer";
import TopBar from "@/components/Flightbooking/Topbar";
import WhyCallUs from "@/components/Flightbooking/WhyCallUs";
import FlightSearchForm from "@/components/FlightSearchForm";
import { createMetadata } from "@/lib/seo";
import { Suspense } from "react";

export const metadata = createMetadata({
  title: "Flight Booking | Tripyzo Phone Support & Cheap Airfare",
  description:
    "Book flights with Tripyzo phone support. Compare airfare, review airline ticket options, and get help with domestic and international reservations.",
  path: "/flights-booking",
  keywords: [
    "Tripyzo flight booking",
    "book flights by phone",
    "cheap airfare support",
    "airline reservation assistance",
  ],
});

const FlightsBookingPage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <TopBar />
      <Banner />
      {/* <Services /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-16 relative z-20">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Find Your Perfect Flight
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-2">
              Compare 100+ airlines and get the best deals instantly
            </p>
          </div>
          <FlightSearchForm />
        </div>
      </Suspense>

      <WhyCallUs />
      <BenefitsSection />
      <LimitedOffer />
      {/* <Footer /> */}
    </>
  );
};

export default FlightsBookingPage;
