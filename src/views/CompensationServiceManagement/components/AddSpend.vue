//添加挂账支出
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="dialogTitle" class="dialog-box" append-to-body :visible.sync="showSpend" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-form-item label="科目名称" prop="Subject">
          <el-input v-model="dataObject.Subject" clearable class="select-input" placeholder="请输入挂账名称" />
        </el-form-item>
        <el-form-item label="费用金额" prop="Fee">
          <el-input v-model="dataObject.Fee" clearable class="select-input" placeholder="请输入费用金额">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="所属年月" prop="YearMonth" class="Date">
          <el-date-picker v-model="dataObject.YearMonth" type="month" placeholder="请选择所属年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="费用说明" prop="Remark" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="dataObject.Remark" size="small" />
        </el-form-item>
        <el-form-item label="费用明细附件" prop="CommisionType" class="attachment">
          <div class="upload">
            <div v-if="fileName" class="files" @mouseenter="fileShow" @mouseleave="filenoShow" v-loading="uploadLoading">
              <span class="filestype">{{filestype}}</span>
              <p>{{fileName}}</p>
              <div v-if="optionShow" class="option-button">
                <a>
                  <svg-icon icon-class="replace" class-name="svg-a" />替换
                  <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx" name="file" class="smaellFile replaceFile" @change="uploadFile">
                </a>
                <a @click="delFiles">
                  <svg-icon icon-class="del" class-name="svg-a" />删除</a>
              </div>
            </div>
            <div class="files" v-else v-loading="uploadLoading">
              <img src="../../../assets/upload.png">
              <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx" name="file" class="smaellFile" @change="uploadFile">
            </div>
            <div class="prompt">
              上传费用明细附件\电子档或者纸质版扫描文档
              上传格式为PNG、JPG、Word、PDF、XLS
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button class="erpbtn" size="small" @click="dialogtrue('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetCompanyPageList } from '@/api/CustomerManagement.js'
import { GetProjectList } from '@/api/projectManagement.js'
import SupperUploader from '@/utils/SupperUploader'
import { MenuIdDate, showLoading, hideLoading, uuid } from '@/utils/CustomValidation'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'AddSpend',
  props: {
    showAddSpend: {
      type: Boolean,
    },
    dialogTitle: {
      type: String,
      default: '添加挂账支出'
    },
    tempID: {
      type: Number,
    },
  },
  data () {
    return {
      showSpend: false,
      Formrules: {},
      dataObject: {
        Id: '',
        Year: '',
        Month: '',
        YearMonth: '',
        Subject: '',
        Remark: '',
        Fee: '',
        Attachment: '',
      },
      fileName: '',
      filestype: '',
      optionShow: false,
      uploadLoading: false
    }
  },
  watch: {
    showAddSpend (newvalue, oldvalue) {
      this.showSpend = newvalue
      this.dataObject = this.$options.data().dataObject
      this.dataObject.Id = this.tempID
    }
  },
  created () {
  },
  methods: {
    uploadFile (e) {
      var uploader
      const files = e.target.files[0]
      var ext = files.name.slice(files.name.lastIndexOf('.') + 1).toLowerCase()
      if (ext == 'doc' || ext == 'docx' || ext == 'pdf' || ext == 'png' || ext == 'jpg' || ext == 'jpeg' || ext == 'xls' || ext == 'xlsx') {
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
        if (ext == 'doc' || ext == 'docx' || ext == 'pdf' || ext == 'doc' || ext == 'docx') {
          uploader = new SupperUploader(process.env.VUE_APP_BASE_API_UPLOAD, files, uuid(), (2 * 1024 * 1024))
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              this.uploadLoading = false
              this.dataObject.Attachment = uploader.urlResult.VideoUrl
              this.fileName = files.name
              this.filestype = ext.toUpperCase()
              e.target.value = []
            }
          })
        } else {
          let datas = new FormData();
          datas.append('file', files)
          datas.append('message', "{ImageStreamName:'file',BussinessType:0}");
          axios.post(process.env.VUE_APP_BASE_API_UPLOAD, datas)
            .then(res => {
              if (res.data.State) {
                this.uploadLoading = false
                this.dataObject.Attachment = res.data.ImageUrl
                this.fileName = files.name
                this.filestype = ext.toUpperCase()
                e.target.value = []
              }
            })
        }
      }
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
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          let myDate = new Date(this.dataObject.YearMonth)
          this.dataObject.Year = myDate.getFullYear()
          this.dataObject.Month = myDate.getMonth() + 1
          this.$emit('AddSpendSave', this.dataObject)
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
      this.$emit('closeAddSpendSave', false)
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
  /deep/ .Date {
    .el-date-editor {
      width: 100%;
    }
    .el-input__inner {
      border: none;
      background: $erinputbgc;
    }
  }
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      label {
        &:nth-child(1) {
          margin-right: 120px;
        }
      }
    }
  }
  /deep/ .attachment {
    .prompt {
      float: left;
      width: 200px;
      font-size: 14px;
      color: #999999;
      line-height: 30px;
    }
  }
}
</style>