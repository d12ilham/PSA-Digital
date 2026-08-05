"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface NavTarget {
  label: string;
  href: string;
}

export interface ReportNavButtonsProps {
  slug?: string;
  currentPage?: string;
  prev?: NavTarget;
  next?: NavTarget;
}

export const REPORT_PAGES_ORDER = [
  { key: "introduction", label: "Introduction" },
  { key: "about", label: "About Public Skills Australia" },
  { key: "methodology", label: "Methodology" },
  { key: "executive_summary", label: "Executive Summary" },
  { key: "drivers_of_change", label: "Drivers of Change" },
  { key: "industry_overview", label: "Industry-Sector Overview" },
  { key: "state_territory", label: "State and Territory Profile" },
  { key: "industry_profile", label: "Industry Profile" },
  { key: "workforce_insights", label: "Workforce Insights" },
  { key: "workforce_strategies", label: "2026 Proposed Strategies" },
  { key: "existing_strategies", label: "Existing Strategies" },
  { key: "federal_initiatives", label: "Federal Initiatives" },
  { key: "looking_forward", label: "Looking Forward" },
];

export default function ReportNavButtons({
  slug,
  currentPage,
  prev,
  next,
}: ReportNavButtonsProps) {
  const router = useRouter();

  let prevTarget = prev;
  let nextTarget = next;

  if (slug && currentPage && (!prevTarget || !nextTarget)) {
    const currentIndex = REPORT_PAGES_ORDER.findIndex(
      (p) => p.key === currentPage
    );
    if (currentIndex >= 0) {
      if (!prevTarget && currentIndex > 0) {
        const prevDef = REPORT_PAGES_ORDER[currentIndex - 1];
        prevTarget = {
          label: prevDef.label,
          href: `/reports/${slug}/${prevDef.key}`,
        };
      }
      if (!nextTarget && currentIndex < REPORT_PAGES_ORDER.length - 1) {
        const nextDef = REPORT_PAGES_ORDER[currentIndex + 1];
        nextTarget = {
          label: nextDef.label,
          href: `/reports/${slug}/${nextDef.key}`,
        };
      }
    }
  }

  if (!prevTarget && !nextTarget) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {prevTarget && (
        <button
          onClick={() => router.push(prevTarget.href)}
          className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-[#e1e4d2] text-notes font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to {prevTarget.label}
        </button>
      )}
      {nextTarget && (
        <button
          onClick={() => router.push(nextTarget.href)}
          className="bg-[#8AC900] hover:bg-[#77A60D] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
        >
          Next Section: {nextTarget.label} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
