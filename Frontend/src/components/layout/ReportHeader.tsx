"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";

import { resolveSector } from "@/config/reports/sectors";
import FederalStateReportHeader from "@/components/reports/federal-state/FederalStateReportHeader";

interface ReportHeaderProps {
  slug: string;
  report: {
    year?: { label: string };
    pdfFileUrl?: string;
    industry?: { slug?: string; name?: string };
  };
  currentPage?: string;
  sectorPalette?: boolean;
}

export default function ReportHeader({
  slug,
  report,
  currentPage,
  sectorPalette = false,
}: ReportHeaderProps) {
  const router = useRouter();
  const sector = resolveSector(report?.industry?.slug || report?.industry?.name, slug);
  const isCorrectionalServices = sector.id === "correctional-services";
  const activeNavClass = isCorrectionalServices
    ? "text-[#8AC900] font-bold"
    : "text-accent font-bold";
  const inactiveNavClass = isCorrectionalServices
    ? "text-white hover:text-[#8AC900]"
    : "text-white/80 hover:text-white";
  const dropdownClass = `absolute top-full left-0 hidden group-hover:block ${isCorrectionalServices ? "bg-[#252D02]" : "bg-[#161b01]"} border border-white/10 rounded-xl p-2 space-y-1 z-50 shadow-xl`;

  if (sector.id === "federal-state") {
    return <FederalStateReportHeader slug={slug} year={report?.year?.label || sector.defaultYear} sectorPalette={sectorPalette} />;
  }

  return (
    <header
      className="text-white sticky top-0 z-50 transition-colors"
      style={{ backgroundColor: isCorrectionalServices ? "#252D02" : sector.theme.headerBg }}
    >
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div
          onClick={() => router.push(`/reports/${slug}`)}
          className="flex items-center gap-2 cursor-pointer font-bold text-base text-white transition-colors"
        >
          <span>
            {sector.shortCode}{" "}
            <span style={{ color: isCorrectionalServices ? "#B2DB79" : sector.theme.accentColor }}>
              {report?.year?.label || sector.defaultYear}
            </span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs font-semibold">
          {/* 1. ABOUT DROPDOWN */}
          <div className="relative group py-1">
            <button className={`flex items-center gap-1 cursor-pointer ${currentPage === "about" || currentPage === "introduction" || currentPage === "methodology" ? activeNavClass : inactiveNavClass}`}>
              About <span>▾</span>
            </button>
            <div className={`${dropdownClass} min-w-48`}>
              <button
                onClick={() => router.push(`/reports/${slug}/introduction`)}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${currentPage === "introduction" ? `${activeNavClass} bg-white/10` : `${inactiveNavClass} hover:bg-white/10`}`}
              >
                Introduction
              </button>
              <button
                onClick={() => router.push(`/reports/${slug}/about`)}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${currentPage === "about" ? `${activeNavClass} bg-white/10` : `${inactiveNavClass} hover:bg-white/10`}`}
              >
                About Public Skills Australia
              </button>
              <button
                onClick={() => router.push(`/reports/${slug}/methodology`)}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${currentPage === "methodology" ? `${activeNavClass} bg-white/10` : `${inactiveNavClass} hover:bg-white/10`}`}
              >
                Methodology
              </button>
            </div>
          </div>

          {/* 2. EXECUTIVE SUMMARY */}
          <button
            onClick={() => router.push(`/reports/${slug}/executive_summary`)}
            className={`transition-colors cursor-pointer ${currentPage === "executive_summary" ? activeNavClass : inactiveNavClass}`}
          >
            Executive Summary
          </button>

          {/* 3. AFTER ROUTING UPDATE: DRIVERS OF CHANGE */}
          <button
            onClick={() => router.push(`/reports/${slug}/drivers_of_change`)}
            className={`transition-colors cursor-pointer ${currentPage === "drivers_of_change" || currentPage === "megatrends" ? activeNavClass : inactiveNavClass}`}
          >
            Drivers of Change
          </button>

          {/* 4. INDUSTRY OVERVIEW DROPDOWN */}
          <div className="relative group py-1">
            <button
              onClick={() => router.push(`/reports/${slug}/industry_overview`)}
              className={`flex items-center gap-1 cursor-pointer ${currentPage === "industry_overview" || currentPage === "industry_profile" ? activeNavClass : inactiveNavClass}`}
            >
              Industry Overview <span>▾</span>
            </button>
            <div className={`${dropdownClass} min-w-56`}>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/industry_overview`)
                }
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${currentPage === "industry_overview" ? `${activeNavClass} bg-white/10` : `${inactiveNavClass} hover:bg-white/10`}`}
              >
                Industry-Sector Overview
              </button>
              <button
                onClick={() => router.push(`/reports/${slug}/${isCorrectionalServices ? "industry_profile_presentation" : "industry_profile"}`)}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${currentPage === "industry_profile" ? `${activeNavClass} bg-white/10` : `${inactiveNavClass} hover:bg-white/10`}`}
              >
                Industry Profile
              </button>
            </div>
          </div>
          {/* 5. WORKFORCE INSIGHTS DROPDOWN */}
          <div className="relative group py-1">
            <button
              onClick={() => router.push(`/reports/${slug}/workforce_insights`)}
              className={`flex items-center gap-1 cursor-pointer ${currentPage === "workforce_insights" || currentPage === "contextualisation_of_qualifications" || currentPage === "contextualisation" ? activeNavClass : inactiveNavClass}`}
            >
              Workforce Insights <span>▾</span>
            </button>
            <div className={`${dropdownClass} min-w-56`}>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${currentPage === "workforce_insights" ? `${activeNavClass} bg-white/10` : `${inactiveNavClass} hover:bg-white/10`}`}
              >
                Workforce Insights Overview
              </button>
            </div>
          </div>


          {/* 6. WORKFORCE STRATEGIES DROPDOWN */}
          <div className="relative group py-1">
            <button
              onClick={() =>
                router.push(`/reports/${slug}/workforce_strategies`)
              }
              className={`flex items-center gap-1 cursor-pointer ${currentPage === "workforce_strategies" || currentPage === "update_2024_strategies" || currentPage === "update_2024_demand_management" || currentPage === "update_2024_workforce_mobility" || currentPage === "update_2025_strategies" || currentPage === "update_2025_training_pathways" || currentPage === "update_2025_first_nations_participation" || currentPage === "existing_strategies" || currentPage === "industry_strategies" || currentPage === "federal_initiatives" || currentPage === "federal_government_initiatives" ? activeNavClass : inactiveNavClass}`}
            >
              Workforce Strategies <span>▾</span>
            </button>
            <div className={`${dropdownClass} min-w-64`}>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_strategies`)
                }
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${currentPage === "workforce_strategies" ? `${activeNavClass} bg-white/10` : `${inactiveNavClass} hover:bg-white/10`}`}
              >
                2026 Proposed Strategies
              </button>
              {isCorrectionalServices && (
                <button
                  onClick={() => router.push(`/reports/${slug}/update_2024_strategies`)}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${currentPage === "update_2024_strategies" || currentPage === "update_2024_demand_management" || currentPage === "update_2024_workforce_mobility" ? `${activeNavClass} bg-white/10` : `${inactiveNavClass} hover:bg-white/10`}`}
                >
                  Update on 2024 Strategies
                </button>
              )}
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/update_2025_strategies`)
                }
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${currentPage === "update_2025_strategies" || currentPage === "update_2025_training_pathways" || currentPage === "update_2025_first_nations_participation" ? `${activeNavClass} bg-white/10` : `${inactiveNavClass} hover:bg-white/10`}`}
              >
                Update on 2025 Strategies
              </button>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/existing_strategies`)
                }
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${currentPage === "existing_strategies" || currentPage === "industry_strategies" ? `${activeNavClass} bg-white/10` : `${inactiveNavClass} hover:bg-white/10`}`}
              >
                Existing Industry-Sector Strategies
              </button>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/federal_initiatives`)
                }
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${currentPage === "federal_initiatives" || currentPage === "federal_government_initiatives" ? `${activeNavClass} bg-white/10` : `${inactiveNavClass} hover:bg-white/10`}`}
              >
                Federal Government Initiatives
              </button>
            </div>
          </div>


          {/* 7. LOOKING FORWARD (NO ARROW) */}
          <button
            onClick={() => router.push(`/reports/${slug}/looking_forward`)}
            className={`transition-colors cursor-pointer ${currentPage === "looking_forward" ? activeNavClass : inactiveNavClass}`}
          >
            Looking Forward
          </button>
        </nav>

        {/* 8. DOWNLOAD CTA */}
        <div>
          <button
            onClick={() => router.push(`/reports/${slug}/downloads`)}
            className="text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
            style={{ backgroundColor: isCorrectionalServices ? "#046D2A" : sector.theme.primaryColor }}
          >
            <span>Download {report?.year?.label || sector.defaultYear} PDF</span>
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
