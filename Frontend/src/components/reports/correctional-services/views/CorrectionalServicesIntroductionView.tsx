"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Download } from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type CorrectionalServicesReport = {
  id?: string;
  title?: string;
  slug?: string;
  status?: string;
  pdfFileUrl?: string;
  psaSectorPageUrl?: string;
  contactUrl?: string;
  year?: {
    label: string;
  };
};

type ReportSection = {
  title: string;
  icon: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  path: string;
};

const reportSections: ReportSection[] = [
  {
    title: "Executive Summary",
    icon: "/images/reports/introduction/Executive.svg",
    description:
      "An executive overview of the workforce insights and strategies",
    tags: ["Executive Summary"],
    path: "executive_summary",
  },
  {
    title: "Drivers Of Change",
    icon: "/images/reports/introduction/Drivers.svg",
    description:
      "Four key drivers of change and the nine megatrends shaping long-term workforce trends.",
    tags: ["Drivers of Change", "Nine Megatrends"],
    path: "drivers_of_change",
  },
  {
    title: "Industry Overview",
    icon: "/images/reports/introduction/Overview.svg",
    description: "An overview of the industry-sector and workforce profile data",
    tags: [
      "Federal Government Industry-Sector Overview",
      "Industry Profile",
      "Eight State and Territory Workforce Overviews",
    ],
    path: "industry_overview",
  },
  {
    title: "Workforce Insights",
    icon: "/images/reports/introduction/Insights.svg",
    description:
      "An overview of the workforce insights and supporting research, including industry insights.",
    tags: [
      "Summary of Workforce Themes and Insights",
      "Supporting information details for each Insight",
    ],
    path: "workforce_insights",
  },
  {
    title: "Workforce Strategies",
    icon: "/images/reports/introduction/Strategies.svg",
    description:
      "The Proposed Strategies, and other Strategies/Initiatives informing these.",
    tags: [
      "2026 Proposed Workforce Strategy",
      "Update on 2024 Strategies",
      "Update on 2025 Strategies",
      "Existing Industry-Sector Strategies",
      "Commonwealth Government Initiatives",
    ],
    path: "workforce_strategies",
  },
  {
    title: "Looking Forward",
    icon: "/images/reports/introduction/Summary.svg",
    description: "The future lines of enquiry and priorities for the next reports.",
    tags: ["2027 and Beyond"],
    path: "looking_forward",
  },
];

type GlanceMetric = {
  value: number;
  label: string;
  formatNumber?: boolean;
};

type GlanceStat = {
  metrics: GlanceMetric[];
};

const atAGlanceStats: GlanceStat[] = [
  {
    metrics: [
      { value: 4, label: "Drivers of Change" },
      { value: 9, label: "Megatrends" },
    ],
  },
  {
    metrics: [
      { value: 46500, label: "Correctional Services workforce", formatNumber: true },
    ],
  },
  {
    metrics: [
      { value: 1, label: "Theme" },
      { value: 3, label: "Insights" },
    ],
  },
  {
    metrics: [{ value: 1, label: "Proposed 2026 Strategy" }],
  },
];

export default function CorrectionalServicesIntroductionView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const router = useRouter();
  const structureRef = React.useRef<HTMLDivElement>(null);
  const [isStructureVisible, setIsStructureVisible] = React.useState(false);

  const getPreviousReportSlug = () => {
    const currentYear = parseInt(report?.year?.label || "2026", 10);
    const prevYear = Number.isNaN(currentYear) ? 2025 : currentYear - 1;

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
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStructureVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (structureRef.current) observer.observe(structureRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF0] text-[#252D02] font-sans flex flex-col justify-between selection:bg-[#424996]/10 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="introduction" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-5 flex-1">
        <ReportNavButtons slug={slug} currentPage="introduction" />

        <section className="bg-white border border-[#E9EAEB] rounded-2xl p-6 flex flex-col lg:flex-row items-start gap-8 lg:gap-[100px]">
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="animate-slide-up space-y-2">
                <span className="text-xs font-semibold text-[#598303] uppercase block">
                  Introduction
                </span>
                <h1 className="max-w-[760px] text-3xl font-bold leading-tight text-[#252D02] sm:text-4xl">
                  2026 Correctional Services Workforce Insights Report
                </h1>
              </div>

              <div className="space-y-3 animate-slide-up-delay">
                <p className="text-sm text-[#535862] leading-relaxed font-normal">
                  The 2026 Correctional Services Workforce Insights Report is the fourth report generated by Public Skills Australia for the Correctional Services industry-sector since 2023. It builds on previous iterations to identify workforce challenges and strategies to mitigate them. This Report represents the insights, commitment and efforts of the Correctional Services industry-sector that were shared with Public Skills Australia.
                </p>
                <p className="text-xs sm:text-sm text-[#535862] leading-relaxed font-normal">
                  Public Skills Australia&rsquo;s Workforce Insights Reports are developed using a combination of qualitative and quantitative data obtained from primary and secondary sources and supported by stakeholder consultations.
                </p>
                <p className="text-xs sm:text-sm text-[#535862] leading-relaxed font-normal">
                  Choose to download the PDF report or read on to our interactive digital version.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.push(`/reports/${slug}/downloads`)}
                className="bg-[#046D2A] hover:bg-[#252D02] text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Download {report?.year?.label || "2026"} PDF</span>
                <Download className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => router.push(`/reports/${getPreviousReportSlug()}`)}
                className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-[#F0F5DF] text-[#598303] font-bold text-xs px-5 py-2.5 rounded-full transition-colors cursor-pointer"
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
                className="border border-[#E9EAEB] bg-white hover:bg-gray-50 text-[#252D02] font-bold text-xs px-5 py-2.5 rounded-full transition-colors cursor-pointer no-underline"
              >
                PSA Website
              </a>
            </div>
          </div>

          <aside className="w-full lg:w-[444px] lg:shrink-0 bg-[#F5F5F5] border border-gray200/80 rounded-2xl p-5 space-y-4 self-start animate-zoom-in">
            <div>
              <span className="text-xs font-semibold text-[#598303] uppercase mb-4 block">
                THIS REPORT AT A GLANCE
              </span>
              <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
                {atAGlanceStats.map((stat, index) => (
                  <div
                    key={index}
                    className={`min-w-0 bg-white rounded-xl p-4 border border-gray200/60 transition-all duration-300 hover:shadow-xs ${
                      stat.metrics.length > 1
                        ? "flex items-start justify-between gap-4"
                        : "flex flex-col items-start justify-start"
                    }`}
                  >
                    {stat.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex flex-col items-start"
                      >
                        <span className="text-2xl font-bold text-[#424996]">
                          <AnimatedCounter
                            target={metric.value}
                            formatNumber={metric.formatNumber}
                          />
                        </span>
                        <span className="text-xs font-semibold text-gray600 mt-2 leading-tight">
                          {metric.label === "Drivers of Change" ? (
                            <>Drivers of<br />Change</>
                          ) : metric.label === "Workforce Employees" ? (
                            <>Workforce<br />Employees</>
                          ) : metric.label === "Workforce Insights" ? (
                            <>Workforce<br />Insights</>
                          ) : metric.label === "Proposed 2026 Strategies" ? (
                            <>Proposed 2026<br />Strategies</>
                          ) : (
                            metric.label
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section ref={structureRef} id="structure" className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between border-b border-[#D5D7DA] pb-3">
            <h2
              className={`text-xl sm:text-2xl font-bold text-[#252D02] ${
                isStructureVisible ? "animate-slide-up" : "opacity-0"
              }`}
            >
              The Digital Report Structure
            </h2>
            <p className="text-sm leading-6 text-[#535862]">
              Six parts - select any to explore it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportSections.map((section, index) => (
              <article
                key={section.title}
                style={
                  isStructureVisible
                    ? { animationDelay: `${index * 0.12 + 0.1}s` }
                    : undefined
                }
                onClick={() => router.push(`/reports/${slug}/${section.path}`)}
                className={`relative bg-white rounded-2xl border border-[#E9EAEB] border-t-12 border-t-[#424996] p-6 flex flex-col justify-between space-y-6 cursor-pointer transition-all duration-200 hover:border-2 hover:border-[#424996] hover:shadow-md ${
                  isStructureVisible
                    ? "animate-card-entrance"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-bold text-[#252D02] leading-snug mt-1">
                      {section.title}
                    </h3>
                    {section.subtitle && (
                      <p className="text-xs font-medium text-[#424996] leading-relaxed">
                        {section.subtitle}
                      </p>
                    )}
                    <p className="text-xs text-[#535862] leading-relaxed">
                      {section.description}
                    </p>
                    {section.tags && section.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {section.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[rgba(66,73,150,0.1)] text-[#424996] text-[10px] font-bold px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <Image
                    src={section.icon}
                    alt=""
                    width={56}
                    height={56}
                    className="w-14 h-14 shrink-0 object-contain animate-zoom-in"
                  />
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    router.push(`/reports/${slug}/${section.path}`);
                  }}
                  className="bg-[#8AC900] hover:bg-[#B2DB79] text-[#252D02] font-bold text-xs px-5 py-2 rounded-full flex w-fit items-center gap-1.5 cursor-pointer transition-colors"
                >
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "About Public Skills Australia",
              description: "Who we are and how we support the sector.",
              path: "about",
              icon: "/images/reports/introduction/About.svg",
            },
            {
              title: "Methodology",
              description: "How the insights and strategies were developed.",
              path: "methodology",
              icon: "/images/reports/introduction/Methodology.svg",
            },
          ].map((item) => (
            <div
              key={item.path}
              className="bg-[#F0F5DF] border border-[#E9EAEB] rounded-2xl p-5 flex items-center justify-between gap-4 transition-all duration-300 hover:shadow-xs"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="w-12 h-12 shrink-0 object-contain animate-zoom-in"
                />
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-sm text-[#252D02]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#535862]">{item.description}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => router.push(`/reports/${slug}/${item.path}`)}
                className="bg-[#8AC900] hover:bg-[#B2DB79] text-[#252D02] font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1 transition-colors cursor-pointer shrink-0"
              >
                View <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
