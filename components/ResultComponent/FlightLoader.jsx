"use client";

import Image from "next/image";
import {
  Calendar,
  Users,
  RefreshCw,
  ArrowLeftRight,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";
import airports from "@/data/airports.json";
import { getPhoneDisplay, getPhoneHref } from "@/config/ContactInfo";

function parseAirport(str) {
  const [iata, city, airportName, country, countryCode] = str.split("-");
  return { iata, city, airportName, country, countryCode };
}

function findAirportByIATA(iata) {
  const match = airports.find((a) => a.startsWith(iata.toUpperCase() + "-"));
  return match ? parseAirport(match) : null;
}

export default function FlightSearchLoader({
  logo = "/images/logo.png",
  agencyName = "",
  phone = getPhoneDisplay(),
  phoneHref = getPhoneHref(),
  from = "DEL",
  to = "JFK",
  departure = "Dec-06-2025",
  returnDate = "Dec-25-2025",
  passengers = 1,
  tripType = "Round Trip", // Add trip type prop
}) {
  const [progress, setProgress] = useState(0);

  // Lookup airport info (auto city + country)
  const fromInfo = findAirportByIATA(from);
  const toInfo = findAirportByIATA(to);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="bg-white w-full max-w-3xl shadow-xl rounded-2xl p-6 text-center border border-gray-200">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <Image
            src={logo}
            alt={`${agencyName} Logo`}
            width={120}
            height={50}
            className="object-contain"
          />
          <h2 className="text-gray-900 font-semibold text-lg">{agencyName}</h2>
          <p className="text-blue-700 font-bold text-base">{phone}</p>
        </div>

        {/* Loading Text */}
        <div className="mt-5 text-center">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
            Please Wait{" "}
            <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            We're searching the{" "}
            <span className="text-green-600 font-medium">best fares</span> for
            you...
          </p>
        </div>

        {/* Flight Info */}
        <div className="flex items-center justify-between mt-8 px-2">
          {/* From */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{from}</h1>
            <p className="text-xs text-gray-600 max-w-[120px] mx-auto">
              {fromInfo?.city}, {fromInfo?.country}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <ArrowLeftRight className="w-6 h-6 text-green-600 mb-1" />
            <span className="text-xs text-gray-500">{tripType}</span>
          </div>

          {/* To */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{to}</h1>
            <p className="text-xs text-gray-600 max-w-[120px] mx-auto">
              {toInfo?.city}, {toInfo?.country}
            </p>
          </div>
        </div>

        {/* Dates & Passenger Info */}
        <div className="grid grid-cols-3 gap-3 mt-6 text-center">
          <div>
            <Calendar className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-sm font-semibold text-gray-800">Departure</p>
            <p className="text-xs text-gray-600">{departure}</p>
          </div>

          {/* Only show return date for round trips */}
          {tripType === "Round Trip" ? (
            <div>
              <Calendar className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-sm font-semibold text-gray-800">Return</p>
              <p className="text-xs text-gray-600">{returnDate}</p>
            </div>
          ) : (
            <div className="opacity-30">
              <Calendar className="w-5 h-5 text-gray-400 mx-auto mb-1" />
              <p className="text-sm font-semibold text-gray-400">Return</p>
              <p className="text-xs text-gray-400">One Way</p>
            </div>
          )}

          <div>
            <Users className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-sm font-semibold text-gray-800">Passengers</p>
            <p className="text-xs text-gray-600">{passengers}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            {progress}% Completed
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-6">
          <a
            href={phoneHref}
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all duration-200 w-full"
          >
            <Phone className="w-5 h-5 text-white" />
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
}
