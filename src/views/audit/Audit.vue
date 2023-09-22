<template>
  <div class="container">
    <el-form :inline="true" :model="searchForm" ref="searchForm">
      <el-form-item label="状态" prop="yn">
        <el-select v-model="searchForm.yn" clearable placeholder="请选择状态">
          <el-option v-for="item in ynList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
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
      <el-form-item label="时间范围" prop="damageReasonId">
        <el-date-picker v-model="created" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" size="large" value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch" size="medium">查询</el-button>
        <el-button @click="reset" size="medium">重置</el-button>
      </el-form-item>
      <p>{{searchForm.dateRange}}</p>
      <el-form-item>
        <el-button type="primary" @click="exportFlower" size="medium">导出包花记录</el-button>
        <el-button type="primary" @click="exportDamage" size="medium">导出报损记录</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" height="400px" border style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="packageId" label="包花人" :formatter="formatPackage" min-width='120'> </el-table-column>
      <el-table-column prop="pickerId" label="采花人" :formatter="formatPicker" min-width='120'> </el-table-column>
      <el-table-column prop="categoryId" label="品种" :formatter="formatCategory" min-width='120'> </el-table-column>
      <el-table-column prop="specificationId" label="规格" :formatter="formatSpecification" min-width='80'></el-table-column>
      <el-table-column prop="packageAmount" label="包花数量" min-width='80'> </el-table-column>
      <el-table-column prop="yn" label="状态" :formatter="formatYn" min-width='50'></el-table-column>
      <el-table-column prop="damageAmount" label="报损数量" min-width='80'></el-table-column>
      <el-table-column prop="damageReasonId" label="损坏原因" :formatter="formatDamageReason" min-width='80'></el-table-column>
      <el-table-column prop="remark" label="评价内容" min-width='150'></el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="medium" @click="handleAudit(scope.row)" v-if="scope.row.yn === 0">通过</el-button>
            <el-button type="text" size="medium" @click="openDialog(scope.row)">评价</el-button>
          </div>
          <div>
            <el-button type="text" size="medium" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="medium" @click="handleDelete(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <div class="action-buttons">
            <el-button type="text" size="medium" @click="handleAudit(scope.row)" v-if="scope.row.yn === 0">通过</el-button>
            <el-button type="text" size="medium" @click="openDialog(scope.row)">评价</el-button>
            <el-button type="text" size="medium" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row)">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination :total="pagination.total" :current-page="pagination.page" :page-sizes="[20, 50, 100, 200]" :page-size="pagination.size" style="margin-top: 8px;" layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>

    <el-dialog title="评价" :visible.sync="dialogFormVisible">
      <el-form ref="remarkForm" label-width="0px">
        <el-form-item prop="remarkContent">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="remarkContent">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="medium" @click.native.prevent="handleRemark">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import localStorageManager from '@/utils/localFlowerRecord'
import Config from '@/settings'
import { flowerList, flowerDel, flowerAudit, flowerRemark } from '@/api/flower'
import { optionsList } from '@/api/options'
import { exportFlower, exportDamage } from '@/api/exportdata'
import dayjs from 'dayjs'

export default {
  name: 'Audit',
  data() {
    return {
      ynList: [
        {
          value: 1,
          label: '通过'
        },
        {
          value: 0,
          label: '提报'
        }
      ],
      created: [dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'), dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')], // 设置默认日期范围值为当前日期的范围
      searchForm: {
        packageId: '',
        pickerId: '',
        categoryId: '',
        specificationId: '',
        damageReasonId: '',
        start: undefined,
        end: undefined,
        yn: 0,
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
      tableData: [],
      dialogFormVisible: false,
      remarkFlowerId: undefined,
      remarkContent: undefined
    }
  },
  created() {
    // 采花人
    optionsList({ type: 'flower_picker', yn: 1 }).then(data => {
      const records = data.records || []
      const pickers = records.map(item => ({
        label: item.label,
        value: item.id
      }))
      localStorageManager.save(Config.PickersKey, pickers)
    })
    // 品种
    optionsList({ type: 'flower_category', yn: 1 }).then(data => {
      const records = data.records || []
      const categorys = records.map(item => ({
        label: item.label,
        value: item.id
      }))
      localStorageManager.save(Config.CategorysKey, categorys)
    })
    // 规格
    optionsList({ type: 'flower_specification', yn: 1 }).then(data => {
      const records = data.records || []
      const specifications = records.map(item => ({
        label: item.label,
        value: item.id
      }))
      localStorageManager.save(Config.SpecificationsKey, specifications)
    })
    // 报损原因
    optionsList({ type: 'flower_damage_reason', yn: 1 }).then(data => {
      const records = data.records || []
      const damageReasons = records.map(item => ({
        label: item.label,
        value: item.id
      }))
      localStorageManager.save(Config.DamageReasonsKey, damageReasons)
    })
    this.packages = localStorageManager.queryAll(Config.PackagesKey)
    this.pickers = localStorageManager.queryAll(Config.PickersKey)
    this.categorys = localStorageManager.queryAll(Config.CategorysKey)
    this.specifications = localStorageManager.queryAll(Config.SpecificationsKey)
    this.damageReasons = localStorageManager.queryAll(Config.DamageReasonsKey)
  },
  mounted() {
    this.userId = this.$store.state.user.user.id
    this.username = this.$store.state.user.user.name
    this.setContent()
    this.handleSearch()
  },
  methods: {
    setContent() {
      const title = this.$route.meta.title
      this.$store.dispatch('SetContent', title)
    },
    handleSizeChange(val) {
      this.searchForm.size = val
      this.handleSearch()
    },
    handleCurrentChange(val) {
      this.searchForm.page = val
      this.handleSearch()
    },
    handleSearch() {
      if (this.created && this.created[0] && this.created[1]) {
        this.searchForm.start = this.created[0]
        this.searchForm.end = this.created[1]
      }
      flowerList(this.searchForm)
        .then(data => {
          this.tableData = data.records || []
          this.pagination.total = data.total
        })
        .catch(() => {})
    },

    reset() {
      this.$refs.searchForm.resetFields()
      this.handleSearch()
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
    formatYn(row) {
      let result = '-'
      this.ynList.some(item => {
        if (item.value === row.yn) {
          result = item.label
          return true
        }
        return false
      })
      return result
    },
    handleEdit(row) {
      this.$router.push({ path: '/flower/flowerAdd', query: { tab: 'server', flower: row } })
    },
    handleDelete(row) {
      flowerDel({ ids: row.id })
        .then(data => {
          if (data) {
            this.$message.success('数据删除成功')
            this.handleSearch()
          }
        })
        .catch(() => {})
    },
    handleAudit(row) {
      flowerAudit({ id: row.id })
        .then(data => {
          if (data) {
            this.$message.success('审核成功')
            this.handleSearch()
          }
        })
        .catch(() => {})
    },

    openDialog(row) {
      this.dialogFormVisible = true
      this.remarkFlowerId = row.id
      this.remarkContent = ''
    },
    handleRemark(row) {
      flowerRemark({ id: this.remarkFlowerId, remark: this.remarkContent })
        .then(data => {
          this.dialogFormVisible = false
          if (data) {
            this.handleSearch()
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    exportFlower() {
      if (this.created && this.created[0] && this.created[1]) {
        this.searchForm.start = this.created[0]
        this.searchForm.end = this.created[1]
      }
      exportFlower(this.searchForm)
    },
    exportDamage() {
      if (this.created && this.created[0] && this.created[1]) {
        this.searchForm.start = this.created[0]
        this.searchForm.end = this.created[1]
      }
      exportDamage(this.searchForm)
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
