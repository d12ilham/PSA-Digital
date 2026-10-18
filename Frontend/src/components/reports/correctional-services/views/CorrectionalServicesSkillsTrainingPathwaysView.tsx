"use client";

import Image from "next/image";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type Report = {
  contactUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const aims = [
  "Map current occupational, career and training pathways within jurisdictions",
  "Develop advice to strengthen occupational and educational pathways in Correctional Services",
  "Identify opportunities for career progress into specialist operational roles to promote retention in the industry",
  "Develop career outcomes and better training pathways to onboard, maintain and upskill Correctional Services employees",
  "Identify areas of inconsistency in non-accredited training for future developments of the CSC Correctional Services Training Package.",
];

const priorities = [
  {
    title: "Ministerial Priority 2026",
    description: "This project will contribute to addressing Australia’s productivity challenges, including undertaking activity that supports building a skilled, adaptable and inclusive workforce.",
  },
  {
    title: "Public Skills Australia Strategic Plan",
    description: "Support industry-sectors to continue to build and maintain capable and mobile workforces that are future-ready.",
  },
  {
    title: "Drivers of Change",
    description: "Challenges to workforce productivity.",
  },
];

const nextSteps = [
  "outline career and training pathways into key roles",
  "identify key stages of development undertaken across jurisdictions and the usage of accredited training to address them",
  "identify areas of non-accredited training that are used to bolster accredited courses",
  "examine areas of potential update to the CSC Correctional Services Training Package.",
];

export default function CorrectionalServicesSkillsTrainingPathwaysView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="update_2025_training_pathways" />
      <main className="mx-auto w-full max-w-[1504px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="update_2025_training_pathways"
          prev={{ label: "Update on 2025 Strategies", href: `/reports/${slug}/update_2025_strategies` }}
          next={{ label: "Existing Industry-Sector Strategies", href: `/reports/${slug}/existing_strategies` }}
          prevPrefix=""
        />

        <section className="flex flex-col gap-6 rounded-[14px] border border-[#E9EAEB] bg-white p-6 animate-slide-up motion-reduce:animate-none lg:min-h-[518px] lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[815px]">
            <span className="inline-flex rounded-full bg-[#424996] px-3 py-1 text-xs font-semibold text-white">2024 Workforce Strategies: Project 01</span>
            <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-[40px] sm:leading-[1.35]">1. Correctional Services Skills and Training Pathways (Workforce Lifecycle)</h1>
            <p className="mt-4 text-sm leading-6">The 2025 Correctional Services Workforce Insights Report identified a strategy to review skills maintenance approaches throughout the workforce lifecycle. This was later retitled as the Correctional Services Skills and Training Pathways project and funded through activity project funding. The Correctional Services: Skills and Training Pathways Report was recommended to support Correctional Services through the development of comprehensive skills and training pathways in the industry-sector. Through consultation undertaken by Public Skills Australia for the 2025 Correctional Services Workforce Insights Report, it was noted that accredited training is mostly aligned to role progression, whereas non-accredited training is used variably in each jurisdiction and may be undertaken at the employee’s own direction in their own time. Further, resource constraints can impact the ability to provide diverse learning and professional development opportunities additional to any contractually mandated training.</p>
            <p className="mt-4 text-sm leading-6">It was recognised that training challenges may be contributing to ongoing workforce issues identified across the workforce lifecycle in the Correctional Services industry-sector. The intention of this project is to strengthen training and career pathways opportunities across the industry-sector.</p>
          </div>
          <Image src="/images/reports/correctional-workforce-strategies-frame-436.svg" width={480} height={140} alt="" className="h-auto w-full max-w-[480px] shrink-0 animate-zoom-in motion-reduce:animate-none lg:w-[480px]" />
        </section>

        <section aria-labelledby="project-aims" className="space-y-5 animate-slide-up motion-reduce:animate-none">
          <h2 id="project-aims" className="text-xl font-semibold">This project aims to:</h2>
          <ol className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
            {aims.map((aim, index) => (
              <li key={aim} className="flex min-h-[180px] gap-4 rounded-[14px] border border-[#E2E6F1] bg-[#E9EDF6] p-6 text-[#424996] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-md animate-card-entrance motion-reduce:animate-none motion-reduce:transition-none" style={{ animationDelay: `${index * 70}ms` }}>
                <span aria-hidden="true" className="text-[40px] font-semibold leading-none text-[#D5D9E5]">{index + 1}</span>
                <span className="text-sm font-semibold leading-6">{aim}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-label="Strategic priorities" className="grid gap-6 md:grid-cols-3">
          {priorities.map((priority, index) => (
            <article key={priority.title} className="min-h-[154px] rounded-[14px] border border-[#E9EAEB] bg-white p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-md animate-card-entrance motion-reduce:animate-none motion-reduce:transition-none" style={{ animationDelay: `${index * 90}ms` }}>
              <h2 className="text-lg font-semibold">{priority.title}</h2>
              <p className="mt-2 text-sm leading-6">{priority.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[14px] border-l-[12px] border-[#424996] bg-[#E8E9EF] px-7 py-6 animate-slide-up motion-reduce:animate-none">
          <h2 className="text-2xl font-semibold">Project Progress Update</h2>
          <p className="mt-4 max-w-[830px] text-sm leading-6">This project is now in progress and is anticipated for delivery in December of 2026. For the next steps of this project, Public Skills Australia will deliver a report that will:</p>
          <ul className="mt-1 max-w-[1000px] list-disc space-y-1 pl-5 text-sm leading-6">
            {nextSteps.map((step) => <li key={step}>{step}</li>)}
          </ul>
        </section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
