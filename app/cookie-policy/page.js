import CookiesPolicy from "@/components/CookiesPolicy";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cookie Policy | Tripyzo Website Cookies",
  description:
    "Learn how Tripyzo uses cookies and similar technologies to improve website functionality, analyze traffic, and support user experience.",
  path: "/cookie-policy",
  keywords: [
    "Tripyzo cookie policy",
    "website cookies",
    "travel website tracking",
  ],
});

const CookiesPage = () => {
  return (
    <div className="">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <CookiesPolicy />
      <Footer />
    </div>
  );
};

export default CookiesPage;
