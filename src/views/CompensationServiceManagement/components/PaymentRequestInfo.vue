<!-- 付款申请单详情 -->
<template>
  <div class="compensation-detail-container">
    <div class="compensation-detail-content">
      <div class="compensation-detail">
        <div class="compensation-title">审核状态</div>
        <div class="comprow">
          <el-row :gutter="24">
            <el-col :span="24">
              <div class="message-box">
                <div class="message-label">审核时间</div>
                <div class="message-con">
                  {{ PaymentDetail.AddTime | YYMMddhhmmssTime }}
                </div>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="message-box">
                <div class="message-label">审核状态</div>
                <div class="message-con">{{ PaymentDetail.StatusText }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="compensation-title">付款申请单内容</div>
        <div class="comprow">
          <el-row :gutter="24">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">类型</div>
                <div class="message-con" v-if="PaymentDetail.TypeText">
                  {{ PaymentDetail.TypeText }}
                </div>
                <div class="message-con" v-else></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label" v-if="this.$route.query.type==2">
                  社保付款单编号
                </div>
                <div class="message-label" v-else-if="this.$route.query.type==3">
                  医保付款单编号
                </div>
                <div class="message-label" v-else-if="this.$route.query.type==4">
                  公积金付款单编号
                </div>
                <div class="message-label" v-else-if="this.$route.query.type==1">
                  工资结算单编号
                </div>
                <div class="message-label" v-else-if="this.$route.query.type==6">
                  其他费用结算单编号
                </div>
                <div class="message-con" v-if="PaymentDetail.Code">
                  {{ PaymentDetail.Code }}
                </div>
                <div class="message-con" v-else-if="PaymentDetail.SalarySettleCodes">{{PaymentDetail.SalarySettleCodes}}</div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-if="this.$route.query.type==2||this.$route.query.type==3||this.$route.query.type==4">
              <div class="message-box">
                <div class="message-label">社保账号</div>
                <div class="message-con" v-if="PaymentDetail.Account">
                  {{ PaymentDetail.Account }}
                </div>
                <div class="message-con" v-else></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-if="this.$route.query.type==1">
              <div class="message-box">
                <div class="message-label">薪酬类型</div>
                <div class="message-con" v-if="PaymentDetail.AdvanceType">
                  {{ PaymentDetail.AdvanceType }}
                </div>
                <div class="message-con" v-else></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-if="this.$route.query.type==1">
              <div class="message-box">
                <div class="message-label">选择对应发票</div>
                <div class="message-con" v-if="PaymentDetail.MoneyRecords">
                  {{ PaymentDetail.MoneyRecords }}
                </div>
                <div class="message-con" v-else></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">付款公司</div>
                <div class="message-con" v-if="PaymentDetail.BfCompanyName">
                  {{ PaymentDetail.BfCompanyName }}
                </div>
                <div class="message-con" v-else></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">付款方式</div>
                <div class="message-con" v-if="PaymentDetail.MethodText">
                  {{ PaymentDetail.MethodText }}
                </div>
                <div class="message-con" v-else></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">支出类型</div>
                <div class="message-con" v-if="PaymentDetail.PayTypeText">
                  <div>
                    {{ PaymentDetail.PayTypeText }}
                  </div>
                </div>
                <div class="message-con" v-else></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">付款金额</div>
                <div class="message-con" v-if="PaymentDetail.Amount">
                  {{ PaymentDetail.Amount }}元
                </div>
                <div class="message-con" v-else></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-if="this.$route.query.type==1">
              <div class="message-box">
                <div class="message-label">打款银行</div>
                <div class="message-con" v-if="PaymentDetail.ClassBankName">
                  {{ PaymentDetail.ClassBankName }}
                </div>
                <div class="message-con" v-else></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">用途说明</div>
                <div class="message-con" v-if="PaymentDetail.UsedFor">
                  {{ PaymentDetail.UsedFor }}
                </div>
                <div class="message-con" v-else></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">经办部门</div>
                <div class="message-con" v-if="PaymentDetail.HandleOrgName">
                  {{ PaymentDetail.HandleOrgName }}
                </div>
                <div class="message-con" v-else></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <div class="message-box">
                <div class="message-label">经办人</div>
                <div class="message-con" v-if="PaymentDetail.HandleUserName">
                  {{ PaymentDetail.HandleUserName }}
                </div>
                <div class="message-con" v-else></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="message-box">
                <div class="message-label">备注</div>
                <div class="message-con" v-if="PaymentDetail.Remark">
                  {{ PaymentDetail.Remark }}
                </div>
                <div class="message-con" v-else></div>
              </div>
            </el-col>
            <el-col
              v-if="PaymentDetail.RevokeApplyPayList"
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
            >
              <div
                v-for="(item, index) in PaymentDetail.RevokeApplyPayList"
                :key="index"
                class="message-box"
              >
                <div class="message-label">系统原单</div>
                <div
                  class="message-con"
                  v-if="item.RevokeApplyPayName"
                  @click="openweb(item)"
                >
                  {{ item.RevokeApplyPayName }}
                </div>
                <div class="message-con" v-else></div>
              </div>
            </el-col>
            <el-col :span="24" v-if="AttachList.length > 0">
              <div class="message-box">
                <div class="message-label">附件</div>
                <div class="message-con">
                  <div
                    class="upload"
                    v-for="(item, index) in AttachList"
                    :key="index"
                  >
                    <div
                      :title="item.name"
                      class="files"
                      @mouseenter="fileShow(index)"
                      @mouseleave="filenoShow(index)"
                    >
                      <span class="filestype">{{ item.isWOD }}</span>
                      <p>{{ item.name }}</p>
                      <div v-show="item.optionShow" class="option-button">
                        <a @click="downloadFile(item)">
                          <svg-icon
                            icon-class="download"
                            class-name="svg-a"
                          />下载
                        </a>
                        <a @click="watchFile(item)">
                          <svg-icon
                            icon-class="replace"
                            class-name="svg-a"
                          />预览
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
      <div class="compensation-bottom">
        <el-button class="erpbtn" size="small" @click="closeweb"
          >关 闭</el-button
        >
      </div>
    </div>
    <PreviewFile
      :isImg="isImg"
      :titlename="titlename"
      :iframeShow="iframeShow"
      :previewFileUrl="previewFileUrl"
      @closeFileShow="closeFileShow"
    ></PreviewFile>
  </div>
</template>
<script>
import PreviewFile from "@/components/publicComponents/PreviewFile.vue";
import { GetApplyPayInfo } from "@/api/FinancialManagement.js";
import { GetSocialSecurityPayApplyInfo } from "@/api/CompensationServiceManagement.js";
import qs from "qs";
import {
  MenuIdDate,
  showLoading,
  hideLoading,
} from "@/utils/CustomValidation.js";
import filters from "@/utils/filters";
export default {
  components: {
    PreviewFile,
  },
  data() {
    return {
      PaymentDetail: {},
      AttachList: [],
      // 预览样式
      isImg: 1,
      iframeShow: false,
      previewFileUrl: "",
      titlename: "附件预览",
      SalarySettleCodeList: [],
    };
  },
  created() {
    this.Id = this.$route.query.id;
    if(this.$route.query.type==1||this.$route.query.type==6){
      this.GetApplyPayInfo()
      }else if(this.$route.query.type==2||this.$route.query.type==3||this.$route.query.type==4)
      this.GetSocialSecurityPayApplyInfo();
  },
  methods: {
    GetApplyPayInfo(){
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: 1,
      };
      showLoading()
      GetApplyPayInfo(obj).then(response=>{
      hideLoading()
      if (response.IsSuccess) {
          this.PaymentDetail = response.Data;
          // 处理文件
          if (this.PaymentDetail.Attachment) {
            let arr = [];
            arr = this.PaymentDetail.Attachment.split(";");
            for (let i = 0; i < arr.length; i++) {
              if (arr[i] == "") {
                arr.splice(i, 1);
                i = i - 1;
              }
            }
            for (let i = 0; i < arr.length; i++) {
              this.AttachList.push({
                name: arr[i].slice(
                  arr[i].lastIndexOf("/") + 1,
                  arr[i].lastIndexOf(".")
                ),
                Url: arr[i],
                isWOD: arr[i].slice(arr[i].lastIndexOf(".") + 1).toUpperCase(),
                optionShow: false,
              });
            }
          }
          // 处理对应工资结算单
          console.log(this.PaymentDetail.SalarySettleCodes);
          if (this.PaymentDetail.SalarySettleCodes) {
            this.SalarySettleCodeList =
              this.PaymentDetail.SalarySettleCodes.split(",");
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      })
    },
    GetSocialSecurityPayApplyInfo() {
      let obj = {
        Id: this.Id,
        menuid: MenuIdDate(),
        operationcode: 1,
      };
      showLoading();
      GetSocialSecurityPayApplyInfo(qs.stringify(obj)).then((response) => {
        hideLoading();
        if (response.IsSuccess) {
          this.PaymentDetail = response.Data;
          // 处理文件
          if (this.PaymentDetail.Attachment) {
            let arr = [];
            arr = this.PaymentDetail.Attachment.split(";");
            for (let i = 0; i < arr.length; i++) {
              if (arr[i] == "") {
                arr.splice(i, 1);
                i = i - 1;
              }
            }
            for (let i = 0; i < arr.length; i++) {
              this.AttachList.push({
                name: arr[i].slice(
                  arr[i].lastIndexOf("/") + 1,
                  arr[i].lastIndexOf(".")
                ),
                Url: arr[i],
                isWOD: arr[i].slice(arr[i].lastIndexOf(".") + 1).toUpperCase(),
                optionShow: false,
              });
            }
          }
          // 处理对应工资结算单
          console.log(this.PaymentDetail.SalarySettleCodes);
          if (this.PaymentDetail.SalarySettleCodes) {
            this.SalarySettleCodeList =
              this.PaymentDetail.SalarySettleCodes.split(",");
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },
    closeweb() {
      // this.$router.go(-1)
      window.open("about:blank", "_self").close();
    },
    //下载文件
    downloadFile(data) {
      if (data.Url) {
        window.open(data.Url);
      } else {
        this.$message({
          message: "该付款申请单没有生成文件",
          type: "error",
        });
      }
    },
    // 预览附件
    watchFile(data) {
      const e = data.Url;
      if (e) {
        const ext = e.slice(e.lastIndexOf(".") + 1).toLowerCase();
        console.log(e);
        if (ext == "pdf") {
          this.isImg = 2;
          this.previewFileUrl = e;
        } else if (
          ext == "doc" ||
          ext == "docx" ||
          ext == "xlsx" ||
          ext == "xls"
        ) {
          this.isImg = 3;
          this.previewFileUrl =
            "https://view.officeapps.live.com/op/view.aspx?src=" + e;
        } else {
          this.isImg = 1;
          this.previewFileUrl = e;
        }
        this.iframeShow = true;
      }
    },
    closeFileShow() {
      this.iframeShow = false;
    },
    // 移入文件显示操作
    fileShow(index) {
      this.AttachList[index].optionShow = true;
    },
    // 移出文件隐藏操作
    filenoShow(index) {
      this.AttachList[index].optionShow = false;
    },

    // 打开原付款申请单
    openweb() {
      const { href } = this.$router.resolve({
        path: "/CompensationServiceManagement/PaymentRequestInfo",
        query: {
          id: data.RevokeApplyPayId,
        },
      });
      window.open(href, "_blank");
    },
  },
};
</script>
<style lang="scss" scoped>
.compensation-detail-container /deep/ {
  padding-top: 24px;
  .compensation-detail-content {
    background-color: #fff;
    overflow: hidden;
    border-radius: 8px 0 0 8px;
    margin-left: 24px;
    padding: 40px;
    .compensation-detail {
      .compensation-title {
        margin-top: 20px;
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
        &:last-of-type {
          border-bottom: none;
        }
      }
      .message-box {
        margin-top: 24px;
        display: flex;
        .message-label {
          width: 150px;
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
          white-space: pre-wrap;
          > div {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
          }
        }
      }
    }
    .compensation-bottom {
      text-align: center;
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