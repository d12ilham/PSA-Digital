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
    fullTitle:
      "Driver 1 — Resilience of organisations to respond to strategic shocks",
    fullDesc:
      "Organisational resilience is emerging as a critical driver of change across Australia's Public Safety and Government industry-sectors, particularly as agencies confront increasingly frequent and complex strategic shocks. Recent experience with compounding crises (such as increasingly intense bushfires, major cyber attacks and intensifying geopolitical tensions) have exposed structural vulnerabilities and highlighted the need for more adaptive, anticipatory and integrated capabilities. Investment will be required to deepen organisational capabilities that supports system-wide preparedness, robust governance and the ability to maintain critical functions under stress. [3]",
  },
  {
    id: 2,
    number: "DRIVER 2",
    shortTitle: "Challenges to workforce productivity",
    fullTitle: "Driver 2 — Challenges to workforce productivity",
    fullDesc:
      "In its Five Pillars of Productivity enquiry reports, the Productivity Commission observed that productivity growth has been slowing globally since the mid-2000s, with Australia experiencing the slowest productivity growth in 60 years. The Productivity Commission identified long-standing pressures that have contributed to the productivity slowdown, including market stagnation, a persistently tight labour market and slower uptake of technological innovations. These factors are further exacerbated by emerging challenges linked to the megatrends including an ageing population, technological development, climate change and competition for labour. [4, 5]",
  },
  {
    id: 3,
    number: "DRIVER 3",
    shortTitle:
      "Emergence of AI, greater automation and broader digital transformation",
    fullTitle:
      "Driver 3 — Emergence of AI, greater automation and broader digital transformation",
    fullDesc:
      "AI, automation and accelerated digital transformation are powerful drivers of organisational and system-level change in the short term. This is reinforced by a push from the Federal Government for greater adoption of AI and digital initiatives across federal agencies. These initiatives signal a shift toward embedding AI into core service delivery, regulatory functions and operational decision making. AI, automation and digital transformation represent an opportunity for significant capability uplift through AI-enabled analytics, automation of high-volume processes and advanced digital platforms that enhance situational awareness, threat detection and emergency response coordination. Conversely, they represent a growing security risk as they are also being leveraged by threat actors to disrupt government services, facilitate foreign interference, enable disinformation, promote false narratives through deepfakes and erode trust in government institutions. [6, 7]",
  },
  {
    id: 4,
    number: "DRIVER 4",
    shortTitle: "Workforce inclusivity",
    fullTitle: "Driver 4 — Workforce inclusivity",
    fullDesc:
      "Workforce inclusivity has been a key focus across the labour market. In the Public Safety and Government industry-sectors this is likely to translate into a continued focus on recruiting, retaining and developing employees from diverse cultural, linguistic, gender, disability and neurodivergent backgrounds. As organisations seek to increase workforce participation from these cohorts, they will be required to adapt and change legacy systems and processes to respond to the needs of the modern workforce.",
  },
];

const megatrends = [
  {
    id: "pathways",
    icon: "/images/reports/drivers-of-change/Limitations.svg",
    title: "Limitations in career pathways",
    description: "Career pathway opportunities for young professionals require further promotion, as potential employees are often unaware of Local Government career opportunities and pathways.",
  },
  {
    id: "climate",
    icon: "/images/reports/drivers-of-change/Climate.svg",
    title: "Climate change",
    description: "Climate change impacts many functions of Local Government, such as emergency management and environmental planning.",
  },
  {
    id: "labour",
    icon: "/images/reports/drivers-of-change/Competition.svg",
    title: "Competition for labour",
    description: "Local Government is competing for labour with the private sector and other parts of the public sector. There is also competition for labour between Local Government organisations.",
  },
  {
    id: "duties",
    icon: "/images/reports/drivers-of-change/Expansion.svg",
    title: "Expansion of core duties",
    description: "Local Government employees are increasingly taking on multiple roles to meet community needs in the Local Government industry sector.",
  },
  {
    id: "diversity",
    icon: "/images/reports/drivers-of-change/Diversity.svg",
    title: "Diversity and inclusion",
    description: "Equitable gender composition and meaningful participation of a diverse workforce is an ongoing goal for Local Government workforces, particularly in leadership roles.",
  },
  {
    id: "demographics",
    icon: "/images/reports/drivers-of-change/Demographic.svg",
    title: "Demographic shifts",
    description: "Ageing workforces can impact the transfer of institutional knowledge and further create skills gaps in Local Government workforces.",
  },
  {
    id: "tech",
    icon: "/images/reports/drivers-of-change/Technological.svg",
    title: "Technological development",
    description: "The implementation of new technology in the Local Government workforce can be impacted by resource constraints and the availability of training.",
  },
  {
    id: "recruitment",
    icon: "/images/reports/drivers-of-change/Recruitment.svg",
    title: "Recruitment and retention",
    description: "There are several barriers to the attraction and retention of Local Government workforces in remote, regional and rural locations.",
  },
  {
    id: "trust",
    icon: "/images/reports/drivers-of-change/Public.svg",
    title: "Public trust and perceptions",
    description: "Local Governments are required to balance resourcing constraints with meeting community needs, which can impact public trust and perception.",
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
    "Australian Government Digital Transformation Agency, Policy for the responsible use of AI in government, Australian Government Digital Transformation Agency, 2025, accessed 25 February 2026; Australian Government Department of Finance, National framework for the assurance of artificial intelligence in government, Australian Government Department of Finance, 2024, accessed 25 February 2026.",
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
  const [activeDriverId, setActiveDriverId] = React.useState<number | null>(null);
  const [activeMegatrendId, setActiveMegatrendId] = React.useState("pathways");
  const driversRef = React.useRef<HTMLDivElement>(null);
  const megatrendsRef = React.useRef<HTMLDivElement>(null);
  const [isDriversVisible, setIsDriversVisible] = React.useState(false);
  const [isMegatrendsVisible, setIsMegatrendsVisible] = React.useState(false);

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
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased selection:bg-[#8AC900]/30">
      <ReportHeader slug={slug} report={report} currentPage="drivers_of_change" />

      <main className="mx-auto flex w-full max-w-[1504px] flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons slug={slug} currentPage="drivers_of_change" prev={{ label: "Methodology", href: `/reports/${slug}/methodology` }} />

        <section className="flex min-h-[286px] flex-col justify-between gap-8 rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:flex-row lg:items-center">
          <div className="max-w-[800px] space-y-4">
            <h1 className="animate-slide-up text-[32px] font-bold leading-tight text-[#252D02] sm:text-[40px]">
              Drivers of Change
            </h1>
            <div className="animate-slide-up-delay space-y-4 text-sm font-medium leading-6 text-[#535862]">
              <p>
                In 2024, Public Skills Australia identified nine megatrends
                impacting the Public Safety and Government industry. These
                megatrends were further considered in the development of the
                2025 Workforce Insights Reports.
              </p>
              <p>
                While these megatrends will continue to have longer term
                implications for workforce planning and development across the
                Public Safety and Government industry-sectors, the 2026
                Workforce Insights Reports have built on these and analysed four
                key drivers of change that cut across most megatrends. This is
                important as these drivers of change will likely impact the
                Public Safety and Government industry-sectors in the short to
                medium term.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 justify-center lg:justify-end">
            <div className="flex items-center justify-center animate-drivers-pop-settle motion-reduce:animate-none">
              <Image
                src="/images/reports/drivers-of-change-diagram.png"
                alt="Four connected drivers of change"
                width={250}
                height={240}
                className="h-[240px] w-[250px] object-contain select-none animate-drivers-spin motion-reduce:animate-none"
              />
            </div>
          </div>
        </section>

        <section ref={driversRef} className="space-y-6">
          <div className="border-b border-[#D5D7DA] pb-4">
            <h2 className="text-2xl font-bold text-[#252D02]">
              Four Key Drivers
            </h2>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {drivers.map((driver, index) => {
              const isActive = activeDriverId === driver.id;
              return (
                <article
                  key={driver.id}
                  style={isDriversVisible ? { animationDelay: `${index * 0.12}s` } : undefined}
                  className={`flex min-h-[260px] flex-col justify-between rounded-xl border border-t-[8px] border-t-[#8AC900] p-6 transition-[border-color,box-shadow] duration-300 hover:shadow-md motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                    isDriversVisible
                      ? "animate-card-entrance"
                      : "opacity-0 translate-y-6"
                  } ${
                    isActive
                      ? "border-[#728C28] bg-[#F0F5DF]"
                      : "border-[#E9EAEB] bg-white hover:border-[#B8C9A0]"
                  }`}
                >
                  <div>
                    <span className="block text-xs font-medium uppercase text-[#598303]">
                      {driver.number}
                    </span>
                    <h3 className="mt-7 text-xl font-bold leading-7 text-[#252D02]">
                      {driver.shortTitle}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveDriverId(isActive ? null : driver.id)}
                    aria-expanded={isActive}
                    aria-controls="driver-detail"
                    className="inline-flex h-10 w-fit min-w-[100px] items-center justify-center gap-2 rounded-full bg-[#8AC900] px-5 text-sm font-semibold text-[#252D02] transition-colors duration-300 hover:bg-[#78AF00] motion-reduce:transition-none"
                  >
                    {isActive ? "Close" : "Open"}
                    <ChevronDown className={`size-4 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                </article>
              );
            })}
          </div>

          <div
            id="driver-detail"
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
                  className="animate-content-switch rounded-xl border border-[#B8C9A0] border-l-[8px] border-l-[#728C28] bg-[#F0F5DF] p-6"
                >
                  <span className="inline-block rounded-full bg-[#598303] px-5 py-1.5 text-xs font-bold uppercase text-white">
                    Now presenting · {activeDriver.number}
                  </span>
                  <h3 className="mt-4 max-w-[900px] text-xl font-bold text-[#252D02]">
                    {activeDriver.fullTitle}
                  </h3>
                  <p className="mt-4 max-w-[960px] text-sm leading-6 text-[#535862]">
                    {activeDriver.fullDesc}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="nine-megatrends" ref={megatrendsRef} className="space-y-6">
          <div className="border-b border-[#D5D7DA] pb-4">
            <h2 className="text-2xl font-bold text-[#252D02]">
              Nine Megatrends
            </h2>
          </div>

          <div role="tablist" aria-label="Nine Megatrends" className="grid grid-cols-2 items-stretch gap-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
            {megatrends.map((item, index) => {
              const isActive = activeMegatrendId === item.id;
              return (
                <button
                  key={item.id}
                  id={`megatrend-tab-${item.id}`}
                  type="button"
                  role="tab"
                  style={isMegatrendsVisible ? { animationDelay: `${index * 0.06}s` } : undefined}
                  onClick={() => setActiveMegatrendId(item.id)}
                  onKeyDown={(event) => {
                    const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
                    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? megatrends.length - 1 : offset ? (index + offset + megatrends.length) % megatrends.length : null;
                    if (nextIndex === null) return;
                    event.preventDefault();
                    const nextId = megatrends[nextIndex].id;
                    setActiveMegatrendId(nextId);
                    document.getElementById(`megatrend-tab-${nextId}`)?.focus();
                  }}
                  aria-selected={isActive}
                  aria-controls="megatrend-detail"
                  tabIndex={isActive ? 0 : -1}
                  className={`flex min-h-[200px] flex-col items-center justify-between rounded-lg border p-4 text-center transition-[border-color,box-shadow] duration-300 hover:shadow-sm motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                    isMegatrendsVisible
                      ? "animate-card-entrance"
                      : "opacity-0 translate-y-6"
                  } ${
                    isActive
                      ? "border-[#598303] bg-[#F0F3E5]"
                      : "border-[#E9EAEB] bg-white hover:border-[#B8C9A0]"
                  }`}
                >
                  <Image
                    src={
                      isActive ? item.icon.replace(".svg", "-active.svg") : item.icon
                    }
                    alt=""
                    width={100}
                    height={100}
                    className="size-[100px] shrink-0 object-contain"
                  />
                  <p
                    className={`text-sm font-medium leading-6 ${
                      isActive ? "text-[#598303]" : "text-[#535862]"
                    }`}
                  >
                    {item.id === "climate" ? <>Climate<br />change</> : item.id === "demographics" ? <>Demographic<br />shifts</> : item.title}
                  </p>
                </button>
              );
            })}
          </div>

          <div
            id="megatrend-detail"
            role="tabpanel"
            aria-labelledby={`megatrend-tab-${activeMegatrendId}`}
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
                  className="animate-content-switch min-h-[136px] rounded-lg border border-[#598303] border-l-4 bg-[#F0F3E5] px-8 py-6"
                >
                  <h3 className="text-xl font-bold text-[#252D02]">
                    {activeMegatrend.title}
                  </h3>
                  <p className="mt-3 max-w-[960px] text-sm leading-6 text-[#535862]">
                    {activeMegatrend.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="max-w-[800px] text-sm font-medium leading-6 text-[#535862]">
            These megatrends were identified in previous Workforce Insights
            Reports and will continue to have longer term implications for
            workforce planning and development across the Public Safety and
            Government industry-sectors.
          </p>
        </section>

        <section className="space-y-5 rounded-2xl border border-[#E9EAEB] bg-white p-6 sm:p-10">
          <h2 className="text-2xl font-bold text-[#252D02]">Sources</h2>
          <div className="max-w-[800px] space-y-4 text-sm leading-6 text-[#535862]">
            {sources.map(([number, source]) => (
              <div key={number} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#598303] text-xs font-bold text-white">
                  {number}
                </span>
                <p>{source}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
