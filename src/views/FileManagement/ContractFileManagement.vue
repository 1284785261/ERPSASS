<!--合同档案管理-->
<template>
  <div class="ContractFileManagement-Box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="档案类型" label-width="80px">
            <el-select
              v-model.trim="FileType"
              clearable
              placeholder="请选择项目业务类型"
              size="mini"
              class="selectWidth select-input"
            >
              <el-option
                v-for="(item, index) in FileTypeList"
                :key="index"
                :value="item.value"
                :label="item.describe"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="业务类型"
            label-width="80px"
            v-if="FileType === 0"
          >
            <el-select
              v-model.trim="BusinessType"
              clearable
              placeholder="请选择项目业务类型"
              size="mini"
              class="selectWidth select-input"
            >
              <el-option
                v-for="(item, index) in BusinessTypeList"
                :key="index"
                :value="item.value"
                :label="item.describe"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="合同类型"
            label-width="80px"
            v-if="FileType === 1"
          >
            <el-select
              v-model.trim="ContractType"
              clearable
              placeholder="请选择项目合同类型"
              size="mini"
              class="selectWidth select-input"
            >
              <el-option
                v-for="(item, index) in ContractTypeList"
                :key="index"
                :value="item.value"
                :label="item.describe"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="合同名称" label-width="80px">
            <el-input
              v-model.trim="ContractName"
              clearable
              class="selectWidth select-input"
              suffix-icon="el-icon-search"
              placeholder="请输入合同名称"
            />
          </el-form-item>
          <el-form-item label="签订时间" label-width="80px">
            <el-select
              class="SigningTime select-input"
              size="small"
              v-model="SigningTimeYear"
              @click.native="GetYear"
              clearable
              v-el-select-loadmore="selectLoadmore"
            >
              <el-option
                v-for="(item, index) in SigningTimeYearList"
                :key="index"
                :label="item.describe"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="SpanText">年</span>
            <el-select
              class="SigningTime select-input"
              size="small"
              v-model="SigningTimeMonth"
              @click.native="GetMonth"
              clearable
            >
              <el-option
                v-for="(item, index) in SigningTimeMonthList"
                :key="index"
                :label="item.describe"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="SpanText">月</span>
            <el-select
              class="SigningTime select-input"
              size="small"
              v-model="SigningTimeDay"
              @click.native="GetDay"
              clearable
            >
              <el-option
                v-for="(item, index) in SigningTimeDayList"
                :key="index"
                :label="item.describe"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="SpanText">日</span>
          </el-form-item>
          <el-form-item label="创建人" label-width="80px">
            <el-input
              v-model.trim="Creator"
              clearable
              class="selectWidth select-input"
              suffix-icon="el-icon-search"
              placeholder="请输入创建人名称"
            />
          </el-form-item>
        </el-form>
        <el-button class="search-button" size="mini" round @click="Reset"
          >重置</el-button
        >
        <el-button class="search-button" size="mini" round @click="searchtable"
          >查询</el-button
        >
      </div>
    </div>
    <div class="operate-top">
      <!-- <el-button size="small" class="addmenu erpbtn" @click.native="uploadFile">上传文件</el-button> -->
      <el-button size="small" class="addmenu erpbtn" @click.native="exportFile"
        >导出文件</el-button
      >
      <!-- <el-button size="small"  class="addmenu erpbtn">生成台账</el-button> -->
      <div class="screening-compent">
        <!-- 筛选列组件 -->
        <ScreeningComponent
          :formTheadOptions="formTheadOptions"
          :checkboxVal="checkboxVal"
          @SelectCheck="SelectCheck"
        ></ScreeningComponent>
      </div>
    </div>
    <div class="tab clearfix">
      <div
        class="tab-name"
        v-for="(item, index) in StorageStatus"
        :key="index"
        :class="{ active: tabidx == item.value }"
        @click="chooseschedule(item.value)"
      >
        {{ item.describe }}
      </div>
    </div>
    <!-- 列表 -->
    <div class="operate-table">
      <el-table
        ref="multipleTable"
        class="erp-table"
        v-loading="tableloading"
        :data="tableList"
        max-height="600"
        tooltip-effect="dark"
        @select="handleSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          width="55"
          fixed="left"
          label="全选"
        />
        <el-table-column
          align="center"
          v-if="$getColumsFlag('ContractCode', checkboxVal)"
          prop="ContractCode"
          label="合同编号"
          fixed
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <a class="watchcode" @click="LookDetails(scope.row)">{{
              scope.row.ContractCode
            }}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          v-if="$getColumsFlag('ContractName', checkboxVal)"
          prop="ContractName"
          min-width="120"
          label="合同名称"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          v-if="$getColumsFlag('ContractTypeText', checkboxVal)"
          prop="ContractTypeText"
          label="档案类型"
          min-width="120"
          show-overflow-tooltip
        />
        <!-- <el-table-column align="center" prop="BfCompanyName" label="所属公司" min-width="120" show-overflow-tooltip/> -->
        <!-- <el-table-column align="center" prop="DocumentTypeText" label="档案类型" min-width="100" show-overflow-tooltip /> -->
        <el-table-column
          align="center"
          v-if="$getColumsFlag('BusinessTypeText', checkboxVal)"
          prop="BusinessTypeText"
          label="业务类型/合同类型"
          min-width="160"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          v-if="$getColumsFlag('ArchiveType', checkboxVal)"
          prop="ArchiveType"
          label="存档模式"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.ArchiveType == 0 ? "纸质存档" : "电子存档 "
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          v-if="$getColumsFlag('SysUserName', checkboxVal)"
          prop="SysUserName"
          label="创建人"
          min-width="120"
        >
          <template slot-scope="scope">
            <a class="watchcode">{{ scope.row.SysUserName }}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          v-if="$getColumsFlag('AddTime', checkboxVal)"
          prop="AddTime"
          label="上传时间"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.AddTime.split("T")
                .toString()
                .replace(/-/g, "/")
                .replace(/,/g, "    ")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          v-if="$getColumsFlag('ArchiveTime', checkboxVal)"
          prop="ArchiveTime"
          label="存档时间"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.AddTime.split("T")
                .toString()
                .replace(/-/g, "/")
                .replace(/,/g, "    ")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          v-if="$getColumsFlag('ArchiveStatus', checkboxVal)"
          prop="ArchiveStatus"
          label="存档状态"
          min-width="120"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.ArchiveStatus == 0 ? "待存档" : "已存档"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          v-if="$getColumsFlag('ArchivesCabinetCode', checkboxVal)"
          prop="ArchivesCabinetCode"
          label="档案柜号"
          min-width="120"
        />
        <el-table-column
          align="center"
          v-if="$getColumsFlag('AttachUrl', checkboxVal)"
          prop="AttachUrl"
          label="档案附件"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <a
              v-if="scope.row.AttachUrl != 'URLADDRESS'"
              class="watchcode"
              @click="ShowAttachUrl(scope.row.AttachUrl)"
              >{{ scope.row.AttachUrl }}</a
            >
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" prop="Name" label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <svg-icon icon-class="setting" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <el-dropdown-item @click.native="Upload(scope.row)"
                    >下载</el-dropdown-item
                  >
                  <!-- <el-dropdown-item v-if="scope.row.ArchiveStatus==0" @click.native="Modify(scope.row)">修改</el-dropdown-item> -->
                  <el-dropdown-item @click.native="OperationLog(scope.row)"
                    >操作日志
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="scope.row.ArchiveStatus == 0"
                    @click.native="ConfirmReceipt(scope.row)"
                    >确认签收</el-dropdown-item
                  >
                  <el-dropdown-item
                    v-if="scope.row.ArchiveStatus == 0 && scope.row.ArchiveType == 0"
                    @click.native="AddReminder(scope.row)"
                    >催办</el-dropdown-item
                  >
                  <el-dropdown-item
                    v-if="$operatebtn(operates, 'Delete')"
                    @click.native="Delete(scope.row, 'Delete')"
                    >删除</el-dropdown-item
                  >
                </ul>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="operate-bottom">
        <el-checkbox
          class="allcheck erpcheck"
          v-model="allchecked"
          @change="selectall(allchecked)"
          >全选</el-checkbox
        >
        <el-button
          size="small"
          class="addmenu erpbtn delete"
          @click="UploadAll()"
          >下载</el-button
        >
      </div>
      <div class="pagina-fonter">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <DocumentOperationLogDetails
      @sendOperationType="sendOperationType"
      @sendSize="sendSize"
      @sendIdx="sendIdx"
      :OperationLogList="OperationLogList"
      :showOperationLogDetails="showOperationLogDetails"
      :Total="Total"
      @Modifier="Modifier"
      @closeDialog="closeDialog"
    ></DocumentOperationLogDetails>
    <ConfirmReceipt
      @hideConfirmReceipt="hideConfirmReceipt"
      @RefreshPage="RefreshPage"
      :showConfirmReceipt="showConfirmReceipt"
      :contractId="contractId"
    ></ConfirmReceipt>
    <PreviewFile
      :isImg="isImg"
      :titlename="titlename"
      :iframeShow="iframeShow"
      :previewFileUrl="previewFileUrl"
      @closeFileShow="closeFileShow"
    ></PreviewFile>
  </div>
</template>
<script>
import PreviewFile from "@/components/publicComponents/PreviewFile.vue";
import ScreeningComponent from "@/components/publicComponents/ScreeningComponent";
import ConfirmReceipt from "./components/ConfirmReceipt.vue";
import DocumentOperationLogDetails from "./components/DocumentOperationLogDetails.vue";
import { AddReminds } from "@/api/Remind.js";
import { uuid } from "@/utils/CustomValidation.js";
import SupperUploader from "@/utils/SupperUploader";
import { GetBfCompanyPageList } from "@/api/BusinessSet.js";
import {
  GetContractArchivesPageList,
  GetArchivesEnumContractType,
  GetArchivesEnumStafffContractBusinessType,
  GetArchivesEnumProjectContractBusinessType,
  DownloadContractArchives,
  DeleteContractArchives,
  GetArchivesOperationLogPageList,
  ExportContractArchivesProjectAdnStafffStandingBook,
} from "@/api/FileManagement.js";
import {
  copy,
  MenuIdDate,
  showLoading,
  hideLoading,
} from "@/utils/CustomValidation";
import axios from "axios";
import qs from "qs";
export default {
  directives: {
    "el-select-loadmore": {
      bind(el, binding) {
        const SELECTWRAP_DOM = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        SELECTWRAP_DOM.addEventListener("scroll", function () {
          const condition =
            this.scrollHeight - (this.scrollTop + 10) <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      },
    },
  },
  components: {
    DocumentOperationLogDetails,
    ConfirmReceipt,
    PreviewFile,
    ScreeningComponent,
  },
  data() {
    return {
      StatusIdx: 0,
      isImg: 1,
      previewFileUrl: "",
      titlename: "合同模板预览",
      iframeShow: false,
      SigningTimeYearList: [],
      SigningTimeMonthList: [],
      SigningTimeDayList: [],
      ContractName: "",
      ContractType: "",
      ContractTypeList: [],
      BusinessType: "",
      BusinessTypeList: [],
      dialogTitle: "上传文件信息",
      showConfirmReceipt: false,
      Total: 0,
      OperationLogList: [],
      showOperationLogDetails: false,
      AffiliatedCompanyLists: [],
      FileTypeList: [],
      OperationType: -1,
      ArchiveModeList: [
        {
          value: 0,
          describe: "纸质存档",
        },
        {
          value: 1,
          describe: "电子存档",
        },
      ],
      ArchiveStatusList: [
        {
          value: 0,
          describe: "否",
        },
        {
          value: 1,
          describe: "是",
        },
      ],
      dataObject: {
        AffiliatedCompany: "",
        FileType: "",
        FileTime: "",
        ArchiveMode: "",
        ArchiveStatus: "",
        FilingCabinetNo: "",
        SelectFile: "",
      },
      checkboxVal: [],
      formTheadOptions: [
        { label: "合同编号", prop: "ContractCode" },
        { label: "合同名称", prop: "ContractName" },
        { label: "档案类型", prop: "ContractTypeText" },
        { label: "业务类型/合同类型", prop: "BusinessTypeText" },
        { label: "存档模式", prop: "ArchiveType" },
        { label: "创建人", prop: "SysUserName" },
        { label: "上传时间", prop: "AddTime" },
        { label: "存档时间", prop: "ArchiveTime" },
        { label: "存档状态", prop: "ArchiveStatus" },
        { label: "档案柜号", prop: "ArchivesCabinetCode" },
        { label: "档案附件", prop: "AttachUrl" },
      ],
      rules: {
        AffiliatedCompany: [
          { required: true, message: "请选择所属公司", trigger: "blur" },
        ],
        FileType: [
          { required: true, message: "请选择文件类型", trigger: "blur" },
        ],
        FileTime: [
          { required: true, message: "请输入文件名称", trigger: "blur" },
        ],
        ArchiveMode: [
          { required: true, message: "请选择存档模式", trigger: "blur" },
        ],
        ArchiveStatus: [
          { required: true, message: "请选择存档状态", trigger: "change" },
        ],
        FilingCabinetNo: [
          { required: true, message: "请输入档案柜号", trigger: "blur" },
        ],
        SelectFile: [
          { required: true, message: "请选择上传文件", trigger: "change" },
        ],
      },
      ModifyId: 0,
      contractId: 0,
      SysUserName: "",
      Ids: [],
      DocumentCode: "",
      fileloading: false,
      operateform: [],
      dialogVisible: false,
      tabidx: -1,
      ArchivesCabinetId: 0,
      AffiliatedCompany: "",
      FileType: "",
      FileTime: "",
      SigningTime: "",
      SigningTimeYear: "",
      SigningTimeMonth: "",
      SigningTimeDay: "",
      Creator: "",
      YearData: "",
      MonthData: "",
      DayData: "",
      FileList: [],
      allchecked: false,
      AffiliatedCompanyList: [],
      AffiliatedCompanyText: "",
      YearDataList: [],
      MonthDataList: [],
      DayDataList: [],
      StorageStatus: [
        { value: -1, describe: "全部" },
        { value: 0, describe: "待存档" },
        { value: 1, describe: "已存档" },
      ],
      tableList: [],
      tableloading: false,
      currentPage: 1,
      PageSize: 10,
      total: 0,
      Idx: 0,
      EndTimes: "",
      StartTimes: "",
      Modifiers: "",
      operates: [], // 获取页面权限
      operatiOBj: {
        // 父权限查看数据
        menuid: "",
        OperationCode: "Query",
      },
      fileter: {},
      IdArr: [],
      nums: 200,
    };
  },
  created() {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations;
      this.operatiOBj.menuid = this.$operatedata(this.operates, "Query").MenuId;
      this.GetContractArchivesPageList();
      this.GetBfCompanyPageList();
      this.GetArchivesEnumContractType();
      this.GetArchivesEnumProjectContractBusinessType();
      this.GetArchivesEnumStafffContractBusinessType();
      this.Addnums(this.nums);
      //       let date=new Date();
      //       this.SigningTimeYear=date.getFullYear()
      //       this.SigningTimeMonth=date.getMonth() + 1
      //       this.MonthChange()
      //       this.SigningTimeDay=date.getDate()
      //       if(this.SigningTimeYear!=''){
      //           for(let i=1;i<13;i++){
      //              let obj= {
      //                value:i,
      //                describe:i
      //         }
      //         this.SigningTimeMonthList.push(obj)
      //       }
      //     }
    }
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop);
    }
  },
  watch: {
    FileType(newval, oldval) {
      this.BusinessType = "";
      this.ContractType = "";
    },
    SigningTimeYear() {
      // if(this.SigningTimeYear!=''){
      //         for(let i=1;i<13;i++){
      //       let obj= {
      //         value:i,
      //         describe:i
      //       }
      //       this.SigningTimeMonthList.push(obj)
      //     }
      //   }
      // this.SigningTimeMonth=''
      // this.SigningTimeDay=''
      // this.SigningTimeMonthList=[]
      if (this.SigningTimeYear != "") {
        for (let i = 1; i < 13; i++) {
          let obj = {
            value: i,
            describe: i,
          };
          this.SigningTimeMonthList.push(obj);
        }
      } else {
        this.SigningTimeMonth = "";
        this.SigningTimeDay = "";
        this.SigningTimeMonthList = [];
        this.SigningTimeDayList = [];
      }
    },
    SigningTimeMonth() {
      this.SigningTimeDay = "";
      if (this.SigningTimeMonth == "") {
        this.SigningTimeDay = "";
        this.SigningTimeDayList = [];
      }
      let days = 0;
      if (
        this.SigningTimeMonth == 1 ||
        this.SigningTimeMonth == 3 ||
        this.SigningTimeMonth == 5 ||
        this.SigningTimeMonth == 7 ||
        this.SigningTimeMonth == 8 ||
        this.SigningTimeMonth == 10 ||
        this.SigningTimeMonth == 12
      ) {
        days = 32;
      } else if (this.SigningTimeMonth == 2) {
        if (
          (this.SigningTimeYear % 4 == 0 && this.SigningTimeYear % 100 != 0) ||
          this.SigningTimeYear % 400 == 0
        ) {
          days = 30;
        } else {
          days = 29;
        }
      } else if (this.SigningTimeMonth == "") {
        days = 0;
      } else {
        days = 31;
      }
      this.SigningTimeDayList = [];
      for (let i = 1; i < days; i++) {
        let obj = {
          value: i,
          describe: i,
        };
        this.SigningTimeDayList.push(obj);
      }
    },
  },
  methods: {
    GetYear() {
      let date = new Date();
      this.SigningTimeYear = date.getFullYear();
    },
    GetMonth() {
      if (this.SigningTimeYear != "") {
        let date = new Date();
        this.SigningTimeMonth = date.getMonth() + 1;
      }
    },
    GetDay() {
      if (this.SigningTimeYear != "" || this.SigningTimeMonth != "") {
        let date = new Date();
        this.SigningTimeDay = date.getDate();
      }
    },
    //筛选项
    SelectCheck(val) {
      this.tableloading = true;
      this.checkboxVal = val;
      this.tableloading = false;
    },
    //关闭预览
    closeFileShow(val) {
      this.iframeShow = val;
    },
    selectLoadmore() {
      // console.log(111);
      this.nums = this.nums + 100;
      this.Addnums(this.nums);
    },
    Addnums(num) {
      this.SigningTimeYearList = [];
      for (let i = 1900; i < 1900 + num; i++) {
        let obj = {
          value: i,
          describe: i,
        };
        this.SigningTimeYearList.push(obj);
      }
    },
    sendIdx(e) {
      this.currentPage = e;
      this.GetArchivesOperationLogPageList();
    },
    sendSize(e) {
      this.PageSize = e;
      this.GetArchivesOperationLogPageList();
    },
    ShowAttachUrl(e) {
      if (e) {
        const ext = e.slice(e.lastIndexOf(".") + 1).toLowerCase();
        console.log(e);
        if (ext == "pdf") {
          this.isImg = 2;
          this.previewFileUrl = e;
        } else if (
          ext == "doc" ||
          ext == "docx" ||
          ext == "xlsx" ||
          ext == "xls"
        ) {
          this.isImg = 3;
          this.previewFileUrl =
            "https://view.officeapps.live.com/op/view.aspx?src=" + e;
        } else {
          this.isImg = 1;
          this.previewFileUrl = e;
        }
        this.iframeShow = true;
      }
    },
    LookDetails(data) {
      console.log(data);
      // const { href } = this.$router.resolve({
      //   path: '/FileManagement/FileDetails',
      //   query: {
      //     Id: data.Id,
      //     name:'合同档案详情',
      //     SysUserName:data.SysUserName
      //   }
      // })
      // window.open(href, '_blank')
      let breadpath = {
        name: this.$route.name,
        router: this.$route.path,
      };
      window.localStorage.setItem("breadpath", JSON.stringify(breadpath));
      if (data.ContractType == 0) {
        const { href } = this.$router.resolve({
          path: "/ContractManagement/ContractDetails",
          query: {
            Id: data.SourceContractId,
            Type: data.ContractType,
          },
        });
        window.open(href, "_blank");
      } else if (data.ContractType == 1) {
        const { href } = this.$router.resolve({
          path: "/ContractManagement/EmployeesContractDetails",
          query: {
            Id: data.SourceContractId,
            Type: data.ContractType,
          },
        });
        window.open(href, "_blank");
      }
    },
    Modifier(e, StartTime, EndTimes) {
      this.Modifiers = e;
      this.StartTimes = StartTime;
      this.EndTimes = EndTimes;
      this.GetArchivesOperationLogPageList();
    },
    hideConfirmReceipt(e) {
      this.showConfirmReceipt = e;
    },
    RefreshPage(e) {
      this.showConfirmReceipt = e;
      this.GetContractArchivesPageList();
    },
    //确认签收
    ConfirmReceipt(e) {
      // console.log(e);
      this.contractId = e.Id;
      this.showConfirmReceipt = true;
    },
    //添加提醒
    AddReminder(e) {
      let date = new Date();
      let min = date.getMinutes();
      date.setMinutes(min + 15);
      let y = date.getFullYear();
      let m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let f =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let s =
        date.getSeconds() < 10 ? "0" + date.getseconds() : date.getSeconds();
      let formatdate = y + "-" + m + "-" + d + " " + h + ":" + f + ":" + s;
      let obj = {
        Type: 7,
        Content: `[${e.SysUserName}],您收到一条催办消息:[${e.ContractName}][${
          e.ContractTypeText
        }][${
          e.ArchiveType == 0 ? "纸质存档" : "电子存档"
        }]需要您提交至档案室下存档，请及时处理`,
        RemindTime: formatdate,
        Repeat: 0,
        SysUserId: e.SysUserId,
        BeforeType: "0",
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      showLoading();
      AddReminds(obj).then((res) => {
        if (res.IsSuccess) {
          hideLoading();
          this.$message({
            type: "success",
            message: "催办成功",
          });
        } else {
          this.$message({
            type: "warning",
            message: res.MessageContent,
          });
        }
      });
    },
    //删除
    Delete(e, str) {
      let operationcode = this.$operatedata(this.operates, str).MenuId;
      this.$confirm("此操作将永久删除该信息，是否继续删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = {
            IdArr: e.Id,
            menuid: operationcode,
            operationcode: str,
          };
          showLoading();
          DeleteContractArchives(obj).then((res) => {
            if (res.IsSuccess) {
              hideLoading();
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.GetContractArchivesPageList();
            } else {
              this.$message({
                type: "warning",
                message: res.MessageContent,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    closeDialog(str) {
      (this.EndTimes = ""),
        (this.StartTimes = ""),
        (this.Modifiers = ""),
        (this.showOperationLogDetails = str);
    },
    //操作日志
    OperationLog(e) {
      console.log(e);
      this.DocumentCode = e.DocumentCode;
      this.ArchivesCabinetId = e.Id;
      this.SysUserName = e.SysUserName;
      this.showOperationLogDetails = true;
      this.GetArchivesOperationLogPageList();
    },
    GetArchivesOperationLogPageList() {
      let obj = {
        OperationObjType: 3,
        OperationObjId: this.ArchivesCabinetId,
        SysUserName: this.Modifiers,
        StartTime: this.StartTimes,
        EndTime: this.EndTimes,
        OperationType: this.OperationType,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      showLoading();
      GetArchivesOperationLogPageList(obj).then((res) => {
        if (res.IsSuccess && res.Data != null) {
          hideLoading();
          this.OperationLogList = res.Data;
          this.Total = res.Total;
        } else {
          this.OperationLogList = [];
        }
      });
    },
    sendOperationType(e) {
      this.OperationType = e;
    },
    //下载
    Upload(e) {
      if (e.Id) {
        this.IdArr = e.Id;
        this.DownloadContractArchives();
      }
    },
    UploadAll() {
      if (this.Ids != []) {
        this.IdArr = this.Ids.toString();
        this.DownloadContractArchives();
      } else {
        this.Ids = [];
      }
    },
    DownloadContractArchives() {
      let obj = {
        IdArr: this.IdArr.toString(),
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      showLoading();
      DownloadContractArchives(obj).then((res) => {
        if (res.IsSuccess && res.Data != null) {
          hideLoading();
          window.open(res.Data);
          this.$message({
            type: "success",
            message: "下载成功",
          });
          this.IdArr = [];
        } else {
          this.$message({
            type: "warning",
            message: res.MessageContent,
          });
        }
      });
    },
    //修改
    // Modify(e){
    //   console.log(e);
    //   this.dialogTitle='修改文件信息'
    //   this.dataObject.FileTime=e.OccurrenceTime
    //   this.dataObject.AffiliatedCompany=e.BfCompanyId
    //   this.dataObject.FileType=e.FinanceType
    //   this.dataObject.ArchiveMode=e.ArchiveType
    //   this.dataObject.ArchiveStatus=e.SubmitArchives
    //   this.dataObject.SelectFile=e.AttachUrl
    //   this.ModifyId=e.Id
    //   this.dialogVisible=true
    // },
    //保存
    // save(e){
    //   this.$refs[e].validate((valid) => {
    //       if (valid) {
    //         let describe=''
    //         let Times=this.dataObject.FileTime.split('-')
    //         if(this.dialogTitle=='上传文件信息'){
    //           this.AffiliatedCompanyLists.forEach(data=>{
    //             if(this.dataObject.AffiliatedCompany==data.Id){
    //               this.AffiliatedCompanyText=data.Name
    //             }
    //           })
    //           this.FileTypeList.forEach(data=>{
    //             if(this.dataObject.FileType==data.value){
    //               describe=data.describe
    //             }
    //           })
    //         let obj={
    //            FinanceName:this.AffiliatedCompanyText+Times[0]+'年'+Times[1]+'月'+describe,
    //            OccurrenceTime: this.dataObject.FileTime,
    //            BfCompanyId:this.dataObject.AffiliatedCompany,
    //            FinanceType: this.dataObject.FileType,
    //            ArchiveType: this.dataObject.ArchiveMode,
    //            SubmitArchives:this.dataObject.ArchiveStatus,
    //            AttachUrl: this.dataObject.SelectFile,
    //            menuid: MenuIdDate(),
    //            operationcode: '1'
    //         }
    //         AddFinanceArchives(obj).then(res=>{
    //           if(res.IsSuccess){
    //             this.$message({
    //               type:'success',
    //               message:'上传文件成功'
    //             })
    //             this.GetContractArchivesPageList()
    //             this.dialogVisible=false
    //             this.dataObject.AffiliatedCompany=''
    //             this.dataObject.FileType=''
    //             this.dataObject.FileTime=''
    //             this.dataObject.ArchiveMode=''
    //             this.dataObject.ArchiveStatus=''
    //             // this.dataObject.FilingCabinetNo=''
    //             this.dataObject.SelectFile=''
    //           }else{
    //              this.$message({
    //               type:'warning',
    //               message:res.MessageContent
    //             })
    //           }
    //         })
    //        }else{
    //          let obj={
    //            Id:this.ModifyId,
    //            FinanceName:this.AffiliatedCompanyText+Times[0]+'年'+Times[1]+'月'+describe,
    //            OccurrenceTime: this.dataObject.FileTime,
    //            BfCompanyId:this.dataObject.AffiliatedCompany,
    //            FinanceType: this.dataObject.FileType,
    //            ArchiveType: this.dataObject.ArchiveMode,
    //            SubmitArchives:this.dataObject.ArchiveStatus,
    //            AttachUrl: this.dataObject.SelectFile,
    //            menuid: MenuIdDate(),
    //            operationcode: '1'
    //          }
    //          showLoading()
    //          EditFinanceArchives(obj).then(res=>{
    //          hideLoading()
    //           if(res.IsSuccess){
    //             this.$message({
    //               type:'success',
    //               message:'修改文件成功'
    //             })
    //             this.GetContractArchivesPageList()
    //             this.dialogVisible=false
    //             this.dataObject.AffiliatedCompany=''
    //             this.dataObject.FileType=''
    //             this.dataObject.FileTime=''
    //             this.dataObject.ArchiveMode=''
    //             this.dataObject.ArchiveStatus=''
    //             this.dataObject.SelectFile=''
    //           }else{
    //              this.$message({
    //               type:'warning',
    //               message:res.MessageContent
    //             })
    //           }
    //          })
    //        }
    //       }else {
    //        this.$message({
    //           type:'warning',
    //           message:'请完善信息后提交'
    //         })
    //         return false;
    //       }
    //   })
    // },
    //取消
    closedialog() {
      this.dialogVisible = false;
      this.dataObject.AffiliatedCompany = "";
      this.dataObject.FileType = "";
      this.dataObject.FileTime = "";
      this.dataObject.ArchiveMode = "";
      this.dataObject.ArchiveStatus = "";
      this.dataObject.SelectFile = "";
      this.dataObject.FilingCabinetNo = "";
    },
    //导出合同档案
    exportFile() {
      if (this.Ids.length > 0) {
        let obj = {
          IdArr: this.Ids.toString(),
          menuid: MenuIdDate(),
          operationcode: "1",
        };
        showLoading();
        ExportContractArchivesProjectAdnStafffStandingBook(obj).then((res) => {
          if (res.IsSuccess && res.Data != null) {
            hideLoading();
            window.open(res.Data);
            this.$message({
              type: "success",
              message: "导出成功",
            });
          } else {
            this.$message({
              type: "warning",
              message: res.MessageContent,
            });
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择文件后导出",
        });
      }
    },
    //上传文件
    // uploadFile(){
    //   this.dialogVisible=true
    // },
    //删除文件
    deletefile() {
      this.fileter = {};
    },
    //获取合同档案分页列表
    GetContractArchivesPageList() {
      let obj = {
        ContractType: this.FileType,
        BusinessType: -1,
        ArchiveStatus: this.tabidx,
        ContractName: this.ContractName,
        SysUserName: this.Creator,
        SigningTimeYear: this.SigningTimeYear,
        SigningTimeMonth: this.SigningTimeMonth,
        SigningTimeDay: this.SigningTimeDay,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        Sign: "",
        menuid: this.operatiOBj.menuid || MenuIdDate(),
        operationcode: this.operatiOBj.OperationCode || '1',
      };
      if (this.FileType === "") {
        obj.ContractType = -1;
        obj.BusinessType = -1;
      } else if (this.FileType === 0) {
        obj.BusinessType = this.BusinessType;
      } else if (this.FileType === 1) {
        obj.BusinessType = this.ContractType;
      }
      if (obj.BusinessType === "") {
        obj.BusinessType = -1;
      }
      showLoading()
      GetContractArchivesPageList(obj).then((res) => {
        hideLoading()
        if (res.IsSuccess && res.Data != null) {
          this.tableList = res.Data;
          this.total = res.Total;
        } else {
          this.tableList = [];
        }
      });
    },
    // 上传
    uploadfile(e) {
      var uploader;
      this.fileloading = true;
      const files = e.target.files[0];
      var path = process.env.VUE_APP_BASE_API_UPLOAD;
      if (files) {
        var ext = files.name
          .slice(files.name.lastIndexOf(".") + 1)
          .toLowerCase();
        if (
          ext !== "pdf" &&
          ext !== "doc" &&
          ext !== "docx" &&
          ext !== "png" &&
          ext !== "jpg"
        ) {
          this.$message({
            message: "不支持该格式",
            type: "warning",
          });
          this.fileloading = false;
          e.target.value = [];
          return false;
        }
        // 文件大小限制
        // if (files.size > (50 * 1024 * 1024)) {
        //   this.$message({
        //     message: '文件大小超过最大限制',
        //     type: 'warning'
        //   })
        //   this.fileloading = false
        //   return
        // }
        if (ext == "doc" || ext == "docx" || ext == "pdf") {
          // 文件循环上传
          uploader = new SupperUploader(path, files, uuid(), 2 * 1024 * 1024);
          uploader.UploadFun(() => {
            if (uploader.urlResult) {
              console.log(uploader.urlResult);
              const obj = {
                name: files.name,
                Url: uploader.urlResult.VideoUrl,
                visible: true,
              };
              // if (index == undefined) {
              //   this.filterlist.push(obj)
              // } else {
              //   this.filterlist.splice(index, 1, obj)
              // }
              this.fileter = obj;
              this.dataObject.SelectFile = this.fileter.Url;
              // console.log(this.fileter);
            }
            this.fileloading = false;
            this.fileter.filestype = ext.toUpperCase();
            this.$refs.upload.value = null;
          });
        } else {
          // 图片上传
          console.log("上传图片");
          let datas = new FormData();
          datas.append("file", files);
          datas.append("message", "{ImageStreamName:'file',BussinessType:0}");
          axios
            .post(path, datas)
            .then((res) => {
              if (res.data.State) {
                const obj1 = {
                  name: files.name,
                  Url: res.data.ImageUrl,
                  visible: true,
                };
                // if (index == undefined) {
                //   this.filterlist.push(obj1)
                // } else {
                //   this.filterlist.splice(index, 1, obj1)
                // }
                this.fileter = obj1;
                // console.log(this.fileter.Url);
                this.dataObject.SelectFile = this.fileter.Url;
                this.fileter.filestype = ext.toUpperCase();
              }
              this.fileloading = false;
            })
            .catch(() => {
              this.fileloading = false;
            });
        }
      } else {
        this.fileloading = false;
      }
    },
    //获取公司分页列表
    GetBfCompanyPageList() {
      let obj = {
        Name: "",
        Level: -1,
        Status: 1,
        PageIndex: 1,
        PageSize: 99,
        menuid: this.operatiOBj.menuid || MenuIdDate(),
        operationcode: this.operatiOBj.OperationCode || '1',
      };
      GetBfCompanyPageList(obj).then((res) => {
        if (res.IsSuccess && res.Data != null) {
          this.AffiliatedCompanyLists = res.Data;
        }
      });
    },
    //获取文件类型
    GetArchivesEnumContractType() {
      let obj = {
        menuid: this.operatiOBj.menuid || MenuIdDate(),
        operationcode: this.operatiOBj.OperationCode || '1',
      };
      GetArchivesEnumContractType(obj).then((res) => {
        if (res != null) {
          this.FileTypeList = res;
          // console.log(this.FileTypeList);
        } else {
          this.FileTypeList = [];
        }
      });
    },
    // 合同档案信息-(文件类型=项目合同)业务类型
    GetArchivesEnumProjectContractBusinessType() {
      let obj = {
        menuid: this.operatiOBj.menuid,
        operationcode: this.operatiOBj.OperationCode,
      };
      GetArchivesEnumProjectContractBusinessType(obj).then((res) => {
        if (res != null) {
          this.BusinessTypeList = res;
        } else {
          this.BusinessTypeList = [];
        }
      });
    },
    GetArchivesEnumStafffContractBusinessType() {
      let obj = {
        menuid: this.operatiOBj.menuid || MenuIdDate(),
        operationcode: this.operatiOBj.OperationCode || '1',
      };
      GetArchivesEnumStafffContractBusinessType(obj).then((res) => {
        if (res != null) {
          this.ContractTypeList = res;
        } else {
          this.ContractTypeList = [];
        }
      });
    },
    //重置
    Reset() {
      this.SigningTimeYear = "";
      this.AffiliatedCompany = "";
      this.FileType = "";
      this.FileTime = "";
      this.Creator = "";
    },
    //查询
    searchtable() {
      this.currentPage = 1;
      this.GetContractArchivesPageList();
    },
    //切换类型
    chooseschedule(e) {
      this.tabidx = e;
      this.currentPage = 1;
      this.GetContractArchivesPageList();
    },
    //多选
    handleSelectionChange(value) {
      this.Ids = [];
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].Id);
      }
      console.log(this.Ids);
      if (this.Ids.length == this.tableList.length) {
        this.allchecked = true;
      } else {
        this.allchecked = false;
      }
    },
    // 全选
    selectall() {
      this.Idx++;
      this.$refs.multipleTable.toggleAllSelection();
      if (this.Idx % 2 == 1) {
        this.$refs.multipleTable.tableData.forEach((data) => {
          if (data.Id) {
            this.Ids.push(data.Id);
          }
        });
      } else {
        this.Ids = [];
        this.Idx = 0;
      }
    },
    // 选择分页大小
    handleSizeChange(val) {
      this.PageSize = val;
      this.GetContractArchivesPageList();
    },
    // 跳转页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetContractArchivesPageList();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.ContractFileManagement-Box {
  .selectWidth {
    width: 150px !important;
  }
  .SigningTime {
    margin: 0 5px !important;
    width: 120px !important;
    // .el-select-dropdown .el-popper{
    //   height: 300px;
    // }
  }
  .SpanText {
    font-size: 16px;
    font-weight: 700;
    color: $erp666;
  }
  .operate-top {
    margin: 26px 24px 0 24px;
    float: right;
    .screening-compent {
      float: right;
      margin-right: 5px;
    }
  }
  .BtnBox {
    display: inline-block;
  }
  .tab {
    margin-left: 24px;
  }
  .operate-table {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 24px;
    padding: 16px 24px 24px 24px;
    border-radius: 0;
    .watchcode {
      color: #1588f8;
      cursor: pointer;
    }
  }
  .operate-bottom {
    margin-left: 20px;
    margin-top: 16px;
    .delete {
      margin-left: 16px;
    }
  }
  /deep/ .el-form-item.file {
    .img-box-list {
      float: left;
      width: 160px;
      position: relative;
      height: 120px;
      > input {
        width: 160px;
        height: 120px;
        position: absolute;
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
    .tip {
      float: right;
      width: 50%;
      color: $erp999;
      margin-top: 20px;
    }
  }
  /deep/ .dialog-footer.three-footer {
    text-align: center;
    > button {
      width: auto;
      height: auto;
      background-color: $erpbtncolor;
      color: $erpcolor;
    }
  }
}
</style>