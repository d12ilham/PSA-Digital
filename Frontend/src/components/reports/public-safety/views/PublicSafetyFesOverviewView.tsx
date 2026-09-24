"use client";

import { ChevronDown, Flame, LifeBuoy, Shield, Siren, Truck } from "lucide-react";
import { useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const datapoints = [
  { title:"Demand for Services", copy:"Demand continues to increase as communities face more frequent and complex emergency events, including natural disasters and climate-related incidents." },
  { title:"Career Firefighters and Emergency Services Employees", copy:"Career workforces provide specialist response, prevention, recovery and community safety services across states and territories." },
  { title:"Volunteer Services", copy:"Volunteers remain essential to regional and remote response capability and represent a significant share of the sector’s workforce." },
  { title:"Surf Life Saving", copy:"Surf Life Saving combines a large volunteer workforce with paid operational, training and support roles across Australia." },
];

const sources = [
  "Productivity Commission, Emergency services for fire and other events – Table 9A.6 and 9A.7 [data set], Productivity Commission, 2026, accessed 7 January 2026.",
  "Australian Institute for Disaster Resilience (AIDR), Major Incidents Report 2024–25, Australian Government Department of Home Affairs, 2025.",
  "ABS, November 2025, Detailed Labour Force Survey (Table EQ08), ABS, data trended by Jobs and Skills Australia.",
  "Productivity Commission, Emergency services for fire and other events – Table 9A.5 [data set], Productivity Commission, 2026, accessed 24 February 2026.",
  "Jobs and Skills Australia (JSA), 2025 Occupation Shortage List, JSA, Australian Government, 2025, accessed 23 February 2026.",
  "Productivity Commission, Emergency services for fire and other events – Table 9A.4 [data set], Productivity Commission, 2026, accessed 24 February 2026.",
  "Volunteering Australia, Key volunteering statistics in Australia, Volunteering Australia, 2025.",
  "Surf Life Saving Australia (SLSA), 2024/25 Annual Report, SLSA, 2025, p 118.",
  "Surf Life Saving Australia (SLSA), 2024/25 Annual Report, SLSA, 2025, p 118.",
];

export default function PublicSafetyFesOverviewView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [open, setOpen] = useState<number | null>(null);
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_industry_overview" navigation={{back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`},backSecondary:{label:"Fire and Emergency Services chapter",href:`/reports/${slug}/fes`},prev:{label:"Fire and Emergency Services",href:`/reports/${slug}/fes`},next:{label:"Industry Profile",href:`/reports/${slug}/fes_industry_profile`},prevPrefix:"Previous Section:",nextPrefix:"Next Section:"}}>
    <section className="relative min-h-[220px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-8 lg:px-8"><div className="relative z-10 max-w-[950px]"><span className="inline-flex rounded-full bg-[#D95222] px-4 py-1.5 text-[10px] font-bold text-white">FES · INDUSTRY-SECTOR ANALYSIS</span><h1 className="mt-5 text-[40px] font-bold leading-[48px] text-[#252D02]">Industry-Sector Overview</h1><p className="mt-5 max-w-[960px] text-sm leading-6 text-[#535862]">Australia’s Fire and Emergency Services are critical to ensure protection of life and property and public safety. Working across inland waterways and coastline, to national parks and alpine regions, and throughout regional, rural and remote centres as well as metropolitan cities, these services protect Australian lives, property and the environment.</p></div><div className="absolute right-12 top-8 hidden size-36 place-items-center rounded-full bg-[#FBE9E4] lg:grid"><Truck size={66} strokeWidth={1.5} className="text-[#D95222]"/><Flame size={23} className="absolute right-8 top-6 text-[#D95222]"/></div></section>
    <p className="max-w-[1080px] text-sm leading-6 text-[#535862]">Depending on the state or territory a range of Fire and Emergency Services organisations, government departments, public entities and private companies collaborate to deliver a range of emergency management services. The Fire and Emergency Services workforce is made up of both career personnel and volunteers. Fire and Emergency Services workforces comprise three primary services, including:</p>
    <section className="grid overflow-hidden border border-[#E4D5CE] bg-[#FBF1EA] md:grid-cols-3"><div className="flex min-h-[90px] items-center justify-center gap-5 border-b border-[#E4D5CE] px-6 md:border-b-0 md:border-r"><Shield size={38} strokeWidth={1.5}/><strong className="text-xl">Firefighting</strong></div><div className="flex min-h-[90px] items-center justify-center gap-5 border-b border-[#E4D5CE] px-6 md:border-b-0 md:border-r"><Siren size={40} strokeWidth={1.5}/><strong className="max-w-[220px] text-xl leading-6">State and Territory Emergency Services</strong></div><div className="flex min-h-[90px] items-center justify-center gap-5 px-6"><LifeBuoy size={40} strokeWidth={1.5}/><strong className="text-xl">Surf Life Saving</strong></div></section>
    <section><h2 className="max-w-[900px] border-b border-[#DADDD4] pb-5 text-2xl font-bold leading-8">The following datapoints were identified through this Industry Overview for the Fire and Emergency Services workforces:</h2><div className="mt-5 space-y-4">{datapoints.map((item,index)=><article key={item.title} className="overflow-hidden rounded-xl border border-[#DDAA98] border-l-[8px] border-l-[#D95222] bg-[#FBECE4]"><button type="button" aria-expanded={open===index} onClick={()=>setOpen(open===index?null:index)} className="flex min-h-[60px] w-full items-center justify-between gap-5 px-5 text-left"><span className="font-semibold text-[#252D02]">{item.title}</span><span className="inline-flex h-9 items-center gap-2 rounded-full bg-[#7BC900] px-5 text-xs font-semibold">Open <ChevronDown size={15} className={open===index?"rotate-180":""}/></span></button>{open===index&&<p className="border-t border-[#E4C6B8] bg-white px-6 py-5 text-sm leading-6 text-[#535862]">{item.copy}</p>}</article>)}</div></section>
    <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6"><h2 className="text-2xl font-bold">Sources</h2><ol className="mt-6 space-y-3 text-xs leading-5 text-[#535862]">{sources.map((source,index)=><li key={`${index}-${source}`} className="grid grid-cols-[24px_1fr] gap-3"><span className="grid size-5 place-items-center rounded-full bg-[#78A800] text-[10px] font-bold text-white">{index+43}</span><span>{source}</span></li>)}</ol></section>
  </PublicSafetyPageShell>;
}
