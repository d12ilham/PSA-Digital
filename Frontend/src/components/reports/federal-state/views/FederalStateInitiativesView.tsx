"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

interface Report {
  id: string;
  title: string;
  slug: string;
  status: string;
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: { label: string };
}

const closingTheGap = {
  title: "National Agreement on Closing the Gap (Closing the Gap)",
  source: "National Cabinet (Formerly Council of Australian Governments)",
  period: "2020 – 2031",
  paragraphs: [
    "Closing the Gap is a commitment from all Australian governments and First Nation peoples representatives, to a fundamentally new way of developing and implementing policies and programs that impact the lives of First Nations peoples. This includes policies and programs impacting recruitment, health and social programs specific to First Nations peoples, which are relevant to the Public Safety and Government industry-sectors.",
    "Closing the Gap is jointly implemented by the Federal, State and Territory governments, along with Australian Local Government Associations and Coalitions of Peaks. It focuses on four priority reforms (strengthen formal partnerships and shared decision making; build the community-controlled sector; transform government organisations; and shared access to data) and 19 national socio-economic targets, covering areas such as life expectancy, education, employment, justice and child protection. Overall progress towards meeting Closing the Gap targets has been mixed. Implementation of Closing the Gap is ongoing to 2031. The Productivity Commission is tracking these targets.",
    "Closing the Gap performs a substantive role in informing Public Skills Australia’s research and engagement efforts. Closing the Gap informed stakeholder consultation preparation as part of engagement for the 2026 Federal and State/Territory Government Workforce Insights Report.",
  ],
};

const strategicPriorities = {
  title: "The Australian Government’s Strategic Priorities",
  source: "Department of the Prime Minister and Cabinet",
  period: "2022 – 2026",
  paragraphs: [
    "The Australian Government’s strategic priorities provide a four-year (2022-2026) policy direction for the APS and sets targets across key areas. These areas include the economy, public health and climate change.",
    "The Australian Government’s strategic priorities are into the final year of their implementation by the Department of Prime Minister and Cabinet with relevant APS departments and organisations. So far the Strategic Priorities, which have not been placed on set timelines, have achieved several outcomes, including hosting a Jobs and Skills Summit, developing a plan for cheaper child care, implementing fee-free TAFE and creating more university places, establishing the National Reconstruction Fund, introducing legislation for a national anti-corruption commission and strengthening strategic partnerships in the Pacific and South East Asia. Progress is still required for public health and aged care, improving housing supply and planning reforms and advancing government budget sustainability.",
    "The “strong inclusive and sustainable economy” priority informed Public Skills Australia’s approach to the 2026 Federal and State/Territory Government Workforce Insights Report and provided important context for stakeholder consultation preparation. These priorities also supported the development of the Identify future skills needs for Federal and State/Territory Government project.",
  ],
};

const workingForWomen = {
  title: "Working for Women – A Strategy for Gender Equality",
  source: "Australian Government – Minister for Women",
  period: "2023 – ongoing",
  paragraphs: [
    "Working for Women is the Australian Government’s national strategy for gender equality. It informs workforce inclusivity priorities across the Public Safety and Government industry-sectors.",
    "The Strategy sets five priority areas, with progress reported annually. Priority Area 3 focuses on economic equality and security, including gender pay gaps, access to skills and training, and reducing occupational and industrial gender segregation. The Advancing Gender Equality in Gender Segregated Industries grant program supports this work.",
    "These priorities provide context for Public Skills Australia’s research and stakeholder engagement on participation, career pathways and workforce capability in Federal and State/Territory Government.",
  ],
};

const cleanEnergyGeneration = {
  title: "The Clean Energy Generation: Workforce needs for a Net Zero Economy",
  source: "Jobs and Skills Australia",
  period: "2023 – 2025",
  paragraphs: [
    "This series of reports considers emerging and future clean-energy workforce requirements as Australia strives to reach net-zero emissions by 2050. JSA’s preliminary modelling estimates Australia’s clean-energy workforce will need to grow from the current 53,000 employees to 84,000 employees by 2050.",
    "The report makes 50 recommendations to support governments in focusing their efforts on how skills shortages can be averted in the set time, resources and legislative constraints and government objectives. Broadly, the recommendations cover the issue areas of participation and attraction, hiring and retention, transitioning employees and communities, roles and responsibilities, critical occupations, education and training and transport. Implementation remains ongoing and long-term, aligned with the 2050 net-zero target.",
    "This series of reports, specifically, the recommendations made within the reports, informed preparation for stakeholder consultation as part of research and engagement for the 2026 Federal and State/Territory Government Workforce Insights Report. These recommendations provided context on where skilling and occupational priorities may exist in Federal, State and Territory Government workforces.",
  ],
};

const cyberSecurityStrategy = {
  title: "Australian Cyber Security Strategy",
  source: "Department of Home Affairs",
  period: "2023 – 2030",
  paragraphs: [
    "The 2023-2030 Australian Cyber Security Strategy serves as a roadmap to achieve the Australian Government’s vision of becoming a world leader in cyber security by 2030.",
    "The Strategy is structured around six ‘cyber shields’ (strong citizens and businesses, safe technology, world-class threat sharing, protected critical infrastructure, sovereign capability and resilient regional/global leadership). These are to be delivered in three stages or ‘Horizons’ (2023-2025 strengthening the foundations, 2026-2028 scaling efforts across the whole economy and 2029-2030 leading the development of new cyber technologies). Progress to date has been on the foundational aspects of the Strategy, with the initial work under ‘Horizon 1’ (2023-2025) concentrating on improving incident reporting and response mechanisms, introducing legislative reforms, piloting threat-sharing initiatives and raising government and critical infrastructure security standards. Overall coordination sits with the Department of Home Affairs, specifically through the Australian Cyber Security Coordinator. The remaining two horizons are to be implemented over the next four years up to 2030.",
    "This ongoing cyber security work provided important contextual background for stakeholder consultation preparation for the 2026 Federal and State/Territory Government Workforce Insights Report and informed the need for the Identify future skills needs for Federal and State/Territory Government. Specifically, cyber security roles are identified as a current critical skills need, and there is a requirement to determine whether this demand will persist into the medium to long-term future.",
  ],
};

const unlockingVET = {
  title: "Unlocking the Potential of VET",
  source: "Qualification Reform Design Group",
  period: "2024",
  paragraphs: [
    "In March 2024, the Qualification Reform Design Group (QRDG) provided advice to Skills Ministers on reforming the VET qualifications system. This included advising that:",
    "As a result, Public Skills Australia undertook a Demonstration Project that consulted widely to determine the efficacy of updating qualification and unit of competency templates. This report was delivered to the QRDG in Q3 2024.",
    "In December 2024, the QRDG provided their final report and recommendations to Skills Ministers, based on national consultation and findings from the JSC Demonstration Projects. The recommendations from this report centred around modernising VET qualifications by implementing a purpose-led, principles-based approach to qualification design. As a result, JSCs are responsible for ensuring qualifications serve a clear purpose, are linked to workforce needs and are not unnecessarily duplicated.",
    "The ongoing work of the QRDG regarding qualification reform continues to inform the method and intended outcomes for both the Review of Government Investigations Qualifications and Review of Procurement and Contracting Qualifications projects.",
  ],
};

const occupationClassification = {
  title: "Occupation Standard Classification for Australia",
  source: "Australian Bureau of Statistics",
  period: "2024 – ongoing",
  paragraphs: [
    "Formerly known as the Australia New Zealand Standard Classification of Occupation (ANZSCO), the Occupation Standard Classification for Australia (OSCA) is a standardised framework for classifying occupations in Australia. As part of the replacement process from ANZSCO to OSCA in 2024, the ABS announced that OSCA will undergo regular updates in accordance with the OSCA Maintenance Strategy, which was released in 2025.",
    "Changes to OSCA outlined in the Maintenance Strategy involve stakeholder engagement and are timed to ensure that each Census of Population and Housing uses the most recent update. Under the Strategy, the first round of consultations and feedback with stakeholders on proposed changes to OSCA are scheduled to be completed in August 2026, with the next update to be published in March 2027 before the data release of the 2026 Census in October 2027.",
    "Public Skills Australia continues to utilise, where possible, the most contemporary version of OSCA to ensure our occupational insights remain relevant and in-line with whole-of-economy standards.",
  ],
};

const coreSkillsOccupationList = {
  title: "2024 Core Skills Occupation List – Key Findings Report",
  source: "Jobs and Skills Australia",
  period: "2024 – ongoing",
  paragraphs: [
    "The Core Skills Occupation List (CSOL) provides labour market analysis that informs the identification of occupations that are considered appropriate for employer-sponsored temporary migration through the Core Skills Stream of the Skills in Demand (SID) visa.",
    "The 2024 CSOL Key Findings Report compiled a list of 456 occupations considered appropriate for the Core Skills Stream of the new employer-sponsored temporary SID visa. In addition to updating the list, JSA examined the drivers of skill shortages through CSOL analysis and stakeholder engagement and identified a ‘suitability gap’ category – occupations where there are enough qualified applicants, but they are not regarded as suitable by employers (e.g. auditors, electronics engineers, software and applications programmers). JSA also identified a ‘retention gap’ category – occupations with below-average rates of retention such as construction and hospitality jobs and child carers. JSA’s consultations to inform the 2025 CSOL opened in August 2025 and JSA submitted its advice to Government for consideration in October 2025.",
    "In conjunction with the Jobs and Skills Australia Occupational Shortage List, the CSOL (specifically the 2025 CSOL Targeted for Consultation Group) provided important context for stakeholder consultation preparation for the 2026 Federal and State/Territory Government Workforce Insights Report. These lists indicate on a national level where specific occupation demands currently exist and enabled Public Skills Australia to proactively pursue conversations with Federal, State and Territory Government stakeholders on whether these demands exist within their contexts.",
  ],
};

const betterTogether = {
  title: "Better Together – The Jobs and Skills Report 2024",
  source: "Jobs and Skills Australia",
  period: "2024 – ongoing",
  paragraphs: [
    "Better Together was released in November 2024 as part of JSA’s mandated obligations to provide insight on the Australian labour market and advice on workforce needs and priorities. It details evidence aligned to five strategic pillars to enable a more prosperous economic future, including:",
    "Better Together outlines JSA’s key current and emerging datasets that provide useful insights on the intricacies of Australia’s labour market for use in development of strategic workforce planning for the JSCs. Please note JSA released an updated version of this iterative report in November 2025, Connecting for impact – The Jobs and Skills Report 2025, which will inform the 2027 Workforce Insights Reports.",
    "The outcomes of Better Together provided important context on whole-of-economy skilling and training needs. Specific to the 2026 Federal and State/Territory Government Workforce Insights Report, these outcomes informed the development of the Identify future skills needs for Federal and State/Territory Government proposed workforce strategy that aims to ensure this industry-sector maintains a future-ready workforce.",
  ],
};

const betterTogetherPillars = [
  "Fostering inclusive participation: Focused on broadening employment opportunities through identifying and removing barriers for people and communities.",
  "Understanding today’s workforce: Detailing data to build an evidence base that informs and addresses current and emerging labour market and skills needs.",
  "Shaping Australia’s future workforce: Projecting forward to plan for the opportunities and challenges of Australia’s future workforce needs.",
  "Optimising pathways and system architecture: Monitoring, analysing and advising on the effectiveness of the VET system as key to skilling the workforce.",
  "Activating an informed dialogue: Detailing stakeholder engagement across the VET system to provide the best evidence and advice on Australia’s current and future workforce and skills needs and opportunities.",
];

const trainingPackageOrganisingFramework = {
  title: "Training Package Organising Framework",
  source: "Skills and Workforce Ministerial Council",
  period: "2025 – ongoing",
  paragraphs: [
    "In July 2025, the Training Package Organising Framework (TPOF) was updated based on advice from the QRDG in December 2024. Housing the Training Package Products Development and Endorsement Process Policy (TPPDEPP), Training Package Products Policy (TPPP) and the Standards for Training Packages, the TPOF, sets out the process for developing and seeking approval of new VET training products for JSCs. As a JSC, Public Skills Australia will continue to adhere to the TPOF to ensure the Australian VET system is high-performing and readily supports student and industry needs.",
    "The updated TPOF provides specific guidance to all projects that may result in changes to any training products. This includes both 2025 strategies, Review of Government Investigations Qualifications and Review of Procurement and Contracting Qualifications.",
  ],
};

const productivityInquiries = {
  title: "Five Pillars of Productivity Inquiries – Final Reports",
  source: "Productivity Commission",
  period: "2025 – ongoing",
  paragraphs: [
    "The Productivity Commission has provided 47 recommendations across ‘five pillars’ of productivity policy:",
    "At the time of drafting this report, the Australian Government is yet to provide response to the recommendations.",
    "The recommendations from this report provided important context for preparing for stakeholder consultation and informed the need for the proposed Identify future skills needs for Federal and State/Territory Government project. Specifically, Public Skills Australia acknowledges the importance of aligning the future skills needs of the Federal, State and Territory Government to whole-of-economy productivity goals.",
  ],
};

const productivityPillars = [
  "Creating a more dynamic and resilient economy",
  "Building a skilled and adaptable workforce",
  "Harnessing data and digital technology",
  "Delivering quality care more efficiently",
  "Investing in cheaper, cleaner energy and the net zero transformation",
];

const tertiaryHarmonisationRoadmap = {
  title: "Opportunity and Productivity: Towards a Tertiary Harmonisation Roadmap Report",
  source: "Jobs and Skills Australia",
  period: "",
  paragraphs: [
    "The Opportunity and Productivity: Towards a tertiary Harmonisation Roadmap Report seeks to articulate the benefits of a more harmonised tertiary sector and provides recommendations on how to create a sustainable pathway forward in collaboration with key stakeholders. It outlines 19 key recommendations, across three categories (enabling the tertiary harmonisation roadmap, early priorities for the roadmap and medium-term horizon roadmap priorities) to work towards a harmonised system that can tackle national challenges, address skilled workforce shortages and improve productivity.",
    "This Report provided important context in preparation for stakeholder consultation for the 2026 Federal and State/Territory Government Workforce Insights Report through its emphasis on productivity, improved student experience and enhancing inflows of appropriately skilled individuals into the workforce.",
  ],
};

const genderEconomicEqualityStudy = {
  title: "Gender Economic Equality Study",
  source: "Jobs and Skills Australia",
  period: "2025 – ongoing",
  paragraphs: [
    "The Gender Economic Equality Study explored three challenges for the jobs and skills systems that contribute to gender economic inequality:",
    "The study was reported over three papers, with the third and final paper Speeding up progress towards gender economic equality being released in October 2025. This paper sets out 10 recommendations to address challenges in the jobs and skills system that perpetuate inequality and impact productivity:",
    "Like the Working for Women strategy, the Gender Economic Equality Study has directly informed the requirement for, and development of, the proposed strategy Identify future skills needs for Federal and State/Territory Government. This work will seek opportunities to identify where any gender-based differences in future skills requirements may exist.",
  ],
};

const genderEconomicChallenges = [
  "occupational segregation",
  "pay gaps and gendered divides in the education",
  "training and skills systems",
];

const genderEconomicRecommendations = [
  "Deliver a three-year 'Shifting the Dial on Gender Segregation' action and evaluation agenda",
  "Introduce early career learning into schools to intervene earlier in gendered study choices",
  "Embed gender targets and reporting across future National Skills Agreements",
  "Coordinate national action to reduce gender segregation in VET pathways for shortage occupations",
  "Support First Nation women through a standalone economy-wide plan",
  "Accelerate inclusive, safe and respectful workplaces and training settings",
  "Normalise men's participation in paid and unpaid care work",
  "Adopt the Gender Segregation Intensity Scale (GSIS) to guide and measure progress",
  "Further address gender bias in labour market and skills frameworks",
  "Expand research, data and intersectional analysis to strengthen accountability",
];

const vetRecommendations = [
  "Qualification and unit of competency design and development processes should be reviewed and updated where appropriate.",
  "The VET system should be consolidated by removing training products that are underutilised or unnecessarily duplicated.",
  "The Training Package Organising Framework should be updated, where necessary.",
];

const occupationalShortageList = {
  title: "Occupational Shortage List",
  source: "Jobs and Skills Australia",
  period: "Ongoing",
  paragraphs: [
    "The Occupational Shortage List (OSL), which was formerly the Skills Priority List, offers an annual point-in-time review of the status of Australian occupations. Specifically, the OSL reports on whether occupations (at the 4-digit and 6-digit ANZSCO level, and the 6-digit OSCA level) are experiencing shortages nationally and for each state and territory in regional or metropolitan areas.",
    "The OSL was last updated in 2025. The latest OSL differed from previous iterations due to the fact that in 2024 the ANZSCO classification framework for occupations was replaced with the OSCA framework. In terms of the 2025 OSL results, it was reported that 29 per cent of occupations (293 out of 1022 assessed) were in national shortage, which was 4 per cent lower than 2024 (33 per cent) and more than 7 per cent lower than 2023 (36 per cent). The OSL in 2025 also added 29 occupations newly in shortage compared to 2024, most of which were roles related to health, science, technicians and trades and machinery operators and drivers. As of February 2026, JSA had started the 2026 OSL survey but it had not yet confirmed a publication date for this year's list.",
    "The OSL provided important context for stakeholder consultation preparation for the 2026 Federal and State/Territory Government Workforce Insights Report. This list indicates on a national level where specific occupation demands currently exist and enabled Public Skills Australia to proactively pursue conversations with Federal, State and Territory Government stakeholders on whether these demands exist within their contexts.",
  ],
};

const initiatives = [
  closingTheGap,
  strategicPriorities,
  workingForWomen,
  cleanEnergyGeneration,
  cyberSecurityStrategy,
  unlockingVET,
  occupationClassification,
  coreSkillsOccupationList,
  betterTogether,
  trainingPackageOrganisingFramework,
  productivityInquiries,
  tertiaryHarmonisationRoadmap,
  genderEconomicEqualityStudy,
  occupationalShortageList,
];

export default function FederalStateInitiativesView({ slug, report }: { slug: string; report: Report }) {
  const [selected, setSelected] = useState(0);
  const initiative = initiatives[selected];

  return <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
    <ReportHeader slug={slug} report={report} currentPage="federal_initiatives" />
    <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 px-4 py-5 sm:px-6 lg:px-8">
      <ReportNavButtons slug={slug} currentPage="federal_initiatives" prev={{ label: "Existing Industry-Sector Strategies", href: `/reports/${slug}/existing_strategies` }} next={{ label: "2027 and Beyond", href: `/reports/${slug}/looking_forward` }} prevPrefix="" />
      <header className="animate-slide-up rounded-md border border-[#ECECE5] bg-white px-5 py-6 motion-reduce:animate-none sm:px-6 sm:py-7">
        <span className="inline-flex rounded-full bg-[#754D32] px-4 py-1.5 text-[11px] font-medium text-white">Workforce Strategies</span>
        <h1 className="mt-5 text-[30px] font-bold leading-tight sm:text-[38px]">Federal Government Initiatives</h1>
        <p className="mt-4 text-xs leading-6">Public Skills Australia&apos;s work is informed and guided by the Federal Government initiatives detailed in the table below.</p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(240px,0.28fr)_minmax(0,0.72fr)]">
        <nav aria-label="Federal Government initiatives" className="space-y-2">
          {initiatives.map((item, index) => <button key={item.title} type="button" onClick={() => setSelected(index)} aria-current={selected === index ? "page" : undefined} style={{ animationDelay: `${0.08 + index * 0.055}s` }} className={`animate-card-entrance group flex min-h-[114px] w-full items-center justify-between gap-4 rounded-md border px-5 py-4 text-left transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:animate-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754D32] ${selected === index ? "border-[#698C1C] bg-[#EBEEDB] ring-1 ring-[#698C1C] hover:bg-[#E4EACB] hover:shadow-sm" : "border-[#ECECE5] bg-white hover:border-[#698C1C] hover:bg-[#F5F7EA] hover:shadow-sm"}`}>
            <span className="min-w-0">
              <span className="block text-xs leading-5 text-[#54710F]">{String(index + 1).padStart(2, "0")} · {item.source}</span>
              <span className="mt-4 block text-base font-semibold leading-6">{item.title}</span>
            </span>
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${selected === index ? "border border-[#94AF59] bg-white" : "bg-[#8AC900]"}`}><ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
          </button>)}
        </nav>

        <section aria-live="polite" className="animate-card-entrance rounded-md bg-[#E5E8DC] p-4 motion-reduce:animate-none sm:p-6" style={{ animationDelay: "0.18s" }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex max-w-full rounded-full bg-[#5A8900] px-5 py-2 text-xs font-medium text-white">{String(selected + 1).padStart(2, "0")} · {initiative.source}{selected < 3 && initiative.period ? ` ${initiative.period}` : ""}</span>
            <div className="flex items-center gap-2">
              {selected > 0 && <button type="button" onClick={() => setSelected(selected - 1)} aria-label="Previous initiative" className="inline-flex h-10 items-center gap-2 rounded-full border border-[#B2DB79] bg-[#FAFAF0] px-4 text-xs font-semibold transition-[background-color,box-shadow] hover:bg-white hover:shadow-sm"><ArrowLeft className="h-4 w-4" /> Previous</button>}
              {selected < initiatives.length - 1 && <button type="button" onClick={() => setSelected(selected + 1)} className="inline-flex h-10 items-center gap-2 rounded-full bg-[#8AC900] px-5 text-xs font-semibold transition-[background-color,box-shadow] hover:bg-[#9BDC16] hover:shadow-sm">Next <ArrowRight className="h-4 w-4" /></button>}
            </div>
          </div>
          <article key={selected} className="animate-content-switch mt-5 rounded-md bg-[#FAFAF0] p-6 ring-1 ring-transparent transition-[box-shadow] hover:shadow-sm hover:ring-[#B5CA8F] motion-reduce:animate-none sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 sm:flex-nowrap">
              <h2 className="min-w-0 flex-1 text-lg font-bold leading-7">{selected + 1}. {initiative.title}</h2>
              {initiative.period && <span className="shrink-0 rounded-full bg-[#E5E8DC] px-5 py-1.5 text-xs text-[#696969]">{initiative.period}</span>}
            </div>
            <h3 className="mt-7 text-lg font-medium text-[#5A8900]">SUMMARY</h3>
            <div className="mt-3 space-y-4 text-sm leading-6 text-[#696969]">{initiative.paragraphs.map((paragraph, index) => <div key={paragraph} className="animate-content-switch motion-reduce:animate-none" style={{ animationDelay: `${0.08 + index * 0.1}s` }}>
              <p>{paragraph}</p>
              {selected === 5 && index === 0 && <ul className="mt-3 list-disc space-y-1 pl-6">{vetRecommendations.map((recommendation) => <li key={recommendation}>{recommendation}</li>)}</ul>}
              {selected === 8 && index === 0 && <ul className="mt-3 list-disc space-y-1 pl-6">{betterTogetherPillars.map((pillar) => <li key={pillar}>{pillar}</li>)}</ul>}
              {selected === 10 && index === 0 && <ul className="mt-3 list-disc space-y-1 pl-6">{productivityPillars.map((pillar) => <li key={pillar}>{pillar}</li>)}</ul>}
              {selected === 12 && index === 0 && <ul className="mt-3 list-disc space-y-1 pl-6">{genderEconomicChallenges.map((challenge) => <li key={challenge}>{challenge}</li>)}</ul>}
              {selected === 12 && index === 1 && <ol className="mt-3 list-decimal space-y-1 pl-7">{genderEconomicRecommendations.map((recommendation) => <li key={recommendation}>{recommendation}</li>)}</ol>}
            </div>)}</div>
          </article>
        </section>
      </div>
    </main>
    <ReportFooter contactUrl={report?.contactUrl} />
  </div>;
}
