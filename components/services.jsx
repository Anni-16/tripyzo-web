import Image from "next/image";
import { getPhoneDisplay, getPhoneHref } from "@/config/ContactInfo";

const Services = () => {
  const phoneNumber = getPhoneDisplay();
  const phoneHref = getPhoneHref();

  return (
    <section className="py-12 bg-white">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Assured Quality */}
          <div className=" p-4  border border-gray-100 bg-white transition-all duration-300 group">
            <div className="w-14 h-14   duration-300 mb-2">
              <Image
                src="/images/icons/service.png"
                alt="Assured Quality"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-text">Assured Quality</h3>
            <p className="text-text-light text-sm leading-relaxed">
              We pride ourselves to provide all our customers with an unmatched
              high-quality booking and travel experience.
            </p>
          </div>

          {/* Low Fare Promise */}
          <div className=" p-4  border border-gray-100 bg-white transition-all duration-300  group">
            <div className="w-14 h-14   duration-300 mb-2">
              <Image
                src="/images/icons/fare.png"
                alt="Assured Quality"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-text mb-3">
              Low Fare Promise
            </h3>
            <p className="text-text-light text-sm leading-relaxed">
              If you can find a cheaper deal than the one you've booked with us,
              we duly refund the difference.
            </p>
          </div>

          {/* Easy & Secure */}
          <div className=" p-4  border border-gray-100 bg-white transition-all duration-300  group">
            <div className="w-14 h-14   duration-300 mb-2">
              <Image
                src="/images/icons/protection.png"
                alt="Assured Quality"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-text mb-3">Easy & Secure</h3>
            <p className="text-text-light text-sm leading-relaxed">
              Get your bookings confirmed within seconds via one phone call and
              avail of top-level security for all payments.
            </p>
          </div>

          {/* 24/7 Support Banner with Logo */}
          <div className="bg-theme  p-6 text-center text-white ">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="   flex items-center justify-center backdrop-blur-sm">
                <Image
                  src="/images/logo.png"
                  width={180}
                  height={40}
                  alt="Tripyzo"
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>

            <p className="text-white/80 text-sm mb-3">24/7 Support</p>
            <p className="text-white/90 text-sm mb-1">
              Our experts will help you choose the best option.
            </p>
            <p className="text-white/70 text-xs mb-4">
              Speak With a Travel Specialist
            </p>

            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 bg-white text-primary px-5 py-2.5 rounded-full font-semibold text-sm hover:gap-3 transition-all duration-300 "
            >
              Call {phoneNumber}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
