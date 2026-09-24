"use client";

import { Award, ChevronDown, Landmark, Network, Radar, ShieldCheck, Users } from "lucide-react";
import { useState, type ReactNode } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

type Strategy = {
  number: string;
  title: string;
  subtitle: string;
  accent: string;
  insight: string;
  jsc: string;
  objective: ReactNode;
  approach: ReactNode;
  deliverable: ReactNode;
  impact: ReactNode;
  timing: string;
  stakeholders: string[];
};

const strategies: Strategy[] = [
  {
    number: "1",
    title: "Support Defence skill and capability requirements to operationalise drones",
    subtitle: "Workforce Insight: Emerging technologies  |  JSC Function: Training Product Development",
    accent: "#D6A21D",
    insight: "Emerging technologies",
    jsc: "Training Product Development",
    objective: <>Map current Defence micro-credentials on drones and unmanned aerial systems (UAS) to existing units of competency from current VET qualifications.</>,
    approach: <>Identify whether current units of competency relating to UAS and drones meet the skills requirements of Defence. Should gaps be found, review/develop new units of competency to address these gaps.</>,
    deliverable: <>Mapping Report</>,
    impact: <>Support the Defence workforce by enabling rapid, targeted upskilling in UAS and drone related technologies.</>,
    timing: "12-month project",
    stakeholders: ["Civil Aviation Safety Authority (CASA)", "Industry Skills Australia", "Defence Education, Learning and Training Authority (DELTA)"],
  },
  {
    number: "2",
    title: "Support transition of Defence Veterans to civilian workforce",
    subtitle: "Workforce Insight: Transitioning Veterans  |  JSC Function: Implementation, Promotion and Monitoring",
    accent: "#5C5E59",
    insight: "Transitioning Veterans",
    jsc: "Implementation, Promotion and Monitoring",
    objective: <>Support Recommendation 83B of the Royal Commission into Defence and Veteran Suicide by supporting up-to-date information facilitated by state and territory initiatives that assist transitioning veterans.</>,
    approach: <>Collaborate with Defence to map ADF job roles and training to the Australian Qualifications Framework (AQF) levels and approximate equivalent civilian qualifications.<br />Develop material that translates military terminology into civilian contexts, to build collective understanding for both transitioning veterans and prospective civilian employers.<br />Collaborate with Defence to share this information back through state and territories to be included on their websites for veterans.</>,
    deliverable: <ul className="list-disc pl-5"><li>Mapping Report</li><li>Military Terminology Guide</li></ul>,
    impact: <>Support Recommendation 83B by providing information through Defence, states and territories that support veterans to translate their Defence skills and experience into civilian-recognised language.</>,
    timing: "12-month project",
    stakeholders: ["Australian Public Service Academy", "Defence Education, Learning and Training Authority (DELTA)", "Department of Veterans' Affairs", "State Training Authorities/Senior Responsible Officers"],
  },
];

function StrategyCard({ strategy }: { strategy: Strategy }) {
  const [open, setOpen] = useState(true);
  const rows = [
    ["Workforce Insight:", strategy.insight],
    ["JSC Function:", strategy.jsc],
    ["Objective:", strategy.objective],
    ["Approach:", strategy.approach],
    ["Deliverable:", strategy.deliverable],
    ["Impact:", strategy.impact],
    ["Anticipated timing:", strategy.timing],
  ] as const;

  return <article className="overflow-hidden rounded-xl border border-[#E2E3DD] bg-white" style={{ borderTop: `9px solid ${strategy.accent}` }}>
    <div className="px-6 pb-6 pt-5">
      <div className="flex items-center justify-between gap-4"><span className="rounded-full px-4 py-1.5 text-[10px] font-bold text-white" style={{ backgroundColor: strategy.accent }}>Strategy {strategy.number}</span><button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="inline-flex h-10 items-center gap-2 rounded-full bg-[#7BC900] px-5 text-xs font-semibold text-[#253100]">{open ? "Close" : "Open"}<ChevronDown size={15} className={open ? "rotate-180" : ""}/></button></div>
      <h2 className="mt-7 max-w-[600px] text-xl font-bold leading-7 text-[#252D02]">{strategy.title}</h2>
      <p className="mt-4 border-b border-[#E4E5E0] pb-6 text-xs text-[#535862]">{strategy.subtitle}</p>
      {open && <div className="mt-6 space-y-5 text-[13px] leading-[21px] text-[#535862]">{rows.map(([label, value]) => <div key={label}><h3 className="mb-1 font-bold text-[#343B19]">{label}</h3><div>{value}</div></div>)}<div><h3 className="mb-3 font-bold text-[#343B19]">Key Stakeholders:</h3><div className="flex flex-wrap gap-2">{strategy.stakeholders.map((stakeholder) => <span key={stakeholder} className="rounded-full bg-[#F2F6DE] px-4 py-1.5 text-[11px] font-semibold text-[#66801D]">•&nbsp; {stakeholder}</span>)}</div></div></div>}
    </div>
  </article>;
}

export default function PublicSafetyDefenceWorkforceStrategiesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="defence_workforce_strategies" navigation={{ back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`}, backSecondary:{label:"Defence chapter",href:`/reports/${slug}/defence`}, prev:{label:"Workforce Insights",href:`/reports/${slug}/defence_workforce_insights`}, next:{label:"2025 Strategy Updates",href:`/reports/${slug}/defence_update_2025_strategies`}, prevPrefix:"Previous Section:", nextPrefix:"Next Section:" }}>
    <section className="relative min-h-[190px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-8 lg:px-8">
      <div className="relative z-10 max-w-[850px]"><span className="inline-flex rounded-full bg-[#D7A31A] px-4 py-1.5 text-[10px] font-bold uppercase text-white">Defence · Proposed Strategies 2026</span><h1 className="mt-5 text-[40px] font-bold leading-[48px] text-[#252D02]">Proposed Strategies 2026</h1><p className="mt-4 text-sm text-[#535862]">Public Skills Australia proposes the following strategies aligned to the workforce insights identified to support Defence.</p></div>
      <div className="absolute right-12 top-7 hidden h-[145px] w-[340px] items-center justify-center lg:flex"><div className="absolute grid size-32 place-items-center rounded-full bg-[#F1F5E2]"><Landmark size={48} className="text-[#719926]" strokeWidth={1.4}/></div><div className="absolute left-2 top-3 grid size-12 place-items-center rounded-full bg-[#F6F8EE]"><Award size={23} className="text-[#719926]"/></div><div className="absolute left-1 bottom-3 grid size-12 place-items-center rounded-full bg-[#F6F8EE]"><Users size={22} className="text-[#719926]"/></div><div className="absolute right-2 top-3 grid size-12 place-items-center rounded-full bg-[#F6F8EE]"><Network size={22} className="text-[#719926]"/></div><div className="absolute right-1 bottom-3 grid size-12 place-items-center rounded-full bg-[#F6F8EE]"><ShieldCheck size={22} className="text-[#719926]"/></div><Radar size={27} className="absolute bottom-2 left-[145px] text-[#719926]"/></div>
    </section>
    <section className="grid items-start gap-6 lg:grid-cols-2">{strategies.map((strategy) => <StrategyCard key={strategy.number} strategy={strategy}/>)}</section>
  </PublicSafetyPageShell>;
}
