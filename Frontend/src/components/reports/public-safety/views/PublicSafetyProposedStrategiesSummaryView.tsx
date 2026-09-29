import { ArrowRight, CarFront, Plane, Shield, Siren, Truck } from "lucide-react";
import Link from "next/link";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const detailSections = [
  {
    sector: "Defence · 2 strategies",
    label: "Strategy 1",
    title: "Support Defence skill and capability requirements to operationalise drones",
    intro: "Map current Defence micro-credentials on drones and unmanned aerial systems (UAS) to existing units of competency from current VET qualifications.",
    insight: "Emerging technologies",
    jsc: "Training Product Development",
    objective: "Map current Defence micro-credentials on drones and unmanned aerial systems (UAS) to existing units of competency from current VET qualifications.",
    approach: "Identify whether current units of competency relating to UAS and drones meet the skills requirements of Defence. Should gaps be found, review or develop new units of competency to address these gaps.",
    deliverables: ["Mapping Report"],
    impact: "Support the Defence workforce by enabling rapid, targeted upskilling in UAS and drone-related technologies.",
    timing: "12-month project",
    stakeholders: ["Civil Aviation Safety Authority (CASA)", "Defence Education, Learning and Training Authority (DELTA)", "Enterprise Registered Training Organisation Association (ERTOA)", "Industry Skills Australia"],
    colour: "#D69A20",
    pale: "#FBF3E3",
  },
  {
    sector: "Fire and Emergency Services · 3 strategies",
    label: "Strategy 1",
    title: "Support uptake of disaster recovery training products",
    intro: "Strengthen capabilities of disaster recovery for Fire and Emergency Services and Government personnel by promoting the uptake of disaster recovery training products.",
    insight: "Disaster Recovery",
    jsc: "Implementation, Promotion and Monitoring",
    objective: "Strengthen capabilities of disaster recovery for Fire and Emergency Services and Government personnel by promoting the uptake of disaster recovery training products.",
    approach: "Develop and implement a promotion plan for disaster recovery products among TAFEs and RTOs.",
    deliverables: ["Promotion Plan", "Presentation of promotions to RTO, TAFE and stakeholders", "Report on outcomes of engagement"],
    impact: "Capability uplift across Fire and Emergency Services and Government personnel through increased uptake of nationally consistent disaster recovery training.",
    timing: "18-month project",
    stakeholders: ["AFAC", "Australian Institute of Disaster Resilience", "Australian Local Government Association (ALGA)", "National Emergency Management Agency", "TAFE Directors Australia (TDA)", "Enterprise Registered Training Organisation Association (ERTOA)"],
    colour: "#C94824",
    pale: "#FCECE8",
  },
  {
    sector: "Police · 1 strategy",
    label: "Strategy 1",
    title: "Develop Training Products for Digital Forensics",
    intro: "Develop a digital forensics qualification to be included in the POL Police Training Package.",
    insight: "Digital Forensics",
    jsc: "Training Product Development",
    objective: "Develop a digital forensics qualification to be included in the POL Police Training Package.",
    approach: "Engage the Australia New Zealand Policing Advisory Agency (ANZPAA) and the National Institute of Forensic Science to develop a digital forensics qualification, supported by specialist advisory groups.",
    deliverables: ["Accredited Training Products"],
    impact: "Develop a nationally consistent approach to training digital forensics for policing and support addressing an area of skills shortage.",
    timing: "18-month project",
    stakeholders: ["ANZPAA", "National Institute of Forensic Science (NIFS)", "State/Territory Police organisations and Australian Federal Police", "Forensic Services South Australia", "ACT Government Analytical Laboratory", "Canberra Institute of Technology"],
    colour: "#1685A6",
    pale: "#E8F2F6",
  },
];

const compactStrategies = [
  { column: 0, label: "Strategy 2", title: "Support transition of Defence Veterans to civilian workforce", text: "Support Recommendation 8 of the Royal Commission into Defence and Veteran Suicide by facilitating up-to-date information and transition pathways for veterans.", colour: "#D69A20", pale: "#FBF3E3" },
  { column: 1, label: "Strategy 2", title: "Review first aid units of competency for Surf Life Saving in the Certificate II in Public Safety (Aquatic Rescue)", text: "Ensure the Certificate II in Public Safety (Aquatic Rescue) reflects the first aid requirements of Surf Life Saving.", colour: "#C94824", pale: "#FCECE8" },
  { column: 1, label: "Strategy 3", title: "Review prerequisite requirements for PUAFIR306 Identify, detect and monitor hazardous materials at an incident", text: "Support consultation to review prerequisite requirements identified by the Fire and Emergency Services industry.", colour: "#C94824", pale: "#FCECE8" },
];

export default function PublicSafetyProposedStrategiesSummaryView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="police_proposed_strategies_summary" navigation={{
    back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    prev: { label: "Police Existing Industry-Sector Strategies", href: `/reports/${slug}/police_existing_strategies` },
    next: { label: "Commonwealth Government Initiatives", href: `/reports/${slug}/police_federal_initiatives` },
    prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
  }}>
    <section className="relative min-h-[230px] overflow-hidden rounded-xl border border-[#E9EAEB] bg-white px-7 py-8 lg:pr-[360px]">
      <span className="inline-flex rounded-full bg-[#719926] px-4 py-1.5 text-[10px] font-bold uppercase text-white">Public Safety WIR 2026 · Cross-Sector Strategies</span>
      <h1 className="mt-5 text-[40px] font-bold leading-[48px] text-[#252D02]">Public Safety Strategies Summary</h1>
      <p className="mt-4 max-w-[900px] text-xs leading-5 text-[#535862]">The 2026 Public Safety Workforce Insights Report proposes six strategies across the Defence, Fire and Emergency Services and Police industry-sectors. These strategies aim to build on and complement the existing strategies proposed through the 2025 Public Safety Workforce Insights Report, which have been progressed in the preceding pages.</p>
      <div className="absolute right-8 top-6 hidden h-[175px] w-[300px] lg:block">
        {[{ Icon: Shield, x: 0, y: 70 }, { Icon: Siren, x: 75, y: 10 }, { Icon: Plane, x: 150, y: 65 }, { Icon: Truck, x: 45, y: 125 }, { Icon: CarFront, x: 125, y: 125 }].map(({ Icon, x, y }, index) => <span key={index} style={{ left: x, top: y }} className="absolute grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Icon size={25} strokeWidth={1.5}/></span>)}
      </div>
    </section>

    <section className="grid items-start gap-5 lg:grid-cols-3">
      {detailSections.map((item, column) => <div key={item.sector} className="space-y-4">
        <h2 style={{ backgroundColor: item.colour }} className="inline-flex rounded-full px-4 py-1.5 text-[10px] font-bold uppercase text-white">{item.sector}</h2>
        <article style={{ borderTopColor: item.colour, backgroundColor: item.pale }} className="rounded-lg border border-[#E9EAEB] border-t-[7px] p-4">
          <div className="flex items-center justify-between gap-3"><span style={{ borderColor: item.colour, color: item.colour }} className="rounded-full border px-3 py-1 text-[9px] font-bold uppercase">{item.label}</span><span className="rounded-full bg-[#7BC900] px-4 py-1.5 text-[10px] font-semibold text-[#253100]">Close⌃</span></div>
          <h3 className="mt-5 text-lg font-bold leading-6 text-[#252D02]">{item.title}</h3>
          <p className="mt-3 text-xs leading-5 text-[#535862]">{item.intro}</p>
          <div className="mt-5 rounded-lg bg-white px-5 py-5 text-xs leading-5 text-[#535862]">
            <p><strong className="block text-sm text-[#252D02]">Workforce Insight:</strong>{item.insight}</p>
            <p className="mt-4"><strong className="block text-sm text-[#252D02]">JSC Function:</strong>{item.jsc}</p>
            <p className="mt-4"><strong className="block text-sm text-[#252D02]">Objective:</strong>{item.objective}</p>
            <p className="mt-4"><strong className="block text-sm text-[#252D02]">Approach:</strong>{item.approach}</p>
            <div className="mt-4"><strong className="block text-sm text-[#252D02]">Deliverable:</strong><ul className="ml-5 list-disc">{item.deliverables.map(value => <li key={value}>{value}</li>)}</ul></div>
            <p className="mt-4"><strong className="block text-sm text-[#252D02]">Impact:</strong>{item.impact}</p>
            <p className="mt-4"><strong className="block text-sm text-[#252D02]">Anticipated timing:</strong>{item.timing}</p>
            <div className="mt-4"><strong className="block text-sm text-[#252D02]">Key Stakeholders:</strong><div className="mt-2 space-y-2">{item.stakeholders.map(value => <span key={value} style={{ backgroundColor: item.pale, color: item.colour }} className="block rounded-full px-4 py-2 text-[10px] font-semibold leading-4">•&nbsp; {value}</span>)}</div></div>
          </div>
        </article>
        {compactStrategies.filter(item => item.column === column).map(item => <article key={item.title} style={{ borderTopColor: item.colour, backgroundColor: item.pale }} className="rounded-lg border border-[#E9EAEB] border-t-[7px] p-4"><div className="flex items-center justify-between gap-3"><span style={{ borderColor: item.colour, color: item.colour }} className="rounded-full border px-3 py-1 text-[9px] font-bold uppercase">{item.label}</span><span className="rounded-full bg-[#7BC900] px-4 py-1.5 text-[10px] font-semibold text-[#253100]">Open⌄</span></div><h3 className="mt-5 text-base font-bold leading-5 text-[#252D02]">{item.title}</h3><p className="mt-3 text-xs leading-5 text-[#535862]">{item.text}</p></article>)}
      </div>)}
    </section>

    <div className="flex flex-wrap justify-center gap-3">
      {[{ label: "Open in the Defence chapter", href: "defence_workforce_strategies" }, { label: "Fire and Emergency Services", href: "fes_workforce_strategies" }, { label: "Open in Police Chapter", href: "police_workforce_strategies" }].map(item => <Link key={item.href} href={`/reports/${slug}/${item.href}`} className="inline-flex items-center gap-2 rounded-full bg-[#7BC900] px-5 py-3 text-xs font-semibold text-[#253100]">{item.label}<ArrowRight size={14}/></Link>)}
    </div>
  </PublicSafetyPageShell>;
}
