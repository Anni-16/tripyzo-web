import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cheap Flights to Las Vegas | Tripyzo LAS Flight Deals",
  description:
    "Find cheap flights to Las Vegas with Tripyzo. Compare airline ticket deals and get booking support for vacations, events, conferences, and weekend trips.",
  path: "/cheap-flights-to-las-vegas",
  keywords: [
    "cheap flights to Las Vegas",
    "Las Vegas flight deals",
    "LAS flights",
    "Tripyzo Las Vegas flights",
  ],
});

export default function DestinationLayout({ children }) {
  return children;
}
