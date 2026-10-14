# Public Safety WIR 2026 correction progress

Approved reference: `C:\Users\wmsan\Downloads\PSA_Public Safety Workforce Insights Report 2026_FA_PRINT.pdf`.

The supplied register lists PS-001 through PS-074 (74 items). Its summary says 76; PS-075 and PS-076 have not been supplied. The supporting workbook was available in the user's browser and its Defence Data, FES Chart Data, FES Jurisdiction, Police Data, and Specialist Table sheets were reviewed. Those sheets provide exact replacements for several charts and maps. The remaining three open P0 series need approved underlying data. Do not interpolate intermediate chart values.

| Priority | Code corrected | Open |
| --- | ---: | ---: |
| P0 Critical | 21 | 3 |
| P1 High | 40 | 0 |
| P2 Medium | 10 | 0 |
| Total supplied | 71 | 3 |

"Code corrected" means the identified code change has been made and checked against the supplied register and PDF text where relevant. It does not mean that every affected page has passed a full visual QA pass.

## P0 Critical

| Status | IDs | Notes |
| --- | --- | --- |
| Code corrected | PS-001, PS-010, PS-014, PS-016, PS-018, PS-020, PS-025, PS-026, PS-027, PS-028, PS-029, PS-030, PS-031, PS-032, PS-033, PS-034, PS-038, PS-045, PS-048, PS-050, PS-060 | Corrected content carry-over and exact Defence/FES headcount, qualification, and jurisdiction datasets. The five FES overview six-year series come from the Productivity Commission RoGS 2026 tables 9A.4–9A.7; the approved PDF's 2023–24 demand value (525,317) takes precedence over the currently published table sum (525,346). |
| Awaiting approved series/data | PS-017, PS-052, PS-061 | The workbook confirms endpoints but does not supply all intermediate points for these series. PS-052 shows only verified 2020/2024 endpoints. The other current digital series are not signed off. Obtain the approved underlying datasets, then replace and QA every plotted value. |

## P1 High

| Status | IDs | Notes |
| --- | --- | --- |
| Code corrected | PS-003, PS-004, PS-005, PS-006, PS-007, PS-008, PS-009, PS-011, PS-012, PS-015, PS-019, PS-022, PS-023, PS-024, PS-035, PS-036, PS-037, PS-039, PS-040, PS-041, PS-042, PS-044, PS-047, PS-049, PS-051, PS-053, PS-054, PS-055, PS-056, PS-057, PS-058, PS-063, PS-064, PS-065, PS-066, PS-067, PS-068, PS-069, PS-070, PS-071 | Corrected codes, approved wording, relevant footnotes, carry-over labels, and links. Executive Summary dropdowns use approved statements. Specialist table matches the PDF. Defence headcount displays approved percent changes. Appendix A has 22 program entries and footnotes 87–109. |

## P2 Medium

| Status | IDs | Notes |
| --- | --- | --- |
| Code corrected | PS-002, PS-013, PS-021, PS-043, PS-046, PS-059, PS-062, PS-072, PS-073, PS-074 | The Introduction now displays its actual eight digital sections; the PDF's Structure table groups these into seven categories. |

## Verification

- Component QA map dependency audit: `data/overview.ts` and `data/pageInventory.ts` are present in the repository. The About function descriptions and Introduction at-a-glance values were checked against approved report pp3–6. The eight digital structure cards are an implementation grouping of the PDF's seven structural categories; five card destinations were corrected to their dedicated Public Safety routes. `pageInventory.ts` is a routing/blank-page scaffold, not a source of approved report copy.
- Inventory-only routes: `fes_federal_initiatives` and `downloads` still resolve to `PublicSafetyBlankView`; they have not been certified as implemented report content. The report landing route is handled separately from this page inventory.
- TypeScript `tsc --noEmit`: passes.
- Footnote/source audit: checked the listed sections against the approved PDF. Core Skill Alignment (8–10), Skills Recognition (11), Defence Overview (12–15), Disaster Recovery (53–62), Surf Life Saving (63–64), Hazardous Materials (65–66 plus NCVER chart source), Police Overview (67–68), Digital Forensics (69–82), Regional Leadership (83, 85–86), and Appendix A (87–109) have their approved numbering and inline/source associations. The Defence and Police overview markers and source 10 were corrected during this audit.
- Open source-text gap: the approved PDF's Police Regional Leadership section (printed p103, PDF p105) places marker 84 after the operational-capacity statement but does not print a corresponding footnote 84 source entry. The marker is retained; no source text has been invented. Obtain the approved footnote 84 text before source sign-off.
- Browser spot-checks: Executive Summary Police headings; Police Industry Overview national chart and all six year/value labels; Surf Life Saving chart, comparison list and sources; Hazardous Materials text and verified endpoint display; Appendix A titles, program copy and 87–109 source list; Defence headcount percent figures and ACT map; FES ACT jurisdiction map.
- Not yet complete: full per-page visual QA and chart-data reconciliation for the three open P0 items.
- The local Next.js dev overlay shows an API 404 error on the viewed pages. This was present during QA and is not a sign-off blocker for the corrections above, but it should be investigated before release.
