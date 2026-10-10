"use client";

import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import { ColumnChart, JurisdictionMap, Section } from "./FederalStateActProfileView";
import { RepresentationChart } from "./FederalStateNswProfileView";

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
  ["132411", "Policy and Planning Manager"],
  ["223111", "Human Resource Adviser"],
  ["224412", "Policy Analyst"],
  ["224999", "Information and Organisation Professionals nec"],
  ["272499", "Social Professionals nec"],
  ["272613", "Welfare Worker"],
  ["411711", "Community Worker"],
];

const locations = [
  ["69.4%", "in Darwin"],
  ["3.6%", "in East Arnhem"],
  ["2.3%", "in Barkly"],
  ["2.3%", "in the Top End"],
  ["5.7%", "in Big Rivers"],
  ["16.7%", "in Central Australia"],
];

const priorities = [
  "Develop learning assessment resources tailored to First Nations learners in VET",
  "Continue funding regional and remote community projects",
  "Promote accessible training pathways to increase entry into under-represented industries such as technology",
  "Drive digital and technology skills development through targeted programs such as technology boot camp",
  "Explore high level apprenticeship and provide ongoing digital skills training to VET workforce aligned with industry needs",
];

const sources = [
  "Northern Territory Government, State of the Service Report 2024–25, 2025.",
  "Jobs and Skills Australia, Employment Projections - Outlook for states and territories, 2025.",
  "Jobs and Skills Australia, Occupation Shortage List, 2025.",
  "Northern Territory Government, NT Skills Plan 2024–25.",
  "Northern Territory Government, Public Sector Employment and Management Act 1993.",
  "Northern Territory Government, State of the Service Report 2024–25, Figure 18.",
];

export default function FederalStateNtProfileView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="industry_profile" />
      <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="industry_profile_nt"
          prev={{ label: "NSW Workforce Overview", href: `/reports/${slug}/industry_profile_nsw` }}
          next={{ label: "QLD Workforce Overview", href: `/reports/${slug}/industry_profile_qld` }}
          prevPrefix=""
        />

        <section className="grid gap-6 bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
          <div>
            <p className="inline-block rounded-full bg-[#754D32] px-3 py-1 text-[10px] font-semibold text-white">Northern Territory · Selected jurisdiction</p>
            <h1 className="mt-4 text-[30px] font-bold leading-tight text-[#252D02] sm:text-[38px]">Northern Territory Public<br />Service</h1>
            <p className="mt-5 text-xs font-medium text-[#668B17]">Workforce Overview</p>
            <div className="mt-3 max-w-[520px] space-y-3">
              <div className="rounded-md bg-[#F8EEE8] p-4">
                <p className="text-xs text-[#382219]">In 2025, the Northern Territory Public Service was comprised of</p>
                <strong className="mt-1 block text-3xl text-[#754D32]">25,786</strong>
                <p className="mt-1 text-xs leading-5 text-[#382219]">employees (23,754 FTE)</p>
                <p className="mt-4 border-t border-[#DECFC5] pt-3 text-[10px] text-[#694834]">Source: Northern Territory Government, State of the Service Report 2024–2025, 2025, pg. 10</p>
              </div>
              <div className="rounded-md bg-[#F8EEE8] p-4"><strong className="block text-3xl text-[#754D32]">33,646</strong><p className="mt-1 text-xs text-[#382219]">APS employees located in New South Wales</p></div>
            </div>
          </div>
          <JurisdictionMap slug={slug} selected="NT" />
        </section>

        <Section title="Workforce Overview" subtitle="Workforce size, composition, diversity, structure and legal context.">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold">Overview</h3>
              <p className="mt-2 text-xs leading-6 text-[#42463B]">The Northern Territory Public Sector (NTPS) employed 25,786 people in 2025. The workforce is highly concentrated geographically, with just under 70 per cent based in Darwin, and much smaller numbers of staff employed across regional and remote areas.</p>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">Women comprise just over 60 per cent of the workforce. While 1.9 per cent of the NTPS identify as living with a disability.</p>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">Increased First Nations workforce participation remains a key priority for the Northern Territory Government. First Nations employees comprise 11 per cent of the workforce, below the Northern Territory (NT) Government&apos;s 16 per cent target. However, the NTPS remains committed to a range of workforce initiatives including the Aboriginal Employee Forum, Aboriginal Employee Mentoring Program and training programs offered in partnership with the middle manager development program and executive leader development framework.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold">Structure and Legal Context</h3>
              <p className="mt-2 text-xs leading-6 text-[#42463B]">The NTPS comprises agencies, local authorities, statutory corporations and other related bodies to deliver public services on behalf of the Northern Territory Government.</p>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">This includes agencies such as:</p>
              <ul className="mt-1 list-disc pl-5 text-xs leading-6 text-[#42463B]"><li>Department of Corrections</li><li>Department of Health</li><li>Department of Education and Training</li></ul>
              <p className="mt-3 text-xs leading-6 text-[#42463B]">It operates under the Public Sector Employment and Management Act (1993).</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-md bg-[#F8EEE8] p-4">
              <h3 className="text-sm font-bold">Northern Territory Public Sector Employees - Gender</h3>
              <div className="mt-4 grid items-center gap-4 sm:grid-cols-[125px_1fr_130px]">
                <div role="img" aria-label="Female 63.3%, male 36.5%, non-binary 0.2%" className="mx-auto h-28 w-28 rounded-full" style={{ background: "conic-gradient(#754D32 0 63.3%, #B6A79B 63.3% 99.8%, #E8DED6 99.8% 100%)" }}><div className="relative left-6 top-6 h-16 w-16 rounded-full bg-[#F8EEE8]" /></div>
                <dl className="space-y-2 text-xs"><div className="flex justify-between gap-3"><dt>Female</dt><dd className="font-semibold">63.3%</dd></div><div className="flex justify-between gap-3"><dt>Male</dt><dd className="font-semibold">36.5%</dd></div><div className="flex justify-between gap-3"><dt>Non-Binary</dt><dd className="font-semibold">0.2%</dd></div></dl>
                <div className="rounded-md bg-white p-3"><strong className="text-lg text-[#754D32]">5.3%</strong><p className="text-[10px]">Gender Pay Gap</p><p className="mt-3 text-[9px] text-[#694834]">Source: Northern Territory Government, State of the Service Report 2024–25, 2025, pg. 17</p></div>
              </div>
              <p className="mt-3 text-[9px] leading-4 text-[#694834]">Source: Northern Territory Government, State of the Service Report 2024–25, 2025</p>
            </div>
            <ColumnChart title="Workforce Diversity in the Northern Territory Public Sector" data={[{ label: "Aboriginal", value: 11.1, text: "11.1%" }, { label: "People with disability", value: 1.9, text: "1.9%" }, { label: "Culturally and linguistically diverse", value: 21.5, text: "21.5%" }]} source="SOURCE: Northern Territory Government, State of the Service Report 2024–25, 2025, Figure 18" />
          </div>
        </Section>

        <Section title="Workforce Trends" subtitle="Growth, projections, occupational shortages and representation over time">
          <div className="grid gap-5 lg:grid-cols-2">
            <p className="text-xs leading-6 text-[#42463B]">The NT Government has identified the following skilled occupations (October 2025) relevant to the Public Administration industry group, as high priority based on how hard they are to fill. Additionally, the Jobs and Skills Australia Occupational Shortage List indicates that &apos;Contract, Program and Project Administrators&apos;, &apos;Welfare, Recreation and Community Arts Workers&apos;, &apos;Welfare Support Officers&apos; and &apos;Human Resource Professionals&apos; are in shortage for 2025. Several of these occupations are listed under the priority occupation scheme for skilled migration in the Northern Territory. For 2025–26 the Northern Territory has been allocated 850 nominations for the Subclass 190 Skilled Nominated visa and 800 nominations for the Subclass 491 Skilled Work Regional (Provisional) visa. Skilled migrants, particularly under subclass 491 may help to alleviate occupational shortages in regional areas.</p>
            <div className="rounded-md bg-[#F8EEE8] p-4"><span className="inline-block rounded-full bg-[#754D32] px-4 py-1.5 text-xs text-white">Industry Insight</span><p className="mt-3 text-xs leading-6 text-[#42463B]">Stakeholders noted that whilst skilled migration offers solutions for regional skills shortages, this can come with knowledge gaps and cultural challenges, particularly in regions with high populations of First Nations communities.</p></div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-md bg-[#F8EEE8] p-4"><strong className="text-3xl text-[#754D32]">8%</strong><p className="mt-1 text-xs">Employment growth rate projection to May 2035 for Public Administration and Safety Industry</p><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[9px] text-[#694834]">Source: Jobs and Skills Australia, Employment Projections - Outlook for states and territories, 2025, Table 1</p></div>
              <div className="rounded-md bg-[#F8EEE8] p-4"><h3 className="text-sm font-bold">Employee Locations</h3><div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">{locations.map(([value, label]) => <div key={label}><strong className="block text-2xl text-[#754D32]">{value}</strong><span className="text-[10px] text-[#382219]">{label}</span></div>)}</div><p className="mt-4 border-t border-[#DECFC5] pt-3 text-[9px] text-[#694834]">Northern Territory Government, State of the Service Report 2024–2025, 2025, Figure 3</p></div>
            </div>
            <div><h3 className="text-sm font-bold">Skills gaps in Australian Sign Language (Auslan) qualifications and occupations</h3><div className="mt-3 overflow-x-auto rounded-md border border-[#E6E4E0]"><table className="w-full min-w-[470px] text-left text-xs"><thead className="bg-[#F3F3F2]"><tr><th className="p-3">ANZSCO Code</th><th className="p-3">Occupation</th></tr></thead><tbody className="divide-y divide-[#E6E4E0]">{occupations.map(([code, occupation]) => <tr key={code}><td className="p-3">{code}</td><td className="p-3">{occupation}</td></tr>)}</tbody></table></div></div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div><h3 className="text-sm font-bold">The NT Government&apos;s Skills Plan 2024–25 identifies several priorities relevant to the industry-sector including:</h3><ul className="mt-3 grid gap-3 sm:grid-cols-2">{priorities.map((priority) => <li key={priority} className="rounded-md bg-[#F8EEE8] p-4 text-xs leading-5 text-[#42463B]">{priority}</li>)}</ul></div>
            <RepresentationChart title="Aboriginal and Torres Strait Islander Representation in Northern Territory Public Sector (2020–2025)" years={[2020, 2021, 2022, 2023, 2024, 2025]} values={[10.9, 10.3, 10.3, 10.8, 11.0, 11.1]} target={16} min={10} max={17} source="SOURCE: Northern Territory Government, State of the Service Report 2024–25, 2025, Figure 18" />
          </div>
        </Section>

        <section className="bg-white p-5 sm:p-6"><h2 className="text-base font-bold">Sources</h2><ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">{sources.map((source) => <li key={source} className="flex gap-2 text-[11px] leading-5 text-[#42463B]"><span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#8AC900]" />{source}</li>)}</ul></section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
    </div>
  );
}
