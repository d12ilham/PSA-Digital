"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import styles from "./PublicSafetySkillsRecognitionView.module.css";

const copy = {
  "intro": "VET training products can be leveraged to potentially reduce duplication of training package development, training material development and support skill recognition in and between the Public Safety industry-sectors (impacting workforce mobility, interoperability, career transition and enhancing productivity).",
  "integration": "When shared skills, such as those identified in the comparison table above, are recognised and aligned, it may enable smoother integration of personnel in joint operations environments.",
  "transition": "Some areas in Public Safety industry-sectors further seek to use recognition of prior learning (RPL) to reduce lead-in times for personnel transitioning. Noting the similarity of operational context and skills, this may be further leveraged and give effect to important recommendations such as Recommendation 83 of the Royal Commission into Defence and Veteran Suicide.",
  "fraud": "The prevalence of RPL fraud makes acceptance of RPL in the VET sector complicated, resulting in a loss of trust in the RPL process. In turn, this means that personnel often are required to complete training for a unit of competency that they already hold, resulting in productivity losses and more impost on already strained training services in the Public Safety industry-sectors. The Productivity Commission indicated that fewer than 5 per cent of successful completions/results are granted through RPL. Further, as the VET sector is highly regulated by quality assurance organisations such as the Training Accreditation Council (TAC – Western Australia), Victoria Registration Qualifications Authority (VRQA – Victoria) and the Australian Skills Quality Authority (ASQA – for the remainder of the states and territories), Registered Training Organisations (RTOs), TAFEs and employers are reluctant to accept RPL outcomes due to the evidence required of competency by documents such as the ASQA 2025 Standards for RTOs. This is loosely referred to as ‘audit fear’, dissuading genuine training providers from using RPL and/or underreporting its use.",
  "costs": "RPL applications require the same rigour of assessment as when assessing a student’s competency for the first time. Extensive portfolios of evidence are required, often resulting in students requesting to either repeat training or undertaking vigorous assessments to prove competencies. Further, RPL requires assessors familiar and experienced in RPL, which make RPL assessments costly (both timing and financial costs)."
};
const outcomes = ["Workforce Mobility", "Interoperability", "Career Transition", "Enhanced Productivity"];
const differences = [
  { lines: ["Policies and procedures"], icon: "policies" },
  { lines: ["Legislation and regulatory", "requirements"], icon: "legislation" },
  { lines: ["Roles and remits of Public", "Safety organisations"], icon: "organisations" },
  { lines: ["Operating contexts"], icon: "contexts" },
  { lines: ["Equipment, appliances and", "other technology used"], icon: "equipment" },
  { lines: ["Ranks and structures"], icon: "ranks" },
];

function DesignLines({ lines }: { lines: string[] }) { return <>{lines.map((line, index) => <span className={styles.designLine} key={line}>{line}{index < lines.length - 1 ? " " : ""}</span>)}</>; }

export default function PublicSafetySkillsRecognitionView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
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
    <PublicSafetyPageShell slug={slug} report={report} currentPage="cross_sector_skills_recognition" contentClassName={styles.page}
      navigation={{
        back: { label: "Executive Summary", href: "/reports/" + slug + "/executive_summary" },
        prev: { label: "Specialist Skill Alignment", href: "/reports/" + slug + "/cross_sector_specialist_skill_alignment" },
        next: { label: "Defence", href: "/reports/" + slug + "/defence" },
        prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
      }}>
      <div ref={contentRef} className={styles.content}>
        <section className={styles.hero + " " + styles.enter}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Cross-Sector Analysis · 03</p>
            <h1>Skills Recognition</h1>
            <p className={styles.heroIntro}><DesignLines lines={["VET training products can be leveraged to potentially reduce duplication of training package development, training material", "development and support skill recognition in and between the Public Safety industry-sectors (impacting workforce mobility,", "interoperability, career transition and enhancing productivity)."]} /></p>
            <div className={styles.outcomes}>{outcomes.map((outcome) => <span key={outcome}>{outcome}</span>)}</div>
            <p className={styles.integration}><DesignLines lines={["When shared skills, such as those identified in the comparison table above, are recognised and aligned, it may enable", "smoother integration of personnel in joint operations environments."]} /></p>
            <p className={styles.transition}><DesignLines lines={["Some areas in Public Safety industry-sectors further seek to use recognition of prior learning (RPL) to reduce lead-in times", "for personnel transitioning. Noting the similarity of operational context and skills, this may be further leveraged and give", "effect to important recommendations such as Recommendation 83 of the Royal Commission into Defence and Veteran", "Suicide."]} /></p>
          </div>
          <div className={styles.diagram}>
            <picture>
              <source media="(prefers-reduced-motion: reduce)" srcSet="/images/reports/public-safety/skills-recognition-group-92.svg" />
              <Image src="/images/reports/public-safety/skills-recognition-group-92-animated.svg" width={463} height={352} alt="Defence, navy, air force, fire and police vehicles linked by a dotted line" unoptimized loading="eager" />
            </picture>
          </div>
        </section>
        <section data-reveal="challenges" className={reveal("challenges")}>
          <h2 className={styles.sectionTitle}>Challenges in the delivery of Recognition of Prior Learning (RPL) services</h2>
          <p className={styles.sectionIntro}>The Productivity Commission identified the following challenges in the delivery of RPL services.<sup className={styles.footnote}><a href="#recognition-source-11" aria-label="Source 11">11</a></sup> This includes:</p>
          <div className={styles.challengeGrid}>
            {[{ title: "Challenges with RPL fraud", body: copy.fraud }, { title: "RPL processes are costly and complex", body: copy.costs }].map((item, index) => (
              <article key={item.title} className={styles.challengeCard + " " + reveal("challenges")} style={{ animationDelay: index * .14 + "s" }}>
                <span className={styles.accent} /><span className={styles.number} aria-hidden="true">{index + 1}</span>
                <h3>{item.title}</h3><p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section data-reveal="differences" className={reveal("differences")}>
          <h2 className={styles.sectionTitle}>Differences limiting the use of RPL between sectors</h2>
          <p className={styles.differencesIntro}><DesignLines lines={["Challenges with RPL are not exclusive to the Public Safety industry-sectors and are shared with other industries. Other", "factors that affect the limited use of RPL in the Public Safety industry-sector include:"]} /></p>
          <div className={styles.differencesPanel}>
            <p className={styles.panelLabel}>Differences</p>
            <div className={styles.differenceGrid}>{differences.map(({ lines, icon }, index) => (
              <div key={icon} className={styles.differenceCard + " " + reveal("differences")} style={{ animationDelay: index * .08 + .1 + "s" }}>
                <Image src={"/images/reports/public-safety/skills-recognition/" + icon + ".svg"} width={72} height={72} alt="" unoptimized />
                <span className={styles.differenceLabel}>{lines.map((line) => <span key={line}>{line}</span>)}</span>
              </div>
            ))}</div>
            <p className={styles.context}><DesignLines lines={["An interesting complexity of the VET sector is the drive to integrate the areas above into training delivery to ensure students", "are job ready. In Public Safety industry-sectors, such contextualisation is crucial, noting the operating environment.", "However, it is exactly this contextualisation of training that limits RPL when employees want to work in other industries."]} /></p>
          </div>
        </section>
        <section data-report-sources data-reveal="sources" className={styles.sources + " " + reveal("sources")}>
          <h2>Sources</h2>
          <ol start={11}><li id="recognition-source-11" value={11}><span className={styles.sourceNumber} aria-hidden="true">11</span><p>Productivity Commission, Building a skilled and adaptable workforce, Productivity Commission, Australian Government, 2025.</p></li></ol>
        </section>
      </div>
    </PublicSafetyPageShell>
  );
}
