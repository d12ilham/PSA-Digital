import CorrectionalServicesExecutiveSummaryView from "./views/CorrectionalServicesExecutiveSummaryView";
import CorrectionalServicesIntroductionView from "./views/CorrectionalServicesIntroductionView";

export const correctionalServicesViews: Record<string, React.ComponentType<{ slug: string; report: any }>> = {
  executive_summary: CorrectionalServicesExecutiveSummaryView,
  introduction: CorrectionalServicesIntroductionView,
};

export {
  CorrectionalServicesExecutiveSummaryView,
  CorrectionalServicesIntroductionView,
};
