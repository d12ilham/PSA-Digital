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
  "Policy and Planning Managers - 12.4%",
  "Intelligence and Policy Analysts - 14.6%",
  "Contract, Program and Project Administrators - 8.6%",
  "General Clerks - 11.2%",
  "Other Information and Organisation Professionals - 10.5%",
];

const sources = [
  "Tasmanian Government, State of the Service Workforce Report no. 2 of 2025, 2025, accessed 18 February 2026.",
  "Tasmanian Government, State of the Service Workforce Report no. 2 of 2025, 2025, accessed 18 February 2026.",
  "Tasmanian Government, 2024 TSS Employee Survey - whole of service results, 2024, accessed 18 February 2026.",
  "Tasmanian Government, 2024 TSS Employee Survey - whole of service results, 2024, accessed 18 February 2026.",
  "Tasmanian Government, Tasmania State Service Aboriginal Employment Strategy to 2022, 2019, accessed 9 February 2026.",
  "Department of State Growth, Tasmanian Skills Plan, 2024; Jobs and Skills Australia, Employment Projections - Outlook for states and territories, 2025.",
  "Department of State Growth, Regional Employment Projections Dashboard 2024-27, accessed 4 February 2026.",
  "Pulse Tasmania, Tasmania targets $150 million in public service cuts as new unit hunts for efficiencies, 2025.",
  "Department of Premier and Cabinet, Tasmanian State Service Annual Report 2024-25, October 2025, p.13.",
];

function GenderChart() {
  return <div className="rounded-md bg-[#F8EEE8] p-4 sm:p-6">
    <h3 className="text-sm font-bold">Tasmanian State Service Employees - Gender</h3>
    <div className="mt-6 grid items-center gap-6 sm:grid-cols-[150px_1fr]">
      <div role="img" aria-label="Female 71.6%, male 28.1%, non-binary 0.3%" className="mx-auto flex h-36 w-36 items-center justify-center rounded-full" style={{ background: "conic-gradient(#754D32 0 71.6%, #B6A294 71.6% 99.7%, #D8CBC1 99.7% 100%)" }}><span className="h-20 w-20 rounded-full bg-[#F8EEE8]" /></div>
      <dl className="space-y-4 text-xs text-[#55483F]">{[["Female", "71.6%", "#754D32"], ["Male", "28.1%", "#B6A294"], ["Non-Binary", "0.3%", "#D8CBC1"]].map(([label, value, color]) => <div key={label} className="flex items-center gap-3"><span className="h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: color }} /><dt className="min-w-24">{label}</dt><dd className="font-bold text-[#754D32]">{value}</dd></div>)}</dl>
    </div>
    <p className="mt-7 text-[9px] leading-4 text-[#694834]">Source: Tasmanian Government, Tasmanian State Service Annual Report 2024-25, 2025, pg. 11</p>
  </div>;
}

export default function FederalStateTasProfileView({ slug, report }: { slug: string; report: Report }) {
  return <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
    <ReportHeader slug={slug} report={report} currentPage="industry_profile" />
    <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8">
      <ReportNavButtons slug={slug} currentPage="industry_profile_tas" prev={{ label: "SA Workforce Overview", href: `/reports/${slug}/industry_profile_sa` }} next={{ label: "VIC Workforce Overview", href: `/reports/${slug}/industry_profile_vic` }} prevPrefix="" />
      <section className="grid gap-6 bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
        <div><p className="inline-block rounded-full bg-[#754D32] px-3 py-1 text-[10px] font-semibold text-white">Tasmania · Selected jurisdiction</p><h1 className="mt-4 text-[30px] font-bold leading-tight sm:text-[38px]">Tasmanian Public Service</h1><p className="mt-5 text-xs font-medium text-[#668B17]">Workforce Overview</p>
          <div className="mt-3 max-w-[520px] space-y-3"><div className="rounded-md bg-[#F8EEE8] p-4"><p className="text-xs text-[#382219]">In 2025, the Tasmanian State Service was comprised of</p><strong className="mt-1 block text-3xl text-[#754D32]">36,168</strong><p className="mt-1 text-xs leading-5 text-[#382219]">employees (29,789.09 FTE)</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[10px] text-[#694834]">Source: Tasmanian Government, Tasmanian State Service Annual Report 2024-25, 2025, pg. 10</p></div><div className="rounded-md bg-[#F8EEE8] p-4"><strong className="block text-3xl text-[#754D32]">4,734</strong><p className="mt-1 text-xs text-[#382219]">APS employees located in Tasmania</p></div></div>
        </div><JurisdictionMap slug={slug} selected="TAS" />
      </section>
      <Section title="Workforce Overview" subtitle="Workforce size, composition, diversity, structure and legal context.">
        <div className="grid gap-6 lg:grid-cols-2"><div><h3 className="text-sm font-bold">Overview</h3><p className="mt-2 text-xs leading-6 text-[#42463B]">The Tasmania State Service (TSS) comprises approximately 36,168 employees. The workforce is predominately female, with women accounting for just over 70 per cent of employees, men comprise just under 30 per cent and 0.3 per cent identifying as &apos;other&apos;. Overall, the gender profile reflects a strongly female-dominated public sector workforce, similar to other states and territories.</p><p className="mt-3 text-xs leading-6 text-[#42463B]">Diversity data from the 2024 Tasmanian State Service Employee Survey shows variation across cohorts. Employees who speak a language other than English represent the largest diversity group at 11 per cent of the total workforce. Eight per cent of employees were born overseas in another country and 6 per cent identify as LGBTQIA+.</p><p className="mt-3 text-xs leading-6 text-[#42463B]">First Nations employees make up approximately 3 per cent of this workforce. While the Tasmanian Government had a set target to increase First Nations employment from 3 to 3.5 per cent across the TSS, this only covered up to 2022 and does not appear to have been renewed.</p></div><div><h3 className="text-sm font-bold">Structure and Legal Context</h3><p className="mt-2 text-xs leading-6 text-[#42463B]">The TSS comprises of 17 Agencies (for example, the Department of Premier, and authorities such as the Environment Protection Authority). The TSS supports the government of the day by providing robust and independent policy advice and ensures a wide range of services are delivered to the community. The TSS also provides support to Ministers to develop and implement policies and legislation, administer state finances, manage resources and deliver or support on a wide range of public services.</p></div></div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2"><GenderChart /><ColumnChart title="Diversity in the Tasmanian State Service" data={[{ label: "Born overseas in another country", value: 8, text: "8%", muted: true }, { label: "Speak a language other than English at home", value: 11, text: "11%" }, { label: "LGBTQIA+", value: 6, text: "6%" }, { label: "Aboriginal", value: 3, text: "3%" }, { label: "Living with a disability", value: 8, text: "8%" }]} source="SOURCE: Tasmanian Government, 2024 TSS Employee Survey - whole of service results, 2024" /></div>
      </Section>
      <Section title="Workforce Trends" subtitle="Growth, projections, occupational shortages and representation over time">
        <p className="max-w-4xl text-xs leading-6 text-[#42463B]">The Public Administration and Safety industry in Tasmania is expected to have 2,795 new employees by 2027 with a projected 10-year employment growth rate of 4 per cent. However, for key Public Administration occupations, the employment growth rate expected by 2027 is as follows:</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{occupations.map((occupation) => <li key={occupation} className="min-h-20 rounded-md bg-[#F8EEE8] p-4 text-xs leading-5 text-[#42463B]">&bull; {occupation}</li>)}</ul>
        <p className="mt-5 max-w-4xl text-xs leading-6 text-[#42463B]">In May 2025 the Tasmanian Government announced saving measures, which included a hiring freeze for some TSS roles. This is likely to present a challenge for the industry in meeting employment projections. However strategic planning is underway for a centralised Human Resources Information System, delivered through the Human Resources Transformation Program, to track skills, training and occupational shortages in agencies of the TSS.</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2"><ColumnChart title="Tasmanian State Service Aboriginal Employment Level against Employment Target" data={[{ label: "Target", value: 3.5, text: "3.5%" }, { label: "Current Aboriginal employment", value: 3, text: "3.0%" }]} source="SOURCE: Tasmanian Government, Tasmania State Service Aboriginal Employment Strategy to 2022, 2019, pg. 8" /><div className="space-y-4"><div className="rounded-md bg-[#F8EEE8] p-4"><strong className="text-3xl text-[#754D32]">4%</strong><p className="mt-2 text-xs leading-5">Employment growth rate projection to May 2035 for Public Administration and Safety Industry</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[9px] leading-4 text-[#694834]">Source: Jobs and Skills Australia, Employment Projections - Outlook for states and territories, Table 2</p></div><div className="rounded-md bg-[#F8EEE8] p-4"><span className="inline-block rounded-full bg-[#754D32] px-4 py-1.5 text-xs font-semibold text-white">Industry Insight</span><p className="mt-3 text-xs leading-6 text-[#42463B]">Stakeholders identified the Human Resources Transformation Program as an essential emerging initiative to assist in tracking skills gaps and training needs.</p></div></div></div>
      </Section>
      <section className="bg-white p-5 sm:p-6"><h2 className="text-base font-bold">Sources</h2><ol start={58} className="mt-4 space-y-3">{sources.map((source, index) => <li key={index} className="flex gap-3 text-[11px] leading-5 text-[#42463B]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#668B17] text-[10px] text-white">{58 + index}</span>{source}</li>)}</ol></section>
    </main><ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
  </div>;
}
