"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

export default function ProposedStrategies2026View({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();
  const [strategy1Open, setStrategy1Open] = useState(false);
  const [strategy2Open, setStrategy2Open] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="workforce_strategies"
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => router.push(`/reports/${slug}/workforce_insights`)}
            className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray200 text-[#728C28] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Workforce Insights
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/existing_strategies`)}
            className="bg-[#8AC900] hover:bg-[#77A60D] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            Next Section: Update on 2025 Strategies{" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ── HERO BANNER CARD WITH GRAPHIC ── */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <span className="text-xs font-semibold text-notes uppercase tracking-wider block">
              THE CULMINATION OF THIS REPORT
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#046D2A] leading-tight">
              2026 Proposed Local Government Workforce Strategies
            </h1>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal w-full lg:w-5/6">
              Public Skills Australia proposes the following strategies aligned
              to the workforce insights identified, to support the Local
              Government industry-sector. Select a strategy to explore its
              detail.
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto flex justify-center lg:justify-end">
            <img
              src="/images/hero-graphic-2026.png"
              alt="2026 Proposed Strategies Diagram"
              className="w-full max-w-[340px] sm:max-w-[380px] object-contain"
            />
          </div>
        </div>

        {/* ── TWO COLLAPSIBLE STRATEGY CARDS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Strategy 1 */}
          <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-[#9CAA54] p-6 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <span className="bg-[#9CAA54] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                STRATEGY 1
              </span>
              <button
                onClick={() => setStrategy1Open(!strategy1Open)}
                className="bg-[#8AC900] hover:bg-[#77A60D] text-[#1B240E] text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors flex items-center gap-1"
              >
                {strategy1Open ? "Close ▴" : "Open ▾"}
              </button>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray800 leading-snug">
              Map Local Government occupational shortages to relevant VET
              training products
            </h2>

            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                <span className="font-bold text-gray800">Objective:</span>{" "}
                Identify and map the use of relevant qualifications (beyond the
                LGA Local Government Training Package) to support VET training
                for key occupational shortages in local councils.
              </p>

              <div className="flex flex-col items-start gap-2 pt-1">
                <span className="bg-[#F0F5DF] text-notes text-xs font-bold px-3.5 py-1.5 rounded-full">
                  Workforce Insight: LG Specific Occupational Shortages
                </span>
                <span className="bg-[#F0F5DF] text-notes text-xs font-bold px-3.5 py-1.5 rounded-full">
                  12-month project
                </span>
              </div>
            </div>

            {/* EXPANDED CONTENT */}
            {strategy1Open && (
              <div className="pt-4 border-t border-gray200 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray800">
                    JSC Function:
                  </h3>
                  <p className="text-xs sm:text-sm text-gray600">
                    Implementation, Promotion and Monitoring.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray800">Approach:</h3>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    Map the most challenging occupational shortages (as
                    identified through the JSA Occupation Shortage List and the
                    Local Government Skills Audit) to relevant qualifications
                    contained in both the LGA Local Government Training Package
                    and other Training Packages, as well as the RTOs that
                    deliver them.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray800">
                    Deliverable:
                  </h3>
                  <p className="text-xs sm:text-sm text-gray600">
                    Occupational Shortage Map.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray800">
                    Anticipated timing:
                  </h3>
                  <p className="text-xs sm:text-sm text-gray600">
                    12-month project.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray800">Impact:</h3>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    An Occupational Shortage Map connecting the most challenging
                    shortages to the qualifications and RTOs that can address
                    them — enabling the sector to meet expanding and increasing
                    service delivery requirements.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray800">
                    Key stakeholders:
                  </h3>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    ALGA · state/territory LG Associations · LG Workforce
                    Development Group · RTOs · STTAs/SROs · state/territory LG
                    Departments.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Strategy 2 */}
          <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-[#046D2A] p-6 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <span className="bg-[#046D2A] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                STRATEGY 2
              </span>
              <button
                onClick={() => setStrategy2Open(!strategy2Open)}
                className="bg-[#8AC900] hover:bg-[#77A60D] text-[#1B240E] text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors flex items-center gap-1"
              >
                {strategy2Open ? "Close ▴" : "Open ▾"}
              </button>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray800 leading-snug">
              Facilitate a roundtable on whole-of-VET-system responses to Local
              Government challenges
            </h2>

            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                <span className="font-bold text-gray800">Objective:</span>{" "}
                Promote the Local Government industry-sector as a sustainable
                and skilled career pathway to enhance service delivery to
                communities.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-[#F0F5DF] text-notes text-xs font-bold px-3.5 py-1.5 rounded-full">
                  Workforce Insight: Access to VET Qualifications and Training
                  Delivery Partners
                </span>
              </div>
            </div>

            {/* EXPANDED CONTENT */}
            {strategy2Open && (
              <div className="pt-4 border-t border-gray200 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray800">
                    JSC Function:
                  </h3>
                  <p className="text-xs sm:text-sm text-gray600">
                    Industry Stewardship, Training Product Development
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray800">
                    Approach – Part A:
                  </h3>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    Bring together state and territory decision makers,
                    STTAs/SROs, Local Government Partners, TAFEs and RTOs to
                    facilitate conversations about whole of VET system responses
                    to Local Government industry-sector challenges. This should
                    include discussions about training delivery, funding of
                    training for occupations in shortage in local councils and
                    could see potential agreements between local councils and
                    RTOs regarding training delivery.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray800">
                    Approach – Part B (optional):
                  </h3>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    If gaps in specialist local council skills are identified in
                    Strategy 1 (Map Local Government occupational shortages to
                    relevant VET training products), an evaluation of the
                    current LGA Local Government Training Package may be
                    undertaken, with a focus on the number of qualifications,
                    training pathways, design of specialisation areas and the
                    potential utility of skill sets.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray800">
                    Deliverable:
                  </h3>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    Part A: Roundtable discussions and summary report of
                    discussions.
                    <br />
                    Part B: Reviewed training product/s
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray800">
                    Key Stakeholders:
                  </h3>
                  <ul className="space-y-1 text-xs sm:text-sm text-gray600 pl-4 list-disc">
                    <li>Australian Local Government Association</li>
                    <li>State/Territory Local Government Associations</li>
                    <li>Local Government Workforce Development Group</li>
                    <li>Jobs and Skills Councils &gt; RTOs &gt; STTA/SROs</li>
                    <li>State/Territory Local Government Departments</li>
                  </ul>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray800">Impact:</h3>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    Support the Local Government industry-sector by facilitating
                    access to whole of VET sector stakeholders.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
