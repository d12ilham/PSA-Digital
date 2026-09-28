"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AustraliaInteractiveMap from "@/components/common/AustraliaInteractiveMap";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const profileItems = [
  { code: "01 · CHART · POL", title: "Yearly First Nations Proportion of Police Employees" },
  { code: "02 · CHART · POL", title: "Yearly Female Gender Proportion of Police Staff and all Police Employees" },
  { code: "03 · MAP · POL", title: "National Police Employees by State and Territory in 2025" },
];

function FirstNationsChart({ animationKey }: { animationKey: number }) {
  const years = ["2020-2021", "2021-2022", "2022-2023", "2023-2024", "2024-2025"];
  const operational = [2.3, 2.4, 2.4, 2.5, 2.6];
  const total = [2.3, 2.3, 2.3, 2.4, 2.5];
  const x = (index: number) => 86 + index * 150;
  const y = (value: number) => 274 - ((value - 2) / 0.8) * 224;
  const points = (values: number[]) => values.map((value, index) => `${x(index)},${y(value)}`).join(" ");

  return <svg viewBox="0 0 760 390" className="mt-5 w-full" role="img" aria-label="Yearly First Nations proportion of police employees">
    {[2, 2.2, 2.4, 2.6, 2.8].map((tick) => <g key={tick}><line x1="62" x2="712" y1={y(tick)} y2={y(tick)} stroke="#E6E7E3"/><text x="50" y={y(tick) + 4} textAnchor="end" fontSize="10" fill="#646963">{tick.toFixed(1)}%</text></g>)}
    {years.map((year, index) => <text key={year} x={x(index)} y="302" textAnchor="middle" fontSize="10" fill="#535862">{year}</text>)}
    <polyline key={`operational-${animationKey}`} points={points(operational)} fill="none" stroke="#1C67AD" strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset="0"><animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.1s"/></polyline>
    <polyline key={`total-${animationKey}`} points={points(total)} fill="none" stroke="#5B99D2" strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset="0"><animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.1s"/></polyline>
    {operational.map((value, index) => <g key={`o-${years[index]}`}><circle cx={x(index)} cy={y(value)} r="5" fill="#1C67AD"/><text x={x(index)} y={y(value) - 12} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1C67AD">{value.toFixed(1)}%</text></g>)}
    {total.map((value, index) => <g key={`t-${years[index]}`}><circle cx={x(index)} cy={y(value)} r="5" fill="#5B99D2"/><text x={x(index)} y={y(value) + 19} textAnchor="middle" fontSize="10" fontWeight="700" fill="#5B99D2">{value.toFixed(1)}%</text></g>)}
    <circle cx="90" cy="350" r="6" fill="#1C67AD"/><text x="103" y="354" fontSize="10" fill="#535862">Operational Staff</text>
    <circle cx="225" cy="350" r="6" fill="#5B99D2"/><text x="238" y="354" fontSize="10" fill="#535862">Total Staff</text>
  </svg>;
}

function FemaleGenderChart({ animationKey }: { animationKey: number }) {
  const years = ["2020-2021", "2021-2022", "2022-2023", "2023-2024", "2024-2025"];
  const swornOperational = [26.7, 27.3, 27.7, 27.9, 27.8];
  const totalStaff = [35, 34.5, 35.1, 35.8, 35.9];
  const x = (index: number) => 86 + index * 150;
  const y = (value: number) => 274 - ((value - 20) / 20) * 224;
  const points = (values: number[]) => values.map((value, index) => `${x(index)},${y(value)}`).join(" ");

  return <svg viewBox="0 0 760 390" className="mt-5 w-full" role="img" aria-label="Yearly female gender proportion of police staff and all police employees">
    {[20, 25, 30, 35, 40].map((tick) => <g key={tick}><line x1="62" x2="712" y1={y(tick)} y2={y(tick)} stroke="#E6E7E3"/><text x="50" y={y(tick) + 4} textAnchor="end" fontSize="10" fill="#646963">{tick.toFixed(1)}%</text></g>)}
    {years.map((year, index) => <text key={year} x={x(index)} y="302" textAnchor="middle" fontSize="10" fill="#535862">{year}</text>)}
    <polyline key={`sworn-${animationKey}`} points={points(swornOperational)} fill="none" stroke="#1C67AD" strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset="0"><animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.1s"/></polyline>
    <polyline key={`staff-${animationKey}`} points={points(totalStaff)} fill="none" stroke="#5B99D2" strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset="0"><animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.1s"/></polyline>
    {swornOperational.map((value, index) => <g key={`s-${years[index]}`}><circle cx={x(index)} cy={y(value)} r="5" fill="#1C67AD"/><text x={x(index)} y={y(value) - 12} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1C67AD">{value.toFixed(1)}%</text></g>)}
    {totalStaff.map((value, index) => <g key={`t-${years[index]}`}><circle cx={x(index)} cy={y(value)} r="5" fill="#5B99D2"/><text x={x(index)} y={y(value) + 19} textAnchor="middle" fontSize="10" fontWeight="700" fill="#5B99D2">{value.toFixed(1)}%</text></g>)}
    <circle cx="92" cy="350" r="6" fill="#1C67AD"/><text x="105" y="354" fontSize="10" fill="#535862">Sworn Operational</text>
    <circle cx="245" cy="350" r="6" fill="#5B99D2"/><text x="258" y="354" fontSize="10" fill="#535862">Total Staff</text>
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

function PoliceEmployeesMap() {
  const states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
  const rows = ["Sworn operational", "Sworn non-operational", "Civilian operational (includes other)", "Civilian non-operational (includes other)"];
  const [selectedState, setSelectedState] = useState("WA");

  return <div className="mt-5">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase text-[#6F8B24]">POL · Presentation View</p><h3 className="mt-3 text-lg font-bold leading-6 text-[#252D02]">National Police Employees by State<br/>and Territory in 2025</h3></div><div className="flex flex-wrap gap-2">{states.map((state) => <button key={state} type="button" onClick={() => setSelectedState(state)} className={`min-w-12 rounded-full px-3 py-2 text-[10px] font-bold ${selectedState === state ? "bg-[#7BC900] text-[#253100]" : "border border-[#E9EAEB] bg-white text-[#535862]"}`}>{state}</button>)}</div></div>
    <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_250px]">
      <div className="min-h-[400px] overflow-hidden rounded-lg border border-[#E9EAEB] bg-white p-3"><AustraliaInteractiveMap selectedState="NATIONAL" highlightedState={selectedState} onSelectState={setSelectedState} variant="police" compact/></div>
      <aside className="rounded-lg bg-[#E7F2F6] p-5"><h4 className="text-3xl font-bold text-[#252D02]">{selectedState}</h4><div className="mt-5 overflow-hidden rounded-md bg-white"><div className="grid grid-cols-[1fr_74px] border-b border-[#E9EAEB] px-4 py-3 text-[10px]"><span/><strong className="text-right">2025</strong></div>{rows.map((row, index) => <div key={row} className="grid grid-cols-[1fr_74px] items-center border-b border-[#E9EAEB] px-4 py-3 text-[10px] last:border-0"><span className="pr-2 leading-4 text-[#535862]">{row}</span><strong className="text-right font-medium text-[#252D02]">{policeEmployeeData[selectedState][index]}</strong></div>)}</div></aside>
    </div>
    <div className="mt-5 text-[10px] leading-5 text-[#535862]"><p className="font-semibold uppercase text-[#252D02]">Legend:</p>{rows.map((row) => <p key={row}>• {row}</p>)}</div>
  </div>;
}

export default function PublicSafetyPoliceProfileView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const item = profileItems[active];
  const select = (index: number) => { setActive(index); setAnimationKey((key) => key + 1); };

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="police_industry_profile" navigation={{
    back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    backSecondary: { label: "Police chapter", href: `/reports/${slug}/police` },
    prev: { label: "Industry-Sector Overview", href: `/reports/${slug}/police_industry_overview` },
    next: { label: "Workforce Insights", href: `/reports/${slug}/police_workforce_insights` },
    prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
  }}>
    <section className="relative min-h-[200px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-6 lg:px-8 lg:pr-[240px]">
      <span className="inline-flex rounded-full bg-[#1685A6] px-4 py-1.5 text-[10px] font-bold uppercase text-white">POL · Industry-Sector Analysis</span>
      <h1 className="mt-5 text-[40px] font-bold leading-[48px] text-[#252D02]">Industry Profile</h1>
      <p className="mt-3 text-xs leading-5 text-[#535862]">Select an item on the left to present it large on the right. Colours follow the printed report.</p>
      <div aria-hidden="true" className="absolute right-8 top-6 hidden size-36 place-items-center rounded-full bg-[#E5F2F7] lg:grid"><Image src="/images/police-chapter-vehicle.svg" alt="" width={122} height={122}/></div>
    </section>

    <section>
      <h2 className="border-b border-[#D8DBD2] pb-4 text-xl font-bold uppercase text-[#252D02]">Profile Items · 5 · Select a title to present</h2>
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[340px_1fr]">
        <div className="space-y-3">{profileItems.map((profile, index) => <button key={profile.code} type="button" onClick={() => select(index)} aria-pressed={active === index} className={`grid min-h-[112px] w-full grid-cols-[1fr_36px] items-center gap-4 rounded-lg border px-5 py-5 text-left ${active === index ? "border-[#1685A6] bg-[#E7F2F6] shadow-[inset_0_0_0_1px_#1685A6]" : "border-[#E9EAEB] bg-white"}`}><span><small className="mb-3 block text-[10px] font-semibold uppercase text-[#1685A6]">{profile.code}</small><strong className="block text-sm leading-5 text-[#252D02]">{profile.title}</strong></span><span className={`grid size-8 place-items-center rounded-full ${active === 0 && index === 0 ? "border border-[#CDD2C7] bg-white" : "bg-[#7BC900]"}`}><ArrowRight size={15}/></span></button>)}</div>

        <div className="min-w-0 rounded-xl border border-[#E9EAEB] border-t-8 border-t-[#1C67AD] bg-white px-7 py-6">
          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,600px)_auto] lg:justify-between"><div><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#64765A]">Presenting · {active + 1} of 5 · Selected from the list</p><h2 className="mt-3 text-xl font-bold leading-7 text-[#252D02]">{item.title}</h2></div><div className="flex items-center gap-2"><button type="button" onClick={() => select((active - 1 + profileItems.length) % profileItems.length)} className="inline-flex h-8 items-center gap-1 rounded-full border border-[#1C67AD] px-3 text-[9px] font-bold text-[#1C67AD]"><ChevronLeft className="size-3"/> Prev</button><button type="button" onClick={() => select((active + 1) % profileItems.length)} className="inline-flex h-8 items-center gap-1 rounded-full border border-[#1C67AD] px-3 text-[9px] font-bold text-[#1C67AD]">Next <ChevronRight className="size-3"/></button><button type="button" onClick={() => setAnimationKey((key) => key + 1)} className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#1C67AD] px-3 text-[9px] font-bold uppercase text-white"><Play className="size-3 fill-current"/> Replay Animation</button></div></div>
          {active === 0 ? <FirstNationsChart animationKey={animationKey}/> : active === 1 ? <FemaleGenderChart animationKey={animationKey}/> : <PoliceEmployeesMap/>}
          <p className="mt-2 text-[9px] font-semibold uppercase text-[#6F8B24]">Source: Productivity Commission, Police services, Table 6A.2, 2026</p>
        </div>
      </div>
    </section>
  </PublicSafetyPageShell>;
}
