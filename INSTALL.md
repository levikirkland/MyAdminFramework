# MyAdminFramework - Installation Guide

Quick guide to install MyAdminFramework in a new project.

## Available Packages

**✅ Tests Passed:** All Playwright tests successful (2/2 passed)

### 1. `my-admin-framework-0.0.2.tgz` (143 KB)
**NPM-ready framework library package** - Install this in any Vue 3 project

### 2. `my-admin-framework-complete.tar.gz` (348 KB)
**Complete source with templates** - Full monorepo with example templates

### 3. `my-admin-ai-chat-v1.0.0.tar.gz` (12 KB)
**AI Chat component only** - Standalone chat interface

---

## Quick Start: Install Framework in New Project

### Method 1: Install from .tgz (Recommended)

```bash
# Create new Vue 3 project
npm create vue@latest my-new-app
cd my-new-app
npm install

# Install MyAdminFramework from the package file
npm install /path/to/my-admin-framework-0.0.2.tgz

# Install required peer dependencies
npm install lucide-vue-next vue-router pinia
```

### Method 2: Extract Complete Source

```bash
# Extract the complete framework
tar -xzf my-admin-framework-complete.tar.gz
cd my-admin-framework-complete

# Install dependencies
npm install

# Build framework
npm run build:framework

# Run template (with all examples)
npm run dev
```

---

## Using the Framework

### Basic Setup

**main.ts:**
```typescript
import { createApp } from 'vue'
import App from './App.vue'
import MyAdminFramework from 'my-admin-framework'
import 'my-admin-framework/style.css'

const app = createApp(App)
app.use(MyAdminFramework)
app.mount('#app')
```

### Import Components

```vue
<script setup lang="ts">
import { 
  MaButton, 
  MaCard, 
  MaTable,
  MaModal,
  useTheme,
  useNotification 
} from 'my-admin-framework'
</script>

<template>
  <MaCard title="Hello Framework">
    <MaButton variant="solid" color="primary">Click Me</MaButton>
  </MaCard>
</template>
```

### Using the AI Chat

```bash
# If you want just the AI Chat component:
tar -xzf my-admin-ai-chat-v1.0.0.tar.gz
cd ai-chat-package

# Install dependencies
npm install marked dompurify

# Copy AiChat.vue to your project
cp AiChat.vue /path/to/your/project/src/views/
```

Then add to router:
```typescript
import AiChat from './views/AiChat.vue'

const routes = [
  { path: '/ai-chat', component: AiChat }
]
```

---

## What's Included

### Components (80+)
- **Layout:** MaLayout, MaSidebar, MaHeader, MaNavbar
- **Forms:** MaInput, MaSelect, MaCheckbox, MaRadio, MaSwitch
- **Data:** MaTable, MaTree, MaPagination, MaStatWidget
- **Navigation:** MaBreadcrumb, MaTabs, MaSteps
- **Feedback:** MaAlert, MaModal, MaNotification, MaToast
- **Business:** MaCheckout, MaShoppingCart, MaPricingCard
- **Content:** MaBlogCard, MaCourseCard, MaJobCard, MaRecipe
- **Special:** MaAiAssistant, MaKanban, MaCalendar, MaChart
- **New:** AiChat (full-screen AI chat interface)

### Composables
- `useTheme()` - Dark mode, layout modes
- `useNotification()` - Toast & notifications
- `usePermission()` - Role-based access
- `useCrud()` - Data operations
- `useForm()` - Form validation

### Directives
- `v-permission` - Show/hide based on permissions

### Utilities
- Request handler with auth
- Security utilities (XSS prevention)
- Confirm dialogs
- i18n support (en, zh, es, fr, de, ja)

---

## Template Examples Included

The complete package includes 3 templates:

1. **packages/template** - Full admin dashboard with all features
2. **packages/simple-template** - Minimal starter
3. **packages/docs** - Component documentation

---

## Production Build

```bash
# Build your app with the framework
npm run build

# Framework assets are automatically included
# Output in dist/ folder ready to deploy
```

---

## File Sizes

- Framework bundle: 247 KB (JS) + 184 KB (CSS)
- gzipped: ~54 KB (JS) + ~26 KB (CSS)
- Tree-shakeable: Only import what you use

---

## Requirements

- **Node.js:** 16+
- **Vue:** 3.5+
- **Vue Router:** 4.0+
- **TypeScript:** 5.0+ (optional but recommended)

---

## Next Steps

1. ✅ Install package in your project
2. ✅ Import framework and stylesheet
3. ✅ Start using components
4. 📖 Check component examples in template
5. 🎨 Customize theme variables
6. 🚀 Build and deploy

## Support

- **Examples:** See `packages/template/src/views/` for usage examples
- **AI Chat Setup:** See `AI_CHAT_GUIDE.md`
- **Cart/Checkout:** See `CART_CHECKOUT_GUIDE.md`

---

## License

MIT - Use freely in your projects!
