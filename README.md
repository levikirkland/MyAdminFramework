 np# MyAdminFramework & MyAdminTemplate

A comprehensive Vue 3 admin framework with 100+ customizable components, now available on npm.

## About

**MyAdminFramework** is a production-ready Vue 3 + TypeScript admin framework featuring a complete component library with charts, tables, forms, layouts, and an integrated AI chat interface.

**MyAdminTemplate** is a full-featured admin dashboard template built with MyAdminFramework, ready to be customized for your application.

## Installation

### Using MyAdminFramework in Your Project

The framework is published on npm and can be installed directly:

```bash
npm install my-admin-framework
```

Then use it in your Vue 3 application:

```javascript
import { createApp } from 'vue'
import MyAdminFramework from 'my-admin-framework'
import 'my-admin-framework/dist/my-admin-framework.css'
import App from './App.vue'

const app = createApp(App)
app.use(MyAdminFramework)
app.mount('#app')
```

### Development Setup

To work on the framework and template locally:

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
   npm run dev
   ```

## Starting a New Project

### Option 1: Install from npm (Recommended)

```bash
# Create a new Vue 3 project
npm create vite@latest my-admin-app -- --template vue-ts

# Install MyAdminFramework
cd my-admin-app
npm install my-admin-framework
```

Then follow the [Using MyAdminFramework](#using-myadminframework-in-your-project) section above.

### Option 2: Use the Template as Starter

Clone or fork this repository and customize the template:

1. Copy `packages/template` to your project directory
2. Update `package.json` with your project details
3. Install dependencies: `npm install`
4. Update routing in `src/router.ts`
5. Customize navigation in `src/App.vue`
6. Create your views in `src/views/`

## Key Features

- **100+ Vue 3 Components**: Button, Card, Table, Chart, Layout, Modal, Form, and more
- **Dark Mode Support**: Full dark mode theme with CSS variables
- **AI Chat Integration**: Built-in MaAiChat component with real API support
- **Advanced Tables**: Sorting, filtering, pagination, CSV export
- **Data Visualization**: Charts, statistics widgets, activity feeds
- **Security**: Audit logs, permission system, error boundaries
- **Responsive Design**: Mobile-friendly layouts
- **TypeScript Support**: Fully typed components

## Featured Components

| Component | Purpose |
|-----------|---------|
| **MaLayout** | Main layout wrapper with sidebar and header |
| **MaSidebar** | Navigation sidebar |
| **MaHeader** | Top header bar |
| **MaTable** | Advanced data table with sorting/filtering |
| **MaChart** | ApexCharts wrapper |
| **MaButton** | Customizable button with variants |
| **MaCard** | Card container with slots |
| **MaForm** | Form builder components |
| **MaModal** | Modal dialog |
| **MaAiChat** | AI chat interface with real API support |

