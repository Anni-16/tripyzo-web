"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  HiMenu,
  HiX,
  HiUser,
  HiUserCircle,
} from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import {
  ContactInfo,
  getPhoneDisplay,
  getPhoneHref,
} from "@/config/ContactInfo";
import { PhoneCall } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const timeoutRef = useRef(null);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const phoneNumber = getPhoneDisplay(pathname);
  const phoneHref = getPhoneHref(pathname);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Flights", href: "/flights" },
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact-us" },
  ];

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setProfileOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setProfileOpen(false), 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLoginClick = () => {
    if (pathname !== "/login" && pathname !== "/register") {
      sessionStorage.setItem("redirectAfterLogin", pathname);
    }
    setProfileOpen(false);
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* LOGO */}
          <Link
            href="/"
            className="relative flex-shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/images/logo.png"
              width={180}
              height={52}
              alt={ContactInfo.name}
              priority
              className=""
            />
          </Link>

          {/* MAIN NAVIGATION - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="relative px-1 py-2 text-sm font-medium text-text-light hover:text-primary transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Link
                href={phoneHref}
                className="flex items-center gap-3 px-6 py-3 text-gray-900 rounded-none"
                aria-label="Call 24/7 support"
              >
                <div className="relative">
                  <Image
                    src="/images/customer-support.png"
                    alt="Customer Support"
                    width={30}
                    height={30}
                    className="h-10 w-auto object-contain animate-pulse"
                  />
                  <span
                    className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl text-red-500">
                    {phoneNumber}
                  </div>
                  <div className="text-sm font-light uppercase">
                    24/7 Support - Call Now
                  </div>
                </div>
              </Link>
            </div>

            <Link
              href={phoneHref}
              className="flex md:hidden items-center justify-center bg-blue-600 text-white px-3 py-2 rounded-full text-sm font-semibold"
              aria-label="Call support"
            >
              <PhoneCall className="w-4 h-4 mr-1" />
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg text-text-light hover:text-primary transition-colors duration-200"
            >
              {open ? (
                <HiX className="text-xl" />
              ) : (
                <HiMenu className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 top-16 sm:top-20 bg-white z-40 overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-text-light hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {!user && (
              <div className="space-y-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-primary text-white px-4 py-3 rounded-lg font-medium"
                >
                  <HiUser className="text-lg" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full border border-primary/20 text-primary px-4 py-3 rounded-lg font-medium hover:bg-primary-soft"
                >
                  <HiUserCircle className="text-lg" />
                  <span>Create Account</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
