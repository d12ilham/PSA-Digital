"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Loader2,
  Menu as MenuIcon,
  X,
  ChevronRight,
  Lightbulb,
  RefreshCw,
  Search,
  Wrench,
  ArrowRight,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import IntroductionView from "./views/IntroductionView";
import AboutView from "./views/AboutView";
import MethodologyView from "./views/MethodologyView";
import ExecutiveSummaryView from "./views/ExecutiveSummaryView";
import DriversOfChangeView from "./views/DriversOfChangeView";
import IndustryOverviewView from "./views/IndustryOverviewView";
import StateTerritoryView from "./views/StateTerritoryView";
import IndustryProfileView from "./views/IndustryProfileView";
import WorkforceInsightsView from "./views/WorkforceInsightsView";

interface PageItem {
  id: string;
  title: string;
  pageType: string;
  slug: string;
  sortOrder: number;
  isPublished?: boolean;
  parentPathway?: string | null;
}

interface ContentBlock {
  id: string;
  blockType: string;
  content: any;
  sortOrder: number;
}

interface Report {
  id: string;
  title: string;
  slug: string;
  status: string;
  pdfFileUrl?: string;
  psaSectorPageUrl?: string;
  contactUrl?: string;
  industry?: {
    name: string;
  };
  year?: {
    label: string;
  };
}

export default function PublicReportReaderPage({
  params,
}: {
  params: Promise<{ slug: string; pageType: string }>;
}) {
  const router = useRouter();
  const { slug, pageType } = use(params);

  const [report, setReport] = useState<Report | null>(null);
  const [pagesList, setPagesList] = useState<PageItem[]>([]);
  const [activePage, setActivePage] = useState<PageItem | null>(null);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchReportAndPages();
  }, [slug]);

  useEffect(() => {
    if (report && pagesList.length > 0) {
      loadPageContent();
    }
  }, [pageType, report, pagesList]);

  const fetchReportAndPages = async () => {
    setLoading(true);
    setError(null);
    try {
      const reportRes = await api.get<Report>(`/reports/${slug}`);
      setReport(reportRes);

      const pagesRes = await api.get<PageItem[]>(
        `/reports/${reportRes.id}/pages`,
      );
      const publishedPages = pagesRes.filter((p) => p.isPublished);
      setPagesList(publishedPages.sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (err: any) {
      console.error("Fetch reader report failed:", err);
      setError(err.message || "Report or chapters not found.");
    } finally {
      setLoading(false);
    }
  };

  const loadPageContent = async () => {
    if (!report) return;
    setPageLoading(true);
    setMobileMenuOpen(false);
    try {
      const page =
        pagesList.find((p) => p.pageType === pageType) || pagesList[0];
      if (!page) {
        setBlocks([]);
        setActivePage(null);
        return;
      }

      setActivePage(page);

      const blocksRes = await api.get<ContentBlock[]>(
        `/pages/${page.id}/blocks`,
      );
      setBlocks(blocksRes.sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (err: any) {
      console.error("Fetch page blocks failed:", err);
    } finally {
      setPageLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-[#85B810]" />
          <span className="font-mono text-xs uppercase text-muted">
            Initialising Document Reader...
          </span>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md w-full border border-red-200 bg-red-50/50 p-6 text-center rounded-xl">
          <span className="font-sans text-xs uppercase text-red-700 block mb-2 font-bold">
            READER EXCEPTION
          </span>
          <p className="text-xs text-red-600 mb-4">
            {error || "Unable to open document reader."}
          </p>
          <button
            onClick={() => router.push(`/reports/${slug}`)}
            className="border border-border bg-card px-4 py-2 font-sans text-xs uppercase text-primary hover:bg-sidebar transition-colors cursor-pointer rounded-xl"
          >
            Back to Cover
          </button>
        </div>
      </div>
    );
  }

  // ── SPECIAL PAGE VIEWS MATCHING DESIGN MOCKUPS ──
  if (pageType === "introduction") {
    return <IntroductionView slug={slug} report={report} />;
  }

  if (pageType === "about") {
    return <AboutView slug={slug} report={report} />;
  }

  if (pageType === "methodology") {
    return <MethodologyView slug={slug} report={report} />;
  }

  if (pageType === "executive_summary") {
    return <ExecutiveSummaryView slug={slug} report={report} />;
  }

  if (pageType === "drivers_of_change") {
    return <DriversOfChangeView slug={slug} report={report} />;
  }

  if (pageType === "industry_overview") {
    return <IndustryOverviewView slug={slug} report={report} />;
  }

  if (pageType === "state_territory") {
    return <StateTerritoryView slug={slug} report={report} />;
  }

  if (pageType === "industry_profile") {
    return <IndustryProfileView slug={slug} report={report} />;
  }

  if (pageType === "workforce_insights") {
    return <WorkforceInsightsView slug={slug} report={report} />;
  }

  // ── DEFAULT FALLBACK SIDEBAR LAYOUT FOR ALL OTHER PAGES ──
  const topLevelPages = pagesList.filter((p) => !p.parentPathway);
  const subChapterMap: Record<string, PageItem[]> = {};
  pagesList
    .filter((p) => p.parentPathway)
    .forEach((p) => {
      const key = p.parentPathway!;
      if (!subChapterMap[key]) subChapterMap[key] = [];
      subChapterMap[key].push(p);
    });

  const getPageIcon = (pageType: string) => {
    switch (pageType.toLowerCase()) {
      case "about":
      case "introduction":
        return <Lightbulb className="h-4 w-4 shrink-0" />;
      case "executive_summary":
        return <FileText className="h-4 w-4 shrink-0" />;
      case "drivers_of_change":
        return <RefreshCw className="h-4 w-4 shrink-0" />;
      case "industry_overview":
        return <Search className="h-4 w-4 shrink-0" />;
      case "workforce_insights":
        return <BookOpen className="h-4 w-4 shrink-0" />;
      case "workforce_strategies":
        return <Wrench className="h-4 w-4 shrink-0" />;
      case "looking_forward":
        return <ArrowRight className="h-4 w-4 shrink-0" />;
      default:
        return <BookOpen className="h-4 w-4 shrink-0" />;
    }
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between space-y-6">
      <div className="space-y-6">
        <div className="px-2 border-b border-white/10 pb-5 pt-2 flex justify-center">
          <img
            src="http://localhost:3000/uploads/7c44c719-ad10-460e-a0f9-b971240d10fc.png"
            alt="Public Skills Australia"
            className="h-11 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <nav className="space-y-2">
          {topLevelPages.map((page) => {
            let subs = subChapterMap[page.pageType] || [];

            if (page.pageType === "about") {
              const introItem = subs.find((s) => s.pageType === "introduction");
              const methodItem = subs.find((s) => s.pageType === "methodology");

              const customSubs: any[] = [];
              if (introItem) customSubs.push(introItem);

              customSubs.push({
                id: "virtual-about-psa",
                title: "About Public Skills Australia",
                pageType: "about",
                slug: "about",
                sortOrder: 1.5,
              });

              if (methodItem) customSubs.push(methodItem);
              subs = customSubs;
            }

            const isParentActive =
              activePage?.id === page.id ||
              activePage?.parentPathway === page.pageType ||
              (page.pageType === "about" &&
                activePage?.pageType === "introduction") ||
              (page.pageType === "about" &&
                activePage?.pageType === "methodology");

            return (
              <div key={page.id} className="space-y-1">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/${page.pageType}`)
                  }
                  className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 text-xs text-left transition-all rounded-xl cursor-pointer ${
                    isParentActive
                      ? "bg-[#8AC900] text-[#161b01] font-bold shadow-none"
                      : "text-white/80 hover:bg-[#252d02] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {getPageIcon(page.pageType)}
                    <span className="leading-snug">{page.title}</span>
                  </span>
                  {subs.length > 0 &&
                    (isParentActive ? (
                      <ChevronUp className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white/40" />
                    ))}
                </button>

                {isParentActive && subs.length > 0 && (
                  <div className="mt-1 bg-[#1a2101] rounded-xl overflow-hidden divide-y divide-white/5 border border-white/5">
                    {subs.map((sub) => {
                      const isSubActive =
                        sub.id === "virtual-about-psa"
                          ? activePage?.pageType === "about"
                          : activePage?.pageType === sub.pageType;
                      return (
                        <button
                          key={sub.id}
                          onClick={() =>
                            router.push(`/reports/${slug}/${sub.pageType}`)
                          }
                          className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs text-left transition-all ${
                            isSubActive
                              ? "text-[#8AC900] bg-white/5 font-bold"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <span className="truncate leading-none">
                            {sub.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="space-y-6 pt-6 border-t border-white/10 mt-auto">
        <div className="space-y-2">
          {report.psaSectorPageUrl && (
            <a
              href={report.psaSectorPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-all font-sans uppercase"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              PSA Sector Website
            </a>
          )}
          {report.pdfFileUrl && (
            <a
              href={report.pdfFileUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-all font-sans uppercase"
            >
              <FileText className="h-3.5 w-3.5" />
              Download Full PDF
            </a>
          )}
        </div>

        {report.contactUrl && (
          <a
            href={report.contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between gap-3 bg-[#699a05] text-[#FAFAF0] hover:bg-[#8ac900] hover:text-[#161b01] transition-all p-3 rounded-xl font-bold text-xs uppercase"
          >
            <span className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full border border-white/30 flex items-center justify-center">
                <Phone className="h-3.5 w-3.5 text-[#FAFAF0]" />
              </span>
              Contact Us
            </span>
            <ChevronRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex font-sans selection:bg-[#B2DB79]/30">
      <aside className="hidden md:flex flex-col w-76 shrink-0 bg-[#161b01] text-white/95 p-5 overflow-y-auto justify-between border-r border-[#1a2101]">
        {renderSidebarContent()}
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-border py-4 px-6 sm:px-12 flex items-center justify-between sticky top-0 z-50">
          <div className="flex-1 flex justify-start">
            <button
              onClick={() => router.push(`/reports/${slug}`)}
              className="flex items-center gap-1.5 bg-[#8AC900] text-[#161b01] px-4 py-2.5 rounded-lg font-bold text-xs hover:bg-[#699a05] transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 text-[#161b01]" />
              Back
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <span className="hidden md:inline text-xs font-bold text-primary max-w-lg truncate leading-none uppercase text-center">
              {report.title}
            </span>
          </div>

          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="bg-[#8AC900] text-[#161b01] hover:bg-[#699a05] transition-colors rounded-full p-2.5 flex items-center justify-center cursor-pointer"
            >
              <MenuIcon className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-10 overflow-y-auto bg-[#FAF8F4] rounded-tl-3xl border-t border-l border-border">
          {pageLoading ? (
            <div className="flex h-96 items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="font-mono text-xs uppercase text-muted">
                  Loading Section...
                </span>
              </div>
            </div>
          ) : activePage ? (
            <div className="space-y-8">
              <div className="border-b border-border/60 pb-5">
                {activePage.parentPathway && (
                  <span className="block font-mono text-xs uppercase text-muted font-bold mb-1">
                    {activePage.parentPathway.replace("_", " ")}
                  </span>
                )}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-primary leading-tight">
                  {activePage.title}
                </h1>
              </div>

              {blocks.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-border bg-[#161b01]/5 p-6 rounded-2xl">
                  <BookOpen className="h-6 w-6 text-muted/30 mx-auto mb-2" />
                  <p className="text-xs text-muted font-mono">
                    This section currently has no content published.
                  </p>
                </div>
              ) : (
                <div className="space-y-10">
                  {blocks.map((block) => {
                    if (block.blockType === "rich_text") {
                      return (
                        <div
                          key={block.id}
                          className="prose max-w-none text-sm text-primary/95 leading-relaxed font-sans prose-p:mb-4 prose-headings:text-primary prose-headings:font-bold prose-a:text-[#598303] prose-a:underline hover:prose-a:text-primary prose-strong:text-primary"
                          dangerouslySetInnerHTML={{
                            __html: block.content.html || "",
                          }}
                        />
                      );
                    }

                    return (
                      <div
                        key={block.id}
                        className="border border-border/60 p-4 bg-[#161b01]/5 rounded-2xl text-xs font-mono text-muted"
                      >
                        * Component block [{block.blockType}] details *
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-24 bg-card rounded-2xl border border-dashed border-border">
              <BookOpen className="h-10 w-10 text-muted/30 mx-auto mb-3" />
              <p className="text-xs text-muted font-mono">
                Select a report chapter from the directory menu to begin
                reading.
              </p>
            </div>
          )}
        </main>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative w-80 max-w-full bg-[#161b01] text-white/95 p-6 overflow-y-auto flex flex-col h-full z-10">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-1.5 border border-white/20 bg-[#252d02] rounded-xl text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex-1 mt-6">{renderSidebarContent()}</div>
          </aside>
        </div>
      )}
    </div>
  );
}
