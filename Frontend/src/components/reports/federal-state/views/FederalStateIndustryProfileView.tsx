"use client";

import React, { useState, useEffect, useRef } from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import {
  TrendingUp,
  GraduationCap,
  Users,
  Award,
  BarChart3,
  PieChart,
} from "lucide-react";

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

export default function FederalStateIndustryProfileView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const [activeGrowthBar, setActiveGrowthBar] = useState<number | null>(5);
  const [activeTrainingBar, setActiveTrainingBar] = useState<number | null>(3);
  const [chartsLoaded, setChartsLoaded] = useState(false);
  const chartsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setChartsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const growthData = [
    { year: "2020", val: "1,680,000", height: "72%" },
    { year: "2021", val: "1,710,000", height: "78%" },
    { year: "2022", val: "1,755,000", height: "85%" },
    { year: "2023", val: "1,795,000", height: "91%" },
    { year: "2024", val: "1,825,000", height: "95%" },
    { year: "2025", val: "1,850,000", height: "100%" },
  ];

  const trainingData = [
    { year: "2021", enrol: "42,500", comp: "26,100", enrolH: "75%", compH: "52%" },
    { year: "2022", enrol: "45,200", comp: "28,400", enrolH: "82%", compH: "56%" },
    { year: "2023", enrol: "48,900", comp: "31,200", enrolH: "90%", compH: "61%" },
    { year: "2024", enrol: "52,400", comp: "33,800", enrolH: "97%", compH: "65%" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#E07A5F]/20 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="industry_profile" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="industry_profile" />

        {/* Hero Card */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-10 relative overflow-hidden space-y-4 shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EED4C4]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="bg-[#694834] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              INDUSTRY PROFILE
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#382219]">
              Workforce Demographics & Training Pipeline
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              A comprehensive statistical profile of public sector employment growth, vocational education uptake, and workforce representation across Australia.
            </p>
          </div>
        </div>

        {/* Demographic Snapshot Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-[#E9EAEB] p-6 space-y-2 shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Female Representation
            </span>
            <div className="text-3xl font-extrabold text-[#694834]">
              <AnimatedCounter target={52.4} decimals={1} suffix="%" />
            </div>
            <p className="text-xs text-gray-600">
              Across all public sector classifications nationally.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E9EAEB] p-6 space-y-2 shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              First Nations Employees
            </span>
            <div className="text-3xl font-extrabold text-[#382219]">
              <AnimatedCounter target={3.7} decimals={1} suffix="%" />
            </div>
            <p className="text-xs text-gray-600">
              Exceeding the 3.0% Commonwealth target across departments.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E9EAEB] p-6 space-y-2 shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Median Employee Age
            </span>
            <div className="text-3xl font-extrabold text-[#694834]">
              <AnimatedCounter target={44} suffix=" Years" />
            </div>
            <p className="text-xs text-gray-600">
              Stable cohort with growing focus on early career cadetships.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E9EAEB] p-6 space-y-2 shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Regional Employment Share
            </span>
            <div className="text-3xl font-extrabold text-[#382219]">
              <AnimatedCounter target={38.2} decimals={1} suffix="%" />
            </div>
            <p className="text-xs text-gray-600">
              Stationed outside capital cities in regional service hubs.
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Employment Growth */}
          <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E9EAEB] pb-4">
              <div>
                <span className="text-xs font-bold text-[#694834] uppercase tracking-wider block">
                  HISTORICAL TREND
                </span>
                <h3 className="font-bold text-lg text-[#382219]">
                  Total Public Sector Employment (2020–2025)
                </h3>
              </div>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>

            <div className="h-64 flex items-end justify-between gap-3 pt-4 px-2">
              {growthData.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveGrowthBar(idx)}
                  className="flex-1 flex flex-col items-center gap-2 cursor-pointer group h-full justify-end"
                >
                  <span
                    className={`text-[11px] font-bold transition-opacity ${
                      activeGrowthBar === idx
                        ? "opacity-100 text-[#694834]"
                        : "opacity-0 group-hover:opacity-100 text-gray-500"
                    }`}
                  >
                    {item.val}
                  </span>
                  <div className="w-full bg-[#FAF8F5] rounded-t-lg h-full flex items-end">
                    <div
                      style={{
                        height: chartsLoaded ? item.height : "0%",
                        transition: "height 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      className={`w-full rounded-t-lg transition-colors ${
                        activeGrowthBar === idx
                          ? "bg-[#694834]"
                          : "bg-[#EED4C4] group-hover:bg-[#694834]/80"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-600">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 leading-relaxed pt-2">
              Source: Australian Bureau of Statistics (ABS), Employment and Earnings, Public Sector, Australia, 2024–25.
            </p>
          </div>

          {/* Chart 2: VET Enrolments & Completions */}
          <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E9EAEB] pb-4">
              <div>
                <span className="text-xs font-bold text-[#694834] uppercase tracking-wider block">
                  VET SECTOR PIPELINE
                </span>
                <h3 className="font-bold text-lg text-[#382219]">
                  Public Sector Qualifications: Enrolments vs Completions
                </h3>
              </div>
              <GraduationCap className="w-5 h-5 text-gray-400" />
            </div>

            <div className="h-64 flex items-end justify-between gap-4 pt-4 px-2">
              {trainingData.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveTrainingBar(idx)}
                  className="flex-1 flex flex-col items-center gap-2 cursor-pointer group h-full justify-end"
                >
                  <div className="flex items-center gap-1 text-[10px] font-bold">
                    <span className="text-[#694834]">{item.enrol}</span>
                  </div>
                  <div className="w-full flex items-end justify-center gap-1.5 h-full">
                    {/* Enrolment Bar */}
                    <div
                      style={{
                        height: chartsLoaded ? item.enrolH : "0%",
                        transition: "height 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      className="w-1/2 bg-[#694834] rounded-t-md"
                    />
                    {/* Completion Bar */}
                    <div
                      style={{
                        height: chartsLoaded ? item.compH : "0%",
                        transition: "height 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                      }}
                      className="w-1/2 bg-[#EED4C4] rounded-t-md"
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-600">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 pt-2 text-xs font-semibold text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#694834]" />
                <span>Enrolments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#EED4C4]" />
                <span>Completions</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ReportFooter contactUrl={report?.contactUrl} />
    </div>
  );
}
