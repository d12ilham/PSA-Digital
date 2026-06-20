'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useReport, Report } from '@/context/ReportContext';
import { useAuth } from '@/context/AuthContext';
import { 
  FileText, 
  Settings, 
  Globe, 
  Trash2, 
  Plus, 
  Check, 
  Edit3, 
  Eye, 
  X,
  FileDown
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

export default function ReportsManagementPage() {
  const { user } = useAuth();
  const { reports, refreshReports } = useReport();
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  
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

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin';

  // Load KPIs when editing a report
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
    }
  }, [editingReport]);

  const loadKpis = async (reportId: string) => {
    try {
      const res = await api.get<KPI[]>(`/reports/${reportId}/kpis`);
      setKpis(res.sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (err) {
      console.error('Failed to load KPIs:', err);
    }
  };

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
    } catch (err: any) {
      setError(err.message || 'Failed to update report.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async (reportId: string) => {
    if (!confirm('Are you sure you want to publish this report dataset? This makes it viewable in the public portal.')) return;
    try {
      await api.post(`/reports/${reportId}/publish`);
      refreshReports();
    } catch (err: any) {
      alert(`Publish failed: ${err.message}`);
    }
  };

  const handleArchive = async (reportId: string) => {
    if (!confirm('Are you sure you want to archive this report dataset? It will be removed from active public listings.')) return;
    try {
      await api.post(`/reports/${reportId}/archive`);
      refreshReports();
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

  return (
    <div className="space-y-8">
      {/* ── Breadcrumb & Title ── */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted">
            <span>Home</span>
            <span>/</span>
            <span>Admin</span>
            <span>/</span>
            <span className="text-primary font-bold">Reports</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Reports Configuration
          </h1>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        
        {/* Reports List - 5 Columns */}
        <div className="lg:col-span-5 border border-border bg-card p-6 shadow-sm">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted block mb-4">
            Available Datasets
          </span>

          <div className="divide-y divide-border/60">
            {reports.map((report) => (
              <div 
                key={report.id} 
                className={`py-4 flex flex-col justify-between gap-3 ${editingReport?.id === report.id ? 'bg-sidebar/30 -mx-6 px-6 border-l-2 border-primary' : ''}`}
              >
                <div>
                  <h3 className="text-xs font-bold text-primary mb-1">
                    {report.title}
                  </h3>
                  <span className="font-mono text-[8px] text-muted block uppercase">
                    slug: {report.slug}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span className="wireframe-badge text-[8px]">
                    {report.status.toUpperCase()}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingReport(report)}
                      className={`border px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors ${editingReport?.id === report.id ? 'bg-primary text-white border-primary' : 'bg-card text-primary border-border hover:bg-sidebar'}`}
                    >
                      Configure
                    </button>

                    {isAdmin && report.status === 'draft' && (
                      <button
                        onClick={() => handlePublish(report.id)}
                        className="border border-green-200 bg-green-50 text-green-700 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider hover:bg-green-100 transition-colors"
                      >
                        Publish
                      </button>
                    )}

                    {isAdmin && report.status === 'published' && (
                      <button
                        onClick={() => handleArchive(report.id)}
                        className="border border-red-200 bg-red-50 text-red-700 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider hover:bg-red-100 transition-colors"
                      >
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configurations Forms - 7 Columns */}
        <div className="lg:col-span-7">
          {editingReport ? (
            <div className="space-y-8">
              
              {/* Form 1: Metadata settings */}
              <div className="border border-border bg-card p-6 shadow-sm relative">
                <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
                  * EDIT CONFIG
                </span>
                
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
                    Configure: {editingReport.slug.toUpperCase()}
                  </h2>
                  <button 
                    onClick={() => setEditingReport(null)}
                    className="p-1 border border-border hover:bg-sidebar text-muted"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

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
                        PSA Sector Page Link (Back Link)
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
                        Contact Inquiry Link
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
                          Feature this Report
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
                        Home Card Special Notes
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

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="border border-primary bg-primary px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white hover:bg-active transition-colors disabled:opacity-50"
                    >
                      {saving ? 'Saving changes...' : 'Save Settings'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Form 2: nested report KPIs */}
              <div className="border border-border bg-card p-6 shadow-sm relative">
                <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
                  * NESTED KPI METRICS
                </span>

                <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-6">
                  Report KPI Badges
                </h2>

                {/* KPI list */}
                <div className="space-y-3 mb-6">
                  {kpis.length === 0 ? (
                    <div className="text-xs text-muted/60 font-mono py-2 italic">
                      * No custom KPI badges configured. Create one below.
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
                                className="text-red-500 hover:text-red-700 p-0.5 border border-transparent hover:border-red-200 bg-card"
                              >
                                <Trash2 className="h-3 w-3" />
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

                {/* Add KPI form */}
                <form onSubmit={handleAddKpi} className="border-t border-border/60 pt-4 space-y-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted block">
                    Add KPI Card
                  </span>
                  
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                        Label / Descriptor
                      </label>
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
                      <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                        Numeric / Text Value
                      </label>
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
                      <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                        Prefix (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. $"
                        value={newKpiPrefix}
                        onChange={(e) => setNewKpiPrefix(e.target.value)}
                        className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                        Suffix (optional)
                      </label>
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
                      className="border border-primary bg-primary px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Badge
                    </button>
                  </div>
                </form>
              </div>

            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center border border-dashed border-border bg-sidebar/20 p-8 text-center">
              <Settings className="mb-4 h-8 w-8 text-muted" />
              <span className="font-mono text-xs uppercase tracking-wider text-muted mb-2">No Selection</span>
              <p className="max-w-xs text-xs text-muted/80 leading-relaxed">
                Select a report from the Available Datasets list on the left to configure its details and KPI cards.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
