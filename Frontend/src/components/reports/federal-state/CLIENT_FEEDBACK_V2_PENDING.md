# FSTG WIR V2 pending QA and developer tasks

Source workbook: [PSA_FSTG_WIR_Reconciled_QA_Developer_Register_V2.xlsx](<C:/Users/wmsan/Downloads/PSA Latest Feedback/PSA_FSTG_WIR_Reconciled_QA_Developer_Register_V2.xlsx>)
Worksheet: **Page-by-Page Register**, rows 5–27.

This tracker records the workbook statuses in worksheet order. The 23 items originally had **QA checked = No** in the workbook. The table preserves those original statuses and links to the current implementation and verification results.

| Workbook status | Tasks |
| --- | ---: |
| Open | 18 |
| Blocked | 2 |
| Blocked / Rendered QA | 1 |
| Open / Routing check | 1 |
| Rendered QA required | 1 |

## Pending task index

| ID | Priority | Report area | Issue | Status | QA checked |
| --- | --- | --- | --- | --- | --- |
| FSTG-V2-001 | P0 Critical | Global | External source links missing | Open | No · [Implementation progress](#fstg-v2-001-progress) |
| FSTG-V2-002 | P1 High | Global | Source styling inconsistent with client instruction | Open | No · [Completed and verified](#fstg-v2-002-progress) |
| FSTG-V2-003 | P0 Critical | Executive Summary / Workforce Insights | Content dependency not supplied | Blocked | No · [Completed and verified](#fstg-v2-003-progress) |
| FSTG-V2-004 | P1 High | Global navigation / utility row | Rendered/shared-component verification required | Blocked / Rendered QA | No · [Completed and verified](#fstg-v2-004-progress) |
| FSTG-V2-005 | P1 High | Industry Profile - National | Incorrect source citation | Open | No · [Completed and verified](#fstg-v2-005-progress) |
| FSTG-V2-006 | P2 Medium | Industry Profile - National | Incomplete source citation | Open | No · [Completed and verified](#fstg-v2-006-progress) |
| FSTG-V2-007 | P2 Medium | Industry Profile - National | Exact label mismatch | Open | No · [Completed and verified](#fstg-v2-007-progress) |
| FSTG-V2-008 | P2 Medium | ACT Public Service | Exact label mismatch | Open | No · [Completed and verified](#fstg-v2-008-progress) |
| FSTG-V2-009 | P0 Critical | NSW Public Service | Missing inline footnote numbers | Open | No · [Completed and verified](#fstg-v2-009-progress) |
| FSTG-V2-010 | P2 Medium | NSW Public Service | Exact occupation label mismatch | Open | No · [Completed and verified](#fstg-v2-010-progress) |
| FSTG-V2-011 | P0 Critical | Northern Territory Public Service | Missing inline footnote numbers | Open | No · [Completed and verified](#fstg-v2-011-progress) |
| FSTG-V2-012 | P0 Critical | Northern Territory Public Service | Wrong / incomplete source list | Open | No · [Completed and verified](#fstg-v2-012-progress) |
| FSTG-V2-013 | P1 High | Northern Territory Public Service | Wrong chart cohort label | Open | No · [Completed and verified](#fstg-v2-013-progress) |
| FSTG-V2-014 | P0 Critical | Northern Territory Public Service | Incorrect carry-over heading | Open | No · [Completed and verified](#fstg-v2-014-progress) |
| FSTG-V2-015 | P0 Critical | Queensland Public Service | Missing inline footnote numbers | Open | No · [Completed and verified](#fstg-v2-015-progress) |
| FSTG-V2-016 | P0 Critical | South Australian Public Service | Missing inline footnote numbers | Open | No · [Completed and verified](#fstg-v2-016-progress) |
| FSTG-V2-017 | P1 High | South Australian Public Service | Source wording does not exactly match PDF | Open | No · [Completed and verified](#fstg-v2-017-progress) |
| FSTG-V2-018 | P1 High | Tasmanian Public Service | Source content shortened | Open | No · [Completed and verified](#fstg-v2-018-progress) |
| FSTG-V2-019 | P2 Medium | 2026 Proposed Workforce Strategy | Label mismatch | Open | No · [Completed and verified](#fstg-v2-019-progress) |
| FSTG-V2-020 | P0 Critical | Existing Industry-Sector Strategies | Duplicate/stale component risk | Open / Routing check | No · [Completed and verified](#fstg-v2-020-progress) |
| FSTG-V2-021 | P0 Critical | Federal Government Initiatives | Approved content shortened / rewritten | Open | No · [Completed and verified](#fstg-v2-021-progress) |
| FSTG-V2-022 | P1 High | Workforce Insights | Footnote 84 / theme-content verification blocked | Blocked | No · [Completed and verified](#fstg-v2-022-progress) |
| FSTG-V2-023 | P1 High | Rendered / functional QA | Final visual/interaction verification still required | Rendered QA required | No · [Local QA complete; deployed UAT pending](#fstg-v2-023-progress) |

## Implementation progress

### FSTG-V2-001 progress

**In progress · 65 of 67 distinct approved destinations verified · 7 November 2026**

- Added external anchors to existing numbered sources and chart citations in the FSTG report. Retained inline footnote markers and citation wording. Compound citations link each document separately, including the years in the ACT references and the six annual SA reports grouped under footnote 56.
- Inspected 163 rendered anchors across 15 routes and compared their hrefs character for character with the Source Link Matrix. Links open in a new tab. This check verified the destinations in the markup.
- **Matrix row 63, footnote 40 (NT)** · Resolved under [FSTG-V2-012](#fstg-v2-012-progress). The numbered NT source list now links to “Hard to fill jobs in the NT”.
- **Matrix row 113 (Tasmania diversity chart)** · The supplied URL is a Microsoft sign-in redirect with session-specific parameters. A stable approved survey URL is needed for the chart citation. The survey's numbered footnotes use their own matrix URLs.
- WA evidence shows the same chart and Sources section with the link renderer disabled for the baseline and enabled for the result. [Before](../../../../../../../outputs/fstg-v2-001/before-wa-sources.jpg) · [After](../../../../../../../outputs/fstg-v2-001/after-wa-sources.jpg) · [Rendered link audit](../../../../../../../outputs/fstg-v2-001/rendered-citations.json).

### FSTG-V2-002 progress

**Completed and verified · 7 November 2026**

- Standardised chart citations, source lists and footnote copy to black with 14 px text and 24 px line height. Inline superscript markers use black semibold text. Source-number badges retain their accent colours.
- Gave the NSW and NT pay-gap citations white insets to provide contrast inside the dark cards. The National map reserves room for its larger citation.
- Desktop browser QA at 1280 px checked 155 citation blocks across 16 routes and the expanded Drivers of Change footnotes. Citation copy computed to black at 14 px or larger. The NSW and ACT chart pairs retained aligned source rows. The audited routes had no horizontal page overflow.
- All 163 external citation links matched the V2-001 browser audit. TypeScript and diff whitespace checks passed.
- Evidence for the same NSW chart section · [Before](../../../../../../../outputs/fstg-v2-002/before-nsw.jpg) · [After](../../../../../../../outputs/fstg-v2-002/after-nsw.jpg) · [Rendered typography audit](../../../../../../../outputs/fstg-v2-002/rendered-typography.json).

### FSTG-V2-003 progress

**Completed and verified · 7 November 2026**

- Located the current shared content dependency in [workforceInsightsContent.ts](./workforceInsightsContent.ts). Executive Summary and Workforce Insights both render its theme, the same three insight titles and summaries, and the same reference wording for 85–87. The insight summaries were checked as the shared digital summaries.
- Restored the missing sector-analysis paragraph from printed page 66 above the page 67 analysis in Theme Overview. The existing Productivity and Future Skills cards carry the other two analysis statements from page 66.
- Footnote 84 sits immediately after “Public Administration and Safety industry” and jumps to the matching note. Verified the new paragraph and note against the approved PDF and confirmed markers 83–87 and all four existing external source destinations. This also satisfies the overlapping FSTG-V2-022 acceptance check.
- TypeScript and diff whitespace checks passed. Browser evidence · [Before](../../../../../../../outputs/fstg-v2-003/before-workforce-insights.jpg) · [After](../../../../../../../outputs/fstg-v2-003/after-workforce-insights.jpg) · [Footnote 84 target](../../../../../../../outputs/fstg-v2-003/after-footnote-84.jpg) · [Executive Summary](../../../../../../../outputs/fstg-v2-003/after-executive-summary.jpg) · [Verification](../../../../../../../outputs/fstg-v2-003/verification.json).

### FSTG-V2-004 progress

**Completed and verified · 7 November 2026.** Compared the shared header with the agreed Navigation Map recorded under UAT-001 and UAT-040. The menu includes all eight jurisdiction links, three Theme 1 insights and both nested 2025 proposals. Clicked through Insight 3 → 2026 Proposed Strategy → Update on 2025 Strategies and verified a mobile proposal link reached its section anchor.

On Update on 2025 Strategies, the long Previous label pushed both controls beneath the report title at 1280px. Updated the shared FSTG utility row so the title stays left and the controls stay right on one desktop row. Long labels can wrap inside their buttons. The title uses the agreed 20px, 700 weight and gray800 colour. At 390px, the utility row wraps and the controls fit within it.

Verified a single aligned utility row and fitting controls on 39 report routes at 1280px, including aliases. The transition cover uses its dedicated header and has the same utility row. Verified the report menu on all 38 interior routes.

- [Before · utility row](../../../../../../../outputs/fstg-v2-004/before-utility.jpg)
- [After · utility row](../../../../../../../outputs/fstg-v2-004/after-utility.jpg)
- [After · Workforce Strategies menu](../../../../../../../outputs/fstg-v2-004/after-menu.jpg)

### FSTG-V2-005 progress

**Completed and verified · 7 November 2026.** Updated the National Industry Profile's First Nations Employment in the APS chart to use the exact V2 wording, `SOURCE: Australian Government, State of the Service Report 2024-25, 2025, Table AB 1 & pg. 31`. Verified the rendered text and the existing Source Link Matrix destination on the National tab. The chart values remain 3.4% and 5.0%.

- [Before](../../../../../../../outputs/fstg-v2-005/before.jpg)
- [After](../../../../../../../outputs/fstg-v2-005/after.jpg)

### FSTG-V2-006 progress

**Completed and verified · 7 November 2026.** Matched the Gender Pay Gap citation on the National Industry Profile to approved PDF p17 by adding `pg. 32`. Confirmed the rendered citation uses the approved APSC destination from Source Link Matrix row 19 and opens in a new tab. The card still displays 4.4%.

- [Before](../../../../../../../outputs/fstg-v2-006/before.jpg)
- [After](../../../../../../../outputs/fstg-v2-006/after.jpg)

### FSTG-V2-007 progress

**Completed and verified · 7 November 2026.** Corrected the National Industry Profile's Diversity in the APS chart label to `LGBTIQA+`, as specified in the V2 register for approved PDF p18. Verified the label and its 9.5% value in the browser.

- [Before](../../../../../../../outputs/fstg-v2-007/before.jpg)
- [After](../../../../../../../outputs/fstg-v2-007/after.jpg)

### FSTG-V2-008 progress

**Completed and verified · 7 November 2026.** Corrected the cohort label in **ACT Public Service Pay Gap by Cohort** to `LGBTIQA+`, as specified in the V2 register for approved PDF p24. Verified the chart label and its 5.7% value on the ACT profile.

- [Before](../../../../../../../outputs/fstg-v2-008/before.jpg)
- [After](../../../../../../../outputs/fstg-v2-008/after.jpg)

### FSTG-V2-009 progress

**Completed and verified · 7 November 2026.** Added NSW footnotes 23–32 in Workforce Overview and 33–35 in Workforce Trends at the statement positions in approved PDF pp25–26. Each marker links to its numbered entry in Sources. Verified all 13 entries against the Jurisdiction Footnote Reference and their external destinations against the Source Link Matrix. The matrix omits footnote 33, so it uses the approved URL for footnote 23, which cites the same report with identical wording. Verified the rendered markers and tested the jump to source 33 in the browser.

- [Overview before](../../../../../../../outputs/fstg-v2-009/before-overview.jpg) · [Overview after](../../../../../../../outputs/fstg-v2-009/after-overview.jpg)
- [Trends before](../../../../../../../outputs/fstg-v2-009/before-trends.jpg) · [Trends after](../../../../../../../outputs/fstg-v2-009/after-trends.jpg)

### FSTG-V2-010 progress

**Completed and verified · 7 November 2026.** Changed the NSW Workforce Trends occupation box from `Cyber Security Analysts` to `Cyber Security Analysis`, matching approved PDF p26. Verified all six occupation boxes in the browser.

- [Before](../../../../../../../outputs/fstg-v2-010/before.jpg)
- [After](../../../../../../../outputs/fstg-v2-010/after.jpg)

### FSTG-V2-011 progress

**Completed and verified · 7 November 2026.** Added footnotes 36–39 in NT Workforce Overview and 40–42 in Workforce Trends, including 42 on the Skills Plan heading. Verified all seven markers against their statements in approved PDF pp31–32 and checked the rendered page. The numbered Sources list and external links are tracked separately under FSTG-V2-012.

- [Overview before](../../../../../../../outputs/fstg-v2-011/before-overview.jpg) · [Overview after](../../../../../../../outputs/fstg-v2-011/after-overview.jpg)
- [Trends before](../../../../../../../outputs/fstg-v2-011/before-trends.jpg) · [Trends after](../../../../../../../outputs/fstg-v2-011/after-trends.jpg)
- [Skills Plan before](../../../../../../../outputs/fstg-v2-011/before-skills-plan.jpg) · [Skills Plan after](../../../../../../../outputs/fstg-v2-011/after-skills-plan.jpg)

### FSTG-V2-012 progress

**Completed and verified · 7 November 2026.** Replaced the six generic NT entries with numbered sources 36–42. Checked all seven rendered entries against the Jurisdiction Footnote Reference and Source Link Matrix rows 59–65, including the previously missing “Hard to fill jobs in the NT” link for source 40. Linked the inline markers to their respective Sources entries and tested the jump to source 40.

- [Before](../../../../../../../outputs/fstg-v2-012/before.jpg)
- [After](../../../../../../../outputs/fstg-v2-012/after.jpg)

### FSTG-V2-013 progress

**Completed and verified · 7 November 2026.** Changed the NT gender chart's 0.2% cohort to `Did not disclose` in the visible legend and accessible chart description, matching approved PDF p34. Verified both labels and the 0.2% value in the browser.

- [Before](../../../../../../../outputs/fstg-v2-013/before.jpg)
- [After](../../../../../../../outputs/fstg-v2-013/after.jpg)

### FSTG-V2-014 progress

**Completed and verified · 7 November 2026.** Replaced the Auslan heading on the NT Workforce Trends table with `ANZSCO CODE AND OCCUPATION`, matching approved PDF p32. Compared the seven rendered occupation rows before and after and confirmed their codes, names and order.

- [Before](../../../../../../../outputs/fstg-v2-014/before.jpg)
- [After](../../../../../../../outputs/fstg-v2-014/after.jpg)

### FSTG-V2-015 progress

**Completed and verified · 7 November 2026.** Added Queensland footnotes 43–49 in Workforce Overview and 50–52 in Workforce Trends at the statement positions in approved PDF pp37–38. Each marker links to its existing numbered entry. Preserved the source wording and verified all ten rendered external destinations against Source Link Matrix rows 71–80. Tested the jump to source 51 in the browser.

- [Overview before](../../../../../../../outputs/fstg-v2-015/before-overview.jpg) · [Overview after](../../../../../../../outputs/fstg-v2-015/after-overview.jpg)
- [Trends before](../../../../../../../outputs/fstg-v2-015/before-trends.jpg) · [Trends after](../../../../../../../outputs/fstg-v2-015/after-trends.jpg)

### FSTG-V2-016 progress

**Completed and verified · 7 November 2026.** Added South Australian footnotes 53–56 to Workforce Overview and 57 to the qualifications demand heading in Workforce Trends, matching their placement in approved PDF pp43–44. Verified all five markers point to their existing numbered source entries and tested the jump to source 57 in the browser.

- [Overview before](../../../../../../../outputs/fstg-v2-016/before-overview.jpg) · [Overview after](../../../../../../../outputs/fstg-v2-016/after-overview.jpg)
- [Trends before](../../../../../../../outputs/fstg-v2-016/before-trends.jpg) · [Trends after](../../../../../../../outputs/fstg-v2-016/after-trends.jpg)

### FSTG-V2-017 progress

**Completed and verified · 7 November 2026.** Matched all five rendered SA sources 53–57 to the exact Jurisdiction Footnote Reference wording. Sources 53 and 54 use the approved access date of 9 February 2025. Source 56 lists each State of the Sector Report from 2020 to 2025 in full, with a link on each report title. Verified all ten rendered links against Source Link Matrix rows 86–95.

- [Before](../../../../../../../outputs/fstg-v2-017/before.jpg)
- [After](../../../../../../../outputs/fstg-v2-017/after.jpg)

### FSTG-V2-018 progress

**Completed and verified · 7 November 2026.** Restored the full approved Tasmania source text for references 58–66, including source 61's LGBTQIA+ explanatory note and the full publication and access details for sources 63–66. Compared all nine rendered citations with the Jurisdiction Footnote Reference and verified all ten external destinations against Source Link Matrix rows 102–111. Source 63 links separately to both named documents.

- [Before](../../../../../../../outputs/fstg-v2-018/before.jpg)
- [After](../../../../../../../outputs/fstg-v2-018/after.jpg)

### FSTG-V2-019 progress

**Completed and verified · 7 November 2026.** Renamed the strategy detail label to `Proposed Deliverable`, matching approved PDF p70. Verified that it renders beside the existing value `Findings report` on the 2026 Proposed Strategy page.

- [Before](../../../../../../../outputs/fstg-v2-019/before.jpg)
- [After](../../../../../../../outputs/fstg-v2-019/after.jpg)

### FSTG-V2-020 progress

**Completed and verified · 7 November 2026.** Confirmed that both `existing_strategies` and `existing_industry_strategies` already rendered the approved 11-strategy `FederalStateExistingStrategiesFrameView`. Removed the unused six-item component and made both route mappings name the active component explicitly. Verified the same 11 entries in the same order on both routes after cleanup and opened strategy 11 to check its details. The screenshots show the same live presentation because the cleanup removed unused code.

- [Before](../../../../../../../outputs/fstg-v2-020/before.jpg)
- [After](../../../../../../../outputs/fstg-v2-020/after.jpg)

### FSTG-V2-021 progress

**Completed and verified · 7 November 2026.** Replaced the condensed Working for Women copy with all five approved paragraphs and five priority areas from the Working for Women Reference sheet. Verified the rendered text verbatim, including the implementation outcomes, grant extension and explanation of how Priority Area 3 informed the proposed strategy. Checked that the detail panel scrolls to the final paragraph.

- [Before](../../../../../../../outputs/fstg-v2-021/before.jpg)
- [After · priority areas](../../../../../../../outputs/fstg-v2-021/after.jpg)
- [After · implementation, grant and strategy](../../../../../../../outputs/fstg-v2-021/after-detail.jpg)

### FSTG-V2-022 progress

**Completed and reverified · 7 November 2026.** The page 66 sector-analysis copy was restored under [FSTG-V2-003](#fstg-v2-003-progress). Rechecked the current Workforce Insights Theme Overview and confirmed marker 84 immediately follows “Public Administration and Safety industry”. Clicking the marker opens source 84's classifier explanation on the same page. The before screenshot is the original V2-003 baseline. The after screenshots are from this verification.

- [Before](../../../../../../../outputs/fstg-v2-022/before.jpg)
- [After · Theme Overview](../../../../../../../outputs/fstg-v2-022/after.jpg)
- [After · footnote 84 explanation](../../../../../../../outputs/fstg-v2-022/after-footnote-84.jpg)

### FSTG-V2-023 progress

**Local rendered QA complete · 7 November 2026. Deployed UAT pending.** Used the workbook's Client Feedback Reconciliation sheet to focus on rows requiring rendered QA.

| Feedback | Rendered check |
| --- | --- |
| UAT-001, 002 | Shared menu, utility row and navigation map verified in the [V2-004 route audit](#fstg-v2-004-progress). Rechecked the Workforce Strategies menu and the skills-audit link, which opened the correct proposal. |
| UAT-012 | Both skills charts had equal card, heading, plot and source-row dimensions. |
| UAT-015 | National labels rendered at 16px in black. Fixed the brief negative starting values in the number animation and verified the counters start at zero and settle on the approved values. |
| UAT-017 | Checked the labels and both employee counts in the map pop-ups for all eight jurisdictions. “Public Service” stays together in the profile headings. |
| UAT-018, 019, 036 | Checked chart layout and surfaces across the eight jurisdictions at desktop and mobile widths. Representation charts use white and gender/diversity charts use the sector tint. The two ACT Trends chart citations share the same bottom alignment. |
| UAT-041 | Checked the strategy update header, constrained intro width, sector accents and proposal anchor. |
| UAT-046 | Fixed the selected strategy heading and controls scrolling out of view. Verified strategy 11 retains its heading and controls during mobile page scroll and desktop detail scroll. |
| UAT-049, 050 | Verified the Working for Women title stays visible while scrolling on mobile. Tested all 14 initiatives forward and backward, including selection/title synchronisation and the first/last button boundaries. |

Checked 13 targeted routes at 1280px and 390px with no page-level horizontal overflow. The local report API was unavailable, so the browser rendered the built-in FSTG pages. A deployed UAT run is still pending. The separate Tasmania survey destination in V2-001 still needs a stable approved URL.

- Existing Strategies mobile · [Before](../../../../../../../outputs/fstg-v2-023/before-mobile-strategy.jpg) · [After](../../../../../../../outputs/fstg-v2-023/after-mobile-strategy.jpg) · [Desktop detail scroll](../../../../../../../outputs/fstg-v2-023/after-desktop-strategy.jpg)
- Verification · [National counters](../../../../../../../outputs/fstg-v2-023/verified-national.jpg) · [Industry Overview charts](../../../../../../../outputs/fstg-v2-023/verified-industry-charts.jpg) · [ACT charts](../../../../../../../outputs/fstg-v2-023/verified-act-charts.jpg) · [Proposal anchor](../../../../../../../outputs/fstg-v2-023/verified-strategy-anchor.jpg) · [Mobile initiative](../../../../../../../outputs/fstg-v2-023/verified-mobile-initiative.jpg) · [Rendered audit](../../../../../../../outputs/fstg-v2-023/viewport-audit.json)

## Task details

The current implementation, expected result and requested action below are taken from the workbook. Component names and line references reflect the reviewed code batch.

### FSTG-V2-001 · External source links missing

- **Page or section** · All pages with sources/footnotes
- **Component and location** · Multiple FSTG components · Across report
- **Workbook status** · Open · QA checked: No · Row 5
- **Current implementation** · Current code renders source/footnote citations as plain text or links inline numbers only to internal page anchors. No external http/https source links were found in the supplied FSTG TSX files.
- **Expected result** · The approved linked PDF contains external hyperlinks on the relevant sources/chart citations.
- **Requested action** · Implement the exact external URLs from the 'Source Link Matrix' sheet on the corresponding source/citation text. Do not search for substitute URLs. Preserve inline footnote numbers and source wording.

### FSTG-V2-002 · Source styling inconsistent with client instruction

- **Page or section** · All source / footnote presentations
- **Component and location** · Multiple profile/insight/chart components · Across report
- **Workbook status** · Open · QA checked: No · Row 6
- **Current implementation** · Several chart/source labels still use brown/sector-colour text (for example text-[#694834]) rather than black.
- **Expected result** · Debbie's FSTG/global feedback requires source text to be black and legible on a large screen.
- **Requested action** · Standardise source and footnote copy to black across FSTG while keeping sector colour for accents/badges only. Recheck chart-source font size/alignment in rendered UAT.

### FSTG-V2-003 · Content dependency not supplied

- **Page or section** · Executive Summary + Workforce Insights overview
- **Component and location** · Imported dependency: ../workforceInsightsContent · Import used in FederalStateExecutiveSummaryView(1).tsx and FederalStateWorkforceInsightsView(1).tsx
- **Workbook status** · Blocked · QA checked: No · Row 7
- **Current implementation** · The current pages import workforceInsightsTheme, workforceInsightSummaries and themeOverviewSources from ../workforceInsightsContent, but that source file was not included in the code batch.
- **Expected result** · The latest client override requires One Theme / Three Insights, while the approved PDF remains the source for the detailed report content and footnotes 83-87.
- **Requested action** · Please provide the current workforceInsightsContent file. Until supplied, exact wording of the shared theme/insight summaries and source 84 placement cannot be fully verified. Do not rewrite these summaries from memory.

### FSTG-V2-004 · Rendered/shared-component verification required

- **Page or section** · All report pages
- **Component and location** · Shared ReportHeader / ReportNavButtons · Shared components not supplied
- **Workbook status** · Blocked / Rendered QA · QA checked: No · Row 8
- **Current implementation** · Report-specific files call shared ReportHeader and ReportNavButtons components, but those shared component files were not supplied in this batch.
- **Expected result** · Client feedback requires the final navigation hierarchy and utility row/report-name/previous-next treatment on every page.
- **Requested action** · Do not rebuild per page. Verify the shared components and rendered UAT against the client navigation map. Only patch centrally if the current live rendering still differs.

### FSTG-V2-005 · Incorrect source citation

- **Page or section** · Industry Profile
- **Component and location** · FederalStateIndustryProfileView.tsx · L528
- **Workbook status** · Open · QA checked: No · Row 9
- **Current implementation** · First Nations Employment chart source is 'Table A8 and p.31'.
- **Expected result** · Approved PDF p18: 'Table AB 1 & pg. 31'.
- **Requested action** · Replace the chart source wording exactly with: SOURCE: Australian Government, State of the Service Report 2024-25, 2025, Table AB 1 & pg. 31

### FSTG-V2-006 · Incomplete source citation

- **Page or section** · Industry Profile
- **Component and location** · FederalStateIndustryProfileView.tsx · L497-L506
- **Workbook status** · Open · QA checked: No · Row 10
- **Current implementation** · Gender Pay Gap card source ends at 'State of the Service Report 2024-25, 2025.'
- **Expected result** · Approved PDF p17 identifies the source as State of the Service Report 2024-25, 2025, pg. 32.
- **Requested action** · Add 'pg. 32' to the displayed Gender Pay Gap source and apply the approved PDF external link.

### FSTG-V2-007 · Exact label mismatch

- **Page or section** · Industry Profile
- **Component and location** · FederalStateIndustryProfileView.tsx · L533-L542
- **Workbook status** · Open · QA checked: No · Row 11
- **Current implementation** · National diversity chart uses 'LGBTQIA+'.
- **Expected result** · Approved PDF p18 uses 'LGBTIQA+'.
- **Requested action** · Change the national diversity chart label to 'LGBTIQA+' to match the approved PDF exactly.

### FSTG-V2-008 · Exact label mismatch

- **Page or section** · ACT Public Service Overview / pay gap chart
- **Component and location** · FederalStateActProfileView(1).tsx · L100-L109
- **Workbook status** · Open · QA checked: No · Row 12
- **Current implementation** · ACT Public Service Pay Gap by Cohort uses 'LGBTQIA+'.
- **Expected result** · Approved PDF p24 uses 'LGBTIQA+'.
- **Requested action** · Change the ACT cohort label to 'LGBTIQA+' to match the approved PDF.

### FSTG-V2-009 · Missing inline footnote numbers

- **Page or section** · NSW Public Service - Workforce Overview and Workforce Trends
- **Component and location** · FederalStateNswProfileView.tsx · L121-L188
- **Workbook status** · Open · QA checked: No · Row 13
- **Current implementation** · The NSW narrative contains no inline <sup> footnote markers even though the page renders sources 23-35.
- **Expected result** · Approved PDF pp25-26 places footnotes 23-32 against the Workforce Overview statements and 33-35 against Workforce Trends.
- **Requested action** · Add inline footnote numbers 23-35 to the exact statements shown in the approved PDF. Use the 'Jurisdiction Footnote Reference' sheet for source text and the 'Source Link Matrix' for URLs.

### FSTG-V2-010 · Exact occupation label mismatch

- **Page or section** · NSW Workforce Trends occupation boxes
- **Component and location** · FederalStateNswProfileView.tsx · L26-L32
- **Workbook status** · Open · QA checked: No · Row 14
- **Current implementation** · Occupation array contains 'Cyber Security Analysts'.
- **Expected result** · Approved PDF p26 displays 'Cyber Security Analysis'.
- **Requested action** · Change the occupation label to 'Cyber Security Analysis' to match the approved source document.

### FSTG-V2-011 · Missing inline footnote numbers

- **Page or section** · NT Workforce Overview + Workforce Trends
- **Component and location** · FederalStateNtProfileView.tsx · L93-L159
- **Workbook status** · Open · QA checked: No · Row 15
- **Current implementation** · The NT narrative has no inline source numbers.
- **Expected result** · Approved PDF pp31-32 uses footnotes 36-39 in Workforce Overview and 40-42 in Workforce Trends.
- **Requested action** · Insert footnote markers 36-42 on the exact corresponding statements from the PDF. Do not add markers to unrelated chart-only source labels.

### FSTG-V2-012 · Wrong / incomplete source list

- **Page or section** · NT Sources
- **Component and location** · FederalStateNtProfileView.tsx · L52-L59, L162
- **Workbook status** · Open · QA checked: No · Row 16
- **Current implementation** · Current NT Sources is an unnumbered six-item generic list and includes sources that do not correspond to the approved 36-42 sequence.
- **Expected result** · Approved PDF pp31-32 contains seven numbered references 36-42 with full publisher/access-date wording.
- **Requested action** · Replace the NT Sources block with numbered sources 36-42 exactly as supplied in 'Jurisdiction Footnote Reference', and add the approved hyperlinks from 'Source Link Matrix'.

### FSTG-V2-013 · Wrong chart cohort label

- **Page or section** · NT gender chart
- **Component and location** · FederalStateNtProfileView.tsx · L118-L129
- **Workbook status** · Open · QA checked: No · Row 17
- **Current implementation** · The 0.2% cohort is labelled 'Non-binary'.
- **Expected result** · Approved PDF p34 labels the 0.2% cohort 'Did not disclose'.
- **Requested action** · Replace 'Non-binary' with 'Did not disclose' in the visible legend and accessible aria-label.

### FSTG-V2-014 · Incorrect carry-over heading

- **Page or section** · NT Workforce Trends occupation table
- **Component and location** · FederalStateNtProfileView.tsx · L153-L155
- **Workbook status** · Open · QA checked: No · Row 18
- **Current implementation** · The NT occupation table is headed 'Skills gaps in Australian Sign Language (Auslan) qualifications and occupations'.
- **Expected result** · Approved PDF p32 labels this content 'ANZSCO CODE AND OCCUPATION'; it is not Auslan content.
- **Requested action** · Remove the Auslan carry-over heading. Use the approved NT occupation-table context/heading from the PDF; retain the seven ANZSCO occupations.

### FSTG-V2-015 · Missing inline footnote numbers

- **Page or section** · QLD Workforce Overview + Workforce Trends
- **Component and location** · FederalStateQldProfileView.tsx · L100-L122
- **Workbook status** · Open · QA checked: No · Row 19
- **Current implementation** · The QLD narrative renders the sources list 43-52 but contains no inline <sup> markers.
- **Expected result** · Approved PDF pp37-38 places 43-49 in Workforce Overview and 50-52 in Workforce Trends.
- **Requested action** · Add inline footnote numbers 43-52 against the corresponding approved statements. Keep the existing source text, then add exact external links.

### FSTG-V2-016 · Missing inline footnote numbers

- **Page or section** · SA Workforce Overview + Workforce Trends
- **Component and location** · FederalStateSaProfileView.tsx · L128-L157
- **Workbook status** · Open · QA checked: No · Row 20
- **Current implementation** · The SA narrative has no inline footnote markers despite rendering sources 53-57.
- **Expected result** · Approved PDF pp43-44 places 53-56 in Workforce Overview and 57 in Workforce Trends.
- **Requested action** · Add inline footnote numbers 53-57 to the corresponding approved statements.

### FSTG-V2-017 · Source wording does not exactly match PDF

- **Page or section** · SA Sources
- **Component and location** · FederalStateSaProfileView.tsx · L39-L45
- **Workbook status** · Open · QA checked: No · Row 21
- **Current implementation** · Sources 53 and 54 use accessed 9 February 2026; source 56 is shortened to 'State of the Sector Reports 2020-2025'.
- **Expected result** · Approved PDF p43 prints accessed 9 February 2025 for 53/54 and lists every State of the Sector Report year individually for source 56.
- **Requested action** · Replace sources 53-57 with the exact approved wording in 'Jurisdiction Footnote Reference'. Preserve the approved PDF wording even where a date appears unusual; PSA owns source content.

### FSTG-V2-018 · Source content shortened

- **Page or section** · Tasmania Sources
- **Component and location** · FederalStateTasProfileView(1).tsx · L32-L42
- **Workbook status** · Open · QA checked: No · Row 22
- **Current implementation** · The source list removes publisher/access-date detail; source 61 omits the LGBTQIA+ explanatory note; sources 63-66 are materially shortened.
- **Expected result** · Approved PDF pp49-50 contains complete footnotes 58-66.
- **Requested action** · Replace the Tasmania source list with the full approved footnote text 58-66 from 'Jurisdiction Footnote Reference'. Existing inline markers 58-66 can remain.

### FSTG-V2-019 · Label mismatch

- **Page or section** · Strategy detail
- **Component and location** · FederalStateProposedStrategiesView.tsx · L19-L26
- **Workbook status** · Open · QA checked: No · Row 23
- **Current implementation** · The detail label is 'Deliverable'.
- **Expected result** · Approved PDF p70 uses 'Proposed Deliverable'.
- **Requested action** · Rename the label to 'Proposed Deliverable'. Keep value 'Findings report'.

### FSTG-V2-020 · Duplicate/stale component risk

- **Page or section** · Existing Strategies route/component
- **Component and location** · FederalStateExistingStrategiesFrameView(1).tsx + FederalStateExistingStrategiesView.tsx · FrameView L21-L253; stale View L40-L132
- **Workbook status** · Open / Routing check · QA checked: No · Row 24
- **Current implementation** · The supplied code contains two different Existing Strategies implementations. FrameView contains the 11 approved strategies; FederalStateExistingStrategiesView.tsx contains six unrelated/paraphrased strategy records.
- **Expected result** · Approved PDF pp77-87 contains the 11 strategies represented in FederalStateExistingStrategiesFrameView(1).tsx.
- **Requested action** · Confirm the live route uses FederalStateExistingStrategiesFrameView(1).tsx. Remove/deprecate the stale six-item FederalStateExistingStrategiesView.tsx from the live route/build so it cannot surface accidentally.

### FSTG-V2-021 · Approved content shortened / rewritten

- **Page or section** · Working for Women - A Strategy for Gender Equality
- **Component and location** · FederalStateInitiativesView.tsx · L43-L51
- **Workbook status** · Open · QA checked: No · Row 25
- **Current implementation** · Current Working for Women content is condensed to three short paragraphs and omits the five priority areas, implementation outcomes, grant-program detail and the full explanation of how Priority Area 3 informed the proposed strategy.
- **Expected result** · Approved PDF p91 contains the full Working for Women content.
- **Requested action** · Replace the current Working for Women paragraphs with the exact approved text in the 'Working for Women Reference' sheet. Do not summarise or paraphrase.

### FSTG-V2-022 · Footnote 84 / theme-content verification blocked

- **Page or section** · Theme overview / source 84
- **Component and location** · FederalStateWorkforceInsightsView(1).tsx + ../workforceInsightsContent · L62-L76 + imported content
- **Workbook status** · Blocked · QA checked: No · Row 26
- **Current implementation** · The visible file includes source 84 in the source list, but the page body shown in this component does not visibly place inline marker 84; the shared imported content may contain the approved theme analysis.
- **Expected result** · Approved PDF p66 places footnote 84 after 'Public Administration and Safety industry' in the Theme sector-analysis copy.
- **Requested action** · Once workforceInsightsContent is supplied, verify that the complete p66 Theme/Sector Analysis content is present and that inline marker 84 is attached to the correct phrase. If absent, add it.

### FSTG-V2-023 · Final visual/interaction verification still required

- **Page or section** · Current UAT across FSTG
- **Component and location** · Current rendered report + shared components · Client feedback slides 1-48
- **Workbook status** · Rendered QA required · QA checked: No · Row 27
- **Current implementation** · Code indicates many client-requested visual and scrolling changes are implemented, but code review alone cannot verify actual viewport behaviour, animation, sticky/anchored scrolling, source alignment, chart legibility or Previous/Next controls.
- **Expected result** · Client expects FSTG design/UX to follow the agreed LG patterns and be presentation-ready.
- **Requested action** · After the content fixes above are deployed, run a rendered UAT pass using the 'Client Feedback Reconciliation' sheet. Reopen only items marked 'Rendered QA required' if the live build still fails the client instruction.
