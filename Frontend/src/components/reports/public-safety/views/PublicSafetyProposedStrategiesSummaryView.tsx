import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
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
    colour: "#D3992C",
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
    colour: "#C4471F",
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
    colour: "#0D71A3",
    pale: "#E7F1F6",
  },
];

const compactStrategies = [
  { column: 0, label: "Strategy 2", title: "Support transition of Defence Veterans to civilian workforce", text: "Support Recommendation 83(c) of the Royal Commission into Defence and Veteran Suicide by facilitating up-to-date information and transition pathways for veterans.", colour: "#D3992C", pale: "#FBF3E3",
    insight: "Transitioning Veterans",
    jsc: "Implementation, Promotion and Monitoring",
    objective: <>Support Recommendation 83(c) of the Royal Commission into Defence and Veteran Suicide by supporting up-to-date information facilitated by state and territory initiatives that assist transitioning veterans.</>,
    approach: <>Collaborate with Defence to map ADF job roles and training to the Australian Qualifications Framework (AQF) levels and approximate equivalent civilian qualifications.<br />Develop material that translates military terminology into civilian contexts, to build collective understanding for both transitioning veterans and prospective civilian employers.<br />Collaborate with Defence to share this information back through state and territories to be included on their websites for veterans.</>,
    deliverables: ["Mapping Report", "Military Terminology Guide"],
    impact: <>Support Recommendation 83(c) by providing information through Defence, states and territories that support veterans to translate their Defence skills and experience into civilian-recognised language.</>,
    timing: "12-month project",
    stakeholders: ["Australian Public Service Academy", "Defence Education, Learning and Training Authority (DELTA)", "Department of Veterans' Affairs", "State Training Authorities/Senior Responsible Officers"],
  },
  { column: 1, label: "Strategy 2", title: "Review first aid units of competency for Surf Life Saving in the Certificate II in Public Safety (Aquatic Rescue)", text: "Ensure the Certificate II in Public Safety (Aquatic Rescue) reflects the first aid requirements of Surf Life Saving.", colour: "#C4471F", pale: "#FCECE8",
    insight: "Surf Life Saving First Aid",
    jsc: "Training Product Development",
    objective: "Ensure the Certificate II in Public Safety (Aquatic Rescue) reflects the first aid requirements of Surf Life Saving.",
    approach: "Collaborate with Surf Life Saving Australia and state/territory organisations to compare the level of current first aid training units with the skills required in surf lifesaving. This may result in an update to the Certificate II in Public Safety (Aquatic Rescue).",
    deliverables: ["Reviewed training products"],
    impact: "Equip surf lifesavers with the skills required to meet current and future needs in keeping Australia’s coastline safe.",
    timing: "12-month project",
    stakeholders: ["AFAC", "Surf Life Saving Australia", "Training Package Assurance Body", "State Training Authority/Senior Responsible Officer"],
  },
  { column: 1, label: "Strategy 3", title: "Review prerequisite requirements for PUAFIR306 Identify, detect and monitor hazardous materials at an incident", text: "Support increased access to hazardous materials training by reviewing a key unit of competency for the Fire and Emergency Services industry.", colour: "#C4471F", pale: "#FCECE8",
    insight: "Hazardous Materials",
    jsc: "Training Product Development",
    objective: "Support increased access to hazardous materials training by reviewing a key unit of competency for the Fire and Emergency Services industry.",
    approach: "Engage with key Fire and Emergency Services employers and unions, and mining stakeholders through AUSMASA, to review the PUAFIR306 Identify, detect and monitor hazardous materials at an incident and PUASAR025 Undertake confined space rescue units of competency.",
    deliverables: ["Reviewed Units of Competency"],
    impact: "Increase accessible training to enable safe and effective hazardous materials response.",
    timing: "18-month project",
    stakeholders: ["AFAC", "United Firefighters Union Australia", "Training Package Assurance Body", "State Training Authority/Senior Responsible Officer"],
  },
];

type Strategy = (typeof detailSections)[number] | (typeof compactStrategies)[number];

function StrategyCard({ item }: { item: Strategy }) {
  const expanded = "intro" in item;

  return (
    <details open={expanded} style={{ borderTopColor: item.colour, backgroundColor: item.pale }} className="group overflow-hidden rounded-2xl border border-[#E9EAEB] border-t-[10px]">
      <summary className={`cursor-pointer list-none space-y-4 p-4 pt-5 [&::-webkit-details-marker]:hidden ${expanded ? "xl:group-open:min-h-[270px]" : ""}`}>
        <div className="flex items-center justify-between gap-3">
          <span style={{ borderColor: item.colour, color: item.colour }} className="rounded-full border bg-white/70 px-3 py-1 text-xs font-medium uppercase">{item.label}</span>
          <span className="inline-flex h-10 items-center gap-2 rounded-full bg-[#8AC900] px-5 text-sm font-semibold text-[#252D02]">
            <span className="group-open:hidden">Open</span>
            <span className="hidden group-open:inline">Close</span>
            <ChevronDown size={14} className="group-open:rotate-180" />
          </span>
        </div>
        <h3 className="text-xl font-semibold leading-7 text-[#252D02]">{item.title}</h3>
        <p className="text-sm leading-6 text-[#252D02]">{expanded ? item.intro : item.text}</p>
      </summary>
      <dl className="m-4 mt-0 space-y-4 rounded-xl bg-white p-4 text-sm leading-6 text-[#535862]">
        {([
          ["Workforce Insight", item.insight],
          ["JSC Function", item.jsc],
          ["Objective", item.objective],
          ["Approach", item.approach],
          ["Deliverable", <ul className="list-disc pl-5">{item.deliverables.map(value => <li key={value}>{value}</li>)}</ul>],
          ["Impact", item.impact],
          ["Anticipated timing", item.timing],
          ["Key Stakeholders", <ul className="flex flex-wrap gap-2">{item.stakeholders.map(value => <li key={value} style={{ backgroundColor: item.pale, color: item.colour }} className="rounded-full px-3 py-1 text-xs font-medium">• {value}</li>)}</ul>],
        ] as const).map(([label, value]) => (
          <div key={label}>
            <dt className="font-semibold text-[#252D02]">{label}:</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

export default function PublicSafetyProposedStrategiesSummaryView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="police_proposed_strategies_summary" navigation={{
    back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    prev: { label: "Police Existing Industry-Sector Strategies", href: `/reports/${slug}/police_existing_strategies` },
    next: { label: "Commonwealth Government Initiatives", href: `/reports/${slug}/police_federal_initiatives` },
    prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
  }}>
    <section className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:flex-row lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase text-[#527900]">Public Safety WIR 2026 · Cross-Sector Strategies</p>
        <h1 className="mt-5 text-[32px] font-bold leading-tight text-[#252D02] xl:text-[40px]">Public Safety Strategies Summary</h1>
        <p className="mt-4 max-w-[680px] text-sm leading-6 text-[#252D02]">The 2026 Public Safety Workforce Insights Report proposes six strategies across the Defence, Fire and Emergency Services and Police industry-sectors. These strategies aim to build on and complement the existing strategies proposed through the 2025 Public Safety Workforce Insights Report, which have been progressed in the preceding pages.</p>
      </div>
      <Image src="/images/reports/public-safety/cross-sector-group-92.svg" alt="" width={364} height={277} className="h-auto w-full max-w-[364px] self-center lg:w-[30%]" />
    </section>

    <section className="grid items-start gap-4 bg-white px-4 py-8 lg:grid-cols-3">
      {detailSections.map((item, column) => (
        <div key={item.sector} className="min-w-0 space-y-6">
          <h2 style={{ backgroundColor: item.colour }} className="inline-flex rounded-full px-3 py-1.5 text-xs font-semibold uppercase text-white">{item.sector}</h2>
          <StrategyCard item={item} />
          {compactStrategies.filter(strategy => strategy.column === column).map(strategy => <StrategyCard key={strategy.title} item={strategy} />)}
        </div>
      ))}
    </section>

    <div className="flex flex-wrap justify-center gap-3">
      {[{ label: "Open in the Defence chapter", href: "defence_workforce_strategies" }, { label: "Fire and Emergency Services", href: "fes_workforce_strategies" }, { label: "Open in Police Chapter", href: "police_workforce_strategies" }].map(item => <Link key={item.href} href={`/reports/${slug}/${item.href}`} className="inline-flex items-center gap-2 rounded-full bg-[#8AC900] px-5 py-3 text-sm font-semibold text-[#253100]">{item.label}<ArrowRight size={14}/></Link>)}
    </div>
  </PublicSafetyPageShell>;
}
