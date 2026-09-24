"use client";

import type { ReactNode } from "react";
import { ChevronDown, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

export interface PublicSafetyReport {
  contactUrl?: string;
  pdfFileUrl?: string;
  psaSectorPageUrl?: string;
  year?: { label: string };
}

export default function PublicSafetyPageShell({ slug, report, currentPage, children }: { slug: string; report: PublicSafetyReport; currentPage: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAF0] text-[#252D02] font-sans flex flex-col antialiased selection:bg-[#8AC900]/30">
      <PublicSafetyHeader slug={slug} report={report} />
      <main className="mx-auto w-full max-w-[1488px] flex-1 space-y-6 px-4 py-6 sm:px-6">
        <ReportNavButtons
          slug={slug}
          currentPage={currentPage}
          prev={currentPage === "executive_summary" ? { label: "About Public Skills Australia", href: `/reports/${slug}/about` } : currentPage === "introduction" || currentPage === "methodology" ? { label: "Public Safety Overview", href: `/reports/${slug}` } : currentPage === "about" ? { label: "Executive Summary", href: `/reports/${slug}/executive_summary` } : undefined}
          next={currentPage === "executive_summary" ? { label: "Introduction", href: `/reports/${slug}/introduction` } : currentPage === "about" ? { label: "Executive Summary", href: `/reports/${slug}/executive_summary` } : currentPage === "methodology" ? { label: "Drivers of Change", href: `/reports/${slug}/drivers_of_change` } : undefined}
        />
        {children}
      </main>
      <ReportFooter
        contactUrl={report.contactUrl}
        reportName="Public Safety Workforce Insights Report"
        className="flex h-[72px] items-center py-0"
        containerClassName="w-full max-w-[1488px] sm:px-6 lg:px-6"
      />
    </div>
  );
}

function PublicSafetyHeader({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  const items = [
    { label: "About", path: "about", dropdown: true },
    { label: "Executive Summary", path: "executive_summary" },
    { label: "Drivers of Change", path: "drivers_of_change" },
    { label: "Cross-Sector Analysis", path: "industry_overview", dropdown: true },
    { label: "DEF", path: "industry_overview", dropdown: true, dot: true },
    { label: "FES", path: "industry_overview", dropdown: true, dot: true },
    { label: "POL", path: "industry_overview", dropdown: true, dot: true },
    { label: "Cross-Sector Strategies", path: "workforce_strategies", dropdown: true },
    { label: "Looking Forward", path: "looking_forward" },
  ];

  return (
    <header className="sticky top-0 z-50 h-[60px] bg-[#252D02] text-white">
      <div className="mx-auto flex h-full w-full max-w-[1488px] items-center justify-between px-4 sm:px-6">
        <button type="button" onClick={() => router.push(`/reports/${slug}`)} className="shrink-0 text-sm font-bold">PS WIR <span className="text-[#8AC900]">{report.year?.label || "2026"}</span></button>
        <nav className="hidden items-center gap-5 text-[11px] font-semibold xl:flex">
          {items.map((item) => (
            <button key={item.label} type="button" onClick={() => router.push(`/reports/${slug}/${item.path}`)} className="flex items-center gap-1 whitespace-nowrap text-white/85 hover:text-white">
              {item.dot && <span className="text-[#8AC900]">•</span>}{item.label}{item.dropdown && <ChevronDown className="h-3 w-3" />}
            </button>
          ))}
        </nav>
        <button type="button" onClick={() => router.push(`/reports/${slug}/downloads`)} className="flex h-9 shrink-0 items-center gap-2 rounded-full bg-[#046D2A] px-4 text-[11px] font-bold text-white">Download 2026 PDF <Download className="h-3.5 w-3.5" /></button>
      </div>
    </header>
  );
}

export function PublicSafetyEyebrow({ children }: { children: ReactNode }) {
  return <span className="block text-xs font-semibold uppercase text-[#598303]">{children}</span>;
}
