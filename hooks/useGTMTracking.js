// hooks/useGTMTracking.js
"use client";

import { useCallback } from "react";

export const useGTMTracking = () => {
  // Track phone clicks
  const trackPhoneClick = useCallback((phoneData, pagePath) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "phone_click",
        event_category: "Contact",
        event_action: "Phone Call",
        event_label: phoneData.trackingId,
        phone_number: phoneData.displayNumber || phoneData.number,
        language: phoneData.language,
        department: phoneData.department,
        page_url: pagePath,
        timestamp: new Date().toISOString(),
      });

      // Also track with gtag if available
      if (typeof gtag !== "undefined") {
        gtag("event", "phone_click", {
          event_category: "Contact",
          event_label: phoneData.trackingId,
          phone_language: phoneData.language,
          value: 1,
        });
      }

      console.log("Phone click tracked:", phoneData.language);
    }
  }, []);

  // Track email clicks
  const trackEmailClick = useCallback((emailData, pagePath) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "email_click",
        event_category: "Contact",
        event_action: "Email Click",
        event_label: emailData.trackingId,
        email_address: emailData.address,
        page_url: pagePath,
        timestamp: new Date().toISOString(),
      });

      if (typeof gtag !== "undefined") {
        gtag("event", "email_click", {
          event_category: "Contact",
          event_label: "Email Click",
          value: 1,
        });
      }

      console.log("Email click tracked");
    }
  }, []);

  // Track address clicks (for map/directions)
  const trackAddressClick = useCallback((addressData, pagePath) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "address_click",
        event_category: "Contact",
        event_action: "Address Click",
        event_label: addressData.name,
        address: addressData.fullAddress,
        page_url: pagePath,
        timestamp: new Date().toISOString(),
      });

      console.log("Address click tracked:", addressData.name);
    }
  }, []);

  return {
    trackPhoneClick,
    trackEmailClick,
    trackAddressClick,
  };
};
