"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import {
  Compass,
  Download,
  FileText,
  GraduationCap,
  Handshake,
  HeartHandshake,
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

export default function AboutView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-gray800 font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader slug={slug} report={report} currentPage="about" />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="about" />

        <div className="bg-white border border-gray200 rounded-2xl p-6 relative overflow-hidden space-y-6">
          <img
            src="/images/wave-right.png"
            alt=""
            className="absolute top-0 right-0 w-80 pointer-events-none opacity-40 z-0 object-contain object-top-right select-none"
          />

          <div className="relative z-10 max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray800">
              About Public Skills Australia
            </h1>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
              Public Skills Australia is the Jobs and Skills Council (JSC) for
              the Public Safety and Government industry, comprising Correctional
              Services, Defence, Federal, State/Territory and Local Government,
              Fire and Emergency Services and Police industry-sectors. Through
              its work, Public Skills Australia actively supports employer and
              employee bodies in these industries and associated volunteer
              associations.
            </p>
          </div>

          <div className="relative z-10 border border-gray200 rounded-2xl p-5 max-w-2xl flex items-start gap-4">
            <div className="w-16 h-16 rounded-full border border-gray200 text-[#8AC900] flex items-center justify-center shrink-0">
              <Handshake className="h-9 w-9" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-gray800">
                Working in partnership
              </h3>
              <p className="text-xs text-gray600 leading-relaxed">
                Public Skills Australia works in partnership with the Department
                of Employment and Workplace Relations (DEWR) and other JSCs to
                give effect to broader ministerial and government priorities.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b border-gray200 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray800">
              Public Skills Australia Undertakes:
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F0F5DF] border border-gray200 text-[#8AC900] flex items-center justify-center shrink-0">
                  <FileText className="h-9 w-9" />
                </div>
                <h3 className="font-bold text-base text-gray800 leading-snug">
                  Workforce Insight and Strategy
                </h3>
                <p className="text-xs text-gray600 leading-relaxed">
                  Undertakes data analysis, research and consultation to deepen
                  understandings of contemporary workforce challenges and what
                  can be done to mitigate these challenges.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F0F5DF] border border-gray200 text-[#8AC900] flex items-center justify-center shrink-0">
                  <GraduationCap className="h-9 w-9" />
                </div>
                <h3 className="font-bold text-base text-gray800 leading-snug">
                  Training Product Quality & Development
                </h3>
                <p className="text-xs text-gray600 leading-relaxed">
                  Develops quality training products to strengthen the skills
                  and capabilities of Public Safety and Government workforces.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F0F5DF] border border-gray200 text-[#8AC900] flex items-center justify-center shrink-0">
                  <Compass className="h-9 w-9" />
                </div>
                <h3 className="font-bold text-base text-gray800 leading-snug">
                  Supports Career Pathways
                </h3>
                <p className="text-xs text-gray600 leading-relaxed">
                  Monitors and promotes the implementation of training products
                  to support career pathways for the Public Safety and
                  Government industry-sectors.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray200 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F0F5DF] border border-gray200 text-[#8AC900] flex items-center justify-center shrink-0">
                  <Users className="h-9 w-9" />
                </div>
                <h3 className="font-bold text-base text-gray800 leading-snug">
                  Industry Stewardship
                </h3>
                <p className="text-xs text-gray600 leading-relaxed">
                  Consults with, advocates for and promotes the needs of the
                  Public Safety and Government industry-sectors.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray200 p-6 flex flex-col sm:flex-row items-start gap-5">
            <div className="w-16 h-16 rounded-full bg-[#F0F5DF] border border-gray200 text-[#8AC900] flex items-center justify-center shrink-0">
              <HeartHandshake className="h-9 w-9" />
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-bold text-base text-gray800">
                Our commitment
              </h3>
              <p className="text-sm text-gray600 leading-relaxed">
                Public Skills Australia remains committed to encouraging the
                participation of First Nations people,<sup>1</sup> those from
                culturally and linguistically diverse backgrounds, those living
                with or experiencing disabilities, women and other gender
                diverse people and mature people in the Public Safety and
                Government industry workforces.
              </p>
            </div>
          </div>

          <div className="bg-[#F0F5DF] border border-gray200 rounded-2xl p-6 text-xs text-gray600 leading-relaxed">
            <p>
              1. Please note, First Nations people will be used as preferred
              terminology inclusive of Aboriginal and Torres Strait Islanders.
              When citing a data source (such as government strategies or state
              of the sector reports) the terminology of the data source will be
              used to maintain accurate data representation.
            </p>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
