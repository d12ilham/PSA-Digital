"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const insights = [
  { title: "Defence", color: "#D3992C", tint: "#FBF5E8", items: [["Emerging Technology", "1", "Challenges remain in the rapid adoption of emerging technology due to significant security screening requirements. These requirements can limit the speed at which employees are upskilled in the use of new technology."], ["Transitioning Veterans", "2", "Transitioning ADF personnel bring valuable capabilities to civilian workforces, but improved recognition and translation of military skills is needed to support effective employment pathways."]] },
  { title: "Fire and Emergency Services", color: "#C9481A", tint: "#FBECE7", items: [["Disaster Recovery", "3", "Contemporary disaster recovery requires capabilities for working with communities that may be grieving or socially, emotionally and financially impacted."], ["Surf Life Saving First Aid", "4", "The HLTAID010 unit of competency is an entry-level first aid training product that is no longer meeting the operational needs of volunteer surf lifesavers."], ["Hazardous Materials", "5", "Hazardous materials incidents are increasingly important, while current regulatory and training requirements limit some organisations' ability to deliver this service."]] },
  { title: "Access to VET Qualifications and Training Delivery Partners", color: "#0D71A3", tint: "#E8F2F6", items: [["Digital Forensics", "6", "Skills shortages and strong demand for similar capabilities may require multiple entry pathways for digital forensic professionals into policing."], ["Regional and remote police leadership", "7", "Regional and remote policing requires leadership development that reflects distinct operating environments, community expectations and workforce pressures."]] },
];

const strategies = [
  { title: "Defence", color: "#D3992C", tint: "#FBF5E8", items: [["Support Defence skill and capability requirements to operationalise drones", "1", "Develop nationally recognised training pathways that support Defence personnel to safely and effectively operationalise drone capability."], ["Support transition of Defence Veterans to civilian workforce", "2", "Improve recognition and translation of Defence skills so veterans can move into relevant civilian occupations and further training."]] },
  { title: "Fire and Emergency Services", color: "#C9481A", tint: "#FBECE7", items: [["Support uptake of disaster recovery training products", "3", "Promote contemporary disaster recovery training products and support consistent capability across organisations and jurisdictions."], ["Review first aid units of competency for Surf Life Saving in the Certificate II in Public Safety (Aquatic Rescue)", "4", "Review first aid requirements so the qualification remains aligned with the operational needs of volunteer surf lifesavers."], ["Review prerequisite requirements for PUAFIR306 Identify, detect and monitor hazardous materials at an incident", "5", "Review prerequisite arrangements to provide greater training flexibility while retaining safety-critical hazardous materials capability."]] },
  { title: "Access to VET Qualifications and Training Delivery Partners", color: "#0D71A3", tint: "#E8F2F6", items: [["Develop Training Products for Digital Forensics", "6", "Develop training products that support foundation, core examiner and specialist digital forensic capabilities across policing."]] },
];

const iconPath = (name: string) => `/images/reports/introduction/${name}.svg`;

function ActionButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return <button type="button" onClick={onClick} className="group inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#8AC900] px-5 text-xs font-bold text-[#252D02] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#78AF00] hover:shadow-md">{children}<ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" /></button>;
}

function SectionHeading({ icon, title, description, action, onClick }: { icon: string; title: string; description?: string; action: string; onClick?: () => void }) {
  return (
    <div className="flex items-center gap-4">
      <Image src={iconPath(icon)} alt="" width={52} height={52} className="h-[52px] w-[52px] shrink-0" />
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold leading-7 text-[#252D02]">{title}</h2>
        {description && <p className="mt-3 max-w-[900px] text-sm leading-6 text-[#535862]">{description}</p>}
      </div>
      <ActionButton onClick={onClick}>{action}</ActionButton>
    </div>
  );
}

function SectorColumn({ sector, group, expandedId, onToggle, visible = true, delay = 0 }: { sector: typeof insights[number] | typeof strategies[number]; group: "insight" | "strategy"; expandedId: string | null; onToggle: (id: string) => void; visible?: boolean; delay?: number }) {
  return (
    <article style={visible ? { animationDelay: `${delay}s` } : undefined} className={`group overflow-hidden rounded-lg border border-[#E9EAEB] bg-white transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:border-[#728C28] hover:shadow-lg ${visible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
      <div className="h-2" style={{ backgroundColor: sector.color }} />
      <div className="p-5">
        <h3 className="min-h-10 max-w-[330px] text-sm font-bold leading-5 text-[#252D02]">{sector.title}</h3>
        <div className="mt-3 space-y-2">
          {sector.items.map(([title, number, detail]) => {
            const id = `${group}-${number}`;
            const expanded = expandedId === id;
            return (
            <div key={number} style={{ backgroundColor: sector.tint }} className={`relative min-h-[116px] overflow-hidden rounded-md border border-white/70 p-5 pl-14 transition-all duration-300 hover:border-[#B8C9A0] hover:shadow-sm ${expanded ? "shadow-sm" : "hover:-translate-y-0.5"}`}>
              <span className="absolute left-4 top-4 text-3xl font-light" style={{ color: `${sector.color}33` }}>{number}</span>
              <p className="text-sm font-bold leading-5 text-[#252D02]">{title}</p>
              <button type="button" aria-expanded={expanded} onClick={() => onToggle(id)} className="mt-3 inline-flex h-7 items-center gap-1.5 rounded-full bg-[#8AC900] px-3 text-[10px] font-bold text-[#252D02] transition-colors hover:bg-[#78AF00]">{expanded ? "Close" : "Open"}<ChevronDown size={12} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}/></button>
              <div className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${expanded ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><div className="border-t border-black/10 pt-4"><p className="text-[10px] font-semibold uppercase" style={{ color: sector.color }}>{group === "insight" ? `Industry Insight ${number}` : `Workforce Strategy ${number}`}</p><p className="mt-2 text-xs leading-5 text-[#535862]">{detail}</p></div></div></div>
            </div>
          )})}
        </div>
      </div>
    </article>
  );
}

export default function PublicSafetyExecutiveSummaryView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  const insightsRef = React.useRef<HTMLElement>(null);
  const strategiesRef = React.useRef<HTMLElement>(null);
  const [isInsightsVisible, setIsInsightsVisible] = React.useState(false);
  const [isStrategiesVisible, setIsStrategiesVisible] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const toggleDropdown = (id: string) => setExpandedId((current) => current === id ? null : id);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === insightsRef.current) setIsInsightsVisible(true);
        if (entry.target === strategiesRef.current) setIsStrategiesVisible(true);
      });
    }, { threshold: 0.1 });

    if (insightsRef.current) observer.observe(insightsRef.current);
    if (strategiesRef.current) observer.observe(strategiesRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <PublicSafetyPageShell slug={slug} report={report} currentPage="executive_summary" navigation={{ backSecondary:{label:"About Public Skills Australia",href:`/reports/${slug}/about`}, prev:{label:"Introduction",href:`/reports/${slug}/introduction`}, next:{label:"Drivers of Change",href:`/reports/${slug}/drivers_of_change`} }}>
      <section className="h-auto rounded-lg border border-[#E9EAEB] bg-white p-6 lg:min-h-[302px] lg:p-8">
        <div className="flex h-full flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="w-full min-w-0 flex-1 self-start lg:max-w-[760px]">
            <h1 className="animate-slide-up text-[40px] font-bold leading-[48px] text-[#18254A]">Executive Summary</h1>
            <div className="animate-slide-up-delay"><p className="mt-4 text-base leading-6 text-[#535862]">Public Skills Australia&apos;s 2026 Public Safety Workforce Insights Report considers the wider operational contexts impacting Public Safety and Government industry-sectors. It identifies four drivers of change that will impact workforce planning in the short to medium term, aligned with the nine megatrends detailed in previous Workforce Insights Reports, that remain relevant to long term workforce trends.</p>
            <p className="mt-4 text-base leading-6 text-[#535862]">The Report analyses themes consistent across all three Public Safety industry-sectors before examining each Public Safety industry-sector individually. The report provides data analysis, identifying workforce insights and detailing strategies aimed at addressing workforce challenges.</p></div>
          </div>
          <div className="relative hidden h-[120px] w-[420px] shrink-0 items-center justify-between lg:flex xl:w-[500px] min-[1500px]:w-[570px]">
            <div className="absolute left-12 right-12 top-[46px] h-2 border-y-2 border-[#8AC900] animate-flow-separator xl:left-14 xl:right-14 xl:top-[52px] min-[1500px]:left-[60px] min-[1500px]:right-[60px] min-[1500px]:top-[56px]" style={{ animationDelay: "0.35s" }} />
            {["Drivers", "Insights", "Strategies", "Summary"].map((icon, index) => <Image key={icon} src={iconPath(icon)} alt="" width={120} height={120} style={{ animationDelay: `${index * 0.5 + 0.1}s` }} className="relative h-24 w-24 animate-flow-item xl:h-[108px] xl:w-[108px] min-[1500px]:h-[120px] min-[1500px]:w-[120px]" />)}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-[#E9EAEB] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#728C28] hover:shadow-md lg:min-h-[124px]"><SectionHeading icon="Drivers" title="Drivers of Change" description="Four drivers of change impacting workforce planning in the short to medium term, aligned with the nine megatrends detailed in previous Workforce Insights Reports." action="Present Drivers of Change" onClick={() => router.push(`/reports/${slug}/drivers_of_change`)} /></section>

      <section ref={insightsRef} className={`overflow-hidden rounded-lg border border-[#E9EAEB] bg-white ${isInsightsVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
        <div className="p-6"><SectionHeading icon="Insights" title="Seven industry insights" description="OPEN reveals the content on this page." action="Present Workforce Insights" /></div>
        <div className="border-t border-[#E9EAEB] px-6 py-6"><div className="grid items-start gap-5 lg:grid-cols-3">{insights.map((sector, index) => <SectorColumn key={sector.title} sector={sector} group="insight" expandedId={expandedId} onToggle={toggleDropdown} visible={isInsightsVisible} delay={index * 0.12 + 0.18} />)}</div></div>
      </section>

      <section ref={strategiesRef} className={`overflow-hidden rounded-lg border border-[#E9EAEB] bg-white ${isStrategiesVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
        <div className="p-6"><SectionHeading icon="Strategies" title="Six 2026 Proposed Workforce Strategies" description="The following strategies have been developed to support efforts to address challenges identified through the above industry insights." action="Present Workforce Strategies" /></div>
        <div className="border-t border-[#E9EAEB] px-6 py-6"><div className="grid items-start gap-5 lg:grid-cols-3">{strategies.map((sector, index) => <SectorColumn key={sector.title} sector={sector} group="strategy" expandedId={expandedId} onToggle={toggleDropdown} visible={isStrategiesVisible} delay={index * 0.12 + 0.18} />)}</div></div>
      </section>

      <section className="rounded-lg border border-[#E9EAEB] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#728C28] hover:shadow-md lg:min-h-[150px]"><SectionHeading icon="Summary" title="2027 and Beyond" description="This report concludes by looking towards the 2027 Workforce Insights Reports and beyond. Future work will focus on broader priorities, including the participation of First Nations people, women and other genders in the Public Safety and Government workforces, in addition to examining the implications of artificial intelligence (AI) and digital transformation." action="View 2027 and Beyond" onClick={() => router.push(`/reports/${slug}/looking_forward`)} /></section>

      <section className="flex min-h-10 flex-wrap items-center gap-3">
        <h2 className="mr-1 text-2xl font-bold leading-8 text-[#252D02]">Supporting Sections:</h2>
        {[["Public Safety Cross-Sector Analysis", "cross_sector_analysis"], ["DEF CHAPTER", "defence"], ["FES CHAPTER", "fes"], ["POL CHAPTER", "police"]].map(([label, path]) => <button key={label} type="button" onClick={() => router.push(`/reports/${slug}/${path}`)} className="h-10 rounded-full border border-[#B2DB79] bg-[#FAFAF0] px-5 text-xs font-semibold text-[#598303] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#728C28] hover:bg-[#F0F5DF] hover:shadow-sm">{label}</button>)}
      </section>
    </PublicSafetyPageShell>
  );
}
