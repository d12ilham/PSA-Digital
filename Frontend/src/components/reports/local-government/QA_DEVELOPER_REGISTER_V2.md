# Local Government WIR: Developer QA Register V2

This is a task list transcribed from the `Page-by-Page Register` tab of `PSA_LG_WIR_Reconciled_QA_Developer_Register_V2.xlsx`, reconciled with `PSA_LG_WIR_Addendum_Commonwealth_Initiatives.xlsx`. The approved Local Government WIR PDF remains the content source of truth. The workbook supplies the exact approved wording, source URLs and strategy reference text; this Markdown file does not replace those source tabs.

The original worksheet contains 43 IDs: 42 Open and 1 Blocked (16 P0, 19 P1, 8 P2). The later addendum clears the Blocked JSON dependency for LG-V2-042. Statuses below reflect implementation progress where noted; other rows retain their workbook/addendum statuses. An implemented item still requires rendered-page QA before sign-off. Rows retain the worksheet's order, including its early Executive Summary rows. Printed report page numbers are used. Links open the containing local report page; for rows spanning several tabs or panels, select the named state in the page. Local links require the development server on port 3000.

| ID | Priority | Printed page | Page / section | Required work | Local report page | Status |
| --- | --- | ---: | --- | --- | --- | --- |
| LG-V2-001 | P2 | 6 | Introduction | Replaced the opening paragraph verbatim, including `(the Report)` and `fourth report`; layout unchanged. | [Introduction](http://localhost:3000/reports/local-government-workforce-insights-report/introduction) | Implemented; rendered QA pending |
| LG-V2-002 | P2 | 6 | Introduction: Digital Report Structure | Replaced source-style descriptions with approved Structure wording while retaining digital cards and routes; checked desktop layout. | [Introduction](http://localhost:3000/reports/local-government-workforce-insights-report/introduction) | Implemented; desktop checked |
| LG-V2-003 | P1 | 4 | Executive Summary: Strategy 1 detail | Strategy 1 title, objective, expanded fields and stakeholders now use one approved p29 content object shared with the detailed page; desktop expansion checked. | [Executive Summary](http://localhost:3000/reports/local-government-workforce-insights-report/executive_summary) | Implemented; desktop checked |
| LG-V2-004 | P1 | 5 | Executive Summary: Strategy 2 detail | Synced Strategy 2 with approved p30 content, separated all seven stakeholders and added Part A/Part B timing. Before/after desktop screenshots saved below. | [Executive Summary](http://localhost:3000/reports/local-government-workforce-insights-report/executive_summary) | Implemented; desktop checked |
| LG-V2-005 | P0 | 8 | Methodology: footnote 3 | Restored the full approved footnote 3 ending and label; retained the 280³ marker. Before/after screenshots saved below. | [Methodology](http://localhost:3000/reports/local-government-workforce-insights-report/methodology) | Implemented; desktop checked |
| LG-V2-006 | P2 | 7 | Methodology: representatives | Corrected the South Australian association acronym to `LGA SA`; before/after desktop screenshots saved below. | [Methodology](http://localhost:3000/reports/local-government-workforce-insights-report/methodology) | Implemented; desktop checked |
| LG-V2-007 | P1 | 10 | Drivers of Change: footnotes 4-8 | Linked citations 4–8 to the exact `Source Link Matrix` URLs, retaining numbering and full citation text in the driver panels and Sources section. Before/after screenshots saved below. | [Drivers of Change](http://localhost:3000/reports/local-government-workforce-insights-report/drivers_of_change) | Implemented; desktop checked |
| LG-V2-008 | P1 | 11 | Industry-Sector Overview: footnotes 9-12 | Linked footnotes 9–12 to the exact ALGA URLs in `Source Link Matrix`, retaining the approved citation wording. Footnote 10 was corrected during LG-V2-009 and appears in its after screenshot. | [Industry Overview](http://localhost:3000/reports/local-government-workforce-insights-report/industry_overview) | Implemented; desktop checked |
| LG-V2-009 | P1 | 12 | Industry-Sector Overview: footnotes 13-17 | Linked footnotes 13–17 to the exact `Source Link Matrix` URLs, including both links in footnotes 15 and 17; retained approved citation wording. Also corrected the missing footnote 10 link from LG-V2-008. Before/after screenshots saved below. | [Industry Overview](http://localhost:3000/reports/local-government-workforce-insights-report/industry_overview) | Implemented; desktop checked |
| LG-V2-010 | P1 | 13 | State and Territory Workforce Profile: sources 18-26 | Linked state council footnotes 18–24 and national footnotes 25–26 to the exact `Source Link Matrix` URLs; restored full approved wording for 21 and 23; linked the ABS chart/map source. Checked all seven state links plus national, QLD and VIC rendered views. Before/after screenshots saved below. | [State & Territory](http://localhost:3000/reports/local-government-workforce-insights-report/state_territory) | Implemented; desktop checked |
| LG-V2-011 | P1 | 18 | Industry Profile: Employment Growth | Restored the approved source wording, including `2025, releases 2020–2025`, and linked it to the exact ABS URL in `Source Link Matrix`. Before/after screenshots saved below. | [Industry Profile](http://localhost:3000/reports/local-government-workforce-insights-report/industry_profile) | Implemented; desktop checked |
| LG-V2-012 | P1 | 19 | Industry Profile: Asset Management | Removed the extra one-third statistic; retained the approved 77% and $643 billion figures; restored `Source: ALGA, 2024 National State of the Assets Report, 2024, pg. 5 & 8` with the exact Source Link Matrix URL. Before/after screenshots saved below. | [Industry Profile](http://localhost:3000/reports/local-government-workforce-insights-report/industry_profile) | Implemented; desktop checked |
| LG-V2-013 | P1 | 20 | Industry Profile: Training Package chart | Replaced the heading and figure caption with the approved `Local Government Training Package Enrolments and Completions` title and linked the NCVER DataBuilder source to the exact `Source Link Matrix` URL. Kept all 2019–2024 values. Before/after screenshots saved below. | [Industry Profile](http://localhost:3000/reports/local-government-workforce-insights-report/industry_profile) | Implemented; desktop checked |
| LG-V2-014 | P1 | 21 | Workforce Insights: Theme 1 Insight 2 | Changed the overview card to `technological advancements` to match the approved PDF; retained the Executive Summary's distinct `technological advances` wording. Before/after screenshots saved below. | [Workforce Insights](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights) | Implemented; desktop checked |
| LG-V2-015 | P0 | 21 | Workforce Insights: Theme 1 Insight 3 | Replaced the Emergency Management overview statement with the approved PDF p21 wording about national shortage occupations and Local Government specific shortages. Before/after screenshots saved below. | [Workforce Insights](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights) | Implemented; desktop checked |
| LG-V2-016 | P1 | 21 | Workforce Insights: Theme 2 Insight 1 | Replaced the expanded TAFE/RTO overview wording with the approved PDF p21 sentence: `Access to TAFE or RTO in regional, rural and remote locations is limited`. Before/after screenshots saved below. | [Workforce Insights](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights) | Implemented; desktop checked |
| LG-V2-017 | P1 | 21 | Workforce Insights: Theme 2 Insight 3 | Restore the full approved sentence about limited training budgets, enrolment costs and travel to/from training. | [Workforce Insights](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights) | Open |
| LG-V2-018 | P1 | 21 | Theme 1: context and footnotes 27-28 | Restored the approved PDF p21 Theme context and full footnotes 27–28, including repeated committee/publisher wording; linked the two inquiries and Interim Report to the exact `Source Link Matrix` URLs. Before/after screenshots saved below. | [Theme 1](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights?insight=theme1-insight1) | Implemented; desktop checked |
| LG-V2-019 | P1 | 21 | Theme 1: Insight 2 heading | Changed the detailed heading to `technological advancements` to match the approved PDF p21; retained the Executive Summary's distinct wording. Before/after screenshots saved below. | [Theme 1 Insight 2](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights?insight=theme1-insight2) | Implemented; desktop checked |
| LG-V2-020 | P0 | 21 | Theme 1: Insight 3 heading | Replaced the Emergency Management heading with the approved PDF p21 statement about national shortage occupations and Local Government specific shortages. Before/after screenshots saved below. | [Theme 1 Insight 3](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights?insight=theme1-insight3) | Implemented; desktop checked |
| LG-V2-021 | P1 | 23 | Theme 1: footnotes 29-33 | Restored the approved PDF pp23–24 citation text, including publisher repetitions and page references, for footnotes 29–33; linked all five citations to the exact `Source Link Matrix` URLs. Insight 2 and Insight 3 before/after screenshots saved below. | [Theme 1 Insight 2](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights?insight=theme1-insight2) · [Insight 3](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights?insight=theme1-insight3) | Implemented; desktop checked |
| LG-V2-022 | P2 | 22 | Theme 1 detail | Removed the two extra 2026 report self-citations from Insight 1 and Insight 3; neither appears in the approved PDF. Kept the approved numbered footnotes. Before/after screenshots saved below. | [Theme 1 Insight 1](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights?insight=theme1-insight1) · [Insight 3](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights?insight=theme1-insight3) | Implemented; desktop checked |
| LG-V2-023 | P1 | 26 | Theme 2: footnotes 34-36 | Restored the approved PDF p26 publisher wording in footnotes 34–36 and linked each source to its exact `Source Link Matrix` URL. Before/after screenshots saved below. | [Theme 2 Insight 1](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights?insight=theme2-insight1) | Implemented; desktop checked |
| LG-V2-024 | P1 | 26 | Theme 2: Insights 1-4 | Show the shared Industry Insight once after Insight 4, instead of repeating it on all four detail views. | [Theme 2](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights?insight=theme2-insight1) | Implemented; desktop checked. Industry Insight appears once below Insight 4 and is absent from Insights 1–3. Before/after screenshots saved for all four views. |
| LG-V2-025 | P2 | 26 | Theme 2: Insights 1-4 | Remove four extra `Source: PSA, 2026 LG WIR...` self-citations unless approved as digital-only UI. | [Theme 2](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights?insight=theme2-insight1) | Implemented; desktop checked. Removed the four self-citations; retained the numbered footnotes and Industry Insight attribution. Before/after screenshots saved for all four views. |
| LG-V2-026 | P2 | 27 | Theme 2: Insight 4 | Restore the `Non-Tailored delivery options:` subheading before its paragraph. | [Theme 2 Insight 4](http://localhost:3000/reports/local-government-workforce-insights-report/workforce_insights?insight=theme2-insight4) | Implemented; desktop checked. Restored the subheading before the paragraph. Before/after screenshots saved below. |
| LG-V2-027 | P1 | 29 | 2026 Proposed Strategies: Strategy 1 | Shared Strategy 1 fields now use approved p29 wording; the detailed page still needs its own rendered QA. | [Proposed Strategies](http://localhost:3000/reports/local-government-workforce-insights-report/proposed_strategies) | Complete; rendered desktop QA passed. Title, workforce insight, JSC function, objective, approach, deliverable, impact, timing and all six stakeholders match approved p29. Open/close interaction passed; no further content edit needed. Before/after QA screenshots saved below. |
| LG-V2-028 | P2 | 30 | 2026 Proposed Strategies: Strategy 2 | Shared Strategy 2 fields now use approved p30 wording, including the title; detailed-page rendered QA remains open. | [Proposed Strategies](http://localhost:3000/reports/local-government-workforce-insights-report/proposed_strategies) | Complete; rendered desktop QA passed. Confirmed approved title, objective, workforce insight, JSC function, both approach parts, deliverables, impact, timing and seven stakeholders. Restored the PDF's single `Approach:` heading with Part A and optional Part B labels. Before/after screenshots saved below. |
| LG-V2-029 | P0 | 34 | Existing Strategies: 2026 Workforce Skills and Capability Survey | Replace title, owner/date, description and `How this informs` text with approved p34 wording. | [Existing Strategies](http://localhost:3000/reports/local-government-workforce-insights-report/existing_strategies) | Implemented; desktop checked. Title and ALGA/timing already matched; replaced the condensed description and all three `How this informs` summaries with the exact `Existing Strategies Reference` text from approved p34. Before/after screenshots saved below. |
| LG-V2-030 | P0 | 35 | Existing Strategies: Parliamentary Inquiry into Local Government Sustainability | Replace title, owner/date, description and `How this informs` text with approved p35 wording. | [Existing Strategies](http://localhost:3000/reports/local-government-workforce-insights-report/existing_strategies) | Implemented; desktop checked. Title and committee/status already matched; replaced the condensed description and all three `How this informs` summaries with the exact `Existing Strategies Reference` text from approved p35. Before/after screenshots saved below. |
| LG-V2-031 | P0 | 36 | Existing Strategies: Parliamentary Inquiry into Local Government Funding and Fiscal Sustainability | Replace title, owner/date, description and `How this informs` text with approved p36 wording. | [Existing Strategies](http://localhost:3000/reports/local-government-workforce-insights-report/existing_strategies) | Implemented; desktop checked. Title and committee/status already matched; replaced the condensed description and all three `How this informs` summaries with the exact `Existing Strategies Reference` text from approved p36. Before/after screenshots saved below. |
| LG-V2-032 | P0 | 37 | Existing Strategies: National Housing Accord 2024-2029 | Replace title, owner/date, description and `How this informs` text with approved p37 wording. | [Existing Strategies](http://localhost:3000/reports/local-government-workforce-insights-report/existing_strategies) | Implemented; desktop checked. Aligned the title date format and replaced the condensed description and all three `How this informs` summaries with the exact `Existing Strategies Reference` text from approved p37. Owner/status already matched. Before/after screenshots saved below. |
| LG-V2-033 | P0 | 38 | Existing Strategies: Queensland Local Government Workforce Strategy 2024-2028 | Replace title, owner/date, description and `How this informs` text with approved p38 wording. | [Existing Strategies](http://localhost:3000/reports/local-government-workforce-insights-report/existing_strategies) | Implemented; desktop checked. Aligned title/date formatting and replaced the abbreviated description and all three `How this informs` summaries with the approved p38 text from `Existing Strategies Reference`. Owner already matched. Before/after screenshots saved below. |
| LG-V2-034 | P0 | 39 | Existing Strategies: Workforce and Gender Equality in South Australian Local Government | Replace title, owner/date, description and `How this informs` text with approved p39 wording. | [Existing Strategies](http://localhost:3000/reports/local-government-workforce-insights-report/existing_strategies) | Implemented; desktop checked. Title, owner and year already matched; replaced the abbreviated description and all three `How this informs` summaries with the approved p39 text from `Existing Strategies Reference`. Before/after screenshots saved below. |
| LG-V2-035 | P0 | 40 | Existing Strategies: 2023 Western Australian Workforce Shortages Survey | Replace title, owner/date, description and `How this informs` text with approved p40 wording. | [Existing Strategies](http://localhost:3000/reports/local-government-workforce-insights-report/existing_strategies) | Implemented; desktop checked. Title, owner and year already matched; replaced the abbreviated description and all three `How this informs` summaries with the approved p40 text from `Existing Strategies Reference`. Before/after screenshots saved below. |
| LG-V2-036 | P0 | 41 | Existing Strategies: Careers at Council | Replace title, owner/date, description and `How this informs` text with approved p41 wording. | [Existing Strategies](http://localhost:3000/reports/local-government-workforce-insights-report/existing_strategies) | Implemented; desktop checked. Restored the seven named associations and Ongoing status, and replaced the abbreviated description and all three `How this informs` summaries with the approved p41 text from `Existing Strategies Reference`. Before/after screenshots saved below. |
| LG-V2-037 | P0 | 42 | Existing Strategies: Earn and Learn Program | Replace title, owner/date, description and `How this informs` text with approved p42 wording. | [Existing Strategies](http://localhost:3000/reports/local-government-workforce-insights-report/existing_strategies) | Implemented; desktop checked. Program name and university list already matched; corrected date formatting and replaced the abbreviated description and all three `How this informs` summaries with approved p42 text from `Existing Strategies Reference`. Before/after screenshots saved below. |
| LG-V2-038 | P0 | 43 | Existing Strategies: Fresh Start Program | Replace title, owner/date, description and `How this informs` text with approved p43 wording. | [Existing Strategies](http://localhost:3000/reports/local-government-workforce-insights-report/existing_strategies) | Implemented; desktop checked. Corrected owner/date from LGNSW and Ongoing to NSW Office of Local Government and 2025 - 2031; replaced the unrelated summary and all three `How this informs` sections with approved p43 text from `Existing Strategies Reference`. Before/after screenshots saved below. |
| LG-V2-039 | P0 | 44 | Existing Strategies: Local Government Association of the Northern Territory Strategic Plan | Replace title, owner/date, description and `How this informs` text with approved p44 wording. | [Existing Strategies](http://localhost:3000/reports/local-government-workforce-insights-report/existing_strategies) | Implemented; desktop checked. Expanded the association name, corrected date formatting, and replaced the abbreviated description and all three `How this informs` summaries with approved p44 text from `Existing Strategies Reference`. Before/after screenshots saved below. |
| LG-V2-040 | P0 | 45 | Existing Strategies: Local Government Association of Tasmania Strategic Plan | Replace title, owner/date, description and `How this informs` text with approved p45 wording. | [Existing Strategies](http://localhost:3000/reports/local-government-workforce-insights-report/existing_strategies) | Implemented; desktop checked. Expanded the association name, corrected date formatting, and replaced the abbreviated description and 2025/2026 strategy sections with approved p45 text from `Existing Strategies Reference`; the consultation text already matched. Before/after screenshots saved below. |
| LG-V2-041 | P1 | 46 | Commonwealth Government Initiatives: heading | Change the digital page heading from `Federal Government Initiatives` to `Commonwealth Government Initiatives`. Duplicated by addendum LG-ADD-001. | [Commonwealth Initiatives](http://localhost:3000/reports/local-government-workforce-insights-report/federal_initiatives) | Implemented; desktop checked. Corrected the heading to match approved p46. The introductory sentence retains `Federal Government initiatives`, as in the approved PDF. Before/after screenshots saved below. |
| LG-V2-042 | P0 | 46-56 | Commonwealth Government Initiatives: 14 JSON records | **No content rewrite required.** The later addendum marks all 14 records as matches. Independently checked each title, complete description and impact against its approved PDF page, and checked each owner/date line. Opened all 14 tabs in order on the digital page. JSON retained unchanged; before and after screenshots are linked below. | [Commonwealth Initiatives](http://localhost:3000/reports/local-government-workforce-insights-report/federal_initiatives) | Verified against PDF and digital page |
| LG-V2-043 | P2 | 57 | 2027 and Beyond: opening paragraph | Change singular `Report` to `Reports` for the 2025 title, and `centerpiece` to `centrepiece`. Restore the approved phrase `to deliver the 2026 Local Government Workforce Insights Report` between those sentences. | [2027 and Beyond](http://localhost:3000/reports/local-government-workforce-insights-report/looking_forward) | Implemented; desktop checked against approved PDF p57. Before/after screenshots saved below. |

## Addendum reconciliation

| Addendum ID | Result | Action |
| --- | --- | --- |
| LG-ADD-001 | Implemented via LG-V2-041 | Changed the digital heading to `Commonwealth Government Initiatives` once. |
| LG-ADD-002 | Verified / No action; resolves LG-V2-042 | Keep the 14 JSON initiative records unchanged unless later source evidence changes. |

## LG-V2-004 screenshots

Full-page desktop captures at 1388 px width with Strategy 2 expanded:

- [Before](../../../../qa-screenshots/local-government/LG-V2-004-before.png)
- [After](../../../../qa-screenshots/local-government/LG-V2-004-after.png)

## LG-V2-005 screenshots

Full-page desktop captures at 1388 px width showing Methodology footnote 3:

- [Before](../../../../qa-screenshots/local-government/LG-V2-005-before.png)
- [After](../../../../qa-screenshots/local-government/LG-V2-005-after.png)

## LG-V2-006 screenshots

Full-page desktop captures at 1388 px width showing the representatives list:

- [Before](../../../../qa-screenshots/local-government/LG-V2-006-before.png)
- [After](../../../../qa-screenshots/local-government/LG-V2-006-after.png)

## LG-V2-007 screenshots

Full-page desktop captures with Driver 3 expanded:

- [Before](../../../../qa-screenshots/local-government/LG-V2-007-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-007-after.jpg)

## LG-V2-008 screenshots

Full-page desktop captures of the Industry-Sector Overview and its Sources section:

- [Before](../../../../qa-screenshots/local-government/LG-V2-008-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-008-after.jpg)

## LG-V2-009 screenshots

Full-page desktop captures of the Industry-Sector Overview before and after linking footnotes 13–17:

- [Before](../../../../qa-screenshots/local-government/LG-V2-009-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-009-after.jpg)

## LG-V2-010 screenshots

Full-page desktop captures of the national view and the Queensland and Victoria citations:

| View | Before | After |
| --- | --- | --- |
| National | [Before](../../../../qa-screenshots/local-government/LG-V2-010-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-010-after.jpg) |
| Queensland | [Before](../../../../qa-screenshots/local-government/LG-V2-010-QLD-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-010-QLD-after.jpg) |
| Victoria | [Before](../../../../qa-screenshots/local-government/LG-V2-010-VIC-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-010-VIC-after.jpg) |

## LG-V2-011 screenshots

Full-page desktop captures of the Industry Profile Employment Growth source:

- [Before](../../../../qa-screenshots/local-government/LG-V2-011-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-011-after.jpg)

## LG-V2-012 screenshots

Full-page desktop captures of Industry Profile Asset Management:

- [Before](../../../../qa-screenshots/local-government/LG-V2-012-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-012-after.jpg)

## LG-V2-013 screenshots

Full-page desktop captures of the Industry Profile training chart:

- [Before](../../../../qa-screenshots/local-government/LG-V2-013-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-013-after.jpg)

## LG-V2-014 screenshots

Full-page desktop captures of Workforce Insights Theme 1 Insight 2:

- [Before](../../../../qa-screenshots/local-government/LG-V2-014-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-014-after.jpg)

## LG-V2-015 screenshots

Full-page desktop captures of Workforce Insights Theme 1 Insight 3:

- [Before](../../../../qa-screenshots/local-government/LG-V2-015-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-015-after.jpg)

## LG-V2-016 screenshots

Full-page desktop captures of Workforce Insights Theme 2 Insight 1:

- [Before](../../../../qa-screenshots/local-government/LG-V2-016-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-016-after.jpg)

## LG-V2-018 screenshots

Full-page desktop captures of Theme 1 Insight 1 context and footnotes 27–28:

- [Before](../../../../qa-screenshots/local-government/LG-V2-018-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-018-after.jpg)

## LG-V2-019 screenshots

Full-page desktop captures of Theme 1 Insight 2:

- [Before](../../../../qa-screenshots/local-government/LG-V2-019-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-019-after.jpg)

## LG-V2-020 screenshots

Full-page desktop captures of Theme 1 Insight 3:

- [Before](../../../../qa-screenshots/local-government/LG-V2-020-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-020-after.jpg)

## LG-V2-021 screenshots

Full-page desktop captures of the two Theme 1 detail pages containing footnotes 29–33:

| Page | Before | After |
| --- | --- | --- |
| Insight 2 (29–32) | [Before](../../../../qa-screenshots/local-government/LG-V2-021-insight2-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-021-insight2-after.jpg) |
| Insight 3 (33) | [Before](../../../../qa-screenshots/local-government/LG-V2-021-insight3-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-021-insight3-after.jpg) |

## LG-V2-022 screenshots

Full-page desktop captures of the two Theme 1 detail pages with extra self-citations:

| Page | Before | After |
| --- | --- | --- |
| Insight 1 | [Before](../../../../qa-screenshots/local-government/LG-V2-022-insight1-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-022-insight1-after.jpg) |
| Insight 3 | [Before](../../../../qa-screenshots/local-government/LG-V2-022-insight3-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-022-insight3-after.jpg) |

## LG-V2-023 screenshots

Full-page desktop captures of Theme 2 Insight 1 footnotes 34–36:

- [Before](../../../../qa-screenshots/local-government/LG-V2-023-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-023-after.jpg)

## LG-V2-024 screenshots

Full-page desktop captures of all four Theme 2 detail views:

| Page | Before | After |
| --- | --- | --- |
| Insight 1 | [Before](../../../../qa-screenshots/local-government/LG-V2-024-insight1-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-024-insight1-after.jpg) |
| Insight 2 | [Before](../../../../qa-screenshots/local-government/LG-V2-024-insight2-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-024-insight2-after.jpg) |
| Insight 3 | [Before](../../../../qa-screenshots/local-government/LG-V2-024-insight3-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-024-insight3-after.jpg) |
| Insight 4 | [Before](../../../../qa-screenshots/local-government/LG-V2-024-insight4-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-024-insight4-after.jpg) |

## LG-V2-025 screenshots

Full-page desktop captures of all four Theme 2 detail views:

| Page | Before | After |
| --- | --- | --- |
| Insight 1 | [Before](../../../../qa-screenshots/local-government/LG-V2-025-insight1-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-025-insight1-after.jpg) |
| Insight 2 | [Before](../../../../qa-screenshots/local-government/LG-V2-025-insight2-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-025-insight2-after.jpg) |
| Insight 3 | [Before](../../../../qa-screenshots/local-government/LG-V2-025-insight3-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-025-insight3-after.jpg) |
| Insight 4 | [Before](../../../../qa-screenshots/local-government/LG-V2-025-insight4-before.jpg) | [After](../../../../qa-screenshots/local-government/LG-V2-025-insight4-after.jpg) |

## LG-V2-026 screenshots

Full-page desktop captures of Theme 2 Insight 4:

- [Before](../../../../qa-screenshots/local-government/LG-V2-026-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-026-after.jpg)

## LG-V2-027 screenshots

Expanded Strategy 1 on the detailed Proposed Strategies page. The before and after captures document the completed QA; the verified content required no edit.

- [Approved PDF p29](../../../../qa-screenshots/local-government/LG-V2-027-approved-p29.png)
- [Before QA](../../../../qa-screenshots/local-government/LG-V2-027-before.jpg)
- [After QA](../../../../qa-screenshots/local-government/LG-V2-027-after.jpg)

## LG-V2-028 screenshots

Expanded Strategy 2 on the detailed Proposed Strategies page:

- [Approved PDF p30](../../../../qa-screenshots/local-government/LG-V2-028-approved-p30.png)
- [Before](../../../../qa-screenshots/local-government/LG-V2-028-before.jpg)
- [After](../../../../qa-screenshots/local-government/LG-V2-028-after.jpg)

## LG-V2-029 screenshots

2026 Local Government Workforce Skills and Capability Survey selected on the Existing Industry-Sector Strategies page:

- [Approved PDF p34](../../../../qa-screenshots/local-government/LG-V2-029-approved-p34.png)
- [Before, full page](../../../../qa-screenshots/local-government/LG-V2-029-before.jpg)
- [Before, opening text](../../../../qa-screenshots/local-government/LG-V2-029-before-top.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-029-after.jpg)
- [After, opening text](../../../../qa-screenshots/local-government/LG-V2-029-after-top.jpg)
- [After, consultation section](../../../../qa-screenshots/local-government/LG-V2-029-after-sections.jpg)
- [After, workforce strategies](../../../../qa-screenshots/local-government/LG-V2-029-after-lower.jpg)

## LG-V2-030 screenshots

Parliamentary Inquiry into Local Government Sustainability selected on the Existing Industry-Sector Strategies page:

- [Approved PDF p35](../../../../qa-screenshots/local-government/LG-V2-030-approved-p35.png)
- [Before](../../../../qa-screenshots/local-government/LG-V2-030-before.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-030-after.jpg)
- [After, title and opening text](../../../../qa-screenshots/local-government/LG-V2-030-after-viewport.jpg)
- [After, detail text](../../../../qa-screenshots/local-government/LG-V2-030-after-bottom.jpg)
- [After, strategy sections](../../../../qa-screenshots/local-government/LG-V2-030-after-sections.jpg)

For LG-V2-029 through LG-V2-040, use the workbook's `Existing Strategies Reference` tab for exact text. For link tasks, use `Source Link Matrix`; do not substitute independently found URLs. After implementation, verify the rendered report page by page against the approved PDF, including content, footnotes, links, visual presentation and interactions. That rendered QA has **not** been completed by creating this list.

## LG-V2-031 screenshots

Parliamentary Inquiry into Local Government Funding and Fiscal Sustainability selected on the Existing Industry-Sector Strategies page:

- [Approved PDF p36](../../../../qa-screenshots/local-government/LG-V2-031-approved-p36.png)
- [Before, full page](../../../../qa-screenshots/local-government/LG-V2-031-before.jpg)
- [Before, opening text](../../../../qa-screenshots/local-government/LG-V2-031-before-top.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-031-after.jpg)
- [After, opening text](../../../../qa-screenshots/local-government/LG-V2-031-after-top.jpg)
- [After, consultation section](../../../../qa-screenshots/local-government/LG-V2-031-after-sections.jpg)
- [After, workforce strategies](../../../../qa-screenshots/local-government/LG-V2-031-after-lower.jpg)

## LG-V2-032 screenshots

National Housing Accord 2024 - 2029 selected on the Existing Industry-Sector Strategies page:

- [Approved PDF p37](../../../../qa-screenshots/local-government/LG-V2-032-approved-p37.png)
- [Before, full page](../../../../qa-screenshots/local-government/LG-V2-032-before.jpg)
- [Before, opening text](../../../../qa-screenshots/local-government/LG-V2-032-before-top.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-032-after.jpg)
- [After, opening text](../../../../qa-screenshots/local-government/LG-V2-032-after-top.jpg)
- [After, consultation section](../../../../qa-screenshots/local-government/LG-V2-032-after-sections.jpg)
- [After, workforce strategies](../../../../qa-screenshots/local-government/LG-V2-032-after-lower.jpg)

## LG-V2-033 screenshots

Queensland Local Government Workforce Strategy 2024 - 2028 selected on the Existing Industry-Sector Strategies page:

- [Approved PDF p38](../../../../qa-screenshots/local-government/LG-V2-033-approved-p38.png)
- [Before, full page](../../../../qa-screenshots/local-government/LG-V2-033-before.jpg)
- [Before, opening text](../../../../qa-screenshots/local-government/LG-V2-033-before-viewport.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-033-after.jpg)
- [After, opening text](../../../../qa-screenshots/local-government/LG-V2-033-after-viewport.jpg)
- [After, consultation section](../../../../qa-screenshots/local-government/LG-V2-033-after-sections.jpg)
- [After, workforce strategies](../../../../qa-screenshots/local-government/LG-V2-033-after-lower.jpg)

## LG-V2-034 screenshots

Workforce and Gender Equality in South Australian Local Government selected on the Existing Industry-Sector Strategies page:

- [Approved PDF p39](../../../../qa-screenshots/local-government/LG-V2-034-approved-p39.png)
- [Before, full page](../../../../qa-screenshots/local-government/LG-V2-034-before.jpg)
- [Before, opening text](../../../../qa-screenshots/local-government/LG-V2-034-before-viewport.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-034-after.jpg)
- [After, opening text](../../../../qa-screenshots/local-government/LG-V2-034-after-viewport.jpg)
- [After, consultation section](../../../../qa-screenshots/local-government/LG-V2-034-after-sections.jpg)
- [After, workforce strategies](../../../../qa-screenshots/local-government/LG-V2-034-after-lower.jpg)

## LG-V2-035 screenshots

2023 Local Government Workforce Shortages Survey in Western Australia selected on the Existing Industry-Sector Strategies page:

- [Approved PDF p40](../../../../qa-screenshots/local-government/LG-V2-035-approved-p40.png)
- [Before, full page](../../../../qa-screenshots/local-government/LG-V2-035-before.jpg)
- [Before, opening text](../../../../qa-screenshots/local-government/LG-V2-035-before-viewport.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-035-after.jpg)
- [After, opening text](../../../../qa-screenshots/local-government/LG-V2-035-after-viewport.jpg)
- [After, consultation section](../../../../qa-screenshots/local-government/LG-V2-035-after-sections.jpg)
- [After, workforce strategies](../../../../qa-screenshots/local-government/LG-V2-035-after-lower.jpg)

## LG-V2-036 screenshots

Careers at Council selected on the Existing Industry-Sector Strategies page:

- [Approved PDF p41](../../../../qa-screenshots/local-government/LG-V2-036-approved-p41.png)
- [Before, full page](../../../../qa-screenshots/local-government/LG-V2-036-before.jpg)
- [Before, opening text](../../../../qa-screenshots/local-government/LG-V2-036-before-viewport.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-036-after.jpg)
- [After, owner list and description](../../../../qa-screenshots/local-government/LG-V2-036-after-owners.jpg)
- [After, consultation section](../../../../qa-screenshots/local-government/LG-V2-036-after-sections.jpg)
- [After, workforce strategies](../../../../qa-screenshots/local-government/LG-V2-036-after-lower.jpg)

## LG-V2-037 screenshots

Earn and Learn Program selected on the Existing Industry-Sector Strategies page:

- [Approved PDF p42](../../../../qa-screenshots/local-government/LG-V2-037-approved-p42.png)
- [Before, full page](../../../../qa-screenshots/local-government/LG-V2-037-before.jpg)
- [Before, opening text](../../../../qa-screenshots/local-government/LG-V2-037-before-viewport.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-037-after.jpg)
- [After, opening text](../../../../qa-screenshots/local-government/LG-V2-037-after-viewport.jpg)
- [After, consultation section](../../../../qa-screenshots/local-government/LG-V2-037-after-sections.jpg)
- [After, workforce strategies](../../../../qa-screenshots/local-government/LG-V2-037-after-lower.jpg)

## LG-V2-038 screenshots

Fresh Start Program selected on the Existing Industry-Sector Strategies page:

- [Approved PDF p43](../../../../qa-screenshots/local-government/LG-V2-038-approved-p43.png)
- [Before, full page](../../../../qa-screenshots/local-government/LG-V2-038-before.jpg)
- [Before, opening text](../../../../qa-screenshots/local-government/LG-V2-038-before-viewport.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-038-after.jpg)
- [After, opening text](../../../../qa-screenshots/local-government/LG-V2-038-after-viewport.jpg)
- [After, consultation section](../../../../qa-screenshots/local-government/LG-V2-038-after-sections.jpg)
- [After, workforce strategies](../../../../qa-screenshots/local-government/LG-V2-038-after-lower.jpg)

## LG-V2-039 screenshots

Local Government Association of the Northern Territory Strategic Plan selected on the Existing Industry-Sector Strategies page:

- [Approved PDF p44](../../../../qa-screenshots/local-government/LG-V2-039-approved-p44.png)
- [Before, full page](../../../../qa-screenshots/local-government/LG-V2-039-before.jpg)
- [Before, opening text](../../../../qa-screenshots/local-government/LG-V2-039-before-viewport.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-039-after.jpg)
- [After, opening text](../../../../qa-screenshots/local-government/LG-V2-039-after-viewport.jpg)
- [After, consultation section](../../../../qa-screenshots/local-government/LG-V2-039-after-sections.jpg)
- [After, workforce strategies](../../../../qa-screenshots/local-government/LG-V2-039-after-lower.jpg)

## LG-V2-040 screenshots

Local Government Association of Tasmania Strategic Plan selected on the Existing Industry-Sector Strategies page:

- [Approved PDF p45](../../../../qa-screenshots/local-government/LG-V2-040-approved-p45.png)
- [Before, full page](../../../../qa-screenshots/local-government/LG-V2-040-before.jpg)
- [Before, opening text](../../../../qa-screenshots/local-government/LG-V2-040-before-viewport.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-040-after.jpg)
- [After, opening text](../../../../qa-screenshots/local-government/LG-V2-040-after-viewport.jpg)
- [After, consultation section](../../../../qa-screenshots/local-government/LG-V2-040-after-sections.jpg)
- [After, workforce strategies](../../../../qa-screenshots/local-government/LG-V2-040-after-lower.jpg)

## LG-V2-041 screenshots

Commonwealth Government Initiatives heading on the digital report page:

- [Approved PDF p46](../../../../qa-screenshots/local-government/LG-V2-041-approved-p46.png)
- [Before, full page](../../../../qa-screenshots/local-government/LG-V2-041-before.jpg)
- [Before, heading](../../../../qa-screenshots/local-government/LG-V2-041-before-viewport.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-041-after.jpg)
- [After, heading](../../../../qa-screenshots/local-government/LG-V2-041-after-viewport.jpg)

## LG-V2-042 screenshots

Commonwealth Government Initiatives data verification. The before and after views are identical because no content rewrite was required. All 14 records matched the approved PDF and opened in order on the digital page.

- [Before, full page](../../../../qa-screenshots/local-government/LG-V2-042-before.jpg)
- [Before, first initiative](../../../../qa-screenshots/local-government/LG-V2-042-before-viewport.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-042-after.jpg)
- [After, first initiative](../../../../qa-screenshots/local-government/LG-V2-042-after-viewport.jpg)
- [Tab 14 reached by Next navigation](../../../../qa-screenshots/local-government/LG-V2-042-tab14.jpg)

## LG-V2-043 screenshots

Opening paragraph on 2027 and Beyond, checked against approved PDF p57:

- [Before, full page](../../../../qa-screenshots/local-government/LG-V2-043-before.jpg)
- [Before, opening paragraph](../../../../qa-screenshots/local-government/LG-V2-043-before-viewport.jpg)
- [After, full page](../../../../qa-screenshots/local-government/LG-V2-043-after.jpg)
- [After, opening paragraph](../../../../qa-screenshots/local-government/LG-V2-043-after-viewport.jpg)
