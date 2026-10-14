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
| LG-025 | P1 | In progress | `src/data/federalInitiatives.json` exists. Added the omitted Closing the Gap entry. The other 13 entries still require title, owner/date, description and impact comparison against PDF pages 48–58. |
| LG-026 | P1 | Pending | Complete page-by-page rendered-site comparison with PDF pages 5–59, including figures, charts, wording, inline markers and full footnotes. |

Verification so far: TypeScript `tsc --noEmit` and `git diff --check` pass. The corrected Industry Profile, NT state panel and first federal initiative were opened in the local app. The frontend's report API request returns 404 without the backend, so the dev overlay shows an error while fallback report content renders. These spot checks do not constitute final PDF-wide QA sign-off.
