"use client";

import React, { useState } from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import {
  Building2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award,
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

interface StrategyItem {
  id: number;
  code: string;
  title: string;
  jurisdiction: string;
  description: string;
  pillars: string[];
  impactDescription: string;
}

const EXISTING_STRATEGIES: StrategyItem[] = [
  {
    id: 1,
    code: "01-FEDERAL APS",
    title: "Delivering for Tomorrow: APS Workforce Strategy 2025",
    jurisdiction: "Commonwealth · Australian Public Service Commission (APSC)",
    description:
      "The overarching workforce strategy for the Commonwealth public service, setting out targeted actions to attract, develop, and retain talented public servants capable of delivering government outcomes in a complex operating environment.",
    pillars: [
      "Attract the best talent and build diverse, inclusive teams.",
      "Continuous capability development through the APS Academy.",
      "Optimize workforce mobility across departments and regional hubs.",
      "Strengthen strategic workforce planning and data-driven insights.",
    ],
    impactDescription:
      "Underpins Public Skills Australia's research into APS capability gaps and guides alignment of nationally accredited VET products to core APS job families.",
  },
  {
    id: 2,
    code: "02-APS REFORM",
    title: "APS Reform Agenda & In-House Capability Uplift",
    jurisdiction: "Commonwealth · Department of the Prime Minister and Cabinet",
    description:
      "A systemic reform agenda aimed at strengthening APS integrity, building internal policy and digital muscle, and curtailing excessive reliance on external management consultants.",
    pillars: [
      "Integrity at the heart of all public decision-making.",
      "Rebuilding sovereign in-house research, evaluation, and policy capabilities.",
      "Partnership with citizens and community organisations.",
      "Long-term capability stewardship and employee retention.",
    ],
    impactDescription:
      "Directly informs Strategy 1 (Future Skills for Federal and State Government) by identifying where internal public administration capabilities must be replenished.",
  },
  {
    id: 3,
    code: "03-NSW STRATEGY",
    title: "NSW Public Sector Capability Framework & Workforce Blueprint",
    jurisdiction: "New South Wales · NSW Premier's Department & Public Service Commission",
    description:
      "Defines the universal capabilities required of all NSW public sector employees across personal attributes, relationship management, results delivery, and business enablers.",
    pillars: [
      "Standardised behavioural and technical capability descriptors.",
      "Regional recruitment incentives for remote NSW agencies.",
      "Modern digital service delivery standards.",
    ],
    impactDescription:
      "Provides a benchmark for cross-jurisdictional occupational mapping and micro-credential recognition.",
  },
  {
    id: 4,
    code: "04-VIC CAPABILITY",
    title: "Victorian Public Sector Leadership and Capability Strategy",
    jurisdiction: "Victoria · Victorian Public Sector Commission (VPSC)",
    description:
      "Focuses on elevating executive leadership craft, modern ethical governance, and continuous capability enhancement across Victorian state departments.",
    pillars: [
      "Ethical leadership and integrity in public service.",
      "Digital, data, and technology literacy across generalist roles.",
      "Supportive, diverse, and psychologically safe workplaces.",
    ],
    impactDescription:
      "Synthesized into this Report's thematic insights on ethics, AI governance, and inter-agency collaboration.",
  },
  {
    id: 5,
    code: "05-QLD STRATEGY",
    title: "Even Better Public Sector: Queensland Workforce Strategy",
    jurisdiction: "Queensland · Public Sector Commission Queensland & Jobs Queensland",
    description:
      "A multi-year strategy focused on responsive regional service delivery, attracting First Nations leaders, and equipping public servants with modern digital tools.",
    pillars: [
      "Decentralised workforce hubs across regional and tropical Queensland.",
      "Closing the Gap public sector employment parity targets.",
      "Agile and cross-departmental project teams.",
    ],
    impactDescription:
      "Informed the regional workforce analysis and vocational training accessibility findings in this Report.",
  },
  {
    id: 6,
    code: "06-INTERJURISDICTIONAL",
    title: "APSC Interjurisdictional Working Group Mobility Protocols",
    jurisdiction: "National · Federal, State and Territory Public Sector Commissioners",
    description:
      "A collaborative forum of public sector commissioners working towards shared workforce standards, temporary secondment protocols, and reciprocal skill recognition.",
    pillars: [
      "Cross-border disaster recovery and crisis secondment mechanisms.",
      "Harmonisation of common public administration competencies.",
      "Shared data exchanges on occupational shortages.",
    ],
    impactDescription:
      "Acts as a principal governance mechanism for progressing Public Skills Australia's recommended future skills workshops.",
  },
];

export default function FederalStateExistingStrategiesView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const [selectedStrategyId, setSelectedStrategyId] = useState<number>(1);
  const current =
    EXISTING_STRATEGIES.find((s) => s.id === selectedStrategyId) ||
    EXISTING_STRATEGIES[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#E07A5F]/20 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="existing_strategies" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="existing_strategies" />

        {/* Hero Card */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-10 relative overflow-hidden space-y-4 shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EED4C4]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="bg-[#694834] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              STRATEGIC CONTEXT
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#382219]">
              Existing Industry-Sector Strategies
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Reviewing established public sector workforce strategies across federal, state, and territory jurisdictions that form the foundation for Public Skills Australia&apos;s strategic recommendations.
            </p>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* List Column */}
          <div className="lg:col-span-5 space-y-3">
            {EXISTING_STRATEGIES.map((item) => {
              const isSelected = item.id === selectedStrategyId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedStrategyId(item.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-2 cursor-pointer ${
                    isSelected
                      ? "bg-white border-[#694834] shadow-md ring-2 ring-[#694834]/20"
                      : "bg-[#FAF8F5] border-[#E9EAEB] hover:bg-white hover:border-[#EED4C4]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        isSelected
                          ? "bg-[#694834] text-white"
                          : "bg-white text-[#694834] border border-[#EED4C4]"
                      }`}
                    >
                      {item.code}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 ${
                        isSelected ? "text-[#694834]" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <h3 className="font-bold text-sm text-[#382219] leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {item.jurisdiction}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-2 border-b border-[#E9EAEB] pb-5">
              <span className="text-xs font-bold text-[#694834] uppercase tracking-wider block">
                {current.code}
              </span>
              <h2 className="text-2xl font-bold text-[#382219]">
                {current.title}
              </h2>
              <span className="text-xs font-semibold text-gray-500 block">
                {current.jurisdiction}
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed font-normal">
              {current.description}
            </p>

            {/* Strategic Pillars */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-[#382219] uppercase tracking-wider">
                Key Strategic Focus Areas
              </h3>
              <div className="space-y-2">
                {current.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E9EAEB]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#694834] shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-700 leading-relaxed">
                      {pillar}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Note */}
            <div className="bg-[#FAF8F5] border border-[#EED4C4] rounded-xl p-4 space-y-1">
              <span className="font-bold text-xs text-[#382219] uppercase tracking-wider block">
                Relevance to Public Skills Australia:
              </span>
              <p className="text-xs text-gray-600 leading-relaxed">
                {current.impactDescription}
              </p>
            </div>
          </div>
        </div>
      </main>

      <ReportFooter contactUrl={report?.contactUrl} />
    </div>
  );
}
