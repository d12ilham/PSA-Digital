import FederalStateExecutiveSummaryView from "./views/FederalStateExecutiveSummaryView";
import FederalStateIntroductionView from "./views/FederalStateIntroductionView";
import FederalStateAboutView from "./views/FederalStateAboutView";
import FederalStateMethodologyView from "./views/FederalStateMethodologyView";
import FederalStateDriversOfChangeView from "./views/FederalStateDriversOfChangeView";
import FederalStateIndustryOverviewView from "./views/FederalStateIndustryOverviewView";
import FederalStateStateTerritoryView from "./views/FederalStateStateTerritoryView";
import FederalStateIndustryProfileView from "./views/FederalStateIndustryProfileView";
import FederalStateWorkforceInsightsView from "./views/FederalStateWorkforceInsightsView";
import FederalStateProposedStrategiesView from "./views/FederalStateProposedStrategiesView";
import FederalStateExistingStrategiesView from "./views/FederalStateExistingStrategiesView";
import FederalStateInitiativesView from "./views/FederalStateInitiativesView";
import FederalStateLookingForwardView from "./views/FederalStateLookingForwardView";
import FederalStateDownloadsView from "./views/FederalStateDownloadsView";
import FederalStateLandingView from "./views/FederalStateLandingView";

export const federalStateViews: Record<
  string,
  React.ComponentType<{ slug: string; report: any; pageType?: string }>
> = {
  introduction: FederalStateIntroductionView,
  about: FederalStateAboutView,
  methodology: FederalStateMethodologyView,
  executive_summary: FederalStateExecutiveSummaryView,
  drivers_of_change: FederalStateDriversOfChangeView,
  industry_overview: FederalStateIndustryOverviewView,
  state_territory: FederalStateStateTerritoryView,
  industry_profile: FederalStateIndustryProfileView,
  workforce_insights: FederalStateWorkforceInsightsView,
  workforce_strategies: FederalStateProposedStrategiesView,
  proposed_strategies: FederalStateProposedStrategiesView,
  update_2025_strategies: FederalStateExistingStrategiesView,
  workforce_strategies_2025: FederalStateExistingStrategiesView,
  existing_strategies: FederalStateExistingStrategiesView,
  existing_industry_strategies: FederalStateExistingStrategiesView,
  federal_initiatives: FederalStateInitiativesView,
  federal_government_initiatives: FederalStateInitiativesView,
  looking_forward: FederalStateLookingForwardView,
  "2027_and_beyond": FederalStateLookingForwardView,
  downloads: FederalStateDownloadsView,
  downloads_and_reference: FederalStateDownloadsView,
  downloads_reference: FederalStateDownloadsView,
  download_pdf: FederalStateDownloadsView,
  download: FederalStateDownloadsView,
};

export {
  FederalStateExecutiveSummaryView,
  FederalStateIntroductionView,
  FederalStateAboutView,
  FederalStateMethodologyView,
  FederalStateDriversOfChangeView,
  FederalStateIndustryOverviewView,
  FederalStateStateTerritoryView,
  FederalStateIndustryProfileView,
  FederalStateWorkforceInsightsView,
  FederalStateProposedStrategiesView,
  FederalStateExistingStrategiesView,
  FederalStateInitiativesView,
  FederalStateLookingForwardView,
  FederalStateDownloadsView,
  FederalStateLandingView,
};
