"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Loader2,
  MoveRight,
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  coverImageUrl?: string;
  pdfFileUrl?: string;
  psaSectorPageUrl?: string;
  contactUrl?: string;
  cardNote?: string;
  status: string;
  industry?: {
    id: string;
    name: string;
  };
  year?: {
    id: string;
    label: string;
  };
  landingIntroDesc?: string;
  landingIntroBullets?: string;
  landingExecDesc?: string;
  landingExecBullets?: string;
}

export default function ReportLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReport();
  }, [slug]);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<Report>(`/reports/${slug}`);
      setReport(res);
    } catch (err: any) {
      console.error("Fetch landing page report failed:", err);
      setError(err.message || "Report not found or unavailable.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Loading Workforce Insights Report...
          </span>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md w-full border border-red-200 bg-red-50/50 p-6 text-center rounded">
          <span className="font-mono text-xs uppercase tracking-widest text-red-700 block mb-2 font-bold">
            * REPORT ACCESS FAILED
          </span>
          <p className="text-xs text-red-600 mb-4">
            {error || "This report is currently unavailable."}
          </p>
          <button
            onClick={() => router.push("/reports")}
            className="border border-border bg-card px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary hover:bg-sidebar transition-colors cursor-pointer"
          >
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  // Fallbacks
  const defaultIntroDesc =
    "Designed for readers who want to understand the report's context, research methodology, and supporting frameworks before engaging with the findings.";
  const defaultIntroBullets = [
    "Report context and purpose",
    "Research methodology",
    "Data sources and consultation process",
    "Report structure and navigation guide",
  ];

  const defaultExecDesc =
    "Designed for readers who want direct access to key workforce findings, insights, trends, and strategic recommendations.";
  const defaultExecBullets = [
    "Key workforce findings and trends",
    "Strategic recommendations",
    "Sector workforce insights",
    "Formatted for presentation and sharing",
  ];

  // Parse bullets
  const introBullets = report.landingIntroBullets
    ? report.landingIntroBullets.split("\n").filter((b) => b.trim())
    : defaultIntroBullets;

  const execBullets = report.landingExecBullets
    ? report.landingExecBullets.split("\n").filter((b) => b.trim())
    : defaultExecBullets;

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-[#B2DB79]/30">
      {/* ── HEADER ── */}
      <header className="bg-white border-b border-border py-4 px-6 sm:px-12 flex items-center justify-between sticky top-0 z-50">
        <button
          onClick={() => router.push("/reports")}
          className="flex items-center gap-1 bg-primary text-white text-xs tracking-wider px-4 py-2.5 rounded-lg hover:bg-active transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Reports
        </button>
        <span className="text-xs sm:text-sm font-medium text-primary text-right max-w-md truncate">
          {report.title}
        </span>
      </header>

      {/* ── MAIN HERO SECTION ── */}
      <main className="flex-1 w-full">
        <div className="px-6 py-20 bg-white">
          {/* Hero split layout */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto">
            {/* Left Text Detail */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                {report.industry && (
                  <span className="inline-block bg-primary text-white px-5 py-2 rounded-3xl text-xs font-sans uppercase mb-6">
                    {report.industry.name}
                  </span>
                )}
                <h1 className="text-2xl sm:text-4xl font-extrabold text-primary leading-tight">
                  {report.title}
                </h1>
              </div>

              <p className="text-foreground text-sm leading-relaxed">
                {report.shortDescription ||
                  "Select reading experience pathway to explore detailed datasets and workforce analysis."}
              </p>

              {/* Badges/Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {report.industry && (
                  <span className="border border-border text-primary text-xs px-3.5 py-1.5 rounded-xl">
                    {report.industry.name}
                  </span>
                )}
                {report.year && (
                  <span className="border border-border text-primary text-xs px-3.5 py-1.5 rounded-xl">
                    {report.year.label}
                  </span>
                )}
                <span className="border border-border text-primary text-xs px-3.5 py-1.5 rounded-xl">
                  Full Report
                </span>
              </div>

              {/* Action Contact Button */}

              <div className="pt-2">
                <a
                  href={report.contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-accent text-primary hover:bg-[#699A05] transition-colors font-bold text-xs px-6 py-3 rounded-lg"
                >
                  Contact Us
                  <MoveRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Right Image Display */}
            <div className="lg:col-span-5">
              <div className="relative aspect-video lg:aspect-4/3 w-full overflow-hidden rounded-2xl border border-border/80">
                <img
                  src={
                    report.coverImageUrl ||
                    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
                  }
                  alt={report.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>
        </div>

        {/* ── PATHWAYS SELECTION ── */}
        <section className="space-y-8 py-20 max-w-7xl mx-auto">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
              Select your reading experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pathway 1: Introduction */}
            <article className="bg-white border border-border p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 hover:border-primary/45 transition-colors shadow-[0_4px_24px_0_rgba(0,0,0,0.0706)]">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <h3 className="text-xs font-bold text-primary mt-1 uppercase">
                    Introduction
                  </h3>
                </div>

                <h5 className="text-2xl font-bold text-primary mt-1">
                  Introduction
                </h5>

                <p className="text-sm text-foreground leading-relaxed">
                  {report.landingIntroDesc || defaultIntroDesc}
                </p>

                {/* Bullets */}
                <ul className="space-y-2 pt-5 border-t border-border/40">
                  {introBullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span className="text-foreground font-bold text-sm leading-none">
                        •
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  onClick={() => router.push(`/reports/${slug}/pages/about`)}
                  className="bg-accent text-primary hover:bg-[#699A05] transition-colors font-bold text-xs px-5 py-3 rounded-lg text-center shrink-0 cursor-pointer"
                >
                  Explore Introduction →
                </button>
                {report.pdfFileUrl ? (
                  <a
                    href={report.pdfFileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 font-sans text-xs font-semibold tracking-wider text-muted hover:text-primary transition-colors py-2"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download PDF
                  </a>
                ) : (
                  <span className="font-sans text-xs tracking-wider text-primary/50 cursor-not-allowed py-2">
                    PDF Unavailable
                  </span>
                )}
              </div>
            </article>

            {/* Pathway 2: Executive Summary */}
            <article className="bg-white border border-border p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 hover:border-primary/45 transition-colors shadow-[0_4px_24px_0_rgba(0,0,0,0.0706)]">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>

                  <h3 className="text-xs font-bold text-primary mt-1 uppercase">
                    Executive Summary
                  </h3>
                </div>

                <h5 className="text-2xl font-bold text-primary mt-1">
                  Executive Summary
                </h5>

                <p className="text-sm text-foreground leading-relaxed">
                  {report.landingExecDesc || defaultExecDesc}
                </p>

                {/* Bullets */}
                <ul className="space-y-2 pt-5 border-t border-border/40">
                  {execBullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span className="text-foreground font-bold text-sm leading-none">
                        •
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/pages/executive_summary`)
                  }
                  className="bg-accent text-primary hover:bg-[#699A05] transition-colors font-bold text-xs px-5 py-3 rounded-lg text-center shrink-0 cursor-pointer"
                >
                  View Executive Summary →
                </button>
                {report.pdfFileUrl ? (
                  <a
                    href={report.pdfFileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 font-sans text-xs font-semibold tracking-wider text-muted hover:text-primary transition-colors py-2"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download PDF
                  </a>
                ) : (
                  <span className="font-sans text-xs tracking-wider text-primary/50 cursor-not-allowed py-2">
                    PDF Unavailable
                  </span>
                )}
              </div>
            </article>
          </div>

          <p className="text-center text-sm text-foreground pt-4">
            Both pathways provide access to the complete report. You can switch
            between them at any time.
          </p>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#252D02] text-white py-8 px-6 border-t border-border/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-1">
            <h4 className="text-sm font-bold">Public Skills Australia</h4>
            <p className="text-xs text-white font-sans">
              &copy; 2026 Public Skills Australia. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white">
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
