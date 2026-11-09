"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import styles from "./PublicSafetyCrossSectorAnalysisView.module.css";

const themes = [
  {
    label: "THEME 1",
    title: "Public Safety’s regulatory environment",
    body: "Public Safety industry-sectors are institutions  accountable to governments. As such, they are  subject to regulatory oversight bodies, government  fiscal positions (including budget constraints  and financial accountability) and are impacted by  election cycles and political commitments.",
  },
  {
    label: "THEME 2",
    title: "Public Safety taskings",
    body: "The Public Safety workforce is required to remain  agile and responsive to urgent taskings. This  requires that Public Safety organisations ensure  they are prepared to ‘scale up’ workforce resources  in response to natural disasters, emergency  incidents, geopolitical events etc, through  leveraging available surge capacity",
  },
  {
    label: "THEME 3",
    title: "Public Safety’s resourcing",
    body: "The Public Safety workforce uses a mix of career  uniform personnel, reservists, volunteers and public sector personnel, to be fit for purpose across various contexts.",
  },
  {
    label: "THEME 4",
    title: "Public Safety’s risk environment",
    body: "The Public Safety workforce is exposed to  demanding and, at times, hazardous work  conditions. These workforces are trained to operate  within high-stress and challenging environments  but are not immune to resultant injury. This is a  significant factor affecting workforce sustainability",
  },
];

const analysisLinks = [
  { number: "1", title: "Core Skill Alignment", path: "cross_sector_core_skill_alignment" },
  { number: "2", title: "Specialist Skill Alignment", path: "cross_sector_specialist_skill_alignment" },
  { number: "3", title: "Skill Recognition", path: "cross_sector_skills_recognition" },
];

export default function PublicSafetyCrossSectorAnalysisView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  const [activeTheme, setActiveTheme] = useState<number | null>(null);
  const themesRef = useRef<HTMLElement>(null);
  const interoperabilityRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const [themesVisible, setThemesVisible] = useState(false);
  const [interoperabilityVisible, setInteroperabilityVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);
  const selectedTheme = activeTheme === null ? null : themes[activeTheme];
  const themeDetail = selectedTheme ? (
    <article id="cross-sector-theme-detail" data-theme={activeTheme === null ? undefined : activeTheme + 1} className={`${styles.detailPanel} ${styles.enter} ${activeTheme === 3 ? styles.detailPanelStandalone : ""}`}>
      <h2>{selectedTheme.title}</h2>
      <p>{selectedTheme.body}</p>
    </article>
  ) : null;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === themesRef.current) setThemesVisible(true);
        if (entry.target === interoperabilityRef.current) setInteroperabilityVisible(true);
        if (entry.target === linksRef.current) setLinksVisible(true);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    if (themesRef.current) observer.observe(themesRef.current);
    if (interoperabilityRef.current) observer.observe(interoperabilityRef.current);
    if (linksRef.current) observer.observe(linksRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="cross_sector_analysis"
      contentClassName={styles.page}
      navigation={{
        back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        next: { label: "Core Skill Alignment", href: `/reports/${slug}/cross_sector_core_skill_alignment` },
      }}
    >
      <section className={styles.hero}>
        <div className={styles.heroCopy + " " + styles.enter}>
          <p className={styles.eyebrow}>Public Safety WIR 2026 · Cross-Sector Analysis</p>
          <h1>Public Safety Cross-Sector Analysis</h1>
          <p className={styles.heroDescription}>Public Safety industry-sectors are responsible for safeguarding Australia’s people, property and environment through the combined efforts of the Defence, Fire and Emergency Services and Police industry-sectors. These industry-sectors prepare for, respond to and recover from natural disasters, emergency incidents, law and order, sovereign capabilities and geopolitical uncertainty.</p>
        </div>
        <div aria-hidden="true" className={styles.diagram}>
          <picture>
            <source media="(prefers-reduced-motion: reduce)" srcSet="/images/reports/public-safety/cross-sector-group-92.svg" />
            <Image src="/images/reports/public-safety/cross-sector-group-92-animated.svg" alt="" width={364} height={277} loading="eager" />
          </picture>
        </div>
      </section>

      <section ref={themesRef} className={styles.themes + " " + (themesVisible ? styles.enter : styles.pending)}>
        <h2 className={styles.sectionTitle}>Four Themes Consistently Impacting Workforce Planning · 2025 Public Safety Workforce Insight Report</h2>
        <p className={styles.themeIntro}>The 2025 Public Safety Workforce Insights Report identified four themes that consistently impact workforce planning across these industry-sectors, they include:</p>
        <div className={styles.themeGrid + (selectedTheme ? " " + styles.themeGridOpen : "")}>
          {themes.map((theme, index) => {
            const selected = activeTheme === index;
            return (
              <article key={theme.label} style={{ animationDelay: (index * 0.12 + 0.1) + "s" }} className={styles.themeCard + " " + (themesVisible ? styles.enter : styles.pending) + " " + (selected ? styles.selected : "")}>
                <p className={styles.themeLabel}>{theme.label}</p>
                <h3>{theme.title}</h3>
                <button type="button" aria-expanded={selected} aria-controls="cross-sector-theme-detail" aria-label={(selected ? "Close " : "Open ") + theme.label.toLowerCase()} onClick={() => setActiveTheme(selected ? null : index)} className={styles.button}>
                  {selected ? "Close" : "Open"}<ChevronDown className={selected ? styles.chevronOpen : undefined} />
                </button>
              </article>
            );
          })}
        </div>
        {activeTheme !== 3 && themeDetail}
      </section>

      {activeTheme === 3 && themeDetail}

      <section ref={interoperabilityRef} className={styles.interoperability + " " + (interoperabilityVisible ? styles.enter : styles.pending)}>
        <div>
          <p>In addition to the themes above, Public Safety industry-sectors are increasingly required to improve cross-sector interoperability allowing organisations to interact, balance different legal arrangements and provide surge capacity. This requires a level of cross-industry skills recognition.</p>
          <p>Greater cross-industry skills recognition of transferable competencies is essential for sustainable interoperability. When personnel from Defence, Fire and Emergency Services and Police share a common understanding of incident-management language, technical skills (communications, logistics, command and control) and recognised qualifications, multi-organisation teams can integrate faster, reduce safety risks and maintain surge capability during prolonged or simultaneous operations.</p>
        </div>
      </section>

      <p className={styles.analysisInstruction}>Select ‘view’ to explore cross-industry skills in detail.</p>
      <section ref={linksRef} className={styles.analysisLinks} aria-label="Cross-sector analysis sections">
        {analysisLinks.map((item, index) => (
          <article key={item.number} style={{ animationDelay: (index * 0.12 + 0.1) + "s" }} className={styles.analysisCard + " " + (linksVisible ? styles.enter : styles.pending)}>
            <span aria-hidden="true" className={styles.number}>{item.number}</span>
            <h2>{item.title}</h2>
            <button type="button" onClick={() => router.push('/reports/' + slug + '/' + item.path)} aria-label={"View " + item.title} className={styles.button}>View <ArrowRight /></button>
          </article>
        ))}
      </section>
    </PublicSafetyPageShell>
  );
}
