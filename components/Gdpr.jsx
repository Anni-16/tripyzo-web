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
  Database,
  FileWarning,
  Globe2,
  LockKeyhole,
  ShieldCheckIcon,
  UserCheck,
} from "lucide-react";

import { HiOutlineSparkles } from "react-icons/hi";

export default function Gdpr() {
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
              <span>GDPR PRIVACY NOTICE</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              GDPR <span className="text-primary relative">Privacy Notice</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Please read this GDPR Privacy Notice carefully before using
              Tripyzo's website and travel booking services.
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
              This General Data Protection Regulation ("GDPR") Privacy Notice
              supplements Tripyzo’s Privacy Policy and applies specifically to
              users located within the European Economic Area ("EEA") and the
              United Kingdom ("UK").
            </p>

            <p className="mt-3">
              This Notice explains how Tripyzo collects, stores, processes, and
              protects your personal information when you access our website{" "}
              <a
                href={getWebsiteUrl()}
                className="text-primary font-medium underline"
              >
                {getWebsiteDisplay()}
              </a>{" "}
              and use our travel-related services.
            </p>

            <p className="mt-3">
              By using our website and services, you acknowledge and agree to
              the practices described in this GDPR Privacy Notice.
            </p>
          </div>

          {/* Who We Are */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Who We Are
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <BadgeCheck className="text-primary w-6 h-6 mt-1" />

              <p>
                Tripyzo.com is an independent travel agency offering booking
                assistance for flights, hotels, car rentals, vacation packages,
                and related travel services.
              </p>
            </div>

            <p className="mt-2">
              We are not directly affiliated with airlines, hotel brands, or
              travel suppliers unless otherwise stated. All prices and fares are
              subject to availability and may change until ticketed.
            </p>

            <p className="mt-2">
              Tripyzo.com is owned and operated by{" "}
              <strong>Aadi Travel LLC</strong>.
            </p>
          </div>

          {/* Data Controller */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Data Controller
            </h2>

            <p>
              Tripyzo acts as the data controller for personal information
              collected through our website, customer support channels, and
              travel booking services.
            </p>

            <p className="mt-3">
              This includes information collected when you:
            </p>

            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Book or inquire about travel services</li>
              <li>Contact customer support</li>
              <li>Subscribe to promotional communications</li>
              <li>Interact with our website or advertisements</li>
              <li>Submit forms or participate in surveys</li>
            </ul>
          </div>

          {/* Information We Collect */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Information We Collect
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <Database className="text-primary w-6 h-6 mt-1" />

              <p>
                Depending on how you interact with our services, we may collect
                personal and technical information.
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-1">
              <li>Full name and contact details</li>
              <li>Email address and phone number</li>
              <li>Billing and payment information</li>
              <li>Travel itinerary and booking details</li>
              <li>Passport or identification details if required</li>
              <li>IP address and browser/device information</li>
              <li>Website usage and analytics information</li>
            </ul>
          </div>

          {/* How We Use Data */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              How We Use Your Information
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <UserCheck className="text-primary w-6 h-6 mt-1" />

              <p>
                We process your personal information for legitimate business and
                operational purposes.
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-1">
              <li>Process and manage travel bookings</li>
              <li>Provide customer service and booking assistance</li>
              <li>Send confirmations and important travel updates</li>
              <li>Improve website functionality and user experience</li>
              <li>Prevent fraud and unauthorized transactions</li>
              <li>Comply with legal and regulatory obligations</li>
              <li>Send promotional offers where permitted by law</li>
            </ul>
          </div>

          {/* International Transfers */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              International Data Transfers
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <Globe2 className="text-primary w-6 h-6 mt-1" />

              <p>
                Your personal information may be transferred and processed
                outside the EEA or UK, including in the United States, in order
                to provide requested travel services.
              </p>
            </div>

            <p className="mt-2">
              Where required, Tripyzo implements appropriate safeguards such as
              Standard Contractual Clauses (SCCs) and secure processing
              agreements with third-party providers.
            </p>
          </div>

          {/* Data Retention */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Data Retention
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <ClockIcon className="text-primary w-6 h-6 mt-1" />

              <p>
                We retain personal information only for as long as necessary to
                fulfill business, legal, and operational requirements.
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-1">
              <li>Managing and completing bookings</li>
              <li>Providing customer support</li>
              <li>Preventing fraud and abuse</li>
              <li>Meeting accounting and legal obligations</li>
              <li>Resolving disputes or chargebacks</li>
            </ul>
          </div>

          {/* Security */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              How We Protect Your Information
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <LockKeyhole className="text-primary w-6 h-6 mt-1" />

              <p>
                Tripyzo maintains commercially reasonable technical and
                organizational safeguards to help protect your information from
                unauthorized access, misuse, or disclosure.
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-1">
              <li>SSL-secured website encryption</li>
              <li>Secure payment gateways</li>
              <li>Restricted internal access controls</li>
              <li>Fraud monitoring systems</li>
              <li>PCI-compliant payment processing where applicable</li>
            </ul>
          </div>

          {/* Sharing Information */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Sharing of Information
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <ShieldCheckIcon className="text-primary w-6 h-6 mt-1" />

              <p>
                We may share your personal information with trusted third
                parties when necessary to provide our services.
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-1">
              <li>Airlines and travel suppliers</li>
              <li>Hotels and transportation providers</li>
              <li>Payment processors</li>
              <li>Analytics and hosting providers</li>
              <li>Customer support partners</li>
              <li>Government or legal authorities where required by law</li>
            </ul>
          </div>

          {/* GDPR Rights */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Your GDPR Rights
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="text-primary w-6 h-6 mt-1" />

              <p>
                If you are located in the EEA or UK, you have important rights
                regarding your personal information.
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-1">
              <li>Request access to your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Restrict or object to certain processing activities</li>
              <li>Withdraw consent where applicable</li>
              <li>Request portability of your data</li>
              <li>Opt out of direct marketing communications</li>
            </ul>

            <p className="mt-3">
              To exercise your rights, please contact our support team using the
              information below.
            </p>
          </div>

          {/* Children's Privacy */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Children’s Privacy
            </h2>

            <p>
              Tripyzo does not knowingly collect personal information from
              individuals under the age of 18. If we become aware that such
              information has been collected unintentionally, we will promptly
              remove it from our systems.
            </p>
          </div>

          {/* Limitation */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Limitation of Liability
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <FileWarning className="text-primary w-6 h-6 mt-1" />

              <p>
                While we work hard to protect your information, no online system
                or internet transmission can be guaranteed to be 100% secure.
              </p>
            </div>

            <p>
              Tripyzo shall not be responsible for unauthorized access caused by
              factors beyond our reasonable control.
            </p>
          </div>

          {/* Updates */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Changes to This Notice
            </h2>

            <p>
              Tripyzo reserves the right to update or modify this GDPR Privacy
              Notice at any time. Changes will become effective immediately upon
              posting on this page.
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
              If you have questions regarding this GDPR Privacy Notice or wish
              to exercise your privacy rights, please contact us:
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
              travel agency. We are not responsible for the actions, omissions,
              delays, or service interruptions caused by airlines, hotels, or
              third-party travel providers.
            </p>

            <p className="mt-2">
              Your use of our website and services is at your own discretion,
              and we recommend reviewing all supplier policies before booking.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
