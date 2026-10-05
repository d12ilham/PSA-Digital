"use client";

import React from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import {
  ArrowRight,
  Sparkles,
  Users2,
  Cpu,
  Compass,
  FileText,
  ShieldCheck,
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

export default function FederalStateLookingForwardView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#E07A5F]/20 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="looking_forward" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="looking_forward" />

        {/* Hero Card */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-10 relative overflow-hidden space-y-4 shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EED4C4]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="bg-[#694834] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              LOOKING FORWARD
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#382219]">
              2027 and Beyond
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Public Skills Australia concludes this report by looking towards the 2027 Workforce Insights Reports and beyond. Future strategic work will center on national public administration priorities, structural inclusion, and emerging technological capabilities.
            </p>
          </div>
        </div>

        {/* 3 Core Inquiries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-[#E9EAEB] border-t-8 border-t-[#694834] p-6 sm:p-7 space-y-4 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] flex items-center justify-center">
                <Users2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#694834] uppercase tracking-wider block">
                PRIORITY ONE
              </span>
              <h3 className="font-bold text-lg text-[#382219] leading-snug">
                First Nations Workforce Participation & Leadership
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Deepening research into culturally safe retention, accelerated pathways to the Senior Executive Service (SES), and expanding traineeships in remote and regional communities in alignment with the Commonwealth Aboriginal and Torres Strait Islander Workforce Strategy.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E9EAEB] text-xs font-bold text-[#694834]">
              Multi-Year Longitudinal Study
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-[#E9EAEB] border-t-8 border-t-[#382219] p-6 sm:p-7 space-y-4 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#694834] uppercase tracking-wider block">
                PRIORITY TWO
              </span>
              <h3 className="font-bold text-lg text-[#382219] leading-snug">
                Gender Equity & Neurodiversity in Civil Service
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Addressing occupational segregation, ensuring equal pay standards across specialized roles, and modernizing public sector recruitment to welcome neurodivergent talent across policy, data science, and technical regulatory domains.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E9EAEB] text-xs font-bold text-[#694834]">
              Workplace Inclusivity Framework
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-[#E9EAEB] border-t-8 border-t-[#E07A5F] p-6 sm:p-7 space-y-4 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EED4C4] text-[#694834] flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#694834] uppercase tracking-wider block">
                PRIORITY THREE
              </span>
              <h3 className="font-bold text-lg text-[#382219] leading-snug">
                AI Sovereignty, Automation & Digital Integrity
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Establishing national training standards for generative AI and automated decision systems in public administration, ensuring algorithmic transparency, ethical data stewardship, and robust cyber resistance.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E9EAEB] text-xs font-bold text-[#694834]">
              Technology Futures Roadmap
            </div>
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-8 space-y-3 shadow-sm">
          <h3 className="font-bold text-base text-[#382219]">
            Public Skills Australia Continuous Horizon Scanning
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-4xl">
            Throughout 2026 and 2027, Public Skills Australia will actively monitor labour market signals, legislative changes, and emerging occupational demands across the Public Safety and Government industry-sectors. We invite all public sector agencies, unions, and training organisations to collaborate with us to ensure our public services remain resilient, capable, and trusted.
          </p>
        </div>
      </main>

      <ReportFooter contactUrl={report?.contactUrl} />
    </div>
  );
}
