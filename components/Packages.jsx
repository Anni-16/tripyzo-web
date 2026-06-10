"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BsStars,
  BsClock,
  BsPeople,
  BsGeoAlt,
  BsStarFill,
} from "react-icons/bs";
import {
  FaArrowRightLong,
  FaUmbrellaBeach,
  FaMountain,
  FaCity,
  FaHeart,
  FaTree,
  FaLandmark,
  FaPlane,
  FaHotel,
  FaUtensils,
} from "react-icons/fa6";
import { FiClock, FiUsers, FiCalendar, FiMapPin, FiStar } from "react-icons/fi";
import { getPhoneHref } from "@/config/ContactInfo";

const packages = [
  {
    id: 1,
    name: "New York City Explorer",
    location: "New York • Times Square • Central Park",
    image: "/images/packages/new-york.webp",
    price: 899,
    oldPrice: 1199,
    duration: "5 Days",
    groupSize: "Up to 8",
    badge: "City Break",
    badgeColor: "from-blue-500 to-cyan-500",
    includes: ["Flights", "Hotel", "Broadway Show", "City Tour"],
    rating: 4.8,
    reviews: 156,
    region: "usa",
    category: "city",
  },
  {
    id: 2,
    name: "Grand Canyon Adventure",
    location: "Arizona • Grand Canyon • Sedona",
    image: "/images/packages/grandcanyon.webp",
    price: 1299,
    oldPrice: 1599,
    duration: "6 Days",
    groupSize: "Up to 12",
    badge: "Adventure",
    badgeColor: "from-orange-500 to-red-500",
    includes: ["Flights", "Lodges", "Helicopter Tour", "Hiking"],
    rating: 4.9,
    reviews: 203,
    region: "usa",
    category: "mountain",
  },
  {
    id: 3,
    name: "Miami Beach Escape",
    location: "Florida • South Beach • Key West",
    image: "/images/packages/miami.webp",
    price: 799,
    oldPrice: 1099,
    duration: "5 Days",
    groupSize: "Up to 6",
    badge: "Beach",
    badgeColor: "from-teal-500 to-green-500",
    includes: ["Flights", "Beachfront Hotel", "Boat Tour", "Nightlife"],
    rating: 4.7,
    reviews: 98,
    region: "usa",
    category: "beach",
  },
  {
    id: 4,
    name: "California Dreamin'",
    location: "Los Angeles • San Francisco • San Diego",
    image: "/images/packages/california.webp",
    price: 1499,
    oldPrice: 1899,
    duration: "8 Days",
    groupSize: "Up to 10",
    badge: "West Coast",
    badgeColor: "from-purple-500 to-pink-500",
    includes: ["Flights", "Hotels", "Car Rental", "Theme Parks"],
    rating: 4.8,
    reviews: 167,
    region: "usa",
    category: "city",
  },
  {
    id: 5,
    name: "Yellowstone National Park",
    location: "Wyoming • Montana • Idaho",
    image: "/images/packages/yellowstone.webp",
    price: 1699,
    oldPrice: 2099,
    duration: "7 Days",
    groupSize: "Up to 10",
    badge: "Nature",
    badgeColor: "from-green-600 to-emerald-500",
    includes: ["Flights", "Cabins", "Wildlife Tours", "Park Fees"],
    rating: 4.9,
    reviews: 142,
    region: "usa",
    category: "mountain",
  },
  {
    id: 6,
    name: "New Orleans Jazz & Food",
    location: "Louisiana • French Quarter",
    image: "/images/packages/neworleans.webp",
    price: 699,
    oldPrice: 899,
    duration: "4 Days",
    groupSize: "Up to 8",
    badge: "Cultural",
    badgeColor: "from-yellow-600 to-amber-500",
    includes: ["Flights", "Hotel", "Food Tour", "Jazz Club"],
    rating: 4.8,
    reviews: 87,
    region: "usa",
    category: "city",
  },
  {
    id: 7,
    name: "European Dream",
    location: "Paris • Rome • Barcelona",
    image: "/images/packages/europe.webp",
    price: 2499,
    oldPrice: 3299,
    duration: "12 Days",
    groupSize: "Up to 15",
    badge: "Best Seller",
    badgeColor: "from-amber-500 to-orange-500",
    includes: ["Flights", "Hotels", "Breakfast", "Tours"],
    rating: 4.9,
    reviews: 128,
    region: "international",
    category: "city",
  },
  {
    id: 8,
    name: "Bali Paradise",
    location: "Indonesia",
    image: "/images/packages/bali.webp",
    price: 1299,
    oldPrice: 1699,
    duration: "8 Days",
    groupSize: "Up to 10",
    badge: "Popular",
    badgeColor: "from-purple-500 to-pink-500",
    includes: ["Flights", "Villa", "Breakfast", "Spa"],
    rating: 4.8,
    reviews: 96,
    region: "international",
    category: "beach",
  },
  {
    id: 9,
    name: "Dubai Luxury",
    location: "UAE",
    image: "/images/packages/dubai.webp",
    price: 1899,
    oldPrice: 2499,
    duration: "6 Days",
    groupSize: "Up to 8",
    badge: "Luxury",
    badgeColor: "from-amber-500 to-yellow-500",
    includes: ["Flights", "5-Star Hotel", "Desert Safari", "Burj Khalifa"],
    rating: 4.9,
    reviews: 64,
    region: "international",
    category: "city",
  },
  {
    id: 10,
    name: "Greek Islands",
    location: "Santorini • Mykonos",
    image: "/images/packages/greece.webp",
    price: 2199,
    oldPrice: 2799,
    duration: "10 Days",
    groupSize: "Up to 12",
    badge: "Romantic",
    badgeColor: "from-pink-500 to-rose-500",
    includes: ["Flights", "Hotels", "Ferry", "Breakfast"],
    rating: 4.7,
    reviews: 82,
    region: "international",
    category: "beach",
  },
  {
    id: 11,
    name: "Thai Adventure",
    location: "Bangkok • Phuket • Chiang Mai",
    image: "/images/packages/thailand.webp",
    price: 1599,
    oldPrice: 1999,
    duration: "14 Days",
    groupSize: "Up to 12",
    badge: "Adventure",
    badgeColor: "from-green-500 to-emerald-500",
    includes: ["Flights", "Hotels", "Tours", "Meals"],
    rating: 4.8,
    reviews: 156,
    region: "international",
    category: "city",
  },
  {
    id: 12,
    name: "Swiss Alps",
    location: "Switzerland",
    image: "/images/packages/swiss.webp",
    price: 2799,
    oldPrice: 3299,
    duration: "7 Days",
    groupSize: "Up to 10",
    badge: "Scenic",
    badgeColor: "from-blue-500 to-cyan-500",
    includes: ["Flights", "Hotel", "Train Pass", "Ski Pass"],
    rating: 4.9,
    reviews: 73,
    region: "international",
    category: "mountain",
  },
];

export default function Packages() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const phoneHref = getPhoneHref();

  const visiblePackages = showAll ? packages : packages.slice(0, 6);

  const categories = [
    { id: "all", label: "All Packages", icon: <BsStars /> },
    { id: "city", label: "City Break", icon: <FaCity /> },
    { id: "beach", label: "Beach", icon: <FaUmbrellaBeach /> },
    { id: "mountain", label: "Mountain", icon: <FaMountain /> },
    { id: "usa", label: "USA", icon: <FaLandmark /> },
  ];

  const filteredPackages = visiblePackages.filter((pkg) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "usa") return pkg.region === "usa";
    if (activeCategory === "international")
      return pkg.region === "international";
    return pkg.category === activeCategory;
  });

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}

        <div className="text-center max-w-6xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-theme-light rounded-full text-theme font-semibold text-sm mb-5">
            <BsStars className="text-lg" />
            <span> Travel Packages</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark">
            Curated <span className="text-accent">Travel Experiences</span>
          </h2>

          <p className="text-body text-md">
            Handpicked packages for every traveler. From domestic getaways to
            international adventures.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-white text-gray-600 hover:bg-primary-light hover:text-primary border border-gray-200"
              }`}
            >
              <span className="text-base">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPackages.map((pkg) => (
            <Link
              key={pkg.id}
              href={phoneHref}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`bg-gradient-to-r ${pkg.badgeColor} px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg`}
                  >
                    {pkg.badge}
                  </span>
                </div>

                {/* Region Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg ${
                      pkg.region === "usa"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                        : "bg-gradient-to-r from-purple-600 to-pink-600"
                    }`}
                  >
                    {pkg.region === "usa" ? "USA" : "International"}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <BsStarFill className="text-yellow-400 text-xs" />
                  <span className="text-white text-xs font-semibold">
                    {pkg.rating}
                  </span>
                  <span className="text-white/70 text-xs">({pkg.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Location */}
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                  <BsGeoAlt className="text-primary text-xs" />
                  <span className="truncate">{pkg.location}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                  {pkg.name}
                </h3>

                {/* Duration & Group Size */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <BsClock className="text-primary" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <BsPeople className="text-primary" />
                    <span>{pkg.groupSize}</span>
                  </div>
                </div>

                {/* Includes */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pkg.includes.slice(0, 3).map((item, index) => (
                    <span
                      key={index}
                      className="bg-primary-light text-primary text-[10px] px-2 py-0.5 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                  {pkg.includes.length > 3 && (
                    <span className="text-[10px] text-gray-400">
                      +{pkg.includes.length - 3} more
                    </span>
                  )}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    {pkg.oldPrice && (
                      <span className="text-gray-400 text-xs line-through mr-2">
                        ${pkg.oldPrice}
                      </span>
                    )}
                    <span className="text-primary font-bold text-lg">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-400 text-xs">/person</span>
                  </div>
                  <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <FaArrowRightLong className="text-xs" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        {filteredPackages.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-light text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all group"
            >
              <FaHeart className="text-sm" />
              <span>
                {showAll ? "Show Less Packages" : "View All Packages"}
              </span>
              <FaArrowRightLong
                className={`text-sm transition-transform group-hover:translate-x-1 ${
                  showAll ? "rotate-90" : ""
                }`}
              />
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No packages found for this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
