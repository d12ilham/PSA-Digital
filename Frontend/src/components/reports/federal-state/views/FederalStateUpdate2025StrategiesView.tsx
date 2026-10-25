"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import styles from "./FederalStateUpdate2025StrategiesView.module.css";

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

function StrategyNumber({ value }: { value: number }) {
  return <span data-strategy-number className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#754C2D] text-sm font-bold leading-none text-white">{value}</span>;
}

export default function FederalStateUpdate2025StrategiesView({ slug, report }: { slug: string; report: Report }) {
  const router = useRouter();
  const [firstOpen, setFirstOpen] = useState(true);
  const [secondOpen, setSecondOpen] = useState(true);

  useEffect(() => {
    const scrollToProposal = () => {
      const target = window.location.hash.slice(1);
      if (target === "fstg-2025-pathways" || target === "fstg-2025-skills-audit") {
        document.getElementById(target)?.scrollIntoView({ block: "start" });
      }
    };
    const frame = requestAnimationFrame(scrollToProposal);
    window.addEventListener("hashchange", scrollToProposal);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToProposal);
    };
  }, []);

  return <div className={`${styles.page} flex min-h-screen flex-col bg-gray-50 font-sans text-gray800 antialiased`}>
    <ReportHeader sectorPalette slug={slug} report={report} currentPage="update_2025_strategies" />
    <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 px-4 py-5 sm:px-6 lg:px-8">
      <ReportNavButtons sectorPalette slug={slug} currentPage="update_2025_strategies" prev={{ label: "2026 Proposed Federal and State/Territory Government Workforce Strategy", href: `/reports/${slug}/workforce_strategies` }} next={{ label: "Existing Industry-Sector Strategies", href: `/reports/${slug}/existing_strategies` }} prevPrefix="" />

      <section data-strategy-updates-header className="grid items-center gap-6 rounded-2xl border border-gray200 bg-white p-6 animate-slide-up sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto]"
      >
        <div>
        <h1 className="text-[30px] font-bold leading-tight text-[#754C2D] sm:text-[38px]">Update on 2025 Strategies</h1>
        <p className="mt-5 max-w-[72ch] text-xs leading-6 text-gray600">Public Skills Australia&apos;s 2025 Federal and State/Territory Government Workforce Insights Report identified the following strategies to support identified workforce challenges:</p>
        </div>
        <div data-strategy-update-graphics aria-hidden="true" className="flex shrink-0 items-center gap-4">
          <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gray200 bg-[#EED4C4]">
            <Image src="/images/reports/federal-state/strategy-updates/consultation.svg" alt="" width={48} height={48} className="h-12 w-12 object-contain" />
          </span>
          <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gray200 bg-[#EED4C4]">
            <Image src="/images/reports/federal-state/strategy-updates/contract.svg" alt="" width={48} height={48} className="h-12 w-12 object-contain" />
          </span>
        </div>
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <section id="fstg-2025-pathways" className="scroll-mt-24 rounded-2xl border border-gray200 border-t-[12px] border-t-[#754C2D] bg-white p-6 animate-slide-up-delay">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
          <h2 className="flex min-w-0 flex-1 items-start gap-3 text-lg font-bold leading-7 text-gray800"><StrategyNumber value={1} /><span>Proposal to Review VET Traineeship and Apprenticeship Pathways into the Public Sector</span></h2>
          <button type="button" aria-expanded={firstOpen} aria-controls="fstg-2025-proposal-one" onClick={() => setFirstOpen(!firstOpen)} className="inline-flex shrink-0 min-w-[100px] items-center justify-center gap-2 rounded-full border border-[#754C2D] bg-[#754C2D] text-white px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-[#EED4C4] hover:text-[#754C2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754C2D]">{firstOpen ? "Close" : "Open"}{firstOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button>
          </div>
          {firstOpen && <div id="fstg-2025-proposal-one" className="mt-5 border-t border-gray200 pt-5 text-xs leading-6 animate-content-switch"><span className="inline-flex max-w-full rounded-full bg-[#EED4C4] px-4 py-1.5 font-semibold text-[#754C2D]">Status: Consulted – not progressed further</span><p className="mt-6">The 2025 Federal and State/Territory Government Workforce Insights Report proposed to further scope the development of a strategy to investigate the consistency of implementation and outcomes from traineeship and apprenticeship programs in each public sector. The objective of the proposal was to determine if the consistency, accessibility and effectiveness of VET traineeship and apprenticeship pathways into public sector roles across Federal and State/Territory Governments should be investigated, mapped and good practice of the implementation of the programs identified.</p><p className="mt-6">Consultation on the proposal was undertaken with the following stakeholders:</p><ul data-stakeholder-chips className="mt-5 grid auto-rows-fr gap-2 sm:grid-cols-2">{stakeholders.map((name) => <li key={name} className="flex min-h-14 min-w-0 items-center rounded-md bg-[#EED4C4] px-4 py-3 text-[11px] font-medium leading-5 text-[#754C2D]">{name}</li>)}</ul><p className="mt-6">After consultation, it was determined that the industry did not need to explore this further. However, stakeholders highlighted that there is further work for Public Skills Australia to do to support the industry-sector, regarding updating pre-existing PSP Public Sector Training Package qualifications.</p></div>}
        </section>

        <section id="fstg-2025-skills-audit" className="scroll-mt-24 rounded-2xl border border-gray200 border-t-[12px] border-t-[#754C2D] bg-white p-6 animate-slide-up-delay">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
          <h2 className="flex min-w-0 flex-1 items-start gap-3 text-lg font-bold leading-7 text-gray800"><StrategyNumber value={2} /><span>Proposal to Conduct a Cross-Jurisdictional Current and Future Skills Audit for the Public Sector</span></h2>
          <button type="button" aria-expanded={secondOpen} aria-controls="fstg-2025-proposal-two" onClick={() => setSecondOpen(!secondOpen)} className="inline-flex shrink-0 min-w-[100px] items-center justify-center gap-2 rounded-full border border-[#754C2D] bg-[#754C2D] text-white px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-[#EED4C4] hover:text-[#754C2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754C2D]">{secondOpen ? "Close" : "Open"}{secondOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button>
          </div>
          {secondOpen && <div id="fstg-2025-proposal-two" className="mt-5 border-t border-gray200 pt-5 text-xs leading-6 animate-content-switch"><span className="inline-flex max-w-full rounded-full bg-[#EED4C4] px-4 py-1.5 font-semibold text-[#754C2D]">Status: Refined – carried into the 2026 proposed strategy</span><p className="mt-6">In consultation with industry members on this proposal, further refinement to the scope and focus of the strategy has been made. This strategy is now proposed here as Identify future skills needs for Federal and State/Territory Government.</p><h3 className="mt-6 text-lg font-medium text-[#754C2D]">Project Updates</h3><p className="mt-3">The following projects were identified as part of the 2024 Federal, State/Territory and Local Government Workforce Plan:</p><ol data-project-update-rows className="mt-5 grid auto-rows-fr gap-3">
              {projects.map((project, index) => (
                <li key={project} className="grid min-h-24 min-w-0 grid-cols-[32px_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-md bg-[#EED4C4] p-4 sm:grid-cols-[32px_minmax(0,1fr)_90px]">
                  <StrategyNumber value={index + 1} />
                  <span className="min-w-0 font-medium leading-5 text-[#754C2D]">{project}</span>
                  <button type="button" onClick={() => router.push(`/reports/${slug}/update_2025_project_${index + 1}`)} aria-label={`Open ${project}`} className="col-start-2 inline-flex min-h-10 w-[90px] items-center justify-center gap-2 justify-self-start rounded-full border border-[#754C2D] bg-[#754C2D] px-4 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-[#754C2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754C2D] sm:col-start-auto sm:justify-self-end">Open<ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
                </li>
              ))}
            </ol></div>}
        </section>
      </div>
    </main>
    <ReportFooter sectorPalette contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
  </div>;
}
