import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const skillSets = [
  "PUASS00096 Coordinate Functional Recovery Group",
  "PUASS00097 Lead a Recovery Team",
  "PUASS00098 Manage a Recovery Centre",
  "PUASS00099 Manage Recovery – Community Involvement",
  "PUASS00100 Manage Recovery – Complex Incident Planning",
  "PUASS00101 Manage Recovery – Data Management",
  "PUASS00102 Manage Recovery – Finance",
  "PUASS00103 Manage Recovery – Logistics",
  "PUASS00104 Manage Recovery – Public Information",
];

const units = [
  "PUARCV004 Apply person-centred approaches to recovery planning and activities",
  "PUARCV005 Apply recovery concepts and principles",
  "PUARCV006 Coordinate recovery activities across recovery environments",
  "PUARCV007 Facilitate long-term recovery planning for a disaster event",
];

function ProductList({ items }: { items: string[] }) {
  return <ul className="ml-5 mt-4 list-disc space-y-1.5 text-xs leading-5 text-[#535862]">
    {items.map((item) => <li key={item}>{item}</li>)}
  </ul>;
}

export default function PublicSafetyFesDisasterRecoveryTrainingProductsView({ slug, report }: {
  slug: string;
  report: PublicSafetyReport;
}) {
  return <PublicSafetyPageShell
    slug={slug}
    report={report}
    currentPage="fes_disaster_recovery_training_products"
    navigation={{
      back: { label: "Fire and Emergency Services chapter", href: `/reports/${slug}/fes` },
      backSecondary: { label: "1. Disaster Recovery", href: `/reports/${slug}/fes_disaster_recovery` },
      prev: { label: "Existing Industry-Sector Strategies", href: `/reports/${slug}/fes_existing_strategies` },
      next: { label: "Police", href: `/reports/${slug}/police` },
      prevPrefix: "Previous Section:",
      nextPrefix: "Next Section:",
    }}
  >
    <section className="rounded-2xl border border-[#E9EAEB] bg-white px-6 py-7 lg:px-8">
      <span className="inline-flex rounded-full bg-[#D95222] px-4 py-1.5 text-[10px] font-bold uppercase text-white">FES · Industry-Sector Analysis</span>
      <h1 className="mt-5 max-w-[1180px] text-[40px] font-bold leading-[1.15] text-[#252D02]">Disaster Recovery Training Products from the Royal Commission into National Natural Disaster Arrangements</h1>
    </section>

    <section className="rounded-xl border border-[#E9EAEB] bg-white px-6 py-7 lg:px-8">
      <div>
        <h2 className="text-xl font-bold text-[#252D02]">Qualification</h2>
        <ProductList items={["PUA50722 Diploma of Public Safety (Recovery Management)"]}/>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-[#252D02]">Skill Sets</h2>
        <ProductList items={skillSets}/>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-[#252D02]">Units of Competency</h2>
        <ProductList items={units}/>
      </div>
    </section>
  </PublicSafetyPageShell>;
}
