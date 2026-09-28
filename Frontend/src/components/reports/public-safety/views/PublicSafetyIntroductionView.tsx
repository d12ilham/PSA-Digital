"use client";

import React from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import { ArrowRight, BookOpen, ShieldCheck, Target } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PublicSafetyIntroductionView({
  slug,
  report,
}: {
  slug: string;
  report: any;
}) {
  const router = useRouter();

  const sections = [
    {
      title: "Executive Summary",
      desc: "The cross-sector Public Safety workforce narrative on one page.",
      path: "executive_summary",
    },
    {
      title: "Drivers of Change",
      desc: "Climate resilience, cyber transformation, and demographic shifts.",
      path: "drivers_of_change",
    },
    {
      title: "Industry Overview",
      desc: "Detailed profile and data breakdown across Police, Fire, and Defence.",
      path: "industry_overview",
    },
    {
      title: "Workforce Insights",
      desc: "Key strategic themes and capability needs across frontline agencies.",
      path: "workforce_insights",
    },
    {
      title: "Workforce Strategies",
      desc: "National and jurisdictional strategies to strengthen capability.",
      path: "workforce_strategies",
    },
    {
      title: "Looking Forward",
      desc: "Future outlook, priorities, and emerging skill horizons for 2027+.",
      path: "looking_forward",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between antialiased">
      <ReportHeader slug={slug} report={report} currentPage="introduction" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="introduction" />

        {/* Hero Card */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#38485B] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase">
              PUBLIC SAFETY
            </span>
            <span className="text-xs text-gray-500 font-semibold uppercase">
              {report?.year?.label || "2026"} • Introduction
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B]">
            Public Safety Workforce Insights Report
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-4xl font-normal">
            Welcome to the Public Safety Workforce Insights Report. This report explores workforce trends, capability challenges, and strategic directions across Australia's public safety sector.
          </p>

          <div className="pt-2">
            <button
              onClick={() => router.push(`/reports/${slug}/executive_summary`)}
              className="bg-[#38485B] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full hover:bg-[#1E293B] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Executive Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Report Structure Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#1E293B]">Report Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((sec, idx) => (
              <div
                key={idx}
                onClick={() => router.push(`/reports/${slug}/${sec.path}`)}
                className="bg-white rounded-2xl border border-gray200 p-6 flex flex-col justify-between hover:border-[#38485B] hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="space-y-2">
                  <h3 className="font-bold text-base text-gray-900 group-hover:text-[#38485B] transition-colors">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-[#38485B]">
                  <span>View Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ReportFooter />
    </div>
  );
}
