"use client";

import { ArrowRight, BarChart3, Clock3, Cog, Lightbulb, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const themes = [
  {
    eyebrow: "Theme 1 · 2 insights",
    title: "1. Digital Forensics",
    insights: [
      { number: "1", href: "police_digital_forensics", label: "Theme One, Insight One", text: "Skills shortages and strong demand for similar skills may require the establishment of multiple entry pathways for digital forensic professionals into policing." },
      { number: "2", href: "police_digital_forensics_2", label: "Theme One, Insight Two", text: "The VET system is well established to deliver a nationally consistent approach to training, however, the Police Training Package currently does not contain a qualification specialising in digital forensics." },
    ],
  },
  {
    eyebrow: "Theme 2 · 1 insights",
    title: "2. Rural, Regional and Remote Police Leadership",
    insights: [
      { number: "3", href: "police_regional_remote_leadership", label: "Theme Two, Insight Three", text: "Police officers being required to take on more leadership responsibilities earlier in their careers, particularly in regional, rural and remote areas, where workforce shortages are more pronounced. This may require more support in accelerating leadership skills development." },
    ],
  },
];

function InsightCard({ insight, onClick }: { insight: { number: string; label: string; text: string }; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="group grid min-h-[142px] w-full grid-cols-[42px_1fr_38px] items-start gap-3 rounded-lg border border-[#E0E2DA] bg-[#FAFAF0] px-4 py-5 text-left transition-colors hover:border-[#1685A6] hover:bg-[#FAFAF0]">
    <span className="text-[46px] font-light leading-none text-[#E8E8D8]">{insight.number}</span>
    <span><strong className="block text-xs font-medium text-[#719926]">{insight.label}</strong><span className="mt-3 block text-xs leading-5 text-[#535862]">{insight.text}</span></span>
    <span className="mt-9 grid size-9 place-items-center rounded-full bg-[#7BC900] text-[#253100] transition-transform group-hover:translate-x-1"><ArrowRight size={16}/></span>
  </button>;
}

export default function PublicSafetyPoliceWorkforceInsightsView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="police_workforce_insights" navigation={{
    back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    backSecondary: { label: "Police chapter", href: `/reports/${slug}/police` },
    prev: { label: "Industry Profile", href: `/reports/${slug}/police_industry_profile` },
    next: { label: "2026 Proposed Workforce Strategies", href: `/reports/${slug}/police_workforce_strategies` },
    prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
  }}>
    <section className="relative min-h-[240px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-9 lg:px-8">
      <div className="relative z-10 max-w-[820px]"><span className="inline-flex rounded-full bg-[#1685A6] px-4 py-1.5 text-[10px] font-bold uppercase text-white">POL · Industry-Sector Analysis</span><h1 className="mt-5 text-[42px] font-bold leading-[50px] text-[#252D02]">Workforce Insights</h1><p className="mt-5 max-w-[800px] text-sm leading-6 text-[#535862]">This Report identifies the following themes and industry insights relating to the police workforce. Select an industry insight to open its own page. Each page returns here.</p></div>
      <div className="absolute right-10 top-6 hidden h-[205px] w-[360px] lg:block"><span className="absolute left-2 top-20 grid size-16 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Lightbulb size={31}/></span><span className="absolute left-20 top-7 grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Users size={24}/></span><span className="absolute left-[145px] top-0 grid size-24 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Search size={42}/></span><span className="absolute left-[220px] top-[105px] grid size-16 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Cog size={30}/></span><span className="absolute right-0 top-16 grid size-20 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><BarChart3 size={39}/></span><span className="absolute right-8 top-2 grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Clock3 size={26}/></span></div>
    </section>

    <section className="grid items-stretch gap-6 lg:grid-cols-2">{themes.map((theme, themeIndex) => <article key={theme.eyebrow} className={`overflow-hidden rounded-lg border border-[#E9EAEB] border-t-[9px] bg-white p-6 ${themeIndex === 0 ? "border-t-[#8DB9CB]" : "border-t-[#1685A6]"}`}><p className="text-xs font-semibold uppercase text-[#6C8C20]">{theme.eyebrow}</p><h2 className="mt-7 text-xl font-bold text-[#252D02]">{theme.title}</h2><p className="mt-4 text-xs uppercase text-[#535862]">Industry Insights</p><div className="mt-7 space-y-3">{theme.insights.map((insight) => <InsightCard key={insight.number} insight={insight} onClick={() => router.push(`/reports/${slug}/${insight.href}`)}/>)}</div></article>)}</section>
  </PublicSafetyPageShell>;
}
