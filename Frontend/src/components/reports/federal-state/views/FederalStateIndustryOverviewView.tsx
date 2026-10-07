"use client";

import React, { useState, useEffect, useRef } from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
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

function EmploymentProjectionsChart({ animate }: { animate: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-gray200 border-t-8 border-t-[#694834] p-5 sm:p-6 space-y-4">
      <h4 className="text-base sm:text-lg font-bold text-gray900">
        Employment Projections – Federal Government
      </h4>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 460 170"
          className="w-full h-auto min-w-[340px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dashed brown projection line */}
          <path
            d="M 35 68 L 230 46 L 425 32"
            stroke="#694834"
            strokeWidth="2"
            strokeDasharray="4 4"
            className={animate ? "animate-industry-projection-line" : ""}
          />

          {/* Projection data points */}
          <circle cx="35" cy="68" r="4.5" fill="#694834" className={animate ? "animate-industry-chart-point" : ""} style={animate ? { animationDelay: "0.55s" } : undefined} />
          <text
            x="35"
            y="94"
            fill="#382219"
            fontSize="12"
            fontWeight="bold"
            textAnchor="start"
          >
            202,200
          </text>

          <circle cx="230" cy="46" r="4.5" fill="#694834" className={animate ? "animate-industry-chart-point" : ""} style={animate ? { animationDelay: "0.7s" } : undefined} />
          <text
            x="230"
            y="72"
            fill="#382219"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
          >
            219,400
          </text>

          <circle cx="425" cy="32" r="4.5" fill="#694834" className={animate ? "animate-industry-chart-point" : ""} style={animate ? { animationDelay: "0.85s" } : undefined} />
          <text
            x="395"
            y="58"
            fill="#382219"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
          >
            230,300
          </text>

          {/* Baseline horizontal solid gray line */}
          <line
            x1="20"
            y1="125"
            x2="440"
            y2="125"
            stroke="#9CA3AF"
            strokeWidth="2"
          />

          {/* Baseline year dots */}
          <circle cx="35" cy="125" r="4" fill="#9CA3AF" />
          <text
            x="35"
            y="150"
            fill="#694834"
            fontSize="11"
            fontWeight="500"
            textAnchor="start"
          >
            2025
          </text>

          <circle cx="230" cy="125" r="4" fill="#9CA3AF" />
          <text
            x="230"
            y="150"
            fill="#694834"
            fontSize="11"
            fontWeight="500"
            textAnchor="middle"
          >
            2030
          </text>

          <circle cx="425" cy="125" r="4" fill="#9CA3AF" />
          <text
            x="425"
            y="150"
            fill="#694834"
            fontSize="11"
            fontWeight="500"
            textAnchor="end"
          >
            2035
          </text>
        </svg>
      </div>

      <p className="text-[10px] text-[#598303] font-medium leading-tight">
        SOURCE: Jobs Skills Australia, Employment projections – May 2025 to May
        2035, Table 5
      </p>
    </div>
  );
}

interface BarItem {
  percentage: number;
  label: string;
  color: string;
}

function SkillsBarChart({
  title,
  bars,
  source,
  animate,
}: {
  title: string;
  bars: BarItem[];
  source: string;
  animate: boolean;
}) {
  return (
    <div className="group bg-white rounded-2xl border border-gray200 p-5 sm:p-6 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#BAABA0] hover:shadow-lg">
      <h4 className="text-base sm:text-lg font-bold text-gray900 leading-snug">
        {title}
      </h4>

      {/* Bars Container */}
      <div className="pt-2">
        {/* Flush on bottom border line (no bottom padding) with minimal gap between bars */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 items-end h-44 sm:h-48 border-b border-gray200">
          {bars.map((bar, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center h-full justify-end group px-0.5"
            >
              {/* Percentage Label */}
              <span className="text-xs sm:text-sm font-semibold text-gray700 mb-1.5 transition-transform duration-200 group-hover:scale-105">
                {bar.percentage}%
              </span>
              {/* Bar Fill: wide width with tiny gap, sitting flush on the bottom line */}
              <div
                style={{
                  height: `${bar.percentage}%`,
                  backgroundColor: bar.color,
                  animationDelay: `${idx * 0.1}s`,
                }}
                className={`w-full rounded-t-md transition-all duration-700 ease-out group-hover:brightness-105 ${animate ? "animate-industry-chart-bar" : ""}`}
              />
            </div>
          ))}
        </div>

        {/* Labels below bars */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-2.5">
          {bars.map((bar, idx) => (
            <div key={idx} className="text-center px-0.5">
              <span className="text-[10px] sm:text-[11px] text-gray600 leading-tight block font-normal">
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Source */}
      <p className="text-[10px] sm:text-[11px] text-[#598303] font-medium leading-tight pt-2">
        {source}
      </p>
    </div>
  );
}

export default function FederalStateIndustryOverviewView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const [isHeroMounted, setIsHeroMounted] = useState(false);
  const [scopeOpen, setScopeOpen] = useState(true);
  const [growthOpen, setGrowthOpen] = useState(true);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const scopeRef = useRef<HTMLDivElement>(null);
  const growthRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const sourcesRef = useRef<HTMLDivElement>(null);
  const [scopeVisible, setScopeVisible] = useState(false);
  const [growthVisible, setGrowthVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [sourcesVisible, setSourcesVisible] = useState(false);

  useEffect(() => {
    setIsHeroMounted(true);
  }, []);

  useEffect(() => {
    const targets = [
      { ref: scopeRef, setVisible: setScopeVisible },
      { ref: growthRef, setVisible: setGrowthVisible },
      { ref: skillsRef, setVisible: setSkillsVisible },
      { ref: sourcesRef, setVisible: setSourcesVisible },
    ];

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      targets.forEach(({ setVisible }) => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = targets.find(({ ref }) => ref.current === entry.target);
          match?.setVisible(true);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

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
        {/* Navigation Buttons */}
        <ReportNavButtons
          slug={slug}
          currentPage="industry_overview"
          next={{
            label: "Industry Profile",
            href: `/reports/${slug}/industry_profile`,
          }}
        />

        {/* Hero Card */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-8 space-y-6 transition-all duration-300 hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray800 animate-slide-up leading-tight">
                Federal and State/Territory Government Industry-Sector Overview
              </h1>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal animate-slide-up-delay">
                In Australia, all tiers of government play an essential role in
                governance and delivery of public services. The Federal
                Government is responsible for both domestic, economic and
                foreign affairs, while state and territory governments provide
                state or territory-based services, in line with relevant
                legislation, including but not limited to health, education and
                criminal justice.
              </p>
            </div>

            {/* Right Diagram Image with local-government pulse-settle animation */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end p-2">
              <img
                src="/images/reports/federal-state/industry-overview/hero.png"
                alt="Industry-Sector Overview Diagram"
                className={`h-auto max-h-48 object-contain select-none pointer-events-none ${
                  isHeroMounted ? "animate-hero-pulse-settle" : "opacity-0"
                }`}
              />
            </div>
          </div>

          {/* 4 Stat Boxes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {/* Stat 1: 102 agencies */}
            <div
              style={{ animationDelay: "0.15s" }}
              className="group animate-card-entrance bg-white border border-gray200 rounded-xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#BAABA0] hover:bg-[#FCFBF7] hover:shadow-md"
            >
              <img
                src="/images/reports/federal-state/industry-overview/stat-agencies.png"
                alt="102 agencies"
                className="w-14 h-14 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <div className="space-y-2">
                <span className="text-2xl font-bold text-gray800 block leading-none">
                  <AnimatedCounter target={102} />
                </span>
                <p className="text-xs text-gray600 leading-normal">agencies</p>
              </div>
            </div>

            {/* Stat 2: 198,529 employees */}
            <div
              style={{ animationDelay: "0.27s" }}
              className="group animate-card-entrance bg-white border border-gray200 rounded-xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#BAABA0] hover:bg-[#FCFBF7] hover:shadow-md"
            >
              <img
                src="/images/reports/federal-state/industry-overview/stat-aps-employees.png"
                alt="198,529 employees"
                className="w-14 h-14 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <div className="space-y-2">
                <span className="text-2xl font-bold text-gray800 block leading-none">
                  <AnimatedCounter target={198529} formatNumber={true} />
                </span>
                <p className="text-xs text-gray600 leading-normal">
                  Australian Public Service (APS) employees (Federal Government
                  workforce, as of 30 June 2025)
                </p>
              </div>
            </div>

            {/* Stat 3: 60.5% women */}
            <div
              style={{ animationDelay: "0.39s" }}
              className="group animate-card-entrance bg-white border border-gray200 rounded-xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#BAABA0] hover:bg-[#FCFBF7] hover:shadow-md"
            >
              <img
                src="/images/reports/federal-state/industry-overview/stat-women.png"
                alt="60.5% women"
                className="w-14 h-14 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <div className="space-y-2">
                <span className="text-2xl font-bold text-gray800 block leading-none">
                  <AnimatedCounter target={60.5} decimals={1} suffix="%" />
                </span>
                <p className="text-xs text-gray600 leading-normal">women</p>
              </div>
            </div>

            {/* Stat 4: 3.4% First Nations employees */}
            <div
              style={{ animationDelay: "0.51s" }}
              className="group animate-card-entrance bg-white border border-gray200 rounded-xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#BAABA0] hover:bg-[#FCFBF7] hover:shadow-md"
            >
              <img
                src="/images/reports/federal-state/industry-overview/stat-first-nations.png"
                alt="3.4% First Nations employees"
                className="w-14 h-14 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <div className="space-y-2">
                <span className="text-2xl font-bold text-gray800 block leading-none">
                  <AnimatedCounter target={3.4} decimals={1} suffix="%" />
                </span>
                <p className="text-xs text-gray600 leading-normal">
                  First Nations employees - committed to increasing First
                  Nations employment to 5 per cent of the APS by 2030
                </p>
              </div>
            </div>
          </div>

          {/* Narrative below stat boxes */}
          <div className="pt-2">
            <p className="text-xs text-gray600 leading-relaxed font-normal">
              The Federal Government is made up of 102 agencies and 198,529
              Australian Public Service (APS) employees (Federal Government
              workforce, as of 30 June 2025).<sup>7</sup> While a large
              proportion (35.4 per cent) of APS employees are based in the
              Australian Capital Territory (ACT), APS employees are spread
              across Australia, with a considerable proportion based in Victoria
              (18 per cent), New South Wales (16.9 per cent) and Queensland
              (13.3 per cent). The APS workforce is diverse with women
              comprising a large proportion of employees (60.5 per cent).
              <sup>8</sup> First Nations employees comprise 3.4 per cent of the
              APS, however the Federal Government has committed to increasing
              First Nations employment to 5 per cent of the APS by 2030.
              <sup>9</sup> The following datapoints were identified through this
              industry overview for the Federal Government workforce:
            </p>
          </div>
        </div>

        {/* Section 2: Scope of this industry-sector overview (Accordion Card) */}
        <div ref={scopeRef} className={`bg-white border border-gray200 rounded-2xl p-6 space-y-4 transition-all duration-500 hover:border-[#BAABA0] hover:shadow-lg ${scopeVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray800">
                Scope of this industry-sector overview
              </h2>
              <p className="text-xs text-gray500 font-medium">
                Which occupations and data profiles this Report covers
              </p>
            </div>
            <button
              onClick={() => setScopeOpen(!scopeOpen)}
              className="bg-[#8AC900] text-gray800 text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer flex items-center gap-1 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#79B700] hover:shadow-md shrink-0"
            >
              {scopeOpen ? "Close ▴" : "Open ▾"}
            </button>
          </div>

          <div
            className={`grid transition-all duration-500 ease-in-out ${
              scopeOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden min-h-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray200 text-xs text-gray600 leading-relaxed font-normal">
                <div className={scopeVisible ? "animate-content-switch" : ""}>
                  <p>
                    As there are a breadth of roles across the public sector,
                    several occupations are in the remit of other JSCs, such as
                    early childhood educators and allied health professionals.
                    Other occupations that make up the public sector including
                    Defence, Police and Local Government will be covered in
                    other Workforce Insights Reports produced by Public Skills
                    Australia.
                  </p>
                </div>
                <div className={scopeVisible ? "animate-content-switch" : ""} style={scopeVisible ? { animationDelay: "0.12s" } : undefined}>
                  <p>
                    The 2026 Federal and State/Territory Government Workforce
                    Insights Report focuses on non-frontline occupations that
                    support the business of Federal and State/Territory
                    Government such as, but not limited to, policy analysts,
                    project management, inspectors and regulatory officers and
                    project administrators. As each Federal and State/Territory
                    Government is unique, the following sections provide a
                    snapshot of each workforce as well as any relevant industry
                    insights to provide context for the overarching workforce
                    challenges.
                  </p>
                </div>
                <div className={scopeVisible ? "animate-content-switch" : ""} style={scopeVisible ? { animationDelay: "0.24s" } : undefined}>
                  <p>
                    In the subsequent sections that follow, data profiles have
                    been created to present the workforces for the Federal and
                    State/Territory Government industry-sector. These data
                    profiles primarily refer to the public service where such
                    data is available, noting that, in some jurisdictions, data
                    is only available for the broader public sector. Public
                    Skills Australia notes that these figures are likely to
                    include front-line roles including but not limited to,
                    police, health and education-based roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Future Workforce Growth (Collapsible Tab + Content) */}
        <div ref={growthRef} className={`space-y-4 transition-all duration-500 ${growthVisible ? "animate-slide-up" : "translate-y-6 opacity-0"}`}>
          {/* Tab Header */}
          <div
            className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
              growthOpen
                ? "bg-[#EDE9DC] border border-[#694834] border-t-8 border-t-[#694834]"
                : "bg-white border border-gray200 border-t-8 border-t-[#694834]"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={
                    growthOpen
                      ? "/images/reports/federal-state/industry-overview/tab-growth-active.png"
                      : "/images/reports/federal-state/industry-overview/tab-growth-inactive.png"
                  }
                  alt="Future Workforce Growth"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0 select-none transition-transform duration-300 hover:scale-110"
                />
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-gray800">
                    Future Workforce Growth
                  </h3>
                  <p className="text-xs text-gray600 leading-relaxed">
                    APS growth to 2030 and JSA employment projections to 2035
                  </p>
                </div>
              </div>
              <button
                onClick={() => setGrowthOpen(!growthOpen)}
                className="bg-[#8AC900] text-gray800 font-bold text-xs px-4 py-1.5 rounded-full flex items-center gap-1 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#79B700] hover:shadow-md shrink-0"
              >
                {growthOpen ? "Close ▴" : "Open ▾"}
              </button>
            </div>
          </div>

          {/* Active Content: Left Text Narrative & Right Projections Chart */}
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              growthOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden min-h-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
                {/* Left Narrative Text */}
                <div className={`lg:col-span-6 text-xs sm:text-sm text-gray700 leading-relaxed font-normal ${growthVisible ? "animate-content-switch" : ""}`}>
                  <p>
                    While the number of APS employees grew by over 13,000 (7.1
                    per cent) between 2024 and 2025, JSA projects this rate of
                    growth to slow substantially, with 18,000 employees
                    projected to join the workforce in 2030, at a growth rate of
                    approximately 1.7 per cent per year.<sup>10</sup> Reporting
                    by the Australian Public Service Commission (APSC) reported
                    that 79% of agencies identified cyber security as a critical
                    skills shortage, with identified critical skill shortages in
                    2025, and 64% identified critical skills shortages in
                    enterprise/technology architecture.<sup>11</sup>
                  </p>
                </div>

                {/* Right Chart Box */}
                <div className={`lg:col-span-6 ${growthVisible ? "animate-card-entrance" : ""}`} style={growthVisible ? { animationDelay: "0.18s" } : undefined}>
                  <EmploymentProjectionsChart animate={growthOpen} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Future Workforce Skills Needs (Collapsible Tab + Content) */}
        <div ref={skillsRef} className={`space-y-4 transition-all duration-500 ${skillsVisible ? "animate-slide-up" : "translate-y-6 opacity-0"}`}>
          {/* Tab Header */}
          <div
            className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
              skillsOpen
                ? "bg-[#EDE9DC] border border-[#694834] border-t-8 border-t-[#694834]"
                : "bg-white border border-gray200 border-t-8 border-t-[#694834]"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={
                    skillsOpen
                      ? "/images/reports/federal-state/industry-overview/tab-skills-active.png"
                      : "/images/reports/federal-state/industry-overview/tab-skills-inactive.png"
                  }
                  alt="Future Workforce Skills Needs"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0 select-none transition-transform duration-300 hover:scale-110"
                />
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-gray800">
                    Future Workforce Skills Needs
                  </h3>
                  <p className="text-xs text-gray600 leading-relaxed">
                    Skills shortages identified by APS agencies and the response
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSkillsOpen(!skillsOpen)}
                className="bg-[#8AC900] text-gray800 font-bold text-xs px-4 py-1.5 rounded-full flex items-center gap-1 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#79B700] hover:shadow-md shrink-0"
              >
                {skillsOpen ? "Close ▴" : "Open ▾"}
              </button>
            </div>
          </div>

          {/* Collapsible Content */}
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              skillsOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden min-h-0 space-y-6 pt-1">
              {/* Narrative Text */}
              <div className={`text-xs sm:text-sm text-gray700 leading-relaxed font-normal ${skillsVisible ? "animate-content-switch" : ""}`}>
                <p>
                  The Federal Government is strengthening workforce planning
                  capability to meet future workforce needs. This includes the
                  Delivering for Tomorrow: APS Workforce Strategy 2025, which
                  has a range of resources to support workforce planning in the
                  APS. The APS Academy also provides learning and development to
                  build capability in the APS, allowing a pathway to address
                  future skill gaps. They provide training in AI and other
                  critical digital skills areas. Government priorities to build
                  in-house capability compared to relying on external work
                  provides an opportunity to address skills shortages internally
                  among existing APS employees.
                </p>
              </div>

              {/* Two Bar Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={skillsVisible ? "animate-card-entrance" : ""} style={skillsVisible ? { animationDelay: "0.14s" } : undefined}>
                <SkillsBarChart
                  title="Top 5 Skills Shortages Identified by APS Agencies"
                  animate={skillsOpen}
                  bars={[
                    {
                      percentage: 38,
                      label: "People Management",
                      color: "#DDD5CE",
                    },
                    {
                      percentage: 40,
                      label: "Procurement and contracting",
                      color: "#BAABA0",
                    },
                    {
                      percentage: 46,
                      label: "Portfolio, program or project management",
                      color: "#9C8C80",
                    },
                    {
                      percentage: 77,
                      label: "Data",
                      color: "#694834",
                    },
                    {
                      percentage: 85,
                      label: "Digital and ICT",
                      color: "#5A3D2B",
                    },
                  ]}
                  source="SOURCE: Australian Government, State of the Service Report 2024-25, 2025, Table A-36"
                />
                </div>

                <div className={skillsVisible ? "animate-card-entrance" : ""} style={skillsVisible ? { animationDelay: "0.26s" } : undefined}>
                <SkillsBarChart
                  title="Digital and ICT Skills Identified as being in Critical Shortage"
                  animate={skillsOpen}
                  bars={[
                    {
                      percentage: 42,
                      label: "ICT/Digital project management",
                      color: "#DDD5CE",
                    },
                    {
                      percentage: 44,
                      label:
                        "Infrastructure engineering (including network and cloud engineering)",
                      color: "#BAABA0",
                    },
                    {
                      percentage: 53,
                      label:
                        "Training and development of artificial intelligence (AI) models",
                      color: "#9C8C80",
                    },
                    {
                      percentage: 64,
                      label:
                        "Enterprise/technology architecture (including internal digital transformation)",
                      color: "#694834",
                    },
                    {
                      percentage: 79,
                      label: "Digital and ICT",
                      color: "#5A3D2B",
                    },
                  ]}
                  source="SOURCE: Australian Government, State of the Service Report 2024-25, 2025, Table A-37"
                />
                </div>
              </div>

              {/* Two Highlight Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group bg-[#EDE9DC] rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="space-y-2">
                    <span className="text-3xl sm:text-4xl font-bold text-gray900 block leading-none">
                      85%
                    </span>
                    <p className="text-sm sm:text-base font-bold text-gray800 leading-snug">
                      of respondents identified Digital and ICT skills as being
                      in shortage
                    </p>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#598303] font-medium">
                    SOURCE: Australian Government, State of the Service Report
                    2024-25, 2025, Table A-36
                  </p>
                </div>

                <div className="group bg-[#EDE9DC] rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="space-y-2">
                    <span className="text-3xl sm:text-4xl font-bold text-gray900 block leading-none">
                      79%
                    </span>
                    <p className="text-sm sm:text-base font-bold text-gray800 leading-snug">
                      of respondents felt Cyber Security skills were the most
                      lacking capability
                    </p>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#598303] font-medium">
                    SOURCE: Australian Government, State of the Service report
                    2024-25
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Sources Card */}
        <div ref={sourcesRef} className={`bg-white border border-gray200 rounded-2xl p-6 space-y-4 transition-all duration-500 hover:border-[#BAABA0] hover:shadow-lg ${sourcesVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
          <h3 className="font-bold text-xl text-gray800">Sources</h3>

          <div className="space-y-3 text-xs text-gray600 leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#598303] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                7
              </span>
              <p>
                Australian Government, State of the Service report 2024-25,
                Australian Public Service Commission, 2025, accessed 2 February
                2026.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#598303] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                8
              </span>
              <p>
                Australian Government, State of the Service report 2024-25,
                Australian Public Service Commission, 2025, accessed 2 February
                2026.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#598303] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                9
              </span>
              <p>
                Australian Government, State of the Service report 2024-25,
                Australian Public Service Commission, 2025, accessed 2 February
                2026.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#598303] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                10
              </span>
              <p>
                Jobs and Skills Australia (JSA), Employment projections – May
                2025 to May 2035 [data table], JSA, 2025, accessed 4 February
                2026.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#598303] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                11
              </span>
              <p>
                Australian Government, State of the Service report 2024-25,
                Australian Public Service Commission, 2025, accessed 2 February
                2026, p.329.
              </p>
            </div>
          </div>
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
