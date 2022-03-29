<!-- 提交终审 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="提交终审" class="dialog-box dialog-account" append-to-body :visible.sync="showFinal" :show-close="false" :destroy-on-close="true" width="480px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-form-item label="公司名称" prop="BfCompanyId">
          <el-select v-model="dataObject.BfCompanyId" disabled placeholder=" " class="select-input">
            <el-option v-for="item in BidderList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域" prop="Area">
          <el-select v-model="dataObject.Area" clearable placeholder="请选择区域" class="select-input">
            <el-option v-for="item in arealist" :key="item.describe" :label="item.describe" :value="item.describe">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经办人" prop="AgentId">
          <el-select v-model="dataObject.AgentId" disabled filterable clearable placeholder="搜索或选择经办人" @change="SelectUser($event)" :remote-method="(query)=>{SysUserMethod(query)}" @clear="SysUserMethod('')">
            <el-option :label="item.UserName" :value="item.Id" v-for="(item, index) in SysUserlist" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经办部门" prop="OrgId">
          <el-select v-model="dataObject.OrgId" clearable placeholder="请选择经办部门" @change="SelectOrg($event)">
            <el-option :label="item.FullOrgName" :value="item.OrgId" v-for="(item, index) in departmentList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同提交人项目说明" class="textarea-note" prop="Describtion">
          <el-input type="textarea" :rows="6" v-model="dataObject.Describtion" maxlength="500" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="合同附件" prop="Attachment" class="attachment" v-if="FileName">
          <div class="upload">
            <div class="files" @mouseenter="fileShow" @mouseleave="filenoShow">
              <span class="filestype">{{filestype}}</span>
              <p :title="FileName">{{FileName}}</p>
              <div v-show="optionShow" class="option-button">
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
      <div slot="footer" class="dialog-footer-multiple">
        <el-button class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button class="erpbtn" size="small" @click="dialogtrue('ruleForm')">提交终审</el-button>
      </div>
    </el-dialog>
    <PreviewFile :isImg="isImg" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>
<script>
import SupperUploader from "@/utils/SupperUploader";
import { GetSysUserList, GetOrgByUserId } from "@/api/SystemSetting.js";
import {
  GetProjectList,
  GetProjectRiskAssessment
} from "@/api/projectManagement.js";
import PreviewFile from "@/components/publicComponents/PreviewFile.vue";
import {
  uuid,
  copy,
  MenuIdDate,
  showLoading,
  hideLoading
} from "@/utils/CustomValidation";
import axios from "axios";
import qs from "qs";
export default {
  name: "SubmitFinal",
  props: ["showSubmitFinal", "tempData"],
  components: {
    PreviewFile
  },
  data() {
    return {
      dataObject: {
        ProjectContractId: "",
        BfCompanyId: "",
        BfCompanyName: "",
        Area: "",
        Attachment: "",
        AgentId: "",
        OrgId: "",
        OrgName: "",
        Describtion: ""
      },
      BidderList: [], //公司列表
      arealist: [
        {
          describe: "深圳"
        },
        {
          describe: "广西锦绣"
        },
        {
          describe: "锦绣众越"
        },
        {
          describe: "锦绣港越"
        },
        {
          describe: "兴黔锦绣"
        },
        {
          describe: "教育集团"
        }
      ],
      SysUserlist: [], //经办人列表
      departmentList: [], //经办部门列表
      showFinal: false,
      filestype: "",
      FileName: "",
      optionShow: false,
      isImg: 1,
      iframeShow: false,
      previewFileUrl: "",
      Formrules: {
        AgentId: [
          { required: true, message: "请选择经办人", trigger: "change" }
        ],
        OrgId: [
          { required: true, message: "请选择经办部门", trigger: "change" }
        ],
        BfCompanyId: [
          { required: true, message: "请输入客户概况", trigger: "blur" }
        ],
        Area: [{ required: true, message: "请选择区域", trigger: "change" }],
        Describtion: [
          {
            required: true,
            message: "请填写合同提交人项目说明",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    showSubmitFinal(newvalue, oldvalue) {
      this.showFinal = newvalue;
      // this.dataObject = this.$options.data().dataObject
      const Current = JSON.parse(window.localStorage.getItem("Current")) || {};
      console.log(this.tempData);
      this.SysUserMethod(Current.currentUser);
      this.SelectUser(Current.currentId);
      this.dataObject.AgentId = Current.currentId;
      if (this.tempData) {
        this.dataObject.ProjectContractId = this.tempData.Id;
        this.dataObject.BfCompanyId = this.tempData.BfCompanyId;
        this.dataObject.BfCompanyName = this.tempData.BfCompanyName;
        this.dataObject.Area = this.tempData.Area;
        this.BidderList = [
          {
            Id: this.tempData.BfCompanyId,
            Name: this.tempData.BfCompanyName
          }
        ]; //公司列表
        if (this.tempData.Attachment) {
          this.dataObject.Attachment = this.tempData.Attachment;
          this.FileName = this.tempData.Attachment;
          this.filestype = this.tempData.Attachment.slice(
            this.tempData.Attachment.lastIndexOf(".") + 1
          ).toUpperCase();
        }
      }
      // this.GetProjectRiskAssessmentObj()
      // this.remoteCompany()
      // this.dataObject = copy(this.tempData)
      // this.CompanyPageList = [{
      //   Id: this.tempData.CompanyId,
      //   Name: this.tempData.CompanyName
      // }]//客户列表
      // this.ProjectList = [{
      //   Id: this.tempData.ProjectId,
      //   Name: this.tempData.ProjectName
      // }]//项目列表
      // if (this.title == '添加项目合同信息') {
      //
      // } else if (this.title == '修改项目合同信息') {
      //
      //   this.CompanyPageList = [{
      //     Id: this.tempData.CompanyId,
      //     Name: this.tempData.CompanyName
      //   }]//客户列表
      //   this.ProjectList = [{
      //     Id: this.tempData.ProjectId,
      //     Name: this.tempData.ProjectName
      //   }]//项目列表
      //   this.dataObject.SignType += ''
      //   this.dataObject.Status += ''
      //   if (this.dataObject.Attachment) {
      //     this.filestype = this.dataObject.Attachment.slice(this.dataObject.Attachment.lastIndexOf('.') + 1).toUpperCase()
      //   }
      // }
    }
  },
  created() {},
  methods: {
    //获取合同风险审批信息
    GetProjectRiskAssessmentObj() {
      let param = {
        ProjectContractId: this.dataObject.ProjectContractId,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      GetProjectRiskAssessment(qs.stringify(param)).then(response => {
        if (response.IsSuccess && response.Data) {
          let param = response.Data;
          this.CompanyPageList = [
            {
              Id: param.CompanyId,
              Name: param.CompanyName
            }
          ]; //客户列表
          this.ProjectList = [
            {
              Id: param.ProjectId,
              Name: param.ProjectName
            }
          ]; //项目列表
          this.dataObject.CompanyId = param.CompanyId;
          this.dataObject.ProjectId = param.ProjectId;
          this.dataObject.SysUserId = param.OwnerId;
          this.dataObject.CustomerProfile = param.CustomerProfile;
          this.dataObject.RiskLevel = param.RiskLevel;
          this.dataObject.PlanOffer = param.PlanOffer;
          this.dataObject.IncomeCalculation = param.IncomeCalculation;
          this.dataObject.RiskPoint = param.RiskPoint;
          this.dataObject.Countermeasure = param.Countermeasure;
          this.dataObject.Attachment = param.Attachment;
          if (param.Attachment) {
            this.FileName = param.Attachment;
            this.filestype = param.Attachment.slice(
              param.Attachment.lastIndexOf(".") + 1
            ).toUpperCase();
          }
        }
      });
    },
    dialogtrue(form) {
      // 调用接口,保存数据
      this.$refs[form].validate(valid => {
        if (valid) {
          // this.dataObject.Attachment = this.dataObject.Attachment
          console.log(this.dataObject);
          this.$emit("SubmitFinalSave", this.dataObject);
        } else {
          this.$message({
            message: "请按要求填写表单内容",
            type: "error"
          });
          return false;
        }
      });
    },
    // 搜索经办人
    SysUserMethod(value) {
      let obj = {
        UserId: "",
        UserName: value,
        Status: 1,
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      showLoading();
      GetSysUserList(qs.stringify(obj)).then(response => {
        hideLoading();
        if (response.IsSuccess) {
          this.SysUserlist = response.Data;
        } else {
          this.SysUserlist = [];
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //选择出单人
    SelectUser(value) {
      this.dataObject.OrgId = "";
      this.dataObject.OrgName = "";
      let obj = {
        SysUserId: value,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetOrgByUserId(qs.stringify(obj)).then(response => {
        if (response.IsSuccess && response.Data) {
          this.departmentList = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //选择出单部门
    SelectOrg(value) {
      for (let item of this.departmentList) {
        if (value == item.OrgId) {
          this.dataObject.OrgName = item.FullOrgName;
        }
      }
    },
    // 预览
    preview() {
      if (this.dataObject.Attachment) {
        const ext = this.dataObject.Attachment.slice(
          this.dataObject.Attachment.lastIndexOf(".") + 1
        ).toLowerCase();
        if (ext == "pdf") {
          this.isImg = 2;
          this.previewFileUrl = this.dataObject.Attachment;
        } else if (
          ext == "doc" ||
          ext == "docx" ||
          ext == "xlsx" ||
          ext == "xls"
        ) {
          this.isImg = 3;
          this.previewFileUrl =
            "https://view.officeapps.live.com/op/view.aspx?src=" +
            this.dataObject.Attachment;
        } else {
          this.isImg = 1;
          this.previewFileUrl = this.dataObject.Attachment;
        }
        this.iframeShow = true;
      } else {
        this.iframeShow = false;
        this.$message({
          message: "该项目合同没有上传附件",
          type: "error"
        });
      }
    },
    //下载文件
    downloadFile() {
      if (this.dataObject.Attachment) {
        window.open(this.dataObject.Attachment);
      } else {
        this.$message({
          message: "该合同没有上传合同文件",
          type: "error"
        });
      }
    },
    // 移入文件显示操作
    fileShow() {
      this.optionShow = true;
    },
    // 移出文件隐藏操作
    filenoShow() {
      this.optionShow = false;
    },
    closeFileShow(val) {
      this.iframeShow = val;
    },
    close() {
      this.$emit("closeSubmitFinal", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog-box {
  /deep/ .el-dialog {
    .el-dialog__body {
      padding: 0 20px;
    }
  }
}
.forms {
  /deep/ .el-form-item {
    margin-bottom: 12px;
    width: 100%;
    float: left;
    padding: 0 20px;
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
  /deep/ .textarea-note {
    width: 100%;
    textarea {
      resize: none;
      background: $erinputbgc;
      border: none;
    }
    .el-input__count {
      bottom: 2px;
      height: 30px;
      line-height: 30px;
      right: 20px;
      background: $erinputbgc;
    }
  }
  /deep/ .attachment {
    width: 100%;
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