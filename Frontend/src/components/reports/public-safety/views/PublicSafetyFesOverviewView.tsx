"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import chapter from "./PublicSafetyDefenceView.module.css";
import sourcesStyles from "./PublicSafetyDefenceEmergingTechnologyView.module.css";
import styles from "./PublicSafetyFesOverviewView.module.css";

const datapoints = [
  { title:"Demand for Services", copy:"Demand continues to increase as communities face more frequent and complex emergency events, including natural disasters and climate-related incidents." },
  { title:"Career Firefighters and Emergency Services Employees", copy:"Career firefighters and emergency services employees: In the 20 years from August 2005 to August 2025, the career Fire and Emergency Services occupation (ANZSCO 4412) experienced a 65.9 per cent growth, outpacing the wider job market at 48.4 per cent." },
  { title:"Volunteer Services", copy:"Despite relative increases in career Firefighter and operational SES members from 2019–20 to 2024–25, in absolute terms, the increases in career employees are heavily negated by the decreases experienced in volunteer cohorts. Collectively, in the five years from 2019–2020, a total of 1,130 career Firefighters and SES members were added to Australia’s emergency response capability, while a total of 10,336 volunteers were lost." },
  { title:"Surf Life Saving", copy:"Surf Life Saving: Across 2024–2025, Surf Life Saving provided a combined total of 1.95 million hours of lifesaving patrol activity, with New South Wales and Queensland accounting for more than 70 per cent of total hours served. This enabled a combined total of 2.19 million preventative actions, along with 65,942 administrations of first aid and 8,207 rescues across both volunteer and career surf lifesavers." },
];

const sources = [
  "Productivity Commission, Emergency services for fire and other events – Table 9A.6 and 9A.7 [data set], Productivity Commission, 2026, accessed 7 January 2026.",
  "Australian Institute for Disaster Resilience (AIDR), Major Incidents Report 2024–25, Australian Government Department of Home Affairs, 2025.",
  "ABS, November 2025, Detailed Labour Force Survey (Table EQ08), ABS, data trended by Jobs and Skills Australia.",
  "Productivity Commission, Emergency services for fire and other events – Table 9A.5 [data set], Productivity Commission, 2026, accessed 24 February 2026.",
  "Jobs and Skills Australia (JSA), 2025 Occupation Shortage List, JSA, Australian Government, 2025, accessed 23 February 2026.",
  "Productivity Commission, Emergency services for fire and other events – Table 9A.4 [data set], Productivity Commission, 2026, accessed 24 February 2026.",
  "Volunteering Australia, Key volunteering statistics in Australia, Volunteering Australia, 2025.",
  "Surf Life Saving Australia (SLSA), 2024/25 Annual Report, SLSA, 2025, p 118.",
  "Surf Life Saving Australia (SLSA), 2024/25 Annual Report, SLSA, 2025, p 118.",
];

// Productivity Commission RoGS 2026 tables 9A.4–9A.7; the approved PDF's 2023–24 demand total takes precedence over the revised online total.
const demandSeries = [488242, 466504, 515791, 509013, 525317, 574023];
const careerFirefighterSeries = [17952, 18205, 18468, 18422, 18939, 19130];
const fireVolunteerSeries = [202011, 200830, 192774, 188586, 189041, 190042];
const operationalSesSeries = [1673, 1720, 1821, 1912, 2186, 2136];
const sesVolunteerSeries = [24983, 25012, 24537, 24750, 24357, 26068];

const years = ["2019–2020", "2020–2021", "2021–2022", "2022–2023", "2023–2024", "2024–2025"];
const rogsSource = "Productivity Commission, Emergency services for fire and other events – Tables 9A.4 and 9A.5, 2026";
const surfSource = "Surf Life Saving Australia (SLSA), 2024/25 Annual Report, 2025";
const services = [
  { name: "Firefighting", asset: "firefighting.svg", width: 60 },
  { name: "State and Territory Emergency Services", asset: "emergency.svg", width: 60 },
  { name: "Surf Life Saving", asset: "surf.png", width: 68 },
];

type ChartProps = {
  title: string;
  values: number[];
  labels?: string[];
  domain: [number, number];
  source?: string;
  bars?: boolean;
  dashed?: boolean;
};

function WorkforceChart({ title, values, labels = years, domain: [min, max], source = rogsSource, bars = false, dashed = false }: ChartProps) {
  const width = 584;
  const bottom = 442;
  const spacing = width / values.length;
  const barWidth = Math.min(112, spacing * 0.65);
  const x = (index: number) => bars ? 64 + spacing * (index + 0.5) : 80 + index * 548 / (values.length - 1);
  const y = (value: number) => bottom - (value - min) / (max - min) * 396;
  const points = values.map((value, index) => `${x(index)},${y(value)}`).join(" ");

  return <figure className={styles.chart}>
    <h3>{title}</h3>
    <svg viewBox="0 0 660 488" role="img" aria-label={`${title}. ${labels.map((label, index) => `${label}: ${values[index].toLocaleString("en-AU")}`).join(", ")}`}>
      {[0, 1, 2, 3, 4].map(index => {
        const value = min + (max - min) * index / 4;
        return <g key={index}>
          <line x1="64" x2="650" y1={y(value)} y2={y(value)} stroke="#dfdfd5" />
          <text x="54" y={y(value) + 4} textAnchor="end">{value.toLocaleString("en-AU", { maximumFractionDigits: 1 })}</text>
        </g>;
      })}
      {!bars && <polyline points={points} fill="none" stroke="#ad271b" strokeWidth="3" strokeDasharray={dashed ? "5 4" : undefined} className="animate-content-switch" />}
      {values.map((value, index) => (
        <g key={labels[index]} className={styles.mark}>
          {bars ? <rect x={x(index) - barWidth / 2} y={y(value)} width={barWidth} height={bottom - y(value)} rx="2" fill="#ad271b" className="animate-industry-chart-bar" />
            : <circle cx={x(index)} cy={y(value)} r="5" fill="#ad271b" className="animate-industry-chart-point" />}
          <text x={x(index)} y={y(value) - 12} textAnchor="middle" className={bars ? styles.barValue : styles.lineValue}>{value.toLocaleString("en-AU")}</text>
          <text x={x(index)} y={bottom + 26} textAnchor="middle">{labels[index]}</text>
        </g>
      ))}
    </svg>
    <figcaption>Source: {source}</figcaption>
  </figure>;
}

export default function PublicSafetyFesOverviewView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [open, setOpen] = useState<number | null>(null);
  const fireVolunteers = <WorkforceChart title="Total Fire Volunteers (headcount)" values={fireVolunteerSeries} domain={[180000, 205000]} dashed />;
  const sesVolunteers = <WorkforceChart title="Total SES Volunteers (FTE)" values={sesVolunteerSeries} domain={[23500, 26500]} dashed />;
  return <PublicSafetyPageShell slug={slug} report={report} contentClassName={`${chapter.page} ${styles.page}`} currentPage="fes_industry_overview" navigation={{
    back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    backSecondary: { label: "Fire and Emergency Services chapter", href: `/reports/${slug}/fes` },
    next: { label: "Industry Profile", href: `/reports/${slug}/fes_industry_profile` },
    nextPrefix: "Next Section:",
  }}>
    <div className={`space-y-6 ps-fes-overview ${styles.content}`}>
      <section className={chapter.hero}>
        <div className={chapter.heroCopy}>
          <span className={`${chapter.badge} ${styles.badge}`}>FES · Industry-Sector Analysis</span>
          <h1>Industry-Sector Overview</h1>
          <p>Australia’s Fire and Emergency Services are critical to ensure protection of life and property and public safety. Working across inland waterways and coastline, to national parks and alpine regions, and throughout regional, rural and remote centres as well as metropolitan cities, these services protect Australian lives, property and the environment.</p>
        </div>
        <Image className={`${styles.artwork} animate-zoom-in`} src="/images/reports/public-safety/fes-chapter-fire-engine.svg" width={180} height={180} alt="" unoptimized priority />
      </section>

      <p className={`${styles.copy} animate-slide-up-delay`}>Depending on the state or territory a range of Fire and Emergency Services organisations, government departments, public entities and private companies collaborate to deliver a range of emergency management services. The Fire and Emergency Services workforce is made up of both career personnel and volunteers. Fire and Emergency Services workforces comprise three primary services, including:</p>
      <section className={`${styles.services} ${open !== null ? styles.servicesExpanded : ""}`} aria-label="Primary services">
        {services.map(({ name, asset, width }, index) => <div key={name} className="animate-card-entrance" style={{ animationDelay: `${200 + index * 90}ms` }}><Image src={`/images/reports/public-safety/fes-overview-${asset}`} width={width} height={60} alt="" unoptimized /><strong>{name}</strong></div>)}
      </section>

      <section className="animate-slide-up">
        <div className={styles.datapointsHeading}><h2 className={open === null ? styles.narrowHeading : undefined}>The following datapoints were identified through this Industry Overview for the Fire and Emergency Services workforces:</h2></div>
        <div className={styles.datapoints}>
          {datapoints.map((item, index) => {
            const expanded = open === index;
            return <article key={item.title} className="animate-slide-up" style={{ animationDelay: `${350 + index * 90}ms` }}>
              <button type="button" aria-expanded={expanded} aria-controls={`fes-overview-panel-${index}`} onClick={() => setOpen(expanded ? null : index)} className={styles.toggle}>
                <span className={styles.toggleTitle}>{item.title}</span>
                <span className={styles.pill}>{expanded ? "Close" : "Open"} <ChevronDown size={14} aria-hidden="true" /></span>
              </button>
              {expanded && <div id={`fes-overview-panel-${index}`} className={`${styles.panel} animate-content-switch`}>
                <p className={styles.copy}>{index === 0 ? <>Demand for services: Demand for both firefighter and state and territory emergency services (SES) increased by 7.6 per cent from 488,242 (total combined emergency response activities) in 2019–20 to 525,317 in 2023–24.<sup>43</sup> 40 major emergency incidents were documented from July 2024 to June 2025 (an increase from 30 the previous year).<sup>44</sup></> : index === 1 ? <>{item.copy}<sup>45</sup> This is supported by growth in student enrolments from 2019 to 2024 in the two core qualifications required for firefighters. Similarly, the total career operational and support emergency services personnel have experienced year-on-year increases since 2019–20.<sup>46</sup></> : item.copy}</p>
                {index === 0 && <div className={styles.chartGrid}>
                  <WorkforceChart title="Combined Total Yearly Fire and Other Emergency Incidents Responded to by Fire and Emergency Services Organisations Across Australia" values={demandSeries} domain={[400000, 600000]} dashed source="Productivity Commission, Emergency services for fire and other events – Tables 9A.6 and 9A.7, 2026" />
                  <WorkforceChart title="Documented Major Emergency Incidents Australia" values={[27, 30, 40]} labels={years.slice(-3)} domain={[20, 45]} source="Australian Institute for Disaster Resilience (AIDR), Major Incidents Report 2024–25, 2025" />
                </div>}
                {index === 1 && <>
                  <p className={styles.copy}>While data indicates the growth, the following occupations were assessed as being ‘in shortage’ since 2025:</p>
                  <div className={styles.callouts}>
                    <div>Firefighter occupation (OSCA 451232) in New South Wales</div>
                    <div>Emergency Services Officer occupation (OSCA 451231) in New South Wales and South Australia<sup>47</sup></div>
                  </div>
                  <p className={styles.copy}>Volunteer services: Compared to career firefighting, total volunteer firefighter numbers (including support staff) decreased by nearly 12,000 volunteers from 2019–20 to 2024–25.<sup>48</sup> Similarly, SES has largely experienced year-on-year declines in total volunteers since 2019–20, in line with wider decline in volunteerism trends.<sup>49</sup></p>
                  <div className={styles.chartGrid}>
                    <WorkforceChart title="Career Firefighters (headcount)" values={careerFirefighterSeries} domain={[17500, 19500]} dashed />
                    {fireVolunteers}
                  </div>
                  <p className={styles.copy}>{datapoints[2].copy}</p>
                  <div className={styles.chartGrid}>
                    <WorkforceChart title="Career Operational SES Employees (FTE)" values={operationalSesSeries} domain={[1400, 2300]} dashed />
                    {sesVolunteers}
                  </div>
                </>}
                {index === 2 && <>
                  <div className={styles.chartGrid}>{fireVolunteers}{sesVolunteers}</div>
                  <p className={styles.copy}>{item.copy}</p>
                </>}
                {index === 3 && <>
                  <div className={styles.chartGrid}>
                    <WorkforceChart title="Total Patrolling Hours of Surf Lifesavers in 2024/25 by State/Territory" values={[802226,40130,594988,99525,22190,244138,149287]} labels={["NSW","NT","QLD","SA","TAS","VIC","WA"]} domain={[0, 900000]} source={surfSource} bars />
                    <WorkforceChart title="Total Patrolling Hours of Career and Volunteer Surf Lifesavers in 2024–25" values={[1469465,483020]} labels={["Volunteer","Career"]} domain={[0, 1600000]} source={surfSource} bars />
                  </div>
                  <div className={`${styles.callouts} ${styles.surfFacts}`}>
                    <div><strong>30,000 km</strong> of coastline</div>
                    <div><strong>11,000</strong> individual beaches (316 patrolled beaches)</div>
                  </div>
                </>}
              </div>}
            </article>;
          })}
        </div>
      </section>
      <section className={`${sourcesStyles.sources} animate-slide-up-delay`}>
        <h2>Sources</h2>
        <ol start={43}>
          {sources.map((source, index) => <li key={index}><span className={sourcesStyles.sourceNumber} aria-hidden="true">{index + 43}</span><span>{source}</span></li>)}
        </ol>
      </section>
    </div>
  </PublicSafetyPageShell>;
}
