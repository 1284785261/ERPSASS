//导入六项附加扣除明细
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="导入六项附加扣除明细" class="dialog-box" append-to-body :visible.sync="showSixtoDeduct" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="rules" class="forms">
        <el-form-item label="选择要导入的表格" clearable prop="SixtoUrl" class="File-item">
          <el-button type="primary" class="upload-bts" :loading="uploadLoading">上传</el-button>
          <input type="file" accept=".xls,.xlsx," name="file" class="ButtonFile" @change="uploadFile">
          <el-input v-model="dataObject.SixtoUrl" disabled size="small" />
        </el-form-item>
        <a class="downloadBtn" @click="DownloadTemplate">点击下载模板</a>
        <el-form-item label="所属年月" prop="YearMonth" class="Date">
          <el-date-picker v-model="dataObject.YearMonth" value-format="yyyy-MM" type="month" placeholder="请选择所属年月" />
        </el-form-item>
        <el-form-item label="入账年月" prop="PeriodYearMonth" class="Date">
          <el-date-picker v-model="dataObject.PeriodYearMonth" value-format="yyyy-MM" type="month" placeholder="请选择入账年月" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button round class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button round class="erpbtn" size="small" @click="dialogtrue('ruleForm')">开始导入</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetPersonalTaxDeductExcelModel } from '@/api/CompensationServiceManagement.js'
import SupperUploader from '@/utils/SupperUploader'
import { MenuIdDate, uuid, copy } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'ImportSixtoDeduct',
  props: ['showImportSixtoDeduct'],
  data () {
    return {
      dataObject: {
        SixtoUrl: '',
        file: '',
        PeriodYearMonth: '',
        YearMonth: ''
      },
      uploadLoading: false,
      rules: {
        SixtoUrl: [
          { required: true, message: '请上传导入表格', trigger: 'blur' }
        ],
        YearMonth: [
          { required: true, message: '请选择所属年月', trigger: 'change' }
        ],
        PeriodYearMonth: [
          { required: true, message: '请选择入账年月', trigger: 'change' }
        ]
      },
      showSixtoDeduct: false
    }
  },
  watch: {
    showImportSixtoDeduct (newvalue, oldvalue) {
      this.showSixtoDeduct = newvalue
    }
  },
  created () {
  },
  methods: {
    //模板下载
    DownloadTemplate () {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetPersonalTaxDeductExcelModel(qs.stringify(obj)).then(response => {
        if (response.IsSuccess && response.Data) {
          window.open(response.Data)
        }
      })
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
        console.log(uploader);
        uploader.UploadFun(() => {
          console.log(uploader.urlResult);
          if (uploader.urlResult) {
            this.uploadLoading = false
            this.dataObject.SixtoUrl = uploader.urlResult.VideoUrl
            this.dataObject.file = files
            this.$refs.ruleForm.clearValidate('SixtoUrl')
            e.target.value = []
          }
        })
      }
    },
    //导入六项扣除明细
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('SaveImportSixtoDeduct', this.dataObject)
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
      this.dataObject.SixtoUrl = ''
      this.$emit('closeImportSixtoDeduct', false)
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
  .downloadBtn {
    color: #1588f8;
  }
}
</style>