import Image from "next/image";
import { fesDisasterRecoverySources } from "../data/fesDisasterRecoverySources";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import layout from "./PublicSafetyDefenceWorkforceInsightsView.module.css";
import sourceStyles from "./PublicSafetyDefenceEmergingTechnologyView.module.css";
import styles from "./PublicSafetyFesDisasterRecoveryView.module.css";

const firstSourceNumber = 57;
const insightTwoSources = fesDisasterRecoverySources.slice(firstSourceNumber - 53, 59 - 53 + 1);

export default function PublicSafetyFesDisasterRecoveryTwoView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const reportPath = `/reports/${slug}`;
  const insightsPath = `${reportPath}/fes_workforce_insights`;

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_disaster_recovery_2" contentClassName={`${layout.page} ${styles.page}`} navigation={{
    back: { label: "Workforce Insights", href: insightsPath },
    backSecondary: { label: "Executive Summary", href: `${reportPath}/executive_summary` },
    prev: { label: "Workforce Insights", href: insightsPath },
    next: { label: "Disaster Recovery. Insight Three.", href: `${reportPath}/fes_disaster_recovery_3` },
    prevPrefix: "Previous Section:",
    nextPrefix: "Next Section:",
  }}>
    <section className={`${layout.hero} ${styles.hero}`}>
      <div className={`${styles.heroCopy} animate-slide-up`}>
        <span className={`${layout.badge} ${styles.badge}`}>FES Workforce Insights</span>
        <h1>1. Disaster Recovery. Insight Two.</h1>
        <div className={styles.summary}>
          <Image className={`${styles.animatedSummaryIcon} animate-zoom-in`} src="/images/reports/public-safety/fes-recovery-insight.png" width={72} height={72} alt="" unoptimized />
          <p>Challenges in access to nationally accredited disaster recovery training products leads to inconsistencies in recovery outcomes, reduced community trust and limits the ability of communities to rebuild from the impacts of disasters.</p>
        </div>
      </div>
      <div className={`${styles.house} ${styles.animatedHouse} animate-zoom-in`}>
        <Image src="/images/reports/public-safety/fes-recovery-house.png" width={111} height={122} alt="" unoptimized priority />
      </div>
    </section>

    <section className={`${styles.detail} ${styles.animatedSection} animate-slide-up-delay`}>
      <h2>Access to disaster recovery training</h2>
      <div className={styles.narrative}>
        <div className="max-w-[800px]">
          <p>Collectively, these disaster recovery training products are targeted at individuals without emergency service backgrounds, including local community members, social service providers, local government personnel, spontaneous volunteers or individuals from government organisations tasked with recovery coordination.<sup>57</sup></p>
          <p>Despite the relevance and importance of disaster recovery training, there are limited TAFEs and RTOs equipped to deliver this training. For example:</p>
          <ul className="list-disc ps-5">
            <li>seven of the nine newly developed skill sets are not on scope for any RTO</li>
            <li>only one RTO has the qualification and four associated units of competency on scope</li>
            <li>only five RTOs have the PUASS00098 Manage a Recovery Centre skill set on scope.<sup>58</sup></li>
          </ul>
          <p>Additionally, there have been no enrolment or completion data for all 14 recovery training products since their release in 2022.<sup>59</sup></p>
        </div>
      </div>
    </section>

    <hr className={styles.rule} />
    <section data-report-sources className={`${sourceStyles.sources} ${styles.animatedSection} animate-slide-up-delay`}>
      <h2>Sources</h2>
      <ol start={firstSourceNumber}>
        {insightTwoSources.map((source, index) => <li key={source}><span className={sourceStyles.sourceNumber} aria-hidden="true">{firstSourceNumber + index}</span><span>{source}</span></li>)}
      </ol>
    </section>
  </PublicSafetyPageShell>;
}
