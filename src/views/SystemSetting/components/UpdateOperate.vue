<template>
  <div>
    <el-dialog :close-on-click-modal="false"
      :title="title"
      :visible.sync="dialogVisible"
      width="480px"
      :lock-scroll="false"
      custom-class="erpdialog"
      @close="closedialog">
      <el-form :model="operateform" label-position="top" :rules="rules" ref="operateform" label-width="100px" class="operateform">
        <el-form-item label="操作名称" prop="Title">
          <el-input v-model="operateform.Title"></el-input>
        </el-form-item>
        <el-form-item label="操作编码" prop="OperationCode">
          <el-input v-model="operateform.OperationCode"></el-input>
        </el-form-item>
        <!-- <el-form-item label="对应菜单ID" prop="id">
          <el-input v-model="operateform.id"></el-input>
        </el-form-item>
        <el-form-item label="位置" prop="url">
          <el-input v-model="operateform.url"></el-input>
        </el-form-item> -->
        <el-form-item label="排序" prop="Sort" class="counternumber">
          <el-input-number v-model="operateform.Sort" @change="handleChange" :min="1" :max="999"></el-input-number>
        </el-form-item>
        <el-form-item label="备注" class="text">
          <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="operateform.Remark"></el-input>
        </el-form-item>
        <!-- <el-form-item label="使用状态" class="useraido">
          <el-radio-group v-model="operateform.id">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['title', 'visible', 'contentdata'],
  data() {
    return {
      dialogVisible: false,
      operateform: {
        Title: '',
        OperationCode: '',
        Sort: 1,
        Remark: ''
      },
      rules: {
        Title: [
          { required: true, message: '请输入操作名称', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 50 个字符以内', trigger: 'blur' }
        ],
        OperationCode: [
          { required: true, message: '请输入操作编码', trigger: 'blur' },
        ],
      }
    }
  },
  watch: {
    visible(newvalue, oldvalue) {
      this.dialogVisible = newvalue
      if (newvalue) {
        this.operateform = this.contentdata
      } else {
        this.operateform = {
          Title: '',
          OperationCode: '',
          Sort: 1,
          Remark: ''
        }
      }
    }
  },
  methods: {
    closedialog() {
      this.$refs.operateform.resetFields()
      this.$emit('closedialog', false)
    },
    save() {
      this.$refs.operateform.validate(v => {
        if (v) {
          this.$emit('savedialog', this.operateform)
        }
      })
    },
    handleChange() {

    }
  },
}
</script>

<style lang="scss">
  
</style>