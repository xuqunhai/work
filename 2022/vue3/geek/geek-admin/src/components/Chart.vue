<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted } from 'vue'
// 通过ref获得DOM
let chartRef = ref()
let myChart
onUnmounted(() => {
  myChart.dispose()
  myChart = null
})
onMounted(() => {
  myChart = echarts.init(chartRef.value)
  const option = {
    tooltip: {
      trigger: 'item'
    },
    color: ['#ffd666', '#ffa39e', '#409EFF'],
    // 饼图数据配置
    series: [
      {
        name: '前端课程',
        type: 'pie',
        radius: '70%',
        data: [
          { value: 43340, name: '重学前端' },
          { value: 7003, name: 'Javascript核心原理解析' },
          { value: 4314, name: '玩转Vue3全家桶' }
        ]
      }
    ]
  }
  myChart.setOption(option)
})
</script>

<style>
.chart {
  width: 300px;
  height: 300px;
}
</style>
