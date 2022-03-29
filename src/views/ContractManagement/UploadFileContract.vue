<!-- 添加修改上传项目合同 -->
<template>
  <div class="update-File-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form ref="ruleForm" label-position="top" :model="FileContractform" :rules="rules" label-width="140px" class="customerform">
        <div class="form-title">基本信息</div>
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="所属客户" prop="CompanyId">
                <el-select v-model="FileContractform.CompanyId" filterable clearable remote placeholder="请查询或下拉选择所属客户" class="select-input" @clear="clearCompany" :remote-method="remoteCompany" :loading="loading" @change="SelectCustom">
                  <el-option v-for="item in CompanyPageList" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="所属项目" prop="ProjectId">
                <el-select v-model="FileContractform.ProjectId" filterable clearable remote placeholder="请先查询签约客户再选择所属项目" class="select-input" @clear="clearProject" :remote-method="remoteProject" :loading="loading" @change="SelectProject($event)">
                  <el-option v-for="item in ProjectList" :key="item.Id" :label="item.Name" :value="item.Id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="合同金额" prop="Amount">
                <el-input v-model="FileContractform.Amount" type="number" placeholder="请输入合同金额" size="small">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="合同名称" prop="Name">
                <el-input v-model="FileContractform.Name" clearable placeholder="请输入合同名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="项目业务类型" prop="BusinessType">
                <el-select v-model="FileContractform.BusinessType" clearable disabled placeholder="">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in ProjectBusinesslist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="项目合同业务类型" prop="Type">
                <el-select v-model="FileContractform.Type" clearable placeholder="请选择项目合同业务类型">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in ProjectBusinessTypeList" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="合同起始日期" prop="StartDate" class="datetime">
                <el-date-picker v-model="FileContractform.StartDate" value-format="yyyy-MM-dd" :picker-options="pickerOptions1" type="date" placeholder="请选择起始日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="合同终止日期" prop="ExpireDate" class="datetime">
                <el-date-picker v-model="FileContractform.ExpireDate" value-format="yyyy-MM-dd" :picker-options="pickerOptions2" type="date" placeholder="请选择终止日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="签订时间" prop="SignDate" class="datetime">
                <el-date-picker v-model="FileContractform.SignDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择签订时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="第三方编号" prop="ThirdPartyCode">
                <el-input v-model="FileContractform.ThirdPartyCode" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="合同签订模式" prop="SignType">
                <el-select v-model="FileContractform.SignType" clearable placeholder="请选择合同签订模式">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in CommisionRuleEnumCommisionBase" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="是否使用我司模板" prop="IsNewTemplate">
                <el-select v-model="FileContractform.IsNewTemplate" clearable placeholder="请选择是否使用我司模板">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in IsTemplateList" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="公司名称" prop="BfCompanyId">
                <el-select v-model="FileContractform.BfCompanyId" filterable clearable placeholder="请选择公司名称">
                  <el-option :key="index" :label="item.Name" :value="item.Id" v-for="(item, index) in BidderList"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="区域" prop="Area">
                <el-select v-model="FileContractform.Area" filterable clearable placeholder="请选择区域">
                  <el-option :label="item.describe" :value="item.describe" v-for="(item, index) in arealist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Development" label="开发形式" prop="Development">
                <el-select v-model="FileContractform.Development" multiple clearable placeholder="请选择开发形式">
                  <el-option :label="item.describe" :value="item.value" v-for="(item, index) in Developmentlist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="备注" class="text">
                <el-input type="textarea" :rows="6" v-model="FileContractform.Remark" maxlength="4000" show-word-limit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-title">出单详情
          <div class="operate cursor-pointer" @click="addsingleDetail()">
            <svg-icon icon-class="add" />
            <span>添加</span>
          </div>
        </div>
        <div class="form-cont">
          <el-row :gutter="64" class="contact-list" v-for="(item, index) in FileContractform.singleDetailList" :key="index">
            <el-col :ref="'contact' + index" :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
              <el-form-item :ref="'singleDetailList.' + index + '.SysUserId'" :prop="'singleDetailList.' + index + '.SysUserId'" :rules="{
                required: true, message: '出单人不能为空', trigger: 'change'
              }" label="出单人">
                <el-select v-model="item.SysUserId" remote filterable clearable placeholder="搜索或选择出单人" @change="SelectUser($event,index)" :remote-method="(query)=>{SysUserMethod(query,index)}" @clear="SysUserMethod('',index)">
                  <el-option :label="ite.UserName" :value="ite.Id" v-for="(ite, index) in item.SysUserlist" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
              <el-form-item :ref="'singleDetailList.' + index + '.OrgId'" :prop="'singleDetailList.' + index + '.OrgId'" :rules="{
                required: true, message: '出单部门不能为空', trigger: 'blur'
              }" label="出单部门">
                <el-select v-model="item.OrgId" clearable placeholder="请选择出单部门" @change="SelectOrg($event,index)">
                  <el-option :label="ite.FullOrgName" :value="ite.OrgId" v-for="(ite, index) in item.departmentList" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
              <el-form-item :ref="'singleDetailList.' + index + '.MarketType'" :prop="'singleDetailList.' + index + '.MarketType'" :rules="{
                required: true, message: '营销类别不能为空', trigger: 'change'
              }" label="营销类别">
                <el-select v-model="item.MarketType" clearable placeholder="请选择营销类别">
                  <el-option :label="ite.describe" :value="ite.value" v-for="(ite, index) in MarketTypeList" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
              <el-form-item label="业绩占比" :prop="'singleDetailList.' + index + '.AchiScale'" :rules="{
                required: true, message: '业绩占比不能为空', trigger: 'blur'
              }">
                <el-input v-model="item.AchiScale" type="number" clearable placeholder="请输入业绩占比" @blur="inspection(item,index)">
                  <svg-icon slot="suffix" icon-class="baifen" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <div v-if="FileContractform.singleDetailList.length !== 1" class="operate-btn">
                <div class="btn" @click="deletesingleDetail(index, item)">
                  <svg-icon icon-class="del" class-name="svg-a" />
                  <span>删除</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="form-title">合同附件(必填)</div>
        <div class="tip">上传格式为PNG、JPG、Word、PDF、XLS、XLSX</div>
        <div class="file-cont" v-loading="fileloading">
          <div class="img-box-list" v-if="filterObj.name" @mouseenter="filterObj.visible=!filterObj.visible" @mouseleave="filterObj.visible=!filterObj.visible">
            <!-- 上传文件成功后展示 -->
            <div class="img-box">
              <span class="filetype">{{filterObj.name}}</span>
              <div class="filename" :title="filterObj.fileName">{{filterObj.fileName}}</div>
            </div>
            <div class="img-box-hover" v-show="filterObj.visible==true">
              <div class="btn">
                <input type="file" accept=".doc,.docx,.pdf,.xls,.xlsx" name="" id="" @change="uploadfile($event)">
                <svg-icon icon-class="replace" class-name="svg-a" />
                <span>替换</span>
              </div>
              <div class="btn" @click="deletefile()">
                <svg-icon icon-class="del" class-name="svg-a" />
                <span>删除</span>
              </div>
            </div>
          </div>
          <div class="img-box-list" v-else>
            <!-- 未上传样式 -->
            <input type="file" ref="upload" accept=".doc,.docx,.pdf,.xls,.xlsx" name="" id="" @change="uploadfile($event)">
            <div class="img-box">
              <img src="@/assets/down.png" alt="">
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="bottom">
      <!-- 添加 -->
      <el-button class="erpbtn" size="small" @click="Closeform">取消</el-button>
      <el-button class="erpbtn" size="small" @click="Saveform('ruleForm')">保存</el-button>
    </div>
  </div>
</template>
<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import SupperUploader from "@/utils/SupperUploader";
import { GetCompanyPageList } from "@/api/CustomerManagement.js";
import { GetBfCompanyPageList } from "@/api/BusinessSet.js";
import {
  GetProjectList,
  GetDevelopmentFormEnum,
  GetProjectBusinessType,
  GetProjectContractEnumType,
  EditProjectContract,
  AddProjectContract,
  GetProjectContract
} from "@/api/projectManagement.js";
import {
  GetSysOrgList,
  GetSysUserList,
  GetOrgByUserId
} from "@/api/SystemSetting.js";
import BreadCrumb from "@/components/publicComponents/breadCrumb.vue";
import {
  showLoading,
  hideLoading,
  MenuIdDate,
  uuid,
  copy,
  upAndDown
} from "@/utils/CustomValidation";
import axios from "axios";
import qs from "qs";
export default {
  components: {
    BreadCrumb,
    Treeselect
  },
  data() {
    const _this = this;
    return {
      urlList: [
        {
          name: "项目合同管理",
          router: "/ContractManagement/ProjectContractManagement"
        },
        {
          name: "新增项目合同",
          router: ""
        }
      ],
      pickerOptions1: {
        disabledDate: time => {
          if (_this.FileContractform.ExpireDate) {
            const data = new Date(_this.FileContractform.ExpireDate);
            data.setDate(data.getDate() - 1);
            return time.getTime() > data;
          } else {
            return false;
          }
        }
      },
      pickerOptions2: {
        disabledDate: time => {
          if (_this.FileContractform.StartDate) {
            const data = new Date(_this.FileContractform.StartDate);
            data.setDate(data.getDate());
            return time.getTime() < data;
          } else {
            return false;
          }
        }
      },
      FileContractform: {
        CompanyId: "",
        ProjectId: "",
        Amount: "",
        Name: "",
        BusinessType: "",
        Type: "",
        StartDate: "",
        ExpireDate: "",
        SignDate: "",
        ThirdPartyCode: "",
        SignType: "",
        IsNewTemplate: "",
        BfCompanyId: "",
        Area: "",
        Attachment: "",
        Status: "0",
        Remark: "",
        singleDetailList: [
          {
            SysUserlist: [],
            departmentList: [],
            OrgId: null,
            OrgName: "",
            MarketType: "",
            SysUserId: "",
            AchiScale: ""
          }
        ]
      },
      rules: {
        CompanyId: [
          { required: true, message: "请选择所属客户", trigger: "change" }
        ],
        ProjectId: [
          { required: true, message: "请选择所属项目", trigger: "change" }
        ],
        Amount: [
          { required: true, message: "请输入合同金额", trigger: "blur" }
        ],
        Name: [{ required: true, message: "请输入合同名称", trigger: "blur" }],
        Type: [
          {
            required: true,
            message: "请选择项目合同业务类型",
            trigger: "change"
          }
        ],
        StartDate: [
          { required: true, message: "请选择合同起始日期", trigger: "change" }
        ],
        ExpireDate: [
          { required: true, message: "请选择合同终止日期", trigger: "change" }
        ],
        SignDate: [
          { required: true, message: "请选择签订日期", trigger: "change" }
        ],
        SignType: [
          { required: true, message: "请选择合同签订模式", trigger: "change" }
        ],
        IsNewTemplate: [
          {
            required: true,
            message: "请选择是否使用我司模板",
            trigger: "change"
          }
        ],
        BfCompanyId: [
          { required: true, message: "请选择公司", trigger: "change" }
        ],
        Area: [{ required: true, message: "请选择区域", trigger: "change" }]
      },
      CompanyPageList: [],
      ProjectList: [],
      ProjectBusinesslist: [],
      ProjectBusinessTypeList: [],
      // Developmentlist: [],
      BidderList: [],
      tissue: [],
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
      IsTemplateList: [
        {
          value: "1",
          describe: "否"
        },
        {
          value: "0",
          describe: "是"
        }
      ], //是否使用我司模板
      MarketTypeList: [
        {
          value: "0",
          describe: "全员营销"
        },
        {
          value: "1",
          describe: "专职营销"
        }
      ],
      loading: false,
      fileloading: false,
      filterObj: [],
      // 树状图对应数据
      normalizer(node) {
        return {
          id: node.Id,
          label: node.OrgName,
          children: node.children
        };
      },
      ContractId: ""
    };
  },
  created() {
    this.GetProjectContractEnumType();
    this.getProjectBusinessType();
    // this.GetDevelopmentFormEnum()
    this.GetBfCompanyPageList();
    // this.getSysOrgList()
    console.log(this.$route);
    if (this.$route.query.Id) {
      this.ContractId = this.$route.query.Id;
      this.getDataDetail();
    } else {
      this.remoteCompany();
      this.SysUserMethod("", 0);
    }
  },
  methods: {
    //编辑时获取数据
    getDataDetail() {
      let data = {
        Id: this.ContractId,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      showLoading();
      GetProjectContract(qs.stringify(data)).then(response => {
        hideLoading();
        if (response.IsSuccess) {
          let DataDetail = response.Data;
          this.FileContractform = {
            CompanyId: DataDetail.CompanyId,
            ProjectId: DataDetail.ProjectId,
            Amount: DataDetail.Amount,
            Name: DataDetail.Name,
            BusinessType: DataDetail.BusinessType,
            Type: DataDetail.Type,
            StartDate: DataDetail.StartDate,
            ExpireDate: DataDetail.ExpireDate,
            SignDate: DataDetail.SignDate,
            ThirdPartyCode: DataDetail.ThirdPartyCode,
            SignType: DataDetail.SignType + "",
            IsNewTemplate: DataDetail.IsNewTemplate + "",
            BfCompanyId: DataDetail.BfCompanyId,
            Area: DataDetail.Area,
            Attachment: DataDetail.Attachment,
            Status: DataDetail.Status,
            Remark: DataDetail.Remark,
            singleDetailList: []
          };
          for (let i = 0; i < DataDetail.AchiScales.length; i++) {
            this.FileContractform.singleDetailList.push({
              SysUserlist: [],
              departmentList: [
                {
                  OrgId: DataDetail.AchiScales[i].OrgId,
                  FullOrgName: DataDetail.AchiScales[i].OrgName
                }
              ],
              OrgId: DataDetail.AchiScales[i].OrgId,
              OrgName: DataDetail.AchiScales[i].OrgName,
              MarketType: DataDetail.AchiScales[i].MarketType + "",
              SysUserId: DataDetail.AchiScales[i].SysUserId,
              AchiScale: DataDetail.AchiScales[i].AchiScale
            });
            this.SysUserMethod(DataDetail.AchiScales[i].SysUserName, i);
          }
          this.remoteCompany(DataDetail.CompanyName);
          this.remoteProject(DataDetail.ProjectName);
          if (DataDetail.Attachment) {
            this.filterObj = {
              name: DataDetail.Attachment.slice(
                DataDetail.Attachment.lastIndexOf(".") + 1
              ).toUpperCase(),
              fileName: DataDetail.Attachment,
              Url: DataDetail.Attachment,
              visible: false
            };
          }
        }
      });
    },
    //获取出单部门列表
    getSysOrgList() {
      let data = {
        OrgName: "",
        menuid: MenuIdDate(),
        operationcode: 1
      };
      GetSysOrgList(qs.stringify(data)).then(response => {
        if (response.IsSuccess) {
          this.tissue = response.Data;
          upAndDown(this.tissue);
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //获取项目业务类型
    GetProjectContractEnumType() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: 1
      };
      GetProjectContractEnumType(qs.stringify(obj)).then(response => {
        this.ProjectBusinessTypeList = response;
      });
    },
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
    // //获取开发方式
    // GetDevelopmentFormEnum () {
    //   let obj = {
    //     menuid: MenuIdDate(),
    //     operationcode: '1'
    //   }
    //   GetDevelopmentFormEnum(qs.stringify(obj)).then(response => {
    //     if (response) {
    //       this.Developmentlist = response
    //     } else {
    //       this.$message({
    //         message: response.MessageContent,
    //         type: 'error'
    //       })
    //     }
    //   })
    // },
    // 搜索客户拥有者
    SysUserMethod(value, index) {
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
          this.FileContractform.singleDetailList[index].SysUserlist =
            response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //选择出单人
    SelectUser(value, index) {
      this.FileContractform.singleDetailList[index].OrgId = "";
      this.FileContractform.singleDetailList[index].OrgName = "";
      let obj = {
        SysUserId: value,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetOrgByUserId(qs.stringify(obj)).then(response => {
        if (response.IsSuccess && response.Data) {
          this.FileContractform.singleDetailList[index].departmentList =
            response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //选择出单部门
    SelectOrg(value, index) {
      for (let item of this.FileContractform.singleDetailList[index]
        .departmentList) {
        if (value == item.OrgId) {
          this.FileContractform.singleDetailList[index].OrgName =
            item.FullOrgName;
        }
      }
    },
    //投标单位
    GetBfCompanyPageList() {
      let obj = {
        Name: "",
        Level: -1,
        Status: 1,
        PageIndex: 1,
        PageSize: 999,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetBfCompanyPageList(obj).then(res => {
        if (res.Data.length > 0 && res.IsSuccess) {
          this.BidderList = res.Data;
        }
      });
    },
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
        const ProjectDetail = localStorage.getItem("projectdetail");
        GetCompanyPageList(qs.stringify(data)).then(response => {
          this.loading = false;
          if (response.IsSuccess) {
            if (response.Data && response.Data.length > 0) {
              this.CompanyPageList = response.Data;
              if (ProjectDetail && ProjectDetail.CompanyId) {
                this.FileContractform.CompanyId = ProjectDetail.CompanyId;
              }
              this.remoteProject();
            } else {
              this.FileContractform.ProjectId = "";
              this.CompanyPageList = [];
            }
          } else {
            this.FileContractform.ProjectId = "";
            this.CompanyPageList = [];
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      }, 200);
    },
    //选择客户
    SelectCustom() {
      this.FileContractform.ProjectId = "";
      this.ProjectList = [];
      this.FileContractform.BusinessType = "";
      this.remoteProject();
    },
    clearCompany() {
      this.FileContractform.ProjectId = "";
      this.ProjectList = [];
      this.FileContractform.BusinessType = "";
      this.remoteCompany();
    },
    //选择项目
    SelectProject(val) {
      console.log(val);
      this.ProjectList.forEach(item => {
        if (val == item.Id) {
          this.FileContractform.BusinessType = item.BusinessType;
        }
      });
    },
    //获取项目下拉列表
    remoteProject(val) {
      let data = {
        Name: val,
        CompanyId: this.FileContractform.CompanyId,
        BusinessType: "-1",
        Priority: "-1",
        Status: "-1",
        PageIndex: 1,
        PageSize: 99,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      const ProjectDetail = localStorage.getItem("projectdetail");
      GetProjectList(qs.stringify(data)).then(response => {
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.ProjectList = response.Data;
            console.log(this.ProjectList);
            if (ProjectDetail && ProjectDetail.Outsource) {
              this.FileContractform.ProjectId =
                ProjectDetail.Outsource.ProjectId;
            }
          } else {
            this.ProjectList = [];
          }
        } else {
          this.ProjectList = [];
          this.FileContractform.ProjectId = "";
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    clearProject() {
      this.FileContractform.ProjectId = "";
      this.FileContractform.BusinessType = "";
    },
    //添加出单详情
    addsingleDetail() {
      this.FileContractform.singleDetailList.push({
        SysUserlist: [],
        departmentList: [],
        OrgId: null,
        OrgName: "",
        MarketType: "",
        SysUserId: "",
        AchiScale: ""
      });
      this.SysUserMethod("", this.FileContractform.singleDetailList.length - 1);
    },
    // 删除联系人
    deletesingleDetail(i, item) {
      this.FileContractform.singleDetailList.splice(i, 1);
    },
    //选择出单部门
    selectOrg($event, index) {
      this.FileContractform.singleDetailList[index].OrgName = $event.OrgName;
    },
    // 上传文件
    uploadfile(e) {
      var uploader;
      this.fileloading = true;
      const files = e.target.files[0];
      console.log(files.name);
      var path = process.env.VUE_APP_BASE_API_UPLOAD;
      var ext = files.name.slice(files.name.lastIndexOf(".") + 1).toLowerCase();
      if (
        ext !== "doc" &&
        ext !== "docx" &&
        ext !== "pdf" &&
        ext !== "xls" &&
        ext !== "xlsx"
      ) {
        this.$message({
          message: "不支持该格式",
          type: "warning"
        });
        this.fileloading = false;
        e.target.value = [];
        return false;
      }
      if (files.size > 50 * 1024 * 1024) {
        this.$message({
          message: "文件大小超过最大限制",
          type: "warning"
        });
        this.fileloading = false;
        return;
      }
      if (
        ext == "doc" ||
        ext == "docx" ||
        ext == "pdf" ||
        ext == "xls" ||
        ext == "xlsx"
      ) {
        // 文件循环上传
        uploader = new SupperUploader(path, files, uuid(), 2 * 1024 * 1024);
		console.log(uploader)
        uploader.UploadFun(() => {
          if (uploader.urlResult) {
            this.fileloading = false;
            const obj = {
              name: ext.toUpperCase(),
              fileName: files.name,
              Url: uploader.urlResult.VideoUrl,
              visible: false
            };
			console.log(obj.fileName)
            this.filterObj = obj;
            e.target.value = [];
            // if (index == undefined) {
            //   this.filterObj.push(obj)
            // } else {
            //   this.filterlist.splice(index, 1, obj)
            // }
          }
        });
      }
    },
    // 删除
    deletefile() {
      this.filterObj = {};
    },
    //检验是否出单占比总和大于100%
    inspection(item, index) {
      let Total = 0;
      for (let i = 0; i < this.FileContractform.singleDetailList.length; i++) {
        Total += parseFloat(
          this.FileContractform.singleDetailList[i].AchiScale
        );
      }
      if (Total > 100) {
        this.$message({
          message: "业绩总占比不能大于100%",
          type: "error"
        });
        this.FileContractform.singleDetailList[index].AchiScale = "";
        return false;
      } else {
        return true;
      }
    },
    Saveform(form) {
      // 调用接口,保存数据
      this.$refs[form].validate(valid => {
        if (valid) {
          let param = {
            ProjectId: this.FileContractform.ProjectId,
            Name: this.FileContractform.Name,
            // Code: this.FileContractform.Code,
            Amount: this.FileContractform.Amount,
            Type: this.FileContractform.Type,
            StartDate: this.FileContractform.StartDate,
            ExpireDate: this.FileContractform.ExpireDate,
            SignDate: this.FileContractform.SignDate,
            SignType: this.FileContractform.SignType,
            ThirdPartyCode: this.FileContractform.ThirdPartyCode,
            IsNewTemplate: this.FileContractform.IsNewTemplate,
            BfCompanyId: this.FileContractform.BfCompanyId,
            Area: this.FileContractform.Area,
            Remark: this.FileContractform.Remark,
            Status: this.FileContractform.Status,
            Attachment: "",
            AchiScales: "",
            menuid: MenuIdDate(),
            operationcode: "1"
          };
          for (
            let i = 0;
            i < this.FileContractform.singleDetailList.length;
            i++
          ) {
            delete this.FileContractform.singleDetailList[i].SysUserlist;
            delete this.FileContractform.singleDetailList[i].departmentList;
          }
          param.AchiScales = this.FileContractform.singleDetailList;
          param.Attachment = this.filterObj.Url;
          if (!this.filterObj.name) {
            this.$message({
              message: "请上传项目合同附件",
              type: "error"
            });
            return;
          }
          showLoading();
          if (this.ContractId) {
            param.Id = this.ContractId;
            EditProjectContract(qs.stringify(param)).then(response => {
              hideLoading();
              if (response.IsSuccess) {
                this.$message({
                  type: "success",
                  message: "修改项目合同成功!"
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
            AddProjectContract(qs.stringify(param)).then(response => {
              hideLoading();
              if (response.IsSuccess) {
                this.$message({
                  type: "success",
                  message: "新增项目合同成功!"
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
          }
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
        display: flex;
        flex-wrap: wrap;
        .img-box-list {
          width: 160px;
          height: 120px;
          position: relative;
          margin-bottom: 40px;
          > input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 10;
            cursor: pointer;
          }
          > .img-box {
            width: 100%;
            height: 100%;
            position: absolute;
            background-color: #f0f4fa;
            border-radius: 8px;
            > .filetype {
              display: inline-block;
              background-color: $erpcolor;
              padding: 10px 12px;
              font-size: $f14;
              line-height: 14px;
              color: #fff;
              border-radius: 8px;
            }
            > .filename {
              font-size: $f14;
              color: $erp666;
              height: 40px;
              width: 110px;
              margin: 12px 24px 0 24px;
              letter-spacing: 0;
              word-break: break-all;
              overflow: hidden;
              display: -webkit-box;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2; /*要显示的行数*/
              -webkit-box-orient: vertical;
            }
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          > .img-box-hover {
            position: absolute;
            width: 100%;
            height: 30px;
            background-color: rgba(0, 0, 0, 1);
            opacity: 0.4;
            bottom: 0;
            display: flex;
            justify-content: center;
            border-radius: 0 0 8px 8px;
            .btn {
              position: relative;
              cursor: pointer;
              > input {
                width: 100%;
                height: 100%;
                opacity: 0;
                position: absolute;
                cursor: pointer;
              }
              .svg-icon {
                font-size: $f14;
                color: #fff;
              }
              > span {
                font-size: $f14;
                color: #fff;
                padding-left: 4px;
              }
            }
            .btn + .btn {
              margin-left: 24px;
            }
          }
        }
        .img-box-list + .img-box-list {
          margin-left: 24px;
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