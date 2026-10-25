"use client";

import IndustryInsightCard from "./IndustryInsightCard";
import { GenderChartHeading } from "./DocumentGenderGraphic";

import { ChartScroll } from "./FederalStateProfileCharts";
import chartStyles from "./FederalStateProfileCharts.module.css";

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
  return <div data-profile-chart data-chart-surface="representation" data-chart-type="line" className={`${chartStyles.card} ${chartStyles.representation} rounded-md  p-4 sm:p-5`}>
    <h3 className="min-h-10 text-sm font-bold text-[#252D02]">Aboriginal and Torres Strait Islander Representation in the South Australian Public Sector (2021-2025)</h3>
    <ChartScroll><svg viewBox="0 0 560 337.5" role="img" aria-label="First Nations representation rose from 2.09% in 2021 to 2.25% in 2025" className="mt-5 w-full">
      <line x1="40" x2="512" y1="271.5" y2="271.5" stroke="#E6DCD5" />
      <polyline points={representation.map(({ value }, i) => `${x(i)},${(y(value)) * 1.5}`).join(" ")} fill="none" stroke="#754D32" strokeWidth="3" />
      {representation.map(({ year, value }, i) => <g key={year}><circle cx={x(i)} cy={(y(value)) * 1.5} r="4" fill="white" stroke="#754D32" strokeWidth="3" /><text x={x(i)} y={(y(value) - 12) * 1.5} textAnchor="middle" fontSize="10" fontWeight="600" fill="#382219">{value.toFixed(2)}%</text><text x={x(i)} y="304.5" textAnchor="middle" fontSize="10" fill="#62666D">{year}</text></g>)}
    </svg></ChartScroll>
    <p className="mt-4 border-t border-[#E6DCD5] pt-3 text-[9px] leading-4 text-[#694834]">SOURCE Government of South Australia, Workforce Information Report Data Dashboard [data set], 2025</p>
  </div>;
}

function GenderChart() {
  return <article data-sa-gender-chart data-profile-chart data-chart-surface="standard" data-chart-type="gender" className={`${chartStyles.standard} flex h-full min-w-0 flex-col rounded-md p-4 text-black sm:p-5`}>
    <GenderChartHeading>South Australian Public Sector Employees – Gender</GenderChartHeading>
    <div role="img" aria-label="Female 69.6%, male 30.3%, other 0.1%" className="relative mx-auto mt-5 w-full max-w-[400px] pb-10 pt-4">
      <div className="mx-auto aspect-square w-[82%] rounded-full" style={{ background: "conic-gradient(#BBA38F 0 69.6%, #807064 69.6% 99.9%, #DFD3C6 99.9% 100%)", transform: "rotate(180deg) scaleX(-1)" }}>
        <div className="relative left-[12.5%] top-[12.5%] h-[75%] w-[75%] rounded-full bg-[#F8EEE8]" />
      </div>
      <span className="absolute right-0 top-0 text-2xl font-bold text-[#807064] sm:text-3xl">69.6%</span>
      <span className="absolute bottom-9 left-0 text-2xl font-bold text-[#807064] sm:text-3xl">30.3%</span>
      <span className="absolute bottom-0 left-[52%] text-2xl font-bold text-[#807064] sm:text-3xl">0.1%</span>
    </div>
    <ul aria-label="Gender chart legend" className="mb-5 mt-3 space-y-1.5 text-sm">
      <li className="flex items-center gap-2"><span aria-hidden="true" className="h-4 w-4 bg-[#BBA38F]" />Female</li>
      <li className="flex items-center gap-2"><span aria-hidden="true" className="h-4 w-4 bg-[#807064]" />Male</li>
      <li className="flex items-center gap-2"><span aria-hidden="true" className="h-4 w-4 bg-[#DFD3C6]" />Other</li>
    </ul>
    <p data-chart-source className="mt-auto min-h-[80px] border-t border-[#E6DCD5] pt-4 text-xs leading-5">Source: Government of South Australia, State of the Sector Report 2025, 2025, pg. 8</p>
  </article>;
}

function DiversityChart() {
  const groups = [
    { label: ["Employees with", "disability"], value: 1.5 },
    { label: ["Culturally and", "linguistically diverse"], value: 17.4 },
    { label: ["Aboriginal"], value: 2.3 },
  ];
  const baseline = 340;
  const scale = 15;
  return <article data-sa-diversity-chart data-profile-chart data-chart-surface="standard" data-chart-type="diversity" className={`${chartStyles.standard} flex h-full min-w-0 flex-col rounded-md p-4 text-black sm:p-5`}>
    <h3 className="min-h-[84px] text-lg font-bold leading-7">Diversity in the South Australian Public Sector</h3>
    <ChartScroll><svg viewBox="0 0 600 440" role="img" aria-label="Employees with disability 1.5%, culturally and linguistically diverse 17.4%, Aboriginal 2.3%" className="w-full min-w-[480px] text-black">
      {Array.from({ length: 10 }, (_, i) => i * 2).map(value => <g key={value}>
        <line x1="60" x2="590" y1={baseline - value * scale} y2={baseline - value * scale} stroke={value === 0 ? "#807064" : "#DECFC5"} />
        <text x="50" y={baseline - value * scale + 6} textAnchor="end" fontSize="16" fill="currentColor">{value}%</text>
      </g>)}
      {groups.map(({ label, value }, i) => {
        const center = 145 + i * 175;
        const y = baseline - value * scale;
        return <g key={label[0]}>
          <rect x={center - 55} y={y} width="110" height={value * scale} fill="#BBA38F" />
          <text x={center} y={y - 10} textAnchor="middle" fontSize="18" fontWeight="600" fill="currentColor">{value}%</text>
          <text x={center} y="370" textAnchor="middle" fontSize="16" fill="currentColor">{label.map((line, n) => <tspan key={line} x={center} dy={n === 0 ? 0 : 22}>{line}</tspan>)}</text>
        </g>;
      })}
    </svg></ChartScroll>
    <p data-chart-source className="mt-auto min-h-[80px] border-t border-[#E6DCD5] pt-4 text-xs leading-5">Source: Government of South Australia, State of the Sector Report 2025, 2025, pg. 8 &amp; 18</p>
  </article>;
}

export default function FederalStateSaProfileView({ slug, report, embedded = false }: { slug: string; report: Report; embedded?: boolean }) {
  const ContentTag = embedded ? "div" : "main";
  return <div className={embedded ? "text-[#252D02]" : "flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased"}>
    {!embedded && <ReportHeader slug={slug} report={report} currentPage="industry_profile" />}
    <ContentTag className={embedded ? "space-y-5" : "mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8"}>
      {!embedded && <ReportNavButtons slug={slug} currentPage="industry_profile_sa" prev={{ label: "QLD Workforce Overview", href: `/reports/${slug}/industry_profile_qld` }} next={{ label: "TAS Workforce Overview", href: `/reports/${slug}/industry_profile_tas` }} prevPrefix="" />}
      <section data-jurisdiction-profile className="grid gap-6 bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
        <div className="min-w-0 [container-type:inline-size]">
          <p className="inline-block rounded-full bg-[#EED4C4] px-3 py-1.5 text-xs font-semibold text-black">South Australia · Selected jurisdiction</p>
          <h1 data-profile-title className="mt-4 text-[clamp(1.25rem,9cqi,2.5rem)] font-bold leading-tight text-black">South Australian<br /><span className="whitespace-nowrap">Public Service</span></h1>
          <p className="mt-5 text-base font-semibold text-black">Workforce Overview</p>
          <div className="mt-3 max-w-[520px] space-y-3">
            <div className="rounded-md bg-[#F8EEE8] p-4"><p className="text-base leading-6 text-black">In 2025, the South Australian <span className="whitespace-nowrap">Public Service</span> was comprised of</p><strong className="mt-1 block text-4xl text-black">122,644</strong><p className="mt-1 text-base leading-6 text-black">employees (101,732 FTE)</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-xs leading-5 text-black">Source: Government of South Australia, State of the Sector Report 2025, 2025, pg. 8</p></div>
            <div className="rounded-md bg-[#F8EEE8] p-4"><strong className="block text-4xl text-black">14,111</strong><p className="mt-1 text-base leading-6 text-black">APS employees located in South Australia</p></div>
          </div>
        </div>
        <JurisdictionMap slug={slug} selected="SA" showLinks={!embedded} />
      </section>
      <Section title="Workforce Overview" subtitle="Workforce size, composition, diversity, structure and legal context.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div><h3 className="text-sm font-bold">Overview</h3><p className="mt-2 text-xs leading-6 text-[#42463B]">The South Australian public sector (SAPS) employs approximately 101,700 FTE employees, with a headcount of 122,644 employees. Just under three in ten employees were engaged in frontline or direct support roles outside health and education, while a similar proportion were employed in policy or administrative roles, highlighting the dual service-delivery and system-stewardship functions of the sector.</p><p className="mt-3 text-xs leading-6 text-[#42463B]">Women comprise close to 70 per cent of employees, while men represent under one-third. The age profile of the SAPS shows most employees concentrated in the 30-40 and 40-50 age cohorts. First Nations employees accounted for approximately 2.3 per cent of the workforce in 2025 rising from 2.1 per cent in 2020.</p></div>
          <div><h3 className="text-sm font-bold">Structure and Legal Context</h3><p className="mt-2 text-xs leading-6 text-[#42463B]">The South Australian Public Sector is defined under the Public Sector Act (2009) and consists of General Government Sector agencies, Public Non-Financial Corporations, Public Financial Corporations and Non-Budget Entities. The General Government sector covers the largest portion of services and consists of 79 agencies including:</p><ul className="mt-2 list-disc pl-5 text-xs leading-6 text-[#42463B]"><li>Departments</li><li>Police</li><li>Fire and Emergency Services</li></ul></div>
        </div>
        <div data-sa-overview-charts className="mt-6 grid gap-4 lg:grid-cols-2">
          <GenderChart />
          <DiversityChart />
        </div>
        <div className="mt-4 max-w-[760px]">
          <RepresentationChart />
        </div>
      </Section>
      <Section title="Workforce Trends" subtitle="Growth, projections, occupational shortages and representation over time">
        <p className="text-xs leading-6 text-[#42463B]">The South Australian (SA) Government undertakes employment projections annually.</p>
        <div data-sa-trends-statistics className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <div data-sa-growth className="rounded-md bg-[#F8EEE8] p-4"><strong className="text-3xl text-[#754D32]">7%</strong><p className="mt-2 min-h-12 text-xs leading-5">Employment growth rate to May 2035 for Public Administration and Safety Industry</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[9px] leading-4 text-[#694834]">Source: Jobs and Skills Australia, Employment Projections - outlook for states and territories, 2025, Table 2</p></div>
            <div data-sa-first-nations-change className="rounded-md bg-[#F8EEE8] p-4"><strong className="text-3xl text-[#754D32]">2.1%→2.25%</strong><p className="mt-2 min-h-12 text-xs leading-5">Since 2021, the proportion of First Nations people&apos;s employment in the South Australian General Government sector rose from:</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[9px] leading-4 text-[#694834]">Government of South Australia, Workforce Information Report Data Dashboard [data set], 2025</p></div>
          </div>
          <div data-sa-age-chart className="min-w-0">
            <ColumnChart title="South Australian Public Sector Employees by Age" data={[{ label: "Under 30", value: 17.4, text: "17.4%" }, { label: "30-40", value: 24.7, text: "24.7%" }, { label: "40-50", value: 24.1, text: "24.1%" }, { label: "50-60", value: 21.5, text: "21.5%" }, { label: "Over 60", value: 12.4, text: "12.4%" }]} source="SOURCE Government of South Australia, State of the Sector Report 2025, 2025, Table 1" />
          </div>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-md border border-[#E6E4E0]"><h3 className="bg-[#F3F3F2] p-3 text-xs font-medium leading-5">Qualifications are projected to be in very high or high demand for the following occupations between 2025-2028:</h3><ul className="divide-y divide-[#E6E4E0] text-xs text-[#42463B]">{demand.map(([occupation]) => <li className="p-3" key={occupation}>{occupation}</li>)}</ul></div>
          <div className="overflow-hidden rounded-md border border-[#E6E4E0]"><h3 className="bg-[#F3F3F2] p-3 text-xs font-medium leading-5">Occupations in digital, technology and cybersecurity are also in strong demand, including:</h3><ul className="divide-y divide-[#E6E4E0] text-xs text-[#42463B]">{demand.map(([, occupation]) => <li className="p-3" key={occupation}>{occupation}</li>)}</ul></div>
        </div>
        <IndustryInsightCard className="mt-6"><p>Alongside projected high-demand qualifications and occupations, stakeholders also identified future skills needs in AI, Digital Transformation, IT (architects and specialists).</p></IndustryInsightCard>
      </Section>
      <section className="bg-white p-5 sm:p-6"><h2 className="text-base font-bold">Sources</h2><ol start={53} className="mt-4 space-y-3">{sources.map((source, index) => <li key={index} className="flex gap-3 text-[11px] leading-5 text-[#42463B]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#668B17] text-[10px] text-white">{53 + index}</span>{source}</li>)}</ol></section>
    </ContentTag>
    {!embedded && <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />}
  </div>;
}
