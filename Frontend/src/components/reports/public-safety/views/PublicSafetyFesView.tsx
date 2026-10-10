"use client";

import { ArrowRight, Flame, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const sections = [
  { number:"01", title:"Industry-Sector Overview", href:"fes_industry_overview", copy:"Statistics and data of the industry-sector’s workforce – increasing demand, career and volunteer workforces and Surf Life Saving, with the report’s charts." },
  { number:"02", title:"Industry Profile", href:"fes_industry_profile", copy:"Chart library: yearly enrolments and completions for firefighter, SES and Surf Life Saving qualifications, and the workforce by jurisdiction." },
  { number:"03", title:"Workforce Insights", href:"fes_workforce_insights", copy:"Analysis and insights on current and emerging challenges across three themes: Disaster Recovery, Surf Life Saving First Aid and Hazardous Materials." },
  { number:"04", title:"2026 Proposed Workforce Strategies", href:"fes_workforce_strategies", copy:"The three strategies proposed to mitigate identified challenges – objective, approach, deliverable, impact, timing and key stakeholders." },
  { number:"05", title:"2025 Strategy Updates", href:"fes_update_2025_strategies", copy:"Updates on the five strategies proposed in the 2025 report as to their progress, stakeholders and connection to 2026 strategies." },
  { number:"06", title:"Existing Industry-Sector Strategies", href:"fes_existing_strategies", copy:"Existing strategies used by Government and the industry-sector, and how each informs Public Skills Australia’s work." },
  { number:"07", title:"Disaster recovery training products from the Royal Commission into National Natural Disaster Arrangements", href:"fes_disaster_recovery", copy:"Appendix B – the qualification, nine skill sets and four units of competency developed through the National Recovery Training Program." },
];

export default function PublicSafetyFesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes" navigation={{back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`},prev:{label:"Defence Veterans’ Programs and Initiatives",href:`/reports/${slug}/defence_federal_initiatives`},next:{label:"Industry-Sector Overview",href:`/reports/${slug}/fes_industry_overview`},prevPrefix:"Previous Section:",nextPrefix:"Next Section:"}}>
    <section className="relative min-h-[225px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-8 lg:px-8"><div className="relative z-10 max-w-[980px]"><span className="inline-flex rounded-full bg-[#D95222] px-4 py-1.5 text-[10px] font-bold text-white">FES · INDUSTRY-SECTOR ANALYSIS</span><h1 className="mt-5 text-[40px] font-bold leading-[48px] text-[#252D02]">Fire and Emergency Services</h1><p className="mt-5 max-w-[950px] text-sm leading-6 text-[#535862]">This chapter of the 2026 Public Safety Workforce Insights Report covers the Fire and Emergency Services industry-sector – its career and volunteer workforces across firefighting, state and territory emergency services and surf life saving. Open any section below, or move through the chapter in report order.</p></div><div className="absolute right-12 top-8 hidden size-36 place-items-center rounded-full bg-[#FBE9E4] lg:grid"><Truck size={68} strokeWidth={1.5} className="text-[#D95222]"/><Flame size={24} className="absolute right-8 top-6 text-[#D95222]"/></div></section>
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{sections.map((section)=><article key={section.number} className="flex min-h-[275px] flex-col border-t-[8px] border-[#D95222] bg-white p-6 shadow-[0_0_0_1px_#E5E6E0] first:rounded-t-lg"><span className="text-sm font-semibold text-[#4D8D55]">{section.number}</span><h2 className="mt-6 text-xl font-bold leading-7 text-[#252D02]">{section.title}</h2><p className="mt-5 text-sm leading-6 text-[#535862]">{section.copy}</p><button type="button" onClick={()=>router.push(`/reports/${slug}/${section.href}`)} className="mt-auto inline-flex h-10 w-fit items-center gap-3 rounded-full bg-[#7BC900] px-5 text-xs font-semibold text-[#253100]">Open <ArrowRight size={15}/></button></article>)}</section>
  </PublicSafetyPageShell>;
}
