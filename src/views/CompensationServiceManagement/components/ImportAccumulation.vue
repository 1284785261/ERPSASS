<!-- 导入公积金 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="导入公积金" class="dialog-box" append-to-body :visible.sync="showAccumulation" :show-close="false" :destroy-on-close="true" width="800px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="rules" class="forms">
        <el-form-item label="选择要导入的表格" clearable prop="HouseFundUrl" class="File-item">
          <el-button type="primary" class="upload-bts" :loading="uploadLoading">上传</el-button>
          <input type="file" accept=".xls,.xlsx," name="file" class="ButtonFile" @change="uploadFile">
          <el-input v-model="dataObject.HouseFundUrl" disabled size="small" />

        </el-form-item>
        <el-form-item label="企业公积金账户" prop="BfInsuranceFundId">
          <el-select v-model="dataObject.BfInsuranceFundId" filterable clearable remote placeholder="请查询或下拉选择企业公积金账户" class="select-input" :remote-method="remoteInsurance" :loading="loading" @clear="clearProject" @change="chooseInsurance">
            <el-option v-for="item in BfInsuranceList" :key="item.Id" :label="item.BfCompanyName+' - '+item.Account" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公积金所属年月" prop="YearMonth" class="Date">
          <el-date-picker v-model="dataObject.YearMonth" value-format="yyyy-MM" type="month" placeholder="请选择公积金所属年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入账年月" prop="PeriodYearMonth" class="Date">
          <el-date-picker v-model="dataObject.PeriodYearMonth" value-format="yyyy-MM" type="month" placeholder="请选择入账年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="输入导入的sheet表名称" prop="SheetName">
          <el-input v-model="dataObject.SheetName" size="small" placeholder="请输入导入的sheet表名称" />
        </el-form-item>
        <el-form-item label="表头起始行" prop="StartRow">
          <el-input v-model="dataObject.StartRow" size="small" placeholder="请输入表格内的行数(数字:例如:1,2,3...)" />
        </el-form-item>
        <el-form-item label="表头结束行" prop="EndRow">
          <el-input v-model="dataObject.EndRow" clearable size="small" placeholder="请输入表格内的行数(数字:例如:1,2,3...)" />
        </el-form-item>
        <el-form-item label="表头起始列" prop="StartCol">
          <el-input v-model="dataObject.StartCol" size="small" placeholder="请输入表格内的列数(数字:例如:A:1,B:2,C:3...)" />
        </el-form-item>
        <el-form-item label="表头结束列" prop="EndCol">
          <el-input v-model="dataObject.EndCol" clearable size="small" placeholder="请输入表格内的列数(数字:例如:A:1,B:2,C:3...)" />
        </el-form-item>
        <el-form-item label="内容结束行" prop="ContentEndRow">
          <el-input v-model="dataObject.ContentEndRow" clearable size="small" placeholder="请输入内容结束行" />
        </el-form-item>
        <el-form-item label="身份证/个人编号在列" prop="IdCodeIndex">
          <el-input v-model="dataObject.IdCodeIndex" size="small" placeholder="请输入身份证/个人编号所在列" />
        </el-form-item>
        <el-form-item label="公积金个人编号所在列">
          <el-input v-model="dataObject.AccountColumn" size="small" placeholder="请输入公积金个人编号所在列" />
        </el-form-item>
        <!-- <a class="downloadBtn" @click="DownloadTemplate">点击下载模板</a> -->
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button round class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button round class="erpbtn" size="small" @click="dialogtrue('ruleForm')">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetProjectList } from '@/api/projectManagement.js'
import { GetHouseFundExcelModel, GetBfInsuranceFundPageList, GetHouseFundBatchInfoByBfId } from '@/api/CompensationServiceManagement.js'
import SupperUploader from '@/utils/SupperUploader'
import { MenuIdDate, uuid, copy } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'ImportAccumulation',
  props: ['showImportAccumulation'],
  data () {
    return {
      dataObject: {
        HouseFundUrl: '',
        BfInsuranceFundId: '',
        YearMonth: '',
        PeriodYearMonth: '',
        SheetName: '',
        StartRow: '',
        EndRow: '',
        StartCol: '',
        EndCol: '',
        ContentEndRow: '',
        IdCodeIndex: '',
        file: '',
        AccountColumn: ''
      },
      loading: false,
      uploadLoading: false,
      showAccumulation: false,
      BfInsuranceList: [],
      rules: {
        HouseFundUrl: [
          { required: true, message: '请上传导入表格', trigger: 'blur' }
        ],
        BfInsuranceFundId: [
          { required: true, message: '请选择企业公积金账户', trigger: 'change' }
        ],
        YearMonth: [
          { required: true, message: '请选择公积金所属年月', trigger: 'change' }
        ],
        PeriodYearMonth: [
          { required: true, message: '请选择入账年月', trigger: 'change' }
        ],
        SheetName: [
          { required: true, message: '请输入导入的sheet表名称', trigger: 'blur' }
        ],
        StartRow: [
          { required: true, message: '请输入表头起始行', trigger: 'blur' }
        ],
        StartCol: [
          { required: true, message: '请输入表头起始列', trigger: 'blur' }
        ],
        EndRow: [
          { required: true, message: '请输入表头结束行', trigger: 'blur' }
        ],
        EndCol: [
          { required: true, message: '请输入表头结束列', trigger: 'blur' }
        ],
        IdCodeIndex: [
          { required: true, message: '请输入个人编号所在列', trigger: 'blur' }
        ],
        ContentEndRow: [
          { required: true, message: '请输入内容结束行', trigger: 'blur' }
        ],
      }
    }
  },
  watch: {
    showImportAccumulation (newvalue, oldvalue) {
      this.showAccumulation = newvalue
    }
  },
  created () {
    this.remoteInsurance()
  },
  methods: {
    remoteInsurance (query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          Account: query || '',
          BfCompanyOrCompanyName: '',
          Type: 1,
          PageIndex: 1,
          PageSize: 99,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetBfInsuranceFundPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.BfInsuranceList = response.Data
            } else {
              this.BfInsuranceList = []
            }
          } else {
            this.BfInsuranceList = []
            this.$message({
              message: response.MessageContent,
              type: 'error'
            })
          }
        })
      }, 200)
    },
    // 回填数据
    chooseInsurance (e) {
      if (e) {
        let obj = {
          BfInsuranceFundId: e,
          menuid: MenuIdDate(),
          operationcode: '1'
        }
        GetHouseFundBatchInfoByBfId(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            if (response.Data) {
              this.dataObject.SheetName = response.Data.SheetName
              this.dataObject.StartRow = response.Data.StartRow
              this.dataObject.StartCol = response.Data.StartCol
              this.dataObject.IdCodeIndex = response.Data.IdCodeIndex
              this.dataObject.EndRow = response.Data.EndRow
              this.dataObject.EndCol = response.Data.EndCol
              this.dataObject.ContentEndRow = response.Data.ContentEndRow
            } else {
              this.dataObject.SheetName = ''
              this.dataObject.StartRow = ''
              this.dataObject.StartCol = ''
              this.dataObject.IdCodeIndex = ''
              this.dataObject.EndRow = ''
              this.dataObject.EndCol = ''
              this.dataObject.ContentEndRow = ''
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
    clearProject () {
      this.remoteInsurance()
    },
    uploadFile (e) {
      var uploader
      const files = e.target.files[0]
      var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
      if (ext == 'xls' || ext == 'xlsx') {
      } else {
        this.$message({
          message: '不支持该格式文件上传',
          type: 'warning'
        })
        e.target.value = []
        return false
      }
      if (files.size > (20 * 1024 * 1024)) {
        this.$message({
          message: '文件大小超过最大限制',
          type: 'warning'
        })
        e.target.value = []
        return false
      } else {
        this.uploadLoading = true
        uploader = new SupperUploader(process.env.VUE_APP_BASE_API_UPLOAD, files, uuid(), (2 * 1024 * 1024))
        uploader.UploadFun(() => {
          if (uploader.urlResult) {
            this.uploadLoading = false
            this.dataObject.HouseFundUrl = uploader.urlResult.VideoUrl
            this.dataObject.file = files
            this.$refs.ruleForm.clearValidate('HouseFundUrl')
            e.target.value = []
          }
        })
      }
    },
    //导入员工
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('ImportAccumulationSave', this.dataObject)
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
      this.dataObject = this.$options.data().dataObject
      this.$emit('closeImportAccumulation', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
  position: relative;
  /deep/ .el-form-item {
    margin-bottom: 12px;
    width: 50%;
    float: left;
    padding: 0 10px;
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
  .upload-bts {
    position: absolute;
    right: 0;
    top: 24px;
    z-index: 10;
    background: #1588f8;
    button {
      padding: 12px 19px;
    }
  }
}
</style>