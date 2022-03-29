//上传项目合同
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box" append-to-body :visible.sync="showContract" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-form-item label="合同金额" prop="Amount">
          <el-input v-model="dataObject.Amount" placeholder="请输入合同金额" size="small">
            <svg-icon slot="suffix" icon-class="money" class-name="way" />
          </el-input>
        </el-form-item>
        <el-form-item label="合同起始日期" prop="StartDate" class="Date">
          <el-date-picker v-model="dataObject.StartDate" value-format="yyyy-MM-dd" :picker-options="pickerOptions1" type="date" placeholder="请选择起始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同终止日期" prop="ExpireDate" class="Date">
          <el-date-picker v-model="dataObject.ExpireDate" value-format="yyyy-MM-dd" :picker-options="pickerOptions2" type="date" placeholder="请选择终止日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签订日期" prop="SignDate" class="Date">
          <el-date-picker v-model="dataObject.SignDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择签订日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同签订模式" prop="SignType" class="State">
          <el-radio-group v-model="dataObject.SignType">
            <el-radio v-for="(item,index) in CommisionRuleEnumCommisionBase" :key="index" :label="item.value">{{item.describe}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="存档状态" prop="Status" class="State">
          <el-radio-group v-model="dataObject.Status">
            <el-radio v-for="(item,index) in StatusList" :key="index" :label="item.value">{{item.describe}}</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="合同附件" prop="CommisionType" class="attachment">
          <div class="upload">
            <div :title="dataObject.Name" v-if="dataObject.Name" class="files" @mouseenter="fileShow" @mouseleave="filenoShow" v-loading="uploadLoading">
              <span class="filestype">{{filestype}}</span>
              <p>{{dataObject.Name}}</p>
              <div v-if="optionShow" class="option-button">
                <a>
                  <svg-icon icon-class="replace" class-name="svg-a" />替换
                  <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx" name="file" class="replaceFile" @change="uploadFile">
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
              上传项目合同附件\电子档或者纸质版扫描文档
              上传格式为PNG、JPG、Word、PDF、XLS
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
import { uuid, copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
import axios from 'axios'
export default {
  name: 'addContract',
  props: ['showAddContract', 'title', 'tempData'],
  data () {
    const _this = this
    return {
      pickerOptions1: {
        disabledDate: (time) => {
          if (_this.dataObject.ExpireDate) {
            const data = new Date(_this.dataObject.ExpireDate)
            data.setDate(data.getDate() - 1)
            return time.getTime() > data
          } else {
            return false
          }
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          if (_this.dataObject.StartDate) {
            const data = new Date(_this.dataObject.StartDate)
            data.setDate(data.getDate())
            return time.getTime() < data
          } else {
            return false
          }
        }
      },
      dataObject: {
        Id: '',
        Name: '',
        Amount: '',
        StartDate: '',
        ExpireDate: '',
        SignDate: '',
        SignType: '0',
        Attachment: '',
        Status: '0'
      },
      StatusList: [{
        value: '0',
        describe: '未存档'
      },
      {
        value: '1',
        describe: '已存档'

      }],
      CommisionRuleEnumCommisionBase: [
        {
          value: '0',
          describe: '电子版'
        },
        {
          value: '1',
          describe: '纸质版'
        }
      ],//签订模式
      showContract: false,
      filestype: '',
      optionShow: false,
      uploadLoading: false,
      Formrules: {}
    }
  },
  watch: {
    showAddContract (newvalue, oldvalue) {
      this.showContract = newvalue
      this.dataObject = this.$options.data().dataObject
      if (this.title == '添加项目合同信息') {

      } else if (this.title == '修改项目合同信息') {
        this.dataObject = copy(this.tempData)
        this.dataObject.SignType += ''
        this.dataObject.Status += ''
        if (this.dataObject.Attachment) {
          this.filestype = this.dataObject.Attachment.slice(this.dataObject.Attachment.lastIndexOf('.') + 1).toUpperCase()
        }
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
        if (ext == 'doc' || ext == 'docx' || ext == 'pdf' || ext == 'xls' || ext == 'xlsx') {
          uploader = new SupperUploader(process.env.VUE_APP_BASE_API_UPLOAD, files, uuid(), (2 * 1024 * 1024))
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              this.uploadLoading = false
              this.dataObject.Attachment = uploader.urlResult.VideoUrl
              this.dataObject.Name = files.name
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
                this.dataObject.Name = files.name
                this.filestype = ext.toUpperCase()
                e.target.value = []
              }
            })
        }
      }
    },
    dialogtrue (form) {
      // 调用接口,保存数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.dataObject.Attachment = this.dataObject.Attachment
          this.$emit('ProjectContractSave', this.dataObject)
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
      this.dataObject.Name = ''
    },
    close () {
      this.$emit('closeProjectContract', false)
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