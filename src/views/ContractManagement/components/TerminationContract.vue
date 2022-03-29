<!-- 终止合同弹窗 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="上传终止协议附件" class="dialog-box" append-to-body :visible.sync="showTermination" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms-box">
        <el-form-item label="终止协议文件" class="attachment" prop="Attachment">
          <div class="upload">
            <div v-if="dataObject.fileName" class="files" @mouseenter="fileShow" @mouseleave="filenoShow" v-loading="uploadLoading">
              <span class="filestype">{{filestype}}</span>
              <p>{{dataObject.fileName}}</p>
              <div v-if="optionShow" class="option-button">
                <a>
                  <svg-icon icon-class="replace" class-name="svg-a" />替换
                  <input type="file" accept=".doc,.docx,.pdf" name="file" class="smaellFile replaceFile" @change="uploadFile">
                </a>
                <a @click="delFiles">
                  <svg-icon icon-class="del" class-name="svg-a" />删除</a>
              </div>
            </div>
            <div class="files" v-else v-loading="uploadLoading">
              <img src="@/assets/upload.png">
              <input type="file" accept=".doc,.docx,.pdf" name="file" class="smaellFile" @change="uploadFile">
            </div>
            <div class="prompt">
              注：当前位置仅支持导入Word、PDF
            </div>
          </div>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button round size="small" @click="dialogtrue('ruleForm')">终止合同</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import SupperUploader from '@/utils/SupperUploader'
import { MenuIdDate, uuid, copy } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'TerminationContract',
  props: ['showTerminationContract'],
  data () {
    return {
      dataObject: {
        fileName: '',
        Attachment: ''
      },
      showTermination: false,
      filestype: '',
      optionShow: false,
      uploadLoading: false,
      Formrules: {
        Attachment: [
          { required: true, message: '请上传终止协议文件', trigger: 'change' }
        ],
      }
    }
  },
  watch: {
    showTerminationContract (newvalue, oldvalue) {
      this.showTermination = newvalue
      this.dataObject = this.$options.data().dataObject
    }
  },
  created () {

  },
  methods: {
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
            this.dataObject.Attachment = uploader.urlResult.VideoUrl
            this.dataObject.fileName = files.name
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
          this.$emit('TerminationContractSave', this.dataObject)
        } else {
          this.$message({
            message: '请完善终止协议附件',
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
      this.dataObject.fileName = ''
    },
    close () {
      this.dataObject.Attachment = ''
      this.dataObject.fileName = ''
      this.$emit('closeTerminationContract', false)
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