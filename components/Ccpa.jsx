import {
  getAddressDisplay,
  getEmailHref,
  getPhoneDisplay,
  getPhoneHref,
  getPrimaryEmail,
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

export default function Ccpa() {
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
              <span>CCPA PRIVACY NOTICE</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              California Consumer{" "}
              <span className="text-primary relative">Privacy Act Notice</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Please read this California Consumer Privacy Act (CCPA) Notice
              carefully before using Tripyzo's website and travel services.
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
              This California Consumer Privacy Act ("CCPA") Notice forms part of
              Tripyzo’s Privacy Policy and applies exclusively to California
              residents ("Consumers," "you," or "your") as defined under
              applicable California privacy laws.
            </p>

            <p className="mt-3">
              Unless otherwise stated, terms used in this Notice carry the same
              meaning as provided in our Privacy Policy or under the CCPA. In
              the event of any inconsistency between this Notice and our Privacy
              Policy, this Notice shall govern solely with respect to California
              residents and their personal information.
            </p>

            <p className="mt-3">
              This Notice explains your rights regarding the collection, use,
              disclosure, and sharing of personal information by Tripyzo.
            </p>
          </div>

          {/* About Tripyzo */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              About Tripyzo
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <BadgeCheck className="text-primary w-6 h-6 mt-1" />

              <p>
                Tripyzo.com is an independent travel agency offering booking
                assistance for flights, hotels, vacation packages, and other
                travel-related services.
              </p>
            </div>

            <p className="mt-2">
              We are not directly affiliated with airlines or travel suppliers
              unless explicitly stated. All bookings, fares, and pricing remain
              subject to availability and supplier approval.
            </p>

            <p className="mt-2">
              Tripyzo.com is owned and operated by{" "}
              <strong>Aadi Travel LLC</strong>.
            </p>
          </div>

          {/* Right to Know */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Right to Know What Personal Information We Collect
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <ShieldCheckIcon className="text-primary w-6 h-6 mt-1" />

              <p>
                California residents have the right to request information
                regarding the personal information Tripyzo has collected about
                them during the previous 12 months.
              </p>
            </div>

            <p className="mt-2">This may include details about:</p>

            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>The categories of personal information collected</li>
              <li>The sources from which information was collected</li>
              <li>The business purpose for collecting the data</li>
              <li>How the information has been used or disclosed</li>
              <li>The categories of third parties receiving the data</li>
            </ul>

            <p className="mt-3">
              California residents may submit up to two verified requests within
              a 12-month period.
            </p>
          </div>

          {/* Right to Delete */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Right to Request Deletion
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <XCircle className="text-primary w-6 h-6 mt-1" />

              <p>
                You have the right to request deletion of personal information
                collected by Tripyzo, subject to specific legal and operational
                exceptions permitted under California law.
              </p>
            </div>

            <p className="mt-2">
              After verifying your identity and determining that no legal
              obligation requires us to retain the information, we will delete
              your data from our systems.
            </p>

            <p className="mt-2">
              In certain cases, we may retain limited information necessary to:
            </p>

            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Complete bookings or requested transactions</li>
              <li>Detect fraud or security incidents</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Maintain records of privacy-related requests</li>
            </ul>
          </div>

          {/* Right to Opt Out */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Right to Opt Out of “Sale” or Sharing of Personal Information
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="text-primary w-6 h-6 mt-1" />

              <p>
                California residents have the right to opt out of the “sale” or
                sharing of personal information as defined under the CCPA.
              </p>
            </div>

            <p className="mt-2">
              Tripyzo may share certain categories of information with
              advertising, analytics, or marketing service providers in a manner
              that may be considered a “sale” or “sharing” under California
              privacy laws.
            </p>

            <p className="mt-3">
              This does not include sensitive financial information or data
              shared solely for operational and booking purposes.
            </p>

            <p className="mt-3">
              To exercise your right to opt out, California users may use the{" "}
              <strong>“Do Not Sell or Share My Personal Information”</strong>{" "}
              link available on our website.
            </p>

            <p className="mt-3">
              Please note that opting out does not prevent us from sharing
              information:
            </p>

            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                With vendors or affiliates supporting operational services
              </li>
              <li>As necessary to process bookings or fulfill requests</li>
              <li>During mergers, acquisitions, or restructuring activities</li>
              <li>Where disclosure is legally required</li>
            </ul>
          </div>

          {/* Exercise Rights */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              How to Exercise Your Rights
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <ClockIcon className="text-primary w-6 h-6 mt-1" />

              <p>
                California residents may submit requests regarding access,
                deletion, or privacy rights using the following methods:
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-1 mt-2">
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
                Through the “Do Not Sell or Share My Personal Information” link
                available on our website
              </li>
            </ul>

            <p className="mt-3">
              We may need to verify your identity before processing certain
              requests in order to protect your personal information.
            </p>
          </div>

          {/* Non Discrimination */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Non-Discrimination
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <FileWarning className="text-primary w-6 h-6 mt-1" />

              <p>
                Tripyzo will not discriminate against California residents for
                exercising any rights granted under the CCPA.
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Denying services or bookings</li>
              <li>Charging different prices or fees</li>
              <li>Providing a different level of service quality</li>
              <li>Imposing penalties for privacy requests</li>
            </ul>
          </div>

          {/* Updates */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Changes to This Notice
            </h2>

            <p>
              Tripyzo reserves the right to update or modify this CCPA Notice at
              any time. Changes will become effective immediately upon posting
              on this page.
            </p>

            <p className="mt-2">
              Continued use of our website and services after updates
              constitutes acceptance of the revised Notice.
            </p>
          </div>

          {/* Contact Info */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Contact Information
            </h2>

            <p className="mb-3">
              If you have questions regarding this CCPA Notice or wish to
              exercise your California privacy rights, please contact us:
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
              Tripyzo provides travel booking assistance as an independent
              travel agency. We are not responsible for the actions, delays,
              errors, or omissions of airlines, hotels, or third-party travel
              providers.
            </p>

            <p className="mt-2">
              Your use of our website and services is at your own discretion,
              and we recommend reviewing all supplier policies carefully before
              completing any booking.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
