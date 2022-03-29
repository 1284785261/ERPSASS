<!-- 添加分组成员 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showRole" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-form-item label="权限组名称" prop="Name">
          <el-input v-model="dataObject.Name" clearable size="small" />
        </el-form-item>
        <!-- <el-form-item label="选择分组成员">
          <el-select v-model="dataObject.AppType" filterable clearable size="mini" class="select-input">
            <el-option v-for="item in SystemAppList" :key="item.describe" :label="item.describe" :value="item.value" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="分组描述" clearable>
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
import { GetSysGroup } from '@/api/SystemSetting.js'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'updataList',
  props: ['showAddrole', 'title', 'tempData'],
  data () {
    return {
      dataObject: {
        Id: '',
        Name: '',
        RoleName: '',
        Remark: '',
        Sort: 0,
      },
      SystemAppList: [],
      showRole: false,
      Formrules: {
        Name: [
          { required: true, message: '请输入分组名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    showAddrole (newvalue, oldvalue) {
      this.showRole = newvalue
      this.dataObject = this.$options.data().dataObject
      if (this.title == '新建权限分组') {

      } else if (this.title == '修改权限分组') {
        this.dataObject = this.tempData
        this.SystemAppType()
      }
    }
  },
  methods: {
    // 获取分组详情
    SystemAppType () {
      let obj = {
        Id: this.dataObject.Id
      }
      GetSysGroup(qs.stringify(obj)).then(res => {
        if (res.IsSuccess) {

        }
      })
    },
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('groupSave', this.dataObject)
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
      this.$emit('closeGroup', false)
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