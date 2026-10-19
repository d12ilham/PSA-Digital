"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const currentReportUrl =
  "https://psa-directus-prod.azurewebsites.net/assets/b3a99498-8d9f-4275-aa00-fcf73274d2ce.pdf";

const previousReports = [
  {
    title: "2025 Public Safety Workforce Insights Report",
    url: "https://psa-directus-prod.azurewebsites.net/assets/8606dd9e-6351-4d5d-b595-2dcfdd27bf43",
  },
  {
    title: "2024 Defence Workforce Plan",
    url: "https://psa-directus-prod.azurewebsites.net/assets/0030db8f-bb21-45d6-8989-c04b22798157",
  },
  {
    title: "2024 Fire and Emergency Services Workforce Plan",
    url: "https://psa-directus-prod.azurewebsites.net/assets/754f370e-4884-47c2-b8ce-4c1bd106ed73",
  },
  {
    title: "2024 Police Workforce Plan",
    url: "https://psa-directus-prod.azurewebsites.net/assets/a33ba7b4-6b83-4bfe-8b54-b1b8600071ce",
  },
];

export default function PublicSafetyDownloadsView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="downloads"
      navigation={{ prev: { label: "2027 and Beyond", href: `/reports/${slug}/looking_forward` } }}
    >
      <section className="relative flex min-h-[194px] items-center overflow-hidden rounded-md border border-[#ECECE5] bg-white px-6 py-8 sm:px-8">
        <div className="relative z-10 max-w-[1050px] animate-slide-up motion-reduce:animate-none">
          <p className="text-xs font-medium text-[#598303]">Download PDF</p>
          <h1 className="mt-5 text-[29px] font-semibold leading-tight text-[#046D2A] sm:text-[38px]">
            Public Safety Workforce Insights Reports
          </h1>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[36%] animate-zoom-in motion-reduce:animate-none">
          <Image src="/images/hero-graphic-downloads.png" alt="" width={573} height={142} className="h-full w-full object-cover object-right opacity-20 lg:opacity-100" priority />
        </div>
      </section>

      <section aria-label="Reports available for download" className="grid items-stretch gap-6 lg:grid-cols-2">
        <article className="group flex min-h-[310px] flex-col rounded-md bg-[#046D2A] p-6 text-white animate-card-entrance transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:animate-none motion-reduce:hover:translate-y-0 sm:p-8" style={{ animationDelay: "0.12s" }}>
          <p className="text-xs font-medium">FULL REPORT</p>
          <Image src="/images/downloads-full-report-icon.png" alt="" width={100} height={100} className="mt-6 size-[100px] transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none" />
          <h2 className="mt-5 text-xl font-semibold leading-7">2026 Public Safety Workforce Insights Report</h2>
          <div className="mt-auto pt-6">
            <a href={currentReportUrl} target="_blank" rel="noopener noreferrer" className="group/open inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-semibold text-[#046D2A] transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#EFF4D6] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:hover:translate-y-0">
              Open 2026 PDF <ExternalLink className="size-4 transition-transform duration-300 group-hover/open:-translate-y-0.5 group-hover/open:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
            </a>
          </div>
        </article>

        <article className="min-h-[310px] overflow-hidden rounded-md border border-[#ECECE5] bg-white animate-card-entrance transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:animate-none motion-reduce:hover:translate-y-0" style={{ animationDelay: "0.24s" }}>
          <div className="h-2 bg-[#182B5B]" />
          <div className="px-6 py-6 sm:px-8">
            <h2 className="text-xs font-medium text-[#535862]">PREVIOUS REPORTS</h2>
            <div className="mt-8 space-y-4">
              {previousReports.map((previousReport, index) => (
                <a key={previousReport.title} href={previousReport.url} target="_blank" rel="noopener noreferrer" className="flex min-h-[58px] w-full items-center justify-between gap-4 rounded-full border border-[#B4BDD3] bg-[#F2F5FA] px-5 py-3 text-left text-xs font-semibold text-[#182B5B] animate-content-switch transition-[background-color,border-color,box-shadow] duration-300 hover:border-[#182B5B] hover:bg-[#E9EDF5] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#182B5B] motion-reduce:animate-none" style={{ animationDelay: `${0.45 + index * 0.12}s` }}>
                  <span>{previousReport.title}</span>
                  <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </article>
      </section>
    </PublicSafetyPageShell>
  );
}
