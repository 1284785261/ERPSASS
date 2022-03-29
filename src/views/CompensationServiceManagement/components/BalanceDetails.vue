//生成差额明细
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="一键生成差额明细" class="dialog-box" append-to-body :visible.sync="showBalanceDetail" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="rules" class="forms">
        <el-form-item label="所属客户" prop="ExpireDate">
          <el-select v-model="dataObject.CompanyId" filterable clearable remote placeholder="请查询或下拉选择所属客户" class="select-input" @clear="clearCompany" :remote-method="remoteMethod" @change="changeCompany" :loading="loading">
            <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属项目" prop="ExpireDate">
          <el-select v-model="dataObject.ProjectId" filterable clearable remote placeholder="请选择所属客户查询所属项目" class="select-input" @clear="clearProject" :remote-method="ProjectMethod" :loading="loading">
            <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属年月" prop="YearMonth" class="Date">
          <el-date-picker v-model="dataObject.YearMonth" type="month" placeholder="请选择所属年月" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button round class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button round class="erpbtn" size="small" @click="dialogtrue('ruleForm')">开始生成</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetCompanyPageList } from '@/api/CustomerManagement.js'
import { GetProjectList } from '@/api/projectManagement.js'
import SupperUploader from '@/utils/SupperUploader'
import { uuid, copy } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'ImportSixtoDeduct',
  props: ['showBalanceDetails'],
  data () {
    return {
      CompanyPageList: [],//所属客户
      ProjectList: [],//所属项目
      dataObject: {
        CompanyId: '',
        ProjectId: ''
      },
      loading: false,
      rules: {

      },
      showBalanceDetail: false
    }
  },
  watch: {
    showBalanceDetails (newvalue, oldvalue) {
      this.showBalanceDetail = newvalue
    }
  },
  created () {
    this.remoteMethod()
  },
  methods: {
    //模板下载
    DownloadTemplate () {
      GetInsuranceExcelModel().then(response => {
        if (response.IsSuccess && response.Data) {
          window.open('http://' + response.Data)
        }
      })
    },
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
        }
        GetCompanyPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            this.CompanyPageList = response.Data
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
    ProjectMethod (val) {
      let data = {
        Name: val,
        CompanyId: this.dataObject.CompanyId || '',
        BusinessType: '-1',
        Priority: '-1',
        Status: '-1',
        PageIndex: 1,
        PageSize: 99
      }
      GetProjectList(qs.stringify(data)).then(response => {
        if (response.IsSuccess) {
          if (response.Data) {
            this.ProjectList = response.Data
          } else {
            this.ProjectList = []
            this.dataObject.ProjectId = ''
          }

        } else {
          this.ProjectList = []
          this.dataObject.ProjectId = ''
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
    //选择客户查询项目
    changeCompany () {
      if (this.dataObject.CompanyId) {
        this.ProjectMethod()
      }
    },
    //导入六项扣除明细
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          let myDate = new Date(this.dataObject.YearMonth)
          this.dataObject.PeriodYear = myDate.getFullYear()
          this.dataObject.PeriodMonth = myDate.getMonth() + 1
          this.$emit('SaveBalanceDetails', this.dataObject)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    //关闭六项扣除明细
    close () {
      this.$emit('closeBalanceDetails', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
  /deep/ .el-form-item {
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
  /deep/ .Date {
    .el-date-editor {
      width: 100%;
    }
    .el-input__inner {
      border: none;
      background: $erinputbgc;
    }
  }
}
</style>