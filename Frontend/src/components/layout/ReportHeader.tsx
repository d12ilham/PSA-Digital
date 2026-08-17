"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";

interface ReportHeaderProps {
  slug: string;
  report: {
    year?: { label: string };
    pdfFileUrl?: string;
  };
  currentPage?: string;
}

export default function ReportHeader({
  slug,
  report,
  currentPage,
}: ReportHeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-[#252D02] text-white sticky top-0 z-50">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div
          onClick={() => router.push(`/reports/${slug}`)}
          className="flex items-center gap-2 cursor-pointer font-bold text-base text-white hover:text-accent transition-colors"
        >
          <span>
            LG WIR{" "}
            <span className="text-[#B2DB79]">
              {report?.year?.label || "2026"}
            </span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs font-semibold">
          <div className="relative group py-1">
            <button className="flex items-center gap-1 text-accent font-bold cursor-pointer">
              About <span>▾</span>
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl p-2 min-w-48 space-y-1 z-50">
              <button
                onClick={() => router.push(`/reports/${slug}/introduction`)}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${
                  currentPage === "introduction"
                    ? "text-accent font-bold bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Introduction
              </button>
              <button
                onClick={() => router.push(`/reports/${slug}/about`)}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${
                  currentPage === "about"
                    ? "text-accent font-bold bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                About Public Skills Australia
              </button>
              <button
                onClick={() => router.push(`/reports/${slug}/methodology`)}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${
                  currentPage === "methodology"
                    ? "text-accent font-bold bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Methodology
              </button>
            </div>
          </div>

          <button
            onClick={() => router.push(`/reports/${slug}/executive_summary`)}
            className={`transition-colors cursor-pointer ${
              currentPage === "executive_summary"
                ? "text-accent font-bold"
                : "text-white/80 hover:text-white"
            }`}
          >
            Executive Summary
          </button>

          <div className="relative group py-1">
            <button
              onClick={() => router.push(`/reports/${slug}/drivers_of_change`)}
              className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
            >
              Drivers of Change <span>▾</span>
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl p-2 min-w-48 space-y-1 z-50">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/drivers_of_change`)
                }
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${
                  currentPage === "drivers_of_change"
                    ? "text-accent font-bold bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Drivers of Change
              </button>
              <button
                onClick={() => {
                  if (currentPage === "drivers_of_change") {
                    const el = document.getElementById("nine-megatrends");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  } else {
                    router.push(
                      `/reports/${slug}/drivers_of_change#nine-megatrends`
                    );
                  }
                }}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${
                  currentPage === "drivers_of_change" || currentPage === "megatrends"
                    ? "text-accent font-bold bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Nine Megatrends
              </button>
            </div>
          </div>

          <div className="relative group py-1">
            <button
              onClick={() => router.push(`/reports/${slug}/industry_overview`)}
              className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
            >
              Industry Overview <span>▾</span>
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl p-2 min-w-56 space-y-1 z-50 shadow-xl">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${currentPage === "workforce_insights" ? "text-accent font-bold bg-white/10" : "text-white/80 hover:text-white hover:bg-white/10"}`}
              >
                Insights Overview
              </button>
              <div className="pt-2 pb-1 px-3 text-[10px] uppercase font-bold text-[#85B810]/70 tracking-wider">
                Theme 1
              </div>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights?insight=theme1-insight1`)
                }
                className="w-full text-left px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Theme 1, Insight 1
              </button>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights?insight=theme1-insight2`)
                }
                className="w-full text-left px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Theme 1, Insight 2
              </button>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights?insight=theme1-insight3`)
                }
                className="w-full text-left px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Theme 1, Insight 3
              </button>
              <div className="pt-2 pb-1 px-3 text-[10px] uppercase font-bold text-[#85B810]/70 tracking-wider border-t border-white/5">
                Theme 2
              </div>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights?insight=theme2-insight1`)
                }
                className="w-full text-left px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Theme 2, Insight 1
              </button>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights?insight=theme2-insight2`)
                }
                className="w-full text-left px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Theme 2, Insight 2
              </button>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights?insight=theme2-insight3`)
                }
                className="w-full text-left px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Theme 2, Insight 3
              </button>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights?insight=theme2-insight4`)
                }
                className="w-full text-left px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Theme 2, Insight 4
              </button>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights?insight=contextualisation`)
                }
                className="w-full text-left px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Contextualisation of Qualifications
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
            <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl p-2 min-w-64 space-y-1 z-50">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_strategies`)
                }
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${
                  currentPage === "workforce_strategies"
                    ? "text-accent font-bold bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                2026 Proposed Strategies
              </button>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/update_2025_strategies`)
                }
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${
                  currentPage === "update_2025_strategies"
                    ? "text-accent font-bold bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Update on 2025 Strategies
              </button>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/existing_strategies`)
                }
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${
                  currentPage === "existing_strategies"
                    ? "text-accent font-bold bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Existing Industry-Sector Strategies
              </button>
            </div>
          </div>

          <button
            onClick={() => router.push(`/reports/${slug}/looking_forward`)}
            className={`transition-colors cursor-pointer ${
              currentPage === "looking_forward"
                ? "text-accent font-bold"
                : "text-white/80 hover:text-white"
            }`}
          >
            Looking Forward
          </button>
        </nav>

        <div>
          <button
            onClick={() => router.push(`/reports/${slug}/downloads`)}
            className="bg-lg-dark hover:bg-[#046D2A] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Download 2026 PDF</span>
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
