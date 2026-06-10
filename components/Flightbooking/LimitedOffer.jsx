"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Star,
  ArrowRight,
  Shield,
  Clock,
  Headset,
  CheckCircle,
} from "lucide-react";
import { getPhoneDisplay, getPhoneHref } from "@/config/ContactInfo";

const LimitedOffer = () => {
  const phoneNumber = getPhoneDisplay();
  const phoneHref = getPhoneHref();

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-banner.jpg"
          alt="Special Offer"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>
        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Floating Elements - Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-primary/30">
            <span className="text-primary text-sm font-semibold uppercase tracking-wide">
              ⭐ Limited Time Offer
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Save Up To{" "}
            <span className="text-primary inline-block">60% Off</span>
          </h2>

          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-semibold mb-4">
            On Fly More, Pay Less – Global Deals!
          </p>

          {/* Urgency Message - Compliant */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full mb-8">
            <span className="text-white text-sm font-medium">
              ✨ Limited availability - Call now to check rates
            </span>
          </div>

          {/* Features Grid */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { icon: Headset, text: "24/7 Expert Support" },
              { icon: CheckCircle, text: "No Hidden Fees" },
              { icon: Shield, text: "Secure Booking" },
              { icon: Clock, text: "Instant Confirmation" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5"
              >
                <feature.icon className="w-4 h-4 text-primary" />
                <span className="text-white text-sm">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Customer Reviews */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
              <div className="flex text-yellow-400 text-sm">★★★★★</div>
              <span className="text-white/90 text-sm">
                "Best deals I've found"
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
              <div className="flex text-yellow-400 text-sm">★★★★★</div>
              <span className="text-white/90 text-sm">
                "Quick and easy service"
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
              <div className="flex text-yellow-400 text-sm">★★★★★</div>
              <span className="text-white/90 text-sm">"Saved me $300+"</span>
            </div>
          </div>

          {/* Main CTA Button */}
          <Link
            href={phoneHref}
            className="group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-white text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-xl mb-8"
          >
            <Phone className="w-5 h-5 md:w-6 md:h-6" />
            <span>Call Now & Save Big</span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Phone Number Section - Large & Prominent */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
            <p className="text-white/80 text-sm mb-2 flex items-center justify-center gap-2">
              <span>📞</span>
              Need to Fly? Call & Book Now
              <span>📞</span>
            </p>
            <Link
              href={phoneHref}
              className="text-white text-2xl md:text-3xl lg:text-4xl font-bold hover:text-primary transition-all duration-300 inline-flex items-center gap-3"
            >
              <Phone className="w-6 h-6 md:w-7 md:h-7" />
              {phoneNumber}
            </Link>
            <div className="flex items-center justify-center gap-4 mt-3 text-white/50 text-xs">
              <span className="flex items-center gap-1">📞 24/7 Support</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                🔒 No Booking Fees
              </span>
              <span>•</span>
              <span>✓ SSL Secure</span>
            </div>
          </div>

          {/* Disclaimer - Required for compliance */}
          <div className="mt-6 text-white/30 text-xs">
            <p>
              *Rates are subject to availability. Terms and conditions apply.
              Call for complete details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedOffer;
