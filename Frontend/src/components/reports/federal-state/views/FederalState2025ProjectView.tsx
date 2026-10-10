"use client";

import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

interface Report {
  id: string;
  title: string;
  slug: string;
  status: string;
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: { label: string };
}

const projectData = [
  {
    title: "Auslan, Interpreting and Translating Qualification Review",
    intro: "In response to the 2023 Disability Royal Commission Final Report, Public Skills Australia has commenced a multiphase project to address the recommendation to improve access to Auslan language services. The aim of this project is to increase the number of Auslan interpreters and translators available to Federal and State/Territory Governments. This work supported the following strategic priorities:",
    sections: [
      { heading: "Ministerial Priority 2026", text: "The project will contribute to continuing to progress actions to consider and address barriers to participation in Auslan, interpreting and translating qualifications to support an increase in the number of qualified Auslan interpreters as identified in the final report from the Royal Commission into Violence, Abuse, Neglect and Exploitation of People with Disability." },
      { heading: "Public Skills Australia Strategic Plan", text: "Support industry-sectors through high-quality training products." },
      { heading: "Drivers of Change", text: "Challenges to workforce inclusivity." },
      { heading: "", text: "Following in-depth consultation with Deaf community members and training provider representatives, the resulting Auslan Interpreting and Translating Final Report identified a range of challenges in the design and implementation of the qualifications. The findings and recommendations from Phase One will be actioned in Phase Two to address these key challenges identified and update the qualifications in accordance with the Training Package Organising Framework. Phase Two will see the redesign of the Training Package." },
    ],
    stakeholders: ["Australian Sign Language Interpreters & Translators Association (ASLITA)", "Monash University", "Deaf Blind Australia", "National Accreditation Authority for Translators and Interpreters", "Deafness Council WA", "North Metropolitan TAFE", "Deaf Connect", "Professionals Australia - Translators and Interpreters Australia (TIA)", "Deakin University", "Queensland Government Department of Trade, Employment and Training", "Financial, Administrative and Professional Services Training Council", "Royal Melbourne Institute of Technology", "Melbourne Polytechnic", "TAFE NSW", "Members of the Deaf Community", "TAFE SA"],
  },
  {
    title: "Review of Government Investigations Qualifications",
    intro: "To ensure alignment with the Australian Government Investigation Standards (AGIS) 2022 and current operational practices, this project is reviewing three qualifications and a Skill Set in the Government Investigations stream of the PSP Public Sector Training Package.",
    sections: [
      { heading: "", text: "Public Skills Australia has engaged with stakeholders, published a Skills Review and completed training product reviews. The training products are due to be consulted with stakeholders in early 2026. As a result of extensive industry engagement, a series of recommendations have been determined for this project. The outcome is to ensure that the Government Investigations Qualification stream is updated to remain compliant with legislative requirements and support the capability needs of the public sector. This project is due for completion in December of 2026. Consultation for this project has been undertaken with the following stakeholders:" },
    ],
    stakeholders: ["Australian Federal Police", "Australian Public Service Commission", "Australian Skills Quality Authority", "Community and Public Sector Union", "Department of Defence", "Department of Education", "Department of Finance"],
  },
  {
    title: "Review of Procurement and Contracting Qualifications",
    intro: "The Procurement and Contracting stream of the PSP Public Sector Training Package has not been updated since 2016 and no longer meets the requirements of contemporary procurement and contracting roles. This project aims to address the gaps between good practice, current legislative requirements and existing qualifications. As part of this project, several additional qualifications in the PSP Public Sector Training Package will be updated to incorporate modern procurement practices, emerging skills needs and address implementation challenges.",
    sections: [
      { heading: "", text: "Public Skills Australia has published a Skills Review and has engaged with stakeholders to develop training products that the industry-sector requires. It has been identified that there are gaps in knowledge and skills requirements, and duplication of content across units of competency which will be consulted with stakeholders in early 2026. The intended outcome of this review is a contemporary qualification that can meet emerging capability requirements of the public sector. This project is due for completion in December of 2026. Consultation for this project has been undertaken with the following stakeholders:" },
    ],
    stakeholders: ["Australian Procurement and Construction Council", "Registered Training Organisations (RTOs)", "Australian Public Service Commission", "Relevant State and Territory Agencies", "Community and Public Sector Union", "Senior Responsible Officers (SROs)", "Department of Defence", "State and Territory Public Sector Commissions", "Federal Department of Finance", "State and Territory Training Authorities / Training Councils (STTAs)", "Public Service Association"],
  },
];

export default function FederalState2025ProjectView({ slug, report, pageType }: { slug: string; report: Report; pageType?: string }) {
  const projectNumber = Number(pageType?.match(/_(\d+)$/)?.[1] || 1);
  const project = projectData[projectNumber - 1] || projectData[0];

  return <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
    <ReportHeader slug={slug} report={report} currentPage="update_2025_strategies" />
    <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 px-4 py-5 sm:px-6 lg:px-8">
      <ReportNavButtons slug={slug} currentPage={pageType} prev={{ label: "BACK TO update on 2025 strategies", href: `/reports/${slug}/update_2025_strategies` }} next={{ label: "Existing Industry-Sector Strategies", href: `/reports/${slug}/existing_strategies` }} prevPrefix="" />
      <section className="rounded-md border border-[#ECECE5] bg-white px-5 py-6 animate-slide-up sm:px-6 sm:py-7"><span className="inline-flex max-w-full rounded-full bg-[#754D32] px-4 py-1.5 text-[11px] font-medium text-white">Proposal to Conduct a Cross-Jurisdictional Current and Future Skills Audit for the Public Sector</span><h1 className="mt-5 max-w-[960px] text-[30px] font-bold leading-tight sm:text-[38px]">{projectNumber}. {project.title}</h1><p className="mt-5 max-w-[850px] text-xs leading-6">{project.intro}</p></section>
      <div className="max-w-[1050px] space-y-5 pb-4 text-xs leading-6 animate-slide-up-delay">{project.sections.map(({ heading, text }, index) => <section key={index}>{heading && <h2 className="mb-2 text-sm font-bold">{heading}</h2>}<p>{text}</p></section>)}{projectNumber === 1 && <h2 className="text-sm font-bold">Consultation for this project has been undertaken with the following stakeholders:</h2>}<ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{project.stakeholders.map((name) => <li key={name} className="rounded-md bg-[#EDE9DF] px-4 py-3 text-[11px] font-medium text-[#694834]">{name}</li>)}</ul></div>
    </main>
    <ReportFooter contactUrl={report.contactUrl} reportName={report.title.replace(/\s*\b20\d{2}\b/g, "").trim()} />
  </div>;
}
