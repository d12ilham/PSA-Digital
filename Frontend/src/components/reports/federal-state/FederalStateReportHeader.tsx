"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Download, Menu, X } from "lucide-react";

type NavigationItem = {
  label: string;
  page: string;
  children?: NavigationItem[];
};

type NavigationGroup = {
  label: string;
  page?: string;
  items?: NavigationItem[];
};

const navigation: NavigationGroup[] = [
  {
    label: "About",
    items: [
      { label: "About Public Skills Australia", page: "about" },
      { label: "Introduction", page: "introduction" },
      { label: "Methodology", page: "methodology" },
    ],
  },
  { label: "Executive Summary", page: "executive_summary" },
  { label: "Drivers of Change", page: "drivers_of_change" },
  {
    label: "Industry Overview",
    items: [
      { label: "Federal Government Industry-Sector Overview", page: "industry_overview" },
      { label: "Industry Profile", page: "industry_profile" },
      ...[
        ["ACT", "act"], ["NSW", "nsw"], ["NT", "nt"], ["QLD", "qld"],
        ["SA", "sa"], ["Tas", "tas"], ["Vic", "vic"], ["WA", "wa"],
      ].map(([label, key]) => ({
        label: `${label} Workforce Overview`,
        page: `industry_profile_${key}`,
      })),
    ],
  },
  {
    label: "Workforce Insights",
    items: [
      { label: "Theme 1 - Future of the Public Service", page: "workforce_insights" },
      { label: "PSA Insight 1 - Productivity and Economic Growth", page: "workforce_insight_1" },
      { label: "PSA Insight 2 - Workforce Gaps", page: "workforce_insight_2" },
      { label: "PSA Insight 3 - Future Skills for the Public Service", page: "workforce_insight_3" },
    ],
  },
  {
    label: "Workforce Strategies",
    items: [
      {
        label: "2026 Proposed Federal and State/Territory Government Workforce Strategy",
        page: "workforce_strategies",
      },
      {
        label: "Update on 2025 Workforce Strategies",
        page: "update_2025_strategies",
        children: [
          {
            label: "Proposal to Review VET Traineeship and Apprenticeship Pathways into the Public Sector",
            page: "update_2025_strategies#fstg-2025-pathways",
          },
          {
            label: "Proposal to Conduct a Cross-Jurisdictional Current and Future Skills Audit for the Public Sector",
            page: "update_2025_strategies#fstg-2025-skills-audit",
          },
        ],
      },
      { label: "Existing Industry-Sector Strategies", page: "existing_strategies" },
      { label: "Federal Government Strategies", page: "federal_initiatives" },
    ],
  },
  {
    label: "Looking Forward",
    items: [{ label: "2027 and Beyond", page: "looking_forward" }],
  },
];

export default function FederalStateReportHeader({
  slug,
  year,
}: {
  slug: string;
  year: string;
}) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const base = `/reports/${slug}`;
  const activeClass = "font-bold text-[#8AC900]";
  const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8AC900]";

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  const closeMenu = () => {
    setOpenGroup(null);
    setMobileOpen(false);
  };
  const isActive = (page: string) => !page.includes("#") && pathname === `${base}/${page}`;
  const renderItem = (item: NavigationItem) => (
    <li key={item.page}>
      <Link
        href={`${base}/${item.page}`}
        prefetch={false}
        onClick={closeMenu}
        aria-current={isActive(item.page) ? "page" : undefined}
        className={`block rounded-md px-3 py-2.5 text-xs leading-5 break-words transition-colors hover:bg-white/10 ${focusClass} ${isActive(item.page) ? `${activeClass} bg-white/10` : "text-white/90"}`}
      >
        {item.label}
      </Link>
      {item.children && (
        <ul className="ml-4 border-l border-white/20 pl-2">
          {item.children.map(renderItem)}
        </ul>
      )}
    </li>
  );

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-[#252D02] text-white">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-3 px-4 py-3.5 sm:px-6 xl:flex-nowrap xl:px-8">
        <Link href={base} prefetch={false} onClick={closeMenu} className={`shrink-0 text-base font-bold ${focusClass}`}>
          FSTG WIR <span className="text-[#8AC900]">{year}</span>
        </Link>
        <button
          type="button"
          aria-label={mobileOpen ? "Close report menu" : "Open report menu"}
          aria-expanded={mobileOpen}
          aria-controls="fstg-report-navigation"
          onClick={() => { setMobileOpen(!mobileOpen); setOpenGroup(null); }}
          className={`ml-auto flex h-10 w-10 items-center justify-center rounded-md border border-white/20 xl:hidden ${focusClass}`}
        >
          {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
        <nav
          id="fstg-report-navigation"
          aria-label="Report navigation"
          className={`${mobileOpen ? "block" : "hidden"} order-last max-h-[calc(100dvh-90px)] w-full overflow-y-auto border-t border-white/10 pt-2 xl:order-none xl:flex xl:w-auto xl:flex-1 xl:items-center xl:justify-center xl:gap-3 xl:overflow-visible xl:border-0 xl:pt-0`}
        >
          {navigation.map((group, index) => {
            const active = group.items?.some((item) => isActive(item.page)) || (group.page && isActive(group.page));
            if (group.page) {
              return <Link key={group.label} href={`${base}/${group.page}`} prefetch={false} onClick={closeMenu} aria-current={active ? "page" : undefined} className={`block rounded-md px-2 py-3 text-xs font-semibold xl:whitespace-nowrap xl:px-0 xl:py-1 xl:text-[11px] ${focusClass} ${active ? activeClass : "text-white/80 hover:text-white"}`}>{group.label}</Link>;
            }
            const expanded = openGroup === group.label;
            return (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => { if (window.matchMedia("(min-width: 1280px) and (hover: hover)").matches) setOpenGroup(group.label); }}
                onMouseLeave={() => { if (window.matchMedia("(min-width: 1280px) and (hover: hover)").matches) setOpenGroup(null); }}
                onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpenGroup(null); }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setOpenGroup(null);
                    event.currentTarget.querySelector("button")?.focus();
                  }
                }}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`fstg-menu-${index}`}
                  onClick={(event) => {
                    const hoverClick = event.detail > 0 && window.matchMedia("(min-width: 1280px) and (hover: hover)").matches;
                    setOpenGroup(hoverClick || !expanded ? group.label : null);
                  }}
                  className={`flex w-full items-center justify-between gap-1 rounded-md px-2 py-3 text-left text-xs font-semibold xl:whitespace-nowrap xl:px-0 xl:py-1 xl:text-[11px] ${focusClass} ${active ? activeClass : "text-white/80 hover:text-white"}`}
                >
                  {group.label}<ChevronDown size={13} aria-hidden="true" className={`shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} />
                </button>
                <div hidden={!expanded} className={`xl:absolute xl:top-full xl:z-50 xl:w-[360px] xl:pt-2 ${index >= 4 ? "xl:right-0" : "xl:left-0"}`}>
                  <ul id={`fstg-menu-${index}`} className="space-y-1 rounded-md bg-[#161b01] p-2 xl:max-h-[calc(100dvh-100px)] xl:overflow-y-auto xl:border xl:border-white/10 xl:shadow-xl">
                    {group.items?.map(renderItem)}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>
        <Link href={`${base}/downloads`} prefetch={false} onClick={closeMenu} className={`flex shrink-0 items-center gap-2 rounded-full bg-[#046D2A] px-3 py-2 text-xs font-bold transition-colors hover:bg-[#058237] ${focusClass}`}>
          <span className="hidden sm:inline">Download {year} PDF</span>
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only sm:hidden">Download {year} PDF</span>
        </Link>
      </div>
    </header>
  );
}
