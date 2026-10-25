"use client";

import { workforceInsightsTheme, workforceInsightSummaries } from "../workforceInsightsContent";

import IndustryInsightCard from "./IndustryInsightCard";

import { ChartNoAxesCombined } from "lucide-react";
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

const sources = [
  "Organisation for Economic Co-operation and Development (OECD), OECD Economic Surveys: Australia 2026, OECD, 2026, accessed 9 February 2026.",
  "OECD, OECD Economic Surveys: Australia 2026, OECD, 2026, accessed 9 February 2026.",
  "ABS, Australian National Accounts: State Accounts, ABS, 2025, accessed 8 December 2025.",
  "ABS, Australian National Accounts: State Accounts, ABS, 2025, accessed 8 December 2025.",
  "Australian Bureau of Statistics (ABS), Australian National Accounts: National Income, Expenditure and Product, ABS, 2025, accessed 9 February 2026.",
];

export default function FederalStateWorkforceInsightOneView({ slug, report }: { slug: string; report: Report }) {
  return <div className="fstg-insights-page flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
    <ReportHeader slug={slug} report={report} currentPage="workforce_insights" />
    <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8">
      <ReportNavButtons slug={slug} currentPage="workforce_insight_1" prev={{ label: "Theme Overview – Future of the Public Service", href: `/reports/${slug}/workforce_insights#theme-one` }} next={{ label: "Insight 2 – Workforce Gaps", href: `/reports/${slug}/workforce_insight_2` }} prevPrefix="" nextPrefix="" />

      <section className="rounded-md border border-[#ECECE5] bg-white p-5 sm:p-6 animate-slide-up">
        <div className="flex gap-5 rounded-md border-l-[12px] border-[#754D32] bg-[#F8EEE8] px-5 py-6 sm:gap-7 sm:px-7">
          <span className="shrink-0 text-5xl font-light leading-none text-[#E5D2C5]">1</span>
          <div><p className="text-xs font-medium text-[#754D32]">Theme 1 · {workforceInsightsTheme} · Insight 1</p><h1 className="mt-4 text-xl font-bold sm:text-2xl">{workforceInsightSummaries[0].title}</h1><p className="mt-4 max-w-[820px] text-xs leading-6">{workforceInsightSummaries[0].summary}</p></div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
        <article data-productivity-narrative className="rounded-md border border-[#ECECE5] bg-white p-5 text-xs leading-6 animate-slide-up-delay sm:p-6">
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F8EEE8] text-[#754D32]"><ChartNoAxesCombined aria-hidden="true" className="h-6 w-6" strokeWidth={1.25} /></span>
          <p>Productivity growth in Australia has slowed in recent decades. The Organisation for Economic Co-operation and Development (OECD) observed that labour productivity growth in the five years preceding the COVID-19 pandemic was around half the average rate recorded over the previous 50 years.<sup><a href="#productivity-source-88" aria-label="Source 88" className="underline">88</a></sup> The OECD highlighted lower productivity in the mining sector and the expansion of the Public Administration and Safety sector as key factors in this slowdown.<sup><a href="#productivity-source-89" aria-label="Source 89" className="underline">89</a></sup></p>
          <p className="mt-4">However, whilst some analyses consider public sector growth to provide downward pressure on productivity growth, others identify how efficient public service workforces can contribute directly and indirectly to economic growth. In 2024-25, the Gross State Product (GSP) of states and territories grew by 1.4 per cent, which has been attributed to, in part, to the Public Administration and Safety industry.<sup><a href="#productivity-source-90" aria-label="Source 90" className="underline">90</a></sup> In the ACT, increased public sector activity has been highlighted as a driver for GSP growth.<sup><a href="#productivity-source-91" aria-label="Source 91" className="underline">91</a></sup> Alongside their direct impact on economic measures such as GSP, productive public sector agencies have a broader indirect influence on the economy through ties to the private sector. Public sector funding for education, the flow on benefits of public infrastructure projects, and efficient service delivery are examples of how public sector workforces can contribute indirectly to economic growth and productivity.</p>
          <p className="mt-4">While it is challenging to capture the full impact of the public sector on productivity, reports from the ABS indicate that public demand, driven by government expenditure and investment, supports Gross Domestic Product (GDP) growth.<sup><a href="#productivity-source-92" aria-label="Source 92" className="underline">92</a></sup> Therefore, an effective and skilled public sector plays a critical role in supporting economic growth and productivity as it continues to expand.</p>
        </article>
        <IndustryInsightCard headingAs="h2" className="animate-slide-up-delay"><p>There is a need to regularly upskill the public sector workforce for at least the next 5-10 years in technology, digital literacy and AI use, however this may shift as younger generations enter the workforce with those skills already. The public sector must remain agile to emerging skilling needs following the emergence of AI.</p></IndustryInsightCard>
      </section>

      <section className="rounded-md border border-[#ECECE5] bg-white p-5 sm:p-6 animate-slide-up-delay"><h2 className="text-lg font-bold">Sources</h2><ol start={88} className="mt-5 space-y-3">{sources.map((source, index) => <li id={`productivity-source-${88 + index}`} key={index} className="flex gap-3 text-[11px] leading-5 text-[#42463B]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#668B17] text-[10px] text-white">{88 + index}</span>{source}</li>)}</ol></section>
    </main>
    <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
  </div>;
}
