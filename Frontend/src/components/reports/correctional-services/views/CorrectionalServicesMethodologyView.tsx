"use client";

import React from "react";
import Image from "next/image";
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

const consultationSteps = [
  {
    label: "Step 1",
    title: "Consultations",
    icon: "/images/reports/methodology/Representatives.svg",
    description: "Employers, employee bodies and Government organisations",
  },
  {
    label: "Step 2",
    title: "Thematic analysis",
    icon: "/images/reports/methodology/Workshops.svg",
    description: "Shared challenges, trends and priority workforce issues",
  },
  {
    label: "Step 3",
    title: "Validation research",
    icon: "/images/reports/methodology/Data-sources.svg",
    description: "Secondary qualitative and quantitative research",
  },
];

const governanceSteps = [
  {
    title: "1 · Correctional Services Subcommittee",
    body:
      "The Subcommittee is responsible for recommending this report to the Industry Advisory Group (IAG) for endorsement.",
    detail:
      "This recommendation is made on the basis that the Subcommittee is satisfied that sufficient consultation and engagement has been undertaken, and that consultation feedback was appropriately actioned.",
  },
  {
    title: "2 · Industry Advisory Group",
    body:
      "The IAG is responsible for endorsing this report to the Public Skills Australia Board for approval to be submitted to DEWR.",
    detail:
      "This endorsement is made on the basis that the IAG is satisfied with the Correctional Services Subcommittees' recommendation for endorsement. The IAG further provides its strategic guidance and endorsement if comfortable that the strategic priorities of Public Safety industry-sectors are also captured.",
  },
  {
    title: "3 · Public Skills Australia Board",
    body:
      "The Public Skills Australia Board (the Board) is responsible to approve the submission of the report to DEWR.",
    detail:
      "This approval is made on the basis that the Board is satisfied that an appropriate development and consultation process was followed and that the report has been progressed in line with the internal governance requirements of Public Skills Australia.",
  },
];

export default function CorrectionalServicesMethodologyView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const researchRef = React.useRef<HTMLDivElement>(null);
  const governanceRef = React.useRef<HTMLDivElement>(null);
  const sourcesRef = React.useRef<HTMLDivElement>(null);
  const [isResearchVisible, setIsResearchVisible] = React.useState(false);
  const [isGovernanceVisible, setIsGovernanceVisible] = React.useState(false);
  const [isSourcesVisible, setIsSourcesVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === researchRef.current) setIsResearchVisible(true);
          if (entry.target === governanceRef.current) setIsGovernanceVisible(true);
          if (entry.target === sourcesRef.current) setIsSourcesVisible(true);
        });
      },
      { threshold: 0.1 },
    );

    if (researchRef.current) observer.observe(researchRef.current);
    if (governanceRef.current) observer.observe(governanceRef.current);
    if (sourcesRef.current) observer.observe(sourcesRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#38BDF8]/30 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="methodology" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="methodology" />

        <section className="grid grid-cols-1 gap-8 rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#063B5D] animate-slide-up">
                Methodology
              </h1>
              <div className="space-y-3 animate-slide-up-delay">
                <p className="text-sm text-[#535862] leading-relaxed font-medium">
                  Public Skills Australia&apos;s Workforce Insights Reports are
                  developed using a combination of qualitative and quantitative
                  data obtained from primary and secondary sources. This 2026
                  Correctional Services Report is supported by data obtained
                  through stakeholder consultations and engagements.
                </p>
                <p className="text-sm text-[#535862] leading-relaxed">
                  These consultations were used to gain insight into challenges
                  the Correctional Services industry-sector is facing in
                  developing and maintaining a skilled workforce.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {consultationSteps.map((step, index) => (
                <article
                  key={step.title}
                  style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
                  className="animate-card-entrance rounded-xl border border-[#E9EAEB] bg-white p-3.5 space-y-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
                >
                  <span className="block text-xs font-bold uppercase text-[#0B6DA8]">
                    {step.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <Image
                      src={step.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 object-contain animate-zoom-in"
                    />
                    <div>
                      <h2 className="mb-1 text-xs font-bold text-[#252D02]">
                        {step.title}
                      </h2>
                      <p className="text-xs font-medium text-[#535862]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5 rounded-2xl border border-[#BEEBFB] bg-[#E8F7FE] p-5 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <h2 className="w-2/3 text-xl font-bold leading-snug text-[#252D02]">
                Consultation and validation process
              </h2>
              <Image
                src="/images/reports/methodology/industry-sector representatives.svg"
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 object-contain animate-zoom-in"
              />
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-[#535862]">
              <p>
                The challenges identified through these consultations were
                thematically analysed to identify shared challenges and trends.
                Specific to the Correctional Services industry-sector, and in
                alignment with the tripartite approach for JSCs, consultations
                were held with employers, employee bodies and Government
                organisations, both in-person and through online meetings,
                workshops and presentations.
              </p>
              <p>
                Following these consultations, Public Skills Australia conducted
                secondary qualitative and quantitative research to verify the
                challenges raised. Additional targeted consultations with senior
                stakeholders were held to further validate workforce challenges
                and identify related industry insights.
              </p>
            </div>
          </aside>
        </section>

        <section
          ref={researchRef}
          className="space-y-6 rounded-2xl border border-[#E9EAEB] bg-white p-6"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              ["Primary", "Stakeholder consultations and engagements"],
              ["Secondary", "Qualitative and quantitative research"],
              ["Validation", "Targeted senior stakeholder consultations"],
            ].map(([title, body], index) => (
              <article
                key={title}
                style={
                  isResearchVisible
                    ? { animationDelay: `${index * 0.12 + 0.1}s` }
                    : undefined
                }
                className={`flex items-center gap-3 rounded-xl border border-[#BEEBFB] bg-[#E8F7FE] p-4 ${
                  isResearchVisible
                    ? "animate-card-entrance"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <span className="text-3xl font-bold text-[#0B6DA8]">
                  <AnimatedCounter target={index + 1} />
                </span>
                <span className="text-sm font-semibold leading-tight text-[#535862]">
                  <strong className="block text-[#252D02]">{title}</strong>
                  {body}
                </span>
              </article>
            ))}
          </div>

          <div className="flex min-h-[156px] items-center rounded-2xl border border-[#E9EAEB] bg-white p-6">
            <Image
              src="/images/reports/about/Commitment.svg"
              alt=""
              width={100}
              height={100}
              className="h-[100px] w-[100px] shrink-0 object-contain animate-zoom-in"
            />
            <div className="ml-6 self-start pt-1">
              <h2 className="text-base font-bold leading-7 text-[#252D02]">
                Our commitment
              </h2>
              <p className="mt-2 max-w-[860px] text-sm leading-6 text-[#535862]">
                Public Skills Australia remains committed to encouraging the
                participation of First Nations people,<sup>1</sup> those from
                culturally and linguistically diverse backgrounds, those living
                with or experiencing disabilities, women and other gender
                diverse people and mature people in the Public Safety and
                Government industry workforces.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={governanceRef}
          className="space-y-6 rounded-2xl border border-[#E9EAEB] bg-white p-6"
        >
          <h2
            className={`text-xl font-bold text-[#252D02] ${
              isGovernanceVisible ? "animate-slide-up" : "opacity-0"
            }`}
          >
            Drafts were subsequently progressed through Public Skills
            Australia&apos;s governance process that includes:
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {governanceSteps.map((step, index) => (
              <article
                key={step.title}
                style={
                  isGovernanceVisible
                    ? { animationDelay: `${index * 0.12 + 0.1}s` }
                    : undefined
                }
                className={`rounded-lg bg-[#E8F7FE] p-6 space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  isGovernanceVisible
                    ? "animate-card-entrance"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <h3 className="text-xl font-bold text-[#252D02]">
                  {step.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-[#535862]">
                  {step.body}
                </p>
                <p className="text-sm font-medium leading-relaxed text-[#535862]">
                  {step.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          ref={sourcesRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <article
            style={isSourcesVisible ? { animationDelay: "0.1s" } : undefined}
            className={`flex items-start gap-4 rounded-2xl border border-[#E9EAEB] bg-white p-6 ${
              isSourcesVisible ? "animate-card-entrance" : "opacity-0 translate-y-6"
            }`}
          >
            <Image
              src="/images/reports/methodology/Data-sources-bottom.svg"
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 object-contain"
            />
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#252D02]">Data sources</h3>
              <p className="text-sm font-medium leading-relaxed text-[#535862]">
                The Report uses publicly available datasets accessible from Jobs
                and Skills Australia (JSA), the Australian Bureau of Statistics
                (ABS), the National Centre for Vocational Education Research
                (NCVER) and other supporting online sources. Due to the
                complexity of large-scale workforce data, no single source
                provides an accurate or complete picture. Therefore, multiple
                data sources are used to provide the most accurate
                representation of the workforce as possible, supported by
                qualitative research, literature reviews and industry engagement.
              </p>
            </div>
          </article>

          <article
            style={isSourcesVisible ? { animationDelay: "0.22s" } : undefined}
            className={`flex items-start gap-4 rounded-2xl border border-[#E9EAEB] bg-white p-6 ${
              isSourcesVisible ? "animate-card-entrance" : "opacity-0 translate-y-6"
            }`}
          >
            <Image
              src="/images/reports/methodology/With-thanks.svg"
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 object-contain"
            />
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#252D02]">With thanks</h3>
              <p className="text-sm font-medium leading-relaxed text-[#535862]">
                Public Skills Australia thanks the contributors, including
                industry representatives, its Board and governance group
                representatives, DEWR and Jobs and Skills Australia (JSA) for
                sharing their views and data generously, and supporting the
                development of this Report.
              </p>
            </div>
          </article>
        </section>

        <aside className="rounded-2xl border border-[#BEEBFB] bg-[#E8F7FE] p-6 text-xs leading-6 text-[#535862]">
          <p className="max-w-[920px]">
            <sup>1.</sup> Please note, First Nations people will be used as
            preferred terminology inclusive of Aboriginal and Torres Strait
            Islanders. When citing a data source (such as government strategies
            or state of the sector reports) the terminology of the data source
            will be used to maintain accurate data representation.
          </p>
        </aside>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
