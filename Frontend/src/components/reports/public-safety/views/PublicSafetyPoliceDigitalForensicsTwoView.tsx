import { MessagesSquare } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const sources = [
  "Forensic Capability Network (FCN), Second cohort of digital forensic apprentices begin work, FCN website, 2024, accessed 18 November 2025.",
  "Forensic Capability Network (FCN), Second cohort of digital forensic apprentices begin work, FCN website, 2024, accessed 18 November 2025.",
  "Winston Churchill Trust, To research international digital forensics strategies to inform future operating models, Winston Churchill Memorial Trust, 2023, accessed 20 November 2025.",
];

export default function PublicSafetyPoliceDigitalForensicsTwoView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="police_digital_forensics_2" navigation={{
    back: { label: "Police Workforce Insights", href: `/reports/${slug}/police_workforce_insights` },
    backSecondary: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    prev: { label: "Digital Forensics · Insight One", href: `/reports/${slug}/police_digital_forensics` },
    next: { label: "Rural, Regional and Remote Police Leadership", href: `/reports/${slug}/police_regional_remote_leadership` },
    prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
  }}>
    <section className="rounded-xl border-l-[8px] border-l-[#1685A6] bg-[#E8F2F6] px-7 py-7"><div className="grid grid-cols-[44px_1fr] gap-4"><span className="text-[48px] font-light leading-none text-[#D3E5EB]">2</span><div><p className="text-xs font-medium text-[#5E9328]">Digital Forensics · Insight Two</p><h1 className="mt-4 max-w-[960px] text-2xl font-bold leading-8 text-[#252D02]">The VET system is well established to deliver a nationally consistent approach to training, however, the Police Training Package currently does not contain a qualification specialising in digital forensics.</h1></div></div></section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-7"><h2 className="border-b border-[#E4E6E0] pb-4 text-2xl font-bold text-[#252D02]">The POL Police Training Package</h2><p className="mt-6 text-sm leading-6 text-[#535862]">Internationally, alternative pathways include paid internships for ex-defence personnel with digital forensics training and apprenticeship schemes offering a pathway into digital forensics.<sup>80</sup> Establishing career pathways also needs consideration in workforce planning to retain younger cohorts in digital forensics roles.<sup>81</sup></p><p className="mt-4 text-sm leading-6 text-[#535862]">Stakeholder consultation identified that the POL Police Training Package could be leveraged to develop much needed digital forensics skills. Internationally, a lack of consistency in digital forensics training has been identified as a risk to both the efficiency and quality of digital forensic investigations. Developing training products through the VET system will provide police nationally consistent, industry-endorsed skills standards that will support mitigating the risks encountered internationally.</p><p className="mt-4 text-sm leading-6 text-[#535862]">Additionally, these skills could be developed to cover general duties police officers right through to digital forensic specialist roles, ensuring police can develop consistent skills for handling digital forensics evidence.<sup>82</sup></p>
      <aside className="mt-7 rounded-xl border-l-[8px] border-l-[#1685A6] bg-[#E8F2F6] px-7 py-6"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-white text-[#5E9328]"><MessagesSquare size={19}/></span><h3 className="text-lg font-bold text-[#252D02]">Industry Insight</h3></div><p className="mt-4 text-sm leading-6 text-[#535862]">The VET system is well established to deliver a nationally consistent approach to training, however, the Police Training Package currently does not contain a qualification specialising in digital forensics.</p></aside>
    </section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-7"><h2 className="text-2xl font-bold text-[#252D02]">Sources</h2><ol className="mt-5 space-y-3 text-xs leading-5 text-[#535862]">{sources.map((source, index) => <li key={index} className="grid grid-cols-[22px_1fr] gap-3"><span className="grid size-5 place-items-center rounded-full bg-[#7BC900] text-[9px] font-bold text-[#253100]">{index + 80}</span><span>{source}</span></li>)}</ol></section>
  </PublicSafetyPageShell>;
}
