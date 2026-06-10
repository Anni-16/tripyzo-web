"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import MobileBanner from "./MobileBanner";
import MobileModal from "./MobileModal";

const EXCLUDED_PATH_PREFIXES = ["/flights-booking", "/flights/search"];

const BANNER_CONTENT = {
  topBar: "Llama y obtén ofertas de vuelos no publicadas",
  subheading: "Ahorra en tu próximo vuelo",
  actions: ["Nuevas reservas", "Cambios", "Cancelaciones", "Atención al cliente"],
  benefits: [
    "Conexión inmediata",
    "Atención 24/7",
    "Reserva segura",
    "Ofertas exclusivas",
  ],
  bookingChanges: "Reservas y cambios por teléfono",
  securePayment: "Pago seguro",
  fareReviewSupport: "Ayuda para revisar tarifas",
  noHold: "Sin espera - Respondemos rápido",
  clickToCall: "Haz clic para llamar",
  phoneOnlySupport: "Asistencia de reservas por teléfono",
  comparisonSupport:
    "Llama al servicio de atención al cliente de Tripyzo para comparar opciones de vuelos nacionales e internacionales con asistencia de reserva en vivo.",
  bottomBar: "Llama y obtén asistencia para reservar tu vuelo",
  bannerAlt: "Reserva de billetes de avión",
  agentAlt: "Agente de reservas de Tripyzo",
};

const MODAL_TRANSLATIONS = {
  closeBtn: "Cerrar",
  newBooking: "Nueva reserva",
  changes: "Cambios",
  cancel: "Cancelar",
  support: "Asistencia",
  noHold: "Sin espera - Respondemos en 5 segundos",
  tapToCall: "Toca para llamar ahora",
  unpublishedDeals: "Ofertas no publicadas solo por teléfono",
  secureBooking: "Reserva segura",
  support247: "Atención 24/7",
  bestPrice: "Mejor precio",
};

const formatText = (text) =>
  text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function MobileCallExperienceSpanish() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const shouldSkip = EXCLUDED_PATH_PREFIXES.some(
    (path) => pathname === path || pathname?.startsWith(`${path}/`),
  );

  const qstrRaw = searchParams.get("qstr");
  const utmCampaign = searchParams.get("utm_campaign");
  const utmSamp = searchParams.get("utm_samp");

  const dynamicTitle = useMemo(() => {
    return qstrRaw ? formatText(qstrRaw) : "Ofertas de vuelos baratos";
  }, [qstrRaw]);

  if (shouldSkip) return null;

  return (
    <>
      <MobileBanner headingText={dynamicTitle} content={BANNER_CONTENT} />
      {(utmCampaign || utmSamp) && (
        <MobileModal
          airlineName={dynamicTitle}
          translations={MODAL_TRANSLATIONS}
        />
      )}
    </>
  );
}
