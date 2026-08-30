import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import MobileCallExperienceSpanish from "@/components/GenericComponent/MobileCallExperienceSpanish";
import Navbar from "@/components/Headers/Navbar";
import CustomerServiceSpanish from "@/components/Tickets/CustomerServiceSpanish";
import HelpSpanish from "@/components/Tickets/HelpSpanish";
import TicketsContentSpanish from "@/components/Tickets/TicketsContentSpanish";
import { Suspense } from "react";

const EsUsaSitelink6Page = () => {
  return (
    <>
      <Suspense fallback={null}>
        <MobileCallExperienceSpanish />
      </Suspense>
      <div className="hidden md:block">
        <Navbar />
        <Banner
          titleLine1="Ofertas Exclusivas de Vuelos"
          titleLine2="y Ahorros en Tarifas Aéreas"
          description="Reserve vuelos nacionales e internacionales con total confianza. Descubra tarifas aéreas competitivas, opciones de viaje flexibles y asistencia especializada para la reserva de su próximo viaje."
        />
      </div>
      <HelpSpanish />
      <CustomerServiceSpanish />
      <TicketsContentSpanish />
      <Footer />
    </>
  );
};

export default EsUsaSitelink6Page;
