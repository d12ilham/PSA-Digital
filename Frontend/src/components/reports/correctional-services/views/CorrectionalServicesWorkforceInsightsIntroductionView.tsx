"use client";

import Image from "next/image";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type Report = {
  contactUrl?: string;
  pdfFileUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const challenges = [
  {
    label: "Challenge 1",
    title: "Recruitment pipeline",
    body: "Correctional Services organisations face a range of perception-based challenges impacting workforce recruitment alongside key drivers resulting in high attrition rates including support structures for new prison officers, increased workload and career pathway limitations.",
  },
  {
    label: "Challenge 2",
    title: "Implementation of VET training",
    body: "Challenges have been identified with the implementation of the Certificate III in Correctional Practice, the entry level qualification for the Correctional Services industry-sector.",
  },
];

const projects = [
  {
    label: "2025 Project 1",
    title: "Drivers for Recruitment, Attrition and Retention (Corrections)",
    body: "The Drivers for Recruitment, Attrition and Retention (Corrections) Report 2025 examined public perceptions of working in the Correctional Services industry-sector and their impact on recruitment, attrition and retention. It identified five findings that will be considered by the Corrective Services Administrators' Council (CSAC) in 2026. Further information is in Workforce Insights: Update on 2025 Strategies.",
  },
  {
    label: "2025 Project 2",
    title: "Implementation Report",
    body: "The Corrections Implementation Report 2025 focused on the skills maintenance and training challenges in relation to the implementation of the Certificate III in Correctional Practice. Public Skills Australia researched use of the qualification and made three recommendations. Further information is in Workforce Insights: Update on 2025 Strategies.",
  },
];

export default function CorrectionalServicesWorkforceInsightsIntroductionView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="workforce_insights" />
      <main className="mx-auto w-full max-w-[1504px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="workforce_insights"
          prev={{ label: "Industry Profile", href: `/reports/${slug}/industry_profile_presentation` }}
          next={{ label: "2026 Proposed Correctional Services Workforce Strategy", href: `/reports/${slug}/workforce_strategies` }}
        />

        <section className="grid items-center gap-6 rounded-lg border border-[#E9EAEB] bg-white px-6 py-7 lg:grid-cols-[minmax(0,1fr)_389px] lg:px-8">
          <div className="max-w-[850px] animate-slide-up">
            <h1 className="max-w-[650px] text-[30px] font-semibold leading-[1.15] text-[#424996] sm:text-[40px]">
              Workforce Insights 2026: Community Corrections Introduction
            </h1>
            <p className="mt-5 text-sm leading-6">
              Recent trends across Australia&apos;s Correctional Services industry-sector underscore the growing importance of community-based supervision and the workforce required to deliver it. While previous Workforce Insights Reports focused primarily on the custodial setting, this report focuses on community corrections roles which form an increasingly critical component of the criminal justice system.
            </p>
            <p className="mt-4 text-sm leading-6">
              The numbers of persons serving community corrections orders has continued to rise in recent years with community corrections orders representing the largest category of correctional supervision nationally. Further, the offender-to-staff ratio remains substantially high across all jurisdictions, emphasising the workload carried by CCOs. Projected growth in the Correctional Services workforce, alongside substantial public investment in the industry-sector across states and territories further emphasises the need to better understand the workforce capabilities required to support community corrections.
            </p>
          </div>
          <Image
            src="/images/reports/workforce-insights.png"
            width={389}
            height={206}
            alt="Workforce research and community corrections illustration"
            className="mx-auto h-auto w-full max-w-[389px] animate-zoom-in motion-reduce:animate-none"
            priority
          />
        </section>

        <section aria-labelledby="challenges-heading" className="space-y-5">
          <div>
            <h2 id="challenges-heading" className="text-xl font-semibold text-[#424996]">Two challenges</h2>
            <p className="mt-1 max-w-[880px] text-sm leading-6">Public Skills Australia&apos;s 2024 Correctional Services Workforce Plan and the 2025 Correctional Services Workforce Insights Report identified two key challenges impacting the Correctional Services workforce:</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {challenges.map((challenge, index) => (
              <article key={challenge.label} className={`rounded-lg border border-[#E9EAEB] border-t-[8px] bg-white p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md ${index === 0 ? "border-t-[#9DA8D0]" : "border-t-[#424996]"}`}>
                <p className="text-xs text-[#424996]">{challenge.label}</p>
                <h3 className="mt-2 text-lg font-semibold">{challenge.title}</h3>
                <p className="mt-3 text-sm leading-6">{challenge.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="projects-heading" className="space-y-5">
          <div>
            <h2 id="projects-heading" className="text-xl font-semibold text-[#424996]">Two 2025 projects</h2>
            <p className="mt-2 max-w-[950px] text-sm leading-6">To support the industry-sector to address these challenges, Public Skills Australia completed two projects in 2025 to provide deeper insights into their causes and potential mitigation strategies. These included:</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project, index) => (
              <article key={project.label} className={`rounded-lg border border-[#E9EAEB] border-t-[8px] bg-white p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md ${index === 0 ? "border-t-[#9DA8D0]" : "border-t-[#424996]"}`}>
                <p className="text-xs text-[#424996]">{project.label}</p>
                <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>
                <p className="mt-3 text-sm leading-6">{project.body}</p>
              </article>
            ))}
          </div>
          <p className="text-sm leading-6">
            These projects focused on CO occupations in custodial settings rather than CCO occupations. Subsequently, the community corrections workforce became the primary focus for this Report. Stakeholder insights from the 2025 engagements, aided by further research, broadly identified that while CCO training is supported by the entry-level qualifications (<em>Certificate III and IV in Correctional Practice</em>), challenges remain with their implementation and delivery. This is being experienced and viewed in different ways by the industry-sector, with some reporting that the challenge was directly related to the qualifications and others reporting that it was related to how the qualifications are contextualised when implemented for training delivery. Both these perspectives will be considered to ensure that any mitigating strategies lead to the shared outcome sought by stakeholders.
          </p>
        </section>

        <section aria-labelledby="sources-heading" className="rounded-lg border border-[#E9EAEB] bg-white px-6 py-5">
          <h2 id="sources-heading" className="text-lg font-semibold">Sources</h2>
          <p className="mt-3 text-xs leading-5 text-[#535862]">Public Skills Australia, 2026 Correctional Services Workforce Insights Report, pp. 23–24. The challenge summary refers to Public Skills Australia&apos;s 2024 Correctional Services Workforce Plan and 2025 Correctional Services Workforce Insights Report.</p>
        </section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
