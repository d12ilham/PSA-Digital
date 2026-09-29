"use client";

import { useEffect, useRef, useState } from "react";
import { ChartNoAxesCombined, MessageSquare, Radio, Search, ShieldCheck, Wrench } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const occupations = [
  { title: "Defence Force Member - Other Ranks", code: "OSCA 451131", color: "#D7A31A" },
  { title: "Emergency Services Officer", code: "OSCA 451231", color: "#C94F27" },
  { title: "Firefighter", code: "OSCA 451232", color: "#C94F27" },
  { title: "General Duties Police Officer", code: "OSCA 451151", color: "#1383A5" },
];

const commonSkills = [
  { label: "Operating and maintaining equipment", Icon: Wrench },
  { label: "Communication", Icon: MessageSquare },
  { label: "Community engagement", Icon: ShieldCheck },
  { label: "Collecting and analysing information", Icon: Search },
  { label: "Responding to emergencies", Icon: Radio },
  { label: "Guarding or patrolling", Icon: ChartNoAxesCombined },
];

const jsaSkills = ["Digital engagement", "Verbal and social interaction", "Learning", "Oral communication", "Planning and organising", "Problem solving", "Reading", "Teamwork", "Writing"];

function SkillsRadar() {
  const labels = ["Digital engagement", "Initiative and innovation", "Learning", "Numeracy", "Oral communication", "Planning and organising", "Problem solving", "Reading", "Teamwork", "Writing"];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[430px] overflow-hidden rounded-xl bg-[#252D02] text-white">
      <svg viewBox="0 0 430 430" className="h-full w-full" role="img" aria-label="Shared core skills radar chart">
        <g transform="translate(215 215)" fill="none" stroke="#80B900" strokeWidth="1" opacity=".65" className="animate-radar-grid">
          {[45, 85, 125, 165].map((r) => <circle key={r} r={r} />)}
          {labels.map((_, index) => { const a = (index * 36 - 90) * Math.PI / 180; return <line key={index} x2={Math.cos(a) * 165} y2={Math.sin(a) * 165} />; })}
          <polygon points="0,-138 68,-94 135,-44 105,77 45,126 -45,143 -111,81 -139,-45 -60,-83" fill="#8AC900" fillOpacity=".14" stroke="#8AC900" strokeWidth="2" className="animate-radar-shape" />
          {labels.map((_, index) => { const a = (index * 36 - 90) * Math.PI / 180; const radii = [138,116,142,130,105,143,138,148,104,125]; return <circle key={index} cx={Math.cos(a) * radii[index]} cy={Math.sin(a) * radii[index]} r="4" fill="#8AC900" stroke="none" className="animate-radar-point" style={{ animationDelay: `${index * 0.08 + 1.1}s` }} />; })}
        </g>
      </svg>
      <div className="absolute inset-0">
        {labels.map((label, index) => {
          const a = (index * 36 - 90) * Math.PI / 180;
          const x = 50 + Math.cos(a) * 43;
          const y = 50 + Math.sin(a) * 43;
          return <span key={label} className="absolute w-[92px] -translate-x-1/2 -translate-y-1/2 text-center text-[9px] leading-3" style={{ left: `${x}%`, top: `${y}%` }}>{label}</span>;
        })}
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 animate-radar-centre items-center justify-center rounded-full bg-[#8AC900] text-center text-[9px] font-bold leading-3 text-[#252D02]">CORE<br />SKILLS</span>
      </div>
    </div>
  );
}

export default function PublicSafetyCoreSkillAlignmentView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const occupationsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const radarRef = useRef<HTMLElement>(null);
  const conclusionRef = useRef<HTMLElement>(null);
  const sourcesRef = useRef<HTMLElement>(null);
  const [occupationsVisible, setOccupationsVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [radarVisible, setRadarVisible] = useState(false);
  const [conclusionVisible, setConclusionVisible] = useState(false);
  const [sourcesVisible, setSourcesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === occupationsRef.current) setOccupationsVisible(true);
        if (entry.target === skillsRef.current) setSkillsVisible(true);
        if (entry.target === radarRef.current) setRadarVisible(true);
        if (entry.target === conclusionRef.current) setConclusionVisible(true);
        if (entry.target === sourcesRef.current) setSourcesVisible(true);
      });
    }, { threshold: 0.1 });

    [occupationsRef, skillsRef, radarRef, conclusionRef, sourcesRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="cross_sector_core_skill_alignment"
      navigation={{
        back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        prev: { label: "Cross-Sector Analysis", href: `/reports/${slug}/cross_sector_analysis` },
        next: { label: "Specialist Skill Alignment", href: `/reports/${slug}/cross_sector_specialist_skill_alignment` },
        prevPrefix: "Previous Section:",
        nextPrefix: "Next Section:",
      }}
    >
      <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6 transition-shadow duration-500 hover:shadow-lg">
        <div className="animate-slide-up"><p className="text-xs font-semibold uppercase leading-6 text-[#598303]">Cross-Sector Analysis · 01</p>
        <h1 className="mt-3 text-[40px] font-bold leading-[52px] text-[#252D02]">Core Skill Alignment</h1></div>
        <p className="mt-3 max-w-[860px] animate-slide-up-delay text-xs leading-6 text-[#535862]">The Occupation Standard Classification for Australia (OSCA), recently released by the ABS, collectively categorises the following four Public Safety occupations in the Protective Service Workers Minor Group (group 45).</p>
      </section>

      <section ref={occupationsRef} className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
        {occupations.map((occupation, index) => (
          <article key={occupation.code} style={occupationsVisible ? { animationDelay: `${index * 0.12 + 0.1}s` } : undefined} className={`group relative flex min-h-[132px] flex-col rounded-lg border border-[#E9EAEB] bg-white px-6 pb-5 pt-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${occupationsVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
            <span className="absolute inset-x-0 top-0 h-1 rounded-t-lg" style={{ backgroundColor: occupation.color }} />
            <h2 className="text-base font-bold leading-6 text-[#252D02]">{occupation.title}</h2>
            <p className="mt-auto pt-4 text-[10px] font-semibold text-[#598303]">{occupation.code}</p>
          </article>
        ))}
      </section>

      <section ref={skillsRef} className={`rounded-2xl border border-[#E9EAEB] bg-white p-6 transition-all duration-500 hover:border-[#8AC900] hover:shadow-lg ${skillsVisible ? "animate-slide-up" : "translate-y-6 opacity-0"}`}>
        <h2 className="border-b border-[#E9EAEB] pb-4 text-2xl font-bold leading-8 text-[#252D02]">Common skills identified across these tasks</h2>
        <p className="mt-5 max-w-[1040px] text-xs leading-6 text-[#535862]">Tasks in this group, whether undertaken by volunteers or career employees, are characterised by the use of specialist equipment, intense physical effort and operating in high-stress emergency environments. Common skills identified across these tasks include:</p>
        <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          {commonSkills.map(({ label, Icon }, index) => (
            <div key={label} style={skillsVisible ? { animationDelay: `${index * 0.08 + 0.12}s` } : undefined} className={`group flex min-h-[130px] flex-col items-center justify-center rounded-lg bg-[#F0F3E5] px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-[#E4EDCA] hover:shadow-md ${skillsVisible ? "animate-card-entrance" : "translate-y-5 opacity-0"}`}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#769B1E] transition-transform duration-300 group-hover:scale-110"><Icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" strokeWidth={1.4} /></span>
              <span className="mt-3 text-[11px] font-medium leading-4 text-[#535862]">{label}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[10px] leading-5 text-[#535862]">The Public Safety industry-sector occupations further share core skills as illustrated below.</p>
      </section>

      <section ref={radarRef} className={`rounded-2xl border border-[#598303] bg-[#F0F3E5] p-6 transition-all duration-500 hover:shadow-lg ${radarVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
        <h2 className="text-sm font-bold uppercase leading-6 text-[#252D02]">Shared Core Skills · Australian Skills Classification (JSA)</h2>
        <div className="mt-5 grid items-center gap-10 lg:grid-cols-[430px_1fr]">
          {radarVisible && <SkillsRadar />}
          <div>
            <div className="flex flex-wrap gap-2">
              {jsaSkills.map((skill, index) => <span key={skill} style={{ animationDelay: `${index * 0.06 + 0.2}s` }} className="animate-card-entrance rounded-full bg-[#CDE99B] px-3 py-1.5 text-[11px] font-semibold text-[#3F6000] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#BDE17C] hover:shadow-sm">{skill}</span>)}
            </div>
            <p className="mt-5 text-[10px] uppercase leading-5 text-[#535862]">Source: JSA, Australian Skills Classification, 2023 · ABS, OSCA, December 2024</p>
            <div className="mt-8 flex flex-wrap gap-2 text-[10px] font-bold uppercase text-white">
              <span className="rounded-full bg-[#D7A31A] px-4 py-2">Defence Force Member</span>
              <span className="rounded-full bg-[#C94F27] px-4 py-2">Emergency Service Worker · Fire Fighter</span>
              <span className="rounded-full bg-[#1383A5] px-4 py-2">Police Officer</span>
            </div>
          </div>
        </div>
      </section>

      <aside ref={conclusionRef} className={`rounded-lg border border-[#E9EAEB] border-l-4 border-l-[#598303] bg-white px-8 py-6 text-xs leading-6 text-[#535862] transition-all duration-500 hover:-translate-y-1 hover:border-[#598303] hover:shadow-md ${conclusionVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>These four occupations encompass a range of core skills that may likely enable industry-sector cross-skilling, greater interoperability and could enhance national capability to prepare for, respond to and recover from natural disasters, emergency incidents and geopolitical uncertainty.</aside>

      <section ref={sourcesRef} className={`rounded-2xl border border-[#E9EAEB] bg-white p-6 transition-all duration-500 hover:border-[#8AC900] hover:shadow-md ${sourcesVisible ? "animate-slide-up" : "translate-y-6 opacity-0"}`}>
        <h2 className="text-xl font-bold leading-7 text-[#252D02]">Sources</h2>
        <ol className="mt-4 space-y-3 text-[11px] leading-5 text-[#535862]">
          <li className="group flex animate-card-entrance gap-3"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8AC900] text-[9px] font-bold text-[#252D02] transition-transform duration-300 group-hover:scale-110">1</span><span>Australian Bureau of Statistics (ABS), OSCA - Occupation Standard Classification of Australia, ABS website, December 2024, accessed 19 January 2026.</span></li>
          <li style={{ animationDelay: "0.1s" }} className="group flex animate-card-entrance gap-3"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8AC900] text-[9px] font-bold text-[#252D02] transition-transform duration-300 group-hover:scale-110">2</span><span>Australian Bureau of Statistics (ABS), OSCA - Occupation Standard Classification of Australia, ABS website, December 2024, accessed 19 January 2026.</span></li>
          <li style={{ animationDelay: "0.2s" }} className="group flex animate-card-entrance gap-3"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8AC900] text-[9px] font-bold text-[#252D02] transition-transform duration-300 group-hover:scale-110">3</span><span>Jobs and Skills Australia (JSA), Australian Skills Classification, 2023.</span></li>
        </ol>
      </section>
    </PublicSafetyPageShell>
  );
}
