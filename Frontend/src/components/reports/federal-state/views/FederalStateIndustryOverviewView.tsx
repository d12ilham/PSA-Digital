"use client";

import React, { useState } from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import {
  Building2,
  Users,
  GraduationCap,
  TrendingUp,
  Landmark,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Layers,
} from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";

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

export default function FederalStateIndustryOverviewView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const [activeTab, setActiveTab] = useState<"federal" | "state">("federal");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#E07A5F]/20 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="industry_overview" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="industry_overview" />

        {/* Hero Banner */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-10 relative overflow-hidden space-y-4 shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EED4C4]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="bg-[#694834] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              INDUSTRY-SECTOR OVERVIEW
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#382219]">
              Federal and State/Territory Public Administration
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              An overarching assessment of civil service capabilities, workforce demographics, digital skills transformation, and service delivery strategies across Australia&apos;s federal, state, and territory governments.
            </p>
          </div>
        </div>

        {/* Key Metrics Counter Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-[#E9EAEB] p-6 space-y-2 shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Total Public Sector Workforce
            </span>
            <div className="text-3xl font-extrabold text-[#382219]">
              <AnimatedCounter target={1.8} decimals={1} suffix="M+" />
            </div>
            <p className="text-xs text-gray-600">
              Across federal, state, and territory jurisdictions nationally.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E9EAEB] p-6 space-y-2 shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Australian Public Service (APS)
            </span>
            <div className="text-3xl font-extrabold text-[#694834]">
              <AnimatedCounter target={185000} formatNumber suffix="+" />
            </div>
            <p className="text-xs text-gray-600">
              Employed across 100+ Commonwealth departments & agencies.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E9EAEB] p-6 space-y-2 shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              State & Territory Public Sector
            </span>
            <div className="text-3xl font-extrabold text-[#382219]">
              <AnimatedCounter target={1.62} decimals={2} suffix="M" />
            </div>
            <p className="text-xs text-gray-600">
              Delivering core public services, regulation, and administration.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E9EAEB] p-6 space-y-2 shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Core Skills Occupations
            </span>
            <div className="text-3xl font-extrabold text-[#694834]">
              <AnimatedCounter target={240} suffix="+" />
            </div>
            <p className="text-xs text-gray-600">
              Public administration, policy, regulatory, and digital roles.
            </p>
          </div>
        </div>

        {/* Strategic Priorities Feature Card */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-[#E9EAEB] pb-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#694834] uppercase tracking-wider">
                STRATEGIC WORKFORCE CAPABILITY
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#382219]">
                Delivering for Tomorrow: APS Workforce Strategy 2025
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex items-center bg-[#FAF8F5] border border-[#EED4C4] rounded-full p-1">
              <button
                onClick={() => setActiveTab("federal")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "federal"
                    ? "bg-[#694834] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Federal Government (APS)
              </button>
              <button
                onClick={() => setActiveTab("state")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "state"
                    ? "bg-[#694834] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                State & Territory Public Services
              </button>
            </div>
          </div>

          {activeTab === "federal" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  The Federal Government is strengthening workforce planning capability to meet future workforce needs. This includes the <span className="font-bold text-[#382219]">Delivering for Tomorrow: APS Workforce Strategy 2025</span>, which provides a comprehensive suite of resources to support workforce planning across APS agencies.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The <span className="font-bold text-[#382219]">APS Academy</span> provides learning and development to build capability in the APS, creating pathways to address future skill gaps. They offer targeted training in AI, digital transformation, and critical data disciplines.
                </p>
                <div className="bg-[#FAF8F5] border border-[#EED4C4] rounded-xl p-4 text-xs text-gray-700 leading-relaxed">
                  <span className="font-bold text-[#382219] block mb-1">
                    Strategic In-House Capability Uplift:
                  </span>
                  Government priorities to build in-house capability rather than relying on external consultant work provides a historic opportunity to address skills shortages internally among existing public service employees.
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#FAF8F5] border border-[#E9EAEB] rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[#694834]">
                    <GraduationCap className="w-5 h-5" />
                    <h3 className="font-bold text-sm text-[#382219]">
                      APS Academy & Capability Hubs
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Delivering continuous learning across data literacy, ethical AI governance, public leadership, and policy craft.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E9EAEB] rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[#694834]">
                    <Cpu className="w-5 h-5" />
                    <h3 className="font-bold text-sm text-[#382219]">
                      Digital and AI Capability Strategy
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    National framework for the assurance and responsible use of AI in government operations and service delivery.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E9EAEB] rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[#694834]">
                    <ShieldCheck className="w-5 h-5" />
                    <h3 className="font-bold text-sm text-[#382219]">
                      Strategic Commissioning Framework
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Reducing reliance on external contractors and rebuilding core public sector analytical, advisory, and technical muscle.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  State and territory public sectors comprise the largest proportion of public administration personnel in Australia, delivering front-line healthcare, education, justice, policing, emergency response, and community services.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Public Sector Commissions across all states and territories (such as NSW Premier&apos;s Department, Victorian Public Sector Commission, and Jobs Queensland) are coordinating cross-agency workforce strategies to address critical skills gaps in regional communities and accelerate digital modernisation.
                </p>
                <div className="bg-[#FAF8F5] border border-[#EED4C4] rounded-xl p-4 text-xs text-gray-700 leading-relaxed">
                  <span className="font-bold text-[#382219] block mb-1">
                    Inter-Jurisdictional Working Group:
                  </span>
                  Facilitating cross-state capability sharing, common occupational standards, and reciprocal recognition of micro-credentials to enhance workforce mobility.
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#FAF8F5] border border-[#E9EAEB] rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[#694834]">
                    <Building2 className="w-5 h-5" />
                    <h3 className="font-bold text-sm text-[#382219]">
                      State-Level Public Sector Commissions
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Managing overarching capability frameworks, diversity targets, and executive leadership pipelines tailored to state priorities.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E9EAEB] rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[#694834]">
                    <Users className="w-5 h-5" />
                    <h3 className="font-bold text-sm text-[#382219]">
                      Regional & Remote Service Delivery
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Overcoming geographic isolation through decentralized administrative hubs, remote working flexibility, and regional cadetships.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E9EAEB] rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[#694834]">
                    <Layers className="w-5 h-5" />
                    <h3 className="font-bold text-sm text-[#382219]">
                      Vocational Education (VET) Integration
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Partnering with TAFE networks to deliver practical qualifications in public administration, cyber defence, and project management.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <ReportFooter contactUrl={report?.contactUrl} />
    </div>
  );
}
