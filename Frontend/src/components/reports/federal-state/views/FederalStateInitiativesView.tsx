"use client";

import React, { useState } from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight, Landmark } from "lucide-react";
import federalInitiativesData from "@/data/federalInitiatives.json";

interface Report {
  id: string;
  title: string;
  slug: string;
  status: string;
  pdfFileUrl?: string;
  psaSectorPageUrl?: string;
  contactUrl?: string;
  year?: {
    label: string;
  };
}

interface InitiativeItem {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  impactDescription: string;
}

const INITIATIVES_DATA: InitiativeItem[] = federalInitiativesData as InitiativeItem[];

export default function FederalStateInitiativesView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const [selectedId, setSelectedId] = useState<number>(1);
  const current =
    INITIATIVES_DATA.find((s) => s.id === selectedId) || INITIATIVES_DATA[0];

  const handlePrev = () => {
    if (selectedId > 1) setSelectedId(selectedId - 1);
  };

  const handleNext = () => {
    if (selectedId < INITIATIVES_DATA.length) setSelectedId(selectedId + 1);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#E07A5F]/20 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="federal_initiatives" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="federal_initiatives" />

        {/* Hero Card */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-10 relative overflow-hidden space-y-4 shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EED4C4]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="bg-[#694834] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              POLICY LANDSCAPE
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#382219]">
              Federal Government Initiatives
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              14 national policy frameworks, legislative reviews, and ministerial directions that inform workforce planning, qualification reform, and capability development for Australian public administration.
            </p>
          </div>
        </div>

        {/* Master Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* List Column */}
          <div className="lg:col-span-5 space-y-3 max-h-[720px] overflow-y-auto pr-1">
            {INITIATIVES_DATA.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-white border-[#694834] shadow-md ring-2 ring-[#694834]/20"
                      : "bg-[#FAF8F5] border-[#E9EAEB] hover:bg-white hover:border-[#EED4C4]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md uppercase shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-[#694834] text-white"
                          : "bg-white text-[#694834] border border-[#EED4C4]"
                      }`}
                    >
                      {item.number}
                    </span>
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-[#382219] leading-snug">
                        {item.title}
                      </h3>
                      <span className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 mt-1 ${
                      isSelected ? "text-[#694834]" : "text-gray-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E9EAEB] pb-4">
              <span className="text-xs font-bold text-[#694834] uppercase tracking-wider">
                INITIATIVE {current.number} OF {INITIATIVES_DATA.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={selectedId === 1}
                  className="px-3 py-1 rounded-lg border border-[#E9EAEB] bg-[#FAF8F5] text-xs font-bold text-gray-700 hover:border-[#694834] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedId === INITIATIVES_DATA.length}
                  className="px-3 py-1 rounded-lg border border-[#E9EAEB] bg-[#FAF8F5] text-xs font-bold text-gray-700 hover:border-[#694834] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#382219]">
                {current.title}
              </h2>
              <span className="text-xs font-semibold text-gray-500 block">
                {current.subtitle}
              </span>
            </div>

            <div className="text-sm text-gray-700 leading-relaxed font-normal whitespace-pre-line space-y-4">
              {current.description}
            </div>

            <div className="bg-[#FAF8F5] border border-[#EED4C4] rounded-xl p-5 space-y-1.5">
              <span className="font-bold text-xs text-[#382219] uppercase tracking-wider block">
                Public Sector Workforce Impact:
              </span>
              <p className="text-xs text-gray-700 leading-relaxed">
                {current.impactDescription}
              </p>
            </div>
          </div>
        </div>
      </main>

      <ReportFooter contactUrl={report?.contactUrl} />
    </div>
  );
}
