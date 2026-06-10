import { createMetadata, noIndexRobots } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Flight Search Results | Tripyzo",
  description:
    "Review Tripyzo flight search results and compare available fare options for your selected route.",
  path: "/flights/search",
  keywords: ["Tripyzo flight search", "flight search results"],
  robots: noIndexRobots,
});

export default function FlightSearchLayout({ children }) {
  return children;
}
