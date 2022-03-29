// 添加角色
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showRole" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-form-item label="角色名称" prop="RoleName">
          <el-input v-model="dataObject.RoleName" clearable size="small" />
        </el-form-item>
        <el-form-item label="角色类型" prop="AppType">
          <el-select v-model="dataObject.AppType" filterable clearable placeholder="请选择角色类型" size="mini" class="select-input">
            <el-option v-for="item in SystemAppList" :key="item.describe" :label="item.describe" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注说明" clearable prop="Remark">
          <el-input v-model="dataObject.Remark" size="small" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetSystemAppType } from '@/api/SystemSetting.js'
import axios from 'axios'
export default {
  name: 'addRole',
  props: ['showAddrole', 'title', 'tempData'],
  data () {
    return {
      dataObject: {
        Id: '',
        AppType: '',
        RoleName: '',
        Remark: ''
      },
      SystemAppList: [],
      showRole: false,
      Formrules: {
        RoleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    showAddrole (newvalue, oldvalue) {
      this.showRole = newvalue
      this.dataObject = this.$options.data().dataObject
      if (this.title == '添加角色') {

      } else if (this.title == '修改角色') {
        this.dataObject = this.tempData
      }
    }
  },
  created () {
    this.SystemAppType()
  },
  methods: {
    SystemAppType () {
      GetSystemAppType().then(response => {
        this.SystemAppList = response
      })
    },
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('RoleSave', this.dataObject)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    close () {
      this.$emit('closeRole', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
  /deep/ .el-form-item {
    margin-bottom: 12px;

    .el-form-item__label {
      width: 50%;
      text-align: left;
      line-height: 24px;
      color: #666666;
    }

    .el-form-item__content {
      margin-left: 0;
      width: 100%;
      .el-select {
        display: block;
        .el-input__suffix {
          top: 24px;
          height: 40px;
        }
      }
    }
  }
}
</style>