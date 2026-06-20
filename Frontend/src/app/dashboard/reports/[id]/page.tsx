'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useReport, Report } from '@/context/ReportContext';
import { useAuth } from '@/context/AuthContext';
import { initializeReportPages } from '@/lib/pageInit';
import { 
  Trash2, 
  Plus, 
  ArrowLeft,
  RefreshCw
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

export default function ReportEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: reportId } = use(params);
  const { user } = useAuth();
  const { refreshReports, activeReport, setActiveReport } = useReport();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<Report | null>(null);

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
      // 1. Fetch industries/years dropdowns
      const [industries, years, reportData] = await Promise.all([
        api.get<IndustryOption[]>('/industries'),
        api.get<YearOption[]>('/industries/years'),
        api.get<Report>(`/reports/${reportId}`)
      ]);

      setIndustriesList(industries);
      setYearsList(years);
      setReport(reportData);

      // Populate form fields
      setTitle(reportData.title);
      setShortDescription(reportData.shortDescription || '');
      setCoverImageUrl(reportData.coverImageUrl || '');
      setPdfFileUrl(reportData.pdfFileUrl || '');
      setPsaSectorPageUrl(reportData.psaSectorPageUrl || '');
      setContactUrl(reportData.contactUrl || '');
      setCardNote(reportData.cardNote || '');
      setSortOrder(reportData.sortOrder || 0);
      setIsFeatured(reportData.isFeatured || false);

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
      // Reload report pages
      const updated = await api.get<Report>(`/reports/${report.id}`);
      setActiveReport(updated);
      alert('Default report structure has been successfully initialized.');
    } catch (err: any) {
      alert(`Failed to initialize pages: ${err.message}`);
    } finally {
      setSaving(false);
    }
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
            <span className="text-primary font-bold">Configure</span>
          </div>
          
          <button
            onClick={() => router.push('/dashboard/reports')}
            className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors text-xs font-mono mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reports list
          </button>
          
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Settings: {report.title}
          </h1>
        </div>

        <div>
          <span className="wireframe-badge uppercase font-bold text-[10px]">
            {report.status}
          </span>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="flex border-b border-border bg-card">
        <button
          onClick={() => setActiveSubTab('details')}
          className={`px-4 py-3 text-[10px] font-mono uppercase tracking-wider font-semibold border-b-2 cursor-pointer ${
            activeSubTab === 'details' ? 'border-primary text-primary font-bold' : 'border-transparent text-muted'
          }`}
        >
          General Settings
        </button>
        <button
          onClick={() => setActiveSubTab('kpis')}
          className={`px-4 py-3 text-[10px] font-mono uppercase tracking-wider font-semibold border-b-2 cursor-pointer ${
            activeSubTab === 'kpis' ? 'border-primary text-primary font-bold' : 'border-transparent text-muted'
          }`}
        >
          KPI Badges
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          className={`px-4 py-3 text-[10px] font-mono uppercase tracking-wider font-semibold border-b-2 cursor-pointer ${
            activeSubTab === 'history' ? 'border-primary text-primary font-bold' : 'border-transparent text-muted'
          }`}
        >
          Edit History
        </button>
      </div>

      {/* ── Tab Content ── */}

      {/* Tab 1: General Details */}
      {activeSubTab === 'details' && (
        <div className="border border-border bg-card p-6 shadow-sm relative">
          <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
            * REPORT PROPERTIES
          </span>

          <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
            General Properties
          </h2>

          <form onSubmit={handleSaveReport} className="space-y-4">
            {message && (
              <div className="border border-green-200 bg-green-50/50 p-3 text-xs text-green-700 font-mono">
                * SUCCESS: {message.toUpperCase()}
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
                onClick={handleInitializeEmptyPages}
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
                  <div key={kpi.id} className="border border-border p-3 flex flex-col justify-between bg-[#fcfcfb]">
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
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Label Descriptor</label>
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
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Statistic Value</label>
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
                <div key={log.id} className="border border-border p-3 bg-[#fcfcfb] relative">
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
  );
}
