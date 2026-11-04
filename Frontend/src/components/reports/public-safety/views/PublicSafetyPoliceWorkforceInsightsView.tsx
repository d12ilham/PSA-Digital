"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import layout from "./PublicSafetyDefenceWorkforceInsightsView.module.css";
import styles from "./PublicSafetyPoliceWorkforceInsightsView.module.css";

const themes = [
  {
    eyebrow: "Theme 1 · 2 insights",
    title: "1. Digital Forensics",
    insights: [
      { number: "1", href: "police_digital_forensics", label: "Theme One, Insight One", text: "Skills shortages and strong demand for similar skills may require the establishment of multiple entry pathways for digital forensic professionals into policing." },
      { number: "2", href: "police_digital_forensics_2", label: "Theme One, Insight Two", text: "The VET system is well established to deliver a nationally consistent approach to training, however, the Police Training Package currently does not contain a qualification specialising in digital forensics." },
    ],
  },
  {
    eyebrow: "Theme 2 · 1 insight",
    title: "2. Rural, Regional and Remote Police Leadership",
    insights: [
      { number: "3", href: "police_regional_remote_leadership", label: "Theme Two, Insight Three", text: "Police officers being required to take on more leadership responsibilities earlier in their careers, particularly in regional, rural and remote areas, where workforce shortages are more pronounced. This may require more support in accelerating leadership skills development." },
    ],
  },
];

export default function PublicSafetyPoliceWorkforceInsightsView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="police_workforce_insights" contentClassName={`${layout.page} ${styles.page}`} navigation={{
    back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    backSecondary: { label: "Police chapter", href: `/reports/${slug}/police` },
    prev: { label: "Industry Profile", href: `/reports/${slug}/police_industry_profile` },
    next: { label: "2026 Proposed Workforce Strategy", href: `/reports/${slug}/police_workforce_strategies` },
    prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
  }}>
    <section className={layout.hero}>
      <div className={`${layout.heroCopy} animate-slide-up`}>
        <span className={`${layout.badge} ${styles.badge}`}>POL Workforce Insights</span>
        <h1>Workforce Insights</h1>
        <p>This Report identifies the following themes and industry insights relating to the police workforce. Select an industry insight to open its own page. Each page returns here.</p>
      </div>
      <Image className={`${layout.artwork} ${styles.artwork} animate-zoom-in`} src="/images/reports/public-safety/police-workforce-insights-icons.png" width={350} height={160} alt="" unoptimized priority />
    </section>

    <section className={layout.themes} aria-label="Police workforce insight themes">
      {themes.map((theme, index) => (
        <article key={theme.title} className={`${layout.theme} ${styles.theme} animate-card-entrance`} style={{ animationDelay: `${index * 150}ms` }}>
          <p className={layout.eyebrow}>{theme.eyebrow}</p>
          <h2>{theme.title}</h2>
          <p className={layout.industryLabel}>Industry Insights</p>
          <div className={layout.insights}>
            {theme.insights.map((insight) => (
              <button key={insight.number} type="button" className={`${layout.insight} ${styles.insight}`} onClick={() => router.push(`/reports/${slug}/${insight.href}`)}>
                <span className={`${layout.number} ${styles.number}`} aria-hidden="true">{insight.number}</span>
                <span className={`${layout.insightCopy} ${styles.insightCopy}`}><strong>{insight.label}</strong>{insight.text}</span>
                <span className={layout.insightArrow}><ArrowRight size={16} aria-hidden="true" /></span>
              </button>
            ))}
          </div>
        </article>
      ))}
    </section>
  </PublicSafetyPageShell>;
}