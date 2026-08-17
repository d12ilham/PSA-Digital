"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Theme2InsightSubViewProps {
  slug: string;
  insightId: number; // 1, 2, 3, or 4
  onNavigateInsight: (id: number) => void;
  onBackToOverview: () => void;
}

export default function Theme2InsightSubView({
  slug,
  insightId,
  onNavigateInsight,
  onBackToOverview,
}: Theme2InsightSubViewProps) {
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

          {insightId === 4 && (
            <button
              onClick={() =>
                router.push(`/reports/${slug}/workforce_strategies`)
              }
              className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Next: Contextualisation of Qualifications</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 self-end sm:self-auto">
          <span className="text-xs font-semibold text-notes">
            Insight {insightId} of 4 · Theme 2
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (insightId > 1) onNavigateInsight(insightId - 1);
              }}
              disabled={insightId <= 1}
              className={`border border-gray200 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1 transition-colors ${insightId <= 1 ? "opacity-40 cursor-not-allowed text-gray600 border-gray200" : "hover:bg-gray200 text-[#252D02] cursor-pointer"}`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => {
                if (insightId < 4) onNavigateInsight(insightId + 1);
              }}
              disabled={insightId >= 4}
              className={`border border-gray200 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1 transition-colors ${insightId >= 4 ? "opacity-40 cursor-not-allowed text-gray600 border-gray200" : "hover:bg-gray200 text-[#252D02] cursor-pointer"}`}
            >
              <span>Next</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── HERO BANNER CONTAINER (WHITE BG WRAPPER) ── */}
      {insightId === 1 && (
        <div className="bg-white border border-gray200 rounded-2xl p-6 space-y-6">
          <div className="bg-[#FAFAF0] border border-gray200 border-l-12 border-l-lg-dark rounded-2xl p-6 flex gap-6 items-start relative overflow-hidden">
            <span className="text-5xl font-bold text-notes/10 select-none shrink-0 leading-none">
              1
            </span>
            <div className="space-y-3 flex-1">
              <span className="text-xs font-semibold text-notes block">
                Theme Two, Insight One
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-gray800 w-2/3">
                Access to TAFE or RTOs in regional, rural and remote locations
                is limited.
              </h1>
            </div>
          </div>

          <div className="bg-[#F2F6E9] border border-gray200 rounded-2xl p-6 space-y-3">
            <h2 className="text-base font-bold text-gray800">Theme context.</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
              <p>
                Access to training has consistently been raised as a challenge
                for local council employers located in regional, rural and
                remote locations. This challenge is affirmed in the Interim
                Report into Local Government Sustainability, 34 Public Skills
                Australia's 2025 Local Government Workforce Insights Report, 35
                and the Australian Local Government Association's 2022 Local
                Government Workforce Skills and Capability Survey. 36 Throughout
                consultation for the Local Government Skills Audit and Uptake
                and Utility of the LGA Local Government Training Package
                project, VET was consistently identified as the most relevant
                pathway for roles requiring technical expertise and compliance
                assurance. Local councils emphasised the importance of VET's
                role where formal qualifications underpin regulatory compliance
                and risk management in functions such as water treatment and
                civil construction, and for several technical positions that
                require Certificate III or IV such as Water Operator, Mechanic
                and Childcare Educator. However, while they acknowledged
                overwhelmingly supports work-related training, some stakeholders
                noted concerns about their ability to access TAFEs and RTOs to
                obtain qualifications that are contextualised to the Local
                Government industry-sector.
              </p>
              <p>
                The consultations for the 2024 Federal, State/Territory &amp;
                Local Government Workforce Plan and the 2025 Local Government
                Workforce Insights Report, as well as the Local Government
                Skills Audit and Uptake and Utility of the LGA Local Government
                Training Package project, re-affirmed the challenges relating to
                access to qualifications and training delivery. These are
                further detailed below:
              </p>
            </div>
          </div>
        </div>
      )}

      {insightId === 2 && (
        <div className="bg-white border border-gray200 rounded-2xl p-6">
          <div className="bg-[#FAFAF0] border border-gray200 border-l-12 border-l-lg-dark rounded-2xl p-6 flex gap-6 items-start relative overflow-hidden">
            <span className="text-5xl font-bold text-notes/10 select-none shrink-0 leading-none">
              2
            </span>
            <div className="space-y-3 flex-1">
              <span className="text-xs font-semibold text-notes block">
                Theme Two, Insight Two
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-gray800 w-2/3">
                Few TAFEs and RTOs are willing to travel to geographically
                isolated locations to deliver required qualifications.
              </h1>
            </div>
          </div>
        </div>
      )}

      {insightId === 3 && (
        <div className="bg-white border border-gray200 rounded-2xl p-6">
          <div className="bg-[#FAFAF0] border border-gray200 border-l-12 border-l-lg-dark rounded-2xl p-6 flex gap-6 items-start relative overflow-hidden">
            <span className="text-5xl font-bold text-notes/10 select-none shrink-0 leading-none">
              3
            </span>
            <div className="space-y-3 flex-1">
              <span className="text-xs font-semibold text-notes block">
                Theme Two, Insight Three
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-gray800 w-2/3">
                Limited training budgets to support course enrolment and travel
                to access training
              </h1>
            </div>
          </div>
        </div>
      )}

      {insightId === 4 && (
        <div className="bg-white border border-gray200 rounded-2xl p-6">
          <div className="bg-[#FAFAF0] border border-gray200 border-l-12 border-l-lg-dark rounded-2xl p-6 flex gap-6 items-start relative overflow-hidden">
            <span className="text-5xl font-bold text-notes/10 select-none shrink-0 leading-none">
              4
            </span>
            <div className="space-y-3 flex-1">
              <span className="text-xs font-semibold text-notes block">
                Theme Two, Insight Four
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-gray800 w-2/3">
                Course delivery is often not tailored to suit those from
                regional, rural or remoted locations
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* ── INSIGHT CONTENT BODY ── */}

      {/* INSIGHT 1 BODY */}
      {insightId === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray800">
                Limited local TAFEs or RTOs to support training delivery
              </h3>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                Regional, rural and remote local councils face acute challenges
                in accessing suitable VET training. Further, some qualifications
                require supervision in the workplace as part of their delivery
                (e.g., mechanic apprenticeships), which is challenging for local
                councils. For example, some local councils reported having to
                contract external trainers to supervise apprentices or
                alternatively, employees having to travel significant distances
                for face-to-face instruction under supervision.
              </p>
            </div>

            <div className="pt-4 border-t border-gray200 mt-auto">
              <p className="text-xs text-notes">
                Source: PSA, 2026 LG WIR, Access to VET Qualifications and
                Training Delivery Partners.
              </p>
            </div>
          </div>

          <div className="bg-[#F0F5DF] rounded-2xl border border-gray200 border-l-12 border-l-lg-dark p-6 space-y-5 flex flex-col justify-between">
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

              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                Stakeholders noted that closer engagement with government
                decision makers, TAFEs, RTOs and councils to consider solutions
                to challenges such as access to training, delivery options and
                costs may support local councils to build the technical
                capability they need for the future.
              </p>
            </div>

            <div className="pt-4 border-t border-gray200">
              <p className="text-xs text-notes uppercase">
                HEARD IN CONSULTATION · LOCAL GOVERNMENT SKILLS AUDIT AND
                TRAINING PACKAGE PROJECT
              </p>
            </div>
          </div>
        </div>
      )}

      {/* INSIGHT 2 BODY */}
      {insightId === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-5 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
              Few RTOs are willing or able to deliver tailored, in-community
              training, especially for niche or highly contextual skills.
              Regional, rural and remote local councils stressed the need for
              more RTOs experienced in delivering training in community settings
              and to First Nations learners. Stakeholders also indicated that
              for First Nations learners, some training may not offer an
              appropriate level of cultural sensitivity or access to translated
              materials and interpreters.
            </p>

            <div className="pt-4 border-t border-gray200 mt-auto">
              <p className="text-xs text-notes">
                Source: PSA, 2026 LG WIR, Access to VET Qualifications and
                Training Delivery Partners.
              </p>
            </div>
          </div>

          <div className="bg-[#F0F5DF] rounded-2xl border border-gray200 border-l-12 border-l-lg-dark p-6 space-y-5 flex flex-col justify-between">
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

              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                Stakeholders noted that closer engagement with government
                decision makers, TAFEs, RTOs and councils to consider solutions
                to challenges such as access to training, delivery options and
                costs may support local councils to build the technical
                capability they need for the future.
              </p>
            </div>

            <div className="pt-4 border-t border-gray200">
              <p className="text-xs text-notes uppercase">
                HEARD IN CONSULTATION · LOCAL GOVERNMENT SKILLS AUDIT AND
                TRAINING PACKAGE PROJECT
              </p>
            </div>
          </div>
        </div>
      )}

      {/* INSIGHT 3 BODY */}
      {insightId === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-5 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
              Several VET programs require travel to urban centres, which is
              costly and disruptive, especially for remote employees and their
              families. For example, on Tiwi Islands, it is culturally
              appropriate for families to travel together, increasing costs.
              Local councils reported spending more on travel than on actual
              training. In addition, for accessing full qualifications, some
              noted high costs and limited access to accredited training. For
              example, one local council body reported spending approximately
              ,000 for water operator training for six participants.
            </p>

            <div className="pt-4 border-t border-gray200 mt-auto">
              <p className="text-xs text-notes">
                Source: PSA, 2026 LG WIR, Access to VET Qualifications and
                Training Delivery Partners.
              </p>
            </div>
          </div>

          <div className="bg-[#F0F5DF] rounded-2xl border border-gray200 border-l-12 border-l-lg-dark p-6 space-y-5 flex flex-col justify-between">
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

              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                Stakeholders noted that closer engagement with government
                decision makers, TAFEs, RTOs and councils to consider solutions
                to challenges such as access to training, delivery options and
                costs may support local councils to build the technical
                capability they need for the future.
              </p>
            </div>

            <div className="pt-4 border-t border-gray200">
              <p className="text-xs text-notes uppercase">
                HEARD IN CONSULTATION · LOCAL GOVERNMENT SKILLS AUDIT AND
                TRAINING PACKAGE PROJECT
              </p>
            </div>
          </div>
        </div>
      )}

      {/* INSIGHT 4 BODY */}
      {insightId === 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-5 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
              Local councils consistently reported that self-paced online
              learning, which may be offered by both TAFEs and RTOs, is
              ineffective for practical, hands-on roles, such as horticulture or
              construction. Blended or face-to-face approaches are preferred,
              but high qualification costs and travel expenses often result in
              employees seeking and selecting non-accredited options outside
              VET. In addition, delivery models are not always suitable for all,
              particularly for those with low English language, literacy,
              numeracy and/or digital (LLND) skills. As local council employers
              aim to maintain a diverse workforce, stakeholders noted challenges
              with VET training delivery. For example, some Northern Territory
              stakeholders highlighted that several First Nations employees
              speak English as a third or fourth language and find the standard
              of English used in VET courses a significant barrier to
              participation. The level of evidence that RTOs are required to
              collect to certify competency was considered restrictive for
              learners with limited literacy. One stakeholder recounted a VET
              unit requiring a learner to rewrite an example report 17 times,
              which was seen as unnecessary and intimidating and had deterred
              other employees from undertaking training. Local council employees
              reported a desire to see the level of language reviewed to make
              courses more accessible, as well as exploring different delivery
              options that accommodate people from non-English speaking
              backgrounds.
            </p>

            <div className="pt-4 border-t border-gray200 mt-auto">
              <p className="text-xs text-notes">
                Source: PSA, 2026 LG WIR, Access to VET Qualifications and
                Training Delivery Partners.
              </p>
            </div>
          </div>

          <div className="bg-[#F0F5DF] rounded-2xl border border-gray200 border-l-12 border-l-lg-dark p-6 space-y-5 flex flex-col justify-between">
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
                      Local council employers require a diverse range of skills
                      to maintain the breadth of responsibilities undertaken by
                      local councils.
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
                    2. Access to VET Qualifications and Training Delivery
                    Partners
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

            <div className="pt-4 border-t border-gray200">
              <p className="text-xs text-notes uppercase">
                HEARD IN CONSULTATION · LOCAL GOVERNMENT SKILLS AUDIT AND
                TRAINING PACKAGE PROJECT
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
