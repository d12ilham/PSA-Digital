"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import mapDataRaw from "@/data/australia_map_data.json";

interface Report {
  id: string;
  title: string;
  slug: string;
  status: string;
  contactUrl?: string;
  pdfFileUrl?: string;
  year?: { label: string };
}

const mapData = mapDataRaw as {
  states: Record<string, { code: string; d: string }>;
};

const mapLabels: Record<string, { x: number; y: number; employees: string }> = {
  WA: { x: 215, y: 312, employees: "9,839" },
  NT: { x: 404, y: 205, employees: "2,255" },
  QLD: { x: 572, y: 258, employees: "26,448" },
  SA: { x: 427, y: 385, employees: "14,111" },
  NSW: { x: 602, y: 435, employees: "33,646" },
  VIC: { x: 575, y: 498, employees: "35,679" },
  TAS: { x: 569, y: 581, employees: "4,734" },
};

const jurisdictions = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

export function JurisdictionMap({ slug, selected }: { slug: string; selected: "ACT" | "NSW" | "NT" | "QLD" | "SA" | "TAS" | "VIC" | "WA" }) {
  return (
    <div>
      <svg viewBox="55 20 740 605" role="img" aria-label="Australian public service employees by jurisdiction" className="mx-auto block h-auto w-full max-w-[640px]">
        {Object.values(mapData.states).map((state) => (
          <path key={state.code} d={state.d} fill={state.code === selected ? "#754D32" : "#F0D9CF"} stroke="#FAFAF0" strokeWidth="2" />
        ))}
        {Object.entries(mapLabels).map(([code, { x, y, employees }]) => (
          <g key={code}>
            <circle cx={x} cy={y - 7} r="16" fill={code === selected ? "#F0D9CF" : "#754D32"} />
            <text x={x} y={y - 3} textAnchor="middle" fontSize="10" fontWeight="700" fill={code === selected ? "#754D32" : "white"}>{code}</text>
            <text x={code === "TAS" ? x - 34 : x} y={y + 15} textAnchor={code === "TAS" ? "end" : "middle"} fontSize="8.5" fill={code === "TAS" ? "#694834" : code === selected ? "white" : "#694834"}>Employees {employees}</text>
          </g>
        ))}
        <path d="M662 454h57" stroke="#754D32" strokeWidth="1.5" />
        <circle cx="662" cy="454" r="4" fill="#754D32" />
        <circle cx="744" cy="454" r="17" fill="#754D32" />
        <text x="744" y="458" textAnchor="middle" fontSize="10" fontWeight="700" fill="white">ACT</text>
        <text x="744" y="478" textAnchor="middle" fontSize="8.5" fill="#694834">Employees 70,221</text>
      </svg>
      <p className="mt-2 text-[10px] font-semibold uppercase text-[#668B17]">Choose a state or territory</p>
      <nav aria-label="Choose a state or territory" className="mt-2 flex flex-wrap gap-2">
        {jurisdictions.map((code) => (
          <Link
            key={code}
            href={code === "ACT" ? `/reports/${slug}/industry_profile_act` : code === "NSW" ? `/reports/${slug}/industry_profile_nsw` : code === "NT" ? `/reports/${slug}/industry_profile_nt` : code === "QLD" ? `/reports/${slug}/industry_profile_qld` : code === "SA" ? `/reports/${slug}/industry_profile_sa` : code === "TAS" ? `/reports/${slug}/industry_profile_tas` : code === "VIC" ? `/reports/${slug}/industry_profile_vic` : `/reports/${slug}/industry_profile_wa`}
            aria-current={code === selected ? "page" : undefined}
            className={`min-w-10 rounded-full border px-3 py-1.5 text-center text-[10px] font-semibold transition-colors hover:border-[#8AC900] ${code === selected ? "border-[#8AC900] bg-[#8AC900] text-[#252D02]" : "border-[#E7E3DC] bg-white text-[#252D02]"}`}
          >
            {code}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const id = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <section className="overflow-hidden rounded-md border border-[#866950] bg-[#F0ECE1]">
      <div className="flex items-center justify-between gap-4 border-t-[5px] border-[#754D32] px-4 py-3 sm:px-5">
        <div>
          <h2 className="text-base font-bold text-[#252D02]">{title}</h2>
          <p className="mt-1 text-xs text-[#5B6152]">{subtitle}</p>
        </div>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} className="flex shrink-0 items-center gap-1 rounded-full bg-[#8AC900] px-4 py-1.5 text-xs font-semibold text-[#252D02] transition-colors hover:bg-[#79B700]">
          {open ? "Close" : "Open"} {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>
      {open && <div id={id} className="mx-3 mb-3 rounded-md bg-white p-4 sm:mx-5 sm:mb-5 sm:p-5">{children}</div>}
    </section>
  );
}

export function ColumnChart({ title, data, source }: { title: string; data: { label: string; value: number; text: string; muted?: boolean }[]; source: string }) {
  const max = Math.max(...data.map((item) => item.value));
  return (
    <div className="rounded-md bg-[#F8EEE8] p-4">
      <h3 className="text-sm font-bold text-[#252D02]">{title}</h3>
      <div className="mt-4 grid h-40 items-end gap-2 border-b border-[#C8B9AF]" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
        {data.map((item) => (
          <div key={item.label} className="flex h-full min-w-0 flex-col items-center justify-end">
            <span className="mb-1 text-[10px] font-semibold text-[#694834]">{item.text}</span>
            <div className={`w-full max-w-12 rounded-t-sm ${item.muted ? "bg-[#B7A89D]" : "bg-[#754D32]"}`} style={{ height: `${Math.max(6, item.value / max * 80)}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
        {data.map((item) => <span key={item.label} className="text-center text-[9px] leading-3 text-[#382219]">{item.label}</span>)}
      </div>
      <p className="mt-4 text-[9px] leading-4 text-[#694834]">{source}</p>
    </div>
  );
}

function RepresentationChart() {
  return (
    <div className="overflow-hidden rounded-md border border-[#ECE9E5] bg-white">
      <div className="h-2.5 bg-[#E9CFC2]" />
      <div className="p-4 sm:p-5">
        <h3 className="min-h-10 text-sm font-bold text-[#252D02]">Aboriginal and Torres Strait Islander Representation in the ACT Public Service (2023–2025)</h3>
        <svg viewBox="0 0 600 215" className="mt-3 block h-auto w-full" role="img" aria-label="Representation was 2.1 percent in 2023, 2.1 percent in 2024, and 2.0 percent in 2025, against a 3.0 percent target each year">
          <line x1="18" y1="35" x2="582" y2="35" stroke="#E9CFC2" strokeWidth="2" />
          <polyline points="18,125 300,142 582,182" fill="none" stroke="#754D32" strokeWidth="2" strokeDasharray="6 6" />
          {[18, 300, 582].map((x) => <circle key={`target-${x}`} cx={x} cy="35" r="5" fill="#E9CFC2" />)}
          {[[18, 125], [300, 142], [582, 182]].map(([x, y]) => <circle key={`actual-${x}`} cx={x} cy={y} r="5" fill="#754D32" />)}
          {[18, 300, 582].map((x) => <text key={`target-label-${x}`} x={x} y="71" textAnchor={x === 18 ? "start" : x === 582 ? "end" : "middle"} fontSize="14" fontWeight="600" fill="#754D32">3.0%</text>)}
          <text x="18" y="162" fontSize="14" fontWeight="600" fill="#754D32">2.1%</text>
          <text x="300" y="178" textAnchor="middle" fontSize="14" fontWeight="600" fill="#754D32">2.1%</text>
          <text x="582" y="158" textAnchor="end" fontSize="14" fontWeight="600" fill="#754D32">2.0%</text>
        </svg>
        <div className="mt-4 flex flex-wrap gap-5 text-xs text-[#694834]"><span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-[#754D32]" />Percentage</span><span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-[#E9CFC2]" />Target</span></div>
        <p className="mt-5 text-[10px] leading-4 text-[#694834]">SOURCE: ACT Government, State of the Service Reports: 2022–23, 2023–24, 2024–25, Table A.1</p>
      </div>
    </div>
  );
}

const payGapCohorts = [
  { label: <>Women<br />(General)</>, value: -3.0 },
  { label: <>First Nations</>, value: -2.6 },
  { label: <>People with<br />disability</>, value: -2.0 },
  { label: <>CALD<br />background</>, value: 2.5 },
  { label: <>LGBTQIA+</>, value: 5.7 },
];

function PayGapChart() {
  return (
    <div className="overflow-hidden rounded-md border border-[#ECE9E5] bg-white">
      <div className="h-2.5 bg-[#754D32]" />
      <div className="p-4 sm:p-5">
        <h3 className="min-h-10 text-sm font-bold text-[#252D02]">ACT Public Service Pay Gap by Cohort</h3>
        <div role="img" aria-label="Pay gap: women general minus 3.0 percent, First Nations minus 2.6 percent, people with disability minus 2.0 percent, CALD background 2.5 percent, LGBTQIA plus 5.7 percent" className="relative mt-3 grid h-44 grid-cols-5 gap-2 border-b border-transparent">
          <div className="pointer-events-none absolute inset-x-0 top-[59%] border-t border-[#ADA9A5]" />
          {payGapCohorts.map(({ label, value }, index) => {
            const negative = value < 0;
            const height = `${Math.abs(value) / 5.7 * 47}%`;
            return (
              <div key={index} className="relative min-w-0">
                <span className={`absolute inset-x-0 z-10 text-center text-[10px] font-semibold text-[#405D0A] ${negative ? "top-[48%]" : ""}`} style={negative ? undefined : { bottom: `calc(41% + ${height} + 4px)` }}>{value.toFixed(1)}%</span>
                <div className={`absolute inset-x-[15%] bg-[#754D32] ${negative ? "top-[59%] rounded-b-md" : "bottom-[41%] rounded-t-md"}`} style={{ height }} />
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-5 gap-2 text-center text-[10px] leading-3 text-[#382219]">{payGapCohorts.map(({ label }, index) => <span key={index}>{label}</span>)}</div>
        <p className="mt-5 text-[10px] leading-4 text-[#694834]">SOURCE: ACT Government, State of the Service Reports: 2022–23, 2023–24, 2024–25, Table A.1</p>
      </div>
    </div>
  );
}

const sources = [
  { number: 12, text: "ACT Government, State of the Service Report 2024–25, ACT Government, 2025, accessed 6 February 2026." },
  { number: 13, text: "ACT Government, State of the Service Report 2024–25, ACT Government, 2025, accessed 6 February 2026." },
  { number: 14, text: "ACT Government, State of the Service Report 2024–25, ACT Government, 2025, accessed 6 February 2026." },
  { number: 15, text: "ACT Government, State of the Service Report 2024–25, ACT Government, 2025, accessed 6 February 2026." },
  { number: 16, text: "ACT Government, State of the Service Report 2024–25, ACT Government, 2025, accessed 6 February 2026." },
  { number: 17, text: "ACT Government, State of the Service Report 2019–20, 2020; State of the Service Report 2020–21, 2021; State of the Service Report 2021–22, 2022; State of the Service Report 2022–23, 2023; State of the Service Report 2023–24, 2024; State of the Service Report 2024–25, ACT Government, 2025, accessed 6 February 2026." },
  { number: 18, text: "ACT Government, State of the Service Report 2023–24, 2024; State of the Service Report 2024–25, ACT Government, 2025, accessed 6 February 2026." },
  { number: 19, text: "Please note, Public Safety and Government is the preferred terminology that more fully captures the industry-sectors within Public Skills Australia’s remit. Reference to the Public Administration and Safety industry is based on the ANZSIC classification system. When citing a data source (such as JSA Employment Projects), the terminology of the data source will be used to maintain accurate data representation." },
  { number: 20, text: "Jobs and Skills Australia (JSA), Employment Projections – Outlook for states and territories, JSA, 2025, accessed 4 February 2026." },
  { number: 21, text: "ACT Government, State of the Service Report 2024–25, ACT Government, 2025, accessed 2 February 2026." },
  { number: 22, text: "ACT Government, Skills Needs List, ACT Government, 2025, accessed 6 February 2026." },
];

export default function FederalStateActProfileView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="industry_profile" />
      <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="industry_profile_act"
          prev={{ label: "Industry Profile", href: `/reports/${slug}/industry_profile` }}
          next={{ label: "NSW Workforce Overview", href: `/reports/${slug}/industry_profile_nsw` }}
          prevPrefix=""
        />

        <section className="grid gap-6 bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
          <div>
            <p className="inline-block rounded-full bg-[#754D32] px-3 py-1 text-[10px] font-semibold text-white">Australian Capital Territory · Selected jurisdiction</p>
            <h1 className="mt-4 text-[30px] font-bold leading-tight text-[#252D02] sm:text-[38px]">Australian Capital Territory<br />Public Service</h1>
            <p className="mt-5 text-xs font-medium text-[#668B17]">Workforce Overview</p>
            <div className="mt-3 max-w-[520px] space-y-3">
              <div className="rounded-md bg-[#F8EEE8] p-4">
                <p className="text-xs text-[#382219]">In 2025, the ACT Public Service was comprised of</p>
                <strong className="mt-1 block text-3xl text-[#754D32]">31,825</strong>
                <p className="mt-1 text-xs leading-5 text-[#382219]">employees (28,181 FTE) - ACT Public Servants represent 11.6% of the ACT workforce</p>
                <p className="mt-4 border-t border-[#DECFC5] pt-3 text-[10px] text-[#694834]">Source: ACT Government, State of the Service Report 2024–25, 2025, pg. 6</p>
              </div>
              <div className="rounded-md bg-[#F8EEE8] p-4">
                <strong className="block text-3xl text-[#754D32]">70,221</strong>
                <p className="mt-1 text-xs text-[#382219]">APS employees located in Australian Capital Territory</p>
              </div>
            </div>
          </div>
          <JurisdictionMap slug={slug} selected="ACT" />
        </section>

        <Section title="Workforce Overview" subtitle="Workforce size, composition, diversity, structure and legal context.">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold">Overview</h3>
              <p className="mt-2 text-xs leading-6 text-[#42463B]">The Australian Capital Territory Public Service (ACTPS) comprises approximately 31,825 employees.<sup>12</sup> ACTPS makes up approximately 11.6 per cent of the whole ACT workforce,<sup>13</sup> emphasising its position as a major employer in the territory. The workforce is predominantly female, with women accounting for close to two-thirds of employees. A small proportion of employees identify as non-binary.<sup>14</sup></p>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">The ACTPS workforce is diverse with employees from culturally and linguistically diverse (CALD) backgrounds accounting for over 25 per cent of the workforce. 2.8 per cent of the workforce identify as LGBTQIA+ and 3 per cent of employees report living with a disability.<sup>15</sup></p>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">In the ACTPS, First Nations employees account for approximately 2 per cent of the workforce, below the ACT Government&apos;s 3 per cent employment target by 2026.<sup>16</sup> Since 2020, the level of ACT public service employees who identify as First Nations has been consistent at around 2 per cent.<sup>17</sup></p>
            </div>
            <div>
              <h3 className="text-sm font-bold">Structure and Legal Context</h3>
              <p className="mt-2 text-xs leading-6 text-[#42463B]">The Australian Capital Territory Public Sector comprises the ACT Public Service (ACTPS), statutory bodies and agencies.</p>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">The ACTPS is governed by the Public Sector Management Act 1994 (PSM Act) and the Public Sector Management Standards 2016 and consists of nine directorates including Health, Education and Justice and Community Safety.</p>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">Separate to the ACTPS, there are 21 independent bodies that operate under section 152 of the Public Sector Management Act 1994.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-md bg-[#F8EEE8] p-4">
              <h3 className="text-sm font-bold">ACT Public Service by Gender</h3>
              <div className="mt-4 grid items-center gap-4 sm:grid-cols-[125px_1fr_130px]">
                <div role="img" aria-label="Female 64.8%, male 35%, non-binary 0.2%" className="mx-auto h-28 w-28 rounded-full" style={{ background: "conic-gradient(#754D32 0 64.8%, #B6A79B 64.8% 99.8%, #E8DED6 99.8% 100%)" }}><div className="relative left-6 top-6 h-16 w-16 rounded-full bg-[#F8EEE8]" /></div>
                <dl className="space-y-2 text-xs">
                  <div className="flex justify-between gap-3"><dt className="flex items-center gap-2"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-[#754D32]" />Female</dt><dd className="font-semibold">64.8%</dd></div>
                  <div className="flex justify-between gap-3"><dt className="flex items-center gap-2"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-[#B6A79B]" />Male</dt><dd className="font-semibold">35%</dd></div>
                  <div className="flex justify-between gap-3"><dt className="flex items-center gap-2"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-[#E8DED6]" />Non-Binary</dt><dd className="font-semibold">0.2%</dd></div>
                </dl>
                <div className="rounded-md bg-white p-3"><strong className="text-lg text-[#754D32]">-0.3%</strong><p className="text-[10px]">Gender Pay Gap</p><p className="mt-2 border-t border-[#E6E4E0] pt-2 text-[9px] leading-4 text-[#694834]">Source: ACT Government, State of the Service Report 2024–25, 2025, Table A.8</p></div>
              </div>
              <p className="mt-3 text-[9px] leading-4 text-[#694834]">Source: ACT Government, State of the Service Report 2024–25, 2025, Table A.1</p>
            </div>
            <ColumnChart title="Workforce Participation as Proportion of Total Workforce" data={[{ label: "First Nations participation", value: 2, text: "2.0%", muted: true }, { label: "People with disability", value: 3, text: "3.0%" }, { label: "CALD background", value: 26.6, text: "26.6%" }, { label: "LGBTQIA+", value: 2.8, text: "2.8%" }]} source="SOURCE: ACT Government, State of the Service Report 2024–25, 2025, Table A.1" />
          </div>
        </Section>

        <Section title="Workforce Trends" subtitle="Growth, projections, occupational shortages and representation over time">
          <h3 className="text-sm font-bold">Workforce Trends</h3>
          <p className="mt-2 max-w-4xl text-xs leading-6 text-[#42463B]">Between 2023–24 and 2024–25, the ACTPS grew by 3.5 per cent,<sup>18</sup> which is greater than the projected 10-year employment growth for the Public Administration and Safety industry<sup>19</sup> in the ACT (16 per cent over 10 years).<sup>20</sup> The ACT Government has implemented several initiatives to build capability in the ACTPS and has committed to embedding a culture of continuous learning and innovation in leadership development to build a future ready workforce. This includes targeting entry-level recruitment through the ACTPS Graduate Program, which in 2025 transitioned to a career path model that supports balancing business needs and graduate capability.<sup>21</sup></p>
          <p className="mt-3 max-w-4xl text-xs leading-6 text-[#42463B]">The ACT Skills Needs List identifies more than 150 occupational skills shortages. This list enables targeted workforce strategies by aligning in-need occupations and the VET qualifications that support them. The list includes two occupations split across five qualifications under the PSP Public Sector Training Package, which Public Skills Australia can address.<sup>22</sup></p>
          <div className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4">
              <div className="rounded-md bg-[#F8EEE8] p-4"><strong className="text-3xl text-[#754D32]">16%</strong><p className="mt-1 text-xs">Employment growth rate projection to May 2035 for ACT Public Administration and Safety Industry</p><p className="mt-4 text-[9px] text-[#694834]">Source: Jobs and Skills Australia, Employment Projections - Outlook for states and territories, 2025, Table 2</p></div>
              <div className="rounded-md bg-[#F8EEE8] p-4"><h4 className="text-sm font-semibold text-[#754D32]">ACT Occupational Shortages</h4><ul className="mt-2 list-disc pl-5 text-xs leading-5"><li>Social Professionals (Interpreters, Translators)</li><li>Inspectors and Regulatory Officers</li></ul><p className="mt-4 text-[9px] text-[#694834]">Source: ACT Government, ACT Skills Needs List - Occupation needs employed by Public Administration and Safety Industry, 2025</p></div>
            </div>
            <div>
              <h4 className="text-sm font-bold">As the table below indicates, they relate to skills gaps in Australian Sign Language (Auslan) qualifications and occupations:</h4>
              <div className="mt-3 overflow-x-auto rounded-md border border-[#E6E4E0]"><table className="w-full min-w-[540px] text-left text-xs"><thead className="bg-[#F3F3F2]"><tr><th className="p-3">Qualification Code</th><th className="p-3">Qualification</th><th className="p-3">Occupation</th></tr></thead><tbody className="divide-y divide-[#E6E4E0]">{[
                ["PSP20218", "Certificate II in Auslan", "Welfare Support Workers"],
                ["PSP30218", "Certificate III in Auslan", "Welfare Support Workers"],
                ["PSP40818", "Certificate IV in Auslan", "Welfare Support Workers"],
                ["PSP50922", "Diploma of Interpreting", "Social Professionals"],
                ["PSP50118", "Diploma of Auslan", "Welfare Support Workers"],
              ].map(([code, qualification, occupation]) => <tr key={code}><td className="p-3">{code}</td><td className="p-3">{qualification}</td><td className="p-3">{occupation}</td></tr>)}</tbody></table></div>
            </div>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <RepresentationChart />
            <PayGapChart />
          </div>
        </Section>

        <section className="rounded-md border border-[#E9E6DF] bg-white p-5 sm:p-6">
          <h2 className="text-xl font-bold">Sources</h2>
          <div className="mt-5 grid gap-x-8 gap-y-3 md:grid-cols-2">
            {[sources.slice(0, 6), sources.slice(6)].map((column, index) => (
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
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
    </div>
  );
}
