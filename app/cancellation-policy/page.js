import CancellationPolicy from "@/components/CancellationPolicy";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import { createMetadata } from "@/lib/seo";

// ✅ SEO Metadata
export const metadata = createMetadata({
  title: "Cancellation Policy | Tripyzo Flight Booking Guidelines",
  description:
    "Review Tripyzo cancellation rules, airline fare conditions, service fees, refund eligibility, and support options before changing or cancelling a flight.",
  path: "/cancellation-policy",
  keywords: [
    "Tripyzo cancellation policy",
    "flight cancellation rules",
    "airline cancellation support",
  ],
});
export default function CancellationPolicyPage() {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <CancellationPolicy />
      <Footer />
    </>
  );
}
