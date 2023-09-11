<template>
  <div>
    <el-form :inline="true" :model="searchForm" ref="searchForm">
      <el-form-item label="名称" prop="label">
        <el-input v-model="searchForm.label" placeholder="请输入名称">
        </el-input>
      </el-form-item>
      <el-form-item label="状态" prop="yn">
        <el-select v-model="searchForm.yn" clearable placeholder="请选择状态" style="weight:130px">
          <el-option v-for="item in ynList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handlReset">重置</el-button>
        <el-button type="primary" @click="handlAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" height="500px" border style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="label" label="名称"> </el-table-column>
      <el-table-column prop="value" label="value"> </el-table-column>
      <el-table-column prop="yn" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.yn" name="yn" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="changeYnSwitch(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="modifierName" label="更新人"></el-table-column>
      <el-table-column prop="modified" label="更新时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination :total="pagination.total" :current-page="pagination.page" :page-sizes="[20, 50, 100, 200]" :page-size="pagination.size" style="margin-top: 8px;" layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import { optionsList, optionsYn } from '@/api/options'

export default {
  name: 'Option',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchForm: {
        label: '',
        type: '',
        yn: '',
        page: 1,
        size: 20
      },
      pagination: {
        // 页码
        page: 1,
        // 每页数据条数
        size: 20,
        // 总数据条数
        total: 0
      },
      ynList: [
        {
          value: '1',
          label: '启用'
        },
        {
          value: '0',
          label: '禁用'
        }
      ],
      tableData: []
    }
  },
  mounted() {
    this.searchForm.type = this.type
    this.handleSearch()
  },
  methods: {
    handleSizeChange(val) {
      this.searchForm.size = val
      this.handleSearch()
    },
    handleCurrentChange(val) {
      this.searchForm.page = val
      this.handleSearch()
    },
    handleSearch() {
      optionsList(this.searchForm).then(data => {
        this.tableData = data.records || []
        this.pagination.total = data.total
      })
    },

    handlReset() {
      this.$refs.searchForm.resetFields()
      this.handleSearch()
    },

    handlAdd() {
      this.$router.push({ path: '/options/optionsAdd', query: { type: this.type } })
    },
    handleEdit(row) {
      this.$router.push({ path: '/options/optionsAdd', query: { type: this.type, id: row.id, label: row.label, value: row.value } })
    },
    handleDelete(row) {
      const data = {
        ids: [row.id],
        status: row.yn
      }
      optionsYn(data)
        .then(data => {
          this.$message.success('操作成功')
          this.handleSearch()
          this.loading = false
        })
        .catch({})
    }
  }
}
</script>

<style>
</style>
