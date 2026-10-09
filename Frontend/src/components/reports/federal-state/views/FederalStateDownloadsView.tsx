"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";

interface Report {
  id: string;
  title: string;
  slug: string;
  status: string;
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: { label: string };
}

const previousReports = [2025, 2024, 2023];

export default function FederalStateDownloadsView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="looking_forward" />

      <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 px-4 py-5 sm:px-6 lg:px-8">
        <Link href={`/reports/${slug}/looking_forward`} className="inline-flex h-10 items-center gap-2 rounded-full border border-[#B2DB79] px-5 text-xs font-semibold text-[#54710F] transition-[background-color,border-color,box-shadow] hover:border-[#8AC900] hover:bg-white hover:shadow-sm">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back
        </Link>

        <section className="relative flex min-h-[194px] items-center overflow-hidden rounded-md border border-[#ECECE5] bg-white px-6 py-8 sm:px-8">
          <div className="relative z-10 max-w-[1000px]">
            <p className="animate-slide-up text-xs font-medium text-[#54710F] motion-reduce:animate-none">Download PDF</p>
            <h1 className="animate-slide-up mt-6 text-[29px] font-semibold leading-tight text-[#006C30] motion-reduce:animate-none sm:text-[38px]" style={{ animationDelay: "0.12s" }}>
              Federal and State/Territory Government<br className="hidden lg:block" /> Workforce Insights Reports downloadable PDFs
            </h1>
          </div>
          <Image src="/images/hero-graphic-downloads.png" alt="" width={512} height={240} className="animate-zoom-in pointer-events-none absolute bottom-0 right-0 h-auto w-[36%] max-w-[512px] motion-reduce:animate-none" priority />
        </section>

        <section aria-label="Reports available for download" className="grid items-stretch gap-6 lg:grid-cols-2">
          <div className="animate-card-entrance motion-reduce:animate-none" style={{ animationDelay: "0.2s" }}>
          <article className="group flex h-full min-h-[370px] flex-col rounded-md bg-[#006C30] p-6 text-white transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:bg-[#007B38] hover:shadow-lg motion-reduce:hover:translate-y-0 sm:p-8">
            <p className="text-xs font-medium">FULL REPORT</p>
            <Image src="/images/downloads-full-report-icon.png" alt="" width={100} height={100} className="animate-zoom-in mt-6 h-[100px] w-[100px] transition-transform duration-300 group-hover:scale-105 motion-reduce:animate-none motion-reduce:transform-none" />
            <h2 className="mt-6 text-xl font-semibold leading-7">2026 Government Workforce Insights Report</h2>
            <p className="mt-3 max-w-[600px] text-sm leading-6 text-white/90">
              Includes Appendix A: participants in the Local Government Skills Audit — the full list of participating councils by state.
            </p>
            <div className="mt-auto pt-6">
              {report.pdfFileUrl ? (
                <a href={report.pdfFileUrl} download className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-xs font-semibold text-[#006C30] transition-[background-color,box-shadow] hover:bg-[#EFF4D6] hover:shadow-sm">
                  Download 2026 PDF <Download aria-hidden="true" className="h-4 w-4" />
                </a>
              ) : (
                <button type="button" disabled title="The 2026 PDF is not available yet" className="inline-flex h-10 cursor-not-allowed items-center gap-2 rounded-full bg-white px-5 text-xs font-semibold text-[#006C30]">
                  Download 2026 PDF <Download aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </div>
          </article>
          </div>

          <div className="animate-card-entrance motion-reduce:animate-none" style={{ animationDelay: "0.34s" }}>
          <article className="h-full overflow-hidden rounded-md border border-[#ECECE5] bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#A6BA76] hover:shadow-lg motion-reduce:hover:translate-y-0">
            <div className="h-[10px] bg-[#9EAD59]" />
            <div className="px-6 py-6 sm:px-8 sm:py-7">
              <h2 className="text-xs font-medium text-[#555]">PREVIOUS REPORTS</h2>
              <div className="mt-9 space-y-4">
                {previousReports.map((year) => (
                  <button key={year} type="button" disabled title={`The ${year} PDF is not available yet`} className="animate-content-switch flex min-h-[60px] w-full cursor-not-allowed items-center justify-between gap-4 rounded-full border border-[#9EAD59] bg-[#E9EDDB] px-5 text-left text-sm font-semibold text-[#252D02] transition-[background-color,box-shadow] duration-300 hover:bg-[#E2EACF] hover:shadow-sm motion-reduce:animate-none" style={{ animationDelay: `${0.5 + (2025 - year) * 0.13}s` }}>
                    <span>Local Government Workforce Insights Reports - {year}</span>
                    <Download aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </article>
          </div>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
