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

const occupations = [
  "ICT Customer Support Officers",
  "Welfare Support Workers",
  "ICT Support Technicians",
  "Cyber Security Analysts",
  "Hardware Technicians",
  "Developer Programmers",
];

export function RepresentationChart({ title, years, values, target, source, min, max }: { title: string; years: number[]; values: number[]; target: number; source: string; min: number; max: number }) {
  const xAt = (index: number) => 45 + index * (498 / (years.length - 1));
  const yAt = (value: number) => 151 - ((value - min) / (max - min)) * 90;
  const points = values.map((value, index) => `${xAt(index)},${yAt(value)}`).join(" ");
  const targetY = yAt(target);
  return (
    <div className="rounded-md border border-[#E8E3DF] bg-white p-4">
      <h3 className="border-t-[5px] border-[#754D32] pt-4 text-sm font-bold text-[#252D02]">{title}</h3>
      <svg viewBox="0 0 590 205" role="img" aria-label={`${title}: ${years.map((year, index) => `${year} ${values[index].toFixed(1)}%`).join(", ")}; target ${target.toFixed(1)}%`} className="mt-5 w-full">
        <line x1="35" y1="160" x2="553" y2="160" stroke="#DDD8D3" />
        <line x1="45" y1={targetY} x2="543" y2={targetY} stroke="#754D32" strokeWidth="1.5" strokeDasharray="6 6" />
        <polyline points={points} fill="none" stroke="#E7CDBF" strokeWidth="2" />
        {values.map((value, index) => {
          const x = xAt(index);
          const y = yAt(value);
          return <g key={years[index]}>
            <circle cx={x} cy={y} r="4" fill="white" stroke="#E7CDBF" strokeWidth="2" />
            <circle cx={x} cy={targetY} r="4" fill="white" stroke="#754D32" strokeWidth="2" />
            <text x={x} y={y - 11} textAnchor="middle" fontSize="11" fontWeight="600" fill="#754D32">{value.toFixed(1)}%</text>
            <text x={x} y={targetY - 8} textAnchor="middle" fontSize="10" fill="#754D32">{target.toFixed(1)}%</text>
            <text x={x} y="185" textAnchor="middle" fontSize="11" fill="#5E5E5E">{years[index]}</text>
          </g>;
        })}
      </svg>
      <div className="mt-1 flex gap-5 text-[10px] text-[#5E5E5E]"><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[#E7CDBF]" />Percentage</span><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[#754D32]" />Target</span></div>
      <p className="mt-4 text-[9px] text-[#694834]">{source}</p>
    </div>
  );
}

const sources = [
  "NSW Government, Workforce Profile Report 2025, 2025.",
  "NSW Government, NSW Women’s Strategy 2023–2026, 2023.",
  "NSW Government, NSW Public Sector Report 2025, 2025.",
  "NSW Government, NSW Aboriginal Employment Strategy 2019–2025: Refresh 2022, 2022.",
  "Jobs and Skills Australia, Employment projections - Outlook for states and territories, 2025.",
  "NSW Government, NSW Skills Plan 2024–28, 2024.",
];

export default function FederalStateNswProfileView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="industry_profile" />
      <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="industry_profile_nsw"
          prev={{ label: "ACT Workforce Overview", href: `/reports/${slug}/industry_profile_act` }}
          next={{ label: "NT Workforce Overview", href: `/reports/${slug}/industry_profile_nt` }}
          prevPrefix=""
        />

        <section className="grid gap-6 bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
          <div>
            <p className="inline-block rounded-full bg-[#754D32] px-3 py-1 text-[10px] font-semibold text-white">New South Wales · Selected jurisdiction</p>
            <h1 className="mt-4 text-[30px] font-bold leading-tight text-[#252D02] sm:text-[38px]">New South Wales Public<br />Service</h1>
            <p className="mt-5 text-xs font-medium text-[#668B17]">Workforce Overview</p>
            <div className="mt-3 max-w-[520px] space-y-3">
              <div className="rounded-md bg-[#F8EEE8] p-4">
                <p className="text-xs text-[#382219]">In 2025, the NSW Public Service was comprised of</p>
                <strong className="mt-1 block text-3xl text-[#754D32]">84,780</strong>
                <p className="mt-1 text-xs leading-5 text-[#382219]">employees<br />55,959 FTE in metro areas<br />27,782 FTE in regional locations</p>
                <p className="mt-4 border-t border-[#DECFC5] pt-3 text-[10px] text-[#694834]">Source: NSW Government, Workforce Profile Report, 2025, Table 2.2</p>
              </div>
              <div className="rounded-md bg-[#F8EEE8] p-4"><strong className="block text-3xl text-[#754D32]">33,646</strong><p className="mt-1 text-xs text-[#382219]">APS employees located in New South Wales</p></div>
            </div>
          </div>
          <JurisdictionMap slug={slug} selected="NSW" />
        </section>

        <Section title="Workforce Overview" subtitle="Workforce size, composition, diversity, structure and legal context.">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold">Overview</h3>
              <p className="mt-2 text-xs leading-6 text-[#42463B]">The New South Wales Public Service (NSWPS) employed approximately 84,780 full-time equivalent (FTE) employees in 2025. The majority were engaged on an ongoing basis, with smaller numbers of staff employed on temporary or casual arrangements. The workforce is geographically distributed, with more than 27,782 employees in regional areas, emphasising the NSWPS as a major employer in regional areas.</p>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">The NSW Women&apos;s Strategy 2023–2026 identifies improving gender equality outcomes, including reducing the gender pay gap. In 2025, women comprised 66.6 per cent of the NSWPS workforce, while men accounted for 33.3 per cent of employees. A small proportion of employees identified as non-binary. Despite women representing a majority, the gender pay gap in the NSWPS stood at 7.3 per cent in 2025, an increase from 7.2 per cent in 2024. Addressing this pay gap remains an ongoing priority for the NSWPS.</p>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">Diversity information indicates that employees who speak a language other than English comprise over one fifth of the NSWPS workforce. Employees with disability comprise 2.8 per cent.</p>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">First Nations people comprise four per cent of the NSWPS workforce, above the New South Wales Government&apos;s three per cent employment target by 2025 in non-executive salary levels, as set out in the NSW Public Sector Aboriginal Employment Strategy.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold">Structure and Legal Context</h3>
              <p className="mt-2 text-xs leading-6 text-[#42463B]">The New South Wales Public Service (NSWPS) encompasses Departments, Executive Agencies related to a department, and Separate Public Service Agencies. The NSWPS consists of those employed under Part 4 of the Government Sector Employment Act (2013) (GSE Act). There are 11 departments of the Public Service, each led by a Secretary.</p>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">The Government Sector comprises the Public Services, Teaching Service, the NSW Police Force, the NSW Health Service, the Transport Service of New South Wales and any other service of the Crown. It also includes bodies constituted by an Act or prescribed by regulations, such as a State owned corporation. The NSWPS incorporates the government sector and other government agencies (e.g. the Independent Commission Against Corruption). These areas of government are defined by the GSE Act (2013).</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-md bg-[#F8EEE8] p-4">
              <h3 className="text-sm font-bold">NSW Public Sector Employees by Gender</h3>
              <div className="mt-4 grid items-center gap-4 sm:grid-cols-[125px_1fr_130px]">
                <div role="img" aria-label="Female 66.6%, male 33.3%, non-binary 0.1%" className="mx-auto h-28 w-28 rounded-full" style={{ background: "conic-gradient(#754D32 0 66.6%, #B6A79B 66.6% 99.9%, #E8DED6 99.9% 100%)" }}><div className="relative left-6 top-6 h-16 w-16 rounded-full bg-[#F8EEE8]" /></div>
                <dl className="space-y-2 text-xs"><div className="flex justify-between gap-3"><dt>Female</dt><dd className="font-semibold">66.6%</dd></div><div className="flex justify-between gap-3"><dt>Male</dt><dd className="font-semibold">33.3%</dd></div><div className="flex justify-between gap-3"><dt>Non-Binary</dt><dd className="font-semibold">0.1%</dd></div></dl>
                <div className="rounded-md bg-white p-3"><strong className="text-lg text-[#754D32]">7.3%</strong><p className="text-[10px]">Gender Pay Gap</p><p className="mt-3 text-[9px] text-[#694834]">Source: NSW Government, Workforce Profile Report 2025, pg. 3</p></div>
              </div>
              <p className="mt-3 text-[9px] leading-4 text-[#694834]">Source: NSW Government, Workforce Profile Report, 2025, pg. 25</p>
            </div>
            <ColumnChart title="Diversity in the NSW Public Sector" data={[{ label: "Employees with a disability", value: 2.8, text: "2.8%", muted: true }, { label: "Employees who speak a language other than English", value: 20.8, text: "20.8%" }, { label: "Women", value: 66.6, text: "66.6%" }, { label: "Aboriginal and Torres Strait Islander employees", value: 4, text: "4.0%" }]} source="SOURCE: NSW Government, Workforce Profile Report, 2025, pg. 19" />
          </div>
        </Section>

        <Section title="Workforce Trends" subtitle="Growth, projections, occupational shortages and representation over time">
          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <p className="text-xs leading-6 text-[#42463B]">The number of employees in the NSWPS increased by 1.2 per cent in 2025. Employment projections from Jobs and Skills Australia suggest a projected growth rate for the Public Administration and Safety Industry in NSW of 11 per cent over 10 years.</p>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">The NSW Skills Plan 2024–28 is the NSW Government strategic plan for skills and reform in VET. The non-government sector has previously provided many of these identified skills to government. The plan identifies six critical areas as a focus including &apos;Digital and cyber&apos; and &apos;Care and support economy&apos;, of which the following occupations are in demand (relevant to Public Administration and Safety):</p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">{occupations.map((occupation) => <span key={occupation} className="rounded-md bg-[#F8EEE8] px-3 py-1.5 text-[10px] font-medium text-[#754D32]">{occupation}</span>)}</div>
              <div className="mt-4 rounded-md bg-[#F8EEE8] p-4"><span className="inline-block rounded-full bg-[#754D32] px-4 py-1.5 text-xs text-white">Industry Insight</span><p className="mt-3 text-xs leading-6 text-[#42463B]">Building in-house capability, rather than relying on non-government sector resources, is becoming increasingly important due to increased community expectations on the NSW Public Service.</p></div>
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="space-y-4"><div className="rounded-md bg-[#F8EEE8] p-4"><strong className="text-3xl text-[#754D32]">11%</strong><p className="mt-1 text-xs">Employment growth rate projection to May 2035 for Public Administration and Safety Industry</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[9px] text-[#694834]">Source: Jobs and Skills Australia, Employment projections - Outlook for states and territories, Table 2</p></div><div className="rounded-md bg-[#F8EEE8] p-4"><strong className="text-3xl text-[#754D32]">1,410</strong><p className="mt-1 text-xs">Additional public servants in the workforce in 2025</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[9px] text-[#694834]">Source: NSW Government, Workforce Profile Report, 2025, Table 2.2</p></div></div>
            <RepresentationChart title="Aboriginal and Torres Strait Islander Representation in the NSW Public Sector (2019–2025)" years={[2019, 2020, 2021, 2022, 2023, 2024, 2025]} values={[3.5, 3.5, 3.7, 3.8, 3.9, 3.9, 4.0]} target={3} min={3} max={4} source="SOURCE: NSW Government, Workforce Profile Report, 2025, Figure 5.3" />
          </div>
        </Section>

        <section className="bg-white p-5 sm:p-6"><h2 className="text-base font-bold">Sources</h2><ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">{sources.map((source, index) => <li key={source} className="flex gap-2 text-[11px] leading-5 text-[#42463B]"><span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#668B17] text-[10px] text-white">{index + 23}</span>{source}</li>)}</ul></section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
    </div>
  );
}
