# Public Safety Report Workspace

This folder is the isolated workspace for the **Public Safety Workforce Insights Report**.
Developers working on Public Safety can work entirely inside this directory without modifying shared routes or other sectors.

## Sub-sectors covered:
- **Fire and Emergency Services**
- **Police**
- **Defence**

## Directory Structure:
- `views/`: Add chapter views here (e.g. `ExecutiveSummaryView.tsx`, `IntroductionView.tsx`, `IndustryOverviewView.tsx`).
- `index.ts`: Export the view components so they can be registered in `src/components/reports/registry.ts`.
- `data/`: (Optional) Put static mock data or year-specific data files (e.g. `2026.ts`, `2025.ts`).

## Theming:
- Badge / Primary Color: `#38485B`
- Accent Color: `#FF8400`
- Header Background: `#1E293B`
