import FederalStateExecutiveSummaryView from "./views/FederalStateExecutiveSummaryView";
import FederalStateIntroductionView from "./views/FederalStateIntroductionView";

export const federalStateViews: Record<string, React.ComponentType<{ slug: string; report: any }>> = {
  executive_summary: FederalStateExecutiveSummaryView,
  introduction: FederalStateIntroductionView,
};

export {
  FederalStateExecutiveSummaryView,
  FederalStateIntroductionView,
};
