import Link from "next/link";
import { getWebsiteDisplay } from "@/config/ContactInfo";

const airlineInsightItems = [
  "Airline overview and travel strengths",
  "Major hubs and partner airline options",
  "Domestic and international route coverage",
  "Seat choices, cabin classes, and fare types",
  "Popular destinations and high-demand routes",
  "Flight change and cancellation rules",
  "Airline loyalty program details",
  "Booking guidance and ticket support",
  "International travel requirements",
  "Last-minute flight deal options",
  "Frequently asked airline questions",
];

const bookingSteps = [
  "Visit the official Tripyzo website.",
  "Choose your trip type, such as round trip or one way.",
  "Enter your departure city, destination, travel dates, and cabin class.",
  "Compare available flight options and select the fare that fits your plans.",
  "Add passenger and contact details for the reservation.",
  "Review the booking summary and complete payment securely.",
  "Receive your confirmation email with your booking reference.",
];

const savingsTips = [
  {
    title: "Book in advance:",
    text: "Planning early can help you find better fare availability and more flexible travel choices before prices rise closer to departure.",
  },
  {
    title: "Travel in quieter seasons:",
    text: "Flying outside peak holiday periods can make a big difference, especially when your dates are flexible.",
  },
  {
    title: "Compare fare options:",
    text: "Review airlines, routes, layovers, baggage rules, and timing before choosing the ticket that offers the best overall value.",
  },
  {
    title: "Watch for Tripyzo deals:",
    text: "Check current offers and phone-only options so you do not miss limited-time airfare savings.",
  },
];

const TicketsContent = () => {
  const websiteDisplay = getWebsiteDisplay();

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="container-custom">
        <div className="mx-auto max-w-5xl space-y-8">
          <div>
            <h2 className="text-2xl font-bold leading-tight text-dark md:text-4xl">
              Book Cheap Flights with Tripyzo
            </h2>
            <p className="mt-4 text-sm leading-7 text-light md:text-base">
              Travel should feel exciting, not limited by rising airfare or
              complicated booking choices. Tripyzo helps travelers compare
              flight options, find competitive fares, and book domestic or
              international trips from the USA with confidence. Our goal is to
              make flight booking easier, more affordable, and better supported
              from search to confirmation.
            </p>
            <p className="mt-4 text-sm leading-7 text-light md:text-base">
              Whether you are planning a family vacation, a business trip, a
              last-minute journey, or a flexible getaway, Tripyzo brings useful
              travel guidance and fare support together in one place. You can
              review airline options, compare routes, and get help with changes,
              cancellations, upgrades, refunds, and other ticket questions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold leading-tight text-dark md:text-3xl">
              Airline Insights to Plan Your Travel Better
            </h2>
            <p className="mt-4 text-sm leading-7 text-light md:text-base">
              Tripyzo works with a wide range of flight options across major
              domestic and international routes. Before booking, travelers can
              use airline details to understand fare rules, route networks,
              travel flexibility, and service choices more clearly.
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
              How to Book a Flight Ticket with Tripyzo?
            </h3>
            <p className="mt-4 text-sm leading-7 text-light md:text-base">
              Booking with Tripyzo is designed to be simple. Start with your
              travel details, compare available flights, and complete your
              reservation after reviewing the fare that works for your schedule
              and budget.
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-light md:text-base">
              {bookingSteps.map((step) => (
                <li key={step} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-theme" />
                  <span>
                    {step === "Visit the official Tripyzo website." ? (
                      <>
                        Visit the official Tripyzo website at{" "}
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
              Tripyzo Pro Tips to Book a Cheap Flight Ticket
            </h3>
            <p className="mt-4 text-sm leading-7 text-light md:text-base">
              Smart planning can help lower the cost of your next flight. Use
              these practical tips when searching for cheap flights from the USA
              or planning travel within the States.
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

export default TicketsContent;
