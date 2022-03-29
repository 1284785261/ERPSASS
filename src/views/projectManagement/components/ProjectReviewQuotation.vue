<!-- 提交项目审核报价 -->
<template>
  <div class="add-project-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form ref="projectform" label-position="top" :rules="projectform" :model="recruitform" label-width="140px" class="projectform">
        <div class="form-title">提交项目报价审核</div>
        <div class="form-cont">
          <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="项目名称" prop="Name">
                <el-input v-model="recruitform.Name" disabled placeholder="请输入项目名称" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="业务类型" prop="BusinessType">
                <el-select v-model="recruitform.BusinessType" disabled remote filterable placeholder="请选择业务类型" class="select-input">
                  <el-option v-for="item in BusinessList" :key="item.value" :label="item.describe" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="申请人" prop="SysUserId">
                <el-select v-model="recruitform.SysUserId" clearable filterable remote placeholder="请选择申请人" @clear="clearUser" @change="changeUser" :remote-method="UserMethod" :loading="loading" class="select-input">
                  <el-option v-for="item in SysUserList" :key="item.Id" :label="item.UserName" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="发起部门" prop="OrgId">
                <el-select v-model="recruitform.OrgId" clearable placeholder="请选择申请人获取发起部门" @change="SelectOrg($event)">
                  <el-option :label="item.FullOrgName" :value="item.OrgId" v-for="(item, index) in departmentList" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="审批时限" class="datetime" prop="Limited">
                <el-date-picker v-model="recruitform.Limited" clearable value-format="yyyy-MM-dd" type="date" placeholder="请选择审批时限"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="是否招标" prop="Tender">
                <el-radio-group v-model="recruitform.Tender">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="是否招聘" prop="Recruit">
                <el-radio-group v-model="recruitform.Recruit">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="项目成本及盈利测算" class="text2" prop="Measure">
                <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="recruitform.Measure"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="项目概况" class="text2" prop="Desc">
                <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="recruitform.Desc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="报价内容" class="text2" prop="PriceContent">
                <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="recruitform.PriceContent"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="报价说明" class="text2" prop="PriceDesc">
                <el-input type="textarea" :rows="5" maxlength="500" show-word-limit v-model="recruitform.PriceDesc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="bottom">
          <!-- 添加 -->
          <el-button class="erpbtn" size="small" @click="$router.go(-1)">取消</el-button>
          <el-button class="erpbtn" size="small" @click="ProjectReviewQuotation('projectform')">保存</el-button>
        </div>
      </el-form>

    </div>

  </div>
</template>
<script>
import BreadCrumb from "@/components/publicComponents/breadCrumb.vue";
import {
  GetProject,
  GetProjectBusinessType,
  AddProjectPrice,
  GetProjectPriceInfo,
  EditProjectPrice
} from "@/api/projectManagement.js";
import { GetSysUserList, GetOrgByUserId } from "@/api/SystemSetting.js";
import { MenuIdDate, showLoading, hideLoading } from "@/utils/CustomValidation";
import qs from "qs";
export default {
  name: "ProjectReview",
  components: {
    BreadCrumb
  },
  data() {
    return {
      urlList: [
        {
          name: "项目详情",
          router: "/projectManagement/ProjectDetail"
        },
        {
          name: "提交项目审核报价",
          router: ""
        }
      ],
      ProjectDetail: {},
      BusinessList: [], //业务类型
      SysUserList: [], //申请人列表
      departmentList: [],
      loading: false,
      iscreated: true,
      recruitform: {
        Id: "",
        Name: "",
        ProjectId: "",
        BusinessType: "",
        SysUserId: "",
        department: "",
        Limited: "",
        Tender: "1",
        Recruit: "1",
        Measure: "",
        Desc: "",
        PriceContent: "",
        PriceDesc: "",
        OrgId: ""
      },
      QuotationId: "",
      projectform: {
        Name: [{ required: true, message: "请选择项目", trigger: "blur" }],
        BusinessType: [
          { required: true, message: "请选择业务类型", trigger: "blur" }
        ],
        SysUserId: [
          { required: true, message: "请选择申请人", trigger: "change" }
        ],
        OrgId: [
          { required: true, message: "请输入发起部门", trigger: "blur" }
        ],
        Limited: [
          { required: true, message: "请选择审批时限", trigger: "change" }
        ],
        Tender: [
          { required: true, message: "请选择是否招标", trigger: "blur" }
        ],
        Recruit: [
          { required: true, message: "请选择是否招聘", trigger: "blur" }
        ],
        Measure: [
          {
            required: true,
            message: "请输入项目成本及盈利测算",
            trigger: "blur"
          }
        ],
        Desc: [{ required: true, message: "请输入项目概况", trigger: "blur" }],
        PriceContent: [
          { required: true, message: "请输入报价内容", trigger: "blur" }
        ],
        PriceDesc: [
          { required: true, message: "请输入报价说明", trigger: "blur" }
        ]
      }
    };
  },
  watch: {},
  created() {
    this.getCatagoryType();
    new Promise((resolve, reject) => {
      if (this.$route.query && this.$route.query.QuotationId) {
        this.QuotationId = this.$route.query.QuotationId;
        this.GetPriceInfo(this.QuotationId, resolve);
      } else {
        resolve();
      }
    }).then(value => {
      return new Promise((resolve, reject) => {
        if (this.$route.query && this.$route.query.Id) {
          this.getDetail(this.$route.query.Id);
        }
      });
    });
    // if (this.$route.query && this.$route.query.Id) {
    //   this.getDetail(this.$route.query.Id)
    // }
    // if (this.$route.query && this.$route.query.QuotationId) {
    //   this.QuotationId = this.$route.query.QuotationId
    //   this.GetPriceInfo(this.QuotationId)
    // }
    if (window.localStorage.getItem("multipleBreadpath")) {
      this.urlList = JSON.parse(
        window.localStorage.getItem("multipleBreadpath")
      );
      this.urlList.push({
        name: "提交项目审核报价",
        router: ""
      });
    } else {
      this.urlList[0] = JSON.parse(window.localStorage.getItem("breadpath"));
    }
    let UsedFor = JSON.parse(localStorage.getItem("Current"));
    this.UserMethod(UsedFor.currentUser);
    this.changeUser(UsedFor.currentId);
    this.recruitform.SysUserId = UsedFor.currentId;
  },
  methods: {
    //获取项目类型数据
    getCatagoryType() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetProjectBusinessType(qs.stringify(obj)).then(response => {
        if (response) {
          this.BusinessList = response;
        }
      });
    },
    //查询受理人列表
    UserMethod(query) {
      let obj = {
        SysUserId: "",
        UserName: query,
        Status: 1,
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      this.loading = true;
      setTimeout(() => {
        GetSysUserList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            if (response.Data && response.Data.length) {
              this.SysUserList = response.Data;
            } else {
              this.SysUserList = [];
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
          this.loading = false;
        });
      }, 500);
    },
    changeUser(value) {
      this.recruitform.OrgId = "";
      this.recruitform.department = "";
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
    //选择发起部门
    SelectOrg(value) {
      for (let item of this.departmentList) {
        if (value == item.OrgId) {
          this.recruitform.department = item.FullOrgName;
        }
      }
    },
    clearUser() {
      this.UserMethod();
      this.recruitform.OrgId = "";
      this.recruitform.department = "";
    },
    GetPriceInfo(Id, resolve) {
      let obj = {
        Id: Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetProjectPriceInfo(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.recruitform = response.Data;
          this.recruitform.department = response.Data.OrgName;
          this.recruitform.Tender = response.Data.Tender + "";
          this.recruitform.Recruit = response.Data.Recruit + "";
          // this.getDetail(response.Data.ProjectId)
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
        resolve();
      });
    },
    getDetail(Id) {
      let obj = {
        Id: Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetProject(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          this.ProjectDetail = response.Data;
          this.$set(this.recruitform, "Name", this.ProjectDetail.Name);
          this.$set(
            this.recruitform,
            "BusinessType",
            this.ProjectDetail.BusinessType
          );
          // this.recruitform.Name = this.ProjectDetail.Name
          // this.recruitform.BusinessType = this.ProjectDetail.BusinessType
          if (!this.$route.query.QuotationId) {
            this.recruitform.Desc = this.ProjectDetail.Description;
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    ProjectReviewQuotation(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let obj = {
            ProjectId: this.$route.query.Id,
            Tender: this.recruitform.Tender,
            Recruit: this.recruitform.Recruit,
            Measure: this.recruitform.Measure,
            Desc: this.recruitform.Desc,
            Limited: this.recruitform.Limited,
            PriceContent: this.recruitform.PriceContent,
            PriceDesc: this.recruitform.PriceDesc,
            SysUserId: this.recruitform.SysUserId,
            OrgId: this.recruitform.OrgId,
            menuid: MenuIdDate(),
            operationcode: "1"
          };
          if (this.QuotationId) {
            obj.Id = this.QuotationId;
            showLoading();
            EditProjectPrice(qs.stringify(obj)).then(response => {
              hideLoading();
              if (response.IsSuccess) {
                this.$message({
                  type: "success",
                  message: "修改项目报价审核成功!"
                });
                setTimeout(() => {
                  this.$router.go(-1);
                }, 2000);
              } else {
                this.$message({
                  type: "error",
                  message: response.MessageContent
                });
              }
            });
          } else {
            showLoading();
            AddProjectPrice(qs.stringify(obj)).then(response => {
              hideLoading();
              if (response.IsSuccess) {
                this.$message({
                  type: "success",
                  message: "提交项目报价审核成功!"
                });
                setTimeout(() => {
                  this.$router.go(-1);
                }, 2000);
              } else {
                this.$message({
                  type: "error",
                  message: response.MessageContent
                });
              }
            });
          }
        } else {
          this.$message({
            message: "请按要求填写表单内容",
            type: "error"
          });
          return false;
        }
      });
    }
  },
  beforeDestroy() {
    window.localStorage.removeItem("multipleBreadpath");
  }
};
</script>
<style lang="scss">
.add-project-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .projectform {
    background-color: #fff;
    border-radius: 8px 0px 0px 8px;
    margin-left: 24px;
    padding: 40px 40px 80px 40px;
    .form-title {
      font-size: $f16;
      color: $erp333;
      line-height: 16px;
      position: relative;
      padding-left: 12px;
      margin-bottom: 24px;
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
    // 表格样式
    .el-form-item {
      margin-bottom: 20px;
      .el-form-item__label {
        line-height: 14px;
        font-size: $f14;
        color: $erp666;
        font-weight: 400;
        padding-bottom: 8px;
      }
      .el-form-item__content {
        width: calc(100% - 64px);
        .el-input__inner {
          background-color: $erinputbgc;
        }
        .el-select {
          width: 100%;
        }
        .el-date-editor--datetimerange {
          width: 100%;
          border: 1px solid #fff;
        }
      }
      input {
        background: #f0f4fa;
        border: 1px solid transparent;
        height: 40px;
        line-height: 40px;
      }
      textarea {
        background: #f0f4fa;
        border: 1px solid transparent;
      }

      // 地址样式
      &.path {
        .el-form-item__content {
          max-width: 100%;
          .el-select {
            max-width: 240px;
            margin-right: 24px;
            margin-bottom: 24px;
          }
          .el-input {
            max-width: 336px;
          }
        }
      }
      // 文本框样式
      &.text {
        .el-form-item__content {
          max-width: 100%;
          .el-textarea__inner {
            background-color: $erinputbgc;
          }
          .el-input__count {
            bottom: 2px;
            height: 30px;
            line-height: 30px;
            right: 20px;
            background: $erinputbgc;
          }
        }
      }
      &.text2 {
        .el-form-item__content {
          .el-textarea__inner {
            background-color: $erinputbgc;
          }
          .el-input__count {
            bottom: 2px;
            height: 30px;
            line-height: 30px;
            right: 20px;
            background: $erinputbgc;
          }
        }
      }
      // 两个时间
      &.dategroup {
        .el-form-item__content {
          display: flex;
          justify-content: space-between;
          .el-date-editor {
            max-width: 160px;
            display: inline-block;
          }
        }
      }
      // 时间选择器样式
      &.datetime {
        .el-form-item__content {
          .el-date-editor {
            width: 100%;
          }
        }
      }
      // vue-tree-input样式
      &.vue-tree {
        .el-form-item__content {
          .vue-treeselect {
            // min-height: 40px;
            height: 40px;
            .vue-treeselect__control {
              height: 40px;
              background-color: $erinputbgc;
              .vue-treeselect__value-container {
                height: 40px;
              }
              .vue-treeselect__control-arrow-container {
                height: 40px;
              }
            }
          }
        }
      }
      // 添加客户关联关系样式
      &.addrelation {
        .el-form-item__content {
          > span {
            cursor: pointer;
            > .svg-icon {
              margin-right: 10px;
            }
          }
        }
      }
    }
    /deep/ .is-error {
      .el-form-item__content {
        .el-input__inner {
          border: 1px solid #f56c6c;
        }
      }
      .el-textarea {
        .el-textarea__inner {
          border: 1px solid #f56c6c;
        }
      }
    }
    // 循环的样式
    .form-cont {
      padding-bottom: 16px;
      margin-bottom: 40px;
      border-bottom: 1px solid $erpBK;
      &:last-child {
        border-bottom: none;
      }
      .post-list {
        position: relative;
        margin-bottom: 40px;
        padding-bottom: 16px;
        border-bottom: 1px solid $erpBK;
        // 最后一个添加联系人样式
        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
          .operate-btn {
            bottom: 24px;
          }
        }
        // 底部操作按钮
        .operate-btn {
          // position: absolute;
          // right: 0;
          // bottom: 0px;
          justify-content: flex-end;
          display: flex;
        }
        .btn {
          cursor: pointer;
          margin-left: 64px;
          font-size: $f14;
          color: $erpplaceholder;
        }
      }
    }
  }
}
.bottom {
  text-align: center;
  button {
    margin: 0 20px;
  }
}
</style>