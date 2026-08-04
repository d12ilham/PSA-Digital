"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Globe,
  Lightbulb,
  Search,
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

export default function WorkforceInsightsView({
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
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="workforce_insights"
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <ReportNavButtons
          prev={{
            label: "Industry Profile",
            href: `/reports/${slug}/industry_profile`,
          }}
          next={{
            label: "2026 Proposed Workforce Strategies",
            href: `/reports/${slug}/workforce_strategies`,
          }}
        />

        {/* Hero Card */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray800">
              Workforce Insights
            </h1>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
              This Report identifies the following themes and industry-sector
              insights relating to Local Government. Select any insight to open
              its detail page.
            </p>
          </div>

          {/* Right Icon Illustration */}
          <div className="lg:col-span-4 flex items-center justify-center p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center">
                <Globe className="h-7 w-7" />
              </div>
              <div className="w-14 h-14 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center">
                <Search className="h-7 w-7" />
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: TWO THEMES GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Theme 1 Container */}
          <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-LG-LIGHT p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#728C28] uppercase block">
                THEME 1 · 3 INSIGHTS
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray800">
                Local Government Specific Occupational Shortages
              </h2>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors"
              >
                Theme Overview ▾
              </button>
            </div>

            <div className="space-y-4">
              {/* Insight 1 */}
              <div
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className="bg-[#FAFBF6] border border-gray200 rounded-2xl p-5 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold text-gray800/20 leading-none">
                    1
                  </span>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#728C28] block">
                      Theme One, Insight One
                    </span>
                    <p className="text-xs text-gray600 leading-relaxed">
                      Local Government employers require a diverse range of
                      skills to maintain the breadth of responsibilities
                      undertaken by local councils.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Insight 2 */}
              <div
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className="bg-[#FAFBF6] border border-gray200 rounded-2xl p-5 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold text-gray800/20 leading-none">
                    2
                  </span>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#728C28] block">
                      Theme One, Insight Two
                    </span>
                    <p className="text-xs text-gray600 leading-relaxed">
                      Skills needs are changing due to workforce pressures,
                      technological advancements and shifting community
                      expectations.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Insight 3 */}
              <div
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className="bg-[#FAFBF6] border border-gray200 rounded-2xl p-5 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold text-gray800/20 leading-none">
                    3
                  </span>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#728C28] block">
                      Theme One, Insight Three
                    </span>
                    <p className="text-xs text-gray600 leading-relaxed">
                      While Local Government employers are experiencing some
                      shortages in identified national shortage occupations,
                      several Local Government specific shortages were also
                      identified.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Theme 2 Container */}
          <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-[#046D2A] p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#728C28] uppercase block">
                THEME 2 · 4 INSIGHTS
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray800">
                Access to VET Qualifications and Training Delivery Partners
              </h2>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors"
              >
                Theme Overview ▾
              </button>
            </div>

            <div className="space-y-4">
              {/* Insight 1 */}
              <div
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className="bg-[#FAFBF6] border border-gray200 rounded-2xl p-5 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold text-gray800/20 leading-none">
                    1
                  </span>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#728C28] block">
                      Theme Two, Insight One
                    </span>
                    <p className="text-xs text-gray600 leading-relaxed">
                      Access to TAFE or RTOs in regional, rural and remote
                      locations is limited.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Insight 2 */}
              <div
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className="bg-[#FAFBF6] border border-gray200 rounded-2xl p-5 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold text-gray800/20 leading-none">
                    2
                  </span>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#728C28] block">
                      Theme Two, Insight Two
                    </span>
                    <p className="text-xs text-gray600 leading-relaxed">
                      Few TAFEs and RTOs are willing to travel to geographically
                      isolated locations to deliver required qualifications.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Insight 3 */}
              <div
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className="bg-[#FAFBF6] border border-gray200 rounded-2xl p-5 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold text-gray800/20 leading-none">
                    3
                  </span>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#728C28] block">
                      Theme Two, Insight Three
                    </span>
                    <p className="text-xs text-gray600 leading-relaxed">
                      Local councils have limited training budgets to support
                      financial impost of course enrolment as well as travel to
                      and from training.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Insight 4 */}
              <div
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className="bg-[#FAFBF6] border border-gray200 rounded-2xl p-5 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold text-gray800/20 leading-none">
                    4
                  </span>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#728C28] block">
                      Theme Two, Insight Four
                    </span>
                    <p className="text-xs text-gray600 leading-relaxed">
                      Course delivery is often not tailored to suit those from
                      regional, rural or remote locations.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
