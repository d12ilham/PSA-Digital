"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
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

const iconPath = (name: string) => `/images/reports/introduction/${name}.svg`;

const challengeCards = [
  {
    title: "Correctional Services recruitment pipeline",
    description:
      "A continuing workforce challenge identified through previous Correctional Services Workforce Insights Reports and the 2024 Correctional Services Workforce Plan.",
  },
  {
    title: "Implementation of vocational education and training (VET)",
    description:
      "A priority challenge connected to the currency, relevance and delivery of Correctional Practice qualifications across custodial and community settings.",
  },
  {
    title: "Primary focus: community corrections workforce",
    description:
      "The related projects focused on Correctional Officer occupations in custodial settings, so the community corrections workforce became the primary focus for this Report.",
  },
];

const insights = [
  {
    number: "1",
    title:
      "The Certificate III in Correctional Practice does not fully reflect the complexity of community corrections roles.",
    detail:
      "Stakeholders identified that contemporary community corrections roles require broader capability than is currently reflected in the Certificate III in Correctional Practice.",
  },
  {
    number: "2",
    title:
      "Certificates III and IV do not include emerging capability requirements.",
    detail:
      "Emerging requirements include trauma-informed practice, domestic and family violence, sex offenders in the community and mental health, including suicidal ideation.",
  },
  {
    number: "3",
    title:
      "Delivery of qualifications is challenging to contextualise for community corrections settings.",
    detail:
      "Registered Training Organisations identified delivery challenges in contextualising Certificates III and IV in Correctional Practice for community corrections environments.",
  },
];

function ActionButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#38BDF8] px-5 text-xs font-bold text-[#063B5D] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B6DA8] hover:text-white hover:shadow-md"
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}

function SectionHeading({
  icon,
  title,
  description,
  action,
  onClick,
}: {
  icon: string;
  title: string;
  description?: string;
  action: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Image
        src={iconPath(icon)}
        alt=""
        width={52}
        height={52}
        className="h-[52px] w-[52px] shrink-0 animate-zoom-in"
      />
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold leading-7 text-[#252D02]">{title}</h2>
        {description && (
          <p className="mt-3 max-w-[940px] text-sm leading-6 text-[#535862]">
            {description}
          </p>
        )}
      </div>
      <ActionButton onClick={onClick}>{action}</ActionButton>
    </div>
  );
}

export default function CorrectionalServicesExecutiveSummaryView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const router = useRouter();
  const insightsRef = React.useRef<HTMLElement>(null);
  const strategyRef = React.useRef<HTMLElement>(null);
  const [isInsightsVisible, setIsInsightsVisible] = React.useState(false);
  const [isStrategyVisible, setIsStrategyVisible] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === insightsRef.current) setIsInsightsVisible(true);
          if (entry.target === strategyRef.current) setIsStrategyVisible(true);
        });
      },
      { threshold: 0.1 },
    );

    if (insightsRef.current) observer.observe(insightsRef.current);
    if (strategyRef.current) observer.observe(strategyRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#38BDF8]/30 antialiased">
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="executive_summary"
      />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-5 flex-1">
        <ReportNavButtons slug={slug} currentPage="executive_summary" />

        <section className="rounded-lg border border-[#E9EAEB] bg-white p-6 lg:min-h-[302px] lg:p-8">
          <div className="flex h-full flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="w-full min-w-0 flex-1 self-start lg:max-w-[820px]">
              <h1 className="animate-slide-up text-[40px] font-bold leading-[48px] text-[#063B5D]">
                Executive Summary
              </h1>
              <div className="animate-slide-up-delay">
                <p className="mt-4 text-base leading-6 text-[#535862]">
                  Public Skills Australia&apos;s 2026 Correctional Services
                  Workforce Insights Report (the Report) considers the wider
                  operational contexts impacting Public Safety and Government
                  industries. It identifies four drivers of change that will
                  impact workforce planning in the short to medium term aligned
                  with the nine megatrends detailed in previous Workforce
                  Insights Reports that remain relevant to long term workforce
                  trends.
                </p>
              </div>
            </div>
            <div className="relative hidden h-[120px] w-[420px] shrink-0 items-center justify-between lg:flex xl:w-[500px] min-[1500px]:w-[570px]">
              <div
                className="absolute left-12 right-12 top-[46px] h-2 border-y-2 border-[#38BDF8] animate-flow-separator xl:left-14 xl:right-14 xl:top-[52px] min-[1500px]:left-[60px] min-[1500px]:right-[60px] min-[1500px]:top-[56px]"
                style={{ animationDelay: "0.35s" }}
              />
              {["Drivers", "Insights", "Strategies", "Summary"].map(
                (icon, index) => (
                  <Image
                    key={icon}
                    src={iconPath(icon)}
                    alt=""
                    width={120}
                    height={120}
                    style={{ animationDelay: `${index * 0.5 + 0.1}s` }}
                    className="relative h-24 w-24 animate-flow-item xl:h-[108px] xl:w-[108px] min-[1500px]:h-[120px] min-[1500px]:w-[120px]"
                  />
                ),
              )}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-[#E9EAEB] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md">
          <SectionHeading
            icon="Drivers"
            title="Drivers of Change"
            description="Four drivers of change impacting workforce planning in the short to medium term, aligned with the nine megatrends detailed in previous Workforce Insights Reports."
            action="Present Drivers of Change"
            onClick={() => router.push(`/reports/${slug}/drivers_of_change`)}
          />
        </section>

        <section className="overflow-hidden rounded-lg border border-[#E9EAEB] bg-white">
          <div className="p-6">
            <SectionHeading
              icon="Overview"
              title="Two key challenges"
              description="This Report outlines two key challenges impacting the Correctional Services workforce, as well as the strategies devised to support efforts to address them."
              action="View Industry Overview"
              onClick={() => router.push(`/reports/${slug}/industry_overview`)}
            />
          </div>
          <div className="grid gap-4 border-t border-[#E9EAEB] p-6 lg:grid-cols-3">
            {challengeCards.map((card, index) => (
              <article
                key={card.title}
                style={{ animationDelay: `${index * 0.12 + 0.1}s` }}
                className="animate-card-entrance rounded-lg border border-[#BEEBFB] bg-[#E8F7FE] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
              >
                <span className="text-[10px] font-bold uppercase leading-5 text-[#0B6DA8]">
                  Challenge {index + 1}
                </span>
                <h3 className="mt-2 text-base font-bold leading-6 text-[#252D02]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#535862]">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          ref={insightsRef}
          className={`overflow-hidden rounded-lg border border-[#E9EAEB] bg-white ${
            isInsightsVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="p-6">
            <SectionHeading
              icon="Insights"
              title="One Theme, Three Workforce Insights"
              description="The Report identifies three industry insights relating to the community corrections workforce. OPEN reveals the content on this page."
              action="Present Workforce Insights"
              onClick={() => router.push(`/reports/${slug}/workforce_insights`)}
            />
          </div>
          <div className="border-t border-[#E9EAEB] px-6 py-6">
            <div className="mb-5 rounded-lg border border-[#BEEBFB] bg-[#E8F7FE] p-5">
              <p className="text-xs font-bold uppercase tracking-normal text-[#0B6DA8]">
                Theme 1 · 3 Insights
              </p>
              <p className="mt-3 text-sm leading-6 text-[#535862]">
                Stakeholders generally supported all specialisations in both
                the Certificate III and IV in Correctional Practice; however,
                the following challenges were identified.
              </p>
            </div>
            <div className="grid items-start gap-5 lg:grid-cols-3">
              {insights.map((insight, index) => {
                const id = `insight-${insight.number}`;
                const expanded = expandedId === id;
                return (
                  <article
                    key={insight.number}
                    style={
                      isInsightsVisible
                        ? { animationDelay: `${index * 0.12 + 0.18}s` }
                        : undefined
                    }
                    className={`relative min-h-[210px] overflow-hidden rounded-lg border border-[#E9EAEB] bg-white p-5 pl-16 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md ${
                      isInsightsVisible
                        ? "animate-card-entrance"
                        : "translate-y-6 opacity-0"
                    }`}
                  >
                    <span className="absolute left-4 top-4 text-5xl font-light leading-none text-[#0B6DA8]/20">
                      {insight.number}
                    </span>
                    <p className="text-[10px] font-bold uppercase leading-5 text-[#0B6DA8]">
                      Theme One, Insight {insight.number}
                    </p>
                    <h3 className="mt-2 text-sm font-bold leading-5 text-[#252D02]">
                      {insight.title}
                    </h3>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => toggleDropdown(id)}
                      className="mt-4 inline-flex h-7 items-center gap-1.5 rounded-full bg-[#38BDF8] px-3 text-[10px] font-bold text-[#063B5D] transition-colors hover:bg-[#0B6DA8] hover:text-white"
                    >
                      {expanded ? "Close" : "Open"}
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        expanded
                          ? "mt-4 grid-rows-[1fr] opacity-100"
                          : "mt-0 grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-black/10 pt-4">
                          <p className="text-xs leading-5 text-[#535862]">
                            {insight.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          ref={strategyRef}
          className={`overflow-hidden rounded-lg border border-[#E9EAEB] bg-white ${
            isStrategyVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="p-6">
            <SectionHeading
              icon="Strategies"
              title="2026 Proposed Workforce Strategy"
              description="The following strategy has been identified to support efforts to address the challenges identified through the above industry insights."
              action="Present Workforce Strategies"
              onClick={() => router.push(`/reports/${slug}/workforce_strategies`)}
            />
          </div>
          <div className="border-t border-[#E9EAEB] p-6">
            <article
              className={`rounded-lg border border-[#BEEBFB] bg-[#E8F7FE] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md ${
                isStrategyVisible
                  ? "animate-card-entrance"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <p className="text-xs font-bold uppercase text-[#0B6DA8]">
                Proposed Strategy 1
              </p>
              <h3 className="mt-3 max-w-[980px] text-xl font-bold leading-8 text-[#252D02]">
                Collaborate with HumanAbility to analyse recent updates to the
                CHC Community Services Training Package to identify contemporary
                practice that could inform future updates to the Community
                Corrections specialisations in the officers Certificate III and
                Certificate IV in Correctional Practice.
              </h3>
              <p className="mt-4 max-w-[900px] text-sm leading-6 text-[#535862]">
                To provide the Correctional Services Subcommittee an analysis of
                contemporary community services practice that could inform the
                Community Corrections specialisations in the Certificate III and
                Certificate IV in Correctional Practice.
              </p>
            </article>
          </div>
        </section>

        <section className="rounded-lg border border-[#E9EAEB] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md">
          <SectionHeading
            icon="Summary"
            title="2027 and Beyond"
            description="This Report concludes by looking towards the 2027 Workforce Insights Reports and beyond. Future work will focus on broader priorities, including the participation of First Nations people, women and other genders in the Public Safety and Government workforces, in addition to examining the implications of artificial intelligence (AI) and digital transformation."
            action="View 2027 and Beyond"
            onClick={() => router.push(`/reports/${slug}/looking_forward`)}
          />
        </section>

        <section className="rounded-lg border border-[#BEEBFB] bg-[#E8F7FE] p-5 text-xs leading-6 text-[#535862]">
          <p>
            HumanAbility is the Jobs and Skills council for the care and support
            sectors. They are responsible for maintaining and updating the CHC
            Community Services, HLT Health, and SIS Sports, Fitness and
            Recreation Training Packages. Public Skills Australia 2025,
            Corrections Implementation Report, unpublished.
          </p>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
