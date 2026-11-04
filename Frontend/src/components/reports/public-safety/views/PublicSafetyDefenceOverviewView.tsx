"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import styles from "./PublicSafetyDefenceOverviewView.module.css";

const groups = [
  {
    title: "Current Workforce",
    points: ["The permanent Australian Defence Force workforce comprised approximately 59,000 personnel in 2024-25.", "The Defence workforce also includes reservists and Australian Public Service employees who support capability, operations and policy.", "Workforce demand remains distributed across Navy, Army and Air Force roles and a broad range of civilian occupations."],
  },
  {
    title: "Future Workforce",
    points: ["The Defence workforce is expected to grow substantially to meet emerging strategic and capability requirements.", "The Defence Workforce Plan identifies a target permanent ADF workforce of 69,000 by the early 2030s.", "The overall permanent ADF and APS workforce is planned to reach around 100,000 by 2040."],
  },
  {
    title: "Veterans",
    points: ["Veterans bring highly transferable technical, leadership and operational skills to the Australian workforce.", "Supporting career transition and recognising prior learning can improve employment pathways after service.", "Industry collaboration remains important for translating Defence experience into civilian qualifications and occupations."],
  },
];

const sources = [
  "Department of Defence, Defence Workforce Plan 2024, Department of Defence, Australian Government, 2025, accessed 15 December 2025.",
  "Department of Defence, Defence Annual Report 2024-25, Department of Defence, Australian Government, 2025, accessed 15 December 2025.",
  "Department of Defence, Defence Workforce Plan 2024, Department of Defence, Australian Government, 2025, accessed 15 December 2025.",
  "Department of Defence, Defence Annual Report 2024-25, Department of Defence, Australian Government, 2025, accessed 15 December 2025.",
];

function AnimatedNumber({ value, delay = 0, svg = false }: { value: string; delay?: number; svg?: boolean }) {
  const numberRef = useRef<HTMLSpanElement | SVGTSpanElement | null>(null);
  const target = Number(value.replace(/[,%]/g, ""));
  const decimals = value.includes(".") ? value.split(".")[1].replace("%", "").length : 0;
  // Render the final value on the server and when JavaScript or motion is unavailable.
  const [current, setCurrent] = useState(target);

  useEffect(() => {
    const node = numberRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!node || motion.matches || typeof IntersectionObserver === "undefined") return;

    let frame = requestAnimationFrame(() => setCurrent(0));
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      cancelAnimationFrame(frame);
      const start = performance.now() + delay;
      const step = (now: number) => {
        const progress = Math.min(Math.max((now - start) / 1200, 0), 1);
        setCurrent(target * (1 - (1 - progress) ** 3));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.2 });
    observer.observe(node);

    const finish = () => {
      if (!motion.matches) return;
      observer.disconnect();
      cancelAnimationFrame(frame);
      setCurrent(target);
    };
    motion.addEventListener("change", finish);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", finish);
    };
  }, [target, delay]);

  const display = `${current.toLocaleString("en-AU", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${value.endsWith("%") ? "%" : ""}`;
  const attachRef = (node: HTMLSpanElement | SVGTSpanElement | null) => { numberRef.current = node; };
  // SVG charts already expose static final values through their descriptions and bar labels.
  if (svg) return <tspan ref={attachRef} data-count-to={value} aria-hidden="true">{display}</tspan>;
  return <span ref={attachRef} data-count-to={value} role="img" aria-label={value}><span aria-hidden="true">{display}</span></span>;
}

function CurrentWorkforceCharts() {
  const stats = [
    ["6,228", "The ADF enlisted 6,228 members entering into the Permanent workforce in 2024-25"],
    ["1,296", "had prior military service in the Reserves"],
    ["4,932", "had no prior military experience. This inflow is an increase on 2023-24"],
    ["20.6%", "Women represented 20.6% of enlistments, and Indigenous people represented 5.8% of enlistments"],
  ];
  // Keep Frame 32's display geometry separate from the approved headcounts.
  const bars = [
    { value: 20545, label: <>Australian Public<br />Service Employees</>, name: "Australian Public Service Employees", designHeight: 154.08, left: 71.6667 },
    { value: 33269, label: <>Reserves<br />(Navy, Army, Air)</>, name: "Reserves (Navy, Army, Air)", designHeight: 249.52, left: 295 },
    { value: 58909, label: <>Permanent Force<br />(Navy, Army, Air)</>, name: "Permanent Force (Navy, Army, Air)", designHeight: 394, left: 518.3333 },
  ];

  return <div className={styles.currentContent}>
    <p className={styles.currentSummary}>The 2024-25 financial year saw a significant increase in ADF recruitment alongside a decrease in separations, increasing the total ADF permanent workforce headcount by 1,664.<sup className={styles.footnote}><a href="#defence-overview-source-13" aria-label="Source 13">13</a></sup> The Federal Government has further budgeted for increases in the ADF permanent workforce to 61,049 for 2026-27 and 63,272 for 2027-28.<sup className={styles.footnote}><a href="#defence-overview-source-14" aria-label="Source 14">14</a></sup></p>
    <div className={styles.currentCharts}>
      <section className={styles.currentChart} aria-labelledby="defence-current-chart-title">
        <p className={styles.presentationLabel}>DEF · Presentation View</p>
        <h3 id="defence-current-chart-title">Defence Workforce Headcount, 30 June 2025</h3>
        <div className={styles.chartViewport} tabIndex={0} role="region" aria-label="Defence headcount chart; scroll horizontally on smaller screens">
          <div className={styles.currentPlot}>
            <div className={styles.currentAxis} aria-hidden="true">
              {[60000, 45000, 30000, 15000, 0].map((value, index) => <div key={value} className={styles.currentTick} style={{ top: index * 106.5 }}><span>{value.toLocaleString("en-AU")}</span><i className={value === 0 ? styles.baseline : undefined} /></div>)}
            </div>
            <div className={styles.currentBars}>
              {bars.map((bar, index) => <div key={bar.value} className={styles.currentBar} style={{ height: bar.designHeight, left: `${bar.left / 782 * 100}%` }} role="img" aria-label={`${bar.name}: ${bar.value.toLocaleString("en-AU")} employees`} tabIndex={0}>
                <span className={styles.currentBarValue}><AnimatedNumber value={bar.value.toLocaleString("en-AU")} delay={index * 120 + 150} /></span>
                <div className={`${styles.currentBarFill} animate-defence-bar`} style={{ animationDelay: `${index * .12 + .15}s` }} />
              </div>)}
            </div>
            <div className={styles.currentLabels} aria-hidden="true">{bars.map((bar) => <span key={bar.value} style={{ left: `${bar.left / 782 * 100}%` }}>{bar.label}</span>)}</div>
          </div>
        </div>
        <p className={styles.currentChartSource}>SOURCE: Defence Annual Report 2024-25, 2025</p>
      </section>
      <aside className={styles.currentStats} aria-label="Defence enlistment statistics">
        <div className={styles.currentStatsGrid}>
          {stats.map(([value, label], index) => <div key={value} className={styles.currentStat} style={{ animationDelay: `${index * .1 + .15}s` }}>
            <strong><AnimatedNumber value={value} delay={index * 100 + 150} /></strong><p>{label}</p>
          </div>)}
        </div>
        <p className={styles.currentStatsSource}>SOURCE: Defence Annual Report 2024-25, 2025</p>
      </aside>
    </div>
  </div>;
}
function FutureWorkforceCharts() {
  const separation = [9.7, 9, 9.5, 11.2, 11.1, 9.5, 7.9];
  const years = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"];
  const forecastYears = Array.from({ length: 18 }, (_, index) => 2023 + index);
  const forecastYearPositions = [149, 218, 287, 375, 444, 513, 582, 650, 719, 787, 856, 925, 994, 1062, 1131, 1200, 1268, 1337];
  // These are the existing design's planning-period bands, not annual forecast data.
  const forecastBands = [
    { from: 2026, to: 2028, x: 340.62, width: 205.25, label: "Budgeted Workforce Requirement Period", lines: ["Budgeted", "Workforce", "Requirement", "Period"], value: 85000 },
    { from: 2030, to: 2033, x: 615.74, width: 274.03, label: "2030s Target Period", lines: ["2030s Target", "Period"], value: 85000 },
    { from: 2036, to: 2040, x: 1026.24, width: 344.97, label: "2040s Target Period", lines: ["2040s Target", "Period"], value: 85000 },
  ];

  return <div className={styles.futureContent}>
    <p className={styles.futureSummary}>To meet targets set in the Defence Workforce Plan 2024, the ADF will be required to recruit on average between 6,885 and 7,139 personnel each year, while maintaining an average separation rate of 7.9 per cent (between 4,654 and 6,217 ADF personnel separating per year). This will aggregate to an average headcount increase of 1,419 per year between 2026 and 2040. Should the ADF maintain its current recruitment rate and meet its budgeted workforce requirements over the next two years, it will be well positioned to meet these targets.</p>
    <div className={styles.futureCharts}>
      <div className={styles.futureChartViewport} tabIndex={0} role="region" aria-label="ADF separation rate chart; scroll horizontally on smaller screens">
        <svg className={styles.futureChart} width={1440} height={584.727} viewBox="0 0 1440 584.727" role="img" aria-labelledby="defence-separation-title defence-separation-description">
          <title id="defence-separation-title">Australian Defence Force Separation Rate, June 2019 – June 2025</title>
          <desc id="defence-separation-description">{years.map((year, index) => `${year}: ${separation[index].toFixed(1)}%`).join("; ")}</desc>
          <text x={52} y={70} className={styles.futureChartTitle}>Australian Defence Force Separation Rate, June 2019 – June 2025</text>
          <text x={52} y={105} className={styles.futureChartSubtitle}>Annual separation rate percentage (%)</text>
          {[12, 9, 6, 3, 0].map((tick, index) => {
            const y = 162.97 + index * 70.665;
            return <g key={tick} aria-hidden="true"><line x1={122} x2={1374} y1={y} y2={y} className={tick === 0 ? styles.futureBaseline : styles.futureGridline} /><text x={105} y={y + 8} textAnchor="end" className={styles.futureAxisText}>{tick.toFixed(1)}%</text></g>;
          })}
          {separation.map((value, index) => {
            const center = 211.4 + index * 178.57;
            const height = value / 12 * 282.66;
            const y = 445.63 - height;
            return <g key={years[index]} className={styles.futureBar} tabIndex={0} role="img" aria-label={`${years[index]}: ${value.toFixed(1)}%`}>
              <rect data-separation-year={years[index]} data-value={value} x={center - 45.7} y={y} width={91.4} height={height} rx={8} className={`${styles.futureBarFill} animate-defence-bar`} style={{ animationDelay: `${index * .08 + .12}s` }} />
              <text x={center} y={y - 18} textAnchor="middle" className={styles.futureBarLabel}><AnimatedNumber value={`${value.toFixed(1)}%`} delay={index * 80 + 120} svg /></text>
              <text x={center} y={484} textAnchor="middle" className={styles.futureAxisText}>{years[index]}</text>
            </g>;
          })}
          <text x={52} y={551} className={styles.futureChartSource}>SOURCE: DEFENCE ANNUAL REPORTS 2019–20 – 2024–25</text>
        </svg>
      </div>
      <div className={styles.futureChartViewport} tabIndex={0} role="region" aria-label="ADF workforce planning-period bands; scroll horizontally on smaller screens">
        <svg className={styles.futureChart} width={1440} height={617.923} viewBox="0 0 1440 617.923" role="img" aria-labelledby="defence-forecast-title defence-forecast-description">
          <title id="defence-forecast-title">Australian Defence Force Permanent Workforce – Forecast to 2040</title>
          <desc id="defence-forecast-description">Budgeted workforce requirement period: 2026–2028. 2030s target period: 2030–2033. 2040s target period: 2036–2040. The intervening years 2029, 2034 and 2035 are unshaded.</desc>
          <text x={52} y={70} className={styles.futureChartTitle}>Australian Defence Force Permanent Workforce – Forecast to 2040</text>
          <text x={52} y={105} className={styles.futureChartSubtitle}>Target &amp; requirement forecast bands across planning periods</text>
          {[85000, 76250, 67500, 58750, 50000].map((tick, index) => {
            const y = 162.66 + index * 73.72;
            return <g key={tick} aria-hidden="true"><line x1={122} x2={1374} y1={y} y2={y} className={index === 4 ? styles.futureBaseline : styles.futureGridline} /><text x={105} y={y + 8} textAnchor="end" className={styles.forecastAxisText}>{tick.toLocaleString("en-AU")}</text></g>;
          })}
          {forecastBands.map((band, index) => {
            const center = band.x + band.width / 2;
            const first = index === 0;
            return <g key={band.from} className={styles.forecastBand} tabIndex={0} role="img" aria-label={`${band.label}, ${band.from}–${band.to}: ${band.value.toLocaleString("en-AU")}`}>
              <rect data-band-start={band.from} data-band-end={band.to} x={band.x} y={162.66} width={band.width} height={294.88} rx={8} className={`${styles.forecastBandFill} ${index === 1 ? styles.forecastBandLight : ""} animate-defence-bar`} style={{ animationDelay: `${index * .12 + .12}s` }} />
              {band.lines.map((line, lineIndex) => <text key={line} x={center} y={(first ? 209 : 222) + lineIndex * 30.5} textAnchor="middle" className={lineIndex === 0 ? styles.forecastBandTitle : styles.forecastBandText}>{line}</text>)}
              <text x={center} y={first ? 359 : 322} textAnchor="middle" className={styles.forecastBandValue}><AnimatedNumber value={band.value.toLocaleString("en-AU")} delay={index * 120 + 120} svg /></text>
            </g>;
          })}
          {forecastYears.map((year, index) => <text key={year} x={forecastYearPositions[index]} y={493} textAnchor="middle" className={forecastBands.some((band) => year >= band.from && year <= band.to) ? styles.forecastActiveYear : styles.forecastYear}>{year}</text>)}
          <text x={52} y={579} className={styles.futureChartSource}>SOURCE: Defence Annual Report 2024–25, 2025 &amp; Defence Workforce Plan 2024, 2024</text>
        </svg>
      </div>
    </div>
  </div>;
}
function VeteransCharts() {
  const stats = [["1,057", "RPL assessments conducted in 2024-25"], ["2,093", "Managed over 2,093 enquiries"], ["2,439", "Issued 2,439 qualifications"], ["2,174", "Issued 2,174 micro-credentials"]];
  return <div className={styles.veteransContent}>
    <div className={styles.veteransCopy}>
      <p>The ADF has issued more than 4,000 qualifications and micro-credentials, ranging from Certificate III to Advanced Diploma, to both personnel considering their transition to civilian life, and recently separated Veterans in the 2024-25 financial year. This has been supported through ADF use of Recognition of Prior Learning (RPL) with 1,057 RPL assessments conducted in the 2024-25 financial year.<sup className={styles.footnote}><a href="#defence-overview-source-15" aria-label="Source 15">15</a></sup></p>
      <h3>Veterans Transition Training Support 2024-25</h3>
    </div>
    <div className={styles.veteransSupport}>
      <p>To support serving members and transitioned veterans the ADF Transition and Civil Recognition Cell completed the following in 2024-25:</p>
      <div className={styles.veteransStats}>
        <div className={styles.veteransGrid}>
          {stats.map(([value, label], index) => <article key={value} className={styles.veteransStat} style={{ animationDelay: `${index * .12 + .15}s` }}>
            <strong><AnimatedNumber value={value} delay={index * 120 + 150} /></strong><p>{label}</p>
          </article>)}
        </div>
        <p className={styles.veteransSource}>SOURCE: Defence Annual Report 2024-25, 2025</p>
      </div>
    </div>
  </div>;
}
export default function PublicSafetyDefenceOverviewView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const groupsRef = useRef<HTMLElement>(null);
  const sourcesRef = useRef<HTMLElement>(null);
  const [introVisible, setIntroVisible] = useState(false);
  const [groupsVisible, setGroupsVisible] = useState(false);
  const [sourcesVisible, setSourcesVisible] = useState(false);
  const [artworkVisible, setArtworkVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === artworkRef.current) setArtworkVisible(true);
        if (entry.target === introRef.current) setIntroVisible(true);
        if (entry.target === groupsRef.current) setGroupsVisible(true);
        if (entry.target === sourcesRef.current) setSourcesVisible(true);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    [artworkRef, introRef, groupsRef, sourcesRef].forEach((ref) => { if (ref.current) observer.observe(ref.current); });
    return () => observer.disconnect();
  }, []);

  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="defence_industry_overview"
      contentClassName={styles.page}
      navigation={{
        back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        prev: { label: "Defence chapter", href: `/reports/${slug}/defence` },
        next: { label: "Industry Profile", href: `/reports/${slug}/defence_industry_profile` },
        prevPrefix: "Back to",
        nextPrefix: "Next Section:",
      }}
    >
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.badge}>DEF · Industry-Sector Analysis</span>
          <h1>Industry-Sector Overview</h1>
          <p>The Defence workforce is multidisciplinary, with highly skilled personnel in a breadth of roles. The workforce comprises permanent and reserve force members across the Australian Defence Force (ADF) including Navy, Army and Air Force, supported by civilian Australian Public Service (APS) employees who work across the Department of Defence.</p>
        </div>
        <div ref={artworkRef} className={`${styles.artwork} ${artworkVisible ? "" : styles.pending}`}>
          <picture>
            <source media="(prefers-reduced-motion: reduce)" srcSet="/images/reports/public-safety/defence-industry-overview-group-93.svg" />
            <Image src={`/images/reports/public-safety/defence-industry-overview-group-93${artworkVisible ? "-animated" : ""}.svg`} alt="Australian Defence Force land, maritime and air capabilities" width={446} height={100} unoptimized loading="eager" />
          </picture>
        </div>
      </section>

      <section ref={introRef} className={`${styles.intro} ${introVisible ? styles.enter : styles.pending}`}>
        <p>The Defence workforce operates in a secure, structured and regulated environment and undertakes its own long-term workforce planning, including growth and future workforce requirements as outlined in the Defence Workforce Plan 2024. The Defence industry-sector has identified workforce growth targets for ADF permanent workforce of 69,000 by the early 2030s, with an overall permanent ADF and APS workforce of around 100,000 by 2040.<sup className={styles.footnote}><a href="#defence-overview-source-12" aria-label="Source 12">12</a></sup></p>
        <h2><span>The following datapoints were identified through this industry-sector overview for the Defence workforce:</span></h2>
      </section>

      <section ref={groupsRef} className={styles.groups} aria-label="Defence workforce data">
        {groups.map((group, index) => {
          const open = openGroup === index;
          return (
            <article key={group.title} style={groupsVisible ? { animationDelay: `${index * 0.12 + 0.1}s` } : undefined} className={`${styles.group} ${open ? styles.openGroup : styles.closedGroup} ${open && index === 0 ? styles.currentGroup : ""} ${open && index === 1 ? styles.futureGroup : ""} ${open && index === 2 ? styles.veteransGroup : ""} ${groupsVisible ? styles.enter : styles.pending}`}>
              <button id={`defence-overview-toggle-${index}`} type="button" aria-expanded={open} aria-controls={`defence-overview-panel-${index}`} onClick={() => setOpenGroup(open ? null : index)} className={`${styles.toggle} ${open ? styles.openToggle : ""} ${open && index === 0 ? styles.currentToggle : ""} ${open && index === 1 ? styles.futureToggle : ""} ${open && index === 2 ? styles.veteransToggle : ""}`}>
                <span className={`${styles.groupTitle} ${open ? styles.openTitle : ""}`}>{group.title}</span>
                <span className={`${styles.control} ${open && index === 2 ? styles.veteransClose : ""}`}>{open ? "Close" : "Open"}{open ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}</span>
              </button>
              {open && <div id={`defence-overview-panel-${index}`} role="region" aria-labelledby={`defence-overview-toggle-${index}`} className={`${styles.chartPanel} ${index === 0 ? styles.currentPanel : ""} ${index === 1 ? styles.futurePanel : ""} ${index === 2 ? styles.veteransPanel : ""}`}>{index === 0 ? <CurrentWorkforceCharts /> : index === 1 ? <FutureWorkforceCharts /> : <VeteransCharts />}</div>}
            </article>
          );
        })}
      </section>

      <section ref={sourcesRef} className={`${styles.sources} ${sourcesVisible ? styles.enter : styles.pending}`}>
        <h2>Sources</h2>
        <ol start={12}>
          {sources.map((source, index) => <li id={`defence-overview-source-${index + 12}`} value={index + 12} key={index} style={sourcesVisible ? { animationDelay: `${index * 0.08 + 0.1}s` } : undefined} className={sourcesVisible ? styles.enter : styles.pending}><span className={styles.sourceNumber} aria-hidden="true">{index + 12}</span><p>{source}</p></li>)}
        </ol>
      </section>
    </PublicSafetyPageShell>
  );
}
