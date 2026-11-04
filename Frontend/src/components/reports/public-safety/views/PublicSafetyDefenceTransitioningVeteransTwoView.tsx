"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import styles from "./PublicSafetyDefenceEmergingTechnologyView.module.css";

export default function PublicSafetyDefenceTransitioningVeteransTwoView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const reportPath = `/reports/${slug}`;
  return <PublicSafetyPageShell
    slug={slug}
    report={report}
    currentPage="defence_transitioning_veterans_2"
    contentClassName={`${styles.page} ${styles.veteransTwo}`}
    navigation={{
      back: { label: "Defence Workforce Insights", href: `${reportPath}/defence_workforce_insights` },
      backSecondary: { label: "Executive Summary", href: `${reportPath}/executive_summary` },
      prev: { label: "Workforce Insights", href: `${reportPath}/defence_workforce_insights` },
      next: { label: "Workforce Strategies", href: `${reportPath}/defence_workforce_strategies` },
      prevPrefix: "Previous Section:",
      nextPrefix: "Next Section",
    }}
  >
    <section className={styles.hero} aria-labelledby="defence-veterans-two-title">
      <div className="animate-slide-up">
        <p className={styles.badge}>Theme 2. Transitioning Veterans. Insight Two</p>
        <h1 id="defence-veterans-two-title">2. Transitioning Veterans</h1>
      </div>
      <Image className={`${styles.icon} animate-zoom-in`} src="/images/reports/public-safety/defence-veterans-icon.png" width={120} height={120} alt="" unoptimized priority />
    </section>

    <section className={`${styles.content} animate-slide-up`} aria-labelledby="defence-veterans-two-support">
      <div className={styles.callout}>
        <span className={styles.number} aria-hidden="true">2</span>
        <div className={styles.calloutCopy}>
          <p className={styles.insightLabel}>Theme Two, Insight Two</p>
          <p className={styles.insightText}>Greater focus is required to support transitioning veterans to articulate the transferability of their VET qualifications and the relevance of their ADF experience to the civilian workforce. Where support is available, the information provided at times is out of date and inconsistent.</p>
        </div>
        <Image className={`${styles.icon} animate-zoom-in`} src="/images/reports/public-safety/defence-emerging-insight-icon.png" width={120} height={120} alt="" unoptimized />
      </div>
      <h2 id="defence-veterans-two-support">Articulating skills — state and territory support</h2>
      <div className={styles.body}>
        <p>While much of the focus for transitioning veterans was based on issuing VET qualifications post-service, a challenge raised by Defence stakeholders related to enabling veterans to articulate their skills through their VET qualifications to prospective employers. Current support for veterans to articulate their skills is available, however the programs and information differ based on states and territories.</p>
        <p>Defence stakeholders advised that the current support should be bolstered – Appendix A – Defence Veterans’ Programs and Initiatives – highlights some of the programs in each state and territory, and the information available to support veteran transition out of the ADF and into the civilian workforce.</p>
      </div>
      <Link className={styles.veteransAppendix} href={`${reportPath}/defence_federal_initiatives`}>
        <span>Appendix A – Defence Veterans’ Programs and Initiatives</span>
        <span className={styles.appendixAction}>Open <ChevronDown size={14} aria-hidden="true" /></span>
      </Link>
      <div className={styles.body}>
        <p>Some programs, such as TAFE NSW Ranks to Recognition Program, mirror the ADF programs offered to transitioning and transitioned veterans. Additionally, some states and territories (such as the Northern Territory) have adopted initiatives like the Rank to Grade Guide to better support veterans.<sup>36</sup> In the ACT, the ACTPS Veterans’ Employment Strategy has not been updated since 2020 but rather aligned to the broader programs at the federal level.</p>
        <p>Defence stakeholders emphasised that transitioning veterans should be provided with clear information to understand how the qualifications they obtained during service is relevant in the civilian workforce. This may be further supported through guidance on the programs on offer, options available and understanding how the varying roles and ranks across the ADF could translate to a civilian context. An additional benefit could be the identification of where such services could be streamlined.</p>
      </div>
    </section>

    <hr className={styles.divider} />

    <section className={`${styles.sources} animate-slide-up`} aria-labelledby="defence-veterans-two-source">
      <h2 id="defence-veterans-two-source">Sources</h2>
      <ol start={36}>
        <li>
          <span className={styles.sourceNumber} aria-hidden="true">36</span>
          <span>Northern Territory Government, Northern Territory Defence Veterans Strategy, n.d., Northern Territory Government, accessed 16 December 2025.</span>
        </li>
      </ol>
    </section>
  </PublicSafetyPageShell>;
}
