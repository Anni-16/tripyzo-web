import Link from "next/link";
import { getWebsiteDisplay } from "@/config/ContactInfo";

const airlineInsightItems = [
  "Descripción general de la aerolínea y sus ventajas de viaje",
  "Principales aeropuertos y opciones de aerolíneas asociadas",
  "Cobertura de rutas nacionales e internacionales",
  "Opciones de asiento, clases de cabina y tipos de tarifa",
  "Destinos populares y rutas con alta demanda",
  "Normas de cambio y cancelación de vuelos",
  "Información sobre programas de fidelización de aerolíneas",
  "Orientación para reservas y asistencia con billetes",
  "Requisitos para viajes internacionales",
  "Opciones de ofertas de vuelos de última hora",
  "Preguntas frecuentes sobre aerolíneas",
];

const bookingSteps = [
  "Visita el sitio web oficial de Tripyzo.",
  "Elige el tipo de viaje, como ida y vuelta o solo ida.",
  "Introduce tu ciudad de salida, destino, fechas de viaje y clase de cabina.",
  "Compara las opciones de vuelo disponibles y selecciona la tarifa que mejor se adapte a tus planes.",
  "Añade los datos de los pasajeros y la información de contacto para la reserva.",
  "Revisa el resumen de la reserva y completa el pago de forma segura.",
  "Recibe el correo electrónico de confirmación con la referencia de tu reserva.",
];

const savingsTips = [
  {
    title: "Reserva con antelación:",
    text: "Planificar con tiempo puede ayudarte a encontrar mejores tarifas y opciones de viaje más flexibles antes de que los precios aumenten cerca de la fecha de salida.",
  },
  {
    title: "Viaja en temporadas más tranquilas:",
    text: "Volar fuera de los períodos vacacionales de mayor demanda puede marcar una gran diferencia, especialmente si tus fechas son flexibles.",
  },
  {
    title: "Compara las opciones de tarifas:",
    text: "Revisa aerolíneas, rutas, escalas, normas de equipaje y horarios antes de elegir el billete que ofrezca la mejor relación calidad-precio.",
  },
  {
    title: "Busca las ofertas de Tripyzo:",
    text: "Consulta las ofertas actuales y las opciones disponibles solo por teléfono para no perderte descuentos de vuelos por tiempo limitado.",
  },
];

const TicketsContentSpanish = () => {
  const websiteDisplay = getWebsiteDisplay();

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="container-custom">
        <div className="mx-auto max-w-5xl space-y-8">
          <div>
            <h2 className="text-2xl font-bold leading-tight text-dark md:text-4xl">
              Reserva vuelos baratos con Tripyzo
            </h2>
            <p className="mt-4 text-sm leading-7 text-light md:text-base">
              Viajar debería ser emocionante, sin las limitaciones de tarifas
              aéreas cada vez más altas ni opciones de reserva complicadas.
              Tripyzo ayuda a los viajeros a comparar opciones de vuelos,
              encontrar tarifas competitivas y reservar viajes nacionales o
              internacionales desde Estados Unidos con confianza. Nuestro
              objetivo es facilitar la reserva de vuelos, hacerla más asequible
              y ofrecer asistencia desde la búsqueda hasta la confirmación.
            </p>
            <p className="mt-4 text-sm leading-7 text-light md:text-base">
              Tanto si estás planeando unas vacaciones familiares, un viaje de
              negocios, una salida de última hora o una escapada flexible,
              Tripyzo reúne orientación útil y asistencia con tarifas en un
              solo lugar. Puedes consultar opciones de aerolíneas, comparar
              rutas y obtener ayuda con cambios, cancelaciones, mejoras,
              reembolsos y otras preguntas sobre billetes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold leading-tight text-dark md:text-3xl">
              Información sobre aerolíneas para planificar mejor tu viaje
            </h2>
            <p className="mt-4 text-sm leading-7 text-light md:text-base">
              Tripyzo trabaja con una amplia variedad de opciones de vuelos en
              las principales rutas nacionales e internacionales. Antes de
              reservar, los viajeros pueden consultar información sobre las
              aerolíneas para comprender mejor las normas tarifarias, las redes
              de rutas, la flexibilidad del viaje y las opciones de servicio.
            </p>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-light md:grid-cols-2 md:text-base">
              {airlineInsightItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-theme" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold leading-tight text-dark md:text-2xl">
              ¿Cómo reservar un billete de avión con Tripyzo?
            </h3>
            <p className="mt-4 text-sm leading-7 text-light md:text-base">
              Reservar con Tripyzo es sencillo. Introduce los datos de tu viaje,
              compara los vuelos disponibles y completa la reserva después de
              revisar la tarifa que mejor se adapte a tus horarios y
              presupuesto.
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-light md:text-base">
              {bookingSteps.map((step) => (
                <li key={step} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-theme" />
                  <span>
                    {step === "Visita el sitio web oficial de Tripyzo." ? (
                      <>
                        Visita el sitio web oficial de Tripyzo en{" "}
                        <Link href="/" className="font-semibold text-theme">
                          {websiteDisplay}
                        </Link>
                        .
                      </>
                    ) : (
                      step
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold leading-tight text-dark md:text-2xl">
              Consejos de Tripyzo para reservar un billete de avión barato
            </h3>
            <p className="mt-4 text-sm leading-7 text-light md:text-base">
              Una planificación inteligente puede ayudarte a reducir el coste
              de tu próximo vuelo. Utiliza estos consejos prácticos al buscar
              vuelos baratos desde Estados Unidos o al planificar viajes dentro
              del país.
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-light md:text-base">
              {savingsTips.map(({ title, text }) => (
                <li key={title}>
                  <strong className="text-dark">{title}</strong> {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TicketsContentSpanish;
