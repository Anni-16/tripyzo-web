import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cheap Flights to New York | Tripyzo NYC Flight Deals",
  description:
    "Find cheap flights to New York with Tripyzo. Compare airline tickets to NYC airports and get booking support for city breaks, business travel, and family visits.",
  path: "/cheap-flights-to-new-york",
  keywords: [
    "cheap flights to New York",
    "New York flight deals",
    "NYC flights",
    "Tripyzo New York flights",
  ],
});

export default function DestinationLayout({ children }) {
  return children;
}
