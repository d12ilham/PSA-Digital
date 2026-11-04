"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import layout from "./PublicSafetyDefenceWorkforceStrategiesView.module.css";
import styles from "./PublicSafetyFesWorkforceStrategiesView.module.css";

const strategies = [
  {
    number: "Strategy 1",
    title: "Support uptake of disaster recovery training products (Refer Appendix B for list of training products)",
    insight: "Disaster Recovery",
    jsc: "Implementation, Promotion and Monitoring",
    objective: "Strengthen capabilities of disaster recovery for Fire and Emergency Services and Government personnel by promoting the uptake of disaster recovery training products.",
    approach: "Develop and implement a promotion plan for disaster recovery products among TAFEs and RTOs.",
    deliverables: ["Promotion Plan", "Presentation of promotions to RTO, TAFE and stakeholders", "Report on outcomes of engagement"],
    impact: "Capability uplift across Fire and Emergency Services and Government personnel through increased uptake of nationally consistent disaster recovery training.",
    timing: "18-month project",
    stakeholders: ["AFAC", "Australian Institute of Disaster Resilience", "Australian Local Government Association (ALGA)", "National Emergency Management Agency", "TAFE Directors Australia (TDA)", "Enterprise Registered Training Organisation Association (ERTOA)"],
  },
  {
    number: "Strategy 2",
    title: "Review first aid units of competency for Surf Life Saving in the Certificate II in Public Safety (Aquatic Rescue)",
    insight: "Surf Life Saving First Aid",
    jsc: "Training Product Development",
    objective: "Ensure the Certificate II in Public Safety (Aquatic Rescue) reflects the first aid requirements of Surf Life Saving.",
    approach: "Collaborate with Surf Life Saving Australia and state/territory organisations to compare the level of current first aid training units with the skills required in surf lifesaving. This may result in an update to the Certificate II in Public Safety (Aquatic Rescue).",
    deliverables: ["Reviewed training products"],
    impact: "Equip surf lifesavers with the skills required to meet current and future needs in keeping Australia’s coastline safe.",
    timing: "12-month project",
    stakeholders: ["AFAC", "Surf Life Saving Australia", "Training Package Assurance Body", "State Training Authority/Senior Responsible Officer"],
  },
  {
    number: "Strategy 3",
    title: "Review prerequisite requirements for PUAFIR306 Identify, detect and monitor hazardous materials at an incident",
    insight: "Hazardous Materials",
    jsc: "Training Product Development",
    objective: "Support increased access to hazardous materials training by reviewing a key unit of competency for the Fire and Emergency Services industry.",
    approach: "Engage with key Fire and Emergency Services employers and unions, and mining stakeholders through AUSMASA, to review the PUAFIR306 Identify, detect and monitor hazardous materials at an incident and PUASAR025 Undertake confined space rescue units of competency.",
    deliverables: ["Reviewed Units of Competency"],
    impact: "Increase accessible training to enable safe and effective hazardous materials response.",
    timing: "18-month project",
    stakeholders: ["AFAC", "United Firefighters Union Australia", "Training Package Assurance Body", "State Training Authority/Senior Responsible Officer"],
  },
];

function StrategyCard({ strategy, open, onToggle, appendixHref }: { strategy: typeof strategies[number]; open: boolean; onToggle: () => void; appendixHref?: string }) {
  const id = `strategy-${strategy.number.replace("Strategy ", "")}`;
  const rows = [
    ["Workforce Insight", strategy.insight],
    ["JSC Function", strategy.jsc],
    ["Objective", strategy.objective],
    ["Approach", strategy.approach],
    ["Deliverable", strategy.deliverables],
    ["Impact", strategy.impact],
    ["Anticipated timing", strategy.timing],
  ] as const;

  return <article id={id} className={`${layout.strategy} ${styles.strategy} animate-card-entrance`}>
    <div className={layout.cardHeader}>
      <span className={`${layout.badge} ${styles.badge}`}>{strategy.number}</span>
      <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={`${id}-detail`} className={layout.toggle}>
        {open ? "Close" : "Open"} <ChevronDown size={16} aria-hidden="true" />
      </button>
    </div>
    <h2>{strategy.title}</h2>
    <p className={styles.meta}>Workforce Insight: {strategy.insight} · JSC Function: {strategy.jsc}</p>
    <div id={`${id}-detail`} hidden={!open}>
      <div className={`${layout.details} ${styles.details} animate-content-switch`}>
        <dl>
          {rows.map(([label, value]) => <div key={label}>
            <dt>{label}:</dt>
            <dd>{typeof value === "string" ? value : <ul className="list-disc ps-5">{value.map(item => <li key={item}>{item}</li>)}</ul>}</dd>
          </div>)}
        </dl>
        <h3>Key Stakeholders:</h3>
        <ul className={layout.stakeholders}>
          {strategy.stakeholders.map(item => <li key={item}><span aria-hidden="true">•</span> {item}</li>)}
        </ul>
        {appendixHref && <Link className={styles.appendix} href={appendixHref}>Appendix B – training products <ArrowRight size={16} aria-hidden="true" /></Link>}
      </div>
    </div>
  </article>;
}

export default function PublicSafetyFesWorkforceStrategiesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [openCards, setOpenCards] = useState([true, true, true]);
  const allOpen = openCards.every(Boolean);
  const reportPath = `/reports/${slug}`;

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_workforce_strategies" contentClassName={`${layout.page} ${styles.page}`} navigation={{
    back: { label: "Executive Summary", href: `${reportPath}/executive_summary` },
    backSecondary: { label: "Fire and Emergency Services chapter", href: `${reportPath}/fes` },
    prev: { label: "Workforce Insights", href: `${reportPath}/fes_workforce_insights` },
    next: { label: "2025 Strategy Updates", href: `${reportPath}/fes_update_2025_strategies` },
    prevPrefix: "Previous Section:",
    nextPrefix: "Next Section:",
  }}>
    <section className={layout.hero}>
      <div className={`${styles.heroCopy} animate-slide-up`}>
        <span className={`${layout.badge} ${styles.badge}`}>Fire and Emergency Services Workforce Strategies</span>
        <h1>Proposed Strategies 2026</h1>
        <p className={layout.intro}>Public Skills Australia proposes the following strategies to align to the workforce insights identified to support Fire and Emergency Services:</p>
        <button type="button" onClick={() => setOpenCards(current => current.map(() => !allOpen))} className={`${layout.toggle} ${styles.toggleAll}`}>
          {allOpen ? "Close All" : "Open All"} <ChevronDown size={16} aria-hidden="true" />
        </button>
      </div>
      <div className={`${styles.artwork} animate-zoom-in`}>
        <Image src="/images/reports/public-safety/fes-chapter-fire-engine.svg" width={180} height={180} alt="" unoptimized priority />
      </div>
    </section>

    <section className={`${layout.strategies} ${styles.strategies}`} aria-label="Proposed Fire and Emergency Services workforce strategies">
      {strategies.map((strategy, index) => (
        <StrategyCard key={strategy.number} strategy={strategy} open={openCards[index]} appendixHref={index === 0 ? `${reportPath}/fes_disaster_recovery_training_products` : undefined}
          onToggle={() => setOpenCards(current => current.map((value, itemIndex) => itemIndex === index ? !value : value))} />
      ))}
    </section>
  </PublicSafetyPageShell>;
}
