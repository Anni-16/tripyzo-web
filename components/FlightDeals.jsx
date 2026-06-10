"use client";

import { getPhoneDisplay, getPhoneHref } from "@/config/ContactInfo";
import { useFlight } from "@/context/FlightContext";
import { encryptSearchParams } from "@/lib/encryption";
import { PhoneCall } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Helper function to get future dates
const getFutureDate = (daysFromNow) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
};

const flightDeals = [
  {
    id: 1,
    destination: "New York",
    from: "London",
    fromCode: "LHR",
    toCode: "JFK",
    departureDate: getFutureDate(7),
    returnDate: getFutureDate(14),
    displayDeparture: new Date(getFutureDate(7)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    displayReturn: new Date(getFutureDate(14)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    price: 399,
    image: "/images/destinations/new-york.webp",
  },
  {
    id: 2,
    destination: "Miami",
    from: "London",
    fromCode: "LHR",
    toCode: "MIA",
    departureDate: getFutureDate(10),
    returnDate: getFutureDate(17),
    displayDeparture: new Date(getFutureDate(10)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    displayReturn: new Date(getFutureDate(17)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    price: 449,
    image: "/images/destinations/miami.webp",
  },
  {
    id: 3,
    destination: "Los Angeles",
    from: "London",
    fromCode: "LHR",
    toCode: "LAX",
    departureDate: getFutureDate(14),
    returnDate: getFutureDate(21),
    displayDeparture: new Date(getFutureDate(14)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    displayReturn: new Date(getFutureDate(21)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    price: 499,
    image: "/images/destinations/los-angeles.webp",
  },
  {
    id: 4,
    destination: "Chicago",
    from: "London",
    fromCode: "LHR",
    toCode: "ORD",
    departureDate: getFutureDate(21),
    returnDate: getFutureDate(28),
    displayDeparture: new Date(getFutureDate(21)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    displayReturn: new Date(getFutureDate(28)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    price: 429,
    image: "/images/destinations/chicago.webp",
  },
  {
    id: 5,
    destination: "Las Vegas",
    from: "London",
    fromCode: "LHR",
    toCode: "LAS",
    departureDate: getFutureDate(25),
    returnDate: getFutureDate(32),
    displayDeparture: new Date(getFutureDate(25)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    displayReturn: new Date(getFutureDate(32)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    price: 479,
    image: "/images/destinations/las-vegas.webp",
  },
  {
    id: 6,
    destination: "Orlando",
    from: "London",
    fromCode: "LHR",
    toCode: "MCO",
    departureDate: getFutureDate(30),
    returnDate: getFutureDate(37),
    displayDeparture: new Date(getFutureDate(30)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    displayReturn: new Date(getFutureDate(37)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    price: 459,
    image: "/images/destinations/orlando.webp",
  },
  {
    id: 7,
    destination: "San Francisco",
    from: "London",
    fromCode: "LHR",
    toCode: "SFO",
    departureDate: getFutureDate(35),
    returnDate: getFutureDate(42),
    displayDeparture: new Date(getFutureDate(35)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    displayReturn: new Date(getFutureDate(42)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    price: 519,
    image: "/images/destinations/san-francisco.webp",
  },
  {
    id: 8,
    destination: "Boston",
    from: "London",
    fromCode: "LHR",
    toCode: "BOS",
    departureDate: getFutureDate(40),
    returnDate: getFutureDate(47),
    displayDeparture: new Date(getFutureDate(40)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    displayReturn: new Date(getFutureDate(47)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    price: 389,
    image: "/images/destinations/boston.webp",
  },
  {
    id: 9,
    destination: "Seattle",
    from: "London",
    fromCode: "LHR",
    toCode: "SEA",
    departureDate: getFutureDate(45),
    returnDate: getFutureDate(52),
    displayDeparture: new Date(getFutureDate(45)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    displayReturn: new Date(getFutureDate(52)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    price: 509,
    image: "/images/destinations/seattle.webp",
  },
];

export default function FlightDeals() {
  const router = useRouter();
  const { setResults, setSearchData, setLoading, setError } = useFlight();
  const [searchingDeal, setSearchingDeal] = useState(null);
  const phoneNumber = getPhoneDisplay();
  const phoneHref = getPhoneHref();

  const handleDealClick = async (deal) => {
    setSearchingDeal(deal);
    setLoading(true);
    setError(null);

    const payload = {
      origin: deal.fromCode,
      destination: deal.toCode,
      departureDate: deal.departureDate,
      returnDate: deal.returnDate,
      tripType: "roundtrip",
      passengers: {
        adults: 2,
        children: 0,
        infants: 0,
      },
      cabinClass: "economy",
    };

    const nextSearchData = {
      ...payload,
      fromDisplay: `${deal.fromCode} - ${deal.from}`,
      toDisplay: `${deal.toCode} - ${deal.destination}`,
    };

    setResults([]);
    setSearchData(nextSearchData);

    const encryptedQuery = encryptSearchParams(nextSearchData);
    router.push(`/flights/search?q=${encryptedQuery}`);
  };

  return (
    <section className="relative py-12 bg-gray-50">
      {searchingDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-theme"></div>

            <h3 className="text-xl font-bold text-dark">Searching Flights</h3>

            <p className="mt-2 text-sm text-gray-500">
              Finding best available flights from{" "}
              <span className="font-semibold text-dark">
                {searchingDeal.fromCode}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-dark">
                {searchingDeal.toCode}
              </span>
            </p>

            <p className="mt-3 text-xs text-gray-400">
              Please wait, this may take a few seconds...
            </p>

            <a
              href={phoneHref}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-theme px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-hover-dark"
            >
              <PhoneCall className="h-4 w-4" />
              Call {phoneNumber}
            </a>
          </div>
        </div>
      )}

      <div className="container-custom">
        <div className="text-left mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-3">
            Exclusive <span className="text-theme">Flight Deals</span> to USA
          </h2>

          <p className="text-left text-text-light text-base md:text-lg max-w-2xl">
            Book your next adventure to the United States with our hand-picked
            flight deals. Save up to 40% on direct flights from London to top US
            destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {flightDeals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => !searchingDeal && handleDealClick(deal)}
              className={`bg-white overflow-hidden border border-gray-100 flex cursor-pointer transition-all duration-300 hover:border-theme ${
                searchingDeal ? "pointer-events-none opacity-70" : ""
              }`}
            >
              <div className="w-28 h-28 relative">
                <Image
                  src={deal.image}
                  alt={deal.destination}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 p-3">
                <h3 className="text-base font-bold text-dark mb-0.5">
                  {deal.destination}
                </h3>

                <div className="flex items-center justify-between gap-1 text-gray-500 text-xs mb-2">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">
                      from: {deal.from}
                    </p>
                    <span className="text-[11px]">
                      {deal.displayDeparture} - {deal.displayReturn}
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <p className="text-[10px] text-gray-400">Starting From</p>
                    <span className="text-xl font-bold text-theme">
                      ${deal.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
