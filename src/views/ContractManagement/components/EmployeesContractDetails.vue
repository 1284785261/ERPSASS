<!-- 合同详情信息 -->
<template>
  <div>
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="Details-box">
      <div class="babel">
        <div class="title-name">基本信息</div>
        <div class="babel-container">
          <el-row class="follow-row">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">合同编号</div>
                <div class="content-detail" v-if="DataDetail.Code">{{DataDetail.Code}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">员工姓名</div>
                <div class="content-detail" v-if="DataDetail.StaffName">{{DataDetail.StaffName}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">在职状态</div>
                <div class="content-detail" v-if="DataDetail.JobStatusText">{{DataDetail.JobStatusText}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">合同工资</div>
                <div class="content-detail" v-if="DataDetail.Salary">{{DataDetail.Salary | EedMoney}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">试用期起始时间</div>
                <div class="content-detail" v-if="DataDetail.TryStartDate">{{DataDetail.TryStartDate | Time}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">试用期终止时间</div>
                <div class="content-detail" v-if="DataDetail.TryExpireDate">{{DataDetail.TryExpireDate | Time}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">试用期限</div>
                <div class="content-detail" v-if="DataDetail.TryExpireText">{{DataDetail.TryExpireText}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">合同起始时间</div>
                <div class="content-detail" v-if="DataDetail.StartDate">{{DataDetail.StartDate | Time}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">合同截止时间</div>
                <div class="content-detail" v-if="DataDetail.ExpireDate">{{DataDetail.ExpireDate | Time}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>

            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">合同期限</div>
                <div class="content-detail" v-if="DataDetail.ContractExpire">{{DataDetail.ContractExpire}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">合同签订时间</div>
                <div class="content-detail" v-if="DataDetail.SignDate">{{DataDetail.SignDate | Time}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">合同上传时间</div>
                <div class="content-detail" v-if="DataDetail.AddTime">{{DataDetail.AddTime | YYMMddhhmmssTime}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">创建人</div>
                <div class="content-detail" v-if="DataDetail.SysUserName">{{DataDetail.SysUserName}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="babel" v-if="ProjectDetail && ProjectDetail.length > 0">
        <div class="title-name">项目详情</div>
        <div class="babel-container">
          <el-row class="follow-row" v-for="(item,index) in ProjectDetail" :key="index">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">所属项目</div>
                <div class="content-detail" v-if="item.ProjectName">{{item.ProjectName}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">相关客户</div>
                <div class="content-detail" v-if="item.CompanyNmae">{{item.CompanyNmae}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>

            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">业务类型</div>
                <div class="content-detail" v-if="item.BusinessTypeText">{{item.BusinessTypeText}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="babel">
        <div class="title-name">合同状态</div>
        <div class="babel-container">
          <el-row class="follow-row">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">合同状态</div>
                <div class="content-detail" v-if="DataDetail.ApproveStatusText">{{DataDetail.ApproveStatusText}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">合同签订模式</div>
                <div class="content-detail" v-if="DataDetail.SignType">{{DataDetail.SignType | SignType}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">合同签署进度</div>
                <div class="content-detail" v-if="DataDetail.SignType">{{DataDetail.SignType | SignType}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">存档状态</div>
                <div class="content-detail" v-if="DataDetail.Status== 0">待存档</div>
                <div class="content-detail" v-else-if="DataDetail.Status== 1">已存档</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">合同存档时间</div>
                <div class="content-detail" v-if="Signed.SignedTime">{{Signed.SignedTime | YYMMddhhmmssTime}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="content">
                <div class="content-label">签收人</div>
                <div class="content-detail" v-if="Signed.SignedName">{{Signed.SignedName}}</div>
                <div class="content-detail" v-else>--</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="babel">
        <div class="title-name">操作日志</div>
        <div class="babel-container">
          <!-- <div class="content"> -->
          <div class="operate-table">
            <el-table ref="multipleTable" class="erp-table" :data="tableData" max-height="600px" tooltip-effect="dark">
              <el-table-column align="center" prop="StaffContractCode" label="合同编号" min-width="120" />
              <el-table-column align="center" prop="SysUserName" label="操作人" min-width="120" />
              <el-table-column align="center" prop="AddTime" label="操作时间" min-width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.AddTime | YYMMddhhmmssTime}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="OperationTypeTxet" label="操作" min-width="100" />
            </el-table>
          </div>
          <div class="pagina-fonter dialog-pagina">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>

        <!-- </div> -->
      </div>
      <div class="babel" style="overflow: hidden;" v-if="this.DataDetail.Attachment">
        <div class="title-name">合同附件</div>
        <div class="babel-File">
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
        </div>
      </div>
      <div class="babel" style="overflow: hidden;" v-if="this.DataDetail.SignAttachment">
        <div class="title-name">合同签署后附件</div>
        <div class="babel-File">
          <div class="upload">
            <div :title="SignfileName" class="files" @mouseenter="visible=!visible" @mouseleave="visible=!visible">
              <span class="filestype">{{SignfileType}}</span>
              <p>{{SignfileName}}</p>
              <div v-show="visible" class="option-button">
                <a @click="preview2()">
                  <svg-icon icon-class="replace" class-name="svg-a" />预览
                </a>
                <a @click="downloadFile2()">
                  <svg-icon icon-class="download" class-name="svg-a" />下载
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-button">
        <el-button class="erpbtn" size="small" @click="cancel">关闭</el-button>
      </div>
    </div>
    <PreviewFile :isImg="isImg" :iframeShow="iframeShow" titlename="预览合同" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>
<script>
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import { GetStaffContract, GetStaffContractOperationLogPageList } from '@/api/Public.js'
import { GetContractArchivesSignedInfo } from '@/api/FileManagement.js';
import { MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation.js'
import filters from '@/utils/filters'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    PreviewFile
  },
  data () {
    return {
      urlList: [{
        name: '',
        router: ''
      }, {
        name: '员工合同详情',
        router: ''
      }],
      ContractId: '',
      Type: '',
      DataDetail: {},
      ProjectDetail: [],
      tableData: [],
      Signed: {},
      PageSize: 10,
      currentPage: 1,
      total: 0,
      fileName: '',
      fileType: '',
      SignfileName: '',
      SignfileType: '',
      visible: false,
      isImg: 1,
      iframeShow: false,
      previewFileUrl: '',
    }
  },
  created () {
    let breadpath = JSON.parse(window.localStorage.getItem('breadpath')) || {}
    if (breadpath.router) {
      this.urlList[0] = breadpath
    }
    this.ContractId = this.$route.query.Id
    this.Type = this.$route.query.Type
    // 文件处理
    this.getDataDetail()
    this.GetContractArchivesSigned()
    this.getPageList()
  },
  methods: {
    getDataDetail () {
      let data = {
        Id: this.ContractId,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetStaffContract(qs.stringify(data)).then(response => {
        if (response.IsSuccess) {
          this.DataDetail = response.Data.StaffContract
          if (this.DataDetail.Attachment) {
            this.fileName = this.DataDetail.Attachment
            this.fileType = this.DataDetail.Attachment.slice(this.DataDetail.Attachment.lastIndexOf('.') + 1).toUpperCase()
          }
          if (this.DataDetail.SignAttachment) {
            this.SignfileName = this.DataDetail.SignAttachment
            this.SignfileType = this.DataDetail.SignAttachment.slice(this.DataDetail.SignAttachment.lastIndexOf('.') + 1).toUpperCase()
          }
          if (response.Data.ProjectDetail && response.Data.ProjectDetail.length > 0) {
            this.ProjectDetail = response.Data.ProjectDetail
          }
        }
      })
    },
    GetContractArchivesSigned () {
      let data = {
        ContractType: this.Type,
        SourceContractId: this.ContractId,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetContractArchivesSignedInfo(qs.stringify(data)).then(response => {
        console.log(response)
        if (response.IsSuccess && response.Data) {
          this.Signed = response.Data
        }
      })
    },
    // 获取日志信息
    getPageList () {
      let data = {
        StaffContractId: this.ContractId,
        SysUserName: '',
        OperationType: '-1',
        StartTime: '',
        EndTime: '',
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 10,
        menuid: MenuIdDate(),
        operationcode: 1
      }
      GetStaffContractOperationLogPageList(qs.stringify(data)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.tableData = response.Data
            this.total = response.Total
          } else {
            this.tableData = []
            this.total = 0
          }
        } else {
          this.tableData = []
          this.total = 0
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    // 选择分页大小
    handleSizeChange (val) {
      this.PageSize = val
      this.getPageList()
    },
    // 跳转页面
    handleCurrentChange (val) {
      this.currentPage = val
      this.getPageList()
    },
    // 预览
    preview () {
      if (this.DataDetail.Attachment) {
        const ext = this.DataDetail.Attachment.slice(this.DataDetail.Attachment.lastIndexOf('.') + 1).toLowerCase()
        if (ext == 'pdf') {
          this.isImg = 2
          this.previewFileUrl = this.DataDetail.Attachment
        } else if (ext == 'doc' || ext == 'docx') {
          this.isImg = 3
          this.previewFileUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + this.DataDetail.Attachment
        } else {
          this.isImg = 1
          this.previewFileUrl = this.DataDetail.Attachment
        }
        this.iframeShow = true
      }
    },
    // 下载
    downloadFile () {
      window.open(this.DataDetail.Attachment)
    },
    // 预览
    preview2 () {
      if (this.DataDetail.SignAttachment) {
        const ext = this.DataDetail.SignAttachment.slice(this.DataDetail.SignAttachment.lastIndexOf('.') + 1).toLowerCase()
        if (ext == 'pdf') {
          this.isImg = 2
          this.previewFileUrl = this.DataDetail.SignAttachment
        } else if (ext == 'doc' || ext == 'docx') {
          this.isImg = 3
          this.previewFileUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + this.DataDetail.SignAttachment
        } else {
          this.isImg = 1
          this.previewFileUrl = this.DataDetail.SignAttachment
        }
        this.iframeShow = true
      }
    },
    // 下载
    downloadFile2 () {
      window.open(this.DataDetail.SignAttachment)
    },
    closeFileShow (val) {
      this.iframeShow = val
    },
    cancel () {
      window.open('about:blank', '_self').close()
    },
  }
}
</script>
<style lang="scss" scoped>
.Details-box {
  margin: 20px;
  background: #fff;
}
.bread {
  margin-left: 24px;
  margin-bottom: 24px;
}
.babel {
  padding-bottom: 40px;
  padding: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .title-name {
    font-size: $f16;
    color: $erp333;
    position: relative;
    padding-left: 12px;
    line-height: 16px;
    font-weight: 700;
    margin-bottom: 24px;
    &::after {
      content: "";
      width: 4px;
      height: 16px;
      background-color: $erpcolor;
      position: absolute;
      left: 0;
    }
  }
  .babel-container {
    padding-bottom: 16px;
    border-bottom: 1px solid $erpBK;

    .content {
      display: flex;
      font-size: $f14;
      line-height: 14px;
      margin-bottom: 24px;
      .content-label {
        margin-right: 12px;
        width: 150px;
        text-align: right;
        font-weight: 700;
      }
      .content-detail {
        flex: 1;
        color: $erp999;
      }
    }
    .follow-row {
      padding-bottom: 16px;
      border-bottom: 1px solid $erpBK;
      margin-bottom: 40px;
      &:last-child {
        padding-bottom: 0;
        border-bottom: none;
        margin-bottom: 0;
      }
    }
  }
  .babel-File {
    margin-right: 24px;
    padding-bottom: 16px;
    border-bottom: none;
    /deep/ .upload {
      position: relative;
      height: 120px;
      float: left;
      margin-right: 24px;
      margin-bottom: 20px;
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
        background: #f0f4fa;
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
}
.dialog-pagina {
  margin-top: 30px;
  margin-bottom: 30px;
}
.footer-button {
  text-align: center;
  background: #ffffff;
  padding: 30px;
}
</style>