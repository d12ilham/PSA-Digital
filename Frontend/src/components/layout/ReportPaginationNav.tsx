"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ReportPaginationNavProps {
  slug: string;
  currentPage: string;
}

export const REPORT_PAGES_ORDER = [
  { key: "introduction", title: "Introduction" },
  { key: "about", title: "About Public Skills Australia" },
  { key: "methodology", title: "Methodology" },
  { key: "executive_summary", title: "Executive Summary" },
  { key: "drivers_of_change", title: "Drivers of Change" },
  { key: "industry_overview", title: "Industry Overview" },
  { key: "state_territory", title: "State and Territory Profile" },
  { key: "industry_profile", title: "Industry Profile" },
  { key: "workforce_insights", title: "Workforce Insights" },
  { key: "workforce_strategies", title: "2026 Proposed Strategies" },
  { key: "existing_strategies", title: "Existing Strategies" },
  { key: "federal_initiatives", title: "Federal Initiatives" },
  { key: "looking_forward", title: "Looking Forward" },
];

export default function ReportPaginationNav({
  slug,
  currentPage,
}: ReportPaginationNavProps) {
  const router = useRouter();

  const currentIndex = REPORT_PAGES_ORDER.findIndex(
    (p) => p.key === currentPage
  );

  const prevPage =
    currentIndex > 0 ? REPORT_PAGES_ORDER[currentIndex - 1] : null;
  const nextPage =
    currentIndex >= 0 && currentIndex < REPORT_PAGES_ORDER.length - 1
      ? REPORT_PAGES_ORDER[currentIndex + 1]
      : null;

  if (!prevPage && !nextPage) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-2">
      {prevPage ? (
        <button
          onClick={() => router.push(`/reports/${slug}/${prevPage.key}`)}
          className="w-full sm:w-auto bg-white hover:bg-gray-50 border border-gray200 rounded-2xl px-6 py-3.5 flex items-center gap-3 transition-colors text-left cursor-pointer shadow-none group"
        >
          <ArrowLeft className="w-5 h-5 text-gray600 group-hover:text-gray800 transition-colors shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-gray600 font-medium uppercase tracking-wider">
              Back to
            </span>
            <span className="text-sm font-bold text-gray800 leading-snug">
              {prevPage.title}
            </span>
          </div>
        </button>
      ) : (
        <div />
      )}

      {nextPage ? (
        <button
          onClick={() => router.push(`/reports/${slug}/${nextPage.key}`)}
          className="w-full sm:w-auto ml-auto bg-[#8AC900] hover:bg-[#78B300] border-none rounded-2xl px-6 py-3.5 flex items-center justify-between sm:justify-end gap-3 transition-colors text-right cursor-pointer shadow-none group"
        >
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-xs text-gray800 font-bold uppercase tracking-wider">
              Next Section
            </span>
            <span className="text-sm font-bold text-gray800 leading-snug">
              {nextPage.title}
            </span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray800 shrink-0" />
        </button>
      ) : null}
    </div>
  );
}
