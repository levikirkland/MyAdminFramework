<template>
  <div class="charts-page">
    <div class="page-header">
      <h1>Charts</h1>
      <p>Visualise your data with our beautiful charts.</p>
    </div>

    <MaRow :gutter="[24, 24]">
      <MaCol :xs="24" :lg="12">
        <MaCard>
          <template #title>Line Chart</template>
          <MaChart
            type="line"
            :height="350"
            :series="lineSeries"
            :categories="months"
          />
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaChart
  type="line"
  :height="350"
  :series="lineSeries"
  :categories="months"
/&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :xs="24" :lg="12">
        <MaCard>
          <template #title>Bar Chart</template>
          <MaChart
            type="bar"
            :height="350"
            :series="barSeries"
            :categories="months"
            :colors="['#16a34a', '#0052cc']"
          />
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaChart
  type="bar"
  :height="350"
  :series="barSeries"
  :categories="months"
  :colors="['#16a34a', '#0052cc']"
/&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :xs="24" :lg="8">
        <MaCard>
          <template #title>Donut Chart</template>
          <MaChart
            type="donut"
            :height="350"
            :series="pieSeries"
            :options="{ labels: ['Desktop', 'Tablet', 'Mobile'] }"
          />
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaChart
  type="donut"
  :height="350"
  :series="pieSeries"
  :options="{ labels: ['Desktop', 'Tablet', 'Mobile'] }"
/&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :xs="24" :lg="8">
        <MaCard>
          <template #title>Pie Chart</template>
          <MaChart
            type="pie"
            :height="350"
            :series="pieSeries"
            :options="{ labels: ['Direct', 'Social', 'Referral'] }"
            :colors="['#dc2626', '#d97706', '#0052cc']"
          />
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaChart
  type="pie"
  :height="350"
  :series="pieSeries"
  :options="{ labels: ['Direct', 'Social', 'Referral'] }"
  :colors="['#dc2626', '#d97706', '#0052cc']"
/&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :xs="24" :lg="8">
        <MaCard>
          <template #title>Radial Bar</template>
          <MaChart
            type="radialBar"
            :height="350"
            :series="[70]"
            :options="{ labels: ['Progress'] }"
          />
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaChart
  type="radialBar"
  :height="350"
  :series="[70]"
  :options="{ labels: ['Progress'] }"
/&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :xs="24">
        <MaCard>
          <template #title>Area Chart</template>
          <MaChart
            type="area"
            :height="350"
            :series="areaSeries"
            :categories="months"
          />
          <template #footer>
            <details>
            <summary>Show Code</summary>
            <pre class="code-block"><code>&lt;MaChart
  type="area"
  :height="350"
  :series="areaSeries"
  :categories="months"
/&gt;</code></pre>
          </details>
          </template>
        </MaCard>
      </MaCol>
    </MaRow>
  </div>
</template>

<script setup lang="ts">
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']

const lineSeries = [
  {
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }
]

const barSeries = [
  {
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  },
  {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  }
]

const pieSeries = [44, 55, 13]

const areaSeries = [
  {
    name: 'North',
    data: [31, 40, 28, 51, 42, 109, 100, 120, 140]
  },
  {
    name: 'South',
    data: [11, 32, 45, 32, 34, 52, 41, 60, 80]
  }
]
</script>

<style scoped>
.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--ma-text-main);
}

.page-header p {
  color: var(--ma-text-muted);
  margin: 0;
}

.code-block {
  background: var(--ma-bg-secondary);
  padding: 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  overflow-x: auto;
  margin: 0;
  color: var(--ma-text-main);
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
