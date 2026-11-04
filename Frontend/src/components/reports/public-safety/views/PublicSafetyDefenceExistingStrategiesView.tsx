"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import styles from "./PublicSafetyDefenceStrategyUpdatesView.module.css";
import sources from "./PublicSafetyDefenceEmergingTechnologyView.module.css";
import existing from "./PublicSafetyDefenceExistingStrategiesView.module.css";

type StrategyCopy = string | readonly (string | readonly string[])[];

function StrategyText({ copy }: { copy: StrategyCopy }) {
  const blocks = typeof copy === "string" ? copy.split("\n\n") : copy;
  return blocks.map(block => typeof block === "string"
    ? <p key={block}>{block}</p>
    : <ul key={block[0]}>{block.map(item => <li key={item}>{item}</li>)}</ul>);
}

const strategies = [
  { number:"01", owner:"Department of Defence", period:"2023–ongoing", title:"Australian Government National Defence: Defence Strategic Review", heading:"01 · National Defence: Defence Strategic Review", summary:"The National Defence: Defence Strategic Review 2023 outlined recommended reforms to Defence’s posture and structure. The review provides 62 recommendations across a range of strategic focus areas, including but not limited to workforce, capability, technology, resourcing and logistics. This strategic review preceded the development of the 2024 National Defence Strategy and update of the Integrated Investment Program 2024. It recommended a biennial strategic update through a National Defence Strategy, with the 2024 National Defence Strategy the first iteration of the strategic update. The Defence Strategic Review notes that it should be considered in conjunction with the 2024 National Defence Strategy and the Integrated Investment Program 2024.\n\nInitial progress on a range of other recommendation focus areas is described at the Australian Government Transparency Portal.41 Continued progress against the recommendations is also documented in the Defence Annual Report 2024–25.42", consultation:"Considered in conjunction with the National Defence Strategy 2024 and the Integrated Investment Plan 2024, which provided detail and context for engagements and consultations.", update2025:"Informed the development of Workforce Strategies identified in the National Defence Strategy 2024 and the Integrated Investment Program 2024. Together they provide the framework for Public Skills Australia’s Defence projects.", update2026:"Will provide context and data for the development of initial research for the Support Defence skill and capability requirements to operationalise drones project." },
  { number:"02", owner:"Department of Defence", period:"2024 – ongoing", title:"Australian Government National Defence Strategy 2024", heading:"02 · Australian Government National Defence Strategy 2024",
    summary: ["The National Defence Strategy outlines the Government’s approach to Australia’s National Defence risks. Six priorities are highlighted in the strategy including:", ["Acquisition of nuclear-powered submarines through AUKUS", "Developing long-range capabilities", "Improvements to bases", "Improving the growth and retention of the workforce", "Lifting Australia’s capacity to rapidly translate disruptive new technologies into ADF capability", "Prioritising international partnerships"], "An update to the National Defence Strategy is due to be delivered by the Department of Defence in 2026."],
    consultation: ["Provided context on Defence’s forward strategy, specifically the strategy of deterrence and denial, that informs force design and acquisition priorities that informed consultations with Defence stakeholders."],
    update2025: ["Informed the development of:", ["VET System Pathways Framework", "Defence Space Skills", "Defence Cyber Skills"], "Specifically, the National Defence Strategy 2024 identified both space and cyber skills as key components of Defence’s Capability Investment Priorities. Additionally, Training and skilling reform was identified as part of the wider Defence reform agenda, which directly informed the design and agenda for the VET System Pathways Framework."],
    update2026: ["Support Defence skill and capability requirements to operationalise drones and its focus on UAS and drones will be informed by the Capability Investment Priorities: Priorities for the integrated, focused force section of the strategy.", "Support transition of Defence Veterans to civilian workforce will be informed by the insights of the People: Culture section of this strategy."]
  },
  { number:"03", owner:"Department of Defence", period:"2024 – 2034", title:"Australian Government 2024 Defence Workforce Plan", heading:"03 · Australian Government 2024 Defence Workforce Plan",
    summary: ["The 2024 Defence Workforce Plan outlines Australia’s strategy to expand and enhance the ADF and APS workforce, aiming to grow the permanent ADF workforce to 69,000 by the early 2030s and the combined ADF and APS workforce to around 100,000 by 2040. Key initiatives include extending the Continuation Bonus, increasing Operational Reserves, improving mental health support and aligning workforce growth with capability needs across various domains. The plan also emphasises cultural improvements and significant financial investments, with $5.7 billion allocated over the next four years and $50.3 billion over the next decade.", "Since its release Defence has recorded the largest recruitment surge for the ADF in August 2025. Additionally in February 2026 new roles in the Space domain were announced for direct entry into the ADF."],
    consultation: ["Provided context on workforce priorities in consultations with Defence stakeholders and set clear workforce planning expectations."],
    update2025: ["The VET System Pathways Framework was informed by Strategic Task 5 – Development and Transformation of the Defence Workforce, which identified Defence education and training as core components of workforce attraction and enhancement.", "Both space and cyber capabilities are identified in Chapter 2: Delivering an Integrated, Focused Force (point 2.17) as critical skillsets pivotal to Defence’s situational awareness and warfighting capabilities."],
    update2026: ["Support transition of Defence Veterans to civilian workforce will be informed by Strategic Task 8: Support to Defence Personnel, ADF Families and Transitioning Personnel."]
  },
  { number:"04", owner:"Department of Defence", period:"2024 – ongoing", title:"Australian Government Defence Industry Development Strategy", heading:"04 · Defence Industry Development Strategy",
    summary: ["The Defence Industry Development Strategy outlines Australia’s plan to build a sovereign Defence industrial base to enhance national security and military preparedness. It emphasises the need for a robust industrial structure, identifies seven Sovereign Defence Industrial Priorities (SDIPs) and details initiatives for industry growth, workforce development, innovation and exports. The strategy also highlights the importance of security measures to protect sensitive technologies and information.", "Since its release there have been several announcements for initiatives that support the SDIPs including:", ["A total $30 billion investment in the Osborne Shipyard in South Australia to support construction of the AUKUS submarines", "$17 million has been allocated to 44 Australian businesses in the latest rounds of the Defence Industry Development Grants (DIDG) program in January 2026", "$1.4 billion to advance collaborative air capabilities through the MQ-28A Ghost Bat", "Beginning of production for Guided Multiple Launch Rocket System (GMLRS) missiles in December 2025 at a new factory in Port Wakefield, South Australia."]],
    consultation: ["Provided context on sovereign capability priorities in consultations with Defence stakeholders."],
    update2025: ["Chapter 8 – Workforce of the strategy described building a skilled and capable workforce as being at the core of Defence’s efforts to modernise its capabilities and informed the development of the VET System Pathways Framework."],
    update2026: ["Support Defence skill and capability requirements to operationalise drones will be informed by Sovereign Defence Industrial Priority 5: Development and integration of autonomous systems."]
  },
  { number:"05", owner:"Department of Defence", period:"2024 – ongoing", title:"Australian Government Integrated Investment Program", heading:"05 · Integrated Investment Program",
    summary: ["The Integrated Investment Program outlines the Defence capability investment priorities, including, but not limited to: Undersea Warfare, Maritime capabilities, Space and Cyber, Targeting and Long-Range Strike and Missile Defence. The Integrated Investment Program includes developing a skilled workforce in identified investment areas.", "Since the release of this Strategy, the Minister of Defence announced in December 2025 the establishment of the Defence Delivery Agency. This new agency will integrate three existing capability delivery groups:", ["Capability Acquisition and Sustainment Group", "Guided Weapons and Explosive Ordnance Group", "Naval Shipbuilding and Sustainment Group"], "The aim of this agency is aimed at enabling coordinated and holistic delivery of defence capability and growing sovereign defence industrial base."],
    consultation: ["Provided context on capability acquisition priorities and the skills requirements to deploy them in consultations with Defence stakeholders."],
    update2025: ["Informed the development of:", ["VET System Pathways Framework", "Defence Space Skills", "Defence Cyber Skills"], "Chapter 1: Investing in the National Defence Strategy outlined that investing in a highly skilled workforce is critical to successfully achieving its workforce strategy. This includes “skilling initiatives” related to growing and attracting the required workforce which informed all three strategies.", "Additionally, Chapter 6: Space and Cyber is dedicated to describing Defence’s investment commitment to enhancing its capabilities in both areas and provided foundational work for Public Skills Australia’s strategies in this area."],
    update2026: ["Support Defence skill and capability requirements to operationalise drones and its focus on UAS and drones will be informed by the Chapter 8: Expeditionary Air Operations: Uncrewed air systems investment area."]
  },
  { number:"06", owner:"Australian Government", period:"2024 – ongoing", title:"Australian Government Response to the Final Report of the Royal Commission into Defence and Veteran Suicide", heading:"06 · Government Response to the Royal Commission",
    summary: ["The Australian Government Response to the Final Report of the Royal Commission into Defence and Veteran Suicide commits to addressing systemic challenges and risk factors related to suicide among current and former ADF personnel, agreeing to most of the Royal Commission’s 122 recommendations.", "Specific to Public Skills Australia, Recommendation 83 describes the requirement for Defence “to increase opportunities for members to gain civilian qualifications from Defence training and education.”", "The Reform Management Plan was approved by the Royal Commission into Defence and Veteran Suicide Implementation Program Board on 12 December 2025.", "In December 2025 it was announced that 32 recommendations will be implemented by the end of 2025, with work underway on the remainder of the recommendation. For initiatives across Defence and State/Territory governments in support of Veterans transitioning out of defence careers refer Appendix A."],
    consultation: ["This document outlines critical priorities for Defence and provided substantial material and recommendations to consult on through Defence engagements."],
    update2025: ["Informed the:", ["development of VET System Pathways Framework", "completion of Scoping Proposal to Investigate the Development of Pathways for Transitioning Veterans"], "Specifically, both the VET System Pathways Framework and Scoping Proposal were guided by Recommendation 83(c) that describes the need for expansion of Defence’s education and training programs."],
    update2026: ["This report will inform Public Skills Australia’s research into Support transition of Defence Veterans to civilian workforce, which proposes to increase opportunities for ADF members to gain civilian qualifications by expanding existing Defence training courses."]
  },
  { number:"07", owner:"Department of Defence", period:"2024 – ongoing", title:"2024 Naval Shipbuilding and Sustainment Plan", heading:"07 · Naval Shipbuilding and Sustainment Plan",
    summary: ["This plan sets out the activities required to uplift the ADF’s maritime capability. This includes enabling:", ["conventionally armed nuclear-powered submarines", "enhanced lethality surface combatants", "minor war vessels and Army landing craft"], "Importantly, this plan describes Australia’s commitment to continuous naval shipbuilding and sustainment.", "In February 2027 the Prime Minister announced a total $30 billion investment in the Osborne Shipyard in South Australia to support construction of the AUKUS submarines."],
    consultation: ["Provided guidance on priorities for enabling the AUKUS work program in consultations with Jobs and Skills Australia, the Australian Submarine Organisation and Defence stakeholders."],
    update2025: ["Informed the development of the Defence Capability – VET System Pathways Framework Project. Specifically, Chapter 3: Workforce identifies the need for the Vocational Education and Training system to support the upskilling of Defence’s shipbuilding and submarine workforce."]
  },
  { number:"08", owner:"Department of Defence", period:"2025 – 2028", title:"Defence Digital Strategy and Roadmap 2025", heading:"08 · Defence Digital Strategy and Roadmap 2025",
    summary: ["The Defence Digital Strategy and Roadmap document provides comprehensive guidance on Defence’s plan to stay well positioned in the digital age. This strategy sets out the following three priorities:", ["Best-in-class APS/ADF workforce", "Best-in-class global platforms", "Best-in-class sovereign capabilities"], "Collectively, this strategy ensures Defence enhances its ICT capabilities to deliver critical digital functions."],
    consultation: ["This will inform continued consultations with Defence stakeholders as the Defence Cyber Skills strategy progresses."],
    update2025: ["Informed development and progression of Defence Cyber Skill Set Project. Specifically, the strategy describes ICT capabilities as being at the core of its commitment to becoming a “best-in-class workforce”, maintaining “best-in￾class global platforms” and possessing “best-in-class sovereign capabilities”."]
  },
];

export default function PublicSafetyDefenceExistingStrategiesView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  const strategy = strategies[active];
  return <PublicSafetyPageShell contentClassName={styles.page} slug={slug} report={report} currentPage="defence_existing_strategies" navigation={{back:{label:"Executive Summary",href:`/reports/${slug}/executive_summary`},backSecondary:{label:"Defence chapter",href:`/reports/${slug}/defence`},prev:{label:"2025 Strategy Updates",href:`/reports/${slug}/defence_update_2025_strategies`},next:{label:"Defence Veterans’ Programs and Initiatives",href:`/reports/${slug}/defence_federal_initiatives`},prevPrefix:"Previous Section:",nextPrefix:"Next Section:"}}>
    <section className={styles.hero}>
      <div>
        <span className={styles.badge}>Defence</span>
        <h1>Existing Industry-Sector Strategies</h1>
        <p>Select a strategy to open its detail and how it informs Public Skills Australia’s work.</p>
      </div>
      <Image className={existing.artwork} src="/images/reports/public-safety/defence-existing-strategies-group-85.svg" alt="" width={487} height={104} unoptimized priority />
    </section>

    <section className={styles.projects} aria-labelledby="defence-existing-list">
      <div>
        <h2 id="defence-existing-list">Strategies · 8 · Select to open</h2>
        <div className={styles.projectList}>
          {strategies.map((item, index) => (
            <button key={item.number} type="button" className={styles.projectButton} aria-pressed={active === index} aria-controls="defence-existing-panel" onClick={() => setActive(index)}>
              <span><small>{item.number} · {item.owner}</small><strong>{item.title}</strong></span>
              <span className={styles.arrow}><ArrowRight size={16} aria-hidden="true" /></span>
            </button>
          ))}
        </div>
      </div>
      <article id="defence-existing-panel" className={styles.panel} aria-labelledby="defence-existing-heading">
        <div className={styles.panelHeader}>
          <span className={styles.badge}>{strategy.number} · {active === 0 ? strategy.period : strategy.owner}</span>
          <div className={`${styles.controls} ${active > 0 ? existing.controls : ""}`}>
            {active > 0 && <button className={styles.previous} type="button" onClick={() => setActive(active - 1)}><ArrowLeft size={16} aria-hidden="true" /> Previous</button>}
            {active < strategies.length - 1 && <button type="button" onClick={() => setActive(active + 1)}>Next <ArrowRight size={16} aria-hidden="true" /></button>}
          </div>
        </div>
        <div key={strategy.number} className={`${styles.details} animate-content-switch`}>
          <header className={`${styles.detailHeader} ${existing.detailHeader} ${active > 0 ? existing.selectedHeader : ""}`}>
            <h3 id="defence-existing-heading">{active === 0 ? strategy.heading : strategy.title}</h3>
            <span>{strategy.owner} · {strategy.period}</span>
          </header>
          <h4 className={`${styles.subheading} ${existing.sectionHeading}`}>Summary</h4>
          <div className={`${styles.copy} ${existing.summary} ${active === strategies.length - 1 ? existing.compactSummary : ""}`}>
            <StrategyText copy={strategy.summary} />
          </div>
          <section className={`${styles.groups} ${existing.groups}`} aria-label="How this informs Public Skills Australia’s work">
            <h4 className={existing.sectionHeading}>How this informs Public Skills Australia’s work</h4>
            {([
              ["Consultation and engagement:", strategy.consultation],
              ["2025 Workforce Strategies", strategy.update2025],
              ["2026 Workforce Strategies", strategy.update2026],
            ] as const).map(([title, body]) => body && (
              <div key={title} className={`${styles.note} ${existing.note}`}>
                <h5>{title}</h5>
                <StrategyText copy={body} />
              </div>
            ))}
          </section>
        </div>
      </article>
    </section>

    <section className={sources.sources}><h2>Sources</h2><ol start={41}>{["Australian Government, ‘Progress on the Defence Strategic Review’, Transparency Portal, Australian Government website, 2026, accessed 3 February 2026.","Department of Defence, Defence Annual Report 2024–25, Department of Defence, Australian Government, 2025, accessed 4 February 2026."].map((source,index)=><li key={source}><span className={sources.sourceNumber} aria-hidden="true">{index+41}</span><span>{source}</span></li>)}</ol></section>
  </PublicSafetyPageShell>;
}
