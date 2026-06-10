// components/Contact/EmailAddress.js
"use client";

import { usePathname } from "next/navigation";
import { HiOutlineMail } from "react-icons/hi";
import { useGTMTracking } from "@/hooks/useGTMTracking";
import { getEmailHref, getPrimaryEmail } from "@/config/ContactInfo";

export const EmailAddress = ({ className = "", showIcon = true }) => {
  const pathname = usePathname();
  const { trackEmailClick } = useGTMTracking();
  const email = getPrimaryEmail();

  const handleEmailClick = () => {
    trackEmailClick(email, pathname);
  };

  return (
    <a
      href={getEmailHref()}
      onClick={handleEmailClick}
      className={`inline-flex items-center gap-2 hover:opacity-90 transition ${className}`}
    >
      {showIcon && <HiOutlineMail className="text-base" />}
      <span>{email.address}</span>
    </a>
  );
};
