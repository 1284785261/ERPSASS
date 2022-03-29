<template>
  <div class="tag-container">
    <el-dialog
      :close-on-click-modal="false"
      :title="ChannelTitle"
      class="dialog-box"
      append-to-body
      :visible.sync="isShow"
      :show-close="false"
      :destroy-on-close="true"
      width="800px"
      @close="close"
    >
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="rules" class="forms">
        <el-form-item label="选择项目" prop="ProjectId">
          <el-select
            v-model="dataObject.ProjectId"
            filterable
            clearable
            remote
            :remote-method="remoteProject"
            placeholder="请选择"
            @change="SelectChange"
          >
            <el-option
              v-for="item in ProjectList"
              :key="item.Id"
              :value="item.Id"
              :label="item.Name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择职位" prop="Position">
          <el-select
            v-model="dataObject.Position"
            filterable
            clearable
            remote
            placeholder="请选择"
            v-el-select-loadmmore="loadmores"
            class="PlaceSelect"
          >
            <el-option
              v-for="item in crucial"
              :key="item.Id"
              :value="item.Id"
              :label="item.PositionName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="招聘类型" prop="genre">
          <el-select
            v-model="dataObject.genre"
            filterable
            clearable
            remote
            placeholder="请选择"
            class="PlaceSelect"
          >
            <el-option
              v-for="item in RecruitmentType"
              :key="item.value"
              :value="item.value"
              :label="item.describe"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="招聘计提类型" prop="provision">
          <el-select
            v-model="dataObject.provision"
            filterable
            clearable
            remote
            placeholder="请选择"
            class="PlaceSelect"
          >
            <el-option
              v-for="item in RecruitmentTypes"
              :key="item.value"
              :value="item.value"
              :label="item.describe"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐人" prop="tuijianName">
          <el-select
            v-model="dataObject.tuijianName"
            filterable
            clearable
            remote
            placeholder="请选择"
            :remote-method="GetSysUserList"
            v-el-select-loadmmore="loadmore"
            class="PlaceSelect"
            @change="referrer(dataObject.tuijianName)"
          >
            <el-option
              v-for="item in Referral"
              :key="item.Id"
              :value="item.Id"
              :label="item.UserName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请部门" prop="ApplicationDepartment">
          <el-select
            v-model="dataObject.ApplicationDepartment"
            size="small"
            filterable
            remote
            placeholder="请选择申请部门"
          >
            <el-option
              v-for="item in ApplicationDepartmentList"
              :key="item.OrgId"
              :label="item.FullOrgName"
              :value="item.OrgId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" class="textarea-note">
          <el-input
            type="textarea"
            :rows="5"
            maxlength="100"
            show-word-limit
            v-model="dataObject.Remark"
            size="small"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-multiple">
        <el-button round class="erpbtn" size="small" @click="close"
          >取消</el-button
        >
        <el-button
          round
          class="erpbtn"
          size="small"
          @click="dialogtrue('ruleForm')"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetOrgByUserId } from "@/api/SystemSetting.js";
import qs from "qs";
import { GetProjectList } from "@/api/projectManagement.js";
import { GetSysUserList } from "@/api/SystemSetting.js";
import {
  GetProjectRecruitList,
  GetRecruitPipelineEnumRecruitType,
  GetRecruitPipelineEnumRecruitProvisionType,
} from "@/api/Public.js";
import { MenuIdDate, showLoading, hideLoading } from "@/utils/CustomValidation";
export default {
  name: "EditRecommendedEntryDetails",
  props: ["sendId", "Recommend", "ChannelTitle"],
  data() {
    return {
      dataObject: {
        ProjectId: "",
        ApplicationDepartment: "",
        Position: "",
        genre: "",
        provision: "",
        tuijianName: "",
        Remark: "",
      },

      rules: {
        ApplicationDepartment: [
          { required: true, message: "请选择推荐部门", trigger: "change" },
        ],
        ProjectId: [
          { required: true, message: "请选择项目名称", trigger: "change" },
        ],
        Position: [
          { required: true, message: "请选择职位", trigger: "change" },
        ],
        genre: [
          { required: true, message: "请选择招聘类型", trigger: "change" },
        ],
        provision: [
          { required: true, message: "请选择招聘计提类型", trigger: "change" },
        ],
        tuijianName: [
          { required: true, message: "请选择推荐人", trigger: "change" },
        ],
      },
      statused: false,
      operatiOBj: {},
      ApplicationDepartmentList: [],
      crucial: [],
      ProjectList: [],
      isShow: false,
      RecruitmentType: [],
      RecruitmentTypes: [],
      Referral: [],
      pageIndex: 1,
      pageSize: 20,
      PageSize: 10,
      confims: {
        StaffIds: "",
        RecruitType: 0,
        RecruitProvisionType: 0,
        ProjectRecruitId: 0,
        RecommenderId: 0,
        Remark: "",
      },
    };
  },
  directives: {
    "el-select-loadmmore": {
      bind(el, binding) {
        // 因为el-select最终会渲染成ul  li  ，所以我们要找到对应的ul元素节点，因为最底层的滚动条就是这个ul的
        const SELECTDOM = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        // 为对应的ul绑定滚动条滚动事件
        SELECTDOM.addEventListener("scroll", function () {
          const condition =
            this.scrollHeight - this.scrollTop == this.clientHeight;
          // 判断滚动到底部
          if (condition) {
            // binding.value 为自定义指令绑定的值，因为绑定的是个方法，所以这里是方法调用，触发指令后执行加载数据
            binding.value();
          }
        });
      },
    },
  },
  watch: {
    Recommend(newVal, oldVal) {
      this.isShow = newVal;
      if (newVal == false) {
        this.dataObject = {
          ProjectId: "",
          ApplicationDepartment: "",
          Position: "",
          genre: "",
          provision: "",
          tuijianName: "",
          Remark: "",
        };
      }
    },
  },
  created() {
    this.operatiOBj = JSON.parse(localStorage.getItem("looks"));
    this.remoteProject();
    this.GetRecruitPipelineEnumRecruitType();
    this.GetRecruitPipelineEnumRecruitProvisionType();
    this.GetSysUserList();
  },
  methods: {
    //获取项目类型
    SelectChange() {
      this.dataObject.Position = "";
      this.GetProjectRecruitList();
    },
    //获取项目下拉列表
    remoteProject(val) {
      let data = {
        Name: val,
        BusinessType: "-1",
        Priority: "-1",
        Status: "-1",
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: 1,
      };
      GetProjectList(qs.stringify(data)).then((response) => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.ProjectList = response.Data;
          } else {
            this.ProjectList = [];
          }
        } else {
          this.ProjectList = [];
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },
    //关闭弹窗
    close() {
      this.$emit("closeDlg", false);
    },
    //加载职位
    loadmores() {
      this.PageSize = this.PageSize + 10;
      this.GetProjectRecruitList();
    },
    //加载推荐人
    loadmore() {
      this.pageSize = this.pageSize + 20;
      this.GetSysUserList();
    },
    //获取推荐人列表
    GetSysUserList(value) {
      let obj = {
        menuid: this.operatiOBj.menuid,
        operationcode: this.operatiOBj.OperationCode,
        UserId: "",
        UserName: value,
        Status: 1,
        PageIndex: this.pageIndex,
        PageSize: this.pageSize,
        Sign: "",
      };
      GetSysUserList(obj).then((res) => {
        this.Referral = res.Data;
      });
    },
    //获取备注信息
    FeedIn() {
      this.confims.Remark = this.reMark;
      console.log(this.confims);
    },
    referrer(e) {
      this.dataObject.ApplicationDepartment = "";
      let obj = {
        SysUserId: e,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetOrgByUserId(obj).then((res) => {
        if (res.MessageCode == 0 && res.Data.length > 0) {
          this.ApplicationDepartmentList = res.Data;
        } else {
          this.ApplicationDepartmentList = [];
        }
      });
    },
    // //获取推荐人信息
    // referrer(e) {
    //   for (var i in e) {
    //     if (e[i].UserName == this.tuijianName) {
    //       this.confims.RecommenderId = e[i].Id;
    //     }
    //   }
    // },
    //确定
    dialogtrue(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let obj = {
            menuid: MenuIdDate(),
            operationcode: "1",
            StaffIds: this.sendId,
            RecruitType: this.dataObject.genre,
            RecruitProvisionType: this.dataObject.provision,
            ProjectRecruitId: this.dataObject.Position,
            RecommenderId: this.dataObject.tuijianName,
            SysOrgId: this.dataObject.ApplicationDepartment,
            Remark: this.dataObject.Remark,
          };
          this.$emit("RecommendSave", obj);
        } else {
          this.$message({
            message: "请按要求填写表单内容",
            type: "error",
          });
          return false;
        }
      });
    },
    //取消
    cancel() {
      this.changeStatus();
    },
    //关闭弹窗
    changeStatus() {
      this.$emit("statused", false);
    },
    //获取职位信息
    GetProjectRecruitList() {
      let obj = {
        menuid: this.operatiOBj.menuid,
        operationcode: this.operatiOBj.OperationCode,
        IdArr: "",
        PositionName: "",
        ProjectName: "",
        ProjectId: this.dataObject.ProjectId,
        RecruiterName: "",
        RecruitStatus: 0,
        PageIndex: 1,
        PageSize: this.PageSize,
        Sign: "",
      };
      GetProjectRecruitList(obj).then((res) => {
        if (res.MessageCode == 0) {
          this.crucial = res.Data;
        } else {
          this.crucial = [];
        }
      });
    },
    //获取招聘类型
    GetRecruitPipelineEnumRecruitType() {
      let obj = {
        menuid: this.operatiOBj.menuid,
        operationcode: this.operatiOBj.OperationCode,
        Sign: "",
      };
      GetRecruitPipelineEnumRecruitType(obj).then((res) => {
        this.RecruitmentType = res;
      });
    },
    //获取招聘计提类型
    GetRecruitPipelineEnumRecruitProvisionType() {
      let obj = {
        menuid: this.operatiOBj.menuid,
        operationcode: this.operatiOBj.OperationCode,
        Sign: "",
      };
      GetRecruitPipelineEnumRecruitProvisionType(obj).then((res) => {
        this.RecruitmentTypes = res;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.forms {
  position: relative;
  /deep/ .el-form-item {
    width: 50%;
    float: left;
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

        .el-select__tags {
          background: #f0f4fa;
          top: 68%;
          border-radius: 4px;
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
      .ChannelName-icon {
        position: absolute;
        left: 70px;
        top: 5px;
        cursor: pointer;
      }
    }
    &:nth-child(odd) {
      padding-right: 20px;
    }
  }
  /deep/ .State {
    .el-radio-group {
      display: block;
      margin-top: 40px;
      height: 24px;
      label {
        &:nth-child(1) {
          margin-right: 60px;
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
  }
  /deep/ .Address {
    width: 100%;
    .el-form-item__label {
      width: 100%;
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
}
</style>