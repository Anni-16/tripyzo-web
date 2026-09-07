"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  ChevronDown,
  ChevronUp,
  Phone,
  ShieldCheck,
  Clock,
  CheckCircle,
  Award,
} from "lucide-react";
import {
  getPhoneByLanguage,
  getPhoneDisplay,
  getPhoneHref,
  getWebsiteDisplay,
} from "@/config/ContactInfo";

const featureBadges = [
  {
    icon: Clock,
    title: "24/7 Phone Support",
    desc: "Round-the-clock live agent assistance for all flight reservations.",
  },
  {
    icon: ShieldCheck,
    title: "Flexible Options",
    desc: "Compare fare classes, policies, and airline choices easily.",
  },
  {
    icon: Award,
    title: "Transparent Fares",
    desc: "Clear breakdown of tickets, baggage rules, and tax details.",
  },
  {
    icon: CheckCircle,
    title: "Instant Confirmation",
    desc: "Receive your official e-ticket and itinerary right to your email.",
  },
];

const reservationSteps = [
  {
    step: "1",
    title: "Search Flight Options",
    desc: "Select your departure city, destination, dates, and preferred cabin class.",
  },
  {
    step: "2",
    title: "Call Our Live Support",
    desc: "Speak with a dedicated agent to explore special fares and seat availability.",
  },
  {
    step: "3",
    title: "Confirm Your Reservation",
    desc: "Review your travel itinerary, passenger details, and complete payment securely.",
  },
  {
    step: "4",
    title: "Receive E-Ticket & Travel Info",
    desc: "Get immediate booking confirmation with your airline record locator (PNR).",
  },
];

const faqs = [
  {
    question: "How do I make a flight reservation with Tripyzo?",
    answer:
      "You can make a flight reservation by using our online search form or by calling our 24/7 support line. Our agents will assist you in comparing airlines, schedule options, and securing your ticket.",
  },
  {
    question: "Can I make a flight reservation over the phone?",
    answer:
      "Yes! Phone booking is one of our key services. Calling allows you to speak directly with an agent who can search multiple systems, check live availability, and clarify baggage or change policies.",
  },
  {
    question: "What details are required to complete a flight reservation?",
    answer:
      "You will need passenger full legal names (as shown on official government ID or passport), dates of birth, contact email, phone number, and valid payment details.",
  },
  {
    question: "How far in advance should I make my flight reservation?",
    answer:
      "For domestic flights, booking 3 to 6 weeks in advance often provides better rates. For international travel, reserving 2 to 4 months prior is recommended for optimal price and seat selection.",
  },
  {
    question: "Can I reserve a flight without paying immediately?",
    answer:
      "Depending on the airline rules and fare type, some reservations can be held for a limited time. Call our agents to ask if hold options are available for your specific route.",
  },
  {
    question: "How do I verify if my flight reservation is confirmed?",
    answer:
      "Once completed, you will receive a confirmation email containing your 6-character PNR (Passenger Name Record) code and full itinerary. You can also check your status online or call us anytime.",
  },
  {
    question: "Can I select my seat during the flight reservation process?",
    answer:
      "Yes, seat selection options depend on the airline and fare type chosen. Standard or preferred seat selection can be requested during booking or through our support team.",
  },
  {
    question: "How can I modify an existing flight reservation?",
    answer:
      "To change travel dates, flight times, or passenger details, call our support team. We will check your ticket's fare rules and guide you through exchange options or fees.",
  },
  {
    question: "What is the policy for flight reservation cancellations?",
    answer:
      "Cancellation policies vary by airline and fare type (refundable vs non-refundable). Contact our 24/7 customer service to review penalty rules, travel credits, or refund eligibility.",
  },
  {
    question: "How do refunds work for canceled flight reservations?",
    answer:
      "If your ticket is eligible for a refund, the amount will be processed back to your original payment method, following airline processing timeframes and policies.",
  },
  {
    question: "Can I request special assistance (wheelchair, meals, extra legroom)?",
    answer:
      "Absolutely. You can request dietary meals, wheelchair assistance, or special seating arrangements by mentioning your preferences when reserving over the phone.",
  },
  {
    question: "Are phone-only flight deals available?",
    answer:
      "Yes, certain airline promotions, published discounts, or group booking options are exclusive to phone support lines. Call us to compare available choices.",
  },
  {
    question: "Can I reserve multi-city or complex flight itineraries?",
    answer:
      "Yes! Multi-city, open-jaw, and complex international itineraries are easily arranged with the help of our experienced travel agents.",
  },
  {
    question: "What baggage allowance is included in my reservation?",
    answer:
      "Baggage allowances differ between carry-on and checked bags depending on the airline and cabin class. Details are specified before payment and noted in your confirmation.",
  },
  {
    question: "How will I receive my flight e-ticket?",
    answer:
      "Your official electronic ticket (e-ticket) with ticket numbers and complete flight itinerary will be delivered to your registered email address immediately after confirmation.",
  },
];

export default function EnFlightReservationContent() {
  const [openIndex, setOpenIndex] = useState(null);

  const phoneInfo = getPhoneByLanguage();
  const phoneNumber = phoneInfo.displayNumber || getPhoneDisplay();
  const phoneHref = getPhoneHref();
  const websiteDisplay = getWebsiteDisplay();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-50/50 py-8 md:py-14">
      <div className="container-custom mx-auto px-4 max-w-6xl">
        
        {/* Feature Badges Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {featureBadges.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition duration-200 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-theme/10 text-theme flex items-center justify-center mb-3">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* 4-Step Process Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-12">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-theme uppercase tracking-wider bg-theme/10 px-3 py-1 rounded-full">
              Easy Booking Guide
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
              4-Step Flight Reservation Process
            </h2>
            <p className="text-gray-600 text-sm mt-1 max-w-xl mx-auto">
              Follow these simple steps to reserve your flight tickets quickly with expert guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {reservationSteps.map(({ step, title, desc }) => (
              <div
                key={step}
                className="relative bg-slate-50 rounded-xl p-5 text-center flex flex-col items-center border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-theme text-white font-bold text-base flex items-center justify-center mb-3 shadow-md">
                  {step}
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">{title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Article Section */}
        <div className="bg-white rounded-2xl p-6 md:p-10 border border-gray-100 shadow-sm mb-12 space-y-8 text-gray-700 leading-relaxed">
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Flight Reservation Assistance with <span className="text-theme">Tripyzo</span>
            </h2>
            <p className="text-sm md:text-base leading-7">
              Reserving a flight ticket should be a clear, straightforward experience. At Tripyzo, we offer comprehensive flight reservation solutions designed for domestic and international travel. Whether you are arranging a planned vacation, a last-minute business trip, or a multi-city tour, our travel platform and support experts are here to assist you every step of the way.
            </p>
            <p className="text-sm md:text-base leading-7 mt-3">
              We connect travelers with major domestic and international airlines, providing options across Economy, Premium Economy, Business, and First Class cabins. With real-time route comparisons and personalized phone support, reserving your seat is easier than ever.
            </p>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              How to Make a Flight Reservation by Phone
            </h3>
            <p className="text-sm md:text-base leading-7 mb-4">
              Booking your tickets over the phone gives you direct access to live travel agents who can search across multiple systems simultaneously. Here is what you can expect when you call:
            </p>
            <ul className="space-y-3 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-theme mt-2 shrink-0" />
                <span><strong className="text-gray-900">Customized Route Search:</strong> Tell us your origin, destination, and travel dates, and we will present available schedules and layover choices.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-theme mt-2 shrink-0" />
                <span><strong className="text-gray-900">Fare Comparison:</strong> We help compare different airlines, refundable options, baggage inclusions, and restrictions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-theme mt-2 shrink-0" />
                <span><strong className="text-gray-900">Seat & Service Requests:</strong> Select seats, add extra luggage, or request special meal preferences during your phone call.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-theme mt-2 shrink-0" />
                <span><strong className="text-gray-900">Secure Payment & E-Ticket:</strong> Complete payment securely and receive your official itinerary with locator numbers instantly.</span>
              </li>
            </ul>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Tips for Securing the Best Flight Reservation Fares
            </h3>
            <p className="text-sm md:text-base leading-7 mb-4">
              Planning smartly can result in significant airfare savings. Keep these practical tips in mind when searching or calling for flight reservations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-1">Book Early</h4>
                <p className="text-xs text-gray-600">Securing tickets weeks in advance avoids peak fare hikes near departure dates.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-1">Flexible Travel Dates</h4>
                <p className="text-xs text-gray-600">Flying midweek (Tuesdays/Wednesdays) often offers lower prices than weekend departures.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-1">Compare Airline Bundles</h4>
                <p className="text-xs text-gray-600">Check baggage and seat rules to choose fares that offer true total value.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-1">Leverage Phone Assistance</h4>
                <p className="text-xs text-gray-600">Agents can often find alternative routes or combinations not easily visible online.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Prominent Call CTA Card Banner */}
        <div className="bg-gradient-to-r from-theme via-theme-dark to-blue-700 rounded-2xl p-6 md:p-10 text-white text-center shadow-lg mb-12 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              FLIGHT RESERVATION SUPPORT
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Need Help with Your Flight Reservation?
            </h2>
            <p className="text-blue-100 text-sm md:text-base max-w-xl mx-auto">
              Speak with a live Tripyzo travel expert right now to check fares, flight availability, or complete your reservation.
            </p>
            <div className="pt-2">
              <a
                href={phoneHref}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-theme hover:bg-blue-50 font-extrabold text-xl md:text-2xl rounded-full transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
              >
                <Phone className="w-6 h-6 fill-current text-theme" />
                <span>Call Now: {phoneNumber}</span>
              </a>
            </div>
            <p className="text-xs text-blue-200 font-medium">
              24/7 Toll-Free Support • Instant E-Ticket Confirmation • No Booking Hassles
            </p>
          </div>
        </div>

        {/* Comprehensive Accordion FAQs Section */}
        <div className="bg-white rounded-2xl p-6 md:p-10 border border-gray-100 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Frequently Asked <span className="text-theme">Questions</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Find detailed answers regarding flight reservations, ticket policies, changes, and phone assistance.
            </p>
          </div>

          <div className="space-y-3 max-w-4xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 bg-white"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Headphones className="w-5 h-5 text-theme shrink-0" />
                      <span className="font-semibold text-gray-900 text-sm md:text-base">
                        {faq.question}
                      </span>
                    </div>
                    <div className="text-theme shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
