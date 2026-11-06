"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import layout from "./PublicSafetyDefenceWorkforceInsightsView.module.css";
import sourceStyles from "./PublicSafetyDefenceEmergingTechnologyView.module.css";
import styles from "./PublicSafetyFesDisasterRecoveryView.module.css";

const sources = [
  "Australian Institute for Disaster Resilience (AIDR), Major Incidents Report 2024–25, Australian Government Department of Home Affairs, 2025.",
  "Australian Institute for Disaster Resilience (AIDR), Major Incidents Report 2022–23, Australian Government Department of Home Affairs, 2023; AIDR, Major Incidents Report 2023–24, 2024; AIDR, Major Incidents Report 2024–25, 2025.",
  "M Biskin, Royal Commission into National Natural Disaster Arrangements (Report), Australian Government, 2020, page 453.",
  "Transparency Portal, National Recovery and Resilience Organisation Annual Report 2021–22, Australian Government, 2022, accessed 13 December 2025.",
  "Australian Institute for Disaster Resilience, Australian Institute for Disaster Resilience Handbook Collection: Community Recovery, Australian Government Department of Home Affairs, 2018, pp. 6–7.",
];

function IncidentsChart() {
  const values = [27, 30, 40];
  const years = ["2022–2023", "2023–2024", "2024–2025"];
  const points = values.map((value, index) => ({ x: [65, 343, 641][index], y: 459 - ((value - 20) / 25) * 434 }));

  return <svg viewBox="0 0 660 491" role="img" aria-label="Major emergency incidents. 27 in 2022–2023, 30 in 2023–2024, and 40 in 2024–2025.">
    {[20, 26.3, 32.5, 38.8, 45].map((tick, index) => {
      const y = 459 - index * 108.5;
      return <g key={tick}><line x1="48" x2="658" y1={y} y2={y} stroke="#e5e3dc" /><text x="34" y={y - 2} textAnchor="end">{tick}</text></g>;
    })}
    <polyline points={points.map(({ x, y }) => `${x},${y}`).join(" ")} fill="none" stroke="#ad271b" strokeWidth="4" pathLength="40" strokeDasharray="40" className="animate-industry-projection-line" />
    {points.map(({ x, y }, index) => (
      <g key={years[index]} className={styles.chartPoint}>
        <circle cx={x} cy={y} r="6.5" fill="#ad271b" className="animate-industry-chart-point" style={{ animationDelay: `${250 + index * 250}ms` }} />
        <text x={x} y={y - 17} className={styles.value}>{values[index]}</text>
        <text x={x} y="480" textAnchor={index === 2 ? "end" : "middle"}>{years[index]}</text>
      </g>
    ))}
  </svg>;
}

export default function PublicSafetyFesDisasterRecoveryView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  const reportPath = `/reports/${slug}`;

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_disaster_recovery" contentClassName={`${layout.page} ${styles.page}`} navigation={{
    back: { label: "Workforce Insights", href: `${reportPath}/fes_workforce_insights` },
    backSecondary: { label: "Executive Summary", href: `${reportPath}/executive_summary` },
    next: { label: "Disaster Recovery. Insight Two.", href: `${reportPath}/fes_disaster_recovery_2` },
    nextPrefix: "Next Section:",
  }}>
    <section className={`${layout.hero} ${styles.hero}`}>
      <div className={`${styles.heroCopy} animate-slide-up`}>
        <span className={`${layout.badge} ${styles.badge}`}>FES Workforce Insights</span>
        <h1>1. Disaster Recovery. Insight One.</h1>
        <div className={styles.summary}>
          <Image src="/images/reports/public-safety/fes-recovery-insight.png" width={72} height={72} alt="" unoptimized />
          <p>Specialist disaster recovery functions are operationally focused, a more contemporary approach now requires capabilities related to the unique aspects of working with communities that may be grieving or socially, emotionally and financially impacted.</p>
        </div>
      </div>
      <div className={`${styles.house} ${styles.animatedHouse} animate-zoom-in`}>
        <Image src="/images/reports/public-safety/fes-recovery-house.png" width={111} height={122} alt="" unoptimized priority />
      </div>
    </section>

    <section className={`${styles.detail} animate-slide-up-delay`}>
      <h2>Major emergency incidents and the Royal Commission in 2020</h2>
      <div className={styles.columns}>
        <div className={styles.narrative}>
          <p>From July 2024 to June 2025, the Australian Institute for Disaster Resilience Major Incidents Report documented 40 major emergency incidents, spanning fires, floods, storms, tropical cyclones, health outbreaks, technology failures and repatriations from international conflict zones.<sup>53</sup> This is an increase from both the 2022–23 and 2023–24 financial years as detailed below:</p>
          <p>Fire and Emergency Services stakeholders noted that at the time of the Royal Commission into National Natural Disaster Arrangements in 2020 (Royal Commission in 2020), specialist disaster recovery skills and functions were identified as different to those required in emergency management. Following the Royal Commission in 2020, a suite of nationally accredited training products related to disaster recovery were developed.<sup>55</sup> Facilitated through the National Recovery Training Program,<sup>56</sup> newly developed disaster recovery training products included one qualification, nine skill sets and four units of competency (refer Appendix B – Disaster recovery training products from the Royal Commission into National Natural Disaster Arrangements).</p>
          <button type="button" className={`${styles.appendix} ${styles.animatedAppendix}`} onClick={() => router.push(`${reportPath}/fes_disaster_recovery_training_products`)}>
            <span>Appendix B – Disaster recovery training products from the Royal Commission into National Natural Disaster Arrangements</span>
            <span className={layout.insightArrow}><ArrowRight size={16} aria-hidden="true" /></span>
          </button>
          <p>Collectively, these training products are targeted at individuals without emergency service backgrounds, including local community members, social service providers, local government personnel, spontaneous volunteers or individuals from government organisations tasked with recovery coordination.<sup>57</sup></p>
        </div>
        <figure className={`${styles.chart} ${styles.animatedChart}`}>
          <h3>Major Emergency Incidents Reported by the Australian Institute for Disaster Resilience <sup>54</sup></h3>
          <IncidentsChart />
        </figure>
      </div>
    </section>

    <hr className={styles.rule} />
    <section data-report-sources className={`${sourceStyles.sources} animate-slide-up-delay`}>
      <h2>Sources</h2>
      <ol start={53}>
        {sources.map((source, index) => <li key={source}><span className={sourceStyles.sourceNumber} aria-hidden="true">{53 + index}</span><span>{source}</span></li>)}
      </ol>
    </section>
  </PublicSafetyPageShell>;
}
