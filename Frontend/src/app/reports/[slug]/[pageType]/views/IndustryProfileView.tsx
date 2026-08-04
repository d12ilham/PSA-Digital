"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Coins,
  Download,
  Landmark,
  Network,
  TrendingUp,
  Users,
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  slug: string;
  status: string;
  pdfFileUrl?: string;
  psaSectorPageUrl?: string;
  contactUrl?: string;
  year?: {
    label: string;
  };
}

export default function IndustryProfileView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();
  const [activeGrowthBar, setActiveGrowthBar] = useState<number | null>(5); // 2025 default

  const growthData = [
    { year: "2020", val: "194,500", height: "60%" },
    { year: "2021", val: "198,200", height: "66%" },
    { year: "2022", val: "205,000", height: "74%" },
    { year: "2023", val: "209,400", height: "80%" },
    { year: "2024", val: "213,800", height: "88%" },
    { year: "2025", val: "218,000", height: "100%" },
  ];

  const trainingData = [
    {
      year: "2021",
      enrol: "7,800",
      comp: "4,200",
      enrolH: "75%",
      compH: "52%",
    },
    {
      year: "2022",
      enrol: "8,100",
      comp: "4,500",
      enrolH: "82%",
      compH: "55%",
    },
    {
      year: "2023",
      enrol: "8,400",
      comp: "4,700",
      enrolH: "88%",
      compH: "58%",
    },
    {
      year: "2024",
      enrol: "8,650",
      comp: "4,900",
      enrolH: "95%",
      compH: "62%",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <header className="bg-[#161b01] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div
            onClick={() => router.push(`/reports/${slug}`)}
            className="flex items-center gap-2 cursor-pointer font-extrabold text-base text-white hover:text-accent transition-colors"
          >
            <span>LG WIR {report.year?.label || "2026"}</span>
          </div>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs font-semibold">
            <div className="relative group py-1">
              <button className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer">
                About <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-48 space-y-1 z-50">
                <button
                  onClick={() => router.push(`/reports/${slug}/introduction`)}
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Introduction
                </button>
                <button
                  onClick={() => router.push(`/reports/${slug}/about`)}
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  About Public Skills Australia
                </button>
                <button
                  onClick={() => router.push(`/reports/${slug}/methodology`)}
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Methodology
                </button>
              </div>
            </div>

            <button
              onClick={() => router.push(`/reports/${slug}/executive_summary`)}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Executive Summary
            </button>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/drivers_of_change`)
                }
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
              >
                Drivers of Change <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-48 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/drivers_of_change`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Drivers of Change
                </button>
                <button
                  onClick={() => router.push(`/reports/${slug}/megatrends`)}
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Nine Megatrends
                </button>
              </div>
            </div>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/industry_overview`)
                }
                className="flex items-center gap-1 text-accent font-bold cursor-pointer"
              >
                Industry Overview <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-56 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/industry_overview`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Industry-Sector Overview
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/state_territory`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  State and Territory Profile
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/industry_profile`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-accent font-bold hover:bg-white/10 rounded-lg transition-colors"
                >
                  Industry Profile
                </button>
              </div>
            </div>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
              >
                Workforce Insights <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-48 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Insights Overview
                </button>
              </div>
            </div>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_strategies`)
                }
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
              >
                Workforce Strategies <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-56 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_strategies`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  2026 Proposed Strategies
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/existing_strategies`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Existing Strategies
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/federal_initiatives`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Federal Initiatives
                </button>
              </div>
            </div>

            <button
              onClick={() => router.push(`/reports/${slug}/looking_forward`)}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Looking Forward
            </button>
          </nav>

          <div>
            {report.pdfFileUrl ? (
              <a
                href={report.pdfFileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0C582B] hover:bg-[#046D2A] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Download 2026 PDF</span>
                <Download className="h-3.5 w-3.5" />
              </a>
            ) : (
              <button
                onClick={() => router.push(`/reports/${slug}`)}
                className="bg-[#0C582B] hover:bg-[#046D2A] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Download 2026 PDF</span>
                <Download className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => router.push(`/reports/${slug}/state_territory`)}
            className="border border-border bg-white hover:bg-gray-50 text-foreground font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to State and Territory
            Workforce Profile
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/workforce_insights`)}
            className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            Next Section: Workforce Insights{" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Hero Card */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#046D2A]">
              Industry Profile
            </h1>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-normal">
              Key industry data from the 2026 Report: employment growth, asset
              management and Local Government Training Package activity. For
              sector-wide figures, see the Industry-Sector Overview; for
              state-level data, see the State and Territory Workforce Profile.
            </p>
          </div>

          {/* Right Icon Illustration */}
          <div className="lg:col-span-4 flex items-center justify-center p-4">
            <div className="w-48 h-32 bg-[#FAFBF6] border border-border/60 rounded-2xl p-4 flex items-center justify-center gap-4 shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: TWO DATA CHARTS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Employment Growth */}
          <div className="bg-white rounded-2xl border border-border border-t-4 border-t-[#046D2A] p-6 shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-foreground/50 uppercase block">
                SOURCE: ABS, PUBLIC SECTOR EMPLOYMENT AND EARNINGS, RELEASES
                2020–2025
              </span>
              <h3 className="font-extrabold text-lg text-foreground">
                2020–2025 Employment Growth in Local Government
              </h3>

              {/* Bar Chart Visualization */}
              <div className="pt-8 pb-4 relative h-64 flex items-end justify-between gap-3 px-4 bg-[#FAFBF6] rounded-xl border border-border/50">
                {growthData.map((item, idx) => (
                  <div
                    key={item.year}
                    onMouseEnter={() => setActiveGrowthBar(idx)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  >
                    {/* Tooltip */}
                    {activeGrowthBar === idx && (
                      <div className="mb-2 bg-[#1B240E] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md animate-fade-in text-center">
                        {item.year}: {item.val}
                      </div>
                    )}
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        activeGrowthBar === idx
                          ? "bg-[#728C28]"
                          : "bg-[#A1C950]/80 hover:bg-[#85B810]"
                      }`}
                      style={{ height: item.height }}
                    />
                    <span className="text-xs font-bold text-foreground/75 mt-2">
                      {item.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-foreground/50 italic leading-relaxed pt-2 border-t border-border/40">
              Figure 1: 2020–2025 Employment Growth in Local Government. Roll
              over any bar for its value. Bar values to be verified against the
              report data at content QA.
            </p>
          </div>

          {/* Chart 2: Training Package Enrolments & Completions */}
          <div className="bg-white rounded-2xl border border-border border-t-4 border-t-[#046D2A] p-6 shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-foreground/50 uppercase block">
                SOURCE: NCVER, TOTAL VET STUDENTS AND COURSES
              </span>
              <h3 className="font-extrabold text-lg text-foreground">
                Local Government Training Package — Enrolment and Completion
              </h3>

              {/* Legend */}
              <div className="flex items-center gap-6 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-xs bg-[#A1C950]" />
                  <span className="text-foreground/80">Enrolments</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-xs bg-[#0C582B]" />
                  <span className="text-foreground/80">Completions</span>
                </div>
              </div>

              {/* Bar Chart Visualization */}
              <div className="pt-8 pb-4 relative h-64 flex items-end justify-between gap-6 px-6 bg-[#FAFBF6] rounded-xl border border-border/50">
                {trainingData.map((item) => (
                  <div
                    key={item.year}
                    className="flex-1 flex flex-col items-center h-full justify-end"
                  >
                    <div className="flex items-end gap-1.5 w-full justify-center h-full">
                      {/* Enrolment Bar */}
                      <div
                        className="w-1/2 bg-[#A1C950] rounded-t-md transition-all hover:bg-[#85B810]"
                        style={{ height: item.enrolH }}
                        title={`Enrolments: ${item.enrol}`}
                      />
                      {/* Completion Bar */}
                      <div
                        className="w-1/2 bg-[#0C582B] rounded-t-md transition-all hover:bg-[#046D2A]"
                        style={{ height: item.compH }}
                        title={`Completions: ${item.comp}`}
                      />
                    </div>
                    <span className="text-xs font-bold text-foreground/75 mt-2">
                      {item.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-foreground/50 italic leading-relaxed pt-2 border-t border-border/40">
              Figure 2: LGA Local Government Training Package enrolment and
              completion. Chart values to be verified against the report data at
              content QA.
            </p>
          </div>
        </div>

        {/* ── SECTION 3: ASSET MANAGEMENT CONTAINER ── */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-foreground/50 uppercase block">
              SOURCE: ALGA, 2024 NATIONAL STATE OF THE ASSETS REPORT
            </span>
            <h3 className="font-extrabold text-xl text-foreground">
              Asset Management
            </h3>
          </div>

          {/* 3 Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Stat 1 */}
            <div className="bg-[#FAFBF6] border border-border/60 rounded-xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Landmark className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#046D2A] block leading-none">
                  ~1/3
                </span>
                <p className="text-xs font-semibold text-foreground/80 leading-tight">
                  of Australia's public infrastructure assets
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#FAFBF6] border border-border/60 rounded-xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Network className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#046D2A] block leading-none">
                  77%
                </span>
                <p className="text-xs font-semibold text-foreground/80 leading-tight">
                  of the national road network by length
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#FAFBF6] border border-border/60 rounded-xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Coins className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#046D2A] block leading-none">
                  $643bn
                </span>
                <p className="text-xs font-semibold text-foreground/80 leading-tight">
                  estimated value of public assets managed
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-foreground/50 italic leading-relaxed pt-2 border-t border-border/40">
            Figure 3: Asset Management — roads, airports, facilities and other
            assets managed by local councils.
          </p>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#161b01] text-white py-4 px-6 sm:px-8 border-t border-[#252D02]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-white/80">
            © Public Skills Australia 2026 · Local Government Workforce Insights
            Report
          </p>
          <a
            href={
              report.contactUrl ||
              "https://publicskillsaustralia.org.au/contact"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:text-white font-semibold no-underline"
          >
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
}
