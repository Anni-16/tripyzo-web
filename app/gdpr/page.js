import Footer from "@/components/Footer";
import Gdpr from "@/components/Gdpr";
import Navbar from "@/components/Headers/Navbar";
import { createMetadata } from "@/lib/seo";

// ✅ SEO Metadata
export const metadata = createMetadata({
  title: "GDPR Notice | Tripyzo Data Protection Rights",
  description:
    "Read the Tripyzo GDPR Notice for data protection rights, lawful processing, privacy requests, and personal information handling.",
  path: "/gdpr",
  keywords: [
    "Tripyzo GDPR notice",
    "data protection rights",
    "travel privacy rights",
  ],
});

export default function GdprPage() {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <Gdpr />
      <Footer />
    </>
  );
}
