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
  return <ul className="ml-5 mt-4 list-disc text-sm leading-6 text-[#535862] marker:text-[10px]">
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
    contentClassName="[&>div:first-child_button]:min-h-10 [&>div:first-child_button]:px-[22px] [&>div:first-child_button]:text-sm [&>div:first-child_button]:leading-[18px] [&>div:first-child_button]:text-left [&>div:first-child_button_svg]:size-4 [&>div:first-child_button_svg]:shrink-0"
    navigation={{
      back: { label: "Fire and Emergency Services chapter", href: `/reports/${slug}/fes` },
      backSecondary: { label: "1. Disaster Recovery. Insight One.", href: `/reports/${slug}/fes_disaster_recovery` },
      pagesOrder: [],
    }}
  >
    <section className="flex flex-col items-start gap-4 rounded-2xl bg-white p-6 inset-ring inset-ring-[#E9EAEB]">
      <span className="rounded-full bg-[#C9481A] px-4 py-1 text-xs font-bold uppercase leading-[18px] text-white">FES · Industry-Sector Analysis</span>
      <h1 className="max-w-[1120px] text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.35]">Disaster Recovery Training Products from the Royal Commission into National Natural Disaster Arrangements</h1>
    </section>

    <section className="grid gap-10 rounded-2xl bg-white p-6 inset-ring inset-ring-[#E9EAEB] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-8">
      <div>
        <h2>Qualification</h2>
        <ProductList items={["PUA50722 Diploma of Public Safety (Recovery Management)"]}/>
      </div>

      <div>
        <h2>Skill Sets</h2>
        <ProductList items={skillSets}/>
      </div>

      <div>
        <h2>Units of Competency</h2>
        <ProductList items={units}/>
      </div>
    </section>
  </PublicSafetyPageShell>;
}
