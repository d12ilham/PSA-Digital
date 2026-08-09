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
    subtitle: "Australian Local Government Association (ALGA) · Anticipated mid-2026",
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
      "House of Representatives Standing Committee on Regional Development, Infrastructure and Transport",
    description:
      "Examined the operational challenges, cost pressures, and financial sustainability faced by local councils across regional, rural, and metropolitan Australia.",
    impactItems: [
      {
        title: "Workforce & Service Delivery Scope",
        description:
          "Confirmed that the role of local councils has expanded over time into broader community services, impacting workforce capacity.",
      },
      {
        title: "Financial & Resourcing Evidence",
        description:
          "Provided evidence on regional infrastructure and funding gaps affecting staff recruitment and retention.",
      },
    ],
  },
  {
    id: 3,
    code: "03-PARLIAMENTARY INQUIRY",
    title: "Parliamentary Inquiry into Local Government Funding and Fiscal Sustainability",
    subtitle: "Parliamentary Joint Committee on Local Government",
    description:
      "Investigated revenue streams, grant allocation models, and long-term financial sustainability mechanisms for local councils across Australia.",
    impactItems: [
      {
        title: "Funding Models",
        description:
          "Identified disparities in grant distribution impacting remote and regional councils' ability to offer competitive salaries.",
      },
      {
        title: "VET Training Investment",
        description:
          "Highlighted the need for dedicated funding streams for continuous workforce upskilling.",
      },
    ],
  },
  {
    id: 4,
    code: "04-NATIONAL",
    title: "National Housing Accord 2024–2029",
    subtitle: "Commonwealth, State and Territory Governments & Local Government",
    description:
      "A target to deliver 1.2 million well-located new homes over five years, requiring significant local government planning, building certification, and infrastructure approval capacity.",
    impactItems: [
      {
        title: "Planning & Building Shortages",
        description:
          "Increased urgency for town planners, building surveyors, and civil engineers across local councils.",
      },
      {
        title: "Skill Sets & Fast-Tracking",
        description:
          "Informed training needs for streamlined development assessment processes.",
      },
    ],
  },
  {
    id: 5,
    code: "05-QUEENSLAND",
    title: "Queensland Local Government Workforce Strategy 2024–2028",
    subtitle: "LGAQ & Queensland State Government",
    description:
      "Strategic roadmap addressing skill shortages, regional recruitment, First Nations employment, and digital transformation across Queensland's 77 local councils.",
    impactItems: [
      {
        title: "Regional Attraction",
        description:
          "Pioneered shared workforce models for rural and remote local councils.",
      },
      {
        title: "First Nations Pathways",
        description:
          "Established targeted traineeships and apprenticeships in Indigenous councils.",
      },
    ],
  },
  {
    id: 6,
    code: "06-SOUTH AUSTRALIA",
    title: "Workforce and Gender Equality in South Australian Local Government",
    subtitle: "LGA SA & Office for Women",
    description:
      "Framework to promote gender pay equity, leadership development for women, and inclusive workplace culture across South Australian councils.",
    impactItems: [
      {
        title: "Diversity & Inclusion",
        description:
          "Provided baseline data on female leadership representation in technical and executive council roles.",
      },
      {
        title: "Retention Strategies",
        description:
          "Informed flexible work practices to improve workforce retention.",
      },
    ],
  },
  {
    id: 7,
    code: "07-WESTERN AUSTRALIA",
    title: "2023 Local Government Workforce Shortages Survey in Western Australia",
    subtitle: "WALGA",
    description:
      "Comprehensive survey analyzing critical skill shortages, turnover rates, and training package uptake across 139 WA local governments.",
    impactItems: [
      {
        title: "Technical Skill Gaps",
        description:
          "Highlighted severe shortages in environmental health officers, civil engineers, and heavy vehicle mechanics.",
      },
      {
        title: "Training Package Utility",
        description:
          "Identified specific LGA Training Package units requiring modernization for remote operations.",
      },
    ],
  },
  {
    id: 8,
    code: "08-NATIONAL",
    title: "Careers at Council",
    subtitle: "National Local Government Associations Network",
    description:
      "National initiative promoting local government as an employer of choice, highlighting diverse career opportunities and community impact.",
    impactItems: [
      {
        title: "Sector Awareness",
        description:
          "Attracted school leavers and mid-career changers to civil, environmental, and community roles.",
      },
      {
        title: "VET Pathway Promotion",
        description:
          "Directly linked VET qualifications to local government career progression maps.",
      },
    ],
  },
  {
    id: 9,
    code: "09-VICTORIA",
    title: "Earn and Learn Program",
    subtitle: "MAV & Victorian State Government",
    description:
      "Supported employment program enabling trainees and apprentices to earn a wage while completing VET qualifications in local government.",
    impactItems: [
      {
        title: "Entry-Level Pathways",
        description:
          "Created structured entry routes for youth into horticulture, administration, and public works.",
      },
      {
        title: "Regional Skilling",
        description:
          "Provided wage subsidies for regional Victorian councils to host apprentices.",
      },
    ],
  },
  {
    id: 10,
    code: "10-NEW SOUTH WALES",
    title: "Fresh Start Program",
    subtitle: "LGNSW & NSW Department of Planning and Environment",
    description:
      "Targeted initiative supporting career transition for displaced workers into essential local government roles.",
    impactItems: [
      {
        title: "Reskilling Programs",
        description:
          "Accelerated training pathways for plant operators and asset maintenance specialists.",
      },
      {
        title: "Council Retention",
        description:
          "Improved retention through structured mentoring and ongoing professional development.",
      },
    ],
  },
  {
    id: 11,
    code: "11-NORTHERN TERRITORY",
    title: "Local Government Association of the Northern Territory Strategic Plan",
    subtitle: "LGANT",
    description:
      "Strategic priorities for NT councils focusing on remote community governance, infrastructure resilience, and First Nations workforce development.",
    impactItems: [
      {
        title: "Remote Services",
        description:
          "Addressed specific training needs for multi-skilled community service and works officers.",
      },
      {
        title: "Cultural Capability",
        description:
          "Embedded cultural safety training across regional council operations.",
      },
    ],
  },
  {
    id: 12,
    code: "12-TASMANIA",
    title: "Local Government Association of Tasmania Strategic Plan",
    subtitle: "LGAT",
    description:
      "Statewide strategy supporting Tasmanian councils with shared services, emergency management capability, and asset management training.",
    impactItems: [
      {
        title: "Shared Services",
        description:
          "Facilitated regional resource sharing for specialized roles like building surveyors and environmental officers.",
      },
      {
        title: "Emergency Preparedness",
        description:
          "Strengthened VET emergency response training for council field staff.",
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

  const handleNext = () => {
    if (selectedId < STRATEGIES_DATA.length) {
      setSelectedId(selectedId + 1);
    } else {
      setSelectedId(1);
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
            onClick={() => router.push(`/reports/${slug}/update_2025_strategies`)}
            className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray200 text-[#728C28] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Update on 2025 Strategies
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/federal_initiatives`)}
            className="bg-[#8AC900] hover:bg-[#77A60D] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            Next Section: Commonwealth Government Initiatives <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ── HERO BANNER CARD WITH GRAPHIC ── */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#046D2A] leading-tight">
              Existing Industry-Sector Strategies
            </h1>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal w-full lg:w-5/6">
              Public Skills Australia's work is informed and guided by the existing Industry-Sector Strategies detailed below. Select any strategy on the left — its detail opens immediately beside the list.
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
                      ? "bg-[#FAFAF0] border-[#9CAA54]"
                      : "bg-white border-gray200 hover:border-gray300"
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <span className="text-xs font-semibold text-notes uppercase block">
                      {item.code}
                    </span>
                    <h3 className="text-sm font-bold text-gray800 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[#046D2A] text-white"
                        : "bg-[#8AC900] text-gray800"
                    }`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: SELECTED STRATEGY DETAIL PANEL */}
          <div className="lg:col-span-2 bg-[#F0F5DF] rounded-2xl border border-gray200 p-6 sm:p-8 space-y-6 lg:sticky lg:top-8">
            {/* Top Bar inside Detail Panel */}
            <div className="flex items-center justify-between gap-4">
              <span className="bg-[#046D2A] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                {selectedStrategy.code}
              </span>
              <button
                onClick={handleNext}
                className="bg-[#8AC900] hover:bg-[#77A60D] text-gray800 text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors flex items-center gap-1"
              >
                <span>Next</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray800 leading-snug">
                {String(selectedStrategy.id).padStart(2, "0")} - {selectedStrategy.title}
              </h2>
              <p className="text-xs font-bold text-notes block">
                {selectedStrategy.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
              {selectedStrategy.description}
            </p>

            {/* Impact Section */}
            <div className="space-y-4 pt-2">
              <span className="text-xs font-bold text-notes uppercase tracking-wider block">
                HOW THIS INFORMS PUBLIC SKILLS AUSTRALIA'S WORK
              </span>

              <div className="space-y-3">
                {selectedStrategy.impactItems.map((impact, idx) => (
                  <div
                    key={idx}
                    className="bg-white/80 rounded-2xl border border-gray200 p-5 space-y-1.5"
                  >
                    <h3 className="text-sm font-bold text-gray800">
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
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
