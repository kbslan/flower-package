<template>
  <div>
    <div id="echarts-bar" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      chartData: {
        categories: ['洛神', '蜜桃雪山', '粉红雪山', '海洋之谜', '梦境', '王熙凤'],
        seriesData1: [320, 302, 341, 374, 390, 450],
        seriesData2: [-120, -132, -101, -134, -190, -230]
      }
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const chart = echarts.init(document.getElementById('echarts-bar'))
      // 在这里粘贴您的图表配置选项
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['报损数量', '包花数量']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: this.chartData.categories // 使用组件的数据属性
          }
        ],
        series: [
          {
            name: '包花数量',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: this.chartData.seriesData1 // 使用组件的数据属性
          },
          {
            name: '报损数量',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'left'
            },
            emphasis: {
              focus: 'series'
            },
            data: this.chartData.seriesData2 // 使用组件的数据属性
          }
        ]
      }

      chart.setOption(option)
    }
  }
}
</script>
