"use client";

import React, { useState } from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import {
  Wrench,
  Clock,
  Target,
  FileCheck,
  Building2,
  Users,
  Compass,
  ArrowRight,
  ChevronDown,
  ChevronUp,
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

export default function FederalStateProposedStrategiesView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const [activeStrategy, setActiveStrategy] = useState<number>(1);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#E07A5F]/20 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="workforce_strategies" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="workforce_strategies" />

        {/* Hero Card */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-10 relative overflow-hidden space-y-4 shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EED4C4]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="bg-[#694834] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              2026 PROPOSED STRATEGIES
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#382219]">
              Strategic Workforce Responses
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Public Skills Australia proposes high-impact strategic initiatives aligned to the workforce insights identified, designed to strengthen capabilities across federal, state, and territory jurisdictions.
            </p>
          </div>
        </div>

        {/* Strategy Selector Strip */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveStrategy(1)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeStrategy === 1
                ? "bg-[#694834] text-white shadow-sm"
                : "bg-white border border-[#E9EAEB] text-gray-700 hover:border-[#694834]"
            }`}
          >
            Strategy 1: Future Skills for Federal & State Government
          </button>
          <button
            onClick={() => setActiveStrategy(2)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeStrategy === 2
                ? "bg-[#694834] text-white shadow-sm"
                : "bg-white border border-[#E9EAEB] text-gray-700 hover:border-[#694834]"
            }`}
          >
            Strategy 2: Cross-Jurisdictional VET Pathway Alignment
          </button>
        </div>

        {/* Detailed Strategy Display */}
        {activeStrategy === 1 ? (
          <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-10 space-y-8 shadow-sm">
            <div className="space-y-3 border-b border-[#E9EAEB] pb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#694834] text-white font-bold text-xs px-3 py-1 rounded-full uppercase">
                  STRATEGY 1
                </span>
                <span className="bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] text-xs font-bold px-3 py-1 rounded-full">
                  12-Month Project
                </span>
                <span className="bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] text-xs font-bold px-3 py-1 rounded-full">
                  JSC Function: Industry Stewardship & Training Product Development
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#382219]">
                Identify future skills needs for Federal and State/Territory Government
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed max-w-4xl">
                A national foresight initiative convening key decision-makers across all public sector commissions to chart emerging capabilities, address critical technology shifts, and define where accredited VET training can support public service pipelines.
              </p>
            </div>

            {/* Strategy Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FAF8F5] rounded-xl p-5 border border-[#E9EAEB] space-y-2">
                <div className="flex items-center gap-2 text-[#694834] font-bold text-xs uppercase tracking-wider">
                  <Target className="w-4 h-4" />
                  <span>Objective</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-normal">
                  To support the Federal and State/Territory public service in identifying future workforce skilling needs and clarifying emerging skill gaps across jurisdictions.
                </p>
              </div>

              <div className="bg-[#FAF8F5] rounded-xl p-5 border border-[#E9EAEB] space-y-2">
                <div className="flex items-center gap-2 text-[#694834] font-bold text-xs uppercase tracking-wider">
                  <FileCheck className="w-4 h-4" />
                  <span>Deliverable</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-normal">
                  Future Skills for the Public Service Findings Report, including recommended training product adjustments and capability pathways.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-sm text-[#382219] uppercase tracking-wider">
                Approach
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                Using a strategic-foresight approach, convene &lsquo;Future Skills for the Public Service&rsquo; workshops to identify future skilling needs across jurisdictions to support clarifying emerging skills gaps and identify where nationally accredited VET can support capability development. The approach will bring together leaders from the Australian Public Service Commission (APSC), state and territory public sector commissions, TAFE networks, and subject matter experts in AI ethics, data governance, and public administration.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-sm text-[#382219] uppercase tracking-wider">
                Expected Strategic Impact
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                To support the Federal and State/Territory Government public service by providing critical insight into the future needs of public service workforces, which directly informs multi-year workforce plans, reduces reliance on expensive external advisory services, and strengthens public sector sovereignty.
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#E9EAEB]">
              <h3 className="font-bold text-sm text-[#382219] uppercase tracking-wider">
                Key Stakeholders & Governance
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] text-xs font-semibold px-3 py-1.5 rounded-full">
                  Public Sector Commissions across all 8 Jurisdictions
                </span>
                <span className="bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] text-xs font-semibold px-3 py-1.5 rounded-full">
                  Australian Public Service Commission (APSC)
                </span>
                <span className="bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] text-xs font-semibold px-3 py-1.5 rounded-full">
                  Department of Employment and Workplace Relations (DEWR)
                </span>
                <span className="bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] text-xs font-semibold px-3 py-1.5 rounded-full">
                  Jobs and Skills Australia (JSA)
                </span>
                <span className="bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] text-xs font-semibold px-3 py-1.5 rounded-full">
                  Community and Public Sector Union (CPSU)
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-10 space-y-8 shadow-sm">
            <div className="space-y-3 border-b border-[#E9EAEB] pb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#694834] text-white font-bold text-xs px-3 py-1 rounded-full uppercase">
                  STRATEGY 2
                </span>
                <span className="bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] text-xs font-bold px-3 py-1 rounded-full">
                  18-Month Roadmap
                </span>
                <span className="bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] text-xs font-bold px-3 py-1 rounded-full">
                  JSC Function: Training Product Development & System Harmonisation
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#382219]">
                Cross-Jurisdictional VET Pathway Alignment & Micro-Credentials
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed max-w-4xl">
                Developing standardized, stackable micro-credentials and accredited VET qualifications that align with state and federal public sector capability frameworks to facilitate inter-jurisdictional workforce mobility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FAF8F5] rounded-xl p-5 border border-[#E9EAEB] space-y-2">
                <div className="flex items-center gap-2 text-[#694834] font-bold text-xs uppercase tracking-wider">
                  <Target className="w-4 h-4" />
                  <span>Objective</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-normal">
                  Harmonize public administration skill sets across jurisdictions, enabling reciprocal credential recognition and flexible career progression.
                </p>
              </div>

              <div className="bg-[#FAF8F5] rounded-xl p-5 border border-[#E9EAEB] space-y-2">
                <div className="flex items-center gap-2 text-[#694834] font-bold text-xs uppercase tracking-wider">
                  <FileCheck className="w-4 h-4" />
                  <span>Deliverable</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-normal">
                  Updated National Public Sector Training Products and Micro-Credential Mutual Recognition Blueprint.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-sm text-[#382219] uppercase tracking-wider">
                Approach
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                Work closely with State Training Authorities (STTAs), Senior Officials, and Registered Training Organisations (RTOs) to identify high-demand micro-credentials in data ethics, cyber resilience, regulatory compliance, and project management. Establish standardized recognition protocols so qualifications obtained in one jurisdiction are seamlessly recognized across all Australian public services.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-sm text-[#382219] uppercase tracking-wider">
                Expected Strategic Impact
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                Removes administrative barriers to workforce mobility between federal and state levels, accelerates talent deployment to emergency and regional areas, and creates clear vocational ladders for frontline public servants.
              </p>
            </div>
          </div>
        )}
      </main>

      <ReportFooter contactUrl={report?.contactUrl} />
    </div>
  );
}
