<!-- 添加/修改原始凭证模板 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showCredentials" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms-box">
        <el-form-item label="模板名称" prop="Name">
          <el-input v-model="dataObject.Name" clearable class="select-input" placeholder="请输入模板名称" />
        </el-form-item>
        <el-form-item label="模板类型" prop="TempType">
          <el-select v-model="dataObject.TempType" disabled clearable placeholder="请选择模板类型" class="select-input">
            <el-option v-for="item in ProveTypeList" :key="item.value" :label="item.describe" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="使用状态" prop="Status" class="State">
          <el-radio-group v-model="dataObject.Status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="原始凭证模板文件" class="attachment" prop="Attachment">
          <div class="upload">
            <div v-if="fileName" class="files" @mouseenter="fileShow" @mouseleave="filenoShow" v-loading="uploadLoading">
              <span class="filestype">{{filestype}}</span>
              <p>{{fileName}}</p>
              <div v-if="optionShow" class="option-button">
                <a>
                  <svg-icon icon-class="replace" class-name="svg-a" />替换
                  <input type="file" accept=".xls,.xlsx" name="file" class="smaellFile replaceFile" @change="uploadFile">
                </a>
                <a @click="delFiles">
                  <svg-icon icon-class="del" class-name="svg-a" />删除</a>
              </div>
            </div>
            <div class="files" v-else v-loading="uploadLoading">
              <img src="@/assets/upload.png">
              <input type="file" accept=".xls,.xlsx" name="file" class="smaellFile" @change="uploadFile">
            </div>
            <div class="prompt">
              注：当前位置仅支持导入XLS、XLSX
            </div>
          </div>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import SupperUploader from '@/utils/SupperUploader'
import { GetContractTemplatePageList, AddContractTemplate1, DelContractTemplate1, EditContractTemplate, GetFileTemplateLogPageList } from '@/api/FileTemplateManagement.js'
import { MenuIdDate, uuid, copy } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'addContract',
  props: ['showEditCredentials', 'title', 'dataCredentials'],
  data () {
    const _this = this
    return {
      dataObject: {
        Id: '',
        Name: '',
        TempType: 1,
        Status: '1',
        Attachment: ''
      },
      ProveTypeList: [{ value: 1, describe: "报销单原始凭证" }],//模板类型
      showCredentials: false,
      fileName: '',
      filestype: '',
      optionShow: false,
      uploadLoading: false,
      Formrules: {
        Name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        TempType: [
          { required: true, message: '请输入合同类型', trigger: 'change' }
        ],
        Status: [
          { required: true, message: '', trigger: 'change' }
        ],
        Attachment: [
          { required: true, message: '请上传原始凭证模板文件', trigger: 'change' }
        ],
      }
    }
  },
  watch: {
    showEditCredentials (newvalue, oldvalue) {
      this.showCredentials = newvalue
      this.dataObject = this.$options.data().dataObject
      if (this.title == '编辑原始凭证模板') {
        this.dataObject = {
          Id: this.dataCredentials.Id,
          Name: this.dataCredentials.Name,
          TempType: this.dataCredentials.TempTypeValue,
          Status: this.dataCredentials.Status + '',
          Attachment: this.dataCredentials.Attachment,
        }
        this.fileName = this.dataCredentials.Attachment
        this.filestype = this.dataCredentials.Attachment.slice(this.dataCredentials.Attachment.lastIndexOf('.') + 1).toUpperCase()
      } else {

      }
    }
  },
  created () {

  },
  methods: {
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
            this.dataObject.Attachment = uploader.urlResult.VideoUrl
            this.fileName = files.name
            this.filestype = ext.toUpperCase()
            this.$refs.ruleForm.clearValidate(['Attachment'])
            e.target.value = []
          }
        })
      }
    },
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('EditCredentialsSave', this.dataObject)
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    // 移入文件显示操作
    fileShow () {
      this.optionShow = true
    },
    // 移出文件隐藏操作
    filenoShow () {
      this.optionShow = false
    },
    //删除文件
    delFiles () {
      this.dataObject.Attachment = ''
      this.fileName = ''
    },
    close () {
      this.dataObject.Attachment = ''
      this.fileName = ''
      this.$emit('CloseEditCredentials', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms-box {
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
  /deep/ .attachment {
    .el-form-item__label {
      display: block;
      text-align: left;
      float: initial;
    }
    .upload {
      position: relative;
      height: 120px;
      img {
        position: absolute;
        left: 0;
        top: 0;
      }
      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 160px;
        height: 120px;
        opacity: 0;
        cursor: pointer;
        &::-webkit-file-upload-button {
          height: 0;
        }
      }
      .files {
        width: 160px;
        height: 120px;
        background: #f2f3fb;
        border-radius: 8px;
        text-align: center;
        position: relative;
        float: left;
        .filestype {
          display: inline-block;
          width: 56px;
          height: 32px;
          background: #1588f8;
          font-size: 14px;
          color: #fff;
          border-radius: 8px;
          text-align: center;
          line-height: 32px;
          position: absolute;
          left: 0;
          top: 0;
        }
        p {
          width: 110px;
          position: absolute;
          top: 38%;
          left: 50%;
          font-size: 14px;
          line-height: 18px;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          display: block;
          text-align: center;
        }
        .option-button {
          width: 100%;
          height: 30px;
          position: absolute;
          bottom: 0;
          left: 0;
          background: #909198;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          a {
            width: 50%;
            display: inline-block;
            line-height: 30px;
            text-align: center;
            height: 30px;
            font-size: 14px;
            color: #fff;
            vertical-align: top;
            .svg-a {
              margin-right: 10px;
              font-size: 14px;
            }
            &:hover {
              color: #1588f8;
            }
          }
        }
      }
      .prompt {
        float: left;
        width: 200px;
        font-size: 14px;
        color: #999999;
        margin-left: 17px;
        line-height: 30px;
      }
    }
  }
}
</style>