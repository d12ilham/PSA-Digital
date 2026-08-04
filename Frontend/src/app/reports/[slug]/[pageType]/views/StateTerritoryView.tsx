"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Download, Search } from "lucide-react";

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

interface StateData {
  code: string;
  name: string;
  employees: string;
  councils: number;
  topShortages: string[];
  oslTable: {
    occupation: string;
    stateShortage: "NS" | "R" | "S";
    nationalShortage: "NS" | "R" | "S";
  }[];
  lgSpecificShortages: string[];
}

const STATES_DATA: Record<string, StateData> = {
  NSW: {
    code: "NSW",
    name: "New South Wales",
    employees: "65,200",
    councils: 128,
    topShortages: [
      "IT Officer / Cyber Specialist",
      "Planner (including Town and Urban)",
      "Engineer (including Civil and Environmental)",
      "Tradesperson (including Mechanic and Construction)",
      "Building Surveyor",
    ],
    oslTable: [
      {
        occupation: "IT Officer / Cyber Specialist",
        stateShortage: "NS",
        nationalShortage: "NS",
      },
      { occupation: "Planner", stateShortage: "R", nationalShortage: "R" },
      { occupation: "Engineer", stateShortage: "S", nationalShortage: "S" },
      {
        occupation: "Tradesperson",
        stateShortage: "S",
        nationalShortage: "NS",
      },
      {
        occupation: "Building Surveyor",
        stateShortage: "S",
        nationalShortage: "S",
      },
    ],
    lgSpecificShortages: [
      "IT Officer / Cyber Specialist",
      "Planner (including Town and Urban)",
      "Tradesperson (including Mechanic and Construction)",
    ],
  },
  NT: {
    code: "NT",
    name: "Northern Territory",
    employees: "5,000",
    councils: 18,
    topShortages: [
      "Community Program Coordinator",
      "Community Service Roles",
      "Managerial Roles",
      "Works Officer",
      "Tradesperson",
    ],
    oslTable: [
      {
        occupation: "Community Program Coordinator",
        stateShortage: "S",
        nationalShortage: "NS",
      },
      {
        occupation: "Community Service Roles",
        stateShortage: "S",
        nationalShortage: "NS",
      },
      {
        occupation: "Managerial Roles",
        stateShortage: "S",
        nationalShortage: "NS",
      },
      {
        occupation: "Works Officer",
        stateShortage: "S",
        nationalShortage: "NS",
      },
      {
        occupation: "Tradesperson",
        stateShortage: "S",
        nationalShortage: "NS",
      },
    ],
    lgSpecificShortages: [
      "Community Program Coordinator",
      "Community Service Roles",
      "Works Officer",
    ],
  },
  QLD: {
    code: "QLD",
    name: "Queensland",
    employees: "48,800",
    councils: 77,
    topShortages: [
      "Engineer (including Civil and Operations)",
      "Town Planner",
      "Water Operations Officer",
      "IT Officer / Cyber Specialist",
      "Project Manager / Business Analyst",
    ],
    oslTable: [
      { occupation: "Engineer", stateShortage: "NS", nationalShortage: "S" },
      {
        occupation: "Town Planner",
        stateShortage: "NS",
        nationalShortage: "R",
      },
      {
        occupation: "Water Operations Officer",
        stateShortage: "NS",
        nationalShortage: "NS",
      },
      { occupation: "IT Officer", stateShortage: "NS", nationalShortage: "NS" },
      {
        occupation: "Project Manager",
        stateShortage: "NS",
        nationalShortage: "NS",
      },
    ],
    lgSpecificShortages: [
      "Water Operations Officer",
      "Project Manager / Business Analyst",
    ],
  },
  SA: {
    code: "SA",
    name: "South Australia",
    employees: "11,700",
    councils: 68,
    topShortages: [
      "Building Surveyor",
      "Civil Engineer / Operations",
      "Arborist",
      "Project Manager / Business Analyst",
      "Community Development Officer",
    ],
    oslTable: [
      {
        occupation: "Building Surveyor",
        stateShortage: "S",
        nationalShortage: "S",
      },
      {
        occupation: "Civil Engineer",
        stateShortage: "S",
        nationalShortage: "S",
      },
      { occupation: "Arborist", stateShortage: "S", nationalShortage: "S" },
      {
        occupation: "Project Manager",
        stateShortage: "NS",
        nationalShortage: "NS",
      },
    ],
    lgSpecificShortages: ["Community Development Officer", "Building Surveyor"],
  },
  TAS: {
    code: "TAS",
    name: "Tasmania",
    employees: "4,800",
    councils: 29,
    topShortages: [
      "Urban/Town Planner",
      "Building Surveyor",
      "Engineer",
      "Plumbing Inspector",
    ],
    oslTable: [
      {
        occupation: "Urban and Regional Planner",
        stateShortage: "R",
        nationalShortage: "R",
      },
      {
        occupation: "Building Surveyor",
        stateShortage: "S",
        nationalShortage: "S",
      },
      {
        occupation: "Civil Engineer",
        stateShortage: "S",
        nationalShortage: "S",
      },
      {
        occupation: "Plumbing Inspectors",
        stateShortage: "NS",
        nationalShortage: "NS",
      },
    ],
    lgSpecificShortages: ["Plumbing Inspector"],
  },
  VIC: {
    code: "VIC",
    name: "Victoria",
    employees: "56,100",
    councils: 79,
    topShortages: [
      "Mechanic",
      "Human Resources",
      "Maternal Child Health Nurses",
      "Environmental Officer",
      "Finance (rates) Officer",
    ],
    oslTable: [
      { occupation: "Mechanic", stateShortage: "NS", nationalShortage: "NS" },
      {
        occupation: "Human Resources",
        stateShortage: "NS",
        nationalShortage: "NS",
      },
      {
        occupation: "Maternal Child Health Nurses",
        stateShortage: "S",
        nationalShortage: "S",
      },
      {
        occupation: "Environmental Officer",
        stateShortage: "NS",
        nationalShortage: "R",
      },
    ],
    lgSpecificShortages: [
      "Mechanic",
      "Human Resources",
      "Finance (rates) Officer",
    ],
  },
  WA: {
    code: "WA",
    name: "Western Australia",
    employees: "26,500",
    councils: 139,
    topShortages: [
      "Environmental Officer",
      "Corporate Performance",
      "IT Officer / Cyber Specialist",
      "Building Surveyor",
      "Civil Engineer",
    ],
    oslTable: [
      {
        occupation: "Environmental Officer",
        stateShortage: "R",
        nationalShortage: "R",
      },
      {
        occupation: "Corporate Performance",
        stateShortage: "NS",
        nationalShortage: "NS",
      },
      { occupation: "IT Officer", stateShortage: "NS", nationalShortage: "NS" },
      {
        occupation: "Building Surveyor",
        stateShortage: "R",
        nationalShortage: "S",
      },
    ],
    lgSpecificShortages: ["Environmental Officer", "Corporate Performance"],
  },
};

const NATIONAL_OCCUPATIONS = [
  {
    name: "Building Surveyor",
    aus: "R",
    nsw: "R",
    nt: "-",
    qld: "-",
    sa: "S",
    tas: "S",
    vic: "-",
    wa: "-",
  },
  {
    name: "Engineer (including Civil, Environmental and Operations)",
    aus: "S",
    nsw: "S",
    nt: "-",
    qld: "NS",
    sa: "S",
    tas: "S",
    vic: "-",
    wa: "-",
  },
  {
    name: "Arborist",
    aus: "S",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "S",
    tas: "-",
    vic: "S",
    wa: "-",
  },
  {
    name: "Planner (including Town, Urban and Regional)",
    aus: "R",
    nsw: "R",
    nt: "-",
    qld: "R",
    sa: "-",
    tas: "R",
    vic: "R",
    wa: "R",
  },
  {
    name: "Maternal Child Health Nurse",
    aus: "S",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "S",
    wa: "-",
  },
  {
    name: "Tradesperson (including Mechanic and Construction)",
    aus: "NS",
    nsw: "S",
    nt: "S",
    qld: "NS",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Community Program Coordinator",
    aus: "NS",
    nsw: "-",
    nt: "S",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Community Service Roles",
    aus: "NS",
    nsw: "-",
    nt: "S",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Environmental Officer",
    aus: "R",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "R",
  },
  {
    name: "Managerial Roles",
    aus: "NS",
    nsw: "-",
    nt: "S",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Works Officer",
    aus: "NS",
    nsw: "-",
    nt: "S",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Community Development Officer",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "NS",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Corporate Performance",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "NS",
  },
  {
    name: "Finance (rates) Officer",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "NS",
    wa: "-",
  },
  {
    name: "Human Resources",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "NS",
    wa: "-",
  },
  {
    name: "IT Officer / Cyber Specialist",
    aus: "NS",
    nsw: "NS",
    nt: "-",
    qld: "NS",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "NS",
  },
  {
    name: "Mechanic",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "NS",
    wa: "-",
  },
  {
    name: "Plumbing Inspector",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "NS",
    vic: "-",
    wa: "-",
  },
  {
    name: "Project Manager / Business Analyst",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "NS",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Water Operations Officer",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "NS",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
];

export default function StateTerritoryView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"single" | "compare">("single");
  const [selectedState, setSelectedState] = useState<string>("NSW");
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<
    "all" | "shortage" | "regional" | "noshortage"
  >("all");

  const currentState = STATES_DATA[selectedState] || STATES_DATA.NSW;

  const renderBadge = (status: string) => {
    if (status === "NS") {
      return (
        <span className="inline-block bg-[#A1C950] text-[#1B240E] font-bold text-xs px-2.5 py-1 rounded-md">
          NS
        </span>
      );
    }
    if (status === "R") {
      return (
        <span className="inline-block bg-[#EBE459] text-[#1B240E] font-bold text-xs px-2.5 py-1 rounded-md">
          R
        </span>
      );
    }
    if (status === "S") {
      return (
        <span className="inline-block bg-[#B82B00] text-white font-bold text-xs px-2.5 py-1 rounded-md">
          S
        </span>
      );
    }
    if (!isNaN(Number(status))) {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#A1C950] text-[#1B240E] font-bold text-xs">
          {status}
        </span>
      );
    }
    return (
      <span className="text-foreground/40 font-mono text-xs">{status}</span>
    );
  };

  const filteredOccupations = NATIONAL_OCCUPATIONS.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (ratingFilter === "shortage") return item.aus === "S";
    if (ratingFilter === "regional") return item.aus === "R";
    if (ratingFilter === "noshortage") return item.aus === "NS";
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <header className="bg-[#161b01] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div
            onClick={() => router.push(`/reports/${slug}`)}
            className="flex items-center gap-2 cursor-pointer font-extrabold text-base text-white hover:text-accent transition-colors"
          >
            <span>LG WIR {report.year?.label || "2026"}</span>
          </div>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs font-semibold">
            <div className="relative group py-1">
              <button className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer">
                About <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-48 space-y-1 z-50">
                <button
                  onClick={() => router.push(`/reports/${slug}/introduction`)}
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Introduction
                </button>
                <button
                  onClick={() => router.push(`/reports/${slug}/about`)}
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  About Public Skills Australia
                </button>
                <button
                  onClick={() => router.push(`/reports/${slug}/methodology`)}
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Methodology
                </button>
              </div>
            </div>

            <button
              onClick={() => router.push(`/reports/${slug}/executive_summary`)}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Executive Summary
            </button>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/drivers_of_change`)
                }
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
              >
                Drivers of Change <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-48 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/drivers_of_change`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Drivers of Change
                </button>
                <button
                  onClick={() => router.push(`/reports/${slug}/megatrends`)}
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Nine Megatrends
                </button>
              </div>
            </div>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/industry_overview`)
                }
                className="flex items-center gap-1 text-accent font-bold cursor-pointer"
              >
                Industry Overview <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-56 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/industry_overview`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Industry-Sector Overview
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/state_territory`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-accent font-bold hover:bg-white/10 rounded-lg transition-colors"
                >
                  State and Territory Profile
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/industry_profile`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Industry Profile
                </button>
              </div>
            </div>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
              >
                Workforce Insights <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-48 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Insights Overview
                </button>
              </div>
            </div>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_strategies`)
                }
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
              >
                Workforce Strategies <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-56 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_strategies`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  2026 Proposed Strategies
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/existing_strategies`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Existing Strategies
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/federal_initiatives`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Federal Initiatives
                </button>
              </div>
            </div>

            <button
              onClick={() => router.push(`/reports/${slug}/looking_forward`)}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Looking Forward
            </button>
          </nav>

          <div>
            {report.pdfFileUrl ? (
              <a
                href={report.pdfFileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0C582B] hover:bg-[#046D2A] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Download 2026 PDF</span>
                <Download className="h-3.5 w-3.5" />
              </a>
            ) : (
              <button
                onClick={() => router.push(`/reports/${slug}`)}
                className="bg-[#0C582B] hover:bg-[#046D2A] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Download 2026 PDF</span>
                <Download className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => router.push(`/reports/${slug}/industry_overview`)}
            className="border border-border bg-white hover:bg-gray-50 text-foreground font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Industry-Sector
            Overview
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/industry_profile`)}
            className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            Next Section: Industry Profile{" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ── HERO BANNER & VIEW MODE TOGGLE ── */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#046D2A]">
              Local Government Workforce Profile
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs sm:text-sm text-foreground/80 leading-relaxed font-normal">
              <p>
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
              <p>
                The Local Government workforce is multidisciplinary, employing
                over an estimated 400 different occupations across approximately
                218,000 employees – managed individually at the local council
                level and commonly represented through state and territory
                associations and the Australian Local Government Association
                (ALGA). While employment projections estimate significant growth
                over the next ten years, successive Workforce Plans and
                Parliamentary Commissions of Inquiry have noted extensive
                challenges with recruitment and retention, and a significant
                expansion of roles and responsibilities.
              </p>
            </div>
          </div>

          {/* Mode Switcher Pill Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setViewMode("single")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === "single"
                  ? "bg-[#85B810] text-[#1B240E] shadow-xs"
                  : "bg-[#F2F3EC] text-foreground/70 hover:bg-[#e4e6d9]"
              }`}
            >
              Single state
            </button>
            <button
              onClick={() => setViewMode("compare")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === "compare"
                  ? "bg-[#85B810] text-[#1B240E] shadow-xs"
                  : "bg-[#F2F3EC] text-foreground/70 hover:bg-[#e4e6d9]"
              }`}
            >
              Compare all states
            </button>
          </div>
        </div>

        {/* ── MODE A: SINGLE STATE VIEW ── */}
        {viewMode === "single" && (
          <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
            {/* Jurisdiction Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-border/60">
              <span className="text-xs font-extrabold text-foreground/70 uppercase mr-3">
                CHOOSE A STATE OR TERRITORY
              </span>
              {["NATIONAL", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"].map(
                (code) => (
                  <button
                    key={code}
                    onClick={() => setSelectedState(code)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedState === code
                        ? "bg-[#85B810] text-[#1B240E] shadow-2xs"
                        : "bg-[#F2F3EC] text-foreground/80 hover:bg-[#e4e6d9]"
                    }`}
                  >
                    {code}
                  </button>
                ),
              )}
            </div>

            {selectedState === "NATIONAL" ? (
              /* NATIONAL SINGLE VIEW */
              <div className="space-y-8">
                {/* 3 National Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#FAFBF6] border border-border/60 rounded-xl p-4 space-y-1">
                    <span className="text-2xl font-extrabold text-[#728C28] block">
                      218,000
                    </span>
                    <p className="text-xs font-semibold text-foreground/80">
                      Local Government employees as of June 2025
                    </p>
                    <p className="text-xs text-foreground/50 pt-1">
                      Source: ABS, Public Sector Employment and Earnings, 2025,
                      Table 1
                    </p>
                  </div>

                  <div className="bg-[#FAFBF6] border border-border/60 rounded-xl p-4 space-y-1">
                    <span className="text-2xl font-extrabold text-[#728C28] block">
                      49.1% Female / 50.9% Male
                    </span>
                    <p className="text-xs font-semibold text-foreground/80">
                      National Workforce Composition
                    </p>
                    <p className="text-xs text-foreground/50 pt-1">
                      Source: ALGA, 2022 Workforce Skills and Capability Survey
                      Table D2
                    </p>
                  </div>

                  <div className="bg-[#FAFBF6] border border-border/60 rounded-xl p-4 space-y-1">
                    <span className="text-2xl font-extrabold text-[#728C28] block">
                      9.2% First Nations
                    </span>
                    <p className="text-xs font-semibold text-foreground/80">
                      of national workforce identifies as First Nations (vs 3.8%
                      of national pop.)
                    </p>
                    <p className="text-xs text-foreground/50 pt-1">
                      Source: ALGA, 2022 Workforce Skills and Capability Survey
                      Table D8
                    </p>
                  </div>
                </div>

                {/* National Australia Map & Shortage Comparison Table */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Australia Map Box */}
                  <div className="lg:col-span-4 bg-[#F2F4EB] border border-border/50 rounded-2xl p-5 space-y-4">
                    <span className="font-extrabold text-sm text-foreground block">
                      National Map
                    </span>
                    <div className="w-full h-72 bg-[#E2ECC8] rounded-xl flex items-center justify-center p-4">
                      <span className="text-xs font-bold text-[#046D2A] text-center">
                        [ Australia Interactive Map ]<br />
                        537 Councils · 218,000 Employees
                      </span>
                    </div>
                    <p className="text-xs text-foreground/60 italic">
                      Source: ABS, Public sector employment and earnings, 2025.
                    </p>
                  </div>

                  {/* Right Occupation Shortage Comparison Table */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h3 className="font-extrabold text-xl text-foreground">
                        National Occupation Shortage Comparison
                      </h3>
                      <span className="text-xs font-semibold text-foreground/60">
                        20 of 20 occupations shown
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative flex-1 min-w-48">
                        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
                        <input
                          type="text"
                          placeholder="Search by Occupation"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-[#FAFBF6] border border-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[#85B810]"
                        />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setRatingFilter("all")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            ratingFilter === "all"
                              ? "bg-[#85B810] text-[#1B240E]"
                              : "bg-[#F2F3EC] text-foreground/70"
                          }`}
                        >
                          All Ratings
                        </button>
                        <button
                          onClick={() => setRatingFilter("shortage")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            ratingFilter === "shortage"
                              ? "bg-[#85B810] text-[#1B240E]"
                              : "bg-[#F2F3EC] text-foreground/70"
                          }`}
                        >
                          Shortages
                        </button>
                        <button
                          onClick={() => setRatingFilter("regional")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            ratingFilter === "regional"
                              ? "bg-[#85B810] text-[#1B240E]"
                              : "bg-[#F2F3EC] text-foreground/70"
                          }`}
                        >
                          Regional shortage
                        </button>
                        <button
                          onClick={() => setRatingFilter("noshortage")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            ratingFilter === "noshortage"
                              ? "bg-[#85B810] text-[#1B240E]"
                              : "bg-[#F2F3EC] text-foreground/70"
                          }`}
                        >
                          No Shortage
                        </button>
                      </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto border border-border rounded-xl">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#F2F3EC] border-b border-border text-foreground font-extrabold uppercase">
                            <th className="p-3">Occupation</th>
                            <th className="p-3 text-center">AUS</th>
                            <th className="p-3 text-center">NSW</th>
                            <th className="p-3 text-center">NT</th>
                            <th className="p-3 text-center">QLD</th>
                            <th className="p-3 text-center">SA</th>
                            <th className="p-3 text-center">TAS</th>
                            <th className="p-3 text-center">VIC</th>
                            <th className="p-3 text-center">WA</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60 bg-white">
                          {filteredOccupations.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/80">
                              <td className="p-3 font-semibold text-foreground">
                                {item.name}
                              </td>
                              <td className="p-3 text-center">
                                {renderBadge(item.aus)}
                              </td>
                              <td className="p-3 text-center">
                                {renderBadge(item.nsw)}
                              </td>
                              <td className="p-3 text-center">
                                {renderBadge(item.nt)}
                              </td>
                              <td className="p-3 text-center">
                                {renderBadge(item.qld)}
                              </td>
                              <td className="p-3 text-center">
                                {renderBadge(item.sa)}
                              </td>
                              <td className="p-3 text-center">
                                {renderBadge(item.tas)}
                              </td>
                              <td className="p-3 text-center">
                                {renderBadge(item.vic)}
                              </td>
                              <td className="p-3 text-center">
                                {renderBadge(item.wa)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* SPECIFIC STATE DASHBOARD (NSW, TAS, QLD, etc.) */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Zoomed Map Box */}
                <div className="lg:col-span-5 bg-[#F2F4EB] border border-border/50 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xl font-extrabold text-foreground">
                    {currentState.name}
                  </h3>

                  <div className="w-full h-80 bg-[#E2ECC8] rounded-2xl relative flex items-center justify-center p-6 overflow-hidden">
                    <div className="space-y-3 text-center">
                      <div className="bg-white rounded-xl p-3 shadow-md inline-block">
                        <span className="text-2xl font-extrabold text-[#728C28] block">
                          {currentState.employees}
                        </span>
                        <span className="text-xs font-semibold text-foreground/75">
                          Employees
                        </span>
                      </div>
                      <br />
                      <div className="bg-white rounded-xl p-3 shadow-md inline-block">
                        <span className="text-2xl font-extrabold text-[#728C28] block">
                          {currentState.councils}
                        </span>
                        <span className="text-xs font-semibold text-foreground/75">
                          Local councils
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-foreground/60 italic leading-relaxed">
                    Zoomed in from the national map – switch jurisdictions with
                    the selector above, or return to National for the
                    Australia-wide dashboard.
                  </p>
                </div>

                {/* Right State Details Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-extrabold text-foreground">
                      {currentState.name}
                    </h2>
                    <span className="bg-[#046D2A] text-white text-xs font-bold px-3 py-1 rounded-full">
                      LOCAL GOVERNMENT
                    </span>
                  </div>

                  {/* 2 Stat Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#FAFBF6] border border-border/60 rounded-xl p-4 space-y-1">
                      <span className="text-3xl font-extrabold text-[#728C28] block">
                        {currentState.employees}
                      </span>
                      <p className="text-xs font-semibold text-foreground/80">
                        Employees
                      </p>
                      <p className="text-xs text-foreground/50 pt-1">
                        Source: ABS, Public sector employment and earnings,
                        2025. Table 2
                      </p>
                    </div>

                    <div className="bg-[#FAFBF6] border border-border/60 rounded-xl p-4 space-y-1">
                      <span className="text-3xl font-extrabold text-[#728C28] block">
                        {currentState.councils}
                      </span>
                      <p className="text-xs font-semibold text-foreground/80">
                        Local councils
                      </p>
                      <p className="text-xs text-foreground/50 pt-1">
                        Source: state and territory Local Government
                        associations
                      </p>
                    </div>
                  </div>

                  {/* Section 1: Skills Audit List */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#728C28] text-white font-bold text-xs flex items-center justify-center">
                        1
                      </span>
                      <h4 className="font-extrabold text-base text-foreground">
                        Skills Audit List
                      </h4>
                    </div>

                    <div className="bg-[#FAFBF6] border border-border/60 rounded-2xl p-5 space-y-3">
                      <span className="text-xs font-extrabold text-[#728C28] uppercase block">
                        TOP 5 OCCUPATIONAL SHORTAGES
                      </span>

                      <div className="flex flex-wrap gap-2">
                        {currentState.topShortages.map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-[#0C582B] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xs"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-foreground/50 italic pt-1">
                        Source: Local Government Skills Audit consultations,
                        2026.
                      </p>
                    </div>
                  </div>

                  {/* Section 2: OSL Validation Table */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#728C28] text-white font-bold text-xs flex items-center justify-center">
                        2
                      </span>
                      <h4 className="font-extrabold text-base text-foreground">
                        Validation against the Jobs and Skills Australia
                        Occupation Shortage List (OSL)
                      </h4>
                    </div>

                    <div className="border border-border rounded-xl overflow-hidden bg-white">
                      <div className="bg-[#FAFBF6] p-3 border-b border-border flex items-center justify-between gap-4 text-xs font-bold">
                        <span className="uppercase text-foreground/70">
                          NATIONAL SHORTAGES – {currentState.code}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-[#046D2A]">
                            <span className="w-3 h-3 bg-[#A1C950] rounded-xs" />{" "}
                            NS = No Shortage
                          </span>
                          <span className="flex items-center gap-1 text-[#85B810]">
                            <span className="w-3 h-3 bg-[#EBE459] rounded-xs" />{" "}
                            R = Regional Shortage
                          </span>
                          <span className="flex items-center gap-1 text-[#B82B00]">
                            <span className="w-3 h-3 bg-[#B82B00] rounded-xs" />{" "}
                            S = Shortage
                          </span>
                        </div>
                      </div>

                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#F2F3EC] border-b border-border text-foreground font-extrabold">
                            <th className="p-3">
                              Occupation identified in shortage in{" "}
                              {currentState.code} through Skills Audit
                            </th>
                            <th className="p-3 text-center">
                              OSL – {currentState.code} specific shortage
                            </th>
                            <th className="p-3 text-center">
                              OSL – Australia wide shortage
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {currentState.oslTable.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="p-3 font-semibold text-foreground">
                                {row.occupation}
                              </td>
                              <td className="p-3 text-center">
                                {renderBadge(row.stateShortage)}
                              </td>
                              <td className="p-3 text-center">
                                {renderBadge(row.nationalShortage)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Section 3: Relevant LG Specific Occupations List */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#728C28] text-white font-bold text-xs flex items-center justify-center">
                        3
                      </span>
                      <h4 className="font-extrabold text-base text-foreground">
                        Relevant Local Government-specific Occupations List
                      </h4>
                    </div>

                    <div className="bg-[#FAFBF6] border border-border/60 rounded-2xl p-5 space-y-3">
                      <span className="text-xs font-extrabold text-[#728C28] uppercase block">
                        LOCAL GOVERNMENT SPECIFIC OCCUPATIONAL SHORTAGES
                      </span>
                      <p className="text-xs text-foreground/75 leading-relaxed">
                        Occupations in shortage specific to Local Government
                        when compared with the National Occupation Shortage
                        List:
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {currentState.lgSpecificShortages.map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-[#0C582B] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xs"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── MODE B: COMPARE ALL STATES VIEW ── */}
        {viewMode === "compare" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Total Card */}
              <div className="lg:col-span-4 bg-[#0C582B] text-white rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-xs">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase text-white/80">
                    NATIONAL
                  </span>
                  <h2 className="text-4xl font-extrabold">218,000</h2>
                  <p className="text-xs text-white/80">
                    employees as of June 2025
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20">
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <span className="text-lg font-bold block">49.1%</span>
                    <span className="text-xs text-white/70">Female</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <span className="text-lg font-bold block">50.9%</span>
                    <span className="text-xs text-white/70">Male</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <span className="text-xs font-bold text-white">
                    8.2% identify as First Nations
                  </span>
                </div>
              </div>

              {/* Right 2 Bar Chart Cards */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Chart 1: Employees by state */}
                <div className="bg-white border border-border rounded-2xl p-6 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-foreground/50 uppercase block">
                    SOURCE: ABS, PUBLIC SECTOR EMPLOYMENT AND EARNINGS, 2025,
                    TABLE 2
                  </span>
                  <h3 className="font-extrabold text-base text-foreground">
                    Employees by state and territory
                  </h3>

                  <div className="space-y-2.5 pt-2">
                    {[
                      { code: "NSW", val: "65,200", pct: "90%" },
                      { code: "VIC", val: "56,100", pct: "78%" },
                      { code: "QLD", val: "48,800", pct: "68%" },
                      { code: "WA", val: "26,500", pct: "37%" },
                      { code: "SA", val: "11,700", pct: "16%" },
                      { code: "TAS", val: "4,800", pct: "8%" },
                      { code: "NT", val: "5,000", pct: "7%" },
                    ].map((item) => (
                      <div
                        key={item.code}
                        className="flex items-center gap-3 text-xs"
                      >
                        <span className="w-8 font-bold text-foreground">
                          {item.code}
                        </span>
                        <div className="flex-1 bg-[#F2F3EC] h-4 rounded-full overflow-hidden">
                          <div
                            className="bg-[#85B810] h-full rounded-full"
                            style={{ width: item.pct }}
                          />
                        </div>
                        <span className="w-12 text-right font-semibold text-foreground/75">
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart 2: Councils by state */}
                <div className="bg-white border border-border rounded-2xl p-6 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-foreground/50 uppercase block">
                    SOURCE: STATE AND TERRITORY LOCAL GOVERNMENT ASSOCIATIONS
                  </span>
                  <h3 className="font-extrabold text-base text-foreground">
                    Councils by state and territory
                  </h3>

                  <div className="space-y-2.5 pt-2">
                    {[
                      { code: "WA", val: "139", pct: "95%" },
                      { code: "NSW", val: "128", pct: "88%" },
                      { code: "VIC", val: "79", pct: "55%" },
                      { code: "QLD", val: "77", pct: "53%" },
                      { code: "SA", val: "68", pct: "46%" },
                      { code: "TAS", val: "29", pct: "20%" },
                      { code: "NT", val: "18", pct: "12%" },
                    ].map((item) => (
                      <div
                        key={item.code}
                        className="flex items-center gap-3 text-xs"
                      >
                        <span className="w-8 font-bold text-foreground">
                          {item.code}
                        </span>
                        <div className="flex-1 bg-[#F2F3EC] h-4 rounded-full overflow-hidden">
                          <div
                            className="bg-[#0C582B] h-full rounded-full"
                            style={{ width: item.pct }}
                          />
                        </div>
                        <span className="w-8 text-right font-semibold text-foreground/75">
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Matrix Table */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-extrabold text-xl text-foreground">
                All States Occupation Shortages Matrix
              </h3>

              <div className="overflow-x-auto border border-border rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F2F3EC] border-b border-border text-foreground font-extrabold uppercase">
                      <th className="p-3">Occupation</th>
                      <th className="p-3 text-center">AUS</th>
                      <th className="p-3 text-center">NSW</th>
                      <th className="p-3 text-center">NT</th>
                      <th className="p-3 text-center">QLD</th>
                      <th className="p-3 text-center">SA</th>
                      <th className="p-3 text-center">TAS</th>
                      <th className="p-3 text-center">VIC</th>
                      <th className="p-3 text-center">WA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 bg-white">
                    {NATIONAL_OCCUPATIONS.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="p-3 font-semibold text-foreground">
                          {item.name}
                        </td>
                        <td className="p-3 text-center">
                          {renderBadge(item.aus)}
                        </td>
                        <td className="p-3 text-center">
                          {renderBadge(item.nsw)}
                        </td>
                        <td className="p-3 text-center">
                          {renderBadge(item.nt)}
                        </td>
                        <td className="p-3 text-center">
                          {renderBadge(item.qld)}
                        </td>
                        <td className="p-3 text-center">
                          {renderBadge(item.sa)}
                        </td>
                        <td className="p-3 text-center">
                          {renderBadge(item.tas)}
                        </td>
                        <td className="p-3 text-center">
                          {renderBadge(item.vic)}
                        </td>
                        <td className="p-3 text-center">
                          {renderBadge(item.wa)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#161b01] text-white py-4 px-6 sm:px-8 border-t border-[#252D02]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-white/80">
            © Public Skills Australia 2026 · Local Government Workforce Insights
            Report
          </p>
          <a
            href={
              report.contactUrl ||
              "https://publicskillsaustralia.org.au/contact"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:text-white font-semibold no-underline"
          >
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
}
