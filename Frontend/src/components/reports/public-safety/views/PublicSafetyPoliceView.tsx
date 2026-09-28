"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const sections = [
  {
    title: "Industry-Sector Overview",
    description: "Statistics and data of the industry-sector's workforce – the national sworn police officer FTE trend and each state, territory and federal jurisdiction, with the report's charts.",
    path: "police_industry_overview",
  },
  {
    title: "Industry Profile",
    description: "Chart library: First Nations proportion of police employees, female gender proportion, and national police employees by state and territory.",
    path: "police_industry_profile",
  },
  {
    title: "Workforce Insights",
    description: "Analysis and insights on current and emerging challenges across two themes: Digital Forensics and Rural, Regional and Remote Police Leadership.",
    path: "police_workforce_insights",
  },
  {
    title: "2026 Proposed Workforce Strategies",
    description: "The strategy proposed to mitigate identified challenges – objective, approach, deliverable, impact, timing and key stakeholders.",
    path: "police_workforce_strategies",
  },
  {
    title: "2025 Strategy Updates",
    description: "Updates on the three strategies proposed in the 2025 report as to their progress, stakeholders and connection to 2026 strategies.",
    path: "police_update_2025_strategies",
  },
  {
    title: "Existing Industry-Sector Strategies",
    description: "Twelve existing strategies used by the Australian Federal Police and state and territory police, and how each informs Public Skills Australia's work.",
    path: "police_existing_strategies",
  },
];

export default function PublicSafetyPoliceView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();

  return <PublicSafetyPageShell
    slug={slug}
    report={report}
    currentPage="police"
    navigation={{
      back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
      prev: { label: "Disaster Recovery Training Products (Appendix B)", href: `/reports/${slug}/fes_disaster_recovery_training_products` },
      next: { label: "Industry-Sector Overview", href: `/reports/${slug}/police_industry_overview` },
      prevPrefix: "Previous Section:",
      nextPrefix: "Next Section:",
    }}
  >
    <section className="relative min-h-[205px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-7 lg:px-8 lg:pr-[260px]">
      <span className="inline-flex rounded-full bg-[#1685A6] px-4 py-1.5 text-[10px] font-bold uppercase text-white">POL · Industry-Sector Analysis</span>
      <h1 className="mt-5 text-[40px] font-bold leading-[48px] text-[#252D02]">Police Chapter</h1>
      <p className="mt-4 max-w-[980px] text-sm leading-6 text-[#535862]">This chapter of the 2026 Public Safety Workforce Insights Report covers the Police industry-sector – the eight state and territory police forces and the Australian Federal Police. Open any section below, or move through the chapter in report order.</p>

      <div aria-hidden="true" className="absolute right-8 top-6 hidden size-40 place-items-center rounded-full bg-[#E5F2F7] lg:grid">
        <Image src="/images/police-chapter-vehicle.svg" alt="" width={136} height={136} className="size-[136px]"/>
      </div>
    </section>

    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {sections.map((section) => <article key={section.title} className="flex min-h-[245px] flex-col rounded-lg border border-[#E9EAEB] border-t-[6px] border-t-[#1685A6] bg-white p-6">
        <h2 className="text-xl font-bold leading-7 text-[#252D02]">{section.title}</h2>
        <p className="mt-4 text-sm leading-6 text-[#535862]">{section.description}</p>
        <button type="button" onClick={() => router.push(`/reports/${slug}/${section.path}`)} className="mt-auto flex w-fit cursor-pointer items-center gap-2 rounded-full bg-[#8AC900] px-5 py-2.5 text-xs font-bold text-gray800">Open <ArrowRight className="h-3.5 w-3.5" /></button>
      </article>)}
    </section>
  </PublicSafetyPageShell>;
}
