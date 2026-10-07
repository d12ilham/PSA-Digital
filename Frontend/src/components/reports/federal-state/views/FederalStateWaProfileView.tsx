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

const diversity = [
  { label: "Women", value: 73.2 },
  { label: "Aboriginal and Torres Strait Islander", value: 2.8 },
  { label: "Person with a disability", value: 1.7 },
  { label: "Culturally and linguistically diverse", value: 18.5 },
  { label: "Diverse sexualities and genders", value: 0.2 },
];

const sources = [
  "Government of Western Australia, State of the WA Government Sector Workforce 2024-25, Government of Western Australia, 2025, accessed 6 February 2026.",
  "Government of Western Australia, State of the WA Government Sector Workforce 2024-25, Government of Western Australia, 2025, accessed 6 February 2026.",
  "Government of Western Australia, State of the WA Government Sector Workforce 2024-25, Government of Western Australia, 2025, accessed 6 February 2026.",
  "Government of Western Australia, State of the WA Government Sector Workforce 2024-25, Government of Western Australia, 2025, accessed 6 February 2026.",
  "Department of Training and Workforce Development, State Priority Occupation List [Occupation priority rating page], Government of Western Australia, 2025, accessed 6 February 2026.",
  "Department of Training and Workforce Development, State priority occupation list: Methodology paper, Government of Western Australia, 2023, accessed 6 February 2026.",
  "Government of Western Australia, Public Sector Reform March 2025, Government of Western Australia, 2025, accessed 6 February 2026.",
];

function Metric({ value, label, source }: { value: string; label: string; source: string }) {
  return <div className="rounded-md bg-[#F8EEE8] p-4 sm:p-5"><strong className="block text-3xl text-[#754D32]">{value}</strong><p className="mt-2 text-xs font-medium text-[#382219]">{label}</p><p className="mt-5 border-t border-[#DECFC5] pt-3 text-[10px] leading-5 text-[#694834]">Source: {source}</p></div>;
}

function DiversityChart() {
  return <div className="min-w-0 rounded-md bg-[#F8EEE8] p-4 sm:p-6"><h3 className="min-h-12 text-sm font-bold">Diversity in the Western Australia Public Sector - 2025</h3><div className="mt-5 grid h-44 grid-cols-5 items-end gap-3 border-b border-[#9E9087]">{diversity.map(({ label, value }) => <div key={label} className="flex h-full flex-col items-center justify-end"><span className="mb-1 text-[10px] font-semibold">{value.toFixed(1)}%</span><div className="w-full max-w-20 rounded-t-sm bg-[#754D32]" style={{ height: `${Math.max(3, value / 73.2 * 85)}%` }} /></div>)}</div><div className="mt-2 grid grid-cols-5 gap-3">{diversity.map(({ label }) => <span key={label} className="break-words text-center text-[9px] leading-3 text-[#42463B]">{label}</span>)}</div><p className="mt-7 border-t border-[#E6DCD5] pt-3 text-[9px] leading-4 text-[#694834]">SOURCE Government of Western Australia, State of the WA Government Sector Workforce 2024-25, 2025, pg. 30-35</p></div>;
}

function RepresentationChart() {
  const years = [2021, 2022, 2023, 2024, 2025];
  const values = [2.7, 2.8, 2.7, 2.8, 2.8];
  const x = (i: number) => 50 + i * 109;
  const y = (v: number) => 135 - (v - 2.5) * 62;
  return <div className="min-w-0 rounded-md bg-[#F8EEE8] p-4 sm:p-6"><h3 className="min-h-12 text-sm font-bold">Proportion of Western Australia Public Sector Employees Who Identify as Aboriginal and Torres Strait Islander (2021-2025)</h3><svg viewBox="0 0 550 200" role="img" aria-label="Aboriginal and Torres Strait Islander representation 2.7% in 2021, 2.8% in 2022, 2.7% in 2023, 2.8% in 2024 and 2025; target 3.7%" className="mt-5 w-full"><line x1="39" x2="498" y1="170" y2="170" stroke="#E5DCD6" /><line x1="50" x2="486" y1={y(3.7)} y2={y(3.7)} stroke="#A58D7B" strokeDasharray="5 4" strokeWidth="2" /><polyline points={values.map((v, i) => `${x(i)},${y(v)}`).join(" ")} fill="none" stroke="#754D32" strokeWidth="2" />{years.map((year, i) => <g key={year}><circle cx={x(i)} cy={y(3.7)} r="3.5" fill="white" stroke="#A58D7B" strokeWidth="2" /><circle cx={x(i)} cy={y(values[i])} r="3.5" fill="white" stroke="#754D32" strokeWidth="2" /><text x={x(i)} y={y(3.7) - 9} textAnchor="middle" fontSize="9" fill="#A58D7B">3.7%</text><text x={x(i)} y={y(values[i]) - 10} textAnchor="middle" fontSize="9" fill="#754D32">{values[i].toFixed(1)}%</text><text x={x(i)} y="190" textAnchor="middle" fontSize="10" fill="#5E6268">{year}</text></g>)}</svg><div className="flex gap-5 text-[10px] text-[#4B5260]"><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[#754D32]" />Percentage</span><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[#A58D7B]" />Target</span></div><p className="mt-5 border-t border-[#E6DCD5] pt-3 text-[9px] leading-4 text-[#694834]">SOURCE Government of Western Australia, State of the WA Government Sector Workforce 2024-25, 2025, Figure 14</p></div>;
}

export default function FederalStateWaProfileView({ slug, report }: { slug: string; report: Report }) {
  return <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased"><ReportHeader slug={slug} report={report} currentPage="industry_profile" /><main className="mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8">
    <ReportNavButtons slug={slug} currentPage="industry_profile_wa" prev={{ label: "VIC Workforce Overview", href: `/reports/${slug}/industry_profile_vic` }} next={{ label: "Workforce Insights", href: `/reports/${slug}/workforce_insights` }} prevPrefix="" />
    <section className="grid gap-6 bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10"><div><p className="inline-block rounded-full bg-[#754D32] px-3 py-1 text-[10px] font-semibold text-white">WESTERN AUSTRALIA · Selected jurisdiction</p><h1 className="mt-4 max-w-xl text-[30px] font-bold leading-tight sm:text-[38px]">Western Australia Public Service</h1><p className="mt-5 text-xs font-medium text-[#668B17]">Workforce Overview</p><div className="mt-3 max-w-[520px] space-y-3"><div className="rounded-md bg-[#F8EEE8] p-4"><p className="text-xs text-[#382219]">In 2025, the Western Australian Public Service was comprised of</p><strong className="mt-1 block text-3xl text-[#754D32]">179,490</strong><p className="mt-1 text-xs leading-5 text-[#382219]">employees</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[10px] text-[#694834]">Source: Government of Western Australia, State of the WA Government Workforce 2024-25, 2025, Figure 2</p></div><div className="rounded-md bg-[#F8EEE8] p-4"><strong className="block text-3xl text-[#754D32]">9,839</strong><p className="mt-1 text-xs text-[#382219]">APS employees located in Western Australia</p></div></div></div><JurisdictionMap slug={slug} selected="WA" /></section>
    <Section title="Workforce Overview" subtitle="Workforce size, composition, diversity, structure and legal context..."><div className="grid gap-6 lg:grid-cols-2"><div><h3 className="text-sm font-bold">Overview</h3><p className="mt-2 text-xs leading-6 text-[#42463B]">In 2025 the Western Australia public service (WAPS) included approximately 179,500 employees. Women comprise most of the workforce at 73.2 per cent. Diversity data shows that employees from culturally and linguistically diverse backgrounds represent 18.5 per cent of the workforce.</p><p className="mt-3 text-xs leading-6 text-[#42463B]">First Nations employees accounted for approximately 2.8 per cent of the WAPS, below the State Government&apos;s 3.7 per cent employment target. Since 2020, employment has increased from 2.6 per cent to the current 2025 level but has plateaued since 2022. This indicates progress has been made toward employment of First Nations people, with continued efforts being made to meet the 3.7 per cent target.</p></div><div><h3 className="text-sm font-bold">Structure and Legal Context</h3><p className="mt-2 text-xs leading-6 text-[#42463B]">The WAPS includes Public and Non-Public Service and as of June 2025, it encompasses:</p><ul className="mt-2 text-xs leading-6 text-[#42463B]"><li>25 departments</li><li>43 Senior Executive Service (SES) organisations</li><li>50 non-SES organisations</li><li>17 Ministerial offices</li></ul><p className="mt-3 text-xs leading-6 text-[#42463B]">Other Government Entities operate with a large degree of independence from the government and are not governed by the PSM Act (1994). As of June 2024, these entities encompassed 145 local governments, 4 public universities, 19 other authorities and 256 government boards and committees.</p><p className="mt-3 text-xs leading-6 text-[#42463B]">The Public Service resides within the Public Sector, with employees employed under Part 3 of the PSM Act (1994). Departments are primarily responsible for providing policy advice and administration support to their minister. SES organisations are established by law to perform specific statutory functions, generally responsible through a board to a minister.</p></div></div><div className="mt-5 grid gap-4 lg:grid-cols-2"><Metric value="6.6%" label="Gender Pay Gap" source="Government of Western Australia, State of the WA Government Workforce 2024-25, 2025, pg. 3" /><Metric value="14%" label="Employment growth rate to May 2035 for Public Administration and Safety Industry" source="Jobs and Skills Australia, Employment Projections - Outlook for states and territories, 2025, Table 2" /></div><div className="mt-4 grid gap-4 lg:grid-cols-2"><DiversityChart /><RepresentationChart /></div></Section>
    <Section title="Workforce Trends" subtitle="Growth, projections, occupational shortages and representation over time"><p className="max-w-4xl text-xs leading-6 text-[#42463B]">The Western Australia (WA) Government has identified the following occupations as high priority: &apos;Policy and planning manager&apos; and &apos;Program or project administrator&apos;. Both occupations are listed as priority 1 occupations. Priority 1 occupations have high demand or projected high demand over the next five years and may also be experiencing low supply or projected supply is not anticipated to meet demand. The WA Government announced a public sector reform in March 2025 which was designed to drive the goal of job creation through economic diversification. Full implementation was expected by January 2026.</p></Section>
    <section className="bg-white p-5 sm:p-6"><h2 className="text-base font-bold">Sources</h2><ol start={76} className="mt-4 space-y-3">{sources.map((source, index) => <li key={index} className="flex gap-3 text-[11px] leading-5 text-[#42463B]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#668B17] text-[10px] text-white">{76 + index}</span>{source}</li>)}</ol></section>
  </main><ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} /></div>;
}
