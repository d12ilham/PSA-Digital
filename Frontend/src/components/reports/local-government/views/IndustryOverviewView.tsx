"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
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

export default function IndustryOverviewView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();
  const [isHeroMounted, setIsHeroMounted] = React.useState(false);

  React.useEffect(() => {
    setIsHeroMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="industry_overview"
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <ReportNavButtons slug={slug} currentPage="industry_overview" />

        {/* Hero Card */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray800 animate-slide-up">
                <Link href={`/reports/${slug}/industry_profile`} className="text-inherit">
                  Local Government Industry-Sector Overview
                </Link>
              </h1>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal animate-slide-up-delay">
                Across Australia, there are 537 local councils.<sup>9</sup> Of these local
                councils, around 55 per cent are located in regional, rural or
                remote areas with the other 45 per cent split across urban
                regions, urban fringe and urban areas.<sup>10</sup> Local councils manage
                approximately one-third of Australia's public infrastructure
                assets, including roads, airports, facilities and other assets<sup>11</sup>
                and make up 77 per cent of the national road network (by
                length). The public assets managed by local councils are valued
                at an estimated $643 billion.<sup>12</sup>
              </p>
            </div>

            {/* Right Diagram Image */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end p-2">
              <img
                src="/images/reports/industry-overview/hero.svg"
                alt="Industry Overview Diagram"
                className={`h-auto max-h-48 object-contain select-none pointer-events-none ${
                  isHeroMounted ? "animate-hero-pulse-settle" : "opacity-0"
                }`}
              />
            </div>
          </div>

          {/* 4 Stat Boxes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <div
              style={{ animationDelay: "0.15s" }}
              className="animate-card-entrance bg-white border border-gray200 rounded-xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:shadow-xs"
            >
              <img
                src="/images/reports/industry-overview/item1.svg"
                alt="537 local councils"
                className="w-14 h-14 shrink-0 object-contain"
              />
              <div className="space-y-1">
                <span className="text-2xl font-bold text-gray800 block leading-none">
                  <AnimatedCounter target={537} />
                </span>
                <p className="text-xs text-gray600 leading-normal">
                  local councils across Australia
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div
              style={{ animationDelay: "0.27s" }}
              className="animate-card-entrance bg-white border border-gray200 rounded-xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:shadow-xs"
            >
              <img
                src="/images/reports/industry-overview/item2.svg"
                alt="55% / 45%"
                className="w-14 h-14 shrink-0 object-contain"
              />
              <div className="space-y-1">
                <span className="text-xl sm:text-2xl font-bold text-gray800 block leading-none">
                  <AnimatedCounter target={55} suffix="%" /> /{" "}
                  <AnimatedCounter target={45} suffix="%" />
                </span>
                <p className="text-xs text-gray600 leading-normal">
                  55% regional, rural or remote
                  <br />
                  45% urban regions, urban fringe and urban areas
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div
              style={{ animationDelay: "0.39s" }}
              className="animate-card-entrance bg-white border border-gray200 rounded-xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:shadow-xs"
            >
              <img
                src="/images/reports/industry-overview/item3.svg"
                alt="218,000 employees"
                className="w-14 h-14 shrink-0 object-contain"
              />
              <div className="space-y-1">
                <span className="text-2xl font-bold text-gray800 block leading-none">
                  <AnimatedCounter target={218000} formatNumber={true} />
                </span>
                <p className="text-xs text-gray600 leading-normal">
                  employees (estimated) in the Local Government workforce
                </p>
              </div>
            </div>

            {/* Stat 4 */}
            <div
              style={{ animationDelay: "0.51s" }}
              className="animate-card-entrance bg-white border border-gray200 rounded-xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:shadow-xs"
            >
              <img
                src="/images/reports/industry-overview/item4.svg"
                alt="400+ occupations"
                className="w-14 h-14 shrink-0 object-contain"
              />
              <div className="space-y-1">
                <span className="text-2xl font-bold text-gray800 block leading-none">
                  <AnimatedCounter target={400} suffix="+" />
                </span>
                <p className="text-xs text-gray600 leading-normal">
                  different occupations employed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: TWO MAIN TOPIC CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <img
                src="/images/reports/industry-overview/multidisciplinary.svg"
                alt="A multidisciplinary workforce"
                className="w-16 h-16 shrink-0 object-contain"
              />
              <h3 className="font-bold text-lg text-gray800">
                A multidisciplinary workforce
              </h3>
              <p className="text-xs text-gray600 leading-relaxed">
                The Local Government workforce is multidisciplinary, employing
                over an estimated 400 different occupations.<sup>13</sup> Their workforces
                are managed individually at the local council level but are
                brought together and commonly represented through state and
                territory associations and the Australian Local Government
                Association (ALGA). It is estimated that the Local Government
                workforce is made up of approximately 218,000 employees.<sup>14</sup> While
                employment projections have estimated significant growth in the
                Local Government workforce over the next ten years, successive
                Workforce Plans<sup>15</sup> and Parliamentary Commissions of Inquiry have
                noted extensive challenges with recruitment and retention, and a
                significant expansion of roles and responsibilities for the
                Local Government industry-sector.<sup>16</sup>
              </p>
            </div>

          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-4 flex flex-col">
            <div className="space-y-4">
              <img
                src="/images/reports/industry-overview/Custodians.svg"
                alt="Custodians of community infrastructure"
                className="w-16 h-16 shrink-0 object-contain"
              />
              <h3 className="font-bold text-lg text-gray800">
                Custodians of community infrastructure
              </h3>
              <p className="text-xs text-gray600 leading-relaxed">
                Local councils manage approximately one-third of Australia's
                public infrastructure assets – including roads, airports,
                facilities and other assets – and make up 77 per cent of the
                national road network by length. The public assets managed by
                local councils are valued at an estimated $643 billion.
              </p>
            </div>

            <p className="text-xs text-[#598303] leading-tight pt-4 border-t border-gray200">
              Source: ALGA, 2024 National State of the Assets Report, 2024.
            </p>
          </div>
        </div>

        {/* ── SECTION 3: FEATURE CALLOUTS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Callout 1 */}
          <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-bold text-base text-gray800">
                State and territory Workforce Profile
              </h3>
              <p className="text-xs text-gray600 leading-relaxed">
                The Local Government workforce is spread across a diverse
                geographical area. The workforce profile consists of a balanced
                gender representation and high representation of First Nations
                employees (8.2 per cent of total national workforce) when
                compared to the total national population (3.8 per cent of total
                Australian population).<sup>17</sup>
              </p>
            </div>

            <div>
              <button
                onClick={() => router.push(`/reports/${slug}/state_territory`)}
                className="bg-[#8AC900] hover:bg-[#78B300] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                View the interactive state profile{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Callout 2 */}
          <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-bold text-base text-gray800">
                Key Occupational Shortages by state and territory
              </h3>
              <p className="text-xs text-gray600 leading-relaxed">
                In consultation with stakeholders for the Local Government
                Skills Audit and Uptake and Utility of the LGA Local Government
                Training Package project, each local council identified top
                occupational shortages affecting their workforces. In examining
                these shortages against the Jobs and Skills Australia
                Occupational Shortage List, several Local Government specific
                shortages have been identified.
              </p>
            </div>

            <div>
              <button
                onClick={() => router.push(`/reports/${slug}/industry_profile`)}
                className="bg-[#8AC900] hover:bg-[#78B300] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                View the Industry Profile data{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── SECTION 4: SOURCES CONTAINER ── */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="font-bold text-xl text-gray800">Sources</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray600 leading-relaxed">
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  9
                </span>
                <p>
                  ALGA, <a href="https://alga.com.au/about/local-government/facts-and-figures/" target="_blank" rel="noopener noreferrer" className="text-active underline underline-offset-2 hover:text-lg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active">Facts and Figures</a>, ALGA, 2025, accessed 24 September 2025.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  11
                </span>
                <p>
                  ALGA, <a href="https://alga.com.au/wp-content/uploads/2025/04/ALGA-National-State-of-the-Assets-Report-2024-final.pdf" target="_blank" rel="noopener noreferrer" className="text-active underline underline-offset-2 hover:text-lg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active">2024 National State of the Assets Report</a>, ALGA, 2024, pages 4, 5 and 8, accessed 11 February 2026.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  13
                </span>
                <p>
                  ALGA, <a href="https://alga.com.au/about/local-government/facts-and-figures/" target="_blank" rel="noopener noreferrer" className="text-active underline underline-offset-2 hover:text-lg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active">Facts and Figures</a>, ALGA, 2025, accessed 24 September 2025.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  15
                </span>
                <p>
                  Public Skills Australia (PSA), <a href="https://psa-directus-prod.azurewebsites.net/assets/acd96fb3-8c56-4df4-9670-6a92e6eb696d" target="_blank" rel="noopener noreferrer" className="text-active underline underline-offset-2 hover:text-lg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active">Federal, State/Territory and Local Government Workforce Plan 2024</a>, PSA, 2024, accessed 11 February 2026; PSA, <a href="https://psa-directus-prod.azurewebsites.net/assets/27231b35-4c58-42d7-87ce-5b9cc24d0408" target="_blank" rel="noopener noreferrer" className="text-active underline underline-offset-2 hover:text-lg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active">2025 Local Government Workforce Insights Report</a>, PSA, 2025, accessed 11 February 2026.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  17
                </span>
                <p>
                  ABS, <a href="https://www.abs.gov.au/statistics/people/aboriginal-and-torres-strait-islander-peoples/estimates-aboriginal-and-torres-strait-islander-australians/latest-release" target="_blank" rel="noopener noreferrer" className="text-active underline underline-offset-2 hover:text-lg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active">Estimates of Aboriginal and Torres Strait Islander Australians</a>, ABS, 2021, accessed 12 February 2026; ALGA, <a href="https://alga.com.au/wp-content/uploads/2025/04/2022-Local-Government-Workforce-Skills-and-Capability-Survey-National-Report.pdf" target="_blank" rel="noopener noreferrer" className="text-active underline underline-offset-2 hover:text-lg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active">2022 Local Government Workforce Skills and Capability Survey</a>, ALGA, 2022, page 39, accessed 11 February 2026.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  10
                </span>
                <p>
                  ALGA, <a href="https://alga.com.au/about/local-government/facts-and-figures/" target="_blank" rel="noopener noreferrer" className="text-active underline underline-offset-2 hover:text-lg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active">Facts and Figures</a>, ALGA, 2025, accessed 24 September 2025.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  12
                </span>
                <p>
                  ALGA, <a href="https://alga.com.au/wp-content/uploads/2025/04/ALGA-National-State-of-the-Assets-Report-2024-final.pdf" target="_blank" rel="noopener noreferrer" className="text-active underline underline-offset-2 hover:text-lg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active">2024 National State of the Assets Report</a>, ALGA, 2024, pages 4, 5 and 8, accessed 11 February 2026.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  14
                </span>
                <p>
                  Australian Bureau of Statistics (ABS), <a href="https://www.abs.gov.au/statistics/labour/employment-and-unemployment/public-sector-employment-and-earnings/latest-release" target="_blank" rel="noopener noreferrer" className="text-active underline underline-offset-2 hover:text-lg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active">Public Sector Employment and Earnings</a>, ABS, 2025, accessed 11 February 2026.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-xs font-bold shrink-0">
                  16
                </span>
                <p>
                  Parliament of Australia, <a href="https://www.aph.gov.au/Parliamentary_Business/Committees/House/Regional_Development_Infrastructure_and_Transport/Localgovernmentsustaina/Interim_Report" target="_blank" rel="noopener noreferrer" className="text-active underline underline-offset-2 hover:text-lg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active">Inquiry into Local Government Sustainability Interim Report</a>, Parliament of Australia, 2025, accessed 11 February 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} variant="pill" />
    </div>
  );
}
