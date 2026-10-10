"use client";

import React from "react";
import { BookOpenCheck, ChevronDown } from "lucide-react";
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

const challenges = [
  {
    label: "Challenge 1",
    title: "Recruitment pipeline",
    body: "Correctional Services organisations face perception-based recruitment challenges alongside high attrition drivers including support structures for new prison officers, increased workload and career pathway limitations.",
  },
  {
    label: "Challenge 2",
    title: "Implementation of VET training",
    body: "The industry-sector continues to focus on skills maintenance and training challenges connected to the Certificate III in Correctional Practice.",
  },
];

const projects = [
  {
    label: "2025 Project 1",
    title: "Drivers for Recruitment, Attrition and Retention (Corrections)",
    body: "The Drivers Report examined public perceptions of working in the Correctional Services industry-sector and their impact on recruitment, attrition and retention. It identified five findings for CSAC consideration in 2026.",
  },
  {
    label: "2025 Project 2",
    title: "Implementation Report",
    body: "The Corrections Implementation Report focused on skills maintenance and training challenges in relation to the Certificate III in Correctional Practice and made three recommendations.",
  },
];

const insights = [
  {
    id: "cco-role",
    number: "1",
    title:
      "Community corrections roles require dynamic skills and are focused on rehabilitation and reintegration back into a community",
    short:
      "The Certificate III in Correctional Practice does not fully reflect the complexity of community corrections roles.",
    detailTitle: "The Role of a Community Corrections Officer (CCO)",
    detail:
      "CCOs assess and manage risk, monitor compliance with legal conditions such as bail, parole and sentencing requirements, and respond to breaches. They provide case management and risk assessment for people serving custodial and non-custodial sentences, supporting behavioural change and reducing the likelihood of reoffending.",
    sections: [
      [
        "A. Entry Level Training and Specialisations for Community Corrections Officers",
        "Stakeholders noted challenges in accessing appropriate skills specialisations through the Certificate III in Correctional Practice for CCOs. Consultations indicated that organisations are electing to train CCOs through the Certificate IV rather than the Certificate III.",
      ],
      [
        "B. Career progression-related training",
        "As CCOs progress through government grades or salary bands, stakeholders indicated that this progression often does not correspond with accredited skills development.",
      ],
    ],
  },
  {
    id: "certificate-training",
    number: "2",
    title:
      "CCO roles require more specialised capability provided in Certificate IV in Correctional Practice",
    short:
      "Certificates III and IV do not include emerging capability requirements such as trauma-informed practice, domestic and family violence, sex offenders in the community and mental health.",
    detailTitle: "Certificate III and IV in Correctional Practice",
    detail:
      "The CCO role is comparatively complex, often requiring an understanding of advanced concepts such as behavioural change, acceptance and commitment theory, trauma-informed response, alcohol and other drug treatments and training for dealing with sex offenders.",
    sections: [
      [
        "Certificate III specialisations",
        "Adult Custodial specialisation, Adult Community specialisation, Youth Custodial specialisation and Youth Community specialisation.",
      ],
      [
        "Certificate IV specialisations",
        "Adult Custodial specialisation, Adult Community specialisation, Youth Custodial specialisation and Youth Community specialisation.",
      ],
    ],
  },
  {
    id: "pathway-constraints",
    number: "3",
    title: "Higher Education requirements may constrain the CO-to-CCO pathway",
    short:
      "Delivery of Certificates III and IV in Correctional Practice was identified by RTOs as challenging to contextualise for community corrections settings.",
    detailTitle: "Enrolment and Completion Rates",
    detail:
      "Consultations indicated anecdotal examples of employees transitioning from CO roles to CCO roles, often after injury and as part of return-to-work support. This pipeline into CCO roles can be limited by recruitment requirements for higher education qualifications.",
    sections: [
      [
        "Community corrections specialisations",
        "Enrolments in units of competency for Certificate III community corrections specialisations are estimated at approximately 160, while Certificate IV community corrections specialisations are approximately 300.",
      ],
      [
        "Pathway constraint",
        "In 2024 there were 4,234 more enrolments in the Certificate III compared to the Certificate IV, but proportionally more people are enrolling in community corrections specialisations at Certificate IV level.",
      ],
    ],
  },
];

const certThreeData = [
  ["2020", 5229, 3275],
  ["2021", 4800, 3100],
  ["2022", 4550, 2920],
  ["2023", 4320, 2700],
  ["2024", 4234, 2460],
] as const;

const certFourData = [
  ["2020", 995, 620],
  ["2021", 1210, 760],
  ["2022", 1390, 840],
  ["2023", 1550, 970],
  ["2024", 1680, 1080],
] as const;

function QualificationChart({
  title,
  data,
  max,
  loaded,
}: {
  title: string;
  data: readonly (readonly [string, number, number])[];
  max: number;
  loaded: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#D5D7DA] bg-[#FBFCFD] p-5">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h3 className="text-base font-bold text-[#252D02]">{title}</h3>
        <div className="flex gap-4 text-[11px] font-bold text-[#535862]">
          <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-[#0B6DA8]" />Enrolments</span>
          <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-[#38BDF8]" />Completions</span>
        </div>
      </div>
      <div className="flex h-56 items-end justify-between gap-4">
        {data.map(([year, enrolments, completions], index) => (
          <div key={year} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <div className="flex h-full w-full items-end justify-center gap-1.5">
              <div
                style={{
                  height: loaded ? `${(enrolments / max) * 100}%` : "0%",
                  transitionDelay: `${index * 80}ms`,
                }}
                className="w-4 rounded-t-md bg-[#0B6DA8] transition-all duration-1000 hover:bg-[#075D87]"
              />
              <div
                style={{
                  height: loaded ? `${(completions / max) * 100}%` : "0%",
                  transitionDelay: `${index * 80 + 80}ms`,
                }}
                className="w-4 rounded-t-md bg-[#38BDF8] transition-all duration-1000 hover:bg-[#0B6DA8]"
              />
            </div>
            <span className="text-xs font-bold text-[#535862]">{year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CorrectionalServicesWorkforceInsightsView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const [activeInsightId, setActiveInsightId] = React.useState("cco-role");
  const [loaded, setLoaded] = React.useState(false);
  const activeInsight =
    insights.find((insight) => insight.id === activeInsightId) ?? insights[0];

  React.useEffect(() => {
    setLoaded(false);
    const timer = window.setTimeout(() => setLoaded(true), 120);
    return () => window.clearTimeout(timer);
  }, [activeInsightId]);

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#38BDF8]/30 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="workforce_insights" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        <ReportNavButtons slug={slug} currentPage="workforce_insights" />

        <section className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-4">
            <p className="animate-slide-up text-xs font-semibold uppercase leading-6 text-[#0B6DA8]">
              Workforce Insights 2026: Community Corrections
            </p>
            <h1 className="animate-slide-up text-3xl sm:text-4xl font-bold text-[#063B5D]">
              Workforce Insights
            </h1>
            <p className="animate-slide-up-delay max-w-4xl text-sm leading-relaxed text-[#535862]">
              Recent trends across Australia&apos;s Correctional Services industry-sector underscore
              the growing importance of community-based supervision and the workforce required to
              deliver it. While previous Workforce Insights Reports focused primarily on the
              custodial setting, this report focuses on community corrections roles.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="animate-hero-pulse-settle flex h-36 w-36 items-center justify-center rounded-full bg-[#E8F7FE]">
              <BookOpenCheck className="h-20 w-20 text-[#0B6DA8]" strokeWidth={1.5} />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="animate-card-entrance rounded-2xl border border-[#E9EAEB] bg-white p-6">
            <p className="text-xs font-bold uppercase text-[#0B6DA8]">Two challenges</p>
            <h2 className="mt-2 text-xl font-bold text-[#252D02]">
              Workforce pressure points identified in previous work
            </h2>
            <div className="mt-5 grid gap-4">
              {challenges.map((challenge) => (
                <div key={challenge.title} className="rounded-xl border border-[#BEEBFB] bg-[#E8F7FE] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8]">
                  <span className="text-[10px] font-bold uppercase text-[#0B6DA8]">{challenge.label}</span>
                  <h3 className="mt-1 text-base font-bold text-[#252D02]">{challenge.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#535862]">{challenge.body}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="animate-card-entrance rounded-2xl border border-[#E9EAEB] bg-white p-6 [animation-delay:120ms]">
            <p className="text-xs font-bold uppercase text-[#0B6DA8]">Two 2025 projects</p>
            <h2 className="mt-2 text-xl font-bold text-[#252D02]">
              Projects informing the 2026 insights
            </h2>
            <div className="mt-5 grid gap-4">
              {projects.map((project) => (
                <div key={project.title} className="rounded-xl border border-[#E9EAEB] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md">
                  <span className="text-[10px] font-bold uppercase text-[#0B6DA8]">{project.label}</span>
                  <h3 className="mt-1 text-base font-bold text-[#252D02]">{project.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#535862]">{project.body}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6 space-y-5">
          <div className="rounded-xl border border-[#BEEBFB] bg-[#E8F7FE] p-5">
            <p className="text-xs font-bold uppercase text-[#0B6DA8]">Theme 1 · 3 insights</p>
            <h2 className="mt-2 text-xl font-bold text-[#252D02]">
              CSC Correctional Services Training Package
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-[#535862]">
              Stakeholders generally supported all specialisations in both the Certificate III
              and IV in Correctional Practice; however, the following challenges were identified.
              Select any insight to open its detail page.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {insights.map((insight, index) => {
              const isActive = insight.id === activeInsightId;
              return (
                <button
                  key={insight.id}
                  type="button"
                  onClick={() => setActiveInsightId(insight.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className={`animate-card-entrance min-h-[230px] rounded-xl border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-2 border-[#0B6DA8] bg-[#E8F7FE] shadow-sm"
                      : "border-[#E9EAEB] bg-white hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B6DA8] text-lg font-bold text-white">
                    {insight.number}
                  </span>
                  <p className="mt-4 text-[10px] font-bold uppercase text-[#0B6DA8]">
                    Insight {insight.number}
                  </p>
                  <h3 className="mt-2 text-base font-bold leading-6 text-[#252D02]">
                    {insight.title}
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-[#535862]">{insight.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#38BDF8] px-3 py-1.5 text-[10px] font-bold uppercase text-[#063B5D]">
                    {isActive ? "Open" : "Open"} <ChevronDown className="h-3 w-3" />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border-2 border-[#0B6DA8] bg-white p-6">
          <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase text-[#0B6DA8]">
                Theme One, Insight {activeInsight.number}
              </p>
              <h2 className="mt-2 max-w-5xl text-2xl font-bold text-[#063B5D]">
                {activeInsight.detailTitle}
              </h2>
              <p className="mt-3 max-w-5xl text-sm leading-6 text-[#535862]">
                {activeInsight.detail}
              </p>
            </div>
            <span className="w-fit rounded-full bg-[#E8F7FE] px-4 py-2 text-xs font-bold uppercase text-[#0B6DA8]">
              Active insight {activeInsight.number}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {activeInsight.sections.map(([title, body], index) => (
              <article
                key={title}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-content-switch rounded-xl border border-[#BEEBFB] bg-[#FBFCFD] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
              >
                <h3 className="text-base font-bold text-[#252D02]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#535862]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <QualificationChart
            title="Certificate III in Correctional Practice"
            data={certThreeData}
            max={6000}
            loaded={loaded}
          />
          <QualificationChart
            title="Certificate IV in Correctional Practice"
            data={certFourData}
            max={1800}
            loaded={loaded}
          />
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            ["~160", "enrolments in units of competency unique to community corrections specialisations · Certificate III"],
            ["~300", "enrolments in units of competency for community corrections specialisations · Certificate IV"],
            ["4,234", "more enrolments in Certificate III compared to Certificate IV in 2024"],
          ].map(([value, label], index) => (
            <article
              key={value}
              style={{ animationDelay: `${index * 0.08}s` }}
              className="animate-card-entrance rounded-xl border border-[#E9EAEB] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
            >
              <strong className="block text-3xl font-bold text-[#0B6DA8]">{value}</strong>
              <p className="mt-2 text-xs font-semibold leading-5 text-[#535862]">{label}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#252D02]">Sources</h2>
          <div className="space-y-3 text-xs leading-6 text-[#535862]">
            <p>
              Victorian Government, Correctional Practice Framework, Victorian Government, 2024.
              Public Skills Australia 2025, Corrections Implementation Report, unpublished.
            </p>
            <p>
              NCVER 2025, Total VET students and courses 2024. Jobs and Skills Australia,
              Occupational Shortage List, 2025.
            </p>
          </div>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
