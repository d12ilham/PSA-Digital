"use client";

import IndustryInsightCard from "./IndustryInsightCard";

import { DocumentGenderGraphic } from "./DocumentGenderGraphic";

import { ChartScroll } from "./FederalStateProfileCharts";
import chartStyles from "./FederalStateProfileCharts.module.css";

import { useEffect, useRef, useState } from "react";
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
  const points = values.map((value, index) => `${xAt(index)},${(yAt(value)) * 1.5}`).join(" ");
  const targetY = yAt(target);
  return (
    <div data-profile-chart data-chart-surface="representation" data-chart-type="line" className={`${chartStyles.card} ${chartStyles.representation} rounded-md    p-4 sm:p-5`}>
      <h3 className="border-t-[5px] border-[#754D32] pt-4 text-sm font-bold text-[#252D02]">{title}</h3>
      <ChartScroll><svg viewBox="0 0 590 307.5" role="img" aria-label={`${title}: ${years.map((year, index) => `${year} ${values[index].toFixed(1)}%`).join(", ")}; target ${target.toFixed(1)}%`} className="mt-5 w-full">
        <line x1="35" y1="240" x2="553" y2="240" stroke="#DDD8D3" />
        <line x1="45" y1={(targetY) * 1.5} x2="543" y2={(targetY) * 1.5} stroke="#754D32" strokeWidth="2.5" strokeDasharray="6 6" />
        <polyline points={points} fill="none" stroke="#E7CDBF" strokeWidth="3" />
        {values.map((value, index) => {
          const x = xAt(index);
          const y = yAt(value);
          return <g key={years[index]}>
            <circle cx={x} cy={(y) * 1.5} r="4" fill="white" stroke="#E7CDBF" strokeWidth="3" />
            <circle cx={x} cy={(targetY) * 1.5} r="4" fill="white" stroke="#754D32" strokeWidth="3" />
            <text x={x} y={(y - 11) * 1.5} textAnchor="middle" fontSize="11" fontWeight="600" fill="#754D32">{value.toFixed(1)}%</text>
            <text x={x} y={(targetY - 8) * 1.5} textAnchor="middle" fontSize="10" fill="#754D32">{target.toFixed(1)}%</text>
            <text x={x} y="277.5" textAnchor="middle" fontSize="11" fill="#5E5E5E">{years[index]}</text>
          </g>;
        })}
      </svg></ChartScroll>
      <div className={chartStyles.legend}><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[#E7CDBF]" />Percentage</span><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[#754D32]" />Target</span></div>
      <p className="mt-4 text-[9px] text-[#694834]">{source}</p>
    </div>
  );
}

const sources = [
  { number: 23, text: "NSW Government, Workforce Profile Report 2025, NSW Government, 2025, accessed on 6 February 2026." },
  { number: 24, text: "NSW Government, Workforce Profile Report 2025, NSW Government, 2025, accessed on 6 February 2026." },
  { number: 25, text: "NSW Government, Workforce Profile Report 2025, NSW Government, 2025, accessed on 6 February 2026." },
  { number: 26, text: "NSW Government, NSW Women’s Strategy 2023–2026, NSW Government, 2022, accessed on 6 February 2026." },
  { number: 27, text: "NSW Government, NSW Public Sector Report 2025, NSW Government, 2025, accessed on 6 February 2026." },
  { number: 28, text: "NSW Government, Workforce Profile Report 2025, NSW Government, 2025, accessed on 6 February 2026." },
  { number: 29, text: "NSW Government, NSW Public Sector Report 2025, NSW Government, 2025, accessed on 6 February 2026." },
  { number: 30, text: "NSW Government, NSW Public Sector Report 2025, NSW Government, 2025, accessed on 6 February 2026." },
  { number: 31, text: "NSW Government, NSW Public Sector Report 2025, NSW Government, 2025, accessed on 6 February 2026." },
  { number: 32, text: "NSW Government, NSW Aboriginal Employment Strategy 2019–2025: Refresh 2022, NSW Government, 2022, accessed 12 February 2026." },
  { number: 33, text: "NSW Government, Workforce Profile Report 2025, NSW Government, 2025, accessed on 6 February 2026." },
  { number: 34, text: "Jobs and Skills Australia (JSA), Employment Projections – Outlook for states territories, JSA, 2025, accessed 6 February 2026." },
  { number: 35, text: "NSW Department of Education, NSW Skills Plan 2024–28: Building Skills and Shaping Success, NSW Government, 2024, accessed 4 February 2026." },
];

export function FederalStateNswProfileContent({ slug, showJurisdictionLinks = true }: { slug: string; showJurisdictionLinks?: boolean }) {
  const genderBlockRef = useRef<HTMLDivElement>(null);
  const [genderVisible, setGenderVisible] = useState(false);

  useEffect(() => {
    const node = genderBlockRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setGenderVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setGenderVisible(true);
      observer.disconnect();
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-5">
        <section data-jurisdiction-profile className="grid gap-6 bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
          <div className="min-w-0 [container-type:inline-size]">
            <p className="inline-block rounded-full bg-[#EED4C4] px-3 py-1.5 text-xs font-semibold text-black">New South Wales · Selected jurisdiction</p>
            <h1 data-profile-title className="mt-4 text-[clamp(1.25rem,9cqi,2.5rem)] font-bold leading-tight text-black">New South Wales<br /><span className="whitespace-nowrap">Public Service</span></h1>
            <p className="mt-5 text-base font-semibold text-black">Workforce Overview</p>
            <div className="mt-3 max-w-[520px] space-y-3">
              <div className="rounded-md bg-[#F8EEE8] p-4">
                <p className="text-base leading-6 text-black">In 2025, the NSW <span className="whitespace-nowrap">Public Service</span> was comprised of</p>
                <strong className="mt-1 block text-4xl text-black">84,780</strong>
                <p className="mt-1 text-base leading-6 text-black">employees<br />55,959 FTE in metro areas<br />27,782 FTE in regional locations</p>
                <p className="mt-4 border-t border-[#DECFC5] pt-3 text-xs leading-5 text-black">Source: NSW Government, Workforce Profile Report, 2025, Table 2.2</p>
              </div>
              <div className="rounded-md bg-[#F8EEE8] p-4"><strong className="block text-4xl text-black">33,646</strong><p className="mt-1 text-base leading-6 text-black">APS employees located in New South Wales</p></div>
            </div>
          </div>
          <JurisdictionMap slug={slug} selected="NSW" showLinks={showJurisdictionLinks} />
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
          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div ref={genderBlockRef} data-profile-chart data-chart-surface="standard" data-chart-type="gender" className={`${chartStyles.card} ${chartStyles.standard} rounded-md    p-4 sm:p-5 ${genderVisible ? "animate-card-entrance motion-reduce:animate-none" : "motion-safe:opacity-0"}`}>
              <h3 className="text-lg font-bold text-[#292522]">NSW Public Sector Employees by Gender</h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(170px,0.62fr)]">
                <div className="min-w-0">
                  <div role="img" aria-label="Female 66.6%, male 33.3%, non-binary 0.1%" className="relative mx-auto w-full max-w-[340px] pb-8">
                    <div className={`mx-auto flex aspect-square w-[78%] max-w-[270px] items-center justify-center rounded-full ${genderVisible ? "animate-card-entrance motion-reduce:animate-none" : ""}`} style={{ background: "conic-gradient(#BBA38F 0 66.6%, #807064 66.6% 99.9%, #DFD3C6 99.9% 100%)", animationDelay: "0.12s" }}>
                      <div className="h-[75%] w-[75%] rounded-full bg-[#F8EEE8]" />
                    </div>
                    <span className={`absolute right-0 top-0 text-2xl font-bold text-[#807064] ${genderVisible ? "animate-card-entrance motion-reduce:animate-none" : ""}`} style={{ animationDelay: "0.22s" }}>66.6%</span>
                    <span className={`absolute bottom-7 left-0 text-2xl font-bold text-[#807064] ${genderVisible ? "animate-card-entrance motion-reduce:animate-none" : ""}`} style={{ animationDelay: "0.3s" }}>33.3%</span>
                    <span className={`absolute bottom-0 right-5 text-2xl font-bold text-[#807064] ${genderVisible ? "animate-card-entrance motion-reduce:animate-none" : ""}`} style={{ animationDelay: "0.38s" }}>0.1%</span>
                  </div>
                  <ul className={`mt-3 space-y-1.5 text-sm text-[#292522] ${genderVisible ? "animate-card-entrance motion-reduce:animate-none" : ""}`} style={{ animationDelay: "0.42s" }}>
                    <li className="flex items-center gap-2"><span className="h-3 w-3 bg-[#BBA38F]" />Female</li>
                    <li className="flex items-center gap-2"><span className="h-3 w-3 bg-[#807064]" />Male</li>
                    <li className="flex items-center gap-2"><span className="h-3 w-3 bg-[#DFD3C6]" />Non-binary</li>
                  </ul>

                </div>
                <div className={`flex min-h-[310px] flex-col bg-[#807064] p-4 text-white ${genderVisible ? "animate-card-entrance motion-reduce:animate-none" : ""}`} style={{ animationDelay: "0.24s" }}>
                  <DocumentGenderGraphic panel />
                  <div className="mt-auto pt-3">
                    <strong className="block text-4xl leading-none">7.3%</strong>
                    <p className="mt-1 text-base font-semibold leading-tight">Gender<br />Pay Gap</p>
                    <p className="mt-2 text-xs leading-5 text-white/90">Source: NSW Government,<br /><span className="underline">Workforce Profile Report</span> 2025, pg. 3</p>
                  </div>
                </div>
              </div>
            <p className={chartStyles.genderSource}>Source: NSW Government, <span className="underline">Workforce Profile Report</span>, 2025, pg. 25</p>
</div>
            <ColumnChart title="Diversity in the NSW Public Sector" data={[{ label: "Employees with a disability", value: 2.8, text: "2.8%", muted: true }, { label: "Employees who speak a language other than English", value: 20.8, text: "20.8%" }, { label: "Women", value: 66.6, text: "66.6%" }, { label: "Aboriginal and Torres Strait Islander employees", value: 4, text: "4.0%" }]} source="SOURCE: NSW Government, Workforce Profile Report, 2025, pg. 19" />
          </div>
        </Section>

        <Section title="Workforce Trends" subtitle="Growth, projections, occupational shortages and representation over time">
          <div data-nsw-trends-columns className="grid gap-5 lg:grid-cols-2">
            <div data-nsw-trends-copy className="min-w-0">
              <p className="text-xs leading-6 text-[#42463B]">The number of employees in the NSWPS increased by 1.2 per cent in 2025. Employment projections from Jobs and Skills Australia suggest a projected growth rate for the Public Administration and Safety Industry in NSW of 11 per cent over 10 years.</p>
              <div data-nsw-occupational-demand className="mt-3">
              <p id="nsw-occupational-demand-description" className="text-xs leading-6 text-[#42463B]">The NSW Skills Plan 2024–28 is the NSW Government strategic plan for skills and reform in VET. The non-government sector has previously provided many of these identified skills to government. The plan identifies six critical areas as a focus including &apos;Digital and cyber&apos; and &apos;Care and support economy&apos;, of which the following occupations are in demand (relevant to Public Administration and Safety):</p>
              <ul data-nsw-occupation-boxes aria-label="NSW occupations in demand" aria-describedby="nsw-occupational-demand-description" className="mt-3 grid list-none grid-cols-1 gap-3 min-[380px]:grid-cols-2 xl:grid-cols-3">
                {occupations.map((occupation) => <li key={occupation} className="flex min-h-20 min-w-0 items-center justify-center rounded-md bg-[#F8EEE8] p-3 text-center text-sm font-semibold leading-5 text-[#754D32] [overflow-wrap:anywhere]">{occupation}</li>)}
              </ul>
              </div>
              <IndustryInsightCard className="mt-5" attribution="Workforce Trends · NSW Public Service"><p>Building in-house capability, rather than relying on non-government sector resources, is becoming increasingly important due to increased community expectations on the NSW Public Service.</p></IndustryInsightCard>
              <div className="mt-6 space-y-4"><div className="rounded-md bg-[#F8EEE8] p-4"><strong className="text-3xl text-[#754D32]">11%</strong><p className="mt-1 text-xs">Employment growth rate projection to May 2035 for Public Administration and Safety Industry</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[9px] text-[#694834]">Source: Jobs and Skills Australia, Employment projections - Outlook for states and territories, Table 2</p></div><div className="rounded-md bg-[#F8EEE8] p-4"><strong className="text-3xl text-[#754D32]">1,410</strong><p className="mt-1 text-xs">Additional public servants in the workforce in 2025</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[9px] text-[#694834]">Source: NSW Government, Workforce Profile Report, 2025, Table 2.2</p></div></div>
            </div>
            <div className="min-w-0">
              <div><RepresentationChart title="Aboriginal and Torres Strait Islander Representation in the NSW Public Sector (2019–2025)" years={[2019, 2020, 2021, 2022, 2023, 2024, 2025]} values={[3.5, 3.5, 3.7, 3.8, 3.9, 3.9, 4.0]} target={3} min={3} max={4} source="SOURCE: NSW Government, Workforce Profile Report, 2025, Figure 5.3" /></div>
            </div>
          </div>
        </Section>

        <section className="rounded-md border border-[#E9E6DF] bg-white p-5 sm:p-6">
          <h2 className="text-xl font-bold">Sources</h2>
          <div className="mt-5 grid gap-x-8 gap-y-3 md:grid-cols-2">
            {[sources.slice(0, 7), sources.slice(7)].map((column, index) => (
              <ol key={index} className="space-y-3">
                {column.map(({ number, text }) => (
                  <li key={number} className="flex items-start gap-3 text-xs leading-5 text-[#252D02]">
                    <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#668B17] text-[10px] font-semibold text-white">{number}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ol>
            ))}
          </div>
        </section>
    </div>
  );
}

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
        <FederalStateNswProfileContent slug={slug} />
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
    </div>
  );
}
