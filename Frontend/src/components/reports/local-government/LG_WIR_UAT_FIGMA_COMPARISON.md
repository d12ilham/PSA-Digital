# Local Government WIR — UAT versus Figma comparison

Checked: 8 November 2026. This is a read-only comparison of the [30 October UAT checklist](LG_WIR_UAT_FEEDBACK_30_OCT.md), the current `01. LG-WIR Report` Figma page, the local implementation, and the approved Local Government WIR PDF where noted. It does not change Figma or report code.

Figma file: [Public-Skills-Australia](https://www.figma.com/design/vpt7ZElCDH0cMzL7ouYLPY/Public-Skills-Australia?node-id=776-6668). The connected Figma inspection tool was unavailable, so the findings below come from visible Figma frames in the browser. Static frames cannot establish whether prototype links or scrolling work. "Confirmed" applies only to the listed items, not to every subtask on the same UAT slide.

## Confirmed findings

| UAT item | Figma evidence | Current implementation | Decision |
| --- | --- | --- | --- |
| **4.1–4.2** Move footnote 3 off `280` and onto body text | [Methodology frame 05](https://www.figma.com/design/vpt7ZElCDH0cMzL7ouYLPY/Public-Skills-Australia?node-id=776-19223) visibly shows `280³`. | `MethodologyView.tsx` still renders `<AnimatedCounter target={280} suffix="³" />`. | **Figma and code would both need updating** if this UAT instruction is approved. The approved PDF's printed p8 also shows `280³`, so resolve this conflict before changing either source. |
| **12.1** Remove the source notes duplicated above the bottom Sources section | [Industry Overview frame 21](https://www.figma.com/design/vpt7ZElCDH0cMzL7ouYLPY/Public-Skills-Australia?node-id=776-19432) shows a `Sources (13–16)` note in the multidisciplinary card and a separate bottom Sources section. | `IndustryOverviewView.tsx` renders both. | **Figma and code change requested** by UAT. Confirm exactly which card notes should go while keeping the numbered bottom citations. |
| **12.2–12.5** Remove the extra datapoints sentence; restore both paragraphs and contain their width | Frame 21 shows the two approved paragraphs inside the multidisciplinary card and does not show the extra introductory sentence. | `IndustryOverviewView.tsx` has the paragraphs in a card and no matching extra sentence. | **Already in Figma and code** for these specific items. No further design change indicated by this comparison. |
| **17.1** Local Government specific occupational shortages overview wording | [Workforce Insights frame 33](https://www.figma.com/design/vpt7ZElCDH0cMzL7ouYLPY/Public-Skills-Australia?node-id=776-18493) shows the approved Theme 1 Insight 3 statement. | `LG-V2-015` corrected the card wording. | **Already in Figma and code.** |
| **17.2** Full training-budget overview wording | Frame 33 says local councils have limited training budgets to support the financial impost of course enrolment and travel to and from training. | `WorkforceInsightsView.tsx` still has the shortened sentence `Limited training budgets to support course enrolment and travel to access training.` `LG-V2-017` remains open in the V2 register. | **Already in Figma; code missed the full wording.** Update the report card from the approved PDF. |
| **17.3–17.4 / 18.3** Full Theme 1 footnotes 27–28 | [Theme 1 Insight 1 frame 37](https://www.figma.com/design/vpt7ZElCDH0cMzL7ouYLPY/Public-Skills-Australia?node-id=776-17842) ends after the insight cards and does not show the full 27–28 citations. | `Theme1InsightSubView.tsx` now renders both full citations and links under Theme context (`LG-V2-018`). | **Figma update needed; code has the approved citations.** Keep their presence and wording in code. |
| **22.2** Limited access to TAFE/RTO wording | [Theme 2 Insight 1 frame 40](https://www.figma.com/design/vpt7ZElCDH0cMzL7ouYLPY/Public-Skills-Australia?node-id=776-18093) shows `Access to TAFE or RTOs in regional, rural and remote locations is limited.` | `Theme2InsightSubView.tsx` uses the same plural detail heading. The overview card uses singular `RTO`, as printed on approved p21 (`LG-V2-016`). | **Already in Figma and code** for the detail heading. Preserve the approved singular overview wording. |
| **22.5** Remove the repeated Industry Insight from Theme 2 Insight 1 | Frame 40 still shows an Industry Insight panel beside the detail. | `Theme2InsightSubView.tsx` now renders the shared panel only with Insight 4 (`LG-V2-024`). | **Figma update needed; code already follows the UAT/V2 correction.** Check frames 41–43 for the same design drift before editing them. |
| **39.1**, federal initiative content review | [Federal Government Initiatives frame 65](https://www.figma.com/design/vpt7ZElCDH0cMzL7ouYLPY/Public-Skills-Australia?node-id=776-8357) still titles the page `Federal Government Initiatives` and begins the list with `The Australian Government’s Strategic Priorities`. | The digital page says `Commonwealth Government Initiatives` (`LG-V2-041`) and begins with `National Agreement on Closing the Gap`; all 14 JSON records were checked against the approved PDF (`LG-V2-042`). | **Figma content update needed.** Its title and first initiative are behind the approved PDF and current code. Do not replace the verified JSON with the older Figma list. |

## Items a static Figma frame cannot settle

The visual design may show a button or footnote marker without proving its destination or behaviour. Check these against the report implementation and, if present, Figma prototype connections:

| UAT items | Required verification |
| --- | --- |
| **2.1–2.2, 3.2, 11.1, 13.2, 46.1** | Page, PDF and contact link destinations; some URLs were marked "to be provided". |
| **9.1–9.2, 10.1–10.2, 18.5, 20.4, 21.5** | Footnote/source destinations across the report. |
| **39.4, 40.1** | Whether initiative content stays visible during scrolling. |

## Remaining design review

The remaining checklist items have **not yet been individually classified** from current Figma frames. They include the Introduction and Previous Reports deletions; Drivers of Change footnote placement and Megatrends wrapping; State/Territory and Industry Profile marked boxes; the uninspected Theme 1 and Theme 2 detail variants; strategy panels; Existing Industry-Sector Strategies; federal initiative formatting in frames after 65; and the 2027 contact treatment. Their UAT wording alone cannot prove whether the requested appearance is already in Figma. Check each corresponding frame before labeling it a code miss or a Figma update.

## Source decision

Use the approved PDF and reconciled V2 register for report copy and data, the Figma frames for the intended visual layout, and the UAT deck for change requests. When these disagree, record the conflict before implementation. Footnote marker 3 is the clearest current conflict: the UAT deck asks to move it, while the approved PDF, Figma and code show it on `280`.
