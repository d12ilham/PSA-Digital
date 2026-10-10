import CorrectionalServicesAboutView from "./views/CorrectionalServicesAboutView";
import CorrectionalServicesDriversOfChangeView from "./views/CorrectionalServicesDriversOfChangeView";
import CorrectionalServicesExecutiveSummaryView from "./views/CorrectionalServicesExecutiveSummaryView";
import CorrectionalServicesExistingStrategiesView from "./views/CorrectionalServicesExistingStrategiesView";
import CorrectionalServicesFederalInitiativesView from "./views/CorrectionalServicesFederalInitiativesView";
import CorrectionalServicesIndustryOverviewView from "./views/CorrectionalServicesIndustryOverviewView";
import CorrectionalServicesIndustryProfileView from "./views/CorrectionalServicesIndustryProfileView";
import CorrectionalServicesIntroductionView from "./views/CorrectionalServicesIntroductionView";
import CorrectionalServicesLookingForwardView from "./views/CorrectionalServicesLookingForwardView";
import CorrectionalServicesMethodologyView from "./views/CorrectionalServicesMethodologyView";
import CorrectionalServicesStateTerritoryView from "./views/CorrectionalServicesStateTerritoryView";
import CorrectionalServicesUpdate2025StrategiesView from "./views/CorrectionalServicesUpdate2025StrategiesView";
import CorrectionalServicesWorkforceInsightsView from "./views/CorrectionalServicesWorkforceInsightsView";
import CorrectionalServicesWorkforceStrategiesView from "./views/CorrectionalServicesWorkforceStrategiesView";

export const correctionalServicesViews: Record<string, React.ComponentType<{ slug: string; report: any }>> = {
  about: CorrectionalServicesAboutView,
  drivers_of_change: CorrectionalServicesDriversOfChangeView,
  executive_summary: CorrectionalServicesExecutiveSummaryView,
  existing_strategies: CorrectionalServicesExistingStrategiesView,
  federal_initiatives: CorrectionalServicesFederalInitiativesView,
  industry_overview: CorrectionalServicesIndustryOverviewView,
  industry_profile: CorrectionalServicesIndustryProfileView,
  introduction: CorrectionalServicesIntroductionView,
  looking_forward: CorrectionalServicesLookingForwardView,
  methodology: CorrectionalServicesMethodologyView,
  state_territory: CorrectionalServicesStateTerritoryView,
  update_2025_strategies: CorrectionalServicesUpdate2025StrategiesView,
  workforce_insights: CorrectionalServicesWorkforceInsightsView,
  workforce_strategies: CorrectionalServicesWorkforceStrategiesView,
};

export {
  CorrectionalServicesAboutView,
  CorrectionalServicesDriversOfChangeView,
  CorrectionalServicesExecutiveSummaryView,
  CorrectionalServicesExistingStrategiesView,
  CorrectionalServicesFederalInitiativesView,
  CorrectionalServicesIndustryOverviewView,
  CorrectionalServicesIndustryProfileView,
  CorrectionalServicesIntroductionView,
  CorrectionalServicesLookingForwardView,
  CorrectionalServicesMethodologyView,
  CorrectionalServicesStateTerritoryView,
  CorrectionalServicesUpdate2025StrategiesView,
  CorrectionalServicesWorkforceInsightsView,
  CorrectionalServicesWorkforceStrategiesView,
};
