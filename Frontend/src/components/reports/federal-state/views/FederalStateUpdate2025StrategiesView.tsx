"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

interface Report {
  id: string;
  title: string;
  slug: string;
  status: string;
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: { label: string };
}

const stakeholders = [
  "Australian Public Sector Commission",
  "Queensland Public Sector Commission",
  "Community Public Sector Commission",
  "Department of Premier and Cabinet - Tasmania",
  "Victorian Public Sector Commission",
  "Western Australia Public Sector Commission",
];

const projects = [
  "Auslan, Interpreting and Translating Qualification Review",
  "Review of Government Investigations Qualifications",
  "Review of Procurement and Contracting Qualifications",
];

export default function FederalStateUpdate2025StrategiesView({ slug, report }: { slug: string; report: Report }) {
  const router = useRouter();
  const [firstOpen, setFirstOpen] = useState(true);
  const [secondOpen, setSecondOpen] = useState(true);

  return <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
    <ReportHeader slug={slug} report={report} currentPage="update_2025_strategies" />
    <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 px-4 py-5 sm:px-6 lg:px-8">
      <ReportNavButtons slug={slug} currentPage="update_2025_strategies" prev={{ label: "2026 Proposed Federal and State/Territory Government Workforce Strategy", href: `/reports/${slug}/workforce_strategies` }} next={{ label: "Existing Industry-Sector Strategies", href: `/reports/${slug}/existing_strategies` }} prevPrefix="" />

      <section className="rounded-md border border-[#ECECE5] bg-white px-5 py-6 animate-slide-up sm:px-6 sm:py-7">
        <span className="inline-flex rounded-full bg-[#754D32] px-4 py-1.5 text-[11px] font-medium text-white">Status: Consulted – not progressed further</span>
        <h1 className="mt-5 text-[30px] font-bold leading-tight sm:text-[38px]">Update on 2025 Strategies</h1>
        <p className="mt-5 max-w-[800px] text-xs leading-6">Public Skills Australia&apos;s 2025 Federal and State/Territory Government Workforce Insights Report identified the following strategies to support identified workforce challenges:</p>
      </section>

      <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
        <section className="rounded-md bg-[#F4EADF] p-5 animate-slide-up-delay sm:p-6">
          <h2 className="min-h-[3.5rem] text-lg font-medium leading-7 text-[#694834]">1. Proposal to Review VET Traineeship and Apprenticeship Pathways into the Public Sector</h2>
          <button type="button" aria-expanded={firstOpen} aria-controls="fstg-2025-proposal-one" onClick={() => setFirstOpen(!firstOpen)} className="mt-5 inline-flex min-w-[100px] items-center justify-center gap-2 rounded-full bg-[#8AC900] px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-[#9BDC16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754D32]">{firstOpen ? "Close" : "Open"}{firstOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button>
          {firstOpen && <div id="fstg-2025-proposal-one" className="mt-5 rounded-md bg-white p-5 text-xs leading-6 animate-content-switch sm:p-6"><span className="inline-flex max-w-full rounded-full bg-[#F8EEE8] px-4 py-1.5 font-semibold text-[#694834]">Status: Consulted – not progressed further</span><p className="mt-6">The 2025 Federal and State/Territory Government Workforce Insights Report proposed to further scope the development of a strategy to investigate the consistency of implementation and outcomes from traineeship and apprenticeship programs in each public sector. The objective of the proposal was to determine if the consistency, accessibility and effectiveness of VET traineeship and apprenticeship pathways into public sector roles across Federal and State/Territory Governments should be investigated, mapped and good practice of the implementation of the programs identified.</p><p className="mt-6">Consultation on the proposal was undertaken with the following stakeholders:</p><ul className="mt-5 flex flex-wrap gap-2">{stakeholders.map((name) => <li key={name} className="rounded-md bg-[#F8EEE8] px-4 py-2 text-[11px] font-medium text-[#694834]">{name}</li>)}</ul><p className="mt-6">After consultation, it was determined that the industry did not need to explore this further. However, stakeholders highlighted that there is further work for Public Skills Australia to do to support the industry-sector, regarding updating pre-existing PSP Public Sector Training Package qualifications.</p></div>}
        </section>

        <section className="rounded-md bg-[#F4EADF] p-5 animate-slide-up-delay sm:p-6">
          <h2 className="min-h-[3.5rem] text-lg font-medium leading-7 text-[#694834]">2. Proposal to Conduct a Cross-Jurisdictional Current and Future Skills Audit for the Public Sector</h2>
          <button type="button" aria-expanded={secondOpen} aria-controls="fstg-2025-proposal-two" onClick={() => setSecondOpen(!secondOpen)} className="mt-5 inline-flex min-w-[100px] items-center justify-center gap-2 rounded-full bg-[#8AC900] px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-[#9BDC16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754D32]">{secondOpen ? "Close" : "Open"}{secondOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button>
          {secondOpen && <div id="fstg-2025-proposal-two" className="mt-5 min-h-[580px] rounded-md bg-white p-5 text-xs leading-6 animate-content-switch sm:p-6"><span className="inline-flex max-w-full rounded-full bg-[#F8EEE8] px-4 py-1.5 font-semibold text-[#694834]">Status: Refined – carried into the 2026 proposed strategy</span><p className="mt-6">In consultation with industry members on this proposal, further refinement to the scope and focus of the strategy has been made. This strategy is now proposed here as Identify future skills needs for Federal and State/Territory Government.</p><h3 className="mt-6 text-lg font-medium text-[#694834]">Project Updates</h3><p className="mt-3">The following projects were identified as part of the 2024 Federal, State/Territory and Local Government Workforce Plan:</p><div className="mt-5 space-y-2">{projects.map((project, index) => <div key={project} className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-[#EBCDBD] px-4 py-2"><span className="font-medium text-[#694834]">{index + 1}. {project}</span><button type="button" onClick={() => router.push(`/reports/${slug}/update_2025_project_${index + 1}`)} aria-label={`Open ${project}`} className="inline-flex min-w-[90px] items-center justify-center gap-2 rounded-full bg-[#8AC900] px-4 py-2 font-semibold text-[#252D02] transition-colors hover:bg-[#9BDC16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754D32]">Open<ArrowRight aria-hidden="true" className="h-4 w-4" /></button></div>)}</div></div>}
        </section>
      </div>
    </main>
    <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
  </div>;
}
