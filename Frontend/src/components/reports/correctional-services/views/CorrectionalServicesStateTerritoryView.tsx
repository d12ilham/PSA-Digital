"use client";

import React from "react";
import { MapPinned } from "lucide-react";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type CorrectionalServicesReport = {
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: {
    label: string;
  };
  industry?: {
    slug?: string;
    name?: string;
  };
};

const jurisdictions = [
  {
    code: "ACT",
    name: "Australian Capital Territory",
    employees: "2,255",
    facilities: 1,
    capacity: 82,
    imprisonment: 99,
    expenditure: "$145m",
  },
  {
    code: "NSW",
    name: "New South Wales",
    employees: "9,839",
    facilities: 35,
    capacity: 94,
    imprisonment: 65,
    expenditure: "$1.83b",
  },
  {
    code: "NT",
    name: "Northern Territory",
    employees: "14,111",
    facilities: 6,
    capacity: 81,
    imprisonment: 96,
    expenditure: "$254m",
  },
  {
    code: "QLD",
    name: "Queensland",
    employees: "26,448",
    facilities: 14,
    capacity: 91,
    imprisonment: 77,
    expenditure: "$1.37b",
  },
  {
    code: "SA",
    name: "South Australia",
    employees: "33,646",
    facilities: 9,
    capacity: 86,
    imprisonment: 72,
    expenditure: "$360m",
  },
  {
    code: "TAS",
    name: "Tasmania",
    employees: "70,221",
    facilities: 4,
    capacity: 76,
    imprisonment: 53,
    expenditure: "$178m",
  },
  {
    code: "VIC",
    name: "Victoria",
    employees: "35,679",
    facilities: 14,
    capacity: 89,
    imprisonment: 58,
    expenditure: "$1.08b",
  },
  {
    code: "WA",
    name: "Western Australia",
    employees: "4,734",
    facilities: 16,
    capacity: 96,
    imprisonment: 94,
    expenditure: "$982m",
  },
];

const sources = [
  "Correctional Services Employment Headcount by Jurisdiction (2025), State/Territory Correctional Services annual reports.",
  "Correctional Custodial Facilities, Number (at 30 June 2025), Australian Government, State of the Service Report 2024-25, Table 13.",
  "Prison Capacity Utilisation by State and Territory, Productivity Commission 2025, Report on Government Services, Justice Part C - Corrective Services, Table 8A.5.",
  "Average Daily Imprisonment Rate by State and Territory, Australian Bureau of Statistics, Corrective Services Australia - December quarter 2025, Table 3.",
  "Real Net Prisons and Community Corrections Operating Expenditure 2024-25FY, Productivity Commission 2026 Report on Government Services, Justice Part C - 8 Corrective Services, Table 8A.2.",
];

export default function CorrectionalServicesStateTerritoryView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const [activeCode, setActiveCode] = React.useState("ACT");
  const [loaded, setLoaded] = React.useState(false);
  const active = jurisdictions.find((item) => item.code === activeCode) ?? jurisdictions[0];
  const maxFacilities = Math.max(...jurisdictions.map((item) => item.facilities));

  React.useEffect(() => {
    setLoaded(false);
    const timer = window.setTimeout(() => setLoaded(true), 100);
    return () => window.clearTimeout(timer);
  }, [activeCode]);

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#38BDF8]/30 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="state_territory" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        <ReportNavButtons slug={slug} currentPage="state_territory" />

        <section className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-4">
            <p className="animate-slide-up text-xs font-semibold uppercase leading-6 text-[#0B6DA8]">
              Correctional Services - State and Territory Profile
            </p>
            <h1 className="animate-slide-up text-3xl sm:text-4xl font-bold text-[#063B5D]">
              State and Territory Workforce Profile
            </h1>
            <p className="animate-slide-up-delay max-w-3xl text-sm leading-relaxed text-[#535862]">
              Choose a state or territory to compare Correctional Services employment headcount,
              custodial facilities, prison capacity utilisation, imprisonment rate and operating
              expenditure signals.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="animate-hero-pulse-settle flex h-36 w-36 items-center justify-center rounded-full bg-[#E8F7FE]">
              <MapPinned className="h-20 w-20 text-[#0B6DA8]" strokeWidth={1.5} />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-2xl border border-[#E9EAEB] bg-white p-5 lg:col-span-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase text-[#0B6DA8]">
                  Choose a state or territory
                </p>
                <h2 className="mt-1 text-xl font-bold text-[#252D02]">
                  Jurisdiction selector
                </h2>
              </div>
              <span className="rounded-full bg-[#E8F7FE] px-3 py-1 text-xs font-bold text-[#0B6DA8]">
                {active.code}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {jurisdictions.map((item, index) => {
                const isActive = item.code === activeCode;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setActiveCode(item.code)}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    className={`animate-card-entrance rounded-xl border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-2 border-[#0B6DA8] bg-[#E8F7FE] shadow-sm"
                        : "border-[#E9EAEB] bg-white hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
                    }`}
                  >
                    <span className="block text-lg font-bold text-[#063B5D]">{item.code}</span>
                    <span className="mt-1 block text-xs font-semibold leading-4 text-[#535862]">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[#0B6DA8] bg-white p-6 lg:col-span-7">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs font-bold uppercase text-[#0B6DA8]">
                  Active jurisdiction
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[#063B5D]">{active.name}</h2>
              </div>
              <span className="w-fit rounded-full bg-[#E8F7FE] px-4 py-2 text-xs font-bold uppercase text-[#0B6DA8]">
                Employees: {active.employees}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["Custodial facilities", String(active.facilities), "Total at 30 June 2025"],
                ["Capacity utilisation", `${active.capacity}%`, "2024-25 grouped jurisdiction view"],
                ["Imprisonment rate index", String(active.imprisonment), "State and territory comparison"],
                ["Operating expenditure", active.expenditure, "Prisons and community corrections"],
              ].map(([label, value, meta], index) => (
                <article
                  key={label}
                  style={{ animationDelay: `${index * 0.08}s` }}
                  className="animate-card-entrance rounded-xl border border-[#BEEBFB] bg-[#FBFCFD] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
                >
                  <p className="text-xs font-bold uppercase text-[#0B6DA8]">{label}</p>
                  <strong className="mt-2 block text-3xl font-bold text-[#252D02]">{value}</strong>
                  <p className="mt-2 text-xs leading-5 text-[#535862]">{meta}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-[#D5D7DA] bg-[#FBFCFD] p-5">
              <h3 className="text-base font-bold text-[#252D02]">
                Correctional Custodial Facilities by Jurisdiction
              </h3>
              <div className="mt-5 space-y-3">
                {jurisdictions.map((item, index) => (
                  <div key={item.code} className="grid grid-cols-[42px_1fr_34px] items-center gap-3">
                    <span className={`text-xs font-bold ${item.code === activeCode ? "text-[#0B6DA8]" : "text-[#535862]"}`}>
                      {item.code}
                    </span>
                    <div className="h-4 rounded-full bg-[#E8F7FE]">
                      <div
                        style={{
                          width: loaded ? `${(item.facilities / maxFacilities) * 100}%` : "0%",
                          transitionDelay: `${index * 55}ms`,
                        }}
                        className={`h-full rounded-full transition-all duration-1000 ${
                          item.code === activeCode ? "bg-[#38BDF8]" : "bg-[#0B6DA8]"
                        }`}
                      />
                    </div>
                    <span className="text-right text-xs font-bold text-[#063B5D]">
                      {item.facilities}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#252D02]">Sources</h2>
          <div className="grid grid-cols-1 gap-4 text-xs leading-relaxed text-[#535862] md:grid-cols-2">
            {sources.map((source, index) => (
              <div key={source} className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F7FE] text-xs font-bold text-[#0B6DA8]">
                  {index + 17}
                </span>
                <p>{source}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
