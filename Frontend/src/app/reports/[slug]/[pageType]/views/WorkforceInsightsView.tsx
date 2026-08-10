"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import { ArrowRight } from "lucide-react";
import Theme1InsightSubView from "./Theme1InsightSubView";

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

interface WorkforceInsightsViewProps {
  slug: string;
  report: Report;
  pageType?: string;
}

export default function WorkforceInsightsView({
  slug,
  report,
  pageType = "workforce_insights",
}: WorkforceInsightsViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showTheme1Overview, setShowTheme1Overview] = useState(false);
  const [showTheme2Overview, setShowTheme2Overview] = useState(false);

  // Determine selected insight from query parameter or pageType
  const queryInsight = searchParams.get("insight");
  let activeInsightId: number | null = null;

  if (queryInsight) {
    if (queryInsight.includes("insight1") || queryInsight === "1")
      activeInsightId = 1;
    else if (queryInsight.includes("insight2") || queryInsight === "2")
      activeInsightId = 2;
    else if (queryInsight.includes("insight3") || queryInsight === "3")
      activeInsightId = 3;
  } else if (pageType) {
    if (pageType.includes("theme1_insight1") || pageType.endsWith("_1"))
      activeInsightId = 1;
    else if (pageType.includes("theme1_insight2") || pageType.endsWith("_2"))
      activeInsightId = 2;
    else if (pageType.includes("theme1_insight3") || pageType.endsWith("_3"))
      activeInsightId = 3;
  }

  const handleNavigateInsight = (id: number) => {
    router.push(
      `/reports/${slug}/workforce_insights?insight=theme1-insight${id}`,
    );
  };

  const handleBackToOverview = () => {
    router.push(`/reports/${slug}/workforce_insights`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="workforce_insights"
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-5 flex-1">
        {activeInsightId ? (
          /* ── SUB VIEW: THEME 1 INSIGHT DETAIL ── */
          <Theme1InsightSubView
            slug={slug}
            insightId={activeInsightId}
            onNavigateInsight={handleNavigateInsight}
            onBackToOverview={handleBackToOverview}
          />
        ) : (
          /* ── MAIN WORKFORCE INSIGHTS OVERVIEW GRID ── */
          <>
            {/* Sub-Header Navigation Buttons (Only on overview page) */}
            <ReportNavButtons
              slug={slug}
              currentPage="workforce_insights"
              prev={{
                label: "Executive Summary",
                href: `/reports/${slug}/executive_summary`,
              }}
            />

            {/* Hero Card */}
            <div className="bg-white border border-gray200 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-lg-dark">
                  Workforce Insights
                </h1>
                <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                  This Report identifies the following themes and
                  industry-sector insights relating to Local Government. Select
                  any insight to open its detail page.
                </p>
              </div>

              {/* Right Hero Image */}
              <div className="lg:col-span-4 flex items-center justify-center lg:justify-end p-2">
                <img
                  src="/images/reports/workforce-insights.png"
                  alt="Workforce Insights"
                  className="h-auto max-h-36 max-w-full object-contain"
                />
              </div>
            </div>

            {/* ── SECTION 2: TWO THEMES GRID ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Theme 1 Container */}
              <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-LG-LIGHT p-6 space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#728C28] uppercase block">
                    THEME 1 · 3 INSIGHTS
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray800">
                    Local Government Specific Occupational Shortages
                  </h2>
                  <button
                    onClick={() => setShowTheme1Overview(!showTheme1Overview)}
                    className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors flex items-center gap-1"
                  >
                    Theme Overview {showTheme1Overview ? "▴" : "▾"}
                  </button>
                </div>

                {showTheme1Overview && (
                  <div className="text-xs text-gray600 leading-relaxed space-y-2 font-normal">
                    <p>
                      In support of both the 2024 Federal, State/Territory &amp;
                      Local Government Workforce Plan and the 2025 Local
                      Government Workforce Insights Report, local council
                      employers continue to emphasise the broad scope of
                      occupations employed in their workforce. Role expansion
                      has been a consistent theme, further examined through two
                      Parliamentary inquiries — which confirmed that the role of
                      local councils has expanded over time and that this
                      expansion is impacting both financial and workforce
                      sustainability.
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Insight 1 */}
                  <div
                    onClick={() =>
                      router.push(
                        `/reports/${slug}/workforce_insights?insight=theme1-insight1`,
                      )
                    }
                    className="bg-[#FAFAF0] border border-gray200 rounded-2xl p-6 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-[50px] font-bold text-notes/10 group-hover:text-[#728C28]/20 leading-none transition-colors">
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
                    <div className="w-9 h-9 rounded-full bg-[#85B810] group-hover:bg-[#77A60D] text-[#1B240E] flex items-center justify-center shrink-0 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Insight 2 */}
                  <div
                    onClick={() =>
                      router.push(
                        `/reports/${slug}/workforce_insights?insight=theme1-insight2`,
                      )
                    }
                    className="bg-[#FAFAF0] border border-gray200 rounded-2xl p-6 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-[50px] font-bold text-notes/10 group-hover:text-[#728C28]/20 leading-none transition-colors">
                        2
                      </span>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-[#728C28] block">
                          Theme One, Insight Two
                        </span>
                        <p className="text-xs text-gray600 leading-relaxed">
                          Skills needs are changing due to workforce pressures,
                          technological advances and shifting community
                          expectations.
                        </p>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#85B810] group-hover:bg-[#77A60D] text-[#1B240E] flex items-center justify-center shrink-0 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Insight 3 */}
                  <div
                    onClick={() =>
                      router.push(
                        `/reports/${slug}/workforce_insights?insight=theme1-insight3`,
                      )
                    }
                    className="bg-[#FAFAF0] border border-gray200 rounded-2xl p-6 flex items-center justify-between gap-4 cursor-pointer hover:border-[#728C28] hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-[50px] font-bold text-notes/10 group-hover:text-[#728C28]/20 leading-none transition-colors">
                        3
                      </span>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-[#728C28] block">
                          Theme One, Insight Three
                        </span>
                        <p className="text-xs text-gray600 leading-relaxed">
                          There are acute occupational shortages specific to the
                          Local Government industry-sector, particularly for
                          Emergency Management.
                        </p>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#85B810] group-hover:bg-[#77A60D] text-[#1B240E] flex items-center justify-center shrink-0 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme 2 Container */}
              <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-[#046D2A] p-6 space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#728C28] uppercase block">
                    THEME 2 · 4 INSIGHTS
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray800">
                    Access to VET Qualifications and Training Delivery Partners
                  </h2>
                  <button
                    onClick={() => setShowTheme2Overview(!showTheme2Overview)}
                    className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors flex items-center gap-1"
                  >
                    Theme Overview {showTheme2Overview ? "▴" : "▾"}
                  </button>
                </div>

                {showTheme2Overview && (
                  <div className="text-xs text-gray600 leading-relaxed space-y-2 font-normal">
                    <p>
                      Access to training has consistently been raised as a
                      challenge for local council employers in regional, rural
                      and remote locations — affirmed in the Interim Report into
                      Local Government Sustainability, PSA’s 2025 LG WIR and
                      ALGA’s 2022 Workforce Skills and Capability Survey. VET
                      was consistently identified as the most relevant pathway
                      for roles requiring technical expertise and compliance
                      assurance, such as Water Operator, Mechanic and Childcare
                      Educator. Access to VET Training: consultations for the
                      2024 Workforce Plan, the 2025 LG WIR and the Skills Audit
                      project re-affirmed the challenges relating to access to
                      qualifications and training delivery.
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Insight 1 */}
                  <div className="bg-[#FAFAF0] border border-gray200 rounded-2xl p-6 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="text-[50px] font-bold text-notes/10 leading-none">
                        1
                      </span>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-[#728C28] block">
                          Theme Two, Insight One
                        </span>
                        <p className="text-xs text-gray600 leading-relaxed">
                          Access to Technical and Further Education (TAFE) or
                          Registered Training Organisations (RTOs) in regional,
                          rural and remote locations is limited.
                        </p>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Insight 2 */}
                  <div className="bg-[#FAFAF0] border border-gray200 rounded-2xl p-6 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="text-[50px] font-bold text-notes/10 leading-none">
                        2
                      </span>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-[#728C28] block">
                          Theme Two, Insight Two
                        </span>
                        <p className="text-xs text-gray600 leading-relaxed">
                          Few TAFEs and RTOs are willing to travel to
                          geographically isolated locations.
                        </p>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Insight 3 */}
                  <div className="bg-[#FAFAF0] border border-gray200 rounded-2xl p-6 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="text-[50px] font-bold text-notes/10 leading-none">
                        3
                      </span>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-[#728C28] block">
                          Theme Two, Insight Three
                        </span>
                        <p className="text-xs text-gray600 leading-relaxed">
                          Local councils have limited training budgets.
                        </p>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#85B810] text-[#1B240E] flex items-center justify-center shrink-0">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Insight 4 */}
                  <div className="bg-[#FAFAF0] border border-gray200 rounded-2xl p-6 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="text-[50px] font-bold text-notes/10 leading-none">
                        4
                      </span>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-[#728C28] block">
                          Theme Two, Insight Four
                        </span>
                        <p className="text-xs text-gray600 leading-relaxed">
                          Course delivery is often not tailored to regional,
                          rural and remote areas.
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
          </>
        )}
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
