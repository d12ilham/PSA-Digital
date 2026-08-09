"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReportFooter from "@/components/layout/ReportFooter";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import {
  Download,
  Play,
  FileText,
  CheckSquare,
  RefreshCw,
  Search,
  Lightbulb,
  Target,
  ChevronRight,
  X,
  ExternalLink,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Users,
} from "lucide-react";

interface ReportSummary {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  coverImageUrl?: string;
  pdfFileUrl?: string;
  status: string;
  isFeatured: boolean;
  industryId: string;
  yearId: string;
  createdAt: string;
}

interface SiteSettings {
  title: string;
  description?: string;
  logoLightUrl?: string;
  logoDarkUrl?: string;
}

interface Industry {
  id: string;
  name: string;
}

interface Year {
  id: string;
  label: string;
}

const SECTOR_REPORTS = [
  {
    id: "local-government",
    sectorKey: "Local Government",
    badgeText: "LOCAL GOVERNMENT",
    badgeBg: "bg-lg-dark",
    title: "Local Government Workforce Insights Report",
    subtitle: "",
    actionText: "View report",
    coverImage: "/images/reports/local-government.png",
    isFirst: true,
    targetUrl: "/reports/local-government-workforce-insights-report",
  },
  {
    id: "public-safety",
    sectorKey: "Public Safety",
    badgeText: "PUBLIC SAFETY",
    badgeBg: "bg-[#38485B]",
    title: "Public Safety Workforce Insights Report",
    subtitle: "Fire and Emergency Services · Police · Defence",
    actionText: "Coming to the digital platform",
    coverImage: "/images/reports/public-safety.png",
    isFirst: false,
  },
  {
    id: "federal-state",
    sectorKey: "Federal and State",
    badgeText: "FEDERAL AND STATE/TERRITORY GOVERNMENT",
    badgeBg: "bg-[#694834]",
    title: "Federal and State/Territory Government Workforce Insights Report",
    subtitle: "",
    actionText: "Coming to the digital platform",
    coverImage: "/images/reports/federal-state.png",
    isFirst: false,
  },
  {
    id: "correctional-services",
    sectorKey: "Correctional Services",
    badgeText: "CORRECTIONAL SERVICES",
    badgeBg: "bg-[#0B6DA8]",
    title: "Correctional Services Workforce Insights Report",
    subtitle: "",
    actionText: "Coming to the digital platform",
    coverImage: "/images/reports/correctional-services.png",
    isFirst: false,
  },
];

export default function ReportsArchivePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [industries, setIndustries] = useState<Record<string, string>>({});
  const [years, setYears] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  useEffect(() => {
    fetchDirectoryData();
  }, []);

  const fetchDirectoryData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [settingsRes, reportsRes, industriesRes, yearsRes] =
        await Promise.all([
          api.get<SiteSettings>("/site-settings").catch(() => null),
          api
            .get<any>("/reports", { params: { limit: 100, page: 1 } })
            .catch(() => []),
          api.get<Industry[]>("/industries").catch(() => []),
          api.get<Year[]>("/industries/years").catch(() => []),
        ]);

      if (settingsRes) setSiteSettings(settingsRes);

      const reportsList = Array.isArray(reportsRes)
        ? reportsRes
        : reportsRes?.rows || [];
      setReports(reportsList.filter((r: any) => r.status === "published"));

      if (Array.isArray(industriesRes)) {
        const indMap: Record<string, string> = {};
        industriesRes.forEach((ind) => {
          indMap[ind.id] = ind.name;
        });
        setIndustries(indMap);
      }

      if (Array.isArray(yearsRes)) {
        const yrMap: Record<string, string> = {};
        yearsRes.forEach((yr) => {
          yrMap[yr.id] = yr.label;
        });
        setYears(yrMap);
      }
    } catch (err: any) {
      console.error("Fetch directory data failed:", err);
      setError("Failed to load published workforce insights reports.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToSectors = () => {
    const el = document.getElementById("sectors-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Find dynamic report for a given industry keyword or return default slug navigation
  const getSectorNavigation = (keyword: string) => {
    const matched = reports.find((r) =>
      r.title.toLowerCase().includes(keyword.toLowerCase()),
    );
    if (matched) {
      return () => router.push(`/reports/${matched.slug}`);
    }
    // Fallback if no matching backend report exists yet
    return () =>
      router.push(`/reports/${keyword.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF0] text-[#1B240E] font-sans flex flex-col antialiased selection:bg-[#85CC00]/40">
      {/* ── 1. TOP NAVIGATION BAR ── */}
      <header className="bg-[#252D02] w-full text-white border-b border-[#2A3716] sticky top-0 z-50">
        <div className="max-w-360 mx-auto py-3.5 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left Brand Logo & Title */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => router.push("/")}
          >
            {siteSettings?.logoDarkUrl || siteSettings?.logoLightUrl ? (
              <img
                src={
                  (
                    siteSettings.logoDarkUrl || siteSettings.logoLightUrl
                  )?.startsWith("http")
                    ? siteSettings.logoLightUrl
                    : `${typeof window !== "undefined" ? window.location.origin : ""}${(siteSettings.logoDarkUrl || siteSettings.logoLightUrl)?.startsWith("/") ? "" : "/"}${siteSettings.logoDarkUrl || siteSettings.logoLightUrl}`
                }
                alt={siteSettings?.title || "Public Skills Australia"}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <div className="w-8 h-8 rounded bg-[#85CC00] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#1C250E]"
                >
                  <path
                    d="M12 2L4 6V12C4 16.5 7.5 20.6 12 22C16.5 20.6 20 16.5 20 12V6L12 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 6L7 9.5V13.5L12 17L17 13.5V9.5L12 6Z"
                    fill="#1C250E"
                  />
                </svg>
              </div>
            )}

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-block h-6 w-px bg-white/20"></span>
              <span className="hidden sm:inline-block font-normal text-xs sm:text-sm text-[#85CC00]">
                Workforce Insights Reports
              </span>
            </div>
          </div>

          {/* Right Navigation Links */}
          <nav className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm font-normal">
            <a
              href="https://publicskillsaustralia.org.au"
              target="_blank"
              rel="noreferrer"
              className="text-white/80 hover:text-white transition-colors uppercase font-normal no-underline"
            >
              PSA WEBSITE
            </a>
            <button
              onClick={() => router.push("/reports")}
              className="text-[#85CC00] hover:text-[#99E600] transition-colors uppercase font-normal no-underline cursor-pointer"
            >
              ALL REPORTS
            </button>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-white/80 hover:text-white transition-colors uppercase font-normal no-underline"
            >
              CONTACT US
            </a>
          </nav>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="flex-1 w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── 2. HERO INTRO SECTION ── */}
        <section className="bg-white rounded-2xl p-4 sm:p-6 border border-gray200 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Intro Text Column */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-notes text-xs uppercase block font-semibold">
                PUBLIC SKILLS AUSTRALIA
              </span>

              <div className="space-y-1">
                <h1 className="text-4xl font-bold text-gray800">
                  Welcome to the Public Skills Australia
                </h1>
                <h2 className="text-2xl sm:text-4xl font-bold text-lg-dark leading-tight">
                  Workforce Insights Reports
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-medium pt-1">
                This platform brings together workforce insights and strategies
                across six priority sectors.
              </p>

              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-medium">
                The reports are structured to help you quickly access key
                insights and strategies, while providing the depth of analysis
                supporting the strategy and plans.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  onClick={scrollToSectors}
                  className="bg-lg-light text-[#1C250E] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full hover:bg-[#78B800] transition-all cursor-pointer active:scale-95"
                >
                  Choose your sector
                </button>
                <button
                  onClick={() => setIsPdfModalOpen(true)}
                  className="bg-lg-dark text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full hover:bg-[#2A3716] transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                >
                  <span>All sector reports (PDFs)</span>
                  <Download className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Right Video Card Placeholder (Non-interactive) */}
            <div className="lg:col-span-5">
              <div className="bg-cards rounded-2xl p-5 border border-gray200 space-y-3">
                {/* Video Thumbnail Box */}
                <div className="bg-white rounded-xl aspect-video relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-white"></div>

                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-full bg-[#F0F5DF] text-lg-light flex items-center justify-center pl-1">
                      <Play className="w-9 h-9 fill-lg-light" />
                    </div>
                  </div>
                </div>

                {/* Video Subtitle */}
                <div className="flex items-center justify-between px-1 gap-5">
                  <p className="text-xs text-gray600 font-medium leading-relaxed">
                    A short introduction to the 2026 reports from Public Skills
                    Australia.
                  </p>
                  <div className="bg-lg-light text-[#1C250E] font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shrink-0 select-none">
                    <Play className="w-4 h-4" />
                    <span>Watch 2 Mins.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. VALUE PROPOSITION CARDS (2 SIDE-BY-SIDE) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: An evidence-based view */}
            <div className="bg-white rounded-2xl p-6 border border-gray200 flex items-start gap-4 hover:border-[#38761D]/40 transition-colors">
              <img
                src="/images/reports/reports-main/evidence-based.svg"
                alt="An evidence-based view"
                className="w-16 h-16 shrink-0 object-contain"
              />
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm sm:text-lg text-gray800">
                  An evidence-based view
                </h3>
                <p className="text-xs text-gray600 leading-relaxed">
                  Developed through a combination of workforce data analysis,
                  sector research and extensive consultation with industry and
                  government stakeholders, the reports provide an evidence-based
                  view of current workforce conditions, emerging trends, future
                  challenges and opportunities.
                </p>
              </div>
            </div>

            {/* Card 2: Grounded in lived experience */}
            <div className="bg-white rounded-2xl p-6 border border-gray200 flex items-start gap-4 hover:border-[#38761D]/40 transition-colors">
              <img
                src="/images/reports/reports-main/Grounded.svg"
                alt="Grounded in lived experience"
                className="w-16 h-16 shrink-0 object-contain"
              />
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-sm sm:text-lg text-gray800">
                  Grounded in lived experience
                </h3>
                <p className="text-xs text-[#525B47] leading-relaxed">
                  By combining quantitative insights with the lived experience
                  of sector leaders and practitioners, the reports identify
                  workforce issues that matter most and the strategies needed to
                  address them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. EACH REPORT INCLUDES ICON BAR ── */}
        <section className="bg-[#F0F5DF] border border-gray200 rounded-2xl p-4 space-y-4">
          <h4 className="text-xs uppercaser text-notes">
            EACH REPORT INCLUDES
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {[
              {
                title: "Introduction",
                icon: "/images/reports/reports-main/Introduction.svg",
              },
              {
                title: "Executive Summary",
                icon: "/images/reports/reports-main/Executive.svg",
              },
              {
                title: "Driver of Changes",
                icon: "/images/reports/reports-main/Driver.svg",
              },
              {
                title: "Industry Overview",
                icon: "/images/reports/reports-main/Industry.svg",
              },
              {
                title: "Workforce Insights",
                icon: "/images/reports/reports-main/Insights.svg",
              },
              {
                title: "Workforce Strategies",
                icon: "/images/reports/reports-main/Strategies.svg",
              },
              {
                title: "Looking Forward",
                icon: "/images/reports/reports-main/Looking.svg",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-3 border border-gray200 flex flex-col items-center justify-center text-center gap-3 min-h-[135px] hover:border-lg-dark transition-colors group cursor-default"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-16 h-16 shrink-0 object-contain"
                />
                <span className="font-semibold text-sm text-gray800 leading-tight">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. SECTOR WORKFORCE INSIGHTS REPORTS GRID ── */}
        <section id="sectors-section" className="space-y-4 pt-2">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-gray200 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray800">
              Choose your sector Workforce Insights Report
            </h2>
            <span className="text-xs text-gray600 font-semibold">
              Each report houses the 2026 and previous-year reports
            </span>
          </div>

          {/* Grid of Sector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECTOR_REPORTS.map((sector) => (
              <div
                key={sector.id}
                onClick={() => {
                  if (sector.targetUrl) {
                    router.push(sector.targetUrl);
                  } else {
                    getSectorNavigation(sector.sectorKey)();
                  }
                }}
                className={`bg-white rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer group relative transition-all ${
                  sector.isFirst
                    ? "border-2 border-lg-dark"
                    : "border border-gray200 hover:border-[#38761D]/50"
                }`}
              >
                {/* Graphic Banner Top */}
                <div className="w-full relative overflow-hidden bg-gray-100 border-b border-gray200">
                  <img
                    src={sector.coverImage}
                    alt={sector.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span
                      className={`${sector.badgeBg} text-white font-bold text-[10px] px-3 py-1 rounded-full uppercaser inline-block`}
                    >
                      {sector.badgeText}
                    </span>
                    <h3 className="font-bold text-gray800 group-hover:text-[#38761D] transition-colors leading-snug">
                      {sector.title}
                    </h3>
                    {sector.subtitle && (
                      <p className="text-xs text-gray600 font-medium leading-relaxed">
                        {sector.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <span
                      className={`text-xs font-bold group-hover:underline inline-flex items-center gap-1 ${sector.isFirst ? "text-lg-dark" : "text-notes"}`}
                    >
                      {sector.actionText}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. BOTTOM CTA BANNER ── */}
        <section
          id="contact"
          className="bg-[#F0F5DF] border border-gray200 rounded-2xl p-5 space-y-3"
        >
          <h3 className="text-lg font-bold text-gray800">
            Questions about the{" "}
            <span className="text-lg-dark">Workforce Insights Reports?</span>
          </h3>
          <p className="text-sm text-gray600 font-medium leading-relaxed">
            Public Skills Australia welcomes feedback and enquiries from
            industry-sector stakeholders.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-3">
            <button
              onClick={scrollToSectors}
              className="bg-lg-light text-gray800 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full hover:bg-[#78B800] transition-all cursor-pointer active:scale-95"
            >
              Choose your sector
            </button>
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="bg-lg-dark text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full hover:bg-[#2A3716] transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <span>All sector reports (PDFs)</span>
              <Download className="w-4 h-4 text-white" />
            </button>
          </div>
        </section>
      </main>

      {/* ── 7. FOOTER ── */}
      <ReportFooter />

      {/* ── 8. VIDEO INTRO MODAL ── */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden space-y-0 relative border border-[#E2DFD4]">
            <div className="bg-[#1C250E] text-white p-4 flex items-center justify-between">
              <h3 className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                <Play className="w-4 h-4 fill-[#85CC00] text-[#85CC00]" />
                <span>2026 Workforce Insights Reports Introduction</span>
              </h3>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black relative flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Public Skills Australia Video Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4 bg-[#F4F3EA] flex justify-end">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="bg-[#1B240E] text-white font-extrabold text-xs px-5 py-2 rounded-full hover:bg-[#2A3716] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 9. ALL SECTOR REPORTS (PDFs) MODAL ── */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden relative border border-[#E2DFD4]">
            <div className="bg-[#1C250E] text-white p-4 flex items-center justify-between">
              <h3 className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                <Download className="w-4 h-4 text-[#85CC00]" />
                <span>All Sector Reports (PDF Downloads)</span>
              </h3>
              <button
                onClick={() => setIsPdfModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-[#525B47] leading-relaxed">
                Select a sector report below to download the complete PDF
                document.
              </p>

              <div className="space-y-2.5">
                {[
                  {
                    title: "Local Government Workforce Insights Report (2026)",
                    file: "/reports/local-government-2026.pdf",
                    size: "4.2 MB",
                  },
                  {
                    title: "Public Safety Workforce Insights Report (2025)",
                    file: "/reports/public-safety-2025.pdf",
                    size: "3.8 MB",
                  },
                  {
                    title: "Federal & State/Territory Government Report (2025)",
                    file: "/reports/federal-state-2025.pdf",
                    size: "5.1 MB",
                  },
                  {
                    title:
                      "Correctional Services Workforce Insights Report (2025)",
                    file: "/reports/correctional-services-2025.pdf",
                    size: "3.4 MB",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-[#E2DFD4] bg-[#F4F3EA]/50 flex items-center justify-between gap-3 hover:border-[#38761D] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#38761D] shrink-0" />
                      <div>
                        <h4 className="font-extrabold text-xs text-[#1B240E]">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-[#6B755E]">
                          PDF Document · {item.size}
                        </span>
                      </div>
                    </div>
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#85CC00] text-[#1B240E] font-extrabold text-[11px] px-3 py-1.5 rounded-full hover:bg-[#78B800] transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#F4F3EA] flex justify-end border-t border-[#E2DFD4]">
              <button
                onClick={() => setIsPdfModalOpen(false)}
                className="bg-[#1B240E] text-white font-extrabold text-xs px-5 py-2 rounded-full hover:bg-[#2A3716] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
