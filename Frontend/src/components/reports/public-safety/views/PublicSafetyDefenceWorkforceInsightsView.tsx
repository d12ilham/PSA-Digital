"use client";

import { ArrowRight, BarChart3, BrainCircuit, Cog, Search, Users, Award } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const themes = [
  {
    eyebrow: "Theme 1 · 2 insights",
    title: "1. Emerging Technology",
    accent: "#D7A31A",
    href: "defence_emerging_technology",
    insights: [
      {
        number: "1",
        href: "defence_emerging_technology",
        label: "Theme One, Insight One",
        text: "Challenges in rapid adoption of emerging technology remains, due to significant security screening requirements for any new technology adoption. Limitations exist for the speed of being able to upskill employees in the use of any new technology.",
      },
      {
        number: "2",
        href: "defence_emerging_technology_2",
        label: "Theme One, Insight Two",
        text: "Provisioning targeted training faster through short courses (often referred to as micro-credentials). Leveraging Vocational Education and Training Units of Competency could be effective in responding to emerging technologies.",
      },
    ],
  },
  {
    eyebrow: "Theme 2 · 2 insights",
    title: "2. Transitioning Veterans",
    accent: "#5B5E57",
    href: "defence_transitioning_veterans",
    insights: [
      {
        number: "3",
        href: "defence_transitioning_veterans",
        label: "Theme Two, Insight Three",
        text: "The Vocational Education and Training (VET) system remains important for the ADF as it provides a national standard, with meaningful qualifications written by industry, for industry.",
      },
      {
        number: "4",
        href: "defence_transitioning_veterans_2",
        label: "Theme Two, Insight Four",
        text: "Greater focus is required to support those transitioning (including veterans) to articulate the transferability of their VET qualifications and the relevance of their ADF experience to the civilian workforce. Where support is available, the information provided could be bolstered.",
      },
    ],
  },
];

function InsightCard({ insight, onClick, delay }: { insight: { number: string; label: string; text: string; href: string }; onClick: () => void; delay: number }) {
  return <button type="button" onClick={onClick} style={{ animationDelay: `${delay}s` }} className="group grid min-h-[136px] w-full animate-card-entrance grid-cols-[42px_1fr_42px] items-center gap-3 rounded-xl border border-[#E0E2DA] bg-[#FAFAF0] px-5 py-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#C8A03A] hover:bg-white hover:shadow-lg">
    <span className="text-[48px] font-light leading-none text-[#E8E8D8]">{insight.number}</span>
    <span><strong className="block text-xs font-semibold text-[#6C8C20]">{insight.label}</strong><span className="mt-3 block text-[13px] leading-[20px] text-[#535862]">{insight.text}</span></span>
    <span className="grid size-10 place-items-center rounded-full bg-[#7BC900] text-[#253100] transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:shadow-sm"><ArrowRight size={17}/></span>
  </button>;
}

export default function PublicSafetyDefenceWorkforceInsightsView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  const themesRef = useRef<HTMLElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const [themesVisible, setThemesVisible] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === themesRef.current) setThemesVisible(true);
        if (entry.target === actionRef.current) setActionVisible(true);
      });
    }, { threshold: 0.08 });
    if (themesRef.current) observer.observe(themesRef.current);
    if (actionRef.current) observer.observe(actionRef.current);
    return () => observer.disconnect();
  }, []);

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="defence_workforce_insights" navigation={{ back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`}, backSecondary:{label:"Defence Chapter",href:`/reports/${slug}/defence`}, prev:{label:"Industry Profile",href:`/reports/${slug}/defence_industry_profile`}, next:{label:"2026 Proposed Workforce Strategies",href:`/reports/${slug}/defence_workforce_strategies`}, prevPrefix:"Previous Section:", nextPrefix:"Next Section:" }}>
    <section className="relative min-h-[245px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-10 transition-shadow duration-500 hover:shadow-lg lg:px-8">
      <div className="relative z-10 max-w-[800px] animate-slide-up"><span className="inline-flex rounded-full bg-[#D7A31A] px-4 py-1.5 text-[10px] font-bold uppercase text-white">Defence</span><h1 className="mt-5 text-[42px] font-bold leading-[50px] text-[#252D02]">Workforce Insights</h1><p className="mt-5 max-w-[790px] animate-slide-up-delay text-sm leading-6 text-[#535862]">This Report identifies the following themes and industry insights relating to the Australian Defence Force (ADF). Select an industry insight to open its own page. Each page returns here.</p></div>
      <div className="absolute right-10 top-7 hidden h-[205px] w-[360px] animate-zoom-in lg:block">
        <div style={{animationDelay:".1s"}} className="group absolute left-1 top-16 grid size-16 animate-cross-sector-icon place-items-center rounded-full bg-[#F2F5E9] text-[#719926] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E4EDCA] hover:shadow-md"><Users size={30} className="transition-transform group-hover:scale-110"/></div>
        <div style={{animationDelay:".2s"}} className="group absolute left-20 top-24 grid size-20 animate-cross-sector-icon place-items-center rounded-full bg-[#F2F5E9] text-[#719926] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E4EDCA] hover:shadow-md"><BrainCircuit size={38} className="transition-transform group-hover:scale-110"/></div>
        <div style={{animationDelay:".3s"}} className="group absolute left-28 top-3 grid size-14 animate-cross-sector-icon place-items-center rounded-full bg-[#F2F5E9] text-[#719926] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E4EDCA] hover:shadow-md"><Users size={24} className="transition-transform group-hover:scale-110"/></div>
        <div style={{animationDelay:".4s"}} className="group absolute left-[172px] top-0 grid size-24 animate-cross-sector-icon place-items-center rounded-full bg-[#F2F5E9] text-[#719926] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E4EDCA] hover:shadow-md"><Search size={42} className="transition-transform group-hover:scale-110 group-hover:rotate-6"/></div>
        <div style={{animationDelay:".5s"}} className="group absolute left-[225px] top-[105px] grid size-16 animate-cross-sector-icon place-items-center rounded-full bg-[#F2F5E9] text-[#719926] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E4EDCA] hover:shadow-md"><Cog size={30} className="transition-transform group-hover:scale-110 group-hover:rotate-45"/></div>
        <div style={{animationDelay:".6s"}} className="group absolute right-0 top-14 grid size-20 animate-cross-sector-icon place-items-center rounded-full bg-[#F2F5E9] text-[#719926] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E4EDCA] hover:shadow-md"><BarChart3 size={39} className="transition-transform group-hover:scale-110"/></div>
        <div style={{animationDelay:".7s"}} className="group absolute right-8 top-1 grid size-14 animate-cross-sector-icon place-items-center rounded-full bg-[#F2F5E9] text-[#719926] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E4EDCA] hover:shadow-md"><Award size={26} className="transition-transform group-hover:scale-110 group-hover:-rotate-6"/></div>
      </div>
    </section>

    <section ref={themesRef} className="grid gap-6 lg:grid-cols-2">{themes.map((theme, themeIndex)=><article key={theme.title} style={{borderTop:`9px solid ${theme.accent}`, animationDelay: `${themeIndex * 0.14 + 0.1}s`}} className={`overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${themesVisible?"animate-card-entrance":"translate-y-6 opacity-0"}`}><div className="p-6"><p className="text-xs font-semibold uppercase text-[#6C8C20]">{theme.eyebrow}</p><h2 className="mt-7 text-2xl font-bold text-[#252D02]">{theme.title}</h2><p className="mt-3 text-xs uppercase text-[#535862]">Industry Insights</p><div className="mt-7 space-y-3">{theme.insights.map((insight, insightIndex)=><InsightCard key={insight.number} insight={insight} delay={themeIndex * 0.14 + insightIndex * 0.1 + 0.25} onClick={()=>router.push(`/reports/${slug}/${insight.href}`)}/>)}</div></div></article>)}</section>

    <div ref={actionRef} className={actionVisible?"animate-slide-up":"translate-y-4 opacity-0"}><button type="button" onClick={()=>router.push(`/reports/${slug}/defence_workforce_strategies`)} className="group inline-flex h-11 items-center gap-3 rounded-full border border-[#7F9C37] px-5 text-xs font-semibold text-[#5D791B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F0F3E5] hover:shadow-md">Defence Workforce Strategies <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1"/></button></div>
  </PublicSafetyPageShell>;
}
