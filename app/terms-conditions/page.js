import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import TermsAndConditions from "@/components/TermsConditions";
import { createMetadata } from "@/lib/seo";

// ✅ SEO Metadata
export const metadata = createMetadata({
  title: "Terms & Conditions | Tripyzo Flight Booking Policies",
  description:
    "Read Tripyzo Terms and Conditions covering booking rules, airline policies, payments, cancellations, refunds, fees, and traveler responsibilities.",
  path: "/terms-conditions",
  keywords: [
    "Tripyzo terms and conditions",
    "flight booking terms",
    "airline reservation policies",
  ],
});

export default function TermsAndConditionsPage() {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <TermsAndConditions />
      <Footer />
    </>
  );
}
