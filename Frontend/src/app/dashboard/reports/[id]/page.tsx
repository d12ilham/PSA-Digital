'use client';

import React, { useEffect, useState, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useReport, Report } from '@/context/ReportContext';
import { useAuth } from '@/context/AuthContext';
import { initializeReportPages } from '@/lib/pageInit';
import { useToast } from '@/context/ToastContext';
import MediaLibraryModal from '@/components/media/MediaLibraryModal';
import { 
  Trash2, 
  Plus, 
  ArrowLeft,
  RefreshCw,
  BookOpen,
  Settings,
  ChevronRight,
  Eye,
  CheckCircle,
  Clock,
  Upload,
  Link as LinkIcon,
  X,
  HelpCircle,
  ImageIcon,
  FileText,
  PencilLine,
  ExternalLink,
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

interface PageItem {
  id: string;
  title: string;
  pageType: string;
  slug: string;
  sortOrder: number;
  isPublished?: boolean;
  parentPathway?: string | null;
}

export default function ReportEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: reportId } = use(params);
  const { user } = useAuth();
  const { refreshReports, activeReport, setActiveReport } = useReport();
  const router = useRouter();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<Report | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);

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
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');

  // Nested KPIs
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [newKpiLabel, setNewKpiLabel] = useState('');
  const [newKpiValue, setNewKpiValue] = useState('');
  const [newKpiPrefix, setNewKpiPrefix] = useState('');
  const [newKpiSuffix, setNewKpiSuffix] = useState('');
  const [kpiLoading, setKpiLoading] = useState(false);

  // File upload state
  const [coverImageMode, setCoverImageMode] = useState<'url' | 'upload' | 'library'>('library');
  const [pdfMode, setPdfMode] = useState<'url' | 'upload' | 'library'>('library');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [coverImageLibraryOpen, setCoverImageLibraryOpen] = useState(false);
  const [pdfLibraryOpen, setPdfLibraryOpen] = useState(false);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // State
  const [activeSubTab, setActiveSubTab] = useState<'details' | 'kpis' | 'history'>('details');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showInitTooltip, setShowInitTooltip] = useState(false);

  const isAdmin = user?.role === 'admin';

  // Load report and dropdown options on mount
  useEffect(() => {
    loadPageData();
  }, [reportId]);

  // Load KPIs or logs on tab switcher changes
  useEffect(() => {
    if (report) {
      if (activeSubTab === 'kpis') {
        loadKpis(report.id);
      } else if (activeSubTab === 'history') {
        loadHistory();
      }
    }
  }, [activeSubTab, report]);

  const loadPageData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch dropdowns, report, and pages manifest
      const [industries, years, reportData, pagesData] = await Promise.all([
        api.get<IndustryOption[]>('/industries'),
        api.get<YearOption[]>('/industries/years'),
        api.get<Report>(`/reports/${reportId}`),
        api.get<PageItem[]>(`/reports/${reportId}/pages`)
      ]);

      setIndustriesList(industries);
      setYearsList(years);
      setReport(reportData);
      setPages(pagesData.sort((a, b) => a.sortOrder - b.sortOrder));

      // Populate form fields
      setTitle(reportData.title);
      setShortDescription(reportData.shortDescription || '');
      setCoverImageUrl(reportData.coverImageUrl || '');
      setPdfFileUrl(reportData.pdfFileUrl || '');
      setPsaSectorPageUrl(reportData.psaSectorPageUrl || '');
      setContactUrl(reportData.contactUrl || '');
      setSortOrder(reportData.sortOrder || 0);
      setIsFeatured(reportData.isFeatured || false);
      setCardNote(reportData.cardNote || '');
      setStatus(reportData.status);

      // Set active workspace report context
      setActiveReport(reportData);
      
      // Seed initial KPIs
      await loadKpis(reportData.id);
    } catch (err: any) {
      console.error('Failed to load report edit data:', err);
      setError(err.message || 'Failed to load report settings.');
    } finally {
      setLoading(false);
    }
  };

  const loadKpis = async (id: string) => {
    try {
      const res = await api.get<KPI[]>(`/reports/${id}/kpis`);
      setKpis(res.sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (err) {
      console.error('Failed to load KPIs:', err);
    }
  };

  const loadHistory = async () => {
    if (!report) return;
    setLogsLoading(true);
    try {
      const res = await api.get<AuditLog[]>('/analytics/audit-logs', {
        params: { limit: 100, page: 1, entityType: 'report' }
      });
      setAuditLogsList(res.filter(log => log.entityId === report.id));
    } catch (err) {
      console.error('Failed to load audit logs:', err);
      setAuditLogsList([]);
    } finally {
      setLogsLoading(false);
    }
  };

  // File upload handlers
  const handleCoverImageUpload = async (file: File) => {
    setUploadingCover(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const result = await api.upload<{ url: string }>('/media/upload', formData);
      setCoverImageUrl(`http://localhost:3000${result.url}`);
    } catch (err: any) {
      alert(`Failed to upload image: ${err.message}`);
    } finally {
      setUploadingCover(false);
    }
  };

  const handlePdfUpload = async (file: File) => {
    setUploadingPdf(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const result = await api.upload<{ url: string }>('/media/upload', formData);
      setPdfFileUrl(`http://localhost:3000${result.url}`);
    } catch (err: any) {
      alert(`Failed to upload PDF: ${err.message}`);
    } finally {
      setUploadingPdf(false);
    }
  };

  // Save Report
  const handleSaveReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!report) return;
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const updated = await api.patch<Report>(`/reports/${report.id}`, {
        title,
        shortDescription,
        coverImageUrl,
        pdfFileUrl,
        psaSectorPageUrl,
        contactUrl,
        cardNote,
        sortOrder: Number(sortOrder),
        isFeatured,
        status,
      });

      setMessage('Report settings updated successfully.');
      setReport(updated);
      refreshReports();
      
      // Update global context reference
      setActiveReport(updated);
    } catch (err: any) {
      setError(err.message || 'Failed to update report.');
    } finally {
      setSaving(false);
    }
  };

  // KPI management
  const handleAddKpi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!report || !newKpiLabel || !newKpiValue) return;
    setKpiLoading(true);
    try {
      const newKpi = await api.post<KPI>(`/reports/${report.id}/kpis`, {
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
    if (!report) return;
    if (!confirm('Delete this KPI card?')) return;
    try {
      await api.delete(`/reports/${report.id}/kpis/${kpiId}`);
      setKpis(kpis.filter(k => k.id !== kpiId));
    } catch (err: any) {
      alert(`Failed to delete KPI card: ${err.message}`);
    }
  };

  // Self-healing page check
  const handleInitializeEmptyPages = async () => {
    if (!report) return;
    if (!confirm('Do you want to initialize default structural pages/chapters for this dataset?')) return;
    try {
      setSaving(true);
      await initializeReportPages(report.id);
      refreshReports();
      // Reload report details + pages manifest
      const [reportData, pagesData] = await Promise.all([
        api.get<Report>(`/reports/${report.id}`),
        api.get<PageItem[]>(`/reports/${report.id}/pages`)
      ]);
      setReport(reportData);
      setPages(pagesData.sort((a, b) => a.sortOrder - b.sortOrder));
      setActiveReport(reportData);
      toast.success('Default report structure has been successfully initialized.');
    } catch (err: any) {
      toast.error(err);
    } finally {
      setSaving(false);
    }
  };

  const isLoading = loading;
  const getPageIdByType = (type: string) => {
    return pages.find(p => p.pageType === type)?.id;
  };

  const getPagePublishStatus = (type: string) => {
    return pages.find(p => p.pageType === type)?.isPublished ?? false;
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border border-primary border-t-transparent" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Retrieving report metadata...</span>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="border border-red-200 bg-red-50/50 p-6 text-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-red-700 block mb-2 font-bold">
          * REPORT LOOKUP FAILED
        </span>
        <p className="text-xs text-red-600 mb-4">{error || 'Report not found'}</p>
        <button
          onClick={() => router.push('/dashboard/reports')}
          className="border border-border bg-card px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-primary hover:bg-sidebar"
        >
          Back to Reports Board
        </button>
      </div>
    );
  }

  // Chapters structure helper
  const chapters = [
    { num: '01', title: 'About PSA & Methodology', type: 'about', desc: 'Introduction details, sector overview guidelines, and dataset methodology.' },
    { num: '02', title: 'Executive Summary', type: 'executive_summary', desc: 'High-level insights, summary cards, and transition dashboard landing blocks.' },
    { num: '03', title: 'Drivers of Change', type: 'drivers_of_change', desc: 'Key societal, industrial, and economic vectors shaping local workforce strategies.' },
    { 
      num: '04', 
      title: 'Industry Overview', 
      type: 'nested_overview', 
      desc: 'Deep dive into industry profiles and regional/state details.',
      nested: [
        { title: 'Sector Overview', type: 'industry_overview', desc: 'National-level segment parameters and main takeaways.' },
        { title: 'State & Territory Profile', type: 'state_territory', desc: 'Detailed state-specific demographic breakdowns.' },
        { title: 'Industry Profile', type: 'industry_profile', desc: 'Socio-economic parameters and workforce characteristics.' },
      ]
    },
    { num: '05', title: 'Workforce Insights', type: 'workforce_insights', desc: 'Dynamic indicators, employment statistics charts, and database grids.' },
    { num: '06', title: 'Workforce Strategies', type: 'strategies', desc: 'Roadmaps, strategy action lists, and recommendations blocks.' },
    { num: '07', title: 'Looking Forward', type: 'looking_forward', desc: 'Concluding remarks, future projections, and summary contact panels.' }
  ];

  return (
    <div className="space-y-8">
      {/* ── Breadcrumbs & Back Nav ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted">
            <span>Home</span>
            <span>/</span>
            <span>Admin</span>
            <span>/</span>
            <span className="cursor-pointer hover:underline text-muted" onClick={() => router.push('/dashboard/reports')}>Reports</span>
            <span>/</span>
            <span className="text-primary font-bold">Editor</span>
          </div>
          
          <button
            onClick={() => router.push('/dashboard/reports')}
            className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors text-xs font-mono mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reports list
          </button>
          
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            {report.title}
          </h1>
          <p className="font-mono text-[10px] text-muted mt-1.5 uppercase tracking-wide">
            Slug: <span className="text-primary font-bold lowercase select-all">/reports/{report.slug}</span>
          </p>
        </div>

        <div>
          <span className="wireframe-badge uppercase font-bold text-[10px]">
            {report.status}
          </span>
        </div>
      </div>

      {/* ── WordPress-Style Split Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── LEFT COLUMN: Report Chapters (Main Content) ── */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-border bg-card p-6 shadow-sm relative">
            <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
              * DATASET SECTIONS
            </span>
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted" />
                Report Chapters
              </h2>
              {(user?.role === 'admin' || user?.role === 'editor') && (
                <button
                  onClick={() => router.push('/dashboard/settings')}
                  className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider px-2.5 py-1.5 border border-border bg-card hover:bg-sidebar text-primary transition-colors cursor-pointer"
                >
                  <Settings className="h-3 w-3 text-muted" />
                  Manage Templates
                </button>
              )}
            </div>

            {pages.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-border/80 bg-sidebar/10 p-6 rounded">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted block mb-2 font-bold">
                  Structure Empty
                </span>
                <p className="text-xs text-muted mb-4">
                  This report has no structural chapters initialized yet. Seeding default chapters is required to edit content.
                </p>
                <button
                  onClick={handleInitializeEmptyPages}
                  disabled={saving}
                  className="border border-primary bg-primary px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Init Default Structure
                </button>
              </div>
            ) : (
              (() => {
                // Group pages: top-level (no parentPathway) and sub-chapters (has parentPathway)
                const topLevel = pages.filter(p => !p.parentPathway);
                const subChapterMap: Record<string, PageItem[]> = {};
                pages.filter(p => p.parentPathway).forEach(p => {
                  const key = p.parentPathway!;
                  if (!subChapterMap[key]) subChapterMap[key] = [];
                  subChapterMap[key].push(p);
                });

                return (
                  <div className="divide-y divide-border/60">
                    {topLevel.map((page, idx) => {
                      const subs = subChapterMap[page.pageType] || [];

                      return (
                        <div key={page.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="flex gap-4">
                              <span className="font-mono font-bold text-sm text-muted/60 pt-0.5 shrink-0">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <div className="space-y-1">
                                <h3 className="text-sm font-bold text-primary leading-none flex items-center gap-2">
                                  {page.title}
                                  {page.isPublished ? (
                                    <span title="Published"><CheckCircle className="h-4 w-4 text-green-600" /></span>
                                  ) : (
                                    <span title="Draft"><Clock className="h-4 w-4 text-yellow-500" /></span>
                                  )}
                                </h3>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                              <button
                                onClick={() => router.push(`/dashboard/pages/${page.id}`)}
                                className="border border-border hover:bg-sidebar text-primary px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                              >
                                <PencilLine className="h-3 w-3" />
                                Edit
                              </button>
                            </div>
                          </div>

                          {/* Sub-chapters */}
                          {subs.length > 0 && (
                            <div className="mt-3 pl-8 ml-3 border-l-2 border-border/40 space-y-3">
                              {subs.map(sub => (
                                <div key={sub.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1 first:pt-0 last:pb-0">
                                  <div>
                                    <h4 className="text-xs font-bold text-primary flex items-center gap-1.5 leading-none">
                                      {sub.title}
                                      {sub.isPublished ? (
                                        <span title="Published"><CheckCircle className="h-3.5 w-3.5 text-green-600" /></span>
                                      ) : (
                                        <span title="Draft"><Clock className="h-3.5 w-3.5 text-yellow-500" /></span>
                                      )}
                                    </h4>
                                  </div>
                                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                                    <button
                                      onClick={() => router.push(`/dashboard/pages/${sub.id}`)}
                                      className="border border-border hover:bg-sidebar text-primary px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider flex items-center gap-0.5 cursor-pointer"
                                    >
                                      <PencilLine className="h-2.5 w-2.5" />
                                      Edit
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN: WP-Style Report Config & Settings Sidebar ── */}
        <div className="lg:col-span-1 space-y-6">
          <div className="border border-border bg-card p-6 shadow-sm relative">
            <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
              * CONFIG & UTILITIES
            </span>

            <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2 border-b border-border/60 pb-3">
              <Settings className="h-4.5 w-4.5 text-muted" />
              Settings Panel
            </h2>

            {/* Sidebar Tabs */}
            <div className="flex border-b border-border bg-card/40 text-[9px] font-mono font-bold uppercase tracking-wider mb-4">
              <button
                onClick={() => setActiveSubTab('details')}
                className={`flex-1 text-center py-2 border-b-2 cursor-pointer ${
                  activeSubTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-muted'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveSubTab('kpis')}
                className={`flex-1 text-center py-2 border-b-2 cursor-pointer ${
                  activeSubTab === 'kpis' ? 'border-primary text-primary' : 'border-transparent text-muted'
                }`}
              >
                KPIs
              </button>
              <button
                onClick={() => setActiveSubTab('history')}
                className={`flex-1 text-center py-2 border-b-2 cursor-pointer ${
                  activeSubTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-muted'
                }`}
              >
                History
              </button>
            </div>

            {/* Tab 1: General Details */}
            {activeSubTab === 'details' && (
              <form onSubmit={handleSaveReport} className="space-y-4">
                {message && (
                  <div className="border border-green-200 bg-green-50/50 p-2.5 text-[10px] text-green-700 font-mono">
                    * {message.toUpperCase()}
                  </div>
                )}

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      Report Title
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      Report Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as 'draft' | 'published' | 'archived')}
                      className="w-full border border-border bg-card px-2.5 py-1.5 text-xs text-primary focus:outline-none"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  {/* Cover Image — Library, Upload or URL */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block font-mono text-[9px] uppercase tracking-wider text-muted flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        Cover Image
                      </label>
                      <div className="flex items-center gap-0">
                        <button
                          type="button"
                          onClick={() => setCoverImageMode('library')}
                          className={`px-2 py-0.5 font-mono text-[8px] uppercase border-y border-l border-border transition-colors ${
                            coverImageMode === 'library'
                              ? 'bg-primary text-white border-primary'
                              : 'bg-card text-muted hover:bg-sidebar'
                          }`}
                        >
                          <BookOpen className="h-2.5 w-2.5 inline mr-0.5" />
                          Library
                        </button>
                        <button
                          type="button"
                          onClick={() => setCoverImageMode('url')}
                          className={`px-2 py-0.5 font-mono text-[8px] uppercase border-y border-x border-border transition-colors ${
                            coverImageMode === 'url'
                              ? 'bg-primary text-white border-primary'
                              : 'bg-card text-muted hover:bg-sidebar'
                          }`}
                        >
                          <LinkIcon className="h-2.5 w-2.5 inline mr-0.5" />
                          URL
                        </button>
                        <button
                          type="button"
                          onClick={() => setCoverImageMode('upload')}
                          className={`px-2 py-0.5 font-mono text-[8px] uppercase border border-border transition-colors ${
                            coverImageMode === 'upload'
                              ? 'bg-primary text-white border-primary'
                              : 'bg-card text-muted hover:bg-sidebar'
                          }`}
                        >
                          <Upload className="h-2.5 w-2.5 inline mr-0.5" />
                          Upload
                        </button>
                      </div>
                    </div>

                    {coverImageMode === 'library' && (
                      <div className="space-y-1.5">
                        <button
                          type="button"
                          onClick={() => setCoverImageLibraryOpen(true)}
                          className="w-full border border-dashed border-border bg-sidebar/20 hover:bg-sidebar/40 py-3 flex flex-col items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <BookOpen className="h-4 w-4 text-muted" />
                          <span className="font-mono text-[8px] uppercase tracking-wider text-muted">
                            Choose from Media Library
                          </span>
                        </button>
                        {coverImageUrl && (
                          <div className="flex items-center gap-2">
                            <img
                              src={coverImageUrl}
                              alt="Cover preview"
                              className="h-10 w-14 object-cover border border-border"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-mono text-[8px] text-muted truncate">{coverImageUrl}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setCoverImageUrl('')}
                              className="p-0.5 text-red-400 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {coverImageMode === 'url' && (
                      <input
                        type="text"
                        value={coverImageUrl}
                        onChange={(e) => setCoverImageUrl(e.target.value)}
                        className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs text-primary focus:border-primary focus:outline-none placeholder:text-muted/40"
                        placeholder="https://example.com/cover.jpg"
                      />
                    )}

                    {coverImageMode === 'upload' && (
                      <div className="space-y-1.5">
                        <input
                          ref={coverImageInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/svg+xml"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleCoverImageUpload(file);
                          }}
                        />
                        <button
                          type="button"
                          disabled={uploadingCover}
                          onClick={() => coverImageInputRef.current?.click()}
                          className="w-full border border-dashed border-border bg-sidebar/20 hover:bg-sidebar/40 py-3 flex flex-col items-center gap-1.5 cursor-pointer transition-colors disabled:opacity-50"
                        >
                          {uploadingCover ? (
                            <div className="h-3.5 w-3.5 animate-spin rounded-full border border-primary border-t-transparent" />
                          ) : (
                            <Upload className="h-4 w-4 text-muted" />
                          )}
                          <span className="font-mono text-[8px] uppercase tracking-wider text-muted">
                            {uploadingCover ? 'Uploading...' : 'Click to select image file'}
                          </span>
                          <span className="font-mono text-[7px] text-muted/50">JPG, PNG, WEBP, SVG</span>
                        </button>
                        {coverImageUrl && (
                          <div className="flex items-center gap-2">
                            <img
                              src={coverImageUrl}
                              alt="Cover preview"
                              className="h-10 w-14 object-cover border border-border"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-mono text-[8px] text-muted truncate">{coverImageUrl}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setCoverImageUrl('')}
                              className="p-0.5 text-red-400 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* PDF Download — Library, Upload or URL */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block font-mono text-[9px] uppercase tracking-wider text-muted flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        PDF Download
                      </label>
                      <div className="flex items-center gap-0">
                        <button
                          type="button"
                          onClick={() => setPdfMode('library')}
                          className={`px-2 py-0.5 font-mono text-[8px] uppercase border-y border-l border-border transition-colors ${
                            pdfMode === 'library'
                              ? 'bg-primary text-white border-primary'
                              : 'bg-card text-muted hover:bg-sidebar'
                          }`}
                        >
                          <BookOpen className="h-2.5 w-2.5 inline mr-0.5" />
                          Library
                        </button>
                        <button
                          type="button"
                          onClick={() => setPdfMode('url')}
                          className={`px-2 py-0.5 font-mono text-[8px] uppercase border-y border-x border-border transition-colors ${
                            pdfMode === 'url'
                              ? 'bg-primary text-white border-primary'
                              : 'bg-card text-muted hover:bg-sidebar'
                          }`}
                        >
                          <LinkIcon className="h-2.5 w-2.5 inline mr-0.5" />
                          URL
                        </button>
                        <button
                          type="button"
                          onClick={() => setPdfMode('upload')}
                          className={`px-2 py-0.5 font-mono text-[8px] uppercase border border-border transition-colors ${
                            pdfMode === 'upload'
                              ? 'bg-primary text-white border-primary'
                              : 'bg-card text-muted hover:bg-sidebar'
                          }`}
                        >
                          <Upload className="h-2.5 w-2.5 inline mr-0.5" />
                          Upload
                        </button>
                      </div>
                    </div>

                    {pdfMode === 'library' && (
                      <div className="space-y-1.5">
                        <button
                          type="button"
                          onClick={() => setPdfLibraryOpen(true)}
                          className="w-full border border-dashed border-border bg-sidebar/20 hover:bg-sidebar/40 py-3 flex flex-col items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <BookOpen className="h-4 w-4 text-muted" />
                          <span className="font-mono text-[8px] uppercase tracking-wider text-muted">
                            Choose from Media Library
                          </span>
                        </button>
                        {pdfFileUrl && (
                          <div className="flex items-center gap-2 border border-border bg-sidebar/20 p-2">
                            <FileText className="h-4 w-4 text-muted shrink-0" />
                            <p className="font-mono text-[8px] text-muted truncate flex-1">{pdfFileUrl}</p>
                            <button
                              type="button"
                              onClick={() => setPdfFileUrl('')}
                              className="p-0.5 text-red-400 hover:text-red-600 shrink-0"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {pdfMode === 'url' && (
                      <input
                        type="text"
                        value={pdfFileUrl}
                        onChange={(e) => setPdfFileUrl(e.target.value)}
                        className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs text-primary focus:border-primary focus:outline-none placeholder:text-muted/40"
                        placeholder="https://example.com/document.pdf"
                      />
                    )}

                    {pdfMode === 'upload' && (
                      <div className="space-y-1.5">
                        <input
                          ref={pdfInputRef}
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handlePdfUpload(file);
                          }}
                        />
                        <button
                          type="button"
                          disabled={uploadingPdf}
                          onClick={() => pdfInputRef.current?.click()}
                          className="w-full border border-dashed border-border bg-sidebar/20 hover:bg-sidebar/40 py-3 flex flex-col items-center gap-1.5 cursor-pointer transition-colors disabled:opacity-50"
                        >
                          {uploadingPdf ? (
                            <div className="h-3.5 w-3.5 animate-spin rounded-full border border-primary border-t-transparent" />
                          ) : (
                            <Upload className="h-4 w-4 text-muted" />
                          )}
                          <span className="font-mono text-[8px] uppercase tracking-wider text-muted">
                            {uploadingPdf ? 'Uploading...' : 'Click to select PDF file'}
                          </span>
                          <span className="font-mono text-[7px] text-muted/50">PDF only · Max {process.env.NEXT_PUBLIC_MAX_FILE_MB ?? 20}MB</span>
                        </button>
                        {pdfFileUrl && (
                          <div className="flex items-center gap-2 border border-border bg-sidebar/20 p-2">
                            <FileText className="h-4 w-4 text-muted shrink-0" />
                            <p className="font-mono text-[8px] text-muted truncate flex-1">{pdfFileUrl}</p>
                            <button
                              type="button"
                              onClick={() => setPdfFileUrl('')}
                              className="p-0.5 text-red-400 hover:text-red-600 shrink-0"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      PSA Website link (Back Link)
                    </label>
                    <input
                      type="text"
                      value={psaSectorPageUrl}
                      onChange={(e) => setPsaSectorPageUrl(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs text-primary focus:border-primary focus:outline-none placeholder:text-muted/40"
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
                      className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs text-primary focus:border-primary focus:outline-none placeholder:text-muted/40"
                      placeholder="https://psa.gov.au/contact"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                        Sort Order
                      </label>
                      <input
                        type="number"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(Number(e.target.value))}
                        className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center h-full pt-4">
                      <label className="flex items-center gap-1.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isFeatured}
                          onChange={(e) => setIsFeatured(e.target.checked)}
                          className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-0 cursor-pointer"
                        />
                        <span className="font-mono text-[8px] uppercase tracking-wider text-primary">
                          Featured
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      Short Description
                    </label>
                    <textarea
                      rows={3}
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs text-primary focus:border-primary focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      Home Card Notes
                    </label>
                    <textarea
                      rows={2}
                      value={cardNote}
                      onChange={(e) => setCardNote(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs text-primary focus:border-primary focus:outline-none leading-relaxed"
                      placeholder="e.g. Includes Police..."
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full border border-primary bg-primary py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors disabled:opacity-50 cursor-pointer text-center"
                  >
                    {saving ? 'Saving changes...' : 'Save Settings'}
                  </button>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={handleInitializeEmptyPages}
                      className="w-full border border-border bg-card hover:bg-sidebar text-muted font-mono text-[9px] uppercase tracking-wider py-2 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Init Chapters Structure
                    </button>
                    <button
                      type="button"
                      onMouseEnter={() => setShowInitTooltip(true)}
                      onMouseLeave={() => setShowInitTooltip(false)}
                      onFocus={() => setShowInitTooltip(true)}
                      onBlur={() => setShowInitTooltip(false)}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted/50 hover:text-muted"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                    </button>
                    {showInitTooltip && (
                      <div className="absolute bottom-full right-0 mb-2 w-64 bg-primary text-white text-[9px] font-mono leading-relaxed p-3 z-50 shadow-lg">
                        <span className="font-bold uppercase block mb-1">What does this do?</span>
                        <p>Creates the default chapter pages for this report (e.g. About, Executive Summary, Drivers of Change, Industry Overview, Workforce Insights, Strategies, Looking Forward).</p>
                        <p className="mt-1 text-white/70">If chapters already exist, this will only create any missing ones — it will NOT overwrite existing content.</p>
                        <div className="absolute bottom-[-4px] right-3 w-2 h-2 bg-primary rotate-45" />
                      </div>
                    )}
                  </div>
                </div>
              </form>
            )}

            {/* Tab 2: KPIs */}
            {activeSubTab === 'kpis' && (
              <div className="space-y-4">
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {kpis.length === 0 ? (
                    <div className="text-[10px] text-muted/60 font-mono py-4 italic border border-dashed border-border p-3 bg-sidebar/20 text-center">
                      No KPI badges defined.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {kpis.map((kpi) => (
                        <div key={kpi.id} className="border border-border p-2.5 bg-[#fcfcfb] flex justify-between items-center">
                          <div>
                            <span className="font-mono text-[8px] uppercase text-muted tracking-wider block">
                              {kpi.label}
                            </span>
                            <span className="text-sm font-bold tracking-tight text-primary">
                              {kpi.prefix}{kpi.value}{kpi.suffix}
                            </span>
                          </div>
                          <button 
                            onClick={() => handleDeleteKpi(kpi.id)}
                            className="text-red-500 hover:text-red-700 p-1 border border-transparent hover:border-red-200 bg-card cursor-pointer"
                            title="Delete KPI Badge"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <form onSubmit={handleAddKpi} className="border-t border-border/60 pt-3 space-y-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted block font-bold">
                    Create KPI Badge
                  </span>
                  
                  <div className="space-y-2 text-xs">
                    <div className="space-y-1">
                      <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Label Descriptor</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Employees"
                        value={newKpiLabel}
                        onChange={(e) => setNewKpiLabel(e.target.value)}
                        className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1 text-xs text-primary focus:border-primary focus:outline-none"
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
                        className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1 text-xs text-primary focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Prefix</label>
                        <input
                          type="text"
                          placeholder="e.g. $"
                          value={newKpiPrefix}
                          onChange={(e) => setNewKpiPrefix(e.target.value)}
                          className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1 text-xs text-primary focus:border-primary focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Suffix</label>
                        <input
                          type="text"
                          placeholder="e.g. %"
                          value={newKpiSuffix}
                          onChange={(e) => setNewKpiSuffix(e.target.value)}
                          className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1 text-xs text-primary focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={kpiLoading}
                    className="w-full border border-primary bg-primary py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                    Create Badge Card
                  </button>
                </form>
              </div>
            )}

            {/* Tab 3: History */}
            {activeSubTab === 'history' && (
              <div className="space-y-3">
                {logsLoading ? (
                  <div className="flex h-32 items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-3 w-3 animate-spin rounded-full border border-primary border-t-transparent" />
                      <span className="font-mono text-[8px] uppercase tracking-widest text-muted">Loading logs...</span>
                    </div>
                  </div>
                ) : auditLogsList.length === 0 ? (
                  <div className="text-center py-8 font-mono text-[10px] uppercase text-muted italic border border-dashed border-border p-3 bg-sidebar/20">
                    No history found.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                    {auditLogsList.map((log) => (
                      <div key={log.id} className="border border-border p-2 bg-[#fcfcfb] space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-primary">
                            {log.action}
                          </span>
                          <span className="font-mono text-[7px] text-muted">
                            {new Date(log.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-[10px] text-muted">
                          By: <span className="font-bold text-primary">{log.userName.split(' ')[0]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

      <MediaLibraryModal
        isOpen={coverImageLibraryOpen}
        onClose={() => setCoverImageLibraryOpen(false)}
        allowedType="image"
        onSelect={(url) => setCoverImageUrl(url)}
      />

      <MediaLibraryModal
        isOpen={pdfLibraryOpen}
        onClose={() => setPdfLibraryOpen(false)}
        allowedType="pdf"
        onSelect={(url) => setPdfFileUrl(url)}
      />
    </div>
  );
}
