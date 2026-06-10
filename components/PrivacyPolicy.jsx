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

export default function PrivacyPolicy() {
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
              <span>PRIVACY POLICY</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Privacy <span className="text-primary relative">Policy</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Learn how Tripyzo collects, uses, and protects your personal
              information when you use our website and services.
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
              At <strong>Tripyzo</strong>, your privacy is important to us. This
              Privacy Policy explains how we collect, use, disclose, and protect
              your personal information when you visit our website{" "}
              <a
                href={getWebsiteUrl()}
                className="text-primary font-medium underline"
              >
                {getWebsiteDisplay()}
              </a>
              or use our travel booking services.
            </p>
            <p className="mt-3">
              By using our website and services, you consent to the collection
              and use of your information as described in this policy.
            </p>
          </div>

          {/* Information We Collect */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Information We Collect
            </h2>
            <p>Tripyzo may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Personal Information:</strong> Name, email address,
                phone number, billing address, and payment details when you make
                a booking.
              </li>
              <li>
                <strong>Travel Information:</strong> Passport details, frequent
                flyer numbers, travel preferences, and special requests.
              </li>
              <li>
                <strong>Technical Information:</strong> IP address, browser
                type, device information, and cookies (see our Cookies Policy).
              </li>
              <li>
                <strong>Usage Information:</strong> Pages visited, search
                queries, and interactions with our website.
              </li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              How We Use Your Information
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="text-primary w-6 h-6 mt-1" />
              <p>Tripyzo uses your information to:</p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Process and confirm your flight, hotel, and car rental bookings
              </li>
              <li>Communicate with you about your reservations</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Personalize your travel recommendations and offers</li>
              <li>Improve our website functionality and user experience</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </div>

          {/* Sharing Your Information */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Sharing Your Information
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <ShieldCheckIcon className="text-primary w-6 h-6 mt-1" />
              <p>
                Tripyzo does not sell your personal information. We may share
                your information with:
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Airlines & Travel Suppliers:</strong> To complete your
                travel bookings.
              </li>
              <li>
                <strong>Payment Processors:</strong> To securely handle
                transactions.
              </li>
              <li>
                <strong>Service Providers:</strong> Third parties that assist
                with website operations and customer support.
              </li>
              <li>
                <strong>Legal Authorities:</strong> When required by law or to
                protect our rights.
              </li>
            </ul>
          </div>

          {/* Data Security */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Data Security
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <ClockIcon className="text-primary w-6 h-6 mt-1" />
              <p>
                Tripyzo implements industry-standard security measures to
                protect your personal information from unauthorized access,
                alteration, disclosure, or destruction. These include:
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>SSL encryption for data transmission</li>
              <li>Secure payment gateways</li>
              <li>Regular security audits and updates</li>
              <li>Restricted access to personal information</li>
            </ul>
            <p className="mt-2">
              While we strive to protect your data, no method of transmission
              over the internet is 100% secure.
            </p>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Your Rights
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <XCircle className="text-primary w-6 h-6 mt-1" />
              <p>
                Depending on your location, you may have the following rights:
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>
                Request correction of inaccurate or incomplete information
              </li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to certain data processing activities</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, please contact us using the information
              below.
            </p>
          </div>

          {/* Data Retention */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Data Retention
            </h2>
            <p>
              Tripyzo retains your personal information only as long as
              necessary to fulfill the purposes outlined in this policy, comply
              with legal obligations, resolve disputes, and enforce our
              agreements.
            </p>
          </div>

          {/* Children's Privacy */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Children's Privacy
            </h2>
            <p>
              Our services are not directed to individuals under the age of 18.
              Tripyzo does not knowingly collect personal information from
              children. If we become aware that we have collected information
              from a child, we will take steps to delete it promptly.
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
                Tripyzo may update this Privacy Policy from time to time to
                reflect changes in legal requirements, our practices, or
                industry standards. Any updates will be posted on this page with
                a revised "Last Updated" date. We encourage you to review this
                policy periodically.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Contact Information
            </h2>
            <p className="mb-3">
              If you have any questions about this Privacy Policy or how we
              handle your personal information, please contact us:
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
              Tripyzo is committed to protecting your privacy and ensuring
              transparency in our data collection practices. For more
              information about how we use cookies, please review our{" "}
              <a href="/cookie-policy" className="text-primary hover:underline">
                Cookies Policy
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
