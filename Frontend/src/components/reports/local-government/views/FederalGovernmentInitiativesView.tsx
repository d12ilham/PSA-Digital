"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

import federalInitiativesData from "@/data/federalInitiatives.json";

interface InitiativeItem {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  impactDescription: string;
}

const INITIATIVES_DATA: InitiativeItem[] =
  federalInitiativesData as InitiativeItem[];

export default function FederalGovernmentInitiativesView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [isHeroMounted, setIsHeroMounted] = useState(false);

  useEffect(() => {
    setIsHeroMounted(true);
  }, []);

  const selectedItem =
    INITIATIVES_DATA.find((s) => s.id === selectedId) || INITIATIVES_DATA[0];

  const handlePrev = () => {
    const current = selectedId ?? 1;
    if (current > 1) {
      setSelectedId(current - 1);
    }
  };

  const handleNext = () => {
    const current = selectedId ?? 1;
    if (current < INITIATIVES_DATA.length) {
      setSelectedId(current + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="federal_initiatives"
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => router.push(`/reports/${slug}/existing_strategies`)}
            className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray200 text-[#728C28] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Existing
            Industry-Sector Strategies
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/looking_forward`)}
            className="bg-[#8AC900] hover:bg-[#77A60D] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            Next Section: 2027 and Beyond <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ── HERO BANNER CARD WITH GRAPHIC ── */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray800 leading-tight animate-slide-up">
              Federal Government Initiatives
            </h1>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal w-full lg:w-5/6 animate-slide-up-delay">
              Public Skills Australia's work is informed and guided by the
              Federal Government Initiatives detailed below. Select any
              initiative on the left — its detail opens immediately beside the
              list.
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto flex justify-center lg:justify-end">
            <img
              src="/images/hero-graphic-federal.png"
              alt="Federal Government Initiatives Graphic"
              className={`w-full max-w-[340px] sm:max-w-[420px] object-contain select-none pointer-events-none ${
                isHeroMounted ? "animate-hero-pulse-settle" : "opacity-0"
              }`}
            />
          </div>
        </div>

        {/* ── MASTER-DETAIL 2-COLUMN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LEFT COLUMN: LIST OF 13 INITIATIVES */}
          <div className="lg:col-span-1 space-y-3">
            {INITIATIVES_DATA.map((item, idx) => {
              const isSelected = item.id === selectedId;
              return (
                <React.Fragment key={item.id}>
                  <div
                    style={{ animationDelay: `${0.06 + idx * 0.04}s` }}
                    onClick={() =>
                      setSelectedId(
                        isSelected
                          ? typeof window !== "undefined" &&
                            window.innerWidth < 1024
                            ? null
                            : item.id
                          : item.id,
                      )
                    }
                    className={`animate-card-entrance rounded-2xl p-5 border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-[#8AC900]/15 border-2 border-[#8AC900] shadow-xs"
                        : "bg-white border-gray200 hover:border-[#8AC900] hover:bg-[#FAFAF0] hover:shadow-xs"
                    }`}
                  >
                    <div className="space-y-4 flex-1">
                      <span className="text-xs font-semibold text-notes block">
                        {item.number}
                      </span>
                      <h3 className="font-bold text-gray800 leading-normal">
                        {item.title}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isSelected
                          ? "bg-white text-gray800 border border-[#8AC900] rotate-90 lg:rotate-0"
                          : "bg-[#8AC900] text-gray800 group-hover:bg-[#77A60D]"
                      }`}
                    >
                      <ArrowRight className="h-4 w-4 text-gray800" />
                    </div>
                  </div>

                  {/* Mobile Detail Panel (Displayed right below the clicked item) */}
                  {isSelected && (
                    <div
                      key={`mobile-detail-${item.id}`}
                      className="lg:hidden bg-[#E5E8DA] rounded-2xl p-4 sm:p-5 space-y-4 animate-content-switch"
                    >
                      {/* Inner Content Card */}
                      <div className="bg-[#FAFAF0] rounded-2xl p-5 sm:p-6 space-y-4">
                        {/* Title & Subtitle */}
                        <div className="space-y-2">
                          <h2 className="text-base sm:text-lg font-bold text-gray800 leading-snug">
                            {item.number} · {item.title}
                          </h2>
                          <p className="text-xs sm:text-sm font-semibold text-notes block">
                            {item.subtitle}
                          </p>
                        </div>

                        {/* Description */}
                        <div className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal whitespace-pre-line space-y-3">
                          {item.description}
                        </div>

                        <hr className="border-t border-gray200 my-3" />

                        {/* Impact Section */}
                        <div className="space-y-4 pt-1">
                          <span className="text-xs font-bold text-notes uppercase block">
                            HOW THIS INFORMS PUBLIC SKILLS AUSTRALIA'S WORK
                          </span>

                          <div className="bg-[#F0F5DF] rounded-xl border-l-8 sm:border-l-12 border-l-[#9CAA54] p-3.5 sm:p-4 space-y-2">
                            <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                              {item.impactDescription}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* RIGHT COLUMN: SELECTED INITIATIVE DETAIL PANEL (Desktop only) */}
          <div className="hidden lg:block lg:col-span-2 bg-[#E5E8DA] rounded-2xl p-5 sm:p-6 space-y-5 lg:sticky lg:top-20">
            {/* Top Bar inside Detail Panel */}
            <div className="flex items-center justify-between gap-4">
              <span className="bg-lg-dark text-white text-xs font-semibold px-5 py-2.5 rounded-full uppercase">
                {selectedItem.number}
              </span>
              <div className="flex items-center gap-3">
                {(selectedId ?? 1) > 1 && (
                  <button
                    onClick={handlePrev}
                    className={`text-xs font-bold px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 flex items-center gap-1.5 ${
                      (selectedId ?? 1) === INITIATIVES_DATA.length
                        ? "bg-[#8AC900] hover:bg-[#77A60D] text-gray800"
                        : "border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray200 text-[#728C28]"
                    }`}
                  >
                    <ArrowLeft
                      className={`h-3.5 w-3.5 ${
                        (selectedId ?? 1) === INITIATIVES_DATA.length
                          ? "text-gray800"
                          : "text-[#728C28]"
                      }`}
                    />
                    <span>Previous</span>
                  </button>
                )}
                {(selectedId ?? 1) < INITIATIVES_DATA.length && (
                  <button
                    onClick={handleNext}
                    className="bg-[#8AC900] hover:bg-[#77A60D] text-gray800 text-xs font-bold px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 flex items-center gap-1.5"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-3.5 w-3.5 text-gray800" />
                  </button>
                )}
              </div>
            </div>
            {/* Inner White Content Card */}
            <div
              key={`desktop-initiative-content-${selectedId ?? "default"}`}
              className="bg-[#FAFAF0] rounded-2xl p-6 sm:p-8 space-y-5 animate-content-switch"
            >
              {/* Title & Subtitle */}
              <div className="space-y-5">
                <h2 className="text-lg sm:text-xl font-bold text-gray800 leading-snug">
                  {selectedItem.number} · {selectedItem.title}
                </h2>
                <p className="text-sm font-semibold text-notes block">
                  {selectedItem.subtitle}
                </p>
              </div>

              {/* Description */}
              <div className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal whitespace-pre-line space-y-3">
                {selectedItem.description}
              </div>

              <hr className="border-t border-gray200 my-4" />

              {/* Impact Section */}
              <div className="space-y-5 pt-1">
                <span className="text-xs font-bold text-notes uppercase block">
                  HOW THIS INFORMS PUBLIC SKILLS AUSTRALIA'S WORK
                </span>

                <div className="bg-[#F0F5DF] rounded-xl border-l-12 border-l-[#9CAA54] p-4 sm:p-5 space-y-3">
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    {selectedItem.impactDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
