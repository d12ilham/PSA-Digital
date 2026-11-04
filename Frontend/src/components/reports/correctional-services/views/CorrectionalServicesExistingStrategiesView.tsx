"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    period: "2022 – 2030",
    title: "Corrective Services NSW Strategic Plan: Towards 2030",
    summary:
      "The Corrective Services NSW Strategic Plan: Towards 2030 (the Plan), sets out strategic priorities and outcomes for the NSW Corrections Workforce into 2030. Outcomes sought through this Plan include delivering a supported, engaged and competent workforce. The Plan further sets out six priorities including:",
    consultation:
      "The Plan provided high-level insight into the key priorities of the NSW Government for the Correctional Services workforce and informed the consultation approach.",
    update2024:
      "Informed the context of the Drivers for Recruitment, Attrition and Retention (Corrections) Report 2025 in its research of public perceptions of Correctional Services industry-sector, with reference to the Plan’s priority of supporting employees by developing a capable, professional and safe workforce.\n\nInformed the Correctional Services Training Implementation Report 2025, specifically the Plan identified that employees must be appropriately trained and supported to reduce reoffending, aligning with the consultation findings.",
    update2025:
      "Informs the progression of the Correctional Services Skills and Training Pathways project and its next steps of identifying career and training pathways into key roles, specifically regarding the Plan’s support for its employees to learn new skills and seek professional development.\n\nInforms the progression of the Investigate Barriers to First Nations Workforce Participation project, specifically its priority of strengthening inclusive and safe workplaces which guided an examination of factors that impacted successful employment and/or aligned training for First Nations people.",
    update2026:
      "Will inform the 2026 proposed Correctional Services workforce strategy through the Plan’s priorities of supporting employees by developing a capable, professional and safe workforce and providing enhanced case-management to support offenders.",
  },
  {
    number: "02",
    jurisdiction: "Northern Territory",
    period: "2024 – 2028",
    title: "Northern Territory Department of Corrections Strategic Plan 2024 – 2028",
    summary:
      "The Northern Territory Department of Corrections Strategic Plan 2024-2028 (the Plan) sets out four priorities for Northern Territory Department of Corrections into 2028. These priorities include:",
    consultation:
      "The Plan evidenced the Northern Territory’s Department of Corrections commitment to workforce planning and capability. This informed Public Skills Australia’s consultation with Northern Territory Department of Corrections on the workforce priorities.",
    update2024:
      "Informed the development of the Drivers for Recruitment, Attrition and Retention (Corrections) Report 2025, specifically the Plan’s strategy of delivering workforce planning that considers attraction, satisfaction and retention added context to the report.\n\nInformed Correctional Services Training Implementation Report 2025, reinforcing consultations findings in relation to the Plan’s strategies of investment in workforce capabilities and development pathways.",
    update2025:
      "Informs the progression of the Correctional Services Skills and Training Pathways project, specifically the Plan’s investment in workforce capability and development pathways for employees aligns to the project aim of stronger occupational and educational pathways.",
    update2026:
      "Will inform the development of the 2026 proposed Correctional Services workforce strategy, in relation to the evidence-based rehabilitation, enhancing health services, delivering culturally informed programs and supporting rehabilitation pathways.",
  },
  {
    number: "03",
    jurisdiction: "Queensland",
    period: "2022 – 2027",
    title: "Mental Health Strategy 2022 – 2027",
    summary:
      "The Queensland Corrective Services (QCS) Mental Health Strategy 2022-2027 (the Strategy) aims to improve mental health support for persons in custody by enhancing existing initiatives and establishing new ones. The Strategy emphasises case management and the development of health-focused facilities, like the Southern Queensland Correctional Precinct Stage 2, to elevate correctional mental health care standards. The Strategy seeks to create a system that recognises and supports all persons in custody.\n\nThe Strategy is being implemented through annual action plans, which monitor progress against the priority areas. The actions are ongoing or embedded in business as usual. Legislative amendments, improved information sharing and system wide mental health and trauma-informed initiatives have been delivered by Queensland Correctional Services groups and health partners.",
    consultation:
      "The Strategy provided detail on Queensland Corrective Services approach to mental health support for persons in custody, and informed engagements with Queensland corrective services stakeholders in relation to skills for delivering mental health services.",
    update2024:
      "Not applicable.",
    update2025:
      "Informs the development of next steps in progressing recommendations from the Correctional Services Training Implementation Report 2025, specifically a good practice forum to share practice between jurisdictions on professional development.",
    update2026:
      "Will inform the 2026 proposed Correctional Services workforce strategy, particularly behavioural change and trauma-response competencies as it relates to the Strategy’s focus areas of trauma-informed, culturally responsive practice and workforce capability uplift.",
  },
  {
    number: "04",
    jurisdiction: "Queensland",
    period: "2025 – 2029",
    title: "Queensland Corrective Services Strategic Plan 2025 – 2029",
    summary:
      "The Queensland Corrective Services Strategic Plan 2025-2029 (the Plan) sets out four priorities for Queensland Corrective Services. These priorities are:",
    consultation:
      "The Plan provided high-level insight to the key priorities of Queensland Corrective Services and informed consultation approach and focus.",
    update2024:
      "Not applicable.",
    update2025:
      "Informs the progression of the Correctional Services Skills and Training Pathways project, specifically Objective 3 of the Plan, of supporting a safer workplace, including enhancing the capability and capacity to ensure workforce model responsiveness, adds context to the project’s examination of training packages and qualifications.",
    update2026:
      "Will inform the development of the 2026 proposed Correctional Services workforce strategy, specifically in relation to the Plan’s objectives of delivering rehabilitative corrective services and supporting a safer workplace for employees by providing the workforce with the training they need to safely and effectively perform their duties.",
  },
  {
    number: "05",
    jurisdiction: "South Australia",
    period: "2022 – 2026",
    title: "Department for Correctional Services Strategic Plan 2022 – 2026",
    summary:
      "The Department for Correctional Services Strategic Plan 2022-2026 (the Plan) sets out five priorities for the South Australian Correctional Services workforce, these are:",
    consultation:
      "The Plan provided high-level insight to the key priorities of South Australian corrections. Focus on priorities such as Building Innovation and Contemporary Practice supports focus on workforce planning and informs Public Skills Australia’s consultation approach.",
    update2024:
      "Informed the development of Drivers for Recruitment, Attrition and Retention (Corrections) Report 2025, providing context to the challenges facing workforce planning and recruitment, attrition and retention in each jurisdiction.\n\nInformed the Correctional Services Training Implementation Report 2025, during the consultation for this project. Particularly, alignment with the Plan’s priority action of fulfilling training and development requirement.",
    update2025:
      "Informs the progression of the Correctional Services Skills and Training Pathways project, contributing to the identify key stages of development undertaken across jurisdictions.\n\nPriority 2 on Closing the Gap, including increasing First Nations employment rates and leadership, informs the progression of the First Nations Workforce Participation project, through further analysis of First Nations workforce participation trends.",
    update2026:
      "Will inform the development of the 2026 proposed Correctional Services workforce strategy, specifically in relation to the Plan’s objectives of fulfilling training and development requirements, employees actively contributing their expertise and the implementation of an end-to-end case management model.",
  },
  {
    number: "06",
    jurisdiction: "South Australia",
    period: "2023 – 2028",
    title: "Anti-Racism Action Plan 2023 – 2028",
    summary:
      "The South Australian Public Sector Anti-Racism Action Plan 2023–2028 (the Plan), outlines five key priorities:",
    consultation:
      "The Plan provided detail on a key priorities in relation to anti-racism for all workforces in the South Australian government, including those in Correctional Services, and informed wider considerations in consultations with South Australian Correctional Services and wider South Australian Government stakeholders.",
    update2024:
      "Not applicable.",
    update2025:
      "Informs the progression of the First Nations Workforce Participation project, specifically the Plan’s priority of strengthening inclusive and safe workplaces. This adds context to the project’s ongoing examination of employment and training for First Nations people.",
    update2026:
      "Will inform the 2026 proposed Correctional Services workforce strategy, specifically around the priority of ensuring communications around the updates to the training package reinforce the commitment to anti-racism.",
  },
  {
    number: "07",
    jurisdiction: "South Australia",
    period: "2024 – 2029",
    title: "Aboriginal Employment, Retention & Professional Development Strategy 2024 – 2029",
    summary:
      "The Aboriginal Employment, Retention & Professional Development Strategy 2024 – 2029 (the Strategy) was finalised in 2024 and aims to recognise and support the unique contributions of First Nations employees in South Australia’s correctional system. It focuses on improving employment outcomes through culturally safe practices, professional development and retention initiatives. The strategy is part of a broader commitment to reducing incarceration rates among First Nations people and fostering a culturally-inclusive workforce.",
    consultation:
      "Provided detail on a key priority in relation to First Nations employment and informed wider considerations in consultations with South Australian Correctional Services and wider South Australian Government stakeholders.",
    update2024:
      "Not applicable.",
    update2025:
      "Informs the progression of the First Nations Workforce Participation project, specifically with reference to the Strategy’s focus on improving First Nations recruitment, retention and professional development in the Correctional Services.",
    update2026:
      "",
  },
  {
    number: "08",
    jurisdiction: "Tasmania",
    period: "2022 – 2026",
    title: "Changing Lives, Creating Futures – A Strategic Plan for Corrections in Tasmania 2023",
    summary:
      "Changing lives, creating futures – A Strategic Plan for Corrections in Tasmania 2023 (the Plan) provides a roadmap for Tasmanian Corrections. The Plan focuses on six strategic priorities:",
    consultation:
      "The Plan provided high-level insight to the key priorities of Department of Justice Tasmania and informed consultation approach and focus.",
    update2024:
      "Informed the development of the Drivers for Recruitment, Attrition and Retention (Corrections) Report 2025, reflecting key elements like the Plan’s focus on improving employee retention through engagement and career progression opportunities.",
    update2025:
      "Priorities targeting investing in the workforce, such as revising, renewing and implementing best practice regarding its training framework informs the ongoing analysis work underpinning the next steps of the Correctional Services Skills and Training Pathways project.\n\nThe fourth priority, which addresses Closing the Gap, including increasing First Nations employment and addressing systemic barriers, informs the First Nations Workforce Participation project by supporting analysis of First Nations workforce participation trends.",
    update2026:
      "Will inform the development of the 2026 proposed Correctional Services workforce strategy, specifically in relation to the targeted rehabilitation and reintegration priority, as well as its focus on professional development and training of correctional employees.",
  },
  {
    number: "09",
    jurisdiction: "Victoria",
    period: "2024 – 2034",
    title: "Prison Workforce Strategy 2024 – 2034",
    summary:
      "The Prison Workforce Strategy 2024 – 2034 (the Strategy), outlines a comprehensive plan to build a skilled, diverse and culturally safe prison workforce. It includes initiatives for recruitment, retention, professional development and leadership pathways, with a strong focus on First Nations workforce participation and wellbeing.\n\nThe Strategy was released in October 2024 and is in its early implementation phase. The Strategy is to be reviewed every two years, and most of its initial 2-year deliverables were scheduled for completion by 2026 but no publicly reported progress has been identified. Many of these two-year deliverables remain outstanding according to the Strategy’s timelines, with most due for completion by October 2026.",
    consultation:
      "The Strategy provided an overview of key priorities in relation to the Correctional Services workforce in custodial settings and informed the consultation approach.",
    update2024:
      "Informed the analysis of the Drivers for Recruitment, Attrition and Retention (Corrections) Report 2025 with its focus on attraction, recruitment and merit-based promotion, to attract enough new recruits from diverse backgrounds.",
    update2025:
      "Informs the progression of the Correctional Services Skills and Training Pathways project by supporting analysis of skills maintenance and alignment accredited and non-accredited training with reference to the Strategy’s aim of sustainable learning lifecycles and clear career pathways.\n\nInforms the progression of the First Nations Workforce Participation project, specifically the key focus area of enhancing First Nations cultural safety and better supporting First Nations career pathways, which supports the analysis of workforce practices.",
    update2026:
      "Will inform the proposed 2026 Correctional Services workforce strategy by underscoring activities to assess training against evolving capability requirements, specifically the Strategy’s action area of reviewing learning and development needs of its workforce and refreshing pre-service and ongoing training.",
  },
  {
    number: "10",
    jurisdiction: "Western Australia",
    period: "2025 – 2030",
    title: "Corrective Services Strategic Plan 2025 – 2030",
    summary:
      "The Corrective Services Strategic Plan 2025-2030 (the Plan) sets out four priorities for Western Australia Corrective Services:",
    consultation:
      "The Plan provided high-level insight to the key priorities of Corrective Services in Western Australia and informed consultation approach and focus.",
    update2024:
      "Not applicable.",
    update2025:
      "Informs the progression of the Correctional Services Skills and Training Pathways project by reinforcing the need for structured training and career pathways across workforce lifecycles, highlighted in the Plan’s focus on workforce capability, professional development and retention.\n\nPriority 3 commitment to strengthening Aboriginal workforce participation informs the First Nations Workforce Participation project by supporting analysis of workforce participation trends and culturally responsive pathways.",
    update2026:
      "Will inform the 2026 proposed Correctional Services workforce strategy in relation to the priority of developing a high-performing organisation and the actions of increasing opportunities for professional development and fulfillment of training requirements and conducting a training needs analysis.",
  },
];

const jurisdictionGroups = [
  { number: "01", jurisdiction: "New South Wales", indices: [0] },
  { number: "02", jurisdiction: "Northern Territory", indices: [1] },
  { number: "03", jurisdiction: "Queensland", indices: [2, 3] },
  { number: "04", jurisdiction: "South Australia", indices: [4, 5, 6] },
  { number: "05", jurisdiction: "Tasmania", indices: [7] },
  { number: "06", jurisdiction: "Victoria", indices: [8] },
  { number: "07", jurisdiction: "Western Australia", indices: [9] },
];

const strategyEntries = jurisdictionGroups.flatMap((group) =>
  group.indices.map((index) => ({ ...group, index, title: strategies[index].title })),
);

export default function CorrectionalServicesExistingStrategiesView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeGroup = jurisdictionGroups.find((group) => group.indices.includes(activeIndex))!;
  const visibleIndices = [activeIndex];
  const detailStartRef = React.useRef<HTMLDivElement>(null);
  const strategyPanelRefs = React.useRef<(HTMLElement | null)[]>([]);
  const strategyListRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const list = strategyListRef.current;
    const selected = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !selected) return;
    const bounds = list.getBoundingClientRect();
    const item = selected.getBoundingClientRect();
    if (item.top < bounds.top || item.bottom > bounds.bottom) {
      list.scrollTop += item.top - bounds.top;
    }
  }, [activeIndex]);

  const showStrategy = (index: number) => {
    const nextIndex = (index + strategies.length) % strategies.length;
    setActiveIndex(nextIndex);
    window.requestAnimationFrame(() => {
      const nextPanel = visibleIndices.includes(nextIndex) ? strategyPanelRefs.current[nextIndex] : detailStartRef.current;
      nextPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="existing_strategies" />

      <main className="mx-auto w-full max-w-[1504px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="existing_strategies"
          prev={{ label: "Update on 2025 Strategies", href: `/reports/${slug}/update_2025_strategies` }}
          next={{ label: "Commonwealth Government Initiatives", href: `/reports/${slug}/federal_initiatives` }}
          prevPrefix=""
        />

        <section className="flex min-h-[184px] flex-col gap-6 rounded-[14px] border border-[#E9EAEB] bg-white p-6 animate-slide-up motion-reduce:animate-none lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-[#424996] px-3 py-1 text-xs font-semibold text-white">Workforce Strategies</span>
            <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-[40px]">Existing Industry-Sector Strategies</h1>
            <p className="mt-4 text-sm leading-6">Select a strategy to open its detail and how it informs Public Skills Australia’s work.</p>
          </div>
          <Image src="/images/reports/correctional-existing-strategies-group-85.svg" width={487} height={104} alt="" className="h-auto w-full max-w-[487px] shrink-0 animate-zoom-in motion-reduce:animate-none lg:w-[487px]" />
        </section>

        <div className="sticky top-[60px] z-30 flex h-24 flex-col justify-center gap-2 rounded-[14px] border border-[#E9EAEB] bg-[#FAFAF0] p-3 lg:hidden">
          <label htmlFor="jurisdiction-strategy" className="text-sm font-semibold text-[#424996]">Selected jurisdiction strategy</label>
          <select id="jurisdiction-strategy" aria-label="Select jurisdiction strategy" value={activeIndex} onChange={(event) => showStrategy(Number(event.target.value))} className="w-full min-w-0 rounded-lg border border-[#424996] bg-white p-2 text-sm focus-visible:outline-2 focus-visible:outline-[#424996]">
            {strategyEntries.map((group) => <option key={group.index} value={group.index}>{group.number} · {group.jurisdiction} - {group.title}</option>)}
          </select>
        </div>

        <section className="grid items-start gap-6 lg:grid-cols-[minmax(280px,400px)_minmax(0,1fr)]">
          <nav aria-label="Jurisdiction strategies" className="sticky top-[76px] hidden min-w-0 rounded-[14px] bg-[#FAFAF0] lg:block">
            <p className="border-b border-[#E9EAEB] px-3 py-3 text-sm font-semibold text-[#424996]">Selected: {activeGroup.jurisdiction}</p>
            <div ref={strategyListRef} className="max-h-[calc(100dvh-144px)] space-y-2 overflow-y-auto overscroll-contain p-1">
            {strategyEntries.map((group) => {
              const isActive = group.index === activeIndex;
              return (
                <button
                  key={group.index}
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => showStrategy(group.index)}
                  className={`flex min-h-[140px] w-full items-center justify-between gap-4 rounded-[14px] border px-6 py-5 text-left transition-[transform,box-shadow,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#424996] motion-reduce:transition-none ${isActive ? "border-2 border-[#424996] bg-[#E8E9EF]" : "border-[#E9EAEB] bg-white hover:-translate-y-1 hover:shadow-md"}`}
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-[#424996]">{group.number} · {group.jurisdiction}</span>
                    <strong className="mt-5 block text-lg font-semibold leading-6">
                      {group.title}
                    </strong>
                  </span>
                  <span className={`grid size-10 shrink-0 place-items-center rounded-full ${isActive ? "border border-[#9AB954] bg-white" : "bg-[#8AC900]"}`} aria-hidden="true"><ArrowRight size={18} /></span>
                </button>
              );
            })}
            </div>
          </nav>

          <div ref={detailStartRef} className="min-w-0 space-y-6 scroll-mt-[172px] lg:scroll-mt-[76px]" aria-live="polite">
            {visibleIndices.map((index) => {
              const strategy = strategies[index];
              return <article key={strategy.number} ref={(element) => { strategyPanelRefs.current[index] = element; }} className="scroll-mt-[172px] lg:scroll-mt-[76px] rounded-[14px] bg-[#E8E8E8] p-6 animate-content-switch motion-reduce:animate-none">
            <div data-strategy-heading className="sticky top-[156px] z-20 rounded-[14px] bg-[#E8E8E8] pb-4 pt-2 lg:top-[76px]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="inline-flex rounded-full bg-[#424996] px-5 py-3 text-sm font-semibold text-white">{activeGroup.number} · {activeGroup.jurisdiction}</span>
              {index === strategies.length - 1 ? (
                <Link href={`/reports/${slug}/federal_initiatives`} className="inline-flex h-10 items-center gap-2 rounded-full bg-[#8AC900] px-5 text-sm font-semibold transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#424996] motion-reduce:transition-none">
                  Next <ArrowRight size={17} />
                </Link>
              ) : (
                <button type="button" onClick={() => showStrategy(index + 1)} className="inline-flex h-10 items-center gap-2 rounded-full bg-[#8AC900] px-5 text-sm font-semibold transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#424996] motion-reduce:transition-none">
                  Next <ArrowRight size={17} />
                </button>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <h2 className="max-w-[720px] text-xl font-semibold leading-8">{strategy.title}</h2>
              <span className="rounded-full bg-[#E6E9DF] px-5 py-2 text-sm text-[#535862]">{strategy.period}</span>
            </div>
            </div>

            <div className="mt-6 rounded-[14px] bg-[#FAFAF0] p-6 sm:p-8">



              <div className="mt-6">
                <h3 className="text-lg font-medium text-[#424996]">SUMMARY</h3>
                {strategy.summary.split("\n\n").map((paragraph) => <p key={paragraph} className="mt-3 text-sm leading-6 text-[#535862]">{paragraph}</p>)}
                {index === 0 && <>
                  <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-[#535862]">
                    <li>supporting employees</li>
                    <li>enhanced case management</li>
                    <li>Closing the Gap</li>
                    <li>one team</li>
                    <li>KPIs</li>
                    <li>reducing unnatural deaths</li>
                  </ul>
                  <p className="mt-1 text-sm leading-6 text-[#535862]">Under the Plan, NSW has advanced professional development through integrated training programs for employees, such as introducing the Certificate IV in Correctional Practice: Integrated Rehabilitation Services Training and redesigning and relaunching the Certificate III in Correctional Practice: Correctional Officer Primary Training.</p>
                </>}
                {index === 1 && <>
                  <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-[#535862]">
                    <li>Stronger foundations by working across the corrections sector, supporting infrastructure, working across government and delivering legislative reform.</li>
                    <li>Investing in people by supporting workforce capability and workforce planning, promoting effective leadership, supporting health, safety and wellbeing and building culture.</li>
                    <li>Breaking the cycle by supporting evidence-based rehabilitation, enhancing health services, delivering culturally informed programs and supporting rehabilitation pathways.</li>
                    <li>Innovation through improving performance and productivity, streamlining policy and procedure, enhancing risk management.</li>
                  </ul>
                  <p className="mt-1 text-sm leading-6 text-[#535862]">This Plan sets out a clear focus on people and culture, which supports skilling and workforce planning.</p>
                </>}
                {index === 3 && (
                  <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-[#535862]">
                    <li>restoring community safety by holding offenders to account including by delivering responsive Correctional Services</li>
                    <li>reducing reoffending by delivering rehabilitative corrective services including by delivering perpetrator programs and targeted interventions</li>
                    <li>supporting a safer workplace for employees including by enhancing capability and capacity, and</li>
                    <li>building strong community partnerships to support community safety including by improving outcomes for First Nations people.</li>
                  </ul>
                )}
                {index === 4 && <>
                  <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-[#535862]">
                    <li>reducing reoffending</li>
                    <li>Closing the Gap</li>
                    <li>creating high performing teams</li>
                    <li>building innovation and contemporary practice, and</li>
                    <li>being safe at work.</li>
                  </ul>
                  <p className="mt-1 text-sm leading-6 text-[#535862]">Since the release of the Plan, reoffending has reduced to 35.8 per cent, below the Plan’s target of 36.8 per cent. In addition, the Plan has achieved growth in vocational educational training opportunities, improved post-release housing and supervision options, developed new culturally informed rehabilitation units and increased investment in employee safety, cultural capability and modern correctional infrastructure.</p>
                </>}
                {index === 5 && <>
                  <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-[#535862]">
                    <li>enabling employees to act against racism</li>
                    <li>embedding anti-racism into leadership and decision making</li>
                    <li>strengthening inclusive and safe workplaces</li>
                    <li>ensuring communications reinforce the commitment to anti-racism, and</li>
                    <li>maintaining accountability for anti-racism efforts. These priorities aim to proactively eliminate racial inequity and foster inclusion in the public sector.</li>
                  </ul>
                  <p className="mt-1 text-sm leading-6 text-[#535862]">As reported by the Office of the Commissioner for Public Sector Employment (OCPSE), most actions under the Plan are underway, some have been completed (six per cent) and none are delayed (as at November 2024). Monitoring, data collection, pilot training and First Nations workforce initiatives have been delivered, with most delivered by OCPSE, Wellbeing SA and other relevant agencies. Remaining actions in 2026-2027 focus on a race equity tool, further training and a strategy review.</p>
                </>}
                {index === 7 && (
                  <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-[#535862]">
                    <li>improve lives and reduce harm through targeted rehabilitation and reintegration</li>
                    <li>supporting the workforce through recruitment and training</li>
                    <li>infrastructural improvements</li>
                    <li>Closing the Gap: Reducing the number of First Nations people in the Corrections system</li>
                    <li>focusing on safety for employees, inmates, remandees, persons in custody, and the community, and</li>
                    <li>greater collaboration between organisations to improve outcomes.</li>
                  </ul>
                )}
                {index === 9 && <>
                  <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-[#535862]">
                    <li>build a strong culture of safety, respect and trust</li>
                    <li>create environments that facilitate positive change to reduce reoffending</li>
                    <li>drive better outcomes and positive change by partnering with Aboriginal people, and</li>
                    <li>develop a high-performing organisation where people are empowered.</li>
                  </ul>
                  <p className="mt-1 text-sm leading-6 text-[#535862]">The Plan sets out a clear focus on people and culture, which supports skilling and workforce planning.</p>
                </>}
              </div>

              <div className="mt-6 border-t border-[#D5D7DA] pt-6">
                <h3 className="text-xl font-medium text-[#424996]">How this informs Public Skills Australia’s work</h3>
                <div className="mt-4 grid gap-4">
                  {[
                    ["Consultation and engagement:", strategy.consultation],
                    ["2024 Workforce Strategies", strategy.update2024],
                    ["2025 Workforce Strategies", strategy.update2025],
                    ["2026 Workforce Strategies", strategy.update2026],
                  ].filter(([, body]) => body && body !== "Not applicable.").map(([title, body], sectionIndex) => (
                    <div
                      key={title}
                      style={{ animationDelay: `${sectionIndex * 0.08}s` }}
                      className="rounded-[14px] border-l-[12px] border-[#424996] bg-[#E8E9EF] px-7 py-6 animate-card-entrance transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-md motion-reduce:animate-none motion-reduce:transition-none"
                    >
                      <h4 className="text-base font-medium">{title}</h4>
                      <div className="mt-2 space-y-3 text-sm leading-6 text-[#535862]">
                        {body.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>;
            })}
          </div>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
