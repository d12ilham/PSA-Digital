"use client";

import { workforceInsightsTheme, workforceInsightSummaries } from "../workforceInsightsContent";


import Link from "next/link";
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

export default function FederalStateWorkforceInsightThreeView({ slug, report }: { slug: string; report: Report }) {
  return <div className="fstg-insights-page flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
    <ReportHeader slug={slug} report={report} currentPage="workforce_insights" />
    <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8">
      <ReportNavButtons slug={slug} currentPage="workforce_insight_3" prev={{ label: "Insight 2 – Workforce Gaps", href: `/reports/${slug}/workforce_insight_2` }} next={{ label: "2026 Proposed Workforce Strategy", href: `/reports/${slug}/workforce_strategies` }} prevPrefix="" nextPrefix="" />

      <section className="rounded-md border border-[#ECECE5] bg-white p-5 sm:p-6 animate-slide-up">
        <div className="flex gap-5 rounded-md border-l-[12px] border-[#754D32] bg-[#F8EEE8] px-5 py-6 sm:gap-7 sm:px-7">
          <span className="shrink-0 text-5xl font-light leading-none text-[#E5D2C5]">3</span>
          <div><p className="text-xs font-medium text-[#754D32]">Theme 1 · {workforceInsightsTheme} · Insight 3</p><h1 id="future-skills-title" className="mt-4 text-xl font-bold sm:text-2xl">{workforceInsightSummaries[2].title}</h1><p className="mt-4 max-w-[820px] text-xs leading-6">A skilled, adaptable and future-ready public service workforce has been identified as a priority, particularly in relation to technology, digital literacy and effective use of AI.</p></div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
        <section data-future-skills-content aria-labelledby="future-skills-title" className="min-w-0 rounded-md border border-[#ECECE5] bg-white p-5 text-xs leading-6 animate-slide-up-delay sm:p-6"><p>The 2025 Federal and State/Territory Government Workforce Insights Report highlighted that each state and territory has different legislative requirements for workforce planning, and therefore different levels of workforce planning maturity. This theme remains prevalent in 2026, within the context of planning for the future of the public service, with changing expectations of government services, and trust in the public service.</p><p className="mt-4">Public Skills Australia intends to facilitate &apos;Future Skills for the Public Service&apos; workshops to provide a forum for cross-jurisdictional knowledge sharing. Drawing on a strategic foresight approach, these discussions would identify shared skills needs and assess future skilling requirements across the public service. Public Skills Australia intends to examine how the VET system could be used or adapted to support these emerging workforce needs. Consultations with stakeholders indicated interest in, and support for, this approach, particularly given that each jurisdiction has different levels of workforce planning and understanding of skills and workforce needs.</p></section>
        <aside className="rounded-md border-l-[10px] border-[#754D32] bg-[#F4EADF] p-5 animate-slide-up-delay sm:p-6"><div className="rounded-md bg-white p-5 sm:p-6"><p className="text-xs text-[#696969]">Related content</p><h2 className="mt-4 text-lg font-semibold leading-7 text-[#555]">Identify future skills needs for Federal and State/Territory Government</h2><Link href={`/reports/${slug}/workforce_strategies`} className="mt-5 inline-flex min-h-10 items-center rounded-full bg-[#754D32] px-5 text-xs font-semibold text-white transition-colors hover:bg-[#5D3B26] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754D32]">Open 2026 Proposed Workforce Strategy</Link></div></aside>
      </div>


    </main>
    <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
  </div>;
}
