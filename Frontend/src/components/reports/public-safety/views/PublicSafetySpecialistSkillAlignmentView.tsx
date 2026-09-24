"use client";

import { Search } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const packages = [
  { tag: "Defence training package", code: "DEFMIL024", title: "Conduct military searches", color: "#D7A31A" },
  { tag: "Public Safety training package", code: "PUAAMS007", title: "Coordinate search and rescue operations", color: "#C94F27" },
  { tag: "Police training package", code: "POLSAR012", title: "Coordinate police search and rescue operations", color: "#1383A5" },
];

const sharedSkills = [
  { number: "1", title: "Planning and preparation", body: "Relating to planning for searches, selecting/deploying search equipment and preparing for deployment." },
  { number: "2", title: "Search techniques and procedures", body: "Relating to the application of search techniques and/or procedures relevant to the types of searches." },
  { number: "3", title: "Information management and recording", body: "Requiring a level of record keeping and information handling." },
  { number: "4", title: "Communication and coordination", body: "Emphasising inter-organisation coordination and team communication." },
];

const comparisonRows = [
  {
    skill: "Planning and preparation",
    defence: ["Identify purpose, timing, environment and type of search from supervisor", "Select relevant appropriate personal protection equipment", "Identify, obtain, inspect and test tools and search equipment", "Deploy to an incident site or search area"],
    emergency: ["Search and rescue assets and potential assets are identified and recorded in databases", "Search requirements and techniques are identified in accordance with legislative and organisational guidelines", "Hazards are identified, risks assessed and control measures implemented"],
    police: ["Assess environmental factors to determine impact on SAR operation", "Assess stress areas required to undertake SAR operations based on information about environmental factors", "Develop rescue plan to assist in managing SAR operation"],
  },
  {
    skill: "Communication and coordination",
    defence: ["Coordinate the preparation of the search site and the conduct of searches with other organisations"],
    emergency: ["Search and rescue procedures and policies are communicated to personnel, groups and other organisations, in accordance with the needs of those people"],
    police: ["Liaise with stakeholders to ensure effective coordination of resources", "Coordinate assets through delegation of roles and responsibilities"],
  },
  {
    skill: "Information management and recording",
    defence: ["Record information and complete reports"],
    emergency: ["Information management strategies are identified and applied"],
    police: ["Maintain critical decisions records for accountability purposes"],
  },
  {
    skill: "Search techniques and procedures",
    defence: ["Carry out search and drill procedures applicable to the type of search", "Protect potential evidence and other items or material of interest from contamination, improper handling or removal"],
    emergency: ["Search and rescue procedures and policies are communicated to personnel, groups and other organisations", "Initial search procedures are implemented in accordance with organisational policies"],
    police: ["Determine search patterns in accordance with environmental conditions/factors", "Apply search techniques to support SAR operation"],
  },
];

function AlignmentDiagram() {
  const items = ["Investigations", "Incident Command", "Intelligence", "Search and Rescue"];
  return (
    <div className="relative grid min-h-[210px] grid-cols-2 gap-x-20 gap-y-10 overflow-hidden rounded-2xl bg-[#252D02] p-6">
      <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8AC900] px-5 py-3 text-[10px] font-bold uppercase text-[#252D02]">Skills alignment</span>
      <span className="absolute left-[23%] top-[28%] h-px w-[54%] border-t border-dashed border-[#8AC900]" />
      <span className="absolute left-[23%] top-[70%] h-px w-[54%] border-t border-dashed border-[#8AC900]" />
      <span className="absolute left-1/2 top-[26%] h-[46%] border-l border-dashed border-[#8AC900]" />
      {items.map((item) => (
        <div key={item} className="relative z-20 flex h-10 items-center gap-3 rounded-full bg-white px-3 text-[11px] font-semibold text-[#252D02]">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#252D02] text-[#8AC900]"><Search className="h-3 w-3" /></span>{item}
        </div>
      ))}
      <p className="absolute bottom-3 left-6 right-6 text-[9px] leading-4 text-white/70">The connecting lines show the specialist skills alignment that exists between all four areas. Search and Rescue is the worked example below.</p>
    </div>
  );
}

export default function PublicSafetySpecialistSkillAlignmentView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="cross_sector_specialist_skill_alignment"
      navigation={{
        back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        prev: { label: "Core Skill Alignment", href: `/reports/${slug}/cross_sector_core_skill_alignment` },
        next: { label: "Skills Recognition", href: `/reports/${slug}/cross_sector_skills_recognition` },
        prevPrefix: "Previous Section:",
        nextPrefix: "Next Section:",
      }}
    >
      <section className="grid items-center gap-8 rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:grid-cols-[1fr_620px]">
        <div>
          <p className="text-xs font-semibold uppercase leading-6 text-[#598303]">Cross-Sector Analysis · 02</p>
          <h1 className="mt-3 text-[40px] font-bold leading-[52px] text-[#252D02]">Specialist Skill Alignment</h1>
          <p className="mt-3 max-w-[680px] text-xs leading-6 text-[#535862]">Across the core skill alignment, some roles in the Public Safety industry-sector share a smaller specialist skills alignment. While each industry-sector has distinct operational and legislative contexts, there are specialist roles and skills alignment between. For example:</p>
        </div>
        <AlignmentDiagram />
      </section>

      <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
        <h2 className="border-b border-[#E9EAEB] pb-4 text-2xl font-bold leading-8 text-[#252D02]">Example</h2>
        <p className="mt-5 max-w-[970px] text-xs leading-6 text-[#535862]">All three industry-sectors hold search and rescue related training products. The comparison illustrated below demonstrates, from a Vocational Education and Training (VET) Training Package perspective, that units of competency can share similarities across the search and rescue skills landscape. The following units are used for this demonstration.</p>
        <div className="mt-6 grid gap-2 md:grid-cols-3">
          {packages.map((item) => (
            <article key={item.code} className="relative min-h-[142px] rounded-lg border border-[#E9EAEB] bg-white px-6 pb-5 pt-7">
              <span className="absolute inset-x-0 top-0 h-1 rounded-t-lg" style={{ backgroundColor: item.color }} />
              <span className="inline-flex rounded-full px-3 py-1.5 text-[9px] font-bold uppercase text-white" style={{ backgroundColor: item.color }}>{item.tag}</span>
              <h3 className="mt-3 text-base font-bold text-[#252D02]">{item.code}</h3>
              <p className="mt-2 text-xs font-semibold text-[#598303]">{item.title}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-[10px] font-semibold uppercase text-[#535862]">These three units contain shared skills relating to:</p>
        <div className="mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          {sharedSkills.map((item) => (
            <article key={item.number} className="relative min-h-[158px] overflow-hidden rounded-lg bg-[#F0F3E5] p-6 pl-14">
              <span className="absolute left-4 top-4 text-[48px] font-light leading-none text-[#DDE6C5]">{item.number}</span>
              <h3 className="relative text-sm font-bold leading-5 text-[#252D02]">{item.title}</h3>
              <p className="relative mt-3 text-[10px] leading-5 text-[#535862]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className="rounded-lg border border-[#E9EAEB] border-l-4 border-l-[#598303] bg-white px-8 py-6 text-xs leading-6 text-[#535862]">Where these units of competency differ is in the application in operational contexts and the complexity of learning, with DEFMIL024 focused more on tactical tasks associated with conducting searches, whereas PUAAMS007 and POLSAR012 units of competency are broader in their application of planning and coordinating search and rescue operations.</aside>

      <section>
        <h2 className="mb-4 text-2xl font-bold leading-8 text-[#252D02]">Comparison table</h2>
        <div className="overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white">
          <div className="grid grid-cols-[210px_repeat(3,minmax(0,1fr))] border-b border-[#E9EAEB] text-xs font-bold">
            <div className="p-5">Relevant Performance Criteria</div>
            {packages.map((item) => <div key={item.code} className="border-l border-[#E9EAEB] p-5" style={{ color: item.color }}><span>{item.code}</span><span className="mt-1 block font-medium text-[#535862]">{item.title}</span></div>)}
          </div>
          {comparisonRows.map((row) => (
            <div key={row.skill} className="grid grid-cols-[210px_repeat(3,minmax(0,1fr))] border-b border-[#E9EAEB] last:border-b-0">
              <h3 className="p-5 text-xs font-semibold leading-5 text-[#535862]">{row.skill}</h3>
              {[row.defence, row.emergency, row.police].map((points, index) => (
                <ul key={index} className="border-l border-[#E9EAEB] p-5 text-[10px] leading-5 text-[#535862]">
                  {points.map((point) => <li key={point} className="mb-1.5 flex gap-2 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-[#535862]">{point}</li>)}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </section>
    </PublicSafetyPageShell>
  );
}
