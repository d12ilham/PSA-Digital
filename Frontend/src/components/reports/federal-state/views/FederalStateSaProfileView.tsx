"use client";

import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import { ColumnChart, JurisdictionMap, Section } from "./FederalStateActProfileView";

interface Report {
  id: string;
  title: string;
  slug: string;
  status: string;
  contactUrl?: string;
  pdfFileUrl?: string;
  year?: { label: string };
}

const representation = [
  { year: 2021, value: 2.09 },
  { year: 2022, value: 2.12 },
  { year: 2023, value: 2.2 },
  { year: 2024, value: 2.2 },
  { year: 2025, value: 2.25 },
];

const demand = [
  ["Managers", "ICT Managers"],
  ["Community and Personal Service Workers", "ICT Support Technicians"],
  ["Professionals", "Database and Systems Administrators, and ICT Security Specialists"],
  ["Clerical and Administrative Workers", "-"],
];

const sources = [
  "Government of South Australia, Workforce Information Report 2024-25, Government of South Australia, 2025, accessed 9 February 2026.",
  "Government of South Australia, Workforce Information Report 2024-25, Government of South Australia, 2025, accessed 9 February 2026.",
  "Government of South Australia, State of the Sector Report 2025, Government of South Australia, 2025, accessed 9 February 2026.",
  "Government of South Australia, State of the Sector Reports 2020-2025, accessed 9 February 2026.",
  "Department of State Development, Jobs and Skills Outlook 2024, Government of South Australia, 2024, accessed 11 February 2026.",
];

function RepresentationChart() {
  const x = (index: number) => 48 + index * 112;
  const y = (value: number) => 164 - (value - 2.05) * 370;
  return <div className="rounded-md bg-[#F8EEE8] p-4 sm:p-6">
    <h3 className="min-h-10 text-sm font-bold text-[#252D02]">Aboriginal and Torres Strait Islander Representation in the South Australian Public Sector (2021-2025)</h3>
    <svg viewBox="0 0 560 225" role="img" aria-label="First Nations representation rose from 2.09% in 2021 to 2.25% in 2025" className="mt-5 w-full">
      <line x1="40" x2="512" y1="181" y2="181" stroke="#E6DCD5" />
      <polyline points={representation.map(({ value }, i) => `${x(i)},${y(value)}`).join(" ")} fill="none" stroke="#754D32" strokeWidth="2" />
      {representation.map(({ year, value }, i) => <g key={year}><circle cx={x(i)} cy={y(value)} r="4" fill="white" stroke="#754D32" strokeWidth="2" /><text x={x(i)} y={y(value) - 12} textAnchor="middle" fontSize="10" fontWeight="600" fill="#382219">{value.toFixed(2)}%</text><text x={x(i)} y="203" textAnchor="middle" fontSize="10" fill="#62666D">{year}</text></g>)}
    </svg>
    <p className="mt-4 border-t border-[#E6DCD5] pt-3 text-[9px] leading-4 text-[#694834]">SOURCE Government of South Australia, Workforce Information Report Data Dashboard [data set], 2025</p>
  </div>;
}

export default function FederalStateSaProfileView({ slug, report }: { slug: string; report: Report }) {
  return <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
    <ReportHeader slug={slug} report={report} currentPage="industry_profile" />
    <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8">
      <ReportNavButtons slug={slug} currentPage="industry_profile_sa" prev={{ label: "QLD Workforce Overview", href: `/reports/${slug}/industry_profile_qld` }} next={{ label: "TAS Workforce Overview", href: `/reports/${slug}/industry_profile_tas` }} prevPrefix="" />
      <section className="grid gap-6 bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
        <div>
          <p className="inline-block rounded-full bg-[#754D32] px-3 py-1 text-[10px] font-semibold text-white">South Australia · Selected jurisdiction</p>
          <h1 className="mt-4 text-[30px] font-bold leading-tight sm:text-[38px]">South Australian Public<br />Service</h1>
          <p className="mt-5 text-xs font-medium text-[#668B17]">Workforce Overview</p>
          <div className="mt-3 max-w-[520px] space-y-3">
            <div className="rounded-md bg-[#F8EEE8] p-4"><p className="text-xs text-[#382219]">In 2025, the South Australian Public Service was comprised of</p><strong className="mt-1 block text-3xl text-[#754D32]">122,644</strong><p className="mt-1 text-xs leading-5 text-[#382219]">employees (101,732 FTE)</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[10px] text-[#694834]">Source: Government of South Australia, State of the Sector Report 2025, 2025, pg. 8</p></div>
            <div className="rounded-md bg-[#F8EEE8] p-4"><strong className="block text-3xl text-[#754D32]">14,111</strong><p className="mt-1 text-xs text-[#382219]">APS employees located in South Australia</p></div>
          </div>
        </div>
        <JurisdictionMap slug={slug} selected="SA" />
      </section>
      <Section title="Workforce Overview" subtitle="Workforce size, composition, diversity, structure and legal context.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div><h3 className="text-sm font-bold">Overview</h3><p className="mt-2 text-xs leading-6 text-[#42463B]">The South Australian public sector (SAPS) employs approximately 101,700 FTE employees, with a headcount of 122,644 employees. Just under three in ten employees were engaged in frontline or direct support roles outside health and education, while a similar proportion were employed in policy or administrative roles, highlighting the dual service-delivery and system-stewardship functions of the sector.</p><p className="mt-3 text-xs leading-6 text-[#42463B]">Women comprise close to 70 per cent of employees, while men represent under one-third. The age profile of the SAPS shows most employees concentrated in the 30-40 and 40-50 age cohorts. First Nations employees accounted for approximately 2.3 per cent of the workforce in 2025 rising from 2.1 per cent in 2020.</p></div>
          <div><h3 className="text-sm font-bold">Structure and Legal Context</h3><p className="mt-2 text-xs leading-6 text-[#42463B]">The South Australian Public Sector is defined under the Public Sector Act (2009) and consists of General Government Sector agencies, Public Non-Financial Corporations, Public Financial Corporations and Non-Budget Entities. The General Government sector covers the largest portion of services and consists of 79 agencies including:</p><ul className="mt-2 list-disc pl-5 text-xs leading-6 text-[#42463B]"><li>Departments</li><li>Police</li><li>Fire and Emergency Services</li></ul></div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-md bg-[#F8EEE8] p-4"><strong className="text-3xl text-[#754D32]">7%</strong><p className="mt-2 min-h-12 text-xs leading-5">Employment growth rate to May 2035 for Public Administration and Safety Industry</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[9px] leading-4 text-[#694834]">Source: Jobs and Skills Australia, Employment Projections - outlook for states and territories, 2025, Table 2</p></div>
          <div className="rounded-md bg-[#F8EEE8] p-4"><strong className="text-3xl text-[#754D32]">2.1%→2.25%</strong><p className="mt-2 min-h-12 text-xs leading-5">Since 2021, the proportion of First Nations people&apos;s employment in the South Australian General Government sector rose from:</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[9px] leading-4 text-[#694834]">Government of South Australia, Workforce Information Report Data Dashboard [data set], 2025</p></div>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <ColumnChart title="South Australian Public Sector Employees by Age" data={[{ label: "Under 30", value: 17.4, text: "17.4%" }, { label: "30-40", value: 24.7, text: "24.7%" }, { label: "40-50", value: 24.1, text: "24.1%" }, { label: "50-60", value: 21.5, text: "21.5%" }, { label: "Over 60", value: 12.4, text: "12.4%" }]} source="SOURCE Government of South Australia, State of the Sector Report 2025, 2025, Table 1" />
          <RepresentationChart />
        </div>
      </Section>
      <Section title="Workforce Trends" subtitle="Growth, projections, occupational shortages and representation over time">
        <p className="text-xs leading-6 text-[#42463B]">The South Australian (SA) Government undertakes employment projections annually.</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-md border border-[#E6E4E0]"><h3 className="bg-[#F3F3F2] p-3 text-xs font-medium leading-5">Qualifications are projected to be in very high or high demand for the following occupations between 2025-2028:</h3><ul className="divide-y divide-[#E6E4E0] text-xs text-[#42463B]">{demand.map(([occupation]) => <li className="p-3" key={occupation}>{occupation}</li>)}</ul></div>
          <div className="overflow-hidden rounded-md border border-[#E6E4E0]"><h3 className="bg-[#F3F3F2] p-3 text-xs font-medium leading-5">Occupations in digital, technology and cybersecurity are also in strong demand, including:</h3><ul className="divide-y divide-[#E6E4E0] text-xs text-[#42463B]">{demand.map(([, occupation]) => <li className="p-3" key={occupation}>{occupation}</li>)}</ul></div>
        </div>
        <div className="mt-6 rounded-md border border-[#E8E6DD] bg-[#FAFAF0] p-5"><span className="inline-block rounded-full bg-[#754D32] px-4 py-1.5 text-xs font-semibold text-white">Industry Insight</span><p className="mt-4 text-xs leading-6 text-[#42463B]">Alongside projected high-demand qualifications and occupations, stakeholders also identified future skills needs in AI, Digital Transformation, IT (architects and specialists).</p></div>
      </Section>
      <section className="bg-white p-5 sm:p-6"><h2 className="text-base font-bold">Sources</h2><ol start={53} className="mt-4 space-y-3">{sources.map((source, index) => <li key={index} className="flex gap-3 text-[11px] leading-5 text-[#42463B]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#668B17] text-[10px] text-white">{53 + index}</span>{source}</li>)}</ol></section>
    </main>
    <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
  </div>;
}
