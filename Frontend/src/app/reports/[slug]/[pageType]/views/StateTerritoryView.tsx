"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import { ArrowLeft, ArrowRight, Download, Search } from "lucide-react";
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

interface StateData {
  code: string;
  name: string;
  employees: string;
  councils: number;
  topShortages: string[];
  oslTable: {
    occupation: string;
    stateShortage: "NS" | "R" | "S";
    nationalShortage: "NS" | "R" | "S";
  }[];
  lgSpecificShortages: string[];
}

const STATES_DATA: Record<string, StateData> = {
  NSW: {
    code: "NSW",
    name: "New South Wales",
    employees: "65,200",
    councils: 128,
    topShortages: [
      "IT Officer / Cyber Specialist",
      "Planner (including Town and Urban)",
      "Engineer (including Civil and Environmental)",
      "Tradesperson (including Mechanic and Construction)",
      "Building Surveyor",
    ],
    oslTable: [
      {
        occupation: "IT Officer / Cyber Specialist",
        stateShortage: "NS",
        nationalShortage: "NS",
      },
      { occupation: "Planner", stateShortage: "R", nationalShortage: "R" },
      { occupation: "Engineer", stateShortage: "S", nationalShortage: "S" },
      {
        occupation: "Tradesperson",
        stateShortage: "S",
        nationalShortage: "NS",
      },
      {
        occupation: "Building Surveyor",
        stateShortage: "S",
        nationalShortage: "S",
      },
    ],
    lgSpecificShortages: [
      "IT Officer / Cyber Specialist",
      "Planner (including Town and Urban)",
      "Tradesperson (including Mechanic and Construction)",
    ],
  },
  NT: {
    code: "NT",
    name: "Northern Territory",
    employees: "5,000",
    councils: 18,
    topShortages: [
      "Community Program Coordinator",
      "Community Service Roles",
      "Managerial Roles",
      "Works Officer",
      "Tradesperson",
    ],
    oslTable: [
      {
        occupation: "Community Program Coordinator",
        stateShortage: "S",
        nationalShortage: "S",
      },
      {
        occupation: "Community Service Roles",
        stateShortage: "S",
        nationalShortage: "NS",
      },
      {
        occupation: "Managerial Roles",
        stateShortage: "R",
        nationalShortage: "R",
      },
      {
        occupation: "Works Officer",
        stateShortage: "S",
        nationalShortage: "S",
      },
      {
        occupation: "Tradesperson",
        stateShortage: "S",
        nationalShortage: "NS",
      },
    ],
    lgSpecificShortages: [
      "Community Program Coordinator",
      "Community Service Roles",
      "Works Officer",
    ],
  },
  QLD: {
    code: "QLD",
    name: "Queensland",
    employees: "48,800",
    councils: 77,
    topShortages: [
      "Water / Wastewater Operator",
      "Civil Engineer",
      "Town Planner",
      "Environmental Health Officer",
      "Plant Operator",
    ],
    oslTable: [
      {
        occupation: "Water Operator",
        stateShortage: "S",
        nationalShortage: "S",
      },
      {
        occupation: "Civil Engineer",
        stateShortage: "S",
        nationalShortage: "S",
      },
      { occupation: "Town Planner", stateShortage: "R", nationalShortage: "R" },
      {
        occupation: "Environmental Health",
        stateShortage: "S",
        nationalShortage: "R",
      },
      {
        occupation: "Plant Operator",
        stateShortage: "S",
        nationalShortage: "NS",
      },
    ],
    lgSpecificShortages: [
      "Water / Wastewater Operator",
      "Environmental Health Officer",
      "Plant Operator",
    ],
  },
  SA: {
    code: "SA",
    name: "South Australia",
    employees: "11,700",
    councils: 68,
    topShortages: [
      "Building Surveyor",
      "Town Planner",
      "Civil Engineer",
      "Horticulturist / Parks Worker",
      "IT Specialist",
    ],
    oslTable: [
      {
        occupation: "Building Surveyor",
        stateShortage: "S",
        nationalShortage: "S",
      },
      { occupation: "Town Planner", stateShortage: "R", nationalShortage: "R" },
      {
        occupation: "Civil Engineer",
        stateShortage: "S",
        nationalShortage: "S",
      },
      {
        occupation: "Horticulturist",
        stateShortage: "NS",
        nationalShortage: "NS",
      },
      {
        occupation: "IT Specialist",
        stateShortage: "S",
        nationalShortage: "NS",
      },
    ],
    lgSpecificShortages: [
      "Building Surveyor",
      "Horticulturist / Parks Worker",
      "IT Specialist",
    ],
  },
  TAS: {
    code: "TAS",
    name: "Tasmania",
    employees: "4,800",
    councils: 29,
    topShortages: [
      "Environmental Health Officer",
      "Planning Officer",
      "Civil Engineer",
      "Heavy Diesel Mechanic",
      "Rates & Revenue Officer",
    ],
    oslTable: [
      {
        occupation: "Environmental Health Officer",
        stateShortage: "S",
        nationalShortage: "R",
      },
      {
        occupation: "Planning Officer",
        stateShortage: "R",
        nationalShortage: "R",
      },
      {
        occupation: "Civil Engineer",
        stateShortage: "S",
        nationalShortage: "S",
      },
      {
        occupation: "Heavy Diesel Mechanic",
        stateShortage: "S",
        nationalShortage: "NS",
      },
      {
        occupation: "Rates & Revenue Officer",
        stateShortage: "NS",
        nationalShortage: "NS",
      },
    ],
    lgSpecificShortages: [
      "Environmental Health Officer",
      "Heavy Diesel Mechanic",
      "Rates & Revenue Officer",
    ],
  },
  VIC: {
    code: "VIC",
    name: "Victoria",
    employees: "56,100",
    councils: 79,
    topShortages: [
      "Early Childhood Educator",
      "Statutory Planner",
      "Civil Engineer",
      "Building Surveyor",
      "Aged Care Worker",
    ],
    oslTable: [
      {
        occupation: "Early Childhood Educator",
        stateShortage: "S",
        nationalShortage: "S",
      },
      {
        occupation: "Statutory Planner",
        stateShortage: "R",
        nationalShortage: "R",
      },
      {
        occupation: "Civil Engineer",
        stateShortage: "S",
        nationalShortage: "S",
      },
      {
        occupation: "Building Surveyor",
        stateShortage: "S",
        nationalShortage: "S",
      },
      {
        occupation: "Aged Care Worker",
        stateShortage: "S",
        nationalShortage: "S",
      },
    ],
    lgSpecificShortages: [
      "Early Childhood Educator",
      "Statutory Planner",
      "Building Surveyor",
    ],
  },
  WA: {
    code: "WA",
    name: "Western Australia",
    employees: "26,500",
    councils: 139,
    topShortages: [
      "Environmental Health Officer",
      "Civil Engineer",
      "Plant Operator",
      "Building Surveyor",
      "Governance & Compliance Officer",
    ],
    oslTable: [
      {
        occupation: "Environmental Health Officer",
        stateShortage: "S",
        nationalShortage: "R",
      },
      {
        occupation: "Civil Engineer",
        stateShortage: "S",
        nationalShortage: "S",
      },
      {
        occupation: "Plant Operator",
        stateShortage: "S",
        nationalShortage: "NS",
      },
      {
        occupation: "Building Surveyor",
        stateShortage: "S",
        nationalShortage: "S",
      },
      {
        occupation: "Governance Officer",
        stateShortage: "NS",
        nationalShortage: "NS",
      },
    ],
    lgSpecificShortages: [
      "Environmental Health Officer",
      "Plant Operator",
      "Governance & Compliance Officer",
    ],
  },
};

interface NationalOccupation {
  name: string;
  aus: string;
  nsw: string;
  nt: string;
  qld: string;
  sa: string;
  tas: string;
  vic: string;
  wa: string;
  lgSpecific?: string;
}

const NATIONAL_OCCUPATIONS: NationalOccupation[] = [
  {
    name: "Building Surveyor",
    aus: "S",
    nsw: "S",
    nt: "-",
    qld: "-",
    sa: "S",
    tas: "S",
    vic: "-",
    wa: "-",
  },
  {
    name: "Engineer (including Civil, Environmental and Operations)",
    aus: "S",
    nsw: "S",
    nt: "-",
    qld: "NS",
    sa: "S",
    tas: "S",
    vic: "-",
    wa: "-",
  },
  {
    name: "Arborist",
    aus: "S",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "S",
    tas: "-",
    vic: "S",
    wa: "-",
  },
  {
    name: "Planner (including Town, Urban and Regional)",
    aus: "R",
    nsw: "R",
    nt: "-",
    qld: "R",
    sa: "-",
    tas: "R",
    vic: "R",
    wa: "R",
    lgSpecific: "LG-specific: NSW, QLD, VIC, WA",
  },
  {
    name: "Maternal Child Health Nurse",
    aus: "S",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "S",
    wa: "-",
  },
  {
    name: "Tradesperson (including Mechanic and Construction)",
    aus: "NS",
    nsw: "S",
    nt: "S",
    qld: "NS",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
    lgSpecific: "LG-specific: NSW, NT, QLD",
  },
  {
    name: "Community Program Coordinator",
    aus: "NS",
    nsw: "-",
    nt: "S",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
    lgSpecific: "LG-specific: NT",
  },
  {
    name: "Community Service Roles",
    aus: "NS",
    nsw: "-",
    nt: "S",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
    lgSpecific: "LG-specific: NT",
  },
  {
    name: "Environmental Officer",
    aus: "R",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "R",
    lgSpecific: "LG-specific: WA",
  },
  {
    name: "Managerial Roles",
    aus: "NS",
    nsw: "-",
    nt: "S",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
    lgSpecific: "LG-specific: NT",
  },
  {
    name: "Works Officer",
    aus: "NS",
    nsw: "-",
    nt: "S",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
    lgSpecific: "LG-specific: NT",
  },
  {
    name: "Community Development Officer",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "NS",
    tas: "-",
    vic: "-",
    wa: "-",
    lgSpecific: "LG-specific: SA",
  },
  {
    name: "Corporate Performance",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "NS",
    lgSpecific: "LG-specific: WA",
  },
  {
    name: "Finance (rates) Officer",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "NS",
    lgSpecific: "LG-specific: WA",
  },
  {
    name: "Human Resources",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "NS",
    wa: "-",
    lgSpecific: "LG-specific: VIC",
  },
  {
    name: "IT Officer/Cyber Specialist (including IT/Cyber/AI/ERP)",
    aus: "NS",
    nsw: "NS",
    nt: "-",
    qld: "NS",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "NS",
    lgSpecific: "LG-specific: NSW, QLD, WA",
  },
  {
    name: "Mechanic",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "NS",
    wa: "-",
    lgSpecific: "LG-specific: VIC",
  },
  {
    name: "Plumbing Inspector",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "NS",
    vic: "-",
    wa: "-",
    lgSpecific: "LG-specific: TAS",
  },
  {
    name: "Project Manager/Business Analyst",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "NS",
    tas: "-",
    vic: "-",
    wa: "-",
    lgSpecific: "LG-specific: SA",
  },
  {
    name: "Water Operations Officer",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "NS",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
    lgSpecific: "LG-specific: QLD",
  },
];

interface CompareOccupation {
  name: string;
  aus: string;
  nsw: { val: string; type?: "NS" | "R" | "S" } | string;
  nt: { val: string; type?: "NS" | "R" | "S" } | string;
  qld: { val: string; type?: "NS" | "R" | "S" } | string;
  sa: { val: string; type?: "NS" | "R" | "S" } | string;
  tas: { val: string; type?: "NS" | "R" | "S" } | string;
  vic: { val: string; type?: "NS" | "R" | "S" } | string;
  wa: { val: string; type?: "NS" | "R" | "S" } | string;
}

const COMPARE_OCCUPATIONS: CompareOccupation[] = [
  {
    name: "IT Officer/ Cyber Specialist",
    aus: "NS",
    nsw: { val: "1", type: "NS" },
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Planner",
    aus: "R",
    nsw: { val: "2", type: "R" },
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: { val: "2", type: "R" },
    wa: "-",
  },
  {
    name: "Engineer",
    aus: "S",
    nsw: { val: "3", type: "S" },
    nt: "-",
    qld: { val: "1", type: "NS" },
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Tradesperson",
    aus: "NS",
    nsw: { val: "4", type: "S" },
    nt: { val: "5", type: "S" },
    qld: { val: "5", type: "NS" },
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Building Surveyor",
    aus: "S",
    nsw: { val: "5", type: "S" },
    nt: "-",
    qld: "-",
    sa: { val: "4", type: "S" },
    tas: { val: "2", type: "S" },
    vic: "-",
    wa: "-",
  },
  {
    name: "Community Service Roles",
    aus: "NS",
    nsw: "-",
    nt: { val: "1", type: "S" },
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Managerial Roles",
    aus: "NS",
    nsw: "-",
    nt: { val: "2", type: "S" },
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Works Officer",
    aus: "NS",
    nsw: "-",
    nt: { val: "3", type: "S" },
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Community Program Coordinator",
    aus: "NS",
    nsw: "-",
    nt: { val: "4", type: "S" },
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Town Planner",
    aus: "R",
    nsw: "-",
    nt: "-",
    qld: { val: "2", type: "R" },
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Water Operations Officer",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: { val: "3", type: "NS" },
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "IT Officer",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: { val: "4", type: "NS" },
    sa: "-",
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Civil Engineer / Operations",
    aus: "S",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: { val: "1", type: "S" },
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Arborist",
    aus: "S",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: { val: "2", type: "S" },
    tas: "-",
    vic: { val: "3", type: "S" },
    wa: "-",
  },
  {
    name: "Project Manager / Business Analyst",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: { val: "3", type: "NS" },
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Community Development Officer",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: { val: "5", type: "NS" },
    tas: "-",
    vic: "-",
    wa: "-",
  },
  {
    name: "Urban and Regional Planner",
    aus: "R",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: { val: "1", type: "R" },
    vic: "-",
    wa: "-",
  },
  {
    name: "Civil Engineer",
    aus: "S",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: { val: "3", type: "S" },
    vic: "-",
    wa: "-",
  },
  {
    name: "Plumbing Inspectors",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: { val: "4", type: "NS" },
    vic: "-",
    wa: "-",
  },
  {
    name: "Mechanic",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: { val: "1", type: "NS" },
    wa: "-",
  },
  {
    name: "Human Resources",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: { val: "4", type: "NS" },
    wa: "-",
  },
  {
    name: "Maternal Child Health Nurses",
    aus: "S",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: { val: "5", type: "S" },
    wa: "-",
  },
  {
    name: "Corporate Performance",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: { val: "1", type: "NS" },
  },
  {
    name: "IT/Cyber/AI/ERP Specialist",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: { val: "2", type: "NS" },
  },
  {
    name: "Environmental Officer",
    aus: "R",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: { val: "3", type: "R" },
  },
  {
    name: "Finance (rates) Officer",
    aus: "NS",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: { val: "4", type: "NS" },
  },
  {
    name: "Urban Planner",
    aus: "R",
    nsw: "-",
    nt: "-",
    qld: "-",
    sa: "-",
    tas: "-",
    vic: "-",
    wa: { val: "5", type: "R" },
  },
];

// SVG Mini Map of Australia
function AustraliaMiniMap({
  activeState,
  className = "w-28 h-20",
}: {
  activeState: string;
  className?: string;
}) {
  const isStateActive = (code: string) =>
    activeState.toUpperCase() === code.toUpperCase();

  const getFill = (code: string) =>
    isStateActive(code) ? "#8FA84A" : "#D6DFBF";

  return (
    <svg
      viewBox="28 18 304 314"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* WA */}
      <path
        d="M 40 100 L 140 100 L 140 250 L 80 250 L 50 200 L 30 160 Z"
        fill={getFill("WA")}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* NT */}
      <path
        d="M 140 50 L 220 50 L 220 160 L 140 160 Z"
        fill={getFill("NT")}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* SA */}
      <path
        d="M 140 160 L 220 160 L 220 200 L 250 200 L 245 250 L 220 260 L 195 240 L 180 250 L 140 250 Z"
        fill={getFill("SA")}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* QLD */}
      <path
        d="M 220 30 L 245 20 L 255 70 L 310 130 L 330 180 L 320 200 L 220 200 Z"
        fill={getFill("QLD")}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* NSW */}
      <path
        d="M 220 200 L 320 200 L 305 265 L 285 260 L 270 250 L 250 245 L 220 230 Z"
        fill={getFill("NSW")}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* VIC */}
      <path
        d="M 220 230 L 250 245 L 270 250 L 285 260 L 265 285 L 225 270 Z"
        fill={getFill("VIC")}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* TAS */}
      <path
        d="M 255 300 L 280 300 L 285 325 L 260 330 Z"
        fill={getFill("TAS")}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Zoomed State Silhouette
function ZoomedStateMap({
  stateCode,
  className = "w-full h-full",
}: {
  stateCode: string;
  className?: string;
}) {
  const code = stateCode.toUpperCase();

  switch (code) {
    case "NSW":
      return (
        <svg
          viewBox="0 0 500 450"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* NSW Detailed Silhouette */}
          <path
            d="M 60 45 
               L 395 45 
               L 415 70 
               L 435 95 
               L 440 135 
               L 425 165 
               L 445 195 
               L 420 245 
               L 410 275 
               L 395 305 
               L 375 355 
               L 345 385 
               L 320 370 
               L 300 350 
               L 260 320 
               L 210 325 
               L 165 310 
               L 120 310 
               L 95 330 
               L 60 330 
               Z"
            fill="#9BAF4E"
            stroke="#8A9D41"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* ACT cutout */}
          <path
            d="M 310 280 L 330 275 L 335 295 L 315 300 Z"
            fill="#EFF3E7"
            stroke="#8A9D41"
            strokeWidth="1.5"
          />
        </svg>
      );

    case "VIC":
      return (
        <svg
          viewBox="0 0 500 350"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 50 
               L 130 50 
               L 180 80 
               L 260 75 
               L 350 130 
               L 420 150 
               L 440 170 
               L 390 260 
               L 340 270 
               L 290 280 
               L 260 250 
               L 230 280 
               L 170 275 
               L 110 260 
               L 50 250 
               Z"
            fill="#9BAF4E"
            stroke="#8A9D41"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "QLD":
      return (
        <svg
          viewBox="0 0 450 500"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 170 
               L 120 170 
               L 150 40 
               L 175 20 
               L 190 60 
               L 205 130 
               L 250 170 
               L 330 230 
               L 380 320 
               L 410 420 
               L 380 460 
               L 50 460 
               Z"
            fill="#9BAF4E"
            stroke="#8A9D41"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "WA":
      return (
        <svg
          viewBox="0 0 450 500"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 80 
               L 120 40 
               L 200 60 
               L 350 60 
               L 350 450 
               L 180 450 
               L 100 420 
               L 40 330 
               L 30 220 
               L 60 150 
               Z"
            fill="#9BAF4E"
            stroke="#8A9D41"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "SA":
      return (
        <svg
          viewBox="0 0 450 450"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 60 50 
               L 380 50 
               L 380 180 
               L 400 240 
               L 380 380 
               L 330 390 
               L 290 340 
               L 270 380 
               L 230 350 
               L 180 380 
               L 60 380 
               Z"
            fill="#9BAF4E"
            stroke="#8A9D41"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "TAS":
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 80 70 
               L 320 65 
               L 340 180 
               L 320 280 
               L 280 340 
               L 180 350 
               L 90 320 
               L 60 210 
               Z"
            fill="#9BAF4E"
            stroke="#8A9D41"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "NT":
      return (
        <svg
          viewBox="0 0 400 450"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 60 120 
               L 120 40 
               L 200 40 
               L 270 90 
               L 320 90 
               L 320 420 
               L 60 420 
               Z"
            fill="#9BAF4E"
            stroke="#8A9D41"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return null;
  }
}

export default function StateTerritoryView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"single" | "compare">("single");
  const [compareChartsLoaded, setCompareChartsLoaded] = useState(false);

  useEffect(() => {
    if (viewMode === "compare") {
      setCompareChartsLoaded(false);
      const timer = setTimeout(() => setCompareChartsLoaded(true), 150);
      return () => clearTimeout(timer);
    }
  }, [viewMode]);
  const [selectedState, setSelectedState] = useState<string>("NSW");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"alpha" | "shortages">("alpha");
  const [ratingFilter, setRatingFilter] = useState<
    "all" | "shortage" | "regional" | "noshortage"
  >("all");

  const currentState = STATES_DATA[selectedState] || STATES_DATA.NSW;

  const renderCellBadge = (
    cell: { val: string; type?: "NS" | "R" | "S" } | string,
  ) => {
    if (typeof cell === "string") {
      return renderBadge(cell);
    }
    return renderBadge(cell.val, cell.type);
  };

  const renderBadge = (status: string, badgeType?: string) => {
    if (status === "NS") {
      return (
        <span className="inline-flex items-center justify-center w-10 h-7 rounded-full bg-[#B2DB79] text-gray-900 font-bold text-xs">
          NS
        </span>
      );
    }
    if (status === "R") {
      return (
        <span className="inline-flex items-center justify-center w-10 h-7 rounded-full bg-[#F4F26E] text-gray-900 font-bold text-xs">
          R
        </span>
      );
    }
    if (status === "S") {
      return (
        <span className="inline-flex items-center justify-center w-10 h-7 rounded-full bg-[#AF3800] text-white font-bold text-xs">
          S
        </span>
      );
    }
    if (status === "-" || !status) {
      return (
        <span className="text-gray-400 font-normal text-xs sm:text-sm">-</span>
      );
    }
    if (!isNaN(Number(status))) {
      const colorClass =
        badgeType === "S"
          ? "bg-[#AF3800] text-white"
          : badgeType === "R"
            ? "bg-[#F4F26E] text-gray-900"
            : "bg-[#B2DB79] text-gray-900";
      return (
        <span
          className={`inline-flex items-center justify-center w-10 h-7 rounded-full font-bold text-xs ${colorClass}`}
        >
          {status}
        </span>
      );
    }
    return (
      <span className="text-foreground/40 font-mono text-xs">{status}</span>
    );
  };

  const getCellRatingStyle = (status: string) => {
    if (status === "NS") return "bg-[#B2DB79] text-[#1B240E]";
    if (status === "R") return "bg-[#F4F26E] text-[#1B240E]";
    if (status === "S") return "bg-[#AF3800] text-white";
    return "bg-gray-100 text-gray600";
  };

  const filteredOccupations = NATIONAL_OCCUPATIONS.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (ratingFilter === "shortage") return item.aus === "S";
    if (ratingFilter === "regional") return item.aus === "R";
    if (ratingFilter === "noshortage") return item.aus === "NS";
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader slug={slug} report={report} currentPage="state_territory" />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="animate-fade-in max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <ReportNavButtons slug={slug} currentPage="state_territory" />

        {/* ── HERO BANNER & VIEW MODE TOGGLE ── */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 space-y-6">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-lg-dark">
              Local Government Workforce Profile
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
              <p>
                Across Australia, there are 537 local councils. Of these local
                councils, around 55 per cent are located in regional, rural or
                remote areas with the other 45 per cent split across urban
                regions, urban fringe and urban areas. Local councils manage
                approximately one-third of Australia's public infrastructure
                assets, including roads, airports, facilities and other assets
                and make up 77 per cent of the national road network (by
                length). The public assets managed by local councils are valued
                at an estimated $643 billion.
              </p>
              <p>
                The Local Government workforce is multidisciplinary, employing
                over an estimated 400 different occupations across approximately
                218,000 employees – managed individually at the local council
                level and commonly represented through state and territory
                associations and the Australian Local Government Association
                (ALGA). While employment projections estimate significant growth
                over the next ten years, successive Workforce Plans and
                Parliamentary Commissions of Inquiry have noted extensive
                challenges with recruitment and retention, and a significant
                expansion of roles and responsibilities.
              </p>
            </div>
          </div>

          {/* Mode Switcher Pill Segmented Control */}
          <div className="pt-2">
            <div className="inline-flex items-center bg-[#F0F5DF] p-1.5 rounded-full border border-gray200">
              <button
                onClick={() => setViewMode("single")}
                className={`px-6 py-2 rounded-full text-sm font-bold cursor-pointer ${
                  viewMode === "single"
                    ? "bg-[#8AC900] text-[#252D02]"
                    : "bg-transparent text-notes hover:text-[#1B240E]"
                }`}
              >
                Single state
              </button>
              <button
                onClick={() => setViewMode("compare")}
                className={`px-6 py-2 rounded-full text-sm font-bold cursor-pointer ${
                  viewMode === "compare"
                    ? "bg-[#8AC900] text-[#252D02]"
                    : "bg-transparent text-notes hover:text-[#1B240E]"
                }`}
              >
                Compare all states
              </button>
            </div>
          </div>
        </div>

        {/* ── MODE A: SINGLE STATE VIEW ── */}
        {viewMode === "single" && (
          <div className="bg-white border border-gray200 rounded-2xl p-6 space-y-8">
            {/* Jurisdiction Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-gray200">
              <span
                className="text-xs font-bold text-notes uppercase 
              
              mr-3"
              >
                CHOOSE A STATE OR TERRITORY
              </span>
              {["NATIONAL", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"].map(
                (code) => (
                  <button
                    key={code}
                    onClick={() => setSelectedState(code)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer text-gray800 ${
                      selectedState === code
                        ? "bg-[#8AC900] border-[#8AC900]"
                        : "bg-white border border-gray200"
                    }`}
                  >
                    {code}
                  </button>
                ),
              )}
            </div>

            {selectedState === "NATIONAL" ? (
              /* NATIONAL SINGLE VIEW */
              <div key="NATIONAL" className="space-y-8 animate-fade-in">
                {/* 3 National Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1 */}
                  <div className="border border-gray200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-3xl font-bold text-lg-dark block">
                        <AnimatedCounter target={218000} formatNumber={true} />
                      </span>
                      <p className="text-sm font-semibold text-gray600">
                        Local Government employees as of June 2025
                      </p>
                    </div>
                    <div>
                      <div className="border-t border-gray200 mb-3" />
                      <p className="text-xs text-[#416102] leading-relaxed">
                        Source: ABS, Public Sector Employment and Earnings,
                        2025, Table 1
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="border border-gray200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <span className="text-3xl font-bold text-[#9CAA54] block leading-tight">
                        <AnimatedCounter target={49.1} decimals={1} suffix="% Female" />
                      </span>
                      <span className="text-3xl font-bold text-lg-dark block leading-tight">
                        <AnimatedCounter target={50.9} decimals={1} suffix="% Male" />
                      </span>
                      <p className="text-sm font-semibold text-gray600 pt-1">
                        National Workforce Composition
                      </p>
                    </div>
                    <div>
                      <div className="border-t border-gray200 mb-3" />
                      <p className="text-xs text-[#416102] leading-relaxed">
                        Source: ALGA, 2022 Workforce Skills and Capability
                        Survey, Table D2
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="border border-gray200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-3xl font-bold text-lg-dark block">
                        <AnimatedCounter target={8.2} decimals={1} suffix="%" />
                      </span>
                      <p className="text-sm font-semibold text-gray600">
                        of the national workforce identifies as First Nations
                        (vs 3.8% of the population)
                      </p>
                    </div>
                    <div>
                      <div className="border-t border-gray200 mb-3" />
                      <p className="text-xs text-[#416102] leading-relaxed">
                        Source: ALGA, 2022 Workforce Skills and Capability
                        Survey, Table D3
                      </p>
                    </div>
                  </div>
                </div>

                {/* National Australia Map & Shortage Comparison Table */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Australia Map Box */}
                  <div className="lg:col-span-5 bg-[#F0F5DF] border border-[#252D02]/13 rounded-2xl p-6 relative flex flex-col justify-between space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-bold text-gray800 pt-1">
                        National Map
                      </h3>
                    </div>

                    {/* National Map Image */}
                    <div className="w-full flex items-center justify-center p-2">
                      <img
                        src="/images/reports/australia-national-map.png"
                        alt="Australia National Map"
                        className="w-full h-auto object-contain max-h-[500px]"
                      />
                    </div>

                    <p className="text-xs text-active leading-relaxed pt-2">
                      Source: ABS, Public sector employment and earnings, 2025.
                    </p>
                  </div>

                  {/* Right Occupation Shortage Comparison Section */}
                  <div className="lg:col-span-7 bg-white space-y-6">
                    {/* Header Title & Counter */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2 max-w-2xl">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                          National Occupation Shortage Comparison
                        </h3>
                      </div>
                      <div className="text-right text-xs text-[#416102] shrink-0 pt-1">
                        <div className="text-[#416102]">
                          {filteredOccupations.length} of{" "}
                          {NATIONAL_OCCUPATIONS.length}
                        </div>
                        <div>occupations shown</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray600 font-normal leading-relaxed">
                      Occupations identified in shortage through the Local
                      Government Skills Audit, compared against the Jobs and
                      Skills Australia Occupational Shortage List (OSL) —
                      Australia-wide and by state and territory.
                    </p>

                    {/* Search and Sort Row */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      {/* Search Bar */}
                      <div className="relative flex-1 max-w-lg">
                        <input
                          type="text"
                          placeholder="Search by Occupation"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-[#FAFAF0] border border-gray200 rounded-full px-5 py-3 text-xs text-gray800 placeholder:text-gray800 focus:outline-none focus:ring-1 focus:ring-[#85B810]"
                        />
                      </div>

                      {/* Sort Pill Control */}
                      <div className="inline-flex items-center bg-[#FAFAF0] p-1 rounded-full border border-gray200 shrink-0">
                        <button
                          onClick={() => setSortBy("alpha")}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            sortBy === "alpha"
                              ? "bg-[#8AC900] text-[#252D02]"
                              : "bg-transparent text-notes hover:text-[#1B240E]"
                          }`}
                        >
                          A-Z
                        </button>
                        <button
                          onClick={() => setSortBy("shortages")}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            sortBy === "shortages"
                              ? "bg-[#8AC900] text-[#252D02]"
                              : "bg-transparent text-notes hover:text-[#1B240E]"
                          }`}
                        >
                          Most shortages
                        </button>
                      </div>
                    </div>

                    {/* Rating Filters Row */}
                    <div>
                      <div className="inline-flex flex-wrap items-center bg-[#FAFAF0] p-1 rounded-full border border-gray200 gap-1">
                        <button
                          onClick={() => setRatingFilter("all")}
                          className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            ratingFilter === "all"
                              ? "bg-[#8AC900] text-[#252D02]"
                              : "bg-transparent text-notes hover:text-[#1B240E]"
                          }`}
                        >
                          All Ratings
                        </button>
                        <button
                          onClick={() => setRatingFilter("shortage")}
                          className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            ratingFilter === "shortage"
                              ? "bg-[#8AC900] text-[#252D02]"
                              : "bg-transparent text-notes hover:text-[#1B240E]"
                          }`}
                        >
                          Shortages
                        </button>
                        <button
                          onClick={() => setRatingFilter("regional")}
                          className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            ratingFilter === "regional"
                              ? "bg-[#8AC900] text-[#252D02]"
                              : "bg-transparent text-notes hover:text-[#1B240E]"
                          }`}
                        >
                          Regional shortage
                        </button>
                        <button
                          onClick={() => setRatingFilter("noshortage")}
                          className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            ratingFilter === "noshortage"
                              ? "bg-[#8AC900] text-[#252D02]"
                              : "bg-transparent text-notes hover:text-[#1B240E]"
                          }`}
                        >
                          No Shortage
                        </button>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-x-6 gap-y-2 text-sm font-semibold text-gray800 pt-1">
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="w-4 h-4 rounded-xs bg-[#B2DB79] inline-block shrink-0" />
                        <span>
                          <strong className="font-bold">NS</strong> = No
                          Shortage
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="w-4 h-4 rounded-xs bg-[#F4F26E] inline-block shrink-0" />
                        <span>
                          <strong className="font-bold">R</strong> = Regional
                          Shortage
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="w-4 h-4 rounded-xs bg-[#AF3800] inline-block shrink-0" />
                        <span>
                          <strong className="font-bold">S</strong> = Shortage
                        </span>
                      </div>
                      <div className="text-sm text-gray800 font-normal leading-normal">
                        — = not identified through the Skills Audit in that
                        state or territory
                      </div>
                    </div>

                    {/* Table with borders around and between columns */}
                    <div className="overflow-auto h-[500px] border border-gray200 rounded-xl relative">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead className="sticky top-0 z-10 bg-[#F5F5F5] shadow-xs">
                          <tr className="bg-[#F5F5F5] text-[#252D02] font-bold text-xs uppercase">
                            <th className="p-4 font-bold text-left tracking-wider bg-[#F5F5F5]">
                              OCCUPATION
                            </th>
                            <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                              AUS
                            </th>
                            <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                              NSW
                            </th>
                            <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                              NT
                            </th>
                            <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                              QLD
                            </th>
                            <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                              SA
                            </th>
                            <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                              TAS
                            </th>
                            <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                              VIC
                            </th>
                            <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                              WA
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray200 bg-white">
                          {filteredOccupations.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50">
                              <td className="p-4 font-medium text-gray600 text-xs">
                                <div>{item.name}</div>
                                {item.lgSpecific && (
                                  <div className="text-[11px] font-semibold text-notes mt-2">
                                    {item.lgSpecific}
                                  </div>
                                )}
                              </td>
                              <td className="p-2 text-center border-l border-gray-200">
                                {renderBadge(item.aus)}
                              </td>
                              <td className="p-2 text-center border-l border-gray-200">
                                {renderBadge(item.nsw)}
                              </td>
                              <td className="p-2 text-center border-l border-gray-200">
                                {renderBadge(item.nt)}
                              </td>
                              <td className="p-2 text-center border-l border-gray-200">
                                {renderBadge(item.qld)}
                              </td>
                              <td className="p-2 text-center border-l border-gray-200">
                                {renderBadge(item.sa)}
                              </td>
                              <td className="p-2 text-center border-l border-gray-200">
                                {renderBadge(item.tas)}
                              </td>
                              <td className="p-2 text-center border-l border-gray-200">
                                {renderBadge(item.vic)}
                              </td>
                              <td className="p-2 text-center border-l border-gray-200">
                                {renderBadge(item.wa)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Source note at bottom */}
                    <div className="border-t border-gray200 pt-4">
                      <p className="text-xs text-[#416102] leading-relaxed">
                        Source: Local Government Skills Audit, 2026 · Jobs and
                        Skills Australia Occupational Shortage List (OSL). Open
                        a state or territory profile for the full shortage
                        matrix.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* SPECIFIC STATE DASHBOARD (NSW, TAS, QLD, NT, SA, VIC, WA) */
              <div key={selectedState} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
                {/* Left Zoomed Map Box */}
                <div className="lg:col-span-5 bg-[#F0F5DF] border border-[#252D02]/13 rounded-2xl p-6 relative flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-gray800 pt-1">
                      {currentState.name}
                    </h3>

                    {/* Top Right Australia Mini Map - Aligned to the far right */}
                    <div className="shrink-0 -mr-2 flex justify-end">
                      <AustraliaMiniMap
                        activeState={selectedState}
                        className="w-48 h-32 sm:w-52 sm:h-36"
                      />
                    </div>
                  </div>

                  {/* Center Zoomed Map with Overlaid Stat Cards (Reduced gap) */}
                  <div className="relative w-full h-72 sm:h-80 -mt-2 flex items-center justify-center p-2">
                    <div className="w-full h-full max-h-76 flex items-center justify-center">
                      <ZoomedStateMap
                        stateCode={selectedState}
                        className="w-full h-full max-h-72 object-contain"
                      />
                    </div>

                    {/* Stat Overlay Card 1 (Employees) */}
                    <div className="absolute top-8 left-3 sm:left-4 bg-white rounded-xl shadow-md p-3 min-w-28 sm:min-w-32 z-10">
                      <span className="text-2xl font-bold text-lg-dark block leading-tight">
                        <AnimatedCounter key={selectedState + "-map-emp"} target={Number(currentState.employees.replace(/,/g, "")) || 0} formatNumber={true} />
                      </span>
                      <span className="text-xs font-semibold text-gray600">
                        Employees
                      </span>
                      {/* Down caret in the center bottom */}
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 rounded-xs shadow-[2px_2px_3px_rgba(0,0,0,0.12)]" />
                    </div>

                    {/* Stat Overlay Card 2 (Local Councils) */}
                    <div className="absolute bottom-8 right-3 sm:right-4 bg-white rounded-xl shadow-md p-3 min-w-28 sm:min-w-32 z-10">
                      <span className="text-2xl font-bold text-lg-dark block leading-tight">
                        <AnimatedCounter key={selectedState + "-map-councils"} target={currentState.councils} />
                      </span>
                      <span className="text-xs font-semibold text-gray600">
                        Local councils
                      </span>
                      {/* Down caret in the center bottom */}
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 rounded-xs shadow-[2px_2px_3px_rgba(0,0,0,0.12)]" />
                    </div>
                  </div>

                  <p className="text-xs text-active leading-relaxed pt-2">
                    Zoomed in from the national map — switch jurisdictions with
                    the selector above, or return to National for the
                    Australia-wide dashboard.
                  </p>
                </div>

                {/* Right State Details Column */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Header Title + Badge */}
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray800">
                      {currentState.name}
                    </h2>
                    <span className="bg-lg-dark text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase">
                      LOCAL GOVERNMENT
                    </span>
                  </div>

                  {/* 2 Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray200 rounded-2xl p-5 space-y-2">
                      <span className="text-3xl font-bold text-lg-dark block">
                        <AnimatedCounter key={selectedState + "-card-emp"} target={Number(currentState.employees.replace(/,/g, "")) || 0} formatNumber={true} />
                      </span>
                      <p className="text-xs font-bold text-gray600">
                        Employees
                      </p>
                      <div className="border-t border-gray-100 my-2" />
                      <p className="text-xs text-active">
                        Source: ABS, Public sector employment and earnings,
                        2025, Table 2
                      </p>
                    </div>

                    <div className="bg-white border border-gray200 rounded-2xl p-5 space-y-2">
                      <span className="text-3xl font-bold text-lg-dark block">
                        <AnimatedCounter key={selectedState + "-card-councils"} target={currentState.councils} />
                      </span>
                      <p className="text-xs font-bold text-gray600">
                        Local councils
                      </p>
                      <div className="border-t border-gray-100 my-2" />
                      <p className="text-xs text-active">
                        Source: state and territory Local Government
                        associations
                      </p>
                    </div>
                  </div>

                  {/* Section 1: Skills Audit List */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-[#9CAA54] text-white font-bold text-xl flex items-center justify-center shrink-0">
                        1
                      </span>
                      <h4 className="font-bold text-xl text-[#9CAA54]">
                        Skills Audit List
                      </h4>
                    </div>

                    <div className="bg-[#EBF1E4] border border-lg-dark border-l-8 border-l-lg-dark rounded-2xl p-5 space-y-5">
                      <span className="text-xl font-bold text-lg-dark uppercase block">
                        TOP 5 OCCUPATIONAL SHORTAGES
                      </span>

                      <div className="flex flex-wrap gap-2">
                        {currentState.topShortages.map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-lg-dark text-white text-[11px] font-semibold px-4 py-2 rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-active pt-4 mt-5 border-t border-[#D5D7DA]">
                        Source : Local Government Skills Audit consultations,
                        2026.
                      </p>
                    </div>
                  </div>

                  {/* Section 2: OSL Validation Table */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-[#9CAA54] text-white font-bold text-xl flex items-center justify-center shrink-0">
                        2
                      </span>
                      <h4 className="font-bold text-xl text-[#9CAA54]">
                        Validation against the Jobs and Skills Australia
                        Occupation Shortage List (OSL)
                      </h4>
                    </div>

                    <div className="bg-white border border-gray200 rounded-2xl p-6 space-y-6">
                      {/* Top Header / Legend Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <span className="uppercase text-notes font-semibold text-sm">
                          NATIONAL SHORTAGES — {currentState.code}
                        </span>
                        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#252D02]">
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-xs bg-[#B2DB79] inline-block shrink-0" />
                            <span>
                              <strong className="font-bold">NS</strong> = No
                              Shortage
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-xs bg-[#F4F26E] inline-block shrink-0" />
                            <span>
                              <strong className="font-bold">R</strong> =
                              Regional Shortage
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-xs bg-[#AF3800] inline-block shrink-0" />
                            <span>
                              <strong className="font-bold">S</strong> =
                              Shortage
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Table */}
                      <div className="overflow-x-auto border border-gray200 rounded-xl">
                        <table className="w-full text-left text-sm border-collapse">
                          <thead>
                            <tr className="bg-[#F5F5F5] text-[#252D02] font-bold">
                              <th className="p-4 font-bold leading-snug">
                                Occupation identified in shortage in{" "}
                                {currentState.code} through Skills Audit
                              </th>
                              <th className="p-4 font-bold leading-snug border-l border-gray200 w-[200px] min-w-[200px] max-w-[200px]">
                                OSL — {currentState.code} specific shortage
                              </th>
                              <th className="p-4 font-bold leading-snug border-l border-gray200 w-[200px] min-w-[200px] max-w-[200px]">
                                OSL — Australia wide shortage
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray200">
                            {currentState.oslTable.map((row, idx) => (
                              <tr key={idx} className="hover:bg-gray-50/50">
                                <td className="p-4 text-xs font-medium text-gray600 bg-white">
                                  {row.occupation}
                                </td>
                                <td className="p-0 border-l border-gray200 w-[200px] min-w-[200px] max-w-[200px]">
                                  <div
                                    className={`w-full h-full min-h-12 py-4 font-bold text-sm flex items-center justify-center ${getCellRatingStyle(
                                      row.stateShortage,
                                    )}`}
                                  >
                                    {row.stateShortage}
                                  </div>
                                </td>
                                <td className="p-0 border-l border-gray200 w-[200px] min-w-[200px] max-w-[200px]">
                                  <div
                                    className={`w-full h-full min-h-12 py-4 font-bold text-xs sm:text-sm flex items-center justify-center ${getCellRatingStyle(
                                      row.nationalShortage,
                                    )}`}
                                  >
                                    {row.nationalShortage}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Footer Note */}
                      <p className="text-xs text-active font-normal leading-relaxed">
                        Source: Local Government Skills Audit, 2026 · JSA
                        Occupational Shortage List (OSL).
                      </p>
                    </div>
                  </div>

                  {/* Section 3: Relevant LG Specific Occupations List */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-[#9CAA54] text-white font-bold text-xl flex items-center justify-center shrink-0">
                        3
                      </span>
                      <h4 className="font-bold text-xl text-[#9CAA54]">
                        Relevant Local Government-specific Occupations List
                      </h4>
                    </div>

                    <div className="bg-[#EBF1E4] border border-l-8 border-l-lg-dark rounded-2xl p-5 space-y-3.5">
                      <span className="text-sm font-bold text-notes uppercase block">
                        LOCAL GOVERNMENT SPECIFIC OCCUPATIONAL SHORTAGES
                      </span>
                      <p className="text-sm text-gray600 font-normal">
                        Occupations in shortage specific to Local Government
                        when compared with the National Occupation Shortage
                        List:
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {currentState.lgSpecificShortages.map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-lg-dark text-white text-xs font-medium px-4 py-2 rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── MODE B: COMPARE ALL STATES VIEW ── */}
        {viewMode === "compare" && (
          <div key="compare-mode" className="animate-fade-in flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column: National Green Card */}
            <div className="w-full lg:w-[330px] lg:min-w-[330px] lg:max-w-[330px] bg-lg-dark text-white rounded-2xl p-6 flex flex-col justify-between space-y-6 shrink-0">
              <div className="space-y-4">
                <span className="text-sm font-semibold text-white/90 block">
                  National
                </span>

                {/* People icon below National title */}
                <div className="w-14 h-14 sm:w-16 sm:h-16">
                  <img
                    src="/images/reports/national-workforce-icon.png"
                    alt="National Workforce Icon"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="pt-2 space-y-1">
                  <h2 className="text-4xl font-bold tracking-tight text-white">
                    <AnimatedCounter target={218000} formatNumber={true} />
                  </h2>
                  <p className="text-xs text-white/80">
                    employees as of June 2025
                  </p>
                </div>
              </div>

              {/* Dual Percentage Items Container with #F0F5DF bg */}
              <div className="bg-[#F0F5DF] rounded-xl p-3 flex items-center justify-around gap-2">
                {/* Female Gauge */}
                <div className="flex flex-col items-center">
                  <div className="relative w-28 h-28 sm:w-30 sm:h-30 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        className="text-[#9CAA54]/30"
                        strokeWidth="3.8"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#9CAA54] transition-all duration-1000 ease-out"
                        strokeDasharray={
                          compareChartsLoaded ? "49.1, 100" : "0, 100"
                        }
                        strokeWidth="3.8"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg sm:text-xl font-bold text-[#9CAA54] leading-tight">
                        <AnimatedCounter target={49.1} decimals={1} suffix="%" />
                      </span>
                      <span className="text-xs text-[#33380F] font-medium">
                        Female
                      </span>
                    </div>
                  </div>
                </div>

                {/* Male Gauge */}
                <div className="flex flex-col items-center">
                  <div className="relative w-28 h-28 sm:w-30 sm:h-30 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        className="text-[#0C582B]/30"
                        strokeWidth="3.8"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#0C582B] transition-all duration-1000 ease-out"
                        strokeDasharray={
                          compareChartsLoaded ? "50.9, 100" : "0, 100"
                        }
                        strokeWidth="3.8"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg sm:text-xl font-bold text-[#0C582B] leading-tight">
                        <AnimatedCounter target={50.9} decimals={1} suffix="%" />
                      </span>
                      <span className="text-xs text-[#33380F] font-medium">
                        Male
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* First Nations Pill */}
              <div className="bg-[#9CAA54] rounded-full py-2 px-4">
                <span className="text-xs font-bold text-white">
                  <AnimatedCounter target={8.2} decimals={1} suffix="% identify as First Nations" />
                </span>
              </div>
            </div>

            {/* Right Column: Charts and Table */}
            <div className="flex-1 w-full space-y-8 min-w-0">
              {/* Right 2 Bar Chart Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Chart 1: Employees by state */}
                <div className="bg-white border border-gray200 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs text-notes uppercase block">
                      SOURCE: ABS, PUBLIC SECTOR EMPLOYMENT AND EARNINGS, 2025,
                      TABLE 2
                    </span>
                    <h3 className="font-bold text-base text-gray800">
                      Employees by state and territory
                    </h3>

                    <div className="space-y-4 pt-2">
                      {[
                        { code: "NSW", val: "65,200", pct: "90%" },
                        { code: "VIC", val: "56,100", pct: "78%" },
                        { code: "QLD", val: "48,800", pct: "68%" },
                        { code: "WA", val: "26,500", pct: "37%" },
                        { code: "SA", val: "11,700", pct: "16%" },
                        { code: "TAS", val: "4,800", pct: "8%" },
                        { code: "NT", val: "5,000", pct: "7%" },
                      ].map((item, idx) => (
                        <div
                          key={item.code}
                          className="flex items-center gap-3 text-xs"
                        >
                          <span className="w-8 font-bold text-gray-800">
                            {item.code}
                          </span>
                          <div className="flex-1 bg-[#F2F3EC] h-4 rounded-md rounded-l-none overflow-hidden">
                            <div
                              className="bg-[#9CAA54] h-full rounded-md rounded-l-none transition-all duration-1000 ease-out"
                              style={{
                                width: compareChartsLoaded ? item.pct : "0%",
                                transitionDelay: `${idx * 80}ms`,
                              }}
                            />
                          </div>
                          <span className="w-12 text-right font-semibold text-gray-700">
                            <AnimatedCounter target={Number(item.val.replace(/,/g, "")) || 0} formatNumber={true} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-active pt-3">
                    Figure: Local Government employees by state and territory,
                    June 2025. Select any bar to open that state's profile.
                  </p>
                </div>

                {/* Chart 2: Councils by state */}
                <div className="bg-white border border-gray200 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs text-notes uppercase block">
                      SOURCE: STATE AND TERRITORY LOCAL GOVERNMENT ASSOCIATIONS
                    </span>
                    <h3 className="font-bold text-base text-gray800">
                      Councils by state and territory
                    </h3>

                    <div className="space-y-4 pt-2">
                      {[
                        { code: "WA", val: "139", pct: "95%" },
                        { code: "NSW", val: "128", pct: "88%" },
                        { code: "VIC", val: "79", pct: "55%" },
                        { code: "QLD", val: "77", pct: "53%" },
                        { code: "SA", val: "68", pct: "46%" },
                        { code: "TAS", val: "29", pct: "20%" },
                        { code: "NT", val: "18", pct: "12%" },
                      ].map((item, idx) => (
                        <div
                          key={item.code}
                          className="flex items-center gap-3 text-xs"
                        >
                          <span className="w-8 font-bold text-gray-800">
                            {item.code}
                          </span>
                          <div className="flex-1 bg-[#F2F3EC] h-4 rounded-md rounded-l-none overflow-hidden">
                            <div
                              className="bg-[#0C582B] h-full rounded-md rounded-l-none transition-all duration-1000 ease-out"
                              style={{
                                width: compareChartsLoaded ? item.pct : "0%",
                                transitionDelay: `${idx * 80}ms`,
                              }}
                            />
                          </div>
                          <span className="w-8 text-right font-semibold text-gray-700">
                            <AnimatedCounter target={Number(item.val) || 0} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-active pt-3">
                    Figure: Local councils by state and territory (537
                    nationally).
                  </p>
                </div>
              </div>

              {/* Comprehensive Matrix Table */}
              <div className="overflow-auto h-[500px] border border-gray200 rounded-xl relative">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead className="sticky top-0 z-10 bg-[#F5F5F5] shadow-xs">
                    <tr className="bg-[#F5F5F5] text-[#252D02] font-bold text-xs uppercase">
                      <th className="p-4 font-bold text-left tracking-wider bg-[#F5F5F5]">
                        OCCUPATION
                      </th>
                      <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                        AUS
                      </th>
                      <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                        NSW
                      </th>
                      <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                        NT
                      </th>
                      <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                        QLD
                      </th>
                      <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                        SA
                      </th>
                      <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                        TAS
                      </th>
                      <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                        VIC
                      </th>
                      <th className="p-3 text-center border-l border-gray-200 w-16 bg-[#F5F5F5]">
                        WA
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray200 bg-white">
                    {COMPARE_OCCUPATIONS.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="p-4 font-medium text-gray600 text-xs">
                          {item.name}
                        </td>
                        <td className="p-2 text-center border-l border-gray-200">
                          {renderCellBadge(item.aus)}
                        </td>
                        <td className="p-2 text-center border-l border-gray-200">
                          {renderCellBadge(item.nsw)}
                        </td>
                        <td className="p-2 text-center border-l border-gray-200">
                          {renderCellBadge(item.nt)}
                        </td>
                        <td className="p-2 text-center border-l border-gray-200">
                          {renderCellBadge(item.qld)}
                        </td>
                        <td className="p-2 text-center border-l border-gray-200">
                          {renderCellBadge(item.sa)}
                        </td>
                        <td className="p-2 text-center border-l border-gray-200">
                          {renderCellBadge(item.tas)}
                        </td>
                        <td className="p-2 text-center border-l border-gray-200">
                          {renderCellBadge(item.vic)}
                        </td>
                        <td className="p-2 text-center border-l border-gray-200">
                          {renderCellBadge(item.wa)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
