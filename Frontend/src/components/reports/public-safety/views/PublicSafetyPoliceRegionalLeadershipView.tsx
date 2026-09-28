import { MessagesSquare } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const headline = "Police officers being required to take on more leadership responsibilities earlier in their careers, particularly in regional, rural and remote areas, where workforce shortages are more pronounced. This may require more support in accelerating leadership skills development.";

const sources = [
  "J Rodgers and N Asquith, Safety and Security in Remote, Rural, and Regional Policing, International Journal of Rural Criminology, 2022, 7(1), 96–123.",
  "J Rodgers and N Asquith, Safety and Security in Remote, Rural, and Regional Policing, International Journal of Rural Criminology, 2022.",
  "Australian police workforce consultations and jurisdiction workforce publications, accessed November 2025.",
  "In Tasmania, the minimum tenure in non-metropolitan areas is two years. The New South Wales Police Force has incentives for police officers attached to positions in regional areas.",
];

export default function PublicSafetyPoliceRegionalLeadershipView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="police_regional_remote_leadership" navigation={{
    back: { label: "Police Workforce Insights", href: `/reports/${slug}/police_workforce_insights` },
    backSecondary: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
    prev: { label: "Workforce Insights", href: `/reports/${slug}/police_workforce_insights` },
    next: { label: "2026 Proposed Workforce Strategies", href: `/reports/${slug}/police_workforce_strategies` },
    prevPrefix: "Previous Section:", nextPrefix: "Next Section:",
  }}>
    <section className="rounded-xl border-l-[8px] border-l-[#1685A6] bg-[#E8F2F6] px-7 py-7"><div className="grid grid-cols-[44px_1fr] gap-4"><span className="text-[48px] font-light leading-none text-[#D3E5EB]">1</span><div><p className="text-xs font-medium text-[#1685A6]">Rural, Regional and Remote Police Leadership · Insight One</p><h1 className="mt-4 max-w-[980px] text-2xl font-bold leading-8 text-[#252D02]">{headline}</h1></div></div></section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-7"><h2 className="border-b border-[#E4E6E0] pb-4 text-2xl font-bold text-[#252D02]">Workforce shortages in regional, rural and remote communities</h2><p className="mt-6 text-sm leading-6 text-[#535862]">As a whole, police have experienced workforce shortages driven by two years of FTE reductions in the wake of the COVID-19 pandemic. Unlike the large patrols and more common metropolitan areas, regional, rural and remote communities rely on stations often deploying fewer than five officers, with some stations deploying only one or two officers.</p><p className="mt-4 text-sm leading-6 text-[#535862]">As such, the ripple effects of workforce shortages have a greater impact on regional, rural and remote communities where the loss of only one or two police officers equates to a large proportion of the operational capacity in these communities. Alongside workforce shortages, recruitment challenges can make it difficult for police jurisdictions to increase the number of officers deployed in these communities. Most police jurisdictions have established incentive programs to encourage regional, rural and remote placements, with industry consultation indicating that shortages in regional, rural and remote locations are persisting.</p>

      <h2 className="mt-8 border-b border-[#E4E6E0] pb-4 text-2xl font-bold text-[#252D02]">Earlier leadership responsibilities</h2><p className="mt-6 text-sm leading-6 text-[#535862]">Industry-sector consultation identified that these shortages, alongside wider demographic shifts and higher turnover in policing in recent years, have resulted in police officers being required to take on more leadership responsibilities earlier in their careers. This means that those police officers may not have the depth of experience to draw from when moving into these leadership roles and may require greater levels of support to accelerate the development of their leadership skills.</p>

      <aside className="mt-7 rounded-xl border-l-[8px] border-l-[#1685A6] bg-[#E8F2F6] px-7 py-6"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-white text-[#5E9328]"><MessagesSquare size={19}/></span><h3 className="text-lg font-bold text-[#252D02]">Industry Insight</h3></div><p className="mt-4 text-sm leading-6 text-[#535862]">{headline}</p></aside>
      <p className="mt-7 text-sm leading-6 text-[#535862]">Further industry consultation confirmed that, while this is an area that required more examination, there is no direct requirement for any training product development or implementation, promotion and monitoring activity.</p>
    </section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white p-7"><h2 className="text-2xl font-bold text-[#252D02]">Sources</h2><ol className="mt-5 space-y-3 text-xs leading-5 text-[#535862]">{sources.map((source, index) => <li key={`${index}-${source}`} className="grid grid-cols-[22px_1fr] gap-3"><span className="grid size-5 place-items-center rounded-full bg-[#7BC900] text-[9px] font-bold text-[#253100]">{index + 83}</span><span>{source}</span></li>)}</ol></section>
  </PublicSafetyPageShell>;
}
