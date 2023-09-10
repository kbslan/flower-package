<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="名称" prop="label">
        <el-input v-model="form.label" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="value">
        <el-input v-model="form.value" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { optionsSave } from '@/api/options'

export default {
  name: 'OptionAdd',
  data() {
    return {
      form: {
        id: '',
        type: '',
        label: '',
        value: ''
      },
      rules: {
        label: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 150, message: '长度在  到 150 个字符', trigger: 'blur' }
        ],
        value: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      typeList: [
        {
          value: 'flower_picker',
          label: '鲜花采摘人'
        },
        {
          value: 'flower_category',
          label: '鲜花品种'
        },
        {
          value: 'flower_specification',
          label: '鲜花规格'
        },
        {
          value: 'flower_damage_reason',
          label: '鲜花损坏原因'
        }
      ]
    }
  },
  mounted() {
    this.setContent()
  },
  methods: {
    setContent() {
      const title = this.$route.meta.title
      const query = this.$route.query
      let subTitle
      if (query) {
        this.form.id = query.id
        this.form.type = query.type
        this.form.label = query.label
        this.form.value = query.value
        this.typeList.some(item => {
          if (item.value === this.form.type) {
            subTitle = item.label
            return true
          }
        })
      }
      if (this.form.id) {
        this.$store.dispatch('SetContent', '编辑' + subTitle)
      } else {
        this.$store.dispatch('SetContent', subTitle ? '新增' + subTitle : title)
      }
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          optionsSave(this.form).then(data => {
            this.$message.success('操作成功')
            this.resetForm()
            this.cancel()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    cancel() {
      // this.$router.back()
      this.$router.push({ path: '/options', query: { type: this.form.type } })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
</style>
