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

const sources = [
  "ACT Government, State of the Service Report 2024–25, 2025.",
  "Australian Public Service Commission, State of the Service Report 2024–25, 2025.",
  "Jobs and Skills Australia, Employment Projections - Outlook for states and territories, 2025.",
  "ACT Government, ACT Skills Needs List - Occupation needs employed by Public Administration and Safety Industry, 2025.",
  "Public Skills Australia, Public Sector Training Package, 2025.",
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
                <p className="mt-4 border-t border-[#DECFC5] pt-3 text-[10px] text-[#694834]">Source: ACT Government, State of the Service Report 2024–25, 2025, pag. 6</p>
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
              <p className="mt-2 text-xs leading-6 text-[#42463B]">The Australian Capital Territory Public Service (ACTPS) comprises approximately 31,825 employees. ACTPS makes up approximately 11.6 per cent of the whole ACT workforce, emphasising its position as a major employer in the territory. The workforce is predominantly female, with women accounting for close to two-thirds of employees. A small proportion of employees identify as non-binary.</p>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">The ACTPS workforce is diverse with employees from culturally and linguistically diverse (CALD) backgrounds accounting for over 25 per cent of the workforce. 2.8 per cent of the workforce identify as LGBTQIA+ and 3 per cent of employees report living with a disability.</p>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">In the ACTPS, First Nations employees account for approximately 2 per cent of the workforce, below the ACT Government&apos;s 3 per cent employment target by 2026. Since 2020, the level of ACT public service employees who identify as First Nations has been consistent at around 2 per cent.</p>
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
                  <div className="flex justify-between gap-3"><dt>Female</dt><dd className="font-semibold">64.8%</dd></div>
                  <div className="flex justify-between gap-3"><dt>Male</dt><dd className="font-semibold">35%</dd></div>
                  <div className="flex justify-between gap-3"><dt>Non-Binary</dt><dd className="font-semibold">0.2%</dd></div>
                </dl>
                <div className="rounded-md bg-white p-3"><strong className="text-lg text-[#754D32]">-0.3%</strong><p className="text-[10px]">Gender Pay Gap</p></div>
              </div>
              <p className="mt-3 text-[9px] leading-4 text-[#694834]">Source: ACT Government, State of the Service Report 2024–25, 2025, Table A.1 and A.8.</p>
            </div>
            <ColumnChart title="Workforce Participation as Proportion of Total Workforce" data={[{ label: "First Nations participation", value: 2, text: "2.0%", muted: true }, { label: "People with disability", value: 3, text: "3.0%" }, { label: "CALD background", value: 26.6, text: "26.6%" }, { label: "LGBTQIA+", value: 2.8, text: "2.8%" }]} source="SOURCE: ACT Government, State of the Service Report 2024–25, 2025, Table A.1" />
          </div>
        </Section>

        <Section title="Workforce Trends" subtitle="Growth, projections, occupational shortages and representation over time">
          <h3 className="text-sm font-bold">Workforce Trends</h3>
          <p className="mt-2 max-w-4xl text-xs leading-6 text-[#42463B]">Between 2023–24 and 2024–25, the ACTPS grew by 3.5 per cent, which is greater than the projected 10-year employment growth for the Public Administration and Safety industry in the ACT (16 per cent over 10 years). The ACT Government has implemented several initiatives to build capability in the ACTPS and has committed to embedding a culture of continuous learning and innovation in leadership development to build a future ready workforce. This includes targeting entry-level recruitment through the ACTPS Graduate Program, which in 2025 transitioned to a career path model that supports balancing business needs and graduate capability.</p>
          <p className="mt-3 max-w-4xl text-xs leading-6 text-[#42463B]">The ACT Skills Needs List identifies more than 150 occupational skills shortages. This list enables targeted workforce strategies by aligning in-need occupations and the VET qualifications that support them. The list includes two occupations split across five qualifications under the PSP Public Sector Training Package, which Public Skills Australia can address.</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4">
              <div className="rounded-md bg-[#F8EEE8] p-4"><strong className="text-3xl text-[#754D32]">16%</strong><p className="mt-1 text-xs">Employment growth rate projection to May 2035 for ACT Public Administration and Safety Industry</p><p className="mt-4 text-[9px] text-[#694834]">Source: Jobs and Skills Australia, Employment Projections - Outlook for states and territories, 2025, Table 2</p></div>
              <div className="rounded-md bg-[#F8EEE8] p-4"><h4 className="text-sm font-semibold text-[#754D32]">ACT Occupational Shortages</h4><ul className="mt-2 list-disc pl-5 text-xs leading-5"><li>Social Professionals (Interpreters, Translators)</li><li>Inspectors and Regulatory Officers</li></ul><p className="mt-4 text-[9px] text-[#694834]">Source: ACT Government, ACT Skills Needs List - Occupation needs employed by Public Administration and Safety Industry, 2025</p></div>
            </div>
            <div>
              <h4 className="text-sm font-bold">Skills gaps in Australian Sign Language (Auslan) qualifications and occupations</h4>
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
            <ColumnChart title="Aboriginal and Torres Strait Islander Representation in the ACT Public Service (2023–2025)" data={[{ label: "2023", value: 2, text: "2.0%", muted: true }, { label: "2024", value: 2.1, text: "2.1%", muted: true }, { label: "2025", value: 2, text: "2.0%" }]} source="Source: ACT Government, State of the Service Report 2024–25, 2025." />
            <ColumnChart title="ACT Public Service Pay Gap by Cohort" data={[{ label: "First Nations", value: 0.3, text: "-0.3%", muted: true }, { label: "Disability", value: 2.5, text: "2.5%" }, { label: "CALD", value: 5.7, text: "5.7%" }]} source="Source: ACT Government, State of the Service Report 2024–25, 2025, Table A.8." />
          </div>
        </Section>

        <section className="bg-white p-5 sm:p-6"><h2 className="text-base font-bold">Sources</h2><ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">{sources.map((source) => <li key={source} className="flex gap-2 text-[11px] leading-5 text-[#42463B]"><span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#8AC900]" />{source}</li>)}</ul></section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
    </div>
  );
}
