"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useReport, Report } from "@/context/ReportContext";
import { useAuth } from "@/context/AuthContext";
import { initializeReportPages } from "@/lib/pageInit";
import { resolveSector } from "@/config/reports/sectors";
import {
  Plus,
  Trash2,
  X,
  Calendar,
  Building,
  Search,
  Check,
  Layers,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Flame,
  Landmark,
  Scale,
} from "lucide-react";

interface IndustryOption {
  id: string;
  name: string;
  slug?: string;
}

interface YearOption {
  id: string;
  label: string;
}

interface ReportTemplateOption {
  key: string;
  name: string;
  badge: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  themeColor: string;
  headerBg: string;
  accentColor: string;
  defaultChaptersCount: number;
  slugPattern: string;
  defaultTitle: string;
}

const REPORT_TEMPLATES: ReportTemplateOption[] = [
  {
    key: "local-government",
    name: "Local Government",
    badge: "LG WIR",
    subtitle: "Councils & Regional Authorities across Australia",
    icon: Landmark,
    themeColor: "#046D2A",
    headerBg: "#252D02",
    accentColor: "#85CC00",
    defaultChaptersCount: 15,
    slugPattern: "local-government-wir",
    defaultTitle: "Local Government Workforce Insights Report",
  },
  {
    key: "public-safety",
    name: "Public Safety",
    badge: "PS WIR",
    subtitle: "Fire & Emergency Services · Police · Defence",
    icon: Flame,
    themeColor: "#38485B",
    headerBg: "#1E293B",
    accentColor: "#FF8400",
    defaultChaptersCount: 11,
    slugPattern: "public-safety-wir",
    defaultTitle: "Public Safety Workforce Insights Report",
  },
  {
    key: "federal-state",
    name: "Federal & State Government",
    badge: "FSTG WIR",
    subtitle: "Federal Agencies & State/Territory Public Services",
    icon: Scale,
    themeColor: "#694834",
    headerBg: "#382219",
    accentColor: "#E07A5F",
    defaultChaptersCount: 13,
    slugPattern: "federal-state-territory-wir",
    defaultTitle: "Federal and State/Territory Government Workforce Insights Report",
  },
  {
    key: "correctional-services",
    name: "Correctional Services",
    badge: "CS WIR",
    subtitle: "Custodial and Community Corrections across Australia",
    icon: ShieldAlert,
    themeColor: "#0B6DA8",
    headerBg: "#063B5D",
    accentColor: "#38BDF8",
    defaultChaptersCount: 10,
    slugPattern: "correctional-services-wir",
    defaultTitle: "Correctional Services Workforce Insights Report",
  },
];

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export default function ReportsManagementPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { reports, refreshReports, activeReport, setActiveReport } =
    useReport();

  // Create Report Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>("local-government");
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newIndustryId, setNewIndustryId] = useState("");
  const [newYearId, setNewYearId] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lists
  const [industriesList, setIndustriesList] = useState<IndustryOption[]>([]);
  const [yearsList, setYearsList] = useState<YearOption[]>([]);

  // Search, sort, filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const isAdmin = user?.role === "admin";

  // Load industries and years on mount
  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const [industries, years] = await Promise.all([
        api.get<IndustryOption[]>("/industries"),
        api.get<YearOption[]>("/industries/years"),
      ]);
      setIndustriesList(industries);
      setYearsList(years);

      if (years && years.length > 0 && !newYearId) {
        const sortedYears = [...years].sort((a, b) => b.label.localeCompare(a.label));
        setNewYearId(sortedYears[0].id);
      }
    } catch (err) {
      console.error("Failed to load industries/years options:", err);
    }
  };

  // Find matching industry in database for a given template key
  const matchIndustryForTemplate = (templateKey: string, industries = industriesList): IndustryOption | undefined => {
    return industries.find((ind) => {
      const s = (ind.slug || "").toLowerCase();
      const n = (ind.name || "").toLowerCase();
      if (templateKey === "federal-state") {
        return s.includes("federal") || s.includes("state") || n.includes("federal");
      }
      if (templateKey === "correctional-services") {
        return s.includes("correction") || n.includes("correction");
      }
      if (templateKey === "public-safety") {
        return s.includes("public-safety") || n.includes("public safety");
      }
      if (templateKey === "local-government") {
        return s.includes("local-government") || n.includes("local government");
      }
      return false;
    });
  };

  // Open modal and pre-populate fields according to template
  const handleOpenCreateModal = (defaultTemplate = "local-government") => {
    setSelectedTemplateKey(defaultTemplate);
    const tmpl = REPORT_TEMPLATES.find((t) => t.key === defaultTemplate) || REPORT_TEMPLATES[0];

    const matchedInd = matchIndustryForTemplate(tmpl.key);
    if (matchedInd) {
      setNewIndustryId(matchedInd.id);
    } else if (industriesList.length > 0) {
      setNewIndustryId(industriesList[0].id);
    }

    const yearLabel = yearsList.find((y) => y.id === newYearId)?.label || "2026";
    setNewTitle(`${tmpl.defaultTitle} ${yearLabel}`);
    setNewSlug(`${tmpl.slugPattern}-${yearLabel}`);
    setError(null);
    setCreateModalOpen(true);
  };

  // Switch template inside modal
  const handleSelectTemplate = (templateKey: string) => {
    setSelectedTemplateKey(templateKey);
    const tmpl = REPORT_TEMPLATES.find((t) => t.key === templateKey);
    if (!tmpl) return;

    const matchedInd = matchIndustryForTemplate(templateKey);
    if (matchedInd) {
      setNewIndustryId(matchedInd.id);
    }

    const yearLabel = yearsList.find((y) => y.id === newYearId)?.label || "2026";
    setNewTitle(`${tmpl.defaultTitle} ${yearLabel}`);
    setNewSlug(`${tmpl.slugPattern}-${yearLabel}`);
  };

  // When year changes, update defaults if title matches pattern
  const handleYearChange = (yearId: string) => {
    setNewYearId(yearId);
    const yearLabel = yearsList.find((y) => y.id === yearId)?.label || "2026";
    const tmpl = REPORT_TEMPLATES.find((t) => t.key === selectedTemplateKey);
    if (tmpl) {
      setNewTitle(`${tmpl.defaultTitle} ${yearLabel}`);
      setNewSlug(`${tmpl.slugPattern}-${yearLabel}`);
    }
  };

  // Real-time slug auto generation
  const handleTitleChange = (val: string) => {
    setNewTitle(val);
    setNewSlug(slugify(val));
  };

  // Create Report
  const handleCreateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIndustryId || !newYearId || !newTitle || !newSlug) return;
    setCreating(true);
    setError(null);
    try {
      const selectedIndustry = industriesList.find((i) => i.id === newIndustryId);

      // 1. Create report row in DB
      const report = await api.post<Report>("/reports", {
        title: newTitle,
        slug: newSlug,
        industryId: newIndustryId,
        yearId: newYearId,
        status: "draft",
      });

      // 2. Initialize sector-specific default chapters
      const sectorIdentifier =
        selectedIndustry?.slug || selectedTemplateKey || newSlug;
      await initializeReportPages(report.id, sectorIdentifier);

      setCreateModalOpen(false);
      setNewTitle("");
      setNewSlug("");
      setNewIndustryId("");

      refreshReports();
      setActiveReport(report);

      // Route directly to editor
      router.push(`/dashboard/reports/${report.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to create report.");
    } finally {
      setCreating(false);
    }
  };

  // Delete Report
  const handleDeleteReport = async (reportId: string) => {
    if (
      !confirm(
        "WARNING: Deleting this report will completely remove all its pages, content blocks, strategies, and insights. This cannot be undone. Are you sure you want to proceed?",
      )
    )
      return;
    try {
      await api.delete(`/reports/${reportId}`);

      if (activeReport?.id === reportId) {
        setActiveReport(null);
      }

      refreshReports();
      alert("Report dataset successfully deleted.");
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handlePublish = async (reportId: string) => {
    if (
      !confirm(
        "Are you sure you want to publish this report dataset? This makes it viewable in the public portal.",
      )
    )
      return;
    try {
      await api.post(`/reports/${reportId}/publish`);
      refreshReports();
    } catch (err: any) {
      alert(`Publish failed: ${err.message}`);
    }
  };

  const handleArchive = async (reportId: string) => {
    if (
      !confirm(
        "Are you sure you want to archive this report dataset? It will be removed from public listings.",
      )
    )
      return;
    try {
      await api.post(`/reports/${reportId}/archive`);
      refreshReports();
    } catch (err: any) {
      alert(`Archive failed: ${err.message}`);
    }
  };

  // Filter and sort reports
  const filteredReports = reports
    .filter((r) => {
      const matchesSearch =
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.slug.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = filterIndustry
        ? r.industryId === filterIndustry
        : true;
      const matchesYear = filterYear ? r.yearId === filterYear : true;
      const matchesStatus = filterStatus ? r.status === filterStatus : true;
      return matchesSearch && matchesIndustry && matchesYear && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "oldest")
        return (
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime()
        );
      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });

  const selectedTemplate =
    REPORT_TEMPLATES.find((t) => t.key === selectedTemplateKey) ||
    REPORT_TEMPLATES[0];

  return (
    <div className="space-y-6">
      {/* ── Top Header & Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold uppercase text-primary flex items-center gap-2">
            <Layers className="h-5 w-5 text-accent" />
            Report Datasets & Templates
          </h1>
          <p className="font-mono text-xs text-muted mt-0.5">
            Manage, publish, and create reports across all 4 sector templates
          </p>
        </div>

        <button
          onClick={() => handleOpenCreateModal()}
          className="bg-accent px-4 py-2.5 rounded-xl font-mono text-xs uppercase text-primary hover:bg-active hover:text-white transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer font-bold"
        >
          <Plus className="h-4 w-4" />
          Create New Report
        </button>
      </div>

      {/* ── 4 Quick Template Launcher Cards ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs uppercase text-muted font-bold flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Create From 4 Sector Templates:
          </span>
          <span className="font-mono text-[11px] text-muted">
            Click any template to auto-populate report structure
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {REPORT_TEMPLATES.map((tmpl) => {
            const Icon = tmpl.icon;
            return (
              <button
                key={tmpl.key}
                type="button"
                onClick={() => handleOpenCreateModal(tmpl.key)}
                className="group text-left border border-border bg-card hover:border-primary/50 hover:shadow-sm p-4 rounded-xl transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: tmpl.themeColor }}
                />
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider text-white"
                      style={{ backgroundColor: tmpl.themeColor }}
                    >
                      {tmpl.badge}
                    </span>
                    <Icon className="h-4 w-4 text-muted group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-bold text-xs text-primary group-hover:text-accent transition-colors">
                    {tmpl.name}
                  </h3>
                  <p className="text-[11px] text-muted mt-1 line-clamp-2 leading-relaxed">
                    {tmpl.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between font-mono text-[10px] text-muted">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {tmpl.defaultChaptersCount} Chapters
                  </span>
                  <span className="text-primary font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Create <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Filters & Controls ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border border-border bg-card p-3 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted" />
          <input
            type="text"
            placeholder="Search report titles or slugs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#fdfdfc] border border-border pl-8 pr-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none rounded-lg font-sans"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs focus:outline-none rounded-lg text-muted font-sans"
          >
            <option value="">All Sectors</option>
            {industriesList.map((ind) => (
              <option key={ind.id} value={ind.id}>
                {ind.name}
              </option>
            ))}
          </select>

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs focus:outline-none rounded-lg text-muted font-sans"
          >
            <option value="">All Years</option>
            {yearsList.map((y) => (
              <option key={y.id} value={y.id}>
                {y.label}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs focus:outline-none rounded-lg text-muted font-sans"
          >
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs focus:outline-none rounded-lg text-muted font-sans"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* ── Reports Listing Table ── */}
      <div className="border border-border bg-card rounded-2xl overflow-hidden shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-sidebar/30 text-muted font-mono uppercase text-xs font-bold">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Template / Sector</th>
                <th className="py-3 px-4">URL Slug</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredReports.map((report) => {
                const indObj = industriesList.find((i) => i.id === report.industryId);
                const sector = resolveSector(indObj?.slug || indObj?.name, report.slug);

                return (
                  <tr
                    key={report.id}
                    className={`hover:bg-sidebar/10 transition-colors ${
                      activeReport?.id === report.id
                        ? "bg-sidebar/40 border-l-2 border-primary"
                        : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-primary max-w-xs">
                      <div className="truncate font-semibold">{report.title}</div>
                      <div className="font-mono text-[10px] text-muted lowercase">
                        /reports/{report.slug}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider"
                        style={{
                          backgroundColor: `${sector.theme.primaryColor}15`,
                          color: sector.theme.primaryColor,
                          border: `1px solid ${sector.theme.primaryColor}40`,
                        }}
                      >
                        {sector.shortCode}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-xs text-muted truncate max-w-[160px]">
                      {report.slug}
                    </td>

                    <td className="py-3 px-4 font-mono text-muted">
                      {yearsList.find((y) => y.id === report.yearId)?.label ||
                        "N/A"}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                          report.status === "published"
                            ? "bg-green-100 text-green-800"
                            : report.status === "archived"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        <button
                          onClick={() => {
                            setActiveReport(report);
                            router.push(`/dashboard/reports/${report.id}`);
                          }}
                          className={`border px-2.5 py-1 text-xs rounded-lg font-mono uppercase transition-colors cursor-pointer ${
                            activeReport?.id === report.id
                              ? "bg-primary text-white border-primary"
                              : "bg-card text-primary border-border hover:bg-sidebar"
                          }`}
                        >
                          Configure
                        </button>

                        {isAdmin && report.status === "draft" && (
                          <button
                            onClick={() => handlePublish(report.id)}
                            className="border border-green-200 bg-green-50 text-green-700 px-2 py-1 text-xs rounded-lg font-mono uppercase hover:bg-green-100 transition-colors cursor-pointer"
                          >
                            Publish
                          </button>
                        )}

                        {isAdmin && report.status === "published" && (
                          <button
                            onClick={() => handleArchive(report.id)}
                            className="border border-red-200 bg-red-50 text-red-700 px-2 py-1 text-xs rounded-lg font-mono uppercase hover:bg-red-100 transition-colors cursor-pointer"
                          >
                            Archive
                          </button>
                        )}

                        {isAdmin && (
                          <button
                            onClick={() => handleDeleteReport(report.id)}
                            className="p-1 text-red-500 hover:text-red-700 hover:border-red-200 border rounded-lg border-transparent cursor-pointer"
                            title="Delete Report"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredReports.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center font-mono text-xs text-muted/60 italic"
                  >
                    * No matching reports found. Select a template above to create a new report dataset.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Creator Flow: Create Report Modal With 4 Templates ── */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs px-4 overflow-y-auto py-8">
          <div className="w-full max-w-2xl border border-border bg-card p-6 rounded-2xl relative shadow-xl max-h-[90vh] overflow-y-auto">
            <span className="absolute top-3 right-10 font-mono text-[10px] uppercase text-muted">
              * CMS TEMPLATE CREATOR
            </span>

            <div className="flex items-center justify-between border-b border-border pb-3 mb-5">
              <div>
                <h3 className="text-base font-bold uppercase text-primary flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Create Report Dataset
                </h3>
                <p className="text-xs text-muted font-sans mt-0.5">
                  Select 1 of the 4 report sector templates to scaffold all chapters automatically
                </p>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1.5 border border-border hover:bg-sidebar text-muted rounded-lg cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-5">
              {error && (
                <div className="border border-red-200 bg-red-50/50 p-3 text-xs text-red-700 font-mono rounded-lg">
                  * ERROR: {error.toUpperCase()}
                </div>
              )}

              {/* Step 1: Template Selection Cards */}
              <div className="space-y-2">
                <label className="block font-mono text-xs uppercase text-muted font-bold">
                  Step 1: Choose Sector Template
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {REPORT_TEMPLATES.map((tmpl) => {
                    const isSelected = selectedTemplateKey === tmpl.key;
                    const Icon = tmpl.icon;
                    return (
                      <div
                        key={tmpl.key}
                        onClick={() => handleSelectTemplate(tmpl.key)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative ${
                          isSelected
                            ? "bg-card border-primary ring-2 ring-primary/20 shadow-xs"
                            : "bg-[#fdfdfc] border-border hover:border-border/80 hover:bg-sidebar/20"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider text-white"
                            style={{ backgroundColor: tmpl.themeColor }}
                          >
                            {tmpl.badge}
                          </span>
                          {isSelected ? (
                            <span className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                              <Check className="h-3 w-3" />
                            </span>
                          ) : (
                            <Icon className="h-4 w-4 text-muted" />
                          )}
                        </div>

                        <h4 className="font-bold text-xs text-primary">
                          {tmpl.name}
                        </h4>
                        <p className="text-[11px] text-muted line-clamp-1 mt-0.5">
                          {tmpl.subtitle}
                        </p>

                        <div className="mt-2 text-[10px] font-mono text-muted flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          <span>{tmpl.defaultChaptersCount} Chapters Preset</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Year & Industry Assignment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="block font-mono text-xs uppercase text-muted flex items-center gap-1 font-bold">
                    <Calendar className="h-3.5 w-3.5" /> Data Year
                  </label>
                  <select
                    required
                    value={newYearId}
                    onChange={(e) => handleYearChange(e.target.value)}
                    className="w-full border border-border bg-[#fdfdfc] py-2 px-3 text-xs focus:outline-none rounded-lg font-sans"
                  >
                    <option value="">-- Choose Data Year --</option>
                    {yearsList.map((y) => (
                      <option key={y.id} value={y.id}>
                        {y.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-xs uppercase text-muted flex items-center gap-1 font-bold">
                    <Building className="h-3.5 w-3.5" /> Industry Segment
                  </label>
                  <select
                    required
                    value={newIndustryId}
                    onChange={(e) => setNewIndustryId(e.target.value)}
                    className="w-full border border-border bg-[#fdfdfc] py-2 px-3 text-xs focus:outline-none rounded-lg font-sans"
                  >
                    <option value="">-- Choose Industry Segment --</option>
                    {industriesList.map((ind) => (
                      <option key={ind.id} value={ind.id}>
                        {ind.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 3: Title & Slug (Auto-Filled) */}
              <div className="space-y-3 pt-1">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block font-mono text-xs uppercase text-muted font-bold">
                      Report Title
                    </label>
                    <span className="text-[10px] font-mono text-muted">
                      Auto-generated, editable
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Public Safety Workforce Insights Report 2026"
                    className="w-full border border-border bg-[#fdfdfc] px-3 py-2 text-xs text-primary focus:border-primary focus:outline-none rounded-lg font-sans font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block font-mono text-xs uppercase text-muted font-bold">
                      URL Slug
                    </label>
                    <span className="text-[10px] font-mono text-muted lowercase">
                      /reports/{newSlug || "your-slug"}
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    placeholder="e.g. public-safety-wir-2026"
                    className="w-full border border-border bg-[#fdfdfc] px-3 py-2 text-xs text-primary focus:border-primary focus:outline-none rounded-lg font-mono"
                  />
                </div>
              </div>

              {/* Scaffolding Preview Summary Card */}
              <div
                className="p-3.5 rounded-xl border flex items-center justify-between text-xs"
                style={{
                  backgroundColor: `${selectedTemplate.themeColor}08`,
                  borderColor: `${selectedTemplate.themeColor}30`,
                }}
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-primary flex items-center gap-1.5">
                    <Sparkles
                      className="h-3.5 w-3.5"
                      style={{ color: selectedTemplate.themeColor }}
                    />
                    Template Scaffolding Enabled
                  </div>
                  <p className="text-[11px] text-muted font-sans">
                    Will automatically seed {selectedTemplate.defaultChaptersCount}{" "}
                    chapters mapped to the {selectedTemplate.name} view registry.
                  </p>
                </div>
                <span
                  className="px-2 py-1 rounded text-[10px] font-mono font-bold uppercase text-white shrink-0 ml-3"
                  style={{ backgroundColor: selectedTemplate.themeColor }}
                >
                  {selectedTemplate.badge}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2.5 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="border border-border bg-card px-4 py-2 font-mono text-xs uppercase hover:bg-sidebar transition-colors rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || !newTitle || !newSlug || !newIndustryId}
                  className="bg-primary px-5 py-2 font-mono text-xs uppercase text-white hover:bg-active transition-all rounded-lg disabled:opacity-50 font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  {creating ? (
                    "Scaffolding & Creating..."
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Create & Initialize Report
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
