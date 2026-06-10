// components/Contact/PhoneNumber.js
"use client";

import { usePathname } from "next/navigation";
import { HiPhone } from "react-icons/hi";
import { useGTMTracking } from "@/hooks/useGTMTracking";
import { getPhoneByLanguage, getPhoneHref } from "@/config/ContactInfo";

export const PhoneNumber = ({
  className = "",
  showIcon = true,
  showLabel = true,
}) => {
  const pathname = usePathname();
  const { trackPhoneClick } = useGTMTracking();
  const phone = getPhoneByLanguage();

  const handlePhoneClick = () => {
    if (phone) {
      trackPhoneClick(phone, pathname);
    }
  };

  return (
    <a
      href={getPhoneHref(phone.language)}
      onClick={handlePhoneClick}
      className={`inline-flex items-center gap-2 hover:opacity-90 transition ${className}`}
    >
      {showIcon && <HiPhone className="text-base" />}
      {showLabel && <span>Call Us</span>}
      <span className="font-medium">{phone.displayNumber || phone.number}</span>
    </a>
  );
};
