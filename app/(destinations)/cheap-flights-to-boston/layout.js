import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cheap Flights to Boston | Tripyzo BOS Flight Deals",
  description:
    "Find cheap flights to Boston with Tripyzo. Compare airline ticket options, review flexible travel dates, and get booking support for trips to Boston.",
  path: "/cheap-flights-to-boston",
  keywords: [
    "cheap flights to Boston",
    "Boston flight deals",
    "BOS flights",
    "Tripyzo Boston flights",
  ],
});

export default function DestinationLayout({ children }) {
  return children;
}
