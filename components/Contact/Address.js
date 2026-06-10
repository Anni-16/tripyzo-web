"use client";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { getAddressDisplay } from "@/config/ContactInfo";

export const Address = ({ className = "", showIcon = true }) => {
  return (
    <span className={`inline-flex items-start gap-2 ${className}`}>
      {showIcon && <HiOutlineLocationMarker className="mt-1 text-base" />}
      <span>{getAddressDisplay()}</span>
    </span>
  );
};
