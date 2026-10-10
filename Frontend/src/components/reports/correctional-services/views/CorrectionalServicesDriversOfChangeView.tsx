"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type CorrectionalServicesReport = {
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: {
    label: string;
  };
  industry?: {
    slug?: string;
    name?: string;
  };
};

const drivers = [
  {
    id: 1,
    number: "DRIVER 1",
    shortTitle: "Resilience of organisations to respond to strategic shocks",
    shortDesc: "Compounding crises have exposed structural vulnerabilities.",
    fullTitle:
      "Driver 1 — Resilience of organisations to respond to strategic shocks",
    fullDesc:
      "Organisational resilience is emerging as a critical driver of change across Australia's Public Safety and Government industry-sectors, particularly as agencies confront increasingly frequent and complex strategic shocks. Recent experience with compounding crises (such as increasingly intense bushfires, major cyber attacks and intensifying geopolitical tensions) have exposed structural vulnerabilities and highlighted the need for more adaptive, anticipatory and integrated capabilities. Investment will be required to deepen organisational capabilities that supports system-wide preparedness, robust governance and the ability to maintain critical functions under stress.",
    sources:
      "Sources (3): Australian Government Department of Home Affairs, Organisational Resilience: Good Practice Guide, Australian Government Department of Home Affairs, 2024, accessed 25 February 2026.",
  },
  {
    id: 2,
    number: "DRIVER 2",
    shortTitle: "Challenges to workforce productivity",
    shortDesc: "Australia is experiencing the slowest productivity growth in 60 years.",
    fullTitle: "Driver 2 — Challenges to workforce productivity",
    fullDesc:
      "In its Five Pillars of Productivity enquiry reports, the Productivity Commission observed that productivity growth has been slowing globally since the mid-2000s, with Australia experiencing the slowest productivity growth in 60 years. The Productivity Commission identified long-standing pressures that have contributed to the productivity slowdown, including market stagnation, a persistently tight labour market and slower uptake of technological innovations. These factors are further exacerbated by emerging challenges linked to the megatrends including an ageing population, technological development, climate change and competition for labour.",
    sources:
      "Sources (4, 5): Productivity Commission, Five pillars of productivity inquiries – final reports, Productivity Commission, 2025, accessed 13 February 2026; Productivity Commission, Five pillars of productivity inquiries, Productivity Commission, 2025, accessed 25 February 2026.",
  },
  {
    id: 3,
    number: "DRIVER 3",
    shortTitle:
      "Emergence of AI, greater automation and broader digital transformation",
    shortDesc: "Digital transformation represents both capability uplift and security risk.",
    fullTitle:
      "Driver 3 — Emergence of AI, greater automation and broader digital transformation",
    fullDesc:
      "AI, automation and accelerated digital transformation are powerful drivers of organisational and system-level change in the short term. This is reinforced by a push from the Federal Government for greater adoption of AI and digital initiatives across federal agencies. These initiatives signal a shift toward embedding AI into core service delivery, regulatory functions and operational decision making. AI, automation and digital transformation represent an opportunity for significant capability uplift through AI-enabled analytics, automation of high-volume processes and advanced digital platforms. Conversely, they represent a growing security risk as they are also being leveraged by threat actors to disrupt government services, facilitate foreign interference, enable disinformation, promote false narratives through deepfakes and erode trust in government institutions.",
    sources:
      "Sources (6, 7): Australian Government Digital Transformation Agency, Policy for the responsible use of AI in government, 2025; Australian Government Department of Finance, National framework for the assurance of artificial intelligence in government, 2024; Australian Security Intelligence Organisation (ASIO), Director-General's Annual Threat Assessment 2025.",
  },
  {
    id: 4,
    number: "DRIVER 4",
    shortTitle: "Workforce inclusivity",
    shortDesc: "Recruiting, retaining and developing diverse cohorts remains a key focus.",
    fullTitle: "Driver 4 — Workforce inclusivity",
    fullDesc:
      "Workforce inclusivity has been a key focus across the labour market. In the Public Safety and Government industry-sectors this is likely to translate into a continued focus on recruiting, retaining and developing employees from diverse cultural, linguistic, gender, disability and neurodivergent backgrounds. As organisations seek to increase workforce participation from these cohorts, they will be required to adapt and change legacy systems and processes to respond to the needs of the modern workforce.",
    sources: "",
  },
];

const megatrends = [
  {
    id: "pathways",
    icon: "/images/reports/drivers-of-change/Limitations.svg",
    title: "Limitations in career pathways",
    desc: "Career pathway opportunities for young professionals require further promotion, as potential employees are often unaware of career opportunities and pathways across Public Safety and Government workforces.",
  },
  {
    id: "climate",
    icon: "/images/reports/drivers-of-change/Climate.svg",
    title: "Climate change",
    desc: "Climate change impacts many Public Safety and Government functions, including emergency management, infrastructure planning, community resilience and operational readiness.",
  },
  {
    id: "labour",
    icon: "/images/reports/drivers-of-change/Competition.svg",
    title: "Competition for labour",
    desc: "Public Safety and Government workforces compete for labour with the private sector and other parts of the public sector, increasing attraction and retention pressures.",
  },
  {
    id: "duties",
    icon: "/images/reports/drivers-of-change/Expansion.svg",
    title: "Expansion of core duties",
    desc: "Employees are increasingly taking on expanded responsibilities to meet community, operational and service delivery needs.",
  },
  {
    id: "diversity",
    icon: "/images/reports/drivers-of-change/Diversity.svg",
    title: "Diversity and inclusion",
    desc: "Equitable participation of a diverse workforce remains an ongoing goal, particularly in leadership and specialised operational roles.",
  },
  {
    id: "demographics",
    icon: "/images/reports/drivers-of-change/Demographic.svg",
    title: "Demographic shifts",
    desc: "Ageing workforces can impact the transfer of institutional knowledge and contribute to future skills gaps.",
  },
  {
    id: "tech",
    icon: "/images/reports/drivers-of-change/Technological.svg",
    title: "Technological development",
    desc: "The implementation of new technology can be impacted by resource constraints, regulatory requirements and the availability of training.",
  },
  {
    id: "recruitment",
    icon: "/images/reports/drivers-of-change/Recruitment.svg",
    title: "Recruitment and retention",
    desc: "Recruitment and retention challenges are heightened in specialised roles and in remote, regional and rural locations.",
  },
  {
    id: "trust",
    icon: "/images/reports/drivers-of-change/Public.svg",
    title: "Public trust and perceptions",
    desc: "Public Safety and Government organisations must balance resourcing constraints with community needs, expectations and public trust.",
  },
];

const sources = [
  [
    "3",
    "Australian Government Department of Home Affairs, Organisational Resilience: Good Practice Guide, Australian Government Department of Home Affairs, 2024, accessed 25 February 2026.",
  ],
  [
    "4",
    "Productivity Commission, Five pillars of productivity inquiries - final reports, Productivity Commission, 2025, accessed 13 February 2026.",
  ],
  [
    "5",
    "Productivity Commission, Five pillars of productivity inquiries, Productivity Commission, 2025, accessed 25 February 2026.",
  ],
  [
    "6",
    "Australian Government Digital Transformation Agency, Policy for the responsible use of AI in government, 2025; Australian Government Department of Finance, National framework for the assurance of artificial intelligence in government, 2024.",
  ],
  [
    "7",
    "Australian Security Intelligence Organisation (ASIO), Director-General's Annual Threat Assessment 2025, ASIO, 2025, accessed 25 February 2026.",
  ],
];

export default function CorrectionalServicesDriversOfChangeView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const [activeDriverId, setActiveDriverId] = React.useState<number | null>(1);
  const [activeMegatrendId, setActiveMegatrendId] = React.useState<string | null>(
    "pathways",
  );
  const [isHeroMounted, setIsHeroMounted] = React.useState(false);
  const driversRef = React.useRef<HTMLDivElement>(null);
  const megatrendsRef = React.useRef<HTMLDivElement>(null);
  const [isDriversVisible, setIsDriversVisible] = React.useState(false);
  const [isMegatrendsVisible, setIsMegatrendsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsHeroMounted(true);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === driversRef.current) setIsDriversVisible(true);
          if (entry.target === megatrendsRef.current) setIsMegatrendsVisible(true);
        });
      },
      { threshold: 0.1 },
    );

    if (driversRef.current) observer.observe(driversRef.current);
    if (megatrendsRef.current) observer.observe(megatrendsRef.current);
    return () => observer.disconnect();
  }, []);

  const activeDriver = drivers.find((driver) => driver.id === activeDriverId);
  const activeMegatrend = megatrends.find(
    (megatrend) => megatrend.id === activeMegatrendId,
  );

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#38BDF8]/30 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="drivers_of_change" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        <ReportNavButtons slug={slug} currentPage="drivers_of_change" />

        <section className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-4">
            <p className="animate-slide-up text-xs font-semibold uppercase leading-6 text-[#0B6DA8]">
              Correctional Services WIR 2026 · Common to all WIRs
            </p>
            <h1 className="animate-slide-up text-3xl sm:text-4xl font-bold text-[#063B5D]">
              Drivers of Change
            </h1>
            <div className="space-y-3 animate-slide-up-delay">
              <p className="text-sm text-[#535862] leading-relaxed">
                In 2024, Public Skills Australia identified nine megatrends
                impacting the Public Safety and Government industry. These
                megatrends were further considered in the development of the
                2025 Workforce Insights Reports.
              </p>
              <p className="text-sm text-[#535862] leading-relaxed">
                While these megatrends will continue to have longer-term
                implications for workforce planning and development across the
                Public Safety and Government industry-sectors, the 2026
                Workforce Insights Reports have built on these and analysed four
                key drivers of change that cut across most megatrends.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end p-2">
            <div
              className={`flex items-center justify-center ${
                isHeroMounted ? "animate-drivers-pop-settle" : "opacity-0"
              }`}
            >
              <Image
                src="/images/reports/drivers-of-change-diagram.png"
                alt="Drivers of Change Diagram"
                width={260}
                height={250}
                className={`h-auto max-h-52 object-contain select-none ${
                  isHeroMounted ? "animate-drivers-spin" : ""
                }`}
              />
            </div>
          </div>
        </section>

        <section ref={driversRef} className="space-y-6">
          <div className="border-b border-[#D5D7DA] pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#252D02]">
              Four Key Drivers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {drivers.map((driver, index) => {
              const isActive = activeDriverId === driver.id;
              return (
                <article
                  key={driver.id}
                  style={
                    isDriversVisible
                      ? { animationDelay: `${index * 0.12}s` }
                      : undefined
                  }
                  onClick={() => setActiveDriverId(driver.id)}
                  className={`flex min-h-[250px] cursor-pointer flex-col justify-between rounded-2xl border bg-white p-6 transition-all duration-300 ${
                    isDriversVisible
                      ? "animate-card-entrance"
                      : "opacity-0 translate-y-6"
                  } ${
                    isActive
                      ? "border-2 border-[#0B6DA8] border-t-8 border-t-[#0B6DA8] bg-[#E8F7FE]"
                      : "border-[#E9EAEB] border-t-8 border-t-[#38BDF8] hover:border-2 hover:border-[#0B6DA8] hover:shadow-md"
                  }`}
                >
                  <div className="space-y-3">
                    <span className="block text-xs font-bold uppercase text-[#0B6DA8]">
                      {driver.number}
                    </span>
                    <h3 className="text-base font-bold leading-snug text-[#252D02]">
                      {driver.shortTitle}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#535862]">
                      {driver.shortDesc}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveDriverId(driver.id);
                    }}
                    className="mt-5 inline-flex h-8 w-fit items-center gap-1.5 rounded-full bg-[#38BDF8] px-4 text-xs font-bold text-[#063B5D] transition-colors hover:bg-[#0B6DA8] hover:text-white"
                  >
                    {isActive ? "Open" : "Open"}{" "}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </article>
              );
            })}
          </div>

          <div
            className={`grid transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              activeDriver
                ? "grid-rows-[1fr] opacity-100 mt-6"
                : "grid-rows-[0fr] opacity-0 pointer-events-none mt-0"
            }`}
          >
            <div className="overflow-hidden min-h-0">
              {activeDriver && (
                <div
                  key={activeDriver.id}
                  className="animate-content-switch rounded-2xl border-2 border-[#0B6DA8] border-l-8 bg-[#E8F7FE] p-6"
                >
                  <span className="inline-block rounded-full bg-[#0B6DA8] px-5 py-1.5 text-xs font-bold uppercase text-white">
                    Now presenting · {activeDriver.number}
                  </span>
                  <h3 className="mt-4 max-w-[900px] text-xl font-bold text-[#252D02]">
                    {activeDriver.fullTitle}
                  </h3>
                  <p className="mt-4 max-w-[960px] text-sm leading-6 text-[#535862]">
                    {activeDriver.fullDesc}
                  </p>
                  {activeDriver.sources && (
                    <p className="mt-4 max-w-[960px] border-t border-[#0B6DA8]/20 pt-4 text-xs leading-6 text-[#075D87]">
                      {activeDriver.sources}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="nine-megatrends" ref={megatrendsRef} className="space-y-6">
          <div className="border-b border-[#D5D7DA] pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#252D02]">
              Nine Megatrends
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-2 items-stretch">
            {megatrends.map((item, index) => {
              const isActive = activeMegatrendId === item.id;
              return (
                <article
                  key={item.id}
                  style={
                    isMegatrendsVisible
                      ? { animationDelay: `${index * 0.06}s` }
                      : undefined
                  }
                  onClick={() => setActiveMegatrendId(item.id)}
                  className={`flex min-h-[190px] cursor-pointer flex-col items-center justify-between rounded-2xl border p-4 text-center transition-all duration-300 ${
                    isMegatrendsVisible
                      ? "animate-card-entrance"
                      : "opacity-0 translate-y-6"
                  } ${
                    isActive
                      ? "border-2 border-[#0B6DA8] bg-[#E8F7FE]"
                      : "border-[#E9EAEB] bg-white hover:border-2 hover:border-[#0B6DA8] hover:shadow-md"
                  }`}
                >
                  <Image
                    src={
                      isActive ? item.icon.replace(".svg", "-active.svg") : item.icon
                    }
                    alt=""
                    width={68}
                    height={68}
                    className="h-[68px] w-[68px] shrink-0 object-contain"
                  />
                  <p
                    className={`text-xs font-semibold leading-normal ${
                      isActive ? "text-[#0B6DA8]" : "text-[#535862]"
                    }`}
                  >
                    {item.title}
                  </p>
                </article>
              );
            })}
          </div>

          <div
            className={`grid transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              activeMegatrend
                ? "grid-rows-[1fr] opacity-100 mt-4"
                : "grid-rows-[0fr] opacity-0 pointer-events-none mt-0"
            }`}
          >
            <div className="overflow-hidden min-h-0">
              {activeMegatrend && (
                <div
                  key={activeMegatrend.id}
                  className="animate-content-switch rounded-2xl border-2 border-[#0B6DA8] border-l-8 bg-[#E8F7FE] p-6"
                >
                  <h3 className="text-xl font-bold text-[#252D02]">
                    {activeMegatrend.title}
                  </h3>
                  <p className="mt-2 max-w-[960px] text-sm leading-6 text-[#535862]">
                    {activeMegatrend.desc}
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="max-w-[900px] pt-2 text-sm leading-6 text-[#535862]">
            These megatrends were identified in previous Workforce Insights
            Reports and will continue to have longer term implications for
            workforce planning and development across the Public Safety and
            Government industry-sectors.
          </p>
        </section>

        <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#252D02]">Sources</h2>
          <div className="max-w-[980px] space-y-3 text-xs leading-6 text-[#535862]">
            {sources.map(([number, source]) => (
              <div key={number} className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F7FE] text-xs font-bold text-[#0B6DA8]">
                  {number}
                </span>
                <p>{source}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
