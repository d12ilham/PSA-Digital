"use client";

import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const sources = [
  "Department of Veterans' Affairs, Who is a veteran?, Australian Government, accessed 19 November 2025.",
  "Royal Commission into Defence and Veteran Suicide, Final Report, Australian Government, 2024, accessed 19 November 2025.",
  "Royal Commission into Defence and Veteran Suicide, Final Report: Recommendation 83, Australian Government, 2024, accessed 19 November 2025.",
  "Public Skills Australia, 2025 Public Safety Workforce Insights Report, Public Skills Australia, 2025.",
  "Australian Defence Force, ADF Transition and Civil Recognition, Department of Defence, Australian Government, accessed 19 November 2025.",
  "Department of Defence, Recognition of prior learning, Australian Government, accessed 19 November 2025.",
  "Australian Skills Quality Authority, Recognition of prior learning, Australian Government, accessed 19 November 2025.",
];

export default function PublicSafetyDefenceTransitioningVeteransView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage="defence_transitioning_veterans"
      navigation={{
        back: { label: "Defence Workforce Insights", href: `/reports/${slug}/defence_workforce_insights` },
        backSecondary: { label: "Executive Summary", href: `/reports/${slug}/executive_summary` },
        prev: { label: "Workforce Insights", href: `/reports/${slug}/defence_workforce_insights` },
        next: { label: "2. Transitioning Veterans", href: `/reports/${slug}/defence_transitioning_veterans_2` },
        prevPrefix: "Previous Section:",
        nextPrefix: "Next Section:",
      }}
    >
      <section className="rounded-2xl border border-[#E9EAEB] bg-white px-6 py-6">
        <span className="inline-flex rounded-full bg-[#D7A31A] px-4 py-1.5 text-[10px] font-bold text-white">Theme 2. Transitioning Veterans · Insight One</span>
        <h1 className="mt-5 text-[40px] font-bold leading-[48px] text-[#252D02]">Transitioning Veterans</h1>
        <p className="mt-3 text-xs text-[#535862]">Each section below can also be opened individually.</p>
      </section>

      <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
        <div className="grid min-h-[170px] overflow-hidden rounded-xl border border-[#E2E4DB] bg-[#FAFAF0]" style={{ gridTemplateColumns: "8px 58px 1fr" }}>
          <div className="bg-[#91AD45]" />
          <div className="pt-6 text-center text-[50px] font-light leading-none text-[#E7E8D9]">1</div>
          <div className="px-5 py-6">
            <p className="text-[10px] font-semibold uppercase text-[#6C8C20]">Industry Insight 2.1</p>
            <p className="mt-5 max-w-[900px] text-sm font-semibold leading-6 text-[#252D02]">The Vocational Education and Training (VET) system remains important for the ADF as it provides a national standard, with meaningful qualifications written by industry, for industry.</p>
            <p className="mt-5 text-xs leading-5 text-[#535862]">The complete supporting report content follows below. Use ← Back to Workforce Insights to return to the presentation anchor.</p>
          </div>
        </div>

        <div className="mt-6 max-w-[970px] text-[13px] leading-[21px] text-[#535862]">
          <p>Defence veterans are defined as:</p>
          <p className="mt-2">“all ex-serving personnel who have ever served at least one day in the Australian Defence Force (ADF), including reservists, personnel who experienced operational deployments and personnel who served in peacekeeping and peace-making operations, including humanitarian and domestic support operations.”<sup>29</sup></p>
        </div>

        <div className="mt-6">
          <h2 className="border-b border-[#DADDD4] pb-5 text-2xl font-bold text-[#252D02]">Royal Commission into Defence and Veteran Suicide – Recommendation 83</h2>
          <div className="max-w-[970px] pt-6 text-[13px] leading-[21px] text-[#535862]">
            <p>The Final Report for the Royal Commission into Defence and Veteran Suicide details the transition from military to civilian life and examines the challenges that veterans may face when seeking employment post-service.<sup>30</sup></p>
            <p className="mt-4">Of the 122 recommendations, Recommendation 83: “Increase opportunities for personnel to gain civilian qualifications from Defence training and education, Focus Area C ‘fill the gap’ between Defence and civilian training (where an equivalent civilian qualification exists), either by expanding the content of the Defence training course or by funding bridging training for personnel prior to separation” was highlighted in the 2025 Public Safety Workforce Insights Report as a focus area for Public Skills Australia to support the Defence industry-sector.<sup>31</sup></p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="border-b border-[#DADDD4] pb-5 text-2xl font-bold text-[#252D02]">Recognition of Prior Learning and the VET system</h2>
          <div className="max-w-[970px] pt-6 text-[13px] leading-[21px] text-[#535862]">
            <p>The skills and experience that ADF personnel obtain throughout their service can be considered towards any additional study post-service, or towards future job roles in the civilian workforce through RPL provided by ADF Transition and Civil Recognition.<sup>32</sup> Once assessed, a veteran’s existing skills, work level standards and experience can result in being awarded qualifications and/or micro-credentials which have transferability to industries external to Defence.<sup>33</sup></p>
            <p className="mt-4">Defence stakeholders emphasised the importance of the VET system for this purpose as associated education and training products represent particular skills (through the units of competency) as a national standard for relevant occupations.<sup>34</sup> Awarding VET qualifications allows Defence veterans to demonstrate that they have met a national standard that can be recognised across the country by RTOs, industries and employers.<sup>35</sup></p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
        <h2 className="text-2xl font-bold text-[#252D02]">Sources</h2>
        <ol className="mt-6 space-y-4">
          {sources.map((source, index) => (
            <li key={source} className="grid grid-cols-[24px_1fr] gap-3 text-xs leading-5 text-[#535862]">
              <span className="grid size-5 place-items-center rounded-full bg-[#78A800] text-[10px] font-bold text-white">{index + 29}</span>
              <span>{source}</span>
            </li>
          ))}
        </ol>
      </section>
    </PublicSafetyPageShell>
  );
}
