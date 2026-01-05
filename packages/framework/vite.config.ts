import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyAdminFramework',
      fileName: 'my-admin-framework',
    },
    rollupOptions: {
      external: [
        'vue',
        '@floating-ui/vue',
        '@tiptap/extension-image',
        '@tiptap/extension-link',
        '@tiptap/extension-text-align',
        '@tiptap/extension-underline',
        '@tiptap/starter-kit',
        '@tiptap/vue-3',
        'apexcharts',
        'date-fns',
        'lucide-vue-next',
        'sortablejs',
        'vue-i18n',
        'vue3-apexcharts',
        'vuedraggable'
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
