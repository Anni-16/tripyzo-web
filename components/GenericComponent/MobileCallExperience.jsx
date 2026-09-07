"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import MobileBanner from "./MobileBanner";
import MobileModal from "./MobileModal";

const EXCLUDED_PATH_PREFIXES = [
  "/flights-booking",
  "/flights/search",
  "/es-usa",
  "/es-usa-sitelink",
  "/es-usa-sitelink-1",
  "/es-usa-sitelink-2",
  "/es-usa-sitelink-3",
  "/es-usa-sitelink-4",
  "/es-usa-sitelink-5",
  "/es-usa-sitelink-6",
  "/es-sp",
  "/es-mx",
];

const formatText = (text) =>
  text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function MobileCallExperience() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const shouldSkip = EXCLUDED_PATH_PREFIXES.some(
    (path) => pathname === path || pathname?.startsWith(`${path}/`),
  );

  const qstrRaw = searchParams.get("qstr");
  const utmCampaign = searchParams.get("utm_campaign");
  const utmSamp = searchParams.get("utm_samp");

  const dynamicTitle = useMemo(() => {
    return qstrRaw ? formatText(qstrRaw) : "Cheap Flight Deals";
  }, [qstrRaw]);

  if (shouldSkip) return null;

  return (
    <>
      <MobileBanner headingText={dynamicTitle} />
      {(utmCampaign || utmSamp) && <MobileModal airlineName={dynamicTitle} />}
    </>
  );
}
