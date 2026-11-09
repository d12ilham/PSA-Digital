"use client";

import React from "react";
import Image from "next/image";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const governanceSteps = [
  {
    step: "STEP 1",
    title: "Public Safety Subcommittee",
    paragraphs: [
      "The Subcommittee is responsible for recommending this report to the Industry Advisory Group (IAG) for endorsement.",
      "This recommendation is made on the basis that the Subcommittee is satisfied that sufficient consultation and engagement has been undertaken, and that consultation feedback was appropriately actioned.",
    ],
  },
  {
    step: "STEP 2",
    title: "Industry Advisory Group",
    paragraphs: [
      "The IAG is responsible for endorsing this report to the Public Skills Australia Board for approval to be submitted to the DEWR.",
      "This endorsement is made on the basis that the IAG is satisfied with the Public Safety Subcommittee's recommendation for endorsement. The IAG further provides its strategic guidance and endorsement if comfortable that the strategic priorities of Public Safety and Government industry-sectors are also captured.",
    ],
  },
  {
    step: "STEP 3",
    title: "Public Skills Australia Board",
    paragraphs: [
      "The Public Skills Australia Board (the Board) is responsible to approve the submission of the report to DEWR.",
      "This approval is made on the basis that the Board is satisfied that an appropriate development and consultation process was followed and that the report has been progressed in line with the internal governance requirements of Public Skills Australia.",
    ],
  },
] as const;

const primarySources = [
  "Jobs and Skills Australia (JSA)",
  "Australian Bureau of Statistics (ABS)",
  "National Centre for Vocational Education Research (NCVER)",
  "Other supporting online sources",
] as const;

const supportingSources = [
  "Government reports and documents",
  "Online sources",
  "Annual reports",
  "Departmental documentation",
  "Legislation",
  "Research articles",
  "Relevant Royal Commission Reports",
] as const;

export default function PublicSafetyMethodologyView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const governanceRef = React.useRef<HTMLElement>(null);
  const dataRef = React.useRef<HTMLElement>(null);
  const [governanceVisible, setGovernanceVisible] = React.useState(false);
  const [dataVisible, setDataVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === governanceRef.current) setGovernanceVisible(true);
        if (entry.target === dataRef.current) setDataVisible(true);
      });
    }, { threshold: 0.1 });

    if (governanceRef.current) observer.observe(governanceRef.current);
    if (dataRef.current) observer.observe(dataRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <PublicSafetyPageShell slug={slug} report={report} currentPage="methodology">
      <section className="rounded-2xl bg-white p-6 ring-1 ring-inset ring-[#E9EAEB] xl:min-h-[446px]">
        <div className="grid items-start gap-6 xl:min-h-[398px] xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] xl:gap-10 2xl:grid-cols-[minmax(0,1fr)_532px] 2xl:gap-[60px]">
          <div className="min-w-0">
            <h1 className="text-[32px] font-bold leading-[42px] text-[#252D02] animate-slide-up sm:text-[40px] sm:leading-[54px]">Methodology</h1>
            <div className="animate-slide-up-delay"><p className="mt-4 text-lg font-normal leading-6 text-[#535862]">
              Public Skills Australia&apos;s Workforce Insights Reports are developed using a combination of qualitative and quantitative data obtained from primary and secondary sources. This 2026 Public Safety Workforce Insights Report is supported by data obtained through stakeholder consultations and engagements.
            </p>
            <p className="mt-4 text-sm font-medium leading-6 text-[#535862]">
              These consultations were used to gain insight into challenges each industry-sector is facing with the development and maintenance of a skilled workforce. The challenges identified through consultations were thematically analysed to identify trends and priority areas to address for each industry-sector. Following these consultations, Public Skills Australia conducted secondary qualitative and quantitative research to verify the challenges raised. Additional targeted consultations with senior stakeholders were held to further validate workforce challenges and identify related industry insights. Specific to the Public Safety industry-sectors, and in alignment with the tripartite approach for Jobs and Skills Councils (JSCs), consultations were held with employers, employee bodies and Government organisations, both in-person and through online meetings, workshops and presentations. Drafts were subsequently progressed through Public Skills Australia&apos;s governance process that includes:
            </p></div>
          </div>

          <aside className="relative min-w-0 overflow-hidden rounded-[14px] bg-[#F0F5DF] p-6 ring-1 ring-inset ring-[#E9EAEB] transition-all duration-500 hover:-translate-y-1 hover:ring-[#728C28] hover:shadow-lg animate-zoom-in sm:p-8 xl:min-h-[252px] xl:p-10">
            <span className="absolute inset-y-0 left-0 w-2 bg-[#598303]" />
            <h2 className="text-base font-bold uppercase leading-7 text-[#252D02] sm:text-xl">Acknowledgement</h2>
            <p className="mt-6 text-sm font-medium leading-6 text-[#535862]">
              Public Skills Australia thanks the contributors, including industry representatives, its Board and governance group representatives, the Department of Employment and Workplace Relations (DEWR) and Jobs and Skills Australia (JSA) for sharing their views and data generously, and supporting the development of this Report.
            </p>
          </aside>
        </div>
      </section>

      <section ref={governanceRef} className="space-y-6">
        <div className="min-h-[49px] border-b border-[#D5D7DA] pb-4">
          <h2 className={`text-2xl font-bold leading-8 text-[#252D02] ${governanceVisible ? "animate-slide-up" : "opacity-0"}`}>Governance Process</h2>
        </div>

        <div className="rounded-[14px] border border-[#E9EAEB] bg-white p-6 xl:min-h-[416px]">
          <div className="grid gap-5 xl:min-h-[368px] xl:grid-cols-3">
            {governanceSteps.map((item, index) => (
              <article key={item.step} style={governanceVisible ? { animationDelay: `${index * 0.12 + 0.1}s` } : undefined} className={`group min-w-0 break-words rounded-lg border border-transparent bg-[#F0F5DF] p-5 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:scale-[1.01] hover:border-[#728C28] hover:bg-white hover:shadow-xl sm:p-8 ${governanceVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
                <h3 className="text-xl font-bold leading-7 text-[#252D02] transition-colors duration-300 group-hover:text-[#046D2A]">{index + 1} · {item.title}</h3>
                <div className="mt-2 space-y-2 text-sm leading-6 text-[#535862]">
                  {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </article>
            ))}
          </div>
        </div>

        <article ref={dataRef} className={`rounded-[14px] border border-[#E9EAEB] bg-white p-6 transition-all duration-500 hover:border-[#728C28] hover:shadow-lg xl:min-h-[416px] ${dataVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
          <div className="flex flex-col items-start gap-6 sm:flex-row xl:min-h-[368px]">
            <Image src="/images/reports/methodology/Data-sources-bottom.svg" alt="" width={100} height={100} className={`h-[100px] w-[100px] shrink-0 transition-transform duration-500 hover:scale-110 ${dataVisible ? "animate-zoom-in" : "opacity-0"}`} />
            <div className="min-w-0 w-full max-w-[1268px] sm:flex-1">
              <h2 className="text-xl font-bold leading-7 text-[#252D02]">Data sources</h2>
              <div className="mt-3 flex max-w-full flex-wrap gap-1">
                {primarySources.map((source) => <span key={source} className="max-w-full break-words rounded-full bg-[#F0F5DF] px-3 py-1 text-xs font-bold leading-[18px] text-[#598303] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E4EDCA] hover:shadow-sm">{source}</span>)}
              </div>
              <p className="mt-3 max-w-[800px] text-sm font-medium leading-6 text-[#535862]">
                The report uses publicly available datasets accessible from Jobs and Skills Australia (JSA), the Australian Bureau of Statistics (ABS), the National Centre for Vocational Education Research (NCVER) and other supporting online sources. Due to the complexity of large-scale workforce data, no single source provides an accurate or complete picture. Therefore, multiple data sources are used to provide the most accurate representation of the workforce as possible, supported by qualitative research (including interviews with stakeholders). This report prioritises the data source, or combination of data sources, that provide the most accurate representation of the workforce possible. This research was bolstered by literature reviews of government reports and documents, online sources, annual reports, departmental documentation, legislation, research articles and relevant Royal Commission Reports.
              </p>
              <div className="mt-3 flex max-w-[800px] flex-wrap gap-1">
                {supportingSources.map((source) => <span key={source} className="max-w-full break-words rounded-full border border-[#E9EAEB] bg-white px-[11px] py-[3px] text-xs font-bold leading-[18px] text-[#414651] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#728C28] hover:shadow-sm">{source}</span>)}
              </div>
            </div>
          </div>
        </article>
      </section>
    </PublicSafetyPageShell>
  );
}
