"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import layout from "./PublicSafetyDefenceView.module.css";
import styles from "./PublicSafetyPoliceView.module.css";

const sections = [
  {
    title: "Industry-Sector Overview",
    description: "Statistics and data of the industry-sector’s workforce — the national sworn police officer FTE trend and each state, territory and federal jurisdiction, with the report’s charts.",
    path: "police_industry_overview",
  },
  {
    title: "Industry Profile",
    description: "Chart library: First Nations proportion of police employees, female gender proportion, and national police employees by state and territory.",
    path: "police_industry_profile",
  },
  {
    title: "Workforce Insights",
    description: "Analysis and insights on current and emerging challenges across two themes: Digital Forensics and Rural, Regional and Remote Police Leadership.",
    path: "police_workforce_insights",
  },
  {
    title: "2026 Proposed Workforce Strategies",
    description: "The strategy proposed to mitigate identified challenges — objective, approach, deliverable, impact, timing and key stakeholders.",
    path: "police_workforce_strategies",
  },
  {
    title: "2025 Strategy Updates",
    description: "Updates on the three strategies proposed in the 2025 report as to their progress, stakeholders and connection to 2026 strategies.",
    path: "police_update_2025_strategies",
  },
  {
    title: "Existing Industry-Sector Strategies",
    description: "Twelve existing strategies used by the Australian Federal Police and state and territory police, and how each informs Public Skills Australia’s work.",
    path: "police_existing_strategies",
  },
];

export default function PublicSafetyPoliceView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();

  return <PublicSafetyPageShell
    slug={slug}
    report={report}
    currentPage="police"
    contentClassName={`${layout.page} ${styles.page}`}
    navigation={{
      back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
      prev: { label: "Disaster Recovery Training Products (Appendix B)", href: `/reports/${slug}/fes_disaster_recovery_training_products` },
      next: { label: "Industry-Sector Overview", href: `/reports/${slug}/police_industry_overview` },
      prevPrefix: "Previous Section:",
      nextPrefix: "Next Section:",
    }}
  >
    <section className={`${layout.hero} ${styles.hero}`}>
      <div className={layout.heroCopy}>
        <span className={`${layout.badge} ${styles.badge}`}>POL · Industry-Sector Analysis</span>
        <h1>Police Chapter</h1>
        <p>This chapter of the 2026 Public Safety Workforce Insights Report covers the Police industry-sector — the eight state and territory police forces and the Australian Federal Police. Open any section below, or move through the chapter in report order.</p>
      </div>
      <div className={`${layout.artwork} ${styles.artwork}`}>
        <Image src="/images/police-chapter-vehicle.svg" alt="" width={136} height={136} unoptimized priority />
      </div>
    </section>

    <section className={layout.sections} aria-label="Police report sections">
      {sections.map((section, index) => <article key={section.path} className={`${layout.card} ${styles.card} ${layout.enter}`} style={{ animationDelay: `${(index + 1) * 100}ms` }}>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
        <button type="button" onClick={() => router.push(`/reports/${slug}/${section.path}`)} className={layout.open} aria-label={`Open ${section.title}`}>
          Open <ArrowRight aria-hidden="true" />
        </button>
      </article>)}
    </section>
  </PublicSafetyPageShell>;
}
