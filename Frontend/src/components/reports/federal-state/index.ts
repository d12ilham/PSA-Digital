import FederalStateExecutiveSummaryView from "./views/FederalStateExecutiveSummaryView";
import FederalStateIntroductionView from "./views/FederalStateIntroductionView";
import FederalStateAboutView from "./views/FederalStateAboutView";
import FederalStateMethodologyView from "./views/FederalStateMethodologyView";
import FederalStateDriversOfChangeView from "./views/FederalStateDriversOfChangeView";
import FederalStateIndustryOverviewView from "./views/FederalStateIndustryOverviewView";
import FederalStateStateTerritoryView from "./views/FederalStateStateTerritoryView";
import FederalStateIndustryProfileView from "./views/FederalStateIndustryProfileView";
import FederalStateActProfileView from "./views/FederalStateActProfileView";
import FederalStateNswProfileView from "./views/FederalStateNswProfileView";
import FederalStateNtProfileView from "./views/FederalStateNtProfileView";
import FederalStateQldProfileView from "./views/FederalStateQldProfileView";
import FederalStateSaProfileView from "./views/FederalStateSaProfileView";
import FederalStateTasProfileView from "./views/FederalStateTasProfileView";
import FederalStateVicProfileView from "./views/FederalStateVicProfileView";
import FederalStateWaProfileView from "./views/FederalStateWaProfileView";
import FederalStateWorkforceInsightsView from "./views/FederalStateWorkforceInsightsView";
import FederalStateWorkforceInsightOneView from "./views/FederalStateWorkforceInsightOneView";
import FederalStateWorkforceInsightTwoView from "./views/FederalStateWorkforceInsightTwoView";
import FederalStateWorkforceInsightThreeView from "./views/FederalStateWorkforceInsightThreeView";
import FederalStateProposedStrategiesView from "./views/FederalStateProposedStrategiesView";
import FederalStateUpdate2025StrategiesView from "./views/FederalStateUpdate2025StrategiesView";
import FederalState2025ProjectView from "./views/FederalState2025ProjectView";
import FederalStateExistingStrategiesView from "./views/FederalStateExistingStrategiesFrameView";
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
  industry_profile_act: FederalStateActProfileView,
  industry_profile_nsw: FederalStateNswProfileView,
  industry_profile_nt: FederalStateNtProfileView,
  industry_profile_qld: FederalStateQldProfileView,
  industry_profile_sa: FederalStateSaProfileView,
  industry_profile_tas: FederalStateTasProfileView,
  industry_profile_vic: FederalStateVicProfileView,
  industry_profile_wa: FederalStateWaProfileView,
  workforce_insights: FederalStateWorkforceInsightsView,
  workforce_insight_1: FederalStateWorkforceInsightOneView,
  workforce_insight_2: FederalStateWorkforceInsightTwoView,
  workforce_insight_3: FederalStateWorkforceInsightThreeView,
  workforce_strategies: FederalStateProposedStrategiesView,
  proposed_strategies: FederalStateProposedStrategiesView,
  update_2025_strategies: FederalStateUpdate2025StrategiesView,
  workforce_strategies_2025: FederalStateUpdate2025StrategiesView,
  update_2025_project_1: FederalState2025ProjectView,
  update_2025_project_2: FederalState2025ProjectView,
  update_2025_project_3: FederalState2025ProjectView,
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
