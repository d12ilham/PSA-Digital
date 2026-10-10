import { Users } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const sources = [
  "UK Parliament, Research Briefing: The workforce, 14 November 2025.",
  "Ecorys, Forensic science and the criminal justice system, UK Parliament POSTnote, accessed November 2025.",
  "National Cyber Security Centre, Cyber security skills in the UK labour market, accessed November 2025.",
  "HM Inspectorate of Constabulary and Fire & Rescue Services, An inspection into how well the police and law enforcement tackle serious and organised crime, 2025.",
  "Forensic Capability Network, Digital forensics practitioner guidance, accessed November 2025.",
];

export default function PublicSafetyPoliceDigitalForensicsView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="police_digital_forensics" navigation={{
    back: { label: "Police Workforce Insights", href: `/reports/${slug}/police_workforce_insights` },
    backSecondary: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    prev: { label: "Workforce Insights", href: `/reports/${slug}/police_workforce_insights` },
    next: { label: "Digital Forensics · Insight Two", href: `/reports/${slug}/police_digital_forensics_2` },
    prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
  }}>
    <section className="rounded-xl border-l-[8px] border-l-[#8DB9CB] bg-[#E8F2F6] px-7 py-7">
      <div className="grid grid-cols-[44px_1fr] gap-4"><span className="text-[48px] font-light leading-none text-[#D3E5EB]">1</span><div><p className="text-xs font-medium text-[#5E9328]">Digital Forensics · Insight One</p><h1 className="mt-4 max-w-[940px] text-2xl font-bold leading-8 text-[#252D02]">Skills shortages and strong demand for similar skills may require the establishment of multiple entry pathways for digital forensic professionals into policing.</h1></div></div>
    </section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-7"><h2 className="border-b border-[#E4E6E0] pb-4 text-2xl font-bold text-[#252D02]">Demand for digital forensics</h2><p className="mt-6 text-sm leading-6 text-[#535862]">Broader digital transformation and the increasing adoption of technology means that evidence can be found on a growing array of devices, such as computer systems, mobile phones, cars, doorbells and dog collars. According to testimonial evidence in the United Kingdom, most criminal investigations now contain elements of digital evidence that require retrieval and examination by digital forensic experts, whether that be from computers, mobile phones, CCTV, GPS systems or other digital devices.</p><p className="mt-4 text-sm leading-6 text-[#535862]">Despite increased demand for digital forensics, there has not been a corresponding uplift in capability and coordination in this area. This has led to a substantial backlog of digital forensics work. Australian stakeholders indicated that digital forensics required to support contemporary investigations needs a different set of skills to other forensic fields and that demand continues to grow as technology becomes more deeply deployed, spans multiple jurisdictions and evolves at a rapid pace.</p></section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-7"><h2 className="border-b border-[#E4E6E0] pb-4 text-2xl font-bold text-[#252D02]">Three domains of digital forensic skills</h2><p className="mt-6 text-sm leading-6 text-[#535862]">Through consultations, it was identified that digital forensic skills required in policing cover three domains:</p><ul className="mt-3 space-y-3 pl-5 text-sm leading-6 text-[#535862]"><li className="list-disc"><strong>Foundation skills across policing:</strong> Police working on investigations involving digital evidence require an understanding of how data has been gathered, acquired and any limitations that data may have.</li><li className="list-disc"><strong>Core Digital Forensic Examiner Skills:</strong> Digital forensic examiners must have a core set of skills and be adaptable and focused on problem solving as they work with ever-changing digital environments.</li><li className="list-disc"><strong>Specialist Digital Forensics Roles:</strong> In addition to foundational and core digital examiner skills, consultation identified advanced specialist capabilities such as digital forensic programming, mobile device forensics, cloud and network forensics and technical quality assurance.</li></ul></section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-7"><h2 className="border-b border-[#E4E6E0] pb-4 text-2xl font-bold text-[#252D02]">Skills shortages and entry pathways</h2><p className="mt-6 text-sm leading-6 text-[#535862]">Cyber Security Professionals, including digital forensic specialists, are experiencing sustained demand, with employment in this group projected to grow strongly. Competition for people with these specialist skills is significant across government and industry.</p><p className="mt-4 text-sm leading-6 text-[#535862]">Persistent shortages and the need to build capability across jurisdictions indicate that multiple entry pathways may be required. These may include police-led development, vocational education and training, higher education, lateral entry and targeted pathways for experienced technology professionals.</p></section>

    <aside className="rounded-xl border-l-[8px] border-l-[#1685A6] bg-[#E8F2F6] px-7 py-6"><div className="flex items-center gap-3 text-[#5E9328]"><span className="grid size-9 place-items-center rounded-full bg-white"><Users size={18}/></span><h2 className="text-lg font-bold text-[#252D02]">Industry Insight</h2></div><p className="mt-4 text-sm leading-6 text-[#535862]">Skills shortages and strong demand for similar skills may require the establishment of multiple entry pathways for digital forensic professionals into policing.</p></aside>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-7"><h2 className="text-2xl font-bold text-[#252D02]">Sources</h2><ol className="mt-5 space-y-3 text-xs leading-5 text-[#535862]">{sources.map((source, index) => <li key={source} className="grid grid-cols-[22px_1fr] gap-3"><span className="grid size-5 place-items-center rounded-full bg-[#7BC900] text-[9px] font-bold text-[#253100]">{index + 87}</span><span>{source}</span></li>)}</ol></section>
  </PublicSafetyPageShell>;
}
