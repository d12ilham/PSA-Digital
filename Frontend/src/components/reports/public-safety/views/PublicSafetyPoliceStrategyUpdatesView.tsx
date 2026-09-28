"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CarFront } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const projects = [
  {
    completion: "June 2026",
    title: "Police Training Package Release 11.0 and Release 12.0",
    summary: "Updating the Police Training Package to embed Qualification Reform principles to deliver streamlined and relevant qualifications. This includes reducing duplication, aligning with current and emerging workforce needs and responding proactively to industry and student expectations.",
    update: "In collaboration with ANZPAA, State/Territory Police organisations and Australian Federal Police, this project will update the Police Training Package.",
    bullets: ["Diploma of Police Bomb Technician Response", "Diploma of Police Search and Rescue Coordination (Marine / Land)", "Advanced Diploma of Police Search and Rescue Management"],
    secondUpdate: "Public Skills Australia has consulted with some states on their proposed skill and training products and plans to progress this project for ministerial endorsement by June 2026.",
    secondBullets: ["Advanced Diploma of Police Supervision", "Graduate Certificate in Police Management", "Graduate Certificate in Police Prosecution"],
    stakeholders: ["Australia New Zealand Policing Advisory Agency (ANZPAA)", "Police Federation of Australia", "State/Territory Police organisations and Australian Federal Police"],
    priority: "This project will contribute to reflecting the possible impacts of Artificial Intelligence (AI) and broader digital transformation in workforce planning censuses, and in the design and review of qualifications and training products.",
    strategic: "Support the Police industry-sector to continue to build and maintain capable and mobile workforces that are future-ready.",
    driver: "Emergence of Artificial Intelligence (AI), greater automation and broader digital transformation.",
    connection: "Develop Training Products for Digital Forensics.",
  },
  {
    completion: "December 2026",
    title: "Police Occupational Pathways Project",
    summary: "Develop a greater understanding of the factors influencing operational capacity in metropolitan and remote/regional policing. This analysis will also seek to determine the role of the VET system in addressing workforce pipeline challenges.",
    update: "In collaboration with ANZPAA, State/Territory Police organisations and Australian Federal Police, this project will use Police Training Package qualifications to map common skills across occupational roles and identify how the Vocational Education and Training (VET) system could support efforts to address capacity challenges in occupational roles.",
    bullets: [],
    secondUpdate: "An activity submission was approved by DEWR in December 2025. This project began mapping Police Training Package qualifications to understand skills similarities between police occupational roles. Key police stakeholders to undertake consultations starting March 2026 have also been identified.",
    secondBullets: [],
    stakeholders: ["Australia New Zealand Policing Advisory Agency", "Police Federation of Australia", "State/Territory Police Organisations and Australian Federal Police", "State Training Organisations/Senior Responsible Officer"],
    priority: "This project will contribute to addressing Australia’s productivity challenges, including undertaking activity that supports building a skilled, adaptable and inclusive workforce.",
    strategic: "Support the Police industry-sector to continue to build and maintain capable and mobile workforces that are future-ready.",
    driver: "Resilience of organisations to respond to strategic shocks.",
    connection: "",
  },
  {
    completion: "Complete",
    title: "Case Study Analysis of Skilling and Professional Development Profile Mapping",
    summary: "This strategy sought to use previous work where police organisations mapped their Workforce Demographic Data to the Australia New Zealand Policing Advisory Agency (ANZPAA) Skills and Capabilities Profile as a case study to demonstrate good practice and identify key areas of skills and training gaps.",
    update: "In collaboration with ANZPAA, this project sought to engage with 1–2 police organisations to detail their approach in mapping Workforce Demographic Data to ANZPAA’s Skills and Capabilities Profile. Further consultations were undertaken to further explore the concept.",
    bullets: [],
    secondUpdate: "As a result of these consultations, it was indicated that further scoping of this strategy may not be feasible as priorities in police had shifted towards digital skills. Additionally, key contacts in police jurisdictions that had previously participated in skills mapping have since left those organisations, making engagement and data collection more difficult at this time.",
    secondBullets: [],
    stakeholders: ["ANZPAA", "Police Federation of Australia"],
    priority: "This project aimed to contribute to addressing Australia’s productivity challenges, including undertaking activity that supports building a skilled, adaptable and inclusive workforce.",
    strategic: "Support the Police industry-sector to continue to build and maintain capable and mobile workforces that are future-ready.",
    driver: "Workforce Productivity Challenges.",
    connection: "",
  },
];

export default function PublicSafetyPoliceStrategyUpdatesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const project = projects[active];
  const move = (direction: number) => setActive((active + direction + projects.length) % projects.length);

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="police_update_2025_strategies" navigation={{
    back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    backSecondary: { label: "Police chapter", href: `/reports/${slug}/police` },
    prev: { label: "2026 Proposed Workforce Strategy", href: `/reports/${slug}/police_workforce_strategies` },
    next: { label: "Existing Industry-Sector Strategies", href: `/reports/${slug}/police_existing_strategies` },
    prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
  }}>
    <section className="relative min-h-[255px] overflow-hidden rounded-xl border border-[#E9EAEB] bg-white px-7 py-8 lg:pr-[300px]">
      <span className="inline-flex rounded-full bg-[#1685A6] px-4 py-1.5 text-[10px] font-bold uppercase text-white">POL · Industry-Sector Analysis</span>
      <h1 className="mt-5 max-w-[930px] text-[38px] font-bold leading-[46px] text-[#252D02]">2025 Public Safety Workforce Insights Report –<br/>Police Strategies Updates</h1>
      <p className="mt-4 max-w-[900px] text-xs leading-5 text-[#535862]">Public Skills Australia identified workforce strategies for the Police industry-sector as part of the 2025 Public Safety Workforce Insights Report. Updates on the progress of these strategies and activity projects are provided below.</p>
      <div className="absolute right-8 top-10 hidden size-36 place-items-center rounded-full bg-[#E8F2F6] text-[#1685A6] lg:grid"><CarFront size={70} strokeWidth={1.25}/></div>
    </section>

    <section><h2 className="mb-3 text-lg font-bold uppercase text-[#252D02]">Strategies · 3 · Select to open</h2>
      <div className="grid items-start gap-5 lg:grid-cols-[300px_1fr]">
        <div className="space-y-3">{projects.map((item, index) => <button key={item.title} type="button" onClick={() => setActive(index)} className={`flex min-h-[90px] w-full items-center justify-between gap-4 rounded-lg border px-5 py-4 text-left ${active === index ? "border-[#1685A6] bg-[#E8F2F6] shadow-[inset_0_0_0_1px_#1685A6]" : "border-[#E9EAEB] bg-white"}`}><span><span className="block text-[10px] font-semibold uppercase text-[#1685A6]">0{index + 1} · Completion: {item.completion}</span><strong className="mt-3 block text-sm leading-5 text-[#252D02]">{item.title}</strong></span><span className={`grid size-9 shrink-0 place-items-center rounded-full ${active === index ? "border border-[#B8C9A0] bg-white text-[#719926]" : "bg-[#7BC900] text-[#253100]"}`}><ArrowRight size={15}/></span></button>)}</div>

        <article className="rounded-xl bg-[#EEF0E7] p-5"><div className="flex items-center justify-between gap-4"><span className="rounded-full bg-[#1685A6] px-4 py-2 text-[10px] font-bold uppercase text-white">0{active + 1} · Completion: {project.completion}</span><div className="flex gap-2"><button type="button" aria-label="Previous strategy" onClick={() => move(-1)} className="grid size-9 place-items-center rounded-full border border-[#C5CBB6] bg-white text-[#5D791B]"><ArrowLeft size={15}/></button><button type="button" onClick={() => move(1)} className="inline-flex h-9 items-center gap-2 rounded-full bg-[#7BC900] px-4 text-xs font-semibold text-[#253100]">Next<ArrowRight size={14}/></button></div></div>
          <div className="mt-5 rounded-lg bg-white p-6"><div className="flex flex-wrap items-start justify-between gap-4"><h2 className="max-w-[680px] text-xl font-bold text-[#252D02]">{project.title}</h2><span className="rounded-full bg-[#EEF0E7] px-4 py-2 text-[10px] text-[#535862]">Completion: {project.completion}</span></div>
            <div className="mt-6 space-y-5 text-xs leading-5 text-[#535862]"><div><strong className="mb-2 block uppercase text-[#719926]">Summary</strong><p>{project.summary}</p></div><div><strong className="mb-2 block uppercase text-[#719926]">Update</strong><p>{project.update}</p>{project.bullets.length > 0 && <><p className="mt-2">Release 11.0 will update:</p><ul className="list-disc pl-5">{project.bullets.map(item => <li key={item}>{item}</li>)}</ul></>}<p className="mt-2">{project.secondUpdate}</p>{project.secondBullets.length > 0 && <><p className="mt-2">Release 12.0 will update:</p><ul className="list-disc pl-5">{project.secondBullets.map(item => <li key={item}>{item}</li>)}</ul></>}</div></div>
            <div className="mt-6 rounded-lg border-l-[7px] border-[#1685A6] bg-[#E8F2F6] px-6 py-5"><strong className="text-sm text-[#252D02]">Key Stakeholders</strong><ul className="ml-5 mt-3 list-disc space-y-1 text-xs leading-5 text-[#535862]">{project.stakeholders.map(item => <li key={item}>{item}</li>)}</ul></div>
            <div className="mt-5 border-t border-[#DADDD4] pt-5"><span className="text-[10px] font-semibold text-[#719926]">How this informs Public Skills Australia’s work</span><div className="mt-4 space-y-3">{[["Ministerial Priority 2026", project.priority], ["Strategic Plan Priorities 2026", project.strategic], ["Drivers of Change connections", project.driver], ...(project.connection ? [["2026 Police Strategies Connection", project.connection]] : [])].map(([title, text]) => <div key={title} className="rounded-lg border-l-[7px] border-[#1685A6] bg-[#E8F2F6] px-6 py-4 text-xs leading-5 text-[#535862]"><strong className="mb-1 block text-[#252D02]">{title}</strong>{text}</div>)}</div></div>
          </div>
        </article>
      </div>
    </section>
  </PublicSafetyPageShell>;
}
