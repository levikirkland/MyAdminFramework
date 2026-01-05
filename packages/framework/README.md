# MyAdmin Framework

A professional, lightweight Vue 3 Admin Framework built with TypeScript and Vite.

## Features

- 🚀 **Vue 3 + TypeScript**: Built with the latest stack.
- 🎨 **Modern Design**: Clean, consistent UI components.
- 📱 **Responsive**: Mobile-first grid system.
- 🧩 **Rich Components**: From basic buttons to complex charts and tables.
- 🌗 **Dark Mode**: Built-in support for dark theme.
- 📦 **Lightweight**: Modular and tree-shakable.

## Installation

```bash
npm install my-admin-framework
```

## Usage

```typescript
import { createApp } from 'vue'
import MyAdminFramework from 'my-admin-framework'
import 'my-admin-framework/dist/my-admin-framework.css'

const app = createApp(App)
app.use(MyAdminFramework)
app.mount('#app')
```

## Components

### Layout & Grid
- **MaLayout**: Main application shell with sidebar and header slots.
- **MaRow**: Grid row container with gutter support.
- **MaCol**: Grid column with responsive spans (xs, sm, md, lg, xl).
- **MaSidebar**: Collapsible sidebar navigation.
- **MaHeader**: Top header bar.
- **MaCard**: Content container with title and actions.

### Data Entry
- **MaInput**: Text input with labels and error states.
- **MaSelect**: Dropdown select menu.
- **MaCheckbox**: Checkbox input.
- **MaRadio**: Radio button group.
- **MaSwitch**: Toggle switch.
- **MaTextarea**: Multi-line text input.
- **MaDatePicker**: Date selection input.
- **MaUpload**: Drag-and-drop file upload.
- **MaFormGroup**: Wrapper for form controls.

### Data Display
- **MaTable**: Advanced data table with sorting and pagination.
- **MaChart**: Interactive charts powered by ApexCharts.
- **MaAvatar**: User avatars (image, text, icon).
- **MaTag**: Status tags and labels.
- **MaBadge**: Notification badges.
- **MaTooltip**: Hover tooltips.
- **MaBreadcrumb**: Navigation breadcrumbs.
- **MaTabs**: Tabbed interface.

### Feedback
- **MaAlert**: Contextual alert messages.
- **MaToast**: Toast notifications.
- **MaModal**: Dialog modals.

## Example: Dashboard Layout

```vue
<template>
  <MaLayout>
    <template #sidebar>
      <MaSidebar>...</MaSidebar>
    </template>
    <template #header>
      <MaHeader>...</MaHeader>
    </template>
    
    <MaRow :gutter="[24, 24]">
      <MaCol :span="12">
        <MaCard title="Sales">
          <MaChart type="line" :series="series" />
        </MaCard>
      </MaCol>
      <MaCol :span="12">
        <MaCard title="Users">
          <MaTable :data="users" :columns="columns" pagination />
        </MaCard>
      </MaCol>
    </MaRow>
  </MaLayout>
</template>
```

## License

MIT
