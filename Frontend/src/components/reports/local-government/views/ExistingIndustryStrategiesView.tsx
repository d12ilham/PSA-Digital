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

interface StrategyItem {
  id: number;
  code: string;
  title: string;
  subtitle?: string;
  owners?: string[];
  status?: string;
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
      "ALGA has run the Local Government Workforce Skills and Capabilities Survey since 2018. For the 2026 survey, Public Skills Australia collaborated with ALGA to include new questions on local council skills, occupations, and training needs. The 2026 survey received 210 responses from across Australia. The results of this survey will be integrated into national and state/territory reports in 2026 through Public Skills Australia's delivery of the Local Government Skills Audit and Review of Uptake and Utility of the LGA Local Government Training Package project.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "Over 200 local councils responded to the survey. The rich data and contributions provided by these local councils informed detailed consultation with Local Government industry-sector stakeholders particularly through engagement with the research process and findings.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "Collaborating with ALGA on this survey bolstered the Local Government Skills Audit and Review of Uptake and Utility of the LGA Local Government Training Package project by providing an evidence base. This survey provided detailed insights and data, particularly for jurisdictional-specific occupational shortages and current training needs.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "This survey will positively impact the Mapping of Local Government occupational shortages to relevant VET training products and Facilitate a roundtable on whole of VET system responses to Local Government challenges strategies, by providing up-to-date data and analysis.",
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
      "The Parliamentary Inquiry into Local Government Sustainability, conducted by a House of Representatives Committee, is examining the sustainability of the Local Government industry-sector. Through submissions and hearings, it has gathered insights from Local Government stakeholders on key challenges. This includes ongoing issues relating to financial sustainability and funding, increasing infrastructure and service delivery obligations, structural barriers that affect local council employees and the services they provide, and workforce trends, particularly in attracting and retaining skilled employees, and the impacts of labourhire practices. The inquiry received 287 submissions, held 16 public hearings and examined the sustainability of service delivery in the Local Government industry-sector, with emphasis on the constant expansion of roles and responsibilities that local councils perform.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This inquiry has provided greater context and focus on the future of the Local Government industry-sector. Public Skills Australia's consultations and engagements have benefited from the interim report findings, which align to the challenges from the ongoing expansion of roles and responsibilities of local councils across Australia.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "The Local Government Skills Audit and uptake and utility of the LGA Local Government Training Package highlighted similar findings to this inquiry which contribute to ongoing skills challenges for the Local Government workforce, such as the expansion of core duties, increased service delivery needs and structural barriers to employment.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "The inquiry will inform Public Skills Australia's research on the Facilitate a roundtable on whole of VET system responses to Local Government challenges strategy by identifying potential systemic responses to the current and emerging challenges local councils are experiencing.",
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
      "The Inquiry is being undertaken by referral from the Minister of Emergency Management; Minister for Regional Development Local Government and Territories, to examine how current funding arrangements affect the ability of local councils to deliver services and invest in infrastructure. This Inquiry notes the evidence provided in the previous Parliamentary Inquiry into Local Government Sustainability, which will be considered in this inquiry as per the terms of reference. This Inquiry seeks submissions that provide further information into this issue. Submissions have been closed at time of publishing this Report.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This Inquiry informed and aligned to recurring themes in Public Skills Australia's ongoing consultation with stakeholders. Stakeholders consistently identified challenges with sustainability in the Local Government industry-sector.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "Expanding roles and responsibilities is a consistent theme identified in Public Skills Australia's research and this Inquiry provides context about funding and fiscal elements of workforce skills shortages across the Local Government industry-sector. This was highlighted in the Local Government Skills Audit and uptake and utility of the LGA Local Government Training Package, noting the obligations local councils have to their communities.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "The Inquiry will inform the research into the Facilitate a roundtable on whole of VET system responses to Local Government challenges proposed strategy, that will seek to resolve resourcing and cost based challenges when accessing accredited VET training.",
      },
    ],
  },
  {
    id: 4,
    code: "04-NATIONAL",
    title: "National Housing Accord 2024 - 2029",
    subtitle: "The Australian Government · Ongoing",
    description:
      "The federal and state/territory governments have all agreed to deliver 1.2 million homes over five years commencing in mid-2024, as part of a broader housing agenda supporting social housing, renters and homebuyers. National Cabinet has endorsed $3.5 billion in federal funding to assist state/territory governments and local councils in delivering the National Housing Accord 2024-2029 (The Accord).",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "Access to housing continues to be a key challenge for Local Government Workforces, particularly in attraction and retention in regional, rural and remote LGAs. The Accord will continue to be monitored to assess impact to the Local Government workforces.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "The Accord provided valuable context for understanding how housing supply impacts skills and occupational shortages across diverse regional, rural and remote contexts as part Public Skills Australia's scoping research for the Local Government Skills Audit and review of the uptake and utility of the LGA Local Government Training Package.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "Public Skills Australia will continue to monitor the progress of the Accord and factor this progress into the Facilitate a roundtable on whole of VET system responses to Local Government challenges. Whilst housing is not directly in the remit of Jobs and Skills Councils, challenges facing regional, rural and remote Local Government workforces such as attraction and retention, as well as access to training, may be impacted by this strategy.",
      },
    ],
  },
  {
    id: 5,
    code: "05-QUEENSLAND",
    title: "Queensland Local Government Workforce Strategy 2024 - 2028",
    subtitle: "Local Government Association Queensland · 2024 - 2028",
    description:
      "The LGAQ Workforce Strategy 2024-2028 (The Strategy) provides a succinct plan for developing and strengthening the Local Government industry-sector in Queensland and its workforce. It sets out objectives, strategies and measures, and identifies risks and opportunities. Key themes centre around support for the work conducted, building a capable workforce and ensuring a safe working environment.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This strategy informed engagement with Queensland Local Government stakeholders and provided insights specific to Queensland's Local Government workforce.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "Queensland-specific objectives and strategies were considered throughout the process of research for the Local Government Skills Audit and review of the uptake and utility of the LGA Local Government Training Package and will inform the jurisdictional report for Queensland, published as part of this work.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "Jurisdictional context is important for the Facilitate a roundtable on whole of VET system responses to Local Government challenges. Connecting the LGAQ's Workforce Strategy to the broader influential organisations, including RTOs, TAFEs, STTAs/SROs may provide greater opportunity for Queensland local councils to overcome their access to training challenges.",
      },
    ],
  },
  {
    id: 6,
    code: "06-SOUTH AUSTRALIA",
    title: "Workforce and Gender Equality in South Australian Local Government",
    subtitle: "Local Government Professionals South Australia · 2025",
    description:
      "The Workforce Gender and Equality in South Australian Local Government Report (This Report), provides an in-depth overview of the current gender equity landscape in South Australia, and more specifically in its local councils. The Report highlights an almost equal gender balance in South Australia's Local Government workforce but acknowledges that there are still disparities. This Report goes further to highlight gender pay gap issues, segregation by workforce streams (e.g. women making up more part-time, casual and short-term contract roles) and that the length of service is generally longer for males.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This Report provided specific jurisdictional information for the Local Government industry-sector in South Australia on a key priority area. It provides valuable context in engagements with stakeholders addressing diversity and inclusion challenges.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "The Local Government Skills Audit and review of the uptake and utility of the LGA Local Government Training Package addressed challenges with workplace gender equality identified in this Report, through the National Survey and workshops undertaken for this project.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "Addressing themes of diversity and inclusion, in this case, gender equality, are leading themes for the Facilitate a roundtable on whole of VET system responses to Local Government challenges. This Report will inform Public Skills Australia's broader understanding of gender parity and different gendered workforce experiences in Local Government, and the challenges and opportunities these present.",
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
      "The 2023 Local Government Workforce Shortage Survey in Western Australia (This Survey) found significant recruitment and retention challenges, driven by persistent skills shortages, geographic constraints and strong competition from other industries. It also highlighted the growing role of social media in recruitment and upskilling and recommended more targeted, flexible training to strengthen the workforce and support effective service delivery.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This survey informed engagement with Western Australian Local Government Stakeholders, supporting Public Skills Australia to understand jurisdictional-specific skills and training challenges.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "This survey was valuable in identifying the key aspects in Public Skills Australia's development of industry-sector-wide surveys for the Local Government Skills Audit and uptake and utility of the LGA Local Government Training Package. This survey provided context in Public Skills Australia's engagement with Western Australian stakeholders for this project and is a reference point of comparison as the jurisdictional report for Western Australia it publishes.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "Findings from this survey will provide specific data for Western Australian local councils and will be informative in the project to Map Local Government occupational shortages to relevant VET training product, to identify opportunities for Local Government in Western Australia.",
      },
    ],
  },
  {
    id: 8,
    code: "08-NATIONAL",
    title: "Careers at Council",
    owners: [
      "Local Government NSW",
      "Local Government Association of South Australia",
      "Municipal Association of Victoria",
      "Local Government Association Tasmania",
      "Western Australian Local Government Association",
      "Local Government Association Queensland",
      "Local Government Association of the Northern Territory",
    ],
    status: "Ongoing",
    description:
      "The Careers at Council Hub (The Hub) is an online database that showcases the career areas and occupations employed by local councils, and what potential employees can expect from having a career in the Local Government industry-sector. It is informed and run by seven Local Government Associations and the Australian Local Government Association. Potential employees can also search for current job opportunities and register to be informed of opportunities.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "The Hub has informed consultation as several Local Government stakeholders have referred to insights and information garnered through this recruitment initiative. These insights have provided specific understanding for how local councils organise their workforces.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "The Hub informed the Local Government Skills Audit and uptake and utility of the LGA Local Government Training Package, to understand the breadth of occupations currently employed in the Local Government industry-sector.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "The categories of occupations provided by the Hub will inform research for the project to Map Local Government occupational shortages to relevant VET training products project, by providing a list of occupations employed by local councils nationally. This will then be mapped against the LGA Local Government Training Package to identify greater training pathways and opportunities for occupations that are currently in shortage across the Local Government industry-sector.",
      },
    ],
  },
  {
    id: 9,
    code: "09-VICTORIA",
    title: "Earn and Learn Program",
    subtitle:
      "RMIT, Swinburne, Victoria University and Federation University · 2024 - ongoing",
    description:
      "The Earn and Learn Program (This Program) is designed to address skills shortages that are critical to Australia's future economic prosperity. It is a nationally recognised work-based-learning qualification to be delivered in collaboration with industry. Students will earn a wage while completing their degree and be partially sponsored through the employer and learn skills of the job-role at the same time. For the Local Government industry-sector, it is an opportunity to fill critical skills shortages by creating pathways into occupations in collaboration with higher-education institutions.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This program has informed engagement with Local Government stakeholders, particularly when discussing apprenticeship and traineeship opportunities in Local Government workforces, and how this program may provide an opportunity for the Local Government industry-sector.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "The Local Government Skills Audit and uptake and utility of the LGA Local Government Training Package was informed by this program, by providing findings on the industry-sector's demand for these types of training programs.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "The Mapping of Local Government occupational shortages to relevant VET training products project, will be informed by this program to understand the current training landscape in VET, and in higher education institutions.",
      },
    ],
  },
  {
    id: 10,
    code: "10-NEW SOUTH WALES",
    title: "Fresh Start Program",
    subtitle: "NSW Office of Local Government · 2025 - 2031",
    description:
      "The New South Wales Government aims to increase the Local Government workforce through the employment of apprentices for a period of six years, starting January 2026, through the Fresh Start Program (This Program). Through a grant program with councils, the NSW Government will provide local councils with funding for wages and ongoing costs of employment. This aims to increase the capacity of the NSW Local Government workforce, generate local knowledge, training and employment opportunities, and contribute to the National Agreement on Closing the Gap.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This program provided context on current workforce needs for NSW local councils, and potential challenge mitigation opportunities through further training and employment opportunities in collaboration with other levels of Government.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "This program informed the Local Government Skills Audit and uptake and utility of the Local Government Training Package, by providing specific jurisdictional data for NSW. This program also contributed to a broader understanding around different and novel approaches to training attraction and promotion.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "This program will inform the Mapping of Local Government Occupational Shortages to relevant VET training products by providing comparative data and the opportunity for knowledge sharing among other states and territories.",
      },
    ],
  },
  {
    id: 11,
    code: "11-NORTHERN TERRITORY",
    title:
      "Local Government Association of the Northern Territory Strategic Plan",
    subtitle: "Local Government Association of the Northern Territory · 2025 - 2028",
    description:
      "The Local Government Association of the Northern Territory Strategic Plan (This Plan) outlines LGANT's purpose, vision, values and focus areas. The main priorities to support the Local Government workforces in the Northern Territory include advocacy, development, engagement and performance. Included in these areas of support include strategies to connect workforces to further training and technical expertise and facilitate strong engagement to understand ongoing operational needs of local councils and their workforces.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This Plan provided context when engaging with stakeholders in the Northern Territory, informing current challenges faced by their Local Government Workforces, and future initiatives being conducted to mitigate these challenges.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "This Plan informed the development phase of the Local Government Skills Audit and uptake and utility of the Local Government Training Package by providing specific jurisdictional data and workforce challenges.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "This Plan will provide insights specific to the Northern Territory for the Facilitate a roundtable on whole of VET system responses to Local Government challenges. This will ensure engagement with stakeholders for this Project are robust and sensitive to specific opportunities and challenges in the Northern Territory. This Plan will be important for key stakeholders to connect to as part of this strategy, to ensure that any whole-of-system response meets the needs and goals of LGANT and the local councils.",
      },
    ],
  },
  {
    id: 12,
    code: "12-TASMANIA",
    title: "Local Government Association of Tasmania Strategic Plan",
    subtitle: "Local Government Association Tasmania · 2025 - 2030",
    description:
      "The Local Government Association of Tasmania's Strategic Plan (This Plan) highlights key outcomes for the mitigation of local council challenges for this cycle of planning until 2030. This will be achieved through advocacy, leadership, support and representation of Tasmania's local councils. This Plan includes outcomes specific to the skills and training needs of the workforces to ensure the needs to Tasmanian communities are being met.",
    impactItems: [
      {
        title: "Consultation and engagement",
        description:
          "This Plan provided valuable context for stakeholder engagement in Tasmania, outlining current workforce challenges and the initiatives being developed to address them.",
      },
      {
        title: "2025 Workforce Strategies",
        description:
          "This Plan informed the development of the Local Government Skills Audit and uptake and utility of the Local Government Training Package by bolstering the specific state-based data for Tasmania. This was valuable in identifying specific workforce planning challenges and opportunities addressed in the audit.",
      },
      {
        title: "2026 Workforce Strategies",
        description:
          "This Plan will provide insights specific to Tasmania in the Facilitate a roundtable on whole of VET system responses to Local Government challenges. This will inform Public Skills Australia's consultation on the roundtable, by informing discussions of workforce planning opportunities and challenges in the Tasmanian context and ensuring that any whole-of-system response meets the needs and goals of LGAT and the local councils.",
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
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [isHeroMounted, setIsHeroMounted] = useState(false);

  useEffect(() => {
    setIsHeroMounted(true);
  }, []);

  const selectedStrategy =
    STRATEGIES_DATA.find((s) => s.id === selectedId) || STRATEGIES_DATA[0];

  const handlePrev = () => {
    const current = selectedId ?? 1;
    if (current > 1) {
      setSelectedId(current - 1);
    }
  };

  const handleNext = () => {
    const current = selectedId ?? 1;
    if (current < STRATEGIES_DATA.length) {
      setSelectedId(current + 1);
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
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#046D2A] leading-tight animate-slide-up">
              Existing Industry-Sector Strategies
            </h1>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal w-full lg:w-5/6 animate-slide-up-delay">
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
              className={`w-full max-w-[340px] sm:max-w-[420px] object-contain select-none pointer-events-none ${
                isHeroMounted ? "animate-hero-pulse-settle" : "opacity-0"
              }`}
            />
          </div>
        </div>

        {/* ── MASTER-DETAIL 2-COLUMN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LEFT COLUMN: LIST OF 12 STRATEGIES */}
          <div className="lg:col-span-1 space-y-3">
            {STRATEGIES_DATA.map((item, idx) => {
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
                        ? "bg-[#046D2A]/10 border-2 border-lg-dark shadow-xs"
                        : "bg-white border-gray200 hover:border-[#9CAA54] hover:bg-[#FAFAF0] hover:shadow-xs"
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
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isSelected
                          ? "bg-white text-gray800 border border-[#9CAA54] rotate-90 lg:rotate-0"
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
                            {String(item.id).padStart(2, "0")} · {item.title}
                          </h2>
                          {item.owners ? (
                            <div className="flex items-start justify-between gap-3 text-xs sm:text-sm font-semibold text-notes">
                              <div className="space-y-0.5">
                                {item.owners.map((owner) => <p key={owner}>{owner}</p>)}
                              </div>
                              <span className="shrink-0">{item.status}</span>
                            </div>
                          ) : (
                            <p className="text-xs sm:text-sm font-semibold text-notes block">
                              {item.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                          {item.description}
                        </p>

                        <hr className="border-t border-gray200 my-3" />

                        {/* Impact Section */}
                        <div className="space-y-4 pt-1">
                          <span className="text-xs font-bold text-notes uppercase block">
                            HOW THIS INFORMS PUBLIC SKILLS AUSTRALIA'S WORK
                          </span>

                          <div className="space-y-3">
                            {item.impactItems.map((impact, impactIdx) => (
                              <div
                                key={impactIdx}
                                className="bg-[#F0F5DF] rounded-xl border-l-8 sm:border-l-12 border-l-[#9CAA54] p-3.5 sm:p-4 space-y-2 transition-all duration-300"
                              >
                                <h3 className="font-medium text-xs sm:text-sm text-gray800">
                                  {impact.title}
                                </h3>
                                <p className="text-xs text-gray600 leading-relaxed">
                                  {impact.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* RIGHT COLUMN: SELECTED STRATEGY DETAIL PANEL (Desktop only) */}
          <div className="hidden lg:block lg:col-span-2 bg-[#E5E8DA] rounded-2xl p-5 sm:p-6 space-y-5 lg:sticky lg:top-20">
            {/* Top Bar inside Detail Panel */}
            <div className="flex items-center justify-between gap-4">
              <span className="bg-lg-dark text-white text-xs font-semibold px-5 py-2.5 rounded-full uppercase">
                {selectedStrategy.code}
              </span>
              <div className="flex items-center gap-3">
                {(selectedId ?? 1) > 1 && (
                  <button
                    onClick={handlePrev}
                    className={`text-xs font-bold px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 flex items-center gap-1.5 ${
                      (selectedId ?? 1) === STRATEGIES_DATA.length
                        ? "bg-[#8AC900] hover:bg-[#77A60D] text-gray800"
                        : "border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray200 text-[#728C28]"
                    }`}
                  >
                    <ArrowLeft
                      className={`h-3.5 w-3.5 ${
                        (selectedId ?? 1) === STRATEGIES_DATA.length
                          ? "text-gray800"
                          : "text-[#728C28]"
                      }`}
                    />
                    <span>Previous</span>
                  </button>
                )}
                {(selectedId ?? 1) < STRATEGIES_DATA.length && (
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
              key={`desktop-strategy-content-${selectedId ?? "default"}`}
              className="bg-[#FAFAF0] rounded-2xl p-6 sm:p-8 space-y-5 animate-content-switch"
            >
              {/* Title & Subtitle */}
              <div className="space-y-5">
                <h2 className="text-lg sm:text-xl font-bold text-gray800 leading-snug">
                  {String(selectedStrategy.id).padStart(2, "0")} ·{" "}
                  {selectedStrategy.title}
                </h2>
                {selectedStrategy.owners ? (
                  <div className="flex items-start justify-between gap-4 text-sm font-semibold text-notes">
                    <div className="space-y-0.5">
                      {selectedStrategy.owners.map((owner) => <p key={owner}>{owner}</p>)}
                    </div>
                    <span className="shrink-0">{selectedStrategy.status}</span>
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-notes block">
                    {selectedStrategy.subtitle}
                  </p>
                )}
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
                      className="bg-[#F0F5DF] rounded-xl border-l-12 border-l-[#9CAA54] p-4 sm:p-5 space-y-3 transition-all duration-300"
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
