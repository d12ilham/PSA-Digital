"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Download, FileDown } from "lucide-react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import FederalStateReportUtilityRow from "../FederalStateReportUtilityRow";

interface Report {
  id: string;
  title: string;
  slug: string;
  status: string;
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: { label: string };
}

// Official PDF destinations published at publicskillsaustralia.org.au/workforce-plans.
const currentReportUrl = "https://psa-directus-prod.azurewebsites.net/assets/51b5fe57-c571-427b-ae72-917b57603b4b.pdf";
const previousReports = [
  { year: 2025, title: "Federal and State/Territory Government Workforce Insights Report - 2025", url: "https://psa-directus-prod.azurewebsites.net/assets/fc3d5c1a-e34b-4b5d-80c3-9439f94d219f" },
  { year: 2024, title: "Federal, State/Territory and Local Government Workforce Plan - 2024", url: "https://psa-directus-prod.azurewebsites.net/assets/acd96fb3-8c56-4df4-9670-6a92e6eb696d" },
];

export default function FederalStateDownloadsView({ slug, report }: { slug: string; report: Report }) {
  const router = useRouter();
  const fallbackHref = `/reports/${slug}/introduction`;
  const handleBack = () => {
    const navigation = (window as Window & { navigation?: { canGoBack: boolean } }).navigation;
    // Navigation API distinguishes a previous entry from forward-only history.
    const canGoBack = navigation?.canGoBack ?? window.history.length > 1;
    if (canGoBack) {
      router.back();
    } else {
      router.replace(fallbackHref);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252B37] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="looking_forward" />

      <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 px-4 py-5 sm:px-6 lg:px-8">
        <FederalStateReportUtilityRow>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={handleBack} className="flex cursor-pointer items-center gap-2 rounded-full border border-[#754C2D] bg-white px-5 py-2.5 text-xs font-semibold text-[#754C2D] transition-colors hover:bg-[#EED4C4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754C2D]">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Back
            </button>
          </div>
        </FederalStateReportUtilityRow>

        <section className="relative flex min-h-[194px] items-center overflow-hidden rounded-md border border-[#E9EAEB] bg-white px-6 py-8 sm:px-8">
          <div className="relative z-10 max-w-[1000px]">
            <p className="animate-slide-up text-xs font-medium text-[#754C2D] motion-reduce:animate-none">Download PDF</p>
            <h1 className="animate-slide-up mt-6 text-[29px] font-semibold leading-tight text-[#754C2D] motion-reduce:animate-none sm:text-[38px]" style={{ animationDelay: "0.12s" }}>
              Federal and State/Territory Government<br className="hidden lg:block" /> Workforce Insights Reports downloadable PDFs
            </h1>
          </div>
          <span aria-hidden="true" className="animate-zoom-in pointer-events-none absolute bottom-0 right-0 aspect-[568/143] w-[36%] max-w-[512px] bg-[#754C2D] motion-reduce:animate-none" style={{ maskImage: "url('/images/hero-graphic-downloads.png')", maskSize: "100% 100%", maskRepeat: "no-repeat", WebkitMaskImage: "url('/images/hero-graphic-downloads.png')", WebkitMaskSize: "100% 100%", WebkitMaskRepeat: "no-repeat" }} />
        </section>

        <section aria-label="Reports available for download" className="grid items-stretch gap-6 lg:grid-cols-2">
          <div className="animate-card-entrance motion-reduce:animate-none" style={{ animationDelay: "0.2s" }}>
          <article className="group flex h-full min-h-[370px] flex-col rounded-md bg-[#754C2D] p-6 text-white transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:bg-[#694329] hover:shadow-lg motion-reduce:hover:translate-y-0 sm:p-8">
            <p className="text-xs font-medium">FULL REPORT</p>
            <span aria-hidden="true" className="animate-zoom-in mt-6 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white text-[#754C2D] transition-transform duration-300 group-hover:scale-105 motion-reduce:animate-none motion-reduce:transform-none"><FileDown size={56} strokeWidth={1.5} /></span>
            <h2 className="mt-6 text-xl font-semibold leading-7">2026 Federal and State/Territory Government Workforce Insights Report</h2>
            <p className="mt-3 max-w-[600px] text-sm leading-6 text-white/90">
              The approved report covers workforce trends, industry insights and proposed strategies across Federal and State/Territory Governments.
            </p>
            <div className="mt-auto pt-6">
                <a href={currentReportUrl} target="_blank" rel="noopener noreferrer" aria-label="Download 2026 PDF (opens in a new tab or window)" className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-xs font-semibold text-[#754C2D] transition-[background-color,box-shadow] hover:bg-[#EED4C4] hover:shadow-sm">
                  Download 2026 PDF <Download aria-hidden="true" className="h-4 w-4" />
                </a>
            </div>
          </article>
          </div>

          <div className="animate-card-entrance motion-reduce:animate-none" style={{ animationDelay: "0.34s" }}>
          <article className="h-full overflow-hidden rounded-md border border-[#E9EAEB] bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#754C2D] hover:shadow-lg motion-reduce:hover:translate-y-0">
            <div className="h-[10px] bg-[#754C2D]" />
            <div className="px-6 py-6 sm:px-8 sm:py-7">
              <h2 className="text-xs font-medium text-[#555]">PREVIOUS REPORTS</h2>
              <div className="mt-9 space-y-4">
                {previousReports.map(({ year, title, url }) => (
                  <a key={year} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${title} (opens in a new tab or window)`} className="animate-content-switch flex min-h-[60px] w-full items-center justify-between gap-4 rounded-full border border-[#754C2D] bg-[#EED4C4] px-5 text-left text-sm font-semibold text-[#754C2D] transition-[background-color,box-shadow] duration-300 hover:bg-[#EED4C4]/80 hover:shadow-sm motion-reduce:animate-none" style={{ animationDelay: `${0.5 + (2025 - year) * 0.13}s` }}>
                    <span>{title}</span>
                    <Download aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </a>
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
