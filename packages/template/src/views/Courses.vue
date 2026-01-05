<template>
  <div class="courses-page">
    <!-- Hero Section -->
    <div class="page-hero">
      <h1>Course Card Component</h1>
      <p>Build engaging online learning platforms with feature-rich course cards</p>
    </div>

    <!-- Featured Courses -->
    <MaCard class="showcase-section">
      <h2>Featured Courses</h2>
      <p class="section-description">Highlight premium courses with featured styling and enrollment progress</p>
      
      <div class="featured-grid">
        <MaCourseCard
          v-for="course in featuredCourses"
          :key="course.id"
          :title="course.title"
          :description="course.description"
          :thumbnail="course.thumbnail"
          :instructor="course.instructor"
          :price="course.price"
          :original-price="course.originalPrice"
          :category="course.category"
          :level="course.level"
          :duration="course.duration"
          :lessons-count="course.lessonsCount"
          :students-count="course.studentsCount"
          :rating="course.rating"
          :reviews-count="course.reviewsCount"
          :skills="course.skills"
          :progress="course.progress"
          :certificate="course.certificate"
          :featured="course.featured"
          @click="handleCourseClick(course)"
          @bookmark="handleBookmark"
          @enroll="handleEnroll(course)"
        />
      </div>
    </MaCard>

    <!-- Course Catalog with Filters -->
    <MaCard class="showcase-section">
      <h2>Course Catalog</h2>
      
      <div class="filter-controls">
        <MaFormGroup label="Category">
          <MaSelect v-model="filters.category">
            <option value="">All Categories</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
            <option value="Marketing">Marketing</option>
            <option value="Data Science">Data Science</option>
          </MaSelect>
        </MaFormGroup>
        
        <MaFormGroup label="Level">
          <MaSelect v-model="filters.level">
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </MaSelect>
        </MaFormGroup>

        <MaFormGroup label="Price">
          <MaSelect v-model="filters.price">
            <option value="">All Prices</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </MaSelect>
        </MaFormGroup>

        <MaFormGroup label="Min Rating">
          <MaSelect v-model="filters.minRating">
            <option value="">Any Rating</option>
            <option value="4.5">4.5+</option>
            <option value="4.0">4.0+</option>
            <option value="3.5">3.5+</option>
          </MaSelect>
        </MaFormGroup>

        <MaButton @click="resetFilters" variant="outline">
          <RefreshCw :size="16" />
          Reset
        </MaButton>
      </div>

      <div class="course-stats">
        <span>Showing {{ filteredCourses.length }} of {{ allCourses.length }} courses</span>
      </div>

      <div class="courses-grid">
        <MaCourseCard
          v-for="course in filteredCourses"
          :key="course.id"
          :title="course.title"
          :description="course.description"
          :thumbnail="course.thumbnail"
          :instructor="course.instructor"
          :price="course.price"
          :original-price="course.originalPrice"
          :category="course.category"
          :level="course.level"
          :duration="course.duration"
          :lessons-count="course.lessonsCount"
          :students-count="course.studentsCount"
          :rating="course.rating"
          :reviews-count="course.reviewsCount"
          :skills="course.skills"
          :certificate="course.certificate"
          @click="handleCourseClick(course)"
          @bookmark="handleBookmark"
          @enroll="handleEnroll(course)"
        />
      </div>
    </MaCard>

    <!-- Variants -->
    <MaCard class="showcase-section">
      <h2>Variants</h2>

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
          <MaCourseCard
            v-for="course in compactCourses"
            :key="course.id"
            variant="compact"
            :title="course.title"
            :thumbnail="course.thumbnail"
            :instructor="course.instructor"
            :price="course.price"
            :category="course.category"
            :level="course.level"
            :duration="course.duration"
            :lessons-count="course.lessonsCount"
            :rating="course.rating"
            :reviews-count="course.reviewsCount"
          />
        </div>

        <details v-if="showCode.compact" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaCourseCard
  variant="compact"
  title="Introduction to Python"
  thumbnail="/course-thumbnail.jpg"
  :instructor="{ name: 'John Doe', title: 'Lead Instructor' }"
  :price="49"
  category="Development"
  level="Beginner"
  duration="5 hours"
  :lessons-count="32"
  :rating="4.8"
  :reviews-count="1240"
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
          <MaCourseCard
            v-for="course in horizontalCourses"
            :key="course.id"
            variant="horizontal"
            :title="course.title"
            :description="course.description"
            :thumbnail="course.thumbnail"
            :instructor="course.instructor"
            :price="course.price"
            :original-price="course.originalPrice"
            :category="course.category"
            :level="course.level"
            :duration="course.duration"
            :lessons-count="course.lessonsCount"
            :students-count="course.studentsCount"
            :rating="course.rating"
            :reviews-count="course.reviewsCount"
            :skills="course.skills"
            :certificate="course.certificate"
          />
        </div>

        <details v-if="showCode.horizontal" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaCourseCard
  variant="horizontal"
  title="Advanced JavaScript Patterns"
  description="Master advanced JavaScript concepts..."
  thumbnail="/thumbnail.jpg"
  :instructor="instructorInfo"
  :price="89"
  :original-price="149"
  category="Development"
  level="Advanced"
  :certificate="true"
/&gt;</code></pre>
        </details>
      </div>

      <!-- Grid Variant -->
      <div class="variant-section">
        <div class="variant-header">
          <h3>Grid Variant</h3>
          <button class="show-code-btn" @click="toggleCode('grid')">
            <Code :size="16" />
            {{ showCode.grid ? 'Hide' : 'Show' }} Code
          </button>
        </div>

        <div class="grid-display">
          <MaCourseCard
            v-for="course in gridCourses"
            :key="course.id"
            variant="grid"
            :title="course.title"
            :description="course.description"
            :thumbnail="course.thumbnail"
            :instructor="course.instructor"
            :price="course.price"
            :category="course.category"
            :level="course.level"
            :rating="course.rating"
          />
        </div>

        <details v-if="showCode.grid" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaCourseCard
  variant="grid"
  title="UI/UX Design Fundamentals"
  description="Learn the basics of user interface design..."
  thumbnail="/thumbnail.jpg"
  :instructor="{ name: 'Jane Smith' }"
  :price="0"
  category="Design"
  level="Beginner"
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
              <td>Course title</td>
            </tr>
            <tr>
              <td><code>description</code></td>
              <td>string</td>
              <td>-</td>
              <td>Course description</td>
            </tr>
            <tr>
              <td><code>thumbnail</code></td>
              <td>string</td>
              <td>required</td>
              <td>Course thumbnail image URL</td>
            </tr>
            <tr>
              <td><code>instructor</code></td>
              <td>Instructor</td>
              <td>required</td>
              <td>Instructor information</td>
            </tr>
            <tr>
              <td><code>price</code></td>
              <td>number | string</td>
              <td>required</td>
              <td>Course price (0 or 'Free' for free)</td>
            </tr>
            <tr>
              <td><code>originalPrice</code></td>
              <td>number | string</td>
              <td>-</td>
              <td>Original price (for discounts)</td>
            </tr>
            <tr>
              <td><code>category</code></td>
              <td>string</td>
              <td>-</td>
              <td>Course category</td>
            </tr>
            <tr>
              <td><code>level</code></td>
              <td>'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'</td>
              <td>-</td>
              <td>Difficulty level</td>
            </tr>
            <tr>
              <td><code>duration</code></td>
              <td>string</td>
              <td>-</td>
              <td>Course duration (e.g., '5 hours')</td>
            </tr>
            <tr>
              <td><code>lessonsCount</code></td>
              <td>number</td>
              <td>-</td>
              <td>Number of lessons</td>
            </tr>
            <tr>
              <td><code>studentsCount</code></td>
              <td>number</td>
              <td>-</td>
              <td>Enrolled students count</td>
            </tr>
            <tr>
              <td><code>rating</code></td>
              <td>number</td>
              <td>-</td>
              <td>Course rating (0-5)</td>
            </tr>
            <tr>
              <td><code>reviewsCount</code></td>
              <td>number</td>
              <td>-</td>
              <td>Number of reviews</td>
            </tr>
            <tr>
              <td><code>skills</code></td>
              <td>string[]</td>
              <td>-</td>
              <td>Skills taught</td>
            </tr>
            <tr>
              <td><code>progress</code></td>
              <td>number</td>
              <td>-</td>
              <td>Completion progress (0-100)</td>
            </tr>
            <tr>
              <td><code>isEnrolled</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Whether user is enrolled</td>
            </tr>
            <tr>
              <td><code>certificate</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Whether certificate included</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>'default' | 'compact' | 'horizontal' | 'grid'</td>
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
              <td><code>showEnroll</code></td>
              <td>boolean</td>
              <td>true</td>
              <td>Show enroll button</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Instructor Interface</h3>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>name</code></td>
              <td>string</td>
              <td>Instructor name (required)</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td>string</td>
              <td>Instructor title (optional)</td>
            </tr>
            <tr>
              <td><code>avatar</code></td>
              <td>string</td>
              <td>Avatar URL (optional)</td>
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
              <td>Emitted when course is clicked</td>
            </tr>
            <tr>
              <td><code>@bookmark</code></td>
              <td>bookmarked: boolean</td>
              <td>Emitted when bookmark toggled</td>
            </tr>
            <tr>
              <td><code>@enroll</code></td>
              <td>-</td>
              <td>Emitted when enroll clicked</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MaCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Code, RefreshCw } from 'lucide-vue-next'

const showCode = ref({
  compact: false,
  horizontal: false,
  grid: false
})

const toggleCode = (variant: keyof typeof showCode.value) => {
  showCode.value[variant] = !showCode.value[variant]
}

const filters = ref({
  category: '',
  level: '',
  price: '',
  minRating: ''
})

const resetFilters = () => {
  filters.value = {
    category: '',
    level: '',
    price: '',
    minRating: ''
  }
}

const handleCourseClick = (course: any) => {
  console.log('Course clicked:', course.title)
}

const handleBookmark = (bookmarked: boolean) => {
  console.log('Bookmarked:', bookmarked)
}

const handleEnroll = (course: any) => {
  console.log('Enroll in:', course.title)
  alert(`Enrolling in "${course.title}"...`)
}

const featuredCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2026",
    description: "Master full-stack web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and launch your career.",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    instructor: {
      name: "Dr. Angela Yu",
      title: "Lead Instructor",
      avatar: "https://i.pravatar.cc/150?img=45"
    },
    price: 89,
    originalPrice: 199,
    category: "Development",
    level: "Beginner" as const,
    duration: "52 hours",
    lessonsCount: 156,
    studentsCount: 485000,
    rating: 4.8,
    reviewsCount: 52340,
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    progress: 35,
    certificate: true,
    featured: true
  },
  {
    id: 2,
    title: "Machine Learning A-Z: AI, Python & R",
    description: "Learn to create Machine Learning Algorithms in Python and R from Data Science experts. Practical hands-on projects included.",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
    instructor: {
      name: "Kirill Eremenko",
      title: "Data Science Expert",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    price: 79,
    originalPrice: 179,
    category: "Data Science",
    level: "Intermediate" as const,
    duration: "44 hours",
    lessonsCount: 295,
    studentsCount: 892000,
    rating: 4.9,
    reviewsCount: 148230,
    skills: ["Python", "R", "Machine Learning", "Deep Learning", "AI"],
    certificate: true,
    featured: true
  }
]

const allCourses = [
  {
    id: 10,
    title: "The Complete JavaScript Course 2026",
    description: "Modern JavaScript from the beginning! Master JavaScript with projects, challenges and theory.",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop",
    instructor: { name: "Jonas Schmedtmann", title: "Web Developer" },
    price: 69,
    originalPrice: 149,
    category: "Development",
    level: "Intermediate" as const,
    duration: "69 hours",
    lessonsCount: 320,
    studentsCount: 675000,
    rating: 4.8,
    reviewsCount: 89450,
    skills: ["JavaScript", "ES6+", "Async/Await", "OOP"],
    certificate: true
  },
  {
    id: 11,
    title: "UI/UX Design Bootcamp",
    description: "Become a UX/UI Designer! Learn user experience design, user interface design, and Figma.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    instructor: { name: "Daniel Scott", avatar: "https://i.pravatar.cc/150?img=33" },
    price: 0,
    category: "Design",
    level: "Beginner" as const,
    duration: "31 hours",
    lessonsCount: 185,
    studentsCount: 234000,
    rating: 4.7,
    reviewsCount: 28940,
    skills: ["Figma", "UX Research", "Prototyping", "Wireframing"],
    certificate: false
  },
  {
    id: 12,
    title: "Digital Marketing Masterclass",
    description: "Master Digital Marketing Strategy, Social Media Marketing, SEO, YouTube, Email, Facebook Marketing, Analytics & More!",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    instructor: { name: "Phil Ebiner", title: "Marketing Expert" },
    price: 54,
    category: "Marketing",
    level: "All Levels" as const,
    duration: "36 hours",
    lessonsCount: 198,
    studentsCount: 456000,
    rating: 4.6,
    reviewsCount: 67820,
    skills: ["SEO", "Social Media", "Facebook Ads", "Email Marketing"],
    certificate: true
  },
  {
    id: 13,
    title: "Python for Data Science and Machine Learning",
    description: "Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, Tensorflow, and more!",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    instructor: { name: "Jose Portilla", avatar: "https://i.pravatar.cc/150?img=56" },
    price: 74,
    originalPrice: 159,
    category: "Data Science",
    level: "Intermediate" as const,
    duration: "25 hours",
    lessonsCount: 165,
    studentsCount: 823000,
    rating: 4.7,
    reviewsCount: 145670,
    skills: ["Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow"],
    certificate: true
  },
  {
    id: 14,
    title: "Complete Business Strategy Course",
    description: "Strategic Management | Business Model | Strategic Planning | Corporate Strategy | Product Management.",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    instructor: { name: "Chris Croft", title: "Business Consultant" },
    price: 49,
    category: "Business",
    level: "Beginner" as const,
    duration: "19 hours",
    lessonsCount: 142,
    studentsCount: 189000,
    rating: 4.5,
    reviewsCount: 23450,
    skills: ["Strategy", "Business Planning", "Management", "Leadership"],
    certificate: true
  }
]

const compactCourses = [
  {
    id: 20,
    title: "Introduction to Python Programming",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    instructor: { name: "Tim Buchalka" },
    price: 39,
    category: "Development",
    level: "Beginner" as const,
    duration: "18 hours",
    lessonsCount: 98,
    rating: 4.6,
    reviewsCount: 15890
  },
  {
    id: 21,
    title: "Graphic Design Masterclass",
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
    instructor: { name: "Lindsay Marsh" },
    price: 0,
    category: "Design",
    level: "All Levels" as const,
    duration: "12 hours",
    lessonsCount: 64,
    rating: 4.8,
    reviewsCount: 8920
  }
]

const horizontalCourses = [
  {
    id: 30,
    title: "Advanced React Patterns and Best Practices",
    description: "Deep dive into advanced React concepts including hooks, context, custom hooks, performance optimization, and modern patterns used by top companies.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    instructor: {
      name: "Kent C. Dodds",
      title: "React Expert",
      avatar: "https://i.pravatar.cc/150?img=68"
    },
    price: 99,
    originalPrice: 179,
    category: "Development",
    level: "Advanced" as const,
    duration: "38 hours",
    lessonsCount: 187,
    studentsCount: 145000,
    rating: 4.9,
    reviewsCount: 34560,
    skills: ["React", "Hooks", "Context API", "Performance", "Testing"],
    certificate: true
  },
  {
    id: 31,
    title: "AWS Certified Solutions Architect - Professional",
    description: "Pass the AWS Certified Solutions Architect Professional exam! Complete Amazon Web Services cloud architect certification course.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    instructor: {
      name: "Stephane Maarek",
      title: "AWS Expert",
      avatar: "https://i.pravatar.cc/150?img=14"
    },
    price: 89,
    originalPrice: 149,
    category: "Development",
    level: "Advanced" as const,
    duration: "28 hours",
    lessonsCount: 156,
    studentsCount: 234000,
    rating: 4.7,
    reviewsCount: 45670,
    skills: ["AWS", "Cloud Architecture", "S3", "EC2", "Lambda"],
    certificate: true
  }
]

const gridCourses = [
  {
    id: 40,
    title: "Figma UI/UX Design Essentials",
    description: "Learn Figma from scratch and design amazing user interfaces.",
    thumbnail: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop",
    instructor: { name: "Daniel Walter Scott" },
    price: 0,
    category: "Design",
    level: "Beginner" as const,
    rating: 4.8
  },
  {
    id: 41,
    title: "Excel for Business Analysis",
    description: "Master Excel for data analysis and business intelligence.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    instructor: { name: "Maven Analytics" },
    price: 44,
    category: "Business",
    level: "Intermediate" as const,
    rating: 4.7
  },
  {
    id: 42,
    title: "Photography Masterclass",
    description: "Complete guide to digital photography for beginners.",
    thumbnail: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
    instructor: { name: "Phil Ebiner" },
    price: 39,
    category: "Design",
    level: "Beginner" as const,
    rating: 4.6
  },
  {
    id: 43,
    title: "Spanish for Beginners",
    description: "Learn to speak Spanish fluently with this comprehensive course.",
    thumbnail: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=300&fit=crop",
    instructor: { name: "Maria Fernandez" },
    price: 0,
    category: "Business",
    level: "Beginner" as const,
    rating: 4.9
  }
]

const filteredCourses = computed(() => {
  return allCourses.filter(course => {
    if (filters.value.category && course.category !== filters.value.category) {
      return false
    }
    if (filters.value.level && course.level !== filters.value.level) {
      return false
    }
    if (filters.value.price === 'free' && course.price !== 0) {
      return false
    }
    if (filters.value.price === 'paid' && course.price === 0) {
      return false
    }
    if (filters.value.minRating && course.rating < parseFloat(filters.value.minRating)) {
      return false
    }
    return true
  })
})
</script>

<style scoped>
.courses-page {
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

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 2rem;
}

.filter-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.course-stats {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--ma-bg-tertiary, #f9fafb);
  border-radius: var(--ma-border-radius, 8px);
  color: var(--ma-text-secondary, #6b7280);
  font-size: 0.875rem;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
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

.grid-display {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
  .courses-page {
    padding: 1rem;
  }

  .page-hero h1 {
    font-size: 2rem;
  }

  .featured-grid,
  .courses-grid,
  .compact-grid,
  .grid-display {
    grid-template-columns: 1fr;
  }

  .filter-controls {
    grid-template-columns: 1fr;
  }
}
</style>
