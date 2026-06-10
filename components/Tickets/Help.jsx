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
    title: "Flight Changes",
    description:
      "Adjust travel dates, times, routes, or passenger details with quick phone support.",
    Icon: CalendarClock,
  },
  {
    title: "Flight Cancellation",
    description:
      "Review cancellation rules, airline penalties, and available options before you cancel.",
    Icon: ShieldCheck,
  },
  {
    title: "Flight Upgrade",
    description:
      "Check seat, cabin, and fare upgrade availability for a smoother trip.",
    Icon: PlaneTakeoff,
  },
  {
    title: "Flight Refund",
    description:
      "Get help understanding refund eligibility, timelines, and airline refund steps.",
    Icon: CircleDollarSign,
  },
  {
    title: "Flight Compensation",
    description:
      "Ask about delayed, changed, or disrupted flights and possible compensation paths.",
    Icon: BadgeDollarSign,
  },
  {
    title: "Booking Support",
    description:
      "Speak with a travel expert for ticket questions, fare checks, and trip assistance.",
    Icon: RefreshCw,
  },
];

const Help = () => {
  const phoneNumber = getPhoneDisplay();
  const phoneHref = getPhoneHref();

  return (
    <section className="block bg-gray-50 px-4 py-6 md:hidden">
      <div className="mx-auto max-w-md">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-theme">
            Need help with tickets?
          </p>
          <h2 className="mt-1 text-2xl font-bold leading-tight text-dark">
            Call Tripyzo for flight support
          </h2>
          <p className="mt-2 text-sm leading-6 text-light">
            Tap any option below to connect with our support team at{" "}
            <span className="font-semibold text-dark">{phoneNumber}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {helpCards.map(({ title, description, Icon }) => (
            <a
              key={title}
              href={phoneHref}
              aria-label={`Call Tripyzo at ${phoneNumber} for ${title}`}
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

export default Help;
