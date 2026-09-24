import PublicSafetyExecutiveSummaryView from "./views/PublicSafetyExecutiveSummaryView";
import PublicSafetyIntroductionView from "./views/PublicSafetyIntroductionView";
import PublicSafetyAboutView from "./views/PublicSafetyAboutView";
import PublicSafetyMethodologyView from "./views/PublicSafetyMethodologyView";
import type { PublicSafetyReport } from "./views/PublicSafetyPageShell";

export const publicSafetyViews: Record<string, React.ComponentType<{ slug: string; report: PublicSafetyReport; pageType?: string }>> = {
  executive_summary: PublicSafetyExecutiveSummaryView,
  introduction: PublicSafetyIntroductionView,
  about: PublicSafetyAboutView,
  methodology: PublicSafetyMethodologyView,
};

export {
  PublicSafetyExecutiveSummaryView,
  PublicSafetyIntroductionView,
  PublicSafetyAboutView,
  PublicSafetyMethodologyView,
};
