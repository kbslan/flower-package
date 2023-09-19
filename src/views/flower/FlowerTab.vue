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
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="add">新增包花记录</el-button>
      <el-button type="primary" @click="submitLocal" v-if="tab==='local'">提交本地数据</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" height="500px" border style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="packageId" label="包花人" :formatter="formatPackage"> </el-table-column>
      <el-table-column prop="pickerId" label="采花人" :formatter="formatPicker"> </el-table-column>
      <el-table-column prop="categoryId" label="品种" :formatter="formatCategory"> </el-table-column>
      <el-table-column prop="specificationId" label="规格" :formatter="formatSpecification"></el-table-column>
      <el-table-column prop="damageReasonId" label="损坏原因" :formatter="formatDamageReason"></el-table-column>
      <el-table-column prop="packageAmount" label="包花数量"> </el-table-column>
      <el-table-column prop="damageAmount" label="报损数量"></el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination :total="pagination.total" :current-page="pagination.page" :page-sizes="[20, 50, 100, 200]" :page-size="pagination.size" style="margin-top: 8px;" layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import localStorageManager from '@/utils/localFlowerRecord'
import Config from '@/settings'
import { flowerList, flowerBatchSave } from '@/api/flower'

export default {
  name: 'FlowerTab',
  props: {
    tab: {
      type: String, // 数据类型
      required: true // 是否必需
    },
    packages: {
      type: Array,
      require: true,
      validator(value) {
        return value.length > 0
      }
    },
    pickers: {
      type: Array,
      require: true,
      validator(value) {
        return value.length > 0
      }
    },
    categorys: {
      type: Array,
      require: true,
      validator(value) {
        return value.length > 0
      }
    },
    specifications: {
      type: Array,
      require: true,
      validator(value) {
        return value.length > 0
      }
    },
    damageReasons: {
      type: Array,
      require: true,
      validator(value) {
        return value.length > 0
      }
    }
  },
  data() {
    return {
      searchForm: {
        packageId: '',
        pickerId: '',
        categoryId: '',
        specificationId: '',
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
        this.tableData = localStorageManager.queryPage(key, this.searchForm.page, this.searchForm.size)
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
      console.log('本地数据提交')
      const records = localStorageManager.queryAll(Config.FlowRecordKey + this.userId)
      if (!records || records.length === 0) {
        this.$message.error('没有数据可以提交')
        return
      }
      records.map(it => delete it.id)
      flowerBatchSave(records).then(data => {
        debugger
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
      })
      return result
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
</style>
