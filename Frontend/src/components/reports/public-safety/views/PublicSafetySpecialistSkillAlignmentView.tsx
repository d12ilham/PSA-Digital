"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import styles from "./PublicSafetySpecialistSkillAlignmentView.module.css";

const packages = [
  { tag: "Defence training package", code: "DEFMIL024", title: "Conduct military searches", color: "#D3992C" },
  { tag: "Public Safety training package", code: "PUAAMS007", title: "Coordinate search and rescue operations", color: "#C9481A" },
  { tag: "Police training package", code: "POLSAR012", title: "Coordinate police search and rescue (SAR) operations", color: "#0D71A3" },
];

const sharedSkills = [
  { number: "1", title: "Planning and preparation", body: "Relating to planning for searches, selecting/deploying search equipment and preparing for deployment." },
  { number: "2", title: "Search techniques and procedures", body: "Relating to the application of search techniques and/or procedures relevant to the types of searches." },
  { number: "3", title: "Information management and recording", body: "Requiring a level of record keeping and information handling." },
  { number: "4", title: "Communication and coordination", body: "Emphasising inter-organisation coordination and team communication." },
];

const comparisonRows = [
  {
    skill: "Planning and preparation",
    defence: ["Identify purpose, timing, environment and type of search from supervisor", "Select and use appropriate personal protective equipment", "Identify, obtain, inspect and test tools and search equipment appropriate to the type of search and report any faults", "Deploy to an incident site or search area."],
    emergency: ["Search and rescue assets and potential assets are identified and recorded in databases", "Strategic and tactical objectives are identified, in accordance with search and rescue unit plans", "Hazards are identified, risks assessed and control measures implemented."],
    police: ["Assess environmental factors to determine impact on SAR operation", "Assess resources required to undertake SAR operations based on information about environmental factors", "Develop rescue plan to assist in managing SAR operation."],
  },
  {
    skill: "Search techniques and procedures",
    defence: ["Carry out search drills/procedures applicable to the type of search", "Protect potential evidence and/or other items or material of interest from contamination, improper handling or removal."],
    emergency: ["Search and rescue procedures and policies are communicated to personnel, groups and other organisations, in accordance with the needs of those people", "Initial search procedures are implemented, in accordance with search and rescue organisational policies."],
    police: ["Determine search patterns in accordance with environmental conditions/factors", "Apply search techniques to support SAR operation."],
  },
  {
    skill: "Information management and recording",
    defence: ["Record information and complete report."],
    emergency: ["Information management strategies are identified and applied."],
    police: ["Maintain critical decision records for accountability purposes."],
  },
  {
    skill: "Communication and coordination",
    defence: ["Coordinate the preparation of the search site and the conduct of searches with other organisations."],
    emergency: ["Search and rescue procedures and policies are communicated to personnel, groups and other organisations, in accordance with the needs of those people."],
    police: ["Liaise with stakeholders to ensure effective coordination of resources", "Coordinate assets through delegation of roles and responsibilities."],
  },
];


function DesignLines({ lines }: { lines: string[] }) {
  return <>{lines.map((line, index) => <span className={styles.designLine} key={line}>{line}{index < lines.length - 1 ? " " : ""}</span>)}</>;
}

const skillTitleLines = [
  ["Planning and preparation"],
  ["Search techniques and", "procedures"],
  ["Information management", "and recording"],
  ["Communication and", "coordination"],
];
const skillBodyLines = [
  ["Relating to planning for", "searches, selecting/deploying", "search equipment and preparing", "for deployment."],
  ["Relating to the application of", "search techniques and/or", "procedures relevant to the types", "of searches."],
  ["Requiring a level of record", "keeping and information", "handling."],
  ["Emphasising inter-organisation", "coordination and team", "communication."],
];

export default function PublicSafetySpecialistSkillAlignmentView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const section = (entry.target as HTMLElement).dataset.reveal;
        if (section) setVisible((current) => current.includes(section) ? current : [...current, section]);
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    contentRef.current?.querySelectorAll("[data-reveal]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const reveal = (section: string) => visible.includes(section) ? styles.enter : styles.pending;

  return (
    <PublicSafetyPageShell
      slug={slug} report={report} currentPage="cross_sector_specialist_skill_alignment" contentClassName={styles.page}
      navigation={{
        back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        prev: { label: "Core Skill Alignment", href: `/reports/${slug}/cross_sector_core_skill_alignment` },
        next: { label: "Skills Recognition", href: `/reports/${slug}/cross_sector_skills_recognition` },
        prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
      }}
    >
      <div ref={contentRef} className={styles.content}>
        <section className={`${styles.hero} ${styles.enter}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Cross-Sector Analysis · 02</p>
            <h1>Specialist Skill Alignment</h1>
            <p className={styles.heroDescription}><DesignLines lines={["Alongside core skill alignment, some roles in the Public Safety industry-sectors share similar", "specialist skills alignment. While each industry-sector holds distinct operational and legislative", "contexts, there are specialist roles and skills alignment between, for example:"]} /></p>
          </div>
          <div className={styles.diagram}>
            <Image src="/images/reports/public-safety/specialist-alignment-diagram.svg" width={702} height={268} loading="eager" unoptimized alt="Skills alignment connects Investigations, Incident Command, Intelligence, and Search and Rescue with crossed lines. Search and Rescue is the worked example below." />
          </div>
        </section>

        <section data-reveal="example" className={`${styles.example} ${reveal("example")}`}>
          <h2 className={styles.sectionTitle}>Example</h2>
          <p className={styles.exampleIntro}><DesignLines lines={["All three industry-sectors hold search and rescue related training products. The comparison illustrated below demonstrates", "from a Vocational Education and Training (VET) Training Package perspective, that units of competency are similar across", "the search and rescue skills landscape. The following units are used for this demonstration:"]} /></p>
          <div className={styles.packageGrid}>
            {packages.map((item, index) => (
              <article key={item.code} className={`${styles.packageCard} ${reveal("example")}`} style={{ animationDelay: `${index * .1 + .1}s` }}>
                <span className={styles.accent} style={{ backgroundColor: item.color }} />
                <span className={styles.packageTag} style={{ backgroundColor: item.color }}>{item.tag}</span>
                <h3>{item.code}</h3>
                <p>{item.code === "POLSAR012" ? "Coordinate police search and rescue operations" : item.title}</p>
              </article>
            ))}
          </div>
          <p className={styles.sharedIntro}>These three units contain shared skills relating to:</p>
          <div className={styles.sharedGrid}>
            {sharedSkills.map((item, index) => (
              <article key={item.number} className={`${styles.sharedCard} ${reveal("example")}`} style={{ animationDelay: `${index * .1 + .35}s` }}>
                <span className={styles.number} aria-hidden="true">{item.number}</span>
                <h3><DesignLines lines={skillTitleLines[index]} /></h3>
                <p><DesignLines lines={skillBodyLines[index]} /></p>
              </article>
            ))}
          </div>
        </section>

        <aside data-reveal="note" className={`${styles.note} ${reveal("note")}`}><p><DesignLines lines={["Where these units of competency differ is in the application in operational contexts and the complexity of learning, with", "DEFMIL024 focused more on tactical tasks associated with conducting searches, whereas the PUAAMS007 and POLSAR012", "units of competency are broader in their application of planning and coordinating search and rescue operations."]} /></p></aside>

        <section data-reveal="table" className={reveal("table")}>
          <h2 id="specialist-comparison-heading" className={styles.sectionTitle}>Cross Industry-Sector Units of Competency Insights</h2>
          <div className={styles.tableScroll} role="region" aria-labelledby="specialist-comparison-heading" tabIndex={0}>
            <table className={styles.table}>
              <caption className={styles.srOnly}>Comparison of approved performance criteria for Defence, Public Safety and Police search and rescue training products.</caption>
              <colgroup><col className={styles.skillColumn} /><col /><col /><col /></colgroup>
              <thead><tr>
                <th scope="col">Relevant Performance Criteria</th>
                {packages.map((item) => <th key={item.code} scope="col"><span>{item.code}</span><span>{item.title}</span></th>)}
              </tr></thead>
              <tbody>{comparisonRows.map((row) => (
                <tr key={row.skill}>
                  <th scope="row">{row.skill}</th>
                  {[row.defence, row.emergency, row.police].map((points, columnIndex) => {
                    const plain = (row.skill === "Communication and coordination" && columnIndex === 1) || (row.skill === "Information management and recording" && columnIndex === 0);
                    return <td key={columnIndex}>{plain ? <p>{points[0]}</p> : <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>}</td>;
                  })}
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>
      </div>
    </PublicSafetyPageShell>
  );
}
