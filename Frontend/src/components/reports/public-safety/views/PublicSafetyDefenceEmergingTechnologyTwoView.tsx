"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { defenceTechnologySources } from "./defenceTechnologySources";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import styles from "./PublicSafetyDefenceEmergingTechnologyView.module.css";

const capabilities = [
  { label: <>Autonomous maritime systems and uncrewed/<wbr />optionally crewed vehicles</>, icon: "maritime" },
  { label: "Decision advantage and intelligence systems", icon: "intelligence" },
  { label: "Warfighting networks and strategic communication", icon: "networks" },
  { label: "Uncrewed air systems", icon: "uncrewed-air" },
  { label: "Enhanced cyber capabilities", icon: "cyber" },
  { label: "Space sensors", icon: "space" },
];

const investments = [
  { label: "Acquisition of 300 Australian-made drones", icon: "acquisition" },
  { label: "Development of advanced counter-drone technology", icon: "counter-drone" },
  { label: "Adoption of more than 20 different drone systems", icon: "drone-systems", note: 26 },
];

function TileList({ items, compact = false }: {
  items: { label: ReactNode; icon: string; note?: number }[];
  compact?: boolean;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: .08 });
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return <ul ref={listRef} className={`${styles.tiles} ${compact ? styles.capabilityTiles : ""}`}>
    {items.map(({ label, icon, note }, index) => <li key={icon} className={`${styles.tile} ${visible ? "animate-card-entrance" : styles.pending}`} style={{ animationDelay: `${index * .08 + .12}s` }}>
      <Image src={`/images/reports/public-safety/defence-technology/${icon}.png`} alt="" width={compact ? 61 : 60} height={60} unoptimized />
      <span>{label}{note && <sup>{note}</sup>}</span>
    </li>)}
  </ul>;
}

export default function PublicSafetyDefenceEmergingTechnologyTwoView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const contentRef = useRef<HTMLElement>(null);
  const sourcesRef = useRef<HTMLElement>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [sourcesVisible, setSourcesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (entry.target === contentRef.current) setContentVisible(true);
        if (entry.target === sourcesRef.current) setSourcesVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: .08 });
    if (contentRef.current) observer.observe(contentRef.current);
    if (sourcesRef.current) observer.observe(sourcesRef.current);
    return () => observer.disconnect();
  }, []);

  const reportPath = `/reports/${slug}`;
  return <PublicSafetyPageShell
    slug={slug}
    report={report}
    currentPage="defence_emerging_technology_2"
    contentClassName={`${styles.page} ${styles.insightTwo}`}
    navigation={{
      back: { label: "Defence Workforce Insights", href: `${reportPath}/defence_workforce_insights` },
      backSecondary: { label: "Executive Summary", href: `${reportPath}/executive_summary` },
      prev: { label: "Workforce Insights", href: `${reportPath}/defence_workforce_insights` },
      next: { label: "2. Transitioning Veterans", href: `${reportPath}/defence_transitioning_veterans` },
      prevPrefix: "Previous Section:",
      nextPrefix: "Next Section:",
    }}
  >
    <section className={styles.hero} aria-labelledby="defence-technology-two-title">
      <div className="animate-slide-up">
        <p className={styles.badge}>Theme 1. Emerging Technology. Insight Two</p>
        <h1 id="defence-technology-two-title">1. Emerging Technology</h1>
      </div>
      <Image className={`${styles.icon} animate-zoom-in`} src="/images/reports/public-safety/defence-emerging-technology-icon.png" width={120} height={120} alt="" unoptimized priority />
    </section>

    <section ref={contentRef} className={`${styles.content} ${contentVisible ? "animate-slide-up" : styles.pending}`} aria-label="Emerging Technology Insight Two">
      <div className={styles.callout}>
        <span className={styles.number} aria-hidden="true">2</span>
        <div className={styles.calloutCopy}>
          <p className={styles.insightLabel}>Theme One, Insight Two</p>
          <p className={styles.insightText}>Provisioning targeted training faster through short courses (often referred to as <span className={styles.keepWord}>micro-credentials</span>). Leveraging Vocational Education and Training Units of Competency could be effective in responding to emerging technologies.</p>
        </div>
        <Image className={`${styles.icon} ${contentVisible ? "animate-zoom-in" : ""}`} src="/images/reports/public-safety/defence-emerging-insight-icon.png" width={120} height={120} alt="" unoptimized />
      </div>

      <h2>Capability investment priorities</h2>
      <div className={styles.columns}>
        <div className={styles.body}>
          <p>Recruitment, training and retention of a highly specialised and skilled workforce is necessary to meet emerging technology challenges and future capability needs.<sup>20</sup> As detailed in the Industry Overview section, the ADF workforce has been expanding in recent years due to an increase in enlistments alongside a decline in separations. Defence stakeholders noted that the ADF workforce will need to enhance their ability to upskill this workforce to be technically proficient in new and emerging technologies.<sup>21</sup></p>
          <p>The 2024 Integrated Investment Program outlines $330 billion through to 2033-34 on capability investment priorities that include the following areas (relating to new and emerging technologies):<sup>22</sup></p>
          <p>As a result of the need to acquire emerging technologies to be able to respond to future threats, the ADF faces the challenge of ensuring that their personnel can rapidly acquire and refresh highly technical skills (at pace with operational needs), while continuing to meet current job role requirements in increasingly complex and dangerous environments.</p>
        </div>
        <TileList items={capabilities} compact />
      </div>

      <h2>Uncrewed aircraft systems (UAS-drone)</h2>
      <div className={styles.columns}>
        <div className={styles.body}>
          <p>Defence stakeholders and public announcements by the Federal Government have consistently identified uncrewed aircraft systems (UAS-drone) as a critical technology where more training will support operational needs.<sup>23</sup> At an international level, it is acknowledged that UAS technology and counter-drone systems are evolving at a much faster rate than traditional acquisition and training cycles (in large part due to their evolving use in the war in Ukraine). Ukraine has developed and invested in counter-drone systems that are built to efficiently respond to threats that never previously existed.<sup>24</sup> The fast innovation of the Ukraine in response to these threats has been used in NATO training exercises, and provides an example of the way that the ADF could adapt to future threats, with drone technology evolving “every two to three weeks [with a] fundamentally different [model].”<sup>25</sup> The Australian Government has made a $10 billion commitment to UAS over the next 10 years from 2025 that includes:</p>
          <p>In Australia, initiatives such as the Remotely Piloted Aircraft Training School (RPATS) have been established, with Australian Air Force Cadets now eligible for Civil Aviation Safety Authority (CASA) training to qualify as fully certified drone pilots.<sup>27</sup> Additional training for drone capability and other emerging technologies is currently available through programs such as the National Security TAFE Centre of Excellence.<sup>28</sup> However, through consultations, Defence stakeholders advised that the current available training in the AVI Aviation Training Package is generic, and that Defence-specific training will likely be required to align to varying job roles in the ADF.</p>
        </div>
        <TileList items={investments} />
      </div>
    </section>

    <section data-report-sources ref={sourcesRef} className={`${styles.sources} ${sourcesVisible ? "animate-slide-up" : styles.pending}`} aria-labelledby="defence-technology-two-sources">
      <h2 id="defence-technology-two-sources">Sources</h2>
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
