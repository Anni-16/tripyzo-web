import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import RefundPolicy from "@/components/RefundPolicy";
import { createMetadata } from "@/lib/seo";

// ✅ SEO Metadata
export const metadata = createMetadata({
  title: "Refund Policy | Tripyzo Flight Reservations",
  description:
    "Understand Tripyzo refund eligibility, airline-specific refund rules, processing timelines, and service fee conditions for flight reservations.",
  path: "/refund-policy",
  keywords: [
    "Tripyzo refund policy",
    "flight refund rules",
    "airline refund assistance",
  ],
});

const RefundPolicyPage = () => {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <RefundPolicy />
      <Footer />
    </>
  );
};

export default RefundPolicyPage;
