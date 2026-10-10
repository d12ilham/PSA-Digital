"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

import { resolveSector } from "@/config/reports/sectors";
import FederalStateLandingView from "@/components/reports/federal-state/views/FederalStateLandingView";

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
    slug?: string;
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

  const fetchData = React.useCallback(async () => {
    await Promise.resolve();
    setLoading(true);
    setError(null);
    try {
      const [settingsRes, reportRes] = await Promise.all([
        api.get<SiteSettings>("/site-settings").catch(() => null),
        api.get<Report>(`/reports/${slug}`),
      ]);
      if (settingsRes) setSiteSettings(settingsRes);
      setReport(reportRes);
    } catch (err: unknown) {
      console.warn("API report fetch failed, using sector fallback:", err);
      // Fallback to static sector definition so developers can work without DB seeding
      const sector = resolveSector(null, slug);
      setReport({
        id: sector.id,
        title: `${sector.name} Workforce Insights Report`,
        slug: slug,
        status: "published",
        industry: {
          id: sector.id,
          name: sector.name,
          slug: sector.industrySlugs[0],
        },
        year: {
          id: "default",
          label: sector.defaultYear,
        },
      });
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    const fetchTimer = window.setTimeout(() => void fetchData(), 0);
    return () => window.clearTimeout(fetchTimer);
  }, [fetchData]);

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

  const sector = resolveSector(report.industry?.slug || report.industry?.name, slug);


  if (sector.id === "federal-state") {
    return (
      <FederalStateLandingView
        slug={slug}
        report={report}
        siteSettings={siteSettings}
      />
    );
  }

  if (sector.id === "public-safety") {
    const primaryCards = [
      {
        title: "Introduction",
        description:
          "For readers who want the report background — how it was developed, the methodology and the full report structure.",
        button: "Open the Introduction",
        path: "introduction",
        color: "#606D9E",
      },
      {
        title: "Executive Summary",
        description:
          "Straight to the key insights and strategies on one page, built for large screens and briefings.",
        button: "Open the Executive Summary",
        path: "executive_summary",
        color: "#122453",
        badge: "Presentation View",
      },
    ];

    const sectorCards = [
      { title: "Defence", path: "defence", color: "#D6A52D" },
      {
        title: "Fire & Emergency Services",
        path: "fes",
        color: "#CF4C2C",
      },
      { title: "Police", path: "police", color: "#1685AD" },
    ];

    return (
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#FAFAF0] font-sans antialiased text-[#252D02]">
        <img
          src="/images/wave-left.png"
          alt=""
          className="pointer-events-none absolute bottom-0 left-0 z-0 w-[41vw] max-w-[790px] select-none animate-zoom-in"
        />
        <img
          src="/images/wave-right.png"
          alt=""
          className="pointer-events-none absolute right-0 top-[58px] z-0 w-[24vw] max-w-[470px] select-none animate-zoom-in"
        />

        <header className="relative z-20 h-[58px] shrink-0 border-b border-[#E9EADC] bg-[#FAFAF0]">
          <div className="mx-auto flex h-full max-w-[960px] items-center justify-between px-5 sm:px-8">
            <button
              type="button"
              onClick={() => router.push("/reports")}
              className="cursor-pointer"
              aria-label="Back to reports"
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={siteSettings?.title || "Public Skills Australia"}
                  className="h-[34px] w-auto object-contain"
                />
              ) : (
                <PSALogo />
              )}
            </button>
            <span className="rounded-full bg-[#122453] px-3 py-1 text-[10px] font-bold text-white">
              Public Safety
            </span>
          </div>
        </header>

        <main className="relative z-10 flex flex-1 flex-col items-center px-5 pb-5 pt-5 sm:px-8 sm:pt-6">
          <section className="w-full max-w-[960px] text-center">
            <p className="animate-slide-up text-[10px] font-semibold uppercase text-[#73930B]">
              {report.year?.label || "2026"} · Public Skills Australia
            </p>
            <h1 className="animate-slide-up mt-3 text-[28px] font-extrabold leading-[1.2] text-[#252D02] sm:text-[32px]">
              Public Safety Workforce Insights Report
            </h1>
            <p className="animate-slide-up-delay mx-auto mt-3 max-w-[900px] text-[11px] font-medium leading-5 text-[#60636B] sm:text-xs">
              Covering the Defence, Fire and Emergency Services and Police
              industry-sectors - with cross-sector analysis of the skills that
              connect them.
            </p>
            <p className="animate-slide-up-delay mx-auto mt-3 max-w-[800px] text-[15px] font-semibold leading-5 text-[#648605] sm:text-base">
              Choose how you enter the digital report. Either start at the
              beginning from the Introduction or go straight to the Executive
              Summary.
            </p>
          </section>

          <section className="mt-5 grid w-full max-w-[950px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {primaryCards.map((card, index) => (
              <article
                key={card.path}
                className="animate-card-entrance flex min-h-[190px] flex-col overflow-hidden rounded-[8px] border border-[#E0E2D8] border-t-[8px] bg-white px-6 pb-5 pt-5 shadow-[0_1px_3px_rgba(37,45,2,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(37,45,2,0.10)]"
                style={{
                  borderTopColor: card.color,
                  animationDelay: `${index * 0.12 + 0.12}s`,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2
                    className="text-left text-[18px] font-bold leading-6"
                    style={{ color: card.color }}
                  >
                    {card.title}
                  </h2>
                  {card.badge ? (
                    <span className="shrink-0 rounded-full bg-[#122453] px-2.5 py-1 text-[9px] font-semibold text-white">
                      {card.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-left text-[11px] leading-[1.7] text-[#60636B]">
                  {card.description}
                </p>
                <button
                  type="button"
                  onClick={() => router.push(`/reports/${slug}/${card.path}`)}
                  className="mt-auto flex w-fit cursor-pointer items-center gap-2 rounded-full bg-[#8AC900] px-4 py-2 text-[10px] font-bold text-[#252D02] transition-all duration-300 hover:bg-[#79B700] hover:shadow-md"
                >
                  {card.button} <span aria-hidden="true">→</span>
                </button>
              </article>
            ))}
          </section>

          <p className="mt-5 text-[15px] font-semibold text-[#648605] sm:text-base">
            Or go straight to a sector chapter
          </p>

          <section className="mt-5 grid w-full max-w-[950px] grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {sectorCards.map((card, index) => (
              <article
                key={card.path}
                className="animate-card-entrance relative flex min-h-[116px] flex-col rounded-[8px] border border-[#E0E2D8] bg-white px-5 py-4 shadow-[0_1px_3px_rgba(37,45,2,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(37,45,2,0.10)]"
                style={{ animationDelay: `${index * 0.1 + 0.36}s` }}
              >
                <span
                  className="absolute inset-y-0 left-0 w-[6px] rounded-l-[7px]"
                  style={{ backgroundColor: card.color }}
                  aria-hidden="true"
                />
                <h2 className="text-left text-[12px] font-bold leading-5 text-[#252D02]">
                  {card.title}
                </h2>
                <button
                  type="button"
                  onClick={() => router.push(`/reports/${slug}/${card.path}`)}
                  className="mt-auto flex w-fit cursor-pointer items-center gap-2 rounded-full bg-[#8AC900] px-4 py-2 text-[10px] font-bold text-[#252D02] transition-all duration-300 hover:bg-[#79B700] hover:shadow-md"
                >
                  Open Chapter <span aria-hidden="true">→</span>
                </button>
              </article>
            ))}
          </section>
        </main>

        <footer className="relative z-20 flex h-[58px] shrink-0 items-center justify-center gap-3 border-t border-[#E9EADC] bg-white px-4">
          <button
            type="button"
            onClick={() => router.push("/reports")}
            className="cursor-pointer rounded-full border border-[#B2DB79] bg-[#FAFAF0] px-4 py-2 text-[10px] font-semibold text-[#598303] transition-colors hover:bg-[#F1F5E5]"
          >
            ← Back to PSA Website
          </button>
          <a
            href={report.contactUrl || "https://publicskillsaustralia.org.au/contact"}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#B2DB79] bg-[#FAFAF0] px-4 py-2 text-[10px] font-semibold text-[#598303] no-underline transition-colors hover:bg-[#F1F5E5]"
          >
            Contact Us
          </a>
        </footer>
      </div>
    );
  }

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
          <span className={`${sector.theme.badgeBg} text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase`}>
            {report.industry?.name || sector.badgeText}
          </span>
        </div>
      </header>

      {/* ── MAIN CONTENT (TOP ALIGNED) ── */}
      <main className="flex-1 flex flex-col items-center justify-start pt-10 sm:pt-14 pb-12 z-10 relative px-4">
        {/* Title Section */}
        <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-10 space-y-6">
          <div className="animate-slide-up space-y-4">
            <p className="text-xs sm:text-xs font-semibold uppercase tracking-wider" style={{ color: sector.theme.primaryColor }}>
              {report.year?.label || sector.defaultYear} • PUBLIC SKILLS AUSTRALIA
            </p>
            <h1 className="text-4xl font-bold text-gray800 leading-tight sm:leading-normal">
              {report.title}
            </h1>
          </div>
          <p className="text-lg font-medium text-gray-600 animate-slide-up-delay">
            Select your reading experience
          </p>
        </div>

        {/* Pathways Selection Cards */}
        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Pathway 1: Introduction */}
          <div
            style={{ animationDelay: "0.15s", borderTopColor: sector.theme.accentColor }}
            className="animate-card-entrance bg-white rounded-2xl border border-gray200 border-t-12 p-8 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="h-10 flex items-center justify-between gap-3 mb-1">
                <span className="text-xs sm:text-sm font-semibold text-gray800 uppercase leading-normal">
                  NEW TO THE REPORT?
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: sector.theme.primaryColor }}>
                Introduction
              </h2>
              <p className="text-xs text-gray600 leading-relaxed mb-8">
                {report.landingIntroDesc || defaultIntroDesc}
              </p>
            </div>
            <div>
              <button
                onClick={() => router.push(`/reports/${slug}/introduction`)}
                className="font-bold text-sm px-6 py-2 rounded-full flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: sector.theme.accentColor,
                  color: sector.id === "local-government" ? "#1B240E" : "#FFFFFF",
                }}
              >
                Explore the Introduction{" "}
                <span className="text-base font-normal">→</span>
              </button>
            </div>
          </div>

          {/* Pathway 2: Executive Summary */}
          <div
            style={{ animationDelay: "0.30s", borderTopColor: sector.theme.primaryColor }}
            className="animate-card-entrance bg-white rounded-2xl border border-gray200 border-t-12 p-8 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="h-10 flex items-center justify-between gap-3 mb-1">
                <span className="text-xs sm:text-sm font-semibold text-gray800 uppercase leading-normal">
                  SHORT ON TIME?
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: sector.theme.primaryColor }}>
                Executive Summary
              </h2>
              <p className="text-xs text-gray600 leading-relaxed mb-8">
                {report.landingExecDesc || defaultExecDesc}
              </p>
            </div>
            <div>
              <button
                onClick={() => router.push(`/reports/${slug}/executive_summary`)}
                className="text-white font-bold text-sm px-6 py-2 rounded-full flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90"
                style={{ backgroundColor: sector.theme.primaryColor }}
              >
                Explore the Executive Summary{" "}
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
          className="border border-[#B2DB79] bg-[#FAFAF0] text-notes font-semibold text-sm px-5 py-2 rounded-full flex items-center gap-1.5 cursor-pointer"
        >
          <span>←</span> Back to PSA Website
        </button>
        <a
          href={
            report.contactUrl || "https://publicskillsaustralia.org.au/contact"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[#B2DB79] bg-[#FAFAF0] text-notes font-semibold text-sm px-5 py-2 rounded-full cursor-pointer no-underline"
        >
          Contact Us
        </a>
      </footer>
    </div>
  );
}
