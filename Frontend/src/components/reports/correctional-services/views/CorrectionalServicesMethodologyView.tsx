"use client";

import React from "react";
import Image from "next/image";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type CorrectionalServicesReport = {
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const consultationSteps = [
  "These consultations were used to gain insight into challenges the Correctional Services industry-sector is facing in developing and maintaining a skilled workforce.",
  "The challenges identified through these consultations were thematically analysed to identify shared challenges and trends. Specific to the Correctional Services industry-sector, and in alignment with the tripartite approach for JSCs, consultations were held with employers, employee bodies and Government organisations, both in-person and through online meetings, workshops and presentations.",
  "Following these consultations, Public Skills Australia conducted secondary qualitative and quantitative research to verify the challenges raised. Additional targeted consultations with senior stakeholders were held to further validate workforce challenges and identify related industry insights.",
];

const governanceSteps = [
  {
    title: "1 · Correctional Services Subcommittee",
    body: "The Subcommittee is responsible for recommending this report to the Industry Advisory Group (IAG) for endorsement.",
    detail: "This recommendation is made on the basis that the Subcommittee is satisfied that sufficient consultation and engagement has been undertaken, and that consultation feedback was appropriately actioned.",
  },
  {
    title: "2 · Industry Advisory Group",
    body: "The IAG is responsible for endorsing this report to the Public Skills Australia Board for approval to be submitted to DEWR.",
    detail: "This endorsement is made on the basis that the IAG is satisfied with the Correctional Services Subcommittee's recommendation for endorsement. The IAG further provides its strategic guidance and endorsement if comfortable that the strategic priorities of Public Safety industry-sectors are also captured.",
  },
  {
    title: "3 · Public Skills Australia Board",
    body: "The Public Skills Australia Board (the Board) is responsible to approve the submission of the report to DEWR.",
    detail: "This approval is made on the basis that the Board is satisfied that an appropriate development and consultation process was followed and that the report has been progressed in line with the internal governance requirements of Public Skills Australia.",
  },
];

export default function CorrectionalServicesMethodologyView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const governanceRef = React.useRef<HTMLElement>(null);
  const sourcesRef = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState({ governance: false, sources: false });

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target === governanceRef.current) {
            setVisible((current) => ({ ...current, governance: true }));
          }
          if (entry.isIntersecting && entry.target === sourcesRef.current) {
            setVisible((current) => ({ ...current, sources: true }));
          }
        });
      },
      { threshold: 0.1 },
    );
    if (governanceRef.current) observer.observe(governanceRef.current);
    if (sourcesRef.current) observer.observe(sourcesRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased selection:bg-[#B2DB79]/40">
      <ReportHeader slug={slug} report={report} currentPage="methodology" />

      <main className="mx-auto flex w-full max-w-[1504px] flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons slug={slug} currentPage="methodology" />

        <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6 animate-slide-up">
          <h1 className="mb-3 text-[32px] font-bold leading-[1.25] text-[#252D02] sm:text-[40px] sm:leading-[54px]">
            Methodology
          </h1>
          <p className="max-w-[800px] text-sm font-medium leading-6 text-[#535862]">
            Public Skills Australia&apos;s Workforce Insights Reports are developed using a combination of qualitative and quantitative data obtained from primary and secondary sources. This 2026 Correctional Services Report is supported by data obtained through stakeholder consultations and engagements.
          </p>
        </section>

        <section aria-label="Consultation and research process" className="grid gap-6 rounded-2xl border border-[#E9EAEB] bg-white p-6 md:grid-cols-3">
          {consultationSteps.map((step, index) => (
            <div
              key={step}
              className="flex items-start gap-4 animate-card-entrance"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <span className="shrink-0 text-xl font-bold leading-7 text-[#252D02]">{index + 1}</span>
              <p className="text-sm font-medium leading-6 text-[#535862]">{step}</p>
            </div>
          ))}
        </section>

        <section ref={governanceRef} className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
          <h2 className="mb-4 text-xl font-bold leading-7 text-[#252D02]">
            Drafts were subsequently progressed through Public Skills Australia&apos;s governance process that includes:
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {governanceSteps.map((step, index) => (
              <article
                key={step.title}
                style={visible.governance ? { animationDelay: `${index * 0.12}s` } : undefined}
                className={`min-h-[330px] rounded-lg bg-[#F0F5DF] p-6 transition-shadow duration-300 hover:shadow-md ${visible.governance ? "animate-card-entrance" : "opacity-0 translate-y-6"}`}
              >
                <h3 className="mb-3 text-xl font-bold leading-7 text-[#252D02]">{step.title}</h3>
                <p className="mb-4 text-sm font-medium leading-6 text-[#535862]">{step.body}</p>
                <p className="text-sm font-medium leading-6 text-[#535862]">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section ref={sourcesRef} className="grid gap-6 md:grid-cols-2">
          <article className={`flex min-h-[520px] items-start gap-4 rounded-2xl border border-[#E9EAEB] bg-white p-6 ${visible.sources ? "animate-card-entrance" : "opacity-0 translate-y-6"}`}>
            <Image src="/images/reports/methodology/Data-sources-bottom.svg" alt="" width={64} height={64} className="size-16 shrink-0 object-contain" />
            <div className="space-y-3">
              <h3 className="text-xl font-bold leading-7 text-[#252D02]">Data sources</h3>
              <p className="text-sm font-medium leading-6 text-[#535862]">
                The Report uses publicly available datasets accessible from Jobs and Skills Australia (JSA), the Australian Bureau of Statistics (ABS), the National Centre for Vocational Education Research (NCVER) and other supporting online sources. Due to the complexity of large-scale workforce data, no single source provides an accurate or complete picture. Therefore, multiple data sources are used to provide the most accurate representation of the workforce as possible, supported by qualitative research (including interviews with stakeholders). This research was bolstered by literature reviews of government reports and documents, online sources, annual reports, departmental documentation, legislation, research articles and relevant Royal Commission Reports.
              </p>
              <p className="text-sm font-medium leading-6 text-[#535862]">
                Qualitative research further included industry engagement undertaken for the Corrections Implementation Report and the Drivers for Recruitment, Attrition and Retention (Corrections) Report 2025. Consistent with the tripartite approach to industry engagement, Public Skills Australia engaged broadly through both consultation and surveys of Registered Training Organisations (RTOs), private and public employers, union representatives and a small number of current learners.
              </p>
            </div>
          </article>

          <article className={`flex min-h-[520px] items-start gap-4 rounded-2xl border border-[#E9EAEB] bg-white p-6 ${visible.sources ? "animate-card-entrance" : "opacity-0 translate-y-6"}`} style={visible.sources ? { animationDelay: "0.12s" } : undefined}>
            <Image src="/images/reports/methodology/With-thanks.svg" alt="" width={64} height={64} className="size-16 shrink-0 object-contain" />
            <div className="space-y-3">
              <h3 className="text-xl font-bold leading-7 text-[#252D02]">With thanks</h3>
              <p className="text-sm font-medium leading-6 text-[#535862]">
                Public Skills Australia thanks the contributors, including industry representatives, its Board and governance group representatives, DEWR and Jobs and Skills Australia (JSA) for sharing their views and data generously, and supporting the development of this Report.
              </p>
            </div>
          </article>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
