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

export default function CookiesPolicy() {
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
              <span>COOKIES POLICY</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Cookies <span className="text-primary relative">Policy</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Learn how Tripyzo uses cookies to enhance your browsing
              experience, analyze site traffic, and personalize content.
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
              At <strong>Tripyzo</strong>, we use cookies and similar tracking
              technologies to improve your browsing experience on our website{" "}
              <a
                href={getWebsiteUrl()}
                className="text-primary font-medium underline"
              >
                {getWebsiteDisplay()}
              </a>
              . This Cookies Policy explains what cookies are, how we use them,
              and how you can manage your cookie preferences.
            </p>
            <p className="mt-3">
              By continuing to use our website, you consent to our use of
              cookies as described in this policy.
            </p>
          </div>

          {/* What are Cookies */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              What Are Cookies?
            </h2>
            <p>
              Cookies are small text files that are placed on your device
              (computer, smartphone, or tablet) when you visit a website. They
              are widely used to make websites work more efficiently, enhance
              user experience, and provide information to website owners.
            </p>
            <p className="mt-2">
              Cookies do not contain personal information that can identify you
              directly, but they help us recognize your device and remember your
              preferences for future visits.
            </p>
          </div>

          {/* Types of Cookies We Use */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Types of Cookies We Use
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="text-primary w-6 h-6 mt-1" />
              <p>Tripyzo uses the following categories of cookies:</p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to
                function properly (e.g., navigation, login, form submissions).
              </li>
              <li>
                <strong>Performance Cookies:</strong> Help us understand how
                visitors interact with our website (e.g., page visits, load
                times).
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences
                (e.g., language, location) to provide enhanced features.
              </li>
              <li>
                <strong>Advertising Cookies:</strong> Used to deliver relevant
                ads and measure campaign effectiveness.
              </li>
            </ul>
          </div>

          {/* How We Use Cookies */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              How We Use Cookies
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <ClockIcon className="text-primary w-6 h-6 mt-1" />
              <p>Tripyzo uses cookies to:</p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>Remember your login details and preferences</li>
              <li>Analyze website traffic and user behavior</li>
              <li>Improve website performance and loading speed</li>
              <li>Personalize content and offers based on your interests</li>
              <li>Enable social media sharing and interactions</li>
            </ul>
          </div>

          {/* Third-Party Cookies */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Third-Party Cookies
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <ShieldCheckIcon className="text-primary w-6 h-6 mt-1" />
              <p>
                We may also allow third-party service providers (such as Google
                Analytics, Facebook, and payment processors) to place cookies on
                your device to help us analyze website usage, deliver targeted
                advertisements, and process transactions.
              </p>
            </div>
            <p className="mt-2">
              These third parties have their own privacy policies, and Tripyzo
              does not control their cookie practices. We recommend reviewing
              their policies for more information.
            </p>
          </div>

          {/* Managing Cookies */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Managing Your Cookie Preferences
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <XCircle className="text-primary w-6 h-6 mt-1" />
              <p>
                You can control and manage cookies through your browser
                settings. Most browsers allow you to:
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>View cookies stored on your device</li>
              <li>Block or delete existing cookies</li>
              <li>Prevent websites from setting new cookies</li>
              <li>Receive notifications when cookies are set</li>
            </ul>
            <p className="mt-2">
              Please note that disabling essential cookies may affect website
              functionality and your user experience.
            </p>
          </div>

          {/* Consent */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Your Consent
            </h2>
            <p>
              By continuing to use the Tripyzo website, you consent to our use
              of cookies as described in this policy. If you do not agree to our
              use of cookies, you should adjust your browser settings or refrain
              from using our website.
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
                Tripyzo may update this Cookies Policy from time to time to
                reflect changes in technology, legal requirements, or business
                operations. Any updates will be posted on this page with a
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
              If you have any questions about our use of cookies or this policy,
              please contact us:
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
              information about how we handle your personal data, please review
              our{" "}
              <a
                href="/privacy-policy"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
