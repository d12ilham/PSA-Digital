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

const strategies = [
  { source: "Federal and State/Territory Public Service Commissions or equivalent", title: "State of the Service Reports" },
  { source: "Australian Public Service Commission", title: "APS Reform Program" },
  { source: "New South Wales Public Service Commission", title: "NSW Public Service Commission Strategic Workforce Planning Framework" },
  { source: "New South Wales Department of Education", title: "NSW Skills Plan 2024-28: Building Skills and Shaping Success" },
  { source: "NSW Public Service Commission", title: "NSW Aboriginal Employment Strategy 2019-2025" },
  { source: "Office of the Commissioner for Public Employment NT", title: "The Northern Territory Public Sector (NTPS) Workforce Strategy 2021-2026" },
  { source: "Jobs Queensland", title: "Grow Your Own Regional Workforce Program" },
  { source: "Queensland Public Sector Commission", title: "Queensland Government Workforce Planning: Agency Requirements" },
  { source: "Queensland Public Sector Commission", title: "Queensland Public Sector Commission Even Better Public Sector for Queensland Strategy" },
  { source: "Western Australia Public Sector Commission", title: "Leading with Impact: Strategic Plan" },
  { source: "Victorian Public Sector Commission", title: "Victorian Public Service Commission Strategic Plan" },
];

const reports = [
  "APSC State of the Service Report 2024-25",
  "ACT Government State of the Service Report 2024-25",
  "QLD Public Sector Commission State of the sector report 2025",
  "NSW Government Public Sector Report 2025",
  "Office of the Commissioner for Public Employment NT State of the Service Report 2024-25",
  "Office of the Commissioner for Public Sector Employment SA State of the Sector 2025",
  "Tasmanian Government State Service Workforce Report No 2 of 2025",
  "Victorian Public Sector Commission Workforce data (state of the public sector) 2025",
  "Public Sector Commission State of the WA Government Sector Workforce 2024-25",
];

export default function FederalStateExistingStrategiesFrameView({ slug, report }: { slug: string; report: Report }) {
  const [selected, setSelected] = useState(0);
  const strategy = strategies[selected];

  return <div className="fstg-existing-strategies-page flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
    <ReportHeader slug={slug} report={report} currentPage="existing_strategies" />
    <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 px-4 py-5 sm:px-6 lg:px-8">
      <ReportNavButtons slug={slug} currentPage="existing_strategies" prev={{ label: "2025 Project Updates", href: `/reports/${slug}/update_2025_strategies` }} next={{ label: "Federal Government Initiatives", href: `/reports/${slug}/federal_initiatives` }} prevPrefix="" />

      <header className="animate-slide-up rounded-md border border-[#ECECE5] bg-white px-5 py-6 sm:px-6 sm:py-7">
        <span className="inline-flex rounded-full bg-[#754D32] px-4 py-1.5 text-[11px] font-medium text-white">Workforce Strategies</span>
        <h1 className="mt-5 text-[30px] font-bold leading-tight sm:text-[38px]">Existing Industry-Sector Strategies</h1>
        <p className="mt-4 text-xs leading-6">Select a strategy to open its detail and how it informs Public Skills Australia&apos;s work.</p>
      </header>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(240px,0.31fr)_minmax(0,0.69fr)]">
        <nav aria-label="Existing industry-sector strategies" className="space-y-2">
          {strategies.map((item, index) => <button key={item.title} type="button" onClick={() => setSelected(index)} aria-current={selected === index ? "page" : undefined} style={{ animationDelay: `${0.1 + index * 0.07}s` }} className={`group animate-card-entrance flex min-h-[100px] w-full items-center justify-between gap-4 rounded-md border px-5 py-4 text-left transition-[border-color,background-color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754D32] ${selected === index ? "border-[#754D32] bg-[#EDE9DF] hover:shadow-sm" : "border-[#ECECE5] bg-white hover:border-[#754D32] hover:bg-[#F6F2E9] hover:shadow-md"}`}>
            <span className="min-w-0"><span className="block text-[11px] leading-5 text-[#694834]">{String(index + 1).padStart(2, "0")} · {item.source}</span><span className="mt-3 block text-sm font-semibold leading-5">{item.title}</span></span>
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 motion-safe:group-hover:scale-110 ${selected === index ? "border border-[#754D32] bg-white" : "bg-[#8AC900]"}`}><ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
          </button>)}
        </nav>

        <section aria-live="polite" className="animate-slide-up-delay rounded-md bg-[#EDE9DF] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex rounded-full bg-[#754D32] px-4 py-1.5 text-[11px] font-medium text-white">{String(selected + 1).padStart(2, "0")} · {strategy.source}</span>
            <div className="flex items-center gap-2">
              {selected > 0 && <button type="button" onClick={() => setSelected(selected - 1)} className="inline-flex items-center gap-2 rounded-full border border-[#B2DB79] bg-[#FAFAF0] px-5 py-2 text-xs font-semibold transition-[background-color,box-shadow] duration-300 hover:bg-white hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754D32]"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Previous</button>}
              {selected < strategies.length - 1 && <button type="button" onClick={() => setSelected(selected + 1)} className="inline-flex items-center gap-2 rounded-full bg-[#8AC900] px-5 py-2 text-xs font-semibold transition-[background-color,box-shadow] duration-300 hover:bg-[#9BDC16] hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754D32]">Next <ArrowRight aria-hidden="true" className="h-4 w-4" /></button>}
            </div>
          </div>
          <div key={selected} className="animate-content-switch mt-5 rounded-md bg-[#FAFAF0] p-5 text-xs leading-6 sm:p-6">
            <div className="flex items-start justify-between gap-3"><h2 className="min-w-0 flex-1 text-base font-bold">{selected + 1}. {strategy.title}</h2>{selected < 11 && <span className="shrink-0 whitespace-nowrap rounded-full bg-[#EDE9DF] px-4 py-1 text-[11px] text-[#696969]">{selected === 1 ? "2022 – 2025" : selected === 3 || selected === 8 ? "2024 – 2028" : selected === 4 ? "2019 – 2025" : selected === 5 ? "2021 – 2026" : selected === 6 ? "2022 – 2032" : selected === 9 || selected === 10 ? "2023 – 2026" : "Ongoing"}</span>}</div>
            {selected === 0 ? <>
              <h3 className="mt-6 text-sm font-medium text-[#694834]">SUMMARY</h3>
              <p className="mt-3">The Federal Government&apos;s APSC and each state and territory&apos;s Public Service Commission or equivalent prepares yearly reports on the state of the public sector, called State of the Service Reports (the Reports). These reports are requirements under individual Federal and State/Territory Public Sector Acts.</p>
              <p className="mt-1">Overall, these reports provide yearly data and insights about the public sector workforces in federal, state and territory public sectors, as well as any relevant workforce capability strategies or other relevant programs of work being undertaken to uplift the public sector.</p>
              <p className="mt-4">The latest 2024-25 reports are:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">{reports.map((name) => <li key={name}>{name}</li>)}</ul>
              <div className="mt-6 border-t border-[#D8D8D2] pt-6"><h3 className="text-sm font-medium text-[#694834]">How this informs Public Skills Australia&apos;s work</h3>
                <div className="mt-4 space-y-3"><div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">Consultation and engagement:</h4><p className="mt-2 text-[#696969]">These Reports informed consultations with Federal and State/Territory Government stakeholders, as well as providing workforce data and insights.</p></div>
                  <div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">2026 Workforce Strategies</h4><p className="mt-2 text-[#696969]">Identifying future skills needs for Federal and State/Territory Government Project will be informed by insights and plans contained within the Reports, explaining how governments will address the future priority skilling areas within the public sector. Further, First Nations Government Education Pathway, will be informed by the focus on diversity and inclusion targets and plans to improve participation, outlined within the Reports.</p></div></div>
              </div>
            </> : selected === 1 ? <>
              <h3 className="mt-6 text-sm font-medium text-[#694834]">SUMMARY</h3>
              <p className="mt-3">The Government&apos;s APS Reform Program (the Program) was established to strengthen the public service, under four pillars of public service transformation:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Pillar 1: The APS embodies integrity in everything it does</li>
                <li>Pillar 2: The APS puts people and business at the centre of policy and services</li>
                <li>Pillar 3: The APS is a model employer</li>
                <li>Pillar 4: The APS has the capability to do its job well</li>
                <li>In 2025 there was significant progress embedding key reform principles especially on investing in skills development and embracing digital technologies and AI to deliver services.</li>
              </ul>
              <div className="mt-6 border-t border-[#D8D8D2] pt-6"><h3 className="text-sm font-medium text-[#694834]">How this informs Public Skills Australia&apos;s work</h3>
                <div className="mt-4 space-y-3"><div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">Consultation and engagement:</h4><p className="mt-2 text-[#696969]">The Program provided information on the priorities for the APS that informed consultations, particularly in relation to where the APS is investing in capability uplift such as in digital technologies and AI.</p></div>
                  <div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">2026 Workforce Strategies</h4><p className="mt-2 text-[#696969]">Identifying future skills needs for Federal and State/Territory Government Project, will be informed by the initiatives being undertaken under the Program&apos;s Pillar Four: The APS has the capability to do its job well. These initiatives are focused on building a more effective and adaptable APS in the future.</p></div></div>
              </div>
            </> : selected === 2 ? <>
              <h3 className="mt-6 text-sm font-medium text-[#694834]">SUMMARY</h3>
              <p className="mt-3">The NSWPS Commission Strategic Workforce Planning Framework (the Framework) aims to assist agencies across the NSW Government sector to better understand and prepare for their future workforce needs.</p>
              <p className="mt-3">The Framework outlines a practical, principles-based approach to implementing strategic workforce planning, which can be tailored to meet the circumstances and workforce needs of individual agencies.</p>
              <p className="mt-3">The Framework has 5 stages of the planning cycle:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Align - align organisational strategy and Strategic Workforce Planning priorities</li>
                <li>Compare - compare options to achieve outcomes</li>
                <li>Identify - identify gaps</li>
                <li>Implement - develop and implement the plan</li>
                <li>Review - monitor, evaluate and revise</li>
              </ul>
              <div className="mt-6 border-t border-[#D8D8D2] pt-6"><h3 className="text-sm font-medium text-[#694834]">How this informs Public Skills Australia&apos;s work</h3>
                <div className="mt-4 space-y-3"><div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">Consultation and engagement:</h4><p className="mt-2 text-[#696969]">The Framework provided context on NSW Government&apos;s approach to strategic workforce planning, which informed Public Skills Australia&apos;s ongoing engagements with NSW stakeholders.</p></div>
                  <div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">2026 Workforce Strategies</h4><p className="mt-2 text-[#696969]">Capability gaps identified by NSWPS agencies during the workforce planning stage of the Framework will inform the project to identify future skills needs for Federal and State/Territory Government.</p></div></div>
              </div>
            </> : selected === 3 ? <>
              <h3 className="mt-6 text-sm font-medium text-[#694834]">SUMMARY</h3>
              <p className="mt-3">The NSW Skills Plan 2024-28: Building Skills and Shaping Success (the Plan), aligned with the Department of Education&apos;s &apos;Our Plan for Public Education&apos;, aims to strengthen the VET system and prepare the workforce for future challenges. The Plan focuses on essential skills in industries facing shortages, such as construction, digital, cyber and energy transition.</p>
              <p className="mt-3">The Plan has five strategic priorities:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Priority 1: Target skilling responses to government priorities</li>
                <li>Priority 2: Improve equitable outcomes, pathways and access for students</li>
                <li>Priority 3: Strengthen industry and employer partnerships and skills governance</li>
                <li>Priority 4: Build and support the NSW VET teaching workforce</li>
                <li>Priority 5: Drive system responsiveness and innovation</li>
              </ul>
              <div className="mt-6 border-t border-[#D8D8D2] pt-6"><h3 className="text-sm font-medium text-[#694834]">How this informs Public Skills Australia&apos;s work</h3>
                <div className="mt-4 space-y-3"><div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">Consultation and engagement:</h4><p className="mt-2 text-[#696969]">The Plan provided context on NSW&apos;s strategy to address skills shortages informing engagements, specifically those consultations relating to identifying future skills needs.</p></div>
                  <div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">2026 Workforce Strategies</h4><p className="mt-2 text-[#696969]">Identify future skills needs for Federal and State/Territory Government Project will be informed by the priority areas identified in the Plan. This Plan includes work being undertaken under Priority 1: Target skilling responses to government priorities, by the New South Wales Department of Education. This will include:</p><ul className="mt-2 list-disc space-y-1 pl-5 text-[#696969]"><li>Establishing new skills insights data assets as public resources to support future-focused planning and system stewardship.</li><li>Delivering and supporting 2,300 new apprenticeships and traineeships across the NSW public and Local Government sectors to enhance capacity and support diverse and equitable pathways.</li><li>Establishing 3 Technical and Further Education (TAFE) NSW Centres of Excellence supported by Australian Government funding, to provide high-quality and responsive training in Critical Skills Areas.</li></ul></div></div>
              </div>
            </> : selected === 4 ? <>
              <h3 className="mt-6 text-sm font-medium text-[#694834]">SUMMARY</h3>
              <p className="mt-3">The NSW Aboriginal Employment Strategy 2019-2025 (the Strategy) was developed to build a culturally safe and capable NSW public sector that reflects the communities it serves, and where First Nations employees feel supported, respected, valued and empowered to pursue their career aspirations.</p>
              <p className="mt-3">Initiatives in the 2024-25 Strategy focused on resources and initiatives to attract, retain and support a talented First Nations workforce and create inclusive and respectful workplaces for the First Nations workforce.</p>
              <p className="mt-3">An independent review of the Strategy has commenced to assist in developing a successor Strategy for 2026 to 2030.</p>
              <div className="mt-6 border-t border-[#D8D8D2] pt-6"><h3 className="text-sm font-medium text-[#694834]">How this informs Public Skills Australia&apos;s work</h3>
                <div className="mt-4 rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">Consultation and engagement:</h4><p className="mt-2 text-[#696969]">The Strategy provided context for engagements and consultations with government stakeholders from NSW.</p></div>
              </div>
            </> : selected === 5 ? <>
              <h3 className="mt-6 text-sm font-medium text-[#694834]">SUMMARY</h3>
              <p className="mt-3">The NTPS Workforce Strategy 2021-2026 (the Strategy) aims to enhance the public sector&apos;s ability to deliver policies and services effectively. The Strategy focuses on building workforce capability with an emphasis on adaptability and resilience.</p>
              <p className="mt-3">The Strategy has four goals:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Delivering Excellence</li>
                <li>Leadership and Culture</li>
                <li>Committed and Capable</li>
                <li>Planning for our Future</li>
              </ul>
              <p className="mt-3">As part of this Strategy, the Enterprise Work Experience Program supports talent pipeline development and fosters early interest in NTPS careers as it aims to increase student participation in Early Careers pathways.</p>
              <p className="mt-3">A full evaluation of the Strategy is expected in 2026, which will inform the development of the new Strategy from 2027 onwards.</p>
              <div className="mt-6 border-t border-[#D8D8D2] pt-6"><h3 className="text-sm font-medium text-[#694834]">How this informs Public Skills Australia&apos;s work</h3>
                <div className="mt-4 rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">Consultation and engagement:</h4><p className="mt-2 text-[#696969]">The strategy informed context on the NT&apos;s priorities relating to their future workforce, which further informed engagements and consultations.</p></div>
              </div>
            </> : selected === 6 ? <>
              <h3 className="mt-6 text-sm font-medium text-[#694834]">SUMMARY</h3>
              <p className="mt-3">The QLD Government&apos;s 2022-2025 Action Plan, Good People. Good Jobs: Queensland Workforce Strategy 2022-2032, includes the &apos;Grow Your Own (GYO) Regional Workforce Program&apos; (the Program). This Program supports local stakeholders to identify workforce needs and plan for the skills required in their sectors to support community and economic goals.</p>
              <p className="mt-3">To date the Program has provided $4.5 million in support to 20 locally led workforce development projects over a three-year period up to 2025. Some of the reported accomplishments are the delivery of multiple regional environmental scans, commencement of implementing workforce development plans, launch of new training partnerships and micro-credentials and funding of five industry identified action projects to address future regional skills needs. Implementation of the Program is ongoing, and Jobs Queensland has selected five action-based projects for funding which were identified by industry and were to be undertaken in 2025.</p>
              <div className="mt-6 border-t border-[#D8D8D2] pt-6"><h3 className="text-sm font-medium text-[#694834]">How this informs Public Skills Australia&apos;s work</h3>
                <div className="mt-4 space-y-3"><div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">Consultation and engagement:</h4><p className="mt-2 text-[#696969]">The Program provided context on the QLD Government&apos;s local workforce planning needs that informed engagements and consultations with QPS stakeholders.</p></div>
                  <div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">2026 Workforce Strategies</h4><p className="mt-2 text-[#696969]">Identifying future skills needs for Federal and State/Territory Government Project will be informed by this Program and will be used as a key part of the literature that informs this proposed project for research and development.</p></div></div>
              </div>
            </> : selected === 7 ? <>
              <h3 className="mt-6 text-sm font-medium text-[#694834]">SUMMARY</h3>
              <p className="mt-3">The QLD Government Workforce Planning: Agency Requirements (the Initiative) outlines what agencies in the Queensland Public Service need to do to meet their strategic workforce planning obligations. The Initiative provide support and resources, while also enabling the agencies to build strategic workforce plans that line up with both sector and agency strategic objectives and any legislative requirements.</p>
              <p className="mt-3">The Agency Planning Requirement Initiative for the 2026 planning period has been released.</p>
              <div className="mt-6 border-t border-[#D8D8D2] pt-6"><h3 className="text-sm font-medium text-[#694834]">How this informs Public Skills Australia&apos;s work</h3>
                <div className="mt-4 rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">Consultation and engagement:</h4><p className="mt-2 text-[#696969]">The Initiative provided context on Queensland Government&apos;s approach to workforce planning, specifically agency level requirements, which informed targeted engagements and consultations with various QLD government agencies. The ongoing Initiative will also inform future engagements with QLD Government stakeholder for future work at Public Skills Australia.</p></div>
              </div>
            </> : selected === 8 ? <>
              <h3 className="mt-6 text-sm font-medium text-[#694834]">SUMMARY</h3>
              <p className="mt-3">The &apos;Even Better Public Sector for Queensland&apos; Strategy (the Strategy) provides guidance and support to enabling the sector to deliver advice and services to a high standard, with a series of goals to be achieved in a 5-year period to provide leadership and stewardship to the QPS. The overall aim is for a strong foundation across agencies to be implemented to facilitate ongoing success in the QPS.</p>
              <p className="mt-3">The Strategy has three focus areas:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Focus area 1 - work</li>
                <li>Focus area 2 - workforce</li>
                <li>Focus area 3 - workplace</li>
              </ul>
              <p className="mt-3">Since the release of the Strategy, workforce planning on building and maintaining the sector&apos;s core internal capability has been undertaken and the following professions have been identified for initial focus: HR, Digital and Policy.</p>
              <div className="mt-6 border-t border-[#D8D8D2] pt-6"><h3 className="text-sm font-medium text-[#694834]">How this informs Public Skills Australia&apos;s work</h3>
                <div className="mt-4 space-y-3"><div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">Consultation and engagement:</h4><p className="mt-2 text-[#696969]">The Strategy provided context on QLD government&apos;s service delivery priorities which informed consultation with government stakeholders and identified key occupational areas of focus for the QPS.</p></div>
                  <div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">2026 Workforce Strategies</h4><p className="mt-2 text-[#696969]">Identifying future skills needs for Federal and State/Territory Government Project, will be informed by this Strategy&apos;s Focus Area 2 - Workforce: our people are ready to meet any challenge, which will focus on responding to the following challenges:</p><ul className="mt-2 list-disc space-y-1 pl-5 text-[#696969]"><li>increasing complex local and global needs,</li><li>skilling up for ongoing digital advancements, and</li><li>changing workforce demographics.</li></ul><p className="mt-2 text-[#696969]">These outcomes will further inform skills needs research for the Federal and State/Territory industry-sectors.</p></div></div>
              </div>
            </> : selected === 9 ? <>
              <h3 className="mt-6 text-sm font-medium text-[#694834]">SUMMARY</h3>
              <p className="mt-3">The WAPS Commission&apos;s Leading with Impact: Strategic Plan (the Plan) has a primary focus on how and where the Commission adds the most value in developing a high performing and future fit sector.</p>
              <p className="mt-3">The Plan has five strategic priorities:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Priority 1: High impact leadership</li>
                <li>Priority 2: Effective workforce management</li>
                <li>Priority 3: Strong agency and individual capability</li>
                <li>Priority 4: Embedding integrity</li>
                <li>Priority 5: Trusted and capable Commission</li>
              </ul>
              <div className="mt-6 border-t border-[#D8D8D2] pt-6"><h3 className="text-sm font-medium text-[#694834]">How this informs Public Skills Australia&apos;s work</h3>
                <div className="mt-4 space-y-3"><div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">Consultation and engagement:</h4><p className="mt-2 text-[#696969]">The Plan provided context on the strategic priorities of the WAPS which informed consultations with stakeholders and will further inform future consultations around building capability in the WAPS.</p></div>
                  <div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">2026 Workforce Strategies</h4><p className="mt-2 text-[#696969]">Identifying future skills needs for Federal and State/Territory Government Project will be informed by work under the Plan&apos;s Priority 3.2: Strong agency and individual capability - Introduce a systemic learning approach for the public sector to ensure contemporary knowledge and skills and respond to emerging capability needs.</p></div></div>
              </div>
            </> : selected === 10 ? <>
              <h3 className="mt-6 text-sm font-medium text-[#694834]">SUMMARY</h3>
              <p className="mt-3">The Victorian Public Sector Commission Strategic Plan (the Plan) builds on the priorities set out in the Victorian Public Sector Commission&apos;s (VPSC) previous strategy and maintains the core functions in accordance with the Public Administration Act 2004.</p>
              <p className="mt-3">The Plan is focused on four key outcomes:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>A values-based, innovative, effective and connected public sector</li>
                <li>A public sector that is apolitical, accountable and trusted</li>
                <li>A diverse, adaptable and high-performing workforce</li>
                <li>A capable and credible Commission that supports the Victorian public sector</li>
              </ul>
              <div className="mt-6 border-t border-[#D8D8D2] pt-6"><h3 className="text-sm font-medium text-[#694834]">How this informs Public Skills Australia&apos;s work</h3>
                <div className="mt-4 space-y-3"><div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">Consultation and engagement:</h4><p className="mt-2 text-[#696969]">The Plan provided context on the strategic directions of the VPS, which informed consultations with Victorian Government stakeholders.</p></div>
                  <div className="rounded-md border-l-[6px] border-[#754D32] bg-[#EDE9DF] p-5"><h4 className="font-medium">2026 Workforce Strategies</h4><p className="mt-2 text-[#696969]">Identifying future skills needs for Federal and State/Territory Government will be informed by work under the Plan on Outcome 3: A diverse, adaptable and high-performing workforce. This includes identifying and supporting pipeline critical capability needs such as improved recruitment of hard to fill roles.</p></div></div>
              </div>
            </> : <p className="mt-6 text-[#696969]">The detailed strategy content for this selection is covered by its subsequent Figma frame.</p>}
          </div>
        </section>
      </div>
    </main>
    <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
  </div>;
}
