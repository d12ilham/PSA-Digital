"use client";

import { useState } from "react";
import { Building2, ChevronDown, Landmark, Network, ShieldCheck, UserRound, Users } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const strategies = [
  {
    number: "Strategy 1",
    title: "Support uptake of disaster recovery training products (Refer Appendix B for list of training products)",
    insight: "Disaster Recovery",
    jsc: "Implementation, Promotion and Monitoring",
    objective: "Strengthen capabilities of disaster recovery for Fire and Emergency Services and Government personnel by promoting the uptake of disaster recovery training products.",
    approach: "Develop and implement a promotion plan for disaster recovery products among TAFEs and RTOs.",
    deliverables: ["Promotion Plan", "Presentation of promotions to RTO, TAFE and stakeholders", "Report on outcomes of engagement"],
    impact: "Capability uplift across Fire and Emergency Services and Government personnel through increased uptake of nationally consistent disaster recovery training.",
    timing: "18-month project",
    stakeholders: ["AFAC", "Australian Institute of Disaster Resilience", "Australian Local Government Association (ALGA)", "National Emergency Management Agency", "TAFE Directors Australia (TDA)", "Enterprise Registered Training Organisation Association (ERTOA)"],
  },
  {
    number: "Strategy 2",
    title: "Review first aid units of competency for Surf Life Saving in the Certificate II in Public Safety (Aquatic Rescue)",
    insight: "Surf Life Saving First Aid",
    jsc: "Training Product Development",
    objective: "Ensure the Certificate II in Public Safety (Aquatic Rescue) reflects the first aid requirements of Surf Life Saving.",
    approach: "Collaborate with Surf Life Saving Australia and state/territory organisations to compare the level of current first aid training units with the skills required in surf lifesaving. This may result in an update to the Certificate II in Public Safety (Aquatic Rescue).",
    deliverables: ["Reviewed training products"],
    impact: "Equip surf lifesavers with the skills required to meet current and future needs in keeping Australia’s coastline safe.",
    timing: "12-month project",
    stakeholders: ["AFAC", "Surf Life Saving Australia", "Training Package Assurance Body", "State Training Authority/Senior Responsible Officer"],
  },
  {
    number: "Strategy 3",
    title: "Review prerequisite requirements for PUAFIR306 Identify, detect and monitor hazardous materials at an incident",
    insight: "Hazardous Materials",
    jsc: "Training Product Development",
    objective: "Support increased access to hazardous materials training by reviewing a key unit of competency for the Fire and Emergency Services industry.",
    approach: "Engage with key Fire and Emergency Services employers and unions, and mining stakeholders through AUSMESA, to review PUAFIR306 and its role as an incident and PUASAR025 Undertake confined space rescue units of competency.",
    deliverables: ["Reviewed Units of Competency"],
    impact: "Increase accessible training to enable safe and effective hazardous materials response.",
    timing: "18-month project",
    stakeholders: ["AFAC", "United Firefighters Union Australia", "Training Package Assurance Body", "State Training Authority/Senior Responsible Officer"],
  },
];

function StrategyCard({ strategy, open, onToggle }: { strategy: typeof strategies[number]; open: boolean; onToggle: () => void }) {
  return <article className="overflow-hidden rounded-lg border border-[#E9EAEB] border-t-[7px] border-t-[#D95222] bg-white"><div className="p-5"><div className="flex items-center justify-between gap-4"><span className="rounded-full bg-[#D95222] px-3 py-1 text-[9px] font-bold uppercase text-white">{strategy.number}</span><button type="button" onClick={onToggle} aria-expanded={open} className="inline-flex h-8 items-center gap-2 rounded-full bg-[#7BC900] px-4 text-[10px] font-semibold text-[#253100]">{open ? "Close" : "Open"}<ChevronDown size={13} className={open ? "rotate-180" : ""}/></button></div><h2 className="mt-6 text-lg font-bold leading-6 text-[#252D02]">{strategy.title}</h2><p className="mt-4 border-b border-[#E9EAEB] pb-5 text-[11px] leading-5 text-[#535862]">Workforce Insight: {strategy.insight} · JSC Function: {strategy.jsc}</p>{open && <div className="mt-5 space-y-5 text-xs leading-5 text-[#535862]"><div><strong className="block text-[#252D02]">Workforce Insight:</strong>{strategy.insight}</div><div><strong className="block text-[#252D02]">JSC Function:</strong>{strategy.jsc}</div><div><strong className="block text-[#252D02]">Objective:</strong>{strategy.objective}</div><div><strong className="block text-[#252D02]">Approach:</strong>{strategy.approach}</div><div><strong className="block text-[#252D02]">Deliverable:</strong><ul className="ml-5 mt-1 list-disc">{strategy.deliverables.map(item=><li key={item}>{item}</li>)}</ul></div><div><strong className="block text-[#252D02]">Impact:</strong>{strategy.impact}</div><div><strong className="block text-[#252D02]">Anticipated timing:</strong>{strategy.timing}</div><div><strong className="mb-2 block text-[#252D02]">Key Stakeholders:</strong><div className="flex flex-wrap gap-2">{strategy.stakeholders.map(item=><span key={item} className="rounded-full bg-[#FBECE7] px-3 py-1 text-[10px] text-[#B44021]">• &nbsp;{item}</span>)}</div></div>{strategy.number === "Strategy 1" && <button type="button" className="inline-flex h-9 items-center rounded-full border border-[#D95222] px-4 text-[10px] font-semibold text-[#B44021]">Appendix B – training products &nbsp;→</button>}</div>}</div></article>;
}

export default function PublicSafetyFesWorkforceStrategiesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [openCards, setOpenCards] = useState([true, true, true]);
  const allOpen = openCards.every(Boolean);
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_workforce_strategies" navigation={{ back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`}, backSecondary:{label:"Fire and Emergency Services chapter",href:`/reports/${slug}/fes`}, prev:{label:"Workforce Insights",href:`/reports/${slug}/fes_workforce_insights`}, next:{label:"2025 Strategy Updates",href:`/reports/${slug}/fes_update_2025_strategies`}, prevPrefix:"Previous Section:", nextPrefix:"Next Section:" }}>
    <section className="relative min-h-[245px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-8 lg:px-8"><div className="relative z-10 max-w-[820px]"><span className="inline-flex rounded-full bg-[#D95222] px-4 py-1.5 text-[10px] font-bold uppercase text-white">Fire and Emergency Services Workforce Strategies</span><h1 className="mt-5 text-[40px] font-bold leading-[48px] text-[#252D02]">Proposed Strategies 2026</h1><p className="mt-4 max-w-[760px] text-xs leading-5 text-[#535862]">Public Skills Australia proposes the following strategies to align to the workforce insights identified to support Fire and Emergency Services.</p><button type="button" onClick={()=>setOpenCards([!allOpen,!allOpen,!allOpen])} className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-[#7BC900] px-5 text-xs font-semibold text-[#253100]">{allOpen ? "Close All" : "Open All"}<ChevronDown size={14} className={allOpen ? "rotate-180" : ""}/></button></div><div className="absolute right-9 top-12 hidden h-[160px] w-[350px] lg:block"><span className="absolute left-0 top-5 grid size-11 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Users size={21}/></span><span className="absolute left-0 top-24 grid size-11 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><UserRound size={20}/></span><span className="absolute left-[100px] top-5 grid size-28 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Landmark size={42}/></span><span className="absolute left-[120px] top-[92px] grid size-12 place-items-center rounded-full bg-white text-[#719926]"><ShieldCheck size={23}/></span><span className="absolute right-3 top-8 grid size-12 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Network size={22}/></span><span className="absolute right-0 top-24 grid size-11 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Building2 size={20}/></span></div></section>
    <section className="grid items-start gap-6 lg:grid-cols-3">{strategies.map((strategy,index)=><StrategyCard key={strategy.number} strategy={strategy} open={openCards[index]} onToggle={()=>setOpenCards(current=>current.map((value,itemIndex)=>itemIndex===index?!value:value))}/>)}</section>
  </PublicSafetyPageShell>;
}
