"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Users, MessageSquare } from "lucide-react";

interface Theme1InsightSubViewProps {
  slug: string;
  insightId: number; // 1, 2, or 3
  onNavigateInsight: (id: number) => void;
  onBackToOverview: () => void;
}

export default function Theme1InsightSubView({
  slug,
  insightId,
  onNavigateInsight,
  onBackToOverview,
}: Theme1InsightSubViewProps) {
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* ── SUB-HEADER NAVIGATION BAR ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBackToOverview}
          className="border border-gray200 bg-[#FAFAF0] hover:bg-gray200 text-[#728C28] font-bold text-xs px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Workforce Insights</span>
        </button>

        <div className="flex items-center gap-4 self-end sm:self-auto">
          <span className="text-xs font-semibold text-notes">
            Insight {insightId} of 3 · Theme 1
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (insightId > 1) onNavigateInsight(insightId - 1);
              }}
              disabled={insightId <= 1}
              className={`border border-gray200 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1 transition-colors ${
                insightId <= 1
                  ? "opacity-40 cursor-not-allowed text-gray600 border-gray200"
                  : "hover:bg-gray200 text-[#252D02] cursor-pointer"
              }`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => {
                if (insightId < 3) onNavigateInsight(insightId + 1);
              }}
              disabled={insightId >= 3}
              className={`border border-gray200 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1 transition-colors ${
                insightId >= 3
                  ? "opacity-40 cursor-not-allowed text-gray600 border-gray200"
                  : "hover:bg-gray200 text-[#252D02] cursor-pointer"
              }`}
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
          {/* Inner Banner with #FAFAF0 bg & left green border line */}
          <div className="bg-[#FAFAF0] border border-gray200 border-l-12 border-l-[#9CAA54] rounded-2xl p-6 flex gap-6 items-start relative overflow-hidden">
            <span className="text-5xl font-bold text-notes/10 select-none shrink-0 leading-none">
              1
            </span>
            <div className="space-y-3 flex-1">
              <span className="text-xs font-semibold text-notes block">
                Theme One, Insight One
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-gray800 w-2/3">
                Local Government employers require a diverse range of skills to
                maintain the breadth of responsibilities undertaken by local
                councils.
              </h1>
            </div>
          </div>

          {/* Theme context Box inside the same White BG container */}
          <div className="bg-[#F2F6E9] border border-gray200 rounded-2xl p-6 space-y-3">
            <h2 className="text-base font-bold text-gray800">Theme context.</h2>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal w-2/3">
              In support of both the 2024 Federal, State/Territory &amp; Local
              Government Workforce Plan and the 2025 Local Government Workforce
              Insights Report, local council employers continue to emphasise the
              broad scope of occupations employed in their workforce. Role
              expansion has been a consistent theme, further examined through
              two Parliamentary inquiries — which confirmed that the role of
              local councils has expanded over time and that this expansion is
              impacting both financial and workforce sustainability.
            </p>
          </div>
        </div>
      )}

      {insightId === 2 && (
        <div className="bg-white border border-gray200 rounded-2xl p-6">
          <div className="bg-[#FAFAF0] border border-gray200 border-l-12 border-l-[#9CAA54] rounded-2xl p-6 flex gap-6 items-start relative overflow-hidden">
            <span className="text-5xl font-bold text-notes/10 select-none shrink-0 leading-none">
              2
            </span>
            <div className="space-y-3 flex-1">
              <span className="text-xs font-semibold text-notes block">
                Theme One, Insight Two
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-gray800 w-2/3">
                Skills needs are changing due to workforce pressures,
                technological advancements and shifting community expectations.
              </h1>
            </div>
          </div>
        </div>
      )}

      {insightId === 3 && (
        <div className="bg-white border border-gray200 rounded-2xl p-6">
          <div className="bg-[#FAFAF0] border border-gray200 border-l-12 border-l-[#9CAA54] rounded-2xl p-6 flex gap-6 items-start relative overflow-hidden">
            <span className="text-5xl font-bold text-notes/10 select-none shrink-0 leading-none">
              3
            </span>
            <div className="space-y-3 flex-1">
              <span className="text-xs font-semibold text-notes block">
                Theme One, Insight Three
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-gray800 w-2/3">
                While Local Government employers are experiencing some shortages
                in identified national shortage occupations, several Local
                Government specific shortages were also identified.
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* ── INSIGHT CONTENT BODY ── */}

      {/* INSIGHT 1 BODY */}
      {insightId === 1 && (
        <div className="space-y-6">
          {/* 2-Column Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Box: A diverse, multidisciplinary workforce */}
            <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-5 flex flex-col">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#F0F5DF] flex items-center justify-center shrink-0">
                  <img
                    src="/images/frame-6.svg"
                    alt="A diverse, multidisciplinary workforce"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray800">
                  A diverse, multidisciplinary workforce
                </h3>
                <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                  As a diverse workforce, local councils require access to a
                  broad range of skills to deliver services. Similar to other
                  employers, Local Government stakeholders noted that
                  technological advancements, shifting community expectations
                  and workforce pressures are changing the role of local
                  councils, the nature of their service delivery and the skills
                  their employees require.
                </p>
              </div>

              <div className="pt-4 border-t border-gray200">
                <p className="text-xs text-notes">
                  Source: PSA, 2026 Local Government Workforce Insights Report,
                  Workforce Insights.
                </p>
              </div>
            </div>

            {/* Right Box: Industry Insight */}
            <div className="bg-[#F0F5DF] rounded-2xl border border-gray200 border-l-12 border-l-[#9CAA54] p-6 space-y-5 flex flex-col justify-between">
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

                <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                  Responsibilities differ between states and territories as well
                  as regional, rural, remote and metropolitan local councils.
                  During consultations held for the Local Government Skills
                  Audit and Uptake and Utility of the LGA Local Government
                  Training Package, stakeholders described the following key
                  services delivered by the industry-sector:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray600 pl-4 list-disc">
                  <li>
                    local infrastructure maintenance, utilities and asset
                    management
                  </li>
                  <li>waste management</li>
                  <li>ordinance enforcement</li>
                  <li>community services and safety</li>
                  <li>community planning, infrastructure and programs</li>
                  <li>
                    environmental health, parks and community recreation space
                    management and tree management
                  </li>
                  <li>transport delivery and fleet management</li>
                  <li>
                    community services, such as childcare, aged care, cultural
                    support services and NDIS programs
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-gray200">
                <p className="text-xs font-bold text-notes uppercase">
                  HEARD IN CONSULTATION · LOCAL GOVERNMENT SKILLS AUDIT AND
                  TRAINING PACKAGE PROJECT
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INSIGHT 2 BODY */}
      {insightId === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column (2 White Cards) */}
          <div className="space-y-6">
            {/* Card 1: Technological advancement */}
            <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-5 flex flex-col">
              <h3 className="text-xl font-bold text-gray800">
                Technological advancement
              </h3>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                Across the broader Australian labour market, technological
                advancement is changing the core skills required in certain
                occupations. Adopting new technologies requires rapid
                skilling/upskilling which may challenge traditional approaches
                to training,<sup>29</sup> particularly for local council
                employers that have previously expressed their challenges with
                access to TAFE and RTOs.<sup>30</sup>
              </p>
              <div className="pt-4 border-t border-gray200 mt-auto">
                <p className="text-xs text-notes font-normal">
                  Source: JSA, Connecting for Impact – The Jobs and Skills
                  Report 2025, p. 81 · PSA, LG WIR 2025, pp.14–15.
                </p>
              </div>
            </div>

            {/* Card 2: Increased regulator and community expectations */}
            <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-5 flex flex-col">
              <h3 className="text-xl font-bold text-gray800">
                Increased regulator and community expectations
              </h3>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                Stakeholders generally reported that community expectations of
                local council services have continued to increase. Some reported
                that increased access to technology and technological
                transformation has led to public expectations of local councils
                to provide 24/7 access to flexible, digital-first support which
                can be challenging for smaller or regional, rural and remote
                local councils to accommodate. Where community expectations
                cannot be met, stakeholders noted that rising reports of
                customer aggression toward frontline employees was driving
                investment in conflict resolution training, safety protocols and
                engagement strategies, reducing budgets for VET training
                investment. Waste services and aged care support (delivered by
                some local councils) are facing increasing complexity in their
                compliance and governance requirements. Legislative changes,
                including to the Aged Care Act 2024<sup>31</sup> and commitments
                to mandated Food Organics and Garden Organics (FOGO) recycling
                for households by 2030,<sup>32</sup> increase complexity for
                project officers, engineers and compliance employees in local
                councils.
              </p>
              <div className="pt-4 border-t border-gray200 mt-auto">
                <p className="text-xs text-notes font-normal leading-normal">
                  Source: Department of Health, Disability and Ageing, About the
                  new rights-based Aged Care Act, 2025 · NSW EPA, FOGO mandates
                  and rollout, 2025.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (2 Light Green Cards) */}
          <div className="space-y-6">
            {/* Card 1: Industry Insight */}
            <div className="bg-[#F0F5DF] rounded-2xl border border-gray200 border-l-12 border-l-[#9CAA54] p-6 space-y-5 flex flex-col justify-between">
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
                <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                  Fleet management, water operations and infrastructure services
                  are facing significant technological transformation as
                  automation and electrification are reshaping operational
                  roles. Local councils are adopting smart meters, digital
                  planning tools and AI-driven solutions. AI-enabled planning
                  tools, automation in plant operations and heightened
                  cybersecurity risks demand new technical competencies which
                  will require significant upskilling. Roles once considered
                  manual, such as trades and multi-skilled operators, now
                  require digital literacy, remote operation skills and
                  familiarity with advanced diagnostic tools.
                </p>
              </div>
            </div>

            {/* Card 2: Industry Insight */}
            <div className="bg-[#F0F5DF] rounded-2xl border border-gray200 border-l-12 border-l-[#9CAA54] p-6 space-y-5 flex flex-col justify-between">
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
                <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                  Local councils noted that there are challenges attracting
                  employees skilled in navigating regulatory requirements and
                  working in dynamic environments, making it difficult to
                  anticipate and plan for training and skilling requirements.
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
        </div>
      )}

      {/* INSIGHT 3 BODY */}
      {insightId === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column (2 White Cards) */}
          <div className="space-y-6">
            {/* Card 1: Workforce pressures */}
            <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-5 flex flex-col">
              <h3 className="text-xl font-bold text-gray800">
                Workforce pressures
              </h3>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                Resourcing and recruitment were previously raised as challenging
                for local councils.<sup>33</sup> Key occupations continuing to
                be identified as in shortage include community service officers,
                tradespersons, managers, finance officers and project managers.
                Further, local councils are also struggling to secure
                specialists, particularly Information Technology (IT) and cyber
                security experts, arborists, environmental officers and town
                planners. These shortages are particularly pronounced in
                regional, rural and remote areas where they may be competing
                with private industry. These challenges are further compounded
                as local councils are also experiencing challenges with
                upskilling of their existing employees (particularly where
                expectations or technological skills have changed the core
                competencies of an occupation). Consultation conducted
                throughout the Local Government Skills Audit and Update and
                Utility of the LGA Local Government Training Package project,
                identified differences between recognised occupational shortages
                between states and territories and, in some cases, among
                regional, rural and remote communities. Comparisons with the
                Jobs and Skills Australia Skills Priority List (see data
                presented in the State and Territory Workforce Profile of this
                Report) indicate that while some specialist occupations – such
                as engineers, civil engineers, arborists, maternal health nurses
                and building surveyors – are in national shortage, other
                shortages may be more specific to the Local Government
                industry-sector.
              </p>
              <div className="pt-4 border-t border-gray200 mt-auto">
                <p className="text-xs text-notes font-normal">
                  Source: Local Government Skills Audit consultations · JSA
                  Skills Priority List comparison.
                </p>
              </div>
            </div>

            {/* Card 2: What is needed */}
            <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-5 flex flex-col">
              <h3 className="text-xl font-bold text-gray800">What is needed</h3>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                Support to connect local council employers with VET providers
                who can deliver timely and appropriate skilling training courses
                to address Local Government-specific occupational shortages is
                needed to enable the sector to meet expanding and increasing
                service delivery requirements.
              </p>
              <div className="pt-4 border-t border-gray200 mt-auto">
                <p className="text-xs text-notes font-normal">
                  Source: PSA, 2026 LG WIR — see the State and Territory
                  Workforce Profile for the full shortage comparison data.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (Jurisdictional Shortage List Container) */}
          <div className="bg-[#F0F5DF] rounded-2xl border border-gray200 p-6 space-y-5">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray800">
                The jurisdictional Local Government-specific shortage list
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Occupations which appear to be in shortage specific to the Local
                Government industry-sector in states and territories (when
                compared to National Occupation Shortage List) include:
              </p>
            </div>

            {/* 6-7 State Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* NSW */}
              <div className="rounded-xl overflow-hidden border border-gray200">
                <div className="bg-lg-dark text-white font-bold text-xs p-6 py-2.5">
                  New South Wales
                </div>
                <div className="bg-white p-6 space-y-1.5 text-xs text-gray600 h-full">
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>IT Officer/Cyber Specialist</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Planner</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Tradesperson</span>
                  </div>
                </div>
              </div>

              {/* NT */}
              <div className="rounded-xl overflow-hidden border border-gray200">
                <div className="bg-lg-dark text-white font-bold text-xs p-6 py-2.5">
                  Northern Territory
                </div>
                <div className="bg-white p-6 space-y-1.5 text-xs text-gray600 h-full">
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Community Service Roles</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Managerial Roles</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Tradesperson</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Works Officer</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Community Program Coordinator</span>
                  </div>
                </div>
              </div>

              {/* QLD */}
              <div className="rounded-xl overflow-hidden border border-gray200">
                <div className="bg-lg-dark text-white font-bold text-xs p-6 py-2.5">
                  Queensland
                </div>
                <div className="bg-white p-6 space-y-1.5 text-xs text-gray600 h-full">
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Town Planner</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Tradesperson</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Water Operations Officer</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>IT Officer</span>
                  </div>
                </div>
              </div>

              {/* SA */}
              <div className="rounded-xl overflow-hidden border border-gray200">
                <div className="bg-lg-dark text-white font-bold text-xs p-6 py-2.5">
                  South Australia
                </div>
                <div className="bg-white p-6 space-y-1.5 text-xs text-gray600 h-full">
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Project Manager/Business Analyst</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Community Development Officer</span>
                  </div>
                </div>
              </div>

              {/* TAS */}
              <div className="rounded-xl overflow-hidden border border-gray200">
                <div className="bg-lg-dark text-white font-bold text-xs p-6 py-2.5">
                  Tasmania
                </div>
                <div className="bg-white p-6 space-y-1.5 text-xs text-gray600 h-full">
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Plumbing Inspector</span>
                  </div>
                </div>
              </div>

              {/* VIC */}
              <div className="rounded-xl overflow-hidden border border-gray200">
                <div className="bg-lg-dark text-white font-bold text-xs p-6 py-2.5">
                  Victoria
                </div>
                <div className="bg-white p-6 space-y-1.5 text-xs text-gray600 h-full">
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Mechanic</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Planner</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Human Resources</span>
                  </div>
                </div>
              </div>

              {/* WA */}
              <div className="sm:col-span-2 rounded-xl overflow-hidden border border-gray200 w-1/2">
                <div className="bg-lg-dark text-white font-bold text-xs p-6 py-2.5">
                  Western Australia
                </div>
                <div className="bg-white p-6 space-y-1.5 text-xs text-gray600 h-full">
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Corporate Performance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>IT/Cyber/AI/ERP Specialist</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Environmental Officer</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Finance (rates) Officer</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Urban Planner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
