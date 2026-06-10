"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import countriesData from "@/data/country-states.json";
import { useAuth } from "@/context/AuthContext";

export default function ContactInfo() {
  const { user } = useAuth();
  const [contact, setContact] = useState({
    email: "",
    country: "",
    state: "",
    street1: "",
    street2: "",
    city: "",
    zip: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [availableStates, setAvailableStates] = useState([]);

  /* ================= LOAD USER EMAIL FROM AUTH ================= */

  useEffect(() => {
    if (user?.email) {
      setContact((prev) => ({
        ...prev,
        email: user.email,
      }));

      sessionStorage.setItem("travellerEmail", user.email);
    } else {
      const storedEmail = sessionStorage.getItem("travellerEmail");
      if (storedEmail) {
        setContact((prev) => ({
          ...prev,
          email: storedEmail,
        }));
      }
    }
  }, [user]);

  /* ================= SAVE CONTACT ================= */

  useEffect(() => {
    sessionStorage.setItem("contact", JSON.stringify(contact));
  }, [contact]);

  /* ================= COUNTRY -> STATES ================= */

  useEffect(() => {
    if (contact.country) {
      const selectedCountry = countriesData.find(
        (c) => c.name === contact.country,
      );

      if (selectedCountry) {
        setAvailableStates(selectedCountry.states);
      } else {
        setAvailableStates([]);
      }

      setContact((prev) => ({ ...prev, state: "" }));
    }
  }, [contact.country]);

  /* ================= VALIDATION ================= */

  const validateField = (name, value) => {
    let message = "";

    if (!value && name !== "street2") {
      message = "This field is required";
    }

    if (name === "phone" && value && value.length < 7) {
      message = "Invalid phone number";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  const handleChange = (name, value) => {
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  return (
    <section className="border border-gray-100 rounded-xl shadow-theme bg-white overflow-hidden">
      {/* HEADER */}
      <div className="bg-theme text-white font-semibold text-base px-6 py-4 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        Contact Information
      </div>

      <div className="p-5 md:p-6 space-y-5">
        {/* EMAIL - Now shows logged in user's email */}
        <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 focus-within:border-theme focus-within:ring-2 focus-within:ring-theme/20 transition-all">
          <Mail className="w-5 h-5 text-theme mr-3 flex-shrink-0" />
          <input
            type="email"
            value={contact.email}
            readOnly
            className="w-full bg-transparent outline-none text-sm text-dark placeholder:text-light/60 cursor-not-allowed"
          />
          {user && (
            <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>

        {/* COUNTRY + STATE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <select
              value={contact.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark bg-gray-50 outline-none focus:border-theme focus:ring-2 focus:ring-theme/20 transition-all appearance-none"
            >
              <option value="">Select Country*</option>
              {countriesData.map((country, i) => (
                <option key={i} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-light"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              value={contact.state}
              disabled={!contact.country}
              onChange={(e) => handleChange("state", e.target.value)}
              className={`w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-gray-50 outline-none focus:border-theme focus:ring-2 focus:ring-theme/20 transition-all appearance-none ${
                !contact.country ? "text-light/60" : "text-dark"
              }`}
            >
              <option value="">
                {contact.country ? "Select State*" : "Select Country First"}
              </option>
              {availableStates.map((state, i) => (
                <option key={i} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {contact.country && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-light"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* STREET */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Street Address*"
            value={contact.street1}
            onChange={(e) => handleChange("street1", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark placeholder:text-light/60 bg-gray-50 outline-none focus:border-theme focus:ring-2 focus:ring-theme/20 transition-all"
          />
          <input
            type="text"
            placeholder="Apt/Suite (Optional)"
            value={contact.street2}
            onChange={(e) => handleChange("street2", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark placeholder:text-light/60 bg-gray-50 outline-none focus:border-theme focus:ring-2 focus:ring-theme/20 transition-all"
          />
        </div>

        {/* CITY + ZIP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City*"
            value={contact.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark placeholder:text-light/60 bg-gray-50 outline-none focus:border-theme focus:ring-2 focus:ring-theme/20 transition-all"
          />
          <input
            type="text"
            placeholder="ZIP / Postal Code*"
            value={contact.zip}
            onChange={(e) => handleChange("zip", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark placeholder:text-light/60 bg-gray-50 outline-none focus:border-theme focus:ring-2 focus:ring-theme/20 transition-all"
          />
        </div>

        {/* PHONE */}
        <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 focus-within:border-theme focus-within:ring-2 focus-within:ring-theme/20 transition-all">
          <Phone className="w-5 h-5 text-theme mr-3 flex-shrink-0" />
          <input
            type="tel"
            placeholder="Phone Number*"
            value={contact.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-dark placeholder:text-light/60"
          />
        </div>

        {/* REQUIRED NOTE */}
        <p className="text-xs text-light italic">* Required fields</p>
      </div>
    </section>
  );
}
