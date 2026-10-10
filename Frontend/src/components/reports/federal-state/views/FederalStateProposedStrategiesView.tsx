"use client";

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

const strategyDetails = [
  { label: "Workforce Insight", value: "Future of the Public Service" },
  { label: "JSC Function", value: "Industry Stewardship" },
  { label: "Objective", value: "To support the Federal and State/Territory public service in identifying future workforce skilling needs." },
  { label: "Approach", value: "Using a strategic-foresight approach, convene 'Future Skills for the Public Service' workshops to identify future skilling needs across jurisdictions to support clarifying emerging skills gaps and identify where nationally accredited VET can support capability development." },
  { label: "Deliverable", value: "Findings report" },
  { label: "Impact", value: "To support the Federal and State/Territory Government public service by providing critical insight into the future needs of public service workforces which can support workforce planning." },
  { label: "Anticipated timing", value: "12-month project" },
];

export default function FederalStateProposedStrategiesView({ slug, report }: { slug: string; report: Report }) {
  return <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
    <ReportHeader slug={slug} report={report} currentPage="workforce_strategies" />
    <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 px-4 py-5 sm:px-6 lg:px-8">
      <ReportNavButtons slug={slug} currentPage="workforce_strategies" prev={{ label: "Theme 2 – PSA Insight 2", href: `/reports/${slug}/workforce_insights` }} next={{ label: "Update on 2025 Workforce Strategies", href: `/reports/${slug}/update_2025_strategies` }} prevPrefix="" />

      <section className="rounded-md border border-[#ECECE5] bg-white px-5 py-6 animate-slide-up sm:px-6 sm:py-7">
        <span className="inline-flex rounded-full bg-[#754D32] px-4 py-1.5 text-xs font-medium text-white">Workforce Strategies</span>
        <h1 className="mt-6 max-w-[960px] text-[30px] font-bold leading-tight sm:text-[38px]">2026 Proposed Federal and State/<br className="hidden lg:block" />Territory Government Workforce Strategy</h1>
        <p className="mt-5 max-w-[840px] text-xs leading-6">Public Skills Australia proposes the following strategy aligned to the workforce insights identified to support the Federal and State/Territory Government industry-sector.</p>
      </section>

      <section className="min-h-[570px] rounded-md border border-[#ECECE5] border-t-[10px] border-t-[#754D32] bg-white px-5 py-6 animate-slide-up-delay sm:px-6 sm:py-7">
        <span className="inline-flex rounded-full bg-[#754D32] px-4 py-1.5 text-xs font-medium text-white">STRATEGY 1</span>
        <h2 className="mt-6 text-lg font-bold">Identify future skills needs for Federal and State/Territory Government</h2>
        <p className="mt-3 text-xs leading-6">Workforce Insight: Emerging technologies 1 · JSC Function: Training Product Development</p>
        <div className="my-6 border-t border-[#D8D8D2]" />
        <dl className="max-w-[850px] space-y-5">{strategyDetails.map(({ label, value }) => <div key={label}><dt className="text-xs font-bold">{label}:</dt><dd className="mt-2 text-xs leading-6 text-[#696969]">{value}</dd></div>)}<div><dt className="text-xs font-bold">Key Stakeholders:</dt><dd className="mt-2"><span className="inline-flex rounded-full bg-[#F8EEE8] px-4 py-1.5 text-[11px] font-medium text-[#754D32]">•&nbsp; Public Sector Commissions or equivalent</span></dd></div></dl>
      </section>
    </main>
    <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
  </div>;
}
