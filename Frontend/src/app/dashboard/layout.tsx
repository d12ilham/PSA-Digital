"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useReport, Report } from "@/context/ReportContext";
import { api } from "@/lib/api";
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
  Settings,
  Image as ImageIcon,
  Globe,
} from "lucide-react";

interface PageItem {
  id: string;
  title: string;
  pageType: string;
  sortOrder: number;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, loading: authLoading } = useAuth();
  const {
    reports,
    activeReport,
    setActiveReport,
    loading: reportsLoading,
  } = useReport();
  const router = useRouter();
  const pathname = usePathname();

  const [pages, setPages] = useState<PageItem[]>([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  // Fetch pages whenever active report changes
  useEffect(() => {
    if (activeReport) {
      setPagesLoading(true);
      api
        .get<PageItem[]>(`/reports/${activeReport.id}/pages`)
        .then((res) => {
          // Sort by sortOrder
          setPages(res.sort((a, b) => a.sortOrder - b.sortOrder));
        })
        .catch((err) => {
          console.error("Failed to load report pages:", err);
          setPages([]);
        })
        .finally(() => {
          setPagesLoading(false);
        });
    } else {
      setPages([]);
    }
  }, [activeReport]);

  // Reset active report context when navigating away from report edit workflow
  useEffect(() => {
    const isEditingReport =
      pathname.startsWith("/dashboard/reports/") ||
      pathname.startsWith("/dashboard/pages/");
    if (!isEditingReport && activeReport) {
      setActiveReport(null);
    }
  }, [pathname, activeReport, setActiveReport]);

  if (authLoading || reportsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border border-primary border-t-transparent" />
          <span className="font-mono text-xs uppercase text-muted">
            Loading Workspace...
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // AuthGuard handles redirect in AuthContext
  }

  // Find page ID helper for sidebar links
  const getPageIdByType = (type: string) => {
    return pages.find((p) => p.pageType === type)?.id;
  };

  // Determine current chapter progress metrics based on path
  const getProgressDetails = () => {
    if (pathname.includes("/pages/")) {
      const pageId = pathname.split("/pages/")[1];
      const pageObj = pages.find((p) => p.id === pageId);
      if (pageObj) {
        switch (pageObj.pageType) {
          case "about":
          case "methodology":
            return { chapter: "01", progress: "14%" };
          case "executive_summary":
          case "transition_landing":
            return { chapter: "02", progress: "28%" };
          case "drivers_of_change":
            return { chapter: "03", progress: "42%" };
          case "industry_overview":
          case "state_territory":
          case "industry_profile":
            return { chapter: "04", progress: "57%" };
          case "workforce_insights":
            return { chapter: "05", progress: "71%" };
          case "strategies":
          case "strategy_update":
            return { chapter: "06", progress: "85%" };
          case "looking_forward":
            return { chapter: "07", progress: "100%" };
          default:
            return { chapter: "04", progress: "57%" };
        }
      }
    } else if (pathname.includes("/strategies")) {
      return { chapter: "06", progress: "85%" };
    } else if (pathname.includes("/insights")) {
      return { chapter: "05", progress: "71%" };
    }
    return { chapter: "01", progress: "14%" };
  };

  const { chapter, progress } = getProgressDetails();

  // Helper to determine link highlighting
  const isActiveLink = (path: string, exact = false) => {
    return exact ? pathname === path : pathname.startsWith(path);
  };

  const activePageType = () => {
    if (pathname.includes("/pages/")) {
      const pageId = pathname.split("/pages/")[1];
      return pages.find((p) => p.id === pageId)?.pageType || "";
    }
    return "";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar Nav */}
      <aside className="flex w-64 flex-col bg-[#161b01] text-white/90 overflow-y-auto justify-between select-none p-4 shrink-0 border-r border-white/5">
        <div className="flex flex-col">
          {/* Brand Logo Header */}
          <div className="px-2 mb-6 border-b border-white/10 pb-5 pt-2 flex justify-center">
            <img
              src="/uploads/7c44c719-ad10-460e-a0f9-b971240d10fc.png"
              alt="Public Skills Australia"
              className="h-11 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Primary Navigation */}
          <div className="mb-6">
            <span className="font-sans text-xs uppercase text-[#FAFAF0]/40 block px-3 mb-2.5 font-bold">
              Main
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => router.push("/dashboard")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-sans rounded-md transition-all text-left cursor-pointer ${
                    isActiveLink("/dashboard", true)
                      ? "font-bold bg-[#8AC900] text-[#161b01] shadow-none"
                      : "text-white/80 hover:bg-[#252d02] hover:text-white"
                  }`}
                >
                  <Sliders
                    className={`h-4 w-4 ${isActiveLink("/dashboard", true) ? "text-[#161b01]" : "text-white/60"}`}
                  />
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/dashboard/reports")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-sans rounded-md transition-all text-left cursor-pointer ${
                    isActiveLink("/dashboard/reports")
                      ? "font-bold bg-[#8AC900] text-[#161b01] shadow-none"
                      : "text-white/80 hover:bg-[#252d02] hover:text-white"
                  }`}
                >
                  <BookOpen
                    className={`h-4 w-4 ${isActiveLink("/dashboard/reports") ? "text-[#161b01]" : "text-white/60"}`}
                  />
                  Reports
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/dashboard/media")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-sans rounded-md transition-all text-left cursor-pointer ${
                    isActiveLink("/dashboard/media")
                      ? "font-bold bg-[#8AC900] text-[#161b01] shadow-none"
                      : "text-white/80 hover:bg-[#252d02] hover:text-white"
                  }`}
                >
                  <ImageIcon
                    className={`h-4 w-4 ${isActiveLink("/dashboard/media") ? "text-[#161b01]" : "text-white/60"}`}
                  />
                  Media Library
                </button>
              </li>
            </ul>
          </div>

          {/* Admin Controls */}
          <div>
            <span className="font-sans text-xs uppercase text-[#FAFAF0]/40 block px-3 mb-2.5 font-bold">
              Admin Controls
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => router.push("/dashboard/users")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-sans rounded-md transition-all text-left cursor-pointer ${
                    isActiveLink("/dashboard/users")
                      ? "font-bold bg-[#8AC900] text-[#161b01] shadow-none"
                      : "text-white/80 hover:bg-[#252d02] hover:text-white"
                  }`}
                >
                  <Users
                    className={`h-4 w-4 ${isActiveLink("/dashboard/users") ? "text-[#161b01]" : "text-white/60"}`}
                  />
                  Manage Users
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/dashboard/site-settings")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-sans rounded-md transition-all text-left cursor-pointer ${
                    isActiveLink("/dashboard/site-settings")
                      ? "font-bold bg-[#8AC900] text-[#161b01] shadow-none"
                      : "text-white/80 hover:bg-[#252d02] hover:text-white"
                  }`}
                >
                  <Globe
                    className={`h-4 w-4 ${isActiveLink("/dashboard/site-settings") ? "text-[#161b01]" : "text-white/60"}`}
                  />
                  Site Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/dashboard/settings")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-sans rounded-md transition-all text-left cursor-pointer ${
                    isActiveLink("/dashboard/settings")
                      ? "font-bold bg-[#8AC900] text-[#161b01] shadow-none"
                      : "text-white/80 hover:bg-[#252d02] hover:text-white"
                  }`}
                >
                  <Settings
                    className={`h-4 w-4 ${isActiveLink("/dashboard/settings") ? "text-[#161b01]" : "text-white/60"}`}
                  />
                  Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* User Profile & Logout button at bottom */}
        <div className="border-t border-white/10 pt-4 mt-auto space-y-3">
          <div className="flex flex-col px-3">
            <span className="text-sm font-bold text-white leading-tight">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-xs text-[#FAFAF0]/40 font-medium uppercase">
              {user.role}
            </span>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-sans font-bold bg-[#efece6] text-red-700 hover:bg-red-50 hover:border-red-200 transition-all rounded-lg cursor-pointer border border-transparent"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Content Canvas */}
      <main className="flex-1 overflow-y-auto bg-background p-8 focus:outline-none">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
