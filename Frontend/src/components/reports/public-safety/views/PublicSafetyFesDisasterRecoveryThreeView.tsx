import Image from "next/image";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import layout from "./PublicSafetyDefenceWorkforceInsightsView.module.css";
import sourceStyles from "./PublicSafetyDefenceEmergingTechnologyView.module.css";
import styles from "./PublicSafetyFesDisasterRecoveryView.module.css";

const sources = [
  "Australian Institute for Disaster Resilience (AIDR), National Principles for Disaster Recovery, National Emergency Management Agency, AIDR, n.d., accessed 13 December 2025.",
  "Prescribed Burning Centre of Excellence, National Position on Prescribed Burning, Australasian Fire and Emergency Service Authorities Council (AFAC), 2021.",
  "PUAFIR201 Assist with prescribed burning; PUAFIR402 Conduct simple prescribed burns; PUAFIR406 Develop simple prescribed burn plans; PUAFIR506 Conduct complex prescribed burns; PUAFIR515 Develop complex prescribed burn plans.",
];

export default function PublicSafetyFesDisasterRecoveryThreeView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const reportPath = `/reports/${slug}`;
  const insightsPath = `${reportPath}/fes_workforce_insights`;

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_disaster_recovery_3" contentClassName={`${layout.page} ${styles.page}`} navigation={{
    back: { label: "Workforce Insights", href: insightsPath },
    backSecondary: { label: "Executive Summary", href: `${reportPath}/executive_summary` },
    prev: { label: "Workforce Insights", href: insightsPath },
    next: { label: "2. Surf Life Saving First Aid", href: `${reportPath}/fes_surf_life_saving_first_aid` },
    prevPrefix: "Previous Section:",
    nextPrefix: "Next Section:",
  }}>
    <section className={`${layout.hero} ${styles.hero}`}>
      <div className={`${styles.heroCopy} animate-slide-up`}>
        <span className={`${layout.badge} ${styles.badge}`}>FES Workforce Insights</span>
        <h1>1. Disaster Recovery. Insight Three.</h1>
        <div className={styles.summary}>
          <Image className={`${styles.animatedSummaryIcon} animate-zoom-in`} src="/images/reports/public-safety/fes-recovery-insight.png" width={72} height={72} alt="" unoptimized />
          <p>Australia is experiencing a critical challenge in maintaining capability to use fire effectively in the landscape, particularly for complex prescribed burning and backburning during bushfire suppression.</p>
        </div>
      </div>
      <div className={`${styles.house} ${styles.animatedHouse} animate-zoom-in`}>
        <Image src="/images/reports/public-safety/fes-recovery-house.png" width={111} height={122} alt="" unoptimized priority />
      </div>
    </section>

    <section className={`${styles.detail} ${styles.animatedSection} animate-slide-up-delay`}>
      <h2>Community recovery and prescribed burning</h2>
      <div className={styles.narrative}>
        <div className="max-w-[800px] space-y-6">
          <p>As described in the National Principles for Disaster Recovery, community involvement in disaster recovery activities is critical for ensuring long-term disaster recovery success and community resilience.<sup>60</sup> Consequently, access to relevant and contemporary disaster recovery training is required to enable community, local government, and state, territory and federal government personnel and volunteers to adequately support communities in times of disaster.</p>
          <p>Connected to this is the role of prescribed burning in decreasing the scale of recovery efforts required after a major fire. Prescribed burning reduces fuel hazards and can assist the success of suppression activities and reduce the intensity, extent and impact of subsequent bushfires. At the same time, insights gained during disaster recovery, such as patterns of fire behaviour, infrastructure vulnerability and ecological impacts can directly inform the planning and prioritisation of prescribed burns.<sup>61</sup></p>
          <p>However, capability in the use of prescribed burning is declining. Changes in rural land use, primary industries and forest management, together with shifting policies for fire, land management, emergency services and the environment at different levels of government have contributed to the challenges of maintaining skills.</p>
          <p>The Australasian Fire and Emergency Services Authorities Council (AFAC) in conjunction with the Forest Fire Management Group developed a series of documents including principles, frameworks and guidelines as part of the National Burning Project. These documents are aimed at developing nationally consistent approaches to the use of prescribed burning by the Fire and Emergency Services industry-sector. This prescribed burning capability is supported by five units of competency in the PUA Public Safety Training Package.<sup>62</sup></p>
        </div>
      </div>
    </section>

    <hr className={styles.rule} />
    <section data-report-sources className={`${sourceStyles.sources} ${styles.animatedSection} animate-slide-up-delay`}>
      <h2>Sources</h2>
      <ol start={60}>
        {sources.map((source, index) => <li key={source}><span className={sourceStyles.sourceNumber} aria-hidden="true">{60 + index}</span><span>{source}</span></li>)}
      </ol>
    </section>
  </PublicSafetyPageShell>;
}
