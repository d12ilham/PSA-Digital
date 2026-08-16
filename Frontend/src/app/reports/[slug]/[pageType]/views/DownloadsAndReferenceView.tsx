"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";

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

export default function DownloadsAndReferenceView({
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
      <ReportHeader slug={slug} report={report} currentPage="downloads" />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Sub-Header Navigation Button */}
        <div>
          <button
            onClick={() => router.push(`/reports/${slug}/introduction`)}
            className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray200 text-[#728C28] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Introduction
          </button>
        </div>

        {/* ── HERO BANNER CARD WITH GRAPHIC ── */}
        <div className="relative bg-white border border-gray200 rounded-2xl p-6 overflow-hidden flex items-center justify-between min-h-[140px]">
          <div className="space-y-1 relative z-10 max-w-xl">
            <span className="text-xs font-bold text-[#9CAA54] uppercase tracking-wider block">
              Download PDF
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#046D2A] leading-tight">
              Downloads and reference
            </h1>
          </div>

          <div className="absolute right-0 top-0 bottom-0 h-full flex items-center justify-end pointer-events-none">
            <img
              src="/images/hero-graphic-downloads.png"
              alt="Downloads and reference Graphic"
              className="h-full w-auto object-contain object-right"
            />
          </div>
        </div>

        {/* ── 3 COLUMN CARDS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* CARD 1: FULL REPORT (DEEP GREEN) */}
          <div className="bg-[#046D2A] border border-gray200 text-white rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider block">
                FULL REPORT
              </span>

              {/* Download Circle Icon */}
              <div className="w-16 h-16 flex items-center justify-center shrink-0">
                <img
                  src="/images/downloads-full-report-icon.png"
                  alt="Full Report Icon"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white leading-snug">
                  2026 Local Government Workforce Insights Report
                </h2>
                <p className="text-sm text-white/90 leading-relaxed font-normal">
                  Includes Appendix A: participants in the Local Government
                  Skills Audit — the full list of participating councils by
                  state.
                </p>
              </div>
            </div>

            {/* Download Button */}
            <div>
              {report?.pdfFileUrl ? (
                <a
                  href={report.pdfFileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-white/90 text-gray800 font-bold text-xs px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Download 2026 PDF</span>
                  <Download className="h-3.5 w-3.5" />
                </a>
              ) : (
                <button
                  onClick={() => router.push(`/reports/${slug}`)}
                  className="bg-white hover:bg-white/90 text-gray800 font-bold text-xs px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Download 2026 PDF</span>
                  <Download className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* CARD 2: PREVIOUS REPORT */}
          <div className="bg-white border border-gray200 border-t-[12px] border-t-[#9CAA54] rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <span className="text-xs font-semibold text-gray600 uppercase tracking-wider block">
                PREVIOUS REPORT
              </span>

              <div className="space-y-4">
                {/* 2025 */}
                <div className="bg-[#9CAA5433] border border-[#9CAA54] hover:border-[#9CAA54] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer transition-colors">
                  <span className="text-xs sm:text-sm font-bold text-gray800">
                    Local Government WIR - 2025
                  </span>
                  <Download className="h-4 w-4 text-gray800 shrink-0" />
                </div>

                {/* 2024 */}
                <div className="bg-[#9CAA5433] border border-[#9CAA54] hover:border-[#9CAA54] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer transition-colors">
                  <span className="text-xs sm:text-sm font-bold text-gray800">
                    Local Government WIR - 2024
                  </span>
                  <Download className="h-4 w-4 text-gray800 shrink-0" />
                </div>

                {/* 2023 */}
                <div className="bg-[#9CAA5433] border border-[#9CAA54] hover:border-[#9CAA54] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer transition-colors">
                  <span className="text-xs sm:text-sm font-bold text-gray800">
                    Local Government WIR - 2023
                  </span>
                  <Download className="h-4 w-4 text-gray800 shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: ABOUT THE APPENDIX */}
          <div className="bg-white border border-gray200 border-t-[12px] border-t-[#046D2A] rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-gray600 uppercase tracking-wider block">
                ABOUT THE APPENDIX
              </span>

              <p className="text-sm text-gray600 leading-relaxed font-normal pt-1">
                The appendix relates to the Local Government Skills Audit
                project and is available in the downloadable PDF only — it is
                not reproduced as webpages. Instructions for locating it sit on
                the relevant project page.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <div>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/update_2025_strategies`)
                  }
                  className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray200 text-[#728C28] font-bold text-xs px-5 py-2.5 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Go to the 2025 project update</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div>
                <button
                  onClick={() => router.push(`/reports/${slug}`)}
                  className="bg-[#8AC900] hover:bg-[#77A60D] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Go to the Home</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
