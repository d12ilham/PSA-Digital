"use client";

import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import { JurisdictionMap, Section } from "./FederalStateActProfileView";

interface Report {
  id: string;
  title: string;
  slug: string;
  status: string;
  contactUrl?: string;
  pdfFileUrl?: string;
  year?: { label: string };
}

const gender = [
  { year: 2020, female: 59, male: 40.9, selfDescribed: 0.1 },
  { year: 2021, female: 58.5, male: 41.4, selfDescribed: 0.1 },
  { year: 2022, female: 59.4, male: 40.3, selfDescribed: 0.2 },
  { year: 2023, female: 60, male: 39.5, selfDescribed: 0.2 },
  { year: 2024, female: 59.6, male: 39.8, selfDescribed: 0.3 },
];

const occupationGrowth = [
  { label: "Human Resource Professionals", value: 1.6 },
  { label: "Welfare Support Workers", value: 0.5 },
  { label: "Information Officers", value: -0.2 },
  { label: "Inspectors and Regulatory Officers", value: 1.6 },
  { label: "Welfare, Recreation and Community Arts Workers", value: 1.2 },
  { label: "Intelligence and Policy Analysts", value: 1.8 },
  { label: "Other Information and Organisation Professionals", value: 1.6 },
  { label: "Policy and Planning Managers", value: 1.6 },
  { label: "General Clerks", value: 1.4 },
  { label: "Contract, Program and Project Administrators", value: 0.9 },
];

const occupations = [
  "Policy and Planning Managers",
  "Inspectors and Regulatory Officers",
  "Human Resource Professionals",
  "Intelligence and Policy Analysts",
  "General Clerks",
  "Organisation Professionals",
];

const sources = [
  "Victorian Government, Workforce data (state of the public sector) 2025, accessed 9 February 2026.",
  "Victorian Government, 2024 Workforce data - Age, gender and sexuality, accessed 9 February 2026.",
  "Victorian Government, 2024 Workforce data - Cultural background and home life, accessed 9 February 2026.",
  "Victorian Public Sector Commission, Aboriginal and/or Torres Strait Islander, accessed 9 February 2026.",
  "Victorian Skills Authority, Employment Projections Dashboard 2025-2035, Department of Jobs, Skills, Industry and Regions, 2025.",
  "Victorian Skills Authority, Victorian Skills Plan for 2025 into 2026: Shared prosperity through skills, January 2026.",
  "Victorian Government, Independent Review of the Victorian Public Service Final Report, 2025.",
];

function GenderLineChart() {
  const x = (i: number) => 45 + i * 111;
  const series = [
    { key: "female" as const, label: "Female", color: "#754D32", top: 56, scale: 10 },
    { key: "male" as const, label: "Male", color: "#95694D", top: 100, scale: 10 },
    { key: "selfDescribed" as const, label: "Self Described", color: "#E7CDBF", top: 150, scale: 15 },
  ];
  const y = (key: "female" | "male" | "selfDescribed", value: number) => key === "female" ? 56 - (value - 59) * 10 : key === "male" ? 105 - (value - 40) * 10 : 151 - value * 15;
  return <div className="rounded-md bg-[#F8EEE8] p-4 sm:p-6">
    <h3 className="min-h-10 text-sm font-bold">Percentage of Employees in the Victorian Public Service by Gender (headcount)</h3>
    <svg viewBox="0 0 550 220" role="img" aria-label="Female 59.6%, male 39.8%, self described 0.3% in 2024" className="mt-4 w-full">
      <line x1="36" x2="505" y1="181" y2="181" stroke="#E5DCD6" />
      {series.map(({ key, color }) => <g key={key}><polyline points={gender.map((item, i) => `${x(i)},${y(key, item[key])}`).join(" ")} fill="none" stroke={color} strokeWidth="2" />{gender.map((item, i) => <g key={item.year}><circle cx={x(i)} cy={y(key, item[key])} r="3.5" fill="white" stroke={color} strokeWidth="2" /><text x={x(i)} y={y(key, item[key]) - 9} textAnchor="middle" fontSize="9" fill={color}>{item[key].toFixed(1)}%</text></g>)}</g>)}
      {gender.map((item, i) => <text key={item.year} x={x(i)} y="205" textAnchor="middle" fontSize="10" fill="#5E6268">{item.year}</text>)}
    </svg>
    <div className="flex flex-wrap gap-4 text-[10px] text-[#4B5260]">{series.map(({ label, color }) => <span key={label}><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} />{label}</span>)}</div>
    <p className="mt-5 border-t border-[#E6DCD5] pt-3 text-[9px] leading-4 text-[#694834]">SOURCE Victorian Government, 2024 Workforce data (state of the public sector) - Age, gender and sexuality, 2024</p>
  </div>;
}

function RepresentationChart() {
  const years = [2021, 2022, 2023, 2024];
  const actual = [1.2, 1.2, 1.5, 1.6];
  const x = (i: number) => 50 + i * 145;
  const y = (value: number) => 157 - (value - 1) * 70;
  return <div className="rounded-md bg-[#F8EEE8] p-4 sm:p-6"><h3 className="min-h-10 text-sm font-bold">Aboriginal and Torres Strait Islander Representation in the Victorian Public Service (2021-2024)</h3><svg viewBox="0 0 550 220" role="img" aria-label="Representation: 1.2% in 2021 and 2022, 1.5% in 2023, 1.6% in 2024; 2% target" className="mt-4 w-full"><line x1="40" x2="510" y1="178" y2="178" stroke="#E5DCD6" /><line x1="50" x2="485" y1={y(2)} y2={y(2)} stroke="#E7CDBF" strokeWidth="2" strokeDasharray="5 4" /><polyline points={actual.map((value, i) => `${x(i)},${y(value)}`).join(" ")} fill="none" stroke="#754D32" strokeWidth="2" />{years.map((year, i) => <g key={year}><circle cx={x(i)} cy={y(actual[i])} r="4" fill="white" stroke="#754D32" strokeWidth="2" /><text x={x(i)} y={y(actual[i]) - 12} textAnchor="middle" fontSize="10" fill="#754D32">{actual[i].toFixed(1)}%</text><text x={x(i)} y={y(2) - 10} textAnchor="middle" fontSize="10" fill="#E7CDBF">2.0%</text><text x={x(i)} y="202" textAnchor="middle" fontSize="10" fill="#5E6268">{year}</text></g>)}</svg><div className="flex gap-5 text-[10px] text-[#4B5260]"><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[#754D32]" />Percentage</span><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[#E7CDBF]" />Target</span></div><p className="mt-5 border-t border-[#E6DCD5] pt-3 text-[9px] leading-4 text-[#694834]">SOURCE Victorian Government, Workforce data (state of the public sector) 2024-25, 2023-24, 2022-23, 2021-22</p></div>;
}

function GrowthChart() {
  return <div className="rounded-md bg-[#F8EEE8] p-4 sm:p-6"><h3 className="text-sm font-bold">Employment Growth Rate for Public Administration and Safety Industry to 2035</h3><div className="mt-6 grid h-48 grid-cols-3 items-end gap-5 border-b border-[#C8B9AF]">{[["2025", 0], ["2028", 0], ["2035", 1.3]].map(([year, value]) => <div key={year} className="flex h-full flex-col items-center justify-end"><span className="mb-1 text-xs font-semibold">{Number(value).toFixed(1)}%</span>{Number(value) > 0 && <div className="w-full max-w-20 bg-[#754D32]" style={{ height: `${Number(value) / 1.3 * 75}%` }} />}</div>)}</div><div className="mt-2 grid grid-cols-3 text-center text-xs text-[#565A60]"><span>2025</span><span>2028</span><span>2035</span></div><p className="mt-6 border-t border-[#E6DCD5] pt-3 text-[9px] leading-4 text-[#694834]">SOURCE Victorian Skills Authority, Employment projections dashboard 2025-35 - Workforce summary - Industries, 2025</p></div>;
}

function OccupationGrowthChart() {
  return <div className="min-w-0 rounded-md bg-[#F8EEE8] p-4 sm:p-6"><h3 className="text-sm font-bold">10-Year Growth Rate for Top 10 Employed Occupations in Public Administration</h3><div className="mt-5 overflow-x-auto"><div className="min-w-[620px]"><div className="grid h-44 grid-cols-10 items-end gap-1.5 border-b border-[#C8B9AF]">{occupationGrowth.map(({ label, value }) => <div key={label} className="flex h-full min-w-0 flex-col items-center justify-end"><span className="mb-1 text-[9px] font-semibold">{value.toFixed(1)}%</span><div className="w-full bg-[#754D32]" style={{ height: `${Math.max(0, value) / 1.8 * 70}%` }} />{value < 0 && <span className="h-2 w-full bg-[#754D32]" />}</div>)}</div><div className="mt-2 grid grid-cols-10 gap-1.5">{occupationGrowth.map(({ label }) => <span key={label} className="break-words text-center text-[8px] leading-3 text-[#565A60]">{label}</span>)}</div></div></div><p className="mt-6 border-t border-[#E6DCD5] pt-3 text-[9px] leading-4 text-[#694834]">SOURCE Victorian Skills Authority, Employment Projections Dashboard 2025-35 - Occupations, 2025</p></div>;
}

export default function FederalStateVicProfileView({ slug, report }: { slug: string; report: Report }) {
  return <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased"><ReportHeader slug={slug} report={report} currentPage="industry_profile" /><main className="mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8">
    <ReportNavButtons slug={slug} currentPage="industry_profile_vic" prev={{ label: "TAS Workforce Overview", href: `/reports/${slug}/industry_profile_tas` }} next={{ label: "WA Workforce Overview", href: `/reports/${slug}/industry_profile_wa` }} prevPrefix="" />
    <section className="grid gap-6 bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10"><div><p className="inline-block rounded-full bg-[#754D32] px-3 py-1 text-[10px] font-semibold text-white">VICTORIA · Selected jurisdiction</p><h1 className="mt-4 text-[30px] font-bold leading-tight sm:text-[38px]">Victorian Public Service</h1><p className="mt-5 text-xs font-medium text-[#668B17]">Workforce Overview</p><div className="mt-3 max-w-[520px] space-y-3"><div className="rounded-md bg-[#F8EEE8] p-4"><p className="text-xs text-[#382219]">In 2025, the Victorian Public Service was comprised of</p><strong className="mt-1 block text-3xl text-[#754D32]">58,169</strong><p className="mt-1 text-xs leading-5 text-[#382219]">employees</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[10px] text-[#694834]">Source: Victorian Government, 2025 Workforce data (state of the public sector) - Number of employees, 2025</p></div><div className="rounded-md bg-[#F8EEE8] p-4"><strong className="block text-3xl text-[#754D32]">35,679</strong><p className="mt-1 text-xs text-[#382219]">APS employees located in Victoria</p></div></div></div><JurisdictionMap slug={slug} selected="VIC" /></section>
    <Section title="Workforce Overview" subtitle="Workforce size, composition, diversity, structure and legal context."><div className="grid gap-6 lg:grid-cols-2"><div><h3 className="text-sm font-bold">Overview</h3><p className="mt-2 text-xs leading-6 text-[#42463B]">As of June 2025, 58,169 (55,672 FTE) employees were engaged in the Victorian Public Service (VPS).</p><p className="mt-3 text-xs leading-6 text-[#42463B]">The VPS workforce is predominantly female, with women accounting for just under 60 per cent of employees, while men represent under 40 per cent.</p><p className="mt-3 text-xs leading-6 text-[#42463B]">Over 19 per cent of employees reported speaking a language other than English at home and 19.5 per cent were born outside Australia. First Nations employees comprised approximately 1.6 per cent of the VPS workforce, which was below the government&apos;s target of two per cent by June 2022.</p><div className="mt-5 rounded-md bg-[#F8EEE8] p-4"><strong className="text-3xl text-[#754D32]">6.7%</strong><p className="mt-2 text-xs">Gender Pay Gap</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[9px] text-[#694834]">Source: Victorian Government, State of the Sector Report 2024, 2024</p></div></div><div><h3 className="text-sm font-bold">Structure and Legal Context</h3><p className="mt-2 text-xs leading-6 text-[#42463B]">The VPS workforce includes the Public Service which encompasses Departments, administrative offices, the Victorian Public Sector Commission and Separate Public Entities. The Public Service consists of those employed under Public Administration Act (2004). There are 10 departments of the Public Service, each led by a Secretary. Administrative offices are established in relation to a department and perform activities under the direction of ministers. The Government Sector comprises over 3,000 public entities that deliver public services, and include organisations such as Ambulance Victoria, Parks Victoria and the Transport Accident Commission.</p></div></div><div className="mt-5 grid gap-4 lg:grid-cols-2"><GenderLineChart /><RepresentationChart /></div></Section>
    <Section title="Workforce Trends" subtitle="Growth, projections, occupational shortages and representation over time"><p className="max-w-4xl text-xs leading-6 text-[#42463B]">While the projected 10-year growth rate for Public Administration and Safety is 1.3 per cent, this growth rate is slightly higher for the following Public Administration Industry occupations:</p><ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{occupations.map((occupation) => <li key={occupation} className="min-h-20 rounded-md bg-[#F8EEE8] p-4 text-xs leading-5 text-[#42463B]">&bull; {occupation}</li>)}</ul><p className="mt-5 max-w-4xl text-xs leading-6 text-[#42463B]">Digital technologies are a priority for the Victorian Government with over 87,000 new digital technology employees required over the next 10 years. There is a growing demand for skills in data analytics, cyber security and cloud computing, noting that these occupational areas have consistently been identified as skills gaps by Federal and State/Territory Government industry-sector stakeholders.</p><p className="mt-3 max-w-4xl text-xs leading-6 text-[#42463B]">Recently, the Independent Review of the Victorian Public Service (the Silver Review) recommended rebalancing the size and structure of the VPS to improve productivity. Recommendations also included improving the adoption of AI and digital services across the VPS and reducing inefficient duplication in service provision. The Victorian Government has committed to implementing most of the recommendations.</p><div className="mt-6 grid gap-4 lg:grid-cols-2"><GrowthChart /><OccupationGrowthChart /></div></Section>
    <section className="bg-white p-5 sm:p-6"><h2 className="text-base font-bold">Sources</h2><ol start={67} className="mt-4 space-y-3">{sources.map((source, index) => <li key={index} className="flex gap-3 text-[11px] leading-5 text-[#42463B]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#668B17] text-[10px] text-white">{67 + index}</span>{source}</li>)}</ol></section>
  </main><ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} /></div>;
}
