"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface FederalStateLandingViewProps {
  slug: string;
  report: {
    id: string;
    title: string;
    slug: string;
    contactUrl?: string;
    year?: { label: string };
  };
  siteSettings?: {
    title: string;
    logoDarkUrl?: string;
    logoLightUrl?: string;
  } | null;
}

function PSALogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="36"
        height="36"
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
        <span className="font-extrabold text-[12px] text-[#1F2B11] uppercase tracking-wide">
          PUBLIC SKILLS
        </span>
        <span className="font-extrabold text-[10px] text-[#85B810] uppercase tracking-wider">
          AUSTRALIA
        </span>
      </div>
    </div>
  );
}

export default function FederalStateLandingView({
  slug,
  report,
  siteSettings,
}: FederalStateLandingViewProps) {
  const router = useRouter();

  const getLogoUrl = (rawUrl?: string) => {
    if (!rawUrl) return null;
    if (rawUrl.startsWith("http")) return rawUrl;
    return `${typeof window !== "undefined" ? window.location.origin : ""}${
      rawUrl.startsWith("/") ? "" : "/"
    }${rawUrl}`;
  };

  const logoUrl = getLogoUrl(
    siteSettings?.logoDarkUrl || siteSettings?.logoLightUrl,
  );

  return (
    <div className="min-h-screen bg-[#F7F8F0] relative overflow-hidden flex flex-col justify-between font-sans antialiased">
      {/* ── BACKGROUND WAVE GRAPHICS ── */}
      <img
        src="/images/wave-left.png"
        alt=""
        className="fixed bottom-0 left-0 pointer-events-none z-0 object-bottom-left select-none animate-zoom-in"
      />
      <img
        src="/images/wave-right.png"
        alt=""
        className="fixed top-0 right-0 pointer-events-none z-0 h-100 xl:h-full object-top-right select-none animate-zoom-in"
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

          <span className="bg-[#694834] text-white text-xs font-bold px-3.5 py-1.5 rounded-full">
            Federal and State/Territory Government
          </span>
        </div>
      </header>

      {/* ── MAIN CONTENT (TOP ALIGNED) ── */}
      <main className="flex-1 flex flex-col items-center justify-start pt-10 sm:pt-14 pb-12 z-10 relative px-4">
        {/* Title Section */}
        <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-10 space-y-6">
          <div className="animate-slide-up space-y-4">
            <p className="text-xs sm:text-xs font-semibold uppercase tracking-wider text-[#598303]">
              {report.year?.label || "2026"} • PUBLIC SKILLS AUSTRALIA
            </p>

            <h1 className="text-4xl font-bold text-gray800 leading-tight sm:leading-normal">
              Federal and State/Territory Government
              <br className="hidden sm:inline" /> Workforce Insights Report
            </h1>
          </div>

          <p className="text-lg font-medium text-notes animate-slide-up-delay max-w-3xl mx-auto leading-relaxed">
            Choose how you enter the digital report. Either start at the
            beginning from the Introduction or go straight to the Executive
            Summary.
          </p>
        </div>

        {/* Pathways Selection Cards */}
        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Pathway 1: Introduction */}
          <div
            style={{ animationDelay: "0.15s", borderTopColor: "#EED4C4" }}
            className="animate-card-entrance bg-white rounded-2xl border border-gray200 border-t-12 p-8 flex flex-col justify-between transition-all"
          >
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#AE907E]">
                Introduction
              </h2>
              <p className="text-xs text-gray600 leading-relaxed mb-8">
                For readers who want the report background — how it was
                developed, the methodology and the full report structure.
              </p>
            </div>

            <div>
              <button
                onClick={() => router.push(`/reports/${slug}/introduction`)}
                className="font-bold text-sm px-6 py-2 rounded-full flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90 bg-[#8AC900] text-[#1B240E]"
              >
                <span>Explore the Introduction</span>
                <span className="text-base font-normal">→</span>
              </button>
            </div>
          </div>

          {/* Pathway 2: Executive Summary */}
          <div
            style={{ animationDelay: "0.30s", borderTopColor: "#694834" }}
            className="animate-card-entrance bg-white rounded-2xl border border-gray200 border-t-12 p-8 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-2xl font-bold text-[#694834]">
                  Executive Summary
                </h2>
                <span className="bg-[#694834] text-white text-[11px] font-bold px-3 py-1 rounded-xl">
                  Presentation View
                </span>
              </div>
              <p className="text-xs text-gray600 leading-relaxed mb-8">
                Straight to the key insights and strategies on one page, built
                for large screens and briefings.
              </p>
            </div>

            <div>
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/executive_summary`)
                }
                className="font-bold text-sm px-6 py-2 rounded-full flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90 bg-[#8AC900] text-[#1B240E]"
              >
                <span>Open the Executive Summary</span>
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
          className="border border-[#E9EAEB] text-gray800 font-semibold text-sm px-5 py-2 rounded-full flex items-center gap-1.5 cursor-pointer hover:bg-black/5 transition-colors"
        >
          <span>←</span> Back to PSA Website
        </button>
        <a
          href={
            report.contactUrl || "https://publicskillsaustralia.org.au/contact"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[#E9EAEB] text-gray800 font-semibold text-sm px-5 py-2 rounded-full cursor-pointer no-underline hover:bg-black/5 transition-colors"
        >
          Contact Us
        </a>
      </footer>
    </div>
  );
}
