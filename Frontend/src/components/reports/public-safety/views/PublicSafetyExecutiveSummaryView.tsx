"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { executiveSummaryInsights as insights, executiveSummaryStrategies as strategies, type ExecutiveSummarySector } from "../data/executiveSummary";
import { ArrowRight, ChevronDown } from "lucide-react";
import styles from "./PublicSafetyExecutiveSummaryView.module.css";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const icons = {
  Drivers: "/images/reports/introduction/Drivers.svg",
  Insights: "/images/reports/introduction/Insights.svg",
  Strategies: "/images/reports/introduction/Summary.svg",
  Summary: "/images/reports/executive-summary/flow-4-forward.png",
} as const;

type SummaryIcon = keyof typeof icons;

function ActionButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={styles.action}>{children}<ArrowRight aria-hidden="true" /></button>;
}

function SectionHeading({ icon, title, description, children }: { icon: SummaryIcon; title: string; description: string; children: React.ReactNode }) {
  return (
    <div className={styles.heading}>
      <Image src={icons[icon]} alt="" width={64} height={64} className={styles.sectionIcon} />
      <div className={styles.headingCopy}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}

function SectorColumn({ sector, slug, expandedId, onToggle, visible, delay }: { sector: ExecutiveSummarySector; slug: string; expandedId: string | null; onToggle: (id: string) => void; visible: boolean; delay: number }) {
  const sectorStyle = {
    "--sector-color": sector.color,
    "--sector-tint": `${sector.color}1A`,
    animationDelay: `${delay}s`,
  } as React.CSSProperties;

  return (
    <article style={sectorStyle} className={`${styles.sector} ${visible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
      <div className={styles.accent} aria-hidden="true" />
      <h3 className={styles.sectorTitle}>{sector.title}</h3>
      <div className={styles.tiles}>
        {sector.items.map(({ id, title, number, details }) => {
          const expanded = expandedId === id;
          return (
            <div key={id} className={`${styles.tile} ${expanded ? styles.tileOpen : ""}`}>
              <span className={styles.number} aria-hidden="true">{number}</span>
              <p className={styles.tileTitle}>{title}</p>
              <button type="button" aria-label={`${expanded ? "Close" : "Open"} ${title}`} aria-expanded={expanded} aria-controls={`${id}-detail`} onClick={() => onToggle(id)} className={styles.toggle}>
                {expanded ? "Close" : "Open"}<ChevronDown aria-hidden="true" className={expanded ? styles.expandedChevron : undefined} />
              </button>
              <div id={`${id}-detail`} aria-hidden={!expanded} inert={!expanded} className={`${styles.detail} ${expanded ? styles.detailOpen : ""}`}>
                <div className={styles.detailClip}>
                  <div className={styles.detailContent}>
                    {details.map((detail) => (
                      <div key={detail.page} className={detail.number ? styles.numberedDetail : styles.detailRow}>
                        {detail.number && <span className={styles.detailNumber}>{detail.number}</span>}
                        <div className={styles.detailBody}>
                          <p className={styles.detailText}>{detail.text}</p>
                          <Link href={`/reports/${slug}/${detail.page}`} prefetch={false} aria-label={`Open ${title}${detail.number ? ` ${detail.number}` : ""}`} className={styles.detailLink}>
                            Open<ArrowRight aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default function PublicSafetyExecutiveSummaryView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  const insightsRef = React.useRef<HTMLElement>(null);
  const strategiesRef = React.useRef<HTMLElement>(null);
  const [isInsightsVisible, setIsInsightsVisible] = React.useState(false);
  const [isStrategiesVisible, setIsStrategiesVisible] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const toggleDropdown = (id: string) => setExpandedId((current) => current === id ? null : id);
  const navigate = (page: string) => router.push(`/reports/${slug}/${page}`);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => {
        setIsInsightsVisible(true);
        setIsStrategiesVisible(true);
      });
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === insightsRef.current) setIsInsightsVisible(true);
        if (entry.target === strategiesRef.current) setIsStrategiesVisible(true);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    if (insightsRef.current) observer.observe(insightsRef.current);
    if (strategiesRef.current) observer.observe(strategiesRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <PublicSafetyPageShell slug={slug} report={report} currentPage="executive_summary" contentClassName={styles.page} navigation={{ backSecondary: { label: "About Public Skills Australia", href: `/reports/${slug}/about` }, prev: { label: "Introduction", href: `/reports/${slug}/introduction` }, next: { label: "Drivers of Change", href: `/reports/${slug}/drivers_of_change` } }}>
      <section className={`${styles.panel} ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <h1 className={`${styles.heroTitle} animate-slide-up`}>Executive Summary</h1>
          <div className="animate-slide-up-delay">
            <p>Public Skills Australia’s 2026 Public Safety Workforce Insights Report considers the wider operational contexts impacting Public Safety and Government industry-sectors. It identifies four drivers of change that will impact workforce planning in the short to medium term, aligned with the nine megatrends detailed in previous Workforce Insights Reports, that remain relevant to long term workforce trends.</p>
            <p>The Report analyses themes consistent across all three Public Safety industry-sectors before examining each Public Safety industry-sector individually. The report provides data analysis, identifying workforce insights and detailing strategies aimed at addressing workforce challenges.</p>
          </div>
        </div>
        <div className={styles.flow} aria-hidden="true">
          <div className={`${styles.connectors} animate-flow-separator`} style={{ animationDelay: "0.35s" }} />
          {(Object.keys(icons) as SummaryIcon[]).map((icon, index) => <Image key={icon} src={icons[icon]} alt="" width={120} height={120} style={{ animationDelay: `${index * 0.5 + 0.1}s` }} className={`${styles.flowIcon} animate-flow-item`} />)}
        </div>
      </section>

      <section className={styles.panel}>
        <SectionHeading icon="Drivers" title="Drivers of Change" description="Four drivers of change impacting workforce planning in the short to medium term, aligned with the nine megatrends detailed in previous Workforce Insights Reports."><ActionButton onClick={() => navigate("drivers_of_change")}>Present Drivers of Change</ActionButton></SectionHeading>
      </section>

      <section ref={insightsRef} className={`${styles.panel} ${isInsightsVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
        <div className={styles.collectionHeader}><SectionHeading icon="Insights" title="Themes, Twelve Insights" description="OPEN reveals the content on this page."><div className={styles.insightActions}>
          <Link className={styles.action} href={`/reports/${slug}/defence_workforce_insights`}>Defence Workforce Insights<ArrowRight aria-hidden="true" /></Link>
          <Link className={styles.action} href={`/reports/${slug}/fes_workforce_insights`}>Fire and Emergency Services Workforce Insights<ArrowRight aria-hidden="true" /></Link>
          <Link className={styles.action} href={`/reports/${slug}/police_workforce_insights`}>Police Workforce Insights<ArrowRight aria-hidden="true" /></Link>
        </div></SectionHeading></div>
        <div className={styles.columns}>{insights.map((sector, index) => <SectorColumn key={sector.title} sector={sector} slug={slug} expandedId={expandedId} onToggle={toggleDropdown} visible={isInsightsVisible} delay={index * 0.12 + 0.18} />)}</div>
      </section>

      <section ref={strategiesRef} className={`${styles.panel} ${isStrategiesVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
        <div className={styles.collectionHeader}><SectionHeading icon="Strategies" title="Six 2026 Proposed Workforce Strategies" description="The following strategies have been developed to support efforts to address challenges identified through the above industry insights."><ActionButton onClick={() => navigate("police_proposed_strategies_summary")}>Present Workforce Strategies</ActionButton></SectionHeading></div>
        <div className={styles.columns}>{strategies.map((sector, index) => <SectorColumn key={sector.title} sector={sector} slug={slug} expandedId={expandedId} onToggle={toggleDropdown} visible={isStrategiesVisible} delay={index * 0.12 + 0.18} />)}</div>
      </section>

      <section className={styles.panel}>
        <SectionHeading icon="Summary" title="2027 and Beyond" description="This report concludes by looking towards the 2027 Workforce Insights Reports and beyond. Future work will focus on broader priorities, including the participation of First Nations people, women and other genders in the Public Safety and Government workforces, in addition to examining the implications of artificial intelligence (AI) and digital transformation."><ActionButton onClick={() => navigate("looking_forward")}>View 2027 and Beyond</ActionButton></SectionHeading>
      </section>

      <section className={styles.supporting}>
        <h2>Supporting Sections:</h2>
        {[["Public Safety Cross-Sector Analysis", "cross_sector_analysis"], ["Defence Chapter", "defence"], ["Fire and Emergency Services Chapter", "fes"], ["Police Chapter", "police"]].map(([label, path]) => <button key={path} type="button" onClick={() => navigate(path)}>{label}</button>)}
      </section>
    </PublicSafetyPageShell>
  );
}
