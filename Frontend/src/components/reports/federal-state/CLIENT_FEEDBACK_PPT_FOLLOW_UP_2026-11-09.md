# FSTG client follow-up and remaining work

Prepared 9 November 2026. Updated 10 November 2026 after FINAL-012 local reconciliation and deployed preview checks.

## Review basis and status

This tracker records implementation and QA against the client PPT, including the latest client follow-up. FINAL-002–011 are completed locally; FINAL-012 has completed the 48-slide local reconciliation and found outstanding differences on the deployed preview. Overall FSTG completion remains open.

The PPT is the single source of truth for remaining feedback, subject to the client's later SA placement correction and the user's explicit VIC grouping/navigation decisions. Excel trackers provide history only.

The newer [combined PPT copy](<C:/Users/wmsan/Downloads/PSA Latest Feedback/PSA Feedback FED GOV WIR DEV 21 OCT  2026  - part 1 and part 2 (2).pptx>) contains 48 slides and is byte-identical to the original combined deck (SHA-256 `10fdacd8a5167406ba398f6598b40bd61e3b7651d4dd5cdab4c105ed29d4d704`). All 48 rendered slides, including visual annotations, have now been reviewed. See [FINAL-012 reconciliation and screenshots](../../../../../../../outputs/fstg-final-012/README.md).

Remaining gates: approved 2023 report URL/file; deployment of the reviewed local corrections; a fresh final check and acceptance of that deployed release. The current deployed preview still differs from local code.

Historical trackers

- [Original client feedback tracker](./CLIENT_FEEDBACK_2026-10-21.md)
- [V2 progress tracker](./CLIENT_FEEDBACK_V2_PENDING.md)

## Remaining tasks

| ID | PPT slide(s) | Task | Page link(s) | Status | Earlier task(s) |
| --- | --- | --- | --- | --- | --- |
| FSTG-FINAL-001 | 7 | Restore the 2023 previous report | [Downloads](http://localhost:3000/reports/federal-state-territory-wir-2026/downloads) | Awaiting approved 2023 PDF URL or file | UAT-007 |
| FSTG-FINAL-002 | 22–24 | Correct SA chart placement | [SA profile](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile_sa) · [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile) | Completed and verified · 9 November 2026 | UAT-025; V2-016/017 |
| FSTG-FINAL-003 | 9, 37 | Remove the sentence under the strategy title | [Proposed Strategy](http://localhost:3000/reports/federal-state-territory-wir-2026/workforce_strategies) · [Alternate strategy URL](http://localhost:3000/reports/federal-state-territory-wir-2026/proposed_strategies) | Completed and verified · 9 November 2026 | UAT-009/037; V2-019 |
| FSTG-FINAL-004 | 37; compare 40 | Apply the circular Proposed Strategy header graphic | [Proposed Strategy](http://localhost:3000/reports/federal-state-territory-wir-2026/workforce_strategies) · [Alternate strategy URL](http://localhost:3000/reports/federal-state-territory-wir-2026/proposed_strategies) | Completed and verified · 9 November 2026 | UAT-037/042 |
| FSTG-FINAL-005 | 41–43 | Use Project 1 / Project 2 / Project 3 labels | [Project 1](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_project_1) · [Project 2](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_project_2) · [Project 3](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_project_3) · [Parent project links](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_strategies) | Completed and verified · 9 November 2026 | UAT-045 |
| FSTG-FINAL-006 | 27 | Resolve VIC five-point layout against six source occupations | [VIC profile](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile_vic) · [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile) | Completed and verified · approved grouping · 9 November 2026 | UAT-029 |
| FSTG-FINAL-007 | 2–4, 15, 38–39, 47 | Reconcile navigation and control placement | [Introduction](http://localhost:3000/reports/federal-state-territory-wir-2026/introduction) · [Workforce Insights](http://localhost:3000/reports/federal-state-territory-wir-2026/workforce_insights) · [Initiatives](http://localhost:3000/reports/federal-state-territory-wir-2026/federal_initiatives) | Completed and verified · sequence approved · 9 November 2026 | UAT-001/002/035/039/040/050; V2-004/023 |
| FSTG-FINAL-008 | 8–9, 25, 27, 37, 40–43 | Reconcile spacing and text wrapping | [Executive Summary](http://localhost:3000/reports/federal-state-territory-wir-2026/executive_summary) · [Proposed Strategy](http://localhost:3000/reports/federal-state-territory-wir-2026/workforce_strategies) · [Update 2025](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_strategies) · [Project 1](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_project_1) · [Project 2](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_project_2) · [Project 3](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_project_3) | Completed and verified · 9 November 2026 | UAT-008/026/027/029/037/038/041/043/045 |
| FSTG-FINAL-009 | 12, 14, 16–29, 36 | Reconcile chart sizing and presentation | [Industry Overview](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_overview) · [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile) · all eight jurisdiction routes below | Completed and verified · 10 November 2026 | UAT-012/015/018/019/020/036; V2-023 |
| FSTG-FINAL-010 | 1, 11–13, 16–29, 36 | Reconcile source and footnote presentation | [Industry Overview](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_overview) · all jurisdiction pages · [Workforce Insights](http://localhost:3000/reports/federal-state-territory-wir-2026/workforce_insights) | Completed and verified · 10 November 2026 | V2-001/002/005/006/009/011/012/015–018/022 |
| FSTG-FINAL-011 | 14–29, 36–47 | Reconcile big-screen readability, scrolling and animation | [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile) · [Existing Strategies](http://localhost:3000/reports/federal-state-territory-wir-2026/existing_strategies) · [Initiatives](http://localhost:3000/reports/federal-state-territory-wir-2026/federal_initiatives) | Completed and verified locally · 10 November 2026 | UAT-015/017/018/036/046/049/050; V2-023 |
| FSTG-FINAL-012 | 1–48 in available deck | Complete every-slide reconciliation and deployed sign-off | All FSTG pages | Local reconciliation completed · awaiting deployment/recheck and FINAL-001 | V2-023; all previous completion records |

## Task details

### FSTG-FINAL-001 — Restore the 2023 previous report

**Status** · Awaiting approved 2023 PDF URL or file

**Page(s)** · [Downloads](http://localhost:3000/reports/federal-state-territory-wir-2026/downloads)

**Comparison with previous work** · Current download data contains 2025 and 2024 only. Earlier client direction removed 2023 and UAT-007 was completed on that basis. The latest feedback requests its return.

**Required result** · Restore a 2023 entry using the approved PSA report title and working URL. Verify the destination and new-window behaviour. Confirm the source if the 2023 file cannot be located. Do not use an invented URL.

**PPT reference** · 7. **Earlier IDs** · UAT-007.

### FSTG-FINAL-001 investigation — 9 November 2026

Checked the [official PSA Workforce Plans page](https://publicskillsaustralia.org.au/workforce-plans). It currently lists the 2026 and 2025 reports and 2024 plans. A search for the 2023 PSA Government workforce report did not identify an official destination. The earlier UAT-007 completion record also confirms that no 2023 link was supplied at that time.

The Downloads component currently has verified 2025 and 2024 entries. Restoring a functional 2023 download requires the approved report URL or the source PDF and its approved hosting destination. Requested this information from the user. Implementation and browser verification remain pending.

### FSTG-FINAL-002 — Correct SA chart placement

**Status** · Completed and verified · 9 November 2026

**Page(s)** · [SA profile](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile_sa) · [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile)

**Comparison with previous work** · Before this correction, SA placed Employees by Age in Workforce Trends and the First Nations representation line chart in Workforce Overview, following the earlier UAT-025 direction. The latest client instruction supersedes that placement.

**Required result** · Place Employees by Age under Workforce Overview and the First Nations representation chart under Workforce Trends. Check both the standalone SA route and combined SA tab. Preserve source associations and chart data.

**PPT reference** · 22–24. **Earlier IDs** · UAT-025; V2-016/017.

**Verification** · Moved the existing Age chart into Workforce Overview and the existing First Nations representation chart into Workforce Trends. Verified both the standalone SA page and the combined SA tab. Compared the complete rendered chart text before and after, including values and citations. The SA tab fits at 390px without page overflow. TypeScript and diff whitespace checks passed.

- Workforce Overview · [Before](../../../../../../../outputs/fstg-final-002/before-overview.jpg) · [After](../../../../../../../outputs/fstg-final-002/after-overview.jpg)
- Workforce Trends · [Before](../../../../../../../outputs/fstg-final-002/before-trends.jpg) · [After](../../../../../../../outputs/fstg-final-002/after-trends.jpg)

The broader slide 22–24 visual reconciliation remains tracked under FSTG-FINAL-009–012.


### FSTG-FINAL-003 — Remove the sentence under the strategy title

**Status** · Completed and verified · 9 November 2026

**Page(s)** · [Proposed Strategy](http://localhost:3000/reports/federal-state-territory-wir-2026/workforce_strategies) · [Alternate strategy URL](http://localhost:3000/reports/federal-state-territory-wir-2026/proposed_strategies)

**Comparison with previous work** · Before this correction, the paragraph immediately beneath the Strategy 1 title began ‘Public Skills Australia will use a strategic-foresight approach…’. Earlier metadata cleanup did not remove this paragraph.

**Required result** · Remove the additional sentence directly below ‘Identify future skills needs for Federal and State/Territory Government’. Verify the precise annotated paragraph in the PPT and check both route aliases.

**PPT reference** · 9, 37. **Earlier IDs** · UAT-009/037; V2-019.

**Verification** · Removed the additional paragraph below the Strategy 1 title. Verified both workforce_strategies and proposed_strategies in the browser. Compared the complete strategy detail text before and after. TypeScript and diff whitespace checks passed.

- [Before](../../../../../../../outputs/fstg-final-003/before.jpg)
- [After](../../../../../../../outputs/fstg-final-003/after.jpg)


### FSTG-FINAL-004 — Apply the circular Proposed Strategy header graphic

**Status** · Completed and verified · 9 November 2026

**Page(s)** · [Proposed Strategy](http://localhost:3000/reports/federal-state-territory-wir-2026/workforce_strategies) · [Alternate strategy URL](http://localhost:3000/reports/federal-state-territory-wir-2026/proposed_strategies)

**Comparison with previous work** · Before this correction, the header used the single /images/stratergies.svg illustration. UAT-037 recorded removal of two extra circular icons. The latest feedback calls for the PPT circular treatment.

**Required result** · Inspect the annotated header visually and match the circles, icons, arrangement, scale, spacing and FSTG colours. Check the Proposed Strategy header specifically. Slide 40 covers the related Update on 2025 Strategies treatment.

**PPT reference** · 37; compare 40. **Earlier IDs** · UAT-037/042.

**Verification** · Inspected slide 37's embedded strategy board, briefcase and training graphics and its “circles” annotation. Reused the existing matching SVG assets, recoloured them to FSTG primary #754C2D and placed them in secondary #EED4C4 circles. Used 80px circles, 48px icon areas and 12px gaps to fit the existing header. Verified both strategy URLs and 390px mobile layout with no horizontal overflow. Compared the page text before and after. TypeScript and diff whitespace checks passed.

- [Before](../../../../../../../outputs/fstg-final-004/before.jpg)
- [After desktop](../../../../../../../outputs/fstg-final-004/after.jpg)
- [After mobile](../../../../../../../outputs/fstg-final-004/after-mobile.jpg)
- [PPT board icon](../../../../../../../outputs/fstg-final-004/reference/slide-37-image-1.png) · [PPT briefcase icon](../../../../../../../outputs/fstg-final-004/reference/slide-37-image-2.png) · [PPT training icon](../../../../../../../outputs/fstg-final-004/reference/slide-37-image-3.png)


### FSTG-FINAL-005 — Use Project 1 / Project 2 / Project 3 labels

**Status** · Completed and verified · 9 November 2026

**Page(s)** · [Project 1](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_project_1) · [Project 2](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_project_2) · [Project 3](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_project_3) · [Parent project links](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_strategies)

**Comparison with previous work** · Before this correction, the reusable project header printed a literal ‘Strategy 2’ on all three pages. The previous completion record explicitly describes that badge.

**Required result** · Display the corresponding Project 1, Project 2 or Project 3 label on each detail page. Check title, badge, parent link and Previous/Next labels for consistency.

**PPT reference** · 41–43. **Earlier IDs** · UAT-045.

**Verification** · The shared project header now displays Project 1, Project 2 or Project 3 from the route's project number. Verified all three badges and titles, compared page text before and after, opened each project from the parent page, and tested Back to Update on 2025 Strategies and Next to Existing Industry-Sector Strategies. Checked Project 3 at 390px with no horizontal overflow. TypeScript and diff whitespace checks passed.

- Project 1 · [Before](../../../../../../../outputs/fstg-final-005/before-project-1.jpg) · [After](../../../../../../../outputs/fstg-final-005/after-project-1.jpg)
- Project 2 · [Before](../../../../../../../outputs/fstg-final-005/before-project-2.jpg) · [After](../../../../../../../outputs/fstg-final-005/after-project-2.jpg)
- Project 3 · [Before](../../../../../../../outputs/fstg-final-005/before-project-3.jpg) · [After](../../../../../../../outputs/fstg-final-005/after-project-3.jpg)
- [Mobile](../../../../../../../outputs/fstg-final-005/after-mobile-project-3.jpg)


### FSTG-FINAL-006 — Resolve VIC five-point layout against six source occupations

**Status** · Completed and verified · approved grouping · 9 November 2026

**Page(s)** · [VIC profile](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile_vic) · [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile)

**Comparison with previous work** · Current code lists six occupations in a numbered six-column row. The earlier user clarification explicitly approved keeping all six. The latest feedback requests 1–5 and notification before any removal.

**Required result** · Compare the PPT annotation with the six source occupations. Present the proposed five-item treatment and identify any omission or consolidation for approval before deleting content. Do not infer that ‘Organisation Professionals’ should be removed.

**PPT reference** · 27. **Earlier IDs** · UAT-029.

**Comparison completed · 9 November 2026.** Inspected slide 27's Workforce Trends screenshot and annotation. The screenshot contains five cards on its first row and a sixth card, “Organisation Professionals”, on a second row. The annotation requests five numbered points in one row. The approved PDF p56 and current VIC component both contain all six occupations in the same order. Neither reference identifies an occupation to remove.

**Approved five-point presentation**

| Numbered card | Occupation text |
| --- | --- |
| 1 | Policy and Planning Managers |
| 2 | Inspectors and Regulatory Officers |
| 3 | Human Resource Professionals |
| 4 | Intelligence and Policy Analysts |
| 5 | General Clerks<br>Organisation Professionals |

Card 5 contains General Clerks and Organisation Professionals on separate lines under one number. The user approved this grouping on 9 November 2026. All six occupation names and their order are preserved.

**Approval and implementation** · The user approved grouping the final two names in card 5. Implemented five numbered cards in one row. Verified five cards and the six exact occupation names on both the standalone VIC page and the VIC tab. The mobile page has no horizontal overflow and the row retains its horizontal scroller. TypeScript and diff whitespace checks passed.

- [Before](../../../../../../../outputs/fstg-final-006/before.jpg)
- [After](../../../../../../../outputs/fstg-final-006/after.jpg)

**Evidence** · [Slide 27 Workforce Trends screenshot](../../../../../../../outputs/fstg-final-006/slide-27-image-0.png). Approved PDF p56 lists the same six occupations.


### FSTG-FINAL-007 — Reconcile navigation and control placement

**Status** · Completed and verified · sequence approved · 9 November 2026

**Page(s)** · [Introduction](http://localhost:3000/reports/federal-state-territory-wir-2026/introduction) · [Workforce Insights](http://localhost:3000/reports/federal-state-territory-wir-2026/workforce_insights) · [Initiatives](http://localhost:3000/reports/federal-state-territory-wir-2026/federal_initiatives)

**Comparison with previous work** · Previous local audits verified the menu, utility row and initiative sequence. They do not settle the client's latest review of the deployed build.

**Required result** · Compare every annotated menu, utility row and Previous/Next example with the live page. Check all eight jurisdiction links and first/last boundaries. Record the slide 39 versus slide 2 forward-navigation discrepancy for a decision if it remains ambiguous.

**PPT reference** · 2–4, 15, 38–39, 47. **Earlier IDs** · UAT-001/002/035/039/040/050; V2-004/023.

**Review and fixes · 9 November 2026**

- Compared the navigation map and utility row instructions on slides 2–4, jurisdiction navigation on slide 15, Workforce Insights controls on slides 38–39, and initiative context/controls on slide 47.
- Fixed active menu indication on alternate routes. Proposed Strategy, State/Territory, Update 2025, Existing Strategies, Initiatives and Looking Forward aliases now select the corresponding canonical menu item. Project detail routes select the parent Update on 2025 Strategies menu item. Downloads aliases carry the current-page attribute on the download link.
- Clicked all eight jurisdiction menu links and verified their destinations. Checked About ordering, nested proposals, three insight entries and removal of Theme 2 from the menu.
- Checked utility rows on 28 report pages at 1280px, 390px and 1920px. Desktop title/control rows align and controls sit at the right. All tested pages fit without horizontal overflow.
- Tested Theme Overview → Insights 1, 2 and 3 → Proposed Strategy → Update 2025, and the reverse sequence. Insight 1's Back button reaches the Theme Overview anchor.
- Tested all 14 initiatives forward and backward on desktop and mobile, including first/last boundaries and synchronized selected numbers/titles. Verified that initiative context remains visible during mobile scrolling.
- Verified that the nested skills-audit menu link opens its proposal and closes the mobile menu.
- TypeScript and diff whitespace checks passed.

**Decision recorded · 9 November 2026** · The user explicitly approved Insight 3 → Proposed Strategy → Update on 2025 Strategies. This resolves the conflicting destinations on slides 2 and 39. The approved path passed the forward and reverse browser checks above. FSTG-FINAL-007 is complete.

**Evidence**

- Active menu on the Proposed Strategy alias · [Before](../../../../../../../outputs/fstg-final-007/before-alias-menu.jpg) · [After](../../../../../../../outputs/fstg-final-007/after-alias-menu.jpg)
- [Mobile menu](../../../../../../../outputs/fstg-final-007/after-mobile-menu.jpg) · [Jurisdiction menu](../../../../../../../outputs/fstg-final-007/verified-jurisdiction-menu.jpg) · [Utility row](../../../../../../../outputs/fstg-final-007/verified-utility-row.jpg)
- [Last initiative controls](../../../../../../../outputs/fstg-final-007/verified-last-initiative.jpg) · [Mobile initiative context](../../../../../../../outputs/fstg-final-007/verified-mobile-initiative-context.jpg) · [Navigation audit](../../../../../../../outputs/fstg-final-007/navigation-audit.json)



### FSTG-FINAL-008 — Reconcile spacing and text wrapping

**Status** · Completed and verified · 9 November 2026

**Page(s)** · [Executive Summary](http://localhost:3000/reports/federal-state-territory-wir-2026/executive_summary) · [Proposed Strategy](http://localhost:3000/reports/federal-state-territory-wir-2026/workforce_strategies) · [Update 2025](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_strategies) · [Project 1](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_project_1) · [Project 2](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_project_2) · [Project 3](http://localhost:3000/reports/federal-state-territory-wir-2026/update_2025_project_3)

**Comparison with previous work** · Earlier trackers marked layout work complete. Current source uses constrained text widths, but client annotations need a fresh visual comparison.

**Required result** · Check paragraph widths, whitespace, side-by-side copy, card padding, header graphics, project chip dimensions and button alignment against the full slide images. Capture specific remaining discrepancies as subtasks.

**PPT reference** · 8–9, 25, 27, 37, 40–43. **Earlier IDs** · UAT-008/026/027/029/037/038/041/043/045.

**Completed change** · Narrowed the Executive Summary strategy detail fields to the same 12px / 72ch treatment as the standalone Proposed Strategy. At 1920px, their measured width changed from approximately 781px to 527px, bringing the Objective, Approach and Impact text into shorter lines. The strategy text was compared before and after and is identical.

**Spacing reconciliation**

| PPT slides | Check | Result |
| --- | --- | --- |
| 8–9 | Executive Summary insight widths and strategy field wrapping | Verified; strategy detail width corrected as above. |
| 25 | Tasmania occupation row and adjacent Industry Insight / narrative | Verified; five numbered items and narrative beside the insight card. |
| 27 | Victoria occupation row and side-by-side narrative | Verified; five numbered cards retain all six approved occupations, with the final two grouped as agreed. |
| 37 | Standalone Proposed Strategy detail width and header spacing | Verified; detail fields match the corrected summary width. |
| 40 | Update 2025 card padding, stakeholder grid and Project Update rows | Verified; all three project rows measure 96px tall, with their Open buttons aligned at the large-screen width. |
| 41–43 | Project 1–3 header spacing and stakeholder dimensions | Verified; stakeholder cards consistently measure 254px × 72px at the large-screen width. |

**Responsive verification** · Checked Executive Summary, both Strategy routes, Update 2025, Projects 1–3, Tasmania and Victoria at 1920px, 1280px and 390px. No horizontal page overflow was measured. This closes the spacing/wrapping scope of FINAL-008; chart presentation, source treatment, large-screen readability and full-deck sign-off retain their separate tracker tasks.

**Evidence** · [Before — summary wrapping](../../../../../../../outputs/fstg-final-008/before-summary-wrapping.jpg) · [After — summary wrapping](../../../../../../../outputs/fstg-final-008/after-summary-wrapping.jpg) · [Mobile summary](../../../../../../../outputs/fstg-final-008/after-mobile-summary.jpg) · [Tasmania layout](../../../../../../../outputs/fstg-final-008/verified-tas-narrative.jpg) · [Victoria layout](../../../../../../../outputs/fstg-final-008/verified-vic-layout.jpg) · [Update project rows](../../../../../../../outputs/fstg-final-008/verified-update-project-rows.jpg) · [Project header](../../../../../../../outputs/fstg-final-008/verified-project-header.jpg) · [Layout measurements](../../../../../../../outputs/fstg-final-008/layout-audit.json).

### FSTG-FINAL-009 — Reconcile chart sizing and presentation

**Status** · Completed and verified · 10 November 2026

**Page(s)** · [Industry Overview](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_overview) · [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile) · all eight jurisdiction routes below

**Comparison with previous work** · Local checks recorded equal skills-chart geometry and consistent jurisdiction surfaces. The latest request requires comparison against visual annotations.

**Required result** · Compare card and plot sizes, bar widths, value positions, label wrapping, gender graphics, chart backgrounds and source alignment. Inspect every jurisdiction and relevant combined-profile state, including the corrected SA arrangement.

**PPT reference** · 12, 14, 16–29, 36. **Earlier IDs** · UAT-012/015/018/019/020/036; V2-023.

**Completed changes**

- Industry Overview: increased skills-chart values to 16px and category labels to 14px black text. Added intentional wrap opportunities after slashes, equal label tracks and a minimum 80px source track that can grow with its text. Both cards, headings, plots and sources align at desktop and presentation widths; citations no longer overflow their allocated 44px track on mobile.
- National Industry Profile: applied the shared white representation surface to First Nations Employment, and the shared sector surface to Diversity. Reserved equal source space, correcting the previous 24px source-start offset.
- NSW, NT, QLD and VIC: matched legend keys to their plotted line colours, using the stronger sector shade already rendered for those lines. NT uses the shared NSW representation chart.

**Slide and jurisdiction reconciliation**

| PPT slides | Area checked | Result |
| --- | --- | --- |
| 12 | Industry Overview skills chart pair | Equal card and plot dimensions; heading and source starts aligned. At 1920px both cards measure 676px × approximately 587px; at 1280px both measure approximately 589px × 587px. No desktop chart scrolling is required. |
| 14 | National APS charts and document graphics | White First Nations surface, consistent Diversity surface and aligned sources. Values remain beside their bars; existing metric and gender graphics verified. |
| 16–17 | NSW — 3 chart cards | Gender/pay-gap document artwork present; gender/diversity sources aligned; white representation surface; legend corrected. |
| 18–20 | NT — 3 chart cards | Gender/pay-gap artwork and stronger representation ink verified; legend corrected. Existing growth and Employee Locations blocks remain in Overview. |
| 21 | QLD — 3 chart cards | Representation/Diversity cards and sources align; white representation surface; legend corrected; projection values fit within the plot. |
| 22–24 | SA — 4 chart cards | Gender and Diversity align; Age remains in Overview and First Nations representation remains in Trends, consistent with the later client clarification and FINAL-002. White representation surface verified. |
| 25 | TAS — 3 chart cards | Consistent sector gender/diversity surfaces, white Aboriginal employment chart, wider bars, readable values and source placement verified. |
| 26–27 | VIC — 4 chart cards | Gender/pay-gap artwork, paired trend-chart/source alignment, white representation surface, negative occupation value and full-width occupation labels verified; legend keys corrected. |
| 28–29 | WA — 2 chart cards plus pay-gap graphic | Diversity remains in Overview; growth/representation remain in Trends; white representation surface and document pay-gap artwork verified. |
| 36 | ACT — 4 chart cards | Equal paired chart geometry, fixed-size value labels, visible negative pay-gap labels, document graphics and aligned sources verified. |

**Local QA** · Checked Industry Overview, National and all eight standalone jurisdiction routes at 1920px, 1280px and 390px. Also opened all eight combined-profile tabs at 1280px and 390px. Measured no horizontal page overflow, out-of-bounds SVG text or chart-source overflow. Wide plots use contained scrolling on narrow screens; keyboard horizontal scrolling was exercised. Reviewed captured chart rows for each jurisdiction. TypeScript and `git diff --check` pass. Approved chart values, wording and source associations were retained.

**Evidence** · [Before/after screenshots and jurisdiction capture index](../../../../../../../outputs/fstg-final-009/README.md) · [Final skills-chart measurements](../../../../../../../outputs/fstg-final-009/final-skills-audit.json) · [Presentation audit](../../../../../../../outputs/fstg-final-009/presentation-audit.json) · [Responsive audit](../../../../../../../outputs/fstg-final-009/responsive-audit.json) · [Combined desktop audit](../../../../../../../outputs/fstg-final-009/combined-desktop-audit.json) · [Combined mobile audit](../../../../../../../outputs/fstg-final-009/combined-mobile-audit.json).

**Scope** · FINAL-009 closes chart sizing/presentation on the local build against the available combined PPT. Source wording/link dependencies, broader presentation/animation QA and deployed sign-off remain under FINAL-010, FINAL-011 and FINAL-012.

### FSTG-FINAL-010 — Reconcile source and footnote presentation

**Status** · Completed and verified · 10 November 2026

**Page(s)** · [Industry Overview](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_overview) · all jurisdiction pages · [Workforce Insights](http://localhost:3000/reports/federal-state-territory-wir-2026/workforce_insights)

**Comparison with previous work** · V2 work restored citations and inline numbers. At the start of this pass, Tasmania's diversity-chart citation still lacked a stable survey destination and the SA First Nations change callout retained 9px brown source copy. Both issues are resolved below.

**Required result** · Check marker attachment, full source text, black readable type, contrast, citation placement and external destinations against the PPT. Resolve or explicitly record the Tasmania URL dependency. Preserve approved wording and associations.

**PPT reference** · 1, 11–13, 16–29, 36. **Earlier IDs** · V2-001/002/005/006/009/011/012/015–018/022.

**Completed fixes**

- SA First Nations change callout: changed the existing citation from 9px brown / 16px line height to 14px black / 24px line height. Linked the unchanged citation wording to the same approved Workforce Information Data Dashboard used by the adjacent representation chart. Applied the standard citation marker so future audits include it.
- Tasmania diversity chart: restored its external citation link using the public PDF for the exact 2024 Tasmanian State Service Employee Survey — Whole of Tasmanian State Service Results Report. The link is published on the official DPAC survey page. Survey questions 40/41/44/46/48 match the chart's 8%, 11%, 6% combined LGBTQIA+, 3% and 8% figures (printed pp4–7).
- Tasmania numbered sources 60–61: updated their generic State Service landing-page destinations to that same specific survey PDF. Citation text, footnote numbering and statement attachment were preserved. Source Link Matrix row 113's former session-specific sign-in dependency is resolved; no Microsoft sign-in URL is used.

**Official destination evidence** · [DPAC survey page — Previous whole-of-service results](https://www.dpac.tas.gov.au/working-in-the-state-service/tss-employee-survey) · [2024 whole-of-service survey PDF](https://www.dpac.tas.gov.au/__data/assets/pdf_file/0017/509120/2024-State-Service-Survey-Results.pdf) · [SA Workforce Information Data Dashboard](https://www.publicsector.sa.gov.au/about/Resources-and-Publications/Workforce-Information/workforce-information-data-dashboard).

**PPT and numbered-note reconciliation**

| PPT reference / area | Verification result |
| --- | --- |
| 1 — inline markers and same-page source lists | Checked the rendered number sequences: About 1; Drivers 2–6; Industry Overview 7–11; ACT 12–22; NSW 23–35; NT 36–42; QLD 43–52; SA 53–57; TAS 58–66; VIC 67–75; WA 76–82; Workforce Insights 83–87; Insight 1 88–92; Insight 2 93–94. Driver 4 and Insight 3 correctly add no numbered research note. |
| 11–13 — Industry Overview | Sources and chart citations render black at 14px / 24px. Skills-chart source tracks retain the alignment and wrapping verified under FINAL-009. |
| 16–29 — jurisdiction citations | Checked all eight standalone profiles and all eight combined-profile tabs. Citation blocks and existing links retain readable black type; NSW/NT dark pay-gap panels keep their white citation insets. SA correction and TAS survey links are included. |
| 36 — ACT chart sources | Full compound-year citations remain visible, with aligned source rows; existing source wording and external destinations retained. |
| Explanatory notes | About 1, ACT 19, VIC 71 and Workforce Insights 84 retain their explanatory text rather than receiving an unrelated external URL. Clicked marker 84 and verified the matching same-page target. |

**Local QA** · Audited 157 source blocks across 17 routes at 1280px and 390px, plus all eight combined-profile tabs at both widths. No remaining audited citation colour/size issues, broken existing same-page marker targets or horizontal page overflow. Source copy computes to black at 14px or larger, with 24px line height. Superscripts remain black and keep their existing positions; accent source-number badges retain their established treatment. Before/after citation text comparison is identical. New external anchors retain the shared underline, `target="_blank"` and `rel="noopener noreferrer"` treatment. TypeScript and `git diff --check` pass.

**Evidence** · [Before/after screenshots and page-by-page evidence index](../../../../../../../outputs/fstg-final-010/README.md) · [Before audit](../../../../../../../outputs/fstg-final-010/before-source-audit.json) · [After audit](../../../../../../../outputs/fstg-final-010/after-source-audit.json) · [Mobile audit](../../../../../../../outputs/fstg-final-010/mobile-source-audit.json) · [Combined-tab audit](../../../../../../../outputs/fstg-final-010/combined-source-audit.json) · [Numbered source associations](../../../../../../../outputs/fstg-final-010/numbered-source-associations.json) · [Expanded driver markers](../../../../../../../outputs/fstg-final-010/driver-footnotes.json).

**Scope** · Source/footnote presentation and the identified survey URL dependency are complete locally against the available combined PPT. Deployed sign-off remains under FINAL-012. External checks verified the newly resolved survey PDF and the SA dashboard destination; the retained approved URLs were inspected in rendered markup, without claiming a fresh live availability audit of every external publication.

### FSTG-FINAL-011 — Reconcile big-screen readability, scrolling and animation

**Status** · Completed and verified locally · 10 November 2026

**Page(s)** · [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile) · [Existing Strategies](http://localhost:3000/reports/federal-state-territory-wir-2026/existing_strategies) · [Initiatives](http://localhost:3000/reports/federal-state-territory-wir-2026/federal_initiatives)

**Comparison with previous work** · V2-023 tested 1280px and 390px locally and fixed strategy context and counter starts. The client has requested presentation readability and full slide comparison.

**Required result** · Verify larger presentation viewports, visible chart labels and source text, selected list/detail context, sticky headers, anchors, opening/closing, animation completion and reduced-motion behaviour. Record the tested viewport and screenshots.

**PPT reference** · 14–29, 36–47. **Earlier IDs** · UAT-015/017/018/036/046/049/050; V2-023.

**Completed changes**

- Existing Strategies: increased detail copy from 12px to 14px with the existing 24px line height; increased the smaller list metadata, selected-number/source badge, period and hero badge from 11px to 12px. This keeps the selected context more legible and brings detail copy into line with Initiatives.
- Combined Industry Profile: added page-scoped reduced-motion rules for entrance, content switching and National chart bars. The bars explicitly retain full opacity and scale when animation is disabled. Existing reduced-motion counter/reveal guards and the map-text guard remain in place.
- Initiatives: added explicit page-scoped reduced-motion rules for the hero, list/panel entrance and changing detail copy. Limited the arrow hover enlargement to normal-motion mode.
- Browser verification refined the initial code-level concern: bars remained visible in the baseline, rather than being confirmed missing. The correction ensures motion is suppressed explicitly and final bar visibility is guaranteed, instead of relying on motion utility classes overriding custom animation rules.

**Local verification**

| Area / PPT reference | Result |
| --- | --- |
| Profiles — slides 14–29, 36 | Opened National and all eight jurisdictions at 2560 × 1440. No horizontal page overflow; chart counts remain National 2, ACT 4, NSW 3, NT 3, QLD 3, SA 4, TAS 3, VIC 4, WA 2. Chart-label/source treatment verified under FINAL-009/010 is retained. |
| Profile opening/closing | Closed and reopened Overview and Trends independently for all eight jurisdictions at 2560px and 390px. Both bodies disappear/reappear correctly, expected charts return, and the report header stays at viewport top 0. |
| Existing Strategies — slide 44 | Exercised all 11 selections forward and all 10 Previous transitions at 1920 × 1080. The selected list item stays within its scrolling list; its number/title and controls remain visible above the separate detail scroller. All 11 forward selections also passed at 390 × 844, plus a mobile Previous check. |
| Initiatives — slide 47 | Exercised all 14 selections forward and all 13 Previous transitions at 1920 × 1080. Selected list context and detail heading remain visible; final item has no extra Next. All 14 forward selections also passed at 390 × 844, plus a mobile Previous check. |
| Additional workspace viewports | Checked first/middle/last selections for both workspaces at 1280 × 900 and 2560 × 1440. No page overflow or hidden selected controls. When long content requires scrolling at 1280px, strategy detail scrolled approximately 301px and initiative 13 scrolled 100px while its context stayed fixed. |
| Mobile sticky context | PageDown checks keep selected number/title/controls pinned at top 72px beneath the report header. Shorter viewports use page scrolling rather than a constrained desktop detail pane. |
| Menu anchors / slides 38–43 | Both Update 2025 proposal anchors were tested at 1280px and 390px. Each retains its expected hash, opens its proposal content and lands below the sticky report header. The agreed Insight 3 → Proposed Strategy → Update 2025 sequence recorded under FINAL-007 is retained. |
| Normal-motion completion | All inspected workspace detail transitions reached opacity 1. National counters completed to 198,529; 172,015; 24,918; 1,596; and 4.4%, each matching its accessible final-value label. |
| Reduced-motion verification | Used a temporary native Chrome tab with the Rendering preference visibly set to `prefers-reduced-motion: reduce`. Verified visible static National bars and final metric values, and saved the active preference with the rendered result. Profile/Initiatives CSS guards and existing strategy CSS/instant-scroll guards were inspected. Restored the temporary browser state and closed the QA tab. |

**Checks** · TypeScript and `git diff --check` pass. Approved report text, figures and navigation order were preserved. Tested widths: 390px, 1280px, 1920px and 2560px, with the per-area coverage listed above.

**Evidence** · [Before/after and viewport screenshot index](../../../../../../../outputs/fstg-final-011/README.md) · [Full presentation Previous/Next sequences](../../../../../../../outputs/fstg-final-011/presentation-sequences.json) · [Mobile sequences](../../../../../../../outputs/fstg-final-011/mobile-sequences.json) · [Workspace viewport checks](../../../../../../../outputs/fstg-final-011/workspace-viewport-checks.json) · [Scrolling and anchors](../../../../../../../outputs/fstg-final-011/scroll-and-anchor-checks.json) · [Large-screen profile audit](../../../../../../../outputs/fstg-final-011/large-profile-audit.json) · [Completed counters and mobile profile toggles](../../../../../../../outputs/fstg-final-011/counter-and-mobile-profile-checks.json).

**Scope** · This closes local readability, scrolling and motion QA for FINAL-011 against the available PPT. Whole-deck reconciliation and deployed-build sign-off remain under FINAL-012. The native reduced-motion runtime check covered National Profile; workspace motion coverage also includes inspection of the explicit media-query and instant-scroll guards.

### FSTG-FINAL-012 — Complete every-slide reconciliation and deployed sign-off

**Status** · Local reconciliation completed · awaiting deployment/recheck and FINAL-001

**Page(s)** · All FSTG pages

**Review completed — 10 November 2026** · Reviewed all 48 rendered slides of the confirmed combined PPT, including visual annotations. Checked 29 local routes (transition plus 28 internal pages) at actual 390px and 1920px viewports, all eight combined jurisdiction tabs, navigation/card links, all 11 strategy and 14 initiative forward selections, and a final-entry reverse transition for each workspace. No document overflow found. Prior FINAL-007–011 detailed chart/source/scrolling/reduced-motion evidence is retained.

**Additional corrections** · Introduction, About, Downloads, Federal Government Initiatives and Looking Forward now explicitly pass the FSTG name to the footer. They previously displayed the shared Local Government default. NT Employee Locations source text changed from 9px brown to 14px black and links to the existing approved NT PDF (Source Link Matrix row 66), preserving its wording and Figure 3 association. The same view fixes the combined NT tab.

**Deployed result** · All 29 preview routes rendered in the read-only check. Confirmed outstanding deployed differences: SA Age/First Nations charts still reversed; repeated sentence still on Proposed Strategy; wrong footer identity on five routes; NT Employee Locations source still 9px brown. These corrections are already present locally. Publish the reviewed release and repeat deployed visual/functional QA before sign-off. No deployment was performed in this task.

**Remaining dependency** · FINAL-001 still needs the approved 2023 report URL/file. The confirmed newer-named PPT copy is identical to the original, so PPT version is no longer an unresolved dependency. VIC grouping and Insight 3 navigation decisions remain resolved and preserved.

**Validation** · TypeScript check and `git diff --check` passed. Local report fallback was used where the report API was unavailable; this is not backend or deployed release certification.

**Evidence** · [48-slide results, page links and screenshot index](../../../../../../../outputs/fstg-final-012/README.md) · [Before footer](../../../../../../../outputs/fstg-final-012/before-about-footer.jpg) / [After footer](../../../../../../../outputs/fstg-final-012/after-about-footer.jpg) · [Before NT source](../../../../../../../outputs/fstg-final-012/before-nt-location-source.jpg) / [After NT source](../../../../../../../outputs/fstg-final-012/after-nt-location-source.jpg) · [Deployed audit](../../../../../../../outputs/fstg-final-012/deployed-audit.json).

**Completion boundary** · Local every-slide reconciliation is complete. FINAL-012 remains open for release verification, and overall FSTG must not be marked complete until FINAL-001 and the deployed release gates are closed.

## VIC content decision

The current six occupations are

1. Policy and Planning Managers
2. Inspectors and Regulatory Officers
3. Human Resource Professionals
4. Intelligence and Policy Analysts
5. General Clerks
6. Organisation Professionals

The client requires notification before any content is removed. The user approved and FSTG-FINAL-006 implements five numbered cards, with General Clerks and Organisation Professionals on separate lines in card 5. All six occupation names are retained. Earlier approval to keep all six is recorded in UAT-029.

## Jurisdiction pages and shared states

- [ACT](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile_act) · also check the corresponding tab in [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile).
- [NSW](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile_nsw) · also check the corresponding tab in [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile).
- [NT](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile_nt) · also check the corresponding tab in [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile).
- [QLD](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile_qld) · also check the corresponding tab in [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile).
- [SA](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile_sa) · also check the corresponding tab in [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile).
- [Tasmania](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile_tas) · also check the corresponding tab in [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile).
- [Victoria](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile_vic) · also check the corresponding tab in [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile).
- [Western Australia](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile_wa) · also check the corresponding tab in [Combined profile tabs](http://localhost:3000/reports/federal-state-territory-wir-2026/industry_profile).

## Slide-by-slide reconciliation checklist

All 48 slides reviewed in presentation order on 10 November 2026. Detailed instructions, route/state results, baseline slide images and local screenshots are recorded in the FINAL-012 reconciliation. Local verification does not certify the current deployed preview.

| Slide | Topic | Previous task(s) | Follow-up task(s) | Review status |
| --- | --- | --- | --- | --- |
| 1 | Review scope and content/footnote completeness | Reference / scope | FSTG-FINAL-010 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 2 | Navigation map | FSTG-UAT-001 | FSTG-FINAL-007 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 3 | Jurisdiction menu entries | FSTG-UAT-001 | FSTG-FINAL-007 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 4 | Report name and right-side controls | FSTG-UAT-002 | FSTG-FINAL-007 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 5 | Transition labels and black text | FSTG-UAT-003 | FSTG-FINAL-012 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 6 | Introduction text and click-through | FSTG-UAT-004 | FSTG-FINAL-012 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 7 | Downloads, Back behaviour and sector colours | FSTG-UAT-005, FSTG-UAT-006, FSTG-UAT-007 | FSTG-FINAL-001 | Reviewed · 2023 URL/file pending FINAL-001; footer fixed locally; deployed recheck pending |
| 8 | Executive Summary insight structure and wrapping | FSTG-UAT-008 | FSTG-FINAL-008 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 9 | Executive Summary / Proposed Strategy consistency | FSTG-UAT-008, FSTG-UAT-009 | FSTG-FINAL-003, FSTG-FINAL-008 | Reviewed locally · current deployed preview has confirmed differences; publish/recheck required |
| 10 | Industry Overview content order | FSTG-UAT-010 | FSTG-FINAL-012 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 11 | Industry Overview text and source colours | FSTG-UAT-011 | FSTG-FINAL-010 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 12 | Equal skills-chart sizes | FSTG-UAT-011, FSTG-UAT-012 | FSTG-FINAL-009, FSTG-FINAL-010 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 13 | Callout colours and graphics | FSTG-UAT-011, FSTG-UAT-013 | FSTG-FINAL-010 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 14 | National APS profile labels and stat placement | FSTG-UAT-014, FSTG-UAT-015 | FSTG-FINAL-009, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 15 | Jurisdiction map and Public Service labels | FSTG-UAT-016, FSTG-UAT-017 | FSTG-FINAL-007, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 16 | Jurisdiction chart presentation | FSTG-UAT-018, FSTG-UAT-019, FSTG-UAT-020 | FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 17 | Jurisdiction chart presentation | FSTG-UAT-018, FSTG-UAT-019, FSTG-UAT-021, FSTG-UAT-022 | FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 18 | NT overview / trends content placement | FSTG-UAT-023 | FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 19 | NT chart consistency | FSTG-UAT-023 | FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 20 | Jurisdiction chart presentation | Reference / scope | FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 21 | Jurisdiction chart presentation | Reference / scope | FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 22 | SA missing overview charts | FSTG-UAT-024, FSTG-UAT-025 | FSTG-FINAL-002, FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · current deployed preview has confirmed differences; publish/recheck required |
| 23 | SA chart treatment | FSTG-UAT-024, FSTG-UAT-025 | FSTG-FINAL-002, FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · current deployed preview has confirmed differences; publish/recheck required |
| 24 | SA chart moves | FSTG-UAT-024, FSTG-UAT-025 | FSTG-FINAL-002, FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · current deployed preview has confirmed differences; publish/recheck required |
| 25 | Tasmania occupation row and Industry Insight layout | FSTG-UAT-026, FSTG-UAT-027 | FSTG-FINAL-008, FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 26 | VIC chart placement and graphics | FSTG-UAT-028 | FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 27 | VIC occupation row and chart presentation | FSTG-UAT-028, FSTG-UAT-029 | FSTG-FINAL-006, FSTG-FINAL-008, FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 28 | WA chart moves and graphics | FSTG-UAT-030 | FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 29 | WA chart consistency | FSTG-UAT-030 | FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 30 | Section reference image | Reference / scope | FSTG-FINAL-012 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 31 | Workforce Insight names | FSTG-UAT-031, FSTG-UAT-035 | FSTG-FINAL-012 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 32 | Productivity and Economic Growth | FSTG-UAT-031, FSTG-UAT-032, FSTG-UAT-035 | FSTG-FINAL-012 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 33 | Workforce Gaps | FSTG-UAT-031, FSTG-UAT-033, FSTG-UAT-035 | FSTG-FINAL-012 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 34 | Future Skills for the Public Service | FSTG-UAT-031, FSTG-UAT-034, FSTG-UAT-035 | FSTG-FINAL-012 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 35 | Part Two divider | Reference / scope | FSTG-FINAL-012 | Reviewed · divider/reference only; no application change required |
| 36 | ACT chart fonts and sources | FSTG-UAT-036 | FSTG-FINAL-009, FSTG-FINAL-010, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 37 | Proposed Strategy header, copy and graphics | FSTG-UAT-037, FSTG-UAT-038 | FSTG-FINAL-003, FSTG-FINAL-004, FSTG-FINAL-008, FSTG-FINAL-011 | Reviewed locally · current deployed preview has confirmed differences; publish/recheck required |
| 38 | Theme Overview to Insight 1 | FSTG-UAT-039 | FSTG-FINAL-007, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 39 | Insight 3 title and forward destination | FSTG-UAT-040 | FSTG-FINAL-007, FSTG-FINAL-011 | Reviewed locally · explicit user-approved sequence retained; deployed sign-off pending |
| 40 | Update 2025 layout, graphics, chips and rows | FSTG-UAT-041, FSTG-UAT-042, FSTG-UAT-043, FSTG-UAT-044 | FSTG-FINAL-008, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 41 | Project 1 | FSTG-UAT-045 | FSTG-FINAL-005, FSTG-FINAL-008, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 42 | Project 2 | FSTG-UAT-045 | FSTG-FINAL-005, FSTG-FINAL-008, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 43 | Project 3 | FSTG-UAT-045 | FSTG-FINAL-005, FSTG-FINAL-008, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 44 | Existing Strategies scrolling | FSTG-UAT-046 | FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 45 | Existing Strategies header graphic | FSTG-UAT-047 | FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 46 | Initiatives header graphic | FSTG-UAT-048 | FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 47 | Initiatives scrolling and Previous/Next | FSTG-UAT-049, FSTG-UAT-050 | FSTG-FINAL-007, FSTG-FINAL-011 | Reviewed locally · FINAL-012 · deployed release sign-off pending |
| 48 | 2027 and Beyond sector colours | FSTG-UAT-051 | FSTG-FINAL-012 | Reviewed locally · FINAL-012 · deployed release sign-off pending |

## Completion evidence required

For each actionable slide, record the annotated instruction, route and selected tab, comparison result, implementation status and before/after screenshot links. Mark an item verified only after checking the rendered result. A historical completion record is insufficient for final sign-off.

FSTG completion requires all 48 slides in the confirmed deck to be reviewed, all explicit follow-up requests to be resolved, the VIC content decision to be recorded, the resolved Tasmania source-link dependency to remain documented under FINAL-010, and a final check of the deployed build.

## Remaining release order

1. Obtain the approved 2023 report URL/file and close FINAL-001.
2. Release the reviewed local changes through the normal deployment process.
3. Recheck the deployed release against all 48 slides and the documented client/user decisions.
4. Record deployed/client acceptance before marking FINAL-012 or overall FSTG complete.
