"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AustraliaInteractiveMap from "@/components/common/AustraliaInteractiveMap";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import chapter from "./PublicSafetyDefenceView.module.css";
import layout from "./PublicSafetyDefenceStrategyUpdatesView.module.css";
import styles from "./PublicSafetyFesProfileView.module.css";

const firefighterTitle = "Yearly Student Enrolments and Completions for Primary Firefighter Recruit Qualifications (Career and Volunteer)";
const charts = [
  firefighterTitle,
  firefighterTitle,
  "Fire and Emergency Services Workforce by Jurisdiction",
  "Yearly Student Enrolments and Completions for SES Qualifications",
  "Yearly Student Enrolments and Completions for Surf Life Saving Qualifications",
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

function FirefighterQualificationsChart({ mode, title, height, note }: { mode: QualificationChartMode; title: string; height: number; note: boolean }) {
  const darkValues = mode === "surf-completions" ? aquaticRescueCompletions : mode === "surf-enrolments" ? aquaticRescueEnrolments : mode === "ses-completions" ? sesCertificateThreeCompletions : mode === "ses-enrolments" ? sesCertificateThreeEnrolments : mode === "operations-completions" ? operationsCertificateTwoCompletions : mode === "operations-enrolments" ? operationsCertificateTwoEnrolments : mode === "completions" ? certificateTwoCompletions : certificateTwo;
  const lightValues = mode === "surf-completions" ? aquaticSearchRescueCompletions : mode === "surf-enrolments" ? aquaticSearchRescueEnrolments : mode === "ses-completions" ? sesCertificateThreeRescueCompletions : mode === "ses-enrolments" ? sesCertificateThreeRescueEnrolments : mode === "operations-completions" ? operationsCertificateThreeCompletions : mode === "operations-enrolments" ? operationsCertificateThreeEnrolments : mode === "completions" ? certificateThreeCompletions : certificateThree;
  const max = mode === "surf-enrolments" ? 9000 : mode === "ses-completions" ? 140 : ["completions", "operations-completions", "surf-completions"].includes(mode) ? 2500 : 3500;
  const chartYears = mode === "ses-completions" ? years.slice(1) : years;
  const ticks = Array.from({ length: 5 }, (_, index) => max * index / 4);
  const legend = mode === "surf-enrolments" || mode === "surf-completions"
    ? ["Certificate II in Public Safety (Aquatic Rescue)", "Certificate III in Public Safety (Aquatic Search and Rescue)"]
    : mode === "ses-completions" || mode === "ses-enrolments"
    ? ["Certificate II in Public Safety (SES)", "Certificate III in Public Safety (SES Rescue)"]
    : mode.startsWith("operations-")
    ? ["Certificate II in Public Safety (Firefighting Operations)", "Certificate III in Public Safety (Firefighting Operations)"]
    : ["Certificate II in Public Safety (Firefighting and Emergency Operations)", "Certificate III in Public Safety (Firefighting and Emergency Operations)"];
  return <figure className={styles.chart} style={{ "--chart-height": `${height}px` } as React.CSSProperties}>
    <div><p className={styles.eyebrow}>FES · Presentation View</p><h3>{title}{note && <sup>52</sup>}</h3></div>
    <svg viewBox="0 0 960 345" role="img" aria-label={`${title}. ${chartYears.map((year, index) => `${year}: ${darkValues[index]}, ${lightValues[index]}`).join("; ")}`}>
    {ticks.map((value)=>{const y=295-value/max*244;return <g key={value}><line x1="58" x2="956" y1={y} y2={y} stroke="#E3E5DE"/><text x="45" y={y+4} textAnchor="end" fontSize="11" fill="#6B6E68">{value.toLocaleString()}</text></g>})}
    {chartYears.map((year,index)=>{const groupX=58+(index+0.5)*898/chartYears.length-29;const darkHeight=darkValues[index]/max*244;const lightHeight=lightValues[index]/max*244;return <g key={year} className={styles.barGroup} style={{ animationDelay: `${index * 65}ms` }}><rect className="animate-industry-chart-bar" x={groupX} y={295-darkHeight} width="28" height={darkHeight} fill="#ad271b"/><rect className="animate-industry-chart-bar" x={groupX+30} y={295-lightHeight} width="28" height={lightHeight} fill="#de6b52"/><text x={groupX+14} y={285-darkHeight} textAnchor="middle" fontSize="11" fontWeight="700" fill="#252D02">{darkValues[index].toLocaleString()}</text><text x={groupX+44} y={285-lightHeight} textAnchor="middle" fontSize="11" fontWeight="700" fill="#252D02">{lightValues[index].toLocaleString()}</text><text x={groupX+29} y="319" textAnchor="middle" fontSize="11" fill="#252D02">{year}</text></g>})}
  </svg><div className={styles.legend}>{legend.map((label, index) => <span key={label} className="inline-flex items-center gap-2"><i className={`size-2.5 shrink-0 rounded-full ${index === 0 ? "bg-[#ad271b]" : "bg-[#de6b52]"}`} />{label}</span>)}</div><figcaption>Source: NCVER, Total VET students and courses: VOCSTATS, 2026</figcaption></figure>;
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
  const [selectedState, setSelectedState] = useState("WA");
  return <section className={`${styles.mapCard} animate-content-switch`} aria-label={charts[2]}>
    <header className={styles.mapHeader}>
      <h3>{charts[2]}</h3>
      <div className={styles.states} aria-label="Select a state or territory">
        {Object.keys(jurisdictionData).map(state => (
          <button key={state} type="button" aria-pressed={selectedState === state} onClick={() => setSelectedState(state)}>{state}</button>
        ))}
      </div>
    </header>
    <div className={styles.mapGrid}>
      <div className={styles.map}>
        <AustraliaInteractiveMap selectedState="NATIONAL" highlightedState={selectedState} onSelectState={setSelectedState} variant="fire" compact />
      </div>
      <aside className={styles.stateData}>
        <h4>{selectedState}</h4>
        <table key={selectedState} className="animate-content-switch">
          <thead><tr><th scope="col"><span className="sr-only">Category</span></th><th scope="col">Career</th><th scope="col">Volunteer</th></tr></thead>
          <tbody>{jurisdictionData[selectedState].map(([label, career, volunteer]) => (
            <tr key={label}><th scope="row">{label}</th><td>{career}</td><td>{volunteer}</td></tr>
          ))}</tbody>
        </table>
      </aside>
    </div>
    <p>LEGEND: Firefighters | Fire support | Operational SES | SES support | Patrolling surf lifesavers</p>
    <p><strong>Data are headcount except where * indicates full-time equivalent.</strong></p>
    <p className={styles.mapSource}>SOURCE: Report on Government Services, Emergency services for fire and other events, 2026; Surf Life Saving Australia, 2024/25 Annual Report, 2025.</p>
  </section>;
}

const chartPairs = {
  0: { modes: ["enrolments", "completions"], heights: [532, 516], subject: "Primary Firefighter Recruit Qualifications (Career and Volunteer)" },
  1: { modes: ["operations-enrolments", "operations-completions"], heights: [600, 600], subject: "Primary Firefighter Recruit Qualifications (Career and Volunteer) (Firefighting Operations)" },
  3: { modes: ["ses-enrolments", "ses-completions"], heights: [532, 588], subject: "SES Qualifications" },
  4: { modes: ["surf-enrolments", "surf-completions"], heights: [572, 588], subject: "Surf Life Saving Qualifications" },
} as const;

export default function PublicSafetyFesProfileView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState<keyof typeof chartPairs | 2>(0);
  const showRecruitNote = active === 0 || active === 1;
  return <PublicSafetyPageShell slug={slug} report={report} contentClassName={`${chapter.page} ${styles.page}`} currentPage="fes_industry_profile" navigation={{
    back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    backSecondary: { label: "Fire and Emergency Services chapter", href: `/reports/${slug}/fes` },
    prev: { label: "Industry-Sector Overview", href: `/reports/${slug}/fes_industry_overview` },
    next: { label: "Workforce Insights", href: `/reports/${slug}/fes_workforce_insights` },
    prevPrefix: "Previous Section:",
    nextPrefix: "Next Section:",
  }}>
    <section className={`${chapter.hero} ${styles.hero}`}>
      <div className={chapter.heroCopy}>
        <span className={`${chapter.badge} ${styles.badge}`}>FES · Industry-Profile</span>
        <h1>Industry Profile</h1>
      </div>
      <Image className={`${styles.artwork} animate-zoom-in`} src="/images/reports/public-safety/fes-chapter-fire-engine.svg" width={120} height={120} alt="" unoptimized priority />
    </section>

    <section aria-labelledby="fes-chart-library">
      <h2 id="fes-chart-library" className={styles.libraryTitle}>Chart Library · Select a chart to open</h2>
      <div className={styles.library}>
        <div className={layout.projectList}>
          {([0, 1, 2, 3, 4] as const).map(index => (
            <button key={index} type="button" aria-pressed={active === index} aria-controls="fes-profile-presentation" className={`${layout.projectButton} ${styles.selection} ${layout.enter}`} style={{ animationDelay: `${100 + index * 80}ms` }} onClick={() => setActive(index)}>
              <span><small>0{index + 1} · Chart · FES</small><strong>{charts[index]}</strong></span>
              <span className={layout.arrow}><ArrowRight size={16} aria-hidden="true" /></span>
            </button>
          ))}
        </div>
        <div id="fes-profile-presentation" className={styles.presentation}>
          {active === 2 ? <JurisdictionChart /> : (
            <div key={active} className={`${styles.pair} animate-content-switch`}>
              {chartPairs[active].modes.map((mode, index) => {
                const label = index === 0 ? "Enrolments" : "Completions";
                return <section key={mode} className={styles.chartSection}>
                  <h2>{label}</h2>
                  <FirefighterQualificationsChart mode={mode} title={`Yearly Student ${label} for ${chartPairs[active].subject}`} height={chartPairs[active].heights[index]} note={showRecruitNote} />
                </section>;
              })}
              {showRecruitNote && <p className={styles.note}>52 It should be noted that for several Fire and Emergency Services organisations recruit training focuses on completions of Units of Competency rather than full qualifications.</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  </PublicSafetyPageShell>;
}
