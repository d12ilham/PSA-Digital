"use client";

import React, { useState } from "react";
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
  const [showTheme1Overview, setShowTheme1Overview] = useState(false);
  const [showTheme2Overview, setShowTheme2Overview] = useState(false);
  const [strategy1Open, setStrategy1Open] = useState(false);
  const [strategy2Open, setStrategy2Open] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="executive_summary"
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="animate-fade-in max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <ReportNavButtons slug={slug} currentPage="executive_summary" />

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
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E5E8DA] text-notes flex items-center justify-center shrink-0">
              <img
                src="/images/drivers-of-change-icon.svg"
                alt="Executive Summary Process Flow"
                className="h-7 object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray800 pb-2">
                Drivers of Change
              </h3>
              <p className="text-xs text-gray600 leading-relaxed w-2/3">
                It identifies four drivers of change that will impact workforce
                planning in the short to medium term, aligned with the nine
                megatrends detailed in previous Workforce Insights Reports, that
                remain relevant to long term workforce trends.
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
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E5E8DA] text-notes flex items-center justify-center shrink-0">
                <img
                  src="/images/work-force.svg"
                  alt="Executive Summary Process Flow"
                  className="h-7 object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray800 pb-2">
                  Two Themes, Seven Workforce Insights
                </h3>
                <p className="text-xs text-gray600 leading-relaxed max-w-3xl">
                  This Report identifies seven insights within the Local
                  Government industry-sector, across two themes (Local
                  Government Specific Occupational Shortages and Access to
                  Vocational Education and Training (VET) Qualifications and
                  Training Delivery Partners):
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
                  onClick={() => setShowTheme1Overview(!showTheme1Overview)}
                  className="bg-[#8AC900] hover:bg-[#78B300] text-gray800 text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors flex items-center gap-1"
                >
                  Theme Overview {showTheme1Overview ? "▴" : "▾"}
                </button>
              </div>

              {showTheme1Overview && (
                <div className="animate-expand-down text-xs text-gray600 leading-relaxed space-y-2 font-normal">
                  <p>
                    In support of both the 2024 Federal, State/Territory &amp;
                    Local Government Workforce Plan and the 2025 Local
                    Government Workforce Insights Report, local council
                    employers continue to emphasise the broad scope of
                    occupations employed in their workforce. Role expansion has
                    been a consistent theme, further examined through two
                    Parliamentary inquiries — which confirmed that the role of
                    local councils has expanded over time and that this
                    expansion is impacting both financial and workforce
                    sustainability.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {/* Insight 1 */}
                <div className="bg-[#FAFAF0] border border-gray200 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-[#728C28] transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-[50px] font-bold text-notes/10 leading-none">
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
                  {/* <div className="w-8 h-8 rounded-full bg-[#8AC900] text-gray800 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div> */}
                </div>

                {/* Insight 2 */}
                <div className="bg-[#FAFAF0] border border-gray200 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-[#728C28] transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-[50px] font-bold text-notes/10 leading-none">
                      2
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme One, Insight Two
                      </span>
                      <p className="text-xs text-gray600 leading-relaxed">
                        Skills needs are changing due to workforce pressures,
                        technological advances and shifting community
                        expectations.
                      </p>
                    </div>
                  </div>
                  {/* <div className="w-8 h-8 rounded-full bg-[#8AC900] text-gray800 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div> */}
                </div>

                {/* Insight 3 */}
                <div className="bg-[#FAFAF0] border border-gray200 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-[#728C28] transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-[50px] font-bold text-notes/10 leading-none">
                      3
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme One, Insight Three
                      </span>
                      <p className="text-xs text-gray600 leading-relaxed">
                        There are acute occupational shortages specific to the
                        Local Government industry-sector, particularly for
                        Emergency Management.
                      </p>
                    </div>
                  </div>
                  {/* <div className="w-8 h-8 rounded-full bg-[#8AC900] text-gray800 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div> */}
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
                  onClick={() => setShowTheme2Overview(!showTheme2Overview)}
                  className="bg-[#8AC900] hover:bg-[#78B300] text-gray800 text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors flex items-center gap-1"
                >
                  Theme Overview {showTheme2Overview ? "▴" : "▾"}
                </button>
              </div>

              {showTheme2Overview && (
                <div className="animate-expand-down text-xs text-gray600 leading-relaxed space-y-2 font-normal">
                  <p>
                    Access to training has consistently been raised as a
                    challenge for local council employers in regional, rural and
                    remote locations — affirmed in the Interim Report into Local
                    Government Sustainability, PSA’s 2025 LG WIR and ALGA’s 2022
                    Workforce Skills and Capability Survey. VET was consistently
                    identified as the most relevant pathway for roles requiring
                    technical expertise and compliance assurance, such as Water
                    Operator, Mechanic and Childcare Educator. Access to VET
                    Training: consultations for the 2024 Workforce Plan, the
                    2025 LG WIR and the Skills Audit project re-affirmed the
                    challenges relating to access to qualifications and training
                    delivery.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {/* Insight 1 */}
                <div className="bg-[#FAFAF0] border border-gray200 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-[#728C28] transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-[50px] font-bold text-notes/10 leading-none">
                      1
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme Two, Insight One
                      </span>
                      <p className="text-xs text-gray600 leading-relaxed">
                        Access to Technical and Further Education (TAFE) or
                        Registered Training Organisations (RTOs) in regional,
                        rural and remote locations is limited.
                      </p>
                    </div>
                  </div>
                  {/* <div className="w-8 h-8 rounded-full bg-[#8AC900] text-gray800 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div> */}
                </div>

                {/* Insight 2 */}
                <div className="bg-[#FAFAF0] border border-gray200 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-[#728C28] transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-[50px] font-bold text-notes/10 leading-none">
                      2
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme Two, Insight Two
                      </span>
                      <p className="text-xs text-gray600 leading-relaxed">
                        Few TAFEs and RTOs are willing to travel to
                        geographically isolated locations.
                      </p>
                    </div>
                  </div>
                  {/* <div className="w-8 h-8 rounded-full bg-[#8AC900] text-gray800 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div> */}
                </div>

                {/* Insight 3 */}
                <div className="bg-[#FAFAF0] border border-gray200 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-[#728C28] transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-[50px] font-bold text-notes/10 leading-none">
                      3
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme Two, Insight Three
                      </span>
                      <p className="text-xs text-gray600 leading-relaxed">
                        Local councils have limited training budgets.
                      </p>
                    </div>
                  </div>
                  {/* <div className="w-8 h-8 rounded-full bg-[#8AC900] text-gray800 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div> */}
                </div>

                {/* Insight 4 */}
                <div className="bg-[#FAFAF0] border border-gray200 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-[#728C28] transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-[50px] font-bold text-notes/10 leading-none">
                      4
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#728C28] block mb-1">
                        Theme Two, Insight Four
                      </span>
                      <p className="text-xs text-gray600 leading-relaxed">
                        Course delivery is often not tailored to regional, rural
                        and remote areas.
                      </p>
                    </div>
                  </div>
                  {/* <div className="w-8 h-8 rounded-full bg-[#8AC900] text-gray800 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: 2026 Proposed Strategies */}
        <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray200">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E5E8DA] text-notes flex items-center justify-center shrink-0">
                <img
                  src="/images/stratergies.svg"
                  alt="Executive Summary Process Flow"
                  className="h-6 object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray800 pb-2">
                  2026 Proposed Local Government Workforce Strategies
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Strategy Card 1 */}
            <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-[#9CAA54] p-6 space-y-4">
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

              <h4 className="font-bold text-base text-gray800 leading-snug">
                Map Local Government occupational shortages to relevant VET
                training products
              </h4>

              <p className="text-xs text-gray600 leading-relaxed">
                Identify and map the use of relevant qualifications (beyond the
                Local Government Area (LGA) Local Government Training Package)
                to support VET training for key occupational shortages in Local
                Government.
              </p>

              {/* EXPANDED CONTENT FOR STRATEGY 1 */}
              {strategy1Open && (
                <div className="animate-expand-down pt-4 border-t border-gray200 space-y-4">
                  <div className="flex flex-col items-start gap-2">
                    <span className="bg-[#F0F5DF] text-notes text-xs font-bold px-3.5 py-1.5 rounded-full">
                      Workforce Insight: LG Specific Occupational Shortages
                    </span>
                    <span className="bg-[#F0F5DF] text-notes text-xs font-bold px-3.5 py-1.5 rounded-full">
                      12-month project
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-gray800">
                      JSC Function:
                    </h5>
                    <p className="text-xs text-gray600">
                      Implementation, Promotion and Monitoring.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-gray800">
                      Approach:
                    </h5>
                    <p className="text-xs text-gray600 leading-relaxed">
                      Map the most challenging occupational shortages (as
                      identified through the JSA Occupation Shortage List and
                      the Local Government Skills Audit) to relevant
                      qualifications contained in both the LGA Local Government
                      Training Package and other Training Packages, as well as
                      the RTOs that deliver them.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-gray800">
                      Deliverable:
                    </h5>
                    <p className="text-xs text-gray600">
                      Occupational Shortage Map.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-gray800">
                      Anticipated timing:
                    </h5>
                    <p className="text-xs text-gray600">12-month project.</p>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-gray800">Impact:</h5>
                    <p className="text-xs text-gray600 leading-relaxed">
                      An Occupational Shortage Map connecting the most
                      challenging shortages to the qualifications and RTOs that
                      can address them — enabling the sector to meet expanding
                      and increasing service delivery requirements.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-gray800">
                      Key stakeholders:
                    </h5>
                    <p className="text-xs text-gray600 leading-relaxed">
                      ALGA · state/territory LG Associations · LG Workforce
                      Development Group · RTOs · STTAs/SROs · state/territory LG
                      Departments.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Strategy Card 2 */}
            <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-[#046D2A] p-6 space-y-4">
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

              <h4 className="font-bold text-base text-gray800 leading-snug">
                Facilitate a roundtable on whole of VET system responses to
                Local Government challenges
              </h4>

              <p className="text-xs text-gray600 leading-relaxed">
                Promote the Local Government industry-sector as a sustainable
                and skilled career pathway to enhance service delivery to
                communities.
              </p>

              {/* EXPANDED CONTENT FOR STRATEGY 2 */}
              {strategy2Open && (
                <div className="animate-expand-down pt-4 border-t border-gray200 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#F0F5DF] text-notes text-xs font-bold px-3.5 py-1.5 rounded-full">
                      Workforce Insight: Access to VET Qualifications and
                      Training Delivery Partners
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-gray800">
                      JSC Function:
                    </h5>
                    <p className="text-xs text-gray600">
                      Industry Stewardship, Training Product Development
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-gray800">
                      Approach – Part A:
                    </h5>
                    <p className="text-xs text-gray600 leading-relaxed">
                      Bring together state and territory decision makers,
                      STTAs/SROs, Local Government Partners, TAFEs and RTOs to
                      facilitate conversations about whole of VET system
                      responses to Local Government industry-sector challenges.
                      This should include discussions about training delivery,
                      funding of training for occupations in shortage in local
                      councils and could see potential agreements between local
                      councils and RTOs regarding training delivery.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-gray800">
                      Approach – Part B (optional):
                    </h5>
                    <p className="text-xs text-gray600 leading-relaxed">
                      If gaps in specialist local council skills are identified
                      in Strategy 1 (Map Local Government occupational shortages
                      to relevant VET training products), an evaluation of the
                      current LGA Local Government Training Package may be
                      undertaken, with a focus on the number of qualifications,
                      training pathways, design of specialisation areas and the
                      potential utility of skill sets.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-gray800">
                      Deliverable:
                    </h5>
                    <p className="text-xs text-gray600 leading-relaxed">
                      Part A: Roundtable discussions and summary report of
                      discussions.
                      <br />
                      Part B: Reviewed training product/s
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-gray800">
                      Key Stakeholders:
                    </h5>
                    <ul className="space-y-1 text-xs text-gray600 pl-4 list-disc">
                      <li>Australian Local Government Association</li>
                      <li>State/Territory Local Government Associations</li>
                      <li>Local Government Workforce Development Group</li>
                      <li>Jobs and Skills Councils &gt; RTOs &gt; STTA/SROs</li>
                      <li>State/Territory Local Government Departments</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-gray800">Impact:</h5>
                    <p className="text-xs text-gray600 leading-relaxed">
                      Support the Local Government industry-sector by
                      facilitating access to whole of VET sector stakeholders.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section Banner 4: 2027 and Beyond */}
        <div className="bg-white rounded-2xl border border-gray200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E5E8DA] text-notes flex items-center justify-center shrink-0">
              <img
                src="/images/2027-and-beyond.svg"
                alt="Executive Summary Process Flow"
                className="h-6 object-contain"
              />
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
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
