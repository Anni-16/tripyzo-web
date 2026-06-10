import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Tripyzo | Flight Booking Agency & Travel Support",
  description:
    "Learn about Tripyzo, an independent travel agency helping travelers compare flights, review booking options, and get reliable English-speaking travel support.",
  path: "/about-us",
  keywords: [
    "about Tripyzo",
    "Tripyzo travel agency",
    "flight booking support",
    "independent travel agency",
  ],
});

const AboutUsPage = () => {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <AboutUs />
      <Footer />
    </>
  );
};

export default AboutUsPage;
