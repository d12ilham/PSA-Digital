'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useReport, Report } from '@/context/ReportContext';
import { api } from '@/lib/api';
import { 
  ChevronDown, 
  LogOut, 
  Search, 
  Sliders, 
  Users, 
  FileText, 
  BookOpen, 
  Activity, 
  Eye,
  Settings
} from 'lucide-react';

interface PageItem {
  id: string;
  title: string;
  pageType: string;
  sortOrder: number;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, loading: authLoading } = useAuth();
  const { reports, activeReport, setActiveReport, loading: reportsLoading } = useReport();
  const router = useRouter();
  const pathname = usePathname();

  const [pages, setPages] = useState<PageItem[]>([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  // Fetch pages whenever active report changes
  useEffect(() => {
    if (activeReport) {
      setPagesLoading(true);
      api.get<PageItem[]>(`/reports/${activeReport.id}/pages`)
        .then(res => {
          // Sort by sortOrder
          setPages(res.sort((a, b) => a.sortOrder - b.sortOrder));
        })
        .catch(err => {
          console.error('Failed to load report pages:', err);
          setPages([]);
        })
        .finally(() => {
          setPagesLoading(false);
        });
    } else {
      setPages([]);
    }
  }, [activeReport]);

  if (authLoading || reportsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border border-primary border-t-transparent" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Loading Workspace...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // AuthGuard handles redirect in AuthContext
  }

  // Find page ID helper for sidebar links
  const getPageIdByType = (type: string) => {
    return pages.find(p => p.pageType === type)?.id;
  };

  // Determine current chapter progress metrics based on path
  const getProgressDetails = () => {
    if (pathname.includes('/pages/')) {
      const pageId = pathname.split('/pages/')[1];
      const pageObj = pages.find(p => p.id === pageId);
      if (pageObj) {
        switch (pageObj.pageType) {
          case 'about':
          case 'methodology':
            return { chapter: '01', progress: '14%' };
          case 'executive_summary':
          case 'transition_landing':
            return { chapter: '02', progress: '28%' };
          case 'drivers_of_change':
            return { chapter: '03', progress: '42%' };
          case 'industry_overview':
          case 'state_territory':
          case 'industry_profile':
            return { chapter: '04', progress: '57%' };
          case 'workforce_insights':
            return { chapter: '05', progress: '71%' };
          case 'strategies':
          case 'strategy_update':
            return { chapter: '06', progress: '85%' };
          case 'looking_forward':
            return { chapter: '07', progress: '100%' };
          default:
            return { chapter: '04', progress: '57%' };
        }
      }
    } else if (pathname.includes('/strategies')) {
      return { chapter: '06', progress: '85%' };
    } else if (pathname.includes('/insights')) {
      return { chapter: '05', progress: '71%' };
    }
    return { chapter: '01', progress: '14%' };
  };

  const { chapter, progress } = getProgressDetails();

  // Helper to determine link highlighting
  const isActiveLink = (path: string, exact = false) => {
    return exact ? pathname === path : pathname.startsWith(path);
  };

  const activePageType = () => {
    if (pathname.includes('/pages/')) {
      const pageId = pathname.split('/pages/')[1];
      return pages.find(p => p.id === pageId)?.pageType || '';
    }
    return '';
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* ── Top Header Bar ── */}
      <header className="flex h-16 w-full items-center justify-between border-b border-border bg-card px-6 z-10">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div 
            onClick={() => router.push('/dashboard')} 
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="flex h-7 w-7 items-center justify-center border border-primary bg-sidebar text-[10px] font-bold tracking-wider font-mono">
              PSA
            </span>
            <div className="flex flex-col">
              <span className="font-sans text-sm font-bold tracking-tight text-primary leading-tight">
                Workforce Insights
              </span>
              <span className="font-mono text-[8px] uppercase tracking-widest text-muted">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-border" />

          {/* Active Report Switcher */}
          <div className="relative">
            <button 
              onClick={() => setSwitcherOpen(!switcherOpen)}
              className="flex items-center gap-2 border border-border px-3 py-1.5 bg-[#fdfdfc] text-xs font-mono font-medium hover:bg-sidebar transition-colors"
            >
              {activeReport ? activeReport.title.replace(' Workforce Insights Report', '') : 'Select Report'}
              <ChevronDown className="h-3 w-3 text-muted" />
            </button>

            {switcherOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSwitcherOpen(false)} />
                <div className="absolute left-0 mt-1 w-64 border border-border bg-card shadow-sm z-20">
                  <div className="border-b border-border bg-sidebar p-2 text-[9px] font-mono text-muted uppercase tracking-wider">
                    Select Active Dataset
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {reports.map((rep) => (
                      <button
                        key={rep.id}
                        onClick={() => {
                          setActiveReport(rep);
                          setSwitcherOpen(false);
                          router.push('/dashboard');
                        }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-sidebar font-sans ${activeReport?.id === rep.id ? 'font-bold bg-sidebar/50' : 'text-primary'}`}
                      >
                        {rep.title}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Middle Search Mockup */}
        <div className="hidden md:flex items-center w-72 relative">
          <input
            type="text"
            readOnly
            placeholder="Search report items..."
            className="w-full border border-border/80 bg-[#fdfdfc] pl-8 pr-3 py-1 text-xs font-mono placeholder:text-muted/50 rounded-none focus:outline-none"
          />
          <Search className="absolute left-2.5 h-3 w-3 text-muted/60" />
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col text-right">
            <span className="text-xs font-bold font-sans text-primary">
              {user.firstName} {user.lastName}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-wider text-muted font-semibold">
              {user.role}
            </span>
          </div>

          <button 
            onClick={() => router.push('/dashboard')}
            className={`border border-border px-3 py-1 bg-card text-xs font-mono font-medium hover:bg-sidebar transition-colors ${isActiveLink('/dashboard', true) ? 'bg-sidebar border-primary/50' : ''}`}
          >
            Overview
          </button>

          <button 
            onClick={logout}
            className="flex items-center justify-center p-1.5 border border-border bg-[#fbf5f5] text-red-700 hover:bg-red-50 hover:border-red-200 transition-colors"
            title="Log Out"
          >
            <LogOut className="h-4.5 w-4.5" />
          </button>
        </div>
      </header>

      {/* ── Main Layout Workspace ── */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar Nav */}
        <aside className="flex w-64 flex-col border-r border-border bg-sidebar overflow-y-auto justify-between select-none">
          
          <div className="flex flex-col py-6">
            
            {/* Active Report Indicator Card */}
            {activeReport && (
              <div className="px-5 mb-6">
                <span className="font-mono text-[8px] uppercase tracking-widest text-muted block mb-1">
                  Active Report Context
                </span>
                <span className="text-xs font-bold font-sans text-primary block leading-tight">
                  2026 · {activeReport.title.replace(' Workforce Insights Report 2026', '')}
                </span>
                <span className="wireframe-badge mt-2 inline-block">
                  {activeReport.status.toUpperCase()}
                </span>
              </div>
            )}

            {/* Content Chapters Nav */}
            <div className="px-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted block px-2 mb-3">
                Contents
              </span>
              <ul className="space-y-1">
                {/* 01 About */}
                <li>
                  <button
                    onClick={() => {
                      const id = getPageIdByType('about') || getPageIdByType('methodology');
                      if (id) router.push(`/dashboard/pages/${id}`);
                    }}
                    disabled={!getPageIdByType('about') && !getPageIdByType('methodology')}
                    className={`w-full flex items-center px-2 py-1.5 text-xs font-sans rounded transition-colors text-left hover:bg-border/30 disabled:opacity-40 ${
                      activePageType() === 'about' || activePageType() === 'methodology'
                        ? 'font-bold bg-border/40 text-primary'
                        : 'text-primary/80'
                    }`}
                  >
                    <span className="font-mono font-bold text-[10px] w-6 mr-1">01</span>
                    About
                  </button>
                </li>

                {/* 02 Executive Summary */}
                <li>
                  <button
                    onClick={() => {
                      const id = getPageIdByType('executive_summary');
                      if (id) router.push(`/dashboard/pages/${id}`);
                    }}
                    disabled={!getPageIdByType('executive_summary')}
                    className={`w-full flex items-center px-2 py-1.5 text-xs font-sans rounded transition-colors text-left hover:bg-border/30 disabled:opacity-40 ${
                      activePageType() === 'executive_summary' || activePageType() === 'transition_landing'
                        ? 'font-bold bg-border/40 text-primary'
                        : 'text-primary/80'
                    }`}
                  >
                    <span className="font-mono font-bold text-[10px] w-6 mr-1">02</span>
                    Executive Summary
                  </button>
                </li>

                {/* 03 Drivers of Change */}
                <li>
                  <button
                    onClick={() => {
                      const id = getPageIdByType('drivers_of_change');
                      if (id) router.push(`/dashboard/pages/${id}`);
                    }}
                    disabled={!getPageIdByType('drivers_of_change')}
                    className={`w-full flex items-center px-2 py-1.5 text-xs font-sans rounded transition-colors text-left hover:bg-border/30 disabled:opacity-40 ${
                      activePageType() === 'drivers_of_change'
                        ? 'font-bold bg-border/40 text-primary'
                        : 'text-primary/80'
                    }`}
                  >
                    <span className="font-mono font-bold text-[10px] w-6 mr-1">03</span>
                    Drivers of Change
                  </button>
                </li>

                {/* 04 Industry Overview */}
                <li className="space-y-1">
                  <div className="w-full flex items-center px-2 py-1.5 text-xs font-sans font-bold text-primary/80">
                    <span className="font-mono font-bold text-[10px] w-6 mr-1">04</span>
                    Industry Overview
                  </div>
                  {/* Sub pages */}
                  <ul className="pl-7 space-y-1 border-l border-border/60 ml-5">
                    <li>
                      <button
                        onClick={() => {
                          const id = getPageIdByType('industry_overview');
                          if (id) router.push(`/dashboard/pages/${id}`);
                        }}
                        disabled={!getPageIdByType('industry_overview')}
                        className={`w-full text-left px-2 py-1 text-[11px] rounded transition-colors hover:bg-border/30 disabled:opacity-40 ${
                          activePageType() === 'industry_overview' ? 'font-bold text-primary bg-border/40' : 'text-primary/70'
                        }`}
                      >
                        Sector Overview
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          const id = getPageIdByType('state_territory');
                          if (id) router.push(`/dashboard/pages/${id}`);
                        }}
                        disabled={!getPageIdByType('state_territory')}
                        className={`w-full text-left px-2 py-1 text-[11px] rounded transition-colors hover:bg-border/30 disabled:opacity-40 ${
                          activePageType() === 'state_territory' ? 'font-bold text-primary bg-border/40' : 'text-primary/70'
                        }`}
                      >
                        State & Territory Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          const id = getPageIdByType('industry_profile');
                          if (id) router.push(`/dashboard/pages/${id}`);
                        }}
                        disabled={!getPageIdByType('industry_profile')}
                        className={`w-full text-left px-2 py-1 text-[11px] rounded transition-colors hover:bg-border/30 disabled:opacity-40 ${
                          activePageType() === 'industry_profile' ? 'font-bold text-primary bg-border/40' : 'text-primary/70'
                        }`}
                      >
                        Industry Profile
                      </button>
                    </li>
                  </ul>
                </li>

                {/* 05 Workforce Insights */}
                <li>
                  <button
                    onClick={() => router.push('/dashboard/insights')}
                    disabled={!activeReport}
                    className={`w-full flex items-center px-2 py-1.5 text-xs font-sans rounded transition-colors text-left hover:bg-border/30 disabled:opacity-40 ${
                      isActiveLink('/dashboard/insights')
                        ? 'font-bold bg-border/40 text-primary'
                        : 'text-primary/80'
                    }`}
                  >
                    <span className="font-mono font-bold text-[10px] w-6 mr-1">05</span>
                    Workforce Insights
                  </button>
                </li>

                {/* 06 Workforce Strategies */}
                <li>
                  <button
                    onClick={() => router.push('/dashboard/strategies')}
                    disabled={!activeReport}
                    className={`w-full flex items-center px-2 py-1.5 text-xs font-sans rounded transition-colors text-left hover:bg-border/30 disabled:opacity-40 ${
                      isActiveLink('/dashboard/strategies')
                        ? 'font-bold bg-border/40 text-primary'
                        : 'text-primary/80'
                    }`}
                  >
                    <span className="font-mono font-bold text-[10px] w-6 mr-1">06</span>
                    Workforce Strategies
                  </button>
                </li>

                {/* 07 Looking Forward */}
                <li>
                  <button
                    onClick={() => {
                      const id = getPageIdByType('looking_forward');
                      if (id) router.push(`/dashboard/pages/${id}`);
                    }}
                    disabled={!getPageIdByType('looking_forward')}
                    className={`w-full flex items-center px-2 py-1.5 text-xs font-sans rounded transition-colors text-left hover:bg-border/30 disabled:opacity-40 ${
                      activePageType() === 'looking_forward'
                        ? 'font-bold bg-border/40 text-primary'
                        : 'text-primary/80'
                    }`}
                  >
                    <span className="font-mono font-bold text-[10px] w-6 mr-1">07</span>
                    Looking Forward
                  </button>
                </li>
              </ul>
            </div>

            {/* Admin Controls */}
            <div className="px-3 mt-8">
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted block px-2 mb-3">
                Admin Controls
              </span>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => router.push('/dashboard/reports')}
                    className={`w-full flex items-center gap-2.5 px-2 py-1.5 text-xs font-sans rounded transition-colors text-left hover:bg-border/30 ${
                      isActiveLink('/dashboard/reports') ? 'font-bold bg-border/40 text-primary' : 'text-primary/80'
                    }`}
                  >
                    <Sliders className="h-3.5 w-3.5 text-muted" />
                    Manage Reports
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push('/dashboard/users')}
                    className={`w-full flex items-center gap-2.5 px-2 py-1.5 text-xs font-sans rounded transition-colors text-left hover:bg-border/30 ${
                      isActiveLink('/dashboard/users') ? 'font-bold bg-border/40 text-primary' : 'text-primary/80'
                    }`}
                  >
                    <Users className="h-3.5 w-3.5 text-muted" />
                    Manage Users
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push('/dashboard/settings')}
                    className={`w-full flex items-center gap-2.5 px-2 py-1.5 text-xs font-sans rounded transition-colors text-left hover:bg-border/30 ${
                      isActiveLink('/dashboard/settings') ? 'font-bold bg-border/40 text-primary' : 'text-primary/80'
                    }`}
                  >
                    <Settings className="h-3.5 w-3.5 text-muted" />
                    Settings
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="border-t border-border bg-sidebar/50 p-4 font-mono text-[10px]">
            <div className="flex justify-between text-muted font-bold mb-1 uppercase tracking-wide">
              <span>Chapter {chapter} / 07</span>
              <span>{progress}</span>
            </div>
            <div className="h-1.5 w-full bg-border">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out" 
                style={{ width: progress }}
              />
            </div>
          </div>
        </aside>

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto bg-background p-8 focus:outline-none">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
