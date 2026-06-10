"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, User, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

export default function TravellersDetails({ booking, setBooking }) {
  const [adults, setAdults] = useState([{ id: 1 }]);
  const [children, setChildren] = useState([]);
  const [infants, setInfants] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Mexico",
    "Brazil",
    "Argentina",
    "Japan",
    "China",
    "South Korea",
    "Singapore",
    "Malaysia",
    "Thailand",
    "Vietnam",
    "Philippines",
    "South Africa",
    "Nigeria",
    "Kenya",
    "Egypt",
    "UAE",
    "Saudi Arabia",
    "Turkey",
    "Russia",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Switzerland",
    "Austria",
    "Belgium",
    "Portugal",
    "Greece",
    "Poland",
    "Czech Republic",
    "Hungary",
    "Ireland",
    "New Zealand",
    "Pakistan",
    "Bangladesh",
    "Sri Lanka",
    "Nepal",
    "Afghanistan",
    "Iran",
    "Iraq",
    "Israel",
    "Jordan",
    "Lebanon",
    "Syria",
    "Kuwait",
    "Qatar",
    "Bahrain",
    "Oman",
    "Yemen",
    "Chile",
    "Colombia",
    "Peru",
    "Venezuela",
    "Ecuador",
    "Bolivia",
    "Paraguay",
    "Uruguay",
    "Costa Rica",
    "Panama",
    "Guatemala",
    "Honduras",
    "Nicaragua",
    "El Salvador",
    "Cuba",
    "Jamaica",
    "Puerto Rico",
    "Dominican Republic",
    "Haiti",
    "Bahamas",
    "Trinidad and Tobago",
    "Barbados",
    "Fiji",
    "Papua New Guinea",
    "Mauritius",
    "Seychelles",
    "Maldives",
    "Indonesia",
    "Brunei",
    "Cambodia",
    "Laos",
    "Myanmar",
    "Mongolia",
    "Kazakhstan",
    "Uzbekistan",
    "Ukraine",
    "Romania",
    "Bulgaria",
    "Serbia",
    "Croatia",
    "Slovenia",
    "Slovakia",
    "Lithuania",
    "Latvia",
    "Estonia",
    "Belarus",
    "Morocco",
    "Algeria",
    "Tunisia",
    "Libya",
    "Sudan",
    "Ethiopia",
    "Tanzania",
    "Uganda",
    "Ghana",
    "Ivory Coast",
    "Cameroon",
    "Angola",
    "Mozambique",
    "Zambia",
    "Zimbabwe",
    "Botswana",
    "Namibia",
  ].sort();

  /* ================= SAVE PASSENGERS ================= */

  useEffect(() => {
    const formatPassengers = (list, type) =>
      list.map((t) => ({
        title: t.title || "Mr",
        gender: t.gender || "",
        type,
        firstName: t.firstName || "",
        lastName: t.lastName || "",
        dateOfBirth:
          t.year && t.month && t.day
            ? `${t.year}-${months.indexOf(t.month) + 1}-${t.day}`
            : "",
        nationality: t.nationality || "",
      }));

    const passengers = [
      ...formatPassengers(adults, "adult"),
      ...formatPassengers(children, "child"),
      ...formatPassengers(infants, "infant"),
    ];

    sessionStorage.setItem("passengers", JSON.stringify(passengers));
  }, [adults, children, infants, months]);

  /* ================= UPDATE TRAVELLER ================= */

  const updateTraveller = (type, index, key, value) => {
    const updateList = (list) =>
      list.map((t, i) => (i === index ? { ...t, [key]: value } : t));

    if (type === "adult") setAdults(updateList(adults));
    if (type === "child") setChildren(updateList(children));
    if (type === "infant") setInfants(updateList(infants));
  };

  /* ================= ADD TRAVELLER ================= */

  const addTraveler = (type) => {
    const traveler = {
      id: Date.now(),
      title: "",
      firstName: "",
      lastName: "",
      month: "",
      day: "",
      year: "",
      gender: "",
      nationality: "",
    };

    if (type === "adult") setAdults([...adults, traveler]);
    if (type === "child") setChildren([...children, traveler]);
    if (type === "infant") setInfants([...infants, traveler]);
  };

  /* ================= REMOVE TRAVELLER ================= */

  const removeTraveler = (type, index) => {
    if (type === "adult") setAdults(adults.filter((_, i) => i !== index));
    if (type === "child") setChildren(children.filter((_, i) => i !== index));
    if (type === "infant") setInfants(infants.filter((_, i) => i !== index));
  };

  return (
    <section className="border border-gray-100 rounded-xl shadow-theme bg-white overflow-hidden">
      <div className="bg-theme text-white font-semibold text-base px-6 py-4 flex items-center gap-2">
        <User className="w-5 h-5" />
        Traveller Details
      </div>

      <div className="p-5 md:p-6 space-y-8">
        <TravellerGroup
          title="Adult"
          type="adult"
          travelers={adults}
          updateTraveller={updateTraveller}
          addTraveler={() => addTraveler("adult")}
          removeTraveler={(i) => removeTraveler("adult", i)}
          months={months}
          countries={countries}
        />

        <TravellerGroup
          title="Child"
          type="child"
          travelers={children}
          updateTraveller={updateTraveller}
          addTraveler={() => addTraveler("child")}
          removeTraveler={(i) => removeTraveler("child", i)}
          months={months}
          countries={countries}
        />

        <TravellerGroup
          title="Infant"
          type="infant"
          travelers={infants}
          updateTraveller={updateTraveller}
          addTraveler={() => addTraveler("infant")}
          removeTraveler={(i) => removeTraveler("infant", i)}
          months={months}
          countries={countries}
        />
      </div>
    </section>
  );
}

/* ================= TRAVELLER GROUP ================= */

function TravellerGroup({
  title,
  type,
  travelers,
  updateTraveller,
  addTraveler,
  removeTraveler,
  months,
  countries,
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-gray-100">
        <h3 className="font-semibold text-base text-dark">
          {title} Traveller{travelers.length > 1 ? "s" : ""}
        </h3>

        <Button
          onClick={addTraveler}
          variant="outline"
          size="sm"
          className="border-theme text-theme hover:bg-theme hover:text-white transition-all"
        >
          <Plus className="w-4 h-4 mr-1" /> Add {title}
        </Button>
      </div>

      {travelers.length === 0 ? (
        <p className="text-sm text-light italic">
          No {title.toLowerCase()} travellers added
        </p>
      ) : (
        travelers.map((traveler, index) => (
          <div
            key={traveler.id}
            className="border border-gray-100 rounded-xl p-5 bg-white space-y-4 relative hover:shadow-theme transition-all"
          >
            {index > 0 && (
              <button
                onClick={() => removeTraveler(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-full transition-all z-10"
                title={`Remove ${title} Traveller`}
              >
                <Trash2 size={16} />
              </button>
            )}

            <p className="font-semibold text-sm text-theme bg-theme-light inline-block px-3 py-1 rounded-full">
              Traveller {index + 1}: {title}
            </p>

            {/* NAME ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <Select
                onValueChange={(v) => updateTraveller(type, index, "title", v)}
              >
                <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:border-theme focus:ring-2 focus:ring-theme/20">
                  <SelectValue placeholder="Title*" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-100 shadow-theme">
                  <SelectItem value="Mr">Mr</SelectItem>
                  <SelectItem value="Mrs">Mrs</SelectItem>
                  <SelectItem value="Ms">Ms</SelectItem>
                  <SelectItem value="Miss">Miss</SelectItem>
                  <SelectItem value="Dr">Dr</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="First Name*"
                className="w-full bg-gray-50 border-gray-200 focus:border-theme focus:ring-2 focus:ring-theme/20"
                onChange={(e) =>
                  updateTraveller(type, index, "firstName", e.target.value)
                }
              />

              <Input
                placeholder="Middle Name"
                className="w-full bg-gray-50 border-gray-200 focus:border-theme focus:ring-2 focus:ring-theme/20"
                onChange={(e) =>
                  updateTraveller(type, index, "middleName", e.target.value)
                }
              />

              <Input
                placeholder="Last Name*"
                className="w-full bg-gray-50 border-gray-200 focus:border-theme focus:ring-2 focus:ring-theme/20"
                onChange={(e) =>
                  updateTraveller(type, index, "lastName", e.target.value)
                }
              />
            </div>

            {/* DOB ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <Select
                onValueChange={(v) => updateTraveller(type, index, "month", v)}
              >
                <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:border-theme focus:ring-2 focus:ring-theme/20">
                  <SelectValue placeholder="Month*" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-100 shadow-theme max-h-[300px]">
                  {months.map((m, i) => (
                    <SelectItem key={i} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(v) => updateTraveller(type, index, "day", v)}
              >
                <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:border-theme focus:ring-2 focus:ring-theme/20">
                  <SelectValue placeholder="Day*" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-100 shadow-theme max-h-[300px]">
                  {Array.from({ length: 31 }, (_, i) => (
                    <SelectItem
                      key={i}
                      value={(i + 1).toString().padStart(2, "0")}
                    >
                      {(i + 1).toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(v) => updateTraveller(type, index, "year", v)}
              >
                <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:border-theme focus:ring-2 focus:ring-theme/20">
                  <SelectValue placeholder="Year*" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-100 shadow-theme max-h-[300px]">
                  {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(v) => updateTraveller(type, index, "gender", v)}
              >
                <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:border-theme focus:ring-2 focus:ring-theme/20">
                  <SelectValue placeholder="Gender*" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-100 shadow-theme">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* NATIONALITY - Now a dropdown */}
            <Select
              onValueChange={(v) =>
                updateTraveller(type, index, "nationality", v)
              }
            >
              <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:border-theme focus:ring-2 focus:ring-theme/20">
                <SelectValue placeholder="Nationality*" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-100 shadow-theme max-h-[300px]">
                {countries.map((country, i) => (
                  <SelectItem key={i} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Required Fields Note */}
            <p className="text-xs text-light italic mt-1">* Required fields</p>
          </div>
        ))
      )}
    </div>
  );
}
