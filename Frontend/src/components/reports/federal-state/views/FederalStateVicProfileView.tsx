"use client";

import { GenderChartHeading, GenderPayGapCard } from "./DocumentGenderGraphic";

import { ChartScroll, ProfileColumnChart } from "./FederalStateProfileCharts";
import chartStyles from "./FederalStateProfileCharts.module.css";

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
  "Victorian Government, Workforce data (state of the public sector) 2025, Victorian Government, 2025, accessed 9 February 2026.",
  "Victorian Government, 2024 Workforce data (State of the Public Sector) - Age, gender and sexuality, Victorian Government, 2025, accessed 9 February 2026.",
  "Victorian Government, 2024 Workforce data (State of the Public Sector) - Cultural background and home life, Victorian Government, 2025, accessed 9 February 2026.",
  "Victorian Public Sector Commission (VPSC), Aboriginal and/or Torres Strait Islander, Victorian Government, 2025, accessed 9 February 2026.",
  "Employment projections for Victoria are done by Department of Jobs, Skills, Industry and Regions. Projections are based on retirements and new employees expected (modelling by the Victorian Skills Authority). These employment projections differ to the Jobs Skills Australia projections for the Public Administration and Safety Industry.",
  "Victorian Skills Authority, Employment Projections Dashboard 2025-2035 [Workforce summary dashboard], Department of Jobs, Skills, Industry and Regions, Victorian Government, 2025, accessed 5 February 2026.",
  "Victorian Skills Authority, Victorian Skills Plan for 2025 into 2026: Shared prosperity through skills, Department of Jobs, Skills, Industry and Regions, Victorian Government, January 2026, accessed 5 February 2026.",
  "Victorian Government, Independent Review of the Victoria Public Service Final Report, June 2025, accessed 13 February 2026.",
  "Victorian Government, Independent Review of the Victoria Public Service Final Report, June 2025, accessed 13 February 2026.",
];

function GenderLineChart() {
  const x = (i: number) => 45 + i * 111;
  const series = [
    { key: "female" as const, label: "Female", color: "#754D32", top: 56, scale: 10 },
    { key: "male" as const, label: "Male", color: "#95694D", top: 100, scale: 10 },
    { key: "selfDescribed" as const, label: "Self Described", color: "#E7CDBF", top: 150, scale: 15 },
  ];
  const y = (key: "female" | "male" | "selfDescribed", value: number) => key === "female" ? 56 - (value - 59) * 10 : key === "male" ? 105 - (value - 40) * 10 : 151 - value * 15;
  return <div data-profile-chart data-chart-surface="standard" data-chart-type="gender" className={`${chartStyles.card} ${chartStyles.standard} rounded-md  p-4 sm:p-5`}>
    <GenderChartHeading>Percentage of Employees in the Victorian Public Service by Gender (headcount)</GenderChartHeading>
    <ChartScroll><svg viewBox="0 0 550 330" role="img" aria-label="Female 59.6%, male 39.8%, self described 0.3% in 2024" className="mt-4 w-full">
      <line x1="36" x2="505" y1="271.5" y2="271.5" stroke="#E5DCD6" />
      {series.map(({ key, color }) => <g key={key}><polyline points={gender.map((item, i) => `${x(i)},${(y(key, item[key])) * 1.5}`).join(" ")} fill="none" stroke={color} strokeWidth="3" />{gender.map((item, i) => <g key={item.year}><circle cx={x(i)} cy={(y(key, item[key])) * 1.5} r="3.5" fill="white" stroke={color} strokeWidth="3" /><text x={x(i)} y={(y(key, item[key]) - 9) * 1.5} textAnchor="middle" fontSize="9" fill={color}>{item[key].toFixed(1)}%</text></g>)}</g>)}
      {gender.map((item, i) => <text key={item.year} x={x(i)} y="307.5" textAnchor="middle" fontSize="10" fill="#5E6268">{item.year}</text>)}
    </svg></ChartScroll>
    <div className={chartStyles.legend}>{series.map(({ label, color }) => <span key={label}><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} />{label}</span>)}</div>
    <p className="mt-5 border-t border-[#E6DCD5] pt-3 text-[9px] leading-4 text-[#694834]">SOURCE Victorian Government, 2024 Workforce data (state of the public sector) - Age, gender and sexuality, 2024</p>
  </div>;
}

function RepresentationChart() {
  const years = [2021, 2022, 2023, 2024];
  const actual = [1.2, 1.2, 1.5, 1.6];
  const x = (i: number) => 50 + i * 145;
  const y = (value: number) => 157 - (value - 1) * 70;
  return <div data-profile-chart data-chart-surface="representation" data-chart-type="line" className={`${chartStyles.card} ${chartStyles.representation} rounded-md  p-4 sm:p-5`}><h3 className="min-h-10 text-sm font-bold">Aboriginal and Torres Strait Islander Representation in the Victorian Public Service (2021-2024)</h3><ChartScroll><svg viewBox="0 0 550 330" role="img" aria-label="Representation: 1.2% in 2021 and 2022, 1.5% in 2023, 1.6% in 2024; 2% target" className="mt-4 w-full"><line x1="40" x2="510" y1="267" y2="267" stroke="#E5DCD6" /><line x1="50" x2="485" y1={(y(2)) * 1.5} y2={(y(2)) * 1.5} stroke="#E7CDBF" strokeWidth="3" strokeDasharray="5 4" /><polyline points={actual.map((value, i) => `${x(i)},${(y(value)) * 1.5}`).join(" ")} fill="none" stroke="#754D32" strokeWidth="3" />{years.map((year, i) => <g key={year}><circle cx={x(i)} cy={(y(actual[i])) * 1.5} r="4" fill="white" stroke="#754D32" strokeWidth="3" /><text x={x(i)} y={(y(actual[i]) - 12) * 1.5} textAnchor="middle" fontSize="10" fill="#754D32">{actual[i].toFixed(1)}%</text><text x={x(i)} y={(y(2) - 10) * 1.5} textAnchor="middle" fontSize="10" fill="#E7CDBF">2.0%</text><text x={x(i)} y="303" textAnchor="middle" fontSize="10" fill="#5E6268">{year}</text></g>)}</svg></ChartScroll><div className={chartStyles.legend}><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[#754D32]" />Percentage</span><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[#E7CDBF]" />Target</span></div><p className="mt-5 border-t border-[#E6DCD5] pt-3 text-[9px] leading-4 text-[#694834]">SOURCE Victorian Government, Workforce data (state of the public sector) 2024-25, 2023-24, 2022-23, 2021-22</p></div>;
}

function GrowthChart() {
  return <ProfileColumnChart wide title="Employment Growth Rate for Public Administration and Safety Industry to 2035" data={[{ label: "2025", value: 0, text: "0.0%" }, { label: "2028", value: 0, text: "0.0%" }, { label: "2035", value: 1.3, text: "1.3%" }]} source="SOURCE Victorian Skills Authority, Employment projections dashboard 2025-35 - Workforce summary - Industries, 2025" />;
}

function OccupationGrowthChart() {
  return <ProfileColumnChart wide title="10-Year Growth Rate for Top 10 Employed Occupations in Public Administration" data={occupationGrowth.map(item => ({ ...item, text: `${item.value.toFixed(1)}%` }))} source="SOURCE Victorian Skills Authority, Employment Projections Dashboard 2025-35 - Occupations, 2025" />;
}

export default function FederalStateVicProfileView({ slug, report, embedded = false }: { slug: string; report: Report; embedded?: boolean }) {
  const ContentTag = embedded ? "div" : "main";
  return <div className={embedded ? "text-[#252D02]" : "flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased"}>{!embedded && <ReportHeader slug={slug} report={report} currentPage="industry_profile" />}<ContentTag className={embedded ? "space-y-5" : "mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8"}>
    {!embedded && <ReportNavButtons slug={slug} currentPage="industry_profile_vic" prev={{ label: "TAS Workforce Overview", href: `/reports/${slug}/industry_profile_tas` }} next={{ label: "WA Workforce Overview", href: `/reports/${slug}/industry_profile_wa` }} prevPrefix="" />}
    <section data-jurisdiction-profile className="grid gap-6 bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10"><div className="min-w-0 [container-type:inline-size]"><p className="inline-block rounded-full bg-[#EED4C4] px-3 py-1.5 text-xs font-semibold text-black">VICTORIA · Selected jurisdiction</p><h1 data-profile-title className="mt-4 text-[clamp(1.25rem,9cqi,2.5rem)] font-bold leading-tight text-black">Victorian<br /><span className="whitespace-nowrap">Public Service</span></h1><p className="mt-5 text-base font-semibold text-black">Workforce Overview</p><div className="mt-3 max-w-[520px] space-y-3"><div className="rounded-md bg-[#F8EEE8] p-4"><p className="text-base leading-6 text-black">In 2025, the Victorian <span className="whitespace-nowrap">Public Service</span> was comprised of</p><strong className="mt-1 block text-4xl text-black">58,169</strong><p className="mt-1 text-base leading-6 text-black">employees</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-xs leading-5 text-black">Source: Victorian Government, 2025 Workforce data (state of the public sector) - Number of employees, 2025</p></div><div className="rounded-md bg-[#F8EEE8] p-4"><strong className="block text-4xl text-black">35,679</strong><p className="mt-1 text-base leading-6 text-black">APS employees located in Victoria</p></div></div></div><JurisdictionMap slug={slug} selected="VIC" showLinks={!embedded} /></section>
    <Section title="Workforce Overview" subtitle="Workforce size, composition, diversity, structure and legal context."><div className="grid gap-6 lg:grid-cols-2"><div><h3 className="text-sm font-bold">Overview</h3><p className="mt-2 text-xs leading-6 text-[#42463B]">As of June 2025, 58,169 (55,672 FTE) employees were engaged in the Victorian Public Service (VPS).<sup>67</sup></p><p className="mt-3 text-xs leading-6 text-[#42463B]">The VPS workforce is predominantly female, with women accounting for just under 60 per cent of employees, while men represent under 40 per cent.<sup>68</sup></p><p className="mt-3 text-xs leading-6 text-[#42463B]">Over 19 per cent of employees reported speaking a language other than English at home and 19.5 per cent were born outside Australia.<sup>69</sup> First Nations employees comprised approximately 1.6 per cent of the VPS workforce, which was below the government&apos;s target of two per cent by June 2022.<sup>70</sup></p><GenderPayGapCard value="6.7%" source="Source: Victorian Government, State of the Sector Report 2024, 2024" className="mt-5" /></div><div><h3 className="text-sm font-bold">Structure and Legal Context</h3><p className="mt-2 text-xs leading-6 text-[#42463B]">The VPS workforce includes the Public Service which encompasses Departments, administrative offices, the Victorian Public Sector Commission and Separate Public Entities. The Public Service consists of those employed under Public Administration Act (2004). There are 10 departments of the Public Service, each led by a Secretary. Administrative offices are established in relation to a department and perform activities under the direction of ministers. The Government Sector comprises over 3,000 public entities that deliver public services, and include organisations such as Ambulance Victoria, Parks Victoria and the Transport Accident Commission.</p></div></div></Section>
    <Section title="Workforce Trends" subtitle="Growth, projections, occupational shortages and representation over time">
      <div data-vic-trend-charts className="grid gap-4 lg:grid-cols-2">
        <GenderLineChart />
        <RepresentationChart />
      </div>
      <div className="mt-6"><p className="max-w-4xl text-xs leading-6 text-[#42463B]"><sup>71</sup> While the projected 10-year growth rate for Public Administration and Safety is 1.3 per cent,<sup>72</sup> this growth rate is slightly higher for the following Public Administration Industry occupations:</p>
        <div role="region" aria-label="Victoria occupation growth points" tabIndex={0} className="mt-4 min-w-0 overflow-x-auto pb-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754C2D]">
          <ol data-vic-occupations aria-label="Public Administration occupations with higher projected growth" role="list" className="grid min-w-[1020px] list-none grid-cols-6 gap-3">
            {occupations.map((occupation, index) => <li key={occupation} className="min-w-0 rounded-md bg-[#F8EEE8] p-4 text-sm leading-6 text-[#42463B]">
              <span aria-hidden="true" className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#754D32] text-base font-bold text-white">{index + 1}</span>
              <span data-vic-occupation-copy>{occupation}</span>
            </li>)}
          </ol>
        </div>
        <div data-vic-trends-narratives className="mt-5 grid items-start gap-6 lg:grid-cols-2"><p className="min-w-0 text-xs leading-6 text-[#42463B]">Digital technologies are a priority for the Victorian Government with over 87,000 new digital technology employees required over the next 10 years. There is a growing demand for skills in data analytics, cyber security and cloud computing,<sup>73</sup> noting that these occupational areas have consistently been identified as skills gaps by Federal and State/Territory Government industry-sector stakeholders.</p><p className="min-w-0 text-xs leading-6 text-[#42463B]">Recently, the Independent Review of the Victorian Public Service (the Silver Review) recommended rebalancing the size and structure of the VPS to improve productivity.<sup>74</sup> Recommendations also included improving the adoption of AI and digital services across the VPS and reducing inefficient duplication in service provision.<sup>75</sup> The Victorian Government has committed to implementing most of the recommendations.</p></div><div className="mt-6 grid gap-4 lg:grid-cols-2"><GrowthChart /><OccupationGrowthChart /></div></div></Section>
    <section className="bg-white p-5 sm:p-6"><h2 className="text-base font-bold">Sources</h2><ol start={67} className="mt-4 space-y-3">{sources.map((source, index) => <li key={index} className="flex gap-3 text-[11px] leading-5 text-[#42463B]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#668B17] text-[10px] text-white">{67 + index}</span>{source}</li>)}</ol></section>
  </ContentTag>{!embedded && <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />}</div>;
}
