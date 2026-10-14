"use client";

import { BarChart3, BrainCircuit, Cog, Lightbulb, Search, Users } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const sources = [
  "Surf Life Saving Australia (SLSA), 2022/23 Annual Report, SLSA, 2023, p 100; SLSA, 2023/24 Annual Report, SLSA, 2024, p 108; SLSA, 2024/25 Annual Report, SLSA, 2025, p 115.",
  "National Centre for Vocational Education Research (NCVER), Total VET students and courses 2024: DataBuilder, [data set], NCVER, 2025, accessed 17 December 2025.",
];

const basicLifeSupport = ["allergic reaction", "anaphylaxis", "asthma", "non-life-threatening and life-threatening bleeding", "cardiac conditions, including chest pain", "choking", "shock", "stroke"];
const firstAid = ["All conditions in HLTAID010 plus:", "drowning", "envenomation – all current treatments", "eye injuries and diabetes", "fractures, dislocations, strains and sprains", "head, neck and spinal injuries", "hypothermia and hyperthermia", "minor wounds and nosebleeds", "poisoning and burns"];

function IconCluster() {
  return <div className="absolute right-8 top-5 hidden h-[150px] w-[330px] lg:block"><span className="absolute left-2 top-16 grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Lightbulb size={26}/></span><span className="absolute left-16 top-5 grid size-12 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Users size={21}/></span><span className="absolute left-[125px] top-0 grid size-20 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Search size={35}/></span><span className="absolute left-[195px] top-[78px] grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Cog size={26}/></span><span className="absolute right-0 top-12 grid size-16 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><BarChart3 size={31}/></span><span className="absolute right-7 top-0 grid size-12 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><BrainCircuit size={22}/></span></div>;
}

function Insight({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-[#F0D9D1] border-l-[8px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-white text-[#719926]"><Users size={20}/></span><strong className="text-sm text-[#252D02]">Industry Insight</strong></div><p className="mt-4 text-xs leading-5 text-[#535862]">{children}</p></div>;
}

function TreatmentsChart() {
  const values = [21828, 25262, 34394];
  const years = ["2022–2023", "2023–2024", "2024–2025"];
  const points = values.map((value, index) => ({ x: 66 + index * 222, y: 246 - (value - 20000) / 20000 * 201 }));
  return <figure className="rounded-lg border border-[#E9EAEB] bg-white p-5">
    <figcaption className="text-xs font-bold text-[#252D02]">First Aid Treatments Administered by Surf Lifesavers</figcaption>
    <svg viewBox="0 0 560 300" role="img" aria-label="First aid treatments: 21,828 in 2022–2023, 25,262 in 2023–2024, and 34,394 in 2024–2025" className="mt-4 h-auto w-full">
      <g stroke="#DADDD4" strokeWidth="1"><line x1="54" y1="45" x2="530" y2="45"/><line x1="54" y1="112" x2="530" y2="112"/><line x1="54" y1="179" x2="530" y2="179"/><line x1="54" y1="246" x2="530" y2="246"/></g>
      <g fill="#74786F" fontSize="11"><text x="5" y="49">40,000</text><text x="5" y="116">33,333</text><text x="5" y="183">26,667</text><text x="5" y="250">20,000</text></g>
      <polyline points={points.map(({ x, y }) => `${x},${y}`).join(" ")} fill="none" stroke="#A53A2D" strokeWidth="3"/>
      {points.map(({ x, y }, index) => <g key={years[index]}><circle cx={x} cy={y} r="5" fill="#A53A2D"/><text x={x} y={y - 15} textAnchor="middle" fill="#A53A2D" fontSize="12" fontWeight="700">{values[index].toLocaleString()}</text><text x={x} y="282" textAnchor="middle" fill="#74786F" fontSize="11">{years[index]}</text></g>)}
    </svg>
  </figure>;
}

export default function PublicSafetyFesSurfLifeSavingFirstAidView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_disaster_recovery" navigation={{ back:{label:"Workforce Insights",href:`/reports/${slug}/fes_workforce_insights`}, backSecondary:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`}, prev:{label:"Workforce Insights",href:`/reports/${slug}/fes_workforce_insights`}, next:{label:"3. Hazardous Materials",href:`/reports/${slug}/fes_hazardous_materials`}, prevPrefix:"Previous Section:", nextPrefix:"Next Section:" }}>
    <section className="relative min-h-[190px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-7 lg:px-8"><div className="relative z-10 max-w-[920px]"><span className="inline-flex rounded-full bg-[#D95222] px-4 py-1.5 text-[10px] font-bold text-white">Theme Two. Surf Life Saving First Aid. Insight Four</span><h1 className="mt-5 text-[38px] font-bold leading-[46px] text-[#252D02]">4. Surf Life Saving First Aid. Insight Four.</h1><p className="mt-4 max-w-[980px] text-xs leading-5 text-[#535862]">The HLTAID010 unit of competency is an entry-level first aid training product that is no longer meeting the operational needs for volunteer surf lifesavers.</p></div><IconCluster/></section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-6 lg:p-8"><h2 className="border-b border-[#E9EAEB] pb-5 text-2xl font-bold text-[#252D02]">First aid treatments by volunteer surf lifesavers</h2><div className="mt-7 grid gap-7 lg:grid-cols-[0.85fr_1.15fr]"><div className="space-y-5 text-xs leading-5 text-[#535862]"><p>In 2024–25, volunteer surf lifesavers administered six times as many first aid treatments compared to rescue operations. The number of yearly first aid treatments has been increasing year-on-year since 2022–23.<sup>63</sup> This highlights a distinct capability requirement for volunteers.</p><p>The importance of this qualification is supported by its high utilisation, with more than 1,500 completions per year since 2020.<sup>64</sup> The principal first aid unit of competency in this qualification is HLTAID010 Provide Basic Emergency Life Support.</p><p>Stakeholders identified that the HLTAID011 Provide First Aid unit of competency is considered a more complete resource for providing the necessary first aid outcomes for volunteer surf lifesavers.</p></div><TreatmentsChart/></div><div className="mt-7"><Insight>The HLTAID010 unit of competency is an entry-level first aid training product that is no longer meeting the operational requirements for volunteer surf lifesavers.</Insight></div><h3 className="mt-7 border-b border-[#E9EAEB] pb-4 text-lg font-bold text-[#252D02]">HLTAID010 and HLTAID011 compared</h3><h4 className="mt-5 text-sm font-bold text-[#252D02]">Medical conditions and injuries covered</h4><div className="mt-4 grid overflow-hidden rounded-lg border border-[#E9EAEB] md:grid-cols-2"><div className="border-b border-[#E9EAEB] md:border-b-0 md:border-r"><div className="bg-[#FBECE7] px-5 py-3 text-xs font-semibold text-[#D95222]">HLTAID010 Provide Basic Emergency Life Support</div><ul className="ml-9 list-disc space-y-1 px-5 py-4 text-xs leading-5 text-[#535862]">{basicLifeSupport.map(item=><li key={item}>{item}</li>)}</ul></div><div><div className="bg-[#FBECE7] px-5 py-3 text-xs font-semibold text-[#D95222]">HLTAID011 Provide First Aid</div><ul className="ml-9 list-disc space-y-1 px-5 py-4 text-xs leading-5 text-[#535862]">{firstAid.map(item=><li key={item}>{item}</li>)}</ul></div></div></section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-6 lg:p-8"><h2 className="text-xl font-bold text-[#252D02]">Sources</h2><ul className="mt-5 space-y-3">{sources.map((source,index)=><li key={source} className="flex gap-3 text-[11px] leading-5 text-[#535862]"><span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-[#7F9C37] text-[8px] text-white">{63+index}</span><span>{source}</span></li>)}</ul></section>
  </PublicSafetyPageShell>;
}
