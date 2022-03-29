//添加合同模板
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showContract" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-form-item label="模板名称" prop="ContractName">
          <el-input v-model="dataObject.ContractName" clearable size="small" />
        </el-form-item>
        <el-form-item label="上传文档" clearable prop="FileUrl" class="File-item">
          <el-button type="primary" class="upload-bts" :loading="uploadLoading">上传</el-button>
          <input type="file" accept=".doc,.docx,.pdf" name="file" class="ButtonFile" @change="uploadFile">
          <el-input v-model="dataObject.FileUrl" disabled size="small" />
        </el-form-item>
        <el-form-item label="适用业务" prop="BusinessType">
          <el-select v-model="dataObject.BusinessType" clearable placeholder="请选择适用业务" size="mini" class="select-input">
            <el-option v-for="item in BusinessTypeList" :key="item.describe" :label="item.describe" :value="item.value" />
          </el-select>
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
import { GetContractTemplateBusinessType } from '@/api/BusinessSet.js'
import SupperUploader from '@/utils/SupperUploader'
import { MenuIdDate, uuid, copy } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'addContract',
  props: ['showAddContract', 'title', 'tempData'],
  data () {
    return {
      dataObject: {
        Id: '',
        BusinessType: '',
        FileUrl: '',
        Status: '1'
      },
      BusinessTypeList: [],
      showContract: false,
      uploadLoading: false,
      Formrules: {
        ContractName: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        FileUrl: [
          { required: true, message: '请上传模板文档', trigger: 'blur' }
        ],
        BusinessType: [
          { required: true, message: '请选择适用业务', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    showAddContract (newvalue, oldvalue) {
      this.showContract = newvalue
      this.dataObject = this.$options.data().dataObject
      if (this.title == '添加合同模板') {

      } else if (this.title == '修改合同模板') {
        this.dataObject = this.tempData
        this.dataObject.Status += ''
      }
    }
  },
  created () {
    this.getType()

  },
  methods: {
    //获取模板业务类型
    getType () {
      let data = {
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetContractTemplateBusinessType(qs.stringify(data)).then(response => {
        this.BusinessTypeList = response
      })
    },
    uploadFile (e) {
      var uploader
      const files = e.target.files[0]
      var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
      if (ext == 'doc' || ext == 'docx' || ext == 'pdf') {
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
            this.dataObject.FileUrl = uploader.urlResult.VideoUrl
            this.$refs.ruleForm.clearValidate('FileUrl')
            e.target.value = []
          }
        })
      }
    },
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('ContractSave', this.dataObject)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    //关闭
    close () {
      this.$emit('closeContract', false)
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
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      label {
        &:nth-child(1) {
          margin-right: 180px;
        }
      }
    }
  }
}
</style>