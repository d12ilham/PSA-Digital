"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type Report = {
  contactUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const lifecycleChallenges = [
  "Workforce attraction: Engagement indicated challenges to attracting a workforce that reflects the needs of the modern corrections environment.",
  "Workforce recruitment: Existing recruitment challenges could influence how baseline requirements are modified to meet recruitment targets. Additionally, it was noted that the complexities of leave affect recruitment allocations, while regional facilities depend on either relocation funding or local recruitment which creates additional complexities. It was identified that recruitment practices for First Nations employees would benefit from a combination of cultural and role specific processes.",
  "Onboarding: Pre-service training does not necessarily fully equip employees for the complexities of the physical and psychological demands of a Correctional Services role which may be driving retention challenges.",
  "Retention: Limitations on learning and development opportunities, along with the mental health impacts (and increased psychological injury claims) in the industry-sector may be a contributing factor to retention.",
];

const projects = [
  {
    href: "update_2025_training_pathways",
    number: "Project 1",
    title: "Correctional Services Skills and Training Pathways (Workforce Lifecycle)",
    accent: "#9DA8D0",
  },
  {
    href: "update_2025_first_nations_participation",
    number: "Project 2",
    title: "First Nations Workforce Participation",
    accent: "#424996",
  },
] as const;

export default function CorrectionalServicesUpdate2025StrategiesView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="update_2025_strategies" />
      <main className="mx-auto w-full max-w-[1504px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="update_2025_strategies"
          prev={{ label: "Update on 2024 Strategies", href: `/reports/${slug}/update_2024_strategies` }}
          next={{ label: "Existing Industry-Sector Strategies", href: `/reports/${slug}/existing_strategies` }}
          prevPrefix=""
          nextPrefix=""
        />

        <section className="flex flex-col gap-6 rounded-[14px] border border-[#E9EAEB] bg-white p-6 animate-slide-up motion-reduce:animate-none lg:min-h-[208px] lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[820px]">
            <span className="inline-flex rounded-full bg-[#424996] px-3 py-1 text-xs font-semibold text-white">Workforce Strategies · Update on 2025 Workforce Strategies</span>
            <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-[40px] sm:leading-[1.2]">Update on 2025 Strategies</h1>
            <p className="mt-4 text-sm leading-6">Public Skills Australia’s 2025 Correctional Services Workforce Plan, identified two challenges impacting the Correctional Services workforce:</p>
          </div>
          <Image src="/images/reports/correctional-workforce-strategies-frame-436.svg" width={480} height={140} alt="" className="h-auto w-full max-w-[480px] shrink-0 animate-zoom-in motion-reduce:animate-none lg:w-[480px]" />
        </section>

        <section aria-label="Workforce challenges" className="grid items-stretch gap-6 lg:grid-cols-2">
          <article className="overflow-hidden rounded-[14px] border border-[#E9EAEB] bg-white animate-card-entrance motion-reduce:animate-none">
            <div className="h-[11px] bg-[#9DA8D0]" />
            <div className="p-6 lg:min-h-[520px]">
              <p className="text-sm font-medium text-[#424996]">Challenge 1</p>
              <h2 className="mt-4 text-xl font-semibold">Workforce Lifecycle</h2>
              <p className="mt-3 text-sm leading-6 text-[#535862]">Research and consultations indicated challenges across all stages of the workforce lifecycle contributing to increased workforce challenges.</p>
              <ul className="mt-5 list-disc space-y-1 pl-5 text-sm leading-6 text-[#535862]">
                {lifecycleChallenges.map((challenge) => <li key={challenge}>{challenge}</li>)}
              </ul>
            </div>
          </article>
          <article className="overflow-hidden rounded-[14px] border border-[#E9EAEB] bg-white animate-card-entrance motion-reduce:animate-none" style={{ animationDelay: "100ms" }}>
            <div className="h-[11px] bg-[#424996]" />
            <div className="p-6 lg:min-h-[520px]">
              <p className="text-sm font-medium text-[#424996]">Challenge 2</p>
              <h2 className="mt-4 text-xl font-semibold">First Nations Workforce Participation</h2>
              <p className="mt-3 text-sm leading-6 text-[#535862]">The high attrition of First Nations employees is a challenge for the Correctional Services industry-sector, with provision of formal cultural safety and wellbeing supports adding a further challenge in small and regional facilities due to financial limitations. Retention of First Nations employees is also a challenge in some organisations due to resource constraints, such as low attendance to optional cultural awareness or competency training due to employee resourcing limitations.</p>
            </div>
          </article>
        </section>

        <section className="rounded-[14px] border border-[#E9EAEB] bg-white p-6 animate-slide-up motion-reduce:animate-none">
          <h2 className="text-2xl font-semibold text-[#424996]">Two 2025 projects</h2>
          <p className="mt-3 max-w-[850px] text-sm leading-6 text-[#535862]">To support industry with these challenges, Public Skills Australia completed two projects in 2025 to provide deeper insights into their causes and potential mitigation strategies. These included:</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <Link key={project.href} href={`/reports/${slug}/${project.href}`} className="group overflow-hidden rounded-[14px] border border-[#E9EAEB] bg-white text-left transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#424996] motion-reduce:transition-none">
                <span className="block h-[11px]" style={{ backgroundColor: project.accent }} />
                <span className="flex min-h-[138px] items-center justify-between gap-5 p-6">
                  <span>
                    <span className="block text-sm font-medium text-[#424996]">{project.number}</span>
                    <span className="mt-4 block text-xl font-semibold leading-7">{project.title}</span>
                  </span>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#8AC900] transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true"><ArrowRight className="size-5" /></span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
