"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import { ArrowRight, Download } from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";

interface Report {
  id: string;
  title: string;
  slug: string;
  status: string;
  pdfFileUrl?: string;
  psaSectorPageUrl?: string;
  contactUrl?: string;
  year?: {
    label: string;
  };
}

interface ChartSeries {
  name: string;
  values: number[];
  color: string;
  colors?: string[];
}

function ReportBarChart({
  years,
  series,
  min,
  max,
  loaded,
  activeIndex,
  onActiveIndexChange,
}: {
  years: string[];
  series: ChartSeries[];
  min: number;
  max: number;
  loaded: boolean;
  activeIndex: number | null;
  onActiveIndexChange: (index: number | null) => void;
}) {
  const left = 16;
  const right = 604;
  const top = 42;
  const bottom = 210;
  const groupWidth = (right - left) / years.length;
  const barGap = series.length > 1 ? 7 : 0;
  const barWidth = (groupWidth - 14 - barGap * (series.length - 1)) / series.length;
  const selectedBar = activeIndex === null ? null : {
    yearIndex: Math.floor(activeIndex / series.length),
    seriesIndex: activeIndex % series.length,
  };
  const barHeight = (value: number) => Math.max(4, ((value - min) / (max - min)) * (bottom - top));
  const barX = (yearIndex: number, seriesIndex: number) =>
    left + yearIndex * groupWidth + 7 + seriesIndex * (barWidth + barGap);

  return (
    <div className="overflow-x-auto" onMouseLeave={() => onActiveIndexChange(series.length === 1 ? years.length - 1 : null)}>
      <svg viewBox="0 0 620 255" className="w-full min-w-[520px] h-auto" role="img" aria-label={`${series.map((item) => item.name).join(" and ")} by year`}>
        {years.map((year, index) => (
          <text key={year} x={left + index * groupWidth + groupWidth / 2} y="239" textAnchor="middle" className="fill-gray800 text-[11px]">
            {year}
          </text>
        ))}
        {years.flatMap((year, yearIndex) => series.map((item, seriesIndex) => {
          const value = item.values[yearIndex];
          const height = barHeight(value);
          const x = barX(yearIndex, seriesIndex);
          return (
            <rect
              key={`${item.name}-${year}`}
              x={x} y={bottom - height} width={barWidth} height={height}
              rx="7" fill={item.colors?.[yearIndex] ?? item.color}
              className="outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active"
              tabIndex={0}
              aria-label={`${year}: ${item.name} ${value.toLocaleString("en-AU")}`}
              onMouseEnter={() => onActiveIndexChange(yearIndex * series.length + seriesIndex)}
              onFocus={() => onActiveIndexChange(yearIndex * series.length + seriesIndex)}
              onBlur={() => onActiveIndexChange(null)}
              style={{ transform: loaded ? "scaleY(1)" : "scaleY(0)", transformOrigin: "center bottom", transformBox: "fill-box", transition: `transform 750ms ease-out ${yearIndex * 90}ms`, cursor: "pointer" }}
            />
          );
        }))}
        {loaded && selectedBar && (() => {
          const { yearIndex, seriesIndex } = selectedBar;
          const value = series[seriesIndex].values[yearIndex];
          const centerX = barX(yearIndex, seriesIndex) + barWidth / 2;
          const label = `${years[yearIndex]} · ${value.toLocaleString("en-AU")}`;
          const tooltipWidth = series.length > 1 ? 124 : 152;
          const tooltipX = Math.min(620 - tooltipWidth - 4, Math.max(4, centerX - tooltipWidth / 2));
          const tooltipY = Math.max(2, bottom - barHeight(value) - 41);
          return <g pointerEvents="none">
            <rect x={tooltipX} y={tooltipY} width={tooltipWidth} height="32" rx="6" fill="#252D02" />
            <path d={`M${centerX - 6} ${tooltipY + 32} L${centerX + 6} ${tooltipY + 32} L${centerX} ${tooltipY + 39} Z`} fill="#252D02" />
            <text x={tooltipX + tooltipWidth / 2} y={tooltipY + 21} textAnchor="middle" fill="white" fontSize="12" fontWeight="600">{label}</text>
          </g>;
        })()}
      </svg>
    </div>
  );
}

export default function IndustryProfileView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();
  const [activeGrowthBar, setActiveGrowthBar] = useState<number | null>(4);
  const [activeTrainingBar, setActiveTrainingBar] = useState<number | null>(null);
  const [chartsLoaded, setChartsLoaded] = useState(false);
  const [isHeroMounted, setIsHeroMounted] = useState(false);
  const chartsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsHeroMounted(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setChartsLoaded(true);
          }
        });
      },
      { threshold: 0.15 },
    );

    if (chartsRef.current) {
      observer.observe(chartsRef.current);
    }

    const timer = setTimeout(() => setChartsLoaded(true), 200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const growthData = [
    { year: "2020–2021", value: 190800 },
    { year: "2021–2022", value: 192500 },
    { year: "2022–2023", value: 208200 },
    { year: "2023–2024", value: 213500 },
    { year: "2024–2025", value: 218000 },
  ];

  const trainingData = [
    { year: "2019", enrol: 945, comp: 285 },
    { year: "2020", enrol: 735, comp: 300 },
    { year: "2021", enrol: 555, comp: 220 },
    { year: "2022", enrol: 365, comp: 155 },
    { year: "2023", enrol: 470, comp: 90 },
    { year: "2024", enrol: 600, comp: 135 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="industry_profile"
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-5 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <ReportNavButtons slug={slug} currentPage="industry_profile" />

        {/* Hero Card */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-lg-dark animate-slide-up">
              Industry Profile
            </h1>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal animate-slide-up-delay">
              Key industry data from the 2026 Report: employment growth, asset
              management and Local Government Training Package activity. For
              sector-wide figures, see the Industry-Sector Overview; for
              state-level data, see the State and Territory Workforce Profile.
            </p>
          </div>

          {/* Right Icon Illustration */}
          <div className="lg:col-span-4 flex items-center justify-center lg:justify-end p-2">
            <img
              src="/images/reports/industry-profile/hero.png"
              alt="Industry Profile Illustration"
              className={`h-auto max-h-36 object-contain select-none pointer-events-none ${
                isHeroMounted ? "animate-hero-pulse-settle" : "opacity-0"
              }`}
            />
          </div>
        </div>

        {/* ── SECTION 2: TWO DATA CHARTS GRID ── */}
        <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Employment Growth */}
          <div
            style={{ animationDelay: "0.15s" }}
            className="animate-card-entrance bg-white rounded-2xl border border-gray200 border-t-12 border-t-[#9CAA54] p-6 space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-xs text-active uppercase block">
                Source: ABS, <a href="https://www.abs.gov.au/statistics/labour/employment-and-unemployment/public-sector-employment-and-earnings/latest-release" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-lg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active">Public sector employment and earnings</a>, 2025, releases 2020–2025
              </span>
              <h3 className="font-bold text-lg text-gray800 mb-6">
                2020–2025 Employment Growth in Local Government
              </h3>

              <ReportBarChart
                years={growthData.map((item) => item.year)}
                series={[{ name: "Employees", values: growthData.map((item) => item.value), color: "#598303", colors: ["#B2DB79", "#B2DB79", "#8AC900", "#8AC900", "#598303"] }]}
                min={160000} max={218000}
                loaded={chartsLoaded}
                activeIndex={activeGrowthBar}
                onActiveIndexChange={setActiveGrowthBar}
              />
            </div>

            <p className="text-xs text-active leading-relaxed">
              Figure 1: 2020–2025 Employment Growth in Local Government.
            </p>
          </div>

          {/* Chart 2: Training Package Enrolments & Completions */}
          <div
            style={{ animationDelay: "0.30s" }}
            className="animate-card-entrance bg-white rounded-2xl border border-gray200 border-t-12 border-t-lg-dark p-6 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-xs text-active uppercase block">
                Source: NCVER, <a href="https://www.ncver.edu.au/research-and-statistics/data/databuilder" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-lg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active">Total VET students and courses 2024: DataBuilder</a> [dataset], 2024
              </span>
              <h3 className="font-bold text-lg text-gray800 mb-6">
                Local Government Training Package Enrolments and Completions
              </h3>

              <div className="flex items-center gap-5 text-xs font-semibold text-gray800 pt-1">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#9CAA54]" />Enrolments</span>
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#086B37]" />Completions</span>
              </div>
              <ReportBarChart
                years={trainingData.map((item) => item.year)}
                series={[
                  { name: "Enrolments", values: trainingData.map((item) => item.enrol), color: "#9CAA54" },
                  { name: "Completions", values: trainingData.map((item) => item.comp), color: "#086B37" },
                ]}
                min={0} max={1000}
                loaded={chartsLoaded}
                activeIndex={activeTrainingBar}
                onActiveIndexChange={setActiveTrainingBar}
              />
            </div>

            <p className="text-xs text-active leading-relaxed">
              Figure 2: Local Government Training Package Enrolments and Completions.
            </p>
          </div>
        </div>

        {/* ── SECTION 3: ASSET MANAGEMENT CONTAINER ── */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 space-y-6">
          <div className="space-y-2.5">
            <span className="text-xs text-active block">
              Source: ALGA, <a href="https://alga.com.au/wp-content/uploads/2025/04/ALGA-National-State-of-the-Assets-Report-2024-final.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-lg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active">2024 National State of the Assets Report</a>, 2024, pg. 5 &amp; 8
            </span>
            <h3 className="font-bold text-xl text-gray800">Asset Management</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              style={{ animationDelay: "0.15s" }}
              className="animate-card-entrance bg-white border border-gray200 rounded-xl p-5 flex items-center gap-4"
            >
              <img
                src="/images/reports/industry-profile/item-2.svg"
                alt="77%"
                className="w-14 h-14 shrink-0 object-contain"
              />
              <div className="space-y-2">
                <span className="text-2xl sm:text-3xl font-semibold text-lg-dark block leading-none">
                  <AnimatedCounter target={77} suffix="%" />
                </span>
                <p className="text-xs font-semibold text-gray600 leading-tight">
                  of the national road network by length
                </p>
              </div>
            </div>

            <div
              style={{ animationDelay: "0.27s" }}
              className="animate-card-entrance bg-white border border-gray200 rounded-xl p-5 flex items-center gap-4"
            >
              <img
                src="/images/reports/industry-profile/item-3.svg"
                alt="$643bn"
                className="w-14 h-14 shrink-0 object-contain"
              />
              <div className="space-y-2">
                <span className="text-2xl sm:text-3xl font-semibold text-lg-dark block leading-none">
                  <AnimatedCounter target={643} prefix="$" suffix="bn" />
                </span>
                <p className="text-xs font-semibold text-gray600 leading-tight">
                  estimated value of public assets managed
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-active leading-relaxed">
            Figure 3: Asset Management — roads, airports, facilities and other
            assets managed by local councils.
          </p>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
