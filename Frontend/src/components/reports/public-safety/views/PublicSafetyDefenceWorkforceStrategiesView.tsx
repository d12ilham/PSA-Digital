"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import styles from "./PublicSafetyDefenceWorkforceStrategiesView.module.css";
import { useEffect, useRef, useState, type ReactNode } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

type Strategy = {
  number: string;
  title: string;
  accent: string;
  insight: string;
  jsc: string;
  objective: ReactNode;
  approach: ReactNode;
  deliverable: ReactNode;
  impact: ReactNode;
  timing: string;
  stakeholders: string[];
};

const strategies: Strategy[] = [
  {
    number: "1",
    title: "Support Defence skill and capability requirements to operationalise drones",
    accent: "#D3992C",
    insight: "Emerging technologies",
    jsc: "Training Product Development",
    objective: <>Map current Defence micro-credentials on drones and unmanned aerial systems (UAS) to existing units of competency from current VET qualifications.</>,
    approach: <>Identify whether current units of competency relating to UAS and drones meet the skills requirements of Defence. Should gaps be found, review/develop new units of competency to address these gaps.</>,
    deliverable: <>Mapping Report</>,
    impact: <>Support the Defence workforce by enabling rapid, targeted upskilling in UAS and drone related technologies.</>,
    timing: "12-month project",
    stakeholders: ["Civil Aviation Safety Authority (CASA)", "Industry Skills Australia", "Defence Education, Learning and Training Authority (DELTA)"],
  },
  {
    number: "2",
    title: "Support transition of Defence Veterans to civilian workforce",
    accent: "#64645E",
    insight: "Transitioning Veterans",
    jsc: "Implementation, Promotion and Monitoring",
    objective: <>Support Recommendation 83(c) of the Royal Commission into Defence and Veteran Suicide by supporting up-to-date information facilitated by state and territory initiatives that assist transitioning veterans.</>,
    approach: <>Collaborate with Defence to map ADF job roles and training to the Australian Qualifications Framework (AQF) levels and approximate equivalent civilian qualifications.<br />Develop material that translates military terminology into civilian contexts, to build collective understanding for both transitioning veterans and prospective civilian employers.<br />Collaborate with Defence to share this information back through state and territories to be included on their websites for veterans.</>,
    deliverable: <ul className="list-disc pl-5"><li>Mapping Report</li><li>Military Terminology Guide</li></ul>,
    impact: <>Support Recommendation 83(c) by providing information through Defence, states and territories that support veterans to translate their Defence skills and experience into civilian-recognised language.</>,
    timing: "12-month project",
    stakeholders: ["Australian Public Service Academy", "Defence Education, Learning and Training Authority (DELTA)", "Department of Veterans' Affairs", "State Training Authorities/Senior Responsible Officers"],
  },
];

function StrategyCard({ strategy, index }: { strategy: Strategy; index: number }) {
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const rows = [
    ["Workforce Insight:", strategy.insight],
    ["JSC Function:", strategy.jsc],
    ["Objective:", strategy.objective],
    ["Approach:", strategy.approach],
    ["Deliverable:", strategy.deliverable],
    ["Impact:", strategy.impact],
    ["Anticipated timing:", strategy.timing],
  ] as const;

  const detailsId = `strategy-details-${strategy.number}`;
  return <article
    id={`strategy-${strategy.number}`}
    ref={cardRef}
    className={`${styles.strategy} ${visible ? "animate-card-entrance" : styles.pending}`}
    style={{ borderTopColor: strategy.accent, animationDelay: `${.1 + index * .16}s` }}
  >
    <div className={styles.cardHeader}>
      <span className={styles.badge} style={{ backgroundColor: strategy.accent }}>Strategy {strategy.number}</span>
      <button type="button" className={styles.toggle} aria-expanded={open} aria-controls={detailsId} onClick={() => setOpen(value => !value)}>
        {open ? "Close" : "Open"} <ChevronDown size={16} aria-hidden="true" />
      </button>
    </div>
    <h2>{strategy.title}</h2>
    <div id={detailsId} hidden={!open}>
      {open && <div className={styles.details}>
        <dl>
          {rows.map(([label, value], rowIndex) => <div key={label} className="animate-content-switch" style={{ animationDelay: `${rowIndex * .07}s` }}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>)}
        </dl>
        <h3>Key Stakeholders:</h3>
        <ul className={styles.stakeholders}>
          {strategy.stakeholders.map(stakeholder => <li key={stakeholder}>•&nbsp; {stakeholder}</li>)}
        </ul>
      </div>}
    </div>
  </article>;
}

export default function PublicSafetyDefenceWorkforceStrategiesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const reportPath = `/reports/${slug}`;
  return <PublicSafetyPageShell
    slug={slug}
    report={report}
    currentPage="defence_workforce_strategies"
    contentClassName={styles.page}
    navigation={{
      back: { label: "Executive Summary", href: `${reportPath}/executive_summary` },
      backSecondary: { label: "Defence chapter", href: `${reportPath}/defence` },
      prev: { label: "Workforce Insights", href: `${reportPath}/defence_workforce_insights` },
      next: { label: "2025 Strategy Updates", href: `${reportPath}/defence_update_2025_strategies` },
      prevPrefix: "Previous Section:",
      nextPrefix: "Next Section:",
    }}
  >
    <section className={styles.hero} aria-labelledby="defence-strategies-title">
      <div className="animate-slide-up">
        <p className={styles.badge}>Defence · Proposed Strategies 2026</p>
        <h1 id="defence-strategies-title">Proposed Strategies 2026</h1>
        <p className={styles.intro}>Public Skills Australia proposes the following strategies aligned to the workforce insights identified to support Defence.</p>
      </div>
      <picture className={`${styles.artwork} animate-zoom-in`}>
        <source media="(prefers-reduced-motion: reduce)" srcSet="/images/reports/public-safety/defence-industry-overview-group-93.svg" />
        <Image src="/images/reports/public-safety/defence-industry-overview-group-93-animated.svg" alt="" width={446} height={100} unoptimized priority />
      </picture>
    </section>
    <section className={styles.strategies} aria-label="Proposed Defence strategies">
      {strategies.map((strategy, index) => <StrategyCard key={strategy.number} strategy={strategy} index={index} />)}
    </section>
  </PublicSafetyPageShell>;
}
