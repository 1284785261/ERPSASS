<!--申请购买招标文件-->
<template>
  <div class="ApplyPurchaseBiddingFile-Box">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="true" />
    </div>
    <div class="form-content">
      <el-form ref="ruleForm" label-position="top" :model="dataObject" :rules="Formrules" label-width="140px" class="projectform">
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="招标单位" prop="BiddingUnit">
                <el-select v-model="dataObject.BiddingUnit" size="small" :remote-method="GetCompanyPageList" @change="BiddingUnitChange" @click.native="GetCompanyPageList(null, null)" clearable :disabled="iDdisabled" filterable remote placeholder="请选择所属客户" :loading="loading">
                  <el-option v-for="item in BiddingUnitList" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <el-form-item label="项目名称" prop="ProjectName">
                <el-select v-model="dataObject.ProjectName" size="small" clearable :disabled="iDdisabled" @change="ProjectChange(dataObject.ProjectName,ProjectNameList)" filterable remote placeholder="请选择项目名称" :loading="loading">
                  <el-option v-for="item in ProjectNameList" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="授权代表" prop="AuthorizedRepresentative">
                <el-select v-model="dataObject.AuthorizedRepresentative" size="small" :remote-method="GetSysUserList" clearable :disabled="disabled" filterable remote placeholder="请选择授权代表" :loading="loading">
                  <el-option v-for="item in AuthorizedRepresentativeList" :key="item.Id" :label="item.UserName" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <el-form-item label="招标代理机构" prop="BiddingAgency">
                <el-input v-model="dataObject.BiddingAgency" placeholder="请输入招标代理机构" clearable :disabled="disabled" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="购买标书截止日期" prop="BuyBidClosingTime">
                <el-date-picker v-model="dataObject.BuyBidClosingTime" clearable :disabled="disabled" size="small" type="datetime" placeholder="请选择购买标书截止日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <el-form-item label="投标单位" prop="Bidder">
                <el-select v-model="dataObject.Bidder" clearable size="small" :disabled="disabled" filterable remote placeholder="请选择投标单位" :loading="loading">
                  <el-option v-for="item in BidderList" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="招标文件费用" prop="BiddingFileCost">
                <el-input v-model="dataObject.BiddingFileCost" placeholder="请输入招标文件费用" clearable :disabled="disabled" size="small">
                  <svg-icon slot="suffix" icon-class="money" class-name="way" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <el-form-item label="申请人" prop="applicant">
                <el-input v-model="dataObject.applicant" clearable disabled size="small" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="申请部门" prop="ApplicationDepartment">
                <el-select v-model="dataObject.ApplicationDepartment" clearable size="small" :disabled="disabled" filterable remote placeholder="请选择投标单位" :loading="loading">
                  <el-option v-for="item in ApplicationDepartmentList" :key="item.OrgId" :label="item.FullOrgName" :value="item.OrgId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <el-form-item label="标书购买网址">
                <el-input v-model="dataObject.BidPurchaseWebsite" placeholder="请输入标书购买网址" clearable size="small" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="购买标书地址" prop="province" class="path">
                <el-select v-model="dataObject.province" size="small" filterable :disabled="disabled" clearable placeholder="请选择省份">
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in provincelist" :key="index"></el-option>
                </el-select>
                <el-select v-model="city" size="small" filterable :disabled="disabled" clearable placeholder="请选择城市">
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in citylist" :key="index"></el-option>
                </el-select>
                <el-select v-model="AreaId" size="small" filterable :disabled="disabled" clearable placeholder="请选择区县">
                  <el-option :label="item.Name" :value="item.Id" v-for="(item, index) in arealist" :key="index"></el-option>
                </el-select>
                <el-input clearable size="small" :disabled="disabled" v-model="dataObject.Address" class="Address" placeholder="详情地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="购买标书方式" prop="PurchaseBidMethod" class="text">
                <el-input v-model="dataObject.PurchaseBidMethod" resize="none" type="textarea" placeholder="请输入购买标书方式" :rows="2" maxlength="200" show-word-limit clearable :disabled="disabled" size="small" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="购买标书所需材料及要求" class="text">
                <el-input v-model="dataObject.MaterialsRequirements" placeholder="请输入购买标书所需材料及要求" resize="none" type="textarea" :rows="5" maxlength="1000" show-word-limit clearable :disabled="disabled" size="small" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="备注" prop="Remark" class="text">
                <el-input v-model="dataObject.Remark" resize="none" type="textarea" :rows="5" maxlength="1000" show-word-limit clearable :disabled="disabled" size="small" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="附件" prop="Mothod" class="recipientPhone file">
                <div class="tip">
                  上传附件电子档/文件大小不超过20M,上传格式PNG、JPG、Word、PDF、XLS
                </div>
                <div class="upload">
                  <div v-if="fileName" class="files" @mouseenter="fileShow()" @mouseleave="filenoShow()" v-loading="uploadLoading">
                    <span class="filestype">{{ filestype }}</span>
                    <p>{{ fileName }}</p>
                    <div v-show="optionShow" class="option-button">
                      <a>
                        <svg-icon icon-class="replace" class-name="svg-a" />替换
                        <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx" name="file" class="smaellFile replaceFile" @change="uploadFile" />
                      </a>
                      <a @click="delFiles">
                        <svg-icon icon-class="del" class-name="svg-a" />删除
                      </a>
                    </div>
                  </div>
                  <div class="files" v-else v-loading="uploadLoading">
                    <img src="../../../assets/upload.png" />
                    <input type="file" accept=".png,.jpg,.jpeg,.doc,.docx,.pdf,.xls,.xlsx" name="file" class="smaellFile" @change="uploadFile" />
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div class="footer-button">
        <el-button class="erpbtn" size="small" @click.native="cancel">关闭</el-button>
        <el-button class="erpbtn" size="small" @click.native="SaveDraft('ruleForm')">存为草稿</el-button>
        <el-button class="erpbtn" size="small" @click.native="SubmitApproval('ruleForm')">提交送审</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { uuid } from "@/utils/CustomValidation.js";
import BreadCrumb from "@/components/publicComponents/breadCrumb.vue";
import { GetAreaList } from "@/api/Public.js";
import {
  MenuIdDate,
  showLoading,
  hideLoading
} from "@/utils/CustomValidation.js";
import { GetCompanyPageList } from "@/api/CustomerManagement.js";
import { GetProjectList } from "@/api/projectManagement.js";
import { GetSysUserList, GetOrgByUserId } from "@/api/SystemSetting.js";
import { GetBfCompanyPageList } from "@/api/BusinessSet.js";
import {
  AddBiddingDocuments,
  GetBiddingDocumentInfo,
  EditBiddingDocuments
} from "@/api/Bidding.js";
import SupperUploader from "@/utils/SupperUploader";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      dataObject: {
        ApplicationDepartment: "",
        BidPurchaseWebsite: "",
        BiddingUnit: "",
        ProjectName: "",
        AuthorizedRepresentative: "",
        BiddingAgency: "",
        BuyBidClosingTime: "",
        Bidder: "",
        BiddingFileCost: "",
        PurchaseBidMethod: "",
        province: "",
        city: "",
        AreaId: "",
        Address: "",
        MaterialsRequirements: "",
        enclosure: "",
        applicant: "",
        Remark: ""
      },
      ApplicationDepartmentList: [],
      filterlist: [],
      filestype: "",
      uploadLoading: false,
      optionShow: false,
      fileName: "",
      MergerName: "",
      Status: 0,
      CurrentPage: 1,
      PageSize: 99,
      loading: false,
      BidderList: [],
      BiddingUnitList: [],
      ProjectNameList: [],
      AuthorizedRepresentativeList: [],
      BiddingAgencyList: [],
      CompanyList: [],
      ApplyList: [],
      Formrules: {
        BiddingUnit: [
          { required: true, message: "请选择所属客户", trigger: "change" }
        ],
        ProjectName: [
          { required: true, message: "请选择项目名称", trigger: "change" }
        ],
        AuthorizedRepresentative: [
          { required: true, message: "请选择授权代表", trigger: "change" }
        ],
        BiddingAgency: [
          { required: true, message: "请输入招标代理机构", trigger: "blur" }
        ],
        BuyBidClosingTime: [
          {
            required: true,
            message: "请选择购买标书截止日期",
            trigger: "change"
          }
        ],
        Bidder: [
          { required: true, message: "请选择投标单位", trigger: "change" }
        ],
        BiddingFileCost: [
          { required: true, message: "请输入招标文件费用", trigger: "blur" }
        ],
        ApplicationDepartment: [
          {
            required: true,
            message: "请选择申请部门",
            trigger: "change"
          }
        ],
        PurchaseBidMethod: [
          { required: true, message: "请输入购买标书方式", trigger: "blur" }
        ],
        province: [
          { required: true, message: "请选择购买标书地址", trigger: "change" }
        ],
        applicant: [{ required: true, message: "", trigger: "blur" }]
      },
      urlList: [],
      city: "",
      AreaId: "",
      provincelist: [], //省
      citylist: [], //市
      arealist: [], //区
      showApply: false,
      disabled: false,
      fileloading: false,
      fileter: {},
      enclosure: "",
      titles: "上传附件",
      Owner: 0,
      BiddingInformation: {
        name: ""
      },
      iDdisabled: false
    };
  },
  components: {
    BreadCrumb
  },
  created() {
    this.getAreaList();
    // this.GetSysUserList();
    this.GetBfCompanyPageList();
    this.GetOrgByUserId();
    if (this.$route.query.Id) {
      // 获取面包屑
      let breadpath =
        JSON.parse(window.localStorage.getItem("breadpath")) || {};
      if (breadpath.router) {
        this.urlList = [
          {
            name: breadpath.name,
            router: breadpath.router
          },
          {
            name: "申请购买招标文件",
            router: ""
          }
        ];
      }
      let ProjectData = JSON.parse(localStorage.getItem("FeedbackProjectData"));
      let Current = JSON.parse(localStorage.getItem("Current"));
      this.dataObject.applicant = Current.currentUser;
      this.BiddingUnitList = [
        {
          Id: ProjectData.CompanyId,
          Name: ProjectData.CompanyName
        }
      ];
      this.ProjectNameList = [
        {
          Id: ProjectData.Id,
          Name: ProjectData.Name
        }
      ];
      this.dataObject.BiddingUnit = ProjectData.CompanyId;
      this.dataObject.ProjectName = ProjectData.Id;
      this.BiddingInformation.name = "申请购买招标文件";
      this.iDdisabled = true;
    } else {
      if (JSON.parse(localStorage.getItem("BiddingFile"))) {
        this.BiddingInformation = JSON.parse(
          localStorage.getItem("BiddingFile")
        );
        this.dataObject.applicant = this.BiddingInformation.UserName;
      }
      this.GetCompanyPageList(null, null);
      if (this.BiddingInformation.name == "申请购买招标文件") {
        this.urlList = [
          {
            name: "招标文件购买管理",
            router: "/BiddingManagement/BiddingFileBuy"
          },
          {
            name: "申请购买招标文件",
            router: ""
          }
        ];
      } else if (this.BiddingInformation.name == "修改购买招标文件") {
        this.urlList = [
          {
            name: "招标文件购买管理",
            router: "/BiddingManagement/BiddingFileBuy"
          },
          {
            name: "修改购买招标文件",
            router: ""
          }
        ];
        this.$nextTick(() => {
          this.GetBiddingDocumentInfo();
        });
      }
    }
  },
  watch: {
    "dataObject.BiddingUnit"() {
      this.GetProjectList();
    },
    "dataObject.province"(newvalue, oldvalue) {
      if (newvalue) {
        let obj = {
          AreaId: "",
          ParentId: newvalue,
          menuid: MenuIdDate(),
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            let str = "";
            this.citylist = response.Data;
            if (this.MergerName != "") {
              this.citylist.forEach(data => {
                if (data.Name == this.MergerName.split(",")[2]) {
                  str = data.Id;
                }
              });
              this.city = str;
            }
            let isclear = this.citylist.find(v => {
              return v.Id == this.city;
            });
            if (isclear) {
            } else {
              this.city = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
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
          operationcode: "1"
        };
        GetAreaList(qs.stringify(obj)).then(response => {
          if (response.IsSuccess) {
            this.arealist = response.Data;
            let str = "";
            if (this.MergerName != "") {
              this.arealist.forEach(data => {
                if (data.Name == this.MergerName.split(",")[3]) {
                  str = data.Id;
                }
              });
              this.AreaId = str;
            }
            let isclear = this.arealist.find(v => {
              return v.Id == this.AreaId;
            });
            if (isclear) {
            } else {
              this.AreaId = "";
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else {
        this.arealist = [];
        this.AreaId = "";
      }
    },
    MergerName() {
      this.getAreaList();
    }
  },
  methods: {
    //招标单位更改
    BiddingUnitChange(){
       this.dataObject.ProjectName=''
       this.ProjectNameList=[]
       this.dataObject.AuthorizedRepresentative=''
       this.AuthorizedRepresentativeList=[]
    },
    //切换项目
    ProjectChange(e,data){
      data.forEach(Val=>{
        if(e==Val.Id){
          this.AuthorizedRepresentativeList=[{
            Id: Val.Owner,
            UserName: Val.OwnerName
          }]
            this.dataObject.AuthorizedRepresentative=Val.Owner
        }
      })
      this.GetSysUserList()
    },
    //获取用户组织列表
    GetOrgByUserId() {
      let obj = {
        SysUserId: JSON.parse(localStorage.getItem("Current")).currentId,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetOrgByUserId(obj).then(res => {
        if (res.MessageCode == 0 && res.Data.length > 0) {
          this.ApplicationDepartmentList = res.Data;
        } else {
          this.ApplicationDepartmentList = [];
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
      this.enclosure = "";
      this.fileName = "";
    },
    //关闭页面
    cancel() {
      this.$router.go(-1);
    },
    //查看详情
    GetBiddingDocumentInfo() {
      let obj = {
        Id: this.BiddingInformation.Id,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetBiddingDocumentInfo(obj).then(res => {
        if (res.MessageCode == 0 && res.Data != null) {
          console.log(res.Data);
          this.BiddingUnitList = [
            {
              Id: res.Data.CompanyId,
              Name: res.Data.CompanyName
            }
          ];
          this.AuthorizedRepresentativeList = [
            {
              Id: res.Data.Owner,
              UserName: res.Data.OwnerName
            }
          ];
          this.dataObject.BiddingUnit = res.Data.CompanyId;
          this.dataObject.ProjectName = res.Data.ProjectId;
          this.dataObject.AuthorizedRepresentative = res.Data.Owner;
          this.dataObject.BiddingAgency = res.Data.BiddingAgency;
          this.dataObject.BuyBidClosingTime =
            res.Data.DeadlineForPurchasingBids;
          this.dataObject.Bidder = res.Data.BfCompanyId;
          this.dataObject.Address = res.Data.PurchaseBidingAddr;
          this.dataObject.BiddingFileCost = res.Data.Account;
          this.dataObject.PurchaseBidMethod = res.Data.PurchaseBidingMode;
          this.dataObject.MaterialsRequirements =
            res.Data.MaterialAndRequirement;
          this.dataObject.BidPurchaseWebsite = res.Data.BiddingDocumentwebSite;
          this.dataObject.Remark = res.Data.Remark;
          this.enclosure = res.Data.AttachUrl;
          this.dataObject.ApplicationDepartment = res.Data.SysOrgId;
          if (this.enclosure) {
            this.fileName = this.enclosure.slice(
              this.enclosure.lastIndexOf("/") + 1,
              this.enclosure.lastIndexOf(".")
            );
            this.filestype = this.enclosure
              .slice(this.enclosure.lastIndexOf(".") + 1)
              .toUpperCase();
          }
          this.Status = res.Data.Status;
          this.MergerName = res.Data.MergerName;
          this.titles = res.Data.AttachUrl.split("/")[
            res.Data.AttachUrl.split("/").length - 1
          ];
        }
      });
    },
    //提交送审
    SubmitApproval(e) {
      this.$refs[e].validate(valid => {
        if (valid) {
          console.log(valid);
          this.Status = 1;
          let obj = {
            CompanyId: this.dataObject.BiddingUnit,
            ProjectId: this.dataObject.ProjectName,
            AuthorizedSysUserId: this.dataObject.AuthorizedRepresentative,
            BiddingAgency: this.dataObject.BiddingAgency,
            DeadlineForPurchasingBids: this.dataObject.BuyBidClosingTime,
            BfCompanyId: this.dataObject.Bidder,
            PurchaseBidingAreaId: this.AreaId,
            PurchaseBidingAddr: this.dataObject.Address,
            Account: this.dataObject.BiddingFileCost,
            PurchaseBidingMode: this.dataObject.PurchaseBidMethod,
            MaterialAndRequirement: this.dataObject.MaterialsRequirements,
            BiddingDocumentwebSite: this.dataObject.BidPurchaseWebsite,
            Remark: this.dataObject.Remark,
            AttachUrl: this.enclosure,
            Status: this.Status,
            SysOrgId: this.dataObject.ApplicationDepartment,
            menuid: MenuIdDate(),
            operationcode: "1"
          };
          if (this.BiddingInformation.name == "申请购买招标文件") {
            AddBiddingDocuments(obj).then(res => {
              if (res.MessageCode == 0) {
                this.$message({
                  type: "success",
                  message: "已提交审批"
                });
                this.cancel();
              } else {
                this.$message({
                  type: "error",
                  message: res.MessageContent
                });
              }
            });
          } else if (this.BiddingInformation.name == "修改购买招标文件") {
            obj.Id = this.BiddingInformation.Id;
            EditBiddingDocuments(obj).then(res => {
              if (res.MessageCode == 0) {
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
                this.cancel();
              } else {
                this.$message({
                  type: "error",
                  message: res.MessageContent
                });
              }
            });
          }
        }
      });
    },
    //存为草稿
    SaveDraft(e) {
      this.$refs[e].validate(valid => {
        if (valid) {
          this.Status = 0;
          let obj = {
            CompanyId: this.dataObject.BiddingUnit,
            ProjectId: this.dataObject.ProjectName,
            AuthorizedSysUserId: this.dataObject.AuthorizedRepresentative,
            BiddingAgency: this.dataObject.BiddingAgency,
            DeadlineForPurchasingBids: this.dataObject.BuyBidClosingTime,
            BfCompanyId: this.dataObject.Bidder,
            PurchaseBidingAreaId: this.AreaId,
            PurchaseBidingAddr: this.dataObject.Address,
            Account: this.dataObject.BiddingFileCost,
            PurchaseBidingMode: this.dataObject.PurchaseBidMethod,
            MaterialAndRequirement: this.dataObject.MaterialsRequirements,
            Remark: this.dataObject.Remark,
            BiddingDocumentwebSite: this.dataObject.BidPurchaseWebsite,
            AttachUrl: this.enclosure,
            Status: this.Status,
            SysOrgId: this.dataObject.ApplicationDepartment,
            menuid: MenuIdDate(),
            operationcode: "1"
          };
          if (this.BiddingInformation.name == "申请购买招标文件") {
            AddBiddingDocuments(obj).then(res => {
              if (res.MessageCode == 0) {
                this.$message({
                  type: "success",
                  message: "已存为草稿"
                });
                this.cancel();
              } else {
                this.$message({
                  type: "error",
                  message: res.MessageContent
                });
              }
            });
          } else if (this.BiddingInformation.name == "修改购买招标文件") {
            obj.Id = this.BiddingInformation.Id;
            EditBiddingDocuments(obj).then(res => {
              if (res.MessageCode == 0) {
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
                this.cancel();
              } else {
                this.$message({
                  type: "error",
                  message: res.MessageContent
                });
              }
            });
          }
        } else {
          this.$message({
            type: "error",
            message: "请完成信息后提交"
          });
        }
      });
    },
    //投标单位
    GetBfCompanyPageList() {
      let obj = {
        Name: "",
        Level: -1,
        Status: 1,
        PageIndex: this.CurrentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetBfCompanyPageList(obj).then(res => {
        if (res.Data.length > 0 && res.MessageCode == 0) {
          this.BidderList = res.Data;
          console.log(this.BidderList);
        }
      });
    },
    //获取招标单位列表
    GetCompanyPageList(query, str) {
      let obj = {
        IdArr: str,
        Name: query,
        PageIndex: 1,
        PageSize: 99,
        Type: -1,
        Status: 1,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      GetCompanyPageList(obj).then(res => {
        if (res.Data.length > 0 && res.MessageCode == 0) {
          this.BiddingUnitList = res.Data;
        } else {
          this.BiddingUnitList = [];
        }
      });
    },
    //获取项目列表
    GetProjectList() {
      let obj = {
        IdArr: "",
        Name: "",
        SysUserName: "",
        Status: -1,
        BusinessType: -1,
        Priority: -1,
        CompanyId: this.dataObject.BiddingUnit,
        PageIndex: this.CurrentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetProjectList(obj).then(res => {
        if (res.MessageCode == 0 && res.Data.length > 0) {
          this.ProjectNameList = res.Data;
        }
      });
    },
    //授权代表(用户列表)
    GetSysUserList(query) {
      let obj = {
        //  UserId:str,
        UserName: query,
        Status: -1,
        PageIndex: this.CurrentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      this.loading=true
      GetSysUserList(obj).then(res => {
        this.loading=false
        if (res.Data.length > 0 && res.MessageCode == 0) {
          this.AuthorizedRepresentativeList = res.Data;
          // this.dataObject.AuthorizedRepresentative=this.Owner
        }
      });
    },
    closedialog() {},
    save() {},
    // 获取一级地区
    getAreaList() {
      let obj = {
        ParentId: 0,
        menuid: MenuIdDate(),
        operationcode: "1"
      };
      GetAreaList(qs.stringify(obj)).then(response => {
        if (response.IsSuccess) {
          let str = "";
          this.provincelist = response.Data;
          if (this.MergerName != "") {
            this.provincelist.forEach(data => {
              if (data.Name == this.MergerName.split(",")[1]) {
                str = data.Id;
              }
            });
            this.dataObject.province = str;
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    // 上传文件
    uploadFile(e) {
      var uploader;
      const files = e.target.files[0];
      var ext = files.name.slice(files.name.lastIndexOf(".") + 1).toLowerCase();
      if (
        ext == "png" ||
        ext == "jpg" ||
        ext == "jpeg" ||
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
              this.enclosure = uploader.urlResult.VideoUrl;
              console.log(this.enclosure);
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
              this.enclosure = res.data.ImageUrl;
              console.log(this.enclosure);
              this.fileName = files.name;
              this.filestype = ext.toUpperCase();
              e.target.value = [];
            }
          });
        }
      }
    }
  }
};
</script>
<style lang="scss">
.ApplyPurchaseBiddingFile-Box {
  .footer-button {
    text-align: center;
    background: #ffffff;
    padding: 30px;
    margin-left: 24px;
  }
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .projectform {
    background-color: #fff;
    border-radius: 8px 0px 0px 8px;
    margin-left: 24px;
    padding: 40px 40px 20px 40px;
    .form-title {
      font-size: $f16;
      color: $erp333;
      line-height: 16px;
      position: relative;
      padding-left: 12px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      > span {
        flex: 1;
      }
      > .operate {
        font-size: $f14;
        color: $erpplaceholder;
        width: 11%;
        text-align: right;
        .svg-icon {
          margin-right: 8px;
          font-size: $f16;
          &.add {
            color: #fff;
          }
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
        // width: calc(100% - 64px);
        width: 460px;
        .el-input__inner {
          background-color: $erinputbgc;
          width: 460px;
        }
        .el-select {
          width: 460px;
        }
        .el-select .el-input .el-select__caret {
          line-height: 42px;
        }
        .el-date-editor {
          width: 100%;
          span {
            width: 8%;
          }
          .el-range-input {
            background-color: #f0f4fa;
          }
        }
      }
      // 地址样式
      &.path {
        .el-form-item__content {
          width: 100% !important;
          .el-select {
            width: 240px !important;
            margin-right: 24px;
            margin-bottom: 24px;
          }
          .el-input {
            max-width: 460px !important;
            .el-input__inner {
              width: 240px !important;
            }
            &.Address {
              //   width: 460px !important;
              //   margin-right: 24px;
              //   margin-bottom: 24px;
              .el-input__inner {
                width: 460px !important;
              }
            }
          }
        }
      }
      // 文本框样式
      &.text {
        .el-form-item__content {
          width: 960px !important;
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
            width: 100%;
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
      &.double {
        .el-form-item__content {
          height: 40px;
          display: flex;
          align-items: center;
          .el-radio-group {
            flex: 1;
          }
          .el-input {
            flex: 1;
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
    // 循环的样式
    .form-cont {
      .TableTitle {
        font-size: 14px;
        color: #606266;
        font-weight: 700;
      }
      .babel {
        padding: 20px 20px 40px 0px;
        &:last-child {
          margin-bottom: 0;
        }
        .title-name {
          font-size: $f16;
          color: $erp333;
          position: relative;
          padding-left: 12px;
          line-height: 16px;
          font-weight: 700;
          margin-bottom: 24px;
          &::after {
            content: "";
            width: 4px;
            height: 16px;
            background-color: $erpcolor;
            position: absolute;
            left: 0;
          }
        }
        .babel-container {
          // padding-bottom: 16px;
          // border-bottom: 1px solid $erpBK;
          .img-box-list {
            margin-right: 20px;
            overflow: hidden;
            position: relative;
            margin-bottom: 20px;
            width: 300px;
            height: 180px;
            background: #f0f4fa;
            border-radius: 8px;
            text-align: center;
            .ext {
              width: 80px;
              height: 30px;
              line-height: 30px;
              border-radius: 5px;
              color: #fff;
              text-align: center;
              background-color: $erpcolor;
              margin-bottom: 25px;
            }
            .Urlname {
              margin-top: 20px;
              font-size: 14px;
              text-align: center;
            }
            .Footer-Box {
              width: 100%;
              height: 30px;
              position: absolute;
              bottom: 0;
              left: 0;
              background: #909198;
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
              display: flex;
              flex: 1;
              cursor: pointer;

              div {
                width: 50%;
                display: inline-block;
                line-height: 30px;
                text-align: center;
                height: 30px;
                font-size: 14px;
                color: #fff;
                vertical-align: top;
                i {
                  margin-right: 10px;
                  font-size: 14px;
                }
                &:hover {
                  color: #1588f8;
                }
              }
            }
          }

          .content {
            display: flex;
            font-size: $f14;
            line-height: 14px;
            margin-bottom: 24px;
            .content-label {
              margin-right: 12px;
              width: 150px;
              text-align: right;
              font-weight: 700;
            }
            .content-detail {
              flex: 1;
              color: $erp999;
            }
          }
          .follow-row {
            padding-bottom: 16px;
            border-bottom: 1px solid $erpBK;
            margin-bottom: 40px;
            &:last-child {
              padding-bottom: 0;
              border-bottom: none;
              margin-bottom: 0;
            }
          }
        }
      }
      .file {
        .img-box-list {
          float: left;
          > input {
            width: 160px;
            height: 120px;
            position: absolute;
            left: 0px;
            top: 10px;
            opacity: 0;
            z-index: 10;
            cursor: pointer;
          }
          > .img-box {
            position: absolute;
            top: 10px;
            i {
              position: absolute;
              left: 133px;
              top: 56px;
              font-size: 36px;
              color: #999999;
            }
            p {
              margin-top: 80px;
              text-align: center;
              font-size: 14px;
              color: #999999;
            }
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
              margin: 0px 24px 0 24px;
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
            background: #909198;
            // opacity: 0.4;
            bottom: 0;
            display: flex;
            justify-content: center;
            border-radius: 0 0 8px 8px;
            .btn {
              position: relative;
              cursor: pointer;
              line-height: 30px;
              width: 50%;
              text-align: center;
              color: #fff;
              > input {
                width: 100%;
                height: 100%;
                opacity: 0;
                position: absolute;
                cursor: pointer;
                &::-webkit-file-upload-button {
                  height: 0;
                }
              }
              .svg-icon {
                font-size: $f14;
                margin-right: 10px;
              }
              > span {
                font-size: $f14;
                color: #fff;
              }
              &:hover span {
                color: #1588f8;
              }
              &:hover .svg-icon {
                color: #1588f8;
              }
            }
          }
        }
      }
      padding-bottom: 16px;
      margin-bottom: 40px;
      border-bottom: 1px solid $erpBK;
      &:last-child {
        // border-bottom: none;
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
      }
    }
    // 附件上传样式
    .form-cont {
      .tip {
        font-size: $f14;
        color: $erp999;
        margin-bottom: 16px;
        margin-top: 25px;
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
          margin-right: 24px;
          margin-bottom: 24px;
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
              .replaceFile {
                width: 80px;
                height: 30px;
              }
            }
          }
        }
        .prompt {
          float: left;
          width: 300px;
          font-size: 14px;
          color: #999999;
          margin-top: 20px;
          margin-left: 17px;
        }
      }
    }
    .tip {
      font-size: $f14;
      color: $erp999;
      margin-bottom: 16px;
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
.textInput {
  .el-form-item__content {
    height: 100% !important;
  }
}
</style>