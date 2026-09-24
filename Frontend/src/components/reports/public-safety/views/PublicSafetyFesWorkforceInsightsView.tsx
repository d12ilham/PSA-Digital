"use client";

import { ArrowRight, BarChart3, BrainCircuit, Cog, Lightbulb, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const themes = [
  {
    eyebrow: "Theme 1 · 2 insights",
    title: "1. Disaster Recovery",
    insights: [
      { number: "1", href: "fes_disaster_recovery", label: "Theme One, Insight One", text: "Specialist disaster recovery functions are operationally focused; a more contemporary approach now requires capabilities related to the unique aspects of working with communities that may be grieving or socially, emotionally and financially impacted." },
      { number: "2", href: "fes_disaster_recovery_2", label: "Theme One, Insight Two", text: "Challenges in access to nationally accredited disaster recovery training products leads to inconsistencies in recovery outcomes, reduced community trust and limits the ability of communities to rebuild from the impacts of disasters." },
      { number: "3", href: "fes_disaster_recovery", label: "Theme One, Insight Three", text: "Australia is experiencing a critical challenge in maintaining capability to use fire effectively in the landscape, particularly for complex prescribed burning and backburning during bushfire suppression." },
    ],
  },
  {
    eyebrow: "Theme 2 · 1 insights",
    title: "2. Surf Life Saving First Aid",
    insights: [
      { number: "4", href: "fes_surf_life_saving_first_aid", label: "Theme Two, Insight Four", text: "The HLTAID010 unit of competency is an entry-level first aid training product that is no longer meeting the operational needs for volunteer surf lifesavers." },
    ],
  },
  {
    eyebrow: "Theme 3 · 1 insights",
    title: "2. Surf Life Saving First Aid",
    insights: [
      { number: "5", href: "fes_hazardous_materials", label: "Theme Two, Insight Five", text: "Incidents involving hazardous materials are becoming increasingly important while current training may be limiting in some Fire and Emergency Services organisations ability to deliver this type of service." },
    ],
  },
];

function InsightCard({ insight, onClick }: { insight: { number: string; href: string; label: string; text: string }; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="group grid min-h-[154px] w-full grid-cols-[38px_1fr_38px] items-start gap-2 rounded-lg border border-[#E0E2DA] bg-[#FAFAF0] px-4 py-5 text-left transition-colors hover:border-[#D95222]">
    <span className="text-[44px] font-light leading-none text-[#E8E8D8]">{insight.number}</span>
    <span><strong className="block text-xs font-medium text-[#719926]">{insight.label}</strong><span className="mt-3 block text-xs leading-5 text-[#535862]">{insight.text}</span></span>
    <span className="mt-10 grid size-9 place-items-center rounded-full bg-[#7BC900] text-[#253100] transition-transform group-hover:translate-x-1"><ArrowRight size={16}/></span>
  </button>;
}

export default function PublicSafetyFesWorkforceInsightsView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_workforce_insights" navigation={{ back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`}, backSecondary:{label:"Fire and Emergency Services chapter",href:`/reports/${slug}/fes`}, prev:{label:"Industry Profile",href:`/reports/${slug}/fes_industry_profile`}, next:{label:"Federal Government Strategies",href:`/reports/${slug}/fes_federal_initiatives`}, prevPrefix:"Previous Section:", nextPrefix:"" }}>
    <section className="relative min-h-[240px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-9 lg:px-8">
      <div className="relative z-10 max-w-[820px]"><span className="inline-flex rounded-full bg-[#D95222] px-4 py-1.5 text-[10px] font-bold uppercase text-white">FES · Industry-Sector Analysis</span><h1 className="mt-5 text-[42px] font-bold leading-[50px] text-[#252D02]">Workforce Insights</h1><p className="mt-5 text-sm leading-6 text-[#535862]">This Report identifies the following themes and industry insights relating to the ADF:</p></div>
      <div className="absolute right-10 top-6 hidden h-[205px] w-[360px] lg:block"><span className="absolute left-2 top-20 grid size-16 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Lightbulb size={31}/></span><span className="absolute left-20 top-7 grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Users size={24}/></span><span className="absolute left-[145px] top-0 grid size-24 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Search size={42}/></span><span className="absolute left-[220px] top-[105px] grid size-16 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Cog size={30}/></span><span className="absolute right-0 top-16 grid size-20 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><BarChart3 size={39}/></span><span className="absolute right-8 top-2 grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><BrainCircuit size={26}/></span></div>
    </section>

    <section className="grid items-stretch gap-6 lg:grid-cols-3">{themes.map(theme=><article key={theme.eyebrow} className="overflow-hidden rounded-lg border border-[#E9EAEB] border-t-[9px] border-t-[#D95222] bg-white p-6"><p className="text-xs font-semibold uppercase text-[#6C8C20]">{theme.eyebrow}</p><h2 className="mt-7 text-xl font-bold text-[#252D02]">{theme.title}</h2><p className="mt-4 text-xs uppercase text-[#535862]">Industry Insights</p><div className="mt-7 space-y-3">{theme.insights.map(insight=><InsightCard key={insight.number} insight={insight} onClick={()=>router.push(`/reports/${slug}/${insight.href}`)}/>)}</div></article>)}</section>

    <div><button type="button" onClick={()=>router.push(`/reports/${slug}/fes_workforce_strategies`)} className="inline-flex h-11 items-center gap-3 rounded-full border border-[#7F9C37] px-5 text-xs font-semibold text-[#5D791B]">Defence Workforce Strategies <ArrowRight size={15}/></button></div>
  </PublicSafetyPageShell>;
}
