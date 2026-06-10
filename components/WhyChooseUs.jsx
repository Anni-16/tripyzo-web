"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiShield,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiAward,
  FiStar,
  FiGlobe,
  FiTrendingUp,
  FiHeart,
  FiThumbsUp,
  FiPhone,
  FiMail,
  FiUsers,
  FiMapPin,
} from "react-icons/fi";
import {
  MdSupportAgent,
  MdFlight,
  MdVerified,
  MdFlightTakeoff,
  MdAirlineSeatReclineExtra,
  MdWifi,
  MdLocalAirport,
  MdTravelExplore,
} from "react-icons/md";
import {
  BsGraphUp,
  BsHeart,
  BsLightningCharge,
  BsStars,
  BsHeadset,
  BsShieldCheck,
  BsClock,
  BsWallet2,
} from "react-icons/bs";
import {
  FaArrowRightLong,
  FaPlane,
  FaTag,
  FaPercent,
  FaUserFriends,
} from "react-icons/fa6";
import { HiOutlineSparkles, HiOutlineGlobeAlt } from "react-icons/hi";
import { getPhoneByLanguage, getPhoneHref } from "@/config/ContactInfo";

export default function WhyChooseUs() {
  const currentPhone = getPhoneByLanguage();
  const phoneNumber = currentPhone.displayNumber || currentPhone.number;
  const phoneHref = getPhoneHref();

  const benefits = [
    {
      id: 1,
      icon: <MdTravelExplore className="text-2xl" />,
      title: "Personalized Service",
      description:
        "Get tailored flight recommendations based on your preferences and budget.",
      stat: "50,000+",
      statLabel: "Travelers Served",
    },
    {
      id: 2,
      icon: <FiGlobe className="text-2xl" />,
      title: "Global Network",
      description: "Access to major airlines serving destinations worldwide.",
      stat: "100+",
      statLabel: "Partner Airlines",
    },
    {
      id: 3,
      icon: <BsClock className="text-2xl" />,
      title: "Always Available",
      description: "Support team ready to assist with your travel questions.",
      stat: "24/7",
      statLabel: "Support Available",
    },
    {
      id: 4,
      icon: <BsWallet2 className="text-2xl" />,
      title: "Value Focused",
      description:
        "We help you find competitive options for your travel budget.",
      stat: "Best Price",
      statLabel: "Match Guarantee",
    },
  ];

  const expertise = [
    "Domestic & International Flights",
    "Group Travel Arrangements",
    "Multi-City Itineraries",
    "Last-Minute Bookings",
    "Flight Changes & Support",
    "Travel Planning Assistance",
  ];

  const testimonials = [
    {
      name: "Sarah Thompson",
      location: "New York, NY",
      travel: "London",
      rating: 5,
      text: "The team was incredibly helpful in finding the right flights for my business trip. Great service!",
      image: "/images/user-1.png",
    },
    {
      name: "Michael Chen",
      location: "Los Angeles, CA",
      travel: "Tokyo",
      rating: 5,
      text: "Made booking our family vacation so simple. Very responsive and professional.",
      image: "/images/user-2.png",
    },
    {
      name: "Emily Rodriguez",
      location: "Miami, FL",
      travel: "Paris",
      rating: 5,
      text: "Found me a great option for my Europe trip. Will definitely use again!",
      image: "/images/user-3.png",
    },
  ];

  return (
    <section className="py-12 bg-gray-100 relative ">
      <div className="container-custom relative z-10">
        {/* Header Section */}

        <div className="text-center max-w-6xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary-light rounded-full text-primary font-semibold text-sm mb-5">
            <BsStars className="text-lg" />
            <span> Why Travelers Trust Us</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark">
            Your Journey, <span className="text-accent">Simplified</span>
          </h2>

          <p className="text-body text-md">
            We're committed to making flight booking straightforward and
            stress-free
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="group bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-primary/30  transition-all duration-300 "
            >
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300">
                <div className="text-primary text-2xl group-hover:text-white transition-colors">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {benefit.description}
              </p>
              <div className="pt-3 border-t border-gray-100">
                <div className="text-xl font-bold text-primary">
                  {benefit.stat}
                </div>
                <div className="text-xs text-gray-400">{benefit.statLabel}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Expertise & Stats Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-10">
          {/* Left - Expertise */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
                <MdFlightTakeoff className="text-primary text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Our Expertise</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {expertise.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <FiCheckCircle className="text-primary text-sm flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-6 text-center border border-primary/10">
              <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mx-auto mb-3">
                <FiUsers className="text-primary text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50,000+</div>
              <div className="text-xs text-gray-500">Happy Travelers</div>
            </div>
            <div className="bg-gradient-to-br from-accent/5 to-transparent rounded-2xl p-6 text-center border border-accent/10">
              <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mx-auto mb-3">
                <FiGlobe className="text-accent text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900">100+</div>
              <div className="text-xs text-gray-500">Partner Airlines</div>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-6 text-center border border-primary/10">
              <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mx-auto mb-3">
                <FiStar className="text-primary text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.8/5</div>
              <div className="text-xs text-gray-500">Customer Rating</div>
            </div>
            <div className="bg-gradient-to-br from-accent/5 to-transparent rounded-2xl p-6 text-center border border-accent/10">
              <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mx-auto mb-3">
                <BsClock className="text-accent text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-xs text-gray-500">Support Available</div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-10">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              What Travelers Say
            </h3>
            <p className="text-gray-500">Real experiences from our customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="text-yellow-400 fill-yellow-400 text-sm"
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Traveled to {testimonial.travel}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-theme"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32"></div>

          <div className="relative z-10 px-8 py-12 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <BsStars className="text-white text-sm" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Ready to Travel?
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Let's Plan Your Next Adventure
            </h3>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Get personalized assistance finding the right flights for your
              travel needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <FiPhone className="text-sm" />
                Call {phoneNumber}
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all"
              >
                <FiMail className="text-sm" />
                Contact Us
                <FaArrowRightLong className="text-sm group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
