"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import layout from "./PublicSafetyDefenceWorkforceInsightsView.module.css";
import styles from "./PublicSafetyFesWorkforceInsightsView.module.css";

const themes = [
  {
    eyebrow: "Theme 1 · 3 insights",
    title: "1. Disaster Recovery",
    insights: [
      { number: "1", href: "fes_disaster_recovery", label: "Theme One, Insight One", text: "Specialist disaster recovery functions are operationally focused; a more contemporary approach now requires capabilities related to the unique aspects of working with communities that may be grieving or socially, emotionally and financially impacted." },
      { number: "2", href: "fes_disaster_recovery_2", label: "Theme One, Insight Two", text: "Challenges in access to nationally accredited disaster recovery training products leads to inconsistencies in recovery outcomes, reduced community trust and limits the ability of communities to rebuild from the impacts of disasters." },
      { number: "3", href: "fes_disaster_recovery_3", label: "Theme One, Insight Three", text: "Australia is experiencing a critical challenge in maintaining capability to use fire effectively in the landscape, particularly for complex prescribed burning and backburning during bushfire suppression." },
    ],
  },
  {
    eyebrow: "Theme 2 · 1 insight",
    title: "2. Surf Life Saving First Aid",
    insights: [
      { number: "4", href: "fes_surf_life_saving_first_aid", label: "Theme Two, Insight Four", text: "The HLTAID010 unit of competency is an entry-level first aid training product that is no longer meeting the operational needs for volunteer surf lifesavers." },
    ],
  },
  {
    eyebrow: "Theme 3 · 1 insight",
    title: "3. Hazardous Materials",
    insights: [
      { number: "5", href: "fes_hazardous_materials", label: "Theme Three, Insight Five", text: "Incidents involving hazardous materials are becoming increasingly important while current training may be limiting in some Fire and Emergency Services organisations ability to deliver this type of service." },
    ],
  },
];

export default function PublicSafetyFesWorkforceInsightsView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  const strategiesPath = `/reports/${slug}/fes_workforce_strategies`;

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_workforce_insights" contentClassName={`${layout.page} ${styles.page}`} navigation={{
    back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    backSecondary: { label: "Fire and Emergency Services chapter", href: `/reports/${slug}/fes` },
    prev: { label: "Industry Profile", href: `/reports/${slug}/fes_industry_profile` },
    next: { label: "2026 Proposed Workforce Strategies", href: strategiesPath },
    prevPrefix: "Previous Section:",
    nextPrefix: "Next Section:",
  }}>
    <section className={layout.hero}>
      <div className={`${layout.heroCopy} animate-slide-up`}>
        <span className={`${layout.badge} ${styles.badge}`}>FES Workforce Insights</span>
        <h1>Workforce Insights</h1>
        <p>This Report identifies the following themes and industry insights relating to the Fire and Emergency Services Workforce:</p>
      </div>
      <Image className={`${layout.artwork} ${styles.artwork} animate-zoom-in`} src="/images/reports/public-safety/fes-workforce-insights-group-93.png" width={446} height={100} alt="" unoptimized priority />
    </section>

    <p className={`${styles.instruction} animate-slide-up-delay`}>Select any insight to open its detail page.</p>

    <section className={`${layout.themes} ${styles.themes}`} aria-label="Fire and Emergency Services workforce insight themes">
      {themes.map((theme, index) => (
        <article key={theme.title} className={`${layout.theme} ${styles.theme} animate-card-entrance`} style={{ animationDelay: `${100 + index * 100}ms` }}>
          <p className={layout.eyebrow}>{theme.eyebrow}</p>
          <h2>{theme.title}</h2>
          <p className={layout.industryLabel}>Industry Insights</p>
          <div className={layout.insights}>
            {theme.insights.map(insight => (
              <button key={insight.number} type="button" className={`${layout.insight} ${styles.insight} animate-card-entrance`} style={{ animationDelay: `${250 + (Number(insight.number) - 1) * 85}ms` }} onClick={() => router.push(`/reports/${slug}/${insight.href}`)}>
                <span className={`${layout.number} ${styles.number}`} aria-hidden="true">{insight.number}</span>
                <span className={`${layout.insightCopy} ${styles.insightCopy}`}><strong>{insight.label}</strong><span>{insight.text}</span></span>
                <span className={layout.insightArrow} aria-hidden="true"><ArrowRight size={16} strokeWidth={1.75} /></span>
              </button>
            ))}
          </div>
        </article>
      ))}
    </section>

    <div>
      <button type="button" className={`${layout.strategies} ${styles.strategies}`} onClick={() => router.push(strategiesPath)}>
        Fire and Emergency Services Workforce Strategies <ArrowRight size={16} aria-hidden="true" />
      </button>
    </div>
  </PublicSafetyPageShell>;
}
