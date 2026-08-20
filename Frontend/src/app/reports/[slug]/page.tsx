"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface Report {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  coverImageUrl?: string;
  pdfFileUrl?: string;
  psaSectorPageUrl?: string;
  contactUrl?: string;
  cardNote?: string;
  status: string;
  industry?: {
    id: string;
    name: string;
  };
  year?: {
    id: string;
    label: string;
  };
  landingIntroDesc?: string;
  landingIntroBullets?: string;
  landingExecDesc?: string;
  landingExecBullets?: string;
}

interface SiteSettings {
  title: string;
  description?: string;
  logoLightUrl?: string;
  logoDarkUrl?: string;
}

function PSALogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M8 22C7 20 8 18 10 17C12 16 15 17 17 15C19 13 18 10 20 8C22 6 25 7 27 6C29 5 31 7 33 9C35 11 34 14 33 16C32 18 34 20 32 23C30 26 27 25 25 27C23 29 20 30 18 32C16 34 13 32 11 30C9 28 9 24 8 22Z"
          fill="#85B810"
        />
        <path
          d="M33 26C32 28 30 30 28 32C26 34 24 33 23 31"
          stroke="#0C582B"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="font-extrabold text-[12px] text-[#1F2B11] uppercase">
          PUBLIC SKILLS
        </span>
        <span className="font-extrabold text-[10px] text-[#85B810] uppercase">
          AUSTRALIA
        </span>
      </div>
    </div>
  );
}

export default function ReportLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);

  const [report, setReport] = useState<Report | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [settingsRes, reportRes] = await Promise.all([
        api.get<SiteSettings>("/site-settings").catch(() => null),
        api.get<Report>(`/reports/${slug}`),
      ]);
      if (settingsRes) setSiteSettings(settingsRes);
      setReport(reportRes);
    } catch (err: any) {
      console.error("Fetch landing page report failed:", err);
      setError(err.message || "Report not found or unavailable.");
    } finally {
      setLoading(false);
    }
  };

  const getLogoUrl = (rawUrl?: string) => {
    if (!rawUrl) return null;
    if (rawUrl.startsWith("http")) return rawUrl;
    return `${typeof window !== "undefined" ? window.location.origin : ""}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F0]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-[#85B810]" />
          <span className="font-mono text-xs uppercase text-[#666C5B]">
            Loading Workforce Insights Report...
          </span>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F0] px-4">
        <div className="max-w-md w-full border border-red-200 bg-white p-6 text-center rounded-2xl">
          <span className="font-mono text-xs uppercase text-red-700 block mb-2 font-bold">
            REPORT ACCESS FAILED
          </span>
          <p className="text-xs text-red-600 mb-4">
            {error || "This report is currently unavailable."}
          </p>
          <button
            onClick={() => router.push("/reports")}
            className="border border-[#E0E2D8] bg-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase text-[#1B240E] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  const logoUrl = getLogoUrl(
    siteSettings?.logoDarkUrl || siteSettings?.logoLightUrl,
  );

  const defaultIntroDesc =
    "For readers who want the report background — how it was developed, the methodology and the full report structure.";

  const defaultExecDesc =
    "Straight to the key insights and strategies — the workforce story on one page, built for large screens and briefings.";

  return (
    <div className="min-h-screen bg-[#F7F8F0] relative overflow-hidden flex flex-col justify-between font-sans selection:bg-[#85B810]/30 antialiased">
      {/* ── BACKGROUND WAVE GRAPHICS ── */}
      <img
        src="/images/wave-left.png"
        alt=""
        className="fixed bottom-0 left-0 pointer-events-none z-0 object-bottom-left select-none"
      />
      <img
        src="/images/wave-right.png"
        alt=""
        className="fixed top-0 right-0 pointer-events-none z-0 h-full object-top-right select-none"
      />

      {/* ── TOP HEADER ── */}
      <header className="w-full bg-[#FAFAF0] z-10 relative border-b border-gray200">
        <div className="max-w-360 mx-auto px-6 sm:px-12 py-4 flex items-center justify-between">
          <div
            onClick={() => router.push("/reports")}
            className="cursor-pointer flex items-center"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={siteSettings?.title || "Public Skills Australia"}
                className="h-9 w-auto object-contain"
              />
            ) : (
              <PSALogo />
            )}
          </div>
          <span className="bg-lg-dark text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase">
            {report.industry?.name || "LOCAL GOVERNMENT"}
          </span>
        </div>
      </header>

      {/* ── MAIN CONTENT (TOP ALIGNED) ── */}
      <main className="animate-fade-in flex-1 flex flex-col items-center justify-start pt-10 sm:pt-14 pb-12 z-10 relative px-4">
        {/* Title Section */}
        <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-10 space-y-6">
          <p className="text-xs sm:text-xs font-semibold text-notes uppercase">
            {report.year?.label || "2026"} • PUBLIC SKILLS AUSTRALIA
          </p>
          <h1 className="text-4xl font-bold text-gray800 leading-normal">
            {report.title}
          </h1>
          <p className="text-lg font-medium text-notes">
            Select your reading experience
          </p>
        </div>

        {/* Pathways Selection Cards */}
        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Pathway 1: Introduction */}
          <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-LG-LIGHT p-8 flex flex-col justify-between transition-all">
            <div>
              <div className="h-10 flex items-center justify-between gap-3 mb-1">
                <span className="text-xs sm:text-sm font-semibold text-gray800 uppercase tracking-wide">
                  NEW TO THE REPORT?
                </span>
              </div>
              <h2 className="text-2xl font-bold text-LG-LIGHT mb-4">
                Introduction
              </h2>
              <p className="text-xs text-gray600 leading-relaxed mb-8">
                {report.landingIntroDesc || defaultIntroDesc}
              </p>
            </div>
            <div>
              <button
                onClick={() => router.push(`/reports/${slug}/introduction`)}
                className="bg-lg-light hover:bg-[#77A60D] text-gray800 font-bold text-sm px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
              >
                Explore the Introduction{" "}
                <span className="text-base font-normal">→</span>
              </button>
            </div>
          </div>

          {/* Pathway 2: Executive Summary */}
          <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-lg-dark p-8 flex flex-col justify-between transition-all">
            <div>
              <div className="h-10 flex items-center justify-between gap-3 mb-1">
                <span className="text-xs sm:text-sm font-semibold text-gray800 uppercase tracking-wide">
                  READY FOR THE KEY INSIGHTS?
                </span>
                <span className="bg-lg-dark text-white text-[11px] font-bold px-3 py-1 rounded-full shrink-0">
                  Presentation View
                </span>
              </div>
              <h2 className="text-2xl font-bold text-lg-dark mb-4">
                Executive Summary
              </h2>
              <p className="text-xs text-gray600 leading-relaxed mb-8">
                {report.landingExecDesc || defaultExecDesc}
              </p>
            </div>
            <div>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/executive_summary`)
                }
                className="bg-lg-light hover:bg-[#77A60D] text-gray800 font-bold text-sm px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
              >
                Open the Executive Summary{" "}
                <span className="text-base font-normal">→</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER / BOTTOM NAV ── */}
      <footer className="w-full bg-white border-t border-gray200 z-10 relative py-4 px-4 flex items-center justify-center gap-3">
        <button
          onClick={() => router.push("/reports")}
          className="bg-white hover:bg-gray-50 border border-gray200 text-gray800 font-semibold text-sm px-5 py-2 rounded-full flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <span>←</span> Back to PSA Website
        </button>
        <a
          href={
            report.contactUrl || "https://publicskillsaustralia.org.au/contact"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white hover:bg-gray-50 border border-gray200 text-gray800 font-semibold text-sm px-5 py-2 rounded-full transition-all no-underline"
        >
          Contact Us
        </a>
      </footer>
    </div>
  );
}
