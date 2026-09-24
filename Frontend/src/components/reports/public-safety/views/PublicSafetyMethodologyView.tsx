import Image from "next/image";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const governanceSteps = [
  {
    step: "STEP 1",
    title: "Public Safety Subcommittee",
    paragraphs: [
      "The Subcommittee is responsible for recommending this report to the Industry Advisory Group (IAG) for endorsement.",
      "This recommendation is made on the basis that the Subcommittee is satisfied that sufficient consultation and engagement has been undertaken, and that consultation feedback was appropriately actioned.",
    ],
  },
  {
    step: "STEP 2",
    title: "Industry Advisory Group",
    paragraphs: [
      "The IAG is responsible for endorsing this report to the Public Skills Australia Board for approval to be submitted to the DEWR.",
      "This endorsement is made on the basis that the IAG is satisfied with the Public Safety Subcommittee's recommendation for endorsement. The IAG further provides its strategic guidance and endorsement if comfortable that the strategic priorities of Public Safety and Government industry-sectors are also captured.",
    ],
  },
  {
    step: "STEP 3",
    title: "Public Skills Australia Board",
    paragraphs: [
      "The Public Skills Australia Board (the Board) is responsible to approve the submission of the report to DEWR.",
      "This approval is made on the basis that the Board is satisfied that an appropriate development and consultation process was followed and that the report has been progressed in line with the internal governance requirements of Public Skills Australia.",
    ],
  },
] as const;

const primarySources = [
  "Jobs and Skills Australia (JSA)",
  "Australian Bureau of Statistics (ABS)",
  "National Centre for Vocational Education Research (NCVER)",
  "Other supporting online sources",
] as const;

const supportingSources = [
  "Government reports and documents",
  "Online sources",
  "Annual reports",
  "Departmental documentation",
  "Legislation",
  "Research articles",
  "Relevant Royal Commission Reports",
] as const;

export default function PublicSafetyMethodologyView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return (
    <PublicSafetyPageShell slug={slug} report={report} currentPage="methodology">
      <section className="h-[446px] rounded-2xl border border-[#E9EAEB] bg-white p-6">
        <div className="grid h-[398px] gap-[60px] lg:grid-cols-[800px_532px]">
          <div>
            <h1 className="text-[40px] font-bold leading-[54px] text-[#252D02]">Methodology</h1>
            <p className="mt-4 text-sm leading-6 text-[#535862]">
              Public Skills Australia&apos;s Workforce Insights Reports are developed using a combination of qualitative and quantitative data obtained from primary and secondary sources. This 2026 Public Safety Workforce Insights Report is supported by data obtained through stakeholder consultations and engagements.
            </p>
            <p className="mt-4 text-sm leading-6 text-[#535862]">
              These consultations were used to gain insight into challenges each industry-sector is facing with the development and maintenance of a skilled workforce. The challenges identified through consultations were thematically analysed to identify trends and priority areas to address for each industry-sector. Following these consultations, Public Skills Australia conducted secondary qualitative and quantitative research to verify the challenges raised. Additional targeted consultations with senior stakeholders were held to further validate workforce challenges and identify related industry insights. Specific to the Public Safety industry-sectors, and in alignment with the tripartite approach for Jobs and Skills Councils (JSCs), consultations were held with employers, employee bodies and Government organisations, both in-person and through online meetings, workshops and presentations. Drafts were subsequently progressed through Public Skills Australia&apos;s governance process that includes:
            </p>
          </div>

          <aside className="relative h-[252px] overflow-hidden rounded-[14px] border border-[#E9EAEB] bg-[#F0F5DF] p-10">
            <span className="absolute inset-y-0 left-0 w-2 bg-[#598303]" />
            <h2 className="text-base font-bold uppercase leading-7 text-[#252D02]">Acknowledgement</h2>
            <p className="mt-6 text-sm leading-6 text-[#535862]">
              Public Skills Australia thanks the contributors, including industry representatives, its Board and governance group representatives, the Department of Employment and Workplace Relations (DEWR) and Jobs and Skills Australia (JSA) for sharing their views and data generously, and supporting the development of this Report.
            </p>
          </aside>
        </div>
      </section>

      <section className="space-y-6">
        <div className="h-[49px] border-b border-[#D5D7DA]">
          <h2 className="text-2xl font-bold leading-8 text-[#252D02]">Governance Process</h2>
        </div>

        <div className="h-[416px] rounded-[14px] border border-[#E9EAEB] bg-white p-6">
          <div className="grid h-[368px] gap-5 lg:grid-cols-3">
            {governanceSteps.map((item) => (
              <article key={item.step} className="rounded-lg bg-[#F0F5DF] p-8">
                <span className="block text-xs font-medium leading-6 text-[#046D2A]">{item.step}</span>
                <h3 className="mt-5 text-base font-bold leading-7 text-[#252D02]">{item.title}</h3>
                <div className="mt-2 space-y-2 text-sm leading-6 text-[#535862]">
                  {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </article>
            ))}
          </div>
        </div>

        <article className="h-[416px] rounded-[14px] border border-[#E9EAEB] bg-white p-6">
          <div className="flex h-[368px] items-start gap-6">
            <Image src="/images/reports/methodology/Data-sources.svg" alt="" width={100} height={100} className="h-[100px] w-[100px] shrink-0" />
            <div className="h-full w-full max-w-[1268px]">
              <h2 className="text-base font-bold leading-7 text-[#252D02]">Data sources</h2>
              <div className="mt-3 flex max-w-[800px] flex-wrap gap-1">
                {primarySources.map((source) => <span key={source} className="rounded-full bg-[#F0F5DF] px-3 py-1 text-[10px] font-semibold leading-[18px] text-[#598303]">{source}</span>)}
              </div>
              <p className="mt-3 max-w-[800px] text-sm leading-6 text-[#535862]">
                The report uses publicly available datasets accessible from Jobs and Skills Australia (JSA), the Australian Bureau of Statistics (ABS), the National Centre for Vocational Education Research (NCVER) and other supporting online sources. Due to the complexity of large-scale workforce data, no single source provides an accurate or complete picture. Therefore, multiple data sources are used to provide the most accurate representation of the workforce as possible, supported by qualitative research (including interviews with stakeholders). This report prioritises the data source, or combination of data sources, that provide the most accurate representation of the workforce possible. This research was bolstered by literature reviews of government reports and documents, online sources, annual reports, departmental documentation, legislation, research articles and relevant Royal Commission Reports.
              </p>
              <div className="mt-3 flex max-w-[800px] flex-wrap gap-1">
                {supportingSources.map((source, index) => <span key={source} className={`rounded-full px-3 py-1 text-[10px] font-semibold leading-[18px] ${index < 4 ? "bg-[#F0F5DF] text-[#598303]" : "border border-[#E9EAEB] bg-white text-[#414651]"}`}>{source}</span>)}
              </div>
            </div>
          </div>
        </article>
      </section>
    </PublicSafetyPageShell>
  );
}
