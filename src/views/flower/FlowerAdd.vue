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
        <el-select v-model="form.damageReasonId" placeholder="请选择报损原因" clearable>
          <el-option v-for="item in damageReasons" :label="item.label" :value="item.value" :key="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报损数量" prop="damageAmount">
        <el-input-number v-model="form.damageAmount" :min="0" :precision="0"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import localStorageManager from '@/utils/localFlowerRecord'
import Config from '@/settings'
import createFlowerRecord from '@/views/flower/FlowerRecord'
import { flowerSave } from '@/api/flower.js'
import { getUserId, getUserName } from '@/utils/auth'

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
      edit: false,
      userId: '',
      username: '',
      form: {
        packageId: '',
        pickerId: '',
        categoryId: '',
        specificationId: '',
        packageAmount: 1,
        damageReasonId: undefined,
        damageAmount: 0,
        yn: 0
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
    this.userId = getUserId()
    this.username = getUserName()
    if (this.tab === 'local') {
      this.form.packageId = this.userId
    }
    const query = this.$route.query
    const title = this.$route.meta.title
    if (query && query.flower) {
      this.edit = true
      this.$store.dispatch('SetContent', '编辑' + title)
      this.form.id = query.flower.id
      this.form.packageId = query.flower.packageId
      this.form.pickerId = query.flower.pickerId
      this.form.categoryId = query.flower.categoryId
      this.form.specificationId = query.flower.specificationId
      this.form.packageAmount = query.flower.packageAmount
      this.form.damageReasonId = query.flower.damageReasonId
      this.form.damageAmount = query.flower.damageAmount
      this.form.yn = query.flower.yn
    } else {
      this.$store.dispatch('SetContent', '新增' + title)
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.damageAmount && this.form.damageAmount > 0 && !this.form.damageReasonId) {
            this.$message.error('请选择报损原因')
            return
          }
          if (this.tab === 'local') {
            if (this.edit) {
              const key = Config.FlowRecordKey + this.userId
              const allRecords = localStorageManager.queryAll(key)
              allRecords.forEach((val, i) => {
                if (val.id === this.form.id) {
                  this.form.created = new Date()
                  // 替换并删除——起始位置，要删除的项的个数，要插入的内容（要插入的项的个数不必等于删除的项的个数）
                  allRecords.splice(i, 1, this.form)
                }
              })
              localStorageManager.save(key, allRecords)
              this.resetForm()
              this.$message.success('数据修改成功')
              this.cancel()
            } else {
              this.form.id = localStorageManager.nextSeq(Config.NextSeqKey + this.userId)
              this.form.yn = 0
              this.form.creatorId = this.userId
              this.form.creatorName = this.username
              this.form.created = new Date()
              localStorageManager.unshift(Config.FlowRecordKey + this.userId, createFlowerRecord(this.form))
              this.resetForm()
              this.$message.success('本地数据提交成功')
            }
          } else {
            flowerSave(this.form).then(data => {
              if (data) {
                this.$message.success('远端数据提交成功')
                this.cancel()
              } else {
                this.$message.success('远端数据提交失败')
              }
            })
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
