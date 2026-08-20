"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";

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

export default function ExistingStrategiesView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();
  const [project1Open, setProject1Open] = useState(false);
  const [strategy2Open, setStrategy2Open] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="existing_strategies"
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="animate-fade-in max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => router.push(`/reports/${slug}/workforce_strategies`)}
            className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-gray200 text-[#728C28] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to 2026 Proposed
            Workforce Strategies
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/federal_initiatives`)}
            className="bg-[#8AC900] hover:bg-[#77A60D] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            Next Section: Existing Industry-Sector Strategies{" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ── HERO BANNER CARD ── */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-semibold text-notes uppercase tracking-wider block">
              THE CULMINATION OF THIS REPORT
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#046D2A]">
              Update on 2025 Workforce Strategies
            </h1>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
              Public Skills Australia's 2025 Local Government Workforce Insights
              Report identified three challenges currently impacting Local
              Government workforces:
            </p>
          </div>

          {/* 3 Mini Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Access to Training */}
            <div className="border border-gray200 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#F0F5DF] flex items-center justify-center shrink-0 border border-gray200">
                <img
                  src="/images/frame-teacher.svg"
                  alt="Access to Training"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray800">
                  Access to Training
                </h3>
                <p className="text-xs text-gray600 leading-relaxed">
                  Accessing training is a key challenge for local councils,
                  particularly in regional, rural and remote LGAs.
                </p>
              </div>
            </div>

            {/* Card 2: Skills Gaps */}
            <div className="border border-gray200 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#F0F5DF] flex items-center justify-center shrink-0 border border-gray200">
                <img
                  src="/images/frame-briefcase.svg"
                  alt="Skills Gaps"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray800">Skills Gaps</h3>
                <p className="text-xs text-gray600 leading-relaxed">
                  The local councils are experiencing significant occupational
                  shortages in job roles that have long training pathways, or
                  occupations that are emerging, such as emergency management.
                </p>
              </div>
            </div>

            {/* Card 3: Resourcing and Recruitment */}
            <div className="border border-gray200 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#F0F5DF] flex items-center justify-center shrink-0 border border-gray200">
                <img
                  src="/images/frame-search.svg"
                  alt="Resourcing and Recruitment"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray800">
                  Resourcing and Recruitment
                </h3>
                <p className="text-xs text-gray600 leading-relaxed">
                  Recruitment is a continuous challenge for local councils,
                  particularly due to resourcing limitations such as access to
                  housing and infrastructure.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal w-2/3">
            To support the Local Government industry-sector with these
            challenges, Public Skills Australia commenced two projects in 2025.
            These projects provide deeper insights into how these challenges
            arose, what the key indicators of these challenges are and
            recommended tools for mitigating these challenges.
          </p>
        </div>

        {/* ── TWO COLLAPSIBLE STRATEGY CARDS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Card 1: Project 1 - 2025 */}
          <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-[#9CAA54] p-6 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <span className="bg-[#9CAA54] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                PROJECT 1 - 2025
              </span>
              <button
                onClick={() => setProject1Open(!project1Open)}
                className="bg-[#8AC900] hover:bg-[#77A60D] text-[#1B240E] text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors flex items-center gap-1"
              >
                {project1Open ? "Close ▴" : "Open ▾"}
              </button>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray800 leading-snug">
              Local Government Skills Audit and Review of Uptake and Utility of
              the LGA Local Government Training Package
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-gray600 leading-relaxed">
              <p>
                The aim of the Local Government Skills Audit and Review of
                Uptake and Utility of the LGA Local Government Training Package
                (this Project) is to reach as many local councils, in as many
                LGAs as possible, to gain a thorough understanding of the
                occupational, skills and training challenges within the Local
                Government industry-sector. This work provided Public Skills
                Australia with insight into the current occupations employed,
                and skills needed in local councils, and therefore where the
                occupational shortages and skills gaps are. This Project also
                provides an understanding of the emerging skills and
                occupational needs in the Local Government workforce by
                categorising these needs based on regional, rural remote, and
                metropolitan LGAs.
              </p>
              <p>
                Public Skills Australia concluded the qualitative research phase
                of this Project, engaging with 137 councils across Australia
                from every state and the Northern Territory. A Local Government
                Workforce Skills and Capability Survey was deployed in
                collaboration with the Australian Local Government Association,
                which had 210 respondents. This Survey provided longitudinal
                data for the Local Government industry-sector, following on from
                its deployment in 2018 and 2022. The project will continue in
                2026 by reviewing the current qualifications and units of
                competency in the LGA Local Government Training Package. It will
                also review, where appropriate, content from other relevant
                training packages to identify whether this content can assist in
                addressing identified shortages.
              </p>
            </div>

            {/* EXPANDED CONTENT */}
            {project1Open && (
              <div className="animate-expand-down pt-4 border-t border-gray200 space-y-5">
                <span className="bg-[#9CAA54] text-white text-xs font-bold px-2.5 py-1 rounded-full inline-block">
                  Update
                </span>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray800">
                    Ministerial Priority 2026
                  </h3>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    This Project will contribute to building a shared,
                    evidence-based view of the workforce challenges and
                    opportunities, improving the sustainability of the Local
                    Government workforce and progressing the priority reforms
                    under the Closing the Gap National Agreement, by leveraging
                    insights from First Nations local councils.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray800">
                    Public Skills Australia Strategic Plan
                  </h3>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    Support the Local Government industry-sector through working
                    toward reviewing, developing and implementing high-quality
                    training products.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray800">
                    Drivers of Change
                  </h3>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    Resilience of local councils to respond to strategic shocks
                    and drivers of change, particularly:
                  </p>
                  <ul className="space-y-1 text-xs sm:text-sm text-gray600 pl-4 list-disc">
                    <li>expansion of core duties</li>
                    <li>Recruitment and retention</li>
                    <li>Competition for labour</li>
                  </ul>
                </div>

                {/* NEXT STEPS Box */}
                <div className="bg-[#F0F5DF] border border-gray200 border-l-12 border-l-[#9CAA54] rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold text-lg-dark uppercase block">
                    NEXT STEPS
                  </span>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    Publication of the qualitative research from this Project,
                    as well as the National Local Government Workforce Skills
                    and Capability Survey results, will be made available to the
                    public in mid-2026. Public Skills Australia is undertaking
                    analysis of these findings to provide appropriate
                    recommendations back to the industry-sector, including
                    further insights into the uptake and utility of the LGA
                    Local Government Training Package. This will provide
                    findings on refinement to the VET Training Package, ensuring
                    its effectiveness in addressing identified occupational
                    shortages, skills gaps and training needs. It will also
                    inform what further research can be undertaken to meet the
                    needs of the Local Government workforce.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col items-stretch sm:items-start gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (report.pdfFileUrl)
                        window.open(report.pdfFileUrl, "_blank");
                    }}
                    className="bg-[#046D2A] hover:bg-[#035822] text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Download 2026 PDF for participant list</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      router.push(`/reports/${slug}/industry_overview`)
                    }
                    className="border border-gray200 hover:bg-gray200 text-gray800 text-xs font-bold px-5 py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>View Local Government Skills Audit project</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Strategy 2 */}
          <div className="bg-white rounded-2xl border border-gray200 border-t-12 border-t-[#046D2A] p-6 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <span className="bg-[#046D2A] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                STRATEGY 2
              </span>
              <button
                onClick={() => setStrategy2Open(!strategy2Open)}
                className="bg-[#8AC900] hover:bg-[#77A60D] text-[#1B240E] text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors flex items-center gap-1"
              >
                {strategy2Open ? "Close ▴" : "Open ▾"}
              </button>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray800 leading-snug">
              Local Government Emergency Management Skills
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-gray600 leading-relaxed">
              <p>
                The aim of the Local Government Emergency Management Skills
                Project (Skills Project) is to address urgent skilling and
                upskilling needs of the Local Government industry-sector. The
                2025 Local Government Workforce Insights Report identified
                emerging occupational shortages and skills gaps which are
                impacting the service delivery of councils to their communities,
                particularly in areas such as emergency management and disaster
                recovery. This Report found that drivers of change such as
                climate change, are impacting the skills and training needs of
                Local Government workforces through the acceleration and
                increased frequency of emergency events and natural disasters.
              </p>
              <p>
                The Skills Project will refer to the findings of the Local
                Government Skills Audit and Uptake and Utility of the LGA Local
                Government Training Package, to identify opportunities to
                bolster the offerings in VET for occupations such as emergency
                management. The Skills Project will also identify where skill
                sets may be used from other Training Packages, or where the
                creation of new skill sets may be required.
              </p>
            </div>

            {/* EXPANDED CONTENT */}
            {strategy2Open && (
              <div className="animate-expand-down pt-4 border-t border-gray200 space-y-5">
                <span className="bg-[#E5E8DA] text-[#046D2A] text-xs font-bold px-2.5 py-1 rounded-md inline-block">
                  Update
                </span>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray800">
                    Ministerial Priority 2026
                  </h3>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    The Skills Project will contribute to embedding of
                    Qualifications Reform principles, strengthening capabilities
                    of the Public Safety and Government workforces, in preparing
                    for and responding to emergency events and the
                    sustainability of the Local Government workforce into the
                    future.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray800">
                    Public Skills Australia Strategic Plan
                  </h3>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    Support the Local Government industry-sector through working
                    toward reviewing, developing and implementing high-quality
                    training products.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray800">
                    Drivers of Change
                  </h3>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    Resilience of local councils to respond to strategic shocks
                    and drivers of change, particularly:
                  </p>
                  <ul className="space-y-1 text-xs sm:text-sm text-gray600 pl-4 list-disc">
                    <li>Expansion of core duties</li>
                    <li>Recruitment and retention</li>
                    <li>Competition for labour</li>
                    <li>Technological development</li>
                    <li>Climate change</li>
                  </ul>
                </div>

                {/* NEXT STEPS Box */}
                <div className="bg-[#F0F5DF] border border-gray200 border-l-8 border-l-[#8AC900] rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold text-notes uppercase block">
                    NEXT STEPS
                  </span>
                  <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                    Public Skills Australia is currently engaging with
                    stakeholders in the Local Government industry-sector, to
                    confirm the priority areas for skilling, and identify other
                    potential occupational focus areas beyond emergency
                    management for the Skills Project to work toward. Initial
                    research and findings of the Skills Project will be used to
                    assess whether an Activity Project Submission will be
                    developed for May 2026.
                  </p>
                </div>

                {/* Button */}
                <div className="pt-2">
                  <button
                    onClick={() =>
                      router.push(`/reports/${slug}/industry_overview`)
                    }
                    className="border border-gray200 hover:bg-gray200 text-gray800 text-xs font-bold px-5 py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>View Emergency Management Skills project</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
