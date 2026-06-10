import { createMetadata, noIndexRobots } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Secure Flight Booking | Tripyzo",
  description:
    "Complete a secure Tripyzo flight booking, add traveler details, review add-ons, and submit payment information.",
  path: "/booking",
  keywords: ["Tripyzo booking", "secure flight booking", "flight checkout"],
  robots: noIndexRobots,
});

export default function BookingLayout({ children }) {
  return children;
}
