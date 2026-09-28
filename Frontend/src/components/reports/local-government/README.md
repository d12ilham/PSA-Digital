# Local Government Report Workspace

This folder is the isolated workspace for the **Local Government Workforce Insights Report**.

## Scope:
- **Local Government Councils & Authorities across Australia**
- **18 Chapter Views & Sub-views**
- **Interactive Australia Map with LGA details**

## Directory Structure:
- `views/`: Contains all Local Government chapter views (e.g. `ExecutiveSummaryView.tsx`, `StateTerritoryView.tsx`, `IndustryProfileView.tsx`).
- `index.ts`: Exports all views and the `localGovernmentViews` dictionary used by `src/components/reports/registry.tsx`.

## Theming:
- Badge / Primary Color: `#046D2A` (`bg-lg-dark`)
- Accent Color: `#85CC00` (`bg-lg-light`)
- Header Background: `#252D02`
