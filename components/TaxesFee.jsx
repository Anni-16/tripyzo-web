import {
  getAddressDisplay,
  getEmailHref,
  getPhoneDisplay,
  getPhoneHref,
  getPrimaryEmail,
  getWebsiteDisplay,
  getWebsiteUrl,
} from "@/config/ContactInfo";

import { BadgeCheck, FileText, Info, ShieldCheckIcon } from "lucide-react";

import { HiOutlineSparkles } from "react-icons/hi";

export default function TaxesFee() {
  const email = getPrimaryEmail();
  const phoneNumber = getPhoneDisplay();

  const taxesFees = [
    {
      name: "Security & Insurance Surcharge",
      applicable: "Flights operated by selected international carriers",
      code: "AP",
      amount: "$4.00 per leg",
    },
    {
      name: "Alaska/Hawaii Travel Facilities Tax",
      applicable: "Flights to or from Alaska or Hawaii",
      code: "US",
      amount: "$10.60 one-way / $21.20 round-trip",
    },
    {
      name: "U.S. Domestic Segment Fee",
      applicable: "Each segment of a domestic U.S. flight",
      code: "ZP",
      amount: "$4.80 per segment",
    },
    {
      name: "U.S. Excise Ticket Tax",
      applicable:
        "U.S. mainland travel and certain Canada/Mexico routes within eligible zones",
      code: "US",
      amount: "7.5% of airfare",
    },
    {
      name: "Passenger Facility Charge (PFC)",
      applicable: "Charged by selected U.S. airports for facility improvements",
      code: "XF",
      amount: "Up to $4.50 per stop",
    },
    {
      name: "U.S. September 11th Security Fee",
      applicable: "Applied to U.S. and foreign air carrier enplanements",
      code: "AY",
      amount: "$5.60 each way",
    },
    {
      name: "U.S. International Travel Tax",
      applicable:
        "Flights arriving in or departing from the U.S., Puerto Rico, or U.S. Virgin Islands",
      code: "US",
      amount: "$21.10",
    },
    {
      name: "APHIS Inspection Fee",
      applicable: "International flights arriving into the U.S.",
      code: "XA",
      amount: "$3.83",
    },
    {
      name: "Immigration Processing Fee",
      applicable: "International arrivals into the U.S. and territories",
      code: "XY",
      amount: "$7.00",
    },
    {
      name: "Customs Processing Fee",
      applicable: "International entries into the U.S.",
      code: "YC",
      amount: "$6.52",
    },
    {
      name: "International Departure / Arrival Taxes",
      applicable: "Varies by destination, government, and airport authority",
      code: "Varies",
      amount: "May vary by itinerary",
    },
    {
      name: "Airfare Booking Service Fee",
      applicable:
        "Applies per traveler based on fare type and booking complexity",
      code: "Fees",
      amount: "Up to $30.00 per person",
    },
    {
      name: "Hotel Booking Service Fee",
      applicable: "Applies per room or per night depending on booking type",
      code: "Fees",
      amount: "Up to $35.00",
    },
    {
      name: "Car Rental Booking Service Fee",
      applicable: "Applied once per car rental transaction",
      code: "Fees",
      amount: "$14.00",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-14 bg-gray-100 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light rounded-full text-primary text-sm font-medium mb-6">
              <HiOutlineSparkles className="text-lg" />
              <span>TAXES & FEES OVERVIEW</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Tripyzo{" "}
              <span className="text-primary relative">Taxes & Fees</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Review common taxes, government charges, and service fees that may
              apply to your travel booking with Tripyzo.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg space-y-12 text-gray-700">
          {/* Introduction */}
          <div>
            <h2 className="text-3xl font-bold text-secondary mb-4 font-heading">
              Taxes and Fees Overview
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <BadgeCheck className="text-primary w-6 h-6 mt-1" />
              <p>
                Tripyzo.com is an independent travel agency offering booking
                assistance for flights, hotels, car rentals, and vacation
                packages. Taxes, fees, and service charges may vary based on
                route, supplier, passenger type, and booking details.
              </p>
            </div>

            <p className="mt-3">
              The information below is provided for general guidance only. Final
              charges will be shown during the booking process before payment is
              completed on{" "}
              <a
                href={getWebsiteUrl()}
                className="text-primary font-medium underline"
              >
                {getWebsiteDisplay()}
              </a>
              .
            </p>
          </div>

          {/* Table */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Common Travel Taxes and Service Fees
            </h2>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[900px] text-left border-collapse">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-5 py-4 text-sm font-semibold w-[35%]">
                      Name & Description
                    </th>
                    <th className="px-5 py-4 text-sm font-semibold w-[35%]">
                      Applicable To
                    </th>
                    <th className="px-5 py-4 text-sm font-semibold w-[12%]">
                      Code
                    </th>
                    <th className="px-5 py-4 text-sm font-semibold w-[18%]">
                      Estimated Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {taxesFees.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-4 font-medium text-gray-800">
                        {item.name}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {item.applicable}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-semibold">
                          {item.code}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-800">
                        {item.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Additional Notes
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <Info className="text-primary w-6 h-6 mt-1" />
              <p>
                Passenger categories may include adults, children, infants,
                students, seniors, and military personnel.
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-1">
              <li>
                Government-imposed taxes and fees may change without prior
                notice.
              </li>
              <li>
                Service fees charged by Tripyzo for processing transactions are
                generally non-refundable.
              </li>
              <li>
                Final pricing depends on fare availability, supplier rules,
                passenger details, and itinerary complexity.
              </li>
            </ul>
          </div>

          {/* Service Fee Exceptions */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Service Fee Exceptions
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <FileText className="text-primary w-6 h-6 mt-1" />
              <p>
                Certain bookings may involve additional service fees based on
                fare class, route complexity, or supplier requirements.
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Business or First Class fares:</strong> Up to $100 per
                passenger
              </li>
              <li>
                <strong>Multi-city bookings:</strong> Up to $100 per traveler
              </li>
              <li>
                <strong>Multiple airline or complex itineraries:</strong> Fees
                may vary by booking
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Need Help Understanding Fees?
            </h2>

            <div className="flex items-start gap-3 mb-3">
              <ShieldCheckIcon className="text-primary w-6 h-6 mt-1" />
              <p>
                For current taxes, fees, and charges related to your specific
                travel itinerary, please review the final fare breakdown during
                checkout or contact Tripyzo support.
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-1">
              <li>
                Email:{" "}
                <a
                  href={getEmailHref()}
                  className="text-primary hover:underline"
                >
                  {email.address}
                </a>
              </li>

              <li>
                Phone:{" "}
                <a
                  href={getPhoneHref()}
                  className="text-primary hover:underline"
                >
                  {phoneNumber}
                </a>
              </li>

              <li>Address: {getAddressDisplay()}</li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-heading">
              Disclaimer
            </h2>

            <p>
              Tripyzo.com is owned and operated by{" "}
              <strong>Aadi Travel LLC</strong>. Tripyzo provides independent
              travel booking assistance and is not directly affiliated with any
              airline, hotel, or travel supplier unless clearly stated.
            </p>

            <p className="mt-2">
              All fares, taxes, and fees are subject to availability, supplier
              rules, and government regulations until ticketed or confirmed.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
