# Frontend Reports Architecture & Developer Guide

---

## 1. Quick Reference: Where to Work

Each developer works **strictly** within their designated sector directory. Modifying files outside your assigned folder is unnecessary and will cause merge conflicts.

| Sector | Developer Workspace Path | Export File | Status |
| :--- | :--- | :--- | :--- |
| **Local Government** | `Frontend/src/components/reports/local-government/` | `local-government/index.ts` | Complete (Reference) |
| **Public Safety** | `Frontend/src/components/reports/public-safety/` | `public-safety/index.ts` | Starter views ready |
| **Federal & State** | `Frontend/src/components/reports/federal-state/` | `federal-state/index.ts` | Starter views ready |
| **Correctional Services** | `Frontend/src/components/reports/correctional-services/` | `correctional-services/index.ts` | Starter views ready |

### Files You Work In:
- `Frontend/src/components/reports/<your-sector>/views/` — Put all your page components here.
- `Frontend/src/components/reports/<your-sector>/index.ts` — Register your view mappings here.
- `Frontend/src/components/reports/<your-sector>/data/` (optional) — Static data or yearly JSON/TS mocks.

### Files You NEVER Touch:
- `Frontend/src/app/reports/[slug]/[pageType]/page.tsx` (Shared Next.js router)
- `Frontend/src/components/reports/registry.tsx` (Central registry)
- `Frontend/src/config/reports/sectors.ts` (Global theme configuration)
- `Frontend/src/components/layout/ReportHeader.tsx` (Shared header)
- `Frontend/src/components/layout/ReportFooter.tsx` (Shared footer)

---

## 2. Standard Workflow: How to Build a View (2 Steps Only)

### Step 1: Create the Component
Create a new file inside your sector's `views/` folder.
**Example**: `Frontend/src/components/reports/public-safety/views/PublicSafetyIndustryOverviewView.tsx`

Use this standard boilerplate for all views:

```tsx
"use client";

import React from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

export default function PublicSafetyIndustryOverviewView({
  slug,
  report,
}: {
  slug: string;
  report: any;
}) {
  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between antialiased">
      {/* 1. Header (automatically applies your sector branding & year) */}
      <ReportHeader slug={slug} report={report} currentPage="industry_overview" />

      {/* 2. Main Page Content */}
      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Previous / Next navigation buttons */}
        <ReportNavButtons slug={slug} currentPage="industry_overview" />

        {/* Page Hero Card */}
        <div className="bg-white border border-gray200 rounded-2xl p-6 sm:p-10 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray900">
            Industry Overview
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed max-w-4xl">
            Public Safety sector data and workforce profiles...
          </p>
        </div>

        {/* Page-specific sections, charts, tables, etc. go here */}
      </main>

      {/* 3. Footer */}
      <ReportFooter />
    </div>
  );
}
```

### Step 2: Register in Your Sector's `index.ts`
Open `Frontend/src/components/reports/<your-sector>/index.ts` and add the mapping:

```ts
import PublicSafetyExecutiveSummaryView from "./views/PublicSafetyExecutiveSummaryView";
import PublicSafetyIntroductionView from "./views/PublicSafetyIntroductionView";
import PublicSafetyIndustryOverviewView from "./views/PublicSafetyIndustryOverviewView"; // 1. Import view

export const publicSafetyViews: Record<string, React.ComponentType<{ slug: string; report: any }>> = {
  executive_summary: PublicSafetyExecutiveSummaryView,
  introduction: PublicSafetyIntroductionView,
  industry_overview: PublicSafetyIndustryOverviewView, // 2. Add pageType key
};
```

**Done.** The page will immediately render when visiting `/reports/<slug>/industry_overview`.

---

## 3. Standard Chapter Keys (`pageType`)

Use these standard `pageType` keys when registering views in your sector's `index.ts`:

| `pageType` Key | Chapter Title |
| :--- | :--- |
| `introduction` | Introduction |
| `about` | About Public Skills Australia |
| `methodology` | Methodology |
| `executive_summary` | Executive Summary |
| `drivers_of_change` | Drivers of Change |
| `industry_overview` | Industry-Sector Overview |
| `state_territory` | State and Territory Profile |
| `industry_profile` | Industry Profile |
| `workforce_insights` | Workforce Insights |
| `workforce_strategies` | Workforce Strategies |
| `looking_forward` | Looking Forward |
| `downloads` | Downloads & References |

*Note: If a developer hasn't created a specific view yet, the router automatically shows a sector-branded **"Chapter View in Development"** placeholder instead of throwing a 404.*

---

## 4. Sector Theming & Color Tokens

When designing cards, badges, and accents, use the assigned sector color values:

| Sector | Shortcode | Primary Color | Header Background | Accent Color | Badge Class |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Local Government** | `LG WIR` | `#046D2A` | `#252D02` | `#85CC00` | `bg-lg-dark` |
| **Public Safety** | `PS WIR` | `#38485B` | `#1E293B` | `#FF8400` | `bg-[#38485B]` |
| **Federal & State** | `FS WIR` | `#694834` | `#382219` | `#E07A5F` | `bg-[#694834]` |
| **Correctional Services** | `CS WIR` | `#0B6DA8` | `#063B5D` | `#38BDF8` | `bg-[#0B6DA8]` |

---

## 5. Complete Directory Tree

```text
Frontend/
├── src/
│   ├── app/
│   │   └── reports/
│   │       ├── page.tsx                          <-- Reports Archive (All 4 sectors)
│   │       └── [slug]/
│   │           ├── page.tsx                      <-- Report Cover & Pathway Selector
│   │           └── [pageType]/
│   │               └── page.tsx                  <-- DO NOT EDIT (Router only)
│   │
│   ├── components/
│   │   └── reports/
│   │       ├── registry.tsx                      <-- DO NOT EDIT (Central Registry)
│   │       ├── SectorViewPlaceholder.tsx         <-- DO NOT EDIT (Fallback component)
│   │       │
│   │       ├── local-government/                 <-- 🏛️ REFERENCE SECTOR
│   │       │   ├── views/                        <-- 18 complete views to reference
│   │       │   ├── index.ts
│   │       │   └── README.md
│   │       │
│   │       ├── public-safety/                    <-- 🚒 PUBLIC SAFETY WORKSPACE
│   │       │   ├── views/                        <-- WORK HERE
│   │       │   ├── index.ts                      <-- REGISTER HERE
│   │       │   └── README.md
│   │       │
│   │       ├── federal-state/                    <-- 🏛️ FEDERAL & STATE WORKSPACE
│   │       │   ├── views/                        <-- WORK HERE
│   │       │   ├── index.ts                      <-- REGISTER HERE
│   │       │   └── README.md
│   │       │
│   │       └── correctional-services/            <-- 🛡️ CORRECTIONAL SERVICES WORKSPACE
│   │           ├── views/                        <-- WORK HERE
│   │           ├── index.ts                      <-- REGISTER HERE
│   │           └── README.md
│   │
│   └── config/
│       └── reports/
│           └── sectors.ts                        <-- DO NOT EDIT (Sector metadata & colors)
```

---

## 6. How Routing & Database Integration Works (Under the Hood)

1. **Dashboard & DB**: Each report in the dashboard is linked to an industry (`local-government`, `public-safety`, `federal-state-territory-government`, `correctional-services`).
2. **API**: When visiting `/reports/[slug]`, the API returns `report.industry.slug`.
3. **Sector Resolution**: `sectors.ts` maps `report.industry.slug` to the sector configuration (or infers it from the URL slug if offline).
4. **Registry Dispatch**: `registry.tsx` checks the sector's `index.ts` dictionary for the requested `pageType`.
5. **Render**: The sector's view component is rendered. If missing, `SectorViewPlaceholder` is displayed.

---

## 7. Local Testing URLs

Start the frontend server (`npm run dev` in `Frontend/`):

- **Main Directory**: `http://localhost:3000/reports`
- **Local Government Landing**: `http://localhost:3000/reports/local-government-workforce-insights-report`
- **Public Safety Landing**: `http://localhost:3000/reports/public-safety-wir-2026`
- **Federal & State Landing**: `http://localhost:3000/reports/federal-state-territory-wir-2026`
- **Correctional Services Landing**: `http://localhost:3000/reports/correctional-services-wir-2026`

**Direct Chapter Reader URLs**:
- `http://localhost:3000/reports/public-safety-wir-2026/executive_summary`
- `http://localhost:3000/reports/federal-state-territory-wir-2026/executive_summary`
- `http://localhost:3000/reports/correctional-services-wir-2026/executive_summary`
- `http://localhost:3000/reports/local-government-workforce-insights-report/executive_summary`
