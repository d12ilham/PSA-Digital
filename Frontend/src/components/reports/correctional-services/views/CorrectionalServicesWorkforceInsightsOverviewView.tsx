"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type Report = {
  contactUrl?: string;
  pdfFileUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const insights = [
  {
    title: "Skills and Capabilities",
    summary: "Community corrections roles require dynamic skills and are focused on rehabilitation and reintegration back into a community.",
  },
  {
    title: "Use of Specialisations",
    summary: "CCO roles require more specialised capability provided in Certificate IV in Correctional Practice.",
  },
  {
    title: "Career Pathways",
    summary: "Higher Education requirements may constrain the CO-to-CCO pathway.",
  },
];

export default function CorrectionalServicesWorkforceInsightsOverviewView({ slug, report }: { slug: string; report: Report }) {
  const router = useRouter();
  const mainRef = useRef<HTMLElement>(null);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const sections = mainRef.current?.querySelectorAll<HTMLElement>("[data-workforce-reveal]");
    if (!sections?.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setVisibleSections(Array.from(sections, (section) => section.dataset.workforceReveal).filter((id): id is string => Boolean(id)));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const revealed = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => (entry.target as HTMLElement).dataset.workforceReveal)
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
          prev={{ label: "Workforce Insights Introduction", href: `/reports/${slug}/workforce_insights` }}
          next={{ label: "2026 Proposed Strategies", href: `/reports/${slug}/workforce_strategies` }}
        />

        <section className="grid items-center gap-8 rounded-lg border border-[#E9EAEB] bg-white px-6 py-7 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:px-8">
          <div className="max-w-[850px] animate-slide-up">
            <h1 className="text-[32px] font-semibold leading-tight text-[#424996] sm:text-[40px]">Workforce Insights</h1>
            <p className="mt-4 text-sm leading-6">This Report identifies the following theme and three insights relating to Correctional Services. Select any insight to open its detail page.</p>
            <p className="mt-3 text-sm leading-6">The Certificate III in Correctional Practice does not fully reflect the complexity of community corrections roles.</p>
            <p className="mt-3 text-sm leading-6">Certificates III and IV in Correctional Practice do not include emerging capability requirements such as trauma-informed practice, domestic and family violence, sex offenders in the community and mental health (including suicidal ideation).<sup><a href="#correctional-workforce-footnote-23" className="ml-0.5 text-[#424996] hover:underline">23</a></sup> As a result, some jurisdictions are utilising non-accredited training to bolster the VET qualifications.</p>
            <p className="mt-3 text-sm leading-6">Delivery of Certificates III and IV in Correctional Practice was identified by RTOs as challenging to contextualise for community corrections settings.</p>
          </div>
          <div className="mx-auto w-full max-w-[480px] animate-zoom-in motion-reduce:animate-none">
            <Image
              src="/images/reports/correctional-workforce-insights-frame-436.svg"
              width={480}
              height={140}
              alt=""
              aria-hidden="true"
              priority
              className="h-auto w-full"
            />
          </div>
        </section>

        <section data-workforce-reveal="theme" aria-labelledby="training-package-heading" className={`rounded-lg border border-[#E9EAEB] border-t-[8px] border-t-[#9DA8D0] bg-white px-5 py-6 motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:px-7 ${revealClass("theme")}`}>
          <p className="text-xs font-medium uppercase text-[#424996]">Theme 1 · 3 insights</p>
          <h2 id="training-package-heading" className="mt-5 text-xl font-semibold">CSC Correctional Services Training Package</h2>
          <span className="mt-3 inline-flex rounded-full bg-[#8AC900] px-4 py-2 text-xs font-semibold">Theme Overview</span>
          <div className="mt-6 max-w-[920px] text-sm leading-6">
            <p>Stakeholders generally supported all specialisations in both the Certificate III and IV in Correctional Practice; however, the following challenges were identified:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>The Certificate III in Correctional Practice does not fully reflect the complexity of community corrections roles.</li>
              <li>Certificates III and IV in Correctional Practice do not include emerging capability requirements such as trauma-informed practice, domestic and family violence, sex offenders in the community and mental health (including suicidal ideation).<sup><a href="#correctional-workforce-footnote-23" className="ml-0.5 text-[#424996] hover:underline">23</a></sup> As a result, some jurisdictions are utilising non-accredited training to bolster the VET qualifications.</li>
              <li>Delivery of Certificates III and IV in Correctional Practice was identified by RTOs as challenging to contextualise for community corrections settings.</li>
            </ul>
          </div>

          <div className="mt-6 space-y-2">
            {insights.map((insight, index) => (
              <button
                key={insight.title}
                type="button"
                onClick={() => router.push(index === 0 ? `/reports/${slug}/workforce_insights_skills_capabilities` : index === 1 ? `/reports/${slug}/workforce_insights_specialisations` : `/reports/${slug}/workforce_insights_career_pathways`)}
                style={visibleSections.includes("theme") ? { animationDelay: `${0.12 + index * 0.1}s` } : undefined}
                className={`group grid min-h-[112px] w-full grid-cols-[34px_minmax(0,1fr)_36px] items-center gap-3 rounded-lg border border-[#B4B9D3] border-l-[7px] border-l-[#424996] bg-[#F0F1F9] px-3 py-4 text-left transition-[background-color,box-shadow] duration-200 hover:bg-[#E9EBF7] hover:shadow-sm motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:grid-cols-[50px_minmax(0,1fr)_40px] sm:px-5 ${visibleSections.includes("theme") ? "animate-card-entrance" : "translate-y-4 opacity-0"}`}
              >
                <span className="text-4xl font-light leading-none text-[#D4D8E9] sm:text-5xl">{index + 1}</span>
                <span className="min-w-0">
                  <span className="block text-xs text-[#424996]">Theme One, Insight {index === 0 ? "One" : index === 1 ? "Two" : "Three"}</span>
                  <strong className="mt-1 block text-base font-semibold">{insight.title}</strong>
                  <span className="mt-1 block text-xs leading-5 text-[#535862]">{insight.summary}</span>
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-[#8AC900] transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"><ArrowRight size={16} aria-hidden="true" /></span>
              </button>
            ))}
          </div>
        </section>

        <section data-workforce-reveal="sources" aria-labelledby="workforce-sources-heading" className={`rounded-lg border border-[#E9EAEB] bg-white px-6 py-5 motion-reduce:animate-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${revealClass("sources")}`}>
          <h2 id="workforce-sources-heading" className="text-lg font-semibold">Sources</h2>
          <p id="correctional-workforce-footnote-23" className="mt-3 scroll-mt-24 text-xs leading-5 text-[#535862]"><span className="mr-2 inline-grid size-5 place-items-center rounded-full bg-[#8AC900] font-semibold text-[#252D02]">23</span>Public Skills Australia 2025, Corrections Implementation Report, unpublished.</p>
        </section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
