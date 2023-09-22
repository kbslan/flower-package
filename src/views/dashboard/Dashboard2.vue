<template>
  <div>
    <!-- 数据展示卡片 -->
    <el-card>
      <div class="data-summary">
        <!-- 数据汇总 -->
        <div class="summary-item">
          <span class="title">总销售额</span>
          <span class="value">$1,000,000</span>
        </div>
        <!-- 更多汇总项 -->
      </div>
    </el-card>

    <!-- 图表展示 -->
    <el-card>
      <div class="chart-container">
        <!-- 使用图表组件展示数据 -->
        <el-chart :options="chartOptions"></el-chart>
      </div>
    </el-card>

    <!-- 数据表格 -->
    <el-card>
      <div class="data-table">
        <!-- 使用表格组件展示数据 -->
        <el-table :data="tableData" style="width: 100%">
          <!-- 表格列配置 -->
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sales" label="销售额"></el-table-column>
          <!-- 更多列配置 -->
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        // 图表配置
        // 例如，ECharts 或 Chart.js 的配置项
      },
      tableData: [
        // 表格数据
        { name: 'Alice', sales: 10000 },
        { name: 'Bob', sales: 12000 }
        // 更多数据项
      ]
    }
  }
}
</script>

<style>
/* 样式定制 */
.data-summary {
  display: flex;
  justify-content: space-between;
  /* 更多样式配置 */
}

.summary-item {
  text-align: center;
  /* 更多样式配置 */
}

.chart-container {
  height: 400px;
  /* 更多样式配置 */
}

.data-table {
  /* 更多样式配置 */
}
</style>
