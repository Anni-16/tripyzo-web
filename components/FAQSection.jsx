"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Headphones } from "lucide-react";

const faqs = [
  {
    question: "How can I book a flight with Tripyzo?",
    answer:
      "Call us directly. Our travel experts can help you compare fares, review route options, and complete your booking.",
  },
  {
    question: "Why should I call instead of booking online?",
    answer:
      "You can speak with a real travel expert who can review fare details, baggage rules, schedule changes, and available phone-only options.",
  },
  {
    question: "What if I need to change or cancel my flight?",
    answer:
      "Call Tripyzo support. Our team will explain applicable airline policies, fare rules, service fees, and refund or exchange options.",
  },
  {
    question: "Can I get better deals by calling?",
    answer:
      "Some fares and booking options may be easier to review by phone, especially for flexible dates, complex trips, or last-minute travel.",
  },
  {
    question: "What about baggage allowance?",
    answer:
      "Share your baggage needs with our team and we will explain what is included, what costs extra, and which fare option fits your trip.",
  },
  {
    question: "How do I check in for my flight?",
    answer:
      "Most check-ins are completed directly with the airline. Tripyzo can help you find airline check-in details and review your itinerary.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Tripyzo accepts major payment cards through secure booking workflows. Available payment options are confirmed during checkout.",
  },
  {
    question: "What are your support hours?",
    answer:
      "Tripyzo offers 24/7 customer support for flight booking questions, changes, cancellations, and urgent travel assistance.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-dark">
            Frequently Asked <span className="text-theme">Questions</span>
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={faq.question} className="mb-2 bg-white rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-theme" />
                  <span className="font-semibold text-dark text-sm md:text-base">
                    {faq.question}
                  </span>
                </div>
                <div className="text-theme">
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-32" : "max-h-0"
                }`}
              >
                <div className="px-4 pb-3 text-text-light text-sm leading-relaxed border-t border-gray-100 pt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
