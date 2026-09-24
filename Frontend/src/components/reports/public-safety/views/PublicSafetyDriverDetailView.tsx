"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const drivers = [
  {
    key: "driver_1",
    title: "Resilience of organisations to respond to strategic shocks",
    detailTitle: "Driver 1 — Resilience of organisations to respond to strategic shocks",
    body: "Organisational resilience is emerging as a critical driver of change across Australia’s Public Safety and Government industry-sectors, particularly as agencies confront increasingly frequent and complex strategic shocks. Recent experience with compounding crises (such as increasingly intense bushfires, major cyber attacks and intensifying geopolitical tensions) have exposed structural vulnerabilities and highlighted the need for more adaptive, anticipatory and integrated capabilities. Investment will be required to deepen organisational capabilities that supports system-wide preparedness, robust governance and the ability to maintain critical functions under stress.",
    reference: "3",
    panelHeight: 292,
  },
  {
    key: "driver_2",
    title: "Challenges to workforce productivity",
    detailTitle: "Driver 2 — Challenges to workforce productivity",
    body: "In its Five Pillars of Productivity enquiry reports, the Productivity Commission observed that productivity growth has been slowing globally since the mid-2000s, with Australia experiencing the slowest productivity growth in 60 years. The Productivity Commission identified long-standing pressures that have contributed to the productivity slowdown, including market stagnation, a persistently tight labour market and slower uptake of technological innovations. These factors are further exacerbated by emerging challenges linked to the megatrends including an ageing population, technological development, climate change and competition for labour.",
    reference: "4 5",
    panelHeight: 292,
  },
  {
    key: "driver_3",
    title: "Emergence of AI, greater automation and broader digital transformation",
    detailTitle: "Driver 3 — Emergence of Artificial Intelligence (AI), greater automation and broader digital transformation",
    body: "AI, automation and accelerated digital transformation are powerful drivers of organisational and system-level change in the short term. This is reinforced by a push from the Federal Government for greater adoption of AI and digital initiatives across federal agencies. These initiatives signal a shift toward embedding AI into core service delivery, regulatory functions and operational decision making. AI, automation and digital transformation represent an opportunity for significant capability uplift through AI-enabled analytics, automation of high-volume processes and advanced digital platforms that enhance situational awareness, threat detection and emergency response coordination. Conversely, they represent a growing security risk as they are also being leveraged by threat actors to disrupt government services, facilitate foreign interference, enable disinformation, promote false narratives through deepfakes and erode trust in government institutions.",
    reference: "6 7",
    panelHeight: 368,
  },
  {
    key: "driver_4",
    title: "Workforce inclusivity",
    detailTitle: "Driver 4 — Workforce inclusivity",
    body: "Workforce inclusivity has been a key focus across the labour market. In the Public Safety and Government industry-sectors this is likely to translate into a continued focus on recruiting, retaining and developing employees from diverse cultural, linguistic, gender, disability and neurodivergent backgrounds. As organisations seek to increase workforce participation from these cohorts, they will be required to adapt and change legacy systems and processes to respond to the needs of the modern workforce.",
    reference: "",
    panelHeight: 268,
  },
];

const megatrends = [
  {
    icon: "Limitations",
    title: "Limitations in career pathways",
    body: "Career pathway opportunities for young professionals require further promotion, as potential employees are often unaware of Local Government career opportunities and pathways.",
    panelHeight: 136,
  },
  {
    icon: "Climate",
    title: "Climate change",
    body: "Climate change impacts many functions of Local Government, such as emergency management and environmental planning.",
    panelHeight: 112,
  },
  {
    icon: "Competition",
    title: "Competition for labour",
    body: "Local Government is competing for labour with the private sector and other parts of the public sector. There is also competition for labour between Local Government organisations.",
    panelHeight: 136,
  },
  {
    icon: "Expansion",
    title: "Expansion of core duties",
    body: "Local Government employees are increasingly taking on multiple roles to meet community needs in the Local Government industry sector.",
    panelHeight: 136,
  },
  {
    icon: "Diversity",
    title: "Diversity and inclusion",
    body: "Equitable gender composition and meaningful participation of a diverse workforce is an ongoing goal for Local Government workforces, particularly in leadership roles.",
    panelHeight: 136,
  },
  {
    icon: "Demographic",
    title: "Demographic shifts",
    body: "Ageing workforces can impact the transfer of institutional knowledge and further create skills gaps in Local Government workforces.",
    panelHeight: 136,
  },
  {
    icon: "Technological",
    title: "Technological development",
    body: "The implementation of new technology in the Local Government workforce can be impacted by resource constraints and the availability of training.",
    panelHeight: 136,
  },
  {
    icon: "Recruitment",
    title: "Recruitment and retention",
    body: "There are several barriers to the attraction and retention of Local Government workforces in remote, regional and rural locations.",
    panelHeight: 136,
  },
  {
    icon: "Public",
    title: "Public trust and perceptions",
    body: "Local Governments are required to balance resourcing constraints with meeting community needs, which can impact public trust and perception.",
    panelHeight: 136,
  },
];

const megatrendsSummary = "These megatrends were identified in previous Workforce Insights Reports and will continue to have longer term implications for workforce planning and development across the Public Safety and Government industry-sectors.";

const sources = [
  ["3", "Australian Government Department of Home Affairs, Organisational Resilience: Good Practice Guide, Australian Government Department of Home Affairs, 2024, accessed 25 February 2026."],
  ["4", "Productivity Commission, Five pillars of productivity inquiries – final reports, Productivity Commission, 2025, accessed 13 February 2026."],
  ["5", "Productivity Commission, Five pillars of productivity inquiries, Productivity Commission, 2025, accessed 25 February 2026."],
  ["6", "Australian Government Department of Finance, National framework for the assurance of artificial intelligence in government, Australian Government Department of Finance, 2024, accessed 25 February 2026; Australian Government Digital Transformation Agency, Policy for the responsible use of AI in government, Australian Government Digital Transformation Agency, 2025, accessed 25 February 2026."],
  ["7", "Australian Security Intelligence Organisation (ASIO), Director-General’s Annual Threat Assessment 2025, ASIO, 2025, accessed 25 February 2026."],
];

export default function PublicSafetyDriverDetailView({ slug, report, pageType }: { slug: string; report: PublicSafetyReport; pageType?: string }) {
  const initialIndex = drivers.findIndex((driver) => driver.key === pageType);
  const [activeIndex, setActiveIndex] = useState<number | null>(initialIndex >= 0 ? initialIndex : null);
  const [activeMegatrendIndex, setActiveMegatrendIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : drivers[activeIndex];
  const activeMegatrend = activeMegatrendIndex === null ? null : megatrends[activeMegatrendIndex];

  return (
    <PublicSafetyPageShell slug={slug} report={report} currentPage="drivers_of_change" navigation={{ back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` }, prev: { label: "Methodology", href: `/reports/${slug}/methodology` }, next: { label: "Cross-Sector Analysis", href: `/reports/${slug}/cross_sector_analysis` }, prevPrefix: "Previous Section:" }}>
      <section className="relative overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:h-[318px]">
        <div className="w-full max-w-[800px]">
          <p className="text-xs font-semibold uppercase leading-6 text-[#598303]">Public Safety WIR 2026 · Common to all WIRs</p>
          <h1 className="mt-4 text-[40px] font-bold leading-[54px] text-[#252D02]">Drivers of Change</h1>
          <p className="mt-4 text-xs leading-6 text-[#535862]">In 2024, Public Skills Australia identified nine megatrends impacting the Public Safety and Government industry-sectors. These megatrends were further considered in the development of the 2025 Workforce Insights Reports.</p>
          <p className="mt-4 text-xs leading-6 text-[#535862]">While these megatrends will continue to have longer term implications for workforce planning and development across the Public Safety and Government industry-sectors, the 2026 Workforce Insights Reports have built on these and analysed four key drivers of change that cut across most megatrends. This is important as these drivers of change will likely impact the Public Safety and Government industry-sectors in the short to medium term.</p>
        </div>
        <Image src="/images/reports/drivers-of-change-diagram.png" alt="Four connected drivers of change" width={250} height={240} className="absolute right-20 top-[39px] hidden h-[240px] w-[250px] min-[1200px]:block" />
      </section>

      <section style={{ "--driver-section-height": `${active ? 374 + active.panelHeight : 350}px` } as CSSProperties} className="h-auto lg:h-[var(--driver-section-height)]">
        <div className="h-[76px] border-b border-[#E9EAEB]">
          <h2 className="text-2xl font-bold leading-8 text-[#252D02]">The four key drivers of change</h2>
          <p className="mt-3 text-sm leading-6 text-[#535862]">Select a driver to open its detail</p>
        </div>
        <div className="mt-6 grid gap-2 md:grid-cols-2 lg:h-[250px] lg:grid-cols-4">
          {drivers.map((driver, index) => {
            const selected = index === activeIndex;
            return (
              <article key={driver.key} className={`flex min-h-[250px] flex-col rounded-lg border bg-white p-6 pt-7 ${selected ? "border-[#598303] border-t-4 border-t-[#598303]" : "border-[#E9EAEB] border-t-4 border-t-[#8AC900]"}`}>
                <p className="text-xs font-bold leading-6 text-[#598303]">DRIVER {index + 1}</p>
                <h3 className="mt-5 text-xl font-bold leading-7 text-[#252D02]">{driver.title}</h3>
                <button type="button" onClick={() => { setActiveIndex(selected ? null : index); if (!selected) setActiveMegatrendIndex(null); }} aria-expanded={selected} className={`mt-auto inline-flex h-10 w-fit items-center gap-2 rounded-full px-5 text-xs font-bold ${selected ? "bg-[#598303] text-white" : "bg-[#8AC900] text-[#252D02]"}`}>{selected ? "Close" : "Open"}{selected ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}</button>
              </article>
            );
          })}
        </div>
        {active && activeIndex !== null && (
          <article style={{ "--driver-panel-height": `${active.panelHeight}px` } as CSSProperties} className="mt-6 min-h-[268px] rounded-2xl border border-[#598303] border-l-4 border-l-[#598303] bg-[#F0F3E5] px-8 py-6 lg:h-[var(--driver-panel-height)]">
            <span className="inline-flex h-10 items-center rounded-full bg-[#416102] px-5 text-xs font-bold uppercase text-white">Now presenting · Driver {activeIndex + 1}</span>
            <h2 className="mt-4 text-xl font-bold leading-7 text-[#252D02]">{active.detailTitle}</h2>
            <p className="mt-4 max-w-[800px] text-xs leading-6 text-[#535862]">{active.body}{active.reference && <sup className="ml-0.5 font-bold text-[#598303]">{active.reference}</sup>}</p>
          </article>
        )}
      </section>

      <section style={activeMegatrend ? { "--megatrend-section-height": `${369 + activeMegatrend.panelHeight}px` } as CSSProperties : undefined} className={activeMegatrend ? "h-auto lg:h-[var(--megatrend-section-height)]" : "h-auto lg:h-[200px]"}>
        {activeMegatrend && <div className="h-[49px] border-b border-[#E9EAEB]"><h2 className="inline-flex h-[41px] items-start border-b-2 border-[#8AC900] text-2xl font-bold leading-8 text-[#252D02]">Nine Megatrends</h2></div>}
        <div className={`${activeMegatrend ? "mt-6" : ""} grid grid-cols-2 gap-2 sm:grid-cols-3 lg:h-[200px] lg:grid-cols-9`}>
          {megatrends.map((megatrend, index) => {
            const selected = index === activeMegatrendIndex;
            return (
              <button
                key={megatrend.title}
                type="button"
                aria-expanded={selected}
                aria-controls="megatrend-detail"
                onClick={() => { setActiveMegatrendIndex(selected ? null : index); if (!selected) setActiveIndex(null); }}
                className={`flex min-h-[200px] flex-col items-center rounded-lg border px-5 py-5 text-center transition-colors ${selected ? "border-2 border-[#598303] bg-[#F0F3E5]" : "border-[#E9EAEB] bg-white hover:border-[#8AC900]"}`}
              >
                <div className={`flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-full ${selected ? "bg-white" : "bg-[#F0F3E5]"}`}>
                  <Image src={`/images/reports/drivers-of-change/${megatrend.icon}${selected ? "-active" : ""}.svg`} alt="" width={48} height={48} />
                </div>
                <h3 className={`mt-3 text-xs leading-6 ${selected ? "font-bold text-[#598303]" : "font-medium text-[#252D02]"}`}>{megatrend.title}</h3>
              </button>
            );
          })}
        </div>
        {activeMegatrend && (
          <>
            <article id="megatrend-detail" style={{ "--megatrend-panel-height": `${activeMegatrend.panelHeight}px` } as CSSProperties} className="mt-6 mr-2 rounded-lg border border-[#598303] border-l-4 bg-[#F0F3E5] px-8 py-6 lg:h-[var(--megatrend-panel-height)]">
              <h2 className="text-xl font-bold leading-7 text-[#252D02]">{activeMegatrend.title}</h2>
              <p className="mt-3 max-w-[800px] text-xs leading-6 text-[#535862]">{activeMegatrend.body}</p>
            </article>
            <p className="mt-6 max-w-[800px] text-xs leading-6 text-[#535862]">{megatrendsSummary}</p>
          </>
        )}
      </section>

      <section className="h-[456px] rounded-2xl border border-[#E9EAEB] bg-white p-6">
        <h2 className="text-2xl font-bold leading-8 text-[#252D02]">Sources</h2>
        <ol className="mt-6 w-full max-w-[800px] space-y-4">{sources.map(([number, source]) => <li key={number} className="grid grid-cols-[20px_1fr] gap-3 text-xs leading-6 text-[#535862]"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F0F3E5] text-xs font-bold text-[#598303]">{number}</span><span>{source}</span></li>)}</ol>
      </section>
    </PublicSafetyPageShell>
  );
}
