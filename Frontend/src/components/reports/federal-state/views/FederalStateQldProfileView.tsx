"use client";

import { GenderPayGapCard } from "./DocumentGenderGraphic";

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

const sources = [
  { number: 43, text: "Queensland Government, State of the Sector Report 2025, Queensland Government, 2025, accessed on 6 February 2026." },
  { number: 44, text: "Queensland Government, State of the Sector Report 2025, Queensland Government, 2025, accessed on 6 February 2026." },
  { number: 45, text: "Queensland Government, State of the Sector Report 2025, Queensland Government, 2025, accessed on 6 February 2026." },
  { number: 46, text: "Queensland Government, State of the Sector Report 2025, Queensland Government, 2025, accessed on 6 February 2026." },
  { number: 47, text: "Queensland Government, Aboriginal peoples and Torres Strait Islander peoples, Queensland Government, 2024, accessed 11 February 2026." },
  { number: 48, text: "Queensland Government, Aboriginal peoples and Torres Strait Islander peoples, Queensland Government, 2024, accessed 11 February 2026." },
  { number: 49, text: "Queensland Government, State of the Sector Report 2025, Queensland Government, 2025, accessed on 6 February 2026." },
  { number: 50, text: "Queensland Government, State of the Sector Report 2025, Queensland Government, 2025, accessed on 6 February 2026." },
  { number: 51, text: "Jobs and Skills Australia (JSA), Employment Projections – Outlook for states territories, Australian Government, 2025, accessed 6 February 2026." },
  { number: 52, text: "Queensland Government, State of the Sector Report 2025, Queensland Government, 2025, accessed on 6 February 2026." },
];

function RepresentationChart() {
  const years = [2021, 2022, 2023, 2024, 2025];
  const actual = [2.5, 2.5, 2.6, 2.7, 2.7];
  const target = [3, 3, 4, 4, 4];
  const x = (i: number) => 50 + i * 110;
  const y = (v: number) => 169 - (v - 2) * 67;
  return (
    <div data-profile-chart data-chart-surface="representation" data-chart-type="line" className={`${chartStyles.card} ${chartStyles.representation} rounded-md  p-4 sm:p-5`}>
      <h3 className="min-h-10 text-sm font-bold text-[#252D02]">Aboriginal and Torres Strait Islander Representation in the Queensland Public Sector (2021-2025)</h3>
      <ChartScroll><svg viewBox="0 0 540 337.5" role="img" aria-label="Actual representation from 2.5% in 2021 to 2.7% in 2025; target 3% in 2021 and 2022, then 4%" className="mt-5 w-full">
        <line x1="42" x2="502" y1="276" y2="276" stroke="#DFD6CF" />
        <polyline points={target.map((v, i) => `${x(i)},${(y(v)) * 1.5}`).join(" ")} fill="none" stroke="#E7CDBF" strokeWidth="3" strokeDasharray="5 4" />
        <polyline points={actual.map((v, i) => `${x(i)},${(y(v)) * 1.5}`).join(" ")} fill="none" stroke="#754D32" strokeWidth="2.5" />
        {years.map((year, i) => <g key={year}>
          <circle cx={x(i)} cy={(y(target[i])) * 1.5} r="4" fill="white" stroke="#E7CDBF" strokeWidth="3" />
          <circle cx={x(i)} cy={(y(actual[i])) * 1.5} r="4" fill="white" stroke="#754D32" strokeWidth="3" />
          <text x={x(i)} y={(y(target[i]) - 10) * 1.5} textAnchor="middle" fontSize="10" fill="#D9BFB1">{target[i].toFixed(1)}%</text>
          <text x={x(i)} y={(y(actual[i]) - 10) * 1.5} textAnchor="middle" fontSize="10" fontWeight="600" fill="#754D32">{actual[i].toFixed(1)}%</text>
          <text x={x(i)} y="310.5" textAnchor="middle" fontSize="10" fill="#565A60">{year}</text>
        </g>)}
      </svg></ChartScroll>
      <div className={chartStyles.legend}><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[#754D32]" />Percentage</span><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[#E7CDBF]" />Target</span></div>
      <p className="mt-5 border-t border-[#E6DCD5] pt-3 text-[9px] text-[#694834]">SOURCE Queensland Government, State of the Sector Report, 2025, pg. 42</p>
    </div>
  );
}

function ProjectionChart() {
  const years = [2025, 2030, 2035];
  const values = [187041, 202717, 219138];
  const points = values.map((v, i) => `${75 + i * 170},${(168 - (v - 180000) / 460) * 1.5}`).join(" ");
  return <div data-profile-chart data-chart-surface="standard" data-chart-type="projection" className={`${chartStyles.card} ${chartStyles.standard} rounded-md  p-4 sm:p-5`}>
    <h3 className="text-sm font-bold text-[#252D02]">Queensland Employment Projections to 2035 - Public Administration and Safety Industry</h3>
    <ChartScroll><svg viewBox="0 0 500 345" role="img" aria-label="Employment projected at 187,041 in 2025, 202,717 in 2030 and 219,138 in 2035" className="mt-5 w-full">
      <line x1="45" x2="455" y1="279" y2="279" stroke="#DFD6CF" />
      <polyline points={points} fill="none" stroke="#754D32" strokeWidth="2.5" />
      {values.map((v, i) => {
        const x = 75 + i * 170;
        const y = 168 - (v - 180000) / 460;
        return <g key={years[i]}><circle cx={x} cy={(y) * 1.5} r="4" fill="white" stroke="#754D32" strokeWidth="3" /><text x={x} y={(y - 16) * 1.5} textAnchor="middle" fontSize="12" fontWeight="600" fill="#754D32">{v.toLocaleString()}</text><text x={x} y="315" textAnchor="middle" fontSize="11" fill="#565A60">{years[i]}</text></g>;
      })}
    </svg></ChartScroll>
    <p className="mt-4 border-t border-[#E6DCD5] pt-3 text-[9px] text-[#694834]">SOURCE Queensland Government, Regional employment projections data, Tables 2010-11 to 2040-41</p>
  </div>;
}

export default function FederalStateQldProfileView({ slug, report, embedded = false }: { slug: string; report: Report; embedded?: boolean }) {
  const ContentTag = embedded ? "div" : "main";
  return <div className={embedded ? "text-[#252D02]" : "flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased"}>
    {!embedded && <ReportHeader slug={slug} report={report} currentPage="industry_profile" />}
    <ContentTag className={embedded ? "space-y-5" : "mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8"}>
      {!embedded && <ReportNavButtons slug={slug} currentPage="industry_profile_qld" prev={{ label: "NT Workforce Overview", href: `/reports/${slug}/industry_profile_nt` }} next={{ label: "SA Workforce Overview", href: `/reports/${slug}/industry_profile_sa` }} prevPrefix="" />}
      <section data-jurisdiction-profile className="grid gap-6 bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
        <div className="min-w-0 [container-type:inline-size]">
          <p className="inline-block rounded-full bg-[#EED4C4] px-3 py-1.5 text-xs font-semibold text-black">Queensland · Selected jurisdiction</p>
          <h1 data-profile-title className="mt-4 text-[clamp(1.25rem,9cqi,2.5rem)] font-bold leading-tight text-black">Queensland<br /><span className="whitespace-nowrap">Public Service</span></h1>
          <p className="mt-5 text-base font-semibold text-black">Workforce Overview</p>
          <div className="mt-3 max-w-[520px] space-y-3">
            <div className="rounded-md bg-[#F8EEE8] p-4"><p className="text-base leading-6 text-black">In 2025, the Queensland <span className="whitespace-nowrap">Public Service</span> was comprised of</p><strong className="mt-1 block text-4xl text-black">74,410</strong><p className="mt-1 text-base leading-6 text-black">employees<br />20.9% FTE in Brisbane inner city<br />63.6% FTE in regional locations</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-xs leading-5 text-black">Source: Queensland Government, State of the Sector Report 2025, 2025, pg. 6</p></div>
            <div className="rounded-md bg-[#F8EEE8] p-4"><strong className="block text-4xl text-black">26,448</strong><p className="mt-1 text-base leading-6 text-black">APS employees located in Queensland</p></div>
          </div>
        </div>
        <JurisdictionMap slug={slug} selected="QLD" showLinks={!embedded} />
      </section>
      <Section title="Workforce Overview" subtitle="Workforce size, composition, diversity, structure and legal context.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div><h3 className="text-sm font-bold">Overview</h3><p className="mt-2 text-xs leading-6 text-[#42463B]">The Queensland Public Service (QPS) comprises approximately 74,410.52 FTE. The workforce is geographically dispersed, with close to two thirds employed in regional areas and one-fifth located in Brisbane&apos;s inner city. Women represent most of the workforce, while men comprise just over one-third. A small proportion of employees identify as non-binary or preferred not to disclose their gender. Diversity data shows employees from CALD backgrounds as the largest cohort, followed by LGBTQIA+ and those with disabilities.</p><p className="mt-3 text-xs leading-6 text-[#42463B]">First Nations people make up a smaller (2.7 per cent) share of the workforce. Between 2021 and 2025, QPS saw gradual growth in First Nations peoples representation from 2.5 per cent to 2.7 per cent. During this period the Queensland (QLD) Government increased its First Nations workforce target from 3 per cent to 4 per cent in 2023. While the data indicates progress, a gap remains relative to the stated target, highlighting the continued focus required on First Nations employment. The QLD Government has established explicit employment diversity targets for CALD individuals and people with disabilities, with the target for both cohorts set at 12 per cent of the workforce.</p></div>
          <div><h3 className="text-sm font-bold">Structure and Legal Context</h3><p className="mt-2 text-xs leading-6 text-[#42463B]">The QPS comprises Departments, Statutory Agencies related to a department, and separate Public Service Agencies. The Public Service consists of those employed under the Public Sector Act 2022. There are 22 departments of the Public Service, each led by a Secretary. The Queensland Public Sector comprises over 100 different organisations and involves delivering different services including education, healthcare, social welfare and public security.</p></div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["13%", "Employment growth rate projection to May 2035 for Public Administration and Safety Industry", "Jobs and Skills Australia, Employment Projections - outlook for states and territories, 2025, Table 2"],
            ["6.7%", "Employment increase in public servant workforce from 2024 to 2025", "Queensland Government, State of the Sector Report 2025, pg. 6"],
            ["6.0%", "Gender Pay Gap", "Queensland Government, State of the Sector Report 2025, pg. 66"],
          ].map(([value, label, source]) => label === "Gender Pay Gap" ? <GenderPayGapCard key={value} value={value} source={`Source: ${source}`} /> : <div key={value} className="rounded-md bg-[#F8EEE8] p-4"><strong className="text-3xl text-[#754D32]">{value}</strong><p className="mt-2 min-h-12 text-xs leading-5">{label}</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[9px] leading-4 text-[#694834]">Source: {source}</p></div>)}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <RepresentationChart />
          <ColumnChart title="Diversity in the Queensland Public Sector" data={[{ label: "First Nations", value: 2.7, text: "2.7%" }, { label: "Culturally and linguistically diverse", value: 9, text: "9.0%" }, { label: "People with disability", value: 3.6, text: "3.6%" }, { label: "LGBTQIA+", value: 6.6, text: "6.6%" }]} source="SOURCE Queensland Government, State of the Sector Report 2025, pg. 35" />
        </div>
      </Section>
      <Section title="Workforce Trends" subtitle="Growth, projections, occupational shortages and representation over time">
        <div className="grid gap-6 lg:grid-cols-2">
          <p className="text-xs leading-6 text-[#42463B]">The QPS (excluding the education and health workforce) increased by 6.7 per cent between 2024 and 2025. According to JSA employment projections, the projected growth for the Public Administration and Safety industry in QLD is 13 per cent. However, the QLD Government is facing the challenge of delivering high quality services in a fiscally constrained environment, which will require strong performance and innovation. The Better Public Sector for Queensland Strategy 2024-2028 provides an opportunity to build and grow current and future workforce skills.</p>
          <ProjectionChart />
        </div>
      </Section>
      <section className="rounded-md border border-[#E9E6DF] bg-white p-5 sm:p-6">
        <h2 className="text-xl font-bold">Sources</h2>
        <ol className="mt-5 space-y-3">
          {sources.map(({ number, text }) => (
            <li key={number} className="flex items-start gap-3 text-xs leading-5 text-[#252D02]">
              <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#668B17] text-[10px] font-semibold text-white">{number}</span>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </section>
    </ContentTag>
    {!embedded && <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />}
  </div>;
}
