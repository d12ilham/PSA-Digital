"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  Globe,
  Lightbulb,
  RefreshCw,
  Wrench,
} from "lucide-react";

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

interface ReportSection {
  title: string;
  icon: React.ElementType;
  subtitle?: string;
  description: string;
  tags?: string[];
  path: string;
}

const reportSections: ReportSection[] = [
  {
    title: "Executive Summary",
    icon: FileText,
    subtitle: "The Local Government workforce story on one page",
    description: "A concise, presentation-friendly view of the report story.",
    path: "executive_summary",
  },
  {
    title: "Drivers of Change",
    icon: RefreshCw,
    description:
      "Four key drivers of change and the nine megatrends shaping long-term workforce trends.",
    tags: ["Drivers of Change", "Nine Megatrends"],
    path: "drivers_of_change",
  },
  {
    title: "Industry Overview",
    icon: Globe,
    description: "Examines the Local Government workforce data analysis.",
    tags: [
      "Industry-Sector Overview",
      "State and Territory Profile",
      "Industry Profile",
    ],
    path: "industry_overview",
  },
  {
    title: "Workforce Insights",
    icon: Lightbulb,
    description:
      "Details the Local Government workforce insights across two themes and seven insights.",
    tags: ["7 insight detail pages", "Insights overview"],
    path: "workforce_insights",
  },
  {
    title: "Workforce Strategies",
    icon: Wrench,
    description: "The strategies and related initiatives informing PSA's work.",
    tags: [
      "2026 Proposed Strategies",
      "Update on 2025 Strategies",
      "Existing Strategies",
      "Federal Initiatives",
    ],
    path: "workforce_strategies",
  },
  {
    title: "Looking Forward",
    icon: BookOpen,
    description:
      "The future lines of inquiry and priorities for the next reports.",
    tags: ["2027 and Beyond"],
    path: "looking_forward",
  },
];

export default function IntroductionView({
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
      <header className="bg-[#161b01] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div
            onClick={() => router.push(`/reports/${slug}`)}
            className="flex items-center gap-2 cursor-pointer font-extrabold text-base text-white hover:text-accent transition-colors"
          >
            <span>LG WIR {report.year?.label || "2026"}</span>
          </div>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs font-semibold">
            <div className="relative group py-1">
              <button className="flex items-center gap-1 text-accent font-bold cursor-pointer">
                About <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-48 space-y-1 z-50">
                <button
                  onClick={() => router.push(`/reports/${slug}/introduction`)}
                  className="w-full text-left px-3 py-2 text-xs text-accent font-bold hover:bg-white/10 rounded-lg transition-colors"
                >
                  Introduction
                </button>
                <button
                  onClick={() => router.push(`/reports/${slug}/about`)}
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  About Public Skills Australia
                </button>
                <button
                  onClick={() => router.push(`/reports/${slug}/methodology`)}
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Methodology
                </button>
              </div>
            </div>

            <button
              onClick={() => router.push(`/reports/${slug}/executive_summary`)}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Executive Summary
            </button>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/drivers_of_change`)
                }
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
              >
                Drivers of Change <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-48 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/drivers_of_change`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Drivers of Change
                </button>
                <button
                  onClick={() => router.push(`/reports/${slug}/megatrends`)}
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Nine Megatrends
                </button>
              </div>
            </div>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/industry_overview`)
                }
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
              >
                Industry Overview <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-56 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/industry_overview`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Industry-Sector Overview
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/state_territory`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  State and Territory Profile
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/industry_profile`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Industry Profile
                </button>
              </div>
            </div>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
              >
                Workforce Insights <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-48 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Insights Overview
                </button>
              </div>
            </div>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_strategies`)
                }
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
              >
                Workforce Strategies <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-56 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_strategies`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  2026 Proposed Strategies
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/existing_strategies`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Existing Strategies
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/federal_initiatives`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Federal Initiatives
                </button>
              </div>
            </div>

            <button
              onClick={() => router.push(`/reports/${slug}/looking_forward`)}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Looking Forward
            </button>
          </nav>

          <div>
            {report.pdfFileUrl ? (
              <a
                href={report.pdfFileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0C582B] hover:bg-[#046D2A] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Download 2026 PDF</span>
                <Download className="h-3.5 w-3.5" />
              </a>
            ) : (
              <button
                onClick={() => router.push(`/reports/${slug}`)}
                className="bg-[#0C582B] hover:bg-[#046D2A] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Download 2026 PDF</span>
                <Download className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 flex-1">
        {/* Top Hero Section */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-notes uppercase block">
                INTRODUCTION
              </span>
              <h1 className="text-4xl font-bold text-gray800 leading-tight">
                The fourth workforce report for the Local Government
                industry-sector
              </h1>
              <p className="text-sm text-gray600 leading-relaxed font-normal">
                The 2026 Local Government Workforce Insights Report is the
                fourth workforce report generated by Public Skills Australia for
                the Local Government industry-sector since 2023. It builds on
                the previous iterations to identify workforce challenges and
                proposes strategic initiatives to mitigate them. This Report
                represents the insights, commitment and efforts of the Local
                Government industry-sector, shared with Public Skills Australia.
              </p>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                Public Skills Australia's{" "}
                <span className="font-semibold text-lg-dark">
                  Workforce Insights Reports
                </span>{" "}
                are developed using a combination of qualitative and
                quantitative data obtained from primary and secondary sources
                and supported by stakeholder consultations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {report.pdfFileUrl ? (
                <a
                  href={report.pdfFileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-lg-dark hover:bg-[#046D2A] text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
                >
                  Download 2026 PDF <Download className="h-3.5 w-3.5" />
                </a>
              ) : (
                <button
                  onClick={() => router.push(`/reports/${slug}`)}
                  className="bg-lg-dark hover:bg-[#046D2A] text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
                >
                  Download 2026 PDF <Download className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                onClick={() => router.push("/reports")}
                className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray-50 text-notes font-bold text-xs px-5 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                Previous Report
              </button>
              <a
                href={
                  report.psaSectorPageUrl ||
                  "https://publicskillsaustralia.org.au"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray200 bg-white hover:bg-gray-50 text-[#252D02] font-bold text-xs px-5 py-2.5 rounded-full transition-colors cursor-pointer no-underline"
              >
                PSA Website
              </a>
            </div>
          </div>

          {/* Right Panel: "THIS REPORT AT A GLANCE" */}
          <div className="lg:col-span-5 bg-[#F5F5F5] border border-border/50 rounded-2xl p-5 flex flex-col space-y-4">
            <div>
              <span className="text-xs font-semibold text-notes uppercase mb-4 block">
                THIS REPORT AT A GLANCE
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-4 flex justify-between">
                  <div className="flex flex-col flex-1 items-baseline gap-2 mb-1">
                    <span className="text-2xl font-semibold text-[#8AC900]">
                      4
                    </span>
                    <span className="text-xs font-semibold text-gray600">
                      Drivers of Change
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 items-baseline gap-2">
                    <span className="text-2xl font-semibold text-[#8AC900]">
                      9
                    </span>
                    <span className="text-xs font-semibold text-gray600">
                      Megatrends
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 flex flex-col justify-center">
                  <span className="text-2xl font-semibold text-[#8AC900]">
                    218,000
                  </span>
                  <span className="text-xs font-semibold text-gray600 leading-tight mt-1">
                    Workforce Employees
                  </span>
                </div>

                <div className="bg-white rounded-xl p-4 flex justify-between">
                  <div className="flex flex-col flex-1 items-baseline gap-2 mb-1">
                    <span className="text-2xl font-semibold text-[#8AC900]">
                      2
                    </span>
                    <span className="text-xs font-semibold text-gray600">
                      Themes
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 items-baseline gap-2">
                    <span className="text-2xl font-semibold text-[#8AC900]">
                      7
                    </span>
                    <span className="text-xs font-semibold text-gray600">
                      Workforce Insights
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 flex flex-col justify-center">
                  <span className="text-2xl font-semibold text-[#8AC900]">
                    2
                  </span>
                  <span className="text-xs font-semibold text-gray600 leading-tight mt-1">
                    Proposed 2026 Strategies
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray600 leading-snug">
              LG imagery from the brand library sits behind this panel in final
              design.
            </p>
          </div>
        </div>

        {/* ── STRUCTURED SECTION ── */}
        <div id="structure" className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray800 border-b border-gray-300 pb-3">
            This Report is structured as follows
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-border border-t-12 border-t-lg-dark p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-extrabold text-gray800">
                        {section.title}
                      </h3>
                      <div className="w-10 h-10 rounded-full bg-cards text-notes flex items-center justify-center shrink-0">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>
                    {section.subtitle && (
                      <p className="text-xs font-medium text-notes">
                        {section.subtitle}
                      </p>
                    )}
                    <p className="text-xs text-gray600 leading-relaxed">
                      {section.description}
                    </p>
                    {section.tags && section.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {section.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-[#F0F5DF] text-notes text-xs font-bold px-3 py-1.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() =>
                        router.push(`/reports/${slug}/${section.path}`)
                      }
                      className="bg-[#8AC900] hover:bg-[#77A60D] text-gray800 font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      Explore <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── TWO FEATURE BANNERS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F0F5DF] border border-gray200 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FAFAF0] flex items-center justify-center text-notes shrink-0 border border-gray200">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-sm text-gray800">
                  About Public Skills Australia
                </h4>
                <p className="text-xs text-gray600">
                  Who we are and how we support the sector.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push(`/reports/${slug}/about`)}
              className="bg-[#8AC900] hover:bg-[#77A60D] text-[#252D02] font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            >
              View <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="bg-[#F0F5DF] border border-gray200 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FAFAF0] flex items-center justify-center text-notes shrink-0 border border-gray200">
                <Lightbulb className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-extrabold text-sm text-gray800">
                  Methodology
                </h4>
                <p className="text-xs text-gray600">
                  How the insights and strategies were developed.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push(`/reports/${slug}/methodology`)}
              className="bg-[#8AC900] hover:bg-[#77A60D] text-[#252D02] font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            >
              View <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#252D02] text-white py-4 px-6 sm:px-8 border-t border-[#E2E8F0]">
        <div className="max-w-360 mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-white">
            © Public Skills Australia 2026 · Local Government Workforce Insights
            Report
          </p>
          <a
            href={
              report.contactUrl ||
              "https://publicskillsaustralia.org.au/contact"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold no-underline"
          >
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
}
