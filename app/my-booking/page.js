import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import MyBookingDetail from "@/components/MyBookingDetail";
import { createMetadata, noIndexRobots } from "@/lib/seo";

export const metadata = createMetadata({
  title: "My Booking | Tripyzo",
  description:
    "Look up and manage your Tripyzo flight booking details, itinerary information, and travel support options.",
  path: "/my-booking",
  keywords: ["Tripyzo my booking", "manage flight booking", "flight itinerary"],
  robots: noIndexRobots,
});

const MyBookingPage = () => {
  return (
    <div className="">
      <Navbar />
      <MyBookingDetail />
      <Footer />
    </div>
  );
};

export default MyBookingPage;
