"use client";
import {
  ArrowRight,
  Headset,
  Phone,
  Plane,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPhoneDisplay, getPhoneHref } from "@/config/ContactInfo";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = getPhoneDisplay();
  const phoneHref = getPhoneHref();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative  flex items-center justify-center py-20 ">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner-flight.jpg"
          alt="Flight Booking Hero"
          fill
          className="object-cover"
          priority
        />
        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float-slow">
          <Plane className="w-16 h-16 text-white/10 rotate-45" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float-delayed">
          <Plane className="w-24 h-24 text-white/10 -rotate-30" />
        </div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-delayed"></div>
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-white text-sm font-semibold tracking-wide">
            ✈️ FLY MORE, PAY LESS – GLOBAL DEALS
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in-up animation-delay-200">
          Fly More, Pay Less –
          <span className="block mt-2 bg-primary bg-clip-text text-transparent">
            Global Deals
          </span>
        </h1>

        {/* Subtitle with Highlight */}
        <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-2 animate-fade-in-up animation-delay-400">
          Save Up to{" "}
          <span className="text-primary font-bold text-3xl md:text-4xl inline-block animate-bounce-slow">
            60% OFF
          </span>
        </p>
        <p className="text-lg sm:text-xl text-primary-light font-semibold mb-6 animate-fade-in-up animation-delay-600">
          Limited-Time Phone-Only Deals! 🎯
        </p>

        {/* Features Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 animate-fade-in-up animation-delay-800">
          {[
            {
              icon: Zap,
              text: "Instant Booking",
              color: "from-yellow-500 to-orange-500",
            },
            {
              icon: Shield,
              text: "No Hidden Fees",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: Headset,
              text: "24/7 Live Support",
              color: "from-blue-500 to-cyan-500",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <feature.icon className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
              <span className="text-white text-sm font-medium">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 animate-fade-in-up animation-delay-1000">
          {/* Primary CTA */}
          <Link
            href={phoneHref}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary rounded-full text-white font-bold text-md shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <span>CALL NOW – GET BEST DEAL</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Phone Number Button */}
          <Link
            href={phoneHref}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full text-white font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
          >
            <Phone className="w-5 h-5 text-primary animate-pulse" />
            <span>{phoneNumber}</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(45deg);
          }
          50% {
            transform: translateY(-30px) rotate(45deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(-30deg);
          }
          50% {
            transform: translateY(-40px) rotate(-30deg);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
        @keyframes pulse-delayed {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.2);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scroll {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-pulse-delayed {
          animation: pulse-delayed 8s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
        .animation-delay-1400 {
          animation-delay: 1.4s;
        }
      `}</style>
    </section>
  );
};

export default Banner;
