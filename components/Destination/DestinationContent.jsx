import Image from "next/image";
import {
  CalendarDays,
  Clock,
  Headphones,
  Landmark,
  MapPin,
  Plane,
} from "lucide-react";
import { PhoneNumber } from "@/components/Contact/PhoneNumber";

const factIcons = [Plane, Clock, CalendarDays, MapPin];

const DestinationContent = ({ destination }) => {
  const facts = [
    { label: "Airport", value: destination.airport },
    { label: "Average nonstop time", value: destination.flightTime },
    { label: "Best value months", value: destination.bestMonths },
    { label: "Popular areas", value: destination.popularAreas },
  ];

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container-custom">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-theme">
              {destination.eyebrow}
            </p>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-dark md:text-4xl">
              {destination.heading}
            </h2>
            <div className="space-y-4 text-base leading-8 text-text-light md:text-lg">
              {destination.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#flight-search-form" className="btn-primary text-center">
                Search {destination.city} Flights
              </a>
              <PhoneNumber className="btn-outline justify-center" />
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-lg md:min-h-[420px]">
            <Image
              src={destination.image}
              alt={destination.imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
                Destination guide
              </p>
              <h3 className="mt-1 text-2xl font-bold">
                {destination.city}, {destination.state}
              </h3>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, index) => {
            const Icon = factIcons[index];

            return (
              <div
                key={fact.label}
                className="rounded-lg border border-gray-100 bg-gray-50 p-5"
              >
                <Icon className="mb-4 h-6 w-6 text-theme" />
                <p className="text-sm font-semibold uppercase tracking-wide text-text-light">
                  {fact.label}
                </p>
                <p className="mt-2 text-base font-semibold leading-6 text-dark">
                  {fact.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-dark md:text-3xl">
              {destination.whyTitle}
            </h2>
            <p className="mb-6 text-base leading-8 text-text-light">
              {destination.whyCopy}
            </p>
            <div className="space-y-4">
              {destination.benefits.map((item) => (
                <div key={item} className="flex gap-3">
                  <Headphones className="mt-1 h-5 w-5 shrink-0 text-theme" />
                  <p className="text-text-light">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-6 md:p-8">
            <h3 className="mb-4 text-2xl font-bold text-dark">
              {destination.tipsTitle}
            </h3>
            <div className="space-y-4">
              {destination.tips.map((tip) => (
                <div key={tip} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-theme" />
                  <p className="text-text-light">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-gray-100 p-6 md:p-8">
            <Landmark className="mb-4 h-8 w-8 text-theme" />
            <h2 className="mb-4 text-2xl font-bold text-dark">
              {destination.arrivalTitle}
            </h2>
            <p className="text-base leading-8 text-text-light">
              {destination.arrivalCopy}
            </p>
          </div>

          <div>
            <h2 className="mb-5 text-2xl font-bold text-dark md:text-3xl">
              Cheap Flights to {destination.city} FAQs
            </h2>
            <div className="space-y-4">
              {destination.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-lg border border-gray-100 p-5"
                >
                  <h3 className="text-lg font-semibold text-dark">
                    {faq.question}
                  </h3>
                  <p className="mt-2 leading-7 text-text-light">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationContent;
