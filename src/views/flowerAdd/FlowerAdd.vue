<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="包花人" prop="bagId">
        <el-select
          v-model="form.bagId"
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
          v-model="form.pickerId"
          placeholder="请选择"
          filterable
          clearable
        >
          <el-option label="兰超" :value="1"> </el-option>
          <el-option label="尚志强" :value="2"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品种" prop="categoryId">
        <el-select
          v-model="form.categoryId"
          placeholder="请选择"
          filterable
          clearable
        >
          <el-option label="兰超" :value="1"> </el-option>
          <el-option label="尚志强" :value="2"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格" prop="specificationId">
        <el-select
          v-model="form.specificationId"
          placeholder="请选择"
          filterable
          clearable
        >
          <el-option label="兰超" :value="1"> </el-option>
          <el-option label="尚志强" :value="2"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="包花数量" prop="bagAmount">
        <el-input-number
          v-model="form.bagAmount"
          :min="1"
          :precision="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>export default {
  name: 'FlowerAdd',
  data () {
    return {
      form: {
        bagId: '',
        pickerId: '',
        categoryId: '',
        specificationId: '',
        bagAmount: undefined
      },
      rules: {
        bagId: [{ required: true, message: '请选择包花人', trigger: 'change' }],
        pickerId: [
          { required: true, message: '请选择采花人', trigger: 'change' }
        ],
        categoryId: [
          { required: true, message: '请选择品种', trigger: 'change' }
        ],
        specificationId: [
          { required: true, message: '请选择规格', trigger: 'change' }
        ],
        bagAmount: [
          { required: true, message: '请输入包花数量', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel () {
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
