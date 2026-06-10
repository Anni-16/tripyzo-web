import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import TaxesFee from "@/components/TaxesFee";
import { createMetadata } from "@/lib/seo";

// ✅ SEO Metadata
export const metadata = createMetadata({
  title: "Taxes & Fees | Tripyzo Flight Booking Charges",
  description:
    "Review Tripyzo taxes, airline fees, service charges, payment processing details, and fare-related cost disclosures for travel bookings.",
  path: "/taxes-and-fee",
  keywords: [
    "Tripyzo taxes and fees",
    "flight booking fees",
    "airline taxes",
    "travel service fees",
  ],
});

export default function TaxesFeePage() {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <TaxesFee />
      <Footer />
    </>
  );
}
