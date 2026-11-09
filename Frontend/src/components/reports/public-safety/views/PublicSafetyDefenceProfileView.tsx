"use client";

import ReportSelectionPanel from "./ReportSelectionPanel";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import PublicSafetyDefenceLocationMap, { defenceLocations, type DefenceLocation } from "./PublicSafetyDefenceLocationMap";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import styles from "./PublicSafetyDefenceProfileView.module.css";

const charts = [
  "Total Yearly Headcount and Percent Change (coloured arrows) for each Military Service Branch, Combined for Whole of Australian Defence Force (ADF)",
  "Yearly Separation Rate for ADF Service Branches and ADF Combined",
  "Proportion of Male and Female ADF and ADF Reserve Members in 2025",
  "Proportion of First Nations Participation in the ADF and ADF Reserves Across 2024 and 2025",
  "ADF Employees and Major Facilities by Location",
  "List of Operations and Activities Undertaken by the Australian Defence Force Throughout 2024 and 2025",
];

const chartCardLabels = [
  "Total Yearly Headcount and\nPercent Change (coloured\narrows) for each Military Service\nBranch, Combined for Whole of\nAustralian Defence Force (ADF)",
  charts[1],
  "Proportion of Male and Female ADF and ADF Reserve\nMembers in 2025",
  "Proportion of First Nations Participation in the ADF\nand ADF Reserves Across 2024 and 2025",
  "ADF Employees and Major Facilities by Location\nand ADF Reserves Across 2024 and 2025",
  charts[5],
];

function HeadcountChart() {
  // Approved values are independent of Frame 36's display coordinates.
  const series = [
    { name: "Total ADF", previous: 57245, current: 58909, change: "2.9%", colour: "#EBB92E", leftY: 27.801, rightY: 15.801, leftLabelY: 36, rightLabelY: 25, nameY: 42 },
    { name: "ADF Reserves", previous: 32560, current: 33269, change: "2.2%", colour: "#BA774C", leftY: 205.5, rightY: 200.4, leftLabelY: 214, rightLabelY: 210, nameY: 227 },
    { name: "Army", previous: 27239, current: 27701, change: "1.7%", colour: "#F69063", leftY: 243.8, rightY: 240.5, leftLabelY: 252, rightLabelY: 250, nameY: 267 },
    { name: "Air Force", previous: 15261, current: 16085, change: "5.4%", colour: "#706C6B", leftY: 330.1, rightY: 324.2, leftLabelY: 337, rightLabelY: 334, nameY: 349 },
    { name: "Navy", previous: 14745, current: 15123, change: "2.6%", colour: "#D9AD6C", leftY: 333.8, rightY: 331.1, leftLabelY: 344, rightLabelY: 345, nameY: 363 },
  ];
  return <section className={`${styles.presentationPanel} ${styles.headcountPanel} animate-card-entrance`} aria-labelledby="defence-headcount-title">
    <div className={styles.headcountContent}>
      <p className={styles.presentationLabel}>DEF · Presentation View</p>
      <h2 id="defence-headcount-title" className={styles.headcountTitle}>{charts[0]}</h2>
      <div className={styles.plotViewport} tabIndex={0} role="region" aria-label="ADF headcount chart; scroll horizontally on smaller screens">
        <svg className={styles.headcountPlot} width={697} height={414} viewBox="0 0 697 414" role="img" aria-labelledby="defence-headcount-title defence-headcount-description">
          <desc id="defence-headcount-description">{series.map((item) => `${item.name}: ${item.previous.toLocaleString("en-AU")} in 2024; ${item.current.toLocaleString("en-AU")} in 2025; increase ${item.change}`).join(". ")}</desc>
          <text transform="translate(31 201) rotate(-90)" textAnchor="middle" className={styles.axisTitle}>Total Permanent and Reserve ADF Members (headcount)</text>
          {[60000, 47500, 35000, 22500, 10000].map((value, index) => <g key={value} aria-hidden="true">
            <line x1={94} x2={697} y1={16.75 + index * 90} y2={16.75 + index * 90} className={styles.gridline} />
            <text x={80.427} y={22 + index * 90} textAnchor="end" className={styles.axisLabel}>{value.toLocaleString("en-AU")}</text>
          </g>)}
          {series.map((item, index) => <g key={item.name} className={styles.headcountSeries} tabIndex={0} role="img" aria-label={`${item.name}: ${item.previous.toLocaleString("en-AU")} in 2024; ${item.current.toLocaleString("en-AU")} in 2025; increase ${item.change}`}>
            <line x1={151} y1={item.leftY} x2={541} y2={item.rightY} stroke={item.colour} strokeWidth={index < 3 ? 2.75 : 2.5} className="animate-profile-chart-line" style={{ animationDelay: `${index * .12 + .35}s` }} />
            <circle cx={151} cy={item.leftY} r={4.2} fill={item.colour} className="animate-radar-point" style={{ animationDelay: `${index * .12 + .35}s` }} />
            <circle cx={541} cy={item.rightY} r={4.2} fill={item.colour} className="animate-radar-point" style={{ animationDelay: `${index * .12 + .8}s` }} />
            <g className={styles.valueLabels} fill={item.colour}>
              <text x={141.4} y={item.leftLabelY} textAnchor="end">{item.previous.toLocaleString("en-AU")}</text>
              <text x={551} y={item.rightLabelY}>{item.current.toLocaleString("en-AU")}</text>
              <text x={597.5} y={item.rightLabelY} className={styles.changeLabel}>▲ {item.change}</text>
            </g>

          </g>)}
          <g className={styles.yearLabels} aria-hidden="true"><text x={151} y={400} textAnchor="middle">2024</text><text x={541} y={400} textAnchor="middle">2025</text></g>
        </svg>
      </div>
      <ul className={styles.seriesLegend} aria-label="Chart legend">{series.map(item => <li key={item.name}><span style={{ backgroundColor: item.colour }} aria-hidden="true" />{item.name}</li>)}</ul>
      <p data-source-caption className={styles.headcountSource}>SOURCE: Defence Annual Report 2024-25, 2025 &amp; Defence Annual Report 2023-24, 2024</p>
    </div>
  </section>;
}

function SeparationChart() {
  // Retain the approved rates while matching Frame 37's chart geometry.
  const series = [
    { name: "Navy", previous: 11.5, current: 9.4, colour: "#BA774C", leftY: 48.439, rightY: 148.144, leftLabelY: 49, rightLabelY: 138, nameY: 159, rightX: 577.5 },
    { name: "Total ADF", previous: 9.5, current: 7.9, colour: "#F69063", leftY: 143.314, rightY: 219.214, leftLabelY: 131.5, rightLabelY: 208, nameY: 230, rightX: 577.5 },
    { name: "Army", previous: 7.7, current: 6.9, colour: "#706C6B", leftY: 228.76, rightY: 266.71, leftLabelY: 204.55, rightLabelY: 255, nameY: 277, rightX: 580.5 },
    { name: "Air Force", previous: 7.6, current: 6.2, colour: "#D9AD6C", leftY: 233.475, rightY: 299.945, leftLabelY: 221.66, rightLabelY: 304, nameY: 326, rightX: 580.5 },
  ];
  return <section className={`${styles.presentationPanel} ${styles.separationPanel} animate-card-entrance`} aria-labelledby="defence-separation-chart-title">
    <div className={`${styles.headcountContent} ${styles.separationContent}`}>
      <p className={styles.presentationLabel}>DEF · Presentation View</p>
      <h2 id="defence-separation-chart-title" className={styles.headcountTitle}>{charts[1]}</h2>
      <div className={`${styles.plotViewport} ${styles.separationViewport}`} tabIndex={0} role="region" aria-label="ADF separation rate chart; scroll horizontally on smaller screens">
        <svg className={styles.separationPlot} width={670} height={448} viewBox="0 0 670 448" role="img" aria-labelledby="defence-separation-chart-title defence-separation-chart-description">
          <desc id="defence-separation-chart-description">{series.map((item) => `${item.name}: ${item.previous.toFixed(1)}% in 2024; ${item.current.toFixed(1)}% in 2025`).join(". ")}</desc>
          <text transform="translate(34 223.63) rotate(-90)" textAnchor="middle" className={styles.axisTitle}>Yearly Separation Rate (percentage)</text>
          {[12, 10, 8, 6, 4].map((value, index) => <g key={value} aria-hidden="true">
            <line x1={96} x2={668} y1={25.75 + index * 94.875} y2={25.75 + index * 94.875} className={styles.gridline} />
            <text x={87.28} y={22 + index * 94.875} textAnchor="end" className={styles.axisLabel}>{value.toFixed(1)}%</text>
          </g>)}
          {series.map((item, index) => <g key={item.name} className={styles.headcountSeries} tabIndex={0} role="img" aria-label={`${item.name}: ${item.previous.toFixed(1)}% in 2024; ${item.current.toFixed(1)}% in 2025`}>
            <line data-separation-series={item.name} x1={166.25} y1={item.leftY} x2={567.65} y2={item.rightY} stroke={item.colour} strokeWidth={3.76864} className="animate-profile-chart-line" style={{ animationDelay: `${index * .12 + .35}s` }} />
            <ellipse cx={166.25} cy={item.leftY} rx={4.515} ry={5.175} fill={item.colour} className="animate-radar-point" style={{ animationDelay: `${index * .12 + .35}s` }} />
            <ellipse cx={567.65} cy={item.rightY} rx={4.515} ry={5.175} fill={item.colour} className="animate-radar-point" style={{ animationDelay: `${index * .12 + .8}s` }} />
            <g className={styles.valueLabels} fill={item.colour}>
              <text x={153.28} y={item.leftLabelY} textAnchor="end">{item.previous.toFixed(1)}%</text>
              <text x={item.rightX} y={item.rightLabelY}>{item.current.toFixed(1)}%</text>
            </g>

          </g>)}
          <g className={styles.yearLabels} aria-hidden="true"><text x={165} y={426.43} textAnchor="middle">2024</text><text x={565.25} y={426.43} textAnchor="middle">2025</text></g>
        </svg>
      </div>
      <ul className={styles.seriesLegend} aria-label="Chart legend">{series.map(item => <li key={item.name}><span style={{ backgroundColor: item.colour }} aria-hidden="true" />{item.name}</li>)}</ul>
      <p data-source-caption className={styles.separationSource}>SOURCE: Defence Annual Report 2024-25, 2025</p>
    </div>
  </section>;
}

function GenderChart() {
  const rows = [["Army",84.6,15.3],["ADF Reserves",81.3,18.7],["Total ADF",79.1,20.9],["Navy",75.7,24.3],["Air Force",72.7,27.3]] as const;
  return <section className={`${styles.presentationPanel} ${styles.genderPanel} animate-card-entrance`} aria-labelledby="defence-gender-chart-title">
    <div className={styles.genderViewport} tabIndex={0} role="region" aria-label="ADF male and female workforce chart; scroll horizontally on smaller screens">
      <svg className={styles.genderPlot} width={708} height={600} viewBox="0 0 708 600" role="img" aria-labelledby="defence-gender-chart-title defence-gender-chart-description">
        <title id="defence-gender-chart-title">{charts[2]}</title>
        <desc id="defence-gender-chart-description">{rows.map(([name, male, female]) => `${name}: male ${male.toFixed(1)}%; female ${female.toFixed(1)}%`).join(". ")}</desc>
        <rect x={.5} y={.5} width={707} height={599} rx={3.5} fill="white" stroke="#E9EAEB" />
        <text x={24} y={40} className={styles.genderPresentationLabel}>DEF · PRESENTATION VIEW</text>
        <text x={24} y={61} className={styles.genderTitle} aria-hidden="true"><tspan x={24}>Proportion of Male and Female ADF and ADF Reserve</tspan><tspan x={24} dy={24}>Members in 2025</tspan></text>
        {rows.map(([name, male, female], index) => {
          const y = 164.375 + index * 52;
          // Keep both approved percentages, including the rounded Army total of 99.9%.
          const maleWidth = 550 * male / 100;
          const femaleWidth = 550 * female / 100;
          return <g key={name} className={styles.genderRow} tabIndex={0} role="img" aria-label={`${name}: male ${male.toFixed(1)}%; female ${female.toFixed(1)}%`}>
            <text x={122} y={y + 24.5} textAnchor="end" className={styles.genderAxisLabel}>{name}</text>
            <rect data-gender-series="male" data-service={name} data-value={male} x={134} y={y} width={maleWidth} height={38} fill="#64645E" className={`${styles.genderBar} animate-profile-bar`} style={{ animationDelay: `${index * .1 + .2}s` }} />
            <rect data-gender-series="female" data-service={name} data-value={female} x={134 + maleWidth} y={y} width={femaleWidth} height={38} fill="#D3992C" className={`${styles.genderBar} animate-profile-bar`} style={{ animationDelay: `${index * .1 + .35}s` }} />
            <g className={styles.genderValues} style={{ animationDelay: `${index * .1 + .4}s` }}>
              <text x={134 + maleWidth / 2} y={y + 24.5} textAnchor="middle">{male.toFixed(1)}%</text>
              <text x={134 + maleWidth + femaleWidth / 2} y={y + 24.5} textAnchor="middle">{female.toFixed(1)}%</text>
            </g>
          </g>;
        })}
        <g className={styles.genderAxisLabel} aria-hidden="true">{[145.71, 245.615, 350.14, 454.78, 559.375, 666.07].map((x, index) => <text key={x} x={x} y={441} textAnchor="middle">{index * 20}%</text>)}</g>
        <g className={styles.genderLegend} aria-hidden="true">
          <rect x={88} y={518} width={14} height={14} rx={7} fill="#64645E" /><text x={110} y={530}>Male (%)</text>
          <rect x={195} y={518} width={14} height={14} rx={7} fill="#D3992C" /><text x={217} y={530}>Female (%)</text>
        </g>
        <text data-source-caption x={24} y={570} className={styles.genderSource}>SOURCE: Defence Annual Report 2024-25, 2025</text>
      </svg>
    </div>
  </section>;
}

function FirstNationsChart() {
  const series = [
    { name: "Total ADF", previous: 3.9, current: 3.9, colour: "#D9AD6C", nameX: 592, nameOffset: 34, valueOffset: 6 },
    { name: "ADF Reserves", previous: 3.1, current: 3.0, colour: "#706C6B", nameX: 575, nameOffset: 33, valueOffset: 5 },
  ];
  const y = (value: number) => 140.662 + (4.5 - value) / .5 * 84.3785;
  return <section className={`${styles.presentationPanel} ${styles.genderPanel} animate-card-entrance`} aria-labelledby="defence-first-nations-title">
    <div className={styles.genderViewport} tabIndex={0} role="region" aria-label="First Nations participation chart; scroll horizontally on smaller screens">
      <svg className={styles.genderPlot} width={708} height={600} viewBox="0 0 708 600" role="img" aria-labelledby="defence-first-nations-title defence-first-nations-description">
        <title id="defence-first-nations-title">{charts[3]}</title>
        <desc id="defence-first-nations-description">{series.map((item) => `${item.name}: ${item.previous.toFixed(1)}% in 2024; ${item.current.toFixed(1)}% in 2025`).join(". ")}</desc>
        <rect x={.5} y={.5} width={707} height={599} fill="white" stroke="#E9EAEB" />
        <text x={28} y={43.5} className={styles.firstNationsDefLabel}>DEF</text>
        <circle cx={55.9} cy={40.08} r={1.013} fill="#5D6F2C" />
        <text x={65} y={45.5} className={styles.genderPresentationLabel}>PRESENTATION VIEW</text>
        <text x={28} y={77} className={styles.genderTitle} aria-hidden="true"><tspan x={28}>Proportion of First Nations Participation in the ADF</tspan><tspan x={28} dy={24}>and ADF Reserves Across 2024 and 2025</tspan></text>
        <text transform="translate(43 327.464) rotate(-90)" textAnchor="middle" className={styles.firstNationsAxisTitle}>Proportion of First Nations Participation (percentage)</text>
        {[4.5, 4, 3.5, 3, 2.5].map((value, index) => <g key={value} aria-hidden="true">
          <line x1={102.199} x2={661.73} y1={y(value)} y2={y(value)} className={styles.firstNationsGridline} />
          <text x={95} y={145 + index * 84.3785} textAnchor="end" className={styles.axisLabel}>{value.toFixed(1)}%</text>
        </g>)}
        {series.map((item, index) => <g key={item.name} className={styles.headcountSeries} tabIndex={0} role="img" aria-label={`${item.name}: ${item.previous.toFixed(1)}% in 2024; ${item.current.toFixed(1)}% in 2025`}>
          <line data-first-nations-series={item.name} x1={163.801} y1={y(item.previous)} x2={595} y2={y(item.current)} stroke={item.colour} strokeWidth={3.90613} className="animate-profile-chart-line" style={{ animationDelay: `${index * .25 + .4}s` }} />
          <ellipse cx={163.801} cy={y(item.previous)} rx={4.62} ry={5.4245} fill={item.colour} className="animate-radar-point" style={{ animationDelay: `${index * .25 + .4}s` }} />
          <ellipse cx={595} cy={y(item.current)} rx={4.62} ry={5.4245} fill={item.colour} className="animate-radar-point" style={{ animationDelay: `${index * .2 + .9}s` }} />
          <g className={styles.firstNationsValues} fill={item.colour}>
            <text x={155} y={y(item.previous) - 14}>{item.previous.toFixed(1)}%</text>
            <text x={605} y={y(item.current) + item.valueOffset}>{item.current.toFixed(1)}%</text>
          </g>

        </g>)}
        <g className={styles.yearLabels} aria-hidden="true"><text x={188.64} y={523.5} textAnchor="middle">2024</text><text x={619.265} y={523.5} textAnchor="middle">2025</text></g>
        <text data-source-caption x={28} y={575} className={styles.genderSource}>SOURCE: DEFENCE ANNUAL REPORT 2024–25, 2025</text>
      </svg>
    </div>
    <ul className={styles.seriesLegend} aria-label="Chart legend">{series.map(item => <li key={item.name}><span style={{ backgroundColor: item.colour }} aria-hidden="true" />{item.name}</li>)}</ul>
  </section>;
}

function LocationChart() {
  const states: DefenceLocation[] = ["NAT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA", "ACT"];
  const [selectedState, setSelectedState] = useState<DefenceLocation>("WA");
  const location = selectedState === "NAT" ? null : defenceLocations[selectedState];
  return <section className={`${styles.locationPanel} animate-card-entrance`} aria-labelledby="defence-location-title">
    <h2 id="defence-location-title">ADF Employees and Major Facilities by Location</h2>
    <div className={styles.locationControls} role="group" aria-label="Select an ADF workforce jurisdiction">
      {states.map((state) => <button type="button" key={state} aria-pressed={state === selectedState} aria-label={state === "NAT" ? "National map" : defenceLocations[state].name} onClick={() => setSelectedState(state)}>{state}</button>)}
    </div>
    <div className={styles.locationGrid}>
      <div className={styles.locationMap}><PublicSafetyDefenceLocationMap className={styles.locationMapAsset} selected={selectedState} onSelect={setSelectedState} /></div>
      <aside className={styles.locationDetails} aria-live="polite" aria-atomic="true">
        <h3>{selectedState === "NAT" ? "Australia" : selectedState}</h3>
        {location ? <div key={selectedState} className={styles.locationStats}>{location.values.map((value, index) => <div key={index} className={styles.locationStat} style={{ animationDelay: `${index * .1 + .15}s` }}><strong>{value}</strong><span>{["Permanent ADF", "ADF Reserves", "Major Defence"][index]}</span></div>)}</div> : <p className={styles.locationPrompt}>Select a state or territory to view workforce and major Defence base figures.</p>}
      </aside>
    </div>
    <p className={styles.locationNote}>Major Defence bases. Please note total number of bases may change in the next 12 months inline with recommendations from the Defence Estate Audit</p>
    <p data-source-caption className={styles.locationSource}>SOURCE: Defence Annual Report 2024-25, 2025</p>
  </section>;
}

function OperationsChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(chart);
    return () => observer.disconnect();
  }, []);

  // Positions are measured in the 928 × 556 artwork area of Frame 41.
  const map = "/images/reports/public-safety/defence-world-map-only.png";
  const connectorPaths = [
    "M382 109H474V268",
    "M382 167H439.5V306H492",
    "M382 315H492",
    "M382 363H474V332",
    "M382 421H474V374",
    "M382 478.5H497V350",
    "M659 236H682V295",
    "M809 144V233",
    "M728 306H682V360",
    "M739.5 375V406",
    "M674 386H691V422",
    "M648 442H675",
    "M520 502H486V545",
    "M809 455V416H771",
  ];
  const markers = [
    [474,268], [492,306], [492,315], [474,332], [474,374], [497,350],
    [682,295], [809,233], [682,360], [739.5,406], [691,422],
    [675,442], [486,545], [771,414],
  ];
  const operations = [
    { x: 243, y: 86, w: 139, h: 47, names: ["Operation Kudu"], place: "Ukraine" },
    { x: 243, y: 144, w: 139, h: 46, names: ["Operation Fortitude"], place: "Syria" },
    { x: 243, y: 213, w: 139, h: 116, names: ["Operation Accordion", "Operation Beech", "Operation Manitou", "Operation Okra", "Operation Paladin", "Operation Steadfast"], place: "Middle East region" },
    { x: 243, y: 340, w: 139, h: 46, names: ["Operation Mazurka"], place: "Egypt" },
    { x: 243, y: 398, w: 139, h: 46, names: ["Operation Aslan"], place: "South Sudan" },
    { x: 243, y: 455, w: 139, h: 47, names: ["Operation Hydranth"], place: "Red Sea" },
    { x: 0, y: 340, w: 139, h: 46, names: ["Operation Augury"], place: "Global" },
    { x: 0, y: 398, w: 139, h: 46, names: ["Operation Dyurra"], place: "Space" },
    { x: 520, y: 201, w: 139, h: 59, names: ["Operation Argos", "Operation Linesman"], place: "Republic of Korea" },
    { x: 743, y: 83, w: 115, h: 58, names: ["Exercise Rim", "of the Pacific"], place: "Hawaii", dark: true },
    { x: 728, y: 271, w: 127, h: 46, names: ["Operation Gateway"], place: "South-East Asia" },
    { x: 728, y: 329, w: 127, h: 46, names: ["Operation Lilia"], place: "Solomon Islands" },
    { x: 523, y: 361, w: 151, h: 46, names: ["Exercise Austral Shield"], place: "Australia", dark: true },
    { x: 520, y: 421, w: 128, h: 46, names: ["Operation Resolute"], place: "Australian borders" },
    { x: 520, y: 479, w: 127, h: 58, names: ["Operation Southern", "Discovery"], place: "Antarctica" },
    { x: 693, y: 455, w: 162, h: 82, names: ["Operation Render Safe", "Operation Solania", "Operation Vaea", "Operation Vanuatu Assist"], place: "Pacific Islands" },
  ];
  const note = "NOTE: Does not include ADF assistance to domestic emergency response.";
  const source = "Defence Annual Report 2024-25, 2025";

  return <section className={`${styles.operationsPanel} animate-card-entrance`} aria-labelledby="defence-operations-title">
    <header className={styles.operationsHeader}>
      <p>DEF · Presentation View</p>
      <h2 id="defence-operations-title">{charts[5]}</h2>
    </header>
    <div ref={chartRef} className={styles.operationsViewport} tabIndex={0} role="region" aria-label="World operations map. Scroll horizontally on smaller screens.">
      <svg viewBox="0 0 928 556" width={928} height={556} className={styles.operationsMap} role="img" aria-labelledby="defence-operations-title" aria-describedby="defence-operations-description">
        <desc id="defence-operations-description">{operations.map(({ names, place }) => `${place}: ${names.join(place === "Hawaii" || place === "Antarctica" ? " " : ", ")}`).join(". ")}</desc>
        <image href={map} x={-83} y={-29} width={990.85} height={625.765} />
        <g fill="none" stroke="#1a2d15" strokeWidth={1.65} strokeLinejoin="round">
          {connectorPaths.map((path, index) => <path key={index} d={path} />)}
        </g>
        <circle cx={491} cy={311} r={17.5} fill="#b99632" opacity=".86" />
        <circle cx={768.5} cy={415.5} r={17.5} fill="#efc345" opacity=".9" />
        <g fill="#1a2d15">
          {markers.map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r={3.25} />)}
        </g>
        {operations.map(({ x,y,w,h,names,place,dark }, index) => <g key={`${x}-${y}`}>
          <rect x={x} y={y} width={w} height={h} fill={dark ? "#ad792a" : "#daae6c"} fillOpacity=".8"
            className={isVisible ? "animate-profile-operation-box" : "profile-operation-pending"}
            style={isVisible ? { animationDelay: `${0.12 + index * 0.1}s` } : undefined} />
          <text x={x + 4.5} y={y + 17} fill="#42574b" fontSize={11} fontWeight={400} letterSpacing={-.25}
            className={isVisible ? "animate-profile-operation-text" : "profile-operation-pending"}
            style={isVisible ? { animationDelay: `${0.38 + index * 0.1}s` } : undefined}>
            {names.map((name, line) => <tspan key={name} x={x + 4.5} dy={line === 0 ? 0 : 13}>{name}</tspan>)}
            <tspan x={x + 4.5} dy={14} fill="#fff" fontSize={10}>{place}</tspan>
          </text>
        </g>)}
      </svg>
    </div>
    <p className={styles.operationsNote}>{note}</p>
    <p data-source-caption className={styles.operationsSource}>SOURCE: {source}</p>
  </section>;
}

function ActiveChart({ active }: { active: number }) {
  if (active === 0) return <HeadcountChart />;
  if (active === 1) return <SeparationChart />;
  if (active === 2) return <GenderChart />;
  if (active === 3) return <FirstNationsChart />;
  if (active === 4) return <LocationChart />;
  return <OperationsChart />;
}

export default function PublicSafetyDefenceProfileView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const libraryRef = useRef<HTMLElement>(null);
  const [libraryVisible, setLibraryVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) setLibraryVisible(true); }, { threshold: 0.05 });
    if (libraryRef.current) observer.observe(libraryRef.current);
    return () => observer.disconnect();
  }, []);
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="defence_industry_profile" contentClassName={styles.page} navigation={{ back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`}, backSecondary:{label:"Defence chapter",href:`/reports/${slug}/defence`}, prev:{label:"Industry-Sector Overview",href:`/reports/${slug}/defence_industry_overview`}, next:{label:"Workforce Insights",href:`/reports/${slug}/defence_workforce_insights`}, prevPrefix:"Previous Section:", nextPrefix:"Next Section:" }}>
    <section className={styles.hero}>
      <div className={styles.heroCopy}><span className={styles.badge}>DEF · Industry-Sector Analysis</span><h1>Industry Profile</h1><p>Select a chart to open it in a large presentation view.</p></div>
      <div className={styles.artwork}>
        <picture><source media="(prefers-reduced-motion: reduce)" srcSet="/images/reports/public-safety/defence-industry-overview-group-93.svg" /><Image src="/images/reports/public-safety/defence-industry-overview-group-93-animated.svg" alt="Australian Defence Force land, maritime and air capabilities" width={446} height={100} unoptimized priority /></picture>
      </div>
    </section>
    <section ref={libraryRef} className={`${styles.library} ${libraryVisible ? styles.enter : styles.pending}`} aria-labelledby="defence-chart-library-title">
      <h2 id="defence-chart-library-title">Chart Library · 6 · Select a chart to open</h2>
      <div className={styles.libraryGrid}>
        <div className={styles.chartList} aria-label="Defence profile charts">
          {charts.map((label, i) => <button id={`defence-profile-chart-${i}`} key={label} type="button" onClick={() => setActive(i)} aria-pressed={active === i} aria-controls="defence-profile-presentation" style={libraryVisible ? { animationDelay: `${i * .08 + .08}s` } : undefined} className={`${styles.chartButton} ${active === i ? styles.selected : ""} ${libraryVisible ? styles.enter : styles.pending}`}>
            <span><small>0{i + 1} · DEF · Presentation View</small><strong>{chartCardLabels[i]}</strong></span>
            <span className={styles.chartArrow} aria-hidden="true"><ArrowRight size={16} strokeWidth={1.5} /></span>
          </button>)}
        </div>
        <ReportSelectionPanel selection={active} label="Defence profile presentation"><div id="defence-profile-presentation" className={styles.activeChart} role="region" aria-labelledby={`defence-profile-chart-${active}`}><ActiveChart key={active} active={active} /></div></ReportSelectionPanel>
      </div>
    </section>
  </PublicSafetyPageShell>;
}
