"use client";

import Image from "next/image";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type Report = {
  contactUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const priorities = [
  {
    title: "Ministerial Priority 2026",
    description: "Using strategic workforce planning and strong stakeholder engagement to continue building a shared, evidence-based view of the challenges and opportunities for industries and across JSCs.",
  },
  {
    title: "Public Skills Australia Strategic Plan",
    description: "Support industry-sectors to continue to build and maintain capable and mobile workforces that are future-ready.",
  },
  {
    title: "Drivers of Change",
    description: "Resilience of organisations to respond to strategic shocks.",
  },
];

const findings = [
  {
    finding: "Low awareness and outdated perceptions impact recruitment pools.",
    description: "There is low awareness of and outdated perceptions about the Correctional Services industry-sector that impacts recruitment pools. Generally, respondents indicated that they often imagined Correctional Services through a custodial lens: uniforms, razor wire and surveillance rather than as a diverse professional field.",
  },
  {
    finding: "The potential recruitment pool for Correctional Services could be increased significantly if more information is accessible about the variety of careers.",
    description: "Around one-third of respondents indicated they had ‘never thought about’ Correctional Services as a career option, signalling an awareness gap.",
  },
  {
    finding: "There are identifiable cohorts that could be targeted to improve Correctional Services recruitment pools.",
    description: "Millennial female respondents presented an important diverse cohort when provided with targeted messaging addressing workplace safety concerns. Professional and degree-qualified respondents showed high receptivity to considering Correctional Services as a career. This was duplicated in respondent cohorts who held managerial roles.",
  },
  {
    finding: "Shifting narratives about Correctional Services changes perceptions and attitudes towards considering a career in this industry-sector.",
    description: "Priority cohort respondents indicated that safety and meaningful impact messages resonated with them, particularly when supported by authentic workplace evidence. Respondents indicated that messaging effectiveness depends entirely on authenticity. Branding and communications without corresponding workplace improvements may simply increase the distance between promise and reality, ultimately undermining recruitment efforts.",
  },
  {
    finding: "Barriers to considering Correctional Services as a career were predominantly perceptual.",
    description: "Respondents indicated that the strongest deterrents were fears about safety, emotional resilience and workplace culture, alongside uncertainty about personal capability. Respondents indicated that the perception of being judged by others was a deterrent, with nine per cent citing concerns about broader negative public perceptions and social stigma.",
  },
];

const recommendations = [
  {
    text: "Prioritise recruiting metropolitan Millennial males, Generation Z males and Millennial females.",
    outcome: "Increased applicant pool.",
    icon: "/images/reports/correctional-demand-recommendation-search.svg",
  },
  {
    text: "Focus on opportunities to recruit professionals and managers into Correctional Services careers. Prioritise professionals and managers.",
    outcome: "Quality candidates at all organisational levels.",
    icon: "/images/reports/correctional-demand-recommendation-briefcase.svg",
  },
  {
    text: "Consider strategies to attract employees to relocate or commute to regional locations. Prioritise addressing the mismatch between the target cohort location (metropolitan focus) and facility location (predominantly regional), particularly in relation to commuting to and from work.",
    outcome: "Improved regional facility recruitment.",
    icon: "/images/reports/correctional-demand-recommendation-people.svg",
  },
  {
    text: "Undertake targeted messaging campaigns that present the accurate and accessible information about working in Correctional Services. Prioritise rehabilitation focused narratives and genuine and authentic messaging as primary anchors, and sequence messaging to cohort types.",
    outcome: "Reduced perception barriers and increased engagement.",
    icon: "/images/reports/correctional-demand-recommendation-target.svg",
  },
];

export default function CorrectionalServicesDemandManagementView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="update_2024_demand_management" />
      <main className="mx-auto w-full max-w-[1504px] flex-1 space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="update_2024_demand_management"
          prev={{ label: "Update on 2024 Strategies", href: `/reports/${slug}/update_2024_strategies` }}
          next={{ label: "Update on 2025 Strategies", href: `/reports/${slug}/update_2025_strategies` }}
          prevPrefix=""
        />

        <section className="flex flex-col gap-6 rounded-[14px] border border-[#E9EAEB] bg-white p-6 animate-slide-up motion-reduce:animate-none lg:min-h-[232px] lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[820px]">
            <span className="inline-flex rounded-full bg-[#424996] px-3 py-1 text-xs font-semibold text-white">2024 Workforce Strategies</span>
            <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-[40px] sm:leading-[1.2]">Demand Management</h1>
            <p className="mt-4 text-sm leading-6">The Drivers for Recruitment, Attrition and Retention (Corrections) Report 2025 (Drivers Report) examined public perceptions of working in the Correctional Services industry-sector and its impact on recruitment, attraction and attrition. This work supported several strategic priorities including:</p>
          </div>
          <Image src="/images/reports/correctional-workforce-strategies-frame-436.svg" width={480} height={140} alt="" className="h-auto w-full max-w-[480px] shrink-0 animate-zoom-in motion-reduce:animate-none lg:w-[480px]" />
        </section>

        <section aria-label="Strategic priorities" className="grid gap-5 md:grid-cols-3">
          {priorities.map((priority, index) => (
            <article key={priority.title} className="min-h-[178px] rounded-[14px] border-l-[10px] border-[#424996] bg-[#E8E9EF] p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-md animate-card-entrance motion-reduce:animate-none motion-reduce:transition-none" style={{ animationDelay: `${index * 90}ms` }}>
              <h2 className="text-base font-semibold">{priority.title}</h2>
              <p className="mt-2 text-sm leading-6">{priority.description}</p>
            </article>
          ))}
        </section>

        <section className="space-y-5 pt-1 animate-slide-up motion-reduce:animate-none">
          <h2 className="max-w-[1000px] px-6 text-base font-semibold leading-6">The Drivers Report identified five findings and associated recommendations that were presented to the Corrective Services Administrative Council (CSAC) for consideration in 2026</h2>
          <h3 className="px-6 text-base font-semibold">The five findings are summarised in the table below:</h3>
          <div className="overflow-x-auto rounded-[12px] border border-[#E9EAEB] bg-white">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm leading-6">
              <thead className="bg-[#F4F4F4] text-[#252D02]"><tr><th scope="col" className="w-[35.5%] border-r border-[#E9EAEB] px-6 py-3 font-medium">Finding</th><th scope="col" className="px-5 py-3 font-medium">Description</th></tr></thead>
              <tbody className="text-[#535862]">
                {findings.map((row, index) => (
                  <tr key={row.finding} className="border-t border-[#E9EAEB] transition-colors duration-200 hover:bg-[#F9FAF5] motion-reduce:transition-none">
                    <th scope="row" className="border-r border-[#E9EAEB] px-6 py-4 text-left font-semibold"><div className="flex items-start gap-3"><span data-finding-number className="shrink-0 font-semibold tabular-nums text-[#424996]">{index + 1}.</span><span>{row.finding}</span></div></th>
                    <td className="px-5 py-4">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-5 pt-1">
          <h2 className="text-base font-semibold">These findings were supported by the following recommendations:</h2>
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
            {recommendations.map((recommendation, index) => (
              <article key={recommendation.text} className="min-h-[398px] rounded-[14px] border border-[#E9EAEB] bg-white p-6 text-sm leading-6 text-[#535862] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-md animate-card-entrance motion-reduce:animate-none motion-reduce:transition-none" style={{ animationDelay: `${index * 90}ms` }}>
                <Image src={recommendation.icon} width={100} height={100} alt="" className="mb-7 size-[100px]" />
                <p>{recommendation.text}</p>
                <p className="mt-2">Primary Outcome: {recommendation.outcome}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-[14px] border-l-[10px] border-[#424996] bg-[#E8E9EF] px-6 py-6 animate-slide-up motion-reduce:animate-none">
          <h2 className="text-xl font-semibold">Next Steps</h2>
          <p className="mt-4 max-w-[850px] text-sm leading-6">Public Skills Australia is now engaging with CSAC to work through the implementation of the findings of the Report. The aim is to support the Correctional Services industry-sector to retain its workforce and manage and reduce attritional rates, while highlighting training opportunities.</p>
        </section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
