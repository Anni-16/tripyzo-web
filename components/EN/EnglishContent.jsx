"use client";

import Link from "next/link";
import { FiPhone } from "react-icons/fi";
import { BsStars, BsShieldCheck, BsClock, BsCheckCircle } from "react-icons/bs";
import { getPhoneByLanguage, getPhoneHref } from "@/config/ContactInfo";

const EnglishContent = () => {
  const currentPhone = getPhoneByLanguage();
  const phoneNumber = currentPhone.displayNumber || currentPhone.number;
  const phoneHref = getPhoneHref();

  return (
    <section className="py-12 bg-white">
      <div className="container-custom mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-light/30 px-4 py-2 rounded-full border border-primary/20 mb-4">
            <BsStars className="text-primary text-sm" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Phone Support Available 24/7
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <strong className="text-primary">
              Book Domestic & International
            </strong>{" "}
            Flights with Tripyzo
          </h1>

          <p className="text-gray-600 text-base md:text-lg mb-6 max-w-3xl mx-auto">
            Booking flights doesn't have to be complicated. At Tripyzo, we
            provide{" "}
            <strong className="text-primary">
              flight booking assistance by phone
            </strong>{" "}
            to help you reserve both domestic and international flights with
            ease. Whether you're planning a short trip within the country or
            traveling abroad, our support team is available to guide you through
            the process.
          </p>

          <p className="text-gray-600 text-base mb-6 max-w-3xl mx-auto">
            If you prefer speaking with a real person instead of navigating
            multiple options online, you can call and get{" "}
            <strong className="text-primary">
              help booking flights quickly and clearly
            </strong>
            .
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-4">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold text-xl md:text-2xl transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30"
            >
              <FiPhone className="text-2xl" />
              Call for Free Assistance
            </a>
          </div>
          <p className="text-sm text-gray-500">{phoneNumber}</p>
        </div>

        {/* Flight Booking Assistance for Every Traveler */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            <strong className="text-primary">Flight Booking Assistance</strong>{" "}
            for Every Traveler
          </h2>
          <p className="text-gray-700 mb-4">
            We understand that every trip is different. That's why we offer{" "}
            <strong className="text-primary">
              flexible flight booking support
            </strong>{" "}
            tailored to your travel needs. When you call Tripyzo, you can get
            assistance with:
          </p>
          <div className="space-y-2 text-gray-700 ml-4">
            <p className="text-base">
              • Booking{" "}
              <strong className="text-primary">domestic flights</strong> across
              multiple routes
            </p>
            <p className="text-base">
              • Reserving{" "}
              <strong className="text-primary">international flights</strong>{" "}
              with available travel options
            </p>
            <p className="text-base">
              • Understanding flight schedules and connections
            </p>
            <p className="text-base">
              • General guidance during the booking process
            </p>
          </div>
          <p className="text-gray-700 mt-4">
            Our goal is to make your experience simple and stress-free by
            providing{" "}
            <strong className="text-primary">
              reliable flight reservation help
            </strong>
            .
          </p>
        </div>

        {/* Why Book Flights by Phone? */}
        <div className="mb-10 bg-primary-light/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why <strong className="text-primary">Book Flights by Phone</strong>{" "}
            with Tripyzo?
          </h2>
          <p className="text-gray-700 mb-4">
            Many travelers prefer{" "}
            <strong className="text-primary">booking flights by phone</strong>{" "}
            because it offers clarity and real-time support. Instead of
            searching through multiple websites, you can:
          </p>
          <div className="space-y-2 text-gray-700 ml-4">
            <p className="text-base">• Speak directly with an agent</p>
            <p className="text-base">
              • Ask questions about your travel options
            </p>
            <p className="text-base">
              • Get assistance based on your preferences
            </p>
            <p className="text-base">
              • Complete your booking with guided support
            </p>
          </div>
          <p className="text-gray-700 mt-4">
            This approach is especially helpful for international travel,
            multi-city trips, or last-minute planning.
          </p>
        </div>

        {/* Domestic & International Flight Options */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            <strong className="text-primary">Domestic & International</strong>{" "}
            Flight Options with Tripyzo
          </h2>
          <p className="text-gray-700 mb-4">
            Whether you're traveling within the country or internationally,
            Tripyzo helps you explore available options:
          </p>
          <div className="space-y-2 text-gray-700 ml-4">
            <p className="text-base">
              •{" "}
              <strong className="text-primary">
                Domestic flight booking assistance
              </strong>{" "}
              for convenient travel within your region
            </p>
            <p className="text-base">
              •{" "}
              <strong className="text-primary">
                International flight booking support
              </strong>{" "}
              for global destinations
            </p>
            <p className="text-base">
              • Information about routes, timings, and connections
            </p>
            <p className="text-base">
              • Help understanding different travel options before confirming
              your booking
            </p>
          </div>
          <p className="text-gray-700 mt-4">
            We aim to provide clear and useful information so you can make
            informed travel decisions.
          </p>
        </div>

        {/* Simple Booking Process */}
        <div className="mb-10 bg-gray-50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            <strong className="text-primary">Simple Booking</strong> Process
            with Tripyzo
          </h2>
          <p className="text-gray-700 mb-4">
            Booking your flight with phone support at Tripyzo is easy:
          </p>
          <div className="space-y-2 text-gray-700 ml-4">
            <p className="text-base">1. Call our support number</p>
            <p className="text-base">
              2. Share your travel details (destination, dates, passengers)
            </p>
            <p className="text-base">3. Receive available flight options</p>
            <p className="text-base">
              4. Complete your reservation with assistance
            </p>
          </div>
          <p className="text-gray-700 mt-4">
            This step-by-step process ensures you get the{" "}
            <strong className="text-primary">
              help you need to book flights efficiently
            </strong>
            .
          </p>
        </div>

        {/* Speak with an Agent Today */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Speak with a{" "}
            <strong className="text-primary">Tripyzo Agent Today</strong>
          </h2>
          <p className="text-gray-700 mb-4">
            If you're looking for{" "}
            <strong className="text-primary">
              help booking domestic or international flights
            </strong>
            , the Tripyzo team is here to assist you. You can call and speak
            with an agent who will guide you through the available options and
            help you complete your reservation.
          </p>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-10 p-6 bg-primary-light/20 rounded-2xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FiPhone className="text-primary text-2xl" />
            <h3 className="text-xl font-semibold text-gray-900">
              Need Immediate Assistance from Tripyzo?
            </h3>
          </div>
          <p className="text-gray-700 mb-4">
            Call Tripyzo now to get{" "}
            <strong className="text-primary">
              flight booking assistance by phone
            </strong>{" "}
            and make your travel planning easier.
          </p>
          <a
            href={phoneHref}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-primary-dark hover:shadow-lg"
          >
            <FiPhone className="text-lg" />
            Call Tripyzo Now - {phoneNumber}
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 pt-6 border-t border-gray-200">
          <span className="text-sm text-gray-500">✓ 24/7 Phone Support</span>
          <span className="text-sm text-gray-500">
            ✓ Domestic & International Flights
          </span>
          <span className="text-sm text-gray-500">✓ Secure Booking</span>
          <span className="text-sm text-gray-500">✓ Real-Time Assistance</span>
          <span className="text-sm text-gray-500">✓ No Hidden Fees</span>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Offers are for a limited time. Terms and conditions apply. Call
          Tripyzo to verify availability and current prices.
        </p>

        {/* Hidden SEO Content */}
        <div className="sr-only">
          <h2>
            Professional help booking domestic and international flights with
            Tripyzo
          </h2>
          <h3>Flight booking services with 24/7 phone support from Tripyzo</h3>
          <h4>Book domestic flights across USA with Tripyzo</h4>
          <h4>
            Book international flights to Europe, Asia, South America with
            Tripyzo
          </h4>
          <h4>Flight booking assistance by phone from Tripyzo</h4>
        </div>
      </div>
    </section>
  );
};

export default EnglishContent;
