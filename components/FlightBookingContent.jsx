"use client";

import { useState } from "react";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Phone,
  Plane,
  Shield,
  Clock,
  CreditCard,
} from "lucide-react";
import { getPhoneDisplay, getPhoneHref } from "@/config/ContactInfo";

export default function FlightBookingContent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = getPhoneDisplay();
  const phoneHref = getPhoneHref();

  const t = {
      title: "Online Flight Booking Has Never Been Easier With Tripyzo!",
      heading2: "Book Cheap Flights and Airline Tickets with Tripyzo",
      intro:
        "Looking for cheap flights or the best place to buy airline tickets online? Tripyzo makes it easy and affordable.",
      description:
        "Tripyzo is your trusted travel partner, specializing in affordable flight bookings to top destinations worldwide. With our expertise in the travel industry, we bring you the best deals on domestic and international flights.",

      features: [
        {
          icon: <Plane className="w-5 h-5" />,
          title: "Extensive Airline Coverage",
          description:
            "We partner with 400+ airlines globally including Delta, United, American, Emirates, Qatar Airways, and more.",
        },
        {
          icon: <Shield className="w-5 h-5" />,
          title: "Best Price Guarantee",
          description:
            "Our smart search algorithms find you the cheapest flights - often saving you up to 40% on airfare.",
        },
        {
          icon: <Clock className="w-5 h-5" />,
          title: "24/7 Customer Support",
          description:
            "Call us anytime! Our travel experts are available round-the-clock to help with bookings and changes.",
        },
        {
          icon: <CreditCard className="w-5 h-5" />,
          title: "Secure Booking",
          description:
            "Book with confidence using our SSL-secured payment system. All major credit cards accepted.",
        },
      ],

      whyChoose: [
        "Personalized Phone Support - Talk to real travel experts",
        "Exclusive Phone-Only Deals - Better prices when you call",
        "Flexible Payment Options - Easy installment plans",
        "Instant Confirmation - Get your tickets immediately",
        "Free Cancellation - On select flights",
        "No Hidden Fees - Transparent pricing always",
      ],

      flightTypes: [
        {
          type: "One-Way Flights",
          desc: "Perfect for solo travelers, business trips, or relocations",
        },
        {
          type: "Round Trip Flights",
          desc: "Ideal for vacations, family holidays, and business travel",
        },
        {
          type: "Multi-City Flights",
          desc: "Visit multiple destinations in one booking",
        },
        {
          type: "Last-Minute Deals",
          desc: "Great discounts on upcoming flights",
        },
      ],

      cta: "Ready to Fly? Call Us Today!",
      ctaSub: "Get the best deals on flights to USA, Europe, Asia, and more",
      seeLess: "See Less",
      seeMore: "See More",
  };

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="container-custom mx-auto">
          {/* Main Title */}
          <div className=" mb-8">
            <h1 className="text-2xl  font-semibold text-dark mb-4">
              {t.title}
            </h1>
          </div>

          {/* Content */}
          <div
            className={`space-y-6 text-text-light ${!isExpanded && "max-h-[500px] overflow-hidden relative"}`}
          >
            {/* Heading 2 */}
            <h2 className="text-xl md:text-2xl font-semibold text-dark">
              {t.heading2}
            </h2>

            <p className="text-base leading-relaxed">
              <strong>{t.intro}</strong>
            </p>

            <p className="text-base leading-relaxed">{t.description}</p>

            {/* Why Choose Section */}
            <h3 className="text-lg md:text-xl font-semibold text-dark mt-6">
              Why Choose Tripyzo for Your Airline Reservations?
            </h3>

            <p className="text-base leading-relaxed">
              With thousands of satisfied customers worldwide, Tripyzo has
              redefined how people book flights. Here's why travelers trust us:
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              {t.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="text-theme shrink-0 mt-1">{feature.icon}</div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-text-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Flight Types */}
            <h3 className="text-lg md:text-xl font-semibold text-dark mt-6">
              Your Go-To Platform for Cheap Plane Tickets
            </h3>

            <p className="text-base leading-relaxed">
              Whether you're booking last-minute travel or planning months
              ahead, Tripyzo is optimized to make your flight booking journey
              seamless:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              {t.flightTypes.map((flight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-theme rounded-full mt-2"></div>
                  <div>
                    <strong className="text-dark">{flight.type}:</strong>
                    <span className="text-text-light ml-1">{flight.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Why Choose List */}
            <h3 className="text-lg md:text-xl font-semibold text-dark mt-6">
              What Makes Tripyzo Different?
            </h3>

            <ul className="space-y-2 my-4">
              {t.whyChoose.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-theme rounded-full"></div>
                  <span className="text-text-light">{item}</span>
                </li>
              ))}
            </ul>

            {/* Call to Action */}
            <div className="bg-theme-light p-6 rounded-xl text-center my-6">
              <h2 className="text-xl md:text-2xl font-bold text-theme mb-2">
                {t.cta}
              </h2>
              <p className="text-text-light mb-4">{t.ctaSub}</p>
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 bg-theme text-white px-6 py-3 rounded-lg font-semibold hover:bg-hover-dark transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                Call {phoneNumber}
              </a>
            </div>

            {/* Gradient Overlay for collapsed state */}
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}
          </div>

          {/* Read More / Read Less Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-theme font-semibold transition-all duration-300"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  {t.seeLess}
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  {t.seeMore}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
