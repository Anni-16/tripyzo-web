"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineSearch,
  HiFilter,
  HiDownload,
  HiEye,
  HiPrinter,
  HiShare,
  HiOutlineTicket,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineRefresh,
  HiOutlineDocumentText,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlinePaperAirplane,
} from "react-icons/hi";
import { IoAirplaneSharp, IoAirplaneOutline } from "react-icons/io5";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";

export default function MyBookingDetail() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  // Sample booking data
  const bookings = {
    upcoming: [
      {
        id: "BK001",
        bookingReference: "ABC123",
        status: "confirmed",
        paymentStatus: "paid",
        bookingDate: "2024-12-15",
        totalAmount: "$1,250.00",
        flights: [
          {
            type: "departure",
            airline: "Delta Airlines",
            airlineCode: "DL",
            flightNumber: "DL 1234",
            from: "New York (JFK)",
            to: "London (LHR)",
            departureDate: "2024-12-20",
            departureTime: "08:30",
            arrivalDate: "2024-12-20",
            arrivalTime: "20:45",
            duration: "7h 15m",
            terminal: "Terminal 4",
            gate: "G12",
            aircraft: "Boeing 777",
            class: "Economy",
            baggage: "2 pieces included",
            meal: "Meals included",
          },
          {
            type: "return",
            airline: "Delta Airlines",
            airlineCode: "DL",
            flightNumber: "DL 5678",
            from: "London (LHR)",
            to: "New York (JFK)",
            departureDate: "2024-12-28",
            departureTime: "10:15",
            arrivalDate: "2024-12-28",
            arrivalTime: "13:30",
            duration: "8h 15m",
            terminal: "Terminal 5",
            gate: "B45",
            aircraft: "Boeing 777",
            class: "Economy",
            baggage: "2 pieces included",
            meal: "Meals included",
          },
        ],
        passengers: [
          { name: "John Doe", type: "Adult", seat: "23A", specialMeal: false },
          { name: "Jane Doe", type: "Adult", seat: "23B", specialMeal: false },
        ],
      },
      {
        id: "BK002",
        bookingReference: "XYZ789",
        status: "pending",
        paymentStatus: "pending",
        bookingDate: "2024-12-16",
        totalAmount: "$890.00",
        flights: [
          {
            type: "departure",
            airline: "American Airlines",
            airlineCode: "AA",
            flightNumber: "AA 4321",
            from: "Los Angeles (LAX)",
            to: "Tokyo (NRT)",
            departureDate: "2024-12-22",
            departureTime: "11:45",
            arrivalDate: "2024-12-23",
            arrivalTime: "15:30",
            duration: "11h 45m",
            terminal: "Terminal 2",
            gate: "C78",
            aircraft: "Airbus A380",
            class: "Premium Economy",
            baggage: "2 pieces included",
            meal: "Meals included",
          },
        ],
        passengers: [
          {
            name: "Alice Smith",
            type: "Adult",
            seat: "12A",
            specialMeal: true,
          },
        ],
      },
    ],
    past: [
      {
        id: "BK003",
        bookingReference: "DEF456",
        status: "completed",
        paymentStatus: "paid",
        bookingDate: "2024-11-01",
        totalAmount: "$2,100.00",
        flights: [
          {
            type: "departure",
            airline: "United Airlines",
            airlineCode: "UA",
            flightNumber: "UA 7890",
            from: "Chicago (ORD)",
            to: "Frankfurt (FRA)",
            departureDate: "2024-11-10",
            departureTime: "16:20",
            arrivalDate: "2024-11-11",
            arrivalTime: "07:45",
            duration: "8h 25m",
            terminal: "Terminal 1",
            gate: "E34",
            aircraft: "Boeing 787",
            class: "Business",
            baggage: "2 pieces included",
            meal: "Premium meals included",
          },
        ],
        passengers: [
          { name: "Bob Wilson", type: "Adult", seat: "3A", specialMeal: false },
        ],
      },
    ],
    cancelled: [
      {
        id: "BK004",
        bookingReference: "GHI012",
        status: "cancelled",
        paymentStatus: "refunded",
        bookingDate: "2024-10-15",
        totalAmount: "$675.00",
        cancellationDate: "2024-10-20",
        refundAmount: "$675.00",
        flights: [
          {
            type: "departure",
            airline: "Southwest Airlines",
            airlineCode: "WN",
            flightNumber: "WN 3456",
            from: "Las Vegas (LAS)",
            to: "Denver (DEN)",
            departureDate: "2024-10-25",
            departureTime: "09:30",
            arrivalDate: "2024-10-25",
            arrivalTime: "11:45",
            duration: "2h 15m",
            terminal: "Terminal 3",
            gate: "A12",
            aircraft: "Boeing 737",
            class: "Economy",
            baggage: "1 piece included",
            meal: "Snacks included",
          },
        ],
        passengers: [
          {
            name: "Carol Brown",
            type: "Adult",
            seat: "15C",
            specialMeal: false,
          },
        ],
      },
    ],
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: HiOutlineCheckCircle,
        label: "Confirmed",
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: HiOutlineRefresh,
        label: "Pending",
      },
      completed: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: HiOutlineCheckCircle,
        label: "Completed",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: HiOutlineXCircle,
        label: "Cancelled",
      },
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        <Icon className="text-sm" />
        {config.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      paid: { bg: "bg-green-100", text: "text-green-700", label: "Paid" },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        label: "Payment Pending",
      },
      refunded: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        label: "Refunded",
      },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const toggleExpand = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const filterBookings = () => {
    let filtered = bookings[activeTab] || [];
    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.bookingReference
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.flights.some((flight) =>
            flight.flightNumber
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
          ) ||
          booking.passengers.some((passenger) =>
            passenger.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }
    return filtered;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-light text-xl" />
              <input
                type="text"
                placeholder="Search by booking reference, flight number, or passenger name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme/20 focus:border-theme"
              />
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition md:w-auto"
            >
              <HiFilter className="text-lg" />
              <span>Filters</span>
              {filterOpen ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-theme text-white rounded-xl hover:bg-theme/90 transition md:w-auto">
              <HiDownload className="text-lg" />
              <span>Export</span>
            </button>
          </div>

          {/* Filter Options */}
          {filterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme/20">
                  <option>All Airlines</option>
                  <option>Delta Airlines</option>
                  <option>American Airlines</option>
                  <option>United Airlines</option>
                </select>
                <select className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme/20">
                  <option>All Dates</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last 6 months</option>
                </select>
                <select className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme/20">
                  <option>All Passengers</option>
                  <option>1 Passenger</option>
                  <option>2 Passengers</option>
                  <option>3+ Passengers</option>
                </select>
                <button className="p-3 text-theme hover:bg-theme-light rounded-xl transition">
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["upcoming", "past", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium capitalize whitespace-nowrap transition ${
                activeTab === tab
                  ? "bg-theme text-white"
                  : "bg-white text-body hover:bg-theme-light"
              }`}
            >
              {tab} Bookings
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab
                    ? "bg-white/20 text-white"
                    : "bg-theme-light text-theme"
                }`}
              >
                {bookings[tab]?.length || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filterBookings().map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Booking Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-light">Booking Reference</p>
                      <p className="font-mono font-semibold text-dark">
                        {booking.bookingReference}
                      </p>
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <div>
                      <p className="text-sm text-light">Booked on</p>
                      <p className="font-medium text-dark">
                        {new Date(booking.bookingDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(booking.status)}
                    {getPaymentStatusBadge(booking.paymentStatus)}
                  </div>
                </div>
              </div>

              {/* Flight Summary */}
              <div className="p-6 bg-gradient-to-r from-theme/5 to-transparent">
                {booking.flights.map((flight, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row items-start md:items-center gap-4 ${idx > 0 ? "mt-4 pt-4 border-t border-dashed border-gray-200" : ""}`}
                  >
                    {/* Airline */}
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <div className="w-10 h-10 rounded-xl bg-theme-light flex items-center justify-center">
                        <IoAirplaneOutline className="text-xl text-theme" />
                      </div>
                      <div>
                        <p className="font-medium text-dark">
                          {flight.airline}
                        </p>
                        <p className="text-xs text-light">
                          {flight.flightNumber}
                        </p>
                      </div>
                    </div>

                    {/* Flight Route */}
                    <div className="flex-1 flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-dark">
                          {flight.departureTime}
                        </p>
                        <p className="text-xs text-light">{flight.from}</p>
                        <p className="text-xs text-theme mt-1">
                          {flight.departureDate}
                        </p>
                      </div>

                      <div className="flex-1 mx-4">
                        <div className="relative flex items-center justify-center">
                          <div className="w-full h-0.5 bg-gray-200"></div>
                          <HiOutlinePaperAirplane className="absolute text-theme text-lg transform rotate-90" />
                        </div>
                        <p className="text-xs text-center text-light mt-1">
                          {flight.duration}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-2xl font-bold text-dark">
                          {flight.arrivalTime}
                        </p>
                        <p className="text-xs text-light">{flight.to}</p>
                        <p className="text-xs text-theme mt-1">
                          {flight.arrivalDate}
                        </p>
                      </div>
                    </div>

                    {/* Expand Button */}
                    <button
                      onClick={() => toggleExpand(booking.id)}
                      className="p-2 hover:bg-theme-light rounded-lg transition"
                    >
                      {expandedBooking === booking.id ? (
                        <HiOutlineChevronUp className="text-xl text-theme" />
                      ) : (
                        <HiOutlineChevronDown className="text-xl text-theme" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Total Amount */}
              <div className="px-6 py-3 bg-gray-50 flex justify-between items-center">
                <p className="text-sm text-light">Total Amount</p>
                <p className="text-xl font-bold text-theme">
                  {booking.totalAmount}
                </p>
              </div>

              {/* Expanded Details */}
              {expandedBooking === booking.id && (
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                  {/* Flight Details Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {booking.flights.map((flight, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl p-4 shadow-sm"
                      >
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                          {flight.type === "departure" ? (
                            <MdFlightTakeoff className="text-theme text-lg" />
                          ) : (
                            <MdFlightLand className="text-theme text-lg" />
                          )}
                          <span className="font-medium text-dark capitalize">
                            {flight.type} Flight
                          </span>
                          <span className="text-xs text-light ml-auto">
                            {flight.flightNumber}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-light">Aircraft</span>
                            <span className="font-medium text-dark">
                              {flight.aircraft}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-light">Class</span>
                            <span className="font-medium text-dark">
                              {flight.class}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-light">Terminal/Gate</span>
                            <span className="font-medium text-dark">
                              {flight.terminal} • {flight.gate}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-light">Baggage</span>
                            <span className="font-medium text-dark">
                              {flight.baggage}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-light">Meal</span>
                            <span className="font-medium text-dark">
                              {flight.meal}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Passenger Details */}
                    <div className="bg-white rounded-xl p-4 shadow-sm lg:col-span-2">
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                        <HiOutlineUser className="text-theme" />
                        <span className="font-medium text-dark">
                          Passenger Details
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {booking.passengers.map((passenger, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-dark">
                                {passenger.name}
                              </p>
                              <p className="text-xs text-light">
                                {passenger.type} • Seat {passenger.seat}
                              </p>
                            </div>
                            {passenger.specialMeal && (
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                Special Meal
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="lg:col-span-2 flex flex-wrap gap-3 mt-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-theme text-white rounded-lg hover:bg-theme/90 transition">
                        <HiEye className="text-lg" />
                        View E-Ticket
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                        <HiPrinter className="text-lg" />
                        Print
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                        <HiShare className="text-lg" />
                        Share
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                        <HiOutlineDocumentText className="text-lg" />
                        Invoice
                      </button>
                    </div>

                    {/* Cancellation Info for Cancelled Bookings */}
                    {booking.status === "cancelled" && (
                      <div className="lg:col-span-2 bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-700">
                          This booking was cancelled on{" "}
                          {booking.cancellationDate}. Refund amount:{" "}
                          {booking.refundAmount} has been processed.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Empty State */}
          {filterBookings().length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-theme-light rounded-full flex items-center justify-center mx-auto mb-4">
                <HiOutlineTicket className="text-4xl text-theme" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2">
                No bookings found
              </h3>
              <p className="text-light mb-6">
                {searchTerm
                  ? "No bookings match your search criteria"
                  : `You don't have any ${activeTab} bookings`}
              </p>
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-3 bg-theme text-white rounded-xl hover:bg-theme/90 transition"
                >
                  Clear Search
                </button>
              ) : (
                <Link
                  href="/flights"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-theme text-white rounded-xl hover:bg-theme/90 transition"
                >
                  Search Flights
                  <HiOutlineArrowRight />
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-light mb-1">Total Bookings</p>
            <p className="text-2xl font-bold text-dark">
              {bookings.upcoming.length +
                bookings.past.length +
                bookings.cancelled.length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-light mb-1">Upcoming Trips</p>
            <p className="text-2xl font-bold text-green-600">
              {bookings.upcoming.length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-light mb-1">Past Trips</p>
            <p className="text-2xl font-bold text-blue-600">
              {bookings.past.length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-light mb-1">Total Spent</p>
            <p className="text-2xl font-bold text-theme">
              $
              {(
                bookings.upcoming.reduce(
                  (sum, b) => sum + parseFloat(b.totalAmount.replace("$", "")),
                  0,
                ) +
                bookings.past.reduce(
                  (sum, b) => sum + parseFloat(b.totalAmount.replace("$", "")),
                  0,
                )
              ).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
