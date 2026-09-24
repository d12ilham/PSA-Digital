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
};
