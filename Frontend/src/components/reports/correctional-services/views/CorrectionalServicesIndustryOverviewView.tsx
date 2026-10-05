"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type CorrectionalServicesReport = {
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: {
    label: string;
  };
  industry?: {
    slug?: string;
    name?: string;
  };
};

const stats = [
  {
    icon: "/images/reports/industry-overview/item1.svg",
    value: 7.3,
    prefix: "$",
    suffix: "b",
    label: "net operating expenditure and capital costs for custodial corrections",
  },
  {
    icon: "/images/reports/industry-overview/item2.svg",
    value: 984,
    prefix: "$",
    suffix: "m",
    label: "for community corrections",
  },
  {
    icon: "/images/reports/industry-overview/item3.svg",
    value: 114,
    label: "custodial facilities across Australia",
  },
  {
    icon: "/images/reports/industry-overview/item4.svg",
    value: 46500,
    formatNumber: true,
    label: "total Correctional Services workforce",
  },
];

const storyMetrics = [
  ["+4.3% p.a.", "workforce growth"],
  ["-13.5%", "Correctional Officers"],
  ["+5.9%", "custodial sentences"],
];

const communityMetrics = [
  ["+3.9%", "since 2020"],
  ["15.4% vs 44.5%", "return within two years"],
  ["16.5 → 15.4", "offender-to-staff ratio"],
];

const sources = [
  [
    "8",
    "Correctional facilities data from Productivity Commission 2026, Report on Government Services, Corrective Services Table 8A.1.; workforce data from Jobs and Skills Australia, ATLAS Pro JSC Downloads, August 2025, downloaded 2 February 2026.",
  ],
  [
    "9",
    "Productivity Commission 2026, Report on Government Services, Corrective Services Table 8A.3.",
  ],
  [
    "10",
    "Jobs and Skills Australia (JSA), ATLAS Pro JSC Downloads, November 2025, downloaded 23 March 2026.",
  ],
  [
    "11",
    "JSA, ATLAS Pro JSC Downloads, November 2025, downloaded 23 March 2026.",
  ],
  [
    "12",
    "JSA, ATLAS Pro JSC Downloads, August 2025 downloaded 2 February 2026.",
  ],
  [
    "13",
    "Productivity Commission 2026, Report on Government Services, Corrective Services Table 8A.3.",
  ],
  [
    "14",
    "Productivity Commission 2026, Report on Government Services, Corrective Services Table 8A.6.",
  ],
  [
    "15",
    "Productivity Commission 2026, Report on Government Service - Table C Justice Services, Productivity Commission 2026, accessed 5 March 2026.",
  ],
];

function StatValue({
  value,
  prefix,
  suffix,
  formatNumber,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  formatNumber?: boolean;
}) {
  return (
    <span className="text-2xl font-bold leading-none text-[#252D02]">
      {prefix}
      <AnimatedCounter target={value} formatNumber={formatNumber} />
      {suffix}
    </span>
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
  const [isHeroMounted, setIsHeroMounted] = React.useState(false);
  const storiesRef = React.useRef<HTMLDivElement>(null);
  const [isStoriesVisible, setIsStoriesVisible] = React.useState(false);

  React.useEffect(() => {
    setIsHeroMounted(true);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStoriesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (storiesRef.current) observer.observe(storiesRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#38BDF8]/30 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="industry_overview" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        <ReportNavButtons slug={slug} currentPage="industry_overview" />

        <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <p className="animate-slide-up text-xs font-semibold uppercase leading-6 text-[#0B6DA8]">
                Correctional Services WIR 2026
              </p>
              <h1 className="animate-slide-up text-3xl sm:text-4xl font-bold text-[#063B5D]">
                Correctional Services Industry-Sector Overview
              </h1>
              <p className="animate-slide-up-delay text-sm text-[#535862] leading-relaxed">
                In 2024-25, the net operating expenditure and capital costs for
                custodial corrections was $7.3 billion and just under $984
                million for community corrections. Across Australia, there are
                114 custodial facilities and a total workforce of 46,500. An
                analysis of the Correctional Services workforce profile
                identified the following trends:
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end p-2">
              <Image
                src="/images/reports/industry-overview/hero.svg"
                alt=""
                width={220}
                height={220}
                className={`h-auto max-h-48 object-contain select-none ${
                  isHeroMounted ? "animate-hero-pulse-settle" : "opacity-0"
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <article
                key={stat.label}
                style={{ animationDelay: `${index * 0.12 + 0.15}s` }}
                className="animate-card-entrance flex items-start gap-3.5 rounded-xl border border-[#E9EAEB] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
              >
                <Image
                  src={stat.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 object-contain"
                />
                <div className="space-y-1">
                  <StatValue
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    formatNumber={stat.formatNumber}
                  />
                  <p className="text-xs leading-normal text-[#535862]">
                    {stat.label}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section ref={storiesRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article
            className={`flex flex-col justify-between space-y-5 rounded-2xl border border-[#E9EAEB] bg-white p-6 ${
              isStoriesVisible ? "animate-card-entrance" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="space-y-4">
              <Image
                src="/images/reports/industry-overview/multidisciplinary.svg"
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 object-contain animate-zoom-in"
              />
              <div>
                <p className="text-xs font-bold uppercase text-[#0B6DA8]">
                  Data Story 1
                </p>
                <h2 className="mt-2 text-xl font-bold text-[#252D02]">
                  Workforce Growth vs. Demand
                </h2>
              </div>
              <p className="text-sm leading-6 text-[#535862]">
                The Correctional Services industry-sector workforce has grown at
                an average rate of 4.3 per cent per annum over the past five
                years. Despite overall industry-sector growth, the number of COs
                has decreased by 13.5 per cent over the same period, declining
                nationally from approximately 21,500 to 18,600. The workforce is
                projected to increase by 6.3 per cent over the next five years,
                and 11.2 per cent over the next ten years. Therefore, the
                current rate of growth is not keeping pace with the increased
                number of individuals serving custodial sentences, which has
                risen by an average of 5.9 per cent.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {storyMetrics.map(([value, label]) => (
                <div key={label} className="rounded-lg bg-[#E8F7FE] p-4">
                  <strong className="block text-xl font-bold text-[#0B6DA8]">
                    {value}
                  </strong>
                  <span className="mt-1 block text-xs font-semibold leading-5 text-[#535862]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article
            style={isStoriesVisible ? { animationDelay: "0.15s" } : undefined}
            className={`flex flex-col justify-between space-y-5 rounded-2xl border border-[#E9EAEB] bg-white p-6 ${
              isStoriesVisible ? "animate-card-entrance" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="space-y-4">
              <Image
                src="/images/reports/industry-overview/Custodians.svg"
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 object-contain animate-zoom-in"
              />
              <div>
                <p className="text-xs font-bold uppercase text-[#0B6DA8]">
                  Data Story 2
                </p>
                <h2 className="mt-2 text-xl font-bold text-[#252D02]">
                  Demand for Community Corrections
                </h2>
              </div>
              <p className="text-sm leading-6 text-[#535862]">
                The number of individuals serving a community corrections order
                has increased, rising by 3.9 per cent since 2020, growing on
                average 1.5 per cent per year. Recidivism rates tend to be lower
                for adults completing community orders (15.4 per cent returning
                to community corrections within two years) compared to persons
                in custody released from correctional facilities (44.5 per cent
                returning to correctional facilities within two years). At the
                same time, the ratio of individuals serving community
                corrections orders per CCOs has decreased from 16.5 in 2015-16
                to 15.4 in 2024-25.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {communityMetrics.map(([value, label]) => (
                <div key={label} className="rounded-lg bg-[#E8F7FE] p-4">
                  <strong className="block text-xl font-bold text-[#0B6DA8]">
                    {value}
                  </strong>
                  <span className="mt-1 block text-xs font-semibold leading-5 text-[#535862]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="flex flex-col justify-between space-y-4 rounded-2xl border border-[#E9EAEB] bg-white p-6">
            <div className="space-y-3">
              <h2 className="text-base font-bold text-[#252D02]">
                Correctional Services industry profile
              </h2>
              <p className="text-sm leading-6 text-[#535862]">
                The next section presents Correctional Services employment,
                facilities, workforce characteristics, enrolments, imprisonment
                rates, prison capacity and expenditure data as interactive chart
                states.
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push(`/reports/${slug}/industry_profile`)}
              className="inline-flex h-10 w-fit items-center gap-2 rounded-full bg-[#38BDF8] px-5 text-xs font-bold text-[#063B5D] transition-colors hover:bg-[#0B6DA8] hover:text-white"
            >
              View the Industry Profile data{" "}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </article>

          <article className="flex flex-col justify-between space-y-4 rounded-2xl border border-[#E9EAEB] bg-[#E8F7FE] p-6">
            <div className="space-y-3">
              <h2 className="text-base font-bold text-[#252D02]">
                Community corrections focus
              </h2>
              <p className="text-sm leading-6 text-[#535862]">
                Growth in custodial sentences may generate downstream demand for
                Community Corrections Officers as persons in custody transition
                to parole.
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push(`/reports/${slug}/workforce_insights`)}
              className="inline-flex h-10 w-fit items-center gap-2 rounded-full bg-[#0B6DA8] px-5 text-xs font-bold text-white transition-colors hover:bg-[#063B5D]"
            >
              View Workforce Insights <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </article>
        </section>

        <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-[#252D02]">Sources</h2>
          <div className="grid grid-cols-1 gap-4 text-xs leading-relaxed text-[#535862] md:grid-cols-2">
            {sources.map(([number, source]) => (
              <div key={number} className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F7FE] text-xs font-bold text-[#0B6DA8]">
                  {number}
                </span>
                <p>{source}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
