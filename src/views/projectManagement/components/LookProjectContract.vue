//查看项目合同
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="查看项目合同" class="dialog-box" append-to-body :visible.sync="ContractSHow" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" class="forms-Compensation">
        <el-form-item label="合同金额" prop="Amount">
          <el-input v-model="dataObject.Amount+'￥'" disabled size="small" />
        </el-form-item>
        <el-form-item label="合同起始日期" prop="StartDate" class="Date">
          <el-date-picker v-model="dataObject.StartDate" value-format="yyyy-MM-dd" disabled type="date" placeholder="请选择起始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同终止日期" prop="ExpireDate" class="Date">
          <el-date-picker v-model="dataObject.ExpireDate" value-format="yyyy-MM-dd" disabled type="date" placeholder="请选择终止日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签订日期" prop="SignDate" class="Date">
          <el-date-picker v-model="dataObject.SignDate" value-format="yyyy-MM-dd" disabled type="date" placeholder="请选择签订日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同签订模式" prop="SignType" class="State">
          <p v-if="dataObject.SignType =='0'">电子版</p>
          <p v-else>纸质版</p>
        </el-form-item>
        <!-- <el-form-item label="存档状态" prop="Status" class="State">
          <p v-if="dataObject.Status =='0'">未存档</p>
          <p v-else>已存档</p>
        </el-form-item> -->
        <el-form-item label="合同附件" prop="CommisionType" class="attachment">
          <div class="upload">
            <div v-if="dataObject.Name" class="files" @mouseenter="fileShow" @mouseleave="filenoShow">
              <span class="filestype">{{filestype}}</span>
              <p>{{dataObject.Name}}</p>
              <div v-show="optionShow" class="option-button">
                <a @click="preview(dataObject)">
                  <svg-icon icon-class="replace" class-name="svg-a" />预览
                </a>
                <a @click="downloadFile(dataObject)">
                  <svg-icon icon-class="download" class-name="svg-a" />下载
                </a>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <PreviewFile :isImg="isImg" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>
<script>
import { GetProjectContract } from '@/api/projectManagement.js'
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import { MenuIdDate } from '@/utils/CustomValidation'
import qs from 'qs'
export default {
  name: 'LookProjectContract',
  props: ['LookContract', 'ContractID'],
  components: {
    PreviewFile
  },
  data () {
    return {
      ContractSHow: false,
      dataObject: {},
      filestype: '',
      optionShow: false,
      isImg: 1,
      iframeShow: false,
      previewFileUrl: ''
    }
  },
  watch: {
    LookContract (newvalue, oldvalue) {
      this.ContractSHow = newvalue
      this.getContdetail(this.ContractID)
    }
  },
  methods: {
    getContdetail (Id) {
      let obj = {
        Id: Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      GetProjectContract(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.dataObject = response.Data
          this.filestype = this.dataObject.Attachment.slice(this.dataObject.Attachment.lastIndexOf('.') + 1).toUpperCase()
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    close () {
      this.$emit('closeLookContract', false)
    },
    // 预览
    preview (data) {
      if (data.Attachment) {
        const ext = data.Attachment.slice(data.Attachment.lastIndexOf('.') + 1).toLowerCase()
        if (ext == 'pdf') {
          this.isImg = 2
          this.previewFileUrl = data.Attachment
        } else if (ext == 'doc' || ext == 'docx') {
          this.isImg = 3
          this.previewFileUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + data.Attachment
        } else {
          this.isImg = 1
          this.previewFileUrl = data.Attachment
        }
        this.iframeShow = true
      } else {
        this.iframeShow = false
        this.$message({
          message: '该合同没有上传附件',
          type: 'error'
        })
      }
    },
    //下载文件
    downloadFile (data) {
      if (data.Attachment) {
        window.open(data.Attachment)
      } else {
        this.$message({
          message: '该合同没有上传合同文件',
          type: 'error'
        })
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
    closeFileShow (val) {
      this.iframeShow = val
    },
  }
}
</script>
<style lang="scss" scoped>
.forms-Compensation {
  /deep/ .Compensation-header {
    display: inline-block;
    input {
      background: $erinputbgc;
      border: none;
      height: 40px;
      line-height: 40px;
    }
  }
  /deep/ .attachment {
    width: 100%;
    .el-form-item__label {
      display: block;
      text-align: left;
      float: initial;
    }
  }
  /deep/ .el-form-item {
    min-width: 400px;
    margin-bottom: 0px;
    .el-form-item__label {
      width: 50%;
      text-align: left;
      line-height: 24px;
      color: #666666;
    }

    .el-form-item__content {
      margin-left: 0;
      width: 400px;
      .el-select {
        display: block;
        /deep/ .el-input__suffix {
          top: 20px;
        }
      }
    }
  }
  /deep/ .Date {
    .el-date-editor {
      min-width: 400px;
    }
    .el-input__inner {
      border: none;
      background: $erinputbgc;
    }
  }
  /deep/ .State {
    display: inline-block;
    p {
      margin-top: 24px;
      margin-bottom: 0;
    }
  }
  /deep/ .upload {
    position: relative;
    height: 120px;
    margin-bottom: 10px;
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
  .prompt {
    float: left;
    width: 300px;
    font-size: 14px;
    color: #999999;
    margin-top: 20px;
    margin-left: 17px;
  }
  .footer-button {
    margin: 100px 0 200px 0;
    text-align: center;
    button {
      margin: 0 12px;
    }
  }
}
</style>