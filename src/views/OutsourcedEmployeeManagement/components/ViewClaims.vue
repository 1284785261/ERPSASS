<template>
  <div class="ViewClaims-Box">
    <div class="bread">
      <BreadCrumb :url-list="urlList" :ShowButton="false" />
    </div>
    <div class="From-box">
      <div class="search-bar clearfix">
        <div class="condition">
          <div class="search-name">补贴员工</div>
          <el-input class="erpsearchinput" placeholder="请输入所属项目名称" clearable v-model="SubsidizeEmployees" size="small">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="querySelect" />
          </el-input>
        </div>
        <div class="condition">
          <div class="search-name">入账年月</div>
          <el-date-picker @change="TimeChange(Datas)" value-format="yyyy-MM-dd HH:mm:ss" v-model="EntryDate" type="month" size="small" class="erpsearchinput" placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="condition">
          <div class="search-name">补贴类型</div>
          <el-input class="erpsearchinput" placeholder="请输入回款状态" clearable v-model="SubsidyType" size="small">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="querySelect" />
          </el-input>
        </div>
        <div class="condition">
          <!-- <el-input class="erpsearchinput" placeholder="请输入发票抬头/开户行账号/税务登记证号码进行查询" clearable size="small" v-model="ApplyUserName"></el-input> -->
          <el-button size="small" class="erpbtn" @click.native="querySelect">查询</el-button>
          <!-- @click="searchtable" -->
        </div>
      </div>
      <div class="table-content">
        <div class="operate-top">
        <div class="screening-compent">
        <!-- 筛选列组件 -->
        <ScreeningComponent :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" @SelectCheck="SelectCheck"></ScreeningComponent>
        </div>
      </div>
        <div class="operate-table">
          <el-table ref="multipleTable" class="erp-table" v-loading="tableloading" :data="batchtable" max-height="600" tooltip-effect="dark">
            <el-table-column align="center" v-if="$getColumsFlag('SerialNumber',checkboxVal)" prop="Id" min-width="100" fixed label="序号" />
            <el-table-column align="center" v-if="$getColumsFlag('ProjectName',checkboxVal)" prop="ProjectName" min-width="110" fixed label="所属项目" />
            <el-table-column align="center" v-if="$getColumsFlag('Employees',checkboxVal)" prop="SettleName" label="所属员工" min-width="110" show-overflow-tooltip />
            <el-table-column align="center" v-if="$getColumsFlag('SubsidyType',checkboxVal)" prop="TotalStaff" label="补贴类型" min-width="110" />
            <el-table-column align="center" v-if="$getColumsFlag('EntryDate',checkboxVal)" label="入账年月" min-width="110" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.Year}}年{{scope.row.Month}}月</span>
              </template>
            </el-table-column>
            <el-table-column align="center" v-if="$getColumsFlag('ClaimAmount',checkboxVal)" prop="ApplySysUserName" label="需要认领金额" min-width="150" />
            <el-table-column align="center" v-if="$getColumsFlag('DeductProjectCost',checkboxVal)" prop="ApplyTime" label="抵扣项目成本" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.ApplyTime.split('T').toString().replace(/-/g,'/').replace(/,/g,'    ')}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" v-if="$getColumsFlag('CompanyExpenditure',checkboxVal)" prop="Amount" label="抵扣公司部分支出" min-width="170" />
            <el-table-column align="center" v-if="$getColumsFlag('ProjectGrossProfitAmount',checkboxVal)" prop="EstimatedCollectionTime" label="纳入项目毛利的金额" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.EstimatedCollectionTime.split('T').toString().replace(/-/g,'/').replace(/,/g,'    ')}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" v-if="$getColumsFlag('ClaimProjectCollectionAmount',checkboxVal)" prop="AmountCashed" label="认领到项目回款金额" min-width="180" />
            <el-table-column align="center" v-if="$getColumsFlag('EmployeeAmount',checkboxVal)" prop="OverdueInterest" label="认领到员工金额" min-width="170" />
            <el-table-column align="center" v-if="$getColumsFlag('SubsidyClaimant',checkboxVal)" prop="Status" label="认领补贴人" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.Status==0?'未回款':'已回款'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" v-if="$getColumsFlag('ClaimTime',checkboxVal)" prop="Agreement" label="认领时间" min-width="120" />
            <el-table-column align="center" v-if="$getColumsFlag('ReMark',checkboxVal)" prop="Agreement" label="备注" min-width="120" show-overflow-tooltip />
            <el-table-column align="center" fixed="right" label="操作" min-width="80">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <svg-icon icon-class="setting" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <ul class="popout-list">
                      <el-dropdown-item @click.native="Modify(scope.row)">修改</el-dropdown-item>
                      <el-dropdown-item @click.native="Delete(scope.row)">删除</el-dropdown-item>
                    </ul>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagina-fonter">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ScreeningComponent from '@/components/publicComponents/ScreeningComponent.vue'
import BreadCrumb from '@/components/publicComponents/breadCrumb.vue'
import { copy, MenuIdDate, showLoading, hideLoading } from '@/utils/CustomValidation'
export default {
  props:['showOperationLogDetails','OperationLogList','Total'],
  components:{
    ScreeningComponent,
    BreadCrumb
  },
  data() {
    return {
      urlList:[{
        name: '报销认领管理',
        router: '/OutsourcedEmployeeManagement/SubmitExpenseManagement'
      }, {
        name: '查看认领情况',
        router: ''
      }],
      tablist: [{
        value: 0,
        describe: '全部'
      }],
      SubsidizeEmployees: '',
      EntryDate:'',
      SubsidyType:'',
      batchtable:[],
      checkboxVal: [],
      formTheadOptions: [
        { label: "序号", prop: "SerialNumber" },
        { label: "所属项目", prop: "ProjectName" },
        { label: "所属员工", prop: "Employees" },
        { label: "补贴类型", prop: "SubsidyType" },
        { label: "入账年月", prop: "EntryDate" },
        { label: "需要认领金额", prop: "ClaimAmount" },
        { label: "抵扣项目成本", prop: "DeductProjectCost" },
        { label: "抵扣公司部分支出", prop: "CompanyExpenditure" },
        { label: "纳入项目毛利的金额", prop: "ProjectGrossProfitAmount" },
        { label: "认领到项目回款金额", prop: "ClaimProjectCollectionAmount" },
        { label: "认领到员工金额", prop: "EmployeeAmount" },
        { label: "认领补贴人", prop: "SubsidyClaimant" },
        { label: "认领时间", prop: "ClaimTime" },
        { label: "备注", prop: "ReMark" },
      ],
      ApplyUserName: '',
      StateReceivable: 0,
      tableloading: false,
      currentPage: 1,
      PageSize: 10,
      total: 0,
      tabidx: 0,
      MoneyIdx: 0,
      optionList: [],
      operates: [], // 获取页面权限
      operatiOBj: { // 父权限查看数据
        menuid: '',
        OperationCode: 'Query'
      },
    }
  },
  created(){
    for (let i = 0; i < this.formTheadOptions.length; i++) {
      this.checkboxVal.push(this.formTheadOptions[i].prop)
    }
  },
  methods:{
  //筛选项
  SelectCheck (val) {
    this.tableloading = true
    this.checkboxVal = val
    this.tableloading = false
    },
  //查询
  querySelect(){},
  //关闭
  close(){},
  //修改
  Modify(){},
  //删除
  Delete(){},
  //分页处理
    handleSizeChange (val) {
      this.PageSize = val
      if (this.ShowclaimList) {
        this.searchClaimSituation()
      } else {
        this.getMoneyRecord()
      }

    },
    handleCurrentChange (val) {
      this.currentPage = val
      if (this.ShowclaimList) {
        this.searchClaimSituation()
      } else {
        this.getMoneyRecord()
      }
    },
    },
  }
</script>
<style lang="scss" scoped>
@import "@/styles/publicStyle.scss";
.bread {
  margin-left: 24px;
  margin-bottom: 24px;
}
.search-bar {
  padding: 0 24px 12px 24px;
  // height: 80px;
  .condition {
    float: left;
    display: inline-block;
    margin-right: 16px;
    margin-bottom: 12px;
    &:last-child {
      margin-right: 0;
    }
    .search-name {
      font-size: $f14;
      color: $erp666;
      display: inline-block;
      margin-right: 7px;
    }
    .el-input {
      display: inline-block;
      width: 216px;
    }
  }
}
.table-content {
  .operate-top {
    float: right;
    margin-bottom: 8px;
  }
  @import "@/styles/publicStyle.scss";
  .forms {
    /deep/ .el-form-item {
      .el-form-item__label {
        width: 50%;
        text-align: left;
        line-height: 24px;
        color: #666666;
      }
      /deep/.el-form-item__content {
        margin-left: 10px !important;
        font-size: 12px !important;

        .el-select {
          display: block;
          width: 400px;
          .el-input__suffix {
            top: 24px;
            height: 40px;
          }
        }
      }
    }
    /deep/ .State {
      .el-radio-group {
        display: block;
        margin-top: 40px;
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
    .upload-bts {
      position: absolute;
      right: 0;
      top: 24px;
      z-index: 10;
      background: #1588f8;
      button {
        padding: 12px 19px;
      }
    }
    .downloadBtn {
      color: #1588f8;
    }
  }
}
</style>