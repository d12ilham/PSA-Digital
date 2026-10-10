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
    subtitle: "The Correctional Services workforce story on one page",
    description:
      "A concise view of the operating context, workforce challenges and the strategic priorities shaping this report.",
    path: "executive_summary",
  },
  {
    title: "Drivers of Change",
    icon: "/images/reports/introduction/Drivers.svg",
    description:
      "Four key drivers of change and the nine megatrends shaping long-term workforce planning and development.",
    tags: ["Four Key Drivers", "Nine Megatrends"],
    path: "drivers_of_change",
  },
  {
    title: "Industry Overview",
    icon: "/images/reports/introduction/Overview.svg",
    description:
      "Examines Correctional Services industry-sector data across custodial and community corrections settings.",
    tags: ["Industry-Sector Overview", "Industry Profile"],
    path: "industry_overview",
  },
  {
    title: "Workforce Insights",
    icon: "/images/reports/introduction/Insights.svg",
    description:
      "Details the 2026 workforce insights with a focus on community corrections roles and capability needs.",
    tags: ["Community Corrections", "Insight Detail Pages"],
    path: "workforce_insights",
  },
  {
    title: "Workforce Strategies",
    icon: "/images/reports/introduction/Strategies.svg",
    description:
      "The proposed, existing and government strategies informing Public Skills Australia's future work.",
    tags: [
      "2026 Proposed Strategies",
      "Existing Strategies",
      "Federal Initiatives",
    ],
    path: "workforce_strategies",
  },
  {
    title: "Looking Forward",
    icon: "/images/reports/introduction/Summary.svg",
    description:
      "The future lines of inquiry and priorities for the 2027 Workforce Insights Reports.",
    tags: ["2027 and Beyond"],
    path: "looking_forward",
  },
];

const atAGlanceStats = [
  { value: 4, label: "Drivers of Change" },
  { value: 9, label: "Megatrends" },
  { value: 46500, label: "Correctional Services workforce", formatNumber: true },
  { value: 114, label: "Custodial facilities" },
  { value: 1, label: "Primary workforce focus" },
  { value: 14, label: "Federal initiatives" },
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
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#38BDF8]/30 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="introduction" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-5 flex-1">
        <ReportNavButtons slug={slug} currentPage="introduction" />

        <section className="bg-white border border-[#E9EAEB] rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="animate-slide-up space-y-2">
                <span className="text-xs font-semibold text-[#0B6DA8] uppercase block">
                  Introduction
                </span>
                <h1 className="max-w-[760px] text-3xl sm:text-4xl font-bold leading-[1.35] text-[#063B5D]">
                  Correctional industry-sector workforce insight report 2026
                </h1>
              </div>

              <div className="space-y-3 animate-slide-up-delay">
                <p className="text-sm text-[#535862] leading-relaxed font-normal">
                  The 2026 Correctional Services Workforce Insights Report is
                  the fourth report generated by Public Skills Australia for the
                  Correctional Services industry-sector since 2023. It builds on
                  previous iterations to identify workforce challenges and
                  strategies to mitigate them. This Report represents the
                  insights, commitment and efforts of the Correctional Services
                  industry-sector that were shared with Public Skills Australia.
                </p>
                <p className="text-xs sm:text-sm text-[#535862] leading-relaxed font-normal">
                  Public Skills Australia&apos;s{" "}
                  <span className="font-semibold text-[#063B5D]">
                    Workforce Insights Reports
                  </span>{" "}
                  are developed using a combination of qualitative and
                  quantitative data obtained from primary and secondary sources
                  and supported by stakeholder consultations.
                </p>
                <p className="text-xs sm:text-sm text-[#535862] leading-relaxed font-normal">
                  Choose to download the PDF report or read on to our
                  interactive digital version.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.push(`/reports/${slug}/downloads`)}
                className="bg-[#0B6DA8] hover:bg-[#063B5D] text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Download {report?.year?.label || "2026"} PDF</span>
                <Download className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => router.push(`/reports/${getPreviousReportSlug()}`)}
                className="border border-[#38BDF8] bg-[#F0F9FF] hover:bg-white text-[#063B5D] font-bold text-xs px-5 py-2.5 rounded-full transition-colors cursor-pointer"
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

          <aside className="lg:col-span-5 bg-[#F5F5F5] border border-[#E9EAEB] rounded-2xl p-5 flex flex-col space-y-4 animate-zoom-in">
            <div>
              <span className="text-xs font-semibold text-[#0B6DA8] uppercase mb-4 block">
                This report at a glance
              </span>
              <div className="grid grid-cols-2 gap-3">
                {atAGlanceStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="min-h-[124px] bg-white rounded-xl border border-[#E9EAEB] p-4 flex flex-col justify-center transition-all duration-300 hover:shadow-xs hover:-translate-y-0.5"
                  >
                    <span className="text-2xl font-semibold text-[#0B6DA8]">
                      <AnimatedCounter
                        target={stat.value}
                        formatNumber={stat.formatNumber}
                      />
                    </span>
                    <span className="text-xs font-semibold text-[#535862] leading-tight mt-2">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#535862] leading-normal">
              This Report focuses on community corrections while recognising the
              relationship between custodial services, community supervision and
              future workforce capability.
            </p>
          </aside>
        </section>

        <section ref={structureRef} id="structure" className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between border-b border-[#D5D7DA] pb-3">
            <h2
              className={`text-xl sm:text-2xl font-bold text-[#252D02] ${
                isStructureVisible ? "animate-slide-up" : "opacity-0"
              }`}
            >
              This Report is structured as follows
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
                className={`relative bg-white rounded-2xl border border-[#E9EAEB] border-t-12 border-t-[#063B5D] p-6 flex flex-col justify-between space-y-6 cursor-pointer transition-all duration-200 hover:border-2 hover:border-[#0B6DA8] hover:shadow-md ${
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
                      <p className="text-xs font-medium text-[#0B6DA8] leading-relaxed">
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
                            className="bg-[#E8F7FE] text-[#075D87] text-[10px] font-bold px-3 py-1 rounded-full"
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
                  className="bg-[#38BDF8] hover:bg-[#0B6DA8] text-[#063B5D] hover:text-white font-bold text-xs px-5 py-2 rounded-full flex w-fit items-center gap-1.5 cursor-pointer transition-colors"
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
              className="bg-[#E8F7FE] border border-[#BEEBFB] rounded-2xl p-5 flex items-center justify-between gap-4 transition-all duration-300 hover:shadow-xs"
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
                className="bg-[#38BDF8] hover:bg-[#0B6DA8] text-[#063B5D] hover:text-white font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1 transition-colors cursor-pointer shrink-0"
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
