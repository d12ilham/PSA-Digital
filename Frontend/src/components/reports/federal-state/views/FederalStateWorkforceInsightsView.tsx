"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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

const insights = [
  {
    label: "Theme One, Insight One",
    summary: "The Public Administration and Safety industry is projected to grow steadily over the next decade, in line with broader increases in public sector workforce participation. Federal and State/Territory Governments operate under differing legislative and governance arrangements for workforce planning, resulting in variable levels of workforce planning maturity.",
  },
  {
    label: "Theme One, Insight Two",
    summary: "As Australia’s productivity growth remains relatively low, the effectiveness of the APS remains critical to supporting economic performance.",
  },
  {
    label: "Theme One, Insight Three",
    summary: "A skilled, adaptable and future-ready public service workforce has been identified as a priority, particularly in relation to technology, digital literacy and effective use of AI.",
  },
];

export default function FederalStateWorkforceInsightsView({ slug, report }: { slug: string; report: Report }) {
  const router = useRouter();
  const [overviewOpen, setOverviewOpen] = useState(true);
  const themeRef = useRef<HTMLElement>(null);
  const sourcesRef = useRef<HTMLElement>(null);
  const [themeVisible, setThemeVisible] = useState(false);
  const [sourcesVisible, setSourcesVisible] = useState(false);

  useEffect(() => {
    const targets = [
      { element: themeRef.current, reveal: setThemeVisible },
      { element: sourcesRef.current, reveal: setSourcesVisible },
    ];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      targets.forEach(({ reveal }) => reveal(true));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        targets.find(({ element }) => element === entry.target)?.reveal(true);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    targets.forEach(({ element }) => { if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  return <div className="fstg-insights-page flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
    <ReportHeader slug={slug} report={report} currentPage="workforce_insights" />
    <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8">
      <ReportNavButtons slug={slug} currentPage="workforce_insights" prev={{ label: "WA Workforce Overview", href: `/reports/${slug}/industry_profile_wa` }} next={{ label: "Theme 1 – Future of the Public Service", href: "#theme-one" }} prevPrefix="" />

      <section className="grid gap-6 rounded-md border border-[#ECECE5] bg-white p-6 transition-colors duration-300 hover:border-[#D8C7BA] lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center lg:gap-12 lg:px-7 lg:py-8">
        <div className="animate-slide-up"><h1 className="text-[32px] font-bold leading-tight text-[#754D32] sm:text-[38px]">Workforce Insights</h1><p className="mt-4 max-w-[800px] text-xs leading-6">The Federal and State/Territory Government Public Service employs over 2 million people.<sup>83</sup> Employment in the public sector is also projected to grow across all states and territories and the APS over the next 10 years.</p><p className="mt-4 max-w-[800px] text-xs leading-6">However, with increasing budgetary constraints and changing priorities being experienced across the Federal and State/Territory Governments, the following overarching theme emerged from Public Skills Australia&apos;s sector analysis and industry insights:</p></div>
        <Image src="/images/reports/workforce-insights.png" alt="Workforce insights" width={390} height={206} className="mx-auto h-auto w-full max-w-[340px] animate-zoom-in motion-safe:transition-transform motion-safe:duration-500 motion-safe:hover:scale-[1.03]" priority />
      </section>

      <section id="theme-one" ref={themeRef} className={`border-t-[8px] border-[#E7CDBF] bg-white px-5 py-6 sm:px-7 sm:py-7 ${themeVisible ? "animate-slide-up" : "motion-safe:opacity-0"}`}>
        <p className="text-xs font-medium uppercase text-[#754D32]">Theme 1 · 3 insights</p>
        <h2 className="mt-5 text-lg font-bold">Future of the Public Service</h2>
        <button type="button" onClick={() => setOverviewOpen(!overviewOpen)} aria-expanded={overviewOpen} className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#8AC900] px-5 py-2 text-xs font-semibold text-[#252D02] transition-all duration-300 hover:bg-[#9BD626] hover:shadow-sm motion-safe:hover:-translate-y-0.5">Theme Overview {overviewOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}</button>
        {overviewOpen && <p className="mt-4 max-w-[850px] text-xs leading-6 animate-content-switch">ABS data indicates that the Federal and State/Territory Government public sector has increased between 2024-25 by 3.3 per cent.<sup>85</sup> According to Jobs and Skills Australia&apos;s employment projections, employment in the Public Administration industry group is projected to steadily grow over the next 10 years from the current baseline of 505,200 in May 2025 to 574,900 in May 2035.<sup>86</sup> These projections encompass government activities at the federal, state and territory levels only.<sup>87</sup> The future public service workforce will continue to have effects on national economic growth and productivity.</p>}
        <div className="mt-6 space-y-2">
          {insights.map((insight, index) => <div key={insight.label} id={`insight-${index + 1}`} className={`group overflow-hidden rounded-md border border-[#BDA28E] border-l-[7px] border-l-[#754D32] bg-[#F8EEE8] transition-[border-color,box-shadow,transform] duration-300 hover:border-[#946C50] hover:shadow-md motion-safe:hover:-translate-y-0.5 ${themeVisible ? "animate-card-entrance" : "motion-safe:opacity-0"}`} style={themeVisible ? { animationDelay: `${0.18 + index * 0.12}s` } : undefined}><button type="button" onClick={() => router.push(`/reports/${slug}/workforce_insight_${index + 1}`)} className="flex w-full items-center gap-5 px-4 py-4 text-left transition-colors hover:bg-[#F4E5DB] sm:px-6"><span className="w-9 shrink-0 text-[34px] font-light leading-none text-[#E8D8CC]">{index + 1}</span><span className="min-w-0 flex-1"><span className="block text-xs font-medium text-[#754D32]">{insight.label}</span><span className="mt-2 block text-xs leading-5 text-[#42463B]">{insight.summary}</span></span><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8AC900] text-[#252D02] transition-transform duration-300 motion-safe:group-hover:scale-110"><ArrowRight className="h-4 w-4" /></span></button></div>)}
        </div>
      </section>

      <section ref={sourcesRef} className={`rounded-md border border-[#ECECE5] bg-white p-5 transition-colors duration-300 hover:border-[#D8C7BA] sm:p-7 ${sourcesVisible ? "animate-card-entrance" : "motion-safe:opacity-0"}`}><h2 className="text-lg font-bold">Sources</h2><ol className="mt-5 space-y-3 text-[11px] leading-5"><li className="flex gap-3"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#668B17] text-[10px] text-white">83</span>Australian Bureau of Statistics (ABS), Public sector employment and earnings 2024-2025, ABS, 2025, accessed 13 February.</li><li className="flex gap-3"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#668B17] text-[10px] text-white">84</span>This report refers to Public Administration and Safety when the Industry Data classifier is used.</li></ol></section>
    </main>
    <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
  </div>;
}
