"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const insights = [
  { title: "Defence", color: "#D3992C", items: [["Theme One, Insight One", "Emerging Technology", "1", "124"], ["Theme One, Insight Two", "Transitioning Veterans", "2", "124"]] },
  { title: "Fire and Emergency Services", color: "#C9481A", items: [["Theme Two, Insight One", "Disaster Recovery", "3", "124"], ["Theme Two, Insight Two", "Surf Life Saving First Aid", "4", "124"], ["Theme Two, Insight Three", "Hazardous Materials", "5", "124"]] },
  { title: "Access to VET Qualifications and Training Delivery Partners", color: "#0D71A3", items: [["Theme Three, Insight One", "Digital Forensics", "6", "124"], ["Theme Three, Insight Two", "Regional and remote police leadership", "7", "152"]] },
];

const strategies = [
  { title: "Defence", color: "#D3992C", items: [["Strategy One", "Support Defence skill and capability requirements to operationalise drones", "1", "180"], ["Strategy Two", "Support transition of Defence Veterans to civilian workforce", "2", "152"]] },
  { title: "Fire and Emergency Services", color: "#C9481A", items: [["Strategy One", "Support uptake of disaster recovery training products", "3", "152"], ["Strategy Two", "Review first aid units of competency for Surf Life Saving in the Certificate II in Public Safety (Aquatic Rescue)", "4", "208"], ["Strategy Three", "Review prerequisite requirements for PUAFIR306 Identify, detect and monitor hazardous materials at an incident", "5", "236"]] },
  { title: "Access to VET Qualifications and Training Delivery Partners", color: "#0D71A3", items: [["Strategy One", "Develop Training Products for Digital Forensics", "6", "152"]] },
];

const iconPath = (name: string) => `/images/reports/introduction/${name}.svg`;

function ActionButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return <button type="button" onClick={onClick} className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#8AC900] px-5 text-xs font-bold text-[#252D02]">{children}<ArrowRight className="h-3.5 w-3.5" /></button>;
}

function SectionHeading({ icon, title, description, action, onClick }: { icon: string; title: string; description?: string; action: string; onClick?: () => void }) {
  return (
    <div className="flex items-center gap-5">
      <Image src={iconPath(icon)} alt="" width={64} height={64} className="h-16 w-16 shrink-0" />
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold leading-7 text-[#252D02]">{title}</h2>
        {description && <p className="mt-3 max-w-[900px] text-sm leading-6 text-[#535862]">{description}</p>}
      </div>
      <ActionButton onClick={onClick}>{action}</ActionButton>
    </div>
  );
}

function SectorColumn({ sector, strategy = false }: { sector: typeof insights[number] | typeof strategies[number]; strategy?: boolean }) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#E9EAEB] bg-white">
      <div className="h-2" style={{ backgroundColor: sector.color }} />
      <div className="p-6">
        <div className="flex h-10 items-start justify-between gap-3">
          <h3 className="max-w-[280px] text-base font-bold leading-5 text-[#252D02]">{sector.title}</h3>
          {!strategy && <button type="button" className="shrink-0 text-xs font-semibold text-[#598303]">Theme Overview</button>}
        </div>
        <div className="mt-4 space-y-2">
          {sector.items.map(([eyebrow, title, number, height]) => (
            <div key={number} style={{ minHeight: `${height}px` }} className="relative flex items-start overflow-hidden rounded-lg border border-[#E9EAEB] bg-[#FAFAF0] p-5 pr-16">
              <div><p className="text-xs font-semibold leading-4" style={{ color: sector.color }}>{eyebrow}</p><p className="mt-2 text-sm font-bold leading-5 text-[#252D02]">{title}</p></div>
              <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: sector.color }}>{number}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function PublicSafetyExecutiveSummaryView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  return (
    <PublicSafetyPageShell slug={slug} report={report} currentPage="executive_summary">
      <section className="h-auto rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:h-[302px]">
        <div className="flex h-full flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="w-full max-w-[800px] shrink-0 self-start min-[1500px]:w-[800px]">
            <h1 className="text-[40px] font-bold leading-[54px] text-[#046D2A]">Executive Summary</h1>
            <p className="mt-4 text-base leading-6 text-[#535862]">Public Skills Australia&apos;s 2026 Public Safety Workforce Insights Report considers the wider operational contexts impacting Public Safety and Government industry-sectors. It identifies four drivers of change that will impact workforce planning in the short to medium term, aligned with the nine megatrends detailed in previous Workforce Insights Reports, that remain relevant to long term workforce trends.</p>
            <p className="mt-4 text-base leading-6 text-[#535862]">The Report analyses themes consistent across all three Public Safety industry-sectors before examining each Public Safety industry-sector individually. The report provides data analysis, identifying workforce insights and detailing strategies aimed at addressing workforce challenges.</p>
          </div>
          <div className="relative hidden h-[120px] w-[570px] shrink-0 items-center justify-between min-[1500px]:flex">
            <div className="absolute left-[60px] right-[60px] top-[56px] h-2 border-y-2 border-[#8AC900]" />
            {["Drivers", "Insights", "Strategies", "Summary"].map((icon) => <Image key={icon} src={iconPath(icon)} alt="" width={120} height={120} className="relative h-[120px] w-[120px]" />)}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:h-[136px]"><SectionHeading icon="Drivers" title="Drivers of Change" description="Four drivers of change impacting workforce planning in the short to medium term, aligned with the nine megatrends detailed in previous Workforce Insights Reports." action="Explore Drivers of Change" onClick={() => router.push(`/reports/${slug}/drivers_of_change`)} /></section>

      <section className="overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white lg:h-[700px]">
        <div className="p-6"><SectionHeading icon="Insights" title="Seven industry insights" description="OPEN reveals the content on this page." action="Expand Workforce Insights" /></div>
        <div className="border-t border-[#E9EAEB] px-6 pt-6"><div className="grid gap-6 lg:h-[540px] lg:grid-cols-3">{insights.map((sector) => <SectorColumn key={sector.title} sector={sector} />)}</div></div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white lg:h-[948px]">
        <div className="p-6 lg:h-[136px]"><SectionHeading icon="Strategies" title="2026 Proposed Workforce Strategies" description="The following strategies have been developed to support efforts to address challenges identified through the above industry insights." action="Expand Workforce Strategies" /></div>
        <div className="border-t border-[#E9EAEB] px-6 pt-6"><div className="grid gap-6 lg:h-[764px] lg:grid-cols-3">{strategies.map((sector) => <SectorColumn key={sector.title} sector={sector} strategy />)}</div></div>
      </section>

      <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:h-[184px]"><SectionHeading icon="Summary" title="2027 and Beyond" description="This report concludes by looking towards the 2027 Workforce Insights Reports and beyond. Future work will focus on broader priorities, including the participation of First Nations people, women and other genders in the Public Safety and Government workforces, in addition to examining the implications of artificial intelligence (AI) and digital transformation." action="View 2027 and Beyond" onClick={() => router.push(`/reports/${slug}/looking_forward`)} /></section>

      <section className="flex min-h-10 flex-wrap items-center gap-3">
        <h2 className="mr-1 text-2xl font-bold leading-8 text-[#252D02]">Supporting Sections:</h2>
        {["Public Safety Cross-Sector Analysis", "DEF CHAPTER", "FES CHAPTER", "POL CHAPTER"].map((label) => <button key={label} type="button" onClick={() => router.push(`/reports/${slug}/industry_overview`)} className="h-10 rounded-full border border-[#B2DB79] bg-[#FAFAF0] px-5 text-xs font-semibold text-[#598303]">{label}</button>)}
      </section>
    </PublicSafetyPageShell>
  );
}
