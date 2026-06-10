import { createMetadata, noIndexRobots } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Booking Confirmation | Tripyzo",
  description:
    "View your Tripyzo flight booking confirmation, itinerary details, passenger information, and payment summary.",
  path: "/booking/confirmation",
  keywords: ["Tripyzo booking confirmation", "flight booking confirmation"],
  robots: noIndexRobots,
});

export default function BookingConfirmationLayout({ children }) {
  return children;
}
