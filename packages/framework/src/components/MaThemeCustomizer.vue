<template>
  <div class="ma-theme-customizer">
    <button class="ma-theme-trigger" @click="isOpen = true">
      <Settings :size="24" class="spin-slow" />
    </button>

    <MaDrawer 
      v-model="isOpen" 
      title="Theme Settings" 
      width="320px"
    >
      <div class="ma-theme-section">
        <h4 class="ma-theme-title">Layout Mode</h4>
        <div class="ma-layout-options">
          <div 
            class="ma-layout-option"
            :class="{ 'is-active': layoutMode === 'sidebar' }"
            @click="setLayoutMode('sidebar')"
          >
            <div class="layout-preview sidebar-preview">
              <div class="preview-sidebar"></div>
              <div class="preview-content">
                <div class="preview-header"></div>
              </div>
            </div>
            <span>Sidebar</span>
          </div>
          
          <div 
            class="ma-layout-option"
            :class="{ 'is-active': layoutMode === 'top-nav' }"
            @click="setLayoutMode('top-nav')"
          >
            <div class="layout-preview top-nav-preview">
              <div class="preview-header"></div>
              <div class="preview-content"></div>
            </div>
            <span>Top Nav</span>
          </div>
        </div>
      </div>

      <div class="ma-theme-section">
        <h4 class="ma-theme-title">Theme Mode</h4>
        <div class="ma-mode-switch">
          <button 
            class="mode-btn"
            :class="{ 'is-active': !isDark }"
            @click="isDark && toggleDarkMode()"
          >
            <Sun :size="18" /> Light
          </button>
          <button 
            class="mode-btn"
            :class="{ 'is-active': isDark }"
            @click="!isDark && toggleDarkMode()"
          >
            <Moon :size="18" /> Dark
          </button>
        </div>
      </div>

      <div class="ma-theme-section">
        <h4 class="ma-theme-title">Primary Color</h4>
        <div class="ma-color-grid">
          <button
            v-for="color in themeColors"
            :key="color.value"
            class="color-btn"
            :class="{ 'is-active': primaryColor === color.value }"
            :style="{ backgroundColor: color.value }"
            @click="setPrimaryColor(color.value)"
          >
            <Check v-if="primaryColor === color.value" :size="14" color="white" />
          </button>
        </div>
      </div>
    </MaDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Settings, Sun, Moon, Check } from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme'
import MaDrawer from './MaDrawer.vue'

const isOpen = ref(false)
const { 
  isDark, 
  layoutMode, 
  primaryColor, 
  themeColors, 
  toggleDarkMode, 
  setLayoutMode, 
  setPrimaryColor 
} = useTheme()
</script>

<style scoped>
.ma-theme-trigger {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: var(--ma-primary);
  color: white;
  border: none;
  padding: 10px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  cursor: pointer;
  z-index: 999;
  box-shadow: -2px 0 8px rgba(0,0,0,0.1);
  transition: background 0.2s;
}

.ma-theme-trigger:hover {
  background: var(--ma-primary-hover);
}

.spin-slow {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.ma-theme-section {
  margin-bottom: 24px;
}

.ma-theme-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--ma-text-main);
}

/* Layout Options */
.ma-layout-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.ma-layout-option {
  cursor: pointer;
  text-align: center;
  font-size: 0.85rem;
  color: var(--ma-text-secondary);
}

.layout-preview {
  height: 60px;
  background: var(--ma-bg-secondary);
  border: 2px solid transparent;
  border-radius: 6px;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
  transition: all 0.2s;
}

.ma-layout-option.is-active .layout-preview {
  border-color: var(--ma-primary);
  background: var(--ma-primary-light);
}

.sidebar-preview .preview-sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 30%;
  background: var(--ma-text-main);
  opacity: 0.1;
}

.sidebar-preview .preview-header {
  position: absolute;
  top: 0;
  right: 0;
  left: 30%;
  height: 20%;
  background: var(--ma-text-main);
  opacity: 0.2;
}

.top-nav-preview .preview-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20%;
  background: var(--ma-text-main);
  opacity: 0.2;
}

/* Mode Switch */
.ma-mode-switch {
  display: flex;
  background: var(--ma-bg-secondary);
  padding: 4px;
  border-radius: 6px;
}

.mode-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  border: none;
  background: transparent;
  color: var(--ma-text-secondary);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.mode-btn.is-active {
  background: var(--ma-bg-card);
  color: var(--ma-primary);
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* Color Grid */
.ma-color-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.color-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.color-btn:hover {
  transform: scale(1.1);
}

.color-btn.is-active {
  border-color: var(--ma-text-main);
}
</style>
