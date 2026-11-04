"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type Report = {
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const strategies = [
  {
    id: "demand-management",
    eyebrow: "Strategy One",
    title: "Demand Management",
    border: "#9DA8D0",
    summary: "Correctional Services organisations face a range of recruitment, retention and attrition challenges, indicated by reduced employee numbers and increasing prison populations. This also manifests in attraction based challenges, relating to perceptions and stereotypical narratives about working in this industry-sector.",
  },
  {
    id: "workforce-mobility",
    eyebrow: "Strategy Two",
    title: "Workforce Mobility",
    border: "#424996",
    summary: "Correctional services organisations face challenges in relation to participation in the VET sector and particularly with the implementation of the Certificate III in Correctional Practice, the entry level qualification for Correctional Services.",
  },
] as const;

export default function CorrectionalServicesUpdate2024StrategiesView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="update_2024_strategies" />
      <main className="mx-auto w-full max-w-[1504px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="update_2024_strategies"
          prev={{ label: "2026 Proposed Workforce Strategy", href: `/reports/${slug}/workforce_strategies` }}
          next={{ label: "Update on 2025 Strategies", href: `/reports/${slug}/update_2025_strategies` }}
          prevPrefix=""
        />

        <section className="flex flex-col gap-6 rounded-[14px] border border-[#E9EAEB] bg-white p-6 animate-slide-up motion-reduce:animate-none lg:min-h-[208px] lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[850px]">
            <span className="inline-flex rounded-full bg-[#424996] px-3 py-1 text-xs font-semibold text-white">Workforce Strategies · Update on 2024 Workforce Strategies</span>
            <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-[40px] sm:leading-[1.22]">Update on 2024 Strategies</h1>
            <p className="mt-4 text-sm leading-6">Public Skills Australia’s 2024 Correctional Services Workforce Plan, identified two challenges impacting the Correctional Services workforce:</p>
            <p className="mt-4 text-sm leading-6">To support industry with these challenges, Public Skills Australia completed two projects in 2025 to provide deeper insights into their causes.</p>
          </div>
          <div className="w-full max-w-[480px] shrink-0 animate-zoom-in motion-reduce:animate-none lg:w-[480px]" aria-hidden="true">
            <Image src="/images/reports/correctional-workforce-strategies-frame-436.svg" width={480} height={140} alt="" className="h-auto w-full" />
          </div>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          {strategies.map((strategy, index) => (
              <section key={strategy.id} className="overflow-hidden rounded-[14px] border border-[#E9EAEB] bg-white animate-card-entrance motion-reduce:animate-none" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="h-[11px]" style={{ backgroundColor: strategy.border }} />
                <div className="flex min-h-[288px] flex-col p-6">
                  <p className="text-sm font-medium text-[#424996]">{strategy.eyebrow}</p>
                  <h2 className="mt-4 text-xl font-semibold">{strategy.title}</h2>
                  <p className="mt-4 flex-1 text-sm leading-6 text-[#535862]">{strategy.summary}</p>
                  <Link
                    href={`/reports/${slug}/${index === 0 ? "update_2024_demand_management" : "update_2024_workforce_mobility"}`}
                    className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-[#8AC900] px-5 py-2.5 text-sm font-semibold text-[#252D02] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#9ED41F] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#424996] motion-reduce:transition-none"
                  >
                    Open <ArrowRight className="size-4" />
                  </Link>
                </div>
              </section>
          ))}
        </div>

      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
