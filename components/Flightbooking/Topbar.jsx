"use client";
import { Headset, Phone, Sparkles } from "lucide-react";
import Link from "next/link";
import { getPhoneDisplay, getPhoneHref } from "@/config/ContactInfo";

const TopBar = () => {
  const phoneNumber = getPhoneDisplay();
  const phoneHref = getPhoneHref();

  return (
    <div className="bg-gradient-to-r from-primary/90 to-primary/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs sm:text-sm font-bold">
              CALL NOW & SAVE UP TO 60%
            </span>
          </div>
          <div className="hidden sm:block text-white/40">|</div>
          <div className="flex items-center gap-1">
            <Headset className="w-3.5 h-3.5" />
            <span className="text-xs sm:text-sm">
              24/7 FLIGHT BOOKING EXPERTS
            </span>
          </div>
          <div className="hidden sm:block text-white/40">|</div>
          <Link
            href={phoneHref}
            className="flex items-center gap-1 font-bold text-sm sm:text-base hover:opacity-90 transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{phoneNumber}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
