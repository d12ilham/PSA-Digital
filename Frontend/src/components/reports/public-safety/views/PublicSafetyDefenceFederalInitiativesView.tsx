"use client";

import ReportSelectionPanel from "./ReportSelectionPanel";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import layout from "./PublicSafetyDefenceStrategyUpdatesView.module.css";
import sourcesStyles from "./PublicSafetyDefenceEmergingTechnologyView.module.css";
import styles from "./PublicSafetyDefenceFederalInitiativesView.module.css";

const initiatives = [
  ["ACT Government", "ACT Government Veterans’ Employment Strategy, 2020", "Articulates the benefits of both the private and public sectors as career pathways for veterans and their families and highlights the resources available (at the time of publishing) for recruitment, networking and information sharing.", [87]],
  ["ACT Government", "ACT Public Service (ACTPS) Veterans’ Employment Transition Guide, 2018", "Provides ADF personnel with guidance on how their skills and experience can be translated into the ACTPS. Provides information on the ACTPS as an employer, as well as tips on identifying the right role and understanding the lifecycle of the application process.", [88]],
  ["Department of Defence", "ADF Transition and Civil Recognition Project", "Provides transitioning personnel, and those who have transitioned in 24 months, the opportunity to have skills recognised through RPL, and accredited training where possible.", [89]],
  ["Department of Defence", "ADF Transition Guide App, 2024", "Provides a free App to ADF personnel, their families and support networks to understand and navigate the transition into civilian life. Provides the most current transition information from across Defence to assist personnel in preparing for their transition out of the ADF.", [90]],
  ["Department of Defence", "The ADF Personnel and Family Transition Guide (2024-25)", "Provides personnel and their families with information about the transition process and supports available, and informs what is provided in the ADF Transition Guide App.", [91]],
  ["Department of Defence", "ADF Transition Training & Skills Guide", "Provides explanation to personnel across the ADF of the skills acquired during their service and general guidance on how this can apply to the civilian workforce. Guides are grouped by the equivalent military rank from each service area – Navy, Army and Air Force.", [92]],
  ["Tasmania", "Department of Premier and Cabinet Tasmania, Tasmanian Veterans’ Employment Strategy 2023-2027", "Sets out a range of supports and employment opportunities available for veterans in Tasmania and is designed to complement initiatives already underway at a national level. Provides case studies of veterans who have successfully transitioned to a civilian career, now working in the Tasmanian State Service.", [93]],
  ["Department of Veterans’ Affairs", "Department of Veterans’ Affairs Veteran Transition Strategy (2023) and Action Plan (2024)", "Identifies six priority areas that are intended to support a positive transition out of the ADF. The Veteran Transition Action Plan provides the actions to support the implementation of the six priority areas identified in the Strategy, detailing the actions to be undertaken and the responsible organisation.", [94, 95]],
  ["Department of Veterans’ Affairs", "Department of Veterans’ Affairs Veteran Employment Program", "Delivers initiatives to support employers in improving employment outcomes for ADF veterans. Organisations can join via the Veteran Employment Commitment. Resources such as the Veteran Employment Toolkit, the Core Skills Identifier and an interactive list of veteran employers are available for veterans and their families.", [96]],
  ["Department of Veterans’ Affairs", "Department of Veterans’ Affairs, Veteran Support and Services Guide 2025", "Highlights the support and services available for veterans. Provides a link to programs and support services offered by Federal and State/Territory Government departments.", [97]],
  ["Western Australia", "Government of Western Australia, Department of Premier and Cabinet – Veteran Employment", "Provides information on available opportunities and initiatives for veterans seeking employment in the civilian workforce. Last updated in 2024, the Veteran Employment service outlines Veteran Employment Opportunities through organisations such as Jobs & Skills WA, the Defence Industry Veterans Employment Scheme (DIVES) Scholarship Program for VET and university studies available to eligible veterans (as well as information for potential employers).", [98]],
  ["Western Australia", "Government of Western Australia, Defence Industry – The Other Force Veterans Defence Industry Career Explorer", "Assists veterans in understanding how their skills and experience align to occupations in Western Australia’s defence industry and identifies possible career pathways.", [99]],
  ["New South Wales", "New South Wales Government Rank to Grade Guide and Local Government Rank to Grade Guide", "Provides veterans with guidance and understanding on how NSW Government and Local Government job grades align to ADF ranks. Tool for employers to understand the skills and experience that veterans can bring to their organisation.", [100]],
  ["New South Wales", "New South Wales Veterans Employment Program (VEP)", "Provides veterans with tools to assist in applying for roles in the NSW public service, as well as to employers. The VEP has published online resources, such as a capability definition tool and access to workshops to support veterans in their application to NSW public sector positions.", [101]],
  ["New South Wales", "New South Wales Veterans Strategy and Action Plan, 2025-2030", "Outlines key themes and the actions that the NSW Government is taking to support its veterans. It is intended to be a ‘first step’ in response to the Royal Commission into Defence and Veterans Suicide and as part of its scope, provides information on the translation of Defence-specific capabilities into civilian requirements.", [102]],
  ["Northern Territory", "Northern Territory Government, Defence Veterans Strategy", "Provides outcomes, case studies and lists supports and actions for veterans and their families in the Northern Territory, to assist in the transition out of Defence and ensure access to employment opportunities.", [103]],
  ["TAFE NSW", "TAFE NSW Ranks to Recognition", "Supports ADF personnel and veterans in their transition to the civilian workforce by assessing and recognising skills, experience and qualifications gained during military service with the intended outcome of a smooth transition for ADF personnel in accessing career opportunities and/or further study. Delivered in partnership with the NSW Office of Veterans Affairs.", [104]],
  ["TAFE SA", "TAFE SA Skills Transition Education Program (STEP)", "Provides serving and ex-serving ADF personnel and their families with support to transition to the civilian workforce via career planning, funding assistance to access VET and Recognition of Prior Learning.", [105]],
  ["Queensland Government", "Veterans Queensland", "Coordinates contact with multiple functions, including supporting employment pathways for ex-ADF personnel into the Queensland Government and key industries like logistic (as well as information for employers).", [106]],
  ["South Australian Government", "Veterans South Australia", "Provides information on available services, programs and opportunities in South Australia for Defence veterans and their families. To support veteran transition to the civilian workforce, programs such as the South Australian Veteran Employer Network were established. Veterans South Australia also promotes and supports programs run by other organisations, such as TAFE SA’s STEP.", [107]],
  ["Victorian Government", "Victorian Government Veterans Employment Workshops", "Supports veterans in exploring potential career pathways through workshops held regularly by the Office for Veterans. Workshops provide an opportunity for veterans to connect and network with HR representatives, employers, personnel and other veterans.", [108]],
  ["Victorian Public Sector", "Victorian Public Sector, Employing Veterans in the Victorian Public Sector", "Provides a central hub for veterans to register for employment opportunities in the Victorian Public Sector (VPS). Provides general guidance on rank across the ADF and their approximate equivalent in the VPS. Provides mentor opportunities, information about networking events and case studies. The initiatives outlined by the Victorian Government put into practice the Public Sector Veteran Employment Strategy (2016).", [109]],
] as const;

const sources = [
  "ACT Government, Veterans’ Employment Strategy, ACT Government, 2020, accessed 19 November 2025.",
  "ACT Government, Veterans Employment Transition Guide ACT Public Service, ACT Government, 2018, accessed 10 December 2025.",
  "Department of Defence, Military Skill Recognition, Department of Defence, Australian Government, n.d., accessed 14 November 2025.",
  "Department of Defence, Defence Annual Report 2024-25, Department of Defence, Australian Government, 2025, accessed 15 December 2025.",
  "Department of Defence, ADF Member and Family Transition Guide 2024-25, Department of Defence, Australian Government, n.d., accessed 15 December 2025.",
  "Department of Defence, Training and Skills Guides, Department of Defence, Australian Government, n.d., accessed 14 November 2025.",
  "Department of Premier and Cabinet, Tasmanian Veterans’ Employment Strategy 2023-2027, Department of Premier and Cabinet, Tasmanian Government, 2023, accessed 5 December 2025.",
  "Department of Veterans’ Affairs, Veteran Transition Strategy, Department of Veterans’ Affairs, Australian Government, 2023, accessed 19 November 2025.",
  "Department of Veterans’ Affairs, Veteran Transition Action Plan, Department of Veterans’ Affairs, Australian Government, 2024, accessed 19 November 2025.",
  "Department of Veterans’ Affairs, Veteran Employment Program [website], Department of Veterans’ Affairs, Australian Government, n.d., accessed 19 November 2025.",
  "Department of Veterans’ Affairs, Veteran Support and Services Guide, Department of Veterans’ Affairs, Australian Government, 2025, accessed 5 December 2025.",
  "Department of Premier and Cabinet, Veteran Employment [website], Government of Western Australia, 14 March 2024, accessed 16 December 2025.",
  "Government of Western Australia, Defence Industry – The Other Force: Veterans Defence Industry Career Explorer [website], Government of Western Australia, n.d., accessed 16 December 2025.",
  "NSW Government, NSW Government Rank to Grade Guide [website], NSW Government, n.d., accessed 10 December 2025.",
  "NSW Government, Veterans Employment Program – About [website], NSW Government, n.d., accessed 10 December 2025.",
  "NSW Veterans Affairs, NSW Veterans Strategy and Action Plan, 2025-2030, NSW Government, 2025, accessed 10 December 2025.",
  "Northern Territory Government, Northern Territory Defence Veterans Strategy, Northern Territory Government, n.d., accessed 16 December 2025.",
  "TAFE NSW, Ranks to Recognition [website], n.d., accessed 19 November 2025.",
  "TAFE SA, Transitioning from the ADF [website], n.d., accessed 10 December 2025.",
  "Queensland Government, Veterans Queensland [website], 5 August 2024, accessed 10 December 2025.",
  "Government of South Australia, Veterans SA [website], n.d., accessed 10 December 2025.",
  "Victorian Government, Victorian Employment Workshops for Veterans [website], 25 November 2025, accessed 17 December 2025.",
  "Victorian Government, Opportunities for veterans in the Victorian Public Sector [website], 6 June 2024; Victorian Government, Employing veterans in the Victorian Public Sector [website], 8 April 2024.",
] as const;

export default function PublicSafetyDefenceFederalInitiativesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const [owner, title, description, references] = initiatives[active];
  const [firstSentence, actionPlan] = description.split(" The Veteran Transition Action Plan");
  const number = (index: number) => String(index + 1).padStart(2, "0");
  return <PublicSafetyPageShell contentClassName={layout.page} slug={slug} report={report} currentPage="defence_federal_initiatives" navigation={{back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`},backSecondary:{label:"Defence chapter",href:`/reports/${slug}/defence`},prev:{label:"Existing Industry-Sector Strategies",href:`/reports/${slug}/defence_existing_strategies`},next:{label:"Fire and Emergency Services",href:`/reports/${slug}/fes`},prevPrefix:"Previous Section:",nextPrefix:"Next Section:"}}>
    <section className={`${layout.hero} ${styles.hero}`}>
      <div className="animate-slide-up">
        <span className={layout.badge}>Defence</span>
        <h1>Defence Veterans’ Programs and Initiatives</h1>
        <p>Select a strategy to open its detail and how it informs Public Skills Australia’s work.</p>
      </div>
      <Image className={`${styles.artwork} animate-zoom-in`} src="/images/reports/public-safety/defence-veterans-icon.png" width={120} height={120} alt="" unoptimized priority />
    </section>

    <section className={`${layout.projects} ${styles.initiatives}`} aria-labelledby="defence-veterans-list">
      <div className="animate-slide-up-delay">
        <h2 id="defence-veterans-list">Strategies · {initiatives.length} · Select to open</h2>
        <div className={layout.projectList}>
          {initiatives.map(([agency, name], index) => (
            <button key={name} type="button" aria-pressed={active === index} aria-controls="defence-veterans-panel" className={layout.projectButton} onClick={() => setActive(index)}>
              <span><small>{number(index)} · {agency}</small><strong>{name}</strong></span>
              <span className={layout.arrow}><ArrowRight size={16} aria-hidden="true" /></span>
            </button>
          ))}
        </div>
      </div>
      <ReportSelectionPanel selection={active} label="Defence veterans program details"><article id="defence-veterans-panel" className={`${layout.panel} animate-slide-up-delay`} aria-labelledby="defence-veterans-heading">
        <div className={layout.panelHeader}>
          <span className={layout.badge} title={owner}>{number(active)} · DEF</span>
          <div className={layout.controls}>
            {active > 0 && <button className={layout.previous} type="button" onClick={() => setActive(active - 1)}><ArrowLeft size={16} aria-hidden="true" /> Previous</button>}
            {active < initiatives.length - 1 && <button type="button" onClick={() => setActive(active + 1)}>Next <ArrowRight size={16} aria-hidden="true" /></button>}
          </div>
        </div>
        <div key={title} className={`${layout.details} animate-content-switch`}>
          <header className={styles.detailHeading}>
            <h3 id="defence-veterans-heading">{title}</h3>
          </header>
          <h4 className={styles.supportHeading}>How it Supports Transitioning and Transitioned Veterans</h4>
          <p className={layout.copy}>
            {firstSentence}<sup className={styles.footnote}>{references[0]}</sup>
            {actionPlan && <> The Veteran Transition Action Plan{actionPlan}<sup className={styles.footnote}>{references[1]}</sup></>}
          </p>
        </div>
      </article></ReportSelectionPanel>
    </section>

    <section data-report-sources className={sourcesStyles.sources}>
      <h2>Sources</h2>
      <ol start={87}>
        {sources.map((source, index) => <li key={source}>
          <span className={sourcesStyles.sourceNumber} aria-hidden="true">{index + 87}</span><span>{source}</span>
        </li>)}
      </ol>
    </section>
  </PublicSafetyPageShell>;
}
