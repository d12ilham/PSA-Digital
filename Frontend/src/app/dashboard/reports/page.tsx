'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useReport, Report } from '@/context/ReportContext';
import { useAuth } from '@/context/AuthContext';
import { initializeReportPages } from '@/lib/pageInit';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Save, 
  History, 
  Settings, 
  Check, 
  Info,
  Calendar,
  Building,
  RefreshCw,
  Search
} from 'lucide-react';

interface KPI {
  id: string;
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  description?: string;
  sortOrder: number;
}

interface IndustryOption {
  id: string;
  name: string;
}

interface YearOption {
  id: string;
  label: string;
}

interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  createdAt: string;
  userEmail: string;
  userName: string;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

export default function ReportsManagementPage() {
  const { user } = useAuth();
  const { reports, refreshReports, activeReport, setActiveReport } = useReport();
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  
  // Create Report Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newIndustryId, setNewIndustryId] = useState('');
  const [newYearId, setNewYearId] = useState('');
  const [creating, setCreating] = useState(false);

  // Lists
  const [industriesList, setIndustriesList] = useState<IndustryOption[]>([]);
  const [yearsList, setYearsList] = useState<YearOption[]>([]);
  const [auditLogsList, setAuditLogsList] = useState<AuditLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

  // Edit Form Fields
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [pdfFileUrl, setPdfFileUrl] = useState('');
  const [psaSectorPageUrl, setPsaSectorPageUrl] = useState('');
  const [contactUrl, setContactUrl] = useState('');
  const [cardNote, setCardNote] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);

  // Nested KPIs
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [newKpiLabel, setNewKpiLabel] = useState('');
  const [newKpiValue, setNewKpiValue] = useState('');
  const [newKpiPrefix, setNewKpiPrefix] = useState('');
  const [newKpiSuffix, setNewKpiSuffix] = useState('');
  const [kpiLoading, setKpiLoading] = useState(false);

  // State
  const [activeSubTab, setActiveSubTab] = useState<'details' | 'kpis' | 'history'>('details');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Search, sort, filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const isAdmin = user?.role === 'admin';

  // Load industries and years on mount
  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const [industries, years] = await Promise.all([
        api.get<IndustryOption[]>('/industries'),
        api.get<YearOption[]>('/industries/years'),
      ]);
      setIndustriesList(industries);
      setYearsList(years);
    } catch (err) {
      console.error('Failed to load industries/years options:', err);
    }
  };

  // Load KPIs & history when editing a report
  useEffect(() => {
    if (editingReport) {
      setTitle(editingReport.title);
      setShortDescription(editingReport.shortDescription || '');
      setCoverImageUrl(editingReport.coverImageUrl || '');
      setPdfFileUrl(editingReport.pdfFileUrl || '');
      setPsaSectorPageUrl(editingReport.psaSectorPageUrl || '');
      setContactUrl(editingReport.contactUrl || '');
      setCardNote(editingReport.cardNote || '');
      setSortOrder(editingReport.sortOrder || 0);
      setIsFeatured(editingReport.isFeatured || false);
      
      loadKpis(editingReport.id);
      loadHistory();
    }
  }, [editingReport, activeSubTab]);

  const loadKpis = async (reportId: string) => {
    try {
      const res = await api.get<KPI[]>(`/reports/${reportId}/kpis`);
      setKpis(res.sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (err) {
      console.error('Failed to load KPIs:', err);
    }
  };

  const loadHistory = async () => {
    if (!editingReport || activeSubTab !== 'history') return;
    setLogsLoading(true);
    try {
      // Query admin logs (must be admin or have access to logs)
      const res = await api.get<AuditLog[]>('/analytics/audit-logs', {
        params: { limit: 100, page: 1, entityType: 'report' }
      });
      // Filter logs matching current report
      setAuditLogsList(res.filter(log => log.entityId === editingReport.id));
    } catch (err) {
      console.error('Failed to load audit logs:', err);
      setAuditLogsList([]);
    } finally {
      setLogsLoading(false);
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
      const report = await api.post<Report>('/reports', {
        title: newTitle,
        slug: newSlug,
        industryId: newIndustryId,
        yearId: newYearId,
        status: 'draft',
      });

      // 2. Initialize default pages (seeding structural chapters)
      await initializeReportPages(report.id);

      setCreateModalOpen(false);
      setNewTitle('');
      setNewSlug('');
      setNewIndustryId('');
      setNewYearId('');

      refreshReports();
      setActiveReport(report);
      alert('Report dataset created and chapters initialized successfully.');
    } catch (err: any) {
      setError(err.message || 'Failed to create report.');
    } finally {
      setCreating(false);
    }
  };

  // Save Report
  const handleSaveReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReport) return;
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      await api.patch(`/reports/${editingReport.id}`, {
        title,
        shortDescription,
        coverImageUrl,
        pdfFileUrl,
        psaSectorPageUrl,
        contactUrl,
        cardNote,
        sortOrder: Number(sortOrder),
        isFeatured,
      });

      setMessage('Report settings updated successfully.');
      refreshReports();
      
      // Update local storage active report reference if modified
      if (activeReport?.id === editingReport.id) {
        setActiveReport({
          ...editingReport,
          title,
          shortDescription,
          coverImageUrl,
          pdfFileUrl,
          psaSectorPageUrl,
          contactUrl,
          cardNote,
          sortOrder: Number(sortOrder),
          isFeatured,
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update report.');
    } finally {
      setSaving(false);
    }
  };

  // Delete Report
  const handleDeleteReport = async (reportId: string) => {
    if (!confirm('WARNING: Deleting this report will completely remove all its pages, content blocks, strategies, and insights. This cannot be undone. Are you sure you want to proceed?')) return;
    try {
      await api.delete(`/reports/${reportId}`);
      
      // Reset active report context if deleted
      if (activeReport?.id === reportId) {
        setActiveReport(null);
      }
      
      if (editingReport?.id === reportId) {
        setEditingReport(null);
      }
      
      refreshReports();
      alert('Report dataset successfully deleted.');
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handlePublish = async (reportId: string) => {
    if (!confirm('Are you sure you want to publish this report dataset? This makes it viewable in the public portal.')) return;
    try {
      await api.post(`/reports/${reportId}/publish`);
      refreshReports();
      if (editingReport?.id === reportId) {
        setEditingReport({ ...editingReport, status: 'published' });
      }
    } catch (err: any) {
      alert(`Publish failed: ${err.message}`);
    }
  };

  const handleArchive = async (reportId: string) => {
    if (!confirm('Are you sure you want to archive this report dataset? It will be removed from active public listings.')) return;
    try {
      await api.post(`/reports/${reportId}/archive`);
      refreshReports();
      if (editingReport?.id === reportId) {
        setEditingReport({ ...editingReport, status: 'archived' });
      }
    } catch (err: any) {
      alert(`Archive failed: ${err.message}`);
    }
  };

  // KPI management
  const handleAddKpi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReport || !newKpiLabel || !newKpiValue) return;
    setKpiLoading(true);
    try {
      const newKpi = await api.post<KPI>(`/reports/${editingReport.id}/kpis`, {
        label: newKpiLabel,
        value: newKpiValue,
        prefix: newKpiPrefix || null,
        suffix: newKpiSuffix || null,
        sortOrder: kpis.length + 1,
      });
      setKpis([...kpis, newKpi]);
      setNewKpiLabel('');
      setNewKpiValue('');
      setNewKpiPrefix('');
      setNewKpiSuffix('');
    } catch (err: any) {
      alert(`Failed to add KPI card: ${err.message}`);
    } finally {
      setKpiLoading(false);
    }
  };

  const handleDeleteKpi = async (kpiId: string) => {
    if (!editingReport) return;
    if (!confirm('Delete this KPI card?')) return;
    try {
      await api.delete(`/reports/${editingReport.id}/kpis/${kpiId}`);
      setKpis(kpis.filter(k => k.id !== kpiId));
    } catch (err: any) {
      alert(`Failed to delete KPI card: ${err.message}`);
    }
  };

  // Self-healing page check
  const handleInitializeEmptyPages = async (reportId: string) => {
    if (!confirm('Do you want to initialize default structural pages/chapters for this dataset?')) return;
    try {
      setSaving(true);
      await initializeReportPages(reportId);
      refreshReports();
      alert('Default report structure has been successfully initialized.');
    } catch (err: any) {
      alert(`Failed to initialize pages: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const filteredReports = reports.filter(r => {
    // 1. Search term filter
    const matchesSearch = searchTerm.trim() === '' || 
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.slug.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Industry filter
    const matchesIndustry = filterIndustry === '' || r.industryId === filterIndustry;

    // 3. Year filter
    const matchesYear = filterYear === '' || r.yearId === filterYear;

    // 4. Status filter
    const matchesStatus = filterStatus === '' || r.status === filterStatus;

    return matchesSearch && matchesIndustry && matchesYear && matchesStatus;
  }).sort((a, b) => {
    // 5. Sort logic
    if (sortBy === 'title-asc') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'title-desc') {
      return b.title.localeCompare(a.title);
    }
    if (sortBy === 'sort-order') {
      return (a.sortOrder || 0) - (b.sortOrder || 0);
    }
    const dateA = (a as any).createdAt ? new Date((a as any).createdAt).getTime() : 0;
    const dateB = (b as any).createdAt ? new Date((b as any).createdAt).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="space-y-8">
      {/* ── Breadcrumb & Title ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted">
            <span>Home</span>
            <span>/</span>
            <span>Admin</span>
            <span>/</span>
            <span className="text-primary font-bold">Reports</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Reports Board
          </h1>
        </div>
      </div>

      {/* ── WordPress-Style Filters & Action Bar ── */}
      <div className="border border-border bg-card p-4 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
            {industriesList.map(ind => (
              <option key={ind.id} value={ind.id}>{ind.name}</option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border border-border bg-card py-1.5 px-2 text-xs text-primary focus:outline-none w-28"
          >
            <option value="">All Years</option>
            {yearsList.map(y => (
              <option key={y.id} value={y.id}>{y.label}</option>
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
          className="border border-primary bg-primary px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Create Report
        </button>
      </div>

      {/* ── Reports Listing Table ── */}
      <div className="border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-sidebar/30 text-muted font-mono uppercase text-[9px] tracking-wider font-bold">
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
                  className={`hover:bg-sidebar/10 ${activeReport?.id === report.id ? 'bg-sidebar/40 border-l-2 border-primary' : ''}`}
                >
                  <td className="py-3 px-4 font-bold text-primary max-w-xs truncate">
                    {report.title}
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px] text-muted">
                    {report.slug}
                  </td>
                  <td className="py-3 px-4 text-muted max-w-xs truncate">
                    {industriesList.find(i => i.id === report.industryId)?.name || 'N/A'}
                  </td>
                  <td className="py-3 px-4 font-mono text-muted">
                    {yearsList.find(y => y.id === report.yearId)?.label || 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    <span className="wireframe-badge text-[8px]">
                      {report.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingReport(report);
                          setActiveReport(report);
                          setActiveSubTab('details');
                        }}
                        className={`border px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${activeReport?.id === report.id ? 'bg-primary text-white border-primary' : 'bg-card text-primary border-border hover:bg-sidebar'}`}
                      >
                        Configure & Edit
                      </button>

                      {isAdmin && report.status === 'draft' && (
                        <button
                          onClick={() => handlePublish(report.id)}
                          className="border border-green-200 bg-green-50 text-green-700 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider hover:bg-green-100 transition-colors cursor-pointer"
                        >
                          Publish
                        </button>
                      )}

                      {isAdmin && report.status === 'published' && (
                        <button
                          onClick={() => handleArchive(report.id)}
                          className="border border-red-200 bg-red-50 text-red-700 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          Archive
                        </button>
                      )}

                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="p-1 text-red-500 hover:text-red-700 hover:border-red-200 border border-transparent cursor-pointer"
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
                  <td colSpan={6} className="py-8 text-center font-mono text-xs text-muted/60 italic">
                    * No matching reports found. Create a report or adjust filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Active Report Config Console (Details, KPIs, History) ── */}
      {editingReport && (
        <div className="space-y-6 border-t border-border pt-8">
          
          {/* Tabs for Editing Report details/KPIs/history */}
          <div className="flex border-b border-border bg-card">
            <button
              onClick={() => setActiveSubTab('details')}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-wider font-semibold border-b-2 cursor-pointer ${
                activeSubTab === 'details' ? 'border-primary text-primary font-bold' : 'border-transparent text-muted'
              }`}
            >
              General Settings
            </button>
            <button
              onClick={() => setActiveSubTab('kpis')}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-wider font-semibold border-b-2 cursor-pointer ${
                activeSubTab === 'kpis' ? 'border-primary text-primary font-bold' : 'border-transparent text-muted'
              }`}
            >
              KPI Badges
            </button>
            <button
              onClick={() => setActiveSubTab('history')}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-wider font-semibold border-b-2 cursor-pointer ${
                activeSubTab === 'history' ? 'border-primary text-primary font-bold' : 'border-transparent text-muted'
              }`}
            >
              Edit History
            </button>
          </div>

          {/* Tab 1: General Details */}
          {activeSubTab === 'details' && (
            <div className="border border-border bg-card p-6 shadow-sm relative">
              <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
                * REPORT PROPERTIES
              </span>

              <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
                Report Settings: {editingReport.title}
              </h2>

              <form onSubmit={handleSaveReport} className="space-y-4">
                {message && (
                  <div className="border border-green-200 bg-green-50/50 p-3 text-xs text-green-700 font-mono">
                    * SUCCESS: {message.toUpperCase()}
                  </div>
                )}

                {error && (
                  <div className="border border-red-200 bg-red-50/50 p-3 text-xs text-red-700 font-mono">
                    * ERROR: {error.toUpperCase()}
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      Report Title
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      Cover Image URL
                    </label>
                    <input
                      type="text"
                      value={coverImageUrl}
                      onChange={(e) => setCoverImageUrl(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none placeholder:text-muted/40"
                      placeholder="https://example.com/cover.jpg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      PDF Download URL
                    </label>
                    <input
                      type="text"
                      value={pdfFileUrl}
                      onChange={(e) => setPdfFileUrl(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none placeholder:text-muted/40"
                      placeholder="https://example.com/document.pdf"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      PSA Website link (Back Link)
                    </label>
                    <input
                      type="text"
                      value={psaSectorPageUrl}
                      onChange={(e) => setPsaSectorPageUrl(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none placeholder:text-muted/40"
                      placeholder="https://psa.gov.au/local-gov"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      Contact inquiry link
                    </label>
                    <input
                      type="text"
                      value={contactUrl}
                      onChange={(e) => setContactUrl(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none placeholder:text-muted/40"
                      placeholder="https://psa.gov.au/contact"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      Sort Order Position
                    </label>
                    <input
                      type="number"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(Number(e.target.value))}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center h-full pt-4">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-0 cursor-pointer"
                      />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-primary">
                        Feature Report Card
                      </span>
                    </label>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      Short Description
                    </label>
                    <textarea
                      rows={3}
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      Home Card Notes
                    </label>
                    <textarea
                      rows={2}
                      value={cardNote}
                      onChange={(e) => setCardNote(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                      placeholder="e.g. Includes Police, Correctional Services..."
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => handleInitializeEmptyPages(editingReport.id)}
                    className="border border-border hover:bg-sidebar text-muted font-mono text-[9px] uppercase tracking-wider px-3 py-2 flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Init Chapters
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="border border-primary bg-primary px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {saving ? 'Saving changes...' : 'Save Settings'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab 2: KPIs */}
          {activeSubTab === 'kpis' && (
            <div className="border border-border bg-card p-6 shadow-sm relative">
              <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
                * KPI METRICS EDIT
              </span>

              <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-6">
                KPI Summary Badges
              </h2>

              <div className="space-y-3 mb-6">
                {kpis.length === 0 ? (
                  <div className="text-xs text-muted/60 font-mono py-2 italic border border-dashed border-border p-4 bg-sidebar/20 text-center">
                    * No KPI badges defined. Create a badge card below.
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {kpis.map((kpi) => (
                      <div key={kpi.id} className="border border-border p-3 flex flex-col justify-between bg-sidebar/20">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-mono text-[8px] uppercase text-muted tracking-wider">
                              {kpi.label}
                            </span>
                            <button 
                              onClick={() => handleDeleteKpi(kpi.id)}
                              className="text-red-500 hover:text-red-700 p-0.5 border border-transparent hover:border-red-200 bg-card cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-xl font-bold tracking-tight text-primary">
                            {kpi.prefix}{kpi.value}{kpi.suffix}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <form onSubmit={handleAddKpi} className="border-t border-border/60 pt-4 space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted block">
                  Create KPI Badge Card
                </span>
                
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Label Descriptor</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Employees"
                      value={newKpiLabel}
                      onChange={(e) => setNewKpiLabel(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Statistic Value</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 48,800"
                      value={newKpiValue}
                      onChange={(e) => setNewKpiValue(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Prefix</label>
                    <input
                      type="text"
                      placeholder="e.g. $"
                      value={newKpiPrefix}
                      onChange={(e) => setNewKpiPrefix(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Suffix</label>
                    <input
                      type="text"
                      placeholder="e.g. %"
                      value={newKpiSuffix}
                      onChange={(e) => setNewKpiSuffix(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={kpiLoading}
                    className="border border-primary bg-primary px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Create Badge
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab 3: History */}
          {activeSubTab === 'history' && (
            <div className="border border-border bg-card p-6 shadow-sm relative">
              <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
                * AUDIT LOG HISTORY
              </span>

              <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-6">
                Report Revision History
              </h2>

              {logsLoading ? (
                <div className="flex h-32 items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border border-primary border-t-transparent" />
                    <span className="font-mono text-[8px] uppercase tracking-widest text-muted">Querying log indices...</span>
                  </div>
                </div>
              ) : auditLogsList.length === 0 ? (
                <div className="text-center py-12 font-mono text-xs uppercase text-muted italic border border-dashed border-border p-4 bg-sidebar/20">
                  * No revision history found for this report.
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {auditLogsList.map((log) => (
                    <div key={log.id} className="border border-border p-3 bg-sidebar/30 relative">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                          ACTION: {log.action}
                        </span>
                        <span className="font-mono text-[8px] text-muted">
                          {new Date(log.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-[10px] text-muted leading-relaxed">
                        Modified by: <span className="font-bold text-primary">{log.userName}</span> (<span className="font-mono">{log.userEmail}</span>)
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* ── Creator Flow: Create Report Modal ── */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20 backdrop-blur-xs px-4">
          <div className="w-full max-w-md border border-border bg-card shadow-lg p-6 relative">
            <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
              * CMS CREATOR FLOW
            </span>

            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
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
              <div className="space-y-1">
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Report Title</label>
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
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Auto-Generated URL Slug</label>
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
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted flex items-center gap-1">
                  <Building className="h-3 w-3" /> Select Industry
                </label>
                <select
                  required
                  value={newIndustryId}
                  onChange={(e) => setNewIndustryId(e.target.value)}
                  className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                >
                  <option value="">-- Choose Industry Segment --</option>
                  {industriesList.map(ind => (
                    <option key={ind.id} value={ind.id}>{ind.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Select Year
                </label>
                <select
                  required
                  value={newYearId}
                  onChange={(e) => setNewYearId(e.target.value)}
                  className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                >
                  <option value="">-- Choose Data Year --</option>
                  {yearsList.map(y => (
                    <option key={y.id} value={y.id}>{y.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="border border-border bg-card px-4 py-2 font-mono text-[9px] uppercase tracking-widest hover:bg-sidebar transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="border border-primary bg-primary px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors disabled:opacity-50"
                >
                  {creating ? 'Initializing report & pages...' : 'Create Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
