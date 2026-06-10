"use client";

import { CheckCircle } from "lucide-react";

const steps = [
  "Flight Details",
  "Choose Fare",
  "Travellers",
  "Add-ons",
  "Payment",
];

const BookingTimeline = ({ activeStep = 1 }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        return (
          <div key={index} className="flex items-center w-full">
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold
                ${
                  stepNumber <= activeStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNumber < activeStep ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  stepNumber
                )}
              </div>

              <span className="text-xs mt-2">{step}</span>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookingTimeline;
