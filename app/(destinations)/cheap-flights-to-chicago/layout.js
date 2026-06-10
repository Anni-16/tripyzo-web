import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cheap Flights to Chicago | Tripyzo ORD Flight Deals",
  description:
    "Find cheap flights to Chicago with Tripyzo. Compare airfare to the Windy City and get help choosing flight options for business or leisure travel.",
  path: "/cheap-flights-to-chicago",
  keywords: [
    "cheap flights to Chicago",
    "Chicago flight deals",
    "ORD flights",
    "Tripyzo Chicago flights",
  ],
});

export default function DestinationLayout({ children }) {
  return children;
}
