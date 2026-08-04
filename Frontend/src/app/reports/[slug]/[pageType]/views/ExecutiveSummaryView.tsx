"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
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
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="executive_summary"
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <ReportNavButtons
          prev={{
            label: "About Public Skills Australia",
            href: `/reports/${slug}/about`,
          }}
          next={{
            label: "Introduction",
            href: `/reports/${slug}/introduction`,
          }}
        />

        {/* Hero Card */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-lg-dark">
              Executive Summary
            </h1>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
              Public Skills Australia's 2026 Local Government Workforce Insights
              Report considers the wider operational contexts impacting Public
              Safety and Government industry-sectors. It identifies four drivers
              of change that will impact workforce planning in the short to
              medium term, aligned with the nine megatrends detailed in previous{" "}
              <span className="font-semibold text-lg-dark">
                Workforce Insights Reports
              </span>
              , that remain relevant to long term workforce trends.
            </p>
          </div>

          {/* Right Flow Image Replacement */}
          <div className="lg:col-span-5 flex items-center justify-end p-2">
            <img
              src="/images/reports/executive-summary-process.png"
              alt="Executive Summary Process Flow"
              className="h-auto max-h-20 object-contain"
            />
          </div>
        </div>

        {/* Section Banner 1: Drivers of Change */}
        <div className="bg-white rounded-2xl border border-gray200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E5E8DA] text-notes flex items-center justify-center shrink-0">
              <RefreshCw className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray800">
                Drivers of Change
              </h3>
              <p className="text-xs text-gray600 leading-relaxed">
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
            className="bg-[#8AC900] hover:bg-[#78B300] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            Present Drivers of Change <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Section 2: Two Themes, Seven Workforce Insights */}
        <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E5E8DA] text-notes flex items-center justify-center shrink-0">
                <Lightbulb className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray800">
                  Two Themes, Seven Workforce Insights
                </h3>
                <p className="text-xs text-gray600 leading-relaxed max-w-3xl">
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
              className="bg-[#8AC900] hover:bg-[#78B300] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              Present Workforce Insights <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Two Themes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Theme 1 Container */}
            <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-LG-LIGHT p-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#728C28] uppercase block">
                  THEME 1 · 3 INSIGHTS
                </span>
                <h3 className="text-xl font-bold text-gray800">
                  Local Government Specific Occupational Shortages
                </h3>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#8AC900] hover:bg-[#78B300] text-gray800 text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors"
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
                  className="bg-[#FAFAF0] border border-gray200 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-gray800/20 leading-none">
                      1
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme One, Insight One
                      </span>
                      <p className="text-xs text-gray600 leading-relaxed">
                        Local Government employers require a diverse range of
                        skills to maintain the breadth of responsibilities
                        undertaken by local councils.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#8AC900] text-gray800 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Insight 2 */}
                <div
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#FAFAF0] border border-gray200 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-gray800/20 leading-none">
                      2
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme One, Insight Two
                      </span>
                      <p className="text-xs text-gray600 leading-relaxed">
                        Skills needs are changing due to workforce pressures,
                        technological advancements and shifting community
                        expectations.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#8AC900] text-gray800 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Insight 3 */}
                <div
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#FAFAF0] border border-gray200 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-gray800/20 leading-none">
                      3
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
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
                  <div className="w-8 h-8 rounded-full bg-[#8AC900] text-gray800 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Theme 2 Container */}
            <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-lg-dark p-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#728C28] uppercase block">
                  THEME 2 · 4 INSIGHTS
                </span>
                <h3 className="text-xl font-bold text-gray800">
                  Access to VET Qualifications and Training Delivery Partners
                </h3>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#8AC900] hover:bg-[#78B300] text-gray800 text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors"
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
                  className="bg-[#FAFAF0] border border-gray200 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-gray800/20 leading-none">
                      1
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme Two, Insight One
                      </span>
                      <p className="text-xs text-gray600 leading-relaxed">
                        Access to TAFE or RTOs in regional, rural and remote
                        locations is limited.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#8AC900] text-gray800 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Insight 2 */}
                <div
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#FAFAF0] border border-gray200 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-gray800/20 leading-none">
                      2
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme Two, Insight Two
                      </span>
                      <p className="text-xs text-gray600 leading-relaxed">
                        Few TAFEs and RTOs are willing to travel to
                        geographically isolated locations to deliver required
                        qualifications.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#8AC900] text-gray800 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Insight 3 */}
                <div
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#FAFAF0] border border-gray200 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-gray800/20 leading-none">
                      3
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme Two, Insight Three
                      </span>
                      <p className="text-xs text-gray600 leading-relaxed">
                        Local councils have limited training budgets to support
                        financial impost of course enrolment as well as travel
                        to and from training.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#8AC900] text-gray800 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Insight 4 */}
                <div
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="bg-[#FAFAF0] border border-gray200 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-gray800/20 leading-none">
                      4
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme Two, Insight Four
                      </span>
                      <p className="text-xs text-gray600 leading-relaxed">
                        Course delivery is often not tailored to suit those from
                        regional, rural or remote locations.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#8AC900] text-gray800 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: 2026 Proposed Strategies */}
        <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E5E8DA] text-notes flex items-center justify-center shrink-0">
                <Wrench className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray800">
                  2026 Proposed Strategies
                </h3>
                <p className="text-xs text-gray600 leading-relaxed">
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
              className="bg-[#8AC900] hover:bg-[#78B300] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              Present 2026 Strategies <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Two Strategy Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strategy Card 1 */}
            <div className="rounded-2xl border border-gray200 border-t-12 border-t-LG-LIGHT p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="bg-LG-LIGHT text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  STRATEGY 1
                </span>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_strategies`)
                  }
                  className="bg-[#8AC900] hover:bg-[#78B300] text-gray800 text-xs font-bold px-3.5 py-1 rounded-full cursor-pointer transition-colors"
                >
                  Open ▾
                </button>
              </div>
              <h4 className="font-bold text-base text-gray800 leading-snug">
                Map Local Government occupational shortages to relevant VET
                training products
              </h4>
              <p className="text-xs text-gray600 leading-relaxed">
                Identify and map the use of relevant qualifications — beyond the
                LGA Local Government Training Package — to support VET training
                for key occupational shortages in Local Government.
              </p>
            </div>

            {/* Strategy Card 2 */}
            <div className="rounded-2xl border border-gray200 border-t-12 border-t-[#046D2A] p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="bg-lg-dark text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  STRATEGY 2
                </span>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_strategies`)
                  }
                  className="bg-[#8AC900] hover:bg-[#78B300] text-gray800 text-xs font-bold px-3.5 py-1 rounded-full cursor-pointer transition-colors"
                >
                  Open ▾
                </button>
              </div>
              <h4 className="font-bold text-base text-gray800 leading-snug">
                Facilitate a roundtable on whole of VET system responses to
                Local Government challenges
              </h4>
              <p className="text-xs text-gray600 leading-relaxed">
                Promote the Local Government industry-sector as a sustainable
                and skilled career pathway to enhance service delivery to
                communities.
              </p>
            </div>
          </div>
        </div>

        {/* Section Banner 4: 2027 and Beyond */}
        <div className="bg-white rounded-2xl border border-gray200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E5E8DA] text-notes flex items-center justify-center shrink-0">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-base text-gray800">
                2027 and Beyond
              </h3>
              <p className="text-xs text-gray600 leading-relaxed max-w-3xl">
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
            className="bg-[#8AC900] hover:bg-[#78B300] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            View 2027 and Beyond <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Supporting Sections Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <span className="font-semibold text-2xl text-gray800 mr-2">
            Supporting Sections:
          </span>
          <button
            onClick={() => router.push(`/reports/${slug}/existing_strategies`)}
            className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray-50 text-notes font-semibold text-xs px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            Update on 2025 Strategies
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/existing_strategies`)}
            className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray-50 text-notes font-semibold text-xs px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            Existing Industry-Sector Strategies
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/state_territory`)}
            className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray-50 text-notes font-semibold text-xs px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            State and Territory Workforce Profile
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/industry_profile`)}
            className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray-50 text-notes font-semibold text-xs px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            Industry Profile
          </button>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
