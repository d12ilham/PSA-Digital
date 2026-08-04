"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Download,
  Landmark,
  PieChart,
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

export default function IndustryOverviewView({
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
                  className="w-full text-left px-3 py-2 text-xs text-accent font-bold hover:bg-white/10 rounded-lg transition-colors"
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
            onClick={() => router.push(`/reports/${slug}/drivers_of_change`)}
            className="border border-border bg-white hover:bg-gray-50 text-foreground font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Drivers of Change
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/state_territory`)}
            className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            Next Section: State and Territory Workforce Profile{" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Hero Card */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#046D2A]">
                Local Government Industry-Sector Overview
              </h1>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-normal">
                Across Australia, there are 537 local councils. Of these local
                councils, around 55 per cent are located in regional, rural or
                remote areas with the other 45 per cent split across urban
                regions, urban fringe and urban areas. Local councils manage
                approximately one-third of Australia's public infrastructure
                assets, including roads, airports, facilities and other assets
                and make up 77 per cent of the national road network (by
                length). The public assets managed by local councils are valued
                at an estimated $643 billion.
              </p>
            </div>

            {/* Right Loop Graphic */}
            <div className="lg:col-span-4 flex items-center justify-center p-4">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shadow-xs">
                  <Landmark className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>

          {/* 4 Stat Boxes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <div className="bg-[#FAFBF6] border border-border/60 rounded-xl p-4 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-extrabold text-[#728C28] block leading-none">
                  537
                </span>
                <p className="text-xs text-foreground/75 leading-tight">
                  local councils across Australia
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#FAFBF6] border border-border/60 rounded-xl p-4 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <PieChart className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xl sm:text-2xl font-extrabold text-[#728C28] block leading-none">
                  55% / 45%
                </span>
                <p className="text-xs text-foreground/75 leading-tight">
                  55% regional, rural or remote
                  <br />
                  45% urban regions, urban fringe and urban areas
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#FAFBF6] border border-border/60 rounded-xl p-4 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-extrabold text-[#728C28] block leading-none">
                  218,000
                </span>
                <p className="text-xs text-foreground/75 leading-tight">
                  employees (estimated) in the Local Government workforce
                </p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-[#FAFBF6] border border-border/60 rounded-xl p-4 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-extrabold text-[#728C28] block leading-none">
                  400+
                </span>
                <p className="text-xs text-foreground/75 leading-tight">
                  different occupations employed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: TWO MAIN TOPIC CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-lg text-foreground">
                A multidisciplinary workforce
              </h3>
              <p className="text-xs text-foreground/80 leading-relaxed">
                The Local Government workforce is multidisciplinary, employing
                over an estimated 400 different occupations. Their workforces
                are managed individually at the local council level but are
                brought together and commonly represented through state and
                territory associations and the Australian Local Government
                Association (ALGA). It is estimated that the Local Government
                workforce is made up of approximately 218,000 employees. While
                employment projections have estimated significant growth in the
                Local Government workforce over the next ten years, successive
                Workforce Plans and Parliamentary Commissions of Inquiry have
                noted extensive challenges with recruitment and retention, and a
                significant expansion of roles and responsibilities for the
                Local Government industry-sector.
              </p>
            </div>

            <p className="text-xs text-foreground/50 italic leading-tight pt-2 border-t border-border/40">
              Sources (13–16): ALGA, Facts and Figures, 2025; ABS, Public Sector
              Employment and Earnings, 2025; PSA, Federal, State/Territory and
              Local Government Workforce Plan 2024; PSA, 2025 Local Government
              Workforce Insights Report; Parliament of Australia, Inquiry into
              Local Government Sustainability interim Report, 2025.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Landmark className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-lg text-foreground">
                Custodians of community infrastructure
              </h3>
              <p className="text-xs text-foreground/80 leading-relaxed">
                Local councils manage approximately one-third of Australia's
                public infrastructure assets – including roads, airports,
                facilities and other assets – and make up 77 per cent of the
                national road network by length. The public assets managed by
                local councils are valued at an estimated $643 billion.
              </p>
            </div>

            <p className="text-xs text-foreground/50 italic leading-tight pt-2 border-t border-border/40">
              Source: ALGA, 2024 National State of the Assets Report, 2024.
            </p>
          </div>
        </div>

        {/* ── SECTION 3: FEATURE CALLOUTS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Callout 1 */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-extrabold text-base text-foreground">
                State and territory Workforce Profile
              </h3>
              <p className="text-xs text-foreground/80 leading-relaxed">
                The Local Government workforce is spread across a diverse
                geographical area. The workforce profile consists of a balanced
                gender representation and high representation of First Nations
                employees (9.2 per cent of total national workforce) when
                compared to the total national population (3.8 per cent of total
                Australian population).
              </p>
            </div>

            <div>
              <button
                onClick={() => router.push(`/reports/${slug}/state_territory`)}
                className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                View the interactive state profile{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Callout 2 */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-extrabold text-base text-foreground">
                Key Occupational Shortages by state and territory
              </h3>
              <p className="text-xs text-foreground/80 leading-relaxed">
                In consultation with stakeholders for the Local Government
                Skills Audit and Uptake and Utility of the LGA Local Government
                Training Package project, each local council identified top
                occupational shortages affecting their workforces. In examining
                these shortages against the Jobs and Skills Australia
                Occupational Shortage List, several Local Government specific
                shortages have been identified.
              </p>
            </div>

            <div>
              <button
                onClick={() => router.push(`/reports/${slug}/industry_profile`)}
                className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                View the Industry Profile data{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── SECTION 4: SOURCES CONTAINER ── */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="font-extrabold text-xl text-foreground">Sources</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-foreground/80 leading-relaxed">
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#728C28] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  9
                </span>
                <p>
                  ALGA, Facts and Figures, ALGA, 2025, accessed 24 September
                  2025.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#728C28] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  11
                </span>
                <p>
                  ALGA, 2024 National State of the Assets Report, ALGA, 2024,
                  pages 4, 5 and 8, accessed 11 February 2026.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#728C28] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  13
                </span>
                <p>
                  ALGA, Facts and Figures, ALGA, 2025, accessed 24 September
                  2025.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#728C28] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  15
                </span>
                <p>
                  Public Skills Australia (PSA), Federal, State/Territory and
                  Local Government Workforce Plan 2024, PSA, 2024, accessed 11
                  February 2026; PSA, 2025 Local Government Workforce Insights
                  Report, PSA, 2025, accessed 11 February 2026.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#728C28] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  17
                </span>
                <p>
                  ABS, Estimates of Aboriginal and Torres Strait Islander
                  Australians, ABS, 2021, accessed 12 February 2026; ALGA, 2022
                  Local Government Workforce Skills and Capability Survey, ALGA,
                  2022, page 39, accessed 11 February 2026.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#728C28] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  10
                </span>
                <p>
                  ALGA, Facts and Figures, ALGA, 2025, accessed 24 September
                  2025.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#728C28] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  12
                </span>
                <p>
                  ALGA, 2024 National State of the Assets Report, ALGA, 2024,
                  pages 4, 5 and 8, accessed 11 February 2026.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#728C28] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  14
                </span>
                <p>
                  Australian Bureau of Statistics (ABS), Public Sector
                  Employment and Earnings, ABS, 2025, accessed 11 February 2026.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#728C28] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  16
                </span>
                <p>
                  Parliament of Australia, Inquiry into Local Government
                  Sustainability Interim Report, Parliament of Australia, 2025,
                  accessed 11 February 2026.
                </p>
              </div>
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
