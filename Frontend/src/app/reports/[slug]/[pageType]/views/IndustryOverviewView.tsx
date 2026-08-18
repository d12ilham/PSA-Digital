"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import { ArrowRight, Download } from "lucide-react";

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

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  formatNumber?: boolean;
}

function AnimatedCounter({
  target,
  duration = 2600,
  prefix = "",
  suffix = "",
  formatNumber = false,
}: AnimatedCounterProps) {
  const [count, setCount] = React.useState(0);
  const elementRef = React.useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  React.useEffect(() => {
    if (!hasAnimated) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = easeOutExpo(progress);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, target, duration]);

  const displayValue = formatNumber ? count.toLocaleString() : count;

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export default function IndustryOverviewView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="industry_overview"
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <ReportNavButtons slug={slug} currentPage="industry_overview" />

        {/* Hero Card */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray800">
                Local Government Industry-Sector Overview
              </h1>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                Across Australia, there are 537 local councils. Of these local
                councils, around 55 per cent are located in regional, rural or
                remote areas with the other 45 per cent split across urban
                regions, urban fringe and urban areas. Local councils manage
                approximately one-third of Australia's public infrastructure
                assets, including roads, airports, facilities and other assets
                and make up 77 per cent of the national road network (by
                length). The public assets managed by local councils are valued
                at an estimated $643 billion.
              </p>
            </div>

            {/* Right Diagram Image */}
            <div className="lg:col-span-4 flex justify-end p-2">
              <img
                src="/images/reports/industry-overview/hero.svg"
                alt="Industry Overview Diagram"
                className="h-auto max-h-48 object-contain"
              />
            </div>
          </div>

          {/* 4 Stat Boxes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <div className="bg-white border border-gray200 rounded-xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:shadow-xs">
              <img
                src="/images/reports/industry-overview/item1.svg"
                alt="537 local councils"
                className="w-14 h-14 shrink-0 object-contain"
              />
              <div className="space-y-1">
                <span className="text-2xl font-bold text-gray800 block leading-none">
                  <AnimatedCounter target={537} />
                </span>
                <p className="text-xs text-gray600 leading-normal">
                  local councils across Australia
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white border border-gray200 rounded-xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:shadow-xs">
              <img
                src="/images/reports/industry-overview/item2.svg"
                alt="55% / 45%"
                className="w-14 h-14 shrink-0 object-contain"
              />
              <div className="space-y-1">
                <span className="text-xl sm:text-2xl font-bold text-gray800 block leading-none">
                  <AnimatedCounter target={55} suffix="%" /> /{" "}
                  <AnimatedCounter target={45} suffix="%" />
                </span>
                <p className="text-xs text-gray600 leading-normal">
                  55% regional, rural or remote
                  <br />
                  45% urban regions, urban fringe and urban areas
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white border border-gray200 rounded-xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:shadow-xs">
              <img
                src="/images/reports/industry-overview/item3.svg"
                alt="218,000 employees"
                className="w-14 h-14 shrink-0 object-contain"
              />
              <div className="space-y-1">
                <span className="text-2xl font-bold text-gray800 block leading-none">
                  <AnimatedCounter target={218000} formatNumber={true} />
                </span>
                <p className="text-xs text-gray600 leading-normal">
                  employees (estimated) in the Local Government workforce
                </p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white border border-gray200 rounded-xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:shadow-xs">
              <img
                src="/images/reports/industry-overview/item4.svg"
                alt="400+ occupations"
                className="w-14 h-14 shrink-0 object-contain"
              />
              <div className="space-y-1">
                <span className="text-2xl font-bold text-gray800 block leading-none">
                  <AnimatedCounter target={400} suffix="+" />
                </span>
                <p className="text-xs text-gray600 leading-normal">
                  different occupations employed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: TWO MAIN TOPIC CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <img
                src="/images/reports/industry-overview/multidisciplinary.svg"
                alt="A multidisciplinary workforce"
                className="w-16 h-16 shrink-0 object-contain"
              />
              <h3 className="font-bold text-lg text-gray800">
                A multidisciplinary workforce
              </h3>
              <p className="text-xs text-gray600 leading-relaxed">
                The Local Government workforce is multidisciplinary, employing
                over an estimated 400 different occupations. Their workforces
                are managed individually at the local council level but are
                brought together and commonly represented through state and
                territory associations and the Australian Local Government
                Association (ALGA). It is estimated that the Local Government
                workforce is made up of approximately 218,000 employees. While
                employment projections have estimated significant growth in the
                Local Government workforce over the next ten years, successive
                Workforce Plans and Parliamentary Commissions of Inquiry have
                noted extensive challenges with recruitment and retention, and a
                significant expansion of roles and responsibilities for the
                Local Government industry-sector.
              </p>
            </div>

            <p className="text-xs text-[#598303] pt-4 border-t border-gray200">
              Sources (13–16): ALGA, Facts and Figures, 2025; ABS, Public Sector
              Employment and Earnings, 2025; PSA, Federal, State/Territory and
              Local Government Workforce Plan 2024; PSA, 2025 Local Government
              Workforce Insights Report; Parliament of Australia, Inquiry into
              Local Government Sustainability interim Report, 2025.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-4 flex flex-col">
            <div className="space-y-4">
              <img
                src="/images/reports/industry-overview/Custodians.svg"
                alt="Custodians of community infrastructure"
                className="w-16 h-16 shrink-0 object-contain"
              />
              <h3 className="font-bold text-lg text-gray800">
                Custodians of community infrastructure
              </h3>
              <p className="text-xs text-gray600 leading-relaxed">
                Local councils manage approximately one-third of Australia's
                public infrastructure assets – including roads, airports,
                facilities and other assets – and make up 77 per cent of the
                national road network by length. The public assets managed by
                local councils are valued at an estimated $643 billion.
              </p>
            </div>

            <p className="text-xs text-[#598303] leading-tight pt-4 border-t border-gray200">
              Source: ALGA, 2024 National State of the Assets Report, 2024.
            </p>
          </div>
        </div>

        {/* ── SECTION 3: FEATURE CALLOUTS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Callout 1 */}
          <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-bold text-base text-gray800">
                State and territory Workforce Profile
              </h3>
              <p className="text-xs text-gray600 leading-relaxed">
                The Local Government workforce is spread across a diverse
                geographical area. The workforce profile consists of a balanced
                gender representation and high representation of First Nations
                employees (9.2 per cent of total national workforce) when
                compared to the total national population (3.8 per cent of total
                Australian population).
              </p>
            </div>

            <div>
              <button
                onClick={() => router.push(`/reports/${slug}/state_territory`)}
                className="bg-[#8AC900] hover:bg-[#78B300] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                View the interactive state profile{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Callout 2 */}
          <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-bold text-base text-gray800">
                Key Occupational Shortages by state and territory
              </h3>
              <p className="text-xs text-gray600 leading-relaxed">
                In consultation with stakeholders for the Local Government
                Skills Audit and Uptake and Utility of the LGA Local Government
                Training Package project, each local council identified top
                occupational shortages affecting their workforces. In examining
                these shortages against the Jobs and Skills Australia
                Occupational Shortage List, several Local Government specific
                shortages have been identified.
              </p>
            </div>

            <div>
              <button
                onClick={() => router.push(`/reports/${slug}/industry_profile`)}
                className="bg-[#8AC900] hover:bg-[#78B300] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                View the Industry Profile data{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── SECTION 4: SOURCES CONTAINER ── */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="font-bold text-xl text-gray800">Sources</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray600 leading-relaxed">
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  9
                </span>
                <p>
                  ALGA, Facts and Figures, ALGA, 2025, accessed 24 September
                  2025.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  11
                </span>
                <p>
                  ALGA, 2024 National State of the Assets Report, ALGA, 2024,
                  pages 4, 5 and 8, accessed 11 February 2026.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  13
                </span>
                <p>
                  ALGA, Facts and Figures, ALGA, 2025, accessed 24 September
                  2025.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  15
                </span>
                <p>
                  Public Skills Australia (PSA), Federal, State/Territory and
                  Local Government Workforce Plan 2024, PSA, 2024, accessed 11
                  February 2026; PSA, 2025 Local Government Workforce Insights
                  Report, PSA, 2025, accessed 11 February 2026.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  17
                </span>
                <p>
                  ABS, Estimates of Aboriginal and Torres Strait Islander
                  Australians, ABS, 2021, accessed 12 February 2026; ALGA, 2022
                  Local Government Workforce Skills and Capability Survey, ALGA,
                  2022, page 39, accessed 11 February 2026.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  10
                </span>
                <p>
                  ALGA, Facts and Figures, ALGA, 2025, accessed 24 September
                  2025.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  12
                </span>
                <p>
                  ALGA, 2024 National State of the Assets Report, ALGA, 2024,
                  pages 4, 5 and 8, accessed 11 February 2026.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  14
                </span>
                <p>
                  Australian Bureau of Statistics (ABS), Public Sector
                  Employment and Earnings, ABS, 2025, accessed 11 February 2026.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  16
                </span>
                <p>
                  Parliament of Australia, Inquiry into Local Government
                  Sustainability Interim Report, Parliament of Australia, 2025,
                  accessed 11 February 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} variant="pill" />
    </div>
  );
}
