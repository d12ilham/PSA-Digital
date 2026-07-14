"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { BookOpen, FileText, ArrowRight, Loader2, Globe } from "lucide-react";

interface ReportSummary {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  coverImageUrl?: string;
  status: string;
  isFeatured: boolean;
  industryId: string;
  yearId: string;
  createdAt: string;
}

interface SiteSettings {
  title: string;
  description?: string;
  logoLightUrl?: string;
  logoDarkUrl?: string;
}

interface Industry {
  id: string;
  name: string;
}

interface Year {
  id: string;
  label: string;
}

export default function ReportsDirectoryPage() {
  const router = useRouter();

  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [industries, setIndustries] = useState<Record<string, string>>({});
  const [years, setYears] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDirectoryData();
  }, []);

  const fetchDirectoryData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch site settings, list of published reports, industries, and years
      const [settingsRes, reportsRes, industriesRes, yearsRes] =
        await Promise.all([
          api.get<SiteSettings>("/site-settings"),
          api.get<any>("/reports", { params: { limit: 100, page: 1 } }),
          api.get<Industry[]>("/industries"),
          api.get<Year[]>("/industries/years"),
        ]);

      setSiteSettings(settingsRes);

      const reportsList = Array.isArray(reportsRes)
        ? reportsRes
        : reportsRes?.rows || [];
      // Filter out non-published reports for public directory
      setReports(reportsList.filter((r: any) => r.status === "published"));

      // Map industries & years lists into fast lookup maps
      const indMap: Record<string, string> = {};
      industriesRes.forEach((ind) => {
        indMap[ind.id] = ind.name;
      });
      setIndustries(indMap);

      const yrMap: Record<string, string> = {};
      yearsRes.forEach((yr) => {
        yrMap[yr.id] = yr.label;
      });
      setYears(yrMap);
    } catch (err: any) {
      console.error("Fetch directory data failed:", err);
      setError("Failed to load published workforce insights reports.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-[#B2DB79]/30">
      {/* ── HEADER ── */}
      <header className="bg-card border-b border-border py-5 px-6 sm:px-12 flex items-center justify-between sticky top-0 z-50 shadow-xs">
        <div className="flex items-center gap-3">
          {siteSettings?.logoLightUrl ? (
            <img
              src={siteSettings.logoLightUrl}
              alt="Logo"
              className="h-7 w-auto object-contain"
            />
          ) : (
            <Globe className="h-5 w-5 text-primary" />
          )}
          <span className="font-extrabold text-sm sm:text-base text-primary tracking-tight">
            {siteSettings?.title || "PSA Workforce Insights Portal"}
          </span>
        </div>

        <button
          onClick={() => router.push("/login")}
          className="font-mono text-xs uppercase tracking-widest border border-primary px-3 py-1.5 rounded bg-card text-primary hover:bg-sidebar transition-colors cursor-pointer"
        >
          Editor Portal
        </button>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 py-12 space-y-12">
        {/* Intro Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block bg-[#efece6] border border-[#d8d4cc] text-[#57534c] font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase tracking-widest leading-none">
            PUBLIC DIRECTORY
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-primary tracking-tight">
            {siteSettings?.title || "Workforce Insights Reports"}
          </h1>
          <p className="text-sm text-[#598303] leading-relaxed font-medium">
            {siteSettings?.description ||
              "Access Australia's primary strategic research and analysis on public sector workforce development."}
          </p>
        </section>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Loading Directory...
              </span>
            </div>
          </div>
        ) : error ? (
          <div className="border border-red-200 bg-red-50/50 p-6 text-center max-w-md mx-auto rounded">
            <span className="font-mono text-xs uppercase tracking-widest text-red-700 block mb-1 font-bold">
              * DIRECTORY ERROR
            </span>
            <p className="text-xs text-red-600">{error}</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border bg-[#FEFDF3] rounded-2xl max-w-xl mx-auto p-6 space-y-2">
            <BookOpen className="h-8 w-8 text-muted/30 mx-auto" />
            <h3 className="font-bold text-sm text-primary">
              No published reports found
            </h3>
            <p className="text-xs text-muted/80 max-w-xs mx-auto">
              We are preparing workforce intelligence data. Please check back
              later or log in to the editor portal.
            </p>
          </div>
        ) : (
          /* Reports Grid */
          <section className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => {
              const indName = industries[report.industryId] || "Public Sector";
              const yrLabel = years[report.yearId] || "2026";

              return (
                <article
                  key={report.id}
                  onClick={() => router.push(`/reports/${report.slug}`)}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Preview Image */}
                    <div className="relative aspect-video w-full border-b border-border overflow-hidden bg-sidebar/20">
                      <img
                        src={
                          report.coverImageUrl ||
                          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
                        }
                        alt={report.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-[#252D02] text-white text-xs font-sans font-bold px-2.5 py-1 rounded-xl uppercase tracking-wider">
                        {yrLabel}
                      </span>
                    </div>

                    {/* Metadata Content */}
                    <div className="p-5 space-y-3">
                      <span className="font-sans text-xs uppercase tracking-wider text-muted font-bold block">
                        {indName}
                      </span>
                      <h3 className="font-extrabold text-sm text-primary group-hover:text-[#598303] transition-colors leading-snug">
                        {report.title}
                      </h3>
                      <p className="text-xs text-[#598303] line-clamp-3 leading-relaxed">
                        {report.shortDescription ||
                          "Click to explore this report's reading pathways, methodologies, and recommendations."}
                      </p>
                    </div>
                  </div>

                  {/* Footer Arrow bar */}
                  <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-border/30 mt-auto">
                    <span className="font-sans text-xs uppercase tracking-widest text-[#252D02] font-bold">
                      Explore report
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#252D02] text-white/90 py-12 px-6 sm:px-12 mt-20 border-t border-border/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <h4 className="text-sm font-extrabold uppercase tracking-wider">
              Public Skills Australia
            </h4>
            <p className="text-xs text-white/55 font-sans">
              &copy; 2026 Public Skills Australia. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/70 font-medium">
            <a href="#" className="hover:text-white transition-colors">
              Accessibility
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
