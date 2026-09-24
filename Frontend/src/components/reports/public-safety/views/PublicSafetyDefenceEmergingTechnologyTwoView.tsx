"use client";

import { Bot, BrainCircuit, Drone, RadioTower, Satellite, Shield, Ship, Waves } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const capabilities = [
  { label:"Autonomous maritime systems and uncrewed/optionally crewed vehicles", icon:Ship },
  { label:"Defence intelligence and intelligence systems", icon:BrainCircuit },
  { label:"Next-generation air and strike and strategic communication", icon:Shield },
  { label:"Uncrewed air systems", icon:Drone },
  { label:"Enhanced cyber capabilities", icon:Waves },
  { label:"Space sensors", icon:RadioTower },
];
const investments = [
  { label:"Acquisition of 300 Australian-made drones", icon:Drone },
  { label:"Development of advanced counter-drone technology", icon:Bot },
  { label:"Adoption of more than 20 different drone systems", icon:Satellite },
];
const sources = [
  "Jobs and Skills Australia (JSA), Connecting for Impact - The Jobs and Skills Report 2025, JSA, 2025, page 81, accessed 19 November 2025.",
  "Australian Computer Society (ACS), Digital Tasmania Strategy 2026-2031, ACS, 2024, page 7, accessed 6 January 2026.",
  "Australian Computer Society (ACS), Digital Tasmania Strategy 2026-2031, ACS, 2024, page 12, accessed 6 January 2026.",
  "Department of Defence, 2024 National Defence Strategy and 2024 Integrated Investment Program, Department of Defence, Australian Government, 2024, page 7, accessed 19 November 2025.",
  "Department of Defence, 2024 National Defence Strategy, Department of Defence, Australian Government, 2024, accessed 19 November 2025.",
  "Department of Defence, 2024 Integrated Investment Program, Department of Defence, Australian Government, 2024, accessed 19 November 2025.",
  "Department of Defence, Albanese Government to invest up to $7 billion in counter drone defence [media release], Department of Defence, Australian Government, 21 April 2026, accessed 28 April 2026.",
  "S Baker, 'The drone war is moving too fast for old-school defence tech development', CEO Wars, Business Insider, 18 November 2025, accessed 5 January 2026; O Molloy, Drones in Modern Warfare: Lessons Learnt from the War in Ukraine, Australian Army Occasional Paper No. 29, 2024.",
  "Department of Defence, Growing sovereign industrial base with 300 drones delivered to Defence [media release], Department of Defence, Australian Government, 19 August 2025.",
  "Ministers' Media Centre, $20 million TAFE Centre of Excellence to boost national security and upskill workers for AUKUS [media release], 26 September 2025.",
];

function Tile({ item }: { item: { label: string; icon: typeof Drone } }) {
  const Icon = item.icon;
  return <div className="grid min-h-[150px] place-items-center rounded-lg border border-[#E8DFCE] bg-[#FBF4E8] px-5 py-6 text-center"><div><Icon className="mx-auto size-10 text-[#303632]" strokeWidth={1.6}/><p className="mt-5 text-sm font-semibold leading-5 text-[#535862]">{item.label}</p></div></div>;
}

export default function PublicSafetyDefenceEmergingTechnologyTwoView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="defence_emerging_technology_2" navigation={{ back:{label:"Defence Workforce Insights",href:`/reports/${slug}/defence_workforce_insights`}, backSecondary:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`}, prev:{label:"Workforce Insights",href:`/reports/${slug}/defence_workforce_insights`}, next:{label:"2. Transitioning Veterans",href:`/reports/${slug}/defence_transitioning_veterans`}, prevPrefix:"Previous Section:", nextPrefix:"Next Section:" }}>
    <section className="rounded-2xl border border-[#E9EAEB] bg-white px-6 py-6"><span className="inline-flex rounded-full bg-[#D7A31A] px-4 py-1.5 text-[10px] font-bold text-white">Theme 1. Emerging Technology · Insight Two</span><h1 className="mt-5 text-[40px] font-bold leading-[48px] text-[#252D02]">Emerging Technology</h1><p className="mt-3 text-xs text-[#535862]">Each section below can also be opened individually.</p></section>
    <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6"><div className="grid min-h-[170px] overflow-hidden rounded-xl border border-[#E2E4DB] bg-[#FAFAF0]" style={{gridTemplateColumns:"8px 58px 1fr"}}><div className="bg-[#91AD45]"/><div className="pt-6 text-center text-[50px] font-light leading-none text-[#E7E8D9]">2</div><div className="px-5 py-6"><p className="text-[10px] font-semibold uppercase text-[#6C8C20]">Industry Insight 1.2</p><p className="mt-5 max-w-[940px] text-sm font-semibold leading-6 text-[#252D02]">Provisioning targeted training faster through short courses (often referred to as micro-credentials). Leveraging Vocational Education and Training Units of Competency could be effective in responding to emerging technologies.</p><p className="mt-5 text-xs leading-5 text-[#535862]">The complete supporting report content follows below. Use ← Back to Workforce Insights to return to the presentation anchor.</p></div></div>
      <div className="mt-6"><h2 className="border-b border-[#DADDD4] pb-5 text-2xl font-bold">Capability investment priorities</h2><div className="max-w-[990px] pt-6 text-[13px] leading-[21px] text-[#535862]"><p>Recruitment, training and retention of a highly skilled defence workforce remains a priority as emerging technology changes traditional approaches to capability. The 2024 National Defence Strategy identifies capability priorities that require the ADF workforce to continuously develop and refresh highly technical skills.</p><p className="mt-4">The 2024 Integrated Investment Program outlined $330 billion through to 2033-34 in capability investment priorities that include the following areas:</p></div><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{capabilities.map(item=><Tile key={item.label} item={item}/>)}</div><p className="mt-6 max-w-[990px] text-[13px] leading-[21px] text-[#535862]">As a result of the need to acquire emerging technologies to be able to respond to future threats, the ADF faces the challenge of ensuring that their personnel can rapidly acquire and refresh highly technical skills, at pace with operational needs, while continuing to meet current job role requirements in increasingly complex and dangerous environments.</p></div>
      <div className="mt-7"><h2 className="border-b border-[#DADDD4] pb-5 text-2xl font-bold">Uncrewed aircraft systems (UAS-drone)</h2><div className="max-w-[990px] pt-6 text-[13px] leading-[21px] text-[#535862]"><p>Defence stakeholders and public announcements by the Federal Government have consistently identified uncrewed aircraft systems (UAS-drone) as a critical technology where more training will support operational needs.<sup>23</sup> At an international level, it is acknowledged that UAS technology and counter-drone systems are evolving at a much faster rate than traditional acquisition and training cycles, in large part due to their evolving use in the war in Ukraine. Ukraine has developed and invested in counter-drone systems that are built to efficiently respond to threats that never previously existed.<sup>24</sup> The fast innovation of the Ukraine in response to these threats has been used in NATO training exercises, and provides an example of the way that the ADF could adapt to future threats, with drone technology evolving “every two to three weeks [with a] fundamentally different [model]”.<sup>25</sup> The Australian Government has made a $10 billion commitment to UAS over the next 10 years from 2025 that includes:</p></div><div className="mt-6 grid gap-3 sm:grid-cols-3">{investments.map(item=><Tile key={item.label} item={item}/>)}</div><p className="mt-6 max-w-[990px] text-[13px] leading-[21px] text-[#535862]">In Australia, initiatives such as the Remotely Piloted Aircraft Training School (RPATS) have been established, with Australian Air Force Cadets now eligible for Civil Aviation Safety Authority (CASA) training to qualify as fully certified drone pilots.<sup>27</sup> Additional training for drone capability and other emerging technologies is currently available through programs such as the National Security TAFE Centre of Excellence. Stakeholders advised that current available training is generic, and that Defence-specific training will likely be required to align to varying job roles.</p></div></section>
    <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6"><h2 className="text-2xl font-bold">Sources</h2><ol className="mt-6 space-y-4">{sources.map((source,index)=><li key={source} className="grid grid-cols-[24px_1fr] gap-3 text-xs leading-5 text-[#535862]"><span className="grid size-5 place-items-center rounded-full bg-[#78A800] text-[10px] font-bold text-white">{index+16}</span><span>{source}</span></li>)}</ol></section>
  </PublicSafetyPageShell>;
}
