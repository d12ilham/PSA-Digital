"use client";

import React, { useState } from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import {
  CheckCircle2,
  Database,
  Users,
  Search,
  Award,
  ChevronRight,
  ShieldCheck,
  Building,
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

const STAKEHOLDERS = [
  "Australian Public Service Commission",
  "Jobs Queensland",
  "Department of Premier and Cabinet – Workforce Planning",
  "Australian Public Service Commission APS Centre for Excellence for Workforce Planning",
  "Australian Government Department of Employment and Workplace Relations (DEWR)",
  "Australian Public Sector Commission Interjurisdictional Working Group",
  "Office of the Commissioner for Public Employment, Northern Territory",
  "NSW Premier's Department – Strategic Workforce Development",
  "Community and Public Sector Union, Northern Territory",
  "Public Sector Commission, Queensland",
  "Office of the Commissioner for Public Sector Employment, South Australia",
  "Department Premier and Cabinet, Tasmania",
  "Victorian Public Sector Commission",
  "Western Australia Public Sector Commission",
];

const METHODOLOGY_STEPS = [
  {
    step: "STEP 1",
    title: "Desktop Research & Scoping",
    desc: "Initial scanning of public administration datasets, royal commissions, departmental annual reports, and workforce strategies.",
  },
  {
    step: "STEP 2",
    title: "Thematic Analysis",
    desc: "Challenges identified through consultation analysed to identify shared challenges and trends across jurisdictions.",
  },
  {
    step: "STEP 3",
    title: "Secondary Research",
    desc: "Qualitative and quantitative research to verify the challenges raised — JSA · ABS · NCVER datasets.",
  },
  {
    step: "STEP 4",
    title: "Validation",
    desc: "Targeted consultations with senior stakeholders to validate workforce challenges and identify industry-sector insights.",
  },
  {
    step: "STEP 5",
    title: "Governance Progression",
    desc: "Government Subcommittee → Industry Advisory Group → Public Skills Australia Board approval.",
  },
];

const GOVERNANCE_STEPS = [
  {
    num: "1",
    name: "Government Subcommittee",
    desc: "The Subcommittee is responsible for recommending this report to the Industry Advisory Group (IAG) for endorsement. This recommendation is made on the basis that sufficient consultation has been undertaken and feedback was appropriately actioned.",
  },
  {
    num: "2",
    name: "Industry Advisory Group (IAG)",
    desc: "The IAG is responsible for endorsing this report to the Public Skills Australia Board for approval to be submitted to DEWR, providing strategic guidance and ensuring public sector priorities are captured.",
  },
  {
    num: "3",
    name: "Public Skills Australia Board",
    desc: "The Board is responsible for approving the submission of this Report to DEWR, ensuring appropriate consultation and development processes were followed in line with internal governance requirements.",
  },
];

export default function FederalStateMethodologyView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#E07A5F]/20 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="methodology" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="methodology" />

        {/* Hero Card */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-10 relative overflow-hidden space-y-6 shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EED4C4]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#694834] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                METHODOLOGY & GOVERNANCE
              </span>
              <span className="text-xs text-gray-500 font-semibold uppercase">
                Rigorous Evidence Base
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#382219]">
              Research Methodology & Governance
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              This report utilizes a mixed-methods research framework combining national and state public sector data analysis with extensive qualitative consultations across all Australian jurisdictions.
            </p>
          </div>
        </div>

        {/* 5-Step Methodology Flow */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-[#E9EAEB] pb-3">
            <h2 className="text-xl font-bold text-[#382219]">
              Five-Stage Research Framework
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              From desktop research through stakeholder consultations to final governance approval.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {METHODOLOGY_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#EED4C4]/60 rounded-xl p-5 flex flex-col justify-between space-y-3 relative group hover:border-[#694834] transition-colors"
              >
                <div>
                  <span className="text-xs font-extrabold text-[#694834] tracking-wider block mb-1">
                    {step.step}
                  </span>
                  <h3 className="font-bold text-sm text-[#382219] mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full bg-white border border-[#EED4C4] text-[#694834] flex items-center justify-center text-xs font-bold self-end">
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Targeted Consultations Section */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-[#E9EAEB] pb-3">
            <h2 className="text-xl font-bold text-[#382219]">
              Key Industry-Sector Stakeholder Consultations
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Public Skills Australia undertook targeted workforce planning consultations with key federal, state and territory representatives:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STAKEHOLDERS.map((st, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#E9EAEB] hover:border-[#694834] rounded-xl p-4 flex items-start gap-3 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-white border border-[#EED4C4] flex items-center justify-center shrink-0 text-[#694834] mt-0.5">
                  <Building className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-gray-800 leading-snug">
                  {st}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Governance Process */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-[#E9EAEB] pb-3">
            <h2 className="text-xl font-bold text-[#382219]">
              Public Skills Australia Governance Approval
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Drafts progressed through our tripartite governance framework prior to submission to DEWR:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GOVERNANCE_STEPS.map((gov, idx) => (
              <div
                key={idx}
                className="border border-[#E9EAEB] bg-[#FAF8F5] rounded-xl p-6 space-y-3 relative flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#694834] text-white flex items-center justify-center text-xs font-bold">
                      {gov.num}
                    </span>
                    <h3 className="font-bold text-sm text-[#382219]">
                      {gov.name}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed pt-1">
                    {gov.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#694834] pt-3">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Endorsed & Progressed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources Note */}
        <div className="bg-[#FAF8F5] border border-[#EED4C4] rounded-2xl p-6 space-y-3">
          <h3 className="font-bold text-sm text-[#382219]">
            Data Sources & Synthesis
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed max-w-4xl">
            This Report uses publicly available datasets accessible from Jobs and Skills Australia (JSA), the Australian Bureau of Statistics (ABS), the National Centre for Vocational Education Research (NCVER) and other supporting online sources. Due to the complexity of large-scale public administration data, multiple sources are triangulated to provide the most accurate representation of the workforce, reinforced by literature reviews of government strategies, Royal Commission reports, and jurisdictional capability reviews.
          </p>
        </div>
      </main>

      <ReportFooter contactUrl={report?.contactUrl} />
    </div>
  );
}
