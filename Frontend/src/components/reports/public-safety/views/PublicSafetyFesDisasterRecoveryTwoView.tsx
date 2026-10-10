"use client";

import { BarChart3, BrainCircuit, Cog, Lightbulb, Search, Users } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const sources = [
  "Australian Institute for Disaster Resilience (AIDR), Major Incidents Report 2024–25, Australian Government Department of Home Affairs, 2025.",
  "Australian Institute for Disaster Resilience (AIDR), Major Incidents Report 2022–23; Australian Government Department of Home Affairs, 2023; AIDR, Major Incidents Report 2023–24, 2024; AIDR, Major Incidents Report 2024–25, 2025.",
  "M Biskin, Royal Commission into National Natural Disaster Arrangements (Report), Australian Government, 2020, page 453.",
  "Transparency Portal, National Recovery and Resilience Organisation Annual Report 2021–22, Australian Government, 2022.",
  "Australian Institute for Disaster Resilience, Australian Institute for Disaster Resilience Handbook Collection: Community Recovery, 2018, pages 6–7.",
  "Training.gov.au, Training package – PUA Public Safety, Australian Government, 2025.",
  "National Centre for Vocational Education Research (NCVER), Total VET students and courses, 2025.",
  "Australian Institute for Disaster Resilience, National Principles for Disaster Recovery, National Emergency Management Agency, 2018.",
  "Prescribed Burning Centre of Excellence, National Position on Prescribed Burning, Australasian Fire and Emergency Service Authorities Council, 2021.",
  "PUAFIR201 Assist with prescribed burning; PUAFIR402 Conduct simple prescribed burns; PUAFIR406 Develop simple prescribed burn plans.",
];

function IconCluster() {
  return <div className="absolute right-8 top-5 hidden h-[150px] w-[330px] lg:block"><span className="absolute left-2 top-16 grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Lightbulb size={26}/></span><span className="absolute left-16 top-5 grid size-12 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Users size={21}/></span><span className="absolute left-[125px] top-0 grid size-20 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Search size={35}/></span><span className="absolute left-[195px] top-[78px] grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Cog size={26}/></span><span className="absolute right-0 top-12 grid size-16 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><BarChart3 size={31}/></span><span className="absolute right-7 top-0 grid size-12 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><BrainCircuit size={22}/></span></div>;
}

export default function PublicSafetyFesDisasterRecoveryTwoView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_disaster_recovery" navigation={{ back:{label:"Workforce Insights",href:`/reports/${slug}/fes_workforce_insights`}, backSecondary:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`}, prev:{label:"Workforce Insights",href:`/reports/${slug}/fes_workforce_insights`}, next:{label:"2. Surf Life Saving First Aid",href:`/reports/${slug}/fes_surf_life_saving_first_aid`}, prevPrefix:"Previous Section:", nextPrefix:"Next Section:" }}>
    <section className="relative min-h-[190px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-7 lg:px-8"><div className="relative z-10 max-w-[920px]"><span className="inline-flex rounded-full bg-[#D95222] px-4 py-1.5 text-[10px] font-bold text-white">Theme One. Disaster Recovery. Insight One</span><h1 className="mt-5 text-[38px] font-bold leading-[46px] text-[#252D02]">2. Disaster Recovery. Insight Two.</h1><p className="mt-4 max-w-[980px] text-xs leading-5 text-[#535862]">Challenges in access to nationally accredited disaster recovery training products leads to inconsistencies in recovery outcomes, reduced community trust and limits the ability of communities to rebuild from the impacts of disasters.</p></div><IconCluster/></section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-6 lg:p-8"><h2 className="border-b border-[#E9EAEB] pb-5 text-2xl font-bold text-[#252D02]">Access to disaster recovery training</h2><div className="mt-7 text-xs leading-6 text-[#535862]"><p>Despite the relevance and importance of disaster recovery training, there are limited TAFEs and RTOs equipped to deliver this training. For example:</p><ul className="ml-5 mt-2 list-disc space-y-1"><li>seven of the nine newly developed skill sets are not on scope for any RTO</li><li>only one RTO has the qualification, and four associated units of competency on scope</li><li>only five RTOs have the PUASS00098 Managing a Recovery Centre skill set on scope.</li></ul><p className="mt-4">Additionally, there have been no enrolment or completion data for all 14 recovery training products since their release in 2022.</p></div><div className="mt-8 rounded-lg border border-[#F0D9D1] border-l-[8px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-white text-[#719926]"><Users size={20}/></span><strong className="text-sm text-[#252D02]">Industry Insight</strong></div><p className="mt-4 text-xs leading-5 text-[#535862]">Challenges in access to nationally accredited disaster recovery training products leads to inconsistencies in recovery outcomes, reduced community trust and limits the ability of communities to rebuild from the impacts of disasters.</p></div></section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-6 lg:p-8"><h2 className="text-xl font-bold text-[#252D02]">Sources</h2><ul className="mt-5 space-y-3">{sources.map((source,index)=><li key={source} className="flex gap-3 text-[11px] leading-5 text-[#535862]"><span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-[#7F9C37] text-[8px] text-white">{53+index}</span><span>{source}</span></li>)}</ul></section>
  </PublicSafetyPageShell>;
}
