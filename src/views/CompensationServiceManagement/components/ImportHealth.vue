<!-- 导入医保弹窗 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="导入医保" class="dialog-box" append-to-body :visible.sync="showSocialSecurity" :show-close="false" :destroy-on-close="true" width="800px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="rules" class="forms">
        <el-form-item label="选择要导入的表格" clearable prop="MedicalUrl" class="File-item">
          <el-button type="primary" class="upload-bts" :loading="uploadLoading">上传</el-button>
          <input type="file" accept=".xls,.xlsx," name="file" class="ButtonFile" @change="uploadFile">
          <el-input v-model="dataObject.MedicalUrl" disabled size="small" />
        </el-form-item>
        <el-form-item label="公司社保账号" prop="BfInsuranceFundId">
          <el-select v-model="dataObject.BfInsuranceFundId" filterable clearable remote placeholder="请查询或下拉选择公司社保账号" class="select-input" @clear="clearProject" @change="SelectValue" :remote-method="remoteInsurance" :loading="loading">
            <el-option v-for="item in BfInsuranceList" :key="item.Id" :label="item.BfCompanyName+' - '+item.Account" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入账年月" prop="PeriodYearMonth" class="Date">
          <el-date-picker v-model="dataObject.PeriodYearMonth" value-format="yyyy-MM" clearable type="month" placeholder="请选择入账年月" />
        </el-form-item>
        <el-form-item label="输入导入的sheet表名称" prop="SheetName">
          <el-input v-model="dataObject.SheetName" clearable size="small" placeholder="请输入导入的sheet表名称" />
        </el-form-item>
        <el-form-item label="表头起始行" prop="StartRow">
          <el-input v-model="dataObject.StartRow" clearable size="small" placeholder="请输入表格内的行数(数字:例如:1,2,3...)" />
        </el-form-item>
        <el-form-item label="表头结束行" prop="EndRow">
          <el-input v-model="dataObject.EndRow" clearable size="small" placeholder="请输入表格内的行数(数字:例如:1,2,3...)" />
        </el-form-item>
        <el-form-item label="表头起始列" prop="StartCol">
          <el-input v-model="dataObject.StartCol" clearable size="small" placeholder="请输入表格内的列数(数字:例如:A:1,B:2,C:3...)" />
        </el-form-item>
        <el-form-item label="表头结束列" prop="EndCol">
          <el-input v-model="dataObject.EndCol" clearable size="small" placeholder="请输入表格内的列数(数字:例如:A:1,B:2,C:3...)" />
        </el-form-item>
        <el-form-item label="内容结束行" prop="ContentEndRow">
          <el-input v-model="dataObject.ContentEndRow" clearable size="small" placeholder="请输入内容结束行" />
        </el-form-item>
        <el-form-item label="所属年月所在列" prop="MedicalPeriod">
          <el-input v-model="dataObject.MedicalPeriod" clearable size="small" placeholder="请输入所属年月所在列" />
        </el-form-item>
        <el-form-item label="险种排列方式" prop="MedicalType" class="State">
          <el-radio-group v-model="dataObject.MedicalType">
            <el-radio label="0">纵向</el-radio>
            <el-radio label="1">横向</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="险种类型所在列" prop="MedicalTypeIndex" v-if="dataObject.MedicalType == '0'">
          <el-input v-model="dataObject.MedicalTypeIndex" clearable size="small" placeholder="请输入险种类型所在列" />
        </el-form-item>
        <el-form-item label="缴费类型所在列" prop="PayType" v-if="dataObject.MedicalType == '0'">
          <el-input v-model="dataObject.PayType" clearable size="small" placeholder="请输入缴费类型所在列" />
        </el-form-item>
        <el-form-item label="缴交对象排列方式" prop="PayerType" class="State">
          <el-radio-group v-model="dataObject.PayerType">
            <el-radio label="0">纵向</el-radio>
            <el-radio label="1">横向</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="缴交对象所在列" prop="PayerIndex" v-if="dataObject.PayerType == '0'">
          <el-input v-model="dataObject.PayerIndex" clearable size="small" placeholder="请输入缴交对象所在列" />
        </el-form-item>
        <el-form-item label="身份证/个人编号所在列" prop="MedicalCode">
          <el-input v-model="dataObject.MedicalCode" clearable size="small" placeholder="请输入身份证/个人编号所在列" />
        </el-form-item>
        <el-form-item label="医保个人编号所在列">
          <el-input v-model="dataObject.AccountColumn" clearable size="small" placeholder="请输入医保个人编号所在列" />
        </el-form-item>
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
import { GetInsuranceExcelModel, GetBfInsuranceFundPageList, GetMedicalBatchInfoByBfInsuranceFundId } from '@/api/CompensationServiceManagement.js'
import SupperUploader from '@/utils/SupperUploader'
import { MenuIdDate, uuid, copy } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'ImportSocialSecurity',
  props: ['showImportSocialSecurity'],
  data () {
    return {
      dataObject: {
        BfInsuranceFundId: '',
        SheetName: '',
        StartRow: '',
        EndRow: '',
        StartCol: '',
        EndCol: '',
        ContentEndRow: '',
        file: '',
        MedicalType: '0',
        MedicalTypeIndex: '',
        PayerType: '0',
        PayType: '',
        PayerIndex: '',
        MedicalCode: '',
        MedicalPeriod: '',
        MedicalUrl: '',
        PeriodYearMonth: '',
        AccountColumn: ''
      },
      rules: {
        MedicalUrl: [
          { required: true, message: '请上传导入表格', trigger: 'blur' }
        ],
        BfInsuranceFundId: [
          { required: true, message: '请选择公司社保账号', trigger: 'change' }
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
        MedicalTypeIndex: [
          { required: true, message: '请输入险种类型所在列', trigger: 'blur' }
        ],
        PayerIndex: [
          { required: true, message: '请输入缴交对象所在列', trigger: 'blur' }
        ],
        MedicalPeriod: [
          { required: true, message: '请输入所属年月所在列', trigger: 'blur' }
        ],
        ContentEndRow: [
          { required: true, message: '请输入内容结束行', trigger: 'blur' }
        ],
      },
      loading: false,
      showSocialSecurity: false,
      uploadLoading: false,
      BfInsuranceList: []
    }
  },
  watch: {
    showImportSocialSecurity (newvalue, oldvalue) {
      this.showSocialSecurity = newvalue
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
          Type: 2,
          PageIndex: 1,
          PageSize: 99,
          menuid: MenuIdDate(),
          operationcode: 1
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
            this.dataObject.MedicalUrl = uploader.urlResult.VideoUrl
            this.dataObject.file = files
            this.$refs.ruleForm.clearValidate('MedicalUrl')
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
          this.$emit('ImportSocialSecuritySave', this.dataObject)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    //选中获取信息
    SelectValue (val) {
      if (val) {
        let obj = {
          menuid: MenuIdDate(),
          operationcode: 1,
          BfInsuranceFundId: val
        }
        GetMedicalBatchInfoByBfInsuranceFundId(qs.stringify(obj)).then(response => {
          if (response.IsSuccess && response.Data) {
            Object.keys(this.dataObject).forEach(key => {
              console.log(key);
              if (key != 'BfInsuranceFundId' && key != 'MedicalUrl' && key != 'PeriodYearMonth' && key != 'file') {
                this.dataObject[key] = response.Data[key]
              }
            })
            this.dataObject.MedicalType += ''
            this.dataObject.PayerType += ''
          }
        })
      }
    },
    //关闭导入事件
    close () {
      this.dataObject = this.$options.data().dataObject
      this.$emit('closeImportSocialSecurity', false)
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
    width: 100%;
    .el-radio-group {
      display: block;
      margin-top: 40px;
      line-height: 24px;
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