"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Truck } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const projects = [
  {
    completion: "Completed",
    title: "Emergency Tree Operations",
    summary: "Develop a Findings Report highlighting the wide range of tree operations conducted by Fire and Emergency Services to analyse capability requirements and consider the contextualisation of existing training products to meet these requirements.",
    update: "This project was completed as of September 2025. Since publication of the 2025 Public Safety Workforce Insights Report, the Emergency Tree Operations Findings Report has been validated and submitted to the Department of Employment and Workplace Relations.",
    stakeholders: ["Australian Council of State Emergency Services", "Australasian Fire and Emergency Service Authorities Council (AFAC)", "National State Emergency Services Volunteers Association", "Registered Training Organisations", "State/Territory State Emergency Services Organisations", "United Firefighters Union Australia"],
    priority: "This project will contribute to building a shared, evidence-based view of the challenges and opportunities for the Fire and Emergency Services industry-sector.",
    strategic: "Leadership, sector intelligence-sharing, relationship building and cross-collaboration.",
    driver: "Resilience of organisations to respond to strategic shocks.",
  },
  {
    completion: "June 2026",
    title: "Volunteer Leadership Project",
    summary: "The objective of this project is to identify and address capability requirements for non-operational leadership across Fire and Emergency Services volunteer organisations. It seeks to capture the current and emerging needs of volunteer leaders.",
    update: "The initial action of this Fire and Emergency Services stakeholder project, the Volunteer Leadership Skills Review Report, has been drafted and is now progressing through Public Skills Australia’s governance process. This project is on track to begin completion in June 2026. It is anticipated that through consultation on this project, the industry-sector will also gain a clearer understanding of leadership development needs and priorities. This will better position agencies to support volunteer leaders and enhance organisational culture.",
    stakeholders: ["Australian Council of State Emergency Services", "Australasian Fire and Emergency Service Authorities Council (AFAC)", "National State Emergency Services Volunteers Association", "State/Territory Volunteer Fire and Emergency Services Agencies", "Surf Life Saving Australia"],
    priority: "This project will contribute to identifying opportunities to strengthen capabilities of the public safety and government workforce to respond to and manage natural hazards, and to support delivery of emergency services to communities.",
    strategic: "Facilitate the promotion, uptake and implementation of training products.",
    driver: "Workforce resilience.",
  },
  {
    completion: "June 2026",
    title: "Understanding the Youth Volunteer",
    summary: "To identify drivers and challenges to recruiting, engaging and retaining youth volunteers.",
    update: "In collaboration with Fire and Emergency Services volunteer organisations, this project aims to strengthen youth volunteer retention in Fire and Emergency Services by identifying the key drivers of attraction, recruitment and sustained engagement. A literature review was undertaken to inform the research design. This was followed by a facilitated workshop with a wide range of Fire and Emergency Services youth volunteer stakeholders. Initial feedback has indicated that while young people are highly motivated by a desire to contribute to their community, they often face barriers such as competing study and work commitments, and limited structural development pathways. When complete, this project will produce an evidence-based Insights Report outlining findings for organisations relating to attracting, recruiting, engaging and retaining youth volunteers.",
    stakeholders: ["AFAC", "National State Emergency Services Volunteers Association", "Australasian Fire and Emergency Service Authorities Council", "Bushfires NT", "Country Fire Authority", "Department of Fire and Emergency Services WA", "Emergency Management Victoria", "NT Emergency Service", "Rural Fire Service NSW", "NSW Surf Life Saving", "Surf Life Saving Australia", "SA Fire and Emergency Services Commission", "Tasmania Fire Service", "Queensland Fire and Emergency Services"],
    priority: "This project will contribute to addressing Australia’s productivity challenges, including undertaking activity that supports building a skilled, adaptable and inclusive workforce.",
    strategic: "Support our industry-sectors to continue to build and maintain capable and mobile workforces that are future-ready.",
    driver: "Challenges to workforce productivity.",
  },
  {
    completion: "August 2026",
    title: "Complex Infrastructure Training Needs Analysis",
    summary: "To identify training needs and skill requirements of firefighters responding to emergencies in complex infrastructure, such as tunnels and high-rise and multi-purpose dwellings.",
    update: "In collaboration with key Fire and Emergency Services stakeholders, this project will define current and emerging skills and knowledge requirements for emergencies involving complex infrastructure. This will be used as the evidence base to determine the potential future updates to relevant Public Safety Training Package products. Consultations with stakeholders have been undertaken and the first milestone of a Stakeholder Insights Report has been completed. Further stakeholder consultations are planned between February through April 2026, with a subsequent training needs analysis to be completed.",
    stakeholders: ["AFAC", "Fire Protection Association Australia", "State/Territory Volunteer Fire and Emergency Service Agencies", "United Firefighters Union Australia"],
    priority: "This project will contribute to identifying opportunities to strengthen capabilities of the public safety and government workforces in preparing for and responding to emergency events, including identification of emerging or revised skill requirements.",
    strategic: "Support our industry-sectors to continue to build and maintain capable and mobile workforces that are future-ready.",
    driver: "Resilience of organisations to respond to strategic shocks.",
  },
  {
    completion: "December 2026",
    title: "Emerging Technologies Skills Review",
    summary: "To develop a deeper understanding of training and skill needs when responding to emergencies and relating to emerging technologies.",
    update: "In collaboration with key Fire and Emergency Services stakeholders, this project will identify key job roles and positions affected by incidents involving electric vehicles and high-powered lithium-ion batteries, highlight emerging skills requirements and identify relevant training package products requiring update to address capability needs. An activity submission was approved by the Department of Employment and Workplace Relations in December 2025. This project has started the benchmarking of existing research and doctrine to determine current and anticipated skilling requirements. Additionally, initial consultations begin in March 2026.",
    stakeholders: ["AFAC", "Department of Climate Change, Energy, the Environment and Water (DCCEEW)", "Mining and Automotive Skills Alliance", "Powering Skills Organisation", "United Firefighters Union Australia"],
    priority: "This project will contribute to identifying opportunities to strengthen capabilities of the public safety and government workforces in preparing for and responding to emergency events, including identification of emerging or revised skill requirements.",
    strategic: "Support our industry-sectors to continue to build and maintain capable and mobile workforces that are future-ready.",
    driver: "Resilience of organisations to respond to strategic shocks.",
  },
];

export default function PublicSafetyFesStrategyUpdatesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const project = projects[active];
  const showProject = (index: number) => setActive((index + projects.length) % projects.length);
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_update_2025_strategies" navigation={{ back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`}, backSecondary:{label:"Fire and Emergency Services chapter",href:`/reports/${slug}/fes`}, prev:{label:"2026 Proposed Workforce Strategies",href:`/reports/${slug}/fes_workforce_strategies`}, next:{label:"Existing Industry-Sector Strategies",href:`/reports/${slug}/fes_existing_strategies`}, prevPrefix:"Previous Section:", nextPrefix:"Next Section:" }}>
    <section className="relative min-h-[255px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-8 lg:px-8"><div className="max-w-[900px]"><span className="inline-flex rounded-full bg-[#D95222] px-4 py-1.5 text-[10px] font-bold uppercase text-white">FES · Industry-Sector Analysis</span><h1 className="mt-5 max-w-[920px] text-[38px] font-bold leading-[46px] text-[#252D02]">2025 Public Safety Workforce Insights Report<br/>– Fire and Emergency Services Strategies Updates</h1><p className="mt-4 max-w-[840px] text-xs leading-5 text-[#535862]">Public Skills Australia identified workforce strategies for the Fire and Emergency Services industry-sector as part of the 2025 Public Safety Workforce Insights Report. Updates on the progress of these strategies and activity projects are provided below.</p></div><div className="absolute right-20 top-10 hidden size-36 place-items-center rounded-full bg-[#FBECE7] text-[#D95222] lg:grid"><Truck size={68} strokeWidth={1.4}/></div><button type="button" onClick={()=>setExpanded(value=>!value)} className="absolute bottom-7 right-8 inline-flex h-10 items-center gap-2 rounded-full bg-[#7BC900] px-5 text-xs font-semibold text-[#253100]">{expanded ? "Close All" : "Open All"}<ChevronDown size={14} className={expanded ? "rotate-180" : ""}/></button></section>

    <section className="grid items-start gap-5 lg:grid-cols-[300px_1fr]"><aside><h2 className="mb-3 text-lg font-bold uppercase text-[#252D02]">Projects · 5 · Select to open</h2><div className="space-y-3">{projects.map((item,index)=><button key={item.title} type="button" onClick={()=>setActive(index)} style={{backgroundColor:active===index?"#FBECE7":"#FFFFFF"}} className={`flex min-h-[88px] w-full items-center justify-between gap-4 rounded-lg border px-5 py-4 text-left ${active===index?"border-[#D95222] shadow-[inset_0_0_0_1px_#D95222]":"border-[#E9EAEB]"}`}><span><span className="block text-[10px] font-medium uppercase text-[#D95222]">0{index+1} · Completion: {item.completion}</span><strong className="mt-3 block text-sm leading-5 text-[#252D02]">{item.title}</strong></span><span className={`grid size-9 shrink-0 place-items-center rounded-full ${active===index?"bg-white text-[#719926]":"bg-[#7BC900] text-[#253100]"}`}><ArrowRight size={15}/></span></button>)}</div></aside><article className="rounded-xl bg-[#EEF0E7] p-5"><div className="flex items-center justify-between"><span className="rounded-full bg-[#D95222] px-4 py-2 text-[10px] font-bold uppercase text-white">0{active+1} · Completion: {project.completion}</span><div className="flex gap-2"><button type="button" aria-label="Previous project" onClick={()=>showProject(active-1)} className="grid size-9 place-items-center rounded-full border border-[#C5CBB6] bg-white text-[#5D791B]"><ArrowLeft size={15}/></button><button type="button" onClick={()=>showProject(active+1)} className="inline-flex h-9 items-center gap-2 rounded-full bg-[#7BC900] px-4 text-xs font-semibold text-[#253100]">Next<ArrowRight size={14}/></button></div></div><div className="mt-5 rounded-lg bg-white p-6"><div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-xl font-bold text-[#252D02]">{project.title}</h2><span className="rounded-full bg-[#EEF0E7] px-4 py-2 text-[10px] text-[#535862]">Completion: {project.completion}</span></div><div className="mt-6 space-y-5 text-xs leading-5 text-[#535862]"><div><strong className="mb-2 block uppercase text-[#719926]">Summary</strong><p>{project.summary}</p></div><div><strong className="mb-2 block uppercase text-[#719926]">Update</strong><p>{project.update}</p></div></div><div className="mt-6 rounded-lg border-l-[7px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5"><strong className="text-sm text-[#252D02]">Key Stakeholders</strong><ul className="ml-5 mt-3 list-disc space-y-1 text-xs leading-5 text-[#535862]">{project.stakeholders.map(item=><li key={item}>{item}</li>)}</ul></div><div className="mt-5 rounded-lg border-l-[7px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5"><strong className="text-sm text-[#252D02]">Connection to 2026 Strategies</strong><div className="mt-4 space-y-3 text-xs leading-5 text-[#535862]"><p><b className="block text-[#252D02]">Ministerial Priority 2026</b>{project.priority}</p><p><b className="block text-[#252D02]">Strategic Plan Priorities 2026</b>{project.strategic}</p><p><b className="block text-[#252D02]">Drivers of Change connections</b>• {project.driver}</p></div></div>{expanded&&<div className="mt-5 rounded-lg border border-[#E9EAEB] bg-[#FAFAF0] px-6 py-5 text-xs leading-5 text-[#535862]">This expanded view brings together the project’s current status, implementation context and relationship to the proposed 2026 workforce strategies.</div>}</div></article></section>
  </PublicSafetyPageShell>;
}
