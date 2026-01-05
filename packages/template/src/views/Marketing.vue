<template>
  <div class="marketing-page">
    <!-- Hero Section -->
    <div class="page-hero">
      <h1>Marketing Components</h1>
      <p>Complete suite of components for building engaging marketing websites</p>
    </div>

    <!-- Team Members -->
    <MaCard class="showcase-section">
      <h2>Team Members</h2>
      <p class="section-description">Showcase your team with beautiful member cards</p>

      <div class="team-grid">
        <MaTeamMember
          v-for="member in teamMembers"
          :key="member.id"
          :name="member.name"
          :role="member.role"
          :image="member.image"
          :bio="member.bio"
          :email="member.email"
          :social-links="member.socialLinks"
          :skills="member.skills"
          :stats="member.stats"
          :status="member.status"
          :featured="member.featured"
          @click="handleMemberClick(member)"
          @contact="handleMemberContact"
        />
      </div>

      <!-- Variants -->
      <div class="variant-showcase">
        <h3>Compact Variant</h3>
        <div class="compact-grid">
          <MaTeamMember
            v-for="member in compactMembers"
            :key="member.id"
            variant="compact"
            :name="member.name"
            :role="member.role"
            :image="member.image"
            :social-links="member.socialLinks"
          />
        </div>

        <h3>Horizontal Variant</h3>
        <MaTeamMember
          v-if="teamMembers[0]"
          variant="horizontal"
          :name="teamMembers[0].name"
          :role="teamMembers[0].role"
          :image="teamMembers[0].image"
          :bio="teamMembers[0].bio"
          :email="teamMembers[0].email"
          :social-links="teamMembers[0].socialLinks"
          :skills="teamMembers[0].skills"
          :stats="teamMembers[0].stats"
        />

        <h3>Minimal Variant</h3>
        <div class="minimal-grid">
          <MaTeamMember
            v-for="member in compactMembers"
            :key="member.id"
            variant="minimal"
            :name="member.name"
            :role="member.role"
            :image="member.image"
            :social-links="member.socialLinks"
          />
        </div>
      </div>
    </MaCard>

    <!-- FAQ Section -->
    <MaCard class="showcase-section">
      <h2>FAQ Component</h2>
      <p class="section-description">Collapsible FAQ accordion for common questions</p>

      <MaFaq 
        :items="faqItems" 
        :default-open="0"
        @toggle="handleFaqToggle"
      />
    </MaCard>

    <!-- Newsletter Section -->
    <MaCard class="showcase-section">
      <h2>Newsletter Component</h2>
      <p class="section-description">Email subscription forms with multiple variants</p>

      <div class="newsletter-variants">
        <div class="newsletter-item">
          <h3>Default Variant</h3>
          <MaNewsletter
            title="Stay Updated"
            description="Subscribe to our newsletter and get the latest updates delivered to your inbox."
            placeholder="your.email@example.com"
            button-text="Subscribe Now"
            helper-text="Join 10,000+ subscribers"
            @submit="handleNewsletterSubmit"
          />
        </div>

        <div class="newsletter-item">
          <h3>Compact Variant</h3>
          <MaNewsletter
            variant="compact"
            title="Newsletter"
            description="Get weekly updates"
            @submit="handleNewsletterSubmit"
          />
        </div>

        <div class="newsletter-item">
          <h3>Inline Variant</h3>
          <MaNewsletter
            variant="inline"
            title="Quick Subscribe"
            description="Stay in the loop with our newsletter"
            :show-privacy="false"
            @submit="handleNewsletterSubmit"
          />
        </div>

        <div class="newsletter-item">
          <h3>Centered Variant</h3>
          <MaNewsletter
            variant="centered"
            title="Join Our Community"
            description="Get exclusive content and updates straight to your inbox"
            @submit="handleNewsletterSubmit"
          />
        </div>
      </div>
    </MaCard>

    <!-- Footer Section -->
    <MaCard class="showcase-section">
      <h2>Footer Component</h2>
      <p class="section-description">Professional footer with links and social media</p>

      <div class="footer-demo">
        <h3>Default Footer</h3>
        <MaFooter
          :brand="footerBrand"
          :sections="footerSections"
          :social-links="footerSocialLinks"
          :bottom-links="footerBottomLinks"
          copyright="© 2026 MyAdmin Framework. All rights reserved."
        />
      </div>

      <div class="footer-demo">
        <h3>Compact Footer</h3>
        <MaFooter
          variant="compact"
          :brand="{ name: 'MyAdmin', description: 'Modern admin framework' }"
          :sections="footerSections.slice(0, 2)"
          :social-links="footerSocialLinks"
        />
      </div>

      <div class="footer-demo">
        <h3>Minimal Footer</h3>
        <MaFooter
          variant="minimal"
          :brand="{ name: 'MyAdmin' }"
          :sections="footerSections.slice(0, 3)"
          :social-links="footerSocialLinks"
          copyright="© 2026 MyAdmin"
        />
      </div>
    </MaCard>

    <!-- Props Documentation -->
    <MaCard class="props-docs">
      <h2>Component APIs</h2>

      <h3>MaTeamMember Props</h3>
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
              <td><code>name</code></td>
              <td>string</td>
              <td>required</td>
              <td>Member name</td>
            </tr>
            <tr>
              <td><code>role</code></td>
              <td>string</td>
              <td>required</td>
              <td>Job title/role</td>
            </tr>
            <tr>
              <td><code>image</code></td>
              <td>string</td>
              <td>required</td>
              <td>Profile image URL</td>
            </tr>
            <tr>
              <td><code>bio</code></td>
              <td>string</td>
              <td>-</td>
              <td>Short biography</td>
            </tr>
            <tr>
              <td><code>socialLinks</code></td>
              <td>SocialLink[]</td>
              <td>-</td>
              <td>Social media links</td>
            </tr>
            <tr>
              <td><code>skills</code></td>
              <td>string[]</td>
              <td>-</td>
              <td>Skills/expertise</td>
            </tr>
            <tr>
              <td><code>status</code></td>
              <td>'online' | 'away' | 'busy'</td>
              <td>-</td>
              <td>Availability status</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>'default' | 'compact' | 'horizontal' | 'minimal'</td>
              <td>'default'</td>
              <td>Display variant</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>MaFaq Props</h3>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>items</code></td>
              <td>FaqItem[]</td>
              <td>Array of Q&A items</td>
            </tr>
            <tr>
              <td><code>defaultOpen</code></td>
              <td>number | null</td>
              <td>Index of item open by default</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>MaNewsletter Props</h3>
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
              <td>-</td>
              <td>Newsletter title</td>
            </tr>
            <tr>
              <td><code>description</code></td>
              <td>string</td>
              <td>-</td>
              <td>Description text</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td>string</td>
              <td>'Enter your email'</td>
              <td>Input placeholder</td>
            </tr>
            <tr>
              <td><code>buttonText</code></td>
              <td>string</td>
              <td>'Subscribe'</td>
              <td>Button text</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>'default' | 'compact' | 'inline' | 'centered'</td>
              <td>'default'</td>
              <td>Display variant</td>
            </tr>
            <tr>
              <td><code>showPrivacy</code></td>
              <td>boolean</td>
              <td>true</td>
              <td>Show privacy message</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>MaFooter Props</h3>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>brand</code></td>
              <td>Brand</td>
              <td>Brand/logo information</td>
            </tr>
            <tr>
              <td><code>sections</code></td>
              <td>Section[]</td>
              <td>Footer link sections</td>
            </tr>
            <tr>
              <td><code>socialLinks</code></td>
              <td>SocialLink[]</td>
              <td>Social media links</td>
            </tr>
            <tr>
              <td><code>bottomLinks</code></td>
              <td>Link[]</td>
              <td>Bottom bar links</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>'default' | 'compact' | 'minimal'</td>
              <td>Display variant</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MaCard>
  </div>
</template>

<script setup lang="ts">
const handleMemberClick = (member: any) => {
  console.log('Member clicked:', member.name)
}

const handleMemberContact = (contact: any) => {
  console.log('Contact:', contact)
  alert(`Contacting ${contact.email || contact.phone}`)
}

const handleFaqToggle = (index: number, isOpen: boolean) => {
  console.log(`FAQ ${index} ${isOpen ? 'opened' : 'closed'}`)
}

const handleNewsletterSubmit = (email: string) => {
  console.log('Newsletter subscription:', email)
  alert(`Thanks for subscribing with ${email}!`)
}

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "https://i.pravatar.cc/400?img=32",
    bio: "Visionary leader with 15+ years in tech. Passionate about building products that make a difference.",
    email: "sarah@company.com",
    socialLinks: [
      { platform: "linkedin" as const, url: "https://linkedin.com" },
      { platform: "twitter" as const, url: "https://twitter.com" },
      { platform: "github" as const, url: "https://github.com" }
    ],
    skills: ["Leadership", "Strategy", "Product Vision"],
    stats: { projects: 50, experience: "15 years" },
    status: "online" as const,
    featured: true
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    image: "https://i.pravatar.cc/400?img=12",
    bio: "Tech enthusiast and architecture expert. Loves solving complex engineering challenges.",
    email: "michael@company.com",
    socialLinks: [
      { platform: "linkedin" as const, url: "https://linkedin.com" },
      { platform: "github" as const, url: "https://github.com" }
    ],
    skills: ["Architecture", "Cloud", "DevOps"],
    stats: { projects: 75, experience: "12 years" },
    status: "online" as const
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Head of Design",
    image: "https://i.pravatar.cc/400?img=45",
    bio: "Award-winning designer focused on creating delightful user experiences.",
    email: "emily@company.com",
    socialLinks: [
      { platform: "linkedin" as const, url: "https://linkedin.com" },
      { platform: "website" as const, url: "https://portfolio.com" }
    ],
    skills: ["UI/UX", "Prototyping", "Design Systems"],
    stats: { projects: 120, experience: "10 years" },
    status: "away" as const
  }
]

const compactMembers = [
  {
    id: 10,
    name: "David Kim",
    role: "Senior Developer",
    image: "https://i.pravatar.cc/400?img=56",
    socialLinks: [
      { platform: "github" as const, url: "https://github.com" },
      { platform: "twitter" as const, url: "https://twitter.com" }
    ]
  },
  {
    id: 11,
    name: "Lisa Wang",
    role: "Product Manager",
    image: "https://i.pravatar.cc/400?img=24",
    socialLinks: [
      { platform: "linkedin" as const, url: "https://linkedin.com" }
    ]
  },
  {
    id: 12,
    name: "Tom Anderson",
    role: "Marketing Lead",
    image: "https://i.pravatar.cc/400?img=68",
    socialLinks: [
      { platform: "linkedin" as const, url: "https://linkedin.com" },
      { platform: "twitter" as const, url: "https://twitter.com" }
    ]
  }
]

const faqItems = [
  {
    question: "What is MyAdmin Framework?",
    answer: "MyAdmin Framework is a comprehensive Vue 3 component library designed to help you build modern admin dashboards and web applications quickly. It includes 80+ components, utilities, and tools for rapid development."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy! Install the package via npm, import the components you need, and start building. Check out our documentation for detailed setup instructions and examples."
  },
  {
    question: "Is it free to use?",
    answer: "Yes! MyAdmin Framework is completely free and open-source. You can use it in personal and commercial projects without any licensing fees."
  },
  {
    question: "What technologies does it use?",
    answer: "Built with Vue 3, TypeScript, and Vite. It uses modern web standards and best practices to ensure optimal performance and developer experience."
  },
  {
    question: "Can I customize the components?",
    answer: "Absolutely! All components support theming through CSS custom properties. You can easily customize colors, spacing, and other design tokens to match your brand."
  },
  {
    question: "Is there support available?",
    answer: "Yes, we offer community support through GitHub discussions and issues. Premium support options are available for enterprise customers."
  }
]

const footerBrand = {
  name: "MyAdmin",
  description: "A modern admin framework for building beautiful web applications with Vue 3."
}

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", url: "#features" },
      { label: "Pricing", url: "#pricing" },
      { label: "Documentation", url: "#docs" },
      { label: "Changelog", url: "#changelog" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About Us", url: "#about" },
      { label: "Blog", url: "#blog" },
      { label: "Careers", url: "#careers" },
      { label: "Contact", url: "#contact" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Community", url: "#community" },
      { label: "Tutorials", url: "#tutorials" },
      { label: "GitHub", url: "https://github.com", external: true },
      { label: "Support", url: "#support" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", url: "#privacy" },
      { label: "Terms of Service", url: "#terms" },
      { label: "Cookie Policy", url: "#cookies" },
      { label: "Licenses", url: "#licenses" }
    ]
  }
]

const footerSocialLinks = [
  { platform: "twitter" as const, url: "https://twitter.com" },
  { platform: "github" as const, url: "https://github.com" },
  { platform: "linkedin" as const, url: "https://linkedin.com" },
  { platform: "youtube" as const, url: "https://youtube.com" }
]

const footerBottomLinks = [
  { label: "Privacy", url: "#privacy" },
  { label: "Terms", url: "#terms" },
  { label: "Cookies", url: "#cookies" }
]
</script>

<style scoped>
.marketing-page {
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

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.variant-showcase {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--ma-border-color, #e5e7eb);
}

.variant-showcase h3 {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
}

.compact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.minimal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.newsletter-variants {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 2rem;
}

.newsletter-item h3 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--ma-text-secondary, #6b7280);
}

.footer-demo {
  margin-bottom: 3rem;
}

.footer-demo:last-child {
  margin-bottom: 0;
}

.footer-demo h3 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--ma-text-secondary, #6b7280);
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
  .marketing-page {
    padding: 1rem;
  }

  .page-hero h1 {
    font-size: 2rem;
  }

  .team-grid,
  .compact-grid,
  .newsletter-variants {
    grid-template-columns: 1fr;
  }
}
</style>
