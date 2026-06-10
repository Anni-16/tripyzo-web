"use client";

import {
  Plane,
  ShieldCheck,
  Star,
  Globe,
  Headset,
  Lightbulb,
  Users,
  Clock,
  Mail,
  Phone,
  MapPin,
  Award,
  Heart,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  getPhoneByLanguage,
  getPhoneHref,
} from "@/config/ContactInfo";

const AboutUs = () => {
  const currentPhone = getPhoneByLanguage();
  const phoneNumber = currentPhone.displayNumber || currentPhone.number;
  const phoneHref = getPhoneHref();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Hero Section */}
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">
          <Star className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            About Tripyzo
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Your Trusted Travel Partner
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Helping travelers book flights, hotels, and vacation packages —
          safely, simply, and affordably.
        </p>
      </div>

      {/* Who We Are */}
      <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Who We Are
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong className="text-primary">Tripyzo</strong> is a U.S.-based
              travel service provider dedicated to helping travelers plan and
              book trips with confidence. Founded with a vision to make travel
              simpler, more transparent, and accessible, we connect travelers
              with global airlines, hotels, and vacation services through a
              reliable and secure platform.
            </p>
            <p>
              Our journey began with a small team of passionate travel experts
              focused on providing clear information and excellent customer
              care. Today, we continue to uphold the same values — reliability,
              integrity, and customer-first service — ensuring every booking is
              smooth, secure, and stress-free.
            </p>
            <p>
              From our U.S. headquarters, we collaborate with global partners to
              offer flexible travel options that meet every budget and schedule
              — whether for business trips, family vacations, or personal
              getaways.
            </p>
          </div>
        </div>
        <div className="bg-primary/5 rounded-2xl p-6 flex items-center justify-center border border-primary/10">
          <img
            src="/images/call-center.webp"
            alt="Tripyzo Team"
            className="rounded-lg shadow-md w-full h-auto max-h-96 object-cover"
          />
        </div>
      </div>

      {/* Mission and Values */}
      <div className="bg-primary text-white p-8 md:p-10 mb-16 rounded-2xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center flex justify-center items-center">
          <Lightbulb className="mr-3 w-7 h-7 text-white" />
          Our Mission & Core Values
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Customer-Focused Service
                </h3>
                <p className="text-white/90">
                  We believe in providing personalized travel support and clear
                  communication. Every recommendation, package, and booking is
                  made with our customers’ convenience in mind.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Global Reach, Local Care
                </h3>
                <p className="text-white/90">
                  With partnerships across airlines, hotels, and service
                  providers worldwide, we combine international access with the
                  personal touch of a local travel advisor.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Data Privacy & Security
                </h3>
                <p className="text-white/90">
                  All bookings made through Tripyzo are processed through
                  secure, encrypted systems. We comply with data protection and
                  consumer privacy regulations.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Continuous Improvement
                </h3>
                <p className="text-white/90">
                  We regularly update our technology and processes to meet
                  global travel standards and deliver a smooth booking
                  experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          What <span className="text-primary">Tripyzo</span> Offers
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-600">
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Domestic and international flight bookings
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Verified hotel reservations across all major destinations
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Affordable car rental options
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Customizable vacation and group travel packages
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Assistance with itinerary planning and booking changes
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Secure payment processing and transparent pricing
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              24/7 customer support for inquiries and modifications
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Guidance for travel protection and insurance options
            </li>
          </ul>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-10 mb-16 border border-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Why Travelers Choose <span className="text-primary">Tripyzo</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Secure & Reliable
            </h3>
            <p className="text-gray-500 text-sm">
              We prioritize security and reliability in every transaction,
              maintaining strict compliance with data and consumer protection
              laws.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headset className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Dedicated Support
            </h3>
            <p className="text-gray-500 text-sm">
              Our experienced travel agents are available 24/7 to help you book,
              modify, or manage your trip at your convenience.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Transparent Service
            </h3>
            <p className="text-gray-500 text-sm">
              We believe in clear, upfront pricing — no hidden charges, no
              misleading offers. Every booking includes complete cost details.
            </p>
          </div>
        </div>
      </div>

      {/* Stats / Trust Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary">
            50K+
          </div>
          <div className="text-sm text-gray-500">Happy Travelers</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary">
            100+
          </div>
          <div className="text-sm text-gray-500">Airline Partners</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary">
            24/7
          </div>
          <div className="text-sm text-gray-500">Customer Support</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary">4.9</div>
          <div className="text-sm text-gray-500">Customer Rating</div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 rounded-2xl p-8 md:p-10 text-center border border-primary/10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Ready to Plan Your Next Trip?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Call Tripyzo today and let our travel experts help you find the best
          deals
        </p>
        <a
          href={phoneHref}
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all hover:shadow-lg"
        >
          <Phone className="w-5 h-5" />
          Call {phoneNumber}
        </a>
        <p className="text-xs text-gray-400 mt-4">
          No booking fees • Free consultation
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
