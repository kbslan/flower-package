<template>
  <div class="container">
    <el-form :inline="true" :model="searchForm" ref="searchForm">
      <el-form-item label="包花人" prop="bagId">
        <el-select v-model="searchForm.bagId" placeholder="请选择" filterable clearable>
          <el-option label="兰超" :value="1"> </el-option>
          <el-option label="尚志强" :value="2"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采花人" prop="pickerId">
        <el-select v-model="searchForm.pickerId" placeholder="请选择" filterable clearable>
          <el-option label="采花人A" :value="1"> </el-option>
          <el-option label="采花人B" :value="2"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品种" prop="categoryId">
        <el-select v-model="searchForm.categoryId" placeholder="请选择" filterable clearable>
          <el-option label="玫瑰" :value="1"> </el-option>
          <el-option label="菊花" :value="2"> </el-option>
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
      <el-table-column prop="specificationId" label="规格"></el-table-column>
      <el-table-column prop="damageReasonId" label="损坏原因"></el-table-column>
      <el-table-column prop="bagAmount" label="包花数量"> </el-table-column>
      <el-table-column prop="damageAmount" label="报损数量"></el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination :total="pagination.total" :current-page="pagination.page" :page-sizes="[20, 50, 100, 200]" :page-size="pagination.size" style="margin-top: 8px;" layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import { createBagFlowerRecord } from '@/views/flower/BagFlowerRecord'

export default {
  name: 'FlowerTab',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchForm: {
        bagId: '',
        pickerId: '',
        categoryId: '',
        specificationId: '',
        current: 1,
        size: 10
      },
      pagination: {
        // 页码
        page: 1,
        // 每页数据条数
        size: 20,
        // 总数据条数
        total: 0
      },
      tableData: []
    }
  },
  methods: {
    handleClick(tab) {
      this.tab = tab.name
    },
    handleSizeChange(val) {
      this.searchForm.size = val
      this.handleSearch()
    },
    handleCurrentChange(val) {
      this.searchForm.current = val
      this.handleSearch()
    },
    handleSearch() {
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
        },
        {
          id: 1,
          bagId: '兰超',
          pickerId: '尚志强',
          categoryId: '兰花',
          specificationId: '5',
          damageReasonId: 'xxx',
          bagAmount: 10,
          damageAmount: 2
        },
        {
          id: 1,
          bagId: '兰超',
          pickerId: '尚志强',
          categoryId: '兰花',
          specificationId: '5',
          damageReasonId: 'xxx',
          bagAmount: 10,
          damageAmount: 2
        },
        {
          id: 1,
          bagId: '兰超',
          pickerId: '尚志强',
          categoryId: '兰花',
          specificationId: '5',
          damageReasonId: 'xxx',
          bagAmount: 10,
          damageAmount: 2
        },
        {
          id: 1,
          bagId: '兰超',
          pickerId: '尚志强',
          categoryId: '兰花',
          specificationId: '5',
          damageReasonId: 'xxx',
          bagAmount: 10,
          damageAmount: 2
        },
        {
          id: 1,
          bagId: '兰超',
          pickerId: '尚志强',
          categoryId: '兰花',
          specificationId: '5',
          damageReasonId: 'xxx',
          bagAmount: 10,
          damageAmount: 2
        },
        {
          id: 1,
          bagId: '兰超',
          pickerId: '尚志强',
          categoryId: '兰花',
          specificationId: '5',
          damageReasonId: 'xxx',
          bagAmount: 10,
          damageAmount: 2
        },
        {
          id: 1,
          bagId: '兰超',
          pickerId: '尚志强',
          categoryId: '兰花',
          specificationId: '5',
          damageReasonId: 'xxx',
          bagAmount: 10,
          damageAmount: 2
        },
        {
          id: 1,
          bagId: '兰超',
          pickerId: '尚志强',
          categoryId: '兰花',
          specificationId: '5',
          damageReasonId: 'xxx',
          bagAmount: 10,
          damageAmount: 2
        },
        {
          id: 1,
          bagId: '兰超',
          pickerId: '尚志强',
          categoryId: '兰花',
          specificationId: '5',
          damageReasonId: 'xxx',
          bagAmount: 10,
          damageAmount: 2
        },
        {
          id: 1,
          bagId: '兰超',
          pickerId: '尚志强',
          categoryId: '兰花',
          specificationId: '5',
          damageReasonId: 'xxx',
          bagAmount: 10,
          damageAmount: 2
        },
        {
          id: 1,
          bagId: '兰超',
          pickerId: '尚志强',
          categoryId: '兰花',
          specificationId: '5',
          damageReasonId: 'xxx',
          bagAmount: 10,
          damageAmount: 2
        },
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

    reset() {
      this.$refs.searchForm.resetFields()
      this.handleSearch()
    },

    add() {
      this.$router.push('/flower/flowerAdd')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
</style>
