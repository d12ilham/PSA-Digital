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
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Lightbulb,
  RefreshCw,
  Search,
  Wrench,
  ArrowRight,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

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
      // Filter out unpublished pages in public view
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
      // Find the page in pagesList
      const page =
        pagesList.find((p) => p.pageType === pageType) || pagesList[0];
      if (!page) {
        setBlocks([]);
        setActivePage(null);
        return;
      }

      setActivePage(page);

      // Fetch blocks for this page
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
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
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
            * READER EXCEPTION
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

  // Helper: Group pages into top-level and sub-chapters
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
        {/* Logo block */}
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
            const subs = subChapterMap[page.pageType] || [];
            const isParentActive =
              activePage?.id === page.id ||
              activePage?.parentPathway === page.pageType;

            return (
              <div key={page.id} className="space-y-1">
                {/* Parent Link Button */}
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/pages/${page.pageType}`)
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

                {/* Sub chapters block */}
                {isParentActive && subs.length > 0 && (
                  <div className="mt-1 bg-[#1a2101] rounded-xl overflow-hidden divide-y divide-white/5 border border-white/5">
                    {subs.map((sub) => {
                      const isSubActive = activePage?.id === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() =>
                            router.push(
                              `/reports/${slug}/pages/${sub.pageType}`,
                            )
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
        {/* Standard navigation quicklinks */}
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
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-all font-sans uppercase"
            >
              <FileText className="h-3.5 w-3.5" />
              Download Full PDF
            </a>
          )}
        </div>

        {/* Contact Us button exactly matched to screenshot */}
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
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-[#B2DB79]/30">
      {/* ── HEADER ── */}
      <header className="bg-card border-b border-border py-4 px-6 sm:px-12 flex items-center justify-between sticky top-0 z-50 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(`/reports/${slug}`)}
            className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors text-xs font-mono"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to cover
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-1.5 border border-border bg-card rounded text-primary hover:bg-sidebar transition-colors cursor-pointer"
        >
          <MenuIcon className="h-4 w-4" />
        </button>

        <span className="hidden md:inline text-xs font-bold text-primary max-w-lg truncate leading-none uppercase">
          {report.title}
        </span>
      </header>

      <div className="flex-1 w-full max-w-7xl mx-auto flex items-stretch relative">
        {/* ── DESKTOP SIDEBAR ── */}
        <aside className="hidden md:flex flex-col w-76 shrink-0 bg-[#161b01] text-white/95 p-5 overflow-y-auto">
          {renderSidebarContent()}
        </aside>

        {/* ── MAIN CONTENT VIEW ── */}
        <section className="flex-1 min-w-0 p-6 sm:p-10 space-y-8 bg-card">
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
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Active page header */}
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

              {/* Content Blocks loop */}
              {blocks.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-border bg-sidebar/10 p-6 rounded">
                  <BookOpen className="h-6 w-6 text-muted/30 mx-auto mb-2" />
                  <p className="text-xs text-muted font-mono">
                    This section currently has no content published.
                  </p>
                </div>
              ) : (
                <div className="space-y-10">
                  {blocks.map((block) => {
                    // 1. Rich Text / HTML Block
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

                    // 2. KPI Grid Component Block
                    if (block.blockType === "kpi_grid") {
                      const kpisList = block.content.kpis || [];
                      const showTrend = block.content.showTrend || false;
                      const trendTitle =
                        block.content.trendTitle ||
                        "Projected workforce demand →";
                      const trendSubtext =
                        block.content.trendSubtext ||
                        "significant growth projected";
                      const points = block.content.trendPoints || [
                        10, 12, 11, 15, 14, 18, 20,
                      ];
                      const max = Math.max(...points, 1);
                      const min = Math.min(...points, 0);
                      const range = max - min || 1;

                      const svgPath = points
                        .map((p: number, idx: number) => {
                          const x = (idx / (points.length - 1)) * 120;
                          const y = 35 - ((p - min) / range) * 30;
                          return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                        })
                        .join(" ");

                      const dottedPath = points
                        .map((p: number, idx: number) => {
                          const x = (idx / (points.length - 1)) * 120;
                          const y = 38 - ((p - min) / range) * 15;
                          return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                        })
                        .join(" ");

                      return (
                        <div
                          key={block.id}
                          className="grid grid-cols-1 md:grid-cols-5 border border-border bg-[#FEFDF3] divide-y md:divide-y-0 md:divide-x divide-border rounded-xl shadow-xs overflow-hidden my-6"
                        >
                          {kpisList.map((kpi: any, idx: number) => (
                            <div
                              key={idx}
                              className="p-5 space-y-1 flex flex-col justify-center"
                            >
                              <div className="text-2xl font-extrabold text-primary font-sans leading-none">
                                {kpi.value}
                              </div>
                              <div className="font-mono text-xs uppercase text-[#598303] font-bold">
                                {kpi.label}
                              </div>
                              {kpi.subtext && (
                                <div className="font-mono text-xs text-muted">
                                  {kpi.subtext}
                                </div>
                              )}
                            </div>
                          ))}

                          {showTrend && (
                            <div className="p-5 md:col-span-1 space-y-2 flex flex-col justify-between min-h-24 bg-sidebar/10">
                              <span className="font-mono text-xs text-primary uppercase font-bold block leading-none">
                                {trendTitle}
                              </span>
                              <div className="h-10 flex items-center justify-center">
                                <svg
                                  className="w-full h-full overflow-visible"
                                  viewBox="0 0 120 40"
                                >
                                  <path
                                    d={svgPath}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="text-primary"
                                  />
                                  <path
                                    d={dottedPath}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeDasharray="2,2"
                                    className="text-muted/40"
                                  />
                                </svg>
                              </div>
                              <span className="font-mono text-xs text-muted block leading-none flex items-center gap-1">
                                <TrendingUp className="h-3 w-3 text-[#8AC900]" />
                                {trendSubtext}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Fallback block mapping
                    return (
                      <div
                        key={block.id}
                        className="border border-border/60 p-4 bg-sidebar/5 rounded text-xs font-mono text-muted"
                      >
                        * Component block [{block.blockType}] details *
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-24">
              <BookOpen className="h-10 w-10 text-muted/30 mx-auto mb-3" />
              <p className="text-xs text-muted font-mono">
                Select a report chapter from the directory menu to begin
                reading.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative w-80 max-w-full bg-[#161b01] text-white/95 p-6 overflow-y-auto flex flex-col h-full z-10 animate-in slide-in-from-left duration-250">
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
