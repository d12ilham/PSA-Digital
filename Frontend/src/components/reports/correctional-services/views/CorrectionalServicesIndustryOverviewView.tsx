"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type CorrectionalServicesReport = {
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

type Stat = {
  icon: LucideIcon;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  formatNumber?: boolean;
};

const stats: Stat[] = [
  {
    icon: Landmark,
    value: 7.3,
    prefix: "$",
    suffix: " billion",
    decimals: 1,
    label: "net operating expenditure and capital costs for custodial corrections, 2024-25",
  },
  {
    icon: CircleDollarSign,
    value: 984,
    prefix: "just under $",
    suffix: " million",
    label: "for community corrections, 2024-25",
  },
  {
    icon: Building2,
    value: 114,
    label: "custodial facilities across Australia",
  },
  {
    icon: BriefcaseBusiness,
    value: 46500,
    formatNumber: true,
    label: "total workforce",
  },
];

const stories = [
  {
    number: "1",
    title: "Workforce Growth vs. Demand",
    metrics: [
      "+4.3% p.a. workforce growth",
      "-13.5% COs",
      "+5.9% custodial sentences",
    ],
    href: "industry_profile",
  },
  {
    number: "2",
    title: "Demand for Community Corrections",
    metrics: [
      "+3.9% since 2020",
      "15.4% vs 44.5% return within two years",
      "Ratio 16.5 → 15.4",
    ],
    href: "industry_profile_community",
  },
];

const sources = [
  ["8", "Correctional facilities data from Productivity Commission 2026, Report on Government Services, Corrective Services Table 8A.1.; workforce data from Jobs and Skills Australia, ATLAS Pro JSC Downloads, August 2025, downloaded 2 February 2026."],
  ["9", "Productivity Commission 2026, Report on Government Services, Corrective Services Table 8A.3."],
  ["10", "Jobs and Skills Australia (JSA), ATLAS Pro JSC Downloads, November 2025, downloaded 23 March 2026."],
  ["11", "JSA, ATLAS Pro JSC Downloads, November 2025, downloaded 23 March 2026."],
  ["12", "JSA, ATLAS Pro JSC Downloads, August 2025, downloaded 2 February 2026."],
  ["13", "Productivity Commission 2026, Report on Government Services, Corrective Services Table 8A.3. Data comparison for individuals in corrections is 2023-4 to 2024-5. Individuals also serve non-custodial sentences in the community."],
  ["14", "Productivity Commission 2026, Report on Government Services, Corrective Services Table 8A.6."],
  ["15", "Productivity Commission 2026, Report on Government Services - Table C Justice Services, Productivity Commission 2026, accessed 5 March 2026."],
  ["16", "Productivity Commission 2026, Report on Government Services, Corrective Services Table 8A.3. Data comparison for individuals in corrections is 2023-4 to 2024-5. Individuals also serve non-custodial sentences in the community. This group has not been included in the rate of growth for the custodial population."],
];

function SourceMarker({ number }: { number: string }) {
  return (
    <sup className="ml-0.5 text-[10px] font-bold text-[#424996]">
      <a href={`#source-${number}`} aria-label={`Source ${number}`} className="hover:underline">{number}</a>
    </sup>
  );
}

export default function CorrectionalServicesIndustryOverviewView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased selection:bg-[#8AC900]/30">
      <ReportHeader slug={slug} report={report} currentPage="industry_overview" />

      <main className="mx-auto flex w-full max-w-[1504px] flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="industry_overview"
          next={{ label: "Industry-Sector Profile", href: `/reports/${slug}/industry_profile_presentation` }}
        />

        <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
          <div className="flex flex-col gap-6 lg:min-h-[220px] lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[860px]">
              <h1 className="animate-slide-up text-[32px] font-bold leading-[1.25] text-[#424996] sm:text-[40px] sm:leading-[54px]">
                Correctional Services Industry-Sector Overview
              </h1>
              <p className="animate-slide-up-delay mt-4 text-sm leading-6 text-[#535862]">
                The Correctional Services industry-sector plays a critical role in managing offenders. The workforce spans a broad range of occupations, including COs, who deliver custodial services in correctional facilities, and CCOs, who supervise offenders serving non-custodial sentences or parole in the community. The workforce also includes public servants working inside and outside correctional environments across functions such as administration, education, health, policy and intelligence.
              </p>
            </div>
            <Image
              src="/images/reports/correctional-services-industry-overview-group-49.svg"
              alt="Correctional Services officer"
              width={160}
              height={160}
              className="shrink-0 self-center lg:mr-16"
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <article
                  key={stat.label}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="animate-card-entrance flex min-h-[152px] items-start gap-3 rounded-2xl border border-[#E9EAEB] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#A3A6D7] hover:shadow-sm"
                >
                  <span className="flex size-15 shrink-0 items-center justify-center rounded-full bg-[#F0F0F7] text-[#424996]">
                    <Icon size={32} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <strong className="block text-xl font-bold leading-8 text-[#252D02] sm:text-2xl">
                      {stat.prefix}<AnimatedCounter target={stat.value} decimals={stat.decimals} formatNumber={stat.formatNumber} />{stat.suffix}
                    </strong>
                    <p className="mt-1 text-sm leading-6 text-[#535862]">{stat.label}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <p className="mx-[25px] max-w-[800px] text-sm leading-6 text-[#535862]">
          In 2024-25, the net operating expenditure and capital costs for custodial corrections was $7.3 billion and just under $984 million for community corrections.<SourceMarker number="8" /> Across Australia, there are 114 custodial facilities and a total workforce of 46,500.<SourceMarker number="9" /> An analysis of the Correctional Services workforce profile identified the following trends:
        </p>

        <section className="grid gap-6 lg:grid-cols-2" aria-label="Industry data stories">
          {stories.map((story, index) => (
            <article key={story.number} className="flex min-h-[430px] flex-col rounded-2xl border border-[#E9EAEB] bg-white p-6 transition-shadow duration-300 hover:shadow-sm">
              <p className="text-xs font-bold uppercase leading-5 text-[#424996]">Trend {story.number}</p>
              <h2 className="mt-2 text-2xl font-bold leading-8 text-[#252D02]">{story.title}</h2>
              {index === 0 ? (
                <p className="mt-4 text-sm leading-6 text-[#535862]">
                  The Correctional Services industry-sector workforce has grown at an average rate of 4.3 per cent per annum over the past five years.<SourceMarker number="10" /> Despite overall industry-sector growth, the number of COs has decreased by 13.5 per cent over the same period, declining nationally from approximately 21,500 to 18,600.<SourceMarker number="11" /> The industry-sector workforce is projected to increase by 6.3 per cent over the next five years, and 11.2 per cent over the next ten years.<SourceMarker number="12" /> Therefore, the current rate of growth is not keeping pace with the increased number of individuals serving custodial sentences, which has risen by an average of 5.9 per cent.<SourceMarker number="13" /> Growth in custodial sentences may generate downstream demand for CCOs as persons in custody transition to parole.
                </p>
              ) : (
                <p className="mt-4 text-sm leading-6 text-[#535862]">
                  The number of individuals serving a community corrections order has increased, rising by 3.9 per cent since 2020, growing on average 1.5 per cent per year.<SourceMarker number="14" /> Recidivism rates tend to be lower for adults completing community orders (15.4 per cent returning to community corrections within two years) compared to persons in custody released from correctional facilities (44.5 per cent returning to correctional facilities within two years).<SourceMarker number="15" /> At the same time, the ratio of individuals serving community corrections orders per CCOs has decreased from 16.5 in 2015-16 to 15.4 in 2024-25.<SourceMarker number="16" />
                </p>
              )}
              <div className="mt-auto pt-6">
                <div className="flex flex-wrap gap-2">
                  {story.metrics.map((metric) => (
                    <span key={metric} className="rounded bg-[#F0F0F7] px-3 py-1 text-xs font-semibold leading-[18px] text-[#424996]">{metric}</span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => router.push(`/reports/${slug}/${story.href}`)}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-[#8AC900] px-5 text-xs font-bold text-[#252D02] transition-colors hover:bg-[#78AF00]"
                >
                  Open Supporting Data <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
          <h2 className="text-2xl font-bold leading-8 text-[#252D02]">Sources</h2>
          <div className="mt-5 grid gap-x-10 gap-y-4 text-xs leading-5 text-[#535862] md:grid-cols-2">
            {[sources.slice(0, 5), sources.slice(5)].map((column, index) => (
              <div key={index} className="space-y-4">
                {column.map(([number, source]) => (
                  <div id={`source-${number}`} key={number} className="flex scroll-mt-24 items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#598303] text-xs font-bold text-white">{number}</span>
                    <p>{source}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
