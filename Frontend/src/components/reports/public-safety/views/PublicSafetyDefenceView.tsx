"use client";

import { ArrowRight, CarFront, Plane, Ship } from "lucide-react";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const sections = [
  { title: "Industry-Sector Overview", description: "Statistics and data of the Defence workforce - current workforce, future workforce and veterans, with the report’s charts.", path: "defence_industry_overview" },
  { title: "Industry Profile", description: "Chart library: headcount and separation by service branch, gender and First Nations participation, ADF by location and operations.", path: "defence_industry_profile" },
  { title: "Workforce Insights", description: "Four industry insights across two themes: Emerging Technology and Transitioning Veterans.", path: "defence_workforce_insights" },
  { title: "2026 Proposed Workforce Strategies", description: "The two strategies proposed to mitigate identified challenges - objective, approach, deliverable, impact, timing and key stakeholders.", path: "defence_workforce_strategies" },
  { title: "2025 Strategy Updates", description: "Updates on the five strategies proposed in the 2025 report as to their progress, stakeholders and connection to 2026 strategies.", path: "defence_update_2025_strategies" },
  { title: "Existing Industry-Sector Strategies", description: "Existing strategies used by Government and the industry-sector, and how each informs Public Skills Australia’s work.", path: "defence_existing_strategies" },
  { title: "Defence Veterans’ Programs and Initiatives", description: "Appendix A - programs and initiatives in each state and territory that support transitioning and transitioned veterans.", path: "defence_federal_initiatives" },
];

export default function PublicSafetyDefenceView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();

  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="defence"
      navigation={{
        back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        prev: { label: "Skills Recognition", href: `/reports/${slug}/cross_sector_skills_recognition` },
        next: { label: "Industry-Sector Overview", href: `/reports/${slug}/defence_industry_overview` },
        prevPrefix: "Previous Section:",
        nextPrefix: "Next Section:",
      }}
    >
      <section className="relative min-h-[230px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:pr-[500px]">
        <span className="inline-flex rounded-full bg-[#D7A31A] px-4 py-1.5 text-[10px] font-bold uppercase text-white">DEF · Industry-Sector Analysis</span>
        <h1 className="mt-5 text-[40px] font-bold leading-[52px] text-[#252D02]">Defence</h1>
        <p className="mt-3 max-w-[850px] text-sm leading-6 text-[#535862]">This chapter of the 2026 Public Safety Workforce Insights Report covers the Defence industry-sector - the permanent and reserve Australian Defence Force and the civilian Australian Public Service workforce of the Department of Defence. Open any section below, or move through the chapter in report order.</p>

        <div aria-hidden="true" className="absolute right-8 top-14 hidden h-[130px] w-[420px] items-center justify-between lg:flex">
          <span className="absolute left-4 right-4 top-1/2 border-t border-dashed border-[#D7A31A]/60" />
          {[CarFront, Ship, Plane].map((Icon, index) => (
            <span key={index} className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-[#FFF8E8] text-[#D7A31A]"><Icon className="h-12 w-12" strokeWidth={1.35} /></span>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sections.map((section) => (
          <article key={section.title} className="relative flex min-h-[260px] flex-col rounded-lg border border-[#E9EAEB] border-t-[6px] border-t-[#6D7067] bg-white p-6">
            <h2 className="text-xl font-bold leading-7 text-[#252D02]">{section.title}</h2>
            <p className="mt-4 text-sm leading-6 text-[#535862]">{section.description}</p>
            <button type="button" onClick={() => router.push(`/reports/${slug}/${section.path}`)} className="mt-auto inline-flex h-10 w-fit items-center gap-3 rounded-full bg-[#8AC900] px-5 text-xs font-bold text-[#252D02]">Open <ArrowRight className="h-3.5 w-3.5" /></button>
          </article>
        ))}
      </section>
    </PublicSafetyPageShell>
  );
}
