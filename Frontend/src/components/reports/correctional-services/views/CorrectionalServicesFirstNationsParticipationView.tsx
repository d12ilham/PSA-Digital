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

export default function CorrectionalServicesFirstNationsParticipationView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="update_2025_first_nations_participation" />
      <main className="mx-auto w-full max-w-[1504px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="update_2025_first_nations_participation"
          prev={{ label: "Update on 2025 Strategies", href: `/reports/${slug}/update_2025_strategies` }}
          next={{ label: "Existing Industry-Sector Strategies", href: `/reports/${slug}/existing_strategies` }}
          prevPrefix=""
        />

        <section className="flex flex-col gap-6 rounded-[14px] border border-[#E9EAEB] bg-white p-6 animate-slide-up motion-reduce:animate-none lg:min-h-[232px] lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[815px]">
            <span className="inline-flex rounded-full bg-[#424996] px-3 py-1 text-xs font-semibold text-white">2024 Workforce Strategies: Project 02</span>
            <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-[40px] sm:leading-[1.2]">2. First Nations Workforce Participation</h1>
            <p className="mt-4 text-sm leading-6">A proposal to Investigate Barriers to First Nations Workforce Participation was put forward for further consideration in the 2025 Correctional Services Workforce Insights Report. This strategy proposal sought to investigate barriers for First Nations people to participate in the Correctional Services workforce, focussing on attraction, attrition and retention. Following the launch of the 2025 Correctional Services Workforce Insights Report, Public Skills Australia received a Statement of Federal Government priorities from the Minister for Employment and Workplace Relations and Minister for Skills and Training. This letter set out a priority to work with First Nations peoples, industry (employers and unions) across all Public Safety and Government industry-sectors and other JSCs to advance the priority reforms under the Closing the Gap National Agreement.</p>
          </div>
          <Image src="/images/reports/correctional-workforce-strategies-frame-436.svg" width={480} height={140} alt="" className="h-auto w-full max-w-[480px] shrink-0 animate-zoom-in motion-reduce:animate-none lg:mt-[46px] lg:w-[480px]" />
        </section>

        <section className="rounded-[14px] border-l-[10px] border-[#424996] bg-[#E8E9EF] py-6 pl-[15px] pr-6 animate-slide-up motion-reduce:animate-none">
          <h2 className="text-xl font-semibold">Project Progress Update</h2>
          <p className="mt-4 max-w-[830px] text-sm leading-6">Noting this strategy proposal was scoped alongside the Statement of Federal Government priorities, Public Skills Australia has begun commissioning a research project through a First Nations-led research organisation on First Nations workforce participation across Public Safety and Government industry-sectors (including Correctional Services). This project will deliver a report (for each Public Safety and Government industry-sector) that seeks to collect and analyse statistical data on workforce participation of First Nations people broken down by age, gender, qualification enrolment and attainment over the past five years. The report will further collect qualitative data based on interviews and case studies, identifying personal stories of success working in the Public Safety and Government industry-sectors and resultant education and training journeys. This will seek to understand the challenges faced by, and the factors that impacted successful employment and/or aligned training for First Nations people.</p>
        </section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
