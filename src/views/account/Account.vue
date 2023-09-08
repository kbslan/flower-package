<template>
  <div class="container">
    <el-form :inline="true" :model="searchForm" ref="searchForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="searchForm.name" placeholder="请输入姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="searchForm.mobile" placeholder="请输入手机号">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" height="500px" border style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="mobile" label="手机号"> </el-table-column>
      <el-table-column prop="admin" label="是否是管理员">
        <template slot-scope="scope">
          {{ scope.row.admin ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { accountDel } from '@/api/user'
export default {
  name: 'Account',
  data () {
    return {
      searchForm: {
        name: '',
        mobile: '',
        yn: 1,
        page: 1,
        size: 10
      },
      tableData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      this.searchForm.size = val
      this.handleSearch()
    },
    handleCurrentChange (val) {
      this.searchForm.page = val
      this.handleSearch()
    },
    handleSearch () {
      this.tableData = [
        {
          id: 1, // 账号ID
          name: '包花员1', // 昵称
          mobile: '18302805247', // 手机号
          admin: true, // 是否是管理员
          password: '1234567', // 密码
          yn: 1, // 状态
          created: '2023-05-20T20:36:00', // 创建时间
          modified: '2023-05-21T01:35:06', // 修改时间
          salt: '', // 盐
          permission: null // 权限
        }
      ]
    },

    reset () {
      this.$refs.searchForm.resetFields()
      this.handleSearch()
    },

    del (id) {
      accountDel({ ids: id }).then(() => {
        this.$message.success('删除成功')
        this.handleSearch()
      })
    }
  }
}

</script>

<style lang="less" scoped></style>
