"use client";

import React from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import {
  Download,
  FileText,
  ExternalLink,
  BookOpen,
  Copy,
  Check,
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

const CITATION_TEXT =
  "Public Skills Australia (2026). Federal and State/Territory Government Workforce Insights Report 2026. Public Skills Australia, Melbourne, Australia.";

const REFERENCES = [
  {
    title: "Delivering for Tomorrow: APS Workforce Strategy 2025",
    org: "Australian Public Service Commission (APSC), 2024",
    link: "https://www.apsc.gov.au",
  },
  {
    title: "National Framework for the Assurance of Artificial Intelligence in Government",
    org: "Australian Government Department of Finance, 2024",
    link: "https://www.finance.gov.au",
  },
  {
    title: "Five Pillars of Productivity Inquiries — Final Reports",
    org: "Productivity Commission, 2025",
    link: "https://www.pc.gov.au",
  },
  {
    title: "Australian Cyber Security Strategy 2023–2030",
    org: "Australian Government Department of Home Affairs, 2023",
    link: "https://www.homeaffairs.gov.au",
  },
  {
    title: "Better Together — The Jobs and Skills Report 2024",
    org: "Jobs and Skills Australia (JSA), 2024",
    link: "https://www.jobsandskills.gov.au",
  },
  {
    title: "NSW Public Sector Capability Framework (Version 2)",
    org: "NSW Public Service Commission, 2023",
    link: "https://www.psc.nsw.gov.au",
  },
  {
    title: "Victorian Public Sector Commission Annual Report & Capability Standards",
    org: "Victorian Public Sector Commission (VPSC), 2024",
    link: "https://vpsc.vic.gov.au",
  },
];

export default function FederalStateDownloadsView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(CITATION_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const pdfUrl =
    report?.pdfFileUrl ||
    "/documents/Federal-and-State-Territory-Government-Workforce-Insights-Report-2026.pdf";

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#E07A5F]/20 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="downloads" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="downloads" />

        {/* Hero Card */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-10 relative overflow-hidden space-y-4 shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EED4C4]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="bg-[#694834] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              DOWNLOADS & CITATIONS
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#382219]">
              Report Downloads & Academic References
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Download the comprehensive Federal and State/Territory Government Workforce Insights Report document, access executive summary fact sheets, and review core bibliographic references.
            </p>
          </div>
        </div>

        {/* Download Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#E9EAEB] p-6 sm:p-8 space-y-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#382219]">
                Complete Workforce Insights Report (PDF)
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                The full publication containing all 12 chapters, extensive cross-jurisdictional public sector workforce data, methodology documentation, and strategy roadmaps.
              </p>
            </div>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#694834] hover:bg-[#382219] text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto self-start"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Report (PDF)</span>
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-[#E9EAEB] p-6 sm:p-8 space-y-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#382219]">
                Executive Summary Briefing Sheet
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                A concise executive brief summarizing the 4 drivers of change, the future skills priorities, and the proposed strategic foresight workshops.
              </p>
            </div>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#D5D7DA] bg-[#FAF8F5] hover:bg-[#EED4C4]/40 text-[#694834] font-bold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto self-start"
            >
              <Download className="w-4 h-4" />
              <span>Download Executive Summary Brief</span>
            </a>
          </div>
        </div>

        {/* Citation Box */}
        <div className="bg-white rounded-2xl border border-[#E9EAEB] p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#382219] uppercase tracking-wider">
              Suggested Citation
            </h3>
            <button
              onClick={handleCopyCitation}
              className="flex items-center gap-1.5 text-xs font-bold text-[#694834] hover:text-[#382219] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Citation</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E9EAEB] rounded-xl p-4 font-mono text-xs text-gray-700 leading-relaxed">
            {CITATION_TEXT}
          </div>
        </div>

        {/* Key References List */}
        <div className="bg-white rounded-2xl border border-[#E9EAEB] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-[#E9EAEB] pb-3">
            <h3 className="text-lg font-bold text-[#382219]">
              Key Literature & Official References
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Primary public reports, commission inquiries, and statutory frameworks utilized in this Report:
            </p>
          </div>

          <div className="divide-y divide-[#E9EAEB]">
            {REFERENCES.map((ref, idx) => (
              <div
                key={idx}
                className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
              >
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-800">
                    {ref.title}
                  </h4>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {ref.org}
                  </span>
                </div>
                <a
                  href={ref.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#694834] hover:text-[#382219] flex items-center gap-1 transition-colors self-start sm:self-auto shrink-0"
                >
                  <span>Official Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ReportFooter contactUrl={report?.contactUrl} />
    </div>
  );
}
