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

export default function RefundPolicy() {
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
              <span>REFUND POLICY</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Refund <span className="text-primary relative">Policy</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Understand Tripyzo's refund process, eligibility criteria, and how
              to request a refund for your travel bookings.
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
              At <strong>Tripyzo</strong>, we strive to ensure your satisfaction
              with every booking. This Refund Policy explains the circumstances
              under which refunds may be issued, how to request a refund, and
              the timelines involved for bookings made through our website{" "}
              <a
                href={getWebsiteUrl()}
                className="text-primary font-medium underline"
              >
                {getWebsiteDisplay()}
              </a>
              .
            </p>
            <p className="mt-3">
              Please read this policy carefully before requesting a refund. All
              refunds are subject to the terms and conditions of the respective
              airline or travel supplier.
            </p>
          </div>

          {/* When Refunds Are Available */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              When Refunds Are Available
            </h2>
            <p>Refunds may be available in the following situations:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Cancellation within 24 hours:</strong> Most airlines
                allow full refunds for bookings canceled within 24 hours of
                purchase (for bookings made at least 7 days before departure).
              </li>
              <li>
                <strong>Refundable Fare Types:</strong> Some fare classes allow
                cancellations with partial or full refunds, minus applicable
                fees.
              </li>
              <li>
                <strong>Schedule Changes:</strong> If the airline makes
                significant schedule changes, you may be eligible for a refund.
              </li>
              <li>
                <strong>Flight Cancellations:</strong> If the airline cancels
                your flight and cannot rebook you on an alternative flight.
              </li>
              <li>
                <strong>Service Issues:</strong> In cases of billing errors or
                services not rendered as described.
              </li>
            </ul>
          </div>

          {/* How to Request a Refund */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              How to Request a Refund
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="text-primary w-6 h-6 mt-1" />
              <p>To request a refund, please follow these steps:</p>
            </div>
            <ol className="list-decimal pl-6 space-y-1">
              <li>
                Contact Tripyzo customer support at{" "}
                <a href={getEmailHref()} className="text-primary hover:underline">
                  {email.address}
                </a>{" "}
                or{" "}
                <a href={getPhoneHref()} className="text-primary hover:underline">
                  {phoneNumber}
                </a>
              </li>
              <li>
                Provide your booking reference number and reason for refund
                request
              </li>
              <li>
                Our team will review airline policies and advise on eligibility
              </li>
              <li>Submit any required documentation (if applicable)</li>
              <li>
                Once approved, refund will be processed to original payment
                method
              </li>
            </ol>
          </div>

          {/* Refund Processing Time */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Refund Processing Time
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <ClockIcon className="text-primary w-6 h-6 mt-1" />
              <p>
                Refund processing times vary depending on the airline or
                supplier:
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Domestic Flights:</strong> 7-14 business days after
                approval
              </li>
              <li>
                <strong>International Flights:</strong> 14-20 business days
                after approval
              </li>
              <li>
                <strong>Hotels & Packages:</strong> 10-15 business days after
                approval
              </li>
            </ul>
            <p className="mt-2">
              Please note that your bank or credit card issuer may take
              additional time to reflect the refund in your account.
            </p>
          </div>

          {/* Non-Refundable Situations */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Non-Refundable Situations
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <XCircle className="text-primary w-6 h-6 mt-1" />
              <p>
                Refunds are typically not available in the following situations:
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>Non-refundable or promotional fare types</li>
              <li>No-show for your flight without prior cancellation</li>
              <li>Partial use of a round-trip ticket</li>
              <li>
                Voluntary cancellation after 24-hour grace period (for
                non-refundable fares)
              </li>
              <li>Changes in personal plans or travel preferences</li>
              <li>Weather-related disruptions (airline policies vary)</li>
            </ul>
          </div>

          {/* Refund Amount & Fees */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Refund Amount & Fees
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <ShieldCheckIcon className="text-primary w-6 h-6 mt-1" />
              <p>
                The refund amount you receive may be less than your original
                payment due to:
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>Airline-imposed cancellation penalties</li>
              <li>
                Tripyzo service fees (non-refundable after booking confirmation)
              </li>
              <li>
                Difference between original fare and current fare (for certain
                changes)
              </li>
              <li>
                Third-party fees (insurance, seat selection, baggage fees)
              </li>
            </ul>
            <p className="mt-2">
              All applicable fees will be disclosed before you confirm your
              cancellation and refund request.
            </p>
          </div>

          {/* Partial Refunds */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Partial Refunds
            </h2>
            <p>
              In some cases, partial refunds may be available even when full
              refunds are not. Examples include:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Downgrading from business class to economy</li>
              <li>
                Removing optional services (e.g., extra baggage, seat selection)
              </li>
              <li>
                Using a flight credit for future travel (airline policies vary)
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
              beyond our control, refund eligibility will be determined by the
              airline or service provider. Tripyzo will assist you with refund
              requests where possible.
            </p>
          </div>

          {/* Updates to Policy */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Updates to This Policy
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <FileWarning className="text-primary w-6 h-6 mt-1" />
              <p>
                Tripyzo may update this Refund Policy from time to time to
                reflect changes in legal requirements, business practices, or
                airline policies. Any updates will be posted on this page with a
                revised "Last Updated" date.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Contact Information
            </h2>
            <p className="mb-3">
              For refund requests or questions about this policy, please contact
              us:
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
              Tripyzo acts as an independent travel agency. Final refund
              decisions are made by airlines, hotels, or travel suppliers based
              on their individual policies. Tripyzo will assist you in the
              refund process but cannot guarantee refund approval beyond the
              terms set by the service provider.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
