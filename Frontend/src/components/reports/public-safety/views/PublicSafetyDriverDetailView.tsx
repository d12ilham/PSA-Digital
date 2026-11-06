"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import styles from "./PublicSafetyDriverDetailView.module.css";

const drivers = [
  {
    key: "driver_1",
    title: "Resilience of organisations to respond to strategic shocks",
    summary: "Compounding crises have exposed structural vulnerabilities…",
    detailTitle: "Driver 1 — Resilience of organisations to respond to strategic shocks",
    body: [
      { text: "Organisational resilience is emerging as a critical driver of change across Australia’s Public Safety and Government industry-sectors, particularly as agencies confront increasingly frequent and complex strategic shocks. Recent experience with compounding crises (such as increasingly intense bushfires, major cyber attacks and intensifying geopolitical tensions) have exposed structural vulnerabilities and highlighted the need for more adaptive, anticipatory and integrated capabilities. Investment will be required to deepen organisational capabilities that supports system-wide preparedness, robust governance and the ability to maintain critical functions under stress.", reference: "3" },
    ],
  },
  {
    key: "driver_2",
    title: "Challenges to workforce productivity",
    summary: "Australia’s slowest productivity growth in 60 years…",
    detailTitle: "Driver 2 — Challenges to workforce productivity",
    body: [
      { text: "In its Five Pillars of Productivity enquiry reports, the Productivity Commission observed that productivity growth has been slowing globally since the mid-2000s, with Australia experiencing the slowest productivity growth in 60 years. The Productivity Commission identified long-standing pressures that have contributed to the productivity slowdown, including market stagnation, a persistently tight labour market and slower uptake of technological innovations.", reference: "4" },
      { text: " These factors are further exacerbated by emerging challenges linked to the megatrends including an ageing population, technological development, climate change and competition for labour.", reference: "5" },
    ],
  },
  {
    key: "driver_3",
    title: "Emergence of Artificial Intelligence (AI), greater automation and broader digital transformation",
    summary: "Capability uplift — and a growing security risk…",
    detailTitle: "Driver 3 — Emergence of Artificial Intelligence (AI), greater automation and broader digital transformation",
    body: [
      { text: "AI, automation and accelerated digital transformation are powerful drivers of organisational and system-level change in the short term. This is reinforced by a push from the Federal Government for greater adoption of AI and digital initiatives across federal agencies.", reference: "6" },
      { text: " These initiatives signal a shift toward embedding AI into core service delivery, regulatory functions and operational decision making. AI, automation and digital transformation represent an opportunity for significant capability uplift through AI-enabled analytics, automation of high-volume processes and advanced digital platforms that enhance situational awareness, threat detection and emergency response coordination. Conversely, they represent a growing security risk as they are also being leveraged by threat actors to disrupt government services, facilitate foreign interference, enable disinformation, promote false narratives through deepfakes and erode trust in government institutions.", reference: "7" },
    ],
  },
  {
    key: "driver_4",
    title: "Workforce inclusivity",
    summary: "Recruiting and retaining diverse cohorts…",
    detailTitle: "Driver 4 — Workforce inclusivity",
    body: [
      { text: "Workforce inclusivity has been a key focus across the labour market. In the Public Safety and Government industry-sectors this is likely to translate into a continued focus on recruiting, retaining and developing employees from diverse cultural, linguistic, gender, disability and neurodivergent backgrounds. As organisations seek to increase workforce participation from these cohorts, they will be required to adapt and change legacy systems and processes to respond to the needs of the modern workforce.", reference: "" },
    ],
  },
];

const megatrends = [
  { icon: "Limitations", title: "Limitations in career pathways" },
  { icon: "Climate", title: "Climate change" },
  { icon: "Competition", title: "Competition for labour" },
  { icon: "Expansion", title: "Expansion of core duties" },
  { icon: "Diversity", title: "Diversity and inclusion" },
  { icon: "Demographic", title: "Demographic shifts" },
  { icon: "Technological", title: "Technological development" },
  { icon: "Recruitment", title: "Recruitment and retention" },
  { icon: "Public", title: "Public trust and perceptions" },
];

const megatrendsSummary = "These megatrends were identified in previous Workforce Insights Reports and will continue to have longer term implications for workforce planning and development across the Public Safety and Government industry-sectors.";

const sources = [
  ["3", "Australian Government Department of Home Affairs, Organisational Resilience: Good Practice Guide, Australian Government Department of Home Affairs, 2024, accessed 25 February 2026."],
  ["4", "Productivity Commission, Five pillars of productivity inquiries – final reports, Productivity Commission, 2025, accessed 13 February 2026."],
  ["5", "Productivity Commission, Five pillars of productivity inquiries, Productivity Commission, 2025, accessed 25 February 2026."],
  ["6", "Australian Government Department of Finance, National framework for the assurance of artificial intelligence in government, Australian Government Department of Finance, 2024, accessed 25 February 2026; Australian Government Digital Transformation Agency, Policy for the responsible use of AI in government, Australian Government Digital Transformation Agency, 2025, accessed 25 February 2026."],
  ["7", "Australian Security Intelligence Organisation (ASIO), Director-General’s Annual Threat Assessment 2025, ASIO, 2025, accessed 25 February 2026."],
];

export default function PublicSafetyDriverDetailView({ slug, report, pageType }: { slug: string; report: PublicSafetyReport; pageType?: string }) {
  const initialIndex = drivers.findIndex((driver) => driver.key === pageType);
  const [activeIndex, setActiveIndex] = useState<number | null>(initialIndex >= 0 ? initialIndex : null);
  const [activeMegatrendIndex, setActiveMegatrendIndex] = useState<number | null>(null);
  const [lastActiveIndex, setLastActiveIndex] = useState(Math.max(initialIndex, 0));
  const [lastMegatrendIndex, setLastMegatrendIndex] = useState(0);
  const driversSectionRef = useRef<HTMLElement>(null);
  const megatrendsSectionRef = useRef<HTMLElement>(null);
  const sourcesSectionRef = useRef<HTMLElement>(null);
  const [driversVisible, setDriversVisible] = useState(false);
  const [megatrendsVisible, setMegatrendsVisible] = useState(false);
  const [sourcesVisible, setSourcesVisible] = useState(false);
  const displayedDriver = drivers[lastActiveIndex];
  const displayedMegatrend = megatrends[lastMegatrendIndex];
  const showDriverHelp = activeIndex !== null && activeIndex > 0;

  const toggleDriver = (index: number) => {
    if (activeIndex === index) return setActiveIndex(null);
    setLastActiveIndex(index);
    setActiveIndex(index);
  };
  const toggleMegatrend = (index: number) => {
    if (activeMegatrendIndex === index) return setActiveMegatrendIndex(null);
    setLastMegatrendIndex(index);
    setActiveMegatrendIndex(index);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => {
        setDriversVisible(true);
        setMegatrendsVisible(true);
        setSourcesVisible(true);
      });
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === driversSectionRef.current) setDriversVisible(true);
        if (entry.target === megatrendsSectionRef.current) setMegatrendsVisible(true);
        if (entry.target === sourcesSectionRef.current) setSourcesVisible(true);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    [driversSectionRef, megatrendsSectionRef, sourcesSectionRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <PublicSafetyPageShell slug={slug} report={report} currentPage="drivers_of_change" contentClassName={styles.page} navigation={{ prev: { label: "Methodology", href: `/reports/${slug}/methodology` }, next: { label: "Cross-Sector Analysis", href: `/reports/${slug}/cross_sector_analysis` } }}>
      <section className={`${styles.hero} animate-slide-up`}>
        <div className={styles.heroCopy}>
          <h1>Drivers of Change</h1>
          <p>In 2024, Public Skills Australia identified nine megatrends impacting the Public Safety and Government industry-sectors. These megatrends were further considered in the development of the 2025 <span className={styles.reportTitle}>Workforce Insights Reports.</span></p>
          <p>While these megatrends will continue to have longer term implications for workforce planning and development across the Public Safety and Government industry-sectors, the 2026 <span className={styles.reportTitle}>Workforce Insights Reports</span> have built on these and analysed four key drivers of change that cut across most megatrends. This is important as these drivers of change will likely impact the Public Safety and Government industry-sectors in the short to medium term.</p>
        </div>
        <div className={`${styles.diagram} animate-drivers-pop-settle`}>
          <Image src="/images/reports/drivers-of-change-diagram.png" alt="Four connected drivers of change" width={250} height={240} className="animate-drivers-spin" />
        </div>
      </section>

      <section ref={driversSectionRef} className={driversVisible ? "animate-slide-up" : "translate-y-6 opacity-0"}>
        <div className={`${styles.driverHeading} ${showDriverHelp ? styles.driverHeadingExpanded : ""}`}>
          <h2>{showDriverHelp ? "The four key drivers of change" : "Four Key Drivers"}</h2>
          <div aria-hidden={!showDriverHelp} className={`${styles.driverHelp} ${showDriverHelp ? styles.driverHelpOpen : ""}`}>
            <div className={styles.disclosureClip}><p>Select a driver to open its detail</p></div>
          </div>
        </div>
        <div className={styles.driverGrid}>
          {drivers.map((driver, index) => {
            const selected = index === activeIndex;
            return (
              <article key={driver.key} style={{ animationDelay: `${index * 0.1 + 0.1}s` }} className={`${styles.driverCard} ${selected ? styles.selectedDriver : ""} ${driversVisible ? "animate-card-entrance" : "opacity-0"}`}>
                <p className={styles.driverLabel}>DRIVER {index + 1}</p>
                <h3>{driver.title}</h3>
                <p className={styles.driverSummary}>{driver.summary}</p>
                <button type="button" aria-label={`${selected ? "Close" : "Open"} Driver ${index + 1}`} onClick={() => toggleDriver(index)} aria-expanded={selected} aria-controls="driver-detail" className={styles.toggle}>
                  {selected ? "Close" : "Open"}<ChevronDown aria-hidden="true" className={selected ? styles.chevronOpen : ""} />
                </button>
              </article>
            );
          })}
        </div>
        <div aria-hidden={activeIndex === null} inert={activeIndex === null} className={`${styles.disclosure} ${activeIndex !== null ? styles.disclosureOpen : ""}`}>
          <div className={styles.disclosureClip}>
            <article id="driver-detail" aria-labelledby="driver-detail-title" className={`${styles.detailPanel} ${styles.driverPanel}`}>
              <span className={styles.presenting}>Now presenting · Driver {lastActiveIndex + 1}</span>
              <h2 id="driver-detail-title">{displayedDriver.detailTitle}</h2>
              <p>{displayedDriver.body.map(({ text, reference }, index) => <span key={index}>{text}{reference && <sup className={styles.reference}><a href={`#driver-source-${reference}`} aria-label={`Source ${reference}`}>{reference}</a></sup>}</span>)}</p>
            </article>
          </div>
        </div>
      </section>

      <section ref={megatrendsSectionRef} className={megatrendsVisible ? "animate-slide-up" : "translate-y-6 opacity-0"}>
        <h2 className={styles.sectionTitle}>Nine Megatrends</h2>
        <div className={styles.megatrendGrid}>
          {megatrends.map((megatrend, index) => {
            const selected = index === activeMegatrendIndex;
            return (
              <button key={megatrend.title} type="button" aria-expanded={selected} aria-controls="megatrend-detail" onClick={() => toggleMegatrend(index)} style={{ animationDelay: `${index * 0.06 + 0.15}s` }} className={`${styles.megatrendCard} ${selected ? styles.selectedMegatrend : ""} ${megatrendsVisible ? "animate-card-entrance" : "opacity-0"}`}>
                <Image src={selected ? `/images/reports/public-safety/megatrends/${megatrend.icon}-active.svg` : `/images/reports/drivers-of-change/${megatrend.icon}.svg`} alt="" width={100} height={100} />
                <span>{megatrend.icon === "Climate" ? <>Climate<br />change</> : megatrend.icon === "Demographic" ? <>Demographic<br />shifts</> : megatrend.title}</span>
              </button>
            );
          })}
        </div>
        <div aria-hidden={activeMegatrendIndex === null} inert={activeMegatrendIndex === null} className={`${styles.disclosure} ${activeMegatrendIndex !== null ? styles.disclosureOpen : ""}`}>
          <div className={styles.disclosureClip}>
            <article id="megatrend-detail" aria-labelledby="megatrend-detail-title" className={`${styles.detailPanel} ${styles.megatrendPanel}`}>
              <h2 id="megatrend-detail-title">{displayedMegatrend.title}</h2>
              <p>{megatrendsSummary}</p>
            </article>
          </div>
        </div>
        <p className={styles.megatrendRecap}>These megatrends were identified in previous <span className={styles.reportTitle}>Workforce Insights Reports</span> and will continue to have longer term implications for workforce planning and development across the Public Safety and Government industry-sectors.</p>
      </section>

      <section data-report-sources ref={sourcesSectionRef} className={`${styles.sources} ${sourcesVisible ? "animate-slide-up" : "translate-y-6 opacity-0"}`}>
        <h2>Sources</h2>
        <ol>{sources.map(([number, source], index) => (
          <li key={number} id={`driver-source-${number}`} style={{ animationDelay: `${index * 0.08 + 0.15}s` }} className={sourcesVisible ? "animate-card-entrance" : "opacity-0"}>
            <span className={styles.sourceNumber}>{number}</span><span>{source}</span>
          </li>
        ))}</ol>
      </section>
    </PublicSafetyPageShell>
  );
}
