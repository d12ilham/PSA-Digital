"use client";

import { BarChart3, BrainCircuit, Cog, Lightbulb, Search, Users } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const sources = [
  "Productivity Commission, Emergency services for fire and other events – Table 9A.6 [data set], Productivity Commission, 2026, accessed 17 February 2026.",
  "Training.gov.au, Unit of competency – PUASAR025 Undertake confined space rescue, Australian Government, 2025, accessed 13 January 2026.",
];

function IconCluster() {
  return <div className="absolute right-8 top-5 hidden h-[150px] w-[330px] lg:block"><span className="absolute left-2 top-16 grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Lightbulb size={26}/></span><span className="absolute left-16 top-5 grid size-12 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Users size={21}/></span><span className="absolute left-[125px] top-0 grid size-20 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Search size={35}/></span><span className="absolute left-[195px] top-[78px] grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Cog size={26}/></span><span className="absolute right-0 top-12 grid size-16 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><BarChart3 size={31}/></span><span className="absolute right-7 top-0 grid size-12 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><BrainCircuit size={22}/></span></div>;
}

function EnrolmentsChart() {
  const series = [
    { code: "PUAFIR306", start: 1010, end: 2810, color: "#A53A2D" },
    { code: "PUAFIR308", start: 850, end: 2320, color: "#D95222" },
    { code: "PUAFIR324", start: 1115, end: 3130, color: "#71832D" },
  ];
  const y = (value: number) => 240 - value / 3500 * 190;
  return <figure className="rounded-lg border border-[#E9EAEB] bg-white p-5">
    <figcaption className="text-xs font-bold leading-5 text-[#252D02]">Yearly Enrolments for all Three Hazardous Materials Units of Competency Since 2020</figcaption>
    <svg viewBox="0 0 580 285" role="img" aria-label="Verified 2020 and 2024 enrolments for PUAFIR306, PUAFIR308 and PUAFIR324; intermediate years are not shown" className="mt-4 h-auto w-full">
      {[0, 1000, 2000, 3000].map((tick) => <g key={tick}><line x1="55" y1={y(tick)} x2="550" y2={y(tick)} stroke="#DADDD4"/><text x="45" y={y(tick) + 4} textAnchor="end" fill="#74786F" fontSize="11">{tick.toLocaleString()}</text></g>)}
      {["2020", "2021", "2022", "2023", "2024"].map((year, index) => <text key={year} x={66 + index * 120} y="270" textAnchor="middle" fill="#74786F" fontSize="11">{year}</text>)}
      {series.map((item) => <g key={item.code} fill={item.color}><circle cx="66" cy={y(item.start)} r="5"/><circle cx="546" cy={y(item.end)} r="5"/></g>)}
    </svg>
    <div className="mt-3 space-y-1.5 text-[10px] text-[#535862]">{series.map((item) => <div key={item.code} className="grid grid-cols-[12px_1fr_auto_auto] items-center gap-2"><i className="size-2.5 rounded-full" style={{ backgroundColor: item.color }}/><strong>{item.code}</strong><span>2020: {item.start.toLocaleString()}</span><span>2024: {item.end.toLocaleString()}</span></div>)}</div>
    <p className="mt-3 text-[10px] leading-4 text-[#535862]">2021–2023 values are not shown pending the approved source dataset.</p>
  </figure>;
}

export default function PublicSafetyFesHazardousMaterialsView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_hazardous_materials" navigation={{ back:{label:"Workforce Insights",href:`/reports/${slug}/fes_workforce_insights`}, backSecondary:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`}, prev:{label:"2. Surf Life Saving First Aid",href:`/reports/${slug}/fes_surf_life_saving_first_aid`}, next:{label:"FES Workforce Strategies",href:`/reports/${slug}/fes_workforce_strategies`}, prevPrefix:"Previous Section:", nextPrefix:"Next Section:" }}>
    <section className="relative min-h-[190px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-7 lg:px-8"><div className="relative z-10 max-w-[920px]"><span className="inline-flex rounded-full bg-[#D95222] px-4 py-1.5 text-[10px] font-bold text-white">Theme Three. Hazardous Materials. Insight Five</span><h1 className="mt-5 text-[38px] font-bold leading-[46px] text-[#252D02]">5. Hazardous Materials. Insight Five.</h1><p className="mt-4 max-w-[980px] text-xs leading-5 text-[#535862]">Incidents involving hazardous materials are becoming increasingly important while the current training is limiting some Fire and Emergency Services organisations&apos; ability to deliver this type of service.</p></div><IconCluster/></section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-6 lg:p-8">
      <h2 className="border-b border-[#E9EAEB] pb-5 text-2xl font-bold text-[#252D02]">Hazardous materials incidents and training</h2>
      <div className="mt-7 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="text-xs leading-5 text-[#535862]">
          <p>In 2024–25, firefighting organisations responded to 11,982 incidents relating to hazardous materials.<sup>65</sup> Training is enabled through three units of competency in the PUA Public Safety Training Package.</p>
          <div className="mt-5 space-y-3"><div className="rounded bg-[#FBECE7] px-5 py-4 font-medium text-[#252D02]">PUAFIR306 Identify, detect and monitor hazardous materials at an incident</div><div className="rounded bg-[#FBECE7] px-5 py-4 font-medium text-[#252D02]">PUAFIR308 Employ personal protection at a hazardous materials incident</div><div className="rounded bg-[#FBECE7] px-5 py-4 font-medium text-[#252D02]">PUAFIR324 Render hazardous materials incidents safe</div></div>
          <p className="mt-5">The importance of these three units of competency is supported by annual enrolment data, with all three products having high use rates since 2020.</p>
        </div>
        <EnrolmentsChart/>
      </div>
      <h2 className="mt-8 border-b border-[#E9EAEB] pb-5 text-2xl font-bold text-[#252D02]">PUAFIR306 as a prerequisite unit of competency</h2>
      <div className="mt-6 space-y-5 text-xs leading-5 text-[#535862]">
        <p>Due to evolving technology and access to different equipment across organisations, stakeholders indicated that some aspects of PUAFIR306 Identify, detect and monitor hazardous materials at an incident may require updating. Specifically, the unit may require an update related to the use of gas detection equipment and certain personal protective equipment (PPE) and personal protective clothing (PPC), which, as a prerequisite unit, may limit access to other training units.</p>
        <p>In its current form, this unit of competency excludes some firefighting organisations that either use different equipment or do not have access to specific equipment detailed in the unit of competency.</p>
        <p>Additionally, PUAFIR306 is a prerequisite unit of competency in PUASAR025 Undertake confined space rescue, a highly utilised unit across both the Mining and Public Safety industries.<sup>66</sup> PUASAR025 is utilised across all states and territories, with 8,871 subject enrolments in 2024 alone.</p>
        <p>Some industry-sector representatives expressed challenges with prescriptive requirements in the units of competency that may affect agencies&apos; ability to deliver and award these qualifications. Terminology and assessment conditions were also identified as potential limiting factors.</p>
      </div>
      <div className="mt-7 rounded-lg border border-[#F0D9D1] border-l-[8px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-white text-[#719926]"><Users size={20}/></span><strong className="text-sm text-[#252D02]">Industry Insight</strong></div><p className="mt-4 text-xs leading-5 text-[#535862]">While response to incidents involving hazardous materials is becoming increasingly important, the specificity of equipment requirements in current training may be limiting access by Fire and Emergency Services organisations to other training units, impacting national response capabilities.</p></div>
      <div className="mt-6 space-y-4 text-xs leading-5 text-[#535862]"><p>Recent consultation with stakeholders highlighted the importance of the link between the two units of competency and advised that updates to this hazardous materials unit must carefully consider downstream impacts on other training products.</p><p>Further consensus must be built to ensure proposed training solutions meet the needs of all industry representatives, including employee organisations.</p></div>
    </section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-6 lg:p-8"><h2 className="text-xl font-bold text-[#252D02]">Sources</h2><ul className="mt-5 space-y-3">{sources.map((source,index)=><li key={source} className="flex gap-3 text-[11px] leading-5 text-[#535862]"><span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-[#7F9C37] text-[8px] text-white">{65+index}</span><span>{source}</span></li>)}<li className="text-[11px] leading-5 text-[#535862]">Chart source: NCVER, Total VET students and courses 2024: DataBuilder, [subject enrolments data set], 2025, accessed 17 December 2025.</li></ul></section>
  </PublicSafetyPageShell>;
}
