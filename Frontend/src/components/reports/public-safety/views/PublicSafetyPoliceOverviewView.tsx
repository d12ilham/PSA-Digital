"use client";

import { ChevronDown, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const datapoints = [
  {
    title: "National Workforce",
    copy: "Nationally fluctuating workforce: Over the last five years, police officer numbers have fluctuated across Australia. Although from June 2020 to June 2021 national sworn police officer FTE increased, this was followed by two years of FTE reductions before stabilising. This trend was experienced consistently across all states and territories, with seven of eight jurisdictions recording increases in police officer FTE from June 2020 to June 2021, and six of eight jurisdictions experiencing decreases from June 2022 to June 2023.",
  },
  {
    title: "State/Territory Police and the Australian Federal Police Workforce",
    copy: "Workforce commitments: Each state and territory government, through election commitments and associated funding allocations, along with announced recruitment drives, have taken considered action to increase their workforce numbers and improve retention. All governments, through either election commitments or public reports, have made long-term commitments to sworn police officer workforce increases to meet police workforce recruitment and retention targets.",
  },
];

function NationalWorkforceChart() {
  const values = [59718, 61031, 60589, 59242, 58631];
  const labels = ["2019-2020", "2020-2021", "2021-2022", "2022-2023", "2023-2024"];
  const min = 58000;
  const max = 61500;
  const points = values.map((value, index) => `${64 + index * 92},${210 - ((value - min) / (max - min)) * 148}`).join(" ");

  return <div className="border-l border-[#E3E5DF] bg-white px-7 py-6">
    <h3 className="text-center text-xs font-bold text-[#252D02]">Yearly National Sworn Police Officer FTE – AUSTRALIA</h3>
    <svg viewBox="0 0 500 285" className="mt-4 w-full" role="img" aria-label="Yearly National Sworn Police Officer FTE in Australia">
      {[58000, 59000, 60000, 61000].map((tick) => {
        const y = 210 - ((tick - min) / (max - min)) * 148;
        return <g key={tick}><line x1="52" x2="454" y1={y} y2={y} stroke="#E7E8E3" /><text x="44" y={y + 4} textAnchor="end" fontSize="9" fill="#69706A">{tick.toLocaleString()}</text></g>;
      })}
      <line x1="52" x2="454" y1="210" y2="210" stroke="#AEB1AA" />
      <polyline points={points} fill="none" stroke="#0D71A3" strokeWidth="3" />
      {values.map((value, index) => {
        const [x, y] = points.split(" ")[index].split(",").map(Number);
        return <g key={value}><circle cx={x} cy={y} r="4" fill="#0D71A3" /><text x={x} y={y - 12} textAnchor="middle" fontSize="9" fontWeight="700" fill="#0D71A3">{value.toLocaleString()}</text><text x={x} y="232" textAnchor="middle" fontSize="8" fill="#535862">{labels[index]}</text></g>;
      })}
      <line x1="140" x2="140" y1="54" y2="238" stroke="#C34D3C" strokeWidth="1.5" />
      <text x="148" y="66" fontSize="9" fontWeight="700" fill="#C34D3C">COVID-19</text>
      <text x="250" y="266" textAnchor="middle" fontSize="8" fill="#737770">NOTE: Data varied in response to the COVID-19 period</text>
    </svg>
    <p className="mt-1 text-[8px] uppercase text-[#777C75]">Source: Productivity Commission, Police services, Table 6A.2, 2026</p>
  </div>;
}

const jurisdictionCharts = [
  { code: "01 · CHART POL", name: "AUSTRALIAN CAPITAL TERRITORY", short: "ACT", values: [716, 863] },
  { code: "02 · CHART POL", name: "NEW SOUTH WALES", short: "NSW", values: [17348, 15898] },
  { code: "03 · CHART POL", name: "NORTHERN TERRITORY", short: "NT", values: [1222, 1404] },
  { code: "04 · CHART POL", name: "QUEENSLAND", short: "QLD", values: [12016, 12562] },
  { code: "05 · CHART POL", name: "SOUTH AUSTRALIA", short: "SA", values: [4664, 4520] },
  { code: "06 · CHART POL", name: "VICTORIA", short: "VIC", values: [16032, 16021] },
  { code: "07 · CHART POL", name: "TASMANIA", short: "TAS", values: [1287, 1418] },
  { code: "08 · CHART POL", name: "WESTERN AUSTRALIA", short: "WA", values: [6460, 7105] },
];

function JurisdictionChartLibrary() {
  const [selected, setSelected] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const chart = jurisdictionCharts[selected];
  const isAct = chart.short === "ACT";
  const isNsw = chart.short === "NSW";
  const isNt = chart.short === "NT";
  const isQld = chart.short === "QLD";
  const isSa = chart.short === "SA";
  const isVic = chart.short === "VIC";
  const isTas = chart.short === "TAS";
  const isWa = chart.short === "WA";
  const endpointsOnly = isAct || isNsw || isNt || isQld || isSa || isVic || isTas || isWa;
  const min = isAct ? 500 : isNsw ? 14500 : isNt ? 1100 : isQld ? 11900 : isSa ? 4350 : isVic ? 15800 : isTas ? 1200 : isWa ? 5800 : Math.floor(Math.min(...chart.values) * 0.9);
  const max = isAct ? 900 : isNsw ? 18000 : isNt ? 1450 : isQld ? 12600 : isSa ? 4700 : isVic ? 16500 : isTas ? 1450 : isWa ? 7200 : Math.ceil(Math.max(...chart.values) * 1.05);
  const labels = ["2019-2020", "2020-2021", "2021-2022", "2022-2023", "2023-2024", "2024-2025"];
  const chartPoints = chart.values.map((value, index) => ({
    value,
    x: endpointsOnly ? (index === 0 ? 70 : 450) : 70 + index * 76,
    y: 220 - ((value - min) / Math.max(max - min, 1)) * 145,
    label: endpointsOnly ? (index === 0 ? labels[0] : labels[5]) : labels[index],
  }));
  const points = chartPoints.map(({ x, y }) => `${x},${y}`).join(" ");

  return <div className="mt-6">
    <h3 className="mb-4 text-sm font-bold uppercase text-[#252D02]">Chart Library · Select a chart to open</h3>
    <div className="grid items-start gap-5 lg:grid-cols-[300px_1fr]">
      <div className="space-y-3">{jurisdictionCharts.map((item, index) => <button key={item.short} type="button" onClick={() => setSelected(index)} className={`flex min-h-[74px] w-full items-center justify-between rounded-lg border bg-white px-4 text-left ${selected === index ? "border-[#1685A6] shadow-[inset_0_0_0_1px_#1685A6]" : "border-[#E9EAEB]"}`}>
        <span><span className="block text-[8px] font-bold uppercase text-[#1685A6]">{item.code}</span><span className="mt-2 block text-[11px] font-bold leading-4 text-[#252D02]">Yearly Sworn Police Officer FTE -<br />{item.name}</span></span>
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#8AC900] text-sm font-bold text-[#252D02]">{selected === index ? "−" : "+"}</span>
      </button>)}</div>
      <div className="rounded-xl border border-[#E9EAEB] bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4"><div><span className="text-[8px] font-bold uppercase text-[#1685A6]">Presenting · {selected + 1} of {jurisdictionCharts.length} · Selected from the list</span><h4 className="mt-2 text-lg font-bold leading-6 text-[#252D02]">Yearly Sworn Police Officer FTE - {chart.name}</h4></div><div className="flex items-center gap-2"><button type="button" onClick={() => setSelected((selected - 1 + jurisdictionCharts.length) % jurisdictionCharts.length)} className="inline-flex h-8 items-center gap-1 rounded-full border border-[#1685A6] bg-white px-3 text-[9px] font-bold text-[#1685A6]"><ChevronLeft className="size-3" /> Prev</button><button type="button" onClick={() => setSelected((selected + 1) % jurisdictionCharts.length)} className="inline-flex h-8 items-center gap-1 rounded-full border border-[#1685A6] bg-white px-3 text-[9px] font-bold text-[#1685A6]">Next <ChevronRight className="size-3" /></button><button type="button" onClick={() => setAnimationKey((key) => key + 1)} className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#1685A6] px-3 text-[9px] font-bold uppercase text-white"><Play className="size-3 fill-current" /> Replay Animation</button></div></div>
        <svg viewBox="0 0 520 300" className="mt-5 w-full" role="img" aria-label={`Yearly sworn police officer FTE for ${chart.name}`}>
          {(isAct ? [500, 600, 700, 800, 900] : isNsw ? [14500, 15375, 16250, 17125, 18000] : isNt ? [1100, 1187.5, 1275, 1362.5, 1450] : isQld ? [11900, 12075, 12250, 12425, 12600] : isSa ? [4350, 4437.5, 4525, 4612.5, 4700] : isVic ? [15800, 15975, 16150, 16325, 16500] : isTas ? [1200, 1262.5, 1325, 1387.5, 1450] : isWa ? [5800, 6150, 6500, 6850, 7200] : [0, 1, 2, 3].map((step) => min + ((max - min) * step) / 3)).map((value) => { const y = 220 - ((value - min) / Math.max(max - min, 1)) * 145; return <g key={value}><line x1="58" x2="478" y1={y} y2={y} stroke="#E7E8E3" /><text x="50" y={y + 4} textAnchor="end" fontSize="9" fill="#69706A">{value.toLocaleString()}</text></g>; })}
          <polyline key={animationKey} points={points} fill="none" stroke="#1685A6" strokeWidth="2.5" strokeDasharray="4 5" pathLength="1" strokeDashoffset="0"><animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.2s" /></polyline>
          {chartPoints.map(({ value, x, y, label }, index) => <g key={`${value}-${index}`}><circle cx={x} cy={y} r="4" fill="#1685A6" /><text x={x} y={y - 12} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1685A6">{value.toLocaleString()}</text><text x={x} y="242" textAnchor="middle" fontSize="8" fill="#535862">{label}</text></g>)}
          <line x1="146" x2="146" y1="60" y2="250" stroke="#C34D3C" /><text x="154" y="72" fontSize="8" fontWeight="700" fill="#C34D3C">COVID-19</text><text x="146" y="264" textAnchor="middle" fontSize="8" fontWeight="700" fill="#C87C38">JAN 2020</text>
          <line x1="298" x2="298" y1="60" y2="250" stroke="#D18A4B" strokeDasharray="3 3" /><text x="306" y="264" fontSize="8" fontWeight="700" fill="#C87C38">OCT 2022</text>
        </svg>
        <p className="text-[8px] uppercase text-[#777C75]">Note: Dataset varied in response to the COVID-19 period</p><p className="mt-2 text-[8px] uppercase text-[#777C75]">Source: Productivity Commission, Police services, Table 6A.2, 2026</p>
      </div>
    </div>
  </div>;
}

const sources = [
  "Productivity Commission, Police services - Table 6A.2 [data set], Productivity Commission, 2026, accessed 24 February 2026.",
  "A Mayes, The 2025 WA state election promises made by Labor, Liberal, Greens and Nationals, ABC, 2 March 2025, accessed 29 January 2026; ABC, Victoria Police to shorten training course to boost policing, 25 May 2025, accessed 29 January 2026; ACT Government, ACT Policing media releases; Australian Federal Police and state and territory police workforce publications, accessed January 2026.",
];

export default function PublicSafetyPoliceOverviewView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="police_industry_overview"
      navigation={{
        back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        backSecondary: { label: "Police chapter", href: `/reports/${slug}/police` },
        prev: { label: "Police", href: `/reports/${slug}/police` },
        next: { label: "Industry Profile", href: `/reports/${slug}/police_industry_profile` },
        prevPrefix: "Previous Section:",
        nextPrefix: "Next Section:",
      }}
    >
      <section className="relative min-h-[230px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:pr-[280px]">
        <span className="inline-flex rounded-full bg-[#1685A6] px-4 py-1.5 text-[10px] font-bold uppercase text-white">POL · Industry-Sector Analysis</span>
        <h1 className="mt-5 text-[40px] font-bold leading-[48px] text-[#252D02]">Industry-Sector Overview</h1>
        <p className="mt-4 max-w-[1020px] text-sm leading-6 text-[#535862]">Policing is a critical public safety industry-sector comprising eight state and territory police forces alongside the Australian Federal Police, each operating in distinct legislative frameworks. The police workforce is characterised by its scale, diversity and increasingly specialised capability.</p>
        <div aria-hidden="true" className="absolute right-8 top-8 hidden size-40 place-items-center rounded-full bg-[#E5F2F7] lg:grid">
          <Image src="/images/police-chapter-vehicle.svg" alt="" width={136} height={136} className="size-[136px]" />
        </div>
      </section>

      <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
        <p className="max-w-[1110px] text-sm leading-6 text-[#535862]">Operational (sworn) officers are increasingly supported by additional auxiliary officers (at times known as semi-sworn) such as Protective Service Officers and a rapidly growing cohort of unsworn specialists in intelligence, forensics, digital investigations, cybercrime and emergency management. Police must maintain a 24/7 operational readiness to respond to crime, maintain public safety and support community resilience.</p>
        <h2 className="mt-6 max-w-[780px] border-b border-[#DADDD4] pb-4 text-2xl font-bold leading-8 text-[#252D02]">The following datapoints have been identified through this Industry Overview for the Police workforce:</h2>

        <div className="mt-5 space-y-4">
          {datapoints.map((item, index) => {
            const isOpen = open === index;
            return <article key={item.title} className="overflow-hidden rounded-xl border border-[#83B6C7] border-l-[8px] border-l-[#1685A6] bg-[#E9F3F6]">
              <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : index)} className={`flex min-h-[60px] w-full items-center justify-between gap-5 px-5 text-left ${isOpen ? "bg-[#1685A6] text-white" : ""}`}>
                <span className={`font-semibold ${isOpen ? "text-white" : "text-[#252D02]"}`}>{item.title}</span>
                <span className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-[#8AC900] px-5 text-xs font-bold text-[#252D02]">{isOpen ? "Close" : "Open"}<ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} /></span>
              </button>
              {isOpen && <div className={`border-t border-[#A7C9D4] bg-[#FAFAF0] ${index === 0 ? "grid lg:grid-cols-[1fr_520px]" : "px-6 py-5"}`}>
                <div className={index === 0 ? "px-6 py-7" : ""}><p className="text-sm leading-6 text-[#535862]">{item.copy}</p></div>
                {index === 0 && <NationalWorkforceChart />}
                {index === 1 && <JurisdictionChartLibrary />}
              </div>}
            </article>;
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
        <h2 className="text-2xl font-bold leading-8 text-[#252D02]">Sources</h2>
        <ol className="mt-5 space-y-4 text-xs leading-5 text-[#535862]">
          {sources.map((source, index) => <li key={source} className="grid grid-cols-[24px_1fr] gap-3"><span className="grid size-5 place-items-center rounded-full bg-[#8AC900] text-[9px] font-bold text-[#252D02]">{index + 65}</span><span>{source}</span></li>)}
        </ol>
      </section>
    </PublicSafetyPageShell>
  );
}
