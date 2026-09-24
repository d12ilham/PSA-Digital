import PublicSafetyExecutiveSummaryView from "./views/PublicSafetyExecutiveSummaryView";
import PublicSafetyIntroductionView from "./views/PublicSafetyIntroductionView";
import PublicSafetyAboutView from "./views/PublicSafetyAboutView";
import PublicSafetyMethodologyView from "./views/PublicSafetyMethodologyView";
import PublicSafetyBlankView from "./views/PublicSafetyBlankView";
import PublicSafetyDriversOverviewView from "./views/PublicSafetyDriversOverviewView";
import PublicSafetyDriverDetailView from "./views/PublicSafetyDriverDetailView";
import PublicSafetyCrossSectorAnalysisView from "./views/PublicSafetyCrossSectorAnalysisView";
import PublicSafetyCoreSkillAlignmentView from "./views/PublicSafetyCoreSkillAlignmentView";
import PublicSafetySpecialistSkillAlignmentView from "./views/PublicSafetySpecialistSkillAlignmentView";
import PublicSafetySkillsRecognitionView from "./views/PublicSafetySkillsRecognitionView";
import PublicSafetyDefenceView from "./views/PublicSafetyDefenceView";
import PublicSafetyDefenceOverviewView from "./views/PublicSafetyDefenceOverviewView";
import PublicSafetyDefenceProfileView from "./views/PublicSafetyDefenceProfileView";
import PublicSafetyDefenceWorkforceInsightsView from "./views/PublicSafetyDefenceWorkforceInsightsView";
import PublicSafetyDefenceEmergingTechnologyView from "./views/PublicSafetyDefenceEmergingTechnologyView";
import PublicSafetyDefenceEmergingTechnologyTwoView from "./views/PublicSafetyDefenceEmergingTechnologyTwoView";
import PublicSafetyDefenceTransitioningVeteransView from "./views/PublicSafetyDefenceTransitioningVeteransView";
import PublicSafetyDefenceTransitioningVeteransTwoView from "./views/PublicSafetyDefenceTransitioningVeteransTwoView";
import PublicSafetyDefenceWorkforceStrategiesView from "./views/PublicSafetyDefenceWorkforceStrategiesView";
import PublicSafetyDefenceStrategyUpdatesView from "./views/PublicSafetyDefenceStrategyUpdatesView";
import PublicSafetyDefenceExistingStrategiesView from "./views/PublicSafetyDefenceExistingStrategiesView";
import PublicSafetyDefenceFederalInitiativesView from "./views/PublicSafetyDefenceFederalInitiativesView";
import PublicSafetyFesView from "./views/PublicSafetyFesView";
import PublicSafetyFesOverviewView from "./views/PublicSafetyFesOverviewView";
import PublicSafetyFesProfileView from "./views/PublicSafetyFesProfileView";
import PublicSafetyFesWorkforceInsightsView from "./views/PublicSafetyFesWorkforceInsightsView";
import PublicSafetyFesDisasterRecoveryView from "./views/PublicSafetyFesDisasterRecoveryView";
import PublicSafetyFesDisasterRecoveryTwoView from "./views/PublicSafetyFesDisasterRecoveryTwoView";
import { PUBLIC_SAFETY_BLANK_PAGES } from "./data/pageInventory";
import type { PublicSafetyReport } from "./views/PublicSafetyPageShell";

const blankPageViews = Object.fromEntries(PUBLIC_SAFETY_BLANK_PAGES.map(({ key }) => [key, PublicSafetyBlankView]));

export const publicSafetyViews: Record<string, React.ComponentType<{ slug: string; report: PublicSafetyReport; pageType?: string }>> = {
  ...blankPageViews,
  executive_summary: PublicSafetyExecutiveSummaryView,
  introduction: PublicSafetyIntroductionView,
  about: PublicSafetyAboutView,
  methodology: PublicSafetyMethodologyView,
  drivers_of_change: PublicSafetyDriverDetailView,
  driver_1: PublicSafetyDriverDetailView,
  driver_2: PublicSafetyDriverDetailView,
  driver_3: PublicSafetyDriverDetailView,
  driver_4: PublicSafetyDriverDetailView,
  cross_sector_analysis: PublicSafetyCrossSectorAnalysisView,
  cross_sector_core_skill_alignment: PublicSafetyCoreSkillAlignmentView,
  cross_sector_specialist_skill_alignment: PublicSafetySpecialistSkillAlignmentView,
  cross_sector_skills_recognition: PublicSafetySkillsRecognitionView,
  defence: PublicSafetyDefenceView,
  defence_industry_overview: PublicSafetyDefenceOverviewView,
  defence_industry_profile: PublicSafetyDefenceProfileView,
  defence_workforce_insights: PublicSafetyDefenceWorkforceInsightsView,
  defence_emerging_technology: PublicSafetyDefenceEmergingTechnologyView,
  defence_emerging_technology_2: PublicSafetyDefenceEmergingTechnologyTwoView,
  defence_transitioning_veterans: PublicSafetyDefenceTransitioningVeteransView,
  defence_transitioning_veterans_2: PublicSafetyDefenceTransitioningVeteransTwoView,
  defence_workforce_strategies: PublicSafetyDefenceWorkforceStrategiesView,
  defence_update_2025_strategies: PublicSafetyDefenceStrategyUpdatesView,
  defence_existing_strategies: PublicSafetyDefenceExistingStrategiesView,
  defence_federal_initiatives: PublicSafetyDefenceFederalInitiativesView,
  fes: PublicSafetyFesView,
  fes_industry_overview: PublicSafetyFesOverviewView,
  fes_industry_profile: PublicSafetyFesProfileView,
  fes_workforce_insights: PublicSafetyFesWorkforceInsightsView,
  fes_disaster_recovery: PublicSafetyFesDisasterRecoveryView,
  fes_disaster_recovery_2: PublicSafetyFesDisasterRecoveryTwoView,
};

export {
  PublicSafetyExecutiveSummaryView,
  PublicSafetyIntroductionView,
  PublicSafetyAboutView,
  PublicSafetyMethodologyView,
  PublicSafetyDriversOverviewView,
  PublicSafetyDriverDetailView,
  PublicSafetyCrossSectorAnalysisView,
  PublicSafetyCoreSkillAlignmentView,
  PublicSafetySpecialistSkillAlignmentView,
  PublicSafetySkillsRecognitionView,
  PublicSafetyDefenceView,
  PublicSafetyDefenceOverviewView,
  PublicSafetyDefenceProfileView,
  PublicSafetyDefenceWorkforceInsightsView,
  PublicSafetyDefenceEmergingTechnologyView,
  PublicSafetyDefenceEmergingTechnologyTwoView,
  PublicSafetyDefenceTransitioningVeteransView,
  PublicSafetyDefenceTransitioningVeteransTwoView,
  PublicSafetyDefenceWorkforceStrategiesView,
  PublicSafetyDefenceStrategyUpdatesView,
  PublicSafetyDefenceExistingStrategiesView,
  PublicSafetyDefenceFederalInitiativesView,
  PublicSafetyFesView,
  PublicSafetyFesOverviewView,
  PublicSafetyFesProfileView,
  PublicSafetyFesWorkforceInsightsView,
  PublicSafetyFesDisasterRecoveryView,
  PublicSafetyFesDisasterRecoveryTwoView,
};
