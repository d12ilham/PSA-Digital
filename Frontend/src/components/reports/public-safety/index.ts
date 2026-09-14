import PublicSafetyExecutiveSummaryView from "./views/PublicSafetyExecutiveSummaryView";
import PublicSafetyIntroductionView from "./views/PublicSafetyIntroductionView";

export const publicSafetyViews: Record<string, React.ComponentType<{ slug: string; report: any }>> = {
  executive_summary: PublicSafetyExecutiveSummaryView,
  introduction: PublicSafetyIntroductionView,
};

export {
  PublicSafetyExecutiveSummaryView,
  PublicSafetyIntroductionView,
};
