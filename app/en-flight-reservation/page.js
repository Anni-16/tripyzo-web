import { Suspense } from "react";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import EnFlightReservationContent from "@/components/EN/EnFlightReservationContent";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Flight Reservation | Tripyzo 24/7 Phone Support & Airline Deals",
  description:
    "Make your flight reservation easily with Tripyzo. Compare airfares, reserve seats for domestic and international flights, and get 24/7 phone assistance from travel experts.",
  path: "/en-flight-reservation/",
  keywords: [
    "flight reservation",
    "reserve flight tickets",
    "book flights by phone",
    "Tripyzo flight reservation",
    "cheap airfare reservation",
    "international flight reservation",
    "airline ticket phone support",
  ],
});

function EnFlightReservationPageContent() {
  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Main Banner with Flight Search */}
      <Banner pageType="flights" />

      {/* Main Content Section */}
      <EnFlightReservationContent />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default function EnFlightReservationPage() {
  return (
    <Suspense
      fallback={<div className="p-6 text-center">Loading reservation page...</div>}
    >
      <EnFlightReservationPageContent />
    </Suspense>
  );
}
