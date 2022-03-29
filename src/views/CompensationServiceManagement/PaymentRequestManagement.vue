<!-- 付款申请单管理 -->
<template>
  <div class="social-security-management-container">
    <div class="industry-box-header">
      <div class="industry-box-form">
        <el-form ref="form" class="filter-container">
          <el-form-item label="付款单编号" label-width="100px">
            <el-input v-model="searchform.paymentOrderCode" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入所属项目" @keyup.enter.native="searchtable" />
          </el-form-item>
          <el-form-item :label="AccountText" label-width="100px" v-if="tabIndex == 2 || tabIndex == 3 || tabIndex == 4">
            <el-input v-model="searchform.accountNumber" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入所属项目" @keyup.enter.native="searchtable" />
          </el-form-item>
          <el-form-item label="结算单编号" label-width="100px" v-if="tabIndex == 1 || tabIndex == 6">
            <el-input v-model="searchform.finalStatementCode" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入所属项目" @keyup.enter.native="searchtable" />
          </el-form-item>
          <el-form-item label="所属项目" label-width="80px" v-if="tabIndex == 1 || tabIndex == 6">
            <el-input v-model="searchform.ProjectName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入所属项目" @keyup.enter.native="searchtable" />
          </el-form-item>
          <el-form-item label="用工单位" label-width="80px" v-if="tabIndex == 1">
            <el-input v-model="searchform.BfCompanyName" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入用工单位" @keyup.enter.native="searchtable" />
          </el-form-item>
          <el-form-item label="审批状态" label-width="80px">
            <el-select size="mini" class="select-input" clearable v-model="searchform.PaymentStatus" placeholder="请选择付款状态进行查询">
              <el-option v-for="(item, idx) in PaymentStatusList" :key="idx" :label="item.describe" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="工资打款账号" label-width="120px" v-if="tabIndex == 1">
            <el-input v-model="searchform.Account" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入工资打款账号" @keyup.enter.native="searchtable" />
          </el-form-item>
          <el-form-item label="社保打款账号" label-width="120px" v-if="tabIndex == 2">
            <el-input v-model="searchform.Account" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入社保打款账号" @keyup.enter.native="searchtable" />
          </el-form-item>
          <el-form-item label="公积金打款账号" label-width="130px" v-if="tabIndex == 3">
            <el-input v-model="searchform.Account" clearable class="select-input" suffix-icon="el-icon-search" placeholder="请输入公积金打款账号" @keyup.enter.native="searchtable" />
          </el-form-item>
          <el-form-item label="付款申请单维度" label-width="130px" v-if="tabIndex !=1 && tabIndex !=6">
            <el-select v-model="searchform.HFType" size="small" class="select-input" clearable placeholder="请选择付款申请单维度">
              <el-option v-for="item in dimensionDate" :key="item.value" :label="item.describe" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-button class="search-button" size="mini" round @click="searchtable">
            搜索
          </el-button>
        </el-form>
      </div>
    </div>
    <div class="tab2 clearfix">
      <div class="tab-name" :class="{ active: tabIndex == item.value }" @click="choosetab(item)" v-for="(item, index) in tablist" :key="index">
        {{ item.describe }}
      </div>
      <!-- <el-button class="operation-button tableHeader-button" size="small" v-if="$operatebtn(operates, 'Approval')" @click="Approvals('Approval')">批量发起审批</el-button> -->
    </div>
    <div class="content">
      <div class="operate-table" v-if="tabIndex == 1">
        <el-table ref="multipleTable" class="erp-table" key="table1" v-loading="tableloading" :data="ApplicationList" max-height="600" tooltip-effect="dark">
          <!-- <el-table-column align="center" type="selection" min-width="55" fixed /> -->
          <el-table-column fixed align="center" label="序号" prop="sort" width="60">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="BusinessNo" label="工资付款单编号" fixed min-width="180" show-overflow-tooltip />
          <el-table-column align="center" prop="Title" label="付款申请单名称" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <a v-if="$operatebtn(operates, 'View')" style="color: #1588f8" @click="OpenDetail(scope.row)">{{ scope.row.Title }}</a>
              <span v-else>{{ scope.row.Title }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ProjectName" label="所属项目" min-width="180" show-overflow-tooltip />
          <el-table-column align="center" prop="BusinessNo" label="工资结算单编号" min-width="180" show-overflow-tooltip />
          <el-table-column align="center" prop="BfCompanyName" label="付款公司" min-width="180" show-overflow-tooltip />
          <!-- <el-table-column align="center" prop="Accepter" label="收款方" /> -->
          <!-- <el-table-column align="center" prop="ClassBankName" label="付款银行" /> -->
          <el-table-column align="center" label="总付款金额" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.Amount | BIDMoney }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="SysUserName" label="申请人" min-width="120" />
          <el-table-column align="center" prop="StatusText" label="状态" min-width="120" />
          <el-table-column align="center" prop="AddTime" label="添加时间" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.AddTime | Time }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="$operatebtns(operates, ['Approval', 'Down'])">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="
                        scope.row.Status == 0 &&
                        $operatebtn(operates, 'Approval')
                      " @click.native="StatsApply(scope.row, 'Approval')">发起审批</el-dropdown-item>
                    <el-dropdown-item v-if="
                        $operatebtn(operates, 'Down') && scope.row.Status !== 4
                      " @click.native="DownloadAttachment(scope.row, 'Down')">下载附件</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status === 1 && $operatebtn(operates, 'Revoke')" @click.native="Undo(scope.row, 'Revoke')">撤回</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status === 0 || scope.row.Status === 4" @click.native="deletePay(scope.row)">删除</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status === 3 || scope.row.Status === 4" @click.native="beginsub(scope.row)">再次提交</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-table" v-if="tabIndex == 2 || tabIndex == 3 || tabIndex == 4">
        <el-table ref="multipleTable" class="erp-table" key="table2" v-loading="tableloading" :data="ApplicationList" max-height="600" tooltip-effect="dark">
          <!-- <el-table-column align="center" type="selection" min-width="55" fixed /> -->
          <el-table-column fixed align="center" label="序号" prop="Id" width="60">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="Code" :label="CodeText" fixed min-width="120" show-overflow-tooltip />
          <el-table-column align="center" label="付款单名称" fixed min-width="200">
            <template slot-scope="scope">
              <a v-if="$operatebtn(operates, 'View')" style="color: #1588f8" @click="OpenDetail(scope.row)">{{ scope.row.Name }}</a>
              <span v-else>{{ scope.row.Name }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="ProjectName" label="所属项目" min-width="180" show-overflow-tooltip /> -->
          <el-table-column align="center" prop="Account" :label="AccountText" min-width="160" show-overflow-tooltip />
          <el-table-column align="center" prop="BfCompanyName" label="付款公司" min-width="160" show-overflow-tooltip />
          <el-table-column align="center" label="付款金额" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.Amount | BIDMoney }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="Accepter" label="收款方" min-width="120" />
          <el-table-column align="center" prop="Account" label="银行账号" min-width="150" show-overflow-tooltip /> -->

          <el-table-column align="center" prop="StatusText" label="审批状态" min-width="120" />
          <el-table-column align="center" prop="HandleUserName" label="申请人" min-width="120" />
          <el-table-column align="center" prop="AddTime" label="添加时间" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.AddTime | Time }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="$operatebtns(operates, ['Approval', 'Down'])">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="
                        scope.row.Status == 0 &&
                        $operatebtn(operates, 'Approval')
                      " @click.native="StatsApply(scope.row, 'Approval')">发起审批</el-dropdown-item>
                    <el-dropdown-item v-if="
                        $operatebtn(operates, 'Down') && scope.row.Status !== 4
                      " @click.native="DownloadAttachment(scope.row, 'Down')">下载附件</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status === 1 && $operatebtn(operates, 'Revoke')" @click.native="Undo(scope.row, 'Revoke')">撤回</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status === 0 || scope.row.Status === 4" @click.native="deletePay(scope.row)">删除</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status === 3 || scope.row.Status === 4" @click.native="beginsub(scope.row)">再次提交</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operate-table" v-if="tabIndex == 6">
        <el-table ref="multipleTable" class="erp-table" key="table1" v-loading="tableloading" :data="ApplicationList" max-height="600" tooltip-effect="dark">
          <!-- <el-table-column align="center" type="selection" min-width="55" fixed /> -->
          <el-table-column fixed align="center" label="序号" prop="sort" width="60">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="BusinessNo" label="付款单编号" fixed min-width="180" show-overflow-tooltip />
          <el-table-column align="center" label="付款单名称" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <a v-if="$operatebtn(operates, 'View')" style="color: #1588f8" @click="OpenDetail(scope.row)">{{ scope.row.Title }}</a>
              <span v-else>{{ scope.row.Title }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ProjectName" label="所属项目" min-width="180" show-overflow-tooltip />
          <el-table-column align="center" prop="BusinessNo" label="其他费用结算单编号" min-width="180" show-overflow-tooltip />
          <el-table-column align="center" prop="BfCompanyName" label="付款公司" min-width="180" show-overflow-tooltip />
          <el-table-column align="center" label="付款金额" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.Amount | BIDMoney }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="StatusText" label="审批状态" min-width="120" />
          <el-table-column align="center" prop="SysUserName" label="申请人" min-width="120" />
          <el-table-column align="center" prop="AddTime" label="添加时间" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.AddTime | Time }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="$operatebtns(operates, ['Approval', 'Down'])">
                <span class="el-dropdown-link">
                  <svg-icon icon-class="setting" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <ul class="popout-list">
                    <el-dropdown-item v-if="
                        scope.row.Status == 0 &&
                        $operatebtn(operates, 'Approval')
                      " @click.native="StatsApply(scope.row, 'Approval')">发起审批</el-dropdown-item>
                    <el-dropdown-item v-if="
                        $operatebtn(operates, 'Down') && scope.row.Status !== 4
                      " @click.native="DownloadAttachment(scope.row, 'Down')">下载附件</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status === 1 && $operatebtn(operates, 'Revoke')" @click.native="Undo(scope.row, 'Revoke')">撤回</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status === 0 || scope.row.Status === 4" @click.native="deletePay(scope.row)">删除</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.Status === 3 || scope.row.Status === 4" @click.native="beginsub(scope.row)">再次提交</el-dropdown-item>
                  </ul>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagina-fonter">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <div class="dialog">
      <dialogaudit :title="audittitle" :visible="auditvisible" :contentdata="auditdata" @closeauditdialog="closeauditdialog" @savecostaudit="savecostaudit"></dialogaudit>
      <el-dialog :close-on-click-modal="false" title="部分付款申请审核失败提示" :visible.sync="reportvisible" width="480px" :lock-scroll="false" custom-class="erpdialog" @close="closereport">
        <div class="error-box">
          <div class="error-top">
            <div class="success-total">总共 {{ errordata.Total }}</div>
            <div class="success-total">成功 {{ errordata.Successes }}</div>
            <div class="error-total">
              审核失败 <span>{{ errordata.Errors }}</span> 条
            </div>
          </div>
          <div class="error-content erpscroll">
            <div class="row" v-for="(item, index) in errordata.AddApplyPayExamineDtoRowList" :key="index">
              <div class="index">第{{ item.Rows }}行</div>
              <div class="con">{{ item.Message }}</div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closereport">修改后重新导入</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  GetBfInsuranceFundPageList,
  GetBfInsuranceFundEnumType,
  DeleteBfInsuranceFund,
  GetSocialSecurityPayApplyPageList,
  GetSocialSecurityPayApplyEnumStatus,
  UpdateSocialSecurityPayApplyStatus,
  DeleteSocialSecurityPayApply
} from "@/api/CompensationServiceManagement.js";
import {
  GetApplyPayPageList,
  GetApplyPayEnclosure,
  AddApplyPayExamine,
  RevokeApplyPay,
  DeleteApplyPay,
  EditApplyPayStatus
} from "@/api/FinancialManagement.js";
import {
  MenuIdDate,
  showLoading,
  hideLoading,
  uuid,
  copy
} from "@/utils/CustomValidation";
import dialogaudit from "./components/dialog-audit.vue";
import qs from "qs";
import filters from "@/utils/filters";
export default {
  components: {
    dialogaudit
  },
  data() {
    return {
      searchform: {
        paymentOrderCode: "",
        accountNumber: "",
        PaymentStatus: -1,
        finalStatementCode: "",
        BfCompanyName: "",
        ProjectName: "",
        Type: "",
        HFType: 0,
        Account: ""
      },
      AccountText: "社保账号",
      CodeText: "社保付款单编号",
      Types: 0,
      PaymentStatusList: [],
      currentPage: 1,
      PageSize: 10,
      total: 0,
      tabIndex: 1,
      tablist: [
        {
          value: 1,
          describe: "工资付款申请"
        },
        {
          value: 2,
          describe: "社保付款申请"
        },
        {
          value: 3,
          describe: "医保付款申请"
        },
        {
          value: 4,
          describe: "公积金付款申请"
        },
        {
          value: 6,
          describe: "其他费用付款申请"
        }
      ],
      dimensionDate: [
        {
          value: 0,
          describe: "项目类型"
        },
        {
          value: 1,
          describe: "账号类型"
        }
      ],
      AccountList: [],
      ApplicationList: [],
      tableloading: false, // 加载动画
      reportvisible: false,
      errordata: {}, // 错误信息

      // 提交审核弹框
      audittitle: "提交审核",
      auditvisible: false,
      auditdata: {},
      selectarray: [], // 选中的付款申请单
      Id: "", // 付款申请Id
      operates: [], // 获取页面权限
      operatiOBj: {
        // 父权限查看数据
        menuid: "",
        OperationCode: "Query"
      },

      BusinessNo: "" // 业务单号
    };
  },
  created() {
    if (this.$route.meta.operations) {
      this.operates = this.$route.meta.operations;
      console.log(this.operates);
      this.operatiOBj.menuid = this.$operatedata(this.operates, "Query").MenuId;
      this.GetApplyPay(this.operatiOBj);
      this.GetSocialSecurityPayApplyEnumStatus(this.operatiOBj);
    }
    this.getAccountList();
  },
  watch: {
    tabIndex(newVal, oldVal) {
      if (newVal == 1 || newVal == 6) {
        this.GetApplyPay(this.operatiOBj);
      } else if (newVal == 2) {
        this.Types = 0;
        this.CodeText = "社保付款单编号";
        this.AccountText = "社保账号";
        this.GetSocialSecurityPayApplyPageList(this.operatiOBj);
      } else if (newVal == 3) {
        this.Types = 1;
        this.CodeText = "医保付款单编号";
        this.AccountText = "医保账号";
        this.GetSocialSecurityPayApplyPageList(this.operatiOBj);
      } else if (newVal == 4) {
        this.Types = 2;
        this.CodeText = "公积金付款单编号";
        this.AccountText = "公积金账号";
        this.GetSocialSecurityPayApplyPageList(this.operatiOBj);
      } else if (newVal == 5) {
      } else if (newVal == 6) {
      }
    }
  },
  methods: {
    //获取审核类型枚举
    GetSocialSecurityPayApplyEnumStatus(e) {
      let obj = {
        menuid: e.menuid || MenuIdDate(),
        operationcode: e.OperationCode || "1"
      };
      GetSocialSecurityPayApplyEnumStatus(obj).then(res => {
        if (res.length > 0) {
          this.PaymentStatusList = res;
          this.PaymentStatusList.forEach(data => {
            if (data.value == -1) {
              data.describe = "全部";
            }
          });
        } else {
          this.PaymentStatusList = [];
        }
      });
    },
    //获取社保付款申请分页列表
    GetSocialSecurityPayApplyPageList(operat) {
      let obj = {
        Code: this.searchform.paymentOrderCode,
        Type: this.Types,
        Name: "",
        Account: this.searchform.accountNumber,
        Status: this.searchform.PaymentStatus,
        PageIndex: this.currentPage,
        PageSize: this.PageSize,
        menuid: operat.menuid,
        operationcode: operat.OperationCode
      };
      GetSocialSecurityPayApplyPageList(obj).then(res => {
        if (res.MessageCode == 0 && res.Data != null) {
          this.ApplicationList = res.Data;
          this.total = res.Total;
        } else {
          this.ApplicationList = [];
          this.total = 0;
        }
      });
    },
    searchtable() {
      this.currentPage = 1;
      if (this.tabIndex == 1 || this.tabIndex == 6) {
        this.GetApplyPay(this.operatiOBj);
      } else if (
        this.tabIndex == 2 ||
        this.tabIndex == 3 ||
        this.tabIndex == 4
      ) {
        this.GetSocialSecurityPayApplyPageList(this.operatiOBj);
      }
    },
    handleSelectionChange(val) {
      console.log(val);
      this.selectarray = val;
      let array = [];
      for (let i = 0; i < val.length; i++) {
        array.push(val[i].Id);
      }
      this.Id = array.join(",");
      console.log(this.Id);
    },
    // 批量发起审批
    Approvals(op) {
      if (this.selectarray.length > 0) {
        const operating = this.$operatedata(this.operates, op);
        localStorage.setItem("operating", JSON.stringify(operating));
        this.auditdata = {};
        if (this.tabIndex == 1) {
          this.audittitle = "薪酬提交审核";
        } else if (this.tabIndex == 2) {
          this.audittitle = "社保提交审核";
        } else if (this.tabIndex == 3) {
          this.audittitle = "公积金提交审核";
        } else if (this.tabIndex == 4) {
          this.audittitle = "医保提交审核";
        }
        this.auditvisible = true;
      } else {
        this.$message({
          message: "请选择要发起审批的付款申请单",
          type: "warning"
        });
      }
    },
    //分页处理
    handleSizeChange(val) {
      this.PageSize = val;
      if (this.tabIndex == 1) {
        this.GetApplyPay(this.operatiOBj);
      } else if (
        this.tabIndex == 2 ||
        this.tabIndex == 3 ||
        this.tabIndex == 4
      ) {
        this.GetSocialSecurityPayApplyPageList(this.operatiOBj);
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.tabIndex == 1) {
        this.GetApplyPay(this.operatiOBj);
      } else if (
        this.tabIndex == 2 ||
        this.tabIndex == 3 ||
        this.tabIndex == 4
      ) {
        this.GetSocialSecurityPayApplyPageList(this.operatiOBj);
      }
    },
    // 获取付款单申请列表
    GetApplyPay(operat) {
      let obj = {
        BfCompanyName: this.searchform.BfCompanyName,
        ProjectName: this.searchform.ProjectName,
        Type: this.tabIndex,
        Account: "",
        ApplyCode: this.searchform.paymentOrderCode,
        SettleCode: this.searchform.finalStatementCode,
        Status: this.searchform.PaymentStatus,
        PageIndex: this.currentPage || 1,
        PageSize: this.PageSize || 1,
        menuid: operat.menuid || MenuIdDate(),
        operationcode: operat.OperationCode || "1"
      };
      if (this.tabIndex != 1) {
        obj.HFType = this.searchform.HFType;
      }
      this.tableloading = true;
      GetApplyPayPageList(qs.stringify(obj)).then(response => {
        this.tableloading = false;
        if (response.IsSuccess) {
          if (response.Data && response.Data.length > 0) {
            this.ApplicationList = response.Data;
            this.total = response.Total;
          } else {
            this.ApplicationList = [];
            this.total = 0;
          }
        } else {
          this.ApplicationList = [];
          this.total = 0;
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    //获取账号类型
    getAccountList() {
      let obj = {
        menuid: MenuIdDate(),
        operationcode: 1
      };
      GetBfInsuranceFundEnumType(qs.stringify(obj)).then(response => {
        if (response) {
          this.AccountList = response;
          this.AccountList.unshift({
            value: "-1",
            describe: "全部"
          });
        }
      });
    },
    //下载附件
    DownloadAttachment(data) {
      if (this.tabIndex == 1 || this.tabIndex == 6) {
        showLoading();
        let obj = {
          Id: data.Id,
          menuid: MenuIdDate(),
          operationcode: 1
        };
        GetApplyPayEnclosure(qs.stringify(obj)).then(response => {
          hideLoading();
          if (response.IsSuccess && response.Data) {
            window.open(response.Data);
          } else {
            this.$message({
              message: response.MessageContent,
              type: "error"
            });
          }
        });
      } else if (
        this.tabIndex == 2 ||
        this.tabIndex == 3 ||
        this.tabIndex == 4
      ) {
        window.open(data.Attachment);
      }
    },
    // 打开工资/社保/公积金详情
    OpenDetail(data) {
      // this.$router.push({
      //   path: "/CompensationServiceManagement/PaymentRequestInfo",
      //   query: {
      //     id: data.Id
      //   }
      // })
      const { href } = this.$router.resolve({
        path: "/CompensationServiceManagement/PaymentRequestInfo",
        query: {
          id: data.Id,
          type: this.tabIndex
        }
      });
      window.open(href, "_blank");
    },
    choosetab(e) {
      // 防止重复点击
      if (this.tabidx == e.value) {
        return;
      } else {
        // 切换到第一页
        this.currentPage = 1;
        this.selectarray = [];
        this.tabIndex = e.value;
        this.checked = false;
        this.GetApplyPay(this.operatiOBj);
      }
    },
    //发起审批
    StatsApply(data, op) {
      const operating = this.$operatedata(this.operates, op);
      if (this.tabIndex == 2 || this.tabIndex == 3 || this.tabIndex == 4) {
        let obj = {
          Id: data.Id,
          Status: 1,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        };
        UpdateSocialSecurityPayApplyStatus(obj).then(res => {
          if (res.MessageCode == 0) {
            this.$message({
              type: "success",
              message: "已成功提交审批流程"
            });
            this.GetSocialSecurityPayApplyPageList(this.operatiOBj);
          } else {
            this.$message({
              type: "error",
              message: res.MessageContent
            });
          }
        });
      } else if (this.tabIndex == 1 || this.tabIndex == 6) {
        let obj = {
          IdArr: data.Id.toString(),
          // Status: 1,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        };
        EditApplyPayStatus(obj).then(res => {
          if (res.MessageCode == 0) {
            this.$message({
              type: "success",
              message: "已成功提交审批流程"
            });
            this.GetApplyPay(this.operatiOBj);
          } else {
            this.$message({
              type: "error",
              message: res.MessageContent
            });
          }
        });
      }
      // 操作码
      // const operating = this.$operatedata(this.operates, op);
      // localStorage.setItem("operating", JSON.stringify(operating));
      // this.auditdata = copy(data);
      // console.log(this.auditdata);
      // if (this.tabIndex == 1) {
      //   this.audittitle = "薪酬提交审核";
      // } else if (this.tabIndex == 2) {
      //   this.audittitle = "社保提交审核";
      // } else if (this.tabIndex == 3) {
      //   this.audittitle = "公积金提交审核";
      // } else if (this.tabIndex == 4) {
      //   this.audittitle = "医保提交审核";
      // }
      // this.Id = data.Id;
      // this.BusinessNo = data.BusinessNo;
      // this.auditvisible = true;
    },
    closeauditdialog() {
      this.auditvisible = false;
    },
    savecostaudit(e) {
      let obj = copy(e);
      obj.BusinessNo = this.BusinessNo;
      const operating = JSON.parse(localStorage.getItem("operating")) || {};
      obj.menuid = operating.MenuId;
      obj.operationcode = operating.OperationCode;
      obj["u_付款方式"] = e.paymentType;
      obj["u_支出类型"] = e.spendType;
      obj["u_客户单位"] = e.customer;
      obj["法人实体"] = e.legal;
      showLoading();
      AddApplyPayExamine(qs.stringify(obj)).then(response => {
        hideLoading();
        if (response.IsSuccess) {
          // 判断是否成功/失败返回错误结果
          if (response.Data && response.Data.Errors == 0) {
            this.$message({
              message: "提交成功,请到钉钉易快报做提交送审",
              type: "success"
            });
            this.auditvisible = false;
            this.GetApplyPay(this.operatiOBj);
          } else {
            this.auditvisible = false;
            this.errordata = response.Data;
            this.reportvisible = true;
          }
        } else {
          this.$message({
            message: response.MessageContent,
            type: "error"
          });
        }
      });
    },
    closereport() {
      this.errordata = {};
      this.reportvisible = false;
      this.GetApplyPay(this.operatiOBj);
    },
    // 撤销
    Undo(data, op) {
      const operating = this.$operatedata(this.operates, op);
      if (this.tabIndex == 2 || this.tabIndex == 3 || this.tabIndex == 4) {
        let obj = {
          Id: data.Id,
          Status: 4,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        };
        UpdateSocialSecurityPayApplyStatus(obj).then(res => {
          if (res.MessageCode == 0) {
            this.$message({
              type: "success",
              message: "已成功撤销审批流程"
            });
            this.GetSocialSecurityPayApplyPageList(this.operatiOBj);
          } else {
            this.$message({
              type: "error",
              message: res.MessageContent
            });
          }
        });
      } else if (this.tabIndex == 1 || this.tabIndex == 6) {
        let obj = {
          IdArr: data.Id.toString(),
          Status: 4,
          menuid: operating.MenuId,
          operationcode: operating.OperationCode
        };
        EditApplyPayStatus(obj).then(res => {
          if (res.MessageCode == 0) {
            this.$message({
              type: "success",
              message: "已成功撤销审批流程"
            });
            this.GetApplyPay(this.operatiOBj);
          } else {
            this.$message({
              type: "error",
              message: res.MessageContent
            });
          }
        });
      }
    },

    // 再次提交
    beginsub(data) {
      let obj = {
        Id: data.Id,
        Status: 1,
        menuid: MenuIdDate(),
        operationcode: 1
      };
      UpdateSocialSecurityPayApplyStatus(obj).then(res => {
        if (res.MessageCode == 0) {
          this.$message({
            type: "success",
            message: "已成功提交审批流程"
          });
          this.GetSocialSecurityPayApplyPageList(this.operatiOBj);
        } else {
          this.$message({
            type: "error",
            message: res.MessageContent
          });
        }
      });
    },

    // 删除
    deletePay(data) {
      if (this.tabIndex == 1 || this.tabIndex == 6) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let obj = {
              IdArr: data.Id.toString(),
              menuid: MenuIdDate(),
              operationcode: 1
            };
            showLoading();
            DeleteApplyPay(qs.stringify(obj)).then(response => {
              hideLoading();
              if (response.IsSuccess) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.currentPage = 1;
                this.GetApplyPay(this.operatiOBj);
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: "error"
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else if (
        this.tabIndex == 2 ||
        this.tabIndex == 3 ||
        this.tabIndex == 4
      ) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let obj = {
              Id: data.Id,
              menuid: MenuIdDate(),
              operationcode: 1
            };
            showLoading();
            DeleteSocialSecurityPayApply(qs.stringify(obj)).then(response => {
              hideLoading();
              if (response.IsSuccess) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.currentPage = 1;
                this.GetSocialSecurityPayApplyPageList(this.operatiOBj);
              } else {
                this.$message({
                  message: response.MessageContent,
                  type: "error"
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.social-security-management-container {
  .operate-top {
    float: right;
    margin-bottom: 16px;
  }
  .tableHeader-button {
    height: 40px;
    float: right;
    margin: 0 20px 0 0;
  }
  .content {
    background-color: #fff;
    // min-height: calc(100vh - 141px);
    margin-left: 20px;
    padding: 20px;
    border-radius: 8px 0px 0px 8px;
    .operate-bottom {
      margin-top: 32px;
      padding-left: 16px;
      .allcheck {
        margin-right: 16px;
      }
    }
    .pagina-fonter {
      margin-top: 24px;
    }
  }
  .final-content {
    margin-left: 24px;
    background-color: #fff;
    border-radius: 0 0 0 8px;
    padding: 16px 24px;
  }
  .error-box {
    .error-top {
      margin-bottom: 24px;
      .error-total {
        font-size: $f14;
        color: $erp333;
        > span {
          color: $erpred;
        }
      }
    }
    .error-content {
      max-height: calc(100vh - 600px);
      overflow-y: auto;
      // margin-bottom: 24px;
      .row {
        line-height: 20px;
        margin-bottom: 24px;
        min-height: 20px;
        display: flex;
        color: $erp999;
        .index {
          width: 48px;
        }
        .con {
          color: $erp999;
          flex: 1;
        }
      }
    }
  }
}
</style>