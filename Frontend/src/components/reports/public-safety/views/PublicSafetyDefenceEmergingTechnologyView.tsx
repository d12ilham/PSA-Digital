"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import styles from "./PublicSafetyDefenceEmergingTechnologyView.module.css";

import { defenceTechnologySources } from "./defenceTechnologySources";

export default function PublicSafetyDefenceEmergingTechnologyView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const contentRef = useRef<HTMLElement>(null);
  const sourcesRef = useRef<HTMLElement>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [sourcesVisible, setSourcesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === contentRef.current) setContentVisible(true);
        if (entry.target === sourcesRef.current) setSourcesVisible(true);
      });
    }, { threshold: 0.08 });
    if (contentRef.current) observer.observe(contentRef.current);
    if (sourcesRef.current) observer.observe(sourcesRef.current);
    return () => observer.disconnect();
  }, []);

  const reportPath = `/reports/${slug}`;
  return <PublicSafetyPageShell
    slug={slug}
    report={report}
    currentPage="defence_emerging_technology"
    contentClassName={styles.page}
    navigation={{
      back: { label: "Defence Workforce Insights", href: `${reportPath}/defence_workforce_insights` },
      backSecondary: { label: "Executive Summary", href: `${reportPath}/executive_summary` },
      prev: { label: "Workforce Insights", href: `${reportPath}/defence_workforce_insights` },
      next: { label: "Emerging Technology 2", href: `${reportPath}/defence_emerging_technology_2` },
      prevPrefix: "Previous Section:",
      nextPrefix: "Next Section",
    }}
  >
    <section className={styles.hero} aria-labelledby="defence-technology-title">
      <div className="animate-slide-up">
        <p className={styles.badge}>Theme 1. Emerging Technology. Insight One</p>
        <h1 id="defence-technology-title">1. Emerging Technology</h1>
      </div>
      <Image className={`${styles.icon} animate-zoom-in`} src="/images/reports/public-safety/defence-emerging-technology-icon.png" width={120} height={120} alt="" unoptimized priority />
    </section>

    <section ref={contentRef} className={`${styles.content} ${contentVisible ? "animate-slide-up" : styles.pending}`} aria-labelledby="defence-technology-market">
      <div className={styles.callout}>
        <span className={styles.number} aria-hidden="true">1</span>
        <div className={styles.calloutCopy}>
          <p className={styles.insightLabel}>Theme One, Insight One</p>
          <p className={styles.insightText}>Challenges in rapid adoption of emerging technology remains, due to significant security screening requirements for any new technology adoption. Limitations exist for the speed of being able to upskill employees in the use of any new technology.</p>
        </div>
        <Image className={`${styles.icon} ${contentVisible ? "animate-zoom-in" : ""}`} src="/images/reports/public-safety/defence-emerging-insight-icon.png" width={120} height={120} alt="" unoptimized />
      </div>
      <h2 id="defence-technology-market">Emerging technologies across the labour market</h2>
      <div className={styles.body}>
        <p>Across the broader labour market in Australia, emerging technologies are considered to be drivers of long-term productivity growth. Adopting these emerging technologies requires supporting workforces to rapidly train and upskill, changing traditional approaches to training.<sup>16</sup> It is anticipated that across the labour market, Australia will require 1.3 million technology professionals by 2030, equating to 52,000 employees.<sup>17</sup> Recent data indicates that between 2016 and 2021, 75,000 Information and Communication Technology (ICT) students entered the broader technology sector following completion of a university or VET qualification, which equates to only 15,000 ICT professionals annually.<sup>18</sup></p>
        <p>While not Defence-specific, this shortage indicates the need to ensure the Australian Defence Force workforce is not only appropriately skilled to deploy emerging technologies, but that individuals are attracted and retained, noting the competing need for such professionals across the wider labour market.</p>
        <p>The adoption of the 2024 National Defence Strategy has resulted in a change in capability priorities for the ADF, which has now moved “to an integrated, focused force designed to address Australia&apos;s most significant strategic risks”. This is markedly different from the previous balanced force approach, which was structured to respond to a range of possibilities.<sup>19</sup> Noting this change, ADF stakeholders who were consulted, emphasised the importance of training for capability that is agile and resilient to strategic shocks, and adaptable to government priorities.</p>
      </div>
    </section>

    <hr className={styles.divider} />

    <section data-report-sources ref={sourcesRef} className={`${styles.sources} ${sourcesVisible ? "animate-slide-up" : styles.pending}`} aria-labelledby="defence-technology-sources">
      <h2 id="defence-technology-sources">Sources</h2>
      <ol start={16}>
        {defenceTechnologySources.map((source, index) => {
          const number = index + 16;
          return <li key={number} className={sourcesVisible ? "animate-card-entrance" : undefined} style={{ animationDelay: `${index * .05 + .1}s` }}>
            <span className={styles.sourceNumber} aria-hidden="true">{number}</span>
            <span>{source}</span>
          </li>;
        })}
      </ol>
    </section>
  </PublicSafetyPageShell>;
}
