"use client";

import React, { useEffect, useState } from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import AustraliaInteractiveMap from "@/components/common/AustraliaInteractiveMap";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import {
  MapPin,
  Users,
  Building2,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
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

interface JurisdictionData {
  code: string;
  name: string;
  employees: string;
  councils: number; // mapped to departments/agencies
  headline: string;
  topShortages: string[];
  oslTable: {
    occupation: string;
    stateShortage: "S" | "NS" | "R";
    nationalShortage: "S" | "NS" | "R";
  }[];
  priorities: string[];
}

const JURISDICTIONS: Record<string, JurisdictionData> = {
  ACT: {
    code: "ACT",
    name: "Australian Capital Territory & Federal",
    employees: "164,800",
    councils: 72,
    headline: "Central hub for Commonwealth departments, national security agencies, and ACT Public Service.",
    topShortages: [
      "Cyber Security Specialist",
      "Strategic Policy Adviser",
      "Data Engineer & Analytics Specialist",
      "Government Procurement & Contract Manager",
      "Digital Transformation Project Lead",
    ],
    oslTable: [
      { occupation: "Cyber Security Specialist", stateShortage: "S", nationalShortage: "S" },
      { occupation: "Data Analyst / Data Scientist", stateShortage: "S", nationalShortage: "S" },
      { occupation: "Policy & Planning Manager", stateShortage: "S", nationalShortage: "NS" },
      { occupation: "ICT Business Analyst", stateShortage: "S", nationalShortage: "S" },
      { occupation: "Contract Administrator", stateShortage: "R", nationalShortage: "NS" },
    ],
    priorities: [
      "In-house capability uplift to phase out costly consulting dependency.",
      "Delivering for Tomorrow: APS Workforce Strategy 2025 roll-out.",
      "APS Academy expansion for continuous digital and AI ethics learning.",
    ],
  },
  NSW: {
    code: "NSW",
    name: "New South Wales",
    employees: "435,000",
    councils: 110,
    headline: "Australia's largest state public sector with extensive regional service delivery networks.",
    topShortages: [
      "Frontline Service Operations Manager",
      "Regulatory Compliance Inspector",
      "Digital Service Architect",
      "Project & Infrastructure Director",
      "Health & Community Sector Liaison",
    ],
    oslTable: [
      { occupation: "Cyber Security Specialist", stateShortage: "S", nationalShortage: "S" },
      { occupation: "Compliance Officer", stateShortage: "S", nationalShortage: "NS" },
      { occupation: "ICT Project Manager", stateShortage: "S", nationalShortage: "S" },
      { occupation: "Policy Analyst", stateShortage: "NS", nationalShortage: "NS" },
      { occupation: "Public Relations Professional", stateShortage: "NS", nationalShortage: "NS" },
    ],
    priorities: [
      "NSW Premier's Department strategic workforce development across regional hubs.",
      "Improving recruitment pathways into state government for regional youth.",
      "Accelerated adoption of modern digital service standards.",
    ],
  },
  VIC: {
    code: "VIC",
    name: "Victoria",
    employees: "360,500",
    councils: 95,
    headline: "Victorian Public Sector Commission driving modern leadership and inter-agency collaboration.",
    topShortages: [
      "Data Scientist & AI Specialist",
      "Senior Policy & Evaluation Officer",
      "Child & Family Services Specialist",
      "Legal and Integrity Counsel",
      "Information Security Architect",
    ],
    oslTable: [
      { occupation: "Data Scientist", stateShortage: "S", nationalShortage: "S" },
      { occupation: "Cyber Security Specialist", stateShortage: "S", nationalShortage: "S" },
      { occupation: "Legal Officer", stateShortage: "R", nationalShortage: "NS" },
      { occupation: "Policy Adviser", stateShortage: "NS", nationalShortage: "NS" },
      { occupation: "Operations Manager", stateShortage: "NS", nationalShortage: "NS" },
    ],
    priorities: [
      "Victorian Public Sector Capability Framework implementation.",
      "Targeted cadetships and apprenticeships in public administration.",
      "Strengthening integrity frameworks and anti-corruption capability.",
    ],
  },
  QLD: {
    code: "QLD",
    name: "Queensland",
    employees: "305,200",
    councils: 85,
    headline: "Decentralized state workforce with unique regional, tropical, and remote delivery challenges.",
    topShortages: [
      "Regional Public Health Administrator",
      "Environmental Compliance Officer",
      "Disaster Resilience Coordinator",
      "ICT Network & Systems Engineer",
      "Vocational Education Coordinator",
    ],
    oslTable: [
      { occupation: "Disaster Management Coordinator", stateShortage: "S", nationalShortage: "S" },
      { occupation: "Environmental Officer", stateShortage: "S", nationalShortage: "R" },
      { occupation: "Cyber Security Specialist", stateShortage: "S", nationalShortage: "S" },
      { occupation: "Regional Operations Manager", stateShortage: "S", nationalShortage: "NS" },
      { occupation: "Data Analyst", stateShortage: "R", nationalShortage: "S" },
    ],
    priorities: [
      "Public Sector Commission QLD workforce strategy for regional public servants.",
      "Disaster recovery and emergency management cross-agency capabilities.",
      "First Nations public service attraction and retention programs.",
    ],
  },
  WA: {
    code: "WA",
    name: "Western Australia",
    employees: "162,000",
    councils: 65,
    headline: "Vast geographic spread with intensive competition for technical talent from resources sectors.",
    topShortages: [
      "Mining & Energy Regulation Officer",
      "Regional Administrative Officer",
      "Cyber & Network Specialist",
      "Public Procurement Lead",
      "Indigenous Community Liaison",
    ],
    oslTable: [
      { occupation: "Regulatory Officer", stateShortage: "S", nationalShortage: "NS" },
      { occupation: "Cyber Security Specialist", stateShortage: "S", nationalShortage: "S" },
      { occupation: "ICT Business Analyst", stateShortage: "S", nationalShortage: "S" },
      { occupation: "Contract Administrator", stateShortage: "S", nationalShortage: "NS" },
      { occupation: "Environmental Scientist", stateShortage: "R", nationalShortage: "NS" },
    ],
    priorities: [
      "Western Australia Public Sector Commission leadership programs.",
      "Retention incentives for public sector workers in the Pilbara and Kimberley.",
      "Vocational training partnerships with regional TAFEs.",
    ],
  },
  SA: {
    code: "SA",
    name: "South Australia",
    employees: "112,000",
    councils: 48,
    headline: "Focus on defence-industry alignment, advanced manufacturing regulation, and civil leadership.",
    topShortages: [
      "Defence Procurement Analyst",
      "Public Health Policy Officer",
      "Systems Engineer",
      "Corporate Governance Specialist",
      "Regional Delivery Lead",
    ],
    oslTable: [
      { occupation: "Cyber Security Specialist", stateShortage: "S", nationalShortage: "S" },
      { occupation: "Procurement Specialist", stateShortage: "S", nationalShortage: "NS" },
      { occupation: "Policy Officer", stateShortage: "NS", nationalShortage: "NS" },
      { occupation: "Systems Administrator", stateShortage: "R", nationalShortage: "S" },
      { occupation: "Data Analyst", stateShortage: "R", nationalShortage: "S" },
    ],
    priorities: [
      "Office of the Commissioner for Public Sector Employment capability initiatives.",
      "Upskilling public servants for AUKUS and defence program oversight.",
      "Early career pathways and graduate retention within SA Government.",
    ],
  },
  TAS: {
    code: "TAS",
    name: "Tasmania",
    employees: "35,400",
    councils: 28,
    headline: "Unified public service model with close integration between agencies and statutory authorities.",
    topShortages: [
      "Emergency Management Planner",
      "Senior Policy Adviser",
      "Healthcare Administration Specialist",
      "Digital Services Coordinator",
      "Environmental Compliance Officer",
    ],
    oslTable: [
      { occupation: "Policy Analyst", stateShortage: "S", nationalShortage: "NS" },
      { occupation: "Cyber Security Specialist", stateShortage: "S", nationalShortage: "S" },
      { occupation: "Emergency Management Officer", stateShortage: "S", nationalShortage: "S" },
      { occupation: "ICT Support Specialist", stateShortage: "R", nationalShortage: "NS" },
      { occupation: "Compliance Inspector", stateShortage: "NS", nationalShortage: "NS" },
    ],
    priorities: [
      "Department Premier and Cabinet Tasmania whole-of-service capability framework.",
      "Retaining specialized policy and administrative talent.",
      "Strengthening digital public service infrastructure.",
    ],
  },
  NT: {
    code: "NT",
    name: "Northern Territory",
    employees: "24,800",
    councils: 22,
    headline: "High proportion of public sector employment serving remote and First Nations communities.",
    topShortages: [
      "Remote Community Administration Lead",
      "First Nations Policy Specialist",
      "Essential Services Coordinator",
      "Regional Human Resources Manager",
      "Senior Regulatory Officer",
    ],
    oslTable: [
      { occupation: "Community Liaison Officer", stateShortage: "S", nationalShortage: "S" },
      { occupation: "Policy Officer", stateShortage: "S", nationalShortage: "NS" },
      { occupation: "Cyber Security Specialist", stateShortage: "S", nationalShortage: "S" },
      { occupation: "HR Professional", stateShortage: "S", nationalShortage: "NS" },
      { occupation: "Operations Officer", stateShortage: "S", nationalShortage: "NS" },
    ],
    priorities: [
      "Office of the Commissioner for Public Employment (OCPE) workforce plan.",
      "Partnership with Community and Public Sector Union (CPSU) NT.",
      "First Nations leadership and regional public service retention.",
    ],
  },
};

export default function FederalStateStateTerritoryView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const [selectedState, setSelectedState] = useState<string>("ACT");
  useEffect(() => {
    const jurisdiction = new URLSearchParams(window.location.search).get("jurisdiction")?.toUpperCase();
    if (jurisdiction && JURISDICTIONS[jurisdiction]) setSelectedState(jurisdiction);
  }, []);
  const current = JURISDICTIONS[selectedState] || JURISDICTIONS["ACT"];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#E07A5F]/20 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="state_territory" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="state_territory" />

        {/* Hero Card */}
        <div className="bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-10 relative overflow-hidden space-y-4 shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EED4C4]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="bg-[#694834] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              STATE AND TERRITORY PROFILES
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#382219]">
              Jurisdictional Profiles & Workforce Demographics
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Explore public sector workforce compositions, key occupational shortages, and strategic priorities across Australia&apos;s eight states and territories.
            </p>
          </div>
        </div>

        {/* Interactive Map & State Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Column */}
          <div className="lg:col-span-5 bg-white border border-[#E9EAEB] rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E9EAEB] pb-3">
              <span className="text-xs font-bold text-[#694834] uppercase tracking-wider">
                Select Jurisdiction
              </span>
              <span className="text-xs text-gray-500 font-semibold">
                Click map or buttons below
              </span>
            </div>

            <div className="w-full flex justify-center py-2">
              <AustraliaInteractiveMap
                selectedState={selectedState}
                onSelectState={(code) => setSelectedState(code)}
                statesData={JURISDICTIONS}
                className="max-w-[340px]"
              />
            </div>

            {/* Quick Pills */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#E9EAEB]">
              {Object.keys(JURISDICTIONS).map((code) => (
                <button
                  key={code}
                  onClick={() => setSelectedState(code)}
                  className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedState === code
                      ? "bg-[#694834] text-white shadow-sm"
                      : "bg-[#FAF8F5] border border-[#E9EAEB] text-gray-700 hover:border-[#694834]"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 bg-white border border-[#E9EAEB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E9EAEB] pb-5">
              <div>
                <span className="text-xs font-bold text-[#694834] uppercase tracking-wider block">
                  {current.code} PROFILE
                </span>
                <h2 className="text-2xl font-extrabold text-[#382219]">
                  {current.name}
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#FAF8F5] border border-[#EED4C4] px-4 py-2 rounded-xl text-right">
                  <span className="text-[11px] font-semibold text-gray-500 block">
                    Public Employees
                  </span>
                  <span className="text-lg font-bold text-[#694834]">
                    {current.employees}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed font-normal">
              {current.headline}
            </p>

            {/* Top Shortages List */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-[#382219] uppercase tracking-wider">
                Acute Public Sector Occupational Shortages
              </h3>
              <div className="space-y-2">
                {current.topShortages.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FAF8F5] border border-[#E9EAEB] rounded-xl px-4 py-2.5 flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-gray-800">{item}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#EED4C4] text-[#694834]">
                      High Demand
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* OSL Table */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-sm text-[#382219] uppercase tracking-wider">
                Occupational Shortage List (OSL) Ratings
              </h3>
              <div className="border border-[#E9EAEB] rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] border-b border-[#E9EAEB] text-gray-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="px-4 py-2.5">Occupation</th>
                      <th className="px-4 py-2.5 text-center">State Rating</th>
                      <th className="px-4 py-2.5 text-center">National Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9EAEB]">
                    {current.oslTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5]/50">
                        <td className="px-4 py-2.5 font-medium text-gray-800">
                          {row.occupation}
                        </td>
                        <td className="px-4 py-2.5 text-center font-bold">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] ${
                              row.stateShortage === "S"
                                ? "bg-red-100 text-red-700"
                                : row.stateShortage === "R"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {row.stateShortage === "S"
                              ? "Shortage (S)"
                              : row.stateShortage === "R"
                              ? "Regional Shortage (R)"
                              : "No Shortage (NS)"}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-center font-bold">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] ${
                              row.nationalShortage === "S"
                                ? "bg-red-100 text-red-700"
                                : row.nationalShortage === "R"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {row.nationalShortage === "S"
                              ? "Shortage (S)"
                              : row.nationalShortage === "R"
                              ? "Regional (R)"
                              : "No Shortage (NS)"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Strategic Priorities */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-sm text-[#382219] uppercase tracking-wider">
                Jurisdictional Strategic Priorities
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {current.priorities.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-gray-700 bg-[#FAF8F5] p-3 rounded-xl border border-[#E9EAEB]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#694834] shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <ReportFooter contactUrl={report?.contactUrl} />
    </div>
  );
}
