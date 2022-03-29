<!-- 提交风险评估 -->
<template>
  <div class="tag-container">
    <el-dialog :close-on-click-modal="false" title="提交风险评估" class="dialog-box dialog-account" append-to-body :visible.sync="showAssessment" :show-close="false" :destroy-on-close="true" width="800px" @close="close">
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="Formrules" class="forms">
        <el-form-item label="所属客户" prop="CompanyId">
          <el-select v-model="dataObject.CompanyId" filterable clearable remote placeholder="请查询或下拉选择所属客户" disabled class="select-input" @clear="clearCompany" :remote-method="remoteCompany" :loading="loading" @change="SelectCustom()">
            <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属项目" prop="ProjectId">
          <el-select v-model="dataObject.ProjectId" filterable clearable remote placeholder="请先查询所属客户再选择所属项目" disabled class="select-input" @clear="clearProject" :remote-method="remoteProject" :loading="loading">
            <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item label="跟单员" prop="SysUserId" class="recipientPhone">
          <el-select v-model="dataObject.SysUserId" filterable clearable remote placeholder="请查询或下拉跟单员" @clear="clearApply" :remote-method="ApplyMethod" :loading="loading" class="select-input">
            <el-option v-for="item in ApplyList" :key="item.Id" :label="item.UserName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户概况" prop="CustomerProfile">
          <el-input v-model="dataObject.CustomerProfile" placeholder="请输入客户概况" size="small" />
        </el-form-item>
        <el-form-item label="风险等级" prop="RiskLevel">
          <el-input v-model="dataObject.RiskLevel" placeholder="请输入风险等级" size="small" />
        </el-form-item>
        <el-form-item label="计划报价（元）" prop="PlanOffer">
          <el-input v-model="dataObject.PlanOffer" type="number" placeholder="请输入计划报价" size="small" />
        </el-form-item>
        <el-form-item label="收益测算（元）" prop="IncomeCalculation">
          <el-input v-model="dataObject.IncomeCalculation" type="number" placeholder="请输入收益测算" size="small" />
        </el-form-item>
        <el-form-item label="风险点" prop="RiskPoint">
          <el-input v-model="dataObject.RiskPoint" placeholder="请输入风险点" size="small" />
        </el-form-item>
        <el-form-item label="防范措施" prop="Countermeasure">
          <el-input v-model="dataObject.Countermeasure" placeholder="请输入防范措施" size="small" />
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
        <el-form-item label="提交风险评估附件" prop="Attachment" class="attachment">
          <div class="upload">
            <div :title="FileName" v-if="FileName" class="files" @mouseenter="fileShow" @mouseleave="filenoShow" v-loading="uploadLoading">
              <span class="filestype">{{filestype}}</span>
              <p>{{FileName}}</p>
              <div v-if="optionShow" class="option-button">
                <a>
                  <svg-icon icon-class="replace" class-name="svg-a" />替换
                  <input type="file" accept=".doc,.docx,.pdf,.xls,.xlsx" name="file" class="replaceFile" @change="uploadFile">
                </a>
                <a @click="delFiles">
                  <svg-icon icon-class="del" class-name="svg-a" />删除</a>
              </div>
            </div>
            <div class="files" v-else v-loading="uploadLoading">
              <img src="../../../assets/upload.png">
              <input type="file" accept=".doc,.docx,.pdf,.xls,.xlsx" name="file" class="smaellFile" @change="uploadFile">
            </div>
            <div class="prompt">
              上传风险评估附件\电子档或者纸质版扫描文档
              上传格式为Word、PDF、XLS、XLSX
            </div>
          </div>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button class="erpbtn" size="small" @click="close">取消</el-button>
        <el-button class="erpbtn" size="small" @click="dialogtrue('ruleForm')">提交风险评估</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import SupperUploader from "@/utils/SupperUploader";
import { GetSysUserList, GetOrgByUserId } from "@/api/SystemSetting.js";
import { GetCompanyPageList } from "@/api/CustomerManagement.js";
import {
  GetProjectList,
  GetProjectRiskAssessment
} from "@/api/projectManagement.js";
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
  name: "SubmitAssessment",
  props: ["showSubmitAssessment", "Id"],
  data() {
    return {
      dataObject: {
        ProjectContractId: "",
        CompanyId: "",
        ProjectId: "",
        SysUserId: "",
        CustomerProfile: "",
        RiskLevel: "",
        PlanOffer: "",
        IncomeCalculation: "",
        RiskPoint: "",
        Countermeasure: "",
        AgentId: "",
        OrgId: "",
        OrgName: "",
        Attachment: ""
      },
      SysUserlist: [], //经办人列表
      departmentList: [], //经办部门列表
      ProjectContractId: "",
      CompanyPageList: [], //客户列表
      ProjectList: [], //项目列表
      ApplyList: [],
      loading: false,
      CommisionRuleEnumCommisionBase: [
        {
          value: "0",
          describe: "电子版"
        },
        {
          value: "1",
          describe: "纸质版"
        }
      ], //签订模式
      showAssessment: false,
      filestype: "",
      FileName: "",
      optionShow: false,
      uploadLoading: false,
      Formrules: {
        CustomerProfile: [
          { required: true, message: "请输入客户概况", trigger: "blur" }
        ],
        RiskLevel: [
          { required: true, message: "请输入风险等级", trigger: "blur" }
        ],
        PlanOffer: [
          { required: true, message: "请输入计划报价", trigger: "blur" }
        ],
        IncomeCalculation: [
          { required: true, message: "请输入收益测算", trigger: "blur" }
        ],
        RiskPoint: [
          { required: true, message: "请输入风险点", trigger: "blur" }
        ],
        Countermeasure: [
          { required: true, message: "请输入防范措施", trigger: "blur" }
        ],
        AgentId: [
          { required: true, message: "请选择经办人", trigger: "change" }
        ],
        OrgId: [
          { required: true, message: "请选择经办部门", trigger: "change" }
        ],
        Attachment: [
          { required: true, message: "请上传项目合同附件", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    showSubmitAssessment(newvalue, oldvalue) {
      this.showAssessment = newvalue;
      this.dataObject = this.$options.data().dataObject;
      this.dataObject.ProjectContractId = this.Id;
      const Current = JSON.parse(window.localStorage.getItem("Current")) || {};
      console.log(Current)
      this.SysUserMethod(Current.currentUser);
      this.SelectUser(Current.currentId)
      this.dataObject.AgentId = Current.currentId
      this.GetProjectRiskAssessmentObj();
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
          this.ApplyMethod(param.OwnerName);
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
              this.dataObject.Attachment = uploader.urlResult.VideoUrl;
              this.FileName = files.name;
              this.$refs.ruleForm.clearValidate(["Attachment"]);
              this.filestype = ext.toUpperCase();
              e.target.value = [];
            }
          });
        }
      }
    },
    dialogtrue(form) {
      // 调用接口,保存数据
      this.$refs[form].validate(valid => {
        if (valid) {
          // this.dataObject.Attachment = this.dataObject.Attachment
          console.log(this.dataObject);
          this.$emit("SubmitAssessmentSave", this.dataObject);
        } else {
          this.$message({
            message: "请按要求填写表单内容",
            type: "error"
          });
          return false;
        }
      });
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
      this.dataObject.Attachment = "";
      this.dataObject.Name = "";
    },
    close() {
      this.$emit("closeSubmitAssessment", false);
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
    width: 50%;
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