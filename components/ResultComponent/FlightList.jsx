// FlightList.jsx
"use client";

import { Suspense } from "react";
import FlightFilterSidebar from "./FilterSidebar";
import FlightCard from "./FlightCard";

export default function FlightList() {
  return (
    <main className="min-h-screen bg-theme-light/30">
      <div className="container-custom py-4 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6">
          {/* ===== Sidebar (Filters) ===== */}
          <aside className="w-full lg:w-80 xl:w-96 lg:sticky lg:top-24 h-fit self-start">
            <Suspense
              fallback={
                <div className="bg-white rounded-xl p-6 text-center text-body border border-gray-100 shadow-theme">
                  Loading filters...
                </div>
              }
            >
              <FlightFilterSidebar />
            </Suspense>
          </aside>

          {/* ===== Main Content (Flight Results) ===== */}
          <section className="flex-1 min-w-0">
            <FlightCard />
          </section>
        </div>
      </div>
    </main>
  );
}
