"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import layout from "./PublicSafetyDefenceView.module.css";
import styles from "./PublicSafetyFesView.module.css";

const sections = [
  { title:"Industry-Sector Overview", href:"fes_industry_overview", copy:"Statistics and data of the industry-sector’s workforce – increasing demand, career and volunteer workforces and Surf Life Saving, with the report’s charts." },
  { title:"Industry Profile", href:"fes_industry_profile", copy:"Chart library: yearly enrolments and completions for firefighter, SES and Surf Life Saving qualifications, and the workforce by jurisdiction." },
  { title:"Workforce Insights", href:"fes_workforce_insights", copy:"Analysis and insights on current and emerging challenges across three themes: Disaster Recovery, Surf Life Saving First Aid and Hazardous Materials." },
  { title:"2026 Proposed Workforce Strategies", href:"fes_workforce_strategies", copy:"The three strategies proposed to mitigate identified challenges – objective, approach, deliverable, impact, timing and key stakeholders." },
  { title:"2025 Strategy Updates", href:"fes_update_2025_strategies", copy:"Updates on the five strategies proposed in the 2025 report as to their progress, stakeholders and connection to 2026 strategies." },
  { title:"Existing Industry-Sector Strategies", href:"fes_existing_strategies", copy:"Existing strategies used by Government and the industry-sector, and how each informs Public Skills Australia’s work." },
];

export default function PublicSafetyFesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  return <PublicSafetyPageShell contentClassName={`${layout.page} ${styles.page}`} slug={slug} report={report} currentPage="fes" navigation={{back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`},prev:{label:"Defence Veterans’ Programs and Initiatives",href:`/reports/${slug}/defence_federal_initiatives`},next:{label:"Industry-Sector Overview",href:`/reports/${slug}/fes_industry_overview`},prevPrefix:"Previous Section:",nextPrefix:"Next Section:"}}>
    <section className={layout.hero}>
      <div className={layout.heroCopy}>
        <span className={`${layout.badge} ${styles.badge}`}>FES Introduction</span>
        <h1>Fire and Emergency Services</h1>
        <p>This chapter of the 2026 Public Safety Workforce Insights Report covers the Fire and Emergency Services industry-sector — its career and volunteer workforces across firefighting, state and territory emergency services and surf life saving. Open any section below, or move through the chapter in report order.</p>
      </div>
      <div className={`${styles.artwork} animate-zoom-in`}>
        <Image src="/images/reports/public-safety/fes-chapter-fire-engine.svg" width={180} height={180} alt="" unoptimized priority />
      </div>
    </section>

    <section className={layout.sections} aria-label="Fire and Emergency Services report sections">
      {sections.map((section, index) => (
        <article key={section.href} className={`${layout.card} ${styles.card} ${layout.enter}`} style={{ animationDelay: `${(index + 1) * 100}ms` }}>
          <h2>{section.title}</h2>
          <p>{section.copy}</p>
          <button type="button" onClick={() => router.push(`/reports/${slug}/${section.href}`)} className={layout.open} aria-label={`Open ${section.title}`}>
            Open <ArrowRight aria-hidden="true" />
          </button>
        </article>
      ))}
    </section>
  </PublicSafetyPageShell>;
}
