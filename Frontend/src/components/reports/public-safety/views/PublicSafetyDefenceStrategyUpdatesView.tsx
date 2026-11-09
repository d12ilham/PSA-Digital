"use client";

import ReportSelectionPanel from "./ReportSelectionPanel";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import styles from "./PublicSafetyDefenceStrategyUpdatesView.module.css";
import sourceStyles from "./PublicSafetyDefenceEmergingTechnologyView.module.css";
import { useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const projects = [
  { number:"01", completion:"June 2026", title:"Defence Youth Development Project", heading:"Defence Youth Development Project37", summary:"Redevelop the DEF21115 Certificate II in Military Skills to formally recognise skills acquired through Australian Defence Force Cadet participation. Update DEF10117 Certificate I in Defence Skills.\nWhen completed, this project will support Defence’s workforce targets as outlined in the Defence Workforce Plan 2024.\nThis project counterbalances the Defence Veterans – Supporting Transition strategy as it builds foundational skills for young people seeking to enter the Defence Workforce.", update:"In collaboration with Defence, Public Skills Australia has reviewed the following qualifications:", bullets:["DEF21115 Certificate II in Military Skills","DEF10117 Certificate I in Defence Skills"], updateEnd:"These will be consulted with Defence stakeholders, before finalisation and submission in 2026.", stakeholders:["Australian Air Force Cadets","Australian Army Cadets","Australian Navy Cadets","Defence Education, Learning and Training Authority (DELTA), Australian Defence College","Department of Defence","Department of Education, Training and Young People","State Training Authorities/Senior Responsible Officer","State and Territory Departments of Education","Training Package Assurance Body"], ministerial:"This project will contribute to building a skilled, adaptable and inclusive workforce.", strategic:"Support industry-sectors to continue to build and maintain capable and mobile workforces that are future-ready. Support industry-sectors through high quality training products.", drivers:["Workforce inclusivity","Challenges to workforce productivity"], connection:"Defence youth development and entry pathways." },
  { number:"02", completion:"June 2026", title:"Defence Cyber Skill Set Project", heading:"Defence Cyber Skill Set Project38", summary:"Develop a new Defence cyber skill set in the DEF (Defence) Training Package.\nWhen completed, this project will be complementary to the Defence micro-credentials for emerging technologies strategy and will support defence in developing the skills needed to respond to threats associated with wider digital transformation.\nThis project supports the Defence workforce to rapidly respond to broader digital transformation and emerging technology adoption.", update:"In collaboration with Defence, Public Skills Australia will develop a new Defence cyber skill set in the DEF (Defence) Training Package.", bullets:[], updateEnd:"This may include using existing units of competency from in the DEF Defence Training Package.\nThis skill set will be consulted with Defence stakeholders, before finalisation and submission.", stakeholders:["Australian Forensic Services","Australian Information Security Association","Australian Signals Directorate","Defence Education, Learning and Training Authority (DELTA), Australian Defence College","Defence Joint Capability Group","Department of Defence","Future Skills Organisation","State Training Authorities/Senior Responsible Officer","Training Package Assurance Body"], ministerial:"This project will contribute to the Artificial Intelligence (AI) and broader digital transformation in the design and review of qualifications and training products.", strategic:"Support industry-sectors to continue to build and maintain capable and mobile workforces that are future-ready. Support industry-sectors through high quality training products.", drivers:["Emergence of Artificial Intelligence (AI), greater automation and broader digital transformation","Resilience of organisations to respond to strategic shocks"], connection:"Defence micro-credentials for emerging technologies." },
  { number:"03", completion:"June 2026", title:"Defence Space Skill Set Project", heading:"Defence Space Skill Set Project39", summary:"Develop training products in the DEF (Defence) Training Package that meet the emerging skills needs of Defence in the space domain aligned to priority skilling needs that which may include but are not limited to skills related to satellite imagery, intelligence, reconnaissance and communications.\nWhen completed, this project will be complementary to the Defence micro-credentials for emerging technologies as it will provide a foundational skill set for Space Domain operations to respond to the application of emerging technologies for this domain.\nThis project supports the Defence workforce to rapidly respond to broader digital transformation and emerging technology adoption.", update:"In collaboration with the ADF, Public Skills Australia will develop new Defence cyber skill training products in the DEF (Defence) Training Package.", bullets:[], updateEnd:"Up to six new Space Skills Sets have been proposed to address the emerging space skills required.\nDefence stakeholders will be consulted on these skillsets before finalisation and submission.", stakeholders:["Defence Education, Learning and Training Authority (DELTA), Australian Defence College","Defence Joint Capability Group","Department of Defence","State Training Authorities/Senior Responsible Officer","Training Package Assurance Body"], ministerial:"This project will contribute to the Artificial Intelligence (AI) and broader digital transformation in the design and review of qualifications and training products.", strategic:"Support industry-sectors to continue to build and maintain capable and mobile workforces that are future-ready. Support industry-sectors through high quality training products.", drivers:["Emergence of Artificial Intelligence (AI), greater automation and broader digital transformation"], connection:"Defence micro-credentials for emerging technologies." },
  { number:"04", completion:"December 2026", title:"Defence Capability – VET System Pathways Framework Project", heading:"Defence Capability – VET System Pathways Framework Project40", summary:"Develop a framework that outlines how the VET system could be effectively leveraged to support Defence in the delivery of nationally accredited training, and to meet new and evolving skills requirements.\nWhen completed this project will be complementary to the Defence micro credentials for emerging technologies and Defence Veterans – Supporting transition strategies.\nThis project supports Defence to identify when and how units of competency, skill sets and qualifications can be used to address the skills required in Defence.", update:"In collaboration with the ADF, Public Skills Australia is developing a framework that identifies skills, training, related VET qualifications, units of competency and skill sets to collectively deliver the skills needs for Defence.", bullets:[], updateEnd:"It is anticipated that the development of this framework will also assist the Defence industry-sector in delivering recommendations from the Royal Commission into Defence and Veterans’ Suicide.\nDefence stakeholders will be consulted on this framework before finalisation and submission.", stakeholders:["AUKUS Taskforce","Defence Education, Learning and Training Authority (DELTA), Australian Defence College","Defence Joint Capability Group","Department of Defence","Defence Industry","DEWR Defence Skills Taskforce","Manufacturing Industry Skills Alliance (MISA)","Military Workforce Design","Relevant Government Departments","State/Territory Skills Commissions/Councils","State Training Authorities/Senior Responsible Officer"], ministerial:"This project will support the embedding of Qualification Reform principles to deliver streamlined, relevant and future-ready qualifications.", strategic:"Support industry-sectors through high quality training products.", drivers:["Workforce inclusivity","Challenges to workforce productivity"], connection:["Defence micro-credentials for emerging technologies","Defence Veterans – Supporting transition"] },
  { number:"05", completion:"Scoping complete", title:"Proposal to Investigate the Development of Pathways for Transitioning Veterans Project", heading:"Proposal to Investigate the Development of Pathways for Transitioning Veterans Project", summary:"Undertake scoping on options to support Defence to address Recommendation 83(c) of the Royal Commission into Defence and Veteran Suicide. This strategy has been completed and transitioned into the Defence Veterans – Supporting transition strategy.", update:"In collaboration with the ADF, Public Skills Australia undertook initial scoping through desktop research and targeted consultations. Through this scoping it was recommended by Public Skills Australia’s Industry Advisory Group that this topic be explored further as part of this workforce insights report. A further workshop with defence stakeholders (including ADF and DoD stakeholders) provided further insight that has been included in this report (refer Workforce Insights theme and Strategy 2).", bullets:[], updateEnd:"", stakeholders:["Defence Education, Learning and Training Authority (DELTA), Australian Defence College","Defence Education, Learning and Training Authority (DELTA), Australian Defence College","Defence Joint Capability Group","Department of Defence","Future Skills Organisation","State Training Authorities/Senior Responsible Officer","Training Package Assurance Body","DEWR Defence Skills Taskforce","Military Workforce Design","Relevant Government Departments","State/Territory Skills Commissions/Councils"], ministerial:"This project explores opportunities for the national VET system to better support the skills and training needs of Australian Defence Force veterans transitioning into civilian employment, with consideration to the Royal Commission into Defence and Veteran Suicide recommendation to increase opportunities for personnel to gain.", strategic:"Support industry-sectors to continue to build and maintain capable and mobile workforces that are future-ready.", drivers:["Workforce inclusivity","Challenges to workforce productivity"], connection:["Defence Veterans – Supporting transition"] },
];

export default function PublicSafetyDefenceStrategyUpdatesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const project = projects[active];
  const move = (direction: number) => setActive((active + direction + projects.length) % projects.length);

  const reportPath = `/reports/${slug}`;
  return <PublicSafetyPageShell
    slug={slug}
    report={report}
    currentPage="defence_update_2025_strategies"
    contentClassName={styles.page}
    navigation={{
      back: { label: "Executive Summary", href: `${reportPath}/executive_summary` },
      backSecondary: { label: "Defence chapter", href: `${reportPath}/defence` },
      prev: { label: "2026 Proposed Workforce Strategies", href: `${reportPath}/defence_workforce_strategies` },
      next: { label: "Existing Industry-Sector Strategies", href: `${reportPath}/defence_existing_strategies` },
      prevPrefix: "Previous Section:",
      nextPrefix: "Next Section:",
    }}
  >
    <section className={styles.hero}>
      <div className="animate-slide-up">
        <span className={styles.badge}>Defence</span>
        <h1>2025 Public Safety Workforce Insights Report – Defence Strategies Updates</h1>
        <p>Public Skills Australia identified workforce strategies for the Defence industry-sector as part of the 2025 Public Safety Workforce Insights Report. Updates on the progress of these strategies and activity projects are provided below.</p>
      </div>
      <picture className={`${styles.artwork} animate-zoom-in`}>
        <source media="(prefers-reduced-motion: reduce)" srcSet="/images/reports/public-safety/defence-industry-overview-group-93.svg" />
        <Image src="/images/reports/public-safety/defence-industry-overview-group-93-animated.svg" alt="" width={446} height={100} unoptimized priority />
      </picture>
    </section>

    <section className={styles.projects} aria-labelledby="defence-projects-title">
      <div>
        <h2 id="defence-projects-title">Projects · 5 · Select to open</h2>
        <div className={styles.projectList}>
          {projects.map((item, index) => <button key={item.number} type="button" aria-pressed={active === index} aria-controls="defence-project-panel" onClick={() => setActive(index)} className={styles.projectButton}>
            <span><small>{item.number} · Completion: {item.completion}</small><strong>{item.title}</strong></span>
            <span className={styles.arrow} aria-hidden="true"><ArrowRight size={16} /></span>
          </button>)}
        </div>
      </div>
      <ReportSelectionPanel selection={active} label="Defence project details"><article id="defence-project-panel" className={styles.panel} aria-labelledby="defence-project-heading">
        <div className={styles.panelHeader}>
          <span className={styles.badge}>{project.number} · Completion: {project.completion}</span>
          <div className={styles.controls}>
            {active > 0 && <button type="button" className={styles.previous} onClick={() => move(-1)}><ArrowLeft size={16} aria-hidden="true" /> Previous</button>}
            {active < projects.length - 1 && <button type="button" onClick={() => move(1)}>Next <ArrowRight size={16} aria-hidden="true" /></button>}
          </div>
        </div>
        <div key={project.number} className={`${styles.details} animate-content-switch`}>
          <header className={styles.detailHeader}>
            <h3 id="defence-project-heading">{project.title}{project.number !== "05" && <sup>{36 + Number(project.number)}</sup>}</h3>
            <span>Completion: {project.completion}</span>
          </header>
          <h4 className={styles.subheading}>Summary</h4>
          <p className={styles.copy}>{project.summary}</p>
          <h4 className={styles.subheading}>Update</h4>
          <div className={styles.copy}>
            <p>{project.update}</p>
            {project.bullets.length > 0 && <ul>{project.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
            <p>{project.updateEnd}</p>
          </div>
          <div className={styles.groups}>
            <section className={styles.note}>
              <h4>Key Stakeholders</h4>
              <ul>{project.stakeholders.map((item, index) => <li key={`${project.number}-${index}`}>{item}</li>)}</ul>
            </section>
            <section className={styles.note}>
              <h4>Connection to 2026 Strategies</h4>
              <dl>
                <div><dt>Ministerial Priority 2026</dt><dd>{project.ministerial}</dd></div>
                <div><dt>Strategic Plan Priorities 2026</dt><dd>{project.strategic}</dd></div>
                <div><dt>Drivers of Change connections</dt><dd><ul>{project.drivers.map(item => <li key={item}>{item}</li>)}</ul></dd></div>
                {active !== 0 && <div><dt>2026 Defence Strategies Connection</dt><dd>{typeof project.connection === "string" ? project.connection : <ul>{project.connection.map(item => <li key={item}>{item}</li>)}</ul>}</dd></div>}
              </dl>
            </section>
          </div>
        </div>
      </article></ReportSelectionPanel>
    </section>

    <section data-report-sources className={sourceStyles.sources}>
      <h2>Sources</h2>
      <ol start={37}>
        {["Previously referred to as Contemporary Cadet Training.", "Previously referred to as Development of Training Products for Emerging Skills in the Cyber Domain.", "Previously referred to as Development of Training Products for Emerging Skills in the Space Domain.", "Previously referred to as Defence Evolving Skills Requirements – VET System Pathways Framework."].map((source, index) => <li key={source}>
          <span className={sourceStyles.sourceNumber} aria-hidden="true">{index + 37}</span><span>{source}</span>
        </li>)}
      </ol>
    </section>
  </PublicSafetyPageShell>;
}
