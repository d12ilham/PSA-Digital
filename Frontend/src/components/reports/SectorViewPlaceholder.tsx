"use client";

import React from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import { SectorConfig } from "@/config/reports/sectors";
import { Construction, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SectorViewPlaceholderProps {
  slug: string;
  pageType: string;
  report: any;
  sector: SectorConfig;
}

export default function SectorViewPlaceholder({
  slug,
  pageType,
  report,
  sector,
}: SectorViewPlaceholderProps) {
  const router = useRouter();
  const chapterTitle =
    sector.defaultChapters.find((c) => c.key === pageType)?.label ||
    pageType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between antialiased">
      {/* ── HEADER ── */}
      <ReportHeader
        slug={slug}
        report={report}
        currentPage={pageType}
      />

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Navigation Buttons */}
        <ReportNavButtons slug={slug} currentPage={pageType} />

        {/* Hero Card */}
        <div className="bg-white border border-gray200 rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <div className="flex justify-center">
            <span
              className={`${sector.theme.badgeBg} text-white font-bold text-xs px-4 py-1.5 rounded-full uppercase`}
            >
              {sector.badgeText}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray800">
              {chapterTitle}
            </h1>
            <p className="text-sm text-gray600 max-w-xl mx-auto">
              Workforce Insights Report ({report?.year?.label || sector.defaultYear})
            </p>
          </div>

          <div className="max-w-md mx-auto p-6 rounded-2xl bg-gray-50 border border-dashed border-gray-300 space-y-3">
            <div className="flex justify-center text-gray-400">
              <Construction className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-sm text-gray-700">
              Chapter View in Development
            </h3>
            <p className="text-xs text-gray500 leading-relaxed">
              This chapter view for <strong>{sector.name}</strong> is currently being scaffolded by the sector team. You can add or edit this view in{" "}
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-[11px] text-gray-800">
                src/components/reports/{sector.id}/views/
              </code>
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => router.push(`/reports/${slug}`)}
              className="inline-flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2 rounded-full text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Report Cover</span>
            </button>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter />
    </div>
  );
}
