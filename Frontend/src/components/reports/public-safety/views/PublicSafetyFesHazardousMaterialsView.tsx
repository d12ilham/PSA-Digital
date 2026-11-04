"use client";

import Image from "next/image";
import { fesDisasterRecoverySources } from "../data/fesDisasterRecoverySources";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import layout from "./PublicSafetyDefenceWorkforceInsightsView.module.css";
import recovery from "./PublicSafetyFesDisasterRecoveryView.module.css";
import sourceStyles from "./PublicSafetyDefenceEmergingTechnologyView.module.css";
import styles from "./PublicSafetyFesHazardousMaterialsView.module.css";

const chartSource = "National Centre for Vocational Education Research (NCVER), Total VET students and courses 2024: DataBuilder, [subject enrolments data set], 2025, accessed 17 December 2025.";

const sources = [
  "Productivity Commission, Emergency services for fire and other events – Table 9A.6 [data set], Productivity Commission, 2026, accessed 17 February 2026.",
  "Training.gov.au, Unit of competency – PUASAR025 Undertake confined space rescue, Australian Government, 2025, accessed 13 January 2026.",
];

function EnrolmentsChart() {
  const series = [
    { code: "PUAFIR306", start: 1010, end: 2810, color: "#c9481a", labelOffset: -8 },
    { code: "PUAFIR308", start: 850, end: 2320, color: "#456130", labelOffset: 5 },
    { code: "PUAFIR324", start: 1115, end: 3130, color: "#ad271b", labelOffset: -20 },
  ];
  const x = (index: number) => 66 + index * 137;
  const y = (value: number) => 325 - value / 3500 * 270;
  return <figure className={`${styles.chart} ${recovery.animatedSection}`}>
    <figcaption className={styles.chartTitle}>Yearly Enrolments for all Three Hazardous Materials Units of Competency Since 2020</figcaption>
    <svg viewBox="0 0 660 367" role="img" aria-label="Verified 2020 and 2024 enrolments for PUAFIR306, PUAFIR308 and PUAFIR324; dashed guides compare endpoints only" className="mt-4 h-auto w-full">
      {[0, 875, 1750, 2625, 3500].map((tick) => <g key={tick}><line x1="55" y1={y(tick)} x2="625" y2={y(tick)} stroke="#DADDD4"/><text x="45" y={y(tick) + 4} textAnchor="end" fill="#74786F" fontSize="11">{tick.toLocaleString()}</text></g>)}
      {["2020", "2021", "2022", "2023", "2024"].map((year, index) => <text key={year} x={x(index)} y="347" textAnchor="middle" fill="#74786F" fontSize="11">{year}</text>)}
      {series.map(({ code, start, end, color }) => (
        <line key={code} x1={x(0)} y1={y(start)} x2={x(4)} y2={y(end)} stroke={color} strokeWidth="2.5" strokeDasharray="5 4" className={styles.guide} />
      ))}
      {series.map(({ code, start, end, color, labelOffset }) => (
        <g key={code} fill={color} fontSize="11" fontWeight="700" className={styles.endpoints}>
          <circle cx={x(0)} cy={y(start)} r="4.5" className="animate-industry-chart-point" />
          <circle cx={x(4)} cy={y(end)} r="4.5" className="animate-industry-chart-point" />
          <text x={x(0) - 8} y={y(start) + labelOffset} textAnchor="end">{start.toLocaleString("en-AU")}</text>
          <text x={x(4) + 8} y={y(end) - 6}>{end.toLocaleString("en-AU")}</text>
        </g>
      ))}
    </svg>
    <div className={styles.legend}>{series.map((item) => <div key={item.code} className="grid grid-cols-[12px_1fr_auto_auto] items-center gap-2"><i className="size-2.5 rounded-full" style={{ backgroundColor: item.color }}/><strong>{item.code}</strong><span>2020: {item.start.toLocaleString()}</span><span>2024: {item.end.toLocaleString()}</span></div>)}</div>
    <p className={styles.chartNote}>Chart source: {chartSource}</p>
    <p className={styles.chartNote}>Dashed lines compare the approved 2020 and 2024 values. No data points are shown for 2021–2023.</p>
  </figure>;
}

export default function PublicSafetyFesHazardousMaterialsView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_hazardous_materials" contentClassName={`${layout.page} ${recovery.page}`} navigation={{ back:{label:"Workforce Insights",href:`/reports/${slug}/fes_workforce_insights`}, backSecondary:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`}, prev:{label:"Workforce Insights",href:`/reports/${slug}/fes_workforce_insights`}, next:{label:"Proposed Strategies 2026",href:`/reports/${slug}/fes_workforce_strategies`}, prevPrefix:"Previous Section:", nextPrefix:"Next Section:" }}>
    <section className={`${layout.hero} ${recovery.hero}`}>
      <div className={`${recovery.heroCopy} animate-slide-up`}>
        <span className={`${layout.badge} ${recovery.badge}`}>FES Workforce Insights</span>
        <h1>3. Hazardous Materials. Insight</h1>
        <div className={recovery.summary}>
          <Image className={`${recovery.animatedSummaryIcon} animate-zoom-in`} src="/images/reports/public-safety/fes-recovery-insight.png" width={72} height={72} alt="" unoptimized />
          <p>Incidents involving hazardous materials are becoming increasingly important while the current training is limiting some Fire and Emergency Services organisations&apos; ability to deliver this type of service.</p>
        </div>
      </div>
      <Image className={`${styles.artwork} ${recovery.animatedSummaryIcon} animate-zoom-in`} src="/images/reports/public-safety/fes-hazardous-materials-hero.png" width={180} height={180} alt="" unoptimized priority />
    </section>

    <section className={`${recovery.detail} animate-slide-up-delay`}>
      <h2 className={styles.heading}>Hazardous materials incidents and training</h2>
      <div className={styles.columns}>
        <div className={styles.copy}>
          <p>Each year, firefighting organisations around Australia respond to a range of emergency incidents. In 2024–25, this included, but was not limited to, 11,982 incidents relating to hazardous materials.<sup>65</sup> Specific to responding to hazardous materials incidents, training is enabled through three units of competency in the PUA Public Safety Training Package:</p>
          <div className={styles.units}><div className={`${styles.unit} ${recovery.animatedSection} animate-card-entrance`}>PUAFIR306 Identify, detect and monitor hazardous materials at an incident</div><div className={`${styles.unit} ${recovery.animatedSection} animate-card-entrance`}>PUAFIR308 Employ personal protection at a hazardous materials incident</div><div className={`${styles.unit} ${recovery.animatedSection} animate-card-entrance`}>PUAFIR324 Render hazardous materials incidents safe</div></div>
          <p className="mt-6">The importance of these three units of competency is supported by annual enrolment data, with all three products having high use rates since 2020.</p>
        </div>
        <EnrolmentsChart/>
      </div>
      <h2 className={`${styles.heading} mt-6`}>PUAFIR306 as a prerequisite unit of competency</h2>
      <div className={`${styles.copy} ${styles.prose}`}>
        <p>Due to evolving technology and access to different equipment across organisations, stakeholders indicated that some aspects of PUAFIR306 Identify, detect and monitor hazardous materials at an incident may require updating. Specifically, the unit may require an update related to the use of gas detection equipment and certain personal protective equipment (PPE) and personal protective clothing (PPC), which, as a prerequisite unit, may limit access to other training units.</p>
        <p>In its current form, this unit of competency excludes some firefighting organisations that either use different equipment or do not have access to specific equipment detailed in the unit of competency.</p>
        <p>Additionally, PUAFIR306 is a prerequisite unit of competency in PUASAR025 Undertake confined space rescue, a highly utilised unit across both the Mining and Public Safety industries.<sup>66</sup> PUASAR025 is utilised across all states and territories, with 8,871 subject enrolments in 2024 alone.</p>
        <p>Some industry-sector representatives expressed challenges with prescriptive requirements in the units of competency that may affect agencies&apos; ability to deliver and award these qualifications. Terminology and assessment conditions were also identified as potential limiting factors.</p>
      </div>
      <div className={`${styles.insight} ${recovery.animatedSection}`}><div className="flex items-center gap-3"><Image className={`${recovery.animatedSummaryIcon} animate-zoom-in`} src="/images/reports/public-safety/fes-recovery-insight.png" width={72} height={72} alt="" unoptimized /><strong className="text-xl">Industry Insight</strong></div><p className={`${styles.copy} ${styles.prose}`}>While response to incidents involving hazardous materials is becoming increasingly important, the specificity of equipment requirements in current training may be limiting access by Fire and Emergency Services organisations to other training units, impacting national response capabilities.</p></div>
      <div className={`${styles.copy} ${styles.prose} ${styles.closing}`}><p>Recent consultation with stakeholders highlighted the importance of the link between the two units of competency and advised that updates to this hazardous materials unit must carefully consider downstream impacts on other training products.</p><p>Further consensus must be built to ensure proposed training solutions meet the needs of all industry representatives, including employee organisations.</p></div>
    </section>

    <hr className={recovery.rule} />
    <section className={`${sourceStyles.sources} ${recovery.animatedSection} animate-slide-up-delay`}>
      <h2>Sources</h2>
      <ol start={53}>
        {fesDisasterRecoverySources.map((source, index) => <li key={source}><span className={sourceStyles.sourceNumber} aria-hidden="true">{53 + index}</span><span>{source}</span></li>)}
      </ol>
      <ol start={65}>
        {sources.map((source, index) => <li key={source}><span className={sourceStyles.sourceNumber} aria-hidden="true">{65 + index}</span><span>{source}</span></li>)}
      </ol>
    </section>
  </PublicSafetyPageShell>;
}
