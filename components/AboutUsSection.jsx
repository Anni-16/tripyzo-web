"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiCheckCircle,
  FiShield,
  FiAward,
  FiStar,
  FiClock,
  FiGlobe,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiHeart,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import {
  MdSupportAgent,
  MdTravelExplore,
  MdFlightTakeoff,
  MdFlightLand,
  MdAirlineSeatReclineExtra,
  MdVerified,
} from "react-icons/md";
import { FaArrowRightLong, FaHeadset, FaPlane, FaTag } from "react-icons/fa6";
import { BsStars, BsShieldCheck, BsClockHistory } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi";
import { getPhoneByLanguage, getPhoneHref } from "@/config/ContactInfo";

export default function AboutSection() {
  const currentPhone = getPhoneByLanguage();
  const phoneNumber = currentPhone.displayNumber || currentPhone.number;
  const phoneHref = getPhoneHref();

  const services = [
    "Domestic & International Flights",
    "Multi-City & Round Trip Options",
    "Flexible Travel Dates",
    "Group Travel Arrangements",
    "Flight Change Assistance",
    "24/7 Customer Support",
    "Price Comparison",
    "Travel Planning Support",
  ];

  const stats = [
    { icon: FiUsers, value: "50,000+", label: "Happy Travelers" },
    { icon: FiGlobe, value: "100+", label: "Partner Airlines" },
    { icon: FiClock, value: "24/7", label: "Support Available" },
    { icon: FiDollarSign, value: "Best Price", label: "Match Guarantee" },
  ];

  const values = [
    {
      icon: MdVerified,
      title: "Trust & Transparency",
      description:
        "Clear pricing with no hidden fees. We provide honest information to help you make informed decisions.",
    },
    {
      icon: MdSupportAgent,
      title: "Dedicated Support",
      description:
        "Our team is here to assist you throughout your booking journey.",
    },
    {
      icon: FiShield,
      title: "Secure Process",
      description:
        "Your information is protected with industry-standard security measures.",
    },
    {
      icon: FiClock,
      title: "Timely Assistance",
      description: "Quick responses and efficient service to save you time.",
    },
  ];

  return (
    <section className="py-12 bg-white relative overflow-x-hidden">
      <div className="container-custom relative z-10 px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light rounded-full text-primary font-semibold text-sm mb-4">
            <BsStars className="text-lg" />
            <span>About Tripyzo</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Making Flight Booking{" "}
            <span className="text-accent">Simple & Transparent</span>
          </h2>

          <p className="text-gray-600 text-md max-w-2xl mx-auto">
            We help travelers find the best flight options with clear
            information and reliable assistance. No complicated processes — just
            straightforward booking support from people who care.
          </p>
        </div>

        {/* Mission & Values Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Mission Card */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
            <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mb-4">
              <MdTravelExplore className="text-xl text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              We believe that booking travel should be straightforward. Our goal
              is to simplify the process by providing clear information and
              personal support to help you find the right flight options for
              your needs.
            </p>
            <div className="flex items-center gap-2 text-primary text-xs">
              <BsShieldCheck />
              <span>100% Transparent Process</span>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="w-9 h-9 bg-primary-light rounded-lg flex items-center justify-center mb-2">
                    <Icon className="text-primary text-base" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                    {value.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-12">
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                What We Offer
              </h3>
              <p className="text-gray-500 text-sm">
                Comprehensive travel support for all your needs
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {services.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                    <FiCheckCircle className="text-primary text-[10px]" />
                  </div>
                  <span className="text-gray-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-primary/5 via-white to-primary/5 rounded-2xl p-6 md:p-8 border border-primary/10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full text-xs font-medium text-primary mb-3 shadow-sm">
                  <FiStar className="fill-primary text-primary w-3 h-3" />
                  <span>4.8 out of 5</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  Trusted by Travelers
                </h3>
                <p className="text-gray-600 text-sm mb-3 italic">
                  "Great experience finding flights for my family vacation. The
                  team was helpful and responsive throughout the process."
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-xs font-bold">JD</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Jennifer Davis
                    </p>
                    <p className="text-xs text-gray-500">Traveled to London</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <div className="text-primary font-bold text-xl">4.8</div>
                    <div className="flex items-center justify-center gap-0.5 text-[10px] text-yellow-400">
                      ★★★★★
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">Rating</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <div className="text-primary font-bold text-xl">98%</div>
                    <div className="text-[10px] text-gray-500 mt-1">
                      Recommend Us
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner - FIXED: Changed bg-theme to bg-gradient-to-r from-primary to-primary-dark */}
        <div className="relative w-full overflow-hidden rounded-2xl">
          <div className="bg-primary p-6 md:p-8 text-white">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="text-center lg:text-left">
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  Ready to Plan Your Trip?
                </h3>
                <p className="text-white/80 text-sm max-w-xl">
                  Let us help you find the right flight options for your next
                  journey
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={phoneHref}
                  className="group bg-white text-primary px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <FiPhone className="text-sm" />
                  Call {phoneNumber}
                </Link>
                <Link
                  href="/contact-us"
                  className="group border-2 border-white text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <FaHeadset className="text-sm" />
                  Contact Support
                  <FaArrowRightLong className="group-hover:translate-x-1 transition-transform text-sm" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
