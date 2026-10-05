"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Lightbulb,
  Compass,
  RefreshCw,
  Building2,
  Wrench,
  CheckCircle2,
  Layers,
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

export default function FederalStateExecutiveSummaryView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();
  const [showTheme1Overview, setShowTheme1Overview] = useState(false);
  const [showTheme2Overview, setShowTheme2Overview] = useState(false);
  const [strategy1Open, setStrategy1Open] = useState(true);

  const themesRef = useRef<HTMLDivElement>(null);
  const [isThemesVisible, setIsThemesVisible] = useState(false);

  const strategiesRef = useRef<HTMLDivElement>(null);
  const [isStrategiesVisible, setIsStrategiesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === themesRef.current) {
              setIsThemesVisible(true);
            } else if (entry.target === strategiesRef.current) {
              setIsStrategiesVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (themesRef.current) observer.observe(themesRef.current);
    if (strategiesRef.current) observer.observe(strategiesRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#E07A5F]/20 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="executive_summary"
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        <ReportNavButtons slug={slug} currentPage="executive_summary" />

        {/* Hero Card with Sequential Flow Graphic */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EED4C4]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="lg:col-span-7 space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <span className="bg-[#694834] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                FEDERAL AND STATE/TERRITORY
              </span>
              <span className="text-xs text-gray-500 font-semibold uppercase">
                {report?.year?.label || "2026"} • Executive Summary
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#382219]">
              Executive Summary
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              Public Skills Australia&apos;s 2026 Federal and State/Territory Government Workforce Insights Report considers the wider operational contexts impacting Public Safety and Government industry-sectors. It identifies four drivers of change that will impact workforce planning in the short to medium term, aligned with the nine megatrends detailed in previous{" "}
              <span className="font-semibold text-[#694834]">
                Workforce Insights Reports
              </span>
              , that remain relevant to long term public administration trends.
            </p>
          </div>

          {/* Right Flow Graphics */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end overflow-x-auto py-2 relative z-10">
            <div className="flex items-center justify-center shrink-0">
              {/* 1. Workforce */}
              <div className="relative z-10 shrink-0">
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-[#EED4C4] bg-[#FAF8F5] p-2 flex items-center justify-center shadow-sm">
                  <img
                    src="/images/reports/executive-summary/flow-1-workforce.png"
                    alt="Workforce"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Separator 1 */}
              <div className="flex flex-col justify-center gap-1 w-5 sm:w-7 -mx-[1px] relative z-0 shrink-0">
                <div className="h-[2px] w-full bg-[#694834]" />
                <div className="h-[2px] w-full bg-[#694834]" />
              </div>

              {/* 2. Insights */}
              <div className="relative z-10 shrink-0">
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-[#EED4C4] bg-[#FAF8F5] p-2 flex items-center justify-center shadow-sm">
                  <img
                    src="/images/reports/executive-summary/flow-2-insights.png"
                    alt="Insights"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Separator 2 */}
              <div className="flex flex-col justify-center gap-1 w-5 sm:w-7 -mx-[1px] relative z-0 shrink-0">
                <div className="h-[2px] w-full bg-[#694834]" />
                <div className="h-[2px] w-full bg-[#694834]" />
              </div>

              {/* 3. Strategies */}
              <div className="relative z-10 shrink-0">
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-[#EED4C4] bg-[#FAF8F5] p-2 flex items-center justify-center shadow-sm">
                  <img
                    src="/images/reports/executive-summary/flow-3-strategies.png"
                    alt="Strategies"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Separator 3 */}
              <div className="flex flex-col justify-center gap-1 w-5 sm:w-7 -mx-[1px] relative z-0 shrink-0">
                <div className="h-[2px] w-full bg-[#694834]" />
                <div className="h-[2px] w-full bg-[#694834]" />
              </div>

              {/* 4. Forward */}
              <div className="relative z-10 shrink-0">
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-[#EED4C4] bg-[#FAF8F5] p-2 flex items-center justify-center shadow-sm">
                  <img
                    src="/images/reports/executive-summary/flow-4-forward.png"
                    alt="Looking Forward"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Drivers of Change */}
        <div className="bg-white rounded-2xl border border-[#E9EAEB] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#382219] pb-1">
                Drivers of Change
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed max-w-2xl">
                Identifies four critical drivers of change that impact public service workforce planning in the short to medium term: strategic resilience, productivity challenges, emergence of AI and digital transformation, and workforce inclusivity.
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/reports/${slug}/drivers_of_change`)}
            className="bg-[#694834] hover:bg-[#382219] text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <span>Present Drivers of Change</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Section 2: Two Themes, Workforce Insights */}
        <div ref={themesRef} className="bg-white rounded-2xl border border-[#E9EAEB] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E9EAEB]">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#382219] pb-1">
                  Public Sector Workforce Insights Across Key Themes
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed max-w-3xl">
                  This Report identifies public sector insights across two primary themes: building sovereign public administration capability and expanding access to modern vocational and digital skilling pathways.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push(`/reports/${slug}/workforce_insights`)}
              className="bg-[#694834] hover:bg-[#382219] text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span>Present Workforce Insights</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Two Themes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Theme 1 Container */}
            <div className="bg-white rounded-2xl border border-[#E9EAEB] border-t-8 border-t-[#694834] p-6 space-y-5">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#694834] uppercase tracking-wider block">
                  THEME 1 · IN-HOUSE PUBLIC SECTOR CAPABILITY
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#382219]">
                  Strengthening In-House Public Service Capabilities & Skills
                </h3>
                <button
                  onClick={() => setShowTheme1Overview(!showTheme1Overview)}
                  className="bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] hover:bg-[#EED4C4]/40 text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer flex items-center gap-1 transition-colors"
                >
                  Theme Overview {showTheme1Overview ? "▴" : "▾"}
                </button>

                {showTheme1Overview && (
                  <div className="pt-2 text-xs text-gray-600 leading-relaxed space-y-2">
                    <p>
                      Government priorities across federal and state levels focus on building core public service capability rather than over-relying on external consultants. This requires concerted efforts to uplift data literacy, strategic policy design, project management, and operational leadership within public administration workforces.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="bg-[#FAF8F5] border border-[#E9EAEB] rounded-xl p-4 flex items-start gap-4">
                  <span className="text-3xl font-extrabold text-[#694834]/20 leading-none">1</span>
                  <div>
                    <span className="text-xs font-bold text-[#694834] block mb-1">Theme One, Insight One</span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Federal and State governments are actively shifting from external contractor dependencies to rebuilding deep in-house policy, digital, and regulatory capability.
                    </p>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E9EAEB] rounded-xl p-4 flex items-start gap-4">
                  <span className="text-3xl font-extrabold text-[#694834]/20 leading-none">2</span>
                  <div>
                    <span className="text-xs font-bold text-[#694834] block mb-1">Theme One, Insight Two</span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Emergence of generative AI, automation, and cyber security mandates demands continuous workforce capability uplift through programs like the APS Academy.
                    </p>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E9EAEB] rounded-xl p-4 flex items-start gap-4">
                  <span className="text-3xl font-extrabold text-[#694834]/20 leading-none">3</span>
                  <div>
                    <span className="text-xs font-bold text-[#694834] block mb-1">Theme One, Insight Three</span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Regional public sector employment and frontline service delivery face acute retention pressures against competitive private sector salary offerings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Theme 2 Container */}
            <div className="bg-white rounded-2xl border border-[#E9EAEB] border-t-8 border-t-[#382219] p-6 space-y-5">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#694834] uppercase tracking-wider block">
                  THEME 2 · VET & SKILLS PATHWAYS
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#382219]">
                  Access to VET Qualifications & Cross-Jurisdictional Mobility
                </h3>
                <button
                  onClick={() => setShowTheme2Overview(!showTheme2Overview)}
                  className="bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] hover:bg-[#EED4C4]/40 text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer flex items-center gap-1 transition-colors"
                >
                  Theme Overview {showTheme2Overview ? "▴" : "▾"}
                </button>

                {showTheme2Overview && (
                  <div className="pt-2 text-xs text-gray-600 leading-relaxed space-y-2">
                    <p>
                      Access to responsive accredited vocational training is vital for specialized administrative, compliance, procurement, and frontline operational roles across public safety and government jurisdictions.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="bg-[#FAF8F5] border border-[#E9EAEB] rounded-xl p-4 flex items-start gap-4">
                  <span className="text-3xl font-extrabold text-[#382219]/20 leading-none">1</span>
                  <div>
                    <span className="text-xs font-bold text-[#694834] block mb-1">Theme Two, Insight One</span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Nationally accredited VET qualifications must be modernized to reflect contemporary public administration standards, data ethics, and digital tools.
                    </p>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E9EAEB] rounded-xl p-4 flex items-start gap-4">
                  <span className="text-3xl font-extrabold text-[#382219]/20 leading-none">2</span>
                  <div>
                    <span className="text-xs font-bold text-[#694834] block mb-1">Theme Two, Insight Two</span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Cross-jurisdictional recognition of micro-credentials and transferable skills allows greater workforce fluidity between federal, state, and territory departments.
                    </p>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E9EAEB] rounded-xl p-4 flex items-start gap-4">
                  <span className="text-3xl font-extrabold text-[#382219]/20 leading-none">3</span>
                  <div>
                    <span className="text-xs font-bold text-[#694834] block mb-1">Theme Two, Insight Three</span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Targeted cadetships and apprenticeships provide critical entry pipelines for First Nations and regional youth into public service careers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: 2026 Proposed Strategies */}
        <div ref={strategiesRef} className="bg-white rounded-2xl border border-[#E9EAEB] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E9EAEB]">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] flex items-center justify-center shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#382219] pb-1">
                  2026 Proposed Strategy
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Public Skills Australia proposes the following strategic response aligned to the workforce insights identified to support the Federal and State/Territory Government industry-sector:
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push(`/reports/${slug}/workforce_strategies`)}
              className="bg-[#694834] hover:bg-[#382219] text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span>Present 2026 Strategies</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Strategy 1 Card */}
          <div className="bg-white rounded-2xl border border-[#E9EAEB] border-t-8 border-t-[#694834] p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <span className="bg-[#694834] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                STRATEGY 1
              </span>
              <button
                onClick={() => setStrategy1Open(!strategy1Open)}
                className="bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] hover:bg-[#EED4C4]/40 text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer flex items-center gap-1 transition-colors"
              >
                {strategy1Open ? "Close ▴" : "Open ▾"}
              </button>
            </div>

            <h4 className="font-bold text-lg text-[#382219] leading-snug">
              Identify future skills needs for Federal and State/Territory Government
            </h4>

            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#694834]">
              <span className="bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#EED4C4]">
                Workforce Insight: Future of the Public Service
              </span>
              <span className="bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#EED4C4]">
                JSC Function: Industry Stewardship
              </span>
            </div>

            {strategy1Open && (
              <div className="pt-4 border-t border-[#E9EAEB] space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E9EAEB] space-y-1">
                    <h5 className="text-xs font-bold text-[#382219] uppercase tracking-wider">
                      Objective:
                    </h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      To support the Federal and State/Territory public service in identifying future workforce skilling needs.
                    </p>
                  </div>

                  <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E9EAEB] space-y-1">
                    <h5 className="text-xs font-bold text-[#382219] uppercase tracking-wider">
                      Deliverable & Timing:
                    </h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Findings Report • 12-month project.
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-[#382219]">
                    Approach:
                  </h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Using a strategic-foresight approach, convene &lsquo;Future Skills for the Public Service&rsquo; workshops to identify future skilling needs across jurisdictions to support clarifying emerging skills gaps and identify where nationally accredited VET can support capability development.
                  </p>
                </div>

                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-[#382219]">
                    Impact:
                  </h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    To support the Federal and State/Territory Government public service by providing critical insight to the future needs of public service workforces which can support strategic workforce planning.
                  </p>
                </div>

                <div className="space-y-1 pt-2">
                  <h5 className="text-xs font-bold text-[#382219]">
                    Key Stakeholders:
                  </h5>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] text-xs font-semibold px-3 py-1 rounded-full">
                      Public Sector Commissions or equivalent across all Australian Jurisdictions
                    </span>
                    <span className="bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] text-xs font-semibold px-3 py-1 rounded-full">
                      Australian Public Service Commission (APSC)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: 2027 and Beyond Teaser */}
        <div className="bg-white rounded-2xl border border-[#E9EAEB] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-3xl">
            <h3 className="font-bold text-lg text-[#382219]">
              2027 and Beyond
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              This report concludes by looking towards the 2027 Workforce Insights Reports and beyond. Future work will firstly focus on broader priorities, including First Nations workforce participation, gender equity in the Public Safety and Government workforces, and the implications of AI and digital transformation.
            </p>
          </div>
          <button
            onClick={() => router.push(`/reports/${slug}/looking_forward`)}
            className="bg-[#694834] hover:bg-[#382219] text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <span>View 2027 and Beyond</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </main>

      <ReportFooter contactUrl={report?.contactUrl} />
    </div>
  );
}
