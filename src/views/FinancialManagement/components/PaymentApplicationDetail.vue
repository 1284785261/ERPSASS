<template>
  <div class="payment-application-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="application-content">
      <div class="compensation-title">审核状态</div>
      <div class="comprow">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<div class="message-box">
			  <div class="message-label">审核时间</div>
			  <div class="message-con">{{application.AuditTime}}</div>
			</div>
            <div class="message-box">
              <div class="message-label">审核状态</div>
              <div class="message-con">{{application.StatusText}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="compensation-title">审核详情</div>
      <div class="comprow">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">编号</div>
              <div class="message-con">{{application.Id}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">类型</div>
              <div class="message-con">{{application.TypeText}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">业务单号</div>
              <div class="message-con">{{application.BusinessNo}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">付款公司</div>
              <div class="message-con">{{application.BfCompanyName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">收款单位/个人称</div>
              <div class="message-con">{{application.Accepter}}</div>
            </div>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">客户公司名称</div>
              <div class="message-con">{{}}</div>
            </div>
          </el-col> -->
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">开户行</div>
              <div class="message-con">{{application.ClassBankName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">开户支行</div>
              <div class="message-con">{{application.BankBranch}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">银行账号</div>
              <div class="message-con">{{application.Account}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">付款方式</div>
              <div class="message-con">{{application.MethodText}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">付款金额</div>
              <div class="message-con">{{application.Amount}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">本次代垫金额</div>
              <div class="message-con">{{application.Advance}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">上次代垫回款</div>
              <div class="message-con">{{application.AdvanceBack}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="message-box">
              <div class="message-label">用途说明</div>
              <div class="message-con">{{application.UsedFor}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">经办部门</div>
              <div class="message-con">{{application.HandleOrgName}}</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="message-box">
              <div class="message-label">经办人</div>
              <div class="message-con">{{application.HandleUserName}}</div>
            </div>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="message-box">
              <div class="message-label">备注</div>
              <div class="message-con">{{application.Remark}}</div>
            </div>
          </el-col>
          <el-col :span="24" v-if="AttachList.length > 0">
            <div class="message-box">
              <div class="message-label">附件</div>
              <div class="message-con">
                <div :title="item.name" class="upload" v-for="(item,index) in AttachList" :key="index">
                  <div class="files" @mouseenter="fileShow(index)" @mouseleave="filenoShow(index)">
                    <span class="filestype">{{item.isWOD}}</span>
                    <p>{{item.name}}</p>
                    <div v-show="item.optionShow" class="option-button">
                      <a @click="downloadFile(item)">
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
    </div>
  </div>
</template>

<script>
import { GetApplyPayInfo } from '@/api/FinancialManagement.js'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { MenuIdDate, showLoading, hideLoading, copy, uuid, checkEngNumber } from '@/utils/CustomValidation.js'
import qs from 'qs'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      urlList: [{
        name: '付款申请管理',
        router: '/FinancialManagement/PaymentApplicationManagement'
      }, {
        name: '申请详情',
        router: ''
      }],
      application: {

      },
      AttachList: []
    }
  },
  created () {
    this.Id = this.$route.query.id
    this.getApplyPayInfo()
  },
  methods: {
    getApplyPayInfo () {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: '1'
      }
      showLoading()
      GetApplyPayInfo(qs.stringify(obj)).then(response => {
        hideLoading()
        if (response.IsSuccess) {
          this.application = response.Data
          if (this.application.Attachment) {
            let arr = []
            arr = this.application.Attachment.split(';')
            for (let i = 0; i < arr.length; i++) {
              if (arr[i] == '') {
                arr.splice(i, 1);
                i = i - 1;
              }
            }
            for (let i = 0; i < arr.length; i++) {
              this.AttachList.push({
                name: arr[i].slice(arr[i].lastIndexOf('/') + 1, arr[i].lastIndexOf('.')),
                Url: arr[i],
                isWOD: arr[i].slice(arr[i].lastIndexOf('.') + 1).toUpperCase(),
                optionShow: false
              })
            }
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: 'error'
          })
        }
      })
    },
    //下载文件
    downloadFile (data) {
      if (data.Url) {
        window.open(data.Url)
      } else {
        this.$message({
          message: '该付款申请单没有生成文件',
          type: 'error'
        })
      }
    },
    // 移入文件显示操作
    fileShow (index) {
      this.AttachList[index].optionShow = true
    },
    // 移出文件隐藏操作
    filenoShow (index) {
      this.AttachList[index].optionShow = false
    }
  },
}
</script>

<style lang="scss" scoped>
.payment-application-container {
  .bread {
    margin-left: 10px;
    margin-bottom: 24px;
  }
  .application-content {
    background-color: #fff;
    overflow: hidden;
    border-radius: 8px 0 0 8px;
    margin-left: 24px;
    padding: 40px;
    .compensation-title {
      font-size: $f16;
      color: $erp333;
      line-height: 16px;
      position: relative;
      padding-left: 12px;
      display: flex;
      justify-content: space-between;
      > .operate {
        font-size: $f14;
        color: $erpplaceholder;
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 16px;
        background-color: $erpcolor;
      }
    }
    .comprow {
      padding-bottom: 40px;
      border-bottom: 1px solid $erpBK;
      margin-bottom: 40px;
      &:last-of-type {
        border-bottom: none;
        margin-bottom: 0;
      }
    }
    .message-box {
      margin-top: 24px;
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
</style>