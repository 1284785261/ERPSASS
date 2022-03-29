  <!-- 添加/修改渠道 -->
<template>
  <div class="tag-container">
    <el-dialog
      :close-on-click-modal="false"
      :title="ChannelTitle"
      class="dialog-box"
      append-to-body
      :visible.sync="showChannel"
      :show-close="false"
      :destroy-on-close="true"
      width="800px"
      @close="close"
    >
      <i class="el-icon-circle-close closeButton" @click="close"></i>
      <el-form ref="ruleForm" :model="dataObject" :rules="rules" class="forms">
        <el-form-item label="渠道类型" prop="ChannelType">
          <el-select
            v-model="dataObject.ChannelType"
            filterable
            remote
            clearable
            placeholder="请查询或下拉选择渠道负责人"
            class="select-input"
            :remote-method="GetChannelTypeList"
            :loading="loading"
          >
            <el-option
              v-for="item in ChannelTypeList"
              :key="item.value"
              :label="item.describe"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道名称" prop="ChannelName">
          <el-tooltip
            class="ChannelName-icon"
            effect="dark"
            content="请根据实际情况进行命名，系统不允许名称重复"
            placement="top-start"
          >
            <i class="el-icon-warning"></i>
          </el-tooltip>
          <el-input
            v-model="dataObject.ChannelName"
            size="small"
            clearable
            placeholder="请输入渠道名称"
          />
        </el-form-item>
        <el-form-item label="渠道联系人" prop="Contacts">
          <el-input
            v-model="dataObject.Contacts"
            size="small"
            clearable
            placeholder="请输入渠道联系人"
          />
        </el-form-item>
        <el-form-item label="渠道联系电话" prop="Tel">
          <el-input
            v-model="dataObject.Tel"
            size="small"
            clearable
            placeholder="请输入渠道联系电话"
          />
        </el-form-item>
        <el-form-item label="渠道负责人" prop="SysUserId">
          <el-select
            v-model="dataObject.SysUserId"
            filterable
            remote
            clearable
            placeholder="请查询或下拉选择渠道负责人"
            class="select-input"
            @clear="clearUser1"
            :remote-method="UserMethod1"
            :loading="loading"
          >
            <el-option
              v-for="item in SysUserList1"
              :key="item.Id"
              :label="item.UserName"
              :value="item.Id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道开发人" prop="Developer">
          <el-select
            v-model="dataObject.Developer"
            filterable
            remote
            clearable
            placeholder="请查询或下拉选择渠道开发人"
            class="select-input"
            @clear="clearUser2"
            :remote-method="UserMethod2"
            :loading="loading"
          >
            <el-option
              v-for="item in SysUserList2"
              :key="item.Id"
              :label="item.UserName"
              :value="item.Id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道质量" prop="Quality">
          <el-select
            v-model="dataObject.Quality"
            filterable
            clearable
            placeholder="请选择渠道质量"
            class="select-input"
          >
            <el-option
              v-for="item in QualityList"
              :key="item.value"
              :label="item.describe"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道地址" prop="Type" class="Address">
          <el-select
            v-model="province"
            filterable
            clearable
            placeholder="请选择省份"
          >
            <el-option
              :label="item.Name"
              :value="item.Id"
              v-for="(item, index) in provincelist"
              :key="index"
            ></el-option>
          </el-select>
          <el-select
            v-model="city"
            filterable
            clearable
            placeholder="请选择城市"
          >
            <el-option
              :label="item.Name"
              :value="item.Id"
              v-for="(item, index) in citylist"
              :key="index"
            ></el-option>
          </el-select>
          <el-select
            v-model="AreaId"
            filterable
            clearable
            placeholder="请选择区县"
          >
            <el-option
              :label="item.Name"
              :value="item.Id"
              v-for="(item, index) in arealist"
              :key="index"
            ></el-option>
          </el-select>
          <el-input
            class="address-input"
            clearable
            v-model="dataObject.Address"
            maxlength="100"
            placeholder="渠道详细地址"
          ></el-input>
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
import {
  GetRecruitChannelPageList,
  GetRecruitChannelEnumQuality,
  GetRecruitChannelEnumType,
} from "@/api/RecruitmentManagement.js";
import { GetSysUserList } from "@/api/SystemSetting.js";
import { GetAreaList } from "@/api/Public.js";
import { uuid, copy, MenuIdDate } from "@/utils/CustomValidation";
import axios from "axios";
import qs from "qs";
export default {
  name: "EditChannel",
  props: ["ChannelVisible", "ChannelTitle", "ChannelData"],
  data() {
    return {
      dataObject: {
        Id: "",
        ChannelType: "",
        ChannelName: "",
        Contacts: "",
        Tel: "",
        AreaId: "",
        Address: "",
        SysUserId: "",
        Developer: "",
        Quality: "",
      },
      ChannelTypeList: [], //渠道类型列表
      provincelist: [], //省
      citylist: [], //市
      arealist: [], //区
      province: "",
      city: "",
      AreaId: "",
      StaffPageList: [],
      QualityList: [],
      loading: false,
      SysUserList1: [],
      SysUserList2: [],
      rules: {
        ChannelType: [
          { required: true, message: "请选择渠道类型", trigger: "change" },
        ],
        ChannelName: [
          { required: true, message: "请输入渠道名称", trigger: "blur" },
        ],
        Contacts: [
          { required: true, message: "请输入渠道联系人", trigger: "blur" },
        ],
        Tel: [
          { required: true, message: "请输入渠道联系电话", trigger: "blur" },
        ],
        SysUserId: [
          { required: true, message: "请选择渠道负责人", trigger: "change" },
        ],
        Developer: [
          { required: true, message: "请选择渠道开发人", trigger: "change" },
        ],
        Quality: [
          { required: true, message: "请选择渠道质量", trigger: "change" },
        ],
      },
      showChannel: false,
    };
  },
  watch: {
    ChannelVisible(newvalue, oldvalue) {
      this.showChannel = newvalue;
      this.dataObject = this.$options.data().dataObject;
      if (this.ChannelTitle == "修改渠道") {
        this.dataObject = this.ChannelData;
        this.UserMethod1(this.dataObject.SysUserName);
        this.UserMethod2(this.dataObject.DeveloperName);
      } else {
        let UsedFor = JSON.parse(localStorage.getItem("Current"));
        this.dataObject.Developer = UsedFor.currentId;
        this.UserMethod1();
        this.UserMethod2(UsedFor.currentUser);
      }
    },
    province(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: "",
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1",
        };
        GetAreaList(qs.stringify(obj)).then((response) => {
          if (response.IsSuccess) {
            this.citylist = response.Data;
            let isclear = this.citylist.find((v) => {
              return v.Id == this.city;
            });
            if (isclear) {
            } else {
              this.city = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error",
            });
          }
        });
      } else {
        this.city = "";
        this.AreaId = "";
        this.citylist = [];
        this.arealist = [];
      }
    },
    city(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: "",
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1",
        };
        GetAreaList(qs.stringify(obj)).then((response) => {
          if (response.IsSuccess) {
            this.arealist = response.Data;
            let isclear = this.arealist.find((v) => {
              return v.Id == this.AreaId;
            });
            if (isclear) {
            } else {
              this.AreaId = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error",
            });
          }
        });
      } else {
        this.arealist = [];
        this.AreaId = "";
      }
    },
    "dataObject.AreaId"(newvalue, oldvalue) {
      const str = this.arealist.find((v) => {
        return v.Id == newvalue;
      });
      if (!str && !!newvalue) {
        let obj = {
          AreaId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1",
        };
        GetAreaList(qs.stringify(obj)).then((response) => {
          if (response.IsSuccess) {
            var select = response.Data.filter((v) => {
              return v.isselect;
            });
            if (select.find((v) => v.Level == 1) !== undefined) {
              this.province = select.find((v) => v.Level == 1).Id;
            }
            if (select.find((v) => v.Level == 2) !== undefined) {
              this.city = select.find((v) => v.Level == 2).Id;
            }
            if (select.find((v) => v.Level == 3) !== undefined) {
              this.AreaId = select.find((v) => v.Level == 3).Id;
            } else {
              this.AreaId = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error",
            });
          }
        });
      }
    },
  },
  created() {
    this.getAreaList();
    this.GetRecruitChannelEnumQuality();
    this.GetChannelTypeList();
  },
  methods: {
    //获取渠道类型列表
    GetChannelTypeList() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetRecruitChannelEnumType(qs.stringify(obj)).then((response) => {
        this.ChannelTypeList = response;
      });
    },
    //获取渠道质量
    GetRecruitChannelEnumQuality() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetRecruitChannelEnumQuality(qs.stringify(obj)).then((response) => {
        this.QualityList = response;
      });
    },
    // 获取一级地区
    getAreaList() {
      let obj = {
        ParentId: 0,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetAreaList(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          this.provincelist = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },
    //查询渠道负责人列表
    UserMethod1(query) {
      let obj = {
        UserId: "",
        UserName: query,
        Status: 1,
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      this.loading = true;
      setTimeout(() => {
        GetSysUserList(qs.stringify(obj)).then((response) => {
          if (response.IsSuccess) {
            if (response.Data && response.Data.length) {
              this.SysUserList1 = response.Data;
            } else {
              this.SysUserList1 = [];
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error",
            });
          }
          this.loading = false;
        });
      }, 500);
    },
    clearUser1() {
      this.UserMethod1();
    },
    //查询渠道开发人列表
    UserMethod2(query) {
      let obj = {
        UserId: "",
        UserName: query,
        Status: 1,
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      this.loading = true;
      setTimeout(() => {
        GetSysUserList(qs.stringify(obj)).then((response) => {
          if (response.IsSuccess) {
            if (response.Data && response.Data.length) {
              this.SysUserList2 = response.Data;
            } else {
              this.SysUserList2 = [];
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error",
            });
          }
          this.loading = false;
        });
      }, 500);
    },
    clearUser2() {
      this.UserMethod2();
    },
    close() {
      this.province = "";
      this.city = "";
      this.AreaId = "";
      this.dataObject = this.$options.data().dataObject;
      this.$emit("ChanneClose", false);
    },
    dialogtrue(form) {
      // 调用接口,保存数据
      console.log(this.dataObject);
      let dataObj = this.dataObject;
      this.$refs[form].validate((valid) => {
        if (valid) {
          dataObj.AreaId = this.AreaId || this.city || this.province||0;
          this.$emit("ChannelSave", dataObj);
        } else {
          this.$message({
            message: "请按要求填写表单内容",
            type: "error",
          });
          return false;
        }
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