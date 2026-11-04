import Image from "next/image";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

import layout from "./PublicSafetyDefenceView.module.css";
import styles from "./PublicSafetyPoliceDigitalForensicsView.module.css";

const sources = [
  "IBM, What is computer forensics?, IBM website, n.d., accessed 12 November 2025.",
  "E Scott, Forensic science and the criminal justice system, UK Parliament House of Lords Library, 2021, accessed 5 March 2026, p 37.",
  "His Majesty's Inspectorate of Constabulary and Fire & Rescue Services (HMICFRS), An inspection into how well the police and other organisations use digital forensics in their investigations, 2022, accessed 12 November 2025.",
  "His Majesty's Inspectorate of Constabulary and Fire & Rescue Services (HMICFRS), An inspection into how well the police and other organisations use digital forensics in their investigations, 2022, accessed 12 November 2025.",
  "M Ng, J James and R Bull, A reflexive thematic analysis of current challenges and future directions of digital forensic investigations in the UK, Forensic Science International: Digital Investigation, 2024, 51:1–9.",
  "G Liddy, To research international digital forensics strategies to inform future operating models, Winston Churchill Memorial Trust, 2023, accessed 20 November 2025.",
  "IBM, What is computer forensics?, IBM website, n.d., accessed 12 November 2025.",
  "National Police Chiefs' Council (NPCC), National Digital Forensic Science Strategy, NPCC, 2020, accessed 18 November 2025.",
  "Jobs and Skills Australia (JSA), Cyber security skills in demand as labour market evolves, JSA, accessed 20 November 2025.",
  "Jobs and Skills Australia (JSA), Cyber security skills in demand as labour market evolves, JSA, accessed 20 November 2025.",
  "Jobs and Skills Australia (JSA), Australian Labour Market for Migrants – October 2025, JSA website, 2025, p 9, accessed 20 November 2025.",
];

export default function PublicSafetyPoliceDigitalForensicsView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="police_digital_forensics" contentClassName={`${layout.page} ${styles.page}`} navigation={{
    back: { label: "Police Workforce Insights", href: `/reports/${slug}/police_workforce_insights` },
    backSecondary: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    prev: { label: "Workforce Insights", href: `/reports/${slug}/police_workforce_insights` },
    next: { label: "Digital Forensics · Insight Two", href: `/reports/${slug}/police_digital_forensics_2` },
    prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
  }}>
    <section className={`${styles.panel} ${layout.enter}`}>
      <div className={styles.banner}>
        <span className={styles.number} aria-hidden="true">1</span>
        <div className={styles.bannerCopy}>
          <p>Digital Forensics · Insight One</p>
          <div className={styles.headline}>
            <Image className="animate-zoom-in" src="/images/reports/public-safety/police-forensics-insight.png" width={72} height={72} alt="" unoptimized />
            <h1>Skills shortages and strong demand for similar skills may require the establishment of multiple entry pathways for digital forensic professionals into policing.</h1>
          </div>
        </div>
        <div className={`${styles.illustration} animate-zoom-in`}>
          <Image src="/images/reports/public-safety/police-forensics-hero.png" width={90} height={90} alt="" unoptimized />
        </div>
      </div>
    </section>

    <div className={styles.columns}>
    <section className={`${styles.panel} ${layout.enter}`}><h2>Demand for digital forensics</h2><p className="mt-6 text-sm leading-6 text-[#535862]">Broader digital transformation and the increasing adoption of technology means that evidence can be found on a growing array of devices, such as computer systems, mobile phones, cars, doorbells and dog collars.<sup>69</sup> According to testimonial evidence in the United Kingdom, most criminal investigations now contain elements of digital evidence that require retrieval and examination by digital forensic experts, whether from computers, mobile phones, CCTV, GPS systems or other digital devices.<sup>70</sup></p><p className="mt-4 text-sm leading-6 text-[#535862]">Despite increased demand for digital forensics, there has not been a corresponding uplift in capability and coordination in this area.<sup>71</sup> This has led to a substantial backlog of digital forensics work.<sup>72</sup> Australian stakeholders indicated that digital forensics required to support contemporary investigations needs a different set of skills to other forensic field sciences such as fingerprint and firearms examination. Digital evidence is more easily destroyed, can span multiple jurisdictions and is evolving at a rapid pace.<sup>73</sup></p></section>

    <section className={`${styles.panel} ${layout.enter}`}><h2>Three domains of digital forensic skills</h2><p className="mt-6 text-sm leading-6 text-[#535862]">Through consultations, it was identified that digital forensic skills required in policing cover three domains:</p><ul className="mt-3 space-y-3 pl-5 text-sm leading-6 text-[#535862]"><li className="list-disc"><strong>Foundation skills across policing:</strong> Police working on investigations involving digital evidence require an understanding of how data has been gathered, acquired and any limitations that data may have, in the same way as physical forensic evidence.<sup>74</sup> Police collecting digital evidence must know how to store data without altering it: even opening, printing or saving files can permanently change metadata and place evidence in question.<sup>75</sup></li><li className="list-disc"><strong>Core Digital Forensic Examiner Skills:</strong> Digital forensic examiners must have core skills, be adaptable and focus on problem solving in ever-changing digital environments, technologies, operating systems and devices.<sup>76</sup></li><li className="list-disc"><strong>Specialist Digital Forensics Roles:</strong> Consultation identified advanced roles including Advanced Digital Forensic Examiner, Mobile Device Forensic Specialist, Cloud and Network Forensics Specialist and Quality Assurance / Technical Reviewer.</li></ul></section>

    <section className={`${styles.panel} ${layout.enter}`}><h2>Skills shortages and entry pathways</h2><p className="mt-6 text-sm leading-6 text-[#535862]">Cyber Security Professionals, including digital forensic specialists, are experiencing sustained demand. Employment in this group is projected to grow 14.2 per cent between 2024 and 2029,<sup>77</sup> more than double the national average growth rate of 6.6 per cent.<sup>78</sup> Similar digital skills are in demand in the private sector, where wages are generally higher.</p><p className="mt-4 text-sm leading-6 text-[#535862]">Jobs and Skills Australia&apos;s Occupation Shortage List analysis identifies several cyber security occupations in national shortage, indicating challenges in filling vacancies for most jurisdictions.<sup>79</sup> Combined with wider policing recruitment and retention challenges, these shortages may require multiple entry pathways for digital forensic professionals.</p></section>

    </div>

    <hr className={styles.rule} />
    <section className={`${styles.panel} ${styles.sources} ${layout.enter}`}>
      <h2>Sources</h2>
      <ol start={69}>
        {sources.map((source, index) => (
          <li key={index}><span aria-hidden="true">{index + 69}</span><span>{source}</span></li>
        ))}
      </ol>
    </section>
  </PublicSafetyPageShell>;
}
