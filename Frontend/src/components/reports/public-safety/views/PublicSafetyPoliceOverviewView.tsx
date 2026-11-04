"use client";

import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import chapter from "./PublicSafetyDefenceView.module.css";
import police from "./PublicSafetyPoliceView.module.css";
import styles from "./PublicSafetyPoliceOverviewView.module.css";

const datapoints = [
  {
    title: "National Workforce",
    copy: "Nationally fluctuating workforce: Over the last five years, police officer numbers have fluctuated across Australia. Although from June 2020 to June 2021 national sworn police officer FTE increased, this was followed by two years of FTE reductions before stabilising. This trend was experienced consistently across all states and territories, with seven of eight jurisdictions recording increases in police officer FTE from June 2020 to June 2021, and six of eight jurisdictions experiencing decreases from June 2022 to June 2023.",
  },
  {
    title: "State/Territory Police and the Australian Federal Police Workforce",
    copy: "Workforce commitments: Each state and territory government, through election commitments and associated funding allocations, along with enhanced recruitment drives, have taken considered action to increase their workforce numbers and improve retention rates. Importantly, these actions have positively impacted their workforce numbers, with six out of eight jurisdictions recording increases in sworn police officer FTE from June 2023 to June 2024. Some jurisdictions continue to face challenges in meeting their total workforce targets.",
  },
];

function NationalWorkforceChart() {
  const values = [59750, 61031, 60589, 59376, 59359, 59600];
  const labels = ["2019-2020", "2020-2021", "2021-2022", "2022-2023", "2023-2024", "2024-2025"];
  const chartY = (value: number) => 329 - (value - 58500) / 10;
  const points = values.map((value, index) => ({ value, x: 58 + index * 117, y: chartY(value) }));

  return <figure className={styles.chart}>
    <h3>Yearly National Sworn Police Officer FTE – AUSTRALIA</h3>
    <div className={styles.plot}>
      <svg viewBox="0 0 720 390" role="img" aria-label="Yearly National Sworn Police Officer FTE in Australia">
      <desc>{points.map(({ value }, index) => `${labels[index]}: ${value.toLocaleString("en-AU")}`).join(", ")}</desc>
      {[58500, 59250, 60000, 60750, 61500].map((tick) => {
        const y = chartY(tick);
        return <g key={tick}><line x1="68" x2="643" y1={y} y2={y} stroke="#E5E7EB" /><text x="5" y={y + 4}>{tick.toLocaleString("en-AU")}</text></g>;
      })}
      <g className={styles.covid}>
        <path d="M118 27v307 M371 27v307" />
        <text x="124" y="42">COVID-19</text>
        <text x="118" y="375">JAN 2020</text>
        <text x="371" y="375">OCT 2022</text>
      </g>
      <polyline points={points.map(({ x, y }) => `${x},${y}`).join(" ")} fill="none" stroke="#1763AD" strokeWidth="3.5" pathLength="1" strokeDasharray="1" className="animate-profile-chart-line" />
      {points.map(({ value, x, y }, index) => (
        <g key={labels[index]}>
          <g className={`animate-radar-point ${styles.marker}`} style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
            <circle cx={x} cy={y} r="4.5" />
            <text x={index === 0 ? x - 12 : x} y={y - (index === 0 ? 7 : 12)} textAnchor={index === 0 ? "end" : "start"}>{value.toLocaleString("en-AU")}</text>
          </g>
          <text x={x} y="347" fontSize="12">{labels[index]}</text>
        </g>
      ))}
      </svg>
    </div>
    <figcaption>
      <p>NOTE: Vertical lines represent the COVID-19 period</p>
      <p>SOURCE: Productivity Commission, Police services, Table 6A.2, 2026</p>
    </figcaption>
  </figure>;
}

// Productivity Commission RoGS 2026, Table 6A.2. Operational and non-operational sworn FTE combined.
const jurisdictionCharts = [
  { name: "AUSTRALIAN CAPITAL TERRITORY", values: [716, 727, 735, 780, 820, 863], axis: [500, 100] },
  { name: "NEW SOUTH WALES", values: [17348, 17727, 17354, 16809, 16032, 15698], axis: [14500, 875] },
  { name: "NORTHERN TERRITORY", values: [1222, 1265, 1247, 1276, 1314, 1404], axis: [1100, 87.5] },
  { name: "QUEENSLAND", values: [12022, 12139, 12274, 12081, 12252, 12562], axis: [11900, 175] },
  { name: "SOUTH AUSTRALIA", values: [4664, 4624, 4504, 4447, 4485, 4529], axis: [4350, 87.5] },
  { name: "TASMANIA", values: [1287, 1331, 1352, 1330, 1374, 1418], axis: [1200, 62.5] },
  { name: "VICTORIA", values: [16032, 16442, 16269, 15991, 16190, 16021], axis: [15800, 175] },
  { name: "WESTERN AUSTRALIA", values: [6460, 6775, 6855, 6662, 6892, 7105], axis: [5800, 350] },
];

const jurisdictionYears = ["2019-2020", "2020-2021", "2021-2022", "2022-2023", "2023-2024", "2024-2025"];
const jurisdictionChartTitle = "Yearly Sworn Police Officer FTE –";

function JurisdictionChartLibrary() {
  const [selected, setSelected] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const chart = jurisdictionCharts[selected];
  const [min, step] = chart.axis;
  const plotHeight = selected === 0 ? 390 : 392;
  const plotBottom = 30 + plotHeight;
  const xForYear = (index: number) => 112 + index * 164;
  const yForValue = (value: number) => plotBottom - ((value - min) / (step * 4)) * plotHeight;
  const points = chart.values.map((value, index) => ({
    value, x: xForYear(index), y: yForValue(value), year: jurisdictionYears[index],
  }));
  const count = jurisdictionCharts.length;

  function selectChart(index: number) {
    setSelected(index);
    setAnimationKey((key) => key + 1);
  }

  return (
    <div className={styles.library}>
      <h3>Chart Library · {count} · Select a chart to open</h3>
      <div className={styles.libraryGrid}>
        <div className={styles.chartChoices} role="group" aria-label="Jurisdiction charts">
          {jurisdictionCharts.map((item, index) => (
            <button key={item.name} type="button" aria-pressed={selected === index} onClick={() => selectChart(index)}>
              <span>
                <span className={styles.chartCode}>{String(index + 1).padStart(2, "0")} · CHART · POL</span>
                <span className={styles.choiceTitle}>{jurisdictionChartTitle}<br />{item.name}</span>
              </span>
              <span className={styles.choiceArrow}><ArrowRight aria-hidden="true" /></span>
            </button>
          ))}
        </div>
        <figure className={`${styles.presentation} ${selected === 0 ? styles.actPresentation : ""}`}>
          <div className={styles.presentationHeader}>
            <div aria-live="polite">
              <p className={styles.presenting}>Presenting · {selected + 1} of {count} · Selected from the list</p>
              <h4>{jurisdictionChartTitle} {chart.name}</h4>
            </div>
            <div className={styles.chartControls}>
              <button type="button" onClick={() => selectChart((selected - 1 + count) % count)}><ChevronLeft aria-hidden="true" /> Prev</button>
              <button type="button" onClick={() => selectChart((selected + 1) % count)}>Next <ChevronRight aria-hidden="true" /></button>
              <button type="button" onClick={() => setAnimationKey((key) => key + 1)}><Play aria-hidden="true" /> Replay Animation</button>
            </div>
          </div>
          <div className={styles.jurisdictionPlot}>
            <svg viewBox="0 0 980 500" role="img" aria-label={`Yearly sworn police officer FTE for ${chart.name}`}>
              <desc>{points.map(({ value, year }) => `${year}: ${value.toLocaleString("en-AU")}`).join("; ")}</desc>
              {Array.from({ length: 5 }, (_, index) => min + step * index).map((tick) => {
                const y = yForValue(tick);
                return <g key={tick}>
                  <line x1="112" x2="932" y1={y} y2={y} stroke="#d5d7da" />
                  <text x="104" y={y + 5} textAnchor="end">{tick.toLocaleString("en-AU")}</text>
                </g>;
              })}
              <g className={styles.jurisdictionCovid}>
                <path d={`M194 30v${plotHeight} M538 30v${plotHeight}`} />
                <text x="201" y="46">COVID-19</text>
                <text x="194" y="484" textAnchor="middle">JAN 2020</text>
                <text x="538" y="484" textAnchor="middle">OCT 2022</text>
              </g>
              {jurisdictionYears.map((year, index) => (
                <text key={year} x={xForYear(index)} y={plotBottom + 22} textAnchor="middle">{year}</text>
              ))}
              <g key={animationKey} className={styles.jurisdictionSeries}>
                <polyline points={points.map(({ x, y }) => `${x},${y}`).join(" ")} />
                {[points[0], points[points.length - 1]].map(({ value, x, y, year }) => (
                  <g key={year} className={styles.jurisdictionPoint}>
                    <circle cx={x} cy={y} r="6" />
                    <text x={x} y={y - 15} textAnchor="middle">{value.toLocaleString("en-AU")}</text>
                  </g>
                ))}
              </g>
            </svg>
          </div>
          <figcaption>
            <p>NOTE: Dotted vertical lines represent the COVID-19 period</p>
            <p>SOURCE: Productivity Commission, Police services, Table 6A.2, 2026</p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

const sources = [
  "Productivity Commission, Police services - Table 6A.2 [data set], Productivity Commission, 2026, accessed 24 February 2026.",
  "A Mayes, 'The 2025 WA state election promises made by Labor, Liberal, Greens and Nationals', ABC, 2 March 2025, accessed 29 January 2026; ABC, 'Victoria Police to shorten training course to boost policing', 23 May 2025, accessed 29 January 2026; ACT Government, New Ministerial directions for ACT Policing [media release], 1 October 2025, accessed 29 January 2026; Government of South Australia, Highest number of police applications on record [media release], 21 January 2026, accessed 29 January 2026; Parliamentary Budget Office, 2023 ALP election policy costings, 2023, accessed 29 January 2026; Queensland Government, Crisafulli Government delivers 118 new police officers to frontline to make Queensland safer [media release], 4 December 2025, accessed 29 January 2026; S Vivian, 'NT government pledges 200 more police officers to bolster force in $200m funding announcement', ABC, 3 April 2024, accessed 29 January 2026; Tasmanian Government, Strong Plan to Crack Down on Crime, 2025, accessed 29 January 2026.",
];

export default function PublicSafetyPoliceOverviewView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [open, setOpen] = useState<number | null>(null);
  const panelId = useId();

  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="police_industry_overview"
      contentClassName={`${chapter.page} ${styles.page}`}
      navigation={{
        back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        backSecondary: { label: "Police chapter", href: `/reports/${slug}/police` },
        prev: { label: "Police", href: `/reports/${slug}/police` },
        next: { label: "Industry Profile", href: `/reports/${slug}/police_industry_profile` },
        prevPrefix: "Previous Section:",
        nextPrefix: "Next Section:",
      }}
    >
      <section className={`${chapter.hero} ${styles.hero}`}>
        <div className={chapter.heroCopy}>
          <span className={`${chapter.badge} ${styles.badge}`}>POL · Industry-Sector Analysis</span>
          <h1>Industry-Sector Overview</h1>
          <p>Policing is a critical public safety industry-sector comprising eight state and territory police forces alongside the Australian Federal Police, each operating in distinct legislative frameworks. The police workforce is characterised by its scale, diversity and increasingly specialised capability.</p>
        </div>
        <div className={`${chapter.artwork} ${police.artwork}`}>
          <Image src="/images/police-chapter-vehicle.svg" alt="" width={136} height={136} unoptimized priority />
        </div>
      </section>

      <section className={`${styles.panel} ${chapter.enter} ${open === 1 ? styles.jurisdictionOpen : ""}`}>
        <p className={styles.prose}>Operational (sworn) officers are increasingly supported by additional auxiliary officers (at times known as semi-sworn) such as Protective Service Officers and a rapidly growing cohort of unsworn specialists in intelligence, forensics, digital investigations, cybercrime and emergency management. Police must maintain a 24/7 operational readiness to respond to crime, maintain public safety and support community resilience.</p>
        <h2 className={styles.datapointHeading}><span>The following datapoints have been identified through this Industry Overview for the Police workforce:</span></h2>

        <div className={styles.datapoints}>
          {datapoints.map((item, index) => {
            const isOpen = open === index;
            return <article key={item.title}>
              <button type="button" aria-expanded={isOpen} aria-controls={`${panelId}-${index}`} onClick={() => setOpen(isOpen ? null : index)} className={styles.toggle}>
                <span>{item.title}</span>
                <span className={styles.pill}>{isOpen ? "Close" : "Open"}<ChevronDown aria-hidden="true" /></span>
              </button>
              <div id={`${panelId}-${index}`} hidden={!isOpen}>
                {isOpen && <div className={`${chapter.enter} ${index === 0 ? styles.national : styles.jurisdiction}`}>
                  <p className={styles.prose}>{item.copy}<sup>{index === 0 ? 67 : 68}</sup></p>
                  {index === 0 ? <NationalWorkforceChart /> : <JurisdictionChartLibrary />}
                </div>}
              </div>
            </article>;
          })}
        </div>
      </section>

      <section className={`${styles.panel} ${styles.sourcesPanel} ${chapter.enter}`}>
        <h2>Sources</h2>
        <ol className={styles.sources} start={67}>
          {sources.map((source, index) => <li key={source}><span aria-hidden="true">{index + 67}</span>{source}</li>)}
        </ol>
      </section>
    </PublicSafetyPageShell>
  );
}
