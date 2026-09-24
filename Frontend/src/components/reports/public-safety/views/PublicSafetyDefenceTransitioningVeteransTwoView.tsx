"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const sources = [
  "Jobs and Skills Australia (JSA), Connecting for Impact - The Jobs and Skills Report 2025, JSA, 2025, page 81, accessed 19 November 2025.",
  "Australian Computer Society (ACS), Digital Tasmania Strategy 2026-2031, ACS, 2024, page 7, accessed 6 January 2026.",
  "Australian Computer Society (ACS), Digital Tasmania Strategy 2026-2031, ACS, 2024, page 12, accessed 6 January 2026.",
  "Department of Defence, 2024 National Defence Strategy and 2024 Integrated Investment Program, Department of Defence, Australian Government, 2024, page 7, accessed 19 November 2025.",
  "Department of Defence, 2024 National Defence Strategy, Department of Defence, Australian Government, 2024, accessed 19 November 2025.",
  "Department of Defence, 2024 National Defence Strategy, Department of Defence, Australian Government, 2024, accessed 19 November 2025.",
  "Department of Defence, 2024 Integrated Investment Program, Department of Defence, Australian Government, 2024, accessed 19 November 2025.",
  "Department of Defence, Albanese Government to invest up to $7 billion in counter drone defence [media release], Department of Defence, Australian Government, 21 April 2026, accessed 28 April 2026.",
  "S Baker, 'The drone war is moving too fast for old-school defence tech development', CEO Wars, Business Insider, 18 November 2025, accessed 5 January 2026; O Molloy, Drones in Modern Warfare: Lessons Learnt from the War in Ukraine, Australian Army Occasional Paper No. 29, 2024.",
  "S Baker, 'The drone war is moving too fast for old-school defence tech development', CEO Wars, Business Insider, 18 November 2025, accessed 5 January 2026.",
  "Department of Defence, Growing sovereign industrial base with 300 drones delivered to Defence [media release], Department of Defence, Australian Government, 19 August 2025.",
  "Department of Defence, Drone Training Takes Off [media release], Australian Government, 14 April 2025, accessed 10 December 2025.",
  "Ministers' Media Centre, $20 million TAFE Centre of Excellence to boost national security and upskill workers for AUKUS [media release], 26 September 2025.",
];

export default function PublicSafetyDefenceTransitioningVeteransTwoView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [appendixOpen, setAppendixOpen] = useState(true);

  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="defence_transitioning_veterans_2"
      navigation={{
        back: { label: "Defence Workforce Insights", href: `/reports/${slug}/defence_workforce_insights` },
        backSecondary: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        prev: { label: "Workforce Insights", href: `/reports/${slug}/defence_workforce_insights` },
        next: { label: "2. Transitioning Veterans", href: `/reports/${slug}/defence_transitioning_veterans` },
        prevPrefix: "Previous Section:",
        nextPrefix: "Next Section:",
      }}
    >
      <section className="rounded-2xl border border-[#E9EAEB] bg-white px-6 py-6">
        <span className="inline-flex rounded-full bg-[#D7A31A] px-4 py-1.5 text-[10px] font-bold text-white">Theme 2. Transitioning Veterans · Insight Two</span>
        <h1 className="mt-5 text-[40px] font-bold leading-[48px] text-[#252D02]">Transitioning Veterans</h1>
        <p className="mt-3 text-xs text-[#535862]">Each section below can also be opened individually.</p>
      </section>

      <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
        <div className="grid min-h-[170px] overflow-hidden rounded-xl border border-[#E2E4DB] bg-[#FAFAF0]" style={{ gridTemplateColumns: "8px 58px 1fr" }}>
          <div className="bg-[#91AD45]" />
          <div className="pt-6 text-center text-[50px] font-light leading-none text-[#E7E8D9]">2</div>
          <div className="px-5 py-6">
            <p className="text-[10px] font-semibold uppercase text-[#6C8C20]">Industry Insight 2.2</p>
            <p className="mt-5 max-w-[940px] text-sm font-semibold leading-6 text-[#252D02]">Greater focus is required to support those transitioning (including veterans) to articulate the transferability of their VET qualifications and the relevance of their ADF experience to the civilian workforce. Where support is available, the information provided could be bolstered.</p>
            <p className="mt-5 text-xs leading-5 text-[#535862]">The complete supporting report content follows below. Use ← Back to Workforce Insights to return to the presentation anchor.</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="border-b border-[#DADDD4] pb-5 text-2xl font-bold text-[#252D02]">Articulating skills – state and territory support</h2>
          <div className="max-w-[970px] pt-6 text-[13px] leading-[21px] text-[#535862]">
            <p>While much of the focus for transitioning veterans was based on issuing VET qualifications post-service, a challenge raised by Defence stakeholders related to enabling veterans to articulate their skills through their VET qualifications to prospective employers. Current support for veterans to articulate their skills is available, however the programs and information differ based on states and territories.</p>
            <p className="mt-4">Defence stakeholders advised that the current support should be bolstered – Appendix A – Defence Veterans’ Programs and Initiatives – highlights some of the programs in each state and territory, and the information available to support veteran transition out of the ADF and into the civilian workforce.</p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-[#E0E2DA]">
          <button type="button" aria-expanded={appendixOpen} onClick={() => setAppendixOpen((open) => !open)} className="flex min-h-[64px] w-full items-center justify-between gap-5 px-6 text-left">
            <span className="text-xl font-semibold text-[#252D02]">Appendix A – Defence Veterans’ Programs and Initiatives</span>
            <span className="inline-flex h-10 shrink-0 items-center gap-3 rounded-full bg-[#7BC900] px-5 text-sm font-semibold text-[#253100]">{appendixOpen ? "Open" : "Closed"}<ChevronDown size={16} className={appendixOpen ? "rotate-180" : ""} /></span>
          </button>
          {appendixOpen && <div className="border-t border-[#E0E2DA] px-6 py-6 text-[13px] leading-[21px] text-[#535862]">
            <p>Some programs, such as TAFE NSW Ranks to Recognition Program, mirror the ADF programs offered to transitioning and transitioned veterans. Additionally, some states and territories (such as the Northern Territory) have adopted initiatives like the Rank to Grade Guide to better support veterans.<sup>36</sup> In the ACT, the ACTPS Veterans’ Employment Strategy has not been updated since 2020 but rather aligned to the broader programs at the federal level.</p>
            <p className="mt-5">Defence stakeholders emphasised that transitioning veterans should be provided with clear information to understand how the qualifications they obtained during service is relevant in the civilian workforce. This may be further supported through guidance on the programs on offer, options available and understanding how the varying roles and ranks across the ADF could translate to a civilian context. An additional benefit could be the identification of where such services could be streamlined.</p>
          </div>}
        </div>
      </section>

      <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
        <h2 className="text-2xl font-bold text-[#252D02]">Sources</h2>
        <ol className="mt-6 space-y-4">{sources.map((source, index) => <li key={`${index}-${source}`} className="grid grid-cols-[24px_1fr] gap-3 text-xs leading-5 text-[#535862]"><span className="grid size-5 place-items-center rounded-full bg-[#78A800] text-[10px] font-bold text-white">{index + 16}</span><span>{source}</span></li>)}</ol>
      </section>
    </PublicSafetyPageShell>
  );
}
