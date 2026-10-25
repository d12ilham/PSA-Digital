"use client";

import { workforceInsightsTheme, workforceInsightSummaries } from "../workforceInsightsContent";

import IndustryInsightCard from "./IndustryInsightCard";

import { Handshake } from "lucide-react";
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

const shortages = [
  { code: "511231", role: "Program or Project Administrator", locations: "WA and NT" },
  { code: "411636", role: "Welfare Worker", locations: "VIC (Regional) and NT" },
  { code: "511131", role: "Contract Administrator", locations: "SA and WA" },
  { code: "222131", role: "Human Resources Adviser", locations: "SA and NT" },
];

const sources = [
  "Jobs and Skills Australia (JSA), Occupational Shortage List, JSA, 2025, accessed 8 December 2025.",
  "Australian Government, About GovAI, Australian Government, 2025, accessed 9 February 2026.",
];

export default function FederalStateWorkforceInsightTwoView({ slug, report }: { slug: string; report: Report }) {
  return <div className="fstg-insights-page flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
    <ReportHeader slug={slug} report={report} currentPage="workforce_insights" />
    <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8">
      <ReportNavButtons slug={slug} currentPage="workforce_insight_2" prev={{ label: "Insight 1 – Productivity and Economic Growth", href: `/reports/${slug}/workforce_insight_1` }} next={{ label: "Insight 3 – Future Skills for the Public Service", href: `/reports/${slug}/workforce_insight_3` }} prevPrefix="" nextPrefix="" />

      <section className="rounded-md border border-[#ECECE5] bg-white p-5 sm:p-6 animate-slide-up">
        <div className="flex gap-5 rounded-md border-l-[12px] border-[#754D32] bg-[#F8EEE8] px-5 py-6 sm:gap-7 sm:px-7">
          <span className="shrink-0 text-5xl font-light leading-none text-[#E5D2C5]">2</span>
          <div><p className="text-xs font-medium text-[#754D32]">Theme 1 · {workforceInsightsTheme} · Insight 2</p><h1 className="mt-4 text-xl font-bold sm:text-2xl">{workforceInsightSummaries[1].title}</h1><p className="mt-4 max-w-[820px] text-xs leading-6">{workforceInsightSummaries[1].summary}</p></div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
        <article data-workforce-gaps-narrative className="min-w-0 rounded-md border border-[#ECECE5] bg-white p-5 text-xs leading-6 animate-slide-up-delay sm:p-6">
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F8EEE8] text-[#754D32]"><Handshake aria-hidden="true" className="h-6 w-6" strokeWidth={1.25} /></span>
          <p>All Federal and State/Territory Governments are facing persistent and increasingly acute skills gaps. These gaps are anticipated to increase as projected employment growth in the Public Administration and Safety industry continues to increase. The 2025 Federal and State/Territory Government Workforce Insights Report detailed occupational shortages as found by Jobs and Skills Australia in the Federal and State/Territory Government industry-sector. Several of these continue to be in shortage as below:<sup><a href="#workforce-gaps-source-93" aria-label="Source 93" className="underline">93</a></sup></p>
          <div role="region" aria-label="Occupations in shortage" tabIndex={0} className="mt-4 overflow-x-auto rounded-md border border-[#E8E6DD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754C2D]"><table className="w-full min-w-[520px] border-collapse text-left text-xs"><caption className="sr-only">Workforce Gaps — occupations in shortage by jurisdiction</caption><thead className="bg-[#F5F5F5]"><tr><th scope="col" className="w-[23%] border-r border-[#E8E6DD] px-4 py-3 font-medium">OSCA Code</th><th scope="col" className="w-[45%] border-r border-[#E8E6DD] px-4 py-3 font-medium">Role</th><th scope="col" className="px-4 py-3 font-medium">In shortage</th></tr></thead><tbody>{shortages.map((item) => <tr key={item.code} className="border-t border-[#E8E6DD] transition-colors hover:bg-[#FAFAF0]"><td className="border-r border-[#E8E6DD] px-4 py-3">{item.code}</td><td className="border-r border-[#E8E6DD] px-4 py-3">{item.role}</td><td className="px-4 py-3">{item.locations}</td></tr>)}</tbody></table></div>
          <p className="mt-4">In addition, shortage in digital, ICT and cyber-security skills are evident in reporting on the APS, as well as NSW, QLD, SA, Victoria and the NT Public Services, with governments emphasising capability building in areas such as data analytics, cloud computing, ICT support and information security.</p>
          <p className="mt-4">In anticipation of growing AI skills requirement, the APS has deployed a new development initiative, &apos;GovAI&apos;. This whole-of-government service is designed to uplift AI capabilities across the APS by providing secure learning resources, curated AI tools and peer collaboration spaces. The aim is to enable public servants to develop practical skills in using AI responsibly and effectively to improve service delivery, streamline work processes and enhance productivity.<sup><a href="#workforce-gaps-source-94" aria-label="Source 94" className="underline">94</a></sup> The GovAI model provides a model for skills development in AI which may support workforce capability uplift.</p>
        </article>
        <IndustryInsightCard headingAs="h2" className="animate-slide-up-delay"><p>AI was identified as an emerging skills gap across the public sector consistently noting the need to uplift workforce capability to support future-ready service delivery.</p><p>Several stakeholders indicated that demand for digital, ICT and cyber-security skills, are the most critical shortages and are further compounded by increasing competition from the private sector for digitally proficient and highly skilled employees. Stakeholders highlighted that talent attraction and retention, particularly in digital and technical roles, is an ongoing challenge across the public sector.</p><p>Jurisdictional workforce strategies to respond to these requirements include: expanded VET funding, entry-level recruitment reforms and targeted capability programs such as the APS Academy, the ACTPS Career Path Graduate Model, NT digital skills boot camps and other diversity and capability initiatives.</p></IndustryInsightCard>
      </div>

      <section className="rounded-md border border-[#ECECE5] bg-white p-5 sm:p-6 animate-slide-up-delay"><h2 className="text-lg font-bold">Sources</h2><ol start={93} className="mt-5 space-y-3">{sources.map((source, index) => <li id={`workforce-gaps-source-${93 + index}`} key={index} className="flex gap-3 text-[11px] leading-5 text-[#42463B]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#668B17] text-[10px] text-white">{93 + index}</span>{source}</li>)}</ol></section>
    </main>
    <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
  </div>;
}
