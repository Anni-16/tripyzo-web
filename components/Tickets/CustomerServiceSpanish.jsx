import {
  BadgeCheck,
  Clock3,
  CreditCard,
  Headphones,
} from "lucide-react";
import { getPhoneDisplay, getPhoneHref } from "@/config/ContactInfo";

const services = [
  {
    title: "Atención al cliente las 24 horas",
    Icon: Headphones,
  },
  {
    title: "Confirmación inmediata de la reserva",
    Icon: BadgeCheck,
  },
  {
    title: "Planes de pago flexibles",
    Icon: CreditCard,
  },
  {
    title: "Asesoramiento experto de nuestros especialistas en viajes",
    Icon: Clock3,
  },
];

const CustomerServiceSpanish = () => {
  const phoneNumber = getPhoneDisplay("spanish");
  const phoneHref = getPhoneHref("spanish");

  return (
    <section className="block bg-white px-4 py-6 md:hidden">
      <div className="mx-auto max-w-md">
        <h2 className="mb-4 text-center text-2xl font-bold text-dark">
          Atención al cliente
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {services.map(({ title, Icon }) => (
            <a
              key={title}
              href={phoneHref}
              aria-label={`Llama a Tripyzo al ${phoneNumber} para recibir ayuda con ${title}`}
              className="relative flex aspect-square overflow-hidden rounded-lg border border-theme-light bg-white p-3 text-center shadow-[0_10px_28px_rgba(42,43,46,0.08)] transition active:scale-[0.98]"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-theme" />
              <span className="flex w-full flex-col items-center justify-center rounded-md bg-gradient-to-b from-primary-light to-white px-2 py-3">
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-theme text-white shadow-phone">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-sm font-bold leading-snug text-dark">
                  {title}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerServiceSpanish;
