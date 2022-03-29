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
        <el-form-item label="部门ID" prop="ParentId" v-if="isParentId">
          <el-input v-model="operateform.Id" disabled></el-input>
        </el-form-item>
        <el-form-item label="公司/部门名称" prop="OrgName">
          <el-input v-model="operateform.OrgName"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="Sort" class="counternumber">
          <el-input-number v-model="operateform.Sort" @change="handleChange" :min="1" :max="999"></el-input-number>
        </el-form-item>
        <el-form-item label="使用状态" class="useraido">
          <el-radio-group v-model="operateform.Status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" class="text">
          <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="operateform.Remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { AddSysOrg } from '@/api/SystemSetting.js'
export default {
  props: ['title', 'visible', 'contentdata'],
  data() {
    return {
      dialogVisible: false,
      isParentId: true,
      operateform: {
        OrgName: '',
        Id: '',
        ParentId: '',
        Sort: '',
        Remark: '',
        Status: 1
      },
      rules: {
        OrgName: [
          { required: true, message: '请输入公司/部门名称', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 50 个字符以内', trigger: 'blur' }
        ],
        Id: [
          { required: true, message: '请选择部门ID', trigger: 'blur' },
        ],
        Sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
        ],
      }
    }
  },
  watch: {
    visible(newvalue, oldvalue) {
      this.dialogVisible = newvalue
      // 判断如果是添加就把部门ID隐藏
      if (this.contentdata.Id === '') {
        this.isParentId = false
      } else {
        this.isParentId = true
      }
      // if (this.contentdata.ParentId === 0) {
      //   this.isParentId = false
      // } else {
      //   this.isParentId = true
      // }
      if (newvalue) {
        this.operateform = this.contentdata
      } else {
        this.operateform = {
          OrgName: '',
          ParentId: '',
          Sort: '',
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