"use client";

import React, { useState } from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import {
  BookOpen,
  Cpu,
  Layers,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
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

interface InsightDetail {
  number: string;
  theme: string;
  title: string;
  summary: string;
  findings: string[];
  sources: string;
}

const INSIGHTS: InsightDetail[] = [
  {
    number: "Insight 1",
    theme: "Theme One · Public Sector Capability",
    title: "Critical need for rapid digital, cyber security, and AI governance skilling",
    summary:
      "Public servants across policy, service delivery, and regulatory domains require foundational and specialist capability uplift to harness artificial intelligence safely and adhere to national security mandates.",
    findings: [
      "APS and State agencies face high demand for digital professionals capable of ethical AI implementation.",
      "The APS Academy and state training bodies are establishing dedicated digital and cyber streams.",
      "Legacy IT infrastructure continues to restrict seamless cross-departmental data exchange.",
    ],
    sources:
      "Sources: Australian Government Department of Finance, National framework for the assurance of artificial intelligence in government, 2024 · Digital Transformation Agency, 2025.",
  },
  {
    number: "Insight 2",
    theme: "Theme One · Public Sector Capability",
    title: "Strategic transition from external consultant spend to sovereign in-house capability",
    summary:
      "Federal and state governments are implementing Strategic Commissioning Frameworks to reduce reliance on external consulting firms and rebuild core public policy, analytical, and evaluation capabilities internally.",
    findings: [
      "Commonwealth targets have substantially curtailed core consulting expenditure, opening permanent civil service roles.",
      "Significant capability deficits remain in complex procurement, commercial negotiation, and major ICT program management.",
      "In-house capability development requires structured continuous professional development pathways.",
    ],
    sources:
      "Sources: Australian Public Service Commission (APSC), Strategic Commissioning Framework, 2023 · Senate Finance and Public Administration References Committee Reports, 2024.",
  },
  {
    number: "Insight 3",
    theme: "Theme One · Public Sector Capability",
    title: "Regional recruitment hurdles and wage competition with the private sector",
    summary:
      "Regional public service offices experience persistent vacancy rates in regulatory, environmental science, and technical compliance roles due to competitive private sector wage disparity and regional housing shortages.",
    findings: [
      "Decentralized public agencies in northern and regional Australia report protracted vacancy cycles.",
      "Remote working flexibility has mitigated some shortages but cannot replace essential on-the-ground presence.",
      "Targeted regional allowance structures and career acceleration incentives are increasingly necessary.",
    ],
    sources:
      "Sources: Jobs and Skills Australia (JSA), Regional Labour Market Assessment, 2025.",
  },
  {
    number: "Insight 4",
    theme: "Theme Two · VET & Skills Pathways",
    title: "Modernizing nationally accredited VET public administration qualifications",
    summary:
      "Existing training package components require modernization to align with contemporary digital public service delivery, agile project management, and automated workflow environments.",
    findings: [
      "Stakeholder consultations highlighted that legacy public administration certificates do not sufficiently cover modern data analytics or digital citizen engagement.",
      "Public Skills Australia is evaluating qualifications under the Training Package Organising Framework (TPOF).",
      "Greater modularity and stackable skill sets are desired by public sector workforce planners.",
    ],
    sources:
      "Sources: Skills and Workforce Ministerial Council, Qualification Reform Design Group (QRDG) Advice, 2024–2025.",
  },
  {
    number: "Insight 5",
    theme: "Theme Two · VET & Skills Pathways",
    title: "Micro-credentials and cross-jurisdictional recognition of prior learning",
    summary:
      "Public sector employees frequently encounter friction when moving between federal and state jurisdictions due to inconsistent capability frameworks and unstandardized micro-credential recognition.",
    findings: [
      "The Australian Public Sector Commission Interjurisdictional Working Group is mapping shared capability baselines.",
      "Micro-credentials provide high-velocity training for urgent policy priorities like climate reporting and data ethics.",
      "Standardized mutual recognition would substantially enhance public sector workforce mobility.",
    ],
    sources:
      "Sources: Public Skills Australia Stakeholder Consultations with State Public Sector Commissions, 2025–2026.",
  },
  {
    number: "Insight 6",
    theme: "Theme Two · VET & Skills Pathways",
    title: "Inclusive pipelines for First Nations and regional youth into public service careers",
    summary:
      "Public sector employers are establishing targeted cadetships, school-leaver traineeships, and culturally safe workplace standards to expand First Nations leadership across all classification levels.",
    findings: [
      "While entry-level representation has improved, senior executive representation remains an area requiring sustained focus.",
      "Partnerships with local community elders, TAFE providers, and the Community and Public Sector Union (CPSU) are critical.",
      "Mentorship and culturally grounded retention programs directly reduce early career attrition.",
    ],
    sources:
      "Sources: Commonwealth Aboriginal and Torres Strait Islander Workforce Strategy 2020–2024 · DEWR, 2025.",
  },
];

export default function FederalStateWorkforceInsightsView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const [openInsight, setOpenInsight] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#E07A5F]/20 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="workforce_insights" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="workforce_insights" />

        {/* Hero Card */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-10 relative overflow-hidden space-y-4 shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EED4C4]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="bg-[#694834] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              WORKFORCE INSIGHTS
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#382219]">
              Core Public Sector Workforce Insights
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Evidence-based insights into civil service capability uplift, in-house technical sovereignty, digital transformation, and modern vocational education pathways across all tiers of Australian government.
            </p>
          </div>
        </div>

        {/* Insights Accordion List */}
        <div className="space-y-4">
          {INSIGHTS.map((item, idx) => {
            const isOpen = openInsight === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E9EAEB] overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenInsight(isOpen ? null : idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5]/60 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] flex items-center justify-center text-sm font-extrabold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-[#694834] uppercase tracking-wider block">
                        {item.theme}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#382219] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed pt-1">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E9EAEB] flex items-center justify-center text-gray-500 shrink-0 self-center">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#694834]" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-[#E9EAEB] space-y-4 bg-[#FAF8F5]/30">
                    <div className="space-y-2">
                      <h4 className="font-bold text-xs text-[#382219] uppercase tracking-wider">
                        Key Consultation & Research Findings:
                      </h4>
                      <ul className="space-y-2 text-xs text-gray-700">
                        {item.findings.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#694834] shrink-0 mt-1.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white border border-[#EED4C4] rounded-xl p-3.5 text-[11px] text-gray-600 leading-relaxed">
                      <span className="font-bold text-[#382219] block mb-0.5">
                        Citation:
                      </span>
                      {item.sources}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <ReportFooter contactUrl={report?.contactUrl} />
    </div>
  );
}
