"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { resolveSector } from "@/config/reports/sectors";
import FederalStateReportUtilityRow from "@/components/reports/federal-state/FederalStateReportUtilityRow";

export interface NavTarget {
  label: string;
  href: string;
}

export interface ReportNavButtonsProps {
  slug?: string;
  currentPage?: string;
  industrySlug?: string;
  pagesOrder?: { key: string; label: string }[];
  prev?: NavTarget;
  next?: NavTarget;
  back?: NavTarget;
  backSecondary?: NavTarget;
  prevPrefix?: string;
  nextPrefix?: string;
  onPrevious?: () => void;
  sectorPalette?: boolean;
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
  { key: "update_2025_strategies", label: "Update on 2025 Strategies" },
  { key: "existing_strategies", label: "Existing Industry-Sector Strategies" },
  { key: "federal_initiatives", label: "Federal Government Initiatives" },
  { key: "looking_forward", label: "Looking Forward" },
  { key: "downloads", label: "Downloads & References" },
];

export default function ReportNavButtons({
  slug,
  currentPage,
  industrySlug,
  pagesOrder,
  prev,
  next,
  back,
  backSecondary,
  prevPrefix = "Back to",
  nextPrefix = "Next Section:",
  onPrevious,
  sectorPalette = false,
}: ReportNavButtonsProps) {
  const router = useRouter();

  let prevTarget = prev;
  let nextTarget = next;

  const activePagesOrder =
    pagesOrder ||
    (slug || industrySlug
      ? resolveSector(industrySlug, slug).defaultChapters
      : REPORT_PAGES_ORDER);

  if (slug && currentPage && (!prevTarget || !nextTarget)) {
    const currentIndex = activePagesOrder.findIndex(
      (p) => p.key === currentPage
    );
    if (currentIndex >= 0) {
      if (!prevTarget && currentIndex > 0) {
        const prevDef = activePagesOrder[currentIndex - 1];
        prevTarget = {
          label: prevDef.label,
          href: `/reports/${slug}/${prevDef.key}`,
        };
      }
      if (!nextTarget && currentIndex < activePagesOrder.length - 1) {
        const nextDef = activePagesOrder[currentIndex + 1];
        nextTarget = {
          label: nextDef.label,
          href: `/reports/${slug}/${nextDef.key}`,
        };
      }
    }
  }

  const isFederalState = (slug || industrySlug) && resolveSector(industrySlug, slug).id === "federal-state";
  if (!prevTarget && !nextTarget && !isFederalState) return null;

  const secondaryClass = sectorPalette
    ? "border border-[#754C2D] bg-[#EED4C4] text-[#754C2D] font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754C2D]"
    : "border border-[#B2DB79] bg-[#FAFAF0] text-notes font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer";
  const primaryClass = sectorPalette
    ? "border border-[#754C2D] bg-[#754C2D] text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer transition-colors hover:bg-[#EED4C4] hover:text-[#754C2D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754C2D]"
    : "bg-[#8AC900] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer";

  const controls = (
    <div className="flex flex-wrap items-center gap-3">
      {back && (
        <button onClick={() => router.push(back.href)} className={secondaryClass}>
          <ArrowLeft className="h-3.5 w-3.5" /> Back to {back.label}
        </button>
      )}
      {backSecondary && (
        <button onClick={() => router.push(backSecondary.href)} className={secondaryClass}>
          <ArrowLeft className="h-3.5 w-3.5" /> Back to {backSecondary.label}
        </button>
      )}
      {prevTarget && (
        <button
          onClick={onPrevious ?? (() => router.push(prevTarget.href))}
          className={secondaryClass}
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {prevPrefix} {prevTarget.label}
        </button>
      )}
      {nextTarget && (
        <button
          onClick={() => router.push(nextTarget.href)}
          className={primaryClass}
        >
          {nextPrefix} {nextTarget.label} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );

  return isFederalState ? <FederalStateReportUtilityRow>{controls}</FederalStateReportUtilityRow> : controls;
}
