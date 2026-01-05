<template>
  <div class="components-page">
    <div class="page-header">
      <h1>Component Library</h1>
      <p>Explore the building blocks of the framework.</p>
    </div>

    <div class="components-grid">
      <section class="component-section">
        <h2>Buttons</h2>
        <MaCard>
          <div class="demo-row">
            <MaButton>Primary</MaButton>
            <MaButton variant="outline">Outline</MaButton>
            <MaButton variant="ghost">Ghost</MaButton>
            <MaButton variant="text">Text</MaButton>
          </div>
          <div class="demo-row">
            <MaButton color="success">Success</MaButton>
            <MaButton color="warning">Warning</MaButton>
            <MaButton color="danger">Danger</MaButton>
            <MaButton color="info">Info</MaButton>
          </div>
          <div class="demo-row">
            <MaButton loading>Loading</MaButton>
            <MaButton disabled>Disabled</MaButton>
            <MaButton icon="Search">With Icon</MaButton>
          </div>
        </MaCard>
      </section>

      <section class="component-section">
        <h2>Form Inputs</h2>
        <MaCard>
          <div class="demo-col">
            <MaInput placeholder="Basic Input" />
            <MaInput placeholder="With Icon" prefixIcon="User" />
            <MaInput placeholder="Password" type="password" />
            <MaInput placeholder="Disabled" disabled />
            <MaInput placeholder="Error State" error="This field is required" />
          </div>
        </MaCard>
      </section>

      <section class="component-section">
        <h2>Alerts & Feedback</h2>
        <MaCard>
          <div class="demo-col">
            <MaAlert type="info" title="Info Alert" description="This is an info alert." />
            <MaAlert type="success" title="Success Alert" description="Operation completed successfully." />
            <MaAlert type="warning" title="Warning Alert" description="Please be careful." />
            <MaAlert type="error" title="Error Alert" description="Something went wrong." />
          </div>
        </MaCard>
      </section>

      <section class="component-section">
        <h2>Interactive Elements</h2>
        <div class="demo-grid">
          <MaCard title="Modals">
            <MaButton @click="showModal = true">Open Modal</MaButton>
            <MaModal v-model="showModal" title="Example Modal">
              <p>This is a modal dialog. You can put any content here.</p>
              <template #footer>
                <MaButton variant="ghost" @click="showModal = false">Cancel</MaButton>
                <MaButton @click="showModal = false">Confirm</MaButton>
              </template>
            </MaModal>
          </MaCard>

          <MaCard title="Drawers">
            <MaButton @click="showDrawer = true">Open Drawer</MaButton>
            <MaDrawer v-model="showDrawer" title="Example Drawer">
              <p>This is a drawer that slides in from the right.</p>
            </MaDrawer>
          </MaCard>
        </div>
      </section>

      <section class="component-section">
        <h2>Advanced Form Elements</h2>
        <MaCard>
          <div class="demo-col">
            <div class="demo-row">
              <MaSelect 
                placeholder="Select an option" 
                :options="[
                  { label: 'Option 1', value: '1' },
                  { label: 'Option 2', value: '2' },
                  { label: 'Option 3', value: '3' }
                ]"
              />
              <MaSelect 
                placeholder="Disabled Select" 
                disabled
                :options="[]"
              />
            </div>
            
            <div class="demo-row">
              <MaCheckbox>Checkbox</MaCheckbox>
              <MaCheckbox :modelValue="true">Checked</MaCheckbox>
              <MaCheckbox disabled>Disabled</MaCheckbox>
            </div>

            <div class="demo-row">
              <MaRadio name="r1" value="1" modelValue="1">Radio 1</MaRadio>
              <MaRadio name="r1" value="2" modelValue="1">Radio 2</MaRadio>
            </div>

            <div class="demo-row">
              <MaSwitch />
              <MaSwitch :modelValue="true" />
              <MaSwitch disabled />
            </div>

            <MaTextarea placeholder="Enter your message..." :rows="3" />
          </div>
        </MaCard>
      </section>

      <section class="component-section">
        <h2>Feedback & Overlay</h2>
        <MaCard>
          <div class="demo-col">
            <div class="demo-row">
              <MaTooltip content="This is a tooltip">
                <MaButton variant="outline">Hover me</MaButton>
              </MaTooltip>
              
              <MaButton @click="showToast">Show Toast</MaButton>
            </div>

            <div class="demo-row">
              <MaProgress :percentage="30" />
              <MaProgress :percentage="70" status="success" />
              <MaProgress :percentage="100" status="exception" />
            </div>

            <div class="demo-row">
              <MaSpinner size="small" />
              <MaSpinner />
              <MaSpinner size="large" />
            </div>

            <MaSkeleton :rows="3" avatar />
          </div>
        </MaCard>
      </section>

      <section class="component-section">
        <h2>Data Display</h2>
        <MaCard>
          <div class="demo-col">
            <div class="demo-row">
              <MaAvatar src="https://i.pravatar.cc/150?u=1" />
              <MaAvatar>JD</MaAvatar>
              <MaAvatar icon="User" />
            </div>

            <div class="demo-row">
              <MaBadge type="success">Active</MaBadge>
              <MaBadge type="warning">Pending</MaBadge>
              <MaBadge type="danger">Error</MaBadge>
              <MaBadge type="info">Info</MaBadge>
            </div>
            
            <div class="demo-row">
              <MaTag closable>Tag 1</MaTag>
              <MaTag color="purple">Custom Color</MaTag>
              <MaTag variant="outline">Outline</MaTag>
            </div>

            <MaTimeline>
              <MaTimelineItem timestamp="2024-01-01" title="Project Started">
                Initial commit and setup.
              </MaTimelineItem>
              <MaTimelineItem timestamp="2024-01-15" title="Alpha Release" color="green">
                First internal release.
              </MaTimelineItem>
              <MaTimelineItem timestamp="2024-02-01" title="Beta Launch" color="blue">
                Public beta access opened.
              </MaTimelineItem>
            </MaTimeline>
          </div>
        </MaCard>
      </section>

      <section class="component-section">
        <h2>Process Steps</h2>
        <MaCard>
          <MaSteps :active="1">
            <MaStep :index="0" title="Step 1" description="Create Account" />
            <MaStep :index="1" title="Step 2" description="Verify Email" />
            <MaStep :index="2" title="Step 3" description="Complete Profile" />
          </MaSteps>
        </MaCard>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'my-admin-framework'

const showModal = ref(false)
const showDrawer = ref(false)
const toast = useToast()

const showToast = () => {
  toast.success('This is a success message!')
}
</script>

<style scoped>
.components-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 24px;
}

.page-header {
  margin-bottom: 60px;
  text-align: center;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--ma-text-main);
}

.page-header p {
  color: var(--ma-text-secondary);
  font-size: 1.25rem;
}

.components-grid {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.component-section h2 {
  font-size: 1.5rem;
  margin-bottom: 24px;
  color: var(--ma-text-main);
  border-bottom: 1px solid var(--ma-border);
  padding-bottom: 12px;
}

.demo-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.demo-row:last-child {
  margin-bottom: 0;
}

.demo-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
