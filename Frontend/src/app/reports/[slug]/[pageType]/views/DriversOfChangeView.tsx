"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Clock,
  Cpu,
  Crosshair,
  Download,
  Globe,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Lock,
  RefreshCw,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Users,
  Users2,
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

export default function DriversOfChangeView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();

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
                className="flex items-center gap-1 text-accent font-bold cursor-pointer"
              >
                Drivers of Change <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-48 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/drivers_of_change`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-accent font-bold hover:bg-white/10 rounded-lg transition-colors"
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
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
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
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
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
            onClick={() => router.push(`/reports/${slug}/methodology`)}
            className="border border-border bg-white hover:bg-gray-50 text-foreground font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Methodology
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/industry_overview`)}
            className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            Next Section: Industry-Sector Overview{" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Hero Card */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              Drivers of Change
            </h1>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-normal">
              In 2024, Public Skills Australia identified nine megatrends
              impacting the Public Safety and Government industry-sectors. These
              megatrends were further considered in the development of the 2025{" "}
              <span className="font-semibold text-[#728C28]">
                Workforce Insights Reports
              </span>
              .
            </p>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-normal">
              While these megatrends will continue to have longer term
              implications for workforce planning and development across the
              Public Safety and Government industry-sectors, the 2026{" "}
              <span className="font-semibold text-[#728C28]">
                Workforce Insights Reports
              </span>{" "}
              have built on these and analysed four key drivers of change that
              cut across most megatrends. This is important as these drivers of
              change will likely impact the Public Safety and Government
              industry-sectors in the short to medium term.
            </p>
          </div>

          {/* Right Loop Circular Diagram */}
          <div className="lg:col-span-4 flex items-center justify-center p-4">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Top Icon */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shadow-xs">
                <ShieldAlert className="h-6 w-6" />
              </div>
              {/* Right Icon */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shadow-xs">
                <Clock className="h-6 w-6" />
              </div>
              {/* Bottom Icon */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shadow-xs">
                <Cpu className="h-6 w-6" />
              </div>
              {/* Left Icon */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shadow-xs">
                <HeartHandshake className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: FOUR KEY DRIVERS ── */}
        <div className="space-y-6">
          <div className="border-b border-border/60 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Four Key Drivers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Driver 1 */}
            <div className="bg-white rounded-2xl border border-border border-t-4 border-t-[#85B810] p-6 shadow-2xs space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <span className="text-xs font-extrabold text-[#728C28] uppercase block">
                  DRIVER 1
                </span>
                <h3 className="font-extrabold text-base text-foreground leading-snug">
                  Resilience of organisations to respond to strategic shocks
                </h3>
                <p className="text-xs text-foreground/75 leading-relaxed">
                  Compounding crises have exposed structural vulnerabilities...
                </p>
              </div>

              <div>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/drivers_of_change`)
                  }
                  className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-4 py-1.5 rounded-full cursor-pointer transition-colors shadow-xs"
                >
                  Open ▾
                </button>
              </div>
            </div>

            {/* Driver 2 */}
            <div className="bg-white rounded-2xl border border-border border-t-4 border-t-[#85B810] p-6 shadow-2xs space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <span className="text-xs font-extrabold text-[#728C28] uppercase block">
                  DRIVER 2
                </span>
                <h3 className="font-extrabold text-base text-foreground leading-snug">
                  Challenges to workforce productivity
                </h3>
                <p className="text-xs text-foreground/75 leading-relaxed">
                  Australia's slowest productivity growth in 60 years...
                </p>
              </div>

              <div>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/drivers_of_change`)
                  }
                  className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-4 py-1.5 rounded-full cursor-pointer transition-colors shadow-xs"
                >
                  Open ▾
                </button>
              </div>
            </div>

            {/* Driver 3 */}
            <div className="bg-white rounded-2xl border border-border border-t-4 border-t-[#85B810] p-6 shadow-2xs space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <span className="text-xs font-extrabold text-[#728C28] uppercase block">
                  DRIVER 3
                </span>
                <h3 className="font-extrabold text-base text-foreground leading-snug">
                  Emergence of Artificial Intelligence (AI), greater automation
                  and broader digital transformation
                </h3>
                <p className="text-xs text-foreground/75 leading-relaxed">
                  Capability uplift — and a growing security risk...
                </p>
              </div>

              <div>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/drivers_of_change`)
                  }
                  className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-4 py-1.5 rounded-full cursor-pointer transition-colors shadow-xs"
                >
                  Open ▾
                </button>
              </div>
            </div>

            {/* Driver 4 */}
            <div className="bg-white rounded-2xl border border-border border-t-4 border-t-[#85B810] p-6 shadow-2xs space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <span className="text-xs font-extrabold text-[#728C28] uppercase block">
                  DRIVER 4
                </span>
                <h3 className="font-extrabold text-base text-foreground leading-snug">
                  Workforce inclusivity
                </h3>
                <p className="text-xs text-foreground/75 leading-relaxed">
                  Recruiting and retaining diverse cohorts...
                </p>
              </div>

              <div>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/drivers_of_change`)
                  }
                  className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-4 py-1.5 rounded-full cursor-pointer transition-colors shadow-xs"
                >
                  Open ▾
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: NINE MEGATRENDS ── */}
        <div className="space-y-6">
          <div className="border-b border-border/60 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Nine Megatrends
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            {/* Megatrend 1 */}
            <div className="bg-white border border-border rounded-2xl p-4 flex flex-col items-center text-center space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Briefcase className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold text-foreground/80 leading-tight">
                Limitations in career pathways
              </p>
            </div>

            {/* Megatrend 2 */}
            <div className="bg-white border border-border rounded-2xl p-4 flex flex-col items-center text-center space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Globe2 className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold text-foreground/80 leading-tight">
                Climate change
              </p>
            </div>

            {/* Megatrend 3 */}
            <div className="bg-white border border-border rounded-2xl p-4 flex flex-col items-center text-center space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Settings className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold text-foreground/80 leading-tight">
                Competition for labour
              </p>
            </div>

            {/* Megatrend 4 */}
            <div className="bg-white border border-border rounded-2xl p-4 flex flex-col items-center text-center space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Crosshair className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold text-foreground/80 leading-tight">
                Expansion of core duties
              </p>
            </div>

            {/* Megatrend 5 */}
            <div className="bg-white border border-border rounded-2xl p-4 flex flex-col items-center text-center space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold text-foreground/80 leading-tight">
                Diversity and inclusion
              </p>
            </div>

            {/* Megatrend 6 */}
            <div className="bg-white border border-border rounded-2xl p-4 flex flex-col items-center text-center space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Users2 className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold text-foreground/80 leading-tight">
                Demographic shifts
              </p>
            </div>

            {/* Megatrend 7 */}
            <div className="bg-white border border-border rounded-2xl p-4 flex flex-col items-center text-center space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Cpu className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold text-foreground/80 leading-tight">
                Technological development
              </p>
            </div>

            {/* Megatrend 8 */}
            <div className="bg-white border border-border rounded-2xl p-4 flex flex-col items-center text-center space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Search className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold text-foreground/80 leading-tight">
                Recruitment and retention
              </p>
            </div>

            {/* Megatrend 9 */}
            <div className="bg-white border border-border rounded-2xl p-4 flex flex-col items-center text-center space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold text-foreground/80 leading-tight">
                Public trust and perceptions
              </p>
            </div>
          </div>

          <p className="text-xs text-foreground/75 leading-relaxed pt-2">
            These megatrends were identified in previous{" "}
            <span className="font-semibold text-[#728C28]">
              Workforce Insights Reports
            </span>{" "}
            and will continue to have longer term implications for workforce
            planning and development across the Public Safety and Government
            industry-sectors.
          </p>
        </div>

        {/* ── SECTION 4: SOURCES CONTAINER ── */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="font-extrabold text-xl text-foreground">Sources</h3>

          <div className="space-y-3 text-xs text-foreground/80 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#728C28] text-white flex items-center justify-center text-xs font-bold shrink-0">
                4
              </span>
              <p>
                Australian Government Department of Home Affairs,{" "}
                <span className="italic">
                  Organisational Resilience: Good Practice Guide
                </span>
                , Australian Government Department of Home Affairs, 2024,
                accessed 25 February 2026.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#728C28] text-white flex items-center justify-center text-xs font-bold shrink-0">
                5
              </span>
              <p>
                Productivity Commission,{" "}
                <span className="italic">
                  Five pillars of productivity inquiries – final reports
                </span>
                , Productivity Commission, 2025, accessed 13 February 2026.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#728C28] text-white flex items-center justify-center text-xs font-bold shrink-0">
                6
              </span>
              <p>
                Productivity Commission,{" "}
                <span className="italic">
                  Five pillars of productivity inquiries
                </span>
                , Productivity Commission, 2025, accessed 25 February 2026.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#728C28] text-white flex items-center justify-center text-xs font-bold shrink-0">
                7
              </span>
              <p>
                Australian Government Department of Finance,{" "}
                <span className="italic">
                  National framework for the assurance of artificial
                  intelligence in government
                </span>
                , Australian Government Department of Finance, 2024, accessed 25
                February 2026; Australian Government Digital Transformation
                Agency,{" "}
                <span className="italic">
                  Policy for the responsible use of AI in government
                </span>
                , Australian Government Digital Transformation Agency, 2025,
                accessed 25 February 2026.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#728C28] text-white flex items-center justify-center text-xs font-bold shrink-0">
                8
              </span>
              <p>
                Australian Security Intelligence Organisation (ASIO),{" "}
                <span className="italic">
                  Director-General's Annual Threat Assessment 2025
                </span>
                , ASIO, 2025, accessed 25 February 2026.
              </p>
            </div>
          </div>
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
