'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { 
  KeyRound, 
  Building, 
  Calendar, 
  Settings,
  Plus,
  Save
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

export default function SettingsPage() {
  const { user } = useAuth();
  
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
      setPasswordError('Current password is required.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and password confirmation do not match.');
      return;
    }

    setPasswordLoading(true);
    try {
      await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      setPasswordSuccess('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to change password.');
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
      setIndError('Industry name is required.');
      return;
    }
    if (!indSlug.trim()) {
      setIndError('Slug is required.');
      return;
    }
    if (!/^[a-z0-9-]+$/.test(indSlug)) {
      setIndError('Slug must only contain lowercase alphanumeric characters and hyphens.');
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
      setIndSuccess(`Industry "${indName}" registered successfully.`);
      setIndName('');
      setIndSlug('');
      setIndDescription('');
      setIndSortOrder('');
    } catch (err: any) {
      setIndError(err.message || 'Failed to add industry.');
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
      setYearError('Year must be an integer between 2000 and 2100.');
      return;
    }
    if (!yearLabel.trim()) {
      setYearError('Label is required.');
      return;
    }

    setYearLoading(true);
    try {
      await api.post('/industries/years', {
        year: numericYear,
        label: yearLabel
      });
      setYearSuccess(`Report year "${yearLabel}" registered successfully.`);
      setYearValue('');
      setYearLabel('');
    } catch (err: any) {
      setYearError(err.message || 'Failed to add year.');
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
    </div>
  );
}
