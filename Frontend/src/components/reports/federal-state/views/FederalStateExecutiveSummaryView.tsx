"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import { ArrowRight } from "lucide-react";
import { themeOverviewSources, workforceInsightSummaries } from "../workforceInsightsContent";

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

export default function FederalStateExecutiveSummaryView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();
  const themesRef = useRef<HTMLDivElement>(null);
  const [isThemesVisible, setIsThemesVisible] = useState(false);

  const strategiesRef = useRef<HTMLDivElement>(null);
  const [isStrategiesVisible, setIsStrategiesVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => {
        setIsThemesVisible(true);
        setIsStrategiesVisible(true);
      });
      return () => window.cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === themesRef.current) {
              setIsThemesVisible(true);
            } else if (entry.target === strategiesRef.current) {
              setIsStrategiesVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (themesRef.current) observer.observe(themesRef.current);
    if (strategiesRef.current) observer.observe(strategiesRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased motion-reduce:[&_*]:animate-none motion-reduce:[&_*]:transition-none">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="executive_summary"
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Navigation Buttons */}
        <ReportNavButtons slug={slug} currentPage="executive_summary" />

        {/* Hero Card with Sequential Flow Graphic */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray800 animate-slide-up">
              Executive Summary
            </h1>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal animate-slide-up-delay">
              Public Skills Australia&apos;s 2026 Federal and State/Territory
              Government Workforce Insights Report (the Report) considers the wider
              operational contexts impacting Public Safety and Government industry.
              It identifies four drivers of change that will impact workforce
              planning in the short to medium term aligned with the nine megatrends
              detailed in previous Workforce Insights Reports that remain relevant
              to long term workforce trends.
            </p>
          </div>

          {/* Right Flow Graphics with Sequential Entrance Animation */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end overflow-x-auto py-2">
            <div className="flex items-center justify-center shrink-0">
              {/* 1. Workforce */}
              <div
                className="animate-flow-item relative z-10 shrink-0"
                style={{ animationDelay: "0.10s" }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-18 lg:h-18 xl:w-22 xl:h-22 rounded-full select-none">
                  <img
                    src="/images/reports/executive-summary/flow-1-workforce.png"
                    alt="Workforce"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Separator 1 */}
              <div
                className="animate-flow-separator flex flex-col justify-center gap-1 w-5 sm:w-7 md:w-8 lg:w-6 xl:w-8 -mx-[1px] relative z-0 shrink-0"
                style={{ animationDelay: "0.35s" }}
              >
                <div className="h-[2px] w-full bg-[#8AC900]" />
                <div className="h-[2px] w-full bg-[#8AC900]" />
              </div>

              {/* 2. Insights */}
              <div
                className="animate-flow-item relative z-10 shrink-0"
                style={{ animationDelay: "0.60s" }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-18 lg:h-18 xl:w-22 xl:h-22 rounded-full select-none">
                  <img
                    src="/images/reports/executive-summary/flow-2-insights.png"
                    alt="Insights"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Separator 2 */}
              <div
                className="animate-flow-separator flex flex-col justify-center gap-1 w-5 sm:w-7 md:w-8 lg:w-6 xl:w-8 -mx-[1px] relative z-0 shrink-0"
                style={{ animationDelay: "0.85s" }}
              >
                <div className="h-[2px] w-full bg-[#8AC900]" />
                <div className="h-[2px] w-full bg-[#8AC900]" />
              </div>

              {/* 3. Strategies */}
              <div
                className="animate-flow-item relative z-10 shrink-0"
                style={{ animationDelay: "1.10s" }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-18 lg:h-18 xl:w-22 xl:h-22 rounded-full select-none">
                  <img
                    src="/images/reports/executive-summary/flow-3-strategies.png"
                    alt="Strategies"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Separator 3 */}
              <div
                className="animate-flow-separator flex flex-col justify-center gap-1 w-5 sm:w-7 md:w-8 lg:w-6 xl:w-8 -mx-[1px] relative z-0 shrink-0"
                style={{ animationDelay: "1.35s" }}
              >
                <div className="h-[2px] w-full bg-[#8AC900]" />
                <div className="h-[2px] w-full bg-[#8AC900]" />
              </div>

              {/* 4. Looking Forward */}
              <div
                className="animate-flow-item relative z-10 shrink-0"
                style={{ animationDelay: "1.60s" }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-18 lg:h-18 xl:w-22 xl:h-22 rounded-full select-none">
                  <img
                    src="/images/reports/executive-summary/flow-4-forward.png"
                    alt="Looking Forward"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Drivers of Change */}
        <div className="bg-white rounded-2xl border border-gray200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E5E8DA] flex items-center justify-center shrink-0">
              <img
                src="/images/drivers-of-change-icon.svg"
                alt="Drivers of Change"
                className="h-7 object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray800 pb-2">
                Drivers of Change
              </h3>
              <p className="text-xs text-gray600 leading-relaxed max-w-2xl">
                Four drivers of change impacting workforce planning in the short
                to medium term, aligned with the nine megatrends detailed in
                previous Workforce Insights Reports.
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/reports/${slug}/drivers_of_change`)}
            className="bg-[#8AC900] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full hidden md:flex items-center gap-1.5 cursor-pointer shrink-0 hover:bg-[#79B700] transition-colors"
          >
            Present Drivers of Change <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Section 2: one theme, with non-interactive insight summaries */}
        <div
          ref={themesRef}
          aria-labelledby="summary-insights-title"
          className="bg-white rounded-md border border-gray200 border-t-[6px] border-t-[#EED4C4] p-6 space-y-6"
        >
          {/* Header row inside card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray200">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E5E8DA] flex items-center justify-center shrink-0">
                <img
                  src="/images/work-force.svg"
                  alt="Workforce Insights"
                  className="h-7 object-contain"
                />
              </div>
              <div>
                <h2 id="summary-insights-title" className="font-bold text-base text-gray800 pb-2">One Theme, Three Insights</h2>
                <h3 className="text-base font-bold text-[#754C2D]">Future of the Public Service</h3>
              </div>
            </div>
          </div>

          <p className="max-w-[80ch] text-xs leading-6 text-gray600">
            ABS data indicates that the Federal and State/Territory Government public sector has increased between 2024-25 by 3.3 per cent.<sup><a href="#summary-source-85" aria-label="Source 85" className="underline">85</a></sup> According to Jobs and Skills Australia&apos;s employment projections, employment in the Public Administration industry group is projected to steadily grow over the next 10 years from the current baseline of 505,200 in May 2025 to 574,900 in May 2035.<sup><a href="#summary-source-86" aria-label="Source 86" className="underline">86</a></sup> These projections encompass government activities at the federal, state and territory levels only.<sup><a href="#summary-source-87" aria-label="Source 87" className="underline">87</a></sup> The future public service workforce will continue to have effects on national economic growth and productivity.
          </p>
          <ol className="space-y-3" aria-label="Executive Summary insights">
            {workforceInsightSummaries.map((insight, index) => (
              <li key={insight.title}
                style={isThemesVisible ? { animationDelay: `${0.10 + index * 0.12}s` } : undefined}
                className={`summary-insight-item flex items-start gap-4 rounded-md border border-[#BDA28E] border-l-[5px] border-l-[#754C2D] bg-[#F8EEE8] p-4 sm:p-5 motion-safe:transition-shadow motion-safe:hover:shadow-sm ${isThemesVisible ? "animate-card-entrance motion-reduce:animate-none" : "motion-safe:opacity-0 motion-safe:translate-y-4"}`}>
                <span aria-hidden="true" className="w-8 shrink-0 select-none text-[34px] font-light leading-none text-[#754C2D]">{index + 1}</span>
                <div className="min-w-0 max-w-[80ch] text-xs">
                  <h4 className="font-semibold leading-5 text-[#754C2D]">{insight.title}</h4>
                  <p className="mt-2 leading-6 text-gray600">{insight.summary}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="border-t border-gray200 pt-4">
            <h3 className="text-xs font-bold text-gray800">Sources</h3>
            <ol className="mt-3 max-w-[80ch] space-y-3 text-xs leading-5 text-gray600">
              {themeOverviewSources.map(({ number, text }) => <li key={number} id={`summary-source-${number}`} className="flex scroll-mt-24 gap-3"><span className="font-semibold text-[#754C2D]">{number}</span><span>{text}</span></li>)}
            </ol>
          </div>
        </div>

        {/* Section 3: 2026 Proposed Strategy */}
        <div
          ref={strategiesRef}
          className="bg-white rounded-2xl border border-gray200 p-6 space-y-6"
        >
          {/* Header row inside card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray200">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E5E8DA] flex items-center justify-center shrink-0">
                <img
                  src="/images/stratergies.svg"
                  alt="2026 Proposed Strategy"
                  className="h-6 object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray800 pb-2">
                  2026 Proposed Strategy
                </h3>
                <p className="text-xs text-gray600 leading-relaxed max-w-[80ch]">
                  Public Skills Australia proposes the following strategy
                  aligned to the workforce insights identified to support the
                  Federal and State/Territory Government industry-sector.
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                router.push(`/reports/${slug}/workforce_strategies`)
              }
              className="bg-[#8AC900] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full hidden md:flex items-center gap-1.5 cursor-pointer shrink-0 hover:bg-[#79B700] transition-colors"
            >
              Present 2026 Strategies <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Strategy Detail Card inside the card */}
          <div
            style={
              isStrategiesVisible ? { animationDelay: "0.10s" } : undefined
            }
            className={`bg-white rounded-2xl border border-gray200 border-t-8 border-t-[#694834] p-6 space-y-4 ${
              isStrategiesVisible
                ? "animate-card-entrance motion-reduce:animate-none"
                : "motion-safe:opacity-0 motion-safe:translate-y-6"
            }`}
          >
            <div>
              <span className="bg-[#694834] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                STRATEGY 1
              </span>
            </div>

            <h4 className="font-bold text-base sm:text-lg text-gray800 leading-snug">
              Identify future skills needs for Federal and State/Territory
              Government
            </h4>
            <p className="max-w-[80ch] text-xs leading-relaxed text-gray600">
              Public Skills Australia will use a strategic-foresight approach to convene jurisdictional workshops to identify where nationally accredited Vocational Education and Training (VET) training can support capability development.
            </p>

            <div className="border-t border-gray-200 my-4" />

            <div className="max-w-[80ch] space-y-3.5 pt-1">
              <div>
                <h5 className="text-xs font-bold text-gray800">
                  Workforce Insight:
                </h5>
                <p className="text-xs text-gray600">
                  Future of the Public Service
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-gray800">
                  JSC Function:
                </h5>
                <p className="text-xs text-gray600">Industry Stewardship</p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-gray800">Objective:</h5>
                <p className="text-xs text-gray600 leading-relaxed">
                  To support the Federal and State/Territory public service in
                  identifying future workforce skilling needs.
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-gray800">Approach:</h5>
                <p className="text-xs text-gray600 leading-relaxed">
                  Using a strategic-foresight approach, convene &apos;Future
                  Skills for the Public Service&apos; workshops to identify future
                  skilling needs across jurisdictions to support clarifying
                  emerging skills gaps and identify where nationally accredited
                  VET can support capability development.
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-gray800">
                  Deliverable :
                </h5>
                <p className="text-xs text-gray600">Findings report</p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-gray800">Impact:</h5>
                <p className="text-xs text-gray600 leading-relaxed">
                  To support the Federal and State/Territory Government public
                  service by providing critical insight to the future needs of
                  public service workforces which can support workforce planning.
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-gray800">
                  Anticipated timing:
                </h5>
                <p className="text-xs text-gray600">12-month project</p>
              </div>

              <div className="pt-1">
                <h5 className="text-xs font-bold text-gray800 mb-1.5">
                  Key Stakeholders:
                </h5>
                <span className="bg-[#FBE8DE] text-[#8C4A28] border border-[#F0C9B6] text-xs font-medium px-3.5 py-1 rounded-full inline-block">
                  Public Sector Commissions or equivalent
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: 2027 and Beyond */}
        <div className="bg-white rounded-2xl border border-gray200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E5E8DA] flex items-center justify-center shrink-0">
              <img
                src="/images/2027-and-beyond.svg"
                alt="2027 and Beyond"
                className="h-6 object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray800 pb-2">
                2027 and Beyond
              </h3>
              <p className="text-xs text-gray600 leading-relaxed max-w-2xl">
                This report concludes by looking towards the 2027 Workforce
                Insights Reports and beyond. Future work will firstly focus on
                broader priorities, including First Nations workforce
                participation, gender equity in the Public Safety and Government
                workforces, and the implications of AI and digital
                transformation.
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/reports/${slug}/looking_forward`)}
            className="bg-[#8AC900] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full hidden md:flex items-center gap-1.5 cursor-pointer shrink-0 hover:bg-[#79B700] transition-colors"
          >
            View 2027 and Beyond <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter
        contactUrl={report?.contactUrl}
        reportName={
          report?.title?.replace(/\s*\b20\d{2}\b/g, "").trim() ||
          "Federal and State/Territory Government Workforce Insights Report"
        }
      />
    </div>
  );
}
