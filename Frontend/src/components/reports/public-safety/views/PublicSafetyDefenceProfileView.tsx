"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import AustraliaInteractiveMap from "@/components/common/AustraliaInteractiveMap";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

const charts = [
  "Total Yearly Headcount and Percent Change (coloured arrows) for each Military Service Branch, Combined for Whole of Australian Defence Force (ADF)",
  "Yearly Separation Rate for ADF Service Branches and ADF Combined",
  "Proportion of Male and Female ADF and ADF Reserve Members in 2025",
  "Proportion of First Nations Participation in the ADF and ADF Reserves Across 2024 and 2025",
  "ADF Employees and Major Facilities by Location and ADF Reserves Across 2024 and 2025",
  "List of Operations and Activities Undertaken by the Australian Defence Force Throughout 2024 and 2025",
];

const lineColours = ["#D7A31A", "#A9693D", "#ED8D61", "#61645E", "#D6A22A"];

function LineChart({ separation = false }: { separation?: boolean }) {
  const names = separation ? ["Navy", "Total ADF", "Army", "Air Force"] : ["Total ADF", "ADF Reserves", "Army", "Air Force", "Navy"];
  const left = separation ? [11.5, 9.5, 7.7, 7.6] : [57248, 32560, 27239, 15769, 15160];
  const right = separation ? [9.4, 7.9, 6.9, 6.2] : [58909, 33260, 27701, 16088, 15706];
  const max = separation ? 12 : 60000;
  const min = separation ? 4 : 10000;
  const y = (value: number) => 245 - ((value - min) / (max - min)) * 190;
  return <svg viewBox="0 0 700 340" className="mt-5 w-full" role="img" aria-label={separation ? "Yearly separation rate line chart" : "Yearly headcount line chart"}>
    {[0,1,2,3,4].map(i => <line key={i} x1="75" x2="620" y1={55+i*47.5} y2={55+i*47.5} stroke="#E3E5DE" />)}
    {names.map((name,i) => <g key={name}>
      <line x1="190" y1={y(left[i])} x2="510" y2={y(right[i])} stroke={lineColours[i]} strokeWidth="3" />
      <circle cx="190" cy={y(left[i])} r="4" fill={lineColours[i]} /><circle cx="510" cy={y(right[i])} r="4" fill={lineColours[i]} />
      <text x="174" y={y(left[i])-10} textAnchor="end" fontSize="12" fill={lineColours[i]}>{left[i].toLocaleString()}{separation ? "%" : ""}</text>
      <text x="526" y={y(right[i])-5} fontSize="12" fill={lineColours[i]}>{right[i].toLocaleString()}{separation ? "%" : ""}</text>
      <text x="526" y={y(right[i])+13} fontSize="12" fontWeight="700" fill="#50534D">{name}</text>
    </g>)}
    <text x="190" y="282" textAnchor="middle" fontSize="12" fill="#30342D">2024</text><text x="510" y="282" textAnchor="middle" fontSize="12" fill="#30342D">2025</text>
  </svg>;
}

function GenderChart() {
  const rows = [["Army",84.6,15.3],["ADF Reserves",81.3,18.7],["Total ADF",79.1,20.9],["Navy",75.7,24.3],["Air Force",72.7,27.3]] as const;
  return <div className="mt-10 space-y-4">{rows.map(([name,male,female]) => <div key={name} className="grid grid-cols-[90px_1fr] items-center gap-4"><span className="text-right text-[11px] text-[#252D02]">{name}</span><div className="flex h-9 overflow-hidden"><div className="grid place-items-center bg-[#666960] text-[10px] font-semibold text-white" style={{width:`${male}%`}}>{male}%</div><div className="grid place-items-center bg-[#D7A31A] text-[10px] font-semibold text-white" style={{width:`${female}%`}}>{female}%</div></div></div>)}<div className="ml-[106px] flex gap-6 pt-3 text-[11px]"><span><i className="mr-2 inline-block size-2 rounded-full bg-[#666960]"/>Male (%)</span><span><i className="mr-2 inline-block size-2 rounded-full bg-[#D7A31A]"/>Female (%)</span></div></div>;
}

function FirstNationsChart() {
  return <svg viewBox="0 0 700 330" className="mt-4 w-full" role="img" aria-label="First Nations participation line chart">
    {[2.5,3,3.5,4,4.5].map((v,i)=><g key={v}><line x1="80" x2="620" y1={250-i*47} y2={250-i*47} stroke="#DDE0D7"/><text x="65" y={254-i*47} fontSize="11" textAnchor="end">{v}%</text></g>)}
    <line x1="165" y1="108" x2="555" y2="108" stroke="#D2A25B" strokeWidth="3"/><circle cx="165" cy="108" r="4" fill="#D2A25B"/><circle cx="555" cy="108" r="4" fill="#D2A25B"/>
    <line x1="165" y1="197" x2="555" y2="215" stroke="#63655F" strokeWidth="3"/><circle cx="165" cy="197" r="4" fill="#63655F"/><circle cx="555" cy="215" r="4" fill="#63655F"/>
    <text x="155" y="94" fill="#D2A25B" fontSize="16">3.9%</text><text x="564" y="113" fill="#D2A25B" fontSize="16">3.9%</text><text x="155" y="184" fill="#63655F" fontSize="16">3.1%</text><text x="564" y="220" fill="#63655F" fontSize="16">3.0%</text>
    <text x="555" y="137" fontSize="11">Total ADF</text><text x="535" y="239" fontSize="11">ADF Reserves</text><text x="165" y="285" textAnchor="middle" fontSize="11">2024</text><text x="555" y="285" textAnchor="middle" fontSize="11">2025</text>
  </svg>;
}

function LocationChart() {
  const states = ["NSW","NT","QLD","SA","TAS","VIC","WA"];
  const [selectedState, setSelectedState] = useState("WA");
  const locationData: Record<string, [string,string,string]> = {
    NSW:["14,182","9,053","21"], NT:["4,826","2,104","8"], QLD:["11,421","7,316","18"], SA:["5,126","3,054","11"], TAS:["1,208","874","3"], VIC:["7,864","4,927","12"], WA:["4,276","3,173","10"],
  };
  const values = locationData[selectedState];
  return <><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><h3 className="text-lg font-semibold">ADF Employees and Major Facilities by Location</h3><div className="flex flex-wrap gap-2">{states.map(s=><button type="button" key={s} onClick={()=>setSelectedState(s)} className={`rounded-full px-3 py-1 text-[10px] font-semibold transition-colors ${s===selectedState?"bg-[#7BC900] text-[#253100]":"bg-[#FAFAF0] text-[#535862]"}`}>{s}</button>)}</div></div><div className="grid gap-5 lg:grid-cols-[1fr_220px]"><div className="overflow-hidden rounded-lg border border-[#E9EAEB] bg-[#F7F0DC] px-4"><AustraliaInteractiveMap selectedState="NATIONAL" highlightedState={selectedState} onSelectState={setSelectedState} variant="defence" compact /></div><aside className="rounded-lg bg-[#F8F1E3] p-5"><h4 className="text-2xl font-bold">{selectedState}</h4>{[[values[0],"Permanent ADF"],[values[1],"ADF Reserves"],[values[2],"Major Defence"]].map(([v,l])=><div key={l} className="mt-4 rounded bg-white p-4"><strong className="block text-xl text-[#D7A31A]">{v}</strong><span className="text-[11px]">{l}</span></div>)}</aside></div><p className="mt-4 text-[10px] leading-4 text-[#535862]">Major Defence bases. Please note total number of bases may change in the next 12 months in line with recommendations from the Defence Estate Audit.</p></>;
}

function OperationsChart() {
  const cards = [
    { text:"Operation Kudu", sub:"Ukraine", left:"29%", top:"8%", width:"16%" },
    { text:"Operation Fortitude", sub:"Syria", left:"29%", top:"18%", width:"16%" },
    { text:"Operation Accordion\nOperation Beech\nOperation Manitou\nOperation Okra\nOperation Paladin\nOperation Steadfast", sub:"Middle East region", left:"29%", top:"31%", width:"16%" },
    { text:"Operation Augury", sub:"Global", left:"1%", top:"53%", width:"16%" },
    { text:"Operation Dyurra", sub:"Space", left:"1%", top:"66%", width:"16%" },
    { text:"Operation Mazurka", sub:"Egypt", left:"29%", top:"55%", width:"16%" },
    { text:"Operation Aslan", sub:"South Sudan", left:"29%", top:"67%", width:"16%" },
    { text:"Operation Hydranth", sub:"Red Sea", left:"29%", top:"79%", width:"16%" },
    { text:"Operation Argos\nOperation Linesman", sub:"Republic of Korea", left:"61%", top:"29%", width:"16%" },
    { text:"Exercise Rim of the Pacific", sub:"Hawaii", left:"86%", top:"8%", width:"13%" },
    { text:"Operation Gateway", sub:"South-East Asia", left:"84%", top:"42%", width:"15%" },
    { text:"Operation Lilia", sub:"Solomon Islands", left:"84%", top:"52%", width:"15%" },
    { text:"Exercise Austral Shield", sub:"Australia", left:"61%", top:"61%", width:"17%" },
    { text:"Operation Resolute", sub:"Australian borders", left:"61%", top:"73%", width:"15%" },
    { text:"Operation Southern Discovery", sub:"Antarctica", left:"61%", top:"84%", width:"15%" },
    { text:"Operation Render Safe\nOperation Solania\nOperation Vaea\nOperation Vanuatu Assist", sub:"Pacific Islands", left:"80%", top:"78%", width:"19%" },
  ];
  return <div className="mt-5">
    <p className="mb-3 text-[9px] leading-3 text-[#535862]">List of Operations and Activities Undertaken by the Australian Defence Force<br/>Throughout 2024 and 2025</p>
    <div className="relative aspect-[1.85/1] min-h-[440px] overflow-hidden bg-white">
      <svg viewBox="0 0 1000 540" className="absolute inset-0 size-full" aria-label="World map of Australian Defence Force operations">
        <g fill="#B9BAB8" stroke="#FFFFFF" strokeWidth="2">
          <path d="M165 130 205 92 277 73 337 89 359 122 341 155 304 170 286 207 244 211 211 189 181 177 142 151Z"/>
          <path d="M314 217 351 234 370 278 359 326 337 379 318 427 294 391 285 334 269 286 278 246Z"/>
          <path d="M260 70 293 39 332 45 347 67 319 86Z"/>
          <path d="M417 127 446 107 486 112 506 131 538 127 560 145 604 137 649 151 700 146 748 170 787 167 833 190 813 221 764 224 733 245 685 238 647 256 607 246 568 226 532 221 501 198 461 187 424 163Z"/>
          <path d="M462 192 503 201 532 237 539 284 522 338 497 376 463 356 441 310 431 260 443 218Z"/>
          <path d="M548 231 571 244 585 267 570 285 551 269Z"/>
          <path d="M765 347 807 329 853 342 877 371 849 397 799 393 769 372Z"/>
          <path d="M866 397 879 409 872 426 861 414Z"/>
          <path d="M420 150 439 135 453 145 445 163Z"/><path d="M452 137 468 123 485 131 479 149Z"/>
          <path d="M900 226 914 238 906 256 891 244Z"/><path d="M925 253 935 268 927 284 917 267Z"/>
        </g>
        <g fill="none" stroke="#24351D" strokeWidth="3">
          <polyline points="450,76 560,76 560,208"/><polyline points="450,130 520,130 520,248 580,248"/>
          <polyline points="450,224 575,224"/><polyline points="450,260 575,260"/><polyline points="450,304 560,304 560,276"/>
          <polyline points="450,365 590,365 590,293"/><polyline points="450,425 608,425 608,270"/>
          <polyline points="770,188 800,188 800,250"/><polyline points="860,78 920,78 920,155"/>
          <polyline points="835,244 802,244 802,310"/><polyline points="835,292 821,292 821,354"/>
          <polyline points="780,348 800,348 800,382"/><polyline points="760,406 780,406 780,394"/>
          <polyline points="760,458 760,493"/><polyline points="800,438 875,438 875,393"/>
        </g>
        <g fill="#24351D">{[[560,208],[580,248],[575,224],[575,260],[560,276],[590,293],[608,270],[800,250],[920,155],[802,310],[821,354],[800,382],[780,394],[760,493],[875,393]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5"/>)}</g>
        <circle cx="580" cy="245" r="30" fill="#D7A31A" opacity=".88"/><circle cx="875" cy="393" r="26" fill="#F2BE35" opacity=".88"/>
      </svg>
      {cards.map(card=><div key={`${card.text}-${card.sub}`} className="absolute bg-[#D8B474]/95 px-3 py-2 text-[9px] leading-[12px] text-[#4C5049]" style={{left:card.left,top:card.top,width:card.width}}><span className="whitespace-pre-line font-medium">{card.text}</span><span className="block text-white">{card.sub}</span></div>)}
    </div>
    <p className="mt-3 text-[10px] text-[#535862]"><span className="font-semibold">NOTE:</span> Does not include ADF assistance to domestic emergency response.</p>
  </div>;
}

function ActiveChart({ active }: { active: number }) {
  return <div className="min-w-0 rounded-lg border border-[#E9EAEB] bg-white px-8 py-7"><p className="text-[10px] font-semibold uppercase text-[#789329]">DEF · Presentation View</p>{active!==4&&<h2 className="mt-2 max-w-[720px] text-lg font-semibold leading-6 text-[#252D02]">{charts[active]}</h2>}{active===0&&<LineChart/>}{active===1&&<LineChart separation/>}{active===2&&<GenderChart/>}{active===3&&<FirstNationsChart/>}{active===4&&<LocationChart/>}{active===5&&<OperationsChart/>}<p className="mt-5 text-[10px] font-semibold uppercase text-[#6F8B24]">Source: Defence Annual Report 2024-25, 2025</p></div>;
}

export default function PublicSafetyDefenceProfileView({ slug, report }: { slug: string; report: PublicSafetyReport }) {
  const [active, setActive] = useState(0);
  return <PublicSafetyPageShell slug={slug} report={report} currentPage="defence_industry_profile" navigation={{ back:{label:"Defence chapter",href:`/reports/${slug}/defence`}, prev:{label:"Industry-Sector Overview",href:`/reports/${slug}/defence_industry_overview`}, next:{label:"Workforce Insights",href:`/reports/${slug}/defence_workforce_insights`}, prevPrefix:"Previous Section:", nextPrefix:"Next Section:" }}>
    <section className="rounded-2xl border border-[#E9EAEB] bg-white px-6 py-5"><span className="inline-flex rounded-full bg-[#D7A31A] px-4 py-1.5 text-[10px] font-bold uppercase text-white">DEF · Industry-Sector Analysis</span><h1 className="mt-4 text-[40px] font-bold leading-[48px] text-[#252D02]">Industry Profile</h1><p className="mt-2 text-xs text-[#535862]">Select a chart to open it in a large presentation view.</p></section>
    <section><h2 className="border-b border-[#D8DBD2] pb-4 text-xl font-bold uppercase text-[#252D02]">Chart Library · Select a chart to open</h2><div className="mt-6 grid items-start gap-6 lg:grid-cols-[340px_1fr]"><div className="space-y-2">{charts.map((label,i)=><button key={label} type="button" onClick={()=>setActive(i)} aria-pressed={active===i} className={`grid w-full grid-cols-[1fr_34px] items-center gap-4 rounded-lg border px-5 py-5 text-left transition-colors ${active===i?"border-[#D7A31A] bg-[#FBF3DF]":"border-[#E9EAEB] bg-white"}`}><span><small className="mb-3 block text-[10px] font-semibold uppercase text-[#C79A26]">0{i+1} · DEF · Presentation View</small><strong className="block text-sm leading-5 text-[#252D02]">{label}</strong></span><span className={`grid size-8 place-items-center rounded-full border ${active===i?"border-[#CDD2C7] bg-white text-[#252D02]":"border-[#7BC900] bg-[#7BC900] text-[#243000]"}`}><ArrowRight size={15}/></span></button>)}</div><ActiveChart active={active}/></div></section>
  </PublicSafetyPageShell>;
}
