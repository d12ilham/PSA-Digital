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
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const iconPath = (name: string) => `/images/reports/introduction/${name}.svg`;

const insights = [
  {
    title: "Community corrections roles require dynamic skills and are focused on rehabilitation and reintegration back into a community.",
    detail: "This means that CCOs require the capability to support the reduction of recidivism and enable rehabilitation.",
  },
  {
    title: "CCO roles require more specialised capability provided in Certificate IV in Correctional Practice.",
    detail: "The CCO role is comparatively complex, often requiring an understanding of behavioural change, acceptance and commitment theory, trauma-informed response, alcohol and other drug treatments and training for dealing with sex offenders. Several jurisdictions reported that they only offered Certificate IV level training for CCO roles.",
  },
  {
    title: "Higher education requirements may constrain the CO-to-CCO pathway.",
    detail: "Consultations indicated anecdotal examples of employees transitioning from CO roles to CCO roles, often after injury and as part of support for employee return-to-work plans. This pipeline is often limited by the recruitment requirement for higher education qualifications, which may impact the eligibility of COs to apply.",
  },
];

const capabilityAreas = [
  "community services",
  "alcohol and other drugs",
  "behavioural change management",
  "trauma-informed response",
  "training for working with First Nations people",
  "training for dealing with sex offenders",
];

const stakeholders = [
  "HumanAbility",
  "State and Territory Correctional Services",
  "Private Correctional Service organisations",
  "Public Sector Unions",
  "Enterprise RTOs/RTOs",
];

function ActionButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#8AC900] px-5 text-xs font-bold text-[#252D02] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#78AF00] hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
    >
      {children}
      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
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
  onClick: () => void;
}) {
  return (
    <div className="group/heading flex flex-col gap-4 sm:flex-row sm:items-center">
      <span className="size-16 shrink-0 transition-transform duration-300 group-hover/heading:scale-105 motion-reduce:transform-none motion-reduce:transition-none">
        <Image src={icon.startsWith("/") ? icon : iconPath(icon)} alt="" width={64} height={64} className="size-16 object-contain animate-zoom-in motion-reduce:animate-none" />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold leading-7 text-[#252D02]">{title}</h2>
        {description && <p className="mt-2 max-w-[800px] text-sm font-medium leading-6 text-[#535862]">{description}</p>}
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
  const [themeOpen, setThemeOpen] = React.useState(true);
  const [strategyOpen, setStrategyOpen] = React.useState(true);
  const [expandedInsight, setExpandedInsight] = React.useState<number | null>(null);
  const mainRef = React.useRef<HTMLElement>(null);
  const [visibleSections, setVisibleSections] = React.useState<string[]>([]);

  React.useEffect(() => {
    const sections = mainRef.current?.querySelectorAll<HTMLElement>("[data-summary-reveal]");
    if (!sections?.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setVisibleSections(Array.from(sections, (section) => section.dataset.summaryReveal).filter((id): id is string => Boolean(id)));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const revealed = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => (entry.target as HTMLElement).dataset.summaryReveal)
        .filter((id): id is string => Boolean(id));
      if (revealed.length) {
        setVisibleSections((current) => [...new Set([...current, ...revealed])]);
        entries.filter((entry) => entry.isIntersecting).forEach((entry) => observer.unobserve(entry.target));
      }
    }, { threshold: 0.06 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const revealClass = (id: string) => visibleSections.includes(id) ? "animate-card-entrance" : "translate-y-6 opacity-0";

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased selection:bg-[#424996]/20">
      <ReportHeader slug={slug} report={report} currentPage="executive_summary" />

      <main ref={mainRef} className="mx-auto flex w-full max-w-[1504px] flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons slug={slug} currentPage="executive_summary" />

        <section className="flex min-h-[214px] flex-col justify-between gap-6 rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:flex-row lg:items-center">
          <div className="max-w-[800px] animate-slide-up">
            <h1 className="text-[32px] font-bold leading-[1.25] text-[#424996] sm:text-[40px] sm:leading-[54px]">Executive Summary</h1>
            <p className="mt-3 text-sm font-medium leading-6 text-[#535862]">
              Public Skills Australia&apos;s 2026 Correctional Services Workforce Insights Report (the Report) considers the wider operational contexts impacting Public Safety and Government industries. It identifies four drivers of change that will impact workforce planning in the short to medium term aligned with the nine megatrends detailed in previous Workforce Insights Reports that remain relevant to long term workforce trends.
            </p>
          </div>
          <div className="hidden h-[120px] w-[570px] shrink-0 items-center lg:flex" aria-hidden="true">
            {[
              "flow-1-workforce.png",
              "flow-2-insights.png",
              "flow-3-strategies.png",
              "flow-4-forward.png",
            ].map((asset, index) => (
              <React.Fragment key={asset}>
                {index > 0 && (
                  <span
                    className="animate-flow-separator flex w-[30px] shrink-0 flex-col gap-[3px] motion-reduce:animate-none motion-reduce:opacity-100"
                    style={{ animationDelay: `${index * 0.5 - 0.15}s` }}
                  >
                    <span className="h-[2px] bg-[#8AC900]" />
                    <span className="h-[2px] bg-[#8AC900]" />
                  </span>
                )}
                <Image
                  src={`/images/reports/executive-summary/${asset}`}
                  alt=""
                  width={120}
                  height={120}
                  priority
                  style={{ animationDelay: `${index * 0.5 + 0.1}s` }}
                  className="animate-flow-item relative z-10 size-[120px] shrink-0 object-contain motion-reduce:animate-none motion-reduce:opacity-100"
                />
              </React.Fragment>
            ))}
          </div>
        </section>

        <section data-summary-reveal="drivers" className={`rounded-[14px] border border-[#E9EAEB] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#B8C9A0] hover:shadow-md motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${revealClass("drivers")}`}>
          <SectionHeading
            icon="Drivers"
            title="Drivers of Change"
            description="Four drivers of change impacting workforce planning in the short to medium term, aligned with the nine megatrends detailed in previous Workforce Insights Reports."
            action="Present Drivers of Change"
            onClick={() => router.push(`/reports/${slug}/drivers_of_change`)}
          />
        </section>

        <section data-summary-reveal="insights" className={`min-h-[964px] overflow-hidden rounded-[14px] border border-[#E9EAEB] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#B8C9A0] hover:shadow-md motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${revealClass("insights")}`}>
          <div className="p-6">
            <SectionHeading
              icon="Insights"
              title="One Themes, Three Insights"
              action="Present Workforce Insights"
              onClick={() => router.push(`/reports/${slug}/workforce_insights`)}
            />
          </div>

          <div className="px-6 pb-6">
            <div className="overflow-hidden rounded-[14px] border border-[#E9EAEB] border-t-[10px] border-t-[#424996] bg-white p-6 transition-shadow duration-300 hover:shadow-sm sm:p-8">
              <p className="text-xs font-bold uppercase leading-5 text-[#598303]">Theme 1 - 3 Insights</p>
              <h3 className="mt-3 text-xl font-bold leading-7 text-[#252D02]">CSC Correctional Services Training Package</h3>
              <button
                type="button"
                onClick={() => setThemeOpen((open) => !open)}
                aria-expanded={themeOpen}
                className="mt-3 inline-flex min-h-8 items-center gap-2 rounded-full bg-[#8AC900] px-4 text-xs font-bold text-[#252D02] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#78AF00] hover:shadow-sm motion-reduce:transform-none motion-reduce:transition-none"
              >
                Theme Overview
                <ChevronDown className={`size-3.5 transition-transform duration-300 ${themeOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>

              <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${themeOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="max-w-[800px] pt-5 text-sm font-medium leading-6 text-[#535862]">
                    <p>Stakeholders generally supported all specialisations in both the Certificate III and IV in Correctional Practice; however, the following challenges were identified:<sup>23</sup></p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>The Certificate III in Correctional Practice does not fully reflect the complexity of community corrections roles.</li>
                      <li>Certificates III and IV in Correctional Practice do not include emerging capability requirements such as trauma-informed practice, domestic and family violence, sex offenders in the community and mental health (including suicidal ideation). As a result, some jurisdictions are utilising non-accredited training to bolster the VET qualifications.</li>
                      <li>Delivery of Certificates III and IV in Correctional Practice was identified by RTOs as challenging to contextualise for community corrections settings.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-[800px] text-sm font-medium leading-6 text-[#535862]">The Report identifies three industry insights relating to the community corrections workforce. These include:</p>
              <div className="mt-5 space-y-2">
                {insights.map((insight, index) => {
                  const expanded = expandedInsight === index;
                  return (
                    <div key={insight.title} style={{ animationDelay: `${index * 0.12 + 0.2}s` }} className={`overflow-hidden rounded-[14px] border border-[#424996] border-l-[8px] bg-[#424996]/10 transition-[background-color,box-shadow] duration-300 hover:bg-[#424996]/15 hover:shadow-md motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${visibleSections.includes("insights") ? "animate-card-entrance" : "translate-y-4 opacity-0"}`}>
                      <button
                        type="button"
                        onClick={() => setExpandedInsight(expanded ? null : index)}
                        aria-expanded={expanded}
                        className="flex min-h-[104px] w-full items-center gap-3 px-4 py-5 text-left sm:gap-6 sm:px-6 sm:pl-12"
                      >
                        <span className="w-6 shrink-0 text-3xl font-light leading-none text-[#424996]/20 sm:w-8 sm:text-5xl">{index + 1}</span>
                        <span className="min-w-0">
                          <span className="block text-xs font-semibold leading-5 text-[#424996]">Theme One, Insight {index === 0 ? "One" : index === 1 ? "Two" : "Three"}</span>
                          <span className="mt-1 block text-sm font-medium leading-6 text-[#535862]">{insight.title}</span>
                        </span>
                      </button>
                      <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <p className="border-t border-[#424996]/20 px-6 py-4 text-sm leading-6 text-[#535862] sm:pl-20">{insight.detail}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section data-summary-reveal="strategy" className={`min-h-[1286px] overflow-hidden rounded-[14px] border border-[#E9EAEB] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#B8C9A0] hover:shadow-md motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${revealClass("strategy")}`}>
          <div className="p-6">
            <SectionHeading
              icon="Strategies"
              title="2026 Proposed Workforce Strategy"
              description="The following strategy has been identified to support efforts to address the challenges identified through the above industry insights:"
              action="Present 2026 Strategy"
              onClick={() => router.push(`/reports/${slug}/workforce_strategies`)}
            />
          </div>

          <div className="px-6 pb-6">
            <div className="rounded-[14px] border border-[#E9EAEB] border-t-[10px] border-t-[#424996] bg-white p-6 transition-shadow duration-300 hover:shadow-sm sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full bg-[#424996] px-3 py-1 text-xs font-bold uppercase text-white">Strategy 1</span>
                <button
                  type="button"
                  onClick={() => setStrategyOpen((open) => !open)}
                  aria-expanded={strategyOpen}
                  className="inline-flex min-h-8 items-center gap-2 rounded-full bg-[#8AC900] px-4 text-xs font-bold text-[#252D02] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#78AF00] hover:shadow-sm motion-reduce:transform-none motion-reduce:transition-none"
                >
                  {strategyOpen ? "Close" : "Open"}
                  <ChevronDown className={`size-3.5 transition-transform duration-300 ${strategyOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
              </div>
              <h3 className="mt-5 max-w-[800px] text-lg font-bold leading-7 text-[#252D02] sm:text-xl">
                Collaborate with HumanAbility<sup>2</sup> to analyse recent updates to the CHC Community Services Training Package to identify contemporary practice that could inform future updates to the Community Corrections specialisations in the officers Certificate III and Certificate IV in Correctional Practice.
              </h3>
              <p className="mt-3 max-w-[800px] text-sm font-medium leading-6 text-[#535862]">
                To provide the Correctional Services Subcommittee an analysis of contemporary community services practice that could inform the Community Corrections specialisations in the Certificate III and Certificate IV in Correctional Practice.
              </p>

              <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${strategyOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="mt-6 grid gap-8 border-t border-[#E9EAEB] pt-6 lg:grid-cols-[minmax(0,800px)_1fr]">
                    <div className="space-y-5 text-sm font-medium leading-6 text-[#535862]">
                      <div><h4 className="font-bold text-[#252D02]">Workforce Insight:</h4><p>Community Corrections</p></div>
                      <div><h4 className="font-bold text-[#252D02]">JSC Function:</h4><p>Training Product Development and Implementation, Promotion and Monitoring</p></div>
                      <div><h4 className="font-bold text-[#252D02]">Objective:</h4><p>To provide the Correctional Services Subcommittee an analysis of contemporary community services practice that could inform the Community Corrections specialisations in the Certificate III and Certificate IV in Correctional Practice.</p></div>
                      <div>
                        <h4 className="font-bold text-[#252D02]">Approach:</h4>
                        <p>In collaboration with HumanAbility, undertake an analysis of the recent updates to CHC Community Services Training Package addressing the following capability areas to consider contemporary practice in community services and case management and identify whether this may support CCO skills requirements:</p>
                        <ul className="mt-3 list-disc pl-5">
                          {capabilityAreas.map((area) => <li key={area}>{area}</li>)}
                        </ul>
                        <p className="mt-3">The findings report will be presented to the Correctional Services Subcommittee for further action.</p>
                      </div>
                      <div><h4 className="font-bold text-[#252D02]">Deliverable:</h4><p>Findings Report</p></div>
                      <div><h4 className="font-bold text-[#252D02]">Impact:</h4><p>Support the Correctional Services by providing analysis of contemporary practice in similar capability areas in different industry-sectors.</p></div>
                      <div><h4 className="font-bold text-[#252D02]">Anticipated timing:</h4><p>18-month project</p></div>
                    </div>
                    <div className="lg:pl-2">
                      <h4 className="text-sm font-bold leading-6 text-[#252D02]">Key Stakeholders:</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {stakeholders.map((stakeholder) => <span key={stakeholder} className="rounded-full bg-[#424996]/10 px-3 py-1.5 text-xs font-semibold leading-5 text-[#424996] transition-colors duration-300 hover:bg-[#424996]/20 motion-reduce:transition-none">{stakeholder}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-summary-reveal="forward" className={`min-h-[182px] rounded-[14px] border border-[#E9EAEB] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#B8C9A0] hover:shadow-md motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${revealClass("forward")}`}>
          <SectionHeading
            icon="/images/reports/executive-summary/flow-4-forward.png"
            title="2027 and Beyond"
            description="This Report concludes by looking towards the 2027 Workforce Insights Reports and beyond. Future work will focus on broader priorities, including the participation of First Nations people, women and other genders in the Public Safety and Government workforces, in addition to examining the implications of artificial intelligence (AI) and digital transformation."
            action="View 2027 and Beyond"
            onClick={() => router.push(`/reports/${slug}/looking_forward`)}
          />
        </section>

        <aside data-summary-reveal="sources" className={`rounded-[14px] bg-[#F0F5DF] p-6 text-sm font-medium leading-6 text-[#535862] motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${revealClass("sources")}`} aria-label="Sources">
          <p><sup>2.</sup> HumanAbility is the Jobs and Skills council for the care and support sectors. They are responsible for maintaining and updating the CHC Community Services, HLT Health, and SIS Sports, Fitness and Recreation Training Packages.</p>
          <p className="mt-2"><sup>23.</sup> Public Skills Australia 2025, Corrections Implementation Report, unpublished.</p>
        </aside>
      </main>

      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
