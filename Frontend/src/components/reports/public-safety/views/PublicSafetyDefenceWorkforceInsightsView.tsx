"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import styles from "./PublicSafetyDefenceWorkforceInsightsView.module.css";

const themes = [
  {
    eyebrow: "Theme 1 · 2 insights",
    title: "1. Emerging Technology",
    insights: [
      {
        number: "1",
        href: "defence_emerging_technology",
        label: "Theme One, Insight One",
        text: "Challenges in rapid adoption of emerging technology remains, due to significant security screening requirements for any new technology adoption. Limitations exist for the speed of being able to upskill employees in the use of any new technology.",
      },
      {
        number: "2",
        href: "defence_emerging_technology_2",
        label: "Theme One, Insight Two",
        text: "Provisioning targeted training faster through short courses (often referred to as micro-credentials). Leveraging Vocational Education and Training Units of Competency could be effective in responding to emerging technologies.",
      },
    ],
  },
  {
    eyebrow: "Theme 2 · 2 insights",
    title: "2. Transitioning Veterans",
    insights: [
      {
        number: "1",
        href: "defence_transitioning_veterans",
        label: "Theme Two, Insight One",
        text: "The Vocational Education and Training (VET) system remains important for the ADF as it provides a national standard, with meaningful qualifications written by industry, for industry.",
      },
      {
        number: "2",
        href: "defence_transitioning_veterans_2",
        label: "Theme Two, Insight Two",
        text: "Greater focus is required to support those transitioning (including veterans) to articulate the transferability of their VET qualifications and the relevance of their ADF experience to the civilian workforce. Where support is available, the information provided could be bolstered.",
      },
    ],
  },
];

function InsightCard({ insight, onClick, delay }: { insight: { number: string; label: string; text: string; href: string }; onClick: () => void; delay: number }) {
  return <button type="button" onClick={onClick} style={{ animationDelay: `${delay}s` }} className={`${styles.insight} animate-card-entrance`}>
    <span className={styles.number} aria-hidden="true">{insight.number}</span>
    <span className={styles.insightCopy}>
      <strong>{insight.label}</strong>
      <span>{insight.text}</span>
    </span>
    <span className={styles.insightArrow} aria-hidden="true"><ArrowRight size={16} strokeWidth={1.75} /></span>
  </button>;
}

export default function PublicSafetyDefenceWorkforceInsightsView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  const themesRef = useRef<HTMLElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const [themesVisible, setThemesVisible] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === themesRef.current) setThemesVisible(true);
        if (entry.target === actionRef.current) setActionVisible(true);
      });
    }, { threshold: 0.08 });
    if (themesRef.current) observer.observe(themesRef.current);
    if (actionRef.current) observer.observe(actionRef.current);
    return () => observer.disconnect();
  }, []);

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="defence_workforce_insights" contentClassName={styles.page} navigation={{ back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`}, backSecondary:{label:"Defence Chapter",href:`/reports/${slug}/defence`}, prev:{label:"Industry Profile",href:`/reports/${slug}/defence_industry_profile`}, next:{label:"2026 Proposed Workforce Strategies",href:`/reports/${slug}/defence_workforce_strategies`}, prevPrefix:"Previous Section:", nextPrefix:"Next Section:" }}>
    <section className={styles.hero} aria-labelledby="defence-workforce-insights-title">
      <div className={`${styles.heroCopy} animate-slide-up`}>
        <span className={styles.badge}>Defence</span>
        <h1 id="defence-workforce-insights-title">Workforce Insights</h1>
        <p>This Report identifies the following themes and industry insights relating to the Australian Defence Force (ADF). Select an industry insight to open its own page. Each page returns here.</p>
      </div>
      <Image className={`${styles.artwork} animate-zoom-in`} src="/images/reports/public-safety/defence-workforce-insights-icons.png" width={260} height={120} alt="" unoptimized priority />
    </section>

    <section ref={themesRef} className={styles.themes} aria-label="Defence workforce insight themes">
      {themes.map((theme, themeIndex) => <article key={theme.title} style={{ animationDelay: `${themeIndex * .14 + .1}s` }} className={`${styles.theme} ${themesVisible ? "animate-card-entrance" : styles.pending}`}>
        <p className={styles.eyebrow}>{theme.eyebrow}</p>
        <h2>{theme.title}</h2>
        <p className={styles.industryLabel}>Industry Insights</p>
        <div className={styles.insights}>
          {theme.insights.map((insight, insightIndex) => <InsightCard key={insight.number} insight={insight} delay={themeIndex * .14 + insightIndex * .1 + .25} onClick={() => router.push(`/reports/${slug}/${insight.href}`)} />)}
        </div>
      </article>)}
    </section>

    <div ref={actionRef} className={actionVisible ? "animate-slide-up" : styles.pending}>
      <button type="button" className={styles.strategies} onClick={() => router.push(`/reports/${slug}/defence_workforce_strategies`)}>
        Defence Workforce Strategies <ArrowRight size={16} aria-hidden="true" />
      </button>
    </div>
  </PublicSafetyPageShell>;
}
