<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>一个月内基础数据统计</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <div  class="text item">
          <el-row :gutter="20">
            <el-col :span="6">
              <div>
                <el-statistic
                  title="包花数量/报损数量">
                  <template slot="prefix">
                    <i class="el-icon-s-flag" style="color: blue"></i>
                  </template>
                  <template slot="formatter">
                    {{ barDatas.flowerPerDamage }}
                  </template>
                  <template slot="suffix">
                    <i class="el-icon-s-flag" style="color: green"></i>
                  </template>
                </el-statistic>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-statistic
                  title="品种数量"
                  group-separator=","
                  :precision="0"
                  :value="barDatas.categoryAmount"
                ></el-statistic>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-statistic
                  title="报损原因数量"
                  group-separator=","
                  :precision="0"
                  :value="barDatas.damageReasonAmount"
                ></el-statistic>
              </div>
            </el-col>
          </el-row>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span>一个月内品种包花数量和报损数量统计</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
      <div id="echarts-bar" style="width: 100%; height: 400px;"></div>
    </el-card>

  </div>
</template>

<script>
import * as echarts from 'echarts'
import { barStatistics } from '@/api/statistics'

export default {
  data() {
    return {
      chart: null,
      barDatas: {
        flowerPerDamage: '452/3',
        categoryAmount: 10,
        damageReasonAmount: 2,
        categories: ['洛神', '蜜桃雪山', '粉红雪山', '海洋之谜', '梦境', '王熙凤'],
        packageAmounts: [320, 302, 341, 374, 390, 450],
        damageAmounts: [-120, -132, -101, -134, -190, -230]
      }
    }
  },
  created() {

  },
  mounted() {
    barStatistics().then(data => {
      this.barDatas.flowerPerDamage = data.flowerPerDamage
      this.barDatas.categoryAmount = data.categoryAmount
      this.barDatas.damageReasonAmount = data.damageReasonAmount
      this.barDatas.categories = data.categories
      this.barDatas.packageAmounts = data.packageAmounts
      this.barDatas.damageAmounts = data.damageAmounts
      this.renderChart()
    }).catch(() => {})
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    renderChart() {
      this.chart = echarts.init(document.getElementById('echarts-bar'))
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
            data: this.barDatas.categories // 使用组件的数据属性
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
            data: this.barDatas.packageAmounts // 使用组件的数据属性
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
            data: this.barDatas.damageAmounts // 使用组件的数据属性
          }
        ]
      }

      this.chart.setOption(option)
    }
  }
}
</script>
