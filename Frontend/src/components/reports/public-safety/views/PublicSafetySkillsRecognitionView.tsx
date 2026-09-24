"use client";

import { Award, ClipboardList, FileText, Network, Search, Users } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const outcomes = ["Workforce Mobility", "Interoperability", "Career Transition", "Enhanced Productivity"];

const differences = [
  { label: "Policies and procedures", Icon: FileText },
  { label: "Legislation and regulatory requirements", Icon: ClipboardList },
  { label: "Roles and remits of Public Safety organisations", Icon: Users },
  { label: "Operating contexts", Icon: Search },
  { label: "Equipment, appliances and other technology use", Icon: Award },
  { label: "Ranks and structures", Icon: Network },
];

export default function PublicSafetySkillsRecognitionView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="cross_sector_skills_recognition"
      navigation={{
        back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        prev: { label: "Specialist Skill Alignment", href: `/reports/${slug}/cross_sector_specialist_skill_alignment` },
        next: { label: "Defence", href: `/reports/${slug}/defence` },
        prevPrefix: "Previous Section:",
        nextPrefix: "Next Section:",
      }}
    >
      <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
        <p className="text-xs font-semibold uppercase leading-6 text-[#598303]">Cross-Sector Analysis · 03</p>
        <h1 className="mt-3 text-[40px] font-bold leading-[52px] text-[#252D02]">Skills Recognition</h1>
        <p className="mt-3 max-w-[980px] text-xs leading-6 text-[#535862]">VET training products can be leveraged to potentially reduce duplication of training package development, training material development and support skill recognition in a new or different Public Safety industry-sector (impacting workforce mobility, interoperability, career transition and enhancing productivity).</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {outcomes.map((outcome) => <span key={outcome} className="rounded-full bg-[#E5F3C6] px-3 py-1.5 text-[10px] font-semibold text-[#598303]">{outcome}</span>)}
        </div>
        <div className="mt-5 max-w-[1030px] space-y-3 text-xs leading-6 text-[#535862]">
          <p>When shared skills, such as those identified in the comparison table above, are recognised and aligned, it may enable smoother integration of personnel in joint operations environments.</p>
          <p>Some areas in Public Safety industry-sectors further seek to use recognition of prior learning (RPL) to reduce lead-in times for personnel transitioning. Noting the similarity of operational context and skills, this may be further leveraged and give effect to important recommendations such as the Recommendation 85 of the Royal Commission into Defence and Veteran Suicide.</p>
        </div>
      </section>

      <section>
        <h2 className="border-b border-[#D9DDCE] pb-4 text-2xl font-bold leading-8 text-[#252D02]">Challenges in the delivery of RPL services</h2>
        <p className="mt-5 text-xs leading-6 text-[#535862]">The Productivity Commission identified the following challenges in the delivery of RPL services. This includes:</p>
        <div className="mt-5 grid gap-2 lg:grid-cols-2">
          <article className="relative min-h-[380px] rounded-lg border border-[#E9EAEB] border-t-4 border-t-[#8AC900] bg-white p-8 pl-20">
            <span className="absolute left-6 top-5 text-[52px] font-light leading-none text-[#EFF3E5]">1</span>
            <h3 className="text-xl font-bold leading-7 text-[#252D02]">Challenges with RPL fraud</h3>
            <p className="mt-5 text-xs leading-6 text-[#535862]">The prevalence of RPL fraud makes acceptance of RPL in the VET sector complicated, resulting in a loss of trust in the RPL process. In turn, this means that personnel often are required to complete training for a unit of competency that they already hold, resulting in productivity losses and more impact on an already strained training services in the Public Safety industry-sectors.</p>
            <p className="mt-4 text-xs leading-6 text-[#535862]">The Productivity Commission indicated that fewer than 5 per cent of successful completions/results are granted through RPL. Further, as the VET sector is highly regulated by quality assurance organisations such as the Training Accreditation Council (TAC - Western Australia), Victorian Registration and Qualifications Authority (VRQA - Victoria) and the Australian Skills Quality Authority (ASQA - for the remainder of the states and territories), Registered Training Organisations (RTOs), TAFEs and employers are reluctant to accept RPL outcomes due to the evidence required of competency being complex, such as the ASQA 2025 Standards for RTOs. There is lower incentive to use fraud for RPL, dissuading genuine training providers from using RPL and/or underreporting its use.</p>
          </article>
          <article className="relative min-h-[380px] rounded-lg border border-[#E9EAEB] border-t-4 border-t-[#8AC900] bg-white p-8 pl-20">
            <span className="absolute left-6 top-5 text-[52px] font-light leading-none text-[#EFF3E5]">2</span>
            <h3 className="text-xl font-bold leading-7 text-[#252D02]">RPL processes are costly and complex</h3>
            <p className="mt-5 text-xs leading-6 text-[#535862]">RPL applications require the same rigour of assessment as when assessing a student’s competency for the first time. Extensive portfolios of evidence are required, often resulting in students requesting to either repeat training or undertaking vigorous assessments to prove competencies. Further, RPL requires assessors familiar and experienced in RPL, which make RPL assessments costly (both timing and financial costs).</p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="border-b border-[#D9DDCE] pb-4 text-2xl font-bold leading-8 text-[#252D02]">Differences limiting the use of RPL between sectors</h2>
        <p className="mt-5 text-xs leading-6 text-[#535862]">Challenges with RPL are not exclusive to the Public Safety industry-sectors and are shared with other industries. Other factors that affect the limited use of RPL in the Public Safety industry-sector include:</p>
        <div className="mt-5 rounded-2xl bg-[#046D2A] p-6">
          <p className="text-[10px] font-semibold uppercase text-white">Differences</p>
          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
            {differences.map(({ label, Icon }) => (
              <div key={label} className="flex min-h-[150px] flex-col items-center justify-center rounded-lg bg-[#F0F3E5] px-4 py-5 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#769B1E]"><Icon className="h-5 w-5" strokeWidth={1.4} /></span>
                <span className="mt-3 text-[11px] font-medium leading-4 text-[#535862]">{label}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-[1180px] text-xs leading-6 text-white/90">An interesting complexity of the VET sector is the drive to integrate the areas above into training delivery to ensure students are job ready. In Public Safety industry-sectors, such contextualisation is crucial, noting the operating environment. However, it is exactly this contextualisation of training that makes RPL when employees want to work in other industries more difficult.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
        <h2 className="text-xl font-bold leading-7 text-[#252D02]">Sources</h2>
        <div className="mt-4 flex gap-3 text-[11px] leading-5 text-[#535862]">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8AC900] text-[9px] font-bold text-[#252D02]">1</span>
          <p>Productivity Commission, <span className="italic">Building a skilled and adaptable workforce</span>, Productivity Commission, Australian Government, 2025.</p>
        </div>
      </section>
    </PublicSafetyPageShell>
  );
}
