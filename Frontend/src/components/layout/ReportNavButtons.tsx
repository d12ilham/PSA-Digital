"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { resolveSector } from "@/config/reports/sectors";

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

  if (!prevTarget && !nextTarget) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {back && (
        <button onClick={() => router.push(back.href)} className="border border-[#B2DB79] bg-[#FAFAF0] text-notes font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to {back.label}
        </button>
      )}
      {backSecondary && (
        <button onClick={() => router.push(backSecondary.href)} className="border border-[#B2DB79] bg-[#FAFAF0] text-notes font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to {backSecondary.label}
        </button>
      )}
      {prevTarget && (
        <button
          onClick={() => router.push(prevTarget.href)}
          className="border border-[#B2DB79] bg-[#FAFAF0] text-notes font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {prevPrefix} {prevTarget.label}
        </button>
      )}
      {nextTarget && (
        <button
          onClick={() => router.push(nextTarget.href)}
          className="bg-[#8AC900] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer"
        >
          {nextPrefix} {nextTarget.label} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
