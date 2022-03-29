<!-- 提交初审 -->
<template>
  <div class="update-File-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form ref="ruleForm" label-position="top" :model="Trialform" :rules="rules" label-width="140px" class="customerform">
        <div class="form-title">基本信息</div>
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="所属客户" prop="CompanyId">
                <el-select v-model="Trialform.CompanyId" disabled clearable placeholder="请查询或下拉选择所属客户" class="select-input">
                  <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="所属项目" prop="ProjectId">
                <el-select v-model="Trialform.ProjectId" disabled clearable placeholder="请先查询签约客户再选择所属项目" class="select-input">
                  <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="项目业务类型" prop="BusinessType">
                <el-select v-model="Trialform.BusinessType" disabled clearable placeholder="请选择项目业务类型">
                  <el-option v-for="(item, index) in ProjectBusinesslist" :key="index" :label="item.describe" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="isShow">
              <el-form-item label="首月人数" prop="FirstMonthNum">
                <el-input v-model="Trialform.FirstMonthNum" disabled clearable placeholder="请输入首月人数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="岗位名称" prop="PositionName" v-if="isShow">
                <el-input v-model="Trialform.PositionName" disabled clearable placeholder="请输入岗位名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-if="isShow">
              <el-form-item label="员工保险缴纳地是否为南宁" prop="SiArea">
                <el-select v-model="Trialform.SiArea" clearable placeholder="请选择员工保险缴纳地是否为南宁">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in IsNanning" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="经办人" prop="AgentId">
                <el-select v-model="Trialform.AgentId" disabled filterable clearable placeholder="搜索或选择经办人" @change="SelectUser($event)" :remote-method="(query)=>{SysUserMethod(query)}" @clear="SysUserMethod('')">
                  <el-option :label="item.UserName" :value="item.Id" v-for="(item, index) in SysUserlist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="经办部门" prop="OrgId">
                <el-select v-model="Trialform.OrgId" clearable placeholder="请选择经办部门" @change="SelectOrg($event)">
                  <el-option :label="item.FullOrgName" :value="item.OrgId" v-for="(item, index) in departmentList" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="合作内容" class="text" prop="Describe">
                <el-input type="textarea" :rows="6" v-model="Trialform.Describe" maxlength="1000" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="初审备注" class="text" prop="Remark">
                <el-input type="textarea" :rows="6" v-model="Trialform.Remark" maxlength="2000" show-word-limit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-cont" v-if="Trialform.BusinessType == 1 || Trialform.BusinessType == 2">
          <el-table ref="industrtTable1" :data="tableData1" class="erp-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark" show-summary :summary-method="getSummaries">
            <el-table-column align="center" type="index" label="序号" width="60" />
            <el-table-column align="center" prop="APayAmount" label="甲方支付的每人每月费用合计" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.APayAmount" clearable type="number" placeholder="请填写甲方支付的每人每月费用合计" @input="AmountInput(scope.row,scope.$index)"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="StaffSalary" label="每人每月工资" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.StaffSalary" clearable type="number" placeholder="请填写每人每月工资" @input="SalaryInput(scope.row,scope.$index)"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="StaffCost" label="每人每月法定用工成本（自动计算）" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.StaffCost" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="GrossProfit" label="每人每月的毛利估算（自动计算）" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.GrossProfit" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="Remark" label="毛利估算结果为负数的说明" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.Remark" clearable placeholder="请填写毛利估算结果为负数的说明"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" prop="Name" label="操作" width="100">
              <template slot-scope="scope">
                <a class="optionBtn" @click="AddTable1(scope.$index)" v-if="scope.$index == 0">添加</a>
                <a class="optionBtn" @click="DelTable1(scope.$index)" v-if="scope.$index > 0">删除</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="form-cont" v-if="Trialform.BusinessType == 3">
          <el-table ref="industrtTable2" :data="tableData2" class="erp-table" style="width: 100%;margin-bottom: 20px;" tooltip-effect="dark">
            <el-table-column align="center" type="index" label="序号" width="60" />
            <el-table-column align="center" prop="StaffSalary" label="估算我司用工的法定成本" min-width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.StaffSalary" type="number" clearable placeholder="请填写估算我司用工的法定成本"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="APayAmount" label="按合同列示内容填写甲方支付的每人每月费用合计" min-width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.APayAmount" type="number" clearable placeholder="请填写甲方支付的每人每月费用合计"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="GrossProfit" label="估算合同每人每月的毛利" min-width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.GrossProfit" type="number" clearable placeholder="请填写估算合同每人每月的毛利"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" prop="Name" label="操作" width="100">
              <template slot-scope="scope">
                <a class="optionBtn" @click="AddTable2(scope.$index)" v-if="scope.$index == 0">添加</a>
                <a class="optionBtn" @click="DelTable2(scope.$index)" v-if="scope.$index > 0">删除</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="form-title" v-if="FileName">合同附件</div>
        <div class="file-cont" v-if="FileName">
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
        </div>
      </el-form>
    </div>
    <div class="bottom">
      <!-- 添加 -->
      <el-button class="erpbtn" size="small" @click="Closeform">取消</el-button>
      <el-button class="erpbtn" size="small" @click="Saveform('ruleForm')">提交初审</el-button>
    </div>
    <PreviewFile :isImg="isImg" :iframeShow="iframeShow" :previewFileUrl="previewFileUrl" @closeFileShow="closeFileShow"></PreviewFile>
  </div>
</template>
<script>
import {
  GetProjectContractApprove,
  ProjecctContractFirstApprove,
  GetProjectBusinessType
} from "@/api/projectManagement.js";
import BreadCrumb from "@/components/publicComponents/breadCrumb.vue";
import PreviewFile from "@/components/publicComponents/PreviewFile.vue";
import SupperUploader from "@/utils/SupperUploader";
import { GetSysUserList, GetOrgByUserId } from "@/api/SystemSetting.js";
import {
  showLoading,
  hideLoading,
  MenuIdDate,
  uuid,
  copy
} from "@/utils/CustomValidation";
import axios from "axios";
import qs from "qs";
export default {
  components: {
    BreadCrumb,
    PreviewFile
  },
  data() {
    return {
      urlList: [
        {
          name: "项目合同管理",
          router: "/ContractManagement/ProjectContractManagement"
        },
        {
          name: "提交初审",
          router: ""
        }
      ],
      Trialform: {
        CompanyId: "",
        ProjectId: "",
        BusinessType: "",
        FirstMonthNum: "",
        PositionName: "",
        SiArea: "",
        Describe: "",
        Attachment: "",
        AgentId: "",
        OrgId: "",
        OrgName: "",
        Remark: ""
      },
      IsNanning: [
        {
          value: "0",
          describe: "否"
        },
        {
          value: "1",
          describe: "是"
        }
      ], //是否使用我司模板
      ContractId: "",
      SysUserlist: [], //经办人列表
      departmentList: [], //经办部门列表
      CompanyPageList: [],
      ProjectList: [],
      ProjectBusinesslist: [],
      tableData1: [
        {
          APayAmount: "",
          StaffSalary: "",
          StaffCost: "",
          GrossProfit: "",
          Remark: ""
        }
      ],
      tableData2: [
        {
          APayAmount: "",
          StaffSalary: "",
          GrossProfit: ""
        }
      ],
      FileName: "",
      filestype: "",
      isShow: false,
      optionShow: false,
      isImg: 1,
      iframeShow: false,
      previewFileUrl: "",
      rules: {
        SiArea: [
          {
            required: true,
            message: "请选择员工保险缴纳地是否为南宁",
            trigger: "change"
          }
        ],
        AgentId: [
          { required: true, message: "请选择经办人", trigger: "change" }
        ],
        OrgId: [
          { required: true, message: "请选择经办部门", trigger: "change" }
        ],
        Describe: [
          { required: true, message: "请输入合作内容", trigger: "blur" }
        ],
        Remark: [{ required: true, message: "请输入初审备注", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getProjectBusinessType();
    if (this.$route.query.Id) {
      this.ContractId = this.$route.query.Id;
      this.GetProjectContractData();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.ruleForm.resetFields();
    });
  },
  methods: {
    // 获取项目类型
    getProjectBusinessType() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetProjectBusinessType(qs.stringify(obj)).then(response => {
        if (response) {
          this.ProjectBusinesslist = response;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //获取初审时信息
    GetProjectContractData() {
      let obj = {
        ProjectContractId: this.ContractId,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      GetProjectContractApprove(qs.stringify(obj)).then(response => {
        console.log(response);
        if (response.IsSuccess && response.Data) {
          let DataDetail = response.Data;
          this.CompanyPageList = [
            {
              Id: DataDetail.CompanyId,
              Name: DataDetail.CompanyName
            }
          ];
          this.ProjectList = [
            {
              Id: DataDetail.ProjectId,
              Name: DataDetail.ProjectName
            }
          ];
          this.Trialform = {
            CompanyId: DataDetail.CompanyId,
            ProjectId: DataDetail.ProjectId,
            BusinessType: DataDetail.BusinessType,
            FirstMonthNum: DataDetail.FirstMonthNum,
            PositionName: DataDetail.PositionName,
            SiArea: DataDetail.SiArea + "",
            Describe: DataDetail.Describe,
            Attachment: DataDetail.Attachment,
            AgentId: "",
            OrgId: "",
            OrgName: "",
            Remark: DataDetail.Remark
          };
          const Current =
            JSON.parse(window.localStorage.getItem("Current")) || {};
          this.SysUserMethod(Current.currentUser);
          this.SelectUser(Current.currentId);
          this.Trialform.AgentId = Current.currentId;
          if (DataDetail.Attachment) {
            this.FileName = DataDetail.Attachment;
            this.filestype = DataDetail.Attachment.slice(
              DataDetail.Attachment.lastIndexOf(".") + 1
            ).toUpperCase();
          }
          if (DataDetail.BusinessType <= 3) {
            this.isShow = true;
          }
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
      this.Trialform.OrgId = "";
      this.Trialform.OrgName = "";
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
      console.log(value, this.Trialform);
      for (let item of this.departmentList) {
        if (value == item.OrgId) {
          this.Trialform.OrgName = item.FullOrgName;
        }
      }
    },
    // 预览
    preview() {
      if (this.Trialform.Attachment) {
        const ext = this.Trialform.Attachment.slice(
          this.Trialform.Attachment.lastIndexOf(".") + 1
        ).toLowerCase();
        if (ext == "pdf") {
          this.isImg = 2;
          this.previewFileUrl = this.Trialform.Attachment;
        } else if (
          ext == "doc" ||
          ext == "docx" ||
          ext == "xlsx" ||
          ext == "xls"
        ) {
          this.isImg = 3;
          this.previewFileUrl =
            "https://view.officeapps.live.com/op/view.aspx?src=" +
            this.Trialform.Attachment;
        } else {
          this.isImg = 1;
          this.previewFileUrl = this.Trialform.Attachment;
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
      if (this.Trialform.Attachment) {
        window.open(this.Trialform.Attachment);
      } else {
        this.$message({
          message: "该合同没有上传合同文件",
          type: "error"
        });
      }
    },
    //添加一二项目类型表格行
    AddTable1(index) {
      this.tableData1.splice(index + 1, 0, {
        APayAmount: "",
        StaffSalary: "",
        StaffCost: "",
        GrossProfit: "",
        Remark: ""
      });
    },
    //删除一二项目类型表格行
    DelTable1(index) {
      this.tableData1.splice(index, 1);
    },
    //计算每人每月费用事件
    AmountInput(data, index) {
      if (data.APayAmount > 0 && data.StaffCost) {
        setTimeout(() => {
          let GrossProfit = Number(data.APayAmount - data.StaffCost);
          if (GrossProfit == 0) {
            this.tableData1[index].GrossProfit = GrossProfit;
          } else {
            this.tableData1[index].GrossProfit = Number(GrossProfit).toFixed(2);
          }
        }, 1500);
      } else {
        this.tableData1[index].GrossProfit = "";
      }
    },
    //计算每人每月工资事件
    SalaryInput(data, index) {
      console.log(data, index);
      if (data.StaffSalary && data.StaffSalary > 0) {
        setTimeout(() => {
          if (this.Trialform.SiArea == 1) {
            this.tableData1[index].StaffCost = parseFloat(
              Number(data.StaffSalary) + Number(data.StaffSalary * 0.3215)
            ).toFixed(2);
          } else {
            this.tableData1[index].StaffCost = parseFloat(
              Number(data.StaffSalary) + Number(data.StaffSalary * 0.32)
            ).toFixed(2);
          }
          if (data.APayAmount > 0) {
            let GrossProfit = Number(data.APayAmount - data.StaffCost);
            if (GrossProfit == 0) {
              this.tableData1[index].GrossProfit = GrossProfit;
            } else {
              this.tableData1[index].GrossProfit = Number(GrossProfit).toFixed(
                2
              );
            }
          }
        }, 1500);
      } else {
        this.tableData1[index].StaffCost = "";
      }
    },
    //添加三项目类型表格行
    AddTable2(index) {
      this.tableData2.splice(index + 1, 0, {
        APayAmount: "",
        StaffSalary: "",
        GrossProfit: ""
      });
    },
    //删除三项目类型表格行
    DelTable2(index) {
      this.tableData2.splice(index, 1);
    },
    // 处理合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
        } else if (index === 1 || index === 2 || index === 3 || index === 4) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if (sums[index] != 0) {
              sums[index] = Number(sums[index]).toFixed(2);
            }
          } else {
            sums[index] = " ";
          }
        } else {
          sums[index] = "--";
        }
      });
      return sums;
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
    Saveform(form) {
      // 调用接口,保存数据
      this.$refs[form].validate(valid => {
        if (valid) {
          let param = {
            ProjectContractId: this.ContractId,
            BusinessType: this.Trialform.BusinessType,
            SiArea: this.Trialform.SiArea,
            Describe: this.Trialform.Describe,
            Remark: this.Trialform.Remark,
            Attachment: this.Trialform.Attachment,
            SysOrgId: this.Trialform.OrgId,
            ProjectStaffCost: [],
            menuid: MenuIdDate(),
            operationcode: "1"
          };
          if (
            this.Trialform.BusinessType == 1 ||
            this.Trialform.BusinessType == 2
          ) {
            for (let i = 0; i < this.tableData1.length; i++) {
              if (
                this.tableData1[i].APayAmount &&
                this.tableData1[i].StaffSalary &&
                this.tableData1[i].GrossProfit
              ) {
                param.ProjectStaffCost.push({
                  APayAmount: this.tableData1[i].APayAmount,
                  StaffSalary: this.tableData1[i].StaffSalary,
                  GrossProfit: this.tableData1[i].GrossProfit,
                  Remark: this.tableData1[i].Remark
                });
              }
            }
          } else if (this.Trialform.BusinessType == 3) {
            for (let i = 0; i < this.tableData2.length; i++) {
              if (
                this.tableData2[i].APayAmount &&
                this.tableData2[i].StaffSalary &&
                this.tableData2[i].GrossProfit
              ) {
                param.ProjectStaffCost.push({
                  APayAmount: this.tableData2[i].APayAmount,
                  StaffSalary: this.tableData2[i].StaffSalary,
                  GrossProfit: this.tableData2[i].GrossProfit,
                  Remark: ""
                });
              }
            }
          } else {
            param.ProjectStaffCost = [];
          }
          ProjecctContractFirstApprove(qs.stringify(param)).then(response => {
            if (response.MessageCode == 0) {
              this.$message({
                type: "success",
                message: "项目合同提交初审成功!"
              });
              setTimeout(() => {
                this.$router.go(-1);
              }, 2000);
            } else {
              this.$message({
                message: response.MessageContent,
                type: "error"
              });
            }
          });
        } else {
          this.$message({
            message: "请按要求填写表单内容",
            type: "error"
          });
          return false;
        }
      });
    },
    Closeform() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.update-File-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  /deep/ .form-content {
    background-color: #fff;
    border-radius: 8px 0px 0px 8px;
    margin-left: 24px;
    padding: 40px 40px 80px 40px;
    .customerform {
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
          .svg-icon {
            color: #fff;
            font-size: $f16;
            margin-right: 8px;
          }
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
        margin-bottom: 24px;
        .el-form-item__label {
          line-height: 14px;
          font-size: $f14;
          color: $erp666;
          font-weight: 400;
          padding-bottom: 8px;
        }
        .el-form-item__content {
          // max-width: 336px;
          line-height: inherit;
          width: 100%;
          .el-input__inner {
            background-color: $erinputbgc;
          }
          .el-select {
            width: 100%;
            .el-input {
              .el-input__inner {
                height: 36px;
                line-height: 36px;
              }
            }
            .el-input__suffix {
              height: 38px;
              line-height: 38px;
            }
          }
          .el-input {
            font-size: 14px;
            .el-input__inner {
              height: 36px;
              line-height: 36px;
            }
            .el-input__suffix {
              // height: 38px;
              line-height: 36px;
            }
          }
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
        // 时间选择器样式
        &.datetime {
          .el-form-item__content {
            .el-date-editor {
              width: 100% !important;
            }
          }
        }
        // vue-tree-input样式
        &.vue-tree {
          .el-form-item__content {
            .vue-treeselect {
              height: 36px;
              .vue-treeselect__control {
                height: 36px;
                border-color: #cfcfcf;
                &:hover {
                  border-color: #cfcfcf !important;
                }
                background-color: $erinputbgc;
                .vue-treeselect__value-container {
                  height: 36px;
                  .vue-treeselect__placeholder {
                    font-size: 14px;
                    color: #a3b1cc;
                    line-height: 34px;
                    margin-left: 5px;
                  }
                }
                .vue-treeselect__control-arrow-container {
                  height: 36px;
                }
              }
            }
          }
          &.multiples {
            .el-form-item__content {
              .vue-treeselect {
                height: auto;
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
                &.add {
                  color: #fff;
                  vertical-align: text-top;
                  font-size: 20px;
                }
              }
            }
          }
        }
        // // 底部添加按钮
        // &.bottom {
        //   .el-form-item__content {
        //     text-align: center;
        //     max-width: 100%;
        //     .el-button+.el-button {
        //       margin-left: 24px;
        //     }
        //   }
        // }
      }
      // 循环的样式
      .form-cont {
        padding-bottom: 16px;
        margin-bottom: 40px;
        border-bottom: 1px solid $erpBK;
        &:last-child {
          border-bottom: none;
        }
        .contact-list {
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
          // // 底部操作按钮
          // .operate-btn {
          //   position: absolute;
          //   right: 0;
          //   bottom: 40px;
          //   display: flex;
          // }
          // .btn {
          //   cursor: pointer;
          //   margin-left: 64px;
          //   font-size: $f14;
          //   color: $erpplaceholder;
          // }
          // 底部操作按钮
          .operate-btn {
            justify-content: flex-end;
            display: flex;
          }
          .btn {
            cursor: pointer;
            margin-left: 64px;
            font-size: $f14;
            color: $erpplaceholder;
            .svg-icon {
              margin-right: 8px;
              font-size: $f16;
              &.add {
                color: #fff;
              }
            }
          }
          // 顶部编辑按钮
          .operate-top {
            position: absolute;
            right: 0;
            top: 0;
          }
          .tissue {
            // height: 64px;
            .vue-treeselect__control {
              width: 100%;
              background: #f0f4fa;
              border: 1px solid #dcdfe6;
              line-height: 30px;
              margin-top: 2px;
              padding-left: 10px;
              height: 30px;
              outline: none;
              font-size: 12px;
              &:hover {
                border: 1px solid #a3b1cc !important;
              }
              .vue-treeselect__value-container {
                line-height: 34px;
                min-height: 34px;
                .vue-treeselect__placeholder {
                  line-height: 34px;
                  margin-left: 0;
                }
              }
            }
          }
          .is-error {
            .vue-treeselect__control {
              border: 1px solid #f56c6c;
            }
          }
        }
        .optionBtn {
          padding: 0 5px;
          color: #1588f8;
        }
      }
      // 关联关系
      .el-row.relation {
        position: relative;
        // .operate {
        //   display: flex;
        //   position: absolute;
        //   right: 0;
        //   bottom: 24px;
        //   .btn {
        //     cursor: pointer;
        //     margin-left: 64px;
        //     font-size: $f14;
        //     color: $erpplaceholder;
        //   }
        // }
        // 底部操作按钮
        .operate-btn {
          justify-content: flex-end;
          display: flex;
        }
        .btn {
          cursor: pointer;
          margin-left: 64px;
          font-size: $f14;
          color: $erpplaceholder;
          .svg-icon {
            margin-right: 8px;
            font-size: $f16;
            &.add {
              color: #fff;
            }
          }
        }
      }
      // 附件上传样式
      .file-cont {
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
      .tip {
        font-size: $f14;
        color: $erp999;
        margin-bottom: 16px;
      }
    }
  }
  // 底部添加按钮
  .bottom {
    position: fixed;
    box-shadow: 0px 0px 20px 0px rgba(21, 136, 248, 0.1);
    bottom: 0;
    right: 0;
    margin-bottom: 0;
    text-align: center;
    width: calc(100% - 224px);
    height: 80px;
    line-height: 80px;
    background-color: #fff;
    z-index: 999;
    .el-button + .el-button {
      margin-left: 24px;
    }
  }
}
</style>