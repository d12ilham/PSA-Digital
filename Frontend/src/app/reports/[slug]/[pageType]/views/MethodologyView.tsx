"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  Download,
  FileSpreadsheet,
  HeartHandshake,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";

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

export default function MethodologyView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <header className="bg-[#161b01] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div
            onClick={() => router.push(`/reports/${slug}`)}
            className="flex items-center gap-2 cursor-pointer font-extrabold text-base text-white hover:text-accent transition-colors"
          >
            <span>LG WIR {report.year?.label || "2026"}</span>
          </div>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs font-semibold">
            <div className="relative group py-1">
              <button className="flex items-center gap-1 text-accent font-bold cursor-pointer">
                About <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-48 space-y-1 z-50">
                <button
                  onClick={() => router.push(`/reports/${slug}/introduction`)}
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Introduction
                </button>
                <button
                  onClick={() => router.push(`/reports/${slug}/about`)}
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  About Public Skills Australia
                </button>
                <button
                  onClick={() => router.push(`/reports/${slug}/methodology`)}
                  className="w-full text-left px-3 py-2 text-xs text-accent font-bold hover:bg-white/10 rounded-lg transition-colors"
                >
                  Methodology
                </button>
              </div>
            </div>

            <button
              onClick={() => router.push(`/reports/${slug}/executive_summary`)}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Executive Summary
            </button>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/drivers_of_change`)
                }
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
              >
                Drivers of Change <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-48 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/drivers_of_change`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Drivers of Change
                </button>
                <button
                  onClick={() => router.push(`/reports/${slug}/megatrends`)}
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Nine Megatrends
                </button>
              </div>
            </div>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/industry_overview`)
                }
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
              >
                Industry Overview <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-56 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/industry_overview`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Industry-Sector Overview
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/state_territory`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  State and Territory Profile
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/industry_profile`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Industry Profile
                </button>
              </div>
            </div>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_insights`)
                }
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
              >
                Workforce Insights <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-48 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_insights`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Insights Overview
                </button>
              </div>
            </div>

            <div className="relative group py-1">
              <button
                onClick={() =>
                  router.push(`/reports/${slug}/workforce_strategies`)
                }
                className="flex items-center gap-1 text-white/80 hover:text-white cursor-pointer"
              >
                Workforce Strategies <span>▾</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-[#161b01] border border-white/10 rounded-xl shadow-lg p-2 min-w-56 space-y-1 z-50">
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/workforce_strategies`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  2026 Proposed Strategies
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/existing_strategies`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Existing Strategies
                </button>
                <button
                  onClick={() =>
                    router.push(`/reports/${slug}/federal_initiatives`)
                  }
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Federal Initiatives
                </button>
              </div>
            </div>

            <button
              onClick={() => router.push(`/reports/${slug}/looking_forward`)}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Looking Forward
            </button>
          </nav>

          <div>
            {report.pdfFileUrl ? (
              <a
                href={report.pdfFileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0C582B] hover:bg-[#046D2A] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Download 2026 PDF</span>
                <Download className="h-3.5 w-3.5" />
              </a>
            ) : (
              <button
                onClick={() => router.push(`/reports/${slug}`)}
                className="bg-[#0C582B] hover:bg-[#046D2A] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Download 2026 PDF</span>
                <Download className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => router.push(`/reports/${slug}/executive_summary`)}
            className="border border-border bg-white hover:bg-gray-50 text-foreground font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Executive Summary
          </button>
          <button
            onClick={() => router.push(`/reports/${slug}/drivers_of_change`)}
            className="bg-[#85B810] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            Next Section: Drivers of Change{" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* HERO & REPRESENTATIVES CONTAINER */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                Methodology
              </h1>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-normal">
                Public Skills Australia's{" "}
                <span className="font-semibold text-[#728C28]">
                  Workforce Insights Reports
                </span>{" "}
                are developed using a combination of qualitative and
                quantitative methods obtained from primary and secondary
                sources. This 2026 Local Government Workforce Insights Report is
                supported by data obtained through stakeholder consultations and
                engagements.
              </p>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-normal">
                These consultations were used to gain insight into challenges
                the Local Government industry-sector is facing with the
                development and maintenance of a skilled workforce. The
                challenges identified through consultations were thematically
                analysed to identify trends and priority areas to address for
                the industry-sector. Specific to the Local Government
                industry-sector, and in alignment with the tripartite approach
                for Jobs and Skills Councils (JSCs), consultations were held
                with employers, employee bodies and Government organisations,
                both in-person and through online meetings, workshops and
                presentations.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="border border-border rounded-xl p-3.5 bg-white shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-[#728C28] uppercase block">
                    STEP 1
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                      <Database className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-foreground">
                        Data sources
                      </h4>
                      <p className="text-xs text-foreground/70">
                        JSA · ABS · NCVER datasets
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-xl p-3.5 bg-white shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-[#728C28] uppercase block">
                    STEP 2
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                      <FileSpreadsheet className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-foreground">
                        National survey
                      </h4>
                      <p className="text-xs text-foreground/70">
                        <span className="font-bold text-[#728C28]">210</span>{" "}
                        councils responded
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-xl p-3.5 bg-white shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-[#728C28] uppercase block">
                    STEP 3
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-foreground">
                        Workshops
                      </h4>
                      <p className="text-xs text-foreground/70">
                        <span className="font-bold text-[#728C28]">137</span>{" "}
                        councils attended
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                <div className="border border-border rounded-xl p-3.5 bg-white shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-[#728C28] uppercase block">
                    STEP 4
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                      <UserCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-foreground">
                        Representatives
                      </h4>
                      <p className="text-xs text-foreground/70">
                        <span className="font-bold text-[#728C28]">11</span>{" "}
                        Industry-sector bodies
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-xl p-3.5 bg-white shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-[#728C28] uppercase block">
                    STEP 5
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-foreground">
                        Governance
                      </h4>
                      <p className="text-xs text-foreground/70">
                        Review, endorsement, approval
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F2F3EC] border border-border/50 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-extrabold text-sm text-foreground leading-snug">
                  Key industry-sector representatives
                </h3>
                <div className="w-10 h-10 rounded-xl bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5" />
                </div>
              </div>

              <p className="text-xs text-foreground/75 leading-relaxed">
                Public Skills Australia undertook targeted workforce planning
                consultation with key industry-sector representatives as below:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {[
                  "Australian Local Government Association (ALGA)",
                  "Local Government New South Wales (LGNSW)",
                  "Local Government Association of the Northern Territory (LGANT)",
                  "Local Government Association of Queensland (LGAQ)",
                  "Local Government Association of South Australia (LGASA)",
                  "Local Government Association Tasmania (LGAT)",
                  "Local Government Professionals Victoria (LGPro VIC)",
                  "Municipal Association of Victoria (MAV)",
                  "WA Local Government Association (WALGA)",
                  "Local Government Professionals WA (LGPro WA)",
                  "United Services Union (USU)",
                ].map((rep, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-2.5 text-xs font-semibold text-foreground/80 shadow-2xs border border-border/40"
                  >
                    {rep}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RESEARCH & STATS CONTAINER */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-normal">
            Following these consultations, Public Skills Australia conducted
            secondary qualitative and quantitative research to verify the
            challenges raised. In addition to these consultations, the findings
            and views presented in this Report are also drawn from consultations
            undertaken in the conduct of the Public Skills Australia Local
            Government Skills Audit and Review of Uptake and Utility of the LGA
            Local Government Training Package project. Face-to-face and online
            consultations were undertaken across late 2025 and early 2026 as
            well as a broad national survey on workforce challenges, skills and
            training.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F2F3EC] border border-border/50 rounded-xl p-4 flex items-center gap-3">
              <span className="text-3xl font-extrabold text-[#728C28]">
                280³
              </span>
              <span className="text-xs font-semibold text-foreground/80 leading-tight">
                In total, Public Skills Australia engaged with a total of 280
                councils
              </span>
            </div>

            <div className="bg-[#F2F3EC] border border-border/50 rounded-xl p-4 flex items-center gap-3">
              <span className="text-3xl font-extrabold text-[#728C28]">
                137
              </span>
              <span className="text-xs font-semibold text-foreground/80 leading-tight">
                Councils attended workshops
              </span>
            </div>

            <div className="bg-[#F2F3EC] border border-border/50 rounded-xl p-4 flex items-center gap-3">
              <span className="text-3xl font-extrabold text-[#728C28]">
                210
              </span>
              <span className="text-xs font-semibold text-foreground/80 leading-tight">
                Councils responded to the survey
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <p className="text-xs text-foreground/75">
              A full list of councils that participated in these activities is
              provided at Appendix A.
            </p>
            {report.pdfFileUrl ? (
              <a
                href={report.pdfFileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0C582B] hover:bg-[#046D2A] text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs shrink-0"
              >
                Download 2026 PDF <Download className="h-3.5 w-3.5" />
              </a>
            ) : (
              <button
                onClick={() => router.push(`/reports/${slug}`)}
                className="bg-[#0C582B] hover:bg-[#046D2A] text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-xs shrink-0"
              >
                Download 2026 PDF <Download className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* GOVERNANCE PROCESS CONTAINER */}
        <div className="space-y-6">
          <div className="border-b border-border/60 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Drafts were subsequently progressed through Public Skills
              Australia's governance process that includes:
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F2F3EC] border border-border/50 rounded-2xl p-6 space-y-4">
              <h3 className="font-extrabold text-base text-foreground">
                1 · Government Subcommittee
              </h3>
              <p className="text-xs text-foreground/80 leading-relaxed">
                The Subcommittee is responsible for recommending this Report to
                the Industry Advisory Group (IAG) for endorsement.
              </p>
              <p className="text-xs text-foreground/80 leading-relaxed">
                This recommendation is made on the basis that the Subcommittee
                is satisfied that sufficient consultation and engagement has
                been undertaken, and that consultation feedback was
                appropriately actioned.
              </p>
            </div>

            <div className="bg-[#F2F3EC] border border-border/50 rounded-2xl p-6 space-y-4">
              <h3 className="font-extrabold text-base text-foreground">
                2 · Industry Advisory Group
              </h3>
              <p className="text-xs text-foreground/80 leading-relaxed">
                The IAG is responsible for endorsing this Report to the Public
                Skills Australia Board for approval to be submitted to DEWR.
              </p>
              <p className="text-xs text-foreground/80 leading-relaxed">
                This endorsement is made on the basis that the IAG is satisfied
                with the Government Subcommittee's recommendation for
                endorsement. The IAG further provides its strategic guidance and
                endorsement if comfortable that the strategic priorities of
                Public Safety and Government industry-sectors are also captured.
              </p>
            </div>

            <div className="bg-[#F2F3EC] border border-border/50 rounded-2xl p-6 space-y-4">
              <h3 className="font-extrabold text-base text-foreground">
                3 · Public Skills Australia Board
              </h3>
              <p className="text-xs text-foreground/80 leading-relaxed">
                The Public Skills Australia Board (the Board) is responsible to
                approve the submission of this Report to DEWR.
              </p>
              <p className="text-xs text-foreground/80 leading-relaxed">
                This approval is made on the basis that the Board is satisfied
                that an appropriate development and consultation process was
                followed and that the Report has been progressed in line with
                the internal governance requirements of Public Skills Australia.
              </p>
            </div>
          </div>
        </div>

        {/* DATA SOURCES & WITH THANKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-border p-6 shadow-2xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
              <Database className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-extrabold text-base text-foreground">
                Data sources
              </h3>
              <p className="text-xs text-foreground/80 leading-relaxed">
                The Report uses publicly available datasets accessible from Jobs
                and Skills Australia (JSA), the Australian Bureau of Statistics
                (ABS), the National Centre for Vocational Education Research
                (NCVER) and other supporting online sources. Due to the
                complexity of large-scale workforce data, no single source
                provides an accurate or complete picture. Therefore, multiple
                data sources are used to provide the most accurate
                representation of the workforce as possible, supported by
                qualitative research. This research was bolstered by literature
                reviews of government reports and documents, online sources,
                annual reports, departmental documentation, legislation,
                research articles and relevant Royal Commission Reports.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-6 shadow-2xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E2ECC8] text-[#046D2A] flex items-center justify-center shrink-0">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-extrabold text-base text-foreground">
                With thanks
              </h3>
              <p className="text-xs text-foreground/80 leading-relaxed">
                Public Skills Australia thanks the contributors, including
                industry representatives, its Board and governance group
                representatives, Department of Employment and Workplace
                Relations (DEWR) and JSA for sharing their views and data
                generously, and supporting the development of this Report.
              </p>
            </div>
          </div>
        </div>

        {/* Footnote Box */}
        <div className="bg-[#EFF3E4] border border-border/60 rounded-xl p-4 text-xs text-foreground/75 leading-relaxed">
          <p>
            3 - Note: councils were able to participate in both consultation and
            the survey. Councils who engaged in both have only been counted
            once. Public Skills Australia did not meet with stakeholders from
            the ACT as they do not have local councils. Insights related to the
            ACT Government industry-sector are included in the 2026 Federal and
            State/Territory Workforce Insights Report.
          </p>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#161b01] text-white py-4 px-6 sm:px-8 border-t border-[#252D02]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-white/80">
            © Public Skills Australia 2026 · Local Government Workforce Insights
            Report
          </p>
          <a
            href={
              report.contactUrl ||
              "https://publicskillsaustralia.org.au/contact"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:text-white font-semibold no-underline"
          >
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
}
