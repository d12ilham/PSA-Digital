import Image from "next/image";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import chapter from "./PublicSafetyDefenceView.module.css";
import layout from "./PublicSafetyDefenceWorkforceStrategiesView.module.css";
import police from "./PublicSafetyPoliceView.module.css";
import styles from "./PublicSafetyPoliceWorkforceStrategiesView.module.css";

const stakeholders = ["ANZPAA", "National Institute of Forensic Science (NIFS)", "State/Territory Police organisations and Australian Federal Police", "Forensic Services South Australia", "ACT Government Analytical Laboratory", "Canberra Institute of Technology"];

export default function PublicSafetyPoliceWorkforceStrategiesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="police_workforce_strategies" contentClassName={`${layout.page} ${styles.page}`} navigation={{
    back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    backSecondary: { label: "Police chapter", href: `/reports/${slug}/police` },
    prev: { label: "Workforce Insights", href: `/reports/${slug}/police_workforce_insights` },
    next: { label: "2025 Strategy Updates", href: `/reports/${slug}/police_update_2025_strategies` },
    prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
  }}>
    <section className={`${layout.hero} ${chapter.enter}`}>
      <div>
        <span className={`${layout.badge} ${styles.badge}`}>POL Workforce Strategy</span>
        <h1>Proposed Strategy 2026</h1>
        <p className={layout.intro}>Public Skills Australia proposes the following strategies to aligned to the workforce insights identified to support the Police industry-sector:</p>
      </div>
      <div className={`${chapter.artwork} ${police.artwork}`}>
        <Image src="/images/police-chapter-vehicle.svg" alt="" width={136} height={136} unoptimized priority />
      </div>
    </section>

    <section className={`${layout.strategy} ${styles.strategy} ${chapter.enter}`}>
      <span className={`${layout.badge} ${styles.badge}`}>Strategy 1</span>
      <h2>Develop Training Products for Digital Forensics</h2>


      <div className={`${layout.details} ${styles.details}`}>
        <dl>
          <div><dt>Workforce Insight:</dt><dd>Digital Forensics</dd></div>
          <div><dt>JSC Function:</dt><dd>Training Product Development</dd></div>
          <div><dt>Objective:</dt><dd>Develop a digital forensics qualification to be included in the POL Police Training Package.</dd></div>
          <div><dt>Approach:</dt><dd>
            <p>This strategy will engage the Australia New Zealand Policing Advisory Agency (ANZPAA) and the National Institute of Forensic Science to develop a digital forensics qualification.</p>
            <p>The approach will be to work through ANZPAA to engage subject matter experts through specialist advisory groups.</p>
          </dd></div>
          <div><dt>Deliverable:</dt><dd><ul className={styles.deliverables}><li>Accredited Training Products</li></ul></dd></div>
          <div><dt>Impact:</dt><dd>Develop nationally consistent approach to training digital forensics for policing and support addressing an area of skills shortage.</dd></div>
          <div><dt>Anticipated timing:</dt><dd>18-month project</dd></div>
        </dl>
        <aside>
          <h3>Key Stakeholders:</h3>
          <ul className={`${layout.stakeholders} ${styles.stakeholders}`}>
            {stakeholders.map((stakeholder) => <li key={stakeholder}><span aria-hidden="true">• </span>{stakeholder}</li>)}
          </ul>
        </aside>
      </div>
    </section>
  </PublicSafetyPageShell>;
}
