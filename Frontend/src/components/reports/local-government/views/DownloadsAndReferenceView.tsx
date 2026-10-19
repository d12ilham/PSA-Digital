"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

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
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#046D2A] leading-tight animate-slide-up">
              Downloads and reference
            </h1>
          </div>

          <div className="absolute right-0 top-0 bottom-0 h-full flex items-center justify-end pointer-events-none">
            <img
              src="/images/hero-graphic-downloads.png"
              alt="Downloads and reference Graphic"
              className="h-full w-auto object-contain object-right animate-zoom-in"
            />
          </div>
        </div>

        {/* ── 3 COLUMN CARDS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* CARD 1: FULL REPORT (DEEP GREEN) */}
          <div
            style={{ animationDelay: "0.15s" }}
            className="animate-card-entrance bg-[#046D2A] border border-gray200 text-white rounded-2xl p-6 flex flex-col justify-between space-y-6"
          >
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
              <a
                href="https://psa-directus-prod.azurewebsites.net/assets/895e9b7a-2c55-4531-95a1-dafa90b60a1c.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sweep-white-notes text-gray800 font-bold text-xs px-6 py-3 rounded-full inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Open 2026 PDF</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* CARD 2: PREVIOUS REPORT */}
          <div
            style={{ animationDelay: "0.27s" }}
            className="animate-card-entrance bg-white border border-gray200 border-t-[12px] border-t-[#9CAA54] rounded-2xl p-6 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-6">
              <span className="text-xs font-semibold text-gray600 uppercase tracking-wider block">
                PREVIOUS REPORT
              </span>

              <div className="space-y-4">
                {/* 2025 */}
                <a
                  href="https://psa-directus-prod.azurewebsites.net/assets/27231b35-4c58-42d7-87ce-5b9cc24d0408"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ animationDelay: "0.33s" }}
                  className="animate-card-entrance bg-[#9CAA5433] border border-[#9CAA54] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors hover:bg-[#EAF1D6] hover:border-[#728C28] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#728C28] no-underline"
                >
                  <span className="text-xs sm:text-sm font-bold text-gray800">
                    2025 Local Government Workforce Insights Report
                  </span>
                  <ExternalLink className="h-4 w-4 text-[#728C28] shrink-0" aria-hidden="true" />
                </a>

                {/* 2024 */}
                <a
                  href="https://psa-directus-prod.azurewebsites.net/assets/acd96fb3-8c56-4df4-9670-6a92e6eb696d"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ animationDelay: "0.39s" }}
                  className="animate-card-entrance bg-[#9CAA5433] border border-[#9CAA54] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors hover:bg-[#EAF1D6] hover:border-[#728C28] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#728C28] no-underline"
                >
                  <span className="text-xs sm:text-sm font-bold text-gray800">
                    2024 Federal, State/Territory &amp; Local Government Workforce Plan
                  </span>
                  <ExternalLink className="h-4 w-4 text-[#728C28] shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* CARD 3: ABOUT THE APPENDIX */}
          <div
            style={{ animationDelay: "0.39s" }}
            className="animate-card-entrance bg-white border border-gray200 border-t-[12px] border-t-[#046D2A] rounded-2xl p-6 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <span className="text-xs font-semibold text-gray600 uppercase tracking-wider block">
                ABOUT THE APPENDIX
              </span>

              <p className="text-sm text-gray600 leading-relaxed font-normal pt-1">
                Appendix A lists the councils that participated in the Local
                Government Skills Audit. It appears in the full report PDF and
                is not reproduced as webpages.
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
