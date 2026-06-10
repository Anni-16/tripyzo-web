"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import FlightSearchForm from "./FlightSearchForm";
import Link from "next/link";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { BsStars, BsHeadset } from "react-icons/bs";

export default function Banner({
  pageType = "home",
  titleLine1,
  titleLine2,
  description,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const searchFormRef = useRef(null);

  const bannerConfig = {
      home: {
        bgImage: "/images/hero-bg-light.webp",
        badge: "Your Trusted Travel Partner",
        titleLine1: "Fly Smart, Save Big with",
        titleLine2: "Tripyzo's Exclusive Flight Deals",
        description:
          "Stop searching countless websites. Call Tripyzo now and let our travel experts find you the best flight deals instantly. Get exclusive phone-only discounts, 24/7 support, and hassle-free booking experience.",
        searchBtn: "Search Flights",
        callBtn: "Call & Save Now",
      },
      flights: {
        bgImage: "/images/flights-bg.webp",
        badge: "Find Your Perfect Flight",
        titleLine1: "Compare 100+ Airlines",
        titleLine2: "Get the Best Airfare Deals",
        description:
          "Search and compare flights from over 100 airlines worldwide. Find the lowest prices, flexible dates, and exclusive deals for your next journey with Tripyzo.",
        searchBtn: "Search Flights",
        callBtn: "Call to Book",
      },
  };

  const config = {
    ...bannerConfig[pageType],
    ...(titleLine1 ? { titleLine1 } : {}),
    ...(titleLine2 ? { titleLine2 } : {}),
    ...(description ? { description } : {}),
  };

  useEffect(() => {
    const img = new Image();
    img.src = config.bgImage;
    img.onload = () => setImageLoaded(true);
  }, [config.bgImage]);

  const scrollToSearchForm = () => {
    const searchFormElement = document.getElementById("flight-search-form");
    if (searchFormElement) {
      searchFormElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="w-full relative">
      {/* Fixed Background Image */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{
            backgroundImage: `url('${config.bgImage}')`,
            opacity: imageLoaded ? 0.7 : 0,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/30"></div>
      </div>

      <div className="relative w-full">
        {/* Hero Section - Centered Layout */}
        <div className="relative min-h-[55vh] md:min-h-[50vh] lg:min-h-[60vh] w-full flex items-center justify-center">
          <div className="container-custom relative z-10 py-8 md:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto text-center">
              {/* Main Title */}
              <h2 className="font-heading font-bold leading-tight mb-3 md:mb-5">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl block text-gray-900">
                  {config.titleLine1}
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl block text-primary mt-1 md:mt-2">
                  {config.titleLine2}
                </span>
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
                {config.description}
              </p>
            </div>

            {/* Search Form */}
            <div id="flight-search-form" className="scroll-mt-30 pt-8 md:pt-12">
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-12 bg-gray-200 animate-pulse rounded-lg"
                      />
                    ))}
                  </div>
                }
              >
                <FlightSearchForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
