export interface PublicSafetyPageDefinition {
  key: string;
  title: string;
  group: string;
}

export const PUBLIC_SAFETY_PAGE_INVENTORY: PublicSafetyPageDefinition[] = [
  { key: "report_landing", title: "Public Safety Report Landing", group: "Report" },
  { key: "introduction", title: "Introduction", group: "Report" },
  { key: "about", title: "About Public Skills Australia", group: "Report" },
  { key: "methodology", title: "Methodology", group: "Report" },
  { key: "executive_summary", title: "Executive Summary", group: "Report" },
  { key: "drivers_of_change", title: "Drivers of Change", group: "Drivers of Change" },
  { key: "driver_1", title: "Driver 1", group: "Drivers of Change" },
  { key: "driver_2", title: "Driver 2", group: "Drivers of Change" },
  { key: "driver_3", title: "Driver 3", group: "Drivers of Change" },
  { key: "driver_4", title: "Driver 4", group: "Drivers of Change" },
  { key: "cross_sector_analysis", title: "Public Safety Cross-Sector Analysis", group: "Cross-Sector Analysis" },
  { key: "cross_sector_core_skill_alignment", title: "Cross-Sector Core Skill Alignment", group: "Cross-Sector Analysis" },
  { key: "cross_sector_specialist_skill_alignment", title: "Cross-Sector Specialist Skill Alignment", group: "Cross-Sector Analysis" },
  { key: "cross_sector_skills_recognition", title: "Cross-Sector Skills Recognition", group: "Cross-Sector Analysis" },
  { key: "defence", title: "Defence Chapter", group: "Defence" },
  { key: "defence_industry_overview", title: "Defence Industry-Sector Overview", group: "Defence" },
  { key: "defence_industry_profile", title: "Defence Industry Profile", group: "Defence" },
  { key: "defence_workforce_insights", title: "Defence Workforce Insights", group: "Defence" },
  { key: "defence_emerging_technology", title: "Emerging Technology", group: "Defence" },
  { key: "defence_transitioning_veterans", title: "Transitioning Veterans", group: "Defence" },
  { key: "defence_workforce_strategies", title: "Defence 2026 Workforce Strategies", group: "Defence" },
  { key: "defence_update_2025_strategies", title: "Defence Update on 2025 Strategies", group: "Defence" },
  { key: "defence_existing_strategies", title: "Defence Existing Industry-Sector Strategies", group: "Defence" },
  { key: "defence_federal_initiatives", title: "Defence Federal Government Initiatives", group: "Defence" },
  { key: "fes", title: "Fire and Emergency Services Chapter", group: "Fire and Emergency Services" },
  { key: "fes_industry_overview", title: "FES Industry-Sector Overview", group: "Fire and Emergency Services" },
  { key: "fes_industry_profile", title: "FES Industry Profile", group: "Fire and Emergency Services" },
  { key: "fes_workforce_insights", title: "FES Workforce Insights", group: "Fire and Emergency Services" },
  { key: "fes_disaster_recovery", title: "Disaster Recovery", group: "Fire and Emergency Services" },
  { key: "fes_surf_life_saving_first_aid", title: "Surf Life Saving First Aid", group: "Fire and Emergency Services" },
  { key: "fes_hazardous_materials", title: "Hazardous Materials", group: "Fire and Emergency Services" },
  { key: "fes_workforce_strategies", title: "FES 2026 Workforce Strategies", group: "Fire and Emergency Services" },
  { key: "fes_update_2025_strategies", title: "FES Update on 2025 Strategies", group: "Fire and Emergency Services" },
  { key: "fes_existing_strategies", title: "FES Existing Industry-Sector Strategies", group: "Fire and Emergency Services" },
  { key: "fes_federal_initiatives", title: "FES Federal Government Initiatives", group: "Fire and Emergency Services" },
  { key: "police", title: "Police Chapter", group: "Police" },
  { key: "police_industry_overview", title: "Police Industry-Sector Overview", group: "Police" },
  { key: "police_industry_profile", title: "Police Industry Profile", group: "Police" },
  { key: "police_workforce_insights", title: "Police Workforce Insights", group: "Police" },
  { key: "police_digital_forensics", title: "Digital Forensics", group: "Police" },
  { key: "police_regional_remote_leadership", title: "Regional and Remote Police Leadership", group: "Police" },
  { key: "police_workforce_strategies", title: "Police 2026 Workforce Strategies", group: "Police" },
  { key: "police_update_2025_strategies", title: "Police Update on 2025 Strategies", group: "Police" },
  { key: "police_existing_strategies", title: "Police Existing Industry-Sector Strategies", group: "Police" },
  { key: "police_federal_initiatives", title: "Police Federal Government Initiatives", group: "Police" },
  { key: "looking_forward", title: "2027 and Beyond", group: "Report" },
  { key: "downloads", title: "Downloads and References", group: "Report" },
];

export const PUBLIC_SAFETY_BLANK_PAGES = PUBLIC_SAFETY_PAGE_INVENTORY.filter(
  ({ key }) => !["report_landing", "introduction", "about", "methodology", "executive_summary"].includes(key),
);
