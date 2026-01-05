<template>
  <div class="ma-recipe" :class="`ma-recipe--${variant}`">
    <!-- Recipe Header -->
    <div class="recipe-header">
      <div v-if="showImage && (image || $slots.image)" class="recipe-image">
        <slot name="image">
          <img v-if="image" :src="image" :alt="title" />
        </slot>
        <div v-if="difficulty" class="recipe-difficulty-badge" :class="`difficulty-${difficulty}`">
          {{ difficulty }}
        </div>
      </div>
      
      <div class="recipe-header-content">
        <div class="recipe-title-section">
          <h2 class="recipe-title">{{ title }}</h2>
          <div v-if="$slots.actions" class="recipe-actions">
            <slot name="actions" />
          </div>
        </div>
        
        <p v-if="description" class="recipe-description">{{ description }}</p>
        
        <div class="recipe-meta">
          <div v-if="prepTime" class="meta-item">
            <Clock :size="16" />
            <span class="meta-label">Prep:</span>
            <span class="meta-value">{{ prepTime }}</span>
          </div>
          <div v-if="cookTime" class="meta-item">
            <Timer :size="16" />
            <span class="meta-label">Cook:</span>
            <span class="meta-value">{{ cookTime }}</span>
          </div>
          <div v-if="servings" class="meta-item">
            <Users :size="16" />
            <span class="meta-label">Serves:</span>
            <span class="meta-value">{{ servings }}</span>
          </div>
          <div v-if="calories" class="meta-item">
            <Flame :size="16" />
            <span class="meta-value">{{ calories }} cal</span>
          </div>
        </div>

        <div v-if="tags && tags.length" class="recipe-tags">
          <MaTag v-for="tag in tags" :key="tag" size="small">{{ tag }}</MaTag>
        </div>
      </div>
    </div>

    <!-- Recipe Content -->
    <div class="recipe-content">
      <!-- Ingredients Section -->
      <div class="recipe-section ingredients-section">
        <div class="section-header">
          <h3 class="section-title">
            <ChefHat :size="20" />
            Ingredients
          </h3>
          <button 
            v-if="allowChecking" 
            class="clear-checks-btn" 
            @click="clearChecks"
            :disabled="checkedIngredients.size === 0"
          >
            Clear All
          </button>
        </div>
        
        <ul class="ingredients-list">
          <li 
            v-for="(ingredient, index) in ingredients" 
            :key="index"
            class="ingredient-item"
            :class="{ 'is-checked': checkedIngredients.has(index) }"
          >
            <label v-if="allowChecking" class="ingredient-checkbox">
              <input 
                type="checkbox" 
                :checked="checkedIngredients.has(index)"
                @change="toggleIngredient(index)"
              />
              <span class="checkmark"></span>
            </label>
            <span v-else class="ingredient-bullet">•</span>
            <span class="ingredient-text">{{ ingredient }}</span>
          </li>
        </ul>
      </div>

      <!-- Instructions Section -->
      <div class="recipe-section instructions-section">
        <div class="section-header">
          <h3 class="section-title">
            <ListOrdered :size="20" />
            Instructions
          </h3>
        </div>
        
        <ol class="instructions-list">
          <li 
            v-for="(instruction, index) in instructions" 
            :key="index"
            class="instruction-item"
          >
            <span class="instruction-number">{{ index + 1 }}</span>
            <span class="instruction-text">{{ instruction }}</span>
          </li>
        </ol>
      </div>

      <!-- Notes Section (Optional) -->
      <div v-if="notes || $slots.notes" class="recipe-section notes-section">
        <div class="section-header">
          <h3 class="section-title">
            <FileText :size="20" />
            Notes
          </h3>
        </div>
        <div class="notes-content">
          <slot name="notes">
            <p>{{ notes }}</p>
          </slot>
        </div>
      </div>

      <!-- Nutrition (Optional) -->
      <div v-if="nutrition" class="recipe-section nutrition-section">
        <div class="section-header">
          <h3 class="section-title">
            <Activity :size="20" />
            Nutrition (per serving)
          </h3>
        </div>
        <div class="nutrition-grid">
          <div v-for="(value, key) in nutrition" :key="key" class="nutrition-item">
            <span class="nutrition-label">{{ formatNutritionLabel(key) }}</span>
            <span class="nutrition-value">{{ value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Slot -->
    <div v-if="$slots.footer" class="recipe-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Clock, Timer, Users, Flame, ChefHat, ListOrdered, FileText, Activity } from 'lucide-vue-next'
import MaTag from './MaTag.vue'

const props = withDefaults(defineProps<{
  title: string
  description?: string
  image?: string
  ingredients: string[]
  instructions: string[]
  prepTime?: string
  cookTime?: string
  servings?: number | string
  calories?: number
  difficulty?: 'Easy' | 'Medium' | 'Hard'
  tags?: string[]
  notes?: string
  nutrition?: Record<string, string>
  variant?: 'default' | 'compact' | 'detailed'
  allowChecking?: boolean
  showImageInCompact?: boolean
}>(), {
  variant: 'default',
  allowChecking: true,
  showImageInCompact: false
})

const emit = defineEmits<{
  'ingredient-check': [index: number, checked: boolean]
}>()

const checkedIngredients = ref<Set<number>>(new Set())

const showImage = props.variant !== 'compact' || (props.variant === 'compact' && props.showImageInCompact)

const toggleIngredient = (index: number) => {
  if (checkedIngredients.value.has(index)) {
    checkedIngredients.value.delete(index)
    emit('ingredient-check', index, false)
  } else {
    checkedIngredients.value.add(index)
    emit('ingredient-check', index, true)
  }
}

const clearChecks = () => {
  checkedIngredients.value.clear()
}

const formatNutritionLabel = (key: string): string => {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
}
</script>

<style scoped>
.ma-recipe {
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 12px;
  overflow: hidden;
}

/* Header */
.recipe-header {
  display: flex;
  flex-direction: column;
}

.ma-recipe--default .recipe-header {
  flex-direction: column;
}

.ma-recipe--detailed .recipe-header {
  flex-direction: column;
}

.recipe-image {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  background: var(--ma-bg-page);
}

.ma-recipe--compact .recipe-image {
  height: 200px;
}

.recipe-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-difficulty-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
}

.difficulty-Easy {
  color: #10b981;
  border: 1px solid #10b981;
}

.difficulty-Medium {
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

.difficulty-Hard {
  color: #ef4444;
  border: 1px solid #ef4444;
}

.recipe-header-content {
  padding: 24px;
}

.recipe-title-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
}

.recipe-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: var(--ma-text-main);
}

.recipe-actions {
  display: flex;
  gap: 8px;
}

.recipe-description {
  color: var(--ma-text-muted);
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.recipe-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--ma-text-main);
  font-size: 0.875rem;
}

.meta-item svg {
  color: var(--ma-primary);
}

.meta-label {
  color: var(--ma-text-muted);
}

.meta-value {
  font-weight: 600;
}

.recipe-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* Content */
.recipe-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 24px;
}

.ma-recipe--default .recipe-content {
  grid-template-columns: 1fr 2fr;
}

.ma-recipe--detailed .recipe-content {
  grid-template-columns: 1fr 2fr;
}

.recipe-section {
  background: var(--ma-bg-page);
  border-radius: 8px;
  padding: 20px;
}

.ingredients-section {
  grid-column: 1;
}

.instructions-section {
  grid-column: 2;
}

.ma-recipe--compact .ingredients-section,
.ma-recipe--compact .instructions-section {
  grid-column: 1;
}

.notes-section,
.nutrition-section {
  grid-column: 1 / -1;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--ma-border);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: var(--ma-text-main);
}

.section-title svg {
  color: var(--ma-primary);
}

.clear-checks-btn {
  padding: 4px 12px;
  font-size: 0.75rem;
  background: transparent;
  border: 1px solid var(--ma-border);
  border-radius: 4px;
  color: var(--ma-text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.clear-checks-btn:hover:not(:disabled) {
  background: var(--ma-bg-card);
  border-color: var(--ma-primary);
  color: var(--ma-primary);
}

.clear-checks-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Ingredients */
.ingredients-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ingredient-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s;
}

.ingredient-item:hover {
  background: var(--ma-bg-card);
}

.ingredient-item.is-checked .ingredient-text {
  text-decoration: line-through;
  opacity: 0.5;
}

.ingredient-checkbox {
  position: relative;
  display: flex;
  cursor: pointer;
  user-select: none;
}

.ingredient-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid var(--ma-border);
  border-radius: 4px;
  background: var(--ma-bg-card);
  transition: all 0.2s;
}

.ingredient-checkbox:hover .checkmark {
  border-color: var(--ma-primary);
}

.ingredient-checkbox input:checked ~ .checkmark {
  background: var(--ma-primary);
  border-color: var(--ma-primary);
}

.ingredient-checkbox input:checked ~ .checkmark::after {
  content: '✓';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.ingredient-bullet {
  color: var(--ma-primary);
  font-size: 1.5rem;
  line-height: 1;
  margin-top: -2px;
}

.ingredient-text {
  flex: 1;
  color: var(--ma-text-main);
  line-height: 1.5;
}

/* Instructions */
.instructions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  counter-reset: instruction;
}

.instruction-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.instruction-number {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ma-primary);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.875rem;
}

.instruction-text {
  flex: 1;
  color: var(--ma-text-main);
  line-height: 1.6;
  padding-top: 6px;
}

/* Notes */
.notes-content {
  padding: 16px;
  background: var(--ma-bg-card);
  border-left: 3px solid var(--ma-primary);
  border-radius: 4px;
  color: var(--ma-text-muted);
  line-height: 1.6;
}

.notes-content p {
  margin: 0;
}

/* Nutrition */
.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
}

.nutrition-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: var(--ma-bg-card);
  border-radius: 6px;
  text-align: center;
}

.nutrition-label {
  font-size: 0.75rem;
  color: var(--ma-text-muted);
  text-transform: uppercase;
  font-weight: 600;
}

.nutrition-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ma-text-main);
}

/* Footer */
.recipe-footer {
  padding: 20px 24px;
  border-top: 1px solid var(--ma-border);
  background: var(--ma-bg-page);
}

/* Responsive */
@media (max-width: 768px) {
  .recipe-content {
    grid-template-columns: 1fr !important;
  }
  
  .ingredients-section,
  .instructions-section {
    grid-column: 1 !important;
  }
  
  .recipe-meta {
    gap: 12px;
  }
  
  .recipe-title {
    font-size: 1.5rem;
  }
}
</style>
