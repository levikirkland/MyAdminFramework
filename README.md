 np# MyAdminFramework & MyAdminTemplate

This project contains a custom Vue.js framework and an Admin Template built with it.

## Structure

- `packages/framework`: The core UI framework (MyAdminFramework).
- `packages/template`: The Admin Template (MyAdminTemplate) using the framework.

## Getting Started

1. Install dependencies at the root:
   ```bash
   npm install
   ```

2. Build the framework:
   ```bash
   cd packages/framework
   npm run build
   ```

3. Run the template in dev mode:
   ```bash
   cd packages/template
   npm run dev
   ```

## Starting a New Project

To use this template as a starter for your own business application:

1. **Copy the Template**: Copy the `packages/template` folder to a new location (or rename it).
2. **Update Package Info**: Update `package.json` with your project name.
3. **Install Framework**: Ensure `my-admin-framework` is linked or installed. If you are keeping the monorepo structure, it works out of the box.
4. **Customize**:
   - **Routing**: Edit `src/router.ts` to add your own views.
   - **Navigation**: Edit `src/App.vue` to update the sidebar.
   - **Views**: Create new views in `src/views/` using the provided components.

## Key Features

- **Data Tables**: Advanced tables with sorting, filtering, and CSV export (`MaTable`).
- **Security**: Built-in Audit Log view and Security Settings.
- **Charts & Widgets**: Ready-to-use visualization components.
- **Print Friendly**: Optimized styles for printing reports and dashboards.

## Components in MyAdminFramework

- `MaButton`: Customizable button component.
- `MaCard`: Card container with title and actions slots.
- `MaLayout`: Main layout wrapper with sidebar and header slots.
- `MaSidebar`: Sidebar navigation container.
- `MaHeader`: Top header bar with title and actions slots.
- `MaTable`: Advanced data table.
- `MaChart`: Chart wrapper (ApexCharts).

