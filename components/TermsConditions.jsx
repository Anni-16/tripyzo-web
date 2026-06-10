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

export default function TermsConditions() {
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
              <span>TERMS & CONDITIONS</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Terms & <span className="text-primary relative">Conditions</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Please read these terms and conditions carefully before using
              Tripyzo's website and booking services.
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
              Welcome to <strong>Tripyzo</strong>. These Terms and Conditions
              govern your use of our website{" "}
              <a
                href={getWebsiteUrl()}
                className="text-primary font-medium underline"
              >
                {getWebsiteDisplay()}
              </a>{" "}
              and the travel booking services we provide. By accessing or using
              our website, you agree to be bound by these terms.
            </p>
            <p className="mt-3">
              If you do not agree with any part of these terms, please do not
              use our website or services.
            </p>
          </div>

          {/* Booking Services */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Booking Services
            </h2>
            <p>
              Tripyzo acts as an independent travel agency facilitating bookings
              for flights, hotels, car rentals, and vacation packages. We do not
              operate airlines, hotels, or other travel suppliers. All bookings
              are subject to the terms and conditions of the respective service
              providers.
            </p>
            <p className="mt-2">
              When you make a booking through Tripyzo, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>You are responsible for providing accurate information</li>
              <li>You have read and agree to the supplier's terms</li>
              <li>Tripyzo is not liable for supplier service failures</li>
              <li>Additional fees may apply for changes or cancellations</li>
            </ul>
          </div>

          {/* User Responsibilities */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              User Responsibilities
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="text-primary w-6 h-6 mt-1" />
              <p>As a user of Tripyzo's services, you agree to:</p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide accurate, complete, and current information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Review all booking details before confirmation</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>
                Ensure you have valid travel documents (passport, visa, etc.)
              </li>
              <li>
                Arrive at the airport with sufficient time before departure
              </li>
            </ul>
          </div>

          {/* Pricing and Payments */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Pricing and Payments
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <ShieldCheckIcon className="text-primary w-6 h-6 mt-1" />
              <p>
                All prices displayed on Tripyzo are subject to change without
                notice. Final prices are confirmed at the time of booking.
                Prices include applicable taxes and fees unless stated
                otherwise.
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Payments are processed through secure payment gateways</li>
              <li>
                We accept major credit cards (Visa, MasterCard, Amex, Discover)
              </li>
              <li>Additional service fees may apply for certain bookings</li>
              <li>
                Currency conversion fees may apply for international bookings
              </li>
            </ul>
          </div>

          {/* Cancellations and Changes */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Cancellations and Changes
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <ClockIcon className="text-primary w-6 h-6 mt-1" />
              <p>
                Cancellation and change policies vary by airline, hotel, or
                travel supplier. Please review the specific terms for your
                booking. In general:
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>Some fares are non-refundable and non-changeable</li>
              <li>
                Cancellation fees may apply based on the supplier's policy
              </li>
              <li>Tripyzo service fees are non-refundable after booking</li>
              <li>Changes may be subject to fare differences</li>
              <li>
                No-show penalties apply for missed flights without prior
                cancellation
              </li>
            </ul>
            <p className="mt-2">
              For cancellations or changes, contact Tripyzo customer support as
              soon as possible.
            </p>
          </div>

          {/* Refunds */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Refunds
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <XCircle className="text-primary w-6 h-6 mt-1" />
              <p>
                Refunds are processed according to the supplier's refund policy.
                Tripyzo will assist with refund requests but cannot guarantee
                approval. Eligible refunds will be credited to the original
                payment method within 7-20 business days depending on the
                supplier.
              </p>
            </div>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Intellectual Property
            </h2>
            <p>
              All content on the Tripyzo website, including text, graphics,
              logos, images, and software, is the property of Tripyzo or its
              content suppliers and is protected by copyright and intellectual
              property laws. You may not reproduce, distribute, or create
              derivative works without express written permission.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Limitation of Liability
            </h2>
            <div className="flex items-start gap-3 mb-3">
              <FileWarning className="text-primary w-6 h-6 mt-1" />
              <p>
                To the maximum extent permitted by law, Tripyzo shall not be
                liable for:
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Any direct, indirect, incidental, or consequential damages
              </li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>
                Delays, cancellations, or service failures by airlines or
                suppliers
              </li>
              <li>Personal injury, illness, or death during travel</li>
              <li>Loss or damage to baggage or personal belongings</li>
            </ul>
            <p className="mt-2">
              Our total liability for any claim arising from your use of our
              services is limited to the amount you paid for the booking.
            </p>
          </div>

          {/* Indemnification */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Indemnification
            </h2>
            <p>
              You agree to indemnify and hold Tripyzo harmless from any claims,
              damages, losses, liabilities, costs, or expenses arising from your
              use of our website, violation of these terms, or infringement of
              any third-party rights.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Governing Law
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of the State of New Hampshire, United
              States, without regard to its conflict of law provisions. Any
              legal action arising from these terms shall be brought exclusively
              in the courts of Portsmouth, New Hampshire.
            </p>
          </div>

          {/* Changes to Terms */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Changes to Terms
            </h2>
            <p>
              Tripyzo reserves the right to modify these Terms and Conditions at
              any time. Changes will be effective immediately upon posting on
              this page. Your continued use of our website constitutes
              acceptance of the modified terms.
            </p>
          </div>

          {/* Contact Info */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Contact Information
            </h2>
            <p className="mb-3">
              If you have any questions about these Terms and Conditions, please
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
              Tripyzo provides travel booking services as an independent agent.
              We are not responsible for the actions, errors, omissions,
              representations, or warranties of any airlines, hotels, or other
              travel suppliers. Your travel is at your own risk, and we
              recommend purchasing travel insurance for protection.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
