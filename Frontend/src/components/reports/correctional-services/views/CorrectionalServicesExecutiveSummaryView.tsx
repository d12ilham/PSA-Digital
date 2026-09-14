"use client";

import React from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import { ShieldCheck, HeartHandshake, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CorrectionalServicesExecutiveSummaryView({
  slug,
  report,
}: {
  slug: string;
  report: any;
}) {
  const router = useRouter();

  const areas = [
    {
      title: "Custodial Corrections",
      icon: ShieldCheck,
      color: "text-sky-600",
      bg: "bg-sky-50",
      border: "border-sky-200",
      summary:
        "High staff turnover, safety and mental wellbeing pressures, and modernizing correctional officer training pathways across state and territory secure facilities.",
    },
    {
      title: "Community Corrections",
      icon: HeartHandshake,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      summary:
        "Complex caseload management, specialized case work in mental health and addiction, and integration of restorative and trauma-informed practices.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between antialiased">
      <ReportHeader slug={slug} report={report} currentPage="executive_summary" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="executive_summary" />

        <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#0B6DA8] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase">
              CORRECTIONAL SERVICES
            </span>
            <span className="text-xs text-gray-500 font-semibold uppercase">
              {report?.year?.label || "2026"} • Executive Summary
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#063B5D]">
            Correctional Services Workforce Executive Summary
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-4xl font-normal">
            A focused analysis of workforce challenges in custodial and community corrections across Australia. Explores strategies to improve staff safety, psychological wellbeing, professional recognition, and retention.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#063B5D]">Core Operational Domains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray200 p-6 flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div className="space-y-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${area.bg} ${area.border} border flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 ${area.color}`} />
                    </div>
                    <h3 className="font-bold text-base text-gray-900">
                      {area.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {area.summary}
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() =>
                        router.push(`/reports/${slug}/industry_overview`)
                      }
                      className="text-xs font-bold text-[#0B6DA8] hover:text-[#063B5D] flex items-center gap-1.5 transition-colors cursor-pointer"
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
