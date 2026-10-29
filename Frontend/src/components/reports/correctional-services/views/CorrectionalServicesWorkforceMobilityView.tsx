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
    description: "This project will contribute to addressing Australia’s productivity challenges, including undertaking activity that supports building a skilled, adaptable and inclusive workforce and embedding qualification reform principles to deliver streamlined, relevant and future-ready qualifications.",
  },
  {
    title: "Public Skills Australia Strategic Plan",
    description: "Support for the industry-sector through high-quality training products, assistance to effective training delivery and the fostering of a more capable workforce.",
  },
  {
    title: "Drivers of Change",
    description: "Challenges to workforce productivity.",
  },
];

const reportParts = [
  {
    title: "Part A",
    description: "Provided details about the qualification including the packaging rules, RTOs approved to deliver and assess, enrolments, completions and the use of specialisations and electives. Information about the demographic profile of learners undertaking the qualification is also detailed.",
  },
  {
    title: "Part B",
    description: "Described the challenges reported by stakeholders when implementing the qualification. It includes an outline of the potential support initiatives aligned to each challenge.",
  },
  {
    title: "Part C",
    description: "Set out how the potential opportunities to support RTOs might be designed and implemented, including recommendations.",
  },
  {
    title: "Part D",
    description: "Outlined the consultation findings and associated recommendations.",
  },
];

const recommendations = [
  {
    title: "Develop a New Implementation Guide",
    description: "Develop a qualification-specific Implementation Guide that includes specific direction on interpreting language used across the qualification, assessment models and appropriate support guidance aligned to known and emerging learner needs.",
  },
  {
    title: "Good Practice Forums",
    description: "Establish a Good Practice Forum series for Correctional Services industry RTOs and employers. This forum would focus on delivery and design challenges to support enhanced training quality and outcomes.",
  },
  {
    title: "Culturally Appropriate Learning and Assessment Guidance",
    description: "Develop guidance materials to support the development of culturally appropriate learning and assessment models, practices and tools.",
  },
];

export default function CorrectionalServicesWorkforceMobilityView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="update_2024_workforce_mobility" />
      <main className="mx-auto w-full max-w-[1504px] flex-1 space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="update_2024_workforce_mobility"
          prev={{ label: "Update on 2024 Strategies", href: `/reports/${slug}/update_2024_strategies` }}
          next={{ label: "Update on 2025 Strategies", href: `/reports/${slug}/update_2025_strategies` }}
          prevPrefix=""
        />

        <section className="flex flex-col gap-6 rounded-[14px] border border-[#E9EAEB] bg-white p-6 animate-slide-up motion-reduce:animate-none lg:min-h-[232px] lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[820px]">
            <span className="inline-flex rounded-full bg-[#424996] px-3 py-1 text-xs font-semibold text-white">2024 Workforce Strategies</span>
            <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-[40px] sm:leading-[1.2]">Workforce Mobility</h1>
            <p className="mt-4 text-sm leading-6">The Corrections Implementation Report 2025 (Implementation Report) assessed the skills maintenance and training delivery challenges in relation to the implementation of the Certificate III in Correctional Practice. The Implementation Report supported the following strategic priorities:</p>
          </div>
          <Image src="/images/reports/correctional-workforce-strategies-frame-436.svg" width={480} height={140} alt="" className="h-auto w-full max-w-[480px] shrink-0 animate-zoom-in motion-reduce:animate-none lg:w-[480px]" />
        </section>

        <section aria-label="Strategic priorities" className="grid gap-5 md:grid-cols-3">
          {priorities.map((priority, index) => (
            <article key={priority.title} className="min-h-[200px] rounded-[14px] border-l-[10px] border-[#424996] bg-[#E8E9EF] p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-md animate-card-entrance motion-reduce:animate-none motion-reduce:transition-none" style={{ animationDelay: `${index * 90}ms` }}>
              <h2 className="text-base font-semibold">{priority.title}</h2>
              <p className="mt-2 text-sm leading-6">{priority.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[14px] border border-[#E9EAEB] bg-white p-6 animate-slide-up motion-reduce:animate-none">
          <h2 className="text-base font-semibold">The Implementation Report was delivered in multiple parts:</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {reportParts.map((part, index) => (
              <article key={part.title} className="min-h-[316px] rounded-[14px] border border-[#E9EAEB] bg-[#F4F4F6] p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-md animate-card-entrance motion-reduce:animate-none motion-reduce:transition-none" style={{ animationDelay: `${index * 90}ms` }}>
                <h3 className="text-[40px] font-semibold leading-none text-[#D9DAE1]">{part.title}</h3>
                <p className="mt-7 text-sm leading-6 text-[#535862]">{part.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-2 pt-1 animate-slide-up motion-reduce:animate-none">
          <h2 className="px-6 text-base font-semibold">The Implementation Report made the following recommendations:</h2>
          <div className="overflow-x-auto rounded-[12px] border border-[#E9EAEB] bg-white">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm leading-6">
              <thead className="bg-[#F4F4F4]"><tr><th scope="col" className="w-[35.5%] border-r border-[#E9EAEB] px-6 py-3 font-medium">Recommendation</th><th scope="col" className="px-5 py-3 font-medium">Description</th></tr></thead>
              <tbody className="text-[#535862]">
                {recommendations.map((recommendation, index) => (
                  <tr key={recommendation.title} className="border-t border-[#E9EAEB] transition-colors duration-200 hover:bg-[#F9FAF5] motion-reduce:transition-none">
                    <th scope="row" className="border-r border-[#E9EAEB] px-6 py-5 text-left font-semibold"><div className="flex items-start gap-3"><span data-finding-number className="shrink-0 font-semibold tabular-nums text-[#424996]">{index + 1}.</span><span>{recommendation.title}</span></div></th>
                    <td className="px-5 py-5">{recommendation.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="overflow-hidden rounded-[14px] border-l-[10px] border-[#424996] bg-[#E8E9EF] px-6 py-6 animate-slide-up motion-reduce:animate-none">
          <h2 className="text-xl font-semibold">Next Steps</h2>
          <p className="mt-4 max-w-[930px] text-sm leading-6">Public Skills Australia is now engaging with CSAC to work through the implementation of the Report’s findings. Public Skills Australia will also be working to support the implementation of the Report’s findings which will assist the delivery of the Certificate III in Correctional Practice, including:</p>
          <ul className="mt-1 max-w-[930px] list-disc space-y-1 pl-6 text-sm leading-6">
            <li>Develop an Implementation Guide tailored to Certificate III in Correctional Practice, incorporating culturally appropriate learning and assessment guidance.</li>
            <li>Facilitate a series of events to foster national collaboration, build capacity and address implementation challenges previously identified.</li>
          </ul>
        </section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
