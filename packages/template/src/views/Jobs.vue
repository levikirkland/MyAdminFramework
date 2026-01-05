<template>
  <div class="jobs-page">
    <!-- Hero Section -->
    <div class="jobs-hero">
      <h1>Job Listings & Cards</h1>
      <p>Showcase job opportunities with flexible variants and rich metadata</p>
    </div>

    <!-- Job Cards Section -->
    <MaCard class="job-cards-section">
      <h2>Job Cards (Featured Style)</h2>
      <p class="section-description">Card-style presentation perfect for featured positions and landing pages</p>
      
      <div class="job-cards-grid">
        <MaJobCard
          v-for="job in featuredJobs"
          :key="job.id"
          :title="job.title"
          :company="job.company"
          :location="job.location"
          :location-type="job.locationType"
          :type="job.type"
          :salary="job.salary"
          :description="job.description"
          :benefits="job.benefits"
          :skills="job.skills"
          :posted-date="job.postedDate"
          :logo="job.logo"
          :featured="job.featured"
          @apply="handleApply"
        />
      </div>

      <details class="code-block" style="margin-top: 24px">
        <summary>Show Code</summary>
        <pre><code>&lt;MaJobCard
  title="Senior Frontend Developer"
  company="TechCorp Inc."
  location="San Francisco, CA"
  location-type="Hybrid"
  type="Full-time"
  salary="$120k - $180k"
  description="Build amazing web applications..."
  :benefits="['Health Insurance', '401k Matching']"
  :skills="['Vue.js', 'TypeScript']"
  :posted-date="new Date()"
  logo="/logo.png"
  @apply="handleApply"
/&gt;</code></pre>
      </details>
    </MaCard>

    <!-- Filters Demo -->
    <MaCard class="jobs-filters">
      <h2>Job Board with Filters</h2>
      <div class="filter-controls">
        <MaFormGroup label="Location Type">
          <MaSelect v-model="filters.locationType">
            <option value="">All</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
          </MaSelect>
        </MaFormGroup>
        
        <MaFormGroup label="Job Type">
          <MaSelect v-model="filters.type">
            <option value="">All</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </MaSelect>
        </MaFormGroup>

        <MaFormGroup label="Experience Level">
          <MaSelect v-model="filters.experienceLevel">
            <option value="">All</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
            <option value="Lead/Principal">Lead/Principal</option>
          </MaSelect>
        </MaFormGroup>

        <MaButton @click="resetFilters" variant="outline">
          <RefreshCw :size="16" />
          Reset
        </MaButton>
      </div>

      <div class="jobs-stats">
        <span>Showing {{ filteredJobs.length }} of {{ mockJobs.length }} jobs</span>
      </div>

      <div class="jobs-grid">
        <MaJobListing
          v-for="job in filteredJobs"
          :key="job.id"
          :job="job"
          :featured="job.featured"
          @apply="handleApply"
          @bookmark="handleBookmark"
        />
      </div>
    </MaCard>

    <!-- Variant Showcase -->
    <MaCard class="variant-showcase">
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
        
        <MaJobListing
          :job="sampleJob"
          variant="default"
        />

        <details v-if="showCode.default" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaJobListing
  :job="job"
  variant="default"
  @apply="handleApply"
  @bookmark="handleBookmark"
/&gt;</code></pre>
        </details>
      </div>

      <!-- Featured Variant -->
      <div class="variant-section">
        <div class="variant-header">
          <h3>Featured Job</h3>
          <button class="show-code-btn" @click="toggleCode('featured')">
            <Code :size="16" />
            {{ showCode.featured ? 'Hide' : 'Show' }} Code
          </button>
        </div>
        
        <MaJobListing
          :job="featuredJob"
          :featured="true"
        />

        <details v-if="showCode.featured" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaJobListing
  :job="job"
  :featured="true"
  @apply="handleApply"
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
          <MaJobListing
            v-for="job in compactJobs"
            :key="job.id"
            :job="job"
            variant="compact"
          />
        </div>

        <details v-if="showCode.compact" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaJobListing
  :job="job"
  variant="compact"
  @apply="handleApply"
/&gt;</code></pre>
        </details>
      </div>
    </MaCard>

    <!-- Props Documentation -->
    <MaCard class="props-docs">
      <h2>Props & Events</h2>
      
      <h3>Job Object Interface</h3>
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
              <td><code>id</code></td>
              <td>string | number</td>
              <td>Unique job identifier</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td>string</td>
              <td>Job title</td>
            </tr>
            <tr>
              <td><code>company</code></td>
              <td>string</td>
              <td>Company name</td>
            </tr>
            <tr>
              <td><code>location</code></td>
              <td>string</td>
              <td>Job location (city, state, country)</td>
            </tr>
            <tr>
              <td><code>locationType</code></td>
              <td>'Remote' | 'Hybrid' | 'Onsite'</td>
              <td>Work location type (optional)</td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td>'Full-time' | 'Part-time' | 'Contract' | 'Internship'</td>
              <td>Employment type (optional)</td>
            </tr>
            <tr>
              <td><code>salary</code></td>
              <td>string</td>
              <td>Salary range (optional)</td>
            </tr>
            <tr>
              <td><code>description</code></td>
              <td>string</td>
              <td>Job description (optional)</td>
            </tr>
            <tr>
              <td><code>skills</code></td>
              <td>string[]</td>
              <td>Required skills/technologies (optional)</td>
            </tr>
            <tr>
              <td><code>experienceLevel</code></td>
              <td>string</td>
              <td>Required experience level (optional)</td>
            </tr>
            <tr>
              <td><code>postedDate</code></td>
              <td>Date | string</td>
              <td>Job posting date (optional)</td>
            </tr>
            <tr>
              <td><code>logo</code></td>
              <td>string</td>
              <td>Company logo URL (optional)</td>
            </tr>
            <tr>
              <td><code>applyUrl</code></td>
              <td>string</td>
              <td>External application URL (optional)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Component Props</h3>
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
              <td><code>job</code></td>
              <td>Job</td>
              <td>required</td>
              <td>Job data object</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>'default' | 'compact' | 'featured'</td>
              <td>'default'</td>
              <td>Display variant</td>
            </tr>
            <tr>
              <td><code>featured</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Show featured badge and styling</td>
            </tr>
            <tr>
              <td><code>showBookmark</code></td>
              <td>boolean</td>
              <td>true</td>
              <td>Show bookmark button</td>
            </tr>
            <tr>
              <td><code>applyButtonText</code></td>
              <td>string</td>
              <td>'Apply Now'</td>
              <td>Apply button text</td>
            </tr>
            <tr>
              <td><code>maxSkills</code></td>
              <td>number</td>
              <td>5</td>
              <td>Maximum skills to display</td>
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
              <td><code>@apply</code></td>
              <td>job: Job</td>
              <td>Emitted when apply button is clicked</td>
            </tr>
            <tr>
              <td><code>@bookmark</code></td>
              <td>job: Job, bookmarked: boolean</td>
              <td>Emitted when bookmark button is toggled</td>
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

interface Job {
  id: string | number
  title: string
  company: string
  location: string
  locationType?: 'Remote' | 'Hybrid' | 'Onsite'
  type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  salary?: string
  description?: string
  skills?: string[]
  experienceLevel?: string
  postedDate?: Date | string
  logo?: string
  applyUrl?: string
  featured?: boolean
  benefits?: string[]
}

// Show code state
const showCode = ref({
  default: false,
  featured: false,
  compact: false
})

const toggleCode = (variant: keyof typeof showCode.value) => {
  showCode.value[variant] = !showCode.value[variant]
}

// Filters
const filters = ref({
  locationType: '',
  type: '',
  experienceLevel: ''
})

const resetFilters = () => {
  filters.value = {
    locationType: '',
    type: '',
    experienceLevel: ''
  }
}

// Sample job data
const sampleJob: Job = {
  id: 1,
  title: 'Senior Frontend Developer',
  company: 'TechCorp Inc.',
  location: 'San Francisco, CA',
  locationType: 'Hybrid',
  type: 'Full-time',
  salary: '$120k - $180k',
  description: 'We are seeking an experienced Frontend Developer to join our team and help build the next generation of web applications. You will work with modern frameworks and collaborate with designers and backend engineers.',
  skills: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Git', 'Vite'],
  experienceLevel: 'Senior Level',
  postedDate: new Date(2026, 0, 1),
  logo: 'https://via.placeholder.com/56x56/3b82f6/ffffff?text=TC'
}

// Featured jobs for card display
const featuredJobs: Job[] = [
  {
    id: 101,
    title: 'Lead Product Designer',
    company: 'DesignLab',
    location: 'Remote',
    locationType: 'Remote',
    type: 'Full-time',
    salary: '$140k - $200k',
    description: 'Join our design team to create beautiful and intuitive user experiences. Lead design initiatives, mentor junior designers, and shape our product vision.',
    benefits: ['Health Insurance', '401k Matching', 'Remote Work', 'Unlimited PTO'],
    skills: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping'],
    postedDate: new Date(2026, 0, 2),
    logo: 'https://via.placeholder.com/64x64/f59e0b/ffffff?text=DL',
    featured: true
  },
  {
    id: 102,
    title: 'Senior Full Stack Engineer',
    company: 'TechVentures',
    location: 'Austin, TX',
    locationType: 'Hybrid',
    type: 'Full-time',
    salary: '$130k - $180k',
    description: 'Build scalable web applications from the ground up. Work with cutting-edge technologies in a collaborative environment.',
    benefits: ['Stock Options', 'Health & Dental', 'Gym Membership', 'Learning Budget'],
    skills: ['Vue.js', 'Node.js', 'PostgreSQL', 'AWS'],
    postedDate: new Date(2026, 0, 1),
    logo: 'https://via.placeholder.com/64x64/8b5cf6/ffffff?text=TV'
  },
  {
    id: 103,
    title: 'DevOps Engineer',
    company: 'CloudScale',
    location: 'Seattle, WA',
    locationType: 'Remote',
    type: 'Full-time',
    salary: '$135k - $185k',
    description: 'Manage and optimize cloud infrastructure at scale. Implement CI/CD pipelines and automation.',
    benefits: ['Remote Work', 'Equipment Budget', 'Conference Tickets', 'Performance Bonus'],
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
    postedDate: new Date(2025, 11, 30),
    logo: 'https://via.placeholder.com/64x64/10b981/ffffff?text=CS',
    featured: true
  }
]

const featuredJob: Job = {
  id: 2,
  title: 'Lead Product Designer',
  company: 'DesignLab',
  location: 'Remote',
  locationType: 'Remote',
  type: 'Full-time',
  salary: '$140k - $200k',
  description: 'Join our design team to create beautiful and intuitive user experiences. Lead design initiatives, mentor junior designers, and shape our product vision.',
  skills: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping', 'User Research'],
  experienceLevel: 'Lead/Principal',
  postedDate: new Date(2026, 0, 2),
  logo: 'https://via.placeholder.com/56x56/f59e0b/ffffff?text=DL',
  featured: true
}

const compactJobs: Job[] = [
  {
    id: 3,
    title: 'Backend Engineer',
    company: 'CloudSystems',
    location: 'Austin, TX',
    locationType: 'Onsite',
    type: 'Full-time',
    salary: '$110k - $160k',
    skills: ['Node.js', 'PostgreSQL', 'AWS'],
    experienceLevel: 'Mid Level',
    postedDate: new Date(2026, 0, 1),
    logo: 'https://via.placeholder.com/40x40/10b981/ffffff?text=CS'
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'DataFlow',
    location: 'Seattle, WA',
    locationType: 'Remote',
    type: 'Contract',
    salary: '$130k - $170k',
    skills: ['Docker', 'Kubernetes', 'CI/CD'],
    experienceLevel: 'Senior Level',
    postedDate: new Date(2025, 11, 28),
    logo: 'https://via.placeholder.com/40x40/8b5cf6/ffffff?text=DF'
  }
]

// Mock job board data
const mockJobs = ref<Job[]>([
  {
    id: 10,
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    locationType: 'Hybrid',
    type: 'Full-time',
    salary: '$100k - $150k',
    description: 'Build and maintain our core platform using modern web technologies. Work on both frontend and backend systems.',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    experienceLevel: 'Mid Level',
    postedDate: new Date(2026, 0, 3),
    logo: 'https://via.placeholder.com/56x56/ec4899/ffffff?text=SX'
  },
  {
    id: 11,
    title: 'UI/UX Designer',
    company: 'Creative Agency',
    location: 'Los Angeles, CA',
    locationType: 'Remote',
    type: 'Full-time',
    salary: '$90k - $130k',
    description: 'Design intuitive and beautiful user interfaces for web and mobile applications.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Testing'],
    experienceLevel: 'Mid Level',
    postedDate: new Date(2026, 0, 2),
    logo: 'https://via.placeholder.com/56x56/06b6d4/ffffff?text=CA',
    featured: true
  },
  {
    id: 12,
    title: 'Software Engineering Intern',
    company: 'BigTech Corp',
    location: 'Boston, MA',
    locationType: 'Onsite',
    type: 'Internship',
    salary: '$30/hr',
    description: 'Learn and contribute to real-world projects in a supportive environment.',
    skills: ['Python', 'JavaScript', 'Git'],
    experienceLevel: 'Entry Level',
    postedDate: new Date(2026, 0, 1),
    logo: 'https://via.placeholder.com/56x56/14b8a6/ffffff?text=BT'
  },
  {
    id: 13,
    title: 'Senior Backend Engineer',
    company: 'FinTech Solutions',
    location: 'Chicago, IL',
    locationType: 'Hybrid',
    type: 'Full-time',
    salary: '$140k - $190k',
    description: 'Build scalable backend systems for financial applications. Experience with microservices required.',
    skills: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'PostgreSQL'],
    experienceLevel: 'Senior Level',
    postedDate: new Date(2025, 11, 30),
    logo: 'https://via.placeholder.com/56x56/f97316/ffffff?text=FS',
    featured: true
  },
  {
    id: 14,
    title: 'Mobile Developer',
    company: 'AppWorks',
    location: 'Remote',
    locationType: 'Remote',
    type: 'Contract',
    salary: '$120k - $160k',
    description: 'Develop cross-platform mobile applications using React Native.',
    skills: ['React Native', 'iOS', 'Android', 'Redux'],
    experienceLevel: 'Mid Level',
    postedDate: new Date(2026, 0, 2),
    logo: 'https://via.placeholder.com/56x56/a855f7/ffffff?text=AW'
  },
  {
    id: 15,
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'San Diego, CA',
    locationType: 'Remote',
    type: 'Full-time',
    salary: '$130k - $180k',
    description: 'Apply machine learning and statistical analysis to solve business problems.',
    skills: ['Python', 'TensorFlow', 'SQL', 'Statistics', 'Pandas'],
    experienceLevel: 'Senior Level',
    postedDate: new Date(2026, 0, 1),
    logo: 'https://via.placeholder.com/56x56/64748b/ffffff?text=AP'
  }
])

// Filtered jobs
const filteredJobs = computed(() => {
  return mockJobs.value.filter(job => {
    if (filters.value.locationType && job.locationType !== filters.value.locationType) {
      return false
    }
    if (filters.value.type && job.type !== filters.value.type) {
      return false
    }
    if (filters.value.experienceLevel && job.experienceLevel !== filters.value.experienceLevel) {
      return false
    }
    return true
  })
})

// Event handlers
const handleApply = (job: Job) => {
  console.log('Apply to job:', job.title)
  alert(`Application started for: ${job.title} at ${job.company}`)
}

const handleBookmark = (job: Job, bookmarked: boolean) => {
  console.log('Bookmark toggled:', job.title, bookmarked)
}
</script>

<style scoped>
.jobs-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.jobs-hero {
  text-align: center;
  margin-bottom: 3rem;
}

.jobs-hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--ma-text-primary, #1f2937);
}

.jobs-hero p {
  font-size: 1.125rem;
  color: var(--ma-text-secondary, #6b7280);
}

.job-cards-section {
  margin-bottom: 2rem;
}

.job-cards-section h2 {
  margin: 0 0 0.5rem 0;
}

.section-description {
  margin: 0 0 2rem 0;
  color: var(--ma-text-secondary, #6b7280);
}

.job-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.jobs-filters {
  margin-bottom: 2rem;
}

.jobs-filters h2 {
  margin: 0 0 1.5rem 0;
}

.filter-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.jobs-stats {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--ma-bg-tertiary, #f9fafb);
  border-radius: var(--ma-border-radius, 8px);
  color: var(--ma-text-secondary, #6b7280);
  font-size: 0.875rem;
}

.jobs-grid {
  display: grid;
  gap: 1.5rem;
}

.variant-showcase {
  margin-bottom: 2rem;
}

.variant-showcase h2 {
  margin: 0 0 2rem 0;
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
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1rem;
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
  .jobs-page {
    padding: 1rem;
  }
  
  .jobs-hero h1 {
    font-size: 2rem;
  }
  
  .compact-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-controls {
    grid-template-columns: 1fr;
  }
}
</style>
