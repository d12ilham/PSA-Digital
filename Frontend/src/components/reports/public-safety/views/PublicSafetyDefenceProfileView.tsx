"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import AustraliaInteractiveMap from "@/components/common/AustraliaInteractiveMap";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const charts = [
  "Total Yearly Headcount and Percent Change (coloured arrows) for each Military Service Branch, Combined for Whole of Australian Defence Force (ADF)",
  "Yearly Separation Rate for ADF Service Branches and ADF Combined",
  "Proportion of Male and Female ADF and ADF Reserve Members in 2025",
  "Proportion of First Nations Participation in the ADF and ADF Reserves Across 2024 and 2025",
  "ADF Employees and Major Facilities by Location and ADF Reserves Across 2024 and 2025",
  "List of Operations and Activities Undertaken by the Australian Defence Force Throughout 2024 and 2025",
];

const lineColours = ["#D7A31A", "#A9693D", "#ED8D61", "#61645E", "#D6A22A"];

function LineChart({ separation = false }: { separation?: boolean }) {
  const names = separation ? ["Navy", "Total ADF", "Army", "Air Force"] : ["Total ADF", "ADF Reserves", "Army", "Air Force", "Navy"];
  const left = separation ? [11.5, 9.5, 7.7, 7.6] : [57248, 32560, 27239, 15769, 15160];
  const right = separation ? [9.4, 7.9, 6.9, 6.2] : [58909, 33260, 27701, 16088, 15706];
  const max = separation ? 12 : 60000;
  const min = separation ? 4 : 10000;
  const y = (value: number) => 245 - ((value - min) / (max - min)) * 190;
  return <svg viewBox="0 0 700 340" className="mt-5 w-full" role="img" aria-label={separation ? "Yearly separation rate line chart" : "Yearly headcount line chart"}>
    {[0,1,2,3,4].map(i => <line key={i} x1="75" x2="620" y1={55+i*47.5} y2={55+i*47.5} stroke="#E3E5DE" className="animate-profile-grid-line" style={{ animationDelay: `${i * 0.06}s` }} />)}
    {names.map((name,i) => <g key={name}>
      <line x1="190" y1={y(left[i])} x2="510" y2={y(right[i])} stroke={lineColours[i]} strokeWidth="3" className="animate-profile-chart-line" style={{ animationDelay: `${i * 0.12 + 0.35}s` }} />
      <circle cx="190" cy={y(left[i])} r="4" fill={lineColours[i]} className="animate-radar-point" style={{ animationDelay: `${i * 0.12 + 0.35}s` }} /><circle cx="510" cy={y(right[i])} r="4" fill={lineColours[i]} className="animate-radar-point" style={{ animationDelay: `${i * 0.12 + 0.8}s` }} />
      <text x="174" y={y(left[i])-10} textAnchor="end" fontSize="12" fill={lineColours[i]}>{left[i].toLocaleString()}{separation ? "%" : ""}</text>
      <text x="526" y={y(right[i])-5} fontSize="12" fill={lineColours[i]}>{right[i].toLocaleString()}{separation ? "%" : ""}</text>
      <text x="526" y={y(right[i])+13} fontSize="12" fontWeight="700" fill="#50534D">{name}</text>
    </g>)}
    <text x="190" y="282" textAnchor="middle" fontSize="12" fill="#30342D">2024</text><text x="510" y="282" textAnchor="middle" fontSize="12" fill="#30342D">2025</text>
  </svg>;
}

function GenderChart() {
  const rows = [["Army",84.6,15.3],["ADF Reserves",81.3,18.7],["Total ADF",79.1,20.9],["Navy",75.7,24.3],["Air Force",72.7,27.3]] as const;
  return <div className="mt-10 space-y-4">{rows.map(([name,male,female], index) => <div key={name} style={{ animationDelay: `${index * 0.1 + 0.1}s` }} className="grid animate-card-entrance grid-cols-[90px_1fr] items-center gap-4"><span className="text-right text-[11px] text-[#252D02]">{name}</span><div className="flex h-9 overflow-hidden transition-shadow duration-300 hover:shadow-md"><div className="grid origin-left animate-profile-bar place-items-center bg-[#666960] text-[10px] font-semibold text-white" style={{width:`${male}%`, animationDelay: `${index * 0.1 + 0.2}s`}}>{male}%</div><div className="grid origin-left animate-profile-bar place-items-center bg-[#D7A31A] text-[10px] font-semibold text-white" style={{width:`${female}%`, animationDelay: `${index * 0.1 + 0.35}s`}}>{female}%</div></div></div>)}<div className="ml-[106px] flex gap-6 pt-3 text-[11px]"><span><i className="mr-2 inline-block size-2 rounded-full bg-[#666960]"/>Male (%)</span><span><i className="mr-2 inline-block size-2 rounded-full bg-[#D7A31A]"/>Female (%)</span></div></div>;
}

function FirstNationsChart() {
  return <svg viewBox="0 0 700 330" className="mt-4 w-full" role="img" aria-label="First Nations participation line chart">
    {[2.5,3,3.5,4,4.5].map((v,i)=><g key={v}><line x1="80" x2="620" y1={250-i*47} y2={250-i*47} stroke="#DDE0D7"/><text x="65" y={254-i*47} fontSize="11" textAnchor="end">{v}%</text></g>)}
    <line x1="165" y1="108" x2="555" y2="108" stroke="#D2A25B" strokeWidth="3" className="animate-profile-chart-line" style={{ animationDelay: ".4s" }}/><circle cx="165" cy="108" r="4" fill="#D2A25B" className="animate-radar-point" style={{ animationDelay: ".4s" }}/><circle cx="555" cy="108" r="4" fill="#D2A25B" className="animate-radar-point" style={{ animationDelay: ".9s" }}/>
    <line x1="165" y1="197" x2="555" y2="215" stroke="#63655F" strokeWidth="3" className="animate-profile-chart-line" style={{ animationDelay: ".65s" }}/><circle cx="165" cy="197" r="4" fill="#63655F" className="animate-radar-point" style={{ animationDelay: ".65s" }}/><circle cx="555" cy="215" r="4" fill="#63655F" className="animate-radar-point" style={{ animationDelay: "1.1s" }}/>
    <text x="155" y="94" fill="#D2A25B" fontSize="16">3.9%</text><text x="564" y="113" fill="#D2A25B" fontSize="16">3.9%</text><text x="155" y="184" fill="#63655F" fontSize="16">3.1%</text><text x="564" y="220" fill="#63655F" fontSize="16">3.0%</text>
    <text x="555" y="137" fontSize="11">Total ADF</text><text x="535" y="239" fontSize="11">ADF Reserves</text><text x="165" y="285" textAnchor="middle" fontSize="11">2024</text><text x="555" y="285" textAnchor="middle" fontSize="11">2025</text>
  </svg>;
}

function LocationChart() {
  const states = ["NSW","NT","QLD","SA","TAS","VIC","WA"];
  const [selectedState, setSelectedState] = useState("WA");
  const locationData: Record<string, [string,string,string]> = {
    NSW:["14,182","9,053","21"], NT:["4,826","2,104","8"], QLD:["11,421","7,316","18"], SA:["5,126","3,054","11"], TAS:["1,208","874","3"], VIC:["7,864","4,927","12"], WA:["4,276","3,173","10"],
  };
  const values = locationData[selectedState];
  return <><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><h3 className="text-lg font-semibold">ADF Employees and Major Facilities by Location</h3><div className="flex flex-wrap gap-2">{states.map(s=><button type="button" key={s} onClick={()=>setSelectedState(s)} className={`rounded-full px-3 py-1 text-[10px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${s===selectedState?"bg-[#7BC900] text-[#253100]":"bg-[#FAFAF0] text-[#535862] hover:bg-[#F0F3E5]"}`}>{s}</button>)}</div></div><div className="grid gap-5 lg:grid-cols-[1fr_220px]"><div className="animate-zoom-in overflow-hidden rounded-lg border border-[#E9EAEB] bg-[#F7F0DC] px-4 transition-shadow duration-300 hover:shadow-md"><AustraliaInteractiveMap selectedState="NATIONAL" highlightedState={selectedState} onSelectState={setSelectedState} variant="defence" compact /></div><aside className="animate-card-entrance rounded-lg bg-[#F8F1E3] p-5"><h4 className="text-2xl font-bold">{selectedState}</h4>{[[values[0],"Permanent ADF"],[values[1],"ADF Reserves"],[values[2],"Major Defence"]].map(([v,l], index)=><div key={l} style={{ animationDelay: `${index * 0.1 + 0.15}s` }} className="mt-4 animate-card-entrance rounded bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"><strong className="block text-xl text-[#D7A31A]">{v}</strong><span className="text-[11px]">{l}</span></div>)}</aside></div><p className="mt-4 text-[10px] leading-4 text-[#535862]">Major Defence bases. Please note total number of bases may change in the next 12 months in line with recommendations from the Defence Estate Audit.</p></>;
}

function OperationsChart() {
  return <div
    className="mt-5 aspect-[1519/1165] min-h-[540px] w-full animate-zoom-in bg-white bg-contain bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/images/reports/public-safety/defence-world-operations-map.png')" }}
    role="img"
    aria-label="World map of Australian Defence Force operations and activities throughout 2024 and 2025"
  />;
}

function ActiveChart({ active }: { active: number }) {
  return <div className="min-w-0 animate-card-entrance rounded-lg border border-[#E9EAEB] bg-white px-8 py-7 transition-shadow duration-300 hover:shadow-lg"><p className="text-[10px] font-semibold uppercase text-[#789329]">DEF · Presentation View</p>{active!==4&&<h2 className="mt-2 max-w-[720px] text-lg font-semibold leading-6 text-[#252D02]">{charts[active]}</h2>}{active===0&&<LineChart/>}{active===1&&<LineChart separation/>}{active===2&&<GenderChart/>}{active===3&&<FirstNationsChart/>}{active===4&&<LocationChart/>}{active===5&&<OperationsChart/>}{active!==5&&<p className="mt-5 text-[10px] font-semibold uppercase text-[#6F8B24]">Source: Defence Annual Report 2024-25, 2025</p>}</div>;
}

export default function PublicSafetyDefenceProfileView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const libraryRef = useRef<HTMLElement>(null);
  const [libraryVisible, setLibraryVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) setLibraryVisible(true); }, { threshold: 0.05 });
    if (libraryRef.current) observer.observe(libraryRef.current);
    return () => observer.disconnect();
  }, []);
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="defence_industry_profile" navigation={{ back:{label:"Defence chapter",href:`/reports/${slug}/defence`}, prev:{label:"Industry-Sector Overview",href:`/reports/${slug}/defence_industry_overview`}, next:{label:"Workforce Insights",href:`/reports/${slug}/defence_workforce_insights`}, prevPrefix:"Previous Section:", nextPrefix:"Next Section:" }}>
    <section className="relative min-h-[184px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-5 transition-shadow duration-500 hover:shadow-lg lg:pr-[500px]">
      <div className="animate-slide-up"><span className="inline-flex rounded-full bg-[#D7A31A] px-4 py-1.5 text-[10px] font-bold uppercase text-white">DEF · Industry-Sector Analysis</span><h1 className="mt-4 text-[40px] font-bold leading-[48px] text-[#252D02]">Industry Profile</h1></div>
      <p className="mt-2 animate-slide-up-delay text-xs text-[#535862]">Select a chart to open it in a large presentation view.</p>
      <div className="absolute right-6 top-[42px] hidden h-[100px] w-[446px] animate-zoom-in transition-transform duration-300 hover:scale-[1.02] lg:block">
        <Image src="/images/reports/public-safety/defence-industry-overview-group-93.svg" alt="Australian Defence Force land, maritime and air capabilities" width={446} height={100} priority />
      </div>
    </section>
    <section ref={libraryRef} className={libraryVisible ? "animate-slide-up" : "translate-y-6 opacity-0"}><h2 className="border-b border-[#D8DBD2] pb-4 text-xl font-bold uppercase text-[#252D02]">Chart Library · Select a chart to open</h2><div className="mt-6 grid items-start gap-6 lg:grid-cols-[340px_1fr]"><div className="space-y-2">{charts.map((label,i)=><button key={label} type="button" onClick={()=>setActive(i)} aria-pressed={active===i} style={libraryVisible ? { animationDelay: `${i * 0.08 + 0.08}s` } : undefined} className={`group grid w-full grid-cols-[1fr_34px] items-center gap-4 rounded-lg border px-5 py-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${libraryVisible?"animate-card-entrance":"opacity-0"} ${active===i?"border-[#D7A31A] bg-[#FBF3DF]":"border-[#E9EAEB] bg-white hover:border-[#D7A31A]"}`}><span><small className="mb-3 block text-[10px] font-semibold uppercase text-[#C79A26]">0{i+1} · DEF · Presentation View</small><strong className="block text-sm leading-5 text-[#252D02]">{label}</strong></span><span className={`grid size-8 place-items-center rounded-full border transition-transform duration-300 group-hover:scale-110 ${active===i?"border-[#CDD2C7] bg-white text-[#252D02]":"border-[#7BC900] bg-[#7BC900] text-[#243000]"}`}><ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5"/></span></button>)}</div><ActiveChart key={active} active={active}/></div></section>
  </PublicSafetyPageShell>;
}
