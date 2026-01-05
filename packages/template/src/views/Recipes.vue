<template>
  <div class="recipes-page">
    <div class="page-header">
      <div>
        <h1>Recipe Components</h1>
        <p>Showcase of recipe component variants</p>
      </div>
    </div>

    <!-- Default Variant -->
    <div class="recipe-demo-section">
      <h2 class="section-title">Default (with Image)</h2>
      <MaCard>
      <MaRecipe
        title="Classic Spaghetti Carbonara"
        description="A traditional Italian pasta dish made with eggs, cheese, guanciale, and black pepper. Simple ingredients come together for an incredibly rich and satisfying meal."
        image="https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800"
        :ingredients="carbonaraIngredients"
        :instructions="carbonaraInstructions"
        prep-time="10 min"
        cook-time="20 min"
        :servings="4"
        :calories="520"
        difficulty="Medium"
        :tags="['Italian', 'Pasta', 'Quick', 'Comfort Food']"
        notes="For best results, use room temperature eggs and add them off the heat to prevent scrambling. Pasta water is key for a creamy sauce!"
        :nutrition="{
          protein: '22g',
          carbs: '54g',
          fat: '24g',
          fiber: '2g'
        }"
      >
        <template #actions>
          <MaButton size="small" color="secondary">
            <Heart :size="16" />
          </MaButton>
          <MaButton size="small" color="secondary">
            <Share2 :size="16" />
          </MaButton>
        </template>
        <template #footer>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; gap: 8px; align-items: center;">
              <MaAvatar src="" :name="'Chef Mario'" :size="32" />
              <div>
                <div style="font-weight: 600; font-size: 0.875rem;">Chef Mario</div>
                <div style="font-size: 0.75rem; color: var(--ma-text-muted);">Posted 2 days ago</div>
              </div>
            </div>
            <MaButton color="primary">Try This Recipe</MaButton>
          </div>
        </template>
      </MaRecipe>
      <template #footer>
        <details>
          <summary>Show Code</summary>
          <pre class="code-block"><code>&lt;MaRecipe
  title="Classic Spaghetti Carbonara"
  description="A traditional Italian pasta dish..."
  image="https://images.unsplash.com/photo-1612874742237..."
  :ingredients="carbonaraIngredients"
  :instructions="carbonaraInstructions"
  prep-time="10 min"
  cook-time="20 min"
  :servings="4"
  :calories="520"
  difficulty="Medium"
  :tags="['Italian', 'Pasta', 'Quick']"
  notes="For best results, use room temperature eggs..."
  :nutrition="{ protein: '22g', carbs: '54g', fat: '24g' }"
/&gt;</code></pre>
        </details>
      </template>
      </MaCard>
    </div>

    <!-- Compact Variant -->
    <div class="recipe-demo-section">
      <h2 class="section-title">Compact (No Image)</h2>
      <MaCard>
      <MaRecipe
        variant="compact"
        title="Quick Avocado Toast"
        description="A healthy and delicious breakfast or snack ready in minutes."
        :ingredients="avocadoIngredients"
        :instructions="avocadoInstructions"
        prep-time="5 min"
        :servings="2"
        :calories="240"
        difficulty="Easy"
        :tags="['Breakfast', 'Vegan', 'Quick']"
      />
      <template #footer>
        <details>
          <summary>Show Code</summary>
          <pre class="code-block"><code>&lt;MaRecipe
  variant="compact"
  title="Quick Avocado Toast"
  description="A healthy breakfast..."
  :ingredients="['Bread', 'Avocado', 'Lemon juice']"
  :instructions="['Toast bread', 'Mash avocado', 'Spread and serve']"
  prep-time="5 min"
  :servings="2"
  difficulty="Easy"
/&gt;</code></pre>
        </details>
      </template>
      </MaCard>
    </div>

    <!-- Detailed Variant -->
    <div class="recipe-demo-section">
      <h2 class="section-title">Detailed (Full Featured)</h2>
      <MaCard>
      <MaRecipe
        variant="detailed"
        title="Homemade Chocolate Chip Cookies"
        description="Soft, chewy cookies with melted chocolate chips. A timeless classic that everyone loves."
        image="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800"
        :ingredients="cookieIngredients"
        :instructions="cookieInstructions"
        prep-time="15 min"
        cook-time="12 min"
        servings="24 cookies"
        :calories="180"
        difficulty="Easy"
        :tags="['Dessert', 'Baking', 'Kid-Friendly']"
        notes="Don't overbake! Cookies will continue to cook on the hot baking sheet. Remove them when edges are golden but centers still look slightly underdone."
        :nutrition="{
          protein: '2g',
          carbs: '24g',
          fat: '9g',
          sugar: '14g'
        }"
      />
      <template #footer>
        <details>
          <summary>Show Code</summary>
          <pre class="code-block"><code>&lt;MaRecipe
  variant="detailed"
  title="Homemade Chocolate Chip Cookies"
  image="https://images.unsplash.com/..."
  :ingredients="cookieIngredients"
  :instructions="cookieInstructions"
  prep-time="15 min"
  cook-time="12 min"
  servings="24 cookies"
  difficulty="Easy"
  :nutrition="{ protein: '2g', carbs: '24g', fat: '9g' }"
/&gt;</code></pre>
        </details>
      </template>
      </MaCard>
    </div>

    <!-- Grid Layout -->
    <div class="recipe-demo-section">
      <h2 class="section-title">Recipe Cards Grid</h2>
      <div class="recipes-grid">
        <MaCard>
          <MaRecipe
            variant="compact"
            title="Greek Salad"
            image="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400"
            description="Fresh and healthy Mediterranean salad"
            :ingredients="['Cucumber', 'Tomatoes', 'Red onion', 'Feta cheese', 'Olives', 'Olive oil', 'Lemon juice']"
            :instructions="['Chop vegetables', 'Combine in bowl', 'Add feta and olives', 'Dress with oil and lemon']"
            prep-time="10 min"
            :servings="4"
            difficulty="Easy"
            :allow-checking="false"
            :show-image-in-compact="true"
          />
        </MaCard>

        <MaCard>
          <MaRecipe
            variant="compact"
            title="Chicken Stir Fry"
            image="https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400"
            description="Quick and flavorful Asian-inspired dish"
            :ingredients="['Chicken breast', 'Mixed vegetables', 'Soy sauce', 'Garlic', 'Ginger', 'Rice']"
            :instructions="['Cook rice', 'Sauté chicken', 'Add vegetables', 'Season and serve']"
            prep-time="15 min"
            cook-time="10 min"
            :servings="3"
            difficulty="Medium"
            :allow-checking="false"
            :show-image-in-compact="true"
          />
        </MaCard>

        <MaCard>
          <MaRecipe
            variant="compact"
            title="Banana Smoothie"
            image="https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400"
            description="Creamy and nutritious breakfast drink"
            :ingredients="['Banana', 'Milk', 'Yogurt', 'Honey', 'Ice']"
            :instructions="['Add all ingredients to blender', 'Blend until smooth', 'Serve immediately']"
            prep-time="3 min"
            :servings="2"
            difficulty="Easy"
            :allow-checking="false"
            :show-image-in-compact="true"
          />
        </MaCard>
      </div>
      <MaCard style="margin-top: 24px;">
        <template #footer>
          <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaRecipe
  variant="compact"
  title="Greek Salad"
  image="https://images.unsplash.com/..."
  :ingredients="['Cucumber', 'Tomatoes', 'Feta', 'Olives']"
  :instructions="['Chop vegetables', 'Combine', 'Dress']"
  :show-image-in-compact="true"
/&gt;</code></pre>
          </details>
        </template>
      </MaCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Heart, Share2 } from 'lucide-vue-next'

const carbonaraIngredients = [
  '400g spaghetti',
  '200g guanciale or pancetta, diced',
  '4 large eggs',
  '100g Pecorino Romano cheese, grated',
  '50g Parmigiano-Reggiano cheese, grated',
  'Freshly ground black pepper',
  'Salt for pasta water'
]

const carbonaraInstructions = [
  'Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente.',
  'While pasta cooks, fry guanciale in a large skillet over medium heat until crispy, about 8-10 minutes. Remove from heat.',
  'In a bowl, whisk together eggs, both cheeses, and plenty of black pepper.',
  'Reserve 1 cup pasta water, then drain pasta. Add hot pasta to the skillet with guanciale.',
  'Remove skillet from heat. Add egg mixture and toss quickly, adding pasta water as needed to create a creamy sauce.',
  'Serve immediately with extra cheese and black pepper on top.'
]

const avocadoIngredients = [
  '2 slices whole grain bread',
  '1 ripe avocado',
  '1 tablespoon lemon juice',
  'Salt and pepper to taste',
  'Optional: cherry tomatoes, red pepper flakes, everything bagel seasoning'
]

const avocadoInstructions = [
  'Toast bread to desired crispness',
  'Mash avocado with lemon juice, salt, and pepper',
  'Spread avocado mixture on toast',
  'Add optional toppings and serve immediately'
]

const cookieIngredients = [
  '2¼ cups all-purpose flour',
  '1 teaspoon baking soda',
  '1 teaspoon salt',
  '1 cup (2 sticks) butter, softened',
  '¾ cup granulated sugar',
  '¾ cup packed brown sugar',
  '2 large eggs',
  '2 teaspoons vanilla extract',
  '2 cups chocolate chips'
]

const cookieInstructions = [
  'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.',
  'In a small bowl, whisk together flour, baking soda, and salt. Set aside.',
  'In a large bowl, beat butter and both sugars until creamy, about 2-3 minutes.',
  'Add eggs and vanilla extract to butter mixture, beating well.',
  'Gradually stir in flour mixture until just combined.',
  'Fold in chocolate chips with a spatula.',
  'Drop rounded tablespoons of dough onto prepared baking sheets, spacing 2 inches apart.',
  'Bake for 9-11 minutes until edges are golden but centers still look soft.',
  'Cool on baking sheet for 2 minutes, then transfer to wire rack. Enjoy warm!'
]
</script>

<style scoped>
.recipes-page {
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 48px;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--ma-text-main);
}

.page-header p {
  color: var(--ma-text-muted);
  margin: 0;
}

.recipe-demo-section {
  margin-bottom: 48px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: var(--ma-text-main);
  padding-bottom: 12px;
  border-bottom: 2px solid var(--ma-border);
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .recipes-page {
    padding: 16px;
  }
  
  .recipes-grid {
    grid-template-columns: 1fr;
  }
}

/* Code block styling */
details {
  cursor: pointer;
}

details summary {
  padding: 8px 0;
  font-weight: 600;
  color: var(--ma-primary);
  user-select: none;
}

details summary:hover {
  text-decoration: underline;
}

.code-block {
  background: var(--ma-bg-page);
  border: 1px solid var(--ma-border);
  border-radius: 6px;
  padding: 16px;
  margin: 12px 0 0 0;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--ma-text-main);
}
</style>
