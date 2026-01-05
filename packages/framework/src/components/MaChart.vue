<template>
  <div class="ma-chart">
    <apexchart
      :type="type"
      :height="height"
      :options="mergedOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// Register the component locally if not globally registered
const apexchart = VueApexCharts

interface ChartProps {
  type?: "area" | "line" | "bar" | "histogram" | "pie" | "donut" | "radialBar" | "rangeBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "radar" | "polarArea";
  height?: number | string;
  series: any[];
  options?: any;
  categories?: string[];
  colors?: string[];
}

const props = withDefaults(defineProps<ChartProps>(), {
  type: 'line',
  height: 350,
  colors: () => ['#0052cc', '#16a34a', '#d97706', '#dc2626']
});

const defaultOptions = {
  chart: {
    toolbar: { show: false },
    fontFamily: 'inherit',
    background: 'transparent',
    foreColor: 'var(--ma-text-secondary, #64748b)'
  },
  colors: props.colors,
  stroke: {
    curve: 'smooth',
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: props.categories || [],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: 'var(--ma-text-secondary, #64748b)'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: 'var(--ma-text-secondary, #64748b)'
      }
    }
  },
  grid: {
    borderColor: 'var(--ma-border, #e2e8f0)',
    strokeDashArray: 4,
    xaxis: {
      lines: {
        show: true
      }
    }
  },
  theme: {
    mode: 'light' // Can be dynamic based on theme
  }
}

const mergedOptions = computed(() => {
  return {
    ...defaultOptions,
    ...props.options,
    xaxis: {
      ...defaultOptions.xaxis,
      ...(props.options?.xaxis || {}),
      categories: props.categories || props.options?.xaxis?.categories || []
    },
    colors: props.colors || props.options?.colors
  }
})
</script>

<style scoped>
.ma-chart {
  width: 100%;
  min-height: 350px;
}
</style>
