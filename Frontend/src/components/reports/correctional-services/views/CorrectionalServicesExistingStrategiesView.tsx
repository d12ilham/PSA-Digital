"use client";

import React from "react";
import { ArrowLeft, ArrowRight, LibraryBig } from "lucide-react";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type CorrectionalServicesReport = {
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const strategies = [
  {
    number: "01",
    jurisdiction: "New South Wales",
    period: "2022 - 2030",
    title: "Corrective Services NSW Strategic Plan: Towards 2030",
    summary:
      "The Plan sets out strategic priorities and outcomes for the NSW Corrections workforce into 2030. Outcomes include delivering a supported, engaged and competent workforce. Priorities include supporting employees, enhanced case management, Closing the Gap, one team, KPIs and reducing unnatural deaths. NSW has advanced professional development through integrated training programs, including Certificate IV Integrated Rehabilitation Services Training and the redesigned Certificate III Correctional Officer Primary Training.",
    consultation:
      "The Plan provided high-level insight into the key priorities of the NSW Government for the Correctional Services workforce and informed the consultation approach.",
    update2024:
      "Informed the Drivers for Recruitment, Attrition and Retention (Corrections) Report 2025 through the Plan's priority of supporting employees by developing a capable, professional and safe workforce. It also informed the Correctional Services Training Implementation Report 2025.",
    update2025:
      "Informs the Correctional Services Skills and Training Pathways project and its next steps of identifying career and training pathways into key roles. It also informs the First Nations Workforce Participation project.",
    update2026:
      "Will inform the 2026 proposed Correctional Services workforce strategy through priorities of supporting employees and providing enhanced case-management to support offenders.",
  },
  {
    number: "02",
    jurisdiction: "Northern Territory",
    period: "2024 - 2028",
    title: "Northern Territory Department of Corrections Strategic Plan 2024-2028",
    summary:
      "The Plan sets out four priorities for Northern Territory Department of Corrections: stronger foundations, investing in people, breaking the cycle and innovation. It includes workforce capability, workforce planning, leadership, health, safety, wellbeing, culture and evidence-based rehabilitation.",
    consultation:
      "The Plan evidenced the Northern Territory Department of Corrections commitment to workforce planning and capability and informed engagement on workforce priorities.",
    update2024:
      "Informed the Drivers for Recruitment, Attrition and Retention (Corrections) Report 2025, particularly its focus on workforce planning that considers attraction, satisfaction and retention. It also reinforced implementation report consultation findings.",
    update2025:
      "Informs the Correctional Services Skills and Training Pathways project through its investment in workforce capability and development pathways.",
    update2026:
      "Will inform the 2026 proposed strategy in relation to evidence-based rehabilitation, health services, culturally informed programs and rehabilitation pathways.",
  },
  {
    number: "03",
    jurisdiction: "Queensland",
    period: "2022 - 2029",
    title: "Mental Health Strategy 2022-2027 and Queensland Corrective Services Strategic Plan 2025-2029",
    summary:
      "The Mental Health Strategy aims to improve mental health support for persons in custody through enhanced initiatives and health-focused facilities. The QCS Strategic Plan sets priorities around community safety, reducing reoffending, supporting a safer workplace and building strong community partnerships.",
    consultation:
      "The Strategy informed engagement with Queensland corrective services stakeholders on skills for delivering mental health services. The Strategic Plan informed consultation approach and focus.",
    update2024:
      "Provides context for workforce capability and safety priorities that shape implementation and training conversations.",
    update2025:
      "Informs next steps from the Correctional Services Training Implementation Report, including a good practice forum to share professional development practice between jurisdictions.",
    update2026:
      "Will inform the proposed 2026 workforce strategy, particularly behavioural change and trauma-response competencies, rehabilitative services and workforce capability uplift.",
  },
  {
    number: "04",
    jurisdiction: "South Australia",
    period: "2022 - 2029",
    title: "Department for Correctional Services Strategic Plan and inclusion strategies",
    summary:
      "South Australia's strategic material includes the Department for Correctional Services Strategic Plan 2022-2026, the Anti-Racism Action Plan 2023-2028 and the Aboriginal Employment, Retention & Professional Development Strategy 2024-2029. Together these plans focus on reducing reoffending, Closing the Gap, high performing teams, innovation, safety, anti-racism and culturally safe employment pathways.",
    consultation:
      "The plans provided insight into South Australian corrections priorities and informed consultations with South Australian Correctional Services and broader government stakeholders.",
    update2024:
      "Informed the Drivers Report and the Correctional Services Training Implementation Report, particularly through alignment with training and development requirements.",
    update2025:
      "Informs the Skills and Training Pathways project and the First Nations Workforce Participation project through Closing the Gap, First Nations employment and leadership priorities.",
    update2026:
      "Will inform the proposed 2026 strategy in relation to training requirements, employee expertise and end-to-end case management.",
  },
  {
    number: "05",
    jurisdiction: "Tasmania",
    period: "2022 - 2026",
    title: "Changing Lives, Creating Futures - A Strategic Plan for Corrections in Tasmania 2023",
    summary:
      "The Plan provides a roadmap for Tasmanian Corrections. It focuses on rehabilitation and reintegration, supporting the workforce through recruitment and training, infrastructure, Closing the Gap, safety and collaboration between organisations.",
    consultation:
      "The Plan provided high-level insight to Department of Justice Tasmania priorities and informed consultation approach and focus.",
    update2024:
      "Informed the Drivers Report by reflecting priorities such as improving employee retention through engagement and career progression opportunities.",
    update2025:
      "Training framework priorities inform analysis for the Skills and Training Pathways project. Closing the Gap priorities inform the First Nations Workforce Participation project.",
    update2026:
      "Will inform the proposed 2026 strategy through targeted rehabilitation and reintegration priorities, as well as professional development and training for correctional employees.",
  },
  {
    number: "06",
    jurisdiction: "Victoria",
    period: "2024 - 2034",
    title: "Prison Workforce Strategy 2024-2034",
    summary:
      "The Strategy outlines a plan to build a skilled, diverse and culturally safe prison workforce. It includes recruitment, retention, professional development and leadership pathways, with a focus on First Nations workforce participation and wellbeing.",
    consultation:
      "The Strategy provided an overview of custodial workforce priorities and informed the consultation approach.",
    update2024:
      "Informed the Drivers Report through its focus on attraction, recruitment and merit-based promotion.",
    update2025:
      "Informs the Skills and Training Pathways project by supporting analysis of skills maintenance and alignment between accredited and non-accredited training. It also informs First Nations workforce practice analysis.",
    update2026:
      "Will inform the proposed 2026 strategy by underscoring activities to assess training against evolving capability requirements.",
  },
  {
    number: "07",
    jurisdiction: "Western Australia",
    period: "2025 - 2030",
    title: "Corrective Services Strategic Plan 2025-2030",
    summary:
      "The Plan sets out four priorities for Western Australia Corrective Services: safety, respect and trust; environments that facilitate positive change; better outcomes through partnering with Aboriginal people; and a high-performing organisation where people are empowered.",
    consultation:
      "The Plan provided insight into WA Corrective Services priorities and informed consultation approach and focus.",
    update2024:
      "Provides a contemporary jurisdictional reference point for capability, culture and professional development considerations.",
    update2025:
      "Informs the Skills and Training Pathways project by reinforcing structured training and career pathways across the workforce lifecycle. It also informs First Nations Workforce Participation through Aboriginal workforce participation priorities.",
    update2026:
      "Will inform the proposed 2026 strategy through priorities for a high-performing organisation, professional development, training requirements and training needs analysis.",
  },
];

export default function CorrectionalServicesExistingStrategiesView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const strategy = strategies[activeIndex];

  const showStrategy = (index: number) => {
    setActiveIndex((index + strategies.length) % strategies.length);
  };

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#38BDF8]/30 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="existing_strategies" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        <ReportNavButtons slug={slug} currentPage="existing_strategies" />

        <section className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-4">
            <p className="animate-slide-up text-xs font-semibold uppercase leading-6 text-[#0B6DA8]">
              Workforce Strategies
            </p>
            <h1 className="animate-slide-up text-3xl sm:text-4xl font-bold text-[#063B5D]">
              Existing Industry-Sector Strategies
            </h1>
            <p className="animate-slide-up-delay max-w-4xl text-sm leading-relaxed text-[#535862]">
              Select a strategy to open its detail and how it informs Public Skills Australia&apos;s work.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="animate-hero-pulse-settle flex h-36 w-36 items-center justify-center rounded-full bg-[#E8F7FE]">
              <LibraryBig className="h-20 w-20 text-[#0B6DA8]" strokeWidth={1.5} />
            </div>
          </div>
        </section>

        <section className="grid items-start gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="rounded-2xl border border-[#E9EAEB] bg-white p-5">
            <h2 className="mb-4 text-lg font-bold text-[#252D02]">
              Strategies · {strategies.length} · Select to open
            </h2>
            <div className="space-y-3">
              {strategies.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`flex min-h-[106px] w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-2 border-[#0B6DA8] bg-[#E8F7FE] shadow-sm"
                        : "border-[#E9EAEB] bg-white hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md"
                    }`}
                  >
                    <span>
                      <span className="block text-[10px] font-bold uppercase text-[#0B6DA8]">
                        {item.number} · {item.jurisdiction}
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
                {strategy.number} · {strategy.jurisdiction}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous strategy"
                  onClick={() => showStrategy(activeIndex - 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#BEEBFB] bg-white text-[#0B6DA8] transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => showStrategy(activeIndex + 1)}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-[#38BDF8] px-5 text-xs font-bold text-[#063B5D] transition-all hover:-translate-y-0.5 hover:bg-[#0B6DA8] hover:text-white hover:shadow-md"
                >
                  Next <ArrowRight size={15} />
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-[#FBFCFD] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="max-w-4xl text-2xl font-bold leading-8 text-[#063B5D]">
                  {strategy.title}
                </h2>
                <span className="rounded-full bg-[#E8F7FE] px-4 py-2 text-xs font-bold text-[#0B6DA8]">
                  {strategy.period}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase text-[#0B6DA8]">Summary</h3>
                <p className="mt-3 text-sm leading-6 text-[#535862]">{strategy.summary}</p>
              </div>

              <div className="mt-7 border-t border-[#D5D7DA] pt-6">
                <h3 className="text-xs font-bold uppercase text-[#0B6DA8]">
                  How this informs Public Skills Australia&apos;s work
                </h3>
                <div className="mt-4 grid gap-4">
                  {[
                    ["Consultation and engagement:", strategy.consultation],
                    ["2024 Workforce Strategies", strategy.update2024],
                    ["2025 Workforce Strategies", strategy.update2025],
                    ["2026 Workforce Strategies", strategy.update2026],
                  ].map(([title, body], index) => (
                    <div
                      key={title}
                      style={{ animationDelay: `${index * 0.08}s` }}
                      className="animate-card-entrance rounded-xl border-l-8 border-[#0B6DA8] bg-[#E8F7FE] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <h4 className="text-base font-bold text-[#252D02]">{title}</h4>
                      <p className="mt-2 text-sm leading-6 text-[#535862]">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
