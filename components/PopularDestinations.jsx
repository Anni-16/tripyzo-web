"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const destinations = [
  {
    id: 1,
    name: "New York",
    country: "USA",
    code: "JFK",
    image: "/images/destinations/new_york.webp",
    keyword: "Cheap Flights to New York",
    href: "/cheap-flights-to-new-york",
    price: 399,
  },

  {
    id: 2,
    name: "Las Vegas",
    country: "USA",
    code: "LAS",
    image: "/images/destinations/las_vegas.webp",
    keyword: "Cheap Flights to Las Vegas",
    href: "/cheap-flights-to-las-vegas",
    price: 479,
  },
  {
    id: 3,
    name: "Miami",
    country: "USA",
    code: "MIA",
    image: "/images/destinations/miami_beach.webp",
    keyword: "Cheap Flights to Miami",
    href: "/cheap-flights-to-miami",
    price: 429,
  },
  {
    id: 4,
    name: "Chicago",
    country: "USA",
    code: "ORD",
    image: "/images/destinations/chicago_de.webp",
    keyword: "Cheap Flights to Chicago",
    href: "/cheap-flights-to-chicago",
    price: 389,
  },
  {
    id: 5,
    name: "San Francisco",
    country: "USA",
    code: "SFO",
    image: "/images/destinations/san_francisco.webp",
    keyword: "Cheap Flights to San Francisco",
    href: "/cheap-flights-to-san-francisco",
    price: 519,
  },
  {
    id: 6,
    name: "Boston",
    country: "USA",
    code: "BOS",
    image: "/images/destinations/boston_de.webp",
    keyword: "Cheap Flights to Boston",
    href: "/cheap-flights-to-boston",
    price: 379,
  },
];

export default function PopularDestinations() {
  return (
    <section className="relative py-12 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className=" mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Cheap Flights to <span className="text-theme">USA</span>
          </h2>

          <p className="text-text-light text-base md:text-lg max-w-2xl ">
            Discover flight deals to top US cities. Explore each destination
            page for route details, booking tips, and current fare options.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 0 },
            768: { slidesPerView: 3, spaceBetween: 0 },
            1024: { slidesPerView: 4, spaceBetween: 0 },
          }}
          className="pb-2"
        >
          {destinations.map((dest) => (
            <SwiperSlide key={dest.id}>
              <Link
                href={dest.href}
                className="group block relative h-96 w-full overflow-hidden"
              >
                {/* Background Image */}
                <Image
                  src={dest.image}
                  alt={dest.keyword}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                {/* Price Badge - Top Right */}
                <div className="absolute top-4 right-4 bg-theme text-white px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 z-10">
                  <Plane className="w-3 h-3" />
                  <span>From ${dest.price}</span>
                </div>

                {/* Title Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-white text-2xl  font-medium mb-2 drop-shadow-lg">
                    {dest.keyword}
                  </h3>

                  {/* Destination Link */}
                  <div className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors group/link">
                    <span className="text-sm font-medium uppercase tracking-wider">
                      View Destination
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
