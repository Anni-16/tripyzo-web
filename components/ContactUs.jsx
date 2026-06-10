"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PhoneCall,
  Mail,
  MapPin,
  CheckCircle,
  Clock,
  Headset,
  Send,
  MessageCircle,
  ChevronRight,
  Star,
  Globe,
  Shield,
  Users,
  Award,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  HelpCircle,
  MessageSquare,
  ThumbsUp,
  Sparkles,
  Zap,
  Heart,
} from "lucide-react";
import { BsStars } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { HiOutlineSparkles } from "react-icons/hi";
import {
  getAddressDisplay,
  ContactInfo,
  getEmailHref,
  getMapEmbedUrl,
  getMapUrl,
  getPhoneDisplay,
  getPhoneHref,
} from "@/config/ContactInfo";

export default function ContactUs() {
  const phoneNumber = getPhoneDisplay();
  const phoneHref = getPhoneHref();
  const address = getAddressDisplay();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredContact: "email",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        preferredContact: "email",
      });
    }, 5000);
  };

  const contactInfo = [
    {
      icon: PhoneCall,
      title: "24/7 Phone Support",
      value: phoneNumber,
      link: phoneHref,
      desc: "Available 24/7 • Toll-Free",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: ContactInfo.emails.info.address,
      link: getEmailHref(),
      desc: "Response within 1 hour",
    },
    {
      icon: MapPin,
      title: "Office Address",
      value: address,
      desc: "Visit our headquarters",
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-14 bg-gray-100 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light rounded-full text-primary text-sm font-medium mb-6">
              <HiOutlineSparkles className="text-lg" />
              <span>GET IN TOUCH</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              We're Here to{" "}
              <span className="text-primary relative">Help You</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Have questions about your booking? Need assistance finding the
              perfect flight? Our travel experts are available 24/7 to provide
              the support you need.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 transition-all "
                >
                  <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-primary font-medium hover:underline block mb-1 text-sm break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-gray-700 text-sm mb-1">
                      {item.value}
                    </div>
                  )}
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Form */}
            <div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Send Us a Message
                    </h2>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Response within 1 hour
                    </p>
                  </div>
                </div>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-green-700 text-sm mb-3">
                      Thank you for contacting Tripyzo. Our team will respond
                      within 1 hour.
                    </p>
                    <p className="text-green-700 text-sm">
                      For immediate assistance, call our{" "}
                      <a
                        href={phoneHref}
                        className="font-semibold underline"
                      >
                        24/7 support line
                      </a>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 font-medium text-gray-700 text-sm">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 text-sm"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium text-gray-700 text-sm">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 text-sm"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700 text-sm">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 text-sm"
                        placeholder="+1 (000) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700 text-sm">
                        Preferred Contact Method
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === "email"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                preferredContact: e.target.value,
                              })
                            }
                            className="text-primary"
                          />
                          <span className="text-sm text-gray-600">Email</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === "phone"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                preferredContact: e.target.value,
                              })
                            }
                            className="text-primary"
                          />
                          <span className="text-sm text-gray-600">Phone</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700 text-sm">
                        Your Message *
                      </label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows="4"
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 resize-none text-sm"
                        placeholder="Tell us about your travel needs..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-white font-semibold px-4 py-3 rounded-lg hover:bg-primary-dark transition-all flex items-center justify-center gap-2 group"
                    >
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column - Live Chat & Hours */}
            <div className="space-y-6">
              {/* Live Chat Card */}
              <div className="bg-theme rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Need Immediate Help?
                  </h3>
                  <p className="text-white/80 text-sm mb-6 max-w-sm">
                    Chat with a live travel expert right now. Our team is ready
                    to assist you 24/7.
                  </p>
                  <a
                    href={phoneHref}
                    className="inline-flex items-center gap-2 bg-white text-primary px-5 py-2.5 rounded-lg font-semibold text-sm hover:shadow-xl transition-all group"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Call Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">
                      Monday - Friday
                    </span>
                    <span className="font-semibold text-primary text-sm">
                      24 Hours
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Saturday</span>
                    <span className="font-semibold text-primary text-sm">
                      24 Hours
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Sunday</span>
                    <span className="font-semibold text-primary text-sm">
                      24 Hours
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-500">Emergency</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Always Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-[400px] w-full">
        <iframe
          src={getMapEmbedUrl()}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">
                {ContactInfo.name}
              </div>
              <div className="text-xs text-gray-500">
                {address}
              </div>
            </div>
            <a
              href={getMapUrl()}
              target="_blank"
              className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-primary-dark transition"
            >
              Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
