import Head from "next/head";
import {
  ShieldCheckIcon,
  AlertTriangle,
  ClockIcon,
  XCircle,
  FileWarning,
} from "lucide-react";
import { HiOutlineSparkles } from "react-icons/hi";
import {
  getAddressDisplay,
  getEmailHref,
  getPhoneDisplay,
  getPhoneHref,
  getPrimaryEmail,
  getWebsiteDisplay,
  getWebsiteUrl,
} from "@/config/ContactInfo";

export default function CancellationPolicy() {
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
              <span>CANCELLATION POLICY</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Flight Cancellation{" "}
              <span className="text-primary relative">Guidelines</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Understand Tripyzo's cancellation process, fees, refund
              eligibility, and how to modify your travel plans with ease.
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
              At <strong>Tripyzo</strong>, we understand that travel plans may
              change due to unexpected circumstances. This Cancellation Policy
              explains how cancellations are handled, applicable charges, and
              the process for modifying or canceling bookings made through our
              website{" "}
              <a
                href={getWebsiteUrl()}
                className="text-primary font-medium underline"
              >
                {getWebsiteDisplay()}
              </a>
              .
            </p>
            <p className="mt-3">
              Please read this policy carefully before confirming your travel
              reservation. By using our services, you acknowledge and accept the
              terms outlined below.
            </p>
          </div>

          {/* Cancellation Requests */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              How to Cancel a Booking
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Contact our customer service team immediately at{" "}
                <a
                  href={getEmailHref()}
                  className="text-primary hover:underline"
                >
                  {email.address}
                </a>{" "}
                or by phone at{" "}
                <a href={getPhoneHref()} className="text-primary hover:underline">
                  {phoneNumber}
                </a>
                .
              </li>
              <li>
                Provide your booking reference number, full name, and details of
                your itinerary.
              </li>
              <li>
                Our agents will review the airline or travel supplier’s fare
                rules and advise you on applicable cancellation charges and
                refund options (if available).
              </li>
              <li>
                Once you confirm the cancellation, we will process it and send
                you a confirmation email.
              </li>
            </ol>
          </div>

          {/* Airline Rules */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Airline & Supplier Rules
            </h2>
            <p>
              All cancellations are subject to the individual airline or travel
              supplier’s policies. These rules determine whether your booking is
              refundable, partially refundable, or non-refundable.
              Airline-imposed penalties, reissue fees, or fare differences may
              apply depending on the fare type and time of cancellation.
            </p>
            <p className="mt-2">
              Some low-cost or promotional fares are non-cancellable once
              issued. In such cases, credits or rebooking options may be
              available, depending on airline policy.
            </p>
          </div>

          {/* Cancellation Fees */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Cancellation Fees & Charges
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="text-primary w-6 h-6 mt-1" />
              <p>
                Tripyzo applies a nominal service fee for processing
                cancellations in addition to airline or supplier charges. All
                fees will be disclosed before confirming your cancellation.
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Domestic Flights:</strong> Service fee up to $25 per
                passenger (in addition to airline penalties).
              </li>
              <li>
                <strong>International Flights:</strong> Service fee up to $75
                per passenger (in addition to airline penalties).
              </li>
              <li>
                Airlines may charge separate fees for no-shows or last-minute
                cancellations.
              </li>
            </ul>
          </div>

          {/* Time-Based Rules */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Time-Sensitive Cancellations
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <ClockIcon className="text-primary w-6 h-6 mt-1" />
              <p>
                Cancellation eligibility and refund value depend on when you
                cancel relative to your departure date.
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Within 24 hours of booking:</strong> Most airlines allow
                cancellations within 24 hours of purchase without penalty (for
                bookings made at least 7 days before departure).
              </li>
              <li>
                <strong>After 24 hours:</strong> Standard airline and agency
                cancellation rules apply. Refunds may be partial or unavailable
                depending on the fare.
              </li>
              <li>
                <strong>After departure or no-shows:</strong> No refund will be
                available unless otherwise specified by the airline.
              </li>
            </ul>
          </div>

          {/* Non-Refundable Scenarios */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Non-Cancellable & Non-Refundable Situations
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <XCircle className="text-primary w-6 h-6 mt-1" />
              <p>
                Certain bookings are strictly non-cancellable or non-refundable
                as per airline or hotel policy. These include but are not
                limited to:
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>Promotional or flash sale fares</li>
              <li>Group or bulk bookings</li>
              <li>Partially used flight tickets</li>
              <li>
                Bookings involving multiple suppliers with restrictive fare
                rules
              </li>
            </ul>
          </div>

          {/* Force Majeure */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Cancellations Due to External Events
            </h2>
            <p>
              In cases where travel is disrupted by weather conditions, natural
              disasters, strikes, government restrictions, or other events
              beyond our control, cancellation and refund eligibility will be
              determined by the airline or service provider. Tripyzo will assist
              you with rebooking or claim submissions where possible.
            </p>
          </div>

          {/* Refunds After Cancellation */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Refund After Cancellation
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <ShieldCheckIcon className="text-primary w-6 h-6 mt-1" />
              <p>
                Refunds for eligible cancellations are processed only after
                receiving confirmation from the airline or travel supplier.
                Refunds will be credited to the original form of payment within
                7–14 business days (up to 20 days for international carriers).
              </p>
            </div>
            <p>
              All refunds are subject to validation and may exclude applicable
              service or processing fees. Tripyzo does not hold or delay any
              approved refunds intentionally.
            </p>
          </div>

          {/* Compliance Notice */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Legal & Compliance
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <FileWarning className="text-primary w-6 h-6 mt-1" />
              <p>
                Tripyzo operates in compliance with U.S. Department of
                Transportation (DOT) regulations and international travel laws.
                All policies are designed to promote transparency,
                accountability, and customer protection, following Google Ads
                advertising standards.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Contact Information
            </h2>
            <p className="mb-3">
              For cancellations, modifications, or further assistance, please
              contact us:
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
                <a href={getPhoneHref()} className="text-primary hover:underline">
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
              Tripyzo acts as an independent travel agency. We facilitate
              bookings between customers and airlines, hotels, or travel
              suppliers but do not control their policies or decisions regarding
              cancellations or refunds. All travel arrangements are subject to
              the terms and conditions of the respective providers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
