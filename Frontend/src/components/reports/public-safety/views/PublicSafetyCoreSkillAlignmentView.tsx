"use client";

import { useEffect, useRef, useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const occupations = [
  { title: "Defence Force Member - Other Ranks", code: "OSCA 451131", color: "#D7A31A" },
  { title: "Emergency Services Officer", code: "OSCA 451231", color: "#C94F27" },
  { title: "Firefighter", code: "OSCA 451232", color: "#C94F27" },
  { title: "General Duties Police Officer", code: "OSCA 451151", color: "#1383A5" },
];

const commonSkills = [
  { label: "Operating and maintaining equipment", icon: "equipment" },
  { label: "Communication", icon: "communication" },
  { label: "Community engagement", icon: "community" },
  { label: "Collecting and analysing information", icon: "analysis" },
  { label: "Responding to emergencies", icon: "emergency" },
  { label: "Guarding or patrolling", icon: "patrol" },
];

const jsaSkills = ["Digital engagement", "Initiative and innovation", "Learning", "Numeracy", "Oral communication", "Planning and organising", "Problem solving", "Reading", "Teamwork", "Writing"];

function Group92Graphic() {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const nodes = [
    { x: 42, y: 53, icon: <g {...stroke}><path d="M22 55h38l-4 11H27zM26 50h27l7 5H22zM32 50v-8h16l5 8M48 43l12-7M58 36h9"/><circle cx="31" cy="68" r="3"/><circle cx="41" cy="68" r="3"/><circle cx="51" cy="68" r="3"/></g> },
    { x: 145, y: 74, icon: <g {...stroke}><path d="M126 76h36v15h-36zM132 70h17l8 6h5M130 81h9M143 77v9M148 81h9"/><path d="M139 74v5M136.5 76.5h5"/><circle cx="133" cy="92" r="3"/><circle cx="156" cy="92" r="3"/></g> },
    { x: 257, y: 42, icon: <g {...stroke}><path d="M237 49h42l-7 12h-28zM245 49V35h22v14M251 35V25M257 35V18M263 35V28M249 42h4M258 42h4M267 42h4"/><path d="M239 64c5 3 10 3 15 0 5 3 10 3 15 0"/></g> },
    { x: 365, y: 70, icon: <g {...stroke}><path d="M344 69h30l9 8v14h-39zM350 60h23v9h-23zM354 63h6M364 63h6M349 75h8v8h-8M362 75h8v8h-8"/><circle cx="352" cy="92" r="3"/><circle cx="375" cy="92" r="3"/></g> },
    { x: 480, y: 31, icon: <g {...stroke}><path d="m459 34 18-5 13-14 5 2-8 15 12 5-2 4-14-2-9 12-4-1 4-14-14 2zM478 29l-6-8 3-2 10 7"/></g> },
  ];
  return <svg viewBox="0 0 524 124" className="h-auto w-full max-w-[524px] overflow-visible text-[#598303]" role="img" aria-label="Public safety defence, emergency services, fire and police vehicles">
    <path d="M42 53 C82 53 102 79 145 74 S211 43 257 42 S324 70 365 70 S437 39 480 31" className="animate-group92-route" fill="none" stroke="#99AA75" strokeWidth="1.2" strokeDasharray="2.5 3.5"/>
    {nodes.map((node, index) => <g key={node.x} className="group/group92 animate-group92-node cursor-default" style={{ animationDelay: `${index * 0.12 + 0.18}s` }}>
      <circle cx={node.x} cy={node.y} r="31" fill="#F0F5DF" className="transition-all duration-300 group-hover/group92:fill-[#E1ECC5]"/>
      <g className="transition-transform duration-300 group-hover/group92:scale-110" style={{ transformBox: "fill-box", transformOrigin: "center" }}>{node.icon}</g>
    </g>)}
  </svg>;
}

function SkillIcon({ type }: { type: string }) {
  const shared = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
    {type === "equipment" && <g {...shared}><circle cx="11" cy="12" r="4"/><path d="M11 5v2M11 17v2M4 12h2M16 12h2M6 7l1.5 1.5M14.5 15.5 16 17M6 17l1.5-1.5M14.5 8.5 16 7"/><circle cx="22" cy="20" r="5"/><path d="M22 12v3M22 25v3M14 20h3M27 20h3M16.5 14.5l2 2M25.5 23.5l2 2M16.5 25.5l2-2M25.5 16.5l2-2"/></g>}
    {type === "communication" && <g {...shared}><path d="M4 7h17v11H11l-5 4v-4H4z"/><path d="M12 21h9l5 4v-4h2V11h-4"/><path d="M8 11h9M8 14h6"/></g>}
    {type === "community" && <g {...shared}><circle cx="16" cy="9" r="3"/><circle cx="8" cy="12" r="2.5"/><circle cx="24" cy="12" r="2.5"/><path d="M10 25v-4c0-3.2 2.6-5.5 6-5.5s6 2.3 6 5.5v4M3.5 24v-3c0-2.4 1.8-4.2 4.5-4.2M28.5 24v-3c0-2.4-1.8-4.2-4.5-4.2"/></g>}
    {type === "analysis" && <g {...shared}><circle cx="13" cy="13" r="7"/><path d="m18 18 7 7M9 15v-3M13 15V9M17 15v-5"/></g>}
    {type === "emergency" && <g {...shared}><path d="M9 21h14l-2-9c-.6-2.8-2.3-4-5-4s-4.4 1.2-5 4zM7 25h18M16 4V1M6 8 3 5M26 8l3-3M5 16H1M31 16h-4"/><path d="M13 17h6"/></g>}
    {type === "patrol" && <g {...shared}><path d="M8 4h16v5c0 3.8-3 6.3-6 7 3 .8 6 3.2 6 7v5H8v-5c0-3.8 3-6.2 6-7-3-.7-6-3.2-6-7z"/><path d="M11 7h10M11 25h10M12 10c1 1.8 2.4 2.8 4 3.3 1.6-.5 3-1.5 4-3.3"/></g>}
  </svg>;
}

function SkillsRadar() {
  const labels = [
    { lines: ["Digital engagement"], x: 215, y: 53, anchor: "middle" },
    { lines: ["Initiative and", "innovation"], x: 304, y: 83, anchor: "middle" },
    { lines: ["Learning"], x: 365, y: 172, anchor: "start" },
    { lines: ["Numeracy"], x: 365, y: 266, anchor: "start" },
    { lines: ["Oral communication"], x: 304, y: 354, anchor: "middle" },
    { lines: ["Planning and organising"], x: 215, y: 392, anchor: "middle" },
    { lines: ["Problem solving"], x: 126, y: 354, anchor: "middle" },
    { lines: ["Reading"], x: 65, y: 266, anchor: "end" },
    { lines: ["Teamwork"], x: 65, y: 172, anchor: "end" },
    { lines: ["Writing"], x: 126, y: 83, anchor: "middle" },
  ] as const;
  return (
    <div className="group/radar relative mx-auto aspect-square w-full max-w-[430px] overflow-hidden rounded-xl bg-[#4F8300] text-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
      <svg viewBox="0 0 430 430" className="h-full w-full transition-transform duration-700 group-hover/radar:scale-[1.025]" role="img" aria-label="Shared core skills radar chart">
        <g transform="translate(215 215)" fill="none" stroke="#79A928" strokeWidth="1.5" opacity=".95" className="animate-radar-grid">
          {labels.map((_, index) => { const a = (index * 36 - 90) * Math.PI / 180; return <line key={index} x2={Math.cos(a) * 135} y2={Math.sin(a) * 135} pathLength="1" strokeDasharray="1" strokeDashoffset="0"><animate attributeName="stroke-dashoffset" from="1" to="0" dur="0.75s" begin={`${index * 0.06}s`} fill="freeze" /></line>; })}
          {labels.map((_, index) => { const a = (index * 36 - 90) * Math.PI / 180; return <circle key={index} cx={Math.cos(a) * 135} cy={Math.sin(a) * 135} r="5.5" fill="#8AC900" stroke="none" className="animate-radar-point" style={{ animationDelay: `${index * 0.07 + 0.55}s` }} />; })}
        </g>
        <g className="animate-radar-point" style={{ animationDelay: "0.35s" }}>
          <circle cx="215" cy="215" r="28" fill="#8AC900" />
          <text x="215" y="211" textAnchor="middle" fontSize="8" fontWeight="700" fill="#355800">SHARED</text>
          <text x="215" y="222" textAnchor="middle" fontSize="8" fontWeight="700" fill="#355800">CORE SKILLS</text>
        </g>
        {labels.map((label, index) => <text key={label.lines.join("-")} x={label.x} y={label.y} textAnchor={label.anchor} fill="white" fontSize="9" fontWeight="600" className="animate-radar-label transition-all duration-300 hover:fill-[#DDF8A4]" style={{ animationDelay: `${index * 0.06 + 0.75}s`, transformBox: "fill-box", transformOrigin: "center" }}>
          {label.lines.map((line, lineIndex) => <tspan key={line} x={label.x} dy={lineIndex === 0 ? 0 : 11}>{line}</tspan>)}
        </text>)}
      </svg>
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
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_524px]">
          <div><div className="animate-slide-up"><p className="text-xs font-semibold uppercase leading-6 text-[#598303]">Cross-Sector Analysis · 01</p>
          <h1 className="mt-3 text-[40px] font-bold leading-[52px] text-[#252D02]">Core Skill Alignment</h1></div>
          <p className="mt-3 max-w-[860px] animate-slide-up-delay text-xs leading-6 text-[#535862]">The Occupation Standard Classification for Australia (OSCA), recently released by the ABS, collectively categorises the following four Public Safety occupations in the Protective Service Workers Minor Group (group 45).</p></div>
          <div className="animate-slide-up-delay mx-auto w-full"><Group92Graphic /></div>
        </div>
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
          {commonSkills.map(({ label, icon }, index) => (
            <div key={label} style={skillsVisible ? { animationDelay: `${index * 0.08 + 0.12}s` } : undefined} className={`group flex min-h-[130px] flex-col items-center justify-center rounded-lg bg-[#F0F3E5] px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-[#E4EDCA] hover:shadow-md ${skillsVisible ? "animate-card-entrance" : "translate-y-5 opacity-0"}`}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#769B1E] shadow-[0_2px_10px_rgba(89,131,3,0.08)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:text-[#4F8300] group-hover:shadow-md"><SkillIcon type={icon} /></span>
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
              <span className="rounded-full bg-[#D7A31A] px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-md">Defence Force Member</span>
              <span className="rounded-full bg-[#C94F27] px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-md">Emergency Service Worker · Fire Fighter</span>
              <span className="rounded-full bg-[#1383A5] px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-md">Police Officer</span>
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
