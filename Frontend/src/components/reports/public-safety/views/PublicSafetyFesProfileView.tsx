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
const certificateTwo = [1377, 1962, 2210, 2680, 3325, 2922];
const certificateThree = [926, 827, 889, 1128, 1447, 1548];
const certificateTwoCompletions = [837, 730, 852, 738, 2004, 1338];
const certificateThreeCompletions = [429, 613, 667, 605, 500, 1082];
const operationsCertificateTwoEnrolments = [1741, 2676, 2789, 2678, 2748, 2288];
const operationsCertificateThreeEnrolments = [27, 32, 29, 299, 800, 861];
const operationsCertificateTwoCompletions = [546, 333, 572, 602, 1972, 1281];
const operationsCertificateThreeCompletions = [34, 18, 31, 19, 42, 38];
const sesCertificateThreeEnrolments = [204, 100, 163, 837, 3177, 1770];
const sesCertificateThreeRescueEnrolments = [69, 0, 13, 283, 1994, 1220];
const sesCertificateThreeCompletions = [53, 62, 78, 125, 95];
const sesCertificateThreeRescueCompletions = [10, 14, 14, 38, 67];
const aquaticRescueEnrolments = [7927, 3865, 2365, 1854, 2262, 2274];
const aquaticSearchRescueEnrolments = [71, 61, 56, 84, 90, 103];
const aquaticRescueCompletions = [1739, 1967, 2203, 1710, 1833, 1828];
const aquaticSearchRescueCompletions = [12, 55, 62, 40, 55, 64];

type QualificationChartMode = "enrolments" | "completions" | "operations-enrolments" | "operations-completions" | "ses-enrolments" | "ses-completions" | "surf-enrolments" | "surf-completions";

function FirefighterQualificationsChart({ mode = "enrolments" }: { mode?: QualificationChartMode }) {
  const darkValues = mode === "surf-completions" ? aquaticRescueCompletions : mode === "surf-enrolments" ? aquaticRescueEnrolments : mode === "ses-completions" ? sesCertificateThreeCompletions : mode === "ses-enrolments" ? sesCertificateThreeEnrolments : mode === "operations-completions" ? operationsCertificateTwoCompletions : mode === "operations-enrolments" ? operationsCertificateTwoEnrolments : mode === "completions" ? certificateTwoCompletions : certificateTwo;
  const lightValues = mode === "surf-completions" ? aquaticSearchRescueCompletions : mode === "surf-enrolments" ? aquaticSearchRescueEnrolments : mode === "ses-completions" ? sesCertificateThreeRescueCompletions : mode === "ses-enrolments" ? sesCertificateThreeRescueEnrolments : mode === "operations-completions" ? operationsCertificateThreeCompletions : mode === "operations-enrolments" ? operationsCertificateThreeEnrolments : mode === "completions" ? certificateThreeCompletions : certificateThree;
  const max = mode === "surf-enrolments" ? 9000 : mode === "surf-completions" ? 2500 : mode === "ses-completions" ? 140 : mode === "operations-completions" ? 2500 : 3500;
  const chartYears = mode === "ses-completions" ? years.slice(1) : years;
  const ticks = mode === "surf-enrolments" ? [0,2250,4500,6750,9000] : mode === "ses-completions" ? [0,35,70,105,140] : max===2500 ? [0,625,1250,1875,2500] : [0,875,1750,2625,3500];
  const legend = mode === "surf-enrolments" || mode === "surf-completions"
    ? ["Certificate III in Public Safety (Aquatic Rescue)", "Certificate III in Public Safety (Aquatic Search and Rescue)"]
    : mode === "ses-completions" || mode === "ses-enrolments"
    ? ["Certificate III in Public Safety (SES)", "Certificate III in Public Safety (SES Rescue)"]
    : ["Certificate II in Public Safety (Firefighting and Emergency Operations)", "Certificate III in Public Safety (Firefighting and Emergency Operations)"];
  return <svg viewBox="0 0 760 360" className="mt-5 w-full" role="img" aria-label="Primary Firefighter Recruit Qualifications enrolments and completions">
    {ticks.map((value,index)=>{const y=295-index*61;return <g key={value}><line x1="58" x2="730" y1={y} y2={y} stroke="#E3E5DE"/><text x="45" y={y+4} textAnchor="end" fontSize="10" fill="#6B6E68">{value.toLocaleString()}</text></g>})}
    {chartYears.map((year,index)=>{const groupX=(mode === "ses-completions" ? 96 : 82)+index*(mode === "ses-completions" ? 130 : 108);const darkHeight=darkValues[index]/max*244;const lightHeight=lightValues[index]/max*244;return <g key={year}><rect x={groupX} y={295-darkHeight} width="28" height={darkHeight} fill="#B72D21"/><rect x={groupX+30} y={295-lightHeight} width="28" height={lightHeight} fill="#DE735B"/><text x={groupX+14} y={285-darkHeight} textAnchor="middle" fontSize="9" fontWeight="700" fill="#252D02">{darkValues[index].toLocaleString()}</text><text x={groupX+44} y={285-lightHeight} textAnchor="middle" fontSize="9" fontWeight="700" fill="#252D02">{lightValues[index].toLocaleString()}</text><text x={groupX+29} y="319" textAnchor="middle" fontSize="10" fill="#252D02">{year}</text></g>})}
    <circle cx={mode.startsWith("ses-") || mode.startsWith("surf-") ? 205 : 195} cy="344" r="5" fill="#B72D21"/><text x={mode.startsWith("ses-") || mode.startsWith("surf-") ? 217 : 207} y="348" fontSize="9" fill="#535862">{legend[0]}</text><circle cx={mode.startsWith("ses-") || mode.startsWith("surf-") ? 450 : 500} cy="344" r="5" fill="#DE735B"/><text x={mode.startsWith("ses-") || mode.startsWith("surf-") ? 462 : 512} y="348" fontSize="9" fill="#535862">{legend[1]}</text>
  </svg>;
}

const jurisdictionData: Record<string, [string, string, string][]> = {
  NSW: [["Firefighters","3,652","21,486"],["Fire support","1,206","3,418"],["Operational SES","1,106","8,920"],["SES support","740","184"],["Patrolling surf lifesavers","–","18,430"]],
  NT: [["Firefighters","252","1,550"],["Fire support","120","486"],["Operational SES","110","916"],["SES support","84","38"],["Patrolling surf lifesavers","–","750"]],
  QLD: [["Firefighters","2,640","27,920"],["Fire support","902","4,250"],["Operational SES","802","6,810"],["SES support","505","128"],["Patrolling surf lifesavers","–","12,640"]],
  SA: [["Firefighters","1,024","11,406"],["Fire support","440","1,780"],["Operational SES","428","1,926"],["SES support","290","76"],["Patrolling surf lifesavers","–","4,210"]],
  TAS: [["Firefighters","332","4,120"],["Fire support","168","688"],["Operational SES","156","1,204"],["SES support","96","31"],["Patrolling surf lifesavers","–","1,360"]],
  VIC: [["Firefighters","3,204","20,760"],["Fire support","1,030","3,320"],["Operational SES","910","5,180"],["SES support","620","144"],["Patrolling surf lifesavers","–","9,840"]],
  WA: [["Firefighters","1,182*","16,643"],["Fire support","560*","2,053"],["Operational FES","1,182","1,652"],["SES support","658","117"],["Patrolling surf lifesavers","–","5,508"]],
};

function JurisdictionChart() {
  const states = ["NSW","NT","QLD","SA","TAS","VIC","WA"];
  const [selectedState, setSelectedState] = useState("WA");
  return <><div className="mt-4 flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6F8B24]">PCL · Presentation View</p><h3 className="mt-2 text-base font-semibold text-[#252D02]">National Police Employees by State<br/>and Territory in 2025</h3></div><div className="flex flex-wrap gap-2">{states.map(state=><button key={state} type="button" onClick={()=>setSelectedState(state)} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${selectedState===state?"bg-[#7BC900] text-[#253100]":"bg-[#FAFAF0] text-[#535862]"}`}>{state}</button>)}</div></div><div className="mt-5 grid gap-5 lg:grid-cols-[1fr_260px]"><div className="overflow-hidden rounded-lg bg-white p-3"><AustraliaInteractiveMap selectedState="NATIONAL" highlightedState={selectedState} onSelectState={setSelectedState} variant="fire" compact/></div><aside className="rounded-lg bg-[#FBE9E4] p-5"><h4 className="text-3xl font-bold text-[#252D02]">{selectedState}</h4><div className="mt-5 grid grid-cols-[1fr_64px_76px] gap-x-2 text-[10px]"><span/><strong className="pb-3 text-center">Career</strong><strong className="pb-3 text-center">Volunteer</strong>{jurisdictionData[selectedState].flatMap(([label,career,volunteer])=>[<span key={`${label}-l`} className="border-t border-[#E1CFC8] py-3">{label}</span>,<span key={`${label}-c`} className="border-t border-[#E1CFC8] py-3 text-center">{career}</span>,<span key={`${label}-v`} className="border-t border-[#E1CFC8] py-3 text-center">{volunteer}</span>])}</div></aside></div><p className="mt-4 text-[10px] text-[#535862]">LEGEND: Firefighters | Fire support | Operational SES | SES support | Patrolling surf lifesavers</p><p className="mt-3 text-[10px] text-[#535862]">Data are headcount, except where * indicates full-time equivalent.</p></>;
}

export default function PublicSafetyFesProfileView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const chartMode: QualificationChartMode = active===1 ? "completions" : active===2 ? "operations-enrolments" : active===4 ? "operations-completions" : active===5 ? "ses-enrolments" : active===6 ? "ses-completions" : active===7 ? "surf-enrolments" : active===8 ? "surf-completions" : "enrolments";
  const titleSuffix = active===0 ? " – Enrolments" : active===1 ? " – Completions" : active===2 ? " – Enrolments (Firefighting Operations)" : active===4 ? " – Completions (Firefighting Operations)" : "";
  const presentationTitle = active===3 ? "ADF Employees and Major Facilities by Location" : charts[active]+titleSuffix;
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_industry_profile" navigation={{back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`},backSecondary:{label:"Fire and Emergency Services chapter",href:`/reports/${slug}/fes`},prev:{label:"Industry-Sector Overview",href:`/reports/${slug}/fes_industry_overview`},next:{label:"Workforce Insights",href:`/reports/${slug}/fes_workforce_insights`},prevPrefix:"Previous Section:",nextPrefix:"Next Section:"}}>
    <section className="relative min-h-[190px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-6 lg:px-8"><div className="relative z-10 max-w-[980px]"><span className="inline-flex rounded-full bg-[#D95222] px-4 py-1.5 text-[10px] font-bold uppercase text-white">FES · Industry-Profile</span><h1 className="mt-4 text-[40px] font-bold leading-[48px] text-[#252D02]">Industry Profile</h1><p className="mt-2 max-w-[940px] text-xs leading-5 text-[#535862]">Select a chart title on the left to present it large on the right. Plotted Enrolments and Completion charts share the same scale so they can be compared. Colours follow the printed report.</p></div><div className="absolute right-12 top-8 hidden size-32 place-items-center rounded-full bg-[#FBE9E4] lg:grid"><Truck size={62} strokeWidth={1.5} className="text-[#D95222]"/></div></section>
    <section><h2 className="border-b border-[#D8DBD2] pb-4 text-xl font-bold uppercase text-[#252D02]">Chart Library · Select a chart to open</h2><div className="mt-6 grid items-start gap-6 lg:grid-cols-[340px_1fr]"><div className="space-y-2">{charts.map((label,index)=><button key={`${index}-${label}`} type="button" onClick={()=>setActive(index)} aria-pressed={active===index} className={`grid w-full grid-cols-[1fr_34px] items-center gap-4 rounded-lg border px-5 py-5 text-left transition-colors ${active===index?"border-[#D95222] bg-[#FBECE4]":"border-[#E9EAEB] bg-white"}`}><span><small className="mb-3 block text-[10px] font-semibold uppercase text-[#D95222]">0{index+1} · Chart · FES</small><strong className="block text-sm leading-5 text-[#252D02]">{label}</strong></span><span className={`grid size-8 place-items-center rounded-full ${active===index?"border border-[#CDD2C7] bg-white text-[#252D02]":"bg-[#7BC900] text-[#243000]"}`}><ArrowRight size={15}/></span></button>)}</div><div className="min-w-0 rounded-lg border border-[#E9EAEB] bg-white px-8 py-7"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64765A]">FES · Presentation View</p><h2 className="mt-2 max-w-[820px] text-lg font-semibold leading-6 text-[#252D02]">{presentationTitle}</h2>{active===3?<JurisdictionChart/>:<FirefighterQualificationsChart mode={chartMode}/>}<p className="mt-5 text-[10px] font-semibold uppercase text-[#6F8B24]">Source: {active===3?"Defence Annual Report 2024–25, 2025":"NCVER, Total VET students and courses, 2025"}</p></div></div></section>
  </PublicSafetyPageShell>;
}
