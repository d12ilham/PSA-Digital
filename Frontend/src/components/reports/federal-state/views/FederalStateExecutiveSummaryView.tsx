"use client";

import React from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import { Landmark, Building2, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FederalStateExecutiveSummaryView({
  slug,
  report,
}: {
  slug: string;
  report: any;
}) {
  const router = useRouter();

  const streams = [
    {
      title: "Federal Government Service",
      icon: Landmark,
      color: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      summary:
        "Digital transformation, AI governance, policy design capabilities, and data-driven service delivery across APS agencies.",
    },
    {
      title: "State & Territory Public Sector",
      icon: Building2,
      color: "text-orange-700",
      bg: "bg-orange-50",
      border: "border-orange-200",
      summary:
        "Frontline public service delivery, regional service distribution, inter-jurisdictional workforce mobility, and modernizing legacy public sector systems.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between antialiased">
      <ReportHeader slug={slug} report={report} currentPage="executive_summary" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="executive_summary" />

        <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#694834] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase">
              FEDERAL AND STATE/TERRITORY
            </span>
            <span className="text-xs text-gray-500 font-semibold uppercase">
              {report?.year?.label || "2026"} • Executive Summary
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#382219]">
            Federal and State/Territory Workforce Executive Summary
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-4xl font-normal">
            An overarching assessment of civil service capabilities, workforce demographics, digital skills transformation, and service delivery strategies across Australia's federal, state, and territory governments.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#382219]">Key Jurisdictional Streams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {streams.map((stream, idx) => {
              const Icon = stream.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray200 p-6 flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div className="space-y-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${stream.bg} ${stream.border} border flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 ${stream.color}`} />
                    </div>
                    <h3 className="font-bold text-base text-gray-900">
                      {stream.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {stream.summary}
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() =>
                        router.push(`/reports/${slug}/industry_overview`)
                      }
                      className="text-xs font-bold text-[#694834] hover:text-[#382219] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>View Detailed Profile</span>
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
