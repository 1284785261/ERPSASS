<!--发起付款申请-->
<template>
  <div class="add-payment-request-container">
    <div class="bread">
      <BreadCrumb :url-list="urlList" />
    </div>
    <div class="form-content">
      <el-form
        ref="paymentform"
        label-position="top"
        :model="paymentform"
        :rules="rules"
        label-width="140px"
        class="paymentform"
      >
        <div class="form-cont">
          <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Type" label="类型" prop="Type">
                <el-select
                  disabled
                  v-model="paymentform.Type"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in ApplyPayEnumType"
                    :key="item.value"
                    :label="item.describe"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item
                ref="SocialSecurityNo"
                :label="AccountNumber"
                prop="SocialSecurityNo"
              >
                <el-select
                  v-model="paymentform.SocialSecurityNo"
                  placeholder="请选择"
                  @change="selectChange"
                >
                  <el-option
                    v-for="item in SocialSecurityNoList"
                    :key="item.value"
                    :label="item.Account"
                    :value="item.BfInsuranceFundId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item
                ref="BfCompanyId"
                label="付款公司"
                prop="BfCompanyId"
              >
                <el-select
                  v-model="paymentform.BfCompanyId"
                  remote
                  filterable
                  clearable
                  placeholder="搜索或选择付款公司"
                  :remote-method="BfCompanyMethod"
                  autocomplete="off"
                  @clear="BfCompanyMethod('')"
                >
                  <el-option
                    :label="item.Name"
                    :value="item.Id"
                    v-for="(item, index) in BfCompanylist"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Method" label="付款方式" prop="Method">
                <el-select
                  v-model="paymentform.Method"
                  placeholder="请选择"
                  clearable
                  autocomplete="off"
                >
                  <el-option
                    v-for="item in ApplyPayEnumMethod"
                    :key="item.value"
                    :label="item.describe"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="PayType" label="支出类型" prop="PayType">
                <el-select
                  v-model="paymentform.PayType"
                  clearable
                  placeholder="请选择支出类型"
                  autocomplete="off"
                >
                  <!-- <el-option label="正常" :value="0"></el-option>
                  <el-option label="挂账" :value="1"></el-option>
                  <el-option label="结余" :value="2"></el-option>
                  <el-option label="管理费" :value="3"></el-option> -->
                  <el-option
                    v-for="(it, index) in PayTypeList"
                    :key="index"
                    :label="it.describe"
                    :value="it.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item ref="Advance" label="付款金额" prop="Advance">
                <el-input
                  v-model="paymentform.Advance"
                  disabled
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item
                ref="HandleUserId"
                label="经办人"
                prop="HandleUserId"
              >
                <!-- <el-select v-model="paymentform.HandleUserId" placeholder="请选择经办人">
                  <el-option v-for="item in userlist" :key="item.value" :label="item.describe" :value="item.value"></el-option>
                </el-select> -->
                <el-select
                  v-model="paymentform.HandleUserId"
                  filterable
                  disabled
                  clearable
                  placeholder="搜索选择经办人"
                  @clear="userMethod"
                >
                  <el-option
                    :label="item.UserName"
                    :value="item.Id"
                    v-for="(item, index) in userlist"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item
                ref="OrgName"
                label="经办部门"
                prop="ApplicationDepartment"
              >
                <el-select
                  v-model="paymentform.ApplicationDepartment"
                  clearable
                  filterable
                  remote
                  placeholder="请选择经办部门"
                  :loading="loading"
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
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="入账年月" class="Date" prop="Dates">
                <el-date-picker
                  v-model="paymentform.Dates"
                  value-format="yyyy-M"
                  type="month"
                  placeholder="入账年月"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item ref="Explain" label="用途说明" class="text">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="paymentform.Explain"
                  maxlength="500"
                  resize="none"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item ref="Remark" label="备注" class="text">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="paymentform.Remark"
                  maxlength="500"
                  resize="none"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="operate-table TabHit" v-if="paymentform.Type == 0">
                <el-table
                  ref="multipleTable"
                  class="erp-table"
                  v-loading="tableloading"
                  :data="tableData"
                  max-height="600"
                  tooltip-effect="dark"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column
                    align="center"
                    type="selection"
                    min-width="55"
                    fixed
                    label="全选"
                  />
                  <el-table-column
                    align="center"
                    prop="SiSettleId"
                    min-width="80"
                    fixed
                    label="序号"
                  />
                  <el-table-column
                    align="center"
                    prop="SiSettleCode"
                    label="社保结算单编号"
                    min-width="150"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    align="center"
                    prop="SiSettleTitle"
                    label="社保结算单名称"
                    min-width="160"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    align="center"
                    prop="Account"
                    label="社保账号"
                    min-width="130"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    align="center"
                    prop="UserName"
                    label="外包员工名称"
                    min-width="120"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    align="center"
                    prop="Amount"
                    label="缴纳金额"
                    min-width="120"
                  />
                  <el-table-column
                    align="center"
                    prop="AmountPurpose"
                    label="所属年月"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <span>{{
                        scope.row.Year + "年" + scope.row.Month + "月"
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="AmountPurpose"
                    label="入账年月"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <span>{{
                        scope.row.PeriodYear +
                        "年" +
                        scope.row.PeriodMonth +
                        "月"
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="StatusTest"
                    label="付款状态"
                    min-width="150"
                    show-overflow-tooltip
                  />
                </el-table>
              </div>
              <div class="operate-table TabHit" v-if="paymentform.Type == 1">
                <el-table
                  ref="multipleTable"
                  class="erp-table"
                  v-loading="tableloading"
                  :data="tableData"
                  max-height="600"
                  tooltip-effect="dark"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column
                    align="center"
                    type="selection"
                    min-width="55"
                    fixed
                    label="全选"
                  />
                  <el-table-column
                    align="center"
                    prop="MedicalSettleId"
                    min-width="80"
                    fixed
                    label="序号"
                  />
                  <el-table-column
                    align="center"
                    prop="MedicalSettleCode"
                    label="社保结算单编号"
                    min-width="150"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    align="center"
                    prop="MedicalSettleTitle"
                    label="社保结算单名称"
                    min-width="160"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    align="center"
                    prop="Account"
                    label="社保账号"
                    min-width="130"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    align="center"
                    prop="UserName"
                    label="外包员工名称"
                    min-width="120"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    align="center"
                    prop="Amount"
                    label="缴纳金额"
                    min-width="120"
                  />
                  <el-table-column
                    align="center"
                    prop="AmountPurpose"
                    label="所属年月"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <span>{{
                        scope.row.Year + "年" + scope.row.Month + "月"
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="AmountPurpose"
                    label="入账年月"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <span>{{
                        scope.row.PeriodYear +
                        "年" +
                        scope.row.PeriodMonth +
                        "月"
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="StatusTest"
                    label="付款状态"
                    min-width="150"
                    show-overflow-tooltip
                  />
                </el-table>
              </div>
              <div class="operate-table TabHit" v-if="paymentform.Type == 2">
                <el-table
                  ref="multipleTable"
                  class="erp-table"
                  v-loading="tableloading"
                  :data="tableData"
                  max-height="600"
                  tooltip-effect="dark"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column
                    align="center"
                    type="selection"
                    min-width="55"
                    fixed
                    label="全选"
                  />
                  <el-table-column
                    align="center"
                    prop="HouseFundSettleId"
                    min-width="80"
                    fixed
                    label="序号"
                  />
                  <el-table-column
                    align="center"
                    prop="HouseFundSettleCode"
                    label="社保结算单编号"
                    min-width="150"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    align="center"
                    prop="HouseFundSettleTitle"
                    label="社保结算单名称"
                    min-width="160"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    align="center"
                    prop="Account"
                    label="社保账号"
                    min-width="130"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    align="center"
                    prop="UserName"
                    label="外包员工名称"
                    min-width="120"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    align="center"
                    prop="Amount"
                    label="缴纳金额"
                    min-width="120"
                  />
                  <el-table-column
                    align="center"
                    prop="AmountPurpose"
                    label="所属年月"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <span>{{
                        scope.row.Year + "年" + scope.row.Month + "月"
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="AmountPurpose"
                    label="入账年月"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <span>{{
                        scope.row.PeriodYear +
                        "年" +
                        scope.row.PeriodMonth +
                        "月"
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="StatusTest"
                    label="付款状态"
                    min-width="150"
                    show-overflow-tooltip
                  />
                </el-table>
              </div>
              <div class="operate-bottom">
                <el-checkbox
                  class="allcheck erpcheck"
                  v-model="allchecked"
                  @change="selectall(allchecked)"
                  >全选</el-checkbox
                >
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="btn-box">
                <el-button class="erpbtn" @click="paymentcancel"
                  >取消</el-button
                >
                <el-button class="erpbtn" @click="paymentsave">保存</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="dialog">
      <orgteam
        :orgtitle="orgtitle"
        :visible="showOrg"
        :temporary="temporary"
        @closeorg="closeorg"
        @saveorg="saveorg"
      ></orgteam>
    </div>
  </div>
</template>

<script>
import { GetCatagoryList } from "@/api/Public.js";
import {
  GetApplyPayAllEnum,
  GetCompanyInvoiceApplyBySettle,
  GetCompanyMoneyRecordBySettle,
  GetApplyPayInfo,
} from "@/api/FinancialManagement.js";
import { GetSysUserListByOrgId, GetOrgByUserId } from "@/api/SystemSetting.js";
import {
  GetOnCreditListByProject,
  AddSocialSecurityPayApply,
  GetSiSettleMemberSettlePageList,
  GetMedicalSettleMemberSettlePageList,
  GetHouseFundSettleMemberSettlePageList,
} from "@/api/CompensationServiceManagement.js";
import { GetBfCompanyPageList, GetSalaryBankList } from "@/api/BusinessSet.js";
import {
  showLoading,
  hideLoading,
  MenuIdDate,
} from "@/utils/CustomValidation.js";
import BreadCrumb from "@/components/publicComponents/breadCrumb.vue";
import orgteam from "@/components/publicComponents/dialog-orgteam.vue";
import axios from "axios";
import qs from "qs";
import { filter } from "minimatch";
export default {
  components: {
    BreadCrumb,
    orgteam,
  },
  data() {
    return {
      urlList: [
        {
          name: "缴纳管理",
          router:
            "/CompensationServiceManagement/UserSocialSecuritySettlementManagement",
        },
        {
          name: "发起工资付款申请",
          router: "",
        },
      ],
      paymentform: {
        Dates: "",
        Type: "",
        Advance: "",
        PayType: 0,
        SocialSecurityNo: "",
        BfCompanyId: "",
        Method: "",
        HandleUserId: "",
        Remark: "",
        Explain: "",
        ApplicationDepartment: "",
      },
      PayTypeList: [
        {
          describe: "正常",
          value: 0,
        },
        {
          describe: "挂账",
          value: 1,
        },
        {
          describe: "结余",
          value: 2,
        },
        {
          describe: "管理费",
          value: 3,
        },
      ],
      loading: false,
      allchecked: false,
      AccountNumber: "社保账号",
      tableloading: false,
      tableData: [],
      SocialSecurityNoList: [], //社保账号列表
      InvoiceList: [], // 发票列表
      MoneyRecordList: [], // 流水列表
      // 发票关联流水列表
      InvoiceInfo: [
        {
          InvoiceApplyId: "",
          MoneyRecordId: "",
        },
      ],
      Type: "",
      ProjectId: "",
      fileUrl: "",
      uploadLoading: false,
      ApplyPayEnumType: [
        {
          value: 0,
          describe: "社保",
        },
        {
          value: 1,
          describe: "医保",
        },
        {
          value: 2,
          describe: "公积金",
        },
      ], // 类型
      Ids: [], //ID集合
      Details: [],
      moneys: 0,
      ApplicationDepartmentList: [], //经办部门列表
      ApplyPayEnumMethod: [], // 付款方式
      BfCompanylist: [], // 付款公司列表
      BankNameTolist: [],
      BankNamelist: [], // 开户行列表
      SettleMemberlist: [], //多银行列表
      userlist: [], // 经办人列表
      Creditlist: [], // 挂账列表
      PaymentList: [], //回款列表
      showOrg: false, // 组织结构弹框
      orgtitle: "",
      temporary: {}, // 组织对象
      SettleMember: {}, //查询多银行列表
      rules: {
        Type: [{ required: true, message: "请选择类型", trigger: "change" }],
        SocialSecurityNo: [
          { required: true, message: "请选择社保账号", trigger: "change" },
        ],
        BfCompanyId: [
          { required: true, message: "请选择公司", trigger: "change" },
        ],
        PayType: [
          { required: true, message: "请选择支出类型", trigger: "change" },
        ],
        Advance: [
          { required: true, message: "请输入本次垫付金额", trigger: "blur" },
        ],
        Accepter: [
          { required: true, message: "请输入收款方", trigger: "blur" },
        ],
        BankName: [
          { required: true, message: "请选择开户行", trigger: "change" },
        ],
        Account: [
          { required: true, message: "请输入银行账号", trigger: "blur" },
        ],
        Method: [
          { required: true, message: "请选择付款方式", trigger: "change" },
        ],
        HandleUserId: [
          { required: true, message: "请选择经办人", trigger: "change" },
        ],
        Dates: [
          { required: true, message: "请选择入账年月", trigger: "change" },
        ],
        Amount: [
          { required: true, message: "请输入付款金额", trigger: "blur" },
        ],
        ApplicationDepartment: [
          { required: true, message: "请选择经办部门", trigger: "change" },
        ],
      },
      operating: {},
    };
  },
  watch: {
    temporary(newvalue, oldvalue) {
      this.paymentform.OrgName = newvalue.OrgName;
      if (newvalue.Id) {
        this.userMethod();
      } else {
        this.paymentform.HandleUserId = "";
        this.userlist = [];
      }
    },
    "paymentform.Type"(newVal, oldVal) {
      if (newVal == 0) {
        this.AccountNumber = "社保账号";
      } else if (newVal == 1) {
        this.AccountNumber = "医保账号";
      } else if (newVal == 2) {
        this.AccountNumber = "公积金账号";
      }
    },
  },
  created() {
    // 获取操作operating
    this.operating = JSON.parse(window.localStorage.getItem("operating")) || {};
    this.getApplyPayAllEnum();
    this.GetOrgByUserId();
    this.SocialSecurityNoList = JSON.parse(
      window.localStorage.getItem("ActNmr")
    );
    this.tableData = JSON.parse(window.localStorage.getItem("TabData"));
    // 判断是否显示项目指派人员
    this.paymentform.Type = this.$route.query.type;
    this.paymentform.UsedFor = this.$route.query.name;
    this.SettleMember = this.$route.query.searchform || {};
    this.SettleId = this.$route.query.id;
    this.Type = Number(this.$route.query.type);
    if (JSON.parse(localStorage.getItem("receivableList"))) {
      this.PaymentList = JSON.parse(
        localStorage.getItem("receivableList")
      ).split(",");
      this.paymentform.PaymentLists = this.PaymentList;
    }

    // 获取当前登录账号自动填充经办部门经办人
    const orgdata = JSON.parse(window.localStorage.getItem("Org")) || {};
    const Current = JSON.parse(window.localStorage.getItem("Current")) || {};
    this.paymentform.OrgName = orgdata.OrgName;
    this.paymentform.HandleUserId = Current.currentId;
    this.userlist = [
      {
        UserName: Current.currentUser,
        Id: Current.currentId,
      },
    ];
    // 获取付款申请单详情
    if (this.$route.query && this.$route.query.isbeginid) {
      this.getApplyPayInfo();
    } else {
      this.BfCompanyMethod("");
    }
    this.getCatagoryList();
    this.getBfBankList();
    if (this.Type === 0) {
      this.urlList[1].name = "发起社保付款申请";
      // this.getOnCreditPageList('')
      // 获取当前结算单的发票数据和流水数据, 当获取付款申请之后就不再请求
      if (this.$route.query && this.$route.query.isbeginid) {
      } else {
        // 处理金额
        // this.paymentform.Amount = 0
        // const customer = JSON.parse(window.localStorage.getItem('stafflist'))
        // for (let i = 0; i < customer.length; i++) {
        //   this.paymentform.Amount += parseFloat(customer[i].Amount)
        // }
        // this.paymentform.Amount = Number(this.paymentform.Amount).toFixed(2)
        this.getOnCreditPageList("");
      }
    } else if (this.Type === 1) {
      this.urlList[1].name = "发起医保付款申请";
      this.paymentform.Amount = this.$route.query.Amount;
    } else if (this.Type === 2) {
      this.urlList[1].name = "发起公积金付款申请";
      this.paymentform.Amount = this.$route.query.Amount;
    }
    this.paymentform.BusinessNo = this.$route.query.code;
    this.paymentform.Type = Number(this.$route.query.type);

    // this.getOnCreditPageList('')
  },
  methods: {
    //筛选缴纳分页列表
    selectChange() {
      if (this.paymentform.Type == 0) {
        this.GetSiSettleMemberSettlePageList();
      } else if (this.paymentform.Type == 1) {
        this.GetMedicalSettleMemberSettlePageList();
      } else if (this.paymentform.Type == 1) {
        this.GetHouseFundSettleMemberSettlePageList();
      }
    },
    //获取社保缴纳分页列表
    GetSiSettleMemberSettlePageList(e) {
      let obj = {
        SiSettleCode: "",
        UserName: "",
        Status: -1,
        BfInsuranceFundId: this.paymentform.SocialSecurityNo,
        Year: "",
        Month: "",
        PeriodYear: "",
        PeriodMonth: "",
        PageIndex: 1,
        PageSize: 999,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      showLoading();
      GetSiSettleMemberSettlePageList(obj).then((res) => {
        hideLoading();
        if (res.MessageCode == 0 && res.Data != null) {
          this.tableData = res.Data;
        } else {
          this.tableData = [];
        }
      });
    },
    //获取医保缴纳分页列表
    GetMedicalSettleMemberSettlePageList(e) {
      let obj = {
        MedicalSettleCode: "",
        UserName: "",
        Status: -1,
        BfInsuranceFundId: this.paymentform.SocialSecurityNo,
        Year: "",
        Month: "",
        PeriodYear: "",
        PeriodMonth: "",
        PageIndex: 1,
        PageSize: 999,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      showLoading();
      GetMedicalSettleMemberSettlePageList(obj).then((res) => {
        hideLoading();
        if (res.MessageCode == 0 && res.Data != null) {
          this.tableData = res.Data;
        } else {
          this.tableData = [];
        }
      });
    },
    //获取公积金缴纳分页列表
    GetHouseFundSettleMemberSettlePageList(e) {
      let obj = {
        HouseFundSettleCode: "",
        UserName: "",
        BfInsuranceFundId: this.paymentform.SocialSecurityNo,
        Status: -1,
        Year: "",
        Month: "",
        PeriodYear: "",
        PeriodMonth: "",
        PageIndex: 1,
        PageSize: 999,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      showLoading();
      GetHouseFundSettleMemberSettlePageList(obj).then((res) => {
        hideLoading();
        if (res.MessageCode == 0 && res.Data != null) {
          this.tableData = res.Data;
        } else {
          this.tableData = [];
        }
      });
    },
    //获取用户组织列表
    GetOrgByUserId() {
      let obj = {
        SysUserId: JSON.parse(localStorage.getItem("Current")).currentId,
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
    //多选
    handleSelectionChange(value) {
      // console.log(value);
      this.Ids = [];
      this.Details = [];
      this.moneys = 0;
      for (let i = 0; i < value.length; i++) {
        this.Ids.push(value[i].SiSettleMemberId);
        this.moneys = this.moneys + value[i].Amount;
        if (value[i].SiSettleMemberId) {
          this.Details.push({ SettleMemberId: value[i].SiSettleMemberId });
        } else if (value[i].MedicalSettleMemberId) {
          this.Details.push({ SettleMemberId: value[i].MedicalSettleMemberId });
        } else if (value[i].HouseFundSettleMemberId) {
          this.Details.push({
            SettleMemberId: value[i].HouseFundSettleMemberId,
          });
        }
      }
      // console.log(value);
      console.log(this.Details);
      this.paymentform.Advance = this.moneys.toFixed(2);
      this.IdArr = this.Ids.toString();
      if (this.Ids.length == this.tableData.length) {
        this.allchecked = true;
      } else {
        this.allchecked = false;
      }
    },
    // 全选
    selectall() {
      this.$refs.multipleTable.toggleAllSelection();
    },
    changes(data) {
      console.log(data);
    },
    // 获取付款申请枚举
    getApplyPayAllEnum() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetApplyPayAllEnum(qs.stringify(obj)).then((response) => {
        if (response) {
          this.ApplyPayEnumMethod = response.ApplyPayEnumMethod;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },
    // 获取付款申请详情
    getApplyPayInfo() {
      new Promise((resolve, reject) => {
        let obj = {
          Id: this.$route.query.isbeginid,
          menuid: MenuIdDate(),
          operationcode: "1",
        };
        GetApplyPayInfo(qs.stringify(obj)).then((response) => {
          if (response.IsSuccess) {
            if (response.Data) {
              this.paymentform.BusinessNo = response.Data.BusinessNo;
              // 回填付款公司
              this.paymentform.BfCompanyId = response.Data.BfCompanyId;
              this.BfCompanylist = [
                {
                  Name: response.Data.BfCompanyName,
                  Id: response.Data.BfCompanyId,
                },
              ];
              this.paymentform.Method = response.Data.Method;
              this.$set(this.paymentform, "PayType", response.Data.PayType);
              this.$set(this.paymentform, "ProjectId", response.Data.ProjectId);
              this.paymentform.AdvanceType = response.Data.AdvanceType;
              // 是否需要代垫, 如果需要则进行回填
              if (this.paymentform.AdvanceType === 1) {
                this.$set(this.paymentform, "Advance", response.Data.Advance);
              }
              this.$set(
                this.paymentform,
                "ApplyPayId",
                this.$route.query.isbeginid
              );
              this.$set(this.paymentform, "UsedFor", response.Data.UsedFor);
              this.$set(
                this.paymentform,
                "AdvanceBack",
                response.Data.AdvanceBack
              );
              this.$set(this.paymentform, "BankName", response.Data.BankName);
              this.$set(this.paymentform, "Remark", response.Data.Remark);
              // 覆盖掉默认的经办人, 改成付款申请单的经办人
              this.$set(
                this.paymentform,
                "OrgName",
                response.Data.HandleOrgName
              );
              this.$set(
                this.paymentform,
                "HandleUserId",
                response.Data.HandleUserId
              );
              this.$set(this.temporary, "OrgName", response.Data.HandleOrgName);
              this.userlist = [
                {
                  UserName: response.Data.HandleUserName,
                  Id: response.Data.HandleUserId,
                },
              ];
              const backdata = {
                SalarySettleIds: response.Data.SalarySettleIds,
                ProjectId: response.Data.ProjectId,
              };
              resolve(backdata);
            }
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error",
            });
          }
        });
      }).then((value) => {
        console.log("第二步", value);
        this.SettleId = value.SalarySettleIds;
        this.ProjectId = value.ProjectId;
        this.getOnCreditPageList();
      });
    },
    // 获取开户行
    getCatagoryList() {
      let obj = {
        ClassName: "",
        Status: 1,
        ClassType: 5,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetCatagoryList(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          this.BankNameTolist = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },
    // 获取公司列表
    BfCompanyMethod(value) {
      // this.BankNamelist = []
      // this.paymentform.BankName = ''
      // this.paymentform.BankBranch = ''
      // this.paymentform.Account = ''
      let obj = {
        Name: value,
        Level: -1,
        Status: 1,
        PageIndex: 1,
        PageSize: 100,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetBfCompanyPageList(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          this.BfCompanylist = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },
    // 获取用户列表
    userMethod() {
      let obj = {
        OrgId: this.temporary.Id,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      this.paymentform.HandleUserId = "";
      this.userlist = [];
      GetSysUserListByOrgId(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          this.userlist = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },
    // 获取开户行列表
    getBfBankList() {
      this.BankNamelist = [];
      let obj = {
        BankName: "",
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetSalaryBankList;
      GetSalaryBankList(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          this.BankNamelist = response.Data;
          // const res = new Map();
          // this.BankNamelist = this.BankNamelist.filter((v) => !res.has(v.BankId) && res.set(v.BankId, 1))
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },
    // // 选择开户支行 废弃
    // chooseBankName(e) {
    //   let data = this.BankNamelist.find(v => {
    //     return v.Id === e
    //   })
    //   if (data) {
    //     this.paymentform.BankBranch = data.Branch
    //     this.paymentform.Account = data.Account
    //   }
    // },
    // 获取挂账列表
    getOnCreditPageList() {
      let obj = {
        ProjectId: this.ProjectId,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      console.log(obj);
      GetOnCreditListByProject(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          this.Creditlist = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },
    // 选择是否单银行
    SettleTypeChange() {
      this.paymentform.BankName = "";
    },
    // 获取发票列表
    getCompanyInvoiceApplyBySettle(value) {
      let obj = {
        SettleId: this.SettleId,
        Key: value,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      console.log(obj);
      GetCompanyInvoiceApplyBySettle(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          this.InvoiceList = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },
    // 获取流水列表
    getCompanyMoneyRecordBySettle(value) {
      let obj = {
        SettleId: this.SettleId,
        Key: value,
        menuid: MenuIdDate(),
        operationcode: "1",
      };
      GetCompanyMoneyRecordBySettle(qs.stringify(obj)).then((response) => {
        if (response.IsSuccess) {
          this.MoneyRecordList = response.Data;
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error",
          });
        }
      });
    },
    // 选择组织结构
    chooseorg() {
      this.orgtitle = "选择组织结构";
      this.showOrg = true;
    },
    // 关闭组织结构
    closeorg(e) {
      this.showOrg = false;
    },
    // 保存弹框
    saveorg(e) {
      this.temporary = e;
      this.showOrg = false;
    },

    // 取消
    paymentcancel() {
      this.$router.go(-1);
    },
    // 保存
    paymentsave() {
      this.$refs.paymentform.validate((v) => {
        if (v) {
          if (this.paymentform.Dates != null) {
            var year = this.paymentform.Dates.split("-")[0];
            var month = this.paymentform.Dates.split("-")[1];
          }
          let obj = {
            Name: "付款申请单",
            Type: this.paymentform.Type,
            Method: this.paymentform.Method,
            Amount: this.paymentform.Advance,
            PayType: this.paymentform.PayType,
            UsedFor: this.paymentform.Explain,
            HandleOrgId: this.paymentform.ApplicationDepartment,
            HandleUserId: this.paymentform.HandleUserId,
            Remark: this.paymentform.Remark,
            Year: year,
            Month: month,
            BfInsuranceFundId: this.paymentform.SocialSecurityNo,
            Detail: this.Details,
            menuid: MenuIdDate(),
            operationcode: "1",
          };
          AddSocialSecurityPayApply(obj).then((res) => {
            if (res.MessageCode == 0) {
              this.$message({
                type: "success",
                message: "发起社保付款成功",
              });
              this.paymentcancel();
            } else {
              this.$message({
                type: "error",
                message: res.MessageContent,
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
.add-payment-request-container {
  .bread {
    margin-left: 24px;
    margin-bottom: 24px;
  }
  .form-content {
    background-color: #fff;
    border-radius: 8px 0px 0px 8px;
    margin-left: 24px;
    padding: 40px 40px 24px 40px;
    .paymentform {
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
          min-height: 41px;
          width: 100%;
          .el-input__inner {
            background-color: $erinputbgc;
          }
          .el-select {
            width: 100%;
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
        &.Date {
          .el-date-editor {
            width: 100%;
          }
          .el-input__inner {
            border: none;
            background: $erinputbgc;
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
      .operate-bottom {
        margin-left: 16px;
        margin-top: 10px;
      }
      .TabHit {
        margin-top: 16px;
      }
      .btn-box {
        margin-top: 30px;
        text-align: center;
        .el-button + .el-button {
          margin-left: 24px;
        }
      }

      // 对应发票流水添加功能
      .invoice-info {
        .handle {
          font-size: $f14;
          color: $erpplaceholder;
          margin-top: 35px;
          display: inline-block;
          margin-right: 24px;
          .svg-icon {
            margin-right: 8px;
            font-size: $f16;
            &.add {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>