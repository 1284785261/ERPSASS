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
        <el-form-item label="父级ID" prop="ParentId">
          <el-input v-model="operateform.ParentId"></el-input>
        </el-form-item>
        <el-form-item label="类别类型" prop="ClassType" class="select">
          <el-select v-model="operateform.ClassType" placeholder="请选择类别类型">
            <el-option
              v-for="item in classtype"
              :key="item.value"
              :label="item.describe"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别名称" prop="ClassName">
          <el-input v-model="operateform.ClassName"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="Sort" class="counternumber">
          <el-input-number v-model="operateform.Sort" @change="handleChange" :min="1" :max="999"></el-input-number>
        </el-form-item>
        <el-form-item label="备注" class="text">
          <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="operateform.Remark"></el-input>
        </el-form-item>
        <el-form-item label="使用状态" class="useraido">
          <el-radio-group v-model="operateform.Status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['title', 'visible', 'contentdata'],
  computed: {
    ...mapGetters(['classtype'])
  },
  data() {
    return {
      dialogVisible: false,
      operateform: {
        ParentId: '',
        ClassType: '',
        ClassName: '',
        Sort: 1,
        Remark: '',
        Status: 1
      },
      rules: {
        ClassName: [
          { required: true, message: '请输入类别名称', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 50 个字符', trigger: 'blur' }
        ],
        ParentId: [
          { required: true, message: '请输入父级ID', trigger: 'blur' },
        ],
        ClassType: [
          { required: true, message: '请选择类别类型', trigger: 'change' },
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
          ParentId: '',
          ClassType: '',
          ClassName: '',
          Sort: 1,
          Remark: '',
          Status: 1
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
    // 输入框
    handleChange() {

    }
  },
}
</script>

<style lang="scss">
  
</style>