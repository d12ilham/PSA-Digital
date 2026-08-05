"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportPaginationNav from "@/components/layout/ReportPaginationNav";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import {
  Briefcase,
  Clock,
  Cpu,
  Crosshair,
  Globe2,
  HeartHandshake,
  Search,
  Settings,
  ShieldCheck,
  Users2,
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

const DRIVERS = [
  {
    id: 1,
    number: "DRIVER 1",
    shortTitle: "Resilience of organisations to respond to strategic shocks",
    shortDesc: "Compounding crises have exposed structural vulnerabilities...",
    fullTitle:
      "Driver 1 — Resilience of organisations to respond to strategic shocks",
    fullDesc:
      "Organisational resilience is emerging as a critical driver of change across Australia's Public Safety and Government industry-sectors, particularly as agencies confront increasingly frequent and complex strategic shocks. Recent experience with compounding crises (such as increasingly intense bushfires, major cyberattacks and intensifying geopolitical tensions) have exposed structural vulnerabilities and highlighted the need for more adaptive, anticipatory and integrated capabilities. Investment will be required to deepen organisational capabilities that support systemwide preparedness, robust governance and the ability to maintain critical functions under stress.",
    sources:
      "Sources (4): Australian Government Department of Home Affairs, Organisational Resilience: Good Practice Guide, Australian Government Department of Home Affairs, 2024, accessed 25 February 2026.",
  },
  {
    id: 2,
    number: "DRIVER 2",
    shortTitle: "Challenges to workforce productivity",
    shortDesc: "Australia's slowest productivity growth in 60 years...",
    fullTitle: "Driver 2 — Challenges to workforce productivity",
    fullDesc:
      "Australia is experiencing its slowest productivity growth in 60 years. Productivity challenges across Public Safety and Government impact the delivery of essential services and community outcomes. Enhancing workforce productivity requires targeted investment in skills, process optimization, and supportive organizational structures.",
    sources:
      "Sources (5, 6): Productivity Commission, Five pillars of productivity inquiries – final reports, Productivity Commission, 2025, accessed 13 February 2026.",
  },
  {
    id: 3,
    number: "DRIVER 3",
    shortTitle:
      "Emergence of Artificial Intelligence (AI), greater automation and broader digital transformation",
    shortDesc: "Capability uplift — and a growing security risk...",
    fullTitle:
      "Driver 3 — Emergence of Artificial Intelligence (AI), greater automation and broader digital transformation",
    fullDesc:
      "The rapid evolution of artificial intelligence and automation technologies presents both unprecedented opportunities for capability uplift and growing security and ethical risks. Public Safety and Government organizations must build digital literacy and adapt workforce capabilities to leverage AI effectively while maintaining data integrity and public trust.",
    sources:
      "Sources (7): Australian Government Department of Finance, National framework for the assurance of artificial intelligence in government, 2024, accessed 25 February 2026; Australian Government Digital Transformation Agency, Policy for the responsible use of AI in government, 2025.",
  },
  {
    id: 4,
    number: "DRIVER 4",
    shortTitle: "Workforce inclusivity",
    shortDesc: "Recruiting and retaining diverse cohorts...",
    fullTitle: "Driver 4 — Workforce inclusivity",
    fullDesc:
      "Recruiting and retaining diverse cohorts is essential to building resilient, representative workforces across Local Government and Public Safety. Promoting inclusive workplaces improves retention, innovation, and service delivery for diverse communities.",
    sources:
      "Sources (8): Australian Security Intelligence Organisation (ASIO), Director-General's Annual Threat Assessment 2025, ASIO, 2025, accessed 25 February 2026.",
  },
];

const MEGATRENDS = [
  {
    id: "pathways",
    icon: Briefcase,
    title: "Limitations in career pathways",
    desc: "Career pathway opportunities for young professionals require further promotion, as potential employees are often unaware of Local Government career opportunities and pathways.",
  },
  {
    id: "climate",
    icon: Globe2,
    title: "Climate change",
    desc: "Increasing severity of natural disasters and extreme weather events demands adaptation in emergency response, infrastructure maintenance, and local environmental management.",
  },
  {
    id: "labour",
    icon: Settings,
    title: "Competition for labour",
    desc: "Tight labor markets across regional and metropolitan areas create heightened competition for specialized technical, engineering, and administrative roles.",
  },
  {
    id: "duties",
    icon: Crosshair,
    title: "Expansion of core duties",
    desc: "Local councils face expanding expectations to deliver broader social, environmental, and community services without proportional resource increases.",
  },
  {
    id: "diversity",
    icon: HeartHandshake,
    title: "Diversity and inclusion",
    desc: "Emphasizing inclusive recruitment and workplace practices to reflect community diversity and enhance organizational performance.",
  },
  {
    id: "demographics",
    icon: Users2,
    title: "Demographic shifts",
    desc: "Aging populations in regional areas alter service demand while impacting local council workforce availability and succession planning.",
  },
  {
    id: "tech",
    icon: Cpu,
    title: "Technological development",
    desc: "Adopting smart infrastructure, digital service platforms, and automated workflow tools to improve municipal operational efficiency.",
  },
  {
    id: "recruitment",
    icon: Search,
    title: "Recruitment and retention",
    desc: "Addressing persistent geographical and competitive hurdles to recruit and retain skilled personnel in key council occupations.",
  },
  {
    id: "trust",
    icon: ShieldCheck,
    title: "Public trust and perceptions",
    desc: "Building community trust through transparent governance, effective communication, and responsive local government service delivery.",
  },
];

export default function DriversOfChangeView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const router = useRouter();

  const [activeDriverId, setActiveDriverId] = useState<number | null>(null);
  const [activeMegatrendId, setActiveMegatrendId] = useState<string | null>(
    "pathways",
  );

  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window.location.hash === "#nine-megatrends" ||
        window.location.hash === "#megatrends")
    ) {
      const el = document.getElementById("nine-megatrends");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  const activeDriver = DRIVERS.find((d) => d.id === activeDriverId);
  const activeMegatrend = MEGATRENDS.find((m) => m.id === activeMegatrendId);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between selection:bg-accent/30 antialiased">
      {/* ── TOP HEADER NAVBAR ── */}
      <ReportHeader
        slug={slug}
        report={report}
        currentPage="drivers_of_change"
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Sub-Header Navigation Buttons */}
        <ReportNavButtons
          prev={{
            label: "Methodology",
            href: `/reports/${slug}/methodology`,
          }}
          next={{
            label: "Industry-Sector Overview",
            href: `/reports/${slug}/industry_overview`,
          }}
        />

        {/* Hero Card */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray800">
              Drivers of Change
            </h1>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
              In 2024, Public Skills Australia identified nine megatrends
              impacting the Public Safety and Government industry-sectors. These
              megatrends were further considered in the development of the 2025{" "}
              <span className="font-semibold text-[#728C28]">
                Workforce Insights Reports
              </span>
              .
            </p>
            <p className="text-xs sm:text-sm text-gray600 leading-relaxed font-normal">
              While these megatrends will continue to have longer term
              implications for workforce planning and development across the
              Public Safety and Government industry-sectors, the 2026{" "}
              <span className="font-semibold text-[#728C28]">
                Workforce Insights Reports
              </span>{" "}
              have built on these and analysed four key drivers of change that
              cut across most megatrends. This is important as these drivers of
              change will likely impact the Public Safety and Government
              industry-sectors in the short to medium term.
            </p>
          </div>

          {/* Right Diagram Image */}
          <div className="lg:col-span-4 flex justify-end p-2">
            <img
              src="/images/reports/drivers-of-change-diagram.png"
              alt="Drivers of Change Diagram"
              className="h-auto max-h-48 object-contain"
            />
          </div>
        </div>

        {/* ── SECTION 2: FOUR KEY DRIVERS ── */}
        <div className="space-y-6">
          <div className="border-b border-gray200 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray800">
              Four Key Drivers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DRIVERS.map((driver) => {
              const isActive = activeDriverId === driver.id;

              return (
                <div
                  key={driver.id}
                  onClick={() => setActiveDriverId(isActive ? null : driver.id)}
                  className={`rounded-2xl border p-6 space-y-4 flex flex-col justify-between cursor-pointer transition-all ${
                    isActive
                      ? "bg-[#EBF1E4] border-active border-t-8"
                      : "bg-white border-gray200 border-t-8 border-t-[#8AC900] hover:border-[#728C28]"
                  }`}
                >
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-notes uppercase block">
                      {driver.number}
                    </span>
                    <h3 className="font-bold text-base text-gray800 leading-snug">
                      {driver.shortTitle}
                    </h3>
                    <p className="text-xs text-gray600 leading-relaxed">
                      {driver.shortDesc}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDriverId(isActive ? null : driver.id);
                      }}
                      className="bg-[#8AC900] hover:bg-[#77A60D] text-[#1B240E] font-bold text-xs px-4 py-1.5 rounded-full cursor-pointer transition-colors"
                    >
                      {isActive ? "Close ▴" : "Open ▾"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Driver Detail Panel */}
          {activeDriver && (
            <div className="bg-[#EBF1E4] border border-active border-l-8 rounded-2xl p-6 space-y-4 animate-fade-in">
              <span className="bg-active text-white font-bold text-xs px-5 py-1.5 rounded-full uppercase inline-block">
                NOW PRESENTING - {activeDriver.number}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-gray800">
                {activeDriver.fullTitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray600 leading-relaxed">
                {activeDriver.fullDesc}
              </p>
              <p className="text-xs text-active pt-3 border-t border-active/20">
                {activeDriver.sources}
              </p>
            </div>
          )}
        </div>

        {/* ── SECTION 3: NINE MEGATRENDS ── */}
        <div id="nine-megatrends" className="space-y-6">
          <div className="border-b border-gray200 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray800">
              Nine Megatrends
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            {MEGATRENDS.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeMegatrendId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() =>
                    setActiveMegatrendId(isActive ? null : item.id)
                  }
                  className={`rounded-2xl border p-4 flex flex-col items-center text-center space-y-3 cursor-pointer transition-all ${
                    isActive
                      ? "bg-[#EBF1E4] border-active"
                      : "bg-white border-gray200 hover:border-[#728C28]"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#F0F5DF] text-[#8AC900] flex items-center justify-center shrink-0">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <p
                    className={`text-xs font-semibold leading-tight ${
                      isActive ? "text-active" : "text-gray600"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Megatrend Detail Panel */}
          {activeMegatrend && (
            <div className="bg-[#EBF1E4] border border-active border-l-8 rounded-2xl p-6 space-y-2 animate-fade-in">
              <h3 className="text-lg sm:text-xl font-bold text-gray800">
                {activeMegatrend.title}
              </h3>
              <p className="text-sm text-gray600 leading-relaxed">
                {activeMegatrend.desc}
              </p>
            </div>
          )}

          <p className="text-sm text-gray800 leading-relaxed pt-2">
            These megatrends were identified in previous{" "}
            <span className="font-semibold text-lg-dark">
              Workforce Insights Reports
            </span>{" "}
            and will continue to have longer term implications for workforce
            planning and development across the Public Safety and Government
            industry-sectors.
          </p>
        </div>

        {/* ── SECTION 4: SOURCES CONTAINER ── */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-xl text-gray800">Sources</h3>

          <div className="space-y-3 text-xs text-gray600 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-sm font-bold shrink-0">
                4
              </span>
              <p>
                Australian Government Department of Home Affairs,{" "}
                <span className="italic">
                  Organisational Resilience: Good Practice Guide
                </span>
                , Australian Government Department of Home Affairs, 2024,
                accessed 25 February 2026.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-sm font-bold shrink-0">
                5
              </span>
              <p>
                Productivity Commission,{" "}
                <span className="italic">
                  Five pillars of productivity inquiries – final reports
                </span>
                , Productivity Commission, 2025, accessed 13 February 2026.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-sm font-bold shrink-0">
                6
              </span>
              <p>
                Productivity Commission,{" "}
                <span className="italic">
                  Five pillars of productivity inquiries
                </span>
                , Productivity Commission, 2025, accessed 25 February 2026.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-sm font-bold shrink-0">
                7
              </span>
              <p>
                Australian Government Department of Finance,{" "}
                <span className="italic">
                  National framework for the assurance of artificial
                  intelligence in government
                </span>
                , Australian Government Department of Finance, 2024, accessed 25
                February 2026; Australian Government Digital Transformation
                Agency,{" "}
                <span className="italic">
                  Policy for the responsible use of AI in government
                </span>
                , Australian Government Digital Transformation Agency, 2025,
                accessed 25 February 2026.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-sm font-bold shrink-0">
                8
              </span>
              <p>
                Australian Security Intelligence Organisation (ASIO),{" "}
                <span className="italic">
                  Director-General's Annual Threat Assessment 2025
                </span>
                , ASIO, 2025, accessed 25 February 2026.
              </p>
            </div>
          </div>

          {/* ── PAGINATION NAV ── */}
          <ReportPaginationNav slug={slug} currentPage="drivers_of_change" />
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
