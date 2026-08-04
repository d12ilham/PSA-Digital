"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useReport, Report } from "@/context/ReportContext";
import { useAuth } from "@/context/AuthContext";
import { initializeReportPages } from "@/lib/pageInit";
import { Plus, Trash2, X, Calendar, Building, Search } from "lucide-react";

interface IndustryOption {
  id: string;
  name: string;
}

interface YearOption {
  id: string;
  label: string;
}

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
    } catch (err) {
      console.error("Failed to load industries/years options:", err);
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
      // 1. Create report row
      const report = await api.post<Report>("/reports", {
        title: newTitle,
        slug: newSlug,
        industryId: newIndustryId,
        yearId: newYearId,
        status: "draft",
      });

      // 2. Initialize default pages (seeding structural chapters)
      await initializeReportPages(report.id);

      setCreateModalOpen(false);
      setNewTitle("");
      setNewSlug("");
      setNewIndustryId("");
      setNewYearId("");

      refreshReports();
      setActiveReport(report);
      alert("Report dataset created and chapters initialized successfully.");

      // Route directly to edit page
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

      // Reset active report context if deleted
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
        "Are you sure you want to archive this report dataset? It will be removed from active public listings.",
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

  const filteredReports = reports
    .filter((r) => {
      // 1. Search term filter
      const matchesSearch =
        searchTerm.trim() === "" ||
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.slug.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Industry filter
      const matchesIndustry =
        filterIndustry === "" || r.industryId === filterIndustry;

      // 3. Year filter
      const matchesYear = filterYear === "" || r.yearId === filterYear;

      // 4. Status filter
      const matchesStatus = filterStatus === "" || r.status === filterStatus;

      return matchesSearch && matchesIndustry && matchesYear && matchesStatus;
    })
    .sort((a, b) => {
      // 5. Sort logic
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      if (sortBy === "sort-order") {
        return (a.sortOrder || 0) - (b.sortOrder || 0);
      }
      const dateA = (a as any).createdAt
        ? new Date((a as any).createdAt).getTime()
        : 0;
      const dateB = (b as any).createdAt
        ? new Date((b as any).createdAt).getTime()
        : 0;
      return dateB - dateA;
    });

  return (
    <div className="space-y-8">
      {/* ── Breadcrumb & Title ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono text-xs uppercase text-muted">
            <span>Home</span>
            <span>/</span>
            <span>Admin</span>
            <span>/</span>
            <span className="text-primary font-bold">Reports</span>
          </div>
          <h1 className="text-2xl font-bold text-primary">Reports Board</h1>
        </div>
      </div>

      {/* ── WordPress-Style Filters & Action Bar ── */}
      <div className="border border-border bg-card p-4 rounded-2xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative w-48">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-border bg-[#fdfdfc] pl-8 pr-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none placeholder:text-muted/50"
            />
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted/60" />
          </div>

          {/* Industry Filter */}
          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="border border-border bg-card py-1.5 px-2 text-xs text-primary focus:outline-none w-40"
          >
            <option value="">All Industries</option>
            {industriesList.map((ind) => (
              <option key={ind.id} value={ind.id}>
                {ind.name}
              </option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border border-border bg-card py-1.5 px-2 text-xs text-primary focus:outline-none w-28"
          >
            <option value="">All Years</option>
            {yearsList.map((y) => (
              <option key={y.id} value={y.id}>
                {y.label}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-border bg-card py-1.5 px-2 text-xs text-primary focus:outline-none w-28"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-border bg-card py-1.5 px-2 text-xs text-primary focus:outline-none w-32"
          >
            <option value="newest">Newest First</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="sort-order">Sort Order</option>
          </select>
        </div>

        {/* Create Report Button */}
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-accent px-4 py-2.5 rounded-md font-mono text-xs uppercase text-primary hover:bg-active hover:text-white transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Create Report
        </button>
      </div>

      {/* ── Reports Listing Table ── */}
      <div className="border border-border bg-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-sidebar/30 text-muted font-mono uppercase text-xs font-bold">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">URL Slug</th>
                <th className="py-3 px-4">Industry</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredReports.map((report) => (
                <tr
                  key={report.id}
                  className={`hover:bg-sidebar/10 ${activeReport?.id === report.id ? "bg-sidebar/40 border-l-2 border-primary" : ""}`}
                >
                  <td className="py-3 px-4 font-bold text-primary max-w-xs truncate">
                    {report.title}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-muted">
                    {report.slug}
                  </td>
                  <td className="py-3 px-4 text-muted max-w-xs truncate">
                    {industriesList.find((i) => i.id === report.industryId)
                      ?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 font-mono text-muted">
                    {yearsList.find((y) => y.id === report.yearId)?.label ||
                      "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <span className="wireframe-badge text-xs">
                      {report.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setActiveReport(report);
                          router.push(`/dashboard/reports/${report.id}`);
                        }}
                        className={`border px-2.5 py-1 text-xs rounded-xl font-mono uppercase transition-colors cursor-pointer ${activeReport?.id === report.id ? "bg-primary text-white border-primary" : "bg-card text-primary border-border hover:bg-sidebar"}`}
                      >
                        Configure & Edit
                      </button>

                      {isAdmin && report.status === "draft" && (
                        <button
                          onClick={() => handlePublish(report.id)}
                          className="border border-green-200 bg-green-50 text-green-700 px-2.5 py-1 text-xs rounded-xl font-mono uppercase hover:bg-green-100 transition-colors cursor-pointer"
                        >
                          Publish
                        </button>
                      )}

                      {isAdmin && report.status === "published" && (
                        <button
                          onClick={() => handleArchive(report.id)}
                          className="border border-red-200 bg-red-50 text-red-700 px-2.5 py-1 text-xs rounded-xl font-mono uppercase hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          Archive
                        </button>
                      )}

                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="p-1 text-red-500 hover:text-red-700 hover:border-red-200 border rounded-xl border-transparent cursor-pointer"
                          title="Delete Report"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReports.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center font-mono text-xs text-muted/60 italic"
                  >
                    * No matching reports found. Create a report or adjust
                    filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Creator Flow: Create Report Modal ── */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20 backdrop-blur-xs px-4">
          <div className="w-full max-w-md border border-border bg-card p-6 relative">
            <span className="absolute top-2 right-3 font-mono text-xs uppercase text-muted">
              * CMS CREATOR FLOW
            </span>

            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <h3 className="text-sm font-bold uppercase text-primary">
                Create New Report Dataset
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1 border border-border hover:bg-sidebar text-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-4">
              {error && (
                <div className="border border-red-200 bg-red-50/50 p-3 text-xs text-red-700 font-mono">
                  * ERROR: {error.toUpperCase()}
                </div>
              )}

              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase text-muted">
                  Report Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Local Government Insights 2026"
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase text-muted font-bold">
                  Auto-Generated URL Slug
                </label>
                <input
                  type="text"
                  required
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  placeholder="e.g. local-government-insights-2026"
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase text-muted flex items-center gap-1">
                  <Building className="h-3 w-3" /> Select Industry
                </label>
                <select
                  required
                  value={newIndustryId}
                  onChange={(e) => setNewIndustryId(e.target.value)}
                  className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none font-sans"
                >
                  <option value="">-- Choose Industry Segment --</option>
                  {industriesList.map((ind) => (
                    <option key={ind.id} value={ind.id}>
                      {ind.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase text-muted flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Select Year
                </label>
                <select
                  required
                  value={newYearId}
                  onChange={(e) => setNewYearId(e.target.value)}
                  className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none font-sans"
                >
                  <option value="">-- Choose Data Year --</option>
                  {yearsList.map((y) => (
                    <option key={y.id} value={y.id}>
                      {y.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="border border-border bg-card px-4 py-2 font-mono text-xs uppercase hover:bg-sidebar transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="bg-primary px-4 py-2 font-mono text-xs uppercase text-white hover:bg-active transition-colors disabled:opacity-50"
                >
                  {creating
                    ? "Initializing report & pages..."
                    : "Create Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
