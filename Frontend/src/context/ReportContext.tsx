'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';
import { useAuth } from './AuthContext';

export interface Report {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  coverImageUrl?: string;
  pdfFileUrl?: string;
  psaSectorPageUrl?: string;
  contactUrl?: string;
  cardNote?: string;
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  sortOrder: number;
  industryId: string;
  yearId: string;
}


interface ReportContextType {
  reports: Report[];
  activeReport: Report | null;
  loading: boolean;
  setActiveReport: (report: Report | null) => void;
  refreshReports: () => Promise<void>;
  selectReportBySlug: (slug: string) => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export function ReportProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [activeReport, setActiveReportState] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshReports = async () => {
    if (!user) {
      setReports([]);
      setActiveReportState(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get<any>('/reports', {
        params: { limit: 100, page: 1 }
      });
      const rows: Report[] = Array.isArray(res) ? res : (res?.rows || []);
      setReports(rows);

      // Restore active report from local storage, or fall back to the first one in the list
      const savedReportId = window.localStorage.getItem('psa_active_report_id');
      const foundReport = rows.find(r => r.id === savedReportId);
      if (foundReport) {
        setActiveReportState(foundReport);
      } else if (rows.length > 0) {
        setActiveReportState(rows[0]);
        window.localStorage.setItem('psa_active_report_id', rows[0].id);
      } else {
        setActiveReportState(null);
      }
    } catch (err) {
      console.error('Failed to load reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshReports();
  }, [user]);

  const setActiveReport = (report: Report | null) => {
    setActiveReportState(report);
    if (report) {
      window.localStorage.setItem('psa_active_report_id', report.id);
    } else {
      window.localStorage.removeItem('psa_active_report_id');
    }
  };

  const selectReportBySlug = (slug: string) => {
    const report = reports.find(r => r.slug === slug);
    if (report) {
      setActiveReport(report);
    }
  };

  return (
    <ReportContext.Provider value={{
      reports,
      activeReport,
      loading,
      setActiveReport,
      refreshReports,
      selectReportBySlug
    }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReport() {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
}
