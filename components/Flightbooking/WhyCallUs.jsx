"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Headset,
  Shield,
  Clock,
  DollarSign,
  Star,
  ThumbsUp,
  TrendingUp,
  Users,
  Plane,
  Globe,
  MessageCircle,
  Award,
  CheckCircle,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react";

const WhyCallUs = () => {
  const reasons = [
    {
      icon: DollarSign,
      title: "Exclusive Phone-Only Deals",
      description:
        "Get access to special fares that aren't available on any website or app. Save more by calling us directly.",
    },
    {
      icon: Headset,
      title: "Real-Time Expert Assistance",
      description:
        "Speak directly with travel experts who compare 100+ airlines instantly to find you the best options.",
    },
    {
      icon: Shield,
      title: "No Hidden Fees",
      description:
        "What we quote is what you pay. Complete upfront pricing with no surprises or hidden charges.",
    },
  ];

  const stats = [
    { value: "50,000+", label: "Happy Customers", icon: Users },
    { value: "100+", label: "Airlines", icon: Plane },
    { value: "24/7", label: "Support", icon: Headset },
    { value: "4.9/5", label: "Rating", icon: Star },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              WHY CALL US?
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Better Deals. <span className="text-primary">Real People.</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get exclusive phone-only savings and personalized service you won't
            find online
          </p>
        </div>

        {/* 3 Reasons Grid - Matching About Us style */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300">
                  <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyCallUs;
