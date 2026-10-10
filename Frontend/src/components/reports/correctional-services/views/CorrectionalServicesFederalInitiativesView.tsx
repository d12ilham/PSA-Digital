"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Landmark } from "lucide-react";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type CorrectionalServicesReport = {
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const initiatives = [
  {
    number: "01",
    owner: "National Cabinet",
    period: "2020 - 2031",
    title: "National Agreement on Closing the Gap",
    summary:
      "Closing the Gap is a commitment from all Australian governments and Aboriginal and Torres Strait Islander representatives to a fundamentally new way of developing and implementing policies and programs that impact the lives of First Nations people. It focuses on four priority reforms and 19 national socio-economic targets.",
    relevance:
      "Closing the Gap informed consultation and engagement for the 2026 Corrections Workforce Insights Report and will inform analysis for the proposed strategy when addressing training for working with First Nations people.",
  },
  {
    number: "02",
    owner: "Department of the Prime Minister and Cabinet",
    period: "2022 - 2026",
    title: "The Australian Government's Strategic Priorities",
    summary:
      "The priorities provide a four-year policy direction for the Australian Public Service across the economy, public health and climate change. Outcomes include the Jobs and Skills Summit, fee-free TAFE and additional university places.",
    relevance:
      "The focus on TAFE accessibility and skills shortages is relevant to the proposed Community Corrections strategy and future CCO skills requirements.",
  },
  {
    number: "03",
    owner: "Australian Government - Minister for Women",
    period: "2023 - ongoing",
    title: "Working for Women - A Strategy for Gender Equality",
    summary:
      "The strategy sets out five priority areas: gender-based violence, unpaid and paid care, economic equality and security, health, and leadership, representation and decision making.",
    relevance:
      "Priority Area 3 has informed PSA's future work by highlighting skills, training and occupational segregation considerations for priority cohorts in community services practice.",
  },
  {
    number: "04",
    owner: "Jobs and Skills Australia",
    period: "2023 - 2025",
    title: "The Clean Energy Generation: Workforce needs for a Net Zero Economy",
    summary:
      "This series considers future clean-energy workforce requirements as Australia works toward net-zero emissions by 2050, including recommendations across attraction, retention, transition, critical occupations, education and training.",
    relevance:
      "The reports provided contextual information about workforce pressures that may be felt by Correctional Services due to modernising workforce needs.",
  },
  {
    number: "05",
    owner: "Department of Home Affairs",
    period: "2023 - 2030",
    title: "Australian Cyber Security Strategy",
    summary:
      "The Strategy sets out six cyber shields and three implementation horizons to support Australia's ambition to become a world leader in cyber security by 2030.",
    relevance:
      "Cyber security was identified during scoping for the proposed strategy and will remain an ongoing consideration in engagement with the Correctional Services industry-sector.",
  },
  {
    number: "06",
    owner: "Qualification Reform Design Group",
    period: "2024",
    title: "Unlocking the Potential of VET",
    summary:
      "The QRDG provided advice on reforming VET qualifications, including modernising qualification design through a purpose-led, principles-based approach tied to workforce needs.",
    relevance:
      "The advice directly informed the proposed strategy, as it considers recent CHC Community Services Training Package updates and potential future CSC updates.",
  },
  {
    number: "07",
    owner: "Australian Bureau of Statistics",
    period: "2024 - ongoing",
    title: "Occupation Standard Classification for Australia",
    summary:
      "OSCA replaced ANZSCO as Australia's occupation classification framework and will undergo regular updates through the OSCA Maintenance Strategy.",
    relevance:
      "PSA will use the most up-to-date OSCA where possible to report occupational insights with whole-of-economy standards.",
  },
  {
    number: "08",
    owner: "Jobs and Skills Australia",
    period: "2024 - ongoing",
    title: "2024 Core Skills Occupation List - Key Findings Report",
    summary:
      "The CSOL provides labour market analysis informing occupations suitable for employer-sponsored temporary migration through the Core Skills Stream of the Skills in Demand Visa.",
    relevance:
      "The report provided contextual information for engagement and consultation, particularly insights into recruitment and retention for specific occupations.",
  },
  {
    number: "09",
    owner: "Jobs and Skills Australia",
    period: "2024 - ongoing",
    title: "Better Together - The Jobs and Skills Report 2024",
    summary:
      "The report details five strategic pillars for future workforce planning, including inclusive participation, today's workforce, future workforce shaping, VET pathways and informed dialogue.",
    relevance:
      "Strategic pillar four, Optimising pathways and system architecture, directly relates to the proposed strategy reviewing recent training package updates.",
  },
  {
    number: "10",
    owner: "Skills and Workforce Ministerial Council",
    period: "2025 - ongoing",
    title: "Training Package Organising Framework",
    summary:
      "The TPOF sets out the process for developing and seeking approval of new VET training products for JSCs and was updated in July 2025.",
    relevance:
      "The updated framework provides best-practice guidance for proposed strategies that may result in training product changes.",
  },
  {
    number: "11",
    owner: "Productivity Commission",
    period: "2025 - ongoing",
    title: "Five Pillars of Productivity Inquiries - Final Reports",
    summary:
      "The Productivity Commission provided 47 recommendations across five productivity pillars, including building a skilled and adaptable workforce.",
    relevance:
      "The recommendations provided context for stakeholder engagement material, with PSA substantially engaging with the skilled and adaptable workforce pillar.",
  },
  {
    number: "12",
    owner: "Jobs and Skills Australia",
    period: "2020 - 2031",
    title: "Opportunity and Productivity: Towards a Tertiary Harmonisation Roadmap Report",
    summary:
      "The report articulates the benefits of a more harmonised tertiary sector and provides recommendations to create a sustainable pathway forward.",
    relevance:
      "The report informed stakeholder engagement for the proposed project to address skilled workforce shortages in community corrections services.",
  },
  {
    number: "13",
    owner: "Jobs and Skills Australia",
    period: "2025 - ongoing",
    title: "Gender Economic Equality Study",
    summary:
      "The study explored occupational segregation, pay gaps and gendered divides in education, training and skills systems, setting out 10 recommendations.",
    relevance:
      "The recommendations provide strategic goals for PSA and context on priority cohorts for the Workforce Lifecycle Project.",
  },
  {
    number: "14",
    owner: "Jobs and Skills Australia",
    period: "Ongoing",
    title: "Occupational Shortage List",
    summary:
      "The OSL provides an annual review of whether occupations are experiencing shortages nationally and for each state and territory, with the latest list updated in 2025.",
    relevance:
      "The OSL provided context for stakeholder consultation preparation and helped PSA pursue engagement on occupation gaps within Correctional Services contexts.",
  },
];

export default function CorrectionalServicesFederalInitiativesView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const initiative = initiatives[activeIndex];
  const showInitiative = (index: number) => {
    setActiveIndex((index + initiatives.length) % initiatives.length);
  };

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#38BDF8]/30 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="federal_initiatives" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        <ReportNavButtons slug={slug} currentPage="federal_initiatives" />

        <section className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-4">
            <p className="animate-slide-up text-xs font-semibold uppercase leading-6 text-[#0B6DA8]">
              Workforce Strategies
            </p>
            <h1 className="animate-slide-up text-3xl sm:text-4xl font-bold text-[#063B5D]">
              Commonwealth Government Initiatives
            </h1>
            <p className="animate-slide-up-delay max-w-4xl text-sm leading-relaxed text-[#535862]">
              Public Skills Australia&apos;s work is informed and guided by the Federal Government
              initiatives detailed below.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="animate-hero-pulse-settle flex h-36 w-36 items-center justify-center rounded-full bg-[#E8F7FE]">
              <Landmark className="h-20 w-20 text-[#0B6DA8]" strokeWidth={1.5} />
            </div>
          </div>
        </section>

        <section className="grid items-start gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-2xl border border-[#E9EAEB] bg-white p-5">
            <h2 className="mb-4 text-lg font-bold text-[#252D02]">
              Initiatives · {initiatives.length} · Select to open
            </h2>
            <div className="max-h-[780px] space-y-3 overflow-auto pr-1">
              {initiatives.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`flex min-h-[98px] w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-2 border-[#0B6DA8] bg-[#E8F7FE] shadow-sm"
                        : "border-[#E9EAEB] bg-white hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
                    }`}
                  >
                    <span>
                      <span className="block text-[10px] font-bold uppercase text-[#0B6DA8]">
                        {item.number} · {item.owner}
                      </span>
                      <strong className="mt-2 block text-sm leading-5 text-[#252D02]">
                        {item.title}
                      </strong>
                    </span>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${isActive ? "bg-white text-[#0B6DA8]" : "bg-[#38BDF8] text-[#063B5D]"}`}>
                      <ArrowRight size={15} />
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <article className="animate-content-switch rounded-2xl border-2 border-[#0B6DA8] bg-white p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <span className="w-fit rounded-full bg-[#0B6DA8] px-4 py-2 text-xs font-bold uppercase text-white">
                {initiative.number} · {initiative.owner}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous initiative"
                  onClick={() => showInitiative(activeIndex - 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#BEEBFB] bg-white text-[#0B6DA8] transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => showInitiative(activeIndex + 1)}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-[#38BDF8] px-5 text-xs font-bold text-[#063B5D] transition-all hover:-translate-y-0.5 hover:bg-[#0B6DA8] hover:text-white hover:shadow-md"
                >
                  Next <ArrowRight size={15} />
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-[#FBFCFD] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="max-w-4xl text-2xl font-bold leading-8 text-[#063B5D]">
                  {initiative.title}
                </h2>
                <span className="rounded-full bg-[#E8F7FE] px-4 py-2 text-xs font-bold text-[#0B6DA8]">
                  {initiative.period}
                </span>
              </div>

              <div className="mt-7 grid gap-5 lg:grid-cols-2">
                <section className="rounded-xl border border-[#E9EAEB] bg-white p-5">
                  <h3 className="text-xs font-bold uppercase text-[#0B6DA8]">Summary</h3>
                  <p className="mt-3 text-sm leading-6 text-[#535862]">
                    {initiative.summary}
                  </p>
                </section>
                <section className="rounded-xl border-l-8 border-[#0B6DA8] bg-[#E8F7FE] p-5">
                  <h3 className="text-xs font-bold uppercase text-[#0B6DA8]">
                    How this informs Public Skills Australia&apos;s work
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#535862]">
                    {initiative.relevance}
                  </p>
                </section>
              </div>
            </div>
          </article>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
