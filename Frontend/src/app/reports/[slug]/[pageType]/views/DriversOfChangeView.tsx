"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
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
      "In its Five Pillars of Productivity inquiry reports, the Productivity Commission observed that productivity growth has been slowing globally since the mid-2000s, with Australia experiencing the slowest productivity growth in 60 years. The Productivity Commission identified long-standing pressures that have contributed to the productivity slowdown, including market stagnation, a persistently tight labour market and slower uptake of technological innovations. These factors are further exacerbated by emerging challenges linked to the megatrends including an ageing population, technological development, climate change and competition for labour.",
    sources:
      "Sources (5, 6): Productivity Commission, Five pillars of productivity inquiries – final reports, Productivity Commission, 2025, accessed 13 February 2026 · Productivity Commission, Five pillars of productivity inquiries, Productivity Commission, 2025, accessed 25 February 2026.",
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
      "AI, automation and accelerated digital transformation are powerful drivers of organisational and systemlevel change in the short term. This is reinforced by a push from the Federal Government for greater adoption of AI and digital initiatives across federal agencies. These initiatives signal a shift toward embedding AI into core service delivery, regulatory functions and operational decision making. AI, automation and digital transformation represent an opportunity for significant capability uplift through AI-enabled analytics, automation of high-volume processes and advanced digital platforms that enhance situational awareness, threat detection and emergency response coordination. Conversely, they represent a growing security risk as they are also being leveraged by threat actors to disrupt government services, facilitate foreign interference, enable disinformation, promote false narratives through deepfakes and erode trust in government institutions.",
    sources:
      "Sources (7, 8): Australian Government Department of Finance, National framework for the assurance of artificial intelligence in government, 2024, accessed 25 February 2026 · Australian Government Digital Transformation Agency, Policy for the responsible use of AI in government, 2025, accessed 25 February 2026 · Australian Security Intelligence Organisation (ASIO), Director-General's Annual Threat Assessment 2025, ASIO, 2025, accessed 25 February 2026.",
  },
  {
    id: 4,
    number: "DRIVER 4",
    shortTitle: "Workforce inclusivity",
    shortDesc: "Recruiting and retaining diverse cohorts...",
    fullTitle: "Driver 4 — Workforce inclusivity",
    fullDesc:
      "Workforce inclusivity has been a key focus across the labour market. In the Public Safety and Government industry-sectors this is likely to translate into a continued focus on recruiting, retaining and developing employees from diverse cultural, linguistic, gender, disability and neurodivergent backgrounds. As organisations seek to increase workforce participation from these cohorts, they will be required to adapt and change legacy systems and processes to respond to the needs of the modern workforce.",
    sources: "",
  },
];

const MEGATRENDS = [
  {
    id: "pathways",
    icon: "/images/reports/drivers-of-change/Limitations.svg",
    title: "Limitations in career pathways",
    desc: "Career pathway opportunities for young professionals require further promotion, as potential employees are often unaware of Local Government career opportunities and pathways.",
  },
  {
    id: "climate",
    icon: "/images/reports/drivers-of-change/Climate.svg",
    title: "Climate change",
    desc: "Climate change impacts many functions of Local Government, such as emergency management and environmental planning.",
  },
  {
    id: "labour",
    icon: "/images/reports/drivers-of-change/Competition.svg",
    title: "Competition for labour",
    desc: "Local Government is competing for labour with the private sector and other parts of the public sector. There is also competition for labour between Local Government organisations.",
  },
  {
    id: "duties",
    icon: "/images/reports/drivers-of-change/Expansion.svg",
    title: "Expansion of core duties",
    desc: "Local Government employees are increasingly taking on multiple roles to meet community needs in the Local Government industry sector.",
  },
  {
    id: "diversity",
    icon: "/images/reports/drivers-of-change/Diversity.svg",
    title: "Diversity and inclusion",
    desc: "Equitable gender composition and meaningful participation of a diverse workforce is an ongoing goal for Local Government workforces, particularly in leadership roles.",
  },
  {
    id: "demographics",
    icon: "/images/reports/drivers-of-change/Demographic.svg",
    title: "Demographic shifts",
    desc: "Ageing workforces can impact the transfer of institutional knowledge and further create skills gaps in Local Government workforces.",
  },
  {
    id: "tech",
    icon: "/images/reports/drivers-of-change/Technological.svg",
    title: "Technological development",
    desc: "The implementation of new technology in the Local Government workforce can be impacted by resource constraints and the availability of training.",
  },
  {
    id: "recruitment",
    icon: "/images/reports/drivers-of-change/Recruitment.svg",
    title: "Recruitment and retention",
    desc: "There are several barriers to the attraction and retention of Local Government workforces in remote, regional and rural locations.",
  },
  {
    id: "trust",
    icon: "/images/reports/drivers-of-change/Public.svg",
    title: "Public trust and perceptions",
    desc: "Local Governments are required to balance resourcing constraints with meeting community needs, which can impact public trust and perception.",
  },
];

export default function DriversOfChangeView({
  slug,
  report,
}: {
  slug: string;
  report: any;
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
        <ReportNavButtons slug={slug} currentPage="drivers_of_change" />

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
                      ? "bg-[#EBF1E4] border-active border-2 border-t-8"
                      : "bg-white border-gray200 border-t-8 border-t-[#8AC900] hover:border-2 hover:border-[#728C28]"
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
            <div className="bg-[#EBF1E4] border-2 border-active border-l-8 rounded-2xl p-6 animate-fade-in">
              <div className="space-y-4">
                <span className="bg-active text-white font-bold text-xs px-5 py-1.5 rounded-full uppercase inline-block">
                  NOW PRESENTING - {activeDriver.number}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-gray800 w-2/3">
                  {activeDriver.fullTitle}
                </h3>
                <p className="text-xs sm:text-sm text-gray600 leading-relaxed w-2/3">
                  {activeDriver.fullDesc}
                </p>
                {activeDriver.sources && (
                  <>
                    <p className="text-xs text-active border-t border-gray200"></p>
                    <p className="text-xs text-active w-2/3 leading-relaxed">
                      {activeDriver.sources}
                    </p>
                  </>
                )}
              </div>
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
            {MEGATRENDS.map((item) => {
              const isActive = activeMegatrendId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() =>
                    setActiveMegatrendId(isActive ? null : item.id)
                  }
                  className={`rounded-2xl border p-4 flex flex-col items-center text-center space-y-4 cursor-pointer transition-all ${
                    isActive
                      ? "bg-[#EBF1E4] border-active border-2"
                      : "bg-white border-gray200 hover:border-2 hover:border-[#728C28]"
                  }`}
                >
                  <img
                    src={
                      isActive
                        ? item.icon.replace(".svg", "-active.svg")
                        : item.icon
                    }
                    alt={item.title}
                    className="w-17 h-17 shrink-0 object-contain"
                  />
                  <p
                    className={`text-xs font-semibold leading-normal ${
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
            <div className="bg-[#EBF1E4] border-2 border-active border-l-8 rounded-2xl p-6 space-y-2 animate-fade-in">
              <h3 className="text-xl font-bold text-gray800">
                {activeMegatrend.title}
              </h3>
              <p className="text-sm text-gray600 leading-relaxed w-2/3">
                {activeMegatrend.desc}
              </p>
            </div>
          )}

          <p className="text-sm text-gray800 leading-relaxed pt-2 w-2/3">
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

          <div className="space-y-3 text-xs text-gray600 leading-relaxed w-2/3">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-sm font-bold shrink-0">
                4
              </span>
              <p>
                Australian Government Department of Home Affairs, Organisational
                Resilience: Good Practice Guide , Australian Government
                Department of Home Affairs, 2024, accessed 25 February 2026.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-sm font-bold shrink-0">
                5
              </span>
              <p>
                Productivity Commission, Five pillars of productivity inquiries
                – final reports , Productivity Commission, 2025, accessed 13
                February 2026.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-sm font-bold shrink-0">
                6
              </span>
              <p>
                Productivity Commission, Five pillars of productivity inquiries
                , Productivity Commission, 2025, accessed 25 February 2026.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-sm font-bold shrink-0">
                7
              </span>
              <p>
                Australian Government Department of Finance, National framework
                for the assurance of artificial intelligence in government ,
                Australian Government Department of Finance, 2024, accessed 25
                February 2026; Australian Government Digital Transformation
                Agency, Policy for the responsible use of AI in government ,
                Australian Government Digital Transformation Agency, 2025,
                accessed 25 February 2026.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-notes text-white flex items-center justify-center text-sm font-bold shrink-0">
                8
              </span>
              <p>
                Australian Security Intelligence Organisation (ASIO),
                Director-General's Annual Threat Assessment 2025 , ASIO, 2025,
                accessed 25 February 2026.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
