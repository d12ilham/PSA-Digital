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
  labelBelow?: boolean;
}

function ReportLineChart({
  years,
  series,
  min,
  max,
  step,
  loaded,
  activeIndex,
  onActiveIndexChange,
}: {
  years: string[];
  series: ChartSeries[];
  min: number;
  max: number;
  step: number;
  loaded: boolean;
  activeIndex: number | null;
  onActiveIndexChange: (index: number | null) => void;
}) {
  const left = 100;
  const right = 580;
  const top = 30;
  const bottom = 220;
  const x = (index: number) => left + (index * (right - left)) / (years.length - 1);
  const y = (value: number) => bottom - ((value - min) / (max - min)) * (bottom - top);
  const ticks = Array.from({ length: (max - min) / step + 1 }, (_, index) => min + index * step);

  return (
    <div className="overflow-x-auto" onMouseLeave={() => onActiveIndexChange(null)}>
      <svg viewBox="0 0 620 260" className="w-full min-w-[520px] h-auto" role="img" aria-label={`${series.map((item) => item.name).join(" and ")} by year`}>
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={left} x2={right} y1={y(tick)} y2={y(tick)} stroke="#D3D8D0" strokeWidth="1" />
            <text x={left - 20} y={y(tick) + 4} textAnchor="end" className="fill-gray600 text-[11px]">
              {tick.toLocaleString("en-AU")}
            </text>
          </g>
        ))}
        {years.map((year, index) => (
          <text key={year} x={x(index)} y="245" textAnchor="middle" className="fill-gray600 text-[11px]">
            {year}
          </text>
        ))}
        {series.map((item) => (
          <g key={item.name}>
            <path
              d={item.values.map((value, index) => `${index === 0 ? "M" : "L"}${x(index)} ${y(value)}`).join(" ")}
              fill="none"
              stroke={item.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={loaded ? 0 : 1}
              className="transition-[stroke-dashoffset] duration-1000 ease-out"
            />
            {item.values.map((value, index) => (
              <g key={`${item.name}-${years[index]}`} onMouseEnter={() => onActiveIndexChange(index)}>
                <circle cx={x(index)} cy={y(value)} r="13" fill="transparent" />
                <circle
                  cx={x(index)} cy={y(value)} r={activeIndex === index ? 6.5 : 5}
                  fill="white" stroke={item.color} strokeWidth="3"
                  opacity={loaded ? 1 : 0}
                  className="transition-all duration-500"
                />
                <text
                  x={x(index)} y={y(value) + (item.labelBelow ? 20 : -12)}
                  textAnchor="middle" className="fill-gray800 text-[12px] font-semibold"
                  opacity={loaded ? 1 : 0}
                >
                  {value.toLocaleString("en-AU")}
                </text>
                <title>{`${years[index]}: ${item.name} ${value.toLocaleString("en-AU")}`}</title>
              </g>
            ))}
          </g>
        ))}
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
  const [activeGrowthBar, setActiveGrowthBar] = useState<number | null>(null);
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
                SOURCE: ABS, PUBLIC SECTOR EMPLOYMENT AND EARNINGS, RELEASES
                2020–2025
              </span>
              <h3 className="font-bold text-lg text-gray800 mb-6">
                2020–2025 Employment Growth in Local Government
              </h3>

              <ReportLineChart
                years={growthData.map((item) => item.year)}
                series={[{ name: "Employees", values: growthData.map((item) => item.value), color: "#086B37" }]}
                min={190000} max={220000} step={5000}
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
                SOURCE: NCVER, TOTAL VET STUDENTS AND COURSES 2024: DATABUILDER
                [DATASET], 2024
              </span>
              <h3 className="font-bold text-lg text-gray800 mb-6">
                Local Government Training Package — Enrolment and Completion
              </h3>

              <ReportLineChart
                years={trainingData.map((item) => item.year)}
                series={[
                  { name: "Enrolments", values: trainingData.map((item) => item.enrol), color: "#086B37" },
                  { name: "Completions", values: trainingData.map((item) => item.comp), color: "#A6C9A2", labelBelow: true },
                ]}
                min={0} max={1000} step={100}
                loaded={chartsLoaded}
                activeIndex={activeTrainingBar}
                onActiveIndexChange={setActiveTrainingBar}
              />
              <div className="flex items-center gap-6 text-xs font-bold text-gray600">
                <span className="flex items-center gap-2"><span className="w-5 border-t-2 border-[#086B37]" />Enrolments</span>
                <span className="flex items-center gap-2"><span className="w-5 border-t-2 border-[#A6C9A2]" />Completions</span>
              </div>
            </div>

            <p className="text-xs text-active leading-relaxed">
              Figure 2: LGA Local Government Training Package enrolments and
              completions.
            </p>
          </div>
        </div>

        {/* ── SECTION 3: ASSET MANAGEMENT CONTAINER ── */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 space-y-6">
          <div className="space-y-2.5">
            <span className="text-xs text-active block">
              SOURCE: ALGA, 2024 NATIONAL STATE OF THE ASSETS REPORT
            </span>
            <h3 className="font-bold text-xl text-gray800">Asset Management</h3>
          </div>

          {/* 3 Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Stat 1 */}
            <div
              style={{ animationDelay: "0.15s" }}
              className="animate-card-entrance bg-white border border-gray200 rounded-xl p-5 flex items-center gap-4"
            >
              <img
                src="/images/reports/industry-profile/item-1.svg"
                alt="~1/3"
                className="w-14 h-14 shrink-0 object-contain"
              />
              <div className="space-y-2">
                <span className="text-2xl sm:text-3xl font-semibold text-lg-dark block leading-none">
                  ~1/3
                </span>
                <p className="text-xs font-semibold text-gray600 leading-tight">
                  of Australia's public infrastructure assets
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div
              style={{ animationDelay: "0.27s" }}
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

            {/* Stat 3 */}
            <div
              style={{ animationDelay: "0.39s" }}
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
