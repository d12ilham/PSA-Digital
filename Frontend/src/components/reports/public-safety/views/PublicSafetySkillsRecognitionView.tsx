"use client";

import { useEffect, useRef, useState } from "react";
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

function SkillsRecognitionGraphic() {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const nodes = [
    { x: 210, y: 43, icon: <g {...stroke}><path d="M-19 7h38l-6 11h-26zM-12 7V-7h23V7M-6-7v-9M0-7v-16M6-7v-10M-8 0h4M1 0h4M10 0h4"/><path d="M-17 21c5 3 10 3 15 0 5 3 10 3 15 0"/></g> },
    { x: 320, y: 96, icon: <g {...stroke}><path d="m-20 3 18-5 13-14 5 2L8 1l12 5-2 4-14-2-9 12-4-1L-5 5l-14 2zM-1-2l-6-8 3-2 10 7"/></g> },
    { x: 264, y: 190, icon: <g {...stroke}><path d="M-20-3h30l9 8v14h-39zM-14-12H9v9h-23zM-10-9h6M0-9h6M-15 3h8v8h-8M-2 3h8v8h-8"/><circle cx="-12" cy="20" r="3"/><circle cx="11" cy="20" r="3"/></g> },
    { x: 126, y: 190, icon: <g {...stroke}><path d="M-19-1h36v15h-36zM-13-7H4l8 6h5M-15 4h9M-2 0v9M3 4h9"/><path d="M-6-3v5M-8.5-.5h5"/><circle cx="-12" cy="15" r="3"/><circle cx="11" cy="15" r="3"/></g> },
    { x: 90, y: 96, icon: <g {...stroke}><path d="M-20 2h38l-4 11h-29zM-16-3h27l7 5h-38zM-10-3v-8H6l5 8M6-10l12-7M16-17h9"/><circle cx="-11" cy="15" r="3"/><circle cx="-1" cy="15" r="3"/><circle cx="9" cy="15" r="3"/></g> },
  ];
  return <svg viewBox="0 0 410 240" className="h-auto w-full max-w-[410px] overflow-visible text-[#598303]" role="img" aria-label="Public Safety sectors connected through skills recognition">
    <path d="M90 96 210 43 320 96 264 190 126 190Z" fill="none" stroke="#99AA75" strokeWidth="1.2" strokeDasharray="2.5 3.5" className="animate-group92-route"/>
    {nodes.map((node, index) => <g key={node.x} transform={`translate(${node.x} ${node.y})`} className="group/group92 animate-group92-node" style={{ animationDelay: `${index * 0.12 + 0.18}s` }}>
      <circle r="35" fill="#F0F5DF" className="transition-all duration-300 group-hover/group92:fill-[#E1ECC5]"/>
      <g className="transition-transform duration-300 group-hover/group92:scale-110" style={{ transformBox: "fill-box", transformOrigin: "center" }}>{node.icon}</g>
    </g>)}
  </svg>;
}

export default function PublicSafetySkillsRecognitionView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const challengesRef = useRef<HTMLElement>(null);
  const differencesRef = useRef<HTMLElement>(null);
  const sourcesRef = useRef<HTMLElement>(null);
  const [challengesVisible, setChallengesVisible] = useState(false);
  const [differencesVisible, setDifferencesVisible] = useState(false);
  const [sourcesVisible, setSourcesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === challengesRef.current) setChallengesVisible(true);
        if (entry.target === differencesRef.current) setDifferencesVisible(true);
        if (entry.target === sourcesRef.current) setSourcesVisible(true);
      });
    }, { threshold: 0.08 });

    [challengesRef, differencesRef, sourcesRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

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
      <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6 transition-shadow duration-500 hover:shadow-lg">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_430px]">
          <div><div className="animate-slide-up"><p className="text-xs font-semibold uppercase leading-6 text-[#598303]">Cross-Sector Analysis · 03</p>
          <h1 className="mt-3 text-[40px] font-bold leading-[52px] text-[#252D02]">Skills Recognition</h1></div>
          <p className="mt-3 max-w-[980px] animate-slide-up-delay text-xs leading-6 text-[#535862]">VET training products can be leveraged to potentially reduce duplication of training package development, training material development and support skill recognition in a new or different Public Safety industry-sector (impacting workforce mobility, interoperability, career transition and enhancing productivity).</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {outcomes.map((outcome, index) => <span key={outcome} style={{ animationDelay: `${index * 0.1 + 0.25}s` }} className="animate-card-entrance rounded-full bg-[#E5F3C6] px-3 py-1.5 text-[10px] font-semibold text-[#598303] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D4ED9F] hover:shadow-sm">{outcome}</span>)}
        </div>
        <div className="mt-5 max-w-[1030px] animate-slide-up-delay space-y-3 text-xs leading-6 text-[#535862]">
          <p>When shared skills, such as those identified in the comparison table above, are recognised and aligned, it may enable smoother integration of personnel in joint operations environments.</p>
          <p>Some areas in Public Safety industry-sectors further seek to use recognition of prior learning (RPL) to reduce lead-in times for personnel transitioning. Noting the similarity of operational context and skills, this may be further leveraged and give effect to important recommendations such as the Recommendation 85 of the Royal Commission into Defence and Veteran Suicide.</p>
        </div></div>
          <div className="animate-slide-up-delay mx-auto w-full"><SkillsRecognitionGraphic /></div>
        </div>
      </section>

      <section ref={challengesRef} className={challengesVisible ? "animate-slide-up" : "translate-y-6 opacity-0"}>
        <h2 className="border-b border-[#D9DDCE] pb-4 text-2xl font-bold leading-8 text-[#252D02]">Challenges in the delivery of RPL services</h2>
        <p className="mt-5 text-xs leading-6 text-[#535862]">The Productivity Commission identified the following challenges in the delivery of RPL services. This includes:</p>
        <div className="mt-5 grid gap-2 lg:grid-cols-2">
          <article className={`group relative min-h-[380px] rounded-lg border border-[#E9EAEB] border-t-4 border-t-[#8AC900] bg-white p-8 pl-20 transition-all duration-500 hover:-translate-y-1 hover:border-[#8AC900] hover:shadow-lg ${challengesVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
            <span className="absolute left-6 top-5 text-[52px] font-light leading-none text-[#EFF3E5]">1</span>
            <h3 className="text-xl font-bold leading-7 text-[#252D02]">Challenges with RPL fraud</h3>
            <p className="mt-5 text-xs leading-6 text-[#535862]">The prevalence of RPL fraud makes acceptance of RPL in the VET sector complicated, resulting in a loss of trust in the RPL process. In turn, this means that personnel often are required to complete training for a unit of competency that they already hold, resulting in productivity losses and more impact on an already strained training services in the Public Safety industry-sectors.</p>
            <p className="mt-4 text-xs leading-6 text-[#535862]">The Productivity Commission indicated that fewer than 5 per cent of successful completions/results are granted through RPL. Further, as the VET sector is highly regulated by quality assurance organisations such as the Training Accreditation Council (TAC - Western Australia), Victorian Registration and Qualifications Authority (VRQA - Victoria) and the Australian Skills Quality Authority (ASQA - for the remainder of the states and territories), Registered Training Organisations (RTOs), TAFEs and employers are reluctant to accept RPL outcomes due to the evidence required of competency being complex, such as the ASQA 2025 Standards for RTOs. There is lower incentive to use fraud for RPL, dissuading genuine training providers from using RPL and/or underreporting its use.</p>
          </article>
          <article style={challengesVisible ? { animationDelay: "0.14s" } : undefined} className={`group relative min-h-[380px] rounded-lg border border-[#E9EAEB] border-t-4 border-t-[#8AC900] bg-white p-8 pl-20 transition-all duration-500 hover:-translate-y-1 hover:border-[#8AC900] hover:shadow-lg ${challengesVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
            <span className="absolute left-6 top-5 text-[52px] font-light leading-none text-[#EFF3E5]">2</span>
            <h3 className="text-xl font-bold leading-7 text-[#252D02]">RPL processes are costly and complex</h3>
            <p className="mt-5 text-xs leading-6 text-[#535862]">RPL applications require the same rigour of assessment as when assessing a student’s competency for the first time. Extensive portfolios of evidence are required, often resulting in students requesting to either repeat training or undertaking vigorous assessments to prove competencies. Further, RPL requires assessors familiar and experienced in RPL, which make RPL assessments costly (both timing and financial costs).</p>
          </article>
        </div>
      </section>

      <section ref={differencesRef} className={differencesVisible ? "animate-slide-up" : "translate-y-6 opacity-0"}>
        <h2 className="border-b border-[#D9DDCE] pb-4 text-2xl font-bold leading-8 text-[#252D02]">Differences limiting the use of RPL between sectors</h2>
        <p className="mt-5 text-xs leading-6 text-[#535862]">Challenges with RPL are not exclusive to the Public Safety industry-sectors and are shared with other industries. Other factors that affect the limited use of RPL in the Public Safety industry-sector include:</p>
        <div className="mt-5 rounded-lg bg-[#598303] p-6 transition-shadow duration-500 hover:shadow-xl">
          <p className="text-[10px] font-semibold uppercase text-white">Differences</p>
          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
            {differences.map(({ label, Icon }, index) => (
              <div key={label} style={differencesVisible ? { animationDelay: `${index * 0.1 + 0.12}s` } : undefined} className={`group flex min-h-[150px] flex-col items-center justify-center rounded-lg bg-[#F0F5DF] px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg ${differencesVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
                <span style={{ animationDelay: `${index * 0.1 + 0.3}s` }} className="flex h-12 w-12 animate-cross-sector-icon items-center justify-center rounded-full bg-[#598303] text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#355700]"><Icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" strokeWidth={1.4} /></span>
                <span className="mt-3 text-[11px] font-medium leading-4 text-[#535862]">{label}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-[1180px] text-xs leading-6 text-white/90">An interesting complexity of the VET sector is the drive to integrate the areas above into training delivery to ensure students are job ready. In Public Safety industry-sectors, such contextualisation is crucial, noting the operating environment. However, it is exactly this contextualisation of training that makes RPL when employees want to work in other industries more difficult.</p>
        </div>
      </section>

      <section ref={sourcesRef} className={`rounded-2xl border border-[#E9EAEB] bg-white p-6 transition-all duration-500 hover:border-[#8AC900] hover:shadow-md ${sourcesVisible ? "animate-slide-up" : "translate-y-6 opacity-0"}`}>
        <h2 className="text-xl font-bold leading-7 text-[#252D02]">Sources</h2>
        <div className="group mt-4 flex animate-card-entrance gap-3 text-[11px] leading-5 text-[#535862]">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8AC900] text-[9px] font-bold text-[#252D02] transition-transform duration-300 group-hover:scale-110">1</span>
          <p>Productivity Commission, <span className="italic">Building a skilled and adaptable workforce</span>, Productivity Commission, Australian Government, 2025.</p>
        </div>
      </section>
    </PublicSafetyPageShell>
  );
}
