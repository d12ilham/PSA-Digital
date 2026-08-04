"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Download,
  Lightbulb,
  RefreshCw,
  Wrench,
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

export default function ExecutiveSummaryView({
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
              className="text-accent font-bold cursor-pointer"
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
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => router.push(`/reports/${slug}/about`)}
            className="border border-border bg-white hover:bg-gray-50 text-foreground font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to About Public Skills
            Australia
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/introduction`)}
            className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            Next Section: Introduction <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Hero Card */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#046D2A]">
              Executive Summary
            </h1>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-normal">
              Public Skills Australia's 2026 Local Government Workforce Insights
              Report considers the wider operational contexts impacting Public
              Safety and Government industry-sectors. It identifies four drivers
              of change that will impact workforce planning in the short to
              medium term, aligned with the nine megatrends detailed in previous{" "}
              <span className="font-semibold text-[#728C28]">
                Workforce Insights Reports
              </span>
              , that remain relevant to long term workforce trends.
            </p>
          </div>

          {/* Right Flow Icons Diagram */}
          <div className="lg:col-span-4 flex items-center justify-center gap-3 bg-[#F2F3EC] p-4 rounded-2xl border border-border/50">
            <div className="w-10 h-10 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
              <RefreshCw className="h-5 w-5" />
            </div>
            <span className="text-foreground/30 font-bold text-xs">──</span>
            <div className="w-10 h-10 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
              <Lightbulb className="h-5 w-5" />
            </div>
            <span className="text-foreground/30 font-bold text-xs">──</span>
            <div className="w-10 h-10 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
              <Wrench className="h-5 w-5" />
            </div>
            <span className="text-foreground/30 font-bold text-xs">──</span>
            <div className="w-10 h-10 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Section Banner 1: Drivers of Change */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
              <RefreshCw className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-foreground">
                Drivers of Change
              </h3>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Four drivers of change impacting workforce planning in the short
                to medium term, aligned with the nine megatrends detailed in
                previous{" "}
                <span className="font-semibold text-[#728C28]">
                  Workforce Insights Reports
                </span>
                .
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/reports/${slug}/drivers_of_change`)}
            className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            Present Drivers of Change <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Section Banner 2 & Two Themes: Two Themes, Seven Workforce Insights */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-border p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Lightbulb className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-foreground">
                  Two Themes, Seven Workforce Insights
                </h3>
                <p className="text-xs text-foreground/75 leading-relaxed max-w-3xl">
                  This Report identifies seven insights within the Local
                  Government industry-sector, across two themes (Local
                  Government Specific Occupational Shortages and Access to
                  Vocational Education and Training (VET) Qualifications and
                  Training Delivery Partners).
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push(`/reports/${slug}/workforce_insights`)}
              className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              Present Workforce Insights <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Two Themes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Theme 1 Container */}
            <div className="bg-white rounded-2xl border border-border border-t-4 border-t-[#9CAA54] p-6 shadow-2xs space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#728C28] uppercase block">
                  THEME 1 · 3 INSIGHTS
                </span>
                <h3 className="text-xl font-extrabold text-foreground">
                  Local Government Specific Occupational Shortages
                </h3>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#85B810] text-[#1B240E] text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer hover:bg-[#77A60D] transition-colors"
                >
                  Theme Overview ▾
                </button>
              </div>

              <div className="space-y-3">
                {/* Insight 1 */}
                <div
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#F9FAF5] border border-border/60 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-extrabold text-foreground/20 leading-none">
                      1
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme One, Insight One
                      </span>
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        Local Government employers require a diverse range of
                        skills to maintain the breadth of responsibilities
                        undertaken by local councils.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Insight 2 */}
                <div
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#F9FAF5] border border-border/60 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-extrabold text-foreground/20 leading-none">
                      2
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme One, Insight Two
                      </span>
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        Skills needs are changing due to workforce pressures,
                        technological advancements and shifting community
                        expectations.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Insight 3 */}
                <div
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#F9FAF5] border border-border/60 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-extrabold text-foreground/20 leading-none">
                      3
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme One, Insight Three
                      </span>
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        While Local Government employers are experiencing some
                        shortages in identified national shortage occupations,
                        several Local Government specific shortages were also
                        identified.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Theme 2 Container */}
            <div className="bg-white rounded-2xl border border-border border-t-4 border-t-[#046D2A] p-6 shadow-2xs space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#728C28] uppercase block">
                  THEME 2 · 4 INSIGHTS
                </span>
                <h3 className="text-xl font-extrabold text-foreground">
                  Access to VET Qualifications and Training Delivery Partners
                </h3>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#85B810] text-[#1B240E] text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer hover:bg-[#77A60D] transition-colors"
                >
                  Theme Overview ▾
                </button>
              </div>

              <div className="space-y-3">
                {/* Insight 1 */}
                <div
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#F9FAF5] border border-border/60 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-extrabold text-foreground/20 leading-none">
                      1
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme Two, Insight One
                      </span>
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        Access to TAFE or RTOs in regional, rural and remote
                        locations is limited.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Insight 2 */}
                <div
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#F9FAF5] border border-border/60 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-extrabold text-foreground/20 leading-none">
                      2
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme Two, Insight Two
                      </span>
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        Few TAFEs and RTOs are willing to travel to
                        geographically isolated locations to deliver required
                        qualifications.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Insight 3 */}
                <div
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#F9FAF5] border border-border/60 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-extrabold text-foreground/20 leading-none">
                      3
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme Two, Insight Three
                      </span>
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        Local councils have limited training budgets to support
                        financial impost of course enrolment as well as travel
                        to and from training.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Insight 4 */}
                <div
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#F9FAF5] border border-border/60 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-extrabold text-foreground/20 leading-none">
                      4
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme Two, Insight Four
                      </span>
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        Course delivery is often not tailored to suit those from
                        regional, rural or remote locations.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Banner 3 & Two Strategy Cards: 2026 Proposed Strategies */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-border p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                <Wrench className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-foreground">
                  2026 Proposed Strategies
                </h3>
                <p className="text-xs text-foreground/75 leading-relaxed">
                  The following strategies have been developed to support
                  efforts to address challenges identified through the above
                  industry insights.
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                router.push(`/reports/${slug}/workforce_strategies`)
              }
              className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              Present 2026 Strategies <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Two Strategy Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strategy Card 1 */}
            <div className="bg-white rounded-2xl border border-border border-t-4 border-t-[#9CAA54] p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="bg-[#85B810] text-[#1B240E] text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                  STRATEGY 1
                </span>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_strategies`)
                  }
                  className="bg-[#85B810] text-[#1B240E] text-xs font-bold px-3.5 py-1 rounded-full cursor-pointer hover:bg-[#77A60D] transition-colors"
                >
                  Open ▾
                </button>
              </div>
              <h4 className="font-extrabold text-base text-foreground leading-snug">
                Map Local Government occupational shortages to relevant VET
                training products
              </h4>
              <p className="text-xs text-foreground/80 leading-relaxed">
                Identify and map the use of relevant qualifications — beyond the
                LGA Local Government Training Package — to support VET training
                for key occupational shortages in Local Government.
              </p>
            </div>

            {/* Strategy Card 2 */}
            <div className="bg-white rounded-2xl border border-border border-t-4 border-t-[#046D2A] p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="bg-[#046D2A] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                  STRATEGY 2
                </span>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_strategies`)
                  }
                  className="bg-[#85B810] text-[#1B240E] text-xs font-bold px-3.5 py-1 rounded-full cursor-pointer hover:bg-[#77A60D] transition-colors"
                >
                  Open ▾
                </button>
              </div>
              <h4 className="font-extrabold text-base text-foreground leading-snug">
                Facilitate a roundtable on whole of VET system responses to
                Local Government challenges
              </h4>
              <p className="text-xs text-foreground/80 leading-relaxed">
                Promote the Local Government industry-sector as a sustainable
                and skilled career pathway to enhance service delivery to
                communities.
              </p>
            </div>
          </div>
        </div>

        {/* Section Banner 4: 2027 and Beyond */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-foreground">
                2027 and Beyond
              </h3>
              <p className="text-xs text-foreground/75 leading-relaxed max-w-3xl">
                This Report concludes by looking towards the 2027{" "}
                <span className="font-semibold text-[#728C28]">
                  Workforce Insights Reports
                </span>{" "}
                and beyond. Future work will firstly focus on broader
                priorities, including the participation of First Nations people,
                women and other genders in the Public Safety and Government
                workforces, in addition to examining the implications of
                artificial intelligence (AI) and digital transformation.
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/reports/${slug}/looking_forward`)}
            className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            View 2027 and Beyond <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Supporting Sections Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <span className="font-extrabold text-sm text-foreground mr-2">
            Supporting Sections:
          </span>
          <button
            onClick={() => router.push(`/reports/${slug}/existing_strategies`)}
            className="border border-border bg-white hover:bg-gray-50 text-foreground font-semibold text-xs px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            Update on 2025 Strategies
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/existing_strategies`)}
            className="border border-border bg-white hover:bg-gray-50 text-foreground font-semibold text-xs px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            Existing Industry-Sector Strategies
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/state_territory`)}
            className="border border-border bg-white hover:bg-gray-50 text-foreground font-semibold text-xs px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            State and Territory Workforce Profile
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/industry_profile`)}
            className="border border-border bg-white hover:bg-gray-50 text-foreground font-semibold text-xs px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            Industry Profile
          </button>
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
