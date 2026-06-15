"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getPhoneByLanguage, getPhoneHref } from "@/config/ContactInfo";
import { FiPhone } from "react-icons/fi";

const MobileModal = ({ airlineName = "Airline", translations }) => {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const currentPhone = getPhoneByLanguage(pathname);
  const phoneNumber = currentPhone.displayNumber || currentPhone.number;
  const phoneHref = getPhoneHref(pathname);

  // Determine colors based on language
  const bgColorClass = "bg-primary";
  const textColorClass = "text-primary";

  // Use the passed airlineName prop
  const displayName = `${airlineName} `;

  const content = {
    english: {
      closeBtn: "Close",
      newBooking: "New Booking",
      changes: "Changes",
      cancel: "Cancel",
      support: "Support",
      noHold: "No Hold • Answered in 5 Sec",
      tapToCall: "Tap to Call Now",
      unpublishedDeals: "Phone-Only Unpublished Deals",
      secureBooking: "Secure Booking",
      support247: "24/7 Support",
      bestPrice: "Best Price",
    },
  };

  const t = translations || content.english;

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[2147483647] md:hidden bg-black/70 backdrop-blur-sm">
      {/* MODAL */}
      <div className="relative bg-white w-screen h-screen overflow-y-auto flex flex-col">
        {/* HEADER */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={28}
            priority
            className="hover:opacity-90 transition-opacity"
          />

          {/* Phone Number Display */}
          <a
            href={phoneHref}
            className={`${textColorClass} font-bold text-base flex items-center gap-1`}
          >
            <FiPhone className="text-sm" />
            {phoneNumber}
          </a>

          <button
            onClick={() => setShowModal(false)}
            aria-label={t.closeBtn}
            className="text-gray-400 hover:text-red-500 text-2xl leading-none transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            &times;
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-5 flex-1">
          {/* Airline Title */}
          <div
            className={`${bgColorClass} text-white py-3 rounded-xl mb-4 shadow-md`}
          >
            <div className="inline-flex items-center justify-center gap-2 w-full">
              <h3 className="text-sm font-semibold text-center">
                {displayName}
              </h3>
            </div>
          </div>

          {/* Banner Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg mb-4">
            <Image
              src="/images/Airline-Ticket.png"
              alt={`${airlineName} Ticket`}
              width={500}
              height={260}
              priority
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[t.newBooking, t.changes, t.cancel, t.support].map((text) => (
              <a
                key={text}
                href={phoneHref}
                className={`${bgColorClass} text-white py-3 rounded-xl text-center font-semibold text-sm shadow-md active:scale-95 transition-transform`}
              >
                {text}
              </a>
            ))}
          </div>

          {/* Agent Section */}
          <div className="text-center mb-5">
            <div className="relative inline-block">
              <div
                className={`absolute inset-0 ${bgColorClass}/20 rounded-full blur-xl`}
              ></div>
              <Image
                src="/images/calling-cus.png"
                alt="Agent"
                width={80}
                height={80}
                className="mx-auto rounded-full border-3 border-white shadow-lg relative"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <p className="text-center text-sm font-bold text-gray-900 mt-3">
              {t.noHold}
            </p>
            <p
              className={`text-center ${textColorClass} font-bold text-sm mt-1 animate-pulse`}
            >
              {t.tapToCall}
            </p>
          </div>

          {/* Main CTA Button */}
          <a
            href={phoneHref}
            className={`${bgColorClass} text-white rounded-2xl px-6 py-4 flex justify-center max-w-xs mx-auto shadow-lg active:scale-95 transition-transform`}
          >
            <div className="text-center">
              <small className="block text-xs text-white/80">
                {t.unpublishedDeals}
              </small>
              <div className="flex items-center justify-center gap-2 mt-1">
                <FiPhone className="text-lg" />
                <span className="text-xl font-bold tracking-wide">
                  {phoneNumber}
                </span>
              </div>
            </div>
          </a>

          {/* Trust Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-gray-400">
              <span>✓ {t.secureBooking}</span>
              <span>•</span>
              <span>✓ {t.support247}</span>
              <span>•</span>
              <span>✓ {t.bestPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileModal;
