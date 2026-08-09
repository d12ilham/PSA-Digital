"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import { ArrowLeft, Download } from "lucide-react";

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

export default function LookingForwardView({
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
      <ReportHeader slug={slug} report={report} currentPage="looking_forward" />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Sub-Header Navigation Button */}
        <div className="flex items-center">
          <button
            onClick={() => router.push(`/reports/${slug}/executive_summary`)}
            className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray200 text-[#728C28] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Executive Summary
          </button>
        </div>

        {/* ── HERO BANNER CARD WITH GRAPHIC ── */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <span className="text-xs font-semibold text-notes uppercase tracking-wider block">
              LOOKING FORWARD
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#046D2A] leading-tight">
              2027 and Beyond
            </h1>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal w-full lg:w-5/6">
              Public Skills Australia has built on the 2024 Workforce Plans and
              the 2025 Local Government Workforce Insights Report. These reports
              continue to be the strategic centerpiece guiding annual Business
              Plans for Public Skills Australia, alongside Ministerial,
              industry-sector and other priorities (e.g. Royal Commissions and
              Inquiries).
            </p>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal w-full lg:w-5/6">
              The 2027{" "}
              <span className="font-bold text-[#728C28]">
                Workforce Insights Reports
              </span>{" "}
              will firstly focus on broader priorities detailed below and may be
              delivered throughout 2026/27:
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto flex justify-center lg:justify-end">
            <img
              src="/images/hero-graphic-looking-forward.png"
              alt="2027 and Beyond Diagram"
              className="w-full max-w-[340px] sm:max-w-[440px] object-contain"
            />
          </div>
        </div>

        {/* ── 3 CARDS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: Line of Inquiry 1 */}
          <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-[#9CAA54] p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#E5E8DA] flex items-center justify-center shrink-0">
                <img
                  src="/images/inquiry-1.svg"
                  alt="Line of Inquiry 1"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-notes uppercase block">
                LINE OF INQUIRY 1
              </span>
              <h3 className="text-base sm:text-lg font-bold text-gray800 leading-snug">
                Inclusion and participation of First Nations people, women and
                other genders in the Public Safety and Government workforces.
              </h3>
            </div>
          </div>

          {/* Card 2: Line of Inquiry 2 */}
          <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-[#9CAA54] p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#E5E8DA] flex items-center justify-center shrink-0">
                <img
                  src="/images/inquiry-2.svg"
                  alt="Line of Inquiry 2"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-notes uppercase block">
                LINE OF INQUIRY 2
              </span>
              <h3 className="text-base sm:text-lg font-bold text-gray800 leading-snug">
                The use of AI and digital transformation and the impact of these
                technologies on the Public Safety and Government workforces.
              </h3>
            </div>
          </div>

          {/* Card 3: Continuing */}
          <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-[#046D2A] p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#E5E8DA] flex items-center justify-center shrink-0">
                <img
                  src="/images/inquiry-continuing.svg"
                  alt="Continuing"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-notes uppercase block">
                CONTINUING
              </span>
              <h3 className="text-base sm:text-lg font-bold text-gray800 leading-snug">
                Additionally, the 2027 Workforce Insights Reports will focus on
                any other emerging priorities impacting the Local Government
                industry-sector.
              </h3>
              <p className="text-xs text-gray600 leading-relaxed font-normal">
                The Local Government Skills Audit will continue to provide a
                holistic national picture of the Local Government workforce.
                Outcomes of this project will likely highlight key priority
                areas for further examination and consideration in future
                reports.
              </p>
            </div>
          </div>
        </div>

        {/* ── LIGHT GREEN SUMMARY BOX ── */}
        <div
          className="border border-[#B2DB79] rounded-2xl p-5"
          style={{ backgroundColor: "rgba(138, 201, 0, 0.1)", borderWidth: 2 }}
        >
          <p className="text-sm text-gray600 leading-relaxed w-1/2">
            Beyond these focused lines of inquiry, the 2027{" "}
            <span className="font-bold text-lg-dark">
              Workforce Insights Reports
            </span>{" "}
            will seek to examine the impact of the Drivers of Change identified
            in this year's reports on our industry-sector workforces.
          </p>
        </div>

        {/* ── ACTION BUTTONS ROW ── */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
          <button
            onClick={() => {
              if (report.pdfFileUrl) window.open(report.pdfFileUrl, "_blank");
            }}
            className="bg-[#046D2A] hover:bg-[#035822] text-white text-sm font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Download 2026 PDF</span>
            <Download className="h-4 w-4" />
          </button>

          <button
            onClick={() => router.push(`/reports/${slug}/executive_summary`)}
            className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray200 text-notes text-sm font-bold px-6 py-3 rounded-full cursor-pointer transition-colors"
          >
            Revisit the Executive Summary
          </button>

          <button
            onClick={() => {
              if (report.contactUrl) window.open(report.contactUrl, "_blank");
            }}
            className="border border-gray200 hover:bg-gray200 text-gray800 text-sm font-bold px-6 py-3 rounded-full cursor-pointer transition-colors"
          >
            Contact Public Skills Australia
          </button>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
