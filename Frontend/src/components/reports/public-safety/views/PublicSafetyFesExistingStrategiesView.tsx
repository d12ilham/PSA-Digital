"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import layout from "./PublicSafetyDefenceStrategyUpdatesView.module.css";
import styles from "./PublicSafetyFesExistingStrategiesView.module.css";

const strategies = [
    { owner: "Department of Home Affairs", title: "National Disaster Risk Reduction Framework", period: "Department of Home Affairs 2018 – 2030" },
    { owner: "National Emergency Management Organisation (NEMA)", title: "Australian Disaster Recovery Framework", period: "National Emergency Management Organisation (NEMA) 2022 – ongoing" },
    { owner: "Australasian Fire and Emergency Services Authorities Council (AFAC)", title: "AFAC Strategic Plan 2023–2027", period: "Australasian Fire and Emergency Services Authorities Council (AFAC) 2023 – 2027" },
    { owner: "Volunteering Australia", title: "National Strategy for Volunteering 2023–2033", period: "Volunteering Australia 2023–2033" },
    { owner: "Champions of Change Coalition – Fire and Emergency Group", title: "Champions of Change Coalition – Fire and Emergency", period: "Champions of Change Coalition – Fire and Emergency Group 2025 – ongoing" },
];

const content = [
  {
    summary: <>
      <p>The National Disaster Risk Reduction Framework was developed as an advancement to the 2011 National Strategy for Disaster Resilience and in line with the global Sendai Disaster Risk Reduction 2015–2030. The framework was co-designed by all levels of government, industry and community representatives and intends to guide Australia&apos;s capability in reducing disaster risk associated with natural hazards.</p>
      <p>The four priorities of the framework are:</p>
      <ul>
        <li>Understand disaster risk</li>
        <li>Accountable decisions</li>
        <li>Enhanced investment</li>
        <li>Governance, ownership and responsibility</li>
      </ul>
      <p>In August 2023, the Second National Action Plan was endorsed by all Emergency Management Ministers and provides an update on how the National Disaster Risk Reduction Framework can continue to be implemented. Specifically, National Action 21 describes that Australia must better align recovery and resilience activities, governance, funding, policy and processes to support betterment and long-term disaster risk reduction.</p>
    </>,
    notes: [
      <>
        <p>Provided context and guidance on Australia&apos;s whole-of-society approach to disaster risk reduction, informing consultation with Fire and Emergency Services stakeholders.</p>
      </>,
      <>
        <p>Informed the development of:</p>
        <ul>
          <li>Volunteer Leadership Project</li>
          <li>Emergency Tree Operations</li>
          <li>Emerging Technologies Skills Review</li>
        </ul>
        <p>Specifically, all three strategies were informed by National Action 8 – Facilitate greater common emergency management sector professionalisation, capability and participation, including volunteerism.</p>
      </>,
      <>
        <p>Support uptake of disaster recovery training products will be informed by National Action 21 from the Second National Action Plan: better align recovery and resilience activities, governance, funding, policy and processes to support betterment and long-term disaster risk reduction.</p>
      </>,
    ],
  },
  {
    summary: <>
      <p>This framework provides a practical and comprehensive description of disaster recovery context, governance, doctrine and policy. Although each state and territory in Australia has their own disaster recovery policies, the framework provides a common understanding for how disaster recovery can be undertaken.</p>
      <p>The framework further supports recovery activities for all individuals that may be involved in recovery, including practitioners or leaders at all levels of government, private companies, community personnel and charities. As the stewards of the framework, NEMA will review the framework periodically as required.</p>
    </>,
    notes: [
      <>
        <p>Provided context and guidance on the Australian Government&apos;s current approach to disaster recovery, informing consultation with Fire and Emergency Services stakeholders.</p>
      </>,
      <>
        <p>The National Recovery Principles in this framework outline the context, complexity and approaches to disaster recovery that underpin successful recovery. These principles informed the development of the Volunteer Leadership Project.</p>
      </>,
      <>
        <p>Support uptake of disaster recovery training products will be informed and guided by section 3.7 Recovery training, which provides context and principles for the project.</p>
      </>,
    ],
  },
  {
    summary: <>
      <p>The AFAC Strategic Plan 2023–2027 guides Fire and Emergency Services across Australia and New Zealand to strengthen community safety and resilience by fostering collaboration, innovation, strong governance and workforce capability. AFAC&apos;s strategy is underpinned by six strategic directions:</p>
      <ul>
        <li>Supporting resilient communities through risk reduction</li>
        <li>Providing a trusted response</li>
        <li>Using credible and timely information and data</li>
        <li>Safe, capable and diverse workforce</li>
        <li>Informed by knowledge, innovation and research</li>
        <li>Effective and transparent governance</li>
      </ul>
      <p>As part of its commitment to the strategic directions, AFAC provides an annual Strategic Directions Achievement Report. The 2025 edition provides five examples from different organisations against each strategic direction that highlight how they have been performed across the 12-month reporting period.</p>
    </>,
    notes: [
      <>
        <p>Provided guidance on how Australian Fire and Emergency Services organisations collaborate and innovate, informing consultation with Fire and Emergency Services stakeholders.</p>
      </>,
      <>
        <p>Informed the development of:</p>
        <ul>
          <li>Emergency Tree Operations</li>
          <li>Volunteer Leadership Project</li>
          <li>Understanding the Youth Volunteer</li>
          <li>Complex Infrastructure Training Needs Analysis</li>
          <li>Emerging Technologies Skills Review</li>
        </ul>
        <p>Collectively, the span of 2025 Workforce Strategies are substantively informed by Strategic Direction 4 – Safe, capable and diverse workforce. This Strategic Direction aims to ensure that the Fire and Emergency Services workforce, inclusive of its paid employees and volunteers, maintain the requisite current and emerging skills and knowledge.</p>
      </>,
      <>
        <p>All three proposed Fire and Emergency Services strategies will be guided by AFAC National Council&apos;s Strategic Directions, especially Direction 1 – Supporting resilient communities through risk reduction and Direction 4 – Safe, capable and diverse workforce, which provides specific guidance for workforce planning strategies.</p>
      </>,
    ],
  },
  {
    summary: <>
      <p>The National Strategy for Volunteering 2023–2033 is a 10-year national blueprint co-designed with the volunteering ecosystem to strengthen and sustain volunteering in Australia.</p>
      <p>The strategy includes 11 strategic objectives across three focus areas:</p>
      <ul>
        <li>Individual potential and the volunteer experience</li>
        <li>Community and social impact</li>
        <li>Conditions for volunteering to thrive</li>
      </ul>
      <p>The strategy is accompanied by the Action Plan 2024–2027, the first three-year plan setting out co-designed actions aimed at addressing the implementation of the strategy.</p>
      <p>Additionally, the Monitoring and Evaluation Framework will be utilised to measure the progress of the action plan and strategy, against measurable outcomes.</p>
    </>,
    notes: [
      <>
        <p>Provided context and guidance on future-proofing Australia&apos;s volunteer workforce, informing consultation with Fire and Emergency Services stakeholders.</p>
      </>,
      <>
        <p>Informed the development of:</p>
        <ul>
          <li>Volunteer Leadership Project</li>
          <li>Understanding the Youth Volunteer</li>
        </ul>
        <p>Specifically, the Volunteer Leadership Project is informed by Strategic Objective 3.4 Recognise the Importance of Volunteer Management. The Understanding the Youth Volunteer Project is informed by Strategic Objective 1.2 Make Volunteering Inclusive and Accessible.</p>
      </>,
      <>
        <p>Review First Aid Units of Competency for Surf Life Saving in the Certificate II in Public Safety (Aquatic Rescue) will be informed by Strategic Objectives 1.2 Make Volunteering Inclusive and Accessible and 2.3 Recognise the Inherent Value of Volunteering.</p>
      </>,
    ],
  },
  {
    summary: <>
      <p>The Champions of Change Coalition is a sector-wide leadership initiative supported by AFAC that brings together senior personnel from fire, emergency and land management organisations across Australia and New Zealand. The Coalition&apos;s aim is to drive sustained gender equity, build inclusive, respectful workplaces and increase women&apos;s representation especially in frontline and leadership roles through collective action, inclusive leadership, flexible workplace practices and transparent reporting.</p>
      <p>The annual impact report released in 2025 highlights the achievements of the coalition and includes, but is not limited to:</p>
      <ul>
        <li>Capturing and publicly reporting gender equality data.</li>
        <li>Research undertaken to enhance gender appropriate PPE and PPC. This work will result in the release of a Fit for All framework in early 2026.</li>
        <li>Facilitating inter-organisation workshops to discuss recruitment and retention, career progression and workplace culture to improve gender equality.</li>
      </ul>
    </>,
    notes: [
      <>
        <p>Provided context on the Fire and Emergency Services approach to improving gender equality and diversity, informing consultation with Fire and Emergency Services stakeholders.</p>
      </>,
      <>
        <p>Informed the development of:</p>
        <ul>
          <li>Volunteer Leadership Project</li>
          <li>Understanding the Youth Volunteer</li>
          <li>Emerging Technologies Skills Review</li>
        </ul>
        <p>All three strategies were informed by the data, strategies and actions of the Coalition which aim to enhance gender equality, representation, safety and inclusivity across the breadth of roles within Fire and Emergency Services.</p>
      </>,
      <>
        <p>Review prerequisite requirements for PUAFIR306 Identify, detect and monitor hazardous materials at an incident will be informed by the Coalition, especially as it pertains to flexible work and ensuring tools and technology are gender appropriate.</p>
      </>,
    ],
  },
];

const noteTitles = ["Consultation and engagement:", "2025 Workforce Strategies", "2026 Workforce Strategies"];

export default function PublicSafetyFesExistingStrategiesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const strategy = strategies[active];
  const detail = content[active];
  const reportPath = `/reports/${slug}`;

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_existing_strategies" contentClassName={`${layout.page} ${styles.page}`} navigation={{
    back: { label: "Executive Summary", href: `${reportPath}/executive_summary` },
    backSecondary: { label: "Fire and Emergency Services chapter", href: `${reportPath}/fes` },
    prev: { label: "2025 Strategy Updates", href: `${reportPath}/fes_update_2025_strategies` },
    next: { label: "Disaster Recovery Training Products (Appendix B)", href: `${reportPath}/fes_disaster_recovery_training_products` },
    prevPrefix: "Previous Section:",
    nextPrefix: "Next Section:",
  }}>
    <section className={layout.hero}>
      <div>
        <span className={`${layout.badge} ${styles.badge} ${styles.heroBadge}`}>FES Existing Strategies</span>
        <h1>Existing Industry-Sector Strategies</h1>
        <p>Select a strategy to open its detail and how it informs Public Skills Australia&apos;s work.</p>
      </div>
      <Image className={`${styles.artwork} animate-zoom-in`} src="/images/reports/public-safety/fes-existing-strategies-group-85.png" width={487} height={104} alt="" unoptimized priority />
    </section>

    <section className={layout.projects} aria-labelledby="fes-existing-strategies-title">
      <div>
        <h2 id="fes-existing-strategies-title">Strategies · 5 · Select to open</h2>
        <div className={layout.projectList}>
          {strategies.map((item, index) => (
            <button key={item.title} type="button" aria-pressed={active === index} aria-controls="fes-existing-panel" onClick={() => setActive(index)} className={`${layout.projectButton} ${styles.projectButton} animate-card-entrance`} style={{ animationDelay: `${100 + index * 80}ms` }}>
              <span><small>0{index + 1} · {item.owner}</small><strong>{item.title}</strong></span>
              <span className={layout.arrow}><ArrowRight size={16} aria-hidden="true" /></span>
            </button>
          ))}
        </div>
      </div>

      <article id="fes-existing-panel" className={`${layout.panel} ${styles.panel} animate-slide-up-delay`} aria-labelledby="fes-existing-heading">
        <div className={layout.panelHeader}>
          <span className={`${layout.badge} ${styles.badge}`}>0{active + 1} · {strategy.owner}</span>
          <div className={`${layout.controls} ${styles.controls}`}>
            {active > 0 && <button type="button" className={`${layout.previous} ${styles.previous}`} onClick={() => setActive(active - 1)}><ArrowLeft size={16} aria-hidden="true" /> Previous</button>}
            {active < strategies.length - 1 && <button type="button" onClick={() => setActive(active + 1)}>Next <ArrowRight size={16} aria-hidden="true" /></button>}
          </div>
        </div>

        <div key={active} className={`${layout.details} animate-content-switch`}>
          <header className={`${layout.detailHeader} ${styles.detailHeader}`}>
            <h3 id="fes-existing-heading">{strategy.title}</h3>
            <span>{strategy.period}</span>
          </header>
          <h4 className={`${layout.subheading} ${styles.sectionHeading}`}>Summary</h4>
          <div className={`${layout.copy} ${active === 0 ? styles.spacedSummary : ""}`}>{detail.summary}</div>
          <div className={`${layout.groups} ${styles.groups}`}>
            <h4 className={styles.sectionHeading}>How this informs Public Skills Australia&apos;s work</h4>
            {detail.notes.map((note, index) => (
              <section key={noteTitles[index]} className={`${layout.note} ${styles.note}`}>
                <h5>{noteTitles[index]}</h5>
                {note}
              </section>
            ))}
          </div>
        </div>
      </article>
    </section>
  </PublicSafetyPageShell>;
}
