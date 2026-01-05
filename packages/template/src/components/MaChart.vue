<template>
  <div class="ma-chart">
    <apexchart
      :type="type"
      :height="height"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: string;
  height?: number | string;
  series: any[];
  categories?: string[];
  colors?: string[];
}>(), {
  type: 'line',
  height: 350,
  colors: () => ['#0052cc', '#16a34a', '#d97706', '#dc2626']
});

const chartOptions = computed(() => ({
  chart: {
    toolbar: { show: false },
    fontFamily: 'Inter, sans-serif',
    background: 'transparent',
    foreColor: 'var(--ma-text-muted)'
  },
  colors: props.colors,
  stroke: {
    curve: 'smooth',
    width: 3
  },
  xaxis: {
    categories: props.categories,
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toLocaleString()
    }
  },
  grid: {
    borderColor: 'var(--ma-border)',
    strokeDashArray: 4,
    padding: { top: 0, right: 0, bottom: 0, left: 10 }
  },
  tooltip: {
    theme: document.body.classList.contains('dark') ? 'dark' : 'light'
  },
  dataLabels: { enabled: false },
  legend: {
    position: 'top',
    horizontalAlign: 'right'
  }
}));
</script>

<style scoped>
.ma-chart {
  width: 100%;
}
</style>
