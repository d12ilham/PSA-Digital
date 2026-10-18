"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";

type CorrectionalServicesReport = {
  contactUrl?: string;
  pdfFileUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const approvedPdf = "/reports/correctional-services-wir-2026.pdf";
const previousYears = [2025, 2024, 2023];

export default function CorrectionalServicesDownloadsView({ slug, report }: { slug: string; report: CorrectionalServicesReport }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="looking_forward" />

      <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <Link href={`/reports/${slug}/looking_forward`} className="inline-flex h-10 items-center gap-2 rounded-full border border-[#B2DB79] px-5 text-xs font-semibold text-[#54710F] animate-content-switch transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#424996] motion-reduce:animate-none motion-reduce:hover:translate-y-0">
          <ArrowLeft className="size-4" aria-hidden="true" /> Back
        </Link>

        <section className="relative flex min-h-[194px] items-center overflow-hidden rounded-md border border-[#ECECE5] bg-white px-6 py-8 sm:px-8">
          <div className="relative z-10 max-w-[1050px] animate-slide-up motion-reduce:animate-none">
            <p className="text-xs font-medium text-[#54710F]">Download PDF</p>
            <h1 className="mt-5 text-[29px] font-semibold leading-tight text-[#424996] sm:text-[38px]">
              Correctional Services Workforce Insights Reports downloadable PDFs
            </h1>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[36%] animate-zoom-in motion-reduce:animate-none">
            <Image src="/images/hero-graphic-downloads.png" alt="" width={573} height={142} className="h-full w-full object-cover object-right opacity-20 lg:opacity-100" priority />
          </div>
        </section>

        <section aria-label="Reports available for download" className="grid items-stretch gap-6 lg:grid-cols-2">
          <article className="group flex min-h-[310px] flex-col rounded-md bg-[#424996] p-6 text-white animate-card-entrance transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:animate-none motion-reduce:hover:translate-y-0 sm:p-8" style={{ animationDelay: "0.12s" }}>
            <p className="text-xs font-medium">FULL REPORT</p>
            <Image src="/images/downloads-full-report-icon.png" alt="" width={100} height={100} className="mt-6 size-[100px] [filter:hue-rotate(90deg)] transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none" />
            <h2 className="mt-5 text-xl font-semibold leading-7">2026 Correctional Services Workforce Insights Report</h2>
            <div className="mt-auto pt-6">
              <a href={approvedPdf} download className="group/download inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-xs font-semibold text-[#424996] transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#EFF4D6] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:hover:translate-y-0">
                Download 2026 PDF <Download className="size-4 transition-transform duration-300 group-hover/download:translate-y-0.5 motion-reduce:transform-none" aria-hidden="true" />
              </a>
            </div>
          </article>

          <article className="min-h-[310px] overflow-hidden rounded-md border border-[#ECECE5] bg-white animate-card-entrance transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:animate-none motion-reduce:hover:translate-y-0" style={{ animationDelay: "0.24s" }}>
            <div className="h-2 bg-[#424996]" />
            <div className="px-6 py-6 sm:px-8">
              <h2 className="text-xs font-medium text-[#535862]">PREVIOUS REPORTS</h2>
              <div className="mt-8 space-y-4">
                {previousYears.map((year, index) => (
                  <button key={year} type="button" disabled title={`The ${year} PDF is not available yet`} className="flex min-h-[58px] w-full cursor-not-allowed items-center justify-between gap-4 rounded-full border border-[#8589B5] bg-[#F0F0F7] px-5 text-left text-xs font-semibold text-[#424996] animate-content-switch transition-[background-color,border-color,box-shadow] duration-300 hover:border-[#424996] hover:bg-[#E9EAF3] hover:shadow-sm motion-reduce:animate-none" style={{ animationDelay: `${0.45 + index * 0.12}s` }}>
                    <span>Correctional Services Workforce Insights Reports - {year}</span>
                    <Download className="size-4 shrink-0" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </article>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
