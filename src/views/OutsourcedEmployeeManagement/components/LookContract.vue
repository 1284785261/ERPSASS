//查看员工合同
<template>
  <div class="Compensation-box">
    <div class="From-box">
      <BreadCrumb :url-list="urlList" />
      <div class="From-box-content">
        <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms-Compensation">
          <el-form-item label="员工姓名" prop="StaffId" class="Compensation-header">
            <el-select v-model="dataObject.StaffId" disabled remote filterable class="select-input">
              <el-option v-for="item in UserPageList" :key="item.Id" :label="item.UserName" :value="item.Id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同类型" prop="TypeText" class="Compensation-header">
            <el-input v-model="dataObject.TypeText" disabled size="small" />
          </el-form-item>
          <el-form-item label="合同工资" prop="Salary" class="Compensation-header">
            <el-input v-model="dataObject.Salary" disabled size="small">
              <svg-icon slot="suffix" icon-class="money" class-name="way" />
            </el-input>
          </el-form-item>
          <el-form-item label="试用期起始日期" prop="TryStartDate" class="Date Compensation-header">
            <el-date-picker v-model="dataObject.TryStartDate" disabled value-format="yyyy-MM-dd" type="date">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="试用期终止日期" prop="TryExpireDate" class="Date Compensation-header">
            <el-date-picker v-model="dataObject.TryExpireDate" disabled value-format="yyyy-MM-dd" type="date">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="试用期限" prop="contractlimit" class="Compensation-header">
            <!-- <p>{{dataObject.contractlimit}}</p> -->
            <el-input v-model="dataObject.contractlimit" disabled size="small" />
          </el-form-item>
          <el-form-item label="合同起始日期" prop="StartDate" class="Date Compensation-header">
            <el-date-picker v-model="dataObject.StartDate" disabled value-format="yyyy-MM-dd" type="date">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同终止日期" prop="ExpireDate" class="Date Compensation-header">
            <el-date-picker v-model="dataObject.ExpireDate" disabled value-format="yyyy-MM-dd" type="date">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同期限" prop="limit" class="Compensation-header">
            <!-- <p>{{dataObject.limit}}</p> -->
            <el-input v-model="dataObject.limit" disabled size="small" />
          </el-form-item>
          <el-form-item label="合同签订日期" prop="SignDate" class="Date Compensation-header">
            <el-date-picker v-model="dataObject.SignDate" disabled type="date">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同签订模式" prop="SignType" class="Compensation-header">
            <!-- <p v-if="dataObject.SignType =='0'">电子版</p> -->
            <el-input v-if="dataObject.SignType =='0'" disabled size="small" value="电子版" />
            <el-input v-else disabled size="small" value="纸质版" />
            <!-- <p v-else>纸质版</p> -->
          </el-form-item>
          <el-form-item label="合同附件" v-if="dataObject.Attachment" prop="CommisionType" class="attachment Compensation-header">
            <div class="upload">
              <div :title="fileName" class="files" @mouseenter="fileShow()" @mouseleave="filenoShow()">
                <span class="filestype">{{filestype}}</span>
                <p>{{fileName}}</p>
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
          <div class="footer-button">
            <el-button class="operation-button" type="primary" @click="cancel">关闭</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <PreviewFile :isImg="isImg" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import { GetStaffContractType, AddStaffContract, EditStaffContract, GetStaffContract } from '@/api/OutsourcedEmployeeManagement.js'
import { MenuIdDate, showLoading, hideLoading, uuid, datemonth } from '@/utils/CustomValidation'
import SupperUploader from '@/utils/SupperUploader'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    PreviewFile
  },
  data () {
    return {
      urlList: [{
        name: '员工合同管理',
        router: '/OutsourcedEmployeeManagement/EmployeeContractManagement'
      }, {
        name: '查看员工合同',
        router: ''
      }],
      dataObject: {
        Id: '',
        StaffId: '',
        Type: '',
        Salary: '',
        StartDate: '',
        ExpireDate: '',
        SignDate: '',
        SignType: '0',
        Attachment: '',
        Status: '0',
        TryStartDate: '',
        TryExpireDate: ''
      },
      Formrules: {},
      UserPageList: [],//员工列表
      optionShow: false,
      fileName: '',
      filestype: '',
      isImg: 1,
      iframeShow: false,
      previewFileUrl: '',
      loading: false,
      operating: {}
    }
  },
  created () {
    this.operating = JSON.parse(window.localStorage.getItem('operating')) || {}
    if (this.$route.query && this.$route.query.Id) {
      this.ContractId = this.$route.query.Id
      this.getContractDetal(this.ContractId)
    }
  },
  methods: {
    //获取数据
    getContractDetal (Id) {
      let obj = {
        Id: Id,
        menuid: this.operating.MenuId,
        operationcode: this.operating.OperationCode
      }
      GetStaffContract(qs.stringify(obj)).then(response => {
        if (response.IsSuccess && response.Data) {
          this.dataObject = response.Data
          this.dataObject.SignType += ''
          if (this.dataObject.ExpireDate && this.dataObject.StartDate) {
            this.dataObject.limit = datemonth(this.dataObject.ExpireDate, this.dataObject.StartDate)
          }
          if (this.dataObject.TryExpireDate && this.dataObject.TryStartDate) {
            this.dataObject.contractlimit = datemonth(this.dataObject.TryExpireDate, this.dataObject.TryStartDate)
          }
          if (this.dataObject.Attachment) {
            this.fileName = this.dataObject.Attachment.slice(this.dataObject.Attachment.lastIndexOf('/') + 1, this.dataObject.Attachment.lastIndexOf('.'))
            this.filestype = this.dataObject.Attachment.slice(this.dataObject.Attachment.lastIndexOf('.') + 1).toUpperCase()

          }
          this.UserPageList = [{
            UserName: this.dataObject.StaffName,
            Id: this.dataObject.StaffId
          }]
        } else {
          this.$message({
            type: 'error',
            message: response.MessageContent
          })
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
          message: '该员工合同没有上传附件',
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
    closeFileShow (val) {
      this.iframeShow = val
    },
    //取消操作
    cancel () {
      this.$router.go(-1)
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.Compensation-box {
  margin-left: 24px;
}
.From-box-content {
  margin-top: 24px;
  background: #fff;
  overflow: hidden;
  .forms-Compensation {
    margin: 40px;
    /deep/ .Compensation-header {
      display: inline-block;
      input {
        background: $erinputbgc;
        border: none;
        height: 40px;
        line-height: 40px;
      }
      .el-input.is-disabled {
        .el-input__inner {
          color: $erp666;
        }
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
    .el-form-item {
      min-width: 430px;
      margin: 0 48px;
      margin-bottom: 15px;
      /deep/ .el-form-item__label {
        font-weight: 400;
        width: 100%;
        display: block;
        text-align: left;
        line-height: 24px;
        color: $erp999;
      }

      .el-form-item__content {
        margin-left: 0;
        width: 435px;
        .el-select {
          display: block;
          /deep/ .el-input__suffix {
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
      display: inline-block;
      p {
        margin-top: 40px;
        margin-bottom: 0;
      }
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
    .footer-button {
      margin: 100px 0 200px 0;
      text-align: center;
      button {
        margin: 0 12px;
      }
    }
  }
}
</style>