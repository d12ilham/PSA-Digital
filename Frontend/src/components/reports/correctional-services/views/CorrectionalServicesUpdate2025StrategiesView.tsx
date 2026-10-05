"use client";

import React from "react";
import { ArrowRight, RefreshCw } from "lucide-react";
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

const projects = [
  {
    id: "lifecycle",
    number: "Project 1",
    title: "Correctional Services Skills and Training Pathways",
    focus: "Workforce Lifecycle",
    challenge:
      "Research and consultations indicated challenges across all stages of the workforce lifecycle contributing to increased workforce challenges.",
    summary:
      "The 2025 Correctional Services Workforce Insights Report identified a strategy to review skills maintenance approaches throughout the workforce lifecycle. This was later retitled as the Correctional Services Skills and Training Pathways project and funded through activity project funding.",
    progress:
      "This project is now in progress and is anticipated for delivery in December 2026.",
    nextSteps: [
      "Outline career and training pathways into key roles.",
      "Identify key stages of development undertaken across jurisdictions and the use of accredited training.",
      "Identify areas of non-accredited training used to bolster accredited courses.",
      "Examine areas of potential update to the CSC Correctional Services Training Package.",
    ],
    aims: [
      "Map current occupational, career and training pathways within jurisdictions.",
      "Develop advice to strengthen occupational and educational pathways in Correctional Services.",
      "Identify opportunities for career progress into specialist operational roles to promote retention.",
      "Develop career outcomes and better training pathways to onboard, maintain and upskill employees.",
      "Identify areas of inconsistency in non-accredited training.",
    ],
  },
  {
    id: "first-nations",
    number: "Project 2",
    title: "First Nations Workforce Participation",
    focus: "Barriers, participation and retention",
    challenge:
      "The high attrition of First Nations employees is a challenge for the Correctional Services industry-sector, with formal cultural safety and wellbeing supports adding further complexity in small and regional facilities.",
    summary:
      "A proposal to Investigate Barriers to First Nations Workforce Participation was put forward in the 2025 Correctional Services Workforce Insights Report. The strategy sought to investigate barriers for First Nations people to participate in the Correctional Services workforce, focusing on attraction, attrition and retention.",
    progress:
      "Public Skills Australia has begun commissioning a research project through a First Nations-led research organisation on First Nations workforce participation across Public Safety and Government industry-sectors, including Correctional Services.",
    nextSteps: [
      "Collect and analyse statistical workforce participation data broken down by age, gender, qualification enrolment and attainment.",
      "Collect qualitative data through interviews and case studies.",
      "Identify personal stories of success in Public Safety and Government industry-sectors.",
      "Understand challenges faced by First Nations people and the factors that supported successful employment or aligned training.",
    ],
    aims: [
      "Advance Closing the Gap priority reforms through industry research.",
      "Inform attraction, retention and attrition responses.",
      "Strengthen evidence for culturally safe workforce participation pathways.",
      "Support future workforce planning for regional and custodial contexts.",
    ],
  },
];

export default function CorrectionalServicesUpdate2025StrategiesView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const [activeProjectId, setActiveProjectId] = React.useState("lifecycle");
  const activeProject =
    projects.find((project) => project.id === activeProjectId) ?? projects[0];

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#38BDF8]/30 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="update_2025_strategies" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        <ReportNavButtons slug={slug} currentPage="update_2025_strategies" />

        <section className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-4">
            <p className="animate-slide-up text-xs font-semibold uppercase leading-6 text-[#0B6DA8]">
              Workforce Strategies · Update on 2025 Strategies
            </p>
            <h1 className="animate-slide-up text-3xl sm:text-4xl font-bold text-[#063B5D]">
              Update on 2025 Workforce Strategies
            </h1>
            <p className="animate-slide-up-delay max-w-4xl text-sm leading-relaxed text-[#535862]">
              Public Skills Australia&apos;s 2025 Correctional Services Workforce Plan identified
              two challenges impacting the Correctional Services workforce. To support the
              industry-sector to address these challenges, Public Skills Australia completed two
              projects in 2025 to provide deeper insights into their causes and potential
              mitigation strategies.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="animate-hero-pulse-settle flex h-36 w-36 items-center justify-center rounded-full bg-[#E8F7FE]">
              <RefreshCw className="h-20 w-20 text-[#0B6DA8]" strokeWidth={1.5} />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project, index) => {
            const isActive = project.id === activeProjectId;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveProjectId(project.id)}
                style={{ animationDelay: `${index * 0.12}s` }}
                className={`animate-card-entrance min-h-[230px] rounded-2xl border p-6 text-left transition-all duration-300 ${
                  isActive
                    ? "border-2 border-[#0B6DA8] bg-[#E8F7FE] shadow-sm"
                    : "border-[#E9EAEB] bg-white hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
                }`}
              >
                <span className="text-xs font-bold uppercase text-[#0B6DA8]">
                  {project.number}
                </span>
                <h2 className="mt-2 text-xl font-bold text-[#252D02]">{project.title}</h2>
                <p className="mt-2 text-sm font-semibold text-[#075D87]">{project.focus}</p>
                <p className="mt-4 text-sm leading-6 text-[#535862]">{project.challenge}</p>
                <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#38BDF8] px-4 py-2 text-xs font-bold uppercase text-[#063B5D]">
                  Open <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            );
          })}
        </section>

        <section className="animate-content-switch rounded-2xl border-2 border-[#0B6DA8] bg-white p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase text-[#0B6DA8]">
                {activeProject.number}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#063B5D]">
                {activeProject.title}
              </h2>
              <p className="mt-2 text-sm font-semibold text-[#535862]">
                {activeProject.focus}
              </p>
            </div>
            <span className="w-fit rounded-full bg-[#E8F7FE] px-4 py-2 text-xs font-bold uppercase text-[#0B6DA8]">
              Project progress update
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <article className="rounded-xl border border-[#E9EAEB] bg-[#FBFCFD] p-5">
              <h3 className="text-base font-bold text-[#252D02]">Summary</h3>
              <p className="mt-3 text-sm leading-6 text-[#535862]">{activeProject.summary}</p>
            </article>
            <article className="rounded-xl border border-[#BEEBFB] bg-[#E8F7FE] p-5">
              <h3 className="text-base font-bold text-[#252D02]">Project Progress Update</h3>
              <p className="mt-3 text-sm leading-6 text-[#535862]">{activeProject.progress}</p>
            </article>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <article className="rounded-xl border border-[#E9EAEB] bg-white p-5">
              <h3 className="text-base font-bold text-[#252D02]">This project aims to</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#535862]">
                {activeProject.aims.map((aim) => (
                  <li key={aim} className="flex gap-2">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B6DA8]" />
                    <span>{aim}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-xl border border-[#E9EAEB] bg-white p-5">
              <h3 className="text-base font-bold text-[#252D02]">Next steps</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#535862]">
                {activeProject.nextSteps.map((step) => (
                  <li key={step} className="flex gap-2">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#38BDF8]" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
