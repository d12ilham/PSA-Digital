"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, CarFront, Plane, Ship, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const themes = [
  {
    label: "THEME 1",
    title: "Public Safety’s regulatory environment",
    body: "Public Safety industry-sectors are institutions accountable to governments. As such, they are subject to regulatory oversight bodies, government fiscal positions (including budget constraints and financial accountability) and are impacted by election cycles and political commitments.",
  },
  {
    label: "THEME 2",
    title: "Public Safety taskings",
    body: "The Public Safety workforce is required to remain agile and responsive to urgent taskings. This requires that Public Safety organisations ensure they are prepared to ‘scale up’ workforce resources in response to natural disasters, emergency incidents, geopolitical events etc. through leveraging available surge capacity.",
  },
  {
    label: "THEME 3",
    title: "Public Safety’s resourcing",
    body: "The Public Safety workforce uses a mix of career uniform personnel, reservists, volunteers and public sector personnel, to be fit for purpose across various contexts.",
  },
  {
    label: "THEME 4",
    title: "Public Safety’s risk environment",
    body: "The Public Safety workforce is exposed to demanding and, at times, hazardous work conditions. These workforces are trained to operate within high-stress and challenging environments but are not immune to resultant injury. This is a significant factor affecting workforce sustainability.",
  },
];

const analysisLinks = [
  { number: "1", title: "Core Skill Alignment", path: "cross_sector_core_skill_alignment" },
  { number: "2", title: "Specialist Skill Alignment", path: "cross_sector_specialist_skill_alignment" },
  { number: "3", title: "Skill Recognition", path: "cross_sector_skills_recognition" },
];

export default function PublicSafetyCrossSectorAnalysisView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const router = useRouter();
  const [activeTheme, setActiveTheme] = useState<number | null>(null);
  const themesRef = useRef<HTMLElement>(null);
  const interoperabilityRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const [themesVisible, setThemesVisible] = useState(false);
  const [interoperabilityVisible, setInteroperabilityVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);
  const selectedTheme = activeTheme === null ? null : themes[activeTheme];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === themesRef.current) setThemesVisible(true);
        if (entry.target === interoperabilityRef.current) setInteroperabilityVisible(true);
        if (entry.target === linksRef.current) setLinksVisible(true);
      });
    }, { threshold: 0.1 });

    if (themesRef.current) observer.observe(themesRef.current);
    if (interoperabilityRef.current) observer.observe(interoperabilityRef.current);
    if (linksRef.current) observer.observe(linksRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="cross_sector_analysis"
      navigation={{
        back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        next: { label: "Core Skill Alignment", href: `/reports/${slug}/cross_sector_core_skill_alignment` },
      }}
    >
      <section className="relative overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white p-6 transition-shadow duration-500 hover:shadow-lg lg:h-[318px]">
        <div className="max-w-[800px] animate-slide-up">
          <p className="text-xs font-semibold uppercase leading-6 text-[#598303]">Public Safety WIR 2026 · Cross-Sector Analysis</p>
          <h1 className="mt-4 text-[40px] font-bold leading-[54px] text-[#252D02]">Public Safety Cross-Sector Analysis</h1>
          <p className="mt-4 text-xs leading-6 text-[#535862]">Public Safety industry-sectors are responsible for safeguarding Australia’s people, property and environment through the combined efforts of the Defence, Fire and Emergency Services and Police industry-sectors. These industry-sectors prepare for, respond to and recover from natural disasters, emergency incidents, law and order, sovereign capabilities and geopolitical uncertainty.</p>
        </div>

        <div aria-hidden="true" className="absolute right-[72px] top-[36px] hidden h-[246px] w-[330px] animate-zoom-in min-[1100px]:block">
          <div style={{ animationDelay: "0.1s" }} className="group absolute left-[122px] top-0 flex h-[88px] w-[88px] animate-cross-sector-icon items-center justify-center rounded-full bg-[#F0F3E5] text-[#598303] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E4EDCA] hover:shadow-md"><Ship className="h-11 w-11 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.35} /></div>
          <div style={{ animationDelay: "0.22s" }} className="group absolute left-[22px] top-[55px] flex h-[88px] w-[88px] animate-cross-sector-icon items-center justify-center rounded-full bg-[#F0F3E5] text-[#598303] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E4EDCA] hover:shadow-md"><Truck className="h-11 w-11 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.35} /></div>
          <div style={{ animationDelay: "0.34s" }} className="group absolute right-0 top-[61px] flex h-[88px] w-[88px] animate-cross-sector-icon items-center justify-center rounded-full bg-[#F0F3E5] text-[#598303] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E4EDCA] hover:shadow-md"><Plane className="h-11 w-11 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1.35} /></div>
          <div style={{ animationDelay: "0.46s" }} className="group absolute bottom-0 left-[70px] flex h-[88px] w-[88px] animate-cross-sector-icon items-center justify-center rounded-full bg-[#F0F3E5] text-[#598303] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E4EDCA] hover:shadow-md"><CarFront className="h-11 w-11 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.35} /></div>
          <div style={{ animationDelay: "0.58s" }} className="group absolute bottom-0 right-[55px] flex h-[88px] w-[88px] animate-cross-sector-icon items-center justify-center rounded-full bg-[#F0F3E5] text-[#598303] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E4EDCA] hover:shadow-md"><Truck className="h-11 w-11 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.35} /></div>
          <span style={{ animationDelay: "0.5s" }} className="absolute left-[100px] top-[87px] h-px w-[58px] origin-left rotate-[28deg] animate-cross-sector-line border-t border-dashed border-[#A7B67B]" />
          <span style={{ animationDelay: "0.62s" }} className="absolute right-[76px] top-[91px] h-px w-[58px] origin-right -rotate-[28deg] animate-cross-sector-line border-t border-dashed border-[#A7B67B]" />
          <span style={{ animationDelay: "0.74s" }} className="absolute bottom-[72px] left-[128px] h-px w-[80px] origin-left animate-cross-sector-line border-t border-dashed border-[#A7B67B]" />
        </div>
      </section>

      <section ref={themesRef} className={`rounded-2xl border border-[#E9EAEB] bg-white p-6 transition-all duration-500 hover:border-[#8AC900] hover:shadow-lg ${themesVisible ? "animate-slide-up" : "translate-y-6 opacity-0"}`}>
        <div className="border-b border-[#E9EAEB] pb-4">
          <h2 className="text-2xl font-bold leading-8 text-[#252D02]">Four Themes Consistently Impacting Workforce Planning · 2025 Public Safety Workforce Insight Report</h2>
        </div>
        <p className="mt-6 max-w-[800px] text-xs leading-6 text-[#535862]">The 2025 Public Safety Workforce Insights Report identified four themes that consistently impact workforce planning across these industry-sectors, they include:</p>

        <div className="mt-6 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          {themes.map((theme, index) => {
            const selected = activeTheme === index;
            return (
              <article key={theme.label} style={themesVisible ? { animationDelay: `${index * 0.12 + 0.1}s` } : undefined} className={`group flex min-h-[220px] flex-col rounded-lg border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${themesVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"} ${selected ? "border-[#598303] bg-[#F0F3E5]" : "border-[#E9EAEB] bg-white hover:border-[#8AC900]"}`}>
                <p className="text-xs font-semibold leading-6 text-[#598303]">{theme.label}</p>
                <h3 className="mt-5 text-xl font-bold leading-7 text-[#252D02]">{theme.title}</h3>
                <button type="button" aria-expanded={selected} aria-controls="cross-sector-theme-detail" onClick={() => setActiveTheme(selected ? null : index)} className="mt-auto inline-flex h-10 w-fit items-center gap-2 rounded-full !bg-[#8AC900] px-5 text-xs font-bold !text-[#252D02] transition-all duration-300 hover:scale-105 hover:shadow-md">
                  {selected ? "Close" : "Open"}{selected ? <ChevronUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" /> : <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />}
                </button>
              </article>
            );
          })}
        </div>

        {selectedTheme && (
          <article id="cross-sector-theme-detail" className="mt-6 min-h-[136px] animate-card-entrance rounded-lg border border-[#598303] border-l-4 bg-[#F0F3E5] px-8 py-6 transition-shadow duration-300 hover:shadow-md">
            <h2 className="text-xl font-bold leading-7 text-[#252D02]">{selectedTheme.title}</h2>
            <p className="mt-3 max-w-[1000px] text-xs leading-6 text-[#535862]">{selectedTheme.body}</p>
          </article>
        )}
      </section>

      <section ref={interoperabilityRef} className={`rounded-2xl bg-[#F0F3E5] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-md lg:min-h-[252px] ${interoperabilityVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
        <div className="max-w-[800px] space-y-4 text-xs leading-6 text-[#535862]">
          <p>In addition to the themes above, Public Safety industry-sectors are increasingly required to improve cross-sector interoperability allowing organisations to interact, balance different legal arrangements and provide surge capacity. This requires a level of cross-industry skills recognition.</p>
          <p>Greater cross-industry skills recognition of transferable competencies is essential for sustainable interoperability. When personnel from Defence, Fire and Emergency Services and Police share a common understanding of incident-management language, technical skills (communications, logistics, command and control) and recognised qualifications, multi-organisation teams can integrate faster, reduce safety risks and maintain surge capability during prolonged or simultaneous operations.</p>
        </div>
      </section>

      <section ref={linksRef} className="grid gap-2 md:grid-cols-3">
        {analysisLinks.map((item, index) => (
          <article key={item.number} style={linksVisible ? { animationDelay: `${index * 0.12 + 0.1}s` } : undefined} className={`group relative flex min-h-[146px] overflow-hidden rounded-lg border border-[#E9EAEB] border-t-4 border-t-[#8AC900] bg-white px-8 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#8AC900] hover:shadow-lg ${linksVisible ? "animate-card-entrance" : "translate-y-6 opacity-0"}`}>
            <span aria-hidden="true" className="absolute left-4 top-5 text-[48px] font-light leading-none text-[#F0F3E5]">{item.number}</span>
            <div className="relative ml-8 flex flex-col">
              <h2 className="text-xl font-bold leading-7 text-[#252D02]">{item.title}</h2>
              <button type="button" onClick={() => router.push(`/reports/${slug}/${item.path}`)} className="mt-auto inline-flex h-10 w-fit items-center gap-2 rounded-full bg-[#8AC900] px-5 text-xs font-bold text-[#252D02] transition-all duration-300 hover:scale-105 hover:shadow-md">View <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" /></button>
            </div>
          </article>
        ))}
      </section>
    </PublicSafetyPageShell>
  );
}
