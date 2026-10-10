export const PUBLIC_SAFETY_SECTIONS = [
  { title: "Executive Summary", subtitle: "The Public Safety industry-sectors on one page", description: "A concise, presentation-friendly view of the report story.", path: "executive_summary", icon: "/images/reports/introduction/Executive.svg", accent: "#D9B43B" },
  { title: "Drivers of Change", description: "Four key drivers of change and the nine megatrends shaping long-term workforce trends.", tags: ["Drivers of Change", "Nine Megatrends"], path: "drivers_of_change", icon: "/images/reports/introduction/Drivers.svg", accent: "#046D2A" },
  { title: "Cross-Sector Analysis", description: "Analyses themes consistent across all three public safety industry-sector.", tags: ["Cross-Sector Analysis Overview", "Cross-Sector Alignment", "Specialist Skill Alignment", "Skill Recognition"], path: "industry_overview", icon: "/images/reports/introduction/Overview.svg", accent: "#046D2A" },
  { title: "Defence", tags: ["Industry-Sector Overview", "Industry Profile", "Workforce Insights", "2026 Proposed Workforce Strategies", "2025 Strategy Updates", "Existing Industry-Sector Strategies"], path: "industry_overview", icon: "/images/reports/introduction/Insights.svg", accent: "#D7A32A", sector: "defence" },
  { title: "Fire and Emergency Services", tags: ["Industry-Sector Overview", "Industry Profile", "Workforce Insights", "2026 Proposed Workforce Strategies", "2025 Strategy Updates", "Existing Industry-Sector Strategies"], path: "industry_overview", icon: "/images/reports/introduction/Strategies.svg", accent: "#C9481A", sector: "fire" },
  { title: "Police", tags: ["Industry-Sector Overview", "Industry Profile", "Workforce Insights", "2026 Proposed Workforce Strategies", "2025 Strategy Updates", "Existing Industry-Sector Strategies"], path: "industry_overview", icon: "/images/reports/introduction/Insights.svg", accent: "#0D71A3", sector: "police" },
  { title: "2026 Proposed Cross Sector Strategies Summaries", path: "workforce_strategies", icon: "/images/reports/introduction/Strategies.svg", accent: "#046D2A" },
  { title: "2027 and Beyond", description: "The future lines of enquiry and priorities for the next reports.", path: "looking_forward", icon: "/images/reports/introduction/Summary.svg", accent: "#046D2A" },
] as const;

export const PUBLIC_SAFETY_AT_A_GLANCE = [
  { value: "4th", label: "report generated for the Public Safety industry-sectors since 2023" },
  { value: "3", label: "Public Safety industry-sectors: Defence, Fire and Emergency Services and Police" },
  { value: "4", label: "key drivers of change in the short to medium term" },
  { value: "9", label: "megatrends identified in previous Workforce Insights Reports" },
  { value: "7", label: "industry insights across all the Public Safety industry-sectors" },
  { value: "6", label: "strategies developed to support and address identified challenges" },
] as const;

export const PUBLIC_SAFETY_DRIVERS = [
  "Resilience of organisations to respond to strategic shocks",
  "Challenges to workforce productivity",
  "Artificial intelligence, automation and digital transformation",
  "Workforce inclusivity",
] as const;

export const PUBLIC_SAFETY_SUBSECTORS = [
  { name: "Defence", code: "DEF", summary: "Sovereign capability, emerging technology and transition pathways for Defence personnel." },
  { name: "Fire and Emergency Services", code: "FES", summary: "Career and volunteer capability across emergency response, recovery and surf life saving." },
  { name: "Police", code: "POL", summary: "Digital forensics, specialist capability and leadership across every jurisdiction." },
] as const;

export const PUBLIC_SAFETY_FUNCTIONS = [
  { title: "Workforce Insight and Strategy", description: "undertakes data analysis, research and consultation to deepen understandings of contemporary workforce challenges and what can be done to mitigate these challenges", icon: "/images/reports/about/Workforce.svg" },
  { title: "Training Product Quality & Development", description: "develops quality training products to strengthen the skills and capabilities of Public Safety and Government workforces", icon: "/images/reports/about/Training.svg" },
  { title: "Supports Career Pathways", description: "monitors and promotes the implementation of training products to support career pathways for the Public Safety and Government industry-sectors", icon: "/images/reports/about/Supports.svg" },
  { title: "Industry Stewardship", description: "consults with, advocates for and promotes the needs of the Public Safety and Government industry-sectors.", icon: "/images/reports/about/Industry.svg" },
] as const;

export const PUBLIC_SAFETY_GOVERNANCE = [
  { step: "01", title: "Public Safety Subcommittee", description: "Reviews the evidence and consultation outcomes, then recommends the report to the Industry Advisory Group." },
  { step: "02", title: "Industry Advisory Group", description: "Tests the report against industry priorities and endorses it for consideration by the Public Skills Australia Board." },
  { step: "03", title: "Public Skills Australia Board", description: "Confirms the development and consultation process and approves submission to DEWR." },
] as const;
