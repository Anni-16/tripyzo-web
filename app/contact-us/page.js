import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import { createMetadata } from "@/lib/seo";

// ✅ SEO Metadata
export const metadata = createMetadata({
  title: "Contact Tripyzo | Flight Booking Support",
  description:
    "Contact Tripyzo for flight booking assistance, itinerary questions, schedule changes, cancellations, refunds, and customer support.",
  path: "/contact-us",
  keywords: [
    "contact Tripyzo",
    "Tripyzo phone number",
    "flight booking support",
    "travel customer service",
  ],
});

const ContactUsPage = () => {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <ContactUs />
      <Footer />
    </>
  );
};

export default ContactUsPage;
