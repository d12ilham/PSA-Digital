import Image from "next/image";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import layout from "./PublicSafetyDefenceView.module.css";
import styles from "./PublicSafetyPoliceDigitalForensicsView.module.css";

const headline = "Police officers are being required to take on more leadership responsibilities earlier in their careers – particularly in regional, rural and remote areas, which may require more support in accelerating leadership skills development.";

const sources = [
  { number: 83, text: "J Rodgers and N Asquith, 'Safety and Security in Remote, Rural, and Regional Policing', International Journal of Rural Criminology, 2022, 7(1):96–123, p 105, doi:10.18061/ijrc.v7i1.9103." },
  { number: 85, text: "J Rodgers and N Asquith, 'Safety and Security in Remote, Rural, and Regional Policing', International Journal of Rural Criminology, 2022, 7(1):96–123, doi:10.18061/ijrc.v7i1.9103." },
  { number: 86, text: "In Tasmania, the minimum tenure in non-metropolitan areas is two years. The New South Wales Police Force has incentives for police officers attached to positions in regional areas." },
];

export default function PublicSafetyPoliceRegionalLeadershipView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="police_regional_remote_leadership" contentClassName={`${layout.page} ${styles.page} ${styles.leadership}`} navigation={{
    back: { label: "Police Workforce Insights", href: `/reports/${slug}/police_workforce_insights` },
    backSecondary: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    prev: { label: "Workforce Insights", href: `/reports/${slug}/police_workforce_insights` },
    next: { label: "Proposed Strategy 2026", href: `/reports/${slug}/police_workforce_strategies` },
    prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
  }}>
    <section className={`${styles.panel} ${layout.enter}`}>
      <div className={styles.banner}>
        <span className={styles.number} aria-hidden="true">3</span>
        <div className={styles.bannerCopy}>
          <p>Rural, Regional and Remote Police Leadership · Theme Two, Insight Three</p>
          <div className={styles.headline}>
            <Image className="animate-zoom-in" src="/images/reports/public-safety/police-forensics-insight.png" width={72} height={72} alt="" unoptimized />
            <h1>{headline}</h1>
          </div>
        </div>
        <div className={`${styles.illustration} animate-zoom-in`}>
          <Image src="/images/reports/public-safety/police-leadership-icon.png" width={88} height={88} alt="" unoptimized />
        </div>
      </div>
    </section>

    <div className={styles.columns}>
      <section className={`${styles.panel} ${layout.enter}`}>
        <h2>Workforce shortages in regional, rural and remote communities</h2>
        <p className="mt-6 text-sm leading-6 text-[#535862]">As a whole, police have experienced workforce shortages driven by two years of FTE reductions in the wake of the COVID-19 pandemic. Unlike the large patrols and area commands in metropolitan areas, regional, rural and remote communities police stations often deploy fewer than five officers, with some stations deploying only one or two officers.<sup>83</sup> As such, the ripple effects of workforce shortages have a greater impact on regional, rural and remote communities where the loss of only one or two police officers equates to a large proportion of the operational capacity in these communities.<sup>84</sup></p>
        <p className="mt-4 text-sm leading-6">Alongside workforce shortages, recruitment challenges can make it difficult for police jurisdictions to increase the number of officers deployed in these communities.<sup>85</sup> Most police jurisdictions have established incentive programs to encourage regional, rural and remote placements,<sup>86</sup> with industry consultation indicating that shortages in regional, rural and remote locations are persisting.</p>

      </section>
      <section className={`${styles.panel} ${layout.enter}`}>
        <h2>Earlier leadership responsibilities</h2>
        <p className="mt-6 text-sm leading-6 text-[#535862]">Industry-sector consultation identified that these shortages, alongside wider demographic shifts and higher turnover in policing in recent years, have resulted in police officers being required to take on more leadership responsibilities earlier in their careers. This means that those police officers may not have the depth of experience to draw from when moving into these leadership roles and may require greater levels of support to accelerate the development of their leadership skills.</p>

        <p className="mt-6 text-sm leading-6 text-[#535862]">Further industry consultation confirmed that, while this is an area that required more examination, there is no direct requirement for any training product development or implementation, promotion and monitoring activity.</p>
      </section>
    </div>

    <section className={`${styles.panel} ${styles.sources} ${layout.enter}`}>
      <h2>Sources</h2>
      <ol start={83}>
        {sources.map((source) => (
          <li key={source.number} value={source.number}>
            <span aria-hidden="true">{source.number}</span><span>{source.text}</span>
          </li>
        ))}
      </ol>
    </section>
  </PublicSafetyPageShell>;
}
