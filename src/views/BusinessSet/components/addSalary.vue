//新建工资计算
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box dialog-account" append-to-body :visible.sync="showAccount" :show-close="false" :destroy-on-close="true" width="600px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms-Account">
        <el-form-item label="规则名称" prop="RuleName">
          <el-input v-model="dataObject.RuleName" clearable clearablesize="small" />
        </el-form-item>
        <el-form-item label="基本工资" prop="BaseSalary">
          <el-input v-model="dataObject.BaseSalary" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="选择客户" prop="CompanyId">
          <el-select v-model="dataObject.CompanyId" filterable clearable remote placeholder="请查询客户" class="select-input" @clear="clearCompany" :remote-method="remoteMethod" :loading="loading" @change="changeCompany(dataObject.CompanyId)">
            <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适用项目" prop="ProjectId">
          <el-select v-model="dataObject.ProjectId" clearable placeholder="请查询公司并选择项目" class="select-input">
            <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作形式" prop="WorkType">
          <el-select v-model="dataObject.WorkType" clearable placeholder="请选择工作形式" class="select-input">
            <el-option v-for="item in workList" :key="item.Id" :label="item.label" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位工资" prop="PostSalary">
          <el-input v-model="dataObject.PostSalary" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="绩效工资" prop="PerformSalary">
          <el-input v-model="dataObject.PerformSalary" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="日常加班工资/小时" prop="UsualOverTime">
          <el-input v-model="dataObject.UsualOverTime" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="节假日加班工资/小时" prop="HolidayOverTime">
          <el-input v-model="dataObject.HolidayOverTime" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="计时/计件工资" prop="UnitSalary">
          <el-input v-model="dataObject.UnitSalary" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="房补" prop="HouseSupport">
          <el-input v-model="dataObject.HouseSupport" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="餐补" prop="MealSupport">
          <el-input v-model="dataObject.MealSupport" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="交通补" prop="TrafficSupport">
          <el-input v-model="dataObject.TrafficSupport" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="通讯补" prop="CommSupport">
          <el-input v-model="dataObject.CommSupport" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="高温补" prop="HighTempSupport">
          <el-input v-model="dataObject.HighTempSupport" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="出差补贴" prop="TravelSupport">
          <el-input v-model="dataObject.TravelSupport" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="工会费用代扣" prop="UnionFee">
          <el-input v-model="dataObject.UnionFee" clearable size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="使用状态" prop="Status" class="State">
          <el-radio-group v-model="dataObject.Status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetSysOrgList, GetSysRoleList } from '@/api/SystemSetting.js'
import { GetCompanyPageList } from '@/api/CustomerManagement.js'
import { GetProjectList } from '@/api/projectManagement.js'
import axios from 'axios'
import { MenuIdDate, upAndDown } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  name: 'addSalary',
  components: {
  },
  props: ['showAddSalary', 'title', 'tempData'],
  data () {
    return {
      dataObject: {
        Id: '',
        RuleName: '',
        CompanyId: '',
        ProjectId: '',
        WorkType: '',
        BaseSalary: '',
        PostSalary: '',
        PerformSalary: '',
        UsualOverTime: '',
        HolidayOverTime: '',
        UnitSalary: '',
        HouseSupport: '',
        MealSupport: '',
        TrafficSupport: '',
        CommSupport: '',
        HighTempSupport: '',
        TravelSupport: '',
        UnionFee: '',
        Status: '1'
      },
      workList: [{
        Id: 0,
        label: '固定工资'
      }, {
        Id: 1,
        label: '计时'
      }, {
        Id: 2,
        label: '计件'
      }],
      CompanyPageList: [],//公司列表
      ProjectList: [],//项目列表
      loading: false,
      RoleList: [],
      showAccount: false,
      Formrules: {
        RuleName: [
          { required: true, message: '请输入规则名称', trigger: 'blur' }
        ],
        BaseSalary: [
          { required: true, message: '请输入基本工资', trigger: 'blur' }
        ]
      },
    }
  },
  watch: {
    showAddSalary (newvalue, oldvalue) {
      this.showAccount = newvalue
      this.dataObject = this.$options.data().dataObject
      if (this.title == '新建工资计算规则') {
        this.remoteMethod()
      } else if (this.title == '修改工资计算规则') {
        this.dataObject = this.tempData
        this.dataObject.Status = this.tempData.Status + ''
        if (this.dataObject.CompanyName) {
          this.remoteMethod(this.dataObject.CompanyName)
          this.changeCompany(this.dataObject.CompanyId)
        }
      }
    }
  },
  created () {
    this.remoteMethod()
  },
  methods: {
    //查询公司列表
    remoteMethod (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          Name: query,
          PageIndex: 1,
          PageSize: 99,
          Type: -1,
          Status: 1,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetCompanyPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            this.CompanyPageList = response.Data
            if (this.title == '修改工资计算规则') {
              this.dataObject.CompanyId = this.CompanyPageList[0].Id
            }
          } else {
            this.CompanyPageList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    clearCompany () {
      this.dataObject.ProjectId = ''
      this.ProjectList = []
      this.remoteMethod()
    },
    //获取项目下拉列表
    changeCompany (val) {
      if (val) {
        let data = {
          Name: '',
          CompanyId: val,
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
            this.ProjectList = response.Data
          } else {
            this.ProjectList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }

    },
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('SalarySave', this.dataObject)
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
      this.CompanyPageList = []
      this.$emit('closeSalary', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.dialog-account {
  /deep/ .el-dialog {
    .el-dialog__body {
      padding: 0 20px;
    }
  }
}
.forms-Account {
  position: relative;
  /deep/ .el-form-item {
    margin-bottom: 12px;
    width: 50%;
    float: left;
    padding: 0 20px;
    .el-form-item__label {
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
      }
      .el-input {
        font-size: 14px;
        .el-input__inner {
          height: 36px;
          line-height: 36px;
        }
        .el-input__suffix {
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      label {
        &:nth-child(1) {
          margin-right: 60px;
        }
      }
    }
  }
  .way {
    font-size: 16px;
  }
}
</style>