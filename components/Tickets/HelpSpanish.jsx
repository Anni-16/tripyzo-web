import {
  ArrowRight,
  BadgeDollarSign,
  CalendarClock,
  CircleDollarSign,
  PlaneTakeoff,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { getPhoneDisplay, getPhoneHref } from "@/config/ContactInfo";

const helpCards = [
  {
    title: "Cambios de vuelo",
    description:
      "Modifica las fechas, horarios, rutas o datos de los pasajeros con asistencia telefónica rápida.",
    Icon: CalendarClock,
  },
  {
    title: "Cancelación de vuelos",
    description:
      "Consulta las normas de cancelación, penalizaciones de la aerolínea y opciones disponibles antes de cancelar.",
    Icon: ShieldCheck,
  },
  {
    title: "Mejora de vuelo",
    description:
      "Consulta la disponibilidad de mejoras de asiento, cabina y tarifa para disfrutar de un viaje más cómodo.",
    Icon: PlaneTakeoff,
  },
  {
    title: "Reembolso de vuelo",
    description:
      "Obtén ayuda para entender los requisitos, plazos y pasos de la aerolínea para solicitar un reembolso.",
    Icon: CircleDollarSign,
  },
  {
    title: "Compensación por vuelo",
    description:
      "Pregunta por vuelos retrasados, modificados o interrumpidos y las posibles opciones de compensación.",
    Icon: BadgeDollarSign,
  },
  {
    title: "Asistencia para reservas",
    description:
      "Habla con un experto en viajes para resolver dudas sobre billetes, tarifas y asistencia para tu viaje.",
    Icon: RefreshCw,
  },
];

const HelpSpanish = () => {
  const phoneNumber = getPhoneDisplay();
  const phoneHref = getPhoneHref();

  return (
    <section className="block bg-gray-50 px-4 py-6 md:hidden">
      <div className="mx-auto max-w-md">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-theme">
            ¿Necesitas ayuda con tus billetes?
          </p>
          <h2 className="mt-1 text-2xl font-bold leading-tight text-dark">
            Llama a Tripyzo para recibir asistencia con tu vuelo
          </h2>
          <p className="mt-2 text-sm leading-6 text-light">
            Toca cualquier opción para comunicarte con nuestro equipo de
            asistencia al{" "}
            <span className="font-semibold text-dark">{phoneNumber}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {helpCards.map(({ title, description, Icon }) => (
            <a
              key={title}
              href={phoneHref}
              aria-label={`Llama a Tripyzo al ${phoneNumber} para recibir ayuda con ${title}`}
              className="group flex min-h-28 items-center gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-theme transition active:scale-[0.99]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-theme-light text-theme">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold leading-snug text-dark">
                  {title}
                </span>
                <span className="mt-1 block text-sm leading-5 text-light">
                  {description}
                </span>
              </span>

              <ArrowRight
                className="h-5 w-5 shrink-0 text-theme transition group-active:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpSpanish;
