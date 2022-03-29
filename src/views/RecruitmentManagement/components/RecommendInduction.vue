//推荐入职明细
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="RecommendTitle" class="dialog-box" append-to-body :visible.sync="showRecommend" :show-close="false" :destroy-on-close="true" width="800px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="rules" class="forms">
        <el-form-item label="选择人员" prop="StaffId">
          <el-select v-model="dataObject.StaffId" filterable clearable placeholder="请查询或下拉选择人员" class="select-input">
            <el-option v-for="item in StaffPageList" :key="item.StaffId" :label="item.StaffName" :value="item.StaffId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择项目" prop="ProjectId">
          <el-select v-model="dataObject.ProjectId" filterable clearable remote placeholder="请查询或下拉选择项目" class="select-input" @clear="clearProject" :remote-method="ProjectMethod" :loading="loading">
            <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="招聘类型" prop="Type">
          <el-select v-model="dataObject.Type" filterable clearable placeholder="请选择招聘类型" class="select-input">
            <el-option v-for="item in RecruitRecommendEnumType" :key="item.value" :label="item.describe" :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="招聘计提类型" prop="Form">
          <el-select v-model="dataObject.Form" filterable clearable placeholder="请选择招聘计提类型" class="select-input">
            <el-option v-for="item in RecruitRecommendEnumForm" :key="item.value" :label="item.describe" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算年月" prop="SettleYearMonth" class="Date">
          <el-date-picker v-model="dataObject.SettleYearMonth" clearable value-format="yyyy-MM" type="month" placeholder="请选择结算年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入职日期" prop="JoinDate" class="Date">
          <el-date-picker v-model="dataObject.JoinDate" value-format="yyyy-MM-dd" clearable type="date" placeholder="请选择入职日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="推荐人" prop="RecruitId">
          <el-select v-model="dataObject.RecruitId" filterable clearable remote placeholder="请查询或下拉选择推荐人" class="select-input" @clear="clearUser" :remote-method="UserMethod" :loading="loading">
            <el-option v-for="item in SysUserList" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖金" prop="Bonus">
          <el-input v-model="dataObject.Bonus" clearable size="small" placeholder="请输入奖金">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="在职状态" class="State" prop="States">
          <el-radio-group v-model="dataObject.States">
            <el-radio :label="0">在职</el-radio>
            <el-radio :label="1">离职</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="离职日期" prop="LeaveDate" class="Date" v-if="dataObject.States == 1">
          <el-date-picker v-model="dataObject.LeaveDate" value-format="yyyy-MM-dd" clearable type="date" placeholder="请选择离职日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上班天数" prop="WorkDays" v-if="dataObject.States == 1">
          <el-input v-model="dataObject.WorkDays" size="small" clearable placeholder="请输入上班天数" />
        </el-form-item>
        <el-form-item label="备注" prop="Remark" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="dataObject.Remark" size="small" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button round class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button round class="erpbtn" size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetRecruitRecommendEnum, GetRecruitRecommendStaffList } from '@/api/RecruitmentManagement.js'
import { GetProjectList } from '@/api/projectManagement.js'
import { GetSysUserList } from '@/api/SystemSetting.js'
import { GetStaffPageList } from '@/api/OutsourcedEmployeeManagement.js'
import { uuid, copy, MenuIdDate } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'RecommendInduction',
  props: ['RecommendVisible', 'RecommendTitle', 'RecommendData'],
  data () {
    return {
      dataObject: {
        Id: '',
        StaffId: '',
        ProjectId: '',
        SettleYearMonth: '',
        SettleYear: '',
        SettleMonth: '',
        Form: '',
        Type: '',
        States: 0,
        JoinDate: '',
        LeaveDate: '',
        WorkDays: '',
        RecruitId: '',
        Bonus: '',
        Remark: ''
      },
      loading: false,
      uploadLoading: false,
      showRecommend: false,
      RecruitRecommendEnumType: [],
      RecruitRecommendEnumForm: [],
      StaffPageList: [],
      ProjectList: [],
      SysUserList: [],
      Current: {},
      rules: {
        StaffId: [
          { required: true, message: '请选择人员', trigger: 'change' }
        ],
        ProjectId: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
        Form: [
          { required: true, message: '请输入招聘计提类型', trigger: 'blur' }
        ],
        LeaveDate: [
          { required: true, message: '请选择离职日期', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    RecommendVisible (newvalue, oldvalue) {
      this.showRecommend = newvalue
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      })

      if (this.RecommendTitle == '修改推荐入职明细') {
        this.dataObject = copy(this.RecommendData)

        this.dataObject.SettleYearMonth = this.dataObject.SettleYear + '-' + this.dataObject.SettleMonth
        if (this.dataObject.LeaveDate != '0001-01-01T00:00:00') {
          this.$set(this.dataObject, 'States', 1)
        } else {
          this.$set(this.dataObject, 'States', 0)
          this.$set(this.dataObject, 'LeaveDate', '')
          this.$set(this.dataObject, 'WorkDays', '')
        }
        this.remoteStaff(true)
        this.UserMethod(this.dataObject.RecruitName)

      } else {
        this.dataObject = this.$options.data().dataObject
        let UsedFor = JSON.parse(localStorage.getItem('Current'))
        this.dataObject.RecruitId = UsedFor.currentId
        this.UserMethod(UsedFor.currentUser)
        this.remoteStaff(false)
      }
    }
  },
  created () {
    this.Current = JSON.parse(window.localStorage.getItem('Current')) || {}
    this.RecommendEnum()
    this.ProjectMethod()

  },
  methods: {
    RecommendEnum () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetRecruitRecommendEnum(qs.stringify(obj)).then(response => {
        if (response) {
          this.RecruitRecommendEnumType = response.RecruitRecommendEnumType
          this.RecruitRecommendEnumForm = response.RecruitRecommendEnumForm
        }
      })
    },
    //查询招聘人员列表
    remoteStaff (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          IsGetAll: query, // true 修改获取全部 false 添加获取符合数据
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetRecruitRecommendStaffList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.StaffPageList = response.Data
            } else {
              this.StaffPageList = []
            }
          } else {
            this.StaffPageList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    //获取项目下拉列表
    ProjectMethod (val) {
      let data = {
        Name: val,
        CompanyId: '',
        BusinessType: '-1',
        Priority: '-1',
        Status: '-1',
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectList(qs.stringify(data)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.ProjectList = response.Data
          } else {
            this.ProjectList = []
            this.searchObject.ProjectId = ''
          }

        } else {
          this.ProjectList = []
          this.searchObject.ProjectId = ''
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    clearProject () {
      this.ProjectMethod()
    },
    //查询推荐人列表
    UserMethod (query) {
      let obj = {
        UserId: '',
        UserName: query,
        Status: 1,
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.loading = true
      setTimeout(() => {
        GetSysUserList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            if (response.Data && response.Data.length) {
              this.SysUserList = response.Data
            } else {
              this.SysUserList = []
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
          this.loading = false
        })
      }, 500);
    },
    clearUser () {
      this.UserMethod()
    },
    //导入员工
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          let myDate = new Date(this.dataObject.SettleYearMonth)
          this.dataObject.SettleYear = myDate.getFullYear()
          this.dataObject.SettleMonth = myDate.getMonth() + 1
          if (this.dataObject.States == 0) {
            this.dataObject.LeaveDate = ''
            this.dataObject.WorkDays = ''
          }
          this.$emit('RecommendSave', this.dataObject)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    //关闭导入事件
    close () {
      this.$emit('CloseRecommend', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
  position: relative;
  /deep/ .el-form-item {
    width: 50%;
    float: left;
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
        .el-input {
          .el-input__inner {
            height: 36px;
            line-height: 36px;
          }
          .el-input__suffix {
            top: 24px;
            height: 40px;
            line-height: 40px;
          }
        }

        .el-select__tags {
          background: #f0f4fa;
          top: 68%;
          border-radius: 4px;
        }
      }
      .el-input {
        font-size: 14px;
        .el-input__inner {
          height: 36px;
          line-height: 36px;
        }
        .el-input__suffix {
          height: 36px;
          line-height: 36px;
        }
      }
    }
    &:nth-child(odd) {
      padding-right: 20px;
    }
  }
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      height: 24px;
      label {
        &:nth-child(1) {
          margin-right: 60px;
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
  /deep/ .textarea-note {
    width: 100%;
  }
}
</style>