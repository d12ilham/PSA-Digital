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

const initiatives = [
  {
    number: "01",
    owner: "National Cabinet (Formerly Council of Australian Governments)",
    period: "2020 – 2031",
    title: "National Agreement on Closing the Gap (Closing the Gap)",
    summary: [
      "Closing the Gap is a commitment from all Australian governments and Aboriginal and Torres Strait Islander representatives to a fundamentally new way of developing and implementing policies and programs that impact the lives of First Nations people. This includes policies and programs impacting recruitment, health and social programs specific to First Nations peoples, which are relevant to the Public Safety and Government industry-sectors.",
      "Closing the Gap is jointly implemented by the Federal, State and Territory governments, along with Australian Local Government Associations and Coalitions of Peaks. It focuses on four priority reforms (strengthen formal partnerships and shared decision making; build the community-controlled sector; transform government organisations; and shared access to data) and 19 national socio-economic targets, covering areas such as life expectancy, education, employment, justice and child protection. Overall progress towards meeting Closing the Gap targets has been mixed. Implementation of Closing the Gap is ongoing to 2031. The Productivity Commission is tracking these targets.",
      "Closing the Gap performs a substantive role in informing Public Skills Australia’s research and engagement efforts. Closing the Gap informed consultation and engagement for the 2026 Corrections Workforce Insights Report. It will also inform the development and analysis of the proposed strategy Collaboration with HumanAbility to analyse recent updates to the CHC Community Services Training Package to identify contemporary practice that could inform future updates to the Community Corrections specialisations in the officers Certificate III and Certificate IV in Correctional Practice, when addressing the capability area of training for working with First Nations people.",
    ],
  },
  {
    number: "02",
    owner: "Department of the Prime Minister and Cabinet",
    period: "2022 – 2026",
    title: "The Australian Government’s Strategic Priorities",
    summary: [
      "The Federal Government’s strategic priorities provide a four-year (2022-2026) policy direction for the Australian Public Service (APS) and sets targets across key areas. These areas include the economy, public health and climate change.",
      "The Australian Government’s Strategic Priorities are into the final year of their implementation by the Department of Prime Minister and Cabinet with the relevant APS departments and organisations. So far the Strategic Priorities, which have not been placed on set timelines, have achieved several outcomes, including hosting a Jobs and Skills Summit, developing a plan for cheaper child care, implementing fee-free Technical and Further Education (TAFE) and creating more university places, establishing the National Reconstruction Fund, introducing legislation for a national anti-corruption commission and strengthening strategic partnerships in the Pacific and South East Asia. Progress is still required for public health and aged care, improving housing supply and planning reforms and advancing government and budget sustainability.",
      "The Australian Government’s Strategic Priorities focuses on TAFE accessibility, to reduce skills shortages across all industry-sectors in Australia. This will also be a significant factor in the proposed strategy Collaboration with HumanAbility to analyse recent updates to the CHC Community Services Training Package to identify contemporary practice that could inform future updates to the Community Corrections specialisations in the officers Certificate III and Certificate IV in Correctional Practice, which will look at addressing CCO skills requirements.",
    ],
  },
  {
    number: "03",
    owner: "Australian Government – Minister for Women",
    period: "2023 – ongoing",
    title: "Working for Women – A Strategy for Gender Equality",
    summary: [
      "The Working for Women strategy outlines a framework for the Australian Government to improve national gender equality. It sets out five priority areas and reports on a range of outcomes and indicators annually to monitor Australia’s progress. These priority areas are:",
      "Specific to JSCs, Priority Area 3 focuses on improving gender pay gaps, supporting access to skills and training and reducing occupational and industrial gender segregation.",
      "To date, the Australian Government has increased female recruitment into trades and other occupations through apprenticeship support, fee-free TAFE and targets in the Australian Skills Guarantee, along with including gender equality as a national priority in the National Skills Agreement.",
      "In March 2025, the DEWR launched the Advancing Gender Equality in Gender Segregated Industries grant program, directly linked to Priority Area 3. This grant program received a $28.5 million extension in December 2025.",
      "Priority Area 3 of the Working for Women strategy – addressing economic equality and security – has informed the development of Public Skills Australia’s future work, in the proposed strategy Collaboration with HumanAbility to analyse recent updates to the CHC Community Services Training Package to identify contemporary practice that could inform future updates to the Community Corrections specialisations in the officers Certificate III and Certificate IV in Correctional Practice, which will consider priority cohorts in contemporary practices for community services, for the capabilities of future CCOs.",
    ],
    priorities: [
      "Priority Area 1 – Gender-based violence",
      "Priority Area 2 – Unpaid and paid care",
      "Priority Area 3 – Economic equality and security",
      "Priority Area 4 – Health",
      "Priority Area 5 – Leadership, representation and decision making",
    ],
  },
  {
    number: "04",
    owner: "Jobs and Skills Australia",
    period: "2023 – 2025",
    title: "The Clean Energy Generation: Workforce needs for a Net Zero Economy",
    summary: [
      "This series of reports considers emerging and future clean-energy workforce requirements as Australia strives to reach net-zero emissions by 2050. JSA’s preliminary modelling estimates Australia’s clean-energy workforce will need to grow from the current 53,000 employees to 84,000 employees by 2050.",
      "The reports make 50 recommendations to support governments in focusing their efforts on how skills shortages can be averted in the set time, resources and legislative constraints and government objectives. Broadly, the recommendations cover the issue areas of participation and attraction, hiring and retention, transitioning employees and communities, roles and responsibilities, critical occupations, education and training and transport. Implementation remains ongoing and long-term, aligned with the 2050 net-zero target.",
      "These reports provided contextual information for growing workforces in other industry-sectors within Public Skills Australia’s remit of Public Safety and Government. This provided insights into workforce pressures that may be felt by the Correctional Services industry-sector, due to modernising workforce needs and was considered for the 2026 Corrections Workforce Insights Report.",
    ],
  },
  {
    number: "05",
    owner: "Department of Home Affairs",
    period: "2023 – 2030",
    title: "Australian Cyber Security Strategy",
    summary: [
      "The 2023-2030 Australian Cyber Security Strategy serves as a roadmap to achieve the Australian Government’s vision of becoming a world leader in cybersecurity by 2030.",
      "The Strategy is structured around six ‘cyber shields’ (strong citizens and businesses, safe technology, world-class threat sharing, protected critical infrastructure, sovereign capability and resilient regional/global leadership). These are to be delivered in three stages or ‘Horizons’ (2023-2025 strengthening the foundations, 2026-2028 scaling efforts across the whole economy and 2029-2030 leading the development of new cyber technologies). Progress to date has been on the foundational aspects of the Strategy, with the initial work under ‘Horizon 1’ (2023-2025) concentrating on improving incident reporting and response mechanisms, introducing legislative reforms, piloting threat-sharing initiatives and raising government and critical infrastructure security standards. Overall coordination sits with the Department of Home Affairs, specifically through the Australian Cyber Security Coordinator. The remaining two horizons are to be implemented over the next four years up to 2030.",
      "Cyber security was identified as a key theme during scoping for the proposed strategy Collaboration with HumanAbility to analyse recent updates to the CHC Community Services Training Package to identify contemporary practice that could inform future updates to the Community Corrections specialisations in the officers Certificate III and Certificate IV in Correctional Practice. New technologies and the cyber security risks they pose will be an ongoing consideration in Public Skills Australia’s engagement with the Correctional Services industry-sector.",
    ],
  },
  {
    number: "06",
    owner: "Qualification Reform Design Group",
    period: "2024",
    title: "Unlocking the Potential of VET",
    summary: [
      "In March 2024, the Qualification Reform Design Group (QRDG) provided advice to Skills Ministers on reforming the VET qualifications system. This included advising that:",
      "As a result, Public Skills Australia undertook a Demonstration Project that consulted widely to determine the efficacy of updating qualification and unit of competency templates. This report was delivered to the QRDG in Q3 2024.",
      "In December 2024, the QRDG provided their final report and recommendations to Skills Minsters, based on national consultation and findings from the JSC Demonstration Projects. The recommendations from this report centred around modernising VET qualifications by implementing a purpose-led, principles-based approach to qualification design. As a result, JSCs are responsible for ensuring qualifications serve a clear purpose, are linked to workforce needs and are not unnecessarily duplicated.",
      "The advice from the ongoing QRDG work, directly informed the proposed strategy of Collaboration with HumanAbility to analyse recent updates to the CHC Community Services Training Package to identify contemporary practice that could inform future updates to the Community Corrections specialisations in the officers Certificate III and Certificate IV in Correctional Practice, as it will look to review and update the CHC Community Services Training Package.",
    ],
    priorities: [
      "Qualification and unit of competency design and development processes should be reviewed and updated where appropriate.",
      "The VET system should be consolidated by removing training products that are under-utilised or unnecessarily duplicated.",
      "The Training Package Organising Framework should be updated, where necessary.",
    ],
  },
  {
    number: "07",
    owner: "Australian Bureau of Statistics",
    period: "2024 – ongoing",
    title: "Occupation Standard Classification for Australia",
    summary: [
      "Formerly known as the Australia New Zealand Standard Classification of Occupation (ANZSCO), the Occupation Standard Classification for Australia (OSCA) is a standardised framework for classifying occupations in Australia. As part of the replacement process from ANZSCO to OSCA in 2024, the ABS announced that OSCA will undergo regular updates in accordance with the OSCA Maintenance Strategy, which was released in 2025.",
      "The changes to OSCA outlined in the Maintenance Strategy involve stakeholder engagement and are timed to ensure that each Census of Population and Housing uses the most recent update. Under the Strategy, the first round of consultations and feedback with stakeholders on proposed changes to OSCA are scheduled to be completed in August 2026, with the next update to be published in March 2027 before the data release of the 2026 Census in October 2027.",
      "Public Skills Australia has in the 2026 Corrections Workforce Insights Report and will in future, where possible, utilise the most up-to-date version of OSCA to accurately report on occupational insights with whole-of-economy standards.",
    ],
  },
  {
    number: "08",
    owner: "Jobs and Skills Australia",
    period: "2024 – ongoing",
    title: "2024 Core Skills Occupation List – Key Findings Report",
    summary: [
      "The Core Skills Occupation List (CSOL) provides labour market analysis that informs the identification of occupations that are considered appropriate for employer-sponsored temporary migration through the Core Skills Stream of the Skills in Demand (SID) Visa.",
      "The 2024 CSOL Key Findings Report compiled a list of 456 occupations considered appropriate for the Core Skills Stream of the new employer-sponsored temporary SID visa. In addition to updating the list, JSA examined the drivers of skill shortages through CSOL analysis and stakeholder engagement and identified a ‘suitability gap’ category – occupations where there are enough qualified applicants, but they are not regarded as suitable by employers (e.g. auditors, electronics engineers, software and applications programmers). JSA also identified a ‘retention gap’ category – occupations with below-average rates of retention such as construction and hospitality jobs and child carers. JSA’s consultations to inform the 2025 CSOL opened in August 2025 and JSA submitted its advice to Government for consideration in October 2025.",
      "The CSOL report provided contextual information for engagement and consultation of the 2026 Corrections Workforce Insights Report, in particular, insights into recruitment and retention for specific occupations.",
    ],
  },
  {
    number: "09",
    owner: "Jobs and Skills Australia",
    period: "2024 – ongoing",
    title: "Better Together – The Jobs and Skills Report 2024",
    summary: [
      "This report was released in November 2024 as part of JSA’s mandated obligations to provide insight on the Australian labour market and advice on workforce needs and priorities. This report details evidence aligned to five strategic pillars to enable a more prosperous economic future, including:",
      "This report outlines JSA’s key current and emerging datasets that provide useful insights on the intricacies of Australia’s labour market for use in the development of strategic workforce planning for the JSCs.",
      "The Better Together – The Jobs and Skills Report 2024, provided insight for the 2026 Corrections Workforce Insights Report for industry-sector engagement. Strategic pillar four, Optimising pathways and systems architecture, directly relates to the proposed strategy of Collaboration with HumanAbility to analyse recent updates to the CHC Community Services Training Package to identify contemporary practice that could inform future updates to the Community Corrections specialisations in the officers Certificate III and Certificate IV in Correctional Practice, as it proposes to review recent updates of the VET Training Packages for the Corrections industry-sector.",
    ],
    priorities: [
      "Fostering inclusive participation: Focused on broadening employment opportunities through identifying and removing barriers for people and communities.",
      "Understanding today’s workforce: Detailing data to build an evidence base that informs and addresses current and emerging labour market and skills needs.",
      "Shaping Australia’s future workforce: Projecting forward to plan for the opportunities and challenges of Australia’s future workforce needs.",
      "Optimising pathways and system architecture: Monitoring, analysing and advising on the effectiveness of the VET system as key to skilling the workforce.",
      "Activating an informed dialogue: Detailing stakeholder engagement across the VET system to provide the best evidence and advice on Australia’s current and future workforce and skills needs and opportunities.",
    ],
  },
  {
    number: "10",
    owner: "Skills and Workforce Ministerial Council",
    period: "2025 – ongoing",
    title: "Training Package Organising Framework",
    summary: [
      "In July 2025, the Training Package Organising Framework (TPOF) was updated based on advice from the QRDG in December 2024. Housing the Training Package Products Development and Endorsement Process Policy (TPPDEPP), Training Package Products Policy (TPPP) and the Standards for Training Packages, the TPOF sets out the process for developing and seeking approval of new VET training products for JSCs. As a JSC, Public Skills Australia will continue to adhere to the TPOF to ensure the Australian VET system is high-performing and readily supports student and industry needs.",
      "The updated TPOF provides specific guidance to all projects that may result in changes to any training products. This includes the 2026 Corrections Workforce Insights Report, where the TPOF provides guidance on best practice development and approval of VET training products for proposed strategies, such as Collaboration with HumanAbility to analyse recent updates to the CHC Community Services Training Package to identify contemporary practice that could inform future updates to the Community Corrections specialisations in the officers Certificate III and Certificate IV in Correctional Practice.",
    ],
  },
  {
    number: "11",
    owner: "Productivity Commission",
    period: "2025 – ongoing",
    title: "Five Pillars of Productivity Inquiries – Final Reports",
    summary: [
      "The Productivity Commission has provided 47 recommendations across ‘five pillars’ of productivity policy:",
      "At the time of drafting this report, the Australian Government is yet to provide response to the recommendations.",
      "The recommendations of this report provided important context for developing stakeholder engagement material for the 2026 Corrections Workforce Insights Report. Public Skills Australia substantially engaged with pillar two, building a skilled and adaptable workforce, and will continue to monitor the progress of these recommendations for future work.",
    ],
    priorities: [
      "creating a more dynamic and resilient economy",
      "building a skilled and adaptable workforce",
      "harnessing data and digital technology",
      "delivering quality care more efficiently",
      "investing in cheaper, cleaner energy and the net zero transformation",
    ],
  },
  {
    number: "12",
    owner: "Jobs and Skills Australia",
    period: "2025 – ongoing",
    title: "Opportunity and Productivity: Towards a Tertiary Harmonisation Roadmap Report",
    summary: [
      "This report seeks to articulate the benefits of a more harmonised tertiary sector and provides recommendations on how to create a sustainable pathway forward in collaboration with key stakeholders. It outlines 19 key recommendations, across three categories (enabling the tertiary harmonisation roadmap, early priorities for the roadmap and medium-term horizon roadmap priorities) to work towards a harmonised system that can tackle national challenges, address skilled workforce shortages and improve productivity.",
      "The report has provided insightful recommendations which have been utilised in stakeholder engagement for the development of the proposed project, Collaboration with HumanAbility to analyse recent updates to the CHC Community Services Training Package to identify contemporary practice that could inform future updates to the Community Corrections specialisations in the officers Certificate III and Certificate IV in Correctional Practice, which aims at addressing skilled workforce shortages in community corrections services through the analysis of recent training package updates.",
    ],
  },
  {
    number: "13",
    owner: "Jobs and Skills Australia",
    period: "2025 – ongoing",
    title: "Gender Economic Equality Study",
    summary: [
      "The Gender Economic Equality Study explored three challenges for the jobs and skills systems that contribute to gender economic inequality:",
      "The study was reported over three papers, with the third and final paper Speeding up progress towards gender economic equality being released in October 2025. This paper sets out 10 recommendations to address challenges in the jobs and skills system that perpetuate inequality and impact productivity:",
      "The recommendations of the paper have provided strategic and important goals for Public Skills Australia to work toward, and have been influential in projects undertaken in 2025-2026, such as the Workforce Lifecycle Project, by providing context on priority cohorts to improve gender equality across the jobs and skills systems.",
    ],
    priorities: [
      "occupational segregation",
      "pay gaps and gendered divides in education",
      "training and skills systems",
    ],
    recommendations: [
      "Deliver a three-year ‘Shifting the Dial on Gender Segregation’ action and evaluation agenda",
      "Introduce early career learning into schools to intervene earlier in gendered study choices",
      "Embed gender targets and reporting across future National Skills Agreements",
      "Coordinate national action to reduce gender segregation in VET pathways for shortage occupations",
      "Support First Nation women through a standalone economy-wide plan",
      "Accelerate inclusive, safe and respectful workplaces and training settings",
      "Normalise men’s participation in paid and unpaid care work",
      "Adopt the Gender Segregation Intensity Scale (GSIS) to guide and measure progress",
      "Further address gender bias in labour market and skills frameworks",
      "Expand research, data and intersectional analysis to strengthen accountability",
    ],
  },
  {
    number: "14",
    owner: "Jobs and Skills Australia",
    period: "Ongoing",
    title: "Occupational Shortage List",
    summary: [
      "The Occupational Shortage List (OSL), which was formerly the Skills Priority List, offers an annual point-in-time review of the status of Australian occupations. Specifically, the OSL reports on whether occupations (at the 4-digit and 6-digit ANZSCO level and the 6-digit OSCA level) are experiencing shortages nationally and for each State and Territory in regional or metropolitan areas.",
      "The OSL was last updated in 2025. The latest list differed from previous iterations due to the fact that in 2024 the ANZSCO classification framework for occupations was replaced with the OSCA framework. In terms of the 2025 OSL results, it was reported that 29 per cent of occupations (293 out of 1022 assessed) were in national shortage, which was 4 per cent lower than 2024 (33 per cent) and more than 7 per cent lower than 2023 (36 per cent). The OSL in 2025 also added 29 occupations newly in shortage compared to 2024, most of which were roles related to health, science, technicians and trades and machinery operators and drivers. As at February 2026, JSA had started the 2026 OSL survey but it had not yet confirmed a publication date for this year’s list.",
      "The OSL provided important context for stakeholder consultation preparation for the 2026 Corrections Workforce Insights Report. This list indicates, on a national level, where specific occupation gaps currently exist and enabled Public Skills Australia to pursue engagements with Correctional Services stakeholders on whether these demands exist within their contexts.",
    ],
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
  const detailRef = React.useRef<HTMLElement>(null);
  const initiativeListRef = React.useRef<HTMLDivElement>(null);
  const initiative = initiatives[activeIndex];

  React.useEffect(() => {
    const list = initiativeListRef.current;
    const selected = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !selected) return;
    const bounds = list.getBoundingClientRect();
    const item = selected.getBoundingClientRect();
    if (item.top < bounds.top || item.bottom > bounds.bottom) {
      list.scrollTop += item.top - bounds.top;
    }
  }, [activeIndex]);
  const showInitiative = (index: number) => {
    setActiveIndex((index + initiatives.length) % initiatives.length);
    window.requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased selection:bg-[#B2DB79]">
      <ReportHeader slug={slug} report={report} currentPage="federal_initiatives" />

      <main className="mx-auto w-full max-w-[1504px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="federal_initiatives"
          prev={{ label: "Existing Industry-Sector Strategies", href: `/reports/${slug}/existing_strategies` }}
          next={{ label: "Looking Forward", href: `/reports/${slug}/looking_forward` }}
          prevPrefix=""
        />

        <section className="flex min-h-[298px] flex-col justify-between gap-6 rounded-[14px] border border-[#E9EAEB] bg-white p-6 animate-slide-up motion-reduce:animate-none lg:flex-row lg:items-center">
          <div className="min-w-0">
            <span className="inline-flex rounded-full bg-[#424996] px-3 py-1 text-xs font-semibold text-white">
              Workforce Strategies
            </span>
            <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-[40px]">
              Commonwealth Government Initiatives
            </h1>
            <p className="mt-4 max-w-4xl text-sm leading-6">
              Public Skills Australia&apos;s work is informed and guided by the Federal Government
              initiatives detailed below.
            </p>
          </div>
          <Image src="/images/reports/correctional-federal-initiatives-group-88.svg" width={512} height={250} alt="" className="h-auto w-full max-w-[512px] shrink-0 animate-zoom-in motion-reduce:animate-none lg:w-[360px] xl:w-[512px]" />
        </section>

        <div className="sticky top-[60px] z-30 flex h-24 flex-col justify-center gap-2 rounded-[14px] border border-[#E9EAEB] bg-[#FAFAF0] p-3 lg:hidden">
          <label htmlFor="commonwealth-initiative" className="text-sm font-semibold text-[#598303]">Selected Commonwealth initiative</label>
          <select id="commonwealth-initiative" aria-label="Select Commonwealth initiative" value={activeIndex} onChange={(event) => showInitiative(Number(event.target.value))} className="w-full min-w-0 rounded-lg border border-[#598303] bg-white p-2 text-sm focus-visible:outline-2 focus-visible:outline-[#598303]">
            {initiatives.map((item, index) => <option key={item.number} value={index}>{item.number} - {item.title}</option>)}
          </select>
        </div>

        <section className="grid items-start gap-6 lg:grid-cols-[minmax(280px,400px)_minmax(0,1fr)]">
          <nav aria-label="Commonwealth Government initiatives" className="sticky top-[76px] hidden min-w-0 rounded-[14px] bg-[#FAFAF0] lg:block">
            <p className="border-b border-[#E9EAEB] px-3 py-3 text-sm font-semibold text-[#598303]">Selected initiative {initiative.number}</p>
            <div ref={initiativeListRef} className="max-h-[calc(100dvh-144px)] space-y-2 overflow-y-auto overscroll-contain p-1">
              {initiatives.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => showInitiative(index)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex min-h-[140px] w-full items-center justify-between gap-4 rounded-[14px] border px-6 py-5 text-left transition-[transform,box-shadow,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#598303] motion-reduce:transition-none ${
                      isActive
                        ? "border-2 border-[#598303] bg-[#F0F3E5]"
                        : "border-[#E9EAEB] bg-white hover:-translate-y-1 hover:shadow-md"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-[#598303]">
                        {item.number} · {item.owner}
                      </span>
                      <strong className="mt-5 block text-lg font-semibold leading-6">
                        {item.title}
                      </strong>
                    </span>
                    <span className={`grid size-10 shrink-0 place-items-center rounded-full ${isActive ? "border border-[#9AB954] bg-white" : "bg-[#8AC900]"}`} aria-hidden="true">
                      <ArrowRight size={18} />
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          <article ref={detailRef} key={activeIndex} className="min-w-0 scroll-mt-[172px] lg:scroll-mt-[76px] rounded-[14px] bg-[#E6E9DF] p-6 animate-content-switch motion-reduce:animate-none" aria-live="polite">
            <div data-initiative-heading className="sticky top-[156px] z-20 rounded-[14px] bg-[#E6E9DF] pb-4 pt-2 lg:top-[76px]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="inline-flex max-w-full rounded-full bg-[#598303] px-5 py-3 text-sm font-semibold text-white">
                {initiative.number} · {initiative.owner}{!["04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"].includes(initiative.number) && ` ${initiative.period}`}
              </span>
                {activeIndex === initiatives.length - 1 ? <Link
                  href={`/reports/${slug}/looking_forward`}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-[#8AC900] px-5 text-sm font-semibold transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#598303] motion-reduce:transition-none"
                >
                  Next <ArrowRight size={17} />
                </Link> : <button
                  type="button"
                  onClick={() => showInitiative(activeIndex + 1)}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-[#8AC900] px-5 text-sm font-semibold transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#598303] motion-reduce:transition-none"
                >
                  Next <ArrowRight size={17} />
                </button>}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <h2 className="max-w-[720px] text-xl font-semibold leading-8">{Number(initiative.number)}. {initiative.title}</h2>
              <span className="rounded-full bg-[#E6E9DF] px-5 py-2 text-sm text-[#535862]">{initiative.period}</span>
            </div>
            </div>

            <div className="mt-6 rounded-[14px] bg-[#FAFAF0] p-6 sm:p-8">


              <div className="mt-7">
                <h3 className="text-lg font-medium text-[#598303]">SUMMARY</h3>
                <div className="mt-3 space-y-3 text-sm leading-6 text-[#535862]">
                  {(Array.isArray(initiative.summary) ? initiative.summary : [initiative.summary]).map((paragraph, paragraphIndex) => (
                    <React.Fragment key={paragraph}>
                      <p>{paragraph}</p>
                      {paragraphIndex === 0 && "priorities" in initiative && initiative.priorities && (
                        <ul className="list-disc pl-5">
                          {initiative.priorities.map((priority) => <li key={priority}>{priority}</li>)}
                        </ul>
                      )}
                      {paragraphIndex === 1 && "recommendations" in initiative && initiative.recommendations && (
                        <ol className="list-decimal pl-5">
                          {initiative.recommendations.map((recommendation) => <li key={recommendation}>{recommendation}</li>)}
                        </ol>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
