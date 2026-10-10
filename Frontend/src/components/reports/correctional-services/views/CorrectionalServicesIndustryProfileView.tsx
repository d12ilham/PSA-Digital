"use client";

import React from "react";
import { BarChart3, ChevronRight } from "lucide-react";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type CorrectionalServicesReport = {
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: {
    label: string;
  };
  industry?: {
    slug?: string;
    name?: string;
  };
};

type ChartTab = {
  id: string;
  number: string;
  title: string;
  axis?: string;
  source: string;
  note?: string;
};

const charts: ChartTab[] = [
  {
    id: "age",
    number: "CHART 1 OF 8",
    title: "Corrections Prisons Officers Workforce by Age",
    axis: "Y axis: Percentage of Total Workforce, 0-30%",
    source: "Jobs and Skills Australia 2025, Occupation - Demographic data (table)",
  },
  {
    id: "facilities",
    number: "CHART 2 OF 8",
    title: "Correctional Custodial Facilities, Number (at 30 June 2025)",
    source: "Australian Government, State of the Service Report 2024-25, Table 13",
  },
  {
    id: "characteristics",
    number: "CHART 3 OF 8",
    title: "Workforce Characteristics - Custodial Settings and Community Corrections",
    axis: "Y axis: Percentage of Total Workforce, 0-80%",
    source: "Jobs and Skills Australia 2025, Occupation - Demographic data (table)",
    note: "Footnote 18: Data for the Community Corrections workforce - female and part time employment is from Jobs and Skills Australia Occupation profile 2025.",
  },
  {
    id: "training",
    number: "CHART 4 OF 8",
    title: "Correctional Services Training Package Enrolments",
    axis: "X axis: 0-6,000, rows by year",
    source: "NCVER Total VET students and courses, 2025 release",
  },
  {
    id: "imprisonment-australia",
    number: "CHART 5 OF 8",
    title: "Average Daily Imprisonment Rate (per 100,000 adult population) Australia",
    axis: "Y axis: Imprisonment Rate (per 100,000 adult population), 200-220",
    source: "Australian Bureau of Statistics, Corrective Services Australia - December quarter 2025, Table 3",
  },
  {
    id: "capacity",
    number: "CHART 6 OF 8",
    title: "Prison Capacity Utilisation by State and Territory",
    axis: "Y axis: Percentage, 65-100% - grouped columns per jurisdiction, three financial years",
    source: "Productivity Commission 2025, Report on Government Services, Justice Part C - Corrective Services, Table 8A.5",
  },
  {
    id: "imprisonment-state",
    number: "CHART 7 OF 8",
    title: "Average Daily Imprisonment Rate (per 100,000 adult population) - State and Territory",
    axis: "Y axis: Imprisonment Rate (per 100,000 adult population), 0-1,400 - grouped columns per jurisdiction, five quarters",
    source: "Australian Bureau of Statistics, Corrective Services Australia - December quarter 2025, Table 3",
  },
  {
    id: "expenditure",
    number: "CHART 8 OF 8",
    title: "Real Net Prisons and Community Corrections Operating Expenditure 2024-25FY",
    source: "Productivity Commission 2026 Report on Government Services, Justice Part C - 8 Corrective Services, Table 8A.2",
  },
];

const ageData = [
  ["15-19", 4],
  ["20-24", 12],
  ["25-34", 26],
  ["35-44", 28],
  ["45-54", 21],
  ["55-59", 14],
  ["60-64", 7],
  ["65+", 3],
] as const;

const facilityData = [
  ["ACT", 1],
  ["NSW", 35],
  ["NT", 6],
  ["QLD", 14],
  ["SA", 9],
  ["TAS", 4],
  ["VIC", 14],
  ["WA", 16],
] as const;

const characteristicData = [
  ["Outside capital cities", 56, 34],
  ["Part-time employment", 12, 24],
  ["First Nations", 4, 6],
  ["Female", 31, 71],
] as const;

const trainingData = [
  ["2021", 82, 48, 18],
  ["2022", 88, 54, 24],
  ["2023", 74, 50, 20],
  ["2024", 92, 58, 28],
  ["2025", 86, 52, 31],
] as const;

const imprisonmentAusData = [
  ["Dec 2022", 205],
  ["Jun 2023", 208],
  ["Dec 2023", 211],
  ["Jun 2024", 214],
  ["Dec 2024", 216],
  ["Jun 2025", 217],
  ["Dec 2025", 218],
] as const;

const stateShort = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

const capacityData = [
  [76, 79, 82],
  [91, 92, 94],
  [78, 80, 81],
  [88, 89, 91],
  [83, 84, 86],
  [71, 73, 76],
  [86, 88, 89],
  [93, 94, 96],
] as const;

const stateRateData = [
  [93, 96, 99],
  [61, 63, 65],
  [100, 98, 96],
  [72, 74, 77],
  [69, 70, 72],
  [49, 51, 53],
  [54, 56, 58],
  [91, 93, 94],
] as const;

const expenditureData = [
  ["AUSTRALIA", "$6.38 billion", 100],
  ["NSW", "$1.83 billion", 72],
  ["QLD", "$1.37 billion", 55],
  ["WA", "$982 million", 42],
  ["SA", "$360 million", 24],
  ["NT", "$254 million", 19],
  ["ACT", "$145 million", 14],
] as const;

function MiniBarChart({
  data,
  loaded,
}: {
  data: readonly (readonly [string, number])[];
  loaded: boolean;
}) {
  const max = Math.max(...data.map(([, value]) => value));

  return (
    <div className="relative h-72 rounded-xl border border-[#D5D7DA] bg-[#FBFCFD] p-5">
      <div className="absolute left-5 right-5 top-5 flex justify-between text-[10px] font-bold text-[#A4A7AE]">
        <span>30</span>
        <span>20</span>
        <span>10</span>
        <span>0</span>
      </div>
      <div className="flex h-full items-end justify-between gap-3 pt-8">
        {data.map(([label, value], index) => (
          <div key={label} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
            <div className="flex h-full w-full items-end justify-center">
              <div
                style={{
                  height: loaded ? `${(value / max) * 92}%` : "0%",
                  transitionDelay: `${index * 70}ms`,
                }}
                className="w-full max-w-12 rounded-t-lg bg-[#0B6DA8] transition-all duration-1000 ease-out group-hover:bg-[#38BDF8]"
              />
            </div>
            <span className="text-center text-[10px] font-bold leading-tight text-[#535862]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HorizontalBars({
  data,
  loaded,
}: {
  data: readonly (readonly [string, number])[];
  loaded: boolean;
}) {
  const max = Math.max(...data.map(([, value]) => value));

  return (
    <div className="space-y-3 rounded-xl border border-[#D5D7DA] bg-[#FBFCFD] p-5">
      {data.map(([label, value], index) => (
        <div key={label} className="grid grid-cols-[58px_1fr_38px] items-center gap-3">
          <span className="text-xs font-bold text-[#535862]">{label}</span>
          <div className="h-5 rounded-full bg-[#E8F7FE]">
            <div
              style={{
                width: loaded ? `${(value / max) * 100}%` : "0%",
                transitionDelay: `${index * 80}ms`,
              }}
              className="h-full rounded-full bg-[#0B6DA8] transition-all duration-1000 ease-out hover:bg-[#38BDF8]"
            />
          </div>
          <span className="text-right text-xs font-bold text-[#063B5D]">{value}</span>
        </div>
      ))}
    </div>
  );
}

function GroupedBars({ loaded }: { loaded: boolean }) {
  return (
    <div className="rounded-xl border border-[#D5D7DA] bg-[#FBFCFD] p-5">
      <div className="mb-4 flex flex-wrap gap-4 text-xs font-bold text-[#535862]">
        <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-[#0B6DA8]" />Custodial Settings</span>
        <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-[#38BDF8]" />Community Corrections</span>
      </div>
      <div className="space-y-4">
        {characteristicData.map(([label, custodial, community], index) => (
          <div key={label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#252D02]">{label}</span>
              <span className="font-semibold text-[#535862]">{custodial}% / {community}%</span>
            </div>
            <div className="grid gap-1.5">
              <div className="h-3 rounded-full bg-[#E8F7FE]">
                <div
                  style={{ width: loaded ? `${custodial}%` : "0%", transitionDelay: `${index * 100}ms` }}
                  className="h-full rounded-full bg-[#0B6DA8] transition-all duration-1000"
                />
              </div>
              <div className="h-3 rounded-full bg-[#E8F7FE]">
                <div
                  style={{ width: loaded ? `${community}%` : "0%", transitionDelay: `${index * 100 + 80}ms` }}
                  className="h-full rounded-full bg-[#38BDF8] transition-all duration-1000"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackedTraining({ loaded }: { loaded: boolean }) {
  return (
    <div className="rounded-xl border border-[#D5D7DA] bg-[#FBFCFD] p-5">
      <div className="mb-5 flex flex-wrap gap-4 text-[11px] font-bold text-[#535862]">
        <span className="flex items-center gap-2"><i className="h-3 w-3 bg-[#0B6DA8]" />CSC50320 - Advanced Dip.</span>
        <span className="flex items-center gap-2"><i className="h-3 w-3 bg-[#38BDF8]" />CSC50122 - Dip.</span>
        <span className="flex items-center gap-2"><i className="h-3 w-3 bg-[#BEEBFB]" />CSC40122 - Cert. IV</span>
      </div>
      <div className="space-y-3">
        {trainingData.map(([year, cert, dip, adv], index) => (
          <div key={year} className="grid grid-cols-[52px_1fr] items-center gap-3">
            <span className="text-xs font-bold text-[#535862]">{year}</span>
            <div className="flex h-6 overflow-hidden rounded-full bg-[#E8F7FE]">
              {[cert, dip, adv].map((value, itemIndex) => (
                <div
                  key={`${year}-${itemIndex}`}
                  style={{
                    width: loaded ? `${value / 2}%` : "0%",
                    transitionDelay: `${index * 90 + itemIndex * 80}ms`,
                  }}
                  className={`h-full transition-all duration-1000 ${itemIndex === 0 ? "bg-[#0B6DA8]" : itemIndex === 1 ? "bg-[#38BDF8]" : "bg-[#BEEBFB]"}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineLikeBars({ loaded }: { loaded: boolean }) {
  return (
    <div className="rounded-xl border border-[#D5D7DA] bg-[#FBFCFD] p-5">
      <div className="mb-3 flex justify-between text-[10px] font-bold text-[#A4A7AE]">
        <span>220</span><span>215</span><span>210</span><span>205</span><span>200</span>
      </div>
      <div className="flex h-64 items-end justify-between gap-3">
        {imprisonmentAusData.map(([label, value], index) => (
          <div key={label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <div
              style={{
                height: loaded ? `${((value - 198) / 22) * 100}%` : "0%",
                transitionDelay: `${index * 80}ms`,
              }}
              className="w-full max-w-10 rounded-t-full bg-[#0B6DA8] transition-all duration-1000 hover:bg-[#38BDF8]"
            />
            <span className="text-center text-[10px] font-bold leading-tight text-[#535862]">{label.replace(" ", "\n")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TripleGroupedBars({
  data,
  loaded,
}: {
  data: readonly (readonly [number, number, number])[];
  loaded: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#D5D7DA] bg-[#FBFCFD] p-5">
      <div className="mb-4 flex flex-wrap gap-4 text-[11px] font-bold text-[#535862]">
        <span className="flex items-center gap-2"><i className="h-3 w-3 bg-[#0B6DA8]" />2022-23</span>
        <span className="flex items-center gap-2"><i className="h-3 w-3 bg-[#38BDF8]" />2023-24</span>
        <span className="flex items-center gap-2"><i className="h-3 w-3 bg-[#BEEBFB]" />2024-25</span>
      </div>
      <div className="flex h-64 items-end justify-between gap-3">
        {data.map((values, index) => (
          <div key={stateShort[index]} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <div className="flex h-full w-full items-end justify-center gap-1">
              {values.map((value, valueIndex) => (
                <div
                  key={valueIndex}
                  style={{ height: loaded ? `${value}%` : "0%", transitionDelay: `${index * 70 + valueIndex * 80}ms` }}
                  className={`w-2.5 rounded-t-sm transition-all duration-1000 ${valueIndex === 0 ? "bg-[#0B6DA8]" : valueIndex === 1 ? "bg-[#38BDF8]" : "bg-[#BEEBFB]"}`}
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-[#535862]">{stateShort[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExpenditureChart({ loaded }: { loaded: boolean }) {
  return (
    <div className="grid gap-3 rounded-xl border border-[#D5D7DA] bg-[#FBFCFD] p-5 md:grid-cols-2">
      {expenditureData.map(([label, value, width], index) => (
        <div key={label} className="rounded-xl border border-[#BEEBFB] bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-[#535862]">{label}</span>
            <strong className="text-sm font-bold text-[#063B5D]">{value}</strong>
          </div>
          <div className="h-3 rounded-full bg-[#E8F7FE]">
            <div
              style={{ width: loaded ? `${width}%` : "0%", transitionDelay: `${index * 90}ms` }}
              className="h-full rounded-full bg-[#0B6DA8] transition-all duration-1000 hover:bg-[#38BDF8]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ChartPreview({ chartId, loaded }: { chartId: string; loaded: boolean }) {
  if (chartId === "age") return <MiniBarChart data={ageData} loaded={loaded} />;
  if (chartId === "facilities") return <HorizontalBars data={facilityData} loaded={loaded} />;
  if (chartId === "characteristics") return <GroupedBars loaded={loaded} />;
  if (chartId === "training") return <StackedTraining loaded={loaded} />;
  if (chartId === "imprisonment-australia") return <LineLikeBars loaded={loaded} />;
  if (chartId === "capacity") return <TripleGroupedBars data={capacityData} loaded={loaded} />;
  if (chartId === "imprisonment-state") return <TripleGroupedBars data={stateRateData} loaded={loaded} />;
  return <ExpenditureChart loaded={loaded} />;
}

export default function CorrectionalServicesIndustryProfileView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const [activeChartId, setActiveChartId] = React.useState("age");
  const [loaded, setLoaded] = React.useState(false);
  const activeChart = charts.find((chart) => chart.id === activeChartId) ?? charts[0];

  React.useEffect(() => {
    setLoaded(false);
    const timer = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(timer);
  }, [activeChartId]);

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#38BDF8]/30 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="industry_profile" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        <ReportNavButtons slug={slug} currentPage="industry_profile" />

        <section className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-4">
            <p className="animate-slide-up text-xs font-semibold uppercase leading-6 text-[#0B6DA8]">
              Correctional Services - Industry Overview
            </p>
            <h1 className="animate-slide-up text-3xl sm:text-4xl font-bold text-[#063B5D]">
              Industry Profile
            </h1>
            <p className="animate-slide-up-delay max-w-3xl text-sm leading-relaxed text-[#535862]">
              Select a chart to open it in a large presentation view. The profile brings together
              workforce age, custodial facilities, workforce characteristics, training enrolments,
              imprisonment rates, capacity utilisation and expenditure.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="animate-hero-pulse-settle flex h-36 w-36 items-center justify-center rounded-full bg-[#E8F7FE]">
              <BarChart3 className="h-20 w-20 text-[#0B6DA8]" strokeWidth={1.6} />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[
            {
              label: "DATA STORY 1",
              title: "Workforce Growth vs. Demand",
              body: "Employment projections and custodial/community corrections demand indicate pressure on workforce supply, particularly for Correctional Officers.",
              meta: "Employment projected growth, persons in custody and community corrections orders.",
            },
            {
              label: "DATA STORY 2",
              title: "Demand for Community Corrections",
              body: "Community corrections offender-to-staff ratios vary by jurisdiction and remain a core demand signal for future service planning.",
              meta: "Offender-to-staff ratio, Australia and jurisdiction views.",
            },
          ].map((story, index) => (
            <article
              key={story.title}
              style={{ animationDelay: `${index * 0.12}s` }}
              className="animate-card-entrance rounded-2xl border border-[#E9EAEB] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase text-[#0B6DA8]">{story.label}</p>
              <h2 className="mt-2 text-xl font-bold text-[#252D02]">{story.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#535862]">{story.body}</p>
              <p className="mt-4 rounded-lg bg-[#E8F7FE] px-4 py-3 text-xs font-semibold leading-5 text-[#075D87]">
                {story.meta}
              </p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-[#E9EAEB] bg-white p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {charts.map((chart, index) => {
              const isActive = chart.id === activeChartId;
              return (
                <button
                  key={chart.id}
                  type="button"
                  onClick={() => setActiveChartId(chart.id)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  className={`animate-card-entrance flex min-h-[150px] flex-col justify-between rounded-xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-2 border-[#0B6DA8] bg-[#E8F7FE] shadow-sm"
                      : "border-[#E9EAEB] bg-white hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wide text-[#0B6DA8]">
                    {chart.number}
                  </span>
                  <span className="text-sm font-bold leading-snug text-[#252D02]">
                    {chart.title}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase text-[#0B6DA8]">
                    {isActive ? "Open" : "Open"} <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border-2 border-[#0B6DA8] bg-white p-5 sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase text-[#0B6DA8]">{activeChart.number}</p>
              <h2 className="max-w-4xl text-2xl font-bold text-[#063B5D]">{activeChart.title}</h2>
              {activeChart.axis && (
                <p className="text-xs font-semibold leading-5 text-[#535862]">{activeChart.axis}</p>
              )}
            </div>
            <span className="w-fit rounded-full bg-[#E8F7FE] px-4 py-2 text-xs font-bold uppercase text-[#0B6DA8]">
              Large presentation view
            </span>
          </div>

          <div className="animate-content-switch">
            <ChartPreview chartId={activeChart.id} loaded={loaded} />
          </div>

          {activeChart.note && (
            <p className="mt-4 rounded-lg bg-[#E8F7FE] px-4 py-3 text-xs leading-5 text-[#075D87]">
              {activeChart.note}
            </p>
          )}
          <p className="mt-4 text-xs leading-5 text-[#535862]">
            <strong className="text-[#252D02]">Source: </strong>
            {activeChart.source}
          </p>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
