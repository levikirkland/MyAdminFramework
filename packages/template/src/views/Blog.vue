<template>
  <div class="blog-page">
    <!-- Hero Section -->
    <div class="page-hero">
      <h1>Blog Card Component</h1>
      <p>Beautiful article cards for blogs, news sites, and content platforms</p>
    </div>

    <!-- Featured Articles -->
    <MaCard class="showcase-section">
      <h2>Featured Articles</h2>
      <p class="section-description">Highlight important content with featured styling</p>
      
      <div class="featured-grid">
        <MaBlogCard
          v-for="article in featuredArticles"
          :key="article.id"
          :title="article.title"
          :excerpt="article.excerpt"
          :author="article.author"
          :author-role="article.authorRole"
          :author-avatar="article.authorAvatar"
          :date="article.date"
          :image="article.image"
          :category="article.category"
          :tags="article.tags"
          :read-time="article.readTime"
          :featured="article.featured"
          @click="handleArticleClick(article)"
          @bookmark="handleBookmark"
        />
      </div>
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

        <div class="default-grid">
          <MaBlogCard
            v-for="article in defaultArticles"
            :key="article.id"
            :title="article.title"
            :excerpt="article.excerpt"
            :author="article.author"
            :author-role="article.authorRole"
            :author-avatar="article.authorAvatar"
            :date="article.date"
            :image="article.image"
            :category="article.category"
            :tags="article.tags"
            :read-time="article.readTime"
          />
        </div>

        <details v-if="showCode.default" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaBlogCard
  title="Getting Started with Vue 3"
  excerpt="Learn the basics..."
  author="John Doe"
  author-role="Developer"
  author-avatar="/avatar.jpg"
  :date="new Date()"
  image="/article.jpg"
  category="Tutorial"
  :tags="['vue', 'javascript']"
  :read-time="5"
  @click="handleClick"
  @bookmark="handleBookmark"
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
          <MaBlogCard
            v-for="article in compactArticles"
            :key="article.id"
            variant="compact"
            :title="article.title"
            :excerpt="article.excerpt"
            :author="article.author"
            :author-avatar="article.authorAvatar"
            :date="article.date"
            :image="article.image"
            :tags="article.tags"
            :read-time="article.readTime"
          />
        </div>

        <details v-if="showCode.compact" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaBlogCard
  variant="compact"
  title="Article Title"
  excerpt="Brief description"
  author="Author Name"
  :date="new Date()"
  image="/image.jpg"
/&gt;</code></pre>
        </details>
      </div>

      <!-- Horizontal Variant -->
      <div class="variant-section">
        <div class="variant-header">
          <h3>Horizontal Variant</h3>
          <button class="show-code-btn" @click="toggleCode('horizontal')">
            <Code :size="16" />
            {{ showCode.horizontal ? 'Hide' : 'Show' }} Code
          </button>
        </div>

        <div class="horizontal-list">
          <MaBlogCard
            v-for="article in horizontalArticles"
            :key="article.id"
            variant="horizontal"
            :title="article.title"
            :excerpt="article.excerpt"
            :author="article.author"
            :author-avatar="article.authorAvatar"
            :date="article.date"
            :image="article.image"
            :category="article.category"
            :tags="article.tags"
            :read-time="article.readTime"
          />
        </div>

        <details v-if="showCode.horizontal" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaBlogCard
  variant="horizontal"
  title="Article Title"
  excerpt="Description..."
  author="Author"
  :date="new Date()"
  image="/image.jpg"
/&gt;</code></pre>
        </details>
      </div>

      <!-- Minimal Variant -->
      <div class="variant-section">
        <div class="variant-header">
          <h3>Minimal Variant (List Style)</h3>
          <button class="show-code-btn" @click="toggleCode('minimal')">
            <Code :size="16" />
            {{ showCode.minimal ? 'Hide' : 'Show' }} Code
          </button>
        </div>

        <div class="minimal-list">
          <MaBlogCard
            v-for="article in minimalArticles"
            :key="article.id"
            variant="minimal"
            :title="article.title"
            :author="article.author"
            :author-avatar="article.authorAvatar"
            :date="article.date"
            :read-time="article.readTime"
          />
        </div>

        <details v-if="showCode.minimal" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaBlogCard
  variant="minimal"
  title="Quick Article Title"
  author="Author Name"
  :date="new Date()"
  :read-time="3"
/&gt;</code></pre>
        </details>
      </div>
    </MaCard>

    <!-- Props Documentation -->
    <MaCard class="props-docs">
      <h2>Props & Events</h2>

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
              <td><code>title</code></td>
              <td>string</td>
              <td>required</td>
              <td>Article title</td>
            </tr>
            <tr>
              <td><code>excerpt</code></td>
              <td>string</td>
              <td>-</td>
              <td>Article excerpt/description</td>
            </tr>
            <tr>
              <td><code>author</code></td>
              <td>string</td>
              <td>required</td>
              <td>Author name</td>
            </tr>
            <tr>
              <td><code>authorRole</code></td>
              <td>string</td>
              <td>-</td>
              <td>Author's role/title</td>
            </tr>
            <tr>
              <td><code>authorAvatar</code></td>
              <td>string</td>
              <td>-</td>
              <td>Author avatar URL</td>
            </tr>
            <tr>
              <td><code>date</code></td>
              <td>Date | string</td>
              <td>required</td>
              <td>Publication date</td>
            </tr>
            <tr>
              <td><code>image</code></td>
              <td>string</td>
              <td>-</td>
              <td>Article featured image URL</td>
            </tr>
            <tr>
              <td><code>category</code></td>
              <td>string</td>
              <td>-</td>
              <td>Article category</td>
            </tr>
            <tr>
              <td><code>tags</code></td>
              <td>string[]</td>
              <td>-</td>
              <td>Article tags</td>
            </tr>
            <tr>
              <td><code>readTime</code></td>
              <td>number</td>
              <td>-</td>
              <td>Read time in minutes</td>
            </tr>
            <tr>
              <td><code>url</code></td>
              <td>string</td>
              <td>-</td>
              <td>Article URL</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>'default' | 'compact' | 'minimal' | 'horizontal'</td>
              <td>'default'</td>
              <td>Display variant</td>
            </tr>
            <tr>
              <td><code>featured</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Mark as featured</td>
            </tr>
            <tr>
              <td><code>showBookmark</code></td>
              <td>boolean</td>
              <td>true</td>
              <td>Show bookmark button</td>
            </tr>
            <tr>
              <td><code>maxTags</code></td>
              <td>number</td>
              <td>3</td>
              <td>Max tags to display</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Events</h3>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Payload</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>@click</code></td>
              <td>-</td>
              <td>Emitted when article is clicked</td>
            </tr>
            <tr>
              <td><code>@bookmark</code></td>
              <td>bookmarked: boolean</td>
              <td>Emitted when bookmark toggled</td>
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
  horizontal: false,
  minimal: false
})

const toggleCode = (variant: keyof typeof showCode.value) => {
  showCode.value[variant] = !showCode.value[variant]
}

const handleArticleClick = (article: any) => {
  console.log('Article clicked:', article.title)
}

const handleBookmark = (bookmarked: boolean) => {
  console.log('Bookmarked:', bookmarked)
}

const featuredArticles = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2026",
    excerpt: "Explore the cutting-edge technologies and methodologies shaping the future of web development. From AI-powered tools to progressive web apps.",
    author: "Sarah Mitchell",
    authorRole: "Tech Editor",
    authorAvatar: "https://i.pravatar.cc/150?img=32",
    date: new Date(2026, 0, 2),
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
    category: "Technology",
    tags: ["web-dev", "trends", "future"],
    readTime: 8,
    featured: true
  },
  {
    id: 2,
    title: "Building Scalable Applications with Vue 3 and TypeScript",
    excerpt: "Learn best practices for creating enterprise-grade applications using Vue 3's Composition API and TypeScript's type safety.",
    author: "David Park",
    authorRole: "Senior Developer",
    authorAvatar: "https://i.pravatar.cc/150?img=15",
    date: new Date(2025, 11, 30),
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    category: "Tutorial",
    tags: ["vue", "typescript", "architecture"],
    readTime: 12,
    featured: true
  }
]

const defaultArticles = [
  {
    id: 10,
    title: "10 Tips for Better Component Design",
    excerpt: "Discover essential principles for creating reusable, maintainable, and scalable components that your team will love.",
    author: "Emma Thompson",
    authorRole: "UI/UX Designer",
    authorAvatar: "https://i.pravatar.cc/150?img=41",
    date: new Date(2025, 11, 28),
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=400&fit=crop",
    category: "Design",
    tags: ["design", "components", "best-practices"],
    readTime: 6
  },
  {
    id: 11,
    title: "State Management Patterns in Modern Applications",
    excerpt: "Compare different approaches to state management and learn when to use each pattern in your Vue applications.",
    author: "Marcus Rodriguez",
    authorRole: "Tech Lead",
    authorAvatar: "https://i.pravatar.cc/150?img=56",
    date: new Date(2025, 11, 25),
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    category: "Development",
    tags: ["state-management", "vuex", "pinia"],
    readTime: 10
  },
  {
    id: 12,
    title: "Accessibility First: Building Inclusive Interfaces",
    excerpt: "Make your applications accessible to everyone with these practical tips and techniques for inclusive design.",
    author: "Lisa Chen",
    authorRole: "Accessibility Advocate",
    authorAvatar: "https://i.pravatar.cc/150?img=28",
    date: new Date(2025, 11, 22),
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop",
    category: "Accessibility",
    tags: ["a11y", "wcag", "inclusive-design"],
    readTime: 7
  }
]

const compactArticles = [
  {
    id: 20,
    title: "Quick Start Guide to Vite",
    excerpt: "Get up and running with Vite in minutes",
    author: "Alex Johnson",
    authorAvatar: "https://i.pravatar.cc/150?img=64",
    date: new Date(2025, 11, 20),
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=200&fit=crop",
    tags: ["vite", "build-tools"],
    readTime: 4
  },
  {
    id: 21,
    title: "CSS Grid Layout Mastery",
    excerpt: "Master modern CSS Grid techniques",
    author: "Nina Patel",
    authorAvatar: "https://i.pravatar.cc/150?img=49",
    date: new Date(2025, 11, 18),
    image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=400&h=200&fit=crop",
    tags: ["css", "layout"],
    readTime: 5
  }
]

const horizontalArticles = [
  {
    id: 30,
    title: "Performance Optimization Techniques for Vue Applications",
    excerpt: "Boost your application's performance with lazy loading, code splitting, and other optimization strategies.",
    author: "Ryan Scott",
    authorAvatar: "https://i.pravatar.cc/150?img=11",
    date: new Date(2025, 11, 15),
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
    category: "Performance",
    tags: ["optimization", "vue", "performance"],
    readTime: 9
  },
  {
    id: 31,
    title: "Testing Strategies for Component Libraries",
    excerpt: "Comprehensive guide to unit, integration, and E2E testing for component-based applications.",
    author: "Jennifer Kim",
    authorAvatar: "https://i.pravatar.cc/150?img=24",
    date: new Date(2025, 11, 12),
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=300&fit=crop",
    category: "Testing",
    tags: ["testing", "vitest", "playwright"],
    readTime: 11
  }
]

const minimalArticles = [
  {
    id: 40,
    title: "Understanding Vue 3 Reactivity System",
    author: "Tom Baker",
    authorAvatar: "https://i.pravatar.cc/150?img=70",
    date: new Date(2025, 11, 10),
    readTime: 6
  },
  {
    id: 41,
    title: "Modern Authentication Patterns",
    author: "Rachel Green",
    authorAvatar: "https://i.pravatar.cc/150?img=35",
    date: new Date(2025, 11, 8),
    readTime: 5
  },
  {
    id: 42,
    title: "Microservices Architecture Explained",
    author: "Michael Ross",
    authorAvatar: "https://i.pravatar.cc/150?img=52",
    date: new Date(2025, 11, 5),
    readTime: 8
  },
  {
    id: 43,
    title: "GraphQL vs REST: A Comparison",
    author: "Sophie Turner",
    authorAvatar: "https://i.pravatar.cc/150?img=43",
    date: new Date(2025, 11, 3),
    readTime: 7
  }
]
</script>

<style scoped>
.blog-page {
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
  color: var(--ma-text-main);
}

.page-hero p {
  font-size: 1.125rem;
  color: var(--ma-text-secondary);
}

.showcase-section {
  margin-bottom: 2rem;
}

.showcase-section h2 {
  margin: 0 0 0.5rem 0;
}

.section-description {
  margin: 0 0 2rem 0;
  color: var(--ma-text-secondary);
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 2rem;
}

.default-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.compact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.horizontal-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.minimal-list {
  display: flex;
  flex-direction: column;
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
  color: var(--ma-text-main);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.show-code-btn:hover {
  background: var(--ma-bg-hover, #f3f4f6);
  border-color: var(--ma-primary);
}

.code-block {
  margin-top: 1rem;
  background: var(--ma-bg-secondary);
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
  color: var(--ma-text-main);
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
  color: var(--ma-text-main);
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
  background: var(--ma-bg-secondary);
  color: var(--ma-text-main);
}

.props-table code {
  padding: 0.125rem 0.375rem;
  background: var(--ma-bg-secondary);
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.8125rem;
  color: var(--ma-primary);
}

@media (max-width: 768px) {
  .blog-page {
    padding: 1rem;
  }

  .page-hero h1 {
    font-size: 2rem;
  }

  .featured-grid,
  .default-grid,
  .compact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
