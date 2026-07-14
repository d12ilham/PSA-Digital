'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { 
  KeyRound, 
  Building, 
  Calendar, 
  Settings,
  Plus,
  Save,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  BookOpen,
  X
} from 'lucide-react';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

interface PageTemplate {
  id: string;
  title: string;
  pageType: string;
  slug: string;
  parentPathway?: string | null;
  sortOrder: number;
}

export default function SettingsPage() {
  const { user } = useAuth();
  const toast = useToast();

  // Chapter templates state
  const [templates, setTemplates] = useState<PageTemplate[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [templatesSuccess, setTemplatesSuccess] = useState<string | null>(null);
  const [templatesError, setTemplatesError] = useState<string | null>(null);

  // Form states for creating new template
  const [newTitle, setNewTitle] = useState('');
  const [newPageType, setNewPageType] = useState('custom');
  const [newSlug, setNewSlug] = useState('');
  const [newParentPathway, setNewParentPathway] = useState('');
  const [newSortOrder, setNewSortOrder] = useState('');
  const [creatingTemplate, setCreatingTemplate] = useState(false);

  // Form states for editing template
  const [editingTplId, setEditingTplId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPageType, setEditPageType] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editParentPathway, setEditParentPathway] = useState('');
  const [editSortOrder, setEditSortOrder] = useState('');
  const [updatingTemplate, setUpdatingTemplate] = useState(false);

  // Fetch templates
  const loadTemplates = async () => {
    setTemplatesLoading(true);
    setTemplatesError(null);
    try {
      const res = await api.get<PageTemplate[]>('/page-templates');
      setTemplates(res.sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (err: any) {
      console.error('Failed to load templates:', err);
      const msg = err.message || 'Failed to load page templates.';
      setTemplatesError(msg);
      toast.error(err);
    } finally {
      setTemplatesLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    loadTemplates();
  }, []);


  // Handle template creation
  const handleAddTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    setTemplatesError(null);
    setTemplatesSuccess(null);

    if (!newTitle.trim()) {
      const msg = 'Title is required.';
      setTemplatesError(msg);
      toast.error(msg);
      return;
    }
    if (!newSlug.trim()) {
      const msg = 'Slug is required.';
      setTemplatesError(msg);
      toast.error(msg);
      return;
    }

    setCreatingTemplate(true);
    try {
      await api.post('/page-templates', {
        title: newTitle,
        pageType: newPageType,
        slug: newSlug,
        parentPathway: newParentPathway || null,
        sortOrder: newSortOrder ? Number(newSortOrder) : templates.length + 1
      });
      const successMsg = `Template chapter "${newTitle}" created.`;
      setTemplatesSuccess(successMsg);
      toast.success(successMsg);
      setNewTitle('');
      setNewPageType('custom');
      setNewSlug('');
      setNewParentPathway('');
      setNewSortOrder('');
      await loadTemplates();
    } catch (err: any) {
      setTemplatesError(err.message || 'Failed to create template chapter.');
      toast.error(err);
    } finally {
      setCreatingTemplate(false);
    }
  };

  const handleNewTitleChange = (val: string) => {
    setNewTitle(val);
    setNewSlug(slugify(val));
  };

  const handleEditTitleChange = (val: string) => {
    setEditTitle(val);
    setEditSlug(slugify(val));
  };

  // Start editing a template
  const handleStartEdit = (tpl: PageTemplate) => {
    setEditingTplId(tpl.id);
    setEditTitle(tpl.title);
    setEditPageType(tpl.pageType);
    setEditSlug(tpl.slug);
    setEditParentPathway(tpl.parentPathway || '');
    setEditSortOrder(String(tpl.sortOrder));
  };

  // Handle template update
  const handleUpdateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTplId) return;

    setTemplatesError(null);
    setTemplatesSuccess(null);
    setUpdatingTemplate(true);

    try {
      await api.patch(`/page-templates/${editingTplId}`, {
        title: editTitle,
        pageType: editPageType,
        slug: editSlug,
        parentPathway: editParentPathway || null,
        sortOrder: Number(editSortOrder)
      });
      const successMsg = `Template chapter updated.`;
      setTemplatesSuccess(successMsg);
      toast.success(successMsg);
      setEditingTplId(null);
      await loadTemplates();
    } catch (err: any) {
      setTemplatesError(err.message || 'Failed to update template chapter.');
      toast.error(err);
    } finally {
      setUpdatingTemplate(false);
    }
  };

  // Handle template deletion
  const handleDeleteTemplate = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the chapter template "${name}"?`)) return;
    setTemplatesError(null);
    setTemplatesSuccess(null);

    try {
      await api.delete(`/page-templates/${id}`);
      const successMsg = `Template chapter "${name}" deleted.`;
      setTemplatesSuccess(successMsg);
      toast.success(successMsg);
      await loadTemplates();
    } catch (err: any) {
      setTemplatesError(err.message || 'Failed to delete template chapter.');
      toast.error(err);
    }
  };

  // Handle reordering templates
  const handleMoveTemplate = async (index: number, direction: 'up' | 'down') => {
    const newTemplates = [...templates];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newTemplates.length) return;

    // Swap
    const temp = newTemplates[index];
    newTemplates[index] = newTemplates[targetIndex];
    newTemplates[targetIndex] = temp;

    // Send ordered list of IDs to backend
    setTemplates(newTemplates);
    try {
      await api.post('/page-templates/reorder', {
        orderedIds: newTemplates.map(t => t.id)
      });
      const successMsg = 'Chapter layout order updated.';
      setTemplatesSuccess(successMsg);
      toast.success(successMsg);
    } catch (err: any) {
      setTemplatesError(err.message || 'Failed to reorder templates.');
      toast.error(err);
      loadTemplates(); // Revert back
    }
  };

  // Seed default templates helper
  const handleSeedDefaults = async () => {
    if (!confirm('Do you want to seed the database with the default 9 report chapters?')) return;
    setTemplatesLoading(true);
    setTemplatesError(null);
    setTemplatesSuccess(null);

    const defaultPages = [
      { title: 'About', pageType: 'about', slug: 'about', sortOrder: 1 },
      { title: 'Executive Summary', pageType: 'executive_summary', slug: 'executive-summary', sortOrder: 2 },
      { title: 'Drivers of Change', pageType: 'drivers_of_change', slug: 'drivers-of-change', sortOrder: 3 },
      { title: 'Sector Overview', pageType: 'industry_overview', slug: 'sector-overview', sortOrder: 4, parentPathway: 'executive_summary' },
      { title: 'State & Territory Profile', pageType: 'state_territory', slug: 'state-territory-profile', sortOrder: 5, parentPathway: 'executive_summary' },
      { title: 'Industry Profile', pageType: 'industry_profile', slug: 'industry-profile', sortOrder: 6, parentPathway: 'executive_summary' },
      { title: 'Workforce Insights', pageType: 'workforce_insights', slug: 'workforce-insights', sortOrder: 7 },
      { title: 'Workforce Strategies', pageType: 'strategies', slug: 'workforce-strategies', sortOrder: 8 },
      { title: 'Looking Forward', pageType: 'looking_forward', slug: 'looking-forward', sortOrder: 9 },
    ];

    try {
      for (const page of defaultPages) {
        await api.post('/page-templates', page);
      }
      const successMsg = 'Default report chapters seeded successfully.';
      setTemplatesSuccess(successMsg);
      toast.success(successMsg);
      await loadTemplates();
    } catch (err: any) {
      setTemplatesError(err.message || 'Failed to seed default templates.');
      toast.error(err);
    } finally {
      setTemplatesLoading(false);
    }
  };

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Industry state
  const [indName, setIndName] = useState('');
  const [indSlug, setIndSlug] = useState('');
  const [indDescription, setIndDescription] = useState('');
  const [indSortOrder, setIndSortOrder] = useState('');
  const [indLoading, setIndLoading] = useState(false);
  const [indSuccess, setIndSuccess] = useState<string | null>(null);
  const [indError, setIndError] = useState<string | null>(null);

  // Year state
  const [yearValue, setYearValue] = useState('');
  const [yearLabel, setYearLabel] = useState('');
  const [yearLoading, setYearLoading] = useState(false);
  const [yearSuccess, setYearSuccess] = useState<string | null>(null);
  const [yearError, setYearError] = useState<string | null>(null);

  const isEditorOrAdmin = user?.role === 'admin' || user?.role === 'editor';

  // Handle password change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!currentPassword) {
      const msg = 'Current password is required.';
      setPasswordError(msg);
      toast.error(msg);
      return;
    }
    if (newPassword.length < 8) {
      const msg = 'New password must be at least 8 characters.';
      setPasswordError(msg);
      toast.error(msg);
      return;
    }
    if (newPassword !== confirmPassword) {
      const msg = 'New password and password confirmation do not match.';
      setPasswordError(msg);
      toast.error(msg);
      return;
    }

    setPasswordLoading(true);
    try {
      await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      const successMsg = 'Password changed successfully.';
      setPasswordSuccess(successMsg);
      toast.success(successMsg);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to change password.');
      toast.error(err);
    } finally {
      setPasswordLoading(false);
    }
  };

  // Handle industry creation
  const handleAddIndustry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIndError(null);
    setIndSuccess(null);

    if (!indName.trim()) {
      const msg = 'Industry name is required.';
      setIndError(msg);
      toast.error(msg);
      return;
    }
    if (!indSlug.trim()) {
      const msg = 'Slug is required.';
      setIndError(msg);
      toast.error(msg);
      return;
    }
    if (!/^[a-z0-9-]+$/.test(indSlug)) {
      const msg = 'Slug must only contain lowercase alphanumeric characters and hyphens.';
      setIndError(msg);
      toast.error(msg);
      return;
    }

    setIndLoading(true);
    try {
      await api.post('/industries', {
        name: indName,
        slug: indSlug,
        description: indDescription || undefined,
        sortOrder: indSortOrder ? Number(indSortOrder) : undefined
      });
      const successMsg = `Industry "${indName}" registered successfully.`;
      setIndSuccess(successMsg);
      toast.success(successMsg);
      setIndName('');
      setIndSlug('');
      setIndDescription('');
      setIndSortOrder('');
    } catch (err: any) {
      setIndError(err.message || 'Failed to add industry.');
      toast.error(err);
    } finally {
      setIndLoading(false);
    }
  };

  // Auto-fill slug as user types industry name
  const handleIndNameChange = (val: string) => {
    setIndName(val);
    setIndSlug(slugify(val));
  };

  // Handle year creation
  const handleAddYear = async (e: React.FormEvent) => {
    e.preventDefault();
    setYearError(null);
    setYearSuccess(null);

    const numericYear = Number(yearValue);
    if (isNaN(numericYear) || !Number.isInteger(numericYear) || numericYear < 2000 || numericYear > 2100) {
      const msg = 'Year must be an integer between 2000 and 2100.';
      setYearError(msg);
      toast.error(msg);
      return;
    }
    if (!yearLabel.trim()) {
      const msg = 'Label is required.';
      setYearError(msg);
      toast.error(msg);
      return;
    }

    setYearLoading(true);
    try {
      await api.post('/industries/years', {
        year: numericYear,
        label: yearLabel
      });
      const successMsg = `Report year "${yearLabel}" registered successfully.`;
      setYearSuccess(successMsg);
      toast.success(successMsg);
      setYearValue('');
      setYearLabel('');
    } catch (err: any) {
      setYearError(err.message || 'Failed to add year.');
      toast.error(err);
    } finally {
      setYearLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Breadcrumb & Title ── */}
      <div>
        <div className="mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted">
          <span>Home</span>
          <span>/</span>
          <span>Admin</span>
          <span>/</span>
          <span className="text-primary font-bold">Settings</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Settings Panel
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Card 1: Change Password */}
        <div className="border border-border bg-card p-6 shadow-sm relative">
          <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
            * SECURITY SETTINGS
          </span>
          <div className="flex items-center gap-2 mb-6">
            <KeyRound className="h-5 w-5 text-muted" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
              Change Password
            </h2>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            {passwordSuccess && (
              <div className="border border-green-200 bg-green-50/50 p-3 text-xs text-green-700 font-mono">
                * SUCCESS: {passwordSuccess.toUpperCase()}
              </div>
            )}
            {passwordError && (
              <div className="border border-red-200 bg-red-50/50 p-3 text-xs text-red-700 font-mono">
                * ERROR: {passwordError.toUpperCase()}
              </div>
            )}

            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={passwordLoading}
                className="border border-primary bg-primary px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                <Save className="h-3.5 w-3.5" />
                {passwordLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>

        {/* metadata controls wrapper */}
        <div className="space-y-8">
          {/* Card 2: Add New Industry */}
          <div className="border border-border bg-card p-6 shadow-sm relative">
            <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
              * METADATA CREATOR
            </span>
            <div className="flex items-center gap-2 mb-6">
              <Building className="h-5 w-5 text-muted" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
                Register Industry Segment
              </h2>
            </div>

            {!isEditorOrAdmin ? (
              <div className="text-xs text-muted/60 font-mono py-6 italic border border-dashed border-border p-4 bg-sidebar/20 text-center">
                * Access Denied: Only Admins or Editors can register new industry segments.
              </div>
            ) : (
              <form onSubmit={handleAddIndustry} className="space-y-4">
                {indSuccess && (
                  <div className="border border-green-200 bg-green-50/50 p-3 text-xs text-green-700 font-mono">
                    * SUCCESS: {indSuccess.toUpperCase()}
                  </div>
                )}
                {indError && (
                  <div className="border border-red-200 bg-red-50/50 p-3 text-xs text-red-700 font-mono">
                    * ERROR: {indError.toUpperCase()}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                    Industry Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Health & Community Services"
                    value={indName}
                    onChange={(e) => handleIndNameChange(e.target.value)}
                    className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. health-community-services"
                    value={indSlug}
                    onChange={(e) => setIndSlug(e.target.value)}
                    className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      Description (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Enter brief description of this segment..."
                      value={indDescription}
                      onChange={(e) => setIndDescription(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                      Sort Order Position (Optional)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 1"
                      value={indSortOrder}
                      onChange={(e) => setIndSortOrder(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={indLoading}
                    className="border border-primary bg-primary px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    {indLoading ? 'Registering...' : 'Register Industry'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Card 3: Add New Year */}
          <div className="border border-border bg-card p-6 shadow-sm relative">
            <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
              * METADATA CREATOR
            </span>
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-muted" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
                Register Report Year
              </h2>
            </div>

            {!isEditorOrAdmin ? (
              <div className="text-xs text-muted/60 font-mono py-6 italic border border-dashed border-border p-4 bg-sidebar/20 text-center">
                * Access Denied: Only Admins or Editors can register new report years.
              </div>
            ) : (
              <form onSubmit={handleAddYear} className="space-y-4">
                {yearSuccess && (
                  <div className="border border-green-200 bg-green-50/50 p-3 text-xs text-green-700 font-mono">
                    * SUCCESS: {yearSuccess.toUpperCase()}
                  </div>
                )}
                {yearError && (
                  <div className="border border-red-200 bg-red-50/50 p-3 text-xs text-red-700 font-mono">
                    * ERROR: {yearError.toUpperCase()}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                    Calendar Year (YYYY)
                  </label>
                  <input
                    type="number"
                    required
                    min={2000}
                    max={2100}
                    placeholder="e.g. 2027"
                    value={yearValue}
                    onChange={(e) => setYearValue(e.target.value)}
                    className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                    Display Label
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2027"
                    value={yearLabel}
                    onChange={(e) => setYearLabel(e.target.value)}
                    className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={yearLoading}
                    className="border border-primary bg-primary px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    {yearLoading ? 'Registering...' : 'Register Year'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Chapter Templates Management Card */}
      <div className="border border-border bg-card p-6 shadow-sm relative">
        <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
          * REPORT BLUEPRINT
        </span>
        <div className="flex items-center justify-between mb-6 border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
              Global Report Chapter Templates
            </h2>
          </div>
          {templates.length === 0 && !templatesLoading && isEditorOrAdmin && (
            <button
              onClick={handleSeedDefaults}
              className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider px-3 py-1.5 border border-primary bg-primary text-white hover:bg-active transition-colors cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Seed Default Chapters
            </button>
          )}
        </div>

        {templatesSuccess && (
          <div className="mb-4 border border-green-200 bg-green-50/50 p-3 text-xs text-green-700 font-mono">
            * SUCCESS: {templatesSuccess.toUpperCase()}
          </div>
        )}
        {templatesError && (
          <div className="mb-4 border border-red-200 bg-red-50/50 p-3 text-xs text-red-700 font-mono">
            * ERROR: {templatesError.toUpperCase()}
          </div>
        )}

        {!isEditorOrAdmin ? (
          <div className="text-xs text-muted/60 font-mono py-6 italic border border-dashed border-border p-4 bg-sidebar/20 text-center">
            * Access Denied: Only Admins or Editors can manage report chapter templates.
          </div>
        ) : (
          <div className="space-y-6">
            {/* Split layout: Form on Left, Hierarchy on Right */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Creator Form */}
              <div className="lg:col-span-1 border-r border-border/60 pr-8 space-y-4">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                  {editingTplId ? 'Edit Chapter Template' : 'Add Chapter Template'}
                </h3>
                <form onSubmit={editingTplId ? handleUpdateTemplate : handleAddTemplate} className="space-y-3">
                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Executive Summary"
                      value={editingTplId ? editTitle : newTitle}
                      onChange={(e) => editingTplId ? handleEditTitleChange(e.target.value) : handleNewTitleChange(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Slug (Auto-generated) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. executive-summary"
                      value={editingTplId ? editSlug : newSlug}
                      onChange={(e) => editingTplId ? setEditSlug(e.target.value) : setNewSlug(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none font-mono text-[11px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Page Type *</label>
                    <select
                      value={editingTplId ? editPageType : newPageType}
                      onChange={(e) => editingTplId ? setEditPageType(e.target.value) : setNewPageType(e.target.value)}
                      className="w-full border border-border bg-card px-2.5 py-1.5 text-xs text-primary focus:outline-none"
                    >
                      <option value="custom">Custom</option>
                      <option value="about">About / Info</option>
                      <option value="executive_summary">Executive Summary</option>
                      <option value="drivers_of_change">Drivers of Change</option>
                      <option value="industry_overview">Industry Overview</option>
                      <option value="state_territory">State & Territory Profile</option>
                      <option value="industry_profile">Industry Profile</option>
                      <option value="workforce_insights">Workforce Insights</option>
                      <option value="strategies">Strategies</option>
                      <option value="strategy_update">Strategy Update</option>
                      <option value="existing_strategies">Existing Strategies</option>
                      <option value="federal_initiatives">Federal Initiatives</option>
                      <option value="looking_forward">Looking Forward</option>
                      <option value="pdf_download">PDF Download</option>
                      <option value="methodology">Methodology</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Parent Chapter (Optional)</label>
                    <select
                      value={editingTplId ? editParentPathway : newParentPathway}
                      onChange={(e) => editingTplId ? setEditParentPathway(e.target.value) : setNewParentPathway(e.target.value)}
                      className="w-full border border-border bg-card px-2.5 py-1.5 text-xs text-primary focus:outline-none"
                    >
                      <option value="">— None (Top-level) —</option>
                      {templates
                        .filter(t => !t.parentPathway && t.id !== editingTplId)
                        .map(t => (
                          <option key={t.id} value={t.pageType}>{t.title}</option>
                        ))
                      }
                    </select>
                    <p className="font-mono text-[7px] text-muted/65 leading-relaxed mt-0.5">Nest this chapter inside another parent (e.g. Industry Overview segments).</p>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Sort Order Position</label>
                    <input
                      type="number"
                      placeholder="e.g. 1"
                      value={editingTplId ? editSortOrder : newSortOrder}
                      onChange={(e) => editingTplId ? setEditSortOrder(e.target.value) : setNewSortOrder(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex gap-2">
                    {editingTplId && (
                      <button
                        type="button"
                        onClick={() => setEditingTplId(null)}
                        className="flex-1 border border-border bg-card py-2 font-mono text-[9px] uppercase tracking-wider hover:bg-sidebar text-muted flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={creatingTemplate || updatingTemplate}
                      className="flex-1 border border-primary bg-primary py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {editingTplId ? (updatingTemplate ? 'Updating...' : 'Update Chapter') : (creatingTemplate ? 'Creating...' : 'Add Template')}
                    </button>
                  </div>
                </form>
              </div>

              {/* Hierarchy List */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                  Structure Template List
                </h3>

                {templatesLoading ? (
                  <div className="flex h-32 items-center justify-center border border-dashed border-border/80">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border border-primary border-t-transparent" />
                      <span className="font-mono text-[8px] uppercase tracking-widest text-muted">Retrieving chapter blueprint...</span>
                    </div>
                  </div>
                ) : templates.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-border bg-sidebar/10 p-6">
                    <p className="text-xs text-muted mb-2">No templates are defined in the database.</p>
                    <p className="text-[10px] text-muted/60 leading-relaxed max-w-sm mx-auto">
                      Click the "Seed Default Chapters" button above to populate standard chapters (About, Executive Summary, etc.) automatically.
                    </p>
                  </div>
                ) : (
                  (() => {
                    const topLevel = templates.filter(t => !t.parentPathway);
                    const subChapterMap: Record<string, PageTemplate[]> = {};
                    templates.filter(t => t.parentPathway).forEach(t => {
                      const key = t.parentPathway!;
                      if (!subChapterMap[key]) subChapterMap[key] = [];
                      subChapterMap[key].push(t);
                    });

                    return (
                      <div className="border border-border divide-y divide-border/60 bg-[#fafafa]/30">
                        {topLevel.map((tpl, idx) => {
                          const subs = subChapterMap[tpl.pageType] || [];
                          const globalIdx = templates.findIndex(t => t.id === tpl.id);

                          return (
                            <div key={tpl.id} className="p-3.5 hover:bg-sidebar/5 transition-colors">
                              <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  <span className="font-mono font-bold text-xs text-muted/50 w-5">
                                    {String(idx + 1).padStart(2, '0')}
                                  </span>
                                  <div>
                                    <h4 className="text-xs font-bold text-primary flex items-center gap-2 leading-none">
                                      {tpl.title}
                                      <span className="font-mono text-[7px] uppercase font-normal text-muted/60 border border-border px-1 py-0.5 bg-card">
                                        Type: {tpl.pageType}
                                      </span>
                                    </h4>
                                    <p className="font-mono text-[8px] text-muted mt-1">Slug: {tpl.slug} | Sort: {tpl.sortOrder}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    type="button"
                                    disabled={globalIdx === 0}
                                    onClick={() => handleMoveTemplate(globalIdx, 'up')}
                                    className="p-1 border border-border hover:bg-sidebar text-muted hover:text-primary transition-colors disabled:opacity-30 cursor-pointer"
                                    title="Move Up"
                                  >
                                    <ArrowUp className="h-3 w-3" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={globalIdx === templates.length - 1}
                                    onClick={() => handleMoveTemplate(globalIdx, 'down')}
                                    className="p-1 border border-border hover:bg-sidebar text-muted hover:text-primary transition-colors disabled:opacity-30 cursor-pointer"
                                    title="Move Down"
                                  >
                                    <ArrowDown className="h-3 w-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleStartEdit(tpl)}
                                    className="p-1 border border-border hover:bg-sidebar text-primary transition-colors cursor-pointer"
                                    title="Edit Template"
                                  >
                                    <Edit2 className="h-3 w-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteTemplate(tpl.id, tpl.title)}
                                    className="p-1 border border-red-200 hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                                    title="Delete Template"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>

                              {/* Nested Sub-chapters list */}
                              {subs.length > 0 && (
                                <div className="mt-3.5 pl-6 border-l-2 border-border/40 space-y-2.5">
                                  {subs.map((sub, sIdx) => {
                                    const subGlobalIdx = templates.findIndex(t => t.id === sub.id);

                                    return (
                                      <div key={sub.id} className="flex items-center justify-between gap-4 py-1.5 border-b border-border/30 last:border-0 hover:bg-sidebar/10 p-2">
                                        <div>
                                          <h5 className="text-[11px] font-bold text-primary flex items-center gap-1.5 leading-none">
                                            {sub.title}
                                            <span className="font-mono text-[6px] uppercase font-normal text-muted/65 border border-border/60 px-1 py-0.5 bg-card">
                                              Type: {sub.pageType}
                                            </span>
                                          </h5>
                                          <p className="font-mono text-[8px] text-muted mt-1">Slug: {sub.slug} | Sort: {sub.sortOrder}</p>
                                        </div>

                                        <div className="flex items-center gap-0.5 shrink-0">
                                          <button
                                            type="button"
                                            disabled={subGlobalIdx === 0}
                                            onClick={() => handleMoveTemplate(subGlobalIdx, 'up')}
                                            className="p-0.5 border border-border hover:bg-sidebar text-muted hover:text-primary transition-colors disabled:opacity-30 cursor-pointer"
                                            title="Move Up"
                                          >
                                            <ArrowUp className="h-2.5 w-2.5" />
                                          </button>
                                          <button
                                            type="button"
                                            disabled={subGlobalIdx === templates.length - 1}
                                            onClick={() => handleMoveTemplate(subGlobalIdx, 'down')}
                                            className="p-0.5 border border-border hover:bg-sidebar text-muted hover:text-primary transition-colors disabled:opacity-30 cursor-pointer"
                                            title="Move Down"
                                          >
                                            <ArrowDown className="h-2.5 w-2.5" />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleStartEdit(sub)}
                                            className="p-0.5 border border-border hover:bg-sidebar text-primary transition-colors cursor-pointer"
                                            title="Edit Sub-Template"
                                          >
                                            <Edit2 className="h-2.5 w-2.5" />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleDeleteTemplate(sub.id, sub.title)}
                                            className="p-0.5 border border-red-100 hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                                            title="Delete Sub-Template"
                                          >
                                            <Trash2 className="h-2.5 w-2.5" />
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
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
          </div>
        )}
      </div>
    </div>
  );
}
