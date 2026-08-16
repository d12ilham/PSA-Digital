"use client";

import React, { useState } from "react";
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

interface StrategyItem {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  impactItems: {
    title: string;
    description: string;
  }[];
}

const STRATEGIES_DATA: StrategyItem[] = [
  {
    id: 1,
    code: "01-NATIONAL SURVEY",
    title: "2026 Local Government Workforce Skills and Capability Survey",
    subtitle:
      "Australian Local Government Association (ALGA) · Anticipated mid-2026",
    description:
      "ALGA has run the Local Government Workforce Skills and Capabilities Survey since 2018. For the 2026 survey, Public Skills Australia collaborated with ALGA to include new questions on local council skills, occupations and training needs. The 2026 survey received 210 responses from across Australia; results will be integrated into national and state/territory reports in 2026 through the Local Government Skills Audit and Training Package Review project.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "Over 200 local councils responded to the survey. The rich data and contributions provided by these local councils informed detailed consultation with industry-sector stakeholders.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "Collaborating with ALGA on this survey bolstered the Local Government Skills Audit and Training Package Review project by providing an evidence base, with detailed insights on jurisdictional occupational shortages and current training needs.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "This survey will positively impact both 2026 strategies — the Occupational Shortage Mapping and the whole-of-VET-system roundtable — by providing up-to-date data and analysis.",
      },
    ],
  },
  {
    id: 2,
    code: "02-PARLIAMENTARY INQUIRY",
    title: "Parliamentary Inquiry into Local Government Sustainability",
    subtitle:
      "Standing Committee on Regional Development, Infrastructure and Transport · Lapsed",
    description:
      "Examined the sustainability of the Local Government industry-sector — 287 submissions and 16 public hearings, with emphasis on the constant expansion of roles and responsibilities local councils perform, financial sustainability and funding, and workforce trends in attracting and retaining skilled employees.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This inquiry provided greater context and focus on the future of the industry-sector. Consultations and engagements benefited from the interim report findings, which align to the challenges from the ongoing expansion of council roles and responsibilities.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "The Local Government Skills Audit and Training Package Review highlighted similar findings — expansion of core duties, increased service delivery needs and structural barriers to employment.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "The inquiry will inform research on the Facilitate a roundtable on whole-of-VET-system responses strategy by identifying potential systemic responses to current and emerging challenges.",
      },
    ],
  },
  {
    id: 3,
    code: "03-PARLIAMENTARY INQUIRY",
    title:
      "Parliamentary Inquiry into Local Government Funding and Fiscal Sustainability",
    subtitle:
      "Standing Committee on Regional Development, Infrastructure and Transport · Ongoing",
    description:
      "Examines how current funding arrangements affect the ability of local councils to deliver services and invest in infrastructure, building on evidence from the previous sustainability inquiry.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This inquiry informed and aligned to recurring themes in ongoing consultation — stakeholders consistently identified sustainability challenges in the industry-sector.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "Provides context about funding and fiscal elements of workforce skills shortages, as highlighted in the Local Government Skills Audit.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "The inquiry will inform the roundtable strategy research, which seeks to resolve resourcing and cost-based challenges when accessing accredited VET training.",
      },
    ],
  },
  {
    id: 4,
    code: "04-NATIONAL",
    title: "National Housing Accord 2024–2029",
    subtitle: "The Australian Government · Ongoing",
    description:
      "Federal and state/territory governments have agreed to deliver 1.2 million homes over five years from mid-2024, with $3.5 billion in federal funding to assist governments and local councils. Access to housing continues to be a key challenge for attraction and retention in regional, rural and remote LGAs.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "Access to housing continues to be a key challenge for Local Government workforces, particularly attraction and retention in regional, rural and remote LGAs. The Accord will continue to be monitored for workforce impact.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "The Accord provided valuable context for understanding how housing supply impacts skills and occupational shortages across diverse regional, rural and remote contexts during Skills Audit scoping research.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "Progress of the Accord will be factored into the roundtable strategy — housing affects attraction, retention and access to training for regional, rural and remote workforces.",
      },
    ],
  },
  {
    id: 5,
    code: "05-QUEENSLAND",
    title: "Queensland Local Government Workforce Strategy 2024–2028",
    subtitle: "Local Government Association Queensland · 2024–2028",
    description:
      "A succinct plan for developing and strengthening Queensland's Local Government workforce — objectives, strategies and measures centred on supporting the work conducted, building a capable workforce and ensuring a safe working environment.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This strategy informed engagement with Queensland stakeholders, providing insights specific to Queensland's Local Government workforce.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "Queensland-specific objectives and strategies were considered throughout the Skills Audit research and will inform the Queensland jurisdictional report published as part of this work.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "Connecting the LGAQ strategy to RTOs, TAFEs and STTAs/SROs through the roundtable may provide greater opportunity for Queensland councils to overcome access-to-training challenges.",
      },
    ],
  },
  {
    id: 6,
    code: "06-SOUTH AUSTRALIA",
    title: "Workforce and Gender Equality in South Australian Local Government",
    subtitle: "Local Government Professionals South Australia · 2025",
    description:
      "An in-depth overview of the gender equity landscape in South Australian councils: near-equal gender balance but persistent disparities — gender pay gap issues, segregation by workforce streams and longer male length-of-service.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This Report provided specific jurisdictional information for South Australia on a key priority area — valuable context for engagements addressing diversity and inclusion challenges.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "The Skills Audit addressed the workplace gender equality challenges identified in this Report through its National Survey and workshops.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "Themes of diversity and inclusion identified in this Report will inform the roundtable strategy's engagement across South Australia.",
      },
    ],
  },
  {
    id: 7,
    code: "07-WESTERN AUSTRALIA",
    title:
      "2023 Local Government Workforce Shortages Survey in Western Australia",
    subtitle: "Local Government Professionals Western Australia · 2023",
    description:
      "Found significant recruitment and retention challenges driven by persistent skills shortages, geographic constraints and strong competition from other industries; recommended more targeted, flexible training.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This survey informed engagement with Western Australian stakeholders, supporting Public Skills Australia to understand jurisdiction-specific skills and training challenges.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "The survey shaped the development of the industry-sector-wide surveys for the Skills Audit and is a reference point of comparison for the Western Australian jurisdictional report.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "Provides Western Australian context for the roundtable strategy on recruitment, retention and more targeted, flexible training delivery.",
      },
    ],
  },
  {
    id: 8,
    code: "08-NATIONAL",
    title: "Careers at Council",
    subtitle: "Seven LG Associations + ALGA · Ongoing",
    description:
      "An online hub showcasing the career areas and occupations employed by local councils, where potential employees can search current job opportunities and register for alerts.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "The Hub has informed consultation — several stakeholders referred to insights from this recruitment initiative, providing specific understanding of how local councils organise their workforces.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "The Hub informed the Skills Audit's understanding of the breadth of occupations employed across local councils.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "Supports promoting the Local Government industry-sector as a sustainable and skilled career pathway — the objective of the roundtable strategy.",
      },
    ],
  },
  {
    id: 9,
    code: "09-VICTORIA",
    title: "Earn and Learn Program",
    subtitle:
      "RMIT, Swinburne, Victoria University and Federation University · 2024-ongoing",
    description:
      "A nationally recognised work-based-learning qualification delivered with industry — students earn a wage while completing their degree, creating pathways into occupations with critical skills shortages.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This program informed engagement with stakeholders, particularly when discussing apprenticeship and traineeship opportunities in Local Government workforces.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "The Skills Audit was informed by this program's findings on the industry-sector's demand for work-based-learning training programs.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "A collaboration model with higher-education institutions that will inform whole-of-VET-system conversations at the roundtable.",
      },
    ],
  },
  {
    id: 10,
    code: "10-NEW SOUTH WALES",
    title: "Fresh Start Program",
    subtitle: "LGNSW & NSW Department of Planning and Environment · Ongoing",
    description:
      "Targeted initiative supporting career transition for displaced workers into essential local government roles.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "Informed consultation regarding career transition pathways and reskilling initiatives across NSW local councils.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "Provided valuable evidence for the Skills Audit on reskilling programs for plant operators and asset maintenance roles.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "Informs the roundtable strategy on structured mentoring and transition pathways into local government employment.",
      },
    ],
  },
  {
    id: 11,
    code: "11-NORTHERN TERRITORY",
    title:
      "Local Government Association of the Northern Territory Strategic Plan",
    subtitle: "LGANT · 2025-2028",
    description:
      "Outlines LGANT's purpose, vision and focus areas — advocacy, development, engagement and performance — including strategies to connect workforces to further training and technical expertise.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This Plan provided context when engaging with Northern Territory stakeholders, informing current challenges faced by their workforces and the initiatives being developed to mitigate them.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "Informed the development phase of the Skills Audit by providing specific jurisdictional data and workforce challenges.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "This Plan will provide insights specific to the Northern Territory for the roundtable strategy.",
      },
    ],
  },
  {
    id: 12,
    code: "12-TASMANIA",
    title: "Local Government Association of Tasmania Strategic Plan",
    subtitle: "LGAT · 2025-2030",
    description:
      "Highlights key outcomes for mitigating local council challenges to 2030 through advocacy, leadership, support and representation — including outcomes specific to the skills and training needs of workforces.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This Plan provided valuable context for stakeholder engagement in Tasmania, outlining current workforce challenges and the initiatives being developed to address them.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "Informed the Skills Audit by bolstering state-based data for Tasmania — valuable in identifying specific workforce planning challenges and opportunities.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "This Plan will provide insights specific to Tasmania for the roundtable strategy.",
      },
    ],
  },
];

export default function ExistingIndustryStrategiesView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number>(1);

  const selectedStrategy =
    STRATEGIES_DATA.find((s) => s.id === selectedId) || STRATEGIES_DATA[0];

  const handlePrev = () => {
    if (selectedId > 1) {
      setSelectedId(selectedId - 1);
    }
  };

  const handleNext = () => {
    if (selectedId < STRATEGIES_DATA.length) {
      setSelectedId(selectedId + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="existing_strategies"
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() =>
              router.push(`/reports/${slug}/update_2025_strategies`)
            }
            className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray200 text-[#728C28] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Update on 2025
            Strategies
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/federal_initiatives`)}
            className="bg-[#8AC900] hover:bg-[#77A60D] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            Next Section: Commonwealth Government Initiatives{" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ── HERO BANNER CARD WITH GRAPHIC ── */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#046D2A] leading-tight">
              Existing Industry-Sector Strategies
            </h1>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal w-full lg:w-5/6">
              Public Skills Australia's work is informed and guided by the
              existing Industry-Sector Strategies detailed below. Select any
              strategy on the left — its detail opens immediately beside the
              list.
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto flex justify-center lg:justify-end">
            <img
              src="/images/hero-graphic-existing.png"
              alt="Existing Industry-Sector Strategies Graphic"
              className="w-full max-w-[340px] sm:max-w-[420px] object-contain"
            />
          </div>
        </div>

        {/* ── MASTER-DETAIL 2-COLUMN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LEFT COLUMN: LIST OF 12 STRATEGIES */}
          <div className="lg:col-span-1 space-y-3">
            {STRATEGIES_DATA.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`rounded-2xl p-5 border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-[#046D2A1A] border-2 border-lg-dark"
                      : "bg-white border-gray200 hover:border-gray300"
                  }`}
                >
                  <div className="space-y-4 flex-1">
                    <span className="text-xs font-semibold text-lg-dark uppercase block">
                      {item.code}
                    </span>
                    <h3 className="font-bold text-gray800 leading-normal">
                      {item.title}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-white text-gray800 border border-[#9CAA54]"
                        : "bg-[#8AC900] text-gray800"
                    }`}
                  >
                    <ArrowRight className="h-4 w-4 text-gray800" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: SELECTED STRATEGY DETAIL PANEL */}
          <div className="lg:col-span-2 bg-[#E5E8DA] rounded-2xl p-5 sm:p-6 space-y-5 lg:sticky lg:top-20">
            {/* Top Bar inside Detail Panel */}
            <div className="flex items-center justify-between gap-4">
              <span className="bg-lg-dark text-white text-xs font-semibold px-5 py-2.5 rounded-full uppercase">
                {selectedStrategy.code}
              </span>
              <div className="flex items-center gap-3">
                {selectedId > 1 && (
                  <button
                    onClick={handlePrev}
                    className={`text-xs font-bold px-5 py-2.5 rounded-full cursor-pointer transition-colors flex items-center gap-1.5 ${
                      selectedId === STRATEGIES_DATA.length
                        ? "bg-[#8AC900] hover:bg-[#77A60D] text-gray800"
                        : "border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray200 text-[#728C28]"
                    }`}
                  >
                    <ArrowLeft
                      className={`h-3.5 w-3.5 ${
                        selectedId === STRATEGIES_DATA.length
                          ? "text-gray800"
                          : "text-[#728C28]"
                      }`}
                    />
                    <span>Previous</span>
                  </button>
                )}
                {selectedId < STRATEGIES_DATA.length && (
                  <button
                    onClick={handleNext}
                    className="bg-[#8AC900] hover:bg-[#77A60D] text-gray800 text-xs font-bold px-5 py-2.5 rounded-full cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-3.5 w-3.5 text-gray800" />
                  </button>
                )}
              </div>
            </div>
            {/* Inner White Content Card */}
            <div className="bg-[#FAFAF0] rounded-2xl p-6 sm:p-8 space-y-5">
              {/* Title & Subtitle */}
              <div className="space-y-5">
                <h2 className="text-lg sm:text-xl font-bold text-gray800 leading-snug">
                  {String(selectedStrategy.id).padStart(2, "0")} ·{" "}
                  {selectedStrategy.title}
                </h2>
                <p className="text-sm font-semibold text-notes block">
                  {selectedStrategy.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                {selectedStrategy.description}
              </p>

              <hr className="border-t border-gray200 my-4" />

              {/* Impact Section */}
              <div className="space-y-5 pt-1">
                <span className="text-xs font-bold text-notes uppercase block">
                  HOW THIS INFORMS PUBLIC SKILLS AUSTRALIA'S WORK
                </span>

                <div className="space-y-5">
                  {selectedStrategy.impactItems.map((impact, idx) => (
                    <div
                      key={idx}
                      className="bg-[#F0F5DF] rounded-xl border-l-12 border-l-[#9CAA54] p-4 sm:p-5 space-y-3"
                    >
                      <h3 className="font-medium text-gray800">
                        {impact.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                        {impact.description}
                      </p>
                    </div>
                  ))}
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
