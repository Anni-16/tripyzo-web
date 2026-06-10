import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cheap Flights to Miami | Tripyzo MIA Flight Deals",
  description:
    "Find cheap flights to Miami with Tripyzo. Compare airfare for beach trips, cruises, family travel, nightlife, and South Florida getaways.",
  path: "/cheap-flights-to-miami",
  keywords: [
    "cheap flights to Miami",
    "Miami flight deals",
    "MIA flights",
    "Tripyzo Miami flights",
  ],
});

export default function DestinationLayout({ children }) {
  return children;
}
