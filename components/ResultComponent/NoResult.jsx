"use client";

import {
  PhoneCall,
  PlaneIcon,
  Search,
  Calendar,
  MapPin,
  Users,
  Star,
  Shield,
  Clock,
} from "lucide-react";
import {
  getPhoneByLanguage,
  ContactInfo,
  getPhoneHref,
} from "@/config/ContactInfo";

export default function NoFlightsFound({ agencyName = "Tripyzo" }) {
  const currentPhone = getPhoneByLanguage();
  const phoneNumber = currentPhone.displayNumber || currentPhone.number;
  const phoneHref = getPhoneHref();

  const t = {
      title: "No Flights Found",
      subtitle: "Let Our Experts Find You The Best Deals",
      description:
        "We've searched all available flights but couldn't find perfect matches for your criteria. Our travel experts at",
      agencyText: agencyName,
      descriptionEnd:
        "have access to exclusive deals and unpublished fares not available online.",
      flexibleDates: "Flexible Dates",
      flexibleDatesDesc: "Try different travel periods for better prices",
      nearbyAirports: "Nearby Airports",
      nearbyAirportsDesc: "Explore alternative departure cities",
      expertHelp: "Expert Help",
      expertHelpDesc: "Our agents can find hidden deals",
      verifiedAirlines: "Verified Airlines",
      rating: "4.8/5 Rating",
      support: "24/7 Support",
      ctaTitle: "Speak with a Travel Expert",
      ctaDesc: "Get personalized flight options & exclusive deals",
      whyCall: "Why Call Our Experts?",
      unpublishedDeals: "Access to unpublished airline deals",
      bundleDiscounts: "Bundle discounts (hotel + flight)",
      flexiblePayment: "Flexible payment options",
      customerSupport: "24/7 customer support",
      footerText:
        "Our certified travel consultants are ready to help you find the perfect flight.",
      waitTime: "under 2 minutes",
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-primary-light/20 via-white to-accent/5 text-center px-6 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Main Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t.title}
          <span className="block text-lg md:text-xl font-semibold text-primary mt-2">
            {t.subtitle}
          </span>
        </h1>

        {/* Description */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            {t.description}{" "}
            <span className="font-bold text-primary bg-primary-light px-2 py-1 rounded-lg">
              {t.agencyText}
            </span>{" "}
            {t.descriptionEnd}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {t.flexibleDates}
            </h3>
            <p className="text-sm text-gray-600">{t.flexibleDatesDesc}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {t.nearbyAirports}
            </h3>
            <p className="text-sm text-gray-600">{t.nearbyAirportsDesc}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{t.expertHelp}</h3>
            <p className="text-sm text-gray-600">{t.expertHelpDesc}</p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>{t.verifiedAirlines}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{t.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            <span>{t.support}</span>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="bg-theme rounded-2xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-300 mb-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white text-left">
                <h3 className="text-xl font-bold mb-1 text-white">
                  {t.ctaTitle}
                </h3>
                <p className="text-primary-light text-sm">{t.ctaDesc}</p>
              </div>
              <a
                href={phoneHref}
                className="group relative bg-white text-primary hover:bg-gray-50 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3 min-w-[300px] justify-center"
              >
                <PhoneCall className="w-5 h-5" />
                <span>{phoneNumber}</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="bg-primary-light/20 rounded-2xl p-6 border border-primary/20">
          <h4 className="font-semibold text-primary mb-3">{t.whyCall}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>{t.unpublishedDeals}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>{t.bundleDiscounts}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>{t.flexiblePayment}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>{t.customerSupport}</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            {t.footerText}{" "}
            <span className="font-semibold text-primary">{t.waitTime}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
