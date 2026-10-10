"use client";

import { ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, ClipboardList, Landmark, Network, ShieldCheck } from "lucide-react";
import { useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const initiatives = [
  ["ACT Government","ACT Government Veterans’ Employment Strategy, 2020","ACT Government Veterans’ Employment Strategy, 2020"],
  ["ACT Government","ACT Public Service (ACTPS) Veterans’ Employment Transition Guide, 2018","ACT Public Service (ACTPS) Veterans’ Employment Transition Guide, 2018"],
  ["Department of Defence","ADF Transition and Civil Recognition Project","ADF Transition and Civil Recognition Project"],
  ["Department of Defence","ADF Transition Guide 2024","ADF Transition Guide 2024"],
  ["Department of Defence","The ADF Personal and Family Transition Guide 2024","The ADF Personal and Family Transition Guide 2024"],
  ["Department of Defence","ADF Transition Training & Skills Guide","ADF Transition Training & Skills Guide"],
  ["Department of Premier and Cabinet","Transition, Training and Veteran Employment Strategy 2020–2027","Transition, Training and Veteran Employment Strategy 2020–2027"],
  ["Department of Veterans’ Affairs","Veteran Readiness Strategy (2023) and Action Plan (2024)","Veteran Readiness Strategy and Action Plan"],
  ["Department of Veterans’ Affairs","Veteran Employment Program","Department of Veterans’ Affairs Veteran Employment Program"],
  ["Department of Veterans’ Affairs","Veteran Support and Services Guide 2025","Veteran Support and Services Guide 2025"],
  ["Western Australia","Department of Premier and Cabinet – Veteran Employment","Western Australian Veteran Employment"],
  ["Western Australia","Defence Industry – The Other Force Veterans Defence Industry Career Explorer","The Other Force Veterans Defence Industry Career Explorer"],
  ["New South Wales","Rank to Grade Guide and Local Government Rank to Grade Guide","New South Wales Rank to Grade Guide"],
  ["New South Wales","Veterans Employment Program (VEP)","New South Wales Veterans Employment Program"],
  ["New South Wales","Veterans Strategy and Action Plan, 2025–2030","New South Wales Veterans Strategy and Action Plan"],
  ["Northern Territory","Defence Veterans Strategy","Northern Territory Defence Veterans Strategy"],
  ["TAFE NSW","Ranks to Recognition","TAFE NSW Ranks to Recognition"],
  ["TAFE SA","Skills Transition Education Program (STEP)","TAFE SA Skills Transition Education Program"],
  ["Queensland Government","Veterans Queensland","Veterans Queensland"],
  ["South Australian Government","Veterans South Australia","Veterans South Australia"],
  ["Victorian Government","Veterans Employment Workshops","Victorian Government Veterans Employment Workshops"],
  ["Victorian Public Sector","Employing Veterans in the Victorian Public Sector","Employing Veterans in the Victorian Public Sector"],
] as const;

export default function PublicSafetyDefenceFederalInitiativesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const initiative = initiatives[active];
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="defence_federal_initiatives" navigation={{back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`},backSecondary:{label:"Defence chapter",href:`/reports/${slug}/defence`},prev:{label:"Existing Industry-Sector Strategies",href:`/reports/${slug}/defence_existing_strategies`},next:{label:"Fire and Emergency Services",href:`/reports/${slug}/fes`},prevPrefix:"Previous Section:",nextPrefix:"Next Section:"}}>
    <section className="relative min-h-[190px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-8 lg:px-8"><div className="relative z-10"><span className="inline-flex rounded-full bg-[#D7A31A] px-4 py-1.5 text-[10px] font-bold text-white">DEFENCE</span><h1 className="mt-5 text-[40px] font-bold leading-[48px] text-[#252D02]">Existing Industry-Sector Strategies</h1><p className="mt-4 text-sm text-[#535862]">Select a veterans’ program or initiative to view more detail.</p></div><div className="absolute right-12 top-8 hidden h-[130px] w-[350px] items-center justify-between lg:flex">{[Network,ShieldCheck,ClipboardList,Landmark,BriefcaseBusiness,BookOpen].map((Icon,index)=><span key={index} className={`grid place-items-center rounded-full bg-[#F2F5E7] text-[#719926] ${index===3?"size-20":"size-12"}`}><Icon size={index===3?34:21} strokeWidth={1.5}/></span>)}</div></section>
    <section><h2 className="mb-3 text-lg font-bold">STRATEGIES · {initiatives.length} · SELECT TO OPEN</h2><div className="grid items-start gap-6 lg:grid-cols-[360px_1fr]"><div className="space-y-3">{initiatives.map((item,index)=><button key={`${item[0]}-${item[1]}`} type="button" onClick={()=>setActive(index)} className={`grid min-h-[88px] w-full grid-cols-[1fr_38px] items-center gap-3 rounded-xl border bg-white px-5 py-4 text-left ${active===index?"border-[#D6A21D] ring-1 ring-[#D6A21D]":"border-[#E1E3DC]"}`}><span><span className="block text-[10px] font-semibold uppercase text-[#C5951B]">{String(index+1).padStart(2,"0")} · {item[0]}</span><strong className="mt-3 block text-[13px] leading-[18px] text-[#252D02]">{item[1]}</strong></span><span className={`grid size-8 place-items-center rounded-full ${active===index?"border border-[#A9BE67] bg-white":"bg-[#7BC900]"}`}><ArrowRight size={14}/></span></button>)}</div>
      <article className="rounded-xl bg-[#ECEDE2] p-6"><div className="flex items-center justify-between"><span className="rounded-full bg-[#D7A31A] px-5 py-2 text-xs font-bold text-white">{String(active+1).padStart(2,"0")}</span><div className="flex gap-3">{active>0&&<button type="button" onClick={()=>setActive(active-1)} className="inline-flex h-10 items-center gap-2 rounded-full border border-[#A9BE67] bg-white px-5 text-xs font-semibold text-[#68821E]"><ArrowLeft size={15}/> Previous</button>}<button type="button" onClick={()=>setActive((active+1)%initiatives.length)} className="inline-flex h-10 items-center gap-2 rounded-full bg-[#7BC900] px-5 text-xs font-semibold">Next <ArrowRight size={15}/></button></div></div><div className="mt-6 rounded-xl bg-white p-6"><h3 className="text-xl font-bold text-[#252D02]">{initiative[2]}</h3><p className="mt-7 text-[13px] leading-[21px] text-[#535862]">Royal Commission into Defence and Veteran Suicide resource.</p><p className="mt-4 text-[13px] leading-[21px] text-[#535862]">This initiative supports veterans and transitioning Australian Defence Force personnel through employment guidance, recognition of transferable skills, training pathways and access to relevant support services.</p></div></article></div></section>
    <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6"><h2 className="text-2xl font-bold">Sources</h2><ol className="mt-6 grid gap-3 text-xs leading-5 text-[#535862] lg:grid-cols-2">{initiatives.slice(0,12).map((item,index)=><li key={item[1]} className="grid grid-cols-[24px_1fr] gap-3"><span className="grid size-5 place-items-center rounded-full bg-[#78A800] text-[10px] font-bold text-white">{index+43}</span><span>{item[0]}, {item[1]}.</span></li>)}</ol></section>
  </PublicSafetyPageShell>;
}
