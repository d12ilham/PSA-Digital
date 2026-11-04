"use client";

import Image from "next/image";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type Report = {
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

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

export default function CorrectionalServicesWorkforceStrategiesView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="workforce_strategies" />
      <main className="mx-auto w-full max-w-[1504px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="workforce_strategies"
          prev={{ label: "Theme 2 – PSA Insight 2", href: `/reports/${slug}/workforce_insights_career_pathways` }}
          next={{ label: "Update on 2024 Workforce Strategies", href: `/reports/${slug}/update_2024_strategies` }}
          prevPrefix=""
        />

        <section className="flex flex-col gap-6 rounded-[14px] border border-[#E9EAEB] bg-white px-6 py-6 animate-slide-up motion-reduce:animate-none lg:min-h-[236px] lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[850px]">
            <span className="inline-flex rounded-full bg-[#424996] px-3 py-1 text-xs font-semibold text-white">Workforce Strategies</span>
            <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-[40px] sm:leading-[1.22]">2026 Proposed Correctional Services Workforce Strategy</h1>
            <p className="mt-4 text-sm leading-6 text-[#535862]">Public Skills Australia proposes the following strategy aligned to the workforce insights identified.</p>
          </div>
          <div className="w-full max-w-[480px] shrink-0 animate-zoom-in motion-reduce:animate-none lg:w-[480px]" aria-hidden="true">
            <Image
              src="/images/reports/correctional-workforce-strategies-frame-436.svg"
              width={480}
              height={140}
              alt=""
              className="h-auto w-full transition-transform duration-300 hover:scale-[1.02] motion-reduce:transition-none"
            />
          </div>
        </section>

        <section className="overflow-hidden rounded-[14px] border border-[#E9EAEB] bg-white animate-card-entrance motion-reduce:animate-none">
          <div className="h-[10px] bg-[#424996]" />
          <div className="p-6">
            <span className="inline-flex rounded-full bg-[#424996] px-3 py-1 text-xs font-semibold uppercase text-white">Strategy 1</span>
            <h2 className="mt-6 max-w-[870px] text-xl font-semibold leading-[1.3]">Collaborate with HumanAbility to analyse recent updates to the CHC Community Services Training Package to identify contemporary practice that could inform future updates to the Community Corrections specialisations in the officers Certificate III and Certificate IV in Correctional Practice.</h2>
            <div className="mt-6 grid gap-10 border-t border-[#E9EAEB] pt-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.9fr)]">
              <div className="space-y-5 text-sm leading-6">
                <div><h3 className="font-semibold">Workforce Insight:</h3><p className="mt-1 text-[#777B83]">Community Corrections</p></div>
                <div><h3 className="font-semibold">JSC Function:</h3><p className="mt-1 text-[#777B83]">Training Product Development and Implementation, Promotion and Monitoring</p></div>
                <div><h3 className="font-semibold">Objective:</h3><p className="mt-1 text-[#777B83]">to provide the Correctional Services Subcommittee an analysis of contemporary community services practice that could inform the Community Corrections specialisations in the Certificate III and Certificate IV in Correctional Practice.</p></div>
                <div>
                  <h3 className="font-semibold">Approach:</h3>
                  <p className="mt-1 text-[#777B83]">In collaboration with HumanAbility, undertake an analysis of the recent updates to CHC Community Services Training Package addressing the following capability areas to consider contemporary practice in community services and case management and identify whether this may support CCO skills requirements:</p>
                  <ul className="list-disc pl-5 text-[#777B83]">{capabilityAreas.map((area) => <li key={area}>{area}</li>)}</ul>
                  <p className="mt-1 text-[#777B83]">The findings report will be presented to the Correctional Services Subcommittee for further action.</p>
                </div>
                <div><h3 className="font-semibold">Deliverable:</h3><p className="mt-1 text-[#777B83]">Findings Report</p></div>
                <div><h3 className="font-semibold">Impact:</h3><p className="mt-1 text-[#777B83]">Support the Correctional Services by providing analysis of contemporary practice in similar capability areas in different industry-sectors.</p></div>
                <div><h3 className="font-semibold">Anticipated timing:</h3><p className="mt-1 text-[#777B83]">18-month project</p></div>
              </div>
              <aside className="text-sm leading-6">
                <h3 className="font-semibold">Key Stakeholders:</h3>
                <ul className="mt-2 flex flex-wrap gap-2">{stakeholders.map((stakeholder) => <li key={stakeholder} className="rounded-full bg-[#E8E9EF] px-3 py-1 text-xs font-semibold leading-5 text-[#424996] transition-colors duration-200 hover:bg-[#DCDFF0] motion-reduce:transition-none">{stakeholder}</li>)}</ul>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
