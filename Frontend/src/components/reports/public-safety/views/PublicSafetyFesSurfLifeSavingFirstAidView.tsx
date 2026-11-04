"use client";

import Image from "next/image";
import { fesDisasterRecoverySources } from "../data/fesDisasterRecoverySources";
import { useRef, useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import layout from "./PublicSafetyDefenceWorkforceInsightsView.module.css";
import recovery from "./PublicSafetyFesDisasterRecoveryView.module.css";
import sourceStyles from "./PublicSafetyDefenceEmergingTechnologyView.module.css";
import styles from "./PublicSafetyFesSurfLifeSavingFirstAidView.module.css";

const sources = [
  ...fesDisasterRecoverySources,
  "Surf Life Saving Australia (SLSA), 2022/23 Annual Report, SLSA, 2023, p 100; SLSA, 2023/24 Annual Report, SLSA, 2024, p 108; SLSA, 2024/25 Annual Report, SLSA, 2025, p 115.",
  "National Centre for Vocational Education Research (NCVER), Total VET students and courses 2024: DataBuilder, [data set], NCVER, 2025, accessed 17 December 2025.",
];

const basicLifeSupport = ["allergic reaction", "anaphylaxis", "asthma", "non-life-threatening and life-threatening bleeding", "cardiac conditions, including chest pain", "choking", "shock", "stroke"];
const firstAid = ["drowning", "envenomation – all current treatments", "eye injuries and diabetes", "fractures, dislocations, strains and sprains", "head, neck and spinal injuries", "hypothermia and hyperthermia", "minor wounds and nosebleeds", "poisoning and burns"];


function TreatmentsPlot({ animate = false }: { animate?: boolean }) {
  const values = [21828, 25262, 34394];
  const years = ["2022–2023", "2023–2024", "2024–2025"];
  const points = values.map((value, index) => ({ x: 90 + index * 278, y: 416 - (value - 15000) / 25000 * 380 }));

  return <svg viewBox="0 0 690 455" role="img" aria-label="First aid treatments: 21,828 in 2022–2023, 25,262 in 2023–2024, and 34,394 in 2024–2025">
    {[15000, 21250, 27500, 33750, 40000].map((value, index) => {
      const y = 416 - index * 95;
      return <g key={value}><line x1="86" x2="654" y1={y} y2={y} stroke="#e5d9d0" /><text x="80" y={y + 4} textAnchor="end">{value.toLocaleString("en-AU")}</text></g>;
    })}
    <polyline points={points.map(({ x, y }) => `${x},${y}`).join(" ")} fill="none" stroke="#ad271b" strokeWidth="3.5" pathLength={40} strokeDasharray={animate ? 40 : undefined} className={animate ? "animate-industry-projection-line" : undefined} />
    {points.map(({ x, y }, index) => (
      <g key={years[index]} className={styles.point}>
        <circle cx={x} cy={y} r="5.5" fill="#ad271b" className={animate ? "animate-industry-chart-point" : undefined} style={animate ? { animationDelay: `${index * 260}ms` } : undefined} />
        <text x={x} y={y - 16} textAnchor={index === 2 ? "end" : "start"} className={styles.value}>{values[index].toLocaleString("en-AU")}</text>
        <text x={x} y="440" textAnchor={index === 2 ? "end" : index === 0 ? "start" : "middle"}>{years[index]}</text>
      </g>
    ))}
  </svg>;
}

function TreatmentsChart() {
  const [replay, setReplay] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);

  return <figure className={`${styles.chart} ${recovery.animatedSection}`}>
    <div className={styles.chartHeader}>
      <h3>First Aid Treatments Administered by Surf Lifesavers <sup>63</sup></h3>
      <div className={styles.controls}>
        <button type="button" onClick={() => setReplay(count => count + 1)}>▸ Replay</button>
        <button type="button" onClick={() => dialog.current?.showModal()}>Open Large</button>
      </div>
    </div>
    <TreatmentsPlot key={replay} animate />
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="fes-treatments-dialog">
      <div className={styles.chartHeader}>
        <h2 id="fes-treatments-dialog">First Aid Treatments Administered by Surf Lifesavers</h2>
        <form method="dialog"><button type="submit" className={styles.close}>Close</button></form>
      </div>
      <TreatmentsPlot />
    </dialog>
  </figure>;
}

export default function PublicSafetyFesSurfLifeSavingFirstAidView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const reportPath = `/reports/${slug}`;
  const insightsPath = `${reportPath}/fes_workforce_insights`;

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_surf_life_saving_first_aid" contentClassName={`${layout.page} ${recovery.page}`} navigation={{
    back: { label: "Workforce Insights", href: insightsPath },
    backSecondary: { label: "Executive Summary", href: `${reportPath}/executive_summary` },
    prev: { label: "Workforce Insights", href: insightsPath },
    next: { label: "3. Hazardous Materials", href: `${reportPath}/fes_hazardous_materials` },
    prevPrefix: "Previous Section:",
    nextPrefix: "Next Section:",
  }}>
    <section className={`${layout.hero} ${recovery.hero}`}>
      <div className={`${recovery.heroCopy} animate-slide-up`}>
        <span className={`${layout.badge} ${recovery.badge}`}>FES Workforce Insights</span>
        <h1>2. Surf Life Saving First Aid. Insight</h1>
        <div className={recovery.summary}>
          <Image className={`${recovery.animatedSummaryIcon} animate-zoom-in`} src="/images/reports/public-safety/fes-recovery-insight.png" width={72} height={72} alt="" unoptimized />
          <p>The HLTAID010 unit of competency is an entry-level first aid training product that is no longer meeting the operational needs for volunteer surf lifesavers.</p>
        </div>
      </div>
      <Image className={`${styles.artwork} ${recovery.animatedSummaryIcon} animate-zoom-in`} src="/images/reports/public-safety/fes-first-aid-hero.png" width={180} height={180} alt="" unoptimized priority />
    </section>

    <h2 className={`${styles.sectionTitle} animate-slide-up-delay`}>First aid treatments by volunteer surf lifesavers</h2>
    <section className={`${recovery.detail} animate-slide-up-delay`}>
      <div className={styles.columns}>
        <div className={styles.copy}>
          <p>In 2024–25, volunteer surf lifesavers administered six times more first aid treatments compared to rescue operations. The number of yearly first aid treatments administered has also been increasing year-on-year since 2022–23.<sup>63</sup> This highlights a distinct operational capability requirement for volunteers. Skilling of volunteer surf lifesavers is provided through the PUA20119 Certificate II in Public Safety (Aquatic Rescue).</p>
          <p>The importance of this qualification is strongly supported by its high utilisation with more than 1,500 completions per year since 2020.<sup>64</sup> The principal first aid unit of competency in this qualification is HLTAID010 Provide Basic Emergency Life Support. Recent consultation with industry stakeholders identified that this unit of competency is not meeting the increasing first aid requirements of Surf Life Saving.</p>
          <p>Stakeholders identified that the HLTAID011 Provide First Aid unit of competency is considered a more complete resource for providing the increasing first aid skills demands for volunteer surf lifesavers. The differences between the training products are the range of medical conditions and injuries trained to be treated.</p>
        </div>
        <TreatmentsChart />
      </div>
      <h3 className={styles.comparison}>HLTAID010 and HLTAID011 compared</h3>
      <h4 className={styles.tableTitle}>Medical conditions and injuries covered</h4>
      <div className={`${styles.conditions} ${recovery.animatedSection} animate-slide-up-delay`}>
        <div>
          <h5>HLTAID010 Provide Basic Emergency Life Support</h5>
          <ul>{basicLifeSupport.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <h5>HLTAID011 Provide First Aid</h5>
          <div className={styles.additions}>
            <p>All conditions in HLTAID010 plus:</p>
            <ul>{firstAid.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>

    <hr className={recovery.rule} />
    <section className={`${sourceStyles.sources} ${recovery.animatedSection} animate-slide-up-delay`}>
      <h2>Sources</h2>
      <ol start={53}>
        {sources.map((source, index) => <li key={source}><span className={sourceStyles.sourceNumber} aria-hidden="true">{53 + index}</span><span>{source}</span></li>)}
      </ol>
    </section>
  </PublicSafetyPageShell>;
}
