"use client";

import Image from "next/image";
import styles from "./PublicSafetyDefenceEmergingTechnologyView.module.css";
import { useEffect, useRef, useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const commission = "Royal Commission into Defence and Veteran Suicide, Final Report – Volume 5: Transition, DVA and Support for Ex-Serving Members, Attorney-General’s Department, Australian Government, 2024, accessed 14 November 2025.";
const recognition = "Department of Defence, Military Skill Recognition [website], Department of Defence, Australian Government, n.d., accessed 17 November 2025.";
const qualification = "Australian Defence Force, How to Use a Qualification, Australian Defence Force, n.d., accessed 17 November 2025.";

const sources = [
  "NSW Veterans Affairs, NSW Veterans Strategy and Action Plan 2025-2030, New South Wales Government, 2025, page 10, accessed 10 December 2025.",
  commission, commission, recognition, recognition, qualification, qualification,
];

export default function PublicSafetyDefenceTransitioningVeteransView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const contentRef = useRef<HTMLElement>(null);
  const sourcesRef = useRef<HTMLElement>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [sourcesVisible, setSourcesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === contentRef.current) setContentVisible(true);
        if (entry.target === sourcesRef.current) setSourcesVisible(true);
      });
    }, { threshold: 0.08 });
    if (contentRef.current) observer.observe(contentRef.current);
    if (sourcesRef.current) observer.observe(sourcesRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="defence_transitioning_veterans"
      contentClassName={`${styles.page} ${styles.veterans}`}
      navigation={{
        back: { label: "Defence Workforce Insights", href: `/reports/${slug}/defence_workforce_insights` },
        backSecondary: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        prev: { label: "Workforce Insights", href: `/reports/${slug}/defence_workforce_insights` },
        next: { label: "Transitioning Veterans 2", href: `/reports/${slug}/defence_transitioning_veterans_2` },
        prevPrefix: "Previous Section:",
        nextPrefix: "Next Section",
      }}
    >
      <section className={styles.hero} aria-labelledby="defence-veterans-title">
        <div className="animate-slide-up">
          <p className={styles.badge}>Theme 2. Transitioning Veterans. Insight One</p>
          <h1 id="defence-veterans-title">2. Transitioning Veterans</h1>
        </div>
        <Image className={`${styles.icon} animate-zoom-in`} src="/images/reports/public-safety/defence-veterans-icon.png" width={120} height={120} alt="" unoptimized priority />
      </section>

      <section ref={contentRef} className={`${styles.content} ${contentVisible ? "animate-slide-up" : styles.pending}`} aria-label="Transitioning Veterans Insight One">
        <div className={styles.callout}>
          <span className={styles.number} aria-hidden="true">1</span>
          <div className={styles.calloutCopy}>
            <p className={styles.insightLabel}>Theme Two, Insight One</p>
            <p className={styles.insightText}>The Vocational Education and Training (VET) system remains important for the ADF as it provides a national standard, with meaningful qualifications written by industry, for industry.</p>
          </div>
          <Image className={`${styles.icon} ${contentVisible ? "animate-zoom-in" : ""}`} src="/images/reports/public-safety/defence-emerging-insight-icon.png" width={120} height={120} alt="" unoptimized />
        </div>

        <div className={styles.veteransColumns}>
          <aside className={styles.veteransDefinition}>
            <p>Defence veterans are defined as:</p>
            <blockquote>“all ex-serving personnel who have ever served at least one day in the Australian Defence Force (ADF), including reservists, personnel who experienced operational deployments and personnel who served in peacekeeping and peace-making operations, including humanitarian and domestic support operations.”<sup>29</sup></blockquote>
          </aside>
          <div>
            <h2>Royal Commission into Defence and Veteran Suicide – Recommendation <small>83</small></h2>
            <div className={styles.body}>
              <p>The Final Report for the Royal Commission into Defence and Veteran Suicide details the transition from military to civilian life and examines the challenges that veterans may face when seeking employment post-service.<sup>30</sup></p>
              <p>Of the 122 recommendations, Recommendation 83: “Increase opportunities for personnel to gain civilian qualifications from Defence training and education, Focus Area C ‘fill the gap’ between Defence and civilian training (where an equivalent civilian qualification exists), either by expanding the content of the Defence training course or by funding bridging training for personnel prior to separation” was highlighted in the 2025 Public Safety Workforce Insights Report as a focus area for Public Skills Australia to support the Defence industry-sector.<sup>31</sup></p>
            </div>
            <h2>Recognition of Prior Learning and the VET system</h2>
            <div className={styles.body}>
              <p>The skills and experience that ADF personnel obtain throughout their service can be considered towards any additional study post-service, or towards future job roles in the civilian workforce through RPL provided by ADF Transition and Civil Recognition.<sup>32</sup> Once assessed, a veteran’s existing skills, work level standards and experience can result in being awarded qualifications and/or micro-credentials which have transferability to industries external to Defence.<sup>33</sup></p>
              <p>Defence stakeholders emphasised the importance of the VET system for this purpose as associated education and training products represent particular skills (through the units of competency) as a national standard for relevant occupations.<sup>34</sup> Awarding VET qualifications allows Defence veterans to demonstrate that they have met a national standard that can be recognised across the country by RTOs, industries and employers.<sup>35</sup></p>
            </div>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      <section ref={sourcesRef} className={`${styles.sources} ${sourcesVisible ? "animate-slide-up" : styles.pending}`} aria-labelledby="defence-veterans-sources">
        <h2 id="defence-veterans-sources">Sources</h2>
        <ol start={29}>
          {sources.map((source, index) => <li key={index + 29} className={sourcesVisible ? "animate-card-entrance" : undefined} style={{ animationDelay: `${index * .05 + .1}s` }}>
            <span className={styles.sourceNumber} aria-hidden="true">{index + 29}</span>
            <span>{source}</span>
          </li>)}
        </ol>
      </section>
    </PublicSafetyPageShell>
  );
}
