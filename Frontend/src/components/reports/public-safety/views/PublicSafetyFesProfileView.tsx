"use client";

import { ArrowRight, Truck } from "lucide-react";
import { useState } from "react";
import AustraliaInteractiveMap from "@/components/common/AustraliaInteractiveMap";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const charts = [
  "Yearly Student Enrolments and Completions for Primary Firefighter Recruit Qualifications (Career and Volunteer)",
  "Yearly Student Enrolments and Completions for Primary Firefighter Recruit Qualifications (Career and Volunteer)",
  "Yearly Student Enrolments and Completions for Primary Firefighter Recruit Qualifications (Career and Volunteer)",
  "Fire and Emergency Services Workforce by Jurisdiction",
  "Yearly Student Enrolments and Completions for Primary Firefighter Recruit Qualifications (Career and Volunteer)",
  "Yearly Student Enrolments and Completions for SES Qualifications – Enrolments",
  "Yearly Student Enrolments and Completions for SES Qualifications – Completions",
  "Yearly Student Enrolments and Completions for Surf Life Saving Qualifications – Enrolments",
  "Yearly Student Enrolments and Completions for Surf Life Saving Qualifications – Completions",
];

const years = ["2019", "2020", "2021", "2022", "2023", "2024"];
const certificateTwo = [1377, 1962, 2210, 2652, 3252, 2822];
const certificateThree = [926, 827, 889, 1120, 1447, 1546];
const certificateTwoCompletions = [837, 730, 852, 735, 2004, 1338];
const certificateThreeCompletions = [429, 613, 687, 585, 590, 1052];
const operationsCertificateTwoEnrolments = [1741, 2576, 2769, 2675, 2748, 2288];
const operationsCertificateThreeEnrolments = [37, 32, 22, 229, 800, 881];
const operationsCertificateTwoCompletions = [546, 330, 572, 602, 1972, 1221];
const operationsCertificateThreeCompletions = [34, 15, 31, 19, 42, 50];
const sesCertificateThreeEnrolments = [204, 100, 160, 837, 3177, 1770];
const sesCertificateThreeRescueEnrolments = [99, 1, 13, 283, 1994, 1329];
const sesCertificateThreeCompletions = [50, 62, 79, 125, 95];
const sesCertificateThreeRescueCompletions = [18, 14, 16, 36, 67];
const aquaticRescueEnrolments = [7927, 3885, 2365, 1854, 2262, 2274];
const aquaticSearchRescueEnrolments = [71, 61, 56, 84, 90, 103];
const aquaticRescueCompletions = [1739, 1957, 2203, 1710, 1833, 1828];
const aquaticSearchRescueCompletions = [12, 55, 62, 48, 55, 84];

type QualificationChartMode = "enrolments" | "completions" | "operations-enrolments" | "operations-completions" | "ses-enrolments" | "ses-completions" | "surf-enrolments" | "surf-completions";

function FirefighterQualificationsChart({ mode = "enrolments" }: { mode?: QualificationChartMode }) {
  const darkValues = mode === "surf-completions" ? aquaticRescueCompletions : mode === "surf-enrolments" ? aquaticRescueEnrolments : mode === "ses-completions" ? sesCertificateThreeCompletions : mode === "ses-enrolments" ? sesCertificateThreeEnrolments : mode === "operations-completions" ? operationsCertificateTwoCompletions : mode === "operations-enrolments" ? operationsCertificateTwoEnrolments : mode === "completions" ? certificateTwoCompletions : certificateTwo;
  const lightValues = mode === "surf-completions" ? aquaticSearchRescueCompletions : mode === "surf-enrolments" ? aquaticSearchRescueEnrolments : mode === "ses-completions" ? sesCertificateThreeRescueCompletions : mode === "ses-enrolments" ? sesCertificateThreeRescueEnrolments : mode === "operations-completions" ? operationsCertificateThreeCompletions : mode === "operations-enrolments" ? operationsCertificateThreeEnrolments : mode === "completions" ? certificateThreeCompletions : certificateThree;
  const max = mode === "surf-enrolments" ? 9000 : mode === "ses-completions" ? 140 : ["completions", "operations-completions", "surf-completions"].includes(mode) ? 2500 : 3500;
  const chartYears = mode === "ses-completions" ? years.slice(1) : years;
  const ticks = Array.from({ length: mode === "surf-enrolments" ? 7 : mode === "ses-completions" ? 8 : max === 2500 ? 6 : 8 }, (_, index) => index * (mode === "surf-enrolments" ? 1500 : mode === "ses-completions" ? 20 : 500));
  const legend = mode === "surf-enrolments" || mode === "surf-completions"
    ? ["Certificate II in Public Safety (Aquatic Rescue)", "Certificate III in Public Safety (Aquatic Search and Rescue)"]
    : mode === "ses-completions" || mode === "ses-enrolments"
    ? ["Certificate II in Public Safety (SES)", "Certificate III in Public Safety (SES Rescue)"]
    : mode.startsWith("operations-")
    ? ["Certificate II in Public Safety (Firefighting Operations)", "Certificate III in Public Safety (Firefighting Operations)"]
    : ["Certificate II in Public Safety (Firefighting and Emergency Operations)", "Certificate III in Public Safety (Firefighting and Emergency Operations)"];
  return <><svg viewBox="0 0 760 330" className="mt-5 w-full" role="img" aria-label={`${mode} qualification chart`}>
    {ticks.map((value)=>{const y=295-value/max*244;return <g key={value}><line x1="58" x2="730" y1={y} y2={y} stroke="#E3E5DE"/><text x="45" y={y+4} textAnchor="end" fontSize="10" fill="#6B6E68">{value.toLocaleString()}</text></g>})}
    {chartYears.map((year,index)=>{const groupX=(mode === "ses-completions" ? 96 : 82)+index*(mode === "ses-completions" ? 130 : 108);const darkHeight=darkValues[index]/max*244;const lightHeight=lightValues[index]/max*244;return <g key={year}><rect x={groupX} y={295-darkHeight} width="28" height={darkHeight} fill="#B72D21"/><rect x={groupX+30} y={295-lightHeight} width="28" height={lightHeight} fill="#DE735B"/><text x={groupX+14} y={285-darkHeight} textAnchor="middle" fontSize="9" fontWeight="700" fill="#252D02">{darkValues[index].toLocaleString()}</text><text x={groupX+44} y={285-lightHeight} textAnchor="middle" fontSize="9" fontWeight="700" fill="#252D02">{lightValues[index].toLocaleString()}</text><text x={groupX+29} y="319" textAnchor="middle" fontSize="10" fill="#252D02">{year}</text></g>})}
  </svg><div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-[#535862]">{legend.map((label, index) => <span key={label} className="inline-flex items-center gap-2"><i className={`size-2.5 shrink-0 rounded-full ${index === 0 ? "bg-[#B72D21]" : "bg-[#DE735B]"}`} />{label}</span>)}</div></>;
}

const jurisdictionData: Record<string, [string, string, string][]> = {
  ACT: [["Firefighters","438*","991"],["Fire support","145*","–"],["Operational SES","11","438"],["SES support","–","–"],["Patrolling surf lifesavers","–","–"]],
  NSW: [["Firefighters","5,756*","50,520"],["Fire support","1,845*","24,429"],["Operational SES","634","11,329"],["SES support","–","–"],["Patrolling surf lifesavers","–","21,603"]],
  NT: [["Firefighters","269*","646"],["Fire support","84*","–"],["Operational SES","20","204"],["SES support","4","–"],["Patrolling surf lifesavers","–","113"]],
  QLD: [["Firefighters","3,125*","10,900"],["Fire support","1,091*","16,765"],["Operational SES","92","5,404"],["SES support","101","–"],["Patrolling surf lifesavers","–","9,398"]],
  SA: [["Firefighters","945*","10,720"],["Fire support","104*","1,990"],["Operational SES","71","1,747"],["SES support","7","–"],["Patrolling surf lifesavers","–","2,724"]],
  TAS: [["Firefighters","351*","3,679"],["Fire support","209*","800"],["Operational SES","10","740"],["SES support","38","–"],["Patrolling surf lifesavers","–","796"]],
  VIC: [["Firefighters","6,323*","28,753"],["Fire support","2,242*","23,043"],["Operational SES","117","3,825"],["SES support","170","612"],["Patrolling surf lifesavers","–","6,165"]],
  WA: [["Firefighters","1,182*","14,643"],["Fire support","650*","2,163"],["Operational SES","1,182","1,652"],["SES support","650","117"],["Patrolling surf lifesavers","–","5,508"]],
};

function JurisdictionChart() {
  const states = ["ACT","NSW","NT","QLD","SA","TAS","VIC","WA"];
  const [selectedState, setSelectedState] = useState("WA");
  return <><div className="mt-4 flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6F8B24]">FES · Presentation View</p><h3 className="mt-2 text-base font-semibold text-[#252D02]">Fire and Emergency Services Workforce by Jurisdiction</h3></div><div className="flex flex-wrap gap-2">{states.map(state=><button key={state} type="button" onClick={()=>setSelectedState(state)} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${selectedState===state?"bg-[#7BC900] text-[#253100]":"bg-[#FAFAF0] text-[#535862]"}`}>{state}</button>)}</div></div><div className="mt-5 grid gap-5 lg:grid-cols-[1fr_260px]"><div className="overflow-hidden rounded-lg bg-white p-3"><AustraliaInteractiveMap selectedState="NATIONAL" highlightedState={selectedState} onSelectState={setSelectedState} variant="fire" compact/></div><aside className="rounded-lg bg-[#FBE9E4] p-5"><h4 className="text-3xl font-bold text-[#252D02]">{selectedState}</h4><div className="mt-5 grid grid-cols-[1fr_64px_76px] gap-x-2 text-[10px]"><span/><strong className="pb-3 text-center">Career</strong><strong className="pb-3 text-center">Volunteer</strong>{jurisdictionData[selectedState].flatMap(([label,career,volunteer])=>[<span key={`${label}-l`} className="border-t border-[#E1CFC8] py-3">{label}</span>,<span key={`${label}-c`} className="border-t border-[#E1CFC8] py-3 text-center">{career}</span>,<span key={`${label}-v`} className="border-t border-[#E1CFC8] py-3 text-center">{volunteer}</span>])}</div></aside></div><p className="mt-4 text-[10px] text-[#535862]">LEGEND: Firefighters | Fire support | Operational SES | SES support | Patrolling surf lifesavers</p><p className="mt-3 text-[10px] text-[#535862]">Data are headcount, except where * indicates full-time equivalent.</p></>;
}

export default function PublicSafetyFesProfileView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const chartMode: QualificationChartMode = active===1 ? "completions" : active===2 ? "operations-enrolments" : active===4 ? "operations-completions" : active===5 ? "ses-enrolments" : active===6 ? "ses-completions" : active===7 ? "surf-enrolments" : active===8 ? "surf-completions" : "enrolments";
  const titleSuffix = active===0 ? " – Enrolments" : active===1 ? " – Completions" : active===2 ? " – Enrolments (Firefighting Operations)" : active===4 ? " – Completions (Firefighting Operations)" : "";
  const presentationTitle = active===3 ? "Fire and Emergency Services Workforce by Jurisdiction" : charts[active]+titleSuffix;
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_industry_profile" navigation={{back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`},backSecondary:{label:"Fire and Emergency Services chapter",href:`/reports/${slug}/fes`},prev:{label:"Industry-Sector Overview",href:`/reports/${slug}/fes_industry_overview`},next:{label:"Workforce Insights",href:`/reports/${slug}/fes_workforce_insights`},prevPrefix:"Previous Section:",nextPrefix:"Next Section:"}}>
    <section className="relative min-h-[190px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-6 lg:px-8"><div className="relative z-10 max-w-[980px]"><span className="inline-flex rounded-full bg-[#D95222] px-4 py-1.5 text-[10px] font-bold uppercase text-white">FES · Industry-Profile</span><h1 className="mt-4 text-[40px] font-bold leading-[48px] text-[#252D02]">Industry Profile</h1><p className="mt-2 max-w-[940px] text-xs leading-5 text-[#535862]">Select a chart title on the left to present it large on the right. Plotted Enrolments and Completion charts share the same scale so they can be compared. Colours follow the printed report.</p></div><div className="absolute right-12 top-8 hidden size-32 place-items-center rounded-full bg-[#FBE9E4] lg:grid"><Truck size={62} strokeWidth={1.5} className="text-[#D95222]"/></div></section>
    <section><h2 className="border-b border-[#D8DBD2] pb-4 text-xl font-bold uppercase text-[#252D02]">Chart Library · Select a chart to open</h2><div className="mt-6 grid items-start gap-6 lg:grid-cols-[340px_1fr]"><div className="space-y-2">{charts.map((label,index)=><button key={`${index}-${label}`} type="button" onClick={()=>setActive(index)} aria-pressed={active===index} className={`grid w-full grid-cols-[1fr_34px] items-center gap-4 rounded-lg border px-5 py-5 text-left transition-colors ${active===index?"border-[#D95222] bg-[#FBECE4]":"border-[#E9EAEB] bg-white"}`}><span><small className="mb-3 block text-[10px] font-semibold uppercase text-[#D95222]">0{index+1} · Chart · FES</small><strong className="block text-sm leading-5 text-[#252D02]">{label}</strong></span><span className={`grid size-8 place-items-center rounded-full ${active===index?"border border-[#CDD2C7] bg-white text-[#252D02]":"bg-[#7BC900] text-[#243000]"}`}><ArrowRight size={15}/></span></button>)}</div><div className="min-w-0 rounded-lg border border-[#E9EAEB] bg-white px-8 py-7"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64765A]">FES · Presentation View</p><h2 className="mt-2 max-w-[820px] text-lg font-semibold leading-6 text-[#252D02]">{presentationTitle}{(active===0 || active===1 || active===2 || active===4) && <sup>52</sup>}</h2>{active===3?<JurisdictionChart/>:<FirefighterQualificationsChart mode={chartMode}/>}<p className="mt-5 text-[10px] font-semibold uppercase text-[#6F8B24]">Source: {active===3?"Report on Government Services, Emergency services for fire and other events, 2026; Surf Life Saving Australia, 2024/25 Annual Report, 2025":"NCVER, Total VET students and courses: VOCSTATS, 2026"}</p>{(active===0 || active===1 || active===2 || active===4) && <p className="mt-2 text-[10px] leading-4 text-[#535862]">52 It should be noted that for several Fire and Emergency Services organisations recruit training focuses on completions of Units of Competency rather than full qualifications.</p>}</div></div></section>
  </PublicSafetyPageShell>;
}
