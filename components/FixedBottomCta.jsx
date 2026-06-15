"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { getPhoneDisplay, getPhoneHref } from "@/config/ContactInfo";

export default function FixedBottomCTA() {
  const pathname = usePathname();
  const phoneNumber = getPhoneDisplay("spanish", pathname);
  const phoneHref = getPhoneHref("spanish", pathname);

  if (!phoneHref) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] block border-t border-white/20 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.18)] backdrop-blur md:hidden">
      <Link
        href={phoneHref}
        aria-label={`Call Tripyzo at ${phoneNumber}`}
        className="mx-auto flex min-h-14 w-full max-w-md items-center justify-center gap-3 rounded-lg bg-theme px-4 py-3 text-center text-white shadow-phone transition active:scale-[0.99]"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
          <PhoneCall className="h-5 w-5" />
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="text-xs font-semibold uppercase tracking-wide text-white/85">
            Call Now
          </span>
          <span className="text-lg font-bold">{phoneNumber}</span>
        </span>
      </Link>
    </div>
  );
}
