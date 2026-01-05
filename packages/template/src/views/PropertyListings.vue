<template>
  <div class="property-page">
    <!-- Hero Section -->
    <div class="page-hero">
      <h1>Property Card Component</h1>
      <p>Showcase real estate listings with beautiful, feature-rich property cards</p>
    </div>

    <!-- Featured Properties -->
    <MaCard class="showcase-section">
      <h2>Featured Properties</h2>
      <p class="section-description">Highlight premium listings with featured styling</p>
      
      <div class="featured-grid">
        <MaPropertyCard
          v-for="property in featuredProperties"
          :key="property.id"
          :title="property.title"
          :price="property.price"
          :location="property.location"
          :images="property.images"
          :bedrooms="property.bedrooms"
          :bathrooms="property.bathrooms"
          :area="property.area"
          :property-type="property.propertyType"
          :status="property.status"
          :features="property.features"
          :agent="property.agent"
          :featured="property.featured"
          @click="handlePropertyClick(property)"
          @favorite="handleFavorite"
          @contact="handleContact"
        />
      </div>
    </MaCard>

    <!-- Filters & Listings -->
    <MaCard class="showcase-section">
      <h2>Property Listings with Filters</h2>
      
      <div class="filter-controls">
        <MaFormGroup label="Status">
          <MaSelect v-model="filters.status">
            <option value="">All</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
            <option value="Sold">Sold</option>
          </MaSelect>
        </MaFormGroup>
        
        <MaFormGroup label="Property Type">
          <MaSelect v-model="filters.propertyType">
            <option value="">All</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
          </MaSelect>
        </MaFormGroup>

        <MaFormGroup label="Min Bedrooms">
          <MaSelect v-model="filters.minBedrooms">
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </MaSelect>
        </MaFormGroup>

        <MaButton @click="resetFilters" variant="outline">
          <RefreshCw :size="16" />
          Reset
        </MaButton>
      </div>

      <div class="property-stats">
        <span>Showing {{ filteredProperties.length }} of {{ allProperties.length }} properties</span>
      </div>

      <div class="properties-grid">
        <MaPropertyCard
          v-for="property in filteredProperties"
          :key="property.id"
          :title="property.title"
          :price="property.price"
          :price-frequency="property.priceFrequency"
          :location="property.location"
          :images="property.images"
          :bedrooms="property.bedrooms"
          :bathrooms="property.bathrooms"
          :area="property.area"
          :property-type="property.propertyType"
          :status="property.status"
          :features="property.features"
          :agent="property.agent"
          @click="handlePropertyClick(property)"
          @favorite="handleFavorite"
          @contact="handleContact"
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
          <MaPropertyCard
            v-for="property in compactProperties"
            :key="property.id"
            variant="compact"
            :title="property.title"
            :price="property.price"
            :location="property.location"
            :images="property.images"
            :bedrooms="property.bedrooms"
            :bathrooms="property.bathrooms"
            :area="property.area"
            :status="property.status"
            :agent="property.agent"
          />
        </div>

        <details v-if="showCode.compact" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaPropertyCard
  variant="compact"
  title="Modern Apartment"
  :price="450000"
  location="Downtown"
  :images="['/img1.jpg']"
  :bedrooms="2"
  :bathrooms="2"
  :area="950"
  status="For Sale"
  :agent="agentInfo"
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
          <MaPropertyCard
            v-for="property in horizontalProperties"
            :key="property.id"
            variant="horizontal"
            :title="property.title"
            :price="property.price"
            :location="property.location"
            :images="property.images"
            :bedrooms="property.bedrooms"
            :bathrooms="property.bathrooms"
            :area="property.area"
            :property-type="property.propertyType"
            :status="property.status"
            :features="property.features"
            :agent="property.agent"
          />
        </div>

        <details v-if="showCode.horizontal" open class="code-block">
          <summary>Component Code</summary>
          <pre><code>&lt;MaPropertyCard
  variant="horizontal"
  title="Property Title"
  :price="500000"
  location="City, State"
  :images="['/image.jpg']"
  :bedrooms="3"
  :bathrooms="2"
  :area="1200"
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
              <td>Property title/address</td>
            </tr>
            <tr>
              <td><code>price</code></td>
              <td>number | string</td>
              <td>required</td>
              <td>Property price</td>
            </tr>
            <tr>
              <td><code>priceFrequency</code></td>
              <td>'month' | 'week' | 'night'</td>
              <td>-</td>
              <td>Rental frequency (optional)</td>
            </tr>
            <tr>
              <td><code>location</code></td>
              <td>string</td>
              <td>required</td>
              <td>Property location</td>
            </tr>
            <tr>
              <td><code>images</code></td>
              <td>string[]</td>
              <td>required</td>
              <td>Property images URLs</td>
            </tr>
            <tr>
              <td><code>bedrooms</code></td>
              <td>number</td>
              <td>-</td>
              <td>Number of bedrooms</td>
            </tr>
            <tr>
              <td><code>bathrooms</code></td>
              <td>number</td>
              <td>-</td>
              <td>Number of bathrooms</td>
            </tr>
            <tr>
              <td><code>area</code></td>
              <td>number</td>
              <td>-</td>
              <td>Property area size</td>
            </tr>
            <tr>
              <td><code>areaUnit</code></td>
              <td>'sqft' | 'sqm'</td>
              <td>'sqft'</td>
              <td>Area unit</td>
            </tr>
            <tr>
              <td><code>propertyType</code></td>
              <td>string</td>
              <td>-</td>
              <td>Type (House, Apartment, etc.)</td>
            </tr>
            <tr>
              <td><code>status</code></td>
              <td>'For Sale' | 'For Rent' | 'Sold' | etc.</td>
              <td>-</td>
              <td>Property status</td>
            </tr>
            <tr>
              <td><code>features</code></td>
              <td>string[]</td>
              <td>-</td>
              <td>Property features/amenities</td>
            </tr>
            <tr>
              <td><code>agent</code></td>
              <td>Agent</td>
              <td>-</td>
              <td>Agent information</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>'default' | 'compact' | 'horizontal'</td>
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
              <td><code>showFavorite</code></td>
              <td>boolean</td>
              <td>true</td>
              <td>Show favorite button</td>
            </tr>
            <tr>
              <td><code>showContact</code></td>
              <td>boolean</td>
              <td>true</td>
              <td>Show contact button</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Agent Interface</h3>
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
              <td>Agent name (required)</td>
            </tr>
            <tr>
              <td><code>company</code></td>
              <td>string</td>
              <td>Company name (optional)</td>
            </tr>
            <tr>
              <td><code>avatar</code></td>
              <td>string</td>
              <td>Avatar URL (optional)</td>
            </tr>
            <tr>
              <td><code>phone</code></td>
              <td>string</td>
              <td>Phone number (optional)</td>
            </tr>
            <tr>
              <td><code>email</code></td>
              <td>string</td>
              <td>Email address (optional)</td>
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
              <td>Emitted when property is clicked</td>
            </tr>
            <tr>
              <td><code>@favorite</code></td>
              <td>favorited: boolean</td>
              <td>Emitted when favorite toggled</td>
            </tr>
            <tr>
              <td><code>@contact</code></td>
              <td>agent: Agent</td>
              <td>Emitted when contact clicked</td>
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
  horizontal: false
})

const toggleCode = (variant: keyof typeof showCode.value) => {
  showCode.value[variant] = !showCode.value[variant]
}

const filters = ref({
  status: '',
  propertyType: '',
  minBedrooms: ''
})

const resetFilters = () => {
  filters.value = {
    status: '',
    propertyType: '',
    minBedrooms: ''
  }
}

const handlePropertyClick = (property: any) => {
  console.log('Property clicked:', property.title)
}

const handleFavorite = (favorited: boolean) => {
  console.log('Favorited:', favorited)
}

const handleContact = (agent: any) => {
  console.log('Contact agent:', agent.name)
  alert(`Contacting ${agent.name}...`)
}

const featuredProperties = [
  {
    id: 1,
    title: "Luxury Penthouse with Skyline Views",
    price: 2500000,
    location: "Manhattan, New York, NY",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&h=600&fit=crop"
    ],
    bedrooms: 4,
    bathrooms: 3.5,
    area: 3200,
    propertyType: "Penthouse",
    status: "For Sale",
    features: ["Pool", "Gym", "Concierge", "Parking", "Balcony"],
    agent: {
      name: "Sarah Mitchell",
      company: "Luxury Real Estate Group",
      avatar: "https://i.pravatar.cc/150?img=32",
      phone: "(555) 123-4567",
      email: "sarah@luxuryrealestate.com"
    },
    featured: true
  },
  {
    id: 2,
    title: "Modern Beach House",
    price: 1850000,
    location: "Malibu, CA",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
    ],
    bedrooms: 5,
    bathrooms: 4,
    area: 3800,
    propertyType: "House",
    status: "For Sale",
    features: ["Beach Access", "Pool", "Ocean View", "Deck"],
    agent: {
      name: "Michael Chen",
      company: "Coastal Properties",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    featured: true
  }
]

const allProperties = [
  {
    id: 10,
    title: "Downtown Loft Apartment",
    price: 3500,
    priceFrequency: "month",
    location: "Brooklyn, NY",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"],
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    propertyType: "Apartment",
    status: "For Rent",
    features: ["Washer/Dryer", "Hardwood Floors"],
    agent: {
      name: "Emma Johnson",
      company: "Urban Living Realty"
    }
  },
  {
    id: 11,
    title: "Suburban Family Home",
    price: 675000,
    location: "Austin, TX",
    images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop"],
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    propertyType: "House",
    status: "For Sale",
    features: ["Backyard", "Garage", "Modern Kitchen"],
    agent: {
      name: "David Rodriguez",
      company: "Texas Home Experts",
      avatar: "https://i.pravatar.cc/150?img=56"
    }
  },
  {
    id: 12,
    title: "Cozy Studio in Heart of City",
    price: 2200,
    priceFrequency: "month",
    location: "San Francisco, CA",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"],
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    propertyType: "Apartment",
    status: "For Rent",
    features: ["Pet Friendly", "Laundry"],
    agent: {
      name: "Lisa Anderson",
      company: "City Living Properties"
    }
  },
  {
    id: 13,
    title: "Luxury Condo with Amenities",
    price: 890000,
    location: "Seattle, WA",
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"],
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1850,
    propertyType: "Condo",
    status: "For Sale",
    features: ["Gym", "Pool", "Concierge", "Parking"],
    agent: {
      name: "Jennifer Kim",
      company: "Northwest Realty Group",
      avatar: "https://i.pravatar.cc/150?img=24"
    }
  },
  {
    id: 14,
    title: "Charming Townhouse",
    price: 525000,
    location: "Portland, OR",
    images: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"],
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1650,
    propertyType: "Townhouse",
    status: "For Sale",
    features: ["Patio", "Garage", "Updated"],
    agent: {
      name: "Tom Baker",
      company: "Pacific Northwest Homes"
    }
  }
]

const compactProperties = [
  {
    id: 20,
    title: "Modern Studio",
    price: 1800,
    location: "Chicago, IL",
    images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop"],
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    status: "For Rent",
    agent: { name: "Amy Chen" }
  },
  {
    id: 21,
    title: "Family Home",
    price: 550000,
    location: "Denver, CO",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop"],
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    status: "For Sale",
    agent: { name: "Ryan Scott" }
  }
]

const horizontalProperties = [
  {
    id: 30,
    title: "Waterfront Condo with Marina Views",
    price: 1200000,
    location: "Miami, FL",
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop"],
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    propertyType: "Condo",
    status: "For Sale",
    features: ["Marina Access", "Pool", "Gym"],
    agent: {
      name: "Carlos Rivera",
      company: "Waterfront Living",
      avatar: "https://i.pravatar.cc/150?img=33"
    }
  },
  {
    id: 31,
    title: "Mountain Retreat Cabin",
    price: 750000,
    location: "Aspen, CO",
    images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop"],
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    propertyType: "House",
    status: "For Sale",
    features: ["Fireplace", "Mountain View", "Deck"],
    agent: {
      name: "Rachel Green",
      company: "Mountain Properties"
    }
  }
]

const filteredProperties = computed(() => {
  return allProperties.filter(property => {
    if (filters.value.status && property.status !== filters.value.status) {
      return false
    }
    if (filters.value.propertyType && property.propertyType !== filters.value.propertyType) {
      return false
    }
    if (filters.value.minBedrooms && property.bedrooms < parseInt(filters.value.minBedrooms)) {
      return false
    }
    return true
  })
})
</script>

<style scoped>
.property-page {
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

.filter-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.property-stats {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--ma-bg-secondary);
  border-radius: var(--ma-border-radius, 8px);
  color: var(--ma-text-secondary);
  font-size: 0.875rem;
}

.properties-grid {
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
  .property-page {
    padding: 1rem;
  }

  .page-hero h1 {
    font-size: 2rem;
  }

  .featured-grid,
  .properties-grid,
  .compact-grid {
    grid-template-columns: 1fr;
  }

  .filter-controls {
    grid-template-columns: 1fr;
  }
}
</style>
