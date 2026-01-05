<template>
  <div class="components-view">
    <MaRow :gutter="[24, 24]">
      <MaCol :span="24">
        <MaCard title="Card with Tools" collapsible removable maximizable>
          <p>This card has expand, remove, and maximize controls.</p>
          <p>Try clicking the icons in the header.</p>
          <template #footer>
             Footer content
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="24">
        <MaCard title="Buttons">
          <div class="component-demo" style="margin-bottom: 16px;">
            <MaButton>Primary</MaButton>
            <MaButton variant="outline">Outline</MaButton>
            <MaButton variant="ghost">Ghost</MaButton>
            <MaButton variant="text">Text</MaButton>
            <MaButton disabled>Disabled</MaButton>
            <MaButton loading>Loading</MaButton>
            <MaButton icon="Search" aria-label="Search Button" />
          </div>
          <div class="component-demo" style="margin-bottom: 16px;">
            <MaButton color="success">Success</MaButton>
            <MaButton color="warning">Warning</MaButton>
            <MaButton color="danger">Danger</MaButton>
            <MaButton color="info">Info</MaButton>
            <MaButton color="secondary">Secondary</MaButton>
          </div>
          <div class="component-demo">
            <MaButton size="small">Small</MaButton>
            <MaButton size="medium">Medium</MaButton>
            <MaButton size="large">Large</MaButton>
            <MaButton icon="Search">Icon</MaButton>
            <MaButton icon="Trash" variant="outline" color="danger" />
          </div>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaButton&gt;Primary&lt;/MaButton&gt;
&lt;MaButton variant="outline"&gt;Outline&lt;/MaButton&gt;
&lt;MaButton color="success"&gt;Success&lt;/MaButton&gt;
&lt;MaButton size="small"&gt;Small&lt;/MaButton&gt;
&lt;MaButton icon="Search"&gt;Icon&lt;/MaButton&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="24">
        <MaCard title="Icons">
          <div class="component-demo" style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
            <div style="text-align: center;">
              <MaIcon name="Home" />
              <div style="font-size: 12px; margin-top: 4px;">Home</div>
            </div>
            <div style="text-align: center;">
              <MaIcon name="Settings" :size="32" color="#0052cc" />
              <div style="font-size: 12px; margin-top: 4px;">Settings (32px)</div>
            </div>
            <div style="text-align: center;">
              <MaIcon name="Heart" color="#dc2626" fill="#dc2626" />
              <div style="font-size: 12px; margin-top: 4px;">Heart (Filled)</div>
            </div>
            <div style="text-align: center;">
              <MaIcon name="Activity" :stroke-width="3" color="#16a34a" />
              <div style="font-size: 12px; margin-top: 4px;">Activity (Bold)</div>
            </div>
            <div style="text-align: center;">
              <MaIcon name="Loader2" class="spin" />
              <div style="font-size: 12px; margin-top: 4px;">Spinning</div>
            </div>
          </div>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaIcon name="Home" /&gt;
&lt;MaIcon name="Settings" :size="32" color="#0052cc" /&gt;
&lt;MaIcon name="Loader2" class="spin" /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="24">
        <MaCard title="Form Controls">
          <MaRow :gutter="[24, 24]">
            <MaCol :span="8">
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <h4 style="margin-bottom: 8px;">Checkbox</h4>
                <MaCheckbox v-model="checkboxValue" label="Basic Checkbox" />
                <MaCheckbox v-model="checkboxValue" label="Indeterminate" indeterminate />
                <MaCheckbox v-model="checkboxValue" label="Disabled" disabled />
                <div style="display: flex; gap: 12px;">
                  <MaCheckbox v-model="checkboxValue" size="small" label="Small" />
                  <MaCheckbox v-model="checkboxValue" size="medium" label="Medium" />
                  <MaCheckbox v-model="checkboxValue" size="large" label="Large" />
                </div>
                <div style="display: flex; gap: 12px;">
                  <MaCheckbox v-model="checkboxValue" color="success" label="Success" />
                  <MaCheckbox v-model="checkboxValue" color="danger" label="Danger" />
                </div>
              </div>
            </MaCol>
            
            <MaCol :span="8">
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <h4 style="margin-bottom: 8px;">Radio</h4>
                <MaRadio v-model="radioValue" value="1" label="Option 1" />
                <MaRadio v-model="radioValue" value="2" label="Option 2" />
                <MaRadio v-model="radioValue" value="3" label="Disabled" disabled />
                <div style="display: flex; gap: 12px; margin-top: 8px;">
                  <MaRadio v-model="radioValue" value="1" size="small" label="Small" />
                  <MaRadio v-model="radioValue" value="2" size="medium" label="Medium" />
                </div>
                <div style="display: flex; gap: 12px;">
                  <MaRadio v-model="radioValue" value="1" color="warning" label="Warning" />
                  <MaRadio v-model="radioValue" value="2" color="info" label="Info" />
                </div>
              </div>
            </MaCol>

            <MaCol :span="8">
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <h4 style="margin-bottom: 8px;">Switch</h4>
                <MaSwitch v-model="switchValue" label="Toggle me" />
                <MaSwitch v-model="switchValue" active-text="On" inactive-text="Off" />
                <MaSwitch v-model="switchValue" loading label="Loading" />
                <MaSwitch v-model="switchValue" disabled label="Disabled" />
                <div style="display: flex; gap: 12px;">
                  <MaSwitch v-model="switchValue" size="small" />
                  <MaSwitch v-model="switchValue" size="medium" />
                  <MaSwitch v-model="switchValue" size="large" />
                </div>
                <div style="display: flex; gap: 12px;">
                  <MaSwitch v-model="switchValue" color="success" />
                  <MaSwitch v-model="switchValue" color="danger" />
                </div>
              </div>
            </MaCol>
          </MaRow>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaCheckbox v-model="val" label="Checkbox" /&gt;
&lt;MaRadio v-model="val" value="1" label="Radio" /&gt;
&lt;MaSwitch v-model="val" label="Switch" /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="24">
        <MaCard title="Inputs">
          <div class="component-demo" style="margin-bottom: 16px;">
            <MaInput v-model="inputValue" placeholder="Basic Input" />
            <MaInput v-model="inputValue" placeholder="Clearable" clearable />
            <MaInput v-model="inputValue" placeholder="With Prefix" prefix-icon="Search" />
            <MaInput v-model="inputValue" placeholder="With Suffix" suffix-icon="Mail" />
            <MaInput v-model="passwordValue" type="password" placeholder="Password" />
          </div>
          <div class="component-demo" style="margin-bottom: 16px;">
            <MaInput v-model="inputValue" placeholder="Small" size="small" />
            <MaInput v-model="inputValue" placeholder="Medium" size="medium" />
            <MaInput v-model="inputValue" placeholder="Large" size="large" />
          </div>
          <div class="component-demo">
            <MaInput v-model="inputValue" placeholder="Disabled" disabled />
            <MaInput v-model="inputValue" placeholder="Readonly" readonly />
            <MaInput v-model="inputValue" placeholder="Error State" error="This field is required" />
          </div>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaInput v-model="val" placeholder="Basic" /&gt;
&lt;MaInput v-model="val" clearable /&gt;
&lt;MaInput v-model="val" prefix-icon="Search" /&gt;
&lt;MaInput v-model="val" error="Error message" /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="24">
        <MaCard title="Card Features">
          <MaRow :gutter="[16, 16]">
            <MaCol :span="8">
              <MaCard title="Card with Actions">
                <p>Card content goes here.</p>
                <template #footer>
                  <MaButton size="small" variant="text">Cancel</MaButton>
                  <MaButton size="small">Save</MaButton>
                </template>
              </MaCard>
            </MaCol>
            <MaCol :span="8">
              <MaCard title="Loading State" loading>
                <p>This content will be replaced by a skeleton.</p>
              </MaCard>
            </MaCol>
            <MaCol :span="8">
              <MaCard shadow="hover">
                <template #cover>
                  <img src="https://picsum.photos/400/200" alt="Cover" style="height: 140px; object-fit: cover;" />
                </template>
                <div style="padding-top: 12px;">
                  <h4>Card with Cover</h4>
                  <p style="color: var(--ma-text-secondary); font-size: 0.875rem;">Description text here.</p>
                </div>
              </MaCard>
            </MaCol>
          </MaRow>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaCard title="Title"&gt;
  Content
  &lt;template #footer&gt;Footer&lt;/template&gt;
&lt;/MaCard&gt;
&lt;MaCard loading /&gt;
&lt;MaCard shadow="hover" /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="24">
        <MaCard title="Alerts">
          <MaAlert type="success" title="Success Alert" closable>
            This is a success alert with a title and close button.
          </MaAlert>
          <MaAlert type="warning" title="Warning Alert" variant="outline">
            This is a warning alert with outline variant.
          </MaAlert>
          <MaAlert type="error" closable variant="solid">
            This is a solid error alert.
          </MaAlert>
          <MaAlert type="info" show-icon>
            This is an info alert with default style.
          </MaAlert>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaAlert type="success" title="Success" closable&gt;Text&lt;/MaAlert&gt;
&lt;MaAlert type="warning" variant="outline"&gt;Text&lt;/MaAlert&gt;
&lt;MaAlert type="info" show-icon&gt;Text&lt;/MaAlert&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Avatars">
          <div class="component-demo">
            <MaBadge :value="5" color="danger">
              <MaAvatar src="https://i.pravatar.cc/150?u=1" />
            </MaBadge>
            <MaBadge dot color="success">
              <MaAvatar text="AD" bgColor="#f56a00" color="#fde3cf" />
            </MaBadge>
            <MaAvatar icon="User" />
            <MaAvatar size="small" text="S" />
            <MaAvatar size="large" src="https://invalid-url.com/image.png" text="FB" bgColor="#16a34a" color="white" />
            <MaAvatar shape="square" icon="Settings" />
          </div>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaAvatar src="url" /&gt;
&lt;MaAvatar text="AD" bgColor="#f56a00" /&gt;
&lt;MaAvatar icon="User" /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Badges">
          <div class="component-demo">
            <MaBadge :value="5">
              <MaButton size="small">Comments</MaButton>
            </MaBadge>
            <MaBadge :value="100" :max="99" color="primary">
              <MaButton size="small">Likes</MaButton>
            </MaBadge>
            <MaBadge dot>
              <span style="font-size: 14px;">Notification</span>
            </MaBadge>
            <MaBadge value="New" color="success" />
          </div>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaBadge :value="5"&gt;Content&lt;/MaBadge&gt;
&lt;MaBadge dot&gt;Content&lt;/MaBadge&gt;
&lt;MaBadge value="New" color="success" /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Tags">
          <div class="component-demo" style="margin-bottom: 16px;">
            <MaTag>Default</MaTag>
            <MaTag type="primary">Primary</MaTag>
            <MaTag type="success">Success</MaTag>
            <MaTag type="warning">Warning</MaTag>
            <MaTag type="error">Error</MaTag>
            <MaTag type="info">Info</MaTag>
          </div>
          <div class="component-demo" style="margin-bottom: 16px;">
            <MaTag variant="dark">Dark</MaTag>
            <MaTag type="primary" variant="dark">Primary</MaTag>
            <MaTag type="success" variant="dark">Success</MaTag>
            <MaTag type="warning" variant="dark">Warning</MaTag>
          </div>
          <div class="component-demo" style="margin-bottom: 16px;">
            <MaTag variant="outline">Outline</MaTag>
            <MaTag type="primary" variant="outline">Primary</MaTag>
            <MaTag type="success" variant="outline">Success</MaTag>
            <MaTag type="warning" variant="outline">Warning</MaTag>
          </div>
          <div class="component-demo">
            <MaTag size="small">Small</MaTag>
            <MaTag size="medium">Medium</MaTag>
            <MaTag size="large">Large</MaTag>
            <MaTag type="primary" round>Round</MaTag>
            <MaTag type="warning" closable @close="handleTagClose">Closable</MaTag>
          </div>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaTag type="primary"&gt;Tag&lt;/MaTag&gt;
&lt;MaTag variant="outline"&gt;Tag&lt;/MaTag&gt;
&lt;MaTag closable @close="handleClose"&gt;Tag&lt;/MaTag&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Breadcrumb">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <MaBreadcrumb :items="breadcrumbItems" />
            <MaBreadcrumb :items="breadcrumbItems" separator=">" />
            <MaBreadcrumb :items="breadcrumbItems" separator-icon="ArrowRight" />
            <MaBreadcrumb :items="breadcrumbItemsWithIcons" />
          </div>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaBreadcrumb :items="[{ label: 'Home', to: '/' }]" /&gt;
&lt;MaBreadcrumb :items="items" separator=">" /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="24">
        <MaCard title="Tooltips">
          <div class="component-demo">
            <MaTooltip content="Top Tooltip" placement="top">
              <MaButton>Top</MaButton>
            </MaTooltip>
            <MaTooltip content="Bottom Tooltip" placement="bottom">
              <MaButton>Bottom</MaButton>
            </MaTooltip>
            <MaTooltip content="Left Tooltip" placement="left">
              <MaButton>Left</MaButton>
            </MaTooltip>
            <MaTooltip content="Right Tooltip" placement="right">
              <MaButton>Right</MaButton>
            </MaTooltip>
          </div>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaTooltip content="Tooltip text" placement="top"&gt;
  &lt;MaButton&gt;Hover me&lt;/MaButton&gt;
&lt;/MaTooltip&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Select (Pro)">
          <MaSelect 
            v-model="selectedOption" 
            :options="selectOptions" 
            label="Searchable Select" 
            searchable 
            clearable 
            placeholder="Search options..."
          />
          <div style="margin-top: 16px;">
            <MaSelect 
              v-model="multiSelectValue" 
              :options="selectOptions" 
              label="Multi Select" 
              multiple
              searchable
              placeholder="Select multiple..."
            />
          </div>
          <div style="margin-top: 16px;">
            <MaSelect 
              v-model="selectedOption2" 
              :options="selectOptions" 
              label="Standard Select" 
              placeholder="Simple select"
            />
          </div>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaSelect v-model="val" :options="options" /&gt;
&lt;MaSelect v-model="val" :options="options" searchable /&gt;
&lt;MaSelect v-model="val" :options="options" multiple /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Date & Time Pickers">
          <MaDatePicker v-model="date" label="Select Date" />
          <MaDatePicker v-model="dateTimeValue" label="Date & Time (15m step)" show-time :time-step="15" />
          <MaDatePicker v-model="dateRange" label="Date Range" range />
          <MaDatePicker v-model="date" label="Disabled" disabled />
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaDatePicker v-model="date" label="Date" /&gt;
&lt;MaDatePicker v-model="dateTime" show-time :time-step="15" /&gt;
&lt;MaDatePicker v-model="range" range /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Time Picker">
          <MaTimePicker v-model="timeValue" label="Select Time (30m step)" :step="30" />
          <MaTimePicker v-model="timeValue" label="12h Format (15m step)" :step="15" format="12h" />
          <MaTimePicker v-model="timeValue" label="All Minutes" :step="1" />
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaTimePicker v-model="time" :step="30" /&gt;
&lt;MaTimePicker v-model="time" :step="15" format="12h" /&gt;
&lt;MaTimePicker v-model="time" :step="1" /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="File Upload">
          <MaUpload v-model="files" label="Upload Documents" multiple hint="Support for single or bulk upload." />
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaUpload v-model="files" multiple /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Drawer">
          <MaButton @click="drawerVisible = true">Open Drawer</MaButton>
          <MaDrawer v-model="drawerVisible" title="Drawer Title">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <template #footer>
              <MaButton variant="outline" @click="drawerVisible = false">Cancel</MaButton>
              <MaButton @click="drawerVisible = false">Submit</MaButton>
            </template>
          </MaDrawer>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaDrawer v-model="visible" title="Title"&gt;
  Content
&lt;/MaDrawer&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Modals">
          <div class="component-demo">
            <MaButton @click="modalVisible = true">Open Modal</MaButton>
            <MaButton @click="modalSize = 'small'; modalVisible = true">Small</MaButton>
            <MaButton @click="modalSize = 'large'; modalVisible = true">Large</MaButton>
            <MaButton @click="modalSize = 'full'; modalVisible = true">Full</MaButton>
            <MaButton color="danger" @click="showConfirm">Confirm Dialog</MaButton>
          </div>
          <MaModal v-model="modalVisible" title="Modal Title" :size="modalSize">
            <p>This is a {{ modalSize }} modal.</p>
            <p>You can put any content here.</p>
            <template #footer>
              <MaButton variant="outline" @click="modalVisible = false">Cancel</MaButton>
              <MaButton @click="modalVisible = false">Confirm</MaButton>
            </template>
          </MaModal>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaModal v-model="visible" title="Title"&gt;
  Content
&lt;/MaModal&gt;
&lt;MaButton @click="showConfirm"&gt;Confirm&lt;/MaButton&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Skeleton">
          <div class="component-demo" style="flex-direction: column; align-items: flex-start;">
            <MaSkeleton variant="text" width="200px" />
            <MaSkeleton variant="circle" />
            <MaSkeleton variant="rect" width="100%" height="100px" />
          </div>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaSkeleton variant="text" width="200px" /&gt;
&lt;MaSkeleton variant="circle" /&gt;
&lt;MaSkeleton variant="rect" /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Timeline">
          <MaTimeline>
            <MaTimelineItem timestamp="2023-10-01" color="success">
              Created project
            </MaTimelineItem>
            <MaTimelineItem timestamp="2023-10-02" color="primary">
              Committed changes
            </MaTimelineItem>
            <MaTimelineItem timestamp="2023-10-03" color="warning">
              Fixed bugs
            </MaTimelineItem>
            <MaTimelineItem timestamp="2023-10-04" color="gray">
              Released v1.0
            </MaTimelineItem>
          </MaTimeline>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaTimeline&gt;
  &lt;MaTimelineItem timestamp="Date" color="primary"&gt;
    Content
  &lt;/MaTimelineItem&gt;
&lt;/MaTimeline&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="24">
        <MaCard title="Steps">
          <div style="margin-bottom: 24px;">
            <h4 style="margin-bottom: 16px;">Horizontal</h4>
            <MaSteps :active="activeStep">
              <MaStep title="Step 1" description="Create account" :index="0" />
              <MaStep title="Step 2" description="Profile info" :index="1" />
              <MaStep title="Step 3" description="Verification" :index="2" />
            </MaSteps>
          </div>
          
          <div style="margin-bottom: 24px;">
            <h4 style="margin-bottom: 16px;">Simple Mode</h4>
            <MaSteps :active="activeStep" simple>
              <MaStep title="Step 1" :index="0" />
              <MaStep title="Step 2" :index="1" />
              <MaStep title="Step 3" :index="2" />
            </MaSteps>
          </div>

          <div style="margin-bottom: 24px;">
            <h4 style="margin-bottom: 16px;">Error Status</h4>
            <MaSteps :active="1">
              <MaStep title="Finished" :index="0" status="finish" />
              <MaStep title="Error" description="Something went wrong" :index="1" status="error" />
              <MaStep title="Waiting" :index="2" />
            </MaSteps>
          </div>

          <div style="margin-bottom: 16px;">
            <h4 style="margin-bottom: 16px;">Vertical</h4>
            <div style="height: 300px;">
              <MaSteps :active="activeStep" direction="vertical">
                <MaStep title="Step 1" description="Create account" :index="0" />
                <MaStep title="Step 2" description="Profile info" :index="1" />
                <MaStep title="Step 3" description="Verification" :index="2" />
              </MaSteps>
            </div>
          </div>

          <div style="margin-top: 16px;">
            <MaButton @click="nextStep">Next Step</MaButton>
          </div>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaSteps :active="current"&gt;
  &lt;MaStep title="Step 1" /&gt;
  &lt;MaStep title="Step 2" /&gt;
&lt;/MaSteps&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="24">
        <MaCard title="Accordion">
          <MaAccordion v-model="activeAccordion">
            <MaAccordionItem title="Accordion Item 1" name="1">
              Content for item 1
            </MaAccordionItem>
            <MaAccordionItem title="Accordion Item 2" name="2">
              Content for item 2
            </MaAccordionItem>
            <MaAccordionItem title="Accordion Item 3" name="3">
              Content for item 3
            </MaAccordionItem>
          </MaAccordion>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaAccordion v-model="active"&gt;
  &lt;MaAccordionItem title="Title" name="1"&gt;
    Content
  &lt;/MaAccordionItem&gt;
&lt;/MaAccordion&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Pagination">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <h4 style="margin-bottom: 8px;">Basic</h4>
              <MaPagination v-model="currentPage" :total="50" :page-size="10" />
            </div>
            <div>
              <h4 style="margin-bottom: 8px;">Simple</h4>
              <MaPagination v-model="currentPage" :total="50" :page-size="10" simple />
            </div>
            <div>
              <h4 style="margin-bottom: 8px;">Full Features</h4>
              <MaPagination 
                v-model="currentPage" 
                :total="100" 
                :page-size="10" 
                show-total 
                show-size-changer 
                show-quick-jumper 
              />
            </div>
          </div>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaPagination v-model="page" :total="100" /&gt;
&lt;MaPagination v-model="page" :total="100" simple /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Progress">
          <div class="component-demo" style="flex-direction: column; align-items: flex-start; width: 100%;">
            <MaProgress :percentage="30" />
            <MaProgress :percentage="70" color="var(--ma-success)" />
            <div style="display: flex; gap: 16px;">
              <MaProgress type="circle" :percentage="75" />
              <MaProgress type="circle" :percentage="50" color="var(--ma-warning)" />
            </div>
          </div>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaProgress :percentage="30" /&gt;
&lt;MaProgress type="circle" :percentage="75" /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Empty State">
          <MaEmpty />
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaEmpty /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Spinner">
          <div class="component-demo">
            <MaSpinner />
            <MaSpinner color="var(--ma-success)" size="32" />
            <MaSpinner color="var(--ma-danger)" size="48" :thickness="4" />
          </div>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaSpinner /&gt;
&lt;MaSpinner size="32" color="red" /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="24">
        <MaCard title="Statistics">
          <MaRow :gutter="[16, 16]">
            <MaCol :span="6">
              <MaStatistic title="Active Users" :value="112893" />
            </MaCol>
            <MaCol :span="6">
              <MaStatistic title="Account Balance" :value="112893" :precision="2" prefix="$" />
            </MaCol>
            <MaCol :span="6">
              <MaStatistic title="Feedback" :value="1128" suffix="/ 100" />
            </MaCol>
            <MaCol :span="6">
              <MaStatistic title="Growth" value="15.3" suffix="%" :value-style="{ color: 'var(--ma-success)' }" />
            </MaCol>
          </MaRow>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaStatistic title="Title" :value="100" /&gt;
&lt;MaStatistic title="Growth" value="15" suffix="%" /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="24">
        <MaCard title="Form Groups">
          <MaRow :gutter="[24, 24]">
            <MaCol :span="12">
              <MaFormGroup label="Username" required help="Enter your unique username">
                <MaInput placeholder="Username" />
              </MaFormGroup>
              <MaFormGroup label="Email" status="error" error="Invalid email address" required>
                <MaInput placeholder="Email" model-value="invalid-email" />
              </MaFormGroup>
              <MaFormGroup label="Website" status="success" help="Verified">
                <MaInput placeholder="Website" model-value="https://example.com" />
              </MaFormGroup>
            </MaCol>
            <MaCol :span="12">
              <MaFormGroup label="Horizontal Layout" direction="horizontal" label-width="120px" help="This label is on the left">
                <MaInput placeholder="Value" />
              </MaFormGroup>
              <MaFormGroup label="With Select" direction="horizontal" label-width="120px">
                <MaSelect v-model="formSelectValue" :options="selectOptions" placeholder="Select option" />
              </MaFormGroup>
            </MaCol>
          </MaRow>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaFormGroup label="Label" required&gt;
  &lt;MaInput /&gt;
&lt;/MaFormGroup&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="24">
        <MaCard title="Table (Pro)">
          <div style="margin-bottom: 16px; display: flex; gap: 12px;">
            <MaButton size="small" @click="tableLoading = !tableLoading">Toggle Loading</MaButton>
            <MaButton size="small" variant="outline" @click="selectedRows = []">Clear Selection</MaButton>
            <span style="align-self: center; font-size: 0.875rem;">Selected: {{ selectedRows.length }}</span>
          </div>
          <MaTable 
            :columns="tableColumns" 
            :data="tableData" 
            selectable 
            pagination 
            :per-page="5"
            :loading="tableLoading"
            v-model:selected="selectedRows"
            striped
            hover
            sticky-header
            height="400px"
          >
            <template #cell(status)="{ value }">
              <MaTag :type="value === 'Active' ? 'success' : 'error'" size="small">{{ value }}</MaTag>
            </template>
            <template #cell(action)>
              <MaButton size="small" variant="text">Edit</MaButton>
            </template>
          </MaTable>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaTable 
  :columns="columns" 
  :data="data" 
  selectable 
  pagination 
/&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :span="24">
        <MaCard title="Tree (Pro)">
          <MaRow :gutter="[24, 24]">
            <MaCol :span="12">
              <h4>Basic Tree</h4>
              <MaTree 
                :data="treeData" 
                @node-click="(node: any) => console.log('Clicked:', node)"
              />
            </MaCol>
            <MaCol :span="12">
              <h4>Checkable Tree</h4>
              <MaTree 
                :data="treeData" 
                show-checkbox
                :checked-keys="checkedTreeKeys"
                @check-change="(node: any, checked: boolean) => console.log('Check:', node.label, checked)"
              />
            </MaCol>
          </MaRow>
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaTree :data="treeData" show-checkbox /&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>
    </MaRow>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MaConfirm } from 'my-admin-framework'

const date = ref('')
const dateRange = ref(['', ''])
const timeValue = ref('14:30')
const dateTimeValue = ref('')
const inputValue = ref('')
const passwordValue = ref('')
const checkboxValue = ref(false)
const radioValue = ref('1')
const switchValue = ref(false)
const files = ref([])
const drawerVisible = ref(false)
const modalVisible = ref(false)
const modalSize = ref('medium')

const showConfirm = () => {
  MaConfirm({
    title: 'Delete Item?',
    content: 'Are you sure you want to delete this item? This action cannot be undone.',
    type: 'error',
    confirmText: 'Delete',
    onConfirm: () => {
      return new Promise(resolve => setTimeout(resolve, 1000))
    }
  })
}

const activeStep = ref(1)
const activeAccordion = ref('1')
const currentPage = ref(1)
const selectedOption = ref(null)
const selectedOption2 = ref(null)
const formSelectValue = ref(null)
const multiSelectValue = ref([1, 3])

// Table Demo Data
const tableLoading = ref(false)
const selectedRows = ref([])
const tableColumns = [
  { key: 'id', label: 'ID', width: '80px', sortable: true },
  { key: 'name', label: 'Name', sortable: true, filterable: true },
  { key: 'role', label: 'Role', sortable: true, filterable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'action', label: 'Action', width: '100px' }
]
const tableData = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  role: i % 3 === 0 ? 'Admin' : (i % 2 === 0 ? 'Editor' : 'Viewer'),
  status: i % 4 === 0 ? 'Inactive' : 'Active'
}))

const selectOptions = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
  { label: 'Option 4', value: 4 },
  { label: 'Option 5', value: 5 },
  { label: 'Long Option Name Test', value: 6 },
]

const breadcrumbItems = [
  { label: 'Home', to: '/' },
  { label: 'Components', to: '/components' },
  { label: 'Breadcrumb' }
]

const treeData = [
  {
    id: 1,
    label: 'Level 1',
    children: [
      {
        id: 2,
        label: 'Level 2-1',
        children: [
          { id: 3, label: 'Level 3-1' },
          { id: 4, label: 'Level 3-2' }
        ]
      },
      { id: 5, label: 'Level 2-2' }
    ]
  },
  {
    id: 6,
    label: 'Level 1-2',
    children: [
      { id: 7, label: 'Level 2-3' }
    ]
  }
]

const checkedTreeKeys = ref([3, 6])

const breadcrumbItemsWithIcons = [
  { label: 'Home', to: '/', icon: 'Home' },
  { label: 'Components', to: '/components', icon: 'Box' },
  { label: 'Breadcrumb', icon: 'ChevronRight' }
]

const nextStep = () => {
  if (activeStep.value++ > 2) activeStep.value = 0;
}

const handleTagClose = () => {
  console.log('Tag closed')
}
</script>

<style scoped>
.component-demo {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.code-block {
  margin: 0;
  padding: 12px;
  background-color: var(--ma-bg-secondary);
  border-radius: 4px;
  font-size: 0.85rem;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Fira Code', monospace;
  color: var(--ma-text-primary);
}

summary {
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--ma-primary);
  margin-bottom: 8px;
  font-weight: 500;
  user-select: none;
}

summary:hover {
  text-decoration: underline;
}
</style>
