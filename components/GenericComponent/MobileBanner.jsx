"use client";

import Image from "next/image";
import { getPhoneByLanguage, getPhoneHref } from "@/config/ContactInfo";
import { FiPhone } from "react-icons/fi";
import { FaClock, FaTag } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { BsLightningCharge } from "react-icons/bs";
import Navbar from "../Headers/Navbar";

const DEFAULT_CONTENT = {
  topBar: "Call & Get Unpublished Flight Deals",
  subheading: "Save on your next flight",
  actions: ["New Bookings", "Changes", "Cancellations", "Customer Service"],
  benefits: [
    "Instant Connection",
    "24/7 Support",
    "Secure Booking",
    "Exclusive Deals",
  ],
  bookingChanges: "Booking & Changes Over The Phone",
  securePayment: "Secure payment",
  fareReviewSupport: "Fare review support",
  noHold: "No Hold - Call Answered Fast",
  clickToCall: "Click to Call",
  phoneOnlySupport: "Phone-Only Booking Support",
  comparisonSupport:
    "Call Tripyzo customer service to compare domestic and international flight options with live booking support.",
  bottomBar: "Call & Get Flight Booking Support",
  bannerAlt: "Airline ticket booking",
  agentAlt: "Tripyzo booking agent",
};

const MobileBanner = ({
  headingText = "Cheap Flight Deals",
  content = DEFAULT_CONTENT,
}) => {
  const currentPhone = getPhoneByLanguage();
  const phoneNumber = currentPhone.displayNumber || currentPhone.number;
  const phoneHref = getPhoneHref();

  const benefits = [
    { icon: <BsLightningCharge />, text: content.benefits[0] },
    { icon: <FaClock />, text: content.benefits[1] },
    { icon: <FaShieldAlt />, text: content.benefits[2] },
    { icon: <FaTag />, text: content.benefits[3] },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full py-3 px-4 z-[999999] shadow-lg md:hidden bg-primary">
        <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
            <FiPhone className="relative text-white text-2xl animate-pulse" />
          </div>
          <div className="text-center">
            <p className="text-white/90 text-xs font-medium">
              {content.topBar}
            </p>
            <a href={phoneHref} className="block font-bold text-lg text-white tracking-wide">
              {phoneNumber}
            </a>
          </div>
        </div>
      </div>

      <section className="block md:hidden bg-gradient-to-b from-gray-50 to-white min-h-screen pb-4 mt-16">
        <div className="px-4 py-3 bg-white shadow-sm">
          <Navbar />
        </div>

        <div className="px-4 mt-4">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-4 text-center border border-primary/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {headingText}
            </h2>
            <p className="text-gray-600 text-sm">{content.subheading}</p>
          </div>
        </div>

        <div className="px-4 mt-4">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/Generic-Banner.png"
              alt={content.bannerAlt}
              width={500}
              height={200}
              className="w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>

        <div className="px-4 mt-4">
          <div className="grid grid-cols-2 gap-3">
            {content.actions.map(
              (text) => (
                <a
                  key={text}
                  href={phoneHref}
                  className="py-3 rounded-xl text-center font-semibold text-white bg-primary shadow-md active:scale-95 transition-transform"
                >
                  {text}
                </a>
              ),
            )}
          </div>
        </div>

        <div className="px-4 mt-4">
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.text}
                className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100"
              >
                <div className="text-primary text-xl mx-auto mb-1">
                  {benefit.icon}
                </div>
                <p className="text-xs text-gray-600 font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 mt-6">
          <h5 className="font-bold text-lg text-gray-900 text-center">
            {content.bookingChanges}
          </h5>
          <div className="flex justify-center flex-wrap gap-3 text-sm text-gray-600 mt-2">
            <span className="flex items-center gap-1">{content.securePayment}</span>
            <span className="flex items-center gap-1">
              {content.fareReviewSupport}
            </span>
          </div>
        </div>

        <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto my-4" />

        <div className="px-4 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
            <Image
              src="/images/calling-cus.png"
              alt={content.agentAlt}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-full border-3 border-primary shadow-lg mx-auto relative"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </div>
          <p className="font-bold text-gray-900 mt-3 text-lg">
            {content.noHold}
          </p>
          <p className="text-primary font-bold text-sm mt-1 animate-pulse">
            {content.clickToCall}
          </p>
        </div>

        <div className="px-4 mt-6">
          <a
            href={phoneHref}
            className="block bg-primary text-white rounded-2xl px-6 py-4 shadow-xl active:scale-95 transition-transform"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                <FiPhone className="relative text-2xl" />
              </div>
              <div>
                <small className="block text-xs text-white/80">
                  {content.phoneOnlySupport}
                </small>
                <span className="text-xl font-bold tracking-wide">
                  {phoneNumber}
                </span>
              </div>
            </div>
          </a>
        </div>

        <div className="px-4 mt-6 mb-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200">
            <p className="text-gray-800 font-semibold text-sm text-center leading-relaxed">
              {content.comparisonSupport}
            </p>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 w-full py-3 px-4 z-[999999] shadow-lg md:hidden bg-primary">
        <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
            <FiPhone className="relative text-white text-2xl animate-pulse" />
          </div>
          <div className="text-center">
            <p className="text-white/90 text-xs font-medium">
              {content.bottomBar}
            </p>
            <a href={phoneHref} className="block font-bold text-xl text-white tracking-wide">
              {phoneNumber}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileBanner;
