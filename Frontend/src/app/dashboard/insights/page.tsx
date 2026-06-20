'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useReport } from '@/context/ReportContext';
import { useAuth } from '@/context/AuthContext';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Activity, 
  TrendingUp, 
  Check, 
  Info 
} from 'lucide-react';

interface Insight {
  id: string;
  reportId: string;
  theme: 'theme_1' | 'theme_2' | 'theme_3';
  insightNumber: number;
  title: string;
  summary: string | null;
  detail: string | null;
  evidenceText: string | null;
  sourceNote: string | null;
  tags: string[] | null;
  isPublished: boolean;
}

interface Driver {
  id: string;
  reportId: string;
  title: string;
  description: string | null;
  megatrendTags: string[] | null;
}

export default function InsightsManagementPage() {
  const { activeReport } = useReport();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'insights' | 'drivers'>('insights');
  const [insights, setInsights] = useState<Insight[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [insightModalOpen, setInsightModalOpen] = useState(false);
  const [editingInsight, setEditingInsight] = useState<Insight | null>(null);

  const [driverModalOpen, setDriverModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  // Insight Form Fields
  const [theme, setTheme] = useState<'theme_1' | 'theme_2' | 'theme_3'>('theme_1');
  const [insightNumber, setInsightNumber] = useState<number>(1);
  const [insightTitle, setInsightTitle] = useState('');
  const [insightSummary, setInsightSummary] = useState('');
  const [insightDetail, setInsightDetail] = useState('');
  const [insightEvidence, setInsightEvidence] = useState('');
  const [insightSourceNote, setInsightSourceNote] = useState('');
  const [insightTagsText, setInsightTagsText] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  // Driver Form Fields
  const [driverTitle, setDriverTitle] = useState('');
  const [driverDescription, setDriverDescription] = useState('');
  const [driverTagsText, setDriverTagsText] = useState('');

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (activeReport) {
      loadData();
    }
  }, [activeReport, activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'insights') {
        const res = await api.get<{ rows: Insight[]; total: number }>(`/reports/${activeReport!.id}/insights`);
        setInsights((res.rows || []).sort((a, b) => a.insightNumber - b.insightNumber));
      } else {
        const res = await api.get<Driver[]>(`/reports/${activeReport!.id}/insights/drivers`);
        setDrivers(res);
      }
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  // INSIGHT ACTIONS
  const handleOpenAddInsight = () => {
    setEditingInsight(null);
    setTheme('theme_1');
    setInsightNumber(insights.length + 1);
    setInsightTitle('');
    setInsightSummary('');
    setInsightDetail('');
    setInsightEvidence('');
    setInsightSourceNote('');
    setInsightTagsText('');
    setIsPublished(true);
    setInsightModalOpen(true);
  };

  const handleOpenEditInsight = (ins: Insight) => {
    setEditingInsight(ins);
    setTheme(ins.theme);
    setInsightNumber(ins.insightNumber);
    setInsightTitle(ins.title);
    setInsightSummary(ins.summary || '');
    setInsightDetail(ins.detail || '');
    setInsightEvidence(ins.evidenceText || '');
    setInsightSourceNote(ins.sourceNote || '');
    setInsightTagsText(ins.tags ? ins.tags.join(', ') : '');
    setIsPublished(ins.isPublished);
    setInsightModalOpen(true);
  };

  const handleInsightSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReport) return;

    const tagsArray = insightTagsText
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const payload = {
      theme,
      insightNumber: Number(insightNumber),
      title: insightTitle,
      summary: insightSummary || null,
      detail: insightDetail || null,
      evidenceText: insightEvidence || null,
      sourceNote: insightSourceNote || null,
      tags: tagsArray.length > 0 ? tagsArray : null,
      isPublished,
    };

    try {
      if (editingInsight) {
        await api.patch(`/reports/${activeReport.id}/insights/${editingInsight.id}`, payload);
      } else {
        await api.post(`/reports/${activeReport.id}/insights`, {
          ...payload,
          sortOrder: insights.length + 1,
        });
      }
      setInsightModalOpen(false);
      loadData();
    } catch (err: any) {
      alert(`Operation failed: ${err.message}`);
    }
  };

  const handleDeleteInsight = async (insId: string) => {
    if (!activeReport) return;
    if (!confirm('Are you sure you want to delete this workforce insight?')) return;
    try {
      await api.delete(`/reports/${activeReport.id}/insights/${insId}`);
      loadData();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  // DRIVER ACTIONS
  const handleOpenAddDriver = () => {
    setEditingDriver(null);
    setDriverTitle('');
    setDriverDescription('');
    setDriverTagsText('');
    setDriverModalOpen(true);
  };

  const handleOpenEditDriver = (drv: Driver) => {
    setEditingDriver(drv);
    setDriverTitle(drv.title);
    setDriverDescription(drv.description || '');
    setDriverTagsText(drv.megatrendTags ? drv.megatrendTags.join(', ') : '');
    setDriverModalOpen(true);
  };

  const handleDriverSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReport) return;

    const tagsArray = driverTagsText
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const payload = {
      title: driverTitle,
      description: driverDescription || null,
      megatrendTags: tagsArray.length > 0 ? tagsArray : null,
    };

    try {
      if (editingDriver) {
        await api.patch(`/reports/${activeReport.id}/insights/drivers/${editingDriver.id}`, payload);
      } else {
        await api.post(`/reports/${activeReport.id}/insights/drivers`, {
          ...payload,
          sortOrder: drivers.length + 1,
        });
      }
      setDriverModalOpen(false);
      loadData();
    } catch (err: any) {
      alert(`Operation failed: ${err.message}`);
    }
  };

  const handleDeleteDriver = async (drvId: string) => {
    if (!activeReport) return;
    if (!confirm('Are you sure you want to delete this Driver of Change?')) return;
    try {
      await api.delete(`/reports/${activeReport.id}/insights/drivers/${drvId}`);
      loadData();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  if (!activeReport) {
    return (
      <div className="text-center p-8 border border-border bg-sidebar/20 font-mono text-xs uppercase text-muted">
        * Error: No active report dataset context selected.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Breadcrumb & Title ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted">
            <span>Home</span>
            <span>/</span>
            <span>Dataset</span>
            <span>/</span>
            <span className="text-primary font-bold">Insights</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Insights & Drivers
          </h1>
        </div>

        <button
          onClick={activeTab === 'insights' ? handleOpenAddInsight : handleOpenAddDriver}
          className="border border-primary bg-primary px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors flex items-center justify-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          {activeTab === 'insights' ? 'Add Insight' : 'Add Driver'}
        </button>
      </div>

      {/* ── Tabbed View Switches ── */}
      <div className="flex border-b border-border/80">
        <button
          onClick={() => setActiveTab('insights')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all ${
            activeTab === 'insights' 
              ? 'border-primary text-primary font-bold bg-sidebar/10' 
              : 'border-transparent text-muted hover:text-primary'
          }`}
        >
          <Activity className="h-4 w-4" />
          Workforce Insights (Ch 05)
        </button>
        <button
          onClick={() => setActiveTab('drivers')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all ${
            activeTab === 'drivers' 
              ? 'border-primary text-primary font-bold bg-sidebar/10' 
              : 'border-transparent text-muted hover:text-primary'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          Drivers of Change (Ch 03)
        </button>
      </div>

      {/* ── Main Data Table Card ── */}
      <div className="border border-border bg-card p-6 shadow-sm relative">
        <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
          * {activeTab === 'insights' ? 'INSIGHTS DATA TABLE' : 'DRIVERS DATA TABLE'}
        </span>

        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border border-primary border-t-transparent" />
              <span className="font-mono text-[8px] uppercase tracking-widest text-muted">Loading data...</span>
            </div>
          </div>
        ) : activeTab === 'insights' ? (
          // WORKFORCE INSIGHTS LIST
          insights.length === 0 ? (
            <div className="text-center py-12 font-mono text-xs uppercase text-muted italic">
              * No workforce insights records found. Create one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted font-mono uppercase text-[9px] tracking-wider font-bold">
                    <th className="py-2.5 px-3">Num</th>
                    <th className="py-2.5 px-3">Theme</th>
                    <th className="py-2.5 px-3">Insight Title</th>
                    <th className="py-2.5 px-3">Tags</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {insights.map((ins) => (
                    <tr key={ins.id} className="hover:bg-sidebar/10">
                      <td className="py-3 px-3 font-mono text-[10px] text-muted">
                        #{ins.insightNumber}
                      </td>
                      <td className="py-3 px-3">
                        <span className="wireframe-badge text-[7px] font-semibold">
                          {ins.theme.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-3 max-w-sm">
                        <div className="font-bold text-primary">{ins.title}</div>
                        {ins.summary && (
                          <p className="text-[10px] text-muted line-clamp-1 mt-0.5">{ins.summary}</p>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {ins.tags?.map((t, idx) => (
                            <span key={idx} className="bg-sidebar px-1.5 py-0.5 border border-border/40 rounded-none text-[8px] font-mono text-muted">
                              {t}
                            </span>
                          )) || <span className="text-[10px] text-muted italic">None</span>}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`text-[8px] font-mono uppercase ${ins.isPublished ? 'text-green-700' : 'text-muted'}`}>
                          {ins.isPublished ? 'published' : 'draft'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditInsight(ins)}
                            className="p-1 border border-border bg-card hover:bg-sidebar text-muted"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          {isAdmin && (
                            <button
                              onClick={() => handleDeleteInsight(ins.id)}
                              className="p-1 border border-red-150 bg-[#fff5f5] hover:bg-red-50 text-red-500 hover:border-red-300"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          // DRIVERS OF CHANGE LIST
          drivers.length === 0 ? (
            <div className="text-center py-12 font-mono text-xs uppercase text-muted italic">
              * No Drivers of Change records found. Create one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted font-mono uppercase text-[9px] tracking-wider font-bold">
                    <th className="py-2.5 px-3">Driver Title</th>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3">Megatrends</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {drivers.map((drv) => (
                    <tr key={drv.id} className="hover:bg-sidebar/10">
                      <td className="py-3 px-3 font-bold text-primary max-w-xs">
                        {drv.title}
                      </td>
                      <td className="py-3 px-3 max-w-sm text-muted">
                        {drv.description || 'N/A'}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {drv.megatrendTags?.map((t, idx) => (
                            <span key={idx} className="bg-sidebar px-1.5 py-0.5 border border-border/40 rounded-none text-[8px] font-mono text-muted">
                              {t}
                            </span>
                          )) || <span className="text-[10px] text-muted italic">None</span>}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditDriver(drv)}
                            className="p-1 border border-border bg-card hover:bg-sidebar text-muted"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          {isAdmin && (
                            <button
                              onClick={() => handleDeleteDriver(drv.id)}
                              className="p-1 border border-red-150 bg-[#fff5f5] hover:bg-red-50 text-red-500 hover:border-red-300"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>

      {/* ── Insight Editor Modal ── */}
      {insightModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20 backdrop-blur-xs px-4">
          <div className="w-full max-w-xl border border-border bg-card shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
              * INSIGHT DIALOG
            </span>

            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                {editingInsight ? 'Modify Workforce Insight' : 'Create Workforce Insight'}
              </h3>
              <button 
                onClick={() => setInsightModalOpen(false)}
                className="p-1 border border-border hover:bg-sidebar text-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleInsightSubmit} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Theme Block</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as any)}
                    className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                  >
                    <option value="theme_1">Theme 1: Demographics / Tech</option>
                    <option value="theme_2">Theme 2: Workforce Shortages</option>
                    <option value="theme_3">Theme 3: Education & Training</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Insight Number</label>
                  <input
                    type="number"
                    value={insightNumber}
                    onChange={(e) => setInsightNumber(Number(e.target.value))}
                    className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Insight Title</label>
                <input
                  type="text"
                  required
                  value={insightTitle}
                  onChange={(e) => setInsightTitle(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  placeholder="e.g. Critical shortages in civil engineering roles"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Comma-Separated Tags</label>
                <input
                  type="text"
                  value={insightTagsText}
                  onChange={(e) => setInsightTagsText(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  placeholder="e.g. engineering, regional, shortages"
                />
              </div>

              <div className="flex items-center py-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-0 cursor-pointer"
                  />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-primary">
                    Publish this Insight
                  </span>
                </label>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Summary Intro (Textarea)</label>
                <textarea
                  rows={2}
                  value={insightSummary}
                  onChange={(e) => setInsightSummary(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Detailed Explanation (Rich text/Markdown compatible)</label>
                <textarea
                  rows={4}
                  value={insightDetail}
                  onChange={(e) => setInsightDetail(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Supporting Evidence Text</label>
                <textarea
                  rows={2}
                  value={insightEvidence}
                  onChange={(e) => setInsightEvidence(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  placeholder="e.g. Statistical data breakdowns..."
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Source Citation Note</label>
                <input
                  type="text"
                  value={insightSourceNote}
                  onChange={(e) => setInsightSourceNote(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  placeholder="e.g. Source: PSA Regional Workforce Survey 2025"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setInsightModalOpen(false)}
                  className="border border-border bg-card px-4 py-2 font-mono text-[9px] uppercase tracking-widest hover:bg-sidebar transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border border-primary bg-primary px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors"
                >
                  Save Insight
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Driver Editor Modal ── */}
      {driverModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20 backdrop-blur-xs px-4">
          <div className="w-full max-w-lg border border-border bg-card shadow-lg p-6 relative">
            <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
              * DRIVER DIALOG
            </span>

            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                {editingDriver ? 'Modify Driver of Change' : 'Create Driver of Change'}
              </h3>
              <button 
                onClick={() => setDriverModalOpen(false)}
                className="p-1 border border-border hover:bg-sidebar text-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleDriverSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Driver Title</label>
                <input
                  type="text"
                  required
                  value={driverTitle}
                  onChange={(e) => setDriverTitle(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  placeholder="e.g. Rapid technological integration"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Megatrend Tags (Comma-Separated)</label>
                <input
                  type="text"
                  value={driverTagsText}
                  onChange={(e) => setDriverTagsText(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  placeholder="e.g. digital, AI, automation"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Driver Description</label>
                <textarea
                  rows={4}
                  value={driverDescription}
                  onChange={(e) => setDriverDescription(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setDriverModalOpen(false)}
                  className="border border-border bg-card px-4 py-2 font-mono text-[9px] uppercase tracking-widest hover:bg-sidebar transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border border-primary bg-primary px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors"
                >
                  Save Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
