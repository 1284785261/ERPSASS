<template>
  <div class="invoice-detail-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="detail-content" v-loading="loading">
      <div class="comprow">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">状态</div>
              <div class="message-con">{{invoicedetail.StatusText}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="comprow">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">开票公司</div>
              <div class="message-con">{{invoicedetail.BfCompanyName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">开票申请人</div>
              <div class="message-con">{{invoicedetail.ApplyUserName}}</div>
            </div>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">开票申请部门</div>
              <div class="message-con">{{}}</div>
            </div>
          </el-col> -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">开票时间</div>
              <div class="message-con">{{invoicedetail.InvoiceDate | Time}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">开票总额</div>
              <div class="message-con">{{invoicedetail.Amount}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">所属项目</div>
              <div class="message-con">{{invoicedetail.ProjectName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">发票抬头</div>
              <div class="message-con">{{invoicedetail.InvoiceTitle}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">客户单位性质</div>
              <div class="message-con">{{invoicedetail.TaxTypeText}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">税号</div>
              <div class="message-con">{{invoicedetail.TaxNo}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">银行账号</div>
              <div class="message-con">{{invoicedetail.AccountNo}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">开户行</div>
              <div class="message-con">{{invoicedetail.BankName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">公司注册地址</div>
              <div class="message-con">{{invoicedetail.RegAddress}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">公司联系电话</div>
              <div class="message-con">{{invoicedetail.CompanyTel}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">选择回款流水</div>
              <div class="message-con">{{MoneyRecord}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="comprow dashed" v-for="(item, index) in invoicedetail.GetInvoiceApplyInfoList" :key="index">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">开票类型</div>
              <div class="message-con">{{item.InvoiceTypeText}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">开票项目</div>
              <div class="message-con">{{item.Subject}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">开票金额</div>
              <div class="message-con" v-if="item.Amount">{{item.Amount}}￥</div>
              <div class="message-con" v-else></div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="comprow">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">开票受理人</div>
              <div class="message-con">{{invoicedetail.OperatorName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">收款方式</div>
              <div class="message-con">{{invoicedetail.ReceipTypeText}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="message-box">
              <div class="message-label">备注</div>
              <div class="message-con">{{invoicedetail.Remark}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="comprow" v-if="invoicedetail.Attachment">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="message-box">
              <div class="message-label">结算单附件</div>
              <div class="message-con">
                <div class="upload">
                  <div :title="fileName" class="files" @mouseenter="fileShow()" @mouseleave="filenoShow()">
                    <span class="filestype">{{filestype}}</span>
                    <p>{{fileName}}</p>
                    <div v-show="optionShow" class="option-button">
                      <a @click="preview(invoicedetail)">
                        <svg-icon icon-class="replace" class-name="svg-a" />预览
                      </a>
                      <a @click="downloadFile(invoicedetail)">
                        <svg-icon icon-class="download" class-name="svg-a" />下载
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="compensation-bottom">
        <el-button class="erpbtn" size="small" @click="closeweb">关 闭</el-button>
      </div>
    </div>
    <PreviewFile :isImg="isImg" :titlename="titlename" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>

<script>
import { GetInvoiceApplyInfo, GetMoneyRecordInfo } from '@/api/FinancialManagement.js'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import filters from '@/utils/filters.js'
import PreviewFile from '@/components/publicComponents/PreviewFile.vue'
import { MenuIdDate } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  components: {
    BreadCrumb,
    PreviewFile
  },
  data () {
    return {
      urlList: [{
        name: '发票管理',
        router: '/FinancialManagement/InvoiceDetail'
      }, {
        name: '发票详情',
        router: ''
      }],
      invoicedetail: {
        GetInvoiceApplyInfoList: []
      },
      Id: '',
      loading: false,
      optionShow: false,
      fileName: '',
      filestype: '',
      isImg: 1,
      iframeShow: false,
      previewFileUrl: '',
      titlename: '结算单附件',
      MoneyRecord: '', // 回款流水
    }
  },
  created () {
    this.Id = this.$route.query.id
    this.getInvoiceApplyInfo()
    if (window.localStorage.getItem('breadpath')) {
      this.urlList[0] = JSON.parse(window.localStorage.getItem('breadpath'))
    }
  },
  methods: {
    getInvoiceApplyInfo () {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      this.loading = true
      GetInvoiceApplyInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.invoicedetail = response.Data
          if (this.invoicedetail.Attachment) {
            this.fileName = this.invoicedetail.Attachment.slice(this.invoicedetail.Attachment.lastIndexOf('/') + 1, this.invoicedetail.Attachment.lastIndexOf('.'))
            this.filestype = this.invoicedetail.Attachment.slice(this.invoicedetail.Attachment.lastIndexOf('.') + 1).toUpperCase()
          }
          if (response.Data && response.Data.MoneyRecordId) {
            let data = {
              Id: response.Data.MoneyRecordId,
              menuid: MenuIdDate(),
              operationcode: '1'
            }
            GetMoneyRecordInfo(qs.stringify(data)).then(responseMoney => {
              this.loading = false
              if (responseMoney.IsSuccess) {
                if (responseMoney.Data.BfCompanyName && responseMoney.Data.Amount) {
                  this.MoneyRecord = responseMoney.Data.BfCompanyName + '-' + responseMoney.Data.Amount
                }
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: 'error'
                })
              }
            })
          } else {
            this.loading = false
          }
        } else {
          this.loading = false
          this.$message({
            message: response.MessageContent,
            type: 'error'
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
    closeweb () {
      window.open('about:blank', '_self').close()
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
          message: '该发票没有上传结算单附件',
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
          message: '该发票没有上传结算单附件',
          type: 'error'
        })
      }
    },
    closeFileShow (val) {
      this.iframeShow = val
    }
  },
}
</script>

<style lang="scss" scoped>
.invoice-detail-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .detail-content {
    border-radius: 8px 0 0 8px;
    background-color: #fff;
    margin-left: 24px;
    padding: 40px 24px 40px 40px;
    .comprow {
      padding-bottom: 16px;
      border-bottom: 1px solid $erpBK;
      margin-bottom: 40px;
      &:last-of-type {
        border-bottom: none;
        margin-bottom: 0;
      }
      &.dashed {
        border-bottom: 1px dashed $erpBK !important;
        &:last-of-type {
          border-bottom: 1px solid $erpBK;
        }
      }
    }
    .message-box {
      margin-bottom: 24px;
      display: flex;
      .message-label {
        width: 106px;
        font-size: $f14;
        color: $erp333;
        text-align: right;
        font-weight: 700;
        &.social {
          width: 138px;
        }
        &.lage {
          width: 198px;
        }
      }
      .message-con {
        flex: 1;
        padding-left: 20px;
        font-size: $f14;
        color: $erp999;
      }
    }
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
.compensation-bottom {
  text-align: center;
}
</style>