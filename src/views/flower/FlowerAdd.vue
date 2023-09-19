<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="包花人">
        <el-select v-model="form.packageId" placeholder="请选择包花人" filterable clearable>
          <el-option :label="item.label" :value="item.value" v-for="item in packages" :key="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采花人" prop="pickerId">
        <el-select v-model="form.pickerId" placeholder="请选择采花人" filterable clearable>
          <el-option :label="item.label" :value="item.value" v-for="item in pickers" :key="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品种" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="请选择品种" filterable clearable>
          <el-option :label="item.label" :value="item.value" v-for="item in categorys" :key="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格" prop="specificationId">
        <el-select v-model="form.specificationId" placeholder="请选择品种" filterable clearable>
          <el-option :label="item.label" :value="item.value" v-for="item in specifications" :key="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="包花数量" prop="packageAmount">
        <el-input-number v-model="form.packageAmount" :min="1" :precision="0"></el-input-number>
      </el-form-item>
      <el-form-item label="报损原因" prop="damageReasonId">
        <el-select v-model="form.damageReasonId" placeholder="请选择报损原因" filterable clearable>
          <el-option :label="item.label" :value="item.value" v-for="item in damageReasons" :key="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报损数量" prop="damageAmount">
        <el-input-number v-model="form.damageAmount" :min="0" :precision="0"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import localStorageManager from '@/utils/localFlowerRecord'
import Config from '@/settings'
import createFlowerRecord from '@/views/flower/FlowerRecord'

export default {
  name: 'FlowerAdd',
  created() {
    this.packages = localStorageManager.queryAll(Config.PackagesKey)
    this.pickers = localStorageManager.queryAll(Config.PickersKey)
    this.categorys = localStorageManager.queryAll(Config.CategorysKey)
    this.specifications = localStorageManager.queryAll(Config.SpecificationsKey)
    this.damageReasons = localStorageManager.queryAll(Config.DamageReasonsKey)
    this.tab = this.$route.query.tab
  },
  data() {
    return {
      tab: '',
      userId: '',
      username: '',
      form: {
        packageId: '',
        pickerId: '',
        categoryId: '',
        specificationId: '',
        packageAmount: 1,
        damageReasonId: undefined,
        damageAmount: 0
      },
      rules: {
        packageId: [{ required: true, message: '请选择包花人', trigger: 'blur' }],
        pickerId: [{ required: true, message: '请选择采花人', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择品种', trigger: 'blur' }],
        specificationId: [{ required: true, message: '请选择规格', trigger: 'blur' }],
        packageAmount: [{ required: true, message: '请输入包花数量', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.setContent()
    this.userId = this.$store.state.user.user.id
    this.username = this.$store.state.user.user.name
    if (this.tab === 'local') {
      this.form.packageId = this.userId
    }
  },
  methods: {
    setContent() {
      const title = this.$route.meta.title
      this.$store.dispatch('SetContent', title)
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.tab === 'local') {
            this.form.id = localStorageManager.nextSeq(Config.NextSeqKey + this.userId)
            this.form.yn = 0
            this.form.creatorId = this.userId
            this.form.creatorName = this.username
            this.form.created = new Date()
            localStorageManager.unshift(Config.FlowRecordKey + this.userId, createFlowerRecord(this.form))
            this.resetForm()
            this.$message.success('本地数据提交成功')
          } else {
            this.resetForm()
            this.$message.success('远端数据提交成功')
          }
        } else {
          this.$message.error('数据提交失败')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    cancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
</style>
