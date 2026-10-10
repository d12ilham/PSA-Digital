"use client";

import React from "react";
import { ArrowRight, ClipboardCheck, UsersRound } from "lucide-react";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type CorrectionalServicesReport = {
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: {
    label: string;
  };
  industry?: {
    slug?: string;
    name?: string;
  };
};

const strategyDetails = [
  ["Workforce Insight", "Community Corrections"],
  [
    "JSC Function",
    "Training Product Development and Implementation, Promotion and Monitoring",
  ],
  ["Deliverable", "Findings Report"],
  ["Anticipated timing", "18-month project"],
];

const capabilityAreas = [
  "community services",
  "alcohol and other drugs",
  "behavioural change management",
  "trauma-informed response",
  "training for working with First Nations people",
  "training for dealing with sex offenders",
];

const stakeholders = [
  "HumanAbility",
  "State and Territory Correctional Services",
  "Private Correctional Service organisations",
];

const updateCards = [
  {
    id: "demand",
    eyebrow: "Update on 2024 Strategies",
    title: "Demand Management",
    subtitle: "Drivers for Recruitment, Attrition and Retention (Corrections)",
    body:
      "The Drivers Report examined public perceptions of working in the Correctional Services industry-sector and its impact on recruitment, attraction and attrition. Public Skills Australia is now engaging with CSAC to work through implementation of the Report findings.",
    drivers: [
      "Resilience of organisations to respond to strategic shocks.",
      "Support industry-sectors to continue building capable and mobile workforces that are future-ready.",
      "Strategic workforce planning and strong stakeholder engagement.",
    ],
    recommendations: [
      "Prioritise recruiting metropolitan Millennial males, Generation Z males and Millennial females.",
      "Focus on opportunities to recruit professionals and managers into Correctional Services careers.",
      "Consider strategies to attract employees to relocate or commute to regional locations.",
      "Undertake targeted messaging campaigns with accurate and accessible information about working in Correctional Services.",
    ],
  },
  {
    id: "mobility",
    eyebrow: "Update on 2024 Strategies",
    title: "Workforce Mobility",
    subtitle: "Corrections Implementation Report 2025",
    body:
      "The Implementation Report assessed skills maintenance and training delivery challenges in relation to the Certificate III in Correctional Practice. Public Skills Australia is working to support implementation of the Report findings.",
    drivers: [
      "Challenges to workforce productivity.",
      "Support for high-quality training products and effective training delivery.",
      "Qualification reform principles for streamlined, relevant and future-ready qualifications.",
    ],
    recommendations: [
      "Develop an Implementation Guide tailored to Certificate III in Correctional Practice.",
      "Incorporate culturally appropriate learning and assessment guidance.",
      "Facilitate national collaboration events to build capacity.",
      "Address implementation challenges previously identified by stakeholders.",
    ],
  },
  {
    id: "lifecycle",
    eyebrow: "Update on 2025 Strategies",
    title: "Correctional Services Skills and Training Pathways",
    subtitle: "Workforce Lifecycle",
    body:
      "The project is in progress and anticipated for delivery in December 2026. It aims to strengthen training and career pathway opportunities across the Correctional Services industry-sector.",
    drivers: [
      "Map current occupational, career and training pathways within jurisdictions.",
      "Develop advice to strengthen occupational and educational pathways.",
      "Identify opportunities for career progress into specialist operational roles.",
    ],
    recommendations: [
      "Outline career and training pathways into key roles.",
      "Identify key stages of development undertaken across jurisdictions.",
      "Identify areas of non-accredited training used to bolster accredited courses.",
      "Examine areas of potential update to the CSC Correctional Services Training Package.",
    ],
  },
  {
    id: "first-nations",
    eyebrow: "Update on 2025 Strategies",
    title: "First Nations Workforce Participation",
    subtitle: "Barriers, participation and retention",
    body:
      "Public Skills Australia has begun commissioning a research project through a First Nations-led research organisation on First Nations workforce participation across Public Safety and Government industry-sectors, including Correctional Services.",
    drivers: [
      "First Nations workforce participation across age, gender, qualification enrolment and attainment.",
      "Interviews and case studies identifying personal stories of success.",
      "Education and training journeys across Public Safety and Government industry-sectors.",
    ],
    recommendations: [
      "Collect and analyse statistical participation data over the past five years.",
      "Collect qualitative data through interviews and case studies.",
      "Understand challenges faced by First Nations people.",
      "Identify factors that supported successful employment or aligned training.",
    ],
  },
];

export default function CorrectionalServicesWorkforceStrategiesView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const [activeUpdateId, setActiveUpdateId] = React.useState("demand");
  const activeUpdate =
    updateCards.find((update) => update.id === activeUpdateId) ?? updateCards[0];

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#38BDF8]/30 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="workforce_strategies" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        <ReportNavButtons slug={slug} currentPage="workforce_strategies" />

        <section className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-4">
            <p className="animate-slide-up text-xs font-semibold uppercase leading-6 text-[#0B6DA8]">
              Workforce Strategies
            </p>
            <h1 className="animate-slide-up text-3xl sm:text-4xl font-bold text-[#063B5D]">
              2026 Proposed Correctional Services Workforce Strategy
            </h1>
            <p className="animate-slide-up-delay max-w-4xl text-sm leading-relaxed text-[#535862]">
              Public Skills Australia proposes the following strategy aligned to the workforce
              insights identified for the Correctional Services industry-sector.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="animate-hero-pulse-settle flex h-36 w-36 items-center justify-center rounded-full bg-[#E8F7FE]">
              <ClipboardCheck className="h-20 w-20 text-[#0B6DA8]" strokeWidth={1.5} />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border-2 border-[#0B6DA8] bg-white p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
            <div className="max-w-5xl">
              <p className="text-xs font-bold uppercase text-[#0B6DA8]">Strategy 1</p>
              <h2 className="mt-3 text-2xl font-bold leading-9 text-[#063B5D]">
                Collaborate with HumanAbility to analyse recent updates to the CHC Community
                Services Training Package.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#535862]">
                The analysis will identify contemporary practice that could inform future updates
                to the Community Corrections specialisations in the officers Certificate III and
                Certificate IV in Correctional Practice.
              </p>
            </div>
            <span className="w-fit rounded-full bg-[#E8F7FE] px-4 py-2 text-xs font-bold uppercase text-[#0B6DA8]">
              Proposed 2026
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {strategyDetails.map(([label, value], index) => (
              <article
                key={label}
                style={{ animationDelay: `${index * 0.08}s` }}
                className="animate-card-entrance rounded-xl border border-[#BEEBFB] bg-[#FBFCFD] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
              >
                <p className="text-[10px] font-bold uppercase text-[#0B6DA8]">{label}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[#252D02]">{value}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <article className="rounded-xl border border-[#E9EAEB] bg-white p-5">
              <h3 className="text-base font-bold text-[#252D02]">Objective</h3>
              <p className="mt-3 text-sm leading-6 text-[#535862]">
                To provide the Correctional Services Subcommittee an analysis of contemporary
                community services practice that could inform the Community Corrections
                specialisations in the Certificate III and Certificate IV in Correctional Practice.
              </p>
            </article>
            <article className="rounded-xl border border-[#E9EAEB] bg-white p-5">
              <h3 className="text-base font-bold text-[#252D02]">Impact</h3>
              <p className="mt-3 text-sm leading-6 text-[#535862]">
                Support Correctional Services by providing analysis of contemporary practice in
                similar capability areas in different industry-sectors.
              </p>
            </article>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
            <h2 className="text-xl font-bold text-[#252D02]">Approach</h2>
            <p className="mt-3 text-sm leading-6 text-[#535862]">
              In collaboration with HumanAbility, undertake an analysis of recent CHC Community
              Services Training Package updates addressing the following capability areas:
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {capabilityAreas.map((area, index) => (
                <div
                  key={area}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  className="animate-card-entrance rounded-lg bg-[#E8F7FE] px-4 py-3 text-xs font-semibold leading-5 text-[#075D87] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D9F2FE]"
                >
                  {area}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#E8F7FE] text-[#0B6DA8]">
                <UsersRound className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase text-[#0B6DA8]">Key stakeholders</p>
                <h2 className="text-xl font-bold text-[#252D02]">Delivery partners</h2>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {stakeholders.map((stakeholder, index) => (
                <div
                  key={stakeholder}
                  style={{ animationDelay: `${index * 0.08}s` }}
                  className="animate-card-entrance flex items-center justify-between rounded-xl border border-[#BEEBFB] bg-[#FBFCFD] px-5 py-4 text-sm font-bold text-[#252D02] transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
                >
                  {stakeholder}
                  <ArrowRight className="h-4 w-4 text-[#0B6DA8]" />
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-[#535862]">
              The findings report will be presented to the Correctional Services Subcommittee for
              further action.
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase text-[#0B6DA8]">
                Strategy updates
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#252D02]">
                Update on 2024 and 2025 Workforce Strategies
              </h2>
            </div>
            <span className="w-fit rounded-full bg-[#E8F7FE] px-4 py-2 text-xs font-bold text-[#0B6DA8]">
              Select to open
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {updateCards.map((update, index) => {
              const isActive = activeUpdateId === update.id;
              return (
                <button
                  key={update.id}
                  type="button"
                  onClick={() => setActiveUpdateId(update.id)}
                  style={{ animationDelay: `${index * 0.06}s` }}
                  className={`animate-card-entrance min-h-[156px] rounded-xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-2 border-[#0B6DA8] bg-[#E8F7FE] shadow-sm"
                      : "border-[#E9EAEB] bg-white hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-[#0B6DA8]">
                    {update.eyebrow}
                  </span>
                  <strong className="mt-3 block text-sm leading-5 text-[#252D02]">
                    {update.title}
                  </strong>
                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase text-[#0B6DA8]">
                    Open <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              );
            })}
          </div>

          <article className="mt-6 animate-content-switch rounded-2xl border-2 border-[#0B6DA8] bg-[#FBFCFD] p-6">
            <p className="text-xs font-bold uppercase text-[#0B6DA8]">{activeUpdate.eyebrow}</p>
            <h3 className="mt-2 text-2xl font-bold text-[#063B5D]">{activeUpdate.title}</h3>
            <p className="mt-1 text-sm font-semibold text-[#535862]">{activeUpdate.subtitle}</p>
            <p className="mt-4 max-w-5xl text-sm leading-6 text-[#535862]">
              {activeUpdate.body}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="rounded-xl bg-white p-5">
                <h4 className="text-sm font-bold text-[#252D02]">Strategic alignment</h4>
                <ul className="mt-3 space-y-2 text-xs leading-5 text-[#535862]">
                  {activeUpdate.drivers.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B6DA8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-white p-5">
                <h4 className="text-sm font-bold text-[#252D02]">Next steps</h4>
                <ul className="mt-3 space-y-2 text-xs leading-5 text-[#535862]">
                  {activeUpdate.recommendations.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#38BDF8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
