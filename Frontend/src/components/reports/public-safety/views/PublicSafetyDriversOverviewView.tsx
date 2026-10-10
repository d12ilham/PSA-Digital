"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const drivers = [
  { label: "DRIVER 1", title: "Resilience of organisations to respond to strategic shocks", path: "driver_1" },
  { label: "DRIVER 2", title: "Challenges to workforce productivity", path: "driver_2" },
  { label: "DRIVER 3", title: "Emergence of AI, greater automation and broader digital transformation", path: "driver_3" },
  { label: "DRIVER 4", title: "Workforce inclusivity", path: "driver_4" },
];

const megatrends = [
  ["Limitations", "Limitations in career pathways"],
  ["Climate", "Climate change"],
  ["Competition", "Competition for labor"],
  ["Expansion", "Expansion of core duties"],
  ["Diversity", "Diversity and inclusion"],
  ["Demographic", "Demographic shifts"],
  ["Technological", "Technological development"],
  ["Recruitment", "Recruitment and retention"],
  ["Public", "Public trust and perceptions"],
];

const sources = [
  ["3", "Australian Government Department of Home Affairs, Organisational Resilience: Good Practice Guide, Australian Government Department of Home Affairs, 2024, accessed 25 February 2026."],
  ["4", "Productivity Commission, Five pillars of productivity inquiries – final reports, Productivity Commission, 2025, accessed 13 February 2026."],
  ["5", "Productivity Commission, Five pillars of productivity inquiries, Productivity Commission, 2025, accessed 25 February 2026."],
  ["6", "Australian Government Department of Finance, National framework for the assurance of artificial intelligence in government, Australian Government Department of Finance, 2024, accessed 25 February 2026; Australian Government Digital Transformation Agency, Policy for the responsible use of AI in government, Australian Government Digital Transformation Agency, 2025, accessed 25 February 2026."],
  ["7", "Australian Security Intelligence Organisation (ASIO), Director-General’s Annual Threat Assessment 2025, ASIO, 2025, accessed 25 February 2026."],
];

export default function PublicSafetyDriversOverviewView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="drivers_of_change"
      navigation={{
        back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        prev: { label: "Methodology", href: `/reports/${slug}/methodology` },
        next: { label: "Cross-Sector Analysis", href: `/reports/${slug}/cross_sector_analysis` },
        prevPrefix: "Previous Section:",
      }}
    >
      <section className="relative overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:h-[318px]">
        <div className="w-full max-w-[800px]">
            <p className="text-xs font-semibold uppercase leading-6 text-[#598303]">Public Safety WIR 2026 · Common to all WIRs</p>
            <h1 className="mt-4 text-[40px] font-bold leading-[54px] text-[#252D02]">Drivers of Change</h1>
            <p className="mt-4 text-xs leading-6 text-[#535862]">In 2024, Public Skills Australia identified nine megatrends impacting the Public Safety and Government industry-sectors. These megatrends were further considered in the development of the 2025 Workforce Insights Reports.</p>
            <p className="mt-4 text-xs leading-6 text-[#535862]">While these megatrends will continue to have longer term implications for workforce planning and development across the Public Safety and Government industry-sectors, the 2026 Workforce Insights Reports have built on these and analysed four key drivers of change that cut across most megatrends. This is important as these drivers of change will likely impact the Public Safety and Government industry-sectors in the short to medium term.</p>
        </div>
        <Image src="/images/reports/drivers-of-change-diagram.png" alt="Four connected drivers of change" width={250} height={240} className="absolute right-20 top-[39px] hidden h-[240px] w-[250px] min-[1200px]:block" />
      </section>

      <section className="lg:h-[350px]">
        <div className="h-[76px] border-b border-[#E9EAEB]">
          <h2 className="text-2xl font-bold leading-8 text-[#252D02]">The four key drivers of change</h2>
          <p className="mt-3 text-sm leading-6 text-[#535862]">Select a driver to open its detail</p>
        </div>
        <div className="mt-6 grid gap-2 md:grid-cols-2 lg:h-[250px] lg:grid-cols-4">
          {drivers.map((driver) => (
            <article key={driver.label} className="flex min-h-[250px] flex-col rounded-lg border border-[#E9EAEB] border-t-4 border-t-[#8AC900] bg-white p-6 pt-7">
              <p className="text-xs font-bold leading-6 text-[#598303]">{driver.label}</p>
              <div className="mt-5">
                <h3 className="text-xl font-bold leading-7 text-[#252D02]">{driver.title}</h3>
              </div>
              <button type="button" onClick={() => router.push(`/reports/${slug}/${driver.path}`)} className="mt-auto inline-flex h-10 w-fit items-center gap-2 rounded-full bg-[#8AC900] px-5 text-xs font-bold text-[#252D02]">Open <ChevronDown className="h-3.5 w-3.5" /></button>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:h-[200px] lg:grid-cols-9">
          {megatrends.map(([icon, title]) => (
            <article key={title} className="flex min-h-[200px] flex-col items-center rounded-lg border border-[#E9EAEB] bg-white px-5 py-5 text-center">
              <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#F0F3E5]">
                <Image src={`/images/reports/drivers-of-change/${icon}.svg`} alt="" width={48} height={48} className="h-12 w-12" />
              </div>
              <h3 className="mt-3 text-xs font-medium leading-6 text-[#252D02]">{title}</h3>
            </article>
          ))}
      </section>

      <section className="h-[456px] rounded-2xl border border-[#E9EAEB] bg-white p-6">
          <h2 className="text-2xl font-bold leading-8 text-[#252D02]">Sources</h2>
          <ol className="mt-6 w-full max-w-[800px] space-y-4">
            {sources.map(([number, source]) => (
              <li key={number} className="grid grid-cols-[20px_1fr] gap-3 text-xs leading-6 text-[#535862]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F0F3E5] text-xs font-bold text-[#598303]">{number}</span>
                <span>{source}</span>
              </li>
            ))}
          </ol>
      </section>
    </PublicSafetyPageShell>
  );
}
