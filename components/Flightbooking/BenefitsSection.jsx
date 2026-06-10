"use client";
import Link from "next/link";
import {
  Phone,
  Headset,
  DollarSign,
  Clock,
  Shield,
  Globe,
  Users,
  ArrowRight,
  Award,
  CheckCircle,
} from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Exclusive Unpublished Fares",
      desc: "Access special airline deals not available anywhere online",
    },
    {
      icon: Headset,
      title: "Personalized Service",
      desc: "Get custom travel plans from real travel experts",
    },
    {
      icon: Clock,
      title: "Save Valuable Time",
      desc: "Stop comparing 20+ websites. We do the work for you",
    },
    {
      icon: Shield,
      title: "Transparent Pricing",
      desc: "No hidden fees. What you see is exactly what you pay",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Matching About Us style */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              WHY TRAVEL EXPERTS?
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Benefits of Calling a{" "}
            <span className="text-primary">Travel Expert</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Why struggle with online booking when you can have a professional
            handle everything?
          </p>
        </div>

        {/* Benefits Grid - 4 Cards like About Us */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300">
                  <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-sm text-center leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
