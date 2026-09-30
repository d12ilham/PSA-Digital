"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, Download, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import type { NavTarget } from "@/components/layout/ReportNavButtons";

export interface PublicSafetyReport {
  contactUrl?: string;
  pdfFileUrl?: string;
  psaSectorPageUrl?: string;
  year?: { label: string };
}

export default function PublicSafetyPageShell({ slug, report, currentPage, children, navigation }: { slug: string; report: PublicSafetyReport; currentPage: string; children: ReactNode; navigation?: { back?: NavTarget; backSecondary?: NavTarget; prev?: NavTarget; next?: NavTarget; prevPrefix?: string; nextPrefix?: string; pagesOrder?: { key: string; label: string }[] } }) {
  return (
    <div className="min-h-screen bg-[#FAFAF0] text-[#252D02] font-sans flex flex-col antialiased selection:bg-[#8AC900]/30">
      <PublicSafetyHeader slug={slug} report={report} currentPage={currentPage} />
      <main className="mx-auto w-full max-w-[1488px] flex-1 space-y-6 px-4 py-6 sm:px-6">
        <ReportNavButtons
          slug={slug}
          currentPage={currentPage}
          prev={navigation?.prev ?? (currentPage === "executive_summary" ? { label: "About Public Skills Australia", href: `/reports/${slug}/about` } : currentPage === "introduction" || currentPage === "methodology" ? { label: "Public Safety Overview", href: `/reports/${slug}` } : currentPage === "about" ? { label: "Executive Summary", href: `/reports/${slug}/executive_summary` } : undefined)}
          next={navigation?.next ?? (currentPage === "executive_summary" ? { label: "Introduction", href: `/reports/${slug}/introduction` } : currentPage === "about" ? { label: "Executive Summary", href: `/reports/${slug}/executive_summary` } : currentPage === "methodology" ? { label: "Drivers of Change", href: `/reports/${slug}/drivers_of_change` } : undefined)}
          back={navigation?.back}
          backSecondary={navigation?.backSecondary}
          prevPrefix={navigation?.prevPrefix}
          nextPrefix={navigation?.nextPrefix}
          pagesOrder={navigation?.pagesOrder}
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

interface MenuItem {
  label: string;
  path: string;
}

interface MenuGroup extends MenuItem {
  accent?: string;
  children?: MenuItem[];
  matches?: (page: string) => boolean;
}

function PublicSafetyHeader({ slug, report, currentPage }: { slug: string; report: PublicSafetyReport; currentPage: string }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sectorChildren = (prefix: "defence" | "fes" | "police"): MenuItem[] => [
    { label: "Chapter Overview", path: prefix },
    { label: "Industry-Sector Overview", path: `${prefix}_industry_overview` },
    { label: "Industry Profile", path: `${prefix}_industry_profile` },
    { label: "Workforce Insights", path: `${prefix}_workforce_insights` },
    { label: "2026 Proposed Workforce Strategies", path: `${prefix}_workforce_strategies` },
    { label: "Update on 2025 Strategies", path: `${prefix}_update_2025_strategies` },
    { label: "Existing Industry-Sector Strategies", path: `${prefix}_existing_strategies` },
    { label: "Federal Government Initiatives", path: `${prefix}_federal_initiatives` },
  ];

  const items: MenuGroup[] = [
    {
      label: "About",
      path: "introduction",
      matches: (page) => ["introduction", "about", "methodology"].includes(page),
      children: [
        { label: "Introduction", path: "introduction" },
        { label: "About Public Skills Australia", path: "about" },
        { label: "Methodology", path: "methodology" },
      ],
    },
    { label: "Executive Summary", path: "executive_summary" },
    {
      label: "Drivers of Change",
      path: "drivers_of_change",
      matches: (page) => page === "drivers_of_change" || page.startsWith("driver_"),
    },
    {
      label: "Cross-Sector Analysis",
      path: "cross_sector_analysis",
      matches: (page) => page.startsWith("cross_sector_"),
      children: [
        { label: "Cross-Sector Analysis Overview", path: "cross_sector_analysis" },
        { label: "Core Skill Alignment", path: "cross_sector_core_skill_alignment" },
        { label: "Specialist Skill Alignment", path: "cross_sector_specialist_skill_alignment" },
        { label: "Skills Recognition", path: "cross_sector_skills_recognition" },
      ],
    },
    { label: "DEF", path: "defence", accent: "#D6A52D", matches: (page) => page.startsWith("defence"), children: sectorChildren("defence") },
    { label: "FES", path: "fes", accent: "#CF4C2C", matches: (page) => page === "fes" || page.startsWith("fes_"), children: sectorChildren("fes") },
    { label: "POL", path: "police", accent: "#1685AD", matches: (page) => page.startsWith("police"), children: sectorChildren("police") },
    {
      label: "Cross-Sector Strategies",
      path: "police_proposed_strategies_summary",
      matches: (page) => page === "police_proposed_strategies_summary",
      children: [
        { label: "Proposed Strategies Summary", path: "police_proposed_strategies_summary" },
        { label: "Federal Government Initiatives", path: "police_federal_initiatives" },
      ],
    },
    { label: "Looking Forward", path: "looking_forward" },
  ];

  const navigate = (path: string) => {
    setMobileOpen(false);
    router.push(`/reports/${slug}/${path}`);
  };

  const isActive = (item: MenuGroup) => item.matches?.(currentPage) ?? item.path === currentPage;

  return (
    <header className="sticky top-0 z-50 bg-[#252D02] text-white shadow-[0_1px_0_rgba(255,255,255,0.06)]">
      <div className="mx-auto flex h-[60px] w-full max-w-[1488px] items-center justify-between gap-4 px-4 sm:px-6">
        <button type="button" onClick={() => router.push(`/reports/${slug}`)} className="shrink-0 cursor-pointer whitespace-nowrap text-[14px] font-bold tracking-0 text-white">
          PS WIR <span className="text-[#8AC900]">{report.year?.label || "2026"}</span>
        </button>

        <nav className="hidden h-full items-center gap-[18px] text-[11px] font-semibold xl:flex" aria-label="Public Safety report navigation">
          {items.map((item) => (
            <div key={item.label} className="group relative flex h-full items-center">
              <button
                type="button"
                onClick={() => navigate(item.path)}
                className={`flex cursor-pointer items-center gap-1 whitespace-nowrap transition-colors ${isActive(item) ? "text-[#8AC900]" : "text-white/85 hover:text-white"}`}
                aria-haspopup={item.children ? "menu" : undefined}
              >
                {item.accent ? <span className="text-[13px] leading-none" style={{ color: item.accent }}>•</span> : null}
                {item.label}
                {item.children ? <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" strokeWidth={1.8} /> : null}
              </button>

              {item.children ? (
                <div className="invisible absolute left-1/2 top-full min-w-[230px] -translate-x-1/2 translate-y-1 rounded-b-[8px] border border-white/10 bg-[#1B2304] p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100" role="menu">
                  {item.children.map((child) => (
                    <button
                      key={child.path}
                      type="button"
                      role="menuitem"
                      onClick={() => navigate(child.path)}
                      className={`block w-full cursor-pointer rounded-[5px] px-3 py-2 text-left text-[11px] leading-4 transition-colors ${currentPage === child.path ? "bg-[#8AC900] font-bold text-[#252D02]" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={() => navigate("downloads")} className="hidden h-9 cursor-pointer items-center gap-2 rounded-full bg-[#087D37] px-4 text-[11px] font-bold text-white transition-colors hover:bg-[#0A9141] sm:flex">
            Download {report.year?.label || "2026"} PDF <Download className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white xl:hidden"
            aria-label="Toggle report menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav className="max-h-[calc(100vh-60px)] overflow-y-auto border-t border-white/10 bg-[#1B2304] px-4 py-3 xl:hidden" aria-label="Mobile Public Safety report navigation">
          {items.map((item) => (
            <div key={item.label} className="border-b border-white/10 last:border-0">
              <button type="button" onClick={() => navigate(item.path)} className={`flex w-full cursor-pointer items-center gap-2 py-3 text-left text-xs font-semibold ${isActive(item) ? "text-[#8AC900]" : "text-white"}`}>
                {item.accent ? <span style={{ color: item.accent }}>•</span> : null}{item.label}
              </button>
              {item.children ? (
                <div className="grid grid-cols-1 gap-1 pb-3 sm:grid-cols-2">
                  {item.children.map((child) => (
                    <button key={child.path} type="button" onClick={() => navigate(child.path)} className={`cursor-pointer rounded-[5px] px-3 py-2 text-left text-[11px] ${currentPage === child.path ? "bg-[#8AC900] font-bold text-[#252D02]" : "bg-white/5 text-white/75"}`}>
                      {child.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export function PublicSafetyEyebrow({ children }: { children: ReactNode }) {
  return <span className="block text-xs font-semibold uppercase text-[#598303]">{children}</span>;
}
