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

const metrics = [
  {
    value: "3.3%",
    description: "ABS data indicates that the Federal and State/Territory Government public sector has increased between 2024-25 by 3.3 per cent.",
    source: "Australian Bureau of Statistics (ABS), Public sector employment and earnings, ABS, 2025",
  },
  {
    value: "505,200",
    description: "Public Administration industry group baseline, May 2025",
    source: "Jobs and Skills Australia (JSA), Employment Projections - May 2025 to May 2035 Table 5: Industry Group",
  },
  {
    value: "574,900",
    description: "Public Administration industry group projection, May 2035",
    source: "Jobs and Skills Australia (JSA), Employment Projections - May 2025 to May 2035 Table 5: Industry Group",
  },
];

const sources = [
  "This report refers to Public Administration and Safety when the Industry Data classifier is used.",
  "Australian Bureau of Statistics (ABS), Public sector employment and earnings, ABS, 2025, accessed 1 December 2025. This data also includes Local Government, which is classified as part of public sector employment and earnings.",
  "Jobs and Skills Australia (JSA), Jobs and Skills Australia, Employment Projections - May 2025 to May 2035 Table 5: Industry Group [data set], JSA, 2025, accessed 1 December 2025.",
  "JSA, Jobs and Skills Australia, Public Administration and Safety Overview, JSA, n.d., accessed 1 December 2025.",
];

export default function FederalStateWorkforceInsightOneView({ slug, report }: { slug: string; report: Report }) {
  return <div className="fstg-insights-page flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
    <ReportHeader slug={slug} report={report} currentPage="workforce_insights" />
    <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8">
      <ReportNavButtons slug={slug} currentPage="workforce_insight_1" prev={{ label: "Workforce Insights", href: `/reports/${slug}/workforce_insights` }} next={{ label: "Theme 1 – Insight 2", href: `/reports/${slug}/workforce_insight_2` }} prevPrefix="" nextPrefix="" />

      <section className="rounded-md border border-[#ECECE5] bg-white p-5 sm:p-6 animate-slide-up">
        <div className="flex gap-5 rounded-md border-l-[12px] border-[#754D32] bg-[#F8EEE8] px-5 py-6 sm:gap-7 sm:px-7">
          <span className="shrink-0 text-5xl font-light leading-none text-[#E5D2C5]">1</span>
          <div><p className="text-xs font-medium text-[#754D32]">Workforce Insights</p><h1 className="mt-5 text-xl font-bold sm:text-2xl">Theme One, Insight One</h1><p className="mt-5 max-w-[820px] text-xs leading-6">The Public Administration and Safety industry<sup>84</sup> is projected to grow steadily over the next decade, in line with broader increases in public sector workforce participation. Federal and State/Territory Governments operate under differing legislative and governance arrangements for workforce planning, resulting in variable levels of workforce planning maturity.</p></div>
        </div>
      </section>

      <section className="rounded-md border border-[#ECECE5] bg-white p-5 sm:p-6 animate-slide-up-delay">
        <p className="max-w-[820px] text-xs leading-6">ABS data indicates that the Federal and State/Territory Government public sector has increased between 2024-25 by 3.3 per cent.<sup>85</sup> According to Jobs and Skills Australia&apos;s employment projections, employment in the Public Administration industry group is projected to steadily grow over the next 10 years from the current baseline of 505,200 in May 2025 to 574,900 in May 2035.<sup>86</sup> These projections encompass government activities at the federal, state and territory levels only.<sup>87</sup> The future public service workforce will continue to have effects on national economic growth and productivity.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">{metrics.map((metric, index) => <div key={metric.value} className="flex min-h-[220px] flex-col rounded-md bg-[#F8EEE8] p-5 transition-[background-color,box-shadow,transform] duration-300 hover:bg-[#F6E9E0] hover:shadow-sm motion-safe:hover:-translate-y-0.5 animate-card-entrance" style={{ animationDelay: `${0.25 + index * 0.12}s` }}><strong className="text-2xl text-[#754D32]">{metric.value}</strong><p className="mt-2 text-xs font-medium leading-5 text-[#42463B]">{metric.description}</p><p className="mt-auto border-t border-[#DECFC5] pt-3 text-[10px] leading-5 text-[#694834]">Source: {metric.source}</p></div>)}</div>
      </section>

      <section className="rounded-md border border-[#ECECE5] bg-white p-5 sm:p-6"><h2 className="text-lg font-bold">Sources</h2><ol className="mt-5 space-y-3">{sources.map((source, index) => <li key={index} className="flex gap-3 text-[11px] leading-5 text-[#42463B]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#668B17] text-[10px] text-white">{84 + index}</span>{source}</li>)}</ol></section>
    </main>
    <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
  </div>;
}
