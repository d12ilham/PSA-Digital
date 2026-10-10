"use client";

import { ArrowRight, BarChart3, BrainCircuit, Cog, Lightbulb, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const sources = [
  "Australian Institute for Disaster Resilience (AIDR), Major Incidents Report 2024–25, Australian Government Department of Home Affairs, 2025.",
  "Australian Institute for Disaster Resilience (AIDR), Major Incidents Report 2022–23; Australian Government Department of Home Affairs, 2023; AIDR, Major Incidents Report 2023–24, 2024.",
  "Milliken, Royal Commission into National Natural Disaster Arrangements (Report), Australian Government, 2020, page 453.",
  "Transparency Portal, National Recovery and Resilience Organisation Annual Report 2021–22, Australian Government, 2022.",
  "Australian Institute for Disaster Resilience, Australian Institute for Disaster Resilience Handbook Collection: Community Recovery, 2018.",
  "Training.gov.au, Training package – PUA Public Safety, Australian Government, 2025.",
  "National Centre for Vocational Education Research (NCVER), Total VET students and courses, 2025.",
  "Australian Institute for Disaster Resilience, National Principles for Disaster Recovery, National Emergency Management Agency, 2018.",
];

function IconCluster() {
  return <div className="absolute right-8 top-5 hidden h-[150px] w-[330px] lg:block"><span className="absolute left-2 top-16 grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Lightbulb size={26}/></span><span className="absolute left-16 top-5 grid size-12 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Users size={21}/></span><span className="absolute left-[125px] top-0 grid size-20 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Search size={35}/></span><span className="absolute left-[195px] top-[78px] grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Cog size={26}/></span><span className="absolute right-0 top-12 grid size-16 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><BarChart3 size={31}/></span><span className="absolute right-7 top-0 grid size-12 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><BrainCircuit size={22}/></span></div>;
}

function IncidentsChart() {
  const values = [27, 30, 40];
  const labels = ["2022–2023", "2023–2024", "2024–2025"];
  const points = values.map((value, index) => ({ x: 95 + index * 190, y: 275 - ((value - 20) / 25) * 220 }));
  return <svg viewBox="0 0 520 340" className="mt-4 w-full" role="img" aria-label="Major Emergency Incidents Reported by the Australian Institute for Disaster Resilience">
    {[20,26.3,32.5,38.8,45].map((tick,index)=>{const y=275-index*55;return <g key={tick}><line x1="62" x2="490" y1={y} y2={y} stroke="#E3E5DE"/><text x="50" y={y+4} textAnchor="end" fontSize="10" fill="#535862">{tick}</text></g>})}
    <polyline points={points.map(point=>`${point.x},${point.y}`).join(" ")} fill="none" stroke="#B72D21" strokeWidth="3"/>
    {points.map((point,index)=><g key={labels[index]}><circle cx={point.x} cy={point.y} r="5" fill="#B72D21"/><text x={point.x+8} y={point.y-10} fontSize="15" fontWeight="700" fill="#B72D21">{values[index]}</text><text x={point.x} y="315" textAnchor="middle" fontSize="10" fill="#252D02">{labels[index]}</text></g>)}
  </svg>;
}

export default function PublicSafetyFesDisasterRecoveryView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_disaster_recovery" navigation={{ back:{label:"Workforce Insights",href:`/reports/${slug}/fes_workforce_insights`}, backSecondary:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`}, prev:{label:"Workforce Insights",href:`/reports/${slug}/fes_workforce_insights`}, next:{label:"2. Surf Life Saving First Aid",href:`/reports/${slug}/fes_surf_life_saving_first_aid`}, prevPrefix:"Previous Section:", nextPrefix:"Next Section:" }}>
    <section className="relative min-h-[190px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-7 lg:px-8"><div className="relative z-10 max-w-[920px]"><span className="inline-flex rounded-full bg-[#D95222] px-4 py-1.5 text-[10px] font-bold text-white">Theme One. Disaster Recovery. Insight One</span><h1 className="mt-5 text-[38px] font-bold leading-[46px] text-[#252D02]">1. Disaster Recovery. Insight One.</h1><p className="mt-4 max-w-[980px] text-xs leading-5 text-[#535862]">Specialist disaster recovery functions are operationally focused; a more contemporary approach now requires capabilities related to the unique aspects of working with communities that may be grieving or socially, emotionally and financially impacted.</p></div><IconCluster/></section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-6 lg:p-8"><div className="grid gap-7 lg:grid-cols-[1fr_1fr]"><article><h2 className="text-2xl font-bold leading-8 text-[#252D02]">Major emergency incidents and the Royal Commission in 2020</h2><div className="mt-6 space-y-5 text-xs leading-5 text-[#535862]"><p>From July 2024 to June 2025, the Australian Institute for Disaster Resilience Major Incidents Report documented 40 major emergency incidents, spanning fires, floods, storms, tropical cyclones, health outbreaks, technology failures and repatriations from international conflict zones. This is an increase from both the 2022–23 and 2023–24 financial years.</p><p>Fire and Emergency Services stakeholders noted that at the time of the Royal Commission into National Natural Disaster Arrangements in 2020, specialist disaster recovery skills and functions were identified as different to those required in emergency management. Following the Royal Commission, a need for nationally accredited training products related to disaster recovery was developed and validated through the National Recovery Training Program.</p></div><button type="button" onClick={()=>router.push(`/reports/${slug}/fes_disaster_recovery`)} className="mt-6 flex w-full items-center justify-between rounded-lg border-l-4 border-l-[#7F9C37] bg-[#FAFAF0] px-5 py-4 text-left text-xs font-semibold text-[#252D02]"><span>Appendix B – Disaster recovery training products from the Royal Commission into National Natural Disaster Arrangements</span><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#7BC900]"><ArrowRight size={16}/></span></button><p className="mt-6 text-xs leading-5 text-[#535862]">Contemporary approaches to disaster recovery require specialised skills among emergency services, local government personnel, spontaneous volunteers and community organisations tasked with recovery coordination.</p></article><article className="rounded-lg border border-[#E9EAEB] bg-white p-6"><h3 className="text-base font-bold leading-6 text-[#252D02]">Major Emergency Incidents Reported by the Australian Institute for Disaster Resilience</h3><IncidentsChart/></article></div>
      <div className="mt-8 rounded-lg border border-[#F0D9D1] border-l-[8px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-white text-[#719926]"><Users size={20}/></span><strong className="text-sm text-[#252D02]">Industry Insight</strong></div><p className="mt-4 text-xs leading-5 text-[#535862]">Specialist disaster recovery functions are operationally focused; a more contemporary approach now requires capabilities related to the unique aspects of working with communities that may be grieving or socially, emotionally and financially impacted.</p></div>
    </section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-6 lg:p-8"><h2 className="text-xl font-bold text-[#252D02]">Sources</h2><ul className="mt-5 space-y-3">{sources.map(source=><li key={source} className="flex gap-3 text-[11px] leading-5 text-[#535862]"><span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-[#7F9C37] text-[9px] text-white">✓</span><span>{source}</span></li>)}</ul></section>
  </PublicSafetyPageShell>;
}
