import IntroductionView from "./views/IntroductionView";
import AboutView from "./views/AboutView";
import MethodologyView from "./views/MethodologyView";
import ExecutiveSummaryView from "./views/ExecutiveSummaryView";
import DriversOfChangeView from "./views/DriversOfChangeView";
import IndustryOverviewView from "./views/IndustryOverviewView";
import StateTerritoryView from "./views/StateTerritoryView";
import IndustryProfileView from "./views/IndustryProfileView";
import WorkforceInsightsView from "./views/WorkforceInsightsView";
import ProposedStrategies2026View from "./views/ProposedStrategies2026View";
import ExistingStrategiesView from "./views/ExistingStrategiesView";
import ExistingIndustryStrategiesView from "./views/ExistingIndustryStrategiesView";
import FederalGovernmentInitiativesView from "./views/FederalGovernmentInitiativesView";
import LookingForwardView from "./views/LookingForwardView";
import DownloadsAndReferenceView from "./views/DownloadsAndReferenceView";

export const localGovernmentViews: Record<string, React.ComponentType<{ slug: string; report: any; pageType?: string }>> = {
  introduction: IntroductionView,
  about: AboutView,
  methodology: MethodologyView,
  executive_summary: ExecutiveSummaryView,
  drivers_of_change: DriversOfChangeView,
  industry_overview: IndustryOverviewView,
  state_territory: StateTerritoryView,
  industry_profile: IndustryProfileView,
  workforce_insights: WorkforceInsightsView,
  workforce_strategies: ProposedStrategies2026View,
  proposed_strategies: ProposedStrategies2026View,
  update_2025_strategies: ExistingStrategiesView,
  workforce_strategies_2025: ExistingStrategiesView,
  existing_strategies: ExistingIndustryStrategiesView,
  existing_industry_strategies: ExistingIndustryStrategiesView,
  federal_initiatives: FederalGovernmentInitiativesView,
  federal_government_initiatives: FederalGovernmentInitiativesView,
  looking_forward: LookingForwardView,
  "2027_and_beyond": LookingForwardView,
  downloads: DownloadsAndReferenceView,
  downloads_and_reference: DownloadsAndReferenceView,
  download_pdf: DownloadsAndReferenceView,
  downloads_reference: DownloadsAndReferenceView,
  download: DownloadsAndReferenceView,
};

export {
  IntroductionView,
  AboutView,
  MethodologyView,
  ExecutiveSummaryView,
  DriversOfChangeView,
  IndustryOverviewView,
  StateTerritoryView,
  IndustryProfileView,
  WorkforceInsightsView,
  ProposedStrategies2026View,
  ExistingStrategiesView,
  ExistingIndustryStrategiesView,
  FederalGovernmentInitiativesView,
  LookingForwardView,
  DownloadsAndReferenceView,
};
