<template>
  <div class="container">
    <el-tabs v-model="tab" @tab-click="handleClick">
      <el-tab-pane label="本地缓存" name="local">
        <el-form :inline="true" :model="searchForm" ref="searchForm">
          <el-form-item label="包花人" prop="bagId">
            <el-select
              v-model="searchForm.bagId"
              placeholder="请选择"
              filterable
              clearable
            >
              <el-option label="兰超" :value="1"> </el-option>
              <el-option label="尚志强" :value="2"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采花人" prop="pickerId">
            <el-select
              v-model="searchForm.pickerId"
              placeholder="请选择"
              filterable
              clearable
            >
              <el-option label="兰超" :value="1"> </el-option>
              <el-option label="尚志强" :value="2"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <el-row>
          <el-button type="primary" @click="add">新增包花记录</el-button>
        </el-row>
        <el-table :data="tableData" height="500px" border style="width: 100%">
          <el-table-column prop="id" label="ID"> </el-table-column>
          <el-table-column prop="bagId" label="包花人"> </el-table-column>
          <el-table-column prop="pickerId" label="采花人"> </el-table-column>
          <el-table-column prop="categoryId" label="品种"> </el-table-column>
          <el-table-column prop="specificationId" label="规格">
          </el-table-column>
          <el-table-column prop="damageReasonId" label="损坏原因">
          </el-table-column>
          <el-table-column prop="bagAmount" label="包花数量"> </el-table-column>
          <el-table-column prop="damageAmount" label="报损数量">
          </el-table-column>
        </el-table>
        <el-pagination
          background
          style="text-align: right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="searchForm.current"
          :page-size="searchForm.size"
          layout="total, prev, next"
          :total="1000"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="远端数据" name="server">远端数据</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Flower',
  data () {
    return {
      tab: 'local',
      searchForm: {
        bagId: '',
        pickerId: '',
        categoryId: '',
        specificationId: '',
        current: 1,
        size: 10
      },
      tableData: []
    }
  },
  methods: {
    handleClick (tab) {
      this.tab = tab.name
    },
    handleSizeChange (val) {
      this.searchForm.size = val
      this.handleSearch()
    },
    handleCurrentChange (val) {
      this.searchForm.current = val
      this.handleSearch()
    },
    handleSearch () {
      this.tableData = [
        {
          id: 1,
          bagId: '兰超',
          pickerId: '尚志强',
          categoryId: '兰花',
          specificationId: '5',
          damageReasonId: 'xxx',
          bagAmount: 10,
          damageAmount: 2
        }
      ]
    },

    reset () {
      this.$refs.searchForm.resetFields()
      this.handleSearch()
    },

    add () {
      this.$router.push('/flowerAdd')
    }
  }
}

</script>

<style lang="less" scoped>
.container {
  padding: 20px
}
</style>
