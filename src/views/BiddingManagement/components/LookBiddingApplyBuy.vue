<!-- 查看招投标报价审批 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="查看招投标报价审批" class="dialog-box dialog-account" append-to-body :visible.sync="showApply" :show-close="false" :destroy-on-close="true" width="800px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms-Account">
        <el-form-item label="招标单位" prop="CompanyId">
          <el-select v-model="dataObject.CompanyId" disabled placeholder="请查询或下拉选择招标单位" class="select-input">
            <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称" prop="ProjectId">
          <el-select v-model="dataObject.ProjectId" disabled placeholder="请先查询招标单位再选择项目" class="select-input">
            <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item label="审批时限" prop="ApprovalTimeLimit" class="Date">
          <el-date-picker v-model="dataObject.ApprovalTimeLimit" disabled value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择审批时限">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请人" prop="SysUserId" class="recipientPhone">
          <el-select v-model="dataObject.SysUserId" disabled placeholder="请查询或下拉申请人" class="select-input">
            <el-option v-for="item in ApplyList" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请部门" prop="ApplicationDepartment">
          <el-select v-model="dataObject.ApplicationDepartment" disabled size="small" filterable remote placeholder="请选择投标单位">
            <el-option v-for="item in ApplicationDepartmentList" :key="item.OrgId" :label="item.FullOrgName" :value="item.OrgId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目成本及盈利测算" prop="ProjectCostCalculation" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="200" disabled show-word-limit v-model="dataObject.ProjectCostCalculation" size="small" />
        </el-form-item>
        <el-form-item label="项目概况（简述）" prop="ProjectOverview" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="200" disabled show-word-limit v-model="dataObject.ProjectOverview" size="small" />
        </el-form-item>
        <el-form-item label="报价内容" prop="ProjectContent" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="200" disabled show-word-limit v-model="dataObject.ProjectContent" size="small" />
        </el-form-item>
        <el-form-item label="报价说明" prop="ProjectExplain" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="200" disabled show-word-limit v-model="dataObject.ProjectExplain" size="small" />
        </el-form-item>
        <el-form-item label="备注" prop="Remark" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="200" disabled show-word-limit v-model="dataObject.Remark" size="small" />
        </el-form-item>
        <el-form-item label="附件" class="attachment" prop="Attachment" v-if="fileName">
          <div class="babel-File">
            <div class="upload">
              <div :title="fileName" class="files" @mouseenter="visible = !visible" @mouseleave="visible = !visible">
                <span class="filestype">{{ fileType }}</span>
                <p>{{ fileName }}</p>
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
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button class="erpbtn" size="small" @click="close">取消</el-button>
      </div>
    </el-dialog>
    <PreviewFile :isImg="isImg" :iframeShow="iframeShow" titlename="预览招投标附件" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>
<script>
import {
  MenuIdDate,
  showLoading,
  hideLoading,
  uuid,
  copy
} from "@/utils/CustomValidation.js";
import { GetOrgByUserId } from "@/api/SystemSetting.js";
import { GetBiddingQuoteInfo } from "@/api/Bidding.js";
import PreviewFile from "@/components/publicComponents/PreviewFile.vue";
import qs from "qs";
export default {
  name: "LookBiddingApplyBuy",
  props: ["showLookBiddingApplyBuy", "SendId"],
  components: {
    PreviewFile
  },
  data() {
    return {
      dataObject: {
        Id: "",
        CompanyId: "",
        CompanyName: "",
        ProjectId: "",
        ProjectName: "",
        ApprovalTimeLimit: "",
        ProjectCostCalculation: "",
        ProjectOverview: "",
        ProjectContent: "",
        ProjectExplain: "",
        Remark: "",
        AttachUrl: "",
        SysUserId: "",
        ApplicationDepartment: "",
        Status: 0
      },
      ApplicationDepartmentList: [],
      CompanyPageList: [],
      ProjectList: [],
      ApplyList: [],
      Formrules: {
        CompanyId: [
          { required: true, message: "请选择招标单位", trigger: "change" }
        ],
        ProjectId: [
          { required: true, message: "请选择项目名称", trigger: "change" }
        ],
        ApprovalTimeLimit: [
          { required: true, message: "请选择审批时限", trigger: "change" }
        ],
        ProjectCostCalculation: [
          {
            required: true,
            message: "请输入项目成本及盈利测算",
            trigger: "blur"
          }
        ],
        ProjectOverview: [
          {
            required: true,
            message: "请输入项目概况（简述）",
            trigger: "blur"
          }
        ],
        ProjectContent: [
          { required: true, message: "请输入报价内容", trigger: "blur" }
        ],
        ProjectExplain: [
          { required: true, message: "请输入报价说明", trigger: "blur" }
        ]
      },
      showApply: false,
      fileName: "",
      fileType: "",
      visible: false,
      isImg: 1,
      iframeShow: false,
      previewFileUrl: ""
    };
  },
  watch: {
    showLookBiddingApplyBuy(newvalue, oldvalue) {
      this.showApply = newvalue;
      // this.dataObject = this.$options.data().dataObject;
      // console.log(this.dataObject);
      // console.log(data);
      let obj = {
        Id: this.SendId,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetBiddingQuoteInfo(obj).then(res => {
        if (res.MessageCode == 0) {
          this.dataDetail = res.Data;
          console.log(this.dataDetail);
          if (this.dataDetail) {
            this.ApplyList = [
              {
                Id: this.dataDetail.SysUserId,
                UserName: this.dataDetail.SysUserName
              }
            ];
            this.CompanyPageList = [
              {
                Id: this.dataDetail.CompanyId,
                Name: this.dataDetail.CompanyName
              }
            ];
            this.ProjectList = [
              {
                Id: this.dataDetail.ProjectId,
                Name: this.dataDetail.ProjectName
              }
            ];
            this.SelectUser(this.dataDetail.SysUserId);
            this.dataObject = {
              Id: this.dataDetail.Id,
              CompanyId: this.dataDetail.CompanyId,
              CompanyName: this.dataDetail.CompanyName,
              ProjectId: this.dataDetail.ProjectId,
              ProjectName: this.dataDetail.ProjectName,
              ApprovalTimeLimit: this.dataDetail.ApprovalTimeLimit,
              ProjectCostCalculation: this.dataDetail.ProjectCostCalculation,
              ProjectOverview: this.dataDetail.ProjectOverview,
              ProjectContent: this.dataDetail.ProjectContent,
              ProjectExplain: this.dataDetail.ProjectExplain,
              Remark: this.dataDetail.Remark,
              AttachUrl: this.dataDetail.AttachUrl,
              SysUserId: this.dataDetail.SysUserId,
              Status: this.dataDetail.Status,
              ApplicationDepartment: this.dataDetail.SysOrgId
            };
            if (this.dataObject.AttachUrl) {
              this.fileName = this.dataObject.AttachUrl;
              this.fileType = this.dataObject.AttachUrl.slice(
                this.dataObject.AttachUrl.lastIndexOf(".") + 1
              ).toUpperCase();
            }
          }
        } else {
          this.dataDetail = {};
        }
      });
    }
  },
  created() {
    // this.GetOrgByUserId();
  },
  methods: {
    //选择出单人
    SelectUser(value) {
      // this.dataObject.ApplicationDepartment = "";
      let obj = {
        SysUserId: value,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetOrgByUserId(qs.stringify(obj)).then(response => {
        if (response.IsSuccess && response.Data) {
          this.ApplicationDepartmentList = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 预览
    preview() {
      if (this.dataObject.AttachUrl) {
        const ext = this.dataObject.AttachUrl.slice(
          this.dataObject.AttachUrl.lastIndexOf(".") + 1
        ).toLowerCase();
        if (ext == "pdf") {
          this.isImg = 2;
          this.previewFileUrl = this.dataObject.AttachUrl;
        } else if (ext == "doc" || ext == "docx") {
          this.isImg = 3;
          this.previewFileUrl =
            "https://view.officeapps.live.com/op/view.aspx?src=" +
            this.dataObject.AttachUrl;
        } else {
          this.isImg = 1;
          this.previewFileUrl = this.dataObject.AttachUrl;
        }
        this.iframeShow = true;
      }
    },
    // 下载
    downloadFile() {
      window.open(this.dataObject.AttachUrl);
    },
    closeFileShow(val) {
      this.iframeShow = val;
    },
    close() {
      this.$emit("closeLookApplyBuy", false);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.dialog-account {
  /deep/ .el-dialog {
    .el-dialog__body {
      padding: 0 20px;
    }
  }
}
.forms-Account {
  position: relative;
  /deep/ .el-form-item {
    margin-bottom: 12px;
    width: 50%;
    float: left;
    padding: 0 20px;
    .el-form-item__label {
      text-align: left;
      line-height: 24px;
      color: #666666;
    }

    .el-form-item__content {
      margin-left: 0;
      width: 100%;
      .el-select {
        display: block;
        .el-input {
          .el-input__inner {
            height: 36px;
            line-height: 36px;
          }
          .el-input__suffix {
            top: 24px;
            height: 40px;
            line-height: 40px;
          }
        }
      }
      .el-input {
        font-size: 14px;
        .el-input__inner {
          height: 36px;
          line-height: 36px;
        }
        .el-input__suffix {
          height: 38px;
          line-height: 38px;
        }
      }
    }
  }
  /deep/ .Address {
    width: 100%;
    .el-form-item__label {
      width: 100%;
      text-align: left;
    }
    .el-select {
      width: 162px;
      margin-right: 17px;
      display: inline-block !important;
      .el-input__suffix {
        top: 0 !important;
      }
      &:nth-child(3) {
        margin-right: 0;
      }
    }
    .address-input {
      margin-top: 16px;
    }
  }
  /deep/ .Date {
    .el-date-editor {
      width: 100%;
      height: 40px;
    }
  }
  /deep/ .recipientPhone {
    // width: 100%;
  }
  /deep/ .attachment {
    width: 100%;
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