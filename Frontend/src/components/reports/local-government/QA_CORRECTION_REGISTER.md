# Local Government WIR QA Correction Register

Source of truth: `PSA_Local Government Workforce Insights Report 2026_2A_01_FINAL_FOR_ARTWORK_APPROVAL (2).pdf` (68 PDF pages). The pasted correction register has 26 items, LG-001 through LG-026. This is implementation QA against the approved report, not a re-validation of its research.

Status below separates code correction from final sign-off. A corrected item remains open for the report-wide visual and content pass until it has been checked against the PDF in the rendered site.

| IDs | Priority | Code correction | Developer / QA notes |
| --- | --- | --- | --- |
| LG-001 | P0 | Implemented | First Nations representation now 8.2%. |
| LG-002–LG-007 | P0 | Implemented | Replaced NT, QLD, SA, TAS, VIC and WA workforce shortage records from PDF pages 15–19. |
| LG-008 | P0 | Implemented | Compare chart now reads state employee data and derives bar width from values. |
| LG-009 | P1 | Implemented | First Nations citation corrected to Table D2. |
| LG-010–LG-012 | P0/P1 | Implemented | Corrected both Industry Profile datasets, recalculated heights and removed QA placeholder captions. |
| LG-013–LG-017 | P0/P1/P2 | Implemented | Corrected Theme 2 wording, monetary value and insight; replaced Contextualisation insight; added footnotes 34–36. |
| LG-018–LG-020 | P1/P2 | Implemented | Corrected strategy impact, timing and stakeholder list. |
| LG-021–LG-024 | P1 | Implemented | Added or restored numbered inline markers and source text in Overview, State/Territory, Theme 1 and Drivers. |
| LG-025 | P1 | Implemented; visual review open | `src/data/federalInitiatives.json` contains all 14 initiatives. Titles, owner/date, descriptions and impact text were compared with PDF pages 48–58 and the condensed entries were expanded to the approved content. Entries 01 and 13 were checked in the rendered panel; all 14 still need individual visual sign-off. |
| LG-026 | P1 | In progress | Targeted PDF/code checks covered About footnote 1, Executive Summary footnote 2, Drivers footnotes 4–8, Overview footnotes 9–17, State/Territory data, Industry Profile charts and federal initiatives. Complete the remaining page-by-page rendered-site comparison with PDF pages 5–59 before sign-off. |

## Current pass: additional findings

| Area | Correction / remaining action |
| --- | --- |
| Executive Summary | Restored inline footnote 2 and its full definition from PDF page 6. Remaining wording and interaction states still need rendered QA. |
| Drivers of Change | Expanded references 4–8 to the approved citation text and corrected `system-level`. Remaining driver and megatrend states need rendered QA. |
| Industry Profile | Replaced the two digital bar charts with line charts as shown on PDF pages 20 and 22. The employment axis is 190,000–220,000, training is 0–1,000, and the NCVER source line is complete. Both charts were checked in the rendered desktop view; mobile remains open. |
| Commonwealth Government Initiatives | Replaced condensed initiative descriptions and impacts with the approved PDF content. First and thirteenth entries were inspected in the rendered desktop panel; the other entries and mobile state remain open. |
| Downloads & References | Removed download actions/affordances that had no target. The approved 2026 PDF and prior-report URLs still need to be supplied and configured before downloads can be signed off. Do not publish the local artwork-approval PDF by assumption. |

Verification so far: TypeScript `tsc --noEmit` and `git diff --check` pass. The corrected Industry Profile, NT state panel and first federal initiative were opened in the local app. The frontend's report API request returns 404 without the backend, so the dev overlay shows an error while fallback report content renders. These spot checks do not constitute final PDF-wide QA sign-off.

## Page-by-page QA checklist

"Targeted correction" means the listed issue was addressed in code; it does not mean every word, state and viewport on that page has been approved.

| Component | PDF pages | Status | Remaining verification |
| --- | --- | --- | --- |
| AboutView | 5 | Targeted check | Full wording and rendered footnote 1. |
| ExecutiveSummaryView | 6–7 | Targeted correction | Full summary wording, interactions and footnote 2 in rendered view. |
| IntroductionView | 8 | Open | Headings, structure table and wording. |
| MethodologyView | 9–10 | Targeted check | Consultation organisations, governance text and footnote 3 in rendered view. |
| DriversOfChangeView | 11–12 | Targeted correction | Nine megatrends, four drivers and all interactive states. |
| IndustryOverviewView | 13–14 | Targeted correction | Every headline metric and footnotes 9–17 in rendered view. |
| StateTerritoryView | 15–19 | Targeted correction | All state panels, map, comparison charts, sources and footnotes 18–26. |
| IndustryProfileView | 20–22 | Targeted correction | Mobile chart layout, source display and full page content. |
| WorkforceInsightsView | 23 | Open | Seven labels and navigation. |
| Theme1InsightSubView | 23–27 | Targeted correction | All shortage lists, text and footnotes 27–33. |
| Theme2InsightSubView | 28–29 | Targeted correction | Full text, interactions and footnotes 34–36. |
| ContextualisationSubView | 30 | Targeted correction | Full page wording and rendered insight panel. |
| ProposedStrategies2026View | 31–32 | Targeted correction | Every strategy field and stakeholder. |
| ExistingStrategiesView | 33–35 | Open | Challenges, project descriptions, next steps and table. |
| ExistingIndustryStrategiesView | 36–47 | Open | Every title, owner/date, description and impact. |
| FederalGovernmentInitiativesView | 48–58 | Targeted correction | Render and inspect all 14 initiatives and mobile layout. |
| LookingForwardView | 59 | Open | All bullets and closing text. |
| DownloadsAndReferenceView | Digital only | Blocked on URLs | Configure approved PDF and prior-report links; then test downloads. |
