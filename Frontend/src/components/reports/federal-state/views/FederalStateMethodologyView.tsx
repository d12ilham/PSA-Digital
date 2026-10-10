"use client";

import React from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

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

const STAKEHOLDERS = [
  "Australian Public Service Commission",
  "Jobs Queensland",
  "Department of Premier and Cabinet – Workforce Planning",
  "Australian Public Service Commission APS Centre for Excellence for Workforce Planning",
  "Australian Government Department of Employment and Workplace Relations",
  "Australian Public Sector Commission Interjurisdictional Working Group",
  "Office of the Commissioner for Public Employment, Northern Territory",
  "NSW Premier's Department – Strategic Workforce Development",
  "Community and Public Sector Union, Northern Territory",
  "Public Sector Commission, Queensland",
  "Office of the Commissioner for Public Sector Employment, South Australia",
  "Department Premier and Cabinet, Tasmania",
  "Victorian Public Sector Commission",
  "Western Australia Public Sector Commission",
];

export default function FederalStateMethodologyView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const governanceRef = React.useRef<HTMLDivElement>(null);
  const [isGovernanceVisible, setIsGovernanceVisible] = React.useState(false);

  const sourcesRef = React.useRef<HTMLDivElement>(null);
  const [isSourcesVisible, setIsSourcesVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === governanceRef.current) {
              setIsGovernanceVisible(true);
            } else if (entry.target === sourcesRef.current) {
              setIsSourcesVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 },
    );

    if (governanceRef.current) observer.observe(governanceRef.current);
    if (sourcesRef.current) observer.observe(sourcesRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader slug={slug} report={report} currentPage="methodology" />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="methodology" />

        {/* HERO & REPRESENTATIVES CONTAINER */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Methodology & 5 Steps */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray800 animate-slide-up">
                Methodology
              </h1>
              <div className="space-y-3 animate-slide-up-delay">
                <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                  Public Skills Australia's Workforce Insights Reports are
                  developed using a combination of qualitative and quantitative
                  data obtained from primary and secondary sources. This 2026
                  Federal and State/Territory Government Workforce Insights
                  Report is supported by stakeholder consultations and
                  engagements.
                </p>
                <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                  These consultations were used to gain insight into challenges
                  the Federal and State/Territory Government industry-sector is
                  facing in developing and maintaining a skilled workforce. The
                  challenges identified through these consultations were
                  thematically analysed to identify shared challenges and
                  trends. Specific to the Federal and State/Territory
                  industry-sector, and in alignment with the tripartite approach
                  for Jobs and Skills Councils (JSCs), consultations were held
                  with employers, employee bodies and Government organisations,
                  both in-person and through online meetings, workshops and
                  presentations.
                </p>
              </div>
            </div>

            {/* 5 Steps Grid */}
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* STEP 1 */}
                <div
                  style={{ animationDelay: "0.10s" }}
                  className="animate-card-entrance border border-gray200 rounded-xl p-3.5 bg-white space-y-4"
                >
                  <span className="text-xs font-bold text-[#8AC900] uppercase block">
                    STEP 1
                  </span>
                  <div className="flex items-start gap-2.5">
                    <img
                      src="/images/reports/methodology/Workshops.svg"
                      alt="Stakeholder consultations"
                      className="w-12 h-12 shrink-0 object-contain animate-zoom-in"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-gray800 mb-1">
                        Stakeholder consultations
                      </h4>
                      <p className="text-[11px] text-gray600 leading-relaxed font-normal">
                        Employers, employee bodies and Government organisations
                        — in-person and online meetings, workshops and
                        presentations
                      </p>
                    </div>
                  </div>
                </div>

                {/* STEP 2 */}
                <div
                  style={{ animationDelay: "0.20s" }}
                  className="animate-card-entrance border border-gray200 rounded-xl p-3.5 bg-white space-y-4"
                >
                  <span className="text-xs font-bold text-[#8AC900] uppercase block">
                    STEP 2
                  </span>
                  <div className="flex items-start gap-2.5">
                    <img
                      src="/images/reports/methodology/National-survey.svg"
                      alt="Thematic analysis"
                      className="w-12 h-12 shrink-0 object-contain animate-zoom-in"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-gray800 mb-1">
                        Thematic analysis
                      </h4>
                      <p className="text-[11px] text-gray600 leading-relaxed font-normal">
                        Challenges identified through consultation analysed to
                        identify shared challenges and trends
                      </p>
                    </div>
                  </div>
                </div>

                {/* STEP 3 */}
                <div
                  style={{ animationDelay: "0.30s" }}
                  className="animate-card-entrance border border-gray200 rounded-xl p-3.5 bg-white space-y-4"
                >
                  <span className="text-xs font-bold text-[#8AC900] uppercase block">
                    STEP 3
                  </span>
                  <div className="flex items-start gap-2.5">
                    <img
                      src="/images/reports/methodology/Data-sources.svg"
                      alt="Secondary research"
                      className="w-12 h-12 shrink-0 object-contain animate-zoom-in"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-gray800 mb-1">
                        Secondary research
                      </h4>
                      <p className="text-[11px] text-gray600 leading-relaxed font-normal">
                        Qualitative and quantitative research to verify the
                        challenges raised — JSA · ABS · NCVER datasets
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                {/* STEP 4 */}
                <div
                  style={{ animationDelay: "0.40s" }}
                  className="animate-card-entrance border border-gray200 rounded-xl p-3.5 bg-white space-y-4"
                >
                  <span className="text-xs font-bold text-[#8AC900] uppercase block">
                    STEP 4
                  </span>
                  <div className="flex items-start gap-2.5">
                    <img
                      src="/images/reports/methodology/Representatives.svg"
                      alt="Validation"
                      className="w-12 h-12 shrink-0 object-contain"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-gray800 mb-1">
                        Validation
                      </h4>
                      <p className="text-[11px] text-gray600 leading-relaxed font-normal">
                        Targeted consultations with senior stakeholders to
                        validate workforce challenges and identify
                        industry-sector insights
                      </p>
                    </div>
                  </div>
                </div>

                {/* STEP 5 */}
                <div
                  style={{ animationDelay: "0.50s" }}
                  className="animate-card-entrance border border-gray200 rounded-xl p-3.5 bg-white space-y-4"
                >
                  <span className="text-xs font-bold text-[#8AC900] uppercase block">
                    STEP 5
                  </span>
                  <div className="flex items-start gap-2.5">
                    <img
                      src="/images/reports/methodology/Governance.svg"
                      alt="Governance"
                      className="w-12 h-12 shrink-0 object-contain"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-gray800 mb-1">
                        Governance
                      </h4>
                      <p className="text-[11px] text-gray600 leading-relaxed font-normal">
                        Government Subcommittee → Industry Advisory Group →
                        Public Skills Australia Board
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key industry-sector representatives */}
          <div className="lg:col-span-5 bg-[#F0F5DF] border border-gray200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-bold text-xl text-gray800 leading-snug max-w-[200px]">
                  Key industry-sector representatives
                </h3>
                <img
                  src="/images/reports/methodology/industry-sector representatives.svg"
                  alt="Key industry-sector representatives"
                  className="w-16 h-16 shrink-0 object-contain ml-auto animate-zoom-in"
                />
              </div>

              <p className="text-xs sm:text-sm font-medium text-gray600 leading-relaxed">
                Public Skills Australia undertook targeted workforce planning
                consultation with key industry-sector representatives as below:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {STAKEHOLDERS.map((rep, idx) => (
                  <div
                    key={idx}
                    style={{ animationDelay: `${idx * 0.04 + 0.15}s` }}
                    className="animate-card-entrance bg-white rounded-lg p-2.5 text-[11px] font-semibold text-gray700 border border-gray200/60 hover:border-[#046D2A] hover:shadow-md hover:-translate-y-0.5 hover:text-[#046D2A] cursor-pointer relative hover:z-10 transition-all duration-300"
                  >
                    {rep}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GOVERNANCE PROCESS CONTAINER */}
        <div
          ref={governanceRef}
          className="bg-white border border-gray200 rounded-2xl p-6 space-y-6"
        >
          <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal w-full xl:w-2/3">
            Following these consultations, Public Skills Australia conducted
            secondary qualitative and quantitative research to verify the
            challenges raised. Additional targeted consultations with senior
            stakeholders were held to further validate workforce challenges and
            identify related industry-sector insights. Drafts were subsequently
            progressed through Public Skills Australia's governance process that
            includes:
          </p>

          <h2
            className={`text-lg sm:text-xl font-bold text-gray800 ${
              isGovernanceVisible ? "animate-slide-up" : "opacity-0"
            }`}
          >
            Drafts were subsequently progressed through Public Skills
            Australia's governance process that includes:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div
              style={
                isGovernanceVisible ? { animationDelay: "0.10s" } : undefined
              }
              className={`bg-[#F0F5DF] rounded-xl p-6 space-y-4 border border-gray200/60 ${
                isGovernanceVisible
                  ? "animate-card-entrance"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span className="text-xs font-bold text-lg-dark uppercase block">
                STEP 1
              </span>
              <h3 className="font-bold text-lg sm:text-xl text-gray800">
                1 · Government Subcommittee
              </h3>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                The Subcommittee is responsible for recommending this report to
                the Industry Advisory Group (IAG) for endorsement.
              </p>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                This recommendation should be made on the basis that the
                Subcommittee is satisfied that sufficient consultation and
                engagement has been undertaken, and that consultation feedback
                was appropriately actioned.
              </p>
            </div>

            {/* Step 2 */}
            <div
              style={
                isGovernanceVisible ? { animationDelay: "0.22s" } : undefined
              }
              className={`bg-[#F0F5DF] rounded-xl p-6 space-y-4 border border-gray200/60 ${
                isGovernanceVisible
                  ? "animate-card-entrance"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span className="text-xs font-bold text-lg-dark uppercase block">
                STEP 2
              </span>
              <h3 className="font-bold text-lg sm:text-xl text-gray800">
                2 · Industry Advisory Group
              </h3>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                The IAG is responsible for endorsing this report to the Public
                Skills Australia Board for approval to be submitted to the DEWR.
              </p>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                This endorsement should be made on the basis that the IAG is
                satisfied with the Government Subcommittee's recommendation for
                endorsement. The IAG further provides its strategic guidance and
                endorsement if comfortable that the strategic priorities of
                Public Safety and Government industry-sectors are also captured.
              </p>
            </div>

            {/* Step 3 */}
            <div
              style={
                isGovernanceVisible ? { animationDelay: "0.34s" } : undefined
              }
              className={`bg-[#F0F5DF] rounded-xl p-6 space-y-4 border border-gray200/60 ${
                isGovernanceVisible
                  ? "animate-card-entrance"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span className="text-xs font-bold text-lg-dark uppercase block">
                STEP 3
              </span>
              <h3 className="font-bold text-lg sm:text-xl text-gray800">
                3 · Public Skills Australia Board
              </h3>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                The Public Skills Australia Board (the Board) is responsible to
                approve the submission of this Report to DEWR.
              </p>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                This approval should be made on the basis that the Board is
                satisfied that an appropriate development and consultation
                process was followed and that the Report has been progressed in
                line with the internal governance requirements of Public Skills
                Australia.
              </p>
            </div>
          </div>
        </div>

        {/* DATA SOURCES & WITH THANKS */}
        <div ref={sourcesRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Data sources */}
          <div
            style={isSourcesVisible ? { animationDelay: "0.10s" } : undefined}
            className={`bg-white rounded-2xl border border-gray200 p-6 flex items-start gap-4 ${
              isSourcesVisible
                ? "animate-card-entrance"
                : "opacity-0 translate-y-6"
            }`}
          >
            <img
              src="/images/reports/methodology/Data-sources-bottom.svg"
              alt="Data sources"
              className="w-16 h-16 shrink-0 object-contain"
            />
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-gray800">Data sources</h3>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                This Report uses publicly available datasets accessible from
                Jobs and Skills Australia (JSA), the Australian Bureau of
                Statistics (ABS), the National Centre for Vocational Education
                Research (NCVER) and other supporting online sources. Due to the
                complexity of large-scale workforce data, no single source
                provides an accurate or complete picture. Therefore, multiple
                data sources are used to provide the most accurate
                representation of the workforce as possible, supported by
                qualitative research. This research was bolstered by literature
                reviews of government reports and documents, online sources,
                annual reports, departmental documentation, legislation,
                research articles, further online material and relevant Royal
                Commission Reports.
              </p>
            </div>
          </div>

          {/* With thanks */}
          <div
            style={isSourcesVisible ? { animationDelay: "0.22s" } : undefined}
            className={`bg-white rounded-2xl border border-gray200 p-6 flex items-start gap-4 ${
              isSourcesVisible
                ? "animate-card-entrance"
                : "opacity-0 translate-y-6"
            }`}
          >
            <img
              src="/images/reports/methodology/With-thanks.svg"
              alt="With thanks"
              className="w-16 h-16 shrink-0 object-contain"
            />
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-gray800">With thanks</h3>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
                Public Skills Australia thanks the contributors, including
                industry representatives, its Board and governance group
                representatives, DEWR and JSA for sharing their views and data
                generously, and supporting the development of this Report.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter
        contactUrl={report?.contactUrl}
        reportName={
          report?.title?.replace(/\s*\b20\d{2}\b/g, "").trim() ||
          "Federal and State/Territory Government Workforce Insights Report"
        }
      />
    </div>
  );
}
