"use client";

import ReportSelectionPanel from "./ReportSelectionPanel";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import layout from "./PublicSafetyDefenceStrategyUpdatesView.module.css";
import styles from "./PublicSafetyFesStrategyUpdatesView.module.css";

const projects = [
  {
    completion: "Completed",
    title: "Emergency Tree Operations",
    summary: "Develop a Findings Report highlighting the wide range of tree operations conducted by Fire and Emergency Services to analyse capability requirements and consider the contextualisation of existing training products to meet these requirements.",
    update: "This project was completed as of September 2025. Since publication of the 2025 Public Safety Workforce Insights Report, the Emergency Tree Operations Findings Report has been validated and submitted to the Department of Employment and Workplace Relations.",
    stakeholders: ["Australian Council of State Emergency Services", "Australasian Fire and Emergency Service Authorities Council (AFAC)", "National State Emergency Services Volunteers Association", "Registered Training Organisations", "State/Territory State Emergency Services Organisations", "United Firefighters Union Australia"],
    priority: "This project will contribute to building a shared, evidence-based view of the challenges and opportunities for the Fire and Emergency Services industry-sector.",
    strategic: "Lead industry-sector intelligence sharing, relationship building and cross-collaboration.",
    driver: "Resilience of organisations to respond to strategic shocks.",
  },
  {
    completion: "June 2026",
    title: "Volunteer Leadership Project",
    summary: "The objective of this project is to identify and address capability requirements for non-operational leadership across Fire and Emergency Services volunteer organisations. It seeks to capture the current and emerging needs of volunteer leaders.",
    update: "The initial action of this Fire and Emergency Services stakeholder project, the Volunteer Leadership Skills Review Report, has been drafted and is now progressing through Public Skills Australia’s governance process. This project is on track to being completed on time by June 2026. It is anticipated that through consultation on this project, the industry-sector will also gain a clearer understanding of leadership development needs and priorities. This will better position agencies to support volunteer leaders and enhance organisational culture.",
    stakeholders: ["Australian Council of State Emergency Services", "Australasian Fire and Emergency Service Authorities Council (AFAC)", "National State Emergency Services Volunteers Association", "State/Territory Volunteer Fire and Emergency Services Agencies", "Surf Life Saving Australia"],
    priority: "This project will contribute to identifying opportunities to strengthen capabilities of the public safety and government workforce to respond to and manage natural hazards, and to support delivery of emergency services to communities.",
    strategic: "Facilitate the promotion, uptake and implementation of training products.",
    driver: "Workforce inclusivity.",
  },
  {
    completion: "June 2026",
    title: "Understanding the Youth Volunteer",
    summary: "To identify drivers and challenges to recruiting, engaging and retaining youth volunteers.",
    update: "In collaboration with Fire and Emergency Services volunteer organisations, this project aims to strengthen youth volunteer retention in Fire and Emergency Services by identifying the key drivers of attraction, recruitment and sustained engagement.\nA literature review was undertaken to inform the research design. This was followed by a facilitated workshop with a wide range of Fire and Emergency Services youth volunteer stakeholders. Initial feedback has indicated that while young people are highly motivated by a desire to contribute to their community, they often face barriers such as competing study and work commitments, and limited structural development pathways.\nWhen complete, this project will produce an evidence-based Insights Report outlining findings for organisations relating to attracting, recruiting, engaging and retaining youth volunteers.",
    stakeholders: ["AFAC", "National State Emergency Services Volunteers Association", "Australasian Fire and Emergency Service Authorities Council", "Bushfires NT", "Country Fire Authority", "Department of Fire and Emergency Services WA", "Emergency Management Victoria", "NT Emergency Service", "Rural Fire Service NSW", "NSW Surf Life Saving", "Surf Life Saving Australia", "SA Fire and Emergency Services Commission", "Tasmania Fire Service", "Queensland Fire and Emergency Services"],
    priority: "This project will contribute to addressing Australia’s productivity challenges, including undertaking activity that supports building a skilled, adaptable and inclusive workforce.",
    strategic: "Support our industry-sectors to continue to build and maintain capable and mobile workforces that are future-ready.",
    driver: "Challenges to workforce productivity.",
  },
  {
    completion: "August 2026",
    title: "Complex Infrastructure Training Needs Analysis",
    summary: "To identify training needs and skill requirements of firefighters responding to emergencies in complex infrastructure, such as tunnels and high-rise and multi-purpose dwellings.",
    update: "In collaboration with key Fire and Emergency Services stakeholders, this project will define current and emerging skills and knowledge requirements for emergencies involving complex infrastructure. This will be used as the evidence base to determine the potential future updates to relevant Public Safety Training Package products. Consultations with stakeholders have been undertaken and the first milestone of a Stakeholder Insights Report has been completed. Further stakeholder consultations are planned between February through April 2026, with a subsequent training needs analysis to be completed.",
    stakeholders: ["AFAC", "Fire Protection Association Australia", "State/Territory Volunteer Fire and Emergency Service Agencies", "United Firefighters Union Australia"],
    priority: "This project will contribute to identifying opportunities to strengthen capabilities of the public safety and government workforces in preparing for and responding to emergency events, including identification of emerging or revised skill requirements.",
    strategic: "Support our industry-sectors to continue to build and maintain capable and mobile workforces that are future-ready.",
    driver: "Resilience of organisations to respond to strategic shocks.",
  },
  {
    completion: "December 2026",
    title: "Emerging Technologies Skills Review",
    summary: "To develop a deeper understanding of training and skill needs when responding to emergencies and relating to emerging technologies.",
    update: "In collaboration with key Fire and Emergency Services stakeholders, this project will identify key job roles and positions affected by incidents involving electric vehicles and high-powered lithium-ion batteries, highlight emerging skills requirements and identify relevant training package products requiring update to address capability needs. An activity submission was approved by the Department of Employment and Workplace Relations in December 2025. This project has started the benchmarking of existing research and doctrine to determine current and anticipated skilling requirements. Additionally, initial consultations begin in March 2026.",
    stakeholders: ["AFAC", "Department of Climate Change, Energy, the Environment and Water (DCCEEW)", "Mining and Automotive Skills Alliance", "Powering Skills Organisation", "United Firefighters Union Australia"],
    priority: "This project will contribute to identifying opportunities to strengthen capabilities of the public safety and government workforces in preparing for and responding to emergency events, including identification of emerging or revised skill requirements.",
    strategic: "Support our industry-sectors to continue to build and maintain capable and mobile workforces that are future-ready.",
    driver: "Resilience of organisations to respond to strategic shocks.",
  },
];

function ProjectPanel({ index, onSelect }: { index: number; onSelect?: (index: number) => void }) {
  const project = projects[index];
  const headingId = `fes-update-heading-${index}`;

  return <article className={`${layout.panel} ${styles.panel}`} aria-labelledby={headingId}>
    <div className={layout.panelHeader}>
      <span className={`${layout.badge} ${styles.badge}`}>0{index + 1} · Completion: {project.completion}</span>
      {onSelect && <div className={`${layout.controls} ${styles.controls}`}>
        {index > 0 && <button type="button" className={layout.previous} onClick={() => onSelect(index - 1)}><ArrowLeft size={16} aria-hidden="true" /> Previous</button>}
        <button type="button" onClick={() => onSelect((index + 1) % projects.length)}>Next <ArrowRight size={16} aria-hidden="true" /></button>
      </div>}
    </div>
    <div key={index} className={`${layout.details} animate-content-switch`}>
      <header className={`${layout.detailHeader} ${styles.detailHeader}`}>
        <h3 id={headingId}>{project.title}</h3>
        <span>Completion: {project.completion}</span>
      </header>
      <h4 className={`${layout.subheading} ${styles.subheading}`}>Summary</h4>
      <p className={layout.copy}>{project.summary}</p>
      <h4 className={`${layout.subheading} ${styles.subheading}`}>Update</h4>
      <p className={layout.copy}>{project.update}</p>
      <div className={layout.groups}>
        <section className={`${layout.note} ${styles.note}`}>
          <h4>Key Stakeholders</h4>
          <ul>{project.stakeholders.map(item => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className={`${layout.note} ${styles.note}`}>
          <h4>Connection to 2026 Strategies</h4>
          <dl>
            <div><dt>Ministerial Priority 2026</dt><dd>{project.priority}</dd></div>
            <div><dt>Strategic Plan Priorities 2026</dt><dd>{project.strategic}</dd></div>
            <div><dt>Drivers of Change connections</dt><dd><ul><li>{project.driver}</li></ul></dd></div>
          </dl>
        </section>
      </div>
    </div>
  </article>;
}

export default function PublicSafetyFesStrategyUpdatesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const reportPath = `/reports/${slug}`;

  function selectProject(index: number) {
    setActive(index);
    setExpanded(false);
  }

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_update_2025_strategies" contentClassName={`${layout.page} ${styles.page}`} navigation={{
    back: { label: "Executive Summary", href: `${reportPath}/executive_summary` },
    backSecondary: { label: "Fire and Emergency Services chapter", href: `${reportPath}/fes` },
    prev: { label: "2026 Proposed Workforce Strategies", href: `${reportPath}/fes_workforce_strategies` },
    next: { label: "Existing Industry-Sector Strategies", href: `${reportPath}/fes_existing_strategies` },
    prevPrefix: "Previous Section:",
    nextPrefix: "Next Section:",
  }}>
    <section className={`${layout.hero} ${styles.hero}`}>
      <div className={styles.heroCopy}>
        <span className={`${layout.badge} ${styles.badge}`}>FES · Industry-Sector Analysis</span>
        <h1>2025 Public Safety Workforce Insights Report<br />– Fire and Emergency Services Strategies Updates</h1>
        <p>Public Skills Australia identified workforce strategies for the Fire and Emergency Services industry-sector as part of the 2025 Public Safety Workforce Insights Report. Updates on the progress of these strategies and activity projects are provided below.</p>
      </div>
      <Image className={styles.artwork} src="/images/reports/public-safety/fes-chapter-fire-engine.svg" width={180} height={180} alt="" unoptimized priority />
      <div className={`${layout.controls} ${styles.bulk}`}>
        <button type="button" aria-expanded={expanded} aria-controls="fes-update-projects" onClick={() => setExpanded(value => !value)}>
          {expanded ? "Close All" : "Open All"} <ChevronDown size={16} aria-hidden="true" />
        </button>
      </div>
    </section>

    <section className={layout.projects} aria-labelledby="fes-update-projects-title">
      <div>
        <h2 id="fes-update-projects-title">Projects · 5 · Select to open</h2>
        <div className={layout.projectList}>
          {projects.map((project, index) => (
            <button key={project.title} type="button" aria-pressed={expanded || index === active} aria-controls="fes-update-projects" onClick={() => selectProject(index)} className={`${layout.projectButton} ${styles.projectButton}`}>
              <span><small>0{index + 1} · Completion: {project.completion}</small><strong>{project.title}</strong></span>
              <span className={layout.arrow}><ArrowRight size={16} aria-hidden="true" /></span>
            </button>
          ))}
        </div>
      </div>
      <ReportSelectionPanel selection={expanded ? -1 : active} label="Fire and Emergency Services project details"><div id="fes-update-projects" className={styles.panels}>
        {expanded ? projects.map((project, index) => <ProjectPanel key={project.title} index={index} />)
          : <ProjectPanel index={active} onSelect={selectProject} />}
      </div></ReportSelectionPanel>
    </section>
  </PublicSafetyPageShell>;
}
