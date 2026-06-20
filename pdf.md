Public Skills Australia - Digital Workforce Insights Report Platform - SRS v1.1
Draft for review | Prepared by 23 Digital | 19 June 2026
Public Skills Australia
Digital Workforce Insights Report Platform
Software Requirements Specification (SRS)
Draft v1.1 - Discovery / UX Alignment Version
Item Details
Prepared for
Public Skills Australia
Prepared by
23 Digital
Date
19 June 2026
Public Skills Australia - Digital Workforce Insights Report Platform - SRS v1.1
Draft for review | Prepared by 23 Digital | 19 June 2026
Contents

1. Document purpose and status
2. Project background
3. Scope overview
4. Key definitions and terminology
5. Users and use cases
6. Information architecture and user flow
7. Page and template requirements
8. Functional requirements
9. Content and CMS requirements
10. Data, chart, media and technical requirements
11. Non-functional requirements
12. Accessibility and responsive requirements
13. Dependencies, assumptions and open questions
14. Acceptance criteria and approval gates
    Public Skills Australia - Digital Workforce Insights Report Platform - SRS v1.1
    Draft for review | Prepared by 23 Digital | 19 June 2026
15. Document purpose and status
    This Software Requirements Specification (SRS) defines the current functional, UX, content, accessibility and technical requirements for the Public Skills Australia Digital Workforce Insights Report (Digital WIR) platform.
    This version has been prepared as a discovery alignment document. It is designed to support client review, internal delivery alignment, wireframing, design, development estimation and future approval gates.
16. Project background
    Public Skills Australia currently produces detailed Workforce Insights Reports that are distributed as traditional report documents. The objective of this project is to create a digital report platform that makes the 2026 Workforce Insights Reports easier to present, browse, navigate and reuse across stakeholder settings.
    The digital platform should preserve the integrity and depth of the source reports while translating the experience into a web-based format suited to stakeholder presentations, executive scanning, individual reading and deeper exploration of supporting content.
    The project is not simply a PDF-to-web conversion. It requires a reusable report experience made from templates, components and structured content that can be applied across the 2026 report set and adapted for future reports.
17. Scope overview
    3.1 In scope
    •
    Digital WIR Home Page for selecting the active 2026 Workforce Insights Reports.
    •
    Report-specific Transition Landing Page template for each Digital WIR.
    •
    Introduction pathway and Introduction anchor page template.
    •
    Executive Summary pathway and Executive Summary anchor page template.
    •
    Reusable report section templates for deeper content pages.
    •
    Structured navigation patterns including Back to Introduction and Back to Executive Summary actions.
    •
    Downloadable PDF access for full source reports.
    •
    Responsive web design and accessibility-aligned implementation.
    •
    CMS/admin-editable content model, subject to final CMS selection.
    •
    Reusable chart, data, table and media presentation components.
    3.2 Current 2026 report set # Report Notes
    1
    Correctional Services Workforce Insights Report 2026
    Own Transition Landing Page, Introduction pathway and Executive Summary pathway.
    2
    Public Safety Workforce Insights Report 2026
    Own Transition Landing Page; includes Defence, Fire and Emergency Services, and Police sections inside one report.
    3
    Federal and State/Territory Government Workforce Insights Report 2026
    Own Transition Landing Page, Introduction pathway and Executive Summary pathway.
    4
    Local Government Workforce Insights Report 2026
    Own Transition Landing Page; current detailed mapping and first wireframing reference.
    Public Skills Australia - Digital Workforce Insights Report Platform - SRS v1.1
    Draft for review | Prepared by 23 Digital | 19 June 2026
    3.3 Out of scope / not assumed for this version
    •
    Separate top-level cards for Defence, Fire and Emergency Services, and Police on the Digital WIR Home Page. These sit within the Public Safety WIR unless client confirms otherwise.
    •
    Separate current cards for First Nations, Generative AI/Digital Transformation, or Gender Equality reports. These may be future/TBC reports but are not current 2026 report cards in this SRS.
    •
    Backend engine and hosting details remain to be finalised if a single technical path is required.
18. Key definitions and terminology Term Definition
    Digital WIR Home Page
    The central gateway page for the current 2026 Digital Workforce Insights Reports. Users select one of the four active reports from this page.
    Report Transition Landing Page
    A report-specific decision page that lets users choose between Introduction and Executive Summary. This replaces the earlier informal term "front door".
    Introduction Page
    The report reference/individual reading anchor page. It explains the report context, structure, methodology and supporting reference material.
    Executive Summary Page
    The report presentation/big-screen anchor page. It provides a concise overview and enables click-through to deeper supporting content.
    Deeper content page
    A supporting report section or detail page opened from an Introduction or Executive Summary pathway.
    Back to Introduction
    Required navigation action on pages reached from the Introduction pathway.
    Back to Executive Summary
    Required navigation action on pages reached from the Executive Summary pathway.
    Reusable template
    A structured page or component pattern that can be reused across reports with sector-specific content.
19. Users and use cases
    The digital report platform must support different user behaviours. Some users will present the report on a large screen, while others will browse or reference the report individually. User type Primary needs
    Executive / senior stakeholder
    Quickly scan key workforce insights and strategies; present the Executive Summary in meetings.
    Presenter / PSA team member
    Use Executive Summary as an anchor page and click through to deeper content while presenting.
    Industry stakeholder
    Understand sector-specific insights, data, strategies and supporting context.
    Government / policy stakeholder
    Access methodology, workforce evidence, strategic initiatives and federal/government context.
    Internal PSA editor/admin
    Maintain content, update report pages and upload supporting report PDFs through CMS/admin tools.
    ID Use case Description
    UC-01
    Select a 2026 report
    User lands on Digital WIR Home Page and selects one of the four active reports.
    UC-02
    Choose a report entry pathway
    User lands on a report Transition Landing Page and selects Introduction or Executive Summary.
    UC-03
    Present the Executive Summary
    Presenter uses Executive Summary as a large-screen anchor and opens deeper supporting pages as needed.
    UC-04
    Read report context
    User opens Introduction pathway to understand report context, structure and methodology.
    UC-05
    Navigate back to anchor
    User opens a deeper page and returns to Introduction or Executive Summary using a clear back action.
    UC-06
    Download source PDF
    User accesses the full PDF report for offline use or appendix/reference content.
    Public Skills Australia - Digital Workforce Insights Report Platform - SRS v1.1
    Draft for review | Prepared by 23 Digital | 19 June 2026
20. Information architecture and user flow
    6.1 Platform-level flow
    The primary user flow is as follows:
21. PSA Website
22. Digital WIR Home Page
23. User selects a 2026 report
24. Report Transition Landing Page
25. User selects Introduction or Executive Summary
26. User navigates to deeper report content as required
    6.2 Digital WIR Home Page
    The Digital WIR Home Page must present the four active 2026 reports as the primary selection options. It must not show Defence, Fire and Emergency Services, or Police as separate top-level report cards because these are contained within the Public Safety Workforce Insights Report.
    6.3 Report Transition Landing Page
    Each report must have a Transition Landing Page. The page is a decision point only and should not include full report navigation. The page must provide two equal entry options: Introduction and Executive Summary.
    6.4 Anchor-page navigation pattern
    •
    Pages opened from the Introduction pathway must provide a clear Back to Introduction action.
    •
    Pages opened from the Executive Summary pathway must provide a clear Back to Executive Summary action.
    •
    The Report Transition Landing Page must provide a clear way back to the relevant PSA website report/sector page.
    •
    The Digital WIR Home Page must allow users to select another report without losing the overall platform context.
27. Page and template requirements ID Page/template Description Priority
    P-01
    Digital WIR Home Page
    Report selection gateway showing the four active 2026 reports.
    Must
    P-02
    Report Transition Landing Page
    Decision page between Introduction and Executive Summary for each report.
    Must
    P-03
    Introduction Page
    Reference anchor for report context, structure, methodology and supporting reference pages.
    Must
    P-04
    Executive Summary Page
    Presentation anchor with click-through buttons to deeper supporting content.
    Must
    P-05
    Information/Text Page
    Reusable content template for About, Methodology and explanatory sections.
    Must
    P-06
    Drivers of Change Template
    Visual page/template for megatrends and drivers of change.
    Must
    P-07
    Industry Overview/Data Dashboard Template
    Reusable dashboard layout for workforce, map and profile data.
    Must
    P-08
    Workforce Insights Template
    Theme/insight hub and insight detail page templates.
    Must
    P-09
    Strategy/Initiatives Template
    Reusable structure for proposed strategies and updates.
    Must
    P-10
    Existing Strategies / Federal Initiatives Template
    Structured list/detail style for supporting strategy and initiative pages.
    Should
    P-11
    Looking Forward Template
    Future outlook and next steps page template.
    Should
    P-12
    PDF Download / Reference Utility
    Downloadable full report and previous report links.
    Must
    Public Skills Australia - Digital Workforce Insights Report Platform - SRS v1.1
    Draft for review | Prepared by 23 Digital | 19 June 2026
    7.1 Digital WIR Home Page requirements
    •
    Display a clear title, introduction and report selection area.
    •
    Show exactly the four active 2026 reports unless future reports are approved for inclusion.
    •
    Each card must click through to that report's Transition Landing Page.
    •
    Public Safety card may include a small note: Includes Defence, Fire and Emergency Services, and Police.
    •
    Include Contact Us action and standard PSA/global navigation as appropriate.
    7.2 Report Transition Landing Page requirements
    •
    Display report title and short introduction.
    •
    Show two equal pathway cards: Introduction and Executive Summary.
    •
    Include short descriptions explaining each pathway.
    •
    Include Contact Us and Back to PSA report/sector page actions.
    •
    Do not include full report navigation on this page.
    7.3 Introduction Page requirements
    •
    Act as the reference/individual reading anchor for the report.
    •
    Explain report context, source, purpose, structure and methodology.
    •
    Provide links to key reference sections and utilities such as Download PDF and Previous Report PDFs.
    •
    Any connected deeper pages should include Back to Introduction.
    7.4 Executive Summary Page requirements
    •
    Act as the presentation/big-screen anchor page.
    •
    Provide concise summary of the key insights and strategies.
    •
    Include clear click-through buttons/cards to deeper supporting content.
    •
    Any connected deeper pages should include Back to Executive Summary.
    •
    Design must support easy scanning, large-screen presentation and quick return to the summary.
28. Functional requirements ID Requirement Priority Acceptance criteria
    FR-001
    The system shall display a Digital WIR Home Page with four active 2026 report cards.
    Must
    User can view and select each of the four reports.
    FR-002
    Each report card shall link to a report-specific Transition Landing Page.
    Must
    Clicking a card opens the relevant transition page.
    FR-003
    Each Transition Landing Page shall present Introduction and Executive Summary as two equal entry pathways.
    Must
    User can select either pathway without ambiguity.
    FR-004
    Transition Landing Pages shall include a Back to PSA report/sector page link.
    Must
    User can return to the relevant PSA website page.
    FR-005
    Transition Landing Pages shall include Contact Us action.
    Must
    User can access contact page/form.
    FR-006
    Introduction pathway pages shall include Back to Introduction where relevant.
    Must
    Deeper pages include a visible return action.
    FR-007
    Executive Summary pathway pages shall include Back to Executive Summary where relevant.
    Must
    Deeper pages include a visible return action.
    FR-008
    Executive Summary pages shall support click-through navigation to deeper supporting sections.
    Must
    User can open linked supporting pages from summary.
    FR-009
    The platform shall support downloadable PDF links for each report.
    Must
    User can download/open full PDF report.
    FR-010
    The platform shall support reusable page templates across reports.
    Must
    New report content can reuse approved templates.
    FR-011
    The platform shall support structured content for charts, tables, maps and insight cards.
    Should
    Data-rich content can be presented consistently.
    FR-012
    The platform shall support responsive layouts for desktop, tablet and mobile.
    Must
    Pages remain usable at defined breakpoints.
    FR-013
    The platform shall support standard browser navigation and shareable URLs for report pages.
    Should
    Users can share or bookmark relevant pages.
    Public Skills Australia - Digital Workforce Insights Report Platform - SRS v1.1
    Draft for review | Prepared by 23 Digital | 19 June 2026
    FR-014
    The platform shall support analytics tracking for key navigation and engagement events.
    Should
    Events can be measured after launch.
29. Content and CMS requirements
    The final content source for each Digital WIR should be the approved report content supplied by PSA. User-flow diagrams and wireframes define structure and UX intent but should not override the approved report content without client confirmation. ID Area Requirement
    CR-001
    Content source of truth
    Approved report Word/PDF content supplied by PSA shall be treated as the source of truth.
    CR-002
    Structured content
    Report content should be entered into reusable structured fields where practical, rather than hardcoded into pages.
    CR-003
    Page labels
    Page and navigation labels must use approved client terminology.
    CR-004
    PDF access
    Each report must provide access to the full downloadable PDF.
    CR-005
    Appendix handling
    Appendix/participant lists should be linked via PDF unless client asks for full web recreation.
    CR-006
    Future report scalability
    The content model should support additional future reports without rebuilding the platform.
    9.1 CMS/admin requirements - pending confirmation ID Requirement Status
    CMS-001
    Editors should be able to update text content for report pages.
    TBC based on CMS selection.
    CMS-002
    Editors should be able to update CTA labels and URLs.
    TBC based on CMS selection.
    CMS-003
    Editors should be able to upload or replace report PDF files.
    TBC based on CMS selection.
    CMS-004
    Editors should be able to manage chart/table data where feasible.
    TBC - may depend on data model.
    CMS-005
    Admin roles and permissions should be defined.
    TBC - client/admin workflow required.
30. Data, chart, media and technical requirements
    The Digital WIRs contain data-rich pages including maps, charts, tables, profile pages and strategy summaries. These should be implemented using reusable data visualisation standards where feasible.
    10.1 Proposed technical stack
    The following technical stack has been supplied by the Dev Lead for the Digital WIR platform. The stack should be treated as the proposed implementation approach for the SRS. Any unresolved alternatives are marked for confirmation. Area Technology Status / notes
    Front-end core framework
    React / Next.js
    Confirmed proposed stack
    Front-end coding language
    TypeScript
    Confirmed proposed stack
    Styling and design framework
    Tailwind CSS
    Confirmed proposed stack
    Back-end application engine
    Node.js (Express) / Python (FastAPI)
    Decision still required if only one engine will be used
    Data pipeline / API setup
    REST API
    Confirmed proposed stack
    Interactive charts
    Recharts
    Confirmed proposed stack
    Advanced data tables
    TanStack Table
    Confirmed proposed stack
    App state / data fetching
    TanStack Query
    Confirmed proposed stack
    Primary database
    PostgreSQL
    Confirmed proposed stack
    Caching / speed booster
    Redis caching
    Confirmed proposed stack
    Public Skills Australia - Digital Workforce Insights Report Platform - SRS v1.1
    Draft for review | Prepared by 23 Digital | 19 June 2026
    10.2 Data, chart and media requirements ID Requirement Priority
    DR-001
    Charts and data visualisations should use consistent visual treatment across reports.
    Must
    DR-002
    Data sources and source notes must be displayed where provided in the report.
    Must
    DR-003
    Charts should be accessible and understandable without relying on colour alone.
    Must
    DR-004
    Interactive data elements should degrade gracefully on smaller screens.
    Should
    DR-005
    Media placeholders such as video/visual blocks should be optional and CMS-manageable if used.
    Could
    DR-006
    The proposed charting approach is Recharts. Any map/geographic visualisation library remains TBC if required.
    TBC
31. Non-functional requirements ID Category Requirement Priority
    NFR-001
    Performance
    Pages should load quickly and avoid unnecessary heavy assets, especially for presentation use.
    Must
    NFR-002
    Reliability
    Core report content and navigation should remain available without broken links.
    Must
    NFR-003
    Maintainability
    Templates and components should be reusable across the current four reports and future reports.
    Must
    NFR-004
    Security
    Admin/CMS access must be protected through appropriate authentication and permissions.
    Must
    NFR-005
    Browser support
    Support modern evergreen browsers including Chrome, Edge, Safari and Firefox.
    Must
    NFR-006
    Scalability
    Platform should support additional Digital WIR reports in future.
    Should
    NFR-007
    Content governance
    Content publishing and approval responsibilities must be confirmed with PSA.
    TBC
32. Accessibility and responsive requirements
    The experience should be designed and implemented in line with WCAG 2.2 AA principles where feasible. Accessibility must be considered from UX and design through to development and QA. ID Requirement Priority
    A11Y-001
    Use semantic headings and logical page structure.
    Must
    A11Y-002
    All interactive controls must be keyboard accessible.
    Must
    A11Y-003
    Text and important UI elements must meet contrast requirements.
    Must
    A11Y-004
    Charts and maps must include accessible alternatives or descriptions.
    Must
    A11Y-005
    Links and buttons must have clear labels and visible focus states.
    Must
    A11Y-006
    Content should not rely on colour alone to convey meaning.
    Must
    ID Breakpoint/use case Requirement
    RWD-001
    Desktop / large screen
    Primary design target for presentation use; recommended 1920 x 1080 design consideration.
    RWD-002
    Standard desktop/laptop
    Common browsing layout, e.g. 1440px wide.
    RWD-003
    Tablet
    Report cards and page sections should stack/reflow cleanly.
    RWD-004
    Mobile
    Core content, navigation and CTAs must remain accessible; complex charts may need simplified presentation.
    Public Skills Australia - Digital Workforce Insights Report Platform - SRS v1.1
    Draft for review | Prepared by 23 Digital | 19 June 2026
33. Dependencies, assumptions and open questions
    13.1 Assumptions
    •
    The four uploaded 2026 reports are the current active reports for the first Digital WIR platform release.
    •
    The Local Government WIR is the first detailed mapping example and will inform reusable templates for other reports.
    •
    The Digital WIR Home Page and report-specific Transition Landing Pages are in scope.
    •
    Final design will be created in Figma after discovery and wireframe alignment.
    •
    Technical architecture will be confirmed by the Dev Lead and may affect CMS/data implementation details.
    13.2 Dependencies ID Dependency Priority
    DEP-001
    Final backend engine decision if a single API engine must be selected (Node.js/Express, Python/FastAPI, or hybrid).
    High
    DEP-002
    Final sitemap/IA approval.
    High
    DEP-003
    Confirmed CMS/admin workflow and editor permissions.
    High
    DEP-004
    Final approved content and PDF assets from PSA.
    High
    DEP-005
    Brand/design guidance and any PSA website integration constraints.
    Medium
    DEP-006
    Analytics/tagging requirements and platform access.
    Medium
    14.3 Open questions ID Open question
    OQ-001
    Confirm whether the backend application engine will be Node.js (Express), Python (FastAPI), or a hybrid approach.
    OQ-002
    Will PSA editors update structured chart/data content directly, or will updates be handled by 23 Digital?
    OQ-003
    Should the Digital WIR Home Page show future/TBC reports, or only active 2026 reports? Current assumption: only active 2026 reports.
    OQ-004
    Will video/visual placeholders be real content at launch or wireframe/design placeholders only?
    OQ-005
    What is the approved PDF/appendix handling rule for participant lists and long appendices? Current assumption: PDF-only unless requested.
34. Acceptance criteria and approval gates ID Acceptance criterion
    AC-001
    Digital WIR Home Page displays four active 2026 reports and links to correct transition pages.
    AC-002
    Each Transition Landing Page clearly presents Introduction and Executive Summary as two equal entry options.
    AC-003
    Introduction and Executive Summary anchor pages use the approved navigation return behaviours.
    AC-004
    Reusable templates can support Local Government WIR content and be adapted for other reports.
    AC-005
    Pages meet agreed accessibility, responsive and performance requirements.
    AC-006
    CMS/admin functionality meets confirmed content management workflow.
    AC-007
    All client-approved source content and PDF assets are correctly represented or linked.
    Gate Approval point Purpose
    Gate 1
    Discovery/SRS approval
    Confirm requirements, scope, terminology, assumptions and open questions.
    Gate 2
    Sitemap/IA approval
    Confirm platform flow, report flow and page hierarchy.
    Gate 3
    Wireframe approval
    Approve page-level UX structure before visual design.
    Gate 4
    UI design approval
    Approve visual design direction and component system.
    Gate 5
    Development build review
    Review implemented templates and interactions.
    Gate 6
    UAT approval
    Validate content, navigation, accessibility, responsiveness and stakeholder requirements.
    Gate 7
    Go-live approval
    Final sign-off for launch.
    Public Skills Australia - Digital Workforce Insights Report Platform - SRS v1.1
    Draft for review | Prepared by 23 Digital | 19 June 2026
    Public Skills Australia - Digital Workforce Insights Report Platform - SRS v1.1
    Draft for review | Prepared by 23 Digital | 19 June 2026
    Appendix A. Local Government WIR page mapping
    The following mapping reflects the latest supplied Local Government Workforce Insights Report 2026 PDF page numbers and is included to support wireframing and template planning. Report section PDF page(s) Digital treatment
    About Public Skills Australia
    3
    Introduction/reference pathway
    Executive Summary
    4-5
    Executive Summary anchor page
    Introduction / Structure
    6
    Introduction anchor page
    Methodology
    7-8
    Introduction/reference pathway
    Drivers of Change
    9-10
    Presentation and reference content
    Local Government Industry-Sector Overview
    11-12
    Industry overview/data template
    State and Territory Workforce Profile
    13-20
    Map/profile/data dashboard template
    Industry Profile
    21-22
    Data dashboard/profile template
    Workforce Insights
    23-30
    Theme and insight templates
    2026 Proposed Local Government Workforce Strategies
    31-32
    Strategy template
    Workforce Insights: Update on 2025 Strategies
    33-35
    Strategy update template
    Existing Industry-Sector Strategies
    36-47
    Existing strategies template
    Federal Government Initiatives
    48-58
    Federal initiatives/reference template
    2027 and Beyond
    59
    Looking Forward template
    Appendix A
    60+
    PDF-only by default unless PSA requests web recreation
    Appendix B. Recommended first wireframe sequence Order Wireframe Purpose
    1
    Digital WIR Home Page
    Report gateway showing four active 2026 reports.
    2
    LG WIR Transition Landing Page
    Decision page between Introduction and Executive Summary.
    3
    LG WIR Introduction Page
    Reference/individual reading anchor page.
    4
    LG WIR Executive Summary Page
    Presentation/big-screen anchor page.
    5
    Drivers of Change Template
    Reusable visual context template.
    6
    Industry Overview / Data Dashboard Template
    Reusable data-rich template.
    7
    Workforce Insights Template
    Reusable theme/insight detail template.
    8
    Strategies Template
    Reusable proposed/update/existing strategy template.
