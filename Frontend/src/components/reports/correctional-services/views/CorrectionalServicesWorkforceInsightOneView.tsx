"use client";

import Image from "next/image";
import { BriefcaseBusiness, MessageSquareText, UserRound } from "lucide-react";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type Report = {
  contactUrl?: string;
  pdfFileUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

function IndustryInsight({ children }: { children: React.ReactNode }) {
  return (
    <aside className="rounded-[14px] border-l-[12px] border-[#9DA8D0] bg-[#E8E9EF] p-6 text-[#535862]">
      <div className="flex items-center gap-4">
        <span className="relative grid size-[70px] shrink-0 place-items-center rounded-full bg-white text-[#424996]">
          <UserRound size={27} strokeWidth={1.5} aria-hidden="true" />
          <MessageSquareText size={19} strokeWidth={1.5} className="absolute right-3 top-2" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-semibold text-[#252D02]">Industry Insight</h3>
      </div>
      <p className="mt-4 text-sm leading-6">{children}</p>
    </aside>
  );
}

export default function CorrectionalServicesWorkforceInsightOneView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="workforce_insights" />
      <main className="mx-auto w-full max-w-[1504px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="workforce_insights"
          prev={{ label: "Workforce Insights", href: `/reports/${slug}/workforce_insights_2026` }}
          next={{ label: "Theme 1 – Insight 2", href: `/reports/${slug}/workforce_insights_specialisations` }}
          prevPrefix=""
          nextPrefix=""
        />

        <section className="rounded-[14px] border border-[#E9EAEB] bg-white p-6">
          <div className="flex min-h-[270px] flex-col gap-6 rounded-[14px] border-l-[12px] border-[#424996] bg-[#E8E9EF] px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 gap-5">
              <span className="shrink-0 text-5xl font-light leading-none text-[#C8CCDF]">1</span>
              <div className="max-w-[850px] animate-slide-up motion-reduce:animate-none">
                <p className="text-sm font-medium text-[#424996]">Theme One, Insight One</p>
                <h1 className="mt-5 text-2xl font-semibold leading-8">Community corrections roles require dynamic skills and are focused on rehabilitation and reintegration back into a community</h1>
              </div>
            </div>
            <div className="grid size-[180px] shrink-0 place-items-center self-center rounded-full bg-white xl:size-[220px]" aria-hidden="true">
              <span className="relative block size-full overflow-hidden rounded-full">
                <Image src="/images/reports/correctional-workforce-insights-frame-436.svg" width={480} height={140} alt="" style={{ width: "342.857%", height: "100%", filter: "contrast(1.08) brightness(1.04)" }} className="absolute left-0 top-0 max-w-none animate-zoom-in motion-reduce:animate-none" />
              </span>
            </div>
          </div>
        </section>

        <section className="grid items-center gap-6 rounded-[14px] border border-[#E9EAEB] bg-white p-6 lg:grid-cols-[minmax(0,1fr)_72px]">
          <div>
            <h2 className="text-2xl font-semibold">The Role of a Community Corrections Officer (CCO)</h2>
            <div className="mt-5 max-w-[850px] space-y-5 text-sm leading-6">
              <p>The role of CCOs is to assess and manage risk, monitor compliance with legal conditions (such as bail, parole and sentencing requirements) and respond to breaches of such conditions. CCOs provide case management and risk assessment of people who are serving a sentence (custodial and non-custodial) and assist in the transition and reintegration of offenders from custodial settings back into the community. They support behavioural change and seek to reduce the likelihood of reoffending.</p>
              <p>Through research and consultation, Public Skills Australia identified several distinct challenges that have implications for the workforce and training specific to CCOs across jurisdictions within the Correctional Services industry-sector.</p>
            </div>
          </div>
          <span className="order-first grid size-[72px] place-items-center rounded-full bg-[#EDEDF5] text-[#424996] lg:order-last"><BriefcaseBusiness size={38} strokeWidth={1.5} aria-hidden="true" /></span>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[14px] border border-[#E9EAEB] bg-white p-6">
            <h2 className="text-2xl font-semibold leading-8 text-[#424996]">A. Entry Level Training and Specialisations for Community Corrections Officers</h2>
            <p className="mt-4 text-sm leading-6 text-[#535862]">Stakeholders noted challenges in accessing appropriate skills specialisations through the Certificate III in Correctional Practice for CCOs. These skills are captured in Adult and Youth Community Specialisations across both Certificate III and Certificate IV. However, consultations and data verified that organisations are electing to train CCOs through the Certificate IV in Correctional Practice rather than the Certificate III (due to specialisation units of competency in the Certificate III not providing the sufficient complex knowledge required for the role). In some jurisdictions, stakeholders reported that the skills possessed by CCOs are also becoming increasingly valued in the custodial environment for COs.<sup><a className="text-[#424996] hover:underline" href="#correctional-workforce-source-19">19</a></sup></p>
          </section>
          <IndustryInsight>Community corrections roles require dynamic skills and are focused on rehabilitation and reintegration back into a community. This means that CCOs require the capability to support the reduction of recidivism and enable rehabilitation.</IndustryInsight>
        </div>

        <section className="rounded-[14px] border border-[#E9EAEB] bg-white p-6">
          <h2 className="text-2xl font-semibold text-[#424996]">B. Career progression-related training</h2>
          <div className="mt-4 max-w-[850px] space-y-4 text-sm leading-6 text-[#535862]">
            <p>Career progression for CCOs and challenges in accompanying training was also highlighted as a significant challenge. As CCOs advance through the different government grades (or salary bands), with each level bringing greater complexity and responsibilities within their roles, stakeholders indicated that this progression often did not correspond with accredited skills development.</p>
            <p>Consequently, most CCOs undertook further non-accredited training to augment their skill base in line with the increasing demands of their work duties. For management training especially, CCOs (and managers in the custodial systems) frequently returned to VET training to gain the necessary managerial qualifications at a higher Australian Qualification Framework (AQF) level in the Correctional Services Training Package.<sup><a className="text-[#424996] hover:underline" href="#correctional-workforce-source-20">20</a></sup></p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[14px] border border-[#E9EAEB] bg-white p-6">
            <h2 className="text-2xl font-semibold text-[#424996]">C. In-sector transition</h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-[#535862]">
              <p>Consultation with the Correctional Services industry-sector revealed that while transitions from community corrections to custodial roles were relatively uncommon, there were successful examples of COs transitioning to community corrections roles. Stakeholders reported anecdotal examples of employees shifting from CO roles to CCO positions, often after injury and as part of support for employee return-to-work plans.</p>
              <p>COs who move into community corrections bring valuable experience in managing offenders within the custodial environment, and this background is viewed as a strong foundation for case management roles. However, this potential pipeline from CO to CCO roles is often constrained by the recruitment requirement for higher education qualifications, which may impact the eligibility for COs to apply.</p>
            </div>
          </section>
          <IndustryInsight>Consultations with the Correctional Services industry-sector indicated anecdotal examples of employees transitioning from CO roles to CCO roles, often after injury and as part of support for employee return-to-work plans. However, this pipeline into CCO roles is often limited by the recruitment requirement for higher education qualifications, which may impact the eligibility of COs to apply.</IndustryInsight>
        </div>

        <section className="rounded-[14px] border border-[#E9EAEB] bg-white p-6">
          <h2 className="text-2xl font-semibold text-[#424996]">D. Regional recruitment</h2>
          <div className="mt-4 max-w-[850px] space-y-4 text-sm leading-6 text-[#535862]">
            <p>Alongside training challenges are a shortage of CCOs in regional and rural areas. Stakeholders have reported challenges in formulating job packages to attract recruitment outside metropolitan areas, especially given that regional locations vary in their appeal to potential recruits. Moreover, community correctional work in such areas often involves long-distance travel to remote districts, which makes it harder to attract potential recruits.</p>
            <p>These distinctive characteristics of community corrections work underscores the need for workforce planning and qualification design that recognises the context-specific capability requirements across the corrections system from the custodial to community levels in regional settings.</p>
          </div>
        </section>

        <section aria-labelledby="correctional-workforce-sources-heading" className="rounded-[14px] border border-[#E9EAEB] bg-white p-6">
          <h2 id="correctional-workforce-sources-heading" className="text-2xl font-semibold">Sources</h2>
          <ol className="mt-5 space-y-3 text-sm leading-6">
            <li id="correctional-workforce-source-19" className="flex scroll-mt-24 gap-3"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#598303] text-xs font-semibold text-white">19</span><span>Victorian Government, <em>Correctional Practice Framework</em>, Victorian Government, 2024. The refreshed framework better aligns with the work of community and custodial corrections following the 2023 Cultural Review into Adult Custodial Practices.</span></li>
            <li id="correctional-workforce-source-20" className="flex scroll-mt-24 gap-3"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#598303] text-xs font-semibold text-white">20</span><span>Including the Diploma of Correctional Administration and the Advanced Diploma of Correctional Management.</span></li>
          </ol>
        </section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
