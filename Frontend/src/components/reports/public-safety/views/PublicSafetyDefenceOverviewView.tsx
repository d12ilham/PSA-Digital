"use client";

import { ChevronDown, ChevronUp, CarFront, Plane, Ship } from "lucide-react";
import { useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const groups = [
  {
    title: "Current Workforce",
    points: ["The permanent Australian Defence Force workforce comprised approximately 59,000 personnel in 2024-25.", "The Defence workforce also includes reservists and Australian Public Service employees who support capability, operations and policy.", "Workforce demand remains distributed across Navy, Army and Air Force roles and a broad range of civilian occupations."],
  },
  {
    title: "Future Workforce",
    points: ["The Defence workforce is expected to grow substantially to meet emerging strategic and capability requirements.", "The Defence Workforce Plan identifies a target permanent ADF workforce of 69,000 by the early 2030s.", "The overall permanent ADF and APS workforce is planned to reach around 100,000 by 2040."],
  },
  {
    title: "Veterans",
    points: ["Veterans bring highly transferable technical, leadership and operational skills to the Australian workforce.", "Supporting career transition and recognising prior learning can improve employment pathways after service.", "Industry collaboration remains important for translating Defence experience into civilian qualifications and occupations."],
  },
];

const sources = [
  "Department of Defence, Defence Workforce Plan 2024, Department of Defence, Australian Government, 2025, accessed 15 December 2025.",
  "Department of Defence, Defence Annual Report 2024-25, Department of Defence, Australian Government, 2025, accessed 15 December 2025.",
  "Department of Defence, Defence Workforce Plan 2024, Department of Defence, Australian Government, 2025, accessed 15 December 2025.",
  "Department of Defence, Defence Annual Report 2024-25, Department of Defence, Australian Government, 2025, accessed 15 December 2025.",
];

function BarChart({ title, values, labels, suffix = "" }: { title: string; values: number[]; labels: string[]; suffix?: string }) {
  const max = Math.max(...values);
  return <div className="rounded-xl border border-[#E9EAEB] bg-white p-6"><h3 className="text-lg font-bold text-[#252D02]">{title}</h3><div className="mt-6 flex h-[250px] items-end gap-5 border-b border-[#9A9D94] px-5">{values.map((value, index) => <div key={labels[index]} className="flex h-full flex-1 flex-col justify-end text-center"><span className="mb-2 text-[10px] font-bold text-[#535862]">{value.toLocaleString()}{suffix}</span><div className="mx-auto w-full max-w-[112px] bg-[#D9A128]" style={{ height: `${Math.max(16, value / max * 82)}%` }} /><span className="mt-3 min-h-10 text-[9px] leading-3 text-[#535862]">{labels[index]}</span></div>)}</div></div>;
}

function CurrentWorkforceCharts() {
  const stats = [["6,228", "ADF enlistments entering the permanent workforce in 2024-25"], ["1,296", "Had prior military service in the Reserves"], ["4,932", "Had no prior military experience"], ["20.6%", "Women represented 20.6% of enlistments"]];
  return <div className="space-y-5"><p className="text-xs leading-6 text-[#535862]">The 2024-25 financial year saw a significant increase in ADF recruitment alongside a decrease in separations, increasing the total ADF permanent workforce headcount.</p><div className="grid gap-4 lg:grid-cols-[1fr_300px]"><BarChart title="Defence Workforce Headcount, 30 June 2025" values={[20545,34269,58909]} labels={["Australian Public Service Employees", "Reserves (Navy, Army, Air)", "Permanent Force (Navy, Army, Air)"]} /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">{stats.map(([value,label]) => <div key={value} className="rounded-lg bg-[#F0F3E5] p-5"><strong className="block text-3xl font-medium text-[#D7A31A]">{value}</strong><span className="mt-2 block text-[10px] leading-4 text-[#535862]">{label}</span></div>)}</div></div><p className="text-[10px] font-semibold uppercase text-[#769B1E]">Source: Defence Annual Report 2024-25, 2025</p></div>;
}

function FutureWorkforceCharts() {
  return <div className="space-y-5"><p className="text-xs leading-6 text-[#535862]">To meet targets set in the Defence Workforce Plan 2024, the ADF is required to recruit an average of between 6,500 and 7,500 permanent personnel each year while maintaining an average separation rate.</p><BarChart title="Australian Defence Force Separation Rate, June 2019 - June 2025" values={[9.7,9,9.5,11.2,11.1,9.5,7.9]} labels={["2019","2020","2021","2022","2023","2024","2025"]} suffix="%" /><div className="rounded-xl border border-[#E9EAEB] bg-white p-6"><h3 className="text-lg font-bold text-[#252D02]">Australian Defence Force Permanent Workforce - Forecast to 2040</h3><p className="mt-1 text-xs text-[#535862]">Target and requirement forecast bands across planning periods</p><div className="mt-7 grid h-[230px] grid-cols-3 items-end gap-3 border-b border-[#9A9D94] px-8">{[["2026-2029","Budgeted Workforce Requirement Period"],["2030-2035","2030s Target Period"],["2036-2040","2040s Target Period"]].map(([years,label],i)=><div key={years} className={`flex h-[86%] flex-col items-center justify-center text-center ${i===1?"bg-[#E8C99A]":"bg-[#D2A05D]"}`}><span className="text-xs font-semibold text-[#535862]">{label}</span><strong className="mt-5 text-lg text-[#252D02]">85,000</strong><span className="mt-auto pb-3 text-[10px] text-[#535862]">{years}</span></div>)}</div></div><p className="text-[10px] font-semibold uppercase text-[#769B1E]">Source: Defence Annual Report 2024-25, 2025 & Defence Workforce Plan 2024</p></div>;
}

function VeteransCharts() {
  const stats = [["1,057", "Former ADF members commenced training"], ["2,093", "Participated in employment services"], ["2,439", "Veterans supported through transition initiatives"]];
  return <div className="space-y-5"><p className="text-xs leading-6 text-[#535862]">The ADF releases more than 5,000 qualified personnel into civilian life annually. Supporting their transition through skills recognition, career advice and targeted training enables veterans to transfer valuable Defence experience into civilian employment.</p><p className="text-xs leading-6 text-[#535862]">The support of training providers and transition partners is central to improving employment outcomes for veterans.</p><div className="grid gap-4 md:grid-cols-3">{stats.map(([value,label])=><div key={value} className="rounded-lg border-l-4 border-[#D7A31A] bg-white p-6 shadow-sm"><strong className="block text-3xl font-medium text-[#D7A31A]">{value}</strong><span className="mt-3 block text-xs leading-5 text-[#535862]">{label}</span></div>)}</div><p className="text-[10px] font-semibold uppercase text-[#769B1E]">Source: Defence Annual Report 2024-25, 2025</p></div>;
}

export default function PublicSafetyDefenceOverviewView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [openGroup, setOpenGroup] = useState<number | null>(null);

  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="defence_industry_overview"
      navigation={{
        back: { label: "Defence chapter", href: `/reports/${slug}/defence` },
        prev: { label: "Defence", href: `/reports/${slug}/defence` },
        next: { label: "Industry Profile", href: `/reports/${slug}/defence_industry_profile` },
        prevPrefix: "Previous Section:",
        nextPrefix: "Next Section:",
      }}
    >
      <section className="relative min-h-[220px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:pr-[500px]">
        <span className="inline-flex rounded-full bg-[#D7A31A] px-4 py-1.5 text-[10px] font-bold uppercase text-white">DEF · Industry-Sector Analysis</span>
        <h1 className="mt-5 text-[40px] font-bold leading-[52px] text-[#252D02]">Industry-Sector Overview</h1>
        <p className="mt-3 max-w-[850px] text-sm leading-6 text-[#535862]">The Defence workforce is multidisciplinary, with highly skilled personnel in a breadth of roles. The workforce comprises permanent and reserve force members across the Australian Defence Force (ADF) including Navy, Army and Air Force, supported by civilian Australian Public Service (APS) employees who work across the Department of Defence.</p>
        <div aria-hidden="true" className="absolute right-8 top-14 hidden h-[120px] w-[420px] items-center justify-between lg:flex">
          <span className="absolute left-4 right-4 top-1/2 border-t border-dashed border-[#D7A31A]/60" />
          {[CarFront, Ship, Plane].map((Icon, index) => <span key={index} className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF8E8] text-[#D7A31A]"><Icon className="h-10 w-10" strokeWidth={1.35} /></span>)}
        </div>
      </section>

      <section className="max-w-[1040px]">
        <p className="text-sm leading-6 text-[#535862]">The Defence workforce operates in a secure, structured and regulated environment and undertakes its own long-term workforce planning, including growth and future workforce requirements as outlined in the Defence Workforce Plan 2024. The Defence industry-sector has identified workforce growth targets for ADF permanent workforce of 69,000 by the early 2030s, with an overall permanent ADF and APS workforce of around 100,000 by 2040.</p>
        <h2 className="mt-6 max-w-[760px] text-2xl font-bold leading-8 text-[#252D02]">The following datapoints were identified through this industry-sector overview for the Defence workforce:</h2>
      </section>

      <section className="space-y-4">
        {groups.map((group, index) => {
          const open = openGroup === index;
          return (
            <article key={group.title} className="overflow-hidden rounded-xl border border-[#E6CF91] border-l-[6px] border-l-[#D7A31A] bg-[#FFF9E9]">
              <button type="button" aria-expanded={open} onClick={() => setOpenGroup(open ? null : index)} className="flex min-h-[64px] w-full items-center justify-between px-6 text-left">
                <span className="text-xl font-bold text-[#252D02]">{group.title}</span>
                <span className="inline-flex h-10 items-center gap-2 rounded-full bg-[#8AC900] px-5 text-xs font-bold text-[#252D02]">{open ? "Close" : "Open"}{open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}</span>
              </button>
              {open && <div className="border-t border-[#E6CF91] bg-[#FAFAF0] p-6">{index === 0 ? <CurrentWorkforceCharts /> : index === 1 ? <FutureWorkforceCharts /> : <VeteransCharts />}</div>}
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
        <h2 className="text-2xl font-bold leading-8 text-[#252D02]">Sources</h2>
        <ol className="mt-5 space-y-4 text-xs leading-5 text-[#535862]">
          {sources.map((source, index) => <li key={index} className="flex gap-3"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8AC900] text-[9px] font-bold text-[#252D02]">{index + 12}</span><span>{source}</span></li>)}
        </ol>
      </section>
    </PublicSafetyPageShell>
  );
}
