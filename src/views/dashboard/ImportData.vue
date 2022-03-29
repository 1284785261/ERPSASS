<!-- 导入数据 -->
<template>
  <div class="import-data-container">
    <el-button class="import-card erpbtn" @click="importdata(item.value)" v-for="(item, index) in importlist" :key="index">{{item.name}}</el-button>
    <dialogimport :title="importtitle" :visible="importvisible" @downtemplete="downtemplete" @savedialog="savedialog" @closedialog="closedialog"></dialogimport>
    <div class="dialog">
      <el-dialog :close-on-click-modal="false" title="部分导入失败提示" :visible.sync="reportvisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closereport">
        <div class="error-box">
          <div class="error-top">
            <div class="success-total">成功 {{errordata.Successes}}</div>
            <div class="error-total">文件导入失败 <span>{{errordata.Errors}}</span> 条</div>
          </div>
          <div class="error-content">
            <div class="row" v-for="(item, index) in errordata.ImportToExcelErrorList" :key="index">
              <div class="index">第{{item.Rows}}条</div>
              <div class="con">{{item.Message}}</div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="reportvisible=!reportvisible">修改后重新导入</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import dialogimport from '@/components/publicComponents/dialog-importwages.vue'
import { ImportToCompanyExcel, GetImportToCompanyExcelModel } from '@/api/CustomerManagement.js'
import { ImportToProjectExcel, GetImportToProjectExcelModel } from '@/api/projectManagement.js'
import { ImportToStaffEffectExcel, GetImportToProjectSrvCommisionExcelModel } from '@/api/OutsourcedEmployeeManagement.js'
import { ImportToBfFundExcel, GetImportToBfFundExcelModel, ImportToBfInsuranceExcel, GetImportToBfInsuranceExcelModel, ImportToBfMedicalExcel, GetImportToBfMedicalExcelModel } from '@/api/CompensationServiceManagement.js'
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  components: {
    dialogimport
  },
  data () {
    return {
      importlist: [{
        value: 0,
        name: '客户导入'
      }, {
        value: 1,
        name: '项目导入'
      },
      //  {
      //   value: 2,
      //   name: '项目的业务提成'
      // }, {
      //   value: 3,
      //   name: '项目的管理提成'
      // },
      {
        value: 4,
        name: '外包员工导入'
      }, {
        value: 5,
        name: '公司公积金账户信息'
      }, {
        value: 6,
        name: '公司社保账户信息'
      }, {
        value: 7,
        name: '公司医保账户信息'
      }],
      importtitle: '导入文件',
      importvisible: false,
      errordata: {}, // 错误信息
      reportvisible: false,
      importindex: '',
    }
  },
  methods: {
    importdata (i) {
      this.importindex = i
      this.importvisible = true
    },
    savedialog (e) {
      e.menuid = MenuIdDate()
      e.operationcode = 1
      if (this.importindex === 0) {
        showLoading()
        ImportToCompanyExcel(e).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.importvisible = false
            if (response.Data.Errors == 0) {
              this.$message({
                message: '导入数据成功',
                type: 'success'
              })
            } else {
              this.errordata = response.Data
              this.reportvisible = true
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else if (this.importindex === 1) {
        showLoading()
        ImportToProjectExcel(e).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.importvisible = false
            if (response.Data.Errors == 0) {
              this.$message({
                message: '导入数据成功',
                type: 'success'
              })
            } else {
              this.errordata = response.Data
              this.reportvisible = true
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else if (this.importindex === 4) {
        showLoading()
        ImportToStaffEffectExcel(e).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.importvisible = false
            if (response.Data.Errors == 0) {
              this.$message({
                message: '导入数据成功',
                type: 'success'
              })
            } else {
              this.errordata = response.Data
              this.reportvisible = true
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else if (this.importindex === 5) {
        showLoading()
        ImportToBfFundExcel(e).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.importvisible = false
            if (response.Data.Errors == 0) {
              this.$message({
                message: '导入数据成功',
                type: 'success'
              })
            } else {
              this.errordata = response.Data
              this.reportvisible = true
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else if (this.importindex === 6) {
        showLoading()
        ImportToBfInsuranceExcel(e).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.importvisible = false
            if (response.Data.Errors == 0) {
              this.$message({
                message: '导入数据成功',
                type: 'success'
              })
            } else {
              this.errordata = response.Data
              this.reportvisible = true
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else if (this.importindex === 7) {
        showLoading()
        ImportToBfMedicalExcel(e).then(response => {
          hideLoading()
          if (response.IsSuccess) {
            this.importvisible = false
            if (response.Data.Errors == 0) {
              this.$message({
                message: '导入数据成功',
                type: 'success'
              })
            } else {
              this.errordata = response.Data
              this.reportvisible = true
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    // 下载导入模板
    downtemplete () {
      if (this.importindex === 0) {
        showLoading()
        GetImportToCompanyExcelModel().then(response => {
          hideLoading()
          if (response.IsSuccess) {
            window.open(response.Data)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else if (this.importindex === 1) {
        showLoading()
        GetImportToProjectExcelModel().then(response => {
          hideLoading()
          if (response.IsSuccess) {
            window.open(response.Data)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else if (this.importindex === 4) {
        showLoading()
        GetImportToProjectSrvCommisionExcelModel().then(response => {
          hideLoading()
          if (response.IsSuccess) {
            window.open(response.Data)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else if (this.importindex === 5) {
        showLoading()
        GetImportToBfFundExcelModel().then(response => {
          hideLoading()
          if (response.IsSuccess) {
            window.open(response.Data)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else if (this.importindex === 6) {
        showLoading()
        GetImportToBfInsuranceExcelModel().then(response => {
          hideLoading()
          if (response.IsSuccess) {
            window.open(response.Data)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      } else if (this.importindex === 7) {
        showLoading()
        GetImportToBfMedicalExcelModel().then(response => {
          hideLoading()
          if (response.IsSuccess) {
            window.open(response.Data)
          } else {
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }
    },
    // 关闭弹框
    closedialog () {
      this.importvisible = false
    },
    // 关闭导入信息
    closereport () {
      this.reportvisible = false
    },
  },
}
</script>

<style lang="scss">
.import-data-container {
  .import-card {
    cursor: pointer;
    margin: 24px;
  }
}
</style>