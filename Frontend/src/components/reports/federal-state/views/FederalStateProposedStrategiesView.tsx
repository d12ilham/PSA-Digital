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
  { label: "Impact", value: "To support the Federal and State/Territory Government public service by providing critical insight to the future needs of public service workforces which can support workforce planning." },
  { label: "Anticipated timing", value: "12-month project" },
];

export default function FederalStateProposedStrategiesView({ slug, report }: { slug: string; report: Report }) {
  return <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-gray800 antialiased motion-reduce:[&_*]:animate-none motion-reduce:[&_*]:transition-none">
    <ReportHeader slug={slug} report={report} currentPage="workforce_strategies" />
    <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 px-4 py-5 sm:px-6 lg:px-8">
      <ReportNavButtons slug={slug} currentPage="workforce_strategies" prev={{ label: "Theme 2 – PSA Insight 2", href: `/reports/${slug}/workforce_insights` }} next={{ label: "Update on 2025 Workforce Strategies", href: `/reports/${slug}/update_2025_strategies` }} prevPrefix="" />

      <section className="rounded-md border border-[#ECECE5] bg-white px-5 py-6 animate-slide-up sm:px-6 sm:py-7">
        <span className="inline-flex rounded-full bg-[#754D32] px-4 py-1.5 text-xs font-medium text-white">Workforce Strategies</span>
        <h1 className="mt-6 max-w-[960px] text-[30px] font-bold leading-tight sm:text-[38px]">2026 Proposed Federal and State/<br className="hidden lg:block" />Territory Government Workforce Strategy</h1>
        <p className="mt-5 max-w-[80ch] text-xs leading-relaxed text-gray600">Public Skills Australia proposes the following strategy aligned to the workforce insights identified to support the Federal and State/Territory Government industry-sector.</p>
      </section>

      <section aria-labelledby="proposed-strategy-title" className="rounded-md border border-gray200 border-t-8 border-t-[#694834] bg-white p-6 animate-slide-up-delay">
        <span className="inline-flex rounded-full bg-[#694834] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">STRATEGY 1</span>
        <h2 id="proposed-strategy-title" className="mt-4 text-base font-bold leading-snug sm:text-lg">Identify future skills needs for Federal and State/Territory Government</h2>
        <p className="mt-4 max-w-[80ch] text-xs leading-relaxed text-gray600">Public Skills Australia will use a strategic-foresight approach to convene jurisdictional workshops to identify where nationally accredited Vocational Education and Training (VET) training can support capability development.</p>
        <div className="my-4 border-t border-gray200" />
        <dl className="max-w-[80ch] space-y-3.5 pt-1">
          {strategyDetails.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-xs font-bold">{label}:</dt>
              <dd className="text-xs leading-relaxed text-gray600">{value}</dd>
            </div>
          ))}
          <div className="pt-1">
            <dt className="mb-1.5 text-xs font-bold">Key Stakeholders:</dt>
            <dd><span className="inline-block max-w-full rounded-full border border-[#F0C9B6] bg-[#FBE8DE] px-3.5 py-1 text-xs font-medium text-[#8C4A28]">Public Sector Commissions or equivalent</span></dd>
          </div>
        </dl>
      </section>
    </main>
    <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
  </div>;
}
