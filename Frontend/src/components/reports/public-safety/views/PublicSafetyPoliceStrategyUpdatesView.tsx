"use client";

import ReportSelectionPanel from "./ReportSelectionPanel";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import chapter from "./PublicSafetyDefenceView.module.css";
import layout from "./PublicSafetyDefenceStrategyUpdatesView.module.css";
import police from "./PublicSafetyPoliceView.module.css";
import styles from "./PublicSafetyPoliceStrategyUpdatesView.module.css";

const projects = [
  {
    completion: "June 2026",
    title: "Police Training Package Release 11.0 and Release 12.0",
    summary: "Updating the Police Training Package to embed Qualification Reform principles to deliver streamlined and relevant qualifications. This includes reducing duplication, aligning with current and emerging workforce needs and responding proactively to industry and student expectations.",
    update: "In collaboration with ANZPAA, State/Territory Police organisations and Australian Federal Police, this project will update the Police Training Package.",
    bullets: ["Diploma of Police Bomb Technical Response", "Diploma of Police Search and Rescue Coordination (Marine / Land)", "Advanced Diploma of Police Search and Rescue Management"],
    secondUpdate: "Public Skills Australia has conducted public consultation on proposed draft training products and plans to progress this project for ministerial endorsement by June 2026.",
    secondBullets: ["Advanced Diploma of Police Supervision", "Graduate Certificate in Police Management", "Graduate Certificate in Police Prosecution"],
    futureUpdate: "Future training product updates will align with the Police Commissioners and ANZPAA's forthcoming Annual Plan. Potential areas include Witness Protection, Negotiation, Close Personal Protection and Digital Forensics. The Digital Forensics strategy is complementary to this project and is expected to form Release 13.0 of the Police Training Package.",
    stakeholders: ["Australia New Zealand Policing Advisory Agency (ANZPAA)", "Police Federation of Australia", "State Training Organisations/Senior Responsible Officer"],
    priority: "This project will contribute to reflecting the possible impacts of Artificial Intelligence (AI) and broader digital transformation in workforce planning censuses, and in the design and review of qualifications and training products.",
    strategic: "Support the Police industry-sector to continue to build and maintain capable and mobile workforces that are future-ready.",
    driver: "Emergence of Artificial Intelligence (AI), greater automation and broader digital transformation.",
    connection: "Develop Training Products for Digital Forensics.",
  },
  {
    completion: "December 2026",
    title: "Police Occupational Pathways Project",
    summary: "Develop a greater understanding of the factors influencing operational capacity in metropolitan and remote/regional policing. This analysis will also seek to determine the role of the VET system in addressing workforce pipeline challenges.",
    update: "In collaboration with ANZPAA, State/Territory Police organisations and Australian Federal Police, this project will use Police Training Package qualifications to map common skills across occupational roles and identify how the Vocational Education and Training (VET) system could support efforts to address capacity challenges in occupational roles.",
    bullets: [],
    secondUpdate: "An activity submission was approved by DEWR in December 2025. This project began mapping Police Training Package qualifications to understand skills similarities between police occupational roles. Key police stakeholders to undertake consultations starting March 2026 have also been identified.",
    secondBullets: [],
    futureUpdate: "",
    stakeholders: ["Australia New Zealand Policing Advisory Agency", "Police Federation of Australia", "State/Territory Police Organisations and Australian Federal Police", "State Training Organisations/Senior Responsible Officer"],
    priority: "This project will contribute to addressing Australia’s productivity challenges, including undertaking activity that supports building a skilled, adaptable and inclusive workforce.",
    strategic: "Support the Police industry-sector to continue to build and maintain capable and mobile workforces that are future-ready.",
    driver: "Resilience of organisations to respond to strategic shocks.",
    connection: "",
  },
  {
    completion: "Complete",
    title: "Case Study Analysis of Skilling and Professional Development Profile Mapping",
    summary: "This strategy sought to use previous work where police organisations mapped their Workforce Demographic Data to the Australia New Zealand Policing Advisory Agency (ANZPAA) Skills and Capabilities Profile as a case study to demonstrate good practice and identify key areas of skills and training gaps.",
    update: "In collaboration with ANZPAA, this project sought to engage with 1–2 police organisations to detail their approach in mapping Workforce Demographic Data to ANZPAA’s Skills and Capabilities Profile. Further consultations were undertaken to further explore the concept.",
    bullets: [],
    secondUpdate: "As a result of these consultations, it was indicated that further scoping of this strategy may not be feasible as priorities in police had shifted towards digital skills. Additionally, key contacts in police jurisdictions that had previously participated in skills mapping have since left those organisations, making engagement and data collection more difficult at this time.",
    secondBullets: [],
    futureUpdate: "",
    stakeholders: ["ANZPAA", "Police Federation of Australia"],
    priority: "This project aimed to contribute to addressing Australia’s productivity challenges, including undertaking activity that supports building a skilled, adaptable and inclusive workforce.",
    strategic: "Support the Police industry-sector to continue to build and maintain capable and mobile workforces that are future-ready.",
    driver: "Workforce Productivity Challenges.",
    connection: "",
  },
];

export default function PublicSafetyPoliceStrategyUpdatesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const project = projects[active];


  return <PublicSafetyPageShell slug={slug} report={report} currentPage="police_update_2025_strategies" contentClassName={`${layout.page} ${styles.page}`} navigation={{
    back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    backSecondary: { label: "Police chapter", href: `/reports/${slug}/police` },
    prev: { label: "2026 Proposed Workforce Strategy", href: `/reports/${slug}/police_workforce_strategies` },
    next: { label: "Existing Industry-Sector Strategies", href: `/reports/${slug}/police_existing_strategies` },
    prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
  }}>
    <section className={`${layout.hero} ${styles.hero} ${chapter.enter}`}>
      <div className={styles.heroCopy}>
        <span className={`${layout.badge} ${styles.badge}`}>POL Strategy Updates</span>
        <h1>2025 Public Safety Workforce Insights Report – Police Strategies Updates</h1>
        <p>Public Skills Australia identified workforce strategies for the Police industry-sector as part of the 2025 Public Safety Workforce Insights Report. Updates on the progress of these strategies and activity projects are provided below.</p>
      </div>
      <div className={`${chapter.artwork} ${police.artwork}`}>
        <Image src="/images/police-chapter-vehicle.svg" width={136} height={136} alt="" unoptimized priority />
      </div>
    </section>

    <section className={`${layout.projects} ${chapter.enter}`}>
      <div>
        <h2>Strategies · {projects.length} · Select to open</h2>
        <div className={layout.projectList} role="group" aria-label="2025 Police strategy projects">
          {projects.map((item, index) => (
            <button key={item.title} type="button" className={`${layout.projectButton} ${styles.projectButton}`} onClick={() => setActive(index)} aria-pressed={active === index}>
              <span><small>0{index + 1} · Completion: {item.completion}</small><strong>{item.title}</strong></span>
              <span className={layout.arrow}><ArrowRight size={16} aria-hidden="true" /></span>
            </button>
          ))}
        </div>
      </div>

      <ReportSelectionPanel selection={active} label="Police project details"><article className={`${layout.panel} ${styles.panel}`}>
        <div className={layout.panelHeader}>
          <span className={`${layout.badge} ${styles.badge}`}>0{active + 1} · Completion: {project.completion}</span>
          <div className={layout.controls}>
            {active > 0 && <button type="button" className={`${layout.previous} ${styles.previous}`} onClick={() => setActive(active - 1)}><ArrowLeft size={16} aria-hidden="true" /> Previous</button>}
            {active < projects.length - 1 && <button type="button" onClick={() => setActive(active + 1)}>Next <ArrowRight size={16} aria-hidden="true" /></button>}
          </div>
        </div>
        <div key={project.title} className={`${layout.details} ${chapter.enter}`}>
          <div className={layout.detailHeader} aria-live="polite">
            <h3>{project.title}</h3>
            <span>Completion: {project.completion}</span>
          </div>
          <h4 className={`${layout.subheading} ${styles.subheading}`}>Summary</h4>
          <p className={layout.copy}>{project.summary}</p>
          <h4 className={`${layout.subheading} ${styles.update}`}>Update</h4>
          <div className={layout.copy}>
            <p>{project.update}</p>
            {project.bullets.length > 0 && <>
              <p>Release 11.0 will update:</p>
              <ul>{project.bullets.map(item => <li key={item}>{item}</li>)}</ul>
            </>}
            <p>{project.secondUpdate}</p>
            {project.secondBullets.length > 0 && <>
              <p>Release 12.0 will update:</p>
              <ul>{project.secondBullets.map(item => <li key={item}>{item}</li>)}</ul>
            </>}
            {project.futureUpdate && <p>{project.futureUpdate}</p>}
          </div>

          <div className={`${layout.note} ${styles.note} ${styles.stakeholders}`}>
            <h4>Key Stakeholders</h4>
            <ul>{project.stakeholders.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className={layout.groups}>
            <h4 className={styles.informs}>How this informs Public Skills Australia’s work</h4>
            {[
              ["Ministerial Priority 2026", project.priority],
              ["Strategic Plan Priorities 2026", project.strategic],
              ["Drivers of Change connections", project.driver],
              ...(project.connection ? [["2026 Police Strategies Connection", project.connection]] : []),
            ].map(([title, copy]) => (
              <section key={title} className={`${layout.note} ${styles.note}`}>
                <h4>{title}</h4>
                <p>{copy}</p>
              </section>
            ))}
          </div>
        </div>
      </article></ReportSelectionPanel>
    </section>
  </PublicSafetyPageShell>;
}
