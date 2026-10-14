"use client";

import { ChevronDown, Flame, LifeBuoy, Shield, Siren, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const datapoints = [
  { title:"Demand for Services", copy:"Demand continues to increase as communities face more frequent and complex emergency events, including natural disasters and climate-related incidents." },
  { title:"Career Firefighters and Emergency Services Employees", copy:"Career workforces provide specialist response, prevention, recovery and community safety services across states and territories." },
  { title:"Volunteer Services", copy:"Despite relative increases in career Firefighter and operational SES members from 2019–20 to 2024–25, in absolute terms, the increases in career employees are heavily negated by the decreases experienced in volunteer cohorts. Collectively, in the five years from 2019–2020, a total of 1,130 career Firefighters and SES members were added to Australia’s emergency response capability, while a total of 10,336 volunteers were lost." },
  { title:"Surf Life Saving", copy:"Surf Life Saving: Across 2024–2025, Surf Life Saving provided a combined total of 1.95 million hours of lifesaving patrol activity, with New South Wales and Queensland accounting for more than 70 per cent of total hours served. This enabled a combined total of 2.19 million preventative actions, along with 65,942 administrations of first aid and 8,207 rescues across both volunteer and career surf lifesavers." },
];

const sources = [
  "Productivity Commission, Emergency services for fire and other events – Table 9A.6 and 9A.7 [data set], Productivity Commission, 2026, accessed 7 January 2026.",
  "Australian Institute for Disaster Resilience (AIDR), Major Incidents Report 2024–25, Australian Government Department of Home Affairs, 2025.",
  "ABS, November 2025, Detailed Labour Force Survey (Table EQ08), ABS, data trended by Jobs and Skills Australia.",
  "Productivity Commission, Emergency services for fire and other events – Table 9A.5 [data set], Productivity Commission, 2026, accessed 24 February 2026.",
  "Jobs and Skills Australia (JSA), 2025 Occupation Shortage List, JSA, Australian Government, 2025, accessed 23 February 2026.",
  "Productivity Commission, Emergency services for fire and other events – Table 9A.4 [data set], Productivity Commission, 2026, accessed 24 February 2026.",
  "Volunteering Australia, Key volunteering statistics in Australia, Volunteering Australia, 2025.",
  "Surf Life Saving Australia (SLSA), 2024/25 Annual Report, SLSA, 2025, p 118.",
  "Surf Life Saving Australia (SLSA), 2024/25 Annual Report, SLSA, 2025, p 118.",
];

// Productivity Commission RoGS 2026 tables 9A.4–9A.7; the approved PDF's 2023–24 demand total takes precedence over the revised online total.
const demandSeries = [488242, 466504, 515791, 509013, 525317, 574023];
const careerFirefighterSeries = [17952, 18205, 18468, 18422, 18939, 19130];
const fireVolunteerSeries = [202011, 200830, 192774, 188586, 189041, 190042];
const operationalSesSeries = [1673, 1720, 1821, 1912, 2186, 2136];
const sesVolunteerSeries = [24983, 25012, 24537, 24750, 24357, 26068];

function TrendChart({ title, values, labels }: { title: string; values: number[]; labels: string[] }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const point = (value: number, index: number) => ({
    x: 52 + (index * 420) / Math.max(values.length - 1, 1),
    y: 205 - ((value - min) / Math.max(max - min, 1)) * 125,
  });
  const line = values.map((value, index) => {
    const { x, y } = point(value, index);
    return `${x},${y}`;
  }).join(" ");

  return <div className="rounded-xl border border-[#E5E6E0] bg-white p-5 transition-all duration-300 hover:border-[#D95222] hover:shadow-md">
    <h3 className="min-h-10 text-xs font-bold leading-4 text-[#252D02]">{title}</h3>
    <svg viewBox="0 0 520 250" className="mt-3 w-full" role="img" aria-label={title}>
      {[80, 120, 160, 200].map((y) => <line key={y} x1="42" x2="488" y1={y} y2={y} stroke="#E4E5E0" strokeWidth="1" />)}
      <polyline points={line} fill="none" stroke="#B63B30" strokeWidth="2.5" pathLength="40" strokeDasharray="40" className="animate-industry-projection-line" />
      {values.map((value, index) => {
        const x = 52 + (index * 420) / Math.max(values.length - 1, 1);
        const y = point(value, index).y;
        return <g key={labels[index]}>
          <circle cx={x} cy={y} r="5" fill="#B63B30" className="animate-industry-chart-point transition-[r] duration-200 hover:[r:7]" style={{ animationDelay: `${index * 0.12 + 0.25}s` }} /><text x={x} y={y - 12} textAnchor="middle" fontSize="10" fill="#9D2E26" fontWeight="700" className="animate-industry-chart-point" style={{ animationDelay: `${index * 0.12 + 0.25}s` }}>{value.toLocaleString()}</text>
          <text x={x} y="224" textAnchor="middle" fontSize="9" fill="#6B6E68">
            {labels[index].split("–").map((part, partIndex) => <tspan key={part} x={x} dy={partIndex === 0 ? 0 : 11}>{part}</tspan>)}
          </text>
        </g>;
      })}
    </svg>
  </div>;
}

function BarChart({ title, values, labels }: { title: string; values: number[]; labels: string[] }) {
  const max = Math.max(...values);
  const chartWidth = 440;
  const gap = chartWidth / values.length;
  const barWidth = Math.min(58, gap * 0.58);
  return <div className="rounded-xl border border-[#E5E6E0] bg-white p-5 transition-all duration-300 hover:border-[#D95222] hover:shadow-md"><h3 className="min-h-10 text-xs font-bold leading-4 text-[#252D02]">{title}</h3><svg viewBox="0 0 520 310" className="mt-2 w-full" role="img" aria-label={title}>{[80,140,200,260].map(y=><line key={y} x1="42" x2="488" y1={y} y2={y} stroke="#E4E5E0" strokeWidth="1"/>)}{values.map((value,index)=>{const height=(value/max)*205;const x=52+index*gap+(gap-barWidth)/2;const y=260-height;return <g key={`${labels[index]}-${value}`}><rect x={x} y={y} width={barWidth} height={height} fill="#B92D21" className="animate-industry-chart-bar transition-colors duration-200 hover:fill-[#D95222]" style={{ animationDelay: `${index * 0.08 + 0.1}s` }}/><text x={x+barWidth/2} y={Math.max(20,y-10)} textAnchor="middle" fontSize="10" fill="#252D02" fontWeight="700">{value.toLocaleString()}</text><text x={x+barWidth/2} y="284" textAnchor="middle" fontSize="10" fill="#252D02">{labels[index]}</text></g>})}</svg></div>;
}

export default function PublicSafetyFesOverviewView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [open, setOpen] = useState<number | null>(null);
  const datapointsRef = useRef<HTMLElement>(null);
  const sourcesRef = useRef<HTMLElement>(null);
  const [datapointsVisible, setDatapointsVisible] = useState(false);
  const [sourcesVisible, setSourcesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === datapointsRef.current) setDatapointsVisible(true);
        if (entry.target === sourcesRef.current) setSourcesVisible(true);
      });
    }, { threshold: 0.08 });
    if (datapointsRef.current) observer.observe(datapointsRef.current);
    if (sourcesRef.current) observer.observe(sourcesRef.current);
    return () => observer.disconnect();
  }, []);
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_industry_overview" navigation={{back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`},backSecondary:{label:"Fire and Emergency Services chapter",href:`/reports/${slug}/fes`},prev:{label:"Fire and Emergency Services",href:`/reports/${slug}/fes`},next:{label:"Industry Profile",href:`/reports/${slug}/fes_industry_profile`},prevPrefix:"Previous Section:",nextPrefix:"Next Section:"}}>
    <div className="space-y-6 ps-fes-overview">
    <section className="relative min-h-[220px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-8 transition-shadow duration-300 hover:shadow-md lg:px-8"><div className="relative z-10 max-w-[950px]"><div className="animate-slide-up"><span className="inline-flex rounded-full bg-[#D95222] px-4 py-1.5 text-[10px] font-bold text-white">FES · INDUSTRY-SECTOR ANALYSIS</span><h1 className="mt-5 text-[40px] font-bold leading-[48px] text-[#252D02]">Industry-Sector Overview</h1></div><p className="mt-5 max-w-[960px] animate-slide-up-delay text-sm leading-6 text-[#535862]">Australia’s Fire and Emergency Services are critical to ensure protection of life and property and public safety. Working across inland waterways and coastline, to national parks and alpine regions, and throughout regional, rural and remote centres as well as metropolitan cities, these services protect Australian lives, property and the environment.</p></div><div className="absolute right-12 top-8 hidden size-36 animate-zoom-in place-items-center rounded-full bg-[#FBE9E4] lg:grid"><Truck size={66} strokeWidth={1.5} className="text-[#D95222]"/><Flame size={23} className="absolute right-8 top-6 text-[#D95222]"/></div></section>
    <p className="max-w-[1080px] animate-slide-up-delay text-sm leading-6 text-[#535862]">Depending on the state or territory a range of Fire and Emergency Services organisations, government departments, public entities and private companies collaborate to deliver a range of emergency management services. The Fire and Emergency Services workforce is made up of both career personnel and volunteers. Fire and Emergency Services workforces comprise three primary services, including:</p>
    <section className="grid overflow-hidden border border-[#E4D5CE] bg-[#FBF1EA] md:grid-cols-3"><div className="flex min-h-[90px] animate-card-entrance items-center justify-center gap-5 border-b border-[#E4D5CE] px-6 transition-colors duration-300 hover:bg-[#FBE7DD] md:border-b-0 md:border-r" style={{animationDelay:"0.1s"}}><Shield size={38} strokeWidth={1.5}/><strong className="text-xl">Firefighting</strong></div><div className="flex min-h-[90px] animate-card-entrance items-center justify-center gap-5 border-b border-[#E4D5CE] px-6 transition-colors duration-300 hover:bg-[#FBE7DD] md:border-b-0 md:border-r" style={{animationDelay:"0.2s"}}><Siren size={40} strokeWidth={1.5}/><strong className="max-w-[220px] text-xl leading-6">State and Territory Emergency Services</strong></div><div className="flex min-h-[90px] animate-card-entrance items-center justify-center gap-5 px-6 transition-colors duration-300 hover:bg-[#FBE7DD]" style={{animationDelay:"0.3s"}}><LifeBuoy size={40} strokeWidth={1.5}/><strong className="text-xl">Surf Life Saving</strong></div></section>
    <section ref={datapointsRef} className={datapointsVisible ? "animate-slide-up" : "opacity-0"}><h2 className="max-w-[900px] border-b border-[#DADDD4] pb-5 text-2xl font-bold leading-8">The following datapoints were identified through this Industry Overview for the Fire and Emergency Services workforces:</h2><div className="mt-5 space-y-4">{datapoints.map((item,index)=><article key={item.title} style={datapointsVisible ? {animationDelay:`${index*0.1+0.1}s`}:undefined} className={`group overflow-hidden rounded-xl border border-[#DDAA98] border-l-[8px] border-l-[#D95222] bg-[#FBECE4] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${datapointsVisible ? "animate-card-entrance" : "opacity-0"}`}><button type="button" aria-expanded={open===index} onClick={()=>setOpen(open===index?null:index)} className={`flex min-h-[60px] w-full items-center justify-between gap-5 px-5 text-left transition-colors duration-300 hover:bg-[#D65320] hover:text-white ${open===index?"bg-[#D65320] text-white":""}`}><span className="font-semibold">{item.title}</span><span className="inline-flex h-9 items-center gap-2 rounded-full bg-[#7BC900] px-5 text-xs font-semibold text-[#253100] transition-transform duration-300 group-hover:scale-105">{open===index?"Close":"Open"} <ChevronDown size={15} className={`transition-transform duration-300 ${open===index?"rotate-180":""}`}/></span></button>{open===index&&<div className="animate-content-switch border-t border-[#E4C6B8] bg-[#FAFAF0] px-6 py-5"><p className="text-sm leading-6 text-[#535862]">{item.copy}</p>{index===1&&<><p className="mt-4 text-sm leading-6 text-[#535862]">Career firefighters and emergency services employees in the 20 years from August 2005 have increased across Australian jurisdictions. While data indicates growth, the workforce continues to face operational demand, an ageing profile and occupational shortages.</p><div className="mt-5 grid gap-3 md:grid-cols-2"><div className="rounded-lg bg-[#FBECE4] px-5 py-4 text-sm font-semibold text-[#252D02] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm">Firefighter occupation (OSCA 451232) in New South Wales</div><div className="rounded-lg bg-[#FBECE4] px-5 py-4 text-sm font-semibold text-[#252D02] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm">Emergency Services Officer occupation (OSCA 451231) in New South Wales and South Australia</div></div></>}{index===0&&<div className="mt-6 grid gap-5 lg:grid-cols-2"><TrendChart title="Combined Total Yearly Fire and Other Emergency Incidents Responded to by Fire and Emergency Services Organisations Across Australia" values={demandSeries} labels={["2019–2020","2020–2021","2021–2022","2022–2023","2023–2024","2024–2025"]}/><TrendChart title="Documented Major Emergency Incidents Australia" values={[27,30,40]} labels={["2022–2023","2023–2024","2024–2025"]}/></div>}{index===1&&<div className="mt-6 grid gap-5 lg:grid-cols-2"><TrendChart title="Career Firefighters (headcount)" values={careerFirefighterSeries} labels={["2019–2020","2020–2021","2021–2022","2022–2023","2023–2024","2024–2025"]}/><TrendChart title="Total Fire Volunteers (headcount)" values={fireVolunteerSeries} labels={["2019–2020","2020–2021","2021–2022","2022–2023","2023–2024","2024–2025"]}/><TrendChart title="Career Operational SES Employees (FTE)" values={operationalSesSeries} labels={["2019–2020","2020–2021","2021–2022","2022–2023","2023–2024","2024–2025"]}/><TrendChart title="Total SES Volunteers (FTE)" values={sesVolunteerSeries} labels={["2019–2020","2020–2021","2021–2022","2022–2023","2023–2024","2024–2025"]}/></div>}{index===2&&<><div className="mt-6 grid gap-5 lg:grid-cols-2"><TrendChart title="Total Fire Volunteers (headcount)" values={fireVolunteerSeries} labels={["2019–2020","2020–2021","2021–2022","2022–2023","2023–2024","2024–2025"]}/><TrendChart title="Total SES Volunteers (FTE)" values={sesVolunteerSeries} labels={["2019–2020","2020–2021","2021–2022","2022–2023","2023–2024","2024–2025"]}/></div><p className="mt-5 max-w-[980px] text-sm leading-6 text-[#535862]">Despite relative increases in career Firefighter and operational SES members from 2019–20 to 2024–25, in absolute terms, the increases in career employees are heavily negated by the decreases experienced in volunteer cohorts. Collectively, in the five years from 2019–2020, a total of 1,130 career Firefighters and SES members were added to Australia’s emergency response capability, while a total of 10,336 volunteers were lost.</p></>}{index===3&&<><div className="mt-6 grid gap-5 lg:grid-cols-2"><BarChart title="Total Patrolling Hours of Surf Lifesavers in 2024/25 by State/Territory" values={[802226,40130,594988,99525,22190,244138,149287]} labels={["NSW","NT","QLD","SA","TAS","VIC","WA"]}/><BarChart title="Total Patrolling Hours of Career and Volunteer Surf Lifesavers in 2024–25" values={[1469465,483020]} labels={["Volunteer","Career"]}/></div><div className="mt-5 grid gap-3 md:grid-cols-2"><div className="rounded-lg border border-[#E2E2D8] bg-white px-5 py-4 text-lg text-[#535862] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D95222] hover:shadow-sm"><strong className="text-[#D65320]">30,000 km</strong> of coastline</div><div className="rounded-lg border border-[#E2E2D8] bg-white px-5 py-4 text-lg text-[#535862] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D95222] hover:shadow-sm"><strong className="text-[#D65320]">11,000</strong> individual beaches (316 patrolled beaches)</div></div></>}</div>}</article>)}</div></section>
    <section ref={sourcesRef} className={`rounded-2xl border border-[#E9EAEB] bg-white p-6 transition-all duration-300 hover:border-[#D95222] hover:shadow-md ${sourcesVisible ? "animate-slide-up" : "opacity-0"}`}><h2 className="text-2xl font-bold">Sources</h2><ol className="mt-6 space-y-3 text-xs leading-5 text-[#535862]">{sources.map((source,index)=><li key={`${index}-${source}`} style={sourcesVisible ? {animationDelay:`${index*0.06+0.1}s`}:undefined} className={`group grid grid-cols-[24px_1fr] gap-3 ${sourcesVisible ? "animate-card-entrance" : "opacity-0"}`}><span className="grid size-5 place-items-center rounded-full bg-[#78A800] text-[10px] font-bold text-white transition-transform duration-300 group-hover:scale-110">{index+43}</span><span>{source}</span></li>)}</ol></section>
    </div>
  </PublicSafetyPageShell>;
}
