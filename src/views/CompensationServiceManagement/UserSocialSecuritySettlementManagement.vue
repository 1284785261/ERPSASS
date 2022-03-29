<!--员工社保结算管理-->
<template>
  <div class="UserSocialSecuritySettlementManagement-Box">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="结算单编码 " label-width="100px">
            <el-input
              v-model.trim="SettlementDocumentCode"
              clearable
              class="select-input"
              suffix-icon="el-icon-search"
              placeholder="请输入结算单编码进行查询"
            />
          </el-form-item>
          <el-form-item label="外包员工名称" label-width="125px">
            <el-input
              v-model.trim="OutsourcingEmployeeName"
              clearable
              class="select-input"
              suffix-icon="el-icon-search"
              placeholder="请输入外包员工名称进行查询"
            />
          </el-form-item>
          <el-form-item label="打款账号" label-width="80px" v-if="tabidx == 0">
            <el-select
              size="mini"
              class="select-input"
              clearable
              v-model="SiAreaId"
              placeholder="请选择项目类型进行查询"
            >
              <el-option
                v-for="(item, idx) in SiAreaList"
                :key="idx"
                :label="item.Account"
                :value="item.BfInsuranceFundId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="打款账号" label-width="80px" v-if="tabidx == 1">
            <el-select
              size="mini"
              class="select-input"
              clearable
              v-model="MedicalAreaId"
              placeholder="请选择项目类型进行查询"
            >
              <el-option
                v-for="(item, idx) in MedicalAreaList"
                :key="idx"
                :label="item.Account"
                :value="item.BfInsuranceFundId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="打款账号" label-width="80px" v-if="tabidx == 2">
            <el-select
              size="mini"
              class="select-input"
              clearable
              v-model="FundAreaId"
              placeholder="请选择项目类型进行查询"
            >
              <el-option
                v-for="(item, idx) in FundAreaList"
                :key="idx"
                :label="item.Account"
                :value="item.BfInsuranceFundId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="付款状态" label-width="80px">
            <el-select
              size="mini"
              class="select-input"
              clearable
              v-model="PaymentStatus"
              placeholder="请选择付款状态进行查询"
            >
              <el-option
                v-for="(item, idx) in PaymentStatusList"
                :key="idx"
                :label="item.describe"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属年月" label-width="80px">
            <el-date-picker
              value-format="yyyy-MM"
              v-model="Dates"
              type="month"
              size="small"
              class="erpsearchinput"
              placeholder="请选择所属年月进行查询"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="入账年月" label-width="80px">
            <el-date-picker
              value-format="yyyy-MM"
              v-model="EntryDate"
              type="month"
              size="small"
              class="erpsearchinput"
              placeholder="请选择所属年月进行查询"
            >
            </el-date-picker>
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
    <div class="tab clearfix">
      <div
        class="tab-name"
        v-for="(item, index) in PaymentType"
        :key="index"
        :class="{ active: tabidx == item.value }"
        @click="chooseschedule(item.value)"
      >
        {{ item.describe }}
      </div>
      <div class="operate-top">
        <el-button
          size="small"
          class="addmenu erpbtn"
          @click="PaymentApplication"
          >发起付款申请</el-button
        >
      </div>
    </div>
    <div class="operate-table" v-if="tabidx == 0">
      <el-table
        ref="multipleTable"
        class="erp-table"
        v-loading="tableloading"
        :data="tableData"
        max-height="600"
        tooltip-effect="dark"
      >
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
            <span>{{ scope.row.Year + "年" + scope.row.Month + "月" }}</span>
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
              scope.row.PeriodYear + "年" + scope.row.PeriodMonth + "月"
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
        <!-- <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link" title="编辑">
                <svg-icon icon-class="setting" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <el-dropdown-item
                    @click.native="Viewdetails(scope.row, 'SetRights')"
                    >查看详情</el-dropdown-item
                  >
                </ul>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="operate-table" v-if="tabidx == 1">
      <el-table
        ref="multipleTable"
        class="erp-table"
        v-loading="tableloading"
        :data="tableData"
        max-height="600"
        tooltip-effect="dark"
      >
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
          label="医保结算单编号"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="MedicalSettleTitle"
          label="医保结算单名称"
          min-width="160"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="Account"
          label="医保账号"
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
            <span>{{ scope.row.Year + "年" + scope.row.Month + "月" }}</span>
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
              scope.row.PeriodYear + "年" + scope.row.PeriodMonth + "月"
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
        <!-- <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link" title="编辑">
                <svg-icon icon-class="setting" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <el-dropdown-item
                    @click.native="Viewdetails(scope.row, 'SetRights')"
                    >查看详情</el-dropdown-item
                  >
                </ul>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="operate-table" v-if="tabidx == 2">
      <el-table
        ref="multipleTable"
        class="erp-table"
        v-loading="tableloading"
        :data="tableData"
        max-height="600"
        tooltip-effect="dark"
      >
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
          label="公积金结算单编号"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="HouseFundSettleTitle"
          label="公积金结算单名称"
          min-width="160"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="Account"
          label="公积金账号"
          min-width="120"
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
          min-width="140"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.Year + "年" + scope.row.Month + "月" }}</span>
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
              scope.row.PeriodYear + "年" + scope.row.PeriodMonth + "月"
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
        <!-- <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link" title="编辑">
                <svg-icon icon-class="setting" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <ul class="popout-list">
                  <el-dropdown-item
                    @click.native="Viewdetails(scope.row, 'SetRights')"
                    >查看详情</el-dropdown-item
                  >
                </ul>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="pagina-fonter">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import {
  GetSiSettleMemberSettlePageList,
  GetSiSettleMemberSettleBfInsuranceFundList,
  GetMedicalSettleMemberSettlePageList,
  GetHouseFundSettleMemberSettleBfInsuranceFundList,
  GetHouseFundSettleMemberSettlePageList,
  GetMedicalSettleMemberSettleBfInsuranceFundList,
  GetSocialSecurityPayApplyEnumStatus,
} from "@/api/CompensationServiceManagement.js";
import {
  copy,
  MenuIdDate,
  showLoading,
  hideLoading,
} from "@/utils/CustomValidation";
import qs from "qs";
import filters from "@/utils/filters";
export default {
  data() {
    return {
      Title: "发起社保付款申请",
      SettlementDocumentCode: "",
      OutsourcingEmployeeName: "",
      SiAreaId: "",
      MedicalAreaId: "",
      FundAreaId: "",
      PaymentStatus: -1,
      Dates: "",
      EntryDate: "",
      Year: "",
      Month: "",
      PeriodYear: "",
      PeriodMonth: "",
      currentPage: 1,
      PageSize: 10,
      total: 0,
      tableloading: false,
      tabidx: 0,
      PaymentStatusList: [],
      tableData: [],
      SiAreaList: [],
      MedicalAreaList: [],
      FundAreaList: [],
      PaymentType: [
        { value: 0, describe: "社保缴纳" },
        { value: 1, describe: "医保缴纳" },
        { value: 2, describe: "公积金缴纳" },
      ],
      operates: [], // 获取页面权限
      operatiOBj: {
        // 父权限查看数据
        menuid: "",
        OperationCode: "Query",
      },
    };
  },
  watch: {
    tabidx(newVal, oldVal) {
      if (newVal == 0) {
        this.GetSiSettleMemberSettlePageList(this.operatiOBj);
        this.GetSiSettleMemberSettleBfInsuranceFundList(this.operatiOBj);
      } else if (newVal == 1) {
        this.GetMedicalSettleMemberSettlePageList(this.operatiOBj);
        this.GetMedicalSettleMemberSettleBfInsuranceFundList(this.operatiOBj);
      } else {
        this.GetHouseFundSettleMemberSettlePageList(this.operatiOBj);
        this.GetHouseFundSettleMemberSettleBfInsuranceFundList(this.operatiOBj);
      }
    },
  },
  created() {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations;
      this.operatiOBj.menuid = this.$operatedata(this.operates, "Query").MenuId;
      this.GetSiSettleMemberSettlePageList(this.operatiOBj);
      this.GetSocialSecurityPayApplyEnumStatus(this.operatiOBj);
    }
  },
  mounted() {
    if (this.tabidx == 0) {
      this.GetSiSettleMemberSettleBfInsuranceFundList(this.operatiOBj);
    } else if (this.tabidx == 1) {
      this.GetMedicalSettleMemberSettleBfInsuranceFundList(this.operatiOBj);
    } else if (this.tabidx == 2) {
      this.GetHouseFundSettleMemberSettleBfInsuranceFundList(this.operatiOBj);
    }
  },
  methods: {
    //发起付款申请
    PaymentApplication() {
      if (this.tabidx == 0) {
        this.Title = "发起社保付款申请";
      } else if (this.tabidx == 1) {
        this.Title = "发起医保付款申请";
      } else if (this.tabidx == 2) {
        this.Title = "发起公积金付款申请";
      }
      this.$router.push({
        path: "/CompensationServiceManagement/InitiatePaymentApplication",
        query: {
          type: this.tabidx,
          name: this.Title,
        },
      });
    },
    GetSocialSecurityPayApplyEnumStatus(e) {
      let obj = {
        menuid: e.menuid || MenuIdDate(),
        operationcode: e.OperationCode || '1',
      };
      GetSocialSecurityPayApplyEnumStatus(obj).then((res) => {
        if (res.length > 0) {
          this.PaymentStatusList = res;
        } else {
          this.PaymentStatusList = [];
        }
      });
    },
    //查看详情
    Viewdetails() {},
    //获取【社保结算员工】打款账号列表
    GetSiSettleMemberSettleBfInsuranceFundList(e) {
      if (this.Dates != null) {
        this.Year = Number(this.Dates.split("-")[0]);
        this.Month = Number(this.Dates.split("-")[1]);
      } else {
        this.Year = "";
        this.Month = "";
      }
      if (this.EntryDate != null) {
        this.PeriodYear = Number(this.EntryDate.split("-")[0]);
        this.PeriodMonth = Number(this.EntryDate.split("-")[1]);
      } else {
        this.PeriodYear = "";
        this.PeriodMonth = "";
      }
      let obj = {
        SiSettleCode: this.SettlementDocumentCode,
        UserName: this.OutsourcingEmployeeName,
        // SiAccount: "",
        Year: this.Year,
        Month: this.Month,
        PeriodYear: this.PeriodYear,
        PeriodMonth: this.PeriodMonth,
        Status: this.PaymentStatus,
        menuid: e.menuid,
        operationcode: e.OperationCode,
      };
      GetSiSettleMemberSettleBfInsuranceFundList(obj).then((res) => {
        if (res.MessageCode == 0 && res.Data != null) {
          this.SiAreaList = res.Data;
          window.localStorage.setItem(
            "ActNmr",
            JSON.stringify(this.SiAreaList)
          );
        } else {
          this.SiAreaList = [];
        }
      });
    },
    //获取【医保结算员工】打款账号列表
    GetMedicalSettleMemberSettleBfInsuranceFundList(e) {
      if (this.Dates != null) {
        this.Year = Number(this.Dates.split("-")[0]);
        this.Month = Number(this.Dates.split("-")[1]);
      } else {
        this.Year = "";
        this.Month = "";
      }
      if (this.EntryDate != null) {
        this.PeriodYear = Number(this.EntryDate.split("-")[0]);
        this.PeriodMonth = Number(this.EntryDate.split("-")[1]);
      } else {
        this.PeriodYear = "";
        this.PeriodMonth = "";
      }
      let obj = {
        MedicalSettleCode: this.SettlementDocumentCode,
        UserName: this.OutsourcingEmployeeName,
        // MedicalAccount: "",
        Year: this.Year,
        Month: this.Month,
        PeriodYear: this.PeriodYear,
        PeriodMonth: this.PeriodMonth,
        Status: this.PaymentStatus,
        menuid: e.menuid,
        operationcode: e.OperationCode,
      };
      GetMedicalSettleMemberSettleBfInsuranceFundList(obj).then((res) => {
        if (res.MessageCode == 0 && res.Data != null) {
          this.MedicalAreaList = res.Data;
          window.localStorage.setItem(
            "ActNmr",
            JSON.stringify(this.MedicalAreaList)
          );
        } else {
          this.MedicalAreaList = [];
        }
      });
    },
    //获取【公积金结算员工】打款账号列表
    GetHouseFundSettleMemberSettleBfInsuranceFundList(e) {
      if (this.Dates != null) {
        this.Year = Number(this.Dates.split("-")[0]);
        this.Month = Number(this.Dates.split("-")[1]);
      } else {
        this.Year = "";
        this.Month = "";
      }
      if (this.EntryDate != null) {
        this.PeriodYear = Number(this.EntryDate.split("-")[0]);
        this.PeriodMonth = Number(this.EntryDate.split("-")[1]);
      } else {
        this.PeriodYear = "";
        this.PeriodMonth = "";
      }
      let obj = {
        HouseFundSettleCode: this.SettlementDocumentCode,
        UserName: this.OutsourcingEmployeeName,
        // FundAccount: "string",
        Year: this.Year,
        Month: this.Month,
        PeriodYear: this.PeriodYear,
        PeriodMonth: this.PeriodMonth,
        Status: this.PaymentStatus,
        menuid: e.menuid,
        operationcode: e.OperationCode,
      };
      GetHouseFundSettleMemberSettleBfInsuranceFundList(obj).then((res) => {
        if (res.MessageCode == 0 && res.Data != null) {
          this.FundAreaList = res.Data;
          window.localStorage.setItem(
            "ActNmr",
            JSON.stringify(this.FundAreaList)
          );
        } else {
          this.FundAreaList = [];
        }
      });
    },
    //获取社保缴纳分页列表
    GetSiSettleMemberSettlePageList(e) {
      if (this.Dates != null) {
        this.Year = Number(this.Dates.split("-")[0]);
        this.Month = Number(this.Dates.split("-")[1]);
      } else {
        this.Year = "";
        this.Month = "";
      }
      if (this.EntryDate != null) {
        this.PeriodYear = Number(this.EntryDate.split("-")[0]);
        this.PeriodMonth = Number(this.EntryDate.split("-")[1]);
      } else {
        this.PeriodYear = "";
        this.PeriodMonth = "";
      }
      let obj = {
        SiSettleCode: this.SettlementDocumentCode,
        UserName: this.OutsourcingEmployeeName,
        // SiAccount: this.SiAccount,
        Status: this.PaymentStatus,
        BfInsuranceFundId: this.SiAreaId,
        Year: this.Year,
        Month: this.Month,
        PeriodYear: this.PeriodYear,
        PeriodMonth: this.PeriodMonth,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: e.menuid || MenuIdDate(),
        operationcode: e.OperationCode || '1', 
      };
      showLoading();
      GetSiSettleMemberSettlePageList(obj).then((res) => {
        hideLoading();
        if (res.MessageCode == 0 && res.Data != null) {
          this.tableData = res.Data;
          this.total = res.Total;
          // window.localStorage.setItem('TabData', JSON.stringify(this.tableData))
        } else {
          this.tableData = [];
          this.total = 0;
        }
      });
    },
    //获取医保缴纳分页列表
    GetMedicalSettleMemberSettlePageList(e) {
      if (this.Dates != null) {
        this.Year = Number(this.Dates.split("-")[0]);
        this.Month = Number(this.Dates.split("-")[1]);
      } else {
        this.Year = "";
        this.Month = "";
      }
      if (this.EntryDate != null) {
        this.PeriodYear = Number(this.EntryDate.split("-")[0]);
        this.PeriodMonth = Number(this.EntryDate.split("-")[1]);
      } else {
        this.PeriodYear = "";
        this.PeriodMonth = "";
      }
      let obj = {
        MedicalSettleCode: this.SettlementDocumentCode,
        UserName: this.OutsourcingEmployeeName,
        // MedicalAccount: '',
        Status: this.PaymentStatus,
        BfInsuranceFundId: this.MedicalAreaId,
        Year: this.Year,
        Month: this.Month,
        PeriodYear: this.PeriodYear,
        PeriodMonth: this.PeriodMonth,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: e.menuid,
        operationcode: e.OperationCode,
      };
      showLoading();
      GetMedicalSettleMemberSettlePageList(obj).then((res) => {
        hideLoading();
        if (res.MessageCode == 0 && res.Data != null) {
          this.tableData = res.Data;
          this.total = res.Total;
          // window.localStorage.setItem('TabData', JSON.stringify(this.tableData))
        } else {
          this.tableData = [];
          this.total = 0;
        }
      });
    },
    //获取公积金缴纳分页列表
    GetHouseFundSettleMemberSettlePageList(e) {
      if (this.Dates != null) {
        this.Year = Number(this.Dates.split("-")[0]);
        this.Month = Number(this.Dates.split("-")[1]);
      } else {
        this.Year = "";
        this.Month = "";
      }
      if (this.EntryDate != null) {
        this.PeriodYear = Number(this.EntryDate.split("-")[0]);
        this.PeriodMonth = Number(this.EntryDate.split("-")[1]);
      } else {
        this.PeriodYear = "";
        this.PeriodMonth = "";
      }
      let obj = {
        HouseFundSettleCode: this.SettlementDocumentCode,
        UserName: this.OutsourcingEmployeeName,
        BfInsuranceFundId: this.FundAreaId,
        // FundAccount: "",
        Status: this.PaymentStatus,
        Year: this.Year,
        Month: this.Month,
        PeriodYear: this.PeriodYear,
        PeriodMonth: this.PeriodMonth,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: e.menuid,
        operationcode: e.OperationCode,
      };
      showLoading();
      GetHouseFundSettleMemberSettlePageList(obj).then((res) => {
        hideLoading();
        if (res.MessageCode == 0 && res.Data != null) {
          this.tableData = res.Data;
          this.total = res.Total;
          // window.localStorage.setItem('TabData', JSON.stringify(this.tableData))
        } else {
          this.tableData = [];
          this.total = 0;
        }
      });
    },
    //重置
    Reset() {
      this.SettlementDocumentCode = "";
      this.OutsourcingEmployeeName = "";
      this.SiAreaId = "";
      this.MedicalAreaId = "";
      this.FundAreaId = "";
      this.Dates = null;
      this.EntryDate = null;
      this.PaymentStatus = -1;
    },
    //查询
    searchtable() {
      this.currentPage = 1;
      if (this.tabidx == 0) {
        this.GetSiSettleMemberSettleBfInsuranceFundList(this.operatiOBj);
        this.GetSiSettleMemberSettlePageList(this.operatiOBj);
      } else if (this.tabidx == 1) {
        this.GetMedicalSettleMemberSettleBfInsuranceFundList(this.operatiOBj);
        this.GetMedicalSettleMemberSettlePageList(this.operatiOBj);
      } else if (this.tabidx == 2) {
        this.GetHouseFundSettleMemberSettleBfInsuranceFundList(this.operatiOBj);
        this.GetHouseFundSettleMemberSettlePageList(this.operatiOBj);
      }
      // if(this.tabidx==0){
      //   this.GetSiSettleMemberSettlePageList(this.operatiOBj)
      // }else if(this.tabidx==1){
      //   this.GetMedicalSettleMemberSettlePageList(this.operatiOBj)
      // }else if(this.tabidx==2){
      //   this.GetHouseFundSettleMemberSettlePageList(this.operatiOBj)
      // }
    },
    // 选择分页大小
    handleSizeChange(val) {
      this.PageSize = val;
      if (this.tabidx == 0) {
        this.GetSiSettleMemberSettlePageList(this.operatiOBj);
      } else if (this.tabidx == 1) {
        this.GetMedicalSettleMemberSettlePageList(this.operatiOBj);
      } else if (this.tabidx == 2) {
        this.GetHouseFundSettleMemberSettlePageList(this.operatiOBj);
      }
    },
    // 跳转页面
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.tabidx == 0) {
        this.GetSiSettleMemberSettlePageList(this.operatiOBj);
      } else if (this.tabidx == 1) {
        this.GetMedicalSettleMemberSettlePageList(this.operatiOBj);
      } else if (this.tabidx == 2) {
        this.GetHouseFundSettleMemberSettlePageList(this.operatiOBj);
      }
    },
    //切换类型
    chooseschedule(e) {
      this.tabidx = e;
      this.currentPage = 1;
      if (this.tabidx == 0) {
        this.GetSiSettleMemberSettlePageList(this.operatiOBj);
      } else if (this.tabidx == 1) {
        this.GetMedicalSettleMemberSettlePageList(this.operatiOBj);
      } else if (this.tabidx == 2) {
        this.GetHouseFundSettleMemberSettlePageList(this.operatiOBj);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.UserSocialSecuritySettlementManagement-Box {
  .tab {
    margin-left: 24px;
    padding-left: 24px;
    .operate-top {
      margin: 15px 24px 7px 24px;
      float: right;
    }
  }
  .operate-top {
    margin: 26px 24px 0 24px;
    float: right;
    .screening-compent {
      float: right;
      margin-right: 5px;
    }
  }
  .tab {
    margin-left: 24px;
    padding-left: 24px;
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
  .pagina-fonter {
    margin: 0px 0px 0px 24px;
    background-color: #fff;
    padding-bottom: 30px;
    border-bottom-left-radius: 7px;
  }
}
</style>
