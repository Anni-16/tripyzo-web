import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { createMetadata } from "@/lib/seo";

// ✅ SEO Metadata
export const metadata = createMetadata({
  title: "Privacy Policy | Tripyzo Travel Services",
  description:
    "Read the Tripyzo Privacy Policy to understand how personal information is collected, used, protected, and handled for flight booking services.",
  path: "/privacy-policy",
  keywords: [
    "Tripyzo privacy policy",
    "travel privacy policy",
    "flight booking personal information",
  ],
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <PrivacyPolicy />
      <Footer />
    </>
  );
}
