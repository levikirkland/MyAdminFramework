<template>
  <div class="testimonials-page">
    <!-- Hero Section -->
    <div class="page-hero">
      <h1>Testimonials Component</h1>
      <p>Build trust with customer reviews, ratings, and social proof</p>
    </div>

    <!-- Grid Showcase -->
    <MaCard class="showcase-section">
      <h2>Testimonial Grid</h2>
      <p class="section-description">Display customer feedback in a clean grid layout</p>
      
      <div class="testimonials-grid">
        <MaTestimonial
          v-for="testimonial in gridTestimonials"
          :key="testimonial.id"
          :quote="testimonial.quote"
          :name="testimonial.name"
          :role="testimonial.role"
          :company="testimonial.company"
          :avatar="testimonial.avatar"
          :rating="testimonial.rating"
          :featured="testimonial.featured"
        />
      </div>

      <details class="code-block">
        <summary>Show Code</summary>
        <pre><code>&lt;div class="testimonials-grid"&gt;
  &lt;MaTestimonial
    quote="This product transformed our workflow!"
    name="Sarah Johnson"
    role="Product Manager"
    company="TechCorp"
    avatar="/avatar.jpg"
    :rating="5"
  /&gt;
&lt;/div&gt;</code></pre>
      </details>
    </MaCard>

    <!-- Variants -->
    <MaCard class="showcase-section">
      <h2>Variants</h2>

      <!-- Default Variant -->
      <div class="variant-section">
        <div class="variant-header">
          <h3>Default Variant</h3>
          <button class="show-code-btn" @click="toggleCode('default')">
            <Code :size="16" />
            {{ showCode.default ? 'Hide' : 'Show' }} Code
          </button>
        </div>

        <MaTestimonial
          quote="The attention to detail and user experience is outstanding. Our conversion rates have increased by 40% since implementing this framework."
          name="Michael Chen"
          role="CEO"
          company="StartupLabs"
          avatar="https://i.pravatar.cc/150?img=12"
          :rating="5"
          :date="new Date(2026, 0, 1)"
        />

        <details v-if="showCode.default" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaTestimonial
  quote="The attention to detail..."
  name="Michael Chen"
  role="CEO"
  company="StartupLabs"
  avatar="/avatar.jpg"
  :rating="5"
  :date="new Date()"
/&gt;</code></pre>
        </details>
      </div>

      <!-- Compact Variant -->
      <div class="variant-section">
        <div class="variant-header">
          <h3>Compact Variant</h3>
          <button class="show-code-btn" @click="toggleCode('compact')">
            <Code :size="16" />
            {{ showCode.compact ? 'Hide' : 'Show' }} Code
          </button>
        </div>

        <div class="compact-grid">
          <MaTestimonial
            v-for="testimonial in compactTestimonials"
            :key="testimonial.id"
            variant="compact"
            :quote="testimonial.quote"
            :name="testimonial.name"
            :role="testimonial.role"
            :avatar="testimonial.avatar"
            :rating="testimonial.rating"
          />
        </div>

        <details v-if="showCode.compact" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaTestimonial
  variant="compact"
  quote="Quick testimonial"
  name="Jane Doe"
  role="Designer"
  :rating="5"
/&gt;</code></pre>
        </details>
      </div>

      <!-- Card Variant -->
      <div class="variant-section">
        <div class="variant-header">
          <h3>Card Variant (with Logo)</h3>
          <button class="show-code-btn" @click="toggleCode('card')">
            <Code :size="16" />
            {{ showCode.card ? 'Hide' : 'Show' }} Code
          </button>
        </div>

        <MaTestimonial
          variant="card"
          quote="MyAdmin Framework has become an essential tool for our development team. The components are well-designed, accessible, and easy to customize."
          name="Emma Williams"
          role="Lead Developer"
          company="Enterprise Solutions Inc."
          avatar="https://i.pravatar.cc/150?img=45"
          logo="https://via.placeholder.com/120x30/3b82f6/ffffff?text=EnterpriseSolutions"
          :rating="5"
          featured
        />

        <details v-if="showCode.card" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaTestimonial
  variant="card"
  quote="Essential tool for our team..."
  name="Emma Williams"
  role="Lead Developer"
  company="Enterprise Solutions"
  avatar="/avatar.jpg"
  logo="/company-logo.png"
  :rating="5"
  featured
/&gt;</code></pre>
        </details>
      </div>

      <!-- Minimal Variant -->
      <div class="variant-section">
        <div class="variant-header">
          <h3>Minimal Variant</h3>
          <button class="show-code-btn" @click="toggleCode('minimal')">
            <Code :size="16" />
            {{ showCode.minimal ? 'Hide' : 'Show' }} Code
          </button>
        </div>

        <div class="minimal-list">
          <MaTestimonial
            v-for="testimonial in minimalTestimonials"
            :key="testimonial.id"
            variant="minimal"
            :quote="testimonial.quote"
            :name="testimonial.name"
            :role="testimonial.role"
          />
        </div>

        <details v-if="showCode.minimal" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaTestimonial
  variant="minimal"
  quote="Simple and clean"
  name="John Smith"
  role="Developer"
/&gt;</code></pre>
        </details>
      </div>
    </MaCard>

    <!-- Props Documentation -->
    <MaCard class="props-docs">
      <h2>Props & API</h2>

      <h3>Props</h3>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>quote</code></td>
              <td>string</td>
              <td>required</td>
              <td>The testimonial text/quote</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td>string</td>
              <td>required</td>
              <td>Author's name</td>
            </tr>
            <tr>
              <td><code>role</code></td>
              <td>string</td>
              <td>-</td>
              <td>Author's role/title (optional)</td>
            </tr>
            <tr>
              <td><code>company</code></td>
              <td>string</td>
              <td>-</td>
              <td>Company name (optional)</td>
            </tr>
            <tr>
              <td><code>avatar</code></td>
              <td>string</td>
              <td>-</td>
              <td>Avatar image URL (optional)</td>
            </tr>
            <tr>
              <td><code>logo</code></td>
              <td>string</td>
              <td>-</td>
              <td>Company logo URL (optional)</td>
            </tr>
            <tr>
              <td><code>rating</code></td>
              <td>number</td>
              <td>5</td>
              <td>Star rating (1-5)</td>
            </tr>
            <tr>
              <td><code>date</code></td>
              <td>Date | string</td>
              <td>-</td>
              <td>Testimonial date (optional)</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>'default' | 'compact' | 'minimal' | 'card'</td>
              <td>'default'</td>
              <td>Display variant</td>
            </tr>
            <tr>
              <td><code>featured</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Highlight as featured</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MaCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Code } from 'lucide-vue-next'

const showCode = ref({
  default: false,
  compact: false,
  card: false,
  minimal: false
})

const toggleCode = (variant: keyof typeof showCode.value) => {
  showCode.value[variant] = !showCode.value[variant]
}

const gridTestimonials = [
  {
    id: 1,
    quote: "This framework has saved us countless hours of development time. The components are polished and production-ready.",
    name: "Alex Rivera",
    role: "Engineering Manager",
    company: "Tech Innovators",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    featured: true
  },
  {
    id: 2,
    quote: "Clean code, excellent documentation, and amazing support. Highly recommended for any Vue 3 project.",
    name: "Priya Patel",
    role: "Senior Developer",
    company: "Digital Agency",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5
  },
  {
    id: 3,
    quote: "The best component library we've used. It's flexible, customizable, and looks fantastic out of the box.",
    name: "David Kim",
    role: "Product Designer",
    company: "Creative Studio",
    avatar: "https://i.pravatar.cc/150?img=68",
    rating: 5
  },
  {
    id: 4,
    quote: "Integration was seamless and the TypeScript support is excellent. Our team loves working with it.",
    name: "Sofia Martinez",
    role: "Tech Lead",
    company: "Global Solutions",
    avatar: "https://i.pravatar.cc/150?img=29",
    rating: 5
  },
  {
    id: 5,
    quote: "Outstanding performance and accessibility. These components follow best practices throughout.",
    name: "James Thompson",
    role: "UX Engineer",
    company: "Accessibility First",
    avatar: "https://i.pravatar.cc/150?img=51",
    rating: 5,
    featured: true
  },
  {
    id: 6,
    quote: "We migrated from another framework and couldn't be happier. The learning curve was minimal.",
    name: "Lisa Anderson",
    role: "Frontend Developer",
    company: "Migration Success",
    avatar: "https://i.pravatar.cc/150?img=38",
    rating: 5
  }
]

const compactTestimonials = [
  {
    id: 10,
    quote: "Perfect for rapid prototyping!",
    name: "Tom Baker",
    role: "Startup Founder",
    avatar: "https://i.pravatar.cc/150?img=13",
    rating: 5
  },
  {
    id: 11,
    quote: "Love the design consistency.",
    name: "Nina Garcia",
    role: "UI Designer",
    avatar: "https://i.pravatar.cc/150?img=44",
    rating: 5
  },
  {
    id: 12,
    quote: "Best Vue framework hands down.",
    name: "Ryan Scott",
    role: "Developer",
    avatar: "https://i.pravatar.cc/150?img=59",
    rating: 5
  }
]

const minimalTestimonials = [
  {
    id: 20,
    quote: "Clean, modern, and easy to use.",
    name: "Jennifer Lee",
    role: "Freelance Developer"
  },
  {
    id: 21,
    quote: "Exactly what our project needed.",
    name: "Marcus Johnson",
    role: "Technical Architect"
  },
  {
    id: 22,
    quote: "Impressive attention to detail.",
    name: "Amy Chen",
    role: "Quality Engineer"
  }
]
</script>

<style scoped>
.testimonials-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-hero {
  text-align: center;
  margin-bottom: 3rem;
}

.page-hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--ma-text-primary, #1f2937);
}

.page-hero p {
  font-size: 1.125rem;
  color: var(--ma-text-secondary, #6b7280);
}

.showcase-section {
  margin-bottom: 2rem;
}

.showcase-section h2 {
  margin: 0 0 0.5rem 0;
}

.section-description {
  margin: 0 0 2rem 0;
  color: var(--ma-text-secondary, #6b7280);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.variant-section {
  margin-bottom: 3rem;
}

.variant-section:last-child {
  margin-bottom: 0;
}

.variant-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.variant-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.show-code-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--ma-bg-secondary, #fff);
  border: 1px solid var(--ma-border-color, #e5e7eb);
  border-radius: var(--ma-border-radius, 8px);
  color: var(--ma-text-primary, #1f2937);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.show-code-btn:hover {
  background: var(--ma-bg-hover, #f3f4f6);
  border-color: var(--ma-primary, #3b82f6);
}

.code-block {
  margin-top: 1rem;
  background: var(--ma-bg-tertiary, #f9fafb);
  border: 1px solid var(--ma-border-color, #e5e7eb);
  border-radius: var(--ma-border-radius, 8px);
  overflow: hidden;
}

.code-block summary {
  padding: 0.75rem 1rem;
  background: var(--ma-bg-secondary, #fff);
  cursor: pointer;
  font-weight: 500;
  border-bottom: 1px solid var(--ma-border-color, #e5e7eb);
}

.code-block pre {
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--ma-text-primary, #1f2937);
}

.compact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.minimal-list {
  display: flex;
  flex-direction: column;
}

.props-docs {
  margin-bottom: 2rem;
}

.props-docs h2 {
  margin: 0 0 1.5rem 0;
}

.props-docs h3 {
  margin: 2rem 0 1rem 0;
  font-size: 1.125rem;
  color: var(--ma-text-primary, #1f2937);
}

.props-docs h3:first-of-type {
  margin-top: 0;
}

.props-table {
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.props-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.props-table th,
.props-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--ma-border-color, #e5e7eb);
}

.props-table th {
  font-weight: 600;
  background: var(--ma-bg-tertiary, #f9fafb);
  color: var(--ma-text-primary, #1f2937);
}

.props-table code {
  padding: 0.125rem 0.375rem;
  background: var(--ma-bg-tertiary, #f3f4f6);
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.8125rem;
  color: var(--ma-primary, #3b82f6);
}

@media (max-width: 768px) {
  .testimonials-page {
    padding: 1rem;
  }

  .page-hero h1 {
    font-size: 2rem;
  }

  .testimonials-grid,
  .compact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
