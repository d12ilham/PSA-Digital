"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type Report = {
  contactUrl?: string;
  pdfFileUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const metrics = [
  {
    label: "Certificate III",
    value: "≈160",
    detail: "enrolments in units of competency unique to community corrections specialisations",
  },
  {
    label: "Certificate IV",
    value: "≈300",
    detail: "enrolments in units of competency for the community corrections specialisations",
  },
  {
    label: "2024",
    value: "4,234",
    detail: "more enrolments in the Certificate III compared to the Certificate IV",
  },
];

export default function CorrectionalServicesWorkforceInsightThreeView({ slug, report }: { slug: string; report: Report }) {
  const mainRef = useRef<HTMLElement>(null);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const sections = mainRef.current?.querySelectorAll<HTMLElement>("[data-career-reveal]");
    if (!sections?.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setVisibleSections(Array.from(sections, (section) => section.dataset.careerReveal).filter((id): id is string => Boolean(id)));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const revealed = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => (entry.target as HTMLElement).dataset.careerReveal)
        .filter((id): id is string => Boolean(id));

      if (revealed.length) {
        setVisibleSections((current) => [...new Set([...current, ...revealed])]);
        entries.filter((entry) => entry.isIntersecting).forEach((entry) => observer.unobserve(entry.target));
      }
    }, { threshold: 0.08 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const revealClass = (id: string) => visibleSections.includes(id) ? "animate-card-entrance" : "translate-y-6 opacity-0";

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="workforce_insights" />
      <main ref={mainRef} className="mx-auto w-full max-w-[1504px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="workforce_insights"
          prev={{ label: "Theme 1 – PSA Insight 2", href: `/reports/${slug}/workforce_insights_specialisations` }}
          next={{ label: "2026 Proposed Workforce Strategy", href: `/reports/${slug}/workforce_strategies` }}
          prevPrefix=""
          nextPrefix="Next Section:"
        />

        <section data-career-reveal="hero" className={`rounded-[14px] border border-[#E9EAEB] bg-white p-5 motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:p-6 ${revealClass("hero")}`}>
          <div className="group flex min-h-[274px] flex-col gap-6 rounded-[14px] border-l-[12px] border-[#424996] bg-[#E8E9EF] px-5 py-6 transition-colors duration-300 hover:bg-[#E3E5EF] motion-reduce:transition-none sm:px-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 gap-5 animate-slide-up motion-reduce:animate-none">
              <span className="shrink-0 text-5xl font-light leading-none text-[#C8CCDF]">3</span>
              <div className="max-w-[810px]">
                <p className="text-sm font-medium text-[#424996]">Theme One, Insight Three</p>
                <h1 className="mt-5 text-2xl font-semibold leading-8">Higher Education requirements may constrain the CO-to-CCO pathway</h1>
                <p className="mt-5 text-sm leading-6">Consultations with the Correctional Services industry-sector indicated anecdotal examples of employees transitioning from CO roles to CCO roles, often after injury and as part of support for employee return-to-work plans. However, this pipeline into CCO roles is often limited by the recruitment requirement for higher education qualifications, which may impact the eligibility of COs to apply.</p>
              </div>
            </div>
            <div className="shrink-0 self-center animate-zoom-in motion-reduce:animate-none">
              <Image src="/images/reports/correctional-workforce-insight-three-frame-8.svg" width={220} height={220} alt="" aria-hidden="true" className="size-[180px] transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none xl:size-[220px]" />
            </div>
          </div>
        </section>

        <section data-career-reveal="introduction" className={`rounded-[14px] border border-[#E9EAEB] bg-white p-6 motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${revealClass("introduction")}`}>
          <h2 className="text-2xl font-semibold">Enrolment and Completion Rates</h2>
          <p className="mt-5 max-w-[850px] text-sm leading-6">Stakeholders noted that some organisations were electing to train community corrections officers through the Certificate IV in Correctional Practice rather than the Certificate III. Enrolments in community corrections specialisations show this difference.<sup><a href="#correctional-career-source-21" className="ml-0.5 text-[#424996] hover:underline">21</a></sup></p>
        </section>

        <div data-career-reveal="metrics" className="grid gap-5 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <div key={metric.label} className={`motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${revealClass("metrics")}`} style={visibleSections.includes("metrics") ? { animationDelay: `${index * 110}ms` } : undefined}>
              <div className="h-full min-h-[190px] rounded-lg bg-white px-5 py-6 transition-[box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none">
                <p className="text-sm font-medium text-[#424996]">{metric.label}</p>
                <p className="mt-5 text-4xl font-semibold text-[#424996]">{metric.value}</p>
                <p className="mt-4 text-sm leading-6 text-[#535862]">{metric.detail}{index < 2 ? <sup><a href="#correctional-career-source-21" className="ml-0.5 text-[#424996] hover:underline">21</a></sup> : <sup><a href="#correctional-career-source-22" className="ml-0.5 text-[#424996] hover:underline">22</a></sup>}</p>
              </div>
            </div>
          ))}
        </div>

        <div data-career-reveal="details" className="grid gap-6 lg:grid-cols-2">
          <section className={`group rounded-[14px] border border-[#E9EAEB] bg-white px-6 py-6 text-sm leading-6 transition-shadow duration-200 hover:shadow-md motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${revealClass("details")}`}>
            <p>Stakeholders noted that some organisations were electing to train CCOs through the Certificate IV in Correctional Practice rather than the Certificate III in Correctional Practice. Enrolments in units of competency for the Certificate III unique to community corrections specialisations are estimated at approximately 160, whereas enrolments in units of competency for the Certificate IV community corrections specialisations are substantially higher at approximately 300.<sup><a href="#correctional-career-source-21" className="ml-0.5 text-[#424996] hover:underline">21</a></sup> This is despite, as the graphs indicate, 4,234 more enrolments in the Certificate III compared to the Certificate IV in 2024.<sup><a href="#correctional-career-source-22" className="ml-0.5 text-[#424996] hover:underline">22</a></sup> Proportionally, significantly more people are enrolling in these specialisations in the Certificate IV compared to the Certificate III.</p>
            <Link href={`/reports/${slug}/workforce_insights_specialisations`} className="mt-4 inline-flex items-center rounded-full bg-[#424996] px-5 py-2.5 text-xs font-semibold text-white transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#343A7A] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#424996] motion-reduce:transition-none">View the Certificate III and IV enrolment and completion charts</Link>
            <p className="mt-4">Low enrolments and completions in the community corrections specialisations are further compounded by some jurisdictions indicating that they also accept a relevant higher education degree in social sciences. In some jurisdictions, such qualifications are a condition of employment, while in others they are considered highly desirable but not required as a condition for employment.</p>
          </section>

          <aside className={`group rounded-[14px] border-l-[12px] border-[#9DA8D0] bg-[#E8E9EF] px-6 py-6 text-sm leading-6 text-[#535862] transition-[background-color,box-shadow] duration-200 hover:bg-[#E3E5EF] hover:shadow-md motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${revealClass("details")}`} style={visibleSections.includes("details") ? { animationDelay: "120ms" } : undefined}>
            <div className="flex items-center gap-4">
              <Image src="/images/reports/correctional-workforce-insight-three-industry.svg" width={72} height={72} alt="" aria-hidden="true" className="size-[72px] shrink-0 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none" />
              <h2 className="text-xl font-semibold text-[#252D02]">Industry Insight</h2>
            </div>
            <p className="mt-5">The CCO role is comparatively complex, often requiring an understanding of advanced concepts such as behavioural change, acceptance and commitment theory, trauma-informed response, alcohol and other drug treatments and training for dealing with sex offenders. As such, it is seen as more specialised than what the current Certificate III in Correctional Practice offers. Several jurisdictions reported that they only offered Certificate IV level training for CCO roles.</p>
          </aside>
        </div>

        <section data-career-reveal="sources" aria-labelledby="correctional-career-sources-heading" className={`rounded-[14px] border border-[#E9EAEB] bg-white p-6 motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${revealClass("sources")}`}>
          <h2 id="correctional-career-sources-heading" className="text-2xl font-semibold">Sources</h2>
          <p id="correctional-career-source-21" className="mt-5 flex scroll-mt-24 gap-3 rounded-md py-1 text-sm leading-6 transition-colors duration-200 hover:bg-[#F4F6EB] motion-reduce:transition-none"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#598303] text-xs font-semibold text-white">21</span><span>National Centre for Vocational Education Research (NCVER), <em>Total VET students and courses: VOCSTATS</em>, [data set], NCVER, 2025, accessed 23 March 2026. These numbers are rough estimates, with Public Skills Australia using the lower enrolment figure to differentiate between units of competency which are only included in the specialisations as opposed to those that may be available more broadly across the qualifications.</span></p>
          <p id="correctional-career-source-22" className="mt-4 flex scroll-mt-24 gap-3 rounded-md py-1 text-sm leading-6 transition-colors duration-200 hover:bg-[#F4F6EB] motion-reduce:transition-none"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#598303] text-xs font-semibold text-white">22</span><span>Graph data based on NCVER, <em>Total VET students and courses: VOCSTATS</em>, [data set], NCVER, 2025, accessed 23 March 2026.</span></p>
        </section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
