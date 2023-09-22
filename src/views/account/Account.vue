<template>
  <div class="container">
    <el-form :inline="true" :model="searchForm" ref="searchForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="searchForm.name" placeholder="请输入用户名">
        </el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="searchForm.mobile" placeholder="请输入手机号">
        </el-input>
      </el-form-item>
      <el-form-item label="状态" prop="yn">
        <el-select v-model="searchForm.yn" clearable placeholder="请选择状态" style="weight:130px">
          <el-option v-for="item in ynList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理员" prop="admin">
        <el-select v-model="searchForm.admin" clearable placeholder="请选择管理员" style="weight:130px">
          <el-option v-for="item in adminList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn" @click="handleSearch">查询</el-button>
        <el-button type="primary" class="btn" @click="dialogFormVisible = true">注册</el-button>
        <el-button @click="reset" class="btn">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" height="500px" border style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="mobile" label="手机号"> </el-table-column>
      <el-table-column prop="yn" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.yn" name="yn" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="changeYnSwitch(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="admin" label="管理员">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.admin" name="admin" :active-value="true" :inactive-value="false" @change="changeAdminSwitch(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="modifierName" label="更新人"></el-table-column>
      <el-table-column prop="modified" label="更新时间"></el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination :total="pagination.total" :current-page="pagination.page" :page-sizes="[10, 20, 50, 100, 200]" :page-size="pagination.size" style="margin-top: 8px;" layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>

    <el-dialog title="注册" :visible.sync="dialogFormVisible">
      <el-form ref="registForm" :model="registForm" label-width="0px" :rules="registRules">
        <el-form-item prop="name">
          <el-input v-model="registForm.name" placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model="registForm.mobile" placeholder="请输入手机号">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registForm.password" placeholder="请输入密码">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="loading" size="medium" type="primary" @click.native.prevent="handleRegister">
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { accountPage, accountYn, accountAdmin, accountDel, register } from '@/api/user'

export default {
  name: 'Account',
  data() {
    return {
      value1: 1,
      searchForm: {
        name: '',
        mobile: '',
        yn: '',
        admin: '',
        page: 1,
        size: 10
      },
      pagination: {
        // 页码
        page: 1,
        // 每页数据条数
        size: 10,
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
      adminList: [
        {
          value: '1',
          label: '是'
        },
        {
          value: '0',
          label: '否'
        }
      ],

      // 表格数据
      tableData: [],
      dialogFormVisible: false,
      registRules: {
        name: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
        mobile: [{ required: true, trigger: 'blur', message: '手机号不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      loading: false,
      registForm: {
        name: '',
        mobile: '',
        password: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
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
      accountPage(this.searchForm).then(data => {
        this.tableData = data.records || []
        this.pagination.total = data.total
      })
    },

    reset() {
      this.$refs.searchForm.resetFields()
      this.handleSearch()
    },

    del(id) {
      accountDel({ id: id }).then(data => {
        if (data) {
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
        this.handleSearch()
      })
    },
    changeYnSwitch(row) {
      const data = {
        ids: [row.id],
        status: row.yn
      }
      accountYn(data)
        .then(data => {
          this.$message.success('操作成功')
          this.handleSearch()
          this.loading = false
        })
        .catch({})
    },
    changeAdminSwitch(row) {
      const data = {
        ids: [row.id],
        status: row.admin ? 1 : 0
      }
      accountAdmin(data)
        .then(data => {
          this.$message.success('操作成功')
          this.handleSearch()
          this.loading = false
        })
        .catch({})
    },
    handleRegister() {
      this.$refs.registForm.validate(valid => {
        if (valid) {
          this.loading = true
          register(this.registForm)
            .then(data => {
              this.loading = false
              this.dialogFormVisible = false
              if (data) {
                this.$refs.registForm.resetFields()
                this.handleSearch()
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  // margin: 0;
  // margin-top: 10px;
  // margin-right: 10px;
  // font-size: 12px; /* 放大字体 */
  // width: 120px;
  // padding: 20px 20px; /* 放大按钮尺寸，根据需要调整 */
}
</style>
