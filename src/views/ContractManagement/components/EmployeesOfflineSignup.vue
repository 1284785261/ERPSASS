<!-- 员工合同在线签署 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="电子签在线签署信息" class="dialog-box" append-to-body :visible.sync="showEmployees" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-form-item label="员工姓名" prop="StaffName">
          <el-input v-model="dataObject.StaffName" disabled placeholder=" " size="small" />
        </el-form-item>
        <el-form-item label="合同类型" prop="TypeText">
          <el-input v-model="dataObject.TypeText" disabled placeholder=" " size="small" />
        </el-form-item>
        <el-form-item label="合同工资" prop="Salary">
          <el-input v-model="dataObject.Salary" disabled placeholder=" " size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="签约联系人手机号" prop="Mobile">
          <el-input v-model="dataObject.Mobile" placeholder="请输入签约联系人手机号" size="small" />
        </el-form-item>
        <el-form-item label="甲方盖章关键字(*)" prop="PartAKey">
          <el-input v-model="dataObject.PartAKey" placeholder="请输入甲方盖章关键字" size="small" />
        </el-form-item>
        <el-form-item label="乙方盖章关键字(*)" prop="PartBKey">
          <el-input v-model="dataObject.PartBKey" placeholder="请输入乙方盖章关键字" size="small" />
        </el-form-item>
        <el-form-item label="合同附件" prop="Attachment" class="attachment">
          <div class="upload">
            <div :title="fileName" class="files" @mouseenter="visible=!visible" @mouseleave="visible=!visible">
              <span class="filestype">{{fileType}}</span>
              <p>{{fileName}}</p>
              <div v-show="visible" class="option-button">
                <a @click="preview()">
                  <svg-icon icon-class="replace" class-name="svg-a" />预览
                </a>
                <a @click="downloadFile()">
                  <svg-icon icon-class="download" class-name="svg-a" />下载
                </a>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round size="small" @click="dialogtrue('ruleForm')">在线签署</el-button>
      </div>
    </el-dialog>
    <PreviewFile :isImg="isImg" :iframeShow="iframeShow" titlename="预览合同" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>
<script>
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import SupperUploader from '@/utils/SupperUploader'
import { GetCompanyPageList } from '@/api/CustomerManagement.js'
import { GetProjectList } from '@/api/projectManagement.js'
import { uuid, copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'EmployeesOfflineSigning',
  props: ['showEmployeesOfflineUp', 'tempData'],
  components: {
    PreviewFile
  },
  data () {
    return {
      dataObject: {
        Id: '',
        StaffName: '',
        TypeText: '',
        Salary: '',
        Mobile: '',
        PartAKey: '',
        PartBKey: '',
        Attachment: '',
      },
      loading: false,
      showEmployees: false,
      fileType: '',
      fileName: '',
      visible: false,
      isImg: 1,
      iframeShow: false,
      previewFileUrl: '',
      Formrules: {
        Mobile: [
          { required: true, message: '请输入签约联系人手机号', trigger: 'blur' }
        ],
        PartAKey: [
          { required: true, message: '请输入甲方盖章关键字', trigger: 'blur' }
        ],
        PartBKey: [
          { required: true, message: '请输入乙方盖章关键字', trigger: 'blur' }
        ],
        Attachment: [
          { required: true, message: '合同附件不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    showEmployeesOfflineUp (newvalue, oldvalue) {
      this.showEmployees = newvalue
      console.log(this.tempData)
      this.dataObject.Id = this.tempData.Id
      this.dataObject.StaffName = this.tempData.StaffName
      this.dataObject.TypeText = this.tempData.TypeText
      this.dataObject.Salary = this.tempData.Salary
      this.dataObject.Mobile = this.tempData.Mobile
      this.dataObject.Attachment = this.tempData.Attachment
      this.fileName = this.tempData.Attachment
      this.fileType = this.fileName.slice(this.fileName.lastIndexOf('.') + 1).toUpperCase()
    }
  },
  created () {

  },
  methods: {
    // 预览
    preview () {
      if (this.dataObject.Attachment) {
        const ext = this.dataObject.Attachment.slice(this.dataObject.Attachment.lastIndexOf('.') + 1).toLowerCase()
        if (ext == 'pdf') {
          this.isImg = 2
          this.previewFileUrl = this.dataObject.Attachment
        } else if (ext == 'doc' || ext == 'docx') {
          this.isImg = 3
          this.previewFileUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + this.dataObject.Attachment
        } else {
          this.isImg = 1
          this.previewFileUrl = this.dataObject.Attachment
        }
        this.iframeShow = true
      }
    },
    // 下载
    downloadFile () {
      window.open(this.dataObject.Attachment)
    },
    closeFileShow (val) {
      this.iframeShow = val
    },
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          // this.dataObject.Attachment = this.dataObject.Attachment
          console.log(this.dataObject)
          this.$emit('EmployeesOfflineSaveUp', this.dataObject) 
        } else {
          this.$message({
            message: '请按要求填写表单内容',
            type: 'error'
          })
          return false
        }
      })
    },
    //删除文件
    delFiles () {
      this.dataObject.Attachment = ''
      this.filesname = ''
      this.filestype = ''
    },
    close () {
      this.$emit('closeEmployeesOfflineUp', false)
    }
  }
}
</script>
<style lang="scss" scoped>
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
  /deep/ .State {
    display: inline-block;
    .el-radio-group {
      display: block;
      margin-top: 50px;
      label {
        display: inline-block;
        &:nth-child(1) {
          margin-right: 100px;
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
  /deep/ .attachment {
    .el-form-item__label {
      display: block;
      text-align: left;
      float: initial;
    }
    /deep/ .upload {
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
    }
  }
  .prompt {
    float: left;
    width: 200px;
    font-size: 14px;
    color: #999999;
    margin-top: 20px;
    margin-left: 17px;
    line-height: 30px;
  }
}
</style>