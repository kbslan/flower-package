<template>
  <div class="container">
    <el-form :inline="true" :model="searchForm" ref="searchForm">
      <el-form-item label="包花人" prop="packageId">
        <el-select v-model="searchForm.packageId" placeholder="请选择包花人" filterable clearable>
          <el-option :label="item.label" :value="item.value" v-for="item in packages" :key="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采花人" prop="pickerId">
        <el-select v-model="searchForm.pickerId" placeholder="请选择采花人" filterable clearable>
          <el-option :label="item.label" :value="item.value" v-for="item in pickers" :key="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品种" prop="categoryId">
        <el-select v-model="searchForm.categoryId" placeholder="请选择品种" filterable clearable>
          <el-option :label="item.label" :value="item.value" v-for="item in categorys" :key="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格" prop="specificationId">
        <el-select v-model="searchForm.specificationId" placeholder="请选择规格" filterable clearable>
          <el-option :label="item.label" :value="item.value" v-for="item in specifications" :key="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报损原因" prop="damageReasonId">
        <el-select v-model="searchForm.damageReasonId" placeholder="请选择报损原因" filterable clearable>
          <el-option :label="item.label" :value="item.value" v-for="item in damageReasons" :key="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch" size="medium">查询</el-button>
        <el-button @click="reset" size="medium">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add" size="medium">新增包花记录</el-button>
        <el-button type="primary" @click="submitLocal" v-if="tab==='local'" size="medium">提交本地数据</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" height="500px" border style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="packageId" label="包花人" :formatter="formatPackage"> </el-table-column>
      <el-table-column prop="pickerId" label="采花人" :formatter="formatPicker"> </el-table-column>
      <el-table-column prop="categoryId" label="品种" :formatter="formatCategory"> </el-table-column>
      <el-table-column prop="specificationId" label="规格" :formatter="formatSpecification"></el-table-column>
      <el-table-column prop="packageAmount" label="包花数量"> </el-table-column>
      <el-table-column prop="damageAmount" label="报损数量"></el-table-column>
      <el-table-column prop="damageReasonId" label="损坏原因" :formatter="formatDamageReason"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <div class="action-buttons">
            <el-button type="text" size="medium" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.id)">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination :total="pagination.total" :current-page="pagination.page" :page-sizes="[20, 50, 100, 200]" :page-size="pagination.size" style="margin-top: 8px;" layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import localStorageManager from '@/utils/localFlowerRecord'
import Config from '@/settings'
import { flowerList, flowerBatchSave, flowerDel } from '@/api/flower'

export default {
  name: 'FlowerTab',
  props: {
    tab: {
      type: String, // 数据类型
      required: true // 是否必需
    },
    packages: {
      type: Array,
      require: true
    },
    pickers: {
      type: Array,
      require: true
    },
    categorys: {
      type: Array,
      require: true
    },
    specifications: {
      type: Array,
      require: true
    },
    damageReasons: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      searchForm: {
        packageId: '',
        pickerId: '',
        categoryId: '',
        specificationId: '',
        damageReasonId: '',
        page: 1,
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
  mounted() {
    this.userId = this.$store.state.user.user.id
    this.username = this.$store.state.user.user.name
    if (this.packages && this.packages.length === 1) {
      this.searchForm.packageId = this.packages[0].value
    }
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
      if (this.tab === 'local') {
        const key = Config.FlowRecordKey + this.userId
        this.tableData = localStorageManager.queryPage(key, this.searchForm.page, this.searchForm.size, this.searchForm)
        this.pagination.total = localStorageManager.count(key)
      } else {
        flowerList(this.searchForm).then(data => {
          this.tableData = data.records || []
          this.pagination.total = data.total
        })
      }
    },

    reset() {
      this.$refs.searchForm.resetFields()
      this.handleSearch()
    },

    add() {
      this.$router.push({ path: '/flower/flowerAdd', query: { tab: this.tab } })
    },
    submitLocal() {
      const records = localStorageManager.queryAll(Config.FlowRecordKey + this.userId)
      if (!records || records.length === 0) {
        this.$message.error('没有数据可以提交')
        return
      }
      records.map(it => delete it.id)
      flowerBatchSave(records).then(data => {
        if (data) {
          localStorageManager.clear(Config.FlowRecordKey + this.userId)
          localStorageManager.clear(Config.NextSeqKey + this.userId)
          this.handleSearch()
          this.$message.success('数据提交成功')
        } else {
          this.$message.error('服务端保存异常')
        }
      })
    },
    formatPackage(row) {
      let result = '-'
      this.packages.some(item => {
        if (item.value === row.packageId) {
          result = item.label
          return true
        }
        return false
      })
      return result
    },
    formatPicker(row) {
      let result = '-'
      this.pickers.some(item => {
        if (item.value === row.pickerId) {
          result = item.label
          return true
        }
        return false
      })
      return result
    },
    formatCategory(row) {
      let result = '-'
      this.categorys.some(item => {
        if (item.value === row.categoryId) {
          result = item.label
          return true
        }
        return false
      })
      return result
    },
    formatSpecification(row) {
      let result = '-'
      this.specifications.some(item => {
        if (item.value === row.specificationId) {
          result = item.label
          return true
        }
        return false
      })
      return result
    },
    formatDamageReason(row) {
      let result = '-'
      this.damageReasons.some(item => {
        if (item.value === row.damageReasonId) {
          result = item.label
          return true
        }
        return false
      })
      return result
    },
    handleEdit(row) {
      this.$router.push({ path: '/flower/flowerAdd', query: { tab: this.tab, flower: row } })
    },
    handleDelete(row) {
      if (this.tab === 'local') {
        const key = Config.FlowRecordKey + this.userId
        const allRecords = localStorageManager.queryAll(key)
        allRecords.forEach((val, i) => {
          if (val.id === row.id) {
            // 删除
            allRecords.splice(i, 1)
          }
        })
        localStorageManager.save(key, allRecords)
        this.handleSearch()
      } else {
        flowerDel({ ids: row.id }).then(data => {
          if (data) {
            this.$message.success('数据删除成功')
            this.handleSearch()
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;

  .action-buttons {
    display: flex; /* 使用 Flex 布局，将按钮水平排列 */
    justify-content: space-between; /* 在容器内平均分布按钮 */
    // width: 150px; /* 调整容器宽度，根据按钮数量和宽度自行调整 */
  }
}
</style>
