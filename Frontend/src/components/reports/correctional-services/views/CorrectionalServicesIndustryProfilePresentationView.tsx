"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import mapData from "@/data/australia_map_data.json";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type Report = {
  contactUrl?: string;
  pdfFileUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const chartTitles = [
  "Corrections Prisons Officers Workforce by Age",
  "Correctional Custodial Facilities, Number (at 30 June 2025)",
  "Workforce Characteristics – Custodial Settings and Community Corrections",
  "Correctional Services Training Package Enrolments",
  "Average Daily Imprisonment Rate (per 100,000 adult population) – Australia",
  "Prison Capacity Utilisation by State and Territory",
  "Average Daily Imprisonment Rate (per 100,000 adult population) – State and Territory",
  "Real Net Prisons and Community Corrections Operating Expenditure 2024–25FY",
];

const ages = [
  { label: "65 and over", value: 3.8 },
  { label: "60–64", value: 8.1 },
  { label: "55–59", value: 12 },
  { label: "45–54", value: 28 },
  { label: "35–44", value: 23.5 },
  { label: "25–34", value: 21.5 },
  { label: "20–24", value: 3 },
  { label: "15–19", value: 0.1 },
];

const jurisdictions = [
  { code: "ACT", name: "Australian Capital Territory", employees: 568, government: 1, private: 0, transition: 1, court: 0, total: 2 },
  { code: "NSW", name: "New South Wales", employees: 10610, government: 30, private: 2, transition: 2, court: 13, total: 47 },
  { code: "NT", name: "Northern Territory", employees: 1443, government: 5, private: 0, transition: 0, court: 0, total: 5 },
  { code: "QLD", name: "Queensland", employees: 8114, government: 14, private: 0, transition: 0, court: 0, total: 14 },
  { code: "SA", name: "South Australia", employees: 2067, government: 7, private: 2, transition: 0, court: 0, total: 9 },
  { code: "TAS", name: "Tasmania", employees: 767, government: 5, private: 0, transition: 0, court: 0, total: 5 },
  { code: "VIC", name: "Victoria", employees: 4419, government: 11, private: 3, transition: 1, court: 0, total: 15 },
  { code: "WA", name: "Western Australia", employees: 3314, government: 16, private: 1, transition: 0, court: 0, total: 17 },
] as const;

type JurisdictionCode = (typeof jurisdictions)[number]["code"];

const mapLabels: Partial<Record<JurisdictionCode, [number, number]>> = {
  WA: [215, 312], NT: [404, 205], SA: [427, 385], QLD: [572, 258],
  NSW: [602, 435], VIC: [575, 498], TAS: [569, 581],
};

const characteristics = [
  { label: "Workforce living outside capital cities", custodial: 38, community: 40 },
  { label: "Part-time employment", custodial: 12, community: 14 },
  { label: "First Nations", custodial: 4, community: 5 },
  { label: "Female", custodial: 33, community: 72 },
];

const enrolments = [
  { qualification: "CSC60120 – Advanced Dip. of Correctional Management", color: "#DDE2F0", values: [260, 215, 120, 30, 30, 25] },
  { qualification: "CSC50122 – Dip. of Correctional Administration", color: "#8FA7D6", values: [145, 230, 250, 190, 135, 170] },
  { qualification: "CSC40122 – Cert. IV in Correctional Practice", color: "#B9C2E2", values: [1370, 1515, 1645, 1280, 1170, 1560] },
  { qualification: "CSC30222 – Cert. III in Immigration Detention Ops.", color: "#27272E", values: [5, 20, 490, 505, 230, 190] },
  { qualification: "CSC30122 – Cert. III in Correctional Practice", color: "#424996", values: [5595, 5230, 4420, 3955, 5305, 5765] },
];

const imprisonmentRates = [
  { label: "Mar 2024", value: 205.7 }, { label: "Jun 2024", value: 207.9 },
  { label: "Sep 2024", value: 207.8 }, { label: "Dec 2024", value: 206.8 },
  { label: "Mar 2025", value: 214.3 }, { label: "Jun 2025", value: 217.3 },
  { label: "Sep 2025", value: 216.1 }, { label: "Dec 2025", value: 217.4 },
];

const capacityJurisdictions = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];
const capacitySeries = [
  { year: "2022–23", color: "#424996" },
  { year: "2023–24", color: "#E0E4F1" },
  { year: "2024–25", color: "#AFB8DC" },
];

const stateRateJurisdictions = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"];
const stateRateSeries = [
  { quarter: "December 2024", color: "#424996" },
  { quarter: "March 2025", color: "#AEB6D7" },
  { quarter: "June 2025", color: "#33439D" },
  { quarter: "September 2025", color: "#D6DBEC" },
  { quarter: "December 2025", color: "#8797C9" },
];

const expenditure = [
  { label: "NSW", value: 1830, display: "$1.83 billion" },
  { label: "VIC", value: 1300, display: "$1.3 billion" },
  { label: "QLD", value: 1370, display: "$1.37 billion" },
  { label: "SA", value: 360, display: "$360 million" },
  { label: "WA", value: 982, display: "$982 million" },
  { label: "TAS", value: 168, display: "$168 million" },
  { label: "NT", value: 254, display: "$254 million" },
  { label: "ACT", value: 113, display: "$113 million" },
];

const expenditureMapLabels: Record<string, [number, number]> = {
  WA: [215, 340], NT: [405, 220], QLD: [575, 275], SA: [430, 395],
  NSW: [595, 440], VIC: [565, 505], TAS: [615, 585], ACT: [720, 505],
};

function useReveal(active: number) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [active]);
  return visible;
}

function HorizontalBars({ rows, max, suffix = "", visible }: {
  rows: { label: string; value: number; display?: string }[];
  max: number;
  suffix?: string;
  visible: boolean;
}) {
  const ticks = suffix ? [0, 5, 10, 15, 20, 25, 30] : max === 50 ? [0, 10, 20, 30, 40, 50] : [0, 500, 1000, 1500, 2000];
  return (
    <div className="mt-7 overflow-x-auto">
      <div className="min-w-[570px]">
        <div className="space-y-3">
          {rows.map(({ label, value, display }, index) => (
            <div key={label} className="grid grid-cols-[96px_minmax(0,1fr)] items-center gap-4">
              <span className="text-right text-xs font-semibold text-[#252D02]">{label}</span>
              <div className="relative h-8">
                <div className="h-full rounded-r-[3px] bg-[#424996] transition-[width,filter] duration-700 ease-out hover:brightness-125" style={{ width: visible ? `${(value / max) * 100}%` : "0%", transitionDelay: `${index * 55}ms` }} title={`${label}: ${display ?? `${value}${suffix}`}`} />
                <span className="absolute top-1/2 -translate-y-1/2 pl-3 text-xs font-semibold tabular-nums text-[#424996]" style={{ left: `${(value / max) * 100}%` }}>{display ?? `${value.toFixed(suffix ? 1 : 0)}${suffix}`}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="ml-[112px] mt-5 flex justify-between border-t border-[#E4E7EC] pt-2 text-[11px] tabular-nums text-[#667085]">
          {ticks.map((tick) => <span key={tick}>{tick.toLocaleString()}{suffix}</span>)}
        </div>
      </div>
    </div>
  );
}

function FacilitiesMap() {
  const [selected, setSelected] = React.useState<JurisdictionCode | "ALL">("ACT");
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [mapVisible, setMapVisible] = React.useState(false);

  React.useEffect(() => {
    const node = mapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMapVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const current = jurisdictions.find((jurisdiction) => jurisdiction.code === selected);
  const totals = {
    employees: jurisdictions.reduce((sum, jurisdiction) => sum + jurisdiction.employees, 0),
    government: jurisdictions.reduce((sum, jurisdiction) => sum + jurisdiction.government, 0),
    private: jurisdictions.reduce((sum, jurisdiction) => sum + jurisdiction.private, 0),
    transition: jurisdictions.reduce((sum, jurisdiction) => sum + jurisdiction.transition, 0),
    court: jurisdictions.reduce((sum, jurisdiction) => sum + jurisdiction.court, 0),
    total: jurisdictions.reduce((sum, jurisdiction) => sum + jurisdiction.total, 0),
  };
  const detail = current ?? { name: "All jurisdictions", ...totals };
  const counts = [
    ["Government", detail.government],
    ["Private", detail.private],
    ["Transition Centres", detail.transition],
    ["24-hour Court Cells", detail.court],
    ["Total", detail.total],
  ] as const;

  return (
    <>
      <p className="mt-2 text-xs font-medium text-[#598303]">Choose a State or Territory to see the numbers</p>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Choose a jurisdiction">
        {jurisdictions.map(({ code, name }) => (
          <button key={code} type="button" onClick={() => setSelected(code)} aria-pressed={selected === code}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#424996] ${selected === code ? "bg-[#8AC900] text-[#252D02]" : "bg-white text-[#252D02] hover:bg-[#DBE8B5]"}`}>
            {name}
          </button>
        ))}
        <button type="button" onClick={() => setSelected("ALL")} aria-pressed={selected === "ALL"}
          className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#424996] ${selected === "ALL" ? "bg-[#8AC900] text-[#252D02]" : "bg-white text-[#252D02] hover:bg-[#DBE8B5]"}`}>
          Compare All
        </button>
      </div>
      <div ref={mapRef} className="relative mt-4 min-h-[300px] sm:min-h-[440px]">
        <svg viewBox="55 20 740 605" role="img" aria-label="Map of Australian correctional services employment by jurisdiction" className={`block w-full motion-reduce:opacity-100 motion-reduce:animate-none sm:w-[73%] ${mapVisible ? "animate-zoom-in" : "opacity-0"}`}>
          {Object.values(mapData.states).map((state) => (
            <path key={state.code} d={state.d} fill={selected === state.code ? "#858FC5" : "#A7B0D7"}
              stroke="#F7F8F9" strokeWidth="1.5" strokeLinejoin="round"
              className="cursor-pointer transition-colors duration-300 hover:fill-[#858FC5]"
              onClick={() => setSelected(state.code as JurisdictionCode)}>
              <title>{state.name}: {jurisdictions.find((item) => item.code === state.code)?.total} facilities</title>
            </path>
          ))}
          {jurisdictions.filter(({ code }) => code !== "ACT").map(({ code, employees }, index) => {
            const [x, y] = mapLabels[code] ?? [0, 0];
            return (
              <g key={code} className={`pointer-events-none motion-reduce:opacity-100 motion-reduce:animate-none ${mapVisible ? "animate-profile-operation-text" : "opacity-0"}`} style={mapVisible ? { animationDelay: `${0.35 + index * 0.08}s` } : undefined}>
                <rect x={x - 22} y={y - 20} width="44" height="25" rx="12.5" fill="#424996" />
                <text x={x} y={y - 3} textAnchor="middle" fill="white" fontSize="11" fontWeight="700">{code}</text>
                <text x={x} y={y + 20} textAnchor="middle" fill="#252D02" fontSize="9" fontWeight="500">Employees: {employees.toLocaleString()}</text>
              </g>
            );
          })}
          <g className={`motion-reduce:opacity-100 motion-reduce:animate-none ${mapVisible ? "animate-profile-operation-text" : "opacity-0"}`} style={mapVisible ? { animationDelay: "0.91s" } : undefined}>
            <circle cx="670" cy="455" r="4" fill="#424996" />
            <path d="M670 455H728" stroke="#424996" strokeWidth="1.5" />
            <rect x="728" y="443" width="45" height="24" rx="12" fill="#424996" />
            <text x="750" y="460" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">ACT</text>
            <text x="750" y="481" textAnchor="middle" fill="#252D02" fontSize="9">Employees: 568</text>
          </g>
        </svg>
        <div key={selected} className={`relative mx-auto mt-2 w-full max-w-[250px] rounded-md bg-[#424996] p-3 motion-reduce:opacity-100 motion-reduce:animate-none sm:absolute sm:right-0 sm:top-[14%] sm:mt-0 sm:w-[28%] ${mapVisible ? "animate-card-entrance" : "opacity-0"}`} style={mapVisible ? { animationDelay: "0.35s" } : undefined} aria-live="polite">
          <h3 className="mb-2 text-xs font-semibold leading-4 text-white">{detail.name}</h3>
          <div className="space-y-1.5">
            {counts.filter(([label, value]) => value > 0 || label === "Total").map(([label, value]) => (
              <div key={label} className="rounded-sm bg-white px-3 py-2 text-[#252D02]">
                <strong className="block text-base leading-5 tabular-nums text-[#424996]">{value}</strong>
                <span className="text-[10px] leading-4">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-[10px] leading-4 text-[#598303]">Source: Productivity Commission 2026, Report on Government Services, Corrective Services Table 8A.3. Employment: approved Correctional Services jurisdiction reference (2025).</p>
    </>
  );
}

function ExpenditureMap({ visible }: { visible: boolean }) {
  return (
    <div className="mt-6">
      <div className="flex min-h-20 items-center justify-between gap-4 rounded-md bg-[#424996] px-5 py-4 text-white">
        <span className="text-xs font-medium uppercase">Australia</span>
        <strong className="text-right text-2xl font-semibold tabular-nums sm:text-3xl">$6.38 billion</strong>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 800 630" className="min-w-[580px] w-full" role="img" aria-label="Map of 2024–25 prisons and community corrections operating expenditure by state and territory">
          <g className="transition-opacity duration-700 motion-reduce:transition-none" style={{ opacity: visible ? 1 : 0 }}>
            {Object.values(mapData.states).map((state) => (
              <path key={state.code} d={state.d} fill="white" stroke="#424996" strokeWidth="1.5" strokeLinejoin="round" className="transition-colors duration-200 hover:fill-[#F2F3FA]">
                <title>{state.name}: {expenditure.find((item) => item.label === state.code)?.display}</title>
              </path>
            ))}
          </g>
          {expenditure.map(({ label, display }, index) => {
            const [x, y] = expenditureMapLabels[label];
            return <g key={label} className="transition-opacity duration-500 motion-reduce:transition-none" style={{ opacity: visible ? 1 : 0, transitionDelay: `${200 + index * 70}ms` }}>
              <text x={x} y={y} fill="#727DB1" fontSize="20" fontWeight="500">{label}</text>
              <text x={x} y={y + 20} fill="#252D02" fontSize="13" fontWeight="600">{display}</text>
            </g>;
          })}
          <g className="transition-opacity duration-500 motion-reduce:transition-none" style={{ opacity: visible ? 1 : 0, transitionDelay: "680ms" }}>
            <text x="45" y="535" fill="#727DB1" fontSize="18">AUSTRALIA</text>
            <text x="45" y="555" fill="#252D02" fontSize="13" fontWeight="600">$6.38 billion</text>
          </g>
        </svg>
      </div>
      <p className="mt-2 text-[11px] leading-5 text-[#68723E]">Source: Productivity Commission 2026, Report on Government Services, Justice Part C – 8 Corrective Services, Table 8A.2.</p>
    </div>
  );
}

function ChartContent({ active }: { active: number }) {
  const visible = useReveal(active);

  if (active === 0) return (
    <>
      <p className="mt-2 text-xs text-[#667085]">Y axis: Percentage of Total Workforce, 0–30%</p>
      <HorizontalBars rows={ages} max={30} suffix="%" visible={visible} />
      <p className="mt-8 text-[11px] leading-5 text-[#667085]">Source: Jobs and Skills Australia 2025, Occupation – Demographic data (table)</p>
    </>
  );

  if (active === 1) return (
    <FacilitiesMap />
  );

  if (active === 2) return (
    <>
      <p className="mt-1 text-xs text-[#667085]">Y axis: Percentage of Total Workforce, 0–80%</p>
      <div className="mt-8 overflow-x-auto">
        <div className="min-w-[610px]">
          <div className="space-y-5">
            {characteristics.map(({ label, custodial, community }, groupIndex) => (
              <div key={label} className="grid grid-cols-[172px_minmax(0,1fr)] items-center gap-4">
                <strong className="text-[11px] font-semibold leading-4 text-[#424996]">{label}</strong>
                <div className="space-y-2">
                  {([ ["Community Corrections", community, "#9DA8D0"], ["Custodial Settings", custodial, "#424996"] ] as const).map(([series, value, color], seriesIndex) => (
                    <div key={series} className="relative mr-9 h-6" title={`${label}: ${series} ${value}%`}>
                      <div className="h-full rounded-r-[3px] transition-[width,filter] duration-700 ease-out hover:brightness-110 motion-reduce:transition-none" style={{ width: visible ? `${(value / 80) * 100}%` : "0%", backgroundColor: color, transitionDelay: `${groupIndex * 110 + seriesIndex * 60}ms` }} />
                      <span className="absolute top-1/2 -translate-y-1/2 pl-2 text-[11px] font-semibold tabular-nums text-[#424996] transition-opacity duration-300 motion-reduce:transition-none" style={{ left: `${(value / 80) * 100}%`, opacity: visible ? 1 : 0, transitionDelay: `${groupIndex * 110 + seriesIndex * 60 + 250}ms` }}>{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="ml-[188px] mr-9 mt-5 flex justify-between border-t border-[#E4E7EC] pt-2 text-[10px] tabular-nums text-[#667085]">
            {[0, 20, 40, 60, 80].map((tick) => <span key={tick}>{tick}</span>)}
          </div>
          <div className="ml-[188px] mt-5 flex flex-wrap gap-x-10 gap-y-2 text-[11px] text-[#535862]">
            <span className="inline-flex items-center gap-2"><i className="size-3 bg-[#424996]" />Custodial Settings</span>
            <span className="inline-flex items-center gap-2"><i className="size-3 bg-[#9DA8D0]" />Community Corrections</span>
          </div>
        </div>
      </div>
      <p id="correctional-profile-footnote-18" className="mt-7 text-[11px] leading-5 text-[#598303]"><strong>Footnote 18</strong> Data for the Community Corrections workforce – female and part time employment is from Jobs and Skills Australia Occupation profile 2025 based on ANZSCO classification 411714 Parole and Probation Officers. First Nations and workforce living outside capital cities data is from ABS Table Builder using ABS 2021 Census dataset on ANZSCO classification 411714 Parole and Probation Officers. A Community Corrections Officer (411631) occupation has been created under the new OSCA classification; however, data is not yet available.</p>
      <p className="mt-3 text-[10px] leading-4 text-[#667085]">Source: Jobs and Skills Australia, Atlas Pro Overview – Correctional Services, 2025; Jobs and Skills Australia, Occupation and Industry Profiles – Occupations, 2025; Australian Bureau of Statistics.</p>
    </>
  );

  if (active === 3) return (
    <>
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="space-y-1">
            {[2024, 2023, 2022, 2021, 2020, 2019].map((year, yearIndex) => (
              <div key={year} className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-2 border-b border-[#D9DCE2] py-2 last:border-b-0">
                <strong className="text-xs font-semibold tabular-nums text-[#252D02]">{year}</strong>
                <div className="relative mr-12 space-y-1.5">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex justify-between">
                    {[0, 1000, 2000, 3000, 4000, 5000, 6000].map((tick) => <span key={tick} className="h-full border-l border-[#EAECF0] first:border-[#C8CCD4]" />)}
                  </div>
                  {enrolments.map(({ qualification, color, values }, seriesIndex) => {
                    const value = values[5 - yearIndex];
                    const width = `${(value / 6000) * 100}%`;
                    return (
                      <div key={qualification} className="relative h-3.5" title={`${year} ${qualification}: ${value.toLocaleString()} enrolments`}>
                        <div className="relative h-full rounded-r-[2px] transition-[width,filter] duration-700 ease-out hover:brightness-110 motion-reduce:transition-none" style={{ width: visible ? width : "0%", backgroundColor: color, transitionDelay: `${yearIndex * 75 + seriesIndex * 35}ms` }} />
                        <span className="absolute top-1/2 -translate-y-1/2 pl-1.5 text-[10px] font-medium tabular-nums text-[#535862] transition-opacity duration-300 motion-reduce:transition-none" style={{ left: width, opacity: visible ? 1 : 0, transitionDelay: `${yearIndex * 75 + seriesIndex * 35 + 260}ms` }}>{value.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="ml-[52px] mr-12 flex justify-between border-t border-[#BFC4CD] pt-2 text-[10px] font-semibold tabular-nums text-[#252D02]">
            {[0, 1000, 2000, 3000, 4000, 5000, 6000].map((tick) => <span key={tick}>{tick.toLocaleString()}</span>)}
          </div>
          <div className="mt-5 grid gap-x-6 gap-y-2 text-[10px] leading-4 text-[#667085] sm:grid-cols-2">
            {enrolments.map(({ qualification, color }) => <span key={qualification} className="inline-flex items-start gap-2"><i className="mt-0.5 size-3 shrink-0" style={{ backgroundColor: color }} />{qualification}</span>)}
            <span className="inline-flex items-start gap-2"><i className="mt-0.5 size-3 shrink-0 bg-[#D5D7D6]" />CSC20115 – Cert. II in Justice Services</span>
          </div>
        </div>
      </div>
      <p className="mt-5 text-[10px] leading-4 text-[#667085]">Source: NCVER 2025, Total VET students and courses 2024: program enrolments; Total, Training Package, CSC Correctional Services, Program Name [data set]. CSC20115 Certificate II in Justice Services has no labelled value in the approved print chart and is not plotted.</p>
    </>
  );

  if (active === 4) return (
    <>
      <p className="mt-4 text-[11px] text-[#667085]">Y-axis: imprisonment rate (per 100,000 adult population), 2024–2025</p>
      <div className="mt-5 w-full overflow-x-auto">
        <svg viewBox="0 0 900 470" className="min-w-[620px] w-full" role="img" aria-label="Average daily imprisonment rate in Australia from March 2024 to December 2025">
          <text x="18" y="227" transform="rotate(-90 18 227)" textAnchor="middle" fill="#252D02" fontSize="12">Imprisonment rate (per 100,000 adult population)</text>
          {Array.from({ length: 11 }, (_, index) => 220 - index * 2).map((tick) => {
            const y = 38 + ((220 - tick) / 20) * 350;
            return <g key={tick}><line x1="84" x2="876" y1={y} y2={y} stroke="#E5E7EB" strokeWidth="1" /><text x="70" y={y + 4} textAnchor="end" fill="#252D02" fontSize="14">{tick}</text></g>;
          })}
          <path d={imprisonmentRates.map(({ value }, index) => `${index === 0 ? "M" : "L"} ${105 + index * 106} ${38 + ((220 - value) / 20) * 350}`).join(" ")} fill="none" stroke="#424996" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" pathLength="1" className="transition-[stroke-dashoffset] duration-1000 ease-out motion-reduce:transition-none" style={{ strokeDasharray: 1, strokeDashoffset: visible ? 0 : 1 }} />
          {imprisonmentRates.map(({ label, value }, index) => {
            const x = 105 + index * 106;
            const y = 38 + ((220 - value) / 20) * 350;
            const below = index === 0 || index === 3;
            return <g key={label} className="transition-opacity duration-500 motion-reduce:transition-none" style={{ opacity: visible ? 1 : 0, transitionDelay: `${index * 85 + 320}ms` }}>
              <circle cx={x} cy={y} r="9" fill="transparent"><title>{label}: {value.toFixed(1)} per 100,000 adults</title></circle>
              <text x={x} y={y + (below ? 22 : -12)} textAnchor="middle" fill="#252D02" fontSize="15" fontWeight="500">{value.toFixed(1)}</text>
              <text x={x} y="422" textAnchor="middle" fill="#252D02" fontSize="13">{label}</text>
            </g>;
          })}
        </svg>
      </div>
      <p className="mt-5 max-w-[540px] text-[11px] leading-5 text-[#68723E]">Source: Australian Bureau of Statistics, Corrective Services Australia – December quarter 2025, Table 3.</p>
    </>
  );

  if (active === 5) return (
    <>
      <p className="mt-2 text-[11px] text-[#667085]">Y-axis: Percentage, 0–100% · 2022–23 to 2024–25</p>
      <div className="relative mt-5 overflow-x-auto">
        <svg viewBox="0 0 900 490" className="min-w-[620px] w-full" role="img" aria-label="Prison capacity utilisation chart awaiting the approved source values for 2022–23, 2023–24 and 2024–25">
          <text x="20" y="240" transform="rotate(-90 20 240)" textAnchor="middle" fill="#252D02" fontSize="13">Percentage</text>
          {Array.from({ length: 11 }, (_, index) => 100 - index * 10).map((tick) => {
            const y = 42 + ((100 - tick) / 100) * 390;
            return <g key={tick}><line x1="82" x2="882" y1={y} y2={y} stroke="#E5E7EB" strokeWidth="1" /><text x="72" y={y + 5} textAnchor="end" fill="#252D02" fontSize="15">{tick}%</text></g>;
          })}
          {capacityJurisdictions.map((code, index) => <text key={code} x={130 + index * 100} y="463" textAnchor="middle" fill="#252D02" fontSize="14">{code}</text>)}
        </svg>
        <p className="absolute left-1/2 top-[46%] w-[min(80%,360px)] -translate-x-1/2 -translate-y-1/2 bg-white/95 px-5 py-4 text-center text-xs leading-5 text-[#535862]">
          Approved source values are needed to plot these bars. The printed report does not label the individual values.
        </p>
      </div>
      <div className="mt-1 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#535862]">
        {capacitySeries.map(({ year, color }) => <span key={year} className="inline-flex items-center gap-2"><i className="size-3" style={{ backgroundColor: color }} />{year}</span>)}
      </div>
      <p className="mt-3 max-w-[580px] text-[11px] leading-5 text-[#68723E]">Source: Productivity Commission 2026, Report on Government Services, Justice Part C – 8 Corrective Services, Table 8A.15.</p>
    </>
  );

  if (active === 6) return (
    <>
      <p className="mt-2 text-[11px] text-[#667085]">Y-axis: Imprisonment rate (per 100,000 adult population) · five quarters</p>
      <div className="relative mt-5 overflow-x-auto">
        <svg viewBox="0 0 900 490" className="min-w-[620px] w-full" role="img" aria-label="State and territory imprisonment rate chart awaiting approved source values from December 2024 to December 2025">
          <text x="20" y="235" transform="rotate(-90 20 235)" textAnchor="middle" fill="#252D02" fontSize="12">Imprisonment rate (per 100,000 adult population)</text>
          {Array.from({ length: 8 }, (_, index) => 1400 - index * 200).map((tick) => {
            const y = 42 + ((1400 - tick) / 1400) * 390;
            return <g key={tick}><line x1="82" x2="882" y1={y} y2={y} stroke="#E5E7EB" strokeWidth="1" /><text x="72" y={y + 5} textAnchor="end" fill="#252D02" fontSize="15">{tick.toLocaleString()}</text></g>;
          })}
          {stateRateJurisdictions.map((code, index) => <text key={code} x={130 + index * 100} y="463" textAnchor="middle" fill="#252D02" fontSize="14">{code}</text>)}
        </svg>
        <p className="absolute left-1/2 top-[46%] w-[min(80%,360px)] -translate-x-1/2 -translate-y-1/2 bg-white/95 px-5 py-4 text-center text-xs leading-5 text-[#535862]">
          Approved source values are needed to plot these bars. The printed report does not label the individual values.
        </p>
      </div>
      <div className="mt-1 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#535862]">
        {stateRateSeries.map(({ quarter, color }) => <span key={quarter} className="inline-flex items-center gap-2"><i className="size-3" style={{ backgroundColor: color }} />{quarter}</span>)}
      </div>
      <p className="mt-3 max-w-[580px] text-[11px] leading-5 text-[#68723E]">Source: Australian Bureau of Statistics, Corrective Services, Australia – December quarter 2025, Table 3.</p>
    </>
  );

  return (
    <ExpenditureMap visible={visible} />
  );
}

export default function CorrectionalServicesIndustryProfilePresentationView({ slug, report }: { slug: string; report: Report }) {
  const [active, setActive] = React.useState(0);
  const chartRef = React.useRef<HTMLDivElement>(null);

  const selectChart = (index: number) => {
    setActive(index);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => chartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="industry_profile" />
      <main className="mx-auto w-full max-w-[1504px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons slug={slug} currentPage="industry_profile" prev={{ label: "Industry-Sector Overview", href: `/reports/${slug}/industry_overview` }} next={{ label: "Workforce Insights", href: `/reports/${slug}/workforce_insights` }} prevPrefix="Previous Section:" />
        <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
          <span className="inline-flex rounded-full bg-[#424996] px-3 py-1 text-[10px] font-bold text-white">Correctional Services · Industry Overview</span>
          <h1 className="mt-4 text-[32px] font-bold leading-tight text-[#252D02] sm:text-[40px]">Industry Profile</h1>
          <p className="mt-2 text-sm text-[#535862]">Select a chart to open it in a large presentation view.</p>
        </section>
        <section className="grid items-start gap-6 lg:grid-cols-[400px_minmax(0,1fr)]" aria-label="Industry Profile charts">
          <div className="space-y-2" role="tablist" aria-label="Industry Profile charts">
            {chartTitles.map((title, index) => (
              <button key={title} id={`profile-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls="profile-chart" onClick={() => selectChart(index)} className={`grid min-h-[122px] w-full grid-cols-[1fr_38px] items-center gap-4 rounded-lg border px-5 py-4 text-left transition-[border-color,background-color,box-shadow] duration-200 ${active === index ? "border-[#424996] bg-[#F0F1F9] shadow-sm" : "border-[#E9EAEB] bg-white hover:border-[#9DA8D0] hover:bg-[#F8F8FC]"}`}>
                <span><small className="mb-3 block text-[10px] font-semibold uppercase text-[#424996]">{String(index + 1).padStart(2, "0")} · CS · Presentation View</small><strong className="block text-sm leading-5 text-[#252D02]">{title}</strong>{index === 7 && <strong className="mt-2 block text-sm">$6.38 billion</strong>}</span>
                <span className={`grid size-9 place-items-center rounded-full ${active === index ? "border border-[#D5D7DA] bg-white" : "bg-[#8AC900]"}`}><ArrowRight size={16} aria-hidden="true" /></span>
              </button>
            ))}
          </div>
          <div ref={chartRef} id="profile-chart" role="tabpanel" aria-labelledby={`profile-tab-${active}`} className={`min-w-0 scroll-mt-20 rounded-lg border border-[#E9EAEB] px-5 py-6 sm:px-7 ${active === 1 ? "bg-[#E9ECEE]" : "bg-white"}`}>
            <div className={active === 2 ? "rounded-lg border border-[#E9EAEB] bg-white p-5 sm:p-6" : undefined}>
              <h2 className="text-lg font-semibold leading-7 text-[#252D02]">{chartTitles[active]}{active === 2 && <sup><a href="#correctional-profile-footnote-18" aria-label="Footnote 18" className="ml-0.5 text-xs text-[#424996] hover:underline">18</a></sup>}</h2>
              <ChartContent key={active} active={active} />
            </div>
          </div>
        </section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
