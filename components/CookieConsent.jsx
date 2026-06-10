"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Settings, Check, ChevronRight } from "lucide-react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("easeofly-cookie-consent");
    if (!consent) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => setShowConsent(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
      } catch (e) {
        // If parsing fails, use default
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem(
      "easeofly-cookie-consent",
      JSON.stringify(allAccepted),
    );
    setShowConsent(false);
    setShowPreferences(false);

    // Trigger analytics/tracking scripts if needed
    if (allAccepted.analytics) {
      // Initialize analytics
      window.gtag?.("consent", "update", {
        analytics_storage: "granted",
      });
    }
    if (allAccepted.marketing) {
      // Initialize marketing scripts
      window.gtag?.("consent", "update", {
        ad_storage: "granted",
      });
    }
  };

  const acceptEssential = () => {
    const essentialOnly = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    localStorage.setItem(
      "easeofly-cookie-consent",
      JSON.stringify(essentialOnly),
    );
    setShowConsent(false);
    setShowPreferences(false);

    // Disable analytics/marketing
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
    });
  };

  const savePreferences = () => {
    localStorage.setItem(
      "easeofly-cookie-consent",
      JSON.stringify(preferences),
    );
    setShowConsent(false);
    setShowPreferences(false);

    // Update based on preferences
    window.gtag?.("consent", "update", {
      analytics_storage: preferences.analytics ? "granted" : "denied",
      ad_storage: preferences.marketing ? "granted" : "denied",
    });
  };

  const handlePreferenceToggle = (type) => {
    if (type === "necessary") return; // Cannot toggle necessary cookies
    setPreferences({
      ...preferences,
      [type]: !preferences[type],
    });
  };

  if (!showConsent && !showPreferences) return null;

  return (
    <>
      {/* Main Cookie Consent Banner */}
      {showConsent && !showPreferences && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
          <div className="container-custom mx-auto">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Gradient Bar */}
              <div className="h-1 bg-gradient-to-r from-theme to-theme/60"></div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Icon */}
                  <div className="hidden md:flex w-16 h-16 bg-theme-light rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-8 h-8 text-theme" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-heading font-bold text-dark mb-2">
                          🍪 We Value Your Privacy
                        </h3>
                        <p className="text-body text-sm md:text-base max-w-3xl">
                          We use cookies to enhance your browsing experience,
                          serve personalized content, and analyze our traffic.
                          By clicking "Accept All", you consent to our use of
                          cookies. Read our{" "}
                          <Link
                            href="/cookies-policy"
                            className="text-theme font-medium hover:underline"
                          >
                            Cookie Policy
                          </Link>{" "}
                          to learn more.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowConsent(false)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 mt-6">
                      <button
                        onClick={acceptAll}
                        className="px-6 py-3 bg-theme text-white rounded-xl font-medium hover:bg-theme/90 transition-all shadow-lg shadow-theme/20"
                      >
                        Accept All Cookies
                      </button>
                      <button
                        onClick={acceptEssential}
                        className="px-6 py-3 border border-gray-300 text-body rounded-xl font-medium hover:bg-gray-50 transition-all"
                      >
                        Essential Only
                      </button>
                      <button
                        onClick={() => {
                          setShowPreferences(true);
                          setShowConsent(false);
                        }}
                        className="px-6 py-3 text-theme font-medium hover:underline flex items-center gap-1"
                      >
                        <Settings className="w-4 h-4" />
                        Customize Settings
                      </button>
                    </div>

                    {/* Trust Badge */}
                    <div className="flex items-center gap-4 mt-4 text-xs text-light">
                      <div className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-theme" />
                        <span>ARC Accredited</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-theme" />
                        <span>GDPR Compliant</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-theme" />
                        <span>CCPA Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-theme-light rounded-xl flex items-center justify-center">
                  <Settings className="w-5 h-5 text-theme" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-dark">
                    Cookie Preferences
                  </h3>
                  <p className="text-xs text-light">
                    Customize your cookie settings
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              <p className="text-sm text-body">
                Choose which cookies you allow. Essential cookies are always
                enabled as they are necessary for the website to function
                properly. You can change your preferences at any time by
                visiting our Cookie Policy page.
              </p>

              {/* Cookie Options */}
              <div className="space-y-4">
                {/* Essential */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-dark flex items-center gap-2">
                        <span className="w-2 h-2 bg-theme rounded-full"></span>
                        Essential Cookies
                      </h4>
                      <p className="text-xs text-light mt-1">
                        Required for basic site functionality. Cannot be
                        disabled.
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700 font-medium">
                      Always Active
                    </div>
                  </div>
                </div>

                {/* Functional */}
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-dark">
                        Functional Cookies
                      </h4>
                      <p className="text-xs text-light mt-1">
                        Remember your preferences and settings for future
                        visits.
                      </p>
                    </div>
                    <button
                      onClick={() => handlePreferenceToggle("functional")}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        preferences.functional ? "bg-theme" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.functional ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Analytics */}
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-dark">
                        Analytics Cookies
                      </h4>
                      <p className="text-xs text-light mt-1">
                        Help us understand how visitors interact with our
                        website.
                      </p>
                    </div>
                    <button
                      onClick={() => handlePreferenceToggle("analytics")}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        preferences.analytics ? "bg-theme" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.analytics ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Marketing */}
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-dark">
                        Marketing Cookies
                      </h4>
                      <p className="text-xs text-light mt-1">
                        Used to deliver relevant ads and track ad performance.
                      </p>
                    </div>
                    <button
                      onClick={() => handlePreferenceToggle("marketing")}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        preferences.marketing ? "bg-theme" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.marketing ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* More Info Link */}
              <div className="bg-theme-light/50 rounded-xl p-4">
                <p className="text-sm text-body">
                  For more details about how we use cookies, please visit our{" "}
                  <Link
                    href="/cookies-policy"
                    className="text-theme font-medium hover:underline inline-flex items-center gap-1"
                    onClick={() => setShowPreferences(false)}
                  >
                    Cookies Policy
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </p>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex flex-wrap items-center justify-end gap-3">
              <button
                onClick={acceptEssential}
                className="px-6 py-2.5 border border-gray-300 text-body rounded-lg hover:bg-gray-100 transition-all text-sm font-medium"
              >
                Essential Only
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-2.5 bg-theme text-white rounded-lg hover:bg-theme/90 transition-all text-sm font-medium"
              >
                Accept All
              </button>
              <button
                onClick={savePreferences}
                className="px-6 py-2.5 bg-dark text-white rounded-lg hover:bg-dark/90 transition-all text-sm font-medium"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
