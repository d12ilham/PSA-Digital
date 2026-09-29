"use client";

import { Binoculars, Blocks, BrainCircuit, ChevronRight, Goal, Network, ScanSearch } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const priorities = [
  "inclusion and participation of First Nations people, women and other genders in the Public Safety and Government workforces.",
  "the use of AI and digital transformation and the impact of these technologies on the Public Safety and Government workforces.",
];

const focusAreas = [
  { label: "Cross-Industry", color: "#182B5B", text: "Exploring the potential of recognising core skill alignment between Public Safety industry-sectors in the VET sector context." },
  { label: "Defence", color: "#D89A1E", text: "Leveraging the VET system to complement Defence's own long term workforce planning and skills requirements that may arise through the forthcoming National Defence Strategy update." },
  { label: "Fire and Emergency Services", color: "#D84016", text: "Exploring the critical challenge of maintaining capability in the use of prescribed burning and backburning during bushfire suppression and examining capability requirements for divisional commander training." },
  { label: "Police", color: "#087FAB", text: "Examining challenges for police in regional, rural and remote communities with a focus on police leadership responsibilities being taken on earlier in careers." },
  { label: "Drivers of Change", color: "#598303", text: "Continue to consider the impact of the identified drivers of change in this year's reports on the Public Safety industry-sector workforces." },
];

export default function PublicSafetyLookingForwardView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const prioritiesRef = useRef<HTMLElement>(null);
  const focusRef = useRef<HTMLElement>(null);
  const [prioritiesVisible, setPrioritiesVisible] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === prioritiesRef.current) setPrioritiesVisible(true);
        if (entry.target === focusRef.current) setFocusVisible(true);
      });
    }, { threshold: 0.12 });
    if (prioritiesRef.current) observer.observe(prioritiesRef.current);
    if (focusRef.current) observer.observe(focusRef.current);
    return () => observer.disconnect();
  }, []);

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="looking_forward" navigation={{
    back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    prev: { label: "Federal Government Strategies", href: `/reports/${slug}/police_federal_initiatives` },
    prevPrefix: "Previous Section:",
    pagesOrder: [
      { key: "police_federal_initiatives", label: "Federal Government Strategies" },
      { key: "looking_forward", label: "Looking Forward" },
    ],
  }}>
    <section className="relative min-h-[225px] overflow-hidden rounded-xl border border-[#E9EAEB] bg-white px-7 py-8 transition-all duration-500 hover:border-[#B9C99A] hover:shadow-lg lg:pr-[470px]">
      <div className="animate-slide-up"><p className="text-[10px] font-semibold uppercase text-[#719926]">Public Safety WIR 2026 · Looking Forward</p><h1 className="mt-5 text-[40px] font-bold leading-[44px] text-[#046D2A]">2027 and Beyond</h1></div>
      <p className="mt-4 max-w-[780px] animate-slide-up-delay text-xs leading-5 text-[#535862]">Public Skills Australia has built on the 2024 Workforce Plans and the 2025 Public Safety Workforce Insights Report in the development and delivery of this Report. These reports continue to be the strategic centrepiece guiding annual Business Plans for Public Skills Australia, alongside Ministerial, industry-sector and other priorities (e.g. Royal Commissions and Inquiries).</p>
      <div className="absolute right-12 top-7 hidden h-[175px] w-[390px] lg:block text-[#719926]">
        <span className="absolute left-0 top-[88px] grid size-11 animate-cross-sector-icon place-items-center rounded-full bg-[#F0F4E7] transition-transform duration-300 hover:scale-110" style={{ animationDelay: ".15s" }}><Network size={21}/></span>
        <span className="absolute left-14 top-6 grid size-16 animate-cross-sector-icon place-items-center rounded-full bg-[#F0F4E7] transition-transform duration-300 hover:scale-110" style={{ animationDelay: ".25s" }}><Goal size={27}/></span>
        <span className="absolute left-[118px] top-1 grid size-11 animate-cross-sector-icon place-items-center rounded-full bg-[#F0F4E7] transition-transform duration-300 hover:scale-110" style={{ animationDelay: ".35s" }}><Blocks size={20}/></span>
        <span className="absolute left-[92px] top-[112px] grid size-12 animate-cross-sector-icon place-items-center rounded-full bg-[#F0F4E7] transition-transform duration-300 hover:scale-110" style={{ animationDelay: ".45s" }}><ScanSearch size={22}/></span>
        <span className="absolute left-[162px] top-[90px] grid size-20 animate-cross-sector-icon place-items-center rounded-full bg-[#F0F4E7] transition-transform duration-300 hover:scale-110" style={{ animationDelay: ".55s" }}><Binoculars size={34}/></span>
        <span className="absolute right-[54px] top-[84px] grid size-12 animate-cross-sector-icon place-items-center rounded-full bg-[#F0F4E7] transition-transform duration-300 hover:scale-110" style={{ animationDelay: ".65s" }}><BrainCircuit size={22}/></span>
        <span className="absolute right-0 top-7 grid size-12 animate-cross-sector-icon place-items-center rounded-full bg-[#F0F4E7] transition-transform duration-300 hover:translate-x-1" style={{ animationDelay: ".75s" }}><ChevronRight size={25}/></span>
        <span className="absolute left-[43px] top-[110px] h-px w-[265px] origin-left animate-cross-sector-line border-t border-dashed border-[#B9C99A]" style={{ animationDelay: ".9s" }}/>
      </div>
    </section>

    <section ref={prioritiesRef} className={`px-1 text-xs leading-5 text-[#535862] ${prioritiesVisible ? "animate-slide-up" : "translate-y-5 opacity-0"}`}>
      <p>The 2027 Workforce Insights Reports will firstly focus on broader priorities detailed below and may be delivered throughout 2026/27:</p>
      <ul className="mt-2 list-disc pl-5">{priorities.map((priority) => <li key={priority}>{priority}</li>)}</ul>
      <p className="mt-7">Additionally, the 2027 Workforce Insights Reports will focus on any other emerging priorities impacting Public Safety industry-sectors including:</p>
    </section>

    <section ref={focusRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {focusAreas.map((area, index) => <article key={area.label} style={focusVisible ? { animationDelay: `${index * 0.1 + 0.08}s` } : undefined} className={`group relative min-h-[125px] overflow-hidden rounded-lg border border-[#E9EAEB] bg-white px-5 pb-5 pt-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#B9C99A] hover:shadow-lg ${focusVisible ? "animate-card-entrance" : "opacity-0"}`}>
        <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: area.color }}/>
        <span className="inline-flex rounded-full px-4 py-2 text-[10px] font-bold uppercase text-white transition-transform duration-300 group-hover:scale-105" style={{ backgroundColor: area.color }}>{area.label}</span>
        <p className="mt-4 text-[11px] leading-[17px] text-[#717680]">{area.text}</p>
      </article>)}
    </section>
  </PublicSafetyPageShell>;
}
