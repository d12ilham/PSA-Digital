"use client";

import React from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import { Shield, Flame, Award, Users, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PublicSafetyExecutiveSummaryView({
  slug,
  report,
}: {
  slug: string;
  report: any;
}) {
  const router = useRouter();

  const subsectors = [
    {
      title: "Fire and Emergency Services",
      icon: Flame,
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
      summary:
        "Increasing frequency and severity of extreme weather events driving higher demand for volunteer and career frontline responders.",
    },
    {
      title: "Police",
      icon: Shield,
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
      summary:
        "Evolving cyber and financial crime landscapes necessitating specialized investigative and digital forensics skills across state and federal jurisdictions.",
    },
    {
      title: "Defence",
      icon: Award,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      summary:
        "Strategic focus on advanced technological integration, autonomous systems, and sovereign capability across maritime, land, air, and cyber domains.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between antialiased">
      <ReportHeader slug={slug} report={report} currentPage="executive_summary" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="executive_summary" />

        {/* Hero Card */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#38485B] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase">
              PUBLIC SAFETY
            </span>
            <span className="text-xs text-gray-500 font-semibold uppercase">
              {report?.year?.label || "2026"} • Executive Summary
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B]">
            Public Safety Workforce Executive Summary
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-4xl font-normal">
            Public Skills Australia's Public Safety Workforce Insights Report provides an integrated, evidence-based view across Fire and Emergency Services, Police, and Defence. It examines systemic recruitment, retention, mental wellbeing, and technological challenges shaping frontline readiness.
          </p>
        </div>

        {/* Subsectors Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#1E293B]">Priority Sub-Sectors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subsectors.map((sub, idx) => {
              const Icon = sub.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray200 p-6 flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div className="space-y-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${sub.bg} ${sub.border} border flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 ${sub.color}`} />
                    </div>
                    <h3 className="font-bold text-base text-gray-900">
                      {sub.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {sub.summary}
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() =>
                        router.push(`/reports/${slug}/industry_overview`)
                      }
                      className="text-xs font-bold text-[#38485B] hover:text-[#1E293B] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Explore Sector Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <ReportFooter />
    </div>
  );
}
