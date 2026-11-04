"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import styles from "./PublicSafetyDefenceView.module.css";

const sections = [
  { title: "Industry-Sector Overview", description: "Statistics and data of the Defence workforce — current workforce, future workforce and veterans, with the report’s charts.", path: "defence_industry_overview" },
  { title: "Industry Profile", description: "Chart library: headcount and separation by service branch, gender and First Nations participation, ADF by location and operations.", path: "defence_industry_profile" },
  { title: "Workforce Insights", description: "Four industry insights across two themes: Emerging Technology and Transitioning Veterans.", path: "defence_workforce_insights" },
  { title: "2026 Proposed Workforce Strategies", description: "The two strategies proposed to mitigate identified challenges — objective, approach, deliverable, impact, timing and key stakeholders.", path: "defence_workforce_strategies" },
  { title: "2025 Strategy Updates", description: "Updates on the five strategies proposed in the 2025 report as to their progress, stakeholders and connection to 2026 strategies.", path: "defence_update_2025_strategies" },
  { title: "Existing Industry-Sector Strategies", description: "Existing strategies used by Government and the industry-sector, and how each informs Public Skills Australia’s work.", path: "defence_existing_strategies" },
  { title: "Defence Veterans’ Programs and Initiatives", description: "Appendix A — programs and initiatives in each state and territory that support transitioning and transitioned veterans.", path: "defence_federal_initiatives" },
];

export default function PublicSafetyDefenceView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  const sectionsRef = useRef<HTMLElement>(null);
  const [sectionsVisible, setSectionsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setSectionsVisible(true);
    }, { threshold: 0.08 });

    if (sectionsRef.current) observer.observe(sectionsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="defence"
      contentClassName={styles.page}
      navigation={{
        back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        prev: { label: "Skills Recognition", href: `/reports/${slug}/cross_sector_skills_recognition` },
        next: { label: "Industry-Sector Overview", href: `/reports/${slug}/defence_industry_overview` },
        prevPrefix: "Previous Section:",
        nextPrefix: "Next Section:",
      }}
    >
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.badge}>DEF · Industry-Sector Analysis</span>
          <h1>Defence</h1>
          <p>This chapter of the 2026 Public Safety Workforce Insights Report covers the Defence industry-sector — the permanent and reserve Australian Defence Force and the civilian Australian Public Service workforce of the Department of Defence. Open any section below, or move through the chapter in report order.</p>
        </div>
        <div className={styles.artwork}>
          <Image src="/images/reports/public-safety/defence-industry-overview-group-93.svg" width={446} height={100} alt="Australian Defence Force tank, navy ship and aircraft connected by a dotted line" unoptimized loading="eager" />
        </div>
      </section>

      <section ref={sectionsRef} className={styles.sections} aria-label="Defence report sections">
        {sections.map((section, index) => (
          <article key={section.title} style={sectionsVisible ? { animationDelay: `${index * 0.1 + 0.1}s` } : undefined} className={`${styles.card} ${sectionsVisible ? styles.enter : styles.pending}`}>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <button type="button" onClick={() => router.push(`/reports/${slug}/${section.path}`)} className={styles.open} aria-label={`Open ${section.title}`}>Open <ArrowRight aria-hidden="true" /></button>
          </article>
        ))}
      </section>
    </PublicSafetyPageShell>
  );
}
