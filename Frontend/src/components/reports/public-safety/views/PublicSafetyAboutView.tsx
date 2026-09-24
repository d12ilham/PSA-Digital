import Image from "next/image";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";
import { PUBLIC_SAFETY_FUNCTIONS } from "../data/overview";

export default function PublicSafetyAboutView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  return (
    <PublicSafetyPageShell slug={slug} report={report} currentPage="about">
      <section className="relative h-[402px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white p-6">
        <Image
          src="/images/wave-right.png"
          alt=""
          width={420}
          height={540}
          priority
          className="pointer-events-none absolute -right-10 top-0 h-full w-auto object-cover object-left opacity-80"
        />
        <div className="relative z-10 w-[800px] max-w-[calc(100%_-_280px)]">
          <h1 className="text-[40px] font-bold leading-[54px] text-[#252D02]">About Public Skills Australia</h1>
          <p className="mt-4 text-sm leading-6 text-[#535862]">
            Public Skills Australia is the Jobs and Skills Council (JSC) for the Public Safety and Government industry, comprising Correctional Services, Defence, Federal, State/Territory and Local Government, Fire and Emergency Services and Police industry-sectors.
          </p>

          <div className="mt-10 flex h-[172px] items-start rounded-2xl border border-[#E9EAEB] bg-white p-5">
            <Image src="/images/reports/about/working-in-partnership.svg" alt="" width={92} height={92} className="h-[92px] w-[92px] shrink-0" />
            <div className="ml-5">
              <h2 className="text-base font-bold leading-7 text-[#252D02]">Working in partnership</h2>
              <p className="mt-2 text-sm leading-6 text-[#535862]">
                Through its work, Public Skills Australia actively supports employer and employee bodies in these industries and associated volunteer associations. Public Skills Australia works in partnership with the Department of Employment and Workplace Relations (DEWR) and other JSCs to give effect to broader Ministerial and government priorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex h-[49px] items-start border-b border-[#D5D7DA]">
          <h2 className="text-2xl font-bold leading-8 text-[#252D02]">Public Skills Australia Undertakes:</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PUBLIC_SAFETY_FUNCTIONS.map((item) => (
            <article key={item.title} className="h-[376px] rounded-[14px] border border-[#E9EAEB] bg-white p-6">
              <Image src={item.icon} alt="" width={100} height={100} className="h-[100px] w-[100px]" />
              <div className="mt-10">
                <h3 className="max-w-[294px] text-base font-bold leading-7 text-[#252D02]">{item.title}</h3>
                <p className="mt-3 max-w-[294px] text-sm leading-6 text-[#535862]">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="flex h-[156px] items-center rounded-[14px] border border-[#E9EAEB] bg-white p-6">
        <Image src="/images/reports/about/Commitment.svg" alt="" width={100} height={100} className="h-[100px] w-[100px] shrink-0" />
        <div className="ml-6 self-start pt-1">
          <h2 className="text-base font-bold leading-7 text-[#252D02]">Our commitment</h2>
          <p className="mt-2 max-w-[800px] text-sm leading-6 text-[#535862]">
            Public Skills Australia remains committed to encouraging the participation of First Nations people,<sup>1</sup> those from culturally and linguistically diverse backgrounds, those living with or experiencing disabilities, women and other gender diverse people and mature people in the Public Safety and Government industry workforces.
          </p>
        </div>
      </section>

      <aside className="h-[120px] rounded-2xl border border-[#E9EAEB] bg-[#F0F5DF] p-6">
        <p className="max-w-[800px] text-sm leading-6 text-[#535862]">
          <sup>1.</sup> Please note, First Nations people will be used as preferred terminology inclusive of Aboriginal and Torres Strait Islanders. When citing a data source (such as government strategies or state of the sector reports) the terminology of the data source will be used to maintain accurate data representation.
        </p>
      </aside>
    </PublicSafetyPageShell>
  );
}
