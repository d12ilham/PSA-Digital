"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, ClipboardList, FileSearch, Landmark, Network, Settings } from "lucide-react";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
const strategies = [
    { owner: "Department of Home Affairs", title: "National Disaster Risk Reduction Framework", period: "Department of Home Affairs 2018–2030" },
    { owner: "National Emergency Management Organisation (NEMA)", title: "Australian Disaster Recovery Framework", period: "National Emergency Management Agency" },
    { owner: "Australasian Fire and Emergency Services Authorities Council (AFAC)", title: "AFAC Strategic Plan 2023–2027", period: "AFAC 2023–2027" },
    { owner: "Volunteering Australia", title: "National Strategy for Volunteering 2023–2033", period: "Volunteering Australia 2023–2033" },
    { owner: "Champions of Change Coalition – Fire and Emergency Group", title: "Champions of Change Coalition – Fire and Emergency", period: "Champions of Change Coalition" },
];

function AustralianDisasterRecoveryDetail() {
    return <section className="rounded-xl bg-[#EEF0E7] p-5 lg:ml-[320px] lg:mt-[-598px]">
        <div className="rounded-lg bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-xl font-bold text-[#252D02]">Australian Disaster Recovery Framework</h2><span className="rounded-full bg-[#EEF0E7] px-4 py-2 text-[10px] text-[#535862]">National Emergency Management Organisation (NEMA) 2022 – ongoing</span></div>
            <div className="mt-6 text-xs leading-5 text-[#535862]"><strong className="mb-2 block uppercase text-[#719926]">Summary</strong><p>This framework provides a practical and comprehensive description of disaster recovery context, governance, doctrine and policy. Although each state and territory in Australia has their own disaster recovery policies, the framework provides a common understanding for how disaster recovery can be undertaken.</p><p className="mt-4">The framework further supports recovery activities for all individuals that may be involved in recovery, including practitioners or leaders at all levels of government, private companies, community personnel and charities. As the stewards of the framework, NEMA will review the framework periodically as required.</p></div>
            <h3 className="mt-7 text-xs font-bold text-[#719926]">How this informs Public Skills Australia&apos;s work</h3>
            <div className="mt-4 space-y-4"><div className="rounded-lg border-l-[7px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5"><strong className="text-sm text-[#252D02]">Consultation and engagement:</strong><p className="mt-2 text-xs leading-5 text-[#535862]">Provided context and guidance on the Australian Government&apos;s current approach to disaster recovery, informing consultation with Fire and Emergency Services stakeholders.</p></div><div className="rounded-lg border-l-[7px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5"><strong className="text-sm text-[#252D02]">2025 Workforce Strategies</strong><p className="mt-2 text-xs leading-5 text-[#535862]">The National Recovery Principles in this framework outline the context, complexity and approaches to disaster recovery that underpin successful recovery. These principles informed the development of the Volunteer Leadership Project.</p></div><div className="rounded-lg border-l-[7px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5"><strong className="text-sm text-[#252D02]">2026 Workforce Strategies</strong><p className="mt-2 text-xs leading-5 text-[#535862]">Support uptake of disaster recovery training products will be informed and guided by section 3.7 Recovery training, which provides context and principles for the project.</p></div></div>
        </div>
    </section>;
}

function AfacStrategicPlanDetail({ onNext }: { onNext: () => void }) {
    return <section className="rounded-xl bg-[#EEF0E7] p-5 lg:ml-[320px] lg:mt-[-598px]">
        <div className="mb-5 flex items-center justify-between gap-4">
            <span className="rounded-full bg-[#D95222] px-4 py-2 text-[10px] font-bold uppercase text-white">03 · Australasian Fire and Emergency Services Authorities Council (AFAC)</span>
            <button type="button" onClick={onNext} className="inline-flex h-9 items-center gap-2 rounded-full bg-[#7BC900] px-4 text-xs font-semibold text-[#253100]">Next<ArrowRight size={14}/></button>
        </div>
        <div className="rounded-lg bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-[#252D02]">AFAC Strategic Plan 2023–2027</h2>
                <span className="rounded-full bg-[#EEF0E7] px-4 py-2 text-[10px] text-[#535862]">Australasian Fire and Emergency Services Authorities Council (AFAC) 2023–2027</span>
            </div>
            <div className="mt-6 text-xs leading-5 text-[#535862]">
                <strong className="mb-2 block uppercase text-[#719926]">Summary</strong>
                <p>The AFAC Strategic Plan 2023–2027 guides Fire and Emergency Services across Australia and New Zealand to strengthen community safety and resilience by fostering collaboration, innovation, strong governance and workforce capability. AFAC&apos;s strategy is underpinned by six strategic directions:</p>
                <ul className="ml-5 mt-2 list-disc space-y-1">
                    <li>Supporting resilient communities through risk reduction</li>
                    <li>Providing a trusted response</li>
                    <li>Using credible and timely information and data</li>
                    <li>Safe, capable and diverse workforce</li>
                    <li>Informed by knowledge, innovation and research</li>
                    <li>Effective and transparent governance</li>
                </ul>
                <p className="mt-4">As part of its commitment to the strategic directions, AFAC provides an annual Strategic Directions Achievement Report. The 2025 edition provides five examples from different organisations against each strategic direction that highlight how they have been performed across the 12-month reporting period.</p>
            </div>
            <h3 className="mt-7 text-xs font-bold text-[#719926]">How this informs Public Skills Australia&apos;s work</h3>
            <div className="mt-4 space-y-4">
                <div className="rounded-lg border-l-[7px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5">
                    <strong className="text-sm text-[#252D02]">Consultation and engagement:</strong>
                    <p className="mt-2 text-xs leading-5 text-[#535862]">Provided guidance on how Australian Fire and Emergency Services organisations collaborate and innovate, informing consultation with Fire and Emergency Services stakeholders.</p>
                </div>
                <div className="rounded-lg border-l-[7px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5">
                    <strong className="text-sm text-[#252D02]">2025 Workforce Strategies</strong>
                    <p className="mt-2 text-xs leading-5 text-[#535862]">Informed the development of:</p>
                    <ul className="ml-5 mt-2 list-disc text-xs leading-5 text-[#535862]">
                        <li>Emergency Tree Operations</li>
                        <li>Volunteer Leadership Project</li>
                        <li>Understanding the Youth Volunteer</li>
                        <li>Complex Infrastructure Training Needs Analysis</li>
                        <li>Emerging Technologies Skills Review</li>
                    </ul>
                    <p className="mt-2 text-xs leading-5 text-[#535862]">Collectively, the span of 2025 Workforce Strategies are substantively informed by Strategic Direction 4 – Safe, capable and diverse workforce. This Strategic Direction aims to ensure that the Fire and Emergency Services workforce, inclusive of its paid employees and volunteers, maintain the requisite current and emerging skills and knowledge.</p>
                </div>
                <div className="rounded-lg border-l-[7px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5">
                    <strong className="text-sm text-[#252D02]">2026 Workforce Strategies</strong>
                    <p className="mt-2 text-xs leading-5 text-[#535862]">All three proposed Fire and Emergency Services strategies will be guided by AFAC National Council&apos;s Strategic Directions, especially Direction 1 – Supporting resilient communities through risk reduction and Direction 4 – Safe, capable and diverse workforce, which provides specific guidance for workforce planning strategies.</p>
                </div>
            </div>
        </div>
    </section>;
}

function VolunteeringStrategyDetail({ onNext }: { onNext: () => void }) {
    return <section className="rounded-xl bg-[#EEF0E7] p-5 lg:ml-[320px] lg:mt-[-598px]">
        <div className="mb-5 flex items-center justify-between gap-4">
            <span className="rounded-full bg-[#D95222] px-4 py-2 text-[10px] font-bold uppercase text-white">04 · Volunteering Australia</span>
            <button type="button" onClick={onNext} className="inline-flex h-9 items-center gap-2 rounded-full bg-[#7BC900] px-4 text-xs font-semibold text-[#253100]">Next<ArrowRight size={14}/></button>
        </div>
        <div className="rounded-lg bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-[#252D02]">National Strategy for Volunteering 2023–2033</h2>
                <span className="rounded-full bg-[#EEF0E7] px-4 py-2 text-[10px] text-[#535862]">Volunteering Australia 2023–2033</span>
            </div>
            <div className="mt-6 text-xs leading-5 text-[#535862]">
                <strong className="mb-2 block uppercase text-[#719926]">Summary</strong>
                <p>The National Strategy for Volunteering 2023–2033 is a 10-year national blueprint co-designed with the volunteering ecosystem to strengthen and sustain volunteering in Australia.</p>
                <p className="mt-2">The strategy includes 11 strategic objectives across three focus areas:</p>
                <ul className="ml-5 mt-2 list-disc space-y-1">
                    <li>Individual potential and the volunteer experience</li>
                    <li>Community and social impact</li>
                    <li>Conditions for volunteering to thrive</li>
                </ul>
                <p className="mt-4">The strategy is accompanied by the Action Plan 2024–2027, the first three-year plan setting out co-designed actions aimed at addressing the implementation of the strategy.</p>
                <p className="mt-2">Additionally, the Monitoring and Evaluation Framework will be utilised to measure the progress of the action plan and strategy, against measurable outcomes.</p>
            </div>
            <h3 className="mt-7 text-xs font-bold text-[#719926]">How this informs Public Skills Australia&apos;s work</h3>
            <div className="mt-4 space-y-4">
                <div className="rounded-lg border-l-[7px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5">
                    <strong className="text-sm text-[#252D02]">Consultation and engagement:</strong>
                    <p className="mt-2 text-xs leading-5 text-[#535862]">Provided context and guidance on future-proofing Australia&apos;s volunteer workforce, informing consultation with Fire and Emergency Services stakeholders.</p>
                </div>
                <div className="rounded-lg border-l-[7px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5">
                    <strong className="text-sm text-[#252D02]">2025 Workforce Strategies</strong>
                    <p className="mt-2 text-xs leading-5 text-[#535862]">Informed the development of:</p>
                    <ul className="ml-5 mt-2 list-disc text-xs leading-5 text-[#535862]">
                        <li>Volunteer Leadership Project</li>
                        <li>Understanding the Youth Volunteer</li>
                    </ul>
                    <p className="mt-2 text-xs leading-5 text-[#535862]">Specifically, the Volunteer Leadership Project is informed by Strategic Objective 3.4 Recognise the Importance of Volunteer Management. The Understanding the Youth Volunteer Project is informed by Strategic Objective 1.2 Make Volunteering Inclusive and Accessible.</p>
                </div>
                <div className="rounded-lg border-l-[7px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5">
                    <strong className="text-sm text-[#252D02]">2026 Workforce Strategies</strong>
                    <p className="mt-2 text-xs leading-5 text-[#535862]">Review First Aid Units of Competency for Surf Life Saving in the Certificate III in Public Safety (Aquatic Rescue) will be informed by Strategic Objectives 1.2 Make Volunteering Inclusive and Accessible and 2.3 Recognise the Inherent Value of Volunteering.</p>
                </div>
            </div>
        </div>
    </section>;
}
export default function PublicSafetyFesExistingStrategiesView({ slug, report }: {
    slug: string;
    report: PublicSafetyReport;
}) {
    const [active, setActive] = useState(0);
    const strategy = strategies[active];
    const showStrategy = (index: number) => setActive((index + strategies.length) % strategies.length);
    return <PublicSafetyPageShell slug={slug} report={report} currentPage="fes_existing_strategies" navigation={{ back: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` }, backSecondary: { label: "Fire and Emergency Services chapter", href: `/reports/${slug}/fes` }, prev: { label: "2025 Strategy Updates", href: `/reports/${slug}/fes_update_2025_strategies` }, next: { label: "Disaster Recovery Training Products (Appendix B)", href: `/reports/${slug}/fes_disaster_recovery_training_products` }, prevPrefix: "Previous Section:", nextPrefix: "Next Section:" }}>
    <section className="relative min-h-[205px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white px-6 py-8 lg:px-8"><div className="relative z-10 max-w-[850px]"><span className="inline-flex rounded-full bg-[#D95222] px-4 py-1.5 text-[10px] font-bold uppercase text-white">FES · Industry-Sector Analysis</span><h1 className="mt-5 text-[40px] font-bold leading-[48px] text-[#252D02]">Existing Industry-Sector Strategies</h1><p className="mt-4 text-xs leading-5 text-[#535862]">Select a strategy to open its detail and how it informs Public Skills Australia&apos;s work.</p></div><div className="absolute right-8 top-7 hidden h-[150px] w-[370px] lg:block"><span className="absolute left-0 top-20 grid size-12 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Settings size={22}/></span><span className="absolute left-16 top-5 grid size-12 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Network size={22}/></span><span className="absolute left-[125px] top-20 grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><ClipboardList size={26}/></span><span className="absolute left-[190px] top-6 grid size-16 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><Landmark size={29}/></span><span className="absolute right-16 top-20 grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><BriefcaseBusiness size={25}/></span><span className="absolute right-0 top-5 grid size-14 place-items-center rounded-full bg-[#F2F5E9] text-[#719926]"><FileSearch size={25}/></span></div></section>

    <section className="grid items-start gap-5 lg:grid-cols-[300px_1fr]"><aside><h2 className="mb-3 text-lg font-bold uppercase text-[#252D02]">Strategies · 5 · Select to open</h2><div className="space-y-3">{strategies.map((item, index) => <button key={item.title} type="button" onClick={() => setActive(index)} className={`flex min-h-[102px] w-full items-center justify-between gap-4 rounded-lg border px-5 py-4 text-left ${active === index ? "border-[#D95222] !bg-[#FBECE7] shadow-[inset_0_0_0_1px_#D95222] hover:!bg-[#FBECE7] focus:!bg-[#FBECE7]" : "border-[#E9EAEB] bg-white hover:bg-[#F7F8F2]"}`}><span><span className="block text-[9px] font-medium uppercase leading-4 text-[#D95222]">0{index + 1} · {item.owner}</span><strong className="mt-3 block text-sm leading-5 text-[#252D02]">{item.title}</strong></span><span className={`grid size-9 shrink-0 place-items-center rounded-full ${active === index ? "bg-white text-[#719926]" : "bg-[#7BC900] text-[#253100]"}`}><ArrowRight size={15}/></span></button>)}</div></aside><article className="rounded-xl bg-[#EEF0E7] p-5"><div className="flex items-center justify-between gap-4"><span className="rounded-full bg-[#D95222] px-4 py-2 text-[10px] font-bold uppercase text-white">0{active + 1} · {strategy.owner}</span><div className="flex gap-2"><button type="button" aria-label="Previous strategy" onClick={() => showStrategy(active - 1)} className="grid size-9 place-items-center rounded-full border border-[#C5CBB6] bg-white text-[#5D791B]"><ArrowLeft size={15}/></button><button type="button" onClick={() => showStrategy(active + 1)} className="inline-flex h-9 items-center gap-2 rounded-full bg-[#7BC900] px-4 text-xs font-semibold text-[#253100]">Next<ArrowRight size={14}/></button></div></div><div className="mt-5 rounded-lg bg-white p-6"><div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-xl font-bold text-[#252D02]">{strategy.title}</h2><span className="rounded-full bg-[#EEF0E7] px-4 py-2 text-[10px] text-[#535862]">{strategy.period}</span></div>{active === 0 ? <><div className="mt-6 text-xs leading-5 text-[#535862]"><strong className="mb-2 block uppercase text-[#719926]">Summary</strong><p>The National Disaster Risk Reduction Framework was developed as an advancement to the 2011 National Strategy for Disaster Resilience and in line with the global Sendai Disaster Risk Reduction 2015–2030. The framework was co-designed by all levels of government, industry and community representatives and intends to guide Australia&apos;s capability in reducing disaster risk associated with natural hazards.</p><p className="mt-4">The four priorities of the framework are:</p><ul className="ml-5 mt-2 list-disc space-y-1"><li>Understand disaster risk</li><li>Accountable decisions</li><li>Enhanced investment</li><li>Governance, ownership and responsibility</li></ul><p className="mt-5">In August 2023, the Second National Action Plan was endorsed by all Emergency Management Ministers and provides an update on how the National Disaster Risk Reduction Framework can continue to be implemented. Specifically, National Action 21 describes that Australia must better align recovery and resilience activities, governance, funding, policy and processes to support betterment and long-term disaster risk reduction.</p></div><h3 className="mt-7 text-xs font-bold text-[#719926]">How this informs Public Skills Australia&apos;s work</h3><div className="mt-4 space-y-4"><div className="rounded-lg border-l-[7px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5"><strong className="text-sm text-[#252D02]">Consultation and engagement:</strong><p className="mt-2 text-xs leading-5 text-[#535862]">Provided context and guidance on Australia&apos;s whole-of-society approach to disaster risk reduction, informing consultation with Fire and Emergency Services stakeholders.</p></div><div className="rounded-lg border-l-[7px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5"><strong className="text-sm text-[#252D02]">2025 Workforce Strategies</strong><p className="mt-2 text-xs leading-5 text-[#535862]">Informed the development of:</p><ul className="ml-5 mt-2 list-disc text-xs leading-5 text-[#535862]"><li>Volunteer Leadership Project</li><li>Emergency Tree Operations</li><li>Emerging Technologies Skills Review</li></ul><p className="mt-2 text-xs leading-5 text-[#535862]">Specifically, all three strategies were informed by National Action 8 – Facilitate greater common emergency management sector professionalisation, capability and participation, including volunteerism.</p></div><div className="rounded-lg border-l-[7px] border-l-[#D95222] bg-[#FBECE7] px-6 py-5"><strong className="text-sm text-[#252D02]">2026 Workforce Strategies</strong><p className="mt-2 text-xs leading-5 text-[#535862]">Support uptake of disaster recovery training products will be informed by National Action 21 from the Second National Action Plan: better align recovery and resilience activities, governance, funding, policy and processes to support betterment and long-term disaster risk reduction.</p></div></div></> : <div className="mt-6 text-xs leading-6 text-[#535862]"><strong className="mb-2 block uppercase text-[#719926]">Summary</strong><p>Selecting this strategy provides its detailed relationship to Fire and Emergency Services workforce priorities and Public Skills Australia&apos;s current work program.</p></div>}</div></article></section>
    {(active === 1 || active === 2 || active === 3) && <style jsx global>{`section.grid.items-start article { display: none; }`}</style>}
    {active === 1 && <AustralianDisasterRecoveryDetail />}
    {active === 2 && <AfacStrategicPlanDetail onNext={() => showStrategy(3)} />}
    {active === 3 && <VolunteeringStrategyDetail onNext={() => showStrategy(4)} />}
  </PublicSafetyPageShell>;
}
