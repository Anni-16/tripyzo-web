import Ccpa from "@/components/Ccpa";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import { createMetadata } from "@/lib/seo";

// ✅ SEO Metadata
export const metadata = createMetadata({
  title: "CCPA Notice | Tripyzo California Privacy Rights",
  description:
    "Read the Tripyzo CCPA Notice for California privacy rights, personal information categories, data requests, and consumer privacy choices.",
  path: "/ccpa",
  keywords: [
    "Tripyzo CCPA notice",
    "California privacy rights",
    "travel data privacy",
  ],
});

export default function CcpaPage() {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <Ccpa />
      <Footer />
    </>
  );
}
