import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cheap Flights to San Francisco | Tripyzo SFO Flight Deals",
  description:
    "Find cheap flights to San Francisco with Tripyzo. Compare Bay Area airfare and get booking support for business trips, family visits, and California vacations.",
  path: "/cheap-flights-to-san-francisco",
  keywords: [
    "cheap flights to San Francisco",
    "San Francisco flight deals",
    "SFO flights",
    "Tripyzo San Francisco flights",
  ],
});

export default function DestinationLayout({ children }) {
  return children;
}
