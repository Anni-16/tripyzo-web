import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cheap Flights & Airline Ticket Deals | Tripyzo",
  description:
    "Search cheap flights with Tripyzo, compare airline ticket options, and get English-speaking booking support for domestic and international travel.",
  path: "/flights",
  keywords: [
    "cheap flights",
    "airline ticket deals",
    "Tripyzo flights",
    "compare flight prices",
    "domestic and international flights",
  ],
});

export default function FlightsLayout({ children }) {
  return children;
}
