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

const consultationText = "The consultations for the 2024 Federal, State/Territory & Local Government Workforce Plan and the 2025 Local Government Workforce Insights Report, as well as the Local Government Skills Audit and Uptake and Utility of the LGA Local Government Training Package project, re-affirmed the challenges relating to access to qualifications and training delivery. These are further detailed below:";

function TrainingDeliveryCard({ travel = false, body, title }: { travel?: boolean; body?: string; title?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-5 flex flex-col justify-between">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray800">
          {title ?? (travel
            ? "Few TAFEs and RTOs are willing to travel to geographically isolated locations to deliver training:"
            : "Limited local TAFEs or RTOs to support training delivery")}
        </h3>
        <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
          {body ?? (travel
            ? "Few RTOs are willing or able to deliver tailored, in-community training, especially for niche or highly contextual skills. Regional, rural and remote local councils stressed the need for more RTOs experienced in delivering training in community settings and to First Nations learners. Stakeholders also indicated that for First Nations learners, some training may not offer an appropriate level of cultural sensitivity or access to translated materials and interpreters."
            : "Regional, rural and remote local councils face acute challenges in accessing suitable VET training. Further, some qualifications require supervision in the workplace as part of their delivery (e.g., mechanic apprenticeships), which is challenging for local councils. For example, some local councils reported having to contract external trainers to supervise apprentices or alternatively, employees having to travel significant distances for face-to-face instruction under supervision.")}
        </p>
      </div>
    </div>
  );
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
              <p className="text-sm sm:text-base font-bold text-gray800">
                Access to VET Qualifications and Training Delivery Partners
              </p>
              <h1 className="text-xl sm:text-2xl font-bold text-gray800 w-full xl:w-2/3 animate-slide-up">
                Access to TAFE or RTOs in regional, rural and remote locations
                is limited.
              </h1>
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
              <p className="text-sm sm:text-base font-bold text-gray800">
                Access to VET Qualifications and Training Delivery Partners
              </p>
              <h1 className="text-xl sm:text-2xl font-bold text-gray800 w-full xl:w-2/3 animate-slide-up">
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
              <p className="text-sm sm:text-base font-bold text-gray800">
                Access to VET Qualifications and Training Delivery Partners
              </p>
              <h1 className="text-xl sm:text-2xl font-bold text-gray800 w-full xl:w-2/3 animate-slide-up">
                Local councils have limited training budgets to support financial impost of course enrolment as well as travel to and from training
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
              <p className="text-sm sm:text-base font-bold text-gray800">
                Access to VET Qualifications and Training Delivery Partners
              </p>
              <h1 className="text-xl sm:text-2xl font-bold text-gray800 w-full xl:w-2/3 animate-slide-up">
                Course delivery is often not tailored to suit those from
                regional, rural or remote locations
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* ── INSIGHT CONTENT BODY ── */}

      {/* INSIGHT 1 BODY */}
      {insightId === 1 && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrainingDeliveryCard title="Access to VET Training" body={consultationText} />
          <div
            style={{ animationDelay: "0.22s" }}
            className="animate-card-entrance bg-[#F0F5DF] rounded-2xl border border-gray200 border-l-12 border-l-lg-dark p-6 flex flex-col justify-between gap-5"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0">
                  <img
                    src="/images/frame-7.svg"
                    alt=""
                    className="w-8 h-8 object-contain animate-zoom-in"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray800">Industry Insight</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                Stakeholders noted that closer engagement with government
                decision makers, TAFEs, RTOs and councils to find solutions to
                challenges such as access to training, delivery options and
                costs may support local councils to build the technical
                capability they need for the future.
              </p>
            </div>
          </div>
          <TrainingDeliveryCard />
          <TrainingDeliveryCard travel />
          </div>
        </div>
      )}

      {/* INSIGHT 2 BODY */}
      {insightId === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-5 flex flex-col justify-between">
            <h3 className="text-xl font-bold text-gray800">
              Few TAFEs and RTOs are willing to travel to geographically isolated locations to deliver training:
            </h3>
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
          </div>
          <div
            style={{ animationDelay: "0.22s" }}
            className="animate-card-entrance bg-[#F0F5DF] rounded-2xl border border-gray200 border-l-12 border-l-lg-dark p-6 flex flex-col justify-between gap-5"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0">
                  <img
                    src="/images/frame-7.svg"
                    alt=""
                    className="w-8 h-8 object-contain animate-zoom-in"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray800">Industry Insight</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                Stakeholders noted that closer engagement with government
                decision makers, TAFEs, RTOs and councils to consider solutions
                to challenges such as access to training, delivery options and
                costs may support local councils to build the technical
                capability they need for the future.
              </p>
            </div>
            <p className="pt-4 border-t border-gray200 text-[11px] text-notes">
              HEARD IN CONSULTATION · LOCAL GOVERNMENT SKILLS AUDIT AND TRAINING PACKAGE PROJECT
            </p>
          </div>
        </div>
      )}

      {/* INSIGHT 3 BODY */}
      {insightId === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray200 p-6 flex flex-col justify-between gap-5">
            <h3 className="text-xl font-bold text-gray800">
              Limited training budgets to support course enrolment and travel to access training:
            </h3>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
              Several VET programs require travel to urban centres, which is
              costly and disruptive, especially for remote employees and their
              families. For example, on Tiwi Islands, it is culturally
              appropriate for families to travel together, increasing costs.
              Local councils reported spending more on travel than on actual
              training. In addition, for accessing full qualifications, some
              noted high costs and limited access to accredited training. For
              example, one local council body reported spending approximately
              $40,000 for water operator training for six participants.
            </p>
          </div>
          <div
            style={{ animationDelay: "0.22s" }}
            className="animate-card-entrance bg-[#F0F5DF] rounded-2xl border border-gray200 border-l-12 border-l-lg-dark p-6 flex flex-col justify-between gap-5"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0">
                  <img
                    src="/images/frame-7.svg"
                    alt=""
                    className="w-8 h-8 object-contain animate-zoom-in"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray800">Industry Insight</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                Stakeholders noted that closer engagement with government
                decision makers, TAFEs, RTOs and councils to find solutions to
                challenges such as access to training, delivery options and
                costs may support local councils to build the technical
                capability they need for the future.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* INSIGHT 4 BODY */}
      {insightId === 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-5">
            <h3 className="text-xl font-bold text-gray800">
              Non-Tailored delivery options:
            </h3>
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
          </div>
          <section className="bg-white rounded-2xl border border-gray200 p-6 space-y-5">
            <h2 className="text-xl font-bold text-gray800">
            Contextualisation of Qualifications to Local Government Service Delivery
            </h2>
            <div className="space-y-5">
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                Stakeholders expressed concern with the ability of qualifications to
                be contextualised to accommodate the unique operating environments of
                local councils. Some indicated a preference for training that:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-gray600 leading-relaxed">
                <li>Includes cultural, geographic and operational contexts of working in regional, rural and remote, and First Nations communities, with case studies drawn from real-world experiences</li>
                <li>Accurately reflects the realities of local council work and aligned with operational priorities</li>
                <li>Reflects jurisdiction-specific requirements, particularly for modules covering regulations and local laws, which may differ across LGAs</li>
              </ul>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                While some stakeholders expressed interest in an expansion of the LGA
                Local Government Training Package to host contextualised qualifications,
                challenges with qualification duplication could emerge. Bringing
                together state and territory decision makers, State and Territory
                Training Authorities/Senior Responsible Officers (STTA/SRO), Local
                Government partner TAFEs and RTOs to discuss solutions to training
                access, delivery styles, financial implications and contextualisation
                of learning materials, may support more sustainable and targeted
                training outcomes for Local Government industry-sector occupational
                shortages.
              </p>
            </div>
            <div className="bg-[#F0F5DF] rounded-2xl border-l-12 border-l-lg-dark p-6 space-y-3">
              <h3 className="text-xl font-bold text-gray800">Industry Insight</h3>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                Stakeholders from New South Wales noted challenges with delivery of
                some civil qualifications which were deemed not sufficiently flexible
                and included modules that did not align with operational needs.
                Stakeholders indicated a preference for tailored electives that
                directly address workforce requirements and ensure modules are
                specific to LGA contexts, since regulatory demands differ across
                regions.
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
