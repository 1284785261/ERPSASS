<!-- 申请招投标报价审批 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" :title="title" class="dialog-box dialog-account" append-to-body :visible.sync="showApply" :show-close="false" :destroy-on-close="true" width="800px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms-Account">
        <el-form-item label="招标单位" prop="CompanyId">
          <el-select v-model="dataObject.CompanyId" filterable clearable remote :disabled="disabled" placeholder="请查询或下拉选择招标单位" class="select-input" @clear="clearCompany" :remote-method="remoteCompany" :loading="loading" @change="SelectCustom()">
            <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称" prop="ProjectId">
          <el-select v-model="dataObject.ProjectId" filterable clearable remote :disabled="disabled" placeholder="请先查询招标单位再选择项目" class="select-input" @clear="clearProject" :remote-method="remoteProject" :loading="loading">
            <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item label="审批时限" prop="ApprovalTimeLimit" class="Date">
          <el-date-picker v-model="dataObject.ApprovalTimeLimit" clearable type="datetime" placeholder="请选择审批时限">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请人" prop="SysUserId" class="recipientPhone">
          <el-select v-model="dataObject.SysUserId" filterable clearable remote placeholder="请查询或下拉申请人" @clear="clearApply" @change="SelectUser($event)" :remote-method="ApplyMethod" :loading="loading" class="select-input">
            <el-option v-for="item in ApplyList" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请部门" prop="ApplicationDepartment">
          <el-select v-model="dataObject.ApplicationDepartment" clearable size="small" filterable remote placeholder="请选择投标单位">
            <el-option v-for="item in ApplicationDepartmentList" :key="item.OrgId" :label="item.FullOrgName" :value="item.OrgId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目成本及盈利测算" prop="ProjectCostCalculation" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="dataObject.ProjectCostCalculation" size="small" />
        </el-form-item>
        <el-form-item label="项目概况（简述）" prop="ProjectOverview" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="dataObject.ProjectOverview" size="small" />
        </el-form-item>
        <el-form-item label="报价内容" prop="ProjectContent" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="dataObject.ProjectContent" size="small" />
        </el-form-item>
        <el-form-item label="报价说明" prop="ProjectExplain" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="dataObject.ProjectExplain" size="small" />
        </el-form-item>
        <el-form-item label="备注" prop="Remark" class="textarea-note">
          <el-input type="textarea" :rows="5" maxlength="200" show-word-limit v-model="dataObject.Remark" size="small" />
        </el-form-item>
        <el-form-item label="附件" class="attachment" prop="Attachment">
          <div class="upload">
            <div v-if="fileName" class="files" @mouseenter="fileShow" @mouseleave="filenoShow" v-loading="uploadLoading">
              <span class="filestype">{{ filestype }}</span>
              <p>{{ fileName }}</p>
              <div v-if="optionShow" class="option-button">
                <a>
                  <svg-icon icon-class="replace" class-name="svg-a" />替换
                  <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx" name="file" class="smaellFile replaceFile" @change="uploadFile" />
                </a>
                <a @click="delFiles">
                  <svg-icon icon-class="del" class-name="svg-a" />删除</a>
              </div>
            </div>
            <div class="files" v-else v-loading="uploadLoading">
              <img src="@/assets/upload.png" />
              <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx" name="file" class="smaellFile" @change="uploadFile" />
            </div>
            <div class="prompt">
              注：当前位置仅支持导入PNG、JPG、Word、PDF、XLS
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button class="erpbtn" size="small" @click="dialogtrue('ruleForm')">保存</el-button>
        <el-button class="erpbtn" size="small" @click="SubmittedReview('ruleForm')">提交送审</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import SupperUploader from "@/utils/SupperUploader";
import { GetBiddingQuoteInfo } from "@/api/Bidding.js";
import { GetOrgByUserId, GetSysUserList } from "@/api/SystemSetting.js";
import { GetCompanyPageList } from "@/api/CustomerManagement.js";
import { GetProjectList } from "@/api/projectManagement.js";
import {
  MenuIdDate,
  showLoading,
  hideLoading,
  uuid,
  copy
} from "@/utils/CustomValidation.js";
import axios from "axios";
import qs from "qs";
export default {
  name: "EditBiddingApplyBuy",
  props: ["showBiddingApplyBuy", "title", "SendId", "disabled", "ProId"],
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
        ApplicationDepartment: ""
      },
      loading: false,
      dataDetail: {},
      ApplicationDepartmentList: [],
      departmentList: [],
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
        SysUserId: [
          { required: true, message: "请选择申请人", trigger: "change" }
        ],
        ApplicationDepartment: [
          { required: true, message: "请选择申请部门", trigger: "change" }
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
      filestype: "",
      optionShow: false,
      uploadLoading: false
    };
  },
  watch: {
    showBiddingApplyBuy(newvalue, oldvalue) {
      this.showApply = newvalue;
      this.dataObject = this.$options.data().dataObject;
      if (this.title == "申请招投标报价审批") {
        this.dataObject.CompanyId = "";
        this.dataObject.CompanyName = "";
        this.dataObject.ProjectId = "";
        this.dataObject.ProjectName = "";
        this.dataObject.ApprovalTimeLimit = "";
        this.dataObject.ProjectCostCalculation = "";
        this.dataObject.ProjectOverview = "";
        this.dataObject.ProjectContent = "";
        this.dataObject.ProjectExplain = "";
        this.dataObject.Remark = "";
        this.dataObject.AttachUrl = "";
        this.dataObject.ApplicationDepartment = "";
        let UsedFor = JSON.parse(localStorage.getItem("Current"));
        this.dataObject.SysUserId = UsedFor.currentId;
        this.ApplyMethod(UsedFor.currentUser);
        this.SelectUser(UsedFor.currentId);
       
        if (this.ProId) {
          const ProjectDetail = JSON.parse(
            window.localStorage.getItem("projectdetail")
          );
          this.dataObject.CompanyId = ProjectDetail.CompanyId;
          this.dataObject.CompanyName = ProjectDetail.CompanyName;
          this.dataObject.ProjectId = ProjectDetail.Id;
          this.dataObject.ProjectName = ProjectDetail.Name;
          this.remoteCompany(this.dataObject.CompanyName);
          this.remoteProject(this.dataObject.ProjectName);
        }else{
           this.remoteCompany();
        }
      } else if (this.title == "修改招投标报价审批") {
        let obj = {
          Id: this.SendId,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetBiddingQuoteInfo(obj).then(res => {
          if (res.MessageCode == 0) {
            this.dataDetail = res.Data;
            if (this.dataDetail) {
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
              this.ApplyMethod(this.dataDetail.SysUserName);
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
                this.filestype = this.dataObject.AttachUrl.slice(
                  this.dataObject.AttachUrl.lastIndexOf(".") + 1
                ).toUpperCase();
              }
            }
          } else {
            this.dataDetail = {};
          }
        });
      }
    }
  },
  created() {
    // this.GetOrgByUserId();
  },
  methods: {
    // //获取用户组织列表
    // GetOrgByUserId() {
    //   let obj = {
    //     SysUserId: JSON.parse(localStorage.getItem("Current")).currentId,
    //     menuid: MenuIdDate(),
    //     operationcode: "1"
    //   };
    //   GetOrgByUserId(obj).then(res => {
    //     if (res.MessageCode == 0 && res.Data.length > 0) {
    //       this.ApplicationDepartmentList = res.Data;
    //     } else {
    //       this.ApplicationDepartmentList = [];
    //     }
    //   });
    // },
    //查询公司列表
    remoteCompany(query) {
      this.loading = true;
      setTimeout(() => {
        let data = {
          Name: query,
          PageIndex: 1,
          PageSize: 99,
          Type: -1,
          Status: 1,
          menuid: MenuIdDate(),
          operationcode: 1
        };
        GetCompanyPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.CompanyPageList = response.Data;
            } else {
              this.dataObject.ProjectId = "";
              this.CompanyPageList = [];
            }
          } else {
            this.dataObject.ProjectId = "";
            this.CompanyPageList = [];
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }, 200);
    },
    SelectCustom() {
      this.remoteProject();
    },
    clearCompany() {
      this.dataObject.ProjectId = "";
      this.ProjectList = [];
      this.remoteCompany();
    },
    //获取项目下拉列表
    remoteProject(val) {
      let data = {
        Name: val,
        CompanyId: this.dataObject.CompanyId,
        BusinessType: "-1",
        Priority: "-1",
        Status: "-1",
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      GetProjectList(qs.stringify(data)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.ProjectList = response.Data;
            this.ProjectId = response.Data[0].Id;
          } else {
            this.ProjectList = [];
          }
        } else {
          this.ProjectList = [];
          this.dataObject.ProjectId = "";
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    clearProject() {
      this.dataObject.ProjectId = "";
    },
    ApplyMethod(query) {
      console.log(query);
      this.loading = true;
      setTimeout(() => {
        let data = {
          UserName: query,
          Status: 1,
          PageIndex: 1,
          PageSize: 100,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetSysUserList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            this.ApplyList = response.Data;
          } else {
            this.ApplyList = [];
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }, 200);
    },
    clearApply() {
      this.ApplyMethod();
    },
    //选择出单人
    SelectUser(value) {
      this.dataObject.ApplicationDepartment = "";
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
    uploadFile(e) {
      var uploader;
      const files = e.target.files[0];
      var ext = files.name.slice(files.name.lastIndexOf(".") + 1).toLowerCase();
      if (
        ext == "doc" ||
        ext == "docx" ||
        ext == "pdf" ||
        ext == "png" ||
        ext == "jpg" ||
        ext == "jpeg" ||
        ext == "xls" ||
        ext == "xlsx"
      ) {
      } else {
        this.$message({
          message: "不支持该格式文件上传",
          type: "warning"
        });
        e.target.value = [];
        return false;
      }
      if (files.size > 20 * 1024 * 1024) {
        this.$message({
          message: "文件大小超过最大限制",
          type: "warning"
        });
        e.target.value = [];
        return false;
      } else {
        this.uploadLoading = true;
        if (
          ext == "doc" ||
          ext == "docx" ||
          ext == "pdf" ||
          ext == "xls" ||
          ext == "xlsx"
        ) {
          uploader = new SupperUploader(
            process.env.VUE_APP_BASE_API_UPLOAD,
            files,
            uuid(),
            2 * 1024 * 1024
          );
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              this.uploadLoading = false;
              this.dataObject.AttachUrl = uploader.urlResult.VideoUrl;
              this.fileName = files.name;
              this.filestype = ext.toUpperCase();
              e.target.value = [];
            }
          });
        } else {
          let datas = new FormData();
          datas.append("file", files);
          datas.append("message", "{ImageStreamName:'file',BussinessType:0}");
          axios.post(process.env.VUE_APP_BASE_API_UPLOAD, datas).then(res => {
            if (res.data.State) {
              this.uploadLoading = false;
              this.dataObject.AttachUrl = res.data.ImageUrl;
              this.fileName = files.name;
              this.filestype = ext.toUpperCase();
              e.target.value = [];
            }
          });
        }
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
    //删除文件
    delFiles() {
      this.dataObject.AttachUrl = "";
      this.fileName = "";
    },
    //保存
    dialogtrue(form) {
      let dataObj = this.dataObject;
      this.$refs[form].validate(valid => {
        if (valid) {
          dataObj.Status = 0;
          this.$emit("EditBiddingApplyBuy", dataObj);
        } else {
          this.$message({
            message: "请按要求填写表单内容",
            type: "error"
          });
          return false;
        }
      });
    },
    //提交送审
    SubmittedReview(form) {
      let dataObj = this.dataObject;
      this.$refs[form].validate(valid => {
        if (valid) {
          dataObj.Status = 1;
          this.$emit("EditSubmittedReview", dataObj);
        } else {
          this.$message({
            message: "请按要求填写表单内容",
            type: "error"
          });
          return false;
        }
      });
    },
    close() {
      this.$emit("closeApplyBuy", false);
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
          height: 36px;
          line-height: 36px;
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
  /deep/ .textarea-note {
    .el-textarea__inner {
      border: 1px solid #f0f4fa;
    }
  }
  /deep/ .is-error {
    .el-textarea__inner {
      border: 1px solid #f56c6c;
    }
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
        width: 250px;
        font-size: 14px;
        color: #999999;
        margin-left: 17px;
        line-height: 30px;
      }
    }
  }
}
</style>