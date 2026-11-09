"use client";

import PublicSafetySourceLink, { policeWorkforceSourceUrl } from "./PublicSafetySourceLink";

import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AustraliaInteractiveMap from "@/components/common/AustraliaInteractiveMap";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import chapter from "./PublicSafetyDefenceView.module.css";
import police from "./PublicSafetyPoliceView.module.css";
import library from "./PublicSafetyPoliceOverviewView.module.css";
import styles from "./PublicSafetyPoliceProfileView.module.css";

const profileItems = [
  { code: "01 · CHART · POL", title: "Yearly First Nations Proportion of Police Employees" },
  { code: "02 · CHART · POL", title: "Yearly Female Gender Proportion of Police Staff and all Police Employees" },
  { code: "03 · MAP · POL", title: "National Police Employees by State and Territory in 2025" },
];

function FirstNationsChart({ animationKey }: { animationKey: number }) {
  const years = ["2020-2021", "2021-2022", "2022-2023", "2023-2024", "2024-2025"];
  const operational = [2.3, 2.4, 2.4, 2.5, 2.6];
  const total = [2.3, 2.3, 2.3, 2.4, 2.5];
  const x = (index: number) => 86 + index * 159;
  const y = (value: number) => 344 - ((value - 2) / 0.8) * 304;
  const points = (values: number[]) => values.map((value, index) => `${x(index)},${y(value)}`).join(" ");

  return <svg viewBox="0 0 760 420" className={styles.lineChart} role="img" aria-label="Yearly First Nations proportion of police employees">
    {[2, 2.2, 2.4, 2.6, 2.8].map((tick) => <g key={tick}><line x1="86" x2="722" y1={y(tick)} y2={y(tick)} stroke="#E6E7E3"/><text x="79" y={y(tick) + 4} textAnchor="end" fontSize="12" fill="#646963">{tick.toFixed(1)}%</text></g>)}
    {years.map((year, index) => <text key={year} x={x(index)} y="361" textAnchor="middle" fontSize="12" fill="#535862">{year}</text>)}
    <polyline key={`operational-${animationKey}`} points={points(operational)} fill="none" stroke="#1C67AD" strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset="0"><animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.1s"/></polyline>
    <polyline key={`total-${animationKey}`} points={points(total)} fill="none" stroke="#5B99D2" strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset="0"><animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.1s"/></polyline>
    {operational.map((value, index) => <g key={`o-${animationKey}-${years[index]}`} className="animate-radar-point" style={{ animationDelay: `${index * 0.08 + 0.25}s` }}><circle cx={x(index)} cy={y(value)} r="5" fill="#1C67AD"/><text x={x(index)} y={y(value) - 12} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1C67AD">{value.toFixed(1)}%</text></g>)}
    {total.map((value, index) => <g key={`t-${animationKey}-${years[index]}`} className="animate-radar-point" style={{ animationDelay: `${index * 0.08 + 0.45}s` }}><circle cx={x(index)} cy={y(value)} r="5" fill="#5B99D2"/><text x={x(index)} y={y(value) + 19} textAnchor="middle" fontSize="12" fontWeight="700" fill="#5B99D2">{value.toFixed(1)}%</text></g>)}
    <circle cx="90" cy="405" r="6" fill="#1C67AD"/><text x="103" y="409" fontSize="12" fill="#535862">Operational Staff</text>
    <circle cx="225" cy="405" r="6" fill="#5B99D2"/><text x="238" y="409" fontSize="12" fill="#535862">Total Staff</text>
  </svg>;
}

function FemaleGenderChart({ animationKey }: { animationKey: number }) {
  const years = ["2020-2021", "2021-2022", "2022-2023", "2023-2024", "2024-2025"];
  const swornOperational = [26.7, 27.3, 27.7, 27.9, 27.8];
  const totalStaff = [35, 34.5, 35.1, 35.8, 35.9];
  const x = (index: number) => 86 + index * 159;
  const y = (value: number) => 344 - ((value - 20) / 20) * 304;
  const points = (values: number[]) => values.map((value, index) => `${x(index)},${y(value)}`).join(" ");

  return <svg viewBox="0 0 760 420" className={styles.lineChart} role="img" aria-label="Yearly female gender proportion of police staff and all police employees">
    {[20, 25, 30, 35, 40].map((tick) => <g key={tick}><line x1="86" x2="722" y1={y(tick)} y2={y(tick)} stroke="#E6E7E3"/><text x="79" y={y(tick) + 4} textAnchor="end" fontSize="12" fill="#646963">{tick.toFixed(1)}%</text></g>)}
    {years.map((year, index) => <text key={year} x={x(index)} y="361" textAnchor="middle" fontSize="12" fill="#535862">{year}</text>)}
    <polyline key={`sworn-${animationKey}`} points={points(swornOperational)} fill="none" stroke="#1C67AD" strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset="0"><animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.1s"/></polyline>
    <polyline key={`staff-${animationKey}`} points={points(totalStaff)} fill="none" stroke="#5B99D2" strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset="0"><animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.1s"/></polyline>
    {swornOperational.map((value, index) => <g key={`s-${animationKey}-${years[index]}`} className="animate-radar-point" style={{ animationDelay: `${index * 0.08 + 0.25}s` }}><circle cx={x(index)} cy={y(value)} r="5" fill="#1C67AD"/><text x={x(index)} y={y(value) - 12} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1C67AD">{value.toFixed(1)}%</text></g>)}
    {totalStaff.map((value, index) => <g key={`t-${animationKey}-${years[index]}`} className="animate-radar-point" style={{ animationDelay: `${index * 0.08 + 0.45}s` }}><circle cx={x(index)} cy={y(value)} r="5" fill="#5B99D2"/><text x={x(index)} y={y(value) + 19} textAnchor="middle" fontSize="12" fontWeight="700" fill="#5B99D2">{value.toFixed(1)}%</text></g>)}
    <circle cx="92" cy="405" r="6" fill="#1C67AD"/><text x="105" y="409" fontSize="12" fill="#535862">Sworn Operational</text>
    <circle cx="245" cy="405" r="6" fill="#5B99D2"/><text x="258" y="409" fontSize="12" fill="#535862">Total Staff</text>
  </svg>;
}

const policeEmployeeData: Record<string, string[]> = {
  ACT: ["813", "50", "205", "153"],
  NSW: ["15,567", "131", "2,243", "2,447"],
  NT: ["1,375", "29", "637", "149"],
  QLD: ["12,024", "538", "3,642", "2,848"],
  SA: ["4,444", "85", "1,128", "449"],
  TAS: ["1,355", "63", "264", "407"],
  VIC: ["15,873", "148", "4,464", "1,067"],
  WA: ["6,489", "616", "1,873", "874"],
};

function PoliceEmployeesMap({ animationKey }: { animationKey: number }) {
  const states = ["NATIONAL", "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
  const rows = ["Sworn operational", "Sworn non-operational", "Civilian operational (includes other)", "Civilian non-operational (includes other)"];
  const [selectedState, setSelectedState] = useState("WA");

  const counts = policeEmployeeData[selectedState];

  return <div>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-lg font-semibold uppercase text-[#0D71A3]">POL · Presentation View</p><h3 className="mt-3 text-lg font-bold leading-6 text-[#252D02]">National Police Employees by State<br/>and Territory in 2025</h3></div><div className="flex flex-wrap gap-2">{states.map((state) => <button key={state} type="button" onClick={() => setSelectedState(state)} aria-pressed={selectedState === state} className={`min-w-14 cursor-pointer rounded-full px-3 py-2 text-xs font-bold ${selectedState === state ? "bg-[#7BC900] text-[#253100]" : "border border-[#E9EAEB] bg-white text-[#535862]"}`}>{state === "NATIONAL" ? "NAT" : state}</button>)}</div></div>
    <div key={animationKey} className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1.74fr)_minmax(0,1fr)]">
      <div className="grid min-h-[400px] place-items-center animate-zoom-in lg:min-h-[538px] overflow-hidden rounded-lg border border-[#E9EAEB] bg-white p-3 transition-shadow duration-300 hover:shadow-md"><AustraliaInteractiveMap selectedState="NATIONAL" highlightedState={selectedState} onSelectState={setSelectedState} variant="police" className={styles.mapArtwork} compact/></div>
      {counts ? <aside key={`${selectedState}-${animationKey}`} className="animate-card-entrance rounded-lg bg-[#E7F1F6] p-5"><h4 className="text-2xl font-bold text-[#252D02]">{selectedState}</h4><div className="mt-5 overflow-hidden rounded-md bg-white"><div className="grid grid-cols-[minmax(0,1fr)_64px] border-b border-[#E9EAEB] px-4 py-4 text-xs"><span/><strong className="text-right">2025</strong></div>{rows.map((row, index) => <div key={row} style={{ animationDelay: `${index * 0.08 + 0.2}s` }} className="grid animate-card-entrance grid-cols-[minmax(0,1fr)_64px] items-center border-b border-[#E9EAEB] px-4 py-4 text-xs transition-colors duration-200 last:border-0 hover:bg-[#F5FAFC]"><span className="pr-2 leading-4 text-[#535862]">{row}</span><strong className="text-right font-medium text-[#252D02]">{counts[index]}</strong></div>)}</div></aside> : <p className="rounded-lg bg-[#E7F1F6] p-5 text-sm">Select a state or territory to see its 2025 workforce figures.</p>}
    </div>
    <div className="mt-6 text-sm leading-6 text-[#535862]"><p className="font-semibold uppercase text-[#252D02]">Legend:</p>{rows.map((row) => <p key={row}>• {row}</p>)}</div>
  </div>;
}

export default function PublicSafetyPoliceProfileView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const item = profileItems[active];
  const select = (index: number) => { setActive(index); setAnimationKey((key) => key + 1); };
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="police_industry_profile" contentClassName={`${chapter.page} ${styles.page}`} navigation={{
    back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    backSecondary: { label: "Police chapter", href: `/reports/${slug}/police` },
    prev: { label: "Industry-Sector Overview", href: `/reports/${slug}/police_industry_overview` },
    next: { label: "Workforce Insights", href: `/reports/${slug}/police_workforce_insights` },
    prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
  }}>
    <section className={`${chapter.hero} ${styles.hero}`}>
      <div className={chapter.heroCopy}>
        <span className={`${chapter.badge} ${styles.badge}`}>POL · Industry-Sector Analysis</span>
        <h1>Industry Profile</h1>
        <p>Select an item on the left to present it large on the right.</p>
      </div>
      <div className={`${chapter.artwork} ${police.artwork}`}>
        <Image src="/images/police-chapter-vehicle.svg" alt="" width={136} height={136} unoptimized priority />
      </div>
    </section>
    <section className={`${library.library} ${chapter.enter}`}>
      <h2 className={styles.heading}>Profile Items · {profileItems.length} · Select a title to present</h2>
      <div className={library.libraryGrid}>
        <div className={library.chartChoices} role="group" aria-label="Profile items">
          {profileItems.map((profile, index) => (
            <button key={profile.code} type="button" className={index === 1 ? styles.femaleChoice : undefined} onClick={() => select(index)} aria-pressed={active === index}>
              <span><small className={library.chartCode}>{profile.code}</small><strong className={library.choiceTitle}>{profile.title}</strong></span>
              <span className={library.choiceArrow}><ArrowRight aria-hidden="true" /></span>
            </button>
          ))}
        </div>
        <figure className={`${library.presentation} ${styles.presentation} ${active === 1 ? styles.female : ""} ${active === 2 ? styles.mapPresentation : ""}`}>
          {active !== 2 && <div className={library.presentationHeader}>
            <div aria-live="polite"><p className={library.presenting}>Presenting · {active + 1} of {profileItems.length} · Selected from the list</p><h4 className={styles.profileTitle}>{item.title}</h4></div>
            <div className={library.chartControls}>
              <button type="button" onClick={() => select((active - 1 + profileItems.length) % profileItems.length)}><ChevronLeft aria-hidden="true" /> Prev</button>
              <button type="button" onClick={() => select((active + 1) % profileItems.length)}>Next <ChevronRight aria-hidden="true" /></button>
              <button type="button" onClick={() => setAnimationKey((key) => key + 1)}><Play aria-hidden="true" /> Replay Animation</button>
            </div>
          </div>}
          {active === 0 ? <FirstNationsChart animationKey={animationKey}/> : active === 1 ? <FemaleGenderChart animationKey={animationKey}/> : <PoliceEmployeesMap animationKey={animationKey}/>}
          <figcaption data-source-caption><PublicSafetySourceLink href={policeWorkforceSourceUrl}>Source: Productivity Commission, Police services, Table 6A.2, 2026</PublicSafetySourceLink></figcaption>
          {active === 2 && <div className={`${library.chartControls} ${styles.mapReplay}`}>
            <button type="button" onClick={() => select(active - 1)}><ChevronLeft aria-hidden="true" /> Prev</button>
            <button type="button" onClick={() => select(0)}>Next <ChevronRight aria-hidden="true" /></button>
            <button type="button" onClick={() => setAnimationKey((key) => key + 1)}><Play aria-hidden="true" /> Replay Animation</button>
          </div>}
        </figure>
      </div>
    </section>
  </PublicSafetyPageShell>;
}
