import {
  getAddressDisplay,
  getEmailHref,
  getPhoneDisplay,
  getPhoneHref,
  getPrimaryEmail,
  getWebsiteDisplay,
  getWebsiteUrl,
} from "@/config/ContactInfo";

import {
  AlertTriangle,
  BadgeCheck,
  ClockIcon,
  FileWarning,
  ShieldCheckIcon,
  XCircle,
} from "lucide-react";

import { HiOutlineSparkles } from "react-icons/hi";

export default function AdvertiserPolicy() {
  const email = getPrimaryEmail();
  const phoneNumber = getPhoneDisplay();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-14 bg-gray-100 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light rounded-full text-primary text-sm font-medium mb-6">
              <HiOutlineSparkles className="text-lg" />
              <span>ADVERTISER DISCLOSURE</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Advertiser{" "}
              <span className="text-primary relative">Disclosure</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Learn how Tripyzo presents promotional offers, sponsored listings,
              and travel deals with transparency and customer trust.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg space-y-12 text-gray-700">
          {/* Introduction */}
          <div>
            <h2 className="text-3xl font-bold text-secondary mb-4 font-heading">
              Introduction
            </h2>

            <p>
              At <strong>Tripyzo</strong>, transparency and trust are important
              parts of how we serve travelers. This Advertiser Disclosure
              explains how promotional content, travel offers, sponsored
              listings, and special deals may be displayed on{" "}
              <a
                href={getWebsiteUrl()}
                className="text-primary font-medium underline"
              >
                {getWebsiteDisplay()}
              </a>
              .
            </p>

            <p className="mt-3">
              Our goal is to help travelers make informed booking decisions
              through clear communication, fair pricing information, and
              responsible advertising practices.
            </p>
          </div>

          {/* Transparency */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Our Commitment to Transparency
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <BadgeCheck className="text-primary w-6 h-6 mt-1" />

              <p>
                Tripyzo works to ensure that advertisements, travel deals, and
                promotional content displayed on our website are presented
                clearly and responsibly.
              </p>
            </div>

            <p className="mt-2">
              We aim to provide accurate information about available flights,
              fares, travel services, and booking options so users can compare
              offers with confidence.
            </p>
          </div>

          {/* Accurate Promotions */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Accurate Promotion of Travel Offers
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <ShieldCheckIcon className="text-primary w-6 h-6 mt-1" />

              <p>
                Any deal, discount, fare, or promotional travel offer shown on
                Tripyzo is intended to reflect genuine booking opportunities
                available at the time of display.
              </p>
            </div>

            <p className="mt-2">
              We make reasonable efforts to communicate important pricing
              details, inclusions, limitations, and booking conditions before a
              customer completes a reservation.
            </p>
          </div>

          {/* Terms */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Clear Terms & Conditions
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="text-primary w-6 h-6 mt-1" />

              <p>
                Promotional offers may include specific terms, restrictions,
                eligibility requirements, travel dates, cancellation rules, or
                supplier conditions.
              </p>
            </div>

            <p className="mt-2">
              We encourage all customers to review the final booking details,
              fare rules, and supplier terms carefully before confirming any
              travel purchase.
            </p>
          </div>

          {/* Offer Distinction */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Clear Distinction Between Offers
            </h2>

            <p>
              Tripyzo may display standard fares, discounted offers,
              limited-time promotions, or sponsored travel listings. We work to
              present these offers in a way that helps users understand the
              difference between regular pricing and promotional opportunities.
            </p>

            <p className="mt-2">
              Sponsored or promotional placements do not guarantee that an offer
              is the lowest available price for every traveler or itinerary.
            </p>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Real-Time Pricing & Availability
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <ClockIcon className="text-primary w-6 h-6 mt-1" />

              <p>
                Flight prices, hotel rates, package pricing, and seat
                availability may change at any time due to supplier inventory,
                airline rules, demand, and real-time market conditions.
              </p>
            </div>

            <p className="mt-2">
              While Tripyzo works to display updated pricing, final fares and
              availability are confirmed only during the booking process before
              payment or ticketing.
            </p>
          </div>

          {/* Compliance */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Regulatory & Advertising Compliance
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <FileWarning className="text-primary w-6 h-6 mt-1" />

              <p>
                Tripyzo strives to follow applicable advertising laws, consumer
                protection standards, and responsible marketing practices.
              </p>
            </div>

            <p className="mt-2">
              Promotional content is intended to be presented in a lawful,
              ethical, and transparent manner.
            </p>
          </div>

          {/* Privacy */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Customer Privacy Protection
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <XCircle className="text-primary w-6 h-6 mt-1" />

              <p>
                Your privacy matters to us. Promotional communications and
                advertising-related activity are handled in accordance with our
                Privacy Policy.
              </p>
            </div>

            <p className="mt-2">
              Tripyzo does not use customer information for unauthorized
              marketing purposes and works to protect personal data shared
              through our website and booking channels.
            </p>
          </div>

          {/* Improvement */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Continuous Improvement
            </h2>

            <p>
              We regularly review our advertising and promotional practices to
              improve clarity, accuracy, user experience, and customer trust.
              Customer feedback, industry standards, and best practices help us
              maintain responsible advertising on Tripyzo.
            </p>
          </div>

          {/* Contact Info */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Contact Information
            </h2>

            <p className="mb-3">
              If you have questions about this Advertiser Disclosure, please
              contact Tripyzo:
            </p>

            <ul className="list-disc pl-6 space-y-1">
              <li>
                Email:{" "}
                <a
                  href={getEmailHref()}
                  className="text-primary hover:underline"
                >
                  {email.address}
                </a>
              </li>

              <li>
                Phone:{" "}
                <a
                  href={getPhoneHref()}
                  className="text-primary hover:underline"
                >
                  {phoneNumber}
                </a>
              </li>

              <li>Address: {getAddressDisplay()}</li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Disclaimer
            </h2>

            <p>
              Tripyzo.com is owned and operated by{" "}
              <strong>Aadi Travel LLC</strong>. Tripyzo is an independent travel
              agency and is not directly affiliated with airlines, hotels, or
              travel suppliers unless clearly stated.
            </p>

            <p className="mt-2">
              All fares, offers, promotions, and availability are subject to
              change until confirmed and ticketed.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
