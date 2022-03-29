//生成员工提成
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="StaffCommissionTitle" class="dialog-box" append-to-body :visible.sync="showCommission" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-form-item label="选择员工" prop="SysUserId">
          <el-select v-model="dataObject.SysUserId" filterable clearable remote placeholder="请查询或下拉选择选择员工" class="select-input" @clear="clearUser" :remote-method="remoteUser" :loading="loading">
            <el-option v-for="item in UserList" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提成起始年月" prop="StartYearMonth" class="Date">
          <el-date-picker v-model="dataObject.StartYearMonth" value-format="yyyy-MM" type="month" placeholder="请选择提成起始年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="提成截止年月" prop="EndYearMonth" class="Date">
          <el-date-picker v-model="dataObject.EndYearMonth" value-format="yyyy-MM" type="month" placeholder="请选择提成截止年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="提成发放状态" prop="Status" class="State">
          <el-radio-group v-model="dataObject.Status">
            <el-radio label="0">待发放</el-radio>
            <el-radio label="1">已发放</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="Remark" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="dataObject.Remark" size="small" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button class="erpbtn" size="small" @click="dialogtrue('ruleForm')">生成提成</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetSysUserList } from '@/api/SystemSetting.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  name: 'AddCard',
  props: {
    showStaffCommission: {
      type: Boolean,
    },
    StaffCommissionTitle: {
      type: String,
      default: '生成员工提成'
    },
    tempData: {
      type: Object,
    },
  },
  data () {
    return {
      showCommission: false,
      Formrules: {},
      dataObject: {
        Id: '',
        SysUserId: '',
        StartYear: '',
        StartMonth: '',
        StartYearMonth: '',
        EndYear: '',
        EndMonth: '',
        EndYearMonth: '',
        Status: '0',
        Remark: ''
      },
      UserList: []//客户列表
    }
  },
  watch: {
    showStaffCommission (newvalue, oldvalue) {
      this.showCommission = newvalue
      if (this.StaffCommissionTitle == '修改员工提成') {
        this.dataObject = this.tempData
        this.dataObject.Status = this.dataObject.Status + ''
        // this.dataObject.StartYearMonth = this.tempData.StartYear + '-' + this.tempData.StartMonth
        this.$set(this.dataObject, 'StartYearMonth', this.tempData.StartYear + '-' + this.tempData.StartMonth)
        this.$set(this.dataObject, 'EndYearMonth', this.tempData.EndYear + '-' + this.tempData.EndMonth)
        // this.dataObject.EndYearMonth = this.tempData.EndYear + '-' + this.tempData.EndMonth
        this.remoteUser(this.dataObject.SysUserName)
      } else {
        this.dataObject = this.$options.data().dataObject
        this.remoteUser()
      }
    }
  },
  created () {
    this.remoteUser()
  },
  methods: {
    //查询公司列表
    remoteUser (query) {
      this.loading = true;
      let obj = {
        UserId: '',
        UserName: query,
        Status: 1,
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetSysUserList(qs.stringify(obj)).then(response => {
        this.loading = false;
        if (response.IsSuccess) {
          if (response.Data && response.Data.length) {
            this.UserList = response.Data
          } else {
            this.UserList = []
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    clearUser () {
      this.remoteUser()
    },
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          let myDate = new Date(this.dataObject.StartYearMonth)
          this.dataObject.StartYear = myDate.getFullYear()
          this.dataObject.StartMonth = myDate.getMonth() + 1

          let myDate2 = new Date(this.dataObject.EndYearMonth)
          this.dataObject.EndYear = myDate2.getFullYear()
          this.dataObject.EndMonth = myDate2.getMonth() + 1
          this.$emit('StaffCommissionSave', this.dataObject)
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
      this.$emit('closeStaffCommission', false)
    }
  }
}
</script>
<style lang="scss" scoped>
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
  /deep/ .Date {
    .el-date-editor {
      width: 100%;
    }
    .el-input__inner {
      border: none;
      background: $erinputbgc;
    }
  }
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      label {
        &:nth-child(1) {
          margin-right: 120px;
        }
      }
    }
  }
}
</style>