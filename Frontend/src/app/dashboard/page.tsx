"use client";

import React, { useEffect, useState } from "react";
import { useReport } from "@/context/ReportContext";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { initializeReportPages } from "@/lib/pageInit";
import {
  FileText,
  Sliders,
  Activity,
  Settings,
  ChevronRight,
  BookOpen,
  Plus,
  Info,
} from "lucide-react";

interface SummaryStats {
  pagesCount: number;
  strategiesCount: number;
  insightsCount: number;
  driversCount: number;
}

export default function DashboardPage() {
  const { activeReport, loading: reportsLoading, refreshReports } = useReport();
  const router = useRouter();

  const [stats, setStats] = useState<SummaryStats>({
    pagesCount: 0,
    strategiesCount: 0,
    insightsCount: 0,
    driversCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [pagesList, setPagesList] = useState<any[]>([]);

  useEffect(() => {
    if (activeReport) {
      setLoading(true);

      const loadStats = async () => {
        try {
          const [pages, strategies, insights] = await Promise.all([
            api.get<any[]>(`/reports/${activeReport.id}/pages`),
            api.get<any[]>(`/reports/${activeReport.id}/strategies`),
            api.get<any>(`/reports/${activeReport.id}/insights`),
          ]);

          const insightsRows = Array.isArray(insights)
            ? insights
            : insights?.rows || [];

          setPagesList(pages);
          setStats({
            pagesCount: pages.length || 0,
            strategiesCount: strategies.length || 0,
            insightsCount: insightsRows.length || 0,
            driversCount: 0, // In backend, drivers are sub-routes of insights or fetched separately, but this is fine
          });
        } catch (err) {
          console.error("Failed to load summary stats:", err);
        } finally {
          setLoading(false);
        }
      };

      loadStats();
    }
  }, [activeReport]);

  if (!activeReport) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center border border-dashed border-border bg-sidebar/30 p-8 text-center">
        <BookOpen className="mb-4 h-8 w-8 text-muted" />
        <span className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
          No Report Selected
        </span>
        <p className="max-w-xs text-xs text-muted/80 leading-relaxed">
          Please select a report context from the header switcher dropdown to
          begin managing dashboard content.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Breadcrumb & Title ── */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
            <span>Home</span>
            <span>/</span>
            <span className="text-primary font-bold">Overview</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Dataset Summary
          </h1>
        </div>

        {/* Swap info / actions */}
        <div className="font-mono text-xs uppercase tracking-wider text-muted text-left md:text-right">
          Last updated:{" "}
          {new Date(
            activeReport.status === "published"
              ? activeReport.pdfFileUrl
                ? Date.now()
                : Date.now()
              : Date.now(),
          ).toLocaleDateString()}
        </div>
      </div>

      {/* ── Active Report Description Card ── */}
      <div className="border border-border rounded-2xl bg-card p-6 relative">
        <span className="absolute top-2 right-3 font-mono text-xs uppercase tracking-widest text-muted">
          * METADATA BLOCK
        </span>
        <h2 className="text-lg font-bold text-primary mb-2">
          {activeReport.title}
        </h2>
        <p className="text-xs text-muted leading-relaxed max-w-2xl mb-4">
          {activeReport.shortDescription ||
            "No description available for this report. You can configure descriptions, cover images, and external resource URLs in the Reports Management console."}
        </p>

        {activeReport.cardNote && (
          <div className="border border-border bg-sidebar/40 p-3 text-xs text-muted font-mono max-w-xl">
            * NOTE: {activeReport.cardNote}
          </div>
        )}
      </div>

      {stats.pagesCount === 0 && (
        <div className="border border-amber-200 bg-amber-50/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Dataset outline not initialized
              </h3>
              <p className="text-xs text-muted leading-relaxed max-w-lg mt-0.5">
                This report dataset currently has no content chapters
                configured. Click initialize to auto-generate the default 9
                standard chapters (About, Executive Summary, Strategies, etc.).
              </p>
            </div>
          </div>
          <button
            onClick={async () => {
              setLoading(true);
              try {
                await initializeReportPages(activeReport.id);
                await refreshReports();
                const pages = await api.get<any[]>(
                  `/reports/${activeReport.id}/pages`,
                );
                setStats((prev) => ({ ...prev, pagesCount: pages.length }));
                alert("Chapters initialized successfully.");
              } catch (err: any) {
                alert(`Failed to initialize pages: ${err.message}`);
              } finally {
                setLoading(false);
              }
            }}
            className="border border-amber-300 bg-amber-600 text-white font-mono text-xs uppercase tracking-widest px-4 py-2 hover:bg-amber-700 transition-colors shrink-0"
          >
            Initialize Chapters
          </button>
        </div>
      )}

      {/* ── KPI Blocks Grid ── */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1: Pages */}
        <div className="border border-border bg-card p-6 relative">
          <span className="absolute top-2 right-3 font-mono text-xs uppercase tracking-widest text-muted">
            * KPI BLOCK
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-muted block mb-1">
            Total Content Pages
          </span>
          {loading ? (
            <div className="h-9 w-12 animate-pulse bg-border/40 mt-1" />
          ) : (
            <span className="text-3xl font-bold tracking-tight text-primary">
              {stats.pagesCount}
            </span>
          )}
          <span className="block font-mono text-xs text-muted mt-2">
            Chapters 01 - 04, 07
          </span>
        </div>

        {/* KPI 2: Strategies */}
        <div className="border border-border bg-card p-6 relative">
          <span className="absolute top-2 right-3 font-mono text-xs uppercase tracking-widest text-muted">
            * KPI BLOCK
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-muted block mb-1">
            Active Strategies
          </span>
          {loading ? (
            <div className="h-9 w-12 animate-pulse bg-border/40 mt-1" />
          ) : (
            <span className="text-3xl font-bold tracking-tight text-primary">
              {stats.strategiesCount}
            </span>
          )}
          <span className="block font-mono text-xs text-muted mt-2">
            Chapter 06 CRUD Active
          </span>
        </div>

        {/* KPI 3: Insights */}
        <div className="border border-border bg-card p-6 relative">
          <span className="absolute top-2 right-3 font-mono text-xs uppercase tracking-widest text-muted">
            * KPI BLOCK
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-muted block mb-1">
            Workforce Insights
          </span>
          {loading ? (
            <div className="h-9 w-12 animate-pulse bg-border/40 mt-1" />
          ) : (
            <span className="text-3xl font-bold tracking-tight text-primary">
              {stats.insightsCount}
            </span>
          )}
          <span className="block font-mono text-xs text-muted mt-2">
            Chapter 05 CRUD Active
          </span>
        </div>

        {/* KPI 4: Dataset Status */}
        <div className="border border-border bg-card p-6 relative">
          <span className="absolute top-2 right-3 font-mono text-xs uppercase tracking-widest text-muted">
            * KPI BLOCK
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-muted block mb-1">
            Publication Status
          </span>
          <div className="mt-1">
            <span className="text-xl font-bold tracking-tight text-primary uppercase block">
              {activeReport.status}
            </span>
            <span className="wireframe-badge mt-1.5 inline-block text-xs">
              {activeReport.status === "published"
                ? "LIVE PUBLIC VIEW"
                : "INTERNAL DRAFT"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Quick Controls Grid ── */}
      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted mb-4 block">
          Admin Shortcuts
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Edit Pages */}
          <div
            onClick={() => {
              if (stats.pagesCount > 0) {
                // Redirect to first page in the list
                api
                  .get<any[]>(`/reports/${activeReport.id}/pages`)
                  .then((res) => {
                    if (res.length > 0)
                      router.push(`/dashboard/pages/${res[0].id}`);
                  });
              }
            }}
            className="border border-border bg-card p-5 cursor-pointer hover:border-primary transition-all flex flex-col justify-between group h-36"
          >
            <div>
              <FileText className="h-5 w-5 text-muted group-hover:text-primary mb-3" />
              <h4 className="text-xs font-bold text-primary uppercase tracking-wide">
                Edit Content Pages
              </h4>
              <p className="text-xs text-muted mt-1">
                Modify headings, paragraphs, tables, and KPI cards for report
                chapters.
              </p>
            </div>
            <div className="flex items-center text-xs font-mono text-muted uppercase group-hover:text-primary mt-2">
              Open editor <ChevronRight className="h-3 w-3 ml-0.5" />
            </div>
          </div>

          {/* Manage Strategies */}
          <div
            onClick={() => {
              const page = pagesList.find((p) => p.pageType === "strategies");
              if (page) router.push(`/dashboard/pages/${page.id}`);
            }}
            className="border border-border bg-card p-5 cursor-pointer hover:border-primary transition-all flex flex-col justify-between group h-36"
          >
            <div>
              <Sliders className="h-5 w-5 text-muted group-hover:text-primary mb-3" />
              <h4 className="text-xs font-bold text-primary uppercase tracking-wide">
                Manage Strategies
              </h4>
              <p className="text-xs text-muted mt-1">
                Edit proposed strategies and roadmap details using visual layout
                blocks.
              </p>
            </div>
            <div className="flex items-center text-xs font-mono text-muted uppercase group-hover:text-primary mt-2">
              Open page builder <ChevronRight className="h-3 w-3 ml-0.5" />
            </div>
          </div>

          {/* Manage Insights */}
          <div
            onClick={() => {
              const page = pagesList.find(
                (p) => p.pageType === "workforce_insights",
              );
              if (page) router.push(`/dashboard/pages/${page.id}`);
            }}
            className="border border-border bg-card p-5 cursor-pointer hover:border-primary transition-all flex flex-col justify-between group h-36"
          >
            <div>
              <Activity className="h-5 w-5 text-muted group-hover:text-primary mb-3" />
              <h4 className="text-xs font-bold text-primary uppercase tracking-wide">
                Manage Insights
              </h4>
              <p className="text-xs text-muted mt-1">
                Add headings, statistics, and detail blocks to Chapter 05
                Workforce Insights.
              </p>
            </div>
            <div className="flex items-center text-xs font-mono text-muted uppercase group-hover:text-primary mt-2">
              Open page builder <ChevronRight className="h-3 w-3 ml-0.5" />
            </div>
          </div>

          {/* Configure Report Metadata */}
          <div
            onClick={() => router.push("/dashboard/reports")}
            className="border border-border bg-card p-5 cursor-pointer hover:border-primary transition-all flex flex-col justify-between group h-36"
          >
            <div>
              <Settings className="h-5 w-5 text-muted group-hover:text-primary mb-3" />
              <h4 className="text-xs font-bold text-primary uppercase tracking-wide">
                Report Settings
              </h4>
              <p className="text-xs text-muted mt-1">
                Update PDF download link URLs, feature flags, cover designs, and
                list active sets.
              </p>
            </div>
            <div className="flex items-center text-xs font-mono text-muted uppercase group-hover:text-primary mt-2">
              Open settings <ChevronRight className="h-3 w-3 ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
