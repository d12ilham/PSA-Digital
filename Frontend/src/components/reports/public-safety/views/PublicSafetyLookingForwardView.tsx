"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const priorities = [
  "inclusion and participation of First Nations people, women and other genders in the Public Safety and Government workforces.",
  "the use of AI and digital transformation and the impact of these technologies on the Public Safety and Government workforces.",
];

const focusAreas = [
  { label: "Cross-Industry", color: "#12224F", text: "Exploring the potential of recognising core skill alignment between Public Safety industry-sectors in the VET sector context." },
  { label: "Defence", color: "#D3992C", text: "Leveraging the VET system to complement Defence's own long term workforce planning and skills requirements that may arise through the forthcoming National Defence Strategy update." },
  { label: "Fire and Emergency Services", color: "#C9481A", text: "Exploring the critical challenge of maintaining capability in the use of prescribed burning and backburning during bushfire suppression and examining capability requirements for divisional commander training." },
  { label: "Police", color: "#0D71A3", text: "Examining challenges for police in regional, rural and remote communities with a focus on police leadership responsibilities being taken on earlier in careers." },
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

  return <PublicSafetyPageShell slug={slug} report={report} currentPage="looking_forward" contentClassName="lg:py-10" navigation={{
    back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    prev: { label: "Commonwealth Government Initiatives", href: `/reports/${slug}/police_federal_initiatives` },
    prevPrefix: "Previous Section:",
    pagesOrder: [
      { key: "police_federal_initiatives", label: "Commonwealth Government Initiatives" },
      { key: "looking_forward", label: "Looking Forward" },
    ],
  }}>
    <section className="grid items-center gap-6 rounded-2xl border border-[#E9EAEB] bg-white p-6 transition-shadow duration-300 hover:shadow-sm lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
      <div>
        <div className="animate-slide-up motion-reduce:animate-none"><p className="text-sm font-medium uppercase text-[#598303]">Public Safety WIR 2026 · Looking Forward</p><h1 className="mt-5 text-[32px] font-bold leading-tight text-[#12224F] sm:text-[40px] sm:leading-[48px]">2027 and Beyond</h1></div>
        <p className="mt-5 max-w-[744px] animate-slide-up-delay text-sm leading-6 text-[#252D02] motion-reduce:animate-none">Public Skills Australia has built on the 2024 Workforce Plans and the 2025 Public Safety Workforce Insights Report in the development and delivery of this Report. These reports continue to be the strategic centrepiece guiding annual Business Plans for Public Skills Australia, alongside Ministerial, industry-sector and other priorities (e.g. Royal Commissions and Inquiries).</p>
      </div>
      <Image
        src="/images/reports/public-safety/looking-forward-group-88.svg"
        width={512}
        height={251}
        alt=""
        loading="eager"
        className="h-auto w-full max-w-[512px] animate-zoom-in justify-self-center motion-reduce:animate-none"
      />
    </section>

    <section ref={prioritiesRef} className={`text-sm leading-6 text-[#252D02] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:animate-none ${prioritiesVisible ? "animate-slide-up" : "translate-y-5 opacity-0"}`}>
      <p>The 2027 Workforce Insights Reports will firstly focus on broader priorities detailed below and may be delivered throughout 2026/27:</p>
      <ul className="list-disc pl-5">{priorities.map((priority) => <li key={priority}>{priority}</li>)}</ul>
      <p className="mt-6">Additionally, the 2027 Workforce Insights Reports will focus on any other emerging priorities impacting Public Safety industry-sectors including:</p>
    </section>

    <section ref={focusRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {focusAreas.map((area, index) => <article key={area.label} style={focusVisible ? { animationDelay: `${index * 0.1 + 0.08}s` } : undefined} className={`group relative min-h-[166px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 pb-6 pt-8 motion-reduce:opacity-100 motion-reduce:animate-none motion-reduce:hover:translate-y-0 transition-all duration-300 hover:-translate-y-1 hover:border-[#B9C99A] hover:shadow-lg ${focusVisible ? "animate-card-entrance" : "opacity-0"}`}>
        <span className="absolute inset-x-0 top-0 h-[7px]" style={{ backgroundColor: area.color }}/>
        <span className="inline-flex rounded-full px-5 py-2.5 text-sm font-semibold uppercase text-white transition-transform duration-300 group-hover:scale-105" style={{ backgroundColor: area.color }}>{area.label}</span>
        <p className="mt-4 text-xs leading-[18px] text-[#535862]">{area.text}</p>
      </article>)}
    </section>
  </PublicSafetyPageShell>;
}
