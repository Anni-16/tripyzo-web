import AdvertiserPolicy from "@/components/AdvertiserPolicy";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Advertiser Policy | Tripyzo Travel Offers",
  description:
    "Learn how Tripyzo presents advertising, travel promotions, sponsored offers, fare information, and third-party travel deal content.",
  path: "/advertiser-policy",
  keywords: [
    "Tripyzo advertiser policy",
    "travel advertising policy",
    "flight deal disclosures",
  ],
});

const AdvertiserPage = () => {
  return (
    <div className="">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <AdvertiserPolicy />
      <Footer />
    </div>
  );
};

export default AdvertiserPage;
