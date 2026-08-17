"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ContextualisationSubViewProps {
  slug: string;
  onBackToOverview: () => void;
}

export default function ContextualisationSubView({
  slug,
  onBackToOverview,
}: ContextualisationSubViewProps) {
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* ── SUB-HEADER NAVIGATION BAR ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onBackToOverview}
            className="border border-gray200 bg-[#FAFAF0] hover:bg-gray200 text-[#728C28] font-bold text-xs px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Workforce Insights</span>
          </button>

          <button
            onClick={() => router.push(`/reports/${slug}/workforce_strategies`)}
            className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>
              Next Section: 2026 Proposed Local Government Workforce Strategies
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── TOP HERO CARD ── */}
      <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray800">
          Contextualisation of Qualifications to Local Government Service
          Delivery
        </h1>
        <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
          Stakeholders expressed concern with the ability of qualifications to
          be contextualised to accommodate the unique operating environments of
          local councils. Some indicated a preference for training that:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-gray600 font-normal pl-5 list-disc">
          <li>
            Includes cultural, geographic and operational contexts of working in
            regional, rural and remote, and First Nations communities, with case
            studies drawn from real-world experiences
          </li>
          <li>
            Accurately reflects the realities of local council work and aligned
            with operational priorities
          </li>
          <li>
            Reflects jurisdiction-specific requirements, particularly for
            modules covering regulations and local laws, which may differ across
            LGAs
          </li>
        </ul>
      </div>

      {/* ── BOTTOM 2-COLUMN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Box */}
        <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-5 flex flex-col justify-between">
          <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
            While some stakeholders expressed interest in an expansion of the
            LGA Local Government Training Package to host contextualised
            qualifications, challenges with qualification duplication could
            emerge. Bringing together state and territory decision makers, State
            and Territory Training Authorities/Senior Responsible Officers
            (STTA/SRO), Local Government partner TAFEs and RTOs to discuss
            solutions to training access, delivery styles, financial
            implications and contextualisation of learning materials, may
            support more sustainable and targeted training outcomes for Local
            Government industry-sector occupational shortages.
          </p>
        </div>

        {/* Right Box: Industry Insight */}
        <div className="bg-[#F0F5DF] rounded-2xl border border-gray200 border-l-12 border-l-notes p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0">
                <img
                  src="/images/frame-7.svg"
                  alt="Industry Insight"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray800">
                Industry Insight
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-gray600 font-normal">
              <div>
                <p className="font-bold text-gray800 mb-1.5">
                  1. Local Government Specific Occupational Shortages
                </p>
                <ul className="space-y-1 pl-4 list-disc">
                  <li>
                    Local council employers require a diverse range of skills to
                    maintain the breadth of responsibilities undertaken by local
                    councils.
                  </li>
                  <li>
                    Skills needs are changing due to workforce pressures,
                    technological advancements and shifting community
                    expectations.
                  </li>
                  <li>
                    While local council employers are experiencing some
                    shortages in identified national shortage occupations,
                    several Local Government specific shortages were also
                    identified.
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-gray800 mb-1.5">
                  2. Access to VET Qualifications and Training Delivery Partners
                </p>
                <ul className="space-y-1 pl-4 list-disc">
                  <li>
                    Access to TAFE or RTO in regional, rural and remote
                    locations is limited.
                  </li>
                  <li>
                    Few TAFEs and RTOs are willing to travel to geographically
                    isolated locations to deliver required qualifications.
                  </li>
                  <li>
                    Local councils have limited training budgets to support
                    financial impost of course enrolments as well as travel to
                    and from training.
                  </li>
                  <li>
                    Course delivery is often not tailored to suit those from
                    regional, rural or remote locations.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
