"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

function CurrentWorkforceCharts() {
  const stats = [["6,228", "The ADF enlisted 6,228 members entering the permanent workforce in 2024-25"], ["1,296", "Had prior military service in the Reserves"], ["4,932", "Had no prior military experience. This is lower than previous to 2023-24"], ["20.6%", "Women represented 20.6% of enlistments, and had begun to grow in representation"]];
  const bars = [
    { value: 20545, label: <>Australian Public<br />Service Employees</> },
    { value: 35269, label: <>Reserves<br />(Navy, Army, Air)</> },
    { value: 58909, label: <>Permanent Force<br />(Navy, Army, Air)</> },
  ];

  return <div className="animate-card-entrance space-y-5">
    <p className="max-w-[980px] text-xs leading-6 text-[#535862]">The 2024-25 financial year saw a significant increase in ADF recruitment alongside a decrease in separations, increasing the total ADF permanent workforce headcount.</p>
    <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex min-h-[748px] flex-col rounded-lg border border-[#D8D9D3] bg-white p-6 transition-shadow duration-300 hover:shadow-md">
        <span className="text-[9px] font-bold uppercase text-[#D3992C]">DEF | Presentation View</span>
        <h3 className="mt-3 text-xl font-bold text-[#252D02]">Defence Workforce Headcount, 30 June 2025</h3>
        <div className="relative mt-8 flex min-h-0 flex-1 pl-14">
          <div className="absolute inset-y-0 left-0 flex w-12 flex-col justify-between pb-12 text-right text-[9px] text-[#535862]">
            {["60,000", "45,000", "30,000", "15,000", "0"].map((tick) => <span key={tick}>{tick}</span>)}
          </div>
          <div className="relative flex min-h-[520px] flex-1 items-end justify-around border-b border-[#686B64] pb-12">
            {[0, 25, 50, 75, 100].map((position) => <span key={position} className="absolute left-0 right-0 border-t border-[#D8D9D3]" style={{ bottom: `calc(48px + ${position * 0.82}%)` }} />)}
            {bars.map((bar, index) => <div key={bar.value} className="relative z-10 flex h-[82%] w-[29%] max-w-[160px] flex-col justify-end text-center">
              <span className="mb-3 text-[10px] font-bold text-[#252D02]">{bar.value.toLocaleString()}</span>
              <div className="w-full origin-bottom animate-defence-bar bg-[#D99C28] transition-colors duration-300 hover:bg-[#B77C0E]" style={{ height: `${bar.value / 60000 * 100}%`, animationDelay: `${index * 0.12 + 0.15}s` }} />
              <span className="absolute left-1/2 top-full mt-3 w-[150px] -translate-x-1/2 text-[9px] leading-4 text-[#252D02]">{bar.label}</span>
            </div>)}
          </div>
        </div>
        <p className="mt-10 text-[9px] font-semibold uppercase text-[#769B1E]">Source: Defence Annual Report 2024-25, 2025</p>
      </div>
      <div className="flex min-h-[748px] flex-col rounded-lg bg-[#E7E9DE] p-4">
        <div className="grid flex-1 grid-rows-4 gap-3">
          {stats.map(([value,label], index) => <div key={value} style={{ animationDelay: `${index * 0.08 + 0.2}s` }} className="animate-card-entrance rounded-lg bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <strong className="block text-[38px] font-normal leading-none text-[#D3992C]">{value}</strong>
            <span className="mt-5 block text-[10px] leading-4 text-[#535862]">{label}</span>
          </div>)}
        </div>
        <p className="mt-3 text-[8px] font-semibold uppercase leading-3 text-[#769B1E]">Source: Defence Annual Report 2024-25, 2025</p>
      </div>
    </div>
  </div>;
}

function FutureWorkforceCharts() {
  const separation = [9.7, 9, 9.5, 11.2, 11.1, 9.5, 7.9];
  const years = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"];
  const forecastYears = ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040"];

  return <div className="animate-card-entrance space-y-5">
    <p className="max-w-[1050px] text-xs leading-6 text-[#535862]">To meet targets set in the Defence Workforce Plan 2024, the ADF will need a net growth of around 6,500 permanent personnel each year. This will require an average recruitment intake of 7,500 per year between 2024-2030, should the ADF maintain its current separation rate, and a further increase in recruitment to meet the permanent workforce growth targets.</p>

    <div className="flex min-h-[560px] flex-col rounded-lg border border-[#D8D9D3] bg-white p-6 transition-shadow duration-300 hover:shadow-md">
      <h3 className="text-xl font-bold text-[#252D02]">Australian Defence Force Separation Rate, June 2019 - June 2025</h3>
      <p className="mt-1 text-xs text-[#535862]">Annual separation rate percentage (%)</p>
      <div className="relative mt-8 flex min-h-0 flex-1 pl-14">
        <div className="absolute inset-y-0 left-0 flex w-12 flex-col justify-between pb-9 text-right text-[9px] text-[#535862]">
          {["12.0%", "9.0%", "6.0%", "3.0%", "0.0%"].map((tick) => <span key={tick}>{tick}</span>)}
        </div>
        <div className="relative flex min-h-[350px] flex-1 items-end justify-around border-b border-[#686B64] pb-9">
          {[0, 25, 50, 75, 100].map((position) => <span key={position} className="absolute left-0 right-0 border-t border-dashed border-[#D8D9D3]" style={{ bottom: `calc(36px + ${position * 0.84}%)` }} />)}
          {separation.map((value, index) => <div key={years[index]} className="relative z-10 flex h-[84%] w-[10%] max-w-[90px] flex-col justify-end text-center">
            <span className="mb-2 text-[10px] font-bold text-[#252D02]">{value.toFixed(1)}%</span>
            <div className="w-full origin-bottom animate-defence-bar rounded-t-md bg-[#D2A05D] transition-colors duration-300 hover:bg-[#B77C0E]" style={{ height: `${value / 12 * 100}%`, animationDelay: `${index * 0.08 + 0.12}s` }} />
            <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 text-[9px] text-[#535862]">{years[index]}</span>
          </div>)}
        </div>
      </div>
      <p className="mt-9 text-[9px] font-semibold uppercase text-[#769B1E]">Source: Defence Annual Reports 2019-20 - 2024-25</p>
    </div>

    <div className="flex min-h-[520px] flex-col rounded-lg border border-[#D8D9D3] bg-white p-6 transition-shadow duration-300 hover:shadow-md">
      <h3 className="text-xl font-bold text-[#252D02]">Australian Defence Force Permanent Workforce - Forecast to 2040</h3>
      <p className="mt-1 text-xs text-[#535862]">Target &amp; requirement forecast bands across planning periods</p>
      <div className="relative mt-8 flex min-h-0 flex-1 pl-14">
        <div className="absolute bottom-10 left-0 top-0 flex w-12 flex-col justify-between text-right text-[9px] text-[#535862]">
          {["85,000", "76,250", "67,500", "58,750", "50,000"].map((tick) => <span key={tick}>{tick}</span>)}
        </div>
        <div className="relative min-h-[300px] flex-1">
          <div className="absolute bottom-10 left-0 right-0 top-0 border-b border-[#686B64]">
            {[0, 25, 50, 75, 100].map((position) => <span key={position} className="absolute left-0 right-0 border-t border-dashed border-[#D8D9D3]" style={{ top: `${position}%` }} />)}
            <div className="absolute bottom-0 top-0 origin-bottom animate-defence-bar rounded-t-md bg-[#D2A05D] text-center" style={{ left: "16.6667%", width: "16.6667%", animationDelay: "0.12s" }}><span className="mt-6 block text-[10px] font-semibold leading-4 text-[#252D02]">Budgeted<br />Workforce<br />Requirement<br />Period</span><strong className="mt-4 block text-sm text-[#252D02]">85,000</strong></div>
            <div className="absolute bottom-0 top-0 origin-bottom animate-defence-bar rounded-t-md bg-[#E8C99A] text-center" style={{ left: "38.8889%", width: "27.7778%", animationDelay: "0.24s" }}><span className="mt-6 block text-[10px] font-semibold leading-4 text-[#252D02]">2030s Target<br />Period</span><strong className="mt-8 block text-sm text-[#252D02]">85,000</strong></div>
            <div className="absolute bottom-0 top-0 origin-bottom animate-defence-bar rounded-t-md bg-[#D2A05D] text-center" style={{ left: "72.2222%", width: "27.7778%", animationDelay: "0.36s" }}><span className="mt-6 block text-[10px] font-semibold leading-4 text-[#252D02]">2040s Target<br />Period</span><strong className="mt-8 block text-sm text-[#252D02]">85,000</strong></div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 grid grid-cols-[repeat(18,minmax(0,1fr))] text-center text-[7px] text-[#535862]">{forecastYears.map((year) => <span key={year}>{year}</span>)}</div>
        </div>
      </div>
      <p className="mt-9 text-[9px] font-semibold uppercase text-[#769B1E]">Source: Defence Annual Report 2024-25, 2025 &amp; Defence Workforce Plan 2024, 2024</p>
    </div>
  </div>;
}

function VeteransCharts() {
  const stats = [["1,057", "RPL assessments conducted in 2024-25"], ["2,093", "Managed over 2,093 enquiries"], ["2,439", "Issued 2,439 qualifications"], ["2,174", "Issued 2,174 micro-credentials"]];
  return <div className="animate-card-entrance space-y-5">
    <p className="max-w-[1100px] text-xs leading-6 text-[#535862]">The ADF has issued more than 4,000 qualifications and micro-credentials, ranging from Certificate III to Advanced Diploma, to ADF personnel considering their transition to civilian life, and recently separated Veterans in the 2024-25 financial year. This has been supported through ADF use of Recognition of Prior Learning (RPL) with 1,057 RPL assessments conducted in the 2024-25 financial year.</p>
    <h3 className="text-[10px] font-bold uppercase text-[#535862]">Veterans Transition Training Support 2024-25</h3>
    <p className="max-w-[1100px] text-xs leading-6 text-[#535862]">To support serving members and transitioned veterans the ADF Transition and Civil Recognition Cell completed the following in 2024-25:</p>
    <div className="rounded-lg bg-[#FBF5EA] p-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([value,label], index)=><div key={value} style={{ animationDelay: `${index * 0.12 + 0.15}s` }} className="min-h-[132px] animate-card-entrance rounded-md border-l-[6px] border-l-[#666960] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <strong className="block text-[36px] font-normal leading-none text-[#D3992C]">{value}</strong>
          <span className="mt-5 block text-[10px] leading-4 text-[#535862]">{label}</span>
        </div>)}
      </div>
      <p className="mt-6 text-[9px] font-semibold uppercase text-[#535862]">Source: Defence Annual Report 2024-25, 2025</p>
    </div>
  </div>;
}

export default function PublicSafetyDefenceOverviewView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const introRef = useRef<HTMLElement>(null);
  const groupsRef = useRef<HTMLElement>(null);
  const sourcesRef = useRef<HTMLElement>(null);
  const [introVisible, setIntroVisible] = useState(false);
  const [groupsVisible, setGroupsVisible] = useState(false);
  const [sourcesVisible, setSourcesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === introRef.current) setIntroVisible(true);
        if (entry.target === groupsRef.current) setGroupsVisible(true);
        if (entry.target === sourcesRef.current) setSourcesVisible(true);
      });
    }, { threshold: 0.08 });
    [introRef, groupsRef, sourcesRef].forEach((ref) => { if (ref.current) observer.observe(ref.current); });
    return () => observer.disconnect();
  }, []);

  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="defence_industry_overview"
      navigation={{
        back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        prev: { label: "Defence chapter", href: `/reports/${slug}/defence` },
        next: { label: "Industry Profile", href: `/reports/${slug}/defence_industry_profile` },
        prevPrefix: "Back to",
        nextPrefix: "Next Section:",
      }}
    >
      <section className="relative min-h-[220px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white p-6 transition-shadow duration-500 hover:shadow-lg lg:pr-[500px]">
        <div className="animate-slide-up"><span className="inline-flex rounded-full bg-[#D3992C] px-4 py-1.5 text-[10px] font-bold uppercase text-white">DEF · Industry-Sector Analysis</span>
        <h1 className="mt-5 text-[40px] font-bold leading-[52px] text-[#252D02]">Industry-Sector Overview</h1></div>
        <p className="mt-3 max-w-[850px] animate-slide-up-delay text-sm leading-6 text-[#535862]">The Defence workforce is multidisciplinary, with highly skilled personnel in a breadth of roles. The workforce comprises permanent and reserve force members across the Australian Defence Force (ADF) including Navy, Army and Air Force, supported by civilian Australian Public Service (APS) employees who work across the Department of Defence.</p>
        <div className="absolute right-6 top-[66px] hidden h-[100px] w-[446px] animate-zoom-in transition-transform duration-300 hover:scale-[1.02] lg:block">
          <Image src="/images/reports/public-safety/defence-industry-overview-group-93.svg" alt="Australian Defence Force land, maritime and air capabilities" width={446} height={100} priority />
        </div>
      </section>

      <section ref={introRef} className={`max-w-[1040px] ${introVisible ? "animate-slide-up" : "translate-y-6 opacity-0"}`}>
        <p className="text-sm leading-6 text-[#535862]">The Defence workforce operates in a secure, structured and regulated environment and undertakes its own long-term workforce planning, including growth and future workforce requirements as outlined in the Defence Workforce Plan 2024. The Defence industry-sector has identified workforce growth targets for ADF permanent workforce of 69,000 by the early 2030s, with an overall permanent ADF and APS workforce of around 100,000 by 2040.</p>
        <h2 className="mt-6 max-w-[760px] text-2xl font-bold leading-8 text-[#252D02]">The following datapoints were identified through this industry-sector overview for the Defence workforce:</h2>
      </section>

      <section ref={groupsRef} className="space-y-6 border-t border-[#9A9D94] pt-6">
        {groups.map((group, index) => {
          const open = openGroup === index;
          return (
            <article key={group.title} style={groupsVisible ? { animationDelay: `${index * 0.12 + 0.1}s` } : undefined} className={`group overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${open ? "border-0 bg-transparent" : "border border-[#AEB0A8] border-l-[6px] border-l-[#666960] bg-[#DDDED8] hover:border-[#8B8E85]"} ${groupsVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
              <button type="button" aria-expanded={open} onClick={() => setOpenGroup(open ? null : index)} className={`flex min-h-[64px] w-full items-center justify-between px-6 text-left ${open ? `rounded-t-lg bg-[#454740] ${index === 2 ? "border-l-[6px] border-l-[#D3992C]" : ""}` : ""}`}>
                <span className={`font-bold transition-colors duration-300 ${open ? "rounded-md bg-[#D3992C] px-4 py-2 text-lg text-white" : "text-xl text-[#252D02]"}`}>{group.title}</span>
                <span className={`inline-flex h-10 items-center gap-2 rounded-full px-5 text-xs font-bold text-[#252D02] transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm ${open && index === 2 ? "bg-white" : "bg-[#8AC900]"}`}>{open ? "Close" : "Open"}{open ? <ChevronUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" /> : <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />}</span>
              </button>
              {open && <div className="rounded-b-lg bg-[#FAFAF0] p-6">{index === 0 ? <CurrentWorkforceCharts /> : index === 1 ? <FutureWorkforceCharts /> : <VeteransCharts />}</div>}
            </article>
          );
        })}
      </section>

      <section ref={sourcesRef} className={`rounded-2xl border border-[#E9EAEB] bg-white p-6 transition-all duration-500 hover:border-[#D3992C] hover:shadow-md ${sourcesVisible ? "animate-slide-up" : "translate-y-6 opacity-0"}`}>
        <h2 className="text-2xl font-bold leading-8 text-[#252D02]">Sources</h2>
        <ol className="mt-5 space-y-4 text-xs leading-5 text-[#535862]">
          {sources.map((source, index) => <li key={index} style={sourcesVisible ? { animationDelay: `${index * 0.08 + 0.1}s` } : undefined} className={`group flex items-start gap-2 ${sourcesVisible ? "animate-card-entrance" : "opacity-0"}`}><span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#8AC900] text-[7px] font-bold leading-none text-[#252D02] transition-transform duration-300 group-hover:scale-110">{index + 12}</span><span>{source}</span></li>)}
        </ol>
      </section>
    </PublicSafetyPageShell>
  );
}
