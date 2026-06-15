"use client";

import { usePathname } from "next/navigation";
import {
  ContactInfo,
  getAddressDisplay,
  getEmailHref,
  getPhoneDisplay,
  getPhoneHref,
} from "@/config/ContactInfo";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/flights", label: "Flight Deals" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
];

const destinationLinks = [
  { href: "/cheap-flights-to-boston", label: "Flights to Boston" },
  { href: "/cheap-flights-to-chicago", label: "Flights to Chicago" },
  { href: "/cheap-flights-to-las-vegas", label: "Flights to Las Vegas" },
  { href: "/cheap-flights-to-miami", label: "Flights to Miami" },
  { href: "/cheap-flights-to-new-york", label: "Flights to New York" },
  {
    href: "/cheap-flights-to-san-francisco",
    label: "Flights to San Francisco",
  },
];

const policyLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/cancellation-policy", label: "Cancellation Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/taxes-and-fee", label: "Taxes & Fees" },
  { href: "/advertiser-policy", label: "Advertiser Policy" },
  { href: "/ccpa", label: "CCPA Notice" },
  { href: "/gdpr", label: "GDPR Notice" },
];

const Footer = () => {
  const pathname = usePathname();
  const phoneNumber = getPhoneDisplay(pathname);
  const phoneHref = getPhoneHref(pathname);
  const mainAddress = getAddressDisplay();

  return (
    <footer className="relative bg-[#0b1120] text-white pt-20 pb-12 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute right-1/4 top-0 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute -left-32 bottom-0 w-80 h-80 bg-primary rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
        <div className="md:col-span-3 space-y-5">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Tripyzo"
              width={200}
              height={80}
              className="h-18 object-contain brightness-0 invert"
            />
          </Link>
          {/* <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            <strong>Tripyzo</strong> is an independent travel agency helping
            travelers compare flights, review booking options, and get
            English-speaking support before and after ticketing.
          </p> */}
        </div>

        <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white text-lg font-semibold mb-6 flex items-center">
              <span className="w-3 h-3 bg-primary rounded-full mr-3" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 mr-3 transition-all duration-300 transform group-hover:translate-x-0.5" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-6 flex items-center">
              <span className="w-3 h-3 bg-primary rounded-full mr-3" />
              Destinations
            </h4>
            <ul className="space-y-3">
              {destinationLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 mr-3 transition-all duration-300 transform group-hover:translate-x-0.5" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-6 flex items-center">
              <span className="w-3 h-3 bg-primary rounded-full mr-3" />
              Legal
            </h4>
            <ul className="space-y-3">
              {policyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 mr-3 transition-all duration-300 transform group-hover:translate-x-0.5" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-white text-lg font-semibold mb-6 flex items-center">
            <span className="w-3 h-3 bg-primary rounded-full mr-3" />
            Contact Us
          </h4>
          <div className="space-y-5 text-gray-300">
            <div className="flex items-start gap-4 group">
              <div className="bg-gray-700/40 p-2 rounded-lg group-hover:bg-primary/20 transition-all duration-300 border border-gray-600/50 group-hover:border-primary/30">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-white">24/7 Customer Support</p>
                <a
                  href={phoneHref}
                  className="hover:text-primary transition-colors duration-300 block"
                >
                  {phoneNumber}
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  Call anytime for booking assistance
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="bg-gray-700/40 p-2 rounded-lg group-hover:bg-primary/20 transition-all duration-300 border border-gray-600/50 group-hover:border-primary/30">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-white">Email Us</p>
                <a
                  href={getEmailHref()}
                  className="hover:text-primary transition-colors duration-300 block break-all"
                >
                  {ContactInfo.emails.info.address}
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  Replies within 1 business hour
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="bg-gray-700/40 p-2 rounded-lg group-hover:bg-primary/20 transition-all duration-300 border border-gray-600/50 group-hover:border-primary/30">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-white">Head Office</p>
                <p className="hover:text-primary transition-colors duration-300">
                  {mainAddress}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Available by appointment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto mt-12 pt-6 text-sm text-center border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { href: "/terms-conditions", label: "Terms" },
              { href: "/privacy-policy", label: "Privacy" },
              { href: "/cookie-policy", label: "Cookies" },
              { href: "/sitemap.xml", label: "Sitemap", target: "_blank" },
            ].map(({ href, label, target }) => (
              <Link
                key={href}
                href={href}
                target={target}
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </div>
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" className="text-primary hover:underline font-medium">
              Tripyzo
            </Link>
            . All rights reserved.
          </p>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed max-w-3xl mx-auto">
          Tripyzo is an independent travel agency offering booking assistance
          for flights and related travel services. We are not directly
          affiliated with any airline or travel brand. Fares are subject to
          availability and change until ticketed. Tripyzo.com is owned and
          operated by Aadi Travel LLC.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
