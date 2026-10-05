"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import { ArrowRight, Download } from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";

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
  description: string;
  descriptions?: string[];
  tags?: string[];
  path: string;
  icon: string;
}

const reportSections: ReportSection[] = [
  {
    title: "Executive Summary",
    description: "An executive overview of the workforce insights and strategies",
    tags: ["Executive Summary"],
    path: "executive_summary",
    icon: "/images/reports/federal-state/introduction/Executive.png",
  },
  {
    title: "Drivers of Change",
    description: "Four key drivers of change and the nine megatrends shaping long-term workforce trends.",
    tags: ["Drivers of Change", "Nine Megatrends"],
    path: "drivers_of_change",
    icon: "/images/reports/federal-state/introduction/Drivers.png",
  },
  {
    title: "Industry Overview",
    description: "An overview of the industry-sector and workforce profile data",
    tags: [
      "Federal Government Industry-Sector Overview",
      "Industry Profile",
      "Eight State and Territory Workforce Overviews",
    ],
    path: "industry_overview",
    icon: "/images/reports/federal-state/introduction/Overview.png",
  },
  {
    title: "Workforce Insights",
    description: "An overview of the workforce insights and supporting research, including industry insights.",
    descriptions: [
      "An overview of the workforce insights and supporting research, including industry insights.",
      "Summary of Workforce Themes and Insights",
      "Supporting information details for each insight",
    ],
    tags: ["Theme 1 - Future of the Public Service"],
    path: "workforce_insights",
    icon: "/images/reports/federal-state/introduction/Insights.png",
  },
  {
    title: "Workforce Strategies",
    description: "The Proposed Strategies, and other Strategies/Initiatives informing these.",
    tags: [
      "2026 Proposed Workforce Strategy",
      "Update on 2025 Workforce Strategies",
      "Existing Industry-Sector Strategies",
      "Federal Government Initiatives",
    ],
    path: "workforce_strategies",
    icon: "/images/reports/federal-state/introduction/Strategies.png",
  },
  {
    title: "Looking Forward",
    description:
      "Concludes the Report by outlining key lines of enquiry that will support shaping 2027 Federal and State/Territory Government Workforce Insights Report or other projects",
    tags: ["2027 and Beyond"],
    path: "looking_forward",
    icon: "/images/reports/federal-state/introduction/LookingForward.png",
  },
];

export default function FederalStateIntroductionView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();
  const structureRef = React.useRef<HTMLDivElement>(null);
  const [isStructureVisible, setIsStructureVisible] = React.useState(false);

  const getPreviousReportSlug = () => {
    const currentYear = parseInt(report?.year?.label || "2026", 10);
    const prevYear = isNaN(currentYear) ? 2025 : currentYear - 1;

    if (slug.endsWith(`-${currentYear}`)) {
      return slug.replace(new RegExp(`-${currentYear}$`), `-${prevYear}`);
    }
    if (/-\d{4}$/.test(slug)) {
      return slug.replace(/-\d{4}$/, `-${prevYear}`);
    }
    return `${slug}-${prevYear}`;
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsStructureVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (structureRef.current) {
      observer.observe(structureRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader slug={slug} report={report} currentPage="introduction" />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Top Hero Section */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 flex flex-col lg:flex-row items-start gap-8 lg:gap-[100px]">
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="animate-slide-up space-y-2">
                <span className="text-xs font-semibold text-notes uppercase block">
                  INTRODUCTION
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray800 leading-tight">
                  Federal and State/Territory Government Workforce Insights Report 2026
                </h1>
              </div>
              <div className="space-y-3 animate-slide-up-delay">
                <p className="text-sm text-gray600 leading-relaxed font-normal">
                  The 2026 Federal and State/Territory Government Workforce Insights Report (the Report) is the fourth workforce report generated by Public Skills Australia for the Federal and State/Territory Government industry-sector since 2023. It builds on the previous iterations to identify workforce challenges and proposes strategic initiatives to mitigate them. This report represents the insights, commitment and efforts of the Federal and State/Territory Government industry-sector shared with Public Skills Australia.
                </p>
                <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                  Public Skills Australia&apos;s{" "}
                  <span className="font-semibold text-notes">
                    Workforce Insights Reports
                  </span>{" "}
                  are developed using a combination of qualitative and quantitative data obtained from primary and secondary sources and supported by stakeholder consultations.
                </p>
                <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                  Choose to download the PDF report or read on to our interactive digital version.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => router.push(`/reports/${slug}/downloads`)}
                className="bg-[#598303] hover:bg-[#486806] text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Download {report?.year?.label || "2026"} PDF</span>
                <Download className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => router.push(`/reports/${getPreviousReportSlug()}`)}
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
                className="border border-gray200 bg-white hover:bg-gray-50 text-gray800 font-bold text-xs px-5 py-2.5 rounded-full transition-colors cursor-pointer no-underline"
              >
                PSA Website
              </a>
            </div>
          </div>

          {/* Right Panel: "THIS REPORT AT A GLANCE" */}
          <div className="w-full lg:w-[444px] lg:shrink-0 bg-[#F5F5F5] border border-gray200/80 rounded-2xl p-5 space-y-4 self-start animate-zoom-in">
            <div>
              <span className="text-xs font-semibold text-notes uppercase mb-4 block">
                THIS REPORT AT A GLANCE
              </span>
              <div className="grid grid-cols-2 gap-3">
                {/* 1. Drivers of Change & Megatrends */}
                <div className="bg-white rounded-xl p-4 border border-gray200/60 flex items-start justify-between gap-4 transition-all duration-300 hover:shadow-xs">
                  <div className="flex flex-col items-start">
                    <span className="text-2xl font-bold text-[#694834]">
                      <AnimatedCounter target={4} />
                    </span>
                    <span className="text-xs font-semibold text-gray600 mt-2 leading-tight">
                      Drivers of<br />Change
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-2xl font-bold text-[#694834]">
                      <AnimatedCounter target={9} />
                    </span>
                    <span className="text-xs font-semibold text-gray600 mt-2 leading-tight">
                      Megatrends
                    </span>
                  </div>
                </div>

                {/* 2. Workforce Employees */}
                <div className="bg-white rounded-xl p-4 border border-gray200/60 flex flex-col items-start justify-start transition-all duration-300 hover:shadow-xs">
                  <span className="text-2xl font-bold text-[#694834]">
                    <AnimatedCounter target={198529} formatNumber={true} />
                  </span>
                  <span className="text-xs font-semibold text-gray600 mt-2 leading-tight">
                    Workforce<br />Employees
                  </span>
                </div>

                {/* 3. Themes & Insights */}
                <div className="bg-white rounded-xl p-4 border border-gray200/60 flex items-start justify-between gap-4 transition-all duration-300 hover:shadow-xs">
                  <div className="flex flex-col items-start">
                    <span className="text-2xl font-bold text-[#694834]">
                      <AnimatedCounter target={1} />
                    </span>
                    <span className="text-xs font-semibold text-gray600 mt-2 leading-tight">
                      Themes
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-2xl font-bold text-[#694834]">
                      <AnimatedCounter target={3} />
                    </span>
                    <span className="text-xs font-semibold text-gray600 mt-2 leading-tight">
                      Workforce<br />Insights
                    </span>
                  </div>
                </div>

                {/* 4. Proposed 2026 Strategies */}
                <div className="bg-white rounded-xl p-4 border border-gray200/60 flex flex-col items-start justify-start transition-all duration-300 hover:shadow-xs">
                  <span className="text-2xl font-bold text-[#694834]">
                    <AnimatedCounter target={1} />
                  </span>
                  <span className="text-xs font-semibold text-gray600 mt-2 leading-tight">
                    Proposed 2026<br />Strategies
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── STRUCTURED SECTION ── */}
        <div ref={structureRef} id="structure" className="space-y-6">
          <h2
            className={`text-xl sm:text-2xl font-bold text-gray800 border-b border-gray200 pb-3 ${
              isStructureVisible ? "animate-slide-up" : "opacity-0"
            }`}
          >
            The Digital Report Structure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportSections.map((section, index) => (
              <div
                key={index}
                style={
                  isStructureVisible
                    ? { animationDelay: `${index * 0.12 + 0.1}s` }
                    : undefined
                }
                onClick={() =>
                  router.push(`/reports/${slug}/${section.path}`)
                }
                className={`bg-white rounded-2xl border border-gray200 border-t-12 border-t-[#694834] p-6 flex flex-col justify-between space-y-6 cursor-pointer transition-all duration-200 hover:border-2 hover:border-[#728C28] ${
                  isStructureVisible
                    ? "animate-card-entrance"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <div className="flex items-start justify-between gap-5">
                  {/* Left Column: All text content & tags */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-bold text-gray800 leading-snug mt-1">
                      {section.title}
                    </h3>
                    {section.descriptions ? (
                      <div className="space-y-1.5">
                        {section.descriptions.map((desc, dIdx) => (
                          <p key={dIdx} className="text-xs text-gray600 leading-relaxed">
                            {desc}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray600 leading-relaxed">
                        {section.description}
                      </p>
                    )}
                    {section.tags && section.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {section.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            style={{ backgroundColor: "#EED4C466" }}
                            className="text-[#694834] text-[10px] font-bold px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Icon */}
                  <div className="shrink-0 pt-0.5">
                    <img
                      src={section.icon}
                      alt={section.title}
                      className="w-14 h-14 object-contain"
                    />
                  </div>
                </div>

                {/* Bottom: Explore Button */}
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/reports/${slug}/${section.path}`);
                    }}
                    className="bg-[#8AC900] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-5 py-2 rounded-full flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TWO FEATURE BANNERS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F0F5DF] border border-gray200 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/images/reports/introduction/About.svg"
                alt="About Public Skills Australia"
                className="w-12 h-12 shrink-0 object-contain"
              />
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
              <img
                src="/images/reports/introduction/Methodology.svg"
                alt="Methodology"
                className="w-12 h-12 shrink-0 object-contain"
              />
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-sm text-gray800">Methodology</h4>
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
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
